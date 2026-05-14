# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/ar/index.mdx
- Validation: deferred
- Runtime seconds: 1.56
- Input tokens: 3424
- Output tokens: 890
- Thinking tokens: unknown
- Cached input tokens: 1664
- Cache write tokens: 0
- Estimated cost: $0.000294
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'تتبع المكدس غير المتزامن: لماذا `Error.stack` يخدعك'
subTitle: قائمة المهام الدقيقة أكلت واجبي (وسياق التصحيح).
date: '2025-12-29'
modified: '2025-12-30'
tags:
  - javascript
  - async
  - debugging
  - node.js
  - v8
  - performance
category: Code
subCategory: Best Practices
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
إنها الساعة الثانية صباحًا. إنذار PagerDuty يعلو بأعلى صوته.

تفتح السجلات وتجد ما يلي:

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

هذا كل شيء. لا اسم دالة. لا رقم سطر. لا مسار ملف. فقط "processTicksAndRejections".

مرحبًا بك في جافاسكريبت غير المتزامن، حيث تُختلق تتبعات المكدس ولا تهم أرقام السطور.

---

## لماذا تنكسر تتبعات المكدس

في الكود المتزامن، يُعدّ مكدس الاستدعاءات شجرة أنساب جميلة. استدعى A B، استدعى B C. عندما يتعطل C، يمكنك رؤية بالضبط كيف وصل إلى هناك.

في الكود غير المتزامن (`async/await`)، كل كلمة مفتاحية `await` تمثل نقطة تعليق.

عند تنفيذ `await`، تُقَلّب دالتك من المكدس. تُوضع في مجمّدٍ كريوجيني يُسمى طابور الميكرو‑مهام. يصبح المكدس الآن فارغًا (أو مشغولًا بشيء آخر).

عندما يُحلّ الوعد، تُذوب دالتك وتُعاد إلى المكدس. لكن التاريخ قد اختفى.

المحرك لا يملك أي فكرة عمن استدعى `await` قبل 500 مللي ثانية. هو فقط يعلم أن لديه مهمة للتنفيذ.

---

## محاولات V8 لإصلاح المشكلة

Node.js تحاول المساعدة. لدينا:

1.  `Error.captureStackTrace()`: يلتقط المكدس *عند الإنشاء*. لا فائدة إذا تم رمي الخطأ لاحقًا.
2.  `--async-stack-traces`: علم يجعل Node.js يحتفظ بـ "مكدس الظل" لسلاسل الـ Promise.
    *   التكلفة: يجعل تطبيقك أبطأ بنسبة 30٪.
    *   النتيجة: يساعد، لكنه يصبح صاخبًا بسرعة.

---

## الحل الحقيقي: AsyncLocalStorage

إذا أردت البقاء في الإنتاج، توقف عن النظر إلى تتبعات المكدس. انظر إلى السبب.

نحتاج إلى إرفاق السياق (معرف المستخدم، معرف الطلب) إلى "خيط" التنفيذ، حتى وهو ينتقل بين المكدس وطابور الميكرو‑مهام.

Node.js لديها أداة مدمجة لهذا: `AsyncLocalStorage`.

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. Wrap the request
context.run({ requestId: '123' }, () => {
  // 2. Call deep async code
  await processOrder();
});

// 3. Deep inside processOrder:
async function processOrder() {
  await db.query();
  
  // Magic! We can still see the requestId
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Failed to process order`);
}
```

لا يهم عدد عمليات `await` التي تحدث بينهما. السياق يبقى حيًا.

## دليل الإنتاج

1.  توقف عن الثقة في `err.stack`. هو غير مكتمل بطبيعة الحال.  
2.  استخدم التسجيل المهيكل. أرفق `requestId` إلى كل سطر سجل باستخدام `AsyncLocalStorage`.  
3.  تتبع، لا تتبع المكدس. استخدم OpenTelemetry. فهو يُظهر سلسلة السبب عبر الخدمات، وهذا ما يهمك فعليًا.  

الكود الخاص بك غير متزامن. لا ينبغي أن يكون سياق التصحيح كذلك.
````
