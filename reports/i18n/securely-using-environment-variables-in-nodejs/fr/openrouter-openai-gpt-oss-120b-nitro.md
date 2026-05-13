# Translation Candidate
- Slug: securely-using-environment-variables-in-nodejs
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/fr/index.mdx
- Validation: passed
- Runtime seconds: 8.62
- Input tokens: 5078
- Output tokens: 1370
- Thinking tokens: unknown
- Cached input tokens: 2176
- Cache write tokens: 0
- Estimated cost: $0.000445
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Utiliser les variables d’environnement dans NodeJS
subTitle: Utilisation de `dotenv`
date: '2018-11-13'
modified: '2020-07-30'
tags:
  - dotenv
  - api-keys
  - secrets
  - tokens
  - security
  - nodejs
category: Code
subCategory: howto
cover: ../john-salvino-417565-unsplash.webp
cover_mobile: ../w300_john-salvino-417565-unsplash.webp
cover_icon: ../icon_john-salvino-417565-unsplash.webp
---
## Gérer les secrets et les jetons d’API en toute sécurité

### Articleconnexe : [Protégez vos jetons](../protect-your-tokens/)

Récapitulons rapidement la différence entre `secret` et `non-secret`.

* 🔒 Les `clés secrètes` DOIVENT être utilisées via un serveur dédié (par ex. Node/Express/Heroku) afin de masquer (proxy) les requêtes vers les services d’API tiers.
* 🌍 Les `clés non‑secrètes` désignent les clés qui peuvent être envoyées au navigateur.

> Nous nous concentrerons sur la gestion des 🔒 `clés secrètes` à l’aide de **variables d’environnement** dans cet article.

[Les exemples de code sont inclus ci‑dessous.](#️-code-example)

#### Vue d’ensemble

Pour **accéder en toute sécurité aux secrets dans votre code NodeJS** :

1. Remplacez les clés codées en dur par des variables d’environnement, par ex. `process.env.API_SECRET`
2. Utilisez une bibliothèque comme [`dotenv`](https://github.com/motdotla/dotenv) avec un fichier `.env`. Ajoutez vos secrets précédemment codés en dur dans le fichier `.env`.
3. Vérifiez que la ligne `.env` figure bien dans votre fichier `.gitignore` !

> **NE** créez **pas** de fichier `.env` sur les serveurs déployés. Utilisez l’outil de gestion des variables d’environnement fourni par votre hébergeur (par ex. [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2) : par ex. **tableau de bord ou ligne de commande**.

### Exemple de code

Nous allons définir quelques fichiers.

1. `.env`
1. `./db/connection.js`
1. `./api/users.js`

<!-- Exemple d'objet de configuration qui utilise `process.env.PG*`

```js
// ./db/config.js
module.exports = {
  postgres: {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5234,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'password',
    database: process.env.PGDATABASE || 'postgres',
  }
};
```

Le fichier `db/config.js` n’est qu’un exemple de la façon dont vos secrets doivent être stockés pour être réutilisés dans votre code.
-->

Tout d'abord, installez le paquet [`dotenv`](https://www.npmjs.com/package/dotenv).

```bashnpm install dotenv
```

Ensuite, créez un fichier `.env` à la racine de votre projet.

```
# .env
PGDATABASE="postgres"
PGHOST="localhost"
PGPORT=5234
PGUSER="postgres"
PGPASSWORD="password"
```

❌ **NE JAMAIS** valider le fichier `.env`.

❌ Évitez de créer un `.env` sur les serveurs.

Consultez la documentation de votre hébergeur pour configurer les _variables d’environnement_.

Pour vous assurer facilement que votre `.gitignore` contient bien une ligne `.env`.

```bash
# Automatically update .gitignore
# Run in terminal:
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# note: no output will print
```

Le fichier `./db/connection.js` fournit une instance partagée `pg.Pool`. Elle sera utilisée pour interroger la base de données.

```js// ./db/connection.js
require('dotenv').config(); // ✅ Charger le fichier .env
const pg = require('pg');
const {PGUSER, PGHOST, PGPORT} = process.env;

if (process.env.NODE_ENV === 'development')
  console.log(`Connecting to ${PGUSER} @ ${PGHOST}:${PGHOST}`);
// ^^ uniquement pour afficher les variables de connexion en mode débogage

// pg utilise automatiquement les variables d’environnement PG*
module.exports = new pg.Pool();
```

Le dossier `./api` contient les interfaces vers vos tables/vues.

Voici un exemple de `./api/users.js` pour la table `users`.

```js
// ./api/users.js
const db = require('../db/connection.js');

module.exports = {
  findUsername: function(username) {
    return db.query('SELECT * FROM users WHERE username=$1', username);
  }
};
```

-  Ne jamais commettre vos secrets `.env` dans git !
-  Ne partagez pas les fichiers `.env` au sein d’une équipe. *

\* Chaque nouveau portable ou ordinateur de développement doit **générer de nouvelles clés d’accès et jetons**.  
Si ce n’est pas possible, manipulez votre `.env` avec une extrême prudence (dans les cas où un service pourrait invalider toutes les clés antérieures, ou lorsque vous utilisez un jeton d’accès limité d’une API payante).

#### ⚠️ Important : si nécessaire, utilisez toujours un service de messagerie sécurisé (de préférence avec prise en charge de l’expiration des messages).

Bonne chance et n’hésitez pas à me poser des questions ! 🎉
````
