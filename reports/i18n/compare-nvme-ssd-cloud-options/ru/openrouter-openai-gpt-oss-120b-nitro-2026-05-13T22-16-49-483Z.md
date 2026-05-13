# Translation Candidate
- Slug: compare-nvme-ssd-cloud-options
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/ru/index.mdx
- Validation: deferred
- Runtime seconds: 1.26
- Input tokens: 2709
- Output tokens: 1020
- Thinking tokens: unknown
- Cached input tokens: 640
- Cache write tokens: 0
- Estimated cost: $0.000289
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Сравнение облачных вариантов NVMe SSD
subTitle: 'NVMe SSD в сравнении: AWS, DigitalOcean, Packet.net'
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
## Увеличьте производительность облака до 70 %

> Общие замечания и разделы для выбранных провайдеров хостинга (середина 2017 года).

- [AWS (Amazon Web Services), EC2 (Elastic Compute Cloud), EBS (Elastic Block Storage) и др.](#aws_tips)
- [Digital Ocean](#do_tips)
- [Packet.net](#packet_tips)

<a id='aws_tips'></a>

### Amazon Web Services / EC2 / EBS / S3

> TLDR; Хотя AWS обычно предлагает ограниченное оборудование и пугающие ценовые уровни, **i3.large** (и более крупные модели) обеспечивают наилучшее соотношение цены и производительности I/O, а также являются самыми быстрыми в общей производительности.

> EC2 **i3.large** с **475 ГБ NVMe SSD** обычно стоит около **110 $/мес!** > <br />
> **i3.2xlarge** с 1,9 ТБ NVMe стоит примерно **450 $/мес** * > <br /> > \_*США/2018\_

<br />
<br />

### Сравнительный анализ

\[[полный просмотр данных в полноэкранном режиме](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>

[Посмотреть цены на EC2](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ec2instances.info](../ec2-updated-prices-2018.webp)

Обратите внимание, что **i3.*xlarge** — единственное оборудование, предлагающее конкурентоспособное NVMe‑хранилище (ультрабыстрые скорости +1 ГБ/с). Основным ограничивающим фактором оказалась реальная пропускная способность сети. Серверы с рекламируемыми скоростями «до 10 Гб/с» едва приближались к 1 Гб/с (60–80 МБ/с).

Тесты сети проводились с участием до 9 дополнительных экземпляров в той же зоне доступности. Ошибочные точки данных я заменил нулём. Требуется больше тестов, так как собрано лишь 1–2 образца.

\[[полный просмотр данных в полноэкранном режиме](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### Благодарности

- [ec2instances.info](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
