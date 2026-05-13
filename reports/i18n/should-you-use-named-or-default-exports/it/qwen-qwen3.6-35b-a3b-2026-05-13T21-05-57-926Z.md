# Translation Candidate
- Slug: should-you-use-named-or-default-exports
- Locale: it
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2023-08-18--should-you-use-named-or-default-exports/it/index.mdx
- Validation: deferred
- Runtime seconds: 50.13
- Input tokens: 2859
- Output tokens: 11059
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.011488
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Esportazioni ESM: con nome vs. predefinite?'
subTitle: 'Dare un nome, o non darne uno?'
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
## Dovresti usare le esportazioni `named` o `default` in JavaScript?

Non mancano articoli con posizioni nette su questo argomento.

La maggior parte considera l'`export default` come “terribile”. Altri sostengono che `default` dovrebbe prevalere (es. la guida di stile di Airbnb).

Spesso danno la colpa a cose **del tutto temporanee**: bug nell'auto-import degli IDE, capacità di tree-shaking di un particolare bundler, o la semplice possibilità di refusi nel nominare un import.

Abbiamo perso di vista lo scopo dell'`export` fin dall'inizio?

**Il codice è comunicazione. ✨**

> Stiamo inviando un segnale agli `import`er su _come utilizzare un elemento._

### Quindi, cosa stiamo dicendo?

In termini generali, ci sono 2 modi per esportare elementi in JavaScript moderno:

- Un `export default` dichiara con decisione: “Questa è la cosa **_PIÙ IMPORTANTE IN ASSOLUTO_**.” Inoltre: “tutte le esportazioni `named` hanno solo un ruolo di supporto.”
- Un `named export` afferma che è “definitivamente **_UNA COSA!_**” Solleva anche alcune domande: “ci sono altri elementi associati?” E poi: “sono opzionali o obbligatori?”

Certo, puoi combinare entrambi, o usare approcci diversi per parti diverse del tuo codebase. [Vedi altri esempi alla fine dell'articolo.](#summary)

### Argomentazioni deboli

Affrontiamo alcuni dei comuni “problemi temporanei” che si incontrano spesso.

- Arg #1: Le esportazioni `named` garantiscono la coerenza dei nomi. [fonte](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - No, non lo fanno. Forse stai cercando una regola di lint?
  - (Mi dispiace spezzarti l'illusione, ma aspetta di scoprire cosa possono fare le variabili!)

```tsx
// You can alias using both!
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- Arg #2: Usa `import * as soManyKnives from './kinves.js'` per combinare le esportazioni `named`. (Non linkato, autore ha ritrattato.)
  - Funzione carina. Non è il punto.
  - Ora dimmi, come si usa di nuovo il tuo aggeggio? Nessuna intenzione dell'autore.
- Arg #3: Le esportazioni `named` offrono un supporto migliore per l'import o il rinomina nell'IDE. [fonte](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

- Errato (almeno non più). Configura/aggiorna i tuoi strumenti.
  - Il supporto esiste da oltre 3 anni in [VS Code](https://github.com/microsoft/vscode/pull/94480), IntelliJ, ecc.
  - Tuttavia, ci sono alcune “best practice” da applicare con le `default exports` per ottenere la migliore esperienza di IDE e refactoring.
  - ✅ `export default function UserService() {}` - preferisci sempre funzioni con nome.
  - ❌ `export default function() { }` - le funzioni anonime non sono implicitamente legate al loro nome file. Se non dai un nome alla cosa, è difficile chiedere al computer di modificarla.
  - **Nota:** Per motivi storici non puoi combinare `export default` con un'espressione `const`.

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ Not Supported ❌ ^
    // Cannot export default const ....
    // ==========================

    // However, once declared you can export a const var as the default.
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ Valid

    // For completeness:
    export default class anyoneStillUseThese {}
    // ^ ✅ Also valid to export a class as default
    ```

<section className="scroll-x">
## Summary

In realtà esistono molte combinazioni possibili per esportare elementi, e ciascuna racconta una storia diversa:

| Default (Exports) | Named (Exports) | Private Fns | Pattern                                                   | Meaning                                                       |
| ----------------- | --------------- | ----------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| ✅                | ❌              | ❌          | Un'unica esportazione `default`.                          | “Presento UNA funzione con Scopo Unico!”                      |
| ❌                | ✅              | ❌          | Un'unica esportazione `named`.                             | “Per favore, non rinominarmi.”                                |
| ✅                | ✅              | ✅          | Esportazione `default` + più funzioni 'private' non esportate | “Ecco della logica correlata. Inoltre, aspettati un comportamento simile a una classe.” |
| ❌                | ❌              | ✅          | Multiple esportazioni `named`, nome file generico.        | “Un misto di cose vagamente correlate, senza gerarchia implicita.” |
| ✅                | ✅              | ❌          | Un'unica esportazione `named` ESPORTATA ANCHE COME `default`. | “Non puoi sbagliare a importarmi.”                            |
</section>

**Spunto di riflessione:** Cosa stiamo comunicando quando il nome del file corrisponde o meno a una delle sue esportazioni? (Per esempio, un `utils.js` con molte funzioni.)

### Conclusione

Se il Codice è Comunicazione, `export` come se ci tenessi davvero. 💞
````
