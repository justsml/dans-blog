# Translation Candidate
- Slug: how-to-hire-an-ai-engineer-without-getting-burned
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-09-09--how-to-hire-an-ai-engineer-without-getting-burned/es/index.mdx
- Validation: deferred
- Runtime seconds: 3.18
- Input tokens: 10572
- Output tokens: 3795
- Thinking tokens: unknown
- Cached input tokens: 1280
- Cache write tokens: 0
- Estimated cost: $0.001095
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Cómo contratar a un ingeniero de IA sin quemarse
subTitle: Contrata por el juicio que sigue apareciendo
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
  Puente de acero en miniatura que sostiene tres pesos naranjas, con una sonda
  de medida bajo su vano.
related:
  - llm-evals-are-broken
  - dont-fear-the-model-router
  - evidence-is-the-product
---
La demo funciona. El currículum es impresionante. Todos salen de la entrevista entusiasmados.

Luego alguien pregunta qué ocurre si el sistema emite el mismo reembolso dos veces.

El silencio es una respuesta costosa.

Contratar a un ingeniero de IA es difícil porque la parte visible del trabajo termina temprano. Una ventana de chat que responde en párrafos fluidos parece terminada. Nada de eso indica si el sistema respeta los permisos, sobrevive a un tiempo de espera o cuesta más por ticket que el humano al que se suponía ayudaría.

No necesitas ganar una discusión sobre cabezas de atención. Necesitas suficiente evidencia para decidir quién tomará esas decisiones en tu nombre.

<blockquote class="breakout">
  <p>Contrata por el juicio detrás de la demo. Haz que ese juicio sea observable antes de hacer la oferta.</p>
</blockquote>

Este es el proceso que aplicaría para un ingeniero que lleva IA a un producto: escribe el resultado esperado, abre una pieza de trabajo real, paga una breve sesión de trabajo y evalúa lo que realmente viste. Los roles de investigación e infraestructura requieren ejercicios diferentes. Empieza con el puesto.

---

## Define el puesto antes de comprar el currículum

«Necesitamos un ingeniero de IA» es tan útil como «necesitamos a alguien bueno con el dinero». ¿Contador? ¿CFO? ¿La persona que le dice al fundador que deje de comprar dominios?

Elige el problema que deseas que la persona asuma.

| Trabajo que necesitas | Evidencia a buscar |
| --- | --- |
| Investigación o desarrollo de modelos | Experimentos, líneas base, decisiones de datos y una descripción honesta de lo que no funcionó |
| Ingeniería de aplicaciones de IA | Un flujo de trabajo útil, integraciones, evaluación y manejo de fallos |
| Infraestructura de IA | Despliegue, capacidad, monitoreo, control de costos y recuperación bajo carga |
| Evaluación y calidad | Casos de prueba representativos, puntuación defendible y diagnóstico de regresiones |
| Ingeniería de producto de IA | Investigación de usuarios, diseño de flujos, adopción y prueba de que la funcionalidad mejoró el trabajo |

Una persona puede cubrir varias filas. Esperar la misma profundidad en los cinco ámbitos es cómo una descripción de puesto se convierte en una lista de deseos con un salario adjunto.

Escribe el resultado de los primeros 90 días antes de abrir las entrevistas. Por ejemplo:

> Determinar si un asistente de redacción de soporte reduce el tiempo de gestión sin aumentar los errores de política. Entregar un piloto medido, una ruta de revisión humana y una recomendación para expandir, revisar o detener.

Eso le da al candidato algo contra lo que reaccionar, que es el objetivo. Uno fuerte preguntará cómo se mide el tiempo de gestión, quién es responsable de la política y si alguien ha verificado la calidad de las respuestas humanas actuales. Uno débil dirá que suena emocionante.

Si nadie en tu equipo puede juzgar la evidencia técnica, trae a un profesional externo para la evaluación — y pregunta si espera venderte la implementación después. De lo contrario, el candidato termina sirviéndose como su propia referencia técnica, lo que genera un conflicto de intereses con una postura más adecuada.

## Pídeles que levanten el capó

Una empresa famosa te dice dónde trabajó alguien. Una demo te muestra que algo funcionó una vez, en una laptop, de buen humor. Ninguna de las dos te indica qué puede asumir esa persona en tu equipo.

Pide un proyecto del que pueda hablar de extremo a extremo:

**"Cuéntame algo que hayas enviado tú mismo. ¿Qué fue tu responsabilidad, qué falló y qué cambió a raíz de la evidencia?"**

Luego sigue una decisión a lo largo de todo el arco. ¿Cuál fue el primer enfoque? ¿Qué midieron? ¿Qué alternativa descartaron y por qué? ¿Qué aportó un compañero? ¿Qué harían diferente ahora?

Solicita un artefacto: una traza saneada de una ejecución fallida, un informe de evaluación, un documento de diseño, una prueba, una breve revisión de código. Una traza es simplemente el registro de lo que el sistema hizo en el camino hacia su respuesta — cada llamada a herramienta, cada reintento, cada “swallow” silencioso. Es la diferencia entre leer el ensayo y ver el trabajo.

<p class="inset">
Un candidato que se niega a entregar datos de clientes de un empleador anterior está pasando la prueba, no fallándola.
</p>

En su lugar, toma un ejemplo reconstruido, o usa el ejercicio compartido a continuación. “Muéstrame evidencia” nunca debe convertirse en “tráenos los secretos de otra persona”.

Para una contratación de nivel inicial, la evidencia es menor y eso está bien. Ajusta el alcance y la supervisión esperados al rol. Estás evaluando comprensión y responsabilidad, no acceso a logotipos famosos.

## Cinco preguntas que valen el tiempo de la entrevista

Estos son disparadores para la investigación, no trivialidades. Si basta con memorizar la respuesta para aprobar, la pregunta no sirve de nada.

### 1. “¿Cómo dirías si este agente mejoró?”

Escucha que el éxito se defina en el lenguaje del puesto: tickets resueltos correctamente, borradores que realmente envía un agente, escalaciones que no fueron necesarias. Luego pregunta qué fallos ocultaría una puntuación promedio y contra qué compararían la nueva versión.

Una buena respuesta hace que la medición sea inspeccionable. Pídeles que esbocen tres casos de prueba en el momento y que indiquen quién decide si cada uno pasó. Si un modelo califica las respuestas, pregunta cómo verifican al calificador. ["It scored 94%" is not a measurement if the same run scores 82% on Tuesday.](/auto-tune-your-llm-judge)

La [guía de Anthropic sobre evaluaciones de agentes](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) marca la distinción que debe estar en tu entrevista: el registro de lo que hizo un agente no es lo mismo que el resultado. Un agente que informa “Emití el reembolso” es una frase, no un reembolso.

### 2. “La herramienta agotó el tiempo después de enviar un reembolso. ¿Y ahora?”

“Reintentar” es el reflejo equivocado. El dinero puede ya estar desaparecido.

Escucha que verifiquen el estado de la transacción antes de actuar, que usen una clave de idempotencia para que el segundo intento se aplique al primero, y que tengan una ruta de escalamiento cuando el estado sea realmente desconocido. Pregunta quién ve la falla y cómo se reanuda el trabajo después. El vocabulario importa menos que si su diseño puede cobrarle al cliente dos veces por un mismo error.

### 3. “¿Qué puede leer, cambiar y gastar este sistema?”

Pida el límite: qué registros puede leer, qué acciones puede ejecutar, dónde se requiere la aprobación humana y qué impide que un bucle se ejecute toda la noche consumiendo su tarjeta de crédito.

Luego pregunte dónde se hace cumplir ese límite. Un aviso que le dice al modelo que sea cuidadoso es un firewall de texto de política: la intención está, pero la aplicación no. Hágalo dibujar el límite y proponer una prueba que intente cruzarlo.

Incluya la exposición de datos mientras lo hace: qué información sale hacia el proveedor del modelo, qué se escribe en los registros y quién puede leer esos registros. “Registramos todo” es una conversación de cumplimiento que está a punto de estallar.

### 4. “¿Qué parte construiría sin un LLM?”

Un ingeniero competente puede extraer la IA de parte de su propia propuesta. Las reglas de elegibilidad, los cálculos aritméticos y las verificaciones de permisos tienen implementaciones aburridas que nunca alucinan. Interpretar lo que un cliente frustrado quiso decir sí lo hace.

Pregunte qué le aporta el modelo en este flujo de trabajo específico y qué evidencia justificaría la superficie de falla adicional. Si cada cuadro del diagrama necesita un agente, solicite un diagrama más pequeño.

### 5. “Cuénteme sobre un enfoque que abandonó.”

Escuche la observación que cambió su decisión. Los usuarios querían búsqueda, no chat. El modelo más caro redujo el costo total de manejo. La funcionalidad no valía la pena lanzar y ellos lo admitieron.

Un resultado negativo sincero supera a una historia de éxito pulida, porque una historia de éxito rara vez revela una regla de decisión. Pregunte qué dejaron de hacer y cuánto tiempo les tomó detenerlo.

## Pague por una pequeña sesión de trabajo

Utilice un ejercicio limitado y remunerado con datos sintéticos. Envíe el brief y los criterios de puntuación con antelación — está contratando juicio, no la capacidad de ser emboscado. Permita que los candidatos usen las herramientas que emplearían en el puesto, incluida la IA, y luego pídales que expliquen y verifiquen lo que produjeron.

Una sesión ilustrativa de 90 minutos para un ingeniero de aplicaciones:

> Hereda un asistente de soporte que redacta respuestas y propone reembolsos. Aquí hay doce tickets sintéticos, un breve documento de política y cuatro ejecuciones grabadas. Una respuesta cita una política que retiramos en marzo. Una solicitud de reembolso se agota. Un ticket pide la información de otro cliente. Recomiende si ampliamos el piloto y muéstreme una pequeña mejora o prueba.

Quince minutos para aclarar el objetivo, cuarenta y cinco para profundizar, treinta para explicar la recomendación. Proporcióneles un entorno preparado para que el ejercicio no sea secretamente una prueba de `npm install`. Acomode las necesidades de acceso y mantenga las condiciones equivalentes entre candidatos.

Usted observará qué preguntas hacen, qué evidencia abren y a qué riesgo recurren primero. ¿Notan que doce tickets no pueden establecer fiabilidad? ¿Pueden lanzar una corrección puntual sin afirmar que el sistema ya está bien? ¿Pueden decir qué debería suceder la próxima semana?

El candidato que añada una prueba fallida para el reembolso duplicado puede haberle contado más que quien entregó una interfaz de chat impecable.

Use las mismas preguntas centrales y los mismos criterios de valoración para todos los candidatos — esa es la estructura básica detrás de la guía de entrevistas estructuradas de la Oficina de Gestión de Personal de EE. UU. ([structured interview guidance](https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/)), y sirve para que su panel compare candidatos en lugar de basarse en intuiciones. Mantenga el ejercicio cercano al trabajo real. La línea entre una muestra de trabajo y una consultoría gratuita es más delgada de lo que muchos gerentes de contratación creen, y los candidatos pueden percibirla desde el otro lado de la sala.

## La tarjeta de puntuación de contratación

Copia esto en el documento de la entrevista. Asegúrate de acordar el nivel requerido para cada dimensión **antes** de reunirte con cualquier candidato, porque el umbral cambia una vez que te agrada alguien. Cada entrevistador califica de forma independiente antes del debrief y adjunta una observación concreta a cada puntuación.

Usa **1 = sin soporte o con fallas materiales**, **2 = viable con guía sustancial**, **3 = sólido dentro del alcance del rol**, **4 = buen juicio más verificación demostrada**. Usa **N/O = no observado** cuando la entrevista nunca produjo evidencia. N/O es una brecha que hay que cubrir, no un cero que se promedia.

| Dimensión | Evidencia que merece un 3 | Puntuación / evidencia observada |
| --- | --- | --- |
| Juicio técnico | Elige un diseño proporcional y explica una alternativa rechazada | ___ / ___ |
| Juicio de producto | Define un resultado de usuario, una línea base y una razón para detenerse | ___ / ___ |
| Evaluación | Propone casos representativos y verifica resultados, no solo respuestas fluidas | ___ / ___ |
| Disciplina de producción | Maneja fallas parciales, recuperación, monitoreo, costo y latencia | ___ / ___ |
| Seguridad | Identifica datos sensibles y explica límites de acceso y gasto aplicables | ___ / ___ |
| Comunicación | Expone la incertidumbre de forma clara y explica la consecuencia a quien decide | ___ / ___ |
| Propiedad | Separa su trabajo del del equipo y sigue las fallas hasta su resolución | ___ / ___ |

Esto es una ayuda de decisión, no un predictor validado del desempeño laboral. Calíbralo según tu rol y compáralo con lo que realmente ocurre después de que la gente se incorpora; de lo contrario estarás afinando a un juez que nunca puntuaste.

Para alguien que será responsable único de producción, quiero evidencia sólida en cada dimensión esencial. Un total fuerte nunca debe tapar una debilidad no resuelta en permisos o recuperación; esas son las dos que te cobrarán después. Para un ingeniero en desarrollo, anota el apoyo que necesitará y el nombre de la persona que lo brindará.

Cierra el debrief con tres frases: **¿Qué puede poseer esta persona? ¿Qué apoyo necesitará? ¿Qué aún no sabemos?** Un panel que no pueda responder eso está a punto de tener una conversación de cuarenta minutos sobre presencia ejecutiva.

## Las banderas rojas merecen una pregunta más

Ten cuidado cuando un candidato no pueda separar su contribución de la del equipo, trate cada proyecto pasado como un éxito ininterrumpido, o responda a preguntas de medición con adjetivos. “Altamente preciso” necesita un denominador.

Otros indicios de humo: aparecen agentes en el diseño antes de comprender el problema; el costo operativo no tiene techo; la recuperación de fallas pertenece a otro equipo; la seguridad vive enteramente en el prompt.

Haz una única prueba con un escenario concreto antes de concluir cualquier cosa. Un término desconocido no es un concepto ausente, y muchos ingenieros competentes aprendieron esas ideas bajo nombres diferentes. Reconoce cuando alguien detecta su propio error en medio de la respuesta. Negarse a actualizar después de ver evidencia contradictoria es la jugada descalificadora — necesitar un momento de reflexión no lo es.

## ¿Ya te preocupa la contratación? Audita el trabajo primero

Un proyecto de IA con problemas no prueba que contrataste al ingeniero equivocado. El encargo pudo haber sido imposible, los datos inutilizables, o la dirección pudo haber prometido total autonomía en una presentación antes de que alguien midiera la calidad.

Antes de encargar una reescritura, conserva el código, la configuración, los resultados de evaluación y los registros relevantes bajo controles de acceso adecuados. Luego determina qué cuentas, servicios y claves API controla realmente la empresa — aquí es donde los equipos descubren que toda la canalización corre en la cuenta de facturación personal de una sola persona.

Obtén una lectura independiente de algunos flujos de trabajo representativos. ¿Qué funciona? ¿Qué falla? ¿Qué afirmaciones se reproducen? Restringe las acciones de riesgo mientras se investiga el comportamiento incierto y clasifica el trabajo en mantener, reparar y reemplazar.

Solicita un plan de recuperación breve con pruebas de aceptación, propietarios nombrados y una fecha de decisión. “Necesitamos un nuevo marco” es una propuesta para examinar, no un diagnóstico.

## Da al contratado permiso para decepcionar la hoja de ruta

Nada de esto funciona si tu empresa castiga el juicio que acabas de pasar seis semanas seleccionando.

El ingeniero que dice “la aprobación humana permanece en este paso” o “el piloto aún no justifica la expansión” necesita un líder que pueda escucharlo frente a otras personas. Contrata basándote en la evidencia y luego entierra los hallazgos incómodos, y habrás construido una máquina costosa para producir las respuestas que ya querías.

Así que, para el próximo puesto de IA: redacta el resultado esperado, utiliza la hoja de puntuación y observa al candidato profundizar en algo imperfecto.

Quieres a la persona que pueda demostrarte por qué el sistema está listo — y que, en voz alta, te diga el día que no lo está.
````
