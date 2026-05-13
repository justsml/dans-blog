# Translation Candidate
- Slug: compare-nvme-ssd-cloud-options
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/it/index.mdx
- Validation: deferred
- Runtime seconds: 12.27
- Input tokens: 4199
- Output tokens: 3847
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001259
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Confronta le opzioni per Cloud NVMe SSD
subTitle: 'Confronto diretto NVMe SSD: AWS, DigitalOcean, Packet.net'
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
## Aumentare le prestazioni cloud fino al 70%

> Note generali e sezioni per alcuni provider di hosting (metà 2017).

- [AWS (Amazon Web Services), EC2 (Elastic Compute Cloud), EBS (Elastic Block Storage), ecc.](#aws_tips)
- [Digital Ocean](#do_tips)
- [Packet.net](#packet_tips)

<a id='aws_tips'></a>

### Amazon Web Services / EC2 / EBS / S3

> TL;DR: Sebbene AWS offra in genere hardware restrittivo e fasce di prezzo intimidatorie, il **i3.large** (e le dimensioni superiori) è il più efficiente in termini di Prezzo rispetto alle Prestazioni I/O, E è il Più veloce in termini di Prestazioni Complessive.

> L'istanza EC2 **i3.large** con **475GB NVMe SSD** costa tipicamente circa **$110/mese!**  
> L'**i3.2xlarge con 1,9TB NVMe** costa circa **$450/mese** *  
> \_*USA/2018\_

<br />
<br />

### Confronto diretto

[[visualizzazione a schermo intero](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive) dei dati completi]

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>

[Visualizza i prezzi su EC2](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ec2instances.info](../ec2-updated-prices-2018.webp)

Nota che **i3.\*xlarge** è l'unico hardware a offrire archiviazione NVMe a prezzo competitivo (velocità ultra veloci di +1GB/s). Il principale limite che ho trovato era la reale velocità di rete. I server con velocità pubblicizzate "fino a 10/Gb/s" faticavano a raggiungere 1/Gb/s (60-80MB/s).

I test di rete hanno utilizzato fino a 9 istanze aggiuntive nella stessa zona di disponibilità. Qualsiasi punto dati errato ho sostituito con uno 0. Sono necessari ulteriori test poiché sono stati raccolti solo 1-2 campioni.

\[[Visualizza dati a schermo intero](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### Crediti

- [ec2instances.info](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
