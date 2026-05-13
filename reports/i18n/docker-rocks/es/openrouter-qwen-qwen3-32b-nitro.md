# Translation Candidate
- Slug: docker-rocks
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-11--docker-rocks/es/index.mdx
- Validation: deferred
- Runtime seconds: 4.78
- Input tokens: 1805
- Output tokens: 1915
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000604
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: 'Docker es increíble, rápido y flexible'
date: '2015-06-11'
modified: '2024-08-10'
category: DevOps
subCategory: docker
tags:
  - docker
  - boot2docker
  - devops
related:
  - docker-makes-everything-better
  - docker-server-setup-notes
  - docker-security-tips-for-self-hosting
cover: ../guillaume-bolduc-259596-unsplash.webp
cover_mobile: ../w300_guillaume-bolduc-259596-unsplash.webp
cover_icon: ../icon_guillaume-bolduc-259596-unsplash.webp
---
## Docker funciona perfectamente

> Actualizaciones: septiembre de 2016, 2018  
> Boot2Docker ha sido reemplazado por Docker para Mac

> Nota histórica: esta publicación se ha conservado intencionalmente como una instantánea de Docker para Mac de 2015. Los consejos sobre rendimiento y los nombres de las herramientas reflejan ese momento; los flujos de trabajo actuales de Docker Desktop y Compose han evolucionado.

1. Docker es asombroso, rápido y flexible.  
1. Las herramientas anteriores, especialmente boot2docker, eran lentas y propensas a fallar.  

Docker puede ejecutarse actualmente de forma nativa en un Núcleo Linux v3.4+ y la versión actual de la máquina virtual boot2docker en realidad ejecuta v4.  

Mejor uso de tu hardware: Instala la última versión de Debian o Ubuntu en tu Mac/Windows.

Vamos, esos juegos no ayudan a tu código...

### Verifica tu configuración

Revisa la salida del comando `docker info`.

1. Seguridad: Revisa el servidor en busca de puertos inesperadamente abiertos (usando `nmap` desde una red remota)  
1. DNS: Usa un caché local o un servidor DNS de baja latencia.  
1. Almacenamiento: Usa el controlador de almacenamiento correcto (`overlay2` probablemente sea el adecuado)

Actualizado 2024:

- Docker Desktop es de código cerrado, pero gratuito para uso personal. Es una excelente manera de empezar con Docker en OSX o Windows.  
- Si buscas una solución más de código abierto, echa un vistazo a [Rancher Desktop](https://rancherdesktop.io/).
````
