/* ATP SCHOOL — compléments pédagogiques rédigés pour l'anglais 6e
 * Les activités suivent les unités et compétences du programme affiché :
 * interaction orale, compréhension orale, lecture et production écrite.
 * Contenus originaux d'apprentissage ; exemples adaptés au contexte scolaire.
 */
(function () {
  "use strict";
  const engine = window.ATP_LEARNING_CONTENT_6E;
  if (!engine || typeof engine.buildAll !== "function") return;
  const previousBuildAll = engine.buildAll;

  const units = {
    "at school": {
      definition: "Le vocabulaire de l'école permet de nommer les lieux, les personnes, le matériel et les activités scolaires. Pour communiquer, on utilise des phrases simples au présent et des expressions de politesse.",
      objectives: ["Nommer les principaux lieux et objets de l'école en anglais.", "Se présenter et présenter un camarade.", "Demander et donner une information simple en classe."],
      explanation: ["School désigne l'école ; classroom, la salle de classe ; teacher, l'enseignant ; pupil ou student, l'élève.", "Les objets courants sont book (livre), notebook (cahier), pen (stylo), pencil (crayon), ruler (règle), schoolbag (cartable) et board (tableau).", "Pour se présenter, on peut dire : My name is Awa. I am twelve. I am a student. Pour demander le nom : What is your name? Pour demander une permission : May I come in, please?", "L'article a s'emploie devant un nom singulier commençant par un son consonne : a book. An s'emploie devant un son voyelle : an exercise book.", "Les consignes fréquentes sont Listen, read, write, repeat, open your book et close your notebook."],
      example: "A: Good morning. What is your name? B: My name is Koffi. A: Are you a student? B: Yes, I am. I am in class 6e.",
      method: ["Écoute la phrase entière et repère les mots connus.", "Associe chaque mot nouveau à un objet ou à une image.", "Répète les expressions en respectant l'ordre des mots.", "Remplace les informations du modèle par les tiennes.", "Vérifie l'emploi de I am, you are et des articles a/an."],
      vocabulary: ["school : école", "classroom : salle de classe", "teacher : enseignant", "student/pupil : élève", "book : livre", "notebook : cahier", "pen : stylo", "pencil : crayon", "ruler : règle", "board : tableau", "May I…? : Puis-je… ?"],
      essential: "Pour parler de soi : My name is… / I am… . Pour demander : What is your name? / May I…? Les mots de l'école doivent être appris avec leur prononciation et leur emploi dans une phrase.",
      exercises: [
        {level:"Vocabulaire",instruction:"Traduis en anglais : école, enseignant, cahier, règle.",correction:"School, teacher, notebook, ruler."},
        {level:"Dialogue",instruction:"Complète : A: What is your name? B: … A: Are you a student? B: …",correction:"B: My name is [ton prénom]. B: Yes, I am."},
        {level:"Grammaire",instruction:"Choisis a ou an : … book ; … exercise book.",correction:"A book ; an exercise book. On choisit selon le son initial."}
      ],
      quiz: [{question:"Comment demande-t-on le nom d'une personne ?",answer:"What is your name?",explanation:"C'est la question usuelle pour demander le nom."},{question:"Traduis « cahier ».",answer:"Notebook.",explanation:"Notebook désigne un cahier d'écolier."}]
    },
    "at home": {
      definition:"Le thème At Home permet de décrire son logement, les pièces, les membres de la famille et les activités domestiques à l'aide de noms, d'adjectifs possessifs et de phrases simples.",
      objectives:["Nommer les pièces et objets de la maison.","Présenter les membres de sa famille.","Décrire simplement une maison et situer des objets."],
      explanation:["House signifie maison ou bâtiment ; home insiste souvent sur le foyer, le lieu où l'on vit.", "Les pièces courantes sont bedroom (chambre), living room (salon), kitchen (cuisine), bathroom (salle de bain) et dining room (salle à manger).", "Les membres de la famille : father, mother, parents, brother, sister, grandfather, grandmother.", "Les adjectifs possessifs my, your, his, her, our et their se placent avant le nom : my mother, her room, our house.", "There is s'emploie pour présenter un élément au singulier ; there are pour plusieurs éléments : There is a table. There are two chairs.", "Les prépositions in, on et under indiquent notamment qu'un objet est dans, sur ou sous un autre objet."],
      example:"This is my house. There are three bedrooms. The kitchen is next to the living room. My books are on the table.",
      method:["Identifie si tu parles d'une personne, d'une pièce ou d'un objet.","Choisis le nom anglais exact.","Utilise my/your/his/her pour préciser la possession.","Utilise there is au singulier et there are au pluriel.","Ajoute une préposition pour situer un objet."],
      vocabulary:["house : maison","bedroom : chambre","kitchen : cuisine","living room : salon","bathroom : salle de bain","father : père","mother : mère","brother : frère","sister : sœur","there is : il y a (singulier)","there are : il y a (pluriel)","under : sous","next to : à côté de"],
      essential:"There is + nom singulier ; There are + nom pluriel. Les possessifs my, your, his, her, our et their précèdent le nom.",
      exercises:[{level:"Vocabulaire",instruction:"Traduis : kitchen, bedroom, mother, brother.",correction:"Cuisine, chambre, mère, frère."},{level:"Grammaire",instruction:"Complète : There … a bed. There … two chairs.",correction:"There is a bed. There are two chairs."},{level:"Production",instruction:"Écris trois phrases pour présenter ta maison ou une maison imaginaire.",correction:"Exemple : This is my house. There are two bedrooms. The kitchen is next to the living room."}],
      quiz:[{question:"Quelle expression utilise-t-on avec un seul objet ?",answer:"There is.",explanation:"There is introduit un élément singulier."},{question:"Que signifie « my sister » ?",answer:"Ma sœur.",explanation:"My indique la possession à la première personne."}]
    },
    "time and date": {
      definition:"Dire l'heure et la date en anglais nécessite de connaître les nombres, les jours, les mois et les expressions servant à demander ou donner une information temporelle.",
      objectives:["Nommer les jours et les mois.","Demander et donner l'heure.","Écrire une date simple et parler de son emploi du temps."],
      explanation:["Les jours sont Monday, Tuesday, Wednesday, Thursday, Friday, Saturday et Sunday. Ils prennent une majuscule en anglais.", "Les mois sont January, February, March, April, May, June, July, August, September, October, November et December.", "Pour demander l'heure : What time is it? On peut répondre : It is seven o'clock (7 h), It is half past seven (7 h 30) ou It is a quarter past seven (7 h 15).", "Pour parler d'un jour, on utilise on : on Monday. Pour un mois ou une année, on utilise in : in June, in 2026.", "La date peut s'écrire The 7th of November ou November 7th selon la convention retenue. Les nombres ordinaux indiquent le rang : first, second, third, fourth…"],
      example:"A: What day is it today? B: It is Friday. A: What time is it? B: It is half past eight. My English lesson is on Friday.",
      method:["Apprends les jours et les mois dans l'ordre et avec leur majuscule.","Repère les heures et les minutes sur une horloge.","Utilise o'clock pour l'heure juste, half past pour trente minutes et quarter past pour quinze minutes.","Choisis on avec un jour et in avec un mois ou une année.","Relis la date en vérifiant l'ordre des éléments."],
      vocabulary:["day : jour","week : semaine","month : mois","year : année","today : aujourd'hui","tomorrow : demain","yesterday : hier","o'clock : heure juste","half past : et demie","quarter past : et quart","What time is it? : Quelle heure est-il ?"],
      essential:"What time is it? — It is… . Les jours et mois prennent une majuscule. On Monday, in July, in 2026.",
      exercises:[{level:"Vocabulaire",instruction:"Écris en anglais les jours lundi, mercredi et dimanche.",correction:"Monday, Wednesday, Sunday."},{level:"Heure",instruction:"Écris en anglais : 6 h ; 8 h 30 ; 10 h 15.",correction:"Six o'clock; half past eight; a quarter past ten."},{level:"Grammaire",instruction:"Complète : … Monday ; … August.",correction:"On Monday ; in August."}],
      quiz:[{question:"Quel mot introduit généralement un jour précis ?",answer:"On.",explanation:"On Monday, on Tuesday…"},{"question":"Comment dit-on 7 h 30 ?",answer:"Half past seven.",explanation:"Half past signifie trente minutes après l'heure."}]
    },
    "jobs and occupations": {
      definition:"Le vocabulaire des métiers sert à nommer les professions et à parler du travail d'une personne. On utilise notamment le verbe be pour identifier une profession et work pour parler de l'activité professionnelle.",
      objectives:["Nommer plusieurs métiers en anglais.","Demander et dire ce que fait une personne.","Construire des phrases affirmatives et interrogatives simples."],
      explanation:["Quelques métiers : teacher (enseignant), doctor (médecin), nurse (infirmier/infirmière), farmer (agriculteur), driver (conducteur), trader (commerçant), police officer (policier), carpenter (menuisier).", "Pour présenter une profession au singulier, l'article est généralement nécessaire : She is a nurse. He is a farmer. On dit an engineer devant un son voyelle.", "La question What do you do? demande généralement quelle est la profession. What does your father do? concerne le père.", "Avec he, she ou it au présent simple, le verbe lexical prend généralement -s : He works. She teaches. Avec I, you, we, they, il reste à la base : They work.", "Les métiers peuvent être décrits par une action : A nurse cares for sick people. A farmer grows crops."],
      example:"A: What does your mother do? B: She is a teacher. She teaches pupils at school.",
      method:["Repère la personne dont on parle.","Choisis le nom du métier.","Utilise is/am/are pour identifier la profession.","Ajoute a ou an devant un métier singulier lorsque nécessaire.","Pour décrire le travail, accorde le verbe au présent simple."],
      vocabulary:["job : emploi/métier","occupation : profession","teacher : enseignant","doctor : médecin","nurse : infirmier","farmer : agriculteur","driver : conducteur","carpenter : menuisier","works : travaille","teaches : enseigne","grows : cultive"],
      essential:"She is a teacher. He is a driver. Au présent simple, he/she/it prend généralement -s au verbe : works, teaches, grows.",
      exercises:[{level:"Vocabulaire",instruction:"Traduis : farmer, nurse, driver, teacher.",correction:"Agriculteur, infirmier/infirmière, conducteur, enseignant."},{level:"Grammaire",instruction:"Complète : She … a doctor. He … on a farm.",correction:"She is a doctor. He works on a farm."},{level:"Production",instruction:"Écris deux phrases pour présenter un métier et une tâche associée.",correction:"Exemple : My father is a farmer. He grows cocoa."}],
      quiz:[{question:"Quel article utilise-t-on dans « … nurse » ?",answer:"A nurse.",explanation:"Nurse commence par un son consonne."},{question:"Quelle forme du verbe work utilise-t-on avec she ?",answer:"Works.",explanation:"Au présent simple, le verbe prend généralement -s à la troisième personne du singulier."}]
    },
    "clothes and colours": {
      definition:"Le thème Clothes and Colours apprend à nommer les vêtements et les couleurs, puis à décrire ce qu'une personne porte avec le verbe wear et le présent continu.",
      objectives:["Nommer les vêtements et les couleurs courantes.","Décrire la tenue d'une personne.","Distinguer une habitude d'une action en cours."],
      explanation:["Les vêtements courants : shirt (chemise), T-shirt, trousers (pantalon), skirt (jupe), dress (robe), shoes (chaussures), socks (chaussettes), hat (chapeau), uniform (uniforme).", "Les couleurs : red, blue, yellow, green, black, white, orange, brown, purple, pink et grey.", "L'adjectif de couleur se place généralement avant le nom : a blue shirt, red shoes. Il ne prend pas de marque de pluriel.", "Le présent simple décrit une habitude : I wear a uniform at school. Le présent continu décrit ce qui se passe maintenant : She is wearing a red dress.", "Le présent continu se forme avec am/is/are + verbe en -ing : I am wearing, he is wearing, they are wearing."],
      example:"Today, Awa is wearing a white shirt, a blue skirt and black shoes. At school, she usually wears a uniform.",
      method:["Observe la personne ou l'image.","Nomme le vêtement en anglais.","Ajoute la couleur avant le nom.","Choisis wear pour une habitude ou am/is/are wearing pour une tenue portée maintenant.","Vérifie l'auxiliaire et la terminaison -ing."],
      vocabulary:["clothes : vêtements","shirt : chemise","trousers : pantalon","skirt : jupe","dress : robe","shoes : chaussures","uniform : uniforme","red : rouge","blue : bleu","green : vert","black : noir","white : blanc","wear : porter","wearing : portant"],
      essential:"L'adjectif de couleur précède le nom : a red shirt. Présent continu : am/is/are + wearing.",
      exercises:[{level:"Vocabulaire",instruction:"Traduis : a green shirt, black shoes, a white dress.",correction:"Une chemise verte, des chaussures noires, une robe blanche."},{level:"Grammaire",instruction:"Complète : She … wearing a blue skirt.",correction:"She is wearing a blue skirt."},{level:"Production",instruction:"Décris en trois phrases la tenue d'un élève.",correction:"Exemple : He is wearing a white shirt. He is wearing blue trousers. His shoes are black."}],
      quiz:[{question:"Où place-t-on généralement la couleur ?",answer:"Avant le nom : a blue shirt.",explanation:"L'adjectif précède le nom en anglais."},{question:"Complète : They … wearing uniforms.",answer:"Are.",explanation:"Avec they, l'auxiliaire du présent continu est are."}]
    },
    "food and drinks": {
      definition:"Le thème Food and Drinks permet de nommer les aliments et boissons, d'exprimer ses goûts et de demander ou proposer quelque chose à manger ou à boire.",
      objectives:["Nommer les aliments et boissons courants.","Exprimer ses goûts et préférences.","Utiliser some, any et les noms dénombrables ou indénombrables dans des phrases simples."],
      explanation:["Les aliments : rice (riz), bread (pain), fish (poisson), meat (viande), egg (œuf), plantain (banane plantain), cassava (manioc), beans (haricots), fruit (fruit).", "Les boissons : water (eau), milk (lait), juice (jus), tea (thé).", "Like exprime un goût : I like rice. Pour une préférence négative : I don't like milk. À la troisième personne : She likes fish.", "Les noms dénombrables ont un singulier et un pluriel : an egg/two eggs. Les noms indénombrables se présentent généralement sans pluriel dans cet emploi : rice, water, milk.", "Some s'emploie souvent dans les phrases affirmatives : I have some rice. Any apparaît fréquemment dans les questions et phrases négatives : Do you have any water? I don't have any juice.", "Pour proposer poliment : Would you like some water? Pour demander : Can I have some bread, please?"],
      example:"A: What do you like for breakfast? B: I like bread and milk. A: Would you like some juice? B: Yes, please.",
      method:["Classe le mot : aliment ou boisson.","Vérifie si le nom est dénombrable ou indénombrable.","Utilise like/don't like pour exprimer un goût.","Accorde likes avec he, she ou it.","Utilise some dans une affirmation et any dans une question ou une négation selon le contexte."],
      vocabulary:["food : nourriture","drink : boisson","rice : riz","bread : pain","fish : poisson","egg : œuf","beans : haricots","water : eau","milk : lait","juice : jus","like : aimer","Would you like…? : Voulez-vous… ?","please : s'il vous plaît"],
      essential:"I like / I don't like ; She likes. Some est fréquent dans les affirmations ; any dans les questions et négations. Rice et water sont généralement indénombrables.",
      exercises:[{level:"Vocabulaire",instruction:"Traduis : rice, cassava, water, juice.",correction:"Riz, manioc, eau, jus."},{level:"Grammaire",instruction:"Corrige : She like fish.",correction:"She likes fish. Le verbe prend -s avec she au présent simple."},{level:"Dialogue",instruction:"Écris une demande polie pour obtenir de l'eau.",correction:"Can I have some water, please? / Would you like some water? selon qu'on demande ou propose."}],
      quiz:[{question:"Quel mot complète « She … rice » ?",answer:"Likes.",explanation:"Au présent simple, like prend -s avec she."},{question:"Quel nom est généralement indénombrable : eggs ou water ?",answer:"Water.",explanation:"On dit some water, et non généralement two waters pour parler de la matière."}]
    },
    "health and environment": {
      definition:"Le thème Health and Environment développe le vocabulaire de la santé, de l'hygiène et de la protection de l'environnement. Il apprend à lire des consignes et à expliquer des habitudes utiles.",
      objectives:["Comprendre et employer le vocabulaire de la santé et de l'environnement.","Lire un court texte informatif et en repérer l'idée principale.","Donner des conseils simples avec should et des consignes avec l'impératif."],
      explanation:["Le vocabulaire de la santé comprend health, illness, sick, doctor, hospital, clean, handwashing, water et food. Celui de l'environnement comprend environment, rubbish, pollution, tree, river et clean-up.", "Pour conseiller, should est suivi de la base verbale : You should wash your hands. Pour déconseiller : You should not throw rubbish into the river.", "L'impératif donne une instruction : Wash your hands. Don't drink dirty water. Le sujet you n'est généralement pas écrit.", "Une bonne hygiène inclut le lavage des mains avec de l'eau propre et du savon, la conservation des aliments et l'utilisation d'eau potable.", "Protéger l'environnement consiste notamment à réduire les déchets, utiliser les poubelles, éviter de polluer les cours d'eau et préserver les arbres.", "Pour comprendre un texte, repère le titre, les mots répétés, les actions recommandées et les connecteurs comme because (parce que) et so (donc)."],
      example:"Keep your school clean. Put rubbish in the bin. You should wash your hands before eating because clean hands help prevent some illnesses.",
      method:["Lis le titre puis repère les mots liés à la santé ou à l'environnement.","Identifie le problème présenté.","Repère les conseils et les actions recommandées.","Utilise should + verbe pour donner un conseil.","Utilise l'impératif pour une consigne directe."],
      vocabulary:["health : santé","healthy : en bonne santé","sick : malade","doctor : médecin","hospital : hôpital","environment : environnement","rubbish : déchets","pollution : pollution","river : rivière","tree : arbre","should : devrait","bin : poubelle","wash : laver"],
      essential:"Should + base verbale exprime un conseil. L'impératif sert à donner une consigne : Keep the environment clean. Don't throw rubbish.",
      exercises:[{level:"Compréhension",instruction:"Explique en français : You should wash your hands before eating.",correction:"Tu devrais te laver les mains avant de manger."},{level:"Grammaire",instruction:"Complète : You should … (protect) the river.",correction:"You should protect the river. Après should, on utilise la base verbale."},{level:"Production",instruction:"Écris trois consignes en anglais pour garder l'école propre.",correction:"Exemple : Use the bin. Do not throw rubbish. Keep the classroom clean."}],
      quiz:[{question:"Quelle forme suit should ?",answer:"La base verbale sans to.",explanation:"On dit should protect, et non should to protect."},{question:"Traduis « rubbish ».",answer:"Déchets / ordures.",explanation:"Rubbish désigne les déchets."}]
    }
  };

  function unitFor(title, section) {
    const source = (String(title || "") + " " + String(section || "")).toLowerCase();
    for (const key of Object.keys(units)) if (source.includes(key)) return units[key];
    return null;
  }

  function cloneCourse(course, sessionTitle) {
    const c = JSON.parse(JSON.stringify(course));
    c.introduction = "Situation d'apprentissage : un élève de 6e doit communiquer en anglais dans une situation de la vie quotidienne. Observe le contexte, mobilise le vocabulaire et construis des phrases simples pour accomplir la tâche.";
    c.conclusion = "À la fin de cette séance, tu dois pouvoir employer les mots et structures étudiés dans une situation nouvelle, à l'oral ou à l'écrit.";
    c.sessionFocus = sessionTitle;
    return c;
  }

  engine.buildAll = function (raw) {
    const all = previousBuildAll(raw);
    const english = all && all.Anglais;
    if (!english || !Array.isArray(english.lessons)) return all;

    english.lessons.forEach((lesson, index) => {
      const course = unitFor(lesson.title, "");
      if (!course) return;
      const c = cloneCourse(course, lesson.title);
      lesson.definition = c.definition;
      lesson.objectives = c.objectives;
      lesson.explanation = c.explanation;
      lesson.example = c.example;
      lesson.method = c.method;
      lesson.vocabulary = c.vocabulary;
      lesson.essential = c.essential;
      lesson.exercises = c.exercises;
      lesson.quiz = c.quiz;
      lesson.introduction = c.introduction;
      lesson.conclusion = c.conclusion;
      lesson.finalAssessment = {
        duration: "25 minutes", total: 20,
        instructions: ["Lis le cours et les consignes.", "Réponds sans regarder les exemples.", "Relis tes phrases et vérifie le vocabulaire et la grammaire."],
        questions: [
          {question:"Explique le vocabulaire essentiel de l'unité.",points:4,expected:c.vocabulary.slice(0,6).join("; ")},
          {question:"Présente la règle ou la structure grammaticale étudiée.",points:6,expected:c.explanation.slice(2,5).join(" ")},
          {question:"Rédige un court dialogue ou paragraphe lié au thème.",points:6,expected:c.example},
          {question:"Traduis correctement deux expressions du vocabulaire.",points:4,expected:c.vocabulary.slice(0,2).join("; ")}
        ]
      };

      (lesson.sessions || []).forEach((session, sessionIndex) => {
        const focus = String(session.title || "").toLowerCase();
        const sessionCourse = cloneCourse(course, session.title || lesson.title);
        if (sessionIndex === 0) {
          sessionCourse.explanation = course.explanation.slice(0, 3);
          sessionCourse.exercises = course.exercises.slice(0, 2);
        } else if (sessionIndex === 1) {
          sessionCourse.explanation = course.explanation.slice(2);
          sessionCourse.exercises = course.exercises.slice(1);
        }
        session.objectives = course.objectives;
        session.introduction = "Objectif de séance : " + (session.title || lesson.title) + ". La situation de communication sert de point de départ ; entraîne-toi à comprendre puis à produire des énoncés corrects.";
        session.course = {
          definition: course.definition,
          explanation: sessionCourse.explanation,
          example: course.example,
          method: course.method,
          vocabulary: course.vocabulary,
          essential: course.essential,
          conclusion: "Réutilise les expressions étudiées dans une phrase personnelle et vérifie la correction de ta production."
        };
        session.exercises = sessionCourse.exercises;
        session.quiz = course.quiz;
        session.revision = ["Définition : " + course.definition, "À retenir : " + course.essential, "Exemple : " + course.example];
      });
    });
    engine.english6eContentVersion = "1.0";
    return all;
  };
})();
