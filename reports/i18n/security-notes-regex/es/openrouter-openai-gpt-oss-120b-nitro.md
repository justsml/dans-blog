# Translation Candidate
- Slug: security-notes-regex
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/es/index.mdx
- Validation: passed
- Runtime seconds: 0.64
- Input tokens: 1939
- Output tokens: 658
- Thinking tokens: unknown
- Cached input tokens: 896
- Cache write tokens: 0
- Estimated cost: $0.000194
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Notas de seguridad: Expresiones regulares'
subTitle: ¿Puede ser vulnerable una expresión regular?
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
## RegEx Denial-of-Service: ReDOS

Una de las vulnerabilidades más sorprendentes, y a la vez más difíciles de detectar, que he encontrado está relacionada con las expresiones regulares.  
Ya sea por una redacción deficiente o por una implementación inadecuada.

La memoria/CPU pueden agotarse con entradas de usuario grandes o especialmente manipuladas.

> Esto es una vulnerabilidad de denegación de servicio, no solo una señal de rendimiento. Si una entrada hostil puede mantener la CPU ocupada el tiempo suficiente como para privar a los usuarios reales de recursos, debe formar parte de su modelo de amenazas de seguridad.

### Señales de advertencia

1. cuantificadores anidados, grupos repetidos o alternancia superpuesta  
2. motores con retroceso intensivo sin tiempo de espera ni límite de longitud de entrada  
3. la expresión se usa con datos de usuario sin validar  
4. la validación con regex se ejecuta en una ruta de solicitud crítica

### Mitigación / Resolución

1. Las expresiones regulares son difíciles.  
    1. Por ejemplo, así es como los muy listos de [OWASP recomiendan manejar la validación de IP][owasp]: `^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`  
    2. ¡Eso es más largo que un tweet (a la antigua) para una dirección IP de 4 bytes!
2. Limite la longitud de la entrada antes de evaluar la expresión regular.  
3. Añada tiempos de espera, análisis estático o un motor sin retroceso donde la plataforma lo permita.  
4. Afecta a casi todos los lenguajes y plataformas: .NET/Node/Python/PERL/Java.

### Referencia

- [OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
