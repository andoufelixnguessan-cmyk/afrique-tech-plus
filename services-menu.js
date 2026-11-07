(() => {
 const menu=document.getElementById("services-menu");
 const toggle=document.getElementById("services-toggle");
 const dropdown=document.getElementById("services-dropdown");
 const nav=document.getElementById("main-nav");
 if(!menu||!toggle||!dropdown)return;
 const close=()=>{menu.hidden=true;dropdown.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");};
 toggle.addEventListener("click",event=>{event.stopPropagation();const open=menu.hidden;menu.hidden=!open;dropdown.classList.toggle("is-open",open);toggle.setAttribute("aria-expanded",String(open));});
 document.addEventListener("click",event=>{if(!dropdown.contains(event.target))close();});
 document.addEventListener("keydown",event=>{if(event.key==="Escape")close();});
 menu.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{close();nav?.classList.remove("open");}));
 nav?.querySelectorAll(":scope > a").forEach(link=>link.addEventListener("click",()=>nav.classList.remove("open")));
})();