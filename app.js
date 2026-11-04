(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  $("year").textContent = new Date().getFullYear();

  const menu = $("mobile-menu");
  const nav = $("main-nav");
  menu?.addEventListener("click", () => nav.classList.toggle("open"));
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  const translations = {
    en: {
      announcement:"The digital platform to learn, build and grow.",nav_domains:"Our spaces",nav_academy:"Courses",nav_school:"SCHOOL",nav_store:"Store",nav_about:"About",nav_join:"Join",
      hero_eyebrow:"THE DIGITAL & EDUCATIONAL HUB",hero_title:"Your ambitions deserve <em>the right tools.</em>",hero_text:"Learn new skills, succeed in your studies, develop your projects and explore digital opportunities in one place.",hero_explore:"Explore the platform",hero_account:"Create a free account",hero_note:"Accessible resources designed to help you progress at your own pace.",hero_bottom:"SEVEN SPACES, ONE AMBITION",
      domains_label:"A COMPLETE ECOSYSTEM",domains_title:"Everything to move forward.<br><span>All in one place.</span>",domains_intro:"Seven complementary spaces designed for learners, students, professionals and entrepreneurs.",
      d_academy:"Structured courses, exercises and internal certificates.",d_school:"Lessons, exercises and revision resources from middle to high school.",d_store:"Downloadable guides, templates and digital resources.",d_ai:"Assistants and tools to learn, create and work.",d_media:"Articles, tutorials and digital-world updates.",d_services:"Digital support for projects and businesses.",d_community:"A place to connect, help each other and share projects.",discover:"Explore this space ↗",
      academy_title:"Turn your curiosity into <span>skills.</span>",academy_text:"Progressive learning paths with clear lessons, illustrations, practical exercises, quizzes and downloadable files.",academy_b1:"Beginner, intermediate and advanced levels",academy_b2:"Assessments and internal certificates subject to conditions",academy_b3:"Content in French and English",academy_link:"Access courses with an account ↗",
      school_title:"Your studies deserve a <span>dedicated space.</span>",school_text:"A school resource area organized by class, stream, subject and chapter, starting with Côte d'Ivoire's official curriculum.",school_b1:"Detailed lessons and revision sheets",school_b2:"Solved exercises and interactive quizzes",school_b3:"BEPC and BAC exam preparation",school_link:"Create an account to access resources ↗",
      store_title:"Useful resources.<br><span>Practical results.</span>",store_intro:"Find digital guides and tools designed to help you turn theory into practice.",product_available:"AVAILABLE NOW",product_desc:"A practical guide to discover AI tools, learn how to use them and develop your projects, even as a beginner.",buy_now:"Buy the guide ↗",
      ai_title:"Artificial intelligence, <span>in practice.</span>",ai_text:"Tools for writing, studying, productivity and creation. Features requiring paid infrastructure will only be activated after approval.",progressive:"ROLLING OUT GRADUALLY",
      media_title:"Understand digital technology <span>without jargon.</span>",media_text:"Articles, tutorials and practical guides to understand technology and discover opportunities.",media_link:"Get updates about new publications ↗",
      services_title:"Move your <span>projects forward.</span>",services_text:"Digital services will be introduced gradually, based on what can genuinely be delivered.",
      community_title:"Learn together. <span>Grow together.</span>",community_text:"A community for sharing and helping with studies, AI, technology, entrepreneurship and projects.",
      account_title:"Start for free.<br><span>Grow at your own pace.</span>",account_text:"Create an account to progressively access your courses, resources and personal space.",free_note:"Registration is free. Paid offers will only be activated after prices and terms are clearly presented.",
      last_name:"Last name",first_name:"First name",email:"Email address",password:"Password (at least 8 characters)",password_login:"Password",create_account:"Create my account →",login:"Log in →",member_text:"You are connected to AFRIQUE TECH PLUS.",member_explore:"Explore spaces",logout:"Log out",privacy:"Never share your password. The Supabase public key used here is not a secret key.",
      about_title:"Knowledge opens doors.<br><span>Digital skills open even more.</span>",about_text:"An independent, bilingual platform open to the world, designed to make learning and digital tools more accessible.",rights:"All rights reserved.",footer_note:"Independent platform · Côte d'Ivoire & worldwide"
    }
  };
  let currentLanguage = "fr";
  $("language-switch")?.addEventListener("click", () => {
    currentLanguage = currentLanguage === "fr" ? "en" : "fr";
    document.documentElement.lang = currentLanguage;
    $("language-switch").textContent = currentLanguage === "fr" ? "EN" : "FR";
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (currentLanguage === "fr") {
        if (el.dataset.frOriginal !== undefined) el.innerHTML = el.dataset.frOriginal;
      } else if (translations.en[key]) {
        if (el.dataset.frOriginal === undefined) el.dataset.frOriginal = el.innerHTML;
        el.innerHTML = translations.en[key];
      }
    });
  });

  const authMessage = $("auth-message");
  const signupForm = $("signup-form");
  const loginForm = $("login-form");
  const memberPanel = $("member-panel");
  const authForms = $("auth-forms");
  const switchButton = $("switch-auth");
  let showingLogin = false;
  let client = null;
  const message = (text, type = "") => {
    authMessage.textContent = text;
    authMessage.className = "auth-message" + (type ? " " + type : "");
  };
  const setMode = (login) => {
    showingLogin = login;
    signupForm.hidden = login;
    loginForm.hidden = !login;
    $("auth-title").textContent = login ? (currentLanguage === "fr" ? "Heureux de te revoir !" : "Welcome back!") : (currentLanguage === "fr" ? "Créer mon compte" : "Create my account");
    $("auth-subtitle").textContent = login ? (currentLanguage === "fr" ? "Connecte-toi pour retrouver ton espace." : "Log in to access your account.") : (currentLanguage === "fr" ? "Rejoins gratuitement la plateforme." : "Join the platform for free.");
    $("switch-label").textContent = login ? (currentLanguage === "fr" ? "Pas encore de compte ?" : "Don't have an account yet?") : (currentLanguage === "fr" ? "Tu as déjà un compte ?" : "Already have an account?");
    switchButton.textContent = login ? (currentLanguage === "fr" ? "Créer un compte" : "Create an account") : (currentLanguage === "fr" ? "Se connecter" : "Log in");
    message("");
  };
  switchButton.addEventListener("click", () => setMode(!showingLogin));

 async function refreshMember(user) {
  if (!user) {
    authForms.hidden = false;
    memberPanel.hidden = true;
    return;
  }

  const first = user.user_metadata?.prenom || "";
  const last = user.user_metadata?.nom || "";

  $("member-greeting").textContent =
    (currentLanguage === "fr" ? "Bienvenue " : "Welcome ") +
    [first, last].filter(Boolean).join(" ") + " !";

  authForms.hidden = true;
  memberPanel.hidden = false;

  message(
    currentLanguage === "fr"
      ? "Connexion réussie."
      : "Successfully logged in.",
    "success"
  );
}
  $("logout-button").addEventListener("click", async () => {
    if (!client) return;
    const { error } = await client.auth.signOut();
    if (error) return message(error.message, "error");
    memberPanel.hidden = true;
    authForms.hidden = false;
    setMode(true);
    message(currentLanguage === "fr" ? "Tu es déconnecté." : "You are logged out.", "success");
  });

  if (!window.supabase?.createClient || !window.ATP_CONFIG?.supabaseUrl || !window.ATP_CONFIG?.supabasePublishableKey) {
    message("Le module de connexion ne s'est pas chargé. Vérifie la connexion Internet et la configuration.", "error");
    return;
  }
  client = window.supabase.createClient(window.ATP_CONFIG.supabaseUrl, window.ATP_CONFIG.supabasePublishableKey);

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nom = $("nom").value.trim();
    const prenom = $("prenom").value.trim();
    const email = $("signup-email").value.trim();
    const password = $("signup-password").value;
    if (!nom || !prenom) return message("Renseigne ton nom et ton prénom.", "error");
    if (password.length < 8) return message("Le mot de passe doit contenir au moins 8 caractères.", "error");
    const button = $("signup-button");
    button.disabled = true;
    button.textContent = "Création en cours…";
    const { data, error } = await client.auth.signUp({ email, password, options: { data: { nom, prenom } } });
    button.disabled = false;
    button.textContent = currentLanguage === "fr" ? "Créer mon compte →" : "Create my account →";
    if (error) return message(error.message, "error");
    if (data.session) {
      message("Compte créé et connexion réussie !", "success");
      await refreshMember(data.user);
    } else {
      signupForm.reset();
      message("Compte créé ! Consulte ton e-mail et confirme ton adresse avant de te connecter.", "success");
    }
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = $("login-email").value.trim();
    const password = $("login-password").value;
    message("Connexion en cours…");
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) return message(error.message, "error");
    await refreshMember(data.user);
  });

  client.auth.getSession().then(({ data }) => refreshMember(data.session?.user || null));
  client.auth.onAuthStateChange((_event, session) => {
  window.setTimeout(() => {
    refreshMember(session?.user || null);
  }, 0);
});
})();
