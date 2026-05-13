# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/es/index.mdx
- Validation: passed
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
title: Deja de pedir a
subTitle: No lo hacen bien. Aquí está cómo solucionarlo.
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
¿Sabes qué es raro de los modelos de lenguaje? Pueden explicar la mecánica cuántica, escribir poesía y depurar tu TypeScript... pero si les pides que multipliquen 18472 por 9347, existe una buena probabilidad de que te den un resultado equivocado por miles de unidades con total confianza.

Antes me desconcertaba esto hasta que me di cuenta de lo que realmente les estamos pidiendo que hagan. Les estamos pidiendo a un motor de coincidencia de patrones que actúe como una calculadora. Eso es como pedirle a un gimnasta que balancee tus cuentas porque entiende el concepto de "balance".

El problema es que los LLM no realizan cálculos. Cuando le preguntas a GPT o Claude qué es 2 + 2, no están sumando. Están prediciendo que el token "4" es el más probable de aparecer después de "2 + 2 =". La mayoría del tiempo esto funciona bien porque esos patrones existen en sus datos de entrenamiento. Pero cuando te pasas a cálculos multietapa o a números que no eran comunes en el entrenamiento, esencialmente estás tirando un dado.

Recientemente me topé con esto directamente mientras revisaba un código que usaba un modelo de élite para calcular pagos hipotecarios. El modelo respondió con total confianza. Estaba equivocado por $400/mes. Ese es el tipo de error que importa.

Incluso a medida que los modelos mejoran en razonamiento (supuestamente GPT-5 muestra mejoras), siguen realizando coincidencias de patrones sofisticadas, no computación simbólica. Para trabajos creativos y tareas de lenguaje natural, esta naturaleza probabilística es exactamente lo que los hace mágicos. Para matemáticas, no tanto.

La respuesta no es esperar modelos más inteligentes. Es darle al modelo la herramienta adecuada para el trabajo.

Piense en cómo resolvería este problema si estuviera construyendo un sistema no basado en IA. No escribiría lógica matemática personalizada, sino que recurriría a una biblioteca. El mismo principio aplica aquí, excepto que ahora estamos enseñando al LLM cuándo y cómo usar esa biblioteca.

La llamada a herramientas en los SDK de IA modernos nos permite entregar al modelo funciones estructuradas que puede invocar. En lugar de forzar al LLM a fingir que sabe matemáticas, le damos algo que sí lo hace: un motor de matemáticas simbólicas.

He estado usando [AI SDK v5 y v6](https://ai-sdk.vercel.ai/) para esto, combinado con CortexJS Compute Engine. El SDK maneja la orquestación y el enrutamiento de herramientas, mientras que CortexJS se encarga desde aritmética básica hasta cálculo. Es una separación de responsabilidades sorprendentemente limpia.

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## Construyendo la herramienta matemática

La implementación es más sencilla de lo que podría esperar. Lo que estamos construyendo es un puente entre la comprensión del lenguaje natural del LLM y el cálculo matemático real.

```typescript
import { generateText, stepCountIs, tool } from 'ai';
import { ComputeEngine } from '@cortex-js/compute-engine';
import { z } from 'zod';

// Inicializar el motor una sola vez
const ce = new ComputeEngine();

const mathTool = tool({
  description: 'Evaluar expresiones matemáticas y resolver ecuaciones con precisión garantizada. DEBE usarse para todas las operaciones matemáticas para verificar la corrección - no intentar hacer cálculos mentales. Soporta aritmética, álgebra, cálculo y operaciones complejas. Puede procesar múltiples expresiones al mismo tiempo.',
  parameters: z.object({
    expressions: z.array(z.string()).describe(
      'Array de expresiones matemáticas en notación LaTeX o plana, ej. ["2 + 2", "\\frac{x^2 + 1}{x - 1}", "\\int x^2 dx"]'
    ),
  }),
  execute: async ({ expressions }) => {
    // Procesar todas las expresiones en paralelo (o en lotes detallados)
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

Varias cosas dignas de mención sobre esto:

La descripción realiza una labor importante. Ese lenguaje "DEBE usarse" podría parecer agresivo, pero en mi experiencia, ser explícito con el modelo sobre cuándo usar una herramienta es la diferencia entre que funcione a veces y que funcione de forma confiable. Considérelo como ingeniería de prompts a nivel de herramienta.

El procesamiento por lotes mediante un array `expressions` importa más de lo que podría pensar. Cada llamada al modelo tiene latencia. Si está resolviendo un sistema de ecuaciones o haciendo matemáticas de múltiples pasos, procesarlas individualmente crea una experiencia de usuario terrible. El procesamiento por lotes significa un solo viaje de ida y vuelta para resolver diez problemas.

Usar un motor simbólico en lugar de simplemente `eval()` (por favor, no use `eval()`) nos da una comprensión matemática real. El motor analiza la intención, maneja el formato LaTeX y puede trabajar con derivadas e integrales. No solo estamos haciendo cálculos, estamos haciendo matemáticas.

El manejo de errores está delimitado por expresión. Si un cálculo falla, devolvemos ese error pero continuamos con el resto. Esto permite que el modelo vea lo que funcionó y lo que no, posiblemente autocorrigiéndose en el siguiente paso.

## Poniéndolo en práctica

Vamos a probar algo que normalmente haría que un modelo sin herramientas generara resultados falsos:

```typescript
import { anthropic } from '@ai-sdk/anthropic';

const { text } = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  prompt: 'Calculate 18472 × 9347, divide by 127, then take the square root of the result.',
  tools: { mathTool },
  stopWhen: stepCountIs(5), // Allow up to five model/tool steps
});

console.log(text);
```

El modelo reconoce la operación matemática, identifica la necesidad de precisión, llama a la herramienta, obtiene el resultado exacto y luego lo explica en lenguaje natural. Cada componente realizando lo que hace mejor.

## Más allá de la aritmética básica

Al usar un motor simbólico, este enfoque maneja tareas que las herramientas de calculadora básica no pueden abordar.

¿Quieres resolver ecuaciones algebraicas? "Resuelve estas ecuaciones: 3x + 7 = 22 y 2y - 5 = 13" funciona sin problemas.

¿Necesitas cálculo? "Encuentra la derivada de x^3 + 2x^2 y evalúala en x = 2" es simplemente otra llamada a la herramienta.

El soporte de LaTeX es especialmente útil si estás desarrollando aplicaciones educativas. El motor entiende de forma inherente la entrada en LaTeX y puede devolver resultados formateados para su representación. No se requiere análisis adicional.

## Una imagen más amplia

Creo que este patrón tiene importancia más allá de las matemáticas. Lo que realmente hacemos es reconocer las limitaciones de los modelos de lenguaje mientras aprovechamos sus fortalezas. Son increíbles para comprender la intención, analizar lenguaje natural y orquestar flujos de trabajo. No son calculadoras, ni bases de datos, ni sistemas de archivos.

Cada vez que intentamos hacer que un modelo de lenguaje realice algo determinista, estamos luchando contra su naturaleza. Pero cuando combinamos esa comprensión del lenguaje natural con herramientas especializadas que manejan las partes deterministas, es cuando las cosas se vuelven interesantes.

La herramienta matemática es solo un ejemplo. El mismo principio se aplica a la manipulación de fechas, cálculos financieros, procesamiento de imágenes, consultas a bases de datos... en cualquier lugar donde la precisión sea más importante que la creatividad. Deja que el modelo entienda lo que el usuario quiere, luego transfiere el trabajo real a algo construido para el trabajo.

Es un cambio en cómo pensamos al construir con IA. No se trata de "¿puede el modelo hacer esto?" sino de "¿puede el modelo orquestar esto?". Una diferencia pequeña en la formulación, pero una diferencia significativa en la confiabilidad.

## Recursos

- [Documentación del SDK de IA de Vercel](https://sdk.vercel.ai/docs)
- [Motor de Cálculo de CortexJS](https://cortexjs.io/compute-engine/)
- [Guía de Llamada a Herramientas](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [Repositorio de Ejemplos del SDK de IA](https://github.com/vercel/ai/tree/main/examples)
````
