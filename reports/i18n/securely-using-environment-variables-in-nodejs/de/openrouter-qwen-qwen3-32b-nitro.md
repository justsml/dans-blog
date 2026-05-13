# Translation Candidate
- Slug: securely-using-environment-variables-in-nodejs
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/de/index.mdx
- Validation: passed
- Runtime seconds: 11.72
- Input tokens: 4844
- Output tokens: 4549
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001479
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Verwenden von Umgebungsvariablen in NodeJS
subTitle: Verwenden von `dotenv`
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
## Sichere Handhabung von Geheimnissen und API-Token

### Verwandter Artikel: [Schützen Sie Ihre Tokens](/protect-your-tokens/)

Lassen Sie uns kurz die Unterschiede zwischen `Geheimnissen` und `nicht-geheimen Schlüsseln` zusammenfassen.

* 🔒 `Geheimnisse` müssen einen benutzerdefinierten Server (z. B. Node/Express/Heroku) verwenden, um Anfragen an Drittanbieter-API-Dienste zu verbergen (Proxy).
* 🌍 `Nicht-geheime Schlüssel` beziehen sich auf Schlüssel, die an den Browser gesendet werden können.

<br />

---------------------------------------------

Wir konzentrieren uns in diesem Artikel auf die Verwendung von **Umgebungsvariablen**, um 🔒 `Geheimnisse` zu verwalten.  

[Unten finden Sie Beispiele für Code](#️-code-example).  

#### Übersicht  

Um **Geheimnisse in Ihrem NodeJS-Code sicher zu nutzen**:  

1. Ersetzen Sie hartcodierte Schlüssel durch Umgebungsvariablen. z. B. `process.env.API_SECRET`  
1. Verwenden Sie eine Bibliothek wie [`dotenv`](https://github.com/motdotla/dotenv) zusammen mit einer `.env`-Datei. Fügen Sie die zuvor hartcodierten Geheimnisse in die `.env`-Datei ein.  
1. Stellen Sie sicher, dass die `.env`-Datei in Ihrer `.gitignore`-Datei ausgeschlossen ist!  

> **ERSTELLEN SIE NICHT** eine `.env`-Datei auf bereitgestellten Servern. Nutzen Sie stattdessen das von Ihrem Hosting-Anbieter (z. B. [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2) bereitgestellte Tool zur Verwaltung von Umgebungsvariablen, z. B. **Dashboard oder Befehlszeile**.

### Code-Beispiel

Wir definieren einige Dateien.  

1. `.env`  
1. `./db/connection.js`  
1. `./api/users.js`  

<!-- Beispiel-Konfigurationsobjekt, das `process.env.PG*` nutzt  

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

Die Datei `db/config.js` ist nur ein Beispiel dafür, wie Ihre Geheimnisse für die Wiederverwendung in Ihrem Code gespeichert werden sollten.  
-->

Zunächst installieren Sie das Paket [`dotenv`](https://www.npmjs.com/package/dotenv).

```bash
npm install dotenv
```

Erstellen Sie anschließend eine Datei `.env` in der Wurzel Ihres Projekts.

```
# .env
PGDATABASE="postgres"
PGHOST="localhost"
PGPORT=5234
PGUSER="postgres"
PGPASSWORD="password"
```

❌ **NIEMALS** die `.env`-Datei committen.

❌ Vermeiden Sie die Erstellung von `.env` auf Servern.

Überprüfen Sie die Dokumentation Ihres Hosting-Anbieters, um _Umgebungsvariablen_ einzurichten.

Um sicherzustellen, dass Ihre `.gitignore`-Datei eine Zeile mit `.env` enthält:

```bash
# Automatisch .gitignore aktualisieren
# Ausführen im Terminal:
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# Hinweis: Es wird keine Ausgabe angezeigt
```

Die Datei `./db/connection.js` stellt eine gemeinsame `pg.Pool`-Instanz bereit. Sie wird verwendet, um die Datenbank abzufragen.

```js
// ./db/connection.js
require('dotenv').config(); // ✅ .env-Datei laden
const pg = require('pg');
const {PGUSER, PGHOST, PGPORT} = process.env;

if (process.env.NODE_ENV === 'development')
  console.log(`Verbinde mit ${PGUSER} @ ${PGHOST}:${PGHOST}`);
// ^^ nur für Anzeige von Debug-Verbindungsvariablen

// pg verwendet automatisch die PG*-Umgebungsvariablen
module.exports = new pg.Pool();
```

Der Ordner `./api` enthält Schnittstellen zu Ihren Tabellen/Ansichten.

Hier ist ein Beispiel `./api/users.js` für die `users`-Tabelle.

```js
// ./api/users.js
const db = require('../db/connection.js');

module.exports = {
  findUsername: function(username) {
    return db.query('SELECT * FROM users WHERE username=$1', username);
  }
};
```

- Committe nie Ihre `.env`-Geheimnisse in Git!
- Teilen Sie `.env`-Dateien nicht mit anderen Entwicklern.*

* Jeder neue Entwicklungs-PC oder Desktop sollte **neue Zugriffskeys und Tokens generieren.**
Wenn dies nicht möglich ist, teilen Sie Ihre `.env`-Datei mit äußerster Vorsicht (insbesondere wenn ein Dienst alle älteren Keys ungültig machen könnte oder Sie bezahlte APIs mit begrenzten Zugangstoken verwenden.)

#### ⚠️ Wichtig: Falls notwendig, verwenden Sie immer einen sicheren Messaging-Dienst (am besten mit Unterstützung für ablaufende Nachrichten.)

Viel Erfolg und lassen Sie mich wissen, wenn Sie Fragen haben! 🎉
````
