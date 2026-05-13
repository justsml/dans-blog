# Translation Candidate
- Slug: honest-priorities
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-23--honest-priorities/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 3.58
- Input tokens: 7430
- Output tokens: 2012
- Thinking tokens: unknown
- Cached input tokens: 3968
- Cache write tokens: 0
- Estimated cost: $0.000652
- Pricing source: local-openrouter-estimate
- Note: Command failed: git commit --only -m i18n candidate(it): honest-priorities via openrouter/openai/gpt-oss-120b:nitro -- src/content/posts/2024-10-23--honest-priorities/it/index.mdx reports/i18n/honest-priorities/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: La trappola della priorità
subTitle: La sceltamultipla è la migliore?
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
## The `Priority` Dropdown Trap

<aside className="breakout">
💡 Man mano che un’organizzazione cresce, avrà inevitabilmente un backlog che si gonfia. Alla fine, la dimensione della lista *richiederà* una priorizzazione.
</aside>

## A Startup Story

Senza eccezioni, i tuoi amministratori di Jira avranno una soluzione: ecco un campo a discesa `Priority`! (Consiglio per gli sviluppatori enterprise: potrebbe chiamarsi `Priority2` o `P-level`.)

Curiosamente, il 100 % delle aziende sceglie tra `P1, P2, P3, P4` o `Low, Med, High, and Critical` — a quanto pare non esistono altre opzioni.

Una lista hard‑coded di quattro voci? Va bene. Proviamola per qualche settimana...

### 2 giorni dopo

In un *evento sorprendente a nessuno* l'organizzazione ha scoperto un ticket con una priorità più alta, costringendo a un piccolo trucco: aggiungere `P0`, o `Critical Max+`!

### 3 giorni dopo

*Il nostro coraggioso capo ha avuto riunioni e scoperte entusiasmanti alla conferenza!*

In qualche modo hanno scoperto una priorità ancora più alta di `P0`!

Da allora, il team è rimasto concentrato a studiare come etichettare questa nuova Priorità.

Forse `-1`? No, no. È troppo confuso (`P-1` vs. `P1`). Ok, che ne dite di `P0.5`, no?

<p className="breakout">In un momento “ispirato”, il team ha inventato una priorità più alta: il doppio zero!<br />Ora conosciuta come la Priorità `P00`.</p>

{/* *Finalmente, possiamo etichettare ordinatamente tutto il mondo nel nostro menu a tendina Priorities! (…risata malvagia…)* */}

### Prima dell'Inondazione

Prima che qualcuno se ne accorga, il tuo team si ritrova a fare i conti con ticket `P00`!

<b>Come possiamo evitare questo stupido gioco di Teatro Ingegneristico?</b>

## Cosa succederebbe se la Priorità non fosse una scelta a risposta multipla?

Come potremmo rappresentare meglio un concetto umano in continua evoluzione e fluido come `Priority`?

- Nel mondo reale, le priorità cambiano costantemente e si evolvono in base a nuove informazioni, variazioni di mercato e obiettivi organizzativi.
- Spesso c’è un’interazione complessa tra urgenza, importanza, disponibilità di risorse e analisi costi/rischio che un semplice menu a tendina non riesce a catturare, soprattutto col tempo. (Rotazione dei ticket.)
- Diversi stakeholder possono avere opinioni contrastanti su cosa costituisca una priorità alta, rendendo inadatto un approccio “taglia unica”.

## E allora, cosa fare?

Esistono diversi approcci alternativi da esplorare, dal basso allo sforzo più elevato:

- Per offrire più margine di manovra, scegli un valore “neutro” di partenza, ad esempio 100 o 1 000. Puoi sempre aumentare o diminuire il numero.
    - Oppure parti da zero, dove i numeri più alti indicano priorità più alta.
- Implementa un sistema di priorizzazione multidimensionale che consideri fattori come valore di business, urgenza e sforzo richiesto. (Crea un punteggio `composite` per semplificare ordinamento e filtraggio.)
- Adotta un metodo di priorizzazione dinamico, come la [tecnica MoSCoW](https://en.wikipedia.org/wiki/MoSCoW_method) (Must have, Should have, Could have, Won't have), che consente una rivalutazione regolare. (Vedi anche il [Modello Kano](https://en.wikipedia.org/wiki/Kano_model).)

## Sommario

Si assegna troppa importanza alla **Priorità** nonostante il suo rapido decadimento. I ticket `CRITICAL` di ieri difficilmente saranno i ticket `CRITICAL` del prossimo trimestre.

Con il tempo, i ticket ad alta priorità più vecchi diventano difficili da eliminare o mantenere. Dopotutto, chi vuole abbassare la `Priority` di qualcosa dichiarato ***essenziale***? E dimenticare di cancellare quei ticket irrilevanti… (Accidenti! Pensate al backlog!)

Ho osservato diverse aziende confondere `Severity` e `Priority`. `Severity` descrive l'***urgenza*** (o la sensibilità al tempo).

`Priority ≠ Severity`. Ha senso definire 3‑5 livelli di severità (spesso usati per mantenere gli Service Level Agreement).

I livelli di urgenza aiutano a comunicare `zero impatto sul cliente` rispetto a un `parziale/completo blackout del servizio`.

## Una nota di cautela

Distribuire un campo **Priority** senza limiti richiede un po' di pianificazione e disciplina!

Se hai familiarità con lo sviluppo front‑end, potresti aver sperimentato una *z‑index war*.

In pratica, `z-index` consente ai designer di impostare *qualsiasi* intero positivo per garantire che i loro widget vengano visualizzati “sopra” altri contenuti con `z-index` più basso.

Anche un piccolo aggiornamento di un componente può introdurre una modifica al `z-index` del loro `<Dialog />`, rendendolo improvvisamente invisibile. Situazioni del genere possono diventare caotiche quando i componenti di terze parti, il lavoro sulle funzionalità e i contributi di altri team cercano di superare a vicenda il `z-index`.

Una volta il `z-index` era limitato a circa 32 000. Tuttavia, di recente ho visto uno snippet con un miliardo di `z-index: 1000000000`!

L’inflazione deve colpire duramente il `z-index`.

## Discuss

- È questo un esperimento mentale valido?
- L’idea di una Priorità in continuo aumento è spaventosa? Genera ansia?
- È inevitabile che questo approccio superi alla fine i limiti di un intero a 64 bit?
- Altri campi (oltre a `Severity` o `Urgency`) possono contribuire a questa discussione?
- Quanto merita di essere incolpato Jira? O, al contrario, quanto merita di essere lodato?

Potremmo urlare su internet: “Chi pulirà tutti questi ticket `P00`?”

Oppure, puoi essere ***realista*** riguardo al tuo backlog.

- Accetta che il 90 % dei tuoi 1 000 ticket non verrà mai completato. Va bene.
- Archivia i ticket che sono rimasti inattivi per mesi. Qualsiasi priorità/urgenza iniziale non è più pertinente. Comunque, i problemi archiviati possono spesso essere recuperati.
- Quando un problema ritorna, è normale; ha semplicemente aumentato la sua priorità.
- Anedoticamente, non ho riscontrato alcun danno nel eliminare ticket più vecchi e incompleti.
- Continuare ad aggiungere al backlog‑come‑database perde l’opportunità di concentrare il team e l’organizzazione su ciò che conta davvero. (Le cose che ci attendono. Mentre i backlog, per loro natura, guardano indietro.)
- Un backlog profondo finisce per diventare una Stanza dei Trofei Bizzarro, celebrando la merda che non spedirai mai.
````
