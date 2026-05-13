# Translation Candidate
- Slug: llm-generative-ui-landscape
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-06--llm-generative-ui-landscape/es/index.mdx
- Validation: passed
- Runtime seconds: 14.67
- Input tokens: 20627
- Output tokens: 7361
- Thinking tokens: unknown
- Cached input tokens: 7040
- Cache write tokens: 0
- Estimated cost: $0.002129
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: El panorama de UI generativa con LLM
subTitle: >-
  De la renderización herramienta‑a‑componente a la generación abierta: un mapa
  de cada enfoque y cuándo justifica su complejidad.
date: '2026-05-06'
modified: '2026-05-06'
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
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Chat era las ruedas de entrenamiento.

La primera generación de aplicaciones LLM se parecía mayormente a un cuadro de texto enganchado a un producto. El modelo devolvía prosa. El frontend renderizaba markdown. Si el usuario necesitaba actuar, el asistente describía el botón que debía pulsar en otro lugar.

Eso estaba bien para demostraciones. No es a donde se dirige esto.

El siguiente paso útil es **generative UI**: el modelo no se limita a responder con texto; ayuda a decidir qué interfaz necesita el usuario en ese momento. A veces eso implica llamar a una herramienta y renderizar una tarjeta preconstruida. Otras veces implica rellenar un componente de flujo de trabajo conocido con datos frescos. En otras ocasiones implica componer un panel temporal, formulario, tabla comparativa, gráfico o widget interactivo.

Desafortunadamente, “generative UI” se ha convertido en una de esas frases que significan cinco cosas diferentes antes del desayuno.

La gente la usa para describir:

- un modelo que elige entre componentes React definidos por el desarrollador  
- una especificación JSON que el frontend renderiza en componentes nativos  
- una aplicación iframe devuelta por una herramienta MCP  
- una biblioteca de UI de chat que soporta llamadas a herramientas  
- un protocolo de agente que transmite estado entre el backend y el frontend  
- un generador de código en tiempo de diseño como v0, Lovable, Bolt o Cursor  
- un modelo que literalmente escribe HTML, SVG, Canvas o React en tiempo de ejecución  

Esos elementos están relacionados, pero no pertenecen a la misma capa. Si los confundes, toda conversación de arquitectura se vuelve una sopa.

Este es el mapa que desearía haber tenido cuando comencé a comparar el stack actual.

![Un mapa por capas del panorama de UI generativa con LLM](../landscape-map.webp)

## El malentendido central

El error más grande es tratar “generative UI” como una única elección tecnológica.

Es mejor dividir el problema en cuatro capas:

1.  **Product shell**: lo que los usuarios tocan. Puede ser un chat, un copiloto lateral, un panel de control, un creador de flujos de trabajo, un panel de IDE, una aplicación de ChatGPT, una pantalla móvil o una consola de soporte.
2.  **UI composition model**: la gramática que se le permite al modelo usar. Puede ser llamadas a herramientas, JSON, A2UI, json-render, OpenUI Lang, selección de componentes Hashbrown o HTML aislado.
3.  **Runtime and transport**: cómo los mensajes, llamadas a herramientas, deltas de estado, acciones de usuario y artefactos UI se mueven entre el agente y el frontend. AG-UI, MCP Apps, Apps SDK, A2A, SSE, WebSockets y el buen viejo HTTP viven aquí.
4.  **Agent and tool backend**: LangGraph, Google ADK, CrewAI, Mastra, LlamaIndex, Pydantic AI, Agno, OpenAI Agents SDK, funciones personalizadas, bases de datos, recuperación y toda la lógica de negocio aburrida que aún debe ser correcta.

Una vez que separas las capas, el ecosistema deja de ser tan místico.

[AG-UI](https://github.com/ag-ui-protocol/ag-ui) no es realmente un competidor de [A2UI](https://github.com/google/A2UI). AG-UI es un protocolo de eventos para la interacción agente‑aplicación. A2UI es un formato UI declarativo que el agente puede enviar. Puedes colocar A2UI sobre AG-UI. También puedes poner componentes personalizados renderizados por herramientas sobre AG-UI.

[json-render](https://github.com/vercel-labs/json-render) no es un producto de chat. Es un catálogo de componentes y una arquitectura de renderizado: define los componentes que el modelo puede usar, haz que el modelo emita un árbol JSON válido y renderiza ese árbol de forma segura.

[CopilotKit](https://github.com/CopilotKit/CopilotKit) no es solo una burbuja de chat. Es una pila frontend para aplicaciones nativas de agente: UI de chat, UI generativa, estado compartido, herramientas frontend y flujos de humano‑en‑el‑bucle.

[OpenAI Apps SDK](https://developers.openai.com/apps-sdk) y [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) no son herramientas de “haz mi app React dinámica”. Son modelos de integración de host para renderizar widgets dentro de ChatGPT u otros hosts compatibles con MCP.

Los nombres resultan confusos porque el ecosistema es joven. Las capas son la parte que sigue siendo útil.

## El espectro de control

La UI generativa es un compromiso entre **control del desarrollador** y **libertad del agente**.

Demasiado control y el asistente se siente como una paleta de comandos con disfraz. Demasiada libertad y el modelo comienza a inventar diseños extraños, botones vagos, jerarquías visuales rotas, estados imposibles y problemas de seguridad con una sonrisa confiada.

El truco consiste en elegir la menor cantidad de libertad que resuelva el problema del usuario.

![Un espectro desde componentes renderizados por herramientas hasta HTML generado sin restricciones](.././control-spectrum.webp)

Pienso en el espectro de esta manera:

**Renderizado de herramienta a componente** es la opción predeterminada más segura. El modelo llama a `get_weather`, `search_products`, `compare_plans` o `draft_invoice`. La aplicación asigna ese resultado de herramienta a un componente que ya posees: `WeatherCard`, `ProductGrid`, `PlanComparison`, `InvoiceReview`. El modelo decide *cuándo* la UI es útil. Los desarrolladores siguen controlando el diseño, los estilos, la accesibilidad, los estados de carga, los estados vacíos y las acciones peligrosas.

Este es el patrón documentado en la [guía de UI generativa del Vercel AI SDK](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces): el modelo llama a una herramienta, la herramienta devuelve datos y la UI renderiza un componente a partir del resultado. También es el modelo mental detrás de muchas implementaciones de CopilotKit y assistant‑ui.

**Catálogos de componentes declarativos** le dan al modelo más espacio. En lugar de elegir un solo componente, el modelo compone un árbol a partir de partes permitidas. Un catálogo podría incluir `Metric`, `Table`, `Chart`, `FilterBar`, `ApprovalPanel` y `Timeline`. El modelo puede ensamblar un panel de control o un paso de flujo de trabajo, pero no puede ejecutar código arbitrario. Aquí es donde se sitúan [A2UI](https://github.com/google/A2UI), [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown) y [OpenUI](https://github.com/thesysdev/openui).

**Mini‑apps en iframe** tienen sentido cuando la UI necesita ser más rica que un árbol de componentes, o cuando un proveedor de herramienta remoto posee la experiencia. MCP Apps y OpenAI Apps SDK permiten que una herramienta devuelva datos estructurados más un recurso de widget que el host renderiza en un iframe. Esto es potente para mapas, carritos de compra, flujos de reserva, gráficos y superficies de producto externas. También crea una frontera más difícil entre la aplicación host y el widget.

**Open-ended generation** es el extremo más lejano: el agente emite HTML, SVG, Canvas, WebGL u otros artefactos tipo código dentro de un sandbox. [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) es el mejor ejemplo actual: el agente puede generar visualizaciones de algoritmos, escenas 3D, diagramas y simulaciones dentro de iframes aislados. Esto es útil para explicaciones visuales puntuales. No es el punto de partida para un flujo de aprobación empresarial.

Ayuda nombrar la distinción clave aquí: **iframe HTML** (el modelo escribe código en un sandbox) vs. **catálogo JSON** (el modelo emite una especificación estructurada y tu renderizador la mapea a componentes preconstruidos). Suenan relacionados pero implican perfiles de riesgo y complejidad muy diferentes. iframe HTML es maximamente expresivo; la frontera del iframe realiza el trabajo de seguridad. El catálogo JSON no le otorga al modelo libertad ejecutable — solo puede referenciar tipos de componentes que definiste previamente. La mayoría de los marcos en este espacio caen claramente en uno u otro campamento.

**Más allá del sandbox**: demos muy recientes sugieren que se está formando un cuarto modo — LLMs que impulsan experiencias tipo juego o inmersivas controlando la salida visual de forma más directa que cualquier catálogo de componentes permite. Proyectos que generan mundos 3D explorables a partir de prompts, comportamiento de NPC dirigido por LLM en tiempo de ejecución, y inferencia de modelo en el navegador vía WebGPU ([WebLLM](https://mlc.ai/web-llm/)) son indicadores tempranos. Aún no existen marcos estables para construir trabajo de producción aquí. Cubriré esta dirección en un artículo dedicado una vez que eso cambie.

## Componentes de alto nivel vs componentes granulares

Esta es la decisión de diseño más importante.

Si tu catálogo es demasiado granular, el modelo tiene que convertirse en un ingeniero frontend:

```tsx
Container
Row
Column
Text
Button
Icon
Spacer
Divider
```

Eso parece flexible, pero ahora el modelo debe decidir el espaciado, la jerarquía, la agrupación, los estados vacíos, las etiquetas de los botones, el manejo de errores y el comportamiento responsivo. Además, has ampliado el prompt y la salida es más fácil de romper.

Si tu catálogo es demasiado de alto nivel, el modelo queda atrapado:

```tsx
WeatherCard
StockCard
HotelCard
```

Eso es seguro, pero solo funciona para escenarios conocidos. El modelo no puede generar una matriz de comparación, solicitar entradas faltantes o adaptar la arquitectura de la información cuando la pregunta del usuario cambia.

El punto medio útil son **componentes a nivel de dominio con ranuras limitadas**:

```tsx
SearchResults
ComparisonTable
MetricGroup
EditablePlan
ApprovalRequest
Timeline
DataCollectionForm
CheckoutReview
```

Estos componentes codifican el gusto del producto y las restricciones del negocio. Al modelo se le permite decidir *qué se debe mostrar*, pero no cada decisión de CSS.

Por ejemplo, un agente de viajes no necesita `div`, `span` y `button`. Necesita:

- `TripSummary`
- `FlightOptionList`
- `HotelComparison`
- `TravelerForm`
- `PolicyNotice`
- `BookingConfirmation`

Un agente financiero no necesita un patio de juegos genérico de gráficos. Necesita:

- `PortfolioSnapshot`
- `TransactionTable`
- `RiskBreakdown`
- `ScenarioComparison`
- `ApprovalGate`

El catálogo debe sonar como tu producto, no como HTML.

## Tabla de características

Esta tabla es intencionalmente opinativa. Trata cada proyecto como una herramienta dentro de una pila, no como una plataforma de ganador‑todo.

| Technology | Layer | Mejor ajuste | Modelo UI | Transmisión / estado | Notas y ejemplos |
| --- | --- | --- | --- | --- | --- |
| [AG-UI](https://github.com/ag-ui-protocol/ag-ui) | Protocolo de runtime | Conectar backends de agentes a aplicaciones frontend | Eventos para mensajes, herramientas, estado, actividad, interrupciones | Sí; flujo de eventos más instantáneas/deltas de estado | Úsalo cuando necesites una tubería estándar agente‑app. Complementa MCP y A2A en lugar de reemplazarlos. |
| [A2UI](https://github.com/google/A2UI) | Protocolo UI declarativo | UI nativa generada por agente, multiplataforma | Payload JSON que describe componentes, modelo de datos y actualizaciones | Diseñado para actualizaciones incrementales | Opción sólida para agentes remotos y límites de confianza. Vista previa pública temprana, pero conceptualmente limpia. |
| [json-render](https://github.com/vercel-labs/json-render) | Catálogo y renderizador de componentes | Permitir que el modelo componga componentes aprobados | Árbol JSON restringido por un catálogo tipado | Soporta renderizado progresivo | Bueno para React, Vue, Svelte, Solid, React Native, email, PDF, Remotion, terminal y más. |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | Shell de producto y framework UI de agente | Copilotos dentro de la app, estado compartido, herramientas frontend, HITL | Renderizado de herramientas, AG-UI, A2UI, patrones MCP Apps | Sí | Una de las pilas más amplias para “construir apps nativas de agente”. Ver [ejemplos generative-ui](https://github.com/CopilotKit/generative-ui). |
| [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) | Demostración de generación UI abierta | Explicaciones visuales, diagramas, simulaciones, gráficos | El agente emite HTML / SVG / Canvas dentro de iframes aislados | Renderizado visual progresivo | Úsalo para artefactos dinámicos donde un catálogo fijo de componentes resulta demasiado restrictivo. |
| [MCP Apps / mcp-ui](https://github.com/MCP-UI-Org/mcp-ui) | Estándar de host/widget | Proveedores de herramientas que devuelven UI interactiva vía MCP | Recurso HTML enlazado desde metadatos de la herramienta | Puente de host y acciones de widget | Ideal cuando la UI pertenece a un proveedor de herramienta o necesita aislamiento en iframe. |
| [OpenAI Apps SDK](https://developers.openai.com/apps-sdk) | Integración de host de app ChatGPT | Construir widgets personalizados para apps ChatGPT | Herramientas de servidor MCP más componentes UI en iframe | Entrada/salida de herramienta, estado de widget, mensajes de seguimiento | Las nuevas apps ChatGPT deberían preferir los campos MCP Apps y el puente `ui/*`, con `window.openai` para compatibilidad/extensiones. |
| [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) | SDK de app y estado de chat | Chat de app personalizado, llamadas a herramientas, partes de mensaje en streaming | Renderiza resultados de herramientas como componentes React | Sí, vía `useChat` y flujos de mensajes UI | Excelente punto de partida si ya controlas la app y deseas mayor control de bajo nivel. Combínalo con [AI Elements](https://elements.ai-sdk.dev/) para primitivas UI. |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | Primitivas de chat React | UX de chat en producción con renderizado personalizado | Primitivas de chat composables, renderizado de llamadas a herramientas, JSON como componentes | Sí | Fuerte si necesitas ergonomía de chat pulida pero quieres usar tu propio backend. |
| [LangGraph Generative UI](https://docs.langchain.com/langgraph-platform/generative-ui-react) | Integración de plataforma de agente | Co‑ubicación de componentes UI con código de grafo | El grafo emite mensajes UI nombrados que renderiza componentes React | Sí, incluidos eventos de flujo personalizados | Encaje natural para despliegues de LangGraph y componentes UI propiedad del grafo. |
| [Hashbrown](https://github.com/liveloveapp/hashbrown) | Framework frontend GenUI | Apps React/Angular que exponen componentes y herramientas cliente | LLM selecciona y renderiza componentes de app permitidos | Soporta patrones de streaming | Bueno para incrustar inteligencia directamente en superficies de producto, no solo en chat. |
| [OpenUI](https://github.com/thesysdev/openui) | Lenguaje UI compacto y runtime | UI generada por modelo transmitible con menos tokens que JSON | Lenguaje OpenUI más runtime React y bibliotecas de componentes | Diseñado para streaming de tokens | Interesante cuando la verbosidad de JSON se vuelve un cuello de botella. Aún joven, pero vale la pena observar. |
| [Tambo](https://github.com/tambo-ai/tambo) | SDK React generative UI | Selección de componentes, componentes con estado, ejecución de herramientas cliente | IA selecciona componentes e interactúa con herramientas cliente | Orientado al estado | Opción OSS React popular enfocada en orquestación automática de componentes. |
| [llm-ui](https://llm-ui.com/) | Renderizador de salida | Salida de texto LLM más fluida con componentes inline personalizados | Analiza cadenas de salida del modelo a renderizado React | Renderizado suave de tokens | Útil para componentes ligeros personalizados dentro de flujos de texto; no es un protocolo UI completo de agente. |
| AI SDK RSC / React Server Components | Patrón/funcionalidad de framework antiguo | Streams de componentes renderizados en servidor en Next.js | Flujo modelo/herramienta devuelve UI renderizada en servidor | Sí, pero específico del framework | Desarrollo pausado en oct 2024 ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)); no es la ruta recomendada. Migra a `useObject` o json-render. |

## Qué usar para cada producto

Esta es la matriz de recomendación que realmente usaría con un equipo.

**Estás añadiendo un asistente a una app SaaS existente.**

Comienza con renderizado de herramienta a componente. Usa [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces), [assistant-ui](https://github.com/assistant-ui/assistant-ui) o [CopilotKit](https://github.com/CopilotKit/CopilotKit), según cuánto estado de agente e integración de herramientas frontend necesites. Mantén el catálogo pequeño al principio. Renderiza los componentes de producto que ya confías.

**Estás construyendo un copiloto serio dentro de la app que necesita estado compartido.**

Mira detenidamente CopilotKit junto con AG-UI. La característica importante no es el “chat”. Es el estado compartido y la interacción bidireccional: el agente puede solicitar entrada, renderizar UI, actualizar el estado y pausar para obtener aprobación.

**Tienes agentes remotos que necesitan enviar UI a través de una frontera.**

Utiliza A2UI o un protocolo declarativo similar a A2UI. El objetivo es que un agente remoto pueda describir la UI como datos mientras el host mantiene el control del renderizado nativo, la seguridad y el estilo. Si también necesitas interacción en tiempo real entre agente y aplicación, ejecútala sobre AG-UI o cualquier transporte que tu entorno estandarice.

**Estás construyendo dentro de ChatGPT o un host compatible con MCP.**

Usa la ruta de MCP Apps y el SDK de Apps. La documentación actual de OpenAI recomienda el puente `ui/*` de MCP Apps para trabajos nuevos, manteniendo `window.openai` como capa de compatibilidad y superficie de extensión opcional. Además, replica su división entre herramientas de datos y herramientas de renderizado: permite que el modelo recupere y razone sobre los datos antes de decidir renderizar un widget.

**Quieres paneles, informes o formularios en lenguaje natural dentro de tu propia aplicación.**

Intenta **json-render**, **Hashbrown** o **OpenUI**. La clave es el catálogo. Si expones `LineChart`, `DataTable`, `MetricGroup`, `FilterControl` e `InsightCallout`, el modelo puede ensamblar superficies de reporte útiles sin acercarse a código arbitrario.

**Quieres artefactos educativos, visuales o altamente personalizados.**

Usa un sandbox de propósito abierto como **OpenGenerativeUI**. Permite que el modelo genere SVG, Canvas, WebGL o HTML autocontenido, pero trata la salida como contenido de usuario no confiable. Aísla el sandbox, limita su tamaño, elimina permisos y mantenlo alejado del estado privilegiado de la aplicación.

**Principalmente necesitas markdown transmitido con mejor presentación y algunas facilidades en línea.**

No sobreconstruyas. Las herramientas de renderizado **llm-ui** o **assistant-ui** pueden ser suficientes.

## Los errores que evitaría

**Error 1: Permitir que el modelo escriba React de producción en tiempo de ejecución.**

Hay excepciones, pero para la UI de producto esto suele ser la opción equivocada. Generar código en tiempo de ejecución es difícil de asegurar, de probar, de tematizar y de mantener accesible. Si el modelo puede cumplir la tarea eligiendo entre componentes de confianza, hazlo así.

**Error 2: Exponer primitivas de diseño en lugar de primitivas de producto.**

Cuando le das al modelo `Row`, `Column`, `Text` y `Button`, le estás pidiendo que se convierta en tu sistema de diseño. Terminará siendo un sistema mediocre. Proporciónale sustantivos de producto de nivel superior.

**Error 3: Pensar que JSON válido equivale a UI segura.**

Una carga útil puede pasar la validación de esquema y seguir siendo manipuladora o peligrosa. La etiqueta puede decir "Ver factura" mientras la acción archiva la cuenta. Trata las especificaciones de UI como comportamiento, no como decoración. Necesitan pruebas de políticas, verificaciones semánticas y confirmación humana para acciones con consecuencias.

**Error 4: Colocar lógica de negocio en herramientas de renderizado.**

Las herramientas de renderizado deben renderizar. Las herramientas de datos deben obtener, calcular, mutar y validar. La documentación del SDK de Apps de OpenAI destaca esta separación por una razón: si cada herramienta de datos arrastra un widget consigo, el modelo pierde espacio para razonar antes de presentar.

**Error 5: Optimizar por novedad en lugar de completar la tarea.**

El objetivo no es convertir cada respuesta en una interfaz de copo de nieve. El objetivo es reducir la fricción. Un panel de aprobación estable y aburrido que ahorre al usuario cuatro minutos es mejor que un panel de control generado deslumbrante que no se pueda confiar ni una vez.

## Una arquitectura práctica

Si estuviera iniciando un nuevo producto hoy, adoptaría un enfoque por etapas:

1.  **Primero entrega una UI de herramienta controlada.** Mapea herramientas conocidas a componentes conocidos. Registra cada llamada a herramienta, renderizado de UI y acción de usuario.  
2.  **Añade un catálogo de dominio.** Cuando los patrones se repitan, expón `ComparisonTable`, `DecisionPanel`, `DataCollectionForm`, `Timeline` y otros componentes específicos del producto.  
3.  **Estandariza el transporte solo cuando sea necesario.** Si controlas tanto el frontend como el backend, el streaming simple puede ser suficiente. Si utilizas varios marcos de agentes, usa AG-UI. Si las herramientas cruzan los límites del producto, usa MCP. Si los agentes cruzan fronteras organizacionales, vigila A2A y A2UI.  
4.  **Utiliza widgets iframe para superficies externas o complejas.** Mapas, carritos, flujos de reserva y mini‑apps de terceros deben quedar detrás de una frontera.  
5.  **Reserva la generación abierta para artefactos.** Diagramas, simulaciones, explicaciones temporales y pizarras visuales encajan muy bien. Los flujos de trabajo centrales no.

La arquitectura termina luciendo así:

```txt
User intent
  -> agent runtime
  -> tool/data calls
  -> structured result
  -> UI decision
  -> trusted component, declarative spec, or sandboxed widget
  -> user action
  -> state/event stream back to the agent
```

Ese bucle es el producto real. El cuadro de chat es solo un dispositivo de entrada posible.

## La evaluación debe incluir la UI

Los equipos de LLM están aprendiendo lentamente a evaluar prompts y salidas del modelo. La UI generativa añade otra superficie: la propia interfaz puede estar equivocada.

Como mínimo, guarda estos artefactos para cada UI generada:

- contexto del prompt y de la herramienta  
- llamadas a la herramienta y resultados de la herramienta  
- especificación de UI generada o selección de componentes  
- nombre del componente renderizado y sus props  
- etiquetas visibles para el usuario  
- acciones adjuntas a botones/formularios  
- actualizaciones de estado visibles para el modelo provenientes de la UI  
- historial de acciones del usuario  

Luego redacta verificaciones como:

- toda acción destructiva debe contar con un componente de confirmación  
- las etiquetas de los botones deben coincidir con la semántica de la acción  
- las especificaciones de renderizado solo pueden referenciar componentes permitidos  
- los totales visibles para el usuario deben coincidir con los totales de los resultados de la herramienta  
- los formularios no pueden solicitar campos fuera del alcance de la tarea  
- los widgets no deben recibir secretos que solo el modelo necesitaba  
- los metadatos ocultos no deben contradecir las etiquetas visibles  

Suena tedioso. Es también donde se genera la confianza en producción.  

## Los enlaces con los que empezaría  

Si deseas pasar del artículo al código, estos son los mejores puntos de partida que encontré:

- [Repositorio AG-UI](https://github.com/ag-ui-protocol/ag-ui) y [documentación AG-UI](https://docs.ag-ui.com/introduction) para el modelo de eventos en tiempo de ejecución.  
- [Repositorio A2UI](https://github.com/google/A2UI) y [especificación A2UI](https://a2ui.org/specification/v0.9-a2ui/) para cargas declarativas agente‑a‑UI.  
- [Repositorio json-render](https://github.com/vercel-labs/json-render) y [documentación json-render](https://json-render.dev/) para generación de UI JSON basada en catálogos.  
- [Repositorio CopilotKit](https://github.com/CopilotKit/CopilotKit) y [ejemplos generative‑ui](https://github.com/CopilotKit/generative-ui) para los patrones AG-UI, A2UI, Open‑JSON‑UI y MCP Apps.  
- [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) para artefactos visuales sandboxed en HTML/SVG/Canvas.  
- [SDK MCP-UI / MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) para recursos UI sobre MCP.  
- [Documentación OpenAI Apps SDK](https://developers.openai.com/apps-sdk) y [ejemplos Apps SDK](https://github.com/openai/openai-apps-sdk-examples) para widgets de aplicaciones ChatGPT.  
- [Guía de UI generativa del Vercel AI SDK](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) y [AI Elements](https://elements.ai-sdk.dev/) para renderizado de chat/herramientas propio de la aplicación.  
- [assistant-ui](https://github.com/assistant-ui/assistant-ui) para primitivas de chat React composables.  
- [Documentación de UI generativa de LangGraph](https://docs.langchain.com/langgraph-platform/generative-ui-react) para componentes UI emitidos por grafos.  
- [Hashbrown](https://github.com/liveloveapp/hashbrown) para selección de componentes React/Angular y herramientas del lado del cliente.  
- [OpenUI](https://github.com/thesysdev/openui) para UI compacta, streaming‑first generada por modelo.  
- [Tambo](https://github.com/tambo-ai/tambo) para UI generativa React con componentes con estado.  
- [llm-ui](https://llm-ui.com/) para flujos de texto suaves con componentes en línea personalizados.  

## Una nota sobre la estabilidad del proyecto  

Cada protocolo importante en este espacio está en fase pre‑1.0. Última verificación 8 de mayo de 2026; planifique cambios y revise la documentación actual antes de apostar por una plataforma.  

**Vercel AI SDK RSC** — la característica original bajo el titular “Generative UI” — tuvo su desarrollo pausado en octubre 2024 ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)) debido a limitaciones arquitectónicas sin solución a corto plazo. **json-render** (Vercel Labs) surgió como la dirección de reemplazo: basada en catálogos, agnóstica de framework, sin acoplamiento a RSC. Parece haber captado rápidamente la atención de los desarrolladores web desde su lanzamiento a principios de 2026. La razón probable es la experiencia de desarrollo: json-render funciona de inmediato en un proyecto React estándar; el alcance multiplataforma de A2UI añade fricción de configuración.  

**A2UI** (Google) está en fase pre‑1.0 con cambios disruptivos entre versiones menores y comunicaciones de hoja de ruta inconsistentes. Su ventaja es el alcance real multiplataforma (web, Flutter, SwiftUI) que json-render no cubre. Para casos de uso puramente web hoy, json-render parece ofrecer mejor cobertura de herramientas; para escenarios multiplataforma o de agente remoto, el diseño de A2UI es más apropiado. La convergencia entre ambas especificaciones es posible — Vercel ha experimentado con salida compatible con A2UI desde json-render.  

**AG-UI** (CopilotKit) también está en fase pre‑1.0. La confusión más frecuente es el nombre: AG-UI es un protocolo de transporte, no un framework UI. Define *cómo* fluyen los eventos entre agente y frontend; lo que usted renderiza sigue siendo su decisión. El concepto es sólido y está ampliamente adoptado. La especificación sigue evolucionando.

## Mi opinión

La UI generativa no reemplazará a las interfaces de producto cuidadosamente diseñadas. Reemplazará la suposición perezosa de que una transcripción de chat es la interfaz universal para la IA.

Los mejores sistemas no permitirán que el modelo improvise todo. Le darán un conjunto pequeño y preciso de bloques de construcción nativos del producto; una conexión de tiempo de ejecución confiable; límites de seguridad claros; y la suficiente libertad para adaptar la interfaz a la tarea.

El futuro no es “el modelo escribe tu frontend”.

El futuro se parece más a: **tu frontend se convierte en un instrumento que el agente puede tocar, pero tú sigues decidiendo qué sonidos se le permite producir**.
````
