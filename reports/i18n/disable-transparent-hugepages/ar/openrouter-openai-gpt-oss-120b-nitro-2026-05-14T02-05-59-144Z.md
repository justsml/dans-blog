# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/ar/index.mdx
- Validation: deferred
- Runtime seconds: 0.66
- Input tokens: 966
- Output tokens: 220
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000077
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB: تعطيل الصفحات الضخمة الشفافة'
subTitle: إصلاح لـ Debian/Ubuntu
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
### إصلاح تعطيل الصفحات الضخمة الشفافة لأنظمة Debian/Ubuntu

> هل تتلقى التحذير : “WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.”؟

نفّذ الأوامر التالية لتطبيق ما يوضّحه دليل MongoDB بمزيد من التفصيل :

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### المراجع

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
