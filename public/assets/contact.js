(function () {
  const form = document.querySelector("#contact-form");
  const statusEl = document.querySelector("#form-status");
  const submitBtn = document.querySelector("#submit-btn");

  if (!form || !statusEl || !submitBtn) return;

  const TO_EMAIL = "xyz908006@gmail.com";
  const MAX_BODY_CHARS = 2500;

  const setStatus = (message, type) => {
    statusEl.textContent = message;
    statusEl.classList.remove("ok", "error");
    if (type) statusEl.classList.add(type);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("Please complete the required fields.", "error");
      return;
    }

    setStatus("Opening your email app…");
    submitBtn.disabled = true;

    const data = Object.fromEntries(new FormData(form).entries());
    const firstName = String(data.firstName || "").trim();
    const lastName = String(data.lastName || "").trim();
    const email = String(data.email || "").trim();
    const category = String(data.category || "").trim();
    const title = String(data.title || "").trim();
    let description = String(data.description || "").trim();

    if (description.length > MAX_BODY_CHARS) {
      description =
        description.slice(0, MAX_BODY_CHARS).trimEnd() +
        "\n\n[Message truncated to fit in an email link — if needed, send the rest in a follow‑up.]";
    }

    const subject = `[Contact] ${category}: ${title}`.trim();
    const body = [
      `First name: ${firstName}`,
      `Last name: ${lastName}`,
      `Email: ${email}`,
      `Category: ${category}`,
      `Title: ${title}`,
      "",
      description
    ].join("\n");

    const mailtoUrl = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    setStatus("Your email app should open now.", "ok");
    submitBtn.disabled = false;
  });
})();
