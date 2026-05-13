# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 2.19
- Input tokens: 759
- Output tokens: 751
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000241
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2015-11-22--disable-transparent-hugepages/ja/index.mdx reports/i18n/disable-transparent-hugepages/ja
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB: 透過型巨大ページの無効化'
subTitle: Debian/Ubuntu 用対処
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
### Debian/Ubuntuでのdisable-transparent-hugepagesの修正

> "/sys/kernel/mm/transparent_hugepage/defrag が 'always' となっています" という警告が表示されますか？

MongoDBが[公式ドキュメントで詳細に説明している](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)手順を、以下のコマンドで簡潔に実行できます。

```sh
## 現在はDebian専用
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### 参考資料

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
