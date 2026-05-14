# Translation Candidate
- Slug: compare-nvme-ssd-cloud-options
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/he/index.mdx
- Validation: deferred
- Runtime seconds: 2.91
- Input tokens: 2734
- Output tokens: 1039
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000294
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: השוואת אפשרויות אחסון NVMe SSD בענן
subTitle: 'NVMe SSD – השוואה ישירה: AWS, DigitalOcean, Packet.net'
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
## משפרים את ביצועי הענן עד 70%

> הערות כלליות וקטעים לבחירת ספקי אירוח (אמצע 2017).

- [AWS (Amazon Web Services), EC2 (Elastic Compute Cloud), EBS (Elastic Block Storage), וכו'](#aws_tips)
- [Digital Ocean](#do_tips)
- [Packet.net](#packet_tips)

<a id='aws_tips'></a>

### Amazon Web Services / EC2 / EBS / S3

> TLDR; בעוד ש‑AWS לרוב מציעה חומרה מגבילה ומדרגות תמחור מאיימות, החומרה **i3.large** (וגדולה יותר) היא היעילה ביותר מבחינת מחיר מול ביצועי I/O, והיא גם המהירה ביותר בביצועים כוללים.

> EC2 **i3.large** עם **475 GB NVMe SSD** עולה בדרך כלל סביב **$110 לחודש!** > <br />
> **i3.2xlarge** עם 1.9 TB NVMe עולה כ‑**$450 לחודש** * > <br /> > \_*USA/2018\_

<br />
<br />

### ראש‑אל‑ראש

\[[תצוגת נתונים במסך מלא](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>

[הצג מחירים ב‑EC2](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ec2instances.info](../ec2-updated-prices-2018.webp)

שים לב שה‑**i3.\*xlarge** הוא היחיד שמציע אחסון NVMe בעל מחיר תחרותי (מהירות על‑הקצב +1 GB/s). המגבלה העיקרית שמצאתי הייתה מהירות הרשת האמיתית. שרתים עם פרסומות “עד 10 Gb/s” נאבקו להגיע אפילו קרוב ל‑1 Gb/s (60‑80 MB/s).

מבחני הרשת בוצעו עם עד 9 מופעים נוספים באותה אזור זמינות. כל נקודת נתון שגויה החלפתי ב‑0. נדרשים עוד מבחנים מכיוון שנאספו רק 1‑2 מדגמים.

\[[תצוגת נתונים במסך מלא](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### קרדיטים

- [ec2instances.info](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
