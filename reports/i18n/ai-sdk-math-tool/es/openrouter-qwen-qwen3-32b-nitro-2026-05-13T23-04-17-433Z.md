# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/es/index.mdx
- Validation: deferred
- Runtime seconds: 13.60
- Input tokens: 6293
- Output tokens: 5975
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.001937
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Deja de pedir a los LLMs que hagan matemáticas
subTitle: Son malos en esto. Aquí hay cómo solucionarlo.
date: '2026-01-06'
modified: '2026-01-07'
tags:
  - ai
  - ai-sdk
  - typescript
  - math
  - tools
  - patterns
category: AI
subCategory: Engineering
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
¿Sabes qué es raro de los modelos de lenguaje? Pueden explicar la mecánica cuántica, escribir poesía y depurar tu TypeScript... pero si les pides que multipliquen 18472 por 9347, existe una buena probabilidad de que te den algo que esté equivocado por miles de unidades con total confianza.  

Me desconcertaba esto hasta que me di cuenta de lo que realmente les estamos pidiendo. Les estamos pidiendo a una máquina de coincidencias de patrones que sea una calculadora. Eso es como pedirle a un gimnasta que balancee tus libros de contabilidad porque entiende el concepto de "balance".  

El problema es que los LLM no calculan nada. Cuando le preguntas a GPT o Claude qué es 2 + 2, no están sumando. Están prediciendo que "4" es el token más probable de aparecer después de "2 + 2 =". La mayor parte del tiempo, esto funciona bien porque esos patrones existen en sus datos de entrenamiento. Pero cuando te sales de la aritmética básica hacia cálculos multietapa o cualquier cosa con números que no eran comunes en el entrenamiento, esencialmente estás lanzando dados.  

Recientemente me topé con esto al revisar código que usaba un modelo de élite para calcular pagos hipotecarios. El modelo respondió con total confianza. También estaba equivocado por $400 al mes. Ese tipo de error importa.  

Incluso cuando los modelos mejoren en razonamiento (GPT-5 supuestamente muestra mejoras), seguirán haciendo coincidencias de patrones sofisticadas, no cálculo simbólico. Para trabajos creativos y tareas de lenguaje natural, esta naturaleza probabilística es exactamente lo que los hace mágicos. ¿Para matemáticas? No tanto.  

## ¿Qué resuelve esto realmente?  

La respuesta no es esperar modelos más inteligentes. Es darle al modelo la herramienta adecuada para la tarea.  

Piensa cómo resolverías este problema si estuvieras construyendo un sistema no-AI. No escribirías lógica matemática personalizada, sino que usarías una biblioteca. El mismo principio aplica aquí, excepto que ahora estamos enseñando al LLM cuándo y cómo usar esa biblioteca.  

Las llamadas a herramientas en SDKs modernos de IA nos permiten darle al modelo funciones estructuradas que puede invocar. En lugar de forzar al LLM a fingir que sabe matemáticas, le damos algo que sí lo hace: un motor de cálculo simbólico.  

He estado usando [AI SDK v5 y v6](../https://ai-sdk.vercel.ai/) para esto, junto con CortexJS Compute Engine. El SDK maneja la orquestación y la enrutación de herramientas, mientras que CortexJS maneja desde aritmética básica hasta cálculo. Es una separación de responsabilidades sorprendentemente limpia.

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## Construyendo la herramienta de matemáticas

La implementación es más directa de lo que podrías esperar. Lo que estamos construyendo es un puente entre la comprensión del lenguaje natural del LLM y el cálculo matemático real.

```typescript
import { generateText, stepCountIs, tool } from 'ai';
import { ComputeEngine } from '@cortex-js/compute-engine';
import { z } from 'zod';

// Inicializar el motor una vez
const ce = new ComputeEngine();

const mathTool = tool({
  description: 'Evaluar expresiones matemáticas y resolver ecuaciones con precisión garantizada. DEBE usarse para todas las operaciones matemáticas para verificar la corrección - no intentar hacer cálculos mentales. Soporta aritmética, álgebra, cálculo y operaciones complejas. Puede procesar múltiples expresiones simultáneamente.',
  parameters: z.object({
    expressions: z.array(z.string()).describe(
      'Arreglo de expresiones matemáticas en notación LaTeX o plana, ej. ["2 + 2", "\\frac{x^2 + 1}{x - 1}", "\\int x^2 dx"]'
    ),
  }),
  execute: async ({ expressions }) => {
    // Procesar todas las expresiones en paralelo (o en lote detallado)
    return expressions.map(expression => {
      try {
        const result = ce.parse(expression).evaluate();
        return {
          expression,
          result: result.toString(),
          latex: result.latex,
        };
      } catch (error) {
        return { 
          expression,
          error: (error as Error).message 
        };
      }
    });
  },
});
```

Algunas cosas dignas de mención sobre esto:

La descripción está haciendo un trabajo pesado. Ese lenguaje "DEBE usarse" podría parecer agresivo, pero en mi experiencia, ser explícito con el modelo sobre cuándo usar una herramienta es la diferencia entre que funcione a veces y que funcione de forma confiable. Considéralo como ingeniería de prompts a nivel de herramienta.

El procesamiento por lotes mediante un arreglo `expressions` importa más de lo que podrías pensar. Cada llamada al modelo tiene latencia. Si estás resolviendo un sistema de ecuaciones o haciendo matemáticas de múltiples pasos, procesarlas individualmente crea una experiencia de usuario terrible. El procesamiento por lotes significa un solo viaje de ida y vuelta para resolver diez problemas.

Usar un motor simbólico en lugar de solo `eval()` (por favor, no uses `eval()`) nos da una comprensión matemática real. El motor analiza la intención, maneja la formateo LaTeX y puede trabajar con derivadas e integrales. No solo estamos haciendo cálculos, sino que estamos haciendo matemáticas.

El manejo de errores está delimitado por expresión. Si un cálculo falla, devolvemos ese error pero continuamos con el resto. Esto permite que el modelo vea lo que funcionó y lo que no, potencialmente autocorrigiéndose en el siguiente paso.

## Poniéndolo en Acción

Vamos a lanzarle algo que haría que un modelo sin herramientas generara respuestas falsas:

```typescript
import { anthropic } from '@ai-sdk/anthropic';

const { text } = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  prompt: 'Calcular 18472 × 9347, dividir por 127, luego tomar la raíz cuadrada del resultado.',
  tools: { mathTool },
  stopWhen: stepCountIs(5), // Permitir hasta cinco pasos modelo/herramienta
});

console.log(text);
```

El modelo ve la matemática, reconoce que necesita precisión, llama a la herramienta, obtiene el resultado exacto y luego lo explica en lenguaje natural. Cada componente haciendo lo que mejor sabe hacer.

## Más allá de la aritmética básica

Dado que estamos usando un motor simbólico, este enfoque maneja cosas que las herramientas de cálculo simple no pueden tocar.  

¿Quieres resolver ecuaciones algebraicas? "Resolver estas ecuaciones: 3x + 7 = 22 y 2y - 5 = 13" funciona bien.  

¿Necesitas cálculo? "Encontrar la derivada de x^3 + 2x^2 y evaluarla en x = 2" es solo otra llamada a la herramienta.  

El soporte de LaTeX es particularmente útil si estás construyendo aplicaciones educativas. El motor entiende inherentemente la entrada en LaTeX y puede devolver resultados formateados para su representación. No se requiere análisis adicional.  

## La imagen más amplia  

Creo que este patrón importa más allá de las matemáticas. Lo que realmente hacemos es reconocer los límites de los LLM mientras aprovechamos sus fortalezas. Son increíbles para entender la intención, analizar lenguaje natural y orquestar flujos de trabajo. No son calculadoras ni bases de datos ni sistemas de archivos.  

Cada vez que intentamos hacer que un LLM haga algo determinista, estamos luchando contra su naturaleza. Pero cuando combinamos esa comprensión del lenguaje natural con herramientas especializadas que manejan las partes deterministas. Ese es el momento en que las cosas se ponen interesantes.  

La herramienta matemática es solo un ejemplo. El mismo principio aplica para manipulación de fechas, cálculos financieros, procesamiento de imágenes, consultas a bases de datos... cualquier lugar donde la precisión importe más que la creatividad. Deja que el modelo entienda lo que el usuario quiere, luego pasa el trabajo real a algo construido para el trabajo.  

Es un cambio en cómo pensamos en construir con IA. No "¿puede el modelo hacer esto?" sino "¿puede el modelo orquestar esto?". Pequeña diferencia en el enunciado, diferencia significativa en la confiabilidad.

## Recursos

- [Documentación del SDK de IA de Vercel](https://sdk.vercel.ai/docs)
- [Motor de cálculo de CortexJS](https://cortexjs.io/compute-engine/)
- [Guía de llamada a herramientas](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [Repositorio de ejemplos del SDK de IA](https://github.com/vercel/ai/tree/main/examples)
````
