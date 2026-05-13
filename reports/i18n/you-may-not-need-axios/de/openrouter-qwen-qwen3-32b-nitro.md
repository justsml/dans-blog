# Translation Candidate
- Slug: you-may-not-need-axios
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-11-15--you-may-not-need-axios/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 24.75
- Input tokens: 12845
- Output tokens: 9553
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.003320
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug you-may-not-need-axios --locale de
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Sie brauchen vielleicht Axios nicht
subTitle: Fetch API rettet!
date: '2018-11-14'
modified: '2024-08-21'
tags:
  - programming
  - patterns
  - examples
  - nodejs
  - javascript
  - promises
  - axios
  - fetch
category: Guides
subCategory: fetch
cover: ../brock-dupont-575648-unsplash.webp
cover_mobile: ../w300_brock-dupont-575648-unsplash.webp
cover_icon: ../icon_brock-dupont-575648-unsplash.webp
---
import Gist from '../../../../../components/Gist/index.astro'

## Sie brauchen Axios vielleicht nicht

<p class="breakout call-to-action">Dies ist **kein Angriff** auf [Axios](https://www.npmjs.com/package/axios). <br />

Es ist vielmehr **eine Advocacy für die `fetch`-API, die mittlerweile sehr leistungsfähig ist.** 🦄</p>

### Überblick

Dieser Artikel ist eine Sammlung der "fehlenden" `fetch`-Code-Snippets und gängigen Use-Cases, die ich mir leichter auffinden wünschte.

- [Überblick](#overview)  
- [Feature-Vergleich](#feature-vergleich)  
- [Fetch-Rezepte](#fetch-rezepte)  
  - [JSON von einer URL abrufen](#json-von-einer-url-abrufen)  
  - [Anpassbare Header](#anpassbare-header)  
  - [HTTP-Fehlerbehandlung](#http-fehlerbehandlung)  
  - [CORS-Beispiel](#cors-beispiel)  
  - [JSON-POST-Anfrage](#json-post-anfrage)  
  - [HTML `<form>`-POST](#html-form-post)  
  - [Form-encoded Daten](#form-encoded-daten)  
  - [Datei hochladen](#datei-hochladen)  
  - [Mehrere Dateien hochladen](#mehrere-dateien-hochladen)  
  - [Timeouts](#timeouts)  
  - [Download-Fortschritts-Hilfe](#download-fortschritts-hilfe)  
  - [Rekursiver Retry-Helfer](#rekursiver-retry-helfer)  
  - [HTTP-Redirects behandeln](#http-redirects-behandeln)  
  - [Fetch-Anfrage abbrechen](#fetch-anfrage-abbrechen) ✨neu✨  
- [Kompatibilität](#kompatibilität)  

> Ist Ihr Use Case nicht aufgeführt? [Lass es mich wissen ✉️](/../contact/)  

<br />  

### Feature-Vergleich  

|                                                 | fetch    | axios    | request |
|-------------------------------------------------|:--------:|:--------:|:-------:|
| Anfragen und Antworten abfangen               |✅        |✅         |✅       |
| Anfragen- und Antwortdaten transformieren     |✅        |✅         |✅       |
| Anfragen abbrechen                              |✅        |✅         |❌       |
| Automatische JSON-Transformation                |manuelle Hilfsmittel |✅         |✅       |
| Client-seitige XSRF-Schutzmaßnahmen           |✅        |✅         |✅       |
| Fortschritt                                     |✅        |✅         |✅       |
| Streaming                                       |✅        |✅         |✅       |
| Redirects                                       |✅        |✅         |✅       |  

<br /><br />

Als ich diesen Artikel begann (Ende 2018, aktualisiert 2024), nahm ich an, am Ende eine Tabelle mit gemischten Häkchen zu haben. Sicherlich gibt es spezielle _Use Cases_, die die Verwendung von [`axios`](https://www.npmjs.com/package/axios), [`request`](https://www.npmjs.com/package/request), [`r2`](https://www.npmjs.com/package/r2), [`superagent`](https://www.npmjs.com/package/superagent), [`got`](https://www.npmjs.com/package/got) usw. rechtfertigen würden.  

Nun, wie sich herausstellte, **hatte ich den Bedarf an drittanbieter-HTTP-Bibliotheken überschätzt.**  

Trotz der Nutzung von `fetch` über mehrere Jahre (einschließlich nicht-trivialer Aufgaben: Dateiuploads & Fehler/Wiederholungsunterstützung) hatte ich immer noch Missverständnisse hinsichtlich der Fähigkeiten und Grenzen von `fetch`.  

Die native `fetch`-API parst JSON-Antworten nicht automatisch oder stringifiziert JSON-Anforderungskörper. Sie rufen `response.json()` auf dem Rückweg und `JSON.stringify()` auf dem Weg aus. Axios gewinnt diesen Aspekt der Ergonomie; das Argument für `fetch` ist, dass ein kleines Hilfsmittel oft den Abstand schließt.  

Nun, schauen wir uns an, was `fetch` alles kann...  

## Fetch-Rezepte

### JSON von einer URL abrufen

<Gist path='justsml/de941bd61cc86e30beedbb8a3a646f81'></Gist>

### Benutzerdefinierte Header

<Gist path='justsml/fca7cd72ec1ebc07d994eac13a665ddf' />

### HTTP-Fehlerbehandlung

<Gist path='justsml/81919a72897ebc503c6b34a556a9bde2' />

### CORS-Beispiel

CORS wird primär am Server überprüft – stellen Sie sicher, dass Ihre Server-Konfiguration korrekt ist.

Die Option `credentials` steuert, ob Ihre Cookies automatisch eingeschlossen werden.

<Gist path='justsml/3ddd9ed8705f48cdf45d313d1e57aa2a' />

### JSON senden

<Gist path='justsml/13915347d6c8413c73f4bd7240c68e51' />

### Ein HTML `<form>` senden

<Gist path='justsml/ef2e356bec0ef7c6e528d84a5f75ba7e' />

### Formulardaten im kodierten Format

Um Daten mit dem Content-Type `application/x-www-form-urlencoded` zu senden, verwenden wir `URLSearchParams`, um die Daten wie eine Abfragezeichenfolge zu kodieren.

Zum Beispiel ergibt `new URLSearchParams({a: 1, b: 2})` den Wert `a=1&b=2`.

<Gist path='justsml/716c4534ef4afb22f65d4fc4367c7136' />

### Hochladen einer Datei

<Gist path='justsml/301f22aa37df565ba3051bd5f95b4df1' />

### Hochladen mehrerer Dateien

Richten Sie ein Dateiupload-Element mit dem Attribut `multiple` ein:

<Gist path='justsml/37836357041d8ca4d1b32e12638cb0ba' />

Verwenden Sie dies dann mit etwas wie:

```markdown
<Gist path='justsml/d17f50c36a5ddb70f584c0aa6de94237' />

### Zeitlimits

Hier ist ein generischer Promise-Zeitlimit-Handler, der das "Teilanwendungsmuster" verwendet. Er funktioniert mit jeder Promise-Schnittstelle. Machen Sie nicht zu viel Arbeit in der bereitgestellten Promise-Kette, sie wird weiterlaufen – und jede Fehlschlag hat eine Weise, langfristige Speicherlecks zu verursachen.

<Gist path='justsml/f93b2ef6457b3e52eb995831b67cab85' />

Und ein komplexeres Beispiel mit einem Tracking-Flag `__timeout`, damit Sie **jede kostenintensive Arbeit abfangen können.**

<Gist path='justsml/5e492db8997a4f7e22e61b7486cbf273' />
```

### Download-Fortschritts-Helfer

Der Upload-Fortschritt ist derzeit etwas fehlerhaft außerhalb von Chrome.  

Der Progress Handler [Technik, wie unten gezeigt, vermeidet das Einwickeln](#source-progress-helper) des `fetch`-Aufrufs in eine Closure. 👍  

`progressHelper` besitzt die folgende Schnittstelle (Quelle unten verfügbar)  

<Gist path='justsml/db5ccc55ffb93c75e04e014d1f553cfb' />  

Schauen wir uns ein Beispiel für die Verwendung an:

<Gist path='justsml/9bec219590ff50688972c1caff67c14b' />

Ein wiederverwendbarer Bilddownloader könnte so aussehen wie `getBlob()`:

<Gist path='justsml/bef2dd7e630eb7642beb3e2be29489b2' />

Zur Info: Ein `Blob` ist ein Binary Large Object.

Es ist wichtig, EINEN der beiden untenstehenden Verwendungsmuster zu wählen (sie sind funktional äquivalent):

<Gist path='justsml/6ad9e37a96ad1f3a75ca509038510a5b' />

Ich bevorzuge `Option #1`. Ihr Projektumfang erzwingt jedoch möglicherweise die Verwendung von `Option #2`.  

Schließlich ist hier der letzte Teil dieses Rezepts, unser `progressHelper`:  

##### Quelle: Fortschritts-Helfer  

<Gist path='justsml/a8ffd810fc7e5a5295dfc898302ddbfc' />  

_credit:_ Besonderer Dank an Anthum Chris und seine [fantastische Progress+Fetch PoC, die hier gezeigt wird](https://github.com/AnthumChris/fetch-progress-indicators)  

### Rekursiver Wiederholungs-Helfer

### Umgang mit HTTP-Umleitungen  

<Gist path='justsml/3dd0a799ada8da7cd15943ff254266de' />  

### Abbrechen eines fetch-Requests  

<Gist path='justsml/7f257ac3de3c7792db8485588c54e938' />  

### Kompatibilität

Stand 2022 ist die `fetch`-API [weit verbreitet](https://caniuse.com/#feat=fetch) in allen modernen Browsern und in neueren Versionen von NodeJS v18+ unterstützt.  

Wenn Sie IE unterstützen müssen, können Sie `fetch` mit dem `github/fetch`-Paket (von einem fantastischen Team bei GitHub gepflegt) [als Polyfill](https://github.com/github/fetch#browser-support) nutzen. Es ist möglich, bis zu [IE8](https://github.com/camsong/fetch-ie8) zurückzugehen – _Ihre Erfahrung kann variieren_.  

Ältere NodeJS-Versionen können die `fetch`-API mit dem [`node-fetch`](https://www.npmjs.com/package/node-fetch)-Paket nutzen:  

```sh
npm install node-fetch
```  

_Nach Polyfill+node-fetch: 99,99 % kompatibel_ ✅  

> Tweeten Sie mich, wenn Sie weitere _Use Cases_ sehen möchten, die ich behandeln soll. ❤️
````
