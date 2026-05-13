# Translation Candidate
- Slug: protect-your-tokens
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-27--protect-your-tokens/it/index.mdx
- Validation: passed
- Runtime seconds: 2.02
- Input tokens: 6904
- Output tokens: 1578
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.000553
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Proteggi token,chiavi API e segreti'
subTitle: Pubblico? Privato? Che?
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

<!--  For the purpose of this article we'll treat the following terms as related: . **They are not interchangable** despite most documentation and [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key) answers using them as such. -->

<!-- (Google Maps Credentials, AWS S3 Keys, Geocoding Service, etc.)  -->

> Proteggere le chiavi API e i token è **cruciale**!

Un solo errore può far perdere il controllo del tuo server e dei dati agli hacker!

Non dovrebbe essere così difficile stabilire se un token specifico debba essere nascosto – anche basandosi sulla documentazione ufficiale!

Spesso la situazione è aggravata dal miscuglio di termini correlati che incontrerai: _token_, _chiavi_, _credenziali_, _segreti_, _privato_ e _pubblico_.

Riformuliamolo come una distinzione tra `secret` e `non-secret`.

* 🔒 [`Secret keys`](#-secret-keys) DEVONO rimanere nascosti. In generale non dovrebbero MAI lasciare il tuo server privato (o servizio – come heroku, netlify o travis-ci).
* 🌍 [`Non-secret keys`](#-non-secret-keys) indica stringhe che possono essere condivise liberamente e incluse nelle richieste del browser.

<br />

---------------------------------------------

## 🔒 `Secret keys`

** ‼️ Importante:** `Secret keys` **DEVONO** essere ignorate da Git _E_ omesse in tutto il codice del browser. [_Come usare dotenv_](#-how-to-handle-secrets-safely)

<br />

_​Come fai a capire quando stai gestendo una `Secret key`?_

<br />

**👍 Regola pratica:** i server che restituiscono `CORS errors` non hanno supporto nel browser. Indica fortemente che **DEVI** fare da proxy al servizio, trattandolo come se fosse `secret`.

**👍 Regola pratica:** i servizi costosi dovrebbero (quasi) sempre essere proxyati o nascosti.

**👍 Regola pratica:** se esegui un'operazione di scrittura (**upload di file, inserimento di una riga nel DB**), potresti star gestendo `secret keys`.

<br />

**_Casi d'uso e funzionalità:_** `Secret` keys

- Autorizzazione a lungo termine (credenziali, token di accesso, JSON Web Token)
- Autorizzazione a breve termine (token OAuth, session store)
- Accesso a servizi a pagamento/costosi (per autenticazione, geocoding, archiviazione file, ecc.)
- Parte privata della coppia pubblico/privato (RECAPTCHA, Stripe, Auth0)
- Credenziali di servizio (Email/SMTP, LDAP/Directory Services)
- Cifratura dei dati e verifica di integrità

### Checklist: Gestire i Segreti in Sicurezza

#### Panoramica rapida

Completa i seguenti passaggi per **eliminare i segreti dal tuo codice**:

- [ ] Sostituisci le chiavi hard‑coded con variabili d’ambiente. ad es. `process.env.API_SECRET`
- [ ] Usa una libreria come [`dotenv`](https://github.com/motdotla/dotenv#dotenv) insieme a un file `.env`. Aggiungi i segreti precedentemente hard‑coded al file `.env`.
- [ ] Inserisci una riga `.env` nel tuo file `.gitignore`!

> **NON** creare un file `.env` sui server di produzione. Usa lo strumento di gestione delle variabili d’ambiente fornito dal tuo servizio di hosting (ad es. [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2): ad es. **dashboard o riga di comando**.

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">Articolo correlato: <a href="../securely-using-environment-variables-in-nodejs/">Usare dotenv in modo sicuro in NodeJS</a></h2></blockquote>

-----------------------------------

## 🌍 `Non-secret keys`

**👍Regola pratica:** ogni volta che una chiave deve essere inviata al browser nel codice o inline (ad es. tramite un tag `<script src="https://my-api/?apiKey=123-abc-456">`), **è sicuramente una `non-secret`**. Un esempio comune è Google Maps.

<br />

**_Casi d'uso e funzionalità:_** chiavi `Non-secret`

- Accesso a breve termine (ID sessione utente, JSON Web Token)
- Limitare l'accesso API per app/sviluppatore (per autenticazione, geocoding, ecc.)
- Parte pubblica di una coppia pubblico/privato (RECAPTCHA, Stripe, Auth0)
- ID di analytics

#### ✅ Gestione dei non‑segreti:

> **È sicuro inserire direttamente nel codice le chiavi non‑segrete (pubbliche)!**

Rendi più semplice la gestione a lungo termine usando un file `config.js` condiviso per la tua applicazione.

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

**Nota:** Esistono altri _Use Cases_ per le variabili d'ambiente. Alcuni che non ho trattato: CI/CD/testing, feature flag e configurazione a runtime per ambienti speciali!
````
