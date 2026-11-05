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

  const style = document.createElement("style");

  style.textContent = `
    .atp-member-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding: 12px 7%;
      background: #19213d;
      color: #fff;
      font: 14px Arial, sans-serif;
      border-bottom: 1px solid rgba(255,255,255,.12);
    }

    .atp-member-info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
    }

    .atp-member-bar a,
    .atp-member-bar button {
      color: #fff;
      background: transparent;
      border: 1px solid rgba(255,255,255,.3);
      border-radius: 20px;
      padding: 8px 14px;
      text-decoration: none;
      cursor: pointer;
      font: inherit;
    }

    .atp-member-bar button:hover,
    .atp-member-bar a:hover {
      border-color: #49d4df;
    }

    .atp-member-plan {
      color: #c8fa72;
      font-weight: bold;
    }

    .atp-academy-course {
      background: #171e3d;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
    }

    .atp-academy-course h4 {
      margin-bottom: 8px;
    }

    .atp-academy-progress {
      height: 9px;
      background: rgba(255,255,255,.12);
      border-radius: 20px;
      overflow: hidden;
      margin-top: 10px;
    }

    .atp-academy-progress-fill {
      height: 100%;
      background: #7c5cff;
      border-radius: 20px;
    }

    .atp-academy-muted {
      color: #c0c8df;
      font-size: 13px;
    }

    @media(max-width:600px) {
      .atp-member-bar {
        padding: 12px 5%;
      }
    }
  `;

  document.head.appendChild(style);

  const bar = document.createElement("div");
  bar.className = "atp-member-bar";
  header.after(bar);

  function showDisconnected() {
    bar.innerHTML = `
      <span>Tu n'es pas connecté à AFRIQUE TECH PLUS.</span>
      <a href="index.html#account">Se connecter</a>
    `;
  }

  async function loadAcademyData(user) {
    const enrollmentsContainer =
      document.getElementById("academy-enrollments");

    const progressContainer =
      document.getElementById("academy-progress");

    const statusContainer =
      document.getElementById("academy-dashboard-status");

    if (!enrollmentsContainer || !user) return;

    enrollmentsContainer.textContent =
      "Chargement de tes formations...";

    if (progressContainer) {
      progressContainer.textContent =
        "Chargement de ta progression...";
    }

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

    if (error) {
      console.error("Erreur Academy :", error);

      enrollmentsContainer.textContent =
        "Impossible de charger tes formations pour le moment.";

      if (progressContainer) {
        progressContainer.textContent =
          "Progression indisponible.";
      }

      return;
    }

    enrollmentsContainer.replaceChildren();

    if (progressContainer) {
      progressContainer.replaceChildren();
    }

    if (!data || data.length === 0) {
      enrollmentsContainer.textContent =
        "Tu n'es inscrit à aucune formation pour le moment.";

      if (progressContainer) {
        progressContainer.textContent =
          "Ta progression apparaîtra après ton inscription à une formation.";
      }

      if (statusContainer) {
        statusContainer.textContent =
          "Découvre le catalogue pour commencer ton parcours.";
      }

      return;
    }

    let totalProgress = 0;

    data.forEach((enrollment) => {
      const course = enrollment.academy_courses;

      const title = course?.title || "Formation sans titre";
      const progress = Number(enrollment.progress_percent) || 0;

      totalProgress += progress;

      const card = document.createElement("article");
      card.className = "atp-academy-course";

      const heading = document.createElement("h4");
      heading.textContent = title;

      const description = document.createElement("p");
      description.className = "atp-academy-muted";
      description.textContent =
        course?.description || "Aucune description disponible.";

      const details = document.createElement("p");
      details.className = "atp-academy-muted";
      details.textContent =
        "Statut : " + enrollment.enrollment_status;

      card.append(heading, description, details);
      enrollmentsContainer.appendChild(card);

      if (progressContainer) {
        const progressCard = document.createElement("div");
        progressCard.className = "atp-academy-course";

        const progressTitle = document.createElement("h4");
        progressTitle.textContent = title;

        const progressText = document.createElement("p");
        progressText.className = "atp-academy-muted";
        progressText.textContent = progress + " % terminé";

        const progressBar = document.createElement("div");
        progressBar.className = "atp-academy-progress";

        const progressFill = document.createElement("div");
        progressFill.className = "atp-academy-progress-fill";
        progressFill.style.width = progress + "%";

        progressBar.appendChild(progressFill);
        progressCard.append(
          progressTitle,
          progressText,
          progressBar
        );

        progressContainer.appendChild(progressCard);
      }
    });

    if (statusContainer) {
      const average = Math.round(totalProgress / data.length);

      statusContainer.textContent =
        data.length + " formation(s) suivie(s) · " +
        average + " % de progression moyenne.";
    }
  }

  async function showMember(user) {
    if (!user) {
      showDisconnected();
      return;
    }

    const { data: profile, error } = await client
      .from("profiles")
      .select("nom, prenom, membership_plan, membership_status, user_role")
      .eq("id", user.id)
      .single();

    if (error || !profile) {
      bar.textContent =
        "Impossible de charger ton profil membre.";
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

    const info = document.createElement("div");
    info.className = "atp-member-info";

    const identity = document.createElement("span");
    identity.textContent = "Connecté : " + name;

    const membership = document.createElement("span");
    membership.className = "atp-member-plan";
    membership.textContent =
      plan.toUpperCase() + " · " +
      (status === "active" ? "ACTIF" : "INACTIF");

    info.append(identity, membership);

    if (role === "admin") {
      const admin = document.createElement("strong");
      admin.textContent = "ADMINISTRATEUR";
      info.appendChild(admin);
    }

    const accountLink = document.createElement("a");
    const dashboard =
      document.getElementById("academy-dashboard");

    accountLink.href = dashboard
      ? "#academy-dashboard"
      : "index.html#member-dashboard";

    accountLink.textContent = "Mon espace";

    if (dashboard) {
      accountLink.addEventListener("click", (event) => {
        event.preventDefault();

        dashboard.hidden = false;

        dashboard.scrollIntoView({
          behavior: "smooth"
        });
      });
    }

    const logout = document.createElement("button");
    logout.type = "button";
    logout.textContent = "Déconnexion";

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

    await loadAcademyData(user);
  }

  client.auth.getSession().then(({ data, error }) => {
    if (error) {
      showDisconnected();
      return;
    }

    showMember(data.session?.user || null);
  });

  client.auth.onAuthStateChange((_event, session) => {
    showMember(session?.user || null);
  });
})();
