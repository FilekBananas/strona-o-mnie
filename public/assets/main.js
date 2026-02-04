(function () {
  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointerFine =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: fine)").matches;

  const storageKey = "theme";
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const themeListeners = new Set();

  const notifyThemeChange = () => {
    themeListeners.forEach((fn) => {
      try {
        fn();
      } catch {
        // ignore
      }
    });
  };

  const stored = window.localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark") {
    root.dataset.theme = stored;
  }

  if (toggle) {
    const updateLabel = () => {
      const theme = root.dataset.theme === "light" ? "light" : "dark";
      toggle.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      );
    };

    updateLabel();
    toggle.addEventListener("click", () => {
      const next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      window.localStorage.setItem(storageKey, next);
      updateLabel();
      notifyThemeChange();
    });
  }

  // Mark active navigation link based on the current path.
  const currentPath = window.location.pathname.replace(/\/+$/, "");
  const parts = currentPath.split("/").filter(Boolean);
  const currentFile = parts.length ? parts[parts.length - 1] : "";

  const isContact =
    currentFile === "contact.html" ||
    currentFile === "contact" ||
    window.location.hash.includes("contact");

  document.querySelectorAll("[data-nav] a").forEach((a) => {
    const href = (a.getAttribute("href") || "").trim();
    const isContactLink = href.includes("contact");
    const shouldMark = isContact ? isContactLink : !isContactLink;
    if (shouldMark) a.setAttribute("aria-current", "page");
  });

  // Scroll progress bar.
  (function initScrollProgress() {
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.prepend(bar);

    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      bar.style.transform = `scaleX(${p})`;
    };

    const request = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  })();

  // Smooth anchor scrolling (with header offset).
  (function initSmoothAnchors() {
    document.addEventListener("click", (e) => {
      const link = e.target?.closest?.('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const id = href.slice(1);
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      const header = document.querySelector(".site-header");
      const offset = (header?.getBoundingClientRect().height || 0) + 12;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
      history.pushState(null, "", `#${id}`);
    });
  })();

  // Reveal-on-scroll.
  (function initReveal() {
    const candidates = [
      ...document.querySelectorAll(".section h2"),
      ...document.querySelectorAll(".card"),
      ...document.querySelectorAll(".timeline-item")
    ];

    const elements = candidates.filter((el) => {
      if (!(el instanceof HTMLElement)) return false;
      if (el.closest(".site-header")) return false;
      el.classList.add("reveal");
      return true;
    });

    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  })();

  // Card spotlight + 3D tilt.
  (function initCardEffects() {
    const cards = Array.from(document.querySelectorAll(".card"));
    if (!cards.length) return;

    const enableTilt = pointerFine && !prefersReducedMotion;
    if (enableTilt) cards.forEach((c) => c.classList.add("tilt"));

    const reset = (card) => {
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
    };

    cards.forEach((card) => {
      if (!(card instanceof HTMLElement)) return;

      card.addEventListener(
        "pointermove",
        (e) => {
          const rect = card.getBoundingClientRect();
          const x = Math.min(rect.width, Math.max(0, e.clientX - rect.left));
          const y = Math.min(rect.height, Math.max(0, e.clientY - rect.top));

          card.style.setProperty("--mx", `${x}px`);
          card.style.setProperty("--my", `${y}px`);

          if (!enableTilt) return;
          const px = x / rect.width - 0.5;
          const py = y / rect.height - 0.5;
          const rx = (-py * 8).toFixed(2);
          const ry = (px * 10).toFixed(2);
          card.style.setProperty("--rx", `${rx}deg`);
          card.style.setProperty("--ry", `${ry}deg`);
        },
        { passive: true }
      );

      card.addEventListener("pointerleave", () => reset(card));
      card.addEventListener("blur", () => reset(card), true);
    });
  })();

  // Cursor glow (subtle).
  (function initCursorGlow() {
    if (!pointerFine || prefersReducedMotion) return;

    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);

    let tx = window.innerWidth * 0.5;
    let ty = window.innerHeight * 0.35;
    let x = tx;
    let y = ty;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
  })();

  // Animated background canvas (particles + connections).
  (function initBackgroundCanvas() {
    if (prefersReducedMotion) return;

    const canvas = document.createElement("canvas");
    canvas.className = "bg-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;

    let accentA = "rgba(139, 92, 246, 0.22)";
    let accentB = "rgba(34, 211, 238, 0.18)";
    const refreshColors = () => {
      const styles = window.getComputedStyle(root);
      const a = styles.getPropertyValue("--accent").trim() || "#8b5cf6";
      const b = styles.getPropertyValue("--accent2").trim() || "#22d3ee";
      accentA = `${a}33`;
      accentB = `${b}2b`;
    };

    refreshColors();
    themeListeners.add(refreshColors);

    const pointer = { x: -9999, y: -9999 };
    if (pointerFine) {
      window.addEventListener(
        "pointermove",
        (e) => {
          pointer.x = e.clientX;
          pointer.y = e.clientY;
        },
        { passive: true }
      );
    }

    const particles = [];
    const rand = (min, max) => min + Math.random() * (max - min);

    const resize = () => {
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = Math.max(34, Math.min(90, Math.floor((w * h) / 14000)));
      while (particles.length < targetCount) {
        particles.push({
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(-0.35, 0.35),
          vy: rand(-0.25, 0.25),
          r: rand(1.1, 2.5)
        });
      }
      while (particles.length > targetCount) particles.pop();
    };

    resize();
    window.addEventListener("resize", resize);

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      // Update particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -40) p.x = w + 40;
        if (p.x > w + 40) p.x = -40;
        if (p.y < -40) p.y = h + 40;
        if (p.y > h + 40) p.y = -40;

        if (pointerFine) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 180 * 180) {
            p.x += dx * 0.002;
            p.y += dy * 0.002;
          }
        }
      }

      // Connections
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 150 * 150) continue;
          const t = 1 - d2 / (150 * 150);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 * t})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Dots
      for (const p of particles) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 26);
        g.addColorStop(0, accentA);
        g.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 26, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = accentB;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  })();

  // "Last updated" label (helps spot GH Pages caching).
  (function initLastUpdated() {
    const el = document.getElementById("last-updated");
    if (!el) return;
    const isPL = (document.documentElement.lang || "").toLowerCase().startsWith("pl");
    el.textContent = `${isPL ? "Aktualizacja" : "Updated"}: ${document.lastModified}`;
  })();

  // Typewriter headline.
  (function initTypewriter() {
    const blocks = Array.from(document.querySelectorAll("[data-typewriter]"));
    if (!blocks.length) return;

    for (const block of blocks) {
      if (!(block instanceof HTMLElement)) continue;
      const target = block.querySelector(".typewriter-text");
      if (!(target instanceof HTMLElement)) continue;

      let phrases = [];
      try {
        phrases = JSON.parse(block.dataset.phrases || "[]");
      } catch {
        phrases = [];
      }
      phrases = phrases.filter((p) => typeof p === "string" && p.trim().length > 0);
      if (!phrases.length) continue;

      if (prefersReducedMotion) {
        target.textContent = phrases[0];
        continue;
      }

      let phraseIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const tick = () => {
        const phrase = phrases[phraseIndex] || "";
        if (!deleting) {
          charIndex = Math.min(phrase.length, charIndex + 1);
          target.textContent = phrase.slice(0, charIndex);
          if (charIndex >= phrase.length) {
            deleting = true;
            window.setTimeout(tick, 850);
            return;
          }
          window.setTimeout(tick, 34);
          return;
        }

        charIndex = Math.max(0, charIndex - 1);
        target.textContent = phrase.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          window.setTimeout(tick, 260);
          return;
        }
        window.setTimeout(tick, 22);
      };

      window.setTimeout(tick, 420);
    }
  })();

  // Animated counters (stats).
  (function initCounters() {
    const els = Array.from(document.querySelectorAll("[data-counter]"));
    if (!els.length) return;

    const read = (el) => {
      const to = Number(el.dataset.to ?? el.textContent);
      const from = Number(el.dataset.from ?? 0);
      const decimals = Number(el.dataset.decimals ?? (Number.isInteger(to) ? 0 : 1));
      return { to, from, decimals };
    };

    const format = (n, decimals) => {
      if (!Number.isFinite(n)) return "";
      if (!decimals) return String(Math.round(n));
      return n.toFixed(decimals);
    };

    const run = (el) => {
      if (!(el instanceof HTMLElement)) return;
      if (el.dataset.counted === "1") return;
      el.dataset.counted = "1";

      const { to, from, decimals } = read(el);
      if (!Number.isFinite(to) || !Number.isFinite(from)) return;

      if (prefersReducedMotion) {
        el.textContent = format(to, decimals);
        return;
      }

      el.textContent = format(from, decimals);

      const duration = Math.max(
        650,
        Math.min(1200, 650 + Math.abs(to - from) * 18)
      );
      const start = performance.now();

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const frame = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const v = from + (to - from) * easeOutCubic(p);
        el.textContent = format(v, decimals);
        if (p < 1) window.requestAnimationFrame(frame);
      };

      window.requestAnimationFrame(frame);
    };

    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      els.forEach(run);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          run(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35 }
    );

    els.forEach((el) => observer.observe(el));
  })();
})();
