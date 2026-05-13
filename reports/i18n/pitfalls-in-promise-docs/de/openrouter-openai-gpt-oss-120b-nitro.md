# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/de/index.mdx
- Validation: passed
- Runtime seconds: 5.44
- Input tokens: 2997
- Output tokens: 851
- Thinking tokens: unknown
- Cached input tokens: 576
- Cache write tokens: 0
- Estimated cost: $0.000270
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Fallstricke in Promise‑Dokumentation
subTitle: Vermeidung von Problemen mit gängigen Dokumentationen
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
> Spotting Promise Anti-Patterns in google search results, and popular libraries.

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

Ich fange mit einem Geständnis an: Ich habe dieselben „Anti‑Patterns“ geschrieben, die ich unten kritisiere, und das tun vermutlich viele JS‑Entwickler ebenfalls. Nichts, was ich hier darstelle, ist persönlich gemeint oder richtet sich gegen die ursprünglichen Autoren. Ich führe lediglich einen Code‑Review gängiger Muster durch – ich hoffe, damit meine Prioritäten und mein kritisches Denkverfahren zu vermitteln.

> Hoffentlich können Sie nach dem Durcharbeiten dieses Projekts die Warnsignale schlechter Promises erkennen.

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
Das ist ein ziemlich solides Stück. Ich habe nur eine Anmerkung:

![Rising Stack](../risingstack.webp)

------------------------
### Q Library
> **CREDIT:** https://github.com/kriskowal/q

Die Q‑Bibliothek ist eine der am häufigsten genutzten und ältesten, die mit „Promises“ in Verbindung gebracht wird. Deshalb leidet sie unter veralteten Beispielen und dem Zwang, Rückwärtskompatibilität zu erhalten.  
**Ich sage „mit ‚Promises‘ in Verbindung gebracht“, weil ich das Gefühl habe, Q dreht sich eigentlich um das `deferred`‑Muster.**

Sie mag Promises ähneln, aber ich behaupte, sie ist es nicht. Sie hat aus völlig falschen Gründen eine viel zu große Oberfläche. Außerdem ist die Namenskonvention inkonsistent abgekürzt, was das Einprägen der API erschwert. Methoden wie `when` und `done` sind überflüssig.

Bottom line: Das `deferred`‑Muster ist ein schmerzhaftes Anti‑Pattern – es liefert praktisch keinen Mehrwert gegenüber dem üblichen Callback‑Ansatz.

![q first example](../qlibrary-1.webp)

![q xmlHTTP deferred anti-pattern](../qlibrary-2.webp)

> Bitte schauen Sie sich das Begleit‑Github‑Projekt zu diesem Artikel an (und geben Sie ihm ein Sternchen): [Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)

> Projektziel: Forschung & Entwicklung besserer funktionaler Sprachmuster in JavaScript.
````
