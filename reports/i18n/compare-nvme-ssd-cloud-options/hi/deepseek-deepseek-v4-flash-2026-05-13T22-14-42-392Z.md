# Translation Candidate
- Slug: compare-nvme-ssd-cloud-options
- Locale: hi
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/hi/index.mdx
- Validation: deferred
- Runtime seconds: 86.64
- Input tokens: 2585
- Output tokens: 3914
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001458
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: NVMe SSD क्लाउड विकल्पों की तुलना
subTitle: 'NVMe SSD आमने-सामने: AWS, DigitalOcean, Packet.net'
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
## क्लाउड प्रदर्शन को 70% तक बढ़ाएँ

> चुनिंदा होस्टिंग प्रदाताओं के लिए सामान्य नोट्स और अनुभाग नीचे दिए गए हैं (मध्य-2017)।

- [AWS (Amazon Web Services), EC2 (Elastic Compute Cloud), EBS (Elastic Block Storage), आदि।](#aws_tips)
- [Digital Ocean](#do_tips)
- [Packet.net](#packet_tips)

<a id='aws_tips'></a>

### Amazon Web Services / EC2 / EBS / S3

> संक्षेप में; जबकि AWS आमतौर पर प्रतिबंधात्मक हार्डवेयर और डराने वाले मूल्य स्तर प्रदान करता है, **i3.large** (और बड़े) हार्डवेयर मूल्य बनाम I/O प्रदर्शन के मामले में सबसे कुशल है, और समग्र प्रदर्शन में सबसे तेज़ है।

> EC2 **i3.large** जिसमें **475GB NVMe SSD** है, की सामान्य लागत लगभग **$110/माह** है!  
> <br />
> एक **i3.2xlarge जिसमें 1.9TB NVMe** है, की लागत लगभग **$450/माह** है *  
> <br />
> \_*USA/2018\_

<br />
<br />

### आमने-सामने तुलना

\[[पूर्ण-स्क्रीन डेटा दृश्य](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>

[EC2 पर मूल्य देखें](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ec2instances.info](../ec2-updated-prices-2018.webp)

ध्यान दें कि **i3.\*xlarge** ही एकमात्र हार्डवेयर है जो प्रतिस्पर्धी मूल्य पर NVMe स्टोरेज (अल्ट्रा-फास्ट +1GB/s स्पीड) प्रदान करता है। मेरे अनुभव में सबसे बड़ी सीमा वास्तविक नेटवर्क स्पीड थी। "10 Gb/s तक" की विज्ञापित स्पीड वाले सर्वर 1 Gb/s (60-80MB/s) के करीब भी नहीं पहुँच पाए।

नेटवर्क परीक्षणों में एक ही उपलब्धता क्षेत्र में 9 अतिरिक्त इंस्टेंस का उपयोग किया गया। किसी भी त्रुटिपूर्ण डेटा बिंदु को मैंने 0 से बदल दिया। केवल 1-2 नमूने एकत्र किए गए थे, इसलिए अतिरिक्त परीक्षणों की आवश्यकता है।

\[[पूर्ण-स्क्रीन डेटा दृश्य](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### श्रेय

- [ec2instances.info](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
