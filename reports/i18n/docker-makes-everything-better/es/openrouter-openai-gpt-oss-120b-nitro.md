# Translation Candidate
- Slug: docker-makes-everything-better
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-03-12--docker-makes-everything-better/es/index.mdx
- Validation: passed
- Runtime seconds: 1.18
- Input tokens: 1978
- Output tokens: 541
- Thinking tokens: unknown
- Cached input tokens: 896
- Cache write tokens: 0
- Estimated cost: $0.000175
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker === Amor
subTitle: 'Docker lo hace todo :allthethings:!'
date: '2015-02-26'
modified: '2024-07-30'
category: DevOps
subCategory: docker
tags:
  - docker
  - devops
  - patterns
related:
  - docker-server-setup-notes
  - docker-rocks
  - docker-security-tips-for-self-hosting
cover: ../guillaume-bolduc-259596-unsplash.webp
cover_mobile: ../w300_guillaume-bolduc-259596-unsplash.webp
cover_icon: ../icon_guillaume-bolduc-259596-unsplash.webp
---
## Docker ¡Puede Hacerlo Todo!\*

> Nota histórica: esto es una captura de 2015 del entusiasmo por Docker y los hábitos de desarrollo local, conservada mayormente como una cápsula del tiempo. Trate los comandos y la postura de seguridad como puntos de partida para modernizar, no como guía de producción.

Mejore su proceso para:

1.  Probar herramientas y servidores de desarrollo CON CASI NULO riesgo de estropear dependencias en su PC  
2.  Probar su software  
3.  Le obliga a escribir código más idempotente y modular... (escribiré cómo lograr esto en una continuación)

Puede que parezca una gran cantidad de cosas nuevas por aprender, **no deje que eso le detenga** para comenzar.

### Notas

- Si encuentra un comando `docker run` con las opciones `-d` o `-it`:
  _ `-it` o `-i -t` ejecutará el comando configurado de forma interactiva  
  _ `-d` iniciará el contenedor Docker como un “daemon”, es decir, como servicio en segundo plano.

---

### EJEMPLOS

### nginx

```bash
# Nota: usando carpetas compartidas basadas en el host
#(las carpetas compartidas no son posibles con el comando VOLUME del Dockerfile)
sudo docker run --name web01 -d -p 8181:80 \
  -v $(NGINX_DIR)/etc:/etc/nginx \
  -v $(NGINX_DIR)/log:/var/log/nginx \
  -v $(NGINX_DIR)/www:/var/www/html \
  nginx:latest

## Datos locales, aislados dentro de la instancia
sudo docker run --name web01 -d -p 8181:80 nginx:latest

# nodejs
sudo docker run --name nodejs01 -d -p 3300:3300 -p 4433:4433 nodejs:latest
```

> Créditos: [https://dockerfile.github.io/#/nginx](https://dockerfile.github.io/#/nginx)  
> Docker hará su vida más fácil a lo largo de todo el SDLC.

> - Bastante cercano
````
