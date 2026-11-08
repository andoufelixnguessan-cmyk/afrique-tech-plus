---
name: atp-qa
description: Tester les pages, parcours utilisateurs, contenus et intégrations d'AFRIQUE TECH PLUS avant validation.
---

# ATP Quality Assurance

## Mission
Vérifier que les fonctionnalités ATP répondent au besoin utilisateur sans régression.

## Parcours prioritaires
- Navigation entre Accueil, Services et les sept rubriques.
- Academy : catalogue, inscription, progression, leçons, quiz et accès premium.
- Ressources scolaires : niveaux, séries, matières et liens externes.
- Boutique : affichage des produits, prix, boutons d'achat et pages Ficsell.
- AI, Media, Prestations et Community.
- Authentification, profil et affichage des états de compte.
- Responsive mobile, tablette et desktop.

## Pour chaque test
1. Décrire le prérequis et le rôle utilisé.
2. Donner les étapes exactes.
3. Définir le résultat attendu.
4. Observer le résultat réel.
5. Capturer les erreurs, liens cassés ou incohérences.
6. Classer le défaut selon sa gravité.
7. Retester après correction.

## Règles
- Tester les rôles anon et authenticated quand cela est pertinent.
- Ne jamais utiliser de vrais paiements pour un test non autorisé.
- Ne pas modifier les données de production sans accord.
- Ne pas confondre vérification du code, test API et test visuel réel.
- Vérifier les petits écrans et l'usage tactile.
- Ne jamais inventer un résultat de test.

## Rapport de recette
Fournir : tests réussis, tests échoués, tests non exécutés, défauts classés, pages concernées et décision (prêt, prêt sous réserve, non prêt).
