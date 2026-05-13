# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: hi
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/hi/index.mdx
- Validation: deferred
- Runtime seconds: 18.23
- Input tokens: 890
- Output tokens: 1888
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000653
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB: पारदर्शी विशाल पृष्ठ अक्षम करें'
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
### Debian/Ubuntu के लिए disable-transparent-hugepages फिक्स

> क्या आपको 'WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.' मिल रहा है?

निम्नलिखित कमांड चलाकर जल्दी से वह कार्य करें जो [MongoDB द्वारा विस्तार से बताया गया है](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/).

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### संदर्भ

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
