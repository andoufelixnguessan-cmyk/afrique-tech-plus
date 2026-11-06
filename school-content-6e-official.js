/* ATP SCHOOL — contenus pédagogiques 6e, première série de matières
 * Alignement des intitulés sur le programme éducatif et le guide d'exécution
 * de la DPFC (Côte d'Ivoire). Rédactions pédagogiques originales.
 * Matières : Français, Mathématiques, Anglais, Histoire-Géographie, SVT.
 */
(function () {
  "use strict";
  const engine = window.ATP_LEARNING_CONTENT_6E;
  if (!engine || typeof engine.buildAll !== "function") return;
  const previousBuildAll = engine.buildAll;

  const make = (definition, objectives, explanation, example, method, vocabulary, essential, exercises, quiz) => ({
    definition, objectives, explanation, example, method, vocabulary, essential, exercises, quiz
  });

  const M = {
    "Nombres entiers naturels": make(
      "Un entier naturel est un nombre utilisé pour dénombrer : 0, 1, 2, 3…",
      ["Lire, écrire et décomposer un entier naturel.", "Comparer et ranger des entiers.", "Effectuer les opérations et contrôler un résultat."],
      ["Notre système de numération est décimal et positionnel : dix unités forment une dizaine, dix dizaines une centaine et dix centaines un millier.", "Dans 48 306, le chiffre 4 vaut 40 000, le 8 vaut 8 000, le 3 vaut 300 et le 6 vaut 6 unités.", "Pour comparer deux entiers, on compare d'abord leur nombre de chiffres. S'ils en ont autant, on compare les chiffres de gauche à droite.", "L'addition calcule une somme, la soustraction une différence, la multiplication un produit et la division un partage ou un groupement."],
      "Une école reçoit 24 cartons contenant chacun 18 cahiers : 24 × 18 = 432 cahiers.",
      ["Décomposer le nombre selon les rangs.", "Aligner les chiffres de même rang pour poser une opération.", "Effectuer le calcul sans oublier les retenues.", "Vérifier par l'opération inverse lorsque c'est possible."],
      ["Chiffre", "Nombre", "Unité", "Dizaine", "Centaine", "Millier", "Somme", "Produit", "Quotient"],
      "La position d'un chiffre détermine sa valeur. Dix unités d'un rang forment une unité du rang suivant.",
      [{level:"Application",instruction:"Décompose 63 508 sous forme additive.",correction:"63 508 = 60 000 + 3 000 + 500 + 8."},{level:"Problème",instruction:"Une coopérative achète 16 paquets de 25 cahiers. Combien de cahiers achète-t-elle ?",correction:"16 × 25 = 400 cahiers."}],
      [{question:"Combien d'unités forment une dizaine ?",answer:"10 unités.",explanation:"La numération décimale fonctionne par groupements de dix."}]
    ),
    "Droites et points": make(
      "Un point indique une position. Une droite est une ligne illimitée dans les deux sens et déterminée par deux points distincts.",
      ["Nommer et placer des points.", "Tracer et désigner une droite.", "Reconnaître des droites sécantes et parallèles."],
      ["Un point se désigne par une lettre majuscule : A, B ou O.", "La droite passant par A et B se note (AB). Elle se prolonge sans fin des deux côtés.", "Deux droites sécantes ont un point commun appelé point d'intersection.", "Deux droites parallèles d'un même plan ne se coupent pas, même si on les prolonge."],
      "Si les droites (AB) et (CD) se rencontrent en O, O est leur point d'intersection.",
      ["Marquer les points avec une croix fine.", "Placer la règle sur les deux points pour tracer la droite.", "Prolonger le trait des deux côtés.", "Utiliser une équerre pour vérifier un parallélisme."],
      ["Point", "Droite", "Intersection", "Sécantes", "Parallèles"],
      "La notation (AB) désigne une droite, et non un segment.",
      [{level:"Vocabulaire",instruction:"Comment note-t-on la droite qui passe par M et N ?",correction:"La droite se note (MN)."}],
      [{question:"Une droite possède-t-elle des extrémités ?",answer:"Non. Elle est illimitée dans les deux sens.",explanation:"Un segment, lui, possède deux extrémités."}]
    ),
    "Nombres décimaux relatifs": make(
      "Un nombre décimal relatif est un nombre décimal précédé d'un signe positif (+) ou négatif (−), ou égal à zéro.",
      ["Repérer les nombres positifs et négatifs.", "Placer un nombre relatif sur une droite graduée.", "Comparer des nombres relatifs simples."],
      ["Zéro sépare les nombres positifs des nombres négatifs.", "Les nombres positifs se placent à droite de zéro ; les nombres négatifs à gauche.", "Sur une droite graduée, les nombres augmentent de gauche à droite.", "Tout nombre positif est supérieur à tout nombre négatif. Entre deux nombres négatifs, le plus proche de zéro est le plus grand."],
      "À Abidjan, une température de +5 °C est supérieure à −2 °C. Sur la droite, +5 se trouve à droite de −2.",
      ["Tracer une droite et choisir une unité régulière.", "Placer zéro.", "Compter les graduations vers la droite pour les positifs et vers la gauche pour les négatifs.", "Comparer en observant la position."],
      ["Nombre relatif", "Signe", "Positif", "Négatif", "Origine", "Droite graduée"],
      "Sur une droite graduée, aller vers la droite signifie aller vers des nombres plus grands.",
      [{level:"Application",instruction:"Range −4 ; +3 ; 0 ; −1 dans l'ordre croissant.",correction:"−4 < −1 < 0 < +3."}],
      [{question:"Quel est le plus grand de −6 et −2 ?",answer:"−2.",explanation:"−2 est plus proche de zéro et se trouve plus à droite."}]
    ),
    "Segment": make(
      "Un segment est une partie de droite limitée par deux points appelés extrémités.",
      ["Reconnaître et noter un segment.", "Mesurer une longueur à la règle graduée.", "Tracer un segment de longueur donnée."],
      ["Le segment d'extrémités A et B se note [AB].", "Contrairement à la droite (AB), le segment [AB] a une longueur mesurable.", "La longueur du segment se note AB et s'exprime avec une unité comme le millimètre ou le centimètre.", "Le milieu I de [AB] appartient au segment et vérifie IA = IB."],
      "Si AB = 7 cm et I est le milieu de [AB], alors IA = IB = 3,5 cm.",
      ["Placer le zéro de la règle sur la première extrémité.", "Lire la graduation à la seconde extrémité.", "Pour construire, marquer la longueur demandée à partir du zéro.", "Pour trouver le milieu, partager la longueur en deux parties égales."],
      ["Segment", "Extrémité", "Longueur", "Milieu", "Règle graduée"],
      "Un segment est limité par deux extrémités ; sa longueur est une mesure.",
      [{level:"Construction",instruction:"Trace [CD] de longueur 5,4 cm.",correction:"Place C au zéro de la règle, marque D à 5,4 cm puis trace le segment."}],
      [{question:"Comment note-t-on le segment d'extrémités A et B ?",answer:"[AB].",explanation:"Les crochets indiquent que le segment est limité à A et B."}]
    ),
    "Cercles et disques": make(
      "Un cercle de centre O et de rayon r est l'ensemble des points situés à la distance r de O. Le disque est la surface intérieure délimitée par le cercle.",
      ["Identifier centre, rayon et diamètre.", "Distinguer cercle et disque.", "Construire un cercle au compas."],
      ["Le centre est le point fixe équidistant de tous les points du cercle.", "Un rayon relie le centre à un point du cercle.", "Un diamètre relie deux points du cercle en passant par le centre ; sa longueur est le double du rayon.", "Le cercle est la ligne frontière. Le disque comprend cette ligne et toute sa partie intérieure."],
      "Si le rayon mesure 4 cm, le diamètre mesure 2 × 4 = 8 cm.",
      ["Marquer le centre.", "Régler l'ouverture du compas sur le rayon.", "Placer la pointe en O et tourner sans changer l'ouverture.", "Tracer un diamètre à la règle en passant par le centre."],
      ["Centre", "Rayon", "Diamètre", "Cercle", "Disque", "Compas"],
      "Diamètre = 2 × rayon. Rayon = diamètre ÷ 2.",
      [{level:"Calcul",instruction:"Un cercle a un diamètre de 9 cm. Calcule son rayon.",correction:"r = 9 ÷ 2 = 4,5 cm."}],
      [{question:"Quelle relation lie le diamètre et le rayon ?",answer:"Le diamètre vaut deux fois le rayon.",explanation:"Il est formé de deux rayons alignés."}]
    ),
    "Fractions": make(
      "Une fraction a/b représente a parts lorsque l'unité est partagée en b parts égales ; le dénominateur b ne peut pas être nul.",
      ["Identifier numérateur et dénominateur.", "Lire et représenter une fraction.", "Comparer des fractions simples de même dénominateur."],
      ["Le dénominateur indique en combien de parts égales l'unité est partagée.", "Le numérateur indique le nombre de parts considérées.", "Une fraction peut être inférieure à 1, égale à 1 ou supérieure à 1.", "Pour des fractions de même dénominateur, la plus grande est celle qui a le plus grand numérateur."],
      "Une mangue est partagée en 6 morceaux égaux. Si 2 morceaux sont consommés, la partie consommée est 2/6.",
      ["Identifier l'unité entière.", "Vérifier que le partage produit des parts égales.", "Écrire le nombre de parts prises au numérateur.", "Écrire le nombre total de parts au dénominateur."],
      ["Fraction", "Numérateur", "Dénominateur", "Unité", "Part égale"],
      "Le dénominateur est différent de zéro et les parts doivent être égales.",
      [{level:"Application",instruction:"Dans 5/8, donne le numérateur et le dénominateur.",correction:"Numérateur : 5 ; dénominateur : 8."}],
      [{question:"Que représente le dénominateur ?",answer:"Le nombre de parts égales qui composent l'unité.",explanation:"Le numérateur indique les parts considérées."}]
    ),
    "Angles": make(
      "Un angle est une figure formée par deux demi-droites de même origine ; cette origine est le sommet.",
      ["Identifier le sommet et les côtés d'un angle.", "Classer les angles usuels.", "Mesurer un angle au rapporteur."],
      ["Un angle aigu mesure moins de 90°.", "Un angle droit mesure exactement 90°.", "Un angle obtus mesure plus de 90° et moins de 180°.", "Un angle plat mesure 180°.", "Le rapporteur mesure les angles en degrés."],
      "Un angle de 35° est aigu ; un angle de 90° est droit ; un angle de 125° est obtus.",
      ["Placer le centre du rapporteur sur le sommet.", "Aligner la ligne zéro sur un côté.", "Lire la graduation coupée par l'autre côté.", "Pour construire, marquer la mesure puis tracer le second côté."],
      ["Sommet", "Côté", "Degré", "Rapporteur", "Aigu", "Droit", "Obtus"],
      "Toujours lire la graduation qui commence à zéro sur le côté de départ.",
      [{level:"Classement",instruction:"Classe 48°, 90° et 142°.",correction:"48° : aigu ; 90° : droit ; 142° : obtus."}],
      [{question:"Combien mesure un angle droit ?",answer:"90°.",explanation:"C'est la mesure de référence de l'angle droit."}]
    ),
    "Triangles": make(
      "Un triangle est un polygone qui possède trois côtés, trois sommets et trois angles.",
      ["Identifier les éléments d'un triangle.", "Reconnaître les triangles particuliers.", "Utiliser la somme des angles d'un triangle."],
      ["Un triangle équilatéral possède trois côtés de même longueur.", "Un triangle isocèle possède au moins deux côtés de même longueur.", "Un triangle rectangle possède un angle droit.", "La somme des mesures des trois angles d'un triangle est égale à 180°.", "La longueur d'un côté est toujours inférieure à la somme des longueurs des deux autres côtés."],
      "Si deux angles mesurent 50° et 60°, le troisième mesure 180° − 110° = 70°.",
      ["Tracer le côté de départ.", "Reporter les longueurs avec le compas ou construire les angles demandés.", "Relier les sommets.", "Vérifier les longueurs et les angles."],
      ["Sommet", "Côté", "Triangle équilatéral", "Triangle isocèle", "Triangle rectangle"],
      "La somme des angles d'un triangle vaut 180°.",
      [{level:"Calcul",instruction:"Deux angles d'un triangle mesurent 35° et 85°. Calcule le troisième.",correction:"180° − (35° + 85°) = 60°."}],
      [{question:"Combien de côtés possède un triangle ?",answer:"Trois.",explanation:"Un triangle est un polygone à trois côtés."}]
    ),
    "Proportionnalité": make(
      "Deux grandeurs sont proportionnelles lorsque les valeurs correspondantes sont obtenues en multipliant par un même coefficient.",
      ["Reconnaître une situation de proportionnalité.", "Utiliser un coefficient.", "Résoudre un problème de prix ou de quantité."],
      ["Dans un tableau de proportionnalité, on passe d'une ligne à l'autre en multipliant toujours par le même nombre.", "Ce nombre est le coefficient de proportionnalité.", "On peut multiplier ou diviser une colonne pour obtenir une autre colonne.", "Il faut vérifier que la situation est bien proportionnelle : un tarif avec frais fixes ne l'est pas toujours."],
      "Un cahier coûte 250 F CFA. Quatre cahiers identiques coûtent 4 × 250 = 1 000 F CFA.",
      ["Identifier les deux grandeurs.", "Vérifier qu'elles varient dans le même rapport.", "Déterminer le coefficient.", "Effectuer le calcul et écrire l'unité."],
      ["Grandeur", "Proportionnalité", "Coefficient", "Tableau"],
      "Le coefficient reste constant dans une situation de proportionnalité.",
      [{level:"Problème",instruction:"5 bouteilles coûtent 1 500 F CFA. Combien coûtent 2 bouteilles au même prix unitaire ?",correction:"Une bouteille coûte 1 500 ÷ 5 = 300 F. Deux coûtent 600 F CFA."}],
      [{question:"Dans une situation proportionnelle, le coefficient change-t-il ?",answer:"Non, il reste constant.",explanation:"C'est la propriété fondamentale de la proportionnalité."}]
    ),
    "Symétrie centrale": make(
      "Le symétrique A' d'un point A par rapport à un centre O est le point tel que O soit le milieu de [AA'].",
      ["Construire le symétrique d'un point.", "Utiliser l'alignement et l'égalité des distances.", "Reconnaître les propriétés conservées."],
      ["A, O et A' sont alignés.", "OA = OA' et O se trouve entre A et A'.", "La symétrie centrale conserve les longueurs, les angles, l'alignement et le parallélisme.", "Le symétrique d'une figure est obtenu en construisant l'image de chacun de ses points."],
      "Si OA = 3 cm, A' se place de l'autre côté de O, sur la droite (AO), à 3 cm de O.",
      ["Tracer la droite (AO).", "Mesurer OA.", "Reporter la même longueur de l'autre côté de O.", "Vérifier que O est le milieu de [AA']."],
      ["Centre", "Symétrique", "Image", "Milieu", "Alignement"],
      "Le centre de symétrie est le milieu du segment qui joint un point à son image.",
      [{level:"Construction",instruction:"Construis A', symétrique de A par rapport à O, avec OA = 2,5 cm.",correction:"Sur la droite (AO), place A' de l'autre côté de O à 2,5 cm. Ainsi O est le milieu de [AA']."}],
      [{question:"Quelle propriété caractérise le centre O ?",answer:"O est le milieu du segment [AA'].",explanation:"Les deux distances OA et OA' sont égales."}]
    ),
    "Parallélogramme": make(
      "Un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.",
      ["Reconnaître un parallélogramme.", "Utiliser les propriétés des côtés et des diagonales.", "Construire une figure simple."],
      ["Les côtés opposés sont parallèles et de même longueur.", "Les angles opposés sont égaux.", "Les diagonales se coupent en leur milieu.", "Le rectangle, le losange et le carré sont des parallélogrammes particuliers."],
      "Dans le parallélogramme ABCD, AB = CD et AD = BC.",
      ["Tracer deux côtés consécutifs.", "Construire par chaque extrémité la parallèle au côté opposé.", "Leur intersection donne le quatrième sommet.", "Vérifier le parallélisme."],
      ["Quadrilatère", "Côtés opposés", "Diagonale", "Parallèle"],
      "Les diagonales d'un parallélogramme se coupent en leur milieu.",
      [{level:"Propriété",instruction:"ABCD est un parallélogramme et AB = 6 cm. Quelle est la longueur de CD ?",correction:"CD = 6 cm, car les côtés opposés ont la même longueur."}],
      [{question:"Que peut-on dire des côtés opposés d'un parallélogramme ?",answer:"Ils sont parallèles deux à deux et de même longueur.",explanation:"Ce sont des propriétés essentielles du parallélogramme."}]
    ),
    "Statistiques": make(
      "Une étude statistique consiste à recueillir, organiser et analyser des données concernant une population.",
      ["Identifier population, individu et caractère.", "Lire un tableau d'effectifs.", "Calculer un effectif total et une fréquence simple."],
      ["La population est l'ensemble étudié ; chaque élément est un individu.", "Le caractère est la propriété observée : par exemple le moyen de transport utilisé par les élèves.", "L'effectif d'une valeur est le nombre de fois où elle apparaît.", "L'effectif total est la somme de tous les effectifs.", "La fréquence est le quotient d'un effectif par l'effectif total."],
      "Dans une classe de 40 élèves, 10 viennent à pied : la fréquence est 10/40 = 0,25, soit 25 %.",
      ["Définir la population et le caractère.", "Recueillir les données.", "Compter les réponses par catégorie.", "Présenter les effectifs dans un tableau.", "Vérifier que leur somme donne l'effectif total."],
      ["Population", "Individu", "Caractère", "Effectif", "Fréquence", "Tableau"],
      "La somme des effectifs de toutes les catégories est égale à l'effectif total.",
      [{level:"Calcul",instruction:"Sur 20 élèves, 8 pratiquent le football. Calcule la fréquence en pourcentage.",correction:"8 ÷ 20 = 0,4 ; 0,4 × 100 = 40 %."}],
      [{question:"Que représente l'effectif total ?",answer:"Le nombre total d'individus étudiés.",explanation:"On l'obtient en additionnant les effectifs."}]
    ),
    "Pavé droit et cylindre": make(
      "Le pavé droit et le cylindre droit sont des solides géométriques à trois dimensions.",
      ["Reconnaître les faces, arêtes et sommets d'un pavé droit.", "Identifier les bases d'un cylindre.", "Calculer le volume d'un pavé droit."],
      ["Un pavé droit possède six faces rectangulaires, douze arêtes et huit sommets.", "Un cube est un pavé droit dont toutes les arêtes ont la même longueur.", "Un cylindre droit possède deux bases circulaires parallèles et une surface latérale courbe.", "Le volume mesure l'espace occupé par un solide."],
      "Une boîte de 5 cm de long, 3 cm de large et 2 cm de haut a un volume de 5 × 3 × 2 = 30 cm³.",
      ["Identifier le solide.", "Mesurer ses dimensions.", "Pour un pavé droit, multiplier longueur × largeur × hauteur.", "Écrire le résultat en unités cubiques."],
      ["Solide", "Face", "Arête", "Sommet", "Base", "Volume", "Cylindre"],
      "Un pavé droit possède 6 faces, 12 arêtes et 8 sommets.",
      [{level:"Application",instruction:"Calcule le volume d'un pavé droit de 6 cm × 4 cm × 3 cm.",correction:"V = 6 × 4 × 3 = 72 cm³."}],
      [{question:"Combien de sommets possède un pavé droit ?",answer:"Huit.",explanation:"Il possède aussi six faces et douze arêtes."}]
    )
  };

  const F = {
    "Le dialogue oral": make(
      "Le dialogue est un échange oral entre au moins deux personnes qui prennent la parole à tour de rôle.",
      ["Demander et donner une information.", "Expliquer clairement une situation.", "Respecter les règles de l'échange."],
      ["Un dialogue comporte des interlocuteurs, un sujet et des tours de parole.", "Pour demander une information, on peut employer une phrase interrogative : « Où se trouve la bibliothèque ? »", "Pour répondre, on donne une information précise et adaptée à la question.", "La politesse, l'écoute et une voix audible facilitent la communication."],
      "A : Bonjour, s'il vous plaît, où se trouve le bureau du directeur ? B : Il est au rez-de-chaussée, à côté du secrétariat.",
      ["Identifier ce que l'on veut savoir.", "Formuler une question claire.", "Écouter la réponse sans interrompre.", "Reformuler si l'information n'est pas comprise."],
      ["Interlocuteur", "Émetteur", "Récepteur", "Question", "Réponse", "Tour de parole"],
      "Un bon dialogue est clair, poli et respecte l'alternance des prises de parole.",
      [{level:"Expression",instruction:"Écris un dialogue de quatre répliques dans lequel un élève demande son chemin à un surveillant.",correction:"Le dialogue doit comporter une salutation, une question précise, une réponse compréhensible et un remerciement."}],
      [{question:"Que faut-il respecter dans un dialogue ?",answer:"Les tours de parole, l'écoute et la politesse.",explanation:"Ces règles rendent l'échange compréhensible."}]
    ),
    "Les activités de communication orale": make(
      "La communication orale permet de transmettre et de comprendre un message par la parole et l'écoute.",
      ["Restituer un message entendu ou lu.", "Raconter un événement dans l'ordre.", "Lire à haute voix et participer à un débat."],
      ["Restituer consiste à reprendre les informations essentielles sans déformer le message.", "Un récit oral suit généralement un ordre chronologique : début, événements, fin.", "La lecture à haute voix exige une articulation correcte, un débit adapté et le respect de la ponctuation.", "Dans un débat, on exprime une opinion, on donne des raisons et on écoute les avis différents."],
      "Après avoir entendu une annonce scolaire, l'élève indique le lieu, la date, l'heure et l'objet de la réunion.",
      ["Repérer les informations essentielles.", "Organiser les idées dans un ordre logique.", "Parler assez fort et articuler.", "Justifier son opinion sans interrompre les autres."],
      ["Restitution", "Chronologie", "Articulation", "Débit", "Opinion", "Argument"],
      "Pour bien communiquer, il faut comprendre le message, organiser ses idées et s'exprimer clairement.",
      [{level:"Oral",instruction:"Raconte en une minute une activité vécue à l'école en respectant l'ordre des événements.",correction:"Le récit doit comporter une situation initiale, des événements ordonnés et une conclusion."}],
      [{question:"Que signifie restituer oralement un message ?",answer:"Redire les informations essentielles d'un message compris.",explanation:"Il ne faut ni inventer ni déformer les informations."}]
    ),
    "La lettre personnelle": make(
      "Une lettre personnelle est un écrit adressé à une personne connue ou à un destinataire avec lequel on entretient une relation individuelle.",
      ["Identifier les parties d'une lettre.", "Adapter le ton au destinataire.", "Rédiger une lettre organisée."],
      ["Une lettre comporte généralement le lieu et la date, la formule d'appel, le corps du texte, la formule de politesse et la signature.", "Le ton adressé à un ami peut être familier et chaleureux ; à une personne peu connue, il doit être plus respectueux et mesuré.", "Le corps de la lettre présente le motif, les informations et éventuellement les questions.", "Les paragraphes facilitent la lecture."],
      "« Abobo, le 12 octobre 2026. Cher Koffi, je t'écris pour te raconter ma rentrée… »",
      ["Identifier le destinataire et le but.", "Choisir une formule d'appel adaptée.", "Organiser les idées en paragraphes.", "Terminer par une formule de politesse et signer."],
      ["Destinataire", "Expéditeur", "Formule d'appel", "Corps de la lettre", "Politesse", "Signature"],
      "La présentation et le ton d'une lettre dépendent du destinataire.",
      [{level:"Rédaction",instruction:"Écris une lettre à un ami pour lui raconter ta rentrée en 6e.",correction:"La lettre doit comporter lieu et date, formule d'appel, récit organisé, formule de fin et signature."}],
      [{question:"Quelles sont deux parties essentielles du corps d'une lettre ?",answer:"Le motif de la lettre et les informations développées.",explanation:"Le corps transmet le message au destinataire."}]
    ),
    "Le récit": make(
      "Un récit est un texte qui rapporte des événements réels ou imaginaires organisés dans le temps.",
      ["Identifier les étapes d'un récit.", "Employer des connecteurs temporels.", "Rédiger un récit cohérent."],
      ["La situation initiale présente les personnages, le lieu et le moment.", "Un élément déclencheur introduit un changement ou un problème.", "Les péripéties racontent les actions et les difficultés.", "La situation finale montre comment l'histoire se termine.", "Les temps verbaux et les connecteurs organisent la chronologie."],
      "Un élève arrive en retard à l'école, explique l'incident, trouve une solution et rejoint sa classe.",
      ["Définir les personnages et le cadre.", "Prévoir les événements dans l'ordre.", "Utiliser des connecteurs comme d'abord, ensuite, puis, enfin.", "Relire pour vérifier la cohérence des temps et des pronoms."],
      ["Narrateur", "Personnage", "Situation initiale", "Péripétie", "Dénouement", "Chronologie"],
      "Un récit doit présenter des événements enchaînés de façon compréhensible.",
      [{level:"Rédaction",instruction:"Raconte une journée où tu as aidé une personne de ton quartier.",correction:"Le texte doit situer l'événement, présenter les actions dans l'ordre et donner une fin."}],
      [{question:"Quel est le rôle de la situation initiale ?",answer:"Présenter le cadre et la situation avant les événements.",explanation:"Elle aide le lecteur à comprendre le début de l'histoire."}]
    ),
    "La description": make(
      "La description est un texte qui présente les caractéristiques d'une personne, d'un objet, d'un animal ou d'un lieu.",
      ["Observer précisément ce qui est décrit.", "Organiser les détails.", "Employer des adjectifs et des indications spatiales."],
      ["Une description d'objet peut présenter la forme, la matière, la couleur, la taille et l'usage.", "La description d'un lieu peut suivre un parcours : de l'entrée vers le fond, de gauche à droite ou du premier plan vers l'arrière-plan.", "Les adjectifs qualificatifs précisent les noms.", "Les comparaisons rendent l'image plus précise."],
      "La salle est vaste, lumineuse et propre ; de grandes fenêtres donnent sur la cour.",
      ["Observer avant d'écrire.", "Classer les détails par ordre logique.", "Choisir des mots précis.", "Éviter les répétitions et relire les accords."],
      ["Description", "Adjectif qualificatif", "Comparaison", "Champ lexical", "Indication spatiale"],
      "Une bonne description sélectionne des détails précis et les organise.",
      [{level:"Rédaction",instruction:"Décris la cour de ton établissement en huit à dix lignes.",correction:"La description doit présenter l'organisation du lieu, les éléments visibles et des adjectifs précis."}],
      [{question:"À quoi sert l'adjectif qualificatif dans une description ?",answer:"À préciser une caractéristique du nom.",explanation:"Il aide le lecteur à se représenter ce qui est décrit."}]
    ),
    "Lecture méthodique": make(
      "La lecture méthodique est une démarche qui permet de comprendre un texte en observant son organisation, son vocabulaire et ses procédés.",
      ["Identifier le type et le thème du texte.", "Repérer les indices importants.", "Justifier une interprétation par le texte."],
      ["On commence par lire le texte entièrement pour en saisir le sens général.", "Le titre, la source, les paragraphes et les mots répétés donnent des indices.", "On repère les personnages, le cadre, les actions ou les caractéristiques selon le type de texte.", "Une réponse de compréhension doit s'appuyer sur un indice précis du texte."],
      "Dans un récit, relever les verbes d'action et les connecteurs temporels aide à reconstituer l'ordre des événements.",
      ["Lire le paratexte.", "Faire une première lecture globale.", "Relire en soulignant les indices.", "Répondre avec une phrase complète et une justification."],
      ["Paratexte", "Thème", "Indice", "Narration", "Description", "Justification"],
      "Une interprétation doit être appuyée par des éléments réellement présents dans le texte.",
      [{level:"Compréhension",instruction:"Après lecture d'un court récit, relève le personnage principal, le lieu et deux actions.",correction:"Les réponses doivent être retrouvées dans le texte et formulées avec précision."}],
      [{question:"Pourquoi faut-il justifier une réponse par le texte ?",answer:"Pour montrer que l'interprétation repose sur des indices vérifiables.",explanation:"La lecture méthodique ne consiste pas à deviner."}]
    ),
    "Lecture suivie": make(
      "La lecture suivie consiste à lire progressivement une œuvre intégrale afin d'en comprendre l'histoire, les personnages et les thèmes.",
      ["Présenter une œuvre et son auteur.", "Suivre l'évolution des personnages et des événements.", "Formuler un bilan de lecture."],
      ["Avant la lecture, on observe le titre, le nom de l'auteur, l'éditeur et éventuellement l'illustration.", "Pendant la lecture, on note les personnages, les lieux, les événements importants et les mots inconnus.", "On distingue les faits racontés des opinions personnelles du lecteur.", "Le bilan présente l'intrigue, les personnages, les thèmes et une appréciation argumentée."],
      "Un carnet de lecture peut comporter une fiche par étape : résumé, personnages rencontrés, événement marquant et question à éclaircir.",
      ["Présenter les références de l'œuvre.", "Lire régulièrement les passages demandés.", "Noter les événements essentiels.", "Rédiger un résumé fidèle et un avis justifié."],
      ["Auteur", "Œuvre intégrale", "Intrigue", "Personnage", "Résumé", "Thème"],
      "Un bon bilan de lecture distingue le résumé de l'œuvre et l'avis personnel argumenté.",
      [{level:"Lecture",instruction:"Rédige une fiche de lecture avec le titre, l'auteur, les personnages principaux et un résumé du passage lu.",correction:"La fiche doit reprendre des informations exactes de l'œuvre et un résumé fidèle, sans inventer d'événements."}],
      [{question:"Quelle différence existe entre résumé et avis personnel ?",answer:"Le résumé rapporte les faits de l'œuvre ; l'avis exprime un jugement justifié du lecteur.",explanation:"Il faut distinguer l'histoire et son appréciation."}]
    ),
    "La phrase": make(
      "Une phrase est un ensemble de mots organisé qui exprime un sens complet ; à l'écrit, elle commence par une majuscule et se termine par une ponctuation forte.",
      ["Reconnaître une phrase et ses constituants.", "Distinguer les types de phrases.", "Identifier les formes affirmative et négative."],
      ["La phrase verbale contient un verbe conjugué ; la phrase non verbale n'en contient pas.", "Les quatre types sont déclaratif, interrogatif, impératif et exclamatif.", "La forme affirmative présente une information ; la forme négative la nie, souvent avec ne… pas.", "La ponctuation aide à reconnaître l'intention : point, point d'interrogation ou point d'exclamation."],
      "« Les élèves travaillent. » est déclarative ; « Travaillez-vous ? » est interrogative ; « Fermez la porte ! » peut être impérative.",
      ["Repérer le verbe conjugué.", "Identifier l'intention de communication.", "Observer la ponctuation.", "Pour mettre à la forme négative, encadrer le verbe avec les marques adaptées."],
      ["Phrase verbale", "Phrase non verbale", "Déclaratif", "Interrogatif", "Impératif", "Exclamatif", "Négation"],
      "Le type indique l'intention de communication ; la forme indique notamment l'affirmation ou la négation.",
      [{level:"Transformation",instruction:"Mets « Les enfants jouent dans la cour » à la forme négative.",correction:"Les enfants ne jouent pas dans la cour."}],
      [{question:"Quel type de phrase se termine normalement par un point d'interrogation ?",answer:"La phrase interrogative.",explanation:"Elle sert à poser une question."}]
    ),
    "Le groupe nominal": make(
      "Le groupe nominal est un groupe de mots organisé autour d'un nom noyau, généralement accompagné d'un déterminant et parfois d'expansions.",
      ["Repérer le nom noyau et le déterminant.", "Identifier les expansions du nom.", "Employer correctement les déterminants."],
      ["Le déterminant introduit le nom : le, une, des, ce, ma…", "L'adjectif qualificatif peut préciser le nom : une grande maison.", "Un complément du nom complète le nom, souvent avec une préposition : une boîte en carton.", "Une proposition relative peut également apporter une précision : le livre que tu lis."],
      "Dans « les grandes maisons du quartier », le nom noyau est « maisons », le déterminant est « les », l'adjectif est « grandes » et « du quartier » complète le nom.",
      ["Repérer le nom principal.", "Chercher le déterminant.", "Identifier les mots qui apportent une précision.", "Vérifier les accords en genre et en nombre."],
      ["Groupe nominal", "Nom noyau", "Déterminant", "Expansion", "Adjectif", "Complément du nom"],
      "Le nom noyau commande les accords dans le groupe nominal.",
      [{level:"Analyse",instruction:"Dans « ces trois petits cahiers neufs », identifie le nom noyau et deux expansions.",correction:"Nom noyau : cahiers. Expansions : trois, petits et neufs (déterminant : ces)."}],
      [{question:"Quel élément est indispensable au groupe nominal ?",answer:"Le nom noyau.",explanation:"Les autres éléments se construisent autour de lui."}]
    ),
    "Discours direct": make(
      "Le discours direct rapporte les paroles telles qu'elles sont prononcées, tandis que le discours indirect les intègre dans le récit.",
      ["Reconnaître les marques du discours direct.", "Distinguer discours direct et indirect.", "Transformer une phrase simple."],
      ["Le discours direct utilise souvent des guillemets, des tirets et un verbe de parole.", "Le discours indirect dépend d'un verbe comme dire, demander ou répondre.", "Lors du passage au discours indirect, les pronoms et parfois les temps ou les indications de lieu et de temps peuvent changer selon le contexte."],
      "Direct : Awa dit : « Je viens demain. » Indirect : Awa dit qu'elle vient le lendemain (selon le contexte).",
      ["Repérer les paroles rapportées.", "Identifier le verbe introducteur.", "Supprimer les marques typographiques du dialogue si nécessaire.", "Adapter les pronoms et les repères temporels."],
      ["Discours direct", "Discours indirect", "Verbe introducteur", "Guillemets", "Tiret"],
      "Le discours direct conserve les paroles ; le discours indirect les rapporte dans la phrase du narrateur.",
      [{level:"Transformation",instruction:"Transforme au discours indirect : Koffi dit : « Je suis prêt. »",correction:"Koffi dit qu'il est prêt."}],
      [{question:"Quelle ponctuation marque souvent le discours direct ?",answer:"Les guillemets et les tirets de dialogue.",explanation:"Ils signalent les paroles prononcées."}]
    ),
    "Le verbe": make(
      "Le verbe est un mot qui exprime généralement une action ou un état et qui se conjugue selon la personne, le nombre, le temps et le mode.",
      ["Identifier le verbe et son infinitif.", "Conjuguer des verbes usuels aux temps étudiés.", "Choisir un temps adapté au récit."],
      ["Le verbe varie selon le sujet : je parle, nous parlons.", "Le présent peut exprimer une action actuelle, une habitude ou une vérité générale.", "Le futur simple présente une action à venir : je parlerai.", "L'imparfait sert souvent à décrire ou à exprimer une habitude passée ; le passé composé présente un fait passé achevé.", "Le passé simple est surtout employé dans les récits écrits."],
      "Chaque matin, Aïcha prend le bus (habitude). Hier, elle a pris le bus (fait passé achevé). Demain, elle prendra le bus (avenir).",
      ["Trouver le sujet.", "Identifier l'infinitif du verbe.", "Choisir le temps selon le sens.", "Accorder le verbe avec son sujet."],
      ["Infinitif", "Conjugaison", "Sujet", "Présent", "Futur simple", "Imparfait", "Passé composé", "Passé simple"],
      "Le verbe s'accorde avec son sujet ; le temps choisi dépend du sens à exprimer.",
      [{level:"Conjugaison",instruction:"Conjugue « finir » au présent à la première personne du pluriel.",correction:"Nous finissons."}],
      [{question:"Quel temps exprime souvent une habitude dans le passé ?",answer:"L'imparfait.",explanation:"Il sert notamment à présenter des actions habituelles ou des descriptions passées."}]
    ),
    "Le groupe verbal": make(
      "Le groupe verbal est le groupe organisé autour du verbe ; il peut comprendre des compléments essentiels ou des éléments qui précisent l'action.",
      ["Repérer le verbe noyau.", "Identifier les éléments qui complètent le verbe.", "Construire une phrase correcte."],
      ["Le verbe constitue le noyau du groupe verbal.", "Certains verbes sont suivis d'un complément : Awa lit un livre.", "Avec l'auxiliaire être, certains temps composés se forment avec être suivi du participe passé.", "Le participe passé employé avec être s'accorde généralement avec le sujet."],
      "Dans « Les élèves sont arrivés », le groupe verbal est « sont arrivés » ; le participe passé s'accorde avec « élèves ».",
      ["Repérer le sujet.", "Repérer le verbe conjugué.", "Délimiter les compléments du verbe.", "Vérifier l'accord du participe passé selon l'auxiliaire."],
      ["Groupe verbal", "Verbe noyau", "Complément", "Auxiliaire", "Participe passé"],
      "Le verbe est le noyau du groupe verbal ; l'accord dépend de la construction verbale.",
      [{level:"Analyse",instruction:"Dans « Les filles sont parties tôt », relève le groupe verbal et explique l'accord.",correction:"Groupe verbal : sont parties. « Parties » s'accorde au féminin pluriel avec le sujet « les filles »."}],
      [{question:"Quel auxiliaire apparaît dans « ils sont venus » ?",answer:"L'auxiliaire être.",explanation:"Le verbe venir se conjugue ici avec être."}]
    ),
    "Les adverbes": make(
      "Un adverbe est un mot invariable qui précise le sens d'un verbe, d'un adjectif ou d'un autre adverbe.",
      ["Reconnaître des adverbes de lieu et de temps.", "Comprendre leur rôle dans la phrase.", "Employer des adverbes adaptés."],
      ["Les adverbes de lieu indiquent où se déroule l'action : ici, là, ailleurs, partout.", "Les adverbes de temps indiquent quand ou à quelle fréquence : aujourd'hui, demain, souvent, toujours.", "L'adverbe est invariable : il ne prend ni marque de féminin ni marque de pluriel."],
      "« Demain, nous irons là-bas » : demain indique le temps et là-bas indique le lieu.",
      ["Repérer le mot qui précise l'action.", "Poser la question où ? pour le lieu et quand ? pour le temps.", "Vérifier que le mot ne varie pas."],
      ["Adverbe", "Invariable", "Lieu", "Temps", "Fréquence"],
      "L'adverbe précise le sens et reste invariable.",
      [{level:"Identification",instruction:"Dans « Les enfants jouent dehors aujourd'hui », relève les adverbes et leur rôle.",correction:"Dehors indique le lieu ; aujourd'hui indique le temps."}],
      [{question:"L'adverbe s'accorde-t-il en genre et en nombre ?",answer:"Non, il est invariable.",explanation:"Sa forme ne change pas selon le nom."}]
    ),
    "Orthographe": make(
      "L'orthographe lexicale concerne l'écriture correcte des mots ; l'orthographe grammaticale concerne notamment les accords et les formes imposées par la grammaire.",
      ["Distinguer homophones et mots de même famille.", "Employer correctement les accents et l'élision.", "Accorder le verbe et le participe passé dans les cas étudiés."],
      ["Les homophones se prononcent de la même façon mais n'ont pas le même sens ni la même fonction : ce/se, la/là, quel/qu'elle.", "L'élision remplace une voyelle finale par une apostrophe devant une voyelle ou un h muet : l'école, j'arrive.", "Le verbe s'accorde avec son sujet.", "Avec l'auxiliaire être, le participe passé s'accorde généralement avec le sujet ; avec avoir, la règle dépend notamment de la place du complément d'objet direct."],
      "« Ce cahier se trouve là. » : ce accompagne le nom, se est un pronom, là indique le lieu.",
      ["Lire la phrase entière pour comprendre le sens.", "Remplacer le mot par une expression-test lorsque c'est possible.", "Repérer le sujet avant d'accorder le verbe.", "Identifier l'auxiliaire et la construction du participe passé."],
      ["Homophone", "Élision", "Apostrophe", "Accord", "Sujet", "Participe passé"],
      "Pour choisir entre des homophones, il faut analyser leur fonction dans la phrase.",
      [{level:"Choix",instruction:"Complète : « ___ matin, Awa ___ prépare et pose son sac ___ ». (Ce / se / là)",correction:"« Ce matin, Awa se prépare et pose son sac là. »"}],
      [{question:"Quel outil permet de choisir entre des homophones ?",answer:"L'analyse du sens et de la fonction grammaticale dans la phrase.",explanation:"La prononciation seule ne suffit pas."}]
    )
  };

  const A = {
    "At School": make(
      "The school is a place where pupils learn, meet teachers and take part in educational activities.",
      ["Name common school places and objects.", "Introduce oneself and ask simple questions.", "Use basic classroom expressions."],
      ["Useful words: school, classroom, teacher, pupil, desk, chair, board, book, pen, ruler, bag.", "Useful expressions: Good morning. My name is… I am in class 6. May I come in? May I borrow a pen, please?", "Use a/an before a singular countable noun: a book, an eraser. Use the plural -s for regular plural nouns: books, desks.", "A simple question can use Where is…? or What is…?"],
      "A: What is this? B: It is a ruler. A: Where is your classroom? B: It is next to the library.",
      ["Listen to the question.", "Identify the key word.", "Answer with a complete short sentence.", "Practise pronunciation and polite expressions."],
      ["Classroom", "Teacher", "Pupil", "Board", "Notebook", "Ruler", "Please", "Thank you"],
      "Learn the names of school objects and use polite classroom expressions.",
      [{level:"Vocabulary",instruction:"Translate into English: tableau, cahier, professeur, règle.",correction:"Board, notebook, teacher, ruler."}],
      [{question:"How do you ask for permission politely?",answer:"May I… please?",explanation:"It is a polite way to ask permission."}]
    ),
    "At Home": make(
      "A home is the place where a person or family lives; it contains rooms, furniture and household objects.",
      ["Name rooms and objects in a house.", "Describe a home with simple sentences.", "Use there is and there are."],
      ["Rooms: bedroom, kitchen, bathroom, living room, dining room.", "Objects: bed, table, chair, door, window, television.", "Use there is with a singular noun: There is a table. Use there are with plural nouns: There are two chairs.", "Prepositions of place include in, on, under, next to and behind."],
      "There is a bed in my bedroom. There are two chairs next to the table.",
      ["Name the room.", "Identify the object.", "Choose there is or there are.", "Add a preposition to explain the position."],
      ["House", "Bedroom", "Kitchen", "Living room", "Furniture", "There is", "There are", "Under"],
      "There is is used with a singular noun; there are is used with plural nouns.",
      [{level:"Grammar",instruction:"Complete: There ___ a chair and there ___ three books.",correction:"There is a chair and there are three books."}],
      [{question:"Which expression is correct with three windows?",answer:"There are three windows.",explanation:"There are is used with plural nouns."}]
    ),
    "Time and Date": make(
      "Time and date expressions allow us to say when an event happens.",
      ["Ask and tell the time.", "Name days and months.", "Write a simple date."],
      ["The days are Monday, Tuesday, Wednesday, Thursday, Friday, Saturday and Sunday.", "The months begin with January and end with December.", "To ask the time, say What time is it? A basic answer is It is seven o'clock.", "Use at with clock times: at 7 o'clock; use on with days: on Monday."],
      "My English lesson is on Tuesday at 8 o'clock.",
      ["Learn the days and months in order.", "Read the hour on the clock.", "Use o'clock for an exact hour.", "Write the day and date clearly."],
      ["Time", "Date", "Day", "Month", "Today", "Tomorrow", "O'clock"],
      "Use at for a clock time and on for a day.",
      [{level:"Application",instruction:"Write in English: Le cours commence lundi à 9 heures.",correction:"The lesson starts on Monday at 9 o'clock."}],
      [{question:"Which preposition is used before Monday?",answer:"On.",explanation:"We say on Monday."}]
    ),
    "Jobs and Occupations": make(
      "A job or occupation is an activity that a person does as work.",
      ["Name common occupations.", "Ask and answer about a person's job.", "Use the simple present with he and she."],
      ["Examples: teacher, nurse, doctor, farmer, driver, shopkeeper, police officer.", "Ask: What is your father's job? or What does she do?", "Answer: He is a farmer. She is a nurse.", "With he, she or it in the simple present, many verbs take -s: He works; she teaches."],
      "A: What does your mother do? B: She is a nurse. She works at a hospital.",
      ["Identify the person.", "Choose the correct occupation word.", "Use he or she.", "Check the verb ending in the simple present."],
      ["Job", "Occupation", "Teacher", "Nurse", "Farmer", "Driver", "Hospital", "Farm"],
      "Use He is / She is to name an occupation; remember the -s ending in many present-tense verbs.",
      [{level:"Vocabulary",instruction:"Translate : infirmier, agriculteur, chauffeur.",correction:"Nurse, farmer, driver."}],
      [{question:"Complete: She ___ a teacher.",answer:"She is a teacher.",explanation:"The verb be is is used with she."}]
    ),
    "Clothes and Colours": make(
      "Clothes are garments worn on the body; colours describe their appearance.",
      ["Name common clothes and colours.", "Describe what someone is wearing.", "Use this/these and basic adjectives."],
      ["Clothes: shirt, dress, skirt, trousers, shoes, socks, hat, T-shirt.", "Colours: red, blue, green, yellow, black, white, brown, orange.", "Use What are you wearing? — I am wearing a blue shirt.", "Adjectives of colour usually come before the noun: a red bag."],
      "Koffi is wearing a white shirt and black trousers.",
      ["Identify the item of clothing.", "Choose the colour.", "Place the colour before the noun.", "Use am/is/are wearing according to the subject."],
      ["Shirt", "Dress", "Trousers", "Shoes", "Colour", "Red", "Blue", "White"],
      "In English, the colour adjective usually comes before the noun.",
      [{level:"Description",instruction:"Describe in English a person wearing a green shirt and black shoes.",correction:"He/She is wearing a green shirt and black shoes."}],
      [{question:"Where does the colour adjective go in « a blue bag »?",answer:"Before the noun.",explanation:"English colour adjectives usually precede the noun."}]
    ),
    "Food and Drinks": make(
      "Food and drinks are what people eat and drink to nourish the body.",
      ["Name common foods and drinks.", "Express likes and dislikes.", "Use some and any in simple sentences."],
      ["Food: rice, fish, meat, bread, cassava, plantain, vegetables, fruit.", "Drinks: water, milk, juice.", "Use I like… to express a preference and I don't like… to express a dislike.", "Use some in many affirmative sentences and any in many negative or question forms: There is some rice. Is there any water?"],
      "I like attiéké and fish. I drink water every day.",
      ["Identify the food or drink.", "Use a countable or uncountable expression correctly.", "Form a sentence with like or don't like.", "Use polite language when offering food."],
      ["Food", "Drink", "Rice", "Fish", "Fruit", "Vegetables", "Water", "Like"],
      "Use I like / I don't like to express preferences.",
      [{level:"Vocabulary",instruction:"Give the English words for riz, poisson, eau and banane plantain.",correction:"Rice, fish, water, plantain."}],
      [{question:"How do you express a dislike?",answer:"I don't like…",explanation:"The negative auxiliary don't is used with I."}]
    ),
    "Health and Environment": make(
      "Health is a state of physical and mental well-being; the environment is the surroundings in which people live.",
      ["Name simple health and environment vocabulary.", "Give basic advice.", "Use must and mustn't for rules."],
      ["Health words: clean, healthy, sick, water, food, exercise, handwashing.", "Environment words: tree, river, rubbish, pollution, clean air.", "Use must to express an obligation: You must wash your hands.", "Use mustn't to express prohibition: You mustn't throw rubbish into the river.", "Simple advice can use should: You should drink clean water."],
      "We must keep our classroom clean. We mustn't throw plastic bags into the drain.",
      ["Identify the health or environmental problem.", "Choose a suitable rule or advice.", "Use must, mustn't or should.", "Explain how the action protects people or nature."],
      ["Health", "Environment", "Pollution", "Clean", "Rubbish", "Must", "Mustn't", "Should"],
      "Must expresses obligation; mustn't expresses prohibition; should gives advice.",
      [{level:"Application",instruction:"Give two rules to keep your school clean in English.",correction:"We must put rubbish in the bin. We mustn't throw plastic bags on the ground."}],
      [{question:"Which modal expresses a prohibition?",answer:"Mustn't.",explanation:"Mustn't means that an action is not allowed."}]
    )
  };

  const H = {
    "L’histoire et son objet": make(
      "L'histoire est une discipline qui étudie les sociétés humaines du passé à partir de traces et de documents.",
      ["Définir l'histoire.", "Expliquer pourquoi on étudie le passé.", "Distinguer passé et présent."],
      ["L'histoire cherche à comprendre les événements, les modes de vie et les changements des sociétés.", "L'historien ne raconte pas au hasard : il pose des questions et confronte des sources.", "L'étude du passé aide à comprendre l'origine de certaines réalités actuelles et à préserver la mémoire collective."],
      "L'étude des anciens villages, des outils et des traditions permet de mieux comprendre la vie des populations ivoiriennes autrefois.",
      ["Poser une question sur le passé.", "Rechercher des traces.", "Comparer les informations.", "Présenter une explication appuyée sur les sources."],
      ["Histoire", "Passé", "Présent", "Historien", "Société", "Événement"],
      "L'histoire étudie le passé des sociétés à partir de traces vérifiables.",
      [{level:"Compréhension",instruction:"Explique en deux phrases l'objet de l'histoire.",correction:"L'histoire étudie les sociétés humaines du passé et leurs transformations à partir de documents et de traces."}],
      [{question:"Sur quoi l'historien fonde-t-il son travail ?",answer:"Sur l'étude critique de sources et de traces du passé.",explanation:"Il confronte les informations au lieu de se fier à une seule affirmation."}]
    ),
    "Les sources de l’histoire": make(
      "Une source historique est une trace ou un document qui fournit des informations sur le passé.",
      ["Identifier différentes sources historiques.", "Classer des sources.", "Comprendre leur intérêt et leurs limites."],
      ["Les sources écrites comprennent lettres, archives, journaux et inscriptions.", "Les sources orales comprennent témoignages, récits et traditions transmis par la parole.", "Les sources matérielles comprennent outils, poteries, bâtiments, monnaies et ossements.", "Une source doit être située, identifiée et comparée à d'autres pour éviter les erreurs."],
      "Un ancien outil retrouvé lors d'une fouille est une source matérielle ; le témoignage d'un ancien est une source orale.",
      ["Identifier la nature de la source.", "Relever son auteur ou son origine si possible.", "Déterminer ce qu'elle permet de connaître.", "La comparer à d'autres sources."],
      ["Source", "Archive", "Témoignage", "Vestige", "Fouille", "Document"],
      "Les sources peuvent être écrites, orales ou matérielles ; leur confrontation renforce l'analyse.",
      [{level:"Classement",instruction:"Classe une lettre ancienne, un témoignage oral et une poterie.",correction:"Lettre : source écrite ; témoignage : source orale ; poterie : source matérielle."}],
      [{question:"Pourquoi comparer plusieurs sources ?",answer:"Pour vérifier les informations et réduire les erreurs d'interprétation.",explanation:"Une source isolée peut être incomplète ou partiale."}]
    ),
    "La chronologie": make(
      "La chronologie est l'organisation des faits et des événements selon leur ordre dans le temps.",
      ["Ordonner des événements.", "Utiliser dates et unités de temps.", "Lire un axe chronologique simple."],
      ["Une date situe un événement dans le temps.", "Les années, décennies, siècles et millénaires sont des unités de durée.", "Sur un axe chronologique, les événements sont placés de gauche à droite du plus ancien au plus récent.", "Pour calculer une durée entre deux dates de la même ère, on peut soustraire la date la plus ancienne de la plus récente."],
      "Un événement de 2000 est antérieur à un événement de 2020 ; il faut le placer à gauche sur l'axe.",
      ["Repérer les dates.", "Les ranger dans l'ordre croissant.", "Choisir une échelle régulière.", "Placer et légender les événements."],
      ["Chronologie", "Date", "Durée", "Décennie", "Siècle", "Millénaire", "Axe"],
      "Sur un axe chronologique, le temps avance de gauche à droite.",
      [{level:"Application",instruction:"Range 1960, 2000 et 1990 du plus ancien au plus récent.",correction:"1960, 1990, 2000."}],
      [{question:"Dans quel sens avance le temps sur un axe chronologique habituel ?",answer:"De gauche à droite.",explanation:"Les dates les plus anciennes sont placées à gauche."}]
    ),
    "Les grandes périodes": make(
      "Les grandes périodes de l'histoire sont des repères utilisés pour organiser l'étude du passé.",
      ["Nommer les grandes périodes historiques.", "Situer les ruptures conventionnelles.", "Comprendre que les changements sont progressifs."],
      ["On distingue généralement la Préhistoire, l'Antiquité, le Moyen Âge, les Temps modernes et l'Époque contemporaine.", "La Préhistoire précède l'apparition de l'écriture dans les sociétés considérées.", "Les dates de début et de fin des périodes sont des conventions historiques ; les changements ne se produisent pas partout au même moment.", "Pour l'histoire de l'Afrique et de la Côte d'Ivoire, les repères doivent tenir compte des réalités locales et des sources disponibles."],
      "L'apparition de l'écriture sert de repère traditionnel entre Préhistoire et Histoire, mais elle ne marque pas la même date dans toutes les régions.",
      ["Apprendre les périodes dans l'ordre.", "Associer les repères étudiés à chaque période.", "Éviter de confondre une date conventionnelle avec un changement instantané."],
      ["Préhistoire", "Antiquité", "Moyen Âge", "Temps modernes", "Époque contemporaine", "Périodisation"],
      "La périodisation est un outil pour organiser le temps historique, pas une frontière identique partout.",
      [{level:"Repérage",instruction:"Cite les grandes périodes de l'histoire dans l'ordre.",correction:"Préhistoire, Antiquité, Moyen Âge, Temps modernes, Époque contemporaine."}],
      [{question:"Pourquoi les périodes historiques sont-elles des repères conventionnels ?",answer:"Parce que les transformations sont progressives et ne se produisent pas au même moment partout.",explanation:"Les sociétés ont des trajectoires historiques différentes."}]
    ),
    "Paléolithique": make(
      "Le Paléolithique est la période ancienne de la Préhistoire caractérisée notamment par des outils de pierre taillée et des modes de vie fondés sur la chasse, la pêche et la collecte.",
      ["Décrire des modes de vie paléolithiques.", "Reconnaître des outils et vestiges.", "Situer les traces du Paléolithique en Côte d'Ivoire."],
      ["Les groupes humains vivaient souvent de chasse, de pêche et de cueillette.", "Ils utilisaient des outils fabriqués à partir de pierre taillée, de bois et d'os.", "Les déplacements répondaient notamment à la recherche de nourriture et de ressources.", "Les vestiges archéologiques permettent de reconstituer certains aspects de la vie ancienne, mais ils ne livrent pas toutes les informations."],
      "Un outil de pierre taillée retrouvé dans une région de Côte d'Ivoire peut renseigner sur les techniques et les activités des populations anciennes.",
      ["Observer le vestige.", "Décrire la matière et la forme.", "Proposer une fonction prudente.", "Relier l'objet à son contexte archéologique."],
      ["Paléolithique", "Préhistoire", "Pierre taillée", "Chasse", "Cueillette", "Vestige"],
      "Le Paléolithique est associé à la pierre taillée et à des économies de prédation.",
      [{level:"Étude de document",instruction:"Cite deux activités pratiquées par les groupes humains du Paléolithique.",correction:"La chasse, la pêche et la cueillette sont des activités possibles."}],
      [{question:"Quelle technique de fabrication d'outils caractérise le Paléolithique ?",answer:"La taille de la pierre.",explanation:"Les outils en pierre taillée sont des indices importants de cette période."}]
    ),
    "Néolithique": make(
      "Le Néolithique est une période marquée par des transformations des modes de vie, notamment le développement de l'agriculture, de l'élevage et de la sédentarisation.",
      ["Expliquer les transformations du Néolithique.", "Identifier des indices de production agricole.", "Relier ces transformations à la vie des communautés en Côte d'Ivoire."],
      ["La maîtrise de certaines productions végétales et animales permet de produire une partie de la nourriture.", "La sédentarisation favorise l'installation durable de communautés dans des lieux.", "Les outils polis, les poteries et les traces d'habitat peuvent renseigner sur ces transformations.", "Ces évolutions ne se déroulent pas partout au même rythme."],
      "La culture de plantes et la conservation des récoltes peuvent favoriser des installations plus durables.",
      ["Repérer les indices matériels.", "Comparer les activités de chasse-cueillette et de production.", "Expliquer les conséquences sur l'habitat et l'organisation sociale."],
      ["Néolithique", "Agriculture", "Élevage", "Sédentarisation", "Polissage", "Poterie"],
      "Le Néolithique correspond à d'importantes transformations des modes de production et d'habitat.",
      [{level:"Comparaison",instruction:"Donne deux différences entre les modes de vie paléolithique et néolithique.",correction:"Le Paléolithique est surtout associé à la chasse-cueillette et à la mobilité ; le Néolithique voit se développer agriculture, élevage et sédentarisation."}],
      [{question:"Que signifie sédentarisation ?",answer:"L'installation durable d'une communauté dans un lieu.",explanation:"Elle s'oppose à une mobilité fréquente."}]
    ),
    "Métallurgie du fer": make(
      "La métallurgie du fer regroupe les techniques d'extraction, de transformation et de travail du fer pour fabriquer des objets.",
      ["Décrire les grandes étapes de la production du fer.", "Identifier les traces d'une activité métallurgique.", "Expliquer l'importance du fer dans les sociétés anciennes ivoiriennes."],
      ["Le minerai de fer est une matière première contenant du fer.", "La réduction du minerai dans un four adapté permet d'obtenir une masse de fer qui sera ensuite travaillée par forgeage.", "Les scories, les fragments de four et les objets en fer sont des vestiges qui témoignent de cette activité.", "Les outils en fer ont pu transformer certaines activités agricoles, artisanales et guerrières."],
      "Une houe en fer facilite certains travaux du sol par rapport à un outil moins résistant.",
      ["Identifier le minerai et les vestiges.", "Présenter les étapes : réduction, récupération et forgeage.", "Relier les objets fabriqués aux activités humaines."],
      ["Minerai", "Réduction", "Four", "Scorie", "Forgeage", "Métallurgie"],
      "La métallurgie transforme un minerai en métal utilisable grâce à des techniques spécialisées.",
      [{level:"Compréhension",instruction:"Cite deux vestiges qui peuvent révéler une ancienne activité métallurgique.",correction:"Des scories, des fragments de four ou des objets en fer."}],
      [{question:"À quoi sert le forgeage ?",answer:"À façonner le métal chauffé pour fabriquer des objets.",explanation:"Le métal est travaillé pour lui donner une forme utile."}]
    ),
    "Géographie et son objet": make(
      "La géographie étudie l'organisation de l'espace terrestre et les relations entre les sociétés humaines et leur environnement.",
      ["Définir la géographie.", "Identifier les éléments d'un espace.", "Décrire un milieu proche."],
      ["La géographie observe les paysages, les populations, les activités et les aménagements.", "Elle étudie les relations entre les êtres humains et leur milieu.", "Un espace peut être décrit à différentes échelles : quartier, commune, région, pays ou monde."],
      "L'étude d'Abobo peut porter sur les quartiers, les routes, les marchés, les équipements et les espaces verts.",
      ["Délimiter l'espace étudié.", "Observer les éléments naturels et humains.", "Les classer.", "Expliquer les relations entre ces éléments."],
      ["Géographie", "Espace", "Paysage", "Milieu", "Aménagement", "Échelle"],
      "La géographie étudie les espaces et la manière dont les sociétés les organisent.",
      [{level:"Observation",instruction:"Cite deux éléments naturels et deux éléments humains de ton environnement.",correction:"Éléments naturels : cours d'eau, relief ou végétation. Éléments humains : routes, maisons, marché ou école."}],
      [{question:"Que cherche à comprendre la géographie ?",answer:"L'organisation de l'espace terrestre et les relations entre sociétés et environnement.",explanation:"Elle étudie les milieux et les activités humaines."}]
    ),
    "Le relief": make(
      "Le relief désigne l'ensemble des formes de la surface terrestre, comme les plaines, plateaux, collines, montagnes et vallées.",
      ["Identifier les principales formes de relief.", "Lire une représentation simple du relief.", "Expliquer l'influence du relief sur les activités humaines."],
      ["Une plaine est une surface relativement plane et peu élevée.", "Un plateau est une surface relativement plane située en altitude.", "Une montagne présente des pentes marquées et une altitude importante.", "Une vallée est une dépression allongée souvent parcourue par un cours d'eau.", "Le relief influence les routes, l'habitat, les cultures et les déplacements."],
      "Une route de montagne peut comporter des virages pour suivre les pentes.",
      ["Observer une photographie ou une carte.", "Repérer les hauteurs et les creux.", "Nommer les formes.", "Relier la forme du terrain aux activités humaines."],
      ["Relief", "Plaine", "Plateau", "Montagne", "Vallée", "Altitude", "Pente"],
      "Le relief comprend des formes variées qui influencent l'aménagement des espaces.",
      [{level:"Classement",instruction:"Explique la différence entre une plaine et un plateau.",correction:"Une plaine est relativement basse et plane ; un plateau est une surface plane située en altitude."}],
      [{question:"Comment appelle-t-on une dépression allongée entre des reliefs ?",answer:"Une vallée.",explanation:"Une vallée est souvent parcourue par un cours d'eau."}]
    ),
    "Le climat": make(
      "Le climat est l'ensemble des conditions atmosphériques moyennes observées dans une région sur une longue période.",
      ["Distinguer météo et climat.", "Identifier température et précipitations.", "Décrire les grandes caractéristiques climatiques de la Côte d'Ivoire."],
      ["La météo décrit le temps à court terme ; le climat se caractérise sur une longue durée.", "La température mesure le degré de chaleur de l'air.", "Les précipitations désignent l'eau qui tombe de l'atmosphère : pluie, grêle ou neige.", "La Côte d'Ivoire connaît des variations régionales et saisonnières des pluies et des températures."],
      "Une journée pluvieuse relève de la météo ; l'étude de plusieurs décennies de pluies permet de caractériser le climat.",
      ["Observer les données de température et de pluie.", "Repérer les périodes plus humides ou plus sèches.", "Comparer les régions sans généraliser à partir d'une seule journée."],
      ["Climat", "Météo", "Température", "Précipitations", "Saison", "Humidité"],
      "La météo concerne le court terme ; le climat décrit des tendances sur une longue période.",
      [{level:"Distinction",instruction:"Explique la différence entre météo et climat.",correction:"La météo décrit le temps à court terme ; le climat correspond aux caractéristiques moyennes sur une longue période."}],
      [{question:"Quel élément mesure la quantité d'eau tombée sous forme de pluie ?",answer:"Les précipitations.",explanation:"Elles peuvent être mesurées avec un pluviomètre."}]
    ),
    "Sols climat végétation": make(
      "Le sol, le climat et la végétation sont des éléments naturels liés : chacun influence les conditions de vie des plantes et l'état du milieu.",
      ["Identifier les caractéristiques du sol.", "Relier climat et végétation.", "Expliquer des interactions simples."],
      ["Le sol fournit un support, de l'eau et des éléments minéraux aux plantes.", "La température et les précipitations influencent la croissance des végétaux.", "La végétation protège parfois le sol contre l'érosion et apporte de la matière organique.", "La dégradation du couvert végétal peut favoriser le ruissellement et l'appauvrissement du sol."],
      "Une couverture végétale protège un sol nu contre l'impact direct des fortes pluies.",
      ["Observer le sol et les plantes.", "Noter l'humidité, la texture et le couvert végétal.", "Identifier les relations de cause à effet.", "Proposer une mesure de protection."],
      ["Sol", "Climat", "Végétation", "Humidité", "Érosion", "Ruissellement"],
      "Sol, climat et végétation interagissent et doivent être étudiés ensemble.",
      [{level:"Explication",instruction:"Explique comment la végétation peut protéger le sol.",correction:"Les racines retiennent le sol et le couvert végétal réduit l'impact des gouttes et le ruissellement."}],
      [{question:"Quel phénomène peut augmenter lorsque le sol est nu et fortement arrosé ?",answer:"L'érosion et le ruissellement.",explanation:"L'eau entraîne plus facilement les particules du sol."}]
    ),
    "Représentation de la Terre": make(
      "Les moyens de représentation de la Terre sont des outils qui permettent de montrer tout ou partie de sa surface.",
      ["Distinguer globe, planisphère et carte.", "Lire les éléments d'une carte.", "Utiliser une légende et une échelle simples."],
      ["Le globe donne une représentation en volume de la Terre.", "Le planisphère représente la surface terrestre sur un plan, avec des déformations.", "Une carte comporte généralement un titre, une légende, une orientation et une échelle.", "La légende explique les signes et couleurs utilisés."],
      "Sur une carte de Côte d'Ivoire, une étoile dans la légende peut représenter la capitale politique ou économique selon le symbole choisi.",
      ["Lire le titre.", "Repérer l'orientation.", "Consulter la légende.", "Utiliser l'échelle pour comprendre les distances."],
      ["Globe", "Carte", "Planisphère", "Légende", "Échelle", "Orientation"],
      "Pour lire une carte, il faut utiliser son titre, sa légende, son orientation et son échelle.",
      [{level:"Lecture de carte",instruction:"Cite quatre éléments qui aident à lire une carte.",correction:"Le titre, la légende, l'orientation et l'échelle."}],
      [{question:"À quoi sert la légende d'une carte ?",answer:"À expliquer les symboles et les couleurs.",explanation:"Elle permet d'interpréter les informations représentées."}]
    ),
    "Mouvements de la Terre": make(
      "La Terre effectue notamment une rotation sur elle-même et une révolution autour du Soleil.",
      ["Décrire la rotation terrestre.", "Décrire la révolution terrestre.", "Relier ces mouvements à des phénomènes observables."],
      ["La rotation est le mouvement de la Terre sur elle-même ; elle dure environ 24 heures et explique l'alternance du jour et de la nuit.", "La révolution est le déplacement de la Terre autour du Soleil ; elle dure environ 365 jours et un quart.", "L'inclinaison de l'axe terrestre combinée à la révolution contribue à l'alternance des saisons."],
      "Quand une partie de la Terre est tournée vers le Soleil, elle connaît le jour ; la partie opposée est dans la nuit.",
      ["Distinguer rotation et révolution.", "Associer chaque mouvement à sa durée approximative.", "Expliquer l'alternance jour-nuit avec un schéma."],
      ["Rotation", "Révolution", "Axe terrestre", "Jour", "Nuit", "Saison"],
      "La rotation explique l'alternance jour-nuit ; la révolution autour du Soleil dure environ un an.",
      [{level:"Comparaison",instruction:"Donne la durée approximative de la rotation et de la révolution de la Terre.",correction:"Rotation : environ 24 heures. Révolution : environ 365 jours et un quart."}],
      [{question:"Quel mouvement explique l'alternance du jour et de la nuit ?",answer:"La rotation de la Terre sur elle-même.",explanation:"Chaque région passe successivement dans la lumière et dans l'ombre."}]
    ),
    "Population et environnement": make(
      "La population est l'ensemble des habitants d'un territoire ; l'environnement comprend les éléments naturels et humains qui entourent ces habitants.",
      ["Décrire la population de son milieu.", "Identifier des interactions entre habitants et environnement.", "Proposer des comportements responsables."],
      ["Les habitants utilisent les ressources, construisent des logements et aménagent les espaces.", "La croissance de la population peut augmenter les besoins en eau, énergie, transport et assainissement.", "Les déchets mal gérés et l'occupation des zones sensibles peuvent dégrader le milieu.", "L'aménagement durable cherche à satisfaire les besoins sans détruire les ressources."],
      "Dans un quartier densément peuplé, la collecte régulière des déchets et le drainage réduisent certains risques sanitaires.",
      ["Observer le quartier.", "Identifier les besoins et les pressions sur le milieu.", "Relever les problèmes.", "Proposer des actions réalistes et collectives."],
      ["Population", "Environnement", "Ressource", "Déchet", "Assainissement", "Aménagement"],
      "Les activités humaines transforment l'environnement ; une gestion responsable limite les dégradations.",
      [{level:"Situation",instruction:"Propose trois actions pour améliorer l'environnement de ton quartier.",correction:"Organiser la collecte des déchets, éviter les dépôts dans les caniveaux et protéger les espaces végétalisés."}],
      [{question:"Pourquoi faut-il gérer les déchets correctement ?",answer:"Pour protéger la santé des habitants et éviter la pollution du milieu.",explanation:"Les déchets abandonnés peuvent obstruer les drains et contaminer l'environnement."}]
    ),
    "Cycle de l’eau": make(
      "Le cycle de l'eau est la circulation continue de l'eau entre les océans, les continents, l'atmosphère et les êtres vivants.",
      ["Identifier les étapes du cycle de l'eau.", "Expliquer évaporation, condensation et précipitation.", "Adopter des gestes de protection de l'eau."],
      ["Sous l'effet de la chaleur, une partie de l'eau s'évapore et rejoint l'atmosphère sous forme de vapeur.", "En altitude, la vapeur se refroidit et se condense en gouttelettes qui forment les nuages.", "Lorsque les gouttelettes deviennent suffisamment importantes, l'eau retombe sous forme de précipitations.", "Une partie ruisselle vers les cours d'eau ; une autre s'infiltre dans le sol et alimente les réserves souterraines."],
      "Après une pluie, l'eau peut ruisseler vers un marigot ou s'infiltrer dans le sol.",
      ["Suivre le trajet de l'eau sur un schéma.", "Nommer chaque transformation.", "Distinguer ruissellement et infiltration.", "Proposer des gestes d'économie et de protection."],
      ["Évaporation", "Condensation", "Précipitation", "Ruissellement", "Infiltration", "Nappe"],
      "Le cycle de l'eau est continu ; l'eau change d'état et circule entre plusieurs réservoirs.",
      [{level:"Schéma",instruction:"Cite les trois grandes étapes atmosphériques du cycle de l'eau.",correction:"Évaporation, condensation et précipitations."}],
      [{question:"Comment appelle-t-on le passage de la vapeur d'eau en gouttelettes ?",answer:"La condensation.",explanation:"Le refroidissement de la vapeur favorise la formation de gouttelettes."}]
    )
  };

  const S = {
    "Formation de la graine": make(
      "Chez les plantes à fleurs, la graine se forme après la fécondation de l'ovule dans l'ovaire de la fleur.",
      ["Identifier les organes reproducteurs d'une fleur.", "Décrire les étapes conduisant à la graine.", "Relier fleur, fruit et graine."],
      ["L'étamine est l'organe reproducteur mâle ; elle produit le pollen.", "Le pistil est l'organe reproducteur femelle ; il contient l'ovaire et les ovules.", "La pollinisation correspond au dépôt du pollen sur le stigmate.", "Après la fécondation, l'ovule se transforme en graine et l'ovaire se développe généralement en fruit."],
      "Chez la tomate, les graines se trouvent à l'intérieur du fruit qui se développe après la fécondation.",
      ["Observer une fleur.", "Identifier étamines et pistil.", "Repérer le pollen et l'ovaire.", "Schématiser le passage de la fleur au fruit contenant des graines."],
      ["Fleur", "Étamine", "Pistil", "Pollen", "Pollinisation", "Fécondation", "Ovule", "Graine"],
      "La graine provient de l'ovule fécondé ; le fruit provient généralement de l'ovaire.",
      [{level:"Schéma",instruction:"Explique en quelques lignes comment une fleur peut donner un fruit contenant des graines.",correction:"Le pollen est déposé sur le stigmate, la fécondation a lieu dans l'ovule, l'ovule devient graine et l'ovaire se développe en fruit."}],
      [{question:"Quelle partie de la fleur devient généralement la graine ?",answer:"L'ovule fécondé.",explanation:"Après fécondation, l'ovule se transforme en graine."}]
    ),
    "Germination": make(
      "La germination est le processus par lequel une graine viable reprend son développement et donne une jeune plante lorsque les conditions sont favorables.",
      ["Décrire les étapes de la germination.", "Identifier les conditions nécessaires.", "Réaliser une observation simple."],
      ["Une graine viable contient un embryon vivant et des réserves nutritives.", "L'eau permet à la graine de s'hydrater et déclenche la reprise d'activité.", "Une température convenable et la présence d'air sont nécessaires à la germination de nombreuses graines.", "La radicule sort généralement en premier et forme la racine ; la jeune tige et les premières feuilles se développent ensuite.", "La lumière n'est pas indispensable au déclenchement de la germination de toutes les graines, mais elle devient importante pour la croissance d'une plante verte."],
      "Des graines de haricot placées sur du coton humide, à température convenable et avec de l'air, peuvent germer en quelques jours.",
      ["Préparer plusieurs lots en ne faisant varier qu'un facteur.", "Maintenir les autres conditions identiques.", "Observer chaque jour.", "Noter l'apparition de la radicule puis de la tigelle."],
      ["Germination", "Graine viable", "Embryon", "Radicule", "Tigelle", "Eau", "Air", "Température"],
      "L'eau, l'air et une température favorable sont des conditions importantes de germination.",
      [{level:"Expérience",instruction:"Propose une expérience pour vérifier le rôle de l'eau dans la germination.",correction:"Placer un lot de graines sur coton humide et un autre sur coton sec, dans les mêmes conditions de température et d'air. Comparer les résultats."}],
      [{question:"Quelle partie de l'embryon apparaît généralement en premier ?",answer:"La radicule.",explanation:"Elle donnera la racine de la jeune plante."}]
    ),
    "Reproduction chez les mammifères": make(
      "Chez les mammifères, la reproduction est sexuée : elle fait intervenir un spermatozoïde et un ovule, dont l'union forme une cellule-œuf.",
      ["Identifier les cellules reproductrices.", "Décrire fécondation et développement embryonnaire.", "Reconnaître des caractéristiques communes aux mammifères."],
      ["Le mâle produit des spermatozoïdes et la femelle produit des ovules.", "La fécondation correspond à la fusion d'un spermatozoïde et d'un ovule.", "Chez de nombreux mammifères, le développement de l'embryon se déroule dans l'utérus.", "Après la naissance, le jeune est nourri par le lait produit par les glandes mammaires."],
      "Chez la vache, le veau se développe dans l'utérus avant la naissance puis est nourri par le lait maternel.",
      ["Identifier les cellules reproductrices.", "Ordonner fécondation, développement et naissance.", "Comparer les caractères des mammifères."],
      ["Mammifère", "Spermatozoïde", "Ovule", "Fécondation", "Embryon", "Utérus", "Allaitement"],
      "Les mammifères possèdent des glandes mammaires et nourrissent leurs petits avec du lait.",
      [{level:"Restitution",instruction:"Présente les grandes étapes de la reproduction chez un mammifère.",correction:"Production des gamètes, fécondation, développement de l'embryon, naissance puis allaitement."}],
      [{question:"Comment le jeune mammifère est-il nourri après la naissance ?",answer:"Par le lait maternel.",explanation:"Les glandes mammaires produisent le lait."}]
    ),
    "Reproduction chez les oiseaux": make(
      "Les oiseaux sont des animaux ovipares : après fécondation, la femelle pond un œuf dans lequel l'embryon se développe.",
      ["Décrire la reproduction des oiseaux.", "Identifier les parties principales de l'œuf.", "Expliquer le rôle de la couvaison."],
      ["La fécondation est interne chez les oiseaux.", "L'œuf comprend notamment une coquille, des membranes, du blanc (albumen) et un jaune (vitellus).", "Le jaune fournit des réserves nutritives à l'embryon ; le blanc participe à sa protection et à son alimentation.", "La couvaison maintient une température favorable au développement de l'embryon jusqu'à l'éclosion."],
      "La poule couve ses œufs ; après le développement embryonnaire, le poussin sort de la coquille.",
      ["Observer un schéma d'œuf.", "Identifier ses principales parties.", "Expliquer le rôle de la couvaison.", "Présenter les étapes jusqu'à l'éclosion."],
      ["Ovipare", "Fécondation", "Œuf", "Coquille", "Albumen", "Vitellus", "Couvaison", "Éclosion"],
      "Chez les oiseaux, l'embryon se développe dans un œuf pondu à l'extérieur du corps de la femelle.",
      [{level:"Explication",instruction:"Explique le rôle de la couvaison chez la poule.",correction:"La couvaison maintient l'œuf à une température favorable au développement de l'embryon."}],
      [{question:"Comment appelle-t-on un animal qui pond des œufs ?",answer:"Un animal ovipare.",explanation:"Les oiseaux sont des animaux ovipares."}]
    ),
    "Facteurs de croissance": make(
      "La croissance d'une plante à fleurs est l'augmentation de sa taille et de sa masse, sous l'influence de facteurs internes et externes.",
      ["Identifier les besoins d'une plante.", "Étudier l'effet de l'eau, de la lumière et des sels minéraux.", "Interpréter une expérience simple."],
      ["L'eau intervient dans les échanges et le fonctionnement des cellules.", "La lumière fournit l'énergie nécessaire à la photosynthèse chez les plantes vertes.", "Les sels minéraux absorbés dans le sol participent à la construction de la matière végétale.", "La température et la qualité du sol influencent également la croissance.", "Une expérience correcte ne fait varier qu'un seul facteur à la fois."],
      "Deux jeunes plants identiques sont cultivés : l'un reçoit de l'eau régulièrement, l'autre non. Leur croissance peut être comparée.",
      ["Choisir des plants comparables.", "Faire varier un seul facteur.", "Mesurer la taille à intervalles réguliers.", "Présenter les résultats dans un tableau et conclure."],
      ["Croissance", "Lumière", "Eau", "Sels minéraux", "Photosynthèse", "Expérience", "Témoin"],
      "Pour identifier un facteur de croissance, on compare des plants dans des conditions contrôlées.",
      [{level:"Expérimentation",instruction:"Pourquoi faut-il garder les mêmes conditions sauf le facteur étudié ?",correction:"Pour attribuer la différence observée au facteur que l'on fait varier, et non à une autre cause."}],
      [{question:"Quelle source fournit l'énergie nécessaire à la photosynthèse ?",answer:"La lumière.",explanation:"La lumière fournit l'énergie utilisée par la plante verte."}]
    ),
    "Aliments et croissance des vers de terre": make(
      "La croissance d'un animal dépend notamment de la quantité et de la qualité des aliments disponibles ainsi que des conditions du milieu.",
      ["Décrire le régime alimentaire du ver de terre.", "Observer une croissance.", "Relier alimentation et développement."],
      ["Le ver de terre vit dans le sol humide et se nourrit principalement de matières organiques en décomposition.", "Les aliments fournissent de la matière et de l'énergie nécessaires au fonctionnement et à la croissance.", "Une alimentation insuffisante ou des conditions défavorables peuvent ralentir le développement.", "Une expérience doit comparer des groupes placés dans des conditions contrôlées."],
      "On peut comparer la masse de vers de terre élevés dans deux milieux identiques, sauf la quantité de matière organique disponible.",
      ["Peser ou mesurer les individus au début.", "Préparer des lots comparables.", "Ne modifier que la quantité ou la nature de l'aliment.", "Mesurer à nouveau et comparer les résultats."],
      ["Ver de terre", "Matière organique", "Alimentation", "Croissance", "Masse", "Témoin"],
      "La nourriture fournit les ressources nécessaires à la croissance ; les comparaisons doivent être réalisées dans des conditions contrôlées.",
      [{level:"Analyse",instruction:"Pourquoi faut-il comparer des vers de terre de taille proche au début d'une expérience ?",correction:"Pour que les différences finales soient moins liées à la taille initiale et davantage au facteur étudié."}],
      [{question:"De quoi se nourrit principalement le ver de terre ?",answer:"De matières organiques présentes dans le sol, souvent en décomposition.",explanation:"Il participe ainsi à la transformation de la matière organique du sol."}]
    ),
    "Actions néfastes": make(
      "Une action néfaste sur l'environnement est une activité qui dégrade les milieux naturels ou perturbe leur fonctionnement.",
      ["Identifier des actions humaines qui dégradent l'environnement.", "Expliquer leurs conséquences.", "Relier dégradation et santé."],
      ["Les dépôts sauvages d'ordures peuvent obstruer les caniveaux et favoriser les eaux stagnantes.", "La déforestation réduit les habitats et peut accélérer l'érosion des sols.", "Les fumées et les rejets polluants dégradent la qualité de l'air et de l'eau.", "Les conséquences peuvent toucher la biodiversité, les cultures et la santé humaine."],
      "Jeter des déchets plastiques dans un caniveau peut empêcher l'écoulement des eaux de pluie et favoriser les inondations.",
      ["Observer le milieu sans se mettre en danger.", "Identifier la source de dégradation.", "Décrire les conséquences.", "Proposer une prévention adaptée."],
      ["Pollution", "Déforestation", "Érosion", "Biodiversité", "Déchet", "Assainissement"],
      "Les activités humaines peuvent dégrader l'air, l'eau, les sols et les êtres vivants.",
      [{level:"Situation",instruction:"Explique deux conséquences possibles des dépôts d'ordures dans les caniveaux.",correction:"Ils peuvent bloquer l'écoulement des eaux, provoquer des inondations et favoriser des eaux stagnantes propices à certains moustiques."}],
      [{question:"Quel effet peut avoir la déforestation sur le sol ?",answer:"Elle peut favoriser l'érosion.",explanation:"La végétation protège le sol grâce à son couvert et à ses racines."}]
    ),
    "Lutte contre la dégradation": make(
      "La protection de l'environnement regroupe les actions qui préviennent ou réduisent la dégradation des milieux naturels.",
      ["Proposer des mesures de protection.", "Adopter des gestes responsables.", "Participer à une action collective."],
      ["La réduction, le tri et la collecte des déchets limitent les dépôts sauvages.", "La plantation et la protection des arbres contribuent à préserver les sols et les habitats.", "La protection des cours d'eau passe par l'absence de rejets polluants et par l'assainissement.", "La sensibilisation et l'application des règles demandent la participation des habitants, des écoles et des autorités."],
      "Une classe peut organiser une opération de salubrité dans la cour, avec tri des déchets et entretien des espaces verts.",
      ["Identifier le problème prioritaire.", "Choisir une action réaliste.", "Répartir les responsabilités.", "Évaluer les résultats et maintenir les bonnes pratiques."],
      ["Protection", "Prévention", "Reboisement", "Tri", "Recyclage", "Salubrité"],
      "La protection de l'environnement repose sur la prévention, les gestes quotidiens et l'action collective.",
      [{level:"Projet",instruction:"Propose un mini-plan de protection de l'environnement de ton établissement.",correction:"Le plan peut prévoir des poubelles adaptées, une collecte régulière, la protection des arbres, l'entretien des caniveaux et une sensibilisation des élèves."}],
      [{question:"Pourquoi une action collective est-elle utile pour protéger l'environnement ?",answer:"Parce que la protection du milieu demande la participation de plusieurs personnes et la continuité des efforts.",explanation:"Les gestes individuels sont renforcés par une organisation collective."}]
    )
  };

  const normalize = s => String(s || "").toLocaleLowerCase("fr").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[’']/g, " ").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

  function find(subject, title, section) {
    const t = normalize(title + " " + section);
    const match = (dict, keys) => {
      for (const key of keys) if (t.includes(normalize(key))) return dict[key];
      return null;
    };
    if (subject === "Mathématiques") {
      if (t.includes("symet")) return M["Symétrie centrale"];
      return match(M, ["Nombres entiers naturels", "Nombres décimaux relatifs", "Droites et points", "Segment", "Cercles et disques", "Fractions", "Angles", "Triangles", "Proportionnalité", "Parallélogramme", "Statistiques", "Pavé droit et cylindre"]);
    }
    if (subject === "Français") return match(F, ["Les activités de communication orale", "Le dialogue oral", "La lettre personnelle", "Le récit", "La description", "Lecture méthodique", "Lecture suivie", "La phrase", "Le groupe nominal", "Discours direct", "Le verbe", "Le groupe verbal", "Les adverbes", "Orthographe"]);
    if (subject === "Anglais") return match(A, ["At School", "At Home", "Time and Date", "Jobs and Occupations", "Clothes and Colours", "Food and Drinks", "Health and Environment"]);
    if (subject === "Histoire-Géographie") {
      if (t.includes("histoire") || t.includes("chronologie") || t.includes("pal eolithique") || t.includes("neolithique") || t.includes("metallurgie") || t.includes("source") || t.includes("periode")) {
        return match(H, ["Les sources de l’histoire", "La chronologie", "Les grandes périodes", "Paléolithique", "Néolithique", "Métallurgie du fer", "L’histoire et son objet"]);
      }
      if (t.includes("impot")) return make(
        "L'impôt est une contribution obligatoire versée par les citoyens et les entreprises aux pouvoirs publics pour financer les services et équipements collectifs.",
        ["Définir l'impôt.", "Identifier des réalisations financées par les recettes publiques.", "Expliquer le lien entre civisme fiscal et développement local."],
        ["Les recettes fiscales permettent notamment de financer des écoles, des centres de santé, des routes, l'éclairage public et certains services collectifs.", "Le paiement de l'impôt selon les règles contribue au financement du budget public.", "Le civisme fiscal implique de respecter les obligations fiscales et de comprendre que les ressources publiques doivent être gérées avec transparence.", "Les équipements publics répondent à des besoins collectifs et peuvent améliorer les conditions de vie d'une région."],
        "La construction et l'entretien d'une école publique ou d'une route peuvent être financés en partie par les ressources du budget public.",
        ["Identifier un besoin collectif dans sa région.", "Repérer un équipement ou un service public correspondant.", "Expliquer comment les recettes publiques contribuent à son financement.", "Distinguer impôt et don volontaire."],
        ["Impôt", "Recette fiscale", "Budget public", "Civisme fiscal", "Service public", "Développement local"],
        "L'impôt contribue au financement des services et équipements collectifs ; son utilisation doit servir l'intérêt général.",
        [{level:"Application",instruction:"Cite trois équipements ou services collectifs qui contribuent au développement de ta région.",correction:"Une école, un centre de santé, une route, un réseau d'eau potable ou l'éclairage public."}],
        [{question:"À quoi servent principalement les recettes fiscales ?",answer:"À contribuer au financement des services et équipements publics.",explanation:"Elles participent au financement des besoins collectifs."}]
      );
      return match(H, ["Géographie et son objet", "Le relief", "Le climat", "Sols climat végétation", "Représentation de la Terre", "Mouvements de la Terre", "Population et environnement", "Cycle de l’eau"]);
    }
    if (subject === "SVT") {
      if (t.includes("vers de terre") || t.includes("aliments")) return S["Aliments et croissance des vers de terre"];
      return match(S, ["Formation de la graine", "Germination", "Reproduction chez les mammifères", "Reproduction chez les oiseaux", "Facteurs de croissance", "Actions néfastes", "Lutte contre la dégradation"]);
    }
    return null;
  }

  function applyCourse(target, course, title) {
    target.objectives = course.objectives;
    target.introduction = "Situation d’apprentissage : " + title + ". Observe les faits, mobilise les connaissances de la leçon et réalise les activités pour expliquer la situation.";
    target.course = {
      definition: course.definition,
      explanation: course.explanation,
      example: course.example,
      method: course.method,
      vocabulary: course.vocabulary,
      essential: course.essential,
      conclusion: "À la fin de cette séance, tu dois pouvoir définir la notion, expliquer les idées essentielles et les utiliser dans une situation nouvelle."
    };
    target.exercises = course.exercises;
    target.quiz = course.quiz;
    target.revision = ["Définition : " + course.definition, "À retenir : " + course.essential, "Exemple : " + course.example];
  }

  engine.buildAll = function (raw) {
    const all = previousBuildAll(raw);
    Object.keys(all || {}).forEach(subject => {
      if (!["Français", "Mathématiques", "Anglais", "Histoire-Géographie", "SVT"].includes(subject)) return;
      const lessons = all[subject] && Array.isArray(all[subject].lessons) ? all[subject].lessons : [];
      lessons.forEach(lesson => {
        const course = find(subject, lesson.title, lesson.section);
        if (!course) {
          lesson.contentStatus = "À vérifier dans la progression officielle";
          return;
        }
        applyCourse(lesson, course, lesson.title);
        (lesson.sessions || []).forEach(session => applyCourse(session, course, session.title || lesson.title));
        lesson.finalAssessment = {
          duration: "25 minutes",
          total: 20,
          instructions: ["Lis attentivement les consignes.", "Réponds dans ton cahier sans consulter le cours.", "Justifie les réponses lorsque cela est demandé."],
          questions: [
            {question:"Définis la notion principale de la leçon.",points:4,expected:course.definition},
            {question:"Explique deux idées essentielles du cours.",points:6,expected:course.explanation.slice(0,2).join(" ")},
            {question:"Présente une méthode permettant de traiter une situation liée à cette leçon.",points:4,expected:course.method.join(" ")},
            {question:"Résous l'exercice d'application proposé dans le cours.",points:6,expected:course.exercises[0].correction}
          ]
        };
      });
    });
    return all;
  };

  engine.officialSeriesVersion = "1.0";
  engine.references = (engine.references || []).concat([
    {name:"DPFC — programmes éducatifs et guides d'exécution du secondaire",url:"https://dpfc-ci.net/documents/programmes-educatifs-et-guides-dexecution/programmes-educatifs-et-guides-dexecution-du-secondaire/"},
    {name:"DPFC — progressions annuelles 2026-2027",url:"https://dpfc-ci.net/documents/progressions/progressions-du-secondaire-2-3-2/"}
  ]);
})();