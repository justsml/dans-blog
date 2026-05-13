# Translation Candidate
- Slug: one-weird-trick-to-speed-up-feature-teams
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 20.93
- Input tokens: 7357
- Output tokens: 7974
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002502
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/it/index.mdx reports/i18n/one-weird-trick-to-speed-up-feature-teams/it
## Raw Output

````mdx
---
title: ''
subTitle: Gli ingegneri senior odiano questo!
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
<summary>Indice</summary>

- [Pensare in termini di chiavi](#pensare-in-termini-di-chiavi)
  - [Progettare con le chiavi](#progettare-con-le-chiavi)
  - [KVs come grafi e alberi?](#kvs-come-grafi--alberi)
  - [Quando utilizzare i pattern KV](#quando-utilizzare-i-pattern-kv)
  - [Quando evitare i pattern KV](#quando-evitare-i-pattern-kv)
  - [Quando hai bisogno di più di un KV](#quando-hai-bisogno-di-più-di-un-kv)
- [Prossimi passi](#prossimi-passi)
  - [Fact Service - Progetto di riferimento](#fact-service---progetto-di-riferimento)
- [Conclusione](#conclusione)
  - [Ulteriori letture](#ulteriori-letture)

</details>

Nel progettare un nuovo sistema o funzionalità, è facile perdersi nella progettazione dello schema. In questo articolo condividerò un trucco semplice che ha dato grandi risultati nella mia carriera.

<section class="breakout">
  _Prova_ la persistenza dati più semplice possibile quando progetti un nuovo sistema o funzionalità.
</section>

Troppo spesso vedo team che si affidano esclusivamente a SQL o MongoDB per lo storage dei dati. Certo, nessuno ti licenzia per aver scelto SQL. Ma che ne dici se ti dicessi che esiste un modo più semplice, veloce e economico per iniziare?

Un archivio a coppie chiave-valore (KV) potrebbe essere tutto ciò di cui hai bisogno. Qualcosa come Redis o S3.

Non è sempre la scelta giusta, ma forse **più spesso di quanto tu non immagini.**  

Un livello di archiviazione semplice può accelerare moderatamente lo sviluppo iniziale riutilizzando il codice del livello dati e evitando costi legati al cambiamento dello schema e alle migrazioni. Il cambiamento avverrà comunque; lascia che il codice lo gestisca il più a lungo possibile. È meglio evitare di dover gestire modifiche in due punti diversi.  

Le migliorie delle prestazioni sono probabili poiché le ricerche per `chiave` sono fortemente ottimizzate, e gli aggiornamenti possono trarre vantaggio dagli aggiornamenti batch.  

{/* Evita i pattern KV se hai bisogno di JOIN o di interrogare per proprietà nel tuo dataset. O nei casi in cui hai dataset illimitati/che crescono infinitamente. (`Logs`, `Signups`, ecc.) */}  

## Pensare in termini di chiavi  

Può sembrare strano progettare con un pattern a chiave-valore per primo, soprattutto se sei abituato a progettare sistemi con gerarchie di oggetti o Diagrammi Entità-Relazione e a implementarli direttamente in SQL.

Hai probabilmente ***usato*** pattern a chiave-valore prima! Sono ovunque, da configurazioni e URL all'Object Storage nello stile S3! Ogni volta che gestisci dati tramite un valore `ID` unico, indovina un po'? Un altro pattern a chiave-valore! (Anche se non necessariamente un archivio a chiave-valore.)

### Progettare con le chiavi

Quasi tutti i dati _possono_ essere rappresentati utilizzando pattern a chiave-valore. (In effetti, molti database di alto livello si basano su pattern a chiave-valore di basso livello.) Vediamo alcuni esempi:

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

Hai notato che l'`ID` è spesso una chiave in sé stessa? Questo è un pattern comune negli archivi a chiave-valore. La chiave è spesso composta dal tipo di entità e dall'identificatore unico. (es. `user/123`, `user:456`)

### KV come Grafi & Alberi?

Può essere utile rappresentare strutture dati complesse come Grafi o Alberi utilizzando pattern a chiave-valore. (Ancora una volta, gli URL REST sono un ottimo esempio di questo.)

La gerarchia delle chiavi (`user/420` -> `user/420/friends`) codifica in modo naturale una relazione a grafo tra l'`user` e i suoi `friends`.

Questa è una soluzione veloce e poco costosa per serializzare strutture dati a grafo. Specialmente se non hai bisogno della complessità di un database a grafo (come Neo4j).

<figure>
![Grafo di user/123](../KVsCanBeGraphs.webp)
<figcaption>Grafo di user/123</figcaption>
</figure>

### Quando utilizzare i pattern KV

- Quando hai bisogno di una scala estremamente ampia. (Miliardi o addirittura trilioni di coppie chiave-valore.)
- Quando accedi principalmente ai dati tramite una chiave unica.
- Quando hai bisogno di strutture dati semplici.
- Quando gestisci dati con una struttura gerarchica, a grafo o ad albero.

### Quando evitare i pattern KV

Non archiviare cose come commenti di blog in una singola coppia KV. Ad esempio, `post/666 -> {comments: [...troppi...]}`. In alternativa potresti usare `post/666/comments/1`, o `post/666/comments/<UUID>`, ecc. Oppure opta per una tabella SQL.

- Quando devi cercare per proprietà (non per Key o ID) nel tuo dataset.
- Quando devi effettuare JOIN su dati di entità multiple.
- Quando devi imporre vincoli o relazioni complessi.

### Quando hai bisogno di più di un KV

Man mano che i requisiti del progetto evolvono naturalmente, potresti aver bisogno di fare di più di quanto supporta il tuo KV store. A questo punto dovrai valutare di migrare verso un sistema di archiviazione dati più complesso.

{/* La buona notizia è che puoi spesso iniziare con un pattern KV e evolverlo in un sistema più complesso man mano che necessario. S3 ha funzionalità al di là dello storage base, da Athena per la ricerca nei file, Glacier, e le politiche Expire c'è molto che puoi fare. Inoltre, Redis ha aggiunto molte funzionalità di alto livello (come Pub/Sub, Geo-spatial, Streams, e Sorted Sets) che possono aiutarti a soddisfare alcuni requisiti. */}

La buona notizia è che migrare un singolo KV store verso SQL è relativamente più semplice che migrare uno schema SQL complesso verso un KV store. (Con tabelle multiple, indici, vincoli, ecc.) L'ho fatto molte volte con uno script di 50 linee.

Dall'esperienza, ho notato che la qualità dei progetti SQL è superiore se si inizia con un pattern KV. Ti costringe a pensare davvero in modo diverso ai dati e a comprendere esattamente cosa ti serve da SQL.  

## Prossimi Passi  

Il miglior modo per imparare è provarlo! Se sei interessato a esplorare questo pattern, ti consiglio di **costruire qualcosa** con Redis, DynamoDB o S3.  
Tutti e tre sono eccellenti KV store con diversi compromessi.  

### Fact Service - Progetto di Riferimento  

Guarda il mio Open Source ["Fact Service," un progetto di riferimento su GitHub](https://github.com/justsml/fact-service).  
È un'API RESTful autonoma che implementa un servizio di dati KV.

Include molti [adattatori di dati](https://github.com/justsml/fact-service/tree/main/lib/providers).  
Tra questi, adattatori per Postgres, Redis, DynamoDB, Firestore e Cassandra! (Completo di [comandi Docker](https://github.com/justsml/fact-service/tree/main/lib/providers) per iniziare rapidamente.)  

Fact Service è destinato ad essere un progetto iniziale e per l'apprendimento, forka il repository e costruisci il tuo servizio di dati KV!  

## Conclusione  

Spero che ti sia stato utile questo articolo! Se hai domande o feedback, non esitare a commentare o a `@` me su [Twitter](https://x.com/justsml).  

### Crediti  

- [Modellare dati gerarchici in PostgreSQL](https://leonardqmarcq.com/posts/modeling-hierarchical-tree-data)  
- [Consigli e sconsigli per memorizzare alberi grandi in PostgreSQL](https://leonardqmarcq.com/posts/dos-and-donts-of-modeling-hierarchical-trees-in-postgres)

### Per saperne di più  

- [Fact Service](https://github.com/justsml/fact-service)  
- [Postgres](https://www.postgresql.org/)  
- [Redis](https://redis.io/)  
- [DynamoDB](https://aws.amazon.com/dynamodb/)  
- [S3](https://aws.amazon.com/s3/)  
- [Cassandra](https://cassandra.apache.org/)  
- [Firestore](https://firebase.google.com/docs/firestore)
````
