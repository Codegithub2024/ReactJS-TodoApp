Todo App - 2026

Description du Projet

Ce projet est une application de gestion de tâches (Todo List) moderne, développée avec React et TypeScript, et stylisée avec Tailwind CSS. L'objectif principal était de créer une application performante, typée et dotée d'une expérience utilisateur soignée, incluant la persistance des données via le localStorage.

L'application permet aux utilisateurs de :

•
Ajouter de nouvelles tâches avec un titre et une catégorie prédéfinie.

•
Marquer des tâches comme complétées ou les supprimer.

•
Filtrer les tâches par catégorie (ex: Matin, Midi, Soir).

•
Filtrer les tâches par statut (Toutes, Complétées, En cours).

•
Conserver l'état des tâches entre les sessions grâce à la persistance locale.

Technologies Utilisées

Technologie
Rôle
React
Bibliothèque JavaScript pour la construction de l'interface utilisateur.
TypeScript
Ajout du typage statique pour une meilleure robustesse et maintenabilité du code.
Tailwind CSS
Framework CSS utilitaire pour un stylisme rapide et réactif.
Hooks Personnalisés
Utilisation d'un hook useLocalStorage pour la gestion de la persistance des données.
crypto.randomUUID()
Génération d'identifiants uniques et sécurisés pour chaque tâche.




Fonctionnalités Techniques Clés

1. Persistance des Données

La persistance est gérée par un hook personnalisé, useLocalStorage, qui encapsule la logique de lecture et d'écriture dans le localStorage du navigateur.

•
Initialisation Lazy : Le hook utilise la fonction d'initialisation de useState pour lire les données du localStorage une seule fois au montage du composant, optimisant ainsi les performances.

•
Sécurité : Un bloc try...catch est implémenté pour gérer les erreurs potentielles lors de la lecture des données (ex: données corrompues).

•
Synchronisation : Un useEffect synchronise l'état de l'application avec le localStorage à chaque modification de la liste de tâches.

2. Logique de Filtrage Optimisée

La logique de filtrage des tâches a été refactorisée pour être déclarative et facile à maintenir, combinant les filtres de catégorie et de statut de manière séquentielle.

TypeScript

```js
const filteredTodos = todos.filter((todo) => {
  const categoryMatch = selectedCategory === "" || todo.category === selectedCategory;
  const statusMatch =
    status === "all" || todo.complete === (status === "completed");

  return categoryMatch && statusMatch;
});
```

3. Design et Expérience Utilisateur (UX)

L'interface a été conçue en mettant l'accent sur la clarté et l'esthétique moderne :

•
Design Minimaliste : Utilisation d'une palette de couleurs neutres (noir, blanc, gris) pour une focalisation maximale sur le contenu.

•
Typographie Distinctive : Choix d'une police serif pour le titre afin de donner un caractère unique à l'application.

•
Amélioration de l'UX : Les actions sur les tâches utilisent des icônes standard (corbeille pour la suppression, coche pour la complétion) pour une meilleure intuitivité.

Aperçu

![Uploading image.png…]()


