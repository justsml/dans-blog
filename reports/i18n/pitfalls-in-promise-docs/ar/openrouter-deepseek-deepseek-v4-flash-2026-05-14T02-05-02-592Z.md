# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: ar
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/ar/index.mdx
- Validation: deferred
- Runtime seconds: 24.69
- Input tokens: 2200
- Output tokens: 2625
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.000990
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: المزالق في وثائق Promise
subTitle: تجنب مشكلات الوثائق الشائعة
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
> اكتشاف الأنماط المضادة للوعود في نتائج بحث جوجل والمكتبات الشائعة.

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

دعني أبدأ باعتراف: أنا مذنب بكتابة نفس «الأنماط المضادة» التي أنتقدها أدناه، كما أن العديد من مطوري JavaScript مذنبون أيضًا. ليس ما طرحته موجَّهًا شخصيًا أو حتى إلى المؤلفين الأصليين. أنا فقط أقوم بمراجعة كود للأنماط الشائعة — آمل أن أنقل فهمًا لأولوياتي وعمليات التفكير النقدي.

> آمل أن تتمكن من اكتشاف العلامات التحذيرية للوعود السيئة بعد فهم هذا المشروع.

1. [CallbackHell.com](#callbackhellcom)
1. [StrongLoop](#strongloop)
1. [RisingStack](#risingstack)
1. [مكتبة Q](#qlibrary)

--------------------------
### CallbackHell.com
> **المصدر:** http://callbackhell.com/
![CallbackHell.com](../callbackhell.webp)

----------------------
### StrongLoop
> **المصدر:** `https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`
![strong loop](../strongloop.webp)

----------------
### RisingStack
> **المصدر:** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
هذه مقالة متينة جدًا. لدي فقط ملاحظة واحدة:

![Rising Stack](../risingstack.webp)

------------------------
### مكتبة Q
> **المصدر:** https://github.com/kriskowal/q

مكتبة Q هي واحدة من أكثر المكتبات استخدامًا وأقدمها المرتبطة بـ "الوعود". وبالتالي فهي تعاني من أمثلة قديمة وحاجتها للحفاظ على التوافق مع الإصدارات السابقة. **أقول "مرتبطة بـ 'الوعود'" لأنني أشعر أن Q تدور في الحقيقة حول نمط `deferred`.**

قد تشبه الوعود، لكنني أصر على أنها ليست كذلك. لديها مساحة سطح كبيرة جدًا لأسباب خاطئة تمامًا. كما أن اصطلاح التسمية يختصر الأسماء بشكل غير متناسق، مما يجعل حفظ الواجهة أكثر صعوبة. طرق مثل `when` و `done` ليست ضرورية.

الخلاصة: نمط `deferred` هو نمط مضاد مؤلم - فهو لا يحسن شيئًا تقريبًا مقارنة بنهج الاستدعاء الخلفي النموذجي.

![مثال أول لـ Q](../qlibrary-1.webp)

![نمط deferred المضاد لـ xmlHTTP في Q](../qlibrary-2.webp)

> يُرجى إلقاء نظرة على (ووضع نجمة) مشروع Github المرافق لهذه المقالة، [الهروب من جبل الاستدعاء الخلفي](https://github.com/justsml/escape-from-callback-mountain)

> هدف المشروع: البحث وتطوير أنماط لغوية وظيفية أفضل في JavaScript.
````
