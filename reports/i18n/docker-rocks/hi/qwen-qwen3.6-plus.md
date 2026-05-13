# Translation Candidate
- Slug: docker-rocks
- Locale: hi
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2015-06-11--docker-rocks/hi/index.mdx
- Validation: deferred
- Runtime seconds: 137.37
- Input tokens: 1944
- Output tokens: 7536
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 1052
- Estimated cost: $0.015327
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker शानदार है और अब OSX पर भी चलता है
subTitle: 'Docker शानदार, तेज़ और लचीला है।'
date: '2015-06-11'
modified: '2024-08-10'
category: DevOps
subCategory: docker
tags:
  - docker
  - boot2docker
  - devops
related:
  - docker-makes-everything-better
  - docker-server-setup-notes
  - docker-security-tips-for-self-hosting
cover: ../guillaume-bolduc-259596-unsplash.webp
cover_mobile: ../w300_guillaume-bolduc-259596-unsplash.webp
cover_icon: ../icon_guillaume-bolduc-259596-unsplash.webp
---
## Docker शानदार है

> अपडेट सितंबर 2016, 2018
> Boot2Docker को Docker for Mac से बदल दिया गया है

> ऐतिहासिक नोट: यह पोस्ट जानबूझकर 2015 के दौर के Docker-for-Mac स्नैपशॉट के रूप में संरक्षित है। परफॉर्मेंस सलाह और टूलिंग के नाम उसी समय के कॉन्टेक्स्ट को दर्शाते हैं; मौजूदा Docker Desktop और Compose वर्कफ़्लो आगे बढ़ चुके हैं।

1. Docker शानदार, तेज़ और फ़्लेक्सिबल है।
1. पिछले टूल्स, खासकर boot2docker, धीमे थे और बार-बार क्रैश हो जाते थे।

Docker वर्तमान में Linux Kernel v3.4+ पर नेटिव रूप से रन हो सकता है — और मौजूदा boot2docker VM वास्तव में v4 चलाता है।

हार्डवेयर का इष्टतम उपयोग: अपने Mac/Windows बॉक्स पर Latest Debian या Ubuntu इंस्टॉल करें,

... चलो छोड़ो, वो गेम्स तुम्हारे कोड को बेहतर नहीं बना रहे...

### अपना सेटअप चेक करें

`docker info` कमांड के आउटपुट को रिव्यू करें।

1. सुरक्षा: रिमोट नेटवर्क से `nmap` चलाकर सर्वर पर अनपेक्षित रूप से खुले पोर्ट्स की जाँच करें।
1. DNS: लोकल कैश या लो-लेटेंसी DNS सर्वर का उपयोग करें।
1. स्टोरेज: सही स्टोरेज ड्राइवर कॉन्फ़िगर करें (`overlay2` की संभावना अधिक है)

2024 अपडेट:

- Docker Desktop प्रोप्राइटरी है, लेकिन पर्सनल यूज़ के लिए फ्री है। OSX या Windows पर Docker शुरू करने का यह एक ठोस तरीका है।
- अगर आप ज़्यादा ओपन-सोर्स सॉल्यूशन की तलाश में हैं, तो [Rancher Desktop](https://rancherdesktop.io/) देखें।
````
