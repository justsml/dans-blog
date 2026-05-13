# Translation Candidate
- Slug: docker-rocks
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-11--docker-rocks/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 1.04
- Input tokens: 1834
- Output tokens: 395
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.000143
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2015-06-11--docker-rocks/es/index.mdx reports/i18n/docker-rocks/es
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker es increíble y ahora funcionaen macOS.
subTitle: 'Docker es asombroso, rápido y flexible'
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
## Docker Rocks

> Updates September 2016, 2018  
> Boot2Docker has been replaced by Docker for Mac

> Historical note: this post is intentionally preserved as a 2015-era Docker-for-Mac snapshot. The performance advice and tooling names reflect that moment; current Docker Desktop and Compose workflows have moved on.

1. Docker es increíble, rápido y flexible.  
1. Las herramientas anteriores, boot2docker en particular, eran lentas y propensas a fallos.

Docker puede ejecutarse actualmente de forma nativa sobre un kernel Linux v3.4+ — y la máquina boot2docker actual realmente corre v4.

Mejor uso de tu hardware: instala la última versión de Debian o Ubuntu en tu Mac/Windows.

... c’mon esos juegos no están ayudando a tu código...

### Verifica tu configuración

Revisa la salida del comando `docker info`.

1. Seguridad: Busca puertos inesperadamente abiertos en el servidor (con `nmap` desde una red remota)  
1. DNS: Usa una caché local o un servidor DNS de baja latencia.  
1. Almacenamiento: Usa el controlador de almacenamiento correcto (`overlay2` es probablemente el adecuado)

Actualizado 2024:

- Docker Desktop es propietario, pero gratuito para uso personal. Es una forma excelente de comenzar con Docker en OSX o Windows.  
- Si buscas una solución más de código abierto, echa un vistazo a [Rancher Desktop](https://rancherdesktop.io/).
````
