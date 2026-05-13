# Translation Candidate
- Slug: serverless-database-magic
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-09-15--serverless-database-magic/fr/index.mdx
- Validation: deferred
- Runtime seconds: 33.81
- Input tokens: 5914
- Output tokens: 6085
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001934
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: Merci à l'IA.
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
## Encore un article sur les bases de données vectorielles ?

Voici la règle de décision que j'aurais aimé utiliser plus tôt :

<p class="inset">Si vos données peuvent être reconstruites à partir de fichiers et que vos utilisateurs les lisent principalement, commencez par une base de données de stockage d'objets. Si vos utilisateurs y écrivent en permanence, optez pour une vraie base de données et arrêtez d'essayer de faire passer S3 pour une telle.</p>

C'est cette ligne qui a du sens. Pas « le sans serveur est l'avenir ». Pas « les bases de données vectorielles ont tout changé ». Ces phrases ont déjà été imprimées sur assez de badges de conférence.

L'IA a bien modifié la forme de nombreux problèmes de recherche. Soudain, de petites équipes voulaient de la recherche sémantique, du classement hybride, du chat documentaire, des requêtes multimodales et des analyses sur des fichiers stockés en objet. L'ancienne réponse était « lancez Postgres avec pgvector » ou « opérez OpenSearch/Elasticsearch » ou « achetez un service de recherche géré ». Ce sont toujours de bonnes réponses quand la charge de travail le justifie.

Mais beaucoup de charges de travail ne le font pas. Elles sont majoritairement en lecture, reconstruites facilement et tolèrent un court retard entre la modification du contenu et la mise à jour de la recherche. Documentation. Snapshots de catalogues. Exports statiques. Bases de connaissances internes. Analyses locales. Systèmes RAG expérimentaux. Pour ces cas, une nouvelle catégorie d'outils a rendu l'architecture peu excitante exceptionnellement puissante : construisez un index, stockez-le sous forme de fichiers, servez-le via HTTP.

Note d'instantané : l'écosystème évolue rapidement. Les nombres d'étoiles, les étiquettes de fonctionnalités et les chiffres de performance ci-dessous datent de septembre 2025, et ne constituent pas un classement éternel. Considérez-les comme un point de repère, puis vérifiez les documents actuels avant de parier une migration en production sur une seule case.

## Une base de données par n'importe quel autre nom

Ces magasins de données sans serveur et capables de CDN sont utiles pour des cas d'échelle moyenne, environ 1 000 à 1 000 000 d'enregistrements ou quelques gigaoctets, où l'infrastructure de base de données traditionnelle peut être plus cérémonieuse que précieuse :

- **Pagefind** (2022, ~4 500 ⭐) : Approche purement statique - compiler une fois, rechercher à l'infini, aucune exigence de backend
- **Orama** (2023, ~8 000 ⭐) : Solution universelle fonctionnant partout, des navigateurs aux fonctions sans serveur
- **Chroma** (2022, ~14 000 ⭐) : Native IA, conçue spécifiquement pour les applications RAG
- **LanceDB** (2023, ~4 000 ⭐) : Capacités multimodales d'entreprise avec architecture basée sur le disque
- **DuckDB-WASM** (2019, ~23 000 ⭐) : Base de données d'analyse SQL complète fonctionnant dans les navigateurs via WebAssembly

Le mouvement commun est simple : garder les données durables dans des fichiers ou un stockage d'objets, puis les interroger depuis un navigateur, une fonction edge, un worker ou un service léger. Cela ne supprime pas la complexité. Cela déplace la complexité vers les pipelines de construction, la fraîcheur des index, l'invalidation des caches et les capacités clientes. Ce qui est un échange parfaitement acceptable lorsque les lectures dominent.

### Bataille des cases à cocher

| Fonctionnalité | [Pagefind](https://pagefind.app) | [Orama](https://orama.com) | [Chroma](https://www.trychroma.com/) | [LanceDB](https://lancedb.com) | [DuckDB-WASM](https://duckdb.org/docs/api/wasm) |
|------------------|-------------------------------|--------------------------|-----------------------------------|-------------------------------|-----------------------------------------------|
| **Recherche textuelle complète** | ✅ Stemming avancé | ✅ BM25, 30 langues | ✅ FTS SQLite | ✅ Tantivy | ✅ SQL complet |
| **Recherche par vecteurs** | ❌ | ✅ Similarité cosinus | ✅ HNSW | ✅ IVF_PQ, HNSW, GPU | ⚠️ Extensions |
| **Intégrations IA/RAG** | Aucune | ✅ Pipeline intégré | ✅ LangChain, LlamaIndex | ✅ Ré-ordonnancement avancé | ⚠️ Configuration manuelle |
| **Stockage** | JSON/WASM statiques | Mémoire + plugins S3 | Serveur dédié* | Lance compatible S3 | WASM + S3/HTTP |
| **Prise en charge des écritures** | Temps de construction uniquement | CRUD complet | CRUD complet | CRUD complet | CRUD SQL complet |
| **Performance** | Moins de 100 ms | 0,0001 ms - 100 ms | Moins de 100 ms | 3-5 ms pour les vecteurs, 50 ms pour la recherche textuelle | 10 ms-1 s (SQL complexe) |

*Snapshot de septembre 2025 : Chroma nécessite un runtime serveur et ne prend pas en charge le stockage S3 directement comme le font les outils de fichiers d'objets ([problème #1736](https://github.com/chroma-core/chroma/issues/1736)).

### Exemples d'implémentation

Les différences de syntaxe révèlent le vrai clivage : la recherche temps de construction, la recherche en mémoire, le stockage natif de vecteurs, les tables multimodales et le SQL dans le navigateur ne constituent pas la même catégorie de produit, même s'ils apparaissent tous dans des démos IA.

#### Recherche de site statique avec Pagefind

```html
```

<link href="../pagefind/pagefind-ui.css" rel="stylesheet">
<script src="../pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>new PagefindUI({ element: "#search" });</script>

#### Multimodal d'entreprise avec LanceDB

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
  { text: "machine learning concepts", category: "research" },
  { text: "deep learning fundamentals", category: "research" }
]);
```

**Exemple de requête sur une table LanceDB :**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
// "Connect" to a URL path
const db = await lancedb.connect("data/multimodal-db");
const table = db.getTable("documents");

// Combinaison SQL + recherche vectorielle
const results = await table.search("machine learning concepts")
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
  mode: 'hybrid' // Combinaison texte + recherche vectorielle
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
// Optionnel : full-text
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

## Guide des cas d'utilisation

**Choisissez Pagefind lorsque :**
- Création de documentation, de blogs ou de bases de connaissances
- Mises à jour hebdomadaires ou moins fréquentes
- Besoin d'un déploiement sans maintenance et de mise en cache CDN optimale
- *Exemple : Documentation d'entreprise avec 10k+ pages mises à jour mensuellement*

**Choisissez Orama lorsque :**
- Développement de tableaux de bord, de commerce électronique ou d'applications dynamiques
- Besoin de mises à jour en temps réel et de performances sous 100ms
- Flexibilité de déploiement du navigateur aux fonctions edge
- *Exemple : SaaS avec catalogues de produits dynamiques*

**Choisissez Chroma lorsque :**
- Développement d'applications RAG ou de bases de connaissances IA
- Besoin d'intégrations LangChain/LlamaIndex
- Recherche sémantique en cœur de fonctionnalité
- *Exemple : Bot de support client IA*

**Choisissez LanceDB lorsque :**
- Travaux sur des données multimodales (images, audio, vidéo)
- Besoin de performances d'entreprise à grande échelle
- Analyse complexe et réindexation requises
- *Exemple : Plateforme média avec recherche sémantique vidéo*

**Choisissez DuckDB-WASM lorsque :**
- Besoin de capacités SQL complètes dans les navigateurs ou fonctions edge
- Travaux analytiques et requêtes complexes
- Traitement direct de fichiers CSV/Parquet depuis S3
- *Exemple : Tableau de bord BI avec requêtes SQL ad-hoc*

## La règle de décision

La question pratique n'est pas « quelle base de données est la meilleure ? »

La question pratique est : quel type de changement le système doit-il absorber ?

- **Contenu reconstruisable :** Pagefind, snapshots Orama, fichiers Lance, DuckDB sur Parquet. Gardez-le statique jusqu'à ce que cela pèse.
- **Écritures fréquentes :** Postgres, serveur Chroma, service de recherche géré ou pipeline d'indexation basé sur une file. Vous avez besoin de coordination, pas de vibes.
- **Résultats spécifiques aux utilisateurs :** utilisez un véritable backend. Le stockage d'objets n'est pas un modèle d'autorisation.
- **Analyse sur fichiers :** DuckDB est incroyablement utile. Laissez le SQL faire ce qu'il fait de mieux.
- **Recherche multimodale ou vectorielle :** LanceDB et Chroma méritent d'être testés sur vos propres données, pas sur des benchmarks de README.

Le chemin simple est abordable. Les cas limites définissent l'architecture.

## Le tableau global

Ces outils réduisent l'infrastructure minimale viable pour une recherche utile. Cela compte. En 2020, « recherche sémantique » impliquait souvent un tas de services, beaucoup de code de collage, et quelqu'un expliquant les index vectoriels en réunion où la moitié de la salle voulait déjeuner. En 2025, une petite équipe peut prototyper le même idée de produit avec des fichiers, des embeddings, et un week-end.

Cela ne signifie pas que chaque boîte de recherche doit devenir un système RAG. Cela signifie que la première version n'a plus besoin d'hériter d'une infrastructure de production avant d'avoir des preuves de production.

Même AWS se dirige dans cette direction avec des travaux de recherche vectorielle proches de S3, ce qui est un signal utile : le stockage d'objets n'est plus seulement le grenier où les anciens fichiers vont. Il devient une surface de requête.

## Commencez à expérimenter

1. **Choisissez d'abord le schéma de mise à jour :** construction, batch horaire, écritures en direct, ou résultats par utilisateur.
2. **Prototypage avec l'outil le plus honnête :** Pagefind pour HTML statique, DuckDB pour des fichiers analytiques, Orama pour la recherche d'applications légères, LanceDB ou Chroma pour les travaux vectoriels.
3. **Mesurez la partie délicate :** temps d'indexation, fraîcheur, taille de bundle, permissions, et première requête après un démarrage froid.
4. **Promouvez uniquement quand la douleur est réelle :** une base de données gérée est plus facile à justifier après que la version basée sur fichiers ait montré exactement où elle cède.

*Consultez mon [guide pratique Pagefind][1] pour une mise en œuvre concrète, ou explorez l'écosystème croissant des bases de données natives edge qui redéfinissent les données à grande échelle.*

> **Avertissement :** J'ai utilisé Pagefind depuis des années et suis devenu contributeur en 2025. J'ai expérimenté Orama et Chroma pour des projets plus petits et explore LanceDB pour des applications IA plus grandes. Aucun lien financier avec ces projets - juste un intérêt marqué pour l'évolution du paysage des bases de données.

[1]: https://danlevy.net/you-might-not-need-algolia/
````
