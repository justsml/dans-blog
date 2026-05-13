# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: it
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/it/index.mdx
- Validation: deferred
- Runtime seconds: 33.97
- Input tokens: 2272
- Output tokens: 7629
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.007970
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Trappole nella documentazione delle Promise
subTitle: Evitare problemi derivanti da documentazione diffusa
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
> Individuare gli anti-pattern delle Promise nei risultati di ricerca di Google e nelle librerie più popolari.

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

Parto con una confessione: sono colpevole di aver scritto gli stessi 'anti-pattern' che critico più avanti, e sono certo che molti sviluppatori JS siano nella stessa situazione. Nulla di quanto esposto ha intenti personali o è diretto contro gli autori originali. Sto semplicemente facendo una code review di pattern comuni: spero di trasmettere una comprensione delle mie priorità e dei miei processi di pensiero critico.

> Spero che, dopo aver compreso a fondo questo progetto, sarete in grado di individuare i segnali d'allarme delle Promise mal scritte.

1. [CallbackHell.com](#callbackhellcom)
1. [StrongLoop](#strongloop)
1. [RisingStack](#risingstack)
1. [Libreria Q](#qlibrary)

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
Si tratta di un articolo piuttosto solido. Ho un solo dubbio:

![Rising Stack](../risingstack.webp)

------------------------
### Libreria Q
> **CREDIT:** https://github.com/kriskowal/q

La libreria Q è tra le più utilizzate e le più antiche associate al concetto di "Promise". Di conseguenza, è appesantita da esempi datati e dalla necessità di mantenere la retrocompatibilità.
**Dico "associate alle 'Promise'" perché ritengo che Q riguardi essenzialmente il pattern `deferred`.**

Pur assomigliando alle Promise, insisto: non lo è. Offre una superficie API troppo ampia per motivi sbagliati. La convenzione di denominazione abbrevia i nomi in modo incoerente, rendendo difficile memorizzare l'interfaccia. Metodi come `when` e `done` sono superflui.

In sintesi: il pattern `deferred` è un anti-pattern problematico: non apporta miglioramenti significativi rispetto all'approccio tradizionale basato sui callback.

![q first example](../qlibrary-1.webp)

![q xmlHTTP deferred anti-pattern](../qlibrary-2.webp)

> Dai un'occhiata (e metti una stella) al progetto GitHub companion di questo articolo, [Fuga dalla Montagna dei Callback](https://github.com/justsml/escape-from-callback-mountain)

> Obiettivo del progetto: analizzare e sviluppare pattern funzionali più solidi in JavaScript.
````
