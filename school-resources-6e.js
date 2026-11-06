/* ATP SCHOOL — accès aux cours et fiches pédagogiques externes vérifiés
 * Les documents restent hébergés par leurs éditeurs (Fomesoutra / DPFC).
 * ATP SCHOOL ouvre les pages sources sans recopier leurs fichiers protégés.
 */
(function () {
  "use strict";

  const FOMESOUTRA = "https://www.fomesoutra.com";
  const DPFC = "https://dpfc-ci.net/documents/programmes-educatifs-et-guides-dexecution/programmes-educatifs-et-guides-dexecution-du-secondaire/";

  const SOURCES = {
    "svt": {
      title: "Cours de SVT — 6e",
      url: FOMESOUTRA + "/cours/secondaire/6eme/svt",
      detail: "Fiches sur l'observation des êtres vivants, l'environnement, les graines, la germination et la reproduction."
    },
    "edhc": {
      title: "Cours d'EDHC — 6e",
      url: FOMESOUTRA + "/cours/secondaire/6eme/cours-de-edhc-6eme",
      detail: "Fiches sur les droits de l'enfant, la citoyenneté, la Constitution, la sécurité routière, la santé et le cadre de vie."
    },
    "physique chimie": {
      title: "Cours de Physique-Chimie — 6e",
      url: FOMESOUTRA + "/cours/secondaire/6eme/cours-de-physique-chimie-6eme",
      detail: "Cours complets et leçons sur les circuits électriques, les solides, les liquides, les gaz, l'eau et les mesures."
    },
    "mathematiques": {
      title: "Cours de Mathématiques — 6e",
      url: FOMESOUTRA + "/cours/secondaire/6eme/cours-de-mathematiques-6eme",
      detail: "Cours APC, leçons détaillées, exercices et documents sur les nombres, la géométrie, la proportionnalité et les statistiques."
    },
    "histoire-geographie": {
      title: "Cours d'Histoire-Géographie — 6e",
      url: FOMESOUTRA + "/cours/secondaire/6eme/cours-d-histoire-et-geographie-6eme",
      detail: "Fiches d'histoire et de géographie consacrées notamment à la Côte d'Ivoire."
    },
    "francais": {
      title: "Cours de Français — 6e",
      url: FOMESOUTRA + "/cours/secondaire/6eme/cours-de-francais-6ieme-by-tehua",
      detail: "Fiches de leçons, grammaire, orthographe, lecture et expression écrite."
    },
    "anglais": {
      title: "Cours d'Anglais — 6e",
      url: FOMESOUTRA + "/espace-prof/prof-danglais",
      detail: "Documents d'anglais 6e, cours complets, fiches pédagogiques et worksheets."
    },
    "eps": {
      title: "Cours d'EPS — 6e",
      url: FOMESOUTRA + "/cours/secondaire/6eme/cours-eps-apc",
      detail: "Leçons sur les efforts, les sauts, les techniques sportives et les sports collectifs."
    },
    "arts plastiques": {
      title: "Cours d'Arts plastiques — 6e",
      url: FOMESOUTRA + "/cours/secondaire/6eme/cours-arts-plastiques-6ieme-apc",
      detail: "Fiches sur le matériel graphique, les agents graphiques, les techniques et les œuvres d'art."
    },
    "education musicale": {
      title: "Cours d'Éducation musicale — 6e",
      url: FOMESOUTRA + "/cours/secondaire/6eme/cours-deducation-musicale-6ieme-apc",
      detail: "Fiches sur les notes, les rythmes et les familles d'instruments."
    },
    "tic": {
      title: "Cours de TIC — 6e",
      url: FOMESOUTRA + "/cours/secondaire/6eme/cours-technologie-de-linformation-et-de-la-communication-6ieme-apc",
      detail: "Dossier de leçons TIC de 6e (documents PDF numérotés)."
    },
    "tice": {
      title: "Cours de TIC — 6e",
      url: FOMESOUTRA + "/cours/secondaire/6eme/cours-technologie-de-linformation-et-de-la-communication-6ieme-apc",
      detail: "Dossier de leçons TIC de 6e (documents PDF numérotés)."
    }
  };

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function findSource(subject) {
    const key = normalize(subject);
    const entries = Object.entries(SOURCES);
    for (const [name, source] of entries) {
      if (key === normalize(name) || key.includes(normalize(name)) || normalize(name).includes(key)) {
        return source;
      }
    }
    return null;
  }

  function render(parent, subject) {
    const source = findSource(subject);
    if (!parent || !source || parent.querySelector(".atp-source-resources")) return;

    const panel = document.createElement("section");
    panel.className = "atp-source-resources";
    panel.style.cssText = "margin-top:18px;padding:16px;border:1px solid #cbd8ed;border-radius:14px;background:#f4f8ff";

    const heading = document.createElement("strong");
    heading.textContent = "📚 Documents de cours disponibles en ligne";
    heading.style.cssText = "display:block;margin-bottom:7px;color:#203452";
    panel.appendChild(heading);

    const description = document.createElement("p");
    description.textContent = source.detail;
    description.style.cssText = "margin:0 0 12px;color:#536582;line-height:1.55;font-size:13px";
    panel.appendChild(description);

    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Ouvrir les cours et fiches PDF sur Fomesoutra ↗";
    link.style.cssText = "display:inline-flex;align-items:center;padding:10px 13px;border-radius:9px;background:#2864d8;color:#fff;text-decoration:none;font-weight:700;font-size:13px";
    panel.appendChild(link);

    const official = document.createElement("a");
    official.href = DPFC;
    official.target = "_blank";
    official.rel = "noopener noreferrer";
    official.textContent = "Consulter aussi les programmes officiels DPFC ↗";
    official.style.cssText = "display:block;margin-top:10px;color:#245bc1;font-size:12px;font-weight:600";
    panel.appendChild(official);

    const note = document.createElement("small");
    note.textContent = "Les fichiers s'ouvrent sur leur site d'origine. Leur disponibilité dépend du site source.";
    note.style.cssText = "display:block;margin-top:9px;color:#71809a;font-size:11px;line-height:1.4";
    panel.appendChild(note);

    parent.appendChild(panel);
  }

  window.ATP_SCHOOL_SOURCES_6E = { render };
})();
