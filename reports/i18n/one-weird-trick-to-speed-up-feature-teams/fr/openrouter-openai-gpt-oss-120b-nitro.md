# Translation Candidate
- Slug: one-weird-trick-to-speed-up-feature-teams
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/fr/index.mdx
- Validation: passed
- Runtime seconds: 9.45
- Input tokens: 8728
- Output tokens: 2326
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000759
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Un truc bizarre pour accélérer les équipes fonctionnelles!
subTitle: Lesingénieurs principaux détestent ça !
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

Ce n’est pas toujours le bon choix, mais c’est peut‑être **plus fréquent que vous ne le pensez**.

Une couche de stockage simple peut accélérer modérément le développement *précoce* en réutilisant le code de la couche de données et en évitant les coûts liés aux changements de schéma et aux migrations. Le churn arrivera de toute façon ; laissez le code le gérer aussi longtemps que possible. Mieux vaut éviter de gérer les changements à deux endroits.

Les gains de performance sont probables puisque les recherches de `key` sont fortement optimisées, et les écritures peuvent profiter de mises à jour groupées.

{/* Avoid KV patterns if you need JOINs or to query by properties in your dataset. Or in cases where you have an unbounded/infinitely growing datasets. (`Logs`, `Signups`, etc.) */}

## Penser en clés

Cela peut sembler étrange de concevoir d’abord avec un modèle clé‑valeur, surtout si vous avez l’habitude de concevoir des systèmes avec des hiérarchies d’objets ou des diagrammes entité‑relation et de les implémenter directement en SQL.

Vous avez probablement ***utilisé*** des modèles clé‑valeur auparavant ! Ils sont partout, des configurations et URLs au stockage d’objets de type S3 ! Chaque fois que vous manipulez des données via une valeur `ID` unique, devinez quoi ? Un autre modèle clé‑valeur ! (Même si ce n’est pas forcément un magasin KV.)

### Concevoir avec des clés

Virtuellement toutes les données _peuvent_ être représentées à l’aide de modèles KV. (En fait, de nombreuses bases de données de haut niveau s’appuient sur des modèles KV de bas niveau.) Voyons quelques exemples :

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

Vous avez peut‑être remarqué que l’`ID` est souvent une clé en soi ! C’est un schéma récurrent dans les magasins KV. La clé est généralement une combinaison du type d’entité et de l’identifiant unique (par ex. `user/123`, `user:456`).

### Les KV comme graphes et arbres ?

Il peut être utile de représenter des structures de données complexes comme des graphes ou des arbres en utilisant des modèles KV. (Encore une fois, les URLs REST en sont un excellent exemple.)

La hiérarchie de clés (`user/420` → `user/420/friends`) encode naturellement une relation de graphe entre l’`user` et ses `friends`.

C’est une méthode rapide et économique pour sérialiser des structures de données en graphe, surtout si vous n’avez pas besoin de la complexité d’une base de données de graphes (comme Neo4j).

<figure>
![Graph of user/123](../KVsCanBeGraphs.webp)
<figcaption>Graphe de user/123</figcaption>
</figure>

### Quand utiliser les modèles KV

- Lorsque vous avez besoin d’une échelle massive (milliards voire trillions de paires KV).
- Lorsque l’accès principal se fait via une clé unique.
- Lorsque vous avez besoin de structures de données simples.
- Lorsque vos données possèdent une hiérarchie, un graphe ou une structure d’arbre.

### Quand éviter les modèles KV

Ne stockez pas des éléments comme les commentaires de blog dans une paire KV _**unique**_. Par exemple, `post/666 -> {comments: [...trop nombreux...]}`. Préférez plutôt `post/666/comments/1`, ou `post/666/comments/<UUID>`, etc. Ou utilisez une table SQL.

- Lorsque vous devez rechercher par propriétés (pas par clé ou ID) dans votre jeu de données.  
- Lorsque vous devez JOINDRE des données provenant de plusieurs entités.  
- Lorsque vous devez appliquer des contraintes ou des relations complexes.

### Quand vous avez besoin de plus que du KV

À mesure que les exigences du projet évoluent naturellement, il se peut que vous ayez besoin de faire plus que ce que votre magasin KV supporte. À ce stade, il faut envisager une migration vers un magasin de données plus complet.

{/* The good news is that you can often start with a KV pattern and evolve it into a more complex system as needed. S3 has features beyond simple storage, from Athena for searching files, Glacier, and Expire policies there's a lot you can do with it. Also, Redis has added many high-level features (like Pub/Sub, Geo-spatial, Streams, and Sorted Sets) that can help you meet some requirements. */}

Bonne nouvelle : migrer un magasin KV unique vers du SQL est relativement plus simple que de migrer un schéma SQL complexe vers un KV (avec plusieurs tables, index, contraintes, etc.). Je l’ai fait à de nombreuses reprises avec un script de 50 lignes.

Anecdotiquement, j’ai constaté que la qualité des conceptions SQL est meilleure lorsqu’on commence par un modèle KV. Cela vous oblige à repenser les données sous un autre angle et à comprendre *précisément* ce dont vous avez réellement besoin dans SQL.

## Prochaines étapes

Le meilleur moyen d’apprendre est de le mettre en pratique ! Si vous souhaitez explorer davantage ce modèle, je vous recommande **de construire des choses** avec Redis, DynamoDB ou S3.  
Tous sont d’excellents magasins KV avec des compromis différents.

### Fact Service – Projet de référence

Découvrez mon projet Open Source ["Fact Service", un projet de référence sur GitHub](https://github.com/justsml/fact-service).

Il s’agit d’une API RESTful autonome qui implémente un service de données KV.

Il propose de nombreux [adaptateurs de données](https://github.com/justsml/fact-service/tree/main/lib/providers), y compris pour Postgres, Redis, DynamoDB, Firestore et Cassandra ! (Livrés avec les [commandes Docker](https://github.com/justsml/fact-service/tree/main/lib/providers) pour démarrer rapidement.)

Fact Service est destiné à être un projet de démarrage et d’apprentissage ; fork‑ez‑le et construisez votre propre service de données KV !

## Conclusion

J’espère que cet article vous a été utile ! Si vous avez des questions ou des remarques, n’hésitez pas à commenter ou à me `@` sur [Twitter](https://x.com/justsml).

### Crédits

- [Modélisation de données arborescentes hiérarchiques dans PostgreSQL](https://leonardqmarcq.com/posts/modeling-hierarchical-tree-data)
- [Bonnes et mauvaises pratiques pour stocker de grands arbres dans PostgreSQL](https://leonardqmarcq.com/posts/dos-and-donts-of-modeling-hierarchical-trees-in-postgres)

### Lectures complémentaires

- [Fact Service](https://github.com/justsml/fact-service)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [S3](https://aws.amazon.com/s3/)
- [Cassandra](https://cassandra.apache.org/)
- [Firestore](https://firebase.google.com/docs/firestore)
````
