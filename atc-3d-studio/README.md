# ATC 3D Studio

Atelier web de conception paramétrique des autocars ATC.

## Accès
- Site : https://andoufelixnguessan-cmyk.github.io/afrique-tech-plus/atc-3d-studio/
- Raccourci : https://andoufelixnguessan-cmyk.github.io/afrique-tech-plus/atc-3d-studio.html

## Fonctions actuelles
- Visualisation 3D manipulable à la souris et au tactile.
- Réglage des dimensions, du nombre de places, des portes et des couleurs.
- Carrosserie monocoque avec profil longitudinal arrondi.
- Fenêtres, vitrages, pare-brise, roues, jantes, éclairages, sièges et éléments intérieurs.
- Assistant de configuration à partir d'une description.
- Sauvegarde locale, export/import de configuration JSON et export du véhicule au format GLB.
- Interface responsive pour ordinateur et Android.

## Notes techniques
L'application est statique et publiée avec GitHub Pages. Elle charge Three.js et ses modules depuis un CDN ; une connexion Internet est donc nécessaire pour afficher le studio. Les sauvegardes locales restent sur l'appareil et le navigateur utilisé. L'assistant actuel applique des paramètres à partir des mots-clés d'une description : ce n'est pas encore un générateur IA de géométrie 3D. Le modèle généré est une base paramétrique à améliorer, pas un autocar de production déjà au niveau d'un jeu commercial.

## Déploiement
Le dépôt utilise déjà GitHub Pages sur la branche principale. Les fichiers de ce dossier sont publiés automatiquement avec le site lorsque GitHub Pages termine son déploiement.
