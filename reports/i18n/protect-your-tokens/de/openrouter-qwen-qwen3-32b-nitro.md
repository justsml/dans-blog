# Translation Candidate
- Slug: protect-your-tokens
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-10-27--protect-your-tokens/de/index.mdx
- Validation: passed
- Runtime seconds: 17.46
- Input tokens: 5782
- Output tokens: 7194
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002189
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Schutz Ihrer Tokens, API-Schlüssel und Geheimnisse'
subTitle: Öffentlich? Privat? Wat?
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
## Wann sollten Sie Ihre Token schützen?

<!-- Für diesen Artikel behandeln wir die folgenden Begriffe als verwandt: . **Sie sind nicht austauschbar**, obwohl die meisten Dokumentationen und [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key) Antworten sie so verwenden. -->

<!-- (Google Maps Credentials, AWS S3 Keys, Geocoding Service, etc.)  -->

> Die Sicherung von API-Schlüsseln und -Token ist **extrem wichtig**!

Ein einziger Fehler kann dazu führen, dass Hacker Ihre Server und Daten übernehmen!

Es sollte doch nicht so schwierig sein, zu entscheiden, ob ein bestimmter Token versteckt werden muss – selbst anhand der offiziellen Dokumentation nicht!

Es wird oft noch schlimmer durch den Wortsalat aus verwandten Begriffen, die Sie antreffen werden: _Tokens_, _Schlüssel_, _Anmeldeinformationen_, _Geheimnisse_, _privat_ und _öffentlich_.  

Lassen Sie uns dies neu strukturieren in `geheim` und `nicht-geheim`.  

* 🔒 [`Geheimschlüssel`](#-secret-keys) MÜSSEN strikt geheim gehalten werden. Generell sollten sie niemals Ihren privaten Server (oder Dienst – wie Heroku, Netlify oder Travis-CI) verlassen.  
* 🌍 [`Nicht-geheime Schlüssel`](#-non-secret-keys) beschreibt Zeichenketten, die frei geteilt werden können und in Browseranfragen enthalten sein dürfen.  

<br />  

---------------------------------------------  

## 🔒 `Geheimschlüssel`

** ‼️ Wichtig:** `Geheimschlüssel` **MÜSSEN** von Git ignoriert und **aus allen Browser-Code-Dateien ausgeschlossen** werden. [_dotenv korrekt einsetzen_](#-how-to-handle-secrets-safely)  

<br />  

**Wie erkennen Sie, dass Sie mit einem `Geheimschlüssel` arbeiten?**  

<br />  

**👍 Faustregel:** Server, die `CORS-Fehler` zurückgeben, unterstützen keine Browser-Anfragen. Dies deutet stark darauf hin, dass Sie den Dienst **über einen Proxy** leiten **MÜSSEN**, als wäre der Schlüssel geheim.  
**👍 Faustregel:** Kostenintensive Dienste sollten (fast) immer über einen Proxy geleitet oder versteckt werden.

**👍 Faustregel:** Bei einem Schreibvorgang (**Dateiupload, Einfügen einer Datenbankzeile**) könnten Sie mit `Geheimschlüsseln` arbeiten.  

<br />  

**_Use cases & features:_** `Geheim`schlüssel  

- Langfristige Autorisierung (Anmeldeinformationen, Zugriffs-Token, JSON Web Tokens)  
- Kurzfristige Autorisierung (OAuth-Token, Sitzungsspeicher)  
- Zugriff auf kostenpflichtige/teure Dienste (für Authentifizierung, Geocodierung, Dateispeicher usw.)  
- Private Komponente eines öffentlich-privaten Schlüsselpaars (RECAPTCHA, Stripe, Auth0)  
- Dienstanmeldeinformationen (E-Mail/SMTP, LDAP/Verzeichnisdienste)  
- Datenverschlüsselung & Integritätsprüfung  

### Checkliste: Geheimnisse sicher verarbeiten  

#### Schnellübersicht

Führen Sie die folgenden Schritte aus, um **Geheimnisse aus Ihrem Code zu eliminieren:**

- [ ] Ersetzen Sie hartenkodierte Schlüssel durch Umgebungsvariablen. z. B. `process.env.API_SECRET`  
- [ ] Nutzen Sie eine Bibliothek wie [`dotenv`](https://github.com/motdotla/dotenv#dotenv) zusammen mit einer `.env`-Datei. Fügen Sie die zuvor hartenkodierten Geheimnisse in die `.env`-Datei ein.  
- [ ] Fügen Sie eine `.env`-Zeile in Ihre `.gitignore`-Datei hinzu!  

> **NICHT** eine `.env`-Datei auf bereitgestellten Servern erstellen. Nutzen Sie stattdessen das von Ihrem Hosting-Anbieter (z. B. [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2) bereitgestellte Tool zur Verwaltung von Umgebungsvariablen: z. B. **Dashboard oder Befehlszeile**.  

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">Verwandter Artikel: <a href="/securely-using-environment-variables-in-nodejs/">Sicheres Verwenden von dotenv in NodeJS</a></h2></blockquote>  

-----------------------------------  

## 🌍 `Nicht-geheime Schlüssel`

**👍 Faustregel:** Wenn ein Schlüssel in den Browser gesendet werden muss, entweder als Code oder inline (z. B. über einen `<script src="https://my-api/?apiKey=123-abc-456">`-Tag), **handelt es sich definitiv um einen `nicht-geheimen` Schlüssel**. Ein gängiges Beispiel ist Google Maps.  

<br />  

**_Einsatzszenarien & Funktionen:_** `Nicht-geheime` Schlüssel  

- Kurzzeitzugriff (Benutzersitzungs-IDs, JSON Web Tokens)  
- Beschränkung des API-Zugriffs nach App/Entwickler (für Authentifizierung, Geocoding usw.)  
- Öffentlicher Teil des öffentlichen/privaten Schlüsselpaars (RECAPTCHA, Stripe, Auth0)  
- Analyse-IDs  

#### ✅ Umgang mit Nicht-Geheimnissen:  

> **Es ist sicher, nicht-geheime (öffentliche) Schlüssel direkt in den Code einzubauen!**

Verwenden Sie eine gemeinsam genutzte `config.js` für Ihre Anwendung, um dies langfristig einfacher zu verwalten.

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

**Hinweis:** Es gibt weitere _Use Cases_ für Umgebungsvariablen. Einige davon wurden hier nicht behandelt: CI/CD/Tests, Feature-Flags und Laufzeitkonfiguration für spezielle Umgebungen!
````
