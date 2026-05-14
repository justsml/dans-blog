# Translation Candidate
- Slug: disable-transparent-hugepages
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-11-22--disable-transparent-hugepages/zh/index.mdx
- Validation: deferred
- Runtime seconds: 2.09
- Input tokens: 891
- Output tokens: 841
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000273
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
draft: true
title: MongoDB：禁用透明大页
subTitle: 适用于Debian/Ubuntu的修复方案
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
### Debian/Ubuntu 系统中 disable-transparent-hugepages 的修复方法

> 你是否收到过警告信息 "WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'." ?

运行以下命令可以快速实现 [MongoDB 官方文档](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/) 中描述的配置。

```sh
## 当前仅支持 debian
sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

#### 参考资料

1.  [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
````
