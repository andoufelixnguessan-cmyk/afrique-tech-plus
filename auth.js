(() => {
  "use strict";

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

  const header = document.querySelector("header");

  if (!header) return;

  // Éviter de créer deux barres membres si le script est chargé deux fois.
  if (document.querySelector(".atp-member-bar")) return;

  const style = document.createElement("style");

  style.textContent = `
    .atp-member-bar {
      display:flex;
      align-items:center;
      justify-content:space-between;
      flex-wrap:wrap;
      gap:12px;
      padding:12px 7%;
      background:#19213d;
      color:#fff;
      font:14px Arial,sans-serif;
      border-bottom:1px solid rgba(255,255,255,.12);
    }

    .atp-member-info {
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      gap:10px;
    }

    .atp-member-bar a,
    .atp-member-bar button {
      color:#fff;
      background:transparent;
      border:1px solid rgba(255,255,255,.3);
      border-radius:20px;
      padding:8px 14px;
      text-decoration:none;
      cursor:pointer;
      font:inherit;
    }

    .atp-member-plan {
      color:#c8fa72;
      font-weight:bold;
    }

    .atp-dashboard-content {
      width:min(1100px,92%);
      margin:30px auto;
      color:inherit;
    }

    .atp-dashboard-content h2 {
      margin-bottom:8px;
    }

    .atp-dashboard-status {
      margin-bottom:22px;
      opacity:.8;
    }

    .atp-dashboard-grid {
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:18px;
    }

    .atp-dashboard-card {
      background:#171e3d;
      color:#fff;
      border:1px solid rgba(255,255,255,.12);
      border-radius:14px;
      padding:20px;
      min-width:0;
    }

    .atp-dashboard-card h3 {
      margin:0 0 16px;
      font-size:18px;
    }

    .atp-academy-course {
      background:rgba(255,255,255,.05);
      border:1px solid rgba(255,255,255,.1);
      border-radius:10px;
      padding:14px;
      margin-bottom:12px;
    }

    .atp-academy-course h4 {
      margin:0 0 8px;
      font-size:15px;
    }

    .atp-academy-muted {
      color:#c0c8df;
      font-size:13px;
      line-height:1.6;
    }

    .atp-academy-progress {
      height:9px;
      background:rgba(255,255,255,.12);
      border-radius:20px;
      overflow:hidden;
      margin-top:10px;
    }

    .atp-academy-progress-fill {
      height:100%;
      background:#7c5cff;
      border-radius:20px;
      transition:width .3s ease;
    }

    .atp-dashboard-empty {
      color:#c0c8df;
      font-size:13px;
      line-height:1.7;
    }

    .atp-dashboard-link {
      display:inline-block;
      margin-top:10px;
      color:#c8fa72;
      font-size:13px;
      font-weight:bold;
      text-decoration:none;
    }

    @media(max-width:650px) {
      .atp-member-bar {
        padding:12px 5%;
      }

      .atp-dashboard-grid {
        grid-template-columns:1fr;
      }
    }
  `;

  document.head.appendChild(style);

  const bar = document.createElement("div");
  bar.className = "atp-member-bar";
  header.after(bar);

  let currentUserId = null;
  let loadingUserId = null;

  function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;

    return element;
  }

  function showDisconnected() {
    currentUserId = null;
    loadingUserId = null;

    bar.replaceChildren();

    const message = createElement(
      "span",
      "",
      "Tu n'es pas connecté à AFRIQUE TECH PLUS."
    );

    const link = createElement("a", "", "Se connecter");
    link.href = "index.html#account";

    bar.append(message, link);
  }

  function prepareDashboard() {
    let dashboard =
      document.getElementById("member-dashboard") ||
      document.getElementById("academy-dashboard");

    if (!dashboard) {
      dashboard = createElement("section");
      dashboard.id = "academy-dashboard";
      dashboard.className = "atp-dashboard-content";
      dashboard.hidden = true;
      bar.after(dashboard);
    }

    let content = document.getElementById(
      "atp-dashboard-content"
    );

    if (!content) {
      content = createElement(
        "div",
        "atp-dashboard-content"
      );

      content.id = "atp-dashboard-content";

      const heading = createElement(
        "h2",
        "",
        "Mon espace de formation"
      );

      const status = createElement(
        "p",
        "atp-dashboard-status",
        "Chargement de ton espace..."
      );

      status.id = "academy-dashboard-status";

      const grid = createElement(
        "div",
        "atp-dashboard-grid"
      );

      const sections = [
        {
          title: "📚 Mes cours",
          id: "academy-enrollments"
        },
        {
          title: "📈 Ma progression",
          id: "academy-progress"
        },
        {
          title: "📝 Mes évaluations",
          id: "academy-evaluations"
        },
        {
          title: "🏆 Mes attestations",
          id: "academy-certificates"
        }
      ];

      sections.forEach((section) => {
        const card = createElement(
          "article",
          "atp-dashboard-card"
        );

        const title = createElement(
          "h3",
          "",
          section.title
        );

        const body = createElement("div");
        body.id = section.id;

        card.append(title, body);
        grid.appendChild(card);
      });

      content.append(heading, status, grid);
      dashboard.appendChild(content);
    }

    return dashboard;
  }

  function renderCourse(enrollment) {
    const course = enrollment.academy_courses;
    const title = course?.title || "Formation sans titre";

    const card = createElement(
      "article",
      "atp-academy-course"
    );

    const heading = createElement("h4", "", title);

    const description = createElement(
      "p",
      "atp-academy-muted",
      course?.description || "Aucune description disponible."
    );

    const status = createElement(
      "p",
      "atp-academy-muted",
      "Statut : " + (enrollment.enrollment_status || "Inscrit")
    );

    card.append(heading, description, status);

    if (course?.slug) {
      const link = createElement(
        "a",
        "atp-dashboard-link",
        "Continuer la formation →"
      );

      link.href = "academy.html";
      card.appendChild(link);
    }

    return card;
  }

  function renderProgress(enrollment) {
    const course = enrollment.academy_courses;
    const title = course?.title || "Formation sans titre";

    const progress = Math.min(
      100,
      Math.max(0, Number(enrollment.progress_percent) || 0)
    );

    const card = createElement(
      "article",
      "atp-academy-course"
    );

    const heading = createElement("h4", "", title);

    const percentage = createElement(
      "p",
      "atp-academy-muted",
      progress + " % terminé"
    );

    const progressBar = createElement(
      "div",
      "atp-academy-progress"
    );

    const fill = createElement(
      "div",
      "atp-academy-progress-fill"
    );

    fill.style.width = progress + "%";

    progressBar.appendChild(fill);
    card.append(heading, percentage, progressBar);

    return card;
  }

  async function loadAcademyData(user) {
    const enrollmentsContainer =
      document.getElementById("academy-enrollments");

    const progressContainer =
      document.getElementById("academy-progress");

    const statusContainer =
      document.getElementById("academy-dashboard-status");

    const evaluationsContainer =
      document.getElementById("academy-evaluations");

    const certificatesContainer =
      document.getElementById("academy-certificates");

    if (!enrollmentsContainer || !user) return;

    enrollmentsContainer.textContent =
      "Chargement de tes formations...";

    progressContainer.textContent =
      "Chargement de ta progression...";

    const { data, error } = await client
      .from("academy_enrollments")
      .select(`
        id,
        enrolled_at,
        enrollment_status,
        progress_percent,
        academy_courses (
          title,
          description,
          modules_count,
          slug
        )
      `)
      .eq("member_id", user.id)
      .order("enrolled_at", { ascending: false });

    if (currentUserId !== user.id) return;

    if (error) {
      console.error("Erreur de chargement Academy :", error);

      enrollmentsContainer.textContent =
        "Impossible de charger tes formations.";

      progressContainer.textContent =
        "Progression indisponible.";

      statusContainer.textContent =
        "Une erreur est survenue pendant le chargement.";

      return;
    }

    enrollmentsContainer.replaceChildren();
    progressContainer.replaceChildren();

    if (!data || data.length === 0) {
      enrollmentsContainer.textContent =
        "Tu n'es inscrit à aucune formation pour le moment.";

      progressContainer.textContent =
        "Ta progression apparaîtra après ton inscription.";

      statusContainer.textContent =
        "Découvre le catalogue Academy pour commencer ton parcours.";

    } else {
      let totalProgress = 0;

      data.forEach((enrollment) => {
        const progress = Math.min(
          100,
          Math.max(
            0,
            Number(enrollment.progress_percent) || 0
          )
        );

        totalProgress += progress;

        enrollmentsContainer.appendChild(
          renderCourse(enrollment)
        );

        progressContainer.appendChild(
          renderProgress(enrollment)
        );
      });

      const average = Math.round(
        totalProgress / data.length
      );

      statusContainer.textContent =
        data.length +
        " formation(s) suivie(s) · " +
        average +
        " % de progression moyenne.";
    }

    // Ces historiques nécessitent encore leurs tables sécurisées.
    evaluationsContainer.textContent =
      "L'historique des évaluations sera affiché ici dès que son enregistrement sécurisé sera activé.";

    certificatesContainer.textContent =
      "Tes attestations apparaîtront ici après la mise en place du système de délivrance et lorsque tu rempliras les conditions requises.";
  }

  async function showMember(user) {
    if (!user) {
      showDisconnected();
      return;
    }

    currentUserId = user.id;

    const dashboard = prepareDashboard();

    if (loadingUserId === user.id) return;
    loadingUserId = user.id;

    const { data: profile, error } = await client
      .from("profiles")
      .select(
        "nom, prenom, membership_plan, membership_status, user_role"
      )
      .eq("id", user.id)
      .single();

    if (currentUserId !== user.id) return;

    if (error || !profile) {
      console.error("Erreur de chargement du profil :", error);
      bar.textContent = "Impossible de charger ton profil membre.";
      loadingUserId = null;
      return;
    }

    const name = [
      profile.prenom,
      profile.nom
    ].filter(Boolean).join(" ") || user.email;

    const plan = profile.membership_plan || "free";
    const role = profile.user_role || "member";
    const status = profile.membership_status || "active";

    bar.replaceChildren();

    const info = createElement(
      "div",
      "atp-member-info"
    );

    const identity = createElement(
      "span",
      "",
      "Connecté : " + name
    );

    const membership = createElement(
      "span",
      "atp-member-plan",
      plan.toUpperCase() +
        " · " +
        (status === "active" ? "ACTIF" : "INACTIF")
    );

    info.append(identity, membership);

    if (role === "admin") {
      info.appendChild(
        createElement("strong", "", "ADMINISTRATEUR")
      );
    }

    const accountLink = createElement(
      "a",
      "",
      "Mon espace"
    );

    accountLink.href = "#";

    accountLink.addEventListener("click", (event) => {
      event.preventDefault();

      dashboard.hidden = false;

      dashboard.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    const logout = createElement(
      "button",
      "",
      "Déconnexion"
    );

    logout.type = "button";

    logout.addEventListener("click", async () => {
      logout.disabled = true;

      const { error: logoutError } =
        await client.auth.signOut();

      if (logoutError) {
        logout.disabled = false;
        alert("La déconnexion a échoué. Réessaie.");
        return;
      }

      window.location.href = "index.html";
    });

    bar.append(info, accountLink, logout);

    try {
      await loadAcademyData(user);
    } finally {
      if (loadingUserId === user.id) {
        loadingUserId = null;
      }
    }
  }

  client.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error("Erreur de session :", error);
      showDisconnected();
      return;
    }

    showMember(data.session?.user || null);
  });

  client.auth.onAuthStateChange((_event, session) => {
    showMember(session?.user || null);
  });

})();
