# Translation Candidate
- Slug: stop-trying-to-make-async-await-happen
- Locale: ar
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2018-10-03--stop-trying-to-make-async-await-happen/ar/index.mdx
- Validation: deferred
- Runtime seconds: 42.24
- Input tokens: 7528
- Output tokens: 5877
- Thinking tokens: unknown
- Cached input tokens: 1920
- Cache write tokens: 0
- Estimated cost: $0.002436
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: لا تحاول فرض async/await
subTitle: الوعود هي الموضة الآن
date: '2018-10-03'
modified: '2024-08-03'
category: Guides
subCategory: promises
tags:
  - promises
  - async
  - await
  - async-await
  - javascript
  - composition
related:
  - intro-to-promises
  - promise-gotchas
  - visualizing-promises
  - you-may-not-need-axios
cover: ../matt-nelson-414464-unsplash.webp
cover_mobile: ../w300_matt-nelson-414464-unsplash.webp
cover_icon: ../icon_matt-nelson-414464-unsplash.webp
---
منذ بداية الزمن، خاض المطورون العديد من المعارك السخيفة. من الجدل الكلاسيكي _"المسافات البادئة مقابل المسافات"_ إلى النقاش الخالد _"ماك مقابل بي سي"، نحن بارعون في إيجاد حجج مشتتة للانتباه.

<br />
<small>_الإجابات:_ لينكس والمسافات.</small>

<!-- سننظر في قاعدتين لتحسين حياتك مع الوعود (Promises). -->

## المعركة...؟

### الوعود (Promises) مقابل Async/Await!

لحظة، هل هذه معركة؟ لا بد أنها كذلك، أليس كذلك؟ يبدو أننا لم نعد نتحدث عن دوال الاسترجاع (callbacks) بعد الآن؟

لا، إنها ليست معركة. في النهاية، إنها أداة أخرى محتملة في صندوق أدواتك. ومع ذلك، لأن `async`/`await` لا تحل محل كل وظائف الوعود (تحديدًا `Promise.all`، `.race`) **فإن تقديمها كبديل هو أمر مضلل.**

هناك الكثير من الأشخاص المؤثرين الذين يروجون لهذا المفهوم الخاطئ بأن `async`/`await` هي [البديل](https://developers.google.com/web/fundamentals/primers/async-functions) [الذي](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9) [كان](https://x.com/umaar/status/1045655069478334464) [الجميع](http://2ality.com/2017/08/promise-try.html#why-not-just-use-async-functions) [ينتظره](https://dzone.com/articles/javascript-promises-and-why-asyncawait-wins-the-ba) للوعود.

> **تلميح: لا، كلا، ولا حتى قليلاً.**

إضافة حديثة إلى VS Code تعزز هذا التحيز. كما غرد [@umaar](https://x.com/umaar):

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">يمكن لـ Visual Studio Code الآن تحويل سلاسل Promise.then() الطويلة إلى async/await! 🎊 تعمل بشكل جيد في ملفات JavaScript و TypeScript. كما يتم تحويل .catch() بشكل صحيح إلى try/catch ✅ <a href="https://t.co/xb39Lsp84V">pic.x.com/xb39Lsp84V</a></p>&mdash; عمر هانزا (@umaar) <a href="https://x.com/umaar/status/1045655069478334464?ref_src=twsrc%5Etfw">28 سبتمبر 2018</a></blockquote>

<!-- Sure, it's an impressive addition to an already amazing list of features. -->

إذا كنت تكره الوعود، وتريد هذه الميزة لإعادة الهيكلة، فلا ألومك.

<br />

_أتعاطف معك. أفهمك._

<br />

لقد كنت في مكانك. 🤗

<br />

كنت أكره الوعود سابقًا. اليوم، عدت تمامًا إلى صوابي. **الوعود رائعة.** فهي تمكنك/تشجعك على **الاستفادة من تركيب الدوال.**

هناك مجالان أوصي بالتركيز عليهما أولاً لتطوير أسلوبك مع الوعود.

1. [الدوال المسماة (بدون دوال مجهولة)](#rule-1)
1. [الدوال أحادية الغرض](#rule-2)

<h2 id="rule-1">#1: الدوال المسماة!</h2>

تخلَّص من دوالك المجهولة. استخدام **الدوال المسماة** يجعل الكود يقرأ كشعر يعبّر عن متطلباتك.

لننظر إلى مثال شائع:

إجراء طلب HTTP GET باستخدام `fetch`:

<!-- مواصفات fetch تنص على أن [رموز حالة HTTP](https://http.cat/) فوق 400 أو 500 **لا تؤدي تلقائيًا إلى خطأ.** هذا هو السلوك الافتراضي في العديد من مكتبات AJAX (jQuery, axios). -->

<!-- قبل أن نرى الحل، ألقِ نظرة على تنفيذ "موصى به" شائع: -->

### النمط المضاد

```js
// ❌ استخدام دوال مجهولة مضمنة 💩
fetch(url)
  .then(response => response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus)))
  .then(response => response.text())
```

### الحل: دوال مسماة

```js
// ✅ الوضوح يظهر: دوال مسماة
fetch(url)
  .then(checkResponse)
  .then(getText)


// دوال عامة قابلة لإعادة الاستخدام
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
function getText(response) {
  return response.text()
}
```

> فوائد هذا الأسلوب تزداد وضوحًا كلما أصبح كودك أكثر جفافًا (DRY).

**موارد إضافية:** شاهد فيديوهاتي القصيرة (دقيقة واحدة) عن [التسجيل الأساسي](https://youtu.be/xR_MZE1SIkk) و[التصحيح المتقدم](https://youtu.be/P_tghqWj72M) باستخدام هذه التقنية.

<h2 id="rule-2">#2: غرض واحد (الدوال)</h2>

يبدو الأمر _خادعًا في دقته_: غرض واحد.

لكنه في الواقع ذاتي، تعسفي، وأحيانًا بلا معنى.

<!-- Instead of arguing if a given function is sufficiently focused.

I came up with a rough measure for this: `Purpose Cost`. The higher the score, more likely it's doing too much.

```js
// 1 point: the return & ternary are effectively a one-liner
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
// 1 point: the return & expression are also effectively a one-liner
function getText(response) {
  return response.text()
}
```

Given a function's code, add 1 point for every line containing any of: `if`, `return`, ternary, `for`, `const`, `let`, `var`, `switch`, `while`, `[].map/filter/reduce/etc`. Add 1 point for each instruction (ignore extra lines from whitespace). A number of chained expressions or methods only count for 1 point.

Whew, that was a bit of jargon.
 -->

المثير للاهتمام أن معظم المطورين يذكرون أنهم _جيدون جدًا_ في تطبيق مبدأ **الغرض الواحد** على كودهم. وليس منفصلاً عن ذلك: فهم يذكرون أنهم سائقون ممتازون أيضًا!

<!-- This **isn't a unique issue with Promises**, array methods and all other HoF-based (Higher Order Function) APIs have the same ergonomics. -->

لنلقِ نظرة على مثال يذكره (الموهوب للغاية) [Jake Archibald](https://x.com/jaffathecake) في مقالته عن async/await على موقع Google Developers (ملاحظة: 2024، تمت إزالة الرابط).

<!--
Let's look at one of the so called "❌ Not recommended" Promise examples. (The description is "say we wanted to fetch a series URLs and log them as soon as possible, in the correct order.") -->

```js
// source: https://developers.google.com/web/fundamentals/primers/async-functions
function logInOrder(urls) {
  // fetch all the URLs
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // log them in order
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
```

### غرض واحد؟

أقول لا. ما الذي تفعله `logInOrder`؟

1. التكرار عبر قائمة من `urls`
1. تطبيقها على طلب HTTP GET مضمّن:
  1. `fetch` عبر HTTP
  1. إرجاع نص الاستجابة
1. إلحاق `.then(text => console.log(text))` بعد كل وعد في `textPromise`
  1. طباعة النتائج بشكل تسلسلي

هناك 5 دوال مجهولة مُعرّفة في هذه الدالة الواحدة. وكما يشير Jake حتى، فإن `.reduce` معقدة جدًا. ليس من المنطقي كتابة آليات دقيقة يدويًا في جميع أنحاء الكود. بعبارة أخرى، نحن لا نكتب كود إنشاء DOM باستخدام `document.createElement()` و `element.setAttribute()` إلى ما لا نهاية. بدلاً من ذلك، نختار أفضل أداة من بين العديد من الخيارات: دوال مساعدة/أدوات مساعدة، مكتبات أو أطر عمل.

<!-- We need to isolate each 'step' that's going on: there's an HTTP request, a transform for a list of URLs into a list of results. Also a `console.log` is needed. -->

<!-- > 🤔 Why do `Promises` cause developers to abandon practices we use elsewhere? -->

<!-- **Note:** If the intention was to _initiate requests_ in a sequence, instead of merely printing the results out in order, this code doesn't actually do that. We'll refactor accordingly. -->

#### الحل: دوال ذات غرض واحد

### ابدأ **باستخراج الدوال**...

![إعادة هيكلة VS Code لاستخراج دوال غير متزامنة من كود Promise](../async-refactor-google-extract-methods-resized-75.webp "استخراج الدوال")

### ثم استبدل `.reduce()` و `logPromise()` بـ `Promise.all` و `..map()`...

![سلسلة Promise معاد هيكلتها باستخدام Promise.all و map لتحسين القراءة](../async-refactor-google-chain-methods-resized-75.webp "تحسين القراءة")

### الخلاصة

جرّب تطبيق هذه التقنيات على كودك الخاص! ثم [غرد لي](https://x.com/justsml) وأخبرني كيف سارت الأمور. أو إذا كانت لديك أسئلة أو تعليقات، تواصل معي أيضًا!

ساعد في نشر #PromiseTruth وشارك هذه المقالة. ❤️

![credit: matt-nelson-414464-unsplash.webp](../matt-nelson-414464-unsplash.webp)

#### قراءات ذات صلة

* [Daniel Brain](https://medium.com/@bluepnume/even-with-async-await-you-probably-still-need-promises-9b259854c161)
* [Eric Elliott](https://x.com/_ericelliott?lang=en)
````
