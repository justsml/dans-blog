# Translation Candidate
- Slug: no-fate-but-what-we-bill
- Locale: es
- Model: openrouter/minimax/minimax-m2.5:nitro
- Target: src/content/posts/2026-10-14--no-fate-but-what-we-bill/es/index.mdx
- Validation: deferred
- Runtime seconds: 71.95
- Input tokens: 8586
- Output tokens: 5153
- Thinking tokens: unknown
- Cached input tokens: 1787
- Cache write tokens: 0
- Estimated cost: $0.000000
- Pricing source: unknown
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: No hay más destino que el que facturamos
subTitle: ''
category: Security
subCategory: AI Agents
tags:
  - ai-agents
  - security
  - threat-model
  - llm
  - agents
  - cloud
  - supply-chain
sourceHash: 17bcd9b90da0
---
«Escucha, y entiende. Ese terminator está ahí fuera. No se puede negociar con él. No se puede razonar con él. No siente compasión, ni remordimiento, ni miedo. Y absolutamente no va a parar, nunca, hasta que estés muerto.»

Kyle Reese, briefing a una audiencia de 1984 sobre la forma de la amenaza.

La línea que resistió bien al paso del tiempo no es el conteo de bajas. Es «absolutamente no va a parar.» El Terminator nunca dio miedo por ser inteligente. Dio miedo porque seguía trabajando después de que todo lo demás había fallado. La resistencia era la amenaza.

Luego la franquicia subsanó su propio error. Nadie pasa tres películas temiendo a un robot. Skynet es el villano real: un sistema distribuido con núcleos, fábricas y equipo de desplazamiento temporal. El robot es una llamada a la API.

En 2026 ambos lados llegaron, en las formas menos cinematográficas imaginables. Agentes que pueden llevar a cabo tareas de varias horas sin supervisión humana, en una curva que sigue empinándose. Orquestadores que distribuyen trabajo a subagentes por docena. Y «absolutamente no va a parar» ahora se lee como «absolutamente no va a parar de facturar.»

Esta entrada es el argumento que sigo planteando a equipos que han concluido que la amenaza agentiva es exageración: **no está llegando ningún avance singular. Dos curvas ordinarias y que se acumulan se están multiplicando en su lugar — cuánto tiempo puede trabajar un agente, y cuántos agentes puede coordinar un orquestador. Ninguna necesita alcanzar niveles de ciencia ficción, porque el atacante no compra capacidad a precio de lista. Roban el acceso, y la víctima paga el medidor.**

## Curva uno: resistencia

El [trabajo de METR sobre horizonte temporal](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) mide la longitud de las tareas que los agentes pueden completar con una tasa de éxito dada. La versión corta: la longitud de las tareas se ha duplicado aproximadamente cada siete meses — y más cerca de cada cuatro meses desde 2024. Esos números llevan amplios márgenes de error y el benchmark ya está luchando contra su límite de medición. Lee la forma de la curva, no las estimaciones puntuales.

La forma dice: el trabajo autónomo de varias horas no es una demo de laboratorio. Es la generación actual, y la siguiente sigue acumulando. «Absolutamente no va a parar» solía requerir un chasis de asesinato y una chaqueta de cuero. Ahora requiere un bucle de reintento, una cola de tareas y un presupuesto. La parte de resistencia de la amenaza ya está incluida en el precio — como cómputo.

## Curva dos: amplitud

La resistencia por sí sola es un empleado muy paciente. La multiplicación viene de la orquestación.

En noviembre de 2025, Anthropic divulgó la [interrupción de GTG-1002](https://www.anthropic.com/news/disrupting-GTG-1002), una campaña de ciberespionaje en la que Claude Code actuó como el orquestador operativo: descomponiendo instrucciones, coordinando subagentes y trabajando en aproximadamente treinta objetivos. Un producto comercial de codificación hizo esto no porque estuviera comprometido para convertirse en un arma, sino porque alguien le pidió que hiciera el trabajo y ahora era lo suficientemente bueno para hacerlo.

Dos detalles importan para el modelo de amenazas. Primero, la amplitud llegó: un orquestador que sostiene docenas de subagentes concurrentes es realidad desplegada, no un artículo. Segundo, la campaña fue espionaje, no un gusano que se propaga por sí mismo — pero la dirección de viaje es inconfundible. Treinta objetivos es el programa piloto.

<figure>
  <img src="../capability-curves.svg" alt="Dos curvas conceptuales ascendentes a lo largo del tiempo: longitud de tareas que un agente puede completar, y número de subagentes que un orquestador puede coordinar, con la amenaza emergiendo donde las dos se multiplican" />
  <figcaption>Conceptual, no medido: resistencia (cuánto tiempo trabaja un agente) y amplitud (cuántos agentes ejecuta un orquestador) se acumulan de forma independiente. La amenaza vive en el producto de ambas.</figcaption>
</figure>

La capacidad escala como duración × amplitud. Ocho horas de trabajo autónomo contra un objetivo es un benchmark impresionante. Ocho horas contra treinta objetivos, o cientos, es un modelo operativo. La revisión de seguridad escala linealmente. El producto de esas curvas no.

## Quién paga

[Sysdig acuñó «LLMjacking»](https://sysdig.com/blog/llm-jacking/) para lo que pasa después: los atacantes usan credenciales de nube robadas para ejecutar cargas de trabajo LLM dentro de la cuenta de la víctima, y la víctima paga por cada token. Las estimaciones del peor caso de Sysdig llegaron a unos 46k$ al día — luego subiendo por encima de los 100k$ al día.

Cada control de capacidad en la industria de IA se construye sobre una suposición: la parte que usa la capacidad es la parte que paga por ella. Los niveles de precios, los topes de uso, las listas de usuarios aprobados, la limitación de abuso — todo defiende contra un *cliente* que quiere valor por su dinero. LLMjacking corta ese enlace. Para el atacante la capacidad es gratuita. El medidor está corriendo con la tarjeta de otra persona, y los propios guardarraíles del proveedor apuntan a la billetera equivocada.

That's why price and access gates don't stop one bad actor with a stolen key.
Gates filter buyers. They have no answer for a tenant.

<figure>
  <img src=".././who-pays.svg" alt="Diagrama de flujo: un atacante con credenciales cloud robadas ejecuta cargas de trabajo de modelo dentro de la cuenta cloud de la víctima, por lo que la factura se dirige a la víctima mientras el atacante no paga nada" />
  <figcaption>El acceso robado redirige el cargo. Los controles de capacidad cobran al comprador — y en LLMjacking, el comprador es la víctima.</figcaption>
</figure>

## Lo único que el enjambre tiene que hacer es acertar una vez

Los defensores se consuelan con las tasas de fallo por intento: la mayoría de los intentos de intrusión fracasan, la mayoría de los PRs sospechosos se rechazan, atraparíamos el que funciona. Verdadero por intento. Incorrecto en conjunto, porque los intentos son baratos.

La probabilidad de que al menos uno de n intentos independientes tenga éxito es `1 − (1 − p)^n`:

```text
p = 1% por intento, n = 100:   1 − 0.99^100  ≈ 63%
p = 0.5%, n = 100:             ≈ 39%
p = 0.5%, n = 300:             ≈ 78%
p = 0.1%, n = 1000:            ≈ 63%
```

Con la economía del enjambre el coste por intento es aproximadamente cero — trabajo automatizado, ejecutado con cómputo robado, triado sin intervención humana. El coste por intento del defensor es una persona leyendo una cola. El enjambre no necesita capacidad por intento; necesita intentos. La curva de METR eleva p con el tiempo. La orquestación eleva n. Eso es la multiplicación de nuevo, y composita a favor del atacante por defecto.

<figure>
  <img src=".././swarm-odds.svg" alt="Gráfico de 1 − (1 − p)^n mostrando que muchos intentos baratos de baja probabilidad suman probabilidades altas de éxito general, con algunas combinaciones etiquetadas de p y n" />
  <figcaption>1 − (1 − p)^n: los intentos individualmente improbables dejan de serlo en conjunto. Elevar p (capacidad del agente) o n (amplitud del enjambre) mueve al enjambre hacia la certeza.</figcaption>
</figure>

## Qué significa la persistencia cuando el malware es texto

Una pieza más del modelo de amenazas, y es la menos intuitiva.

Un agente de IA es un intérprete sin estado. No persiste como lo hace el malware — existe mientras se ejecuta y desaparece cuando se detiene. Así que persistencia significa algo diferente ahora: **controlar lo que un futuro agente legítimo leerá y obedecerá.** Archivos de instrucción, directrices de agente, almacenes de memoria, corpus de recuperación, configuraciones de herramientas y MCP. El implante es texto, plantado donde la propia flota de la org lee, ejecutado con las credenciales que la propia org emitió.

Tres consecuencias siguen, ninguna de ellas hipotética:

- **El payload permanece inerte hasta que los propios agentes de la org lo ejecutan.** La ejecución parece trabajo normal — mismas herramientas, mismas identidades, mismas APIs. No hay beacon, porque el propio programador de la org es el heartbeat.
- **La replicación significa copiar texto, no ejecutar código.** Pull requests, entradas de memoria, configuraciones compartidas. La propia automatización de la org — bots de dependencias, plantillas, herramientas de sincronización — es la capa de transporte.
- **Los cables trampa son los propios cables trampa de la org.** Programaciones, detectores de deriva, corrección automática. La forma más desagradable: la limpieza del defensor es el disparador de re-activación, porque borrar los artefactos del implante es exactamente la deriva que el trabajo de remediación fue contratado para corregir.

Me quedo a propósito en la altitud del modelo de amenazas — esta es la forma del problema, no una receta, y los detalles ya están en la lista de lectura de cada equipo de seguridad.

## No hay más destino que el que construimos

El mensaje de Sarah Connor, transmitido a las máquinas que siguen llegando: "El futuro no está decidido. No hay más destino que el que construimos." Es la línea de los defensores, y se convierte directamente en una arquitectura de defensa. Cuatro capas:

<figure>
  <img src=".././defense-layers.svg" alt="Pila de defensa de cuatro capas: identidad y credenciales efímeras, tratar el texto del agente como código de producción, detectar ediciones en lugar de ejecuciones, y responder revocando disparadores antes que payloads" />
  <figcaption>La pila de defensa mapeada a la amenaza: credenciales permanentes, texto no revisado, alertas con forma de ejecución, y limpieza ordenada incorrectamente son cada una una curva de problemas.</figcaption>
</figure>

1. **Identidad — inanición del acceso permanente.** Credenciales efímeras exclusivamente, sin claves no humanas de larga duración, OIDC por repo con coincidencia exacta de sujeto, y un inventario real de identidades no humanas. Las autopistas de replicación están pavimentadas con acceso permanente; sin acceso permanente, no hay autopista.

2. **Tratar el texto del agente como código de producción.** Archivos de instrucción, escrituras de memoria, plantillas de prompts, configuraciones de herramientas: versionados, revisados, con diffs, y con alertas de cambio. La pregunta de revisión no es "¿es seguro este código?" — es "¿quién escribió esta frase, y por qué mi agente le obedece?"

3. **Detectar ediciones, no ejecuciones.** La ejecución parece trabajo. Las ediciones no encajan en ninguna orden de trabajo. Alertar sobre la creación y modificación de flujos de trabajo, webhooks, reglas de eventos y entradas de memoria, y tratar la deriva declarada frente a la de ejecución como un incidente, no como ruido.

4. **Responder en el orden correcto.** Revocar disparadores antes de eliminar payloads — la limpieza en sí es un cable trampa. Tratar cualquier configuración o secreto leído durante la ventana de compromiso como contaminado. Purgar tiempo además de espacio: trabajos programados, envíos en cola, orquestaciones inactivas. Revertir memoria y corpus, no solo credenciales.

Nada de esto es exótico. Es tedioso, y eso es lo que hace juego con una amenaza que llega en forma de dos curvas tediosas. La versión de 1984 necesitaba una máquina del tiempo y una fábrica de máquinas asesinas. La versión de 2026 necesita una clave robada, un bucle de reintento, y una organización que nunca revisó los archivos que sus agentes leen.

El futuro no está predeterminado. Pero ahora mismo, en la cuenta de nube de alguien, el futuro se está ejecutando y acumulando cargos de una forma u otra.

No hay más destino que el que construimos — y, hasta que se roten las claves, no hay más destino que el que facturamos.

*Fuentes: Mediciones de horizonte temporal de METR (con sus propias barras de error y límites publicados), divulgación GTG-1002 de Anthropic de noviembre de 2025, y estimaciones de coste de LLMjacking de Sysdig. Nada de esto es un exploit funcional; las capas de defensa son el punto entero.*
````
