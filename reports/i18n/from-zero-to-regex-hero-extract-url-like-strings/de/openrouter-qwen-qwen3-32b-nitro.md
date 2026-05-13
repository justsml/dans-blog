# Translation Candidate
- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/de/index.mdx
- Validation: passed
- Runtime seconds: 24.78
- Input tokens: 10039
- Output tokens: 10792
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.003393
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Von Null zum Regex-Held
subTitle: ''
category: Regex
subCategory: Data Extraction
date: '2024-12-29'
modified: '2025-01-06'
tags:
  - regex
  - url
  - data-extraction
  - data-processing
social_image: ../desktop-social.webp
cover_full_width: ../regex-url-parsing-wide.webp
cover_mobile: ../regex-url-parsing-square-200.webp
cover_icon: ../regex-url-parsing-square-200.webp
---
import { CodeTabs } from '../../../../../components/CodeTabs';

**Inhaltsverzeichnis**

- 🚀 [Einführung](#-einführung)
- 🔍 [URLs aus Text extrahieren](#-urls-aus-text-extrahieren)
- 🛳️ [Der 120+ Byte Regex](#️-der-120-byte-regex)
- 🧩 [Schritt für Schritt aufgeschlüsselt](#-schritt-für-schritt-aufgeschlüsselt)
- 🛠️ [Parsing-Beispiel](#-parsing-beispiel)
- ☑️ [Nächste Schritte](#-nächste-schritte)
- 📝 [Zusammenfassung](#-zusammenfassung)
- 📚 [Weitere Lernressourcen](#-weitere-lernressourcen)

**Kurzfassung:** Springe direkt zum [120+ Byte Regex](#️-der-120-byte-regex).

## 🚀 Einführung

Die Extraktion von URLs aus rohem Text fühlt sich manchmal an wie ein lästiges Wackelmaus-Spiel. Satzzeichen, Klammern und unklare Formatierungen konspirieren alle, um deine Bemühungen zu frustrieren. Egal, ob du einen Web-Crawler, Datenanalysator oder eine Chatanwendung baust – die genaue Extraktion von URLs ist entscheidend.

In diesem Beitrag werden wir das Problem direkt mit einem flexiblen, zweistufigen Ansatz angehen. Unser Ziel ist es, **zuerst alle _potenziellen_ URL-ähnlichen Zeichenketten zu erfassen** und die Validierung anschließend in einem separaten Schritt durchzuführen.

> 💡 **Hinweis:** Dieses Muster ist nicht zur _Überprüfung_ von URLs gedacht! Es ist absichtlich tolerant gegenüber Satzzeichen und falscher Schreibweise.

## 🔍 Ziel: URLs aus Text extrahieren

Beim Extrahieren von URLs aus rohem Text ist ein zweistufiger Ansatz effektiv:

1. **Alles URL-ähnliche erfassen**: Eine breite Netzhaltung anwenden, um alle Zeichenketten zu erfassen, die *potenziell* URLs sein könnten. Hier kommt unser „120+ Byte Regex“ zum Einsatz.
2. **Überprüfen**: Sobald die Kandidaten erfasst wurden, können sekundäre Checks (z. B. DNS-Auflösung, Vergleich mit bekannten Domains) genutzt werden, um ungültige Einträge zu eliminieren.

### Visualisierung der Herausforderung

Begriffe wie `extrahieren` und `parsen` werden häufig austauschbar verwendet, obwohl sie unterschiedliche Prozesse bezeichnen. Das Extrahieren von URLs umfasst das Identifizieren und Erfassen potenzieller URLs aus einem größeren Textblock. Parsen hingegen bedeutet, diese URLs in ihre Bestandteile aufzuteilen.

Wenn ich von Parsen oder „URL-Teilen“ spreche, meine ich die folgenden Komponenten:

<figure>
  <figcaption>Die 5 Bestandteile aller URLs</figcaption>
![Anatomie von URLs, visualisiert](../WhatUrlsAreMadeOf-ColorMatched.svg "Anatomie von URLs, visualisiert")
</figure>

<details class="inset breakout">
  <summary>Klicken Sie, um ein Screenshot der Teilzeichenfolgenübereinstimmung von RegEx101 anzuzeigen.</summary>

  Bevor wir uns zu sehr in den Regex vertiefen, nutzen wir ein visuelles Tool, um zu sehen, wie gut mein Muster zahlreiche Übereinstimmungen erfasst:

  <figure>
    <figcaption>Die Verwendung von [RegEx101.com](https://regex101.com/r/jO8bC4/69) zur Visualisierung von Mehrzeilenübereinstimmungen</figcaption>
    ![Vorschau von „Mehrfachzeilen“ Übereinstimmungen](../RegEx101-Matches-Screenshot.webp "Vorschau von „Mehrfachzeilen“ Ergebnissen")
  </figure>
</details>

## Der 120+ Byte Regex

Untenstehend finden Sie einen kompakten Regex, der URLs in einem Schritt extrahiert und analysiert. Er unterstützt verschiedene Protokolle, Domains, Pfade sowie optionale Abfrage-/Fragment-Teile.

Keine Sorge – wir analysieren es Schritt für Schritt!

```js title="120+ Byte URL Regex" frame="code"
const urlRegex = /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;
// Kompatibilität: ES5+

// Dasselbe Muster, aufgeteilt in Zeilenumbrüche für bessere Lesbarkeit:
([-.a-z0-9]+:\/{1,3})
([^-\/\.[\](|)\s?][^`\/\s\]?]+)
([-_a-z0-9!@$%^&*()=+;/~\.]*)
[?]?([^#\s`?]*)
[#]?([^#\s'"`\.,!]*)

```

<blockquote class="inset">Teilen Sie die wildesten RegEx, die Sie je gesehen (ODER selbst erstellt) haben, in den <a href="#post-comments">Kommentaren unten!</a> 🚀</blockquote>

## 🧩 Schrittweise Erklärung

Lassen Sie uns die Regex in ihre Komponenten zerlegen, um zu verstehen, wie sie funktioniert:

<h3>1. Protokoll (Gruppe 1): <code>{`([-.a-z0-9]+:\/{1,3})`}</code></h3>

<ul>
  <li>**Zweck:** Übereinstimmt mit dem Protokollteil der URL (z. B. `http://`, `ftp://`, `custom-scheme://`).</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[-.a-z0-9]+</code>: Übereinstimmt mit einem oder mehreren Kleinbuchstaben, Ziffern, Bindestrichen oder Punkten (häufig in Protokoll-Schemata).</li>
      <li><code>{`:\/{1,3}`}</code>: Übereinstimmt mit einem Doppelpunkt gefolgt von einem bis drei Schrägstrichen (<code>:/</code>, <code>://</code> oder <code>:///</code>).</li>
    </ul>
  </li>
</ul>

<h3>2. Domain (Gruppe 2): <code>{`([^-\/\.[\](|)\s?][^\`\/\s\]?]+)`}</code></h3>

<ul>
  <li>**Zweck:** Erfasst den Domain- oder Host-Teil der URL.</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[^-\/\.[\](|)\s?]</code>: Übereinstimmt mit jedem Zeichen außer den angegebenen Sonderzeichen und Leerzeichen.</li>
      <li><code>[^`\/\s\]?]+</code>: Übereinstimmt mit einem oder mehreren Zeichen außer Backticks, Schrägstrichen, Leerzeichen oder geschlossenen eckigen Klammern.</li>
    </ul>
  </li>
</ul>

<h3>3. Pfad (Gruppe 3): <code>{`([-_a-z0-9!@$%^&*()=+;/~\\.]*)`}</code></h3>

<ul>
  <li>**Zweck:** Übereinstimmt mit der Pfadkomponente der URL.</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[-_a-z0-9!@$%^&*()=+;/~\.]*</code>: Übereinstimmt mit null oder mehr URL-sicheren Zeichen, die häufig in Pfade vorkommen.</li>
    </ul>
  </li>
</ul>

<h3>4. Abfrage (Gruppe 4): <code>[?]?([^#\s`?]*)</code></h3>

<ul>
  <li>**Zweck:** Übereinstimmt optional mit einer Abfragezeichenfolge, die mit einem <code>?</code>-Zeichen beginnt.</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[?]?</code>: Übereinstimmt optional mit einem <code>?</code>. (Die eckigen Klammern sind nicht streng notwendig, machen den Ausdruck jedoch etwas klarer als das extrem kompakte Doppelzeichen <code>??</code>. Sie bieten auch eine visuelle Parallele zum (ähnlichen) nächsten Matching-Gruppe <code>[#]?</code>.)</li>
      <li><code>([^#\s`?]*)</code>: Übereinstimmt mit null oder mehr Zeichen, die kein Hashtag, Leerzeichen, Backticks oder Fragezeichen sind.</li>
    </ul>
  </li>
</ul>

<h3>5. Fragment (Gruppe 5): <code>[#]?([^#\s'"`\.,!]*)</code></h3>

<ul>
  <li>**Zweck:** Übereinstimmt optional mit dem Fragment-Identifier, der mit einem <code>#</code> beginnt.</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[#]?</code>: Übereinstimmt optional mit einem <code>#</code>.</li>
      <li><code>([^#\s'"`\.,!]*)</code>: Übereinstimmt mit null oder mehr Zeichen, die keine verbotene Satzzeichen oder Leerzeichen sind.</li>
    </ul>
  </li>
</ul>

## 🛠️ Parsing-Beispiel

Hier ist ein Beispiel, wie Sie diesen komplexen RegEx in Aktion sehen können, mit etwas JavaScript:

<CodeTabs client:only
 tabs={[
    "Code: URLs extrahieren",
    "Ergebnisse: Extrahierte URLs",
    "Ergebnisse: URL-Teile",
  ]} >
```js title="extract-urls.js" frame="code"
const text = `
Check this out: https://example.com/path?query=123#section
And also (ftp://files.server.org/index).
Plus a weird one: custom-scheme://host/param;weird^stuff
`;

const urlRegex =
  /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;

const matches = [
  ...text.matchAll(urlRegex),
].map((match) => match[0]);
console.log("Extracted URLs:", matches);

const parts = [
  ...text.matchAll(urlRegex),
].map((match) => match.slice(1));
console.log("Extracted Parts:", parts);
```

```json title="extracted-urls.json"
[
  "https://example.com/path?query=123#section",
  "ftp://files.server.org/index",
  "custom-scheme://host/param;weird^stuff"
]
```

```json title="urls-parts.json"
[
  [
    "https://",    // Protocol
    "example.com", // Domain
    "/path",       // Path
    "query=123",   // Query
    "section"      // Fragment
  ],
  [
    "ftp://",           // Protocol
    "files.server.org", // Domain
    "/index",           // Path
    "",                 // Query
    ""                  // Fragment
  ],
  [
    "custom-scheme://",   // Protocol
    "host",               // Domain
    "/param;weird^stuff", // Path
    "",                   // Query
    ""                    // Fragment
  ]
]
```

</CodeTabs>

## ☑️ Nächste Schritte

Je nach Anwendungsfall müssen Sie diesen RegEx möglicherweise weiter verfeinern oder zusätzliche Validierungs- und Nachbearbeitungsschritte hinzufügen.

### Verschiedene Projekte, verschiedene Anforderungen

Projekte haben unterschiedliche Anforderungen und Sicherheitsbedenken:

1. **Web Scraping**: URLs validieren, um sicherzustellen, dass sie erreichbar und vertrauenswürdig sind.  
2. **Datenverarbeitung**: URLs aus Nutzererzeugten Inhalten extrahieren und dabei Sicherheit gewährleisten.  
3. **Datenanalyse**: Doppelte oder irrelevante Links für Forschungs- oder Marketingzwecke filtern.  
4. **Nutzerorientierte Anwendungen**: URLs in Chat-Apps oder Foren automatisch verlinken.  

### Nachverarbeitung und Validierung  

Nachdem potenzielle URLs gesammelt wurden, weitere Checks anwenden:  

- **DNS Lookup**: Stellen Sie sicher, dass Domains aufgelöst werden können.  
- **Sicherheitsüberprüfungen**: Nutzen Sie Dienste, um nach bösartigen oder Phishing-Webseiten zu suchen.  
- **Eigene Regeln**: Projekt-spezifische Filter anwenden (z. B. erlaubte TLDs, maximale URL-Länge).  

## 📝 Zusammenfassung  

Das Extrahieren von halbstrukturierten Zeichenketten könnte der am meisten befriedigende Teil der Meisterschaft im Umgang mit regulären Ausdrücken sein.

Hier ist eine Zusammenfassung der wichtigsten Punkte:

- **Verwenden Sie ein visuelles Tool, um Ihre [Regex-Muster zu schreiben, zu testen und zu verstehen.](https://regex101.com/r/jO8bC4/69)**
- **Teilen Sie das Problem in Teile auf** und lösen Sie jeden Teil getrennt. Auf eine Weise bieten uns Capture Groups figurativ gesehen „Wegmarkierungen“ für unsere Regex.
- **Verwenden Sie „lockere“ Übereinstimmungsausdrücke und vermeiden Sie strikte Spezifikationskonformität** bei der Datenimportierung.
- **Die Anwendung von Validierungsschritten** nach der ersten Extraktion ist entscheidend – berücksichtigen Sie immer die Sicherheit und spezifischen Anforderungen Ihres Projekts.

Durch diese Schritte können Sie effektiv jede halbstrukturierte Zeichenketten-Daten extrahieren, was die Grundlage für weitere Verarbeitung und Validierung legt.

## 📚 Weitere Lernressourcen

- Spielen Sie mit einer [Live-Demo auf RegEx101.com](https://regex101.com/r/jO8bC4/69)!
- Original-StackOverflow-Frage und [einen Link zu meiner Antwort hier](https://stackoverflow.com/a/34669019/369727).
- [MDN-Dokumentation zu regulären Ausdrücken](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Erweiterte Regex-Techniken](https://www.regular-expressions.info/): Erforschen Sie Lookaheads, Lookbehinds und andere erweiterte Muster für präzisere Übereinstimmungen.
- [RFC 3986 - URI Generic Syntax](https://datatracker.ietf.org/doc/html/rfc3986)
````
