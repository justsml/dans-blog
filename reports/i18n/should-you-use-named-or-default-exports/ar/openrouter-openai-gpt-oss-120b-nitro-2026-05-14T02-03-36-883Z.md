# Translation Candidate
- Slug: should-you-use-named-or-default-exports
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-18--should-you-use-named-or-default-exports/ar/index.mdx
- Validation: deferred
- Runtime seconds: 3.71
- Input tokens: 3017
- Output tokens: 1399
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000369
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'تصديرات ESM: مسماة أم افتراضية؟'
subTitle: أن تُسمى أم لا تُسمى؟
date: '2023-08-10'
modified: '2024-08-01'
tags:
  - typescript
  - javascript
  - modules
category: Guides
subCategory: JavaScript
cover: ../austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_mobile: ../w300_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_icon: ../icon_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
---
## هل يجب عليك استخدام الصادرات `named` أم `default` في جافاسكريبت؟

لا يوجد نقص في المقالات الحادة حول هذا الموضوع.

الغالبية تحكم على `default export` بأنها “فظيعة”. وآخرون يصرون على أن `default` يجب أن ينتصر (مثلاً دليل أسلوب AirBnb).

غالبًا ما يلقون اللوم على أمور **مؤقتة تمامًا**: أخطاء الاستيراد التلقائي في IDE، قدرات شجرة التقليم (tree‑shaking) في أداة تجميع معينة، أو مجرد احتمال حدوث أخطاء إملائية عند تسمية الاستيراد.

هل فاتنا جوهر `export` من الأساس؟

**الكود هو تواصل. ✨**

> نحن نرسل إشارة إلى `import`ers _كيف يستخدمون الشيء._

### إذن، ماذا نقول؟

بشكل عام، هناك طريقتان لتصدير الأشياء في جافاسكريبت الحديثة:

- `export default` يعلن بجرأة “هذا هو **_الأهم على الإطلاق_**”. وأيضًا، “أي صادرات مسماة تلعب دورًا داعمًا فقط”.
- `named export` يقول إنه “بالتأكيد **_شيء!_**” كما يثير بعض الأسئلة، “هل لديك رفاق آخرون هناك؟” ويتبع ذلك، “هل هم مدعوون أم مطلوبون؟”.

بالطبع يمكنك دمج الاثنين، أو استخدام نهج مختلف لأجزاء مختلفة من قاعدة الشيفرة الخاصة بك. [انظر المزيد من الأمثلة في نهاية المقال.](../#summary)

### حجج ضعيفة، يا رجل

دعنا نتعامل مع بعض “المشكلات المؤقتة” الشائعة التي يواجهها الناس.

- الحجة #1: الصادرات المسماة تضمن اتساق الأسماء. [المصدر](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - لا، هذا غير صحيح. ربما تبحث عن قاعدة lint؟
  - (أكره أن أكسر لك الوهم، لكن انتظر حتى تتعرف على ما يمكن للمتغيرات فعله!)

```tsx
// يمكنك إنشاء اسم مستعار باستخدام كليهما!
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- الحجة #2: استخدم `import * as soManyKnives from './kinves.js'` لدمج الصادرات المسماة. (غير مرتبط، المؤلف تراجع.)
  - ميزة لطيفة. ليست النقطة الأساسية.
  - الآن أخبرني، كيف أمسك جهازك مرة أخرى؟ لا نية واضحة من المؤلف.
- الحجة #3: الصادرات المسماة تحصل على دعم أفضل للاستيراد أو إعادة التسمية في IDE. [المصدر](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

- غير صحيح (أية أخرى). قم بتهيئة/تحديث أدواتك.
  - الدعم موجود منذ أكثر من 3 سنوات في [VS Code](https://github.com/microsoft/vscode/pull/94480)، IntelliJ، إلخ.
  - مع ذلك، هناك بعض “أفضل الممارسات” لاستخدامها مع `export default` للحصول على أفضل تجربة IDE وإعادة هيكلة.
  - ✅ `export default function UserService() {}` – يفضَّل دائمًا الدوال المسماة.
  - ❌ `export default function() { }` – الدوال المجهولة لا ترتبط ضمنيًا باسم ملفها. إذا لم تسمِّ الشيء، يصبح من الصعب أن تطلب من الحاسوب تغييره.
  - **ملاحظة:** لأسباب تاريخية لا يمكنك دمج `export default` مع تعبير `const`.

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ غير مدعوم ❌ ^
    // لا يمكن تصدير const بشكل افتراضي ....
    // ==========================

    // ومع ذلك، بمجرد الإعلان يمكنك تصدير متغير const كافتراضي.
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ صالح

    // للإكمال:
    export default class anyoneStillUseThese {}
    // ^ ✅ صالح أيضًا لتصدير فئة كافتراضية
    ```

<section className="scroll-x">
## الخلاصة

في الواقع هناك العديد من التركيبات التي يمكننا من خلالها تصدير الأشياء، كل منها يروي قصة مختلفة:

| Default (Exports) | Named (Exports) | Private Fns | Pattern                                                   | Meaning                                                       |
| ----------------- | --------------- | ----------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| ✅                | ❌              | ❌          | تصدير افتراضي واحد.                                       | “عرض دالة واحدة ذات هدف واحد!”                                 |
| ❌                | ✅              | ❌          | تصدير مسمى واحد.                                         | “من فضلك لا تعيد تسميتي.”                                      |
| ✅                | ✅              | ✅          | تصدير افتراضي + عدة دوال ‘خاصة’ غير مُصدَّرة               | “إليك بعض المنطق المرتبط. أيضًا، توقع سلوك شبيه بالفئة.”      |
| ❌                | ❌              | ✅          | عدة صادرات مسماة، اسم ملف عام.                            | “مجموعة عشوائية من الأشياء ذات صلة ضعيفة، لا توجد هرمية مفترضة.” |
| ✅                | ✅              | ❌          | تصدير مسمى واحد يُصدَّر أيضًا كافتراضي.                   | “لا يمكنك أن تخطئ في استيرادي.”                               |
</section>

**شيء للتفكير فيه:** ماذا نقول عندما يتطابق اسم الملف أو لا يتطابق مع أحد صاداراته؟ (على سبيل المثال، `utils.js` يحتوي على العديد من الدوال.)

### الخاتمة

إذا كان الكود هو التواصل، فالرجاء `export` كما تعني ذلك حقًا. 💞
````
