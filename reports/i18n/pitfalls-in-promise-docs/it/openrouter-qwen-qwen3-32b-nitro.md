# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/it/index.mdx
- Validation: deferred
- Runtime seconds: 6.25
- Input tokens: 2879
- Output tokens: 2830
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000910
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Insidie nella Documentazione delle Promise
subTitle: Evitare problemi da documentazione comune
date: '2017-05-10'
modified: '2024-07-30'
category: Code
subCategory: promises
tags:
  - programming
  - patterns
  - promises
  - functional-programming
cover: ../craig-whitehead-433328-unsplash.webp
cover_mobile: ../w300_craig-whitehead-433328-unsplash.webp
cover_icon: ../icon_craig-whitehead-433328-unsplash.webp
---
> Individuare anti-pattern delle Promise nei risultati di ricerca Google e nelle librerie popolari.

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

Inizio con una confessione: sono colpevole di aver scritto gli stessi "anti-pattern" che criticano qui sotto, come probabilmente molti sviluppatori JS hanno fatto anch'essi. Nulla di ciò che ho esposto è inteso come personale né diretto agli autori originali. Sto semplicemente effettuando una revisione di codice su pattern comuni - spero di trasmettere una comprensione delle mie priorità e del mio processo di pensiero critico.

> Spero che, dopo aver compreso questo progetto, sarete in grado di riconoscere i segnali d'allarme delle cattive Promises.

1. [CallbackHell.com](#callbackhellcom)
1. [StrongLoop](#strongloop)
1. [RisingStack](#risingstack)
1. [Q Library](#qlibrary)

--------------------------
### CallbackHell.com
> **CREDIT:** http://callbackhell.com/
![CallbackHell.com](../callbackhell.webp)

### StrongLoop
> **CREDIT:** `https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`
![Strong Loop](../strongloop.webp)

----------------
### RisingStack
> **CREDIT:** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
Questo è un articolo abbastanza solido. Ho un solo problema:

![Rising Stack](../risingstack.webp)

------------------------
### Q Library
> **CREDIT:** https://github.com/kriskowal/q

La libreria Q è una delle più utilizzate e antiche ad essere associata alle "Promises". Per questo motivo soffre di esempi datati e della necessità di mantenere la compatibilità con le versioni precedenti. 
**Dico "associata alle 'Promises'" perché ritengo che Q si basi veramente sul pattern `deferred`.**

Potrebbe assomigliare alle Promises, ma insisto: non lo è. Ha una superficie di API troppo estesa per tutti i motivi sbagliati. Inoltre, la convenzione di denominazione abbrevia i nomi in modo inconsistente, rendendo più difficile memorizzare l'interfaccia. Metodi come `when` e `done` non sono necessari.

In sintesi: il pattern differito è un anti-pattern doloroso - migliora virtualmente nulla rispetto all'approccio tipico basato su callback.

![Primo esempio di Q](../qlibrary-1.webp)

![Anti-pattern differito di Q per XML HTTP](../qlibrary-2.webp)

> Guarda (& stellal) il progetto GitHub associato a questo articolo, [Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)

> Obiettivo del progetto: ricerca e sviluppo di meglio pattern linguistici funzionali in JavaScript.
````
