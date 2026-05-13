# Translation Candidate
- Slug: protect-your-tokens
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-10-27--protect-your-tokens/it/index.mdx
- Validation: passed
- Runtime seconds: 21.61
- Input tokens: 6443
- Output tokens: 5887
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001928
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Protezione dei Tuoi Token, Chiavi API e Segreti'
subTitle: ''
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
## Quando proteggere i tuoi token?

<!-- Per lo scopo di questo articolo tratteremo i seguenti termini come correlati: . **Non sono intercambiabili** nonostante la maggior parte delle documentazioni e [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key) li usi come tali. -->

<!-- (Google Maps Credentials, AWS S3 Keys, Geocoding Service, ecc.)  -->

> La protezione delle chiavi API e dei token è **estremamente importante**!

Un singolo errore può portare alla perdita del controllo del tuo server e dei tuoi dati da parte di hacker!

Dovrebbe essere più semplice determinare se un particolare token deve essere nascosto, anche in base alla documentazione ufficiale!

Spesso la situazione si complica ulteriormente con il brodo di termini correlati che incontrerai: _tokens_, _keys_, _credentials_, _secrets_, _private_ e _public_.  

Riorganizziamo il tutto distinguendo tra `secret` e `non-secret`.  

* 🔒 [`Secret keys`](#-secret-keys) DEBBONO essere tenute nascoste. In generale, NON DOVREBBERO MAI abbandonare il tuo server privato (o servizio - come Heroku, Netlify o Travis-CI).  
* 🌍 [`Non-secret keys`](#-non-secret-keys) descrivono stringhe che possono essere condivise liberamente e incluse in richieste dal browser.  

<br />  

---------------------------------------------  

## 🔒 `Secret keys`

**‼️ Importante:** Le `Secret keys` **DEBBONO** essere ignorate da Git _E_ omesse in tutto il codice del browser. [Come usare dotenv](#-how-to-handle-secrets-safely)  

<br />  

_Come sai quando stai utilizzando una `Secret key`?_  

<br />  

**👍 Regola empirica:** i server che restituiscono `CORS errors` non supportano il browser. Indica fortemente che **DEVI** utilizzare un proxy per il servizio, trattandolo come se fosse segreto.  

**👍 Regola empirica:** i servizi costosi dovrebbero (quasi) sempre essere proxy o nascosti.

**👍 Regola empirica:** se esegui un'operazione di scrittura (**caricamento file, inserimento riga db**), potresti stare utilizzando chiavi segrete.  

<br />  

**_Casi d'uso & funzionalità:_** `Secret` keys  

- Autorizzazione a lungo termine (credenziali, token di accesso, JSON Web Tokens)  
- Autorizzazione a breve termine (token OAuth, store sessioni)  
- Accesso a servizi a pagamento/costosi (per autenticazione, geocoding, archiviazione file, ecc.)  
- Parte privata di una coppia chiave pubblica/privata (RECAPTCHA, Stripe, Auth0)  
- Credenziali di servizio (Email/SMTP, LDAP/Servizi Directory)  
- Crittografia dati e controllo dell'integrità  

### Checklist: Gestione Sicura dei Secret  

#### Panoramica rapida

Completa i seguenti passaggi per **eliminare i secret dal codice:**

- [ ] Sostituisci le chiavi hardcoded con variabili d'ambiente. Es. `process.env.API_SECRET`  
- [ ] Utilizza una libreria come [`dotenv`](https://github.com/motdotla/dotenv#dotenv) insieme al file `.env`. Aggiungi i secret precedentemente hardcoded nel file `.env`.  
- [ ] Aggiungi una riga `.env` nel file `.gitignore`!

> **NON** creare un file `.env` sui server in produzione. Usa gli strumenti di gestione delle variabili d'ambiente forniti dai tuoi servizi di hosting (es. [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2): ad esempio **dashboard o riga di comando**.

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">Articolo correlato: <a href="../securely-using-environment-variables-in-nodejs/">Utilizzo sicuro di dotenv in NodeJS</a></h2></blockquote>

-----------------------------------

## 🌍 `Chiavi non segrete`

**👍 Regola empirica:** ogni volta che una chiave deve essere inviata al browser nel codice o inline (es. tramite un tag `<script src="https://my-api/?apiKey=123-abc-456">`), **è sicuramente una chiave `non segreta`**. Un esempio comune è Google Maps.

<br />

**_Casi d'uso e funzionalità:_** chiavi `non segrete`

- Accesso a breve termine (ID sessione utente, JSON Web Tokens)
- Limitazione dell'accesso all'API per app/sviluppatore (per autenticazione, geocoding, ecc.)
- Parte pubblica della coppia chiave pubblica/privata (RECAPTCHA, Stripe, Auth0)
- ID di analisi

#### ✅ Gestione delle chiavi non segrete:

> **È sicuro codificare in modo fisso le chiavi non segrete (pubbliche)!**

Facilita la gestione a lungo termine con un `config.js` condiviso per la tua app.

**Esempio:**

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

**Nota:** Ci sono altre _Utilizzazioni_ per le variabili d'ambiente. Alcune non le ho coperte: CI/CD/testing, feature flags e configurazione a runtime per ambienti speciali!
````
