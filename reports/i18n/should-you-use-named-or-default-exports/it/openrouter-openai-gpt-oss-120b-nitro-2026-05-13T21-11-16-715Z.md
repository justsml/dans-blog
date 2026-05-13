# Translation Candidate
- Slug: should-you-use-named-or-default-exports
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-18--should-you-use-named-or-default-exports/it/index.mdx
- Validation: deferred
- Runtime seconds: 2.02
- Input tokens: 4345
- Output tokens: 1567
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000452
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Esportazioni ESM: nominate vs. predefinite?'
subTitle: Denominare o no?
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

Non mancano gli articoli dal tono deciso su questo argomento.

La maggior parte giudica il `default export` come “terribile”. Altri sostengono che il `default` debba prevalere (es. la guida di stile di AirBnb).

Spesso incolpano cose **interamente temporanee**: bug di auto‑import degli IDE, le capacità di tree‑shaking di un bundler specifico, o la semplice possibilità di errori di battitura quando si nomina un import.

Abbiamo perso di vista lo scopo dell’`export` fin dall’inizio?

**Il codice è comunicazione. ✨**

> Stiamo inviando un segnale agli `import`er su _come usare una cosa_.

### Allora, cosa stiamo dicendo?

In linea generale, ci sono 2 modi per esportare cose in JavaScript moderno:

- Un `export default` dichiara con decisione “Questa è **_LA COSA PIÙ IMPORTANTE_**”. Inoltre, “qualsiasi export nominato ha solo un ruolo di supporto.”
- Un `named export` dice “è **_UNA COSA!_**” e solleva qualche dubbio: “c’è qualcun altro lì?” Seguito da “Sono invitati o obbligatori?”

Naturalmente puoi combinare entrambi, o usare approcci diversi per parti diverse del tuo codebase. [Vedi più esempi alla fine dell’articolo.](#summary)

### Argomenti deboli, amico

Affrontiamo alcune delle “questioni temporanee” più comuni che la gente incontra.

- Arg #1: Le esportazioni nominate garantiscono la coerenza dei nomi. [source](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - No, non lo fanno. Forse ti serve una regola di lint?
  - (Mi dispiace romperla, ma aspetta di capire cosa possono fare le variabili!)

```tsx
// Puoi aliasare usando entrambi!
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- Arg #2: Usa `import * as soManyKnives from './kinves.js'` per combinare esportazioni nominate. (Non collegato, l’autore si è ritirato.)
  - Funzionalità carina. Non è il punto.
  - Ora dimmi, come dovrei impugnare di nuovo il tuo aggeggio? Nessuna intenzione dell’autore.
- Arg #3: Le esportazioni nominate hanno un migliore supporto IDE per import o rinomina. [source](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

- Errato (altro). Configura/aggiorna i tuoi strumenti.
  - Il supporto esiste da più di 3 anni in [VS Code](https://github.com/microsoft/vscode/pull/94480), IntelliJ, ecc.
  - Ciononostante, ci sono alcune “best practice” da seguire con le `export default` per ottenere la migliore esperienza di IDE e refactoring.
  - ✅ `export default function UserService() {}` – preferisci sempre le funzioni nominate.
  - ❌ `export default function() { }` – le funzioni anonime non sono implicitamente legate al nome del file. Se non nomini l’entità, è difficile chiedere al computer di cambiarla.
  - **Nota:** Per ragioni storiche non puoi combinare `export default` con un’espressione `const`.

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ Non supportato ❌ ^
    // Impossibile esportare default const ....
    // ==========================

    // Tuttavia, una volta dichiarata, puoi esportare una const come default.
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ Valido

    // Per completezza:
    export default class anyoneStillUseThese {}
    // ^ ✅ Anche valido esportare una classe come default
    ```

<section className="scroll-x">
## Riepilogo

In realtà esistono molte combinazioni di modalità di esportazione, ognuna racconta una storia diversa:

| Default (Exports) | Named (Exports) | Private Fns | Pattern                                                   | Meaning                                                       |
| ----------------- | --------------- | ----------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| ✅                | ❌              | ❌          | Un’esportazione default.                                 | “Presentiamo UNA funzione con scopo unico!”                  |
| ❌                | ✅              | ❌          | Un’esportazione nominata.                                 | “Per favore non rinominarmi.”                                 |
| ✅                | ✅              | ✅          | Export default + più funzioni ‘private’ non esportate    | “Ecco della logica correlata. Inoltre, aspettati comportamento simile a una classe.” |
| ❌                | ❌              | ✅          | Multiple named exports, nome file generico.              | “Un sacco di cose vagamente correlate, nessuna gerarchia implicita.” |
| ✅                | ✅              | ❌          | Export nominato singolo ALSO esportato come default.      | “Non puoi sbagliare importandomi.”                            |
</section>

**Qualcosa su cui riflettere:** Cosa stiamo dicendo quando il nome del file corrisponde o meno a una delle sue esportazioni? (Per esempio, un `utils.js` con molte funzioni.)

### Conclusione

Se il codice è comunicazione, per favore `export` come se fosse davvero importante. 💞
````
