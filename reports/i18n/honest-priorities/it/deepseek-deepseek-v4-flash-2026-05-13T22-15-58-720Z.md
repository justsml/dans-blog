# Translation Candidate
- Slug: honest-priorities
- Locale: it
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-10-23--honest-priorities/it/index.mdx
- Validation: deferred
- Runtime seconds: 22.27
- Input tokens: 5697
- Output tokens: 3824
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.001763
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: La trappola delle priorità
subTitle: La scelta multipla è la scelta migliore?
category: Thoughts
subCategory: Agile
date: '2024-10-23'
modified: '2024-10-24'
tags:
  - agile
  - leadership
  - priority
  - backlog
  - jira
cover: ../new-priority-city.webp
cover_full_width: ../new-priority-city.webp
cover_mobile: ../new-priority-city-w300.webp
cover_icon: ../new-priority-city-w200.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@mroz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Filip
  Mroz</a> on <a
  href="https://unsplash.com/photos/photo-of-tram-beside-waiting-station-during-nighttime-023T4jyCRqA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
---
## La Trappola del Menu a Tendina `Priority`

<aside className="breakout">
💡 Man mano che un'organizzazione cresce, inevitabilmente il backlog si gonfia. A un certo punto, la dimensione della lista *richiederà* una prioritizzazione.
</aside>

## Una Storia di Startup

Senza fallo, i vostri amministratori Jira avranno una soluzione: ecco a voi un menu a tendina per il campo `Priority`! (Consiglio da pro per sviluppatori enterprise: potrebbe chiamarsi `Priority2` o `P-level`.)

Curiosamente, il 100% delle aziende sceglie tra `P1, P2, P3, P4` o `Bassa, Media, Alta e Critica` — a quanto pare non esistono altre opzioni.

Un elenco fisso di quattro opzioni? Ok. Proviamolo per qualche settimana...

### 2 Giorni Dopo

In una svolta *che non sorprende nessuno*, l'organizzazione ha scoperto un ticket con una priorità nuova, ancora più alta, che ha richiesto un piccolo hack: aggiungere `P0`, o `Critical Max+`!

### 3 Giorni Ancora

*Il nostro intrepido capo ha avuto riunioni e scoperte entusiasmanti alla conferenza!*

In qualche modo hanno scoperto una priorità ancora più alta di `P0`!

Da allora, il team è stato a capofitto a ricercare come etichettare questa nuova Priorità.

Forse `-1`? No, no. È troppo confusionario (`P-1` vs `P1`). Ok, che ne dici di `P0.5`, no?

<p className="breakout">In un momento "ispirato", il team ha inventato una priorità più alta: il doppio zero!<br />Ora nota come priorità `P00`.</p>

{/* *Finally, we can neatly label everything in the world into our Priorities dropdown! (…evil laugh…)* */}

### Prima del Diluvio

Prima che qualcuno se ne accorga, il tuo team sta in qualche modo annegando in ticket `P00`!

<b>Come possiamo evitare questo stupido gioco di Teatro dell'Ingegneria?</b>

## E se la Priorità non fosse a Scelta Multipla?

Come potremmo rappresentare meglio un concetto umano in continua evoluzione e fluido come `Priority`?

- Nel mondo reale, le priorità cambiano e si evolvono costantemente in base a nuove informazioni, cambiamenti di mercato e obiettivi organizzativi.
- Spesso esiste un'interazione complessa tra urgenza, importanza, disponibilità di risorse e analisi costi/rischi che un semplice menu a discesa non può catturare, specialmente nel tempo. (Il degrado dei ticket.)
- Diversi stakeholder possono avere opinioni contrastanti su cosa costituisca una priorità alta, rendendo inadeguato un approccio unico per tutti.

## Quindi, cosa fare?

Esistono diversi approcci alternativi da esplorare, dal minimo al massimo sforzo:

- Per offrire più margine di manovra, scegli un valore di partenza "neutro", ad esempio 100 o 1.000. Puoi sempre aumentare o diminuire il numero.
    - Oppure parti da zero, dove numeri più alti indicano priorità più alta.
- Implementa un sistema di prioritizzazione multidimensionale che consideri fattori come valore di business, urgenza e sforzo richiesto. (Crea un punteggio `composito` per semplificare ordinamento e filtri.)
- Adotta un metodo di prioritizzazione dinamico, come la [tecnica MoSCoW](https://en.wikipedia.org/wiki/MoSCoW_method) (Must have, Should have, Could have, Won't have), che consenta una rivalutazione regolare. (Vedi anche il [Modello Kano](https://en.wikipedia.org/wiki/Kano_model).)

## Riepilogo

Si dà così tanto peso alla Priorità nonostante il suo rapido tasso di decadimento. I ticket `CRITICI` di ieri difficilmente saranno i ticket `CRITICI` del prossimo trimestre.

Col tempo, i ticket ad alta priorità più vecchi diventano resistenti alla pulizia e alla manutenzione. Dopotutto, chi vuole abbassare la `Priorità` di qualcosa una volta dichiarata ***essenziale***? Per non parlare dell'eliminazione di quei ticket irrilevanti… (Orrore! Pensa al backlog!)

Ho visto diverse aziende confondere `Gravità` e `Priorità`. La `Gravità` descrive l'***urgenza*** (o la sensibilità al tempo).

`Priorità ≠ Gravità`. Può avere senso definire 3-5 livelli di gravità (spesso usati per mantenere gli Accordi sul Livello di Servizio).

I livelli di urgenza aiutano a comunicare da `impatto zero sul cliente` a `interruzione parziale/completa del servizio`.

## Un avvertimento

Implementare un campo Priorità senza limiti richiede un po' di pianificazione e disciplina!

Se hai familiarità con lo sviluppo front-end, potresti aver vissuto una guerra di `z-index`.

In pratica, `z-index` permette ai designer di impostare *qualsiasi* intero positivo per garantire che i loro widget appaiano "sopra" altri contenuti con `z-index` inferiore.

Anche un aggiornamento minore di un componente potrebbe introdurre una modifica allo `z-index` del loro `<Dialog />`, rendendolo improvvisamente invisibile. Queste situazioni possono diventare caotiche quando i nostri componenti di terze parti, il lavoro sulle funzionalità e altri contributi del team cercano di superarsi a vicenda con lo `z-index`.

Un tempo `z-index` era limitato a circa 32.000. Tuttavia, di recente ho visto un frammento con un miliardo di `z-index: 1000000000`!

L'inflazione deve aver colpito duro lo `z-index`.

## Discussione

- È un esperimento mentale che vale la pena?
- L'idea di una Priorità in continua crescita è terrificante? Provoca ansia?
- È inevitabile che questo approccio superi prima o poi i limiti degli interi a 64 bit?
- Altri campi (oltre a `Gravità` o `Urgenza`) possono contribuire a questa conversazione?
- Quanta colpa merita Jira? O merito?

Potremmo urlare nel vuoto di internet: "Chi pulirà tutti questi ticket `P00`?"

Oppure, puoi diventare ***serio*** riguardo al tuo backlog.

- Accetta che il 90% dei tuoi 1.000 ticket non verrà mai fatto. Va bene così.
- Archivia i ticket che non sono stati toccati per mesi. Qualsiasi priorità/urgenza iniziale non è più applicabile. In ogni caso, i problemi archiviati possono spesso essere recuperati.
- Quando un problema riemerge, è ok; ha semplicemente aumentato la sua priorità.
- A livello aneddotico, ho notato zero danni dallo scartare ticket vecchi e incompleti.
- Aggiungere all'infinito a un backlog-come-database perde l'opportunità di focalizzare il tuo team e la tua organizzazione su ciò che conta. (Le cose davanti a noi. Mentre i backlog guardano intrinsecamente indietro.)
- Un backlog profondo finisce per assomigliare a una Bizzaro Trophy Room, che celebra la merda che non spedirai mai.
````
