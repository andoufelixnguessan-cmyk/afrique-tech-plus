/* ATP SCHOOL — Programmes du second cycle
 * Trames disciplinaires structurées à partir des programmes et progressions DPFC.
 * Les intitulés sont des unités de progression ; les fiches de cours sont des
 * synthèses pédagogiques ATP à compléter/valider avec les guides d'exécution.
 */
(() => {
  "use strict";
  const make = (items, section) => items.map((title, i) => ({title, section:section || "Programme officiel — second cycle", number:i+1}));
  const shared = {
    "Français": make([
      "Lecture méthodique : construire le sens d’un texte littéraire",
      "Étude de l’œuvre intégrale et parcours de lecture",
      "Le texte argumentatif : thèse, arguments et exemples",
      "Les formes de discours et les procédés stylistiques",
      "Expression écrite : dissertation et commentaire composé"
    ],"Langues et littérature"),
    "Anglais": make([
      "Communicating about identity, family and social relationships",
      "Education, school life and career opportunities",
      "Health, environment and responsible citizenship",
      "Media, technology and communication",
      "Expressing opinions, arguments and future plans"
    ],"Langues vivantes"),
    "Histoire-Géographie": make([
      "Les relations internationales et les grands équilibres du monde contemporain",
      "L’Afrique : décolonisation, États et intégration régionale",
      "La Côte d’Ivoire : population, territoire et développement",
      "Les espaces économiques et les échanges mondiaux",
      "Méthode : étude critique de documents, carte et composition"
    ],"Univers social"),
    "Philosophie": make([
      "La conscience, l’inconscient et la personne",
      "La liberté, le devoir et la responsabilité",
      "La vérité, la raison et la science",
      "Le travail, la technique et la société",
      "L’État, le droit, la justice et la politique",
      "Méthodologie de la dissertation et de l’explication de texte"
    ],"Philosophie"),
    "Éducation musicale": make([
      "Écoute et analyse d’œuvres musicales de différents genres",
      "Rythme, mesure, mélodie et interprétation",
      "Musique ivoirienne : patrimoine, styles et pratiques",
      "Création, expression et présentation d’une production musicale"
    ],"Arts"),
    "EPS": make([
      "Préparation physique : endurance, vitesse et coordination",
      "Athlétisme : course, saut et lancer",
      "Sports collectifs : règles, stratégie et arbitrage",
      "Évaluation de la performance, santé et sécurité"
    ],"Développement physique et sportif"),
    "Allemand": make([
      "Sich vorstellen und über persönliche Erfahrungen sprechen",
      "Schule, Ausbildung und Berufswahl",
      "Gesundheit, Umwelt und gesellschaftliches Leben",
      "Medien, Kommunikation und Zukunftspläne"
    ],"Langues vivantes"),
    "Espagnol": make([
      "Presentarse, hablar de la familia y de las relaciones sociales",
      "La educación, los estudios y el mundo profesional",
      "La salud, el medio ambiente y la ciudadanía",
      "Los medios de comunicación, la cultura y el futuro"
    ],"Langues vivantes")
  };
  const maths = {
    "Seconde A": make(["Ensembles de nombres réels et intervalles","Calcul algébrique, équations et inéquations","Fonctions numériques et représentation graphique","Statistique descriptive et probabilités","Géométrie plane et repérage"],"Mathématiques"),
    "Seconde C": make(["Ensemble des nombres réels et valeur absolue","Polynômes et fonctions rationnelles","Équations, inéquations et systèmes","Généralités sur les fonctions numériques","Géométrie analytique, vecteurs et statistiques"],"Mathématiques"),
    "Première A1": make(["Calcul algébrique et équations","Fonctions numériques et étude graphique","Suites numériques et pourcentages","Statistique à deux variables et probabilités","Géométrie et résolution de problèmes"],"Mathématiques"),
    "Première A2": make(["Calcul algébrique et équations","Fonctions numériques et étude graphique","Suites numériques et pourcentages","Statistique à deux variables et probabilités","Géométrie et résolution de problèmes"],"Mathématiques"),
    "Première C": make(["Fonctions numériques et limites","Dérivation et étude de fonctions","Suites numériques","Géométrie plane et transformations","Statistique, dénombrement et probabilités"],"Mathématiques"),
    "Première D": make(["Fonctions numériques et dérivation","Suites numériques et applications","Géométrie analytique et vecteurs","Statistique à deux variables","Dénombrement et probabilités"],"Mathématiques"),
    "Terminale A1": make(["Fonctions et étude de variations","Suites numériques et modèles d’évolution","Statistique à deux variables et ajustement","Probabilités et prise de décision","Révision méthodique des problèmes du programme"],"Mathématiques"),
    "Terminale A2": make(["Fonctions et étude de variations","Suites numériques et modèles d’évolution","Statistique à deux variables et ajustement","Probabilités et prise de décision","Révision méthodique des problèmes du programme"],"Mathématiques"),
    "Terminale C": make(["Limites, continuité et dérivation","Fonctions logarithme et exponentielle","Primitives et calcul intégral","Nombres complexes et transformations du plan","Dénombrement, statistiques et probabilités"],"Mathématiques"),
    "Terminale D": make(["Limites, continuité et dérivation","Fonctions logarithme et exponentielle","Primitives et calcul intégral","Géométrie, vecteurs et nombres complexes","Dénombrement, statistiques et probabilités"],"Mathématiques")
  };
  const science = {
    "Seconde A": {
      "Physique-Chimie": make(["Mesures physiques, unités et incertitudes","Matière, solutions et transformations chimiques","Mouvement, forces et équilibre","Électricité : circuits et grandeurs électriques"],"Sciences"),
      "SVT": make(["Organisation du vivant et fonctionnement cellulaire","Nutrition et fonctionnement des organismes","Reproduction et développement des êtres vivants","Environnement, ressources et santé"],"Sciences")
    },
    "Seconde C": {
      "Physique-Chimie": make(["Grandeurs physiques, mesures et exploitation expérimentale","Structure de la matière et transformations chimiques","Mécanique : mouvement et forces","Électricité et énergie"],"Sciences"),
      "SVT": make(["Organisation cellulaire et diversité du vivant","Fonctions de nutrition et échanges","Reproduction et transmission des caractères","Écosystèmes et équilibre environnemental"],"Sciences")
    },
    "Première A1": {"Physique-Chimie":make(["Mécanique et étude des mouvements","Électricité et énergie","Structure et transformations de la matière"],"Sciences"),"SVT":make(["Fonctions biologiques et santé","Reproduction et hérédité","Écosystèmes et ressources naturelles"],"Sciences")},
    "Première A2": {"Physique-Chimie":make(["Mécanique et étude des mouvements","Électricité et énergie","Structure et transformations de la matière"],"Sciences"),"SVT":make(["Fonctions biologiques et santé","Reproduction et hérédité","Écosystèmes et ressources naturelles"],"Sciences")},
    "Première C": {"Physique-Chimie":make(["Mécanique : cinématique et dynamique","Électricité et circuits","Transformations chimiques et réactions","Optique et phénomènes ondulatoires"],"Sciences"),"SVT":make(["Fonctionnement des organismes et régulations","Génétique et transmission des caractères","Géologie et dynamique de la Terre"],"Sciences")},
    "Première D": {"Physique-Chimie":make(["Mécanique et énergie","Électricité et circuits","Transformations chimiques","Optique et phénomènes physiques"],"Sciences"),"SVT":make(["Fonctionnement de l’organisme humain","Reproduction, hérédité et santé","Écologie et dynamique des écosystèmes"],"Sciences")},
    "Terminale A1": {"SVT":make(["Fonctions de nutrition et régulations biologiques","Reproduction humaine, santé et prévention","Environnement et développement durable"],"Sciences")},
    "Terminale A2": {"SVT":make(["Fonctions de nutrition et régulations biologiques","Reproduction humaine, santé et prévention","Environnement et développement durable"],"Sciences")},
    "Terminale C": {"Physique-Chimie":make(["Mécanique : lois de Newton et énergie","Électricité : circuits et phénomènes électromagnétiques","Chimie : réactions, équilibres et cinétique","Ondes, optique et applications"],"Sciences"),"SVT":make(["Génétique et expression de l’information génétique","Physiologie, régulations et santé","Géologie, ressources et environnement"],"Sciences")},
    "Terminale D": {"Physique-Chimie":make(["Mécanique : lois de Newton et énergie","Électricité et phénomènes électromagnétiques","Chimie : réactions et transformations","Ondes et optique"],"Sciences"),"SVT":make(["Génétique et transmission des caractères","Physiologie humaine et régulations","Reproduction, santé et prévention","Géologie et environnement"],"Sciences")}
  };
  const byClass = {};
  Object.keys(maths).forEach(grade => {
    const map = {};
    Object.entries(shared).forEach(([subject, units]) => map[subject] = units);
    map["Mathématiques"] = maths[grade];
    Object.entries(science[grade] || {}).forEach(([subject, units]) => map[subject] = units);
    // Philosophie est enseignée à partir de la Première.
    if (grade.startsWith("Seconde")) delete map["Philosophie"];
    byClass[grade] = map;
    window["ATP_CURRICULUM_" + grade.toUpperCase().replace(/ /g,"_")] = map;
  });

  const notes = {
    "Français": {definition:"L’étude du français développe la compréhension des textes, la culture littéraire et la maîtrise de l’expression orale et écrite.",example:"Une dissertation défend une thèse au moyen d’arguments organisés et d’exemples précis.",method:["Lire la consigne et délimiter le sujet.","Formuler une problématique et organiser un plan.","Appuyer chaque idée sur un exemple ou une référence.","Rédiger avec des transitions puis relire."]},
    "Anglais": {definition:"L’anglais est une langue de communication internationale qui mobilise compréhension, expression, grammaire et vocabulaire.",example:"A structured opinion paragraph presents a clear point of view, reasons and examples.",method:["Identify the topic and communication goal.","Select relevant vocabulary and grammar structures.","Organise ideas with linking words.","Check tense, agreement, spelling and clarity."]},
    "Histoire-Géographie": {definition:"L’histoire et la géographie analysent les sociétés, les territoires et les transformations du monde.",example:"Une étude de document confronte la source, la date, le contexte et les informations d’une carte ou d’un texte.",method:["Présenter la nature, l’auteur, la date et le contexte.","Relever les informations utiles.","Expliquer les faits en mobilisant le cours.","Rédiger une réponse structurée et nuancée."]},
    "Mathématiques": {definition:"Les mathématiques mobilisent le calcul, les fonctions, la géométrie et les probabilités pour modéliser et résoudre des problèmes.",example:"Pour étudier une fonction, on détermine son domaine, ses variations et interprète les résultats dans le contexte.",method:["Identifier les données et la question.","Choisir la propriété ou l’outil mathématique adapté.","Développer les calculs sans sauter d’étapes.","Vérifier le résultat et rédiger la conclusion."]},
    "Philosophie": {definition:"La philosophie examine de manière rationnelle les grandes questions relatives à l’être humain, à la connaissance et à la société.",example:"Une dissertation sur la liberté exige de définir les notions, confronter des thèses et construire une argumentation.",method:["Analyser les termes du sujet.","Faire apparaître le problème philosophique.","Construire un plan progressif et discuter plusieurs thèses.","Argumenter avec précision puis conclure."]},
    "Physique-Chimie": {definition:"La physique-chimie étudie les phénomènes naturels, la matière, les interactions et les transformations à partir de modèles et d’expériences.",example:"Une expérience exploitable précise le protocole, les grandeurs mesurées, les unités et les limites de la conclusion.",method:["Identifier le système et le phénomène étudiés.","Lister les grandeurs et leurs unités.","Choisir un modèle, une loi ou un protocole.","Calculer, vérifier les unités et interpréter."]},
    "SVT": {definition:"Les sciences de la vie et de la Terre expliquent les mécanismes du vivant, la santé, la biodiversité et le fonctionnement de la planète.",example:"L’analyse d’un document biologique relie les observations à un mécanisme explicatif et à des connaissances scientifiques.",method:["Décrire les données sans les interpréter trop tôt.","Comparer les résultats et identifier une relation.","Mobiliser les connaissances scientifiques adaptées.","Proposer une explication argumentée."]},
    "Éducation musicale": {definition:"L’éducation musicale développe l’écoute, la culture artistique, la pratique vocale et la compréhension des structures musicales.",example:"Une analyse musicale repère le rythme, la mélodie, le timbre, la forme et le contexte de l’œuvre.",method:["Écouter l’œuvre plusieurs fois.","Identifier les éléments musicaux et le contexte.","Décrire les effets produits et les choix artistiques.","Présenter une analyse claire et argumentée."]},
    "EPS": {definition:"L’EPS développe les capacités motrices, la santé, la coopération et la maîtrise de soi par des pratiques physiques sécurisées.",example:"Une préparation physique alterne échauffement, effort adapté, récupération et observation des progrès.",method:["Vérifier les conditions de sécurité.","S’échauffer progressivement.","Réaliser l’activité en respectant les consignes.","Évaluer sa performance et organiser la récupération."]},
    "Allemand": {definition:"L’allemand développe la compréhension et l’expression dans des situations de communication de la vie quotidienne et sociale.",example:"Eine kurze Präsentation enthält Name, Wohnort, Ausbildung und persönliche Interessen.",method:["Repérer le thème et les mots-clés.","Construire des phrases grammaticalement correctes.","Respecter le temps verbal et l’ordre des mots.","S’entraîner à comprendre et à s’exprimer."]},
    "Espagnol": {definition:"L’espagnol permet de comprendre et de produire des messages oraux et écrits dans des contextes personnels, scolaires et sociaux.",example:"Una opinión bien organizada presenta una idea, argumentos y ejemplos.",method:["Identificar el tema y la intención.","Elegir vocabulario y estructuras adecuadas.","Organizar las ideas con conectores.","Revisar los tiempos verbales y los acuerdos."]}
  };
  const baseBuild = window.ATP_LEARNING_CONTENT_6E.buildAll;
  window.ATP_LEARNING_CONTENT_6E.buildAll = function(raw) {
    const built = baseBuild(raw);
    const grade = Object.keys(byClass).find(key => byClass[key] === raw);
    if (!grade) return built;
    Object.entries(raw).forEach(([subject, units]) => {
      const note = notes[subject] || notes["Français"];
      if (!built[subject]) return;
      built[subject].goal = "Progression " + grade + " — " + subject + ". Trame de travail à suivre avec le programme éducatif et le guide d’exécution DPFC.";
      built[subject].lessons = units.map((unit, index) => {
        const title = unit.title;
        const application = "Application au thème « " + title + " » : l’élève doit mobiliser les notions du cours, interpréter les informations et justifier sa démarche.";
        const exercises = [
          {level:"Compréhension",instruction:"Définis les notions principales du thème « " + title + " » et explique leur rôle.",correction:"La réponse doit reprendre la définition du cours, préciser les notions liées au thème et expliquer leur relation."},
          {level:"Application",instruction:"Traite une situation concrète en rapport avec « " + title + " ». Présente les étapes de ton raisonnement.",correction:note.method.join(" ")},
          {level:"Analyse",instruction:"Rédige une synthèse organisée présentant les connaissances essentielles sur « " + title + " ».",correction:"Une bonne synthèse présente les notions, les explique avec un exemple pertinent et se termine par une conclusion cohérente."}
        ];
        const quiz = [
          {question:"Quelle démarche convient pour étudier « " + title + " » ?",options:["Identifier le problème, mobiliser les notions et justifier","Répondre sans lire le sujet","Recopier le titre uniquement"],correctAnswer:0,explanation:"Une réponse correcte repose sur l’analyse du sujet et une justification."},
          {question:"À quoi sert un exemple dans une réponse ?",options:["À remplacer tout le cours","À illustrer et justifier une idée","À allonger le texte"],correctAnswer:1,explanation:"L’exemple relie les connaissances à une situation précise."}
        ];
        const session = {
          title, number:index+1,
          definition:note.definition + " Cette unité porte précisément sur : " + title + ".",
          objectives:["Maîtriser les notions centrales de « " + title + " ».","Analyser une situation ou un document lié au thème.","Construire une réponse méthodique et justifiée."],
          explanation:[note.definition,application,"Les connaissances doivent être reliées aux exemples, documents et activités prévus dans le guide d’exécution DPFC de la discipline."],
          example:note.example + " Le raisonnement doit être appliqué au thème : " + title + ".",
          method:note.method,
          vocabulary:[subject,title,"notion","analyse","argumentation","application"],
          essential:["Retenir la définition et les notions centrales du thème.",note.method[0],note.method[note.method.length-1]],
          exercises,quiz
        };
        return {
          title,section:unit.section,number:index+1,
          introduction:"Unité de progression " + grade + " issue de la trame disciplinaire ATP alignée sur les ressources DPFC. La fiche doit être enrichie à partir du guide d’exécution et des documents de classe.",
          objectives:session.objectives,sessions:[session],exercises,quiz,
          revision:session.essential,
          homework:{instructions:"Réalise les activités dans ton cahier en justifiant chaque réponse.",questions:exercises.map(x=>x.instruction)},
          finalAssessment:{instructions:["Traite les questions sans consulter le cours.","Justifie les réponses et organise la rédaction."],questions:exercises.map(x=>({question:x.instruction,points:5,expected:x.correction}))}
        };
      });
    });
    return built;
  };
})();