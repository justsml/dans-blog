# Translation Candidate
- Slug: compare-nvme-ssd-cloud-options
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/hi/index.mdx
- Validation: deferred
- Runtime seconds: 10.94
- Input tokens: 4426
- Output tokens: 4860
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001520
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: एनवीएमई एसएसडी क्लाउड विकल्पों की तुलना करें
subTitle: 'एनवीएमई एसएसडी सीधी तुलना: AWS, DigitalOcean, Packet.net'
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
## बादल के प्रदरशन को 70% तक बढ़ाएं

> चुनिंदा होस्टिंग प्रदाताओं के लिए जनरल नोट्स और अनुभाग (मध्य-2017)

- [AWS (एमेज़ॅन वेब सेवा), EC2 (एलास्टिक कम्प्यूट क्लाउड), EBS (एलास्टिक ब्लॉक स्टोरेज), आदि](#aws_tips)
- [डिजिटल ओशन](#do_tips)
- [पैकेट.नेट](#packet_tips)

<a id='aws_tips'></a>

### एमेज़ॅन वेब सेवा / EC2 / EBS / S3

> TLDR; जबकि AWS आमतौर पर प्रतिबंधक हार्डवेयर और भयानक मूल्य श्रेणियाँ प्रदान करता है, **i3.large** (और बड़े) हार्डवेयर में मूल्य बनाम I/O प्रदरशन के मामले में सबसे कुशल है, और समग्र प्रदरशन में सबसे तेज़ है।

> EC2 **i3.large** में **475GB NVMe SSD** आमतौर पर **$110/माह** के लगभग लागत होती है! > <br />
> **i3.2xlarge में 1.9TB NVMe** की लागत लगभग **$450/माह** है * > <br /> > \_*यूएसए/2018\_

<br />
<br />

### सीधा-सीधा तुलना

\[[पूर्ण-स्क्रीन डेटा दृश्य](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>

[ईसी 2 पर कीमतें देखें](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ईसी 2 इंस्टेंस जानकारी](../ec2-updated-prices-2018.webp)

ध्यान दें कि **i3.\*xlarge** से अनुकूलित मूल्य वाले NVMe संग्रहण (अत्यधिक तेज़ +1GB/s गति) के लिए यह एकमात्र हार्डवेयर है। मुझे पाया कि मुख्य सीमा वाला कारक वास्तविक नेटवर्क गति थी। '10/जीबी/सेकंड तक' की घोषित गति वाले सर्वर 1/जीबी/सेकंड (60-80एमबी/सेकंड) के करीब तक पहुंचने में कठिनाई महसूस कर रहे थे।

नेटवर्क परीक्षणों में उपलब्धता जोन में अतिरिक्त इंस्टेंसों का उपयोग किया गया। मैंने कोई त्रुटिपूर्ण डेटा बिंदु 0 से बदल दिए। केवल 1-2 नमूने एकत्र किए गए थे, इसलिए अतिरिक्त परीक्षण की आवश्यकता है।

\[[पूर्ण-स्क्रीन डेटा दृश्य](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### सम्मान

- [ईसी 2 इंस्टेंस जानकारी](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
