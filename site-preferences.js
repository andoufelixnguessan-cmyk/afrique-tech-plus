(() => {
  "use strict";
  const KEY = "atp-theme-mode";
  const cookieValue = name => (document.cookie.split("; ").find(row => row.startsWith(name + "=")) || "").split("=").slice(1).join("=");
  const currentLanguage = () => decodeURIComponent(cookieValue("googtrans") || "").endsWith("/en") ? "en" : "fr";
  const setLanguageCookie = lang => {
    const value = "/fr/" + lang;
    document.cookie = "googtrans=" + value + ";path=/;max-age=31536000;SameSite=Lax";
    if (location.hostname) document.cookie = "googtrans=" + value + ";path=/;domain=" + location.hostname + ";max-age=31536000;SameSite=Lax";
  };
  const dark = localStorage.getItem(KEY) === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";

  const style = document.createElement("style");
  style.textContent = `
    :root[data-theme="dark"]{color-scheme:dark}
    html[data-theme="dark"] body{background:#0b1424!important;color:#e8eef9!important}
    html[data-theme="dark"] :is(main,section,article,.container,.catalogue,.benefits,.workspace,.picker-panel,.toolbar,.stat,.subject-card,.category-card,.resource-item,.academy-tab-panel,.academy-tabs,.auth-card,.service-card,.services-card,.about-section,.featured-courses,.home-featured,.home-account,.home-member-dashboard,.certification,.atp-theme-group,.atp-main-lesson,.atp-learning-section,.atp-formula-card){background-color:#151f33!important;color:#e8eef9!important;border-color:#2a3a55!important}
    html[data-theme="dark"] :is(h1,h2,h3,h4,strong,label,.brand,.brand-name,.main-nav a,.nav-links a,.section-heading h2,.subject-card h3,.category-card strong,.workspace h2,.academy-panel-title h3){color:#f2f6ff!important}
    html[data-theme="dark"] :is(p,small,.muted,.section-heading p,.subject-card p,.category-card span,.workspace p,.academy-tab-panel p,.benefit p,.course-caption,.atp-muted,.atp-list){color:#b8c6dc!important}
    html[data-theme="dark"] :is(input,select,textarea,.school-select,.search,.filter){background:#101a2b!important;color:#f2f6ff!important;border-color:#354761!important}
    html[data-theme="dark"] :is(.site-header,.topbar,.services-topbar,.announcement,.school-page aside,.school-page .topbar){background:#101a2b!important;color:#e8eef9!important;border-color:#2a3a55!important}
    html[data-theme="dark"] :is(.site-footer,footer){background:#080e1a!important;color:#e8eef9!important}
    html[data-theme="dark"] :is(.hero,.services-hero,.school-page .hero){background:linear-gradient(135deg,#14233d,#1b2d49)!important;color:#f2f6ff!important}
    html[data-theme="dark"] :is(.hero h1,.hero p,.hero-copy>p,.services-hero h1,.services-hero p,.school-page .hero h1,.school-page .hero p){color:#f2f6ff!important}
    html[data-theme="dark"] .video-course-card{background:#17243a!important;border-color:#354761!important}
    html[data-theme="dark"] .video-course-info h3{color:#f2f6ff!important}
    html[data-theme="dark"] .video-course-info p{color:#b8c6dc!important}
    html[data-theme="dark"] .atp-main-lesson>summary,html[data-theme="dark"] .atp-session summary{background:#101a2b!important;color:#f2f6ff!important}
    html[data-theme="dark"] .atp-answer{background:#123b2a!important;color:#d8f7e5!important}
    html[data-theme="dark"] .atp-mathml{background:#f7f9ff!important;color:#14213a!important}
    html[data-theme="dark"] .profile-details{background:#101a2b!important}
    html[data-theme="dark"] .atp-member-preferences{background:#101a2b!important;border-color:#354761!important}
    html[data-theme="dark"] .atp-member-preferences strong,html[data-theme="dark"] .atp-theme-help{color:#e8eef9!important}
    .atp-preferences{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .atp-language-toggle{display:inline-flex;align-items:center;justify-content:center;min-width:36px;height:30px;padding:0 9px;border:1px solid rgba(35,57,88,.16);border-radius:9px;background:rgba(255,255,255,.78);color:#203452;font:800 11px Arial,sans-serif;letter-spacing:.4px;cursor:pointer;transition:background .2s,border-color .2s}
    .atp-language-toggle:hover{background:#fff;border-color:#8aa2c4}
    html[data-theme="dark"] .atp-language-toggle{background:#17243a;color:#edf4ff;border-color:#40516a}
    .atp-member-preferences{margin-top:20px;padding:16px;border:1px solid #dfe7f1;border-radius:14px;background:rgba(40,100,216,.05)}
    .atp-member-preferences strong{display:block;margin-bottom:10px}
    .atp-theme-toggle{border:1px solid #a9b8cc;border-radius:10px;padding:9px 11px;background:#fff;color:#17233d;font:600 12px Arial,sans-serif;cursor:pointer}
    .atp-theme-help{font-size:12px;color:#687991}
    .goog-te-banner-frame,.skiptranslate iframe{display:none!important}
    body{top:0!important}
    .notranslate{translate:no!important}
  `;
  style.textContent += `
    /* Charte lisible commune pour AI, MEDIA, SERVICES et COMMUNITY */
    html[data-theme="light"] :is(.ai-page,.media-page,.services-page,.community-page){
      background:#f3f6fb!important;color:#17233d!important;
    }
    html[data-theme="dark"] :is(.ai-page,.media-page,.services-page,.community-page){
      background:#0b1424!important;color:#e8eef9!important;
    }
    html[data-theme="light"] :is(.ai-topbar,.media-topbar,.services-topbar,.community-topbar){
      background:#fff!important;color:#17233d!important;border-color:#dce4ef!important;
    }
    html[data-theme="dark"] :is(.ai-topbar,.media-topbar,.services-topbar,.community-topbar){
      background:#101a2b!important;color:#e8eef9!important;border-color:#2a3a55!important;
    }
    html[data-theme="light"] :is(.ai-logo,.media-logo,.services-logo,.community-logo){
      color:#17233d!important;
    }
    html[data-theme="dark"] :is(.ai-logo,.media-logo,.services-logo,.community-logo){
      color:#f2f6ff!important;
    }
    :is(.ai-back,.media-back,.services-back,.community-back){
      display:inline-flex;align-items:center;justify-content:center;
      background:#fff!important;color:#17233d!important;border:1px solid #cbd5e1!important;
      border-radius:999px;padding:10px 16px;text-decoration:none;font-weight:700;
    }
    html[data-theme="dark"] :is(.ai-back,.media-back,.services-back,.community-back){
      background:#17243a!important;color:#f2f6ff!important;border-color:#40516a!important;
    }
    :is(.ai-hero,.media-hero,.services-hero,.community-hero){
      background:linear-gradient(135deg,#14213d,#243f78)!important;color:#fff!important;
    }
    :is(.ai-hero,.media-hero,.services-hero,.community-hero) :is(h1,h2,p){
      color:#fff!important;
    }
    :is(.ai-content,.media-content,.services-content,.community-content){
      color:#17233d!important;
    }
    html[data-theme="light"] :is(.ai-content,.media-content,.services-content,.community-content) :is(h2,h3){
      color:#17233d!important;
    }
    html[data-theme="light"] :is(.ai-intro,.media-intro,.services-intro,.community-intro){
      color:#52627a!important;
    }
    html[data-theme="light"] :is(.ai-card,.media-card,.services-card,.community-card,.ai-banner,.media-banner,.services-banner,.community-banner){
      background:#fff!important;color:#17233d!important;border:1px solid #dce4ef!important;
      box-shadow:0 10px 28px rgba(25,45,80,.07);
    }
    html[data-theme="light"] :is(.ai-card,.media-card,.services-card,.community-card,.ai-banner,.media-banner,.services-banner,.community-banner) :is(h2,h3,strong){
      color:#17233d!important;
    }
    html[data-theme="light"] :is(.ai-card,.media-card,.services-card,.community-card,.ai-banner,.media-banner,.services-banner,.community-banner) p{
      color:#52627a!important;
    }
    html[data-theme="dark"] :is(.ai-content,.media-content,.services-content,.community-content){
      color:#e8eef9!important;
    }
    html[data-theme="dark"] :is(.ai-content,.media-content,.services-content,.community-content) :is(h2,h3){
      color:#f2f6ff!important;
    }
    html[data-theme="dark"] :is(.ai-intro,.media-intro,.services-intro,.community-intro){
      color:#b8c6dc!important;
    }
    html[data-theme="dark"] :is(.ai-card,.media-card,.services-card,.community-card,.ai-banner,.media-banner,.services-banner,.community-banner){
      background:#151f33!important;color:#e8eef9!important;border:1px solid #354761!important;
      box-shadow:0 10px 28px rgba(0,0,0,.18);
    }
    html[data-theme="dark"] :is(.ai-card,.media-card,.services-card,.community-card,.ai-banner,.media-banner,.services-banner,.community-banner) :is(h2,h3,strong){
      color:#f2f6ff!important;
    }
    html[data-theme="dark"] :is(.ai-card,.media-card,.services-card,.community-card,.ai-banner,.media-banner,.services-banner,.community-banner) p{
      color:#c4d0e2!important;
    }
    :is(.ai-status,.media-status,.services-status,.community-status){
      display:inline-block;padding:7px 10px;border-radius:999px;font-size:11px;font-weight:800;
      background:#e8eefb!important;color:#244b9b!important;border:1px solid #cbd8f1!important;
    }
    html[data-theme="dark"] :is(.ai-status,.media-status,.services-status,.community-status){
      background:#203454!important;color:#dce8ff!important;border-color:#405b82!important;
    }
    :is(.ai-footer,.media-footer,.services-footer,.community-footer){
      padding:24px 7%;background:#e8eef6!important;color:#42516a!important;
    }
    :is(.ai-footer,.media-footer,.services-footer,.community-footer) a{color:#244b9b!important;font-weight:700}
    html[data-theme="dark"] :is(.ai-footer,.media-footer,.services-footer,.community-footer){
      background:#080e1a!important;color:#c4d0e2!important;
    }
    html[data-theme="dark"] :is(.ai-footer,.media-footer,.services-footer,.community-footer) a{color:#a9c5ff!important}
    html[data-theme="light"] .home-member-dashboard .member-profile-card{background:#fff!important;color:#17233d!important}
    html[data-theme="dark"] .home-member-dashboard .member-profile-card{background:#151f33!important;color:#e8eef9!important}
    #member-dashboard .atp-member-preferences{display:block!important;visibility:visible!important;opacity:1!important}
    #member-dashboard .atp-theme-toggle{display:inline-flex!important;align-items:center;justify-content:center;min-height:42px;font-weight:800}
  `;

  style.textContent += `
    /* Contraste global ATP : mêmes règles sur toutes les rubriques */
    html[data-theme="light"] body{background:#f5f7fb!important;color:#17243a!important}
    html[data-theme="dark"] body{background:#0d1728!important;color:#edf2fa!important}
    html[data-theme="light"] body :is(h1,h2,h3,h4,h5,h6){color:#17243a!important}
    html[data-theme="dark"] body :is(h1,h2,h3,h4,h5,h6){color:#f5f8ff!important}
    html[data-theme="light"] body :is(p,li,dt,dd,label,small,summary,figcaption,blockquote,td,th,legend,output){color:#34445d!important}
    html[data-theme="dark"] body :is(p,li,dt,dd,label,small,summary,figcaption,blockquote,td,th,legend,output){color:#d2dced!important}
    html[data-theme="light"] body :is(span,strong,b,em){color:inherit}
    html[data-theme="dark"] body :is(span,strong,b,em){color:#e6edf8!important}
    html[data-theme="light"] body a:not(.button):not(.button-primary):not(.nav-cta):not(.primary-button):not(.action-btn):not(.home-btn){color:#185b49}
    html[data-theme="dark"] body a:not(.button):not(.button-primary):not(.nav-cta):not(.primary-button):not(.action-btn):not(.home-btn){color:#a9c9ff!important}
    html[data-theme="dark"] body :is(main,section,article,aside,.layout,.container,.content,.page-content,.academy-page,.school-page,.store-page,.ai-page,.media-page,.services-page,.community-page,.about-content,.about-values,.about-status-section,.catalogue,.benefits,.workspace,.picker-panel,.toolbar,.stat,.subject-card,.category-card,.resource-item,.academy-tab-panel,.academy-tabs,.auth-card,.service-card,.services-card,.about-section,.featured-courses,.home-featured,.home-account,.home-member-dashboard,.certification,.atp-theme-group,.atp-main-lesson,.atp-learning-section,.atp-formula-card,.atp-live-card,.atp-module,.atp-lesson,.atp-quiz,.atp-progress,.video-course-link,.home-space-card,.domain-card,.feature-section,.school-section){
      background-color:#152238!important;color:#edf2fa!important;border-color:#344761!important;
    }
    html[data-theme="light"] body :is(.atp-live-card,.atp-module,.atp-lesson,.atp-quiz,.atp-progress,.video-course-link,.home-space-card,.domain-card){
      background-color:#fff!important;color:#17243a!important;border-color:#d8e0eb!important;
    }
    html[data-theme="dark"] body :is(.topbar,.site-header,.site-nav,.navigation,aside,.sidebar,.services-topbar,.ai-topbar,.media-topbar,.community-topbar,.site-footer,footer){
      background:#101b2d!important;color:#edf2fa!important;border-color:#344761!important;
    }
    html[data-theme="dark"] body :is(input,select,textarea,option,.school-select,.search,.filter){
      background:#0e1a2c!important;color:#f5f8ff!important;border:1px solid #52647e!important;
    }
    html[data-theme="light"] body :is(input,select,textarea,option,.school-select,.search,.filter){
      background:#fff!important;color:#17243a!important;border-color:#aebbd0!important;
    }
    html[data-theme="dark"] body :is(button,.button,.primary-button,.action-btn,.home-btn,.nav-button,.submit-button){
      color:#fff!important;
    }
    html[data-theme="dark"] body :is(.hero,.academy-hero,.school-page .hero,.ai-hero,.media-hero,.services-hero,.community-hero,.about-hero){
      background:linear-gradient(135deg,#14243c,#203b5e)!important;color:#fff!important;
    }
    html[data-theme="dark"] body :is(.hero,.academy-hero,.school-page .hero,.ai-hero,.media-hero,.services-hero,.community-hero,.about-hero) :is(h1,h2,h3,p,span,strong,small,.eyebrow,.section-label){
      color:#f5f8ff!important;
    }
    html[data-theme="dark"] body :is(.hero,.academy-hero,.school-page .hero,.ai-hero,.media-hero,.services-hero,.community-hero,.about-hero) :is(.eyebrow,.section-label,.hero-tag,.catalogue-label){
      color:#d9f28a!important;
    }
    html[data-theme="dark"] body :is(.academy-tab[aria-selected="true"],.academy-tab.active,.nav button.active){
      background:#285b4b!important;color:#fff!important;border-color:#5e9b83!important;
    }
    html[data-theme="dark"] body :is(.academy-tab,.nav button,.category-card,.resource-item summary,.atp-main-lesson>summary,.atp-session summary){
      color:#edf2fa!important;
    }
    html[data-theme="dark"] body :is(.status,.badge,.tag,.pill,.community-status,.ai-status,.media-status,.services-status){
      background:#234a3b!important;color:#e5ffd9!important;border-color:#54836e!important;
    }
    html[data-theme="dark"] body :is(.atp-mathml,math,.math-expression){
      background:#f7f9ff!important;color:#14213a!important;
    }
    html[data-theme="dark"] body :is(.atp-answer,.success,.success-message){
      background:#174332!important;color:#e4ffed!important;
    }
    html[data-theme="dark"] body :is(.error,.error-message){color:#ffb4b4!important}
    html[data-theme="light"] body :is(.error,.error-message){color:#a32121!important}
    html[data-theme="dark"] body ::placeholder{color:#aebdd1!important;opacity:1}
    html[data-theme="light"] body ::placeholder{color:#596a82!important;opacity:1}
    html[data-theme="dark"] body :focus-visible{outline:3px solid #b8d4ff!important;outline-offset:3px}
    html[data-theme="light"] body :focus-visible{outline:3px solid #256b58!important;outline-offset:3px}
  `;
  document.head.appendChild(style);

  const protectLogos = () => {
    document.querySelectorAll(".brand,.brand-mark,.brand-name,.logo,.site-logo,[data-site-logo]").forEach(node => {
      node.classList.add("notranslate");
      node.setAttribute("translate","no");
      node.querySelectorAll("*").forEach(child => { child.classList.add("notranslate"); child.setAttribute("translate","no"); });
    });
  };
  protectLogos();
  new MutationObserver(protectLogos).observe(document.documentElement,{childList:true,subtree:true});

  const languageHost = document.querySelector(".nav-actions,.navigation,.nav-wrap,.services-topbar,.topbar .container,.topbar,header") || document.querySelector(".layout aside") || document.body;
  const languageControl = document.createElement("div");
  languageControl.className = "atp-preferences";
  languageControl.innerHTML = '<button type="button" class="atp-language-toggle" aria-label="Changer de langue" title="Changer de langue"></button><div id="google_translate_element" hidden></div>';
  languageHost.appendChild(languageControl);
  const languageButton = languageControl.querySelector("button");
  const syncLanguage = () => { languageButton.textContent = currentLanguage() === "fr" ? "EN" : "FR"; languageButton.setAttribute("aria-label",currentLanguage()==="fr"?"Switch to English":"Passer en français"); };
  languageButton.addEventListener("click", () => {
    const next = currentLanguage() === "fr" ? "en" : "fr";
    setLanguageCookie(next);
    if(next === "fr"){ location.reload(); return; }
    window.__atpPendingLanguage = next;
    const combo = document.querySelector(".goog-te-combo");
    if(combo){combo.value="en";combo.dispatchEvent(new Event("change"));}
    syncLanguage();
  });
  syncLanguage();

  window.googleTranslateElementInit = () => {
    if(!window.google?.translate?.TranslateElement)return;
    new google.translate.TranslateElement({pageLanguage:"fr",includedLanguages:"en,fr",autoDisplay:false}, "google_translate_element");
    if(currentLanguage()==="en"){const combo=document.querySelector(".goog-te-combo");if(combo){combo.value="en";combo.dispatchEvent(new Event("change"));}}
  };
  const translateScript=document.createElement("script");
  translateScript.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  translateScript.async=true;
  document.head.appendChild(translateScript);

  const addThemeControl = container => {
    if(!container || container.querySelector(".atp-member-preferences"))return;
    const panel=document.createElement("div");
    panel.className="atp-member-preferences";
    panel.innerHTML='<strong>Préférences d’affichage</strong><div class="atp-preferences"><button class="atp-theme-toggle" type="button"></button><span class="atp-theme-help">Ton choix est conservé sur cet appareil.</span></div>';
    const button=panel.querySelector("button");
    const sync=()=>{const isDark=document.documentElement.dataset.theme==="dark";button.textContent=isDark?"☀️ Passer au thème clair":"🌙 Activer le thème sombre";};
    button.addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;localStorage.setItem(KEY,next);sync();});
    sync();container.appendChild(panel);
  };
  addThemeControl(document.querySelector("#member-dashboard .member-profile-card"));
  addThemeControl(document.getElementById("academy-dashboard"));
})();