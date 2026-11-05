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
      bar.textContent = "Impossible de charger ton profil membre.";
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
    accountLink.href = "index.html#member-dashboard";
    accountLink.textContent = "Mon espace";

    const logout = document.createElement("button");
    logout.type = "button";
    logout.textContent = "Déconnexion";

    logout.addEventListener("click", async () => {
      logout.disabled = true;

      const { error: logoutError } = await client.auth.signOut();

      if (logoutError) {
        logout.disabled = false;
        alert("La déconnexion a échoué. Réessaie.");
        return;
      }

      window.location.href = "index.html";
    });

    bar.append(info, accountLink, logout);
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
