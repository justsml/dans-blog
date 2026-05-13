# Translation Candidate
- Slug: compare-nvme-ssd-cloud-options
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/de/index.mdx
- Validation: passed
- Runtime seconds: 9.85
- Input tokens: 4085
- Output tokens: 4076
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001305
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: 'NVMe SSD Direktvergleich: AWS, DigitalOcean, Packet.net'
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
## Cloud-Leistung bis zu 70 % steigern

> Allgemeine Hinweise und Abschnitte für ausgewählte Hosting-Anbieter unten (Mitte 2017).

- [AWS (Amazon Web Services), EC2 (Elastic Compute Cloud), EBS (Elastic Block Storage), usw.](#aws_tips)
- [Digital Ocean](#do_tips)
- [Packet.net](#packet_tips)

<a id='aws_tips'></a>

### Amazon Web Services / EC2 / EBS / S3

> Kurzfassung: Während AWS in der Regel eingeschränkte Hardware und abschreckende Preistierungen anbietet, ist die Hardware i3.large (und größer) am effizientesten hinsichtlich Preis vs. I/O-Leistung und zudem die schnellste in der Gesamtleistung.

> **EC2 i3.large** mit **475 GB NVMe SSD** kostet typischerweise etwa **110 USD pro Monat!**  
> **Ein i3.2xlarge mit 1,9 TB NVMe** kostet etwa **450 USD pro Monat** *  
> \*USA/2018\*  

<br />
<br />

### Kopf-an-Kopf-Vergleich

[Vollbild-Datensicht](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive)

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>

[Preise auf EC2 ansehen](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ec2instances.info](ec2-updated-prices-2018.webp)

Beachten Sie, dass **i3.\*xlarge** die einzige Hardware ist, die wettbewerbsfähige NVMe-Speicher (ultra-schnell, +1 GB/s) zum vergleichbaren Preis anbietet. Der größte Einschränkungsfaktor, den ich festgestellt habe, war die tatsächliche Netzwerkgeschwindigkeit. Server mit angepriesenen Geschwindigkeiten „bis zu 10/Gb/s“ erreichten kaum 1/Gb/s (60-80 MB/s).

Zur Netzwerküberprüfung wurden bis zu 9 zusätzliche Instanzen im gleichen Verfügbarkeitsbereich verwendet. Fehlende oder fehlerhafte Datenpunkte ersetzte ich durch 0. Weitere Tests sind erforderlich, da nur 1-2 Proben erhoben wurden.

\[[Vollbild-Datensicht](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### Credits

- [ec2instances.info](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
