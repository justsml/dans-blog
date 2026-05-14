# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/zh/index.mdx
- Validation: deferred
- Runtime seconds: 4.37
- Input tokens: 924
- Output tokens: 558
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000286
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: 'MongoDB: 禁用透明大页'
subTitle: Debian/Ubuntu 修复方案
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
### 禁用透明大页（disable-transparent-hugepages）——适用于 Debian/Ubuntu

> 你是否看到 "WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'." 这条警告？

运行以下命令，快速执行 [MongoDB 文档中详细描述的操作](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)。

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### 参考

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
