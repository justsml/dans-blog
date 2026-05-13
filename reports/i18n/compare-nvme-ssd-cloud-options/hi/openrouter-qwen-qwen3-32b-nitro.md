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
title: NVMe SSD क्लाउड विकल्प तुलना करें
subTitle: ''
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
## क्लाउड प्रदर्शन को 70% तक बढ़ाएं

> चुनिंदा होस्टिंग प्रदाताओं के लिए विशिष्ट टिप्स और अनुभाग (2017 के मध्य)।

- [AWS (एमेज़ॅन वेब सेवाएं), EC2 (एलास्टिक कंप्यूट क्लाउड), EBS (एलास्टिक ब्लॉक स्टोरेज), आदि](#aws_tips)
- [डिजिटल ओशन](#do_tips)
- [पैकेट.नेट](#packet_tips)

<a id='aws_tips'></a>

### एमेज़ॅन वेब सेवाएं / EC2 / EBS / S3

> TLDR; जबकि AWS आमतौर पर प्रतिबंधित हार्डवेयर और भयानक कीमत के स्तर प्रदान करता है, **i3.large** (और बड़े) हार्डवेयर मूल्य बनाम I/O प्रदर्शन के मामले में सबसे कुशल है, और समग्र प्रदर्शन में सबसे तेज़ है।

> **i3.लर्ज** मॉडल जिसमें **475 जीबी एनवीएमई एसएसडी** है, आमतौर पर **$110/माह!** की दर से उपलब्ध है।  
> <br />  
> **1.9 टीबी एनवीएमई** वाला **i3.2xlarge** मॉडल लगभग **$450/माह** की दर से उपलब्ध है।  
> <br />  
> \_*अमेरिका/2018\_*  

<br />  
<br />  

### सीधा तुलना  

[[पूर्ण-स्क्रीन डेटा दृश्य](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&format=interactive)]  

<iframe style="position: relative; left: -150px; height: 650px; width: 990px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>  

[ईसी 2 पर कीमत देखें](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)

![ec2instances.info](ec2-updated-prices-2018.webp)

ध्यान दें कि **i3.\*xlarge** ही एकमात्र हार्डवेयर है जिसमें प्रतिस्पर्धात्मक मूल्य वाले NVMe स्टोरेज (अत्यधिक तेज़ +1GB/s गति) हैं। मुख्य सीमा जो मैंने पाया वह वास्तविक नेटवर्क गति थी। घोषित गति "10 जीबी/सेकंड तक" वाले सर्वर 1 जीबी/सेकंड के करीब पहुंचने में कठिनाई महसूस कर रहे थे (60-80MB/s)।

नेटवर्क परीक्षणों में एक ही उपलब्धि क्षेत्र में 9 अतिरिक्त इंस्टेंस तक का उपयोग किया गया। कोई भी त्रुटिपूर्ण डेटा बिंदु मैंने शून्य से बदल दिया। अतिरिक्त परीक्षणों की आवश्यकता है क्योंकि केवल 1-2 नमूने एकत्रित किए गए।

\[[पूर्ण-स्क्रीन डेटा दृश्य](https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&format=interactive)\]

<iframe style="position: relative; left: -150px; height: 790px; width: 950px; min-width: 100%;" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>

#### सम्मान

- [ec2instances.info](https://www.ec2instances.info/?filter=nvm&region=us-east-2&cost_duration=monthly&selected=c5d.large,i3.large,i3.xlarge,i3.2xlarge)
````
