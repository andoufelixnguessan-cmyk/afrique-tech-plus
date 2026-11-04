# AFRIQUE TECH PLUS — version 2 (base de plateforme)

## Contenu
- `index.html` : nouvelle page d'accueil.
- `assets/css/styles.css` : styles responsives.
- `assets/js/config.js` : configuration publique Supabase.
- `assets/js/app.js` : navigation, bascule FR/EN et authentification.

## Installation dans GitHub
1. Téléverser `index.html` à la racine du dépôt et remplacer l'ancien `index.html`.
2. Créer les dossiers `assets/css` et `assets/js` à la racine.
3. Ajouter les fichiers correspondants dans ces dossiers.
4. Conserver les anciennes variantes (`index-1.html`, `index-3.html`, etc.) pendant la vérification.
5. Attendre le déploiement GitHub Pages puis tester l'inscription, la connexion et la déconnexion.

## Supabase
La page utilise l'URL et la clé publishable déjà configurées dans le site précédent.
Seule une clé publique/publishable peut être utilisée dans le navigateur. Ne jamais mettre une clé `service_role` ou un secret dans le code client.

La table `public.profiles` doit contenir les champs `id`, `nom`, `prenom` et les politiques RLS de lecture de son propre profil. Le déclencheur de création du profil doit être actif si vous souhaitez enregistrer automatiquement nom et prénom.

## Limites de cette livraison
Cette version est une base de présentation et d'authentification. Elle ne met PAS encore en place :
- les règles d'accès sécurisées aux cours et fichiers SCHOOL/ACADEMY ;
- les abonnements FREE/PREMIUM/PRO et les paiements ;
- l'espace administrateur ;
- les achats Ficsell synchronisés avec Supabase ;
- la communauté avec modération ;
- les outils IA connectés à un modèle.

Ne pas présenter les contenus réservés ou les paiements comme opérationnels avant la mise en place des contrôles serveur, des règles RLS et des tests.
