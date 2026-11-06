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

  // Matières communes du collège
  const COLLEGE_BASE = [
    ["Français", "📖"],
    ["Mathématiques", "➗"],
    ["Anglais", "🇬🇧"],
    ["Histoire-Géographie", "🌍"],
    ["SVT", "🌱"],
    ["Physique-Chimie", "🧪"],
    ["EDHC", "🤝"],
    ["Arts plastiques / Dessin", "🎨"],
    ["Éducation musicale", "🎵"],
    ["EPS", "🏃"],
    ["TICE", "💻"]
  ];

  // Langues vivantes 2 proposées selon les établissements
  const LANGUES_VIVANTES = [
    ["Allemand (LV2)", "🇩🇪"],
    ["Espagnol (LV2)", "🇪🇸"]
  ];

  // Enseignements du lycée
  const LYCEE_BASE = [
    ["Français", "📖"],
    ["Anglais", "🇬🇧"],
    ["Histoire-Géographie", "🌍"],
    ["Mathématiques", "➗"],
    ["Dessin / Éducation musicale", "🎨"],
    ["EPS", "🏃"]
  ];

  const SUBJECTS = {
    // COLLÈGE
    "6e": COLLEGE_BASE,
    "5e": COLLEGE_BASE,

    "4e": [
      ...COLLEGE_BASE,
      ...LANGUES_VIVANTES
    ],

    "3e": [
      ...COLLEGE_BASE,
      ...LANGUES_VIVANTES
    ],

    // SECONDE
    "2nde-A": [
      ...LYCEE_BASE,
      ...LANGUES_VIVANTES,
      ["Physique-Chimie", "🧪"],
      ["SVT", "🌱"]
    ],

    "2nde-C": [
      ...LYCEE_BASE,
      ...LANGUES_VIVANTES,
      ["Physique-Chimie", "🧪"],
      ["SVT", "🌱"]
    ],

    // PREMIÈRE A1
    "1ere-A1": [
      ...LYCEE_BASE,
      ...LANGUES_VIVANTES,
      ["Philosophie", "💭"],
      ["Physique-Chimie", "🧪"],
      ["SVT", "🌱"]
    ],

    // PREMIÈRE A2
    "1ere-A2": [
      ...LYCEE_BASE,
      ...LANGUES_VIVANTES,
      ["Philosophie", "💭"],
      ["Physique-Chimie", "🧪"],
      ["SVT", "🌱"]
    ],

    // PREMIÈRE C
    "1ere-C": [
      ...LYCEE_BASE,
      ...LANGUES_VIVANTES,
      ["Philosophie", "💭"],
      ["Physique-Chimie", "🧪"],
      ["SVT", "🌱"]
    ],

    // PREMIÈRE D
    "1ere-D": [
      ...LYCEE_BASE,
      ...LANGUES_VIVANTES,
      ["Philosophie", "💭"],
      ["Physique-Chimie", "🧪"],
      ["SVT", "🌱"]
    ],

    // TERMINALE A1
    "tle-A1": [
      ...LYCEE_BASE,
      ...LANGUES_VIVANTES,
      ["Philosophie", "💭"],
      ["SVT", "🌱"]
    ],

    // TERMINALE A2
    "tle-A2": [
      ...LYCEE_BASE,
      ...LANGUES_VIVANTES,
      ["Philosophie", "💭"],
      ["SVT", "🌱"]
    ],

    // TERMINALE C
    "tle-C": [
      ...LYCEE_BASE,
      ...LANGUES_VIVANTES,
      ["Philosophie", "💭"],
      ["Physique-Chimie", "🧪"]
    ],

    // TERMINALE D
    "tle-D": [
      ...LYCEE_BASE,
      ...LANGUES_VIVANTES,
      ["Philosophie", "💭"],
      ["Physique-Chimie", "🧪"],
      ["SVT", "🌱"]
    ]
  };

  const CATEGORIES = {
    cours: ["Cours", "Leçons et fiches de cours"],
    exercices: ["Exercices corrigés", "Entraînement et corrections"],
    devoirs: ["Devoirs et évaluations", "Contrôles et devoirs"],
    examens: ["Préparation aux examens", "Révisions et sujets types"]
  };

  const $ = id => document.getElementById(id);

  function readArray(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  function classLabel(id) {
    for (const group of Object.values(CLASS_GROUPS)) {
      const found = group.find(item => item.id === id);
      if (found) return found.label;
    }
    return id;
  }

  let currentClass = localStorage.getItem("atp_school_class_v2");

  if (!SUBJECTS[currentClass]) {
    currentClass = "6e";
  }

  let currentSubject = null;
  let currentCategory = "cours";
  let favorites = readArray("atp_school_favorites_v2");
  let completed = readArray("atp_school_completed_v2");
  let favoritesOnly = false;

  function save() {
    localStorage.setItem("atp_school_class_v2", currentClass);
    localStorage.setItem(
      "atp_school_favorites_v2",
      JSON.stringify(favorites)
    );
    localStorage.setItem(
      "atp_school_completed_v2",
      JSON.stringify(completed)
    );
  }

  function updateStats() {
    $("subjectCount").textContent = SUBJECTS[currentClass].length;
    $("favoriteCount").textContent = favorites.length;
    $("completedCount").textContent = completed.length;
  }

  function buildClassSelector() {
    const select = $("schoolClassSelector");
    select.innerHTML = "";

    Object.entries(CLASS_GROUPS).forEach(([groupName, classes]) => {
      const group = document.createElement("optgroup");
      group.label = groupName;

      classes.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.label;
        group.appendChild(option);
      });

      select.appendChild(group);
    });

    select.value = currentClass;
  }

  function renderSubjects() {
    const search = $("subjectSearch").value
      .trim()
      .toLocaleLowerCase("fr");

    const list = SUBJECTS[currentClass].filter(([name]) => {
      const matches = name.toLocaleLowerCase("fr").includes(search);
      const key = `${currentClass}::${name}`;

      return matches && (!favoritesOnly || favorites.includes(key));
    });

    $("subjectHeading").textContent =
      `Les matières de ${classLabel(currentClass)}`;

    const grid = $("subjectGrid");
    grid.innerHTML = "";

    if (!list.length) {
      grid.innerHTML =
        '<div class="empty">Aucune matière trouvée.</div>';
    }

    list.forEach(([name, emoji]) => {
      const key = `${currentClass}::${name}`;
      const isFavorite = favorites.includes(key);

      const card = document.createElement("article");
      card.className = "subject-card";

      const top = document.createElement("div");
      top.style.cssText =
        "display:flex;justify-content:space-between;align-items:center";

      const icon = document.createElement("span");
      icon.className = "subject-icon";
      icon.textContent = emoji;

      const favorite = document.createElement("button");
      favorite.type = "button";
      favorite.textContent = isFavorite ? "★" : "☆";
      favorite.setAttribute(
        "aria-label",
        "Ajouter ou retirer des favoris"
      );
      favorite.style.cssText =
        "background:transparent;border:0;color:#d69b16;font-size:25px";

      top.append(icon, favorite);

      const title = document.createElement("h3");
      title.textContent = name;

      const subtitle = document.createElement("p");
      subtitle.textContent = classLabel(currentClass);

      card.append(top, title, subtitle);

      favorite.addEventListener("click", event => {
        event.stopPropagation();

        favorites = favorites.includes(key)
          ? favorites.filter(item => item !== key)
          : [...favorites, key];

        save();
        renderSubjects();
      });

      card.addEventListener("click", () => openSubject(name));
      grid.appendChild(card);
    });

    updateStats();
  }

  function setClass(id) {
    if (!SUBJECTS[id]) return;

    currentClass = id;
    favoritesOnly = false;
    currentSubject = null;

    $("viewFilter").value = "all";
    $("subjectSearch").value = "";
    $("subjectWorkspace").classList.add("hidden");

    save();
    $("schoolClassSelector").value = id;
    renderSubjects();
  }

  function openSubject(name) {
    currentSubject = name;
    currentCategory = "cours";

    $("workspaceTitle").textContent =
      `${name} · ${classLabel(currentClass)}`;

    $("subjectWorkspace").classList.remove("hidden");

    renderResources();

    $("subjectWorkspace").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function renderResources() {
    const [title, description] = CATEGORIES[currentCategory];
    const key =
      `${currentClass}::${currentSubject}::${currentCategory}`;

    const isDone = completed.includes(key);

    $("workspaceDescription").textContent = description;

    const wrapper = document.createElement("div");
    wrapper.style.cssText = "display:grid;gap:15px;width:100%";

    const resource = document.createElement("div");
    resource.className = "resource-item";

    const heading = document.createElement("h3");
    heading.textContent = `${title} de ${currentSubject}`;

    const subtitle = document.createElement("p");
    subtitle.textContent =
      `${classLabel(currentClass)} · Contenu en préparation`;

    const notice = document.createElement("div");
    notice.className = "empty";
    notice.textContent =
      "Les ressources pédagogiques seront publiées après vérification des programmes officiels ivoiriens. Aucun document fictif n'est présenté comme disponible.";

    resource.append(heading, subtitle);

    const tracking = document.createElement("div");
    tracking.className = "resource-item";

    const trackingTitle = document.createElement("h3");
    trackingTitle.textContent = "Suivi personnel";

    const trackingText = document.createElement("p");
    trackingText.textContent =
      "Tu pourras marquer cette rubrique comme travaillée.";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "action-btn";
    button.textContent = isDone
      ? "✓ Activité terminée"
      : "Marquer comme terminée";

    button.addEventListener("click", () => {
      completed = completed.includes(key)
        ? completed.filter(item => item !== key)
        : [...completed, key];

      save();
      renderResources();
      updateStats();
    });

    tracking.append(trackingTitle, trackingText, button);
    wrapper.append(resource, notice, tracking);

    $("resourceList").replaceChildren(wrapper);
  }

  function showCategory(category) {
    if (!CATEGORIES[category] || !currentSubject) return;

    currentCategory = category;
    renderResources();
  }

  function showFavorites() {
    favoritesOnly = true;
    $("viewFilter").value = "favorites";
    $("subjectSearch").value = "";

    renderSubjects();

    $("subjectsSection").scrollIntoView({
      behavior: "smooth"
    });
  }

  $("schoolClassSelector").addEventListener("change", event => {
    setClass(event.target.value);
  });

  $("subjectSearch").addEventListener("input", renderSubjects);

  $("viewFilter").addEventListener("change", event => {
    favoritesOnly = event.target.value === "favorites";
    renderSubjects();
  });

  $("categoryGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    if (!currentSubject) {
      openSubject(SUBJECTS[currentClass][0][0]);
    }

    showCategory(button.dataset.category);
  });

  $("categoryGridWorkspace").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (button) showCategory(button.dataset.category);
  });

  $("backSubjects").addEventListener("click", () => {
    $("subjectWorkspace").classList.add("hidden");

    $("subjectsSection").scrollIntoView({
      behavior: "smooth"
    });
  });

  $("showFavorites").addEventListener("click", showFavorites);

  $("openCours").addEventListener("click", () => {
    openSubject(SUBJECTS[currentClass][0][0]);
  });

  $("openExos").addEventListener("click", () => {
    openSubject(SUBJECTS[currentClass][0][0]);
    showCategory("exercices");
  });

  $("showSubjects").addEventListener("click", () => {
    $("subjectsSection").scrollIntoView({
      behavior: "smooth"
    });
  });

  buildClassSelector();
  renderSubjects();
  save();

})();
