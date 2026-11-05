(() => {
  "use strict";

  const config = window.ATP_CONFIG;

  if (!window.supabase || !config?.supabaseUrl || !config?.supabasePublishableKey) {
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
    if ($("atp-dashboard-styles")) return;

    const style = document.createElement("style");
    style.id = "atp-dashboard-styles";
    style.textContent = `
      #atp-dashboard-content {
        width: 100%;
        margin-top: 28px;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 20px;
      }

      .atp-dashboard-card {
        background: var(--card, #fff);
        border: 1px solid rgba(100,116,139,.18);
        border-radius: 18px;
        padding: 22px;
        min-width: 0;
        box-shadow: 0 8px 25px rgba(15,23,42,.05);
      }

      .atp-dashboard-card h3 {
        margin: 0 0 16px;
        font-size: 19px;
      }

      .atp-dashboard-muted {
        color: #64748b;
        font-size: 14px;
        line-height: 1.6;
      }

      .atp-dashboard-item {
        padding: 13px 0;
        border-bottom: 1px solid rgba(100,116,139,.15);
      }

      .atp-dashboard-item:last-child {
        border-bottom: 0;
      }

      .atp-dashboard-item strong {
        display: block;
        margin-bottom: 5px;
      }

      .atp-dashboard-item small {
        color: #64748b;
        line-height: 1.5;
      }

      .atp-progress-track {
        height: 9px;
        background: #e2e8f0;
        border-radius: 20px;
        overflow: hidden;
        margin: 10px 0 6px;
      }

      .atp-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #2563eb, #14b8a6);
        border-radius: 20px;
        transition: width .3s ease;
      }

      .atp-dashboard-tag {
        display: inline-block;
        padding: 4px 9px;
        border-radius: 20px;
        background: #eff6ff;
        color: #1d4ed8;
        font-size: 12px;
        font-weight: 700;
      }

      @media(max-width:700px) {
        #atp-dashboard-content {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function prepareDashboard() {
    const dashboard = $("member-dashboard");
    if (!dashboard) {
      console.error("AFRIQUE TECH PLUS : section member-dashboard introuvable.");
      return false;
    }

    if (!$("atp-dashboard-content")) {
      const container = document.createElement("div");
      container.id = "atp-dashboard-content";

      container.innerHTML = `
        <section class="atp-dashboard-card">
          <h3>🎓 Mes formations</h3>
          <div id="academy-enrollments">
            <p class="atp-dashboard-muted">Chargement...</p>
          </div>
        </section>

        <section class="atp-dashboard-card">
          <h3>📈 Ma progression</h3>
          <div id="academy-progress">
            <p class="atp-dashboard-muted">Chargement...</p>
          </div>
        </section>

        <section class="atp-dashboard-card">
          <h3>📚 Mes cours</h3>
          <div id="academy-courses-list">
            <p class="atp-dashboard-muted">Chargement...</p>
          </div>
        </section>

        <section class="atp-dashboard-card">
          <h3>📝 Mes évaluations</h3>
          <div id="academy-evaluations">
            <p class="atp-dashboard-muted">Chargement...</p>
          </div>
        </section>

        <section class="atp-dashboard-card">
          <h3>🏆 Mes attestations</h3>
          <div id="academy-certificates">
            <p class="atp-dashboard-muted">Chargement...</p>
          </div>
        </section>
      `;

      dashboard.querySelector(".container")?.appendChild(container);
    }

    return true;
  }

  function setContent(id, html) {
    const element = $(id);
    if (element) element.innerHTML = html;
  }

  function showDisconnected() {
    currentUserId = null;
    loadingUserId = null;

    const dashboard = $("member-dashboard");
    if (dashboard) dashboard.hidden = true;

    const bar = $("atp-member-bar");
    if (bar) bar.remove();
  }

  async function loadAcademyData(user) {
    if (!prepareDashboard()) return;

    const ids = [
      "academy-enrollments",
      "academy-progress",
      "academy-courses-list",
      "academy-evaluations",
      "academy-certificates"
    ];

    ids.forEach((id) =>
      setContent(id, '<p class="atp-dashboard-muted">Chargement des données...</p>')
    );

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
      ids.forEach((id) =>
        setContent(id, '<p class="atp-dashboard-muted">Impossible de charger ces informations. Réessaie plus tard.</p>')
      );
      return;
    }

    const courses = (enrollments || []).map((enrollment) => {
      const course = Array.isArray(enrollment.academy_courses)
        ? enrollment.academy_courses[0]
        : enrollment.academy_courses;

      return { ...enrollment, course };
    }).filter((item) => item.course);

    if (!courses.length) {
      setContent("academy-enrollments",
        '<p class="atp-dashboard-muted">Tu n’es inscrit à aucune formation pour le moment.</p>'
      );
      setContent("academy-progress",
        '<p class="atp-dashboard-muted">Ta progression apparaîtra après ton inscription à une formation et la réalisation de tes leçons.</p>'
      );
      setContent("academy-courses-list",
        '<p class="atp-dashboard-muted">Inscris-toi à une formation pour retrouver tes cours ici.</p>'
      );
      setContent("academy-evaluations",
        '<p class="atp-dashboard-muted">Les évaluations de tes formations apparaîtront ici.</p>'
      );
      setContent("academy-certificates",
        '<p class="atp-dashboard-muted">Aucune attestation disponible pour le moment.</p>'
      );
      return;
    }

    const courseIds = courses.map((item) => item.course_id);

    setContent("academy-enrollments", courses.map((item) => `
      <div class="atp-dashboard-item">
        <strong>${escapeHTML(item.course.title)}</strong>
        <small>${escapeHTML(item.course.description || "Formation AFRIQUE TECH PLUS")}</small>
        <p><span class="atp-dashboard-tag">${escapeHTML(item.enrollment_status || "Inscrit")}</span></p>
      </div>
    `).join(""));

    const { data: modules, error: modulesError } = await db
      .from("academy_modules")
      .select("id, course_id, title, position")
      .in("course_id", courseIds)
      .order("position");

    if (modulesError) {
      console.error("Erreur modules Academy :", modulesError);
      setContent("academy-progress",
        '<p class="atp-dashboard-muted">Impossible de récupérer les modules pour calculer ta progression.</p>'
      );
      setContent("academy-courses-list",
        '<p class="atp-dashboard-muted">Impossible de charger les cours pour le moment.</p>'
      );
      setContent("academy-evaluations",
        '<p class="atp-dashboard-muted">Les données des évaluations ne sont pas disponibles.</p>'
      );
      setContent("academy-certificates",
        '<p class="atp-dashboard-muted">Aucune attestation disponible pour le moment.</p>'
      );
      return;
    }

    const moduleIds = (modules || []).map((module) => module.id);

    if (!moduleIds.length) {
      setContent("academy-progress",
        '<p class="atp-dashboard-muted">Les modules de tes formations ne sont pas encore disponibles.</p>'
      );
      setContent("academy-courses-list",
        '<p class="atp-dashboard-muted">Aucun cours disponible pour le moment.</p>'
      );
      setContent("academy-evaluations",
        '<p class="atp-dashboard-muted">Aucun quiz disponible pour le moment.</p>'
      );
      setContent("academy-certificates",
        '<p class="atp-dashboard-muted">Aucune attestation disponible pour le moment.</p>'
      );
      return;
    }

    const { data: lessons, error: lessonsError } = await db
      .from("academy_lessons")
      .select("id, module_id, title, position")
      .in("module_id", moduleIds)
      .order("position");

    if (lessonsError) {
      console.error("Erreur leçons Academy :", lessonsError);
      setContent("academy-progress",
        '<p class="atp-dashboard-muted">Impossible de charger les leçons pour calculer ta progression.</p>'
      );
      setContent("academy-courses-list",
        '<p class="atp-dashboard-muted">Impossible de charger les cours pour le moment.</p>'
      );
      setContent("academy-evaluations",
        '<p class="atp-dashboard-muted">Les évaluations ne sont pas disponibles.</p>'
      );
      setContent("academy-certificates",
        '<p class="atp-dashboard-muted">Aucune attestation disponible pour le moment.</p>'
      );
      return;
    }

    const allLessons = lessons || [];
    const lessonIds = allLessons.map((lesson) => lesson.id);

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

    const courseStats = courses.map((enrollment) => {
      const courseModules = (modules || []).filter(
        (module) => module.course_id === enrollment.course_id
      );
      const ids = new Set(courseModules.map((module) => module.id));
      const courseLessons = allLessons.filter((lesson) =>
        ids.has(lesson.module_id)
      );
      const completed = courseLessons.filter((lesson) =>
        completedIds.has(lesson.id)
      ).length;

      const total = courseLessons.length;
      const percent = total ? Math.round((completed / total) * 100) : 0;

      return {
        title: enrollment.course.title,
        modules: courseModules,
        lessons: courseLessons,
        completed,
        total,
        percent
      };
    });

    const totalLessons = courseStats.reduce((sum, item) => sum + item.total, 0);
    const totalCompleted = courseStats.reduce((sum, item) => sum + item.completed, 0);
    const globalPercent = totalLessons
      ? Math.round((totalCompleted / totalLessons) * 100)
      : 0;

    setContent("academy-progress", `
      <div class="atp-dashboard-item">
        <strong>Progression générale : ${globalPercent} %</strong>
        <div class="atp-progress-track">
          <div class="atp-progress-fill" style="width:${globalPercent}%"></div>
        </div>
        <small>${totalCompleted} leçon(s) terminée(s) sur ${totalLessons}</small>
      </div>
      ${courseStats.map((item) => `
        <div class="atp-dashboard-item">
          <strong>${escapeHTML(item.title)}</strong>
          <div class="atp-progress-track">
            <div class="atp-progress-fill" style="width:${item.percent}%"></div>
          </div>
          <small>${item.completed}/${item.total} leçon(s) · ${item.percent} %</small>
        </div>
      `).join("")}
    `);

    const lessonCourseMap = new Map();
    courseStats.forEach((course) => {
      course.lessons.forEach((lesson) => {
        lessonCourseMap.set(lesson.id, course.title);
      });
    });

    setContent("academy-courses-list",
      allLessons.length
        ? allLessons.map((lesson) => {
            const done = completedIds.has(lesson.id);
            const module = (modules || []).find(
              (item) => item.id === lesson.module_id
            );

            return `
              <div class="atp-dashboard-item">
                <strong>${escapeHTML(lesson.title)}</strong>
                <small>
                  ${escapeHTML(lessonCourseMap.get(lesson.id) || "")}
                  ${module ? " · " + escapeHTML(module.title) : ""}
                </small>
                <p>
                  <span class="atp-dashboard-tag">
                    ${done ? "Leçon terminée ✓" : "À suivre"}
                  </span>
                </p>
              </div>
            `;
          }).join("")
        : '<p class="atp-dashboard-muted">Aucune leçon disponible dans tes formations.</p>'
    );

    setContent("academy-evaluations",
      quizRows.length
        ? `
          <p class="atp-dashboard-muted">${quizRows.length} question(s) de quiz disponible(s) dans tes formations.</p>
          <p class="atp-dashboard-muted">Les résultats et l'historique de tes tentatives ne sont pas encore enregistrés dans un tableau dédié.</p>
        `
        : '<p class="atp-dashboard-muted">Aucun quiz disponible dans tes formations pour le moment.</p>'
    );

    setContent("academy-certificates",
      `
        <p class="atp-dashboard-muted">Aucune attestation n'a encore été délivrée.</p>
        <p class="atp-dashboard-muted">Le système de validation et de délivrance des attestations reste à mettre en place.</p>
      `
    );
  }

  async function showMember(user) {
    if (!user || currentUserId === user.id || loadingUserId === user.id) return;

    currentUserId = user.id;
    loadingUserId = user.id;

    const dashboard = $("member-dashboard");
    if (dashboard) dashboard.hidden = false;

    addStyles();
    prepareDashboard();

    const { data: profile, error } = await db
      .from("profiles")
      .select("nom, prenom, membership_plan, membership_status, user_role")
      .eq("id", user.id)
      .maybeSingle();

    if (error) console.error("Erreur profil membre :", error);

    if (currentUserId !== user.id) return;

    const fullName = [profile?.prenom, profile?.nom]
      .filter(Boolean)
      .join(" ") || user.email || "Membre";

    if ($("dashboard-greeting")) {
      $("dashboard-greeting").textContent = `Bienvenue, ${fullName} !`;
    }

    if ($("profile-name")) $("profile-name").textContent = fullName;
    if ($("profile-email")) $("profile-email").textContent = user.email || "Non renseigné";

    let bar = $("atp-member-bar");

    if (!bar) {
      bar = document.createElement("div");
      bar.id = "atp-member-bar";
      bar.style.cssText = `
        background:#10152f;
        color:white;
        padding:12px 20px;
        text-align:center;
        font-size:14px;
      `;

      document.querySelector(".site-header")?.after(bar);
    }

    bar.innerHTML = `
      Connecté : <strong>${escapeHTML(fullName)}</strong>
      · ${escapeHTML(profile?.membership_plan || "free").toUpperCase()}
      <button id="atp-logout-button" type="button"
        style="margin-left:12px;padding:6px 12px;border:1px solid #64748b;border-radius:8px;background:transparent;color:white;cursor:pointer">
        Se déconnecter
      </button>
    `;

    $("atp-logout-button")?.addEventListener("click", async () => {
      const { error: logoutError } = await db.auth.signOut();
      if (logoutError) console.error("Erreur déconnexion :", logoutError);
    });

    $("menu-logout")?.addEventListener("click", async () => {
      await db.auth.signOut();
    });

    await loadAcademyData(user);

    if (currentUserId === user.id) loadingUserId = null;
  }

  db.auth.getSession().then(({ data, error }) => {
    if (error) console.error("Erreur session :", error);

    if (data?.session?.user) {
      showMember(data.session.user);
    } else {
      showDisconnected();
    }
  });

  db.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      if (session.user.id !== currentUserId) {
        showMember(session.user);
      }
    } else {
      showDisconnected();
    }
  });

})();
