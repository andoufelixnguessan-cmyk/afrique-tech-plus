(() => {
  "use strict";

  // AFRIQUE TECH PLUS utilise un affichage clair unique.
  // Supprime aussi l'ancien choix de thème éventuellement mémorisé.
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.style.colorScheme = "light";
  try { localStorage.removeItem("atp-theme-mode"); } catch (_) {}

  const cookieValue = name => (document.cookie.split("; ").find(row => row.startsWith(name + "=")) || "").split("=").slice(1).join("=");
  const currentLanguage = () => decodeURIComponent(cookieValue("googtrans") || "").endsWith("/en") ? "en" : "fr";
  const setLanguageCookie = lang => {
    const value = "/fr/" + lang;
    document.cookie = "googtrans=" + value + ";path=/;max-age=31536000;SameSite=Lax";
    if (location.hostname) document.cookie = "googtrans=" + value + ";path=/;domain=" + location.hostname + ";max-age=31536000;SameSite=Lax";
  };

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
    const control = document.createElement("div");
    control.className = "atp-preferences";
    control.innerHTML = '<button type="button" class="atp-language-toggle" aria-label="Changer de langue" title="Changer de langue"></button><div id="google_translate_element" hidden></div>';
    languageHost.appendChild(control);
    const button = control.querySelector(".atp-language-toggle");
    const sync = () => {
      const french = currentLanguage() === "fr";
      button.textContent = french ? "EN" : "FR";
      button.setAttribute("aria-label",french ? "Switch to English" : "Passer en français");
      button.title = button.getAttribute("aria-label");
    };
    button.addEventListener("click", () => {
      const next = currentLanguage() === "fr" ? "en" : "fr";
      setLanguageCookie(next);
      if(next === "fr"){ location.reload(); return; }
      const combo = document.querySelector(".goog-te-combo");
      if(combo){combo.value="en";combo.dispatchEvent(new Event("change"));}
      sync();
    });
    sync();
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
    const script=document.createElement("script");
    script.dataset.atpTranslate="true";
    script.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async=true;
    document.head.appendChild(script);
  }

  const style=document.createElement("style");
  style.textContent=`
    .atp-preferences{display:inline-flex;align-items:center;gap:7px;flex:0 0 auto}
    .atp-language-toggle{display:inline-flex;align-items:center;justify-content:center;min-width:40px;height:34px;padding:0 10px;border:1px solid #d7dfeb;border-radius:9px;background:#fff;color:#263b58;font:800 11px Arial,sans-serif;cursor:pointer}
    .atp-language-toggle:hover{background:#f1f5fa}
    @media(max-width:760px){.site-header .atp-preferences{margin:0!important}.site-header .atp-language-toggle{min-width:36px;height:32px}}
  `;
  document.head.appendChild(style);
})();
