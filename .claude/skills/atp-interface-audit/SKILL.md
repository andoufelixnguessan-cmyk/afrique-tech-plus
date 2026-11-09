---
name: atp-interface-audit
description: Audit et amélioration des interfaces AFRIQUE TECH PLUS selon les bonnes pratiques Vercel, l'accessibilité, le responsive et l'identité visuelle ATP.
metadata:
  author: AFRIQUE TECH PLUS
  version: "1.0.0"
---

# ATP Interface Audit

## Objectif
Examiner les interfaces du dépôt AFRIQUE TECH PLUS avant toute modification, puis proposer ou appliquer des corrections vérifiables sans casser les parcours existants.

## Référence de bonnes pratiques
Avant chaque audit, lire la version la plus récente des règles Vercel Web Interface Guidelines :
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md

La compétence officielle Vercel `web-design-guidelines` est publiée dans :
https://github.com/vercel-labs/agent-skills

Pour l'installer dans un projet local avec Claude Code :
`npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a claude-code`

Cette compétence ATP est un complément personnalisé ; elle ne prétend pas être une copie ni une installation de la compétence officielle Vercel.

## Identité visuelle à préserver
- Fond ivoire : `#f7f5ee`
- Cartes claires : `#fffefa`
- Vert forêt : `#173b32`, `#203b30`, `#24563e`
- Sauge : `#e8eee3`
- Terre cuite : `#a45132`
- Éviter les dominantes violet et bleu marine.
- Conserver un en-tête cohérent entre l'accueil et les pages internes.
- Ne pas modifier les prix validés ni les contenus déjà validés sans demande explicite.

## Méthode d'audit
1. Lire les fichiers HTML, CSS et JavaScript concernés ainsi que leurs dépendances.
2. Vérifier la structure sémantique, un seul titre principal pertinent, les liens, les formulaires, les labels et les noms accessibles.
3. Vérifier la navigation clavier, les états `:focus-visible`, les liens d'évitement et les menus mobiles.
4. Vérifier le contraste, la lisibilité, les tailles de texte, les débordements horizontaux et les cibles tactiles.
5. Vérifier `prefers-reduced-motion`, les animations automatiques et les commandes pause/reprise.
6. Vérifier les dimensions intrinsèques des images, les textes alternatifs et le chargement des médias.
7. Vérifier les états vides, chargements, erreurs et succès des interactions.
8. Vérifier les liens internes, ancres, ressources externes et versions des fichiers CSS/JS.
9. Distinguer les constats statiques des tests réellement exécutés dans un navigateur.
10. Classer les constats par gravité : bloquant, important, amélioration.

## Règles de modification
- Examiner l'existant avant d'écrire.
- Préserver les fonctionnalités et données.
- Ne jamais exposer de secrets ou de clés serveur.
- Ne pas ajouter de dépendance sans justification.
- Ne pas remplacer un parcours de paiement ou d'authentification sans test.
- Utiliser des éléments HTML natifs et des contrôles accessibles.
- Préférer `textContent` à `innerHTML` pour les contenus dynamiques.
- Toute modification doit être suivie d'une vérification du diff et des fichiers concernés.
- Ne jamais annoncer un test visuel, mobile, paiement ou authentification qui n'a pas réellement été effectué.

## Format du rapport
Pour chaque constat : fichier, emplacement, problème, risque utilisateur, correction appliquée ou action restante. Terminer par les vérifications exécutées et les limites restantes.
