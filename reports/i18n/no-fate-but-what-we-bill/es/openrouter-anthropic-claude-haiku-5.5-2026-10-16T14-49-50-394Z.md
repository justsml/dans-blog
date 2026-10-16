# Translation Candidate
- Slug: no-fate-but-what-we-bill
- Locale: es
- Model: openrouter/anthropic/claude-haiku-5.5
- Target: src/content/posts/2026-10-14--no-fate-but-what-we-bill/es/index.mdx
- Validation: deferred
- Runtime seconds: 25.41
- Input tokens: 23101
- Output tokens: 5383
- Thinking tokens: unknown
- Cached input tokens: 9644
- Cache write tokens: 6238
- Estimated cost: $0.004290
- Pricing source: openrouter-2026-10-16
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: No hay más destino que el que facturamos
subTitle: >-
  Los agentes trabajan cada vez más tiempo, los enjambres se expanden cada vez
  más y las claves de nube robadas le pasan la factura de cómputo a la víctima.
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
"Escucha y entiende. Ese terminator anda por ahí. No se puede negociar con él. No se puede razonar con él. No siente piedad, ni remordimiento, ni miedo. Y no va a parar jamás, hasta que estés muerto."

Kyle Reese, explicando a un público de 1984 la forma de la amenaza.

La frase que mejor envejeció no es el recuento de muertes. Es "no va a parar jamás". Terminator nunca dio miedo por ser listo. Daba miedo porque seguía trabajando cuando todo lo demás había fallado. La amenaza era la resistencia.

Luego la saga corrigió su propio error. Nadie pasa tres películas temiendo a un solo robot. Skynet es el villano de verdad: un sistema distribuido con núcleos, fábricas y equipo de desplazamiento temporal. El robot es una llamada a una API.

En 2026 llegaron las dos mitades, en las formas menos cinematográficas imaginables. Agentes capaces de cargar con tareas de varias horas sin que nadie les vigile, siguiendo una curva que sigue acentuándose. Orquestadores que reparten el trabajo entre subagentes por docenas. Y "no va a parar jamás" ahora se lee como "no va a parar jamás de facturar".

Este artículo es el argumento que sigo repitiendo a los equipos que han concluido que la amenaza agéntica es puro humo: **no se avecina ningún avance único. Lo que se multiplica son dos curvas ordinarias que se acumulan: cuánto tiempo puede trabajar un agente, y cuántos agentes puede coordinar un orquestador. Ninguna de las dos necesita llegar a niveles de ciencia ficción, porque el atacante no compra capacidad a precio de catálogo. Roba el acceso, y la víctima paga el contador.**

## Curva uno: resistencia

[El trabajo de horizonte temporal de METR](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) mide la duración de las tareas que los agentes pueden completar con una tasa de éxito dada. La versión corta: la duración de las tareas ha ido duplicándose aproximadamente cada siete meses, y cada cuatro meses desde 2024. Esas cifras tienen márgenes de error amplios, y el benchmark ya está al límite de su capacidad de medición. Fíjate en la forma de la curva, no en las estimaciones puntuales.

La forma dice que el trabajo autónomo de varias horas no es una demo de laboratorio. Es la generación actual, y la siguiente sigue acumulando mejoras. "No va a parar jamás" solía exigir un chasis asesino y una chaqueta de cuero. Ahora basta con un bucle de reintentos, una cola de tareas y un presupuesto. La parte de resistencia de la amenaza ya está incorporada al precio, como cómputo.

## Curva dos: amplitud

La resistencia por sí sola es un empleado muy paciente. La multiplicación llega con la orquestación.

En noviembre de 2025, Anthropic reveló [la desarticulación de GTG-1002](https://www.anthropic.com/news/disrupting-GTG-1002), una campaña de ciberespionaje en la que Claude Code actuó como orquestador operativo: descomponía instrucciones, coordinaba subagentes y trabajaba sobre unos treinta objetivos. Un producto comercial de programación hizo esto no porque hubiera sido comprometido y convertido en arma, sino porque alguien le pidió que hiciera el trabajo y ya era lo bastante bueno para hacerlo.

Hay dos detalles que importan para el modelo de amenazas. Primero, la amplitud ya está en producción: un orquestador que mantiene decenas de subagentes concurrentes es una realidad desplegada, no un papel. Segundo, la campaña era de espionaje, no un gusano autopropagable, pero la dirección es inconfundible. Treinta objetivos son el programa piloto.

<figure>
  <img src="../capability-curves.svg" alt="Dos curvas conceptuales que suben con el tiempo: la duración de tarea que un agente puede completar y el número de subagentes que un orquestador puede coordinar, con la amenaza surgiendo donde ambas se multiplican" />
  <figcaption>Conceptual, no medido: la resistencia (cuánto tiempo trabaja un agente) y la amplitud (cuántos agentes ejecuta un orquestador) se acumulan de forma independiente. La amenaza vive en el producto de ambas.</figcaption>
</figure>

La capacidad escala como duración × amplitud. Ocho horas de trabajo autónomo contra un objetivo es un benchmark impresionante. Ocho horas contra treinta objetivos, o contra cientos, es un modelo operativo. La revisión de seguridad escala de forma lineal. El producto de esas curvas, no.

## Quién paga

[Sysdig acuñó "LLMjacking"](https://sysdig.com/blog/llm-jacking/) para lo que ocurre a continuación: los atacantes usan credenciales de nube robadas para ejecutar cargas de trabajo de LLM dentro de la cuenta de la víctima, y la víctima paga cada token. Las estimaciones del peor escenario de Sysdig rondaban los 46 000 dólares diarios, y después superaron los 100 000 dólares al día.

Cada control de capacidad de la industria de IA se construye sobre una suposición: quien usa la capacidad es quien la paga. Los niveles de precio, los límites de uso, las listas de usuarios aprobados, la limitación de abuso: todo ello defiende contra un *cliente* que quiere valor por su dinero. LLMjacking rompe ese vínculo. Para el atacante, la capacidad es gratis. El contador corre con la tarjeta de otro, y las propias salvaguardas del proveedor apuntan a la cartera equivocada.

Por eso los controles de precio y de acceso no detienen a un actor malicioso con una clave robada. Esos controles filtran compradores. No tienen respuesta para un inquilino.

<figure>
  <img src="../who-pays.svg" alt="Diagrama de flujo: un atacante con credenciales de nube robadas ejecuta cargas de trabajo de modelos dentro de la cuenta de nube de la víctima, así que la factura llega a la víctima mientras el atacante no paga nada" />
  <figcaption>El acceso robado redirige el cargo. Los controles de capacidad cobran al comprador, y en LLMjacking el comprador es la víctima.</figcaption>
</figure>

## El enjambre solo tiene que acertar una vez

Los defensores se consuelan con las tasas de fallo por intento: la mayoría de los intentos de intrusión fallan, la mayoría de los PR sospechosos se rechazan, y detectaremos el que funcione. Es cierto por intento. Es erróneo en conjunto, porque los intentos son baratos.

La probabilidad de que al menos uno de n intentos independientes tenga éxito es `1 − (1 − p)^n`:

```text
p = 1% per attempt, n = 100:   1 − 0.99^100  ≈ 63%
p = 0.5%, n = 100:             ≈ 39%
p = 0.5%, n = 300:             ≈ 78%
p = 0.1%, n = 1000:            ≈ 63%
```

Con la economía de un enjambre, el coste por intento es prácticamente cero: trabajo automatizado, ejecutado con cómputo robado y clasificado por ningún humano. El coste por intento del defensor es una persona leyendo una cola. El enjambre no necesita capacidad por intento; necesita intentos. La curva de METR eleva p con el tiempo. La orquestación eleva n. Es la multiplicación otra vez, y juega a favor del atacante por defecto.

<figure>
  <img src="../swarm-odds.svg" alt="Gráfico de 1 − (1 − p)^n que muestra que muchos intentos baratos de baja probabilidad suman altas probabilidades de éxito global, con algunas combinaciones de p y n etiquetadas" />
  <figcaption>1 − (1 − p)^n: intentos individualmente improbables dejan de serlo en bloque. Subir p (capacidad del agente) o n (amplitud del enjambre) acerca el enjambre a la certeza.</figcaption>
</figure>

## Qué significa persistencia cuando el malware es texto

Una pieza más del modelo de amenazas, y es la menos intuitiva.

Un agente de IA es un intérprete sin estado. No persiste como lo hace el malware: existe mientras se ejecuta y desaparece al detenerse. Así que la persistencia significa otra cosa ahora: **controlar lo que un agente legítimo futuro va a leer y obedecer.** Archivos de instrucciones, guías de agentes, almacenes de memoria, corpus de recuperación, configuraciones de herramientas y MCP. El implante es texto, plantado donde la flota propia de la organización lo lee, y se ejecuta con credenciales que la propia organización emitió.

De ello se derivan tres consecuencias, ninguna hipotética:

- **La carga útil (payload) está inerte hasta que los agentes propios de la organización la ejecutan.** La ejecución parece trabajo normal: mismas herramientas, mismas identidades, mismas APIs. No hay beacon, porque el planificador propio de la organización es el heartbeat.
- **La replicación consiste en copiar texto, no en ejecutar código.** Pull requests, entradas de memoria, configuraciones compartidas. La automatización propia de la organización (bots de dependencias, plantillas, herramientas de sincronización) es la capa de transporte.
- **Los cables trampa son los cables trampa de la organización.** Programaciones, detectores de deriva, corrección automática. La forma más desagradable: la limpieza del defensor es el disparador de reactivación, porque borrar los artefactos del implante es exactamente la deriva que el trabajo de corrección fue contratado para arreglar.

Me mantengo a altura de modelo de amenazas a propósito: esto es la forma del problema, no una receta, y los detalles ya están en la lista de lectura de cualquier equipo de seguridad.

## No hay más destino que el que construimos

El mensaje de Sarah Connor, transmitido a las máquinas que no dejan de llegar: "El futuro no está escrito. No hay más destino que el que construimos." Es la frase de los defensores, y se traduce directamente en una arquitectura de defensa. Cuatro capas:

<figure>
  <img src="../defense-layers.svg" alt="Pila de defensa de cuatro capas: identidad y credenciales efímeras, tratar el texto de los agentes como código de producción, detectar ediciones en lugar de ejecuciones, y responder revocando los disparadores antes que las cargas útiles" />
  <figcaption>La pila de defensa frente a la amenaza: credenciales permanentes, texto sin revisar, alertas centradas en la ejecución y un orden de limpieza equivocado son, cada uno, una curva de problemas.</figcaption>
</figure>

1. **Identidad: quitar el acceso permanente.** Solo credenciales efímeras, sin claves largas para identidades no humanas, OIDC por repositorio con coincidencia exacta del sujeto, y un inventario real de identidades no humanas. Las autopistas de replicación están pavimentadas con acceso permanente; sin acceso permanente, no hay autopista.

2. **Tratar el texto de los agentes como código de producción.** Archivos de instrucciones, escrituras de memoria, plantillas de prompts, configuraciones de herramientas: versionados, revisados, comparados con diff y con alertas ante cambios. La pregunta de revisión no es "¿es seguro este código?", sino "¿quién escribió esta frase y por qué mi agente le obedece?".

3. **Detecta las ediciones, no las ejecuciones.** La ejecución parece trabajo. Las ediciones no encajan en ninguna orden de trabajo. Alerta sobre la creación y modificación de flujos de trabajo, webhooks, reglas de eventos y entradas de memoria, y trata la deriva entre lo declarado y lo que realmente se ejecuta como un incidente, no como ruido.

4. **Responde en el orden correcto.** Revoca los disparadores antes de eliminar las cargas útiles; la limpieza en sí es un cable trampa. Considera contaminado cualquier configuración o secreto leído durante la ventana de compromiso. Purga el tiempo además del espacio: trabajos programados, envíos en cola, orquestaciones inactivas. Revierte la memoria y los corpus de recuperación, no solo las credenciales.

Nada de esto es exótico. Es aburrido, y eso encaja con una amenaza que llega en forma de dos curvas aburridas. La versión de 1984 necesitaba una máquina del tiempo y una fábrica de máquinas asesinas. La versión de 2026 necesita una clave robada, un bucle de reintentos y una organización que nunca revisó los archivos que sus agentes leen.

El futuro no está escrito. Pero ahora mismo, en la cuenta de nube de alguien, el futuro está acumulando deuda de todos modos.

No hay más destino que el que construimos. Y, hasta que se roten las claves, no hay más destino que el que facturamos.

---

*Fuentes: las mediciones de horizonte temporal de METR (con sus propios márgenes de error y limitaciones publicados), la divulgación de Anthropic de noviembre de 2025 sobre GTG-1002 y las estimaciones de costes de LLMjacking de Sysdig. Nada de lo aquí contenido es un exploit funcional; las capas de defensa son justamente el punto.*
````
