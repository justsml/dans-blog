# Translation Candidate
- Slug: compare-nvme-ssd-cloud-options
- Locale: ru
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/ru/index.mdx
- Validation: deferred
- Runtime seconds: 122.28
- Input tokens: 2548
- Output tokens: 3838
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001431
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Сравнение облачных вариантов NVMe SSD
subTitle: 'NVMe SSD: сравнение AWS, DigitalOcean, Packet.net'
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
## Повысьте производительность облака до 70%

> Общие заметки и разделы для отдельных хостинг-провайдеров ниже (середина 2017 г.).

- [AWS (Amazon Web Services), EC2 (Elastic Compute Cloud), EBS (Elastic Block Storage) и т.д.](#aws_tips)
- [Digital Ocean](#do_tips)
- [Packet.net](#packet_tips)

<a id='aws_tips'></a>

### Amazon Web Services / EC2 / EBS / S3

> TLDR; Хотя AWS обычно предлагает ограниченное оборудование и пугающие ценовые уровни, оборудование **i3.large** (и больше) является наиболее эффективным с точки зрения соотношения цены и производительности ввода-вывода, А ТАКЖЕ самым быстрым по общей производительности.

> EC2 **i3.large** с **475GB NVMe SSD** обычно стоит около **$110/месяц!** > <br />
> **i3.2xlarge с 1.9TB NVMe** стоит около **$450/месяц** * > <br /> > \_*США/2018\_

<br />
<br />

### Сравнение

\[[полноэкранный просмотр данных](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>

[Посмотреть цены на EC2](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ec2instances.info](../ec2-updated-prices-2018.webp)

Обратите внимание: **i3.\*xlarge** — единственное оборудование, предлагающее конкурентоспособное по цене NVMe-хранилище (сверхбыстрые скорости +1 ГБ/с). Основным ограничивающим фактором, как я выяснил, оказалась реальная скорость сети. Серверы с заявленной скоростью «до 10 Гбит/с» с трудом достигали 1 Гбит/с (60–80 МБ/с).

В сетевых тестах использовалось до 9 дополнительных инстансов в той же зоне доступности. Любые ошибочные точки данных я заменял на 0. Требуются дополнительные тесты, так как было собрано всего 1–2 образца.

\[[полноэкранный просмотр данных](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### Благодарности

- [ec2instances.info](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
