# Translation Candidate
- Slug: quiz-destructuring-delights
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-12--quiz-destructuring-delights/ar/index.mdx
- Validation: deferred
- Runtime seconds: 25.87
- Input tokens: 13044
- Output tokens: 8919
- Thinking tokens: unknown
- Cached input tokens: 4864
- Cache write tokens: 0
- Estimated cost: $0.002738
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'اختبار: متعة التفكيك'
subTitle: هل أنت بارع في تفكيك القيم؟
label: Destructuring
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
date: '2024-11-12'
modified: '2024-11-16'
tags:
  - quiz
  - intro
  - javascript
  - es2015
  - destructuring
  - beginner
  - intermediate
cover_full_width: ../boxes-of-nesting-dolls.webp
cover_mobile: ../boxes-of-nesting-dolls-square.webp
cover_icon: ../boxes-of-nesting-dolls-square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

/*{ Are you a maestero of Destructuring?<br/> }*/ 
<p class="inset">أم أنها <em>سيمفونيتك للدمار؟</em></p>

هذا الاختبار سيقيس مدى إلمامك بعملية التفكيك (Destructuring) في JavaScript: من الصياغة “الأساسية” للكائنات إلى التفكيك المتداخل والقيم الافتراضية. بالإضافة إلى أسئلة إضافية حول TypeScript والأنواع المضمنة!

انطلق مباشرة إلى مرحلة الإحماء — أثبت مهاراتك في التفكيك! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="تمهيد: الكائنات"
  title="تفكيك الكائنات الأساسي"
  options={[
    {text: 'الاسم: Dan Levy, العمر: 20'},
    {text: 'الاسم: Dan Levy, العمر: 40'},
    {text: 'الاسم: Dan Levy, العمر: Infinity'},
    {text: 'الاسم: Dan Levy, العمر: undefined', isAnswer: true},
    {text: 'خطأ: لا يمكن قراءة الخاصية \'age\''},
    {text: 'الاسم: undefined, العمر: 40'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا سيطبع هذا الكود؟
    ```js
        const person = {
          name: 'Dan Levy',
          location: 'Cape Town',
        };
        const { name, age } = person;
        console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    خاصية `age` غير موجودة في `person`، لذا ستكون قيمة `age` هي `undefined`. بالتأكيد ليست `Infinity` 😅

    ينتج عن ذلك:
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="تمهيد: المصفوفات"
  title="القيمة الافتراضية في تفكيك الكائن"
  options={[
    {text: 'الاسم: Dan Levy, العمر: NaN'},
    {text: 'الاسم: Dan Levy, العمر: null'},
    {text: 'الاسم: Dan Levy, العمر: undefined', isAnswer: true},
    {text: 'الاسم: Dan Levy, العمر: 40'},
    {text: 'خطأ: لا يمكن تفكيك الخاصية \'age\''},
    {text: 'خطأ في الصياغة: رمز غير متوقع \',\''},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا سيفعل هذا الكود؟
    ```js
        const person = [ 'Dan Levy', 'Cape Town' ];
        const [ name, origin, age ] = person;
        console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    المتغيّر `age` غير موجود في مصفوفة `tuple`، لذا سيكون قيمته `undefined`.

    هذا ينتج:
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="التفكيك المتداخل"
  title="التفكيك المتداخل"
  options={[
    {text: 'الأول: Dan، المدينة: Denver'},
    {text: 'الأول: undefined، المدينة: Denver'},
    {text: 'خطأ: لا يمكن قراءة الخاصية \'first\''},
    {text: 'الأول: Dan، المدينة: undefined'},
    {text: 'خطأ', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا عن بعض التفكيك المتداخل؟
    ```js
        'use strict';
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first },
          address: { city },
          birth: { place },
        } = person;
        console.log(
          `First: ${first}, City: ${place}`,
        );
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    خاصية `birth: { place }` غير موجودة في `person`، لذا ستثير خطأ.
    أحد الحلول هو توفير قيم افتراضية للخصائص المتداخلة.

    عند الوصول إلى الخصائص المتداخلة - كن حذرًا - لأن الأخطاء قد تكون صعبة الاكتشاف. ورسائل الأخطاء تختلف بين المتصفحات والمنصات الأخرى، مما يجعل عملية التصحيح أكثر تحديًا.

    في Chrome الحديث: `TypeError: Cannot read properties of undefined (reading 'place')`

    في Node، هذا أيضًا `TypeError` لأن JavaScript تحاول تفكيك `place` من `undefined` قبل قراءة `place`.

    الصياغة الدقيقة تختلف بين المتصفحات وبيئات التشغيل.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="القيم الافتراضية"
  title="القيم الافتراضية في تفكيك الكائنات"
  options={[
    {text: 'مرحبًا دان من غير معروف'},
    {text: 'مرحبًا دان من دنفر'},
    {text: 'مرحبًا غير معروف من غير معروف'},
    {text: 'مرحبًا غير معروف من دنفر'},
    {text: 'خطأ', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    الآن مع بعض القيم الافتراضية، ماذا سيفعل هذا؟
    ```js
        'use strict';
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first = 'Unknown' },
          birth: { place = 'Unknown' },
        } = person;
        console.log(
          `Hi ${first} from ${place}`,
        );
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    خاصية `birth` غير موجودة في `person`، لذا لا يزال الكائن بأكمله يحتاج إلى قيمة افتراضية، وليس الخاصية المتداخلة فقط. في الأساس يفتقد إلى قيمة افتراضية ` = {}` هناك.

    الصياغة الحالية تقول "إذا كان `person.birth` هو `undefined`، فإن `place` يكون `Unknown`". لكن `person.birth` هو `undefined`، لذا يحاول تفكيك `undefined`، مما يؤدي إلى حدوث خطأ.
    ```plaintext
        In modern Chrome: `TypeError: Cannot read properties of undefined (reading 'place')`

        In Node, this is also a `TypeError` because JavaScript tries to destructure `place` from `undefined`.

        Exact wording varies between browsers and runtimes.
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="القيم الافتراضية"
  title="القيم الافتراضية في تفكيك الكائنات"
  options={[
    {text: 'مرحبًا دان من دنفر'},
    {text: 'مرحبًا دان من جوهانسبرغ'},
    {text: 'مرحبًا دان من غير معروف', isAnswer: true},
    {text: 'مرحبًا غير معروف من غير معروف'},
    {text: 'مرحبًا غير معروف من دنفر'},
    {text: 'خطأ'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا سيفعل هذا؟
    ```js
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first = 'Unknown' },
          birth: { place = 'Unknown' } = {},
        } = person;

        console.log(
          `Hi ${first} from ${place}`,
        );
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    خاصية `birth` لا توجد في `person`، لذا يتم الرجوع إلى كائن فارغ ` = {}`. هذا يسمح باستخدام القيمة الافتراضية.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="معاملات الدالة"
  title="تفكيك معلمات الدالة مع القيم الافتراضية"
  options={[
    {text: 'مرحبًا دان من غير معرف'},
    {text: 'مرحبًا دان من غير معروف'},
    {text: 'مرحبًا دان من دنفر'},
    {text: 'مرحبًا غير معروف من غير معروف'},
    {text: 'مرحبًا غير معروف من دنفر'},
    {text: 'خطأ', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    الآن كمعلمات للدالة، ماذا سيفعل هذا؟
    ```js
        'use strict';
        function displayUser({
          name = "Unknown",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`Hi ${name} from ${place}`);
        }
        displayUser({ name: "Dan" });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    هذه الدالة تستخرج خاصيتي `name` و `age`، وتستخدم القيم الافتراضية إذا لزم الأمر. في هذه الحالة، المفتاح `place` في الكائن الافتراضي مجرد ضوضاء، فهو غير مستخدم داخل `displayUser()`.

    وضع الصارم لا يغيّر شيء هنا: قراءة المتغيّر غير المعلن `place` يثير `ReferenceError`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="معاملات الدالة"
  title="التفكيك مع القيم الافتراضية المتداخلة"
  options={[
    {text: 'غير معروف, غير معروف, جوهارب'},
    {text: 'غير معروف, غير معروف, غير معروف'},
    {text: 'غير معروف, `undefined`, جوهارب'},
    {text: 'غير متاح, `undefined`, جوهارب'},
    {text: 'غير متاح, غير معروف, جوهارب'},
    {text: 'غير متاح, غير متاح, جوهارب', isAnswer: true},
    {text: 'غير معروف, غير متاح, جوهارب'},
    {text: 'خطأ'},
  ]}
>
  <slot name="question">
  <div className="question">
    كيف يتم التعامل مع القيم `undefined`؟
    ```js
        'use strict';
        function displayPlace({
          name = "N/A",
          place = "N/A",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`${place}`);
        }
        displayPlace({ name: "Dan" });
        displayPlace({ name: "Dan", place: undefined });
        displayPlace({ name: "Dan", place: "Joburg" });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    ستستخدم الدالة `displayPlace` كائنًا افتراضيًا **فقط** إذا لم يتم تمرير أي كائن. لذا، الطريقة الوحيدة للحصول على القيمة الافتراضية `{ place: "Unknown" }` هي باستدعاء بدون أي معاملات `displayPlace()`.

    سلوك آخر ملحوظ هو أن تمرير `undefined` للخاصية `place` سيؤدي إلى استخدام القيمة الافتراضية، وهو مشابه جزئيًا لسلوك `JSON.stringify` (يتجاهل `undefined` ويعترف بـ `null`).

    هذا ينتج عنه:
    ```js
        displayPlace() // Unknown
        displayPlace({ name: "Dan" }) // N/A
        displayPlace({ name: "Dan", place: undefined }) // N/A
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="معاملات الدالة"
  title="التفكيك مع القيم الافتراضية المتداخلة"
  options={[
    {text: 'غير متاح, غير متاح'},
    {text: 'غير متاح, undefined'},
    {text: 'غير معروف, غير متاح'},
    {text: 'غير معروف, غير معروف'},
    {text: 'غير معروف, undefined'},
    {text: 'null, غير متاح', isAnswer: true},
    {text: 'null, غير معروف'},
    {text: 'null, undefined'},
    {text: 'خطأ'},
  ]}
>
  <slot name="question">
  <div className="question">
    مشابه للسابق... كيف يتم التعامل مع `null`؟_
    ```js
        function displayPlace({
          name = "N/A",
          place = "N/A",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`${place}`);
        }
        displayPlace({ name: "Dan", place: null });
        displayPlace({ name: "Dan", place: undefined });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    في هذه الحالة، يتم تعيين الخاصية `place` إلى `null` في الاستدعاء الأول، وإلى `undefined` في الاستدعاء الثاني. تُستخدم القيمة الافتراضية لـ `place` فقط إذا كان الكائن بأكمله مفقودًا **أو** `undefined`. القيم `null` ستظل `null`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="أنواع TypeScript المضمنة"
  title="التفكيك مع القيم الافتراضية المتداخلة"
  options={[
    {text: 'N/A'},
    {text: 'undefined'},
    {text: 'غير معروف'},
    {text: '\'null\''},
    {text: 'خطأ TypeScript', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    الآن في TypeScript... _ماذا سيفعل هذا؟_
    ```ts
        'use strict';
        function displayPlace(
          {
            name = 'N/A',
            place = 'N/A',
          }: {
            name: string;
            place: string;
            age: number;
          },
        ) {
          console.log(`${place}`);
        }
        displayPlace({ name: 'Dan', place: null });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    يُبلغ TypeScript عن خطأ لأن المتغيّر `place` مُعرّف كـ `string`، لكن الاستدعاء يمرّر `null`. كما أن الاستدعاء يُهمل الخاصية المطلوبة `age`.

    إذا تجاهلت أخطاء النوع، سيطبع تشغيل الشيفرة `null` في وحدة التحكم.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="TypeScript: مع التعيين"
  title="التفكيك مع القيم الافتراضية المتداخلة"
  options={[
    {text: 'undefined'},
    {text: 'null'},
    {text: 'N/A'},
    {text: 'Unknown'},
    {text: 'Denver', isAnswer: true},
    {text: 'SyntaxError'},
    {text: 'Error: Invalid type'},
    {text: 'Error: Invalid Arguments'},
  ]}
>
  <slot name="question">
  <div className="question">
    لنجرّب بعض إعادة التسمية/التعيين...
    ```ts
        'use strict';
        function displayPlace({
          name = 'N/A',
          place: location = 'N/A',
        }: {
          name: string;
          place: string;
          age?: number;
        }) {
          console.log(`${location}`);
        }
        displayPlace({ name: 'Dan', place: 'Denver' });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    سيطبع هذا `Denver` إلى وحدة التحكم. تم إعادة تسمية الخاصية `place` إلى `location` في توقيع الدالة. هذا نمط شائع (إعادة تسمية الخصائص أثناء التفكيك) عند تعديل هياكل البيانات من طرف ثالث.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="التفكيك المتداخل في TypeScript"
  title="التفكيك مع القيم الافتراضية المتداخلة"
  options={[
    {text: 'خطأ: الخاصية \'first\' مفقودة'},
    {text: 'خطأ: الخاصية \'last\' مفقودة'},
    {text: 'خطأ: الخاصيتان \'birth\' و \'age\' مفقودتان', isAnswer: true},
    {text: 'خطأ: الخاصية \'place\' مفقودة'},
    {text: 'خطأ: \'string\' لا يحتوي على خصائص في {...}'},
  ]}
>
  <slot name="question">
  <div className="question">
    حدد خطأ النوع:
    ```ts
        function greet({
          name: {first = "N/A", last = "N/A"},
          birth: {place = "N/A"} = {},
          age = -1,
        }: {
          name: {first?: string, last?: string};
          birth: {place?: string};
          age: number;
        }) {
          console.log(`Hi ${first} ${last} from ${place}`);
        }
        greet({ name: {first: 'Dan'} });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    الخطأ في توقيع الدالة `greet`. الخاصيتان `age` و `birth` مفقودتان في الكائن الممرَّر، لذا يجب أن تكونا اختياريتين في تعريف النوع.

    رغم أن الخاصية `birth` تم تفكيكها مع قيمة افتراضية، تعريف النوع يطلب وجودها. لتحديد خاصية كاختيارية في TypeScript، يجب استخدام العامل `?`.

    لاحظ أن `birth?: { place?: string }` ليس هو نفسه `birth: { place?: string } | undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="TypeScript + التعيين"
  title="التفكيك مع القيم المتداخلة، التعيين والأنواع"
  options={[
    {text: 'مرحبًا دان ليفي من N/A'},
    {text: 'مرحبًا دان ليفي من كيب تاون'},
    {text: 'مرحبًا N/A N/A من N/A'},
    {text: 'مرحبًا N/A N/A من كيب تاون'},
    {text: 'خطأ', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    الآن مع **التعيين** (لاحظ المتغيرات `f`، `l` و `p`)
    ```ts
        'use strict';
        function greet(
          {
            name: {first: f = "N/A", last: l = "N/A"},
            birth: {place: p = "N/A"} = {},
            age = -1,
          }: {
            name: {first?: string, last?: string};
            birth?: {place?: string};
            age?: number;
          }
        ) {
          console.log(`Hi ${f} ${l} from ${place}`);
          // What will 👆 do?
        }
        greet({
          name: {first: 'Dan', last: 'Levy'},
          birth: {place: 'Cape Town'},
        });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    خطأ آخر! بدأت تخمن، أليس كذلك؟!

    من الصعب قراءة طبقات التفكيك مع القيم الافتراضية، والتعيين، والأنواع!

    بمجرد إعادة تعيين `place` إلى المتغير `p`، لم يعد معرفًا في نطاق جملة `console.log`.
    ```ts
        console.log(`Hi ${f} ${l} from ${place}`); // ❌
        // to:
        console.log(`Hi ${f} ${l} from ${p}`); // ✅
    ```
  </div>
  </slot>
</Challenge>

</QuizUI>
````
