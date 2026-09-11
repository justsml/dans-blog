# Translation Candidate
- Slug: how-to-hire-an-ai-engineer-without-getting-burned
- Locale: es
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-09-09--how-to-hire-an-ai-engineer-without-getting-burned/es/index.mdx
- Validation: deferred
- Runtime seconds: 93.00
- Input tokens: 10165
- Output tokens: 11169
- Thinking tokens: unknown
- Cached input tokens: 4096
- Cache write tokens: 0
- Estimated cost: $0.003988
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Cómo contratar a un ingeniero de IA sin salir escaldado
subTitle: ''
modified: '2026-09-11'
tags:
  - ai
  - hiring
  - leadership
  - engineering-management
  - evals
  - production
  - security
  - agents
category: Leadership
subCategory: Hiring
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
cover_alt: >-
  Un puente de acero en miniatura que sostiene tres pesas naranjas, con una
  sonda de medición debajo de su vano.
related:
  - llm-evals-are-broken
  - dont-fear-the-model-router
  - evidence-is-the-product
---
La demo funciona. El currículum es impresionante. Todos salen de la entrevista emocionados.

Entonces alguien pregunta qué sucede si el sistema emite el mismo reembolso dos veces.

El silencio es una respuesta costosa.

La contratación de IA es difícil porque la parte visible del trabajo termina temprano. Una ventana de chat que responde en párrafos fluidos parece terminada. Nada de eso te dice si el sistema respeta los permisos, sobrevive a un tiempo de espera o cuesta más por ticket que el humano al que se suponía debía ayudar.

No necesitas ganar una discusión sobre cabezas de atención. Necesitas suficiente evidencia para decidir quién se hace cargo de esas decisiones en tu nombre.

<blockquote class="breakout">
  <p>Contrata por el criterio detrás de la demo. Haz que ese criterio sea observable antes de hacer la oferta.</p>
</blockquote>

Este es el proceso que yo aplicaría para un ingeniero que integra IA en un producto: redacta el resultado, abre una tarea real, paga por una sesión corta de trabajo y califica lo que realmente viste. Los roles de investigación e infraestructura necesitan ejercicios diferentes. Empieza por el puesto.

---

## Escribe el puesto antes de comprar el currículum

"Necesitamos un ingeniero de IA" es tan útil como "necesitamos a alguien bueno con el dinero". ¿Contador? ¿CFO? ¿La persona que le dice al fundador que deje de comprar dominios?

Elige el problema que vas a contratar a alguien para que se haga cargo.

| El trabajo que necesitas | Evidencia que buscar |
| --- | --- |
| Investigación o desarrollo de modelos | Experimentos, líneas base, elecciones de datos y un relato honesto de lo que no funcionó |
| Ingeniería de aplicaciones de IA | Un flujo de trabajo útil, integraciones, evaluación y manejo de fallos |
| Infraestructura de IA | Despliegue, capacidad, monitoreo, control de costos y recuperación bajo carga |
| Evaluación y calidad | Casos de prueba representativos, puntuación defendible y diagnóstico de regresiones |
| Ingeniería de producto de IA | Investigación de usuarios, diseño de flujo de trabajo, adopción y prueba de que la funcionalidad mejoró el puesto |

Una persona puede cubrir varias filas. Esperar la misma profundidad en las cinco es cómo una descripción de puesto se convierte en una lista de deseos con un salario adjunto.

Redacta el resultado de los primeros 90 días antes de abrir las entrevistas. Por ejemplo:

> Determinar si un asistente de redacción de soporte reduce el tiempo de gestión sin aumentar los errores de política. Entregar un piloto medido, una ruta de revisión humana y una recomendación para expandir, revisar o detener.

Eso le da al candidato algo en lo que contraargumentar, que es el punto. Uno fuerte preguntará cómo se mide el tiempo de gestión, quién es dueño de la política y si alguien ha verificado qué tan buenas son las respuestas humanas actuales. Uno débil dirá que suena emocionante.

Si nadie en tu equipo puede juzgar la evidencia técnica, trae a un profesional externo para la evaluación — y pregúntale si espera venderte la implementación después. De lo contrario, el candidato termina sirviendo como su propia referencia técnica, lo cual es un conflicto de intereses con una postura más ventajosa.

## Pídeles que abran el capó

Un empleador famoso te dice dónde trabajó alguien. Una demo te dice que algo funcionó una vez, en un portátil, de buen humor. Ninguna de las dos te dice qué puede llegar a asumir esta persona en tu equipo.

Pide un proyecto del que pueda hablar de principio a fin:

**«Explícame algo que hayas lanzado personalmente. ¿Qué controlabas, qué se rompió y qué cambió a partir de la evidencia?»**

Luego sigue una decisión a lo largo de todo su arco. ¿Cuál fue el primer enfoque? ¿Qué midieron? ¿Qué alternativa rechazaron y por qué? ¿Qué aportó un compañero de equipo? ¿Qué harían diferente ahora?

Pide un artefacto: un rastro sanitizado de una ejecución fallida, un informe de evaluación, un documento de diseño, una prueba, un breve recorrido de código. Un rastro no es más que el registro de lo que hizo el sistema en su camino hacia la respuesta: cada llamada a herramienta, cada reintento, cada absorción silenciosa. Es la diferencia entre leer el ensayo y ver el trabajo.

<p class="inset">
Un candidato que se niegue a entregar los datos de clientes de un antiguo empleador está pasando la prueba, no reprobándola.
</p>

Toma un ejemplo reconstruido, o utiliza el ejercicio compartido que aparece más abajo. «Muéstrame evidencia» nunca debe convertirse en «tráenos los secretos de otro».

Para una contratación de carrera temprana, la evidencia es más modesta y eso está bien. Escala el alcance y la supervisión esperados al puesto. Estás evaluando comprensión y responsabilidad, no acceso a logos famosos.

## Cinco preguntas que merecen el tiempo de la entrevista

Son indicaciones para investigar, no trivialidades. Si memorizar la respuesta basta para pasar, la pregunta no está haciendo nada.

### 1. «¿Cómo sabrías si este agente mejoró?»

Escucha que el éxito se defina en el lenguaje del puesto: tickets resueltos correctamente, borradores que un agente efectivamente envía, escalaciones que no debieron ocurrir. Luego pregunta qué fallos ocultaría una puntuación media, y con qué compararían la nueva versión.

Una buena respuesta hace que la medición sea inspeccionable. Pídeles que esbocen tres casos de prueba sobre la marcha y que digan quién decide si cada uno pasó. Si un modelo califica las respuestas, pregunta cómo verifican al calificador. [«Obtuvo un 94%» no es una medición si la misma ejecución da un 82% el martes.](../auto-tune-your-llm-judge)

La [guía de evaluaciones para agentes](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) de Anthropic traza la distinción que debe estar en tu entrevista: el registro de lo que hizo un agente no es lo mismo que el resultado. Que un agente informe «He emitido el reembolso» es una frase, no un reembolso.

### 2. «La herramienta agotó el tiempo de espera después de enviar un reembolso. ¿Y ahora qué?»

«Reintentar» es el reflejo equivocado. El dinero ya puede haberse ido.

Escucha que se verifique el estado de la transacción antes de actuar, una clave de idempotencia para que el segundo intento caiga sobre el primero, y una ruta de escalado para cuando el estado sea genuinamente desconocido. Pregunta quién ve el fallo y cómo se reanuda el trabajo después. El vocabulario importa menos que si su diseño puede cobrar a un cliente dos veces por un solo error.

### 3. «¿Qué puede leer, cambiar y gastar este sistema?»

Pregunta por el límite: qué registros puede leer, qué acciones puede ejecutar, dónde tiene que aprobar un humano y qué impide que un bucle consuma recursos toda la noche con tu tarjeta de crédito.

Luego pregunta dónde se aplica ese límite. Decirle al modelo «ten cuidado» es un cortafuegos hecho de texto de política: la intención está, la aplicación no. Pídeles que dibujen el límite y propongan una prueba que intente cruzarlo.

Aprovecha para incluir la exposición de datos: qué sale hacia el proveedor del modelo, qué se escribe en los logs y quién puede leer esos logs. «Lo registramos todo» es una conversación con cumplimiento normativo a la espera de ocurrir.

### 4. «¿Qué parte construirías sin un LLM?»

Una persona ingeniera competente puede quitar la IA de una parte de su propia propuesta. Las reglas de elegibilidad, la aritmética y las comprobaciones de permisos tienen implementaciones aburridas que nunca alucinan. Interpretar lo que quiso decir un cliente frustrado, no.

Pregunta qué te aporta el modelo en este flujo de trabajo concreto y qué evidencia justificaría la superficie de fallo adicional. Si cada caja del diagrama necesita un agente, pide un diagrama más pequeño.

### 5. «Cuéntame sobre un enfoque que abandonaste.»

Escucha la observación que les hizo cambiar de opinión. Los usuarios querían búsqueda, no chat. El modelo más caro redujo el coste total de gestión. La funcionalidad no merecía la pena publicarla y lo dijeron.

Un resultado negativo sincero vale más que una historia de éxito pulida, porque una historia de éxito rara vez revela una regla de decisión. Pregunta qué dejaron de hacer y cuánto tardaron en dejarlo.

## Paga por una pequeña sesión de trabajo

Usa un ejercicio acotado y remunerado con datos sintéticos. Entrega el encargo y los criterios de puntuación con antelación — estás contratando criterio, no la capacidad de sorprender a alguien. Deja que la gente use las herramientas que usaría en el trabajo, incluida la IA, y después pídeles que expliquen y verifiquen lo que haya salido.

Una sesión ilustrativa de 90 minutos para una persona ingeniera de aplicaciones:

> Heredas un asistente de soporte que redacta respuestas y propone reembolsos. Aquí tienes doce tickets sintéticos, un documento breve de políticas y cuatro ejecuciones registradas. Una respuesta cita una política que retiramos en marzo. Una solicitud de reembolso expira por tiempo de espera. Un ticket pide información de otro cliente. Recomienda si ampliamos el piloto y muéstrame una pequeña mejora o prueba.

Quince minutos para aclarar el objetivo, cuarenta y cinco para profundizar, treinta para explicar la recomendación. Entrega un entorno preparado para que el ejercicio no sea en realidad una prueba de `npm install`. Acomoda las necesidades de accesibilidad y mantén condiciones equivalentes entre candidatos.

Estás observando qué preguntas hacen, qué pruebas abren y a qué riesgo acuden primero. ¿Se dan cuenta de que doce tickets no pueden establecer fiabilidad? ¿Pueden enviar una corrección concreta sin afirmar que el sistema ya está bien? ¿Pueden decir qué debería pasar la semana que viene?

Quien añade una prueba que falla para el reembolso duplicado quizá te ha contado más que quien envió una preciosa interfaz de chat.

Usa las mismas preguntas clave y los mismos criterios de valoración para todo el mundo en el puesto — esa es la estructura básica detrás de la [guía de entrevistas estructuradas](https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/) de la Oficina de Gestión de Personal de EE. UU., y existe para que tu panel compare candidatos, no sensaciones. Mantén el ejercicio cerca del trabajo real. La línea entre una muestra de trabajo y consultoría gratuita es más fina de lo que la mayoría de las personas que contratan creen, y los candidatos la ven desde lejos.

## La ficha de evaluación de contratación

Copia esto en el documento de la entrevista. Acuerden el nivel requerido para cada dimensión **antes** de conocer a alguien, porque la barra se mueve en cuanto alguien te cae bien. Cada entrevistador puntúa de forma independiente antes de la reunión y adjunta una observación concreta a cada calificación.

Usa **1 = sin sustento o con fallos graves**, **2 = viable con orientación sustancial**, **3 = sólido dentro del alcance del rol**, **4 = juicio sólido más verificación demostrada**. Usa **N/O = no observado** cuando la entrevista nunca produjo evidencia. N/O es una brecha que hay que llenar, no un cero que promediar.

| Dimensión | Evidencia que merece un 3 | Puntaje / evidencia observada |
| --- | --- | --- |
| Juicio técnico | Elige un diseño proporcionado y explica una alternativa rechazada | ___ / ___ |
| Juicio de producto | Define un resultado de usuario, una línea base y una razón para detenerse | ___ / ___ |
| Evaluación | Propone casos representativos y verifica resultados, no solo respuestas fluidas | ___ / ___ |
| Disciplina de producción | Maneja fallos parciales, recuperación, monitoreo, costo y latencia | ___ / ___ |
| Seguridad | Identifica datos sensibles y explica límites de acceso y gasto exigibles | ___ / ___ |
| Comunicación | Expresa la incertidumbre con claridad y explica la consecuencia a quien toma decisiones | ___ / ___ |
| Responsabilidad | Separa su trabajo del del equipo y sigue los fallos hasta su resolución | ___ / ___ |

Esto es una ayuda para la decisión, no un predictor validado de rendimiento laboral. Ajústalo a tu rol y compáralo con lo que realmente sucede después de que la gente se incorpora; de lo contrario, estarás ajustando un juez al que nunca calificaste.

Para alguien que será el único dueño de la producción, quiero evidencia sólida en cada dimensión esencial. Un total alto nunca debería ocultar una debilidad no resuelta en permisos o recuperación; esos son los dos que te pasarán factura más adelante. Para un ingeniero en desarrollo, anota el apoyo que necesitará y el nombre de la persona que lo proporciona.

Cierra la reunión con tres frases: **¿Qué puede poseer esta persona? ¿Qué apoyo necesitará? ¿De qué no estamos seguros aún?** Un panel que no pueda responderlas está a punto de tener una conversación de cuarenta minutos sobre presencia ejecutiva.

## Las banderas rojas merecen una pregunta más

Ten cuidado cuando un candidato no separa su contribución de la del equipo, trata cada proyecto pasado como un éxito ininterrumpido, o responde preguntas de medición con adjetivos. «Altamente preciso» necesita un denominador.

Otras señales de humo: los agentes aparecen en el diseño antes de entender el problema; el costo operativo no tiene techo; la recuperación de fallos pertenece a otro equipo; la seguridad vive enteramente en el _prompt_.

Indaga una vez con un escenario concreto antes de concluir algo. Un término desconocido no es un concepto ausente, y muchos ingenieros sólidos aprendieron las ideas bajo nombres diferentes. Reconoce cuando alguien detecta su propio error a mitad de respuesta. Negarse a actualizar después de ver evidencia contradictoria es la jugada descalificante; necesitar un momento de silencio para pensar no lo es.

## ¿Ya te preocupa la contratación? Audita primero el trabajo

Un proyecto de IA con dificultades no demuestra que contrataste al ingeniero equivocado. El _briefing_ pudo haber sido imposible, los datos inservibles, o la dirección pudo haber prometido autonomía total en una _keynote_ antes de que nadie midiera la calidad.

Antes de encargar una reescritura, conserva el código, la configuración, los resultados de evaluación y los registros relevantes bajo controles de acceso adecuados. Luego establece qué cuentas, servicios y claves API controla realmente la empresa; aquí es donde los equipos descubren que todo el _pipeline_ funciona con la cuenta de facturación personal de una persona.

Obtén una lectura independiente de algunos flujos de trabajo representativos. ¿Qué funciona? ¿Qué falla? ¿Qué afirmaciones se reproducen? Restringe las acciones riesgosas mientras se investiga el comportamiento incierto, y clasifica el trabajo en mantener, reparar y reemplazar.

Pide un plan de recuperación breve con pruebas de aceptación, dueños designados y una fecha de decisión. «Necesitamos un nuevo _framework_» es una propuesta para examinar, no un diagnóstico.

## Dale permiso a la nueva contratación para decepcionar la hoja de ruta

Nada de esto funciona si tu empresa castiga el juicio que acaba de pasar seis semanas seleccionando.

El ingeniero que dice «la aprobación humana permanece en este paso» o «el piloto aún no justifica la expansión» necesita un líder que pueda escucharlo frente a otras personas. Contrata por evidencia y luego entierra los hallazgos inconvenientes, y habrás construido una máquina cara para producir las respuestas que ya querías.

Así que para el próximo rol en IA: escribe el resultado, usa la lista de criterios y observa al candidato examinar algo imperfecto.

Quieres a la persona que pueda mostrarte por qué el sistema está listo — y que te lo dirá, en voz alta, el día que no lo esté.
````
