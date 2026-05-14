# Translation Candidate
- Slug: are-promises-broken
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-06--are-promises-broken/ar/index.mdx
- Validation: deferred
- Runtime seconds: 9.78
- Input tokens: 7869
- Output tokens: 2771
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.000806
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: وعود مكسورة؟
unlisted: true
subTitle: تسقط الأخطاء، وتفقد النتائج...
date: '2018-10-06'
modified: '2024-12-11'
tags:
  - promises
  - javascript
  - errors
  - programming
category: Code
subCategory: promises
cover: ../lennart-heim-766366-unsplash.webp
cover_mobile: ../w300_lennart-heim-766366-unsplash.webp
cover_icon: ../icon_lennart-heim-766366-unsplash.webp
---
## هل الوعود في جافاسكريبت معطوبة؟

### في العصور السابقة

إحدى أكثر الأساطير شيوعًا حول الوعود هي **ادعاؤها** بوجود قصور في التعامل مع الأخطاء.

**قبل سنوات عديدة** كانت الوعود _سيئة_ فعليًا في معالجة الأخطاء. **بُذلت جهود كبيرة لإصلاحها.**

> ثم تم **إصلاحها**، حتى **نُشرت على نطاق واسع**.

#### احتفل الناس

وللأسف، لم يلاحظ البعض ذلك.

### العصور الحالية

ما زالت الأسطورة قائمة، أراها في كل مكان: [مقالات شائعة على Medium](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9)، [على DZone](#redacted)، و[العديد](https://medium.com/@avaq/broken-promises-2ae92780f33) من المصادر الأخرى.

سأعترف، حتى الموارد "الرسمية" والوثائق تقدم في الغالب [أمثلة هشة وعادات سيئة](/promise-gotchas/). تُستخدم هذه غالبًا لـ"إثبات" النقطة ضد الوعود. بعض الأشخاص يقترحون حتى "علاجات" تجعل الأمور أسوأ بكثير. (ملاحظة: تم إزالة الرابط)

<!-- إحدى النصائح التي رأيتها مرارًا وتكرارًا: عدم استخدام `.catch` أبداً، بل استخدام حدث عالمي `"unhandledRejection"`. **لا تفعل** ذلك أبداً. يُصمم `unhandledRejection` لتنظيف المراجع العالمية، مثل اتصالات قاعدة البيانات، قبل إغلاق وشيك. -->

<br />
<br />

## قواعد لتجنب المتاعب

1. [الوعود تحتاج شيئًا لتتمسك به](#1-promises-need-something-to-hang-on-to)
    * **دائمًا** `return` من الدوال الخاصة بك.
1. [استخدام كائنات `Error` الحقيقية](#2-use-real-error-instances)
    * **دائمًا** استخدم كائنات `Error`.
1. [معالجة الأخطاء حيث يكون ذلك منطقيًا](#3-handle-errors-where-it-makes-sense)
    * **دائمًا** استخدم `.catch()`، على الأقل مرة واحدة.
1. [إضافة وضوح باستخدام الدوال المسماة 🦄✨](#4-add-clarity-with-named-functions-)
    * __فضّل__ الدوال المسماة.

-------------------------------------------

#### #1 الوعود تحتاج شيئًا لتتمسك به

من الضروري أن **دائمًا `return`** من الدوال الخاصة بك.

دوال رد نداء الوعد تتبع نمطًا معينًا في `.then(callback)` و `.catch(callback)`.

كل قيمة مُرجعة تُمرّر إلى رد نداء الدالة التالية في `.then()`.

```js
function addTen(number) {
  return number + 10;
}

Promise.resolve(10)  // 10
  .then(addTen)      // 20
  .then(addTen)      // 30
  .then(addTen)      // 40
  .then(console.log) // logs "40"
```

> ميزة "العودة دائمًا": يصبح الكود أسهل بكثير للاختبار الوحدوي.

**السؤال:** كم عدد حالات الوعد المتميزة (المُحَلَّة والمرفوضة) التي تم إنشاؤها؟

**السؤال:** كم عدد الوعود التي تم إنشاؤها في المثال السابق؟

#### #2 استخدم كائنات `Error` الحقيقية

لـ JavaScript سلوك مثير للاهتمام حول الأخطاء (ينطبق على الكود غير المتزامن **و** المتزامن).

<a href="https://repl.it/@justsml/throwing-errors-in-javascript" target="_blank">[<i>انظر المثال في repl.it: `throwing errors in javascript`</i>]</a>
<img alt="throwing errors in javascript" src="../throwing-errors-in-javascript.webp" />

للحصول على **تفاصيل مفيدة حول رقم السطر** ومكدس الاستدعاءات، يجب استخدام كائنات `Error`. رمي السلاسل النصية لا يعمل كما هو في Python أو Ruby.

بينما يبدو أن JavaScript **يتعامل** مع `throw "string"`، كما سترى السلسلة في معالج `catch` الخاص بك. ومع ذلك، البيانات التي ستراها هي كل ما ستراه*. لن يتم تضمين أي إطارات مكدس سابقة [stack frames](https://en.wikipedia.org/wiki/Call_stack#Stack_and_frame_pointers).

أمثلة صحيحة على `new Error`:

```js
throw new Error('message')           // ✅
Promise.reject(new Error('message')) // ✅
throw Error('message')               // ✅
Promise.reject(Error('message'))     // ✅
```

الأنماط المضادة الشائعة:

```js
throw 'error message'  // ❌
Promise.reject(-42)    // ❌
```

<iframe height="400px" width="100%" src="https://repl.it/@justsml/throwing-errors-in-javascript?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### #3 التعامل مع الأخطاء حيث يكون ذلك منطقيًا

توفر الـPromises طريقة أنيقة للتعامل مع الأخطاء باستخدام `.catch()`. إنها في الأساس نوع خاص من `.then()` — حيث يتم معالجة أي أخطاء من الـ`.then()` السابق. لنلق نظرة على مثال...

```js
Promise.resolve(42)
  .then(() => 'hello')
  .catch(() => console.log('will not get hit'))
  .then(() => throw new Error('totes fail'))
  .catch(() => console.log('WILL get hit'))
```

بينما قد يبدو الـ`.catch()` كمعالج حدث في الـDOM (مثل `click` أو `keypress`). فإن وضعه مهم، لأنه لا يمكنه «التقاط» الأخطاء التي تُرمى **أعلى منه**.

**تجاوز الأخطاء أمر بسيط نسبيًا**: أعد قيمة غير خطأ في دالة رد النداء الخاصة بالـ`.catch()`، سيتحول سلسلة الـPromise إلى تشغيل دوال الـ`.then()` بالتتابع. (فعليًا.)

حاول متابعة تسلسل المثال التالي:

```js
Promise.resolve(42)
  .then(() => 'hello')
  .then(() => throw new Error('totes fail'))
  .catch(() => {
    return 99
  })
  .then(num => num + 1)
  .then(console.log) // المخرجات المتوقعة: 100
```

**التسلسل هو ما يجب فهمه.**

على الرغم من أنه مثال ساذج، إلا أنه صُمم لتوضيح **كيفية تدفق الأخطاء والبيانات** في الـPromises.

إليك مخطط التسلسل:

1. 42 هي القيمة الأولية.  
2. `hello` تُعاد دائمًا من الدالة التالية.  
3. نتجاهل القيمة السابقة، ونرمي خطأً برسالة `'totes fail'`.  
4. `.catch()` يلتقط الخطأ، بل ويعيد `99` التي سيتعامل معها أي `.then()` لاحق.  
5. نزيد `num`، لتصبح القيمة `100`.  
6. الدالة `console.log` تستقبل `100` وتطبعها! :tada:

**سؤال:** ماذا يحدث عندما يكون هناك `.catch()` ينين متتاليين؟ هل يمكن للثاني أن يُنفّذ أبدًا؟ هل يمكنك التفكير في حالة استخدام؟

**السؤال:** كيف يمكن لـ `.catch()` تجاهل الأخطاء؟ كيف تمنع الأخطاء من إجبار `Promise.all` على الخروج المبكر؟

#### #4 أضف وضوحًا باستخدام الدوال المسماة 🦄✨

قارن **قابلية القراءة** بين المثالين التاليين:

**دون اسم:** ❌

```js
Promise.resolve(10)          // 10
  .then(x => x * 2)          // 20
  .then(x => x / 4)          // 5
  .then(x => x * x)          // 25
  .then(x => x.toFixed(2))   // "25.00"
  .then(x => console.log(x)) // النتيجة المتوقعة: "25.00"
```

**باسم:** ✅

```js
Promise.resolve(10) // 10
  .then(double)     // 20
  .then(quarter)    // 5
  .then(square)     // 25
  .then(format)     // "25.00"
  .then(log)        // النتيجة المتوقعة: "25.00"

const double = x => x * 2
const quarter = x => x / 4
const square = x => x * x
const format = x => x.toFixed(2)
const log = x => console.log(x)

```

**مكافأة:** ✅

> متوافق مع طرق المصفوفة!!!

يمكنك إعادة استخدام الدوال المسماة مع أصدقائنا من `Array.prototype.` بما في ذلك `.map()`، `.filter()`، `.every()`، `.some()`، `.find()`!

أنابيب التجميع #FTW:

```js
// إنه نفس الفكرة :mindblown:

[10, 20]           // [ 10, 20 ]
  .map(double)     // [ 20, 40 ]
  .map(quarter)    // [ 5, 10 ]
  .map(square)     // [ 25, 100 ]
  .map(format)     // [ "25.00", "100.00" ]
  .map(log)        // النتيجة المتوقعة سطرين: "25.00"، "100.00"

```

وإذا لم ترغب في كتابة الكود بهذا النمط الخطي... لديك دوال بسيطة!

يمكنك استخدامها كما تحتاج:

```js
// Nesting patern
// ❌ please don't do this, however

const result = format(square(quarter(double(10))))

log(result)
// expected output: "25.00"
```

**لماذا يُعد تعشيش الدوال نمطًا مضادًا؟**

1. غير قابل للقراءة من قبل الكثيرين  
2. لا تُظهر اختلافات git بسهولة من غيّر ماذا  
3. صعب تتبعه أو تسجيله من وسط الدوال المتعشّشة
````
