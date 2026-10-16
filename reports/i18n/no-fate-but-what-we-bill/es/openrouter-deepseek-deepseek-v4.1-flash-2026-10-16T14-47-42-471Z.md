# Translation Candidate
- Slug: no-fate-but-what-we-bill
- Locale: es
- Model: openrouter/deepseek/deepseek-v4.1-flash
- Target: src/content/posts/2026-10-14--no-fate-but-what-we-bill/es/index.mdx
- Validation: deferred
- Runtime seconds: 46.45
- Input tokens: 14590
- Output tokens: 18068
- Thinking tokens: unknown
- Cached input tokens: 7168
- Cache write tokens: 0
- Estimated cost: $0.023951
- Pricing source: openrouter-2026-10-16
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
"Escucha y comprende. Ese terminator está ahí fuera. No se puede negociar con él. No se puede razonar con él. No siente piedad, ni remordimiento, ni miedo. Y no se detendrá absolutamente nunca, hasta que estés muerto."

Kyle Reese, informando a una audiencia de 1984 sobre la forma de la amenaza.

La frase que envejeció bien no es el recuento de muertes. Es "absolutamente no se detendrá". El Terminator nunca dio miedo por ser inteligente. Daba miedo porque seguía funcionando después de que todo lo demás hubiera fallado. La resistencia era la amenaza.

Luego la franquicia corrigió su propio error. Nadie pasa tres películas temiendo a un solo robot. Skynet es el verdadero villano: un sistema distribuido con núcleos, fábricas y equipos de desplazamiento temporal. El robot es una llamada a la API.

En 2026 ambas mitades llegaron, en las formas menos cinematográficas imaginables. Agentes que pueden realizar tareas de varias horas sin supervisión humana, en una curva que no deja de empinarse. Orquestadores que reparten el trabajo entre subagentes por docenas. Y "absolutamente no se detendrá" ahora se lee como "absolutamente no dejará de facturar".

Este artículo es el argumento que sigo presentando a los equipos que han concluido que la amenaza agéntica es hype: **no se acerca ningún avance único. En su lugar, dos curvas ordinarias y compuestas se están multiplicando: cuánto tiempo puede trabajar un agente y cuántos agentes puede coordinar un orquestador. Ninguna necesita alcanzar niveles de ciencia ficción, porque el atacante no compra capacidad a precio de lista. Roba acceso, y la víctima paga el medidor.**

## Curva uno: resistencia

[El trabajo de METR sobre el horizonte temporal](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) mide la duración de las tareas que los agentes pueden completar con una tasa de éxito dada. La versión corta: la duración de las tareas se ha estado duplicando aproximadamente cada siete meses, y más cerca de cada cuatro meses desde 2024. Esos números tienen amplios márgenes de error y el benchmark ya está tensando su límite de medición. Lee la forma de la curva, no las estimaciones puntuales.

La forma dice: el trabajo autónomo de varias horas no es una demo de laboratorio. Es la generación actual, y la siguiente no deja de acumularse. "Absolutamente no se detendrá" solía requerir un chasis asesino y una chaqueta de cuero. Ahora requiere un bucle de reintentos, una cola de tareas y un presupuesto. La parte de resistencia de la amenaza ya está valorada, como cómputo.

## Curva dos: amplitud

La resistencia por sí sola es un empleado muy paciente. La multiplicación proviene de la orquestación.

En noviembre de 2025, Anthropic reveló [la desarticulación de GTG-1002](https://www.anthropic.com/news/disrupting-GTG-1002), una campaña de ciberespionaje en la que Claude Code actuó como orquestador operativo: descomponiendo instrucciones, coordinando subagentes y operando en aproximadamente treinta objetivos. Un producto comercial de programación hizo esto no porque fuera comprometido para convertirse en un arma, sino porque alguien le pidió que hiciera el trabajo y ahora era lo suficientemente bueno para hacerlo.

Dos detalles importan para el modelo de amenazas. Primero, la amplitud ya está desplegada: un orquestador que mantiene docenas de subagentes concurrentes es una realidad desplegada, no un paper. Segundo, la campaña era espionaje, no un gusano autorreplicante, pero la dirección es inconfundible. Treinta objetivos es el programa piloto.

<figure>
  <img src="../capability-curves.svg" alt="Dos curvas conceptuales que ascienden con el tiempo: la duración de la tarea que un agente puede completar y el número de subagentes que un orquestador puede coordinar, con la amenaza emergiendo donde ambas se multiplican" />
  <figcaption>Conceptual, no medido: la resistencia (cuánto tiempo trabaja un agente) y la amplitud (cuántos agentes ejecuta un orquestador) se componen de forma independiente. La amenaza vive en el producto de las dos.</figcaption>
</figure>

La capacidad escala como duración × amplitud. Ocho horas de trabajo autónomo contra un objetivo es un benchmark impresionante. Ocho horas contra treinta objetivos, o cientos, es un modelo operativo. La revisión de seguridad escala linealmente. El producto de esas curvas no.

## Quién paga

[Sysdig acuñó "LLMjacking"](https://sysdig.com/blog/llm-jacking/) para lo que sucede después: los atacantes usan credenciales de nube robadas para ejecutar cargas de trabajo LLM dentro de la cuenta de la víctima, y la víctima paga por cada token. Las estimaciones del peor caso de Sysdig rondaban los $46k por día, y luego superaron los $100k por día.

Cada control de capacidad en la industria de la IA se basa en una suposición: la parte que usa la capacidad es la parte que paga por ella. Niveles de precios, límites de uso, listas de usuarios aprobados, limitación de abusos: todo ello defiende contra un *cliente* que quiere relación calidad-precio. LLMjacking corta ese vínculo. Para el atacante, la capacidad es gratuita. El medidor corre en la tarjeta de otro, y las propias barreras del proveedor apuntan a la cartera equivocada.

Por eso las barreras de precio y acceso no detienen a un actor malicioso con una clave robada. Las barreras filtran compradores. No tienen respuesta para un tenant.

<figure>
  <img src="../who-pays.svg" alt="Diagrama de flujo: un atacante con credenciales de nube robadas ejecuta cargas de trabajo de modelos dentro de la cuenta de nube de la víctima, así que la factura se dirige a la víctima mientras el atacante no paga nada" />
  <figcaption>El acceso robado redirige el cargo. Los controles de capacidad le cobran al comprador — y en LLMjacking, el comprador es la víctima.</figcaption>
</figure>

## Al enjambre le basta con acertar una vez

Los defensores se consuelan con las tasas de fallo por intento: la mayoría de los intentos de intrusión fallan, la mayoría de los PRs sospechosos se rechazan, detectaríamos el que funciona. Cierto por intento. Incorrecto en conjunto, porque los intentos son baratos.

La probabilidad de que al menos uno de n intentos independientes tenga éxito es `1 − (1 − p)^n`:

```text
p = 1% per attempt, n = 100:   1 − 0.99^100  ≈ 63%
p = 0.5%, n = 100:             ≈ 39%
p = 0.5%, n = 300:             ≈ 78%
p = 0.1%, n = 1000:            ≈ 63%
```

Con la economía del enjambre, el coste por intento es aproximadamente cero: trabajo automatizado, ejecutado sobre cómputo robado, sin que ningún humano lo clasifique. El coste por intento del defensor es una persona leyendo una cola. El enjambre no necesita capacidad por intento; necesita intentos. La curva de METR eleva p con el tiempo. La orquestación eleva n. Es la multiplicación otra vez, y por defecto se capitaliza a favor del atacante.

<figure>
  <img src="../swarm-odds.svg" alt="Gráfico de 1 − (1 − p)^n que muestra que muchos intentos baratos de baja probabilidad suman altas probabilidades de éxito global, con algunas combinaciones de p y n etiquetadas" />
  <figcaption>1 − (1 − p)^n: los intentos individualmente improbables dejan de ser improbables en masa. Elevar p (capacidad del agente) o n (amplitud del enjambre) acerca al enjambre a la certeza.</figcaption>
</figure>

## Qué significa la persistencia cuando el malware es texto

Una pieza más del modelo de amenazas, y es la menos intuitiva.

Un agente de IA es un intérprete sin estado. No persiste como lo hace el malware: existe mientras se ejecuta y desaparece cuando se detiene. Así que la persistencia significa algo distinto ahora: **controlar lo que un futuro agente legítimo leerá y obedecerá.** Archivos de instrucciones, directrices de agentes, almacenes de memoria, corpus de recuperación, configuraciones de herramientas y MCP. El implante es texto, plantado donde lo lee la propia flota de la organización, ejecutado con credenciales que la propia organización emitió.

Se derivan tres consecuencias, ninguna hipotética:

- **El payload es inerte hasta que los propios agentes de la organización lo ejecutan.** La ejecución parece trabajo normal: mismas herramientas, mismas identidades, mismas API. No hay beacon, porque el propio planificador de la organización es el heartbeat.
- **La replicación significa conseguir que se copie texto, no que se ejecute código.** Pull requests, entradas de memoria, configuraciones compartidas. La propia automatización de la organización — bots de dependencias, plantillas, herramientas de sincronización — es la capa de transporte.
- **Los cables trampa son los de la propia organización.** Planificaciones, detectores de deriva, corrección automática. La forma más desagradable: la limpieza del defensor es el desencadenante de la reactivación, porque borrar los artefactos del implante es exactamente la deriva que el trabajo de corrección fue contratado para arreglar.

Me mantengo a propósito a la altitud del modelo de amenazas: esta es la forma del problema, no una receta, y los detalles ya están en la lista de lectura de todos los equipos de seguridad.

## No hay más destino que el que construimos

El mensaje de Sarah Connor, transmitido a las máquinas que no dejan de llegar: «El futuro no está decidido. No hay más destino que el que construimos.» Es la frase de los defensores, y se convierte directamente en una arquitectura de defensa. Cuatro capas:

<figure>
  <img src="../defense-layers.svg" alt="Pila de defensa de cuatro capas: identidad y credenciales efímeras, tratar el texto de los agentes como código de producción, detectar ediciones en lugar de ejecuciones y responder revocando desencadenantes antes que payloads" />
  <figcaption>La pila de defensa mapeada a la amenaza: credenciales permanentes, texto sin revisar, alertas con forma de ejecución y una limpieza en el orden equivocado son, cada una, una curva entera de problemas.</figcaption>
</figure>

1. **Identidad: corta el grifo al acceso permanente.** Solo credenciales efímeras, nada de claves no humanas de larga duración, OIDC por repositorio con coincidencia exacta de sujeto, y un inventario real de identidades no humanas. Las autopistas de replicación están pavimentadas con acceso permanente; sin acceso permanente, no hay autopista.

2. **Trata el texto de los agentes como código de producción.** Archivos de instrucciones, escrituras en memoria, plantillas de prompts, configuraciones de herramientas: versionados, revisados, con diff y con alertas de cambios. La pregunta de revisión no es «¿este código es seguro?», sino «¿quién escribió esta frase, y por qué mi agente la obedece?».

3. **Detecta ediciones, no ejecuciones.** La ejecución parece trabajo. Las ediciones no encajan en ninguna orden de trabajo. Genera alertas ante la creación y modificación de flujos de trabajo, webhooks, reglas de eventos y entradas de memoria, y trata la deriva entre lo declarado y lo en ejecución como un incidente, no como ruido.

4. **Responde en el orden correcto.** Revoca los desencadenantes antes de eliminar payloads: la limpieza es en sí misma un cable trampa. Trata cualquier lectura de configuración o secreto durante la ventana de compromiso como contaminada. Purga el tiempo además del espacio: trabajos programados, envíos en cola, orquestaciones inactivas. Revierte memoria y corpus, no solo credenciales.

Nada de esto es exótico. Es aburrido, y esa es la respuesta para una amenaza que llega como dos curvas aburridas. La versión de 1984 necesitaba una máquina del tiempo y una fábrica de máquinas asesinas. La de 2026 necesita una clave robada, un bucle de reintentos y una organización que nunca revisó los archivos que leen sus agentes.

El futuro no está fijado. Pero ahora mismo, en la cuenta de nube de alguien, el futuro está acumulando una factura en cualquier caso.

No hay más destino que el que construimos, y, hasta que se roten las claves, no hay más destino que el que facturamos.

---

*Fuentes: las mediciones de horizonte temporal de METR (con sus propias barras de error y límites publicados), la divulgación GTG-1002 de Anthropic de noviembre de 2025 y las estimaciones de costes de LLMjacking de Sysdig. Nada de esto es un exploit funcional; las capas de defensa son lo esencial.*
````
