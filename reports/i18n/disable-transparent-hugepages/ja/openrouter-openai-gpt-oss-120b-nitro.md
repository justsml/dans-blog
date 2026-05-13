# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/ja/index.mdx
- Validation: passed
- Runtime seconds: 0.29
- Input tokens: 834
- Output tokens: 253
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.000078
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB: 透明ヒュージページを無効にする'
subTitle: Debian/Ubuntu 用の修正
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
### Debian/Ubuntu 用の disable-transparent-hugepages 修正

> 「WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.」と警告が出ていますか？

以下のコマンドを実行すれば、[MongoDB が詳しく解説している手順](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)をすぐに適用できます。

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### 参考情報

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
