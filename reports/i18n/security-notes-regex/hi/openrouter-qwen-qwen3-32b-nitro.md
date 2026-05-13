# Translation Candidate
- Slug: security-notes-regex
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 6.71
- Input tokens: 2142
- Output tokens: 3585
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001032
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug security-notes-regex --locale hi
## Raw Output

````mdx
---
title: 'सुरक्षा टिप्पणियाँ: RegEx'
subTitle: क्या RegEx असुरक्षित हो सकते हैं?
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
## रेगेक्स सेवा-अस्वीकृति: रीडॉस

मुझे अप्रत्याशित लेकिन खोजने में कठिन एक अंतर्निहित खतरा मिला है जो नियमित अभिव्यक्तियों से संबंधित है। या तो खराब लिखे गए या खराब लागू किए गए।

मेमोरी/सीपीयू बड़े या विशेष रूप से डिज़ाइन किए गए उपयोगकर्ता इनपुट के साथ अव्यवस्थित किए जा सकते हैं।

> यह एक सेवा-अस्वीकृति अंतर्निहित खतरा है, बस एक प्रदर्शन संबंधी समस्या नहीं। अगर दुर्भावनापूर्ण इनपुट सीपीयू को लंबे समय तक अवरुद्ध कर सकता है जिससे वास्तविक उपयोगकर्ता बरबस रह जाएं, तो यह आपके सुरक्षा खतरा मॉडल में शामिल होना चाहिए।

### चेतावनी चिह्न

1. नेस्टेड क्वांटिफायर, दोहराए गए समूह, या अतिव्यापी वैकल्पिक विकल्प  
2. बैकट्रैकिंग-भारी इंजन जिनमें टाइमआउट या इनपुट-लंबाई सीमा न हो  
3. अभिव्यक्ति अपरिशोधित उपयोगकर्ता इनपुट के साथ उपयोग होती है  
4. रेगेक्स सत्यापन एक गर्म अनुरोध पथ पर चलता है

### मिटिगेशन / समाधान

1. रेगेक्स कठिन है।  
    1.  उदाहरण के लिए, यहां [ओवास्प](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS) आईपी सत्यापन करने की सिफारिश करते हैं:  
        ```regex
        ^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$
        ```
    2.  यह एक 4-बाइट आईपी पते के लिए एक (पुराने अंदाज़ में) ट्वीट से भी लंबा है!!!  
2. रेगेक्स मूल्यांकन से पहले इनपुट लंबाई को सीमित करें।  
3. जहां प्लेटफॉर्म समर्थन करता है, वहां टाइमआउट, स्थैतिक विश्लेषण, या बैकट्रैकिंग-मुक्त इंजन जोड़ें।  
4. यह .NET/नोड/पायथन/परल/जावा सहित लगभग हर भाषा और प्लेटफॉर्म पर प्रभाव डालता है।  

### संदर्भ

- [ओवास्प रीडोएस](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
