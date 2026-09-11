# Translation Candidate
- Slug: compare-nvme-ssd-cloud-options
- Locale: fr
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/fr/index.mdx
- Validation: deferred
- Runtime seconds: 19.65
- Input tokens: 3401
- Output tokens: 2465
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001026
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Comparer les options cloud de SSD NVMe
subTitle: 'NVMe SSD Face-à-face : AWS, DigitalOcean, Packet.net'
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
## Boostez les performances cloud jusqu'à 70%

> Notes générales et sections pour certains hébergeurs ci-dessous (mi-2017).

- [AWS (Amazon Web Services), EC2 (Elastic Compute Cloud), EBS (Elastic Block Storage), etc.](#aws_tips)
- [Digital Ocean](#do_tips)
- [Packet.net](#packet_tips)

<a id='aws_tips'></a>

### Amazon Web Services / EC2 / EBS / S3

> TLDR; Bien qu'AWS propose généralement du matériel restrictif et des grilles tarifaires intimidantes, le matériel **i3.large** (et au-delà) est le plus efficace en termes de prix par rapport aux performances E/S, ET est le plus rapide en performances globales.

> EC2 **i3.large** avec un **NVMe SSD de 475 Go** coûte généralement environ **110 $/mois !**
> <br />
> Un **i3.2xlarge avec 1,9 To NVMe** coûte environ **450 $/mois** *
> <br />
> \_*États-Unis/2018\_

<br />
<br />

### Face à face

\[[vue en plein écran](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>

[Voir les prix sur EC2](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ec2instances.info](ec2-updated-prices-2018.webp)

Notez que le matériel **i3.\*xlarge** est le seul à proposer un stockage NVMe à prix compétitif (vitesses ultra-rapides de +1 Go/s). Le principal facteur limitant que j'ai constaté était la vitesse réseau réelle. Les serveurs annoncés avec des vitesses « jusqu'à 10 Gb/s » avaient du mal à atteindre 1 Gb/s (60-80 Mo/s).

Les tests réseau utilisaient jusqu'à 9 instances supplémentaires dans la même zone de disponibilité. Les points de données erronés ont été remplacés par un 0. Des tests supplémentaires sont nécessaires car seulement 1 à 2 échantillons ont été collectés.

\[[vue en plein écran](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### Crédits

- [ec2instances.info](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
