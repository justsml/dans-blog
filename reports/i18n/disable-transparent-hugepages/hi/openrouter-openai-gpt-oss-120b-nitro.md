# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 0.33
- Input tokens: 823
- Output tokens: 301
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.000086
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2015-11-22--disable-transparent-hugepages/hi/index.mdx reports/i18n/disable-transparent-hugepages/hi
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB: ट्रांसपेरेंट ह्यूज पेजेज़ अक्षम करें'
subTitle: Debian/Ubuntu के लिए एक समाधान
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
### Debian/Ubuntu के लिए disable-transparent-hugepages समाधान

> क्या आपको यह चेतावनी मिल रही है : “WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.” ?

[MongoDB द्वारा विस्तृत रूप से वर्णित](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/) चरणों को जल्दी से लागू करने के लिए नीचे दिए गए कमांड चलाएँ।

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### संदर्भ

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
