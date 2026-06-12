## 🌍 Informations générales

Ressources Santé et Précarité:

Ce site se veut être un outil pratique à destination des professionnels de santé dans la région Auvergne Rhône-Alpes.
Par un système de mots clés, vous serez orientés vers des thématiques.
Retrouvez pour chacune de ces thématiques, une multitude de fiches pratiques qui vous aideront à orienter et accompagner les patients.

## 🤖 Techno

Le site a été créé avec Next.js et hébergé par Vercel

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Vercel](https://vercel.com/docs)

## 🏗 Architecture:

| Dossier        | Description                                                                    |
| -------------- | ------------------------------------------------------------------------------ |
| public         | Assets comprenant le logo RESAP et les logos respectifs des partenaires.       |
| src/assets     | Feuille de style CSS du site.                                                  |
| src/components | Tous les composants REACT du site.                                             |
| src/pages      | Regroupe les différentes pages et API du site.                                 |
| src/services   | Méthodes qui font appels à des services distants.                              |
| src/types      | Sommaire des différentes variables de Contentful ainsi que leurs types.        |
| src/utils      | Fonctions sans logique particulière qui peuvent servir sur l'ensemble du site. |

## 🇫🇷 Langue

RESAP ayant un scope uniquement français, et un métier utilisant des termes français spécifiques qu'ils ne seraient pas forément pertinents à traduire, le choix a été fait d'utiliser du français (sans accents) dans le code lorsque l'on parle du métier. On considère les entités comme des noms propres.

Pour tout ce qui concerne les méthodes du langage ou les spécificités des frameworks, ça reste de l'anglais.

## ⚙️ Prérequis

⚠️ Une fois que votre fork est installé localement sur votre machine, bien penser à exécuter le code suivant :

```bash
cp .env.example .env
```

Ce qui générera les variables d'environnements.

Puis remplir les clés API dans le fichier .env pour pouvoir naviguer sur le serveur de développement.

Installer les dépendances avec Yarn en utilisant le code suivant :

```bash
yarn install
```

Puis remplir les clés API dans le fichier .env pour pouvoir naviguer sur le serveur de développement.

## 💿 Compilation

| Commande   | Description      |
| ---------- | ---------------- |
| yarn build | Build le projet. |

## 🚦 Démarrage

Afin de lancer le serveur de développement:

| Commande | Description                         |
| -------- | ----------------------------------- |
| yarn dev | Lancer le serveur de développement. |

Puis ouvrir [http://localhost:3000](http://localhost:3000) depuis votre navigateur pour en voir le résultat.
Les pages modifiées sont automatiquement mises à jour sur l'adresse : http://localhost:3000

## 📝 Petites règles de contribution

### Les commits et noms de PR

- Doivent commencer par l'emoji correspondant **DIRECTEMENT EN CHARACTÈRE UNICODE** (`🎨` et pas `:art:`),
- Doivent contenir une description clair (peu importe la langue tant que tout le monde comprend)
- Doivent contenir une majuscule, un nom, un complément, et un signe de ponctuation !
- Pour les merge de PR, le commit doit contenir une vrai description qui résume la PR (souvent le titre), et le numéro de PR entre parenthèse à la fin.
- Exemples :
  - ✨ Ajout du formulaire de recherche sur la Home. (#134)
  - 🐛 Fix select blur.
  - 💚 Lint.

#### Convention Gitmoji:

| Emoji | Definition                                 |
| ----: | :----------------------------------------- |
|    ✨ | Introducing new features                   |
|    🐛 | Fixing a bug                               |
|    🎨 | Improving structure / format of the code   |
|    ✅ | Adding tests                               |
|    💚 | Fixing CI Build                            |
|     ♻ | Refactoring code                           |
|    ⚡ | Improving performance                      |
|    🚧 | Work in progress                           |
|    🔥 | Removing code or files                     |
|    🚑 | Critical hotfix                            |
|    📝 | Writing docs                               |
|    🚀 | Deploying stuff                            |
|    💄 | Updating the UI and style files            |
|    🔖 | Releasing / Version tags                   |
|    🐳 | Work about Docker                          |
|    🔧 | Changing configuration files               |
|     ✏ | Fixing typos                               |
|    💩 | Writing bad code that needs to be improved |
|    ⏪ | Reverting changes                          |
|    🔀 | Merging branches                           |
|    📦 | Updating packages                          |
|    👽 | Updating code due to external API changes  |
|    🚚 | Moving or renaming files                   |
|    💥 | Introducing breaking changes               |
|    👌 | Updating code due to code review changes   |
|    💡 | Documenting source code                    |
|    💬 | Updating text and literals                 |
|    🗃 | Performing database related changes        |
|    🏗 | Making architectural changes               |
|    📸 | Adding or updating snapshots               |

Origine:
https://gitmoji.carloscuesta.me/

Sous mac:

- `⌃ + ⌘ + SPACE` pour choisir l'emoji
- [Alfred Gitmoji workflow](https://github.com/Quilljou/alfred-gitmoji-workflow),
- [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli)

Sous windows:

- `Win + .` pour choisir l'emoji

Sous linux:

Si vous êtes sur gnome vous pouvez utilisez cette [application](https://extensions.gnome.org/extension/1162/emoji-selector/)
Sinon vous pouvez utilisez [rofi](https://github.com/davatorium/rofi) couplé avec un plugin comme [rofimoji](https://github.com/fdw/rofimoji).

Pour une font qui supporte les emoji vous pouvez regarder du côté des [nerdfonts](https://github.com/ryanoasis/nerd-fonts)
Ou bien, gardez votre font favorite et configurez votre système pour utiliser les emoji de [google noto](https://github.com/googlefonts/noto-fonts), comme [fait ici](https://github.com/Mange/dotfiles/blob/50146bbb3098e0f831578f83c8cd3a431dd3960d/snowflakes/fonts-conf.d/90-fallbacks.conf#L15..L20)
En CLI, vous pouvez utiliser https://github.com/inishchith/em-keyboard

---

Les commits et leurs emoji servent notamment à générer le changelog automatiquement, il est donc important d'y prêter attention.

## 📦 Standardisation

Le projet utilise les règles ESLint mise en place par Airbnb en version 19.0.4

## 👽 API

- Contentful : CMS permettant de gérer les fiches pratiques
- Algolia : Réalise la recherche en temps réel des fiches
- Contact : Système de mailing
- Preview : Permet de voir les modifications réalisées mais qui n'ont pas été publiées
- Exit-preview : Quitte le mode preview

## ✨ Fonctionnalités

- Chercher des informations sur différents accès aux services de soins/sociaux
- Contacter l'organisme RESAP pour de plus amples informations

## ⚖️ Licence

Le site de RESAP est sous licence [MIT](https://opensource.org/licenses/MIT)
