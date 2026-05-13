# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 1.13
- Input tokens: 2905
- Output tokens: 918
- Thinking tokens: unknown
- Cached input tokens: 1408
- Cache write tokens: 0
- Estimated cost: $0.000279
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2017-05-10--pitfalls-in-promise-docs/it/index.mdx reports/i18n/pitfalls-in-promise-docs/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Insidie nella documentazione delle Promise
subTitle: Evitare i problemi della documentazione più diffusa
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
> Individuare gli anti‑pattern dei Promise nei risultati di ricerca di Google e nelle librerie popolari.

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

Inizio con una confessione: sono colpevole di scrivere gli stessi “anti‑pattern” che critico qui sotto, così come sono certo che molti sviluppatori JS lo siano. Nulla di quanto esposto è inteso come personale o diretto contro gli autori originali. Sto semplicemente facendo una revisione del codice su pattern comuni – spero di trasmettere la mia logica di priorità e il mio approccio critico.

> Speriamo che, dopo aver analizzato questo progetto, riusciate a riconoscere i segnali di allarme di Promise mal implementati.

1. [CallbackHell.com](#callbackhellcom)
1. [StrongLoop](#strongloop)
1. [RisingStack](#risingstack)
1. [Q Library](#qlibrary)

--------------------------
### CallbackHell.com
> **CREDIT:** http://callbackhell.com/
![CallbackHell.com](../callbackhell.webp)

----------------------
### StrongLoop
> **CREDIT:** `https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`
![strong loop](../strongloop.webp)

----------------
### RisingStack
> **CREDIT:** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
Questo è un articolo piuttosto solido. Ho solo una preoccupazione:

![Rising Stack](../risingstack.webp)

------------------------
### Q Library
> **CREDIT:** https://github.com/kriskowal/q

La libreria Q è una delle più usate e più vecchie ad essere associata a “Promises”. Perciò soffre di esempi datati e della necessità di mantenere la retro‑compatibilità.  
**Dico “associata a ‘Promises’” perché ritengo che Q sia davvero incentrata sul pattern `deferred`.**

Può somigliare a Promises, ma insisto: non lo è. Ha una superficie di API troppo ampia per tutti i motivi sbagliati. Inoltre la convenzione di denominazione abbrevia in modo incoerente i nomi, rendendo più difficile memorizzare l’interfaccia. Metodi come `when` e `done` non sono necessari.

Bottom line: il pattern `deferred` è un anti‑pattern doloroso – non migliora praticamente nulla rispetto al consueto approccio basato sui callback.

![q first example](../qlibrary-1.webp)

![q xmlHTTP deferred anti-pattern](../qlibrary-2.webp)

> Dai un'occhiata (e metti una stella) al progetto Github che accompagna questo articolo, [Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)

> Obiettivo del progetto: ricercare e sviluppare pattern funzionali più adeguati per JavaScript.
````
