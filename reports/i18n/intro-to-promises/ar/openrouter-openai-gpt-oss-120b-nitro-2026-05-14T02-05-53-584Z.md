# Translation Candidate
- Slug: intro-to-promises
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-08-01--intro-to-promises/ar/index.mdx
- Validation: deferred
- Runtime seconds: 2.86
- Input tokens: 3419
- Output tokens: 811
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000279
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: مقدمة في الوعود
subTitle: الوعود في جافاسكريبت ممتعة!
date: '2018-08-01'
modified: '2024-07-31'
category: Code
subCategory: promises
tags:
  - promises
  - async
  - javascript
  - composition
related:
  - promise-gotchas
  - visualizing-promises
  - stop-trying-to-make-async-await-happen
  - javascript-promises-quiz
cover: ../joe-yates-480485-unsplash.webp
cover_mobile: ../w300_joe-yates-480485-unsplash.webp
cover_icon: ../icon_joe-yates-480485-unsplash.webp
---
## الوعود... ما الغرض منها؟

كلما نفّذت أي شفرة حاسوبية، هناك نتيجتان محتملتان: **نجاح** أو **فشل**.

إذا كانت تلك الشفرة غير متزامنة بطبيعتها، قد يصبح الاعتماد على النتيجة أكثر صعوبة.

توفر **`Promises`** طريقة عملية للتعامل مع ذلك.

```
                        +--Promise---+
                        |            |
                        | <-either-> |
                        |            |
                <-------+            +-------->
                |Failure?             Success?|
                |                             |
                v                             v
                (Rejected)           (Resolved)
```

> ملاحظة جانبية: رغم أن الوعود يجب أن تُحل أو تُرفض، قد تفشل في القيام بأي منهما. هذا يسبب تجمّداً في التطبيقات، ويمكن أن يكون صعبًا جدًا على التصحيح.

### من أين تأتي الوعود؟

في كثير من الأحيان لن تحتاج إلى إنشاء وعد بنفسك. واجهات برمجة التطبيقات الأصلية مثل `fetch` والمكتبات الشائعة مثل `axios` تُعيد بالفعل وعودًا.

ومع ذلك إذا اضطررت لإنشاء وعد، هناك طريقتان للقيام بذلك:

### إنشاء الوعود #1/2:

أسهل طريقة لإنشاء وعد هي باستخدام طريقة المساعدة: `Promise.resolve()`.

يمكنك تغليف (أو “تحويل”) أي قيمة إلى وعد باستخدام `Promise.resolve(value)`.

```js
// بدون وعود:
function add10(num) {
  return num + 10
}

// مع وعود:
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### إنشاء وعود #2/2:

طريقة أكثر مرونة: استخدم مُنشئ `Promise`.

`new Promise(callback)` يقبل دالة `callback` بالواجهة التالية:

```js
new Promise(function(resolve, reject) {
  // المتغيران `resolve` و `reject` كلاهما دوال.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // يجب استدعاء `resolve(result)` عندما يتحقق الوعد
  // يجب استدعاء `reject(Error)` إذا رُفض الوعد
})
```

### واجهة برمجة تطبيقات الوعود

واجهة الوعود تتكون في الواقع من عدد قليل من الطرق.

وظيفتان للنسخة، و4 وظائف ثابتة/مساعدة.

#### طرق نسخة الوعد

الوصول إلى القيم من وعد لن ينجح باستخدام الحيل المعتادة (مثل `console.log(promise)`).

جميع الوعود تُعيد إما نجاحًا (عبر `.then(fn)`) أو فشلًا (عبر `.catch(fn)`).

#### طرق مساعدة للوعود

* `Promise.resolve(value)` - تحويل أي قيمة إلى وعد
* `Promise.reject(Error)` - إنشاء وعد فاشل، يُفعِّل `.catch()` التالي
* `Promise.all([...promises])` - الانتظار حتى تُكمل جميع الوعود في المصفوفة
* `Promise.race([...promises])` - يُحلّ بمجرد أن يُحلّ أول وعد
````
