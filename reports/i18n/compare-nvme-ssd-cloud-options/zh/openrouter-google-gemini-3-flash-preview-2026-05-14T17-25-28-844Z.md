# Translation Candidate
- Slug: compare-nvme-ssd-cloud-options
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/zh/index.mdx
- Validation: deferred
- Runtime seconds: 9.47
- Input tokens: 2471
- Output tokens: 937
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004046
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 云端 NVMe SSD 选型对比
subTitle: 'NVMe SSD 性能实测：AWS, DigitalOcean, Packet.net'
date: '2017-04-15'
modified: '2020-01-30'
category: DevOps
subCategory: programming
tags:
  - cloud
  - servers
  - architecture
  - scaling
  - digital-ocean
  - amazon-web-services
  - google-cloud-engine
  - azure
  - packet
  - ovh
  - ssd
  - io
cover: ../solaiman-hossen-553024-unsplash.webp
cover_mobile: ../w300_solaiman-hossen-553024-unsplash.webp
cover_icon: ../icon_solaiman-hossen-553024-unsplash.webp
---
## 提升云端性能高达 70%

> 以下是针对特定托管服务商的通用说明与章节（2017 年中数据）。

- [AWS (Amazon Web Services), EC2 (Elastic Compute Cloud), EBS (Elastic Block Storage) 等](#aws_tips)
- [Digital Ocean](#do_tips)
- [Packet.net](#packet_tips)

<a id='aws_tips'></a>

### Amazon Web Services / EC2 / EBS / S3

> 太长不看版：虽然 AWS 的硬件限制较多且价格阶梯令人望而生畏，但 **i3.large**（及更大规格）硬件在性价比（价格 vs I/O 性能）方面效率最高，且综合性能最快。

> 配备 **475GB NVMe SSD** 的 EC2 **i3.large** 通常每月成本约为 **110 美元**！<br />
> 配备 **1.9TB NVMe** 的 **i3.2xlarge** 每月成本约为 **450 美元** * <br /> > \_*美国地区/2018 年数据\_

<br />
<br />

### 正面交锋

\[[全屏数据视图](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>

[在 EC2 上查看价格](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ec2instances.info](../ec2-updated-prices-2018.webp)

注意，**i3.*xlarge** 是唯一具备价格竞争力的 NVMe 存储硬件（拥有 +1GB/s 的极速性能）。我发现主要的瓶颈在于实际网络速度。标称速度“高达 10/Gb/s”的服务器在实际测试中很难接近 1/Gb/s（仅 60-80MB/s）。

网络测试使用了同一可用区内多达 9 个额外的实例。任何错误的数据点我都用 0 替代。由于仅收集了 1-2 个样本，还需要进行更多测试。

\[[全屏数据视图](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### 致谢

- [ec2instances.info](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
