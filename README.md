# Jeu de Deviner le Nombre (TypeScript + Vite)

Un petit jeu simple dans le navigateur où il faut deviner un nombre.  
Construit avec **TypeScript** et **Vite**.

## Démo

Sélectionnez un niveau de difficulté (Facile, Normal, Difficile) pour définir la plage de nombres.  
Entrez un nombre dans la plage indiquée et essayez de deviner le nombre correct.  
Le jeu vous donnera un retour sur chaque tentative et suivra le nombre d'essais.  

## Fonctionnalités

- Sélection de niveau de difficulté : Facile (1-10), Normal (1-100), Difficile (1-1000)
- Saisir un nombre dans une plage définie selon le niveau choisi
- Affichage des retours pour chaque tentative (trop haut, trop bas, correct)
- Compteur du nombre d'essais
- Bouton pour recommencer le jeu
- Développé avec TypeScript, HTML et CSS vanilla

## Installation

1. Cloner le dépôt :

```bash
git clone https://github.com/votre-username/number-guessing-game-ts.git
cd number-guessing-game-ts
```

1. Installer les dépendances :

```bash
npm install
# ou
yarn
# ou
pnpm install
```

1. Lancer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

1. Ouvrir votre navigateur sur `http://localhost:5173` (ou l’URL indiquée dans le terminal).

## Structure du projet

```text
.
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── .gitignore
├── LICENSE
└── src/
    ├── main.ts
    ├── style.css
    ├── models/
    │   └── Game.ts
    ├── mocks/
    │   └── difficultyLevels.json
    └── services/
        ├── NumberGuessingGame.ts
        ├── GameUI.ts
        └── GameLevel.ts
```

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
