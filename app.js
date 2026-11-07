(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const year=$("year"); if(year) year.textContent=new Date().getFullYear();
  const nav=$("main-nav");
  const menu=$("mobile-menu");
  menu?.addEventListener("click",()=>nav?.classList.toggle("open"));
  nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  const account=$("account"), dashboard=$("member-dashboard"), forms=$("auth-forms");\n  if(window.location.hash==="#account" && account) account.hidden=false;
  const signup=$("signup-form"), login=$("login-form"), member=$("member-panel");
  const messageEl=$("auth-message"), logout=$("menu-logout"), navCta=document.querySelector(".nav-cta");
  let client=null, modeLogin=false;
  const say=(message,type="")=>{if(messageEl){messageEl.textContent=message;messageEl.className="auth-message"+(type?" "+type:"");}};
  const setMode=loginMode=>{
    modeLogin=loginMode;
    if(signup)signup.hidden=loginMode;
    if(login)login.hidden=!loginMode;
    if($("auth-title"))$("auth-title").textContent=loginMode?"Heureux de te revoir !":"Créer mon compte";
    if($("auth-subtitle"))$("auth-subtitle").textContent=loginMode?"Connecte-toi pour retrouver ton espace.":"Rejoins gratuitement la plateforme.";
    if($("switch-label"))$("switch-label").textContent=loginMode?"Pas encore de compte ?":"Tu as déjà un compte ?";
    if($("switch-auth"))$("switch-auth").textContent=loginMode?"Créer un compte":"Se connecter";
    say("");
  };
  $("switch-auth")?.addEventListener("click",()=>setMode(!modeLogin));
  document.querySelectorAll('a[href="#account"]').forEach(link=>link.addEventListener("click",()=>{
    if(account)account.hidden=false;
    account?.scrollIntoView({behavior:"smooth",block:"start"});
  }));
  document.querySelectorAll(".password-toggle").forEach(button=>{
    button.addEventListener("click",()=>{
      const input=$(button.dataset.passwordTarget); if(!input)return;
      const visible=input.type==="password"; input.type=visible?"text":"password";
      button.setAttribute("aria-pressed",String(visible));
      button.setAttribute("aria-label",visible?"Masquer le mot de passe":"Afficher le mot de passe");
      button.textContent=visible?"◎":"◉";
    });
  });
  const render=user=>{
    const connected=!!user;
    if(forms)forms.hidden=connected;
    if(member)member.hidden=!connected;
    if(dashboard)dashboard.hidden=!connected;
    if(logout)logout.hidden=!connected;
    if(navCta)navCta.hidden=connected;
    document.querySelectorAll('a[href="#account"]').forEach(a=>{if(a.classList.contains("button-ghost")||a.classList.contains("nav-cta"))a.hidden=connected;});
    if(connected && account)account.hidden=true;
    if(!connected){if(dashboard)dashboard.hidden=true;setMode(true);return;}
    const meta=user.user_metadata||{};
    const full=[meta.prenom,meta.nom].filter(Boolean).join(" ")||"Membre";
    if($("member-greeting"))$("member-greeting").textContent="Bienvenue "+full+" !";
    if($("dashboard-greeting"))$("dashboard-greeting").textContent="Bienvenue "+full+" !";
    if($("profile-name"))$("profile-name").textContent=full;
    if($("profile-email"))$("profile-email").textContent=user.email||"Non disponible";
  };
  if(!window.supabase?.createClient||!window.ATP_CONFIG?.supabaseUrl||!window.ATP_CONFIG?.supabasePublishableKey){
    say("Le module de connexion ne s'est pas chargé. Vérifie la configuration.", "error"); return;
  }
  client=window.supabase.createClient(window.ATP_CONFIG.supabaseUrl,window.ATP_CONFIG.supabasePublishableKey);
  signup?.addEventListener("submit",async event=>{
    event.preventDefault();
    const nom=$("nom").value.trim(),prenom=$("prenom").value.trim(),email=$("signup-email").value.trim(),password=$("signup-password").value;
    if(!nom||!prenom)return say("Renseigne ton nom et ton prénom.","error");
    if(password.length<8)return say("Le mot de passe doit contenir au moins 8 caractères.","error");
    const button=$("signup-button");button.disabled=true;button.textContent="Création en cours…";
    const {data,error}=await client.auth.signUp({email,password,options:{data:{nom,prenom}}});
    button.disabled=false;button.textContent="Créer mon compte →";
    if(error)return say(error.message,"error");
    if(data.session) {say("Compte créé et connexion réussie !","success");render(data.user);}
    else {signup.reset();say("Compte créé ! Consulte ton e-mail pour confirmer ton adresse avant de te connecter.","success");}
  });
  login?.addEventListener("submit",async event=>{
    event.preventDefault();
    const button=login.querySelector('button[type="submit"]');
    button.disabled=true;button.textContent="Connexion en cours…";
    const {data,error}=await client.auth.signInWithPassword({email:$("login-email").value.trim(),password:$("login-password").value});
    button.disabled=false;button.textContent="Se connecter →";
    if(error)return say("Connexion impossible : "+error.message,"error");
    render(data.user);say("Connexion réussie à AFRIQUE TECH PLUS.","success");
  });
  logout?.addEventListener("click",async()=>{
    const {error}=await client.auth.signOut();
    if(error)return say(error.message,"error");
    nav?.classList.remove("open");render(null);
    window.scrollTo({top:0,behavior:"smooth"});
  });
  client.auth.getSession().then(({data,error})=>{if(error)console.error(error);render(data.session?.user||null);});
  client.auth.onAuthStateChange((_event,session)=>render(session?.user||null));
})();