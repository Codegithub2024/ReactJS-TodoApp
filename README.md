# Todo App - 2026

<img width="1883" height="952" alt="Screenshot 2026-01-16 111638" src="https://github.com/user-attachments/assets/e3edabcf-af4a-48ee-9f0b-31e7f6d47990" />
<img width="1388" height="1600" alt="Version mobile2" src="https://github.com/user-attachments/assets/157c0533-0b18-4310-b65c-7316f3876533" />

Une application de gestion de tâches moderne et performante, conçue pour offrir une expérience utilisateur fluide avec une persistance des données locale.

## 🚀 Aperçu du Projet

Ce projet a été développé dans l'optique de mettre en pratique les concepts avancés de **React** et **TypeScript**, tout en soignant l'aspect visuel grâce à **Tailwind CSS**. L'application permet une gestion complète des tâches quotidiennes avec un système de filtrage intelligent par catégorie et par statut.

## Fonctionnalités

- **Gestion des Tâches :** Ajout, suppression et marquage de complétion.
- **Catégorisation :** Organisation des tâches par moments de la journée (Matin, Midi, Soir).
- **Filtrage Avancé :** Filtres croisés par catégories et par état (tout, complet, incomplet).
- **Persistance Locale :** Sauvegarde automatique de vos données dans le navigateur via un Hook personnalisé.
- **Design Moderne :** Interface épurée avec un mode sombre/clair adaptatif et une typographie soignée.

## 🛠️ Stack Technique

- **Framework :** React 19
- **Langage :** TypeScript
- **Styling :** Tailwind CSS
- **Icônes :** Lucide React
- **Identifiants :** API Web Crypto (UUID)
- **Outil :** bun pour améliorer les performances

## 🧠 Concepts Techniques Implémentés

### Hook de Persistance Personnalisé
L'application utilise un hook `useLocalStorage` optimisé qui gère la synchronisation de l'état avec l'API `localStorage` du navigateur, incluant la gestion des erreurs.

### Logique de Filtrage Déclarative
Le filtrage des données est implémenté de manière fonctionnelle et performante, permettant une mise à jour instantanée de l'interface sans rechargement.

```typescript
const filteredTodos = todos.filter((todo) => {
  const categoryMatch = selectedCategory === "" || todo.category === selectedCategory;
  const statusMatch = status === "all" || todo.complete === (status === "completed");
  return categoryMatch && statusMatch;
});
```

## 📦 Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Codegithub2024/ReactJS-TodoApp.git
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```
   ou
   ```bash
   bun install
   ```

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
   ou
   ```bash
   bun dev
   ```

---
Développé avec passion par [Codegithub2024] - 2026
