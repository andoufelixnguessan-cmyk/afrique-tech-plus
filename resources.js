(()=>{"use strict";
const levels={
"6e":["Français","Mathématiques","Anglais","Histoire-Géographie","SVT","Physique-Chimie","EDHC","Arts plastiques","Éducation musicale","EPS","TICE"],
"5e":["Français","Mathématiques","Anglais","Histoire-Géographie","SVT","Physique-Chimie","EDHC","Arts plastiques","Éducation musicale","EPS","TICE"],
"4e":["Français","Mathématiques","Anglais","Histoire-Géographie","SVT","Physique-Chimie","EDHC","Arts plastiques","Éducation musicale","EPS","TICE","Allemand","Espagnol"],
"3e":["Français","Mathématiques","Anglais","Histoire-Géographie","SVT","Physique-Chimie","EDHC","Arts plastiques","Éducation musicale","EPS","TICE","Allemand","Espagnol"],
"Seconde A":["Français","Anglais","Histoire-Géographie","Mathématiques","Physique-Chimie","SVT","Arts plastiques / Éducation musicale","EPS","Allemand","Espagnol","TICE"],
"Seconde C":["Français","Anglais","Histoire-Géographie","Mathématiques","Physique-Chimie","SVT","Arts plastiques / Éducation musicale","EPS","Allemand","Espagnol","TICE"],
"Première A1":["Français","Anglais","Histoire-Géographie","Mathématiques","Philosophie","SVT","EPS","Allemand","Espagnol","TICE"],
"Première A2":["Français","Anglais","Histoire-Géographie","Mathématiques","Philosophie","SVT","EPS","Allemand","Espagnol","TICE"],
"Première C":["Français","Anglais","Histoire-Géographie","Mathématiques","Philosophie","Physique-Chimie","SVT","EPS","Allemand","Espagnol","TICE"],
"Première D":["Français","Anglais","Histoire-Géographie","Mathématiques","Philosophie","Physique-Chimie","SVT","EPS","Allemand","Espagnol","TICE"],
"Terminale A1":["Français","Anglais","Histoire-Géographie","Mathématiques","Philosophie","SVT","EPS","Allemand","Espagnol","TICE"],
"Terminale A2":["Français","Anglais","Histoire-Géographie","Mathématiques","Philosophie","SVT","EPS","Allemand","Espagnol","TICE"],
"Terminale C":["Français","Anglais","Histoire-Géographie","Mathématiques","Philosophie","Physique-Chimie","SVT","EPS","Allemand","Espagnol","TICE"],
"Terminale D":["Français","Anglais","Histoire-Géographie","Mathématiques","Philosophie","Physique-Chimie","SVT","EPS","Allemand","Espagnol","TICE"]
};
const icons={"Français":"📖","Mathématiques":"➗","Anglais":"🇬🇧","Histoire-Géographie":"🌍","SVT":"🌱","Physique-Chimie":"🧪","EDHC":"🤝","Arts plastiques":"🎨","Arts plastiques / Éducation musicale":"🎨","Éducation musicale":"🎵","EPS":"🏃","TICE":"💻","Allemand":"🇩🇪","Espagnol":"🇪🇸","Philosophie":"💭"};
const cls=document.getElementById("classSelect"),search=document.getElementById("subjectSearch"),grid=document.getElementById("subjectGrid");
Object.keys(levels).forEach(level=>{const o=document.createElement("option");o.value=level;o.textContent=level;cls.appendChild(o);});
const urls={dpfc:"https://dpfc-ci.net/documents/programmes-educatifs-et-guides-dexecution/programmes-educatifs-et-guides-dexecution-du-secondaire/",ecole:"https://ecoleivoire.site/",fomesoutra:"https://www.fomesoutra.com/cours/secondaire"};
function render(){const level=cls.value,term=search.value.trim().toLocaleLowerCase("fr");const subjects=levels[level].filter(s=>s.toLocaleLowerCase("fr").includes(term));document.getElementById("subjectTitle").textContent="Ressources de "+level;document.getElementById("subjectCount").textContent=subjects.length+" matière(s) affichée(s) · sélectionne une source pour consulter les documents.";grid.replaceChildren();if(!subjects.length){const empty=document.createElement("div");empty.className="lib-empty";empty.textContent="Aucune matière ne correspond à cette recherche.";grid.appendChild(empty);return;}subjects.forEach(subject=>{const card=document.createElement("article");card.className="lib-subject";const top=document.createElement("div");top.className="lib-subject-top";const ico=document.createElement("div");ico.className="lib-subject-icon";ico.textContent=icons[subject]||"📚";const h=document.createElement("h3");h.textContent=subject;top.append(ico,h);const links=document.createElement("div");links.className="lib-links";[[ "Programme officiel DPFC",urls.dpfc],[ "Cours et leçons",urls.ecole],[ "Cours et exercices PDF",urls.fomesoutra]].forEach(([label,url])=>{const a=document.createElement("a");a.className="lib-link";a.href=url;a.target="_blank";a.rel="noopener";a.textContent=label+" ↗";links.appendChild(a);});card.append(top,links);grid.appendChild(card);});}
cls.addEventListener("change",render);search.addEventListener("input",render);render();
})();