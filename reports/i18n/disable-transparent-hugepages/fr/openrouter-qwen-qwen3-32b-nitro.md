# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/fr/index.mdx
- Validation: passed
- Runtime seconds: 1.66
- Input tokens: 748
- Output tokens: 605
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000205
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB : Désactiver les pages géantes transparentes'
subTitle: Une solution pour Debian/Ubuntu
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
### Solution pour désactiver les transparent hugepages sur Debian/Ubuntu

> Obtenez-vous le message d'avertissement « WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always' » ?

Exécutez les commandes suivantes pour réaliser rapidement ce que [MongoDB explique en détail](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/).

```sh
## Actuellement, uniquement pour Debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### Références

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
