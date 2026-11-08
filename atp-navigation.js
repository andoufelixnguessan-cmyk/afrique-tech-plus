(()=>{
 "use strict";
 const path=(location.pathname.split("/").pop()||"index.html").toLowerCase();
 const pages=[
  ["academy.html","Academy","Formations numériques"],
  ["resources.html","Ressources scolaires","Cours, manuels et documents PDF"],
  ["store.html","Boutique","Guides et produits"],
  ["ai.html","AI","Outils intelligents"],
  ["media.html","Media","Articles et tutoriels"],
  ["services.html","Prestations","Services numériques"],
  ["community.html","Community","Échanges et entraide"]
 ];
 function activateDropdown(header){
  if(!header)return;
  const dropdown=header.querySelector(".nav-dropdown");
  const button=header.querySelector(".services-toggle");
  const menu=header.querySelector(".services-menu");
  if(!dropdown||!button||!menu)return;
  const close=()=>{menu.hidden=true;dropdown.classList.remove("is-open");button.setAttribute("aria-expanded","false");};
  const open=()=>{menu.hidden=false;dropdown.classList.add("is-open");button.setAttribute("aria-expanded","true");};
  close();
  button.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();menu.hidden?open():close();});
  menu.addEventListener("click",event=>{if(event.target.closest("a"))close();});
  document.addEventListener("click",event=>{if(!dropdown.contains(event.target))close();});
  document.addEventListener("keydown",event=>{if(event.key==="Escape")close();});
 }
 // L'accueil reste intact et sert de modèle visuel.
 if(path==="index.html"){activateDropdown(document.querySelector("body > .site-header"));return;}
 // Supprime uniquement les anciens en-têtes de navigation, jamais les titres d'articles.
 document.querySelectorAll("body header.site-header,body header.topbar,body header.ai-topbar,body header.community-topbar,body header.media-topbar,body header.services-topbar,body header.store-topbar").forEach(el=>el.remove());
 const header=document.createElement("header");
 header.className="site-header atp-unified-header";
 header.innerHTML='<div class="container nav-wrap">'+
  '<a class="brand" href="index.html" aria-label="AFRIQUE TECH PLUS accueil"><img class="brand-logo" src="assets/atp-emblem.svg" alt="Emblème AFRIQUE TECH PLUS"><span class="brand-name">AFRIQUE TECH PLUS<small>APPRENDRE · CRÉER · ÉVOLUER</small></span></a>'+
  '<nav class="main-nav atp-unified-nav" aria-label="Navigation principale"><a href="index.html">Accueil</a>'+
  '<div class="nav-dropdown" id="services-dropdown"><button class="services-toggle" id="services-toggle" type="button" aria-expanded="false" aria-controls="services-menu">Services <span aria-hidden="true">⌄</span></button>'+
  '<div class="services-menu" id="services-menu" hidden>'+pages.map(([href,label,desc])=>'<a href="'+href+'"'+(path===href?' aria-current="page"':'')+'>'+label+' <small>'+desc+'</small></a>').join("")+'</div></div></nav></div>';
 document.body.insertBefore(header,document.body.firstChild);
 activateDropdown(header);
})();