# Translation Candidate
- Slug: llm-generative-ui-landscape-2026
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/es/index.mdx
- Validation: passed
- Runtime seconds: 17.48
- Input tokens: 56239
- Output tokens: 11930
- Thinking tokens: unknown
- Cached input tokens: 27136
- Cache write tokens: 0
- Estimated cost: $0.004341
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: El panorama GenUI de LLM v2
subTitle: >-
  De la renderización herramienta‑a‑componente a la generación abierta: un mapa
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
"Generative UI" significa al menos cinco cosas distintas según quien lo diga.

- Interfaces de chat que incrustan tarjetas de producto a partir de llamadas a herramientas del modelo  
- Especificaciones JSON en tiempo de ejecución que el frontend renderiza como árboles de componentes  
- Iframes aislados devueltos por herramientas MCP a aplicaciones host (desde pedidos de tickets, reservas de hotel hasta renderizado de mapas, widgets de checkout)  
- Protocolos de eventos que transmiten el estado del agente al frontend  
- v0, Lovable y Bolt: herramientas de IA que generan React en tiempo de diseño  

Estos conceptos están relacionados, pero operan en capas diferentes de la pila y conllevan perfiles de riesgo distintos, costos de implementación variables y casos de uso apropiados diferentes. Confundirlos convierte cualquier discusión de arquitectura en un caos.

Este es el mapa que quiero cuando decido dónde en la pila llegar.

## Qué no es UI generativa

Antes de definir qué es, hay tres cosas que debemos dejar de lado:

**Generación de código en tiempo de diseño** — v0, Lovable, Bolt, Cursor que componen componentes de React. Estas herramientas generan código que los desarrolladores revisan y comiten. La IA se ejecuta en tiempo de desarrollo. Lo que se envía al cliente es estático desde la perspectiva del usuario. Es una categoría excelente de herramientas. No es lo que significa “UI generativa en tiempo de ejecución”.

**Autocompletado de formularios asistido por IA** — el modelo rellena valores de campos a partir del contexto. La estructura de la interfaz sigue siendo fija; solo cambia el contenido. Es un patrón útil. No es UI generativa.

**IA escribiendo HTML sin procesar en una página** — el modelo genera cadenas como `<div>` y `<button>` que se inyectan mediante `innerHTML` o `dangerouslySetInnerHTML`. Esto *es* UI generativa en tiempo de ejecución en el sentido más técnico. También es la versión más peligrosa, y la que todos los frameworks maduros en este ámbito intentan evitar. El marcado generado por IA sin procesar implica riesgo de XSS, atributos inaccesibles, estilos inconsistentes y estructuras alucinadas. El resto de este artículo trata de hacer algo mejor que esto.

---

## Una Definición Operativa


UI generativa en tiempo de ejecución significa: **el modelo determina qué componente de interfaz o composición de componentes ve el usuario, en función del estado de la conversación o la tarea.**

No las palabras. La interfaz.

El caso más sencillo: su asistente de reserva de vuelos llama a una herramienta `search_flights`. En lugar de devolver texto plano ("Aquí tienes tres opciones…"), renderiza un componente `<FlightResultsCard>` con vuelos seleccionables, conmutadores de clase de asiento y un botón "Book". El modelo decidió que una tarjeta estructurada era la respuesta adecuada aquí. El desarrollador definió cómo se ve esa tarjeta y qué hace "Book".

El caso más complejo: un agente de análisis financiero recibe una pregunta sobre una cartera y decide componer una respuesta con un `MetricGroup` que muestra los números clave, un gráfico `RiskBreakdown`, una tabla `ScenarioComparison` y un `PolicyNotice`. El modelo ensambló ese diseño a partir de un catálogo de componentes preaprobados. El desarrollador definió cada componente. El modelo eligió cuáles usar y qué datos colocar en ellos.

Ambos casos son UI generativa. Diferencian en cuánta libertad de composición tiene el modelo, lo que determina tanto la riqueza de los posibles resultados como la complejidad de lo que puede fallar.

## Los Tres Patrones

Todo el espacio se reduce a tres patrones, cada uno con una gramática de salida diferente.

![Un diagrama de espectro que muestra tres patrones: solo llamadas a herramientas a la izquierda (más seguro), catálogo de componentes en el medio, y generación abierta a la derecha (más expresiva).](../output-grammar-spectrum.svg)

_Every generative UI decision is a point on this spectrum. Start left._

### Patrón 1: Renderizado herramienta‑a‑componente

El modelo llama a una herramienta con nombre. Tu aplicación tiene un mapa de nombres de herramientas a componentes. La llamada a la herramienta dispara el renderizado de un componente.

```tsx
// The model calls: { name: "show_flight_results", args: { flights: [...] } }

useCopilotAction({
  name: "show_flight_results",
  render: ({ args }) => <FlightResultsCard flights={args.flights} />,
});
```

Este es el patrón más seguro porque el diseño nunca proviene del modelo. El modelo decide *cuándo* mostrar un componente y *qué datos* rellenarlo. Tus desarrolladores siguen controlando el código del componente, el diseño visual, la implementación de accesibilidad y cada caso límite en la lógica de renderizado.

El `useChat` del Vercel AI SDK con manejadores de `tool` hace esto. El renderizado de herramientas de assistant‑ui lo hace. El “Static Generative UI” de CopilotKit sigue este patrón. La mayoría de las interfaces copilot en producción que funcionan de forma fiable lo están haciendo.

**Adecuado cuando**: el conjunto de cosas que podrías querer mostrar es conocible en tiempo de desarrollo. Confirmaciones de reservas, resultados de búsqueda, resúmenes de cuenta, widgets de aprobación. Si puedes enumerar los escenarios, este patrón los cubre.

### Patrón 2: Composición a partir de un catálogo de componentes

El modelo emite un árbol JSON tipado que hace referencia a componentes de un catálogo definido por el desarrollador. Tu frontend tiene un renderizador que recorre el árbol e instancia cada componente.

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

El modelo compuso ese diseño: un `MetricGroup`, un `LineChart`, un `InsightCallout`. Pero tú definiste qué significa cada tipo de componente, qué propiedades acepta y cómo se renderiza. Si el modelo intenta emitir `{ "type": "custom_untested_thing" }`, la validación de tu esquema lo captura y el renderizador lo ignora o lo rechaza.

Este es el patrón detrás de `json-render`, `A2UI`, `Hashbrown`, `OpenUI` y `Tambo`. El trabajo de ingeniería clave es **diseñar el catálogo** — decidir qué tipos de componentes existen, cómo son sus esquemas y qué se le permite y qué no al modelo componer.

**Apropiado cuando**: la estructura de lo que deseas mostrar varía de forma legítima según los datos o la solicitud del usuario. Tableros que se adaptan a lo que destaca en los números. Informes que muestran secciones diferentes dependiendo del contexto. Paneles de flujo de trabajo que cambian según el paso en el que se encuentre un agente.

### Patrón 3: Generación abierta

El modeloescribe HTML, SVG, Canvas o WebGL que se renderiza dentro de un iframe aislado con una Política de Seguridad de Contenido estricta.

Esto es apropiado para casos en los que ningún catálogo de componentes fijo sirve: visualizaciones de algoritmos, diagramas de arquitectura, gráficos ad hoc, arte generativo, simulaciones educativas. La frontera del iframe es la que realiza el trabajo de seguridad aquí; si la eliminas vuelves al problema de inyección de HTML crudo descrito al inicio de este artículo.

`CopilotKit/OpenGenerativeUI` es la mejor referencia actual de implementación de este patrón. El sandbox elimina scripts, limita el paso de mensajes y mantiene el arte generado alejado del estado privilegiado de tu aplicación.

**Apropiado cuando**: realmente necesitas una salida visual arbitraria — diagramas explicativos puntuales, simulaciones dinámicas, arte creativo. No lo uses para UI transaccional. Una confirmación de compra no requiere un iframe aislado.

### Más allá de los tres patrones: LLMs generando píxeles directamente

Existe una cuarta dirección emergente que no encaja limpiamente en ninguno de estos patrones: LLMs que impulsan **experiencias inmersivas tipo juego** controlando la salida visual de forma más directa que un iframe aislado.

La distinción canónica dentro de la UI generativa es **HTML en iframe vs. catálogo JSON**:

- **HTML en iframe** — el modelo escribe HTML, SVG, Canvas o WebGL que se renderiza en un sandbox aislado. Máxima libertad expresiva; la seguridad depende completamente del límite del iframe. Ejemplos: Anthropic Artifacts, OpenGenerativeUI.
- **Catálogo JSON** — el modelo emite una carga estructurada restringida a un catálogo de componentes definido por el desarrollador; su renderizador instancia componentes confiables y preconstruidos a partir de esa especificación. El modelo decide *qué* mostrar; usted decide *cómo* se renderiza. Ejemplos: json-render, A2UI.

Más allá de estos, demos muy recientes insinúan un tercer modo en el que el modelo no elige componentes ni escribe HTML en un sandbox, sino que controla el lienzo de forma más directa. Proyectos como [Tencent's HunyuanWorld](https://arxiv.org/abs/2502.01999), que genera entornos 3D explorables a partir de una sola imagen, y arquitecturas de juegos donde los LLM generan mapas, NPC y misiones en tiempo de ejecución en lugar de llamar a un catálogo de componentes, sugieren un futuro en el que el modelo se asemeja más a un director de juego que a un renderizador de formularios. La inferencia de LLM en el navegador mediante WebGPU ([WebLLM](https://mlc.ai/web-llm/)) está empujando la misma frontera localmente.

Este territorio es realmente emocionante y, a la vez, está en una fase muy temprana. Aún no existen marcos estables para construir productos en producción. Cubriré este enfoque en un artículo dedicado una vez que eso cambie.

---

## El ecosistema completo

![Un diagrama de cuatro capas que mapea cada herramienta principal de UI generativa: protocolos (AG-UI, A2UI, MCP Apps) en la parte superior, shells de aplicaciones JavaScript a continuación (CopilotKit, Vercel AI SDK, assistant‑ui, LangGraph), luego herramientas de catálogo JavaScript (json‑render, Hashbrown, OpenUI, Tambo), y finalmente herramientas Python en la base (Gradio, Streamlit, LangChain, Haystack).](../full-stack-map.svg)

_Cuatro capas. Los protocolos definen el formato de transmisión. Los shells de aplicación gestionan el estado y el renderizado. Las herramientas de catálogo limitan lo que el modelo puede generar. Las herramientas Python son una vía paralela para flujos de trabajo de datos y ML._

## Los protocolos: AG-UI y A2UI

AG-UI y A2UI son los dos estándares principales en la capa de protocolo. Resuelven problemas diferentes y no son competidores.

### AG-UI

**GitHub**: [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)

AG-UI es un protocolo basado en eventos para la comunicación entre agentes de IA y aplicaciones frontend. Define alrededor de 16 tipos de eventos: `TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT`, `TOOL_CALL_START`, `TOOL_CALL_END`, `STATE_SNAPSHOT`, `STATE_DELTA`, etc. El transporte lo eliges tú — SSE, WebSockets, webhooks funcionan igualmente. El formato es deliberadamente flexible para permitir una adopción amplia.

AG-UI no define cómo se ve tu UI. Define cómo el agente se comunica *con* tu frontend. Piensa en ello como la capa de protocolo de bajo nivel que permite que tu aplicación React se suscriba a un agente LangGraph de la misma forma que se suscribe a un agente CrewAI, sin necesidad de modificar el código del frontend.

CopilotKit creó AG-UI a partir de su trabajo con LangGraph y CrewAI. Ha sido adoptado por LangChain, Mastra, PydanticAI y otros. Microsoft ha publicado una guía de integración de AG-UI. Si estás construyendo un frontend de múltiples agentes y necesitas desacoplar los frameworks de backend del código del frontend, AG-UI es la solución.

**Una aclaración que confunde a la gente**: AG-UI no es un framework de UI. No te dice qué renderizar. Te indica *que* el agente dijo algo, llamó a una herramienta o actualizó el estado compartido. Qué renderizar en respuesta sigue siendo decisión tuya.

### A2UI

**GitHub**: [google/A2UI](https://github.com/google/A2UI) · Spec: [a2ui.org](https://a2ui.org/)

A2UI es la especificación declarativa de Google para lo que los agentes envían cuando quieren mostrar UI. Mientras AG‑UI responde “¿cómo se comunica el agente?”, A2UI responde “¿qué formato usa el agente para describir un diseño de componentes?”.

A2UI utiliza un formato plano JSONL: un descriptor de componente por línea, cada uno con un ID, un tipo y datos. La planitud es intencional. Los árboles anidados obligan al modelo a conocer la estructura completa antes de poder comenzar a transmitir. Una lista plana permite que el modelo emita cada componente a medida que lo “piensa”, lo que significa que tu frontend puede empezar a renderizar la primera tarjeta de métrica mientras el modelo sigue decidiendo si añadir un gráfico.

```jsonl
{"id":"h1","type":"kpi_card","title":"MRR","value":"$82,400","delta":"+12%"}
{"id":"h2","type":"kpi_card","title":"Churn","value":"2.1%","delta":"-0.4%"}
{"id":"c1","type":"line_chart","title":"30-day MRR","data_ref":"mrr_series"}
{"id":"t1","type":"data_table","cols":["Month","MRR","Net New"],"data_ref":"monthly"}
```

A2UI está pensado con la seguridad en mente: la especificación es un formato de datos, no código ejecutable. El catálogo de componentes lo define el desarrollador; el agente solo puede referenciar tipos presentes en ese catálogo. Un renderizador de A2UI que reciba un nombre de tipo desconocido simplemente lo ignora.

El formato “Open-JSON-UI” de CopilotKit es compatible con A2UI. Si hoy vas a escoger un formato de especificación para un catálogo de componentes, A2UI es el que cuenta con el respaldo multiplataforma más amplio.

**Una nota sobre la estabilidad**: A2UI aún está en pre‑1.0 — v0.9 según la última revisión del 8 de mayo de 2026 — y ha introducido cambios de especificación que rompen compatibilidad entre versiones menores. Las comunicaciones de Google sobre la hoja de ruta han sido esporádicas y algunos renderizadores (Lit, Flutter) se han quedado rezagados respecto a las actualizaciones de la especificación. Reserva tiempo para la deriva de la spec si vas a construir sobre ella hoy. Para casos de uso puramente web, json-render parece ofrecer una herramienta más completa en la actualidad. La ventaja a largo plazo de A2UI es su alcance multiplataforma (web, Flutter, SwiftUI, Android) que json-render no posee.

### MCP Apps

**GitHub**: [modelcontextprotocol](https://github.com/modelcontextprotocol) · Related: [mcp-ui](https://github.com/MCP-UI-Org/mcp-ui)

MCP comenzó como un protocolo para conectar LLMs a herramientas y datos. La extensión Apps permite que las herramientas MCP devuelvan no solo datos, sino artefactos UI interactivos: componentes React, formularios, paneles de control, mapas.

El modelode seguridad es estricto y ese es el objetivo: todo se renderiza en un iframe aislado con permisos limitados, las plantillas están predeclaradas para que la aplicación anfitriona pueda revisarlas, y toda la comunicación se realiza mediante JSON‑RPC auditable. Este es el modelo adecuado para los proveedores de herramientas —un servidor MCP de Shopify puede devolver un widget de checkout; un servicio de mapas puede devolver un mapa incrustable. La aplicación anfitriona no posee ni confía en el código de ese widget.

MCP Apps es la elección correcta cuando la UI *pertenece al proveedor de la herramienta*, no a tu aplicación. Para UI que reside en el dominio de tu aplicación, mantente con el Patrón 1 o 2.

## Los frameworks JavaScript/TypeScript

### CopilotKit

**GitHub**: [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) · Ejemplos: [CopilotKit/generative-ui](https://github.com/CopilotKit/generative-ui)

CopilotKit es el framework más completo para aplicaciones frontend nativas de agentes. Gestiona todo el ciclo de vida: conecta con backends de agentes a través de AG‑UI, administra el estado de conversación bidireccional, renderiza componentes de UI generativa y provee la infraestructura de estado compartido que permite a agentes y usuarios modificar los mismos datos.

El modelo de tres patrones se mapea limpiamente a las API de CopilotKit:
- `useCopilotAction` con un callback `render` → Patrón 1
- Renderizado A2UI/Open-JSON-UI → Patrón 2
- Artefactos sandboxed de `OpenGenerativeUI` → Patrón 3

La característica importante de CopilotKit que suele subestimarse es **el estado compartido y el humano en el bucle**: el agente puede leer y escribir el estado de la aplicación, el usuario también puede leer y escribir, y los cambios fluyen bidireccionalmente. Esto es lo que hace que las UI al estilo Copilot se sientan como una colaboración real y no como una caja de chat pegada a un producto.

### Vercel AI SDK

**GitHub**: [vercel/ai](https://github.com/vercel/ai) · Docs: [ai-sdk.dev](https://ai-sdk.dev/)

El Vercel AI SDK es la referencia de facto en TypeScript para aplicaciones de IA. Para UI generativa específicamente:

**`useObject`** transmite un objeto JSON estructurado desde el servidor a medida que se genera. Definís un esquema Zod; el SDK analiza el JSON parcial y dispara re‑renders cuando llegan los campos. Esta es la vía más fluida hacia el Patrón 2 en una aplicación Next.js.

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

**`useChat` con manejadores de herramientas** → Patrón 1. El modelo invoca herramientas; vos mapeás los nombres de las herramientas a componentes.

**AI Elements** ([elements.ai-sdk.dev](https://elements.ai-sdk.dev/)) ofrece primitivas de UI listas para usar junto con el SDK.

**Una nota sobre la confusa trayectoria aquí**: En octubre 2024, Vercel anunció en [GitHub Discussion #3251](https://github.com/vercel/ai/discussions/3251) que AI SDK RSC — el patrón de streaming de React Server Components promocionado como la característica principal “Generative UI” en el SDK 3.0 — se había pausado indefinidamente debido a “varias limitaciones de larga data” sin soluciones cercanas viables. Los equipos que habían construido sus estrategias de producto alrededor del streaming con RSC se vieron sorprendidos. Las API `generateObject`/`streamObject` también fueron posteriormente desaprobadas en el SDK 6.0. La migración recomendada desde AI SDK RSC es el patrón `useObject` descrito arriba, o json-render para generación basada en catálogos.

### assistant-ui

**GitHub**: [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)

assistant-uies un conjunto de primitivas composables de React para construir interfaces de chat de calidad de producción. Es la solución adecuada cuando necesitas una UX de chat pulida — burbujas de mensaje, tokens en streaming, acciones de copiar/editar/regenerar, estados de “pensando” — y deseas aportar tu propio backend y tu propio renderizado de herramientas.

Funciona bien emparejado con cualquier backend (OpenAI, Anthropic, modelos locales, endpoints personalizados) y gestiona el renderizado de llamadas a herramientas mediante un modelo familiar de slot/render prop.

### json-render

**GitHub**: [vercel-labs/json-render](https://github.com/vercel-labs/json-render) · Docs: [json-render.dev](https://json-render.dev/)

json-render operacionaliza el Patrón 2 con un enfoque opinado y listo para usar. Obtienes un catálogo de componentes preconstruido (componentes shadcn/ui con esquemas Zod), un renderizador y un bucle de generación estrecho donde el modelo está limitado al catálogo mediante el esquema.

Las características distintivas:
- **Renderizado multi‑destino**: la misma especificación JSON puede renderizarse en una aplicación web React, una app móvil React Native, un PDF, un correo electrónico HTML o un video Remotion. Esto resulta realmente útil para informes.
- **Renderizado progresivo**: los componentes aparecen a medida que el modelo los transmite, no después de que llegue la especificación completa.
- **Restricciones de esquema estrictas**: el catálogo está diseñado para que el modelo no pueda alucinar tipos de componentes válidos pero desconocidos.

Si estásconstruyendo una funcionalidad de panel de control o generación de informes y quieres evitar el trabajo de infraestructura de diseñar tu propio catálogo, **json-render** es la vía más rápida para aplicaciones web.

**Sobre el impulso**: json-render se lanzó desde Vercel Labs a principios de 2026 y parece haber captado rápidamente la atención de los desarrolladores web porque resulta útil de inmediato en proyectos estándar de React/Next.js. Dicho esto, json-render sigue estando en fase pre‑1.0 y la relación entre json-render y A2UI aún se está definiendo — Vercel ha experimentado con salida compatible con A2UI, por lo que la convergencia es posible. Para entornos multiplataforma (mobile nativo, varios frameworks), A2UI es la apuesta a más largo plazo.

### Hashbrown

**GitHub**: [liveloveapp/hashbrown](https://github.com/liveloveapp/hashbrown)

Hashbrown adopta un enfoque distintivo: en lugar de construir una capa de interfaz AI separada, inserta la selección de componentes AI directamente en tu aplicación React o Angular existente. Expones los componentes de tu app al LLM; el LLM elige cuáles renderizar y puede invocar herramientas del lado del cliente.

Esta es la herramienta adecuada cuando necesitas inyectar inteligencia en superficies de producto que no son “chat”: una página de producto que adapta su diseño, un panel de configuración que muestra las opciones correctas, o un editor de flujos de trabajo que sugiere el siguiente paso.

### OpenUI

**GitHub**: [thesysdev/openui](https://github.com/thesysdev/openui) · Docs: [openui.com](https://www.openui.com/)

OpenUI sustituye JSON por un formato orientado a líneas similar al código ("OpenUI Lang") que está diseñado para renderizado progresivo y eficiencia de tokens. La afirmación es que reduce aproximadamente un 67 % los tokens respecto a un JSON equivalente para diseños complejos.

Elcompromiso es la madurez del ecosistema — OpenUI es más reciente y las herramientas son más escasas que los enfoques basados en JSON. Pero si el costo de tokens es una restricción significativa y estás generando diseños complejos a alta frecuencia, la eficiencia del formato es real.

### Tambo

**GitHub**: [tambo-ai/tambo](https://github.com/tambo-ai/tambo)

Tambo se centra en la selección de componentes con estado: la IA elige los componentes y puede interactuar con ellos mediante herramientas del lado del cliente, manteniendo el estado del componente a lo largo de la conversación. Es útil para casos en los que los elementos de la UI persisten entre turnos —por ejemplo, un componente de filtro que el usuario ajusta mientras la IA sigue razonando sobre los datos filtrados.

---

## La capa de Python

El ecosistema de Python aborda las interfaces de IA de manera distinta. Estas herramientas están optimizadas para demostraciones de modelos de ML, aplicaciones de datos y utilidades internas —no para aplicaciones de consumo en producción con composición de diseño impulsada por agentes.

No es una crítica. Para los casos de uso adecuados, Gradio y Streamlit son las únicas herramientas que necesitas.

### Gradio

**GitHub**: [gradio-app/gradio](https://github.com/gradio-app/gradio) · PyPI: `gradio`

Valor central de Gradio: escribes una función Python; Gradio la envuelve en una UI web. La clase `Interface` ocupa 3 líneas para un clasificador de imágenes. `ChatInterface` necesita 10 líneas para un chatbot. `Blocks` te brinda control de diseño de bajo nivel cuando lo requieres.

El “generative UI” en Gradio lo define el desarrollador Python, no el modelo. La visibilidad y configuración de los componentes pueden cambiar dinámicamente según la salida del modelo, pero el catálogo de componentes es estático — no le estás pidiendo al modelo que componga diseños.

Gradio es la opción predeterminada para HuggingFace Spaces y el ecosistema de demostraciones de ML. Tiene millones de descargas mensuales y alimenta una gran parte del panorama de demos de IA.

**Usa Gradio cuando**: eres un desarrollador Python que construye una demo de modelo ML, un prototipo de investigación o una herramienta interna, y no quieres tocar JavaScript.

### Streamlit

**GitHub**: [streamlit/streamlit](https://github.com/streamlit/streamlit)

El modelo de Streamlit es más dogmático: un script Python se ejecuta de principio a fin en cada interacción. Llamas a `st.chat_message()`, `st.dataframe()`, `st.plotly_chart()`. El framework se encarga del diseño.

El modelo de reejecución completa del script parece ineficiente, pero resulta sorprendentemente ergonómico para chatbots de IA que acumulan historial de conversación: todo el script se vuelve a ejecutar, el historial de chat está en el estado de sesión y la salida es determinista. Streamlit ahora ofrece soporte de primera clase para la mayoría de los proveedores principales de LLM e integra de forma nativa con Snowflake Cortex.

**Reach for Streamlit when**: estás construyendo una aplicación de datos impulsada por IA, una herramienta interna de reportes o un panel respaldado por ML en Python y deseas la ruta de despliegue más sencilla posible.

### LangChain and Haystack

Estos son marcos de orquestación de backend, no marcos de UI. Aparecen en cualquier mapa honesto de pila de UI generativa porque típicamente son la capa donde se generan salidas estructuradas antes de enviarse a un frontend.

**LangChain** ([langchain-ai/langchain](https://github.com/langchain-ai/langchain)): `.with_structured_output()` en cualquier LLM te brinda generación de JSON restringida por Pydantic. El decorador `@tool` con generación automática de esquemas es la forma más limpia de definir qué herramientas puede invocar el modelo. LangChain entrega resultados estructurados hasta la capa de frontend que estés usando.

**Haystack** ([deepset-ai/haystack](https://github.com/deepset-ai/haystack)): arquitectura de canalizaciones modular con fuerte soporte RAG. Hayhooks envuelve las canalizaciones de Haystack como endpoints HTTP —incluidos endpoints compatibles con MCP. Si tu UI generativa necesita una columna vertebral de recuperación, la arquitectura de canalizaciones de Haystack lo gestiona de forma ordenada.

Ninguno de los dos marcos controla la capa de UI. Generan los datos que tu frontend (Patrón 1, 2 o 3) renderiza.

## Referencia de características

Utiliza el catálogo anterior como orientación, no como una lista de compras. La pila suele colapsar a una única elección en cada capa:

| Necesidad | Empezar aquí |
|-----------|--------------|
| Flujo de eventos agente‑a‑frontend | [AG-UI](https://github.com/ag-ui-protocol/ag-ui) |
| Carga UI declarativa cruzando un límite de confianza | [A2UI](https://github.com/google/A2UI) o [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) |
| Renderizado de chat/herramienta propiedad de la app | [Vercel AI SDK](https://github.com/vercel/ai), [assistant-ui](https://github.com/assistant-ui/assistant-ui) o [CopilotKit](https://github.com/CopilotKit/CopilotKit) |
| Tableros, informes y formularios compuestos a partir de un catálogo | [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown), [OpenUI](https://github.com/thesysdev/openui) o [Tambo](https://github.com/tambo-ai/tambo) |
| Artefactos visuales aislados | [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) |
| Demos en Python y aplicaciones de datos | [Gradio](https://github.com/gradio-app/gradio) o [Streamlit](https://github.com/streamlit/streamlit) |

## Velocidad del ecosistema y terreno inestable

Este espacio avanza rápidamente y varios proyectos han emitido comunicaciones confusas junto con su código. Última verificación 8 de may de 2026; trate las notas de estado del proyecto aquí como una lectura con marca temporal, no como un veredicto permanente.

**Vercel AI SDK RSC** fue la característica insignia de Generative UI cuando se lanzó el SDK 3.0. Vercel pausó su desarrollo en octubre 2024 ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)) citando limitaciones arquitectónicas con React Server Components que no tenían una solución a corto plazo. Los equipos que ya habían construido sobre ella estaban comprensiblemente frustrados. Sigue presente en la documentación, pero no es la ruta recomendada; lo recomendado es `useObject`.

**json-render** (Vercel Labs) es la nueva dirección: una alternativa basada en catálogos y agnóstica al framework que evita los problemas de acoplamiento con RSC. Está en fase pre‑1.0 y parece generar un fuerte interés temprano entre desarrolladores de React/web. La razón probable del DX: json-render es útil de inmediato en un proyecto estándar de React/Next.js, mientras que el alcance multiplataforma de A2UI añade fricción en la configuración. Cómo se resolverá esto a medida que ambas especificaciones maduren es realmente incierto. Vercel ha probado la compatibilidad de A2UI en json-render, lo que sugiere que la convergencia es posible.

**A2UI** (Google) está en pre‑1.0 (v0.9 en la última revisión) y presenta cambios incompatibles entre versiones menores, además de comunicaciones inconsistentes de Google sobre su hoja de ruta. Es la opción adecuada para alcance multiplataforma (web + Flutter + SwiftUI) que json‑render no cubre, y cuenta con un respaldo empresarial significativo. Para proyectos puramente web en este momento, la experiencia de desarrollo (DX) es más áspera.

**AG‑UI** (CopilotKit) también está en pre‑1.0. La confusión más frecuente: el nombre sugiere que es un framework UI. No lo es — es un protocolo de transporte. AG‑UI define cómo fluyen los eventos entre los backends de agente y tu frontend; lo que renderices en respuesta sigue siendo decisión tuya. Ese modelo mental es sólido y está ampliamente adoptado, pero la especificación pre‑1.0 implica que todavía se están resolviendo casos límite.

La conclusión práctica: **todos los jugadores importantes aquí están en pre‑1.0**. Planifica cambios de API. Los patrones — herramienta‑a‑componente, composición de catálogo, generación aislada — son lo suficientemente estables como para construir sobre ellos. Las elecciones de protocolo específicas aún no lo son.

---

## Diseño del Catálogo de Componentes: El Trabajo Real de Ingeniería

La mayor parte de la complejidad interesante del Patrón 2 no está en el renderizador, sino en el catálogo.

El catálogo es una **decisión de producto codificada como un esquema**. Responde: ¿cuáles son los objetos de UI significativos en este dominio? No “¿qué componentes de React existen?” sino “¿qué necesita ver e interactuar realmente un usuario en este contexto?”.

**Modo de falla por exceso de granularidad**: expones `Row`, `Column`, `Text`, `Button`, `Icon`. Ahora el modelo debe actuar como un ingeniero de frontend. Generará diseños mediocres que no coinciden con tu sistema de diseño, omitirá estados vacíos, producirá marcado inaccesible y cambiará su enfoque de respuesta a respuesta porque nada en el catálogo restringe la salida al lenguaje visual de tu producto.

**Modo de falla por falta de granularidad**: expones `WeatherCard`, `FlightCard`, `HotelCard`. El modelo no podrá adaptarse cuando el usuario solicite algo que no se mapee a una tarjeta predefinida. Recurirá al texto.

**El punto intermedio útil**: componentes a nivel de dominio con ranuras restringidas.

Un catálogo de una aplicación de viajes podría verse así:

```
TripSummary         — itinerary at a glance
FlightOptionList    — selectable flight options with pricing
HotelComparison     — side-by-side hotel cards
TravelerForm        — collect traveler details
PolicyNotice        — regulatory/fare rule callout
BookingConfirmation — final confirmation with action button
```

Un catálogo de una aplicación financiera podría verse así:

```
PortfolioSnapshot   — posiciones clave y P&L
TransactionTable    — transacciones filtrables y paginadas
RiskBreakdown       — métricas de asignación y volatilidad
ScenarioComparison  — modelado de escenarios lado a lado
ApprovalGate        — acción que requiere confirmación humana
```

El catálogo representa el vocabulario de tu producto. Codifica tus decisiones de UX, tus requisitos de accesibilidad, tu manejo de estados vacíos y tus patrones de acciones peligrosas en el código de los componentes. El modelo se encarga de organizar esas piezas. Tú sigues definiendo cómo se ve cada pieza y qué se le permite hacer.

**Reglas de diseño de esquema que reducen alucinaciones**:

1. Mantén los valores de enumeración cortos y evidentes. `"type": "bar_chart"` en lugar de `"type": "data-visualization-bar-type-vertical"`.
2. Haz imposible una composición inválida. Si un `PolicyNotice` solo puede aparecer al final de un diseño, no lo coloques en el mismo nivel de esquema que elementos que pueden aparecer en cualquier posición.
3. Usa campos obligatorios con generosidad. Un campo opcional es un campo que el modelo podría omitir y tu renderizador tendría que manejar como nulo.
4. Prueba el catálogo con solicitudes reales antes de lanzarlo. Guarda las especificaciones generadas; revísalas en busca de violaciones de esquema, valores de campo alucinados y composiciones que sean técnicamente válidas pero semánticamente incorrectas.

---
## Trampas comunes

**Trampa: tratar JSON válido como comportamiento seguro.** La validación de esquema confirma la estructura. No dice nada sobre si la acción asociada a un botón coincide con su etiqueta, si un total corresponde a los datos de los que se deriva, o si un componente UI está haciendo algo que el usuario no esperaba. Las especificaciones UI generadas requieren revisión semántica, no solo validación de esquema. Como mínimo, las acciones destructivas deben requerir un componente de confirmación, y las etiquetas de esos componentes deben probarse contra las acciones que desencadenan.

**Trap: exponer primitivas de diseño en lugar de primitivas de producto.** Si el modelo tiene que decidir si usar 16 px o 20 px de padding, le estás dando el nivel de abstracción equivocado. Los componentes de dominio deben codificar el gusto del producto. El modelo debe componer comportamiento, no gestionar detalles de presentación.

**Trap: usar UI generativa donde una UI estática basta.** Si la estructura de lo que quieres mostrar es conocida en tiempo de desarrollo —y suele serlo— el Patrón 1 con componentes preconstruidos es más rápido, más seguro y más consistente. La UI generativa justifica su complejidad solo cuando la estructura varía realmente según los datos o el contexto de la tarea.

**Trap: omitir accesibilidad.** Los LLMs alucinan violaciones de WCAG. Emitirán `role="region"` en elementos interactivos, generarán formularios sin etiquetas y producirán relaciones de contraste que no cumplen WCAG AA. Tu biblioteca de componentes puede ser totalmente accesible; las composiciones generadas por IA de esos componentes no son automáticamente accesibles. Prueba la ruta completa de renderizado, no solo los componentes de forma aislada.

**Trampa: confundir el protocolo con el framework.** AG-UI no es un framework frontend. A2UI no es una biblioteca de React. Son formatos de transmisión y protocolos de eventos. Aún necesitas un framework frontend para implementarlos. CopilotKit implementa AG-UI y A2UI. json-render implementa el patrón de catálogo A2UI/Open-JSON-UI. Estas son capas diferentes.

## Recomendaciones por caso de uso

**Agregar un copiloto a una aplicación SaaS existente**: Comienza con el Patrón 1 (herramienta‑a‑componente). Usa el SDK de Vercel AI `useChat` o CopilotKit. Mapea tus 5–10 acciones de agente principales a componentes preconstruidos. Lanza eso, mézalo, y luego amplía el catálogo solo si los usuarios demuestran una necesidad real de composiciones más complejas.

**Generación de paneles a partir de lenguaje natural**: Usa el Patrón 2 con json-render o un catálogo A2UI personalizado. Define un catálogo de 8–15 tipos de componentes que cubran tus tipos de gráficos, tarjetas de métricas y variantes de tablas. Proporciona el esquema al modelo; deja que componga el diseño. Implementa validación que detecte tipos desconocidos antes de que lleguen al renderizador.

**Frontend multi‑agente**: Usa CopilotKit con AG-UI. El flujo de eventos gestiona la transmisión en tiempo real entre los backends de los agentes; el estado compartido maneja la transferencia entre agentes; el patrón HITL gestiona los portales de aprobación.

**Construir dentro de ChatGPT u otro host MCP**: Use MCP Apps. Defina su herramienta como una herramienta de datos que recupera y razona, y una herramienta de renderizado separada que solicita un widget. Mantenga la lógica de negocio fuera de la plantilla del widget.

**Demos de modelos de ML y aplicaciones de datos (equipo Python)**: Gradio para demos y HuggingFace Spaces. Streamlit para aplicaciones de datos con interacción más compleja. Ninguno requiere JavaScript.

**Artefactos visuales, simulaciones, diagramas**: Use el Patrón 3 (OpenGenerativeUI o equivalente). Establezca una política CSP estricta para iframes. Trate la salida como contenido de usuario no confiable desde el punto de vista de la seguridad.

---

Los frameworksestán madurando rápidamente. La convergencia de protocolos (AG‑UI para streaming, A2UI/Open‑JSON‑UI para especificaciones de catálogos) aún está en proceso, pero la forma ya es lo suficientemente clara como para construir sobre ella.

Los desafíos de ingeniería que importan más en este momento no son la selección del framework. Son el diseño del catálogo — decidir qué se le permite decir al modelo, lo que requiere claridad de producto más que habilidad técnica. Son la validación semántica — comprobar que la UI generada haga lo que afirma, no solo que pase la validación de esquema. Y es la brecha de accesibilidad — crear catálogos donde cada componente, y cada composición de componentes, cumpla con el nivel de accesibilidad que se exigiría a una UI escrita a mano.

El modelo hará lo que le indiques dentro de la gramática que le proporciones. Haz que la gramática sea deliberada.
````
