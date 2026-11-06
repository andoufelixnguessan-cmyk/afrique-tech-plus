/* ATP SCHOOL — compléments scientifiques et affichage des formules 6e
 * Référence de cadrage : programmes éducatifs DPFC Côte d'Ivoire.
 * Les formules sont stockées en MathML afin d'afficher de vraies fractions
 * et des symboles mathématiques, sans pseudo-LaTeX ni notation avec slash.
 */
(function () {
  "use strict";
  const engine = window.ATP_LEARNING_CONTENT_6E;
  if (!engine || typeof engine.buildAll !== "function") return;
  const previousBuildAll = engine.buildAll;

  const math = (label, markup, note) => ({ label, mathml: markup, note: note || "" });
  const M = "http://www.w3.org/1998/Math/MathML";
  const F = {
    nat: [
      math("Appartenance à l'ensemble des naturels", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>n</mi><mo>∈</mo><mi>ℕ</mi></mrow></math>', "n appartient à ℕ signifie que n est un entier naturel."),
      math("Non-appartenance", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>x</mi><mo>∉</mo><mi>ℕ</mi></mrow></math>', "x n'appartient pas à l'ensemble des entiers naturels."),
      math("Divisibilité", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>a</mi><mo>=</mo><mi>b</mi><mo>×</mo><mi>k</mi></mrow></math>', "a est divisible par b si le quotient k est un entier naturel."),
      math("Nombre d'entiers consécutifs de m à n", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>N</mi><mo>=</mo><mi>n</mi><mo>−</mo><mi>m</mi><mo>+</mo><mn>1</mn></mrow></math>', "On compte les deux bornes m et n."),
      math("Critères de divisibilité", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mtext>dernier chiffre pair</mtext></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mtext>somme des chiffres multiple de 3</mtext></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mtext>dernier chiffre 0 ou 5</mtext></mtd></mtr><mtr><mtd><mn>9</mn></mtd><mtd><mtext>somme des chiffres multiple de 9</mtext></mtd></mtr><mtr><mtd><mn>10</mn></mtd><mtd><mtext>dernier chiffre 0</mtext></mtd></mtr><mtr><mtd><mn>100</mn></mtd><mtd><mtext>deux derniers chiffres 00</mtext></mtd></mtr><mtr><mtd><mn>1000</mn></mtd><mtd><mtext>trois derniers chiffres 000</mtext></mtd></mtr></mtable></math>', "Ces critères figurent dans le programme de mathématiques de 6e."),
      math("Nombre pair et nombre impair", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mtable><mtr><mtd><mi>n</mi><mo>=</mo><mn>2</mn><mi>k</mi></mtd><mtd><mtext>pair</mtext></mtd></mtr><mtr><mtd><mi>n</mi><mo>=</mo><mn>2</mn><mi>k</mi><mo>+</mo><mn>1</mn></mtd><mtd><mtext>impair</mtext></mtd></mtr></mtable></math>', "k est un entier naturel."),
    ],
    relatifs: [
      math("Opposé d'un nombre", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mtext>Opposé de </mtext><mi>a</mi><mo>=</mo><mo>−</mo><mi>a</mi></mrow></math>', "Un nombre et son opposé ont la même distance à zéro."),
      math("Somme de deux nombres de même signe", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mo>(</mo><mo>+</mo><mi>a</mi><mo>)</mo><mo>+</mo><mo>(</mo><mo>+</mo><mi>b</mi><mo>)</mo><mo>=</mo><mo>+</mo><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo></mrow></math>', "On additionne les distances à zéro et on conserve le signe commun. Pour deux nombres négatifs, le résultat est négatif."),
      math("Somme de deux nombres de signes contraires", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mo>(</mo><mo>+</mo><mi>a</mi><mo>)</mo><mo>+</mo><mo>(</mo><mo>−</mo><mi>b</mi><mo>)</mo><mo>=</mo><mi>a</mi><mo>−</mo><mi>b</mi></mrow></math>', "On soustrait les distances à zéro et on garde le signe du nombre qui a la plus grande distance à zéro."),
      math("Comparaison", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>a</mi><mo>&lt;</mo><mi>b</mi><mo>⇔</mo><mtext>a est placé à gauche de b sur la droite graduée</mtext></mrow></math>', "Sur une droite graduée, les nombres augmentent de gauche à droite."),
      math("Soustraction d'un nombre relatif", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>a</mi><mo>−</mo><mi>b</mi><mo>=</mo><mi>a</mi><mo>+</mo><mo>(</mo><mo>−</mo><mi>b</mi><mo>)</mo></mrow></math>', "Soustraire un nombre revient à ajouter son opposé."),
      math("Somme d'un nombre et de son opposé", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>a</mi><mo>+</mo><mo>(</mo><mo>−</mo><mi>a</mi><mo>)</mo><mo>=</mo><mn>0</mn></mrow></math>', "Un nombre et son opposé ont pour somme zéro."),
    ],
    fractions: [
      math("Écriture d'une fraction", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><mi>a</mi><mi>b</mi></mfrac></math>', "a est le numérateur ; b est le dénominateur et b ne peut pas être nul."),
      math("Fractions égales", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mi>a</mi><mi>b</mi></mfrac><mo>=</mo><mfrac><mrow><mi>a</mi><mo>×</mo><mi>k</mi></mrow><mrow><mi>b</mi><mo>×</mo><mi>k</mi></mrow></mfrac></mrow></math>', "On multiplie ou divise le numérateur et le dénominateur par un même nombre non nul."),
      math("Addition de fractions de même dénominateur", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mi>a</mi><mi>c</mi></mfrac><mo>+</mo><mfrac><mi>b</mi><mi>c</mi></mfrac><mo>=</mo><mfrac><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow><mi>c</mi></mfrac></mrow></math>', "On additionne les numérateurs et on conserve le dénominateur."),
      math("Addition après réduction au même dénominateur", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mi>a</mi><mi>b</mi></mfrac><mo>+</mo><mfrac><mi>c</mi><mi>d</mi></mfrac><mo>=</mo><mfrac><mrow><mi>a</mi><mo>×</mo><mi>d</mi><mo>+</mo><mi>c</mi><mo>×</mo><mi>b</mi></mrow><mrow><mi>b</mi><mo>×</mo><mi>d</mi></mrow></mfrac></mrow></math>', "Cette écriture suppose b et d non nuls. En pratique, on choisit un dénominateur commun."),
      math("Fraction d'une quantité", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mi>a</mi><mi>b</mi></mfrac><mo>×</mo><mi>Q</mi><mo>=</mo><mfrac><mrow><mi>a</mi><mo>×</mo><mi>Q</mi></mrow><mi>b</mi></mfrac></mrow></math>', "Pour prendre a/b d'une quantité Q, on divise par b puis on multiplie par a."),
      math("Comparer une fraction à 1", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mi>a</mi><mi>b</mi></mfrac><mo>&lt;</mo><mn>1</mn><mtext> si </mtext><mi>a</mi><mo>&lt;</mo><mi>b</mi></mrow></math>', "Pour a et b positifs : la fraction vaut 1 si a=b et dépasse 1 si a>b."),
      math("Fraction décimale", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mn>0.37</mn><mo>=</mo><mfrac><mn>37</mn><mn>100</mn></mfrac></mrow></math>', "Un nombre décimal peut s'écrire sous forme de fraction décimale."),
      math("Comparer deux fractions de même dénominateur", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mi>a</mi><mi>c</mi></mfrac><mo>&lt;</mo><mfrac><mi>b</mi><mi>c</mi></mfrac><mo>⇔</mo><mi>a</mi><mo>&lt;</mo><mi>b</mi></mrow></math>', "Pour un même dénominateur positif, on compare les numérateurs."),
    ],
    proportion: [
      math("Coefficient de proportionnalité", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>=</mo><mi>k</mi><mo>×</mo><mi>x</mi></mrow></math>', "k est le coefficient qui permet de passer de x à y."),
      math("Pourcentage", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>p</mi><mo>%</mo><mo>=</mo><mfrac><mi>p</mi><mn>100</mn></mfrac></mrow></math>', "Un pourcentage est une fraction dont le dénominateur est 100."),
      math("Calculer p % d'une quantité", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mtext>Partie</mtext><mo>=</mo><mfrac><mi>p</mi><mn>100</mn></mfrac><mo>×</mo><mtext>Total</mtext></mrow></math>', "Exemple : 20 % de 150 = 20/100 × 150 = 30."),
      math("Échelle", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mtext>Échelle</mtext><mo>=</mo><mfrac><mtext>longueur sur le dessin</mtext><mtext>longueur réelle</mtext></mfrac></mrow></math>', "Les deux longueurs doivent être exprimées dans la même unité."),
      math("Propriété de linéarité", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>k</mi><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo><mo>=</mo><mi>ka</mi><mo>+</mo><mi>kb</mi></mrow></math>', "Dans un tableau de proportionnalité, on peut additionner deux colonnes puis appliquer le même coefficient."),
    ],
    statistics: [
      math("Effectif total", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>N</mi><mo>=</mo><msub><mi>n</mi><mn>1</mn></msub><mo>+</mo><msub><mi>n</mi><mn>2</mn></msub><mo>+</mo><mo>…</mo></mrow></math>', "On additionne les effectifs de toutes les catégories."),
      math("Fréquence", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>f</mi><mo>=</mo><mfrac><mtext>effectif de la donnée</mtext><mtext>effectif total</mtext></mfrac></mrow></math>', "La fréquence est comprise entre 0 et 1."),
      math("Fréquence en pourcentage", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>f</mi><mo>%</mo><mo>=</mo><mi>f</mi><mo>×</mo><mn>100</mn></mrow></math>', "La somme des fréquences vaut 1, soit 100 %."),
      math("Retrouver un effectif", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mtext>Effectif</mtext><mo>=</mo><mi>f</mi><mo>×</mo><mi>N</mi></mrow></math>', "Multiplier la fréquence par l'effectif total."),
    ],
    geometry: [
      math("Milieu d'un segment", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>I</mi><mtext> milieu de </mtext><mo>[</mo><mi>A</mi><mi>B</mi><mo>]</mo><mo>⇔</mo><mi>A</mi><mi>I</mi><mo>=</mo><mi>I</mi><mi>B</mi><mo>=</mo><mfrac><mi>A</mi><mi>B</mi></mfrac></mrow></math>', "Le milieu appartient au segment et partage sa longueur en deux parties égales."),
      math("Diamètre et rayon", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>d</mi><mo>=</mo><mn>2</mn><mi>r</mi><mspace width="1em"/><mi>r</mi><mo>=</mo><mfrac><mi>d</mi><mn>2</mn></mfrac></mrow></math>', "Le diamètre est deux fois le rayon."),
      math("Somme des angles d'un triangle", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>A</mi><mo>+</mo><mi>B</mi><mo>+</mo><mi>C</mi><mo>=</mo><mn>180</mn><mo>°</mo></mrow></math>', "À utiliser lorsque cette propriété est mobilisée dans la leçon et les exercices."),
      math("Périmètre d'un rectangle", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>P</mi><mo>=</mo><mn>2</mn><mo>×</mo><mo>(</mo><mi>L</mi><mo>+</mo><mi>l</mi><mo>)</mo></mrow></math>', "L désigne la longueur et l la largeur."),
      math("Périmètre d'un carré", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>P</mi><mo>=</mo><mn>4</mn><mo>×</mo><mi>c</mi></mrow></math>', "c désigne la longueur d'un côté."),
      math("Volume d'un pavé droit", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>V</mi><mo>=</mo><mi>L</mi><mo>×</mo><mi>l</mi><mo>×</mo><mi>h</mi></mrow></math>', "Les trois dimensions doivent être dans la même unité."),
      math("Volume d'un cylindre droit", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>V</mi><mo>=</mo><mi>π</mi><mo>×</mo><msup><mi>r</mi><mn>2</mn></msup><mo>×</mo><mi>h</mi></mrow></math>', "r est le rayon de la base et h la hauteur. À mobiliser comme formule de géométrie de l'espace.")
    ]
  };

  const PC = {
    "Le circuit électrique": {
      definition:"Un circuit électrique est un ensemble de dipôles reliés par des fils conducteurs formant une boucle. Le courant circule lorsque le circuit est fermé et que le générateur fonctionne.",
      explanation:["Un circuit simple comporte généralement un générateur (pile), un récepteur (lampe ou moteur), des fils de connexion et éventuellement un organe de commande.","Un circuit fermé permet le passage du courant ; un circuit ouvert l'interrompt.","Les conducteurs laissent passer le courant électrique ; les isolants ne le laissent pas passer dans les conditions usuelles.","Le sens conventionnel du courant, à l'extérieur du générateur, va de la borne positive vers la borne négative."],
      example:"Une pile, deux fils et une lampe : si les deux bornes de la lampe sont reliées aux deux bornes de la pile dans une boucle fermée, la lampe s'allume.",
      method:["Identifier le générateur et le récepteur.","Relier les dipôles avec des fils en boucle fermée.","Vérifier les contacts et la polarité si le dipôle l'exige.","Schématiser chaque dipôle avec son symbole normalisé."],
      vocabulary:["Générateur","Récepteur","Conducteur","Isolant","Circuit fermé","Circuit ouvert","Symbole normalisé"],
      essential:"Un circuit doit former une boucle fermée pour que le courant circule. Un fil débranché ouvre le circuit."
    },
    "Commande d’un circuit électrique": {
      definition:"Commander un circuit consiste à établir ou interrompre le passage du courant à l'aide d'un organe de commande.",
      explanation:["L'interrupteur ouvre ou ferme le circuit selon sa position.","Le bouton-poussoir peut être normalement ouvert ou normalement fermé ; son état change lorsqu'on appuie dessus.","Le commutateur dirige le courant vers une branche ou une autre.","Un montage va-et-vient permet de commander une même lampe depuis deux endroits à l'aide de deux commutateurs adaptés."],
      example:"Dans un couloir, deux commutateurs permettent d'allumer une lampe à l'entrée et de l'éteindre à l'autre extrémité.",
      method:["Identifier le type d'organe de commande.","Repérer ses bornes et son symbole normalisé.","Réaliser le montage hors tension.","Tester les différentes positions et dessiner le schéma correspondant."],
      vocabulary:["Interrupteur","Bouton-poussoir","Commutateur","Va-et-vient","Contact","Borne"],
      essential:"L'organe de commande agit sur l'état ou le chemin du courant dans le circuit."
    },
    "Court-circuit et protection des installations électriques": {
      definition:"Un court-circuit est une liaison accidentelle de très faible résistance entre deux points qui ne doivent pas être directement reliés.",
      explanation:["Un court-circuit peut provoquer une très forte intensité, l'échauffement des conducteurs, la détérioration du matériel et un incendie.","Il peut être causé par des fils dénudés qui se touchent, une installation défectueuse ou un appareil endommagé.","Un fusible fond lorsque le courant devient trop important et coupe le circuit.","Un disjoncteur ouvre automatiquement le circuit lorsqu'une anomalie de courant est détectée."],
      example:"Deux fils dénudés qui se touchent peuvent provoquer un court-circuit. Le fusible ou le disjoncteur doit interrompre l'alimentation.",
      method:["Ne jamais provoquer un court-circuit pour faire une expérience.","Repérer les fils abîmés, prises brûlées ou odeurs anormales sans toucher.","Couper l'alimentation si cela peut être fait sans danger.","Faire intervenir un adulte qualifié ou un électricien."],
      vocabulary:["Court-circuit","Fusible","Disjoncteur","Surintensité","Isolation","Protection"],
      essential:"Ne jamais manipuler une installation sous tension. Les protections électriques évitent les échauffements dangereux."
    },
    "Solides et liquides": {
      definition:"Un solide possède une forme propre et un volume propre. Un liquide possède un volume propre, mais prend la forme du récipient qui le contient.",
      explanation:["Les solides compacts conservent leur forme et peuvent être saisis ; les solides divisés sont constitués de grains ou de petits morceaux.","Un liquide est fluide, ne possède pas de forme propre et présente une surface libre plane et horizontale lorsqu'il est au repos.","La verrerie courante comprend le bécher, l'éprouvette graduée, le tube à essais, le ballon, l'erlenmeyer et le cristallisoir.","Les étiquettes des produits donnent des informations utiles : nom, quantité, précautions et pictogrammes."],
      example:"Un caillou garde sa forme dans différents récipients ; l'eau change de forme selon le récipient mais conserve la même quantité.",
      method:["Observer le corps sans le toucher si le produit est inconnu.","Vérifier s'il garde sa forme lorsqu'on le déplace.","Comparer la forme et le volume dans plusieurs récipients.","Identifier l'ustensile adapté à l'observation ou à la mesure."],
      vocabulary:["Solide compact","Solide divisé","Liquide","Fluidité","Surface libre","Bécher","Éprouvette graduée"],
      essential:"Un solide possède une forme et un volume propres ; un liquide possède un volume propre mais pas de forme propre."
    },
    "Les gaz": {
      definition:"Un gaz est un état de la matière qui n'a ni forme propre ni volume propre ; il occupe tout l'espace disponible dans un récipient fermé.",
      explanation:["L'air est un mélange de gaz. On peut mettre en évidence sa présence en observant un ballon qui se gonfle ou des bulles dans l'eau.","Un gaz est compressible : son volume peut diminuer lorsqu'on augmente la pression dans un récipient adapté.","Un gaz est expansible : il occupe tout le volume disponible lorsqu'on lui donne davantage d'espace.","Un gaz peut être transvasé, recueilli et conservé dans un récipient approprié. Il faut respecter les règles de sécurité."],
      example:"Lorsqu'on pousse le piston d'une seringue bouchée, l'air enfermé se comprime ; lorsqu'on relâche le piston, il tend à reprendre davantage de volume.",
      method:["Utiliser une seringue sans aiguille et sous la supervision d'un adulte.","Boucher l'extrémité avec le doigt sans forcer.","Pousser doucement le piston et observer la résistance.","Relâcher et décrire le retour du piston."],
      vocabulary:["Gaz","Compressibilité","Expansibilité","Pression","Transvaser","Récipient"],
      essential:"Un gaz est compressible, expansible et occupe tout l'espace disponible."
    },
    "Température d’un corps": {
      definition:"La température est une grandeur physique qui indique l'état thermique d'un corps. Elle se mesure avec un thermomètre.",
      explanation:["L'unité légale du système international est le kelvin (K). Le degré Celsius (°C) est couramment utilisé dans la vie quotidienne ; le degré Fahrenheit (°F) existe aussi.","Dans l'échelle Celsius, la glace fondante est à 0 °C et l'eau bout à environ 100 °C à la pression atmosphérique normale.","Le thermomètre médical sert à mesurer la température du corps humain. La température dite normale est voisine de 37 °C, avec des variations individuelles.","Il existe des thermomètres de laboratoire, médicaux, électroniques et à maxima et minima."],
      example:"Un thermomètre indique 38 °C : la température mesurée est supérieure à la valeur habituelle voisine de 37 °C ; il faut demander conseil à un adulte ou à un professionnel de santé.",
      method:["Choisir un thermomètre adapté à l'usage.","Lire sa notice et respecter les précautions.","Placer la sonde ou le réservoir correctement.","Attendre la stabilisation puis lire la graduation ou l'écran avec l'unité."],
      vocabulary:["Température","Thermomètre","Kelvin","Degré Celsius","Degré Fahrenheit","Ébullition","Fusion"],
      essential:"La température se mesure avec un thermomètre. Ne pas confondre température et sensation de chaud ou de froid."
    },
    "Les changements d’état de l’eau": {
      definition:"Un changement d'état est le passage d'un corps d'un état physique à un autre sans changer sa nature chimique.",
      explanation:["La fusion est le passage de l'état solide à l'état liquide ; pour l'eau pure, elle se produit à 0 °C sous pression normale.","La solidification est le passage du liquide au solide ; l'eau se solidifie à 0 °C sous pression normale.","La vaporisation transforme un liquide en gaz ; l'ébullition de l'eau pure se produit vers 100 °C sous pression normale.","La condensation (ou liquéfaction) transforme la vapeur d'eau en eau liquide.","Lors de la fusion ou de la solidification, la masse se conserve dans un système fermé, même si le volume peut varier."],
      example:"Un glaçon fond dans un verre : la glace devient de l'eau liquide. Si cette eau est placée au congélateur, elle se solidifie.",
      method:["Identifier l'état initial et l'état final.","Nommer le changement d'état dans le bon sens.","Préciser les conditions de température.","Distinguer un changement d'état d'une réaction chimique."],
      vocabulary:["Fusion","Solidification","Vaporisation","Ébullition","Condensation","État solide","État liquide","État gazeux"],
      essential:"La matière change d'état mais reste la même substance. Pour l'eau pure, fusion et solidification se produisent vers 0 °C, l'ébullition vers 100 °C sous pression normale."
    },
    "Les constituants de l’air": {
      definition:"L'air est un mélange homogène de plusieurs gaz, principalement du diazote et du dioxygène.",
      explanation:["L'air sec contient environ 78 % de diazote, 21 % de dioxygène et environ 1 % d'autres gaz, notamment l'argon et le dioxyde de carbone.","Le dioxygène est nécessaire à la respiration de nombreux êtres vivants et entretient les combustions ; le diazote est le gaz majoritaire de l'air.","La pollution de l'air peut provenir des fumées de véhicules, des brûlages, des industries et des poussières.","On réduit la pollution en limitant les brûlages, en entretenant les véhicules, en plantant des arbres et en utilisant des sources d'énergie moins polluantes."],
      example:"Dans 100 L d'air sec, on trouve approximativement 21 L de dioxygène, 78 L de diazote et 1 L d'autres gaz.",
      method:["Identifier le volume total d'air étudié.","Multiplier ce volume par le pourcentage du gaz recherché.","Diviser le résultat par 100.","Vérifier que les volumes obtenus ne dépassent pas le volume total."],
      vocabulary:["Air","Diazote","Dioxygène","Gaz","Pollution atmosphérique","Combustion"],
      essential:"L'air est un mélange : environ 78 % de diazote, 21 % de dioxygène et 1 % d'autres gaz."
    },
    "Combustion d’un solide et d’un liquide dans l’air": {
      definition:"Une combustion est une transformation chimique au cours de laquelle un combustible réagit avec un comburant, généralement le dioxygène, en libérant de l'énergie.",
      explanation:["Le combustible est le corps qui brûle ; le comburant est le corps qui permet la combustion. Dans l'air, le comburant est principalement le dioxygène.","La combustion du charbon de bois produit principalement du dioxyde de carbone lorsque la combustion est complète.","La combustion complète d'un alcool produit du dioxyde de carbone et de l'eau ; une combustion incomplète peut produire des substances dangereuses.","Une réaction chimique forme de nouvelles substances ; une transformation physique change l'état ou l'aspect sans former une nouvelle substance."],
      example:"Équation littérale : charbon + dioxygène → dioxyde de carbone. Pour l'éthanol, la combustion complète peut s'écrire : éthanol + dioxygène → dioxyde de carbone + eau.",
      method:["Identifier le combustible et le comburant.","Observer les produits formés sans inhaler les fumées.","Écrire l'équation littérale avec les réactifs à gauche et les produits à droite.","Respecter strictement les règles de sécurité et ne jamais réaliser de combustion sans encadrement."],
      vocabulary:["Combustible","Comburant","Combustion","Réactif","Produit","Réaction chimique"],
      essential:"Une combustion nécessite un combustible et un comburant. Elle produit de nouvelles substances et libère de l'énergie."
    },
    "Combustion d’un gaz dans l’air": {
      definition:"La combustion d'un gaz est une réaction chimique entre un gaz combustible et le dioxygène de l'air.",
      explanation:["Le butane et le propane sont des gaz combustibles utilisés notamment dans les appareils de cuisson.","Lorsque l'apport en dioxygène est suffisant, la combustion complète du butane produit du dioxyde de carbone et de l'eau.","Lorsque l'apport en dioxygène est insuffisant, la combustion peut être incomplète et produire du monoxyde de carbone, gaz toxique, et/ou de la suie.","Une flamme jaune, une fumée ou des dépôts noirs peuvent signaler une combustion imparfaite ; il faut arrêter l'appareil si cela peut être fait sans danger et faire vérifier l'installation."],
      example:"Équation littérale : butane + dioxygène → dioxyde de carbone + eau (combustion complète).",
      method:["Identifier le gaz combustible.","Observer la couleur de la flamme à distance et sans toucher l'appareil.","Distinguer combustion complète et incomplète.","Ne jamais chercher à provoquer volontairement une combustion incomplète."],
      vocabulary:["Butane","Propane","Combustion complète","Combustion incomplète","Monoxyde de carbone","Suie"],
      essential:"Une combustion incomplète peut produire du monoxyde de carbone, un gaz invisible et très toxique."
    },
    "Dangers des combustions": {
      definition:"Les combustions peuvent provoquer des brûlures, des incendies, des explosions et des intoxications par des fumées ou des gaz toxiques.",
      explanation:["Le monoxyde de carbone est un gaz incolore et inodore qui peut être mortel ; une mauvaise ventilation augmente le risque d'intoxication.","Une fuite de gaz peut former avec l'air un mélange inflammable ou explosif.","Il ne faut jamais laisser un feu sans surveillance, manipuler une bouteille de gaz défectueuse ou utiliser un appareil à combustion dans une pièce mal ventilée.","En cas d'odeur de gaz, ne pas allumer de flamme ni actionner d'interrupteur ; s'éloigner, prévenir un adulte et contacter les secours ou le service compétent."],
      example:"Une cuisine mal ventilée où fonctionne un appareil défectueux expose les occupants à un risque d'intoxication au monoxyde de carbone.",
      method:["Éloigner les matières inflammables.","Assurer une ventilation adaptée aux appareils à combustion.","Faire contrôler les installations par un professionnel.","En cas de danger, évacuer et alerter les secours ; ne pas se mettre en danger."],
      vocabulary:["Incendie","Explosion","Brûlure","Intoxication","Monoxyde de carbone","Ventilation","Extincteur"],
      essential:"La prévention repose sur l'entretien, la ventilation, la vigilance et l'appel rapide aux secours."
    },
    "Volume d’un liquide et d’un solide": {
      definition:"Le volume est la grandeur qui mesure l'espace occupé par un corps. La capacité indique le volume qu'un récipient peut contenir.",
      explanation:["L'unité légale du volume est le mètre cube (m³). On utilise aussi le litre (L), le décimètre cube (dm³), le millilitre (mL) et le centimètre cube (cm³).","Pour mesurer un liquide, on utilise un récipient gradué et on lit le bas du ménisque à hauteur des yeux.","Pour un solide de forme irrégulière, on mesure le volume initial du liquide puis le volume après immersion complète ; la différence donne le volume du solide.","Équivalences utiles : 1 L = 1 dm³ ; 1 mL = 1 cm³ ; 1 m³ = 1 000 L."],
      example:"L'eau passe de 40 mL à 57 mL après immersion d'un caillou : le volume du caillou est 57 − 40 = 17 mL, soit 17 cm³.",
      method:["Lire le volume initial V₁ dans l'éprouvette.","Immerger complètement le solide sans éclabousser.","Lire le volume final V₂.","Calculer le volume du solide : V = V₂ − V₁."],
      vocabulary:["Volume","Capacité","Mètre cube","Litre","Millilitre","Ménisque","Déplacement de liquide"],
      essential:"Pour un solide irrégulier, son volume est égal au volume final moins le volume initial du liquide."
    },
    "Masse d’un solide et d’un liquide": {
      definition:"La masse mesure la quantité de matière d'un corps. Son unité légale est le kilogramme (kg).",
      explanation:["On mesure la masse avec une balance : balance Roberval, balance électronique ou autre instrument adapté.","La simple pesée consiste à placer directement le solide sur la balance ou à peser un récipient contenant le liquide en tenant compte de la tare.","La double pesée peut permettre de déterminer la masse d'un liquide : on pèse le récipient vide puis le récipient contenant le liquide.","La masse du liquide est la différence entre la masse du récipient plein et celle du récipient vide."],
      example:"Un récipient vide a une masse de 120 g ; rempli, il a une masse de 365 g. La masse du liquide est 365 − 120 = 245 g.",
      method:["Vérifier que la balance est stable et réglée à zéro.","Mesurer la masse du récipient vide m₁.","Mesurer la masse du récipient avec le liquide m₂.","Calculer la masse du liquide : m = m₂ − m₁."],
      vocabulary:["Masse","Kilogramme","Gramme","Balance","Tare","Simple pesée","Double pesée"],
      essential:"Masse du liquide = masse du récipient plein − masse du récipient vide. Toujours écrire l'unité."
    }
  };

  F.lines = [
    math("Appartenance d'un point à une droite", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>A</mi><mo>∈</mo><mi>(d)</mi></mrow></math>', "A appartient à la droite (d)."),
    math("Non-appartenance d'un point à une droite", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>B</mi><mo>∉</mo><mi>(d)</mi></mrow></math>', "B n'appartient pas à la droite (d)."),
    math("Parallélisme et perpendicularité", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mtable><mtr><mtd><mi>(d)</mi><mo>∥</mo><mi>(d′)</mi></mtd><mtd><mtext>droites parallèles</mtext></mtd></mtr><mtr><mtd><mi>(d)</mi><mo>⊥</mo><mi>(d′)</mi></mtd><mtd><mtext>droites perpendiculaires</mtext></mtd></mtr></mtable></math>', "Les droites perpendiculaires forment un angle droit.")
  ];
  F.statistics.push(
    math("Retrouver un effectif", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mtext>Effectif</mtext><mo>=</mo><mi>f</mi><mo>×</mo><mi>N</mi></mrow></math>', "Multiplier la fréquence par l'effectif total.")
  );
  F.segment = [
    math("Milieu d'un segment", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>AI</mi><mo>=</mo><mi>IB</mi><mo>=</mo><mfrac><mi>AB</mi><mn>2</mn></mfrac></mrow></math>', "I est le milieu de [AB] si I appartient au segment et si AI = IB.")
  ];
  F.circle = [
    math("Appartenance à un cercle", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>M</mi><mo>∈</mo><mi>C</mi><mo>(</mo><mi>A</mi><mo>,</mo><mi>r</mi><mo>)</mo><mo>⇔</mo><mi>AM</mi><mo>=</mo><mi>r</mi></mrow></math>', "M appartient au cercle de centre A et de rayon r si et seulement si AM = r."),
    math("Rayon et diamètre", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>d</mi><mo>=</mo><mn>2</mn><mi>r</mi><mspace width="1em"/><mi>r</mi><mo>=</mo><mfrac><mi>d</mi><mn>2</mn></mfrac></mrow></math>', "Le diamètre est deux fois le rayon."),
    math("Périmètre d'un cercle", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>P</mi><mo>=</mo><mn>2</mn><mi>π</mi><mi>r</mi><mo>=</mo><mi>π</mi><mi>d</mi></mrow></math>', "P est la longueur du cercle ; d est le diamètre."),
    math("Aire d'un disque", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>A</mi><mo>=</mo><mi>π</mi><msup><mi>r</mi><mn>2</mn></msup></mrow></math>', "L'aire du disque s'exprime en unités carrées."),
    math("Aire d'un disque à partir du diamètre", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>A</mi><mo>=</mo><mfrac><mrow><mi>π</mi><msup><mi>d</mi><mn>2</mn></msup></mrow><mn>4</mn></mfrac></mrow></math>', "On peut utiliser le diamètre d au lieu du rayon."),
    math("Valeur approchée de pi", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>π</mi><mo>≈</mo><mn>3.14</mn></mrow></math>', "Pour obtenir une valeur approchée du périmètre ou de l'aire.")

  ];
  F.angles = [
    math("Angle nul", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>mesure</mi><mo>=</mo><mn>0</mn><mo>°</mo></mrow></math>', "Les deux côtés sont confondus."),
    math("Angle droit", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>mesure</mi><mo>=</mo><mn>90</mn><mo>°</mo></mrow></math>', "Un angle droit mesure 90 degrés."),
    math("Angle plat", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>mesure</mi><mo>=</mo><mn>180</mn><mo>°</mo></mrow></math>', "Un angle plat mesure 180 degrés."),
    math("Bissectrice d'un angle", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>mes</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>mes</mi><mo>(</mo><mi>y</mi><mo>)</mo></mrow></math>', "La bissectrice partage un angle en deux angles de même mesure.")
  ];
  F.triangle = [
    math("Périmètre d'un triangle", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>P</mi><mo>=</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi></mrow></math>', "Additionner les longueurs des trois côtés."),
    math("Aire d'un triangle", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>A</mi><mo>=</mo><mfrac><mrow><mi>b</mi><mo>×</mo><mi>h</mi></mrow><mn>2</mn></mfrac></mrow></math>', "b est la base choisie et h la hauteur correspondante.")
  ];
  F.parallelogram = [
    math("Périmètre d'un parallélogramme", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>P</mi><mo>=</mo><mn>2</mn><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo></mrow></math>', "a et b sont les longueurs de deux côtés consécutifs."),
    math("Aire d'un parallélogramme", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>A</mi><mo>=</mo><mi>b</mi><mo>×</mo><mi>h</mi></mrow></math>', "b est la base et h la hauteur perpendiculaire à cette base."),
    math("Propriété des diagonales", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>AO</mi><mo>=</mo><mi>OC</mi><mspace width="1em"/><mi>BO</mi><mo>=</mo><mi>OD</mi></mrow></math>', "Les diagonales se coupent en leur milieu O.")
  ];
  F.solid = [
    math("Aire d'une face rectangulaire du pavé", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>A</mi><mo>=</mo><mi>L</mi><mo>×</mo><mi>l</mi></mrow></math>', "Aire d'une face de dimensions L et l."),
    math("Aire latérale d'un pavé droit", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>A</mi><mtext>lat</mtext></msub><mo>=</mo><mn>2</mn><mi>h</mi><mo>(</mo><mi>L</mi><mo>+</mo><mi>l</mi><mo>)</mo></mrow></math>', "Somme des quatre faces latérales."),
    math("Aire totale d'un pavé droit", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>A</mi><mo>=</mo><mn>2</mn><mo>(</mo><mi>L</mi><mi>l</mi><mo>+</mo><mi>L</mi><mi>h</mi><mo>+</mo><mi>l</mi><mi>h</mi><mo>)</mo></mrow></math>', "Aire des six faces réunies."),
    math("Volume d'un pavé droit", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>V</mi><mo>=</mo><mi>L</mi><mo>×</mo><mi>l</mi><mo>×</mo><mi>h</mi></mrow></math>', "Multiplier longueur, largeur et hauteur."),
    math("Aire totale d'un cube", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>A</mi><mo>=</mo><mn>6</mn><msup><mi>a</mi><mn>2</mn></msup></mrow></math>', "Un cube possède six faces carrées de côté a."),
    math("Volume d'un cube", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>V</mi><mo>=</mo><msup><mi>a</mi><mn>3</mn></msup></mrow></math>', "a est la longueur d'une arête."),
    math("Aire d'une base du cylindre", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>A</mi><mtext>base</mtext></msub><mo>=</mo><mi>π</mi><msup><mi>r</mi><mn>2</mn></msup></mrow></math>', "La base est un disque de rayon r."),
    math("Aire latérale du cylindre", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>A</mi><mtext>lat</mtext></msub><mo>=</mo><mn>2</mn><mi>π</mi><mi>r</mi><mi>h</mi></mrow></math>', "Périmètre de la base multiplié par la hauteur."),
    math("Aire totale du cylindre", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>A</mi><mo>=</mo><mn>2</mn><mi>π</mi><mi>r</mi><mo>(</mo><mi>r</mi><mo>+</mo><mi>h</mi><mo>)</mo></mrow></math>', "Deux bases plus la surface latérale."),
    math("Volume d'un cylindre droit", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>V</mi><mo>=</mo><mi>π</mi><msup><mi>r</mi><mn>2</mn></msup><mi>h</mi></mrow></math>', "r est le rayon de la base et h la hauteur.")
  ];
  F.symmetry = [
    math("Centre de symétrie d'un segment", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>O</mi><mtext> est le milieu du segment </mtext><mo>[</mo><mi>AB</mi><mo>]</mo></mrow></math>', "Le milieu du segment est son centre de symétrie."),
    math("Centre de symétrie d'un cercle", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>O</mi><mo>=</mo><mtext>centre du cercle</mtext></mrow></math>', "Le centre du cercle est aussi le centre de symétrie du disque."),
    math("Centre de symétrie d'un parallélogramme", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>O</mi><mo>=</mo><mtext>intersection des diagonales</mtext></mrow></math>', "Le point d'intersection des diagonales est le centre de symétrie du parallélogramme.")
  ];
  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
  }
  function formulaFor(title) {
    const t = normalize(title);
    if (t.includes("entier naturel") || t.includes("entiers naturels")) return F.nat;
    if (t.includes("decimal relatif") || t.includes("decimaux relatifs")) return F.relatifs;
    if (t.includes("fraction")) return F.fractions;
    if (t.includes("proportion")) return F.proportion;
    if (t.includes("statist")) return F.statistics;
    if (t.includes("droite") || t.includes("point")) return F.lines;
    if (t.includes("segment")) return F.segment;
    if (t.includes("cercle") || t.includes("disque")) return F.circle;
    if (t.includes("angle")) return F.angles;
    if (t.includes("triangle")) return F.triangle;
    if (t.includes("parallelogramme")) return F.parallelogram;
    if (t.includes("symetr")) return F.symmetry;
    if (t.includes("pave") || t.includes("cylindre")) return F.solid;
    return [];
  }
  function applyCourse(target, course) {
    if (!target || !course) return;
    target.contentStatus = "Cours spécifique rédigé et enrichi selon le programme de 6e";
    target.definition = course.definition;
    target.explanation = course.explanation.slice();
    target.example = course.example;
    target.method = course.method.slice();
    target.vocabulary = course.vocabulary.slice();
    target.essential = course.essential;
    target.course = {
      ...(target.course || {}),
      definition: course.definition,
      explanation: course.explanation.slice(),
      example: course.example,
      method: course.method.slice(),
      vocabulary: course.vocabulary.slice(),
      essential: course.essential
    };
  }
  engine.buildAll = function (raw) {
    const all = previousBuildAll(raw);
    const audit = { mathLessonsWithFormulaBlocks: 0, physicsSpecificLessons: 0, subjects: {} };
    Object.keys(all || {}).forEach(subject => {
      const lessons = all[subject] && Array.isArray(all[subject].lessons) ? all[subject].lessons : [];
      audit.subjects[subject] = { lessons: lessons.length, formulaLessons: 0, physicsSpecific: 0 };
      lessons.forEach(lesson => {
        if (subject === "Mathématiques") {
          const blocks = formulaFor(lesson.title);
          if (blocks.length) {
            lesson.formulaBlocks = blocks;
            audit.mathLessonsWithFormulaBlocks++;
            audit.subjects[subject].formulaLessons++;
            (lesson.sessions || []).forEach((session, index) => { if (index === 0) session.formulaBlocks = blocks; else delete session.formulaBlocks; });
          }
        }
        if (subject === "Mathématiques" && normalize(lesson.title).includes("figures symetriques")) {
          const course = {
            contentStatus: "Cours spécifique aligné sur les consignes DPFC de 6e",
            definition: "Une figure admet un centre de symétrie lorsqu'on peut reconnaître un point autour duquel son organisation se retrouve après un demi-tour. En 6e, l'apprentissage porte surtout sur le repérage de ce centre et l'étude de figures usuelles.",
            explanation: [
              "On observe une figure, un motif ou un logo pour rechercher le point autour duquel son organisation se retrouve après un demi-tour.",
              "Le centre d'un cercle est son centre de symétrie.",
              "Le milieu d'un segment est son centre de symétrie.",
              "Dans un parallélogramme, le point d'intersection des diagonales est le centre de symétrie.",
              "Les propriétés étudiées portent notamment sur la conservation des longueurs, des mesures d'angles, de l'alignement et du parallélisme.",
              "Le guide DPFC précise que la formalisation générale de la notion de symétrie centrale et le vocabulaire image/antécédent ne sont pas exigibles en 6e."
            ],
            example: "Un logo peut présenter un centre de symétrie si, après un demi-tour autour d'un point précis, il retrouve la même disposition.",
            method: ["Observer la figure entière.", "Repérer un point candidat comme centre.", "Comparer les parties opposées.", "Vérifier avec un pliage, un calque ou un demi-tour.", "Justifier la reconnaissance avec les propriétés étudiées."],
            vocabulary: ["Centre de symétrie", "Demi-tour", "Milieu", "Diagonale", "Parallélogramme", "Alignement"],
            essential: "En 6e, il faut reconnaître le centre de symétrie éventuel d'une figure et connaître les cas du segment, du cercle et du parallélogramme."
          };
          Object.assign(lesson, course);
          lesson.exercises = [
            {level:"Reconnaissance",instruction:"Quel est le centre de symétrie d'un segment [AB] ?",correction:"C'est le milieu du segment [AB]."},
            {level:"Reconnaissance",instruction:"Quel est le centre de symétrie d'un parallélogramme ?",correction:"C'est le point d'intersection de ses diagonales."},
            {level:"Reconnaissance",instruction:"Quel est le centre de symétrie d'un cercle ?",correction:"C'est le centre du cercle."}
          ];
          lesson.quiz = [{question:"Quel point est le centre de symétrie d'un parallélogramme ?",answer:"Le point d'intersection de ses diagonales.",explanation:"Les diagonales se coupent en leur milieu."}];
          (lesson.sessions || []).forEach(session => {
            Object.assign(session, course);
            session.exercises = lesson.exercises;
            session.quiz = lesson.quiz;
          });
        }
        if (subject === "Physique-Chimie") {
          const key = Object.keys(PC).find(name => normalize(lesson.title).includes(normalize(name)) || normalize(name).includes(normalize(lesson.title)));
          if (key) {
            applyCourse(lesson, PC[key]);
            (lesson.sessions || []).forEach(session => applyCourse(session, PC[key]));
            const formulas = [];
            if (key === "Température d’un corps") formulas.push(
              math("Repères de l'échelle Celsius", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mtable><mtr><mtd><mi>T</mi><mo>(</mo><mtext>glace fondante</mtext><mo>)</mo></mtd><mtd><mo>=</mo></mtd><mtd><mn>0</mn><mo>°C</mo></mtd></mtr><mtr><mtd><mi>T</mi><mo>(</mo><mtext>eau bouillante</mtext><mo>)</mo></mtd><mtd><mo>≈</mo></mtd><mtd><mn>100</mn><mo>°C</mo></mtd></mtr><mtr><mtd><mi>T</mi><mo>(</mo><mtext>corps humain</mtext><mo>)</mo></mtd><mtd><mo>≈</mo></mtd><mtd><mn>37</mn><mo>°C</mo></mtd></mtr></mtable></math>', "Les valeurs sont des repères usuels ; l'ébullition dépend de la pression atmosphérique.")
            );
            if (key === "Les constituants de l’air") formulas.push(
              math("Volume de dioxygène", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>V</mi><msub><mi>O</mi><mn>2</mn></msub></msub><mo>=</mo><mfrac><mn>21</mn><mn>100</mn></mfrac><mo>×</mo><msub><mi>V</mi><mtext>air</mtext></msub></mrow></math>', "Pour un volume d'air sec donné, le dioxygène représente environ 21 %."),
              math("Volume de diazote", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>V</mi><msub><mi>N</mi><mn>2</mn></msub></msub><mo>=</mo><mfrac><mn>78</mn><mn>100</mn></mfrac><mo>×</mo><msub><mi>V</mi><mtext>air</mtext></msub></mrow></math>', "Le diazote représente environ 78 % de l'air sec.")
            );
            if (key === "Volume d’un liquide et d’un solide") formulas.push(
              math("Volume d'un solide par déplacement", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>V</mi><mtext>solide</mtext></msub><mo>=</mo><msub><mi>V</mi><mn>2</mn></msub><mo>−</mo><msub><mi>V</mi><mn>1</mn></msub></mrow></math>', "V₁ est le volume initial du liquide et V₂ le volume après immersion."),
              math("Équivalences de volume", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mtable><mtr><mtd><mn>1</mn><mtext> L</mtext></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn><msup><mtext>dm</mtext><mn>3</mn></msup></mtd></mtr><mtr><mtd><mn>1</mn><mtext> mL</mtext></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn><msup><mtext>cm</mtext><mn>3</mn></msup></mtd></mtr><mtr><mtd><mn>1</mn><msup><mtext>m</mtext><mn>3</mn></msup></mtd><mtd><mo>=</mo></mtd><mtd><mn>1000</mn><mtext> L</mtext></mtd></mtr></mtable></math>', "Ces équivalences sont indispensables pour convertir les mesures."),
              math("Volume d’un pavé droit", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>V</mi><mo>=</mo><mi>L</mi><mo>×</mo><mi>l</mi><mo>×</mo><mi>h</mi></mrow></math>', "Pour un solide de forme pavé droit, multiplier longueur, largeur et hauteur."),
              math("Volume d’un cube", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>V</mi><mo>=</mo><msup><mi>a</mi><mn>3</mn></msup></mrow></math>', "Pour un cube, a désigne la longueur d’une arête.")
            );
            if (key === "Masse d’un solide et d’un liquide") formulas.push(
              math("Masse d'un liquide par double pesée", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>m</mi><mtext>liquide</mtext></msub><mo>=</mo><msub><mi>m</mi><mtext>récipient plein</mtext></msub><mo>−</mo><msub><mi>m</mi><mtext>récipient vide</mtext></msub></mrow></math>', "Soustraire la masse du récipient vide de celle du récipient plein."),
              math("Conversions de masse", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mtable><mtr><mtd><mn>1</mn><mtext> kg</mtext></mtd><mtd><mo>=</mo></mtd><mtd><mn>1000</mn><mtext> g</mtext></mtd></mtr><mtr><mtd><mn>1</mn><mtext> g</mtext></mtd><mtd><mo>=</mo></mtd><mtd><mn>1000</mn><mtext> mg</mtext></mtd></mtr></mtable></math>', "Pour convertir kg en g, multiplier par 1 000 ; pour convertir g en kg, diviser par 1 000.")
            );
            if (key === "Combustion d’un solide et d’un liquide dans l’air") formulas.push(
              math("Combustion complète du carbone", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>C</mi><mo>+</mo><msub><mi>O</mi><mn>2</mn></msub><mo>→</mo><msub><mi>CO</mi><mn>2</mn></msub></mrow></math>', "Écriture symbolique pour le carbone qui brûle dans le dioxygène ; le programme demande notamment de savoir écrire les équations littérales."),
              math("Combustion complète de l'éthanol", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>C</mi><mn>2</mn></msub><msub><mi>H</mi><mn>5</mn></msub><mi>OH</mi><mo>+</mo><mn>3</mn><msub><mi>O</mi><mn>2</mn></msub><mo>→</mo><mn>2</mn><msub><mi>CO</mi><mn>2</mn></msub><mo>+</mo><mn>3</mn><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi></mrow></math>', "Équation équilibrée donnée comme approfondissement : les atomes de chaque élément sont conservés.")
            );
            if (key === "Combustion d’un gaz dans l’air") formulas.push(
              math("Combustion complète du butane", '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mn>2</mn><msub><mi>C</mi><mn>4</mn></msub><msub><mi>H</mi><mn>10</mn></msub><mo>+</mo><mn>13</mn><msub><mi>O</mi><mn>2</mn></msub><mo>→</mo><mn>8</mn><msub><mi>CO</mi><mn>2</mn></msub><mo>+</mo><mn>10</mn><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi></mrow></math>', "Équation équilibrée de la combustion complète du butane, présentée en approfondissement.")
            );


            if (formulas.length) {
              lesson.formulaBlocks = formulas;
              (lesson.sessions || []).forEach((session, index) => { if (index === 0) session.formulaBlocks = formulas; else delete session.formulaBlocks; });
            }
            audit.physicsSpecificLessons++;
            audit.subjects[subject].physicsSpecific++;
          }
        }
      });
    });
    engine.scienceFormulaAudit = audit;
    return all;
  };
  engine.scienceFormulaVersion = "1.0";
})();