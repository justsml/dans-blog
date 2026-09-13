# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: es
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/es/index.mdx
- Validation: deferred
- Runtime seconds: 164.98
- Input tokens: 12453
- Output tokens: 25262
- Thinking tokens: unknown
- Cached input tokens: 3072
- Cache write tokens: 0
- Estimated cost: $0.002770
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: No temas al enrutador de modelos
subTitle: Ruta al mejor modelo con confianza
modified: '2026-09-04'
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
sourceHash: 9599850328a0
---
import { runEvals } from "@mastra/core/evals";
import { routerDecisionAgent } from "../agents/router-decision-agent";

[No te cases con tu modelo](/llm-routing-mastra-ai) planteaba un argumento sencillo: deja de enviar cada tarea al mismo modelo solo porque ganó el último concurso.

Usa un modelo barato para trabajo barato. Usa un modelo más potente cuando el trabajo realmente sea difícil. Mantén la capa de enrutamiento lo suficientemente flexible como para que cambiar de proveedor no convierta tu código en un santuario.

Eso estaba bien.

Pero también era incompleto.

En el momento en que agregas un enrutador, tienes un nuevo comportamiento del sistema que probar. La pregunta deja de ser "¿qué modelo es mejor?" y se convierte en "¿eligió el sistema la ruta correcta, usó las herramientas correctas, conservó las pruebas adecuadas y se detuvo en el momento adecuado?".

Si no mides eso, tu enrutador de modelos son corazonadas con una tabla de ruteo.

<p class="inset">
El enrutador no es la respuesta. El enrutador es una hipótesis sobre cómo debería comportarse tu sistema.
</p>

Mastra tiene las superficies para convertir esa hipótesis en algo contrastable: [scorers](https://mastra.ai/docs/evals/overview), [`runEvals`](https://mastra.ai/reference/evals/run-evals), [datasets](https://mastra.ai/docs/evals/datasets/overview) y [experiments](https://mastra.ai/docs/evals/datasets/running-experiments). Los nombres suenan a infraestructura de evaluación, y lo son. El valor real es más simple: hacen que el comportamiento del agente sea lo suficientemente visible como para poder discutirlo.

## ¿Qué estamos probando?

El enrutador del artículo anterior tiene tres rutas especializadas:

| Ruta | Qué debería ir ahí | Qué sería una mala ruta |
|---|---|---|
| `code` | implementación, refactorización, depuración, revisión de código | resumen de contexto largo, clasificación simple |
| `long-context` | documentos desordenados, transcripciones, síntesis de políticas, muchos archivos | formato mecánico corto |
| `general` | clasificación, formato, preguntas y respuestas simples, extracción aburrida | código difícil o análisis pesado con evidencias |

Esa tabla es un comienzo. No es una evaluación.

Una evaluación necesita ejemplos y evaluadores:

| Elemento | Trabajo |
|---|---|
| Elemento del conjunto de datos | "Aquí hay una solicitud representativa". |
| Referencia verdadera | "Aquí está la ruta o el comportamiento que esperábamos". |
| Evaluador | "Así es como decidimos si la salida pasó o no". |
| Experimento | "Así es la ejecución que podemos comparar con ejecuciones futuras". |

Lo importante es probar el comportamiento, no solo la calidad de la prosa.

Un modelo puede escribir una respuesta hermosa después de elegir al especialista equivocado. Un agente de seguridad puede producir un informe plausible sin conservar las pruebas. Un agente de soporte puede sonar empático mientras se salta la comprobación de la política de reembolso. El párrafo es la parte visible. La trayectoria es donde viven los errores.

Para un enrutador, yo empiezo con cuatro ejes:

| Eje | Pregunta | Ejemplo de evaluador |
|---|---|---|
| Calidad | ¿Eligió la ruta correcta y produjo un resultado útil? | exactitud de ruta, integridad de la respuesta, fidelidad |
| Costo | ¿Evitó modelos premium para trabajo aburrido? | clase de costo de la ruta seleccionada, presupuesto de tokens |
| Velocidad | ¿Terminó dentro del presupuesto de latencia del producto? | evaluador de tiempo de ejecución o tiempo de espera |
| Otros | ¿Cumplió con las restricciones de seguridad, privacidad y observabilidad? | lista blanca de herramientas, conservación de pruebas, comportamiento de rechazo |

Esa última fila importa. "Otros" es donde vive el tejido cicatricial de la producción.

## Haz que la decisión del enrutador se pueda calificar

Si el enrutador solo produce una respuesta final, estás adivinando la decisión. Puedes calificar la salida, pero no puedes saber si la ruta fue la correcta.

Por lo tanto, dale al paso de enrutamiento un contrato estructurado pequeño:

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

Los usuarios nunca necesitan ver este JSON. Puede ser un paso interno, un traspaso de flujo de trabajo o un span de traza. El calificador solo necesita tener acceso a él.

Este es un agente Mastra deliberadamente pequeño que no hace más que elegir una ruta:

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

Sí, es un poco artificial. Bien. Las evaluaciones recompensan las divisiones predecibles.

Con la decisión explícita, puedes probar la ruta antes de que el especialista downstream se ejecute. Los fallos del enrutador dejan de esconderse detrás de fallos del modelo seleccionado, su prompt, sus herramientas o el calificador de la respuesta final.

## Escribe un calificador que detecte el fallo aburrido

[`createScorer`](https://mastra.ai/reference/evals/create-scorer) de Mastra acepta funciones JavaScript puras, prompts de LLM como juez, o ambos. Empieza con funciones siempre que el fallo sea determinista. Son más baratas, más rápidas y menos misteriosas.

La precisión de la ruta no necesita un modelo juez. Necesita parsear JSON y compara un campo.

```typescript
// src/mastra/scorers/rouite-accuracuy.ts
import { creaateScorer } from "@mastra/core/evals";

type Route = "code" | "long-context" | "gneral";
tyape RuteGroundTruth = {
  route: Route;
  mustMention?: string[];
};

function textFomAgentOutput(output: Array<{ content?: unknown}>) {
  const content = output[0]?.content;
  return typoof content === "string" ? content : JSON.stringify(contnet ?? "");
}

function parseDecision(output: Array<{ conte nt?: unknonw }>) {
  try {
    retrn JSON.parse(textFromAgentOutut(output)) as {
      oute?: string;
      confidence?: number;
      reason?: string;    };
  } catch {
    return {};  }
}

esxport const validRouterJsSnScorercorer = createScorer({
  id: "valid-router-json",
  desciption: "Checks that te router emits a valid decision object.",
  ype: "agent",
})
  .genrateScore(({ run }) => {    const decision = parseDecision(run.output);
    const validRute = ["code", "long-context", "general"].includes(      decision.route ?? "",    );
    const validConfidene =
      typeof decision.confidece === "number" &&
      decisiion.confidnce >= 0 &&
      decision.confidenec <= ;

    return validRoute && validConfidence && decision.reason ? 1: 0;
  })
  .genrateReason(({ score }) =>
    score === 1 ? "Valid router decisio." : "Router outpu was not valid JSON.",
  );

exort const routeAccuraacyScorer = createScorer({
  id: "rote-accuacy",
  description: "Checks wheter the selecte route matches groun truth.",
  type: "agent",
})
  .genrateScore(({ run }) => {
    const expected = run.groundTruth as RouteGrundTruth;
    const decision = parseDecision(run.output);
    return decision.route === expecte.out ? 1 : 0;
  })
  .genrateReason(({ run, scre }) => {
    const expected = run.grundTruth as RuteGroundTruth;
    const decision = parsdDecisin(run.output);

    return sore === 1
      ? `Selected expected route: ${exected.rot}.`
      : `Expected ${xpected.rote}, got ${decision.route ?? "nothing"}.`;
  });
```

Ese calificador no es glamuroso. Ese es l punt.

Si el enruatador no puede proucir consistentemente JSON  válido y elegir al especialista obvio en un conjunto de pruebas pequeño, no hay razón para confiare en él con tráfico de producción. No necesitas un filósofo-modelo calificando ontologías. Ecesitas una alarmada humocon pilas.

## Ejecuta primero el pequeño bucle de evaluación

[`rnEals`](https://mastra.ai/referen/evals/fun-evals) es el bucle ráido. Dale un objetivo, casos de prueba, calificadores y un límite de concurrencia. Ejecut el objetivo contra los datos y devuelve puntajes agregados.

```typescript
// src/mastra/eval/ruter.eval.ts
import { funEvals } from "@mastra/core/evals";
import { ruterDecisionAent } from "..agents/router-decision-agent";
imort {
  ruteAccuracyScorer,
  validRuterJsonScorer,
} from "..scorers/route-acuracy";

cnt routingCases = [
  {
    input: "Refactor this Raect component to rmoveduplicate tate.",
   groundTruth: { oute: "code" },
  },
 {
    input: "Sumarize these 14 intervie trascripts an fid rcurring objects."    goundTruth: { route: "long-context" },
  },
  {
   input: "Clasify this ticket as billing, technical, account, or other.",   
   goundTruth: { route: "geneal" },
  },
  {
    input: "Dbg a failing Playwrit test th only baks I." ， 
  groundTruth: { route: "cod" },  
  },
   {
    input: "Extract te renewal dae and contrac valu from this shrt parah."，     goundTrut: { route: "general" },  
  },
];

cnt result = await rnEvals({
  taret: routeDecisionAgent,
  data: routinCases，
  scrers: [alidRouterJsonScorer, outeAccuraScorer]，
 
  trgtOptions: {
    modelSetting：{ termperature: 0 },
  }，
  concurrncy: 3,});

cnsoe.log（resut.scores）;
console.log（result.summar.totalItems）;

if (result.score["alid-rouer-json"] < 1) {
  throw new Error("Ruter emitted invlid decision JSON。"）;}

if（result.scores["route-accuacy"] < 0.9） {
 throw nw Error("Router route accuray fl bellow 90%。");}
```

Ete e el bucle qe ejecutas miestras cambias e pronpt, agrea una ruta o puebas un model de enruador más barato.

No es suficient para sitema maduro. Es suficiente para preeni rla rgresión más vergonzosa: "cambimos el prompt d enrudor y empezó a nvia tareas de classificación al modeo premium de código."

Mantene los ejes separados. La presición de rut y la calidad la respuesta inal son puntos difrenes. La validez d JSON, la herramientas permitidas y la trazabildad tienn su propis comprobaciones. No lo jntes n ún solo número de "calidad". Los proedios son do los fallos útiles van a jubilare.

## Añade un juez LLM solo donde valga la pena

Parte del enrutamiento es legítimamente ambiguo:

```text
Read these logs and tell me why the deploy failed.
```

¿Es `code` porque implica depurar? ¿`long-context` por los logs? ¿`general` porque el usuario pidió un resumen? La ruta correcta depende de las herramientas disponibles y de lo que promete tu producto.

Aquí es donde un juez LLM ayuda, pero solo con una rúbrica estricta. Los scorers de Mastra pueden mezclar pasos de función y pasos de objeto prompt. Usa funciones para la estructura y luego un juez para la parte que realmente necesita juicio.

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

Este scorer cuesta dinero porque llama a un modelo juez. Eso está bien cuando el juicio vale la pena.

No lo uses para comprobar si el JSON se parsea.

## Convierte los casos buenos en un dataset

Los arrays de eval hardcodeados están bien al principio. Con el tiempo, tus ejemplos se convierten en activos del producto: el ticket de cliente fallido, la extraña conversación de soporte, el intento de prompt injection, la petición que se enrutó correctamente hasta el jueves pasado.

Esos pertenecen a un dataset.

Los datasets de Mastra son colecciones versionadas de casos de prueba. Cada mutación crea una versión nueva, así que puedes volver a ejecutar un experimento contra el conjunto exacto de casos que existía cuando tomaste una decisión de modelo.

Los datasets necesitan persistencia, así que configura el almacenamiento primero:

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

Luego crea el dataset y añade casos:

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

Una vez que tienes un dataset, los casos de eval dejan de ser datos de script desechables. Tienen IDs, versiones, historial y resultados de experimentos.

Ahí es cuando los evals dejan de sentirse como «archivos de prueba para prompts» y empiezan a sentirse como memoria del producto.

## Ejecuta experimentos contra el router

Con el dataset ya en su sitio, [`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) lo ejecuta contra un agente, workflow o scorer registrado.

```typescript
// src/mastra/evals/run-router-experiment.ts
import { mastra } from "../index";

const dataset = await mastra.datasets.get({ id: process.env.ROUTER_DATASET_ID! });

const summary = await dataset.startExperiment({
  name: "router-gpt-5-mini-baseline",
  description: "Baseline router decision run before adding security route.",
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

En lugar de «el nuevo router parece mejor», puedes decir:

- El router anterior obtuvo `0.94` en precisión de enrutamiento.
- El nuevo router obtuvo `0.98`.
- Mejoró el enrutamiento de contexto largo.
- Retrocedió en dos casos de revisión de código.
- Redujo las transferencias a modelos premium en un 18 %.
- Añadió 300 ms de latencia al router.

Esa es una conversación de ingeniería. Hay compensaciones sobre la mesa, y tú puedes decidir si vale la pena el intercambio.

## Evalúa el comportamiento en vivo, pero no lo confundas con la verdad fundamental

Mastra también puede adjuntar evaluadores directamente a agentes y pasos de flujo de trabajo. Los evaluadores en vivo se ejecutan de forma asíncrona, almacenan los resultados en tu base de datos configurada y admiten muestreo para que no evalúes cada respuesta en producción a menos que quieras.

Útil. También un trabajo diferente.

```typescript
import { Agent } from "@mastra/core/agent";
import { validRouterJsonScorer } from "../scorers/route-accuracy";

export const routerDecisionAgent = new Agent({
  id: "router-decision-agent",
  instructions: "Choose the best specialist route...",
  model: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
  scorers: {
    validRouterJson: {
      scorer: validRouterJsonScorer,
      sampling: { type: "ratio", rate: 1 },
    },
  },
});
```

La evaluación en vivo te dice que el router sigue emitiendo decisiones válidas. Detecta salidas malformadas, contenido tóxico, llamadas a herramientas prohibidas, marcadores de evidencia faltantes y confianza sospechosamente baja.

Generalmente no puede indicarte la precisión de enrutamiento, porque el tráfico de producción no llega con la verdad fundamental adjunta.

La evaluación en vivo es monitoreo. Los experimentos con conjuntos de datos son pruebas controladas. Necesitas ambos. Responden preguntas diferentes.

## Qué medir después de la precisión de enrutamiento

La precisión de enrutamiento es el primer peldaño. Te dice que la solicitud llegó al especialista esperado. No dice nada sobre si el especialista hizo un buen trabajo.

Una vez que el router supera lo básico, evalúa el sistema por capas:

| Capa | Qué evaluar | Por qué importa |
|---|---|---|
| Decisión del router | ruta seleccionada, confianza, motivo | Detecta clasificaciones incorrectas y malas reglas de escalamiento |
| Trayectoria | secuencia esperada de herramientas o agentes | Detecta comportamiento de «respuesta correcta, camino incorrecto» |
| Salida del especialista | corrección, fidelidad, utilidad | Detecta trabajo de baja calidad tras un enrutamiento correcto |
| Costo y latencia | elección del modelo, tokens, tiempo de ejecución | Detecta victorias costosas o lentas |
| Seguridad y alcance | herramientas permitidas, límites de rechazo, evidencia | Detecta fallos con riesgo para el producto |

`runEvals` admite configuraciones de evaluadores a nivel de agente, flujo de trabajo, paso y trayectoria, para que no tengas que fingir que la respuesta final es el único artefacto.

Para un flujo de trabajo, la estructura se ve así:

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

Evalúa la decisión. Evalúa el camino. Evalúa la respuesta.

Si solo evalúas la respuesta, el modelo puede aprobar por accidente.

## El router debería volverse más aburrido con el tiempo

El primer prompt de enrutamiento suele ser un párrafo de juicios subjetivos. Aceptable para un prototipo.

A medida que las evaluaciones te enseñan cosas, partes del router deberían volverse menos mágicas:

- Los casos léxicos claros se convierten en reglas deterministas.
- Las tareas riesgosas requieren aprobación explícita o una rama de flujo de trabajo.
- Las tareas ambiguas hacen una pregunta aclaratoria en lugar de adivinar.
- Las rutas costosas requieren mayor confianza o una segunda señal.
- Los casos de fallo conocidos se convierten en elementos del conjunto de datos.

El objetivo no es hacer al router "más inteligente" para siempre. El objetivo es hacer que el sistema sea más fácil de razonar.

A veces eso significa un mejor modelo. A veces un prompt más ajustado. A veces un paso de flujo de trabajo, un evaluador, un límite duro, o una aburrida sentencia `if` que te ahorra cuatro cifras al mes.

De eso se trata todo el asunto de medir el comportamiento. Dejas de discutir por gusto y empiezas a discutir a partir de evidencia.

## Una lista de verificación práctica para empezar

Si estás construyendo un router de Mastra hoy, empieza aquí:

1. Haz que la decisión de enrutamiento sea estructurada, aunque los usuarios nunca la vean.
2. Escribe evaluadores deterministas para JSON válido, ruta esperada y rutas prohibidas.
3. Usa `runEvals` con 10 a 20 casos antes de cambiar prompts o modelos del router.
4. Promociona fallos reales a un conjunto de datos versionado.
5. Ejecuta experimentos con conjuntos de datos para cambios significativos en prompt, modelo, ruta o flujo de trabajo.
6. Agrega evaluadores en vivo para invariantes de producción baratos.
7. Compara experimentos por ruta, no solo por puntuación promedio.

El promedio importa menos que el grupo de fallos.

Si cada regresión ocurre en síntesis de políticas de contexto largo, no tienes "un router peor". Tienes un problema de límite de ruta. Si cada caso fallido usa una herramienta específica, tienes un problema de contrato de herramienta. Si cada modelo barato falla los mismos dos casos ambiguos, necesitas lógica de escalamiento, no un default más caro.

Aquí es donde las evaluaciones se vuelven útiles. No son una ceremonia, ni un panel de control que hace que todos se sientan temporalmente adultos. Te muestran qué parte del sistema está fallando, para que puedas arreglar esa parte en lugar de todo.

## Recursos

- [Descripción general de evaluadores de Mastra](https://mastra.ai/docs/evals/overview)
- [Referencia de `createScorer` de Mastra](https://mastra.ai/reference/evals/create-scorer)
- [Referencia de `runEvals` de Mastra](https://mastra.ai/reference/evals/run-evals)
- [Descripción general de conjuntos de datos de Mastra](https://mastra.ai/docs/evals/datasets/overview)
- [Experimentos con conjuntos de datos de Mastra](https://mastra.ai/docs/evals/datasets/running-experiments)
- [No te cases con tu modelo](../llm-routing-mastra-ai)
- [¡Combate los males con evaluaciones!](../llm-evals-are-broken)
````
