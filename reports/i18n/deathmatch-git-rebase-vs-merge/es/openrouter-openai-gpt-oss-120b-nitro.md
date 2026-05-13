# Translation Candidate
- Slug: deathmatch-git-rebase-vs-merge
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/es/index.mdx
- Validation: passed
- Runtime seconds: 13.61
- Input tokens: 8592
- Output tokens: 2175
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000727
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Duelo: Git Rebase vs. Merge'
subTitle: Una pregunta atemporal...
date: '2023-08-27'
modified: '2024-07-28'
tags:
  - engineering
  - git
  - rebase
  - merge
category: Thoughts
subCategory: Git
cover: ../casper-johansson-GBHnQXbY2Ts-unsplash-cropped.webp
cover_mobile: ../w300_casper-johansson-GBHnQXbY2Ts-unsplash-cropped.webp
cover_icon: ../icon_casper-johansson-GBHnQXbY2Ts-unsplash-cropped.webp
---
## Deathmatch: Git Rebase vs. (Squash) Merge!

¿Debo hacer Rebase? ¿O Squash Merge?

- ¿Es una preferencia personal?
  - _Respuesta: No cuando interviene uno o más equipos! **¡Cualquiera de las dos opciones afectará la usabilidad** de la otra!_

### ¿Por qué este tema genera fervor religioso?

Algunos ingenieros usan su conocimiento de git (y la terminal) como señal de su nivel de habilidad relativo. Cualquier práctica que esté ligada a nuestra identidad/ego puede ser imposible de analizar de forma imparcial, y mucho menos de cambiar.

Otros factores probablemente incluyen la familiaridad y el sesgo de supervivencia, que pueden enturbiar aún más nuestra propia evaluación y suposiciones.

<!-- Creencia equivocada en la virtud inherente de los procesos de ciertos proyectos OSS. (El Kernel de Linux usa rebase, y si no lo haces, **_¿¡AcTuAlMeNtE ErEs Un EnGiNeErO?¡_**) -->

### Pregunta clave: ¿Cuál es el propósito de un commit de git?

1.  ¿Commitas temprano y con frecuencia? ¿Con una mentalidad de “punto de control” o respaldo?
    - ¿Donde todo queda registrado, incluso los intentos fallidos y experimentos? (p. ej. `git commit -am "Updated deps" && git push`, repetir regularmente)
    - ¿Tal vez los mensajes de commit son menos importantes que el código para ti?
2.  ¿O tus commits son una obra de arte cuidadosamente curada y esculpida?
    - ¿Quizá cada commit es una unidad de trabajo autocontenida y atómica? (p. ej. `git add package.json && git commit -m "Updated deps"`)
    - ¿O simplemente no puedes tolerar historiales de commit “desordenados”?
    - ¿Tus revisiones de PR suelen implicar revisar commit por commit?

| 💡 ¿Qué otro(s) modelo(s) mental(es) definen cómo ves los commits? ¡Hazmelo saber @justsml!

¿Estás pensando en git de una forma que **brinde el mayor valor** a ti, a tu equipo y a tu organización?

<!-- Lo que tiene sentido para un proyecto de código abierto como Postgres, o el Kernel de Linux, puede no ser la mejor elección para ti o tu equipo. -->

Dado que existen mentalidades muy distintas respecto a la estrategia de commits, no es sorprendente que haya tanta confusión sobre la “forma correcta” de usar git.

### Escenario: Crear una etiqueta de release revisada

Comparemos el proceso de crear una etiqueta de release excluyendo algunos commits recientes en `main`.

![Git Tag Releasing from main with 2 feature branches](../git-branching-with-main-simplified.svg)

### El camino del rebase

Modelo mental: “Quiero crear una versión alternativa de una historia existente. (p. ej., cometí un error hace 16 merges y necesito un control fino para corregirlo. Además, podría quedarme atrapado en un ciclo aparentemente interminable de conflictos y `--continue`).”

1.  Obtén lo último: `git checkout main` && `git pull`
2.  Crea una rama nueva: `git checkout -b release/hot-newness-and-stuff`
3.  Inicia un rebase interactivo e incluye la referencia git del punto al que quieres retroceder. `git rebase -i HEAD~6` (Nota: `HEAD~6` es la forma abreviada de referirse a “6 commits atrás”)
4.  Elimina los commit(s) deseados cambiando su prefijo a `drop`. Guarda y cierra el editor.
5.  Resuelve los conflictos de merge, `git add .` && `git rebase --continue` (NO hagas `git commit`).
6.  Repite el paso anterior hasta terminar.
7.  Etiqueta y empuja usando el proceso actual. Por ejemplo `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

#### Pros

- 🔌 Poder absoluto. Puedes reescribir la historia.
  <!-- - 🎭 Practice your Engineering Theater skills. -->

#### Contras

- 😰 Poder absoluto. Puedes reescribir la historia. (Vale, es tanto Pro como Con...)
- 🔂 Puedes quedar atrapado en un ciclo aparentemente interminable de conflictos y `—-continue`. (A veces incluso con `git rerere`)
- 🙀 Rompe funcionalidades clave de colaboración: comentarios de PR perdidos o huérfanos. Grosero.
- 🖇️ Los permalinks pueden dejar de ser tan permanentes.

### El camino del (Squash) Merge

Modelo mental: “Quiero una versión personalizada, partiendo de un punto dado e incluyendo cualquier rama(s) deseada(s).”

1.  Obtener lo último: `git checkout main` && `git pull`
2.  Crear una nueva rama: `git checkout -b release/hot-newness-and-stuff`
3.  Fusionar las ramas y/o commits deseados: `git merge --no-ff feature/hot-newness bug/fix-123` (usa la bandera `--no-ff` siempre que sea posible.)
4.  Resolver cualquier conflicto de fusión (si aparece.)
5.  Etiquetar/empujar usando el proceso actual. Por ejemplo `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

#### Pros

- 💪 Menos proceso, menos conflictos en general, y aprovecha el conocimiento existente de los comandos de git.
- 🚀 Te permite pensar a nivel de PR/rama, sin preocuparte por la granularidad de cada commit (a menos que sea necesario.)
- 🦺 No destructivo. Puedes volver atrás y/o crear nuevas ramas en cualquier momento.
- 🎥 Conserva los commits y mensajes existentes como un conjunto, lo que reduce el ruido de “blame”.

#### Contras

- 🔏 Más difícil cambiar los mensajes de commit.
- 🤐 Más difícil ocultar tu trabajo.

### Conclusión

Al final del día, **un proceso más simple con menos riesgo debería prevalecer**.

<!-- **Squash merge** es el claro ganador aquí. Es **más simple** y **menos propenso a errores**. También **deja intacta la historia de commits existente**. Esto es una **gran ventaja** para la **colaboración** y la **revisión de código**. -->

<!-- Include a diagram of a rebase flow with 2 feature branches -->

Aunque los _Rebasers_ realmente tienen formas de resolver (o evitar) sus problemas, **el hecho sigue siendo: eventualmente necesitarás un cinturón negro en git fu**. (p.ej., incluso un humilde `git push` puede enfrentar complejidad adicional: ¿fue `git push --force` o `git push --force-with-lease`? ¿Por qué lidiar con eso en absoluto?)

Hay otra razón por la que **rebasing** para crear una historia revisada **siempre estará en desventaja** frente a **`git merge ...`**. Un `git merge` permite que la CLI de `git` aplique algoritmos avanzados para evitar conflictos analizando el HEAD de cada rama.

Esto puede ser más inteligente porque cada fusión solo se preocupa por el estado más reciente de cada rama deseada, mientras que **rebasing debe reproducir (o descartar) el historial de commits en la secuencia** especificada. Esto **limita la capacidad de `git` para optimizar** la fusión ya que **solo compara 2 commits** a la vez.

En última instancia, **rebasing significa que ocasionalmente volverás a encontrarte con commits y conflictos antiguos irrelevantes**, incluso si sabes que ya fueron eliminados o resueltos.

### Resumen

- 💃 Respuesta: **SQUASH MERGE** tus PRs a `main`.
  - El historial de tu rama seguirá disponible si se necesita, y `main` permanecerá relativamente “limpio”.
- _🔤 ¡Siempre sigue cometiendo!_
  - En >95 % de los proyectos corporativos, la mentalidad de “respaldo” es preferible a la mentalidad de “arte esculpido”. Con el tiempo, el significado de tus mensajes de commit se desvanecerá mucho más rápido que la lógica del código y sus pruebas, que mantendrán su relevancia.

- Puedes usar el separador especial `--` con `git checkout` para permanecer en la rama actual mientras copias los archivos especificados:  
- `git checkout feature/half-a-feature **--** <ruta del folder o archivo>`  
- Asegúrate de haber confirmado (commit) cualquier cambio que quieras conservar primero, ya que esto sobrescribirá cualquier modificación local.   -->
````
