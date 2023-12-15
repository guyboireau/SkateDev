# SkateDev

Bienvenue sur SkateDev, la plateforme incontournable pour les passionnés de skatepark. Que vous soyez un skateur aguerri ou un débutant, SkateDev offre une gamme de fonctionnalités conçues pour enrichir votre expérience de skatepark. Découvrez, partagez et connectez-vous avec une communauté dédiée au skateboarding.

**Public Cible** : Skateurs, amateurs de skateparks, et communauté de skateboarding.

**Caractéristiques Principales** :
- Exploration de différents skateparks
- Interface utilisateur conviviale
- Gestion de profil utilisateur
- Paramètres personnalisables

## Table des Matières
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)

## Prérequis
- Node.js
- npm 

## Installation
1. Clonez le dépôt : `git clone [URL du dépôt]`
2. Installez les dépendances : `npm install`
3. Lancez le serveur de développement : `npm run dev`
4. Accédez à l'application via `http://localhost:5173/`

## Utilisation

 **Page d'Accueil** : Interface conviviale pour commencer l'exploration.

La page d'accueil (Home) accueille les utilisateurs avec une interface conviviale.

**Inscription et Connexion** : Gestion des comptes utilisateurs.


Pour les nouveaux utilisateurs, une page d'inscription (RegisterForm) est disponible pour créer un nouveau compte. Les utilisateurs existants peuvent se connecter à leur compte via la page de connexion (LoginForm).

**Exploration de Skateparks** : Découvrez différents skateparks et leurs caractéristiques aisni que le système de notation et commentaires


Une fois connectés, les utilisateurs peuvent accéder à la page du skatepark (Skatepark) pour explorer les différents skateparks. Ils peuvent également accéder à une page de skatepark spécifique (Park) en utilisant l'identifiant unique du skatepark, l'utilisateur peut noter et commenter chaque skatepark.

**Gestion du Profil** : Consultez et modifiez vos informations personnelles.


Les utilisateurs ont également accès à leur profil (UserProfile) où ils peuvent voir et modifier leurs informations personnelles. Ils peuvent également accéder à la page des paramètres (UserSettingsForm) pour personnaliser leur expérience sur le site.

**Page d'Erreur** : Redirection en cas de page inexistante.

Si un utilisateur essaie d'accéder à une page qui n'existe pas, il sera redirigé vers une page d'erreur (NotFound).

Toutes les pages sont protégées par une authentification, garantissant que seuls les utilisateurs connectés peuvent accéder à certaines fonctionnalités du site.


