(() => {
  "use strict";

  // ==========================================
  // CONFIGURATION SUPABASE
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

  const catalogue = document.querySelector("#academy-dynamic-catalogue");
  if (!catalogue) return;

  const purchaseUrls = {
    "maitriser-canva-et-le-design-graphique":
      "https://afrique-tech-plus.myficsell.com/vqdrcpz6p",

    "devenir-freelance-et-trouver-ses-premiers-clients":
      "https://afrique-tech-plus.myficsell.com/egaw85w38",

    "maitriser-les-bases-de-la-programmation":
      "https://afrique-tech-plus.myficsell.com/j99qjmm7g",

    "creer-son-premier-site-web":
      "https://afrique-tech-plus.myficsell.com/c7xuw5fzu"
  };

  let currentUser = null;
  let enrolledCourseIds = new Set();
  let activeCourseId = null;
  let activeCourse = null;
  let progressByLesson = new Map();
  let progressByCourse = new Map();
  let authVersion = 0;

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
      margin: 8px 8px 0 0;
      background: #2864d8;
      color: white;
      font-weight: bold;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
    }

    .atp-live-button:disabled {
      opacity: .55;
      cursor: not-allowed;
    }

    .atp-outline-button {
      background: transparent;
      border: 1px solid #2864d8;
      color: #a9c9ff;
    }

    .atp-course-player {
      margin-top: 35px;
      padding: 22px;
      border: 1px solid rgba(40,100,216,.35);
      border-radius: 16px;
      background: rgba(40,100,216,.06);
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
      background: rgba(40,100,216,.12);
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
      color: #f2b544;
      font-size: 12px;
      margin-bottom: 10px;
    }

    .atp-module summary {
      cursor: pointer;
      font-weight: bold;
    }

    .atp-progress {
      margin: 18px 0;
      padding: 16px;
      background: #171e3d;
      border: 1px solid rgba(40,100,216,.35);
      border-radius: 12px;
      color: #f5f7ff;
    }

    .atp-progress-track {
      height: 10px;
      background: rgba(255,255,255,.12);
      border-radius: 20px;
      overflow: hidden;
      margin-top: 10px;
    }

    .atp-progress-fill {
      height: 100%;
      width: 0%;
      background: #f2b544;
      transition: width .3s ease;
    }

    .atp-completed {
      color: #f2b544;
      font-size: 13px;
      margin-top: 10px;
    }

    .atp-purchase-notice {
      padding: 14px;
      margin: 15px 0;
      border-radius: 10px;
      background: rgba(40,100,216,.12);
      color: #f5f7ff;
      line-height: 1.6;
    }

    @media(max-width:600px) {
      .atp-course-player {
        padding: 15px;
      }
    }
  `;

  document.head.appendChild(style);

  // ==========================================
  // ZONES D'AFFICHAGE
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
  // ACCÈS AUX FORMATIONS
  // ==========================================

  function hasCourseAccess(course) {
    if (course.access_type === "free") return true;

    return (
      currentUser !== null &&
      enrolledCourseIds.has(course.id)
    );
  }

  function addPurchaseButton(course) {
    const notice = makeElement(
      "div",
      "atp-purchase-notice",
      "Cette formation est premium. Achète-la pour débloquer les modules, les leçons, les évaluations et le PDF."
    );

    const purchaseUrl = purchaseUrls[course.slug];

    player.appendChild(notice);

    if (!purchaseUrl) {
      player.appendChild(
        makeElement(
          "p",
          "atp-status",
          "Lien d'achat momentanément indisponible. Contacte notre assistance."
        )
      );
      return;
    }

    const button = makeElement(
      "a",
      "atp-live-button",
      "Acheter cette formation"
    );

    button.href = purchaseUrl;
    button.target = "_blank";
    button.rel = "noopener noreferrer";

    player.appendChild(button);

    if (!currentUser) {
      player.appendChild(
        makeElement(
          "p",
          "atp-status",
          "Après ton achat, crée ton compte AFRIQUE TECH PLUS avec la même adresse e-mail que celle utilisée pour le paiement afin de retrouver ta formation."
        )
      );
    }
  }

  // ==========================================
  // TÉLÉCHARGEMENT DU PDF
  // ==========================================

  async function downloadCoursePdf(course, button) {
    if (!currentUser) {
      window.location.href = "index.html#account";
      return;
    }

    if (!enrolledCourseIds.has(course.id)) {
      alert("Tu dois acheter cette formation pour télécharger son PDF.");
      return;
    }

    button.disabled = true;
    button.textContent = "Préparation du PDF...";

    try {
      const { data, error } = await client.functions.invoke(
        "academy-download-pdf",
        {
          body: {
            course_slug: course.slug
          }
        }
      );

      if (error) {
        console.error("Erreur fonction PDF :", error);
        throw new Error(
          data?.error || "Le téléchargement n'a pas pu être préparé."
        );
      }

      if (!data?.success || !data?.download_url) {
        throw new Error(
          data?.error || "Lien de téléchargement indisponible."
        );
      }

      button.textContent = "Ouverture du PDF...";

      window.location.assign(data.download_url);

      button.textContent = "✓ Téléchargement lancé";

    } catch (error) {
      console.error("Erreur téléchargement PDF :", error);

      alert(
        error.message ||
        "Impossible de télécharger le PDF. Réessaie."
      );

      button.disabled = false;
      button.textContent = "Télécharger le PDF";
    }
  }

  function addDownloadButton(course) {
    if (course.access_type === "free") return;

    const button = makeElement(
      "button",
      "atp-live-button",
      "Télécharger le PDF"
    );

    button.type = "button";

    button.addEventListener("click", () => {
      downloadCoursePdf(course, button);
    });

    player.appendChild(button);
  }

  // ==========================================
  // PROGRESSION
  // ==========================================

  function isLessonCompleted(lessonId) {
    return progressByLesson.get(lessonId) === true;
  }

  function getCourseLessonsCount() {
    return progressByCourse.get(activeCourseId)?.total || 0;
  }

  function getCourseCompletedCount() {
    return progressByCourse.get(activeCourseId)?.completed || 0;
  }

  function updateProgressDisplay() {
    if (!activeCourseId || !activeCourse) return;

    const total = getCourseLessonsCount();
    const completed = getCourseCompletedCount();

    const percentage = total
      ? Math.round((completed / total) * 100)
      : 0;

    const label = player.querySelector("#atp-progress-label");
    const fill = player.querySelector("#atp-progress-fill");

    if (label) {
      label.textContent =
        completed + " / " + total +
        " leçons terminées — " + percentage + "%";
    }

    if (fill) {
      fill.style.width = percentage + "%";
    }
  }

  function refreshLessonCompletionButtons() {
    const buttons = player.querySelectorAll(
      "[data-atp-lesson-id]"
    );

    buttons.forEach((button) => {
      const lessonId = button.dataset.atpLessonId;

      if (isLessonCompleted(lessonId)) {
        button.disabled = true;
        button.textContent = "✓ Leçon terminée";

        const status = button.parentElement.querySelector(
          ".atp-completed"
        );

        if (status) {
          status.textContent =
            "Déjà enregistrée dans ta progression.";
        }
      }
    });
  }

  async function loadCourseProgress(courseId, lessons) {
    progressByCourse.set(courseId, {
      total: lessons.length,
      completed: 0
    });

    if (!currentUser || !enrolledCourseIds.has(courseId)) {
      updateProgressDisplay();
      return;
    }

    const lessonIds = lessons.map((lesson) => lesson.id);

    if (!lessonIds.length) {
      updateProgressDisplay();
      return;
    }

    const { data, error } = await client
      .from("academy_lesson_progress")
      .select("lesson_id, is_completed")
      .eq("member_id", currentUser.id)
      .in("lesson_id", lessonIds);

    if (error) {
      console.error("Erreur chargement progression :", error);
      return;
    }

    for (const item of data || []) {
      progressByLesson.set(
        item.lesson_id,
        item.is_completed === true
      );
    }

    const completed = lessons.filter(
      (lesson) => isLessonCompleted(lesson.id)
    ).length;

    progressByCourse.set(courseId, {
      total: lessons.length,
      completed
    });

    refreshLessonCompletionButtons();
    updateProgressDisplay();
  }

  async function saveLessonProgress(lesson, button, status) {
    if (!currentUser) {
      status.textContent =
        "Connecte-toi pour enregistrer ta progression.";
      return;
    }

    const courseId = activeCourseId;

    if (!courseId || !enrolledCourseIds.has(courseId)) {
      status.textContent =
        "Inscris-toi à la formation pour enregistrer ta progression.";
      return;
    }

    if (isLessonCompleted(lesson.id)) {
      status.textContent = "Cette leçon est déjà terminée.";
      return;
    }

    button.disabled = true;
    button.textContent = "Enregistrement...";

    const now = new Date().toISOString();

    const { error } = await client
      .from("academy_lesson_progress")
      .upsert(
        {
          member_id: currentUser.id,
          lesson_id: lesson.id,
          is_completed: true,
          completed_at: now,
          updated_at: now
        },
        {
          onConflict: "member_id,lesson_id"
        }
      );

    if (error) {
      console.error("Erreur sauvegarde progression :", error);

      button.disabled = false;
      button.textContent = "Marquer comme terminée";

      status.textContent =
        "Impossible d'enregistrer. Vérifie ta connexion et réessaie.";

      return;
    }

    progressByLesson.set(lesson.id, true);

    const progress = progressByCourse.get(courseId) || {
      total: 0,
      completed: 0
    };

    progress.completed = Math.min(
      progress.total,
      progress.completed + 1
    );

    progressByCourse.set(courseId, progress);

    const percentage = progress.total
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;

    const { error: enrollmentError } = await client
      .from("academy_enrollments")
      .update({
        progress_percent: percentage
      })
      .eq("member_id", currentUser.id)
      .eq("course_id", courseId)
      .eq("enrollment_status", "active");

    if (enrollmentError) {
      console.error(
        "Erreur mise à jour inscription :",
        enrollmentError
      );
    }

    button.disabled = true;
    button.textContent = "✓ Leçon terminée";

    status.textContent =
      "Progression enregistrée avec succès !";

    updateProgressDisplay();
  }

  // ==========================================
  // CHARGER LES FORMATIONS
  // ==========================================

  async function loadCourses() {
    liveCourses.replaceChildren(
      makeElement(
        "p",
        "atp-status",
        "Chargement des formations..."
      )
    );

    const { data: courses, error } = await client
      .from("academy_courses")
      .select(
        "id, title, description, level, access_type, modules_count, slug"
      )
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
        course.access_type === "free"
          ? "FORMATION GRATUITE"
          : "FORMATION PREMIUM"
      );

      const title = makeElement("h3", "", course.title);

      const description = makeElement(
        "p",
        "",
        course.description ||
          "Découvre cette formation sur AFRIQUE TECH PLUS Academy."
      );

      const details = makeElement(
        "p",
        "atp-status",
        (course.modules_count || 0) +
          " modules · " +
          (course.level || "Tous niveaux")
      );

      const button = makeElement(
        "button",
        "atp-live-button",
        "Découvrir la formation →"
      );

      button.type = "button";
      button.addEventListener("click", () => openCourse(course));

      card.append(
        category,
        title,
        description,
        details,
        button
      );

      liveCourses.appendChild(card);
    }

    const requestedCourseId = new URLSearchParams(window.location.search).get("id");
    if (requestedCourseId) {
      const requestedCourse = courses.find(course => course.id === requestedCourseId);
      if (requestedCourse) {
        openCourse(requestedCourse);
      } else {
        showStatus(liveCourses, "Cette formation est introuvable ou n'est plus publiée.");
      }
    }
  }

  // ==========================================
  // OUVRIR UNE FORMATION
  // ==========================================

  async function openCourse(course) {
    activeCourseId = course.id;
    activeCourse = course;

    progressByLesson.clear();
    progressByCourse.delete(course.id);

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

    player.append(title, description);

    // Bloquer l'accès aux formations premium non achetées.
    if (!hasCourseAccess(course)) {
      addPurchaseButton(course);
      return;
    }

    // Le bouton PDF est affiché uniquement aux acheteurs.
    addDownloadButton(course);

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
          makeElement(
            "p",
            "atp-course-tag",
            "✓ Tu es inscrit à cette formation"
          )
        );
      }
    } else if (course.access_type === "free" && !currentUser) {
      const login = makeElement(
        "a",
        "atp-live-button",
        "Connecte-toi pour t'inscrire"
      );

      login.href = "index.html#account";
      player.appendChild(login);
    }

    const status = makeElement(
      "p",
      "atp-status",
      "Chargement des modules..."
    );

    player.appendChild(status);

    const { data: modules, error } = await client
      .from("academy_modules")
      .select("id, title, description, position")
      .eq("course_id", course.id)
      .order("position");

    if (activeCourseId !== course.id) return;

    if (error) {
      console.error("Erreur modules :", error);
      showStatus(status, "Impossible de charger les modules.");
      return;
    }

    status.remove();

    if (!modules || modules.length === 0) {
      player.appendChild(
        makeElement(
          "p",
          "atp-status",
          "Aucun module disponible."
        )
      );
      return;
    }

    const progressBox = makeElement("div", "atp-progress");

    const progressLabel = makeElement(
      "p",
      "",
      "Chargement de ta progression..."
    );

    progressLabel.id = "atp-progress-label";

    const progressTrack = makeElement(
      "div",
      "atp-progress-track"
    );

    const progressFill = makeElement(
      "div",
      "atp-progress-fill"
    );

    progressFill.id = "atp-progress-fill";

    progressTrack.appendChild(progressFill);
    progressBox.append(progressLabel, progressTrack);
    player.appendChild(progressBox);

    const allLessons = [];

    for (const module of modules) {
      if (activeCourseId !== course.id) return;

      const moduleElement = makeElement(
        "details",
        "atp-module"
      );

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

      moduleElement.append(
        summary,
        moduleDescription,
        lessonsContainer
      );

      player.appendChild(moduleElement);

      const lessons = await loadLessons(
        module,
        lessonsContainer
      );

      if (lessons) {
        allLessons.push(...lessons);
      }
    }

    if (activeCourseId !== course.id) return;

    await loadCourseProgress(course.id, allLessons);
    updateProgressDisplay();
  }

  // ==========================================
  // INSCRIPTION GRATUITE
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

      if (error.code === "23505") {
        enrolledCourseIds.add(course.id);
        button.remove();

        player.appendChild(
          makeElement(
            "p",
            "atp-course-tag",
            "✓ Tu es déjà inscrit à cette formation."
          )
        );

        return;
      }

      button.disabled = false;
      button.textContent = "Réessayer";

      alert(
        "L'inscription n'a pas abouti. Vérifie que tu es connecté et que la formation est bien publiée."
      );

      return;
    }

    enrolledCourseIds.add(course.id);
    button.remove();

    player.insertBefore(
      makeElement(
        "p",
        "atp-course-tag",
        "✓ Inscription réussie ! Tu peux commencer."
      ),
      player.children[2] || null
    );
  }

  // ==========================================
  // CHARGER LES LEÇONS
  // ==========================================

  async function loadLessons(module, container) {
    const { data: lessons, error } = await client
      .from("academy_lessons")
      .select(
        "id, title, content, lesson_type, position, duration_minutes"
      )
      .eq("module_id", module.id)
      .order("position");

    if (error) {
      console.error("Erreur leçons :", error);
      container.textContent =
        "Impossible de charger les leçons.";

      return [];
    }

    if (!lessons || lessons.length === 0) {
      container.textContent = "Aucune leçon disponible.";
      return [];
    }

    for (const lesson of lessons) {
      const lessonCard = makeElement(
        "article",
        "atp-lesson"
      );

      const lessonTitle = makeElement(
        "h4",
        "",
        "Leçon " + lesson.position + " — " + lesson.title
      );

      const duration = makeElement(
        "p",
        "atp-status",
        "Durée estimée : " +
          (lesson.duration_minutes || 10) +
          " minutes"
      );

      const toggle = makeElement(
        "button",
        "atp-live-button atp-outline-button",
        "Lire la leçon"
      );

      toggle.type = "button";

      const content = makeElement(
        "div",
        "atp-lesson-content"
      );

      content.hidden = true;
      content.textContent =
        lesson.content || "Contenu en préparation.";

      toggle.addEventListener("click", () => {
        content.hidden = !content.hidden;

        toggle.textContent = content.hidden
          ? "Lire la leçon"
          : "Masquer la leçon";
      });

      const completionButton = makeElement(
        "button",
        "atp-live-button",
        "Marquer comme terminée"
      );

      completionButton.type = "button";
      completionButton.dataset.atpLessonId = lesson.id;

      const completionStatus = makeElement(
        "p",
        "atp-completed",
        ""
      );

      completionButton.addEventListener("click", () => {
        saveLessonProgress(
          lesson,
          completionButton,
          completionStatus
        );
      });

      lessonCard.append(
        lessonTitle,
        duration,
        toggle,
        content,
        completionButton,
        completionStatus
      );

      container.appendChild(lessonCard);

      await loadQuizzes(lesson, lessonCard);
    }

    return lessons;
  }

  // ==========================================
  // QUIZ
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

    const quizHeading = makeElement(
      "h4",
      "",
      "Évaluation de la leçon"
    );

    container.appendChild(quizHeading);

    for (const quiz of quizzes) {
      const quizCard = makeElement("div", "atp-quiz");

      const question = makeElement(
        "p",
        "",
        quiz.position + ". " + quiz.question
      );

      const form = makeElement("form", "");

      const result = makeElement(
        "div",
        "atp-quiz-result"
      );

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

        label.append(
          input,
          document.createTextNode(option)
        );

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

        const correction = Array.isArray(data)
          ? data[0]
          : data;

        if (!correction) {
          result.textContent =
            "Aucun résultat de correction reçu.";

          submit.disabled = false;
          submit.textContent = "Réessayer";

          return;
        }

        result.textContent =
          (correction.is_correct
            ? "✓ Bonne réponse ! "
            : "✗ Réponse incorrecte. ") +
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
  // INITIALISATION ET AUTHENTIFICATION
  // ==========================================

  async function initialize() {
    const version = ++authVersion;

    const { data, error } = await client.auth.getSession();

    if (version !== authVersion) return;

    if (error) {
      console.error("Session Academy :", error);
    }

    currentUser = data?.session?.user || null;

    enrolledCourseIds.clear();
    progressByLesson.clear();
    progressByCourse.clear();

    if (currentUser) {
      const { data: enrollments, error: enrollmentError } =
        await client
          .from("academy_enrollments")
          .select("course_id")
          .eq("member_id", currentUser.id)
          .eq("enrollment_status", "active");

      if (version !== authVersion) return;

      if (enrollmentError) {
        console.error(
          "Inscriptions Academy :",
          enrollmentError
        );
      } else {
        enrolledCourseIds = new Set(
          (enrollments || []).map(
            (item) => item.course_id
          )
        );
      }
    }

    await loadCourses();
  }

  initialize();

  client.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;

    enrolledCourseIds.clear();
    progressByLesson.clear();
    progressByCourse.clear();

    activeCourseId = null;
    activeCourse = null;

    player.hidden = true;
    player.replaceChildren();

    setTimeout(() => {
      initialize();
    }, 0);
  });

})();
