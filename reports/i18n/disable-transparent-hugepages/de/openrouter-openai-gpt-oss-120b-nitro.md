# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/de/index.mdx
- Validation: passed
- Runtime seconds: 0.90
- Input tokens: 814
- Output tokens: 242
- Thinking tokens: unknown
- Cached input tokens: 256
- Cache write tokens: 0
- Estimated cost: $0.000075
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB: Transparent Huge Pages deaktivieren'
subTitle: Ein Fix für Debian/Ubuntu
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
### disable-transparent-hugepages fix für Debian/Ubuntu

> Erscheint die Meldung „WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.“ ?

Führen Sie die folgenden Befehle aus, um das schnell umzusetzen, was [MongoDB ausführlicher beschreibt](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/).

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### References

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
