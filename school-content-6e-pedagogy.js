/* ATP SCHOOL — couche pédagogique renforcée 6e
 * Ajoute une progression d'apprentissage, des contrôles de compréhension
 * et des conseils de méthode aux fiches réellement renseignées.
 * Les contenus restent des rédactions pédagogiques originales.
 */
(function () {
  "use strict";
  const engine = window.ATP_LEARNING_CONTENT_6E;
  if (!engine || typeof engine.buildAll !== "function") return;
  const previousBuildAll = engine.buildAll;

  const clean = value => String(value || "").trim();
  const asArray = value => Array.isArray(value) ? value.filter(Boolean) : (clean(value) ? [value] : []);

  function enrich(target, subject, lessonTitle) {
    if (!target || typeof target !== "object") return false;
    const nested = target.course && typeof target.course === "object" ? target.course : {};
    const definition = clean(nested.definition || target.definition);
    const explanations = asArray(nested.explanation || target.explanation);
    const example = clean(nested.example || target.example);
    const methods = asArray(nested.method || target.method);
    const vocabulary = asArray(nested.vocabulary || target.vocabulary);
    const exercises = asArray(target.exercises);
    const objectives = asArray(target.objectives || nested.objectives);

    // Ne jamais fabriquer un cours à partir du seul titre : on enrichit
    // uniquement une fiche qui possède déjà une matière pédagogique réelle.
    const genericFallback =
      definition.toLocaleLowerCase("fr").startsWith("cette leçon porte sur") ||
      example.toLocaleLowerCase("fr").startsWith("pour travailler") ||
      explanations.some(line => clean(line).startsWith("Commence par observer ou lire attentivement la situation proposée"));
    if (!definition || explanations.length < 2 || !example || !methods.length || genericFallback) {
      target.contentStatus = "Contenu à rédiger et vérifier — fiche spécifique insuffisante";
      return false;
    }

    const checkpoints = explanations.map((paragraph, index) => ({
      question: "Explique avec tes propres mots l'idée " + (index + 1) + " du cours.",
      answer: paragraph,
      explanation: "Reformule cette idée, puis vérifie que tu as conservé les informations importantes."
    }));

    const guide = {
      title: lessonTitle || target.title || "Leçon",
      subject,
      prerequisites: [
        "Lis d'abord le titre et les objectifs pour comprendre ce que tu vas apprendre.",
        "Repère les mots inconnus et consulte le vocabulaire de la leçon.",
        "Prépare ton cahier, un stylo et le matériel demandé par l'activité."
      ],
      progression: explanations.map((text, index) => ({
        heading: "Étape " + (index + 1) + " — comprendre la notion",
        text
      })),
      workedExample: {
        statement: example,
        steps: methods,
        conclusion: "Relis la question de départ et vérifie que le résultat ou l'explication répond exactement à cette question."
      },
      checkpoints,
      commonErrors: subject === "Mathématiques" || subject === "Physique-Chimie"
        ? [
            "Commencer un calcul sans identifier ce que l'énoncé demande.",
            "Oublier une unité ou ne pas respecter les unités de même nature.",
            "Donner un résultat sans montrer les étapes du raisonnement.",
            "Ne pas vérifier si le résultat est cohérent avec la situation."
          ]
        : [
            "Apprendre une définition sans être capable de l'expliquer avec ses propres mots.",
            "Confondre un exemple avec la règle générale.",
            "Répondre sans justifier à partir des informations du cours ou de l'observation.",
            "Employer un mot scientifique ou disciplinaire sans en connaître le sens."
          ],
      selfCheck: [
        "Je peux définir la notion sans recopier le cours.",
        "Je peux expliquer les idées principales dans le bon ordre.",
        "Je peux refaire l'exemple sans regarder la correction.",
        "Je peux résoudre un exercice nouveau et justifier ma réponse."
      ]
    };

    target.learningGuide = guide;
    target.contentStatus = "Fiche structurée — progression et compréhension guidée";
    target.course = {
      ...nested,
      definition,
      explanation: explanations,
      example,
      method: methods,
      vocabulary,
      essential: nested.essential || target.essential || target.revision || "",
      guidedProgression: guide.progression,
      workedExample: guide.workedExample,
      commonErrors: guide.commonErrors,
      selfCheck: guide.selfCheck
    };

    // Ajoute des questions de compréhension directement liées aux paragraphes.
    // Les exercices existants sont conservés et restent prioritaires.
    const existing = exercises.map(item => typeof item === "string"
      ? { instruction: item, correction: "Réponds en t'appuyant sur le cours." }
      : item);
    const seen = new Set(existing.map(item => clean(item.instruction || item.question).toLowerCase()));
    checkpoints.forEach((item, index) => {
      const instruction = "Compréhension " + (index + 1) + " : " + item.question;
      if (!seen.has(instruction.toLowerCase())) {
        existing.push({
          level: "Compréhension guidée",
          instruction,
          correction: item.answer
        });
      }
    });
    target.exercises = existing;

    target.revision = [
      "Définition : " + definition,
      "À retenir : " + clean(nested.essential || target.essential || ""),
      "Exemple : " + example,
      "Auto-contrôle : explique la notion, refais l'exemple et résous un exercice sans aide."
    ].filter(item => !item.endsWith(": "));
    return true;
  }

  engine.buildAll = function (raw) {
    const all = previousBuildAll(raw);
    let enrichedLessons = 0;
    let enrichedSessions = 0;
    const audit = [];
    Object.keys(all || {}).forEach(subject => {
      const lessons = all[subject] && Array.isArray(all[subject].lessons) ? all[subject].lessons : [];
      lessons.forEach(lesson => {
        const ok = enrich(lesson, subject, lesson.title);
        if (ok) enrichedLessons++;
        else audit.push({ subject, title: lesson.title || "Sans titre", status: "À compléter" });
        (lesson.sessions || []).forEach(session => {
          if (enrich(session, subject, session.title || lesson.title)) enrichedSessions++;
        });
      });
    });
    engine.pedagogyAudit = {
      version: "2.0",
      enrichedLessons,
      enrichedSessions,
      lessonsToComplete: audit
    };
    return all;
  };
  engine.pedagogyLayerVersion = "2.0";
})();
