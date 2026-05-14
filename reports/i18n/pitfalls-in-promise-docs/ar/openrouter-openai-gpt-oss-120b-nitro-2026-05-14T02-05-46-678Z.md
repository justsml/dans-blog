# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/ar/index.mdx
- Validation: deferred
- Runtime seconds: 2.90
- Input tokens: 2343
- Output tokens: 833
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000241
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: مخاطر وثائق الـ Promise
subTitle: تجنّب المشكلات الناتجة عن الوثائق الشائعة
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
> اكتشاف أنماط مضادة للـ Promise في نتائج بحث جوجل والمكتبات الشهيرة.

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

لنبدأ باعتراف: أنا مذنب بكتابة نفس "الأنماط المضادة" التي أنتقدها أدناه، كما هو الحال مع الكثير من مطوري JavaScript. لا شيء مما أقدمه هدفه شخصي أو موجه إلى المؤلفين الأصليين. أنا فقط أجري مراجعة شفرة للأنماط الشائعة – آمل أن أنقل فهمًا لأولوياتي وعمليات التفكير النقدي التي أتبعها.

> آمل أن تتمكن من التعرف على علامات التحذير من الـ Promises السيئة بعد استيعاب هذا المشروع.

1. [CallbackHell.com](#callbackhellcom)
1. [StrongLoop](#strongloop)
1. [RisingStack](#risingstack)
1. [Q Library](#qlibrary)

--------------------------
### CallbackHell.com
> **CREDIT:** http://callbackhell.com/
![CallbackHell.com](../callbackhell.webp)

----------------------
### StrongLoop
> **CREDIT:** `https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`
![strong loop](../strongloop.webp)

----------------
### RisingStack
> **CREDIT:** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
هذه مقالة قوية إلى حد كبير. لدي قلق واحد فقط:

![Rising Stack](../risingstack.webp)

------------------------
### Q Library
> **CREDIT:** https://github.com/kriskowal/q

مكتبة Q هي واحدة من أقدم وأكثر المكتبات استخدامًا المرتبطة بـ "الوعود". لذلك تعاني من أمثلة قديمة وحاجة للحفاظ على التوافق مع الإصدارات السابقة.  
**أقول "مرتبطة بالوعود" لأنني أرى أن Q تدور أساسًا حول نمط `deferred`.**

قد تبدو مشابهة للوعود، لكنني أصرّ على أنها ليست كذلك. لديها مساحة سطح كبيرة جدًا لأسباب خاطئة. كما أن اتفاقية التسمية تختصر الأسماء بشكل غير متسق، مما يصعّب حفظ الواجهة. طرق مثل `when` و `done` ليست ضرورية.

الخلاصة: نمط `deferred` هو نمط مضاد مؤلم — لا يحسّن شيئًا تقريبًا مقارنةً بأسلوب الـ callback التقليدي.

![q first example](../qlibrary-1.webp)

![q xmlHTTP deferred anti-pattern](../qlibrary-2.webp)

> يرجى إلقاء نظرة على (وإعطاء نجمة) مشروع Github المرافق لهذه المقالة، [Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)

> هدف المشروع: البحث وتطوير أنماط لغات وظيفية أفضل في JavaScript.
````
