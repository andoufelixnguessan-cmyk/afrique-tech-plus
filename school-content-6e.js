/* =========================================================
   AFRIQUE TECH PLUS — ATP SCHOOL
   PROGRAMME DE 6e — MOTEUR PÉDAGOGIQUE
   Version : 2.0
   ========================================================= */

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

  const SUBJECT_INFO = {
    "Français": {
      objective: "Maîtriser la langue française, comprendre des textes et communiquer correctement à l'oral comme à l'écrit.",
      method: "Observer les exemples, identifier la règle, comprendre son fonctionnement, puis l'appliquer dans des phrases et des productions personnelles.",
      vocabulary: "Définition, règle, phrase, texte, vocabulaire, expression."
    },
    "Mathématiques": {
      objective: "Développer le raisonnement logique, calculer correctement et résoudre des problèmes de la vie courante.",
      method: "Lire l'énoncé, identifier les données, choisir une propriété ou une opération, effectuer les calculs et vérifier le résultat.",
      vocabulary: "Définition, propriété, opération, calcul, raisonnement, résultat."
    },
    "Anglais": {
      objective: "Comprendre et utiliser des mots, expressions et structures simples en anglais dans des situations de communication.",
      method: "Écouter ou lire le modèle, comprendre le sens, mémoriser le vocabulaire, répéter et réutiliser les expressions dans des phrases.",
      vocabulary: "Word, sentence, question, answer, pronunciation, meaning."
    },
    "Histoire-Géographie": {
      objective: "Comprendre les sociétés humaines, les événements historiques, les territoires et les relations entre les populations et leur environnement.",
      method: "Observer un document, identifier son sujet, relever les informations importantes, les situer dans le temps ou dans l'espace et expliquer.",
      vocabulary: "Document, date, période, territoire, population, événement, espace."
    },
    "SVT": {
      objective: "Comprendre le vivant, le fonctionnement des organismes et leurs relations avec leur environnement.",
      method: "Observer, poser un problème scientifique, formuler une hypothèse, réaliser ou étudier une expérience, interpréter les résultats et conclure.",
      vocabulary: "Observation, hypothèse, expérience, résultat, interprétation, conclusion."
    },
    "Physique-Chimie": {
      objective: "Observer les phénomènes physiques et chimiques, comprendre leurs propriétés et apprendre à réaliser des expériences simples en sécurité.",
      method: "Décrire le phénomène, identifier le matériel, proposer une explication, réaliser l'expérience avec prudence et interpréter les résultats.",
      vocabulary: "Matière, phénomène, mesure, expérience, observation, résultat."
    },
    "EDHC": {
      objective: "Développer les comportements responsables, le respect des droits et devoirs, la solidarité et la participation à la vie collective.",
      method: "Étudier une situation concrète, identifier les comportements, distinguer les droits et les devoirs et proposer une attitude responsable.",
      vocabulary: "Droit, devoir, responsabilité, respect, solidarité, citoyenneté."
    },
    "Arts plastiques": {
      objective: "Développer la créativité et apprendre à utiliser les formes, les couleurs, les lignes et les matières pour communiquer visuellement.",
      method: "Observer une œuvre, identifier les éléments plastiques, expérimenter les techniques et réaliser une production personnelle.",
      vocabulary: "Forme, ligne, couleur, texture, composition, contraste."
    },
    "Éducation musicale": {
      objective: "Développer l'écoute, le sens du rythme, la voix et la compréhension des éléments du langage musical.",
      method: "Écouter attentivement, repérer les sons, reproduire un rythme ou une mélodie et expliquer ce qui est entendu.",
      vocabulary: "Son, rythme, mélodie, tempo, voix, instrument."
    },
    "EPS": {
      objective: "Développer les capacités physiques, la coordination, l'endurance, l'esprit d'équipe et le respect des règles sportives.",
      method: "Comprendre la consigne, s'échauffer, apprendre le geste technique, s'entraîner progressivement et respecter les règles de sécurité.",
      vocabulary: "Effort, échauffement, coordination, endurance, règle, performance."
    },
    "TICE": {
      objective: "Apprendre à utiliser les technologies de l'information et de la communication de manière efficace, responsable et sécurisée.",
      method: "Identifier l'outil, comprendre son fonctionnement, suivre les étapes d'utilisation et appliquer les règles de sécurité numérique.",
      vocabulary: "Ordinateur, logiciel, fichier, dossier, donnée, réseau, sécurité."
    }
  };

  /* =========================================================
     BANQUE DE COURS SPÉCIFIQUES
     Les notions sont sélectionnées selon le titre réel
     de chaque leçon du programme.
     ========================================================= */

  const TOPICS = [

    /* ---------------- MATHÉMATIQUES ---------------- */

    {
      subject: "Mathématiques",
      keys: ["nombres entiers naturels"],
      course: {
        introduction: "Les nombres entiers naturels servent à compter, dénombrer et ranger des quantités. Ils sont utilisés dans la vie quotidienne pour compter des objets, des personnes ou des sommes d'argent.",
        explanation: "L'ensemble des nombres entiers naturels est noté ℕ. Il comprend 0, 1, 2, 3, 4, 5 et ainsi de suite. Un nombre appartient à ℕ lorsqu'il est un entier naturel. Le symbole ∈ signifie « appartient à » et le symbole ∉ signifie « n'appartient pas à ». Deux entiers naturels qui se suivent sont appelés nombres consécutifs. Un nombre est pair lorsqu'il est divisible par 2 ; il est impair lorsqu'il ne l'est pas. Un nombre a est un multiple de b lorsque a peut s'écrire b × k avec k entier naturel. Dans ce cas, b est un diviseur de a. Les critères de divisibilité permettent de reconnaître rapidement certains diviseurs : par 2, le chiffre des unités est 0, 2, 4, 6 ou 8 ; par 5, il est 0 ou 5 ; par 10, il est 0 ; par 100, les deux derniers chiffres sont 00. Un nombre est divisible par 3 ou par 9 lorsque la somme de ses chiffres est respectivement divisible par 3 ou par 9.",
        example: "Exemple : 246 appartient à ℕ. Il est pair car son chiffre des unités est 6. Il est divisible par 3 car 2 + 4 + 6 = 12 et 12 est divisible par 3. Il est divisible par 2 et par 3, donc aussi par 6. En revanche, 247 est impair.",
        vocabulary: "ℕ : ensemble des entiers naturels ; ∈ : appartient à ; ∉ : n'appartient pas à ; multiple : résultat d'une multiplication ; diviseur : nombre qui divise exactement un autre nombre ; pair : divisible par 2 ; impair : non divisible par 2.",
        method: "Pour déterminer si un nombre est divisible par 3 ou par 9, additionner ses chiffres. Pour trouver les diviseurs d'un nombre, rechercher les nombres qui le divisent sans reste. Pour vérifier un multiple, effectuer la division ou rechercher une multiplication exacte.",
        essential: "À retenir : les entiers naturels servent à compter. Tout entier naturel est pair ou impair. Un nombre peut avoir plusieurs diviseurs et plusieurs multiples. Les critères de divisibilité facilitent les calculs.",
        conclusion: "La maîtrise des nombres entiers naturels permet de compter, comparer, organiser des quantités et résoudre de nombreux problèmes."
      }
    },

    {
      subject: "Mathématiques",
      keys: ["nombres décimaux"],
      course: {
        introduction: "Les nombres décimaux permettent d'exprimer des quantités qui ne sont pas nécessairement entières. Ils sont notamment utilisés pour les prix, les longueurs, les masses et les mesures.",
        explanation: "Un nombre décimal possède une partie entière et une partie décimale séparées par une virgule. Dans 24,375, la partie entière est 24. Après la virgule, le premier chiffre indique les dixièmes, le deuxième les centièmes et le troisième les millièmes. On peut décomposer un nombre décimal en somme de ses différentes valeurs de position. Pour comparer deux nombres décimaux, on compare d'abord les parties entières. Si elles sont égales, on compare successivement les dixièmes, les centièmes puis les millièmes. Pour additionner ou soustraire des nombres décimaux, on aligne les virgules.",
        example: "24,375 = 20 + 4 + 0,3 + 0,07 + 0,005. Pour calculer 12,5 + 3,25, on écrit 12,50 + 3,25 = 15,75.",
        vocabulary: "Partie entière, partie décimale, virgule, dixième, centième, millième.",
        method: "Toujours aligner les virgules pour effectuer une addition ou une soustraction. Pour comparer deux nombres, compléter éventuellement avec des zéros à droite de la partie décimale.",
        essential: "Un zéro ajouté à droite de la partie décimale ne change pas la valeur du nombre : 3,5 = 3,50.",
        conclusion: "Les nombres décimaux permettent d'effectuer des mesures et des calculs précis dans les situations quotidiennes."
      }
    },

    {
      subject: "Mathématiques",
      keys: ["fractions"],
      course: {
        introduction: "Une fraction permet de représenter une partie d'une unité ou le quotient de deux nombres entiers.",
        explanation: "Une fraction s'écrit a/b, avec a au numérateur et b au dénominateur. Le dénominateur indique en combien de parts égales l'unité est partagée. Le numérateur indique le nombre de parts considérées. Le dénominateur ne peut pas être nul. Deux fractions peuvent être équivalentes lorsqu'elles représentent la même quantité. On obtient une fraction équivalente en multipliant ou en divisant le numérateur et le dénominateur par un même nombre non nul.",
        example: "Si une mangue est partagée en 4 parts égales et qu'on en prend 3, la quantité prise est 3/4. Les fractions 1/2 et 2/4 représentent la même quantité.",
        vocabulary: "Fraction, numérateur, dénominateur, unité, fraction équivalente.",
        method: "Identifier d'abord le nombre total de parts égales, puis le nombre de parts utilisées. Pour comparer des fractions simples, les ramener si possible au même dénominateur.",
        essential: "Le dénominateur est toujours différent de zéro. Le numérateur compte les parts prises.",
        conclusion: "Les fractions sont utiles pour partager équitablement, mesurer et représenter des quantités."
      }
    },

    {
      subject: "Mathématiques",
      keys: ["proportionnalité", "tableau de proportionnalité"],
      course: {
        introduction: "Deux grandeurs sont proportionnelles lorsque l'on passe de l'une à l'autre en multipliant toujours par le même nombre.",
        explanation: "Le nombre utilisé pour passer d'une grandeur à l'autre est appelé coefficient de proportionnalité. Dans un tableau de proportionnalité, les valeurs d'une ligne s'obtiennent en multipliant les valeurs correspondantes de l'autre ligne par un même coefficient. La règle de trois permet de calculer une valeur manquante.",
        example: "Si 1 cahier coûte 250 F CFA, alors 2 cahiers coûtent 500 F CFA et 4 cahiers coûtent 1 000 F CFA. Le coefficient de proportionnalité est 250.",
        vocabulary: "Grandeur, proportionnalité, coefficient, tableau, produit en croix.",
        method: "Repérer les deux grandeurs, identifier le coefficient de proportionnalité et effectuer le calcul. Vérifier que les unités sont cohérentes.",
        essential: "Dans une situation de proportionnalité, le rapport entre les deux grandeurs reste constant.",
        conclusion: "La proportionnalité permet de résoudre des problèmes de prix, de recettes, de distances et de quantités."
      }
    },

    {
      subject: "Mathématiques",
      keys: ["statistiques", "effectif", "fréquence"],
      course: {
        introduction: "Les statistiques permettent de recueillir, organiser, présenter et interpréter des informations concernant une population.",
        explanation: "Une population est l'ensemble des éléments étudiés. Un caractère est la propriété observée. L'effectif d'une valeur est le nombre de fois où elle apparaît. L'effectif total est la somme des effectifs. La fréquence d'une valeur est le quotient de son effectif par l'effectif total. Les résultats peuvent être présentés dans un tableau ou un diagramme.",
        example: "Dans une classe de 40 élèves, 10 portent des lunettes. La fréquence est 10/40 = 0,25, soit 25 %.",
        vocabulary: "Population, caractère, effectif, effectif total, fréquence, diagramme.",
        method: "Recueillir les données, compter les occurrences, construire le tableau, calculer les fréquences et interpréter les résultats.",
        essential: "La somme des fréquences exprimées en pourcentage est égale à 100 %.",
        conclusion: "Les statistiques aident à comprendre et comparer des données."
      }
    },

    {
      subject: "Mathématiques",
      keys: ["cercle", "disque"],
      course: {
        introduction: "Le cercle et le disque sont des figures géométriques que l'on rencontre dans de nombreux objets : roues, pièces, assiettes ou cadrans.",
        explanation: "Un cercle est l'ensemble des points situés à la même distance d'un point fixe appelé centre. Cette distance est le rayon. Un segment reliant deux points du cercle et passant par le centre est un diamètre. Le diamètre mesure deux fois le rayon. Le disque est la surface délimitée par un cercle.",
        example: "Si le rayon d'un cercle mesure 4 cm, son diamètre mesure 8 cm.",
        vocabulary: "Centre, rayon, diamètre, cercle, disque, corde.",
        method: "Pour tracer un cercle, placer la pointe du compas au centre, régler l'ouverture à la longueur du rayon puis faire tourner le compas.",
        essential: "Diamètre = 2 × rayon. Rayon = diamètre ÷ 2.",
        conclusion: "La distinction entre cercle et disque est essentielle pour décrire et construire des figures."
      }
    },

    {
      subject: "Mathématiques",
      keys: ["droite", "point", "segment"],
      course: {
        introduction: "La géométrie utilise des points, des droites et des segments pour représenter les formes et les positions.",
        explanation: "Un point indique une position et se note généralement par une lettre majuscule. Une droite est illimitée dans les deux sens. Une demi-droite possède une origine et se prolonge dans un seul sens. Un segment est une portion de droite limitée par deux extrémités. La longueur d'un segment se mesure avec une règle graduée.",
        example: "Le segment [AB] possède deux extrémités A et B. La droite (AB) passe par A et B et se prolonge des deux côtés.",
        vocabulary: "Point, droite, demi-droite, segment, extrémité, longueur.",
        method: "Utiliser une règle pour tracer une droite ou mesurer un segment. Respecter les notations géométriques.",
        essential: "La droite est illimitée ; le segment est limité par deux extrémités.",
        conclusion: "Les points, droites et segments constituent les bases des constructions géométriques."
      }
    },

    {
      subject: "Mathématiques",
      keys: ["angle"],
      course: {
        introduction: "Un angle représente l'ouverture formée par deux demi-droites ayant la même origine.",
        explanation: "Le point commun aux deux demi-droites est le sommet de l'angle. Les demi-droites sont les côtés de l'angle. Un angle se mesure en degrés avec un rapporteur. Un angle droit mesure 90°, un angle aigu mesure moins de 90° et un angle obtus mesure plus de 90° mais moins de 180°.",
        example: "Un angle de 45° est aigu. Un angle de 90° est droit. Un angle de 120° est obtus.",
        vocabulary: "Sommet, côté, angle aigu, angle droit, angle obtus, degré, rapporteur.",
        method: "Placer le centre du rapporteur sur le sommet, aligner un côté sur la ligne de référence puis lire la graduation correspondant à l'autre côté.",
        essential: "L'angle se mesure en degrés. L'angle droit mesure 90°.",
        conclusion: "La mesure des angles permet de construire et de décrire précisément les figures géométriques."
      }
    },

    {
      subject: "Mathématiques",
      keys: ["triangle"],
      course: {
        introduction: "Le triangle est un polygone formé de trois côtés, trois sommets et trois angles.",
        explanation: "Un triangle est une figure fermée possédant trois côtés. Un triangle équilatéral possède trois côtés de même longueur. Un triangle isocèle possède au moins deux côtés de même longueur. Un triangle rectangle possède un angle droit. La somme des mesures des angles d'un triangle est égale à 180°.",
        example: "Si deux angles d'un triangle mesurent 50° et 60°, le troisième mesure 180° - 50° - 60° = 70°.",
        vocabulary: "Sommet, côté, angle, triangle équilatéral, isocèle, rectangle.",
        method: "Pour construire un triangle, connaître les longueurs nécessaires et utiliser une règle, un compas ou un rapporteur selon la consigne.",
        essential: "La somme des trois angles d'un triangle vaut 180°.",
        conclusion: "Les propriétés des triangles facilitent les constructions et les raisonnements géométriques."
      }
    },

    {
      subject: "Mathématiques",
      keys: ["parallélogramme"],
      course: {
        introduction: "Le parallélogramme est un quadrilatère dont les côtés opposés sont parallèles.",
        explanation: "Un parallélogramme possède deux paires de côtés opposés parallèles. Ses côtés opposés ont la même longueur. Ses diagonales se coupent en leur milieu. Un rectangle, un losange et un carré sont des cas particuliers de parallélogrammes.",
        example: "Dans un parallélogramme ABCD, les côtés AB et CD sont parallèles et de même longueur.",
        vocabulary: "Quadrilatère, côté opposé, diagonale, parallèle, milieu.",
        method: "Pour reconnaître un parallélogramme, vérifier le parallélisme des côtés opposés ou utiliser les propriétés de ses diagonales.",
        essential: "Les diagonales d'un parallélogramme se coupent en leur milieu.",
        conclusion: "Le parallélogramme possède des propriétés qui permettent de le construire et de le reconnaître."
      }
    },

    {
      subject: "Mathématiques",
      keys: ["symétrie"],
      course: {
        introduction: "La symétrie permet de construire l'image d'une figure par rapport à un axe ou à un point.",
        explanation: "Dans la symétrie axiale, l'axe est la médiatrice du segment qui relie un point à son image. Le point et son image sont situés de part et d'autre de l'axe, à la même distance. Dans la symétrie centrale, le centre de symétrie est le milieu du segment reliant le point à son image.",
        example: "Si A' est le symétrique de A par rapport à une droite, alors cette droite est perpendiculaire à [AA'] et passe par son milieu.",
        vocabulary: "Symétrie axiale, symétrie centrale, axe, centre, image, médiatrice.",
        method: "Pour une symétrie axiale, tracer la perpendiculaire à l'axe passant par le point puis reporter la même distance de l'autre côté.",
        essential: "Un point et son image sont à égale distance de l'axe de symétrie.",
        conclusion: "La symétrie permet d'étudier les figures régulières et de réaliser des constructions précises."
      }
    },

    /* ---------------- SVT ---------------- */

    {
      subject: "SVT",
      keys: ["formation de la graine"],
      course: {
        introduction: "La graine est l'élément qui permet à de nombreuses plantes à fleurs de se reproduire. Sa formation se déroule après la reproduction de la fleur.",
        explanation: "La fleur possède plusieurs organes. Les sépales protègent le bouton floral. Les pétales attirent souvent les insectes pollinisateurs. Les étamines sont les organes reproducteurs mâles et produisent les grains de pollen. Le pistil est l'organe reproducteur femelle ; il comprend notamment le stigmate, le style et l'ovaire qui contient les ovules. La pollinisation correspond au transport du pollen jusqu'au stigmate. Après la pollinisation, le grain de pollen peut germer et permettre la fécondation de l'ovule. Après la fécondation, l'ovule se transforme en graine et l'ovaire évolue généralement en fruit. La graine contient un embryon et des réserves nutritives qui aideront la jeune plante au début de son développement.",
        example: "Chez le haricot, après la fécondation, les ovules contenus dans l'ovaire deviennent des graines. L'ovaire se développe pour former la gousse.",
        vocabulary: "Sépale : pièce florale protectrice ; pétale : pièce souvent colorée ; étamine : organe mâle ; pistil : organe femelle ; pollen : élément reproducteur mâle ; ovule : structure qui devient la graine après fécondation ; pollinisation : transport du pollen ; fécondation : union des cellules reproductrices.",
        method: "Pour étudier une fleur, observer sa structure, identifier les sépales, les pétales, les étamines et le pistil. Comparer une fleur avant et après la fécondation et rechercher les transformations de l'ovaire et des ovules.",
        essential: "La pollinisation précède la fécondation. Après la fécondation, l'ovule devient une graine et l'ovaire devient généralement un fruit.",
        conclusion: "La formation de la graine est une étape essentielle de la reproduction sexuée des plantes à fleurs."
      }
    },

    {
      subject: "SVT",
      keys: ["germination d'une graine", "germination"],
      course: {
        introduction: "La germination est le début du développement d'une nouvelle plante à partir d'une graine.",
        explanation: "Une graine viable contient un embryon vivant et des réserves nutritives. Lorsque les conditions favorables sont réunies, elle absorbe de l'eau, gonfle et son enveloppe se déchire. La première partie visible est généralement la radicule, qui donnera la racine. La tigelle et la gemmule se développent ensuite et formeront la tige et les premières feuilles. La germination nécessite principalement de l'eau, une température convenable et de l'air. La lumière n'est pas indispensable à la germination de toutes les graines, mais elle devient importante pour la croissance de la jeune plante verte. Une graine morte ou trop vieille peut ne pas germer.",
        example: "Lorsqu'on place des graines de haricot sur du coton humide, dans un endroit aéré et à température convenable, la radicule apparaît d'abord, puis la jeune tige se développe.",
        vocabulary: "Germination, graine viable, radicule, tigelle, gemmule, embryon, réserves nutritives.",
        method: "Comparer plusieurs lots de graines en ne faisant varier qu'un seul facteur à la fois : présence d'eau, température ou accès à l'air. Observer et noter les résultats.",
        essential: "L'eau, l'air et une température favorable sont nécessaires à la germination des graines étudiées. La graine doit être viable.",
        conclusion: "La germination permet à l'embryon contenu dans la graine de reprendre son développement et de donner une jeune plante."
      }
    },

    {
      subject: "SVT",
      keys: ["reproduction chez les mammifères", "mammifères"],
      course: {
        introduction: "Les mammifères sont des animaux vertébrés dont les femelles possèdent généralement des mamelles et allaitent leurs petits.",
        explanation: "Chez la plupart des mammifères, la reproduction est sexuée. Le mâle produit les spermatozoïdes et la femelle produit les ovules. La fécondation est interne : elle se déroule dans l'appareil reproducteur de la femelle. Après la fécondation, l'embryon se développe dans l'utérus chez les mammifères placentaires. La durée de la gestation varie selon les espèces. À la naissance, les petits sont nourris par le lait maternel. Certains mammifères, comme l'ornithorynque, pondent des œufs : il existe donc des exceptions.",
        example: "Chez la vache, la fécondation est interne, le petit se développe dans l'utérus pendant la gestation, puis le veau naît et est nourri par le lait de sa mère.",
        vocabulary: "Mâle, femelle, spermatozoïde, ovule, fécondation, embryon, utérus, gestation, allaitement.",
        method: "Comparer les étapes de la reproduction chez plusieurs mammifères : rencontre des cellules reproductrices, fécondation, développement, naissance et alimentation du petit.",
        essential: "Chez les mammifères placentaires, le petit se développe dans l'utérus et est nourri par le lait maternel après la naissance.",
        conclusion: "La reproduction assure la continuité des espèces de mammifères."
      }
    },

    {
      subject: "SVT",
      keys: ["reproduction chez les oiseaux", "oiseaux"],
      course: {
        introduction: "Les oiseaux sont des vertébrés qui se reproduisent généralement par ponte d'œufs.",
        explanation: "La reproduction des oiseaux est sexuée. Le mâle produit des spermatozoïdes et la femelle des ovules. Après l'accouplement, la fécondation est interne. L'œuf fécondé se forme dans l'appareil reproducteur de la femelle et reçoit des enveloppes protectrices ainsi que des réserves nutritives. La femelle pond l'œuf. Pendant la couvaison, la chaleur permet le développement de l'embryon. À la fin de l'incubation, le poussin sort de la coquille : c'est l'éclosion.",
        example: "Chez la poule, après la fécondation, l'œuf est pondu. La poule le couve et, après une période d'incubation d'environ 21 jours, le poussin éclot.",
        vocabulary: "Accouplement, fécondation interne, œuf, coquille, embryon, couvaison, incubation, éclosion.",
        method: "Étudier le cycle de reproduction en respectant l'ordre : accouplement, fécondation, ponte, couvaison, développement embryonnaire et éclosion.",
        essential: "Les oiseaux pondent des œufs. L'embryon se développe dans l'œuf grâce aux réserves nutritives et à une température favorable.",
        conclusion: "La ponte et l'incubation permettent le développement du nouvel individu chez les oiseaux."
      }
    },

    {
      subject: "SVT",
      keys: ["facteurs de croissance", "plantes à fleurs"],
      course: {
        introduction: "Après la germination, une jeune plante doit grandir et se développer. Sa croissance dépend de plusieurs facteurs du milieu.",
        explanation: "La croissance d'une plante correspond à l'augmentation de sa taille et de sa masse. Elle dépend notamment de l'eau, de la lumière, des sels minéraux, de la température et de la qualité du sol. Les racines absorbent l'eau et les sels minéraux. Les feuilles captent la lumière et réalisent la photosynthèse, processus qui permet à la plante verte de fabriquer sa matière organique à partir de l'eau et du dioxyde de carbone. Une plante privée durablement d'eau ou de lumière se développe difficilement.",
        example: "Deux jeunes plants identiques sont placés dans des conditions différentes. Celui qui reçoit de l'eau, de la lumière et des sels minéraux en quantité adaptée se développe généralement mieux que celui qui manque de ces facteurs.",
        vocabulary: "Croissance, développement, eau, lumière, sels minéraux, photosynthèse, matière organique.",
        method: "Comparer des plants en faisant varier un facteur à la fois. Mesurer leur taille à intervalles réguliers et noter les différences.",
        essential: "L'eau, la lumière, les sels minéraux et une température favorable contribuent à la croissance des plantes.",
        conclusion: "La croissance d'une plante dépend de ses caractéristiques propres et des conditions de son environnement."
      }
    },

    {
      subject: "SVT",
      keys: ["aliments", "croissance des vertébrés", "croissance"],
      course: {
        introduction: "Les êtres vivants ont besoin de nourriture pour grandir, entretenir leur organisme et produire de l'énergie.",
        explanation: "Les aliments apportent des nutriments nécessaires au fonctionnement du corps. Les protéines participent notamment à la construction et à la réparation des tissus. Les glucides et les lipides fournissent de l'énergie. Les vitamines, les sels minéraux et l'eau sont également indispensables. Les besoins alimentaires varient selon l'espèce, l'âge, l'activité et l'état de santé. Une alimentation insuffisante ou déséquilibrée peut ralentir la croissance.",
        example: "Un jeune animal bien nourri et disposant d'eau propre se développe généralement mieux qu'un animal qui manque durablement de nourriture.",
        vocabulary: "Aliment, nutriment, croissance, protéines, glucides, lipides, vitamines, sels minéraux.",
        method: "Comparer les conditions alimentaires de plusieurs animaux, observer leur évolution et rechercher le lien entre alimentation et croissance.",
        essential: "Une alimentation adaptée et équilibrée est nécessaire à la croissance et au bon fonctionnement de l'organisme.",
        conclusion: "La nourriture constitue un facteur important de croissance chez les animaux vertébrés."
      }
    },

    /* ---------------- PHYSIQUE-CHIMIE ---------------- */

    {
      subject: "Physique-Chimie",
      keys: ["circuit électrique", "circuit"],
      course: {
        introduction: "Un circuit électrique est un ensemble de composants reliés par des conducteurs et permettant le passage du courant électrique.",
        explanation: "Un circuit simple peut comprendre une pile, des fils conducteurs et une lampe. La pile fournit l'énergie électrique. Les fils relient les composants. La lampe transforme l'énergie électrique en lumière et en chaleur. Pour que le courant circule dans un circuit simple, le circuit doit former une boucle fermée. Un circuit ouvert ne permet pas le passage du courant.",
        example: "Une pile reliée à une lampe par deux fils forme un circuit fermé si toutes les connexions sont correctement réalisées. La lampe s'allume.",
        vocabulary: "Circuit, pile, générateur, conducteur, récepteur, interrupteur, circuit ouvert, circuit fermé.",
        method: "Identifier les composants, dessiner le schéma du circuit avec les symboles normalisés et vérifier que la boucle est fermée.",
        essential: "Le courant circule dans un circuit fermé. Un circuit ouvert interrompt le courant.",
        conclusion: "Comprendre les circuits électriques permet d'expliquer le fonctionnement de nombreux appareils."
      }
    },

    {
      subject: "Physique-Chimie",
      keys: ["interrupteur", "commande d'un circuit"],
      course: {
        introduction: "L'interrupteur est un dispositif qui permet d'ouvrir ou de fermer un circuit électrique.",
        explanation: "Lorsque l'interrupteur est fermé, le circuit est complet et le courant peut circuler. Lorsqu'il est ouvert, le circuit est interrompu et le courant ne circule plus dans le circuit simple étudié. L'interrupteur permet donc de commander un récepteur comme une lampe.",
        example: "Dans une chambre, l'interrupteur permet d'allumer ou d'éteindre une lampe sans débrancher les fils.",
        vocabulary: "Interrupteur, circuit ouvert, circuit fermé, commande, récepteur.",
        method: "Observer les deux positions de l'interrupteur et représenter chacune d'elles sur un schéma électrique.",
        essential: "Interrupteur fermé : circuit fermé. Interrupteur ouvert : circuit interrompu.",
        conclusion: "L'interrupteur commande le fonctionnement d'un circuit électrique."
      }
    },

    {
      subject: "Physique-Chimie",
      keys: ["court-circuit", "courts-circuits"],
      course: {
        introduction: "Un court-circuit est une situation dangereuse dans laquelle le courant emprunte un chemin de très faible résistance.",
        explanation: "Dans une installation électrique, un court-circuit peut se produire lorsque deux conducteurs qui ne doivent pas être directement reliés entrent en contact. L'intensité du courant peut alors devenir très élevée, provoquer un échauffement et entraîner un incendie ou détériorer les appareils. Les fusibles et les disjoncteurs servent à protéger les installations en interrompant le courant lorsqu'il devient anormalement élevé.",
        example: "Un fil électrique dont l'isolant est abîmé peut mettre deux conducteurs en contact et provoquer un court-circuit.",
        vocabulary: "Court-circuit, conducteur, isolant, échauffement, fusible, disjoncteur.",
        method: "Ne jamais provoquer volontairement un court-circuit. Étudier uniquement des schémas ou des dispositifs sécurisés sous la supervision d'un enseignant.",
        essential: "Un court-circuit est dangereux. Il peut provoquer un échauffement et un incendie.",
        conclusion: "La prévention des courts-circuits est essentielle pour la sécurité électrique."
      }
    },

    {
      subject: "Physique-Chimie",
      keys: ["états physiques", "solides", "liquides", "gaz"],
      course: {
        introduction: "La matière existe sous différentes formes appelées états physiques.",
        explanation: "Un solide possède généralement une forme propre et un volume propre. Un liquide possède un volume propre mais prend la forme du récipient qui le contient. Un gaz n'a ni forme propre ni volume propre : il occupe tout l'espace disponible. L'eau peut exister sous forme solide (glace), liquide (eau) ou gazeuse (vapeur d'eau).",
        example: "Un glaçon est solide, l'eau d'un verre est liquide et la vapeur d'eau est un gaz.",
        vocabulary: "Matière, solide, liquide, gaz, forme propre, volume propre.",
        method: "Observer différentes substances, les placer dans des récipients adaptés et comparer leur forme et leur volume.",
        essential: "Les trois états physiques étudiés sont l'état solide, l'état liquide et l'état gazeux.",
        conclusion: "La connaissance des états physiques permet de comprendre les transformations de la matière."
      }
    },

    {
      subject: "Physique-Chimie",
      keys: ["température", "thermomètre"],
      course: {
        introduction: "La température indique le niveau de chaleur ou de froid d'un corps. Elle se mesure avec un thermomètre.",
        explanation: "La température est une grandeur physique. Dans la vie courante et à l'école, elle est souvent exprimée en degrés Celsius (°C). Le thermomètre doit être utilisé correctement : on attend la stabilisation de l'indication et on lit la graduation à hauteur des yeux. Il ne faut pas confondre température et quantité de matière.",
        example: "Une température de 25 °C est supérieure à une température de 18 °C.",
        vocabulary: "Température, thermomètre, degré Celsius, graduation, mesure.",
        method: "Placer correctement le thermomètre, attendre que l'indication se stabilise puis lire la valeur sans toucher la partie sensible.",
        essential: "La température se mesure avec un thermomètre et s'exprime notamment en degrés Celsius.",
        conclusion: "Mesurer la température permet de comparer l'état thermique de différents corps."
      }
    },

    {
      subject: "Physique-Chimie",
      keys: ["changement d'état", "fusion", "solidification", "vaporisation", "liquéfaction"],
      course: {
        introduction: "Un changement d'état est le passage d'une substance d'un état physique à un autre.",
        explanation: "La fusion est le passage de l'état solide à l'état liquide. La solidification est le passage du liquide au solide. La vaporisation est le passage du liquide au gaz. La liquéfaction est le passage du gaz au liquide. Ces transformations peuvent être provoquées par un échange d'énergie thermique. Pour une substance pure, les changements d'état se produisent à des températures caractéristiques dans des conditions données.",
        example: "Un glaçon qui fond subit une fusion. L'eau placée au congélateur se solidifie.",
        vocabulary: "Fusion, solidification, vaporisation, liquéfaction, changement d'état.",
        method: "Identifier l'état initial et l'état final, puis nommer le changement d'état correspondant.",
        essential: "Fusion : solide vers liquide. Solidification : liquide vers solide. Vaporisation : liquide vers gaz. Liquéfaction : gaz vers liquide.",
        conclusion: "Les changements d'état montrent que la matière peut changer de forme physique sans nécessairement changer de nature."
      }
    },

    {
      subject: "Physique-Chimie",
      keys: ["masse", "balance"],
      course: {
        introduction: "La masse est une grandeur qui permet de mesurer la quantité de matière d'un objet.",
        explanation: "La masse se mesure avec une balance. Les unités courantes sont le gramme (g) et le kilogramme (kg). Un kilogramme correspond à 1 000 grammes. Pour mesurer la masse d'un objet, on utilise une balance adaptée et on veille à ce qu'elle soit correctement réglée.",
        example: "2 kg = 2 000 g. Un sac de riz de 5 kg possède une masse de 5 000 g.",
        vocabulary: "Masse, balance, gramme, kilogramme, mesure, tare.",
        method: "Placer la balance sur une surface stable, faire la tare si nécessaire, déposer l'objet et lire la valeur affichée.",
        essential: "La masse se mesure avec une balance. 1 kg = 1 000 g.",
        conclusion: "La mesure de la masse est utile dans les activités scientifiques et dans la vie quotidienne."
      }
    },

    {
      subject: "Physique-Chimie",
      keys: ["volume", "éprouvette graduée"],
      course: {
        introduction: "Le volume représente l'espace occupé par un corps.",
        explanation: "Le volume peut être exprimé en litre (L), millilitre (mL) ou centimètre cube (cm³). Pour mesurer le volume d'un liquide, on peut utiliser une éprouvette graduée. La lecture se fait à hauteur des yeux, au niveau approprié de la surface du liquide. Pour un solide régulier, le volume peut être calculé à partir de ses dimensions. Pour un solide de forme irrégulière, on peut utiliser le déplacement d'eau.",
        example: "1 L = 1 000 mL. Si le niveau d'eau passe de 50 mL à 70 mL après immersion d'un objet, le volume de l'objet est de 20 mL, soit 20 cm³.",
        vocabulary: "Volume, litre, millilitre, centimètre cube, éprouvette graduée, déplacement d'eau.",
        method: "Choisir un instrument adapté, lire correctement les graduations et exprimer le résultat avec son unité.",
        essential: "1 L = 1 000 mL et 1 mL = 1 cm³.",
        conclusion: "La mesure du volume permet de connaître l'espace occupé par un liquide ou un solide."
      }
    },

    /* ---------------- TICE ---------------- */

    {
      subject: "TICE",
      keys: ["ordinateur", "composants", "matériel informatique"],
      course: {
        introduction: "L'ordinateur est une machine électronique qui permet de recevoir, traiter, stocker et restituer des informations.",
        explanation: "Un ordinateur comporte plusieurs éléments matériels. L'unité centrale contient les composants qui assurent le traitement des informations. L'écran permet d'afficher les résultats. Le clavier sert à saisir du texte et des commandes. La souris permet de déplacer le pointeur et de sélectionner des éléments. Les périphériques peuvent être classés selon leur fonction : entrée, sortie ou stockage.",
        example: "Le clavier est un périphérique d'entrée parce qu'il permet de saisir des informations. L'écran est un périphérique de sortie parce qu'il affiche les résultats.",
        vocabulary: "Ordinateur, unité centrale, écran, clavier, souris, périphérique, entrée, sortie, stockage.",
        method: "Identifier chaque composant, décrire sa fonction et le classer selon son rôle dans le traitement de l'information.",
        essential: "Un ordinateur reçoit des données, les traite, les stocke éventuellement et restitue des résultats.",
        conclusion: "Connaître les composants d'un ordinateur permet de mieux comprendre son fonctionnement."
      }
    },

    {
      subject: "TICE",
      keys: ["fichier", "dossier", "répertoire"],
      course: {
        introduction: "Les fichiers et les dossiers permettent d'organiser les informations enregistrées sur un ordinateur.",
        explanation: "Un fichier contient des informations : texte, image, son, vidéo ou programme. Un dossier sert à regrouper et organiser des fichiers et éventuellement d'autres dossiers. Le nom d'un fichier permet de le retrouver. Son extension indique généralement son type : .docx pour un document Word, .jpg pour une image ou .mp3 pour un fichier audio. Il est important d'enregistrer régulièrement son travail.",
        example: "Un élève peut créer un dossier nommé « Cours de 6e », puis un sous-dossier « Mathématiques » pour y ranger ses exercices.",
        vocabulary: "Fichier, dossier, répertoire, nom, extension, enregistrer, déplacer, copier.",
        method: "Créer un dossier, lui donner un nom clair, enregistrer un fichier dedans et vérifier son emplacement.",
        essential: "Un dossier organise les fichiers. Un fichier contient des données.",
        conclusion: "Une bonne organisation des fichiers facilite la recherche et protège le travail scolaire."
      }
    },

    {
      subject: "TICE",
      keys: ["internet", "réseau", "web"],
      course: {
        introduction: "Internet est un vaste réseau mondial qui permet à des ordinateurs et à d'autres appareils d'échanger des informations.",
        explanation: "Internet permet notamment de consulter des pages web, d'envoyer des messages et de partager des fichiers. Un navigateur est un logiciel utilisé pour consulter les sites web. Un moteur de recherche aide à trouver des informations. Il faut vérifier la fiabilité des sources, éviter de communiquer ses informations personnelles et ne pas ouvrir des liens suspects.",
        example: "Pour rechercher une définition, on peut utiliser un moteur de recherche, consulter plusieurs sources et comparer les informations avant de les retenir.",
        vocabulary: "Internet, réseau, navigateur, site web, moteur de recherche, lien, source.",
        method: "Formuler une recherche précise, consulter plusieurs résultats, identifier l'auteur ou l'organisme responsable et vérifier la date de publication.",
        essential: "Toutes les informations trouvées sur Internet ne sont pas nécessairement exactes.",
        conclusion: "Internet est un outil de recherche et de communication qui doit être utilisé avec esprit critique."
      }
    }
  ];

  /* =========================================================
     OUTILS DE RECONNAISSANCE DES LEÇONS
     ========================================================= */

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[_-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function findTopic(subject, title) {
    const normalizedTitle = normalizeText(title);

    return TOPICS.find(function (topic) {
      if (topic.subject !== subject) return false;

      return topic.keys.some(function (key) {
        return normalizedTitle.includes(normalizeText(key));
      });
    });
  }

  function getSubjectInfo(subject) {
    return SUBJECT_INFO[subject] || SUBJECT_INFO["Français"];
  }

  /* =========================================================
     CONSTRUCTION DU COURS
     ========================================================= */

  function buildGenericCourse(subject, title) {
    const info = getSubjectInfo(subject);

    const introduction =
      "Cette leçon porte sur « " + title + " ». " +
      "Elle permet de découvrir la notion, de comprendre son utilité " +
      "et d'apprendre à l'utiliser dans des situations concrètes.";

    let explanation = "";

    if (subject === "Français") {
      explanation =
        "Pour étudier cette notion, il faut d'abord observer les mots, " +
        "les phrases ou le texte concernés. On identifie ensuite les " +
        "éléments importants et on formule la règle ou la caractéristique " +
        "à retenir. Une notion de langue doit être comprise dans son " +
        "contexte : le sens, la construction et l'emploi sont essentiels. " +
        "L'élève doit être capable de reconnaître la notion dans un texte, " +
        "de l'expliquer et de la réutiliser correctement dans ses propres phrases.";
    } else if (subject === "Anglais") {
      explanation =
        "En anglais, il faut comprendre le sens des mots et des expressions " +
        "avant de les mémoriser. Une phrase simple comporte généralement " +
        "un sujet et un verbe, auxquels peuvent s'ajouter un complément. " +
        "Il faut observer l'ordre des mots, la forme du verbe et la situation " +
        "de communication. La prononciation et la répétition aident à mémoriser " +
        "les expressions. L'élève doit progressivement savoir écouter, lire, " +
        "répondre et produire des phrases adaptées au thème étudié.";
    } else if (subject === "Histoire-Géographie") {
      explanation =
        "L'étude de cette leçon repose sur l'observation et l'exploitation " +
        "de documents. Il peut s'agir d'un texte, d'une carte, d'une image, " +
        "d'une photographie, d'un tableau ou d'une frise chronologique. " +
        "Il faut identifier le document, relever les informations utiles, " +
        "expliquer les faits et organiser les idées. En histoire, on veille " +
        "à situer les événements dans le temps. En géographie, on localise " +
        "les lieux et on étudie les caractéristiques des espaces.";
    } else if (subject === "SVT") {
      explanation =
        "Une étude scientifique commence par une observation précise. " +
        "L'observation conduit à poser un problème auquel on cherche une " +
        "réponse. On peut formuler une hypothèse, étudier une expérience " +
        "ou comparer des résultats. Les résultats doivent être décrits " +
        "sans les confondre avec leur interprétation. La conclusion répond " +
        "au problème de départ et s'appuie sur les observations réalisées.";
    } else if (subject === "Physique-Chimie") {
      explanation =
        "En physique-chimie, on étudie les propriétés de la matière et " +
        "les phénomènes observables. Il faut identifier les objets ou " +
        "substances étudiés, décrire les conditions de l'expérience, " +
        "effectuer les mesures avec les unités adaptées et interpréter " +
        "les résultats. Les manipulations doivent toujours respecter les " +
        "consignes de sécurité et être réalisées avec le matériel adapté.";
    } else if (subject === "EDHC") {
      explanation =
        "Cette notion permet de comprendre comment agir de manière " +
        "responsable dans la société. Une situation concrète aide à " +
        "identifier les personnes concernées, les droits, les devoirs " +
        "et les conséquences des comportements. Il faut distinguer " +
        "ce qui est responsable de ce qui ne l'est pas, puis proposer " +
        "des attitudes fondées sur le respect, la justice, la solidarité " +
        "et la protection des personnes.";
    } else if (subject === "Arts plastiques") {
      explanation =
        "Une production plastique est une réalisation visuelle qui utilise " +
        "des moyens comme le dessin, la peinture, le collage, les formes, " +
        "les couleurs et les matières. Pour comprendre cette notion, " +
        "il faut observer des exemples, identifier les choix de l'artiste " +
        "et expérimenter différentes techniques. La réalisation doit " +
        "respecter la consigne tout en laissant une place à la créativité.";
    } else if (subject === "Éducation musicale") {
      explanation =
        "L'éducation musicale développe l'écoute et la pratique. Il faut " +
        "apprendre à distinguer les sons, repérer les rythmes et les " +
        "mélodies, reconnaître les caractéristiques d'une production " +
        "musicale et participer à des activités vocales ou rythmiques. " +
        "L'écoute attentive et la répétition facilitent la mémorisation.";
    } else if (subject === "EPS") {
      explanation =
        "Cette activité physique nécessite de comprendre les règles, " +
        "les gestes techniques et les objectifs de l'exercice. Avant " +
        "l'effort, un échauffement progressif prépare le corps. Pendant " +
        "l'activité, l'élève doit respecter les consignes, contrôler " +
        "ses mouvements, coopérer et assurer sa sécurité ainsi que " +
        "celle des autres.";
    } else if (subject === "TICE") {
      explanation =
        "L'étude de cette notion informatique consiste à identifier " +
        "l'outil ou la fonction concernée, comprendre son utilité et " +
        "apprendre à l'utiliser correctement. Il faut suivre les étapes " +
        "dans l'ordre, vérifier le résultat et adopter de bonnes pratiques : " +
        "enregistrer son travail, organiser ses fichiers et protéger " +
        "ses informations personnelles.";
    } else {
      explanation =
        "La notion doit être comprise à partir de sa définition, de ses " +
        "caractéristiques et de ses applications. Il faut observer les " +
        "exemples, identifier les éléments importants et s'entraîner.";
    }

    return {
      introduction: introduction,
      explanation: explanation,
      example:
        "Exemple d'application : prends une situation simple liée au thème « " +
        title + " ». Identifie les informations importantes, explique " +
        "la notion étudiée et montre comment elle peut être utilisée.",
      vocabulary: info.vocabulary,
      method: info.method,
      essential:
        "À retenir : il faut connaître la définition de la notion, " +
        "savoir reconnaître ses principales caractéristiques et être " +
        "capable de l'appliquer dans une situation nouvelle.",
      conclusion:
        "Cette leçon permet de construire les connaissances nécessaires " +
        "pour comprendre le thème « " + title + " » et poursuivre les apprentissages."
    };
  }

  function buildCourse(subject, title) {
    const topic = findTopic(subject, title);

    if (topic) {
      return Object.assign({}, topic.course);
    }

    return buildGenericCourse(subject, title);
  }

  /* =========================================================
     EXERCICES ET CORRECTIONS
     ========================================================= */

  function buildExercises(subject, title) {
    const exercises = [];

    if (subject === "Mathématiques") {
      exercises.push({
        level: "Application",
        instruction:
          "Explique avec tes propres mots la notion « " + title +
          " ». Donne deux exemples corrects.",
        correction:
          "Correction : la réponse doit présenter une définition correcte " +
          "de la notion et deux exemples cohérents. Les exemples doivent " +
          "respecter les propriétés étudiées dans le cours."
      });

      exercises.push({
        level: "Entraînement",
        instruction:
          "Propose une situation de la vie quotidienne dans laquelle " +
          "la notion « " + title + " » peut être utilisée. Résous-la.",
        correction:
          "Correction : une bonne réponse identifie les données utiles, " +
          "choisit la propriété ou l'opération adaptée, présente les étapes " +
          "du raisonnement et donne le résultat avec une explication."
      });
    } else if (subject === "Anglais") {
      exercises.push({
        level: "Vocabulary",
        instruction:
          "Write five English words or expressions related to the lesson « " +
          title + " ». Give their meanings in French.",
        correction:
          "Correction : les cinq mots doivent être en anglais, correctement " +
          "écrits et associés à leur sens français. Vérifie l'orthographe " +
          "et la signification de chaque mot."
      });

      exercises.push({
        level: "Practice",
        instruction:
          "Write three simple English sentences using words or expressions " +
          "related to the lesson.",
        correction:
          "Correction : chaque phrase doit avoir un sens clair, respecter " +
          "l'ordre des mots en anglais et utiliser correctement le vocabulaire."
      });
    } else if (subject === "Français") {
      exercises.push({
        level: "Compréhension",
        instruction:
          "Explique la notion « " + title +
          " » et indique comment la reconnaître dans un texte.",
        correction:
          "Correction : la réponse doit donner une définition claire, " +
          "indiquer les caractéristiques de la notion et présenter " +
          "un exemple correctement expliqué."
      });

      exercises.push({
        level: "Production",
        instruction:
          "Rédige cinq phrases dans lesquelles tu réutilises correctement " +
          "la notion étudiée.",
        correction:
          "Correction : les phrases doivent être compréhensibles, " +
          "correctement construites et respecter la règle étudiée."
      });
    } else if (subject === "Histoire-Géographie") {
      exercises.push({
        level: "Observation",
        instruction:
          "Présente le thème « " + title +
          " ». Indique les informations importantes à retenir.",
        correction:
          "Correction : la réponse doit présenter le sujet, les faits " +
          "ou éléments essentiels, les lieux ou les dates utiles selon " +
          "la nature de la leçon."
      });

      exercises.push({
        level: "Réflexion",
        instruction:
          "Explique pourquoi le thème étudié est important pour comprendre " +
          "une société ou un territoire.",
        correction:
          "Correction : il faut établir un lien entre les faits étudiés " +
          "et leurs conséquences sur les populations, les activités " +
          "ou l'organisation de l'espace."
      });
    } else {
      exercises.push({
        level: "Compréhension",
        instruction:
          "Définis la notion « " + title +
          " » et présente au moins trois éléments importants du cours.",
        correction:
          "Correction : la définition doit être claire et les éléments " +
          "présentés doivent correspondre aux connaissances étudiées. " +
          "Une réponse complète explique les éléments au lieu de les énumérer seulement."
      });

      exercises.push({
        level: "Application",
        instruction:
          "À partir d'une situation concrète liée à « " + title +
          " », explique ce qu'il faut observer, comprendre ou réaliser.",
        correction:
          "Correction : il faut identifier la situation, mobiliser les " +
          "connaissances du cours et proposer une réponse cohérente, " +
          "justifiée et organisée."
      });
    }

    exercises.push({
      level: "Approfondissement",
      instruction:
        "Rédige un court paragraphe dans lequel tu expliques ce que tu as " +
        "retenu de la leçon « " + title + " » et comment tu peux utiliser " +
        "ces connaissances.",
      correction:
        "Correction : le paragraphe doit comporter une idée principale, " +
        "des explications exactes et un exemple ou une application. " +
        "La présentation doit être claire et organisée."
    });

    return exercises;
  }

  /* =========================================================
     QUIZ
     ========================================================= */

  function buildQuiz(subject, title) {
    return [
      {
        question:
          "Quel est l'objectif principal de la leçon « " + title + " » ?",
        answer:
          "Comprendre la notion étudiée, connaître ses caractéristiques " +
          "et savoir l'utiliser dans une situation adaptée.",
        explanation:
          "Une leçon ne consiste pas seulement à mémoriser un titre. " +
          "Il faut comprendre la notion et être capable de l'appliquer."
      },
      {
        question:
          "Pourquoi faut-il connaître les définitions et les mots importants du cours ?",
        answer:
          "Parce qu'ils permettent de comprendre les explications et " +
          "d'utiliser correctement les connaissances.",
        explanation:
          "Le vocabulaire précis facilite la compréhension et la communication."
      },
      {
        question:
          "Comment vérifier que tu as compris cette leçon ?",
        answer:
          "En expliquant la notion avec ses propres mots et en réussissant " +
          "des exercices d'application.",
        explanation:
          "La réussite d'un exercice permet de vérifier que les connaissances " +
          "peuvent être utilisées et pas seulement récitées."
      }
    ];
  }

  /* =========================================================
     ÉVALUATION
     ========================================================= */

  function buildAssessment(subject, title) {
    return {
      duration: "20 minutes",
      total: 10,
      instructions:
        "Lis attentivement les questions. Réponds avec des phrases " +
        "claires et utilise le vocabulaire approprié. Justifie tes réponses " +
        "lorsque cela est demandé.",
      questions: [
        {
          points: 2,
          question:
            "Donne une définition correcte de la notion étudiée dans « " +
            title + " ».",
          expected:
            "La réponse doit présenter une définition exacte et compréhensible."
        },
        {
          points: 3,
          question:
            "Présente trois connaissances importantes à retenir de cette leçon.",
          expected:
            "Les trois éléments doivent être exacts, pertinents et liés au cours."
        },
        {
          points: 2,
          question:
            "Donne un exemple concret permettant d'illustrer la notion étudiée.",
          expected:
            "L'exemple doit être cohérent avec la définition et correctement expliqué."
        },
        {
          points: 3,
          question:
            "Résous ou explique une situation simple dans laquelle tu dois utiliser " +
            "les connaissances de cette leçon.",
          expected:
            "La réponse doit montrer un raisonnement organisé, l'utilisation " +
            "des connaissances du cours et une conclusion cohérente."
        }
      ]
    };
  }

  /* =========================================================
     RÉVISION
     ========================================================= */

  function buildRevision(subject, title, course) {
    return [
      "Relire attentivement la définition de la leçon : " + title + ".",
      "Mémoriser les mots importants et leur signification.",
      "Revoir les explications et les exemples du cours.",
      "Être capable d'expliquer la notion sans recopier le texte.",
      "Refaire les exercices sans regarder les corrections.",
      "Vérifier les erreurs et comprendre pourquoi elles se sont produites.",
      "S'entraîner à appliquer les connaissances dans une nouvelle situation."
    ];
  }

  /* =========================================================
     CONSTRUCTION D'UNE SÉANCE
     ========================================================= */

  function buildSession(subject, title, sessionTitle, sessionIndex) {
    const course = buildCourse(subject, title);

    return {
      title: sessionTitle || (
        sessionIndex === 0
          ? "Découverte et compréhension de la leçon"
          : "Approfondissement et application"
      ),
      course: course,
      exercises: buildExercises(subject, title),
      quiz: buildQuiz(subject, title),
      assessment: buildAssessment(subject, title),
      revision: buildRevision(subject, title, course)
    };
  }

  /* =========================================================
     NORMALISATION DU PROGRAMME
     ========================================================= */

  function normalizeLessons(data) {
    const result = [];

    if (Array.isArray(data)) {
      data.forEach(function (item) {
        if (typeof item === "string") {
          result.push({
            title: item,
            section: "",
            sessions: []
          });
        } else if (item && item.title) {
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
      Object.keys(data).forEach(function (section) {
        const lessons = data[section];

        if (!Array.isArray(lessons)) return;

        lessons.forEach(function (item) {
          if (typeof item === "string") {
            result.push({
              title: item,
              section: section,
              sessions: []
            });
          } else if (item && item.title) {
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

  function findCurriculumKey(curriculum, subject) {
    if (!curriculum || typeof curriculum !== "object") return null;

    const target = normalizeText(subject);

    return Object.keys(curriculum).find(function (key) {
      return normalizeText(key) === target;
    }) || null;
  }

  /* =========================================================
     CONSTRUCTION D'UNE LEÇON COMPLÈTE
     ========================================================= */

  function buildLesson(subject, rawLesson, lessonIndex) {
    const title = typeof rawLesson === "string"
      ? rawLesson
      : rawLesson.title;

    const section = rawLesson && rawLesson.section
      ? rawLesson.section
      : "";

    const course = buildCourse(subject, title);

    let sourceSessions = rawLesson && Array.isArray(rawLesson.sessions)
      ? rawLesson.sessions
      : [];

    if (sourceSessions.length === 0) {
      sourceSessions = [
        "Découverte et compréhension",
        "Application et consolidation"
      ];
    }

    const sessions = sourceSessions.map(function (session, index) {
      const sessionTitle = typeof session === "string"
        ? session
        : (session.title || "Séance " + (index + 1));

      return buildSession(
        subject,
        title,
        sessionTitle,
        index
      );
    });

    return {
      title: title,
      section: section,
      introduction: course.introduction,
      objectives: [
        "Comprendre la notion étudiée : " + title + ".",
        "Connaître les définitions et le vocabulaire essentiel.",
        "Expliquer les principales caractéristiques de la notion.",
        "Utiliser les connaissances dans des exercices et des situations concrètes."
      ],
      sessions: sessions
    };
  }

  /* =========================================================
     CONSTRUCTION DE TOUTES LES MATIÈRES
     ========================================================= */

  function buildAll(curriculum) {
    const result = {};

    SUBJECTS.forEach(function (subject) {
      const key = findCurriculumKey(curriculum, subject);

      if (!key) {
        result[subject] = {
          lessons: []
        };
        return;
      }

      const lessons = normalizeLessons(curriculum[key]);

      result[subject] = {
        lessons: lessons.map(function (lesson, index) {
          return buildLesson(subject, lesson, index);
        })
      };
    });

    return result;
  }

  /* =========================================================
     API UTILISÉE PAR SCHOOL.JS
     ========================================================= */

  window.ATP_LEARNING_CONTENT_6E = {
    version: "2.0",
    subjects: SUBJECTS,
    commonRules: {
      language: "fr",
      level: "6e",
      country: "Côte d'Ivoire",
      pedagogy: "Approche par compétences",
      principles: [
        "Partir des connaissances et des situations concrètes.",
        "Expliquer les notions avant de proposer les exercices.",
        "Faire participer activement l'apprenant.",
        "Proposer des exercices progressifs.",
        "Présenter les corrections et les explications.",
        "Vérifier les acquis par des évaluations."
      ]
    },
    buildAll: buildAll,
    buildLesson: buildLesson,
    buildSession: buildSession
  };

})();
