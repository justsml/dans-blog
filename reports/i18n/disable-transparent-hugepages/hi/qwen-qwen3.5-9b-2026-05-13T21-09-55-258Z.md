# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: hi
- Model: qwen/qwen3.5-9b
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/hi/index.mdx
- Validation: deferred
- Runtime seconds: 123.12
- Input tokens: 786
- Output tokens: 6498
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001006
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: ''
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
### Debian/Ubuntu के लिए disable-transparent-hugepages सुधार

> क्या आपको "WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'." दिखाई दे रहा है?

MongoDB द्वारा अधिक विस्तार से वर्णित [MongoDB द्वारा विस्तार से वर्णित](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/) को तुरंत करने के लिए, नीचे दिए गए कमांड्स को चलाएं।

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### संदर्भ

1. [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
