(()=>{
  const root=document.getElementById("atp-film-player"); if(!root)return;
  const scenes=[
    ["Le savoir et les opportunités, accessibles à tous.","AFRIQUE TECH PLUS est né d'une ambition : rendre l'apprentissage et les outils numériques plus accessibles pour aider chacun à construire son avenir.","A+","🌍","APPRENDRE","💡","INNOVER","🤝","AVANCER"],
    ["Développe des compétences utiles avec ACADEMY.","Des formations pratiques pour apprendre le design, la programmation, le web et les compétences numériques à ton rythme.","A","🎨","DESIGN","💻","PROGRAMMER","🚀","CRÉER"],
    ["Réussis tes études avec les ressources scolaires.","Des cours et des ressources scolaires organisés pour accompagner les élèves dans leur apprentissage.","S","📚","APPRENDRE","✏️","RÉVISER","🎓","RÉUSSIR"],
    ["Des ressources pour passer à l'action.","La boutique propose des guides numériques pour apprendre, créer et lancer tes propres projets.","G","📘","GUIDES","🧭","PROGRESSER","🛠️","APPLIQUER"],
    ["L'intelligence et l'information à portée de main.","ATP AI, ATP MEDIA et nos prestations t'aident à découvrir les outils, comprendre le numérique et concrétiser tes idées.","AI","🤖","INTELLIGENCE","📰","S'INFORMER","⚙️","AGIR"],
    ["Une communauté pour progresser ensemble.","AFRIQUE TECH PLUS rassemble apprentissage, entraide et opportunités. Apprendre, créer et évoluer : construisons la suite ensemble.","🤝","💬","ÉCHANGER","🌱","GRANDIR","✨","ÉVOLUER"]
  ];
  const title=document.getElementById("atp-film-scene-title");
  const desc=document.getElementById("atp-film-scene-text");
  const step=document.getElementById("atp-film-step");
  const emblem=root.querySelector(".atp-film-emblem");
  const floats=[root.querySelector(".atp-film-float-one"),root.querySelector(".atp-film-float-two"),root.querySelector(".atp-film-float-three")];
  const toggle=document.getElementById("atp-film-toggle");
  const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
  let index=0,timer=null,pausedByUser=false,resumeAfterVisibility=false;
  const render=()=>{
    const s=scenes[index];
    root.dataset.scene=String(index+1);
    if(title)title.textContent=s[0];
    if(desc)desc.textContent=s[1];
    if(step)step.textContent=String(index+1).padStart(2,"0")+" / 06";
    if(emblem)emblem.textContent=s[2];
    floats.forEach((el,i)=>{
      if(!el)return;
      const label=document.createElement("b");
      label.textContent=s[4+i*2];
      el.replaceChildren(document.createTextNode(s[3+i*2]+" "),label);
    });
  };
  const syncToggle=()=>{
    if(!toggle)return;
    const running=timer!==null;
    toggle.textContent=running?"Mettre en pause":(index===0&&motion.matches?"Lancer l'animation":"Reprendre l'animation");
    toggle.setAttribute("aria-pressed",String(!running));
  };
  const stop=()=>{
    if(timer!==null)window.clearInterval(timer);
    timer=null;
    syncToggle();
  };
  const start=(explicit=false)=>{
    if(timer!==null)window.clearInterval(timer);
    if(document.hidden|| (motion.matches&&!explicit)){timer=null;syncToggle();return;}
    timer=window.setInterval(()=>{index=(index+1)%scenes.length;render();},5200);
    syncToggle();
  };
  render();
  if(!motion.matches)start();
  else syncToggle();
  toggle?.addEventListener("click",()=>{
    if(timer!==null){pausedByUser=true;stop();}
    else{pausedByUser=false;start(true);}
  });
  document.addEventListener("visibilitychange",()=>{
    if(document.hidden){resumeAfterVisibility=timer!==null;stop();}
    else if(resumeAfterVisibility&&!pausedByUser){resumeAfterVisibility=false;start();}
  });
  const onMotionChange=()=>{
    if(motion.matches){stop();}
    else if(!pausedByUser&&!document.hidden)start();
  };
  motion.addEventListener?.("change",onMotionChange);
})();