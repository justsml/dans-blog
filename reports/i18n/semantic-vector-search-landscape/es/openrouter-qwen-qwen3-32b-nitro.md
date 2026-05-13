# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/es/index.mdx
- Validation: passed
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
title: ''
subTitle: >-
  La escena completa de búsqueda: exacto, borroso, semántico, híbrido — y cuándo
  combinar todos ellos.
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

"Encuentra al usuario con correo `dan@example.com`" y "encuéntrame artículos sobre depuración como ingeniero novato" se describen ambos como búsquedas, pero son casi opuestos como problemas de ingeniería. La primera tiene una respuesta correcta y una búsqueda de índice `O(log n)`. La segunda no tiene una respuesta correcta, solo relevancia, y requiere comprender lenguaje, intención y significado.  

Los ingenieros más persuasivos en sus decisiones sobre búsqueda — los que ganan los debates y despliegan el sistema adecuado — comprenden todo el ecosistema. Saben qué herramienta usar y por qué, y pueden explicarlo claramente.  

Este artículo aborda la capa semántica: qué hace en realidad la búsqueda vectorial, cuándo triunfa y dónde debería mantenerse al margen. La versión útil no es "incrustar todo". Es saber cuándo los vectores deben complementar la búsqueda léxica, difusa y de coincidencia exacta en una arquitectura híbrida.  

La mitad léxica y difusa del problema — `tsvector`, `pg_trgm`, `pg_search` — se explica en [Guía de búsqueda de texto en Postgres 2026](/postgres-text-search-guide).

## Términos a simple vista

**Incrustación** — Una lista densa de números de punto flotante producida por un modelo, que representa una pieza de texto (o imagen, audio, etc.) como un punto en un espacio de alta dimensionalidad. El contenido semánticamente relacionado se sitúa cerca; el no relacionado se sitúa lejos.

**Búsqueda léxica** — Búsqueda basada en coincidencia exacta de palabras y tokens. Rápida, determinista y precisa para términos conocidos. No entiende sinónimos, paráfrasis o equivalentes en otros idiomas.

**Búsqueda semántica** — Búsqueda basada en significado en lugar de tokens. Una consulta como "¿cómo manejo tiempos de espera?" puede coincidir con un documento titulado "configurando políticas de reintento" sin palabras compartidas, porque sus incrustaciones son geométricamente cercanas.

**Vector** — Una lista de números. En contextos de búsqueda, la salida de un modelo de incrustación. La "búsqueda de vectores" encuentra los vectores más cercanos a un vector de consulta mediante distancia geométrica.

**Búsqueda de Texto Completo (FTS)** — La búsqueda léxica integrada en Postgres, impulsada por `tsvector` / `tsquery`. Tokeniza, lematiza e indexa el texto para consultas de palabras clave. Fuerte para textos continuos y búsquedas de términos exactos; ciega al significado.

**BM25** — Un algoritmo de clasificación para búsqueda léxica (usado por Elasticsearch, Qdrant y otros). Puntúa los resultados según la frecuencia de los términos, ponderada por su rareza en el corpus. Mejor que la coincidencia directa de palabras clave; sigue siendo léxico.

**HNSW (Hierarchical Navigable Small World)** — El índice estándar de vecinos más cercanos aproximados para búsqueda de vectores. Construye un grafo de proximidad en capas para consultas de similitud rápidas y con alta recuperación. pgvector, Qdrant, Weaviate y la mayoría de otros lo utilizan.

**RRF (Reciprocal Rank Fusion)** — Un algoritmo para fusionar listas de resultados clasificados de múltiples sistemas de recuperación. Usa solo la posición en el rango — no se requiere normalización de puntuaciones. Un resultado que aparece alto tanto en listas de FTS como de búsqueda vectorial obtiene una puntuación combinada más fuerte que uno que domina solo una.

---

## Qué hace realmente la búsqueda semántica

Las incrustaciones de vectores convierten texto (o imágenes, audio, etc.) en una lista de números — un punto en un espacio de alta dimensión. Un modelo de incrustación se entrena para que el texto relacionado semánticamente se ubique cerca en ese espacio. "Perro" y "canino" terminan cerca. "Correr una maratón" y "ejecutar un script de Python" terminan lejos a pesar de compartir una palabra.

La búsqueda de similitud en ese espacio encuentra documentos cuyo **significado** esté más cercano al de la consulta, independientemente de la superposición exacta de palabras.

Esto significa:
- "¿Cómo configuro los tiempos de espera de las solicitudes?" puede coincidir con un artículo titulado "Configuración de límites de conexión y políticas de reintento" — sin palabras clave superpuestas, pero con alta relevancia conceptual
- "Algo ligero para una noche de verano" puede coincidir con una recomendación de vino sin que aparezcan palabras clave en la descripción del producto
- Una consulta en inglés puede coincidir con documentos relevantes en francés, español o japonés si el modelo de incrustación fue entrenado multilingüe

La búsqueda léxica (`tsvector`, `pg_trgm`) no puede hacer ninguno de esto. Opera sobre palabras y caracteres, no sobre significado. Las herramientas no son intercambiables — resuelven problemas diferentes.

---

## Cuando pgvector gana

**Construcción de RAG.** La Generación Aumentada con Recuperación (Retrieval-Augmented Generation) recupera los fragmentos de documentos cuyo significado esté más cercano a la pregunta del usuario, y luego los pasa a un modelo de lenguaje como contexto. Este paso de recuperación es una operación vectorial. La búsqueda de texto completo (FTS) omitirá paráfrasis, sinónimos y coincidencias conceptuales que un fragmento relevante podría expresar de manera diferente. La ventaja de pgvector sobre un almacén de vectores independiente: funciona dentro de tu instancia existente de Postgres — no hay servicio separado que desplegar, operar o sincronizar datos.

**Los usuarios describen lo que quieren, no lo que buscar.** "Artículos sobre construir confianza como nuevo gerente" no contiene palabras clave que aparezcan de forma confiable en las publicaciones relevantes. "Un marco ligero para manejar efectos secundarios" podría no usar esas palabras exactas en la documentación. La búsqueda vectorial coincide con la intención, no con la ortografía.  

**Encontrar elementos similares.** Productos relacionados, tickets de soporte similares, informes de errores duplicados, artículos que también te podrían interesar. "Encontrar problemas similares a este" es una búsqueda de vecinos más cercanos: incrusta el elemento y encuentra sus vecinos geométricos. Una advertencia importante: la búsqueda vectorial siempre devuelve resultados, incluso cuando nada es realmente similar. Para casos de uso como deduplicación y recomendaciones, filtra por un umbral mínimo de similitud (por ejemplo, similitud coseno ≥ 0,80) para evitar mostrar coincidencias de baja confianza como si fueran significativas.  

**Deduplicación semántica.** Antes de indexar contenido para RAG o búsqueda, a menudo necesitas identificar casi duplicados en el corpus: artículos revisados múltiples veces, tickets de soporte enviados dos veces, entradas de la base de conocimiento que se superponen significativamente. Incrusta los documentos y filtra por umbral de similitud coseno para marcar o fusionar casi duplicados antes de que contaminen tu índice. Esto evita que la recuperación devuelva múltiples fragmentos casi idénticos y diluya la ventana de contexto.  

**Búsqueda multilingüe.** Los modelos de incrustación multilingües mapean contenido semánticamente equivalente entre idiomas en vectores cercanos. Una consulta en español sobre "perder peso" puede coincidir con un artículo en inglés sobre "hábitos para pérdida de peso sostenible" — sin tokens compartidos, mismo significado subyacente. La búsqueda de texto completo requiere configuración de diccionarios por idioma y maneja mal las consultas translingües. `pg_trgm` es indistinto al idioma pero ortográfico, no semántico.  

### Configuración de pgvector  

Desde la instalación de la extensión hasta la consulta de similitud, la configuración se reduce a un puñado de declaraciones SQL:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- HNSW es generalmente el primer índice a probar para conjuntos de datos de tamaño moderado
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);

-- Consulta de búsqueda semántica
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

`<=>` es la distancia coseno. `1 - distancia_coseno` da la similitud coseno (1.0 = idénticos, 0.0 = ortogonales). Para `ivfflat` (el índice alternativo más antiguo y rápido de construir), use `lists = sqrt(row_count)` como punto de partida.

### Lo que pgvector no maneja bien

- Coincidencia exacta de tokens — códigos de producto, códigos de error, nombres de funciones. `ORD-12345` no es semánticamente similar a nada. Una búsqueda basada en incrustaciones podría devolver `ORD-12344` o nada relevante. Use FTS o un índice B-tree.
- Nombres y nombres propios. El espacio de incrustación organiza por significado, no por ortografía. "Micheal Jordan" como registro de usuario no necesariamente se ubicará cerca de "Michael Jordan" en el espacio vectorial.
- Cadenas cortas donde la similitud a nivel de caracteres es más importante que el significado. `pg_trgm` maneja esto.
- Consultas donde el término exacto debe aparecer. BM25 y FTS son más confiables para coincidencias de términos conocidos.

---

## Búsqueda híbrida: El caso por ambos

La documentación técnica es el ejemplo más claro donde ninguna herramienta es suficiente por sí sola.

Los usuarios que buscan "cómo configurar tiempos de espera" necesitan coincidencias conceptuales: un artículo titulado "Configuración de políticas de reintento y límites de conexión" no tiene palabras clave superpuestas, pero es exactamente lo que necesitan.

Los mismos usuarios también buscan `withRetry()`, `ECONNRESET` y `ERR_SOCKET_TIMEOUT`. Estas cadenas exactas deben aparecer: la coincidencia semántica puede no encontrarlas de forma confiable, y un falso positivo (conceptualmente similar pero no la API correcta) es engañoso.

La búsqueda vectorial maneja las consultas conceptuales. La búsqueda de texto completo (FTS) maneja los términos exactos. Ninguna de las dos maneja ambos bien por separado.

La solución es la búsqueda híbrida: ejecutar ambas y fusionar los resultados.

### Fusión por Recíproca de Rango

**Fusión por Recíproca de Rango (RRF)** es el algoritmo estándar para combinar listas ordenadas de diferentes sistemas de recuperación. No requiere normalizar puntuaciones entre sistemas: solo usa posiciones de rango. Un resultado que aparece alto en *ambas* listas obtiene una puntuación combinada más fuerte que uno que domina solo una.

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

El `60` en el denominador es la constante de RRF. Valores más altos atenúan las diferencias entre posiciones de rango; valores más bajos las amplifican. El valor predeterminado de 60 funciona bien en la mayoría de los tipos de contenido.

RRF evita el problema más difícil de normalizar `ts_rank` (una puntuación de frecuencia logarítmica) frente a la distancia del coseno (una medida geométrica). No son comparables. RRF solo pregunta: "¿qué tan alto apareció este resultado en cada lista?".

### Búsqueda híbrida con trigramas también

Para búsquedas orientadas al usuario sobre contenido mixto — donde los usuarios puedan buscar un nombre de persona, un concepto o un término exacto en la misma sesión — la fusión de tres vías maneja todos ellos:

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

Esto maneja: coincidencias difusas de nombres (trigramas), coincidencias exactas de palabras clave (Búsqueda de Texto Completo) y consultas conceptuales (vectores). Una sola caja de búsqueda puede atender los tres propósitos del usuario.

## Arquitecturas híbridas de múltiples capas

Las aplicaciones reales rara vez tienen una sola superficie de búsqueda. Tienen múltiples, cada una con una necesidad diferente:

| Superficie | Qué buscan los usuarios | Capas recomendadas |
|---|---|---|
| Búsqueda en blog/documentación | Palabras clave + conceptos | FTS + pgvector (RRF) |
| Búsqueda de nombres de usuarios/clientes | Nombres con errores tipográficos | `pg_trgm` |
| Búsqueda de productos | Nombres, descripciones, "similares a" | `pg_trgm` + FTS + pgvector |
| Deduplicación de tickets de soporte | "Problemas similares a este" | Solo pgvector |
| Búsqueda de SKUs/órdenes internos | Identificadores exactos | Índice B-tree |
| RAG sobre una base de conocimiento grande | Preguntas en lenguaje natural | pgvector (documentos segmentados) |
| "También te puede interesar" en e-commerce | Similitud conductual + semántica | pgvector |
| Autocompletar | Prefijos, tolerantes a errores ortográficos | `pg_trgm` |

Estos no son hipotéticos. La mayoría de las aplicaciones con alto contenido requieren al menos dos superficies de búsqueda distintas con formas de consulta diferentes. La tentación es elegir un enfoque y usarlo en todas partes — usualmente la búsqueda vectorial ahora, ya que es la opción de moda. Eso lleva a embeddings costosos para problemas donde un índice de trigramas habría sido más rápido, barato y correcto.  

### La regla general  

Agrega una capa cuando aparezca un modo de fallo que la capa actual no pueda resolver:

- Los usuarios se quejan de errores de tipeo que no coinciden → agrega `pg_trgm`  
- Los usuarios buscan por concepto y se les escapan resultados relevantes → agrega pgvector  
- Los usuarios buscan símbolos o códigos exactos y obtienen resultados conceptuales → agrega FTS o verifica si estás dependiendo en exceso de la búsqueda vectorial  
- La latencia se convierte en un problema → evalúa el filtrado previo, índices aproximados o un almacenamiento dedicado  

---

## Si necesitas un almacén vectorial dedicado  

pgvector maneja mucho de la búsqueda de aplicaciones antes de que necesites otra base de datos. El límite aproximado depende del número de vectores, configuración de índices, velocidad de escritura, filtros, hardware y concurrencia, por lo que trata cualquier regla de "menos de 10 millones de vectores" como una suposición inicial para realizar benchmarks, no como un límite del producto. Cuando realmente superes su capacidad — muy alta concurrencia, requisitos de latencia p99 muy bajos, miles de millones de vectores o necesidades serias de aislamiento multitenante — el paisaje de bases de datos vectoriales dedicadas es amplio y vale la pena comprenderlo.  

### ¿Qué significan realmente las columnas de la matriz?  

**Búsqueda híbrida** significa que la búsqueda de palabras clave BM25 y la similitud vectorial se ejecutan en una sola consulta, fusionadas mediante RRF. Sin ella, debes elegir un modo de búsqueda o fusionar dos consultas tú mismo.

**Vectores dispersos** van más allá que BM25. Un vector disperso SPLADE tiene ~30,000 dimensiones (una por término del vocabulario), ~98% ceros. Las posiciones no nulas te dicen qué términos son relevantes y cuánto. Una consulta por "perros" también pondera "canino" y "mascota" — precisión de nivel BM25 más expansión de términos dentro de un índice vectorial. Si esta columna es falsa, necesitas una capa FTS separada para consultas de términos exactos.

```python
# SPLADE: ~30,000 dims, ~60 no nulos — solo las posiciones relevantes del vocabulario activan
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL-like** es realmente sobre filtrado. La búsqueda vectorial sin filtrado es un demo. Todavía necesitas ámbito de inquilino, rangos de fechas, permisos y filtros por categoría. El SQL completo (pgvector, LanceDB) expresa esto junto a tus uniones existentes. Bases de datos especializadas usan objetos de filtro JSON (Qdrant, Pinecone), un DSL de consulta (Elasticsearch, Milvus) o GraphQL (Weaviate). Funcionan; el SQL se vuelve más atractivo a medida que la lógica de filtrado se complica.

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

**Multimodal native** significa que la base de datos incluye modelos de embeddings para contenido no textual. Le das una URL de imagen cruda; ella maneja la vectorización. La mayoría de bases de datos son agnósticas a embeddings — tú posees la pipeline de embeddings. Marqo y Weaviate (vía módulos CLIP/ImageBind) cierran este ciclo.

```python
# Marqo: POST imágenes crudas, consulta con texto — sin paso externo de embeddings
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Devuelve shoe-001 a pesar de cero superposición de keywords — CLIP maneja el match multimodal
```

**Índice basado en disco** es un palanca de costo. Los índices HNSW residentes en RAM pueden requerir varios GB de RAM por millón de vectores 1536-dimensionales una vez contados los vectores crudos, sobrecarga de grafo y metadatos. Alternativas nativas de disco (Milvus DiskANN, Elasticsearch DiskBBQ, formato Lance de LanceDB, tier de almacenamiento en objetos de Turbopuffer) suelen intercambiar algo de latencia de consulta por menor costo de infraestructura. Para cargas de trabajo RAG donde la latencia del modelo ya domina, ese intercambio suele valer la pena de benchmarkear.

**Máximo de dimensiones** es una migración oculta en tu arquitectura. `text-embedding-3-large` usa 3072 dims, Jina v3 puede emitir embeddings más grandes, y modelos de investigación siguen empujando a dimensiones más altas. Algunos servicios gestionados publican límites duros de dimensiones; otros documentan límites altos o ningún límite práctico para modelos de embeddings típicos. Verifica las docs actuales antes de comprometerte. Elige algo con margen; migrar un índice vectorial porque alcanzaste el techo de dimensiones es un sprint doloroso.

_Ultima verificación contra docs y páginas de proyectos públicos el 8 de mayo de 2026. Trata la tabla de abajo como una ayuda de decisión, no como sustituto de verificar límites actuales, precios y banderas de características de servicios gestionados._

### El paisaje

| Base de datos | Despliegue | Licencia | Búsqueda híbrida | Vectores dispersos | SQL / SQL-like | Multimodalidad | Índice en disco | Máx. dimensiones | Punto óptimo |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Autohospedado / gestionado (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manual (RRF a través de SQL) | ❌ | ✅ SQL completo | ❌ | ✅ HNSW en disco | 16 000 almacenamiento; 2 000 indexados `vector` | Ya en Postgres; conteo moderado de vectores |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Autohospedado / Nube | Apache 2.0 | ✅ BM25 nativo | ✅ Soporte maduro | ❌ (REST/gRPC) | ❌ | ✅ | 65 535 | Consultas filtradas a gran escala; metadatos complejos |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Autohospedado / Nube | BSD 3 | ✅ BM25 + RRF nativo | ✅ | ❌ (GraphQL / gRPC) | ✅ a través de módulos | ✅ | 65 535 | Patrones de acceso GraphQL; vectorización integrada |
| **[Pinecone](https://www.pinecone.io/)** | Solo nube | Propietaria | ✅ (añadido en 2024) | ✅ | ❌ | ❌ | ✅ (sin servidor) | 20 000 | Simplicidad gestionada; sin equipo de operaciones |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Autohospedado / Nube (Zilliz) | Apache 2.0 | ✅ Nativo | ✅ | ✅ SQL-like (Lenguaje de consulta Milvus) | ✅ | ✅ DiskANN | 32 768 | Escala de miles de millones; on-premises empresarial |
| **[Chroma](https://github.com/chroma-core/chroma)** | Integrado / autohospedado | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65 535 | Solo desarrollo local y prototipado |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Integrado / Nube | Apache 2.0 | ✅ | ❌ | ✅ SQL a través de DataFusion | ✅ Nativo | ✅ (formato Lance) | Ilimitado | Borde / sin servidor; lago multimodal |
| **[Orama](https://github.com/oramasearch/orama)** | Integrado / Nube | Apache 2.0 | ✅ Búsqueda de texto completo + vector | ❌ | ❌ | ❌ | ❌ | Variable | Aplicaciones JS/borde; búsqueda ligera de sitio/aplicación |
| **[Turbopuffer](https://turbopuffer.com/)** | Solo nube (sin servidor) | Propietaria | ✅ BM25 + vector | ❌ | ❌ | ❌ | ✅ (almacenamiento de objetos) | 16 000 | SaaS multiempresa; millones de espacios de nombres |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Autohospedado / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER disperso | ✅ (ELSER) | ✅ DSL de consultas | ❌ | ✅ DiskBBQ | 4 096 | Ya en stack de Elastic; búsqueda empresarial híbrida |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Autohospedado / Gestionado por AWS | Apache 2.0 | ✅ RRF + Búsqueda neuronal | ✅ | ✅ DSL de consultas | ❌ | ✅ FAISS + HNSW | 16 000 | Nativo de AWS; alternativa de código abierto a Elastic |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Autohospedado / Nube | Apache 2.0 | ✅ Nativo | ✅ Tensores / clasificación léxica | ✅ YQL | ✅ Tensores | ✅ | Efectivamente ilimitado | Búsqueda + clasificación + sistemas de recomendación |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Autohospedado / Nube | Apache 2.0 | Manual | ❌ | ✅ SQL completo | ❌ | ✅ Columnar + HNSW | Variable | Análisis/logs con búsqueda de vectores junto a OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Nube / autohospedado | SSPL | ✅ Integrado | ❌ | ✅ MQL + agregación | ❌ | ✅ HNSW | 8 192 | Ya en MongoDB; documento + vector en uno |
| **[Redis (VSS)](https://github.com/redis/redis)** | Autohospedado / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ RAM-solo | 32 768 | Latencia ultrabaja; búsqueda de vectores en capa de caché |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Nube / autohospedado | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Enfoque nativo | ✅ | Variable | Multimodalidad end-to-end: imagen + texto + video |

### Algunas cosas que no caben en la tabla

**La multiempresa de Turbopuffer** se construye alrededor de un alto número de espacios de nombres. Su posicionamiento público y casos de clientes destacan cargas de trabajo como el corpus de Notion con alta densidad de espacios de nombres. Si cada usuario o organización necesita búsqueda de vectores aislada, esa arquitectura puede cambiar la economía, pero aún así, evalúa tu propia forma de inquilino.

**El modo integrado de LanceDB** es lo más cercano a "SQLite para búsqueda de vectores". Funciona en proceso, no requiere servidor y opera en Lambda, Cloudflare Workers y entornos de borde. El formato columnar Lance hace factible la operación integrada a escala real.

**Chroma es más fuerte en entornos de desarrollo/prueba y despliegues de pequeñas aplicaciones.** Si tu objetivo es corporas muy grandes, alta disponibilidad, operación intensiva en disco o búsqueda híbrida de primera clase, evalúa una base de datos orientada a producción antes de promover el prototipo a infraestructura.

**Vespa es lo que buscas cuando la recuperación es solo la mitad del producto.** Combina recuperación léxica, búsqueda de vecinos más cercanos, tensores, expresiones de clasificación, agrupación y servido en línea. Ese poder es real, pero también lo es la complejidad operativa y de modelado. Encaja mejor en equipos de búsqueda/recomendación que en "agregar búsqueda semántica a mi aplicación CRUD".  

**ClickHouse pertenece a la conversación cuando la búsqueda está vinculada a la analítica.** Si tu fuente de verdad son eventos, registros, trazas o métricas, ClickHouse mantiene distancia vectorial, filtrado, agregación y indexación de texto completo en un solo motor SQL. No es una base de datos vectorial de propósito específico, pero suele ser la solución aburrida-pero-correcta para recuperación analítica.  

**Los vectores dispersos son la forma de obtener coincidencias de palabras clave de calidad BM25 dentro de un índice vectorial** — sin ejecutar un motor de texto completo separado. Qdrant y Elasticsearch tienen implementaciones especialmente maduras aquí. Si la búsqueda híbrida es crítica y una arquitectura de dos sistemas es un obstáculo, busca soporte para vectores dispersos.  

### Elegir cuándo has superado a pgvector  

- **Producto SaaS con aislamiento por inquilino** → Turbopuffer  
- **Filtrado de metadatos complejo a gran escala** → Qdrant  
- **Ya estás en la pila Elastic/ELK** → Elasticsearch con DiskBBQ  
- **Empresa AWS que quiere código abierto** → OpenSearch  
- **Plataforma de búsqueda/recomendación con necesidades serias de clasificación** → Vespa  
- **Analítica, observabilidad, búsqueda de registros/eventos** → ClickHouse  
- **Escala de miles de millones en instalación local / autoalojado** → Milvus  
- **Borde / sin servidor / multimodal** → LanceDB  
- **Aplicación JS pequeña, sitio de documentación o UX de búsqueda nativa en el borde** → Orama  
- **Cero operaciones, el costo es secundario** → Pinecone  
- **Primero multimodal (imágenes, video, audio)** → Marqo  
- **Ya estás en MongoDB** → Atlas Vector Search  
- **Ya estás en Postgres, necesitas más margen** → Supabase Vector o Neon (ambos pgvector gestionados, con mejores herramientas)

## Una cosa que no hacer

No uses la búsqueda vectorial como búsqueda de texto difusa para cosas que tienen respuestas correctas.

"Encuéntrame al usuario con correo `dan@example.com`" no es un problema de búsqueda vectorial. "Encuentra el pedido con ID `ORD-12345`" tampoco. Generar un embedding de `ORD-12345` y buscar por similitud coseno devolverá *algo* — pero podría estar equivocado. Un identificador tiene una respuesta correcta. Una coincidencia aproximada en un identificador es un error.

La búsqueda vectorial devuelve lo *más similar* de tu conjunto de datos, incluso cuando nada es realmente relevante. No sabe cuándo no existe una buena respuesta. Eso está bien para documentos relacionados. Es un problema grave para búsquedas de registros exactos, donde una respuesta equivocada confiada es peor que un resultado vacío.

Lo mismo aplica en dirección contraria: no uses FTS para consultas donde el usuario esté describiendo un concepto. "artículos sobre tomar decisiones difíciles bajo incertidumbre" no contiene keywords confiables. La FTS devolverá ruido o nada. Usa la herramienta adecuada para la forma de la consulta.

## El cuadro completo

La mayoría de los sistemas de búsqueda en producción necesitan más de una capa:

- **`pg_trgm`** para nombres, errores tipográficos, autocompletado
- **Búsqueda de texto completo (FTS) / `pg_search`** para búsquedas basadas en palabras clave
- **pgvector** para consultas semánticas y conceptuales
- **Fusión RRF** para interfaces donde los usuarios mezclan tipos de consulta
- **Índices regulares** para identificadores exactos, filtros y listas ordenadas

Estas no son herramientas competidoras. Son complementarias. Un sistema de búsqueda bien construido elige la capa adecuada para cada forma de consulta, y cuando las formas de consulta se superponen, ejecuta múltiples capas y fusiona los resultados.

Los equipos que implementan buenas funciones de búsqueda comprenden toda la pila. Los que no lo hacen recurren a una base de datos vectorial, incrustan todo y se preguntan por qué a veces las búsquedas exactas devuelven el registro incorrecto.
````
