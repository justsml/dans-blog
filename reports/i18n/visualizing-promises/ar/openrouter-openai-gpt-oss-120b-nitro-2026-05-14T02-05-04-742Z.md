# Translation Candidate
- Slug: visualizing-promises
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-09-30--visualizing-promises/ar/index.mdx
- Validation: deferred
- Runtime seconds: 3.79
- Input tokens: 3534
- Output tokens: 1277
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000368
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: تصوير الوعود
subTitle: اخترق الحاجز...
date: '2018-09-30'
modified: '2024-07-30'
category: Guides
subCategory: promises
cover: ../junior-ferreira-735237-unsplash.webp
cover_mobile: ../w300_junior-ferreira-735237-unsplash.webp
cover_icon: ../icon_junior-ferreira-735237-unsplash.webp
tags:
  - promises
  - async
  - visualizing
  - javascript
  - composition
related:
  - intro-to-promises
  - promise-gotchas
  - stop-trying-to-make-async-await-happen
  - javascript-promises-quiz
---
من أجل تصور طريقة تنفيذ الـ Promises، لنعرّف دالة جديدة `delay(millisecs)`.

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

هذه دالة مساعدة تُعيد قيمةً بمجرد انتهاء مهلة الـ timeout.

قيمة التأخير بالمللي ثانية تُمرَّر إلى دالة رد النداء في `.then`.

دعونا نستعرض 4 أمثلة (مع مخططات زمنية متحركة).

## المثال #1/4

يُظهر هذا كيف يتم تأخير تنفيذ `console.log()` بواسطة `delay(msec)`.

```js
delay(1000).then(() => console.log("done"));
```

![مخطط زمني يُظهر تأخير 1000 ثم تشغيل console.log بعد ثانية واحدة](../N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## المثال #2/4

_هذا يُظهر خطأً شائعًا._

`console.log` يُنفّذ فور بدء `delay(1000)` **ليس** بعد انتهاء التأخير كما كنت تتوقع.

لأن `console.log` يُعيد `undefined` فإن `.then()` يُهمل صامتًا.

لاحظ الفرق بين `typeof console.log === 'function'` مقابل `typeof console.log() === undefined`.

عادةً ما يكون الاستخدام الصحيح لـ `console.log` هو ما يظهر في المثال #1. تأكد من تمرير الدوال إلى `.then` و `.catch`.

```js
delay(1000).then(console.log("done"));
```

![مخطط زمني يُظهر تشغيل console.log فورًا قبل انتهاء التأخير](../N_1000ms_!log.webp)

<!-- ```
delay(1000) --------|.then(null)
console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## المثال #3/4

ثلاثة وعود تُنفّذ في آنٍ واحد.

```js
delay(1000).then(console.log);
delay(2000).then(console.log);
delay(3000).then(console.log);
```

![مخطط زمني يُظهر ثلاث وعود تأخير تُحلّ بعد ثانية، ثانيتين وثلاث ثوانٍ](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

## المثال #4/4

`Promise.all` مع 3 وعود `delay`. ستنفّذ جميعها في آن واحد.

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![مخطط زمني يُظهر Promise.all ينتظر جميع وعود delay الثلاثة](../N_3000ms_PromiseAll.webp)

<!--

```
delay(1000) ---| [resolved]------------------v
delay(2000) ---|--------------| [resolved]---v
delay(3000) ---|--------------|--------------v [resolved]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0msec        1sec           2sec           3sec
```

-->

> الاعتمادات:
>
> - مخططات async المتحركة من إعداد [Patrick Biffle](https://github.com/Piglacquer)
> - إلهام لهذا المقال: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

<!-- <div class="challenge" title="Question #1: Meaning of life:">

  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="description">What is the meaning of life?</div>

</div> -->
````
