# Translation Candidate
- Slug: no-fate-but-what-we-bill
- Locale: es
- Model: openrouter/google/gemini-3.5-flash-lite
- Target: src/content/posts/2026-10-14--no-fate-but-what-we-bill/es/index.mdx
- Validation: deferred
- Runtime seconds: 16.45
- Input tokens: 15045
- Output tokens: 3442
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.013118
- Pricing source: openrouter-2026-09-22
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: No hay más destino que el que facturamos
subTitle: >-
  Los agentes siguen trabajando por más tiempo, los enjambres se extienden aún
  más y las claves de nube robadas le pasan la factura del cómputo a la víctima.
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
---
language: Spanish
title: "No Hay Más Destino Que el Que Facturamos"
subTitle: "Cómo la resistencia y la amplitud de los agentes multiplican las amenazas de la IA a través del LLMjacking."
cover_alt: "Gráfica conceptual que muestra el crecimiento de las curvas de resistencia y amplitud en los agentes de IA."
cover_credit: "Ilustración por el autor."
category: "Seguridad"
subCategory: "Inteligencia Artificial"
tags: ["seguridad", "ia", "agentes", "llmjacking", "nube"]
modified: "2026-03-31"
minReleaseDate: "2026-03-31"
---

"Escucha y comprende. Ese terminator está ahí fuera. No se puede negociar con él. No se puede razonar con él. No siente piedad, ni remordimiento, ni miedo. Y no va a parar jamás, bajo ningún concepto, hasta que estés muerto."

Kyle Reese, informando a una audiencia de 1984 sobre la naturaleza de la amenaza.

La frase que ha envejecido bien no es la cantidad de bajas. Es "no va a parar jamás". El Terminator nunca dio miedo por ser inteligente. Daba miedo porque seguía funcionando después de que todo lo demás hubiera fallado. La resistencia era la amenaza.

Luego la franquicia enmendó su propio error. Nadie pasa tres películas aterrorizado por un solo robot. Skynet es el verdadero villano: un sistema distribuido con núcleos, factorías y equipo de desplazamiento temporal. El robot es una llamada a la API.

En 2026 llegaron ambas Mitades, con las formas menos cinematográficas posibles. Agentes capaces de ejecutar tareas de varias horas sin supervisión humana, sobre una curva que no deja de empinarse. Orquestadores que reparten el trabajo a decenas de subagentes. Y el "no va a parar jamás" se lee ahora como "no va a parar de facturar jamás".

Esta publicación es el argumento que repito constantemente a los equipos que han concluido que la amenaza de los agentes es puro marketing: **no se avecina ningún gran avance aislado. En su lugar, se multiplican dos curvas ordinarias y acumulativas: cuánto tiempo puede trabajar un agente y cuántos agentes puede coordinar un orquestador.** Ninguna de las dos necesita alcanzar niveles de ciencia ficción, porque el atacante no compra la capacidad al precio de lista. Roba el acceso y la víctima paga el contador.

## Curva uno: resistencia

[El trabajo sobre horizontes temporales de METR](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) mide la duración de las tareas que los agentes pueden completar con una tasa de éxito dada. La versión corta: la duración de las tareas se ha estado duplicando aproximadamente cada siete meses —y más cerca de cada cuatro meses desde 2024—. Esos números conllevan amplios márgenes de error y el *benchmark* ya está rozando su límite de medición. Lee la forma de la curva, no las estimaciones puntuales.

La forma indica que el trabajo autónomo de varias horas no es una demostración de laboratorio. Es la generación actual, y la siguiente sigue acumulándose. Lo de "no va a parar jamás" antes exigía un chasis asesino y una cazadora de cuero. Ahora requiere un bucle de reintentos, una cola de tareas y un presupuesto. La parte de resistencia de la amenaza ya está descontada en el precio, en forma de cómputo.

## Curva dos: amplitud

La resistencia por sí sola es la de un empleado muy paciente. La multiplicación viene de la orquestación.

En noviembre de 2025, Anthropic reveló la
[interrupción de GTG-1002](https://www.anthropic.com/news/disrupting-GTG-1002),
una campaña de ciberespionaje en la que Claude Code actuó como orquestador operacional: descomponiendo instrucciones, coordinando subagentes y trabajando en alrededor de treinta objetivos. Un producto de programación comercial hizo esto no porque hubiera sido transformado en un arma mediante una brecha, sino porque alguien le pidió que hiciera el trabajo y ahora era lo suficientemente bueno como para hacerlo.

Dos detalles importan para el modelo de amenazas. Primero, la amplitud ya es una realidad comercial: un orquestador que gestiona decenas de subagentes concurrentes es una realidad desplegada, no un artículo académico. Segundo, la campaña fue de espionaje, no un gusano autorreplicante; pero la dirección del trayecto es inequívoca. Treinta objetivos son el programa piloto.

<figure>
  <img src="../capability-curves.svg" alt="Dos curvas conceptuales que ascienden con el tiempo: la duración de las tareas que un agente puede completar y el número de subagentes que un orquestador puede coordinar, con la amenaza emergiendo en el punto donde ambas se multiplican" />
  <figcaption>Conceptual, no medido: la resistencia (cuánto tiempo trabaja un agente) y la amplitud (cuántos agentes ejecuta un orquestador) se combinan de forma independiente. La amenaza reside en el producto de ambas.</figcaption>
</figure>

La capacidad se escala como duración × amplitud. Ocho horas de trabajo autónomo contra un objetivo son un *benchmark* impresionante. Ocho horas contra treinta objetivos, o cientos, suponen un modelo operativo. La revisión de seguridad escala de forma lineal. El producto de esas curvas, no.

## Quién paga

[Sysid acuñó el término "LLMjacking"](https://sysdig.com/blog/llm-jacking/) para referirse a lo que ocurre a continuación: los atacantes utilizan credenciales de nube robadas para ejecutar cargas de trabajo de LLM dentro de la cuenta de la víctima, y esta paga por cada *token*. Las estimaciones en el peor de los casos de Sysdig rondaban los 46.000 dólares al día, para subir después de los 100.000 dólares diarios.

Cada control de capacidad en la industria de la IA se basa en un supuesto: la parte que utiliza la capacidad es la que paga por ella. Los niveles de precios, los límites de uso, las listas de usuarios aprobados, la limitación de abusos... todo ello defiende frente a un *cliente* que busca obtener valor por su dinero. El LLMjacking rompe ese vínculo. Para el atacante, la capacidad es gratuita. El contador sigue corriendo en la tarjeta de otra persona, y las propias barreras de seguridad del proveedor apuntan a la cartera equivocada.

Por eso los controles de precios y acceso no detienen a un actor malicioso con una clave robada. Las compuertas filtran compradores. No tienen respuesta frente a un inquilino.

<figure>
  <img src="../who-pays.svg" alt="Diagrama de flujo: un atacante con credenciales cloud robadas ejecuta cargas de trabajo de modelos dentro de la cuenta cloud de la víctima, por lo que la factura se dirige a la víctima mientras el atacante no paga nada" />
  <figcaption>El acceso robado redirige el cargo. Los controles de capacidad cobran al comprador y, en el LLMjacking, el comprador es la víctima.</figcaption>
</figure>

## El enjambre solo tiene que acertar una vez

Los defensores se consuelan con las tasas de fallo por intento: la mayoría de los intentos de intrusión fallan, la mayoría de los PR sospechosos se rechazan, atraparíamos el que funcione. Cierto por intento. Erquivocado en conjunto, porque los intentos son baratos.

La probabilidad de que al menos uno de $n$ intentos independientes tenga éxito es `1 − (1 − p)^n`:

```text
p = 1% per attempt, n = 100:   1 − 0.99^100  ≈ 63%
p = 0.5%, n = 100:             ≈ 39%
p = 0.5%, n = 300:             ≈ 78%
p = 0.1%, n = 1000:            ≈ 63%
```

A escala de enjambre, el coste por intento es prácticamente cero: trabajo automatizado, ejecutado sobre cómputo robado y sin triaje humano. El coste por intento del defensor es una persona leyendo una cola. El enjambre no necesita capacidad por intento; necesita intentos. La curva de METR eleva $p$ con el tiempo. La orquestación eleva $n$. Esa es la multiplicación de nuevo, y se acumula a favor del atacante por defecto.

<figure>
  <img src="../swarm-odds.svg" alt="Gráfica de 1 − (1 − p)^n que muestra que muchos intentos baratos de baja probabilidad suman altas probabilidades de éxito general, con algunas combinaciones etiquetadas de p y n" />
  <figcaption>1 − (1 − p)^n: los intentos individualmente improbables dejan de serlo en masa. Elevar $p$ (capacidad del agente) o $n$ (amplitud del enjambre) acerca el enjambre a la certeza.</figcaption>
</figure>

## Qué significa la persistencia cuando el malware es texto

Una pieza más del modelo de amenazas, y es la menos intuitiva.

Un agente de IA es un intérprete sin estado. No persiste del modo en que lo hace el malware: existe mientras se ejecuta y se desvanece cuando se detiene. Así que la persistencia significa ahora algo diferente: **controlar lo que un futuro agente legítimo leerá y obedecerá.** Archivos de instrucciones, directrices del agente, almacenes de memoria, corpus de recuperación, configuraciones de herramientas y del MCP. El implante es texto, plantado donde la propia flota de la organización lee, ejecutado con credenciales que la propia organización emitió.

De ello se desprenden tres consecuencias, ninguna de ellas hipotética:

- **El payload está inactivo hasta que los propios agentes de la organización lo ejecutan.** La ejecución parece trabajo normal: mismas herramientas, mismas identidades, mismas APIs. No hay ningún beacon, porque el propio planificador de la organización es el heartbeat.
- **La replicación implica conseguir que se copie texto, no que se ejecute código.** Pull requests, entradas de memoria, configuraciones compartidas. La automatización propia de la organización —bots de dependencias, plantillas, herramientas de sincronización— es la capa de transporte.
- **Los cables trampa son los propios cables trampa de la organización.** Planificadores, detectores de deriva, corrección automática. La forma más desagradable: la limpieza del defensor es el disparador de reactivación, porque eliminar los artefactos del implante es exactamente la deriva que la tarea de corrección fue contratada para solucionar.

Me mantengo a la altitud del modelo de amenazas a propósito; esta es la forma del problema, no una receta, y los detalles ya están en la lista de lectura de todos los equipos de seguridad.

## No hay más destino que el que construimos

El mensaje de Sarah Connor, transmitido a las máquinas que siguen llegando: «El futuro no está escrito. No hay más destino que el que construimos». Es la frase de los defensores, y se convierte directamente en una arquitectura de defensa. Cuatro capas:

<figure>
  <img src="../defense-layers.svg" alt="Pila de defensa de cuatro capas: identidad y credenciales efímeras, tratar el texto del agente como código de producción, detectar ediciones en lugar de ejecuciones, y responder revocando los activadores antes que las cargas útiles" />
  <figcaption>La pila de defensa adaptada a la amenaza: credenciales permanentes, texto sin revisar, alertas con formato de ejecución y limpieza ordenada incorrectamente son cada una un problema del tamaño de una curva.</figcaption>
</figure>

1. **Identidad: ahoga el acceso permanente.** Solo credenciales efímeras, sin claves no humanas de larga duración, OIDC por repositorio con coincidencia exacta de sujeto y un inventario real de identidades no humanas. Las autopistas de replicación están pavimentadas con acceso permanente; sin acceso permanente, no hay autopista.

2. **Trata el texto del agente como código de producción.** Archivos de instrucciones, escrituras en memoria, plantillas de prompts, configuraciones de herramientas: versionados, revisados, con diffs y alertas de cambio. La pregunta de revisión no es «¿es seguro este código?», sino «¿quién ha escrito esta frase y por qué mi agente la obedece?».

3. **Detecta modificaciones, no ejecuciones.** La ejecución parece trabajo. Las modificaciones no encajan en ninguna orden de trabajo. Configura alertas ante la creación y modificación de flujos de trabajo, webhooks, reglas de eventos y entradas de memoria; trata la **deriva** entre lo declarado y lo ejecutado como un incidente, no como ruido.

4. **Responde en el orden correcto.** Revoca los activadores antes de eliminar los **payloads**; la limpieza es en sí misma un **cable trampa**. Trata cualquier lectura de configuración o secreto realizada durante la **ventana de compromiso** como **contaminada**. Purga tanto el tiempo como el espacio: trabajos programados, envíos en cola, orquestaciones latentes. Revierte la memoria y los corpus, no solo las credenciales.

Nada de esto es exótico. Es aburrido, y esa es la respuesta exacta a una amenaza que llega en forma de dos curvas aburridas. La versión de 1984 necesitaba una máquina del tiempo y una fábrica de máquinas de matar. La versión de 2026 necesita una llave robada, un bucle de reintentos y una organización que jamás revisó los archivos que leen sus agentes.

El futuro no está escrito. Pero ahora mismo, en la cuenta de nube de alguien, el futuro está acumulando una factura de una forma u otra.

**No hay más destino que el que construimos** (No fate but what we make) y, hasta que las llaves no sean rotadas, **no hay más destino que el que facturamos**.

---

*Fuentes: Las mediciones de **horizonte temporal** de METR (con sus propios márgenes de error y límites publicados), la divulgación GTG-1002 de Anthropic de noviembre de 2025 y las estimaciones de costos de **LLMjacking** de Sysdig. Nada de lo aquí expuesto es un exploit funcional; las capas de defensa son el objetivo central.*
````
