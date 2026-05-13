# Translation Candidate
- Slug: protect-your-tokens
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-10-27--protect-your-tokens/fr/index.mdx
- Validation: passed
- Runtime seconds: 15.43
- Input tokens: 6183
- Output tokens: 5636
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001847
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Sécuriser vos tokens, clés API et secrets'
subTitle: Public ? Privé ? Quoi ?
date: '2018-10-27'
modified: '2024-07-30'
tags:
  - tokens
  - api-keys
  - secrets
  - security
  - nodejs
  - json-web-tokens
category: Guides
subCategory: security
cover: ../dayne-topkin-78982-unsplash.webp
cover_mobile: ../w300_dayne-topkin-78982-unsplash.webp
cover_icon: ../icon_dayne-topkin-78982-unsplash.webp
---
## Quand protéger vos jetons ?

<!--  Dans le cadre de cet article, nous considérerons les termes suivants comme liés : . **Ils ne sont pas interchangeables** malgré l'utilisation courante dans la plupart des documentations et [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key) y compris. -->

<!-- (Google Maps Credentials, AWS S3 Keys, Geocoding Service, etc.)  -->

> La sécurisation des clés et jetons API est **extrêmement importante** !

Une seule erreur peut entraîner une perte de contrôle totale de votre serveur et de vos données face aux pirates informatiques !

Il ne devrait pas être si difficile de déterminer si un jeton particulier doit être caché - même en se basant sur la documentation officielle !

Cela est souvent aggravé par la confusion entre les termes liés que vous rencontrerez : _tokens_, _keys_, _credentials_, _secrets_, _private_, et _public_.  

Réexaminons cela en distinguant clairement `secret` et `non-secret`.  

* 🔒 [`Clés secrètes`](#-secret-keys) **DOIVENT** rester cachées. En général, elles NE DOIVENT JAMAIS quitter votre serveur privé (ou service comme Heroku, Netlify ou Travis-CI).  
* 🌍 [`Clés non secrètes`](#-non-secret-keys) désignent des chaînes pouvant être partagées librement et incluses dans les requêtes du navigateur.  

<br />  

---------------------------------------------  

## 🔒 `Clés secrètes`

**‼️ Important :** les `clés secrètes` **DOIVENT** être ignorées par Git _ET_ exclues de tout code de navigateur. [Comment utiliser dotenv](#-how-to-handle-secrets-safely)  

<br />  

**Comment savoir quand vous travaillez avec une clé secrète ?**  

<br />  

**👍 Règle empirique :** les serveurs qui renvoient des `erreurs CORS` n'ont pas de support navigateur. Cela indique fortement que vous **DEVEZ** proxifier le service, en traitant ce dernier comme s'il s'agissait d'une clé secrète.  

**👍 Règle empirique :** les services coûteux devraient presque toujours être proxifiés ou masqués.

**👍 Règle empirique :** si vous effectuez une opération d'écriture (**upload de fichier, insertion d'une ligne dans la base de données**), vous manipulez probablement des `clés secrètes`.  

<br />  

**_Cas d'utilisation & fonctionnalités :_** `clés secrètes`  

- Autorisation à long terme (identifiants, jetons d'accès, JSON Web Tokens)  
- Autorisation à court terme (tokens OAuth, stockage de session)  
- Accès à des services payants/coûteux (pour l'authentification, le géocodage, le stockage de fichiers, etc.)  
- Partie privée d'une paire publique/privée (RECAPTCHA, Stripe, Auth0)  
- Identifiants de service (Email/SMTP, LDAP/Services de répertoire)  
- Chiffrement des données et vérification de l'intégrité  

### Liste de vérification : Gestion sécurisée des secrets  

#### Aperçu rapide

Pour **éliminer les secrets de votre code**, suivez ces étapes :

- [ ] Remplacez les clés codées en dur par des variables d'environnement. Exemple : `process.env.API_SECRET`  
- [ ] Utilisez une bibliothèque comme [`dotenv`](https://github.com/motdotla/dotenv#dotenv) accompagnée d'un fichier `.env`. Ajoutez-y les secrets précédemment codés en dur.  
- [ ] Ajoutez une ligne `.env` dans votre fichier `.gitignore` !  

> **NE PAS** créer de fichier `.env` sur les serveurs déployés. Utilisez les outils de gestion des variables d'environnement fournis par votre service d'hébergement (ex. : [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2) : **interface de gestion ou ligne de commande**.  

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">Article lié : <a href="../securely-using-environment-variables-in-nodejs/">Utilisation sécurisée de dotenv dans NodeJS</a></h2></blockquote>  

-----------------------------------  

## 🌍 `Clés non secrètes`

**👍 Bonne pratique :** lorsqu'une clé doit être envoyée au navigateur en code ou en inline (par exemple via une balise `<script src="https://my-api/?apiKey=123-abc-456">`), **il s'agit inévitablement d'une `clé non confidentielle`**. Un exemple courant est Google Maps.  

<br />  

**_Cas d'usage & fonctionnalités :_** clés `non confidentielles`  

- Accès à court terme (identifiants de session utilisateur, JSON Web Tokens)  
- Limiter l'accès à l'API par application/développeur (authentification, géocodage, etc.)  
- Partie publique d'une paire publique/privée (RECAPTCHA, Stripe, Auth0)  
- Identifiants d'analytique  

#### ✅ Gestion des clés non confidentielles :  

> **Il est sécurisé de coder en dur les clés non confidentielles (publiques) !**

Rendez cela plus facile à gérer à long terme avec un fichier `config.js` partagé pour votre application.

**Exemple :**

```js
// config.js
module.exports = {
  googleMapsKey: '123-abc'
};
```

```js
// load-map.js
const config = require('./config.js');
const key = config.googleMapsKey;
const src = `//maps.googleapis.com/maps/api/js?key=${key}`;
// ...
```

-----------------------------------

**Remarque :** Il existe d'autres _Cas d'utilisation_ pour les variables d'environnement. Certains que je n'ai pas abordés : CI/CD/tests, drapeaux de fonctionnalité et configuration au runtime pour des environnements spéciaux !
````
