# Translation Candidate
- Slug: docker-rocks
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-11--docker-rocks/ru/index.mdx
- Validation: deferred
- Runtime seconds: 0.76
- Input tokens: 1991
- Output tokens: 460
- Thinking tokens: unknown
- Cached input tokens: 640
- Cache write tokens: 0
- Estimated cost: $0.000160
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker крут и теперь работает на macOS
subTitle: 'Docker — удивителен, быстр и гибок'
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

> Обновления сентябрь 2016, 2018  
> Boot2Docker заменён на Docker for Mac

> Историческая справка: этот пост намеренно оставлен как снимок Docker‑for‑Mac 2015‑го года. Советы по производительности и названия инструментов отражают тот момент; текущие рабочие процессы Docker Desktop и Compose уже изменились.

1. Docker удивителен, быстр и гибок.  
1. Предыдущие инструменты, особенно boot2docker, были медленными и склонными к сбоям.

Docker сейчас может работать нативно на ядре Linux v3.4+ – а текущая виртуальная машина boot2docker фактически использует v4.

Оптимальное использование вашего железа: установите последнюю версию Debian или Ubuntu на ваш Mac/Windows‑компьютер.

... давайте, эти игры не помогают вашему коду...

### Проверьте конфигурацию

Посмотрите вывод команды `docker info`.

1. Безопасность: проверьте сервер на наличие неожиданно открытых портов (с помощью `nmap` из удалённой сети)  
1. DNS: используйте локальный кэш или низколатентный DNS‑сервер.  
1. Хранилище: выберите правильный драйвер хранилища (`overlay2`, скорее всего)

Обновлено в 2024 году:

- Docker Desktop — проприетарный, но бесплатный для личного использования. Отличный способ начать работу с Docker на macOS или Windows.  
- Если нужен более открытый вариант, взгляните на [Rancher Desktop](https://rancherdesktop.io/).
````
