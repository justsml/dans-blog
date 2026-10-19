# Translation Candidate
- Slug: no-fate-but-what-we-bill
- Locale: es
- Model: openrouter/openai/gpt-6.1-sol
- Target: src/content/posts/2026-10-14--no-fate-but-what-we-bill/es/index.mdx
- Validation: deferred
- Runtime seconds: 60.72
- Input tokens: 14278
- Output tokens: 3229
- Thinking tokens: unknown
- Cached input tokens: 7321
- Cache write tokens: 6939
- Estimated cost: $0.050406
- Pricing source: openrouter-2026-10-16
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: No hay más destino que el que facturamos
subTitle: >-
  Los agentes trabajan cada vez más tiempo, los enjambres abarcan cada vez más y
  las claves de nube robadas cargan la factura del cómputo a la víctima.
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
«Escucha y entiende. Ese terminator anda suelto. No puedes negociar con él.
No puedes razonar con él. No siente lástima, ni remordimientos, ni miedo. Y
no se detendrá ante nada, jamás, hasta que estés muerto».

Kyle Reese, explicándole al público de 1984 a qué amenaza se enfrentaba.

La frase que ha envejecido bien no es el recuento de muertos. Es «no se detendrá
ante nada». Terminator nunca daba miedo por ser inteligente. Daba miedo porque
seguía funcionando cuando todo lo demás había fallado. La resistencia era la amenaza.

Luego la franquicia corrigió su propio error. Nadie se pasa tres películas temiendo
a un solo robot. Skynet es el verdadero villano: un sistema distribuido con núcleos,
fábricas y equipos de desplazamiento temporal. El robot es una llamada a la API.

En 2026 llegaron ambas mitades, de las formas menos cinematográficas imaginables.
Agentes capaces de completar tareas de varias horas sin supervisión humana constante,
siguiendo una curva cada vez más pronunciada. Orquestadores que reparten el trabajo
entre decenas de subagentes. Y «no se detendrá ante nada» ahora se lee como
«no dejará de facturar ante nada».

Este artículo recoge el argumento que no dejo de repetir a los equipos que han concluido
que la amenaza de los agentes es puro bombo: **no viene ningún avance decisivo aislado.
En su lugar, se multiplican dos curvas corrientes que acumulan crecimiento: cuánto tiempo
puede trabajar un agente y cuántos agentes puede coordinar un orquestador. Ninguna necesita
alcanzar niveles de ciencia ficción, porque el atacante no compra capacidad a precio de
tarifa. Roba el acceso y la víctima paga el consumo.**

## Primera curva: resistencia

[El trabajo de METR sobre el horizonte temporal](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)
mide la duración de las tareas que los agentes pueden completar con una tasa de éxito dada.
En resumen: la duración de las tareas se ha ido duplicando aproximadamente cada siete
meses, y desde 2024, más bien cada cuatro meses. Esas cifras tienen márgenes de error amplios
y la prueba de referencia ya está rozando su límite de medición.
Fíjate en la forma de la curva, no en las estimaciones puntuales.

La forma dice esto: el trabajo autónomo de varias horas no es una demostración de laboratorio.
Es la generación actual, y la siguiente sigue acumulando avances. Antes, «no se detendrá
ante nada» exigía un chasis asesino y una chaqueta de cuero. Ahora exige un bucle
de reintentos, una cola de tareas y un presupuesto. La resistencia como parte de la amenaza
ya tiene precio: el del cómputo.

## Segunda curva: amplitud

La resistencia por sí sola equivale a un empleado muy paciente. La multiplicación viene
de la orquestación.

En noviembre de 2025, Anthropic anunció que había
[desarticulado GTG-1002](https://www.anthropic.com/news/disrupting-GTG-1002),
una campaña de ciberespionaje en la que Claude Code actuó como orquestador operativo:
descomponiendo instrucciones, coordinando subagentes y trabajando
contra unos treinta objetivos. Un producto comercial de programación hizo esto no
porque lo hubieran comprometido para convertirlo en un arma, sino porque alguien le pidió
que hiciera el trabajo y ya era lo bastante competente para hacerlo.

Dos detalles importan para el modelo de amenazas. Primero, la amplitud ya está en producción:
un orquestador que mantiene decenas de subagentes simultáneos es una realidad desplegada,
no un artículo académico. Segundo, la campaña era de espionaje, no un gusano que se propagara
por sí solo, pero la dirección es inequívoca. Treinta objetivos son el programa piloto.

<figure>
  <img src="../capability-curves.svg" alt="Dos curvas conceptuales que crecen con el tiempo: la duración de las tareas que un agente puede completar y el número de subagentes que un orquestador puede coordinar; la amenaza surge al multiplicarlas" />
  <figcaption>Esquema conceptual, no mediciones: la resistencia (cuánto tiempo trabaja un agente) y la amplitud (cuántos agentes ejecuta un orquestador) crecen de forma acumulativa e independiente. La amenaza está en el producto de ambas.</figcaption>
</figure>

La capacidad escala como duración × amplitud. Ocho horas de trabajo autónomo
contra un objetivo son un resultado impresionante en una prueba. Ocho horas contra treinta
objetivos, o cientos, son un modelo operativo. La revisión de seguridad escala
linealmente. El producto de esas curvas, no.

## Quién paga

[Sysdig acuñó «LLMjacking»](https://sysdig.com/blog/llm-jacking/) para lo que
ocurre después: los atacantes usan credenciales de nube robadas para ejecutar cargas
de trabajo de LLM dentro de la cuenta de la víctima, y la víctima paga cada token. Las
estimaciones de Sysdig para el peor caso rondaban los 46.000 dólares al día; más tarde
superaron los 100.000 dólares diarios.

Todos los controles de capacidad de la industria de la IA parten de un supuesto:
quien usa la capacidad es quien la paga. Tarifas por niveles, límites de uso,
listas de usuarios autorizados, restricciones ante abusos... Todo eso protege frente a un
*cliente* que quiere rentabilizar su dinero. El LLMjacking rompe ese vínculo. Para el
atacante, la capacidad es gratis. El consumo se carga a la tarjeta de otro,
y las propias medidas de protección del proveedor apuntan a la cartera equivocada.

Por eso las barreras de precio y acceso no detienen a un atacante con una clave robada.
Las barreras filtran compradores. No tienen respuesta para quien ya está dentro.

<figure>
  <img src="../who-pays.svg" alt="Diagrama de flujo: un atacante con credenciales de nube robadas ejecuta cargas de trabajo de modelos en la cuenta de nube de la víctima; la factura llega a la víctima y el atacante no paga nada" />
  <figcaption>El acceso robado desvía el cargo. Los controles de capacidad cobran al comprador; en el LLMjacking, el comprador es la víctima.</figcaption>
</figure>

## Al enjambre le basta con acertar una vez

Los defensores se consuelan con las tasas de fracaso por intento: la mayoría de los intentos
de intrusión fracasan, la mayoría de las PR sospechosas se rechazan, detectaríamos la que
funcionara. Cierto por intento. Falso en conjunto, porque intentarlo sale barato.

La probabilidad de que al menos uno de n intentos independientes tenga éxito es
`1 − (1 − p)^n`:

```text
p = 1% per attempt, n = 100:   1 − 0.99^100  ≈ 63%
p = 0.5%, n = 100:             ≈ 39%
p = 0.5%, n = 300:             ≈ 78%
p = 0.1%, n = 1000:            ≈ 63%
```

Con la economía del enjambre, el coste por intento es prácticamente cero: trabajo
automatizado, ejecutado con cómputo robado, sin que ningún humano evalúe los resultados.
El coste por intento del defensor es una persona revisando una cola. El enjambre no necesita
capacidad en cada intento; necesita intentos. La curva de METR eleva p con el tiempo.
La orquestación eleva n. Otra vez la multiplicación, que por defecto acumula
ventaja para el atacante.

<figure>
  <img src="../swarm-odds.svg" alt="Gráfica de 1 − (1 − p)^n que muestra cómo muchos intentos baratos de baja probabilidad suman una alta probabilidad de éxito global, con varias combinaciones de p y n etiquetadas" />
  <figcaption>1 − (1 − p)^n: los intentos improbables por separado dejan de serlo en masa. Aumentar p (capacidad del agente) o n (amplitud del enjambre) acerca al enjambre a la certeza.</figcaption>
</figure>

## Qué significa la persistencia cuando el malware es texto

Una pieza más del modelo de amenazas, y es la menos intuitiva.

Un agente de IA es un intérprete sin estado. No persiste como el malware:
existe mientras se ejecuta y desaparece cuando se detiene. Así que la persistencia
ahora significa algo distinto: **controlar lo que un futuro agente legítimo
leerá y obedecerá.** Archivos de instrucciones, directrices para agentes, almacenes de memoria,
corpus de recuperación, configuraciones de herramientas y MCP. El implante es texto, colocado donde
lee la propia flota de la organización y ejecutado con credenciales que ella misma ha emitido.

De ahí se derivan tres consecuencias, ninguna hipotética:

- **El payload permanece inerte hasta que los propios agentes de la organización lo ejecutan.** La ejecución
  parece trabajo normal: mismas herramientas, mismas identidades, mismas API. No hay
  beacon, porque el propio planificador de la organización es el heartbeat.
- **Replicarse consiste en conseguir que se copie texto, no que se ejecute código.** Pull
  requests, entradas de memoria, configuraciones compartidas. La propia automatización de la organización
  —bots de dependencias, plantillas, herramientas de sincronización— es la capa de transporte.
- **Los cables trampa son los de la propia organización.** Tareas programadas, detectores de deriva,
  corrección automática. La variante más perversa: la limpieza del defensor es el
  detonante de la reactivación, porque borrar los artefactos del implante es precisamente
  la deriva que la tarea de corrección tiene encomendada subsanar.

Me mantengo a propósito en el nivel del modelo de amenazas: esto describe la forma del
problema, no es una receta, y los detalles ya figuran en las lecturas pendientes de cualquier equipo de seguridad.

## No hay más destino que el que construimos

El mensaje de Sarah Connor, transmitido a las máquinas que no dejan de llegar: «El
futuro no está escrito. No hay más destino que el que construimos». Es la frase de los defensores,
y se traduce directamente en una arquitectura de defensa. Cuatro capas:

<figure>
  <img src="../defense-layers.svg" alt="Pila de defensa de cuatro capas: identidad y credenciales efímeras, tratar el texto de los agentes como código de producción, detectar ediciones en vez de ejecuciones y responder revocando los disparadores antes que los payloads" />
  <figcaption>La pila de defensa frente a cada amenaza: credenciales permanentes, texto sin revisar, alertas centradas en la ejecución y limpieza en el orden equivocado. Cada una arrastra una curva entera de problemas.</figcaption>
</figure>

1. **Identidad: corta el acceso permanente.** Solo credenciales efímeras,
   nada de claves no humanas de larga duración, OIDC por repositorio con coincidencia exacta del sujeto
   y un inventario de verdad de las identidades no humanas. Las autopistas de replicación están
   pavimentadas con acceso permanente; sin acceso permanente, no hay autopista.

2. **Trata el texto de los agentes como código de producción.** Archivos de instrucciones, escrituras
   en memoria, plantillas de prompts, configuraciones de herramientas: con control de versiones, revisión, comparación de cambios
   y alertas de modificación. La pregunta en la revisión no es «¿es seguro este código?»,
   sino «¿quién ha escrito esta frase y por qué la obedece mi agente?».

3. **Detecta modificaciones, no ejecuciones.** La ejecución parece trabajo normal. Las modificaciones
   no encajan en ninguna orden de trabajo. Genera alertas ante la creación y modificación de
   flujos de trabajo, webhooks, reglas de eventos y entradas de memoria, y trata la deriva
   entre el estado declarado y el de ejecución como un incidente, no como ruido.

4. **Responde en el orden correcto.** Revoca los disparadores antes de eliminar
   los payloads: la propia limpieza es un cable trampa. Trata cualquier configuración o secreto leído
   durante la ventana de compromiso como contaminado. Purga tanto el tiempo como el espacio:
   tareas programadas, envíos en cola, orquestaciones inactivas. Revierte la memoria
   y los corpus, no solo las credenciales.

Nada de esto es exótico. Es aburrido, y es lo que corresponde a una amenaza
que llega en forma de dos curvas aburridas. La versión de 1984 necesitaba una máquina del tiempo y una
fábrica de máquinas de matar. La de 2026 necesita una clave robada, un bucle
de reintentos y una organización que nunca haya revisado los archivos que leen sus agentes.

El futuro no está escrito. Pero ahora mismo, en la cuenta de nube de alguien, el
futuro sigue engordando la factura de todos modos.

No hay más destino que el que construimos; y, hasta que se roten las claves, no hay más destino que
el que facturamos.

---

*Fuentes: las mediciones del horizonte temporal de METR (con sus propias barras de error
y limitaciones publicadas), la divulgación de Anthropic sobre GTG-1002 de noviembre de 2025 y las
estimaciones de costes del LLMjacking de Sysdig. Nada de lo expuesto aquí es un exploit funcional; las capas de
defensa son precisamente el objetivo.*
````
