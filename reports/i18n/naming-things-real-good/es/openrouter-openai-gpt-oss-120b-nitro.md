# Translation Candidate
- Slug: naming-things-real-good
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2016-06-01--naming-things-real-good/es/index.mdx
- Validation: passed
- Runtime seconds: 3.95
- Input tokens: 4186
- Output tokens: 1186
- Thinking tokens: unknown
- Cached input tokens: 1152
- Cache write tokens: 0
- Estimated cost: $0.000377
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Nombrar cosas bien
subTitle: 'Nombrar cosas: conceptos básicos de POO'
date: '2016-06-01'
modified: '2024-08-10'
category: Guides
subCategory: programming
tags:
  - programming
  - patterns
  - naming
  - source-code
  - organization
cover: ../rawpixel-652639-unsplash.webp
cover_mobile: ../w300_rawpixel-652639-unsplash.webp
cover_icon: ../icon_rawpixel-652639-unsplash.webp
---
## Naming stuff: Object Oriented Basics

Veamos el diseño de objetos/clases mediante un ejemplo...

### The Situation

¿Alguna vez has diseñado un `data model` (en código, SQL o hojas de cálculo)?
¿Te resulta familiar lo siguiente?

```
*** anti-pattern - don't copy-paste ***
* User
  - id
  - avatarUrl
  - name
  - email
  - password

* Agent
  - id
  - primaryPhoto
  - name
  - email
  - agentEmail
  - agentPhoneMain
  - agentEmailPrimary
  - agentPhonePrimary
  - agentAddressFull
  - agentCompanyName
  - agentCompanyAddress
  - *userEmail* - 'Pointer' to User table ^^^
```

### Where's the bug?

Bueno, técnicamente no hay un error, solo datos que necesitan ser reorganizados.

**¿Te suena familiar?**

1.  Cualquier cambio en tu aplicación requerirá horas de depuración ardua.  
1.  Cualquier requisito cambiante producirá:

![schema refactor][schema_refactor]

¿Por qué nombrar un campo `agentEmailPrimary` es tan malo?

Para empezar, **no** estás creando algo completamente nuevo en el universo. La sobre‑especificidad tiene algunas trampas:

1.  Estar “atrapado” en un nombre tan concreto, significa que `agentEmailPrimary` probablemente haga que tus vistas y el código relacionado **no sean reutilizables en absoluto**, y genere errores recurrentes y molestos como:

- Los datos no se sincronizan entre tablas (no está claro si `user.email` debe propagarse a `agent.agentEmail` o viceversa – ni hablemos de la complejidad de implementar manualmente dónde y cómo aplicar esa “lógica” ...)
- Las reglas/lógica de validación probablemente estén duplicadas e inconsistentes.
- Cada vez más, tu proyecto se parecerá a una torre de Jenga tambaleante.
- La fragilidad se acumula con cada archivo nuevo, ya que se requiere una atención al detalle extremadamente alta incluso para cambios triviales.

1.  `agentEmailPrimary` podría significar varias cosas. Evita la ambigüedad con **nombres más cortos**.

- Cuidado con el exceso de palabras innecesarias. `Primary`? Solo genera más preguntas: ¿Existe un Secondary? ¿Es para su contacto principal de emergencia?

Basta de palabrería, Dan, ¿cómo debería verse en su lugar?

### Una solución

```
// Consolidated Schema:

User
  - id
  - role: ['agent', 'lead', 'admin']
  - name
  - phone
  - address
  - email
  - password
  - company
    - name
    - address
```

Eliminé la tabla `Agent`, ya que no contenía campos exclusivos de los agentes. Y el objeto `User.company` (con `.name`, `.address`) surgió una vez que se limpió la nomenclatura.

Algunos principios guía:

1.  Elimina tablas innecesarias. ¿Realmente necesitas una tabla `statuses`? Cuando podrías añadir un campo `status::VARCHAR(8)` en la tabla `User`. Está bien, usa los bytes extra por fila.
2.  Intenta combinar tablas relacionadas. **Data**
3.  Borra colecciones de datos redundantes (p. ej., elimina la tabla `ActivityLogs` si la sustituyes por una solución de Analítica).
4.  Mantén **todos los nombres de campo** como una **única palabra/sustantivo/pronombre**. Está bien confiar en el contexto que proporciona la tabla. (p. ej., `PersonalAccount.email` vs `BusinessAccount.email`: el contexto lo da el nombre de la tabla).
5.  No existe tal cosa como `Agent.agentEmail` o `Agent.agentPhonePrimary`. Punto. Repite conmigo: “es `email` y `phone`”.
6.  Al usar nombres altamente específicos, cementas un nivel concreto de `code-reusability` y `durability`, que en realidad es **CERO %**.
7.  No te haces ningún favor con cosas como `User.profileSummaryEmail`. 💞

**Lecturas recomendadas:**

1. [Maybe Normalizing Isn't Normal](https://blog.codinghorror.com/maybe-normalizing-isnt-normal/)
1.  [The Trade-offs Between Database Normalization and Denormalization](https://dev.to/er_dward/the-trade-offs-between-database-normalization-and-denormalization-4kdo)
2.  [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)
3.  [https://en.wikipedia.org/wiki/Database_normalization](https://en.wikipedia.org/wiki/Database_normalization)

[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif
````
