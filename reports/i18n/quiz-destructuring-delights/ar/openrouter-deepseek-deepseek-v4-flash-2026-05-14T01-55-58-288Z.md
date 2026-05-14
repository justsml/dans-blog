# Translation Candidate
- Slug: quiz-destructuring-delights
- Locale: ar
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-12--quiz-destructuring-delights/ar/index.mdx
- Validation: deferred
- Runtime seconds: 150.10
- Input tokens: 11618
- Output tokens: 19687
- Thinking tokens: unknown
- Cached input tokens: 640
- Cache write tokens: 0
- Estimated cost: $0.007285
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'اختبار: متعة التفكيك'
subTitle: هل أنت خبير في Destructuring؟
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

{/* Are you a maestero of Destructuring?<br/> */}
<p class="inset">أم هي سيمفونية الدمار الخاصة بك؟</p>

سيختبر هذا الاختبار معرفتك بـ Destructuring في JavaScript: من بناء الجملة "الأساسي" للكائنات إلى التدمير المتداخل والقيم الافتراضية. بالإضافة إلى أسئلة إضافية حول TypeScript والأنواع المضمنة!

اقفز مباشرة إلى التمهيد - أثبت مهاراتك في Destructuring! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="إحماء: الكائنات"
  title="تفكيك الكائنات الأساسي"
  options={[
    {text: 'الاسم: دان ليفي، العمر: 20'},
    {text: 'الاسم: دان ليفي، العمر: 40'},
    {text: 'الاسم: دان ليفي، العمر: Infinity'},
    {text: 'الاسم: دان ليفي، العمر: undefined', isAnswer: true},
    {text: 'خطأ: لا يمكن قراءة الخاصية \'age\''},
    {text: 'الاسم: undefined، العمر: 40'},
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
    الخاصية `age` غير موجودة في `person`، لذا ستكون `age` مساوية لـ `undefined`. بالتأكيد ليست `Infinity` 😅

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
  group="إحماء: المصفوفات"
  title="القيمة الافتراضية في تفكيك الكائنات"
  options={[
    {text: 'الاسم: Dan Levy، العمر: NaN'},
    {text: 'الاسم: Dan Levy، العمر: null'},
    {text: 'الاسم: Dan Levy، العمر: undefined', isAnswer: true},
    {text: 'الاسم: Dan Levy، العمر: 40'},
    {text: 'خطأ: لا يمكن تفكيك الخاصية \'age\''},
    {text: 'SyntaxError: رمز غير متوقع \',\''},
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
    المتغير `age` غير موجود في مصفوفة `tuple`، لذا سيكون `undefined`.

    ينتج عن ذلك:
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
    {text: 'الاسم الأول: دان، المدينة: دنفر'},
    {text: 'الاسم الأول: undefined، المدينة: دنفر'},
    {text: 'خطأ: لا يمكن قراءة الخاصية \'first\''},
    {text: 'الاسم الأول: دان، المدينة: undefined'},
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
    الخاصية `birth: { place }` غير موجودة في `person`، لذا ستؤدي إلى خطأ.
    أحد الحلول هو توفير قيم افتراضية للخصائص المتداخلة.

    عند الوصول إلى الخصائص المتداخلة - كن حذرًا - لأن الأخطاء قد تكون صعبة الاكتشاف. وتختلف رسائل الخطأ بين المتصفحات والمنصات الأخرى، مما يجعل التصحيح أكثر تحديًا.

    في Chrome الحديث: `TypeError: Cannot read properties of undefined (reading 'place')`

    في Node، هذا أيضًا `TypeError` لأن JavaScript يحاول تفكيك `place` من `undefined` قبل قراءة `place`.

    تختلف الصياغة الدقيقة بين المتصفحات وبيئات التشغيل.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="الافتراضيات"
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
    الآن مع بعض الافتراضيات، ماذا سيفعل هذا؟
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
    الخاصية `birth` غير موجودة في `person`، لذا لا يزال الكائن بأكمله بحاجة إلى قيمة افتراضية، وليس فقط الخاصية المتداخلة. باختصار، ينقصه قيمة افتراضية ` = {}`.

    الطريقة التي كُتب بها هذا تقول: "إذا كانت `person.birth` هي `undefined`، فإن `place` هي `Unknown`". لكن `person.birth` هي `undefined`، لذا فهي تحاول تفكيك `undefined`، مما يؤدي إلى خطأ.
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
  group="الافتراضيات"
  title="القيم الافتراضية في تفكيك الكائنات"
  options={[
    {text: 'مرحبًا Dan من Denver'},
    {text: 'مرحبًا Dan من Johannesburg'},
    {text: 'مرحبًا Dan من غير معروف', isAnswer: true},
    {text: 'مرحبًا غير معروف من غير معروف'},
    {text: 'مرحبًا غير معروف من Denver'},
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
    الخاصية `birth` غير موجودة في `person`، لذا تعود إلى كائن فارغ ` = {}`. هذا يسمح باستخدام القيمة الافتراضية.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="وسائط الدوال"
  title="تفكيك معاملات الدوال مع القيم الافتراضية"
  options={[
    {text: 'مرحبًا دان من undefined'},
    {text: 'مرحبًا دان من Unknown'},
    {text: 'مرحبًا دان من Denver'},
    {text: 'مرحبًا Unknown من Unknown'},
    {text: 'مرحبًا Unknown من Denver'},
    {text: 'خطأ', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    الآن كمعاملات دالة، ماذا سيفعل هذا؟
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
    تستخرج هذه الدالة الخاصيتين `name` و `age`، باستخدام القيم الافتراضية إذا لزم الأمر. في هذه الحالة، مفتاح `place` في الكائن الافتراضي هو مجرد ضوضاء، لا يُستخدم داخل `displayUser()`.

    الوضع المتشدد لا يغير هذا: قراءة الربط غير المعلن `place` يرمي `ReferenceError`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="وسائط الدالة"
  title="التفكيك مع القيم الافتراضية المتداخلة"
  options={[
    {text: 'غير معروف, غير معروف, Joburg'},
    {text: 'غير معروف, غير معروف, غير معروف'},
    {text: 'غير معروف, `undefined`, Joburg'},
    {text: 'N/A, `undefined`, Joburg'},
    {text: 'N/A, غير معروف, Joburg'},
    {text: 'N/A, N/A, Joburg', isAnswer: true},
    {text: 'غير معروف, N/A, Joburg'},
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
    الدالة `displayPlace` ستستخدم الكائن الافتراضي فقط إذا لم يتم تمرير أي كائن. لذا، الطريقة الوحيدة للحصول على القيمة الافتراضية `{ place: "Unknown" }` هي باستخدام صفر وسائط `displayPlace()`.

    سلوك آخر ملحوظ هنا هو أن تمرير `undefined` لـ `place` سيؤدي إلى استخدام القيمة الافتراضية، وهو مشابه قليلاً لسلوك `JSON.stringify` (تجاهل `undefined`، التعرف على `null`).

    ينتج عن ذلك:
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
  group="وسائط الدوال"
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
    في هذه الحالة، يتم تعيين الخاصية `place` إلى `null` في الاستدعاء الأول، و `undefined` في الثاني. القيمة الافتراضية لـ `place` تُستخدم فقط إذا كان الكائن بأكمله مفقودًا **أو** `undefined`. القيم `null` ستظهر كما هي `null`.
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
    {text: 'Unknown'},
    {text: '\'null\''},
    {text: 'TypeScript Error', isAnswer: true},
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
    يُبلغ TypeScript عن خطأ لأن `place` مكتوب كنوع `string`، لكن الاستدعاء يمرر `null`. كما أن الاستدعاء يحذف الخاصية المطلوبة `age`.

    إذا تجاهلت أخطاء الأنواع، فإن تشغيل الكود سيطبع `null` في وحدة التحكم.
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
    لنجرب بعض إعادة التسمية/التعيين...
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
    سيتم طباعة `Denver` في وحدة التحكم. تمت إعادة تسمية الخاصية `place` إلى `location` في توقيع الدالة. هذا نمط شائع (إعادة تسمية الخصائص أثناء التفكيك) عند تكييف هياكل البيانات من طرف ثالث.
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
    {text: 'خطأ: \'string\' ليس لها خصائص في {...}'},
  ]}
>
  <slot name="question">
  <div className="question">
    اكتشف الخطأ النوعي:
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
    الخطأ في توقيع الدالة `greet`. الخاصيتان `age` و `birth` مفقودتان في الكائن المُمرر، لذا يجب أن تكونا اختياريتين في تعريف النوع.

    على الرغم من أن الخاصية `birth` يتم تفكيكها بقيمة افتراضية، إلا أن تعريف النوع يتطلب وجودها. لتحديد خاصية كاختيارية في TypeScript، يجب استخدام العامل `?`.

    لاحظ أن `birth?: { place?: string }` ليس نفس `birth: { place?: string } | undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="TypeScript + التعيين"
  title="التفكيك مع القيم المتداخلة، التعيين والأنواع"
  options={[
    {text: 'مرحبًا Dan Levy من N/A'},
    {text: 'مرحبًا Dan Levy من Cape Town'},
    {text: 'مرحبًا N/A N/A من N/A'},
    {text: 'مرحبًا N/A N/A من Cape Town'},
    {text: 'خطأ', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    الآن مع **التعيين** (لاحظ المتغيرات `f` و `l` و `p`)
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
    خطأ آخر! لقد بدأت في التخمين، أليس كذلك؟!

    من الصعب قراءة طبقات التفكيك، مع القيم الافتراضية، التعيين والأنواع!

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
