/* ATP SCHOOL — extension du cycle 1
 * 5e : matières restantes selon les programmes éducatifs DPFC.
 * 4e/3e : premières unités de travail basées sur les intitulés officiels DPFC.
 * Les fiches sont des rédactions pédagogiques originales et restent à enrichir
 * par séquences annuelles et évaluations détaillées.
 */
(() => {
  "use strict";
  const curriculum = window.ATP_CURRICULUM_5E = window.ATP_CURRICULUM_5E || {};
  const five = {
    "Histoire-Géographie": [
      ["Histoire — Origine et installation des peuples des régions de Côte d’Ivoire","Histoire"],
      ["Histoire — Traits de civilisation des peuples des différentes régions de Côte d’Ivoire","Histoire"],
      ["Histoire — Codes de réglementation des conflits et droit international humanitaire","Histoire"],
      ["Histoire — Premiers habitants de la Côte d’Ivoire","Histoire"],
      ["Histoire — Premiers mouvements migratoires en Côte d’Ivoire","Histoire"],
      ["Histoire — Grands empires de l’Afrique de l’Ouest : exemple du Mali","Histoire"],
      ["Géographie — Milieu physique en Côte d’Ivoire et installation des populations","Géographie"],
      ["Géographie — Croissance démographique en Côte d’Ivoire","Géographie"],
      ["Géographie — Eau et développement de la Côte d’Ivoire","Géographie"],
      ["Géographie — Conséquences des méthodes agricoles sur l’environnement","Géographie"],
      ["Géographie — Pollution industrielle et commerciale de l’environnement","Géographie"],
      ["Géographie — Impôt et aménagement du territoire ivoirien","Géographie"]
    ],
    "EDHC": [
      "Droits au développement et à la participation de l’enfant",
      "Principes des Droits de l’Homme et équilibre social",
      "Protection des victimes de conflits armés et assistance humanitaire",
      "Droits et devoirs du citoyen et cohésion sociale",
      "Les différents pouvoirs politiques de la Côte d’Ivoire",
      "Principes démocratiques et gestion des associations et des clubs",
      "Entente entre les peuples et paix sociale",
      "Comportements responsables sur les engins à deux roues et dans les automobiles",
      "Activités génératrices de revenus et insertion sociale",
      "Comportements à risques, IST et VIH/SIDA : prévention",
      "Grossesses précoces et épanouissement de la mère",
      "Consommation d’alcool, de drogues et sécurité sociale",
      "Hygiène publique, assainissement et préservation du cadre de vie",
      "Gestion des ordures et protection de l’environnement"
    ].map(t=>[t,"Citoyenneté et vie communautaire"]),
    "Arts plastiques": [
      ["Représenter un objet réel à partir d’un quadrillage","Représentation"],
      ["Ombres et lumière : types d’ombres et valeurs","Dessin"],
      ["Harmonie des couleurs et contrastes","Couleur"],
      ["Maquette de décoration textile : motif et logotype","Création"],
      ["Créer un support graphique de prévention des comportements à risques","Arts et santé"],
      ["Préserver l’eau et les espaces verts par des moyens plastiques","Arts et environnement"],
      ["Choisir les couleurs selon les espaces de l’habitation","Couleur et espace"],
      ["Aménager un espace répondant aux besoins de personnes déplacées","Projet artistique"],
      ["Fonctions des objets d’art religieux","Patrimoine"],
      ["Objets d’art et artisanat de Côte d’Ivoire","Patrimoine ivoirien"]
    ],
    "Éducation musicale": [
      ["Les xylophones : identification et familles","Instruments"],
      ["Les trompes et leurs usages","Instruments"],
      ["Les notes MI, FA, SOL, LA, SI, DO, RÉ","Solfège"],
      ["Le triolet de croches et les formules rythmiques","Rythme"],
      ["Les mesures simples et la lecture chantée","Solfège"],
      ["Chanson en relation avec l’impôt : le contribuable","Chant et citoyenneté"],
      ["Chanson en relation avec le droit international humanitaire","Chant et valeurs"],
      ["Chanson sur la planification de l’avenir et la santé","Chant et santé"],
      ["Chanson au choix : interprétation et exploitation","Pratique vocale"],
      ["La malnutrition : chanson à thème et message éducatif","Chant et santé"]
    ],
    "EPS": [
      ["Fournir un effort de longue durée et développer les capacités cardio-respiratoires","Endurance"],
      ["Fournir un effort de courte durée et développer la capacité de réaction","Vitesse"],
      ["Pratiquer une activité de saut en respectant les phases techniques","Athlétisme"],
      ["Réaliser des lancers en sécurité et mesurer une performance","Athlétisme"],
      ["Pratiquer un sport collectif : règles, rôles et arbitrage","Sports collectifs"],
      ["Organiser une activité physique et respecter les règles de sécurité","Méthodologie"]
    ]
  };
  Object.entries(five).forEach(([subject, items]) => {
    curriculum[subject] = items.map((item) => Array.isArray(item)
      ? ({ title:item[0], section:item[1] })
      : ({ title:item, section:"Programme éducatif 5e — DPFC" }));
  });

  const makeUnits = (entries, subject, grade) => entries.map((entry, index) => {
    const title = Array.isArray(entry) ? entry[0] : entry;
    const section = Array.isArray(entry) ? entry[1] : subject;
    return { title, section, number:index+1 };
  });

  const cycle = {
    "4e": {
      "Français": makeUnits([
        ["Lecture — Étude de textes littéraires et informatifs","Lecture"],
        ["Expression écrite — Résumé de texte informatif","Expression écrite"],
        ["Expression écrite — Compte rendu de réunion","Expression écrite"],
        ["Expression écrite — Lettre officielle","Expression écrite"],
        ["Grammaire — Groupe nominal et expansions","Grammaire"],
        ["Grammaire — Pronominalisation","Grammaire"],
        ["Grammaire — Verbe : formes et emplois","Grammaire"],
        ["Grammaire — Propositions subordonnées","Grammaire"],
        ["Orthographe — Accords et homophones","Orthographe"]
      ],"Français","4e"),
      "Mathématiques": makeUnits([
        ["Nombres entiers naturels et opérations","Calculs algébriques"],
        ["Nombres décimaux relatifs","Calculs algébriques"],
        ["Fractions et opérations","Calculs algébriques"],
        ["Nombres premiers et décomposition","Calculs algébriques"],
        ["Calcul littéral et réduction d’expressions","Calculs algébriques"],
        ["Équations et inéquations dans ℚ","Calculs algébriques"],
        ["Segments, cercles et angles","Géométrie du plan"],
        ["Triangles et parallélogrammes particuliers","Géométrie du plan"],
        ["Prismes droits et solides","Géométrie de l’espace"],
        ["Symétrie et transformations du plan","Transformations"]
      ],"Mathématiques","4e"),
      "Histoire-Géographie": makeUnits([
        ["Histoire — Mise en place des peuples de Côte d’Ivoire du XVIe au XVIIIe siècle","Histoire"],
        ["Histoire — Organisation sociopolitique des peuples de Côte d’Ivoire","Histoire"],
        ["Histoire — Prévention et résolution des conflits chez les peuples ivoiriens","Histoire"],
        ["Histoire — Traite négrière dans l’histoire de l’humanité","Histoire"],
        ["Histoire — Révolution française de 1789","Histoire"],
        ["Histoire — Révolution industrielle en Europe aux XVIIIe et XIXe siècles","Histoire"],
        ["Géographie — Milieux et populations : étude des espaces","Géographie"]
      ],"Histoire-Géographie","4e"),
      "EDHC": makeUnits([
        "Droits de l’enfant et protection de la personne",
        "Droits de l’Homme et libertés fondamentales",
        "Règles de vie communautaire et cohésion sociale",
        "Principes démocratiques et institutions",
        "Citoyenneté, devoirs et participation à la vie publique",
        "Prévention des conflits et culture de la paix"
      ],"EDHC","4e"),
      "Anglais": makeUnits(["Daily life and personal information","School life and communication","Describing people and places","Past events and experiences","Giving advice and expressing obligation","Health, environment and citizenship"],"Anglais","4e"),
      "Physique-Chimie": makeUnits(["Matière, mélanges et séparation","Électricité : circuits et grandeurs électriques","Optique : propagation et sources lumineuses","Mesures, unités et exploitation des résultats"],"Physique-Chimie","4e"),
      "SVT": makeUnits(["Nutrition et fonctionnement des êtres vivants","Reproduction et développement","Environnement, ressources et santé"],"SVT","4e"),
      "Arts plastiques": makeUnits(["Composition et organisation de l’espace","Couleurs, contrastes et expression","Création d’une production plastique à partir du patrimoine"],"Arts plastiques","4e"),
      "Éducation musicale": makeUnits(["Lecture rythmique et mélodique","Familles d’instruments et timbres","Interprétation d’un chant à thème"],"Éducation musicale","4e"),
      "EPS": makeUnits(["Endurance et vitesse","Sauts et lancers","Sports collectifs : technique, arbitrage et coopération"],"EPS","4e")
    },
    "3e": {
      "Français": makeUnits([
        ["Expression écrite — Texte argumentatif","Expression écrite"],
        ["Expression écrite — Article de journal","Expression écrite"],
        ["Expression écrite — Résumé de texte argumentatif","Expression écrite"],
        ["Grammaire — Communication et situation d’énonciation","Grammaire"],
        ["Grammaire — Pronominalisation","Grammaire"],
        ["Grammaire — Adverbe et groupe adverbial","Grammaire"],
        ["Grammaire — Infinitif et participe","Grammaire"],
        ["Lecture — Analyse et interprétation de textes","Lecture"]
      ],"Français","3e"),
      "Mathématiques": makeUnits([
        ["Triangle rectangle et relations métriques","Géométrie du plan"],
        ["Propriétés de Thalès dans un triangle","Géométrie du plan"],
        ["Angles inscrits","Géométrie du plan"],
        ["Vecteurs et coordonnées d’un vecteur","Géométrie du plan"],
        ["Équations de droites","Géométrie analytique"],
        ["Calcul littéral et identités remarquables","Calculs algébriques"],
        ["Racines carrées et calcul numérique","Calculs algébriques"],
        ["Équations et inéquations dans ℝ","Calculs algébriques"],
        ["Statistiques et traitement de données","Organisation des données"]
      ],"Mathématiques","3e"),
      "Histoire-Géographie": makeUnits([
        ["Histoire — Causes, caractères et conséquences de la Deuxième Guerre mondiale","Histoire"],
        ["Histoire — Organisation des Nations Unies","Histoire"],
        ["Histoire — Union Africaine","Histoire"],
        ["Histoire — Décolonisation et construction des États africains","Histoire"],
        ["Géographie — Étude économique de la Côte d’Ivoire","Géographie"],
        ["Géographie — Problèmes du développement économique ivoirien","Géographie"],
        ["Géographie — Étude économique de l’Afrique","Géographie"],
        ["Géographie — Afrique face à la mondialisation","Géographie"]
      ],"Histoire-Géographie","3e"),
      "EDHC": makeUnits([
        "Droits et libertés fondamentales",
        "Démocratie, institutions et participation citoyenne",
        "Justice, égalité et cohésion sociale",
        "Paix, prévention des violences et règlement des conflits",
        "Protection de l’environnement et responsabilité collective"
      ],"EDHC","3e"),
      "Anglais": makeUnits(["Communication and social relationships","Describing events and personal experiences","Expressing opinions and arguments","Education, work and future plans","Health, environment and global issues"],"Anglais","3e"),
      "Physique-Chimie": makeUnits(["Mécanique : mouvement, forces et équilibre","Électricité : lois et circuits","Chimie : transformations et réactions","Énergie et applications dans la vie courante"],"Physique-Chimie","3e"),
      "SVT": makeUnits(["Fonctionnement du corps humain et santé","Reproduction humaine et prévention","Génétique et transmission des caractères","Écosystèmes et protection de l’environnement"],"SVT","3e"),
      "Arts plastiques": makeUnits(["Image, composition et communication visuelle","Création plastique et engagement citoyen","Patrimoine artistique et expression personnelle"],"Arts plastiques","3e"),
      "Éducation musicale": makeUnits(["Lecture et écriture musicales","Rythmes, mesures et interprétation","Chants à thèmes et patrimoine musical"],"Éducation musicale","3e"),
      "EPS": makeUnits(["Endurance et vitesse : préparation et évaluation","Sauts et lancers : maîtrise technique","Sports collectifs : stratégie, arbitrage et esprit sportif"],"EPS","3e")
    }
  };

  Object.entries(cycle).forEach(([grade, subjects]) => {
    window["ATP_CURRICULUM_" + grade.toUpperCase()] = subjects;
  });

  const subjectNotes = {
    "Histoire-Géographie": {
      definition:"L’histoire étudie les sociétés humaines dans le temps à partir de sources ; la géographie étudie les territoires, les populations et leurs relations avec l’environnement.",
      example:"Pour étudier une région ivoirienne, on croise une carte, des témoignages, des données démographiques et des documents historiques.",
      vocabulary:["source historique","chronologie","territoire","population","carte","échelle"],
      method:["Identifier le thème, la date et l’espace étudiés.","Prélever les informations utiles dans les documents.","Situer les faits dans le temps ou dans l’espace.","Expliquer les causes, les manifestations et les conséquences.","Rédiger une réponse structurée et citer les documents utilisés."]
    },
    "EDHC": {
      definition:"L’EDHC développe les connaissances et les comportements nécessaires au respect des droits, des devoirs, des règles communes et de la dignité humaine.",
      example:"Dans un club scolaire, les membres adoptent des règles, élisent un bureau, prennent des décisions et rendent compte de leur gestion.",
      vocabulary:["droit","devoir","citoyen","règle","institution","responsabilité"],
      method:["Identifier la situation et les personnes concernées.","Distinguer les droits, les devoirs et les règles applicables.","Expliquer les conséquences d’un comportement.","Proposer une solution respectueuse de la dignité et de la loi."]
    },
    "Arts plastiques": {
      definition:"Les arts plastiques permettent de communiquer une idée ou une émotion à l’aide de formes, de lignes, de couleurs, de matières et de techniques.",
      example:"Une affiche de sensibilisation associe un message court, une image lisible, des contrastes et une composition équilibrée.",
      vocabulary:["composition","contraste","valeur","texture","motif","maquette"],
      method:["Analyser le sujet et le message à transmettre.","Faire un croquis préparatoire.","Choisir les formes, couleurs et matériaux adaptés.","Réaliser la production puis vérifier sa lisibilité."]
    },
    "Éducation musicale": {
      definition:"L’éducation musicale développe l’écoute, la lecture des signes musicaux, le sens du rythme, le chant et la connaissance des instruments.",
      example:"Pour interpréter un chant, on repère la pulsation, les phrases, les respirations et les nuances avant de chanter en groupe.",
      vocabulary:["pulsation","rythme","mesure","mélodie","timbre","nuance"],
      method:["Écouter le modèle et repérer la pulsation.","Lire ou mémoriser les paroles et la mélodie.","Travailler lentement les passages difficiles.","Interpréter en respectant le rythme, l’intonation et le groupe."]
    },
    "EPS": {
      definition:"L’EPS développe les capacités physiques, motrices et sociales par une pratique organisée, progressive et sécurisée des activités physiques et sportives.",
      example:"Avant une course, l’élève s’échauffe, respecte les consignes, adapte son allure et récupère après l’effort.",
      vocabulary:["échauffement","endurance","vitesse","récupération","arbitrage","fair-play"],
      method:["Vérifier l’espace, le matériel et les consignes de sécurité.","Effectuer un échauffement progressif.","Réaliser l’exercice en respectant la technique demandée.","Récupérer, observer ses résultats et progresser sans se mettre en danger."]
    },
    "Français": {
      definition:"Le français permet de comprendre, analyser et produire des messages oraux et écrits adaptés à une situation de communication.",
      example:"Un compte rendu présente les faits dans un ordre logique, distingue les décisions des discussions et utilise un registre adapté.",
      vocabulary:["énonciateur","destinataire","connecteur","argument","paragraphe","accord"],
      method:["Lire la consigne et identifier le type de texte attendu.","Organiser les idées dans un plan cohérent.","Rédiger des phrases correctes et utiliser des connecteurs.","Relire le texte pour corriger grammaire, orthographe et ponctuation."]
    },
    "Mathématiques": {
      definition:"Les mathématiques permettent de représenter, calculer, démontrer et résoudre des problèmes à l’aide de nombres, de figures, de grandeurs et de relations.",
      example:"Pour résoudre un problème de géométrie, on réalise une figure codée, on relève les données, on choisit une propriété puis on justifie chaque étape.",
      vocabulary:["donnée","propriété","expression","équation","figure","démonstration"],
      method:["Lire l’énoncé et relever les données.","Identifier la notion ou la propriété utile.","Écrire les calculs ou le raisonnement étape par étape.","Vérifier le résultat et rédiger une conclusion."]
    },
    "Anglais": {
      definition:"L’anglais permet de comprendre et de produire des messages simples ou complexes à l’oral et à l’écrit selon la situation.",
      example:"I think education is important because it gives young people more opportunities.",
      vocabulary:["vocabulary","sentence","question","answer","opinion","pronunciation"],
      method:["Repérer le thème et les mots clés.","Construire une phrase avec sujet, verbe et complément.","Choisir le temps et les mots de liaison adaptés.","Relire ou répéter pour vérifier le sens et la prononciation."]
    },
    "Physique-Chimie": {
      definition:"La physique et la chimie étudient les phénomènes naturels, les propriétés de la matière, les transformations et les échanges d’énergie.",
      example:"Lors d’une expérience scolaire, on formule une question, on identifie les variables, on observe les résultats et on les interprète.",
      vocabulary:["grandeur","unité","mesure","matière","énergie","expérience"],
      method:["Lire la situation et formuler le problème.","Identifier les grandeurs et leurs unités.","Choisir une expérience ou une relation adaptée.","Présenter les résultats et respecter les consignes de sécurité."]
    },
    "SVT": {
      definition:"Les sciences de la vie et de la Terre expliquent les êtres vivants, le corps humain, les milieux naturels et les interactions qui les relient.",
      example:"Pour comprendre un écosystème, on identifie les êtres vivants, les éléments non vivants et les relations alimentaires.",
      vocabulary:["organisme","cellule","milieu","écosystème","fonction","prévention"],
      method:["Observer le document ou le phénomène.","Décrire précisément les éléments observés.","Relier les observations aux connaissances scientifiques.","Rédiger une explication et proposer une mesure de prévention si nécessaire."]
    }
  };

  const originalBuildAll = window.ATP_LEARNING_CONTENT_6E?.buildAll;
  if (typeof originalBuildAll === "function") {
    window.ATP_LEARNING_CONTENT_6E.buildAll = function(raw) {
      const result = originalBuildAll(raw);
      const grade = Object.keys(cycle).find(g => raw === window["ATP_CURRICULUM_" + g.toUpperCase()]);
      const isFive = raw === curriculum;
      if (!grade && !isFive) return result;
      const subjects = raw || {};
      Object.entries(subjects).forEach(([subject, items]) => {
        const note = subjectNotes[subject] || subjectNotes["Français"];
        const target = result[subject];
        if (!target || !Array.isArray(target.lessons)) return;
        target.goal = "Programme de " + (grade || "5e") + " — " + subject + ". Les fiches ATP servent à apprendre les notions, appliquer une méthode et s’entraîner.";
        target.lessons = target.lessons.map((lesson, index) => {
          const title = lesson.title;
          const def = note.definition + " Dans cette leçon, on étudie plus précisément : " + title + ".";
          const context = "En Côte d’Ivoire, une situation de classe ou de la vie quotidienne peut servir de point de départ pour étudier : " + title + ".";
          const exercises = [
            {level:"Compréhension",instruction:"Explique avec tes mots la notion principale de « " + title + " » et donne deux informations importantes.",correction:"Une bonne réponse reprend la définition, cite les éléments essentiels du cours et les relie au thème : " + title + "."},
            {level:"Application",instruction:"Présente un exemple ivoirien ou scolaire permettant d’illustrer « " + title + " », puis explique-le.",correction:context + " Il faut justifier l’exemple avec les notions de la leçon."},
            {level:"Méthode",instruction:"Indique les étapes à suivre pour traiter une situation ou un exercice portant sur « " + title + " ».",correction:note.method.join(" ")}
          ];
          const session = {
            title:title, definition:def,
            objectives:["Définir les notions essentielles liées à " + title + ".","Expliquer les éléments importants du thème.","Appliquer une méthode à une situation concrète."],
            explanation:[def,context,"Les notions doivent être replacées dans le contexte de la leçon. Il faut distinguer les faits observés, les explications et les conséquences.","Pour approfondir, consulte les documents et exemples du cours utilisés par ton enseignant."],
            example:note.example + " Application au thème : " + title + ".",
            method:note.method, vocabulary:note.vocabulary,
            essential:[def,note.method[0],note.method[note.method.length-1]],
            exercises:exercises,
            quiz:[
              {question:"Quel est le premier réflexe pour étudier « " + title + " » ?",options:["Lire la situation et identifier les notions utiles","Répondre au hasard","Ignorer les documents"],correctAnswer:0,explanation:"Il faut comprendre la situation et repérer les informations pertinentes."},
              {question:"Une bonne réponse doit-elle être justifiée ?",options:["Non, jamais","Oui, avec des notions, des faits ou une méthode","Seulement si elle est longue"],correctAnswer:1,explanation:"La justification montre que l’élève maîtrise la démarche."}
            ]
          };
          return {
            title, section:lesson.section, number:index+1,
            introduction:"Fiche de cours ATP rattachée au programme de " + (grade || "5e") + ". Le titre suit la progression de référence ; les explications sont une synthèse pédagogique originale.",
            objectives:session.objectives, sessions:[session],
            exercises, quiz:session.quiz, revision:session.essential,
            homework:{instructions:"Réalise les exercices dans ton cahier. Justifie tes réponses et utilise le vocabulaire de la leçon.",questions:exercises.map(e=>e.instruction)},
            finalAssessment:{instructions:["Réponds sans consulter le cours.","Justifie tes réponses et rédige une conclusion claire."],questions:exercises.map(e=>({question:e.instruction,points:5,expected:e.correction}))}
          };
        });
      });
      return result;
    };
  }
})();