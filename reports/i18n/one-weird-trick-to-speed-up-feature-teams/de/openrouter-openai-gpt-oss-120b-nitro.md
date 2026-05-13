# Translation Candidate
- Slug: one-weird-trick-to-speed-up-feature-teams
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/de/index.mdx
- Validation: passed
- Runtime seconds: 13.16
- Input tokens: 8799
- Output tokens: 2488
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000791
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Ein seltsamer Trick, um Feature‑Teams zu beschleunigen!'
subTitle: Staff‑Ingenieure hassen das!
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
<summary>Inhaltsverzeichnis</summary>

- [Denken in Schlüsseln](#thinking-in-keys)
  - [Entwerfen mit Schlüsseln](#designing-with-keys)
  - [KVs als Graphen & Bäume?](#kvs-as-graphs--trees)
  - [Wann KV‑Muster sinnvoll sind](#when-to-use-kv-patterns)
  - [Wann KV‑Muster zu meiden sind](#when-to-avoid-kv-patterns)
  - [Wenn mehr als KV nötig ist](#when-you-need-more-than-kv)
- [Nächste Schritte](#next-steps)
  - [Fact Service – Referenzprojekt](#fact-service---reference-project)
- [Fazit](#conclusion)
  - [Weiterführende Literatur](#further-reading)

</details>

When designing a new system or feature, it's easy to get bogged down on schema design. In this article I will share a neat trick that has paid dividends over my career.

<section class="breakout">
  _Versuchen_ Sie, die einfachste mögliche Datenpersistenz zu verwenden, wenn Sie ein neues System oder Feature entwerfen.
</section>

All too often, I see teams reach for SQL or MongoDB as their only choice for data storage. Sure, no one's getting fired for choosing SQL. But what if I told you there's a simpler, faster, and cheaper way to start?

A KV or Key-value store might be all you need. Something like Redis or S3.

Es ist nicht immer die richtige Wahl, aber vielleicht **häufiger, als Sie denken**.

Eine einfache Speicherschicht kann die *frühe* Entwicklung moderat beschleunigen, indem sie Daten‑Layer‑Code wiederverwendet und die Kosten vermeidet, die durch ständige Änderungen am Schema‑Design und Migrationen entstehen. Änderungen werden sowieso passieren; lassen Sie den Code so lange wie möglich damit umgehen. Besser, Änderungen nicht an zwei Stellen behandeln zu müssen.

Leistungsgewinne sind wahrscheinlich, da `key`‑Lookups stark optimiert sind und Schreibvorgänge von Batch‑Updates profitieren können.

{/* Avoid KV patterns if you need JOINs or to query by properties in your dataset. Or in cases where you have an unbounded/infinitely growing datasets. (`Logs`, `Signups`, etc.) */}

## Denken in Schlüsseln

Es kann seltsam wirken, zuerst mit einem Key‑Value‑Muster zu entwerfen, besonders wenn man es gewohnt ist, Systeme mit Objekt‑Hierarchien oder Entity‑Relationship‑Diagrammen zu planen und diese direkt in SQL umzusetzen.

Du hast wahrscheinlich ***Key‑Value‑Muster*** schon verwendet! Sie sind überall zu finden – von Konfigurationen und URLs bis hin zu S3‑ähnlichen Object‑Stores! Jedes Mal, wenn du Daten über einen eindeutigen `ID`‑Wert ansprichst, was passiert? Ein weiteres Key‑Value‑Muster! (Auch wenn es nicht zwingend ein KV‑Store ist.)

### Entwerfen mit Schlüsseln

Praktisch alle Daten _können_ mit KV‑Mustern dargestellt werden. (Tatsächlich bauen viele höherwertige Datenbanken auf niedrigeren KV‑Mustern auf.) Schauen wir uns ein paar Beispiele an:

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

Vielleicht ist dir aufgefallen, dass die `ID` häufig bereits ein Schlüssel ist! Das ist ein gängiges Muster in KV‑Stores. Der Schlüssel besteht oft aus einer Kombination von Entitätstyp und eindeutiger Kennung (z. B. `user/123`, `user:456`).

### KVs als Graphen & Bäume?

Es kann sinnvoll sein, komplexe Datenstrukturen wie Graphen oder Bäume mit KV‑Mustern abzubilden. (Auch hier sind REST‑URLs ein gutes Beispiel.)

Die Schlüssel‑Hierarchie (`user/420` → `user/420/friends`) kodiert natürlich die Graph‑Beziehung zwischen dem `user` und seinen `friends`.

Das ist ein schneller & günstiger Weg, Graph‑Datenstrukturen zu serialisieren – besonders dann, wenn Sie nicht die Komplexität einer Graph‑Datenbank (wie Neo4j) benötigen.

<figure>
![Graph of user/123](../KVsCanBeGraphs.webp)
<figcaption>Graph von user/123</figcaption>
</figure>

### Wann KV‑Muster einsetzen

- Wenn massive Skalierung nötig ist (Milliarden bis sogar Billionen KV‑Paare).
- Wenn der primäre Zugriff über einen eindeutigen Schlüssel erfolgt.
- Wenn einfache Datenstrukturen ausreichen.
- Wenn die Daten eine hierarchische, graph‑ oder baumartige Struktur besitzen.

### Wann KV‑Muster vermeiden

Speichern Sie keine Daten wie Blog‑Kommentare in einem **einzigen** KV‑Paar. Zum Beispiel `post/666 -> {comments: [...zu viele...]}`. Stattdessen könnten Sie `post/666/comments/1` oder `post/666/comments/<UUID>` usw. verwenden. Oder Sie greifen zu einer SQL‑Tabelle.

- Wenn Sie nach Eigenschaften (nicht nach Schlüssel oder ID) im Datensatz suchen müssen.  
- Wenn Sie Daten über mehrere Entitäten hinweg JOINen müssen.  
- Wenn Sie komplexe Constraints oder Beziehungen durchsetzen müssen.

### Wenn Sie mehr als KV benötigen

Wenn die Projektanforderungen natürlich wachsen, benötigen Sie möglicherweise mehr, als Ihr KV‑Store leisten kann. Dann müssen Sie über eine Migration zu einem komplexeren Datenspeicher nachdenken.

{/* The good news is that you can often start with a KV pattern and evolve it into a more complex system as needed. S3 has features beyond simple storage, from Athena for searching files, Glacier, and Expire policies there's a lot you can do with it. Also, Redis has added many high-level features (like Pub/Sub, Geo-spatial, Streams, and Sorted Sets) that can help you meet some requirements. */}

Die gute Nachricht ist, dass die Migration eines einzelnen KV‑Stores zu SQL relativ einfacher ist, als ein komplexes SQL‑Schema in einen KV‑Store zu überführen (mit mehreren Tabellen, Indizes, Constraints usw.). Das habe ich schon oft mit einem 50‑Zeilen‑Skript erledigt.

Anekdotisch habe ich festgestellt, dass die Qualität von SQL‑Designs höher ist, wenn man zuerst ein KV‑Muster verwendet. Es zwingt einen, die Daten aus einem anderen Blickwinkel zu betrachten und genau zu verstehen, was man wirklich von SQL benötigt.

## Nächste Schritte

Der beste Weg zu lernen ist, es selbst auszuprobieren! Wenn du dieses Muster weiter erkunden willst, empfehle ich **etwas zu bauen** mit Redis, DynamoDB oder S3.  
Alle sind exzellente KV‑Stores mit unterschiedlichen Vor‑ und Nachteilen.

### Fact Service – Referenzprojekt

Sieh dir mein Open‑Source‑["Fact Service", ein Referenzprojekt auf GitHub](https://github.com/justsml/fact-service) an.

Es ist eine eigenständige RESTful‑API, die einen KV‑Datendienst implementiert.

Es bietet zahlreiche [Datenadapter](https://github.com/justsml/fact-service/tree/main/lib/providers), darunter für Postgres, Redis, DynamoDB, Firestore und Cassandra – komplett mit [Docker‑Befehlen](https://github.com/justsml/fact-service/tree/main/lib/providers), um schnell loszulegen.

Der Fact Service ist als Starter‑ und Lernprojekt gedacht; forke ihn und baue deinen eigenen KV‑Datendienst!

## Fazit

Ich hoffe, der Artikel war hilfreich! Bei Fragen oder Feedback einfach kommentieren oder mich auf [Twitter](https://x.com/justsml) `@`‑en.

### Danksagungen

- [Modellierung hierarchischer Baumdaten in PostgreSQL](https://leonardqmarcq.com/posts/modeling-hierarchical-tree-data)
- [Do’s und Don’ts beim Speichern großer Bäume in PostgreSQL](https://leonardqmarcq.com/posts/dos-and-donts-of-modeling-hierarchical-trees-in-postgres)

### Weiterführende Literatur

- [Fact Service](https://github.com/justsml/fact-service)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [S3](https://aws.amazon.com/s3/)
- [Cassandra](https://cassandra.apache.org/)
- [Firestore](https://firebase.google.com/docs/firestore)
````
