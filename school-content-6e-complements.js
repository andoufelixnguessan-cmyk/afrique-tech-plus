/* ATP SCHOOL — compléments disciplinaires ciblés 6e
 * Rédactions pédagogiques originales structurées selon les intitulés DPFC.
 */
(function () {
  "use strict";
  const engine = window.ATP_LEARNING_CONTENT_6E;
  if (!engine || typeof engine.buildAll !== "function") return;
  const previousBuildAll = engine.buildAll;
  const norm = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, " ").replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[^a-z0-9]+/g, " ").trim();
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
    ["correction des evaluations", make(
      "La correction d'une évaluation consiste à comparer ses réponses aux critères attendus, comprendre ses erreurs et préparer une amélioration.",
      ["Repérer les réussites et les difficultés.", "Identifier l'origine d'une erreur.", "Corriger et améliorer sa méthode."],
      ["Une erreur peut venir d'une mauvaise lecture de la consigne, d'un oubli, d'une technique mal maîtrisée ou d'un manque de soin.", "La correction ne consiste pas seulement à recopier la bonne réponse : il faut comprendre pourquoi elle est correcte.", "Une grille simple peut vérifier le respect du sujet, l'organisation, le choix des outils, la propreté et la qualité plastique.", "Les corrections servent à fixer un objectif concret pour la prochaine production."],
      "Si une affiche manque de lisibilité, l'élève peut agrandir le titre, renforcer le contraste et supprimer les détails inutiles.",
      ["Relire la consigne.", "Comparer le travail aux critères.", "Entourer les points réussis.", "Identifier une ou deux erreurs prioritaires.", "Refaire ou améliorer la production."],
      ["Évaluation","Critère","Correction","Erreur","Amélioration","Lisibilité","Soin"],
      "Une correction utile explique l'erreur et indique comment progresser.",
      [{level:"Auto-évaluation",instruction:"Choisis une production plastique et propose deux améliorations précises.",correction:"Les améliorations doivent être observables, par exemple mieux organiser les éléments et renforcer le contraste du titre."}],
      [{question:"Pourquoi faut-il comprendre une erreur au lieu de recopier seulement la correction ?",answer:"Pour éviter de refaire la même erreur et améliorer sa méthode.",explanation:"Comprendre l'origine de l'erreur aide à progresser."}]
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

  const EPS = [
    ["techniques de projection et de controle", make(
      "Les techniques de projection et de contrôle sont des actions motrices qui consistent à déséquilibrer, déplacer ou maîtriser un partenaire dans un cadre sportif réglementé.",
      ["Identifier les positions et les appuis.", "Réaliser des actions simples sous contrôle de l'enseignant.", "Respecter l'intégrité physique du partenaire."],
      ["Une projection est une action qui fait perdre l'équilibre au partenaire et l'amène au sol selon une technique autorisée.", "Le contrôle consiste à stabiliser une position sans geste dangereux ni pression sur une articulation.", "Les apprentissages se font progressivement, sur une surface adaptée et avec des partenaires de gabarit convenable.", "Il est interdit de frapper, étrangler, tordre une articulation ou poursuivre une action après le signal d'arrêt.", "Le respect, la maîtrise de soi et l'arrêt immédiat au signal sont indispensables."],
      "Lors d'un exercice encadré, l'élève apprend d'abord à adopter une posture stable et à accompagner un déplacement sans brutalité.",
      ["Écouter la démonstration.", "S'échauffer et vérifier le tapis.", "Répéter les placements sans force.", "Réaliser uniquement la technique autorisée.", "Arrêter au signal et vérifier que le partenaire va bien."],
      ["Appui","Déséquilibre","Projection","Contrôle","Partenaire","Tapis","Sécurité"],
      "La sécurité du partenaire passe avant la performance ; aucune technique dangereuse ne doit être improvisée.",
      [{level:"Sécurité",instruction:"Que doit faire un élève dès que le professeur donne le signal d'arrêt ?",correction:"Il arrête immédiatement l'action, relâche le partenaire et attend la consigne suivante."}],
      [{question:"Peut-on improviser une projection sans apprentissage ni encadrement ?",answer:"Non.",explanation:"Les techniques se réalisent progressivement sous la surveillance de l'enseignant."}]
    )],
    ["sauts hauteur", make(
      "Le saut en hauteur est une activité athlétique qui consiste à franchir une barre ou un obstacle placé à une hauteur donnée.",
      ["Identifier les phases du saut en hauteur.", "Coordonner course d'élan et impulsion.", "Franchir et réceptionner en sécurité."],
      ["Le saut comprend une course d'élan adaptée, une impulsion sur un pied, le franchissement de l'obstacle et une réception sur une zone sécurisée.", "L'élève doit respecter la zone d'élan et attendre que la zone de réception soit libre.", "La technique est adaptée au niveau de l'élève et au matériel disponible.", "La hauteur augmente progressivement ; la qualité du geste compte autant que la performance."],
      "Un élève commence par franchir une corde basse après une course d'élan courte et contrôlée.",
      ["Vérifier la zone et le matériel.", "S'échauffer.", "Prendre un élan régulier.", "Impulser sur un pied et franchir l'obstacle.", "Réceptionner sur la zone prévue."],
      ["Élan","Impulsion","Franchissement","Réception","Barre","Zone de chute"],
      "Le saut en hauteur demande coordination et réception sûre ; la hauteur doit être adaptée.",
      [{level:"Analyse",instruction:"Cite les phases essentielles du saut en hauteur.",correction:"Course d'élan, impulsion, franchissement et réception."}],
      [{question:"Pourquoi la zone de réception doit-elle être dégagée ?",answer:"Pour éviter les collisions et les blessures.",explanation:"La sécurité est prioritaire."}]
    )],
    ["saut en longueur", make(
      "Le saut en longueur est une épreuve athlétique dans laquelle l'élève cherche à parcourir la plus grande distance horizontale après une impulsion.",
      ["Identifier les phases du saut.", "Régler une course d'élan.", "Améliorer impulsion et réception."],
      ["Les phases sont la course d'élan, l'appel sur un pied, la phase aérienne et la réception dans la zone prévue.", "L'appel doit se faire avant la limite de la planche ou de la ligne d'appel.", "La réception se fait dans le sable ou sur une zone adaptée, jambes fléchies et sans mettre les mains derrière soi si cela peut déséquilibrer.", "La distance est mesurée entre la ligne d'appel et la marque la plus proche laissée dans la zone de réception."],
      "Après une course d'élan maîtrisée, l'élève prend son impulsion avant la ligne puis se réceptionne dans le sable.",
      ["Mesurer et régler l'élan.", "S'échauffer.", "Courir progressivement.", "Prendre l'appel avant la ligne.", "Projeter les jambes vers l'avant et réceptionner en sécurité."],
      ["Course d'élan","Appel","Impulsion","Phase aérienne","Réception","Planche d'appel"],
      "La performance dépend de l'élan, de l'appel et d'une réception contrôlée.",
      [{level:"Application",instruction:"Dans quel ordre se déroulent les phases du saut en longueur ?",correction:"Course d'élan, appel, phase aérienne, réception."}],
      [{question:"Sur quelle zone se fait généralement la réception ?",answer:"Dans un bac de sable ou une zone de réception adaptée.",explanation:"La zone amortit la réception."}]
    )],
    ["triple saut", make(
      "Le triple saut est une épreuve athlétique composée de trois bonds successifs avant la réception.",
      ["Nommer les trois phases de bonds.", "Coordonner les appuis.", "Respecter la zone d'appel et de réception."],
      ["Le triple saut enchaîne un cloche-pied, une foulée bondissante et un saut final.", "Le même pied réalise l'appel et la réception du cloche-pied ; le pied opposé intervient ensuite pour la foulée bondissante.", "La coordination et le rythme permettent de conserver l'équilibre et la vitesse.", "La réception finale doit se faire dans une zone dégagée et adaptée."],
      "L'élève répète d'abord les trois phases à faible vitesse avant de les enchaîner avec un élan progressif.",
      ["Apprendre chaque bond séparément.", "Répéter le rythme sans chercher la distance.", "Enchaîner cloche-pied, foulée bondissante et saut.", "Contrôler la réception."],
      ["Cloche-pied","Foulée bondissante","Saut","Appel","Coordination","Réception"],
      "Le triple saut exige un enchaînement précis : cloche-pied, foulée bondissante, saut.",
      [{level:"Rappel",instruction:"Nomme les trois bonds du triple saut dans l'ordre.",correction:"Cloche-pied, foulée bondissante, saut."}],
      [{question:"Combien de bonds successifs composent le triple saut ?",answer:"Trois.",explanation:"C'est l'origine du nom de l'épreuve."}]
    )],
    ["basketball", make(
      "Le basketball est un sport collectif où deux équipes cherchent à marquer en faisant entrer le ballon dans le panier adverse.",
      ["Se déplacer avec et sans ballon.", "Réaliser passes, dribbles et tirs simples.", "Respecter les règles et coopérer."],
      ["Le dribble permet de se déplacer avec le ballon ; marcher en tenant le ballon sans dribbler constitue une faute.", "La passe transmet le ballon à un partenaire mieux placé.", "Le tir vise le panier adverse ; la réussite dépend de l'équilibre et du geste.", "Les joueurs se démarquent pour proposer une solution de passe.", "Le contact dangereux, les poussées et les gestes antisportifs sont interdits."],
      "Un joueur dribble jusqu'à un espace libre puis passe à un partenaire démarqué qui tente un tir.",
      ["S'échauffer.", "Maîtriser le dribble à l'arrêt puis en déplacement.", "Réaliser des passes à deux.", "Enchaîner réception, déplacement et tir.", "Respecter les règles et le fair-play."],
      ["Dribble","Passe","Tir","Panier","Démarquage","Marcher","Défense"],
      "Le basketball repose sur le dribble, la passe, le tir et la coopération.",
      [{level:"Règle",instruction:"Pourquoi un joueur ne doit-il pas avancer avec le ballon sans dribbler ?",correction:"Parce que cela constitue une faute de marcher."}],
      [{question:"Quel geste permet de faire progresser le ballon en se déplaçant ?",answer:"Le dribble.",explanation:"Le joueur fait rebondir le ballon au sol."}]
    )],
    ["handball", make(
      "Le handball est un sport collectif où deux équipes utilisent principalement les mains pour faire circuler le ballon et marquer dans le but adverse.",
      ["Réaliser une passe et une réception.", "Se déplacer et tirer en respectant les règles.", "Coopérer en attaque et en défense."],
      ["La passe permet de faire circuler rapidement le ballon entre partenaires.", "Le joueur peut progresser en dribblant ou en effectuant les pas autorisés par les règles scolaires.", "Le tir vise le but adverse ; le gardien protège la zone de but.", "Les joueurs doivent respecter la zone du gardien et éviter les contacts dangereux.", "Le repli défensif permet de protéger son but après la perte du ballon."],
      "Après une passe, un joueur se déplace vers un espace libre pour recevoir à nouveau le ballon et tirer.",
      ["S'échauffer avec des passes.", "Travailler la réception à deux mains.", "Apprendre le dribble et le tir.", "Se démarquer en attaque.", "Revenir défendre sans pousser ni retenir un adversaire."],
      ["Passe","Réception","Dribble","Tir","Gardien","Zone de but","Repli défensif"],
      "Le handball demande des passes précises, des déplacements coordonnés et le respect de la zone du gardien.",
      [{level:"Tactique",instruction:"Pourquoi faut-il se déplacer après avoir fait une passe ?",correction:"Pour se démarquer et offrir une nouvelle solution à ses partenaires."}],
      [{question:"Quel joueur protège principalement le but ?",answer:"Le gardien.",explanation:"Il défend la zone de but selon les règles."}]
    )],
    ["volleyball", make(
      "Le volleyball est un sport collectif où deux équipes se renvoient un ballon au-dessus d'un filet afin de le faire tomber dans le camp adverse.",
      ["Réaliser une manchette et une passe simple.", "Se placer pour recevoir le ballon.", "Coopérer et respecter les règles de jeu."],
      ["Le service met le ballon en jeu depuis l'arrière du terrain.", "La réception contrôle le ballon envoyé par l'adversaire ; la manchette utilise les avant-bras rapprochés.", "La passe prépare l'attaque d'un partenaire.", "Une équipe dispose généralement de trois touches au maximum pour renvoyer le ballon, sans compter le contact de bloc selon les règles officielles.", "Les joueurs communiquent pour éviter que deux personnes se gênent sur le même ballon."],
      "Un joueur réceptionne un service en manchette, un partenaire fait une passe et un troisième renvoie le ballon au-dessus du filet.",
      ["S'échauffer les épaules et les jambes.", "Apprendre la position d'attente.", "Réaliser des manchettes à deux.", "Enchaîner réception et passe.", "Annoncer clairement « j'ai » pour communiquer."],
      ["Service","Réception","Manchette","Passe","Filet","Camp","Rotation"],
      "La communication et la qualité de réception sont essentielles au volleyball.",
      [{level:"Application",instruction:"Décris une séquence de trois touches permettant de renvoyer le ballon.",correction:"Réception en manchette, passe à un partenaire puis renvoi au-dessus du filet."}],
      [{question:"Combien de touches une équipe peut-elle généralement utiliser avant de renvoyer le ballon ?",answer:"Trois touches au maximum.",explanation:"C'est la règle de base enseignée au volleyball."}]
    )],
    ["football", make(
      "Le football est un sport collectif où deux équipes cherchent à marquer en envoyant le ballon dans le but adverse, principalement avec les pieds.",
      ["Contrôler et conduire le ballon.", "Réaliser une passe et un tir.", "Se démarquer et respecter les règles."],
      ["Le contrôle permet de maîtriser le ballon à sa réception.", "La conduite consiste à avancer en gardant le ballon près de soi.", "La passe transmet le ballon à un partenaire ; le tir vise le but.", "Les joueurs sans ballon se déplacent pour créer des espaces et proposer des solutions.", "Le gardien peut utiliser les mains dans sa surface de réparation selon les règles ; les autres joueurs ne jouent pas volontairement le ballon avec la main."],
      "Un joueur contrôle le ballon, lève la tête, passe à un partenaire démarqué puis se déplace pour recevoir de nouveau.",
      ["S'échauffer.", "Contrôler le ballon avec le pied.", "Conduire le ballon en changeant de direction.", "Faire des passes courtes.", "Tirer vers une cible et respecter les autres joueurs."],
      ["Contrôle","Conduite","Passe","Tir","Démarquage","Gardien","Fair-play"],
      "Le football repose sur le contrôle, la conduite, la passe, le tir et le jeu collectif.",
      [{level:"Application",instruction:"Explique pourquoi un joueur doit lever la tête avant de faire une passe.",correction:"Pour repérer la position des partenaires et des adversaires et choisir une passe adaptée."}],
      [{question:"Quel joueur peut utiliser les mains dans sa surface de réparation ?",answer:"Le gardien de but.",explanation:"Les autres joueurs doivent jouer le ballon avec les parties autorisées."}]
    )]
  ];

  const SVT = [
    ["influence des aliments sur la croissance des vertebres", make(
      "L'alimentation fournit aux vertébrés la matière et l'énergie nécessaires à leur croissance et au fonctionnement de leur organisme.",
      ["Relier alimentation et croissance chez le poulet.", "Identifier les besoins alimentaires d'un jeune vertébré.", "Comprendre le principe d'une comparaison expérimentale."],
      ["Un jeune poulet a besoin d'une alimentation suffisante et équilibrée pour grandir et rester en bonne santé.", "Les aliments apportent des nutriments qui fournissent de l'énergie et des matériaux nécessaires à la construction du corps.", "La quantité et la qualité de l'alimentation influencent la croissance ; l'eau propre est également indispensable.", "Pour comparer deux aliments, on utilise des groupes de poussins comparables, élevés dans des conditions identiques, en ne faisant varier que l'alimentation étudiée.", "On observe régulièrement la masse, la taille, l'état général et la consommation, sans maltraiter les animaux."],
      "Deux lots comparables de poussins reçoivent une alimentation différente tandis que l'eau, l'espace, l'hygiène et les conditions d'élevage restent identiques ; on compare ensuite leur croissance.",
      ["Formuler une hypothèse sur l'effet de l'aliment.", "Constituer des groupes comparables avec un encadrement adapté.", "Maintenir les mêmes conditions d'élevage.", "Noter les mesures à intervalles réguliers.", "Comparer les résultats et formuler une conclusion prudente."],
      ["Vertébré","Poulet","Aliment","Nutriment","Croissance","Lot témoin","Variable expérimentale"],
      "Pour étudier l'effet d'un aliment, on ne change que l'alimentation et on maintient les autres conditions identiques.",
      [{level:"Raisonnement",instruction:"Pourquoi faut-il garder les mêmes conditions d'élevage pour les deux lots de poussins ?",correction:"Pour que la différence de croissance observée puisse être reliée à l'alimentation plutôt qu'à l'eau, à l'espace, à l'hygiène ou à la température."},{level:"Conclusion",instruction:"Un lot de poussins grandit davantage que l'autre. Que faut-il vérifier avant de conclure que l'aliment est responsable ?",correction:"Vérifier que les lots étaient comparables et que toutes les autres conditions d'élevage étaient identiques."}],
      [{question:"Quel animal sert d'exemple dans cette leçon du programme de 6e ?",answer:"Le poulet, un vertébré.",explanation:"Le programme étudie l'influence des aliments sur la croissance des vertébrés, cas du poulet."}]
    )]
  ];

  EDHC.push(
    ["constitution de la cote d ivoire", make(
      "La Constitution est la loi fondamentale de l'État. Elle organise les institutions, définit leurs compétences et énonce des principes et droits qui encadrent la vie nationale.",
      ["Définir la Constitution.", "Comprendre son rôle dans l'organisation de l'État.", "Relier le respect des règles à la paix sociale."],
      ["La Constitution fixe les grandes règles de fonctionnement des institutions de la République.", "Elle précise les pouvoirs des institutions et les relations entre elles.", "Le respect de la Constitution et des lois contribue à l'ordre public, à la stabilité et à la paix.", "Les citoyens doivent connaître leurs droits et respecter les règles communes.", "Une règle doit être appliquée dans le respect de la dignité et des droits de chacun."],
      "Les institutions publiques exercent leurs missions dans le cadre fixé par la Constitution et les lois.",
      ["Identifier la règle ou l'institution étudiée.", "Lire le passage ou le résumé fourni par l'enseignant.", "Repérer le droit, le devoir ou le pouvoir concerné.", "Expliquer son utilité pour la paix et la vie collective."],
      ["Constitution","Loi fondamentale","République","Institution","Pouvoir","Citoyen","Paix sociale"],
      "La Constitution organise l'État et encadre l'exercice des pouvoirs ; son respect contribue à la paix.",
      [{level:"Compréhension",instruction:"Donne deux rôles de la Constitution.",correction:"Elle organise les institutions et fixe des principes et règles fondamentales de la vie nationale."}],
      [{question:"Pourquoi la Constitution est-elle appelée loi fondamentale ?",answer:"Parce qu'elle fixe les règles essentielles d'organisation de l'État et des institutions.",explanation:"Les autres règles doivent respecter le cadre constitutionnel."}]
    )],
    ["circulation routiere", make(
      "La sécurité routière regroupe les règles et comportements qui permettent de réduire les accidents et de protéger tous les usagers de la route.",
      ["Identifier les principaux usagers de la route.", "Reconnaître des règles de sécurité.", "Adopter des comportements prudents."],
      ["Les usagers comprennent les piétons, cyclistes, motocyclistes, automobilistes et passagers.", "Le piéton utilise les trottoirs lorsqu'ils existent et traverse aux endroits adaptés après avoir observé la circulation.", "Les panneaux, feux et marquages donnent des indications ou imposent des obligations.", "Le casque protège les motocyclistes et cyclistes lorsqu'il est adapté et correctement attaché ; la ceinture protège les occupants d'un véhicule.", "Il ne faut pas jouer sur la chaussée, traverser sans regarder ou utiliser le téléphone en conduisant."],
      "Avant de traverser, s'arrêter au bord du trottoir, regarder des deux côtés, écouter et traverser lorsque la voie est sûre.",
      ["Identifier son rôle : piéton, passager ou conducteur.", "Repérer les dangers.", "Observer les signaux et les véhicules.", "Respecter les règles de traversée et de protection.", "Alerter un adulte en cas de danger."],
      ["Usager","Piéton","Chaussée","Trottoir","Passage piéton","Feu tricolore","Signalisation","Casque"],
      "La prudence, l'attention et le respect du code protègent tous les usagers.",
      [{level:"Situation",instruction:"Un élève veut traverser entre deux véhicules stationnés. Que doit-il faire ?",correction:"Il doit chercher un endroit dégagé et sécurisé, rejoindre un passage adapté si possible, observer la circulation et ne traverser que lorsque la voie est libre."}],
      [{question:"Que signifie un feu rouge pour un piéton ?",answer:"Il doit attendre et ne pas s'engager si le signal piéton l'interdit.",explanation:"Il faut respecter les feux et les indications destinées aux piétons."}]
    )],
    ["puberte", make(
      "La puberté est une période du développement pendant laquelle le corps de l'enfant évolue progressivement vers la maturité sexuelle et physique.",
      ["Identifier des changements de la puberté.", "Comprendre que le rythme varie selon les personnes.", "Adopter des habitudes d'hygiène et de respect de soi."],
      ["La puberté apparaît à des âges différents selon les individus ; les changements ne se produisent pas tous au même moment.", "Les changements physiques peuvent comprendre une croissance rapide, l'apparition de poils, une modification de la voix chez certains garçons, le développement des seins et le début des menstruations chez certaines filles.", "Des changements émotionnels et sociaux peuvent aussi survenir ; ils sont variables.", "L'hygiène corporelle, une alimentation équilibrée, le sommeil et l'activité physique contribuent au bien-être.", "Aucune personne ne doit être moquée ou discriminée en raison de son développement."],
      "Deux élèves du même âge peuvent connaître des changements à des moments différents : cela ne signifie pas que l'un est anormal.",
      ["S'informer auprès de sources éducatives fiables.", "Respecter son intimité et celle des autres.", "Maintenir une bonne hygiène.", "Parler à un adulte de confiance ou à un professionnel de santé en cas d'inquiétude."],
      ["Puberté","Croissance","Maturité","Menstruation","Hygiène","Intimité","Respect"],
      "La puberté est un processus naturel, progressif et variable ; chacun doit être respecté.",
      [{level:"Compréhension",instruction:"Pourquoi ne faut-il pas comparer ou se moquer du développement physique des élèves ?",correction:"Parce que le rythme de la puberté varie d'une personne à l'autre et que chacun a droit au respect de son intimité et de sa dignité."}],
      [{question:"La puberté commence-t-elle exactement au même âge chez tous les adolescents ?",answer:"Non.",explanation:"Le rythme du développement varie selon les personnes."}]
    )],
    ["abstinence sexuelle", make(
      "L'abstinence sexuelle consiste à choisir de ne pas avoir de rapports sexuels. Dans l'éducation à la santé, elle peut être présentée comme un choix de prévention et de protection.",
      ["Définir l'abstinence.", "Identifier des moyens de préserver sa santé.", "Savoir demander conseil à une personne compétente."],
      ["L'abstinence est un choix personnel qui doit être libre et respecté ; personne ne doit subir de pression ou de contrainte.", "Ne pas avoir de rapports sexuels évite les risques de grossesse liés aux rapports sexuels et contribue à éviter les infections sexuellement transmissibles liées à ces rapports.", "Le respect du consentement, des limites personnelles et de la dignité est essentiel.", "Les informations de santé doivent provenir de professionnels ou de sources fiables.", "En cas de question ou de pression, l'adolescent peut s'adresser à un adulte de confiance ou à un professionnel de santé."],
      "Un adolescent peut refuser une pression de groupe et demander conseil à un adulte de confiance pour prendre une décision respectueuse de sa santé.",
      ["Identifier la pression ou la situation.", "Exprimer clairement ses limites.", "S'éloigner d'une situation non souhaitée.", "Demander de l'aide à une personne de confiance.", "Vérifier les informations auprès d'une source de santé fiable."],
      ["Abstinence","Prévention","Consentement","Limites personnelles","Santé","Respect","Pression"],
      "Le respect du consentement et des limites personnelles est indispensable ; chacun a le droit de refuser.",
      [{level:"Situation",instruction:"Que peut faire un adolescent qui subit une pression pour agir contre ses valeurs ou sa volonté ?",correction:"Exprimer son refus, s'éloigner de la situation et demander de l'aide à un adulte de confiance."}],
      [{question:"Une personne doit-elle respecter le refus d'un autre ?",answer:"Oui, toujours.",explanation:"Le consentement et les limites personnelles doivent être respectés."}]
    )],
    ["entretien du cadre de vie", make(
      "L'entretien du cadre de vie regroupe les gestes qui maintiennent les lieux propres, sûrs et agréables afin de protéger la santé des populations.",
      ["Identifier les sources d'insalubrité.", "Proposer des gestes d'assainissement.", "Participer à la protection de l'environnement."],
      ["Les déchets abandonnés peuvent attirer des animaux nuisibles, boucher les caniveaux et favoriser la pollution.", "L'eau stagnante peut favoriser la prolifération de moustiques.", "Il faut trier et déposer les déchets dans les endroits prévus, garder les aliments couverts et éviter les eaux stagnantes.", "Le nettoyage collectif doit être organisé et encadré, avec des outils adaptés et des protections.", "Les produits dangereux, objets coupants et déchets médicaux ne doivent pas être manipulés par les élèves."],
      "Une classe peut organiser, avec l'accord de l'établissement, une opération de propreté autour des salles et signaler les zones dangereuses.",
      ["Observer les lieux sans toucher aux déchets dangereux.", "Repérer les causes d'insalubrité.", "Proposer une action réalisable.", "Utiliser les équipements adaptés sous encadrement.", "Évaluer le résultat et maintenir les bonnes habitudes."],
      ["Assainissement","Insalubrité","Déchet","Eau stagnante","Caniveau","Hygiène","Environnement"],
      "Un cadre de vie sain dépend de gestes réguliers, d'une gestion correcte des déchets et de la prévention des dangers.",
      [{level:"Application",instruction:"Cite trois gestes qui améliorent l'hygiène de la cour d'un collège.",correction:"Utiliser les poubelles, éviter les eaux stagnantes et maintenir les caniveaux dégagés par des personnes encadrées."}],
      [{question:"Pourquoi faut-il éviter les eaux stagnantes près des habitations ?",answer:"Elles peuvent favoriser la reproduction des moustiques.",explanation:"L'élimination des eaux stagnantes contribue à la prévention."}]
    )],
    ["entretien des latrines", make(
      "L'entretien des latrines et des toilettes consiste à les garder propres et fonctionnelles pour limiter la transmission des maladies et préserver la dignité des usagers.",
      ["Expliquer l'importance des toilettes propres.", "Identifier les règles d'hygiène.", "Participer à la préservation des installations."],
      ["Les toilettes doivent être utilisées correctement et maintenues propres selon les consignes de l'établissement.", "Le lavage des mains à l'eau et au savon après les toilettes est un geste essentiel.", "Les déchets ne doivent pas être jetés dans les latrines s'ils risquent de les boucher.", "L'entretien des installations doit être assuré avec des produits et équipements adaptés par des personnes formées ou responsables.", "Un élève ne doit pas manipuler des produits chimiques dangereux ni effectuer seul une opération risquée."],
      "Après être allé aux toilettes, l'élève se lave soigneusement les mains avec de l'eau et du savon.",
      ["Utiliser les toilettes selon les consignes.", "Laisser l'espace propre.", "Se laver les mains.", "Signaler une panne ou un manque d'eau à un responsable.", "Ne pas toucher aux produits d'entretien dangereux."],
      ["Latrines","Toilettes","Hygiène","Assainissement","Lavage des mains","Eau et savon","Dignité"],
      "Des toilettes propres et le lavage des mains protègent la santé et respectent les usagers.",
      [{level:"Application",instruction:"Que faire si une toilette est bouchée ou si un produit dangereux est renversé ?",correction:"Ne pas intervenir soi-même ; éloigner les élèves et prévenir immédiatement un responsable."}],
      [{question:"Quel geste est indispensable après l'utilisation des toilettes ?",answer:"Se laver les mains avec de l'eau et du savon.",explanation:"Ce geste réduit la transmission des microbes."}]
    )]
  );

  TICE.push(
    ["constituants d un ordinateur", make(
      "Un ordinateur est un appareil électronique qui reçoit, traite, stocke et restitue des informations. Il comprend des éléments matériels et des logiciels.",
      ["Identifier les principaux composants.", "Distinguer unité centrale et périphériques.", "Relier chaque composant à sa fonction."],
      ["Le processeur exécute les instructions et réalise les traitements.", "La mémoire vive (RAM) conserve temporairement les données utilisées pendant le fonctionnement.", "Le stockage (disque dur ou SSD) conserve les fichiers même lorsque l'ordinateur est éteint.", "L'écran, le clavier, la souris, l'imprimante et les haut-parleurs sont des périphériques.", "Les logiciels et le système d'exploitation permettent d'utiliser les composants matériels."],
      "Pour rédiger un texte, le clavier sert à saisir, l'écran à afficher, le processeur à traiter et le stockage à conserver le document.",
      ["Identifier le composant.", "Observer sa forme et son branchement.", "Associer sa fonction.", "Classer les éléments en entrée, traitement, stockage ou sortie."],
      ["Matériel","Logiciel","Processeur","Mémoire vive","Stockage","Périphérique","Unité centrale"],
      "Un ordinateur associe matériel et logiciels ; chaque composant remplit une fonction précise.",
      [{level:"Classement",instruction:"Classe clavier, écran, processeur et SSD selon leur fonction.",correction:"Clavier : entrée ; écran : sortie ; processeur : traitement ; SSD : stockage."}],
      [{question:"Quel composant conserve les fichiers même après extinction ?",answer:"Le support de stockage, par exemple un SSD ou un disque dur.",explanation:"La mémoire vive, elle, est temporaire."}]
    )],
    ["utilisation de la souris", make(
      "La souris est un périphérique de pointage qui permet de déplacer le pointeur et d'interagir avec les éléments affichés à l'écran.",
      ["Tenir et déplacer correctement la souris.", "Utiliser clic, double-clic et glisser-déposer.", "Choisir un élément à l'écran."],
      ["Le déplacement de la souris déplace le pointeur à l'écran.", "Le clic gauche sélectionne ou active un élément ; le double-clic ouvre généralement un fichier ou un dossier.", "Le clic droit affiche souvent un menu contextuel.", "La molette permet de faire défiler une page.", "Le glisser-déposer consiste à maintenir le bouton enfoncé, déplacer l'élément puis relâcher."],
      "Pour ouvrir un dossier, déplacer le pointeur sur son icône puis effectuer un double-clic gauche.",
      ["Poser la souris sur une surface stable.", "Déplacer doucement le pointeur.", "Faire un clic simple pour sélectionner.", "Faire un double-clic pour ouvrir.", "Utiliser la molette pour faire défiler."],
      ["Pointeur","Clic gauche","Double-clic","Clic droit","Molette","Glisser-déposer"],
      "La souris sert à pointer, sélectionner, ouvrir et déplacer des éléments.",
      [{level:"Pratique",instruction:"Quelle action permet de déplacer un fichier vers un autre dossier avec la souris ?",correction:"Utiliser le glisser-déposer, si les droits et l'application le permettent."}],
      [{question:"À quoi sert le clic droit ?",answer:"À afficher un menu contextuel dans de nombreuses applications.",explanation:"Ce menu propose des actions liées à l'élément sélectionné."}]
    )],
    ["utilisation du clavier", make(
      "Le clavier est un périphérique d'entrée qui permet de saisir des lettres, des chiffres, des signes et des commandes.",
      ["Identifier les principales touches.", "Saisir un texte simple.", "Utiliser les touches de correction et de déplacement."],
      ["Les touches alphabétiques permettent de saisir les lettres ; les touches numériques servent à écrire les chiffres.", "La barre d'espace sépare les mots ; Entrée valide ou crée une nouvelle ligne selon le contexte.", "Retour arrière efface le caractère placé avant le curseur ; Suppr efface souvent le caractère après le curseur ou l'élément sélectionné.", "Majuscule permet d'écrire une lettre capitale ; Verr. Maj maintient la saisie en majuscules.", "Les touches directionnelles déplacent le curseur ou la sélection."],
      "Pour écrire « BONJOUR », utiliser Verr. Maj ou maintenir Maj pendant la saisie des lettres.",
      ["Placer les doigts confortablement.", "Repérer le curseur.", "Saisir le texte sans frapper fort.", "Corriger avec Retour arrière ou Suppr.", "Enregistrer le document."],
      ["Clavier","Curseur","Entrée","Espace","Retour arrière","Suppr","Majuscule"],
      "Le clavier permet la saisie ; les touches spéciales facilitent la correction et la navigation.",
      [{level:"Application",instruction:"Quelle touche permet de passer à la ligne suivante dans un traitement de texte ?",correction:"La touche Entrée."}],
      [{question:"Quelle touche efface le caractère situé avant le curseur ?",answer:"Retour arrière (Backspace).",explanation:"Suppr agit généralement sur le caractère après le curseur."}]
    )],
    ["systeme d exploitation", make(
      "Un système d'exploitation est le logiciel principal qui gère les ressources de l'ordinateur et permet aux autres logiciels de fonctionner.",
      ["Définir le système d'exploitation.", "Identifier ses fonctions principales.", "Utiliser les éléments de base de l'environnement."],
      ["Le système d'exploitation gère le processeur, la mémoire, les fichiers et les périphériques.", "Il fournit une interface permettant à l'utilisateur de lancer des applications et de gérer les dossiers.", "Windows, Linux, macOS et Android sont des exemples de systèmes d'exploitation.", "Les mises à jour peuvent corriger des erreurs et améliorer la sécurité ; elles doivent être réalisées selon les consignes de l'établissement.", "Il faut fermer correctement sa session et ne pas modifier les réglages importants sans autorisation."],
      "Sur Windows, l'explorateur de fichiers permet de créer des dossiers, déplacer et retrouver des documents.",
      ["Allumer l'ordinateur selon la procédure.", "Ouvrir sa session avec autorisation.", "Repérer le bureau et les applications.", "Créer ou ouvrir un dossier.", "Fermer les applications puis arrêter correctement l'appareil."],
      ["Système d'exploitation","Interface","Bureau","Fichier","Dossier","Application","Périphérique"],
      "Le système d'exploitation coordonne les ressources et permet d'utiliser les applications.",
      [{level:"Compréhension",instruction:"Donne deux fonctions d'un système d'exploitation.",correction:"Gérer les ressources matérielles et permettre à l'utilisateur de lancer les applications et gérer les fichiers."}],
      [{question:"Windows est-il un système d'exploitation ?",answer:"Oui.",explanation:"Il gère l'ordinateur et fournit une interface utilisateur."}]
    )],
    ["logiciel de dessin", make(
      "Un logiciel de dessin est une application qui permet de créer ou modifier des images à l'aide d'outils numériques.",
      ["Identifier les outils de dessin.", "Créer une image simple.", "Enregistrer son travail dans un format adapté."],
      ["Les outils de ligne, rectangle, ellipse et pinceau servent à construire des formes.", "La palette permet de choisir les couleurs ; la gomme efface une partie du dessin.", "Le zoom facilite le travail sur les détails mais ne change pas les dimensions réelles du fichier.", "Il faut enregistrer régulièrement le dessin dans un dossier connu.", "Un nom de fichier clair facilite le classement et la recherche."],
      "Pour réaliser un pictogramme, tracer un cercle, ajouter une forme simple, choisir deux couleurs et enregistrer le fichier.",
      ["Ouvrir le logiciel.", "Créer une nouvelle image.", "Choisir les outils et les couleurs.", "Dessiner les formes principales.", "Enregistrer le fichier."],
      ["Pinceau","Ligne","Forme","Palette","Gomme","Zoom","Fichier image"],
      "Un dessin numérique se construit avec des outils simples et doit être enregistré régulièrement.",
      [{level:"Pratique",instruction:"Quels outils utiliser pour dessiner une maison très simple ?",correction:"Rectangle pour les murs, triangle ou polygone pour le toit, ligne pour la porte et les fenêtres."}],
      [{question:"Quel outil permet d'effacer une partie du dessin ?",answer:"La gomme.",explanation:"Elle retire les éléments dessinés dans la zone choisie."}]
    )]
  );

  EPS.push(
    ["effort de longue duree", make(
      "Un effort de longue durée est un effort physique maintenu pendant un temps relativement long à une intensité que l'élève peut gérer.",
      ["Comprendre la notion d'endurance.", "Adapter son allure à la durée.", "Récupérer et respecter les signaux du corps."],
      ["L'endurance permet de maintenir une activité sans s'épuiser trop rapidement.", "Une allure régulière est préférable à un départ trop rapide.", "L'échauffement prépare progressivement le corps à l'effort.", "La respiration doit rester contrôlée ; l'élève ralentit ou s'arrête en cas de douleur, malaise ou difficulté inhabituelle.", "L'hydratation et la récupération participent à la sécurité."],
      "Lors d'une course de durée, l'élève choisit une allure modérée qu'il peut maintenir jusqu'à la fin.",
      ["S'échauffer progressivement.", "Commencer à allure modérée.", "Garder un rythme régulier.", "Adapter l'allure à ses capacités.", "Ralentir puis récupérer en fin d'exercice."],
      ["Endurance","Allure","Échauffement","Respiration","Hydratation","Récupération"],
      "Pour durer, il faut gérer son allure et respecter ses capacités.",
      [{level:"Application",instruction:"Pourquoi ne faut-il pas partir trop vite lors d'une course de durée ?",correction:"Un départ trop rapide fatigue rapidement et empêche de maintenir l'effort jusqu'à la fin."}],
      [{question:"Quelle qualité physique est principalement développée par une course de longue durée ?",answer:"L'endurance.",explanation:"Elle permet de maintenir un effort dans le temps."}]
    )],
    ["effort de courte duree", make(
      "Un effort de courte durée est un effort bref réalisé à une intensité élevée, comme une course rapide sur une distance courte.",
      ["Identifier les caractéristiques d'un effort bref.", "Améliorer la vitesse et la réaction.", "Respecter les phases de récupération."],
      ["La vitesse correspond à la capacité de réaliser un déplacement rapidement.", "Un départ efficace nécessite une position stable et une réaction au signal.", "La course rapide demande une coordination des bras et des jambes.", "Les efforts intenses doivent être séparés par une récupération suffisante.", "L'échauffement est indispensable avant les accélérations."],
      "Sur une courte distance, l'élève se place derrière la ligne, réagit au signal et court rapidement jusqu'à l'arrivée.",
      ["S'échauffer.", "Prendre une position de départ stable.", "Attendre le signal.", "Accélérer en coordonnant les bras et les jambes.", "Récupérer avant un nouvel essai."],
      ["Vitesse","Sprint","Départ","Signal","Accélération","Récupération"],
      "Un effort bref et rapide nécessite un bon départ, une coordination efficace et une récupération suffisante.",
      [{level:"Application",instruction:"Cite deux précautions avant de répéter plusieurs courses rapides.",correction:"S'échauffer correctement et prévoir une récupération suffisante entre les essais."}],
      [{question:"Quelle qualité physique est principalement sollicitée dans un sprint court ?",answer:"La vitesse.",explanation:"L'effort est bref et intense."}]
    )],
    ["gymnastique au sol", make(
      "La gymnastique au sol est une activité qui enchaîne des actions corporelles sur un tapis ou une surface adaptée en recherchant équilibre, coordination et maîtrise.",
      ["Réaliser des actions simples en sécurité.", "Enchaîner plusieurs éléments.", "Contrôler son équilibre et sa réception."],
      ["Les actions peuvent comprendre roulades adaptées, déplacements, appuis, équilibres et sauts simples selon le niveau.", "Une posture contrôlée et un placement correct des mains et de la tête sont essentiels.", "Les éléments nouveaux doivent être appris avec une aide et une surface adaptées.", "Il ne faut jamais tenter seul un mouvement acrobatique non enseigné.", "Une petite séquence doit être fluide et respecter les espaces de pratique."],
      "Une séquence débutante peut enchaîner une marche sur le tapis, un équilibre simple avec aide puis une réception stable.",
      ["Vérifier le tapis et l'espace.", "S'échauffer.", "Répéter chaque élément séparément.", "Enchaîner deux ou trois actions maîtrisées.", "Terminer par une réception équilibrée."],
      ["Équilibre","Appui","Roulade","Coordination","Tapis","Réception","Enchaînement"],
      "La gymnastique au sol exige une progression, une maîtrise des appuis et une sécurité constante.",
      [{level:"Sécurité",instruction:"Pourquoi ne faut-il pas tenter une roulade ou une figure acrobatique sans apprentissage ?",correction:"Un mauvais placement peut entraîner une blessure ; la figure doit être enseignée et réalisée sur une surface adaptée."}],
      [{question:"Quel élément doit être vérifié avant une séance de gymnastique au sol ?",answer:"L'état du tapis et la sécurité de l'espace.",explanation:"La zone doit être dégagée et adaptée."}]
    )],
    ["lancer du poids", make(
      "Le lancer du poids est une activité athlétique qui consiste à propulser un engin lourd vers l'avant à partir d'une zone réglementée.",
      ["Identifier les règles de sécurité.", "Adopter une posture de lancer adaptée.", "Mesurer et comparer les performances."],
      ["Le poids est tenu près du cou, puis poussé vers l'avant ; il ne se lance pas comme une balle en le jetant derrière la tête.", "Le lancer se réalise dans une zone dégagée et uniquement au signal de l'enseignant.", "Personne ne doit se placer dans la direction du lancer ou aller récupérer l'engin avant l'autorisation.", "L'engin utilisé doit être adapté à l'âge et aux capacités des élèves.", "La performance peut être mesurée de la ligne de lancer au premier point de contact de l'engin avec le sol, selon les consignes de la séance."],
      "L'élève apprend d'abord le geste avec un engin léger adapté, sans lancer tant que la zone n'est pas libre.",
      ["Écouter les consignes.", "Vérifier que la zone est dégagée.", "Se placer derrière la ligne.", "Pousser l'engin selon la technique enseignée.", "Attendre l'autorisation avant de récupérer l'engin."],
      ["Poids","Lancer","Zone de lancer","Propulsion","Mesure","Sécurité"],
      "La sécurité de la zone et le respect des signaux sont prioritaires dans le lancer du poids.",
      [{level:"Sécurité",instruction:"Quand peut-on récupérer le poids après un lancer ?",correction:"Uniquement lorsque l'enseignant l'autorise et que tous les lancers sont terminés."}],
      [{question:"Pourquoi personne ne doit-il se tenir devant la zone de lancer ?",answer:"Pour éviter d'être atteint par l'engin.",explanation:"La zone doit être entièrement dégagée."}]
    )]
  );

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
    const stats = { arts: 0, edhc: 0, tice: 0, eps: 0, missing: [] };
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
        } else if (subject === "EPS") {
          const item = EPS.find(([key]) => title.includes(norm(key)));
          if (item) { course = item[1]; stats.eps++; }
        } else if (subject === "SVT") {
          const item = SVT.find(([key]) => title.includes(norm(key)));
          if (item) course = item[1];
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