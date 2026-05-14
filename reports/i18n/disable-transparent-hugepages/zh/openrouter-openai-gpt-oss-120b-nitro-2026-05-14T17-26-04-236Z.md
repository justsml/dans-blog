# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/zh/index.mdx
- Validation: deferred
- Runtime seconds: 0.36
- Input tokens: 956
- Output tokens: 328
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000096
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: MongoDB：禁用透明大页
subTitle: Debian/Ubuntu 修复
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
### 针对 Debian/Ubuntu 的 disable-transparent-hugepages 修复

> 你是否看到 “WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.” ？

运行以下命令，快速完成 [MongoDB 在更长篇幅中描述的操作](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)。

```sh
## Currently just debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### 参考文献

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
