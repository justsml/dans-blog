# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/it/index.mdx
- Validation: passed
- Runtime seconds: 0.66
- Input tokens: 842
- Output tokens: 274
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.000082
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB: Disabilita le pagine grandi trasparenti'
subTitle: Una correzione per Debian/Ubuntu
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
### fix per disabilitare le pagine grandi trasparenti per Debian/Ubuntu

> Stai ricevendo il messaggio "WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'." ?

Esegui i seguenti comandi per applicare rapidamente quanto descritto in modo più dettagliato da [MongoDB](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/).

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### Riferimenti

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
