(() => {
  "use strict";
  const KEY="atp-theme-mode";
  const dark=localStorage.getItem(KEY)==="dark";
  document.documentElement.dataset.theme=dark?"dark":"light";
  const style=document.createElement("style");
  style.textContent=`
    :root[data-theme="dark"]{color-scheme:dark}
    html[data-theme="dark"] body{background:#0d1424!important;color:#e8eef9!important}
    html[data-theme="dark"] :is(main,section,article,.container,.catalogue,.benefits,.workspace,.picker-panel,.toolbar,.stat,.subject-card,.category-card,.resource-item,.academy-tab-panel,.academy-tabs,.auth-card,.service-card,.services-card,.about-section,.featured-courses,.home-featured,.home-account,.home-member-dashboard,.certification){background-color:#151f33!important;color:#e8eef9!important;border-color:#2a3a55!important}
    html[data-theme="dark"] :is(h1,h2,h3,h4,strong,label,.brand,.brand-name,.main-nav a,.nav-links a,.section-heading h2,.subject-card h3,.category-card strong,.workspace h2,.academy-panel-title h3){color:#f2f6ff!important}
    html[data-theme="dark"] :is(p,small,.muted,.section-heading p,.subject-card p,.category-card span,.workspace p,.academy-tab-panel p,.benefit p,.course-caption){color:#b8c6dc!important}
    html[data-theme="dark"] :is(input,select,textarea,.school-select,.search,.filter){background:#101a2b!important;color:#f2f6ff!important;border-color:#354761!important}
    html[data-theme="dark"] :is(.site-header,.topbar,.services-topbar,.announcement){background:#101a2b!important;color:#e8eef9!important;border-color:#2a3a55!important}
    html[data-theme="dark"] :is(.site-footer,footer){background:#080e1a!important;color:#e8eef9!important}
    html[data-theme="dark"] :is(.hero,.services-hero){background:linear-gradient(135deg,#14233d,#1b2d49)!important;color:#f2f6ff!important}
    html[data-theme="dark"] :is(.hero h1,.hero p,.hero-copy>p,.services-hero h1,.services-hero p){color:#f2f6ff!important}
    html[data-theme="dark"] .video-course-card{background:#17243a!important;border-color:#354761!important}
    html[data-theme="dark"] .video-course-info h3{color:#f2f6ff!important}
    html[data-theme="dark"] .video-course-info p{color:#b8c6dc!important}
    .atp-preferences{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .atp-preferences select,.atp-theme-toggle{border:1px solid #a9b8cc;border-radius:10px;padding:9px 11px;background:#fff;color:#17233d;font:600 12px Arial,sans-serif;cursor:pointer}
    .atp-preferences select{min-width:76px}
    .atp-member-preferences{margin-top:20px;padding:16px;border:1px solid #dfe7f1;border-radius:14px;background:rgba(40,100,216,.05)}
    .atp-member-preferences strong{display:block;margin-bottom:10px}
    html[data-theme="dark"] .atp-member-preferences{background:#101a2b!important;border-color:#354761!important}
    .goog-te-banner-frame,.skiptranslate iframe{display:none!important}
    body{top:0!important}
  `;
  document.head.appendChild(style);
  const language=document.createElement("div");
  language.className="atp-preferences";
  language.innerHTML='<label class="atp-language-label" for="atp-language">Langue</label><select id="atp-language" aria-label="Choisir la langue"><option value="fr">Français</option><option value="en">English</option></select><div id="google_translate_element" hidden></div>';
  const host=document.querySelector(".nav-actions,.navigation,.nav-wrap,.services-topbar,.topbar .container,.topbar,.layout aside");
  if(host)host.appendChild(language);else document.body.prepend(language);
  const select=language.querySelector("select");
  const applyLanguage=lang=>{
    if(lang==="fr"){document.cookie="googtrans=/fr/fr;path=/";document.cookie="googtrans=/fr/fr;path=/;domain="+location.hostname;location.reload();return;}
    const combo=document.querySelector(".goog-te-combo");
    if(combo){combo.value=lang;combo.dispatchEvent(new Event("change"));return;}
    window.__atpPendingLanguage=lang;
  };
  select.value=document.cookie.split(";").some(item=>item.trim()==="googtrans=/fr/en")?"en":"fr";
  select.addEventListener("change",()=>applyLanguage(select.value));
  window.googleTranslateElementInit=()=>{
    if(!window.google?.translate?.TranslateElement)return;
    new google.translate.TranslateElement({pageLanguage:"fr",includedLanguages:"en,fr",autoDisplay:false}, "google_translate_element");
    const pending=window.__atpPendingLanguage;
    if(pending){const combo=document.querySelector(".goog-te-combo");if(combo){combo.value=pending;combo.dispatchEvent(new Event("change"));}}
  };
  const gt=document.createElement("script");gt.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";gt.async=true;document.head.appendChild(gt);
  const addThemeControl=container=>{
    if(!container||container.querySelector(".atp-member-preferences"))return;
    const panel=document.createElement("div");panel.className="atp-member-preferences";
    panel.innerHTML='<strong>Préférences d’affichage</strong><div class="atp-preferences"><button class="atp-theme-toggle" type="button"></button><span class="atp-theme-help">Le choix est conservé sur cet appareil.</span></div>';
    const button=panel.querySelector("button");
    const sync=()=>{const isDark=document.documentElement.dataset.theme==="dark";button.textContent=isDark?"☀️ Passer au thème clair":"🌙 Activer le thème sombre";};
    button.addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;localStorage.setItem(KEY,next);sync();});
    sync();container.appendChild(panel);
  };
  ["member-dashboard","member-panel","academy-dashboard"].forEach(id=>addThemeControl(document.getElementById(id)));
})();