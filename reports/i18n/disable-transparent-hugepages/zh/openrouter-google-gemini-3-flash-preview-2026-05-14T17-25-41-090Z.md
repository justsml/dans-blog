# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/zh/index.mdx
- Validation: deferred
- Runtime seconds: 5.67
- Input tokens: 888
- Output tokens: 252
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001200
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: MongoDB：禁用透明大页
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
### 针对 Debian/Ubuntu 的 disable-transparent-hugepages 修复方案

> 你是否看到了这个警告："WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'." ？

运行以下命令即可快速完成修复。相比之下，[MongoDB 官方文档的描述](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/) 略显冗长。

```sh
## 目前仅适用于 debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### 参考资料

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
