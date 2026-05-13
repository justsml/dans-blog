# Translation Candidate
- Slug: should-you-use-named-or-default-exports
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-08-18--should-you-use-named-or-default-exports/it/index.mdx
- Validation: deferred
- Runtime seconds: 6.33
- Input tokens: 2873
- Output tokens: 2822
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000907
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Esportazioni ESM: nominate vs. predefinite?'
subTitle: Chiamare o non chiamare?
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
## Dovresti utilizzare `named` o `default` exports in JavaScript?

Non mancano articoli fortemente argomentati su questo argomento.

La maggior parte giudica `default export` come "terribile". Altri sostengono che `default` debba vincere (es. AirBnb style guide).

Spesso attribuiscono colpa a cose **completamente temporanee**: bug sugli auto-import degli IDE, capacità di tree-shaking di un particolare bundler, o semplicemente la possibilità di errori di battitura nel nominare un import.

Abbiamo forse perso il punto principale degli `export`?

**Il codice è comunicazione. ✨**

> Stiamo inviando un segnale agli `import`ers _su come utilizzare una cosa_.

### Quindi, cosa stiamo comunicando?

In generale, ci sono 2 modi per esportare cose in JavaScript moderno:

- Un `export default` dichiara chiaramente "Questo è **L'UNICO ELEMENTO PIÙ IMPORTANTE**". Inoltre, "qualsiasi esportazione nominata ha un ruolo secondario".
- Un `named export` dice "è sicuramente **UN ELEMENTO!**". Solleva anche domande: "Hai altri elementi simili?". Seguito da: "Sono opzionali o obbligatori?".

Certo che puoi combinare entrambi, o utilizzare approcci diversi per parti diverse del tuo codice. [Vedi altri esempi alla fine dell'articolo.](#summary)

### Argomenti Deboli, Amico

Affrontiamo alcuni degli "problemi temporanei" comuni che le persone incontrano.

- Arg #1: Gli esporti nominati garantiscono la coerenza dei nomi. [fonte](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - No, non lo fanno. Forse stai cercando una regola di linter?
  - (Odio doverlo dire, ma aspetta di imparare cosa possono fare le variabili!)

```tsx
// Puoi usare alias con entrambi!
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- Arg #2: Usa `import * as soManyKnives from './kinves.js'` per combinare esporti nominati. (Non linkato, autore ritirato.)
  - Caratteristica interessante. Non è il punto.
  - Ora dimmi, come devo tenere il tuo strumento? Nessun intento dell'autore.
- Arg #3: Gli esporti nominati hanno un migliore supporto per l'importazione o rinominazione nell'IDE. [fonte](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

- Errato (ora no). Configura/aggiorna i tuoi strumenti.
  - Il supporto esiste da oltre 3 anni in [VS Code](https://github.com/microsoft/vscode/pull/94480), IntelliJ, ecc.
  - Tuttavia, esistono alcune "best practice" da seguire con gli `esporti predefiniti` per ottenere la migliore esperienza IDE e refactoring.
  - ✅ `export default function UserService() {}` - preferisci sempre funzioni nominate.
  - ❌ `export default function() { }` - le funzioni anonime non sono legate implicitamente al loro nome di file. Se non nomini l'oggetto, è difficile chiedere al computer di modificarlo.
  - **Nota:** Per ragioni storiche non puoi combinare `export default` con un'espressione `const`.

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ Non Supportato ❌ ^
    // Non puoi esportare default const ....
    // ==========================

    // Tuttavia, una volta dichiarato puoi esportare una variabile const come predefinita.
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ Valido

    // Per completezza:
    export default class anyoneStillUseThese {}
    // ^ ✅ Valido anche esportare una classe come predefinita
    ```

<section className="scroll-x">
## Riepilogo

Esistono molte combinazioni di modi per esportare cose, ognuna racconta una storia diversa:

| Predefinito (Esporti) | Nominati (Esporti) | Funzioni Private | Pattern                                                   | Significato                                                       |
| --------------------- | ------------------ | ---------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| ✅                   | ❌                | ❌              | Un solo esport predefinito.                               | “Presento UNA funzione con Scopo Singolo!”                        |
| ❌                   | ✅                | ❌              | Un solo esport nominato.                                  | “Per favore, non rinominarmi.”                                    |
| ✅                   | ✅                | ✅              | Esport predefinito + molteplici funzioni private non esportate | “Ecco alcune logiche correlate. Aspettati un comportamento simile a una classe.” |
| ❌                   | ❌                | ✅              | Molteplici esport nominati, nome di file generico.        | “Un insieme di cose leggermente correlate, senza gerarchia implicata.” |
| ✅                   | ✅                | ❌              | Un solo esport nominato esportato anche come predefinito. | “Non puoi sbagliare importando me.”                               |
</section>

**Qualcosa da considerare:** Cosa stiamo dicendo quando il nome del file corrisponde o meno a uno dei suoi esport? (Ad esempio, un `utils.js` con molte funzioni.)

### Conclusione

Se il Codice è Comunicazione, esporta come se ci tenessi davvero. 💞
````
