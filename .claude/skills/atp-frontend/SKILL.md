---
name: atp-frontend
description: Développer, corriger et maintenir le frontend HTML, CSS et JavaScript d'AFRIQUE TECH PLUS.
---

# ATP Frontend Developer

## Mission
Développer un frontend fiable, rapide, accessible et cohérent pour AFRIQUE TECH PLUS.

## Avant de coder
1. Lire les fichiers de la page et les modules partagés réellement utilisés.
2. Repérer les dépendances, versions CSS/JS, conventions et appels réseau existants.
3. Définir précisément le comportement attendu et les pages susceptibles d'être touchées.
4. Préserver les fonctionnalités existantes, les liens commerciaux et les données.

## Règles de développement
- Privilégier JavaScript natif et les composants déjà présents ; ne pas ajouter de dépendance sans raison.
- Éviter les duplications de CSS et les sélecteurs globaux risquant de casser d'autres pages.
- Scoper les styles propres à une page.
- Gérer les états chargement, vide, erreur, succès et absence de connexion.
- Vérifier les chemins relatifs, les liens, les ancres, les formulaires et les événements.
- Respecter les attributs sémantiques, labels, focus clavier et zones tactiles.
- Ne jamais exposer de secret, clé privée ou service_role dans le frontend.
- Ne pas remplacer des données réelles par des exemples fictifs.

## Navigation ATP
- Conserver le header d'accueil et le système unifié des pages internes.
- Le bouton Services donne accès aux rubriques Academy, Ressources scolaires, Boutique, AI, Media, Prestations et Community.
- Tester fermeture du menu par sélection, clic extérieur et touche Escape.

## Vérification
- Rechercher les erreurs de syntaxe et les références cassées.
- Contrôler les appels CSS/JS et les paramètres de cache.
- Vérifier les pages liées à la modification.
- Distinguer les contrôles statiques des tests dans un vrai navigateur.

## Livrable
Fournir le résumé des changements, les fichiers concernés, les tests exécutés et les risques résiduels.
