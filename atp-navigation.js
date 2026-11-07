(()=>{
 const current=(location.pathname.split("/").pop()||"index.html").toLowerCase();
 const items=[["academy.html","Academy","Formations numériques"],["school.html","ATP School","Cours scolaires"],["store.html","Boutique","Guides et produits"],["ai.html","ATP AI","Outils intelligents"],["media.html","ATP Media","Articles et tutoriels"],["services.html","Prestations","Services numériques"],["community.html","Community","Échanges et entraide"]];
 const markReturns=()=>document.querySelectorAll("a,button").forEach(el=>{const t=(el.textContent||"").trim().toLowerCase();if(/retour|accueil/.test(t)&&!el.closest(".atp-global-menu"))el.classList.add("atp-back-control");});
 const host=document.querySelector("header")||document.querySelector(".topbar")||document.querySelector("aside");
 if(!host)return;
 const existing=host.querySelector(".services-menu");
 if(existing){existing.querySelectorAll("a").forEach(a=>{if(a.getAttribute("href")===current)a.remove();});markReturns();return;}
 if(host.querySelector(".atp-global-dropdown")){markReturns();return;}
 const wrap=document.createElement("div");wrap.className="atp-global-dropdown";
 const btn=document.createElement("button");btn.type="button";btn.className="atp-global-toggle";btn.textContent="Services  ⌄";btn.setAttribute("aria-expanded","false");
 const menu=document.createElement("div");menu.className="atp-global-menu";menu.hidden=true;
 items.filter(([href])=>href!==current).forEach(([href,label,desc])=>{const a=document.createElement("a");a.href=href;a.innerHTML="<strong></strong><small></small>";a.querySelector("strong").textContent=label;a.querySelector("small").textContent=desc;menu.appendChild(a);});
 btn.addEventListener("click",e=>{e.stopPropagation();menu.hidden=!menu.hidden;btn.setAttribute("aria-expanded",String(!menu.hidden));});
 document.addEventListener("click",e=>{if(!wrap.contains(e.target)){menu.hidden=true;btn.setAttribute("aria-expanded","false");}});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){menu.hidden=true;btn.setAttribute("aria-expanded","false");}});
 wrap.append(btn,menu);const nav=host.querySelector("nav");
 if(nav)nav.appendChild(wrap);else if(host.matches("aside")){const brand=host.querySelector(".brand");if(brand)brand.insertAdjacentElement("afterend",wrap);else host.prepend(wrap);}else host.appendChild(wrap);
 markReturns();
})();