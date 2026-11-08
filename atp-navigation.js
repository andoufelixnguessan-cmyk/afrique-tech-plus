(()=>{
 const current=(location.pathname.split("/").pop()||"index.html").toLowerCase();
 const items=[["academy.html","Academy","Formations numériques"],["school.html","ATP School","Cours scolaires"],["store.html","Boutique","Guides et produits"],["ai.html","ATP AI","Outils intelligents"],["media.html","ATP Media","Articles et tutoriels"],["services.html","Prestations","Services numériques"],["community.html","Community","Échanges et entraide"]];
 const markReturns=()=>document.querySelectorAll("a,button").forEach(el=>{const t=(el.textContent||"").trim().toLowerCase();if(/retour|accueil/.test(t)&&!el.closest(".atp-global-menu"))el.classList.add("atp-back-control");});
 const observer=new MutationObserver(()=>markReturns());
 observer.observe(document.body,{childList:true,subtree:true});
 const host=document.querySelector("header")||document.querySelector(".topbar")||document.querySelector("aside");
 if(!host)return;
 const existing=host.querySelector(".services-menu");
 if(existing){existing.querySelectorAll("a").forEach(a=>{if(a.getAttribute("href")===current)a.remove();});markReturns();return;}
 if(host.querySelector(".atp-global-dropdown")){markReturns();return;}
 const wrap=document.createElement("div");wrap.className="atp-global-dropdown";
 const btn=document.createElement("button");btn.type="button";btn.className="atp-global-toggle";btn.textContent="Services  ⌄";btn.setAttribute("aria-expanded","false");
 const menu=document.createElement("div");menu.className="atp-global-menu";menu.hidden=true;
 const placeMenu=()=>{
  if(menu.hidden)return;
  if(window.innerWidth<=760){
   const rect=btn.getBoundingClientRect();
   const width=Math.min(290,window.innerWidth-24);
   const left=Math.max(12,Math.min(rect.left,window.innerWidth-width-12));
   const maxHeight=Math.max(180,window.innerHeight-rect.bottom-24);
   menu.style.setProperty("position","fixed","important");
   menu.style.setProperty("top",Math.max(8,Math.min(rect.bottom+7,window.innerHeight-120))+"px","important");
   menu.style.setProperty("left",left+"px","important");
   menu.style.setProperty("right","auto","important");
   menu.style.setProperty("width",width+"px","important");
   menu.style.setProperty("max-width",width+"px","important");
   menu.style.setProperty("max-height",Math.min(620,maxHeight)+"px","important");
   menu.style.setProperty("overflow-y","auto","important");
   menu.style.setProperty("transform","none","important");
   menu.style.setProperty("z-index","10050","important");
  }else{
   ["position","top","left","right","width","max-width","max-height","overflow-y","transform","z-index"].forEach(k=>menu.style.removeProperty(k));
  }
 };
 items.filter(([href])=>href!==current).forEach(([href,label,desc])=>{const a=document.createElement("a");a.href=href;a.innerHTML="<strong></strong><small></small>";a.querySelector("strong").textContent=label;a.querySelector("small").textContent=desc;menu.appendChild(a);});
 btn.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();menu.hidden=!menu.hidden;btn.setAttribute("aria-expanded",String(!menu.hidden));if(!menu.hidden)placeMenu();});
 window.addEventListener("resize",placeMenu);
 window.addEventListener("scroll",placeMenu,true);
 document.addEventListener("click",e=>{if(!wrap.contains(e.target)){menu.hidden=true;btn.setAttribute("aria-expanded","false");}});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){menu.hidden=true;btn.setAttribute("aria-expanded","false");}});
 wrap.append(btn,menu);const nav=host.querySelector("nav");
 if(nav)nav.appendChild(wrap);else if(host.matches("aside")){const brand=host.querySelector(".brand");if(brand)brand.insertAdjacentElement("afterend",wrap);else host.prepend(wrap);}else host.appendChild(wrap);
 markReturns();
})();