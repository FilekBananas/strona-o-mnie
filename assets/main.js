(function () {
  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointerFine =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: fine)").matches;

  const root = document.documentElement;

  // Page detection
  const currentPath = window.location.pathname.replace(/\/+$/, "");
  const parts = currentPath.split("/").filter(Boolean);
  const currentFile = parts.length ? parts[parts.length - 1] : "";
  const pvIndex = parts.indexOf("pv");
  const isPv = pvIndex !== -1;
  const isMessages = pvIndex !== -1 && parts[pvIndex + 1] === "wiadomosci";
  const statsIndex = parts.indexOf("staty");
  const isStats = statsIndex !== -1;
  const isContact =
    currentFile === "contact.html" ||
    currentFile === "contact" ||
    window.location.hash.includes("contact");

  // i18n
  const LANG_KEY = "lang";
  const I18N = {
    pl: {
      page_title_about: "Filip Biskupski — O mnie",
      page_title_contact: "Kontakt — Filip Biskupski",
      page_title_messages: "Wiadomości — Filip Biskupski",
      page_title_stats: "Staty — Filip Biskupski",
      meta_about:
        "Startup founder. Tworzę QR Transfers i lubię rozumieć systemy od środka.",
      meta_contact: "Kontakt: email i formularz.",
      meta_messages: "Podgląd wiadomości z formularza kontaktowego.",
      meta_stats: "Statystyki wejść i źródeł ruchu.",

      nav_about: "O mnie",
      nav_contact: "Kontakt",
      nav_theme: "Motyw",
      lang_label: "Język",
      skip: "Przejdź do treści",

      theme_to_dark: "Przełącz na ciemny motyw",
      theme_to_light: "Przełącz na jasny motyw",
      last_updated: "Aktualizacja",

      hero_title: "Startup founder. Buduję produkty i systemy.",
      hero_lead_before: "Prowadzę startup pod",
      hero_lead_after:
        "Lubię rozumieć systemy od środka, budować nowe projekty i automatyzować pracę w praktyczny, pozytywny sposób — tak, żeby skupiać się na tym, co naprawdę ważne.",
      hero_btn_contact: "Kontakt",
      hero_btn_timeline: "Oś czasu",
      type_prefix: "Aktualnie:",
      typewriter_phrases: [
        "Buduję QR Transfers",
        "Uczę się systemów od środka",
        "Automatyzuję i tworzę nowe projekty",
        "Lubię debaty i mocne argumenty"
      ],

      pill_oij: "2× Finalista OIJ",
      pill_profile: "Mat‑Fiz‑Inf",
      pill_city: "Warszawa",

      quick_title: "W skrócie",
      quick_edu:
        "Edukacja: LO im. Stanisława Staszica w Warszawie (od 1.09.2025) — profil mat‑fiz‑inf",
      quick_prev: "Wcześniej: niepubliczna szkoła im. Juliusza Verne’a w Warszawie",
      quick_primary: "Podstawówka: ukończona ze średnią 5,8 (czerwiec 2025)",
      quick_olympiads: "Olimpiady: 2× finalista Olimpiady Informatycznej Juniorów",
      quick_p:
        "Interesują mnie debaty, informatyka (różne dziedziny) i budowanie produktów — od pomysłu do działającego systemu. Najlepiej czuję się, gdy mogę coś zaprojektować, zbudować i sprawdzić w praktyce.",

      stat_oij: "Finalista OIJ",
      stat_avg: "Średnia (podstawówka)",
      stat_e8_math: "Matematyka (E8)",
      stat_qr: "Start QR Transfers",

      about_h2: "O mnie",
      about_who_h3: "Kim jestem",
      about_who_p1:
        "Jestem founderem startupu i uczniem z Warszawy. Buduję QR Transfers oraz rozwijam się w kierunku inżynierii oprogramowania i budowania produktów — od pomysłu, przez prototyp, aż po działający system.",
      about_who_p2:
        "Byłem 2‑krotnym finalistą Olimpiady Informatycznej Juniorów (w 7. i 8. klasie) — to dało mi mocne podstawy algorytmiczne i nawyk systematycznej pracy.",
      about_who_p3:
        "Najbardziej kręci mnie moment, w którym pomysł zamienia się w działający produkt: od koncepcji, przez pierwsze prototypy, aż do systemu, który ma sens i działa stabilnie.",
      about_how_h3: "Jak myślę i działam",
      about_how_p:
        "Mój tok myślenia opiera się na zrozumieniu tego, jak coś działa. Lubię poznawać systemy “od środka” — od danych, przez logikę, aż po interfejs — i upraszczać procesy.",
      about_how_p2:
        "Zwykle zaczynam od pytania “po co?” i “co jest najważniejsze?”, a dopiero potem dobieram narzędzia. Dzięki temu łatwiej budować rzeczy proste, szybkie i użyteczne.",
      about_how_li1: "Automatyzuję pracę tam, gdzie ma to sens",
      about_how_li2: "Buduję prototypy szybko, ale z myślą o jakości",
      about_how_li3: "Najlepiej uczę się, gdy mogę coś zbudować i przetestować",
      about_how_li4: "Lubię rozbijać problem na mniejsze kawałki",
      about_how_li5: "Dbam o czytelność, bo to przyspiesza rozwój",

      tech_h3: "Technologie",
      tech_p1:
        "Programuję głównie w C++, Pythonie i JavaScripcie oraz używam HTML/CSS do webu. Lubię dopasować technologię do zadania i budować rozwiązania, które da się rozwijać.",
      tech_li1: "C++ — algorytmy, myślenie konkursowe, wydajność",
      tech_li2: "Python — automatyzacje, narzędzia, backend",
      tech_li3: "JavaScript + HTML/CSS — interaktywne UI i UX",
      tech_li4:
        "Flask (Python) — mój ulubiony wybór do stron, gdy potrzebuję backendu i szablonów",

      build_h3: "Jak buduję projekty",
      build_p1:
        "Najpierw sprawdzam, czy problem jest realny i czy da się go rozwiązać prosto. Potem stawiam prototyp, zbieram feedback i iteruję.",
      build_p2:
        "Lubię, kiedy wszystko jest “ogarnialne”: jasne priorytety, małe kroki, szybkie testy, a na końcu produkt, z którego ktoś faktycznie korzysta.",
      build_li1: "Prototyp → test → poprawki → wersja produkcyjna",
      build_li2: "Automatyzacje, które oszczędzają czas na co dzień",
      build_li3: "Dobre podstawy: prostota, bezpieczeństwo, stabilność",

      beyond_h3: "Poza kodem",
      beyond_p1:
        "Jestem przeciwnikiem systemu i uważam, że w obecnej formie potrafi zabijać mnie i innych — dlatego staram się mu przeciwstawiać, budując rzeczy, które dają ludziom więcej wolności i sprawczości.",
      beyond_p2:
        "Lubię też czytać liczne książki — to mój sposób na poszerzanie perspektywy i dokładanie kolejnych “narzędzi do myślenia”.",

      timeline_h2: "Oś czasu",
      t1_date: "wrz 2017",
      t1_title: "Start: niepubliczna szkoła im. Juliusza Verne’a (Warszawa)",
      t1_desc: "Szkoła podstawowa.",
      t2_date: "2023/2024",
      t2_title: "Finalista OIJ (7. klasa)",
      t3_date: "2024/2025",
      t3_title: "Finalista OIJ (8. klasa)",
      t4_date: "cze 2025",
      t4_title:
        "Ukończenie podstawówki (średnia 5,8) — szkoła im. Juliusza Verne’a",
      t5_date: "2025",
      t5_title_before: "Start QR Transfers —",
      t5_desc: "Bez dokładnej daty — 2025 rok.",
      t6_date: "1 wrz 2025",
      t6_title:
        "Start LO im. Stanisława Staszica w Warszawie (profil mat‑fiz‑inf)",

      awards_h2: "Osiągnięcia i zainteresowania",
      honors_h3: "Osiągnięcia",
      honors_p:
        "Traktuję konkursy i projekty jako trening: uczą systematyczności, rozwiązywania problemów i szukania prostych, działających rozwiązań.",
      honors_li1: "2× finalista Olimpiady Informatycznej Juniorów (klasa 7 i 8)",
      honors_li4:
        "Zakwalifikowałem się do finału mazowieckiego konkursu informatycznego LOGIA",
      honors_li5: "Zakwalifikowałem się do 2. etapu Olimpiady Matematycznej",
      honors_li6: "100% z matematyki (egzamin ósmoklasisty)",
      honors_li2: "Wielokrotnie wyróżniony w Kangurze Matematycznym",
      honors_li3: "Wielokrotnie wyróżniony w konkursie logicznego myślenia",
      interests_h3: "Co mnie kręci",
      interests_p:
        "Lubię łączyć myślenie “na chłodno” z kreatywnością — z jednej strony logika i dowody, z drugiej: produkt, UX i szybkie eksperymenty.",
      interests_li1: "Debaty i logiczne argumentowanie",
      interests_li2: "Informatyka (różne dziedziny) i startupy",
      interests_li3: "Rozumienie systemów “od środka”",
      interests_li4: "Automatyzacje, narzędzia, nowe projekty",
      write_btn: "Napisz do mnie",

      goal_h2: "Cel i wartości",
      goal_h3: "Zmienianie świata na lepszy",
      goal_p1:
        "Moim celem jest zmieniać świat na lepszy. Wierzę, że największy realny wpływ mogę mieć, budując startupy i produkty, które poprawiają życie ludzi.",
      goal_p2:
        "Dlatego stawiam na zrozumienie “jak to działa”, szybkie prototypowanie i iterowanie aż do działającego systemu.",
      goal_p3:
        "Chcę tworzyć rzeczy proste w użyciu, uczciwe wobec użytkownika i na tyle solidne, żeby można było na nich polegać.",

      lead_h3: "Wolontariat i liderstwo",
      lead_p:
        "Lubię robić rzeczy, które mają sens nie tylko “dla mnie”. Wolontariat i działalność w szkole nauczyły mnie organizacji, komunikacji i tego, że najwięcej da się zrobić zespołowo.",
      lead_li1: "Brałem udział w wielu wolontariatach",
      lead_li2: "W podstawówce byłem wiceprzewodniczącym szkoły (samorządu uczniowskiego)",
      lead_li3: "Lubię działać w zespole i brać odpowiedzialność",

      sport_h3: "Sport",
      sport_p:
        "Sport daje mi energię i uczy regularności. Lubię trenować i widzieć progres — nawet mały, ale konsekwentny.",
      sport_li1: "Uwielbiam sport i zdrową rywalizację",
      sport_li2: "Trenowałem tenis stołowy — liczne sukcesy w turniejach dzielnicowych",
      sport_li3: "Trenuję tenis i narciarstwo",

      social_h3: "Social media",
      social_p: "Możesz znaleźć mnie tutaj:",

      contact_h1: "Pogadajmy.",
      contact_lead:
        "Możesz napisać maila albo skorzystać z formularza — wybierz, co wygodniejsze.",
      contact_email_h2: "Email",
      contact_email_p: "Kliknij adres poniżej, żeby otworzyć nową wiadomość.",
      contact_email_note: "Odpisuję, gdy tylko mogę.",
      contact_form_h2: "Formularz kontaktu",
      contact_form_p:
        "Możesz wysłać mi wiadomość przez formularz (to najwygodniejsze). Jeśli wolisz, zawsze możesz też napisać bezpośrednio na maila.",
      first_name: "Imię",
      last_name: "Nazwisko",
      email: "Email",
      category: "Kategoria",
      category_placeholder: "Wybierz…",
      cat_job_offer: "Oferta pracy",
      cat_websites: "Strony",
      cat_startup: "Startup",
      cat_advising: "Doradztwo",
      cat_other: "Inne",
      title_label: "Tytuł",
      desc_label: "Opis",
      desc_ph: "Kilka zdań wystarczy…",
      send_btn: "Wyślij",
      status_idle: "Gotowe do wysłania.",
      status_sending: "Wysyłanie…",
      status_ok: "Wysłano. Dzięki!",
      status_error: "Nie udało się wysłać. Napisz maila.",
      status_rate: "Chwila… spróbuj ponownie za moment.",
      status_need_key: "Formularz jest chwilowo wyłączony — napisz maila.",
      mailto_fallback: "Jeśli formularz nie działa, kliknij tutaj i wyślij maila.",
      back_about: "Wróć do O mnie",

      pv_h1: "Wiadomości",
      pv_lead:
        "Tutaj możesz podejrzeć wszystkie wysyłki z formularza kontaktowego (zapisane w LICZNIK → baza podstawowa).",
      pv_key_label: "LICZNIK API key",
      pv_key_ph: "Wklej klucz…",
      pv_key_help:
        "Klucz zapisuję lokalnie w tej przeglądarce (localStorage). Jest używany tylko do zapytań do API.",
      pv_save: "Zapisz i wczytaj",
      pv_clear: "Wyczyść",
      pv_need_key: "Wklej klucz, żeby wczytać wiadomości.",
      pv_loading: "Wczytywanie…",
      pv_ok: "Wczytano.",
      pv_empty: "Brak wiadomości.",
      pv_error: "Nie udało się wczytać wiadomości.",
      pv_views: "Wyświetlenia",
      pv_uniques: "Unikalne osoby",
      pv_from: "Od",
      pv_category: "Kategoria",
      pv_title_label: "Tytuł",
      pv_message: "Wiadomość",
      pv_time: "Czas",

      stats_h1: "Statystyki",
      stats_lead:
        "Globalne statystyki strony + szczegółowe źródła ruchu (parametr <code>?from=...</code>).",
      stats_total_h2: "Łącznie",
      stats_sources_h2: "Źródła (from)",
      stats_example:
        "Przykład linku: <code>/from/instagram</code> (albo <code>/?from=instagram</code>). Wejścia z tego linku zliczą się do źródła <code>instagram</code>.",
      stats_views: "Wyświetlenia",
      stats_uniques: "Unikalne osoby",
      stats_new: "Nowe osoby (pierwsza wizyta)",
      stats_loading: "Wczytywanie statystyk…",
      stats_error: "Nie udało się wczytać statystyk.",
      stats_need_key: "Brak klucza API — nie mogę wczytać statystyk.",
      stats_no_sources: "Brak danych źródeł."
    },
    en: {
      page_title_about: "Filip Biskupski — About",
      page_title_contact: "Contact — Filip Biskupski",
      page_title_messages: "Messages — Filip Biskupski",
      page_title_stats: "Stats — Filip Biskupski",
      meta_about:
        "Startup founder. Building QR Transfers and learning systems from the inside out.",
      meta_contact: "Contact page with email and a form.",
      meta_messages: "Viewer for messages sent via the contact form.",
      meta_stats: "Website entry and traffic-source statistics.",

      nav_about: "About",
      nav_contact: "Contact",
      nav_theme: "Theme",
      lang_label: "Language",
      skip: "Skip to content",

      theme_to_dark: "Switch to dark theme",
      theme_to_light: "Switch to light theme",
      last_updated: "Updated",

      hero_title: "Startup founder. I build products and systems.",
      hero_lead_before: "I run a startup at",
      hero_lead_after:
        "I like understanding systems from the inside, building new projects, and automating work in a practical, positive way — so I can focus on what matters most.",
      hero_btn_contact: "Contact",
      hero_btn_timeline: "Timeline",
      type_prefix: "Currently:",
      typewriter_phrases: [
        "Building QR Transfers",
        "Learning systems inside-out",
        "Automating and shipping projects",
        "I enjoy debates and strong arguments"
      ],

      pill_oij: "2× OIJ finalist",
      pill_profile: "Math‑Physics‑CS",
      pill_city: "Warsaw",

      quick_title: "At a glance",
      quick_edu:
        "Education: Stanisław Staszic High School in Warsaw (from Sep 1, 2025) — math/physics/CS track",
      quick_prev: "Previously: Julius Verne private school in Warsaw",
      quick_primary: "Primary school: graduated with a 5.8 average (June 2025)",
      quick_olympiads: "Olympiads: 2× finalist of the Junior Informatics Olympiad (OIJ)",
      quick_p:
        "I’m into debates, computer science (different areas), and building products — from idea to a working system. I’m at my best when I can design, build, and validate something in real life.",

      stat_oij: "OIJ finalist",
      stat_avg: "Average grade",
      stat_e8_math: "Math (E8 exam)",
      stat_qr: "QR Transfers started",

      about_h2: "About",
      about_who_h3: "Who I am",
      about_who_p1:
        "I’m a startup founder and a student from Warsaw. I’m building QR Transfers and growing as a software engineer and product builder — from idea, to prototype, to a system people can actually use.",
      about_who_p2:
        "I was a 2× finalist of the Junior Informatics Olympiad (in 7th and 8th grade) — it gave me strong algorithmic fundamentals and the habit of consistent work.",
      about_who_p3:
        "What excites me most is the moment when an idea turns into a real product: from concept, through early prototypes, to a system that makes sense and works reliably.",
      about_how_h3: "How I think & work",
      about_how_p:
        "My thinking is based on understanding how things work. I enjoy exploring systems from the inside — from data, through logic, all the way to the interface — and simplifying processes.",
      about_how_p2:
        "I usually start with “why?” and “what matters most?” and only then pick tools. It makes it easier to build things that are simple, fast, and useful.",
      about_how_li1: "I automate work where it makes sense",
      about_how_li2: "I prototype fast, with quality in mind",
      about_how_li3: "I learn best by building and testing",
      about_how_li4: "I like breaking problems into smaller pieces",
      about_how_li5: "I care about readability because it speeds things up",

      tech_h3: "Tech stack",
      tech_p1:
        "I mostly code in C++, Python, and JavaScript, and use HTML/CSS for the web. I like choosing the right tool for the job and building solutions that can grow over time.",
      tech_li1: "C++ — algorithms, competitive thinking, performance",
      tech_li2: "Python — automation, tooling, backend",
      tech_li3: "JavaScript + HTML/CSS — interactive UI and UX",
      tech_li4:
        "Flask (Python) — my go‑to for websites when I need a backend and templates",

      build_h3: "How I build projects",
      build_p1:
        "First I validate the problem and look for the simplest useful solution. Then I build a prototype, collect feedback, and iterate.",
      build_p2:
        "I like things to be manageable: clear priorities, small steps, quick tests — and in the end, a product that someone genuinely uses.",
      build_li1: "Prototype → test → iterate → production",
      build_li2: "Automation that saves time daily",
      build_li3: "Strong basics: simplicity, security, stability",

      beyond_h3: "Beyond code",
      beyond_p1:
        "I’m against the system — I believe that in its current form it can kill me and others, so I try to push back by building things that give people more freedom and agency.",
      beyond_p2:
        "I also like reading lots of books — it’s my way of widening my perspective and adding new “tools for thinking”.",

      timeline_h2: "Timeline",
      t1_date: "Sep 2017",
      t1_title: "Started: Julius Verne private school (Warsaw)",
      t1_desc: "Primary school.",
      t2_date: "2023/2024",
      t2_title: "OIJ finalist (7th grade)",
      t3_date: "2024/2025",
      t3_title: "OIJ finalist (8th grade)",
      t4_date: "Jun 2025",
      t4_title: "Finished primary school (5.8 average) — Julius Verne School",
      t5_date: "2025",
      t5_title_before: "Started QR Transfers —",
      t5_desc: "No exact date — 2025.",
      t6_date: "Sep 1, 2025",
      t6_title:
        "Started Stanisław Staszic High School (Warsaw) — math/physics/CS track",

      awards_h2: "Achievements & interests",
      honors_h3: "Achievements",
      honors_p:
        "I treat competitions and projects like training: they build consistency, problem‑solving skills, and the ability to find simple solutions that work.",
      honors_li1: "2× Junior Informatics Olympiad finalist (grades 7 & 8)",
      honors_li4: "Qualified for the final of the Mazovian informatics contest LOGIA",
      honors_li5: "Qualified for the 2nd stage of the Mathematical Olympiad",
      honors_li6: "100% in math (8th‑grade exam, E8)",
      honors_li2: "Multiple distinctions in the Kangaroo Math contest",
      honors_li3: "Multiple distinctions in a logical thinking contest",
      interests_h3: "What I’m into",
      interests_p:
        "I enjoy mixing “cold” logic with creativity — on one side proofs and reasoning, on the other product thinking, UX, and fast experiments.",
      interests_li1: "Debates and clear reasoning",
      interests_li2: "Computer science and startups",
      interests_li3: "Understanding systems from the inside",
      interests_li4: "Automation, tools, new projects",
      write_btn: "Write to me",

      goal_h2: "Goal & values",
      goal_h3: "Making the world better",
      goal_p1:
        "My goal is to make the world better. I believe the biggest real impact I can have as an individual is by building startups and products that improve people’s lives.",
      goal_p2:
        "That’s why I focus on understanding how things work, prototyping fast, and iterating until it becomes a solid system.",
      goal_p3:
        "I want to build things that are easy to use, fair to users, and solid enough to rely on.",

      lead_h3: "Volunteering & leadership",
      lead_p:
        "I like doing things that matter beyond just myself. Volunteering and school activities taught me organization, communication, and that the biggest results come from teamwork.",
      lead_li1: "I’ve taken part in many volunteering initiatives",
      lead_li2: "In primary school, I was the vice‑chair of the student council",
      lead_li3: "I enjoy teamwork and taking responsibility",

      sport_h3: "Sports",
      sport_p:
        "Sports give me energy and teach consistency. I like training and seeing progress — even small, but steady.",
      sport_li1: "I love sports and healthy competition",
      sport_li2: "I trained table tennis — multiple successes in district tournaments",
      sport_li3: "I train tennis and skiing",

      social_h3: "Social media",
      social_p: "You can find me here:",

      contact_h1: "Let’s talk.",
      contact_lead: "You can email me or use the form — pick what’s easiest.",
      contact_email_h2: "Email",
      contact_email_p: "Click the address below to open a new email.",
      contact_email_note: "I reply as soon as I can.",
      contact_form_h2: "Contact form",
      contact_form_p:
        "You can send me a message using this form (the easiest way). If you prefer, you can always email me directly.",
      first_name: "First name",
      last_name: "Last name",
      email: "Email",
      category: "Category",
      category_placeholder: "Select one…",
      cat_job_offer: "Job offer",
      cat_websites: "Websites",
      cat_startup: "Startup",
      cat_advising: "Advising",
      cat_other: "Other",
      title_label: "Title",
      desc_label: "Description",
      desc_ph: "A few lines are enough…",
      send_btn: "Send",
      status_idle: "Ready to send.",
      status_sending: "Sending…",
      status_ok: "Sent. Thanks!",
      status_error: "Couldn’t send. Please email me.",
      status_rate: "Give it a moment… try again shortly.",
      status_need_key: "The form is temporarily disabled — please email me.",
      mailto_fallback: "If the form doesn’t work, click here to email me.",
      back_about: "Back to About",

      pv_h1: "Messages",
      pv_lead:
        "Here you can view all contact-form submissions (stored in LICZNIK → basic DB).",
      pv_key_label: "LICZNIK API key",
      pv_key_ph: "Paste your key…",
      pv_key_help:
        "The key is stored locally in this browser (localStorage). It’s only used for API requests.",
      pv_save: "Save & load",
      pv_clear: "Clear",
      pv_need_key: "Paste the key to load messages.",
      pv_loading: "Loading…",
      pv_ok: "Loaded.",
      pv_empty: "No messages yet.",
      pv_error: "Failed to load messages.",
      pv_views: "Views",
      pv_uniques: "Unique visitors",
      pv_from: "From",
      pv_category: "Category",
      pv_title_label: "Title",
      pv_message: "Message",
      pv_time: "Time",

      stats_h1: "Stats",
      stats_lead:
        "Global website stats + detailed traffic sources (the <code>?from=...</code> parameter).",
      stats_total_h2: "Total",
      stats_sources_h2: "Sources (from)",
      stats_example:
        "Example link: <code>/from/instagram</code> (or <code>/?from=instagram</code>). Visits from that link will be attributed to <code>instagram</code>.",
      stats_views: "Views",
      stats_uniques: "Unique visitors",
      stats_new: "New users (first visit)",
      stats_loading: "Loading stats…",
      stats_error: "Failed to load stats.",
      stats_need_key: "Missing API key — can’t load stats.",
      stats_no_sources: "No source data yet."
    }
  };

  let lang = window.localStorage.getItem(LANG_KEY);
  if (lang !== "pl" && lang !== "en") {
    const browser = (navigator.language || "en").toLowerCase();
    lang = browser.startsWith("pl") ? "pl" : "en";
  }

  const langListeners = new Set();
  const notifyLangChange = () => {
    langListeners.forEach((fn) => {
      try {
        fn();
      } catch {
        // ignore
      }
    });
  };

  const t = (key) => {
    const dict = I18N[lang] || I18N.en;
    const value = dict[key];
    return typeof value === "string" ? value : "";
  };

  const applyI18n = () => {
    const dict = I18N[lang] || I18N.en;
    root.dataset.lang = lang;
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const value = dict[key];
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.dataset.i18nHtml;
      const value = dict[key];
      if (typeof value === "string") el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      const value = dict[key];
      if (typeof value === "string") el.setAttribute("placeholder", value);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.dataset.i18nAriaLabel;
      const value = dict[key];
      if (typeof value === "string") el.setAttribute("aria-label", value);
    });

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      const desc = isMessages
        ? dict.meta_messages
        : isStats
          ? dict.meta_stats
          : isContact
            ? dict.meta_contact
            : dict.meta_about;
      if (typeof desc === "string") meta.setAttribute("content", desc);
    }
    document.title = isMessages
      ? dict.page_title_messages
      : isStats
        ? dict.page_title_stats
      : isContact
        ? dict.page_title_contact
        : dict.page_title_about;

    // Typewriter phrases (per language)
    document.querySelectorAll("[data-typewriter]").forEach((el) => {
      const phrases = dict.typewriter_phrases;
      if (Array.isArray(phrases)) {
        el.dataset.phrases = JSON.stringify(phrases);
      }
    });

    // Theme toggle aria label should match language
    const themeBtn = document.querySelector("[data-theme-toggle]");
    if (themeBtn) {
      const theme = root.dataset.theme === "light" ? "light" : "dark";
      themeBtn.setAttribute(
        "aria-label",
        theme === "light" ? dict.theme_to_dark : dict.theme_to_light
      );
    }
  };

  const updateLangButtons = () => {
    document.querySelectorAll(".lang-btn[data-lang]").forEach((btn) => {
      const btnLang = btn.getAttribute("data-lang");
      btn.setAttribute("aria-pressed", btnLang === lang ? "true" : "false");
    });
  };

  const setLang = (next) => {
    if (next !== "pl" && next !== "en") return;
    if (next === lang) return;
    lang = next;
    window.localStorage.setItem(LANG_KEY, lang);
    applyI18n();
    updateLangButtons();
    notifyLangChange();
  };

  document.querySelectorAll(".lang-btn[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });

  applyI18n();
  updateLangButtons();

  // Theme
  const storageKey = "theme";
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
      toggle.setAttribute("aria-label", theme === "light" ? t("theme_to_dark") : t("theme_to_light"));
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
      ...Array.from(document.querySelectorAll(".card")).filter(
        (c) => !(c instanceof HTMLElement && c.classList.contains("timeline-card"))
      ),
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

    // Stagger timeline items.
    const timelineItems = Array.from(document.querySelectorAll(".timeline-item"));
    timelineItems.forEach((el, i) => {
      if (!(el instanceof HTMLElement)) return;
      const delay = Math.min(650, i * 90);
      el.style.transitionDelay = `${delay}ms`;
    });

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

    const update = () => {
      const prefix = t("last_updated") || "Updated";
      el.textContent = `${prefix}: ${document.lastModified}`;
    };

    update();
    langListeners.add(update);
  })();

  // Typewriter headline.
  (function initTypewriter() {
    const blocks = Array.from(document.querySelectorAll("[data-typewriter]"));
    if (!blocks.length) return;

    const controllers = new WeakMap();

    const start = (block) => {
      if (!(block instanceof HTMLElement)) return () => {};
      const target = block.querySelector(".typewriter-text");
      if (!(target instanceof HTMLElement)) return () => {};

      let phrases = [];
      try {
        phrases = JSON.parse(block.dataset.phrases || "[]");
      } catch {
        phrases = [];
      }
      phrases = phrases.filter((p) => typeof p === "string" && p.trim().length > 0);
      if (!phrases.length) return () => {};

      if (prefersReducedMotion) {
        target.textContent = phrases[0];
        return () => {};
      }

      let phraseIndex = 0;
      let charIndex = 0;
      let deleting = false;
      let cancelled = false;
      let timeoutId = 0;

      const stop = () => {
        cancelled = true;
        if (timeoutId) window.clearTimeout(timeoutId);
      };

      const tick = () => {
        if (cancelled) return;
        const phrase = phrases[phraseIndex] || "";

        if (!deleting) {
          charIndex = Math.min(phrase.length, charIndex + 1);
          target.textContent = phrase.slice(0, charIndex);
          if (charIndex >= phrase.length) {
            deleting = true;
            timeoutId = window.setTimeout(tick, 850);
            return;
          }
          timeoutId = window.setTimeout(tick, 34);
          return;
        }

        charIndex = Math.max(0, charIndex - 1);
        target.textContent = phrase.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timeoutId = window.setTimeout(tick, 260);
          return;
        }
        timeoutId = window.setTimeout(tick, 22);
      };

      timeoutId = window.setTimeout(tick, 420);
      return stop;
    };

    const restartAll = () => {
      for (const block of blocks) {
        const stop = controllers.get(block);
        if (typeof stop === "function") stop();
        controllers.delete(block);
      }
      for (const block of blocks) controllers.set(block, start(block));
    };

    restartAll();
    langListeners.add(restartAll);
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

  // LICZNIK: unique visitors, view count, contact form storage, and /pv/wiadomosci viewer.
  (function initLicznik() {
    const BASE_URL = "https://licznik-794170040235.europe-central2.run.app";
    const PREFIX = "filip-biskupski-site-";

    const COUNTER_VIEWS = `${PREFIX}views`;
    const COUNTER_UNIQUES = `${PREFIX}uniques`;
    const BASIC_DB_MESSAGES = `${PREFIX}contact-messages`;

    const STORAGE_API_KEY = `${PREFIX}licznik-api-key`;
    const STORAGE_VIEWED_AT = `${PREFIX}viewed-at`;
    const STORAGE_VIEWED_SESSION = `${PREFIX}viewed-session`;
    const STORAGE_SEEN = `${PREFIX}seen`;
    const STORAGE_LAST_CONTACT = `${PREFIX}last-contact`;
    const STORAGE_FROM = `${PREFIX}from`;
    const STORAGE_FROM_MODE = `${PREFIX}from-mode`;

    const VIEW_TTL_MS = 1000 * 60 * 60; // 1 hour
    const UNIQUE_TTL_DAYS = 365;
    const CONTACT_TTL_MS = 1000 * 25; // 25 seconds
    const ENGAGEMENT_DELAY_MS = 3500;

    const safeStorageGet = (storage, key) => {
      try {
        return storage.getItem(key);
      } catch {
        return null;
      }
    };

    const safeStorageSet = (storage, key, value) => {
      try {
        storage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    };

    const safeStorageRemove = (storage, key) => {
      try {
        storage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    };

    const getApiKey = () => {
      const fromGlobal = typeof window.LICZNIK_API_KEY === "string" ? window.LICZNIK_API_KEY : "";
      const fromStorage = safeStorageGet(window.localStorage, STORAGE_API_KEY) || "";
      return String(fromGlobal || fromStorage || "").trim();
    };

    const isLikelyBot = () => {
      const ua = String(navigator.userAgent || "").toLowerCase();
      if (!ua) return false;
      if (navigator.webdriver) return true;
      const needles = [
        "bot",
        "crawler",
        "spider",
        "crawling",
        "headless",
        "lighthouse",
        "slurp",
        "bingbot",
        "bingpreview",
        "duckduckbot",
        "yandexbot",
        "baiduspider",
        "semrush",
        "ahrefs",
        "mj12bot",
        "facebookexternalhit",
        "telegrambot",
        "discordbot",
        "whatsapp",
        "preview"
      ];
      return needles.some((n) => ua.includes(n));
    };

    const setCookie = (name, value, days) => {
      const d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = `expires=${d.toUTCString()}`;
      document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
        value
      )}; ${expires}; path=/; SameSite=Lax`;
    };

    const getCookie = (name) => {
      const wanted = `${encodeURIComponent(name)}=`;
      const items = document.cookie.split(";").map((s) => s.trim());
      for (const item of items) {
        if (!item.startsWith(wanted)) continue;
        return decodeURIComponent(item.slice(wanted.length));
      }
      return null;
    };

    const buildUrl = (path, params) => {
      const base = BASE_URL.replace(/\/+$/, "");
      const url = new URL(`${base}${path.startsWith("/") ? path : `/${path}`}`);
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          if (v === undefined || v === null || v === "") return;
          url.searchParams.set(k, String(v));
        });
      }
      return url.toString();
    };

    const ensureBaseHref = (href) => {
      if (!href) return;
      try {
        let baseEl = document.querySelector('base[data-dynamic-base="1"]');
        if (!(baseEl instanceof HTMLBaseElement)) {
          baseEl = document.createElement("base");
          baseEl.setAttribute("data-dynamic-base", "1");
          document.head.prepend(baseEl);
        }
        baseEl.setAttribute("href", href);
      } catch {
        // ignore
      }
    };

    const sanitizeFrom = (raw) => {
      const s = String(raw || "")
        .trim()
        .toLowerCase();
      if (!s) return "";
      const cleaned = s
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "")
        .slice(0, 40);
      return cleaned;
    };

    const getFrom = () => safeStorageGet(window.sessionStorage, STORAGE_FROM) || "";

    const restoreFromPathMode = () => {
      const mode = safeStorageGet(window.sessionStorage, STORAGE_FROM_MODE) || "";
      if (mode !== "path") return;

      // Only restore on the base "directory" page (after 404 redirect).
      const pathname = String(window.location.pathname || "/");
      if (!pathname.endsWith("/")) {
        safeStorageRemove(window.sessionStorage, STORAGE_FROM_MODE);
        return;
      }
      if (isContact || isPv || isStats) {
        safeStorageRemove(window.sessionStorage, STORAGE_FROM_MODE);
        return;
      }

      const from = getFrom();
      if (!from) {
        safeStorageRemove(window.sessionStorage, STORAGE_FROM_MODE);
        return;
      }

      const baseHref = pathname;
      const nextPath = `${baseHref}from/${encodeURIComponent(from)}`;
      const nextUrl = `${nextPath}${window.location.search || ""}${window.location.hash || ""}`;

      try {
        window.history.replaceState(null, "", nextUrl);
      } catch {
        // ignore
      }

      // Keep internal relative links working even when URL is /from/<...>.
      ensureBaseHref(baseHref);
      safeStorageRemove(window.sessionStorage, STORAGE_FROM_MODE);
    };

    const captureFromParam = () => {
      let from = "";
      try {
        const url = new URL(window.location.href);
        const hasFrom = url.searchParams.has("from");
        const raw = url.searchParams.get("from") || "";
        const slug = sanitizeFrom(raw);
        const stored = getFrom();
        if (slug) safeStorageSet(window.sessionStorage, STORAGE_FROM, slug);
        from = slug || stored;

        if (hasFrom) {
          url.searchParams.delete("from");
          const qs = url.searchParams.toString();
          const next = `${url.pathname}${qs ? `?${qs}` : ""}${url.hash || ""}`;
          window.history.replaceState(null, "", next);
        }
      } catch {
        // ignore
      }
      return from;
    };

    const bumpCounter = (name) => {
      const apiKey = getApiKey();
      const url = buildUrl(`/dodaj/${encodeURIComponent(name)}`, {
        pixel: 1,
        key: apiKey || undefined,
        _: Date.now()
      });
      const img = new Image(1, 1);
      img.decoding = "async";
      img.referrerPolicy = "no-referrer";
      img.src = url;
    };

    const fromCounterViews = (from) => `${PREFIX}from-${from}-views`;
    const fromCounterUniques = (from) => `${PREFIX}from-${from}-uniques`;

    // Capture attribution early (so it works even if user sends the form fast).
    captureFromParam();
    restoreFromPathMode();

    const waitForEngagement = () =>
      new Promise((resolve) => {
        if (prefersReducedMotion) {
          resolve();
          return;
        }

        let done = false;
        let timeoutId = 0;

        const finish = () => {
          if (done) return;
          done = true;
          cleanup();
          resolve();
        };

        const onInteract = () => finish();

        const cleanup = () => {
          if (timeoutId) window.clearTimeout(timeoutId);
          window.removeEventListener("pointerdown", onInteract);
          window.removeEventListener("touchstart", onInteract);
          window.removeEventListener("keydown", onInteract);
          window.removeEventListener("scroll", onInteract);
        };

        timeoutId = window.setTimeout(finish, ENGAGEMENT_DELAY_MS);
        window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
        window.addEventListener("touchstart", onInteract, { once: true, passive: true });
        window.addEventListener("scroll", onInteract, { once: true, passive: true });
        window.addEventListener("keydown", onInteract, { once: true });
      });

    // Analytics: only count on public pages (skip /pv/*).
    (async function track() {
      if (isPv || isStats) return;
      if (document.visibilityState === "prerender") return;
      if (isLikelyBot()) return;

      const from = getFrom();

      await waitForEngagement();
      if (document.visibilityState === "hidden") return;

      const now = Date.now();
      const lastView = Number(safeStorageGet(window.localStorage, STORAGE_VIEWED_AT) || "0");
      const viewedThisSession = safeStorageGet(window.sessionStorage, STORAGE_VIEWED_SESSION) === "1";

      if (!viewedThisSession && (!Number.isFinite(lastView) || now - lastView > VIEW_TTL_MS)) {
        safeStorageSet(window.sessionStorage, STORAGE_VIEWED_SESSION, "1");
        safeStorageSet(window.localStorage, STORAGE_VIEWED_AT, String(now));
        bumpCounter(COUNTER_VIEWS);
        if (from) bumpCounter(fromCounterViews(from));
      }

      const seenCookie = getCookie(STORAGE_SEEN);
      const seenLocal = safeStorageGet(window.localStorage, STORAGE_SEEN) === "1";
      if (!seenCookie && !seenLocal) {
        safeStorageSet(window.localStorage, STORAGE_SEEN, "1");
        setCookie(STORAGE_SEEN, "1", UNIQUE_TTL_DAYS);
        bumpCounter(COUNTER_UNIQUES);
        if (from) bumpCounter(fromCounterUniques(from));
      }
    })();

    // Contact form -> basic DB.
    (function initContactForm() {
      const form = document.querySelector("[data-contact-form]");
      if (!(form instanceof HTMLFormElement)) return;

      const statusEl = document.getElementById("contact-status");
      let statusKey = "status_idle";

      const setStatusKey = (key, tone) => {
        statusKey = key;
        if (statusEl) {
          statusEl.classList.remove("ok", "error");
          if (tone) statusEl.classList.add(tone);
          statusEl.textContent = t(key);
        }
      };

      setStatusKey("status_idle");
      langListeners.add(() => setStatusKey(statusKey, statusEl?.classList.contains("error") ? "error" : statusEl?.classList.contains("ok") ? "ok" : ""));

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (isLikelyBot()) return;

        const hp = form.querySelector('input[name="company"]');
        if (hp instanceof HTMLInputElement && hp.value.trim().length) {
          setStatusKey("status_ok", "ok");
          form.reset();
          return;
        }

        const last = Number(safeStorageGet(window.localStorage, STORAGE_LAST_CONTACT) || "0");
        const now = Date.now();
        if (Number.isFinite(last) && now - last < CONTACT_TTL_MS) {
          setStatusKey("status_rate", "error");
          return;
        }

        const fd = new FormData(form);
        const firstName = String(fd.get("first_name") || "").trim();
        const lastName = String(fd.get("last_name") || "").trim();
        const email = String(fd.get("email") || "").trim();
        const category = String(fd.get("category") || "").trim();
        const title = String(fd.get("title") || "").trim();
        const desc = String(fd.get("description") || "").trim();

        if (!firstName || !lastName || !email || !category || !title || !desc) {
          setStatusKey("status_error", "error");
          return;
        }

        const payload = {
          ts: new Date().toISOString(),
          fn: firstName,
          ln: lastName,
          em: email,
          cat: category,
          ti: title,
          d: desc,
          p: window.location.pathname,
          from: getFrom()
        };

        const raw = JSON.stringify(payload);
        // Guard against extremely long URLs.
        if (raw.length > 1600) {
          setStatusKey("status_error", "error");
          return;
        }

        const apiKey = getApiKey();
        if (!apiKey) {
          setStatusKey("status_need_key", "error");
          return;
        }
        const url = buildUrl(
          `/baza-podstawowa/dodaj/${encodeURIComponent(BASIC_DB_MESSAGES)}/${encodeURIComponent(raw)}`,
          { key: apiKey, _: Date.now() }
        );

        setStatusKey("status_sending");

        try {
          const res = await fetch(url, { method: "GET" });
          if (!res.ok) {
            if (res.status === 401 || res.status === 403) {
              setStatusKey("status_need_key", "error");
            } else {
              setStatusKey("status_error", "error");
            }
            return;
          }
        } catch {
          try {
            // Fire-and-forget fallback for restrictive CORS setups.
            await fetch(url, { method: "GET", mode: "no-cors" });
          } catch {
            setStatusKey("status_error", "error");
            return;
          }
        }

        safeStorageSet(window.localStorage, STORAGE_LAST_CONTACT, String(Date.now()));
        setStatusKey("status_ok", "ok");
        form.reset();
      });
    })();

    // /pv/wiadomosci viewer.
    (function initMessagesViewer() {
      if (!isMessages) return;

      const keyInput = document.getElementById("pv-key");
      const btnSave = document.querySelector("[data-pv-save]");
      const btnClear = document.querySelector("[data-pv-clear]");
      const statusEl = document.getElementById("pv-status");
      const listEl = document.getElementById("pv-messages");
      const viewsEl = document.getElementById("pv-views");
      const uniquesEl = document.getElementById("pv-uniques");

      let statusKey = "pv_need_key";
      let statusTone = "";
      let lastItems = [];
      let lastViews = null;
      let lastUniques = null;

      const setStatus = (key, tone) => {
        statusKey = key;
        statusTone = tone || "";
        if (!statusEl) return;
        statusEl.classList.remove("ok", "error");
        if (tone) statusEl.classList.add(tone);
        statusEl.textContent = t(key);
      };

      const render = (items) => {
        lastItems = items;
        if (!listEl) return;
        listEl.innerHTML = "";

        if (!items.length) {
          const empty = document.createElement("div");
          empty.className = "card pad";
          empty.textContent = t("pv_empty");
          listEl.appendChild(empty);
          return;
        }

        for (const raw of items) {
          const card = document.createElement("div");
          card.className = "card pad";

          let obj = null;
          try {
            obj = JSON.parse(raw);
          } catch {
            obj = null;
          }

          if (!obj || typeof obj !== "object") {
            card.textContent = raw;
            listEl.appendChild(card);
            continue;
          }

          const top = document.createElement("div");
          top.style.display = "flex";
          top.style.justifyContent = "space-between";
          top.style.gap = "10px";
          top.style.flexWrap = "wrap";

          const left = document.createElement("div");
          left.style.minWidth = "0";

          const title = document.createElement("div");
          title.style.fontWeight = "650";
          title.textContent = `${t("pv_title_label")}: ${obj.ti || ""}`.trim();

          const meta = document.createElement("div");
          meta.className = "muted";
          meta.style.marginTop = "6px";
          meta.textContent = `${t("pv_from")}: ${(obj.fn || "").trim()} ${(obj.ln || "").trim()} • ${t("pv_category")}: ${obj.cat || ""}`;

          left.appendChild(title);
          left.appendChild(meta);

          const right = document.createElement("div");
          right.className = "muted";
          right.textContent = `${t("pv_time")}: ${obj.ts || ""}`;

          top.appendChild(left);
          top.appendChild(right);

          const msg = document.createElement("div");
          msg.style.marginTop = "12px";
          msg.textContent = `${t("pv_message")}: ${obj.d || ""}`.trim();

          const emailLine = document.createElement("div");
          emailLine.className = "muted";
          emailLine.style.marginTop = "10px";
          const emailLink = document.createElement("a");
          emailLink.href = `mailto:${encodeURIComponent(String(obj.em || "").trim())}`;
          emailLink.textContent = String(obj.em || "").trim();
          emailLine.appendChild(emailLink);

          card.appendChild(top);
          card.appendChild(msg);
          card.appendChild(emailLine);

          listEl.appendChild(card);
        }
      };

      const formatCount = (n) => {
        if (!Number.isFinite(n)) return "—";
        const value = Math.max(0, Math.round(n));
        try {
          return new Intl.NumberFormat(lang === "pl" ? "pl-PL" : "en-US").format(value);
        } catch {
          return String(value);
        }
      };

      const renderCounts = () => {
        if (viewsEl) viewsEl.textContent = formatCount(lastViews);
        if (uniquesEl) uniquesEl.textContent = formatCount(lastUniques);
      };

      const parseCounterValue = (text) => {
        const s = String(text || "").trim();
        if (!s) return NaN;

        try {
          const json = JSON.parse(s);
          if (typeof json === "number") return json;
          if (json && typeof json === "object") {
            const candidates = [json.value, json.count, json.result, json.data];
            const found = candidates.find((v) => typeof v === "number");
            if (typeof found === "number") return found;
          }
        } catch {
          // ignore
        }

        const n = Number(s.replace(/[^\d.-]/g, ""));
        return Number.isFinite(n) ? n : NaN;
      };

      const loadCounts = async (apiKey) => {
        if (!apiKey) {
          lastViews = null;
          lastUniques = null;
          renderCounts();
          return;
        }

        try {
          const [viewsText, uniquesText] = await Promise.all([
            fetch(
              buildUrl(`/ile/${encodeURIComponent(COUNTER_VIEWS)}`, {
                format: "json",
                key: apiKey
              }),
              { headers: { Accept: "application/json" } }
            ).then((r) => (r.ok ? r.text() : "")),
            fetch(
              buildUrl(`/ile/${encodeURIComponent(COUNTER_UNIQUES)}`, {
                format: "json",
                key: apiKey
              }),
              { headers: { Accept: "application/json" } }
            ).then((r) => (r.ok ? r.text() : ""))
          ]);

          lastViews = parseCounterValue(viewsText);
          lastUniques = parseCounterValue(uniquesText);
        } catch {
          lastViews = null;
          lastUniques = null;
        }

        renderCounts();
      };

      const load = async () => {
        const apiKey = getApiKey();
        if (!apiKey) {
          setStatus("pv_need_key", "error");
          render([]);
          loadCounts("");
          return;
        }

        setStatus("pv_loading");
        loadCounts(apiKey);
        try {
          const url = buildUrl(`/baza-podstawowa/odczyt/${encodeURIComponent(BASIC_DB_MESSAGES)}`, {
            format: "json",
            key: apiKey
          });
          const res = await fetch(url, { headers: { Accept: "application/json" } });
          if (!res.ok) {
            setStatus("pv_error", "error");
            return;
          }

          const text = await res.text();
          let items = [];
          try {
            const json = JSON.parse(text);
            if (Array.isArray(json)) items = json;
            else if (json && typeof json === "object") {
              const candidates = [json.items, json.data, json.values, json.elements];
              const found = candidates.find((v) => Array.isArray(v));
              if (Array.isArray(found)) items = found;
            }
          } catch {
            items = text
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean);
          }

          items = items.filter((v) => typeof v === "string");
          render(items.slice().reverse());
          setStatus("pv_ok", "ok");
        } catch {
          setStatus("pv_error", "error");
        }
      };

      const stored = safeStorageGet(window.localStorage, STORAGE_API_KEY) || "";
      if (keyInput instanceof HTMLInputElement) keyInput.value = stored;

      btnSave?.addEventListener("click", () => {
        if (keyInput instanceof HTMLInputElement) {
          safeStorageSet(window.localStorage, STORAGE_API_KEY, keyInput.value.trim());
        }
        load();
      });

      btnClear?.addEventListener("click", () => {
        safeStorageRemove(window.localStorage, STORAGE_API_KEY);
        if (keyInput instanceof HTMLInputElement) keyInput.value = "";
        setStatus("pv_need_key", "error");
        render([]);
        loadCounts("");
      });

      langListeners.add(() => {
        render(lastItems);
        renderCounts();
        setStatus(statusKey, statusTone);
      });
      load();
    })();

    // /staty page (global + per-source stats).
    (function initStatsPage() {
      if (!isStats) return;

      const statusEl = document.getElementById("stats-status");
      const totalViewsEl = document.getElementById("stats-views");
      const totalUniquesEl = document.getElementById("stats-uniques");
      const sourcesEl = document.getElementById("stats-sources");

      let statusKey = "stats_loading";
      let statusTone = "";
      let totalViews = null;
      let totalUniques = null;
      let sources = [];

      const setStatus = (key, tone) => {
        statusKey = key;
        statusTone = tone || "";
        if (!statusEl) return;
        statusEl.classList.remove("ok", "error");
        if (tone) statusEl.classList.add(tone);
        statusEl.textContent = key ? t(key) : "";
      };

      const formatCount = (n) => {
        if (!Number.isFinite(n)) return "—";
        const value = Math.max(0, Math.round(n));
        try {
          return new Intl.NumberFormat(lang === "pl" ? "pl-PL" : "en-US").format(value);
        } catch {
          return String(value);
        }
      };

      const renderTotals = () => {
        if (totalViewsEl) totalViewsEl.textContent = formatCount(totalViews);
        if (totalUniquesEl) totalUniquesEl.textContent = formatCount(totalUniques);
      };

      const renderSources = () => {
        if (!sourcesEl) return;
        sourcesEl.innerHTML = "";

        if (!sources.length) {
          const empty = document.createElement("div");
          empty.className = "card pad";
          empty.textContent = t("stats_no_sources");
          sourcesEl.appendChild(empty);
          return;
        }

        for (const item of sources) {
          const card = document.createElement("div");
          card.className = "card pad";

          const title = document.createElement("div");
          title.style.fontWeight = "650";
          title.textContent = `from: ${item.from}`;

          const meta = document.createElement("div");
          meta.className = "muted";
          meta.style.marginTop = "10px";
          meta.textContent = `${t("stats_views")}: ${formatCount(item.views)} · ${t("stats_new")}: ${formatCount(item.newUsers)}`;

          card.appendChild(title);
          card.appendChild(meta);
          sourcesEl.appendChild(card);
        }
      };

      const parseCounterValue = (value) => {
        if (typeof value === "number") return value;
        const s = String(value || "").trim();
        if (!s) return NaN;

        try {
          const json = JSON.parse(s);
          if (typeof json === "number") return json;
          if (json && typeof json === "object") {
            const candidates = [json.value, json.count, json.result, json.data];
            const found = candidates.find((v) => typeof v === "number");
            if (typeof found === "number") return found;
          }
        } catch {
          // ignore
        }

        const n = Number(s.replace(/[^\d.-]/g, ""));
        return Number.isFinite(n) ? n : NaN;
      };

      const normalizeRows = (json) => {
        if (Array.isArray(json)) return json;
        if (json && typeof json === "object") {
          const candidates = [json.counters, json.items, json.data, json.rows, json.values];
          const found = candidates.find((v) => Array.isArray(v));
          if (Array.isArray(found)) return found;
        }
        return [];
      };

      const getRowName = (row) => {
        if (!row) return "";
        if (typeof row === "string") return row;
        if (Array.isArray(row)) return String(row[0] || "");
        if (typeof row === "object") {
          return String(row.name || row.counter || row.id || row.key || "");
        }
        return "";
      };

      const getRowValue = (row) => {
        if (!row) return NaN;
        if (typeof row === "number") return row;
        if (Array.isArray(row)) return parseCounterValue(row[1]);
        if (typeof row === "object") {
          const v = row.value ?? row.count ?? row.v ?? row.n ?? row.amount ?? row.result;
          return parseCounterValue(v);
        }
        return NaN;
      };

      const load = async () => {
        const apiKey = getApiKey();
        if (!apiKey) {
          totalViews = null;
          totalUniques = null;
          sources = [];
          renderTotals();
          renderSources();
          setStatus("stats_need_key", "error");
          return;
        }

        setStatus("stats_loading");

        try {
          const [viewsText, uniquesText] = await Promise.all([
            fetch(
              buildUrl(`/ile/${encodeURIComponent(COUNTER_VIEWS)}`, {
                format: "json",
                key: apiKey
              }),
              { headers: { Accept: "application/json" } }
            ).then((r) => (r.ok ? r.text() : "")),
            fetch(
              buildUrl(`/ile/${encodeURIComponent(COUNTER_UNIQUES)}`, {
                format: "json",
                key: apiKey
              }),
              { headers: { Accept: "application/json" } }
            ).then((r) => (r.ok ? r.text() : ""))
          ]);

          totalViews = parseCounterValue(viewsText);
          totalUniques = parseCounterValue(uniquesText);
        } catch {
          totalViews = null;
          totalUniques = null;
        }

        renderTotals();

        try {
          const res = await fetch(
            buildUrl("/tabel", { format: "json", limit: 500, key: apiKey }),
            { headers: { Accept: "application/json" } }
          );
          if (!res.ok) {
            sources = [];
            renderSources();
            setStatus("stats_error", "error");
            return;
          }

          const text = await res.text();
          let json = null;
          try {
            json = JSON.parse(text);
          } catch {
            json = null;
          }

          const rows = normalizeRows(json);
          const fromPrefix = `${PREFIX}from-`;
          const suffixViews = "-views";
          const suffixUniques = "-uniques";

          const map = new Map();
          for (const row of rows) {
            const name = getRowName(row);
            if (!name.startsWith(fromPrefix)) continue;
            const value = getRowValue(row);

            if (name.endsWith(suffixViews)) {
              const from = name.slice(fromPrefix.length, name.length - suffixViews.length);
              if (!from) continue;
              const prev = map.get(from) || { from, views: 0, newUsers: 0 };
              prev.views = Number.isFinite(value) ? value : prev.views;
              map.set(from, prev);
              continue;
            }

            if (name.endsWith(suffixUniques)) {
              const from = name.slice(fromPrefix.length, name.length - suffixUniques.length);
              if (!from) continue;
              const prev = map.get(from) || { from, views: 0, newUsers: 0 };
              prev.newUsers = Number.isFinite(value) ? value : prev.newUsers;
              map.set(from, prev);
            }
          }

          sources = Array.from(map.values()).sort((a, b) => {
            const av = Number.isFinite(a.views) ? a.views : 0;
            const bv = Number.isFinite(b.views) ? b.views : 0;
            if (bv !== av) return bv - av;
            return String(a.from).localeCompare(String(b.from));
          });

          renderSources();
          setStatus("", "ok");
        } catch {
          sources = [];
          renderSources();
          setStatus("stats_error", "error");
        }
      };

      langListeners.add(() => {
        renderTotals();
        renderSources();
        setStatus(statusKey, statusTone);
      });

      load();
    })();
  })();
})();
