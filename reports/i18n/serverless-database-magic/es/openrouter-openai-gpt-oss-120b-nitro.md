# Translation Candidate
- Slug: serverless-database-magic
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-09-15--serverless-database-magic/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 2.67
- Input tokens: 6087
- Output tokens: 3320
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000835
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug serverless-database-magic --locale es
## Raw Output

````mdx
---
title: La olade innovación en bases de datos de 2025
subTitle: Puedes agradecer a la IA.
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
## No es otro artículo sobre bases de datos vectoriales

Aquí está la regla de decisión que desearía haber usado antes:

<p class="inset">Si tus datos pueden reconstruirse a partir de archivos y los usuarios principalmente los leen, prueba primero una base de datos basada en almacenamiento de objetos. Si los usuarios están escribiendo en ella todo el día, comienza con una base de datos real y deja de intentar que S3 haga de ella.</p>

Esa es la frase útil. No “serverless es el futuro”. No “las bases de datos vectoriales lo cambiaron todo”. Esas frases ya se han impreso en suficientes cordones de conferencias.

La IA sí cambió la forma de muchos problemas de búsqueda. De repente, equipos pequeños querían búsqueda semántica, ranking híbrido, chat de documentos, búsqueda multimodal y análisis sobre archivos que residen en almacenamiento de objetos. La respuesta tradicional era “ejecutar Postgres con pgvector” o “operar OpenSearch/Elasticsearch” o “comprar un servicio de búsqueda gestionado”. esas siguen siendo buenas respuestas cuando la carga de trabajo lo justifica.

Pero muchas cargas de trabajo no lo hacen. Son intensivas en lectura, reconstruibles y toleran una breve demora entre el cambio de contenido y la actualización de la búsqueda. Documentación. Instantáneas de catálogos. Exportaciones estáticas. Bases de conocimiento internas. Analítica local. Sistemas RAG de prototipo. Para esos casos, una nueva clase de herramientas ha hecho que la arquitectura aburrida sea inusualmente poderosa: construir un índice, almacenarlo como archivos y servirlo vía HTTP.

Nota desnapshot: el ecosistema avanza rápidamente. Los conteos de estrellas, las etiquetas de características y los números de rendimiento que aparecen a continuación son una captura de septiembre 2025, no un marcador atemporal. Úselos como referencia y, antes de basar una migración de producción en cualquier celda, verifique la documentación actual.

## Una base de datos con otro nombre

Estos almacenes sin servidor y compatibles con CDN son útiles para casos de escala media, aproximadamente de 1 000 a 1 000 000 de registros o unos pocos GB, donde la infraestructura de bases de datos tradicional puede suponer más ceremonia que valor:

- **Pagefind** (2022, ~4.5K ⭐): Enfoque totalmente estático – compila una vez, busca para siempre, sin requisitos de backend
- **Orama** (2023, ~8K ⭐): Solución universal que se ejecuta en cualquier lugar, desde navegadores hasta funciones serverless
- **Chroma** (2022, ~14K ⭐): Nativa de IA, diseñada específicamente para aplicaciones RAG
- **LanceDB** (2023, ~4K ⭐): Capacidades multimodales empresariales con arquitectura basada en disco
- **DuckDB-WASM** (2019, ~23K ⭐): Base de datos analítica completa en SQL que se ejecuta en navegadores mediante WebAssembly

El movimiento común es simple: mantener los datos duraderos en archivos o en almacenamiento de objetos y luego consultarlos desde un navegador, una función de borde, un worker o un servicio ligero. Eso no elimina la complejidad; la traslada a los pipelines de construcción, la frescura del índice, la invalidación de cachés y las capacidades del cliente. Lo cual es un intercambio perfectamente razonable cuando las lecturas dominan.

### Batalla de las casillas de verificación

| Feature | [Pagefind](https://pagefind.app) | [Orama](https://orama.com) | [Chroma](https://www.trychroma.com/) | [LanceDB](https://lancedb.com) | [DuckDB-WASM](https://duckdb.org/docs/api/wasm) |
|---------|----------|--------|---------|----------|----------|
| **Full-Text Search** | ✅ Advanced stemming | ✅ BM25, 30 languages | ✅ SQLite FTS | ✅ Tantivy | ✅ Full SQL |
| **Vector Search** | ❌ | ✅ Cosine similarity | ✅ HNSW | ✅ IVF_PQ, HNSW, GPU | ⚠️ Extensions |
| **AI/RAG Integrations** | None | ✅ Built-in pipeline | ✅ LangChain, LlamaIndex | ✅ Advanced reranking | ⚠️ Manual setup |
| **Storage** | Static JSON/WASM | Memory + S3 plugins | Server-based* | S3-compatible Lance | WASM + S3/HTTP |
| **Write Support** | Build-time only | Full CRUD | Full CRUD | Full CRUD | Full SQL CRUD |
| **Performance** | Sub-100ms | 0.0001ms - 100ms | Sub-100ms | 3-5ms vector, 50ms FTS | 10ms-1s (complex SQL) |

*Instantánea de septiembre 2025: Chroma necesita un entorno de servidor y no admite almacenamiento directo en objetos S3 como lo hacen las herramientas basadas en archivos estáticos ([issue #1736](https://github.com/chroma-core/chroma/issues/1736)).

### Ejemplos de implementación

Las diferencias de sintaxis revelan la verdadera división: búsqueda en tiempo de compilación, búsqueda en memoria, almacenamiento nativo de vectores, tablas multimodales y SQL en el navegador no pertenecen a la misma categoría de producto solo porque aparecen en demos de IA.

#### Búsqueda estática de sitio con Pagefind

```html
--- CHUNK END ---

<link href="../pagefind/pagefind-ui.css" rel="stylesheet">
<script src="../pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>new PagefindUI({ element: "#search" });</script>

#### Multimodal de nivel empresarial con LanceDB

**Código para crear una tabla LanceDB con incrustaciones automáticas de OpenAI:**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
import { LanceSchema, getRegistry } from "@lancedb/lancedb/embedding";
import { Utf8 } from "apache-arrow";

const db = await lancedb.connect("data/multimodal-db");
const func = getRegistry()
  .get("openai")
  ?.create({ model: "text-embedding-ada-002" });

// Esquema con generación automática de incrustaciones
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

**Ejemplo de consulta a una tabla LanceDB:**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
// "Conectar" a una ruta URL
const db = await lancedb.connect("data/multimodal-db");
const table = db.getTable("documents");

// Combinación de SQL + búsqueda vectorial
const results = await table.search("machine learning concepts")
  .where("category = 'research'")
  .limit(10)
  .toArray();

console.log(results);
```


#### Búsqueda universal con Orama
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
  mode: 'hybrid' // Combina búsqueda de texto + vector
})
```

**DuckDB-WASM:**
```typescript
import * as duckdb from "https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@latest/dist/duckdb-browser.mjs";
const bundle = await duckdb.selectBundle(duckdb.getJsDelivrBundles());
const worker = new Worker(bundle.mainWorker);
const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker);
await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

const conn = await db.connect();
await conn.query(`create table t as select * from (values (1,'hybrid search'),(2,'edge sql')) as v(id,txt);`);
// Opcional de texto completo:
await conn.query(`install fts; load fts; select * from t where match_bm25(txt, 'hybrid');`);
```

#### Búsqueda nativa de IA con Chroma  
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

## Guía de casos de uso

**Elija Pagefind cuando:**
- Construya documentación, blogs o bases de conocimiento
- Las actualizaciones de contenido son semanales o menos
- Necesita cero sobrecarga operativa y caché CDN perfecta
- *Ejemplo: Documentación de empresa con más de 10 k páginas que se actualizan mensualmente*

**Elija Orama cuando:**
- Construya paneles, comercio electrónico o aplicaciones dinámicas
- Necesite actualizaciones en tiempo real y rendimiento sub‑100 ms
- Quiere flexibilidad de despliegue desde navegadores hasta funciones edge
- *Ejemplo: SaaS con catálogos de productos dinámicos*

**Elija Chroma cuando:**
- Construya aplicaciones RAG o bases de conocimiento IA
- Necesite integraciones con LangChain/LlamaIndex
- La búsqueda semántica es la funcionalidad central
- *Ejemplo: Bot de soporte al cliente impulsado por IA*

**Elija LanceDB cuando:**
- Trabaje con datos multimodales (imágenes, audio, video)
- Necesite rendimiento empresarial a gran escala
- Requiera análisis complejos y reordenamiento
- *Ejemplo: Plataforma de medios con búsqueda semántica de video*

**Elija DuckDB-WASM cuando:**
- Necesite capacidades SQL completas en navegadores o funciones edge
- Trabaje con cargas analíticas y consultas complejas
- Quiera procesar archivos CSV/Parquet directamente desde S3
- *Ejemplo: Panel de inteligencia de negocio con consultas SQL ad‑hoc*

## La regla de decisión

La pregunta práctica no es “¿qué base de datos es la mejor?”

La pregunta práctica es: ¿qué tipo de cambio debe absorber el sistema?

- **Contenido reconstruible:** Pagefind, instantáneas Orama, archivos Lance, DuckDB sobre Parquet. Manténgalo estático hasta que duela.
- **Escrituras frecuentes:** Postgres, servidor Chroma, un servicio de búsqueda gestionado o una canalización de indexado basada en colas. Necesita coordinación, no buenas vibras.
- **Resultados específicos por usuario:** use un backend real. El almacenamiento de objetos no es un modelo de autorización.
- **Analítica sobre archivos:** DuckDB es absurdamente útil. Deje que SQL haga cosas de SQL.
- **Búsqueda multimodal o vectorial pesada:** LanceDB y Chroma valen la pena probar contra sus datos reales, no contra un benchmark de README.

El camino feliz es barato. Los casos límite deciden la arquitectura.

## El panorama más amplio

Estas herramientas reducen la infraestructura mínima viable para una búsqueda útil. Eso importa. En 2020, “búsqueda semántica” a menudo implicaba una pila de servicios, mucho código de pegamento y alguien explicando índices vectoriales en una reunión donde la mitad de la sala quería almorzar. En 2025, un equipo pequeño puede prototipar la misma idea de producto con archivos, incrustaciones y un fin de semana.

Eso no significa que cada cuadro de búsqueda deba convertirse en un sistema RAG. Significa que la primera versión ya no tiene que heredar infraestructura de producción antes de tener evidencia de producción.

Incluso AWS ha avanzado en esta dirección con trabajo de búsqueda vectorial adyacente a S3, lo que es una señal útil: el almacenamiento de objetos ya no es solo el ático donde van los archivos viejos. Se está convirtiendo en una superficie de consulta.

## Empiece a experimentar

1. **Elija primero el patrón de actualización**: compilación, lote horario, escrituras en vivo o resultados por usuario.
2. **Prototipe con la herramienta honesta más pequeña**: Pagefind para HTML estático, DuckDB para archivos analíticos, Orama para búsqueda ligera en apps, LanceDB o Chroma para trabajo vectorial pesado.
3. **Mida la parte fea**: tiempo de indexado, frescura, tamaño del bundle, permisos y la primera consulta tras un arranque en frío.
4. **Promocione solo cuando el dolor sea real**: una base de datos gestionada es más fácil de justificar después de que la versión basada en archivos muestre exactamente dónde se dobla.

*Consulte mi [guía práctica de Pagefind][1] para una implementación práctica, o explore el ecosistema creciente de bases de datos nativas en edge que están remodelando los datos a escala.*

> **Descargo de responsabilidad:** He usado Pagefind durante años y me convertí en colaborador en 2025. He experimentado con Orama y Chroma en proyectos más pequeños y estoy explorando LanceDB para aplicaciones de IA más grandes. No tengo vínculos financieros con estos proyectos—solo un interés agudo en el panorama evolutivo de bases de datos.

[1]: https://danlevy.net/you-might-not-need-algolia/
````
