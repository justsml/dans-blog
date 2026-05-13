# Translation Candidate
- Slug: rag-pipeline-failures
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-05--rag-pipeline-failures/es/index.mdx
- Validation: deferred
- Runtime seconds: 21.92
- Input tokens: 9975
- Output tokens: 9564
- Thinking tokens: unknown
- Cached input tokens: 4096
- Cache write tokens: 0
- Estimated cost: $0.003093
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Cinco formas en que RAG fracasa en producción
subTitle: La demo funcionó. Los usuarios reales son donde el pipeline se rompe.
date: '2026-05-04'
modified: '2026-05-05'
tags:
  - ai
  - rag
  - vector-search
  - llm
  - production
  - embeddings
  - architecture
category: AI
subCategory: Architecture
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
La demostración de RAG siempre parece genial.  

Embeds algunos documentos, arrancas una base de datos vectorial, la conectas con el chat y ves cómo el modelo cita tu base de conocimiento interno como si hubiera trabajado allí durante años. Hermoso. Los stakeholders quedan impresionados. Alguien dice: "vamos a lanzarlo".  

Seis semanas después, los usuarios reciben respuestas incorrectas pero seguras. Los tickets de soporte se acumulan. El sistema *funciona*, pero no de la manera en que la gente lo necesita.  

El fracaso suele no ser un error dramático. Son cinco errores aburridos apilados juntos.  

---

## 1. Tus fragmentos tienen el tamaño incorrecto  

Este fracaso no provoca un fallo crítico. Simplemente hace que cada respuesta sea ligeramente peor hasta que toda la función se sienta inconfiable.  

La búsqueda vectorial recupera *fragmentos*, no documentos. Lo que dividas tu material de origen se convierte en la unidad de verdad del buscador. Si los fragmentos son incorrectos, el modelo responde con fragmentos equivocados.  

**Demasiado pequeño**: El fragmento contiene una respuesta parcial. El embedding captura el tema correcto, pero el texto recuperado carece de contexto. Recuperas "El tiempo máximo de espera es de 30 segundos" sin la frase anterior que dice "cuando se usa la API legada".  

**Demasiado grande**: El embedding se convierte en un promedio borroso de muchas ideas. La búsqueda semántica se confunde porque el fragmento trata sobre múltiples temas, y el vector resultante no representa claramente ninguno de ellos.

El tamaño correcto de los fragmentos depende completamente de tu contenido. Los documentos técnicos, los contratos legales y las transcripciones de soporte se dividen en fragmentos de manera diferente. No existe una respuesta universal.  

Lo que debes hacer: medir. Construye un conjunto de evaluación de pares pregunta/respuesta desde tu corpus. Prueba con fragmentos de 256, 512 y 1024 tokens. Mide la precisión de la recuperación: ¿aparece el fragmento correcto en los primeros 5? Aprenderás rápidamente que el tamaño de los fragmentos importa más que el modelo de embedding sobre el cual te has esforzado mucho.  

También usa solapamiento. Un fragmento de 512 tokens con 64 tokens de solapamiento en cada lado significa que las respuestas que cruzan límites aún se recuperan. La mayoría de las bibliotecas vectoriales lo soportan. La mayoría de la gente lo omite.  

## 2. Tus embeddings se vuelven obsoletos (Y no te darás cuenta)  

Imagina que tu empresa cambia de marca. O renombra un producto. O actualiza sus precios. O depreciona una API.  

Actualizas la documentación pero no vuelves a embeber los fragmentos. El índice vectorial aún representa el contenido antiguo.  

Los usuarios preguntan sobre los nuevos precios. Los embeddings los dirigen al contenido antiguo. El modelo lee el contenido antiguo y explica confiadamente los precios antiguos. Soporte recibe una incidencia.  

Todo sistema RAG serio termina enfrentándose a esto eventualmente. La solución suena obvia: re-embed cuando cambie el contenido, pero los equipos rara vez construyen esa tubería antes del primer incidente.  

Necesitas un re-indexado incremental con huella digital del contenido:

```typescript
import { createHash } from 'crypto';

async function upsertDocument(doc: Document, vectorStore: VectorStore) {
  const fingerprint = createHash('sha256')
    .update(doc.content)
    .digest('hex');

  const existing = await vectorStore.getBySourceId(doc.id);

  if (existing?.fingerprint === fingerprint) {
    return; // Content unchanged, skip re-embedding
  }

  const chunks = chunkDocument(doc);
  const embeddings = await embedBatch(chunks);

  await vectorStore.upsert(
    chunks.map((chunk, i) => ({
      id: `${doc.id}:${i}`,
      sourceId: doc.id,
      fingerprint,
      vector: embeddings[i],
      text: chunk.text,
      metadata: { ...doc.metadata, updatedAt: new Date() },
    }))
  );
}
```

Re-indexado en escritura, huella digital basada en contenido, no en marcas de tiempo. Los documentos se actualizan en tu CMS constantemente sin que el contenido real cambie.

---

## 3. Precisión vs. Recuperación en la Búsqueda: Estás Optimizando la Incorrecta

La mayoría de tutoriales de RAG muestran cómo recuperar los top-K fragmentos. No explican el tradeoff entre dos objetivos que apuntan en direcciones opuestas.

**Alta recuperación**: Devolver todo lo que podría ser relevante. Los usuarios siempre obtienen una respuesta. Pero la ventana de contexto del modelo está llena de ruido periférico, y el modelo inventa para llenar los huecos entre fragmentos.

**Alta precisión**: Solo devolver los fragmentos más relevantes. El modelo trabaja con contexto limpio y enfocado. Pero si el fragmento correcto no está en los top 3, el modelo no tiene la información y confiadamente inventa algo igual.

Los modos de falla parecen idénticos para los usuarios: respuestas incorrectas. Pero las causas y soluciones son opuestas.

Dos técnicas que realmente ayudan:

**Reclasificación**: Recuperar más candidatos (top-20), luego usar un modelo cross-encoder para reordenarlos por relevancia antes de pasarlos al LLM. Los cross-encoders son más lentos que la similitud vectorial pero significativamente más precisos en la clasificación final.

```typescript
import { Reranker } from '@mastra/rag';

const results = await vectorStore.search(queryEmbedding, { topK: 20 });
const reranked = await reranker.rank(query, results);
const context = reranked.slice(0, 5); // Ahora top-5 realmente significa algo
```

**Búsqueda híbrida**: Combinar búsqueda vectorial (similitud semántica) con búsqueda de palabras clave (BM25). Fallan de maneras diferentes. La búsqueda vectorial tiene dificultades con términos específicos, nombres de modelos e IDs. La búsqueda de palabras clave tiene dificultades con paráfrasis y sinónimos. Juntas, cubren las ciegas del otro.

## 4. Tu ventana de contexto tiene la forma incorrecta

Has recuperado los fragmentos correctos. Felicitaciones. El modelo aún así lo hará mal.

El problema no es solo lo que recuperas. Es también dónde lo colocas.

Los modelos LLM pueden sufrir del problema de "perdido en el medio". Liu et al. midieron modelos de contexto largo que usaban información relevante menos fiable cuando aparecía en el medio del prompt en lugar de al principio o al final.

Si estás metiendo 20 fragmentos en una lista plana y esperando que el modelo los sintetice correctamente, estás dejando rendimiento en la mesa.

Cosas que realmente ayudan:

**Evalúa la colocación al inicio y al final para tus fragmentos más relevantes.** Una heurística común es colocar el de mayor rango primero, el segundo al final, y el resto en el medio. Contraintuitivo, pero vale la pena probarlo con tu modelo y forma de prompt.

**Numerar y etiquetar explícitamente tus secciones de contexto.** `[Fuente 1]` ... `[Fuente 2]` da al modelo anclajes para razonar.

**Añade una señal de confianza en la recuperación.** Si tu puntuación de similitud es 0.65 en una escala de 0-1, dile al modelo: "El siguiente contexto fue recuperado con confianza moderada. Reconoce la incertidumbre si la respuesta no está clara."

**Establece un presupuesto de contexto.** No pases todo lo que recuperaste. Cuenta los tokens, prioriza por puntuación de relevancia y corta de forma rígida en un 60-70% de la ventana de contexto del modelo. Deja espacio para que el modelo razona sin saturarse.

Referencia: [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172).

---

## 5. No tienes idea de cuándo está equivocado

Este es el fracaso silencioso: la respuesta se devuelve, la interfaz parece saludable y el contenido está equivocado.

Con una API tradicional, los fallos son visibles: HTTP 500, tiempo de espera agotado, error de validación de esquema. Lo sabes inmediatamente. Los fallos de RAG son más silenciosos: el sistema devuelve una respuesta, parece plausible y está equivocada.

Es posible que no sepas que tu pipeline de RAG está fallando hasta que los usuarios te lo digan. A menudo, no lo hacen. Solo dejan de confiar en él y regresan a Ctrl+F.

El conjunto mínimo viable de observabilidad para un sistema RAG en producción:

**Registra tu cadena de recuperación.** Cada consulta, qué se recuperó (IDs de fragmentos + puntuaciones) y qué produjo el modelo. Necesitas esto para depurar cualquier problema.

**Seguimiento de métricas de recuperación.** Media recíproca de rango (MRR) y NDCG si tienes etiquetas de verdad terrestre. Como mínimo, sigue las distribuciones de puntuaciones de similitud — si tu puntuación P50 de recuperación cae, la calidad del índice ha caído.

**Configura un bucle de retroalimentación.** Incluso una valoración simple de "me gusta/me disgusta" en las respuestas, vinculada a la consulta y a los fragmentos recuperados, te da una señal de entrenamiento. Sin ella, estás navegando a ciegas.

**Ejecuta evaluaciones periódicas.** Un conjunto de prueba con 50-100 preguntas y respuestas conocidas, ejecutado semanalmente, detectará regresiones antes de que los usuarios lo noten. Una hoja de cálculo y un script son suficientes para comenzar.

```typescript
async function runEval(
  testCases: { query: string; expectedAnswer: string }[],
  pipeline: RAGPipeline
) {
  const results = await Promise.all(
    testCases.map(async ({ query, expectedAnswer }) => {
      const response = await pipeline.query(query);
      const score = await scoreResponse(response, expectedAnswer);
      return { query, score, response };
    })
  );

  const avgScore = results.reduce((s, r) => s + r.score, 0) / results.length;
  console.log(`Puntuación de evaluación: ${(avgScore * 100).toFixed(1)}%`);
  
  // Notificar si la puntuación cae por debajo del umbral
  if (avgScore < 0.75) {
    await notifyTeam(`La puntuación de evaluación de RAG ha caído a ${(avgScore * 100).toFixed(1)}%`);
  }

  return results;
}
```

---

## El problema real

Estos fallos no son principalmente sobre el modelo de incrustación o la base de datos vectorial. Son sobre el sistema que los rodea.

Las demostraciones de RAG funcionan porque las condiciones de la demo están controladas: documentos limpios, preguntas bien formuladas, evaluadores tolerantes. En producción fallan porque ninguna de esas condiciones se cumple.

Cada fallo mencionado anteriormente es diagnosable, pero solo si estás midiendo. Los equipos de RAG confiables no hacen nada exótico. Tratan la calidad de la recuperación como un subsistema real, no como un artefacto de demostración.

Configura el bucle de evaluación primero. Todo lo demás será más fácil una vez que puedas medirlo.
````
