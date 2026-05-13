# Translation Candidate
- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: de
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/de/index.mdx
- Validation: deferred
- Runtime seconds: 100.47
- Input tokens: 10477
- Output tokens: 8489
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.003738
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Von Null auf Regex-Held
subTitle: URL-ähnliche Strings mit einem Regex extrahieren und parsen
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

- 🚀 [Einleitung](#-introduction)
- 🔍 [URLs aus Text extrahieren](#-extracting-urls-from-text)
- 🛳️ [Der 120+ Byte Regex](#️-the-120-byte-regex)
- 🧩 [Schritt für Schritt aufgeschlüsselt](#-breaking-it-down-step-by-step)
- 🛠️ [Parsing-Beispiel](#-pa)
- ☑️ [Nächste Schritte](#-next-steps)
- 📝 [Zusammenfassung](#-summary)
- 📚 [Weiterführendes](#-further-learning)

**TL;DR:** Springe direkt zum [120+ Byte Regex](#️-the-120-byte-regex).

## 🚀 Einleitung

Das Extrahieren von URLs aus Rohtext kann sich manchmal wie ein zähes Spiel Whack-a-Mole anfühlen. Satzzeichen, Klammern und mehrdeutige Formatierungen arbeiten alle gegen dich. Ob du nun einen Web-Scraper, einen Datenanalysator oder eine Chat-Anwendung baust – das präzise Extrahieren von URLs ist essenziell.

In diesem Beitrag gehen wir das Problem direkt mit einem flexiblen Zwei-Schritt-Ansatz an. Unser Ziel ist es, **zuerst alle _potenziellen_ URL-ähnlichen Zeichenketten zu erfassen** und die Validierung dann in einem nachgelagerten Schritt durchzuführen.

> 💡 **Hinweis:** Dieses Muster dient nicht zur **_Validierung_** von URLs! Es ist bewusst großzügig mit Satzzeichen und Tippfehlern.

## 🔍 Ziel: URLs aus Text extrahieren

Beim Extrahieren von URLs aus Rohtext ist ein Zwei-Schritt-Ansatz effektiv:

1. **Alles URL-ähnliche erfassen**: Ein weites Netz auswerfen, um alle Zeichenketten einzufangen, die *URLs sein könnten*. Hier glänzt unser „120+ Byte Regex“.
2. **Validieren**: Sobald du diese Kandidaten erfasst hast, nutze sekundäre Prüfungen (z. B. DNS-Auflösung, Abgleich mit bekannten Domains), um ungültige Einträge auszusortieren.

### Die Herausforderung visualisieren

Begriffe wie `extract` und `parse` werden oft synonym verwendet, bezeichnen jedoch unterschiedliche Prozesse. Das Extrahieren von URLs umfasst das Identifizieren und Erfassen potenzieller URLs aus einem größeren Textkorpus. Das Parsen hingegen bezieht sich auf die Zerlegung dieser URLs in ihre Bestandteile.

Wenn ich vom Parsen oder von „URL-Teilen“ spreche, beziehe ich mich auf die folgenden Komponenten:

<figure>
  <figcaption>Die 5 Teile aller URLs</figcaption>
![URL-Anatomie, visualisiert](../WhatUrlsAreMadeOf-ColorMatched.svg "URL-Anatomie, visualisiert")
</figure>

<details class="inset breakout">
  <summary>Klicken Sie, um einen Screenshot der Substring-Übereinstimmung von RegEx101 zu sehen.</summary>

  Bevor wir zu tief in den Regex eintauchen, nutzen wir ein visuelles Tool, um zu sehen, wie gut mein Muster viele Übereinstimmungen erfasst:

  <figure>
    <figcaption>Verwendung von [RegEx101.com](https://regex101.com/r/jO8bC4/69) zur Visualisierung von mehrzeiligen Übereinstimmungen</figcaption>
    ![Vorschau der „Bulk“-Mehrzeilen-Übereinstimmungen](../RegEx101-Matches-Screenshot.webp "Vorschau der „Bulk“-Mehrzeilen-Ergebnisse")
  </figure>
</details>

## Der 120+ Byte Regex

Nachfolgend finden Sie einen prägnanten Regex, der URLs in einem Durchgang extrahiert und parst. Er unterstützt verschiedene Protokolle, Domains, Pfade sowie optionale Query- und Fragment-Abschnitte.

Keine Sorge – wir schlüsseln es Schritt für Schritt auf!

```js title="120+ Byte URL Regex" frame="code"
const urlRegex = /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;
// Compatibility: ES5+

// Same pattern, split on newlines for readability:
([-.a-z0-9]+:\/{1,3})
([^-\/\.[\](|)\s?][^`\/\s\]?]+)
([-_a-z0-9!@$%^&*()=+;/~\.]*)
[?]?([^#\s`?]*)
[#]?([^#\s'"`\.,!]*)

```

<blockquote class="inset">Teilt die verrücktesten Regexe, die ihr je gesehen (ODER selbst geschrieben) habt, in den <a href="#post-comments">Kommentaren unten!</a> 🚀</blockquote>

## 🧩 Schritt für Schritt aufgeschlüsselt

Lassen Sie uns den Regex in seine Bestandteile zerlegen, um zu verstehen, wie er funktioniert:

<h3>1. Protokoll (Gruppe 1): <code>{`([-.a-z0-9]+:\/{1,3})`}</code></h3>

<ul>
  <li>**Zweck:** Erfasst den Protokollteil der URL (z. B. `http://`, `ftp://`, `custom-scheme://`).</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[-.a-z0-9]+</code>: Matcht ein oder mehrere Kleinbuchstaben, Ziffern, Bindestriche oder Punkte (üblich in Protokoll-Schemas).</li>
      <li><code>{`:\/{1,3}`}</code>: Matcht einen Doppelpunkt gefolgt von ein bis drei Schrägstrichen (<code>:/</code>, <code>://</code> oder <code>:///</code>).</li>
    </ul>
  </li>
</ul>

<h3>2. Domain (Gruppe 2): <code>{`([^-\/\.[\](|)\s?][^\`\/\s\]?]+)`}</code></h3>

<ul>
  <li>**Zweck:** Erfasst den Domain- oder Host-Teil der URL.</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[^-\/\.[\](|)\s?]</code>: Matcht jedes Zeichen außer den angegebenen Sonderzeichen und Leerzeichen.</li>
      <li><code>[^`\/\s\]?]+</code>: Matcht ein oder mehrere Zeichen außer Backticks, Schrägstrichen, Leerzeichen oder schließenden eckigen Klammern.</li>
    </ul>
  </li>
</ul>

<h3>3. Pfad (Gruppe 3): <code>{`([-_a-z0-9!@$%^&*()=+;/~\\.]*)`}</code></h3>

<ul>
  <li>**Zweck:** Matcht die Pfadkomponente der URL.</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[-_a-z0-9!@$%^&*()=+;/~\.]*</code>: Matcht null oder mehr URL-sichere Zeichen, die üblicherweise in Pfaden vorkommen.</li>
    </ul>
  </li>
</ul>

<h3>4. Query (Gruppe 4): <code>[?]?([^#\s`?]*)</code></h3>

<ul>
  <li>**Zweck:** Matcht optional einen Query-String, beginnend mit einem <code>?</code>-Zeichen.</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[?]?</code>: Matcht optional ein <code>?</code>. (Die eckigen Klammern sind nicht zwingend nötig, aber sie sind etwas klarer als das extrem knappe doppelte <code>??</code>. Sie bieten auch eine visuelle Parallele zur (ähnlichen) nächsten Matching-Gruppe <code>[#]?</code>.)</li>
      <li><code>([^#\s`?]*)</code>: Matcht null oder mehr Zeichen, die kein Hash, Leerzeichen, Backtick oder Fragezeichen sind.</li>
    </ul>
  </li>
</ul>

<h3>5. Fragment (Gruppe 5): <code>[#]?([^#\s'"`\.,!]*)</code></h3>

<ul>
  <li>**Zweck:** Matcht optional den Fragment-Identifier, beginnend mit einem <code>#</code>.</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[#]?</code>: Matcht optional ein <code>#</code>.</li>
      <li><code>([^#\s'"`\.,!]*)</code>: Matcht null oder mehr Zeichen, die keine verbotenen Satzzeichen oder Leerzeichen sind.</li>
    </ul>
  </li>
</ul>

## 🛠️ Parsing-Beispiel

Hier ist, wie du diese Monster-Regex mit etwas JavaScript einsetzen kannst:

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

Je nach Anwendungsfall musst du diese Regex möglicherweise verfeinern oder zusätzliche Validierungs- und Nachbearbeitungsschritte einbauen.

### Unterschiedliche Projekte, unterschiedliche Anforderungen

Projekte haben unterschiedliche Anforderungen und Sicherheitsbedenken:

1. **Web Scraping**: Validiere URLs, um sicherzustellen, dass sie erreichbar und vertrauenswürdig sind.
2. **Datenverarbeitung**: Extrahiere URLs aus nutzergenerierten Inhalten und stelle gleichzeitig die Sicherheit sicher.
3. **Datenanalyse**: Filtere Duplikate oder irrelevante Links für Forschungs- oder Marketingzwecke heraus.
4. **Benutzerorientierte Anwendungen**: Verlinke URLs automatisch in Chat-Apps oder Foren.

### Nachbearbeitung und Validierung

Nachdem potenzielle URLs gesammelt wurden, wende zusätzliche Prüfungen an:

- **DNS-Abfrage**: Überprüfe, ob die Domains aufgelöst werden.
- **Sicherheitsprüfungen**: Nutze Dienste, um bösartige oder Phishing-Seiten zu erkennen.
- **Benutzerdefinierte Regeln**: Wende projektspezifische Filter an (z. B. erlaubte TLDs, maximale URL-Länge).

## 📝 Zusammenfassung

Das Extrahieren von semi-strukturierten Zeichenketten ist vielleicht der befriedigendste Teil der Regex-Meisterschaft.

Hier ist eine Zusammenfassung der wichtigsten Erkenntnisse:

- **Nutze ein visuelles Tool, um [Regex-Muster](https://regex101.com/r/jO8bC4/69) zu schreiben, zu testen** und zu verstehen.
- **Zerlege die Herausforderung in Teile** und löse jeden Teil separat. In gewisser Weise liefern uns Erfassungsgruppen bildliche 'Wegmarkierungen' für unseren Regex.
- **Verwende 'lockere' Übereinstimmungsausdrücke, vermeide strikte Spezifikationskonformität** bei der Datenerfassung.
- **Die Anwendung von Validierungsschritten** nach der ersten Extraktion ist unerlässlich – berücksichtige stets die Sicherheit und die spezifischen Anforderungen deines Projekts.

Wenn du diese Schritte befolgst, kannst du effektiv jede semi-strukturierte Zeichenkette extrahieren und damit die Grundlage für weitere Verarbeitung und Validierung schaffen.

## 📚 Weiterführendes Lernen

- Spiele mit einer [Live-Demo auf RegEx101.com](https://regex101.com/r/jO8bC4/69)!
- Ursprüngliche StackOverflow-Frage und ein [Link zu meiner Antwort hier](https://stackoverflow.com/a/34669019/369727).
- [MDN-Dokumentation zu regulären Ausdrücken](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Fortgeschrittene Regex-Techniken](https://www.regular-expressions.info/): Erkunde Lookaheads, Lookbehinds und andere fortgeschrittene Muster für präzisere Übereinstimmungen.
- [RFC 3986 – URI Generic Syntax](https://datatracker.ietf.org/doc/html/rfc3986)
````
