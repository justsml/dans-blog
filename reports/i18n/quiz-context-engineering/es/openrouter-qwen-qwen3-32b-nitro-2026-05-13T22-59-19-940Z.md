# Translation Candidate
- Slug: quiz-context-engineering
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-09--quiz-context-engineering/es/index.mdx
- Validation: deferred
- Runtime seconds: 46.61
- Input tokens: 14091
- Output tokens: 18692
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.005613
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Cuestionario: 14 preguntas sobre ingeniería de contexto'
subTitle: >-
  La ingeniería de prompts es lo que haces. La ingeniería de contexto es lo que
  entregas.
date: '2026-05-09'
modified: '2026-05-09'
tags:
  - quiz
  - ai
  - llm
  - context-engineering
  - prompts
  - rag
  - tokens
  - advanced
category: Quiz
subCategory: AI
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.85
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">El ingeniería de prompts obtiene los eslóganes. La ingeniería de contexto obtiene la alerta. ¿Qué tan bien conoces la parte del sistema de IA que realmente se implementa en producción?</p>

Este cuestionario aborda ventanas de contexto, presupuestos de tokens, recuperación de información, estructura de prompts y los modos de fallo que convierten demostraciones limpias en productos confusos. Empieza suave. No se queda ahí.

Trae pruebas.

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Fundamentos"
  title="Fundamentos de la Ventana de Contexto"
  options={[
    {text: 'El número máximo de solicitudes por minuto'},
    {text: 'El límite combinado de tokens para entrada y salida', isAnswer: true},
    {text: 'El número de mensajes en una conversación'},
    {text: 'La memoria disponible entre sesiones'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿A qué se refiere la 'ventana de contexto' en un LLM?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La ventana de contexto es el número total de tokens que un modelo puede procesar en una única llamada — **entrada + salida combinadas**. Una ventana de contexto de 128K significa que tu prompt + documentos recuperados + historial de conversación + la respuesta del modelo deben caber todos dentro de 128,000 tokens.

    No tiene nada que ver con sesiones, memoria o límites de velocidad. Cuando alcanzas el límite, el modelo o bien trunca, genera un error o — peor aún — elimina silenciosamente tokens que no esperabas.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Fundamentos"
  title="Estimación de tokens"
  options={[
    {text: 'Aproximadamente 50 tokens'},
    {text: 'Aproximadamente 130 tokens', isAnswer: true},
    {text: 'Aproximadamente 300 tokens'},
    {text: 'Aproximadamente 1.000 tokens'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Aproximadamente cuántos tokens utiliza un párrafo de 100 palabras en inglés con un tokenizador moderno común?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La regla general es **~1,3 tokens por palabra** para textos típicos en inglés. Un párrafo de 100 palabras ≈ 130 tokens.

    Esto varía significativamente según el tipo de contenido:
    - Código: ~1,5–2 tokens/palabra (caracteres especiales, espacios en blanco)
    - Documentos técnicos con muchos identificadores: puede ser mayor
    - Palabras comunes en inglés: a menudo 1 token cada una
    - Palabras raras, nombres, textos no ingleses: a menudo 2–4 tokens cada una

    La biblioteca `tiktoken` te da conteos exactos. Siempre mide antes de asumir.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Fundamentos"
  title="Rol del Prompt del Sistema"
  options={[
    {text: 'Es procesado primero y tiene mayor peso que los mensajes del usuario', isAnswer: true},
    {text: 'Es idéntico a un mensaje del usuario pero mostrado de manera diferente'},
    {text: 'Se usa solo para llamadas API, no para interfaces de chat'},
    {text: 'Permanece en sesiones como memoria a largo plazo'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el efecto práctico de usar el rol `system` frente al rol `user` en el array de mensajes?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El rol `system` se procesa como instrucciones de mayor prioridad. Los modelos se entrenan para darle más peso que a los mensajes del usuario: es el límite arquitectónico entre lo que el desarrollador dijo y lo que el usuario dijo.

    No es mágico. No garantiza que el modelo ignore instrucciones contradictorias del usuario (véase: inyección de prompt). Pero aumenta significativamente la tendencia del modelo a seguir tus instrucciones, especialmente en modelos con fuerte seguimiento de instrucciones.

    En la práctica: coloca tu personalidad, reglas y restricciones de comportamiento en `system`. Coloca el contexto recuperado y datos del usuario en `user`. Nunca coloques entradas controladas por el usuario en `system`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Recuperación"
  title="Perdido en el medio"
  options={[
    {text: 'Los modelos realizan igual de bien independientemente de dónde se coloque el contexto'},
    {text: 'Los modelos realizan mejor cuando el contexto está al final'},
    {text: 'Los modelos realizan mejor cuando el contexto está al inicio y al final, peor en el medio', isAnswer: true},
    {text: 'Los modelos realizan mejor cuando el contexto está en el medio del prompt'},
  ]}
>
  <slot name="question">
  <div className="question">
    La investigación sobre el problema 'Perdido en el medio' muestra que los LLM tienden a:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El [artículo 'Perdido en el medio' (Liu et al., 2023)](https://arxiv.org/abs/2307.03172) demostró que los LLM tienen dificultades consistentes con la información colocada en el medio de contextos largos. El rendimiento es significativamente mayor cuando la información relevante aparece al **inicio o final** de la ventana de contexto.

    Implicación práctica: cuando insertes fragmentos recuperados en un prompt de RAG, no los agregues solo por orden de relevancia. Coloca el resultado más relevante primero, el segundo más relevante al final y rellena el medio con material menos relevante. Contraintuitivo, pero mediblemente mejor.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Recuperación"
  title="Estrategia de segmentación"
  options={[
    {text: 'Usar el tamaño de segmento más grande que permita su ventana de contexto'},
    {text: 'Siempre usar 512 tokens — es'},
    {text: 'Usar segmentos superpuestos cuyo tamaño coincida con la estructura de su contenido', isAnswer: true},
    {text: 'El tamaño del segmento no'},
  ]}
>
  <slot name="question">
  <div className="question">
    Al segmentar documentos para RAG, ¿cuál es el principio más importante?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    No existe un tamaño de segmento universalmente correcto — depende de su contenido. Los principios importantes son:

    1. **Coincidir con la estructura de su contenido.** Las páginas de preguntas frecuentes se segmentan bien al nivel de pregunta+respuesta. Los documentos legales se segmentan bien al nivel de cláusula. El código se segmenta bien al nivel de función.
    2. **Usar superposición.** Un segmento de 512 tokens con 64 tokens de superposición en cada lado significa que las respuestas que cruzan un límite aún se recuperan.
    3. **Medir.** Construya un conjunto de evaluación y pruebe varios tamaños de segmento. El tamaño del segmento importa más que el modelo de incrustación.

    "512 tokens" es un punto de partida razonable, no una regla.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Recuperación"
  title="Búsqueda híbrida"
  options={[
    {text: 'Ejecutar la misma consulta dos veces para redundancia'},
    {text: 'Usar dos modelos de embeddings diferentes en el mismo corpus'},
    {text: 'Combinar búsqueda de vectores con búsqueda de palabras clave para una mejor recuperación', isAnswer: true},
    {text: 'Buscar simultáneamente en múltiples bases de datos de vectores'},
  ]}
>
  <slot name="question">
  <div className="question">
    En sistemas RAG, "búsqueda híbrida" se refiere a:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La búsqueda híbrida combina **búsqueda de vectores** (similitud semántica mediante embeddings) y **búsqueda de palabras clave** (BM25 / búsqueda de texto completo) porque fallan de manera complementaria:

    - La búsqueda de vectores tiene dificultades con términos exactos: nombres de productos, códigos de error, números de modelo, identificadores técnicos
    - La búsqueda de palabras clave tiene dificultades con paráfrasis: "¿cómo cancelo?" vs. "finalizar suscripción"

    Los resultados de ambos se fusionan usando **Reciprocal Rank Fusion (RRF)** — un algoritmo de clasificación que combina posiciones de múltiples listas clasificadas sin necesidad de puntuaciones normalizadas.

    Ambos están disponibles en Postgres con `pgvector` + `tsvector`. Es posible que no necesites un servicio de búsqueda separado.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Gestión de tokens"
  title="Presupuesto de contexto"
  options={[
    {text: 'Usar el 95%+ del espacio de contexto para maximizar la información'},
    {text: 'Reservar espacio significativo para la salida en lugar de llenar todo el espacio', isAnswer: true},
    {text: 'El presupuesto de contexto solo importa para modelos de menos de 32K tokens'},
    {text: 'El modelo trunca automáticamente cuando se excede el espacio'},
  ]}
>
  <slot name="question">
  <div className="question">
    Al construir un prompt de RAG con contexto recuperado, una regla general para el presupuesto de contexto es:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El espacio de contexto se comparte entre **entrada y salida**. Si usas el 90% para la entrada, el modelo solo tiene un 10% del espacio restante para generar una respuesta — lo que a menudo causa salidas truncadas o degradadas.

    Una heurística razonable: decide primero el tamaño esperado de la salida, luego mantén la entrada cómodamente por debajo del presupuesto restante. Para muchas tareas de RAG, eso significa usar no más del **60–70% del total del espacio de contexto para entrada** (prompt del sistema + historial + contexto recuperado). Deja el resto para la generación y un margen de seguridad.

    Además, los modelos funcionan peor cerca de los bordes de su espacio de contexto — la comprensión y el seguimiento de instrucciones se degradan a medida que el contexto se llena. Ejecutar a un 95% es técnicamente posible. No es la misma experiencia que ejecutar a un 50%.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Gestión de tokens"
  title="Gestión del historial de conversación"
  options={[
    {text: 'Siempre enviar el historial completo de la conversación'},
    {text: 'Resumir mensajes antiguos cuando el historial exceda un presupuesto de tokens', isAnswer: true},
    {text: 'Eliminar mensajes antiguos — el modelo tiene memoria persistente'},
    {text: 'Almacenar el historial en una base de datos vectorial y recuperar los turnos relevantes'},
  ]}
>
  <slot name="question">
  <div className="question">
    En una aplicación de chat con múltiples turnos, ¿cuál es la estrategia correcta cuando el historial de conversación se vuelve largo?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los LLM no tienen memoria persistente. Cada llamada a la API es sin estado — envías el contexto completo y recibes una respuesta. La "memoria" de una conversación es únicamente el historial de mensajes que incluyes en cada solicitud.

    Cuando ese historial excede tu presupuesto, las opciones son:
    1. **Resumir**: Comprimir los turnos antiguos en un resumen acumulativo, mantener los recientes sin modificar
    2. **Ventana deslizante**: Mantener los últimos N turnos, eliminar los anteriores
    3. **Selección de recuperación**: Embeber los turnos de conversación y recuperar los relevantes por consulta (más complejo pero poderoso)

    La truncación simple — cortar mensajes antiguos para ajustar — es la peor opción porque elimina silenciosamente contexto que el modelo podría necesitar.

    La recuperación de historial de conversación mediante base de datos vectorial es teóricamente atractiva pero suele ser excesiva para la mayoría de las aplicaciones de chat. El resumen es la opción pragmática por defecto.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Estructura de Prompts"
  title="Ejemplos de pocos ejemplos"
  options={[
    {text: 'Más ejemplos siempre producen mejores resultados'},
    {text: '3–5 ejemplos de alta calidad y diversos en el prompt', isAnswer: true},
    {text: 'Los ejemplos de pocos ejemplos solo ayudan en tareas de clasificación'},
    {text: 'Los ejemplos deben ir después de la consulta del usuario, no antes'},
  ]}
>
  <slot name="question">
  <div className="question">
    Para la mayoría de los casos de uso en producción, la estrategia óptima de ejemplos de pocos ejemplos es:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los ejemplos de pocos ejemplos mejoran drásticamente la consistencia de la salida y el cumplimiento del formato. El punto óptimo para la mayoría de las tareas es **3–5 ejemplos de alta calidad y diversos**.

    ¿Por qué no más? Cada ejemplo cuesta tokens. Más allá de 5–10 ejemplos, el beneficio marginal disminuye mientras que el costo de tokens sigue aumentando. Más ejemplos también aumentan la probabilidad de que el modelo se ajuste en exceso a los ejemplos en lugar de entender el patrón subyacente.

    ¿Por qué importa la diversidad?: si todos tus ejemplos son del mismo tipo de entrada, el modelo no generalizará bien a los casos extremos. Incluye ejemplos que cubran tus variaciones más importantes.

    Ubicación: los ejemplos van *antes* de la consulta del usuario, como parte del sistema prompt o como conversaciones prefijadas — no después.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Estructura de Prompts"
  title="Etiquetas XML para la Estructura"
  options={[
    {text: 'Las etiquetas XML son válidas solo en modelos de Anthropic'},
    {text: 'Las etiquetas XML ayudan a los modelos a distinguir instrucciones de datos y mejorar la precisión del análisis', isAnswer: true},
    {text: 'Las etiquetas XML ralentizan la tokenización y deben evitarse'},
    {text: 'Las etiquetas XML son equivalentes a encabezados de markdown'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Por qué muchos prompts de producción usan etiquetas estilo XML como `<document>`, `<context>`, `<instructions>`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las etiquetas estilo XML proporcionan **límites estructurales explícitos** que los modelos están entrenados para reconocer y respetar. Hacen dos cosas:

    1. **Separación**: Señalan al modelo dónde terminan las instrucciones y comienza los datos — crítico para RAG y para reducir el riesgo de inyección de prompts desde documentos recuperados.
    2. **Parseabilidad**: Cuando pides al modelo que responda en XML (ej. `<answer>...</answer>`), las etiquetas te dan puntos de extracción limpios sin necesidad de trucos con expresiones regulares.

    Esto no es XML como lenguaje de marcado. Es XML como convención de delimitadores que los modelos entrenaron. Funciona porque el modelo ha visto este patrón extensamente en su entrenamiento, no porque esté validando esquemas.

    Funciona en la mayoría de modelos ajustados para instrucciones con suficiente frecuencia como para ser útil — es una convención del conjunto de datos de entrenamiento, no una característica del proveedor ni una garantía de seguridad.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Avanzado"
  title="Temperatura y determinismo"
  options={[
    {text: 'temperature=0 siempre produce salidas idénticas para la misma entrada'},
    {text: 'temperature=0 hace que las salidas sean más deterministas pero no garantizan identidad', isAnswer: true},
    {text: 'temperature=0 desactiva el modelo'},
    {text: 'temperature solo afecta la longitud de la respuesta'},
  ]}
>
  <slot name="question">
  <div className="question">
    Establecer `temperature=0` en su llamada a LLM significa:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `temperature=0` hace que el modelo elija el token de mayor probabilidad en cada paso (decodificación codiciosa), lo que produce salidas **más consistentes** — pero no garantiza salidas idénticas.

    Fuentes de variación con temperatura=0:
    - **No determinismo de punto flotante** en cálculos de GPU, especialmente entre diferentes hardware o tamaños de lote
    - **Cambios en la infraestructura del servidor** (actualizaciones del modelo, infraestructura de servir)
    - **Salidas largas** acumulan variaciones pequeñas

    Para suites de pruebas y evaluaciones que requieren determinismo estricto, `temperature=0` es la elección correcta — solo no escriba afirmaciones que dependan de salidas idénticas a nivel de byte. Asegúrese de la estructura, contenido clave y comportamiento, no de cadenas exactas.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Avanzado"
  title="Caché de Prompts"
  options={[
    {text: 'El caché almacena respuestas y las reproduce para consultas idénticas'},
    {text: 'El caché almacena pares KV compilados para prefijos de prompts estáticos, reduciendo el costo de tokens de entrada', isAnswer: true},
    {text: 'El caché solo está disponible en modelos de OpenAI'},
    {text: 'El caché es automático y no requiere configuración por parte del desarrollador'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué es el "caché de prompts" en el contexto de las APIs de LLM (Anthropic, OpenAI)?
    <p className="text-sm">Última verificación: 8 de mayo de 2026. Los controles y precios de caché de los proveedores cambian rápidamente.</p>
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El caché de prompts reutiliza el **KV cache / estado de prefijo de prompt** para prefijos de prompts estáticos cuando tu proveedor lo soporta. En solicitudes posteriores con el mismo prefijo, el modelo puede omitir re-procesar esos tokens, lo que reduce la latencia y puede disminuir drásticamente el costo.

    Esto no es caché de respuestas. El modelo genera una respuesta fresca cada vez. Solo evitas re-tokenizar y re-calcular la atención para la parte del prompt que no cambia.

    Mejor usado para: prompts de sistema grandes, documentos estáticos, definiciones de herramientas, ejemplos few-shot — cualquier cosa que sea la misma en muchas solicitudes. El prefijo caché debe estar al *inicio* de tu prompt.

    No es lo mismo que: deduplicación semántica, memoización de respuestas o caché en la capa de aplicación.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Avanzado"
  title="Anclaje vs. Alucinación"
  options={[
    {text: 'Indicar al modelo "no alucines" en el prompt del sistema'},
    {text: 'Usar una temperatura más alta para generar respuestas más seguras'},
    {text: 'Proporcionar documentos de origen recuperados e indicar al modelo que los cite', isAnswer: true},
    {text: 'Usar un modelo más grande: la alucinación solo ocurre en modelos más pequeños'},
  ]}
>
  <slot name="question">
  <div className="question">
    La técnica más efectiva para reducir la alucinación en un sistema de IA de producción es:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Indicarle al modelo que no alucine no detiene las alucinaciones — el modelo no tiene una señal introspectiva confiable para "estoy inventando esto". Solo significa que el modelo te dirá con confianza que no está inventando cosas mientras las inventa.

    Lo que realmente funciona: **anclaje**. Proporciona al modelo la información que necesita para responder correctamente y restringe su uso a esa información:
    ```
        Answer only using the provided documents.
        If the answer isn't in the documents, say: "I don't have enough information to answer that."
    ```
    Luego valida la salida: verifica que las afirmaciones en la respuesta aparezcan en el contexto recuperado. Esta es la comprobación de anclaje mediante citación — consulta la discusión sobre evaluación de RAG para implementación.

    Los modelos más grandes alucinan menos en promedio, pero todos los modelos alucinan. El anclaje es la estrategia de mitigación, no el tamaño del modelo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Experto"
  title="Ingeniería de contexto vs. Ajuste fino"
  options={[
    {text: 'El ajuste fino es siempre mejor — la ingeniería de contexto es un atajo'},
    {text: 'La ingeniería de contexto es gratuita; el ajuste fino es costoso; siempre usa ingeniería de contexto'},
    {text: 'La ingeniería de contexto cambia el comportamiento por solicitud; el ajuste fino cambia los pesos del modelo permanentemente', isAnswer: true},
    {text: 'Son nombres diferentes para la misma técnica'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la distinción clave entre la ingeniería de contexto y el ajuste fino, y cuándo tiene sentido realmente el ajuste fino?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **Ingeniería de contexto** moldea el comportamiento del modelo a través del prompt — instrucciones del sistema, ejemplos de pocos pasos, contexto recuperado. Es por solicitud, reversible y no requiere entrenamiento.

    **Ajuste fino** actualiza los pesos del modelo con tus datos. Los cambios son permanentes (para ese checkpoint) y se aplican a cada inferencia.

    El ajuste fino es genuinamente mejor cuando:
    - Necesitas un estilo/formato coherente que el modelo no pueda seguir de manera confiable solo con instrucciones
    - Tu tarea requiere comportamiento repetible en patrones específicos del dominio que no resuelven los prompts ni la recuperación
    - Debes reducir la longitud del prompt — el comportamiento ajustado no necesita explicarse en cada solicitud
    - Estás ejecutando muchas solicitudes donde los ejemplos de pocos pasos consumen tokens significativos

    El ajuste fino es excesivo cuando:
    - Tus instrucciones caben en un prompt del sistema
    - Principalmente necesitas hechos actuales o propietarios que puedan recuperarse en tiempo de solicitud
    - Los requisitos cambian frecuentemente (deberías re-ajustar)
    - No has agotado la ingeniería de contexto primero

    El orden correcto: domina la ingeniería de contexto primero. Ajusta fino cuando se demuestre que no es suficiente.
  </div>
  </slot>
</Challenge>

</QuizUI>

¿Cómo te fue?  

- **13–14**: Estás construyendo sistemas de IA para producción, no solo demostrándolos. Raro.  
- **9–12**: Practicante sólido. Conoces las herramientas; los bordes aún son borrosos.  
- **5–8**: Has usado LLMs mucho pero no has pensado profundamente sobre gestión de contexto. Aprende sobre almacenamiento en caché de prompts e búsqueda híbrida: cambiarán cómo piensas sobre los costos.  
- **0–4**: Buena noticia: todo en este cuestionario es aprendible y práctico de inmediato. Solo la pregunta sobre "perdido en el medio" vale la pena entender antes de tu próxima implementación de RAG.  

La ingeniería de contexto es la disciplina de ser intencional sobre qué información pones en la ventana, dónde la pones y cómo la estructuras. El modelo es la parte menos controlable de tu sistema. Todo lo demás es tuyo.
````
