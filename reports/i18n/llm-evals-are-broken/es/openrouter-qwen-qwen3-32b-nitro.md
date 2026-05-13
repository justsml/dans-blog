# Translation Candidate
- Slug: llm-evals-are-broken
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-06--llm-evals-are-broken/es/index.mdx
- Validation: passed
- Runtime seconds: 31.15
- Input tokens: 10963
- Output tokens: 11589
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.003658
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Combate el Mal con Evals
subTitle: Los benchmarks miden benchmarks. Tu sistema necesita sus propias métricas.
date: '2026-05-01'
modified: '2026-05-06'
tags:
  - ai
  - llm
  - evals
  - testing
  - production
  - quality
  - observability
category: AI
subCategory: Engineering
popularity: 0.85
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Cada nuevo modelo llega vestido con un smoking de benchmarks.  

MMLU: 92,4%. HumanEval: 87,2%. LLeMU: 88,7%. MATH: 73,6%. AGI: 127%¡!  

Sin embargo, para el 99% de las empresas que construyen procesos y productos con IA, **ninguno de esto importa.**  

¿Qué importa? ¿Cómo se están comportando SUS cargas de trabajo? ¿Mejor o peor? La única forma sensata de saberlo es escribir Evals (pruebas para LLM) que reflejen las tareas específicas, datos y modos de fallo de tu sistema.  

<blockquote class="breakout">  
  <p>Los benchmarks no mienten. Están respondiendo a otra pregunta.</p>  
</blockquote>

## ¿Qué cuesta realmente la evaluación basada en "vibes"?

El enfoque estándar: lanzar un cambio en el modelo, observar los canales de quejas, revertir si la situación se pone tensa.

Esto omite casi todo lo interesante:

**Solo captas fallos evidentes.** Usuarios que reciben una respuesta claramente incorrecta y no se dan cuenta? Silenciosos. Usuarios que obtienen una respuesta peor y abandonan la característica? Silenciosos. Los tickets de soporte y las tasas de error capturan solo una fracción de la regresión de calidad.

**No puedes distinguir regresiones de mejoras.** Si el nuevo modelo es mejor en la tarea A y peor en la tarea B, las quejas sobre B parecen idénticas a comentarios genéricos sobre "la IA se ha deteriorado". No sabes qué arreglar.

**Estás usando a tus usuarios como infraestructura de prueba.** Ellos no firmaron para eso.

## El espectro de evaluación (y dónde la mayoría de los equipos se equivoca)

Los enfoques de evaluación se sitúan en un espectro que va de "rápido pero frágil" a "costoso pero válido".

<figure class="breakout">

![Un diagrama de espectro que compara comprobaciones deterministas, LLM-como-juez y evaluación humana por velocidad, costo y validez.](../eval-spectrum.svg)

<figcaption>Utiliza el método de evaluación más económico que pueda detectar honestamente el fallo.</figcaption>
</figure>

**LLM-como-juez** es el favorito actual: pide a un modelo potente que califique las salidas de otro modelo. Rápido, escalable, barato. El problema: incorpora los sesgos del modelo evaluador, se puede manipular y crea una dependencia circular. Si usas GPT-5 para calificar las salidas de GPT-5, estás midiendo algo como "cuánto se parece GPT-5 a GPT-5". Eso no es nada, pero tampoco es lo que crees.

**Evaluación humana** es el estándar de oro que a todos les gustaría omitir. Obtener a humanos para que evalúen las salidas es costoso, lento, inconsistente entre evaluadores y molesto de programar. Pero es lo único que valida si tu sistema es útil para humanos reales.

**Comprobaciones automatizadas específicas de la tarea** son donde la mayoría de los equipos deberían invertir más tiempo. No son glamorosas, pero son rápidas, deterministas y están vinculadas a lo que realmente importa en tu sistema.  

---

## ¿Qué funciona realmente  

### 1. Define el fallo antes de desplegar  

Antes de cambiar un modelo o un prompt, escribe qué se ve mal. Específicamente.  

No *"la salida debe ser precisa"*. Eso no es una prueba. Más bien algo como:

- La salida en formato JSON estructurado debe analizarse sin errores  
- Todas las citas en la respuesta deben aparecer textualmente en el contexto recuperado  
- Las respuestas no deben mencionar nombres de productos de competidores  
- Las consultas SQL deben ser sintácticamente válidas y referirse solo a tablas que existan en el esquema  
- La clasificación de sentimiento no debe cambiar de positivo a negativo más del 3% de las veces en el conjunto de pruebas existente  

Puedes verificar estos criterios de forma programática. No se requiere modelo juez.  

**Entorno de evaluación: comprobaciones deterministas**  

```typescript
type EvalResult = { passed: boolean; reason?: string };

const evals: Record<string, (output: string, context: EvalContext) => EvalResult> = {
  // El JSON debe analizarse
  validJson: (output) => {
    try {
      JSON.parse(output);
      return { passed: true };
    } catch (e) {
      return { passed: false, reason: `JSON no válido: ${e.message}` };
    }
  },

  // Sin citas generadas por el modelo — cada afirmación debe aparecer en el contexto
  groundedCitations: (output, { retrievedChunks }) => {
    const claims = extractCitations(output);
    const ungrounded = claims.filter(
      (claim) => !retrievedChunks.some((chunk) => chunk.includes(claim))
    );
    return ungrounded.length === 0
      ? { passed: true }
      : { passed: false, reason: `Afirmaciones sin fundamento: ${ungrounded.join(', ')}` };
  },

  // Comprobación de longitud razonable — detectar truncamiento o generación excesiva
  reasonableLength: (output) => {
    const words = output.split(/\s+/).length;
    return words >= 10 && words <= 2000
      ? { passed: true }
      : { passed: false, reason: `Número de palabras ${words} fuera de límites` };
  },
};
```

### 2. Construye un conjunto dorado a partir de tus peores días  

Tus mejores datos de evaluación son los casos incómodos: las salidas que hicieron que alguien abriera un ticket, tomara una captura de pantalla de una generación errónea o dejara de usar silenciosamente la función.  

Cada vez que un usuario reporte una salida incorrecta, señale una generación errónea o detectes un fallo manualmente, agrégalo a tu conjunto dorado: la entrada, el contexto y el comportamiento correcto. Mantén entre 50 y 100 casos y ejecútalos en cada cambio de modelo.

Al principio, esto puede parecer manual. Después de seis meses, tendrás una suite de pruebas que ningún benchmark público puede manipular, ya que cada caso proviene de tu propia historia de fallos.

<figure class="breakout">

![Un diagrama de flujo que muestra cómo los incidentes malos en producción se convierten en casos dorados, luego en ejecuciones de evaluación en CI, y finalmente en bloqueos de regresiones o liberaciones aprobadas.](../golden-set-lifecycle.svg)

<figcaption>Un conjunto dorado convierte lo incómodo en una suite de regresión.</figcaption>
</figure>

**Forma de un caso dorado**

```typescript
interface GoldenCase {
  id: string;
  input: string;
  context: Record<string, unknown>;
  expectedBehavior: {
    mustContain?: string[];
    mustNotContain?: string[];
    structureCheck?: (output: string) => boolean;
    minSimilarityToReference?: number; // similitud coseno con una respuesta de referencia
  };
  sourceIncident?: string; // enlace al informe de error o ticket
}
```

### 3. Pruebas de regresión, no solo pruebas de aceptación

La mayoría de los equipos ejecutan evaluaciones solo cuando consideran un cambio de modelo. Eso es prueba de aceptación: "¿es esto nuevo suficientemente bueno?".

También necesitas pruebas de regresión: "¿rompió esto algo que solía funcionar?".

Ejecuta tu conjunto dorado en cada cambio de prompt, no solo en cambios de modelo. Un prompt que funcionaba correctamente puede degradarse silenciosamente cuando agregas una nueva herramienta, cambias la estrategia de recuperación RAG o actualizas tu plantilla de contexto. No lo sabrás sin una línea base. Herramientas como [Langfuse](https://langfuse.com/) adjuntan puntuaciones de evaluación a trazas de producción para que las regresiones aparezcan en dashboards, no solo en informes de incidentes.

<details>
<summary>Entorno de evaluación: comparación entre baseline y candidato</summary>

```typescript
async function compareModelVersions(
  goldenCases: GoldenCase[],
  baselinePipeline: Pipeline,
  candidatePipeline: Pipeline
) {
  const results = await Promise.all(
    goldenCases.map(async (tc) => {
      const [baseline, candidate] = await Promise.all([
        baselinePipeline.run(tc.input, tc.context),
        candidatePipeline.run(tc.input, tc.context),
      ]);

      return {
        id: tc.id,
        baselinePassed: runEvals(baseline, tc.expectedBehavior),
        candidatePassed: runEvals(candidate, tc.expectedBehavior),
        regression: /* baseline passed */ && /* candidate failed */,
        improvement: /* baseline failed */ && /* candidate passed */,
      };
    })
  );

  const regressions = results.filter((r) => r.regression);
  const improvements = results.filter((r) => r.improvement);

  console.log(`Regressions: ${regressions.length} / ${goldenCases.length}`);
  console.log(`Improvements: ${improvements.length} / ${goldenCases.length}`);

  if (regressions.length > 0) {
    console.error('Blocking regressions found:');
    regressions.forEach((r) => console.error(` - ${r.id}`));
  }

  return { regressions, improvements };
}
```

</details>

Si un candidato regresa sobre fallos conocidos, la conversación sobre la actualización se vuelve específicamente detallada: ¿qué casos mejoraron, qué casos se rompieron y si la compensación vale la pena.

### 4. Usa LLM-como-juez para Exactamente Una Cosa

LLM-como-juez es útil para salidas abiertas donde no hay una respuesta determinista correcta: "¿es esta respuesta útil?", "¿preserva esta resumen los puntos clave?", "¿es esta explicación adecuada para un principiante?".

Usa esto allí. No lo uses para respuestas deterministas. Cuando lo uses, haz explícita la rúbrica de calificación:

**Eval harness: juez basado en rúbrica**  

```typescript
async function judgeHelpfulness(
  userQuery: string,
  modelResponse: string
): Promise<{ score: number; reasoning: string }> {
  const judgePrompt = `
You are evaluating a customer support response.

User question: ${userQuery}
Response: ${modelResponse}

Rate the response on a scale of 1-5:
5 = Directly answers the question with accurate, actionable information
4 = Answers the question but could be more specific or actionable
3 = Partially addresses the question; key information is missing
2 = Tangentially related but doesn't answer the question
1 = Off-topic, factually wrong, or harmful

Respond with JSON: {"score": <number>, "reasoning": "<one sentence>"}
`;

  const result = await judgeModel.generate(judgePrompt);
  return JSON.parse(result);
}
```  

Una rúbrica explícita reduce la variabilidad entre evaluadores, genera una salida interpretable y facilita la auditoría cuando el juez comete errores. Bibliotecas como [Autoevals](https://github.com/braintrustdata/autoevals) y [Braintrust](https://www.braintrust.dev/) incluyen rúbricas preconstruidas para tareas comunes: vale la pena aprovechar antes de escribir las tuyas desde cero.  

---

## Herramientas que Vale la Pena Conocer  

No necesitas construir todo desde cero. Varias herramientas han avanzado significativamente en el problema de la infraestructura de evaluaciones:  

**[Braintrust](https://www.braintrust.dev/)** — Plataforma completa de evaluación con seguimiento de experimentos, gestión de conjuntos de datos y funciones de puntuación. Organiza las ejecuciones de evaluación por prompt, modelo y despliegue para que puedas comparar la calidad con el tiempo, no solo entre versiones. Funciona bien con su biblioteca open-source **[Autoevals](https://github.com/braintrustdata/autoevals)**, que incluye funciones de puntuación calificadas por modelos para tareas comunes (precisión factual, utilidad, toxicidad, similitud semántica).

**[Langfuse](https://langfuse.com/)** — Observabilidad de modelos de lenguaje de código abierto que se sitúa entre tu aplicación y tus modelos. Rastrea cada llamada, adjunta puntuaciones de evaluación (humanas o automatizadas) a cada tramo individual y muestra tendencias de calidad en el tráfico de producción. Buena opción si prefieres observabilidad y evaluaciones en la misma herramienta, en lugar de un entorno de evaluación separado.

**[Evalite](https://www.evalite.dev/)** — Marco de evaluación nativo de TypeScript por Matt Pocock. Mínima ceremonia: define una tarea, define un evaluador, ejecútalo en tu configuración de pruebas existente. Dirigido a equipos que quieren evaluaciones que se sientan como pruebas unitarias, no como una plataforma de experimentos de ML separada.

**[promptfoo](https://www.promptfoo.dev/)** — Ejecutor de evaluación centrado en CLI orientado a comparación de prompts y pruebas de ataque rojo. Fácil de configurar mediante YAML, se integra con la mayoría de proveedores de modelos y tiene soporte integrado para detectar inyección de prompts y otros inputs adversarios.

**[deepeval](https://docs.confident-ai.com/)** — Marco de evaluación en Python con una biblioteca amplia de métricas integradas (G-Eval, fidelidad RAG, relevancia de respuestas, detección de alucinaciones). Útil para tuberías RAG donde necesitas evaluación específica de la calidad de recuperación, no solo de generación.

La herramienta adecuada depende de tu pila y de desde dónde estás comenzando. Lo que importa más que la elección del marco es la disciplina de ejecutar evaluaciones en absoluto — de manera consistente, en cada cambio significativo.

## La Parte Incómoda

La mayoría de los equipos lo omiten porque plantea una pregunta incómoda temprano: ¿qué se vería bien aquí?

Eso es genuinamente difícil para una nueva característica de IA. También es obligatorio si te importa la confiabilidad. Los equipos que implementan IA confiable hacen lo mismo que harían para cualquier ruta de código crítica: definir el comportamiento esperado, probarlo y ejecutar esas pruebas de forma continua.

Las referencias no están mintiendo. Están respondiendo a una pregunta de otra persona. Deja de leerlas como mapas de ruta de productos y comienza a escribir pruebas que se ajusten a tu sistema.

Tus usuarios se darán cuenta antes que tus dashboards. Construye el conjunto de pruebas primero.
````
