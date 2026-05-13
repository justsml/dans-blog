# Translation Candidate
- Slug: postgres-fts-vs-pgvector
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-08--postgres-fts-vs-pgvector/es/index.mdx
- Validation: passed
- Runtime seconds: 7.09
- Input tokens: 20707
- Output tokens: 7989
- Thinking tokens: unknown
- Cached input tokens: 9216
- Cache write tokens: 0
- Estimated cost: $0.002246
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Búsqueda en Postgres: FTS, Trigramas y pgvector'
subTitle: Ya tieneslas herramientas. Elige la que coincida con la consulta.
date: '2026-05-08'
modified: '2026-05-08'
tags:
  - postgres
  - postgresql
  - pgvector
  - full-text-search
  - vector-search
  - trigrams
  - pg_trgm
  - databases
  - ai
  - search
category: Code
subCategory: Databases
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Los equiposque añaden funcionalidades de IA suelen optar primero por una base de datos vectorial dedicada.

Pinecone, Weaviate, Qdrant, Chroma. Nuevo servicio, nueva dependencia, nuevo pool de conexiones, nueva factura y, además, dos fuentes de verdad que mantener coherentes.

Mientras tanto, ya disponen de PostgreSQL. PostgreSQL ya incluye `pgvector`. También lleva integrado un excelente motor de búsqueda de texto completo desde 2008.

Los almacenes vectoriales dedicados justifican su uso a gran escala y con alto volumen de consultas. Pero la mayoría de las aplicaciones recurre al segundo sistema de búsqueda antes de que el primero haya sido presionado al límite. Así es como un problema de escalado futuro se convierte en un error de sincronización hoy.

Entonces: ¿cuándo usar FTS, cuándo usar pgvector y cuándo combinar ambos?

## QuéHace Cada Uno en la Práctica

La búsqueda de texto completo (`tsvector` / índice `GIN`) es léxica. Tokeniza el texto en lexemas, los reduce a su raíz y compara las consultas contra el índice. “Running” y “runs” se colapsan al mismo lexema. Lo mismo ocurre con “dog” y “dogs”. La función de ranking (`ts_rank`) premia los documentos donde los términos de la consulta aparecen con frecuencia o de forma prominente.

`pgvector` es semántico. Almacena un vector denso —una lista de números— que representa el *significado* de un fragmento según un modelo de incrustación. La búsqueda por similitud encuentra vectores cercanos en ese espacio de alta dimensionalidad. “Dog” y “canine” quedan próximos entre sí. “Running” como deporte y “running” como proceso pueden no estar cerca.

La diferencia práctica: FTS responde “¿qué documentos contienen estas palabras?” La búsqueda vectorial responde “¿qué documentos significan aproximadamente esto?”.

![Un mapa de herramientas de búsqueda que muestra pg_trgm para cadenas cortas difusas, búsqueda de texto completo para consultas de prosa exacta, pgvector para coincidencia semántica y búsqueda híbrida para contenido extenso que necesita señales tanto exactas como semánticas.](../search-tool-map.svg)

_El primer divisor no es “búsqueda antigua vs. búsqueda IA”. Es la forma del texto y el tipo de respuesta que sería correcta._

---

## Cuando la búsqueda de texto completo gana

**Estás buscando términos que importan exactamente.** SKUs de productos, códigos de error, números de modelo, nombres de usuario, referencias a cláusulas legales. `SKU-AX-44192` no es semánticamente similar a nada. O coincide o no. La búsqueda vectorial podría devolver con confianza `SKU-AX-44193`. Eso no es lo que deseas.

**Tus consultas se basan en palabras clave.** Los usuarios escriben en un cuadro de búsqueda, filtran por etiqueta o buscan entradas de blog por palabra clave. FTS se diseñó para ese tipo de intención.

**Necesitas resultados clasificados sin GPU ni infraestructura de embeddings.** Los índices FTS son rápidos, determinísticos y no requieren llamadas a API externas. Añade una columna `tsvector`, crea un índice GIN y listo.

**Estás aplicando filtros booleanos junto con la búsqueda.** `WHERE to_tsvector(body) @@ to_tsquery('postgres') AND category = 'tutorial' AND published_at > NOW() - INTERVAL '6 months'` — esto se compone de forma natural con la lógica de consulta existente.

```sql
-- Crear el índice
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- Consulta
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

La columna `GENERATED ALWAYS AS` mantiene el índice actualizado de forma automática. El `setweight` otorga mayor peso a las coincidencias en el título que a las del cuerpo. Eso es todo lo que se necesita.

---

## Cuando ganan los trigramas (pg_trgm)

Hay una tercera herramienta de Postgres que suele quedar fuera: `pg_trgm`. No es búsqueda de texto completo ni búsqueda vectorial. Es coincidencia difusa de cadenas y cubre el incómodo punto medio que ambas herramientas manejan mal.

**Caso de uso: nombres, direcciones, identificadores y cadenas cortas con errores tipográficos.**

FTS tokeniza el texto en lexemas y los reduce a su raíz. Eso funciona para prosa, pero resulta inadecuado para:
- Nombres de personas ("Dan Levy" → reducido a "dan levi", "leiv", según la configuración de idioma)
- Nombres de empresas, direcciones, títulos de productos donde la ortografía exacta importa
- Consultas con errores tipográficos — "Micheal Jordan", "Amaon", "javascipt"
- Autocompletar / búsqueda por prefijo
- Coincidencia parcial de cadenas ("son" coincidiendo con "Johnson", "Anderson")

pgvector también es una mala elección aquí. Puedes incrustar “Micheal Jordan” y buscar el vector más cercano, pero el espacio de embeddings organiza los nombres por significado, no por ortografía. El vecino más cercano podría ser “leyenda del baloncesto” o “Michael B. Jordan”, no el registro de usuario con el error tipográfico.

`pg_trgm` divide las cadenas en fragmentos superpuestos de 3 caracteres y mide cuántos trigramas comparten dos cadenas. “Dan” → `" da"`, `"dan"`, `"an "`. “Micheal” y “Michael” comparten la mayor parte de sus trigramas, por lo que la similitud es alta.

```sql
-- Enable the extension (usually already available)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- GIN index on names column — enables fast trigram similarity search
CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- Fuzzy name search: finds "Micheal Jordan" when searching "Michael Jordan"
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- % operator = similarity threshold (default 0.3)
ORDER BY score DESC
LIMIT 10;

-- Or use ILIKE with trigram index support for contains matching
SELECT id, name
FROM users
WHERE name ILIKE '%johnson%'   -- GIN index makes this fast
LIMIT 10;
```

El operador `%` usa `pg_trgm.similarity_threshold` (valor predeterminado 0.3, rango 0‑1). Valores más altos exigen coincidencias más cercanas. Para búsquedas de nombres, 0.3‑0.4 suele ser adecuado: lo suficientemente permisivo para capturar errores tipográficos y lo suficientemente estricto para evitar ruido.

**Los trigramas también ayudan en búsquedas por prefijo y autocompletar, especialmente cuando el autocompletar necesita tolerancia a errores o coincidencias de contenido:**

```sql
-- Autocomplete: prefix matching. For pure left-anchored prefixes,
-- compare trigram GIN against a B-tree pattern index on your data.
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- More control: word_similarity for partial matches within longer strings
-- (useful when searching "Johnson" within "Andrew Johnson III")
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name          -- <% operator = word_similarity threshold
ORDER BY score DESC
LIMIT 10;
```

**Cuándo optar por `pg_trgm` en lugar de FTS:**

| Escenario | Uso |
|---|---|
| Búsqueda de nombres de personas/empresas con errores tipográficos | `pg_trgm` |
| Autocompletar / búsqueda por prefijo | `pg_trgm` (o FTS con consultas de prefijo) |
| Búsqueda de cadenas cortas, códigos, identificadores | `pg_trgm` |
| Búsqueda en artículos de prosa, documentación | FTS |
| Búsqueda de mensajes de registro por palabras clave | FTS |
| Búsqueda multilingüe de nombres | `pg_trgm` (es independiente del idioma) |

`pg_trgm` también se combina con FTS. Usa trigramas como pre‑filtro difuso y clasifica con `ts_rank`, o combina la similitud de trigramas con una puntuación vectorial.

---

## Cuando pgvector Gana

**Estás construyendo RAG.** RAG depende de la recuperación semántica: encontrar fragmentos de documento *chunks* cuyo significado sea más cercano a la pregunta del usuario, incluso cuando la redacción difiere. La búsqueda vectorial está diseñada precisamente para eso. FTS pasará por alto paráfrasis, sinónimos y coincidencias conceptuales.

**Los usuarios describen lo que quieren, no lo que deben buscar.** “Algo ligero para una noche de verano” no contiene palabras clave obvias de vino. “Artículos sobre cómo ganar confianza como nuevo gerente” requiere comprensión semántica que FTS no puede ofrecer.

**Estás encontrando ítems similares.** Productos relacionados, tickets de soporte parecidos, informes de bugs duplicados. “Encuentra incidencias similares a esta” es una operación vectorial. Inserta el nuevo incidente y busca sus vecinos más cercanos.

**Contenido multilingüe.** Los embeddings vectoriales entrenados con datos multilingües pueden emparejar entre idiomas. FTS requiere configuraciones específicas por idioma y maneja pobremente las consultas cruzadas de lenguaje.

```sql
-- Setup
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);
CREATE INDEX documents_embedding_idx
  ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Query: semantic search
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

Nota: `ivfflat` es aproximado — es rápido pero sacrifica algo de recall por velocidad. Para conjuntos de datos más pequeños (menos de ~1 M de filas), `hnsw` suele ser mejor:

```sql
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);
```

---

## Cuando necesitas ambos

La documentación técnica es donde la división simple se rompe. Los usuarios buscan “cómo configurar los timeouts”, pero también buscan nombres de funciones como `withRetry()` y códigos de error como `ECONNRESET`.

La búsqueda vectorial maneja consultas conceptuales. FTS maneja términos exactos. Ninguno de los dos gestiona ambos casos de forma adecuada por sí solo.

La solución es búsqueda híbrida: ejecutar ambas y fusionar los resultados.

**Reciprocal Rank Fusion (RRF)** es el algoritmo estándar aquí. No requiere normalizar puntuaciones de dos sistemas; combina las posiciones de rango.

```sql
-- Búsqueda híbrida con Reciprocal Rank Fusion
WITH fts_results AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, query) DESC) AS rank
  FROM documents, to_tsquery('english', $1) query
  WHERE search_vector @@ query
  LIMIT 50
),
vector_results AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(f.id, v.id) AS id,
    COALESCE(1.0 / (60 + f.rank), 0) + COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM fts_results f
  FULL OUTER JOIN vector_results v ON f.id = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

El `60` en el denominador es la constante de RRF — valores más altos reducen la influencia de las diferencias de rango, valores más bajos las amplifican. El valor predeterminado de 60 funciona bien en la mayoría de los casos.

Esto ejecuta dos búsquedas en una sola consulta, fusiona los rangos y premia los resultados donde las señales de palabras clave y semánticas coinciden.

![Una canalización de búsqueda híbrida donde una consulta se ramifica a búsqueda de texto completo y pgvector, cada una produce resultados clasificados, y Reciprocal Rank Fusion combina las dos listas.](../hybrid-rrf-pipeline.svg)

_RRF es valioso porque evita fingir que `ts_rank` y la distancia coseno son puntuaciones crudas comparables. Sólo pregunta: “¿qué tan alto apareció este resultado en cada lista?”_

---

##El árbol de decisiones práctico

Al elegir una estrategia de búsqueda, comienza con la **forma de la entrada**, y luego pregunta **qué tipo de consulta está realizando el usuario**. “Cadena corta con variación ortográfica” no es el mismo problema que “prosa larga donde importan los términos exactos”, y ambos difieren de “pregunta sobre fragmentos de documento”.

![Un árbol de decisiones que elige pg_trgm, búsqueda de texto completo, pgvector, búsqueda híbrida o una base de datos vectorial dedicada según la forma del texto y la manera en que los usuarios la consultan.](../search-decision-tree.svg)

El mismo árbol en palabras:

- **Nombres, direcciones, títulos, autocompletado o cadenas cortas propensas a errores tipográficos** → `pg_trgm`
- **Palabras conocidas, códigos de error, SKU, nombres de funciones, etiquetas, categorías, filtros** → FTS
- **Preguntas, paráfrasis, recomendaciones, ítems relacionados, coincidencias multilingües, fragmentos RAG** → pgvector
- **Contenido técnico donde los usuarios necesitan tanto símbolos exactos como respuestas conceptuales** → Híbrido con RRF
- **Claves primarias, IDs exactos, filtros de permisos, rangos de fechas, listas ordenadas** → índices SQL normales
- **Gran volumen de vectores, concurrencia muy alta o objetivos de latencia que PostgreSQL no puede alcanzar en tus pruebas** → evaluar almacenes vectoriales dedicados

### FTS vs. Semantic: The Short Version

La pregunta “¿debería usar FTS o búsqueda vectorial?” suele reducirse a esto: **¿sabes qué palabras aparecerán en los documentos relevantes?**

Si la respuesta es sí — los usuarios buscan términos conocidos, categorías, nombres de funciones, códigos de producto — FTS es más rápido, barato y predecible. Además te muestra por qué un resultado coincidió.

Si la respuesta es no — los usuarios describen un concepto, hacen una pregunta o buscan en otro idioma — la búsqueda vectorial es la herramienta adecuada. Coincide con el significado, no con las palabras.

El caso intermedio complicado son las consultas en lenguaje natural sobre contenido técnico. Alguien que busque “how do I handle connection drops” podría necesitar un artículo titulado “implementing retry logic for network failures” — sin palabras superpuestas, alta relevancia semántica. Ahí es donde la búsqueda vectorial justifica su uso.

Otro caso difícil son **nombres y nombres propios**. Ni FTS ni la búsqueda vectorial funcionan bien con ellos:
- FTS no encontrará “Micheal” al buscar “Michael” — tokens diferentes
- La búsqueda vectorial omitirá el nombre por completo si no aparece con frecuencia en los datos de entrenamiento
- `pg_trgm` lo gestiona correctamente: similitud ortográfica, no semántica ni léxica

En la práctica, la mayoría de los cuadros de búsqueda con mucho contenido requieren FTS para velocidad y palabras clave, y pueden necesitar híbrido o `pg_trgm` según si los usuarios buscan nombres. Una funcionalidad de búsqueda verdaderamente semántica normalmente implica pgvector. RAG siempre implica pgvector.

---

## Si realmente necesitas un almacén vector dedicado

Algunos sistemas superan honestamente las capacidades de pgvector. Cuando eso ocurre, el mercado está saturado de opciones. Esto es lo que realmente importa entre las principales alternativas.

### La matriz de características

Algunas columnas requieren aclaración antes de que la tabla tenga sentido.

**Hybrid search** significa búsqueda de palabras clave BM25 y similitud vectorial ejecutadas en una sola consulta, fusionadas mediante Reciprocal Rank Fusion. “withRetry timeout” puede coincidir exactamente con el nombre de la función *y* con documentos sobre “lógica de reintentos para fallas de red” de forma semántica. Sin híbrido, eliges un modo de búsqueda o fusionas dos consultas por tu cuenta. El “Manual (RRF via SQL)” de pgvector es [el enfoque mostrado arriba](#when-you-need-both): funciona, pero lo implementas tú mismo.

**Sparse vectors** van más allá de BM25. Un vector disperso SPLADE tiene ~30 000 dimensiones (una por término del vocabulario), ~98 % ceros. Las posiciones no nulas indican qué términos importan y cuánto. Una consulta para “dogs” también pondera “canine” y “pet”: precisión de palabras clave a nivel BM25 más expansión de términos dentro de un índice vectorial. Si esta columna es falsa, necesitas una capa FTS externa para consultas de término exacto.

```python
# SPLADE: ~30,000 dims total, ~60 non-zero — only the relevant vocabulary positions fire
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL-like** se trata realmente de filtrado. La búsqueda vectorial sin filtrado es una demostración, no una aplicación: aún necesitas alcance de inquilino, rangos de fechas, permisos y categorías. SQL completo (pgvector) lo expresa junto a tus joins existentes. Las bases de datos diseñadas específicamente usan objetos de filtro JSON (Qdrant, Pinecone), un DSL de consulta (Elasticsearch, Milvus) o GraphQL (Weaviate). Funcionan; SQL se vuelve más atractivo a medida que la lógica de filtro se enreda.

```sql
-- pgvector: vector similarity is just another expression in WHERE
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2 AND category = ANY($3::text[]) AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1 LIMIT 10;
```

```python
# Qdrant: equivalent filter as a Python object — functional, more ceremony
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

**Multimodal native** no significa “puede almacenar embeddings de imágenes”; todas las bases de datos almacenan arreglos de flotantes. Significa que la base de datos incluye modelos de embedding para contenido no textual, de modo que le entregas una URL de imagen cruda y ella se encarga de la vectorización. La mayoría de las bases aquí son agnósticas al embedding, así que tú controlas esa canalización. Marqo y Weaviate (a través de módulos CLIP/ImageBind) cierran el bucle.

```python
# Marqo: POST raw images, query with text — no external embedding step needed
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Returns shoe-001 despite zero keyword overlap — CLIP handles the cross-modal match
```

**Disk-based index** es una cuestión de costo. Un HNSW residente en RAM puede requerir varios GB de RAM por millón de vectores de 1536 dimensiones una vez que se cuentan los vectores crudos, la sobrecarga del grafo y los metadatos. Las alternativas nativas en disco (Milvus DiskANN, Elasticsearch DiskBBQ, formato Lance de LanceDB, capa de almacenamiento de objetos de Turbopuffer) a menudo cambian algo de latencia de consulta por una infraestructura más barata. Para cargas de trabajo RAG donde la latencia del modelo ya domina, eso suele valer la pena medir. Redis VSS es la restricción dura: solo RAM, sin ruta a disco.

**Max dimensions** es la migración del mañana oculta en la elección de hoy. `text-embedding-3-large` usa 3072 dimensiones, Jina v3 puede emitir embeddings más grandes, y los modelos de investigación siguen empujando a más. Algunos servicios gestionados publican límites duros de dimensión; otros documentan límites altos o ninguna restricción práctica para los modelos de embedding típicos. Revisa la documentación actual antes de comprometerte. Elige algo con margen de crecimiento; migrar un índice vectorial porque alcanzaste un techo de dimensiones es un sprint miserable.

_Last verifiedagainst public project docs and product pages on May 8, 2026. Treat the matrix as a snapshot: managed‑service limits, pricing, hybrid‑search features, and disk‑index options change quickly._

| Base de datos | Despliegue | Licencia | Búsqueda híbrida | Vectores dispersos | SQL / SQL‑like | Multimodal | Índice en disco | Dimensiones máx. | Punto óptimo |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Auto‑hosteado / gestionado (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manual (RRF vía SQL) | ❌ | ✅ Full SQL | ❌ | ✅ HNSW en disco | 16 000 almacenamiento; 2 000 `vector` indexados | Ya en Postgres; recuentos de vectores moderados |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Auto‑hosteado / Cloud | Apache 2.0 | ✅ Nativo BM25 | ✅ Soporte maduro | ❌ (REST/gRPC) | ❌ | ✅ | 65 535 | Consultas filtradas a escala; metadatos complejos |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Auto‑hosteado / Cloud | BSD 3 | ✅ Nativo BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ vía módulos | ✅ | 65 535 | Patrones de acceso GraphQL; vectorización incorporada |
| **[Pinecone](https://www.pinecone.io/)** | Sólo Cloud | Propietaria | ✅ (añadido 2024) | ✅ | ❌ | ❌ | ✅ (serverless) | 20 000 | Simplicidad gestionada; sin equipo de ops |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Auto‑hosteado / Cloud (Zilliz) | Apache 2.0 | ✅ Nativo | ✅ | ✅ SQL‑like (Milvus Query Language) | ✅ | ✅ DiskANN | 32 768 | Escala de miles de millones; empresa on‑prem |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embebido / auto‑hosteado | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65 535 | Sólo desarrollo local y prototipado |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embebido / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL vía DataFusion | ✅ Nativo | ✅ (formato Lance) | Ilimitado | Edge / serverless; lago multimodal |
| **[Orama](https://github.com/oramasearch/orama)** | Embebido / Cloud | Apache 2.0 | ✅ Texto completo + vector | ❌ | ❌ | ❌ | ❌ | Variable | Apps JS/edge; búsqueda ligera de sitio/aplicación |
| **[Turbopuffer](https://turbopuffer.com/)** | Sólo Cloud (serverless) | Propietaria | ✅ BM25 + vector | ❌ | ❌ | ❌ | ✅ (almacenamiento de objetos) | 16 000 | SaaS multi‑tenant; millones de espacios de nombres |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Auto‑hosteado / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER disperso | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4 096 | Ya en Elastic stack; búsqueda híbrida empresarial |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Auto‑hosteado / gestionado por AWS | Apache 2.0 | ✅ RRF + Búsqueda neural | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16 000 | Nativo AWS; alternativa open‑source a Elastic |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Auto‑hosteado / Cloud | Apache 2.0 | ✅ Nativo | ✅ Tensores / ranking léxico | ✅ YQL | ✅ Tensores | ✅ | Prácticamente ilimitado | Búsqueda + ranking + sistemas de recomendación |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Auto‑hosteado / Cloud | Apache 2.0 | Manual | ❌ | ✅ Full SQL | ❌ | ✅ Columnar + HNSW | Variable | Analítica/logs con búsqueda vectorial junto a OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / auto‑hosteado | SSPL | ✅ Incorporado | ❌ | ✅ MQL + agregación | ❌ | ✅ HNSW | 8 192 | Ya en MongoDB; documento + vector en uno |
| **[Redis (VSS)](https://github.com/redis/redis)** | Auto‑hosteado / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ Sólo RAM | 32 768 | Latencia ultra‑baja; capa de caché para búsqueda vectorial |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / auto‑hosteado | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Enfoque nativo | ✅ | Variable | Multimodal de extremo a extremo: imagen + texto + video |

### Lectura de la matriz

Algunas cosas no encajan limpiamente en una tabla:

**Los vectores dispersos** son la forma de obtener coincidencia de palabras clave de calidad BM25 dentro de un índice vectorial, sin un motor de texto completo separado. Qdrant y Elasticsearch tienen implementaciones especialmente maduras aquí. Weaviate los soporta mediante BM25F. Si la búsqueda híbrida es crítica y no puedes ejecutar dos sistemas, busca soporte para vectores dispersos.

**Los índices basados en disco** son una palanca de coste, no un detalle de implementación. Los índices HNSW residentes en RAM son rápidos pero pueden resultar caros a medida que aumentan el número de vectores, la cantidad de dimensiones, los metadatos y la sobrecarga del grafo. Las alternativas en disco (Milvus DiskANN, Elasticsearch DiskBBQ, almacenamiento de objetos de Turbopuffer, formato Lance de LanceDB) intercambian latencia de consulta por menor coste de infraestructura. Para índices RAG grandes, ese intercambio suele valer la pena probar.

**La multi‑tenencia de Turbopuffer** está diseñada para contar con un número muy alto de espacios de nombres. Su posicionamiento público y los casos de uso de clientes destacan cargas de trabajo como el gran corpus con muchos espacios de nombres de Notion. Si cada usuario u organización necesita una búsqueda de vectores aislada, esa arquitectura puede cambiar la economía, pero sigue siendo necesario medir con sus propios patrones de inquilinos.

**El modo incrustado de LanceDB** es lo más cercano a “SQLite para búsqueda de vectores”. Se ejecuta en proceso, no requiere servidor y funciona en Lambda, Cloudflare Workers y entornos edge. El formato columnar de Lance hace que la operación incrustada sea práctica a escala real.

**Orama es infraestructura UX de búsqueda, no un almacén.** Es excelente cuando se desea un motor de búsqueda full‑text/vectores/híbrido diminuto en una aplicación JavaScript, en el edge, o como capa de búsqueda gestionada para sitios/aplicaciones. No es la herramienta que elegiría para la recuperación de miles de millones de vectores, análisis intensivo o uniones filtradas complejas.

**Vespa es lo que se recurre cuando la recuperación es solo la mitad del producto.** Combina recuperación léxica, búsqueda de vecinos más cercanos, tensores, expresiones de ranking, agrupamiento y servicio en línea. Ese poder es real, pero también lo es la complejidad operativa y de modelado. Se adapta mejor a equipos de búsqueda/recomendación que a “añadir búsqueda semántica a mi app CRUD”.

**ClickHouse entra en la conversación cuando la búsqueda está vinculada a analítica.** Si su fuente de verdad son eventos, logs, trazas, métricas o grandes tablas de hechos, ClickHouse puede mantener la distancia vectorial, filtrado, agregación y ahora un serio indexado full‑text en un único motor SQL. No es una base de datos de vectores diseñada específicamente, pero para recuperación analítica puede ser la respuesta aburrida, pero eficaz.

**Chroma sobresale en desarrollo/pruebas y despliegues de aplicaciones pequeñas.** Si apunta a corpora muy grandes, alta disponibilidad, operación intensiva en disco o búsqueda híbrida de primera clase, evalúe una tienda orientada a producción antes de promover el prototipo a infraestructura.

### La decisión simplificada

Si realmente has superado los límites de pgvector —usualmente porque los benchmarks muestran que la cantidad de vectores, el filtrado, la tasa de escritura o la latencia bajo alta concurrencia sobrepasan lo que tu Postgres puede manejar— elige según la restricción:

- **Producto SaaS con aislamiento por inquilino** → Turbopuffer  
- **Necesitas rendimiento a nivel de Rust + filtrado de metadatos complejo** → Qdrant  
- **Ya usas Elastic/ELK stack** → Elasticsearch con DiskBBQ  
- **Entorno AWS que prefiere código abierto** → OpenSearch  
- **Plataforma de búsqueda/recomendación con requerimientos serios de ranking** → Vespa  
- **Analítica, observabilidad o búsqueda de logs/eventos** → ClickHouse  
- **Escala de miles de millones on‑prem / auto‑alojado** → Milvus  
- **Edge / serverless / multimodal** → LanceDB  
- **Aplicación JS pequeña, sitio de documentación o UX de búsqueda nativa en edge** → Orama  
- **Cero operaciones, funciona de inmediato, el costo es secundario** → Pinecone  
- **Primero multimodal (imágenes, video, audio)** → Marqo  
- **Ya usas MongoDB** → Atlas Vector Search  
- **Ya usas Postgres y necesitas más margen** → Supabase Vector o Neon (ambos pgvector gestionados, con mejores herramientas)

## Una cosa que no debes hacer

No uses la búsqueda vectorial como búsqueda difusa de texto para cosas que tienen respuestas correctas.

"Find me the user with email `dan@example.com`" no es un problema de búsqueda vectorial. Tampoco lo es "Find me the order with ID `ORD-12345`". Incrustar `ORD-12345` y calcular la similitud coseno contra tu tabla de órdenes devolverá *algo*, pero puede ser incorrecto. Estos son problemas de coincidencia exacta. Usa la clave primaria o un índice regular.

La búsqueda vectorial devuelve el elemento *más similar* en tu conjunto de datos, incluso cuando nada es relevante. No sabe que no hay una respuesta adecuada. Eso está bien para documentos relacionados. Es catastrófico para la búsqueda de registros específicos, donde una coincidencia cercana incorrecta es peor que un resultado vacío.

Conoce para qué sirve cada herramienta. La mayoría ya está en tu instalación de Postgres. Úsalas donde encajen.
````
