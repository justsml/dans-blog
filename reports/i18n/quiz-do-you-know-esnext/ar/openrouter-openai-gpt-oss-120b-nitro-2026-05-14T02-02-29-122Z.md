# Translation Candidate
- Slug: quiz-do-you-know-esnext
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-31--quiz-do-you-know-esnext/ar/index.mdx
- Validation: deferred
- Runtime seconds: 21.61
- Input tokens: 11375
- Output tokens: 6325
- Thinking tokens: unknown
- Cached input tokens: 4096
- Cache write tokens: 0
- Estimated cost: $0.002029
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'اختبار: هل تعرف جافاسكريبت الحديثة؟'
subTitle: أثبت مهاراتك المرموقة في جافاسكريبت!
label: ES2019+ Features
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
unlisted: false
date: '2024-10-31'
modified: '2024-11-08'
tags:
  - quiz
  - javascript
  - intro
  - esnext
  - features
  - intermediate
cover_full_width: ../christopher-burns-8KfCR12oeUM-unsplash-wide.webp
cover_mobile: ../christopher-burns-8KfCR12oeUM-unsplash-square.webp
cover_icon: ../christopher-burns-8KfCR12oeUM-unsplash-square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


### هل تعرف الفروقات بين ES2015 و ES2022؟

* **أثبت مهاراتك في JavaScript!** 🚀
* لا حاجة لتسجيل الدخول أو إنشاء حساب. ✨
* اختيار من متعدد. 🤖 ... _ما مدى الصعوبة، أليس كذلك؟_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ES2020"
  title="التجميع الصفري"
  options={[
    {text: '42'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '100', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هي قيمة `result`؟
    ```js
        console.log(null ?? 100);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    تحقق من دقة قواعد المشغل في JavaScript. الإجابة المغرية غالبًا ما تكون ما كانت ستفعله الصيغة القديمة، وليس ما يفعله هذا الميزة.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    المشغل التجميعي الصفري (`??`) يُعيد operand الجانب الأيمن (`b`) إذا كان operand الجانب الأيسر (`a`) هو `null` أو `undefined`. في هذه الحالة، `a` هو `null`، لذا فإن `result` يساوي `100`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="ES2020"
  title="الدمج الصفري"
  options={[
    {text: 'false', isAnswer: true},
    {text: '42'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '100'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو الناتج المتوقع لهذا الكود؟
    ```js
        const value = false;
        const defaultVal = 42;
        console.log(value ?? defaultVal);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    تحقق من دلالات المشغل في جافاسكريبت بدقة. الإجابة المغرية غالبًا ما تكون ما كان سيفعله الصياغة القديمة، وليس ما يفعله هذا الميزة.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    المعامل Null Coalescing (`??`) يعامل القيم falsy مثل `false` كقيم صالحة. بما أن `value` يساوي `false`، فإنه يُعتبر قيمة صالحة ويُعاد.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="السلسلة الاختيارية"
  title="السلسلة الاختيارية"
  options={[
    {text: 'undefined', isAnswer: true},
    {text: 'خطأ: لا يمكن قراءة الخاصية من undefined'},
    {text: 'null'},
    {text: '100'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو ناتج الكود التالي؟
    ```js
        const obj = { foo: null };
        const result = obj.foo?.bar;
        console.log(result);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    تحقق من دلالات عامل JavaScript بالضبط. الإجابة المغرية غالبًا ما تكون ما كانت ستحصل عليه الصيغة القديمة، وليس ما يفعله هذا الميزة.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    عامل السلسلة الاختيارية (`?.`) يوقف التقييم إذا كان الجانب الأيسر `null` أو `undefined`. بما أن `obj.foo` هو `null`، فإن `obj.foo?.bar` يُقيم إلى `undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="BigInt"
  title="استخدام BigInt"
  options={[
    {text: 'خطأ نوع: لا يمكن خلط BigInt مع عدد'},
    {text: '42n'},
    {text: '84n', isAnswer: true},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو ناتج الشيفرة التالية؟
    ```js
        const a = 42n;
        const result = a * 2n;
        console.log(result);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    تحقق من دقة semantics لمعاملات JavaScript. الإجابة المغرية غالبًا ما تكون ما كانت ستفعله الصياغة القديمة، وليس ما يفعله هذا الميزة.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    يتم إنشاء قيم BigInt بإضافة الحرف `n` إلى الرقم. لا يمكنك خلط BigInt مع الأعداد العادية في عمليات حسابية. هنا، كلا القيمتين هما BigInt، لذا عملية الضرب تعمل وتنتج `84n`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="الاستيراد الديناميكي"
  title="بنية الاستيراد الديناميكي"
  options={[
    {text: 'SyntaxError'},
    {text: 'Promise'},
    {text: 'Module'},
    {text: 'object', isAnswer: true},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما الذي يتم طباعته؟
    ```js
        const modulePromise = import('./myModule.js');
        console.log(typeof modulePromise);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    تحقق من دقة دلالات عامل JavaScript. الإجابة المغرية غالبًا ما تكون ما كانت ستفعله الصيغة القديمة، وليس ما يفعله هذا الميزة.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    دالة `import()` تُعيد `Promise` تُحل إلى كائن الوحدة. لأن كائنات `Promise` هي كائنات، فإن `typeof modulePromise` يطبع `'object'`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Promise.allSettled"
  title="Promise.allSettled"
  options={[
    {text: 'مُنفّذ: success', isAnswer: true},
    {text: 'مرفوض: error'},
    {text: 'قيد الانتظار'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو ناتج الشيفرة التالية؟
    ```js
        const promises = [
          Promise.resolve('success'),
          Promise.reject('error')
        ];
        Promise.allSettled(promises).then(results => {
          console.log(results[0].status + ': ' + results[0].value);
        });
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    تحقق من دقة دلالات عامل JavaScript. الإجابة المغرية غالبًا ما تكون ما كان سيفعله النحو القديم، وليس ما يفعله هذا الميزة.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Promise.allSettled` تُعيد مصفوفة من الكائنات التي تصف نتيجة كل وعد. الوعد الأول `fulfilled` بالقيمة `'success'`، لذا سيطبع بيان السجل `fulfilled: success`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="String.matchAll"
  title="استخدام String.matchAll"
  options={[
    {text: 'مصفوفة من التطابقات'},
    {text: 'مُكرِّر من التطابقات', isAnswer: true},
    {text: 'خطأ: استدعاء غير صالح'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا تُعيد الدالة `str.matchAll()`؟
    ```js
        const str = 'foo1bar2baz3';
        const matches = str.matchAll(/\d/g);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    تحقق من دقة سلوك المشغل في جافاسكريبت. الإجابة المغرية غالبًا ما تكون ما كان يفعله الصياغة القديمة، وليس ما يفعله هذا الميزة.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `String.matchAll` تُعيد مُكرِّرًا للتطابقات، وليس مصفوفة. يمكن استخدام هذا المُكرِّر للحصول على جميع مجموعات التطابق من السلسلة.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="استيراد ميتا"
  title="استخدام import.meta"
  options={[
    {text: 'عنوان URL للوحدة الحالية', isAnswer: true},
    {text: 'الطابع الزمني الحالي'},
    {text: 'undefined'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا يمثل `import.meta.url`؟
    ```js
        console.log(import.meta.url);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    تحقق من دقة semantics لمشغل JavaScript. الإجابة المغرية غالبًا ما تكون ما كانت تقوم به الصياغة القديمة، وليس ما يفعله هذا الميزة.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `import.meta` هو كائن يحتوي على بيانات تعريفية حول الوحدة الحالية. الخاصية `import.meta.url` تمثل عنوان URL للوحدة الحالية، ويمكن استخدامها للحصول على معلومات حول مكان تشغيل السكريبت.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="التعيين المنطقي"
  title="التعيين المنطقي"
  options={[
    {text: '5'},
    {text: '10', isAnswer: true},
    {text: 'undefined'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هي قيمة `a` بعد عملية التعيين المنطقي؟
    ```js
        let a = null;
        a ||= 10;
        console.log(a);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    تحقق من دقة semantics لمعاملات JavaScript. الإجابة المغرية غالبًا ما تكون ما كانت تقوم به الصياغة القديمة، وليس ما يفعله هذا الميزة.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    التعيين المنطقي OR (`||=`) يعيّن القيمة الموجودة على الجانب الأيمن إذا كانت القيمة على الجانب الأيسر falsy (`null`، `undefined`، `0`، `false`، إلخ). بما أن `a` تساوي `null`، فسيتم تعيين القيمة `10` لها.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="التعيين المنطقي للـ Nullish"
  title="التعيين المنطقي للـ Nullish"
  options={[
    {text: '5'},
    {text: '10', isAnswer: true},
    {text: 'undefined'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هي قيمة `b` بعد عملية التعيين الـ nullish؟
    ```js
        let b = null;
        b ??= 10;
        console.log(b);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    تحقق من دقة قواعد عمل المشغل في جافاسكريبت. الإجابة المغرية غالبًا ما تكون ما كان سيفعله التركيب الأقدم، وليس ما يفعله هذا الميزة.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    عملية التعيين باستخدام الـ nullish coalescing (`??=`) تُعيد القيمة اليمنى إذا كانت القيمة اليسرى `null` أو `undefined`. بما أن `b` تساوي `null`، تُعيّن لها القيمة `10`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="WeakRef"
  title="استخدام WeakRef"
  options={[
    {text: 'ReferenceError'},
    {text: '{ data: \'important\' }', isAnswer: true},
    {text: 'null'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا يقدم `WeakRef`؟
    ```js
        const obj = { data: 'important' };
        const ref = new WeakRef(obj);
        console.log(ref.deref());
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    تحقق من دقة سلوك المشغل في JavaScript. غالبًا ما تكون الإجابة المغرية ما كانت تقوم به الصياغة القديمة، وليس ما يفعله هذا الميزة.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `WeakRef` يوفر إشارة ضعيفة إلى كائن، مما يسمح بجمع القمامة لهذا الكائن إذا لم توجد مراجع أخرى. بما أن `obj` لا يزال مُشارًا إليه بقوة هنا، فإن `deref()` تُعيد الكائن الأصلي. إذا تم استعادة الهدف، فإن `deref()` ستُعيد `undefined`.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
