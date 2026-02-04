(function () {
  const form = document.querySelector("#contact-form");
  const statusEl = document.querySelector("#form-status");
  const submitBtn = document.querySelector("#submit-btn");
  const fallbackLink = document.querySelector("#mailto-fallback");

  if (!form || !statusEl || !submitBtn) return;

  const TO_EMAIL = "xyz908006@gmail.com";
  const MAX_BODY_CHARS = 2500;

  const STRINGS = {
    pl: {
      required: "Uzupełnij wymagane pola.",
      opening: "Otwieram aplikację pocztową…",
      opened: "Powinna otworzyć się aplikacja pocztowa.",
      truncated:
        "[Wiadomość skrócona, żeby zmieściła się w linku — resztę dopisz w kolejnym mailu.]",
      subjectPrefix: "[Kontakt]",
      labels: {
        firstName: "Imię",
        lastName: "Nazwisko",
        email: "Email",
        category: "Kategoria",
        title: "Tytuł"
      }
    },
    en: {
      required: "Please complete the required fields.",
      opening: "Opening your email app…",
      opened: "Your email app should open now.",
      truncated:
        "[Message truncated to fit in an email link — send the rest in a follow‑up if needed.]",
      subjectPrefix: "[Contact]",
      labels: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        category: "Category",
        title: "Title"
      }
    }
  };

  const CATEGORY_LABELS = {
    pl: {
      job_offer: "Oferta pracy",
      websites: "Strony",
      startup: "Startup",
      advising: "Doradztwo",
      other: "Inne"
    },
    en: {
      job_offer: "Job offer",
      websites: "Websites",
      startup: "Startup",
      advising: "Advising",
      other: "Other"
    }
  };

  const getLang = () => {
    const value = (
      document.documentElement.dataset.lang ||
      document.documentElement.lang ||
      window.localStorage.getItem("lang") ||
      navigator.language ||
      "en"
    )
      .toLowerCase()
      .trim();
    return value.startsWith("pl") ? "pl" : "en";
  };

  const categoryLabel = (code, lang) => {
    const labels = CATEGORY_LABELS[lang] || CATEGORY_LABELS.en;
    return labels[code] || code || "";
  };

  const setStatus = (message, type) => {
    statusEl.textContent = message;
    statusEl.classList.remove("ok", "error");
    if (type) statusEl.classList.add(type);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (fallbackLink instanceof HTMLElement) {
      fallbackLink.style.display = "none";
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      const lang = getLang();
      setStatus((STRINGS[lang] || STRINGS.en).required, "error");
      return;
    }

    const lang = getLang();
    const s = STRINGS[lang] || STRINGS.en;

    setStatus(s.opening);
    submitBtn.disabled = true;

    const data = Object.fromEntries(new FormData(form).entries());
    const firstName = String(data.firstName || "").trim();
    const lastName = String(data.lastName || "").trim();
    const email = String(data.email || "").trim();
    const category = categoryLabel(String(data.category || "").trim(), lang);
    const title = String(data.title || "").trim();
    let description = String(data.description || "").trim();

    if (description.length > MAX_BODY_CHARS) {
      description =
        description.slice(0, MAX_BODY_CHARS).trimEnd() +
        `\n\n${s.truncated}`;
    }

    const subject = `${s.subjectPrefix} ${category}: ${title}`.trim();
    const body = [
      `${s.labels.firstName}: ${firstName}`,
      `${s.labels.lastName}: ${lastName}`,
      `${s.labels.email}: ${email}`,
      `${s.labels.category}: ${category}`,
      `${s.labels.title}: ${title}`,
      "",
      description
    ].join("\n");

    const mailtoUrl = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    if (fallbackLink instanceof HTMLAnchorElement) {
      fallbackLink.href = mailtoUrl;
      fallbackLink.style.display = "inline";
    }

    // Try both approaches — different browsers handle `mailto:` differently.
    try {
      const a = document.createElement("a");
      a.href = mailtoUrl;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      // ignore
    }

    window.location.href = mailtoUrl;
    setStatus(s.opened, "ok");
    submitBtn.disabled = false;
  });
})();
