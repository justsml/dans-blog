# Translation Candidate
- Slug: compare-nvme-ssd-cloud-options
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/es/index.mdx
- Validation: passed
- Runtime seconds: 8.39
- Input tokens: 4302
- Output tokens: 3479
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001179
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: 'NVMe SSD frente a frente: AWS, DigitalOcean, Packet.net'
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
## Mejora el rendimiento en la nube hasta un 70%

> Notas generales y secciones para proveedores de alojamiento seleccionados (mediados de 2017).

- [AWS (Amazon Web Services), EC2 (Elastic Compute Cloud), EBS (Elastic Block Storage), etc.](#aws_tips)
- [Digital Ocean](#do_tips)
- [Packet.net](#packet_tips)

<a id='aws_tips'></a>

### Amazon Web Services / EC2 / EBS / S3

> TLDR; Aunque AWS suele ofrecer hardware restringido y tarifas intimidantes, el hardware **i3.large** (y de mayor tamaño) es el más eficiente en términos de Precio vs. Rendimiento de E/S, Y es el más rápido en Rendimiento General.

> EC2 **i3.large** con **475GB NVMe SSD** suele costar alrededor de **$110/mes!** > <br />
> Un **i3.2xlarge con 1.9TB NVMe** cuesta aproximadamente **$450/mes** * > <br /> > \_*USA/2018\_

<br />
<br />

### Comparación directa

[[vista de datos en pantalla completa](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive)]

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>

[Ver precios en EC2](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ec2instances.info](../ec2-updated-prices-2018.webp)

Observe que **i3.\*xlarge** es el único hardware que ofrece almacenamiento NVMe con precios competitivos (velocidades ultra rápidas de +1 GB/s). El factor limitante principal que encontré fue la velocidad real de red. Los servidores con velocidades anunciadas de "hasta 10/Gb/s" tenían dificultades para alcanzar 1/Gb/s (60-80 MB/s).

Las pruebas de red usaron hasta 9 instancias adicionales en la misma zona de disponibilidad. Cualquier punto de datos erróneo lo reemplacé con un 0. Se necesitan pruebas adicionales ya que solo se recopilaron 1-2 muestras.

\[[vista de datos en pantalla completa](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### Créditos

- [ec2instances.info](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
