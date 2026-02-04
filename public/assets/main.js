(function () {
  const storageKey = "theme";
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");

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
    });
  }

  // Mark active navigation link based on the current path.
  const currentPath = window.location.pathname.replace(/\/+$/, "");
  const currentFile = currentPath.split("/").filter(Boolean).at(-1) || "";

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
})();
