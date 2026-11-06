(() => {
  "use strict";

  const CLASS_GROUPS = {
    "Collège": [
      { id: "6e", label: "6e" },
      { id: "5e", label: "5e" },
      { id: "4e", label: "4e" },
      { id: "3e", label: "3e" }
    ],
    "Seconde": [
      { id: "2nde-A", label: "Seconde A" },
      { id: "2nde-C", label: "Seconde C" }
    ],
    "Première": [
      { id: "1ere-A1", label: "Première A1" },
      { id: "1ere-A2", label: "Première A2" },
      { id: "1ere-C", label: "Première C" },
      { id: "1ere-D", label: "Première D" }
    ],
    "Terminale": [
      { id: "tle-A1", label: "Terminale A1" },
      { id: "tle-A2", label: "Terminale A2" },
      { id: "tle-C", label: "Terminale C" },
      { id: "tle-D", label: "Terminale D" }
    ]
  };

  const COMMON_COLLEGE = [
    ["Français", "📖"],
    ["Mathématiques", "➗"],
    ["Anglais", "🇬🇧"],
    ["Histoire-Géographie", "🌍"],
    ["SVT", "🌱"],
    ["Physique-Chimie", "🧪"],
    ["EDHC", "🤝"],
    ["Arts plastiques", "🎨"],
    ["Éducation musicale", "🎵"],
    ["EPS", "🏃"],
    ["TICE", "💻"]
  ];

  const SUBJECTS = {
    "6e": COMMON_COLLEGE,
    "5e": COMMON_COLLEGE,
    "4e": COMMON_COLLEGE,
    "3e": COMMON_COLLEGE,

    "2nde-A": [
      ["Français", "📖"],
      ["Mathématiques", "➗"],
      ["Anglais", "🇬🇧"],
      ["Allemand / Espagnol", "🌐"],
      ["Histoire-Géographie", "🌍"],
      ["SVT", "🌱"],
      ["Physique-Chimie", "🧪"],
      ["EDHC", "🤝"],
      ["EPS", "🏃"]
    ],

    "2nde-C": [
      ["Français", "📖"],
      ["Mathématiques", "➗"],
      ["Anglais", "🇬🇧"],
      ["Allemand / Espagnol", "🌐"],
      ["Histoire-Géographie", "🌍"],
      ["SVT", "🌱"],
      ["Physique-Chimie", "🧪"],
      ["EDHC", "🤝"],
      ["EPS", "🏃"]
    ],

    "1ere-A1": [
      ["Français", "📖"],
      ["Philosophie", "💭"],
      ["Mathématiques", "➗"],
      ["Anglais", "🇬🇧"],
      ["Histoire-Géographie", "🌍"],
      ["Langue vivante 2", "🌐"],
      ["EDHC", "🤝"],
      ["EPS", "🏃"]
    ],

    "1ere-A2": [
      ["Français", "📖"],
      ["Philosophie", "💭"],
      ["Mathématiques", "➗"],
      ["Anglais", "🇬🇧"],
      ["Histoire-Géographie", "🌍"],
      ["Langue vivante 2", "🌐"],
      ["EDHC", "🤝"],
      ["EPS", "🏃"]
    ],

    "1ere-C": [
      ["Français", "📖"],
      ["Philosophie", "💭"],
      ["Mathématiques", "➗"],
      ["Physique-Chimie", "🧪"],
      ["SVT", "🌱"],
      ["Anglais", "🇬🇧"],
      ["Histoire-Géographie", "🌍"],
      ["EDHC", "🤝"],
      ["EPS", "🏃"]
    ],

    "1ere-D": [
      ["Français", "📖"],
      ["Philosophie", "💭"],
      ["Mathématiques", "➗"],
      ["Physique-Chimie", "🧪"],
      ["SVT", "🌱"],
      ["Anglais", "🇬🇧"],
      ["Histoire-Géographie", "🌍"],
      ["EDHC", "🤝"],
      ["EPS", "🏃"]
    ],

    "tle-A1": [
      ["Philosophie", "💭"],
      ["Français", "📖"],
      ["Mathématiques", "➗"],
      ["Anglais", "🇬🇧"],
      ["Histoire-Géographie", "🌍"],
      ["Langue vivante 2", "🌐"],
      ["EDHC", "🤝"],
      ["EPS", "🏃"]
    ],

    "tle-A2": [
      ["Philosophie", "💭"],
      ["Français", "📖"],
      ["Mathématiques", "➗"],
      ["Anglais", "🇬🇧"],
      ["Histoire-Géographie", "🌍"],
      ["Langue vivante 2", "🌐"],
      ["EDHC", "🤝"],
      ["EPS", "🏃"]
    ],

    "tle-C": [
      ["Philosophie", "💭"],
      ["Français", "📖"],
      ["Mathématiques", "➗"],
      ["Physique-Chimie", "🧪"],
      ["SVT", "🌱"],
      ["Anglais", "🇬🇧"],
      ["Histoire-Géographie", "🌍"],
      ["EDHC", "🤝"],
      ["EPS", "🏃"]
    ],

    "tle-D": [
      ["Philosophie", "💭"],
      ["Français", "📖"],
      ["Mathématiques", "➗"],
      ["Physique-Chimie", "🧪"],
      ["SVT", "🌱"],
      ["Anglais", "🇬🇧"],
      ["Histoire-Géographie", "🌍"],
      ["EDHC", "🤝"],
      ["EPS", "🏃"]
    ]
  };

  const CATEGORIES = {
    cours: ["Cours", "Leçons et fiches de cours"],
    exercices: ["Exercices corrigés", "Entraînement et corrections"],
    devoirs: ["Devoirs et évaluations", "Contrôles et devoirs"],
    examens: ["Préparation aux examens", "Révisions et sujets types"]
  };

  const $ = id => document.getElementById(id);

  function readStorage(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  function readClass() {
    const saved = localStorage.getItem("atp_school_class_v2");
    return SUBJECTS[saved] ? saved : "6e";
  }

  let currentClass = readClass();
  let currentSubject = null;
  let currentCategory = "cours";
  let favorites = readStorage("atp_school_favorites_v2");
  let completed = readStorage("atp_school_completed_v2");
  let favoritesOnly = false;

  const className = id => {
    for (const group of Object.values(CLASS_GROUPS)) {
      const found = group.find(item => item.id === id);
      if (found) return found.label;
    }
    return id;
  };

  const itemKey = (subject, category) =>
    `${currentClass}::${subject}::${category}`;

  function save() {
    localStorage.setItem("atp_school_class_v2", currentClass);
    localStorage.setItem("atp_school_favorites_v2", JSON.stringify(favorites));
    localStorage.setItem("atp_school_completed_v2", JSON.stringify(completed));
  }

  function updateStats() {
    $("subjectCount").textContent = SUBJECTS[currentClass].length;
    $("favoriteCount").textContent = favorites.length;
    $("completedCount").textContent = completed.length;
  }

  function buildClassSelector() {
    const select = $("schoolClassSelector");
    if (!select) return;

    select.innerHTML = "";

    Object.entries(CLASS_GROUPS).forEach(([group, classes]) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = group;

      classes.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.label;
        optgroup.appendChild(option);
      });

      select.appendChild(optgroup);
    });

    select.value = currentClass;
  }

  function renderClassHeading() {
    $("subjectHeading").textContent =
      `Les matières de ${className(currentClass)}`;
  }

  function renderSubjects() {
    const query = $("subjectSearch").value.trim().toLocaleLowerCase("fr");

    const subjects = SUBJECTS[currentClass].filter(([name]) => {
      const matches = name.toLocaleLowerCase("fr").includes(query);
      const favorite = favorites.includes(`${currentClass}::${name}`);

      return matches && (!favoritesOnly || favorite);
    });

    $("subjectGrid").innerHTML = "";

    if (!subjects.length) {
      $("subjectGrid").innerHTML =
        '<div class="empty" style="grid-column:1/-1">Aucune matière trouvée.</div>';
    }

    subjects.forEach(([name, emoji]) => {
      const favoriteKey = `${currentClass}::${name}`;
      const favorite = favorites.includes(favoriteKey);

      const card = document.createElement("article");
      card.className = "subject-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");

      const top = document.createElement("div");
      top.className = "subject-top";

      const icon = document.createElement("span");
      icon.className = "subject-icon";
      icon.textContent = emoji;

      const favoriteButton = document.createElement("button");
      favoriteButton.type = "button";
      favoriteButton.textContent = favorite ? "★" : "☆";
      favoriteButton.setAttribute("aria-label", "Ajouter ou retirer des favoris");
      favoriteButton.style.cssText =
        `border:0;background:transparent;font-size:21px;cursor:pointer;color:${favorite ? "#e0a52a" : "#aab3c7"}`;

      top.append(icon, favoriteButton);

      const title = document.createElement("h3");
      title.textContent = name;

      const description = document.createElement("p");
      description.textContent = className(currentClass);

      card.append(top, title, description);

      favoriteButton.addEventListener("click", event => {
        event.stopPropagation();

        favorites = favorites.includes(favoriteKey)
          ? favorites.filter(item => item !== favoriteKey)
          : [...favorites, favoriteKey];

        save();
        renderSubjects();
      });

      card.addEventListener("click", () => openSubject(name));

      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openSubject(name);
        }
      });

      $("subjectGrid").appendChild(card);
    });

    renderClassHeading();
    updateStats();
  }

  function setClass(id) {
    if (!SUBJECTS[id]) return;

    currentClass = id;
    favoritesOnly = false;
    $("viewFilter").value = "all";
    $("subjectWorkspace").classList.remove("show");

    save();
    buildClassSelector();
    renderSubjects();
  }

  function openSubject(name) {
    currentSubject = name;
    currentCategory = "cours";

    $("workspaceTitle").textContent =
      `${name} · ${className(currentClass)}`;

    $("subjectWorkspace").classList.add("show");

    document.querySelectorAll("#categoryGrid .category").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.category === currentCategory
      );
    });

    renderResources();

    $("subjectWorkspace").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function renderResources() {
    const [title, description] = CATEGORIES[currentCategory];
    const resourceKey = itemKey(currentSubject, currentCategory);
    const done = completed.includes(resourceKey);

    $("workspaceDescription").textContent = description;

    const wrapper = document.createElement("div");

    const resource = document.createElement("div");
    resource.className = "resource";

    const info = document.createElement("div");

    const heading = document.createElement("strong");
    heading.textContent = `${title} de ${currentSubject}`;

    const subtitle = document.createElement("small");
    subtitle.textContent =
      `${className(currentClass)} · Contenu en préparation`;

    info.append(heading, subtitle);

    const status = document.createElement("em");
    status.textContent = "À publier";

    resource.append(info, status);

    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent =
      "Les ressources pédagogiques de cette classe seront publiées après vérification des programmes officiels ivoiriens. Aucun document fictif n'est présenté comme disponible.";

    const tracking = document.createElement("div");
    tracking.className = "resource";

    const trackingInfo = document.createElement("div");
    const trackingTitle = document.createElement("strong");
    trackingTitle.textContent = "Suivi personnel";

    const trackingDescription = document.createElement("small");
    trackingDescription.textContent =
      "Marque cette rubrique comme travaillée après avoir étudié son contenu.";

    trackingInfo.append(trackingTitle, trackingDescription);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "back-btn";
    button.textContent = done ? "✓ Terminée" : "Marquer comme terminée";

    button.addEventListener("click", () => {
      completed = completed.includes(resourceKey)
        ? completed.filter(item => item !== resourceKey)
        : [...completed, resourceKey];

      save();
      renderResources();
      updateStats();
    });

    tracking.append(trackingInfo, button);
    wrapper.append(resource, empty, tracking);

    $("resourceList").replaceChildren(wrapper);
  }

  function showFavorites() {
    favoritesOnly = true;
    $("viewFilter").value = "favorites";
    $("subjectSearch").value = "";
    renderSubjects();

    $("subjectsSection").scrollIntoView({ behavior: "smooth" });
  }

  $("schoolClassSelector").addEventListener("change", event => {
    setClass(event.target.value);
  });

  $("subjectSearch").addEventListener("input", renderSubjects);

  $("viewFilter").addEventListener("change", event => {
    favoritesOnly = event.target.value === "favorites";
    renderSubjects();
  });

  $("backSubjects").addEventListener("click", () => {
    $("subjectWorkspace").classList.remove("show");
  });

  $("categoryGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    currentCategory = button.dataset.category;

    document.querySelectorAll("#categoryGrid .category").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderResources();
  });

  $("showFavorites").addEventListener("click", showFavorites);

  $("openCours").addEventListener("click", () => {
    openSubject(SUBJECTS[currentClass][0][0]);
  });

  $("openExos").addEventListener("click", () => {
    openSubject(SUBJECTS[currentClass][0][0]);
    currentCategory = "exercices";

    document.querySelectorAll("#categoryGrid .category").forEach(item => {
      item.classList.toggle(
        "active",
        item.dataset.category === "exercices"
      );
    });

    renderResources();
  });

  $("showSubjects").addEventListener("click", () => {
    $("subjectsSection").scrollIntoView({ behavior: "smooth" });
  });

  $("resetProgress").addEventListener("click", () => {
    if (!confirm("Effacer les favoris et la progression enregistrés sur cet appareil ?")) return;

    favorites = [];
    completed = [];
    save();
    renderSubjects();

    if (currentSubject) renderResources();
  });

  buildClassSelector();
  renderSubjects();
})();
