# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/he/index.mdx
- Validation: deferred
- Runtime seconds: 0.94
- Input tokens: 951
- Output tokens: 217
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000076
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB: השבת דפים גדולים שקופים (Transparent Huge Pages)'
subTitle: תיקון ל‑Debian/Ubuntu
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
### תיקון disable-transparent-hugepages עבור Debian/Ubuntu

> האם אתה רואה את ההודעה “WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.” ?

הפעל את הפקודות שלהלן כדי לבצע במהירות את מה שמסביר MongoDB במדריך המפורט שלו.

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### מקורות

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
