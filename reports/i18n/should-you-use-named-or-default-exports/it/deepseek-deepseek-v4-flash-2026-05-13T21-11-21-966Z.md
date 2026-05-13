# Translation Candidate
- Slug: should-you-use-named-or-default-exports
- Locale: it
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2023-08-18--should-you-use-named-or-default-exports/it/index.mdx
- Validation: deferred
- Runtime seconds: 70.24
- Input tokens: 2820
- Output tokens: 2289
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001036
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Esportazioni ESM: nominate vs. predefinite?'
subTitle: Nominare o non nominare?
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
## Dovresti usare esportazioni `named` o `default` in JavaScript?

Non mancano articoli fortemente schierati su questo argomento.

La maggior parte giudica `default export` come “terribile.” Altri sostengono che `default` dovrebbe vincere (es. la guida di stile di AirBnb).

Spesso incolpano cose **del tutto temporanee**: bug di auto-import dell'IDE, le capacità di tree-shaking di un particolare bundler, o la mera possibilità di errori di battitura nel nominare un import.

Abbiamo forse perso di vista il senso di `export`are in primo luogo?

**Il codice è comunicazione. ✨**

> Stiamo inviando un segnale a chi `import`a _su come usare una cosa._

### Quindi, cosa stiamo dicendo?

In generale, ci sono 2 modi per esportare cose in JavaScript moderno:

- Un `export default` dichiara audacemente “Questa è **_LA COSA PIÙ IMPORTANTE_**.” Inoltre, “tutte le esportazioni nominate hanno solo un ruolo di supporto.”
- Un `named export` dice che è “sicuramente **_UNA COSA!_**” Inoltre solleva alcune domande, “hai altri amici lì?” Seguito, “Sono invitati o richiesti?”

Ovviamente puoi combinarli entrambi, o usare approcci diversi per parti diverse del tuo codebase. [Vedi altri esempi alla fine dell'articolo.](#summary)

### Argomenti Deboli, Amico

Affrontiamo alcuni dei comuni "problemi temporanei" che la gente incontra.

- Arg #1: Le esportazioni nominate garantiscono coerenza dei nomi. [fonte](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - No, non è vero. Forse stai cercando una regola di lint?
  - (Mi dispiace dovertelo dire, ma aspetta di scoprire cosa possono fare le variabili!)

```tsx
// Puoi creare alias con entrambi!
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- Arg #2: Usa `import * as soManyKnives from './kinves.js'` per combinare esportazioni nominate. (Non linkato, l'autore ha ritrattato.)
  - Bella funzionalità. Non è il punto.
  - Ora dimmi, come si tiene il tuo aggeggio? Nessuna intenzione dell'autore.
- Arg #3: Le esportazioni nominate hanno un miglior supporto IDE per import o rinomina. [fonte](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

- Errato (ancora). Configura/aggiorna i tuoi strumenti.
  - Il supporto esiste da oltre 3 anni in [VS Code](https://github.com/microsoft/vscode/pull/94480), IntelliJ, ecc.
  - Tuttavia, ci sono alcune "buone pratiche" da usare con `default exports` per ottenere la migliore esperienza IDE e di refactoring.
  - ✅ `export default function UserService() {}` - preferisci sempre funzioni con nome.
  - ❌ `export default function() { }` - le funzioni anonime non sono implicitamente legate al loro nome file. Se non dai un nome alla cosa, è difficile chiedere al computer di cambiarlo.
  - **Nota:** Per ragioni storiche non puoi combinare `export default` con un'espressione `const`.

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ Non supportato ❌ ^
    // Non puoi esportare default const ....
    // ==========================

    // Tuttavia, una volta dichiarata, puoi esportare una variabile const come default.
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ Valido

    // Per completezza:
    export default class anyoneStillUseThese {}
    // ^ ✅ È anche valido esportare una classe come default
    ```

<section className="scroll-x">
## Riepilogo

In realtà ci sono molte combinazioni di modi in cui possiamo esportare cose, ognuna racconta una storia diversa:

| Default (Esportazioni) | Named (Esportazioni) | Funzioni Private | Pattern                                                   | Significato                                                       |
| ---------------------- | -------------------- | ---------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| ✅                     | ❌                   | ❌               | Un'unica esportazione default.                            | "Ecco UNA funzione con Scopo Unico!"                              |
| ❌                     | ✅                   | ❌               | Un'unica esportazione nominata.                           | "Per favore, non rinominarmi."                                    |
| ✅                     | ✅                   | ✅               | Esportazione default + più funzioni 'private' non esportate | "Ecco della logica correlata. Inoltre, aspettati un comportamento simile a una classe." |
| ❌                     | ❌                   | ✅               | Multiple esportazioni nominate, nome file generico.       | "Un miscuglio di cose vagamente correlate, nessuna gerarchia implicita." |
| ✅                     | ✅                   | ❌               | Singola esportazione nominata ANCHE esportata come default. | "Non puoi sbagliare a importarmi."                                |
</section>

**Qualcosa su cui riflettere:** Cosa stiamo dicendo quando il nome del file corrisponde o meno a una delle sue esportazioni? (Ad esempio, un `utils.js` con molte funzioni.)

### Conclusione

Se il Codice è Comunicazione, per favore `export` come se fosse importante, cazzo. 💞
````
