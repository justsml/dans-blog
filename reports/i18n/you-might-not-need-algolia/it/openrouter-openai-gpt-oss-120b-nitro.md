# Translation Candidate
- Slug: you-might-not-need-algolia
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-03-01--you-might-not-need-algolia/it/index.mdx
- Validation: deferred
- Runtime seconds: 2.77
- Input tokens: 5980
- Output tokens: 1695
- Thinking tokens: unknown
- Cached input tokens: 2944
- Cache write tokens: 0
- Estimated cost: $0.000538
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Forse non ti serve Algolia™
social_image: ../desktop-social.webp
subTitle: I siti statici probabilmente non hanno bisogno di ricerca ospitata
tags:
  - search
  - algolia
  - pagefind
  - cdn
date: '2025-03-01'
modified: '2025-03-05'
category: Search
cover_full_width: ../synth-wave-city-wide.webp
cover_mobile: ../synth-wave-city-200-square.webp
cover_icon: ../synth-wave-city-200-square.webp
cover_credit: Image by Dan Levy
---
La maggior parte delle decisioni sulla ricerca nei siti avviene troppo tardi.

Quando qualcuno dice “dovremmo usare Algolia”, il team ha di solito già saltato la domanda utile: che tipo di contenuto stiamo cercando?

Se la risposta è “pagine HTML che già costruiamo”, <a href="https://pagefind.app/">Pagefind</a> dovrebbe essere la prima cosa da provare. Non perché Algolia sia cattiva. Algolia è molto efficace su una serie di problemi complessi. Ma se il tuo indice di ricerca cambia quando il sito viene distribuito, un servizio di ricerca ospitato può diventare un cosplay di infrastruttura.

<p class="inset">Usa Pagefind quando il contenuto ricercabile è generato al momento della build. Rivolgiti ad Algolia quando la ricerca deve accettare scritture in tempo reale, regole di business, ranking specifico per utente o garanzie operative che la tua build statica non può fornire.</p>

Questa regola copre più siti di quanto la gente si aspetti: blog, documentazione, siti di marketing, manuali interni, guide di prodotto, cataloghi di corsi e un numero sorprendente di “app” che pubblicano principalmente pagine.

## The Shape Of The Problem

Algolia ti fornisce un sistema di ricerca esterno. Crei dei record, li inserisci in un indice, configuri il ranking, integri un’interfaccia UI e mantieni il tutto sincronizzato con la tua fonte di verità.

Pagefind osserva l’HTML che hai già distribuito e costruisce un indice di ricerca statico accanto ad esso.

Questa distinzione sembra noiosa finché non devi gestire l’integrazione.

Con Algolia, il tuo sito ha una seconda copia dei contenuti. Ora devi rispondere a domande come:

- Il deploy è terminato ma l’aggiornamento dell’indice è fallito?
- Quali campi sono canonici: quelli del CMS, la pagina renderizzata o il record di ricerca?
- Chi è responsabile delle modifiche al ranking quando non corrispondono più alla pagina?
- Cosa succede quando il piano gratuito si rivela insufficiente per il reale volume di traffico?

Talvolta queste domande valgono la pena. Per un marketplace, un portale di supporto o un ampio catalogo e‑commerce, probabilmente sì. Per un sito di documentazione statico, spesso rappresentano una complessità auto‑indotta.

## Pagefind funziona perché rifiuta il sistema extra

Il trucco di Pagefind non è magia. È gusto.

Aspetta che le tue pagine esistano, indicizza l'HTML finito e scrive una collezione di asset statici che puoi collocare sullo stesso CDN del resto del sito. Il browser scarica solo i chunk di cui ha bisogno. Non c’è alcun server di ricerca da tenere acceso, nessuna quota di crawler da monitorare e nessun pipeline webhook che debba ricordare cosa è cambiato.

Questo rende la modalità di errore molto più semplice da comprendere:

- Se la pagina è stata distribuita, il contenuto indicizzato proviene da quella pagina.
- Se la pagina non è stata distribuita, gli utenti non possono vederla comunque.
- Se la ricerca è errata, il problema di solito risiede nel markup renderizzato o nella configurazione di Pagefind, non in un lavoro di sincronizzazione remoto.

Ecco perché lo preferisco per i siti di contenuto. L’indice segue l’artifact.

## Come appare realmente l'installazione

Per un sito statico semplice, il flusso di lavoro è piacevolmente monotono:

- **CLI**: Scansiona i file HTML del sito, genera un indice e lo distribuisce su un CDN globale—tutto in pochi minuti.
- **Static Site Generators**: Usa i plugin di PageFind per Astro o Hugo per automatizzare il processo di indicizzazione.
- **Soluzioni personalizzate**: Sfrutta l’API di PageFind per costruire esperienze di ricerca su misura che soddisfino i tuoi requisiti unici.

<figure>
  <figcaption>Indicizzazione del mio sito con la CLI di PageFind</figcaption>
  ![Indicizzazione del mio sito con PageFind](../PageFind-Cleaner-better-15fps-720p2.webp "Indicizzazione del mio sito con PageFind")
</figure>

La guida [Getting Started](https://pagefind.app/docs/) è sufficiente per partire. Il vero test è operativo: riesci a ricostruire l’indice in CI, distribuire l’output e spiegare ogni mancata corrispondenza di ricerca ispezionando l’HTML renderizzato?

## Dove Algolia è ancora vincente

Pagefind non è una piccola Algolia mascherata da trench coat. È una risposta diversa.

Usa Algolia, OpenSearch, la ricerca di Postgres o un altro sistema live quando il tuo indice di ricerca deve cambiare indipendentemente da un deploy del sito.

Ciò include:

- conteggi di inventario che variano ogni pochi minuti
- permessi per utente o risultati privati
- ranking personalizzato basato su fatturato, freschezza, popolarità o esperimenti
- ricerca federata tra sistemi che non si rendono in un unico sito statico
- supporto analitico e operativo che un’azienda si aspetta da un fornitore gestito

Sono esigenze reali. Fingere che Pagefind le gestisca solo perché è veloce sarebbe l’altro tipo di voce da blog di vendor.

## La decisione che utilizzo

Fai prima una domanda:

> È possibile ricostruire l’indice di ricerca dallo stesso output statico che gli utenti stanno visualizzando?

Se la risposta è sì, parti con Pagefind. Ottieni una ricerca privata per impostazione predefinita, asset ottimizzati per la CDN e un servizio in meno da gestire.

Se la risposta è no, individua ciò che rende l’indice “live”: inventario, permessi, personalizzazione, analisi, ranking o frequenza di scrittura. Quindi scegli il database o il servizio di ricerca che gestisce esplicitamente quel compito.

Algolia non è il cattivo della storia. Il vero problema è introdurre un secondo sistema prima di aver dimostrato che il primo artefatto non fosse sufficiente.
````
