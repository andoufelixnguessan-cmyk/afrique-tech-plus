/* ATP SCHOOL — compléments disciplinaires ciblés 6e
 * Rédactions pédagogiques originales structurées selon les intitulés DPFC.
 */
(function () {
  "use strict";
  const engine = window.ATP_LEARNING_CONTENT_6E;
  if (!engine || typeof engine.buildAll !== "function") return;
  const previousBuildAll = engine.buildAll;
  const norm = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
  const make = (definition, objectives, explanation, example, method, vocabulary, essential, exercises, quiz) => ({
    definition, objectives, explanation, example, method, vocabulary, essential, exercises, quiz
  });

  const ARTS = [
    ["matériel d expression graphique", make(
      "Le matériel d'expression graphique regroupe les outils et les supports utilisés pour tracer, dessiner, colorier et réaliser une production plastique.",
      ["Identifier les outils et les supports courants.", "Choisir un matériel adapté à l'effet recherché.", "Entretenir et ranger correctement le matériel."],
      ["Les crayons graphite permettent de tracer des lignes et de varier les valeurs par la pression.", "Les crayons de couleur, pastels, feutres et pinceaux servent à colorer avec des effets différents.", "Les supports peuvent être le papier, le carton, le tissu ou un support de récupération propre.", "Le choix du matériel dépend de l'intention, de la technique, du support et du résultat attendu.", "Les outils doivent être utilisés proprement, sans gaspillage et rangés après l'activité."],
      "Pour dessiner une maison, on peut commencer au crayon graphite sur papier, puis ajouter des couleurs avec des crayons ou de la peinture.",
      ["Lire la consigne et identifier l'effet recherché.", "Choisir le support adapté.", "Sélectionner les outils nécessaires.", "Faire un essai sur une petite zone.", "Nettoyer et ranger le matériel."],
      ["Crayon graphite","Fusain","Pastel","Feutre","Pinceau","Support","Outil graphique"],
      "Un bon choix de matériel facilite la réalisation et doit respecter le support et la consigne.",
      [{level:"Application",instruction:"Choisis deux outils pour dessiner une affiche et explique leur utilité.",correction:"Exemple : crayon graphite pour le croquis et feutres ou peinture pour renforcer les contours et les couleurs."}],
      [{question:"Pourquoi choisit-on le matériel avant de commencer une production ?",answer:"Parce que chaque outil produit des effets différents et doit être adapté au support et à l'objectif.",explanation:"Le choix du matériel influence le résultat."}]
    )],
    ["agents graphiques", make(
      "Les agents graphiques sont les éléments visuels de base utilisés pour construire une image : point, ligne, tache et forme.",
      ["Identifier les principaux agents graphiques.", "Varier leur taille, leur direction et leur organisation.", "Composer une image à partir de plusieurs agents."],
      ["Le point peut attirer le regard, créer une texture ou former un motif lorsqu'il est répété.", "La ligne peut être droite, courbe, brisée, horizontale, verticale ou oblique.", "La tache est une surface colorée ou ombrée qui organise les masses de l'image.", "La forme peut être géométrique ou organique ; elle peut être pleine ou seulement délimitée par un contour.", "La répétition, le contraste et le rythme donnent une organisation à la composition."],
      "Un paysage peut être construit avec des lignes horizontales pour le sol, des formes pour les maisons et des points pour représenter des fleurs.",
      ["Choisir le sujet.", "Faire apparaître les grandes formes.", "Utiliser des lignes pour organiser l'espace.", "Ajouter points et taches pour enrichir l'image.", "Vérifier que les éléments restent lisibles."],
      ["Point","Ligne","Tache","Forme","Contour","Rythme","Contraste"],
      "Les agents graphiques sont les briques de base d'une production visuelle.",
      [{level:"Atelier",instruction:"Crée une composition en utilisant uniquement des points, des lignes et des formes.",correction:"La production doit montrer clairement les trois agents et une organisation volontaire de l'espace."}],
      [{question:"Cite quatre agents graphiques.",answer:"Le point, la ligne, la tache et la forme.",explanation:"Ils servent à construire une image."}]
    )],
    ["couleurs et des matieres", make(
      "La couleur est une perception visuelle liée à la lumière ; la matière désigne l'aspect et la texture de la surface d'un support ou d'un matériau.",
      ["Reconnaître les couleurs primaires et secondaires en peinture.", "Observer les contrastes et les nuances.", "Décrire la texture d'une matière."],
      ["Dans le mélange traditionnel des pigments enseigné au collège, on présente généralement le rouge, le jaune et le bleu comme couleurs primaires.", "Le mélange de deux couleurs primaires permet d'obtenir une couleur secondaire : orange, vert ou violet selon les mélanges.", "Une couleur peut être claire ou foncée ; on peut obtenir des nuances en modifiant les mélanges.", "Le contraste oppose des couleurs ou des valeurs pour rendre un élément plus visible.", "Une matière peut être lisse, rugueuse, granuleuse, brillante, mate, souple ou rigide."],
      "Sur une affiche, un titre foncé sur un fond clair est généralement plus facile à lire qu'un titre de même valeur que le fond.",
      ["Observer les couleurs et les matières disponibles.", "Réaliser de petits mélanges tests.", "Choisir une palette adaptée au message.", "Créer un contraste suffisant.", "Décrire les textures utilisées."],
      ["Couleur primaire","Couleur secondaire","Nuance","Contraste","Texture","Matière","Pigment"],
      "Les couleurs organisent le regard et les matières donnent une qualité tactile ou visuelle à l'œuvre.",
      [{level:"Application",instruction:"Nomme trois couleurs secondaires et indique comment les obtenir avec les couleurs primaires traditionnelles.",correction:"Orange : rouge + jaune ; vert : jaune + bleu ; violet : rouge + bleu."}],
      [{question:"À quoi sert le contraste dans une affiche ?",answer:"À différencier les éléments et à rendre le message plus lisible.",explanation:"Un contraste suffisant attire le regard."}]
    )],
    ["types de composition", make(
      "La composition est l'organisation des formes, lignes, couleurs et espaces dans une production plastique.",
      ["Identifier les principaux principes de composition.", "Organiser les éléments selon un objectif.", "Équilibrer les masses visuelles."],
      ["Une composition centrée place l'élément principal près du centre ; une composition décentrée répartit les éléments ailleurs dans l'espace.", "La symétrie crée une organisation équilibrée de part et d'autre d'un axe ; l'asymétrie peut aussi être équilibrée par les tailles, les couleurs et les positions.", "Les lignes horizontales, verticales et obliques orientent le regard.", "La hiérarchie visuelle permet de distinguer le titre, le sujet principal et les informations secondaires.", "L'espace vide peut aider à faire ressortir les éléments importants."],
      "Pour une affiche scolaire, le titre peut être placé en haut, l'image principale au centre et les informations pratiques en bas.",
      ["Définir le message.", "Placer les éléments principaux en croquis.", "Choisir un point focal.", "Répartir les masses et les espaces vides.", "Vérifier l'équilibre et la lisibilité à distance."],
      ["Composition","Équilibre","Symétrie","Asymétrie","Axe","Point focal","Hiérarchie visuelle"],
      "Une composition claire guide le regard et rend le message compréhensible.",
      [{level:"Atelier",instruction:"Dessine deux compositions différentes pour le même sujet : l'une symétrique, l'autre asymétrique.",correction:"Les deux dessins doivent organiser les éléments différemment tout en conservant un équilibre visuel."}],
      [{question:"Qu'est-ce qu'un point focal ?",answer:"L'élément qui attire en premier le regard dans une composition.",explanation:"Il aide à organiser la hiérarchie visuelle."}]
    )],
    ["animation de surface", make(
      "L'animation de surface consiste à transformer l'aspect d'une surface par des motifs, répétitions, rythmes, contrastes et techniques graphiques.",
      ["Comprendre la notion de motif et de répétition.", "Identifier différents types de distribution.", "Réaliser une surface organisée."],
      ["Un motif est un élément graphique qui peut être répété pour créer un décor.", "La répétition régulière produit un rythme ordonné ; une alternance peut créer un rythme varié.", "La distribution peut être alignée, en quinconce, centrée, rayonnante ou libre selon l'effet recherché.", "La surface doit être remplie de manière cohérente sans rendre le motif illisible.", "Les techniques peuvent associer dessin, empreinte, collage ou impression."],
      "Un tissu peut être décoré par la répétition régulière de formes géométriques en deux couleurs.",
      ["Choisir une forme simple.", "Définir le type de distribution.", "Tracer des repères légers.", "Répéter le motif en gardant des espacements cohérents.", "Colorer et vérifier l'ensemble."],
      ["Surface","Motif","Répétition","Distribution","Rythme","Alternance","Quinconce"],
      "L'animation d'une surface repose sur l'organisation et la répétition maîtrisée des motifs.",
      [{level:"Production",instruction:"Crée un motif répétitif pour décorer une bande de papier.",correction:"Le motif doit être identifiable, répété avec régularité et présenter une organisation visible."}],
      [{question:"Qu'est-ce qu'un motif ?",answer:"Un élément graphique utilisé seul ou répété dans une composition.",explanation:"La répétition de motifs peut créer un rythme."}]
    )],
    ["civisme fiscal", make(
      "Le civisme fiscal est le comportement qui consiste à respecter les obligations fiscales et à comprendre que l'impôt contribue au financement des services publics.",
      ["Identifier le message du civisme fiscal.", "Relier l'impôt aux services collectifs.", "Créer un visuel de sensibilisation."],
      ["Les recettes fiscales participent au financement des écoles, des centres de santé, des routes et d'autres services publics.", "Une affiche de sensibilisation doit transmettre une idée exacte et compréhensible.", "Le message doit être court, lisible et associé à une image pertinente.", "Le logo ou les symboles officiels ne doivent pas être déformés ni utilisés de façon trompeuse."],
      "Slogan possible : « L'impôt contribue aux services utiles à tous ». L'affiche peut montrer une école, une route et un centre de santé.",
      ["Définir le message principal.", "Choisir un slogan court.", "Dessiner une image liée au sujet.", "Organiser le texte et l'image.", "Vérifier l'orthographe et la lisibilité."],
      ["Impôt","Civisme fiscal","Service public","Slogan","Sensibilisation","Affiche"],
      "Une affiche citoyenne doit informer sans déformer les faits et rendre le message facile à lire.",
      [{level:"Création",instruction:"Réalise une affiche de sensibilisation au civisme fiscal avec un slogan et une illustration.",correction:"L'affiche doit montrer le lien entre l'impôt et l'intérêt collectif, avec un texte court et une composition lisible."}],
      [{question:"À quoi contribuent les recettes fiscales ?",answer:"Au financement des services et équipements publics.",explanation:"Elles servent notamment à financer écoles, santé et infrastructures."}]
    )],
    ["impression graphique", make(
      "L'impression graphique est un procédé qui permet de transférer une image ou un motif depuis une matrice vers un support.",
      ["Identifier quelques procédés d'impression.", "Comprendre le rôle d'une matrice.", "Réaliser une impression simple en sécurité."],
      ["Une matrice est une surface préparée qui porte le motif à reproduire.", "Le pochoir laisse passer la couleur dans les zones découpées ; le tampon transfère une forme encrée ; l'empreinte reproduit la texture d'un objet.", "L'impression peut être répétée pour obtenir plusieurs exemplaires proches.", "Il faut protéger la table, utiliser une quantité raisonnable de peinture et nettoyer les outils."],
      "Un pochoir en carton permet de reproduire plusieurs fois la même forme sur une feuille.",
      ["Dessiner le motif.", "Préparer une matrice adaptée.", "Fixer le support.", "Appliquer la couleur sans excès.", "Retirer la matrice et laisser sécher."],
      ["Impression","Matrice","Pochoir","Tampon","Empreinte","Encrage","Support"],
      "La matrice permet de reproduire un motif ; la qualité dépend du contact, de l'encrage et du support.",
      [{level:"Pratique",instruction:"Explique comment utiliser un pochoir pour imprimer une forme plusieurs fois.",correction:"Découper la forme, placer le pochoir, appliquer la couleur avec peu de matière, retirer puis repositionner soigneusement."}],
      [{question:"Quel est le rôle d'une matrice ?",answer:"Porter le motif qui sera transféré sur le support.",explanation:"Elle sert à reproduire l'image."}]
    )],
    ["renovation de l environnement", make(
      "La rénovation de l'environnement immédiat consiste à améliorer un lieu de vie par des actions d'entretien, d'embellissement et de protection.",
      ["Observer un espace et repérer ses besoins.", "Proposer une amélioration réaliste.", "Créer un projet plastique utile à la communauté."],
      ["Un environnement propre et organisé favorise le bien-être et la santé.", "Les actions peuvent comprendre le nettoyage encadré, la décoration de panneaux, la peinture autorisée, le tri et la plantation.", "Une rénovation doit respecter les règles de sécurité, les autorisations et les matériaux disponibles.", "Une production artistique peut sensibiliser à la propreté et au respect des espaces communs."],
      "Une classe peut concevoir des panneaux illustrés pour rappeler de jeter les déchets dans les poubelles.",
      ["Observer le lieu sans toucher aux installations dangereuses.", "Identifier un problème précis.", "Proposer une action réalisable.", "Dessiner le projet et choisir les matériaux.", "Réaliser l'action avec l'accord et l'encadrement des responsables."],
      ["Environnement","Rénovation","Embellissement","Entretien","Recyclage","Espace commun"],
      "Un projet de rénovation doit être utile, sûr, autorisé et adapté aux besoins du lieu.",
      [{level:"Projet",instruction:"Propose un projet d'embellissement de la cour de ton collège.",correction:"Le projet doit préciser le besoin, le résultat visé, les matériaux, les étapes et les précautions de sécurité."}],
      [{question:"Pourquoi faut-il demander l'autorisation avant de modifier un espace scolaire ?",answer:"Pour respecter les règles de l'établissement et garantir la sécurité.",explanation:"Un projet doit être validé et encadré."}]
    )],
    ["oeuvres d art prehistorique", make(
      "L'art préhistorique désigne les productions visuelles réalisées par des sociétés humaines avant l'apparition de l'écriture dans les régions étudiées.",
      ["Décrire une œuvre préhistorique.", "Identifier matériaux et techniques possibles.", "Proposer une interprétation prudente de son rôle."],
      ["Les œuvres préhistoriques peuvent comprendre peintures, gravures, sculptures, objets décorés et parures.", "Les artistes ont utilisé des matériaux disponibles dans leur environnement : pigments minéraux, charbon, pierre, os ou argile.", "Les représentations d'animaux, de signes et de scènes de vie renseignent sur les sociétés anciennes.", "Le rôle exact d'une œuvre peut rester incertain ; il faut distinguer ce que l'on observe de ce que l'on suppose."],
      "Une peinture ancienne représentant un animal peut être décrite par ses formes, ses couleurs, son support et sa technique avant de proposer une interprétation.",
      ["Observer l'œuvre dans son ensemble.", "Décrire les formes, couleurs et matières.", "Identifier les techniques visibles.", "Situer le contexte connu.", "Séparer description et hypothèse sur le sens."],
      ["Préhistoire","Pigment","Gravure","Peinture rupestre","Support","Vestige","Interprétation"],
      "On décrit d'abord les caractéristiques visibles d'une œuvre avant de proposer une interprétation.",
      [{level:"Analyse",instruction:"Décris une œuvre préhistorique à partir de son sujet, de ses matériaux et de sa technique.",correction:"La réponse doit décrire des éléments observables et présenter toute interprétation comme une hypothèse."}],
      [{question:"Pourquoi faut-il distinguer observation et interprétation ?",answer:"Parce que l'observation décrit ce qui est visible, tandis que l'interprétation propose une explication.",explanation:"Cette distinction évite d'affirmer comme certain ce qui reste hypothétique."}]
    )],
    ["consequences de la guerre", make(
      "Une œuvre d'art témoin des conséquences de la guerre est une production qui représente, évoque ou conserve la mémoire des souffrances et destructions liées aux conflits.",
      ["Décrire une œuvre liée à la guerre.", "Identifier son message et son contexte.", "Respecter la dignité des personnes représentées."],
      ["Une œuvre peut témoigner des destructions, déplacements, pertes, blessures et efforts de reconstruction.", "Les artistes utilisent formes, couleurs, matières et symboles pour transmettre une émotion ou un message.", "L'analyse doit éviter le sensationnalisme et respecter les victimes.", "Une œuvre peut contribuer à la mémoire et à la sensibilisation à la paix."],
      "Un dessin représentant une maison détruite peut inviter à réfléchir aux conséquences de la guerre sur les familles.",
      ["Observer les éléments représentés.", "Décrire les formes, couleurs et symboles.", "Identifier le message possible.", "Relier l'œuvre à son contexte sans inventer de faits.", "Formuler une conclusion respectueuse."],
      ["Témoignage","Mémoire","Conflit","Dignité","Symbole","Reconstruction","Paix"],
      "Une œuvre de mémoire se décrit avec précision et s'analyse dans le respect des personnes concernées.",
      [{level:"Analyse",instruction:"Explique comment une œuvre plastique peut sensibiliser aux conséquences de la guerre.",correction:"Elle peut représenter les pertes, les destructions ou les déplacements et transmettre un message de mémoire et de paix."}],
      [{question:"Quel principe doit guider l'analyse d'une œuvre liée à la guerre ?",answer:"Le respect de la dignité des personnes et des victimes.",explanation:"L'analyse ne doit pas transformer la souffrance en spectacle."}]
    )]
  ];

  const EDHC = [
    ["droits a la survie", make(
      "Les droits à la survie et à la protection garantissent à chaque enfant les conditions nécessaires à sa vie, sa santé, sa sécurité et son développement.",
      ["Citer des droits fondamentaux de l'enfant.", "Reconnaître une situation qui menace la protection.", "Identifier les personnes ressources."],
      ["Le droit à la vie et à la santé implique l'accès aux soins et à des conditions de vie dignes.", "Le droit à l'identité comprend notamment le nom et l'enregistrement de la naissance.", "La protection concerne les violences, la négligence, l'exploitation et les dangers.", "L'enfant a droit à l'éducation, à la protection et à l'écoute, sans discrimination.", "En cas de danger, il faut chercher l'aide d'un adulte de confiance ou d'un service compétent."],
      "Un enfant malade doit pouvoir être conduit dans une structure de santé et bénéficier de soins adaptés.",
      ["Décrire la situation.", "Identifier le droit concerné.", "Repérer le danger éventuel.", "Alerter une personne responsable.", "Respecter la confidentialité et la dignité de l'enfant."],
      ["Droit de l'enfant","Survie","Protection","Identité","Santé","Sécurité","Non-discrimination"],
      "Les droits de l'enfant protègent sa vie, sa santé, son identité et son développement.",
      [{level:"Situation",instruction:"Cite trois droits qui protègent un enfant et explique leur importance.",correction:"Droit à la santé, à l'éducation et à la protection, par exemple ; ils contribuent à son développement et à sa sécurité."}],
      [{question:"Que faire si un enfant est en danger ?",answer:"Se mettre en sécurité et prévenir un adulte de confiance ou un service compétent.",explanation:"La protection de l'enfant est prioritaire."}]
    )],
    ["droits de l homme", make(
      "Les droits de l'homme sont des droits et libertés fondamentaux reconnus à toute personne en raison de sa dignité humaine.",
      ["Citer des droits fondamentaux.", "Expliquer l'importance de l'égalité et de la dignité.", "Identifier des comportements qui respectent ou violent les droits."],
      ["Les droits fondamentaux concernent toutes les personnes sans distinction d'origine, de sexe, de langue, de croyance ou de situation sociale.", "Ils comprennent notamment le droit à la vie, à l'éducation, à la santé, à la liberté et à la sécurité.", "Le respect des droits d'une personne implique de respecter ceux des autres.", "Une discrimination consiste à traiter injustement une personne ou un groupe en raison d'une caractéristique.", "Les institutions et les citoyens ont des responsabilités dans la protection des droits."],
      "Permettre à chaque élève d'accéder aux cours sans discrimination est une manière de respecter le droit à l'éducation.",
      ["Identifier la personne concernée.", "Nommer le droit en jeu.", "Décrire le comportement observé.", "Proposer une solution qui protège la dignité et l'égalité."],
      ["Droit humain","Dignité","Égalité","Liberté","Discrimination","Respect"],
      "Les droits de l'homme sont universels et doivent être respectés dans la vie quotidienne.",
      [{level:"Application",instruction:"Donne deux exemples de comportements qui respectent les droits de l'homme à l'école.",correction:"Écouter chacun sans discrimination et permettre à tous les élèves de participer aux activités."}],
      [{question:"Les droits fondamentaux s'appliquent-ils à toutes les personnes ?",answer:"Oui, sans discrimination.",explanation:"Ils sont liés à la dignité humaine."}]
    )],
    ["droit international humanitaire", make(
      "Le droit international humanitaire (DIH) est l'ensemble des règles qui cherchent à limiter les effets des conflits armés et à protéger les personnes qui ne participent pas ou plus aux combats.",
      ["Expliquer le rôle du DIH.", "Identifier les personnes protégées.", "Comprendre le respect de la dignité humaine en temps de conflit."],
      ["Le DIH protège notamment les civils, les blessés, les malades, les prisonniers et les personnels de secours dans les conditions prévues par les règles applicables.", "Les attaques ne doivent pas viser les civils ni les biens civils protégés.", "Les personnes capturées ou blessées doivent être traitées humainement.", "Les personnels et structures sanitaires bénéficient d'une protection particulière.", "Le DIH ne décide pas si une guerre est juste ; il encadre la conduite des parties pendant un conflit."],
      "Un hôpital et les équipes médicales doivent être respectés et protégés selon les règles du droit humanitaire.",
      ["Identifier la situation de conflit.", "Repérer les personnes qui ne participent pas aux combats.", "Déterminer le principe de protection concerné.", "Expliquer pourquoi la dignité humaine doit être respectée."],
      ["DIH","Conflit armé","Civil","Blessé","Prisonnier","Protection","Dignité humaine"],
      "Même en temps de guerre, des règles protègent les personnes et limitent les souffrances.",
      [{level:"Application",instruction:"Pourquoi les civils et les blessés doivent-ils être protégés pendant un conflit ?",correction:"Ils ne participent pas aux combats ou ne peuvent plus combattre ; leur dignité et leur vie doivent être respectées."}],
      [{question:"Le DIH cherche-t-il à protéger les civils ?",answer:"Oui.",explanation:"Il vise notamment à protéger les personnes qui ne participent pas aux hostilités."}]
    )],
    ["regles de vie en famille", make(
      "Les règles de vie en famille et en communauté sont des repères qui organisent les relations, protègent chacun et facilitent la vie collective.",
      ["Identifier des règles de vie commune.", "Distinguer droits et devoirs.", "Résoudre un désaccord par le dialogue."],
      ["Le respect, l'écoute, l'entraide et la politesse facilitent la vie familiale et communautaire.", "Les règles doivent être comprises et appliquées de manière équitable.", "Chaque personne possède des droits mais aussi des responsabilités adaptées à son âge et à sa situation.", "Un conflit peut être résolu par l'écoute, l'explication des faits, la médiation et un accord respectueux.", "La violence, l'humiliation et la discrimination ne sont pas des moyens acceptables de régler un désaccord."],
      "Dans une famille, répartir les tâches selon les capacités de chacun peut éviter les conflits et favoriser l'entraide.",
      ["Décrire le désaccord sans insulter.", "Écouter chaque personne.", "Identifier la règle commune.", "Proposer une solution juste.", "Vérifier que chacun peut la respecter."],
      ["Règle","Droit","Devoir","Respect","Solidarité","Dialogue","Médiation"],
      "La vie en communauté repose sur des règles justes, le respect mutuel et le règlement pacifique des conflits.",
      [{level:"Situation",instruction:"Propose une solution à un désaccord entre deux élèves qui veulent utiliser le même matériel.",correction:"Ils peuvent écouter leurs besoins, partager le temps d'utilisation ou établir un ordre de passage équitable."}],
      [{question:"Quel moyen privilégier pour résoudre un conflit ?",answer:"Le dialogue et, si nécessaire, la médiation.",explanation:"La solution doit respecter la dignité de chacun."}]
    )],
    ["principes democratiques", make(
      "La démocratie est un mode d'organisation de la vie collective fondé sur la participation, l'égalité devant la loi, le respect des droits et le choix des représentants selon des règles.",
      ["Citer des principes démocratiques.", "Comprendre le rôle d'une élection.", "Relier justice sociale et égalité des droits."],
      ["La participation permet aux citoyens de prendre part aux décisions collectives selon les règles.", "Une élection doit être organisée avec des règles connues, un vote libre et un dépouillement transparent.", "La majorité peut décider, mais les droits des minorités doivent être respectés.", "La justice sociale vise à réduire les injustices et à garantir l'accès équitable aux droits et aux services.", "Le débat démocratique exige écoute, arguments et respect des opinions différentes."],
      "Dans une classe, les élèves peuvent élire un délégué au moyen d'un vote secret et d'un dépouillement transparent.",
      ["Présenter les candidats et les règles.", "Permettre à chacun de voter librement.", "Compter les voix sans les modifier.", "Annoncer le résultat.", "Respecter les droits de tous après l'élection."],
      ["Démocratie","Élection","Vote","Majorité","Minorité","Justice sociale","Participation"],
      "La démocratie associe participation et respect des droits de tous, y compris ceux qui sont minoritaires.",
      [{level:"Application",instruction:"Cite trois règles qui rendent une élection juste.",correction:"Vote libre, secret du vote et dépouillement transparent, par exemple."}],
      [{question:"Une majorité peut-elle supprimer les droits d'une minorité ?",answer:"Non.",explanation:"Les droits fondamentaux doivent être respectés par tous."}]
    )],
    ["activites du secteur primaire", make(
      "Les activités agro-pastorales regroupent les activités agricoles et d'élevage qui produisent des aliments et des matières premières.",
      ["Identifier des activités agricoles et pastorales.", "Expliquer leur contribution à la vie économique.", "Repérer des possibilités d'initiative et d'emploi."],
      ["L'agriculture comprend la culture de plantes comme le manioc, l'igname, le riz, le maïs, le cacao ou le café.", "L'élevage concerne notamment les volailles, les bovins, les caprins, les ovins et les porcins.", "Ces activités fournissent des aliments, des matières premières et des revenus.", "Elles demandent des connaissances, de l'organisation, de l'eau, des soins, des outils et le respect de l'environnement.", "La transformation et la commercialisation créent aussi des activités économiques."],
      "Une petite activité de maraîchage peut produire des légumes pour le marché local si l'eau, le sol et les conditions d'entretien sont adaptés.",
      ["Identifier les ressources disponibles.", "Choisir une activité adaptée au milieu.", "Prévoir les besoins et les coûts.", "Respecter les règles sanitaires et environnementales.", "Organiser la production et la vente."],
      ["Agriculture","Élevage","Agro-pastoral","Production","Transformation","Commercialisation","Coopérative"],
      "Les activités agro-pastorales contribuent à l'alimentation et à l'emploi lorsqu'elles sont organisées durablement.",
      [{level:"Projet",instruction:"Propose une activité agro-pastorale simple qui pourrait être menée dans ta localité.",correction:"La réponse doit préciser la production, les ressources nécessaires, les débouchés et les précautions sanitaires ou environnementales."}],
      [{question:"Cite une activité agricole et une activité pastorale.",answer:"Culture du manioc ; élevage de poulets, par exemple.",explanation:"L'agriculture cultive des végétaux ; le pastoralisme concerne l'élevage."}]
    )]
  ];

  const TICE = [
    ["traitement de texte", make(
      "Un logiciel de traitement de texte permet de saisir, corriger, mettre en forme, enregistrer et imprimer des documents écrits.",
      ["Créer et enregistrer un document.", "Saisir et corriger un texte.", "Utiliser les fonctions de base du logiciel."],
      ["La zone de saisie permet d'écrire le texte ; le curseur indique où les caractères seront insérés.", "Les fonctions de sélection permettent de modifier un mot, une phrase ou un paragraphe.", "Les commandes enregistrer, ouvrir et imprimer servent à gérer le document.", "Il faut enregistrer régulièrement le travail dans un dossier connu.", "Un document doit être relu pour corriger les fautes et vérifier la présentation."],
      "Pour rédiger un devoir, saisir le titre, écrire les paragraphes puis enregistrer le fichier sous un nom précis.",
      ["Ouvrir le logiciel.", "Créer un document vierge.", "Saisir le texte.", "Relire et corriger.", "Enregistrer dans le bon dossier."],
      ["Traitement de texte","Curseur","Sélection","Document","Enregistrer","Ouvrir","Imprimer"],
      "Enregistrer régulièrement évite de perdre son travail.",
      [{level:"Pratique",instruction:"Décris les étapes pour créer et enregistrer un devoir de français.",correction:"Ouvrir le logiciel, créer un document, saisir le texte, relire, puis enregistrer avec un nom explicite dans le dossier choisi."}],
      [{question:"Pourquoi faut-il enregistrer régulièrement ?",answer:"Pour conserver les modifications et éviter de perdre le travail.",explanation:"Une panne ou une fermeture accidentelle peut faire perdre un document non enregistré."}]
    )],
    ["mise en forme de textes", make(
      "La mise en forme consiste à modifier l'apparence d'un texte pour le rendre clair, lisible et bien organisé.",
      ["Mettre en forme un titre et des paragraphes.", "Utiliser police, taille, alignement et interligne.", "Respecter une présentation cohérente."],
      ["La police désigne le dessin des caractères ; la taille détermine leur hauteur.", "Le gras, l'italique et le soulignement servent à mettre certains éléments en évidence sans excès.", "L'alignement à gauche, au centre, à droite ou justifié organise les paragraphes.", "Les listes à puces ou numérotées structurent des informations.", "Une bonne présentation utilise peu de polices et garde une hiérarchie stable entre titre, sous-titre et texte."],
      "Un devoir peut comporter un titre centré et en gras, des sous-titres visibles et des paragraphes alignés à gauche.",
      ["Sélectionner le texte concerné.", "Choisir une police lisible et une taille adaptée.", "Appliquer le style voulu.", "Organiser les paragraphes et les listes.", "Vérifier l'ensemble avant l'impression."],
      ["Police","Taille","Gras","Italique","Alignement","Paragraphe","Interligne"],
      "La mise en forme doit améliorer la lecture et non décorer excessivement le document.",
      [{level:"Application",instruction:"Propose une mise en forme simple pour un devoir scolaire.",correction:"Titre clair en gras, sous-titres distincts, texte lisible, paragraphes espacés et marges régulières."}],
      [{question:"Pourquoi ne faut-il pas utiliser trop de polices dans un même document ?",answer:"Pour garder une présentation cohérente et facile à lire.",explanation:"Trop de styles nuisent à la hiérarchie visuelle."}]
    )],
    ["impression de documents", make(
      "L'impression est l'opération qui permet de produire sur papier une copie d'un document numérique à l'aide d'une imprimante.",
      ["Identifier les éléments nécessaires à l'impression.", "Choisir les pages et le nombre de copies.", "Vérifier l'aperçu avant impression."],
      ["L'imprimante est un périphérique de sortie qui transfère le contenu numérique sur papier.", "Avant d'imprimer, il faut vérifier le document, l'orientation, le format du papier et les marges.", "L'aperçu avant impression permet de repérer les pages coupées ou mal organisées.", "Le nombre de copies et les pages à imprimer doivent être choisis avec attention pour éviter le gaspillage.", "Il faut respecter les consignes d'utilisation et économiser le papier et l'encre."],
      "Pour imprimer les pages 1 à 2 d'un devoir, vérifier d'abord l'aperçu puis sélectionner les pages concernées et une seule copie.",
      ["Ouvrir le document.", "Utiliser l'aperçu avant impression.", "Vérifier pages, orientation et format.", "Choisir l'imprimante et le nombre de copies.", "Lancer l'impression et récupérer les feuilles."],
      ["Imprimante","Aperçu","Orientation","Format papier","Copie","Encre"],
      "Toujours vérifier l'aperçu et les paramètres avant de lancer l'impression.",
      [{level:"Pratique",instruction:"Cite quatre paramètres à vérifier avant d'imprimer un document.",correction:"Imprimante, pages à imprimer, orientation, format papier et nombre de copies."}],
      [{question:"À quoi sert l'aperçu avant impression ?",answer:"À vérifier l'apparence des pages avant de les imprimer.",explanation:"Il aide à éviter les pages coupées et les impressions inutiles."}]
    )],
    ["internet", make(
      "Internet est un réseau mondial de réseaux informatiques qui permet d'échanger des informations et d'utiliser différents services.",
      ["Définir Internet simplement.", "Distinguer navigateur et moteur de recherche.", "Adopter des comportements prudents en ligne."],
      ["Le Web est un service accessible par Internet ; il permet de consulter des pages reliées par des liens.", "Un navigateur est un logiciel qui affiche les pages Web ; un moteur de recherche aide à trouver des pages à partir de mots-clés.", "Une adresse Web permet de localiser une ressource.", "Il faut vérifier l'auteur, la date et la fiabilité d'une information.", "Ne jamais communiquer un mot de passe, une adresse personnelle ou des informations privées à un inconnu."],
      "Pour rechercher un exposé sur les volcans, ouvrir un navigateur, saisir une adresse de moteur de recherche et utiliser des mots-clés précis.",
      ["Se connecter avec l'autorisation et les règles de l'établissement.", "Ouvrir un navigateur.", "Saisir une adresse ou lancer une recherche.", "Vérifier la source et la date.", "Fermer les pages et la session après utilisation."],
      ["Internet","Web","Navigateur","Page Web","Lien","Adresse Web","Source","Donnée personnelle"],
      "Internet donne accès à de nombreuses ressources, mais toute information doit être vérifiée et les données personnelles protégées.",
      [{level:"Sécurité",instruction:"Cite deux informations personnelles qu'il ne faut pas publier à un inconnu.",correction:"Mot de passe, adresse du domicile, numéro de téléphone ou données scolaires privées."}],
      [{question:"Un navigateur et un moteur de recherche sont-ils la même chose ?",answer:"Non. Le navigateur affiche les pages ; le moteur de recherche aide à les trouver.",explanation:"Ils ont des rôles différents."}]
    )],
    ["moteur de recherche", make(
      "Un moteur de recherche est un service en ligne qui indexe des pages et permet de retrouver des informations à partir de mots-clés.",
      ["Formuler une requête précise.", "Comparer plusieurs résultats.", "Évaluer la fiabilité d'une source."],
      ["Une requête efficace utilise des mots-clés précis plutôt qu'une phrase trop vague.", "Les résultats peuvent être des pages, images, vidéos ou documents ; leur ordre ne garantit pas leur fiabilité.", "Il faut vérifier le nom de l'organisme, l'auteur, la date et les références.", "Comparer plusieurs sources fiables permet de repérer les erreurs ou les informations contradictoires.", "Il faut éviter de copier un texte sans le comprendre ni citer la source utilisée."],
      "Au lieu de taper « animaux », saisir « alimentation des tortues terrestres site éducatif » pour obtenir des résultats plus ciblés.",
      ["Définir la question.", "Choisir deux ou trois mots-clés précis.", "Lire les titres et descriptions des résultats.", "Ouvrir les sources fiables.", "Comparer et noter les références."],
      ["Requête","Mot-clé","Résultat","Indexation","Source fiable","Auteur","Date"],
      "Un bon résultat de recherche doit être pertinent, vérifiable et adapté à la question.",
      [{level:"Recherche",instruction:"Propose une requête pour trouver une source officielle sur le programme de mathématiques de 6e en Côte d'Ivoire.",correction:"Exemple : « DPFC programme éducatif mathématiques 6e Côte d'Ivoire PDF »."}],
      [{question:"Le premier résultat affiché est-il toujours le plus fiable ?",answer:"Non.",explanation:"Il faut vérifier l'auteur, la date et l'organisme qui publie l'information."}]
    )]
  ];

  function apply(target, course) {
    if (!target || !course) return;
    target.contentStatus = "Cours spécifique rédigé — complément disciplinaire 6e";
    target.definition = course.definition;
    target.objectives = course.objectives.slice();
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
    target.exercises = course.exercises.map(x => ({...x}));
    target.quiz = course.quiz.map(x => ({...x}));
    target.revision = ["Définition : " + course.definition, "À retenir : " + course.essential, "Exemple : " + course.example];
  }

  engine.buildAll = function (raw) {
    const all = previousBuildAll(raw);
    const stats = { arts: 0, edhc: 0, tice: 0, missing: [] };
    Object.keys(all || {}).forEach(subject => {
      const lessons = all[subject] && Array.isArray(all[subject].lessons) ? all[subject].lessons : [];
      lessons.forEach(lesson => {
        const title = norm(lesson.title);
        let course = null;
        if (subject === "Arts plastiques") {
          const item = ARTS.find(([key]) => title.includes(norm(key)));
          if (item) { course = item[1]; stats.arts++; }
        } else if (subject === "EDHC") {
          const item = EDHC.find(([key]) => title.includes(norm(key)));
          if (item) { course = item[1]; stats.edhc++; }
        } else if (subject === "TICE") {
          const item = TICE.find(([key]) => title.includes(norm(key)));
          if (item) { course = item[1]; stats.tice++; }
        }
        if (course) {
          apply(lesson, course);
          (lesson.sessions || []).forEach(session => apply(session, course));
        }
      });
    });
    engine.complementaryAudit = stats;
    return all;
  };
  engine.complementaryContentVersion = "1.0";
})();