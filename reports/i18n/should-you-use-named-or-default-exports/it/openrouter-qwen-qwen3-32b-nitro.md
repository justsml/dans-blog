# Translation Candidate
- Slug: should-you-use-named-or-default-exports
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-08-18--should-you-use-named-or-default-exports/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 12.45
- Input tokens: 4148
- Output tokens: 5202
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001580
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2023-08-18--should-you-use-named-or-default-exports/it/index.mdx reports/i18n/should-you-use-named-or-default-exports/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Esportazioni ESM: denominate vs. predefinite?'
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
## Dovresti usare le esportazioni `named` o `default` in JavaScript?

Non mancano articoli scritti con forza su questo argomento.

La maggior parte giudica l'`default export` come "terribile". Altri sostengono che `default` dovrebbe prevalere (ad esempio, la guida di stile di AirBnb).

Spesso attribuiscono la colpa a cose **completamente temporanee**: bug sugli auto-import degli IDE, le capacità di tree-shaking di un particolare bundler, o semplicemente la possibilità di errori di battitura quando si nomina un'importazione.

Abbiamo forse perso di vista lo scopo principale delle `export`?

**Il codice è comunicazione. ✨**

> Stiamo inviando un segnale agli _importatori_ su come utilizzare qualcosa.  

### Quindi, cosa stiamo dicendo?  

In generale, in JavaScript moderno ci sono 2 modi per esportare cose:  

- Un'`export default` afferma con forza: "Questo è **L'UNICO PIÙ IMPORTANTE**". Inoltre: "qualsiasi esportazione nominata ha un ruolo secondario".  
- Un'`esportazione nominata` dichiara che è "**UNA COSA!**" Solleva però alcune domande: "Hai altri amici lì?". Seguito da: "Sono invitati o obbligatori?".  

Naturalmente puoi combinare entrambi, o utilizzare approcci diversi per parti diverse del tuo codice. [Vedi altri esempi alla fine dell'articolo.](#summary)  

### Argomenti deboli, amico

### Argomenti deboli, amico

Affrontiamo alcuni degli "svantaggi temporanei" che le persone incontrano.

- Arg #1: Le esportazioni nominate garantiscono la coerenza dei nomi. [fonte](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - No, non lo fanno. Forse stai cercando una regola di lint?
  - (Odio doverlo dirti, ma aspetta finché non imparerai cosa possono fare le variabili!)

```tsx
// Puoi usare alias con entrambi!
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- Arg #2: Usa `import * as soManyKnives from './kinves.js'` per combinare esportazioni nominate. (Fonte non disponibile, autore ritirato.)
  - Funzionalità carina. Non è però il punto principale.
  - Ora dimmi, come devo usare il tuo aggeggio? Nessun intento dell'autore.
- Arg #3: Le esportazioni nominate hanno un supporto migliore per l'import e il rinominamento nei IDE. [fonte](../blog/use-named-exports-over-default-exports-in-javascript)

- Errato (non più). Configura/aggiorna i tuoi strumenti.
  - Il supporto esiste da oltre 3 anni in [VS Code](https://github.com/microsoft/vscode/pull/94480), IntelliJ, ecc.
  - Tuttavia, esistono alcune "best practice" da seguire con `esportazioni predefinite` per ottenere la migliore esperienza di IDE & refactoring.
  - ✅ `export default function UserService() {}` - preferisci sempre funzioni nominate.
  - ❌ `export default function() { }` - le funzioni anonime non sono legate implicitamente al loro nome di file. Se non nomini l'oggetto, è difficile chiedere al computer di cambiarlo.
  - **Nota:** Per ragioni storiche non puoi combinare `export default` con un'espressione `const`.

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ Non Supportato ❌ ^
    // Non puoi esportare default const ....
    // ==========================

    // Tuttavia, una volta dichiarato puoi esportare una variabile const come default.
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ Valido

    // Per completezza:
    export default class anyoneStillUseThese {}
    // ^ ✅ Anche esportare una classe come default è valido
    ```

<section className="scroll-x">
## Riassunto

Esistono molte combinazioni di modi per esportare cose, ognuna racconta una storia diversa:

| Default (Esporta) | Nominato (Esporta) | Funzioni Private | Pattern                                                   | Significato                                                       |
| ----------------- | ------------------ | --------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| ✅                | ❌                 | ❌              | Una sola esportazione predefinita.                        | "Presento UNA funzione con Scopo Unico!"                        |
| ❌                | ✅                 | ❌              | Una sola esportazione nominata.                           | "Per favore, non rinominarmi."                                  |
| ✅                | ✅                 | ✅              | Esportazione predefinita + molteplici funzioni private non esportate | "Ecco alcune logiche correlate. Aspettati un comportamento simile alle classi." |
| ❌                | ❌                 | ✅              | Molteplici esportazioni nominate, nome di file generico.  | "Un insieme eterogeneo di cose legate debolmente, senza gerarchia implicata." |
| ✅                | ✅                 | ❌              | Una singola esportazione nominata anche esportata come predefinita. | "Non puoi importarmi in modo errato."                           |
</section>

**Qualcosa su cui riflettere:** Cosa stiamo comunicando quando il nome del file corrisponde o meno a uno dei suoi esportati? (Ad esempio, un `utils.js` con molte funzioni.)

### Conclusione

Se il codice è comunicazione, per favore esporta come se volessi proprio comunicare. 💞
````
