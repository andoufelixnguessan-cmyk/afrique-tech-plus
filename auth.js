(() => {
  "use strict";

  const config = window.ATP_CONFIG;

  if (
    !window.supabase ||
    !config?.supabaseUrl ||
    !config?.supabasePublishableKey
  ) {
    console.error("AFRIQUE TECH PLUS : configuration Supabase introuvable.");
    return;
  }

  const db = window.supabase.createClient(
    config.supabaseUrl,
    config.supabasePublishableKey
  );

  const $ = (id) => document.getElementById(id);

  let currentUserId = null;
  let loadingUserId = null;

  const escapeHTML = (value = "") =>
    String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);

  function addStyles() {
    if ($("atp-academy-auth-styles")) return;

    const style = document.createElement("style");
    style.id = "atp-academy-auth-styles";

    style.textContent = `
      #atp-academy-access {
        padding: 35px 0;
      }

      .atp-auth-panel {
        max-width: 650px;
        margin: auto;
        padding: 28px;
        background: #ffffff;
        color: #17233d;
        border: 1px solid #dce5f4;
        border-radius: 18px;
        box-shadow: 0 8px 25px rgba(36,65,110,.07);
      }

      .atp-auth-panel h2 {
        margin-bottom: 8px;
        color: #203452;
      }

      .atp-auth-description {
        color: #61708c;
        margin-bottom: 20px;
        font-size: 14px;
      }

      .atp-auth-tabs {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
      }

      .atp-auth-tabs button,
      .atp-auth-submit {
        border: 0;
        border-radius: 9px;
        padding: 11px 16px;
        cursor: pointer;
        font-weight: 700;
      }

      .atp-auth-tabs button {
        background: #edf2ff;
        color: #2864d8;
      }

      .atp-auth-tabs button.active,
      .atp-auth-submit {
        background: linear-gradient(135deg,#2864d8,#6557c8);
        color: white;
      }

      .atp-auth-form {
        display: grid;
        gap: 12px;
      }

      .atp-auth-form input {
        width: 100%;
        padding: 13px;
        border-radius: 9px;
        border: 1px solid #dce5f4;
        background: #f8faff;
        color: #17233d;
        outline: none;
      }

      .atp-auth-form input:focus {
        border-color: #2864d8;
      }

      .atp-auth-message {
        margin-top: 15px;
        color: #61708c;
        font-size: 14px;
      }

      .atp-dashboard-item {
        padding: 14px 0;
        border-bottom: 1px solid #e5ebf5;
      }

      .atp-dashboard-item:last-child {
        border-bottom: 0;
      }

      .atp-dashboard-item strong {
        display: block;
        margin-bottom: 5px;
        color: #203452;
      }

      .atp-dashboard-muted {
        display: block;
        color: #61708c;
        font-size: 13px;
        line-height: 1.6;
      }

      .atp-dashboard-tag {
        display: inline-block;
        margin-top: 8px;
        padding: 4px 9px;
        border-radius: 20px;
        background: #edf2ff;
        color: #2864d8;
        font-size: 12px;
        font-weight: 700;
      }

      .atp-progress-track {
        height: 9px;
        background: #e8edf7;
        border-radius: 20px;
        overflow: hidden;
        margin: 10px 0 6px;
      }

      .atp-progress-fill {
        height: 100%;
        background: linear-gradient(90deg,#2864d8,#6557c8);
        border-radius: 20px;
      }

      .atp-course-preview {
        margin-top: 12px;
        padding: 13px;
        background: #f7f9ff;
        border: 1px solid #e3eafa;
        border-radius: 11px;
      }

      .atp-course-preview h4 {
        margin-bottom: 8px;
        color: #203452;
        font-size: 14px;
      }

      #atp-academy-member-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        padding: 15px 18px;
        margin-bottom: 25px;
        background: #edf2ff;
        border: 1px solid #dce5f4;
        border-radius: 12px;
        color: #203452;
      }

      #atp-academy-member-info button {
        padding: 9px 14px;
        border: 1px solid #cbd8ef;
        border-radius: 8px;
        background: #ffffff;
        color: #2864d8;
        cursor: pointer;
        font-weight: 700;
      }

      @media(max-width:600px) {
        .atp-auth-panel {
          padding: 20px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function createAuthPanel() {
    if ($("atp-academy-access")) return;

    const catalogue = $("formations");
    if (!catalogue) {
      console.error("Section formations introuvable dans la page Académie.");
      return;
    }

    const section = document.createElement("section");
    section.id = "atp-academy-access";
    section.className = "container";

    section.innerHTML = `
      <div class="atp-auth-panel">
        <h2>Mon espace Academy</h2>
        <p class="atp-auth-description">
          Connecte-toi pour retrouver tes formations et suivre ta progression.
        </p>

        <div class="atp-auth-tabs">
          <button type="button" id="atp-login-tab" class="active">
            Connexion
          </button>
          <button type="button" id="atp-signup-tab">
            Inscription
          </button>
        </div>

        <form id="atp-login-form" class="atp-auth-form">
          <input
            type="email"
            id="atp-login-email"
            placeholder="Adresse e-mail"
            autocomplete="email"
            required
          >
          <input
            type="password"
            id="atp-login-password"
            placeholder="Mot de passe"
            autocomplete="current-password"
            required
          >
          <button class="atp-auth-submit" type="submit">
            Se connecter
          </button>
        </form>

        <form id="atp-signup-form" class="atp-auth-form" hidden>
          <input
            type="text"
            id="atp-signup-prenom"
            placeholder="Prénom"
            autocomplete="given-name"
            required
          >
          <input
            type="text"
            id="atp-signup-nom"
            placeholder="Nom"
            autocomplete="family-name"
            required
          >
          <input
            type="email"
            id="atp-signup-email"
            placeholder="Adresse e-mail"
            autocomplete="email"
            required
          >
          <input
            type="password"
            id="atp-signup-password"
            placeholder="Mot de passe (6 caractères minimum)"
            autocomplete="new-password"
            minlength="6"
            required
          >
          <button class="atp-auth-submit" type="submit">
            Créer mon compte
          </button>
        </form>

        <p id="atp-auth-message" class="atp-auth-message" role="status"></p>
      </div>
    `;

    catalogue.before(section);

    $("atp-login-tab").addEventListener("click", () => {
      $("atp-login-form").hidden = false;
      $("atp-signup-form").hidden = true;
      $("atp-login-tab").classList.add("active");
      $("atp-signup-tab").classList.remove("active");
      setMessage("");
    });

    $("atp-signup-tab").addEventListener("click", () => {
      $("atp-login-form").hidden = true;
      $("atp-signup-form").hidden = false;
      $("atp-login-tab").classList.remove("active");
      $("atp-signup-tab").classList.add("active");
      setMessage("");
    });

    $("atp-login-form").addEventListener("submit", login);
    $("atp-signup-form").addEventListener("submit", signup);
  }

  function setMessage(message, error = false) {
    const element = $("atp-auth-message");
    if (!element) return;

    element.textContent = message;
    element.style.color = error ? "#c0392b" : "#2864d8";
  }

  async function login(event) {
    event.preventDefault();

    const button = $("atp-login-form").querySelector("button");
    button.disabled = true;
    button.textContent = "Connexion...";

    const email = $("atp-login-email").value.trim();
    const password = $("atp-login-password").value;

    const { data, error } = await db.auth.signInWithPassword({
      email,
      password
    });

    button.disabled = false;
    button.textContent = "Se connecter";

    if (error) {
      setMessage("Connexion impossible : " + error.message, true);
      return;
    }

    if (data.user) {
      setMessage("Connexion réussie. Chargement de ton espace...");
      await showMember(data.user);
    }
  }

  async function signup(event) {
    event.preventDefault();

    const button = $("atp-signup-form").querySelector("button");
    button.disabled = true;
    button.textContent = "Création du compte...";

    const prenom = $("atp-signup-prenom").value.trim();
    const nom = $("atp-signup-nom").value.trim();
    const email = $("atp-signup-email").value.trim();
    const password = $("atp-signup-password").value;

    const { data, error } = await db.auth.signUp({
      email,
      password,
      options: {
        data: { prenom, nom }
      }
    });

    button.disabled = false;
    button.textContent = "Créer mon compte";

    if (error) {
      setMessage("Inscription impossible : " + error.message, true);
      return;
    }

    if (data.session?.user) {
      setMessage("Compte créé avec succès. Bienvenue !");
      await showMember(data.session.user);
    } else {
      setMessage(
        "Compte créé. Vérifie ta boîte e-mail pour confirmer ton adresse avant de te connecter."
      );
    }
  }

  function createPanelTarget(panelId, targetId) {
    const panel = $(panelId);
    if (!panel) return null;

    let target = $(targetId);

    if (!target) {
      target = document.createElement("div");
      target.id = targetId;
      panel.appendChild(target);
    }

    return target;
  }

  function getDashboardTargets() {
    const dashboard = $("academy-dashboard");
    if (!dashboard) return null;

    return {
      enrollments: $("academy-enrollments"),
      progress: $("academy-progress"),
      courses: createPanelTarget("panel-cours", "academy-courses-list"),
      evaluations: createPanelTarget("panel-evaluations", "academy-evaluations"),
      certificates: createPanelTarget("panel-attestations", "academy-certificates")
    };
  }

  function setContent(target, html) {
    if (target) target.innerHTML = html;
  }

  function setAllTargets(targets, message) {
    Object.values(targets).forEach((target) => {
      setContent(
        target,
        `<p class="atp-dashboard-muted">${escapeHTML(message)}</p>`
      );
    });
  }

  function showDisconnected() {
    currentUserId = null;
    loadingUserId = null;

    const dashboard = $("academy-dashboard");
    if (dashboard) dashboard.hidden = true;

    const access = $("atp-academy-access");
    if (access) access.hidden = false;
  }

  async function loadAcademyData(user) {
    const targets = getDashboardTargets();
    if (!targets) return;

    setAllTargets(targets, "Chargement de tes données...");

    const { data: enrollments, error: enrollmentError } = await db
      .from("academy_enrollments")
      .select(`
        id,
        course_id,
        enrolled_at,
        enrollment_status,
        progress_percent,
        academy_courses (
          id,
          title,
          description,
          modules_count,
          slug
        )
      `)
      .eq("member_id", user.id)
      .order("enrolled_at", { ascending: false });

    if (enrollmentError) {
      console.error("Erreur inscriptions Academy :", enrollmentError);
      setAllTargets(targets, "Impossible de charger ces informations. Réessaie plus tard.");
      return;
    }

    const courses = (enrollments || [])
      .map((enrollment) => {
        const course = Array.isArray(enrollment.academy_courses)
          ? enrollment.academy_courses[0]
          : enrollment.academy_courses;

        return { ...enrollment, course };
      })
      .filter((item) => item.course);

    if (!courses.length) {
      setContent(
        targets.enrollments,
        '<p class="atp-dashboard-muted">Tu n’es inscrit à aucune formation pour le moment. Découvre le catalogue pour commencer.</p>'
      );

      setContent(
        targets.progress,
        '<p class="atp-dashboard-muted">Ta progression apparaîtra ici après ton inscription et la réalisation de tes premières leçons.</p>'
      );

      setContent(
        targets.courses,
        '<p class="atp-dashboard-muted">Aucun cours à afficher pour le moment. Inscris-toi à une formation pour retrouver ici tes modules et tes leçons.</p>'
      );

      setContent(
        targets.evaluations,
        '<p class="atp-dashboard-muted">Les évaluations apparaîtront ici lorsque tu seras inscrit à une formation.</p>'
      );

      setContent(
        targets.certificates,
        '<p class="atp-dashboard-muted">Aucune attestation disponible pour le moment.</p>'
      );

      return;
    }

    setContent(
      targets.enrollments,
      courses.map((item) => `
        <div class="atp-dashboard-item">
          <strong>${escapeHTML(item.course.title)}</strong>
          <small class="atp-dashboard-muted">
            ${escapeHTML(item.course.description || "Formation AFRIQUE TECH PLUS")}
          </small>
          <span class="atp-dashboard-tag">
            ${escapeHTML(item.enrollment_status || "Inscrit")}
          </span>
        </div>
      `).join("")
    );

    const courseIds = courses.map((item) => item.course_id);

    const { data: modules, error: modulesError } = await db
      .from("academy_modules")
      .select("id, course_id, title, position")
      .in("course_id", courseIds)
      .order("position");

    if (modulesError) {
      console.error("Erreur modules Academy :", modulesError);
      setContent(targets.progress, '<p class="atp-dashboard-muted">Impossible de charger les modules.</p>');
      setContent(targets.courses, '<p class="atp-dashboard-muted">Impossible de charger les cours.</p>');
      setContent(targets.evaluations, '<p class="atp-dashboard-muted">Évaluations indisponibles.</p>');
      setContent(targets.certificates, '<p class="atp-dashboard-muted">Aucune attestation disponible.</p>');
      return;
    }

    const moduleRows = modules || [];
    const moduleIds = moduleRows.map((module) => module.id);

    if (!moduleIds.length) {
      setContent(targets.progress, '<p class="atp-dashboard-muted">Les modules de tes formations ne sont pas encore disponibles.</p>');
      setContent(targets.courses, '<p class="atp-dashboard-muted">Les cours seront affichés dès que les modules seront disponibles.</p>');
      setContent(targets.evaluations, '<p class="atp-dashboard-muted">Aucun quiz disponible pour le moment.</p>');
      setContent(targets.certificates, '<p class="atp-dashboard-muted">Aucune attestation disponible.</p>');
      return;
    }

    const { data: lessons, error: lessonsError } = await db
      .from("academy_lessons")
      .select("id, module_id, title, position")
      .in("module_id", moduleIds)
      .order("position");

    if (lessonsError) {
      console.error("Erreur leçons Academy :", lessonsError);
      setContent(targets.progress, '<p class="atp-dashboard-muted">Impossible de calculer la progression.</p>');
      setContent(targets.courses, '<p class="atp-dashboard-muted">Impossible de charger les leçons.</p>');
      setContent(targets.evaluations, '<p class="atp-dashboard-muted">Évaluations indisponibles.</p>');
      setContent(targets.certificates, '<p class="atp-dashboard-muted">Aucune attestation disponible.</p>');
      return;
    }

    const lessonRows = lessons || [];
    const lessonIds = lessonRows.map((lesson) => lesson.id);

    let progressRows = [];
    let quizRows = [];

    if (lessonIds.length) {
      const [progressResult, quizResult] = await Promise.all([
        db.from("academy_lesson_progress")
          .select("lesson_id, is_completed")
          .eq("member_id", user.id)
          .in("lesson_id", lessonIds),

        db.from("academy_quizzes")
          .select("id, lesson_id, question, position")
          .in("lesson_id", lessonIds)
          .order("position")
      ]);

      if (progressResult.error) {
        console.error("Erreur progression Academy :", progressResult.error);
      } else {
        progressRows = progressResult.data || [];
      }

      if (quizResult.error) {
        console.error("Erreur quiz Academy :", quizResult.error);
      } else {
        quizRows = quizResult.data || [];
      }
    }

    const completedIds = new Set(
      progressRows
        .filter((item) => item.is_completed)
        .map((item) => item.lesson_id)
    );

    const moduleById = new Map(
      moduleRows.map((module) => [module.id, module])
    );

    const courseStats = courses.map((enrollment) => {
      const courseModules = moduleRows.filter(
        (module) => module.course_id === enrollment.course_id
      );

      const moduleIdSet = new Set(courseModules.map((module) => module.id));

      const courseLessons = lessonRows.filter((lesson) =>
        moduleIdSet.has(lesson.module_id)
      );

      const completed = courseLessons.filter((lesson) =>
        completedIds.has(lesson.id)
      ).length;

      const total = courseLessons.length;
      const percent = total
        ? Math.round((completed / total) * 100)
        : 0;

      return {
        title: enrollment.course.title,
        courseId: enrollment.course_id,
        modules: courseModules,
        lessons: courseLessons,
        completed,
        total,
        percent
      };
    });

    const totalLessons = courseStats.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const totalCompleted = courseStats.reduce(
      (sum, item) => sum + item.completed,
      0
    );

    const globalPercent = totalLessons
      ? Math.round((totalCompleted / totalLessons) * 100)
      : 0;

    // ONGLET MA PROGRESSION
    setContent(targets.progress, `
      <div class="atp-dashboard-item">
        <strong>Progression générale : ${globalPercent} %</strong>
        <div class="atp-progress-track">
          <div class="atp-progress-fill" style="width:${globalPercent}%"></div>
        </div>
        <small class="atp-dashboard-muted">
          ${totalCompleted} leçon(s) terminée(s) sur ${totalLessons}
        </small>
      </div>

      ${courseStats.map((item) => `
        <div class="atp-dashboard-item">
          <strong>${escapeHTML(item.title)}</strong>
          <div class="atp-progress-track">
            <div class="atp-progress-fill" style="width:${item.percent}%"></div>
          </div>
          <small class="atp-dashboard-muted">
            ${item.completed}/${item.total} leçon(s) terminée(s) · ${item.percent} %
          </small>
        </div>
      `).join("")}
    `);

    // ONGLET MES COURS : APERÇU DES MODULES ET LEÇONS
    const coursePreview = courseStats.map((course) => `
      <div class="atp-dashboard-item">
        <strong>${escapeHTML(course.title)}</strong>
        <small class="atp-dashboard-muted">
          ${course.modules.length} module(s) · ${course.total} leçon(s)
        </small>

        ${course.modules.map((module) => {
          const moduleLessons = course.lessons.filter(
            (lesson) => lesson.module_id === module.id
          );

          return `
            <div class="atp-course-preview">
              <h4>${escapeHTML(module.title)}</h4>

              ${moduleLessons.length
                ? moduleLessons.map((lesson) => {
                    const done = completedIds.has(lesson.id);

                    return `
                      <div class="atp-dashboard-item">
                        <small class="atp-dashboard-muted">
                          ${escapeHTML(lesson.title)}
                        </small>
                        <span class="atp-dashboard-tag">
                          ${done ? "Terminée ✓" : "À suivre"}
                        </span>
                      </div>
                    `;
                  }).join("")
                : '<small class="atp-dashboard-muted">Aucune leçon dans ce module pour le moment.</small>'
              }
            </div>
          `;
        }).join("")}
      </div>
    `).join("");

    setContent(
      targets.courses,
      coursePreview || '<p class="atp-dashboard-muted">Aucun cours disponible.</p>'
    );

    // ONGLET MES ÉVALUATIONS
    setContent(
      targets.evaluations,
      quizRows.length
        ? `
          <div class="atp-dashboard-item">
            <strong>${quizRows.length} question(s) de quiz disponible(s)</strong>
            <small class="atp-dashboard-muted">
              Les quiz sont accessibles depuis les leçons de tes formations.
            </small>
          </div>
          <p class="atp-dashboard-muted">
            L'historique des tentatives et les résultats détaillés ne sont pas encore enregistrés.
          </p>
        `
        : '<p class="atp-dashboard-muted">Aucun quiz disponible pour le moment.</p>'
    );

    // ONGLET MES ATTESTATIONS
    setContent(
      targets.certificates,
      `
        <p class="atp-dashboard-muted">
          Aucune attestation n'a encore été délivrée.
        </p>
        <p class="atp-dashboard-muted">
          Les attestations seront affichées ici après validation des conditions de réussite.
        </p>
      `
    );

    const status = $("academy-dashboard-status");

    if (status) {
      status.textContent =
        `Tu suis ${courses.length} formation(s) et tu as terminé ${totalCompleted} leçon(s) sur ${totalLessons}. Progression générale : ${globalPercent} %.`;
    }
  }

  async function showMember(user) {
    if (!user) return;

    if (currentUserId === user.id && loadingUserId === user.id) return;

    if (currentUserId === user.id && !loadingUserId) {
      const dashboard = $("academy-dashboard");
      if (dashboard) dashboard.hidden = false;
      return;
    }

    currentUserId = user.id;
    loadingUserId = user.id;

    const access = $("atp-academy-access");
    if (access) access.hidden = true;

    const dashboard = $("academy-dashboard");
    if (dashboard) dashboard.hidden = false;

    const targets = getDashboardTargets();

    if (targets) {
      setAllTargets(targets, "Chargement de ton espace...");
    }

    const { data: profile, error } = await db
      .from("profiles")
      .select("nom, prenom, membership_plan, membership_status, user_role")
      .eq("id", user.id)
      .maybeSingle();

    if (error) console.error("Erreur profil membre :", error);

    if (currentUserId !== user.id) return;

    const profileName = [profile?.prenom, profile?.nom]
      .filter(Boolean)
      .join(" ");

    const metadataName = [
      user.user_metadata?.prenom,
      user.user_metadata?.nom
    ].filter(Boolean).join(" ");

    const fullName = profileName || metadataName || user.email || "Membre";

    const dashboardSection = $("academy-dashboard");

    if (dashboardSection && !$("atp-academy-member-info")) {
      const info = document.createElement("div");
      info.id = "atp-academy-member-info";

      info.innerHTML = `
        <div>
          <strong id="atp-academy-member-name"></strong>
          <div class="atp-dashboard-muted">
            Connecté à AFRIQUE TECH PLUS ACADEMY
          </div>
        </div>
        <button type="button" id="atp-academy-logout">
          Se déconnecter
        </button>
      `;

      const heading = dashboardSection.querySelector(".section-heading");
      if (heading) heading.after(info);
      else dashboardSection.prepend(info);

      $("atp-academy-logout").addEventListener("click", async () => {
        const { error: logoutError } = await db.auth.signOut();

        if (logoutError) {
          console.error("Erreur déconnexion :", logoutError);
        }
      });
    }

    if ($("atp-academy-member-name")) {
      $("atp-academy-member-name").textContent =
        `Bienvenue, ${fullName} !`;
    }

    await loadAcademyData(user);

    if (currentUserId === user.id) {
      loadingUserId = null;
    }
  }

  async function initialize() {
    addStyles();
    createAuthPanel();

    const dashboard = $("academy-dashboard");
    if (dashboard) dashboard.hidden = true;

    const { data, error } = await db.auth.getSession();

    if (error) {
      console.error("Erreur session :", error);
    }

    if (data?.session?.user) {
      await showMember(data.session.user);
    } else {
      showDisconnected();
    }

    db.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        if (session.user.id !== currentUserId) {
          showMember(session.user);
        }
      } else {
        showDisconnected();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
