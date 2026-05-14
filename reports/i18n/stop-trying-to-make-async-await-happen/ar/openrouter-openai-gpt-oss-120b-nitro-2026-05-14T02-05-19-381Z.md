# Translation Candidate
- Slug: stop-trying-to-make-async-await-happen
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-03--stop-trying-to-make-async-await-happen/ar/index.mdx
- Validation: deferred
- Runtime seconds: 8.68
- Input tokens: 7945
- Output tokens: 2699
- Thinking tokens: unknown
- Cached input tokens: 3328
- Cache write tokens: 0
- Estimated cost: $0.000796
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: توقف عن محاولة جعل async/await يعمل
subTitle: الوعود الآن رائجة
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
منذ فجر التاريخ، خاض المطورون معارك ساذجة كثيرة. من الجدل الكلاسيكي _"Tabs vs. Spaces"_ إلى النقاش الخالد _"Mac vs. PC"_، نحن بارعون في العثور على حجج مشتتة.

<br />
<small>_الإجابات:_ لينكس & Spaces.</small>

<!-- سنستعرض قاعدتين لتحسين حياتك مع الـ Promises. -->

## المعركة...؟

### Promises vs. Async/Await!

انتظر، هل هذه معركة؟ لا بد أنها كذلك؟ ألا نتحدث عن الـ callbacks بعد الآن؟

لا، ليست معركة. في النهاية هو مجرد أداة أخرى في صندوق أدواتك. ومع ذلك، لأن `async`/`await` لا يحل محل جميع وظائف الـ Promise (وبشكل خاص `Promise.all` و `.race`) **من المضلل تقديمه كبديل.**

هناك الكثير من الأشخاص المؤثرين يروجون لهذا المفهوم الخاطئ بأن `async`/`await` هو [بديل الـ Promises](https://developers.google.com/web/fundamentals/primers/async-functions) [الذي ينتظره](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9) [الجميع](https://x.com/umaar/status/1045655069478334464) [منذ زمن](http://2ality.com/2017/08/promise-try.html#why-not-just-use-async-functions) [طويل](https://dzone.com/articles/javascript-promises-and-why-asyncawait-wins-the-ba).

> **تلميح: لا، لا، ولا حتى قليلًا.**

إضافة حديثة إلى VS Code تعزز هذا التحيز. كما غرد [@umaar](https://x.com/umaar):

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Visual Studio Code can now convert your long chains of Promise.then()&#39;s into async/await! 🎊 Works very well in both JavaScript and TypeScript files. .catch() is also correctly converted to try/catch ✅ <a href="https://t.co/xb39Lsp84V">pic.x.com/xb39Lsp84V</a></p>&mdash; Umar Hansa (@umaar) <a href="https://x.com/umaar/status/1045655069478334464?ref_src=twsrc%5Etfw">September 28, 2018</a></blockquote>

<!-- Sure, it's an impressive addition to an already amazing list of features. -->

إذا كنت تكره الـPromises وتريد هذه الميزة لإعادة الهيكلة، فأنا لا ألومك.

<br />

_أنا أتعاطف معك. أفهمك._

<br />

لقد مررت بذلك. 🤗

<br />

كنت أكره الـPromises. اليوم، عدت إلى حبها تمامًا. **الـPromises رائعة.** يمكنها أن تمكّنك/تشجعك على **الاستفادة من تركيب الدوال.**

هناك مجالان أوصي بالتركيز عليهما أولًا لتطوير تقنيتك مع الـPromise.

1. [دوال مسماة (بدون مجهولة)](#rule-1)  
1. [دوال ذات غرض واحد](#rule-2)

<h2 id="rule-1">#1: الدوال المسماة!</h2>

اقضِ على الدوال المجهولة. استخدام **دوال مسماة** يجعل الكود يقرأ كقصيدة لمتطلباتك.

لنلقِ نظرة على مثال شائع:

إجراء طلب HTTP GET باستخدام `fetch`:

<!-- the fetch specification states [HTTP status codes](https://http.cat/) over 400 or 500 **do not automatically trigger an error.** The default in many AJAX libraries (jQuery, axios). -->

<!-- Before we see the solution, look over a common "recommended" implementation: -->

### نمط مضاد

```js
// ❌ استخدام دوال مجهولة داخلية 💩
fetch(url)
  .then(response => response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus)))
  .then(response => response.text())
```

### الحل: دوال مسماة

```js
// ✅ يبرز الوضوح: دوال مسماة
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

> فوائد هذا النهج تصبح أكثر وضوحًا كلما حصلت على كود أكثر تجنّبًا للتكرار.

**موارد إضافية:** تفقد **مقاطع فيديو دقيقة واحدة** لـ [التسجيل الأساسي](https://youtu.be/xR_MZE1SIkk) و [التصحيح المتقدم](https://youtu.be/P_tghqWj72M) باستخدام هذه التقنية.

<h2 id="rule-2">#2: غرض واحد (الدوال)</h2>

يبدو الأمر _دقيقًا بشكل مخادع_: غرض واحد.

ومع ذلك فهو ذاتيًا، عشوائي، وأحيانًا لا معنى له على الإطلاق.

<!-- بدلاً من الجدال ما إذا كانت الدالة المعطاة مركزة بما فيه الكفاية.

توصلت إلى مقياس تقريبي لهذا: `تكلفة الغرض`. كلما ارتفع الرقم، زادت احتمالية أن الدالة تقوم بأكثر من اللازم.

```js
// نقطة واحدة: الإرجاع والشرط الثلاثي فعليًا سطر واحد
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
// نقطة واحدة: الإرجاع والتعبير أيضًا سطر واحد فعليًا
function getText(response) {
  return response.text()
}
```

بالنظر إلى شفرة الدالة، أضف نقطة واحدة لكل سطر يحتوي على أي من: `if`، `return`، الشرط الثلاثي، `for`، `const`، `let`، `var`، `switch`، `while`، `[].map/filter/reduce/إلخ`. أضف نقطة واحدة لكل تعليمة (تجاهل الأسطر الفارغة). سلسلة من التعابير أو الأساليب المتسلسلة تُحسب كنقطة واحدة فقط.

يا لها من مصطلحات تقنية.
 -->

من المثير للاهتمام أن معظم المطورين يقرون بأنهم _جيدون جدًا_ في تطبيق **غرض واحد** على شفرتهم. ولا علاقة غير ذات صلة: هم أيضًا يزعمون أنهم سائقون ممتازون!

لنلقِ نظرة على مثال يقدمه (الموهوب للغاية) [جاك أرتشيبالد](https://x.com/jaffathecake) في مقاله عن async/await لموقع مطوري جوجل (ملاحظة: 2024، تم إزالة الرابط).

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

أقول لا. ماذا يفعل `logInOrder`؟

1. يمر عبر قائمة `urls`
2. يطبق عليها طلب HTTP GET مضمّن:
   1. `fetch` HTTP
   2. إرجاع نص جسم الاستجابة
3. يضيف `.then(text => console.log(text))` بعد كل وعد في `textPromise`
   1. طباعة النتائج تسلسليًا

هناك خمس دوال مجهولة معرفة داخل هذه الدالة الواحدة. كما يشير جاك، عملية `.reduce` معقّدة جدًا. لا معنى لكتابة آليات دقيقة يدويًا في كل مكان في الشيفرة. بطريقة أخرى، لا نكتب شيفرة إنشاء DOM باستخدام `document.createElement()`، `element.setAttribute()`، إلخ بلا نهاية. بدلاً من ذلك نختار الأداة الأنسب من بين عدة خيارات: دوال مساعدة/مرافق، مكتبات أو أطر عمل.

#### الحل: دوال ذات غرض واحد

### ابدأ بـ **استخراج الطرق**...

![VS Code refactor extracting async methods from Promise code](../async-refactor-google-extract-methods-resized-75.webp "Extracting methods")

### استمر باستبدال `.reduce()` و `logPromise()` بـ `Promise.all` و `..map()`...

![Refactored Promise chain using Promise all and map for readability](../async-refactor-google-chain-methods-resized-75.webp "Improving readability")

### الخلاصة

جرّب تطبيق هذه التقنيات على شفرتك الخاصة! ثم [غرد لي](https://x.com/justsml) وأخبرني بالنتيجة. أو إذا كان لديك أسئلة أو تعليقات، تواصل معي أيضًا!

ساعد في نشر #PromiseTruth وشارك هذا المقال. ❤️

![credit: matt-nelson-414464-unsplash.webp](../matt-nelson-414464-unsplash.webp)

#### قراءة ذات صلة

* [Daniel Brain](https://medium.com/@bluepnume/even-with-async-await-you-probably-still-need-promises-9b259854c161)
* [Eric Elliott](https://x.com/_ericelliott?lang=en)
````
