# Translation Candidate
- Slug: naming-things-real-good
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2016-06-01--naming-things-real-good/es/index.mdx
- Validation: passed
- Runtime seconds: 9.48
- Input tokens: 4058
- Output tokens: 3740
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001222
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: ''
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
## Nomenclatura: Conceptos básicos de programación orientada a objetos

Veamos el diseño de objetos/clases con un ejemplo...

### La situación

¿Ha diseñado alguna vez un `modelo de datos` (en código, SQL o hojas de cálculo de Excel)?  
¿Le suena familiar lo siguiente?

```
*** anti patrón - no copie y pegue ***
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
  - *userEmail* - 'Pointer' a la tabla User ^^^
```

### ¿Dónde está el error?

Bueno, técnicamente no hay un error, solo datos que necesitan reorganización.

**¿Suena familiar lo siguiente?**  

1.  Cualquier cambio en tu aplicación requerirá horas de tediosa depuración.  
1.  Cualquier cambio en los requisitos resultará en:  

![schema refactor][schema_refactor]  

¿Por qué es tan malo nombrar un campo `agentEmailPrimary`?  

Para empezar, **no** estás creando algo completamente nuevo en el universo. La sobre-especificidad tiene algunas trampas:  

1.  Estar "bloqueado" en un nombre altamente específico significa que `agentEmailPrimary` probablemente haga que tus vistas y código relacionado sean **0% reutilizables**, generando errores recurrentes y molestos como:

- Datos no sincronizados entre tablas (no está claro si `user.email` debe propagarse a `agent.agentEmail` o viceversa, sin mencionar la complejidad de implementar manualmente dónde y cómo aplicar esta "lógica"...)  
- Las reglas de validación/lógica probablemente se dupliquen y sean inconsistentes.  
- Tu proyecto se parecerá cada vez más a una torre de Jenga inestable.  
- La fragilidad aumenta con cada nuevo archivo, ya que se requiere una atención extremadamente detallada incluso para cambios triviales.  

1. `agentEmailPrimary` podría significar varias cosas. Evita la ambigüedad con **nombres más cortos**.  

- Ten cuidado con la sobrecarga de palabras innecesarias. ¿`Primary`? Solo genera más preguntas: ¿Hay un Secundario? ¿Es para su Pariente Principal?  

Basta de palabras, Dan. ¿Cómo debería verse en su lugar?  

### Una Solución  

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

Eliminé la tabla `Agent`, ya que no contenía campos únicos para Agentes. Y el objeto `User.company` (con `.name`, `.address`) emergió una vez que se limpiaron los nombres.

Algunos principios guía:

1.  Elimina tablas innecesarias. ¿Realmente necesitas una tabla `statuses`? ¿Cuando podrías agregar un campo `status::VARCHAR(8)` en la tabla `User`? Está bien, usa los bytes extra por fila.
2.  Intenta fusionar tablas relacionadas. **Data**
3.  Elimina la recopilación de datos redundante (por ejemplo, elimina la tabla `ActivityLogs` si es reemplazada por una solución de Análisis.)
4.  Intenta mantener **todos los nombres de campos** en un **único palabra/sustantivo/pronombre**. Está bien depender del contexto proporcionado por la tabla. (por ejemplo, `PersonalAccount.email` vs `BusinessAccount.email` - el contexto lo proporciona el nombre de la tabla.)
5.  No existe tal cosa como `Agent.agentEmail` o `Agent.agentPhonePrimary`. Punto. Dilo conmigo: "es `email` & `phone`."
6.  Al usar Nombres Muy Específicos, conviertes en piedra un nivel específico de `reutilización-del-código` y `durabilidad`, específicamente **0 %**.
7.  No te haces ningún favor con basura como `User.profileSummaryEmail`. 💞

**Lectura recomendada incluye:**

1. [Tal vez normalizar no es normal](https://blog.codinghorror.com/maybe-normalizing-isnt-normal/)
1.  [Los equilibrios entre normalización y denormalización de bases de datos](https://dev.to/er_dward/the-trade-offs-between-database-normalization-and-denormalization-4kdo)
2.  [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)
3.  [https://en.wikipedia.org/wiki/Database_normalization](https://en.wikipedia.org/wiki/Database_normalization)

[![schema_refactor]: ../schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif
````
