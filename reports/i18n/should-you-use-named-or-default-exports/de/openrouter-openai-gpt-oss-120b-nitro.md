# Translation Candidate
- Slug: should-you-use-named-or-default-exports
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-18--should-you-use-named-or-default-exports/de/index.mdx
- Validation: passed
- Runtime seconds: 5.12
- Input tokens: 4236
- Output tokens: 1447
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000426
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'ESM‑Exporte: benannt vs. default?'
subTitle: Benennen oder nicht benennen?
date: '2023-08-10'
modified: '2024-08-01'
tags:
  - typescript
  - javascript
  - modules
category: Guides
subCategory: JavaScript
cover: ../austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_mobile: ../w300_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_icon: ../icon_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
---
## Sollten Sie `named` oder `default` Exports in JavaScript verwenden?

Es gibt keinen Mangel an stark formulierten Artikeln zu diesem Thema.

Die Mehrheit beurteilt `default export` als „schrecklich“. Andere vertreten die Ansicht, dass `default` gewinnen sollte (z. B. der AirBnb‑Style‑Guide).

Sie schieben die Schuld häufig auf **völlig temporäre** Dinge: IDE‑Auto‑Import‑Fehler, die Tree‑Shaking‑Fähigkeiten eines bestimmten Bundlers oder die bloße Möglichkeit von Tippfehlern beim Benennen eines Imports.

Haben wir den eigentlichen Sinn des `export`‑Mechanismus verfehlt?

**Code ist Kommunikation. ✨**

> Wir senden ein Signal an `import`‑Aufrufer, _wie ein Objekt zu benutzen ist_.

### Was sagen wir damit?

Im Groben gibt es in modernem JavaScript zwei Arten, Dinge zu exportieren:

- Ein `export default` erklärt kühn: „Das ist **_DAS EINZIGE WICHTIGSTE_**.“ Gleichzeitig bedeutet das, „alle benannten Exporte spielen nur eine unterstützende Rolle.“
- Ein `named export` sagt: „Das ist **_EIN DING!_**“ und wirft gleichzeitig Fragen auf wie „Gibt es noch weitere Kumpels dort?“ bzw. „Sind sie eingeladen oder verpflichtend?“

Natürlich kann man beides kombinieren oder unterschiedliche Strategien für verschiedene Bereiche des Code‑Bases verwenden. [Siehe weitere Beispiele am Ende des Artikels.](../#summary)

### Schwache Argumente, Mann

Lassen Sie uns einige der häufigen „temporären Probleme“ angehen, auf die Entwickler stoßen.

- Argument #1: Benannte Exporte gewährleisten Namenskonsistenz. [Quelle](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - Nein, tun sie nicht. Vielleicht suchen Sie nach einer Lint‑Regel?
  - (Ich muss es Ihnen leider sagen, aber warten Sie, bis Sie lernen, was Variablen leisten können!)

```tsx
// Sie können beides aliasen!
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- Argument #2: `import * as soManyKnives from './kinves.js'` verwenden, um benannte Exporte zu kombinieren. (Kein Link, Autor hat es zurückgezogen.)
  - Praktisches Feature. Nicht der Kernpunkt.
  - Und nun: Wie soll ich Ihr Gerät wieder halten? Keine klare Autorenintention.

- Argument #3: Benannte Exporte bieten besseren IDE‑Import‑ oder Umbenennungs‑Support. [Quelle](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

- Falsch (und weitere). Passen Sie Ihre Werkzeuge an bzw. aktualisieren Sie sie.
  - Unterstützung gibt es seit über drei Jahren in [VS Code](https://github.com/microsoft/vscode/pull/94480), IntelliJ usw.
  - Dennoch gibt es einige „Best Practices“ für `default exports`, um das beste IDE‑ und Refactoring‑Erlebnis zu erzielen.
  - ✅ `export default function UserService() {}` – immer benannte Funktionen bevorzugen.
  - ❌ `export default function() { }` – anonyme Funktionen sind nicht implizit an ihren Dateinamen gebunden. Ohne Namen ist es schwer, dem Computer mitzuteilen, dass er sie ändern soll.
  - **Hinweis:** Aus historischen Gründen können Sie `export default` nicht mit einem `const`‑Ausdruck kombinieren.

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ Nicht unterstützt ❌ ^
    // Cannot export default const ....
    // ==========================

    // Sobald die Variable deklariert ist, können Sie sie als Default exportieren.
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ Gültig

    // Zur Vollständigkeit:
    export default class anyoneStillUseThese {}
    // ^ ✅ Auch gültig, eine Klasse als Default zu exportieren
    ```

<section className="scroll-x">
## Zusammenfassung

Es gibt tatsächlich zahlreiche Kombinationen, wie wir Dinge exportieren können – jede erzählt eine andere Geschichte:

| Default (Exports) | Named (Exports) | Private Fns | Pattern                                                   | Bedeutung                                                       |
| ----------------- | --------------- | ----------- | --------------------------------------------------------- | --------------------------------------------------------------- |
| ✅                | ❌              | ❌          | Ein Default‑Export.                                       | „Präsentiere EINE Funktion mit einem einzigen Zweck!“          |
| ❌                | ✅              | ❌          | Ein benannter Export.                                     | „Bitte nicht umbenennen.“                                       |
| ✅                | ✅              | ✅          | Default‑Export + mehrere „private“ nicht exportierte Funktionen | „Hier ist etwas zusammengehörige Logik. Außerdem erwartete Klassen‑ähnliche Verhaltensweisen.“ |
| ❌                | ❌              | ✅          | Mehrere benannte Exporte, generischer Dateiname.          | „Ein Sammelsurium lose zusammenhängender Dinge, ohne implizite Hierarchie.“ |
| ✅                | ✅              | ❌          | Ein benannter Export, zusätzlich als Default exportiert.  | „Sie können mich nicht falsch importieren.“                     |
</section>

**Etwas zum Nachdenken:** Was sagen wir, wenn der Dateiname mit einem seiner Exporte übereinstimmt oder nicht? (Zum Beispiel eine `utils.js` mit vielen Funktionen.)

### Fazit

Wenn Code Kommunikation ist, dann `export` Sie bitte, als meinen Sie es verdammt ernst. 💞
````
