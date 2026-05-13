# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/ru/index.mdx
- Validation: passed
- Runtime seconds: 0.26
- Input tokens: 818
- Output tokens: 237
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.000075
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB: Отключить прозрачные огромные страницы'
subTitle: Исправление для Debian/Ubuntu
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
### disable-transparent-hugepages fix for Debian/Ubuntu

> Вы видите предупреждение «WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.» ?

Выполните следующие команды, чтобы быстро сделать то, что [MongoDB описывает более подробно](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/).

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### References

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
