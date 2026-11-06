(() => {
  "use strict";

  const levels = {
    "6e": [
      ["Français","📖"],["Mathématiques","➗"],["Anglais","🇬🇧"],
      ["Histoire-Géographie","🌍"],["SVT","🌱"],["Physique-Chimie","🧪"],
      ["EDHC","🤝"],["Arts plastiques","🎨"],["Éducation musicale","🎵"],
      ["EPS","🏃"],["TICE","💻"]
    ],
    "5e": [
      ["Français","📖"],["Mathématiques","➗"],["Anglais","🇬🇧"],
      ["Histoire-Géographie","🌍"],["SVT","🌱"],["Physique-Chimie","🧪"],
      ["EDHC","🤝"],["Arts plastiques","🎨"],["Éducation musicale","🎵"],
      ["EPS","🏃"],["TICE","💻"]
    ],
    "4e": [
      ["Français","📖"],["Mathématiques","➗"],["Anglais","🇬🇧"],
      ["Histoire-Géographie","🌍"],["SVT","🌱"],["Physique-Chimie","🧪"],
      ["EDHC","🤝"],["Arts plastiques","🎨"],["Éducation musicale","🎵"],
      ["EPS","🏃"],["TICE","💻"]
    ],
    "3e": [
      ["Français","📖"],["Mathématiques","➗"],["Anglais","🇬🇧"],
      ["Histoire-Géographie","🌍"],["SVT","🌱"],["Physique-Chimie","🧪"],
      ["EDHC","🤝"],["Arts plastiques","🎨"],["Éducation musicale","🎵"],
      ["EPS","🏃"],["TICE","💻"]
    ],
    "2nde": [
      ["Français","📖"],["Mathématiques","➗"],["Anglais","🇬🇧"],
      ["Histoire-Géographie","🌍"],["SVT","🌱"],["Physique-Chimie","🧪"],
      ["Philosophie","💭"],["EDHC","🤝"],["TICE","💻"]
    ],
    "1ere": [
      ["Français","📖"],["Mathématiques","➗"],["Anglais","🇬🇧"],
      ["Histoire-Géographie","🌍"],["SVT","🌱"],["Physique-Chimie","🧪"],
      ["Philosophie","💭"],["EDHC","🤝"],["TICE","💻"]
    ],
    "tle": [
      ["Philosophie","💭"],["Mathématiques","➗"],["Français","📖"],
      ["Anglais","🇬🇧"],["Histoire-Géographie","🌍"],["SVT","🌱"],
      ["Physique-Chimie","🧪"],["EDHC","🤝"],["TICE","💻"]
    ]
  };

  const categories = {
    cours: ["Cours", "Leçons et fiches de cours"],
    exercices: ["Exercices corrigés", "Entraînement et corrections"],
    devoirs: ["Devoirs et évaluations", "Contrôles et devoirs"],
    examens: ["Préparation aux examens", "Révisions et sujets types"]
  };

  const $ = id => document.getElementById(id);

  function readStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  }

  let favorites = readStorage("atp_school_favorites_v1");
  let completed = readStorage("atp_school_completed_v1");
  let currentLevel = "6e";
  let currentSubject = null;
  let currentCategory = "cours";
  let favoritesOnly = false;

  const save = () => {
    localStorage.setItem(
      "atp_school_favorites_v1",
      JSON.stringify(favorites)
    );
    localStorage.setItem(
      "atp_school_completed_v1",
      JSON.stringify(completed)
    );
  };

  const keyFor = (level, subject) => `${level}::${subject}`;

  const levelLabel = level => ({
    "2nde": "Seconde",
    "1ere": "Première",
    "tle": "Terminale"
  }[level] || level);

  function updateStats() {
    $("favoriteCount").textContent = favorites.length;
    $("completedCount").textContent = completed.length;
    $("subjectCount").textContent = levels[currentLevel].length;
  }

  function toggleFavorite(level, subject) {
    const key = keyFor(level, subject);

    favorites = favorites.includes(key)
      ? favorites.filter(item => item !== key)
      : [...favorites, key];

    save();
    renderSubjects();
  }

  function renderSubjects() {
    const query = $("subjectSearch")
      .value.trim().toLocaleLowerCase("fr");

    const items = levels[currentLevel].filter(([name]) => {
      const matches = name.toLocaleLowerCase("fr").includes(query);
      return matches &&
        (!favoritesOnly || favorites.includes(keyFor(currentLevel, name)));
    });

    $("subjectHeading").textContent =
      `Les matières de ${levelLabel(currentLevel)}`;

    $("subjectGrid").innerHTML = "";

    if (!items.length) {
      $("subjectGrid").innerHTML =
        '<div class="empty" style="grid-column:1/-1">Aucune matière trouvée.</div>';
    }

    items.forEach(([name, emoji]) => {
      const favorite = favorites.includes(keyFor(currentLevel, name));

      const card = document.createElement("article");
      card.className = "subject-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");

      card.innerHTML = `
        <div class="subject-top">
          <span class="subject-icon">${emoji}</span>
          <button type="button"
            aria-label="Gérer les favoris"
            style="border:0;background:transparent;font-size:19px;cursor:pointer;color:${favorite ? "#e0a52a" : "#aab3c7"}">
            ${favorite ? "★" : "☆"}
          </button>
        </div>
        <h3>${name}</h3>
        <p>4 espaces de travail · ${levelLabel(currentLevel)}</p>
      `;

      card.querySelector("button").addEventListener("click", event => {
        event.stopPropagation();
        toggleFavorite(currentLevel, name);
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

    document.querySelectorAll("#classGrid .class-card")
      .forEach(button => {
        button.classList.toggle(
          "active",
          button.dataset.level === currentLevel
        );
      });

    $("schoolLevel").value = currentLevel;
    updateStats();
  }

  function setLevel(level) {
    if (!levels[level]) return;

    currentLevel = level;
    favoritesOnly = false;
    $("viewFilter").value = "all";
    $("subjectWorkspace").classList.remove("show");

    renderSubjects();
  }

  function openSubject(name) {
    currentSubject = name;
    currentCategory = "cours";

    $("workspaceTitle").textContent =
      `${name} · ${levelLabel(currentLevel)}`;

    $("subjectWorkspace").classList.add("show");

    document.querySelectorAll("#categoryGrid .category")
      .forEach(button => {
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
    const [title, description] = categories[currentCategory];

    $("workspaceDescription").textContent = description;

    const resourceKey =
      `${currentLevel}::${currentSubject}::${currentCategory}`;

    const done = completed.includes(resourceKey);

    $("resourceList").innerHTML = `
      <div class="resource">
        <div>
          <strong>${title} de ${currentSubject}</strong>
          <small>${levelLabel(currentLevel)} · Contenu en préparation</small>
        </div>
        <em>À publier</em>
      </div>

      <div class="empty">
        Les documents pédagogiques seront ajoutés après vérification
        du programme officiel ivoirien. Aucun document fictif
        n'est présenté comme disponible.
      </div>

      <div class="resource">
        <div>
          <strong>Suivi personnel</strong>
          <small>Marque cette rubrique comme travaillée lorsque
          tu auras étudié son contenu.</small>
        </div>
        <button type="button" id="markCompleted" class="back-btn">
          ${done ? "✓ Terminée" : "Marquer comme terminée"}
        </button>
      </div>
    `;

    $("markCompleted").addEventListener("click", () => {
      completed = completed.includes(resourceKey)
        ? completed.filter(item => item !== resourceKey)
        : [...completed, resourceKey];

      save();
      renderResources();
      updateStats();
    });
  }

  $("classGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-level]");
    if (button) setLevel(button.dataset.level);
  });

  $("schoolLevel").addEventListener("change", event => {
    setLevel(event.target.value);
  });

  $("showSubjects").addEventListener("click", () => {
    $("subjectsSection").scrollIntoView({ behavior: "smooth" });
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

    document.querySelectorAll("#categoryGrid .category")
      .forEach(item => {
        item.classList.toggle("active", item === button);
      });

    renderResources();
  });

  $("showFavorites").addEventListener("click", () => {
    favoritesOnly = true;
    $("viewFilter").value = "favorites";
    renderSubjects();

    $("subjectsSection").scrollIntoView({ behavior: "smooth" });
  });

  $("openCours").addEventListener("click", () => {
    openSubject(levels[currentLevel][0][0]);
  });

  $("openExos").addEventListener("click", () => {
    openSubject(levels[currentLevel][0][0]);

    currentCategory = "exercices";

    document.querySelectorAll("#categoryGrid .category")
      .forEach(item => {
        item.classList.toggle(
          "active",
          item.dataset.category === "exercices"
        );
      });

    renderResources();
  });

  $("resetProgress").addEventListener("click", () => {
    if (!confirm(
      "Effacer les favoris et la progression enregistrés sur cet appareil ?"
    )) return;

    favorites = [];
    completed = [];
    save();
    renderSubjects();

    if (currentSubject) renderResources();
  });

  renderSubjects();
})();
