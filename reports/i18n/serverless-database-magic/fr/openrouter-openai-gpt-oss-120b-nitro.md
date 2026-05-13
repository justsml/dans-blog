# Translation Candidate
- Slug: serverless-database-magic
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-09-15--serverless-database-magic/fr/index.mdx
- Validation: deferred
- Runtime seconds: 5.26
- Input tokens: 6013
- Output tokens: 3365
- Thinking tokens: unknown
- Cached input tokens: 1792
- Cache write tokens: 0
- Estimated cost: $0.000840
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: L'essor des bases de données en 2025
subTitle: Vous pouvez remercier l’IA.
date: '2025-09-10'
modified: '2025-09-17'
tags:
  - serverless
  - databases
  - ai
  - innovation
  - chroma
  - lancedb
  - pagefind
  - orama
  - duckdb
category: Search
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../data-city-wide.webp
cover_mobile: ../data-city-square-200.webp
cover_icon: ../data-city-square-200.webp
cover_credit: ©️ 2025 Dan Levy
---
## Not another Vector DB article

Here is the decision rule I wish I had used earlier:

<p class="inset">Si vos données peuvent être reconstruites à partir de fichiers et que les utilisateurs les lisent principalement, essayez d’abord une base de données sur stockage d’objets. Si les utilisateurs écrivent en continu, commencez avec une vraie base de données et arrêtez d’essayer de faire passer S3 pour une base de données.</p>

That is the useful line. Not "serverless is the future." Not "vector databases changed everything." Those sentences have already been printed on enough conference lanyards.

AI did change the shape of a lot of search problems. Suddenly small teams wanted semantic search, hybrid ranking, document chat, multimodal lookup, and analytics over files sitting in object storage. The old answer was "run Postgres with pgvector" or "operate OpenSearch/Elasticsearch" or "buy a managed search service." Those are still good answers when the workload deserves them.

But many workloads do not. They are read-heavy, rebuildable, and tolerant of a short delay between content changing and search catching up. Documentation. Catalog snapshots. Static exports. Internal knowledge bases. Local analytics. Prototype RAG systems. For those, a new class of tools has made the boring architecture unusually powerful: build an index, store it as files, serve it over HTTP.

Note de mise à jour : l’écosystème évolue rapidement. Les compteurs d’étoiles, les libellés de fonctionnalités et les chiffres de performance ci‑dessous sont un instantané de septembre 2025, pas un tableau de bord intemporel. Considérez‑les comme une orientation, puis vérifiez la documentation actuelle avant de baser une migration en production sur une case quelconque.

## Une base de données sous un autre nom

Ces magasins de données sans serveur et compatibles CDN sont utiles pour des cas de taille moyenne, environ 1 000 à 1 000 000 d’enregistrements ou quelques gigaoctets, où l’infrastructure de bases de données traditionnelles peut représenter plus de cérémonial que de valeur :

- **Pagefind** (2022, ~4,5 K ⭐) : approche purement statique – compilez une fois, recherchez indéfiniment, aucune exigence backend
- **Orama** (2023, ~8 K ⭐) : solution universelle fonctionnant partout, des navigateurs aux fonctions serverless
- **Chroma** (2022, ~14 K ⭐) : natif IA, conçu spécifiquement pour les applications RAG
- **LanceDB** (2023, ~4 K ⭐) : capacités multimodales d’entreprise avec une architecture basée sur disque
- **DuckDB-WASM** (2019, ~23 K ⭐) : base de données analytique SQL complète fonctionnant dans les navigateurs via WebAssembly

Le mouvement commun est simple : conserver les données durables dans des fichiers ou du stockage d’objets, puis les interroger depuis un navigateur, une fonction edge, un worker ou un service léger. Cela n’élimine pas la complexité. Elle est déplacée vers les pipelines de construction, la fraîcheur des index, l’invalidation du cache et les capacités du client. Ce qui constitue un compromis tout à fait valable lorsque les lectures dominent.

### Bataille des cases à cocher

| Feature | [Pagefind](https://pagefind.app) | [Orama](https://orama.com) | [Chroma](https://www.trychroma.com/) | [LanceDB](https://lancedb.com) | [DuckDB-WASM](https://duckdb.org/docs/api/wasm) |
|---------|----------|--------|---------|----------|----------|
| **Full-Text Search** | ✅ Advanced stemming | ✅ BM25, 30 languages | ✅ SQLite FTS | ✅ Tantivy | ✅ Full SQL |
| **Vector Search** | ❌ | ✅ Cosine similarity | ✅ HNSW | ✅ IVF_PQ, HNSW, GPU | ⚠️ Extensions |
| **AI/RAG Integrations** | None | ✅ Built-in pipeline | ✅ LangChain, LlamaIndex | ✅ Advanced reranking | ⚠️ Manual setup |
| **Storage** | Static JSON/WASM | Memory + S3 plugins | Server-based* | S3-compatible Lance | WASM + S3/HTTP |
| **Write Support** | Build-time only | Full CRUD | Full CRUD | Full CRUD | Full SQL CRUD |
| **Performance** | Sub-100ms | 0.0001ms - 100ms | Sub-100ms | 3-5ms vector, 50ms FTS | 10ms-1s (complex SQL) |

*Snapshot de septembre 2025 : Chroma nécessite un runtime serveur et ne supporte pas le stockage direct d’objets S3 comme le font les outils basés sur des fichiers ([issue #1736](https://github.com/chroma-core/chroma/issues/1736)).

### Exemples d’implémentation

Les différences de syntaxe révèlent la vraie fracture : recherche à la compilation, recherche en mémoire, stockage vectoriel natif, tables multimodales et SQL côté navigateur ne constituent pas la même catégorie de produit simplement parce qu’ils apparaissent tous dans des démos IA.

#### Recherche statique de site avec Pagefind

```html
--- CHUNK END ---
```

<link href="../pagefind/pagefind-ui.css" rel="stylesheet">
<script src="../pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>new PagefindUI({ element: "#search" });</script>

#### Multimodal de niveau entreprise avec LanceDB

**Code pour créer une table LanceDB avec des embeddings OpenAI automatiques :**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
import { LanceSchema, getRegistry } from "@lancedb/lancedb/embedding";
import { Utf8 } from "apache-arrow";

const db = await lancedb.connect("data/multimodal-db");
const func = getRegistry()
  .get("openai")
  ?.create({ model: "text-embedding-ada-002" });

// Schéma avec génération automatique d'embeddings
const documentsSchema = LanceSchema({
  text: func.sourceField(new Utf8()),
  vector: func.vectorField(),
  category: new Utf8()
});

const table = await db.createEmptyTable("documents", documentsSchema);
await table.add([
  { text: "concepts d'apprentissage automatique", category: "research" },
  { text: "fondamentaux du deep learning", category: "research" }
]);
```

**Exemple de requête sur une table LanceDB :**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
// "Connect" à un chemin URL
const db = await lancedb.connect("data/multimodal-db");
const table = db.getTable("documents");

// Combinaison SQL + recherche vectorielle
const results = await table.search("concepts d'apprentissage automatique")
  .where("category = 'research'")
  .limit(10)
  .toArray();

console.log(results);
```


#### Recherche universelle avec Orama
```typescript
import { create, insert, search } from '@orama/orama'

const db = create({
  schema: {
    title: 'string',
    content: 'string', 
    embedding: 'vector[1536]'
  }
})

await insert(db, { 
  title: 'Getting Started',
  content: 'Learn the basics',
  embedding: await generateEmbedding('Learn the basics')
})

const results = await search(db, { 
  term: 'basics',
  mode: 'hybrid' // Combine recherche texte + vecteur
})
```

**DuckDB-WASM :**
```typescript
import * as duckdb from "https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@latest/dist/duckdb-browser.mjs";
const bundle = await duckdb.selectBundle(duckdb.getJsDelivrBundles());
const worker = new Worker(bundle.mainWorker);
const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker);
await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

const conn = await db.connect();
await conn.query(`create table t as select * from (values (1,'hybrid search'),(2,'edge sql')) as v(id,txt);`);
// Optionnel plein texte :
await conn.query(`install fts; load fts; select * from t where match_bm25(txt, 'hybrid');`);
```

#### Recherche native IA avec Chroma  
```typescript
import { ChromaClient } from "chromadb";

const client = new ChromaClient();
const collection = await client.createCollection({ name: "knowledge-base" });

await collection.add({
  documents: ["AI will transform software development"],
  metadatas: [{ source: "tech-blog", category: "AI" }],
  ids: ["doc1"]
});

const results = await collection.query({
  queryTexts: ["future of programming"],
  where: { category: "AI" },
  nResults: 5
});
```

## Guide des cas d’usage

**Choisir Pagefind quand :**
- Vous construisez de la documentation, des blogs ou des bases de connaissances
- Les mises à jour de contenu sont hebdomadaires ou moins fréquentes
- Vous avez besoin de zéro surcharge opérationnelle et d’un cache CDN parfait
- *Exemple : documentation d’entreprise avec plus de 10 k pages mises à jour mensuellement*

**Choisir Orama quand :**
- Vous construisez des tableaux de bord, du e‑commerce ou des applications dynamiques
- Vous avez besoin de mises à jour en temps réel et de performances sous 100 ms
- Vous voulez une flexibilité de déploiement du navigateur aux fonctions edge
- *Exemple : SaaS avec catalogues produits dynamiques*

**Choisir Chroma quand :**
- Vous construisez des applications RAG ou des bases de connaissances IA
- Vous avez besoin d’intégrations LangChain/LlamaIndex
- La recherche sémantique est la fonctionnalité centrale
- *Exemple : bot d’assistance client IA*

**Choisir LanceDB quand :**
- Vous travaillez avec des données multimodales (images, audio, vidéo)
- Vous avez besoin de performances d’entreprise à grande échelle
- Des analyses complexes et du reranking sont requis
- *Exemple : plateforme média avec recherche vidéo sémantique*

**Choisir DuckDB-WASM quand :**
- Vous avez besoin de capacités SQL complètes dans les navigateurs ou fonctions edge
- Vous traitez des charges de travail analytiques et des requêtes complexes
- Vous voulez consommer directement des fichiers CSV/Parquet depuis S3
- *Exemple : tableau de bord BI avec requêtes SQL ad‑hoc*

## La règle de décision

La question pratique n’est pas « quel base de données est la meilleure ? »

La question pratique est : quel type de changement le système doit‑il absorber ?

- **Contenu reconstruit** : Pagefind, instantanés Orama, fichiers Lance, DuckDB sur Parquet. Gardez‑le statique tant que cela ne pose pas problème.
- **Écritures fréquentes** : Postgres, serveur Chroma, service de recherche géré, ou pipeline d’indexation basé sur une file d’attente. Vous avez besoin de coordination, pas de bonnes vibrations.
- **Résultats spécifiques à l’utilisateur** : utilisez un vrai backend. Le stockage d’objets n’est pas un modèle d’autorisation.
- **Analytique sur fichiers** : DuckDB est incroyablement utile. Laissez SQL faire ce que SQL sait faire.
- **Recherche multimodale ou vectorielle lourde** : LanceDB et Chroma méritent d’être testés sur vos données réelles, pas sur un benchmark README.

Le chemin heureux est bon marché. Ce sont les cas limites qui décident de l’architecture.

## Le tableau d’ensemble

Ces outils réduisent l’infrastructure minimale viable pour une recherche utile. C’est important. En 2020, « recherche sémantique » impliquait souvent une pile de services, beaucoup de code d’accroche, et quelqu’un expliquant les index vectoriels lors d’une réunion où la moitié de l’audience voulait déjeuner. En 2025, une petite équipe peut prototyper la même idée produit avec des fichiers, des embeddings et un week‑end.

Cela ne signifie pas que chaque champ de recherche doit devenir un système RAG. Cela signifie que la première version n’a plus besoin d’hériter d’une infrastructure de production avant d’avoir des preuves de production.

Même AWS avance dans cette direction avec son travail de recherche vectorielle adjacent à S3, ce qui est un signal utile : le stockage d’objets n’est plus seulement le grenier où vont les vieux fichiers. Il devient une surface de requête.

## Commencez à expérimenter

1. **Choisissez d’abord le modèle de mise à jour** : construction, lot horaire, écritures en direct, ou résultats par utilisateur.
2. **Prototypiez avec l’outil le plus simple et honnête** : Pagefind pour du HTML statique, DuckDB pour des fichiers analytiques, Orama pour une recherche d’application légère, LanceDB ou Chroma pour du travail vectoriel lourd.
3. **Mesurez la partie laide** : temps d’indexation, fraîcheur, taille du bundle, permissions, et la première requête après un démarrage à froid.
4. **Promouvez uniquement quand la douleur est réelle** : une base de données gérée devient plus justifiable après que la version fichier a montré exactement où elle fléchit.

*Consultez mon [guide pratique Pagefind][1] pour une implémentation concrète, ou explorez l’écosystème croissant des bases de données natives edge qui reconfigurent les données à grande échelle.*

> **Avertissement :** J’utilise Pagefind depuis des années et suis devenu contributeur en 2025. J’ai expérimenté Orama et Chroma pour de plus petits projets et j’explore LanceDB pour de plus grandes applications IA. Aucun lien financier avec ces projets — juste un vif intérêt pour l’évolution du paysage des bases de données.

[1]: https://danlevy.net/you-might-not-need-algolia/
````
