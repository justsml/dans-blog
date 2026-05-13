# Translation Candidate
- Slug: serverless-database-magic
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-09-15--serverless-database-magic/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 11.99
- Input tokens: 6007
- Output tokens: 5738
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001858
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug serverless-database-magic --locale es
## Raw Output

````mdx
---
title: La ola de innovación en bases de datos de 2025
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

Aquí está la regla de decisión que hubiera deseado haber usado antes:

<p class="inset">Si tus datos pueden reconstruirse desde archivos y los usuarios los leen principalmente, prueba primero con una base de datos de almacenamiento en objetos. Si los usuarios la escriben todo el día, empieza con una base de datos real y deja de intentar que S3 haga de cuenta que es una.</p>

Esa es la línea útil. No "el futuro es sin servidor". No "las bases de datos vectoriales cambiaron todo". Ese tipo de frases ya han sido impresas en suficientes cintas de conferencias.

La IA sí cambió la forma de muchos problemas de búsqueda. De repente, equipos pequeños querían búsqueda semántica, clasificación híbrida, chat basado en documentos, búsquedas multimodales y análisis sobre archivos almacenados en almacenamiento en objetos. La respuesta antigua era "ejecuta Postgres con pgvector" o "gestiona OpenSearch/Elasticsearch" o "compra un servicio de búsqueda gestionado". Esas siguen siendo buenas respuestas cuando la carga de trabajo lo amerita.

Pero muchas cargas de trabajo no lo ameritan. Son de lectura intensiva, reconstruibles y tolerantes a un breve retraso entre que el contenido cambia y la búsqueda se actualiza. Documentación. Instantáneas de catálogos. Exportaciones estáticas. Bases de conocimiento internas. Análisis local. Sistemas prototipo de RAG. Para esas, una nueva clase de herramientas ha hecho que la arquitectura aburrida sea inusualmente poderosa: construye un índice, almacénalo como archivos y súbelo a través de HTTP.

Nota de captura: el ecosistema está cambiando rápidamente. Las estrellas, etiquetas de características y números de rendimiento que aparecen a continuación son una captura de septiembre de 2025, no un ranking eterno. Trátalos como una orientación, y revisa las documentaciones actuales antes de apostar una migración de producción a cualquier celda en concreto.

## Una base de datos por cualquier otro nombre

Estos almacenes de datos sin servidor y capaces de CDN son útiles para casos de tamaño medio, aproximadamente entre 1 000 y 1 000 000 registros o unos pocos gigabytes, donde la infraestructura tradicional de bases de datos puede ser más ceremonia que valor:

- **Pagefind** (2022, ~4.5K ⭐): Enfoque completamente estático - compila una vez, busca para siempre, sin requisitos de backend
- **Orama** (2023, ~8K ⭐): Solución universal que funciona desde navegadores hasta funciones sin servidor
- **Chroma** (2022, ~14K ⭐): Nativa de IA, construida específicamente para aplicaciones de RAG
- **LanceDB** (2023, ~4K ⭐): Capabilidades empresariales multimodales con arquitectura basada en disco
- **DuckDB-WASM** (2019, ~23K ⭐): Base de datos de análisis SQL completa que funciona en navegadores mediante WebAssembly

El movimiento común es sencillo: mantener los datos duraderos en archivos o almacenamiento de objetos, y luego consultarlos desde un navegador, función de borde, trabajador o servicio ligero. Eso no elimina la complejidad. Mueve la complejidad a las tuberías de construcción, frescura de los índices, invalidación de caché y capacidades del cliente. Que es un intercambio perfectamente válido cuando las lecturas dominan.

### Batalla de casillas de verificación

### Batalla de casillas de verificación

| Característica | [Pagefind](https://pagefind.app) | [Orama](https://orama.com) | [Chroma](https://www.trychroma.com/) | [LanceDB](https://lancedb.com) | [DuckDB-WASM](https://duckdb.org/docs/api/wasm) |
|---------|----------|--------|---------|----------|----------|
| **Búsqueda de texto completo** | ✅ Stemming avanzado | ✅ BM25, 30 idiomas | ✅ FTS de SQLite | ✅ Tantivy | ✅ SQL completo |
| **Búsqueda de vectores** | ❌ | ✅ Similitud coseno | ✅ HNSW | ✅ IVF_PQ, HNSW, GPU | ⚠️ Extensiones |
| **Integraciones de IA/RAG** | Ninguna | ✅ Pipeline integrado | ✅ LangChain, LlamaIndex | ✅ Reclasificación avanzada | ⚠️ Configuración manual |
| **Almacenamiento** | JSON/WASM estático | Memoria + plugins S3 | Basado en servidor* | Lance compatible con S3 | WASM + S3/HTTP |
| **Soporte de escritura** | Solo en tiempo de construcción | CRUD completo | CRUD completo | CRUD completo | CRUD SQL completo |
| **Rendimiento** | Menos de 100ms | 0.0001ms - 100ms | Menos de 100ms | 3-5ms vector, 50ms FTS | 10ms-1s (SQL complejo) |

*Instantánea de septiembre de 2025: Chroma requiere un entorno de ejecución de servidor y no soporta almacenamiento directo en S3 de la manera en que lo hacen las herramientas basadas en archivos ([problema #1736](https://github.com/chroma-core/chroma/issues/1736)).

### Ejemplos de implementación

Las diferencias sintácticas revelan la división real: la búsqueda en tiempo de construcción, la búsqueda en memoria, el almacenamiento nativo de vectores, las tablas multimodales y el SQL en el navegador no son la misma categoría de producto solo porque todos aparezcan en demostraciones de IA.

#### Búsqueda en sitio estático con Pagefind

```html
```

<link href="../pagefind/pagefind-ui.css" rel="stylesheet">
<script src="../pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>new PagefindUI({ element: "#search" });</script>
```

#### Multimodal a nivel empresarial con LanceDB

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

// Combinación de SQL y búsqueda vectorial
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
  mode: 'hybrid' // Combina texto + búsqueda vectorial
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
// Búsqueda de texto completo opcional:
await conn.query(`install fts; load fts; select * from t where match_bm25(txt, 'hybrid');`);
```

#### Búsqueda nativa para IA con Chroma  
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

**Elige Pagefind cuando:**
- Estés construyendo documentación, blogs o bases de conocimiento
- Los contenidos se actualicen semanalmente o menos
- Necesites cero sobrecarga operativa y caché perfecto en CDN
- *Ejemplo: Documentación corporativa con 10K+ páginas actualizadas mensualmente*

**Elige Orama cuando:**
- Estés construyendo dashboards, e-commerce o aplicaciones dinámicas
- Necesites actualizaciones en tiempo real y rendimiento sub-100ms
- Quieras flexibilidad de despliegue desde navegadores hasta funciones de edge
- *Ejemplo: SaaS con catálogos de productos dinámicos*

**Elige Chroma cuando:**
- Estés construyendo aplicaciones RAG o bases de conocimiento de IA
- Necesites integraciones con LangChain/LlamaIndex
- La búsqueda semántica sea funcionalidad clave
- *Ejemplo: Bot de soporte al cliente de IA*

**Elige LanceDB cuando:**
- Trabajes con datos multimodales (imágenes, audio, video)
- Necesites rendimiento empresarial a gran escala
- Se requieran análisis complejos y reordenamiento
- *Ejemplo: Plataforma de medios con búsqueda semántica de video*

**Elige DuckDB-WASM cuando:**
- Necesites capacidades completas de SQL en navegadores o funciones de edge
- Trabajes con cargas de trabajo analíticas y consultas complejas
- Quieras procesar archivos CSV/Parquet directamente desde S3
- *Ejemplo: Dashboard de inteligencia empresarial con consultas SQL ad hoc*

## La regla de decisión

La pregunta práctica no es "¿cuál es la mejor base de datos?"

La pregunta práctica es: ¿qué tipo de cambio debe absorber el sistema?

- **Contenido reconstruible:** Pagefind, instantáneas de Orama, archivos Lance, DuckDB sobre Parquet. Manténlo estático hasta que duela.
- **Escrituras frecuentes:** Postgres, servidor Chroma, un servicio de búsqueda gestionado o una tubería de indexación con cola. Necesitas coordinación, no vibes.
- **Resultados específicos por usuario:** usa un backend real. El almacenamiento de objetos no es un modelo de autorización.
- **Análisis sobre archivos:** DuckDB es absurdamente útil. Deja que SQL haga lo que le toca.
- **Búsqueda multimodal o con vectores pesados:** LanceDB y Chroma merecen probarlos contra tus datos reales, no contra benchmarks de README.

El camino feliz es barato. Los casos extremos deciden la arquitectura.

## El cuadro general

Estas herramientas reducen la infraestructura mínima viable para una búsqueda útil. Eso importa. En 2020, "búsqueda semántica" a menudo implicaba una pila de servicios, mucho código de pegamento y alguien explicando índices vectoriales en una reunión donde la mitad del equipo quería almorzar. En 2025, un equipo pequeño puede prototipar la misma idea de producto con archivos, incrustaciones y un fin de semana.

Eso no significa que cada cuadro de búsqueda deba convertirse en un sistema RAG. Significa que la primera versión ya no tiene que heredar infraestructura de producción antes de tener evidencia de producción.

Incluso AWS ha estado moviéndose en esta dirección con su trabajo de búsqueda vectorial asociado a S3, lo cual es una señal útil: el almacenamiento de objetos ya no es solo el sótano donde van los archivos antiguos. Se está convirtiendo en una superficie de consulta.

## Comienza a experimentar

1. **Elige primero el patrón de actualización**: construcción, lote horario, escrituras en vivo o resultados por usuario.
2. **Prototipa con la herramienta más honesta y pequeña**: Pagefind para HTML estático, DuckDB para archivos analíticos, Orama para búsqueda en aplicaciones ligeras, LanceDB o Chroma para trabajo con vectores.
3. **Mide la parte fea**: tiempo de indexación, frescura, tamaño del paquete, permisos y la primera consulta tras un inicio frío.
4. **Promueve solo cuando el dolor sea real**: una base de datos gestionada es más fácil de justificar después de que la versión basada en archivos muestre exactamente dónde se dobla.

*Echa un vistazo a mi [guía práctica de Pagefind][1] para una implementación hands-on, o explora el creciente ecosistema de bases de datos nativas de edge que están redefiniendo el manejo de datos a gran escala.*

> **Aviso:** He utilizado Pagefind durante años y me convertí en colaborador en 2025. He experimentado con Orama y Chroma para proyectos pequeños y estoy explorando LanceDB para aplicaciones de IA más grandes. No tengo intereses financieros en estos proyectos, solo interés en la evolución del paisaje de bases de datos.

[1]: https://danlevy.net/you-might-not-need-algolia/
````
