/* ==========================================================
   AFRIQUE TECH PLUS — ATP SCHOOL
   Gestion pédagogique complète de la classe de 6e
   Cours • Exercices • Corrections • Quiz • Évaluations
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

  if (!SUBJECTS[currentClass]) currentClass = "6e";

  const CONTENT = window.ATP_LEARNING_CONTENT_6E;
  const RAW_CURRICULUM = window.ATP_CURRICULUM_6E || {};

  const styles = document.createElement("style");
  styles.textContent = `
    .atp-learning-section{margin:18px 0;padding:17px;background:#fff;
      border:1px solid #dce5f4;border-radius:15px}
    .atp-learning-section h4{color:#245bc1;margin:0 0 12px}
    .atp-learning-section p{line-height:1.7;color:#40516d}
    .atp-learning-tag{display:inline-block;background:#eaf1ff;color:#245bc1;
      padding:5px 9px;border-radius:20px;font-size:11px;font-weight:bold}
    .atp-session{margin:12px 0;border:1px solid #dce5f4;
      border-radius:13px;background:#fff;overflow:hidden}
    .atp-session summary{padding:15px;cursor:pointer;font-weight:bold;
      color:#203452;background:#f6f9ff;line-height:1.5}
    .atp-session-body{padding:15px}
    .atp-list{padding-left:21px;color:#40516d;line-height:1.8}
    .atp-question{padding:13px;margin:12px 0;background:#f6f9ff;
      border:1px solid #dce5f4;border-radius:11px}
    .atp-answer{display:none;margin-top:10px;padding:12px;
      background:#eaf7ef;border-radius:9px;color:#205c39;line-height:1.6}
    .atp-answer.visible{display:block}
    .atp-small-btn{border:0;border-radius:9px;padding:10px 13px;
      background:#2864d8;color:white;font-weight:bold;cursor:pointer;
      margin:6px 5px 6px 0}
    .atp-small-btn.secondary{background:#eaf1ff;color:#245bc1}
    .atp-progress{height:9px;background:#e8edf6;border-radius:20px;
      overflow:hidden;margin:10px 0}
    .atp-progress span{display:block;height:100%;background:#2864d8;
      border-radius:20px;transition:width .2s}
    .atp-quiz-option{display:block;width:100%;text-align:left;padding:11px;
      margin:7px 0;border:1px solid #cbd8ed;border-radius:9px;
      background:#fff;color:#263754;cursor:pointer}
    .atp-quiz-option.selected{border-color:#2864d8;background:#eaf1ff}
    .atp-quiz-option.correct{border-color:#23965a;background:#e7f7ed}
    .atp-quiz-option.wrong{border-color:#d65a5a;background:#fff0f0}
    .atp-score{padding:13px;background:#eaf1ff;color:#245bc1;
      border-radius:10px;font-weight:bold;margin-top:12px}
    .atp-muted{font-size:13px;color:#71809a}
    .atp-lesson-summary{background:#f3f7ff;border-radius:12px;
      padding:14px;margin-top:12px}
    .atp-check{display:flex;gap:9px;align-items:flex-start;
      padding:8px 0;color:#40516d;line-height:1.5}
    .atp-check input{margin-top:4px}
    .atp-lesson-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:15px}
    @media(max-width:600px){
      .atp-learning-section{padding:13px}
      .atp-session-body{padding:11px}
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
    const section = el("section", "", "atp-learning-section");
    section.appendChild(el("h4", title));

    if (typeof content === "string") {
      section.appendChild(el("p", content));
    } else if (content) {
      section.appendChild(content);
    }

    parent.appendChild(section);
    return section;
  }

  function makeList(items) {
    const list = document.createElement("ul");
    list.className = "atp-list";

    (items || []).forEach(item => {
      list.appendChild(el("li", item));
    });

    return list;
  }

  function normalizeLessons(data) {
    const result = [];

    if (Array.isArray(data)) {
      data.forEach(item => {
        if (typeof item === "string") {
          result.push({ title: item, section: "", sessions: [] });
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
            result.push({ title: item, section, sessions: [] });
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
    if (!CONTENT || typeof CONTENT.buildAll !== "function") return null;

    const all = CONTENT.buildAll(RAW_CURRICULUM);
    return all[curriculumName(subject)] || null;
  }

  function getLessonContent(subject, index) {
    const data = getLearningSubject(subject);
    return data && data.lessons ? data.lessons[index] : null;
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
        count
          ? count + " leçons enregistrées"
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

  function renderObjectives(parent, objectives) {
    addSection(parent, "🎯 Objectifs pédagogiques", makeList(objectives));
  }

  function renderCourse(parent, session) {
    const course = session.course;

    addSection(parent, "Introduction", course.introduction);
    addSection(parent, "Explication du cours", course.explanation);
    addSection(parent, "Exemple pratique", course.example);
    addSection(parent, "Vocabulaire essentiel", makeList(course.vocabulary));
    addSection(parent, "Méthode de travail", course.method);
    addSection(parent, "À retenir", course.essential);
    addSection(parent, "Conclusion", course.conclusion);
  }

  function renderExercises(parent, session, lessonIndex, sessionIndex) {
    const heading = el(
      "p",
      "Effectue les exercices avant d'afficher les corrections.",
      "atp-muted"
    );
    parent.appendChild(heading);

    session.exercises.forEach((exercise, exerciseIndex) => {
      const card = el("div", "", "atp-question");

      card.appendChild(
        el("span", exercise.level, "atp-learning-tag")
      );

      card.appendChild(
        el("p", "Exercice " + (exerciseIndex + 1) + " : " + exercise.instruction)
      );

      const answer = el("div", exercise.correction, "atp-answer");

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
    const quiz = session.quiz;
    const quizId = [
      currentClass,
      currentSubject,
      lessonIndex,
      sessionIndex
    ].join("::");

    const box = el("div", "", "atp-learning-section");
    box.appendChild(el("h4", "🧠 Mini-quiz de la séance"));

    box.appendChild(
      el("p", "Lis chaque question, réfléchis à ta réponse puis affiche la correction pour vérifier tes connaissances.")
    );

    let score = 0;
    let checked = 0;

    const scoreDisplay = el("div", "Auto-évaluation : 0 / " + quiz.length, "atp-score");

    quiz.forEach((question, questionIndex) => {
      const card = el("div", "", "atp-question");

      card.appendChild(
        el("strong", (questionIndex + 1) + ". " + question.question)
      );

      const answer = el(
        "div",
        "Réponse attendue : " + question.answer + " " + question.explanation,
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
          correctButton.classList.add("secondary");

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
    addSection(
      parent,
      "📝 Évaluation — " + assessment.duration,
      "Barème : " + assessment.total + " points. Réponds d'abord dans ton cahier avant de consulter les éléments de correction."
    );

    assessment.instructions.forEach((instruction, index) => {
      parent.appendChild(
        el("p", (index + 1) + ". " + instruction, "atp-muted")
      );
    });

    assessment.questions.forEach((question, index) => {
      const card = el("div", "", "atp-question");

      card.appendChild(
        el(
          "strong",
          "Question " + (index + 1) + " — " +
          question.points + " points"
        )
      );

      card.appendChild(el("p", question.question));

      const correction = el(
        "div",
        "Éléments de correction : " + question.expected,
        "atp-answer"
      );

      const reveal = button(
        "Consulter les éléments de correction",
        "atp-small-btn secondary",
        () => {
          correction.classList.toggle("visible");
        }
      );

      card.append(reveal, correction);
      parent.appendChild(card);
    });
  }

  function renderRevision(parent, items) {
    const wrapper = el("div", "", "atp-learning-section");
    wrapper.appendChild(el("h4", "📌 Ma fiche de révision"));

    items.forEach(item => {
      const label = el("label", "", "atp-check");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      label.append(checkbox, el("span", item));
      wrapper.appendChild(label);
    });

    parent.appendChild(wrapper);
  }

  function renderLesson(parent, lesson, lessonIndex) {
    const content = getLessonContent(currentSubject, lessonIndex);
    const key = lessonKey(currentSubject, lesson, lessonIndex);

    const details = document.createElement("details");
    details.className = "atp-session";

    const summary = el(
      "summary",
      (isDone(key) ? "✓ " : "") +
      "Leçon " + (lessonIndex + 1) + " : " + lesson.title
    );

    details.appendChild(summary);

    const body = el("div", "", "atp-session-body");

    if (!content) {
      body.appendChild(
        el("p", "Le contenu pédagogique de cette matière est en cours de préparation.")
      );
      details.appendChild(body);
      parent.appendChild(details);
      return;
    }

    body.appendChild(
      el("span", content.sessions.length + " séance(s)", "atp-learning-tag")
    );

    body.appendChild(el("p", content.introduction));

    if (currentCategory === "cours") {
      renderObjectives(body, content.objectives);

      content.sessions.forEach((session, index) => {
        const sessionDetails = document.createElement("details");
        sessionDetails.className = "atp-session";

        sessionDetails.appendChild(
          el("summary", "Séance " + (index + 1) + " : " + session.title)
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
      content.sessions.forEach((session, index) => {
        const sessionDetails = document.createElement("details");
        sessionDetails.className = "atp-session";
        sessionDetails.open = index === 0;

        sessionDetails.appendChild(
          el("summary", "Exercices — " + session.title)
        );

        const sessionBody = el("div", "", "atp-session-body");

        renderExercises(sessionBody, session, lessonIndex, index);
        renderQuiz(sessionBody, session, lessonIndex, index);

        sessionDetails.appendChild(sessionBody);
        body.appendChild(sessionDetails);
      });
    }

    if (currentCategory === "devoirs") {
      renderAssessment(body, content.finalAssessment);

      content.sessions.forEach((session, index) => {
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
    }

    if (currentCategory === "examens") {
      renderRevision(body, content.revision);
      renderAssessment(body, content.finalAssessment);

      addSection(
        body,
        "Conseils pour réussir",
        "Révise les définitions, apprends les notions essentielles, refais les exercices sans regarder les corrections et vérifie que tu sais expliquer chaque réponse."
      );
    }

    const actions = el("div", "", "atp-lesson-actions");

    const doneButton = button(
      isDone(key) ? "✓ Leçon terminée" : "Marquer la leçon comme terminée",
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

    details.append(summary, body);
    parent.appendChild(details);
  }

  function renderResources() {
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
        el("div", "Aucun intitulé n'est enregistré pour cette matière.", "empty")
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

    header.appendChild(
      el("p", total + " leçons · " + finished + " terminées · " + percentage + "% de progression")
    );

    const progress = el("div", "", "atp-progress");
    const bar = el("span");
    bar.style.width = percentage + "%";
    progress.appendChild(bar);
    header.appendChild(progress);

    if (subjectContent) {
      header.appendChild(
        el("p", "Objectif général : " + subjectContent.goal)
      );
    }

    list.appendChild(header);

    let previousSection = null;

    lessons.forEach((lesson, index) => {
      if (lesson.section && lesson.section !== previousSection) {
        previousSection = lesson.section;
        list.appendChild(
          el("h3", lesson.section)
        );
      }

      renderLesson(list, lesson, index);
    });
  }

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

    $("subjectsSection").scrollIntoView({ behavior: "smooth" });
  }

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
    const target = event.target.closest("[data-category]");
    if (target) showCategory(target.dataset.category);
  });

  $("categoryGridWorkspace").addEventListener("click", event => {
    const target = event.target.closest("[data-category]");
    if (target) showCategory(target.dataset.category);
  });

  $("backSubjects").addEventListener("click", () => {
    $("subjectWorkspace").classList.add("hidden");
    $("subjectsSection").scrollIntoView({ behavior: "smooth" });
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
    $("subjectsSection").scrollIntoView({ behavior: "smooth" });
  });

  buildClassSelector();
  renderSubjects();
  save();

})();
