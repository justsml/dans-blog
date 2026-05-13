# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: ja
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/ja/index.mdx
- Validation: deferred
- Runtime seconds: 2.89
- Input tokens: 903
- Output tokens: 497
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000266
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB: Transparent Huge Pagesの無効化'
subTitle: Debian/Ubuntu向けの修正
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
### Debian/Ubuntu向け disable-transparent-hugepages 修正

> 「WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.」という警告が出ていませんか？

以下のコマンドを実行すると、[MongoDBが詳細に説明している内容](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)を素早く実行できます。

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### 参考文献

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
