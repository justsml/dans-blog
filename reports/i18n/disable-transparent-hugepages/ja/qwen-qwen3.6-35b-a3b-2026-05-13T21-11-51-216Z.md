# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: ja
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/ja/index.mdx
- Validation: deferred
- Runtime seconds: 18.67
- Input tokens: 912
- Output tokens: 4189
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004326
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB: Transparent Huge Pages を無効化'
subTitle: Debian/Ubuntu 向けの修正
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
### Debian/Ubuntu 向けの disable-transparent-hugepages 対応

> "/sys/kernel/mm/transparent_hugepage/defrag is 'always'." という WARNING が出力されていますか？

以下のコマンドを実行することで、MongoDB が公式ドキュメントで詳細に解説している[透明な巨大ページ（THP）の無効化手順](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)を、システムレベルで迅速に適用できます。

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### 参照

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
