(() => {
  "use strict";

  // ==========================================
  // 1. CLASSES ET MATIÈRES
  // ==========================================

  const GROUPS = {
    "Collège": ["6e", "5e", "4e", "3e"],
    "Seconde": ["Seconde A", "Seconde C"],
    "Première": ["Première A1", "Première A2", "Première C", "Première D"],
    "Terminale": ["Terminale A1", "Terminale A2", "Terminale C", "Terminale D"]
  };

  const COLLEGE = [
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

  const LYCEE = [
    ["Français", "📖"],
    ["Anglais", "🇬🇧"],
    ["Histoire-Géographie", "🌍"],
    ["Mathématiques", "➗"],
    ["Philosophie", "💭"],
    ["Physique-Chimie", "🧪"],
    ["SVT", "🌱"],
    ["Dessin / Éducation musicale", "🎨"],
    ["EPS", "🏃"],
    ["Allemand", "🇩🇪"],
    ["Espagnol", "🇪🇸"]
  ];

  const SUBJECTS = {
    "6e": COLLEGE,
    "5e": COLLEGE,
    "4e": [...COLLEGE, ["Allemand", "🇩🇪"], ["Espagnol", "🇪🇸"]],
    "3e": [...COLLEGE, ["Allemand", "🇩🇪"], ["Espagnol", "🇪🇸"]],
    "Seconde A": LYCEE.filter(x => x[0] !== "Philosophie"),
    "Seconde C": LYCEE.filter(x => x[0] !== "Philosophie"),
    "Première A1": LYCEE,
    "Première A2": LYCEE,
    "Première C": LYCEE,
    "Première D": LYCEE,
    "Terminale A1": LYCEE,
    "Terminale A2": LYCEE,
    "Terminale C": LYCEE,
    "Terminale D": LYCEE
  };

  const SUBJECT_ALIASES = {
    "Arts plastiques / Dessin": "Arts plastiques",
    "Dessin / Éducation musicale": "Éducation musicale"
  };

  const SUBJECT_ICONS = Object.fromEntries(
    COLLEGE.map(([name, icon]) => [name, icon])
  );

  // ==========================================
  // 2. RÉCUPÉRATION DU PROGRAMME DE 6e
  // ==========================================

  const curriculum = window.ATP_CURRICULUM_6E || {};

  function normalizeLessons(data) {
    const result = [];

    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        if (typeof item === "string") {
          result.push({
            title: item,
            section: "",
            number: index + 1
          });
        } else if (item && typeof item.title === "string") {
          result.push({
            title: item.title,
            section: item.section || "",
            number: index + 1
          });
        }
      });

      return result;
    }

    if (data && typeof data === "object") {
      Object.entries(data).forEach(([section, titles]) => {
        if (!Array.isArray(titles)) return;

        titles.forEach((item, index) => {
          if (typeof item === "string") {
            result.push({
              title: item,
              section,
              number: index + 1
            });
          } else if (item && typeof item.title === "string") {
            result.push({
              title: item.title,
              section: item.section || section,
              number: index + 1
            });
          }
        });
      });
    }

    return result;
  }

  const LESSONS = {};

  Object.entries(curriculum).forEach(([subject, data]) => {
    LESSONS[subject] = normalizeLessons(data);
  });

  function getSubjectLessons(subject) {
    const curriculumName = SUBJECT_ALIASES[subject] || subject;
    return LESSONS[curriculumName] || [];
  }

  // ==========================================
  // 3. CATÉGORIES DE RESSOURCES
  // ==========================================

  const CATEGORIES = {
    cours: "Cours",
    exercices: "Exercices corrigés",
    devoirs: "Devoirs et évaluations",
    examens: "Préparation aux examens"
  };

  const CATEGORY_MESSAGES = {
    cours: "Le titre de la leçon est enregistré. Le contenu pédagogique complet sera intégré à partir de la ressource officielle.",
    exercices: "Les exercices et leurs corrections seront ajoutés à partir des ressources pédagogiques vérifiées.",
    devoirs: "Les devoirs et évaluations de cette leçon seront ajoutés après récupération des documents correspondants.",
    examens: "Les fiches de révision et sujets d'examen seront ajoutés à partir de ressources vérifiées."
  };

  // ==========================================
  // 4. ÉTAT ET OUTILS
  // ==========================================

  const $ = id => document.getElementById(id);

  const safeRead = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : fallback;
    } catch {
      return fallback;
    }
  };

  let currentClass =
    localStorage.getItem("atp_school_class") || "6e";

  let currentSubject = "";
  let currentCategory = "cours";
  let favorites = safeRead("atp_school_favorites", []);
  let completed = safeRead("atp_school_completed", []);
  let favoritesOnly = false;

  if (!SUBJECTS[currentClass]) currentClass = "6e";

  function save() {
    localStorage.setItem("atp_school_class", currentClass);
    localStorage.setItem("atp_school_favorites", JSON.stringify(favorites));
    localStorage.setItem("atp_school_completed", JSON.stringify(completed));
  }

  function createElement(tag, content = "", className = "") {
    const element = document.createElement(tag);

    if (content !== "") element.textContent = content;
    if (className) element.className = className;

    return element;
  }

  function makeButton(label, className, callback) {
    const button = createElement("button", label, className);
    button.type = "button";
    button.addEventListener("click", callback);
    return button;
  }

  function updateStats() {
    $("subjectCount").textContent = SUBJECTS[currentClass].length;
    $("favoriteCount").textContent = favorites.length;
    $("completedCount").textContent = completed.length;
  }

  // ==========================================
  // 5. SÉLECTEUR DE CLASSE
  // ==========================================

  function buildClassSelector() {
    const select = $("schoolClassSelector");
    select.replaceChildren();

    Object.entries(GROUPS).forEach(([groupName, classes]) => {
      const group = document.createElement("optgroup");
      group.label = groupName;

      classes.forEach(className => {
        const option = document.createElement("option");
        option.value = className;
        option.textContent = className;
        group.appendChild(option);
      });

      select.appendChild(group);
    });

    select.value = currentClass;
  }

  // ==========================================
  // 6. AFFICHAGE DES MATIÈRES
  // ==========================================

  function renderSubjects() {
    const grid = $("subjectGrid");
    const search = $("subjectSearch").value.toLowerCase().trim();

    grid.replaceChildren();

    $("subjectHeading").textContent =
      "Les matières de " + currentClass;

    const subjects = SUBJECTS[currentClass].filter(([name]) => {
      const matchesSearch = name.toLowerCase().includes(search);
      const key = currentClass + "::" + name;
      const isFavorite = favorites.includes(key);

      return matchesSearch && (!favoritesOnly || isFavorite);
    });

    if (subjects.length === 0) {
      grid.appendChild(
        createElement("p", "Aucune matière trouvée.", "empty")
      );
    }

    subjects.forEach(([name, emoji]) => {
      const key = currentClass + "::" + name;
      const card = createElement("article", "", "subject-card");
      card.tabIndex = 0;

      const top = createElement("div");
      top.style.cssText =
        "display:flex;justify-content:space-between;align-items:center";

      const icon = createElement("span", emoji, "subject-icon");

      const favoriteButton = makeButton(
        favorites.includes(key) ? "★" : "☆",
        "",
        event => {
          event.stopPropagation();

          if (favorites.includes(key)) {
            favorites = favorites.filter(item => item !== key);
          } else {
            favorites.push(key);
          }

          save();
          renderSubjects();
        }
      );

      top.append(icon, favoriteButton);

      const title = createElement("h3", name);

      const count = currentClass === "6e"
        ? getSubjectLessons(name).length
        : 0;

      const info = createElement(
        "p",
        count > 0
          ? count + " intitulés de leçons enregistrés"
          : "Espace pédagogique"
      );

      card.append(top, title, info);

      card.addEventListener("click", () => openSubject(name));

      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openSubject(name);
        }
      });

      grid.appendChild(card);
    });

    updateStats();
  }

  // ==========================================
  // 7. OUVERTURE D'UNE MATIÈRE
  // ==========================================

  function openSubject(name) {
    currentSubject = name;
    currentCategory = "cours";

    $("workspaceTitle").textContent =
      name + " · " + currentClass;

    $("subjectWorkspace").classList.remove("hidden");

    renderResources();

    $("subjectWorkspace").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  // ==========================================
  // 8. AFFICHAGE D'UNE LEÇON
  // ==========================================

  function renderLesson(parent, lesson, index) {
    const key = [
      currentClass,
      currentSubject,
      lesson.section,
      lesson.title
    ].join("::");

    const details = document.createElement("details");
    details.className = "resource-item lesson-card";

    const summary = createElement(
      "summary",
      (index + 1) + ". " + lesson.title
    );

    summary.style.cssText =
      "cursor:pointer;font-weight:bold;color:#203452;line-height:1.5";

    const body = createElement("div", "", "lesson-body");
    body.style.cssText = "padding-top:14px";

    const notice = createElement(
      "p",
      CATEGORY_MESSAGES[currentCategory]
    );

    body.appendChild(notice);

    if (currentCategory === "cours") {
      body.appendChild(
        createElement(
          "p",
          "Statut : intitulé de la leçon enregistré. Le cours complet reste à intégrer."
        )
      );
    }

    if (currentCategory === "exercices") {
      body.appendChild(
        createElement(
          "p",
          "Aucun exercice officiel n'est encore associé à cette leçon."
        )
      );
    }

    if (currentCategory === "devoirs") {
      body.appendChild(
        createElement(
          "p",
          "Aucun devoir officiel n'est encore associé à cette leçon."
        )
      );
    }

    if (currentCategory === "examens") {
      body.appendChild(
        createElement(
          "p",
          "Aucun sujet officiel n'est encore associé à cette leçon."
        )
      );
    }

    const isCompleted = completed.includes(key);

    const doneButton = makeButton(
      isCompleted ? "✓ Leçon travaillée" : "Marquer comme travaillée",
      "action-btn",
      () => {
        if (completed.includes(key)) {
          completed = completed.filter(item => item !== key);
        } else {
          completed.push(key);
        }

        save();
        renderResources();
      }
    );

    body.appendChild(doneButton);

    details.append(summary, body);
    parent.appendChild(details);
  }

  // ==========================================
  // 9. AFFICHAGE DES RESSOURCES
  // ==========================================

  function renderResources() {
    const list = $("resourceList");
    list.replaceChildren();

    $("workspaceDescription").textContent =
      CATEGORIES[currentCategory] + " de " + currentSubject;

    if (currentClass !== "6e") {
      list.appendChild(
        createElement(
          "div",
          "Les matières de cette classe sont disponibles. Les intitulés détaillés et les contenus seront intégrés après réception et vérification des ressources pédagogiques.",
          "empty"
        )
      );
      return;
    }

    const lessons = getSubjectLessons(currentSubject);

    if (lessons.length === 0) {
      list.appendChild(
        createElement(
          "div",
          "Aucun intitulé n'est encore enregistré pour cette matière. Les ressources seront ajoutées dès leur réception.",
          "empty"
        )
      );
      return;
    }

    const heading = createElement(
      "h3",
      CATEGORIES[currentCategory] + " · " + currentSubject
    );

    const description = createElement(
      "p",
      lessons.length + " intitulés de leçons enregistrés."
    );

    list.append(heading, description);

    let previousSection = null;

    lessons.forEach((lesson, index) => {
      if (lesson.section && lesson.section !== previousSection) {
        previousSection = lesson.section;

        const sectionHeading = createElement(
          "h3",
          lesson.section
        );

        sectionHeading.style.cssText =
          "grid-column:1/-1;margin:20px 0 0;color:#2864d8";

        list.appendChild(sectionHeading);
      }

      renderLesson(list, lesson, index);
    });
  }

  // ==========================================
  // 10. NAVIGATION DES CATÉGORIES
  // ==========================================

  function showCategory(category) {
    if (!CATEGORIES[category]) return;

    if (!currentSubject) {
      openSubject(SUBJECTS[currentClass][0][0]);
    }

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

  // ==========================================
  // 11. ÉVÉNEMENTS DE L'INTERFACE
  // ==========================================

  $("schoolClassSelector").addEventListener("change", event => {
    currentClass = event.target.value;
    currentSubject = "";
    favoritesOnly = false;

    $("subjectSearch").value = "";
    $("viewFilter").value = "all";
    $("subjectWorkspace").classList.add("hidden");

    save();
    renderSubjects();
  });

  $("subjectSearch").addEventListener("input", renderSubjects);

  $("viewFilter").addEventListener("change", event => {
    favoritesOnly = event.target.value === "favorites";
    renderSubjects();
  });

  $("categoryGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (button) showCategory(button.dataset.category);
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
    if (!currentSubject) {
      openSubject(SUBJECTS[currentClass][0][0]);
    } else {
      showCategory("cours");
    }
  });

  $("openExos").addEventListener("click", () => {
    if (!currentSubject) {
      openSubject(SUBJECTS[currentClass][0][0]);
    }

    showCategory("exercices");
  });

  $("showSubjects").addEventListener("click", () => {
    $("subjectsSection").scrollIntoView({
      behavior: "smooth"
    });
  });

  // ==========================================
  // 12. INITIALISATION
  // ==========================================

  buildClassSelector();
  renderSubjects();
  save();

})();
