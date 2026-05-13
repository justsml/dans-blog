# Translation Candidate
- Slug: serverless-database-magic
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-09-15--serverless-database-magic/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 13.41
- Input tokens: 5925
- Output tokens: 6275
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001980
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug serverless-database-magic --locale fr
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
## Pas un autre article sur les bases de données vectorielles

Voici la règle de décision que j'aurais souhaité utiliser plus tôt :

<p class="inset">Si vos données peuvent être reconstruites à partir de fichiers et que vos utilisateurs les lisent principalement, commencez par une base de données de stockage d'objets. Si vos utilisateurs y écrivent en permanence, optez pour une vraie base de données et arrêtez d'essayer de faire passer S3 pour autre chose.</p>

C'est la ligne utile. Pas « le serverless est l'avenir ». Pas « les bases de données vectorielles ont tout changé ». Ces phrases ont déjà été imprimées sur assez de badges de conférence.

L'IA a effectivement modifié la forme de nombreux problèmes de recherche. Soudain, des équipes réduites voulaient de la recherche sémantique, du classement hybride, des discussions sur les documents, des recherches multimodales et des analyses sur des fichiers stockés dans un stockage d'objets. L'ancienne réponse était « lancez Postgres avec pgvector » ou « déploiez OpenSearch/Elasticsearch » ou « achetez un service de recherche géré ». Ce sont toujours de bonnes réponses quand la charge de travail le justifie.

Mais beaucoup de charges de travail ne le justifient pas. Elles sont lourdes en lectures, reconstruites facilement, et tolèrent un court délai entre la modification du contenu et la mise à jour de la recherche. Documentation. Snapshots de catalogues. Exports statiques. Bases de connaissances internes. Analyses locales. Systèmes RAG expérimentaux. Pour ces cas, une nouvelle catégorie d'outils a rendu l'architecture classique étonnamment puissante : construisez un index, stockez-le sous forme de fichiers, et servez-le via HTTP.

**Note d'instantané** : l'écosystème évolue rapidement. Les nombres d'étoiles, les étiquettes de fonctionnalités et les chiffres de performance ci-dessous sont un instantané de septembre 2025, pas un classement éternel. Traitez-les comme un point de repère, puis vérifiez les documentations actuelles avant de parier une migration de production sur une seule cellule.

## Une base de données par n'importe quel autre nom

Ces bases de données sans serveur et compatibles CDN sont utiles pour des cas de taille moyenne, environ 1 000 à 1 000 000 d'enregistrements ou quelques gigaoctets, où l'infrastructure de base de données traditionnelle peut être plus de cérémonie que de valeur :

- **Pagefind** (2022, ~4,5 k ⭐) : Approche purement statique - compiler une fois, rechercher à l'infini, aucune exigence backend
- **Orama** (2023, ~8 k ⭐) : Solution universelle fonctionnant partout, des navigateurs aux fonctions sans serveur
- **Chroma** (2022, ~14 k ⭐) : Native IA, conçue pour les applications RAG
- **LanceDB** (2023, ~4 k ⭐) : Capacités multimodales d'entreprise avec architecture basée sur le disque
- **DuckDB-WASM** (2019, ~23 k ⭐) : Base de données d'analyse SQL complète fonctionnant dans les navigateurs via WebAssembly

Le mouvement commun est simple : conserver les données durables dans des fichiers ou un stockage d'objets, puis les interroger depuis un navigateur, une fonction edge, un worker ou un service léger. Cela ne supprime pas la complexité. Cela déplace la complexité vers les pipelines de construction, la fraîcheur des index, l'invalidation du cache et les capacités client. Ce qui est une transaction parfaitement acceptable lorsque les lectures dominent.

### Bataille des cases à cocher

| Fonctionnalité | [Pagefind](https://pagefind.app) | [Orama](https://orama.com) | [Chroma](https://www.trychroma.com/) | [LanceDB](https://lancedb.com) | [DuckDB-WASM](https://duckdb.org/docs/api/wasm) |
|------------------|-------------------------------|--------------------------|------------------------------------|-------------------------------|----------------------------------------------|
| **Recherche textuelle complète** | ✅ Stématisation avancée | ✅ BM25, 30 langues | ✅ SQLite FTS | ✅ Tantivy | ✅ SQL complet |
| **Recherche vectorielle** | ❌ | ✅ Similarité cosinus | ✅ HNSW | ✅ IVF_PQ, HNSW, GPU | ⚠️ Extensions |
| **Intégrations IA/RAG** | Aucune | ✅ Pipeline intégré | ✅ LangChain, LlamaIndex | ✅ Ré-ordonnancement avancé | ⚠️ Configuration manuelle |
| **Stockage** | JSON/WASM statiques | Mémoire + plugins S3 | Serveur* | Lance compatible S3 | WASM + S3/HTTP |
| **Prise en charge des écritures** | Uniquement en temps de construction | CRUD complet | CRUD complet | CRUD complet | CRUD SQL complet |
| **Performance** | <100 ms | 0,0001 ms - 100 ms | <100 ms | 3-5 ms vectoriel, 50 ms FTS | 10 ms-1 s (SQL complexe) |

*Instantané de septembre 2025 : Chroma nécessite un runtime serveur et ne prend pas en charge le stockage direct S3 de la manière dont les outils de type « fichier-objet » le font ([problème #1736](https://github.com/chroma-core/chroma/issues/1736)).

### Exemples d'implémentation

Les différences syntaxiques révèlent la vraie division : la recherche en temps de construction, la recherche en mémoire, le stockage vectoriel natif, les tables multimodales et le SQL dans le navigateur ne constituent pas la même catégorie de produit, même s'ils apparaissent tous dans des démos IA.

#### Recherche sur site statique avec Pagefind

```html
```

<link href="../pagefind/pagefind-ui.css" rel="stylesheet">
<script src="../pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>new PagefindUI({ element: "#search" });</script>
```

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
// "Connexion" à un chemin d'URL
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
// Recherche texte intégral optionnelle :
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
- Création de documentation, blogs ou bases de connaissances
- Les mises à jour du contenu sont hebdomadaires ou moins fréquentes
- Besoin d'aucun surcoût opérationnel et de mise en cache CDN optimale
- *Exemple : Documentation d'entreprise avec 10K+ pages mises à jour mensuellement*

**Choisissez Orama lorsque :**
- Développement de tableaux de bord, e-commerce ou applications dynamiques
- Nécessite des mises à jour en temps réel et des performances <100ms
- Flexibilité de déploiement du navigateur aux fonctions edge
- *Exemple : SaaS avec catalogues produits dynamiques*

**Choisissez Chroma lorsque :**
- Développement d'applications RAG ou bases de connaissances IA
- Intégrations LangChain/LlamaIndex requises
- La recherche sémantique est une fonctionnalité centrale
- *Exemple : Bot de support client IA*

**Choisissez LanceDB lorsque :**
- Travailler avec des données multimodales (images, audio, vidéo)
- Performance d'entreprise à grande échelle nécessaire
- Analyse complexe et ré-ordonnancement requis
- *Exemple : Plateforme média avec recherche sémantique vidéo*

**Choisissez DuckDB-WASM lorsque :**
- Besoin de capacités SQL complètes dans les navigateurs ou fonctions edge
- Travailler avec des charges de travail analytiques et requêtes complexes
- Traiter des fichiers CSV/Parquet directement depuis S3
- *Exemple : Tableau de bord d'intelligence d'affaires avec requêtes SQL ad-hoc*

## La Règle de Décision

La question pratique n'est pas "quelle base de données est la meilleure ?"

La question pratique est : quel type de changement doit absorber le système ?

- **Contenu reconstruisable :** Pagefind, snapshots Orama, fichiers Lance, DuckDB sur Parquet. Gardez-le statique jusqu'à ce que cela pèse.
- **Écritures fréquentes :** Postgres, serveur Chroma, service de recherche géré ou pipeline d'indexation basé sur une file d'attente. Vous avez besoin de coordination, pas de vibes.
- **Résultats spécifiques à l'utilisateur :** utilisez un vrai backend. Le stockage d'objets n'est pas un modèle d'autorisation.
- **Analyse sur fichiers :** DuckDB est incroyablement utile. Laissez SQL faire ce qu'il fait de mieux.
- **Recherche multimodale ou vectorielle :** LanceDB et Chroma méritent d'être testés sur vos données réelles, pas sur des benchmarks de README.

Le chemin simple est abordable. Ce sont les cas limites qui déterminent l'architecture.

## Le Cadre Plus Large

Ces outils réduisent l'infrastructure minimale viable pour une recherche utile. Cela compte. En 2020, la "recherche sémantique" impliquait souvent une pile de services, beaucoup de code de collage, et quelqu'un expliquant les index vectoriels lors d'une réunion où la moitié de la salle voulait déjeuner. En 2025, une petite équipe peut prototyper le même idée de produit avec des fichiers, des embeddings, et un week-end.

Cela ne signifie pas que chaque champ de recherche doit devenir un système RAG. Cela signifie que la première version n'a plus besoin d'hériter d'une infrastructure de production avant d'avoir des preuves de production.

Même AWS a progressivement adopté cette approche avec sa recherche vectorielle S3-adjacente, ce qui est un signal utile : le stockage d'objets n'est plus seulement le grenier où les anciens fichiers sont stockés. Il devient une surface de requête.

## Commencez à expérimenter

1. **Choisissez d'abord le schéma de mise à jour :** construction, batch horaire, écritures en direct, ou résultats par utilisateur.
2. **Prototypage avec l'outil le plus honnête :** Pagefind pour HTML statique, DuckDB pour fichiers analytiques, Orama pour recherche d'application légère, LanceDB ou Chroma pour travail vectoriel lourd.
3. **Mesurez les parties délicates :** temps d'indexation, fraîcheur, taille du bundle, permissions, et première requête après un démarrage froid.
4. **Promouvez uniquement quand la douleur est réelle :** une base de données gérée est plus facile à justifier après que la version basée sur des fichiers ait montré exactement où elle cède.

*Consultez mon [guide pratique Pagefind][1] pour une mise en œuvre concrète, ou explorez l'écosystème croissant des bases de données natives edge qui redéfinissent l'échelle des données.*

> **Avertissement :** J'ai utilisé Pagefind pendant des années et suis devenu contributeur en 2025. J'ai expérimenté Orama et Chroma pour des projets plus petits et explore LanceDB pour des applications IA plus grandes. Aucun lien financier avec ces projets - juste un intérêt passionné pour l'évolution du paysage des bases de données.

[1]: ../you-might-not-need-algolia/
````
