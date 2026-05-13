# Translation Candidate
- Slug: security-notes-regex
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/hi/index.mdx
- Validation: deferred
- Runtime seconds: 1.04
- Input tokens: 2007
- Output tokens: 712
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000206
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'सुरक्षा नोट्स: रेगेक्स'
subTitle: क्या रेगैक्स (RegEx) भी असुरक्षित हो सकता है?
date: '2015-02-24'
modified: '2018-07-30'
category: Security
subCategory: RegEx
tags:
  - security
  - regex
  - dos
  - remote-exploit
cover_credit: Photo by Markus Spiske on Unsplash
cover: ../markus-spiske-666905-unsplash.webp
cover_mobile: ../w300_markus-spiske-666905-unsplash.webp
cover_icon: ../icon_markus-spiske-666905-unsplash.webp
social_image: ../desktop-social.webp
---
## रेगएक्स डिनायल‑ऑफ़‑सर्विस: ReDOS

एक ऐसी असामान्य, फिर भी पहचानने में कठिन सुरक्षा कमजोरी जो मैंने पाई है, वह रेगुलर एक्सप्रेशन से जुड़ी है।  
या तो खराब लिखा गया या खराब इम्प्लीमेंट किया गया।

बड़े या विशेष रूप से तैयार किए गए उपयोगकर्ता इनपुट से मेमोरी/CPU समाप्त हो सकता है।

> यह एक डिनायल‑ऑफ़‑सर्विस कमजोरी है, सिर्फ़ प्रदर्शन की गंध नहीं। यदि दुर्भावनापूर्ण इनपुट CPU को इतना देर तक रोक सकता है कि वास्तविक उपयोगकर्ता भूखे रह जाएँ, तो इसे आपके सुरक्षा थ्रेट मॉडल में शामिल किया जाना चाहिए।

### चेतावनी संकेत

1. नेस्टेड क्वांटिफ़ायर, दोहराए गए समूह, या ओवरलैपिंग अल्टरनेशन  
2. बैकट्रैकिंग‑हेवी इंजन बिना टाइमआउट या इनपुट‑लेंथ लिमिट के  
3. एक्सप्रेशन को अनचेक्ड यूज़र इनपुट के साथ इस्तेमाल किया गया  
4. रेगेक्स वैलिडेशन हॉट रिक्वेस्ट पाथ पर चल रहा है  

### शमन / समाधान

1. रेगएक्स कठिन है।  
    1. उदाहरण के तौर पर, यहाँ है कि कैसे [OWASP ने IP वैलिडेशन को हैंडल करने की सलाह दी है][owasp]: `^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`  
    2. यह एक (पुराने ज़माने के) ट्वीट से भी लंबा है, 4‑बाइट IP एड्रेस के लिए!!!  
2. रेगेक्स मूल्यांकन से पहले इनपुट की लंबाई को सीमित करें।  
3. टाइमआउट, स्टैटिक एनालिसिस, या जहाँ प्लेटफ़ॉर्म समर्थन करता है, नॉन‑बैकट्रैकिंग इंजन जोड़ें।  
4. यह लगभग हर भाषा और प्लेटफ़ॉर्म को प्रभावित करता है — .NET/Node/Python/PERL/Java।  

### संदर्भ

- [OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
