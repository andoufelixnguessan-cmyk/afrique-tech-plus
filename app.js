(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const year=$("year"); if(year) year.textContent=new Date().getFullYear();
  const nav=$("main-nav");
  const menu=$("mobile-menu");
  menu?.addEventListener("click",()=>{
    const open=nav?.classList.toggle("open")||false;
    menu.setAttribute("aria-expanded",String(open));
    menu.setAttribute("aria-label",open?"Fermer le menu":"Ouvrir le menu");
  });
  nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded","false");
    menu?.setAttribute("aria-label","Ouvrir le menu");
  }));

  const account=$("account"), dashboard=$("member-dashboard"), forms=$("auth-forms");
  const memberNav=$("member-nav-link");
  let currentUser=null;
  if(window.location.hash==="#account" && account) account.hidden=false;
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
  document.querySelectorAll('a[href="#account"]:not(#member-nav-link)').forEach(link=>link.addEventListener("click",()=>{
    if(account)account.hidden=false;
    account?.scrollIntoView({behavior:"smooth",block:"start"});
  }));
  memberNav?.addEventListener("click",event=>{
    event.preventDefault();
    nav?.classList.remove("open");
    menu?.setAttribute("aria-expanded","false");
    menu?.setAttribute("aria-label","Ouvrir le menu");
    if(currentUser && dashboard){
      dashboard.hidden=false;
      dashboard.scrollIntoView({behavior:"smooth",block:"start"});
    }else if(account){
      account.hidden=false;
      account.scrollIntoView({behavior:"smooth",block:"start"});
    }
  });
  document.querySelectorAll(".password-toggle").forEach(button=>{
    button.addEventListener("click",()=>{
      const input=$(button.dataset.passwordTarget); if(!input)return;
      const visible=input.type==="password"; input.type=visible?"text":"password";
      button.setAttribute("aria-pressed",String(visible));
      button.setAttribute("aria-label",visible?"Masquer le mot de passe":"Afficher le mot de passe");
      button.textContent=visible?"◎":"◉";
    });
  });
  async function loadMemberOverview(user){
    const set=(id,value)=>{const el=$(id);if(el)el.textContent=value;};
    set("member-stat-courses","…");set("member-stat-progress","…");set("member-stat-lessons","…");
    if(!client||!user?.id)return;
    const [enrollments,lessons]=await Promise.all([
      client.from("academy_enrollments").select("id,progress_percent").eq("member_id",user.id).eq("enrollment_status","active"),
      client.from("academy_lesson_progress").select("id",{count:"exact",head:true}).eq("member_id",user.id).eq("is_completed",true)
    ]);
    if(enrollments.error||lessons.error){
      console.warn("Résumé membre indisponible",enrollments.error||lessons.error);
      set("member-stat-courses","—");set("member-stat-progress","—");set("member-stat-lessons","—");
      return;
    }
    const rows=enrollments.data||[];
    const average=rows.length?Math.round(rows.reduce((sum,row)=>sum+Number(row.progress_percent||0),0)/rows.length):0;
    set("member-stat-courses",String(rows.length));
    set("member-stat-progress",average+" %");
    set("member-stat-lessons",String(lessons.count||0));
  }
  const render=user=>{
    currentUser=user||null;
    const connected=!!user;
    if(forms)forms.hidden=connected;
    if(member)member.hidden=!connected;
    if(dashboard)dashboard.hidden=true;
    if(logout)logout.hidden=!connected;
    if(navCta)navCta.hidden=connected;
    document.querySelectorAll('a[href="#account"]:not(#member-nav-link)').forEach(a=>{a.hidden=connected;});
    if(connected && account)account.hidden=true;
    if(!connected){if(dashboard)dashboard.hidden=true;setMode(true);return;}
    const meta=user.user_metadata||{};
    const full=[meta.prenom,meta.nom].filter(Boolean).join(" ")||"Membre";
    if($("member-greeting"))$("member-greeting").textContent="Bienvenue "+full+" !";
    if($("dashboard-greeting"))$("dashboard-greeting").textContent="Bienvenue "+full+" !";
    if($("profile-name"))$("profile-name").textContent=full;
    if($("profile-email"))$("profile-email").textContent=user.email||"Non disponible";
    const hour=new Date().getHours();
    const greeting=hour<12?"Bonjour":hour<18?"Bon après-midi":"Bonsoir";
    if($("dashboard-greeting"))$("dashboard-greeting").textContent=greeting+", "+full+" !";
    loadMemberOverview(user);
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