# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/es/index.mdx
- Validation: passed
- Runtime seconds: 3.39
- Input tokens: 769
- Output tokens: 1087
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000322
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB: Deshabilitar páginas grandes transparentes'
subTitle: ''
date: '2015-12-22'
modified: '2016-01-20'
category: DevOps
subCategory: mongodb
tags:
  - devops
  - mongodb
  - performance
  - tuning
cover: ../victor-garcia-645096-unsplash.webp
cover_mobile: ../w300_victor-garcia-645096-unsplash.webp
cover_icon: ../icon_victor-garcia-645096-unsplash.webp
---
### Solución para deshabilitar transparent-hugepages en Debian/Ubuntu

> ¿Estás viendo "ADVERTENCIA: /sys/kernel/mm/transparent_hugepage/defrag es 'siempre'." ?

Ejecuta los siguientes comandos para hacer rápidamente lo que [MongoDB describe con mayor detalle](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/).

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### Referencias

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
