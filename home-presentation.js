(()=>{
  const root=document.getElementById('atp-film-player'); if(!root)return;
  const scenes=[
    ["Le savoir et les opportunités, accessibles à tous.","AFRIQUE TECH PLUS est né d'une ambition : rendre l'apprentissage et les outils numériques plus accessibles pour aider chacun à construire son avenir."],
    ["Développe des compétences utiles avec ACADEMY.","Des formations pratiques pour apprendre le design, la programmation, le web et les compétences numériques à ton rythme."],
    ["Réussis tes études avec ATP SCHOOL.","Des cours et des ressources scolaires organisés pour accompagner les élèves dans leur apprentissage."],
    ["Des ressources pour passer à l'action.","La boutique propose des guides numériques pour apprendre, créer et lancer tes propres projets."],
    ["L'intelligence et l'information à portée de main.","ATP AI, ATP MEDIA et nos prestations t'aident à découvrir les outils, comprendre le numérique et concrétiser tes idées."],
    ["Une communauté pour progresser ensemble.","AFRIQUE TECH PLUS rassemble apprentissage, entraide et opportunités. Apprendre, créer et évoluer : construisons la suite ensemble."]
  ];
  const title=document.getElementById('atp-film-scene-title'),desc=document.getElementById('atp-film-scene-text'),step=document.getElementById('atp-film-step'),bar=document.getElementById('atp-film-progress'),toggle=document.getElementById('atp-film-toggle'),sound=document.getElementById('atp-film-sound');
  let index=0,playing=true,audioOn=false,ctx=null,interval=null;
  const render=()=>{title.textContent=scenes[index][0];desc.textContent=scenes[index][1];step.textContent=String(index+1).padStart(2,'0')+' / 06';bar.style.width=((index+1)/scenes.length*100)+'%';};
  const tick=()=>{index=(index+1)%scenes.length;render();if(audioOn)chime();};
  const start=()=>{if(interval)clearInterval(interval);interval=setInterval(tick,5200);playing=true;toggle.textContent='Ⅱ Pause';toggle.setAttribute('aria-label','Mettre en pause la présentation');};
  const pause=()=>{if(interval)clearInterval(interval);interval=null;playing=false;toggle.textContent='▶ Lire';toggle.setAttribute('aria-label','Lire la présentation');};
  function chime(){try{if(!ctx)ctx=new(window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume();const now=ctx.currentTime;[523.25,659.25].forEach((freq,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.035,now+.04);g.gain.exponentialRampToValueAtTime(.0001,now+.55);o.connect(g);g.connect(ctx.destination);o.start(now+i*.12);o.stop(now+.6+i*.12);});}catch(e){}}
  toggle.addEventListener('click',()=>playing?pause():start());
  sound.addEventListener('click',()=>{audioOn=!audioOn;sound.textContent=audioOn?'♪ Son activé':'♪ Activer le son';sound.setAttribute('aria-pressed',String(audioOn));if(audioOn)chime();});
  render();start();
})();