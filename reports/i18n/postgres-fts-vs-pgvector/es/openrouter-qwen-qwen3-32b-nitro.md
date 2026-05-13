# Translation Candidate
- Slug: postgres-fts-vs-pgvector
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-08--postgres-fts-vs-pgvector/es/index.mdx
- Validation: passed
- Runtime seconds: 68.00
- Input tokens: 26835
- Output tokens: 28520
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.008992
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: Ya tienes las herramientas. Elige la que coincida con la consulta.
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
Los equipos que agregan funciones de IA suelen optar por una base de datos vectorial dedicada primero. Pinecone, Weaviate, Qdrant, Chroma. Nuevo servicio, nueva dependencia, nuevo grupo de conexiones, nueva factura, y ahora dos fuentes de verdad que mantener honestas. Mientras tanto, ya tienen PostgreSQL. PostgreSQL ya cuenta con `pgvector`. También ha tenido una excelente búsqueda de texto completo integrada desde 2008.

Las bases de datos vectoriales justifican su existencia a gran escala y con altos volúmenes de consultas. Pero la mayoría de las aplicaciones recurren al segundo sistema de búsqueda antes de que el primero haya sido aprovechado al máximo. Así es como un problema futuro de escalabilidad se convierte en un error de sincronización actual.

Entonces: ¿cuándo usar búsqueda de texto completo (FTS), cuándo usar pgvector, y cuándo usar ambos?

## ¿Qué hace cada uno en realidad?

La búsqueda de texto completo (`tsvector` / índice `GIN`) es léxica. Tokeniza el texto en lexemas, los lematiza y coincide con las consultas contra el índice. "Running" y "runs" se reducen al mismo lexema. Lo mismo ocurre con "dog" y "dogs". La función de clasificación (`ts_rank`) premia los documentos donde los términos de la consulta aparecen con frecuencia o de forma destacada.

pgvector es semántico. Almacena un vector denso - una lista de números - que representa el *significado* de un fragmento según entiende un modelo de incrustación. La búsqueda de similitud encuentra vectores cercanos en ese espacio de alta dimensionalidad. "Dog" y "canine" terminan cerca uno del otro. "Running" como deporte y "running" como proceso de ejecución pueden no estarlo.

La diferencia práctica: FTS responde "¿qué documentos contienen estas palabras?", mientras que la búsqueda por vectores responde "¿qué documentos significan aproximadamente esto?".

![Una mapa de herramientas de búsqueda que muestra pg_trgm para cadenas cortas y difusas, búsqueda de texto completo para consultas exactas de texto corrido, pgvector para coincidencia semántica, y búsqueda híbrida para contenido largo que requiere señales exactas y semánticas.](../search-tool-map.svg)

_La primera división no es "búsqueda tradicional vs. búsqueda con IA". Es la forma del texto y qué tipo de respuesta sería correcta._

---

## Cuando gana la búsqueda de texto completo

**Buscas términos que deben ser exactos.** Códigos SKU de productos, códigos de error, números de modelo, nombres de usuario, referencias a cláusulas legales. `SKU-AX-44192` no es semánticamente similar a nada. O coincide o no coincide. La búsqueda vectorial puede devolver confiadamente `SKU-AX-44193`. Eso no es lo que quieres.

**Tus consultas son basadas en palabras clave.** Los usuarios escriben en una caja de búsqueda, filtran por etiqueta o buscan publicaciones de blog por palabra clave. La búsqueda de texto completo (FTS) fue diseñada para ese tipo de intención.

**Necesitas resultados clasificados sin GPU ni infraestructura de embeddings.** Los índices de FTS son rápidos, deterministas y no requieren llamadas a APIs externas. Agrega una columna `tsvector`, construye un índice GIN y ya estás listo.

**Estás realizando filtrado booleano junto con la búsqueda.** `WHERE to_tsvector(body) @@ to_tsquery('postgres') AND category = 'tutorial' AND published_at > NOW() - INTERVAL '6 months'` — esta consulta se compone naturalmente con tu lógica de consulta existente.

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

La columna `GENERATED ALWAYS AS` mantiene actualizado el índice automáticamente. La función `setweight` otorga mayor puntuación a las coincidencias en el título que en el cuerpo. Esa es toda la configuración.

---

## Cuando ganan los trigramas (pg_trgm)

Hay una tercera herramienta de Postgres que se pasa por alto: `pg_trgm`. No es ni búsqueda de texto completo ni búsqueda de vectores. Es emparejamiento de cadenas difuso, y aborda el espacio intermedio incómodo que ambas herramientas manejan mal.  

**Caso de uso: nombres, direcciones, identificadores y cadenas cortas con errores tipográficos.**  

La búsqueda de texto completo (FTS) tokeniza el texto en lexemas y los reduce a sus raíces. Funciona bien para textos, pero no es adecuado para:  
- Nombres de personas ("Dan Levy" → reducido a "dan levi", "leiv", dependiendo de la configuración del idioma)  
- Nombres de empresas, direcciones, títulos de productos donde importa la ortografía exacta  
- Consultas con errores tipográficos — "Micheal Jordan", "Amaon", "javascipt"  
- Autocompletar / búsqueda por prefijo  
- Coincidencia parcial de cadenas ("son" coincidiendo con "Johnson", "Anderson")

pgvector tampoco es una buena opción aquí. Puedes embeber "Micheal Jordan" y encontrar el vector más cercano, pero el espacio de embebidos organiza los nombres por significado, no por ortografía. El vecino más cercano podría ser "basketball legend" o "Michael B. Jordan", no el registro de usuario con el error tipográfico.

`pg_trgm` divide las cadenas en fragmentos superpuestos de 3 caracteres y mide cuántos trigramas comparten dos cadenas. "Dan" -> `" da"`, `"dan"`, `"an "`. "Micheal" y "Michael" comparten la mayoría de sus trigramas, por lo que la similitud es alta.

```sql
-- Habilitar la extensión (generalmente ya disponible)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Índice GIN en la columna de nombres — habilita búsquedas rápidas de similitud de trigramas
CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- Búsqueda difusa de nombres: encuentra "Micheal Jordan" al buscar "Michael Jordan"
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- operador % = umbral de similitud (predeterminado 0.3)
ORDER BY score DESC
LIMIT 10;

-- O usar ILIKE con soporte de índice trigram para coincidencia parcial
SELECT id, name
FROM users
WHERE name ILIKE '%johnson%'   -- Índice GIN hace esto rápido
LIMIT 10;
```

El operador `%` usa `pg_trgm.similarity_threshold` (predeterminado 0.3, rango 0-1). Valores más altos requieren coincidencias más cercanas. Para búsquedas de nombres, 0.3-0.4 suele ser adecuado: lo suficientemente permisivo para capturar errores tipográficos, pero lo suficientemente estricto para evitar ruido.

**Los trigramas también ayudan con la búsqueda de prefijos y el autocompletar, especialmente cuando el autocompletar necesita tolerancia a errores tipográficos o coincidencia parcial:**

```sql
-- Autocompletar: coincidencia de prefijo. Para prefijos anclados a la izquierda pura,
-- compara el índice GIN de trigramas contra un índice de patrón B-tree en tus datos.
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- Más control: word_similarity para coincidencias parciales dentro de cadenas más largas
-- (útil cuando buscas "Johnson" dentro de "Andrew Johnson III")
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name          -- operador <% = umbral de word_similarity
ORDER BY score DESC
LIMIT 10;
```

**Cuándo usar `pg_trgm` en lugar de FTS:**

| Escenario | Usar |
|---|---|
| Búsqueda de nombres de personas/empresas con errores tipográficos | `pg_trgm` |
| Autocompletar / búsqueda de prefijo | `pg_trgm` (o FTS con consultas de prefijo) |
| Búsqueda de cadenas cortas, códigos, identificadores | `pg_trgm` |
| Búsqueda de artículos de prosa, documentación | FTS |
| Búsqueda de mensajes de registro por palabras clave | FTS |
| Búsqueda de nombres multilingües | `pg_trgm` (es indistinto al idioma) |

`pg_trgm` también se combina con FTS. Use trigramas para un filtro fuzzy de pre-filtro y clasifique con `ts_rank`, o combine la similitud de trigramas con una puntuación de vector.

---

## Cuando pgvector Gana

**Está construyendo RAG.** RAG depende de la búsqueda semántica: encontrar *fragmentos* de documentos cuyo significado esté más cercano a la pregunta del usuario, incluso cuando la redacción sea diferente. La búsqueda vectorial está diseñada específicamente para esto. La búsqueda FTS omitirá sinónimos, paráfrasis y coincidencias conceptuales.  

**Los usuarios describen lo que quieren, no qué buscar.** "Algo ligero para una noche de verano" no tiene palabras clave obvias de vino. "Artículos sobre construir confianza como nuevo gerente" requiere comprensión semántica que FTS no puede proporcionar.  

**Está encontrando elementos similares.** Productos relacionados, tickets de soporte similares, informes de errores duplicados. "Encuéntrame problemas similares a este" es una operación vectorial. Usted incrusta el nuevo problema y encuentra sus vecinos más cercanos.

**Contenido multilingüe.** Los embeddings vectoriales entrenados con datos multilingües pueden hacer coincidir elementos entre idiomas. La Búsqueda de texto completo (FTS) requiere configuraciones específicas por idioma y maneja mal las consultas entre idiomas.

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

Nota: `ivfflat` es aproximado — es rápido pero intercambia algo de recuperación por velocidad. Para conjuntos de datos más pequeños (menos de ~1M filas), a menudo `hnsw` es mejor:

```sql
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);
```

## Cuando necesitas ambos

La documentación técnica es donde la división simple se rompe. Los usuarios buscan "cómo configurar los tiempos de espera", pero también buscan nombres de funciones como `withRetry()` y códigos de error como `ECONNRESET`.

La búsqueda vectorial maneja consultas conceptuales. La búsqueda de texto completo maneja términos exactos. Ninguna de las dos maneja bien ambos por sí sola.

La solución es la búsqueda híbrida: ejecuta ambas y fusiona los resultados.

**Reciprocal Rank Fusion (RRF)** es el algoritmo estándar en este caso. No requiere normalizar puntuaciones de dos sistemas; combina las posiciones de rango.

```sql
-- Hybrid search with Reciprocal Rank Fusion
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

El `60` en el denominador es la constante de RRF: valores más altos reducen la influencia de las diferencias en el rango, valores más bajos las amplifican. El valor predeterminado de 60 funciona bien en la mayoría de los casos.

Ejecuta dos búsquedas en una sola consulta, fusiona los rangos y recompensa los resultados donde las señales de palabras clave y semánticas coinciden.

![Una tubería de búsqueda híbrida donde una consulta se bifurca en búsqueda de texto completo y pgvector, cada una produce resultados clasificados, y Reciprocal Rank Fusion combina las dos listas.](../hybrid-rrf-pipeline.svg)

_Reciprocal Rank Fusion (RRF) es valioso porque evita pretender que `ts_rank` y la distancia coseno son puntuaciones brutas comparables. Solo se pregunta: "¿Hasta qué punto apareció este resultado en cada lista?"_

## El árbol de decisiones práctico

Al elegir una estrategia de búsqueda, comience con la **forma de la entrada**, y luego pregunte **qué tipo de consulta está realizando el usuario**. "Cadena corta con variaciones de ortografía" no es el mismo problema que "prosa larga donde importan los términos exactos", y ambos difieren de "pregunta sobre fragmentos de documentos".

![Un árbol de decisiones que elige entre pg_trgm, búsqueda de texto completo, pgvector, búsqueda híbrida o una base de datos vectorial dedicada según la forma del texto y la manera en que los usuarios lo consultan.](../search-decision-tree.svg)

El mismo árbol en texto:

- **Nombres, direcciones, títulos, autocompletado o cadenas cortas propensas a errores ortográficos** → `pg_trgm`
- **Palabras conocidas, códigos de error, SKUs, nombres de funciones, etiquetas, categorías, filtros** → Búsqueda de texto completo
- **Preguntas, paráfrasis, recomendaciones, elementos relacionados, coincidencias multilingües, fragmentos de RAG** → `pgvector`
- **Contenido técnico donde los usuarios necesitan tanto símbolos exactos como respuestas conceptuales** → Híbrido con RRF
- **Claves primarias, IDs exactas, filtros de permisos, rangos de fechas, listas ordenadas** → índices SQL normales
- **Volumen masivo de vectores, concurrencia muy alta o objetivos de latencia que Postgres no puede alcanzar en tus benchmarks** → evalúa bases de datos vectoriales dedicadas

### FTS vs. Semántica: La versión corta

La pregunta "¿debería usar FTS o búsqueda de vectores?" normalmente se reduce a esta: **¿sabes qué palabras aparecerán en los documentos relevantes?**

Si la respuesta es sí, los usuarios buscan términos conocidos, categorías, nombres de funciones, códigos de producto, etc. El FTS es más rápido, económico y predecible. Te dice por qué coincidió un resultado.

Si no - los usuarios describen un concepto, hacen una pregunta o buscan en otro idioma - la búsqueda de vectores es la herramienta adecuada. Coincide con el significado, no con las palabras.

El otro caso complicado es **nombres y sustantivos propios**. Ni FTS ni la búsqueda de vectores son excelentes para ellos:  
- FTS omitirá "Micheal" al buscar "Michael" — tokens diferentes  
- La búsqueda de vectores omitirá el nombre por completo si no aparece con frecuencia en los datos de entrenamiento  
- `pg_trgm` lo maneja correctamente: similitud ortográfica, no semántica ni léxica

En la práctica, la mayoría de las cajas de búsqueda con gran cantidad de contenido necesitan FTS para la velocidad y las palabras clave, y pueden necesitar un enfoque híbrido o `pg_trgm` dependiendo de si los usuarios buscan nombres. Una función de búsqueda semántica verdadera suele significar pgvector. RAG siempre implica pgvector.

---

## Si realmente necesitas un almacenamiento de vectores dedicado

Algunos sistemas realmente superan las capacidades de pgvector. Cuando ocurre esto, el mercado está saturado y confuso. Estos son los aspectos clave de las principales opciones disponibles.

### La matriz de características

Algunas columnas requieren una explicación previa para que la tabla sea comprensible.

**Búsqueda híbrida** significa ejecutar búsquedas por keywords BM25 y similitud vectorial en una sola consulta, fusionadas mediante Fusión por Rango Recíproco (Reciprocal Rank Fusion). "withRetry timeout" puede coincidir exactamente con el nombre de la función *y* documentos sobre "lógica de reintento para fallos de red" de forma semántica. Sin búsqueda híbrida, debes elegir un modo de búsqueda o fusionar dos consultas manualmente. El "Manual (RRF via SQL)" de pgvector es [el enfoque mostrado anteriormente](#when-you-need-both): funciona, pero lo implementas tú mismo.

**Vectores dispersos** van más allá de BM25. Un vector disperso SPLADE tiene ~30,000 dimensiones (una por término en el vocabulario), ~98% ceros. Las posiciones no nulas indican qué términos son relevantes y su peso. Una consulta por "perros" también pondera "canino" y "mascota": precisión de keywords al nivel de BM25 más expansión de términos dentro de un índice vectorial. Si esta columna es falsa, necesitas una capa externa de búsqueda de texto completo (FTS) para consultas de términos exactos.

```python
# SPLADE: ~30,000 dimensiones totales, ~60 no nulas — solo las posiciones relevantes del vocabulario se activan
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL-like** se refiere realmente a filtrado. La búsqueda vectorial sin filtrado es un demo, no una aplicación: aún necesitas ámbito por inquilino, rangos de fechas, permisos y categorías. El SQL completo (pgvector) expresa esto junto a tus uniones existentes. Las bases de datos especializadas usan objetos JSON de filtros (Qdrant, Pinecone), un DSL de consultas (Elasticsearch, Milvus) o GraphQL (Weaviate). Funcionan; el SQL se vuelve más atractivo a medida que la lógica de filtrado se complica.

```sql
-- pgvector: la similitud vectorial es solo otra expresión en WHERE
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2 AND category = ANY($3::text[]) AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1 LIMIT 10;
```

```python
# Qdrant: filtro equivalente como objeto de Python — funcional, más ceremonia
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

**Multimodal native** no significa "puede almacenar incrustaciones de imágenes"; cada base de datos almacena matrices de flotantes. Significa que la base de datos incluye modelos de incrustación para contenido no textual, por lo que le das una URL de imagen cruda y la maneja. La mayoría de las bases de datos aquí son agnósticas a las incrustaciones, por lo que tú gestionas esa tubería. Marqo y Weaviate (vía módulos CLIP/ImageBind) cierran el ciclo.

```python
# Marqo: POST imágenes crudas, consulta con texto — no se necesita paso externo de incrustación
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Devuelve shoe-001 a pesar de cero superposición de palabras clave — CLIP maneja la coincidencia multimodal
```

**Índice basado en disco** es una cuestión de costo. Las estructuras HNSW residentes en RAM pueden requerir varios GB de RAM por cada millón de vectores de 1536 dimensiones, una vez contados los vectores brutos, el sobrecoste del grafo y los metadatos. Las alternativas nativas de disco (Milvus DiskANN, Elasticsearch DiskBBQ, formato Lance de LanceDB, nivel de almacenamiento en objetos de Turbopuffer) suelen intercambiar algo de latencia de consulta por infraestructura más barata. Para cargas de trabajo RAG donde la latencia del modelo ya domina, suele valer la pena hacer pruebas. Redis VSS es la restricción rígida: solo RAM, sin ruta de disco.

**Máximo de dimensiones** es la migración futura oculta en tu elección actual. `text-embedding-3-large` usa 3072 dimensiones, Jina v3 puede emitir incrustaciones más grandes, y los modelos de investigación siguen empujando a dimensiones aún mayores. Algunos servicios gestionados publican límites estrictos de dimensiones; otros documentan límites altos o ningún límite práctico para modelos de incrustación típicos. Verifica las documentaciones actuales antes de comprometerte. Elige algo con margen; migrar un índice vectorial porque alcanzaste el techo de dimensiones es una sprint miserable.

Última verificación contra documentación pública y páginas de productos el 8 de mayo de 2026. Trate la matriz como una captura de pantalla: los límites de servicios gestionados, precios, características de búsqueda híbrida y opciones de índice en disco cambian rápidamente.

| Base de datos | Despliegue | Licencia | Búsqueda híbrida | Vectores dispersos | SQL / SQL-like | Multimodal | Índice en disco | Máx. Dims | Punto óptimo |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Autohospedado / gestionado (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manual (RRF via SQL) | ❌ | ✅ SQL completo | ❌ | ✅ HNSW en disco | 16,000 almacenamiento; 2,000 indexados `vector` | Ya estás en Postgres; conteo moderado de vectores |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Autohospedado / Nube | Apache 2.0 | ✅ Búsqueda BM25 nativa | ✅ Soporte maduro | ❌ (REST/gRPC) | ❌ | ✅ | 65,535 | Consultas filtradas a gran escala; metadatos complejos |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Autohospedado / Nube | BSD 3 | ✅ BM25 + RRF nativo | ✅ | ❌ (GraphQL / gRPC) | ✅ mediante módulos | ✅ | 65,535 | Patrones de acceso GraphQL; vectorización integrada |
| **[Pinecone](https://www.pinecone.io/)** | Solo nube | Propietaria | ✅ (añadido 2024) | ✅ | ❌ | ❌ | ✅ (sin servidor) | 20,000 | Simplicidad gestionada; sin equipo de operaciones |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Autohospedado / Nube (Zilliz) | Apache 2.0 | ✅ Nativo | ✅ | ✅ SQL-like (Milvus Query Language) | ✅ | ✅ DiskANN | 32,768 | Escala billonaria; on-premises empresarial |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embebido / autohospedado | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65,535 | Solo desarrollo local y prototipado |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embebido / Nube | Apache 2.0 | ✅ | ❌ | ✅ SQL via DataFusion | ✅ Nativo | ✅ (formato Lance) | Ilimitado | Borde / sin servidor; lago multimodal |
| **[Orama](https://github.com/oramasearch/orama)** | Embebido / Nube | Apache 2.0 | ✅ Búsqueda de texto completo + vector | ❌ | ❌ | ❌ | ❌ | Variable | Aplicaciones JS/edge; búsqueda ligera para sitio/aplicación |
| **[Turbopuffer](https://turbopuffer.com/)** | Solo nube (sin servidor) | Propietaria | ✅ BM25 + vector | ❌ | ❌ | ❌ | ✅ (almacenamiento de objetos) | 16,000 | SaaS multitenante; millones de namespaces |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Autohospedado / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER disperso | ✅ (ELSER) | ✅ DSL de consultas | ❌ | ✅ DiskBBQ | 4,096 | Ya estás en stack Elastic; búsqueda híbrida empresarial |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Autohospedado / Gestionado por AWS | Apache 2.0 | ✅ RRF + Búsqueda neuronal | ✅ | ✅ DSL de consultas | ❌ | ✅ FAISS + HNSW | 16,000 | Nativo de AWS; alternativa de código abierto a Elastic |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Autohospedado / Nube | Apache 2.0 | ✅ Nativo | ✅ Tensores / clasificación léxica | ✅ YQL | ✅ Tensores | ✅ | Efectivamente ilimitado | Búsqueda + clasificación + sistemas de recomendación |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Autohospedado / Nube | Apache 2.0 | Manual | ❌ | ✅ SQL completo | ❌ | ✅ Columnar + HNSW | Variable | Análítica/logs con búsqueda vectorial junto a OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Nube / autohospedado | SSPL | ✅ Integrado | ❌ | ✅ MQL + agregación | ❌ | ✅ HNSW | 8,192 | Ya estás en MongoDB; documento + vector en uno |
| **[Redis (VSS)](https://github.com/redis/redis)** | Autohospedado / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ Solo RAM | 32,768 | Latencia ultrabaja; búsqueda vectorial en capa de caché |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Nube / autohospedado | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Enfoque nativo | ✅ | Variable | Multimodal end-to-end: imagen + texto + video |

### Leyendo la matriz

Algunas cosas no encajan de forma limpia en una tabla:

**Vectores dispersos** son la forma de obtener coincidencias de palabras clave de calidad BM25 dentro de un índice vectorial, sin necesidad de un motor de texto completo separado. Qdrant y Elasticsearch tienen implementaciones especialmente maduras en este aspecto. Weaviate los soporta mediante BM25F. Si la búsqueda híbrida es crítica y no puedes operar dos sistemas, busca soporte para vectores dispersos.

**Índices basados en disco** son una palanca de costo, no un detalle de implementación. Los índices HNSW residentes en RAM son rápidos, pero pueden volverse costosos a medida que aumenta la cantidad de vectores, dimensiones, metadatos y sobrecarga del grafo. Las alternativas basadas en disco (Milvus DiskANN, Elasticsearch DiskBBQ, almacenamiento de objetos de Turbopuffer, formato Lance de LanceDB) intercambian la latencia de consulta por un costo de infraestructura menor. Para índices grandes de RAG, este intercambio suele valer la pena probarlo.

**La multitenancia de Turbopuffer** se basa en un número muy alto de espacios de nombres. Su posicionamiento público y casos de clientes resaltan cargas de trabajo como el corpus de Notion, rico en espacios de nombres. Si cada usuario o organización necesita una búsqueda de vectores aislada, esa arquitectura puede cambiar la economía del sistema, pero aún así debes probar el rendimiento según tu propia forma de inquilino.  

**El modo embebido de LanceDB** es lo más cercano a "SQLite para búsqueda de vectores". Se ejecuta en proceso, no requiere servidor y funciona en Lambda, Cloudflare Workers y entornos de borde. El formato columnar de Lance hace viable el modo embebido a escala real.  

**Orama es infraestructura de experiencia de búsqueda, no un almacén.** Es excelente cuando necesitas un motor de búsqueda de texto completo/vectorial/híbrido pequeño en una aplicación JavaScript, en el borde o como una capa de búsqueda gestionada para sitios/aplicaciones. No es la herramienta que elegiría para recuperación de mil millones de vectores, análisis intensivo o uniones filtradas complejas.

**Vespa es a lo que recurrirías cuando la recuperación es solo la mitad del producto.** Combina recuperación léxica, búsqueda de vecinos más cercanos, tensores, expresiones de clasificación, agrupación y servido en línea. Ese poder existe, pero también lo hace la complejidad operativa y de modelado. Encaja más en equipos de búsqueda/recomendación que en "agregar búsqueda semántica a mi aplicación CRUD".

**ClickHouse pertenece a la conversación cuando la búsqueda está vinculada a análisis.** Si tu fuente de verdad son eventos, registros, rastros, métricas o grandes tablas de hechos, ClickHouse puede mantener la distancia vectorial, el filtrado, la agregación y ahora un índice de texto completo serio en un solo motor SQL. No es una base de datos vectorial de propósito específico, pero para la recuperación analítica puede ser la solución aburrida de la mejor manera.

**Chroma es más fuerte en entornos de desarrollo/prueba y despliegues de aplicaciones pequeñas.** Si tu objetivo son corpora muy grandes, alta disponibilidad, operaciones intensivas en disco o búsqueda híbrida de primera clase, evalúa un almacén orientado a producción antes de promover el prototipo a infraestructura.

### La decisión simplificada

Si has superado realmente a pgvector - usualmente porque las pruebas muestran que el conteo de vectores, el filtrado, la tasa de escritura o la latencia en alta concurrencia superan los límites de Postgres - elige según tus restricciones:

- **Producto SaaS con aislamiento por inquilino** → Turbopuffer  
- **Necesitas rendimiento a nivel de Rust + filtrado de metadatos complejos** → Qdrant  
- **Ya estás en el stack Elastic/ELK** → Elasticsearch con DiskBBQ  
- **Tienda AWS que quiere código abierto** → OpenSearch  
- **Plataforma de búsqueda/recomendación con necesidades serias de clasificación** → Vespa  
- **Análisis, observabilidad o búsqueda de registros/eventos** → ClickHouse  
- **Escala de mil millones en instalación local / autohospedado** → Milvus  
- **Borde / sin servidor / multimodal** → LanceDB  
- **Aplicación JS pequeña, sitio de documentos o experiencia de búsqueda nativa en el borde** → Orama  
- **Cero operaciones, funciona sin problemas, el costo es secundario** → Pinecone  
- **Primero multimodal (imágenes, video, audio)** → Marqo  
- **Ya estás en MongoDB** → Atlas Vector Search  
- **Ya estás en Postgres, necesitas más margen** → Supabase Vector o Neon (ambos pgvector gestionados, con herramientas mejores)

## Una cosa que no hacer

No uses la búsqueda por vectores como búsqueda de texto difusa para cosas que tienen respuestas correctas.

"Encuéntrame al usuario con el correo electrónico `dan@example.com`" no es un problema de búsqueda por vectores. Tampoco lo es "Encuéntrame el pedido con el ID `ORD-12345`." Embeber `ORD-12345` y hacer una similitud coseno contra tu tabla de pedidos devolverá *algo*, pero podría estar equivocado. Estos son problemas de coincidencia exacta. Usa tu clave primaria o un índice convencional.

La búsqueda por vectores devuelve lo *más similar* en tu conjunto de datos, incluso cuando nada es relevante. No sabe que no hay una buena respuesta. Eso está bien para documentos relacionados. Es catastrófico para la búsqueda de registros específicos, donde una coincidencia casi correcta es peor que un resultado vacío.

Sé para qué sirve cada herramienta. La mayoría ya está en tu instalación de Postgres. Usa las que se ajusten a tus necesidades.
````
