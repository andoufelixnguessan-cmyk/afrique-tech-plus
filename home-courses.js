(() => {
  "use strict";
  const track=document.getElementById("home-course-track");
  const status=document.getElementById("home-course-status");
  const dots=document.getElementById("course-dots");
  const prev=document.getElementById("course-prev");
  const next=document.getElementById("course-next");
  if(!track||!status)return;
  let cards=[],active=0,timer=null;
  const escape=value=>String(value||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const setStatus=msg=>{track.innerHTML='<p class="course-loading">'+escape(msg)+'</p>';status.textContent=msg;};
  const render=course=>{
    const premium=course.access_type!=="free";
    const card=document.createElement("article");
    card.className="video-course-card"+(premium?" is-premium":"");
    card.innerHTML='<a class="video-course-link" href="academy.html#formations" aria-label="Découvrir '+escape(course.title)+'"><div class="video-course-cover"><span class="video-course-label">'+(premium?"FORMATION PREMIUM":"FORMATION GRATUITE")+'</span><span class="video-play" aria-hidden="true">▶</span><span class="video-course-brand">AFRIQUE TECH PLUS ACADEMY</span></div><div class="video-course-info"><h3>'+escape(course.title||"Formation ATP")+'</h3><p>'+escape(course.description||"Développe tes compétences avec cette formation.")+'</p><span class="video-course-meta">'+escape(course.level||"Tous niveaux")+' · '+Number(course.modules_count||0)+' module(s)</span></div></a>';
    return card;
  };
  const show=index=>{
    if(!cards.length)return;
    active=(index+cards.length)%cards.length;
    track.style.transform='translateX(-'+(active*100)+'%)';
    dots?.querySelectorAll("button").forEach((dot,i)=>{dot.classList.toggle("active",i===active);dot.setAttribute("aria-current",i===active?"true":"false");});
  };
  const stop=()=>{if(timer)window.clearInterval(timer);timer=null;};
  const start=()=>{stop();if(cards.length>1&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches)timer=window.setInterval(()=>show(active+1),5200);};
  prev?.addEventListener("click",()=>{show(active-1);start();});
  next?.addEventListener("click",()=>{show(active+1);start();});
  document.getElementById("home-course-carousel")?.addEventListener("mouseenter",stop);
  document.getElementById("home-course-carousel")?.addEventListener("mouseleave",start);
  document.addEventListener("visibilitychange",()=>document.hidden?stop():start());
  async function load(){
    const cfg=window.ATP_CONFIG;
    if(!window.supabase?.createClient||!cfg?.supabaseUrl||!cfg?.supabasePublishableKey)return setStatus("Catalogue temporairement indisponible.");
    try{
      const db=window.supabase.createClient(cfg.supabaseUrl,cfg.supabasePublishableKey);
      const {data,error}=await db.from("academy_courses").select("id,title,description,level,access_type,modules_count,slug,created_at").eq("is_published",true).order("created_at",{ascending:false});
      if(error)throw error;
      const all=data||[];
      const selected=[...all.filter(c=>c.access_type==="free").slice(0,2),...all.filter(c=>c.access_type!=="free").slice(0,2)];
      if(selected.length!==4){
        setStatus("Les 4 emplacements seront affichés dès que 2 formations gratuites et 2 premium seront publiées dans Academy.");
        return;
      }
      track.replaceChildren();selected.forEach(c=>track.appendChild(render(c)));
      cards=[...track.children];
      if(dots){dots.replaceChildren();cards.forEach((_,i)=>{const b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Afficher la formation "+(i+1));b.addEventListener("click",()=>{show(i);start();});dots.appendChild(b);});}
      status.textContent="2 formations gratuites et 2 formations premium · Défilement automatique";
      show(0);start();
    }catch(error){console.error("Chargement des formations à la une :",error);setStatus("Impossible de charger les formations pour le moment.");}
  }
  load();
})();