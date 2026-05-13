# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/hi/index.mdx
- Validation: deferred
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
title: 'MongoDB: ट्रांसपैरेंट ह्यूज पेजेस बंद करें'
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
### डीबियन/यूबुंटू में disable-transparent-hugepages समाधान

> क्या आपको "/sys/kernel/mm/transparent_hugepage/defrag is 'always'" की चेतावनी मिल रही है?

नीचे दिए गए कमांड्स चलाएं ताकि [मंगोडीबी द्वारा विस्तार से वर्णित](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/) कार्य को तेज़ी से कर सकें।

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### संदर्भ

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
