# Translation Candidate
- Slug: one-weird-trick-to-speed-up-feature-teams
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/it/index.mdx
- Validation: deferred
- Runtime seconds: 2.70
- Input tokens: 8756
- Output tokens: 2577
- Thinking tokens: unknown
- Cached input tokens: 4608
- Cache write tokens: 0
- Estimated cost: $0.000805
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Un trucco strano per velocizzare i team di funzionalità!
subTitle: Gli ingegneri senior lo odiano!
date: '2024-09-29'
modified: '2024-09-30'
tags:
  - agile
  - teams
category: Engineering
social_image: ../desktop-social.webp
cover_full_width: ../wide_danny-howe-98KlbUsOO_w-unsplash.webp
cover_mobile: ../danny-howe-98KlbUsOO_w-unsplash__w200.webp
cover_icon: ../danny-howe-98KlbUsOO_w-unsplash__w200.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@dannyhowe?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Danny
  Howe</a> on <a
  href="https://unsplash.com/photos/red-and-white-neon-light-signage-98KlbUsOO_w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
---
{/* Add html5 toggle element */}

<details>
<summary>Table of Contents</summary>

- [Thinking in Keys](#thinking-in-keys)
  - [Designing with Keys](#designing-with-keys)
  - [KVs as Graphs & Trees?](#kvs-as-graphs--trees)
  - [When to Use KV Patterns](#when-to-use-kv-patterns)
  - [When to Avoid KV Patterns](#when-to-avoid-kv-patterns)
  - [When you need more than KV](#when-you-need-more-than-kv)
- [Next Steps](#next-steps)
  - [Fact Service - Reference Project](#fact-service---reference-project)
- [Conclusion](#conclusion)
  - [Further Reading](#further-reading)

</details>

When designing a new system or feature, it's easy to get bogged down on schema design. In this article I will share a neat trick that has paid dividends over my career.

<section class="breakout">
  _Try_ the simplest possible data persistence when designing a new system or feature.
</section>

All too often, I see teams reach for SQL or MongoDB as their only choice for data storage. Sure, no one's getting fired for choosing SQL. But what if I told you there's a simpler, faster, and cheaper way to start?

A KV or Key-value store might be all you need. Something like Redis or S3.

Non è sempre la scelta giusta, ma forse **più spesso di quanto credi**.

Uno strato di archiviazione semplice può accelerare moderatamente lo *sviluppo iniziale* riutilizzando il codice del livello dati ed evitando i costi legati al churn nella progettazione dello schema e alle migrazioni. Il churn avverrà comunque; lascia che il codice se ne occupi il più a lungo possibile. È meglio evitare di gestire le modifiche in due posti.

I guadagni di prestazioni sono probabili poiché le ricerche per `key` sono altamente ottimizzate, e le scritture possono beneficiare di aggiornamenti batch.

{/* Evita i pattern KV se hai bisogno di JOIN o di interrogare per proprietà nel tuo dataset. O nei casi in cui hai dataset non limitati/infinitamente crescenti. (`Logs`, `Signups`, ecc.) */}

## Pensare in Chiavi

Può risultare strano progettare prima con un pattern Key‑Value, soprattutto se sei abituato a progettare sistemi con gerarchie di oggetti o Diagrammi Entità‑Relazione e a implementarli direttamente in SQL.

Probabilmente hai già ***usato*** pattern key‑value! Sono dappertutto, dalle configurazioni e URL allo storage di oggetti in stile S3! Ogni volta che gestisci dati tramite un valore `ID` unico, indovina un po'? Un altro pattern Key‑value! (Anche se non è necessariamente un KV Store.)

### Progettare con le Chiavi

Praticamente tutti i dati _possono_ essere rappresentati usando pattern KV. (Infatti, molti DB di livello superiore si basano su pattern KV di livello inferiore.) Diamo un’occhiata ad alcuni esempi:

```markdown
user/123          {id: 123, ...}
user/123/block    ['user/456', 'user/789']
user/123/groups   ['admin', 'staff']
user/420/friends  ['user/456', 'user/789']

group/admin       {user: '*:rw'}
group/default     {user: '*:r'}

product/42/discount/<UUID>	{percentOff: '10%'}
product/42/discount/<UUID>	{percentOff: '20%', minTotal: 100.0}
```

Avrai notato che l'`ID` è spesso una chiave di per sé! Questo è un pattern comune nei KV store. La chiave è spesso un composito del tipo di entità e dell'identificatore unico (es. `user/123`, `user:456`).

### KV come Grafi e Alberi?

Può risultare utile rappresentare strutture dati complesse, come grafi o alberi, usando pattern KV. (Ancora, gli URL REST sono un ottimo esempio di questo.)

La gerarchia di chiavi (`user/420` → `user/420/friends`) codifica naturalmente una relazione di grafo tra l'`utente` e i suoi `amici`.

È un modo rapido ed economico per serializzare strutture dati a grafo, soprattutto se non serve la complessità di un database di grafi (come Neo4j).

<figure>
![Grafico di user/123](../KVsCanBeGraphs.webp)
<figcaption>Grafico di user/123</figcaption>
</figure>

### Quando usare i pattern KV

- Quando serve una scala massiccia (miliardi o addirittura trilioni di coppie KV).
- Quando l'accesso principale avviene tramite una chiave unica.
- Quando servono strutture dati semplici.
- Quando i dati hanno una gerarchia, un grafo o una struttura ad albero.

### Quando evitare i pattern KV

Non memorizzarecose come i commenti di un blog in un _**singolo**_ KV pair. Per esempio, `post/666 -> {comments: [...troppi...]}`. È preferibile usare `post/666/comments/1`, o `post/666/comments/<UUID>`, ecc. Oppure ricorrere a una tabella SQL.

- Quando è necessario cercare per proprietà (non per chiave o ID) nel dataset.
- Quando è necessario eseguire JOIN tra più entità.
- Quando è necessario imporre vincoli o relazioni complesse.

### Quando serve più di un KV

Man mano che i requisiti del progetto evolvono naturalmente, potresti aver bisogno di fare più di quanto il tuo KV store supporti. A questo punto dovrai valutare la migrazione verso un data store più complesso.

{/* La buona notizia è che spesso puoi partire con un pattern KV e farlo evolvere in un sistema più complesso secondo necessità. S3 offre funzionalità oltre il semplice storage, da Athena per la ricerca di file, Glacier e le politiche di scadenza: c’è molto che puoi fare con esso. Inoltre, Redis ha aggiunto molte funzionalità di alto livello (come Pub/Sub, Geo-spaziale, Streams e Sorted Sets) che possono aiutarti a soddisfare alcuni requisiti. */}

La buona notizia è che migrare un singolo KV store verso SQL è relativamente più semplice rispetto a migrare uno schema SQL complesso in un KV store (con più tabelle, indici, vincoli, ecc.). L’ho fatto molte volte con uno script di 50 righe.

Anecdoticamente, ho riscontrato che la qualità dei progetti SQL è più alta se si parte prima da un pattern KV. Questo costringe a ragionare sui dati in modo diverso e a comprendere _esattamente_ ciò di cui si ha realmente bisogno da SQL.

## Prossimi passi

Il modo migliore per imparare è provarlo sul campo! Se sei interessato a esplorare più a fondo questo pattern, ti consiglio di **costruire qualcosa** con Redis, DynamoDB o S3.  
Tutti sono ottimi store KV con trade‑off differenti.

### Fact Service – Progetto di riferimento

Dai un’occhiata al mio progetto Open Source ["Fact Service", un progetto di riferimento su GitHub](https://github.com/justsml/fact-service).

È un'API RESTful autonoma che implementa un servizio dati KV.

Presenta numerosi [adapter di dati](https://github.com/justsml/fact-service/tree/main/lib/providers), inclusi per Postgres, Redis, DynamoDB, Firestore e Cassandra! (Completi di [comandi Docker](https://github.com/justsml/fact-service/tree/main/lib/providers) per avviare rapidamente.)

Fact Service è pensato come progetto di avvio e di apprendimento: forkalo e costruisci il tuo servizio dati KV!

## Conclusione

Spero che questo articolo ti sia stato utile! Se hai domande o commenti, sentiti libero di scrivere o di `@`‑mi su [Twitter](https://x.com/justsml).

### Crediti

- [Modellare dati ad albero gerarchico in PostgreSQL](https://leonardqmarcq.com/posts/modeling-hierarchical-tree-data)
- [Cosa fare e cosa non fare quando si memorizzano grandi alberi in PostgreSQL](https://leonardqmarcq.com/posts/dos-and-donts-of-modeling-hierarchical-trees-in-postgres)

###Approfondimenti

- [Fact Service](https://github.com/justsml/fact-service)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [S3](https://aws.amazon.com/s3/)
- [Cassandra](https://cassandra.apache.org/)
- [Firestore](https://firebase.google.com/docs/firestore)
````
