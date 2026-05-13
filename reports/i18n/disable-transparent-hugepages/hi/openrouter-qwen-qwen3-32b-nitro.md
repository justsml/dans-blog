# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/hi/index.mdx
- Validation: passed
- Runtime seconds: 2.13
- Input tokens: 781
- Output tokens: 860
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000269
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: ''
subTitle: Debian/Ubuntu के लिए एक फिक्स
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
### Debian/Ubuntu के लिए disable-transparent-hugepages ठीक करें

> क्या आपको "WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'." मिल रहा है?

नीचे दिए गए कमांड चलाएं ताकि [MongoDB के विस्तृत दस्तावेज़ में बताए गए](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/) कार्य को तेज़ी से कर सकें।

```sh
## वर्तमान में केवल debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### संदर्भ

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
