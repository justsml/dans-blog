# Translation Candidate
- Slug: compare-nvme-ssd-cloud-options
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 3.14
- Input tokens: 4231
- Output tokens: 1134
- Thinking tokens: unknown
- Cached input tokens: 1920
- Cache write tokens: 0
- Estimated cost: $0.000369
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/hi/index.mdx reports/i18n/compare-nvme-ssd-cloud-options/hi
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: NVMe SSD क्लाउड विकल्पों की तुलना
subTitle: 'NVMe SSD प्रत्यक्ष तुलना: AWS, DigitalOcean, Packet.net'
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
## क्लाउड प्रदर्शन को 70 % तक बढ़ाएँ

> नीचे चयनित होस्टिंग प्रदाताओं के लिए सामान्य नोट्स और सेक्शन (मिड‑2017)।

- [AWS (Amazon Web Services), EC2 (Elastic Compute Cloud), EBS (Elastic Block Storage), आदि](#aws_tips)
- [Digital Ocean](#do_tips)
- [Packet.net](#packet_tips)

<a id='aws_tips'></a>

### Amazon Web Services / EC2 / EBS / S3

> TLDR; जबकि AWS अक्सर प्रतिबंधित हार्डवेयर और डरावनी मूल्य श्रेणियाँ पेश करता है, **i3.large** (और बड़े) हार्डवेयर मूल्य बनाम I/O प्रदर्शन के संदर्भ में सबसे कुशल है, और समग्र प्रदर्शन में सबसे तेज़ है।

> EC2 **i3.large** के साथ **475 GB NVMe SSD** की कीमत आम तौर पर **$110/माह** होती है! > <br />
> **i3.2xlarge** जिसमें 1.9 TB NVMe है, उसकी लागत लगभग **$450/माह** है * > <br /> > \_*USA/2018\_

<br />
<br />

### सीधा तुलना

\[[पूर्ण‑स्क्रीन डेटा दृश्य](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>

[EC2 पर कीमतें देखें](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ec2instances.info](../ec2-updated-prices-2018.webp)

ध्यान दें कि **i3.\*xlarge** ही वह एकमात्र हार्डवेयर है जिसमें प्रतिस्पर्धी कीमत वाला NVMe स्टोरेज (अल्ट्रा‑फ़ास्ट +1 GB/s गति) उपलब्ध है। मैंने जो मुख्य सीमा देखी वह वास्तविक नेटवर्क गति थी। “up to 10 Gb/s” के रूप में विज्ञापित सर्वर 1 Gb/s (60‑80 MB/s) के करीब भी नहीं पहुँच पाए।

नेटवर्क परीक्षण में समान उपलब्धता ज़ोन में अधिकतम 9 अतिरिक्त इंस्टेंस उपयोग किए गए। किसी भी त्रुटिपूर्ण डेटा पॉइंट को मैं 0 से बदल दिया। केवल 1‑2 नमूने एकत्र किए गए थे, इसलिए अतिरिक्त परीक्षण आवश्यक हैं।

\[[फ़ुल‑स्क्रीन डेटा व्यू](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### Credits

-[ec2instances.info](../https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
