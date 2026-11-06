/* ==========================================================
   AFRIQUE TECH PLUS — ATP SCHOOL
   Gestion pédagogique, navigation et lecture plein écran
   ========================================================== */

(() => {
  "use strict";

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

  const CATEGORIES = {
    cours: "Cours et leçons",
    exercices: "Exercices corrigés",
    devoirs: "Devoirs et évaluations",
    examens: "Révisions et préparation"
  };

  const $ = id => document.getElementById(id);

  const safeRead = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : fallback;
    } catch {
      return fallback;
    }
  };

  let currentClass = localStorage.getItem("atp_school_class") || "6e";
  let currentSubject = "";
  let currentCategory = "cours";
  let favorites = safeRead("atp_school_favorites", []);
  let completed = safeRead("atp_school_completed", []);
  let quizResults = safeRead("atp_school_quiz_results", []);
  let favoritesOnly = false;
  let activeFullscreenLesson = null;

  if (!SUBJECTS[currentClass]) currentClass = "6e";

  const CONTENT = window.ATP_LEARNING_CONTENT_6E;
  const RAW_CURRICULUM = window.ATP_CURRICULUM_6E || {};

  const styles = document.createElement("style");

  styles.textContent = `
    .atp-learning-section {
      margin:18px 0;
      padding:17px;
      background:#fff;
      border:1px solid #dce5f4;
      border-radius:15px;
    }

    .atp-learning-section h4 {
      color:#245bc1;
      margin:0 0 12px;
    }

    .atp-learning-section p {
      line-height:1.8;
      color:#40516d;
    }

    .atp-learning-tag {
      display:inline-block;
      background:#eaf1ff;
      color:#245bc1;
      padding:6px 10px;
      border-radius:20px;
      font-size:12px;
      font-weight:bold;
    }

    .atp-session {
      margin:12px 0;
      border:1px solid #dce5f4;
      border-radius:13px;
      background:#fff;
      overflow:hidden;
    }

    .atp-session summary {
      padding:16px;
      cursor:pointer;
      font-weight:bold;
      color:#203452;
      background:#f6f9ff;
      line-height:1.6;
    }

    .atp-session-body {
      padding:18px;
    }

    .atp-list {
      padding-left:22px;
      color:#40516d;
      line-height:1.9;
    }

    .atp-question {
      padding:15px;
      margin:12px 0;
      background:#f6f9ff;
      border:1px solid #dce5f4;
      border-radius:11px;
    }

    .atp-answer {
      display:none;
      margin-top:10px;
      padding:13px;
      background:#eaf7ef;
      border-radius:9px;
      color:#205c39;
      line-height:1.7;
      white-space:pre-wrap;
    }

    .atp-answer.visible {
      display:block;
    }

    .atp-small-btn {
      border:0;
      border-radius:9px;
      padding:11px 14px;
      background:#2864d8;
      color:white;
      font-weight:bold;
      cursor:pointer;
      margin:6px 5px 6px 0;
    }

    .atp-small-btn.secondary {
      background:#eaf1ff;
      color:#245bc1;
    }

    .atp-progress {
      height:10px;
      background:#e8edf6;
      border-radius:20px;
      overflow:hidden;
      margin:12px 0;
    }

    .atp-progress span {
      display:block;
      height:100%;
      background:#2864d8;
      border-radius:20px;
      transition:width .3s;
    }

    .atp-score {
      padding:13px;
      background:#eaf1ff;
      color:#245bc1;
      border-radius:10px;
      font-weight:bold;
      margin-top:12px;
    }

    .atp-muted {
      font-size:13px;
      color:#71809a;
    }

    .atp-lesson-actions {
      display:flex;
      gap:8px;
      flex-wrap:wrap;
      margin-top:18px;
    }

    .atp-check {
      display:flex;
      align-items:flex-start;
      gap:10px;
      margin:12px 0;
      line-height:1.6;
    }

    #subjectWorkspace {
      scroll-margin-top:90px;
    }

    .atp-session.atp-fullscreen-lesson {
      position:fixed !important;
      inset:0 !important;
      z-index:999999 !important;
      width:100vw !important;
      height:100vh !important;
      height:100dvh !important;
      max-width:none !important;
      max-height:none !important;
      margin:0 !important;
      border:0 !important;
      border-radius:0 !important;
      background:#f3f7ff !important;
      overflow-y:auto !important;
      overflow-x:hidden !important;
      overscroll-behavior:contain;
    }

    .atp-fullscreen-lesson > summary {
      position:sticky;
      top:0;
      z-index:5;
      padding:20px;
      background:#fff;
      border-bottom:1px solid #dce5f4;
      font-size:19px;
      box-shadow:0 3px 12px rgba(0,0,0,.05);
    }

    .atp-fullscreen-lesson .atp-session-body {
      width:100%;
      max-width:1050px;
      margin:0 auto;
      padding:24px;
      padding-bottom:60px;
      font-size:17px;
      line-height:1.9;
      overflow-wrap:anywhere;
    }

    .atp-fullscreen-lesson .atp-learning-section {
      padding:24px;
      margin:22px 0;
    }

    .atp-fullscreen-lesson .atp-learning-section p,
    .atp-fullscreen-lesson .atp-session-body p {
      font-size:17px;
      line-height:1.9;
    }

    .atp-fullscreen-lesson .atp-session summary {
      font-size:16px;
      padding:18px;
    }

    .atp-fullscreen-lesson .atp-close-reading {
      position:sticky;
      top:0;
      z-index:10;
      display:flex;
      justify-content:flex-start;
      padding:10px 0 16px;
      background:#f3f7ff;
    }

    .atp-close-reading button {
      border:0;
      border-radius:12px;
      padding:13px 18px;
      background:#173f86;
      color:#fff;
      font-size:14px;
      font-weight:bold;
      cursor:pointer;
      box-shadow:0 4px 12px rgba(23,63,134,.18);
    }

    body.atp-reading-active {
      overflow:hidden !important;
    }

    @media(max-width:600px) {
      .atp-learning-section {
        padding:13px;
      }

      .atp-session-body {
        padding:13px;
      }

      .atp-fullscreen-lesson .atp-session-body {
        padding:15px;
        padding-bottom:45px;
        font-size:16px;
      }

      .atp-fullscreen-lesson .atp-learning-section {
        padding:16px;
        margin:15px 0;
      }

      .atp-fullscreen-lesson .atp-learning-section p,
      .atp-fullscreen-lesson .atp-session-body p {
        font-size:16px;
      }

      .atp-fullscreen-lesson > summary {
        font-size:17px;
        padding:17px;
      }
    }
  `;

  document.head.appendChild(styles);

  function save() {
    localStorage.setItem("atp_school_class", currentClass);
    localStorage.setItem("atp_school_favorites", JSON.stringify(favorites));
    localStorage.setItem("atp_school_completed", JSON.stringify(completed));
    localStorage.setItem("atp_school_quiz_results", JSON.stringify(quizResults));
  }

  function el(tag, content = "", className = "") {
    const node = document.createElement(tag);

    if (content !== "") node.textContent = content;
    if (className) node.className = className;

    return node;
  }

  function button(label, className, callback) {
    const node = el("button", label, className);
    node.type = "button";
    node.addEventListener("click", callback);
    return node;
  }

function addSection(parent, title, content) {
  const section = document.createElement("section");
  section.className = "atp-learning-section";

  section.appendChild(el("h4", title));

  if (Array.isArray(content)) {
    section.appendChild(makeList(content));
  } else if (typeof content === "string" || typeof content === "number") {
    section.appendChild(el("p", String(content)));
  } else if (content instanceof Node) {
    section.appendChild(content);
  }

  parent.appendChild(section);
  return section;
}

  // Accepte aussi bien une chaîne qu'un tableau.
  function toArray(value) {
    if (Array.isArray(value)) return value.filter(item => item != null && item !== "");
    if (typeof value === "string" && value.trim()) {
      return value
        .split(/\n|•|;/)
        .map(item => item.trim())
        .filter(Boolean);
    }
    return [];
  }

  function makeList(items) {
    const list = document.createElement("ul");
    list.className = "atp-list";

    toArray(items).forEach(item => {
      list.appendChild(el("li", String(item)));
    });

    if (!list.children.length) {
      list.appendChild(el("li", "Notions à compléter."));
    }

    return list;
  }

  function normalizeLessons(data) {
    const result = [];

    if (Array.isArray(data)) {
      data.forEach(item => {
        if (typeof item === "string") {
          result.push({
            title: item,
            section: "",
            sessions: []
          });
        } else if (item && typeof item.title === "string") {
          result.push({
            title: item.title,
            section: item.section || "",
            sessions: Array.isArray(item.sessions) ? item.sessions : []
          });
        }
      });

      return result;
    }

    if (data && typeof data === "object") {
      Object.entries(data).forEach(([section, items]) => {
        if (!Array.isArray(items)) return;

        items.forEach(item => {
          if (typeof item === "string") {
            result.push({
              title: item,
              section,
              sessions: []
            });
          } else if (item && typeof item.title === "string") {
            result.push({
              title: item.title,
              section: item.section || section,
              sessions: Array.isArray(item.sessions) ? item.sessions : []
            });
          }
        });
      });
    }

    return result;
  }

  function curriculumName(subject) {
    return SUBJECT_ALIASES[subject] || subject;
  }

  function getLessons(subject) {
    return normalizeLessons(RAW_CURRICULUM[curriculumName(subject)]);
  }

  function getLearningSubject(subject) {
    if (!CONTENT || typeof CONTENT.buildAll !== "function") {
      return null;
    }

    try {
      const all = CONTENT.buildAll(RAW_CURRICULUM);
      return all && all[curriculumName(subject)]
        ? all[curriculumName(subject)]
        : null;
    } catch (error) {
      console.error("Erreur du moteur pédagogique :", error);
      return null;
    }
  }

  function getLessonContent(subject, index) {
    const data = getLearningSubject(subject);
    return data && Array.isArray(data.lessons)
      ? data.lessons[index] || null
      : null;
  }

  function lessonKey(subject, lesson, index) {
    return [
      currentClass,
      subject,
      lesson.section || "",
      lesson.title,
      index
    ].join("::");
  }

  function isDone(key) {
    return completed.includes(key);
  }

  function updateStats() {
    $("subjectCount").textContent = SUBJECTS[currentClass].length;
    $("favoriteCount").textContent = favorites.length;
    $("completedCount").textContent = completed.length;
  }

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

  function scrollToWorkspace() {
    const workspace = $("subjectWorkspace");

    requestAnimationFrame(() => {
      workspace.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  function renderSubjects() {
    const grid = $("subjectGrid");
    const search = $("subjectSearch").value.toLowerCase().trim();

    grid.replaceChildren();

    $("subjectHeading").textContent = "Les matières de " + currentClass;

    const subjects = SUBJECTS[currentClass].filter(([name]) => {
      const matches = name.toLowerCase().includes(search);
      const key = currentClass + "::" + name;

      return matches && (!favoritesOnly || favorites.includes(key));
    });

    if (!subjects.length) {
      grid.appendChild(el("p", "Aucune matière trouvée.", "empty"));
    }

    subjects.forEach(([name, emoji]) => {
      const card = el("article", "", "subject-card");
      card.tabIndex = 0;

      const top = el("div");
      top.style.cssText =
        "display:flex;justify-content:space-between;align-items:center";

      const icon = el("span", emoji, "subject-icon");
      const key = currentClass + "::" + name;

      const favoriteButton = button(
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

      const title = el("h3", name);
      const count = currentClass === "6e" ? getLessons(name).length : 0;

      const info = el(
        "p",
        count ? count + " leçons enregistrées" : "Espace pédagogique"
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

  function openSubject(name) {
    closeFullscreenLesson();

    currentSubject = name;
    currentCategory = "cours";

    $("workspaceTitle").textContent = name + " · " + currentClass;
    $("subjectWorkspace").classList.remove("hidden");

    renderResources();
    scrollToWorkspace();
  }

  function renderObjectives(parent, objectives) {
    const items = toArray(objectives);

    if (items.length) {
      addSection(parent, "🎯 Objectifs pédagogiques", makeList(items));
    }
  }

  function renderCourse(parent, session) {
    const course = session && session.course ? session.course : {};

    if (course.introduction) {
      addSection(parent, "Introduction", course.introduction);
    }

    if (course.explanation) {
      addSection(parent, "Explication du cours", course.explanation);
    }

    if (course.example) {
      addSection(parent, "Exemple pratique", course.example);
    }

    if (course.vocabulary) {
      addSection(parent, "Vocabulaire essentiel", makeList(course.vocabulary));
    }

    if (course.method) {
      addSection(parent, "Méthode de travail", course.method);
    }

    if (course.essential) {
      addSection(parent, "À retenir", course.essential);
    }

    if (course.conclusion) {
      addSection(parent, "Conclusion", course.conclusion);
    }
  }

  function renderExercises(parent, session) {
    const exercises = toArray(session && session.exercises);

    parent.appendChild(
      el(
        "p",
        "Effectue les exercices avant d'afficher les corrections.",
        "atp-muted"
      )
    );

    if (!exercises.length) {
      parent.appendChild(el("p", "Aucun exercice enregistré pour cette séance."));
      return;
    }

    exercises.forEach((exercise, exerciseIndex) => {
      if (typeof exercise === "string") {
        exercise = {
          instruction: exercise,
          correction: "Consulte ton cours pour vérifier ta réponse.",
          level: "Application"
        };
      }

      const card = el("div", "", "atp-question");

      card.appendChild(
        el("span", exercise.level || "Exercice", "atp-learning-tag")
      );

      card.appendChild(
        el(
          "p",
          "Exercice " + (exerciseIndex + 1) + " : " +
          (exercise.instruction || exercise.question || "Consigne à compléter.")
        )
      );

      const answer = el(
        "div",
        exercise.correction || exercise.answer || "Correction à compléter.",
        "atp-answer"
      );

      const reveal = button(
        "Afficher la correction",
        "atp-small-btn secondary",
        () => {
          answer.classList.toggle("visible");

          reveal.textContent = answer.classList.contains("visible")
            ? "Masquer la correction"
            : "Afficher la correction";
        }
      );

      card.append(reveal, answer);
      parent.appendChild(card);
    });
  }

  function renderQuiz(parent, session, lessonIndex, sessionIndex) {
    const quiz = toArray(session && session.quiz);

    if (!quiz.length) return;

    const quizId = [
      currentClass,
      currentSubject,
      lessonIndex,
      sessionIndex
    ].join("::");

    const box = el("div", "", "atp-learning-section");

    box.appendChild(el("h4", "🧠 Mini-quiz de la séance"));

    box.appendChild(
      el(
        "p",
        "Lis chaque question, réfléchis à ta réponse puis affiche la correction pour vérifier tes connaissances."
      )
    );

    let score = 0;
    let checked = 0;

    const scoreDisplay = el(
      "div",
      "Auto-évaluation : 0 / " + quiz.length,
      "atp-score"
    );

    quiz.forEach((question, questionIndex) => {
      if (typeof question === "string") {
        question = {
          question,
          answer: "Réponse à vérifier dans le cours.",
          explanation: ""
        };
      }

      const card = el("div", "", "atp-question");

      card.appendChild(
        el("strong", (questionIndex + 1) + ". " + (question.question || "Question"))
      );

      const answer = el(
        "div",
        "Réponse attendue : " +
        (question.answer || "À compléter.") + " " +
        (question.explanation || ""),
        "atp-answer"
      );

      const actions = el("div", "", "atp-lesson-actions");

      const correctButton = button(
        "J'avais la bonne réponse",
        "atp-small-btn",
        () => {
          if (correctButton.dataset.used === "true") return;

          correctButton.dataset.used = "true";
          wrongButton.disabled = true;
          correctButton.disabled = true;

          score++;
          checked++;

          scoreDisplay.textContent =
            "Auto-évaluation : " + score + " / " + quiz.length;

          updateQuizResult(quizId, score, checked);
        }
      );

      const wrongButton = button(
        "Je dois réviser",
        "atp-small-btn secondary",
        () => {
          if (wrongButton.dataset.used === "true") return;

          wrongButton.dataset.used = "true";
          correctButton.disabled = true;
          wrongButton.disabled = true;

          checked++;

          scoreDisplay.textContent =
            "Auto-évaluation : " + score + " / " + quiz.length;

          updateQuizResult(quizId, score, checked);
        }
      );

      const reveal = button(
        "Voir la réponse",
        "atp-small-btn secondary",
        () => {
          answer.classList.toggle("visible");

          reveal.textContent = answer.classList.contains("visible")
            ? "Masquer la réponse"
            : "Voir la réponse";
        }
      );

      actions.append(correctButton, wrongButton, reveal);
      card.append(actions, answer);
      box.appendChild(card);
    });

    box.appendChild(scoreDisplay);
    parent.appendChild(box);
  }

  function updateQuizResult(quizId, score, total) {
    const previous = quizResults.filter(item => item.id !== quizId);

    previous.push({
      id: quizId,
      score,
      total,
      date: new Date().toISOString()
    });

    quizResults = previous;
    save();
  }

  function renderAssessment(parent, assessment) {
    if (!assessment || typeof assessment !== "object") {
      parent.appendChild(
        el("p", "Aucune évaluation générale n'est disponible pour cette leçon.")
      );
      return;
    }

    const duration = assessment.duration || "Durée non précisée";
    const total = assessment.total != null
      ? assessment.total
      : "Non précisé";

    addSection(
      parent,
      "📝 Évaluation — " + duration,
      "Barème : " + total +
      " points. Réponds d'abord dans ton cahier avant de consulter les éléments de correction."
    );

    toArray(assessment.instructions).forEach((instruction, index) => {
      parent.appendChild(
        el("p", (index + 1) + ". " + instruction, "atp-muted")
      );
    });

    const questions = toArray(assessment.questions);

    if (!questions.length) {
      parent.appendChild(el("p", "Les questions de cette évaluation ne sont pas encore disponibles."));
      return;
    }

    questions.forEach((question, index) => {
      if (typeof question === "string") {
        question = {
          question,
          points: "?",
          expected: "Correction à compléter."
        };
      }

      const card = el("div", "", "atp-question");

      card.appendChild(
        el(
          "strong",
          "Question " + (index + 1) +
          " — " + (question.points != null ? question.points : "?") + " points"
        )
      );

      card.appendChild(el("p", question.question || "Question à compléter."));

      const correction = el(
        "div",
        "Éléments de correction : " +
        (question.expected || question.correction || "Correction à compléter."),
        "atp-answer"
      );

      const reveal = button(
        "Consulter les éléments de correction",
        "atp-small-btn secondary",
        () => {
          correction.classList.toggle("visible");
          reveal.textContent = correction.classList.contains("visible")
            ? "Masquer la correction"
            : "Consulter les éléments de correction";
        }
      );

      card.append(reveal, correction);
      parent.appendChild(card);
    });
  }

  function renderRevision(parent, items) {
    const revisionItems = toArray(items);

    if (!revisionItems.length) return;

    const wrapper = el("div", "", "atp-learning-section");

    wrapper.appendChild(el("h4", "📌 Ma fiche de révision"));

    revisionItems.forEach(item => {
      const label = el("label", "", "atp-check");
      const checkbox = document.createElement("input");

      checkbox.type = "checkbox";

      label.append(checkbox, el("span", String(item)));
      wrapper.appendChild(label);
    });

    parent.appendChild(wrapper);
  }

  /* OUVRIR UNE LEÇON EN PLEIN ÉCRAN */

  function openFullscreenLesson(details) {
    if (activeFullscreenLesson === details) return;

    if (activeFullscreenLesson) {
      closeFullscreenLesson();
    }

    activeFullscreenLesson = details;

    details.open = true;
    details.classList.add("atp-fullscreen-lesson");

    document.body.classList.add("atp-reading-active");

    const closeArea = el("div", "", "atp-close-reading");

    const closeButton = button(
      "← Retour aux leçons",
      "",
      closeFullscreenLesson
    );

    closeArea.appendChild(closeButton);

    const body = details.querySelector(".atp-session-body");

    if (body) {
      body.insertBefore(closeArea, body.firstChild);
    }

    details.scrollTop = 0;
    closeButton.focus({ preventScroll: true });
  }

  function closeFullscreenLesson() {
    if (!activeFullscreenLesson) return;

    const details = activeFullscreenLesson;

    details.classList.remove("atp-fullscreen-lesson");
    details.open = false;

    const closeArea = details.querySelector(".atp-close-reading");

    if (closeArea) closeArea.remove();

    document.body.classList.remove("atp-reading-active");

    activeFullscreenLesson = null;
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && activeFullscreenLesson) {
      closeFullscreenLesson();
    }
  });

function renderLesson(parent, lesson, lessonIndex) {
    const content = getLessonContent(currentSubject, lessonIndex);

    const key = lessonKey(currentSubject, lesson, lessonIndex);

    const details = document.createElement("details");
    details.className = "atp-session atp-main-lesson";

    const summary = el(
      "summary",
      (isDone(key) ? "✓ " : "") +
      "Leçon " + (lessonIndex + 1) + " : " + lesson.title
    );

    details.appendChild(summary);

    const body = el("div", "", "atp-session-body");

    summary.addEventListener("click", event => {
      event.preventDefault();
      openFullscreenLesson(details);
    });

    if (!content) {
      body.appendChild(
        el(
          "p",
          "Le contenu pédagogique de cette matière est en cours de préparation."
        )
      );

      details.appendChild(body);
      parent.appendChild(details);
      return;
    }

    const sessions = Array.isArray(content.sessions) ? content.sessions : [];

    body.appendChild(
      el("span", sessions.length + " séance(s)", "atp-learning-tag")
    );

    if (content.introduction) {
      body.appendChild(el("p", content.introduction));
    }

    if (currentCategory === "cours") {
      renderObjectives(body, content.objectives);

      sessions.forEach((session, index) => {
        const sessionDetails = document.createElement("details");
        sessionDetails.className = "atp-session";

        // Ouvrir automatiquement la première séance.
        sessionDetails.open = index === 0;

        sessionDetails.appendChild(
          el("summary", "Séance " + (index + 1) + " : " + (session.title || "Séance"))
        );

        const sessionBody = el("div", "", "atp-session-body");

        renderObjectives(sessionBody, session.objectives);
        renderCourse(sessionBody, session);

        sessionDetails.appendChild(sessionBody);
        body.appendChild(sessionDetails);
      });

      renderRevision(body, content.revision);
    }

    if (currentCategory === "exercices") {
      sessions.forEach((session, index) => {
        const sessionDetails = document.createElement("details");
        sessionDetails.className = "atp-session";
        sessionDetails.open = index === 0;

        sessionDetails.appendChild(
          el("summary", "Exercices — " + (session.title || "Séance " + (index + 1)))
        );

        const sessionBody = el("div", "", "atp-session-body");

        renderExercises(sessionBody, session);
        renderQuiz(sessionBody, session, lessonIndex, index);

        sessionDetails.appendChild(sessionBody);
        body.appendChild(sessionDetails);
      });

      if (!sessions.length) {
        body.appendChild(el("p", "Aucun exercice n'est disponible pour cette leçon."));
      }
    }

    if (currentCategory === "devoirs") {
      if (content.finalAssessment) {
        renderAssessment(body, content.finalAssessment);
      }

      sessions.forEach((session, index) => {
        const sessionDetails = document.createElement("details");
        sessionDetails.className = "atp-session";

        sessionDetails.appendChild(
          el("summary", "Évaluation de la séance " + (index + 1))
        );

        const sessionBody = el("div", "", "atp-session-body");

        renderAssessment(sessionBody, session.assessment);

        sessionDetails.appendChild(sessionBody);
        body.appendChild(sessionDetails);
      });

      if (!content.finalAssessment && !sessions.length) {
        body.appendChild(el("p", "Aucune évaluation n'est disponible pour cette leçon."));
      }
    }

    if (currentCategory === "examens") {
      renderRevision(body, content.revision);

      if (content.finalAssessment) {
        renderAssessment(body, content.finalAssessment);
      }

      sessions.forEach((session, index) => {
        if (!session.assessment) return;

        const sessionDetails = document.createElement("details");
        sessionDetails.className = "atp-session";

        sessionDetails.appendChild(
          el("summary", "Évaluation de révision — Séance " + (index + 1))
        );

        const sessionBody = el("div", "", "atp-session-body");
        renderAssessment(sessionBody, session.assessment);

        sessionDetails.appendChild(sessionBody);
        body.appendChild(sessionDetails);
      });

      addSection(
        body,
        "Conseils pour réussir",
        "Révise les définitions, apprends les notions essentielles, refais les exercices sans regarder les corrections et vérifie que tu sais expliquer chaque réponse."
      );
    }

    const actions = el("div", "", "atp-lesson-actions");

    const doneButton = button(
      isDone(key)
        ? "✓ Leçon terminée"
        : "Marquer la leçon comme terminée",
      "atp-small-btn",
      () => {
        if (isDone(key)) {
          completed = completed.filter(item => item !== key);
        } else {
          completed.push(key);
        }

        save();
        renderResources();
      }
    );

    actions.appendChild(doneButton);
    body.appendChild(actions);

    details.appendChild(body);
    parent.appendChild(details);
}
  function renderResources() {
    closeFullscreenLesson();

    const list = $("resourceList");
    list.replaceChildren();

    $("workspaceDescription").textContent =
      CATEGORIES[currentCategory] + " de " + currentSubject;

    if (currentClass !== "6e") {
      list.appendChild(
        el(
          "div",
          "Les ressources détaillées de cette classe seront intégrées après la finalisation du programme de 6e.",
          "empty"
        )
      );
      return;
    }

    const lessons = getLessons(currentSubject);

    if (!lessons.length) {
      list.appendChild(
        el(
          "div",
          "Aucun intitulé n'est enregistré pour cette matière.",
          "empty"
        )
      );
      return;
    }

    const subjectContent = getLearningSubject(currentSubject);
    const total = lessons.length;

    const finished = lessons.filter((lesson, index) =>
      isDone(lessonKey(currentSubject, lesson, index))
    ).length;

    const percentage = total
      ? Math.round((finished / total) * 100)
      : 0;

    const header = el("div", "", "atp-learning-section");

    header.appendChild(
      el("h3", currentSubject + " — Programme de 6e")
    );

    if (subjectContent && subjectContent.goal) {
      header.appendChild(
        el("p", "Objectif général : " + subjectContent.goal)
      );
    }

    list.appendChild(header);

    let previousSection = null;

    lessons.forEach((lesson, index) => {
      if (lesson.section && lesson.section !== previousSection) {
        previousSection = lesson.section;
        list.appendChild(el("h3", lesson.section));
      }

      renderLesson(list, lesson, index);
    });

    const progressFooter = el("div", "", "atp-learning-section");

    progressFooter.appendChild(
      el("h3", "📊 Progression de la matière")
    );

    progressFooter.appendChild(
      el(
        "p",
        finished + " leçon(s) terminée(s) sur " +
        total + " — " + percentage + "%"
      )
    );

    const progress = el("div", "", "atp-progress");
    const bar = el("span");

    bar.style.width = percentage + "%";

    progress.appendChild(bar);
    progressFooter.appendChild(progress);

    if (percentage === 100) {
      progressFooter.appendChild(
        el(
          "p",
          "🎉 Félicitations ! Toutes les leçons de cette matière sont terminées."
        )
      );
    }

    list.appendChild(progressFooter);
  }

  function showCategory(category) {
    if (!CATEGORIES[category]) return;

    if (!currentSubject) {
      openSubject(SUBJECTS[currentClass][0][0]);
    }

    currentCategory = category;
    renderResources();

    // Affiche clairement la zone de travail après le changement de rubrique.
    scrollToWorkspace();
  }

  function showFavorites() {
    favoritesOnly = true;

    $("viewFilter").value = "favorites";
    $("subjectSearch").value = "";

    renderSubjects();

    $("subjectsSection").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  $("schoolClassSelector").addEventListener("change", event => {
    closeFullscreenLesson();

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
    const target = event.target.closest("[data-category]");

    if (target) {
      showCategory(target.dataset.category);
    }
  });

  $("categoryGridWorkspace").addEventListener("click", event => {
    const target = event.target.closest("[data-category]");

    if (target) {
      showCategory(target.dataset.category);
    }
  });

  $("backSubjects").addEventListener("click", () => {
    closeFullscreenLesson();

    $("subjectWorkspace").classList.add("hidden");

    $("subjectsSection").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  $("showFavorites").addEventListener("click", showFavorites);

  $("openCours").addEventListener("click", () => {
    if (!currentSubject) {
      openSubject(SUBJECTS[currentClass][0][0]);
    }

    showCategory("cours");
  });

  $("openExos").addEventListener("click", () => {
    if (!currentSubject) {
      openSubject(SUBJECTS[currentClass][0][0]);
    }

    showCategory("exercices");
  });

  $("showSubjects").addEventListener("click", () => {
    $("subjectsSection").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  buildClassSelector();
  renderSubjects();
  save();

})();
