/* ==========================================================
   AFRIQUE TECH PLUS — ATP SCHOOL
   Bibliothèque pédagogique de 6e
   Génération structurée des cours, exercices et évaluations
   ========================================================== */

(() => {
  "use strict";

  const SUBJECTS = {
    "Français": {
      icon: "📖",
      goal: "Lire, comprendre, communiquer correctement à l’oral et à l’écrit.",
      method: "Observer les exemples, identifier les règles, puis les appliquer dans des phrases et des textes.",
      vocabulary: ["texte", "phrase", "mot", "communication"],
      activities: [
        "Repère les informations essentielles dans un texte en rapport avec la leçon.",
        "Construis trois exemples personnels en appliquant la notion étudiée.",
        "Rédige un court paragraphe en respectant les règles étudiées."
      ],
      correction: "La réponse doit respecter la consigne, être compréhensible, correctement organisée et appliquer les règles de langue étudiées."
    },

    "Mathématiques": {
      icon: "➗",
      goal: "Raisonner, calculer, représenter et résoudre des problèmes mathématiques.",
      method: "Identifier les données, choisir une propriété ou une opération, effectuer les calculs et vérifier le résultat.",
      vocabulary: ["calcul", "propriété", "figure", "résultat"],
      activities: [
        "Écris avec tes propres mots la définition de la notion étudiée.",
        "Résous un exercice simple en détaillant chaque étape du raisonnement.",
        "Imagine une situation de la vie quotidienne dans laquelle cette notion est utile."
      ],
      correction: "Une bonne réponse présente les données utiles, la méthode choisie, les calculs lisibles et une conclusion correcte."
    },

    "Anglais": {
      icon: "🇬🇧",
      goal: "Comprendre et utiliser des expressions simples en anglais à l’oral et à l’écrit.",
      method: "Écouter ou lire le modèle, mémoriser le vocabulaire, répéter, puis construire ses propres phrases.",
      vocabulary: ["word", "sentence", "question", "answer"],
      activities: [
        "Écris cinq mots anglais en rapport avec le thème de la leçon et donne leur traduction.",
        "Construis trois phrases simples en utilisant le vocabulaire étudié.",
        "Rédige un petit dialogue de quatre répliques sur la situation étudiée."
      ],
      correction: "La correction vérifie le vocabulaire, l'ordre des mots, la conjugaison, l'orthographe et le sens des phrases."
    },

    "Histoire-Géographie": {
      icon: "🌍",
      goal: "Comprendre les sociétés, les événements historiques et les milieux géographiques.",
      method: "Observer les documents, identifier les lieux ou les périodes, relever les informations et expliquer les relations.",
      vocabulary: ["document", "date", "lieu", "milieu"],
      activities: [
        "Définis la notion principale de la leçon.",
        "Présente deux informations importantes liées au thème étudié.",
        "Explique le rapport entre cette notion et la vie en Côte d’Ivoire."
      ],
      correction: "La réponse doit utiliser les notions exactes, distinguer les faits et les explications et présenter des informations cohérentes."
    },

    "SVT": {
      icon: "🌱",
      goal: "Observer le vivant, comprendre les phénomènes biologiques et protéger l'environnement.",
      method: "Observer, formuler une question, proposer une explication, examiner les résultats et tirer une conclusion.",
      vocabulary: ["observation", "organisme", "milieu", "expérience"],
      activities: [
        "Décris le phénomène biologique ou environnemental étudié.",
        "Identifie les éléments qui interviennent dans ce phénomène.",
        "Propose une action concrète permettant de protéger le vivant ou l'environnement."
      ],
      correction: "La réponse doit s'appuyer sur les observations, employer les termes scientifiques appropriés et présenter une conclusion logique."
    },

    "Physique-Chimie": {
      icon: "🧪",
      goal: "Observer la matière et les phénomènes physiques, réaliser des expériences simples et appliquer les règles de sécurité.",
      method: "Observer le phénomène, identifier le matériel, décrire les étapes, noter les résultats et conclure.",
      vocabulary: ["matière", "observation", "mesure", "expérience"],
      activities: [
        "Décris le phénomène étudié avec tes propres mots.",
        "Indique le matériel ou les éléments nécessaires pour l'observer.",
        "Explique une précaution à respecter pendant l'activité."
      ],
      correction: "Une bonne réponse distingue l'observation, l'explication et la conclusion. Les règles de sécurité doivent être respectées."
    },

    "EDHC": {
      icon: "🤝",
      goal: "Connaître ses droits et devoirs et adopter des comportements responsables dans la société.",
      method: "Comprendre la règle, analyser une situation concrète et proposer un comportement citoyen.",
      vocabulary: ["droit", "devoir", "respect", "responsabilité"],
      activities: [
        "Explique la notion principale étudiée.",
        "Présente une situation de la vie quotidienne illustrant cette notion.",
        "Propose deux comportements responsables à adopter."
      ],
      correction: "La réponse doit respecter les valeurs de dignité humaine, de responsabilité, de solidarité et de respect des règles."
    },

    "Arts plastiques": {
      icon: "🎨",
      goal: "Observer, représenter et créer des productions plastiques en utilisant différents outils et techniques.",
      method: "Observer le sujet, choisir les outils, organiser la composition, réaliser la production et l'apprécier.",
      vocabulary: ["forme", "couleur", "ligne", "composition"],
      activities: [
        "Identifie les outils et matériaux adaptés à la leçon.",
        "Réalise une petite production en appliquant la technique étudiée.",
        "Présente les choix de formes, de couleurs ou de matériaux utilisés."
      ],
      correction: "La production est appréciée selon le respect de la consigne, l'utilisation de la technique, l'organisation et le soin."
    },

    "Éducation musicale": {
      icon: "🎵",
      goal: "Reconnaître les éléments du langage musical et découvrir les instruments et les pratiques musicales.",
      method: "Écouter, observer, identifier les éléments musicaux, reproduire et expliquer.",
      vocabulary: ["note", "rythme", "instrument", "son"],
      activities: [
        "Décris l'élément musical étudié.",
        "Identifie les caractéristiques ou les éléments qui le composent.",
        "Réalise un petit exercice de reconnaissance, de rythme ou de reproduction."
      ],
      correction: "La réponse doit identifier correctement les éléments musicaux et respecter les notions de rythme, de notes ou d'instruments abordées."
    },

    "EPS": {
      icon: "🏃",
      goal: "Développer les capacités physiques, les habiletés motrices et l'esprit sportif.",
      method: "Comprendre la consigne, s'échauffer, réaliser l'activité progressivement et respecter les règles de sécurité.",
      vocabulary: ["effort", "mouvement", "règle", "sécurité"],
      activities: [
        "Explique l'objectif de l'activité physique étudiée.",
        "Présente les principales règles ou étapes à respecter.",
        "Décris comment réaliser l'activité sans mettre en danger les participants."
      ],
      correction: "La réussite tient compte de la compréhension de la consigne, du respect des règles, de la sécurité et de la réalisation correcte du mouvement."
    },

    "TICE": {
      icon: "💻",
      goal: "Découvrir l'ordinateur, utiliser les outils numériques et adopter de bonnes pratiques informatiques.",
      method: "Identifier l'outil, comprendre sa fonction, suivre les étapes de manipulation et vérifier le résultat.",
      vocabulary: ["ordinateur", "logiciel", "fichier", "Internet"],
      activities: [
        "Nomme les éléments ou fonctions liés à la leçon.",
        "Décris les étapes permettant d'effectuer l'opération étudiée.",
        "Réalise une petite manipulation sur ordinateur lorsque le matériel est disponible."
      ],
      correction: "La réponse doit identifier les bons outils, respecter l'ordre des opérations et appliquer les règles de sécurité numérique."
    }
  };

  const COMMON_RULES = [
    "Lis attentivement la consigne avant de répondre.",
    "Présente ton raisonnement ou les étapes de ton travail.",
    "Relis ta réponse et corrige les erreurs éventuelles."
  ];

  function clean(value) {
    return String(value || "").trim();
  }

  function makeObjectives(subject, title, session) {
    const info = SUBJECTS[subject];

    return [
      "Comprendre la notion : " + clean(title) + ".",
      "Expliquer les éléments essentiels de cette leçon.",
      "Appliquer les connaissances dans une situation simple.",
      "Présenter correctement le résultat de son travail."
    ];
  }

  function makeCourse(subject, title, session) {
    const info = SUBJECTS[subject];

    return {
      introduction:
        "Cette séance porte sur « " + clean(session || title) +
        " ». Elle permet de découvrir et de comprendre cette notion dans le cadre de la leçon « " +
        clean(title) + " ».",

      explanation:
        "Pour maîtriser cette notion, commence par identifier ce qu'elle signifie. " +
        info.method + " Il faut ensuite retenir les éléments essentiels, savoir les reconnaître " +
        "dans une situation concrète et être capable de les expliquer avec des mots simples.",

      essential:
        "À retenir : " + clean(title) +
        " est la notion centrale de cette séance. L'élève doit être capable de la définir, " +
        "de reconnaître ses principales caractéristiques et de l'utiliser correctement.",

      example:
        "Exemple d'application : prends une situation de la vie quotidienne en Côte d'Ivoire " +
        "qui permet d'observer ou d'utiliser la notion « " + clean(title) +
        " ». Décris la situation, identifie la notion étudiée et explique ton observation.",

      vocabulary: info.vocabulary,

      method: info.method,

      conclusion:
        "À la fin de cette séance, tu dois pouvoir expliquer la notion étudiée, " +
        "donner un exemple et répondre à une question simple à son sujet."
    };
  }

  function makeExercises(subject, title, session) {
    const info = SUBJECTS[subject];

    return [
      {
        level: "Facile",
        instruction:
          "Définis ou explique avec tes propres mots la notion « " +
          clean(session || title) + " ».",
        correction:
          "Réponse attendue : une définition claire, courte et correcte de la notion. " +
          "Elle doit présenter son idée principale et employer le vocabulaire adapté."
      },
      {
        level: "Intermédiaire",
        instruction:
          info.activities[0] + " Utilise la leçon « " + clean(title) + " ».",
        correction: info.correction
      },
      {
        level: "Application",
        instruction:
          info.activities[1] + " Justifie ta réponse en quelques phrases.",
        correction:
          "Réponse attendue : une application cohérente de la notion étudiée, " +
          "avec des explications compréhensibles et des exemples pertinents."
      },
      {
        level: "Approfondissement",
        instruction:
          info.activities[2] + " Présente ton travail de manière organisée.",
        correction:
          "La réponse doit être personnelle, respecter la consigne et montrer que " +
          "l'élève sait réutiliser les connaissances de la séance."
      }
    ];
  }

  function makeQuiz(subject, title, session) {
    const info = SUBJECTS[subject];

    return [
      {
        question: "Quel est le thème principal de cette séance ?",
        answer: clean(session || title),
        explanation:
          "La séance porte précisément sur cette notion. Il faut pouvoir la reconnaître et la nommer."
      },
      {
        question: "Quel est l'objectif essentiel de cette séance ?",
        answer: info.goal,
        explanation:
          "Cet objectif indique la compétence que l'élève doit développer dans cette matière."
      },
      {
        question: "Quelle méthode faut-il appliquer pour réussir cette activité ?",
        answer: info.method,
        explanation:
          "La méthode permet de travailler dans un ordre logique et de vérifier son résultat."
      }
    ];
  }

  function makeAssessment(subject, title, session) {
    const info = SUBJECTS[subject];

    return {
      duration: "15 à 20 minutes",
      instructions: [
        "Lis les questions avec attention.",
        "Réponds sans consulter le cours.",
        "Relis tes réponses avant de terminer."
      ],
      questions: [
        {
          points: 4,
          question: "Présente et explique la notion étudiée dans cette séance.",
          expected:
            "L'élève doit donner une explication correcte de « " +
            clean(session || title) + " »."
        },
        {
          points: 3,
          question: "Donne deux éléments importants à retenir.",
          expected:
            "Deux éléments pertinents en rapport direct avec la notion étudiée."
        },
        {
          points: 3,
          question: "Présente un exemple concret d'application.",
          expected: info.correction
        }
      ],
      total: 10
    };
  }

  function buildSession(subject, title, session, index) {
    return {
      number: index + 1,
      title: clean(session),
      objectives: makeObjectives(subject, title, session),
      course: makeCourse(subject, title, session),
      exercises: makeExercises(subject, title, session),
      quiz: makeQuiz(subject, title, session),
      assessment: makeAssessment(subject, title, session),
      revision: [
        "Je sais définir la notion étudiée.",
        "Je peux expliquer les éléments essentiels.",
        "Je sais donner un exemple.",
        "Je peux réaliser un exercice d'application."
      ]
    };
  }

  function buildLesson(subject, lesson, index) {
    const title = clean(lesson.title);
    const sessions = Array.isArray(lesson.sessions)
      ? lesson.sessions
      : [];

    const sessionTitles = sessions.length
      ? sessions
      : [title];

    return {
      id: subject + "-" + (index + 1),
      number: index + 1,
      subject,
      section: lesson.section || "",
      title,
      objectives: makeObjectives(subject, title, ""),
      introduction:
        "Bienvenue dans la leçon « " + title + " ». " +
        SUBJECTS[subject].goal,
      sessions: sessionTitles.map((session, sessionIndex) =>
        buildSession(subject, title, session, sessionIndex)
      ),
      finalAssessment: makeAssessment(subject, title, title),
      revision: [
        "Je connais le titre et l'objectif de la leçon.",
        "Je peux expliquer les notions principales.",
        "Je sais appliquer la méthode dans un exercice.",
        "Je peux répondre aux questions de révision."
      ]
    };
  }

  function normalizeCurriculum(data) {
    const result = [];

    if (Array.isArray(data)) {
      data.forEach(item => {
        if (typeof item === "string") {
          result.push({
            title: item,
            section: "",
            sessions: []
          });
        } else if (item && typeof item.title === "string") {
          result.push({
            title: item.title,
            section: item.section || "",
            sessions: Array.isArray(item.sessions) ? item.sessions : []
          });
        }
      });
      return result;
    }

    if (data && typeof data === "object") {
      Object.entries(data).forEach(([section, items]) => {
        if (!Array.isArray(items)) return;

        items.forEach(item => {
          if (typeof item === "string") {
            result.push({
              title: item,
              section,
              sessions: []
            });
          } else if (item && typeof item.title === "string") {
            result.push({
              title: item.title,
              section: item.section || section,
              sessions: Array.isArray(item.sessions) ? item.sessions : []
            });
          }
        });
      });
    }

    return result;
  }

  function buildAll(curriculum) {
    const output = {};

    Object.entries(curriculum || {}).forEach(([subject, rawLessons]) => {
      if (!SUBJECTS[subject]) return;

      const lessons = normalizeCurriculum(rawLessons);

      output[subject] = {
        name: subject,
        icon: SUBJECTS[subject].icon,
        goal: SUBJECTS[subject].goal,
        lessonCount: lessons.length,
        lessons: lessons.map((lesson, index) =>
          buildLesson(subject, lesson, index)
        )
      };
    });

    return output;
  }

  window.ATP_LEARNING_CONTENT_6E = {
    version: "1.0.0",
    subjects: SUBJECTS,
    commonRules: COMMON_RULES,
    buildAll,
    buildLesson,
    buildSession
  };

})();
