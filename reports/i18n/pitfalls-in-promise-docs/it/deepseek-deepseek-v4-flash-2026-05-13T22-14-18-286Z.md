# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: it
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/it/index.mdx
- Validation: deferred
- Runtime seconds: 11.67
- Input tokens: 2192
- Output tokens: 2196
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.000869
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Insidie nella documentazione delle Promise
subTitle: Evitare problemi dalle documentazioni più comuni
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
> Riconoscere gli anti-pattern delle Promise nei risultati di Google e nelle librerie più diffuse.

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

Iniziamo con una confessione: anche io sono colpevole di aver scritto gli stessi "anti-pattern" che critico qui sotto, come immagino molti sviluppatori JS. Nulla di quanto esposto vuole essere personale o rivolto direttamente agli autori originali. Sto solo facendo una code review su pattern comuni – spero di trasmettere la comprensione delle mie priorità e dei processi di pensiero critico.

> Spero che dopo aver assimilato questo progetto riuscirai a riconoscere i segnali d'allarme di Promise mal scritte.

1. [CallbackHell.com](#callbackhellcom)
1. [StrongLoop](#strongloop)
1. [RisingStack](#risingstack)
1. [Libreria Q](#qlibrary)

--------------------------
### CallbackHell.com
> **CREDITO:** http://callbackhell.com/
![CallbackHell.com](../callbackhell.webp)

----------------------
### StrongLoop
> **CREDITO:** `https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`
![strong loop](../strongloop.webp)

----------------
### RisingStack
> **CREDITO:** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
Articolo piuttosto solido. Ho solo una perplessità:

![Rising Stack](../risingstack.webp)

------------------------
### Libreria Q
> **CREDITO:** https://github.com/kriskowal/q

La libreria Q è una delle più utilizzate e antiche associate alle "Promise". Di conseguenza soffre di esempi invecchiati e della necessità di mantenere la compatibilità all'indietro.
**Dico "associata alle 'Promise'" perché ritengo che Q riguardi principalmente il pattern `deferred`.**

Può assomigliare alle Promise, ma insisto che non lo è. Ha una superficie d'attacco troppo ampia per tutte le ragioni sbagliate. Inoltre la convenzione di denominazione abbrevia i nomi in modo incoerente, rendendo più difficile memorizzare l'interfaccia. Metodi come `when` e `done` non sono necessari.

In conclusione: il pattern `deferred` è un anti-pattern doloroso – non migliora praticamente nulla rispetto al tipico approccio con callback.

![q primo esempio](../qlibrary-1.webp)

![q xmlHTTP deferred anti-pattern](../qlibrary-2.webp)

> Dai un'occhiata (e metti una stella) al progetto Github associato a questo articolo, [Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)

> Obiettivo del progetto: ricercare e sviluppare pattern di linguaggio funzionale migliori in JavaScript.
````
