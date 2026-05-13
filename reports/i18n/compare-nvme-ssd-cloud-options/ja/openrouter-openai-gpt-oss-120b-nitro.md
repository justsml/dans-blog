# Translation Candidate
- Slug: compare-nvme-ssd-cloud-options
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/ja/index.mdx
- Validation: deferred
- Runtime seconds: 1.42
- Input tokens: 4306
- Output tokens: 1197
- Thinking tokens: unknown
- Cached input tokens: 2176
- Cache write tokens: 0
- Estimated cost: $0.000383
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: NVMe SSD クラウドオプション比較
subTitle: NVMe SSD 対決：AWS、DigitalOcean、Packet.net
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
## Boost Cloud Performance up to 70%

> General notes & sections for select hosting providers below (mid-2017).

- [AWS (Amazon Web Services), EC2 (Elastic Compute Cloud), EBS (Elastic Block Storage), etc.](#aws_tips)
- [Digital Ocean](#do_tips)
- [Packet.net](#packet_tips)

<a id='aws_tips'></a>

### Amazon Web Services / EC2 / EBS / S3

> TLDR; AWS はハードウェアが制限され、価格体系が intimidating（脅威的）に感じられることが多いが、**i3.large**（およびそれ以上）のハードウェアは価格と I/O パフォーマンスのバランスが最も優れており、全体的なパフォーマンスでも最速である。

> EC2 **i3.large** に **475 GB NVMe SSD** を装備すると、月額約 **$110** が目安です！ > <br />
> **i3.2xlarge** に 1.9 TB NVMe を装備すると、月額約 **$450** です * > <br /> > \_*USA/2018\_

<br />
<br />

### Head to Head

\[[full-screen data view](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>

[View Prices on EC2](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ec2instances.info](../ec2-updated-prices-2018.webp)

**i3.\*xlarge** が唯一、競争力のある価格で NVMe ストレージ（超高速 +1 GB/s）を提供できるハードウェアです。最大の制約は実際のネットワーク速度でした。公称「最大 10 Gb/s」のサーバーでも、1 Gb/s（60‑80 MB/s）に近づくことはほとんどできませんでした。

ネットワークテストは同一アベイラビリティーゾーン内で最大 9 台の追加インスタンスを使用しました。明らかに異常なデータポイントは 0 に置き換えました。サンプル数が 1‑2 件に留まっているため、追加のテストが必要です。

\[[フルスクリーン データビュー](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### クレジット

- [ec2instances.info](../https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
