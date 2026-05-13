# Translation Candidate
- Slug: securely-using-environment-variables-in-nodejs
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/it/index.mdx
- Validation: deferred
- Runtime seconds: 9.49
- Input tokens: 3551
- Output tokens: 3214
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001055
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Utilizzo delle variabili d'ambiente in NodeJS
subTitle: Utilizzo di `dotenv`
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
## Gestione sicura di segreti e token API

### Articolo correlato: [Proteggi i tuoi token](../protect-your-tokens/)

Ricapitoliamo rapidamente la differenza tra `secrets` e `non-secrets`.

* 🔒 `Chiavi segrete` DEVONO utilizzare un server personalizzato (ad es. Node/Express/Heroku) per nascondere (proxy) le richieste alle API di terze parti.
* 🌍 `Chiavi non segrete` descrivono chiavi che possono essere inviate al browser.

<br />

---------------------------------------------

> Ci concentreremo sull'utilizzo delle 🔒 `Chiavi segrete` tramite le **Variabili d'ambiente** in questo articolo.

[Gli esempi di codice sono inclusi di seguito.](#️-esempio-di-codice)

#### Panoramica

Per **accedere in modo sicuro ai segreti nel tuo codice NodeJS:**

1. Sostituisci le chiavi codificate con variabili d'ambiente. Ad esempio: `process.env.API_SECRET`  
1. Utilizza una libreria come [`dotenv`](https://github.com/motdotla/dotenv) insieme a un file `.env`. Aggiungi i segreti precedentemente codificati nel file `.env`.  
1. Verifica la presenza della riga `.env` nel tuo file `.gitignore`!

> **NON** creare mai un file `.env` sui server deployati. Utilizza gli strumenti di gestione delle variabili d'ambiente forniti dai tuoi servizi di hosting (es. [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2): ad esempio **dashboard o interfaccia a riga di comando**.

### Esempio di codice

Definiremo alcuni file.

1. `.env`  
1. `./db/connection.js`  
1. `./api/users.js`  

<!-- Esempio di oggetto config che utilizza `process.env.PG*`  

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

Il file `db/config.js` è solo un esempio di come dovresti archiviare i tuoi segreti per il riutilizzo nel codice.
-->

Prima, installa il pacchetto [`dotenv`](https://www.npmjs.com/package/dotenv).

```bash
npm install dotenv
```

Successivamente, crea un file `.env` nella radice del tuo progetto.

```
# .env
PGDATABASE="postgres"
PGHOST="localhost"
PGPORT=5234
PGUSER="postgres"
PGPASSWORD="password"
```

❌ **MAI** committare il file `.env`.

❌ Evita di creare `.env` sui server.

Controlla le documentazioni del tuo Hosting Provider per configurare le _variabili d'ambiente_.

Per verificare facilmente che il tuo `.gitignore` abbia una riga `.env`:

```bash
# Aggiorna automaticamente .gitignore
# Esegui nel terminale:
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# nota: non verrà stampato alcun output
```

Il file `./db/connection.js` fornisce un'istanza condivisa di `pg.Pool`. Verrà utilizzato per interrogare il database.

```js
// ./db/connection.js
require('dotenv').config(); // ✅ Carica il file .env
const pg = require('pg');
const {PGUSER, PGHOST, PGPORT} = process.env;

if (process.env.NODE_ENV === 'development')
  console.log(`Connessione a ${PGUSER} @ ${PGHOST}:${PGHOST}`);
// ^^ solo per mostrare le variabili di debug della connessione

// pg utilizza automaticamente le variabili d'ambiente PG*
module.exports = new pg.Pool();
```

La cartella `./api` contiene interfacce per le tue tabelle/viste.

Ecco un esempio di `./api/users.js` per la tabella `users`.

```js
// ./api/users.js
const db = require('../db/connection.js');

module.exports = {
  findUsername: function(username) {
    return db.query('SELECT * FROM users WHERE username=$1', username);
  }
};
```

- Non committare mai i segreti di `.env` su git!
- Non condividere i file `.env` con il team. *

* Ogni nuovo laptop o desktop per lo sviluppo dovrebbe **generare nuove chiavi di accesso e token.**  
Se non è possibile, condividi `.env` con molta attenzione (in casi in cui un servizio possa invalidare tutte le chiavi precedenti, o tu abbia token a accesso limitato per API a pagamento).

#### ⚠️ Importante: se necessario, utilizza sempre un servizio di messaggistica sicuro (preferibilmente con supporto per messaggi scaduti).

Buona fortuna e fammi sapere se hai domande! 🎉
````
