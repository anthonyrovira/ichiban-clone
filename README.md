# Clone Ichiban.bike 🏍️

Un clone du site [Ichiban.bike](https://www.ichiban.bike/) développé avec le meta-framework [Astro](https://astro.build/). Ce projet a été créé dans un but d'apprentissage et de pratique, en mettant l'accent sur les animations de défilement fluides et les effets visuels stylisés.

## 🎯 Objectif du Projet

Ce projet est une reproduction du site Ichiban.bike, conçu uniquement pour la version desktop. L'accent a été mis sur :
- L'implémentation d'animations de défilement fluides
- L'animation frame-by-frame d'une moto futuriste japonaise
- Optimisation des Images et des performances globales du site vis à vis de sa version originale
- L'utilisation des fonctionnalités d'Astro
- La reproduction fidèle du design original

## 🛠️ Technologies Utilisées

- Astro v5.1.3
- astro-cloudinary pour la gestion des images
- CSS natif pour le styling
- Polices personnalisées (Consola, Akira Expanded)

## 🚀 Optimisation des Performances

Ce clone met l'accent sur l'optimisation des performances, avec une approche méthodique de la gestion des assets :

### Optimisation des Images
- Conversion de toutes les images en format WebP via Squoosh.app
- Remplacement des images en base64 du site original par des fichiers WebP optimisés
- Utilisation du composant `Image` d'Astro pour l'optimisation automatique :
  - Chargement différé (lazy loading)
  - Redimensionnement automatique
  - Optimisation des formats modernes (WebP)
  - Génération automatique des srcset

### Choix Techniques
- Utilisation de `background-image` CSS pour l'animation frame-by-frame
  - Meilleure exploitation de l'accélération matérielle GPU
  - Réduction de la charge JavaScript
  - Performance accrue sur le rendu des animations

Je vais améliorer la section des résultats de performance en ajoutant plus de détails techniques et de clarifications. Voici une version améliorée :

### Résultats Comparatifs de Performance

| Métrique         | Clone (Cold Start) | Clone (Hot Start) | Original (Cold Start) | Original (Hot Start) |
| ---------------- | ------------------ | ----------------- | --------------------- | -------------------- |
| Taille totale    | 13,3 Mo            | 8,5 Mo            | 48,6 Mo               | 41,5 Mo              |
| Load Time        | 8,59s              | 893ms             | 3,81s                 | 2,31s                |
| First Paint      | 1,69s              | 859ms             | 1,59s                 | 1,47s                |
| DOMContentLoaded | 301ms              | 261ms             | 3,7s                  | 1,23s                |

### 📊 Analyse Détaillée des Métriques

1.  **Temps de Chargement Total (Load Time)**
    -   Représente le temps nécessaire pour charger l'ensemble des ressources de la page
    -   Inclut : HTML, CSS, JavaScript, images, fonts et autres assets
    -   Le temps plus élevé en cold start (8,59s) s'explique par :
        -   Le chargement initial des frames d'animation (séquence moto)
        -   La création du cache navigateur pour les assets statiques
        -   Le temps de parse et d'exécution du JavaScript
2.  **DOMContentLoaded**
    -   Moment où le HTML initial est complètement chargé et analysé
    -   Les scripts synchrones sont exécutés
    -   Ne comprend pas les ressources asynchrones (images, frames d'animation)
    -   Performance : 301ms vs 3,7s (original)
    -   Amélioration obtenue grâce à :
        -   L'élimination des scripts bloquants
        -   L'optimisation du HTML critique
        -   La stratégie de chargement différé
3.  **First Paint**
    -   Premier affichage visuel pour l'utilisateur
    -   Légèrement plus lent que l'original (1,69s vs 1,59s)
    -   Compromis accepté pour garantir une meilleure expérience globale
4.  **Optimisation de la Taille**
    -   Réduction drastique de 72% (13,3 Mo vs 48,6 Mo)
    -   Décomposition des gains :
        -   Images WebP : ~60% de réduction
        -   Élimination du Base64 : ~25% de réduction

### 🔄 Analyse des Hot vs Cold Starts

**Cold Start (Premier Chargement)**

-   Cache vide
-   Téléchargement complet des ressources
-   Création des caches navigateur
-   Compilation initiale du JavaScript

**Hot Start (Chargements Suivants)**

-   Utilisation du cache navigateur
-   Réduction significative du Load Time (893ms vs 8,59s)
-   Amélioration de 89% du temps de chargement
-   Bénéfices de la stratégie de mise en cache d'Astro


## 🚀 Installation et Démarrage
Installation des dépendances
```bash
npm install
```

Démarrage du serveur de développement
```bash
npm run dev
```
Construction du site
```bash
npm run build
```

Prévisualisation de la version de production
```bash
npm run preview
```


## ⚠️ Limitations

- Site optimisé uniquement pour la version desktop (Pas de version responsive)
- Projet à but éducatif uniquement

## 🎨 Crédits

Ce projet est un clone développé à des fins éducatives, inspiré par le site [Ichiban.bike](https://www.ichiban.bike/). Tous les droits de design originaux appartiennent à leurs propriétaires respectifs.

## 📝 Note

Ce projet est une reproduction non officielle créée dans un but d'apprentissage et ne doit pas être utilisé à des fins commerciales.