(function () {
  "use strict";

  const SUBJECTS = [
    "Français",
    "Mathématiques",
    "Anglais",
    "Histoire-Géographie",
    "SVT",
    "Physique-Chimie",
    "EDHC",
    "Arts plastiques",
    "Éducation musicale",
    "EPS",
    "TICE"
  ];

  const clean = value => String(value || "").trim();

  function toArray(value) {
    if (Array.isArray(value)) return value;
    if (value && typeof value === "object") {
      if (Array.isArray(value.sessions)) return value.sessions;
      return Object.values(value);
    }
    if (typeof value === "string") return [value];
    return [];
  }

  function getTitle(item) {
    if (typeof item === "string") return clean(item);
    if (!item || typeof item !== "object") return "";
    return clean(item.title || item.name || item.label || item.intitule);
  }

  function normalizeCurriculum(raw) {
    const result = {};

    Object.keys(raw || {}).forEach(subject => {
      const source = raw[subject];
      const lessons = [];

      if (Array.isArray(source)) {
        source.forEach(item => {
          if (typeof item === "string") {
            lessons.push({ title: item, section: "" });
          } else if (item && typeof item === "object") {
            if (Array.isArray(item.sessions)) {
              lessons.push({
                title: getTitle(item),
                section: item.section || "",
                sessions: item.sessions
              });
            } else {
              lessons.push({
                title: getTitle(item),
                section: item.section || ""
              });
            }
          }
        });
      } else if (source && typeof source === "object") {
        Object.keys(source).forEach(section => {
          const sectionItems = source[section];

          if (Array.isArray(sectionItems)) {
            sectionItems.forEach(item => {
              lessons.push({
                title: getTitle(item),
                section: section
              });
            });
          } else if (sectionItems && typeof sectionItems === "object") {
            if (Array.isArray(sectionItems.sessions)) {
              lessons.push({
                title: getTitle(sectionItems),
                section,
                sessions: sectionItems.sessions
              });
            } else {
              lessons.push({
                title: getTitle(sectionItems),
                section
              });
            }
          }
        });
      }

      result[subject] = lessons.filter(item => item.title);
    });

    return result;
  }

  function identify(subject, title) {
    const t = title.toLowerCase();

    const contains = (...words) =>
      words.some(word => t.includes(word));

    if (subject === "Mathématiques") {
      if (contains("fraction")) return "fractions";
      if (contains("décimal", "entier", "nombre")) return "nombres";
      if (contains("droite", "point", "segment")) return "geometrie";
      if (contains("cercle", "disque")) return "cercle";
      if (contains("angle")) return "angles";
      if (contains("triangle")) return "triangles";
      if (contains("proportion")) return "proportion";
      if (contains("symétr")) return "symetrie";
      if (contains("parallélogramme")) return "parallelogramme";
      if (contains("statistique")) return "statistiques";
      if (contains("pavé", "cylindre")) return "solides";
      return "mathematiques";
    }

    if (subject === "Français") {
      if (contains("dialogue", "communication orale")) return "oral";
      if (contains("lettre")) return "lettre";
      if (contains("récit", "narratif")) return "recit";
      if (contains("description", "descriptif")) return "description";
      if (contains("phrase")) return "phrase";
      if (contains("groupe nominal")) return "nom";
      if (contains("discours")) return "discours";
      if (contains("verbe", "groupe verbal")) return "verbe";
      if (contains("adverbe")) return "adverbe";
      if (contains("orthographe")) return "orthographe";
      if (contains("œuvre", "lecture suivie")) return "lecture";
      return "francais";
    }

    if (subject === "Anglais") {
      if (contains("school")) return "school";
      if (contains("home")) return "home";
      if (contains("time", "date")) return "time";
      if (contains("jobs", "occupations")) return "jobs";
      if (contains("clothes", "colours")) return "clothes";
      if (contains("food", "drinks")) return "food";
      if (contains("health", "environment")) return "health";
      return "english";
    }

    if (subject === "Histoire-Géographie") {
      if (contains("histoire", "paléolithique", "néolithique", "métallurgie",
        "chronologie", "périodes", "sources")) return "histoire";
      return "geographie";
    }

    if (subject === "SVT") {
      if (contains("graine", "germination", "plantes", "fleurs")) return "plantes";
      if (contains("mammifères", "oiseaux", "reproduction")) return "reproduction";
      if (contains("vers de terre", "aliments", "croissance")) return "croissance";
      if (contains("environnement", "dégradation", "néfastes")) return "environnement";
      return "svt";
    }

    if (subject === "Physique-Chimie") {
      if (contains("circuit", "électrique", "court-circuit")) return "electricite";
      if (contains("solide", "liquide", "gaz", "état")) return "matiere";
      if (contains("température")) return "temperature";
      if (contains("air", "combustion", "combustible")) return "air";
      if (contains("volume", "masse")) return "mesures";
      return "physique";
    }

    if (subject === "EDHC") return "edhc";
    if (subject === "Arts plastiques") return "arts";
    if (subject === "Éducation musicale") return "musique";
    if (subject === "EPS") return "eps";
    if (subject === "TICE") return "tice";

    return "general";
  }

  const COURSES = {
    fractions: {
      definition: "Une fraction représente une ou plusieurs parts égales d'une unité partagée.",
      objectives: [
        "Comprendre le sens d'une fraction.",
        "Identifier le numérateur et le dénominateur.",
        "Lire, écrire et représenter une fraction."
      ],
      explanation: [
        "Une fraction s'écrit sous la forme a/b, avec b différent de zéro.",
        "Le nombre du haut est le numérateur : il indique le nombre de parts considérées.",
        "Le nombre du bas est le dénominateur : il indique en combien de parts égales l'unité est partagée.",
        "Par exemple, 3/4 signifie que l'on considère trois parts sur quatre parts égales."
      ],
      example: "Un gâteau est partagé en 8 parts égales. Si Awa mange 3 parts, elle a mangé 3/8 du gâteau.",
      method: [
        "Repérer le nombre de parts égales de l'unité.",
        "Compter les parts considérées.",
        "Écrire le nombre de parts considérées au numérateur.",
        "Écrire le nombre total de parts au dénominateur."
      ],
      vocabulary: ["Fraction", "Numérateur", "Dénominateur", "Unité", "Part égale"],
      revision: "Une fraction permet de représenter une partie d'un tout. Le numérateur indique les parts prises et le dénominateur le nombre total de parts égales."
    },

    nombres: {
      definition: "Les nombres servent à compter, mesurer, comparer et effectuer des calculs.",
      objectives: [
        "Lire et écrire les nombres.",
        "Identifier la valeur des chiffres selon leur position.",
        "Comparer et ranger des nombres.",
        "Effectuer des opérations simples."
      ],
      explanation: [
        "Dans notre système de numération décimale, dix unités d'un ordre forment une unité de l'ordre immédiatement supérieur.",
        "La position d'un chiffre détermine sa valeur.",
        "Pour comparer deux nombres, on compare d'abord leur nombre de chiffres, puis leurs chiffres de gauche à droite.",
        "Les quatre opérations fondamentales sont l'addition, la soustraction, la multiplication et la division."
      ],
      example: "Dans 4 582, le chiffre 4 représente 4 milliers, le chiffre 5 représente 5 centaines, le chiffre 8 représente 8 dizaines et le chiffre 2 représente 2 unités.",
      method: [
        "Lire le nombre de gauche à droite.",
        "Repérer la position de chaque chiffre.",
        "Comparer les nombres en commençant par le chiffre de plus grand rang.",
        "Vérifier le résultat d'un calcul par une opération inverse lorsque cela est possible."
      ],
      vocabulary: ["Unité", "Dizaine", "Centaine", "Millier", "Addition", "Soustraction"],
      revision: "La numération décimale repose sur des groupements de dix. La position de chaque chiffre détermine sa valeur."
    },

    geometrie: {
      definition: "La géométrie étudie les figures, les points, les droites et leurs propriétés.",
      objectives: [
        "Reconnaître et nommer les objets géométriques.",
        "Utiliser correctement le vocabulaire géométrique.",
        "Construire des figures à l'aide des instruments."
      ],
      explanation: [
        "Un point indique une position. Il est généralement désigné par une lettre majuscule.",
        "Une droite est illimitée dans les deux sens.",
        "Une demi-droite possède une origine et se prolonge dans un seul sens.",
        "Deux droites peuvent être sécantes lorsqu'elles se coupent ou parallèles lorsqu'elles ne se rencontrent pas."
      ],
      example: "Si les droites (AB) et (CD) se coupent en O, le point O est leur point d'intersection.",
      method: [
        "Observer les données de la figure.",
        "Identifier les points et les droites.",
        "Utiliser la règle pour tracer les droites.",
        "Nommer chaque objet géométrique avec précision."
      ],
      vocabulary: ["Point", "Droite", "Demi-droite", "Parallèle", "Sécante"],
      revision: "Le point représente une position. La droite est illimitée dans les deux sens. Les droites parallèles ne se coupent pas."
    },

    cercle: {
      definition: "Un cercle est l'ensemble des points situés à une même distance d'un point appelé centre.",
      objectives: [
        "Identifier le centre d'un cercle.",
        "Reconnaître un rayon et un diamètre.",
        "Tracer un cercle avec un compas."
      ],
      explanation: [
        "Le centre est le point fixe à égale distance de tous les points du cercle.",
        "Le rayon est un segment qui relie le centre à un point du cercle.",
        "Le diamètre est un segment qui relie deux points du cercle en passant par le centre.",
        "Le diamètre mesure deux fois le rayon.",
        "Le disque est la surface limitée par le cercle."
      ],
      example: "Si le rayon d'un cercle mesure 3 cm, son diamètre mesure 6 cm.",
      method: [
        "Placer la pointe du compas au centre choisi.",
        "Régler l'ouverture du compas à la longueur du rayon.",
        "Faire tourner le compas sans déplacer sa pointe.",
        "Vérifier la régularité du tracé."
      ],
      vocabulary: ["Cercle", "Disque", "Centre", "Rayon", "Diamètre"],
      revision: "Le rayon relie le centre au cercle. Le diamètre passe par le centre et vaut deux rayons."
    },

    angles: {
      definition: "Un angle est une figure géométrique formée par deux demi-droites ayant la même origine.",
      objectives: [
        "Reconnaître les éléments d'un angle.",
        "Distinguer les différents types d'angles.",
        "Mesurer et construire un angle avec un rapporteur."
      ],
      explanation: [
        "Le sommet est l'origine commune des deux demi-droites.",
        "Les côtés de l'angle sont les deux demi-droites.",
        "Un angle aigu mesure moins de 90°.",
        "Un angle droit mesure exactement 90°.",
        "Un angle obtus mesure plus de 90° et moins de 180°.",
        "Un angle plat mesure 180°."
      ],
      example: "Un angle de 45° est aigu. Un angle de 90° est droit. Un angle de 120° est obtus.",
      method: [
        "Placer le centre du rapporteur sur le sommet.",
        "Aligner la base du rapporteur sur un côté.",
        "Lire la graduation correspondant à l'autre côté.",
        "Indiquer la mesure en degrés."
      ],
      vocabulary: ["Sommet", "Côté", "Angle aigu", "Angle droit", "Angle obtus", "Degré"],
      revision: "Les angles se mesurent en degrés. L'angle droit mesure 90° et l'angle plat mesure 180°."
    },

    triangles: {
      definition: "Un triangle est un polygone qui possède trois côtés, trois sommets et trois angles.",
      objectives: [
        "Identifier les éléments d'un triangle.",
        "Reconnaître les principales catégories de triangles.",
        "Construire un triangle à l'aide des instruments."
      ],
      explanation: [
        "Un triangle possède trois côtés et trois sommets.",
        "Le triangle équilatéral possède trois côtés de même longueur.",
        "Le triangle isocèle possède deux côtés de même longueur.",
        "Le triangle rectangle possède un angle droit.",
        "La somme des mesures des angles d'un triangle est égale à 180°."
      ],
      example: "Un triangle dont les angles mesurent 60°, 60° et 60° est équilatéral.",
      method: [
        "Identifier les longueurs et les angles donnés.",
        "Tracer un premier côté.",
        "Utiliser la règle et le compas pour placer le troisième sommet.",
        "Relier les sommets et vérifier la construction."
      ],
      vocabulary: ["Sommet", "Côté", "Triangle équilatéral", "Triangle isocèle", "Triangle rectangle"],
      revision: "Un triangle possède trois côtés. La somme de ses trois angles est égale à 180°."
    },

    proportion: {
      definition: "La proportionnalité est une relation entre deux grandeurs qui évoluent dans le même rapport.",
      objectives: [
        "Reconnaître une situation de proportionnalité.",
        "Compléter un tableau de proportionnalité.",
        "Résoudre des problèmes simples."
      ],
      explanation: [
        "Deux grandeurs sont proportionnelles lorsqu'on passe de l'une à l'autre en multipliant toujours par le même nombre.",
        "Ce nombre est appelé coefficient de proportionnalité.",
        "Un tableau permet de présenter les valeurs correspondantes.",
        "La multiplication et la division permettent de trouver les valeurs manquantes."
      ],
      example: "Si un cahier coûte 250 F CFA, trois cahiers coûtent 250 × 3 = 750 F CFA.",
      method: [
        "Identifier les deux grandeurs.",
        "Chercher le coefficient de proportionnalité.",
        "Effectuer la multiplication ou la division nécessaire.",
        "Vérifier que le résultat est cohérent."
      ],
      vocabulary: ["Proportionnalité", "Coefficient", "Grandeur", "Tableau"],
      revision: "Dans une situation de proportionnalité, on utilise un coefficient constant pour passer d'une grandeur à l'autre."
    },

    symetrie: {
      definition: "La symétrie centrale est une transformation géométrique qui associe à chaque point un point situé de l'autre côté d'un centre.",
      objectives: [
        "Comprendre la notion de symétrie centrale.",
        "Construire le symétrique d'un point.",
        "Reconnaître une figure et son image."
      ],
      explanation: [
        "Le point O est appelé centre de symétrie.",
        "Un point A et son symétrique A' sont alignés avec O.",
        "Le centre O est le milieu du segment [AA'].",
        "La symétrie centrale conserve les longueurs et les mesures des angles."
      ],
      example: "Si O est le milieu du segment [AA'], alors A' est le symétrique de A par rapport à O.",
      method: [
        "Tracer la droite passant par le point et le centre.",
        "Mesurer la distance entre le point et le centre.",
        "Reporter la même distance de l'autre côté du centre.",
        "Nommer le point obtenu."
      ],
      vocabulary: ["Symétrie centrale", "Centre", "Symétrique", "Milieu"],
      revision: "Dans une symétrie centrale, le centre est le milieu du segment reliant un point à son image."
    },

    parallelogramme: {
      definition: "Un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.",
      objectives: [
        "Reconnaître un parallélogramme.",
        "Identifier ses propriétés.",
        "Construire un parallélogramme."
      ],
      explanation: [
        "Un parallélogramme possède quatre côtés.",
        "Ses côtés opposés sont parallèles et de même longueur.",
        "Ses diagonales se coupent en leur milieu.",
        "Un rectangle, un losange et un carré sont des cas particuliers de parallélogrammes."
      ],
      example: "Dans un parallélogramme ABCD, les côtés [AB] et [CD] sont parallèles.",
      method: [
        "Tracer deux côtés consécutifs.",
        "Construire les parallèles nécessaires.",
        "Déterminer le quatrième sommet.",
        "Vérifier le parallélisme des côtés opposés."
      ],
      vocabulary: ["Quadrilatère", "Côtés opposés", "Diagonale", "Parallèle"],
      revision: "Les côtés opposés d'un parallélogramme sont parallèles et ses diagonales se coupent en leur milieu."
    },

    statistiques: {
      definition: "Les statistiques permettent de recueillir, organiser, présenter et interpréter des données.",
      objectives: [
        "Recueillir des données.",
        "Organiser les informations dans un tableau.",
        "Lire et interpréter un graphique."
      ],
      explanation: [
        "Une donnée est une information recueillie lors d'une observation ou d'une enquête.",
        "Un tableau statistique organise les données.",
        "L'effectif indique le nombre de fois qu'une valeur apparaît.",
        "Un diagramme permet de représenter les données de manière visuelle."
      ],
      example: "Dans une classe, 12 élèves préfèrent le football et 8 préfèrent le basketball. L'effectif total est de 20 élèves.",
      method: [
        "Recueillir les informations.",
        "Classer les réponses.",
        "Calculer les effectifs.",
        "Présenter les résultats dans un tableau ou un diagramme.",
        "Interpréter les résultats."
      ],
      vocabulary: ["Statistique", "Donnée", "Effectif", "Tableau", "Diagramme"],
      revision: "Les statistiques servent à organiser et interpréter des informations recueillies."
    },

    solides: {
      definition: "Un solide géométrique est un objet qui occupe un espace et possède trois dimensions : longueur, largeur et hauteur.",
      objectives: [
        "Reconnaître des solides usuels.",
        "Identifier leurs éléments.",
        "Distinguer les solides selon leurs caractéristiques."
      ],
      explanation: [
        "Un pavé droit possède six faces rectangulaires.",
        "Un cylindre droit possède deux bases circulaires parallèles et une surface latérale courbe.",
        "Les solides peuvent être décrits par leurs faces, leurs arêtes, leurs sommets et leurs bases."
      ],
      example: "Une boîte rectangulaire peut être assimilée à un pavé droit. Une boîte de conserve peut être assimilée à un cylindre.",
      method: [
        "Observer la forme générale de l'objet.",
        "Identifier les faces ou les bases.",
        "Repérer les arêtes et les sommets lorsqu'ils existent.",
        "Nommer le solide."
      ],
      vocabulary: ["Solide", "Face", "Arête", "Sommet", "Pavé droit", "Cylindre"],
      revision: "Le pavé droit possède six faces rectangulaires. Le cylindre droit possède deux bases circulaires."
    },

    oral: {
      definition: "La communication orale est un échange d'informations entre des personnes à l'aide de la parole.",
      objectives: [
        "S'exprimer clairement devant les autres.",
        "Écouter et comprendre son interlocuteur.",
        "Respecter les règles de la conversation.",
        "Adapter son langage à la situation."
      ],
      explanation: [
        "Une situation de communication met en relation un émetteur et un récepteur.",
        "L'émetteur transmet un message. Le récepteur écoute et interprète ce message.",
        "Un dialogue est un échange de paroles entre deux ou plusieurs personnes.",
        "Une bonne communication exige une articulation claire, une écoute attentive et le respect du tour de parole."
      ],
      example: "Awa : Bonjour, comment vas-tu ? Koffi : Je vais bien, merci. Et toi ? Awa : Très bien, merci.",
      method: [
        "Saluer son interlocuteur.",
        "Présenter clairement son idée.",
        "Écouter sans interrompre.",
        "Répondre de manière adaptée.",
        "Terminer poliment l'échange."
      ],
      vocabulary: ["Émetteur", "Récepteur", "Message", "Dialogue", "Interlocuteur"],
      revision: "La communication orale repose sur l'émission et la réception d'un message. Il faut parler clairement et écouter les autres."
    },

    lettre: {
      definition: "La lettre personnelle est un texte écrit adressé à une personne pour lui communiquer des informations ou des sentiments.",
      objectives: [
        "Identifier les différentes parties d'une lettre.",
        "Rédiger une lettre personnelle.",
        "Utiliser des formules adaptées au destinataire."
      ],
      explanation: [
        "Une lettre personnelle comporte généralement le lieu et la date, la formule d'appel, le corps de la lettre, la formule de politesse et la signature.",
        "Le corps de la lettre présente le message que l'expéditeur souhaite transmettre.",
        "Le langage doit être adapté à la personne à qui l'on écrit."
      ],
      example: "Abidjan, le 6 novembre 2026. Cher ami, je t'écris pour prendre de tes nouvelles. J'espère que tu vas bien. À bientôt. Ton ami.",
      method: [
        "Indiquer le lieu et la date.",
        "Écrire une formule d'appel.",
        "Présenter l'objet du message.",
        "Développer les idées dans des paragraphes.",
        "Terminer par une formule de politesse et signer."
      ],
      vocabulary: ["Expéditeur", "Destinataire", "Formule d'appel", "Corps de la lettre", "Signature"],
      revision: "La lettre personnelle sert à communiquer avec une personne. Elle possède une organisation précise."
    },

    recit: {
      definition: "Le récit est un texte qui raconte une suite d'événements réels ou imaginaires.",
      objectives: [
        "Identifier les étapes d'un récit.",
        "Reconnaître les personnages et les événements.",
        "Rédiger un récit cohérent."
      ],
      explanation: [
        "La situation initiale présente les personnages, le lieu et le moment.",
        "L'élément perturbateur introduit un événement qui modifie la situation.",
        "Les péripéties racontent les actions et les difficultés.",
        "Le dénouement présente la résolution du problème.",
        "La situation finale montre le nouvel état des choses."
      ],
      example: "Un matin, Koffi part à l'école. Sur le chemin, il découvre un portefeuille. Il le rapporte à son propriétaire. Celui-ci le remercie chaleureusement.",
      method: [
        "Choisir les personnages et le cadre.",
        "Présenter la situation initiale.",
        "Introduire un événement.",
        "Raconter les actions dans l'ordre.",
        "Terminer par un dénouement."
      ],
      vocabulary: ["Narrateur", "Personnage", "Situation initiale", "Péripétie", "Dénouement"],
      revision: "Un récit raconte des événements organisés autour d'une situation initiale, de péripéties et d'un dénouement."
    },

    description: {
      definition: "La description est un texte qui présente les caractéristiques d'une personne, d'un animal, d'un objet ou d'un lieu.",
      objectives: [
        "Observer précisément un sujet.",
        "Identifier ses caractéristiques.",
        "Organiser les informations dans un texte descriptif."
      ],
      explanation: [
        "Une description permet au lecteur de se représenter le sujet.",
        "On peut décrire l'apparence, la taille, la forme, la couleur, le comportement ou l'environnement.",
        "Les adjectifs qualificatifs et les compléments du nom enrichissent la description.",
        "Les informations doivent être organisées dans un ordre logique."
      ],
      example: "Le baobab est un grand arbre au tronc épais. Ses branches sont larges et ses feuilles forment une couronne imposante.",
      method: [
        "Observer attentivement le sujet.",
        "Noter ses principales caractéristiques.",
        "Classer les informations.",
        "Employer des adjectifs précis.",
        "Relire pour vérifier la cohérence."
      ],
      vocabulary: ["Description", "Adjectif qualificatif", "Caractéristique", "Portrait", "Paysage"],
      revision: "La description présente les caractéristiques d'un sujet à l'aide d'informations précises et organisées."
    },

    phrase: {
      definition: "Une phrase est un ensemble de mots organisé qui exprime généralement un sens complet.",
      objectives: [
        "Reconnaître une phrase.",
        "Identifier les différents types de phrases.",
        "Construire des phrases correctes."
      ],
      explanation: [
        "Une phrase commence par une majuscule et se termine par un signe de ponctuation.",
        "La phrase déclarative donne une information.",
        "La phrase interrogative pose une question.",
        "La phrase exclamative exprime une émotion.",
        "La phrase impérative donne un ordre, un conseil ou une interdiction."
      ],
      example: "Les élèves travaillent. (déclarative) Où vas-tu ? (interrogative) Comme il fait beau ! (exclamative) Fermez la porte. (impérative)",
      method: [
        "Repérer le début de la phrase.",
        "Identifier le signe de ponctuation final.",
        "Déterminer l'intention de communication.",
        "Classer la phrase selon son type."
      ],
      vocabulary: ["Phrase", "Majuscule", "Ponctuation", "Déclarative", "Interrogative"],
      revision: "Les types de phrases sont déclaratif, interrogatif, exclamatif et impératif."
    },

    nom: {
      definition: "Le groupe nominal est un groupe de mots organisé autour d'un nom principal appelé noyau.",
      objectives: [
        "Identifier le nom noyau.",
        "Reconnaître les déterminants.",
        "Repérer les expansions du nom."
      ],
      explanation: [
        "Le nom est le noyau du groupe nominal.",
        "Le déterminant accompagne généralement le nom.",
        "L'adjectif qualificatif peut préciser le nom.",
        "Un complément du nom peut apporter une information supplémentaire.",
        "Le groupe nominal peut être composé d'un déterminant et d'un nom, ou être enrichi par d'autres éléments."
      ],
      example: "Dans « le grand arbre de la cour », le nom noyau est « arbre ». « Le » est un déterminant, « grand » est un adjectif et « de la cour » est un complément du nom.",
      method: [
        "Repérer le nom principal.",
        "Identifier le déterminant.",
        "Chercher les adjectifs.",
        "Repérer les compléments du nom."
      ],
      vocabulary: ["Groupe nominal", "Nom noyau", "Déterminant", "Adjectif", "Complément du nom"],
      revision: "Le groupe nominal s'organise autour d'un nom noyau. Il peut être accompagné d'un déterminant et d'expansions."
    },

    discours: {
      definition: "Le discours direct rapporte les paroles telles qu'elles ont été prononcées. Le discours indirect rapporte ces paroles en les intégrant dans une phrase.",
      objectives: [
        "Distinguer discours direct et indirect.",
        "Identifier les marques du discours direct.",
        "Transformer des paroles rapportées."
      ],
      explanation: [
        "Le discours direct reproduit les paroles d'une personne.",
        "Il est souvent introduit par un verbe de parole et marqué par des guillemets ou des tirets.",
        "Le discours indirect intègre les paroles dans une phrase.",
        "La transformation peut entraîner des changements de pronoms, de temps et d'indicateurs de lieu ou de temps."
      ],
      example: "Direct : Awa dit : « Je suis heureuse. » Indirect : Awa dit qu'elle est heureuse.",
      method: [
        "Repérer les paroles rapportées.",
        "Identifier le verbe introducteur.",
        "Retirer les guillemets si nécessaire.",
        "Adapter les pronoms et les mots de liaison."
      ],
      vocabulary: ["Discours direct", "Discours indirect", "Verbe de parole", "Guillemets"],
      revision: "Le discours direct reproduit les paroles. Le discours indirect les rapporte dans une phrase."
    },

    verbe: {
      definition: "Le verbe est un mot qui exprime une action ou un état. Il constitue généralement le noyau du groupe verbal.",
      objectives: [
        "Identifier le verbe conjugué.",
        "Reconnaître son infinitif.",
        "Identifier le sujet et les compléments."
      ],
      explanation: [
        "Le verbe peut exprimer une action : courir, écrire, chanter.",
        "Il peut aussi exprimer un état : être, sembler, devenir.",
        "L'infinitif est la forme non conjuguée du verbe.",
        "Le verbe conjugué varie selon le sujet, le temps et le mode.",
        "Le groupe verbal est organisé autour du verbe."
      ],
      example: "Dans « Les élèves écrivent une leçon », le verbe est « écrivent » et son infinitif est « écrire ».",
      method: [
        "Chercher le mot qui exprime l'action ou l'état.",
        "Vérifier en changeant le temps de la phrase.",
        "Trouver l'infinitif.",
        "Identifier le sujet."
      ],
      vocabulary: ["Verbe", "Infinitif", "Conjugaison", "Sujet", "Groupe verbal"],
      revision: "Le verbe exprime une action ou un état. Il se conjugue selon le sujet et le temps."
    },

    adverbe: {
      definition: "L'adverbe est un mot invariable qui modifie le sens d'un verbe, d'un adjectif ou d'un autre adverbe.",
      objectives: [
        "Reconnaître un adverbe.",
        "Identifier sa fonction dans une phrase.",
        "Classer les adverbes selon leur sens."
      ],
      explanation: [
        "L'adverbe est invariable : il ne change pas de forme.",
        "Les adverbes de manière indiquent comment se déroule une action.",
        "Les adverbes de temps précisent le moment.",
        "Les adverbes de lieu précisent l'endroit.",
        "Les adverbes de quantité ou d'intensité indiquent un degré."
      ],
      example: "Dans « Il parle doucement », l'adverbe « doucement » précise la manière de parler.",
      method: [
        "Repérer le mot qui précise une action ou une caractéristique.",
        "Vérifier qu'il est invariable.",
        "Déterminer l'information qu'il apporte.",
        "Identifier sa catégorie."
      ],
      vocabulary: ["Adverbe", "Invariable", "Manière", "Temps", "Lieu", "Intensité"],
      revision: "L'adverbe est invariable et apporte une précision sur un verbe, un adjectif ou un autre adverbe."
    },

    orthographe: {
      definition: "L'orthographe regroupe les règles qui permettent d'écrire correctement les mots et les phrases.",
      objectives: [
        "Écrire correctement les mots.",
        "Appliquer les règles d'accord.",
        "Éviter les erreurs grammaticales courantes."
      ],
      explanation: [
        "L'orthographe lexicale concerne la manière d'écrire les mots.",
        "L'orthographe grammaticale concerne notamment les accords dans la phrase.",
        "Le déterminant et le nom s'accordent en genre et en nombre.",
        "L'adjectif qualificatif s'accorde généralement avec le nom qu'il qualifie.",
        "Le verbe s'accorde avec son sujet."
      ],
      example: "« Les petites filles jouent. » Le déterminant, l'adjectif et le nom sont au féminin pluriel. Le verbe s'accorde avec le sujet « les filles ».",
      method: [
        "Identifier le nom principal.",
        "Vérifier le genre et le nombre.",
        "Contrôler les accords des adjectifs.",
        "Identifier le sujet du verbe.",
        "Vérifier l'accord du verbe."
      ],
      vocabulary: ["Orthographe lexicale", "Orthographe grammaticale", "Accord", "Genre", "Nombre"],
      revision: "L'orthographe lexicale concerne l'écriture des mots. L'orthographe grammaticale concerne les règles d'accord."
    },

    histoire: {
      definition: "L'histoire est une discipline qui étudie le passé des sociétés humaines à partir de traces et de documents.",
      objectives: [
        "Comprendre le rôle de l'histoire.",
        "Identifier les sources historiques.",
        "Situer les événements dans le temps.",
        "Comprendre l'évolution des sociétés."
      ],
      explanation: [
        "L'historien étudie les événements du passé pour comprendre les sociétés humaines.",
        "Les sources écrites comprennent les lettres, les livres, les archives et les inscriptions.",
        "Les sources orales comprennent les témoignages et les traditions transmises par la parole.",
        "Les sources archéologiques comprennent les objets, les outils, les monuments et les vestiges.",
        "La chronologie permet de classer les événements selon leur ordre dans le temps.",
        "La préhistoire correspond à la période précédant l'apparition de l'écriture."
      ],
      example: "Un outil en pierre découvert lors d'une fouille archéologique constitue une source matérielle qui renseigne sur la vie des populations anciennes.",
      method: [
        "Identifier le document ou la source.",
        "Déterminer sa nature.",
        "Rechercher les informations qu'il apporte.",
        "Situer les faits dans leur contexte historique.",
        "Distinguer les faits établis des interprétations."
      ],
      vocabulary: ["Histoire", "Historien", "Source historique", "Chronologie", "Préhistoire", "Archive"],
      revision: "L'histoire étudie le passé à partir de sources. La chronologie permet de classer les événements dans le temps."
    },

    geographie: {
      definition: "La géographie étudie les espaces terrestres, les milieux naturels et les relations entre les sociétés humaines et leur environnement.",
      objectives: [
        "Décrire un espace géographique.",
        "Identifier les éléments du milieu naturel.",
        "Comprendre les relations entre l'homme et son environnement.",
        "Utiliser des moyens de représentation de la Terre."
      ],
      explanation: [
        "Le relief désigne les différentes formes de la surface terrestre : montagnes, plateaux, plaines et vallées.",
        "Le climat correspond aux conditions atmosphériques habituelles d'une région sur une longue période.",
        "Le sol, le climat et la végétation sont liés et influencent les activités humaines.",
        "La carte, le plan et le globe sont des moyens de représentation de la Terre.",
        "Les mouvements de rotation et de révolution de la Terre expliquent notamment l'alternance du jour et de la nuit ainsi que les saisons.",
        "L'environnement comprend les éléments naturels et les éléments créés ou transformés par l'homme."
      ],
      example: "En Côte d'Ivoire, les précipitations et la température influencent la végétation et les activités agricoles des différentes régions.",
      method: [
        "Localiser l'espace étudié.",
        "Identifier les éléments naturels et humains.",
        "Décrire leurs caractéristiques.",
        "Expliquer les relations entre ces éléments.",
        "Présenter les conséquences pour les populations."
      ],
      vocabulary: ["Géographie", "Relief", "Climat", "Végétation", "Environnement", "Carte"],
      revision: "La géographie étudie les espaces et les relations entre les populations et leur environnement."
    },

    plantes: {
      definition: "Les plantes à fleurs se reproduisent notamment grâce à la formation de graines qui peuvent germer lorsque les conditions sont favorables.",
      objectives: [
        "Identifier les principales parties d'une graine.",
        "Comprendre la formation d'une graine.",
        "Expliquer les conditions nécessaires à la germination."
      ],
      explanation: [
        "La fleur est l'organe de reproduction de nombreuses plantes.",
        "Après la pollinisation et la fécondation, l'ovule se transforme en graine et l'ovaire peut se transformer en fruit.",
        "Une graine contient généralement un embryon, des réserves nutritives et une enveloppe protectrice.",
        "La germination est le développement de l'embryon qui donne naissance à une jeune plante.",
        "L'eau, une température convenable et le dioxygène sont des conditions importantes de la germination."
      ],
      example: "Une graine de haricot placée dans du coton humide et dans un endroit convenablement chauffé peut germer après quelques jours.",
      method: [
        "Observer une graine.",
        "Repérer son enveloppe et ses parties internes.",
        "Placer plusieurs graines dans des conditions différentes.",
        "Comparer les résultats.",
        "Identifier les conditions favorables à la germination."
      ],
      vocabulary: ["Graine", "Embryon", "Enveloppe", "Germination", "Pollinisation", "Fécondation"],
      revision: "La graine contient un embryon. Sa germination nécessite notamment de l'eau, du dioxygène et une température convenable."
    },

    reproduction: {
      definition: "La reproduction permet aux êtres vivants de donner naissance à de nouveaux individus de la même espèce.",
      objectives: [
        "Comprendre le rôle de la reproduction.",
        "Identifier les modes de reproduction étudiés.",
        "Distinguer les principales étapes de la reproduction."
      ],
      explanation: [
        "Chez les mammifères, la reproduction est généralement sexuée et implique un mâle et une femelle.",
        "La fécondation correspond à l'union d'une cellule reproductrice mâle et d'une cellule reproductrice femelle.",
        "Chez la plupart des mammifères, le développement de l'embryon se déroule dans l'utérus.",
        "Les oiseaux se reproduisent également par fécondation interne.",
        "Après la fécondation, l'embryon se développe dans un œuf protégé par une coquille."
      ],
      example: "Chez la poule, la femelle pond un œuf fécondé. L'embryon se développe dans l'œuf pendant l'incubation.",
      method: [
        "Identifier l'espèce étudiée.",
        "Repérer les organes reproducteurs concernés.",
        "Décrire la fécondation.",
        "Expliquer le développement du nouvel individu."
      ],
      vocabulary: ["Reproduction", "Fécondation", "Embryon", "Mammifère", "Ovipare", "Vivipare"],
      revision: "La reproduction permet la naissance de nouveaux individus. Les mammifères et les oiseaux présentent des modes de développement différents."
    },

    croissance: {
      definition: "La croissance est l'augmentation de la taille, de la masse ou du développement d'un être vivant.",
      objectives: [
        "Identifier les facteurs qui influencent la croissance.",
        "Comprendre le rôle de l'alimentation.",
        "Observer les changements chez les êtres vivants."
      ],
      explanation: [
        "La croissance des plantes dépend de plusieurs facteurs, notamment l'eau, la lumière, les sels minéraux, le dioxyde de carbone et une température adaptée.",
        "Les plantes utilisent la lumière pour réaliser la photosynthèse.",
        "Les animaux ont besoin d'une alimentation adaptée pour grandir et maintenir leur organisme.",
        "Une alimentation insuffisante ou déséquilibrée peut perturber la croissance."
      ],
      example: "Deux plantes de même espèce placées dans des conditions différentes peuvent présenter des différences de taille et de développement.",
      method: [
        "Choisir des êtres vivants comparables.",
        "Faire varier un seul facteur à la fois.",
        "Observer les changements.",
        "Noter les résultats.",
        "Formuler une conclusion."
      ],
      vocabulary: ["Croissance", "Nutrition", "Lumière", "Sels minéraux", "Photosynthèse"],
      revision: "La croissance dépend de facteurs environnementaux et nutritionnels. Une expérience permet de comparer leur influence."
    },

    environnement: {
      definition: "L'environnement est l'ensemble des éléments naturels et humains qui entourent les êtres vivants.",
      objectives: [
        "Identifier les actions humaines nuisibles à l'environnement.",
        "Comprendre les conséquences de la dégradation.",
        "Proposer des solutions de protection."
      ],
      explanation: [
        "La déforestation réduit la couverture végétale et peut favoriser l'érosion des sols.",
        "La pollution de l'eau met en danger les êtres vivants et la santé des populations.",
        "Les déchets abandonnés dans la nature dégradent le cadre de vie.",
        "Les feux de brousse peuvent détruire la végétation et les habitats naturels.",
        "La protection de l'environnement passe par l'assainissement, le reboisement, le tri des déchets et l'utilisation responsable des ressources."
      ],
      example: "Planter des arbres dans une zone déboisée contribue à restaurer la végétation et à protéger les sols.",
      method: [
        "Observer un problème environnemental.",
        "Identifier ses causes.",
        "Décrire ses conséquences.",
        "Proposer des actions adaptées.",
        "Participer à une action de protection."
      ],
      vocabulary: ["Environnement", "Pollution", "Déforestation", "Érosion", "Reboisement", "Assainissement"],
      revision: "Les activités humaines peuvent dégrader l'environnement. La prévention, le reboisement et l'assainissement contribuent à sa protection."
    },

    electricite: {
      definition: "Un circuit électrique est un ensemble de composants reliés entre eux permettant le passage du courant électrique lorsque le circuit est fermé.",
      objectives: [
        "Identifier les éléments d'un circuit électrique.",
        "Distinguer un circuit ouvert et un circuit fermé.",
        "Comprendre le rôle d'un interrupteur.",
        "Connaître les dangers du court-circuit."
      ],
      explanation: [
        "Une pile ou un générateur fournit l'énergie électrique.",
        "Les fils conducteurs relient les différents composants.",
        "Une lampe transforme l'énergie électrique en lumière et en chaleur.",
        "Un interrupteur permet d'ouvrir ou de fermer un circuit.",
        "Dans un circuit fermé, le courant peut circuler.",
        "Un court-circuit peut provoquer un échauffement dangereux et endommager une installation."
      ],
      example: "Une pile reliée à une lampe par deux fils forme un circuit simple. Lorsque le circuit est fermé, la lampe peut s'allumer.",
      method: [
        "Identifier le générateur.",
        "Repérer les fils et les récepteurs.",
        "Vérifier les connexions.",
        "Observer si le circuit est ouvert ou fermé.",
        "Ne jamais provoquer volontairement un court-circuit sur une installation réelle."
      ],
      vocabulary: ["Circuit électrique", "Générateur", "Conducteur", "Récepteur", "Interrupteur", "Court-circuit"],
      revision: "Le courant circule dans un circuit fermé. Un court-circuit est dangereux et peut provoquer un échauffement."
    },

    matiere: {
      definition: "La matière est tout ce qui possède une masse et occupe un volume. Elle peut se présenter sous différents états.",
      objectives: [
        "Distinguer les solides, les liquides et les gaz.",
        "Décrire leurs propriétés.",
        "Comprendre les changements d'état."
      ],
      explanation: [
        "Un solide possède généralement une forme propre et un volume propre.",
        "Un liquide possède un volume propre mais prend la forme du récipient qui le contient.",
        "Un gaz n'a ni forme propre ni volume propre : il occupe l'espace disponible.",
        "La fusion est le passage de l'état solide à l'état liquide.",
        "La solidification est le passage de l'état liquide à l'état solide.",
        "La vaporisation est le passage de l'état liquide à l'état gazeux.",
        "La liquéfaction est le passage de l'état gazeux à l'état liquide."
      ],
      example: "La glace fond et devient de l'eau liquide. Lorsque l'eau est suffisamment refroidie, elle peut se solidifier.",
      method: [
        "Observer la matière.",
        "Déterminer sa forme et son volume.",
        "Identifier son état physique.",
        "Décrire le changement d'état éventuel."
      ],
      vocabulary: ["Matière", "Solide", "Liquide", "Gaz", "Fusion", "Solidification", "Vaporisation"],
      revision: "La matière existe principalement sous trois états : solide, liquide et gazeux. Elle peut changer d'état."
    },

    temperature: {
      definition: "La température est une grandeur physique qui permet de caractériser l'état thermique d'un corps.",
      objectives: [
        "Comprendre la notion de température.",
        "Utiliser un thermomètre.",
        "Lire une température en degrés Celsius."
      ],
      explanation: [
        "La température permet de comparer l'état thermique de différents corps.",
        "Le thermomètre est un instrument utilisé pour mesurer la température.",
        "Le degré Celsius, noté °C, est une unité couramment utilisée.",
        "La température peut augmenter ou diminuer selon les échanges thermiques."
      ],
      example: "Si un thermomètre indique 25 °C, la température mesurée est de vingt-cinq degrés Celsius.",
      method: [
        "Choisir un thermomètre adapté.",
        "Placer correctement le thermomètre.",
        "Attendre que la mesure se stabilise.",
        "Lire la valeur indiquée.",
        "Noter l'unité."
      ],
      vocabulary: ["Température", "Thermomètre", "Degré Celsius", "Mesure"],
      revision: "La température se mesure à l'aide d'un thermomètre. Elle s'exprime couramment en degrés Celsius."
    },

    air: {
      definition: "L'air est un mélange de gaz qui constitue l'atmosphère terrestre.",
      objectives: [
        "Connaître les principaux constituants de l'air.",
        "Comprendre le rôle du dioxygène.",
        "Identifier les conditions nécessaires à une combustion.",
        "Connaître les dangers du feu."
      ],
      explanation: [
        "L'air sec est composé principalement de diazote et de dioxygène.",
        "Le dioxygène représente environ 21 % du volume de l'air et le diazote environ 78 %.",
        "La combustion est une réaction chimique qui nécessite un combustible, un comburant et une source d'énergie initiale.",
        "Le dioxygène de l'air joue le rôle de comburant dans de nombreuses combustions.",
        "Une combustion peut produire de la chaleur, de la lumière et des gaz parfois dangereux.",
        "Il ne faut jamais jouer avec le feu ni tenter une expérience de combustion sans encadrement."
      ],
      example: "Une bougie allumée brûle grâce à la cire qui constitue le combustible et au dioxygène de l'air qui permet la combustion.",
      method: [
        "Identifier le combustible.",
        "Identifier le comburant.",
        "Repérer la source d'énergie initiale.",
        "Observer les produits formés.",
        "Respecter les règles de sécurité."
      ],
      vocabulary: ["Air", "Dioxygène", "Diazote", "Combustion", "Combustible", "Comburant"],
      revision: "L'air contient principalement du diazote et du dioxygène. Une combustion nécessite un combustible, un comburant et une énergie initiale."
    },

    mesures: {
      definition: "La mesure permet de déterminer la valeur d'une grandeur physique à l'aide d'une unité et d'un instrument adaptés.",
      objectives: [
        "Comprendre la notion de masse et de volume.",
        "Identifier les instruments de mesure.",
        "Utiliser les unités adaptées."
      ],
      explanation: [
        "La masse représente la quantité de matière d'un corps.",
        "La masse se mesure avec une balance et s'exprime notamment en grammes ou en kilogrammes.",
        "Le volume représente l'espace occupé par un corps.",
        "Le volume d'un liquide peut être mesuré à l'aide d'une éprouvette graduée.",
        "Le litre et le millilitre sont des unités courantes de volume."
      ],
      example: "Une bouteille contenant 1 litre d'eau possède un volume de 1 L. Une balance peut servir à mesurer la masse de cette bouteille.",
      method: [
        "Identifier la grandeur à mesurer.",
        "Choisir l'instrument adapté.",
        "Effectuer la mesure correctement.",
        "Lire la valeur.",
        "Écrire le résultat avec son unité."
      ],
      vocabulary: ["Masse", "Volume", "Balance", "Éprouvette graduée", "Gramme", "Litre"],
      revision: "La masse se mesure avec une balance. Le volume se mesure avec un instrument adapté, comme une éprouvette graduée."
    },

    school: {
      definition: "L'école est un lieu d'apprentissage où les élèves acquièrent des connaissances et développent des compétences.",
      objectives: [
        "Connaître le vocabulaire de l'école en anglais.",
        "Présenter son établissement.",
        "Formuler des phrases simples en anglais."
      ],
      explanation: [
        "School means école.",
        "A classroom is une salle de classe.",
        "A teacher is un enseignant.",
        "A student or pupil is un élève.",
        "A book is un livre.",
        "A pen is un stylo.",
        "The expression « This is my school » signifie « Voici mon école ».",
        "The expression « I am a student » signifie « Je suis un élève »."
      ],
      example: "My name is Koffi. I am a student. This is my school. My classroom is big.",
      method: [
        "Mémoriser les mots de vocabulaire.",
        "Écouter leur prononciation.",
        "Répéter les expressions.",
        "Construire des phrases simples.",
        "S'entraîner à parler de son école."
      ],
      vocabulary: ["School : école", "Teacher : enseignant", "Student : élève", "Classroom : salle de classe", "Book : livre"],
      revision: "Pour parler de l'école en anglais, il faut connaître le vocabulaire des personnes, des lieux et du matériel scolaire."
    },

    home: {
      definition: "Le thème At Home permet de décrire son habitation, les pièces de la maison et les membres de sa famille.",
      objectives: [
        "Nommer les pièces de la maison en anglais.",
        "Présenter sa famille.",
        "Décrire simplement son habitation."
      ],
      explanation: [
        "House signifie maison.",
        "Bedroom signifie chambre à coucher.",
        "Kitchen signifie cuisine.",
        "Living room signifie salon.",
        "Father signifie père.",
        "Mother signifie mère.",
        "Brother signifie frère.",
        "Sister signifie sœur.",
        "There is signifie il y a au singulier.",
        "There are signifie il y a au pluriel."
      ],
      example: "There is a kitchen in my house. There are two bedrooms. My mother is in the kitchen.",
      method: [
        "Apprendre le vocabulaire de la maison.",
        "Nommer les membres de la famille.",
        "Utiliser There is et There are.",
        "Décrire les pièces avec des phrases courtes."
      ],
      vocabulary: ["House : maison", "Bedroom : chambre", "Kitchen : cuisine", "Mother : mère", "Father : père"],
      revision: "Le vocabulaire de la maison permet de décrire son habitation et sa famille en anglais."
    },

    time: {
      definition: "L'heure et la date permettent d'indiquer le moment où se déroule une activité.",
      objectives: [
        "Nommer les jours de la semaine.",
        "Connaître les mois de l'année.",
        "Demander et donner l'heure en anglais."
      ],
      explanation: [
        "Les jours de la semaine sont Monday, Tuesday, Wednesday, Thursday, Friday, Saturday et Sunday.",
        "Les mois commencent par January et se terminent par December.",
        "La question « What time is it? » signifie « Quelle heure est-il ? ».",
        "La réponse « It is seven o'clock » signifie « Il est sept heures ».",
        "La question « What day is it today? » demande le jour actuel."
      ],
      example: "What day is it today? It is Monday. What time is it? It is eight o'clock.",
      method: [
        "Mémoriser les jours.",
        "Mémoriser les mois.",
        "Apprendre les nombres utiles.",
        "S'entraîner à demander et donner l'heure."
      ],
      vocabulary: ["Day : jour", "Week : semaine", "Month : mois", "Year : année", "Time : heure"],
      revision: "Les jours, les mois et les heures permettent de parler du calendrier et du temps en anglais."
    },

    jobs: {
      definition: "Le vocabulaire des métiers permet de présenter les professions et les activités exercées par les personnes.",
      objectives: [
        "Nommer différents métiers en anglais.",
        "Associer un métier à son activité.",
        "Présenter une profession avec une phrase simple."
      ],
      explanation: [
        "A teacher is un enseignant.",
        "A doctor is un médecin.",
        "A nurse is un infirmier ou une infirmière.",
        "A farmer is un agriculteur.",
        "A driver is un conducteur.",
        "A police officer is un policier.",
        "La question « What do you do? » permet de demander la profession d'une personne.",
        "La réponse « I am a teacher » signifie « Je suis enseignant »."
      ],
      example: "What does your father do? He is a doctor.",
      method: [
        "Mémoriser les noms des métiers.",
        "Associer chaque métier à son activité.",
        "Apprendre la question sur la profession.",
        "Construire des réponses simples."
      ],
      vocabulary: ["Teacher : enseignant", "Doctor : médecin", "Farmer : agriculteur", "Driver : conducteur", "Nurse : infirmier"],
      revision: "Le vocabulaire des métiers permet de demander et de présenter les professions en anglais."
    },

    clothes: {
      definition: "Le thème Clothes and Colours permet de nommer les vêtements et les couleurs en anglais.",
      objectives: [
        "Nommer les vêtements.",
        "Connaître les principales couleurs.",
        "Décrire simplement une tenue."
      ],
      explanation: [
        "Shirt signifie chemise.",
        "Trousers signifie pantalon.",
        "Dress signifie robe.",
        "Shoes signifie chaussures.",
        "Red signifie rouge.",
        "Blue signifie bleu.",
        "Green signifie vert.",
        "Yellow signifie jaune.",
        "Black signifie noir.",
        "White signifie blanc.",
        "On peut utiliser « I am wearing » pour présenter les vêtements que l'on porte."
      ],
      example: "I am wearing a blue shirt and black trousers.",
      method: [
        "Identifier les vêtements.",
        "Nommer leur couleur.",
        "Associer le nom du vêtement à sa couleur.",
        "Décrire une tenue en anglais."
      ],
      vocabulary: ["Shirt : chemise", "Trousers : pantalon", "Dress : robe", "Red : rouge", "Blue : bleu"],
      revision: "Pour décrire une tenue, il faut connaître les noms des vêtements et les couleurs."
    },

    food: {
      definition: "Le thème Food and Drinks permet de parler des aliments, des boissons et des habitudes alimentaires.",
      objectives: [
        "Nommer des aliments en anglais.",
        "Nommer des boissons.",
        "Exprimer ses préférences alimentaires."
      ],
      explanation: [
        "Rice signifie riz.",
        "Bread signifie pain.",
        "Fish signifie poisson.",
        "Meat signifie viande.",
        "Milk signifie lait.",
        "Water signifie eau.",
        "Fruit signifie fruit.",
        "Vegetables signifie légumes.",
        "I like signifie j'aime.",
        "I don't like signifie je n'aime pas."
      ],
      example: "I like rice and fish. I drink water every day.",
      method: [
        "Apprendre le vocabulaire des aliments.",
        "Apprendre le vocabulaire des boissons.",
        "Utiliser I like et I don't like.",
        "Présenter ses préférences."
      ],
      vocabulary: ["Rice : riz", "Bread : pain", "Fish : poisson", "Water : eau", "Milk : lait"],
      revision: "Le vocabulaire alimentaire permet de nommer les aliments et d'exprimer ses goûts en anglais."
    },

    health: {
      definition: "La santé et l'environnement sont liés aux conditions de vie, à l'hygiène et à la protection du milieu naturel.",
      objectives: [
        "Connaître le vocabulaire de la santé.",
        "Identifier les comportements favorables à la santé.",
        "Parler de l'environnement en anglais."
      ],
      explanation: [
        "Health signifie santé.",
        "Environment signifie environnement.",
        "Clean signifie propre.",
        "Dirty signifie sale.",
        "Water signifie eau.",
        "Pollution signifie pollution.",
        "Il est important de se laver les mains, de boire de l'eau potable et de maintenir son environnement propre.",
        "La protection de l'environnement contribue au bien-être des populations."
      ],
      example: "We must keep our environment clean. We must wash our hands before eating.",
      method: [
        "Apprendre le vocabulaire de la santé.",
        "Identifier les règles d'hygiène.",
        "Apprendre les expressions de conseil et d'obligation.",
        "Formuler des phrases de sensibilisation."
      ],
      vocabulary: ["Health : santé", "Environment : environnement", "Clean : propre", "Dirty : sale", "Pollution : pollution"],
      revision: "La santé et l'environnement sont liés. L'hygiène et la protection du cadre de vie sont essentielles."
    },

    edhc: {
      definition: "L'éducation aux droits de l'homme et à la citoyenneté aide chacun à connaître ses droits, respecter ses devoirs et vivre en société.",
      objectives: [
        "Connaître les droits et les devoirs.",
        "Respecter la dignité humaine.",
        "Adopter des comportements responsables.",
        "Participer à la vie de la communauté."
      ],
      explanation: [
        "Les droits de l'enfant comprennent notamment le droit à la vie, à la santé, à l'éducation, à la protection et à une identité.",
        "Les droits de l'homme appartiennent à toute personne et reposent sur le respect de la dignité humaine.",
        "La Constitution organise les institutions et fixe les principes fondamentaux de l'État.",
        "La démocratie repose notamment sur la participation des citoyens, le respect des libertés et l'égalité devant la loi.",
        "La sécurité routière exige le respect des panneaux, des feux de signalisation et des règles de circulation.",
        "L'hygiène et l'assainissement contribuent à prévenir les maladies.",
        "Le civisme consiste à respecter les règles de la vie collective."
      ],
      example: "Un élève qui respecte ses camarades, refuse la violence et protège le matériel commun adopte un comportement citoyen.",
      method: [
        "Identifier le droit ou le devoir concerné.",
        "Comprendre la situation présentée.",
        "Déterminer les comportements responsables.",
        "Proposer une solution respectueuse des personnes et des règles."
      ],
      vocabulary: ["Droit", "Devoir", "Citoyenneté", "Dignité", "Démocratie", "Civisme", "Solidarité"],
      revision: "La citoyenneté repose sur la connaissance des droits, le respect des devoirs et la participation responsable à la vie collective."
    },

    arts: {
      definition: "Les arts plastiques permettent de créer et de communiquer des idées à travers des formes, des couleurs, des lignes et des matières.",
      objectives: [
        "Connaître le matériel graphique.",
        "Utiliser différents procédés plastiques.",
        "Comprendre les couleurs et les compositions.",
        "Développer sa créativité."
      ],
      explanation: [
        "Le crayon, le fusain, le feutre, le pinceau et la peinture sont des outils d'expression graphique.",
        "Le point, la ligne, la forme et la surface sont des éléments fondamentaux de la création plastique.",
        "Les couleurs primaires traditionnelles en peinture sont le rouge, le jaune et le bleu.",
        "Les couleurs secondaires peuvent être obtenues par mélange de couleurs primaires.",
        "La composition consiste à organiser les éléments dans une œuvre.",
        "Les techniquesd'impression permettent de reproduire une image ou un motif sur un support.",
        "L'art peut également transmettre des messages de paix, de civisme et de protection de l'environnement."
      ],
      example: "Pour créer une affiche sur la protection de l'environnement, on peut dessiner un arbre, utiliser des couleurs visibles et placer un message court au centre.",
      method: [
        "Choisir le thème de création.",
        "Sélectionner les outils et les matériaux.",
        "Organiser les éléments sur le support.",
        "Réaliser le dessin ou la composition.",
        "Vérifier la lisibilité et la qualité du travail."
      ],
      vocabulary: ["Dessin", "Couleur", "Matière", "Composition", "Support", "Impression"],
      revision: "Les arts plastiques utilisent les formes, les couleurs et les matières pour exprimer des idées et créer des œuvres."
    },

    musique: {
      definition: "L'éducation musicale permet de découvrir les sons, les rythmes, les notes et les instruments de musique.",
      objectives: [
        "Reconnaître les notes musicales.",
        "Comprendre les figures de notes.",
        "Identifier les familles d'instruments.",
        "Développer l'écoute et le sens du rythme."
      ],
      explanation: [
        "Les notes de musique permettent de représenter les sons dans une œuvre musicale.",
        "La portée musicale est composée de cinq lignes et de quatre interlignes.",
        "La noire représente une durée d'un temps dans une mesure à quatre temps lorsque la noire est l'unité de temps.",
        "La blanche vaut généralement deux noires.",
        "Deux croches valent la durée d'une noire.",
        "Le soupir représente un silence de la durée d'une noire.",
        "Les idiophones produisent des sons par vibration de leur propre matière.",
        "Les membranophones produisent des sons grâce à une membrane tendue.",
        "Les cordophones produisent des sons grâce à des cordes vibrantes.",
        "Les aérophones produisent des sons grâce à la vibration de l'air."
      ],
      example: "Dans une mesure où la noire vaut un temps, une blanche occupe deux temps et deux croches occupent ensemble un temps.",
      method: [
        "Observer les symboles musicaux.",
        "Identifier les notes et les figures.",
        "Compter les durées.",
        "Écouter les instruments.",
        "Classer les instruments selon leur mode de production du son."
      ],
      vocabulary: ["Note", "Portée", "Noire", "Blanche", "Croche", "Soupir", "Idiophone", "Membranophone"],
      revision: "La musique utilise des notes, des figures rythmiques et différentes familles d'instruments pour organiser les sons."
    },

    eps: {
      definition: "L'éducation physique et sportive développe les capacités physiques, les habiletés motrices et l'esprit d'équipe.",
      objectives: [
        "Améliorer les capacités physiques.",
        "Apprendre les gestes sportifs.",
        "Respecter les règles et les autres.",
        "Développer l'endurance, la vitesse et la coordination."
      ],
      explanation: [
        "L'endurance est la capacité à maintenir un effort pendant une durée relativement longue.",
        "La vitesse est la capacité à réaliser une action dans un temps court.",
        "La gymnastique au sol permet de développer l'équilibre, la coordination et la maîtrise corporelle.",
        "Les sauts comprennent notamment le saut en hauteur, le saut en longueur et le triple saut.",
        "Les lancers nécessitent une bonne coordination et le respect des règles de sécurité.",
        "Les sports collectifs comme le basketball, le handball, le volleyball et le football reposent sur la coopération et le respect des règles."
      ],
      example: "Lors d'un match de basketball, chaque joueur doit se déplacer, passer le ballon, respecter les règles et coopérer avec ses partenaires.",
      method: [
        "S'échauffer avant l'activité.",
        "Écouter les consignes.",
        "Réaliser les exercices progressivement.",
        "Respecter les règles de sécurité.",
        "Terminer par un retour au calme."
      ],
      vocabulary: ["Endurance", "Vitesse", "Coordination", "Équilibre", "Échauffement", "Esprit d'équipe"],
      revision: "L'EPS développe les capacités physiques et les compétences motrices tout en enseignant le respect des règles et la coopération."
    },

    tice: {
      definition: "Les technologies de l'information et de la communication pour l'enseignement permettent d'utiliser les outils numériques pour apprendre, produire et communiquer.",
      objectives: [
        "Identifier les composants d'un ordinateur.",
        "Utiliser la souris et le clavier.",
        "Découvrir un système d'exploitation.",
        "Utiliser des logiciels simples.",
        "Découvrir Internet et les moteurs de recherche."
      ],
      explanation: [
        "L'unité centrale contient plusieurs composants qui assurent le fonctionnement de l'ordinateur.",
        "L'écran permet d'afficher les informations.",
        "Le clavier permet de saisir du texte et des commandes.",
        "La souris permet de déplacer le pointeur, de sélectionner et de cliquer.",
        "Un système d'exploitation gère les ressources de l'ordinateur et permet d'utiliser les logiciels.",
        "Un logiciel de dessin permet de créer et de modifier des images.",
        "Un logiciel de traitement de texte permet de saisir, modifier et mettre en forme des documents.",
        "Internet est un réseau mondial qui permet d'échanger des informations.",
        "Un moteur de recherche aide à retrouver des informations sur Internet."
      ],
      example: "Pour rédiger un devoir, on ouvre un logiciel de traitement de texte, on saisit le texte, on le met en forme puis on enregistre le document.",
      method: [
        "Identifier l'ordinateur et ses périphériques.",
        "Allumer correctement l'appareil.",
        "Utiliser le clavier et la souris.",
        "Ouvrir le logiciel nécessaire.",
        "Enregistrer régulièrement son travail.",
        "Utiliser Internet de manière responsable."
      ],
      vocabulary: ["Ordinateur", "Clavier", "Souris", "Écran", "Logiciel", "Système d'exploitation", "Internet"],
      revision: "L'ordinateur permet de traiter des informations. Le clavier et la souris servent à communiquer avec la machine. Internet permet d'accéder à des ressources en ligne."
    }
  };

  function getCourse(subject, title) {
    const key = identify(subject, title);
    const course = COURSES[key] || {
      definition: title + " est une notion étudiée dans le programme de " + subject + ".",
      objectives: [
        "Comprendre la notion étudiée.",
        "Identifier ses principales caractéristiques.",
        "Utiliser les connaissances dans une situation concrète."
      ],
      explanation: [
        "Cette leçon permet de découvrir la notion de " + title + ".",
        "Il faut connaître les mots importants et comprendre leur signification.",
        "L'observation, l'analyse et la pratique permettent de mieux maîtriser cette notion.",
        "Les connaissances acquises doivent être réutilisées dans des exercices et des situations de la vie quotidienne."
      ],
      example: "À partir d'une situation concrète, l'élève identifie les éléments importants de la notion et explique sa réponse.",
      method: [
        "Lire attentivement le sujet.",
        "Identifier les informations importantes.",
        "Appliquer les connaissances du cours.",
        "Présenter une réponse claire et organisée."
      ],
      vocabulary: [subject, title],
      revision: "Retenir la définition, les caractéristiques et les applications principales de la leçon."
    };

    return {
      definition: course.definition,
      objectives: course.objectives.slice(),
      explanation: course.explanation.slice(),
      example: course.example,
      method: course.method.slice(),
      vocabulary: course.vocabulary.slice(),
      revision: course.revision
    };
  }

  function buildExercises(subject, title) {
    return [
      {
        level: "Application",
        instruction: "Explique avec tes propres mots la notion principale de la leçon « " + title + " ». Donne deux informations importantes.",
        correction: "La réponse doit présenter une définition correcte de la notion et deux caractéristiques essentielles étudiées dans le cours."
      },
      {
        level: "Compréhension",
        instruction: "Cite trois mots importants de cette leçon et explique leur signification.",
        correction: "L'élève doit citer trois termes du vocabulaire de la leçon et donner pour chacun une définition adaptée."
      },
      {
        level: "Réflexion",
        instruction: "Donne un exemple concret de la vie quotidienne qui permet d'illustrer la leçon « " + title + " ».",
        correction: "La réponse doit présenter une situation cohérente avec la notion étudiée et expliquer le lien entre l'exemple et le cours."
      },
      {
        level: "Approfondissement",
        instruction: "Rédige un court paragraphe dans lequel tu présentes ce que tu as retenu de cette leçon.",
        correction: "Le paragraphe doit être compréhensible, organisé et contenir les principales connaissances de la leçon."
      }
    ];
  }

  function buildQuiz(subject, title, course) {
    return [
      {
        question: "Quel est le sujet principal de la leçon « " + title + " » ?",
        answer: course.definition,
        explanation: "Cette définition présente la notion centrale étudiée."
      },
      {
        question: "Pourquoi est-il important de connaître cette notion ?",
        answer: "Elle permet de comprendre le phénomène étudié et d'utiliser les connaissances dans des situations concrètes.",
        explanation: "Une notion scolaire doit pouvoir être comprise et réutilisée."
      },
      {
        question: "Cite deux éléments importants de cette leçon.",
        answer: course.objectives.slice(0, 2).join(" "),
        explanation: "Ces éléments correspondent aux objectifs essentiels du cours."
      },
      {
        question: "Donne un exemple permettant d'illustrer cette leçon.",
        answer: course.example,
        explanation: "L'exemple permet de relier les connaissances théoriques à une situation concrète."
      }
    ];
  }

  function buildSession(subject, title, index) {
    const course = getCourse(subject, title);

    return {
      title: title,
      number: index + 1,
      objectives: course.objectives,
      introduction: "Dans cette séance de " + subject + ", nous allons étudier : " + title + ". Cette notion est importante pour comprendre le programme et développer de nouvelles compétences.",
      course: {
        definition: course.definition,
        explanation: course.explanation,
        example: course.example,
        method: course.method,
        vocabulary: course.vocabulary,
        essential: course.revision,
        conclusion: "À la fin de cette séance, l'élève doit être capable d'expliquer la notion étudiée, de reconnaître ses caractéristiques et de l'utiliser dans une situation simple."
      },
      exercises: buildExercises(subject, title),
      quiz: buildQuiz(subject, title, course),
      revision: [
        "Définition : " + course.definition,
        "À retenir : " + course.revision,
        "Exemple : " + course.example
      ]
    };
  }

 function buildLesson(subject, item, index) {
  const title = item.title;
  const course = getCourse(subject, title);

  let sessionTitles = [];

  if (Array.isArray(item.sessions) && item.sessions.length) {
    sessionTitles = item.sessions.map(getTitle).filter(Boolean);
  }

  // Si le programme ne contient pas de séances détaillées,
  // utiliser le véritable intitulé de la leçon.
  if (!sessionTitles.length) {
    sessionTitles = [title];
  }

  const sessions = sessionTitles.map((sessionTitle, i) =>
    buildSession(subject, sessionTitle, i)
  );

  return {
    title: title,
    section: item.section || "",
    number: index + 1,

    introduction:
      "Cette leçon de " + subject +
      " porte sur « " + title +
      " ». Elle permet de découvrir les connaissances essentielles, " +
      "de comprendre les explications et de mettre en pratique les acquis.",

    objectives: course.objectives,
    explanation: course.explanation,
    example: course.example,
    vocabulary: course.vocabulary,
    method: course.method,
    essential: course.revision,

    conclusion:
      "La maîtrise de cette leçon repose sur la compréhension des notions, " +
      "la connaissance des éléments importants et la réalisation des exercices.",

    sessions: sessions,
    exercises: buildExercises(subject, title),
    quiz: buildQuiz(subject, title, course),

    revision: [
      "Définition : " + course.definition,
      "À retenir : " + course.revision,
      "Exemple : " + course.example
    ],

    finalAssessment: {
      instructions: [
        "Lis attentivement chaque question.",
        "Réponds en utilisant les connaissances de la leçon.",
        "Rédige des phrases claires et complètes."
      ],

      questions: [
        {
          question: "Donne la définition de la notion principale de cette leçon.",
          points: 4,
          expected: course.definition
        },
        {
          question: "Cite deux caractéristiques importantes de cette leçon.",
          points: 4,
          expected: course.objectives.slice(0, 2).join(" ")
        },
        {
          question: "Explique la méthode à suivre pour appliquer cette notion.",
          points: 6,
          expected: course.method.join(" ")
        },
        {
          question: "Donne un exemple concret et explique-le.",
          points: 6,
          expected: course.example
        }
      ]
    }
  };
}

  function buildAll(raw) {
    const curriculum = normalizeCurriculum(raw);
    const result = {};

    Object.keys(curriculum).forEach(subject => {
      result[subject] = {
        title: subject,
        lessons: curriculum[subject].map((item, index) =>
          buildLesson(subject, item, index)
        )
      };
    });

    return result;
  }

  window.ATP_LEARNING_CONTENT_6E = {
    version: "3.0",
    subjects: SUBJECTS,
    courses: COURSES,
    buildAll: buildAll,
    buildLesson: buildLesson,
    buildSession: buildSession
  };

})();
