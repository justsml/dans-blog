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
title: Trappole comuni nella documentazione delle Promise
subTitle: Evitare problemi provenienti da documentazione popolare
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
> Riconoscere gli anti-pattern delle Promise nei risultati di ricerca Google e nelle librerie popolari.  

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)  

Inizio con una confessione: sono colpevole di aver scritto gli stessi "anti-pattern" che criticizzo qui sotto, come probabilmente molti sviluppatori JS. Nulla di ciò che ho esposto è personale né rivolto agli autori originali. Sto semplicemente effettuando una revisione di codice su pattern comuni: spero di condividere una comprensione delle mie priorità e del mio processo di pensiero critico.  

> Spero che, dopo aver compreso questo progetto, sarete in grado di riconoscere i segnali di avvertimento delle cattive Promises.  

1. [CallbackHell.com](#callbackhellcom)  
1. [StrongLoop](#strongloop)  
1. [RisingStack](#risingstack)  
1. [Q Library](#qlibrary)  

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
Questo è un articolo abbastanza solido. Ho un'unica preoccupazione:  

![Rising Stack](../risingstack.webp)  

------------------------  
### Q Library  
> **CREDITO:** https://github.com/kriskowal/q

La libreria Q è una delle più utilizzate e antiche ad essere associata alle "Promises". Per questo motivo soffre di esempi datati e della necessità di mantenere la compatibilità con le versioni precedenti.  
**Dico "associata alle 'Promises'" perché credo che Q in realtà riguardi il pattern `deferred`.**  

Può assomigliare alle Promises, tuttavia insisto nel dire che non lo è. Ha una superficie troppo estesa per tutti i motivi sbagliati. Inoltre la convenzione di denominazione abbrevia i nomi in modo inconsistente, rendendo più difficile memorizzare l'interfaccia. Metodi come `when` e `done` non sono necessari.  

Conclusione: il pattern `deferred` è un anti-pattern doloroso - migliora virtualmente nulla rispetto all'approccio tipico delle callback.  

![primo esempio di Q](qlibrary-1.webp)  

![anti-pattern deferred XMLHTTP di Q](qlibrary-2.webp)  

> Per favore, visita (& stella) il progetto GitHub collegato a questo articolo, [Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)  

> Obiettivo del progetto: ricerca e sviluppo di pattern linguistici funzionali migliori in JavaScript.
````
