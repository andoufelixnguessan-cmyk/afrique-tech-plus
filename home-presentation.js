(()=>{
  const root=document.getElementById('atp-film-player'); if(!root)return;
  const scenes=[
    ["Le savoir et les opportunités, accessibles à tous.","AFRIQUE TECH PLUS est né d'une ambition : rendre l'apprentissage et les outils numériques plus accessibles pour aider chacun à construire son avenir.","A+","🌍","APPRENDRE","💡","INNOVER","🤝","AVANCER"],
    ["Développe des compétences utiles avec ACADEMY.","Des formations pratiques pour apprendre le design, la programmation, le web et les compétences numériques à ton rythme.","A","🎨","DESIGN","💻","PROGRAMMER","🚀","CRÉER"],
    ["Réussis tes études avec ATP SCHOOL.","Des cours et des ressources scolaires organisés pour accompagner les élèves dans leur apprentissage.","S","📚","APPRENDRE","✏️","RÉVISER","🎓","RÉUSSIR"],
    ["Des ressources pour passer à l'action.","La boutique propose des guides numériques pour apprendre, créer et lancer tes propres projets.","G","📘","GUIDES","🧭","PROGRESSER","🛠️","APPLIQUER"],
    ["L'intelligence et l'information à portée de main.","ATP AI, ATP MEDIA et nos prestations t'aident à découvrir les outils, comprendre le numérique et concrétiser tes idées.","AI","🤖","INTELLIGENCE","📰","S'INFORMER","⚙️","AGIR"],
    ["Une communauté pour progresser ensemble.","AFRIQUE TECH PLUS rassemble apprentissage, entraide et opportunités. Apprendre, créer et évoluer : construisons la suite ensemble.","🤝","💬","ÉCHANGER","🌱","GRANDIR","✨","ÉVOLUER"]
  ];
  const title=document.getElementById('atp-film-scene-title');
  const desc=document.getElementById('atp-film-scene-text');
  const step=document.getElementById('atp-film-step');
  const emblem=root.querySelector('.atp-film-emblem');
  const floats=[root.querySelector('.atp-film-float-one'),root.querySelector('.atp-film-float-two'),root.querySelector('.atp-film-float-three')];
  let index=0;
  const render=()=>{
    const s=scenes[index];
    root.dataset.scene=String(index+1);
    title.textContent=s[0]; desc.textContent=s[1];
    step.textContent=String(index+1).padStart(2,'0')+' / 06';
    emblem.textContent=s[2];
    floats.forEach((el,i)=>{if(el)el.innerHTML=s[3+i*2]+' <b>'+s[4+i*2]+'</b>';});
  };
  render();
  window.setInterval(()=>{index=(index+1)%scenes.length;render();},5200);
})();