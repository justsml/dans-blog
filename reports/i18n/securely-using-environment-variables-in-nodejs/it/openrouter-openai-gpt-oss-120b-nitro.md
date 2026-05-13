# Translation Candidate
- Slug: securely-using-environment-variables-in-nodejs
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 2.20
- Input tokens: 5046
- Output tokens: 1341
- Thinking tokens: unknown
- Cached input tokens: 2816
- Cache write tokens: 0
- Estimated cost: $0.000438
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/it/index.mdx reports/i18n/securely-using-environment-variables-in-nodejs/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Utilizzare le variabili d’ambiente in NodeJS
subTitle: Utilizzare `dotenv`
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

Ricapitoliamo rapidamente la differenza tra `secret` e `non-secret`.

* 🔒 `Secret keys` DEVONO essere gestite da un server personalizzato (ad es. Node/Express/Heroku) per nascondere (proxy) le richieste ai servizi API di terze parti.
* 🌍 `Non-secret keys` indica chiavi che possono essere inviate al browser.

> Ci concentreremo sulla gestione delle 🔒 `Secret keys` tramite **Variabili d'Ambiente** in questo articolo.

[Gli esempi di codice sono inclusi di seguito.](#️-code-example)

#### Panoramica

Per **accedere in modo sicuro ai segreti nel tuo codice NodeJS**:

1. Sostituisci le chiavi hard‑coded con variabili d'ambiente, ad es. `process.env.API_SECRET`
1. Usa una libreria come [`dotenv`](https://github.com/motdotla/dotenv) insieme a un file `.env`. Aggiungi i segreti precedentemente hard‑coded al file `.env`.
1. Verifica che la riga `.env` sia presente nel tuo file `.gitignore`!

> **NON** creare un file `.env` sui server di produzione. Usa lo strumento di gestione delle variabili d'ambiente fornito dal tuo servizio di hosting (ad es. [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2): ad es. **dashboard o riga di comando**.

### Esempio di codice

Definiremo alcuni file.

1. `.env`
1. `./db/connection.js`
1. `./api/users.js`

<!-- Example config object which uses `process.env.PG*`

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

Il file `db/config.js` è solo un esempio di come i segreti dovrebbero essere memorizzati per il riutilizzo nel codice.
-->

Per prima cosa, installa il pacchetto [`dotenv`](https://www.npmjs.com/package/dotenv).

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

❌ **MAI** commettere il file `.env`.

❌ Evita di creare un `.env` sui server.

Consulta la documentazione del tuo provider di hosting per configurare le _variabili d'ambiente_.

Per assicurarti facilmente che il tuo `.gitignore` contenga una riga per `.env`.

```bash
# Aggiorna automaticamente .gitignore
# Esegui nel terminale:
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# nota: non verrà stampato alcun output
```

Il file `./db/connection.js` fornisce un'istanza condivisa di `pg.Pool`. Verrà usato per interrogare il database.

```js
// ./db/connection.js
require('dotenv').config(); // ✅ Carica il file .env
const pg = require('pg');
const {PGUSER, PGHOST, PGPORT} = process.env;

if (process.env.NODE_ENV === 'development')
  console.log(`Connecting to ${PGUSER} @ ${PGHOST}:${PGHOST}`);
// ^^ solo per mostrare le variabili di debug della connessione

// pg usa automaticamente le variabili d'ambiente PG*
module.exports = new pg.Pool();
```

La cartella `./api` contiene le interfacce alle tue tabelle/viste.

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

-  Non commettere mai i segreti del tuo `.env` su git!
-  Non condividere i file `.env` all'interno del team. *

\* Ogni nuovo laptop o desktop di sviluppo dovrebbe **generare nuove chiavi di accesso e token**.  
Se non è possibile, fai molta attenzione quando condividi il tuo `.env` (ad esempio quando un servizio potrebbe invalidare tutte le chiavi precedenti, o quando un token API a pagamento ha un accesso limitato).

#### ⚠️ Importante: se necessario, utilizza sempre un servizio di messaggistica sicura (preferibilmente con supporto per messaggi che scadono).

Buona fortuna e fammi sapere se hai domande! 🎉
````
