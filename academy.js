(() => {
  "use strict";

  // ==========================================
  // CONFIGURATION ET CONNEXION SUPABASE
  // ==========================================

  if (
    !window.supabase?.createClient ||
    !window.ATP_CONFIG?.supabaseUrl ||
    !window.ATP_CONFIG?.supabasePublishableKey
  ) {
    console.error("Configuration Supabase introuvable.");
    return;
  }

  const client = window.supabase.createClient(
    window.ATP_CONFIG.supabaseUrl,
    window.ATP_CONFIG.supabasePublishableKey
  );

  const catalogue = document.querySelector("#formations");

  if (!catalogue) return;

  let currentUser = null;
  let enrolledCourseIds = new Set();
  let activeCourseId = null;

  // ==========================================
  // STYLES
  // ==========================================

  const style = document.createElement("style");

  style.textContent = `
    .atp-live-courses {
      display: grid;
      grid-template-columns: repeat(auto-fit,minmax(260px,1fr));
      gap: 22px;
      margin-bottom: 30px;
    }

    .atp-live-card,
    .atp-module,
    .atp-lesson,
    .atp-quiz {
      background: #171e3d;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 15px;
      color: #f5f7ff;
    }

    .atp-live-card h3,
    .atp-module h3,
    .atp-lesson h4 {
      margin-bottom: 10px;
    }

    .atp-live-card p,
    .atp-module p,
    .atp-lesson p {
      color: #c0c8df;
      font-size: 14px;
    }

    .atp-live-button {
      display: inline-block;
      border: 0;
      border-radius: 9px;
      padding: 11px 16px;
      margin-top: 13px;
      background: #7c5cff;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    .atp-live-button:disabled {
      opacity: .55;
      cursor: not-allowed;
    }

    .atp-outline-button {
      background: transparent;
      border: 1px solid #7c5cff;
      color: #c8baff;
    }

    .atp-course-player {
      margin-top: 35px;
      padding: 22px;
      border: 1px solid rgba(124,92,255,.35);
      border-radius: 16px;
      background: rgba(124,92,255,.06);
    }

    .atp-course-player[hidden],
    .atp-lesson-content[hidden],
    .atp-quiz[hidden] {
      display: none;
    }

    .atp-lesson-content {
      white-space: pre-wrap;
      line-height: 1.8;
      color: #dce2f5;
      margin: 15px 0;
      font-size: 14px;
    }

    .atp-lesson-content h5 {
      color: #c8baff;
    }

    .atp-quiz label {
      display: block;
      padding: 10px;
      margin: 8px 0;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 8px;
      cursor: pointer;
    }

    .atp-quiz input {
      margin-right: 8px;
    }

    .atp-quiz-result {
      margin-top: 12px;
      padding: 12px;
      border-radius: 9px;
      background: rgba(124,92,255,.12);
      color: #f5f7ff;
      font-size: 14px;
    }

    .atp-status {
      color: #c0c8df;
      font-size: 13px;
      margin: 12px 0;
    }

    .atp-course-tag {
      display: inline-block;
      color: #c8fa72;
      font-size: 12px;
      margin-bottom: 10px;
    }

    .atp-module summary {
      cursor: pointer;
      font-weight: bold;
    }

    @media(max-width:600px) {
      .atp-course-player {
        padding: 15px;
      }
    }
  `;

  document.head.appendChild(style);

  // ==========================================
  // ZONE D'AFFICHAGE DES FORMATIONS
  // ==========================================

  const liveCourses = document.createElement("div");
  liveCourses.className = "atp-live-courses";
  liveCourses.id = "atp-live-courses";

  const heading = catalogue.querySelector(".section-heading");

  if (heading) {
    heading.after(liveCourses);
  } else {
    catalogue.prepend(liveCourses);
  }

  const player = document.createElement("section");
  player.className = "atp-course-player";
  player.id = "atp-course-player";
  player.hidden = true;

  liveCourses.after(player);

  function makeElement(tag, className, content) {
    const element = document.createElement(tag);

    if (className) element.className = className;
    if (content !== undefined) element.textContent = content;

    return element;
  }

  function showStatus(container, message) {
    container.textContent = message;
  }

  // ==========================================
  // CHARGER LES FORMATIONS PUBLIÉES
  // ==========================================

  async function loadCourses() {
    liveCourses.replaceChildren(
      makeElement("p", "atp-status", "Chargement des formations...")
    );

    const { data: courses, error } = await client
      .from("academy_courses")
      .select("id, title, description, level, access_type, modules_count, slug")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur catalogue :", error);
      showStatus(
        liveCourses,
        "Impossible de charger les formations. Réessaie plus tard."
      );
      return;
    }

    liveCourses.replaceChildren();

    if (!courses || courses.length === 0) {
      showStatus(
        liveCourses,
        "Aucune formation n'est encore disponible. Reviens bientôt !"
      );
      return;
    }

    for (const course of courses) {
      const card = makeElement("article", "atp-live-card");

      const category = makeElement(
        "span",
        "atp-course-tag",
        course.access_type === "free" ? "FORMATION GRATUITE" : "FORMATION PAYANTE"
      );

      const title = makeElement("h3", "", course.title);

      const description = makeElement(
        "p",
        "",
        course.description || "Découvre cette formation sur AFRIQUE TECH PLUS Academy."
      );

      const details = makeElement(
        "p",
        "atp-status",
        (course.modules_count || 0) + " modules · " +
        (course.level || "Tous niveaux")
      );

      const button = makeElement(
        "button",
        "atp-live-button",
        "Découvrir la formation →"
      );

      button.type = "button";

      button.addEventListener("click", () => {
        openCourse(course);
      });

      card.append(category, title, description, details, button);
      liveCourses.appendChild(card);

      // Retirer l'ancien emplacement statique correspondant
      const oldCards = catalogue.querySelectorAll(".course");

      oldCards.forEach((oldCard) => {
        const oldTitle = oldCard.querySelector("h3");

        if (
          oldTitle &&
          oldTitle.textContent.trim().toLowerCase() ===
          course.title.trim().toLowerCase()
        ) {
          oldCard.remove();
        }
      });
    }
  }

  // ==========================================
  // OUVRIR UNE FORMATION
  // ==========================================

  async function openCourse(course) {
    activeCourseId = course.id;
    player.hidden = false;
    player.replaceChildren();

    player.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    const title = makeElement("h2", "", course.title);
    const description = makeElement(
      "p",
      "atp-status",
      course.description || ""
    );

    const status = makeElement(
      "p",
      "atp-status",
      "Chargement des modules..."
    );

    player.append(title, description, status);

    const { data: modules, error } = await client
      .from("academy_modules")
      .select("id, title, description, position")
      .eq("course_id", course.id)
      .order("position");

    if (error) {
      console.error("Erreur modules :", error);
      showStatus(status, "Impossible de charger les modules.");
      return;
    }

    status.remove();

    if (!modules || modules.length === 0) {
      player.appendChild(
        makeElement("p", "atp-status", "Aucun module disponible.")
      );
      return;
    }

    if (course.access_type === "free" && currentUser) {
      if (!enrolledCourseIds.has(course.id)) {
        const enrollButton = makeElement(
          "button",
          "atp-live-button",
          "S'inscrire gratuitement"
        );

        enrollButton.type = "button";
        enrollButton.addEventListener("click", () => {
          enrollInCourse(course, enrollButton);
        });

        player.appendChild(enrollButton);
      } else {
        player.appendChild(
          makeElement("p", "atp-course-tag", "✓ Tu es inscrit à cette formation")
        );
      }
    } else if (!currentUser) {
      const login = makeElement(
        "a",
        "atp-live-button",
        "Connecte-toi pour t'inscrire"
      );

      login.href = "index.html#account";
      player.appendChild(login);
    } else if (course.access_type !== "free") {
      player.appendChild(
        makeElement(
          "p",
          "atp-status",
          "Cette formation nécessite un accès payant ou Premium."
        )
      );
    }

    for (const module of modules) {
      const moduleElement = makeElement("details", "atp-module");

      const summary = makeElement(
        "summary",
        "",
        "Module " + module.position + " — " + module.title
      );

      const moduleDescription = makeElement(
        "p",
        "atp-status",
        module.description || ""
      );

      const lessonsContainer = makeElement("div", "");

      moduleElement.append(summary, moduleDescription, lessonsContainer);
      player.appendChild(moduleElement);

      await loadLessons(module, lessonsContainer);
    }
  }

  // ==========================================
  // INSCRIPTION À UNE FORMATION GRATUITE
  // ==========================================

  async function enrollInCourse(course, button) {
    if (!currentUser) {
      window.location.href = "index.html#account";
      return;
    }

    button.disabled = true;
    button.textContent = "Inscription en cours...";

    const { error } = await client
      .from("academy_enrollments")
      .insert({
        member_id: currentUser.id,
        course_id: course.id,
        enrollment_status: "active",
        progress_percent: 0
      });

    if (error) {
      console.error("Erreur inscription :", error);

      button.disabled = false;
      button.textContent = "Réessayer";

      if (error.code === "23505") {
        button.textContent = "Déjà inscrit";
        enrolledCourseIds.add(course.id);
        return;
      }

      alert(
        "L'inscription n'a pas abouti. Vérifie que tu es connecté et que la formation est bien publiée."
      );
      return;
    }

    enrolledCourseIds.add(course.id);

    button.remove();

    const confirmation = makeElement(
      "p",
      "atp-course-tag",
      "✓ Inscription réussie ! Tu peux commencer."
    );

    player.insertBefore(confirmation, player.children[2] || null);
  }

  // ==========================================
  // CHARGER LES LEÇONS
  // ==========================================

  async function loadLessons(module, container) {
    const { data: lessons, error } = await client
      .from("academy_lessons")
      .select("id, title, content, lesson_type, position, duration_minutes")
      .eq("module_id", module.id)
      .order("position");

    if (error) {
      console.error("Erreur leçons :", error);
      container.textContent = "Impossible de charger les leçons.";
      return;
    }

    if (!lessons || lessons.length === 0) {
      container.textContent = "Aucune leçon disponible.";
      return;
    }

    for (const lesson of lessons) {
      const lessonCard = makeElement("article", "atp-lesson");

      const lessonTitle = makeElement(
        "h4",
        "",
        "Leçon " + lesson.position + " — " + lesson.title
      );

      const duration = makeElement(
        "p",
        "atp-status",
        "Durée estimée : " + (lesson.duration_minutes || 10) + " minutes"
      );

      const toggle = makeElement(
        "button",
        "atp-live-button atp-outline-button",
        "Lire la leçon"
      );

      toggle.type = "button";

      const content = makeElement("div", "atp-lesson-content");
      content.hidden = true;

      // Le contenu est affiché comme du texte, sans interpréter du HTML.
      content.textContent = lesson.content || "Contenu en préparation.";

      toggle.addEventListener("click", () => {
        content.hidden = !content.hidden;
        toggle.textContent = content.hidden
          ? "Lire la leçon"
          : "Masquer la leçon";
      });

      lessonCard.append(lessonTitle, duration, toggle, content);
      container.appendChild(lessonCard);

      await loadQuizzes(lesson, lessonCard);
    }
  }

  // ==========================================
  // CHARGER ET CORRIGER LES QUIZ
  // ==========================================

  async function loadQuizzes(lesson, container) {
    const { data: quizzes, error } = await client
      .from("academy_quizzes")
      .select("id, question, options, position")
      .eq("lesson_id", lesson.id)
      .order("position");

    if (error) {
      console.error("Erreur quiz :", error);
      return;
    }

    if (!quizzes || quizzes.length === 0) return;

    const quizHeading = makeElement("h4", "", "Évaluation de la leçon");
    container.appendChild(quizHeading);

    for (const quiz of quizzes) {
      const quizCard = makeElement("div", "atp-quiz");

      const question = makeElement(
        "p",
        "",
        quiz.position + ". " + quiz.question
      );

      const form = makeElement("form", "");
      const result = makeElement("div", "atp-quiz-result");
      result.hidden = true;

      const options = Array.isArray(quiz.options)
        ? quiz.options
        : [];

      options.forEach((option, index) => {
        const label = makeElement("label", "");

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "quiz-" + quiz.id;
        input.value = String(index);
        input.required = true;

        label.append(input, document.createTextNode(option));
        form.appendChild(label);
      });

      const submit = makeElement(
        "button",
        "atp-live-button",
        "Valider ma réponse"
      );

      submit.type = "submit";

      form.appendChild(submit);

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!currentUser) {
          result.hidden = false;
          result.textContent =
            "Connecte-toi pour participer aux évaluations.";
          return;
        }

        if (!enrolledCourseIds.has(activeCourseId)) {
          result.hidden = false;
          result.textContent =
            "Tu dois être inscrit à la formation pour répondre.";
          return;
        }

        const selected = form.querySelector(
          'input[name="quiz-' + quiz.id + '"]:checked'
        );

        if (!selected) return;

        submit.disabled = true;
        submit.textContent = "Correction...";

        const { data, error } = await client.rpc(
          "check_academy_quiz_answer",
          {
            p_quiz_id: quiz.id,
            p_selected_answer: Number(selected.value)
          }
        );

        result.hidden = false;

        if (error) {
          console.error("Erreur correction :", error);
          result.textContent =
            "Impossible de corriger cette réponse. Vérifie ton inscription.";
          submit.disabled = false;
          submit.textContent = "Réessayer";
          return;
        }

        const correction = Array.isArray(data) ? data[0] : data;

        if (!correction) {
          result.textContent = "Aucun résultat de correction reçu.";
          submit.disabled = false;
          submit.textContent = "Réessayer";
          return;
        }

        result.textContent =
          (correction.is_correct ? "✓ Bonne réponse ! " : "✗ Réponse incorrecte. ") +
          (correction.explanation || "");

        submit.textContent = "Réponse corrigée";
        form.querySelectorAll("input").forEach((input) => {
          input.disabled = true;
        });
      });

      quizCard.append(question, form, result);
      container.appendChild(quizCard);
    }
  }

  // ==========================================
  // INITIALISATION
  // ==========================================

  async function initialize() {
    const { data, error } = await client.auth.getSession();

    if (error) {
      console.error("Session Academy :", error);
    }

    currentUser = data?.session?.user || null;

    if (currentUser) {
      const { data: enrollments, error: enrollmentError } = await client
        .from("academy_enrollments")
        .select("course_id")
        .eq("member_id", currentUser.id)
        .eq("enrollment_status", "active");

      if (enrollmentError) {
        console.error("Inscriptions Academy :", enrollmentError);
      } else {
        enrolledCourseIds = new Set(
          (enrollments || []).map((item) => item.course_id)
        );
      }
    }

    await loadCourses();
  }

  initialize();

  client.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;
    enrolledCourseIds.clear();
    initialize();
  });

})();
