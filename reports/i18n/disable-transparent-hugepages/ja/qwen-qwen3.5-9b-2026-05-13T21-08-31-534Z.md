# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: ja
- Model: qwen/qwen3.5-9b
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 172.80
- Input tokens: 783
- Output tokens: 16000
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002431
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:translate:chunked -- --slug disable-transparent-hugepages --locale ja --model qwen/qwen3.5-9b --chunk 10p --run-id 2026-05-13T20-47-14-617Z-26482 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24 (code 1)
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
