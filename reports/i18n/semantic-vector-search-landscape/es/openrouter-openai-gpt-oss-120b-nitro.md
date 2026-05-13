# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/es/index.mdx
- Validation: passed
- Runtime seconds: 21.51
- Input tokens: 19044
- Output tokens: 7728
- Thinking tokens: unknown
- Cached input tokens: 3072
- Cache write tokens: 0
- Estimated cost: $0.002134
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Búsqueda semántica vectorial y otros temas para conquistar amigos y amantes
subTitle: >-
  El panorama completo de búsqueda: exacta, difusa, semántica, híbrida — y
  cuándo combinarlas.
date: '2026-05-01'
modified: '2026-05-04'
tags:
  - postgres
  - postgresql
  - pgvector
  - vector-search
  - semantic-search
  - hybrid-search
  - rag
  - ai
  - databases
  - search
  - embeddings
category: Code
subCategory: Databases
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
La búsqueda no es una sola cosa, y la búsqueda semántica no reemplaza al resto.

“Buscar usuario con el correo `dan@example.com`” y “encuentra artículos sobre depuración como nuevo ingeniero” se describen ambas como búsqueda, pero prácticamente no comparten problemas de ingeniería. La primera tiene una respuesta correcta y una búsqueda en índice `O(log n)`. La segunda no tiene una respuesta correcta —solo relevancia— y requiere comprender el lenguaje, la intención y el significado.

Los ingenieros que resultan más persuasivos en decisiones de búsqueda —los que ganan los debates y entregan el sistema adecuado— entienden todo el panorama. Saben qué herramienta usar y por qué, y pueden explicarlo con claridad.

Este artículo cubre la capa semántica: qué hace realmente la búsqueda vectorial, cuándo sobresale y dónde debe mantenerse al margen. La versión útil no es “incrustar todo”. Consiste en saber cuándo los vectores deben convivir con la búsqueda léxica, difusa y de coincidencia exacta en una arquitectura híbrida.

La mitad léxica y difusa del panorama —`tsvector`, `pg_trgm`, `pg_search`— está en la [Guía de Búsqueda de Texto en Postgres 2026](/postgres-text-search-guide).

## Términos de un vistazo

**Embedding** — Una lista densa de números de punto flotante generada por un modelo, que representa un fragmento de texto (o imagen, audio, etc.) como un punto en un espacio de alta dimensión. El contenido semánticamente relacionado queda cercano; el contenido no relacionado queda lejos.

**Búsqueda léxica** — Búsqueda basada en coincidencia exacta de palabras y tokens. Rápida, determinista y correcta para términos conocidos. No comprende sinónimos, paráfrasis ni equivalentes entre idiomas.

**Búsqueda semántica** — Búsqueda basada en el significado más que en los tokens. Una consulta como “cómo manejo los timeouts” puede coincidir con un documento titulado “configuración de políticas de reintento” sin compartir palabras, porque sus embeddings están geométricamente cercanos.

**Vector** — Una lista de números. En contextos de búsqueda, la salida de un modelo de embedding. La “búsqueda vectorial” encuentra los vectores más próximos a un vector de consulta mediante distancia geométrica.

**FTS (Full-Text Search)** — La búsqueda léxica integrada de Postgres, impulsada por `tsvector` / `tsquery`. Tokeniza, hace stemming y crea índices de texto para consultas de palabras clave. Fuerte para prosa y búsqueda de términos exactos; ciega al significado.

**BM25** — Un algoritmo de clasificación para búsqueda léxica (usado por Elasticsearch, Qdrant y otros). Puntúa resultados según la frecuencia del término ponderada por lo rara que es la palabra en el corpus. Mejor que la coincidencia de palabras clave cruda; sigue siendo léxico.

**HNSW (Hierarchical Navigable Small World)** — El índice estándar de vecinos más cercanos aproximado para búsqueda vectorial. Construye un grafo de proximidad en capas para consultas de similitud rápidas y de alto recall. pgvector, Qdrant, Weaviate y la mayoría de los demás lo utilizan.

**RRF (Reciprocal Rank Fusion)** — Un algoritmo para combinar listas de resultados ordenados provenientes de múltiples sistemas de recuperación. Usa solo la posición de rango — no se necesita normalización de puntuaciones. Un resultado que ocupa un puesto alto tanto en la lista FTS como en la vectorial obtiene una puntuación combinada más fuerte que uno que domina solo una de ellas.

---

## Qué Hace Realmente la Búsqueda Semántica

Los embeddings vectoriales convierten texto (o imágenes, audio, etc.) en una lista de números — un punto en un espacio de alta dimensión. Un modelo de embedding se entrena de modo que textos semánticamente relacionados queden próximos en ese espacio. “Dog” y “canine” terminan cerca. “Running a marathon” y “running a Python script” quedan lejos, a pesar de compartir una palabra.

La búsqueda de similitud en ese espacio encuentra documentos cuyo *significado* está más próximo al significado de la consulta, sin importar la coincidencia exacta de palabras.

Esto implica:
- “¿Cómo configuro los timeouts de solicitud?” puede coincidir con un artículo titulado “Estableciendo límites de conexión y políticas de reintento” — sin palabras clave superpuestas, alta relevancia conceptual
- “Algo ligero para una noche de verano” puede coincidir con una recomendación de vino sin que aparezcan palabras clave en la descripción del producto
- Una consulta en inglés puede coincidir con documentos relevantes en francés, español o japonés si el modelo de embeddings se entrenó multilingüe

La búsqueda léxica (`tsvector`, `pg_trgm`) no puede hacer nada de esto. Opera sobre palabras y caracteres, no sobre significado. Las herramientas no son intercambiables — resuelven problemas diferentes.

---

## Cuando pgvector gana

**Construyendo RAG.** Retrieval‑Augmented Generation recupera los fragmentos de documento cuyo significado está más cercano a la pregunta del usuario, y luego los pasa a un modelo de lenguaje como contexto. Este paso de recuperación es una operación vectorial. La búsqueda de texto completo (FTS) pasará por alto paráfrasis, sinónimos y coincidencias conceptuales que un fragmento relevante podría expresar de forma distinta. La ventaja de pgvector sobre un almacén vectorial independiente: se ejecuta dentro de tu instancia de Postgres existente — sin servicio separado que desplegar, operar o sincronizar datos.

**Los usuarios describen lo que quieren, no lo que deben buscar.** “Artículos sobre cómo ganar confianza como nuevo gerente” no contiene palabras clave que aparezcan de forma fiable en las publicaciones relevantes. “Un framework ligero para manejar efectos secundarios” puede no usar esas palabras exactas en la documentación. La búsqueda vectorial coincide con la intención, no con la ortografía.

**Encontrar elementos similares.** Productos relacionados, tickets de soporte parecidos, informes de bugs duplicados, artículos que también podrían interesarte. “Buscar incidencias similares a esta” es una búsqueda de vecinos más cercanos: incrusta el elemento y encuentra sus vecinos geométricos. Una advertencia importante: la búsqueda vectorial siempre devuelve resultados, incluso cuando nada es realmente similar. Para casos de deduplicación y recomendación, filtra por un umbral mínimo de similitud (p. ej., similitud coseno ≥ 0,80) para evitar presentar coincidencias de baja confianza como si fueran significativas.

**Deduplicación semántica.** Antes de indexar contenido para RAG o búsqueda, a menudo es necesario identificar near‑duplicates en el corpus: artículos revisados múltiples veces, tickets de soporte presentados dos veces, entradas de base de conocimientos que se solapan considerablemente. Incrusta los documentos y aplica un filtro de umbral por similitud coseno para marcar o fusionar near‑duplicates antes de que contaminen tu índice. Esto evita que la recuperación devuelva varios fragmentos casi idénticos y diluya la ventana de contexto.

**Búsqueda multilingüe.** Los modelos de incrustación multilingüe mapean contenido semánticamente equivalente entre idiomas a vectores cercanos. Una consulta en español para “perder peso” puede coincidir con un artículo en inglés sobre “sustainable weight loss habits”: no comparten tokens, pero comparten el mismo significado subyacente. FTS requiere configuración de diccionarios por idioma y maneja pobremente consultas cruzadas de idioma. `pg_trgm` es agnóstico al idioma, pero ortográfico, no semántico.

### Configuración de pgvector

Desde la instalación de la extensión hasta la consulta de similitud, la configuración se reduce a unas cuantas sentencias SQL:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- HNSW suele ser el primer índice a probar para conjuntos de datos de tamaño moderado
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);

-- Consulta de búsqueda semántica
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

`<=>` es distancia coseno. `1 - cosine_distance` produce similitud coseno (1.0 = idéntico, 0.0 = ortogonal). Para `ivfflat` (la alternativa más antigua y rápida de construir), usa `lists = sqrt(row_count)` como punto de partida.

### Lo que pgvector no maneja bien

- Coincidencia exacta de tokens — SKUs de productos, códigos de error, nombres de funciones. `ORD-12345` no es semánticamente similar a nada. Una búsqueda basada en embeddings puede devolver `ORD-12344` o nada relevante. Usa FTS o un índice B‑tree.
- Nombres y nombres propios. El espacio de embeddings se organiza por significado, no por ortografía. El registro de usuario “Micheal Jordan” no necesariamente queda cerca de “Michael Jordan” en el espacio vectorial.
- Cadenas cortas donde la similitud a nivel de carácter importa más que el significado. `pg_trgm` cubre este caso.
- Consultas donde el término exacto debe aparecer. BM25 y FTS son más fiables para coincidencias de términos conocidos.

---

## Búsqueda híbrida: El caso para ambos

La documentación técnica es el ejemplo más claro donde ninguna herramienta basta por sí sola.

Los usuarios que buscan “how to configure timeouts” necesitan coincidencia conceptual: un artículo titulado “Setting retry policies and connection limits” no comparte palabras clave, pero es exactamente lo que requieren.

Los mismos usuarios también buscan `withRetry()`, `ECONNRESET` y `ERR_SOCKET_TIMEOUT`. Estas cadenas exactas deben aparecer — la coincidencia semántica puede no encontrarlas de forma fiable, y un falso positivo (conceptualmente similar pero no la API correcta) resulta engañoso.

La búsqueda vectorial gestiona las consultas conceptuales. FTS gestiona los términos exactos. Ninguno de los dos lo hace bien por sí solo.

La solución es la búsqueda híbrida: ejecutar ambas y fusionar los resultados.

### Fusión de Ranking Recíproco

**Reciprocal Rank Fusion (RRF)** es el algoritmo estándar para combinar listas ordenadas de diferentes sistemas de recuperación. No requiere normalizar puntuaciones entre sistemas — solo usa las posiciones de ranking. Un resultado que aparece alto en *ambas* listas obtiene una puntuación combinada más fuerte que uno que domina solo una.

```sql
WITH fts_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, query) DESC) AS rank
  FROM documents, to_tsquery('english', $1) query
  WHERE search_vector @@ query
  LIMIT 50
),
vector_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(f.id, v.id) AS id,
    COALESCE(1.0 / (60 + f.rank), 0) +
    COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM fts_results f
  FULL OUTER JOIN vector_results v ON f.id = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

El `60` en el denominador es la constante de RRF. Valores mayores atenúan las diferencias de posición en el ranking; valores menores las amplifican. El valor predeterminado de 60 funciona bien para la mayoría de los tipos de contenido.

RRF evita el problema más complejo de normalizar `ts_rank` (una puntuación de log‑frecuencia) frente a la distancia coseno (una medida geométrica). No son comparables. RRF solo se pregunta: “¿qué tan alto apareció este resultado en cada lista?”

### Búsqueda Híbrida con Trigramas También

Para búsquedas orientadas al usuario sobre contenido mixto — donde los usuarios pueden buscar un nombre de persona, un concepto o un término exacto en la misma sesión — la fusión de tres vías cubre todo:

```sql
WITH trgm_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY similarity(title, $1) DESC) AS rank
  FROM documents
  WHERE title % $1
  LIMIT 50
),
fts_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, to_tsquery('english', $1)) DESC) AS rank
  FROM documents
  WHERE search_vector @@ to_tsquery('english', $1)
  LIMIT 50
),
vector_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(t.id, f.id, v.id) AS id,
    COALESCE(1.0 / (60 + t.rank), 0) +
    COALESCE(1.0 / (60 + f.rank), 0) +
    COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM trgm_results t
  FULL OUTER JOIN fts_results f ON t.id = f.id
  FULL OUTER JOIN vector_results v ON COALESCE(t.id, f.id) = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

Esto cubre: coincidencias difusas de nombres (trigramas), coincidencias exactas de palabras clave (FTS) y consultas conceptuales (vectores). Una única caja de búsqueda puede atender los tres intentos del usuario.

## Arquitecturas híbridas de múltiples capas

Las aplicaciones reales rara vez tienen una única superficie de búsqueda. Tienen varias, cada una con una necesidad distinta:

| Superficie | Qué consultan los usuarios | Capas recomendadas |
|---|---|---|
| Búsqueda en blogs / documentación | Palabras clave + conceptos | FTS + pgvector (RRF) |
| Búsqueda de nombre de usuario/cliente | Nombres con errores tipográficos | `pg_trgm` |
| Búsqueda de productos | Nombres, descripciones, “similar a” | `pg_trgm` + FTS + pgvector |
| Dedupe de tickets de soporte | “Problemas similares a este” | solo pgvector |
| Búsqueda interna de SKU/pedidos | Identificadores exactos | Índice B‑tree |
| RAG sobre una base de conocimiento grande | Preguntas en lenguaje natural | pgvector (documentos fragmentados) |
| “También te puede interesar” en e‑commerce | Similaridad conductual + semántica | pgvector |
| Autocompletar | Prefijo, tolerancia a errores ortográficos | `pg_trgm` |

Esto no es hipotético. La mayoría de las aplicaciones con mucho contenido necesitan al menos dos superficies de búsqueda distintas con formas de consulta diferentes. La tentación es elegir un solo enfoque y aplicarlo en todas partes — normalmente búsqueda vectorial ahora, porque es la opción de moda. Eso genera embeddings costosos para problemas donde un índice de trigramas habría sido más rápido, barato y correcto.

### Regla práctica

Añade una capa cuando aparezca un modo de falla que la capa actual no pueda resolver:

- Los usuarios se quejan de que los errores tipográficos no coinciden → añada `pg_trgm`  
- Los usuarios buscan por concepto y se pierden resultados relevantes → añada pgvector  
- Los usuarios buscan símbolos o códigos exactos y obtienen resultados conceptuales en su lugar → añada FTS o verifique si está sobre‑dependiendo de la búsqueda vectorial  
- La latencia se vuelve un problema → evalúe pre‑filtrado, índices aproximados o un almacén dedicado  

## Si realmente necesita un almacén vectorial dedicado

pgvector cubre gran parte de la búsqueda de aplicación antes de que necesite otra base de datos. El punto de corte aproximado depende del número de vectores, la configuración del índice, la tasa de escritura, los filtros, el hardware y la concurrencia, así que trate cualquier regla de “menos de 10 M de vectores” como una suposición inicial para hacer benchmarks, no como un límite del producto. Cuando realmente lo supera — concurrencia muy alta, requisitos de latencia p99 muy bajos, miles de millones de vectores, o necesidades serias de aislamiento multi‑tenant — el panorama de bases de datos vectoriales dedicadas es amplio y vale la pena entenderlo.  

### Qué significan realmente las columnas de la matriz

**Búsqueda híbrida** significa que la búsqueda por palabras clave BM25 y la similitud vectorial se ejecutan en una sola consulta, fusionadas mediante RRF. Sin ella, o elige un modo de búsqueda o fusiona dos consultas por su cuenta.

**Sparse vectors** van más allá de BM25. Un vector disperso SPLADE tiene ~30 000 dimensiones (una por término del vocabulario), ~98 % ceros. Las posiciones distintas de cero indican qué términos importan y cuánto. Una consulta por “dogs” también pondera “canine” y “pet” — precisión a nivel BM25 más expansión de términos dentro de un índice vectorial. Si esta columna es falsa, necesitas una capa FTS separada para consultas de término exacto.

```python
# SPLADE: ~30,000 dims, ~60 non-zero — only relevant vocabulary positions fire
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL-like** es realmente filtrado. La búsqueda vectorial sin filtrado es una demo. Aún necesitas alcance de inquilino, rangos de fechas, permisos y filtros de categoría. SQL completo (pgvector, LanceDB) lo expresa junto a tus joins existentes. Las bases de datos diseñadas específicamente usan objetos de filtro JSON (Qdrant, Pinecone), un DSL de consulta (Elasticsearch, Milvus) o GraphQL (Weaviate). Funcionan; SQL se vuelve más atractivo a medida que la lógica de filtrado se complica.

```sql
-- pgvector: vector similarity is just another expression
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2
  AND category = ANY($3::text[])
  AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1
LIMIT 10;
```

```python
# Qdrant: equivalent filter as a Python object — same result, more ceremony
results = client.query_points(
    collection_name="documents", query=query_embedding,
    query_filter=models.Filter(must=[
        models.FieldCondition(key="tenant_id", match=models.MatchValue(value=tenant_id)),
        models.FieldCondition(key="category",  match=models.MatchAny(any=categories)),
        models.FieldCondition(key="created_at", range=models.DatetimeRange(gte=cutoff)),
    ]),
    limit=10,
)
```

**Multimodal native** significa que la base de datos incluye modelos de incrustación para contenido no textual. Le entregas una URL de imagen cruda; ella se encarga de la vectorización. La mayoría de las bases de datos son agnósticas a la incrustación — tú controlas la canalización de embeddings. Marqo y Weaviate (a través de módulos CLIP/ImageBind) cierran este bucle.

```python
# Marqo: POST raw images, query with text — no external embedding step
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Returns shoe-001 despite zero keyword overlap — CLIP handles the cross-modal match
```

**Disk-based index** es una palanca de costo. Los índices HNSW residentes en RAM pueden requerir varios GB de RAM por millón de vectores de 1536 dimensiones cuando se cuentan los vectores crudos, la sobrecarga del grafo y los metadatos. Las alternativas nativas en disco (Milvus DiskANN, Elasticsearch DiskBBQ, el formato Lance de LanceDB, la capa de almacenamiento de objetos de Turbopuffer) suelen intercambiar algo de latencia de consulta por menor costo de infraestructura. Para cargas de trabajo RAG donde la latencia del modelo ya domina, ese intercambio suele valer la pena medir.

**Max dimensions** es una limitación oculta en tu arquitectura. `text-embedding-3-large` usa 3072 dims, Jina v3 puede emitir embeddings mayores, y los modelos de investigación siguen aumentando la dimensionalidad. Algunos servicios gestionados publican límites duros de dimensión; otros documentan límites altos o ninguna restricción práctica para los modelos típicos. Revisa la documentación actual antes de comprometerte. Elige algo con margen; migrar un índice vectorial porque alcanzaste el techo de dimensiones es una sprint dolorosa.

_Last verified against public project docs and product pages on May 8, 2026. Treat the table below as a decision aid, not a substitute for checking current limits, pricing, and managed-service feature flags._

### El panorama

| Base de datos | Despliegue | Licencia | Búsqueda híbrida | Vectores dispersos | SQL / similar a SQL | Multimodal | Índice en disco | Dimensiones máx. | Punto dulce |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Auto‑alojado / gestionado (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manual (RRF vía SQL) | ❌ | ✅ SQL completo | ❌ | ✅ HNSW en disco | 16 000 almacenamiento; 2 000 `vector` indexados | Ya en Postgres; recuentos de vectores moderados |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Auto‑alojado / Nube | Apache 2.0 | ✅ BM25 nativo | ✅ Soporte maduro | ❌ (REST/gRPC) | ❌ | ✅ | 65 535 | Consultas filtradas a gran escala; metadatos complejos |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Auto‑alojado / Nube | BSD 3 | ✅ BM25 nativo + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ mediante módulos | ✅ | 65 535 | Patrones de acceso GraphQL; vectorización incorporada |
| **[Pinecone](https://www.pinecone.io/)** | Sólo nube | Propietaria | ✅ (añadido 2024) | ✅ | ❌ | ❌ | ✅ (serverless) | 20 000 | Simplicidad gestionada; sin equipo de ops |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Auto‑alojado / Nube (Zilliz) | Apache 2.0 | ✅ Nativo | ✅ | ✅ Similar a SQL (Milvus Query Language) | ✅ | ✅ DiskANN | 32 768 | Escala de miles de millones; empresa on‑prem |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embebido / auto‑alojado | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65 535 | Sólo desarrollo local y prototipado |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embebido / Nube | Apache 2.0 | ✅ | ❌ | ✅ SQL vía DataFusion | ✅ Nativo | ✅ (formato Lance) | Ilimitado | Edge / serverless; lago multimodal |
| **[Orama](https://github.com/oramasearch/orama)** | Embebido / Nube | Apache 2.0 | ✅ Texto completo + vector | ❌ | ❌ | ❌ | ❌ | Variable | Apps JS/edge; búsqueda ligera de sitio/aplicación |
| **[Turbopuffer](https://turbopuffer.com/)** | Sólo nube (serverless) | Propietaria | ✅ BM25 + vector | ❌ | ❌ | ❌ | ✅ (almacenamiento de objetos) | 16 000 | SaaS multitenante; millones de espacios de nombres |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Auto‑alojado / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER disperso | ✅ (ELSER) | ✅ DSL de consultas | ❌ | ✅ DiskBBQ | 4 096 | Ya en Elastic stack; búsqueda híbrida empresarial |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Auto‑alojado / gestionado por AWS | Apache 2.0 | ✅ RRF + Búsqueda neuronal | ✅ | ✅ DSL de consultas | ❌ | ✅ FAISS + HNSW | 16 000 | Nativo de AWS; alternativa open‑source a Elastic |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Auto‑alojado / Nube | Apache 2.0 | ✅ Nativo | ✅ Tensores / ranking léxico | ✅ YQL | ✅ Tensores | ✅ | Efectivamente ilimitado | Búsqueda + ranking + sistemas de recomendación |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Auto‑alojado / Nube | Apache 2.0 | Manual | ❌ | ✅ SQL completo | ❌ | ✅ Columnar + HNSW | Variable | Analítica / logs con búsqueda vectorial junto a OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Nube / auto‑alojado | SSPL | ✅ Incorporado | ❌ | ✅ MQL + agregación | ❌ | ✅ HNSW | 8 192 | Ya en MongoDB; documento + vector en uno |
| **[Redis (VSS)](https://github.com/redis/redis)** | Auto‑alojado / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ Sólo RAM | 32 768 | Latencia ultra‑baja; capa de caché para búsqueda vectorial |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Nube / auto‑alojado | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Enfoque nativo multimodal | ✅ | Variable | Multimodal de extremo a extremo: imagen + texto + video |

### Algunas cosas que no caben en la tabla

**El multitenancy de Turbopuffer** se construye alrededor de recuentos de espacios de nombres extremadamente altos. Su posicionamiento público y casos de uso resaltan cargas como el corpus masivo y con muchos espacios de nombres de Notion. Si cada usuario u organización necesita una búsqueda vectorial aislada, esa arquitectura puede cambiar la economía, pero aun así evalúa tu propia forma de inquilinos.

**El modo embebido de LanceDB** es lo más cercano a “SQLite para búsqueda vectorial”. Se ejecuta en proceso, no requiere servidor y funciona en Lambda, Cloudflare Workers y entornos edge. El formato columnar de Lance hace que la operación embebida sea práctica a escala real.

**Chroma es más fuerte en desarrollo/pruebas y despliegues de aplicaciones pequeñas.** Si apuntas a corpora muy grandes, alta disponibilidad, operación intensiva en disco o búsqueda híbrida de primera clase, evalúa una tienda orientada a producción antes de promover el prototipo a infraestructura.

**Vespa es lo que eliges cuando la recuperación es solo la mitad del producto.** Combina recuperación léxica, búsqueda de vecinos más cercanos, tensores, expresiones de ranking, agrupamiento y servicio en línea. Ese poder es real, pero también lo es la complejidad operativa y de modelado. Encaja mejor con equipos de búsqueda/recomendación que con “añadir búsqueda semántica a mi app CRUD”.

**ClickHouse pertenece a la conversación cuando la búsqueda está vinculada a analítica.** Si tu fuente de verdad son eventos, logs, trazas o métricas, ClickHouse mantiene la distancia vectorial, filtrado, agregación y un indexado de texto completo serio en un único motor SQL. No es una base de datos vectorial diseñada específicamente, pero a menudo es la respuesta aburrida‑correcta para la recuperación analítica.

**Los vectores dispersos son la forma de obtener coincidencias de palabras clave de calidad BM25 dentro de un índice vectorial** — sin ejecutar un motor de texto completo separado. Qdrant y Elasticsearch tienen implementaciones especialmente maduras aquí. Si la búsqueda híbrida es crítica y una arquitectura de dos sistemas es un obstáculo, el soporte de vectores dispersos es lo que debes buscar.

### Elegir cuando has superado pgvector

- **Producto SaaS con aislamiento por inquilino** → Turbopuffer  
- **Filtrado de metadatos complejo a gran escala** → Qdrant  
- **Ya usas Elastic/ELK stack** → Elasticsearch con DiskBBQ  
- **Entorno AWS que quiere código abierto** → OpenSearch  
- **Plataforma de búsqueda/recomendación con necesidades serias de ranking** → Vespa  
- **Analítica, observabilidad, búsqueda de logs/eventos** → ClickHouse  
- **Escala de miles de millones on‑prem / auto‑alojado** → Milvus  
- **Edge / serverless / multimodal** → LanceDB  
- **Aplicación JS pequeña, sitio de documentación o UX de búsqueda nativa en edge** → Orama  
- **Cero operaciones, el costo es secundario** → Pinecone  
- **Primero multimodal (imágenes, video, audio)** → Marqo  
- **Ya usas MongoDB** → Atlas Vector Search  
- **Ya usas Postgres, necesitas más capacidad** → Supabase Vector o Neon (ambos pgvector gestionados, con mejores herramientas)

## La única cosa que no debes hacer

No uses la búsqueda vectorial como búsqueda difusa de texto para cosas que tienen respuestas correctas.

"Encuentra al usuario con el correo `dan@example.com`" no es un problema de búsqueda vectorial. "Encuentra el pedido con ID `ORD-12345`" tampoco lo es. Incrustar `ORD-12345` y buscar por similitud coseno devolverá *algo*, pero puede ser incorrecto. Un identificador tiene una respuesta correcta. Un emparejamiento aproximado de un identificador es un error.

La búsqueda vectorial devuelve el elemento *más similar* en tu conjunto de datos, incluso cuando nada es realmente relevante. No sabe cuándo no existe una buena respuesta. Eso está bien para documentos relacionados. Es un problema serio para la búsqueda exacta de registros, donde una respuesta errónea y segura es peor que un resultado vacío.

Lo mismo se aplica en sentido inverso: no uses Búsqueda de Texto Completo (FTS) para consultas donde el usuario describe un concepto. "artículos sobre tomar decisiones difíciles bajo incertidumbre" no contiene palabras clave fiables. FTS devolverá ruido o nada. Usa la herramienta adecuada para la forma de la consulta.

## The Full Picture

Most production search systems need more than one layer:

- **`pg_trgm`** for names, typos, autocomplete
- **FTS / `pg_search`** for keyword-based prose search
- **pgvector** for semantic and conceptual queries
- **RRF fusion** for surfaces where users mix query types
- **Regular indexes** for exact identifiers, filters, and sorted lists

These are not competing tools. They're complementary. A well-built search system picks the right layer for each query shape — and when query shapes overlap, it runs multiple layers and fuses the results.

The teams that ship good search features understand the whole stack. The ones that don't reach for a vector database, embed everything, and wonder why exact lookups sometimes return the wrong record.
````
