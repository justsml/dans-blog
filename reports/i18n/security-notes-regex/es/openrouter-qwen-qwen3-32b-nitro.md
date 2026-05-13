# Translation Candidate
- Slug: security-notes-regex
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/es/index.mdx
- Validation: passed
- Runtime seconds: 5.21
- Input tokens: 1823
- Output tokens: 1922
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000607
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Notas de Seguridad: RegEx'
subTitle: ''
date: '2015-02-24'
modified: '2018-07-30'
category: Security
subCategory: RegEx
tags:
  - security
  - regex
  - dos
  - remote-exploit
cover_credit: Photo by Markus Spiske on Unsplash
cover: ../markus-spiske-666905-unsplash.webp
cover_mobile: ../w300_markus-spiske-666905-unsplash.webp
cover_icon: ../icon_markus-spiske-666905-unsplash.webp
social_image: ../desktop-social.webp
---
## Denegación de Servicio con Expresiones Regulares: ReDOS

Una de las vulnerabilidades más sorprendentes, y difíciles de detectar, que he encontrado está relacionada con las expresiones regulares.  
Ya sea por un diseño deficiente o una implementación inadecuada.

La memoria y el CPU pueden agotarse con entradas de usuario grandes o especialmente elaboradas.

> Esta es una vulnerabilidad de denegación de servicio, no solo un problema de rendimiento. Si una entrada maliciosa puede bloquear el CPU durante tanto tiempo que deje sin recursos a los usuarios legítimos, debe incluirse en su modelo de amenazas de seguridad.

### Indicadores de riesgo

1. Cuantificadores anidados, grupos repetidos o alternancia superpuesta  
2. Motores con retroceso intenso que no tienen límite de tiempo ni límite de longitud de entrada  
3. La expresión se usa con entradas del usuario no validadas  
4. La validación mediante expresiones regulares se ejecuta en una ruta de solicitud activa

### Mitigación / Resolución

1. Las expresiones regulares son complejas.  
    1. Por ejemplo, así es cómo los expertos de [OWASP recomiendan validar direcciones IP][owasp]:  
       `^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`  
    2. ¡¡¡Eso es más largo que un tweet de la vieja escuela para una dirección IP de 4 bytes!!!  
2. Establecer un límite de longitud en la entrada antes de evaluar con expresiones regulares.  
3. Añadir tiempos de espera, análisis estático o un motor sin retroceso donde la plataforma lo permita.  
4. Esto afecta casi a todos los lenguajes y plataformas: .NET/Node/Python/PERL/Java.  

### Referencia  

- [ReDoS de OWASP](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
