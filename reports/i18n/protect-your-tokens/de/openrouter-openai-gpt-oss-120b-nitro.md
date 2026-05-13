# Translation Candidate
- Slug: protect-your-tokens
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-27--protect-your-tokens/de/index.mdx
- Validation: passed
- Runtime seconds: 8.51
- Input tokens: 6911
- Output tokens: 1484
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000537
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Schutz von Token, API‑Schlüsseln und Geheimnissen'
subTitle: Öffentlich? Privat? Was?
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
## Wann sollten Sie Ihre Tokens schützen?

<!--  Für den Zweck dieses Artikels behandeln wir die folgenden Begriffe als verwandt: . **Sie sind nicht austauschbar**, obwohl die meisten Dokumentationen und [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key)-Antworten sie so verwenden. -->

<!-- (Google Maps Credentials, AWS S3 Keys, Geocoding Service, etc.)  -->

> Das Sichern von API‑Schlüsseln & Tokens ist **äußerst wichtig**!

Ein einziger Fehler kann dazu führen, dass Hacker die Kontrolle über Ihren Server und Ihre Daten übernehmen!

Es sollte nicht so schwer sein, zu bestimmen, ob ein bestimmtes Token verborgen werden muss – selbst anhand der offiziellen Dokumentation!

Es wird häufig noch verwirrender durch das Durcheinander verwandter Begriffe, denen Sie begegnen: _tokens_, _keys_, _credentials_, _secrets_, _private_ und _public_.

Formulieren wir das lieber als Unterscheidung zwischen `secret` und `non-secret`.

* 🔒 [`Secret keys`](#-secret-keys) MÜSSEN verborgen bleiben. In der Regel dürfen sie NIEMALS Ihren privaten Server (oder Dienst – wie Heroku, Netlify oder Travis‑CI) verlassen.
* 🌍 [`Non-secret keys`](#-non-secret-keys) bezeichnet Zeichenketten, die frei geteilt und in Browser‑Requests eingebunden werden können.

<br />

---------------------------------------------

## 🔒 `Secret keys`

** ‼️ Wichtig:** `Secret keys` **MÜSSEN** von Git ignoriert UND im Browser‑Code weggelassen werden. [_Wie man dotenv verwendet_](#-how-to-handle-secrets-safely)

<br />

_Wie erkennt man, dass man es mit einem `Secret key` zu tun hat?_

<br />

**👍 Faustregel:** Server, die `CORS errors` zurückgeben, haben keine Browser‑Unterstützung. Das weist stark darauf hin, dass Sie den Dienst **PROXEN** müssen und ihn wie ein `secret` behandeln.

**👍 Faustregel:** Kostenintensive Dienste sollten (fast) immer proxied oder verborgen werden.

**👍 Faustregel:** Wenn Sie eine Schreiboperation durchführen (**Datei‑Upload, DB‑Zeile einfügen**), könnten Sie es mit `secret keys` zu tun haben.

<br />

**_Anwendungsfälle & Funktionen:_** `Secret`‑Schlüssel

- Langfristige Autorisierung (Anmeldedaten, Zugriffstoken, JSON‑Web‑Token)
- Kurzfristige Autorisierung (OAuth‑Token, Session‑Store)
- Zugriff auf kostenpflichtige/aufwändige Dienste (für Auth, Geocodierung, Dateispeicherung usw.)
- Privater Teil eines Public/Private‑Paares (RECAPTCHA, Stripe, Auth0)
- Dienstanmeldeinformationen (E‑Mail/SMTP, LDAP/Directory‑Services)
- Datenverschlüsselung & Integritätsprüfung

### Checkliste: Secrets sicher handhaben

#### Schnellübersicht

Vollständige die folgenden Schritte, um **Secrets aus deinem Code zu entfernen:**

- [ ] Ersetze hartkodierte Schlüssel durch Umgebungsvariablen, z. B. `process.env.API_SECRET`
- [ ] Nutze eine Bibliothek wie [`dotenv`](https://github.com/motdotla/dotenv#dotenv) zusammen mit einer `.env`‑Datei. Füge deine zuvor hartkodierten Secrets in die `.env`‑Datei ein.
- [ ] Ergänze eine `.env`‑Zeile in deiner `.gitignore`‑Datei!

> **NICHT** eine `.env`‑Datei auf bereitgestellten Servern anlegen. Verwende das von deinem Hosting‑Anbieter bereitgestellte Werkzeug zur Verwaltung von Umgebungsvariablen (z. B. [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2): z. B. **Dashboard oder Kommandozeile**.

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">Verwandter Artikel: <a href="../securely-using-environment-variables-in-nodejs/">dotenv sicher in NodeJS verwenden</a></h2></blockquote>

-----------------------------------

## 🌍 `Non-secret keys`

**👍 Faustregel:** Immer wenn ein Schlüssel im Browser‑Code oder inline gesendet werden muss (z. B. über ein `<script src="https://my-api/?apiKey=123-abc-456">`‑Tag), **ist er definitiv ein `non-secret`**. Ein häufiges Beispiel ist Google Maps.

<br />

**_Anwendungsfälle & Merkmale:_** `Non-secret`‑Schlüssel

- Kurzfristiger Zugriff (Benutzer‑Session‑IDs, JSON‑Web‑Tokens)
- Begrenzung des API‑Zugriffs nach App/Entwickler (für Auth, Geocoding usw.)
- Öffentlicher Teil eines Public/Private‑Paares (RECAPTCHA, Stripe, Auth0)
- Analyse‑IDs

#### ✅ Umgang mit Non‑secrets:

> **Es ist sicher, non‑secret (öffentliche) Schlüssel hart zu codieren!**

Machen Sie das langfristig einfacher, indem Sie eine gemeinsame `config.js` für Ihre Anwendung verwenden.

**Beispiel:**

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

**Hinweis:** Es gibt weitere Anwendungsfälle für Umgebungsvariablen. Einige, die ich nicht behandelt habe, sind: CI/CD/Tests, Feature‑Flags und Laufzeitkonfiguration für spezielle Umgebungen!
````
