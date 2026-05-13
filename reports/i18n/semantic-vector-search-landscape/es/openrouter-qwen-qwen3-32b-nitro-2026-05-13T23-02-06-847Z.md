# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/es/index.mdx
- Validation: deferred
- Runtime seconds: 49.11
- Input tokens: 17894
- Output tokens: 19676
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.006154
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Búsqueda de vectores semánticos y otros temas para hacer amigos y conquistar
subTitle: >-
  El panorama completo de búsqueda: exacta, borrosa, semántica, híbrida — y
  cuándo combinarlas todas.
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
La búsqueda no es una sola cosa, y la búsqueda semántica no es un reemplazo para el resto.  

"Encuentra al usuario con correo electrónico `dan@example.com`" y "encuentra artículos sobre depuración para nuevos ingenieros" se describen ambos como búsquedas, pero como problemas de ingeniería tienen casi nada en común. La primera tiene una respuesta correcta y una búsqueda de índice con complejidad `O(log n)`. La segunda no tiene una respuesta correcta, solo relevancia, y requiere comprender lenguaje, intención y significado.  

Los ingenieros más persuasivos en decisiones de búsqueda — los que ganan los argumentos y despliegan el sistema correcto — comprenden todo el panorama. Saben qué herramienta usar y por qué, y pueden explicarlo claramente.  

Este artículo cubre la capa semántica: qué hace realmente la búsqueda por vectores, cuándo triunfa y dónde debe mantenerse al margen. La versión útil no es "incrustar todo". Es saber cuándo los vectores deben complementar la búsqueda léxica, difusa y de coincidencia exacta en una arquitectura híbrida.  

La mitad léxica y difusa del panorama — `tsvector`, `pg_trgm`, `pg_search` — se explica en la [Guía de Búsqueda de Texto en Postgres 2026](../postgres-text-search-guide).  

## Términos a un vistazo  

**Incrustación** — Una lista densa de números de punto flotante generada por un modelo, que representa un fragmento de texto (o imagen, audio, etc.) como un punto en un espacio de alta dimensión. El contenido semánticamente relacionado se sitúa cerca; el no relacionado, lejos.  

**Búsqueda léxica** — Búsqueda basada en coincidencia exacta de palabras y tokens. Rápida, determinista y precisa para términos conocidos. No entiende sinónimos, paráfrasis ni equivalentes entre idiomas.  

**Búsqueda semántica** — Búsqueda basada en significado, no en tokens. Una consulta como "¿cómo manejo tiempos de espera?" puede coincidir con un documento titulado "configuración de políticas de reintento" sin palabras compartidas, porque sus incrustaciones están geométricamente cercanas.

**Vector** — Una lista de números. En contextos de búsqueda, la salida de un modelo de incrustación. "Búsqueda vectorial" encuentra los vectores más cercanos a un vector de consulta por distancia geométrica.

**FTS (Búsqueda de texto completo)** — Búsqueda léxica integrada en Postgres, impulsada por `tsvector` / `tsquery`. Tokeniza, lematiza e indexa texto para consultas por palabras clave. Fuerte para prosa y búsqueda de términos exactos; ciega al significado.

**BM25** — Un algoritmo de clasificación para búsqueda léxica (usado por Elasticsearch, Qdrant y otros). Califica los resultados por frecuencia de término ponderada contra lo raro que es el término en el corpus. Mejor que coincidencia bruta de palabras clave; aún así léxico.

**HNSW (Mundo Pequeño Navegable Jerárquico)** — El índice estándar de vecino más cercano aproximado para búsqueda vectorial. Construye un grafo de proximidad en capas para consultas de similitud rápidas y con alta recuperación. pgvector, Qdrant, Weaviate y la mayoría usan este enfoque.

**RRF (Fusión por Rango Recíproco)** — Un algoritmo para fusionar listas de resultados clasificados de múltiples sistemas de recuperación. Usa solo la posición de rango — no se requiere normalización de puntuaciones. Un resultado que clasifica alto tanto en FTS como en listas vectoriales obtiene una puntuación combinada más fuerte que uno que domina solo uno.

---

## Qué hace realmente la búsqueda semántica

Las incrustaciones vectoriales convierten texto (o imágenes, audio, etc.) en una lista de números — un punto en un espacio de alta dimensionalidad. Un modelo de incrustación se entrena para que el texto semánticamente relacionado quede cerca en ese espacio. "Perro" y "canino" terminan cerca. "Correr una maratón" y "correr un script de Python" terminan lejos a pesar de compartir una palabra.

La búsqueda de similitud en ese espacio encuentra documentos cuyo *significado* es más cercano al significado de la consulta, independientemente de la superposición exacta de palabras.

Esto significa:
- "¿Cómo configuro tiempos de espera de solicitudes?" puede coincidir con un artículo titulado "Configuración de límites de conexión y políticas de reintento" — sin palabras clave superpuestas, alta relevancia conceptual
- "Algo ligero para una noche de verano" puede coincidir con una recomendación de vino sin que aparezcan palabras clave en la descripción del producto
- Una consulta en inglés puede coincidir con documentos relevantes en francés, español o japonés si el modelo de incrustación fue entrenado multilingüe

Búsqueda léxica (`tsvector`, `pg_trgm`) no puede hacer ninguno de esto. Opera sobre palabras y caracteres, no sobre significado. Las herramientas no son intercambiables — resuelven problemas diferentes.

---

## Cuando pgvector gana

**Construir RAG.** La Generación Aumentada con Recuperación (RAG) recupera los fragmentos de documento cuyo significado es más cercano a la pregunta del usuario, luego los pasa a un modelo de lenguaje como contexto. Este paso de recuperación es una operación vectorial. La búsqueda de texto completo (FTS) omitirá paráfrasis, sinónimos y coincidencias conceptuales que un fragmento relevante podría expresar de manera diferente. La ventaja de pgvector sobre un almacén vectorial independiente: ejecuta dentro de tu instancia existente de Postgres — no hay servicio separado que desplegar, operar o sincronizar datos.

**Los usuarios describen lo que quieren, no lo que buscar.** "Artículos sobre construir confianza como gerente nuevo" no contiene palabras clave que aparezcan de forma confiable en las publicaciones relevantes. "Un marco ligero para manejar efectos secundarios" puede no usar esas palabras exactas en la documentación. La búsqueda vectorial coincide con la intención, no con la ortografía.

**Encontrar elementos similares.** Productos relacionados, tickets de soporte similares, informes de errores duplicados, artículos que también te pueden interesar. "Encontrar problemas similares a este" es una búsqueda de vecino más cercano — incrusta el elemento, encuentra sus vecinos geométricos. Una advertencia importante: la búsqueda vectorial siempre devuelve resultados, incluso cuando nada es genuinamente similar. Para casos de uso como deduplicación y recomendaciones, filtra por un umbral mínimo de similitud (ej. similitud coseno ≥ 0.80) para evitar mostrar coincidencias de baja confianza como si fueran significativas.

**Deduplicación semántica.** Antes de indexar contenido para RAG o búsqueda, a menudo necesitas identificar duplicados cercanos en el corpus — artículos revisados múltiples veces, tickets de soporte presentados dos veces, entradas de base de conocimiento con superposición significativa. Incrusta los documentos y filtra por umbral de similitud coseno para marcar o fusionar duplicados cercanos antes de que contaminen tu índice. Esto previene que la recuperación devuelva múltiples fragmentos casi idénticos y diluya el contexto.

**Búsqueda multilingüe.** Los modelos de incrustación multilingües mapean contenido semánticamente equivalente entre idiomas a vectores cercanos. Una consulta en español sobre "perder peso" puede coincidir con un artículo en inglés sobre "hábitos sostenibles para perder peso" — sin tokens compartidos, mismo significado subyacente. La FTS requiere configuración de diccionarios por idioma y maneja mal consultas translingüísticas. `pg_trgm` es agnóstico a idiomas pero ortográfico, no semántico.

### Configurar pgvector

Desde la instalación de la extensión hasta la consulta de similitud, la configuración es un puñado de declaraciones SQL:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- HNSW es usualmente el primer índice a probar en conjuntos de datos de tamaño moderado
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);

-- Consulta de búsqueda semántica
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

`<=>` es la distancia coseno. `1 - cosine_distance` da la similitud coseno (1.0 = idénticos, 0.0 = ortogonales). Para `ivfflat` (la alternativa más antigua y rápida de construir), use `lists = sqrt(row_count)` como punto de partida.

### Lo que pgvector No Maneja Bien

- Coincidencia exacta de tokens — códigos de producto, códigos de error, nombres de funciones. `ORD-12345` no es semánticamente similar a nada. Una búsqueda basada en embeddings podría devolver `ORD-12344` o nada relevante. Use FTS o un índice B-tree.
- Nombres y sustantivos propios. El espacio de embeddings organiza por significado, no por ortografía. "Micheal Jordan" como registro de usuario no necesariamente se sitúa cerca de "Michael Jordan" en el espacio vectorial.
- Cadenas cortas donde la similitud a nivel de caracteres es más importante que el significado. `pg_trgm` maneja esto.
- Consultas donde el término exacto debe aparecer. BM25 y FTS son más confiables para coincidencias de términos conocidos.

---

## Búsqueda Híbrida: El Caso por Ambos

La documentación técnica es el ejemplo más claro donde ninguna herramienta es suficiente por sí sola.

Los usuarios que buscan "how to configure timeouts" necesitan coincidencia conceptual: un artículo titulado "Setting retry policies and connection limits" no tiene palabras clave superpuestas pero es exactamente lo que necesitan.

Los mismos usuarios también buscan `withRetry()`, `ECONNRESET` y `ERR_SOCKET_TIMEOUT`. Estos términos exactos deben aparecer — la coincidencia semántica puede no encontrarlos de forma confiable, y un falso positivo (conceptualmente similar pero no la API correcta) es actively engañoso.

La búsqueda vectorial maneja las consultas conceptuales. La FTS maneja los términos exactos. Ninguna maneja ambos bien por sí sola.

La solución es la búsqueda híbrida: ejecute ambas y fusione los resultados.

### Fusión por Rango Recíproco

**Fusión por Rango Recíproco (RRF)** es el algoritmo estándar para combinar listas ordenadas de diferentes sistemas de recuperación. No requiere normalizar puntuaciones entre sistemas: solo usa posiciones de rango. Un resultado que aparece alto en *ambas* listas obtiene una puntuación combinada más fuerte que uno que domina solo una.

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

El `60` en el denominador es la constante de RRF. Valores más altos atenúan diferencias de posición de rango; valores más bajos las amplían. El valor predeterminado de 60 funciona bien para la mayoría de tipos de contenido.

RRF evita el problema más difícil de normalizar `ts_rank` (una puntuación de frecuencia logarítmica) contra distancia coseno (una medida geométrica). No son comparables. RRF solo pregunta: "¿qué tan alto apareció este resultado en cada lista?"

### Búsqueda Híbrida con Trigramas

Para búsquedas de usuarios sobre contenido mixto — donde los usuarios podrían buscar un nombre de persona, un concepto o un término exacto en la misma sesión — la fusión de tres vías maneja todos:

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

Esto maneja: coincidencias difusas de nombres (trigramas), coincidencias exactas de palabras clave (FTS) y consultas conceptuales (vectoriales). Una única caja de búsqueda puede satisfacer los tres propósitos de usuario.

---

## Arquitecturas Híbridas Multinivel

Las aplicaciones reales raramente tienen una sola superficie de búsqueda. Tienen múltiples, cada una con una necesidad diferente:

| Superficie | Qué buscan los usuarios | Capas recomendadas |
|---|---|---|
| Búsqueda de blogs / documentación | Palabras clave + conceptos | FTS + pgvector (RRF) |
| Búsqueda de nombres de usuarios/clientes | Nombres con errores tipográficos | `pg_trgm` |
| Búsqueda de productos | Nombres, descripciones, "similares a" | `pg_trgm` + FTS + pgvector |
| Deduplicación de tickets de soporte | "Problemas similares a este" | Solo pgvector |
| Búsqueda interna de SKU/órdenes | Identificadores exactos | Índice B-tree |
| RAG sobre una base de conocimiento grande | Preguntas en lenguaje natural | pgvector (documentos segmentados) |
| "Tal vez también te guste" en e-commerce | Similitud conductual + semántica | pgvector |
| Autocompletar | Prefijos, tolerantes a errores ortográficos | `pg_trgm` |

Estos no son hipotéticos. La mayoría de las aplicaciones con alto contenido necesitan al menos dos superficies de búsqueda distintas con formas de consulta diferentes. La tentación es elegir un enfoque y usarlo en todas partes—generalmente la búsqueda vectorial ahora, ya que es la opción de moda. Eso lleva a embeddings costosos para problemas donde un índice de trigramas habría sido más rápido, barato y correcto.

### La Regla General

Agrega una capa cuando aparezca un modo de fallo que la capa actual no pueda resolver:

- Los usuarios se quejan de que los errores tipográficos no coincidan → agrega `pg_trgm`
- Los usuarios buscan por concepto y pierden resultados relevantes → agrega pgvector
- Los usuarios buscan símbolos o códigos exactos y obtienen resultados conceptuales → agrega FTS o verifica si estás dependiendo demasiado de la búsqueda vectorial
- La latencia se convierte en un problema → evalúa pre-filtrado, índices aproximados o una base de datos dedicada

---

## Si Realmente Necesitas una Base de Datos Vectorial Dedicada

pgvector maneja mucha de la búsqueda de aplicaciones antes de que necesites otra base de datos. El límite aproximado depende del número de vectores, configuración del índice, tasa de escritura, filtros, hardware y concurrencia, por lo que trate cualquier regla de "menos de 10M vectores" como un supuesto inicial para probar, no como un límite de producto. Cuando realmente lo superes—alta concurrencia, requisitos de latencia p99 muy bajos, miles de millones de vectores o necesidades serias de aislamiento multitenante—el paisaje de bases de datos vectoriales dedicadas es amplio y vale la pena comprenderlo.

### Qué Significan Realmente las Columnas de la Matriz

**Búsqueda híbrida** significa que la búsqueda de palabras clave BM25 y la similitud vectorial se ejecutan en una sola consulta, fusionadas mediante RRF. Sin esto, debes elegir un solo modo de búsqueda o fusionar dos consultas por tu cuenta.

**Vectores dispersos** van más allá que BM25. Un vector disperso SPLADE tiene ~30,000 dimensiones (~98% ceros), una por término del vocabulario. Las posiciones no nulas te indican qué términos son relevantes y en qué medida. Una consulta por "perros" también pondera "canino" y "mascota" — precisión a nivel de BM25 más expansión de términos dentro de un índice vectorial. Si esta columna es falsa, necesitas una capa FTS separada para consultas de términos exactos.

```python
# SPLADE: ~30,000 dims, ~60 no nulos — solo activan posiciones relevantes del vocabulario
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL-like** es realmente sobre filtrado. La búsqueda vectorial sin filtrado es un demo. Todavía necesitas ámbito de inquilino, rangos de fecha, permisos y filtros por categoría. El SQL completo (pgvector, LanceDB) expresa esto junto a tus uniones existentes. Bases de datos especializadas usan objetos de filtro JSON (Qdrant, Pinecone), un DSL de consulta (Elasticsearch, Milvus) o GraphQL (Weaviate). Funcionan; el SQL se vuelve más atractivo a medida que la lógica de filtrado se complica.

```sql
-- pgvector: la similitud vectorial es solo otra expresión
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2
  AND category = ANY($3::text[])
  AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1
LIMIT 10;
```

```python
# Qdrant: filtro equivalente como objeto Python — mismo resultado, más ceremonia
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

**Multimodal nativo** significa que la base de datos incluye modelos de embeddings para contenido no textual. Le das una URL de imagen cruda; la maneja la vectorización. La mayoría de bases de datos son agnósticas a embeddings — tú gestionas la pipeline de embeddings. Marqo y Weaviate (vía módulos CLIP/ImageBind) cierran este ciclo.

```python
# Marqo: POST imágenes crudas, consulta con texto — sin paso externo de embeddings
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Devuelve shoe-001 a pesar de cero superposición de keywords — CLIP maneja la coincidencia multimodal
```

**Índice basado en disco** es un palanca de costo. Los índices HNSW residentes en RAM pueden requerir varios GB de RAM por millón de vectores 1536-dimensionales al contar vectores crudos, sobrecarga del grafo y metadatos. Alternativas nativas de disco (Milvus DiskANN, Elasticsearch DiskBBQ, formato Lance de LanceDB, capa de almacenamiento en objetos de Turbopuffer) suelen intercambiar algo de latencia de consulta por menor costo de infraestructura. Para cargas de trabajo RAG donde la latencia del modelo ya domina, esta tradeoff suele valer la pena probarla.

**Máx dimensiones** es una migración oculta en tu arquitectura. `text-embedding-3-large` usa 3072 dims, Jina v3 puede emitir embeddings más grandes, y modelos de investigación siguen empujando más alto. Algunos servicios gestionados publican límites duros de dimensiones; otros documentan altos límites o ningún límite práctico para modelos de embeddings típicos. Revisa las docs actuales antes de comprometerte. Elige algo con margen; migrar un índice vectorial porque alcanzaste el techo de dimensiones es un sprint doloroso.

_Última verificación contra docs públicos de proyectos y páginas de productos el 8 de mayo de 2026. Trata la tabla de abajo como una ayuda de decisión, no como sustituto de verificar límites actuales, precios y flags de características de servicios gestionados._

### El Paisaje

| Base de datos | Despliegue | Licencia | Búsqueda Híbrida | Vectores Dispersos | SQL / SQL-like | Multimodal | Índice en Disco | Máx Dims | Punto Fuerte |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](../github.com/pgvector/pgvector)** | Autohospedado / gestionado (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manual (RRF via SQL) | ❌ | ✅ SQL completo | ❌ | ✅ HNSW en disco | 16,000 almacenamiento; 2,000 indexed `vector` | Ya en Postgres; conteo moderado de vectores |
| **[Qdrant](../github.com/qdrant/qdrant)** | Autohospedado / Nube | Apache 2.0 | ✅ Nativo BM25 | ✅ Soporte maduro | ❌ (REST/gRPC) | ❌ | ✅ | 65,535 | Consultas filtradas a gran escala; metadata compleja |
| **[Weaviate](../github.com/weaviate/weaviate)** | Autohospedado / Nube | BSD 3 | ✅ Nativo BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ via módulos | ✅ | 65,535 | Patrones de acceso GraphQL; vectorización integrada |
| **[Pinecone](../www.pinecone.io/)** | Solo nube | Propietaria | ✅ (añadido 2024) | ✅ | ❌ | ❌ | ✅ (serverless) | 20,000 | Simplicidad gestionada; sin equipo de ops |
| **[Milvus](../github.com/milvus-io/milvus) / [Zilliz](../zilliz.com/)** | Autohospedado / Nube (Zilliz) | Apache 2.0 | ✅ Nativo | ✅ | ✅ SQL-like (Milvus Query Language) | ✅ | ✅ DiskANN | 32,768 | Escala billonaria; enterprise on-prem |
| **[Chroma](../github.com/chroma-core/chroma)** | Embebido / autohospedado | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65,535 | Solo desarrollo local y prototipado |
| **[LanceDB](../github.com/lancedb/lancedb)** | Embebido / Nube | Apache 2.0 | ✅ | ❌ | ✅ SQL via DataFusion | ✅ Nativo | ✅ (formato Lance) | Ilimitado | Edge / serverless; multimodal lakehouse |
| **[Orama](../github.com/oramasearch/orama)** | Embebido / Nube | Apache 2.0 | ✅ Texto completo + vector | ❌ | ❌ | ❌ | ❌ | Variable | Apps JS/edge; búsqueda ligera de sitio/aplicación |
| **[Turbopuffer](../turbopuffer.com/)** | Solo nube (serverless) | Propietaria | ✅ BM25 + vector | ❌ | ❌ | ❌ | ✅ (almacenamiento en objetos) | 16,000 | SaaS multitenante; millones de namespaces |
| **[Elasticsearch](../github.com/elastic/elasticsearch)** | Autohospedado / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER disperso | ✅ (ELSER) | ✅ DSL de consulta | ❌ | ✅ DiskBBQ | 4,096 | Ya en stack de Elastic; búsqueda híbrida enterprise |
| **[OpenSearch](../github.com/opensearch-project/OpenSearch)** | Autohospedado / Gestionado por AWS | Apache 2.0 | ✅ RRF + Búsqueda Neural | ✅ | ✅ DSL de consulta | ❌ | ✅ FAISS + HNSW | 16,000 | Nativo AWS; alternativa open-source a Elastic |
| **[Vespa](../github.com/vespa-engine/vespa)** | Autohospedado / Nube | Apache 2.0 | ✅ Nativo | ✅ Tensores / clasificación léxica | ✅ YQL | ✅ Tensores | ✅ | Efectivamente ilimitado | Búsqueda + clasificación + sistemas de recomendación |
| **[ClickHouse](../github.com/ClickHouse/ClickHouse)** | Autohospedado / Nube | Apache 2.0 | Manual | ❌ | ✅ SQL completo | ❌ | ✅ Columnar + HNSW | Variable | Análisis/logs con búsqueda vectorial junto a OLAP |
| **[MongoDB Atlas](../github.com/mongodb/mongo)** | Nube / autohospedado | SSPL | ✅ Integrado | ❌ | ✅ MQL + agregación | ❌ | ✅ HNSW | 8,192 | Ya en MongoDB; documento + vector en uno |
| **[Redis (VSS)](../github.com/redis/redis)** | Autohospedado / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ Solo RAM | 32,768 | Latencia ultrabaja; búsqueda vectorial en capa de caché |
| **[Marqo](../github.com/marqo-ai/marqo)** | Nube / autohospedado | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Enfoque nativo | ✅ | Variable | Multimodal end-to-end: imagen + texto + video |

### Unas Cuantas Cosas que no Caben en la Tabla

**El multitenant de Turbopuffer** está construido alrededor de muy altos conteos de namespaces. Su posicionamiento público y casos de clientes resaltan cargas de trabajo como el corpus de Notion con alta densidad de namespaces. Si cada usuario o organización necesita búsqueda vectorial aislada, esa arquitectura puede cambiar la economía, pero sigue benchmarkeando tu propia forma de inquilino.

**El modo incrustado de LanceDB** es lo más cercano a "SQLite para búsqueda vectorial". Se ejecuta en proceso, no requiere servidor y funciona en Lambda, Cloudflare Workers y entornos de borde. El formato columnar de Lance hace práctico el modo incrustado a escala real.

**Chroma es más fuerte en entornos de desarrollo/pruebas y despliegues de pequeñas aplicaciones.** Si tu objetivo son corpora muy grandes, alta disponibilidad, operación basada en disco o búsqueda híbrida de primera clase, evalúa un almacén orientado a producción antes de promover el prototipo a infraestructura.

**Vespa es lo que recurrirás cuando la recuperación sea solo la mitad del producto.** Combina recuperación léxica, búsqueda de vecinos más cercanos, tensores, expresiones de clasificación, agrupación y servido en línea. Ese poder es real, pero también lo es la complejidad operativa y de modelado. Encaja más en equipos de búsqueda/recomendación que en "agregar búsqueda semántica a mi aplicación CRUD".

**ClickHouse pertenece a la conversación cuando la búsqueda está vinculada a la analítica.** Si tu fuente de verdad son eventos, registros, trazas o métricas, ClickHouse mantiene distancia vectorial, filtrado, agregación y indexación de texto completo serio en un solo motor SQL. No es una base de datos vectorial de propósito específico, pero a menudo es la respuesta aburrida pero correcta para recuperación analítica.

**Los vectores dispersos son la forma de obtener coincidencias de palabras clave de calidad BM25 dentro de un índice vectorial** — sin ejecutar un motor de texto completo separado. Qdrant y Elasticsearch tienen implementaciones especialmente maduras aquí. Si la búsqueda híbrida es crítica y una arquitectura de dos sistemas es un problema, busca soporte para vectores dispersos.

### Elegir cuándo has superado a pgvector

- **Producto SaaS con aislamiento por inquilino** → Turbopuffer  
- **Filtrado complejo de metadatos a escala** → Qdrant  
- **Ya en pila Elastic/ELK** → Elasticsearch con DiskBBQ  
- **Entorno AWS que quiere código abierto** → OpenSearch  
- **Plataforma de búsqueda/recomendación con necesidades serias de clasificación** → Vespa  
- **Analítica, observabilidad, búsqueda de registros/eventos** → ClickHouse  
- **Escala de mil millones en local/self-hosted** → Milvus  
- **Borde/serverless/multimodal** → LanceDB  
- **Pequeña app JS, sitio de docs o UX de búsqueda nativo de borde** → Orama  
- **Cero operaciones, costo secundario** → Pinecone  
- **Primero multimodal (imágenes, video, audio)** → Marqo  
- **Ya en MongoDB** → Atlas Vector Search  
- **Ya en Postgres, necesitas más capacidad** → Supabase Vector o Neon (ambos pgvector gestionados, con mejoras en herramientas)  

---

## Una sola cosa que no debes hacer

No uses la búsqueda vectorial como búsqueda de texto difusa para cosas que tienen respuestas correctas.

"Encuéntrame al usuario con correo electrónico `dan@example.com`" no es un problema de búsqueda vectorial. "Encuentra el pedido con ID `ORD-12345`" tampoco lo es. Incrustar `ORD-12345` y buscar por similitud coseno devolverá *algo* — pero podría estar equivocado. Un identificador tiene una respuesta correcta. Una coincidencia aproximada en un identificador es un error.

La búsqueda vectorial devuelve el *elemento más similar* de su conjunto de datos, incluso cuando nada es realmente relevante. No sabe cuándo no existe una buena respuesta. Eso está bien para documentos relacionados. Es un problema grave para búsquedas de registros exactos, donde una respuesta equivocada pero segura es peor que un resultado vacío.

Lo mismo aplica en sentido inverso: no uses FTS para consultas donde el usuario describa un concepto. "artículos sobre tomar decisiones difíciles bajo incertidumbre" no contiene palabras clave confiables. El FTS devolverá ruido o nada. Usa la herramienta adecuada para la forma de la consulta.

---

## La imagen completa

La mayoría de los sistemas de búsqueda en producción necesitan más de una capa:

- **`pg_trgm`** para nombres, errores tipográficos, autocompletado  
- **FTS / `pg_search`** para búsquedas de texto basadas en palabras clave  
- **pgvector** para consultas semánticas y conceptuales  
- **Fusión RRF** para interfaces donde los usuarios mezclan tipos de consultas  
- **Índices regulares** para identificadores exactos, filtros y listas ordenadas  

Estas no son herramientas competitivas. Son complementarias. Un sistema de búsqueda bien construido elige la capa adecuada para cada forma de consulta — y cuando las formas de consulta se superponen, ejecuta múltiples capas y fusiona los resultados.

Los equipos que implementan buenas funciones de búsqueda entienden toda la pila. Los que no lo hacen recurren a una base de datos vectorial, incrustan todo y se preguntan por qué las búsquedas exactas a veces devuelven el registro equivocado.
````
