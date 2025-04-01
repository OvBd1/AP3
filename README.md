# AP3

## Description
AP3 est un projet de développement d'une application web pour l'entreprise fictive GSB avec une architecture front-end et back-end en monorepo. C'est une application permettant d'acheter des médicaments

## Prérequis
Avant d'installer et d'exécuter ce projet, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version recommandée : 16.x ou plus)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/OvBd1/AP3.git
   cd AP3
   ```

2. **Installer les dépendances**
   - Pour le backend :
     ```bash
     cd back
     npm install
     ```
   - Pour le frontend :
     ```bash
     cd ../front
     npm install
     ```

## Utilisation

### Démarrer le backend
Dans le dossier `back`, lancez la commande suivante :
```bash
npm start
```
Cela démarre le serveur backend.

### Démarrer le frontend
Dans le dossier `front`, lancez la commande suivante :
```bash
npm start
```
Cela démarre l'interface utilisateur.

## Structure du projet

```
AP3/
│── back/       # Code du serveur (backend)
│── front/      # Code de l'interface utilisateur (frontend)
│── README.md   # Documentation du projet
```
