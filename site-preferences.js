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

  const applyTheme = mode => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
    try { localStorage.setItem(KEY, mode); } catch (_) {}
    document.querySelectorAll(".atp-theme-toggle").forEach(button => {
      button.textContent = mode === "dark" ? "☀️ Passer au thème clair" : "🌙 Activer le thème sombre";
      button.setAttribute("aria-pressed", String(mode === "dark"));
    });
  };
  let savedTheme = "light";
  try { savedTheme = localStorage.getItem(KEY) === "dark" ? "dark" : "light"; } catch (_) {}
  applyTheme(savedTheme);

  const style = document.createElement("style");
  style.textContent = `
    .atp-preferences{display:inline-flex;align-items:center;gap:8px;flex:0 0 auto}
    .atp-language-toggle{display:inline-flex;align-items:center;justify-content:center;min-width:40px;height:34px;padding:0 10px;border:1px solid #9aa9bd;border-radius:9px;background:#fff;color:#1b2a41;font:800 11px Arial,sans-serif;cursor:pointer}
    html[data-theme="dark"] .atp-language-toggle{background:#243449;color:#f4f7fb;border-color:#61748e}
    .atp-member-preferences{margin-top:20px;padding:16px;border:1px solid #d5deea;border-radius:14px;background:#f1f5f9;color:#1b2a41}
    .atp-member-preferences strong{display:block;margin-bottom:10px;color:inherit}
    .atp-theme-toggle{border:1px solid #9aa9bd;border-radius:10px;padding:10px 13px;background:#fff;color:#17243a;font:700 12px Arial,sans-serif;cursor:pointer}
    .atp-theme-help{font-size:12px;color:#53647a}
    html[data-theme="dark"] .atp-member-preferences{background:#182638;border-color:#40536b;color:#f0f4fa}
    html[data-theme="dark"] .atp-theme-help{color:#c2cedd}
    html[data-theme="dark"] .atp-theme-toggle{background:#243449;color:#fff;border-color:#61748e}
    .goog-te-banner-frame,.skiptranslate iframe{display:none!important}
    body{top:0!important}
    .notranslate{translate:no!important}
    @media(max-width:760px){
      .site-header .nav-actions{gap:7px;flex-wrap:nowrap}
      .site-header .atp-preferences{margin:0!important}
      .site-header .atp-language-toggle{min-width:36px;height:32px}
    }
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

  const languageHost = document.querySelector(".nav-actions") || document.querySelector(".navigation,.nav-wrap,.services-topbar,.topbar .container,.topbar,header") || document.body;
  if (!languageHost.querySelector(".atp-preferences")) {
    const languageControl = document.createElement("div");
    languageControl.className = "atp-preferences";
    languageControl.innerHTML = '<button type="button" class="atp-language-toggle" aria-label="Changer de langue" title="Changer de langue"></button><div id="google_translate_element" hidden></div>';
    languageHost.appendChild(languageControl);
    const languageButton = languageControl.querySelector("button");
    const syncLanguage = () => {
      const french = currentLanguage() === "fr";
      languageButton.textContent = french ? "EN" : "FR";
      languageButton.setAttribute("aria-label",french?"Switch to English":"Passer en français");
    };
    languageButton.addEventListener("click", () => {
      const next = currentLanguage() === "fr" ? "en" : "fr";
      setLanguageCookie(next);
      if(next === "fr"){ location.reload(); return; }
      const combo = document.querySelector(".goog-te-combo");
      if(combo){combo.value="en";combo.dispatchEvent(new Event("change"));}
      syncLanguage();
    });
    syncLanguage();
  }

  window.googleTranslateElementInit = () => {
    if(!window.google?.translate?.TranslateElement)return;
    new google.translate.TranslateElement({pageLanguage:"fr",includedLanguages:"en,fr",autoDisplay:false}, "google_translate_element");
    if(currentLanguage()==="en"){
      const combo=document.querySelector(".goog-te-combo");
      if(combo){combo.value="en";combo.dispatchEvent(new Event("change"));}
    }
  };
  if (!document.querySelector('script[data-atp-translate]')) {
    const translateScript=document.createElement("script");
    translateScript.dataset.atpTranslate="true";
    translateScript.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    translateScript.async=true;
    document.head.appendChild(translateScript);
  }

  const addThemeControl = container => {
    if(!container || container.querySelector(".atp-member-preferences"))return;
    const panel=document.createElement("div");
    panel.className="atp-member-preferences";
    panel.innerHTML='<strong>Préférences d’affichage</strong><div class="atp-preferences"><button class="atp-theme-toggle" type="button"></button><span class="atp-theme-help">Ton choix est conservé sur cet appareil.</span></div>';
    const button=panel.querySelector("button");
    button.addEventListener("click",()=>applyTheme(document.documentElement.dataset.theme==="dark"?"light":"dark"));
    container.appendChild(panel);
    applyTheme(document.documentElement.dataset.theme==="dark"?"dark":"light");
  };
  addThemeControl(document.querySelector("#member-dashboard .member-profile-card"));
  addThemeControl(document.getElementById("academy-dashboard"));
})();
