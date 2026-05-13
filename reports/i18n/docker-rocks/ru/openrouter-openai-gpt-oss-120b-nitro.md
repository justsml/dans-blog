# Translation Candidate
- Slug: docker-rocks
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-11--docker-rocks/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 2.19
- Input tokens: 1794
- Output tokens: 451
- Thinking tokens: unknown
- Cached input tokens: 896
- Cache write tokens: 0
- Estimated cost: $0.000151
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2015-06-11--docker-rocks/ru/index.mdx reports/i18n/docker-rocks/ru
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker крути теперь работает на OSX
subTitle: 'Docker — удивителен, быстр и гибок'
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

> Обновления сентябрь 2016, 2018  
> Boot2Docker заменён на Docker for Mac

> Историческая справка: этот пост намеренно сохранён как снимок Docker-for-Mac 2015‑го года. Советы по производительности и названия инструментов отражают то время; текущие рабочие процессы Docker Desktop и Compose уже изменились.

1. Docker удивителен, быстрый и гибкий.  
1. Предыдущие инструменты, особенно boot2docker, были медленными и склонными к сбоям.

Docker сейчас может работать нативно на ядре Linux v3.4+ — а текущая виртуальная машина boot2docker фактически использует v4.

Оптимальное использование вашего железа: установите последнюю версию Debian или Ubuntu на ваш Mac/Windows‑компьютер.

... c'mon those games aren't helping your code...

### Проверьте свою конфигурацию

Посмотрите вывод команды `docker info`.

1. Безопасность: проверьте сервер на наличие неожиданно открытых портов (с помощью `nmap` из удалённой сети)  
1. DNS: используйте локальный кэш или низколатентный DNS‑сервер.  
1. Хранилище: используйте правильный драйвер хранилища (`overlay2`, скорее всего)

Обновлено в 2024 году:

- Docker Desktop — проприетарный, но бесплатный для личного использования. Отличный способ начать работу с Docker на macOS или Windows.  
- Если нужен более открытый вариант, взгляните на [Rancher Desktop](https://rancherdesktop.io/).
````
