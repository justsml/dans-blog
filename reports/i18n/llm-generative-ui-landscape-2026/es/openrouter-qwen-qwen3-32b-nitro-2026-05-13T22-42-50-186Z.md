# Translation Candidate
- Slug: llm-generative-ui-landscape-2026
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/es/index.mdx
- Validation: deferred
- Runtime seconds: 110.25
- Input tokens: 44277
- Output tokens: 44875
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.014312
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: El panorama de LLM GenUI v2
subTitle: >-
  Del renderizado de herramienta a componente a la generación abierta — un mapa
  de cada enfoque y cuándo justifica su complejidad.
date: '2026-05-10'
modified: '2026-05-10'
tags:
  - ai
  - llm
  - generative-ui
  - agents
  - frontend
  - protocols
  - react
  - ag-ui
  - a2ui
  - copilotkit
  - json-render
  - mcp
category: AI
subCategory: Frontend
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.9
---
"Generative UI" significa al menos cinco conceptos distintos dependiendo de quién lo diga.

- Interfaces de chat que incrustan tarjetas de producto a partir de llamadas a herramientas del modelo  
- Especificaciones JSON en tiempo de ejecución que el frontend renderiza como árboles de componentes  
- Marcos en sandbox devueltos por herramientas MCP a aplicaciones anfitrionas (desde ordenación de entradas, reservas de hoteles hasta renderizado de mapas y widgets de pago)  
- Protocolos de evento que emiten el estado del agente al frontend  
- v0, Lovable y Bolt: herramientas de IA que escriben React en tiempo de diseño  

Estos son conceptos relacionados, pero residen en capas diferentes de la pila, tienen perfiles de riesgo distintos, costos de implementación diferentes y casos de uso apropiados. Confundirlos convierte cada discusión arquitectónica en un desastre.  

Este es el mapa que necesito cuando decido en qué parte de la pila intervenir.  

---

## ¿Qué no es la interfaz generativa  

Antes de definir qué es, tres conceptos a descartar:  

**Generación de código en tiempo de diseño** — v0, Lovable, Bolt, Cursor componiendo componentes React. Estas herramientas generan código que los desarrolladores revisan y cometen. La IA opera en tiempo de desarrollo. Lo que se distribuye es estático desde la perspectiva del usuario. Esta es una categoría útil de herramientas. No es lo que significa "interfaz generativa en tiempo de ejecución".  

**Autocompletado de formularios asistido por IA** — el modelo rellena valores de campos a partir del contexto. La estructura de la interfaz sigue siendo fija; solo cambia el contenido. Este es un patrón útil. No es interfaz generativa.  

**IA escribiendo HTML crudo en una página** — el modelo genera cadenas `<div>` y `<button>` que se inyectan mediante `innerHTML` o `dangerouslySetInnerHTML`. *Técnicamente* sí es interfaz generativa en tiempo de ejecución. También es la versión más peligrosa, y la que cada marco maduro en este espacio existe para evitar. El markup generado por IA crudo implica riesgo de XSS, atributos no accesibles, estilo inconsistente y estructura falsa. El resto de este artículo trata sobre cómo hacerlo mejor.

## Una definición operativa

La interfaz generativa en tiempo de ejecución significa: **el modelo determina qué componente de interfaz o composición de componentes ve el usuario, basado en el estado de la conversación o tarea.**

No las palabras. La interfaz.

El caso más sencillo: tu asistente de reservas de vuelos llama a una herramienta `search_flights`. En lugar de devolver texto plano ("Aquí hay tres opciones..."), renderiza un componente `<FlightResultsCard>` con vuelos seleccionables, conmutadores de clase de asiento y un botón "Reservar". El modelo decidió que una tarjeta estructurada era la respuesta adecuada aquí. El desarrollador decidió cómo se ve esa tarjeta y qué hace "Reservar".

El caso más complejo: un agente de análisis financiero recibe una pregunta sobre un portafolio y decide componer una respuesta con un `MetricGroup` mostrando números clave, un gráfico `RiskBreakdown`, una tabla `ScenarioComparison` y un `PolicyNotice`. El modelo armó ese diseño a partir de un catálogo de componentes previamente aprobados. El desarrollador definió cada componente. El modelo eligió cuáles usar y qué datos incluir en ellos.

Ambos casos son interfaz generativa. Difieren en cuánta libertad de composición tiene el modelo, lo que determina tanto la riqueza de las posibles salidas como la complejidad de lo que podría salir mal.

## Los tres patrones

Todo el espacio se reduce a tres patrones, cada uno con una gramática de salida diferente.

![Un diagrama de espectro que muestra tres patrones: solo llamadas a herramientas a la izquierda (más seguro), catálogo de componentes en el centro, y generación abierta a la derecha (más expresivo).](../output-grammar-spectrum.svg)

_Cada decisión de interfaz generativa es un punto en este espectro. Comienza a la izquierda._

### Patrón 1: Renderizado de herramienta a componente

El modelo llama a una herramienta nombrada. Su aplicación tiene un mapa de nombres de herramientas a componentes. La llamada a la herramienta activa un renderizado del componente.

```tsx
// El modelo llama: { name: "show_flight_results", args: { flights: [...] } }

useCopilotAction({
  name: "show_flight_results",
  render: ({ args }) => <FlightResultsCard flights={args.flights} />,
});
```

Este es el patrón más seguro porque el diseño nunca proviene del modelo. El modelo decide *cuándo* mostrar un componente y *qué datos* poblar en él. Sus desarrolladores aún controlan el código del componente, el diseño visual, la implementación de accesibilidad y cada caso límite en la lógica de renderizado.

El `useChat` del Vercel AI SDK con manejadores de herramientas hace esto. El renderizado de herramientas de assistant-ui hace esto. El "Static Generative UI" de CopilotKit es este patrón. La mayoría de las interfaces de copiloto en producción que funcionan de manera confiable usan este enfoque.

**Apropiado cuando**: el conjunto de cosas que podría mostrar es conocible en tiempo de desarrollo. Confirmaciones de reservas, resultados de búsqueda, resúmenes de cuentas, widgets de aprobación. Si puede enumerar los escenarios, este patrón los cubre.

### Patrón 2: Composición del catálogo de componentes

El modelo emite un árbol JSON tipado que referencia componentes de un catálogo definido por el desarrollador. Su frontend tiene un renderer que recorre el árbol e instancia cada componente.

```json
[
  { "type": "metric_group", "metrics": [
    { "label": "MRR", "value": "$82,400", "delta": "+12%" },
    { "label": "Churn", "value": "2.1%", "delta": "-0.4%" }
  ]},
  { "type": "line_chart", "title": "30-day growth", "data_ref": "mrr_series" },
  { "type": "insight_callout", "text": "Expansion revenue driving the delta — avg seat count up 18%." }
]
```

El modelo compuso ese diseño. Un `MetricGroup`, un `LineChart`, un `InsightCallout`. Pero usted definió qué significa cada tipo de componente, qué props acepta y cómo se renderiza. Si el modelo intenta emitir `{ "type": "custom_untested_thing" }`, su validación de esquema lo detecta y el renderer lo ignora o rechaza.

Este es el patrón detrás de `json-render`, `A2UI`, `Hashbrown`, `OpenUI` y `Tambo`. El trabajo de ingeniería clave es el **diseño del catálogo** — decidir qué tipos de componentes existen, cómo se ven sus esquemas y qué puede y no puede componer el modelo.

**Apropiado cuando**: la estructura de lo que deseas mostrar varía legítimamente según los datos o la solicitud del usuario. Dashboards que se adaptan a lo que es notable en los números. Informes que muestran secciones diferentes según el contexto. Paneles de flujo de trabajo que cambian según en qué paso se encuentre un agente.

### Patrón 3: Generación abierta

El modelo escribe HTML, SVG, Canvas o WebGL que se renderiza dentro de un iframe aislado con una estricta Política de Seguridad de Contenido (CSP).

Esto es apropiado para casos donde ningún catálogo de componentes fijo servirá: visualizaciones de algoritmos, diagramas arquitectónicos, gráficos ad hoc, arte generativo, simulaciones educativas. El límite del iframe es quien realiza el trabajo de seguridad aquí; quítalo y regresarás al problema de inyección de HTML crudo mencionado al inicio de este artículo.

`CopilotKit/OpenGenerativeUI` es la mejor implementación de referencia actual de este patrón. El entorno aislado elimina scripts, limita el paso de mensajes y mantiene el artefacto generado alejado del estado privilegiado de tu aplicación.

**Apropiado cuando**: realmente necesitas salida visual arbitraria — diagramas explicativos únicos, simulaciones dinámicas, artefactos creativos. No uses esto para interfaces transaccionales. Una confirmación de pago no requiere un iframe aislado.

### Más allá de los tres patrones: LLMs controlando píxeles directamente

Hay una dirección emergente que no encaja claramente en ninguno de estos patrones: los LLMs controlando **experiencias inmersivas, similares a juegos**, gestionando la salida visual de forma más directa que un iframe aislado.

La distinción canónica dentro del generativo UI es **iframe HTML vs. catálogo JSON**:

- **Iframe HTML** — el modelo escribe HTML, SVG, Canvas o WebGL que se renderiza en un entorno aislado. Máxima libertad expresiva; la seguridad depende completamente del límite del iframe. Ejemplos: Anthropic Artifacts, OpenGenerativeUI.  
- **Catálogo JSON** — el modelo emite una carga útil estructurada limitada a un catálogo de componentes definido por el desarrollador; tu renderizador instancia componentes confiables y preconstruidos desde esa especificación. El modelo decide *qué* mostrar; tú decides *cómo* se renderiza. Ejemplos: json-render, A2UI.  

Más allá de estos, demostraciones recientes sugieren un tercer modo donde el modelo no elige componentes ni escribe HTML aislado —sino que controla el lienzo de forma más directa. Proyectos como [Tencent's HunyuanWorld](https://arxiv.org/abs/2502.01999), que genera entornos 3D explorables a partir de una sola imagen, y arquitecturas de juegos donde los LLM generan mapas, NPCs y misiones en tiempo de ejecución en lugar de llamar a un catálogo de componentes, sugieren un futuro donde el modelo actúa más como un director de juego que como un renderizador de formularios. La inferencia de LLM en el navegador a través de WebGPU ([WebLLM](https://mlc.ai/web-llm/)) está impulsando la misma frontera localmente.  

Este territorio es genuinamente emocionante y genuinamente temprano. Aún no hay marcos estables para construir productos de producción. Cubriré este enfoque en un artículo dedicado cuando cambie esta situación.  

---  

## El ecosistema completo  

![Un diagrama de cuatro capas que mapea todas las herramientas principales de generativo UI: protocolos (AG-UI, A2UI, MCP Apps) en la parte superior, capas de aplicación JavaScript siguientes (CopilotKit, Vercel AI SDK, assistant-ui, LangGraph), luego herramientas de catálogo JavaScript (json-render, Hashbrown, OpenUI, Tambo), y herramientas de Python en la parte inferior (Gradio, Streamlit, LangChain, Haystack).](../full-stack-map.svg)  

_Cuatro capas. Los protocolos definen el formato de conexión. Las capas de aplicación gestionan el estado y el renderizado. Las herramientas de catálogo restringen lo que puede generar el modelo. Las herramientas de Python son una pista paralela para flujos de trabajo de datos y ML._  

---  

## Los protocolos: AG-UI y A2UI  

AG-UI y A2UI son los dos estándares principales en la capa de protocolos. Resuelven problemas diferentes y no son competidores.

### AG-UI  

**GitHub**: [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)  

AG-UI es un protocolo basado en eventos para la comunicación entre agentes de IA y aplicaciones frontend. Define aproximadamente 16 tipos de evento: `TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT`, `TOOL_CALL_START`, `TOOL_CALL_END`, `STATE_SNAPSHOT`, `STATE_DELTA`, entre otros. El transporte es a tu elección — SSE, WebSockets y webhooks funcionan igual. El formato es deliberadamente flexible para permitir una adopción amplia.  

AG-UI no define cómo se ve tu interfaz. Define cómo el agente se comunica *con* tu frontend. Piénsalo como la capa de protocolo de conexión que permite a tu aplicación React suscribirse a un agente LangGraph de la misma manera que a un agente CrewAI, sin cambiar el código frontend.  

CopilotKit creó AG-UI a partir de su trabajo con LangGraph y CrewAI. Ha sido adoptado por LangChain, Mastra, PydanticAI y otros. Microsoft ha publicado una guía de integración AG-UI. Si estás construyendo un frontend multiagente y necesitas desacoplar marcos backend del código frontend, AG-UI es la respuesta.  

**Una aclaración que suele confundir**: AG-UI no es un marco de interfaz de usuario. No te dice qué renderizar. Te dice *que* el agente dijo algo, llamó a una herramienta o actualizó el estado compartido. Qué renderices en respuesta sigue siendo tu decisión.  

### A2UI  

**GitHub**: [google/A2UI](https://github.com/google/A2UI) · Especificación: [a2ui.org](https://a2ui.org/)  

A2UI es la especificación declarativa de Google para lo que envían los agentes cuando quieren mostrar una interfaz. Mientras que AG-UI responde "¿cómo se comunica el agente?", A2UI responde "¿qué formato usa el agente para describir un diseño de componente?".  

A2UI utiliza un formato JSONL plano: un descriptor de componente por línea, cada uno con un ID, un tipo y datos. El formato plano es intencional. Los árboles anidados requieren que el modelo conozca toda la estructura antes de poder comenzar a transmitir. Una lista plana permite al modelo emitir cada componente a medida que "piensa" en él, lo que significa que tu frontend puede comenzar a renderizar la primera tarjeta de métrica mientras el modelo aún decide si agregar un gráfico.

```jsonl
{"id":"h1","type":"kpi_card","title":"MRR","value":"$82,400","delta":"+12%"}
{"id":"h2","type":"kpi_card","title":"Churn","value":"2.1%","delta":"-0.4%"}
{"id":"c1","type":"line_chart","title":"30-day MRR","data_ref":"mrr_series"}
{"id":"t1","type":"data_table","cols":["Month","MRR","Net New"],"data_ref":"monthly"}
```

A2UI es consciente de la seguridad: la especificación es un formato de datos, no código ejecutable. El catálogo de componentes está predefinido por el desarrollador; el agente solo puede hacer referencia a tipos incluidos en ese catálogo. Un renderizador A2UI que reciba un nombre de tipo desconocido lo ignora.

El formato "Open-JSON-UI" de CopilotKit es compatible con A2UI. Si estás seleccionando un formato de especificación para un catálogo de componentes hoy, A2UI es el que cuenta con el mayor soporte multiplataforma.

**Nota sobre estabilidad**: A2UI está en versión pre-1.0 — v0.9 según se verificó el 8 de mayo de 2026 — y ha incluido cambios rotos entre versiones menores. Las comunicaciones de Google sobre el roadmap han sido esporádicas y algunos renderizadores (Lit, Flutter) han quedado atrás en actualizaciones de especificación. Planifica tiempo para la deriva de especificaciones si estás construyendo sobre ello hoy. Para casos de uso puramente web, json-render parece tener actualmente herramientas más completas. La ventaja a largo plazo de A2UI es su alcance multiplataforma (web, Flutter, SwiftUI, Android) que json-render no posee.

### Apps de MCP

**GitHub**: [modelcontextprotocol](https://github.com/modelcontextprotocol) · Relacionado: [mcp-ui](https://github.com/MCP-UI-Org/mcp-ui)

MCP comenzó como un protocolo para conectar LLMs con herramientas y datos. La extensión Apps permite que las herramientas MCP devuelvan no solo datos, sino artefactos interactivos de UI: componentes de React, formularios, dashboards, mapas.

El modelo de seguridad es estricto y ese es el objetivo: todo se renderiza en un iframe aislado con permisos restringidos, las plantillas están predeclaradas para que la aplicación anfitriona pueda revisarlas, y toda la comunicación es JSON-RPC auditable. Este es el modelo correcto para proveedores de herramientas — un servidor MCP de Shopify puede devolver un widget de checkout; un servicio de mapas puede devolver un mapa embebible. La aplicación anfitriona no posee ni confía en el código de ese widget.

MCP Apps es la opción correcta cuando la UI *pertenece al proveedor de herramientas*, no a tu aplicación. Para UI que viva en el dominio de tu aplicación, sigue con el patrón 1 o 2.

---

## Los marcos de trabajo JavaScript/TypeScript

### CopilotKit

**GitHub**: [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) · Ejemplos: [CopilotKit/generative-ui](https://github.com/CopilotKit/generative-ui)

CopilotKit es el marco más completo para aplicaciones frontend nativas de agentes. Gestiona el ciclo de vida completo: conectarse a backend de agentes mediante AG-UI, gestionar el estado de conversación bidireccional, renderizar componentes de UI generativos y proporcionar la infraestructura de estado compartido que permite que agentes y usuarios modifiquen los mismos datos.

El modelo de tres patrones se mapea claramente en las APIs de CopilotKit:
- `useCopilotAction` con un callback `render` → Patrón 1
- Renderizado A2UI/Open-JSON-UI → Patrón 2
- Artefactos aislados `OpenGenerativeUI` → Patrón 3

La característica importante de CopilotKit que se subdiscute es el **estado compartido y la participación humana en el bucle**: el agente puede leer y escribir el estado de la aplicación, el usuario puede leer y escribirlo, y los cambios fluyen bidireccionalmente. Esto es lo que hace que las UI de estilo copiloto se sientan como una colaboración real y no como un chat unido a un producto.

### Vercel AI SDK

**GitHub**: [vercel/ai](https://github.com/vercel/ai) · Docs: [ai-sdk.dev](https://ai-sdk.dev/)

El Vercel AI SDK es el estándar de facto de TypeScript para aplicaciones de IA. Para UI generativa específicamente:

**`useObject`** transmite un objeto JSON estructurado desde el servidor mientras se genera. Defines un esquema Zod; el SDK analiza el JSON parcial y desencadena re-renderizados a medida que llegan los campos. Este es el camino más suave para el Patrón 2 en una aplicación Next.js.

```tsx
const { object: dashboard } = useObject({
  api: "/api/generate-dashboard",
  schema: z.object({
    title: z.string(),
    metrics: z.array(z.object({ label: z.string(), value: z.number() })),
    insights: z.array(z.string()),
  }),
});
```

**`useChat` con controladores de herramientas** → Patrón 1. El modelo llama a herramientas; mapeas los nombres de herramienta a componentes.

**Elementos AI** ([elements.ai-sdk.dev](https://elements.ai-sdk.dev/)) proporciona primitivas de interfaz de usuario listas para usar para combinar con el SDK.  

**Nota sobre la trayectoria confusa aquí**: En octubre de 2024, Vercel anunció en la [discusión de GitHub #3251](https://github.com/vercel/ai/discussions/3251) que el AI SDK RSC —el patrón de componentes React Server Components streaming promovido como la característica destacada "Generative UI" en la versión 3.0 del SDK— se pausó indefinidamente debido a "varias limitaciones de larga data" sin buenas soluciones a corto plazo. Los equipos que habían construido estrategias de producto basadas en la transmisión RSC quedaron sorprendidos. Las API `generateObject`/`streamObject` también se descontinuaron posteriormente en la versión 6.0 del SDK. La migración recomendada desde el AI SDK RSC es el patrón `useObject` mencionado anteriormente, o json-render para la generación basada en catálogos.  

### assistant-ui  

**GitHub**: [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)  

assistant-ui es un conjunto de primitivas React componibles para construir interfaces de chat de alta calidad para producción. Es la solución adecuada cuando necesitas una experiencia de chat pulida —burbujas de mensaje, tokens de transmisión, acciones de copiar/editar/regenerar, estados de pensamiento— y deseas usar tu propio backend y tu propia lógica de renderizado de herramientas.  

Funciona bien con cualquier backend (OpenAI, Anthropic, modelos locales, endpoints personalizados) y maneja el renderizado de llamadas a herramientas mediante un modelo de ranuras/propiedades de renderizado familiar.  

### json-render  

**GitHub**: [vercel-labs/json-render](https://github.com/vercel-labs/json-render) · Docs: [json-render.dev](https://json-render.dev/)  

json-render operacionaliza el Patrón 2 con un enfoque opinado y todo incluido. Incluye un catálogo de componentes preconstruido (componentes shadcn/ui con esquemas Zod), un renderizador y un ciclo de generación ajustado donde el modelo se limita al catálogo mediante el esquema.  

Características distintivas:  
- **Representación multiobjetivo**: la misma especificación JSON puede renderizarse en una aplicación web React, una aplicación móvil React Native, un PDF, un correo HTML o un video Remotion. Esto es verdaderamente útil para informes.  
- **Representación progresiva**: los componentes aparecen a medida que el modelo los transmite, no esperan a que llegue toda la especificación.  
- **Restricciones estrictas de esquema**: el catálogo está diseñado para que el modelo no pueda generar tipos de componentes válidos pero desconocidos.

Si está construyendo una característica de panel o generación de informes y quiere omitir el trabajo de infraestructura para diseñar su propio catálogo, json-render es la ruta más rápida para aplicaciones web.  

**Sobre el impulso**: json-render se lanzó desde Vercel Labs a principios de 2026 y parece haber atraído rápidamente la atención de desarrolladores web porque es inmediatamente útil en proyectos estándar de React/Next.js. Dicho esto, json-render aún está en versión pre-1.0 y la relación entre json-render y A2UI aún se está definiendo — Vercel ha experimentado con salida compatible con A2UI, por lo que una convergencia es posible. Para plataformas multiplataforma (móvil nativo, múltiples marcos), A2UI es una apuesta más sólida a largo plazo.  

### Hashbrown  

**GitHub**: [liveloveapp/hashbrown](https://github.com/liveloveapp/hashbrown)  

Hashbrown toma un enfoque distinto: en lugar de construir una capa de interfaz de AI separada, incrusta la selección de componentes de AI directamente en su aplicación React o Angular existente. Expone los componentes de su aplicación al LLM; el LLM selecciona cuáles renderizar y puede invocar herramientas del lado del cliente.  

Esta es la herramienta adecuada cuando quiere infundir inteligencia en superficies de producto que no sean "chat" — una página de producto que adapte su diseño, un panel de configuración que muestre las opciones correctas, un editor de flujo de trabajo que sugiera el siguiente paso.  

### OpenUI  

**GitHub**: [thesysdev/openui](https://github.com/thesysdev/openui) · Docs: [openui.com](https://www.openui.com/)  

OpenUI reemplaza JSON con un formato de líneas orientado a código ("OpenUI Lang") diseñado para representación progresiva y eficiencia de tokens. La afirmación es aproximadamente un 67% menos de tokens que JSON equivalente para diseños complejos.  

El intercambio es la madurez del ecosistema — OpenUI es más nuevo y las herramientas son más delgadas que los enfoques basados en JSON. Pero si el costo de tokens es una restricción significativa y está generando diseños complejos con alta frecuencia, la eficiencia del formato es real.

### Tambo

**GitHub**: [tambo-ai/tambo](https://github.com/tambo-ai/tambo)

Tambo se centra en la selección de componentes con estado: la IA selecciona componentes y puede interactuar con ellos mediante herramientas del lado del cliente, manteniendo el estado de los componentes a lo largo de la conversación. Ideal para casos de uso donde los elementos de la interfaz persisten entre turnos — un componente de filtro que el usuario ajusta mientras la IA sigue razonando sobre los datos filtrados.

---

## La capa de Python

La ecosistema de Python aborda las interfaces de IA de manera diferente. Estas herramientas están optimizadas para demostraciones de modelos de ML, aplicaciones de datos y herramientas internas — no para aplicaciones de consumo en producción con composición de diseño impulsada por agentes.

Eso no es una crítica. Para los casos de uso adecuados, Gradio y Streamlit son las únicas herramientas que necesitas.

### Gradio

**GitHub**: [gradio-app/gradio](https://github.com/gradio-app/gradio) · PyPI: `gradio`

El valor principal de Gradio: escribes una función en Python; Gradio la envuelve en una interfaz web. La clase `Interface` son 3 líneas para un clasificador de imágenes. `ChatInterface` son 10 líneas para un chatbot. `Blocks` te da control detallado de diseño cuando lo necesitas.

La "interfaz generativa" en Gradio está definida por el desarrollador de Python, no por el modelo. La visibilidad y configuración de los componentes pueden cambiar dinámicamente según las salidas del modelo, pero el catálogo de componentes es estático: no estás pidiendo al modelo que compone diseños.  

Gradio es el predeterminado para HuggingFace Spaces y el ecosistema de demostraciones de ML. Tiene millones de descargas mensuales e impulsa una gran parte del paisaje de demostraciones de IA.  

**Usa Gradio cuando**: seas un desarrollador de Python que construya una demostración de modelo ML, un prototipo de investigación o una herramienta interna, y no quieras tocar JavaScript.  

### Streamlit  

**GitHub**: [streamlit/streamlit](https://github.com/streamlit/streamlit)  

El modelo de Streamlit es más opinado: un script de Python se ejecuta de extremo a extremo en cada interacción. Llamas a `st.chat_message()`, `st.dataframe()`, `st.plotly_chart()`. El marco maneja el diseño.  

El modelo de reinicio completo del script suena ineficiente pero resulta sorprendentemente ergonómico para chatbots de IA que acumulan historial de conversación: todo el script se vuelve a ejecutar, el historial de chat está en el estado de la sesión, y la salida es determinista. Streamlit ahora tiene soporte de primera parte para la mayoría de los proveedores principales de LLM e integra nativamente con Snowflake Cortex.  

**Usa Streamlit cuando**: estés construyendo una aplicación de datos impulsada por IA, una herramienta de informes interna o un panel respaldado por ML en Python y desees la ruta de despliegue más simple posible.  

### LangChain y Haystack  

Estos son marcos de orquestación backend, no marcos de interfaz. Aparecen en cualquier mapa honesto de stacks de interfaz generativa porque típicamente son la capa donde se generan las salidas estructuradas antes de enviarlas a una interfaz frontend.

**LangChain** ([langchain-ai/langchain](https://github.com/langchain-ai/langchain)): `.with_structured_output()` en cualquier LLM le ofrece generación de JSON con restricciones Pydantic. El decorador `@tool` con generación automática de esquema es la forma más limpia de definir qué herramientas puede llamar el modelo. LangChain envía resultados estructurados a la capa frontend que esté utilizando.

**Haystack** ([deepset-ai/haystack](https://github.com/deepset-ai/haystack)): arquitectura modular de canalización con fuerte soporte para RAG. Hayhooks envuelve las canalizaciones de Haystack como puntos finales HTTP — incluyendo puntos finales compatibles con MCP. Si su interfaz generativa necesita un respaldo de recuperación, la arquitectura de canalización de Haystack maneja esto de forma limpia.

Ninguno de estos marcos posee la capa de interfaz. Generan los datos que su frontend (Patrón 1, 2 o 3) renderiza.

---

## Referencia de Características

Use el catálogo anterior como orientación, no como una lista de compras. El stack generalmente se reduce a una elección por capa:

| Necesidad | Empiece aquí |
|----------|--------------|
| Secuencia de eventos de agente a frontend | [AG-UI](https://github.com/ag-ui-protocol/ag-ui) |
| Carga útil de UI declarativa que cruza un límite de confianza | [A2UI](https://github.com/google/A2UI) o [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) |
| Renderizado de chat/herramientas propiedad de la aplicación | [Vercel AI SDK](https://github.com/vercel/ai), [assistant-ui](https://github.com/assistant-ui/assistant-ui) o [CopilotKit](https://github.com/CopilotKit/CopilotKit) |
| Dashboards, informes y formularios compuestos por catálogo | [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown), [OpenUI](https://github.com/thesysdev/openui) o [Tambo](https://github.com/tambo-ai/tambo) |
| Artefactos visuales en entorno aislado | [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) |
| Demos en Python y aplicaciones de datos | [Gradio](https://github.com/gradio-app/gradio) o [Streamlit](https://github.com/streamlit/streamlit) |

---

## Velocidad del Ecosistema y Terreno Inestable

Este espacio evoluciona rápidamente y varios proyectos han lanzado comunicaciones confusas junto con su código. Última verificación el 8 de mayo de 2026; trate las notas sobre el estado de los proyectos aquí como una lectura con marca de tiempo, no como un veredicto permanente.

**Vercel AI SDK RSC** fue la característica principal de Generative UI cuando se lanzó la versión 3.0 del SDK. Vercel pausó su desarrollo en octubre de 2024 ([Discusión #3251](https://github.com/vercel/ai/discussions/3251)), citando limitaciones arquitectónicas en React Server Components sin solución inminente. Los equipos que habían construido sobre esta tecnología estaban justificadamente frustrados. Aún aparece en la documentación, pero ya no es la ruta recomendada; ahora lo es `useObject`.

**json-render** (Vercel Labs) es la dirección nueva: una alternativa basada en catálogos y sin dependencia de marco que evita los problemas de acoplamiento con RSC. Está en pre-1.0 y muestra interés temprano sólido entre desarrolladores de React/web. La razón probable para la experiencia del desarrollador (DX): json-render es inmediatamente útil en un proyecto estándar de React/Next.js, mientras que el alcance multiplataforma de A2UI añade fricción de configuración. Cómo evolucionará esto a medida que las especificaciones maduren es genuinamente incierto. Vercel ha explorado la compatibilidad con A2UI en json-render, lo que sugiere que una convergencia es posible.

**A2UI** (Google) también está en pre-1.0 (v0.9 en la última verificación), con cambios rotos entre versiones menores y comunicaciones inconsistentes de Google sobre su roadmap. Es la opción correcta para un alcance multiplataforma (web + Flutter + SwiftUI) que json-render no aborda, y cuenta con respaldo empresarial significativo. Para proyectos web puros, la experiencia de desarrollador es más áspera.

**AG-UI** (CopilotKit) también está en pre-1.0. La confusión más común: el nombre hace pensar que es un marco de interfaz. No lo es: es un protocolo de transporte. AG-UI define cómo fluyen los eventos entre los backends de agentes y tu frontend; lo que renderices en respuesta sigue siendo tu decisión. Este modelo mental es sólido y ampliamente adoptado, pero la especificación pre-1.0 significa que aún se están resolviendo casos de borde.

El resultado práctico: **todos los jugadores importantes aquí están en pre-1.0**. Planifica cambios en las API. Los patrones — herramienta-a-componente, composición de catálogo, generación en sandbox — son lo suficientemente estables como para construir sobre ellos. Las elecciones específicas de protocolo no lo son.

---

## Diseño del Catálogo de Componentes: El Trabajo de Ingeniería Real

La mayor parte de la complejidad interesante en el Patrón 2 no está en el renderizador: está en el catálogo.

El catálogo es una **decisión de producto codificada como esquema**. Responde: ¿cuáles son los objetos de interfaz significativos en este dominio? No se trata de "¿qué componentes de React existen?" sino de "¿qué necesita ver y interactuar un usuario en este contexto?".

**El modo de fallo demasiado detallado**: expones `Row`, `Column`, `Text`, `Button`, `Icon`. Ahora el modelo debe actuar como ingeniero frontend. Generará diseños de layout mediocres que no coincidan con tu sistema de diseño, omitirá estados vacíos, producirá markup inaccesible y cambiará su enfoque de una respuesta a otra porque nada en el catálogo restringe la salida al lenguaje visual de tu producto.

**El modo de fallo demasiado grueso**: expones `WeatherCard`, `FlightCard`, `HotelCard`. El modelo no puede adaptarse cuando el usuario pide algo que no coincide con una tarjeta predefinida. Recurre al texto.  

**El punto útil intermedio**: componentes de nivel de dominio con ranuras restringidas.  

Un catálogo para una aplicación de viajes podría verse así:  

```
TripSummary         — itinerario a un vistazo  
FlightOptionList    — opciones de vuelo seleccionables con precios  
HotelComparison     — tarjetas de hoteles lado a lado  
TravelerForm        — recopila detalles de viajeros  
PolicyNotice        — anotación de reglas regulatorias/tarifarias  
BookingConfirmation — confirmación final con botón de acción  
```  

Un catálogo para una aplicación financiera podría verse así:  

```
PortfolioSnapshot   — posiciones clave y P&L  
TransactionTable    — tabla de transacciones filtrable y paginada  
RiskBreakdown       — métricas de asignación y volatilidad  
ScenarioComparison  — modelado de escenarios lado a lado  
ApprovalGate        — acción que requiere confirmación humana  
```  

El catálogo suena como el vocabulario de tu producto. Codifica tus decisiones de UX, tus requisitos de accesibilidad, tu manejo de estados vacíos y tus patrones de acciones peligrosas en código de componentes. El modelo puede organizar esas piezas. Tú aún decides cómo se ven cada pieza y qué está permitido que hagan.  

**Reglas de diseño de esquema que reducen alucinaciones**:  

1. Mantén los valores de enum cortos y obvios. `"type": "bar_chart"` no `"type": "data-visualization-bar-type-vertical"`.  
2. Haz que la composición inválida sea imposible. Si un `PolicyNotice` solo puede aparecer al final de un diseño, no lo incluyas en el mismo nivel de esquema que elementos que pueden aparecer en cualquier lugar.  
3. Usa campos obligatorios generosamente. Un campo opcional es un campo que el modelo podría omitir y que tu renderizador debe manejar como nulo.  
4. Prueba el catálogo contra prompts reales antes de implementarlo. Guarda las especificaciones generadas; revisa violaciones del esquema, valores de campo alucinados y composiciones técnicamente válidas pero semánticamente incorrectas.  

---  

## Trampas comunes  

**Trampa: tratar JSON válido como comportamiento seguro**. La validación del esquema confirma la estructura. No dice nada sobre si la acción asociada a un botón coincide con su etiqueta, si un total coincide con los datos de los que se deriva o si un componente de UI hace algo que el usuario no esperaba. Las especificaciones de UI generadas necesitan revisión semántica, no solo validación del esquema. Como mínimo, acciones destructivas deben requerir un componente de confirmación, y las etiquetas de estos componentes deben probarse contra las acciones que desencadenan.

**Trampa: exponer primitivas de diseño en lugar de primitivas del producto.** Si el modelo debe decidir si usar un relleno de 16px o 20px, le has dado el nivel de abstracción incorrecto. Los componentes de dominio deben codificar el gusto del producto. El modelo debería componer comportamientos, no gestionar detalles de presentación.  

**Trampa: usar UI generativa cuando una UI estática bastaría.** Si la estructura de lo que deseas mostrar es conocida en tiempo de desarrollo —y normalmente lo es—, el Patrón 1 con componentes preconstruidos es más rápido, seguro y coherente. La UI generativa justifica su complejidad solo cuando la estructura varía genuinamente según los datos o el contexto de la tarea.  

**Trampa: omitir la accesibilidad.** Los LLM generan violaciones de WCAG. Asignarán `role="region"` a elementos interactivos, crearán formularios sin etiquetas y producirán relaciones de contraste que fallen en WCAG AA. Tu biblioteca de componentes puede ser totalmente accesible; sin embargo, las composiciones generadas por IA de esos componentes no lo son automáticamente. Prueba toda la ruta de renderizado, no solo los componentes aislados.  

**Trampa: confundir protocolo y marco.** AG-UI no es un marco frontend. A2UI no es una biblioteca de React. Son formatos de cableado y protocolos de eventos. Aún necesitas un marco frontend para implementarlos. CopilotKit implementa AG-UI y A2UI. json-render implementa el patrón de catálogo A2UI/Open-JSON-UI. Son capas distintas.  

---  

## Recomendaciones por caso de uso  

**Añadir un copiloto a una aplicación SaaS existente**: Inicia con el Patrón 1 (herramienta a componente). Usa Vercel AI SDK `useChat` o CopilotKit. Asigna tus 5–10 acciones de agente más importantes a componentes preconstruidos. Lánzalo, métralo y amplía el catálogo solo si los usuarios demuestran necesitar composiciones más ricas.  

**Generación de dashboards desde lenguaje natural**: Usa el Patrón 2 con json-render o un catálogo A2UI personalizado. Define un catálogo de 8–15 tipos de componentes que cubran tus tipos de gráficos, tarjetas de métricas y variantes de tablas. Alimenta el esquema al modelo; deja que componga el diseño. Construye validación que detecte tipos desconocidos antes de que lleguen al renderizador.  

**Frontend multiagente**: Usa CopilotKit con AG-UI. El flujo de eventos maneja la transmisión en tiempo real entre backend de agentes; el estado compartido gestiona el paso entre agentes; el patrón HITL maneja las compuertas de aprobación.  

**Construir dentro de ChatGPT u otro host MCP**: Usa MCP Apps. Define tu herramienta como una herramienta de datos que obtiene y razona, y una herramienta de renderizado separada que solicita un widget. Mantén la lógica empresarial fuera de la plantilla del widget.

**Demostraciones de modelos ML y aplicaciones de datos (equipo de Python)**: Gradio para demostraciones y HuggingFace Spaces. Streamlit para aplicaciones de datos con interacción más compleja. Ninguno requiere JavaScript.  

**Artefactos visuales, simulaciones, diagramas**: Usa el patrón 3 (OpenGenerativeUI o equivalente). Establece una política CSP estricta para iframes. Trata la salida como contenido de usuario no confiable desde una perspectiva de seguridad.  

Los marcos están madurando rápidamente. La convergencia de protocolos (AG-UI para streaming, A2UI/Open-JSON-UI para especificaciones de catálogos) aún está en progreso, pero la forma ya es clara lo suficiente como para construir sobre ella.  

Los desafíos de ingeniería más importantes ahora no son la selección de marcos. Son el diseño de catálogos —decidir qué puede decir el modelo, lo que requiere claridad del producto más que habilidad técnica—. Son la validación semántica —probar que la interfaz generada hace lo que afirma, no solo que pasa la validación de esquema—. Y son la brecha de accesibilidad —construir catálogos donde cada componente, y cada composición de componentes, cumpla con el umbral de accesibilidad que exigirías a una interfaz escrita a mano.  

El modelo hará lo que le digas dentro de la gramática que le des. Haz que la gramática sea deliberada.
````
