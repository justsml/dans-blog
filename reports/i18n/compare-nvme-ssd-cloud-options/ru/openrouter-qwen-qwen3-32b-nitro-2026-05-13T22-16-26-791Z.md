# Translation Candidate
- Slug: compare-nvme-ssd-cloud-options
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/ru/index.mdx
- Validation: deferred
- Runtime seconds: 8.80
- Input tokens: 4227
- Output tokens: 3343
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001140
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Сравнение облачных решений NVMe SSD
subTitle: 'NVMe SSD Пара на пару: AWS, DigitalOcean, Packet.net'
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
## Повышение производительности облачных вычислений на 70%

> Общие примечания и разделы для выбранных провайдеров хостинга (середина 2017).

- [AWS (Amazon Web Services), EC2 (Elastic Compute Cloud), EBS (Elastic Block Storage) и т.д.](#aws_tips)
- [Digital Ocean](#do_tips)
- [Packet.net](#packet_tips)

<a id='aws_tips'></a>

### Amazon Web Services / EC2 / EBS / S3

> TLDR; Хотя AWS обычно предлагает ограничивающие аппаратные средства и пугающие тарифные планы, **аппаратура i3.large** (и более крупные) обеспечивает лучшее соотношение цены и производительности ввода-вывода, а также является **самой быстрой в общей производительности**.

> EC2 **i3.large** с **475 ГБ NVMe SSD** обычно стоит около **$110/месяц!** > <br />
> **i3.2xlarge с 1,9 ТБ NVMe** стоит около **$450/месяц** * > <br /> > \_*США/2018\_

<br />
<br />

### Сравнение напрямую

\[[полный экран с данными](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>

[Просмотреть цены на EC2](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ec2instances.info](../ec2-updated-prices-2018.webp)

Обратите внимание, что **i3.\*xlarge** - это единственная аппаратура с конкурентноспособной по цене NVMe-памятью (сверхбыстрая скорость +1 ГБ/с). Основным ограничением, который я обнаружил, оказалась реальная скорость сети. Серверы с заявленной скоростью "до 10 Гб/с" не могли приблизиться к 1 Гб/с (60-80 МБ/с).

Тесты сети использовали до 9 дополнительных экземпляров в той же зоне доступности. Все ошибочные данные я заменил на 0. Необходимы дополнительные тесты, так как были собраны только 1-2 образца.

\[[полный экран с данными](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### Благодарности

- [ec2instances.info](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
