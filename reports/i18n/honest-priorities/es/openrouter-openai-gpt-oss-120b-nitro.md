# Translation Candidate
- Slug: honest-priorities
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-23--honest-priorities/es/index.mdx
- Validation: passed
- Runtime seconds: 13.10
- Input tokens: 7273
- Output tokens: 1714
- Thinking tokens: unknown
- Cached input tokens: 1792
- Cache write tokens: 0
- Estimated cost: $0.000592
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: La trampa de prioridad
subTitle: ¿Es la opción múltiple la mejor?
category: Thoughts
subCategory: Agile
date: '2024-10-23'
modified: '2024-10-24'
tags:
  - agile
  - leadership
  - priority
  - backlog
  - jira
cover: ../new-priority-city.webp
cover_full_width: ../new-priority-city.webp
cover_mobile: ../new-priority-city-w300.webp
cover_icon: ../new-priority-city-w200.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@mroz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Filip
  Mroz</a> on <a
  href="https://unsplash.com/photos/photo-of-tram-beside-waiting-station-during-nighttime-023T4jyCRqA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
---
## The `Priority` Dropdown Trap

<aside className="breakout">
💡 A medida que una organización crece, inevitablemente tendrá una acumulación de tareas cada vez mayor. Eventualmente, el tamaño de la lista *exigirá* priorización.
</aside>

## A Startup Story

Sin falta, tus administradores de Jira tendrán una solución: ¡un campo desplegable `Priority`! (Consejo de experto para desarrolladores empresariales: posiblemente llamado `Priority2` o `P-level`.)

Curiosamente, el 100 % de las empresas elige entre `P1, P2, P3, P4` o `Low, Med, High, and Critical` — aparentemente no existen otras opciones.

¿Una lista codificada de cuatro opciones? Bien. Probémosla durante unas semanas...

### 2 Días Después

En un giro *impactante‑para‑nadie*, la organización encontró un ticket con una prioridad nueva y más alta, lo que obligó a un parche menor: ¡añadir `P0`, o `Critical Max+`!

### 3 Días Más

*¡Nuestro intrépido jefe tuvo reuniones y descubrimientos emocionantes en la conferencia!*

¡De alguna forma descubrieron una prioridad aún mayor que `P0`!

Desde entonces, el equipo ha estado concentrado investigando cómo etiquetar esta nueva Priority.

Quizá `-1`? No, no. Eso es demasiado confuso (`P-1` vs. `P1`). Vale, ¿y `P0.5`, no?

<p className="breakout">En un momento “inspirado”, el equipo inventó una prioridad más alta: ¡el doble‑cero!<br />Ahora conocida como la Prioridad `P00`.</p>

{/* *Finalmente, podemos etiquetar ordenadamente todo en el mundo en nuestro menú desplegable de Prioridades! (…risa malvada…)* */}

### Antes del Diluvio

Antes de que alguien se dé cuenta, ¡tu equipo está ahogado en tickets `P00`!

<b>¿Cómo podemos evitar este juego tonto de Teatro de Ingeniería?</b>

## ¿Y si la Prioridad no fuera de opción múltiple?

¿Cómo podríamos representar mejor un concepto humano siempre cambiante y fluido como `Priority`?

- En el mundo real, las prioridades se desplazan y evolucionan constantemente según nueva información, cambios de mercado y objetivos organizacionales.  
- A menudo hay una interacción compleja entre urgencia, importancia, disponibilidad de recursos y análisis de costo/riesgo que un simple desplegable no puede capturar, sobre todo con el paso del tiempo. (Descomposición de tickets.)  
- Diferentes partes interesadas pueden tener opiniones conflictivas sobre qué constituye una alta prioridad, lo que hace que un enfoque único para todos sea inadecuado.

## Entonces, ¿qué sigue?

Hay varias alternativas que vale la pena explorar, de bajo a alto esfuerzo:

- Para disponer de más margen y flexibilidad, elige un valor “neutral” de partida, por ejemplo 100 o 1 000. Siempre puedes aumentar o disminuir el número.  
    - O bien comienza con cero, donde los números mayores indican mayor prioridad.  
- Implementa un sistema de priorización multidimensional que considere factores como valor de negocio, urgencia y esfuerzo requerido. (Crea una puntuación `composite` para facilitar la ordenación y el filtrado.)  
- Adopta un método de priorización dinámico, como la [técnica MoSCoW](https://en.wikipedia.org/wiki/MoSCoW_method) (Must have, Should have, Could have, Won't have), que permite una reevaluación regular. (Véase también el [Modelo Kano](https://en.wikipedia.org/wiki/Kano_model).)

## Resumen

Se le asigna demasiado peso a la Prioridad a pesar de su rápida tasa de degradación. Los tickets `CRITICAL` de ayer no van a ser probablemente los tickets `CRITICAL` del próximo trimestre.

Con el tiempo, los tickets de alta prioridad más antiguos se vuelven resistentes a la depuración y al mantenimiento. Después de todo, ¿quién quiere bajar la `Priority` de algo que ya se declaró ***esencial***? Ni hablar de eliminar esos tickets irrelevantes… (¡Uf! ¡Piensa en la acumulación!)

He visto a varias empresas confundir `Severity` y `Priority`. `Severity` describe la ***urgencia*** (o la sensibilidad al tiempo).

`Priority ≠ Severity`. Puede tener sentido definir de 3 a 5 niveles de severidad (a menudo usados para mantener Acuerdos de Nivel de Servicio).

Los niveles de urgencia ayudan a comunicar `cero impacto al cliente` frente a una `interrupción parcial/completa del servicio`.

## Una palabra de precaución

¡Desplegar un campo de Prioridad sin límites requiere algo de planificación y disciplina!

Si estás familiarizado con el desarrollo front‑end, quizá hayas vivido una guerra de `z-index`.

Básicamente, `z-index` permite a los diseñadores asignar *cualquier* entero positivo para garantizar que sus widgets se muestren “por encima” de otro contenido con un `z-index` menor.

Incluso una actualización menor de un componente podría introducir un cambio en el `z-index` de su `<Dialog />`, haciéndolo desaparecer de repente. Estas situaciones pueden volverse caóticas cuando nuestros componentes de terceros, el trabajo de nuevas funcionalidades y las contribuciones de otros equipos intentan superarse mutuamente en `z-index`.

`Z-index` estuvo limitado alguna vez a ~32 000. Sin embargo, recientemente vi un fragmento con un billón de `z-index: 1000000000`.

La inflación debe estar golpeando duramente a `z-index`.

## Discusión

- ¿Es este un experimento mental que vale la pena?
- ¿Resulta horrorosa la idea de una prioridad que nunca deja de crecer? ¿Genera ansiedad?
- ¿Es inevitable que este enfoque eventualmente supere los límites de un entero de 64 bits?
- ¿Pueden otros campos (más allá de `Severity` o `Urgency`) aportar a esta conversación?
- ¿Cuánta culpa merece Jira? ¿O crédito?

Podríamos gritar al internet: “¿Quién va a limpiar todos estos tickets `P00`?”

O, puedes ponerte ***real*** con tu backlog.

- Acepta que el 90 % de tus 1 000 tickets nunca se completarán. Está bien.
- Archiva los tickets que hayan estado sin tocar durante meses. La prioridad/urgencia inicial ya no es aplicable. De todos modos, los tickets archivados a menudo pueden recuperarse.
- Cuando un issue vuelve, está bien; simplemente aumentó su prioridad.
- Anécdotamente, no he visto ningún daño al descartar tickets más antiguos e incompletos.
- Seguir añadiendo indefinidamente a un backlog‑como‑base de datos pierde la oportunidad de enfocar a tu equipo y organización en lo que realmente importa. (Cosas que están por delante. Mientras que los backlogs tienden a mirar hacia atrás.)
- Un backlog profundo termina pareciéndose a una Sala de Trofeos Bizzaro, celebrando la mierda que nunca lanzarás.
````
