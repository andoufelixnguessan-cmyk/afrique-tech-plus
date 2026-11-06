(() => {
  "use strict";

  // ==========================================
  // 1. CLASSES DISPONIBLES
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

  // ==========================================
  // 2. CATALOGUE INITIAL DES COURS DE 6e
  // ==========================================

  const LESSONS = {
    "Français": [
      ["La communication", "Identifier l'émetteur, le récepteur, le message et le contexte."],
      ["Le texte narratif", "Reconnaître les personnages, le cadre et les événements d'un récit."],
      ["Le texte descriptif", "Décrire une personne, un objet ou un lieu avec précision."],
      ["Le texte injonctif", "Comprendre les consignes, les conseils et les interdictions."],
      ["Les types de phrases", "Distinguer les phrases déclaratives, interrogatives, exclamatives et impératives."],
      ["Les formes de phrases", "Reconnaître les formes affirmative et négative."],
      ["Le nom et le déterminant", "Identifier le nom et les déterminants dans une phrase."],
      ["L'adjectif qualificatif", "Identifier et accorder l'adjectif avec le nom."],
      ["Le verbe et son sujet", "Identifier le verbe conjugué et retrouver son sujet."],
      ["Le présent de l'indicatif", "Conjuguer les verbes usuels au présent."],
      ["Le passé composé", "Former le passé composé avec avoir ou être."],
      ["Les synonymes et antonymes", "Enrichir le vocabulaire avec des mots proches ou contraires."],
      ["La compréhension de texte", "Lire un texte, retrouver les informations et comprendre son sens."]
    ],

    "Mathématiques": [
      ["Les nombres entiers naturels", "Lire, écrire, comparer et décomposer les nombres entiers."],
      ["L'addition et la soustraction", "Effectuer des additions et des soustractions."],
      ["La multiplication", "Poser et effectuer une multiplication."],
      ["La division", "Effectuer une division et interpréter le résultat."],
      ["Les multiples et diviseurs", "Reconnaître les multiples et les diviseurs."],
      ["Les fractions", "Comprendre le numérateur et le dénominateur."],
      ["Les nombres décimaux", "Lire, comparer et décomposer les nombres décimaux."],
      ["Les mesures de longueur", "Utiliser les unités et convertir les longueurs."],
      ["Les mesures de masse et capacité", "Mesurer et convertir les masses et les capacités."],
      ["Les droites et segments", "Tracer et mesurer des droites et des segments."],
      ["Les angles", "Identifier et mesurer les angles."],
      ["Les triangles", "Reconnaître les différents triangles."],
      ["Les quadrilatères", "Identifier les propriétés des quadrilatères."],
      ["Périmètres et aires", "Calculer le périmètre et l'aire de figures simples."],
      ["Organisation des données", "Lire et interpréter des tableaux et diagrammes."]
    ],

    "Anglais": [
      ["Greetings", "Saluer et prendre congé en anglais."],
      ["Introducing yourself", "Se présenter et présenter une autre personne."],
      ["The alphabet", "Connaître les lettres et épeler des mots."],
      ["Numbers and age", "Compter et parler de son âge."],
      ["Days and months", "Nommer les jours et les mois."],
      ["Classroom objects", "Nommer les objets de la classe."],
      ["Personal information", "Demander et donner des informations personnelles."],
      ["Family members", "Présenter les membres de sa famille."],
      ["Daily routines", "Décrire ses activités quotidiennes."],
      ["Present simple", "Construire des phrases au présent simple."],
      ["Can and can't", "Exprimer une capacité ou une impossibilité."]
    ],

    "Histoire-Géographie": [
      ["Définition de l'histoire", "Comprendre ce qu'étudie l'histoire."],
      ["Les sources de l'histoire", "Identifier les sources historiques."],
      ["Le temps historique", "Se repérer dans les années et les siècles."],
      ["La chronologie", "Classer les événements dans le temps."],
      ["Définition de la géographie", "Comprendre l'objet de la géographie."],
      ["La Terre", "Découvrir le globe terrestre et le planisphère."],
      ["Les continents et océans", "Localiser les continents et les océans."],
      ["Les points cardinaux", "Utiliser les points cardinaux pour se repérer."],
      ["La lecture d'une carte", "Comprendre le titre, la légende et l'échelle."],
      ["Les paysages", "Décrire les paysages naturels et humains."]
    ],

    "SVT": [
      ["La diversité des êtres vivants", "Découvrir la diversité du monde vivant."],
      ["Les caractéristiques des êtres vivants", "Identifier les manifestations de la vie."],
      ["La classification des êtres vivants", "Classer les organismes selon leurs caractères."],
      ["Les besoins des végétaux", "Découvrir les conditions de croissance des plantes."],
      ["Les besoins des animaux", "Comprendre les besoins alimentaires des animaux."],
      ["Le corps humain", "Découvrir les principales caractéristiques du corps humain."],
      ["L'hygiène et la santé", "Adopter des habitudes favorables à la santé."],
      ["L'environnement", "Comprendre la protection de l'environnement."]
    ],

    "Physique-Chimie": [
      ["Découverte de la physique-chimie", "Identifier les phénomènes physiques et chimiques."],
      ["Les états de la matière", "Distinguer les états solide, liquide et gazeux."],
      ["Les changements d'état", "Découvrir la fusion, la solidification et la vaporisation."],
      ["Les corps purs et mélanges", "Distinguer un corps pur d'un mélange."],
      ["La séparation des mélanges", "Découvrir la filtration et la décantation."],
      ["La masse", "Mesurer la masse avec une balance."],
      ["Le volume", "Mesurer le volume avec un récipient gradué."],
      ["La sécurité au laboratoire", "Respecter les règles de sécurité."]
    ],

    "EDHC": [
      ["La dignité humaine", "Comprendre le respect de la personne."],
      ["Les droits de l'enfant", "Connaître les principaux droits de l'enfant."],
      ["Les devoirs de l'enfant", "Comprendre ses responsabilités."],
      ["La famille", "Comprendre le respect et l'entraide en famille."],
      ["La vie en communauté", "Respecter les règles de la vie collective."],
      ["La citoyenneté", "Adopter un comportement citoyen."],
      ["Les symboles nationaux", "Découvrir les symboles de la Côte d'Ivoire."],
      ["La paix et la tolérance", "Prévenir les conflits et respecter les différences."],
      ["La protection de l'environnement", "Adopter des comportements responsables."]
    ],

    "Arts plastiques / Dessin": [
      ["Les éléments du langage plastique", "Découvrir le point, la ligne, la forme et la couleur."],
      ["Le dessin d'observation", "Dessiner un objet en observant ses formes."],
      ["Les couleurs primaires", "Identifier les couleurs primaires."],
      ["Les couleurs secondaires", "Découvrir les mélanges de couleurs."],
      ["Les techniques de dessin", "Utiliser correctement les outils de dessin."],
      ["La composition", "Organiser les éléments sur une feuille."]
    ],

    "Éducation musicale": [
      ["Les caractéristiques du son", "Découvrir la hauteur, la durée et l'intensité."],
      ["La voix", "Utiliser correctement sa voix."],
      ["Le chant", "Apprendre à chanter en groupe."],
      ["Le rythme", "Reconnaître et reproduire des rythmes simples."],
      ["Les instruments", "Découvrir les familles d'instruments."],
      ["La musique ivoirienne", "Découvrir différentes pratiques musicales ivoiriennes."]
    ],

    "EPS": [
      ["L'échauffement", "Préparer son corps avant une activité sportive."],
      ["La course", "Améliorer son endurance et sa vitesse."],
      ["Les sauts", "Travailler la coordination et les réceptions."],
      ["Les lancers", "Apprendre les techniques de lancer."],
      ["Les jeux collectifs", "Coopérer et respecter les règles."],
      ["L'hygiène sportive", "Comprendre l'importance de l'hydratation et du repos."]
    ],

    "TICE": [
      ["Découverte de l'ordinateur", "Identifier les composants d'un ordinateur."],
      ["Les périphériques", "Découvrir le clavier, la souris et l'écran."],
      ["Le clavier", "Apprendre à saisir du texte."],
      ["La souris", "Apprendre à cliquer, sélectionner et déplacer."],
      ["Les fichiers et dossiers", "Créer et organiser des fichiers."],
      ["Le traitement de texte", "Créer et mettre en forme un document."],
      ["Internet", "Effectuer une recherche sur Internet."],
      ["La sécurité numérique", "Protéger ses informations personnelles."]
    ]
  };

  // ==========================================
  // 3. CATÉGORIES
  // ==========================================

  const CATEGORIES = {
    cours: "Cours",
    exercices: "Exercices corrigés",
    devoirs: "Devoirs et évaluations",
    examens: "Révisions et examens"
  };

  const $ = id => document.getElementById(id);

  let currentClass = localStorage.getItem("atp_school_class") || "6e";
  let currentSubject = "";
  let currentCategory = "cours";
  let favorites = JSON.parse(localStorage.getItem("atp_school_favorites") || "[]");
  let completed = JSON.parse(localStorage.getItem("atp_school_completed") || "[]");
  let favoritesOnly = false;

  if (!SUBJECTS[currentClass]) currentClass = "6e";

  function save() {
    localStorage.setItem("atp_school_class", currentClass);
    localStorage.setItem("atp_school_favorites", JSON.stringify(favorites));
    localStorage.setItem("atp_school_completed", JSON.stringify(completed));
  }

  function updateStats() {
    $("subjectCount").textContent = SUBJECTS[currentClass].length;
    $("favoriteCount").textContent = favorites.length;
    $("completedCount").textContent = completed.length;
  }

  // ==========================================
  // 4. SÉLECTEUR DE CLASSE
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
  // 5. AFFICHAGE DES MATIÈRES
  // ==========================================

  function renderSubjects() {
    const grid = $("subjectGrid");
    const search = $("subjectSearch").value.toLowerCase().trim();

    grid.replaceChildren();

    $("subjectHeading").textContent = "Les matières de " + currentClass;

    const subjects = SUBJECTS[currentClass].filter(([name]) => {
      const match = name.toLowerCase().includes(search);
      const favorite = favorites.includes(currentClass + "::" + name);
      return match && (!favoritesOnly || favorite);
    });

    if (!subjects.length) {
      const empty = document.createElement("p");
      empty.textContent = "Aucune matière trouvée.";
      grid.appendChild(empty);
    }

    subjects.forEach(([name, emoji]) => {
      const key = currentClass + "::" + name;
      const card = document.createElement("article");
      card.className = "subject-card";
      card.tabIndex = 0;

      const top = document.createElement("div");
      top.style.cssText = "display:flex;justify-content:space-between;align-items:center";

      const icon = document.createElement("span");
      icon.className = "subject-icon";
      icon.textContent = emoji;

      const favorite = document.createElement("button");
      favorite.type = "button";
      favorite.textContent = favorites.includes(key) ? "★" : "☆";

      favorite.addEventListener("click", event => {
        event.stopPropagation();

        if (favorites.includes(key)) {
          favorites = favorites.filter(x => x !== key);
        } else {
          favorites.push(key);
        }

        save();
        renderSubjects();
      });

      top.append(icon, favorite);

      const title = document.createElement("h3");
      title.textContent = name;

      const info = document.createElement("p");
      info.textContent = currentClass === "6e" && LESSONS[name]
        ? LESSONS[name].length + " leçons au catalogue"
        : "Espace pédagogique";

      card.append(top, title, info);

      card.addEventListener("click", () => openSubject(name));

      card.addEventListener("keydown", event => {
        if (event.key === "Enter") openSubject(name);
      });

      grid.appendChild(card);
    });

    updateStats();
  }

  // ==========================================
  // 6. OUVERTURE D'UNE MATIÈRE
  // ==========================================

  function openSubject(name) {
    currentSubject = name;
    currentCategory = "cours";

    $("workspaceTitle").textContent = name + " · " + currentClass;
    $("subjectWorkspace").classList.remove("hidden");

    renderResources();

    $("subjectWorkspace").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function createElement(tag, text, className) {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  // ==========================================
  // 7. AFFICHAGE DES LEÇONS ET EXERCICES
  // ==========================================

  function renderLesson(parent, lesson, index) {
    const [title, summary] = lesson;

    const key = currentClass + "::" + currentSubject + "::" + index;

    const details = document.createElement("details");
    details.className = "resource-item lesson-card";

    const summaryElement = createElement(
      "summary",
      (index + 1) + ". " + title,
      "lesson-summary"
    );

    const body = createElement("div", "", "lesson-body");

    body.appendChild(createElement("p", summary));

    if (currentCategory === "cours") {
      body.appendChild(createElement(
        "p",
        "À retenir : comprends la notion, note les mots importants et cherche un exemple dans ton environnement."
      ));

      body.appendChild(createElement(
        "p",
        "Méthode de travail : lis le résumé, reformule avec tes propres mots et vérifie que tu as compris."
      ));
    }

    if (currentCategory === "exercices") {
      body.appendChild(createElement("h4", "Exercice"));

      body.appendChild(createElement(
        "p",
        "1. Explique la notion étudiée. 2. Donne deux exemples. 3. Utilise cette notion dans une phrase ou une situation concrète."
      ));

      body.appendChild(createElement("h4", "Correction indicative"));

      body.appendChild(createElement(
        "p",
        "La réponse doit présenter l'idée essentielle du cours, deux exemples pertinents et une explication correcte."
      ));
    }

    if (currentCategory === "devoirs") {
      body.appendChild(createElement("h4", "Mini-évaluation"));

      body.appendChild(createElement(
        "p",
        "1. Définis la notion. 2. Cite deux éléments importants. 3. Applique la leçon à un exemple concret."
      ));

      body.appendChild(createElement(
        "p",
        "Barème indicatif : définition 4 points, connaissances 6 points, application 10 points."
      ));
    }

    if (currentCategory === "examens") {
      body.appendChild(createElement("h4", "Fiche de révision"));

      body.appendChild(createElement(
        "p",
        summary + " Révise la définition, les mots-clés et les exemples."
      ));

      body.appendChild(createElement(
        "p",
        "Conseil : ferme ton cours et essaie de restituer les notions de mémoire."
      ));
    }

    const button = createElement(
      "button",
      completed.includes(key) ? "✓ Leçon travaillée" : "Marquer comme travaillé",
      "action-btn"
    );

    button.type = "button";

    button.addEventListener("click", () => {
      if (completed.includes(key)) {
        completed = completed.filter(x => x !== key);
      } else {
        completed.push(key);
      }

      save();
      renderResources();
    });

    body.appendChild(button);
    details.append(summaryElement, body);
    parent.appendChild(details);
  }

  // ==========================================
  // 8. AFFICHAGE DES RESSOURCES
  // ==========================================

  function renderResources() {
    const list = $("resourceList");
    list.replaceChildren();

    $("workspaceDescription").textContent =
      "Ressources pédagogiques de " + currentSubject;

    const lessons = currentClass === "6e" ? LESSONS[currentSubject] : null;

    if (!lessons) {
      const message = createElement(
        "div",
        "Les matières et les espaces de cette classe sont disponibles. Les cours détaillés seront ajoutés après vérification des programmes officiels.",
        "empty"
      );

      list.appendChild(message);
      return;
    }

    const heading = createElement(
      "h3",
      CATEGORIES[currentCategory] + " · " + currentSubject
    );

    const description = createElement(
      "p",
      lessons.length + " leçons dans le catalogue initial de 6e."
    );

    list.append(heading, description);

    lessons.forEach((lesson, index) => {
      renderLesson(list, lesson, index);
    });
  }

  // ==========================================
  // 9. NAVIGATION ENTRE LES CATÉGORIES
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
  // 10. ÉVÉNEMENTS
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
    if (!button) return;

    showCategory(button.dataset.category);
  });

  $("categoryGridWorkspace").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    showCategory(button.dataset.category);
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
  // 11. INITIALISATION
  // ==========================================

  buildClassSelector();
  renderSubjects();
  save();

})();
