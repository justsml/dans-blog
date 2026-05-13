# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/hi/index.mdx
- Validation: deferred
- Runtime seconds: 10.86
- Input tokens: 3240
- Output tokens: 5179
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001502
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: प्रमिस दस्तावेज़ में सावधानियाँ
subTitle: ''
date: '2017-05-10'
modified: '2024-07-30'
category: Code
subCategory: promises
tags:
  - programming
  - patterns
  - promises
  - functional-programming
cover: ../craig-whitehead-433328-unsplash.webp
cover_mobile: ../w300_craig-whitehead-433328-unsplash.webp
cover_icon: ../icon_craig-whitehead-433328-unsplash.webp
---
गूगल खोज परिणामों और लोकप्रिय पुस्तकालयों में प्रमिस एंटी-पैटर्न पहचानना।

![क्रेग-व्हाइटहेड-433328-अनस्प्लैश.वेबप](../craig-whitehead-433328-unsplash.webp)

मैं एक खुलासा करना चाहता हूँ: मैंने नीचे बताए गए एंटी-पैटर्न्स लिखे हैं, जिनकी मैं आलोचना करता हूँ, जैसा कि मैं जानता हूँ कि कई JS डेवलपर्स भी ऐसा ही करते हैं। मैंने जो भी बताया है, वह किसी व्यक्ति के खिलाफ नहीं है या अपने आपको आलोचना करने के लिए नहीं है। मैं केवल सामान्य पैटर्नों पर एक कोड रिव्यू कर रहा हूँ - मैं अपनी प्राथमिकताओं और आलोचनात्मक चिंतन प्रक्रियाओं की समझ आगे बढ़ाने की आशा करता हूँ।

> आशा है कि आप इस प्रोजेक्ट को समझने के बाद खराब प्रमिस के चेतावनी चिह्नों को पहचान पाएंगे।

1. [कॉलबैकहेल.कॉम](#callbackhellcom)
1. [स्ट्रॉन्गलूप](#strongloop)
1. [राइजिंगस्टैक](#risingstack)
1. [क्यू पुस्तकालय](#qlibrary)

--------------------------
### कॉलबैकहेल.कॉम
> **क्रेडिट:** http://callbackhell.com/
![कॉलबैकहेल.कॉम](../callbackhell.webp)

--------------------------
### स्ट्रॉन्गलूप
> **क्रेडिट:** `https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`
![स्ट्रॉन्ग लूप](../strongloop.webp)

----------------
### राइजिंगस्टैक
> **क्रेडिट:** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
यह एक बेहद ठोस लेख है। मेरे पास केवल 1 चिंता है:

![राइजिंग स्टैक](../risingstack.webp)

------------------------
### क्यू पुस्तकालय
> **क्रेडिट:** https://github.com/kriskowal/q

क्यू पुस्तकालय "प्रमिसेस" से जुड़े सबसे पुराने और सबसे अधिक उपयोग किए गए पुस्तकालयों में से एक है। इसलिए इसे आयु के साथ उदाहरणों के समस्याओं और पिछड़े तकनीकी संगतता के आवश्यकता का सामना करना पड़ता है।
**मैं "प्रमिसेस" से जुड़े कहता हूँ क्योंकि मुझे लगता है कि क्यू वास्तव में `deferred` पैटर्न के बारे में है।**

यह प्रमिसेस के समान दिख सकता है, हालांकि मैं इसे नकारात्मक रूप से बताता हूँ। इसमें गलत कारणों से अव्यवहारिक रूप से बड़ा अंतरफल है। यह नामकरण परंपरा असंगत रूप से संक्षिप्त नामों का उपयोग करती है, जिससे इंटरफेस को याद रखना मुश्किल हो जाता है। `when` और `done` जैसे विधियाँ आवश्यक नहीं हैं।

मुख्य बात: `deferred` पैटर्न एक दर्दनाक प्रतिरूप है - यह आम कॉलबैक दृष्टिकोण की तुलना में लगभग कुछ नहीं सुधारता है।

![q first example](qlibrary-1.webp)

![q xmlHTTP deferred anti-pattern](qlibrary-2.webp)

> कृपया इस लेख के साथी गिटहब परियोजना [Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain) को देखें (& स्टार करें)

> परियोजना लक्ष्य: जावास्क्रिप्ट में बेहतर कार्यात्मक भाषा प्रतिरूपों का अनुसंधान और विकास।
````
