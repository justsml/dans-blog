# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: es
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 128.15
- Input tokens: 12502
- Output tokens: 12315
- Thinking tokens: unknown
- Cached input tokens: 3840
- Cache write tokens: 0
- Estimated cost: $0.004672
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug dont-fear-the-model-router --locale es --skip-global (code 1)
## Raw Output

````mdx
---
title: No temas al enrutador de modelos
subTitle: Ruta al mejor modelo con confianza.
modified: '2026-07-03'
tags:
  - ai
  - llm
  - agents
  - mastra
  - evals
  - model-routing
  - testing
  - observability
  - production
category: AI
subCategory: AI Infrastructure
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
related:
  - llm-routing-mastra-ai
  - llm-evals-are-broken
  - mastra-workflows-memory
---
La primera versión de [No te cases con tu modelo](../llm-routing-mastra-ai) defendía la tesis fácil: deja de enviar cada tarea al mismo modelo solo porque ganó la última comparativa.

Usa un modelo barato para trabajo barato. Usa un modelo más potente cuando el trabajo sea realmente difícil. Mantén la capa de enrutamiento lo suficientemente flexible para poder cambiar de proveedor sin convertir tu código en un santuario.

Eso era correcto.

Pero también estaba incompleto.

Porque una vez que añades un enrutador, tienes un nuevo comportamiento del sistema que probar. La pregunta ya no es «¿qué modelo es mejor?». La pregunta es «¿eligió el sistema la ruta correcta, usó las herramientas adecuadas, preservó la evidencia pertinente y se detuvo en el momento oportuno?».

Si no mides eso, tu enrutador de modelos no es más que una corazonada disfrazada de tabla de despacho.

<p class="inset">
El enrutador no es la respuesta. El enrutador es una hipótesis sobre cómo debería comportarse tu sistema.
</p>

Mastra nos ofrece superficies útiles para convertir esa hipótesis en algo comprobable: [scorers](https://mastra.ai/docs/evals/overview), [`runEvals`](https://mastra.ai/reference/evals/run-evals), [datasets](https://mastra.ai/docs/evals/datasets/overview) y [experiments](https://mastra.ai/docs/evals/datasets/running-experiments). Los nombres de la API suenan a infraestructura de evaluación, que lo es, pero el valor real es más simple:

Hacen que el comportamiento del agente sea lo suficientemente visible como para discutirlo.

## ¿Qué estamos probando?

El enrutador de modelos del artículo anterior tiene tres rutas especializadas obvias:

| Ruta | Qué debería ir ahí | Qué sería una mala ruta |
|---|---|---|
| `code` | implementación, refactorización, depuración, revisión de código | resumen de contexto largo, clasificación simple |
| `long-context` | documentos desordenados, transcripciones, síntesis de políticas, muchos archivos | formateo mecánico corto |
| `general` | clasificación, formateo, preguntas y respuestas simples, extracción aburrida | código difícil o análisis basado en evidencia |

Esa tabla es un comienzo, pero no es una evaluación.

Una evaluación necesita ejemplos y scorers:

| Pieza | Función |
|---|---|
| Elemento del dataset | «Aquí hay una solicitud representativa». |
| Verdad de referencia | «Aquí está la ruta o el comportamiento que esperábamos». |
| Scorer | «Así es como decidimos si la salida fue correcta». |
| Experimento | «Aquí está la ejecución que podemos comparar con ejecuciones futuras». |

El movimiento importante es probar el comportamiento, no solo la calidad de la prosa.

Un modelo puede escribir una respuesta preciosa tras elegir al especialista equivocado. Un agente de seguridad puede producir un informe verosímil sin preservar la evidencia. Un agente de soporte puede sonar empático mientras se salta la verificación de la política de reembolsos. El párrafo es la parte visible. La trayectoria es donde viven los errores.

Para un enrutador, normalmente empiezo con cuatro ejes:

| Eje | Pregunta | Evaluador de ejemplo |
|---|---|---|
| Calidad | ¿Eligió la ruta correcta y produjo un resultado útil? | precisión de ruta, completitud de respuesta, fidelidad |
| Costo | ¿Evitó modelos premium para trabajo aburrido? | clase de costo de ruta seleccionada, presupuesto de tokens |
| Velocidad | ¿Terminó dentro del presupuesto de latencia del producto? | evaluador de tiempo de ejecución o timeout |
| Otro | ¿Cumplió con restricciones de seguridad, privacidad y observabilidad? | lista blanca de herramientas, preservación de evidencia, comportamiento de rechazo |

Esa última columna importa. "Otro" es donde viven las cicatrices de producción.

## Hacer que la Decisión del Enrutador sea Puntuable

Si el enrutador solo produce una respuesta final, es difícil saber por qué se comportó como lo hizo. Aún puedes evaluar la salida, pero estás adivinando sobre la decisión.

Para las evaluaciones, dale al paso de enrutamiento un pequeño contrato estructurado:

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

El sistema de producción no necesita mostrar este JSON a los usuarios. Puede ser un paso interno, una transferencia de flujo de trabajo o un span de traza. El evaluador solo necesita una superficie.

Aquí hay un agente Mastra deliberadamente pequeño que elige una ruta:

```typescript
// src/mastra/agents/router-decision-agent.ts
import { Agent } from "@mastra/core/agent";

export const routerDecisionAgent = new Agent({
  id: "router-decision-agent",
  name: "Router Decision Agent",
  instructions: `Choose the best specialist route for the user request.

Return ONLY JSON:
{
  "route": "code" | "long-context" | "general",
  "confidence": number,
  "reason": string
}

Routing rules:
- code: implementation, refactoring, debugging, code review, APIs, tests
- long-context: large documents, transcripts, policy synthesis, many files
- general: classification, formatting, extraction, simple Q&A

Do not answer the user request. Only choose the route.`,
  model: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
});
```

Sí, esto es un poco artificial. Bien. Las evaluaciones recompensan las costuras aburridas.

Cuando la decisión del enrutador es explícita, puedes probar la ruta antes de probar el especialista posterior. Así es como descubres si el problema es el enrutador, el modelo seleccionado, el prompt, la superficie de herramientas o el evaluador de respuesta final.

## Escribir un Evaluador que Atrape el Fracaso Aburrido

El [`createScorer`](https://mastra.ai/reference/evals/create-scorer) de Mastra puede usar funciones de JavaScript, prompts de juez LLM, o ambos. Empieza con funciones siempre que el fallo sea determinista. Son más baratas, más rápidas y menos misteriosas.

Para la precisión de ruta, no necesitamos un modelo juez. Necesitamos parsear JSON y comparar un campo.

```typescript
// src/mastra/scorers/route-accuracy.ts
import { createScorer } from "@mastra/core/evals";

type Route = "code" | "long-context" | "general";
type RouteGroundTruth = {
  route: Route;
  mustMention?: string[];
};

function textFromAgentOutput(output: Array<{ content?: unknown }>) {
  const content = output[0]?.content;
  return typeof content === "string" ? content : JSON.stringify(content ?? "");
}

function parseDecision(output: Array<{ content?: unknown }>) {
  try {
    return JSON.parse(textFromAgentOutput(output)) as {
      route?: string;
      confidence?: number;
      reason?: string;
    };
  } catch {
    return {};
  }
}

export const validRouterJsonScorer = createScorer({
  id: "valid-router-json",
  description: "Checks that the router emits a valid decision object.",
  type: "agent",
})
  .generateScore(({ run }) => {
    const decision = parseDecision(run.output);
    const validRoute = ["code", "long-context", "general"].includes(
      decision.route ?? "",
    );
    const validConfidence =
      typeof decision.confidence === "number" &&
      decision.confidence >= 0 &&
      decision.confidence <= 1;

    return validRoute && validConfidence && decision.reason ? 1 : 0;
  })
  .generateReason(({ score }) =>
    score === 1 ? "Valid router decision." : "Router output was not valid JSON.",
  );

export const routeAccuracyScorer = createScorer({
  id: "route-accuracy",
  description: "Checks whether the selected route matches ground truth.",
  type: "agent",
})
  .generateScore(({ run }) => {
    const expected = run.groundTruth as RouteGroundTruth;
    const decision = parseDecision(run.output);
    return decision.route === expected.route ? 1 : 0;
  })
  .generateReason(({ run, score }) => {
    const expected = run.groundTruth as RouteGroundTruth;
    const decision = parseDecision(run.output);

    return score === 1
      ? `Selected expected route: ${expected.route}.`
      : `Expected ${expected.route}, got ${decision.route ?? "nothing"}.`;
  });
```

Ese evaluador no es glamuroso. Ese es el punto.

Si el enrutador no puede producir consistentemente JSON válido y elegir el especialista obvio en un conjunto de prueba pequeño, no hay razón para confiarle tráfico de producción. No necesitas un modelo filósofo calificando ontologías. Necesitas el equivalente de una alarma de humo con batería.

## Ejecutar el Pequeño Bucle de Evaluación Primero

El [`runEvals`](https://mastra.ai/reference/evals/run-evals) de Mastra es el bucle rápido. Dale un objetivo, casos de prueba, evaluadores y un límite de concurrencia. Ejecuta el objetivo contra los datos y devuelve puntuaciones agregadas.

```typescript
// src/mastra/evals/router.eval.ts
import { runEvals } from "@mastra/core/evals";
import { routerDecisionAgent } from "../agents/router-decision-agent";
import {
  routeAccuracyScorer,
  validRouterJsonScorer,
} from "../scorers/route-accuracy";

const routingCases = [
  {
    input: "Refactor this React component to remove duplicated state.",
    groundTruth: { route: "code" },
  },
  {
    input: "Summarize these 14 interview transcripts and find recurring objections.",
    groundTruth: { route: "long-context" },
  },
  {
    input: "Classify this ticket as billing, technical, account, or other.",
    groundTruth: { route: "general" },
  },
  {
    input: "Debug a failing Playwright test that only breaks in CI.",
    groundTruth: { route: "code" },
  },
  {
    input: "Extract the renewal date and contract value from this short paragraph.",
    groundTruth: { route: "general" },
  },
];

const result = await runEvals({
  target: routerDecisionAgent,
  data: routingCases,
  scorers: [validRouterJsonScorer, routeAccuracyScorer],
  targetOptions: {
    modelSettings: { temperature: 0 },
  },
  concurrency: 3,
});

console.log(result.scores);
console.log(result.summary.totalItems);

if (result.scores["valid-router-json"] < 1) {
  throw new Error("Router emitted invalid decision JSON.");
}

if (result.scores["route-accuracy"] < 0.9) {
  throw new Error("Router route accuracy fell below 90%.");
}
```

Este es el bucle que ejecutas mientras cambias el prompt, agregas una nueva ruta o pruebas un modelo de enrutador más barato.

No es suficiente para un sistema maduro, pero es suficiente para evitar la regresión más embarazosa: "cambiamos el prompt del enrutador y empezó a enviar tareas de clasificación al modelo de código premium".

Coste, velocidad, calidad y demás aparecen aquí:

- **Coste**: el modelo del enrutador puede mantenerse barato si la precisión se sostiene.
- **Velocidad**: la evaluación puede imponer tiempos de espera o registrar latencia en el entorno de pruebas.
- **Calidad**: la precisión de la ruta y la calidad de la respuesta final son puntuaciones separadas.
- **Otros**: la validez JSON, las herramientas permitidas, la seguridad y la trazabilidad tienen sus propias comprobaciones.

No agrupes todo eso en una puntuación única de "calidad". Los promedios son el lugar donde los fallos útiles van a jubilarse.

## Añade un juez LLM solo donde realmente lo valga

Parte del comportamiento del enrutador es subjetivo. Una solicitud puede ser legítimamente ambigua:

```text
Lee estos logs y dime por qué falló el despliegue.
```

¿Es `code` porque depuración? ¿`long-context` porque son logs? ¿`general` porque es un resumen? La ruta correcta depende de la superficie de herramientas y de la promesa de tu producto.

Aquí es donde un juez LLM puede ayudar, pero solo con una rúbrica estricta. Los scorers de Mastra pueden mezclar pasos de función y pasos de objeto prompt. Usa funciones para la estructura, y luego un juez para la parte que realmente necesita juicio.

```typescript
// src/mastra/scorers/route-reasonableness.ts
import { createScorer } from "@mastra/core/evals";
import { z } from "zod";

export const routeReasonablenessScorer = createScorer({
  id: "route-reasonableness",
  description: "Judges whether the route explanation matches the request.",
  type: "agent",
  judge: {
    model: process.env.JUDGE_MODEL ?? "openai/gpt-5-mini",
    instructions: "You are a strict evaluator for model-routing decisions.",
  },
})
  .analyze({
    description: "Evaluate the router's decision rationale.",
    outputSchema: z.object({
      score: z.number().min(0).max(1),
      rationale: z.string(),
    }),
    createPrompt: ({ run }) => `
User request:
${JSON.stringify(run.input)}

Router output:
${JSON.stringify(run.output)}

Score from 0 to 1.

1.0 = route is clearly appropriate and the reason cites the right task signals
0.5 = route is defensible but underspecified or ambiguous
0.0 = route is wrong, unsupported, or the reason is unrelated

Return JSON with { "score": number, "rationale": string }.
`,
  })
  .generateScore(({ results }) => results.analyzeStepResult.score)
  .generateReason(({ results }) => results.analyzeStepResult.rationale);
```

Este scorer cuesta dinero porque invoca un modelo juez. Eso está bien cuando el juicio lo justifica.

No lo uses para comprobar si el JSON se analiza correctamente.

## Promueve los casos buenos a un conjunto de datos

Los arrays de evaluación escritos a mano están bien al principio. Con el tiempo, tus ejemplos se convierten en activos del producto. El ticket de cliente que falló, la conversación extraña de soporte, el intento de inyección de prompt, la solicitud que solía enrutarse correctamente antes del jueves pasado.

Eso pertenece a un conjunto de datos.

Los conjuntos de datos de Mastra son colecciones versionadas de casos de prueba. Cada mutación crea una nueva versión, lo que significa que puedes reejecutar un experimento contra el conjunto exacto de casos que existía cuando tomaste una decisión de modelo.

Primero configura el almacenamiento, porque los conjuntos de datos necesitan persistencia:

```typescript
// src/mastra/index.ts
import { Mastra } from "@mastra/core";
import { LibSQLStore } from "@mastra/libsql";
import { routerDecisionAgent } from "./agents/router-decision-agent";
import {
  routeAccuracyScorer,
  validRouterJsonScorer,
} from "./scorers/route-accuracy";

export const mastra = new Mastra({
  storage: new LibSQLStore({
    id: "router-evals",
    url: "file:./mastra.db",
  }),
  agents: {
    routerDecisionAgent,
  },
  scorers: {
    validRouterJson: validRouterJsonScorer,
    routeAccuracy: routeAccuracyScorer,
  },
});
```

Luego crea un conjunto de datos y añade casos:

```typescript
// src/mastra/evals/create-router-dataset.ts
import { z } from "zod";
import { mastra } from "../index";

const dataset = await mastra.datasets.create({
  name: "router-decisions-v1",
  description: "Representative model-router decisions for CI and experiments.",
  inputSchema: z.string(),
  groundTruthSchema: z.object({
    route: z.enum(["code", "long-context", "general"]),
    source: z.string().optional(),
  }),
});

await dataset.addItems({
  items: [
    {
      input: "Refactor this React component to remove duplicated state.",
      groundTruth: { route: "code", source: "synthetic:happy-path" },
    },
    {
      input: "Summarize these 14 interview transcripts and find recurring objections.",
      groundTruth: { route: "long-context", source: "synthetic:happy-path" },
    },
    {
      input: "Classify this ticket as billing, technical, account, or other.",
      groundTruth: { route: "general", source: "synthetic:happy-path" },
    },
  ],
});
```

En el momento en que tienes un conjunto de datos, puedes dejar de tratar los casos de evaluación como datos desechables de scripts. Ahora tienen IDs, versiones, historial y resultados de experimentos.

Es entonces cuando las evaluaciones empiezan a sentirse menos como "archivos de prueba para prompts" y más como memoria del producto.

## Ejecuta experimentos contra el enrutador

Una vez que existe el conjunto de datos, usa [`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) para ejecutarlo contra un agente, flujo de trabajo o evaluador registrado.

```typescript
// src/mastra/evals/run-router-experiment.ts
import { mastra } from "../index";

const dataset = await mastra.datasets.get({ id: process.env.ROUTER_DATASET_ID! });

const summary = await dataset.startExperiment({
  name: "router-gpt-5-mini-baseline",
  description: "Ejecución de línea base del enrutador antes de agregar la ruta de seguridad.",
  targetType: "agent",
  targetId: "router-decision-agent",
  scorers: ["validRouterJson", "routeAccuracy"],
  metadata: {
    routerModel: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
    promptVersion: "router-2026-07-03",
  },
  maxConcurrency: 5,
  itemTimeout: 30_000,
  maxRetries: 1,
});

console.log(`${summary.succeededCount}/${summary.totalItems} items succeeded`);

for (const item of summary.results) {
  const scores = Object.fromEntries(
    item.scores.map((score) => [score.scorerId, score.score]),
  );

  console.log(item.itemId, item.output, scores);
}
```

Ahora la conversación cambia.

En lugar de «el nuevo enrutador parece mejor», puedes decir:

- El enrutador antiguo obtuvo `0.94` en precisión de ruta.
- El nuevo enrutador obtuvo `0.98` en general.
- Mejoró el enrutamiento de contexto largo.
- Empeoró dos casos de revisión de código.
- Redujo las transferencias a modelos premium en un 18%.
- Añadió 300 ms de latencia al enrutador.

Eso es una conversación de ingeniería. Hay ventajas y desventajas. Puedes decidir si el intercambio vale la pena.

## Evalúa el comportamiento en vivo, pero no lo confundas con la verdad fundamental

Mastra también puede adjuntar evaluadores directamente a agentes y pasos de flujo de trabajo. Los evaluadores en vivo se ejecutan de forma asíncrona y almacenan los resultados de la evaluación en la base de datos configurada, con controles de muestreo para no evaluar cada respuesta en producción a menos que sea necesario.

Eso es útil, pero es un trabajo diferente.

```typescript
import { Agent } from "@mastra/core/agent";
import { validRouterJsonScorer } from "../scorers/route-accuracy";

export const routerDecisionAgent = new Agent({
  id: "router-decision-agent",
  instructions: "Elige la mejor ruta especialista...",
  model: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
  scorers: {
    validRouterJson: {
      scorer: validRouterJsonScorer,
      sampling: { type: "ratio", rate: 1 },
    },
  },
});
```

La evaluación en vivo puede decirte que el enrutador sigue emitiendo decisiones válidas. Puede detectar salidas malformadas, contenido tóxico, llamadas a herramientas prohibidas, marcadores de evidencia faltantes o confianza sospechosamente baja.

Generalmente no puede decirte la precisión de ruta, porque el tráfico de producción no llega con la verdad fundamental adjunta.

Esa distinción importa. La evaluación en vivo es monitoreo. Los experimentos con conjuntos de datos son pruebas controladas. Necesitas ambas, pero responden preguntas diferentes.

## Qué medir después de la precisión de ruta

La precisión de ruta es el primer escalón. Te dice si la solicitud llegó al especialista esperado. No te dice si el especialista hizo un buen trabajo.

Después de que el enrutador pase lo básico, evalúa el sistema por capas:

| Capa | Qué evaluar | Por qué importa |
|---|---|---|
| Decisión del enrutador | ruta seleccionada, confianza, razón | Detecta clasificaciones incorrectas y malas reglas de escalado |
| Trayectoria | secuencia esperada de herramientas o agentes | Detecta comportamiento de «respuesta correcta, ruta incorrecta» |
| Salida del especialista | corrección, fidelidad, utilidad | Detecta trabajo de baja calidad tras un enrutamiento correcto |
| Costo y latencia | elección del modelo, tokens, tiempo de ejecución | Detecta victorias costosas o lentas |
| Seguridad y alcance | herramientas permitidas, límites de rechazo, evidencia | Detecta fallos de riesgo del producto |

La API `runEvals` de Mastra admite configuraciones de evaluador a nivel de agente, flujo de trabajo, paso y trayectoria. Eso significa que no tienes que fingir que la respuesta final es el único artefacto.

Para un flujo de trabajo, la forma puede verse así:

```typescript
const result = await runEvals({
  target: supportWorkflow,
  data: supportCases,
  scorers: {
    workflow: [finalAnswerQualityScorer],
    steps: {
      "route-request": [routeAccuracyScorer],
      "check-policy": [policyGroundingScorer],
    },
    trajectory: [expectedPathScorer],
  },
});
```

Ese es el modelo mental que quiero para agentes en producción:

Puntúa la decisión. Puntúa la ruta. Puntúa la respuesta.

Si solo puntúas la respuesta, el modelo puede acertar por accidente.

## El encaminador debería volverse más aburrido con el tiempo

El primer prompt de encaminamiento suele ser un párrafo de juicios subjetivos. Eso está bien para un prototipo.

A medida que aprendes de las evaluaciones, partes del encaminador deberían volverse menos mágicas:

- Los casos léxicos claros pueden convertirse en reglas deterministas.
- Las tareas arriesgadas pueden requerir aprobación explícita o una rama del flujo de trabajo.
- Las tareas ambiguas pueden hacer una pregunta aclaratoria en lugar de adivinar.
- Las rutas costosas pueden requerir mayor confianza o una segunda señal.
- Los casos de fallo conocidos pueden convertirse en elementos del conjunto de datos.

El objetivo no es hacer al encaminador "más inteligente" para siempre. El objetivo es hacer que el sistema sea más fácil de razonar.

A veces eso significa un mejor modelo. A veces significa un prompt más ajustado. A veces significa un paso del flujo de trabajo, un evaluador, un límite duro o una aburrida sentencia `if` que te ahorre cuatro cifras al mes.

Ese es el sentido de medir el comportamiento. Dejas de discutir por gusto y empiezas a discutir por evidencia.

## Una lista de verificación práctica para empezar

Si estás construyendo un encaminador de Mastra hoy, yo empezaría aquí:

1. Haz que la decisión de encaminamiento sea estructurada, incluso si los usuarios nunca la ven.
2. Escribe evaluadores deterministas para JSON válido, ruta esperada y rutas prohibidas.
3. Usa `runEvals` con 10-20 casos antes de cambiar prompts o modelos del encaminador.
4. Promueve fallos reales a un conjunto de datos versionado.
5. Ejecuta experimentos del conjunto de datos para cambios significativos en prompt, modelo, ruta o flujo de trabajo.
6. Añade evaluadores en vivo para invariantes baratos en producción.
7. Compara experimentos por ruta, no solo por puntuación media.

La media importa menos que el grupo de fallos.

Si cada regresión está en la síntesis de políticas de contexto largo, no tienes "un encaminador peor". Tienes un problema de límite de ruta. Si cada caso fallido usa una herramienta específica, tienes un problema de contrato de herramienta. Si cada modelo barato falla en los mismos dos casos ambiguos, puede que necesites lógica de escalamiento en lugar de un valor por defecto más caro.

Aquí es donde las evaluaciones se vuelven útiles. No como una ceremonia. No como un panel que hace que todos se sientan temporalmente adultos.

Como una forma de encontrar la forma del sistema.

## Recursos

- [Visión general de los evaluadores de Mastra](https://mastra.ai/docs/evals/overview)
- [Referencia de `createScorer` de Mastra](https://mastra.ai/reference/evals/create-scorer)
- [Referencia de `runEvals` de Mastra](https://mastra.ai/reference/evals/run-evals)
- [Visión general de los conjuntos de datos de Mastra](https://mastra.ai/docs/evals/datasets/overview)
- [Experimentos con conjuntos de datos de Mastra](https://mastra.ai/docs/evals/datasets/running-experiments)
- [No te cases con tu modelo](../llm-routing-mastra-ai)
- [¡Combate los males con evaluaciones!](../llm-evals-are-broken)
````
