# Translation Candidate
- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/de/index.mdx
- Validation: passed
- Runtime seconds: 5.33
- Input tokens: 10499
- Output tokens: 3633
- Thinking tokens: unknown
- Cached input tokens: 5504
- Cache write tokens: 0
- Estimated cost: $0.001063
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Vom Anfänger zum Regex‑Helden
subTitle: Extrahieren & Parsen von URL‑ähnlichen Zeichenketten mit einem einzigen Regex
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
- 🛳️ [Der 120‑Byte‑Regex](#️-the-120-byte-regex)
- 🧩 [Schritt‑für‑Schritt‑Analyse](#-breaking-it-down-step-by-step)
- 🛠️ [Parsing‑Beispiel](#-pa)
- ☑️ [Nächste Schritte](#-next-steps)
- 📝 [Zusammenfassung](#-summary)
- 📚 [Weiterführende Literatur](#-further-learning)

**TL;DR:** Direkt zum [120‑Byte‑Regex](#️-the-120-byte-regex) springen.

## 🚀 Einleitung

URLs aus rohem Text zu extrahieren fühlt sich manchmal an wie ein mühsames Whack‑a‑Mole‑Spiel. Satzzeichen, Klammer‑Umhüllungen und mehrdeutige Formatierungen arbeiten zusammen, um Ihre Bemühungen zu behindern. Egal, ob Sie einen Web‑Scraper, Datenanalysator oder eine Chat‑Anwendung bauen – das präzise Extrahieren von URLs ist unverzichtbar.

In diesem Beitrag gehen wir das Problem direkt an mit einem flexiblen, zweistufigen Ansatz. Unser Ziel ist es, **zuerst alle _potenziellen_ URL‑ähnlichen Zeichenketten zu erfassen** und anschließend die Validierung in einem nachgelagerten Prozess zu erledigen.

> 💡 **Hinweis:** Dieses Muster dient **_nicht_** zur **Validierung** von URLs! Es ist bewusst permissiv gegenüber Interpunktion und falscher Schreibweise.

## 🔍 Ziel: URLs aus Text extrahieren

Beim Extrahieren von URLs aus rohem Text erweist sich ein zweistufiger Ansatz als effektiv:

1. **Alles URL‑ähnliche erfassen**: Wirf ein weites Netz, um alle Zeichenketten zu erwischen, die *möglicherweise* URLs sind. Hier glänzt unser „120‑plus‑Byte‑Regex“.
2. **Validieren**: Nachdem du diese Kandidaten erfasst hast, führe sekundäre Prüfungen durch (z. B. DNS‑Auflösung, Abgleich mit bekannten Domains), um ungültige Einträge herauszufiltern.

### Die Herausforderung visualisieren

Begriffe wie `extract` und `parse` werden häufig synonym verwendet, doch sie bezeichnen unterschiedliche Vorgänge. Das Extrahieren von URLs bedeutet, potenzielle URLs in einem größeren Textblock zu identifizieren und zu erfassen. Das Parsen hingegen zerlegt diese URLs in ihre Bestandteile.

Wenn ich von Parsen oder „URL‑Teilen“ spreche, meine ich die folgenden Komponenten:

<figure>
  <figcaption>The 5 Parts of all URLs</figcaption>
![URL anatomy, visualized](../WhatUrlsAreMadeOf-ColorMatched.svg "URL anatomy, visualized")
</figure>

<details class="inset breakout">
  <summary>Click to see a screenshot of RegEx101's substring matching.</summary>

  Before we get too deep into the regex, let's use a visual tool to see how well my pattern captures many matches:

  <figure>
    <figcaption>Using [RegEx101.com](https://regex101.com/r/jO8bC4/69) to visualize multi-line matches</figcaption>
    ![Preview 'bulk' multi-line matches](../RegEx101-Matches-Screenshot.webp "Preview 'bulk' multi-line results")
  </figure>
</details>

## The 120+ Byte Regex

Below is a concise regex designed to extract and parse URLs in a single shot. It supports various protocols, domains, paths, and optional query/fragment sections.

Keine Sorge – wir zerlegen das Ganze Schritt für Schritt!

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

<blockquote class="inset">Teile die wildesten Regex‑Muster, die du je gesehen (oder selbst geschrieben) hast, in den <a href="#post-comments">Kommentaren unten</a>! 🚀</blockquote>

## 🧩 Schritt‑für‑Schritt‑Analyse

Lassen Sie uns den regulären Ausdruck in seine Bestandteile zerlegen, um zu verstehen, wie er funktioniert:

<h3>1. Protokoll (Gruppe 1): <code>{`([-.a-z0-9]+:\/{1,3})`}</code></h3>

<ul>
  <li>**Zweck:** Erfasst den Protokoll‑Teil der URL (z. B. `http://`, `ftp://`, `custom-scheme://`).</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[-.a-z0-9]+</code>: Matcht ein oder mehrere Kleinbuchstaben, Ziffern, Bindestriche oder Punkte (häufig in Protokoll‑Schemen).</li>
      <li><code>{`:\/{1,3}`}</code>: Matcht einen Doppelpunkt gefolgt von ein bis drei Schrägstrichen (<code>:/</code>, <code>://</code> oder <code>:///</code>).</li>
    </ul>
  </li>
</ul>

<h3>2. Domain (Gruppe 2): <code>{`([^-\/\.[\](|)\s?][^\`\/\s\]?]+)`}</code></h3>

<ul>
  <li>**Zweck:** Erfasst den Domain‑ bzw. Host‑Teil der URL.</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[^-\/\.[\](|)\s?]</code>: Matcht jedes Zeichen außer den angegebenen Sonderzeichen und Leerzeichen.</li>
      <li><code>[^`\/\s\]?]+</code>: Matcht ein oder mehrere Zeichen außer Backticks, Schrägstrichen, Leerzeichen oder schließenden eckigen Klammern.</li>
    </ul>
  </li>
</ul>

<h3>3. Pfad (Gruppe 3): <code>{`([-_a-z0-9!@$%^&*()=+;/~\\.]*)`}</code></h3>

<ul>
  <li>**Zweck:** Erfasst den Pfad‑Teil der URL.</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[-_a-z0-9!@$%^&*()=+;/~\.]*</code>: Erlaubt null oder mehr URL‑sichere Zeichen, die typischerweise in Pfaden vorkommen.</li>
    </ul>
  </li>
</ul>

<h3>4. Query (Gruppe 4): <code>[?]?([^#\s`?]*)</code></h3>

<ul>
  <li>**Zweck:** Optionale Erfassung einer Query‑Zeichenkette, beginnend mit einem <code>?</code>-Zeichen.</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[?]?</code>: Optionale Übereinstimmung eines <code>?</code>. (Die eckigen Klammern sind nicht zwingend nötig, machen den Ausdruck jedoch etwas klarer als das ultra‑knappe doppelte <code>??</code>. Sie bieten zudem eine visuelle Parallele zur (ähnlichen) nächsten Gruppe <code>[#]?</code>.)</li>
      <li><code>([^#\s`?]*)</code>: Erlaubt null oder mehr Zeichen, die weder ein Hash, Leerzeichen, Backtick noch ein Fragezeichen sind.</li>
    </ul>
  </li>
</ul>

<h3>5. Fragment (Gruppe 5): <code>[#]?([^#\s'"`\.,!]*)</code></h3>

<ul>
  <li>**Zweck:** Optionale Erfassung des Fragment‑Identifiers, beginnend mit einem <code>#</code>.</li>
  <li>
    **Erklärung:**
    <ul>
      <li><code>[#]?</code>: Optionale Übereinstimmung eines <code>#</code>.</li>
      <li><code>([^#\s'"`\.,!]*)</code>: Erlaubt null oder mehr Zeichen, die keine verbotenen Satzzeichen oder Leerzeichen sind.</li>
    </ul>
  </li>
</ul>

## 🛠️ Parsing‑Beispiel

Hier ein Beispiel, wie Sie dieses Monster‑Regex in JavaScript einsetzen können:

<CodeTabs client:only
 tabs={[
    "Code: URLs extrahieren",
    "Ergebnisse: Extrahierte URLs",
    "Ergebnisse: URL‑Teile",
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

Je nach Anwendungsfall müssen Sie das Regex möglicherweise verfeinern oder zusätzliche Validierungs‑ und Nachbearbeitungsschritte einbauen.

### Unterschiedliche Projekte, unterschiedliche Anforderungen

Projekte haben unterschiedliche Anforderungen und Sicherheitsaspekte:

1. **Web‑Scraping**: URLs validieren, um sicherzustellen, dass sie erreichbar und vertrauenswürdig sind.  
2. **Datenverarbeitung**: URLs aus nutzergenerierten Inhalten extrahieren und gleichzeitig die Sicherheit wahren.  
3. **Datenanalyse**: Duplikate oder irrelevante Links für Forschung‑ oder Marketingzwecke herausfiltern.  
4. **Benutzer‑orientierte Anwendungen**: URLs in Chat‑Apps oder Foren automatisch verlinken.

### Nachbearbeitung und Validierung

Nachdem potenzielle URLs gesammelt wurden, weitere Prüfungen durchführen:

- **DNS‑Lookup**: Prüfen, ob Domains aufgelöst werden können.  
- **Sicherheits‑Checks**: Dienste nutzen, um nach bösartigen oder Phishing‑Seiten zu suchen.  
- **Benutzerdefinierte Regeln**: Projekt‑spezifische Filter anwenden (z. B. erlaubte TLDs, maximale URL‑Länge).

## 📝 Zusammenfassung

Das Extrahieren halbstrukturierter Zeichenketten kann durchaus der befriedigendste Aspekt beim Beherrschen von Regex sein.

Hier einÜberblick über die wichtigsten Erkenntnisse:

- **Verwenden Sie ein visuelles Werkzeug, um Ihre [Regex‑Muster zu schreiben, zu testen und zu verstehen.](https://regex101.com/r/jO8bC4/69)**
- **Zerlegen Sie die Herausforderung in Teilaufgaben** und lösen Sie jede separat. In gewisser Weise liefern Capture‑Groups uns bildhafte „Wegmarken“ für unser Regex.
- **Setzen Sie „lose“ Matching‑Ausdrücke ein und vermeiden Sie strikte Spezifikations‑Konformität**, wenn Sie Daten einlesen.
- **Validierungsschritte nach der ersten Extraktion anwenden** – berücksichtigen Sie stets die Sicherheitsanforderungen und die spezifischen Bedürfnisse Ihres Projekts.

Wenn Sie diese Schritte befolgen, können Sie beliebige halbstrukturierte Zeichenketten zuverlässig extrahieren und damit die Basis für weitere Verarbeitung und Validierung schaffen.

## 📚 Weiterführende Literatur

- Spielen Sie mit einem [Live‑Demo auf RegEx101.com](https://regex101.com/r/jO8bC4/69)!
- Die ursprüngliche StackOverflow‑Frage und ein [Link zu meiner Antwort hier](https://stackoverflow.com/a/34669019/369727).
- [MDN‑Dokumentation zu regulären Ausdrücken](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Advanced Regex Techniques](https://www.regular-expressions.info/): Erkunden Sie Lookaheads, Lookbehinds und weitere fortgeschrittene Muster für präzisere Treffer.
- [RFC 3986 – URI Generic Syntax](https://datatracker.ietf.org/doc/html/rfc3986)
````
