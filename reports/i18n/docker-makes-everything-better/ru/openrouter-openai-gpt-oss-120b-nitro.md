# Translation Candidate
- Slug: docker-makes-everything-better
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-03-12--docker-makes-everything-better/ru/index.mdx
- Validation: passed
- Runtime seconds: 0.63
- Input tokens: 1987
- Output tokens: 551
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000177
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker === Любовь
subTitle: 'Docker умеет всё :allthethings:!'
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
## Docker Can Do Everything!\*

> Historical note: this is a 2015 snapshot of Docker enthusiasm and local-dev habits, preserved mostly as a time capsule. Treat the commands and security posture as starting points to modernize, not production guidance.

Improve your process for:

1.  Testing Dev Tools & Servers WITH VIRTUALLY ZERO risk of messing up dependencies on your PC
1.  Testing your software
1.  Makes you write more idempotent, modular code... (I'll write how to actually realize this in a follow up)

There may seem like a huge volume of new stuff to learn, **don't let that stop you** from getting started.

### Notes

- Если вы видите команду `docker run` с опциями `-d` или `-it`:
  _ `-it` или `-i -t` запускает указанную команду в интерактивном режиме
  _ `-d` запускает контейнер Docker как «демон», то есть фоновый сервис.

---

### ПРИМЕРЫ

### nginx

```bash
# Примечание: используем общие каталоги на хосте
# (общие каталоги невозможны с инструкцией VOLUME в Dockerfile)
sudo docker run --name web01 -d -p 8181:80 \
  -v $(NGINX_DIR)/etc:/etc/nginx \
  -v $(NGINX_DIR)/log:/var/log/nginx \
  -v $(NGINX_DIR)/www:/var/www/html \
  nginx:latest

## Локальные данные, изолированные внутри экземпляра
sudo docker run --name web01 -d -p 8181:80 nginx:latest

# nodejs
sudo docker run --name nodejs01 -d -p 3300:3300 -p 4433:4433 nodejs:latest
```

> Credits: [https://dockerfile.github.io/#/nginx](https://dockerfile.github.io/#/nginx)
> Docker упростит вашу работу на протяжении _всего_ жизненного цикла разработки.

> - Довольно близко
````
