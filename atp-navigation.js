(()=>{
 const current=(location.pathname.split("/").pop()||"index.html").toLowerCase();
 const items=[
  ["academy.html","Academy","Formations numériques"],
  ["resources.html","Ressources scolaires","Cours, manuels et PDF"],
  ["store.html","Boutique","Guides et produits"],
  ["ai.html","ATP AI","Outils intelligents"],
  ["media.html","ATP Media","Articles et tutoriels"],
  ["services.html","Prestations","Services numériques"],
  ["community.html","Community","Échanges et entraide"]
 ];
 const makeMenu=(menu)=>{
  menu.replaceChildren();
  items.filter(([href])=>href!==current).forEach(([href,label,desc])=>{
   const a=document.createElement("a");a.href=href;
   const strong=document.createElement("strong");strong.textContent=label;
   const small=document.createElement("small");small.textContent=desc;
   a.append(strong,small);menu.appendChild(a);
  });
 };
 const bind=(dropdown,button,menu)=>{
  if(button.dataset.atpBound==="1")return;
  button.dataset.atpBound="1";
  const close=()=>{menu.hidden=true;dropdown.classList.remove("is-open");button.setAttribute("aria-expanded","false");};
  const open=()=>{menu.hidden=false;dropdown.classList.add("is-open");button.setAttribute("aria-expanded","true");};
  close();
  button.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();menu.hidden?open():close();});
  menu.addEventListener("click",e=>{if(e.target.closest("a")){close();document.querySelector(".main-nav")?.classList.remove("open");document.getElementById("mobile-menu")?.setAttribute("aria-expanded","false");}});
  document.addEventListener("click",e=>{if(!dropdown.contains(e.target))close();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
 };
 let host=document.querySelector("body > header");
 if(!host){
  host=document.createElement("header");host.className="atp-injected-header";
  const brand=document.createElement("a");brand.className="atp-injected-brand";brand.href="index.html";
  const img=document.createElement("img");img.className="brand-logo";img.src="assets/atp-emblem.svg";img.alt="";
  const name=document.createElement("span");name.textContent="AFRIQUE TECH PLUS";
  const tagline=document.createElement("small");tagline.textContent="APPRENDRE · CRÉER · ÉVOLUER";name.appendChild(tagline);
  brand.append(img,name);host.appendChild(brand);
  const home=document.createElement("a");home.className="atp-back-control";home.href="index.html";home.textContent="← Accueil";host.appendChild(home);
  document.body.prepend(host);
 }
 let dropdown=host.querySelector(".nav-dropdown,.atp-global-dropdown");
 let menu=dropdown?.querySelector(".services-menu,.atp-global-menu");
 let button=dropdown?.querySelector(".services-toggle,.atp-global-toggle");
 if(dropdown&&menu&&button){
  makeMenu(menu);bind(dropdown,button,menu);
 }else{
  dropdown=document.createElement("div");dropdown.className="atp-global-dropdown";
  button=document.createElement("button");button.type="button";button.className="atp-global-toggle";button.textContent="Services  ⌄";button.setAttribute("aria-expanded","false");
  menu=document.createElement("div");menu.className="atp-global-menu";menu.hidden=true;makeMenu(menu);dropdown.append(button,menu);
  let nav=host.querySelector("nav");
  if(!nav){
   nav=document.createElement("nav");nav.className="atp-global-nav";
   const back=Array.from(host.querySelectorAll("a")).find(a=>a!==host.querySelector(".atp-injected-brand")&&(/index\.html|accueil|retour/i.test((a.getAttribute("href")||"")+" "+a.textContent)));
   if(back)host.insertBefore(nav,back);else host.appendChild(nav);
  }
  nav.appendChild(dropdown);bind(dropdown,button,menu);
 }
 const markReturns=()=>{
  document.querySelectorAll("a,button").forEach(el=>{
   const t=(el.textContent||"").trim().toLowerCase(),href=(el.getAttribute("href")||"").toLowerCase();
   if((/retour/.test(t)||((href==="index.html"||href==="./index.html")&&el.closest("header")&&!el.closest("nav,.main-nav,.nav-links,.atp-global-menu")))&&!el.closest(".atp-global-menu"))el.classList.add("atp-back-control");
  });
 };
 markReturns();
 new MutationObserver(markReturns).observe(document.body,{childList:true,subtree:true});
})();