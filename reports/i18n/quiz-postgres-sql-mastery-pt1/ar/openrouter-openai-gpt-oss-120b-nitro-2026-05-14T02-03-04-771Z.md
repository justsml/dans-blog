# Translation Candidate
- Slug: quiz-postgres-sql-mastery-pt1
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/ar/index.mdx
- Validation: deferred
- Runtime seconds: 29.12
- Input tokens: 15647
- Output tokens: 9039
- Thinking tokens: unknown
- Cached input tokens: 5376
- Cache write tokens: 0
- Estimated cost: $0.002602
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
social_image: ../mobile.webp
title: 'اختبار: PostgreSQL المتعمق: الجزء 1'
subTitle: هل يجعلك SQL تصرخ؟
label: 'Deep PostgreSQL #1'
category: Quiz
subCategory: Database
date: '2024-11-27'
modified: '2024-12-03'
tags:
  - quiz
  - postgresql
  - sql
  - database
  - intermediate
  - advanced
cover_full_width: ../elephant-synthwave-gym-wide.webp
cover_mobile: ../elephant-synthwave-gym-square-200.webp
cover_icon: ../elephant-synthwave-gym-square-200.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

> **الجزء 1 من 2.** [انتقل إلى الجزء 2](/quiz-postgres-sql-mastery-pt2/)

<p class="inset">PostgreSQL 🐘 هو قاعدة البيانات المفضلة لدي! أستمر في اكتشاف حيل و gotchas جديدة، فقررت تجميعها في اختبار جديد!</p>

هذا الاختبار يغطي مزيجًا من الميزات المعروفة وأخرى الأقل شهرة في PostgreSQL: من الدوال التجميعية المدمجة إلى تحويل الأنواع، القيود، وأكثر من ذلك.

حظًا موفقًا! 🍀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="تمهيد: الدوال"
  title="التجميعات المدمجة"
  options={[
    {text: 'MIN'},
    {text: 'MAX'},
    {text: 'AVG'},
    {text: 'MEDIAN', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    أيّ منها ليس دالة تجميع مدمجة في PostgreSQL؟
    ```sql
        SELECT 
          MIN(grade) as lowest,
          MAX(grade) as highest,
          AVG(grade) as average,
          MEDIAN(grade) as middle
        FROM grades;
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `MEDIAN` ليست مدمجة! تحتاج إلى:
    ```sql
        PERCENTILE_CONT(0.5) 
        WITHIN GROUP (ORDER BY grade)
    ```
    التجميعات المدمجة الشائعة:
    - `MIN`, `MAX`, `COUNT`
    - `AVG`, `SUM`
    - `ARRAY_AGG`, `STRING_AGG`
    - وظائف إحصائية متنوعة
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="تمهيد: تحويل الأنواع"
  title="أنماط صيغ التحويل"
  options={[
    {text: '\'95\'::INTEGER'},
    {text: 'INTEGER \'95\''},
    {text: 'CAST(\'95\', INTEGER)', isAnswer: true},
    {text: 'CAST(\'95\' AS INTEGER)'},
  ]}
>
  <slot name="question">
  <div className="question">
    أي من عمليات تحويل الأنواع هذه **غير صالحة** ❌؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    يدعم PostgreSQL ثلاث صيغ للتحويل:

    1. ANSI SQL: `CAST(expression AS type)`.
    2. PostgreSQL: `expression::type`.
    3. دالة النوع: `type 'literal'`.

    جميعها تعادل وظيفيًا، لكن:
    - `CAST()` هو الأكثر قابلية للنقل.
    - `::` خاص بـ PostgreSQL لكنه شائع الاستخدام.
    - النمط الوسطي `type 'literal'` أقل شيوعًا لكنه لا يزال صالحًا.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="القيود"
  title="قيود UNIQUE و NULL"
  options={[
    {text: 'لا يُسمح بأي NULL'},
    {text: 'يسمح بـ NULL واحد'},
    {text: 'يسمح بعدة NULLs', isAnswer: true},
    {text: 'يعتمد على نسخة PostgreSQL'},
  ]}
>
  <slot name="question">
  <div className="question">
    كم عدد قيم NULL المسموح بها هنا؟
    ```sql
        CREATE TABLE student_emails (
          student_id INTEGER,
          email VARCHAR(255),
          UNIQUE(email)
        );
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    قيود UNIQUE في PostgreSQL:
    - تسمح بعدة قيم NULL.
    - `NULL` ≠ `NULL` في فحوصات التفرد.

    لمنع قيم `NULL`، أضف `NOT NULL`:
    ```sql
        CREATE TABLE student_emails (
          student_id INTEGER,
          email VARCHAR(255) NOT NULL,
          UNIQUE(email)
        );
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="التاريخ/الوقت"
  title="حساب التاريخ"
  options={[
    {text: '2024-11-27'},
    {text: '2024-11-27 00:00:00'},
    {text: '2024-11-28'},
    {text: '2024-11-28 00:00:00', isAnswer: true},
    {text: 'Error: invalid time'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا تُعيد هذه؟
    ```sql
        SELECT '2024-11-27'::date + interval '24 hours';
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    الفواصل الزمنية أداة قوية لتبسيط عمليات نطاقات التاريخ!

    حساب التاريخ في PostgreSQL:
    - `+ interval '24 hours'` يضيف 24 ساعة
    - `+ interval '1 day'` يضيف يومًا واحدًا
    - `+ interval '1 month'` يضيف شهرًا واحدًا
    - `+ interval '1 year'` يضيف سنة واحدة

    النتيجة هي `2024-11-28 00:00:00`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="الطوابع الزمنية"
  title="timestamptz مقابل timestamp"
  options={[
    {text: 'كلاهما يشغل 8 بايت، لكنهما يمثلان دلالات زمنية مختلفة', isAnswer: true},
    {text: 'They"'},
    {text: 'timestamptz يحافظ على أي منطقة زمنية مدخلة'},
    {text: 'timestamptz يخزن اسم المنطقة الزمنية الأصلي أو الإزاحة'},
    {text: 'timestamptz يخزن قيمة بطول 2 بايت للمنطقة الزمنية'},
    {text: 'timestamptz هو السليل لـ timestamp'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو البيان **الأدق** حول `timestamptz` و `timestamp`؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    كلاهما 8 بايت، لكنهما لا يخزنان نفس نوع القيمة.

    إذن ما الفرق؟ يكمن في طريقة تحليل الإدخال.

    **`timestamptz`**
    - يطبع الإدخال إلى نقطة زمنية مطلقة.
    - يأخذ في الاعتبار إعداد `TimeZone` الخاص بالخادم/الاتصال عند تحليل الإدخال بدون إزاحة صريحة وعند عرض النتيجة.

    **`timestamp`**
    - يخزن التاريخ والوقت دون تحويل المنطقة الزمنية.
    - لا يحافظ على معلومات المنطقة الزمنية ولا يطبعها.


    **`timestamp`**

    - يخزن التاريخ والوقت دون معلومات عن المنطقة الزمنية.
    - مفيد لتخزين تواريخ موحدة صراحةً، إما بتوقيت UTC أو بمنطقة زمنية محددة.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="أنواع Postgres"
  title="تحديد الأنواع غير الصالحة"
  options={[
    {text: 'VARCHAR(100)'},
    {text: 'CHAR(100)'},
    {text: 'TEXT'},
    {text: 'STRING(100)', isAnswer: true},
    {text: 'CHARACTER VARYING(100)'},
  ]}
>
  <slot name="question">
  <div className="question">
    أيّ من هذه ليست ❌ نوعًا صالحًا في PostgreSQL؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL لديها مجموعة غنية من أنواع البيانات، لكن `STRING(100)` ليس أحدها.

    الأنواع الصحيحة للسلاسل تشمل:
    - `VARCHAR(100)` (سلسلة بطول متغيّر)
    - `CHAR(100)` (سلسلة بطول ثابت)
    - `TEXT` (طول غير محدود)
    - `CHARACTER VARYING(100)` (نفس `VARCHAR(100)`)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="أنواع Postgres"
  title="تحديد الأنواع غير الصالحة"
  options={[
    {text: 'int'},
    {text: 'real'},
    {text: 'bigint'},
    {text: 'bigserial'},
    {text: 'smallserial'},
    {text: 'decimal128', isAnswer: true},
    {text: 'double precision'},
  ]}
>
  <slot name="question">
  <div className="question">
    أيّ من هذه ليس ❌ نوعًا صالحًا في PostgreSQL؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    قد يبدو مألوفًا لأن `decimal128` هو نوع في أماكن كثيرة (بما في ذلك Mongo و Java.) لكنه ليس نوعًا صالحًا في PostgreSQL، النوع الصحيح هو `decimal`.

    الأنواع العددية الصحيحة تشمل:
    - `int` (عدد صحيح 4 بايت)
    - `bigint` (عدد صحيح 8 بايت)
    - `real` (عدد عائم 4 بايت)
    - `double precision` (عدد عائم 8 بايت)
    - `bigserial` (عدد صحيح تلقائي الزيادة 8 بايت)
    - `smallserial` (عدد صحيح تلقائي الزيادة 2 بايت)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="أنواع Postgres"
  title="تحديد الأنواع غير الصالحة"
  options={[
    {text: 'cidr'},
    {text: 'inet'},
    {text: 'ipv4', isAnswer: true},
    {text: 'macaddr'},
    {text: 'macaddr8'},
    {text: 'interval'},
  ]}
>
  <slot name="question">
  <div className="question">
    أيّ من هذه ليس ❌ نوعًا صالحًا في PostgreSQL؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    هل جعلك هذا محبطًا،甚至 _غاضبًا_؟ لست وحدك! كما قال مساهم غير مسمى في "الجوهر" لقاعدة البيانات، "ما هذا بحق الجحيم يا دان؟! تحطمت أمام أسئلة الأنواع! هذا عنيف يا سيدي! لن أشارك نتيجتي، هاها." 😈 على الرحب والسعة.

    مجموعة الأنواع الشبكية الغنية في PostgreSQL لا تشمل `ipv4`. في كل مرة أحاول استخدامها دون البحث، أخطئ. ربما يجعلني `macaddr8` أظن أنه يجب أن يكون هناك أنواع `ipv4` و `ipv6`. لا، `inet` يغطي كليهما. كذلك، `cidr` يغطي أقنعة الشبكة لكليهما.

    الأنواع الشبكية الصالحة تشمل:
    - `cidr` (عنوان شبكة IPv4/IPv6)
    - `inet` (عنوان مضيف IPv4/IPv6)
    - `macaddr` (عنوان MAC)
    - `macaddr8` (عنوان MAC بنظام EUI-64)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="أنواع Postgres"
  title="تحديد الأنواع غير الصالحة"
  options={[
    {text: 'xml'},
    {text: 'uuid'},
    {text: 'money'},
    {text: 'currency', isAnswer: true},
    {text: 'interval'},
  ]}
>
  <slot name="question">
  <div className="question">
    أيّ من هذه ليس ❌ نوع PostgreSQL صالح؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL لديها مجموعة غنية من الأنواع المتخصصة، لكن `currency` ليس أحدها!

    الأنواع الصالحة تشمل:
    - `xml` (بيانات XML)
    - `uuid` (UUID)
    - `money` (قيمة عملة)
    - `interval` (فترة زمنية)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="أنواع Postgres"
  title="تحديد الأنواع غير الصالحة"
  options={[
    {text: 'box'},
    {text: 'line'},
    {text: 'point'},
    {text: 'circle'},
    {text: 'polygon'},
    {text: 'triangle', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    أي من هذه ليس ❌ نوع PostgreSQL صالح؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL لديه مجموعة غنية من الأنواع المتخصصة، لكن `triangle` ليس أحدها.

    أعتقد أن الإصدارات القادمة من [GEOS](https://libgeos.org/) ستضيف دعم `Triangle` في OGC/WKT، مما يعني أنه قد يُضمّن في Postgis مستقبلاً. (بشكل أساسي، قد تكون هذه الإجابة خاطئة في المستقبل.)

    الأنواع المتخصصة الصحيحة تشمل:
    - `box` (مستطيل)
    - `line` (خط لا نهائي)
    - `point` (نقطة ثنائية الأبعاد)
    - `circle` (دائرة ثنائية الأبعاد)
    - `polygon` (مضلع ثنائي الأبعاد)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="الرياضيات الصحيحة"
  title="تجاوز السعة للعدد الصحيح"
  options={[
    {text: '4294967296'},
    {text: 'Error: integer out of range', isAnswer: true},
    {text: '0'},
    {text: '2147483647'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا يحدث عند حساب إجمالي معرفات الطلاب الممكنة؟
    ```sql
        SELECT 256 * 256 * 256 * 256;
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    نوع `integer` في PostgreSQL هو 32‑بت موقّع، يتراوح من `-2,147,483,648` إلى `2,147,483,647`.

    العملية `256^4` = `4,294,967,296` تتجاوز هذا النطاق.

    للتعامل مع أعداد أكبر:
    ```sql
        -- Use BIGINT
        SELECT 256::bigint * 256 * 256 * 256;

        -- Or numeric for arbitrary precision
        SELECT 256::numeric * 256 * 256 * 256;
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="التاريخ/الوقت"
  title="دقة الطابع الزمني"
  options={[
    {text: '2024-01-08 13:30:00+00'},
    {text: '2024-01-08 13:30:00.123456+00'},
    {text: '2024-01-08 13:30:00.123456789+00'},
    {text: '2024-01-08 13:30:00.1234567', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو أصغر قيمة حرفية `timestamp` تتجاوز أقصى دقة `time` في Postgres؟
    ```sql
        CREATE TABLE class_sessions (
          id INT GENERATED BY DEFAULT AS IDENTITY,
          start_time timestamptz,
          end_time timestamptz
        );
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    للطوابع الزمنية في PostgreSQL دقة ميكروثانية (6 منازل عشرية).

    - الحد الأقصى: `.123456` (6 أرقام)
    - النانوثانية (9 أرقام) تُقرب أو تُقطّع إلى الدقة المدعومة
    - يتم قبول إزاحات المنطقة الزمنية لـ `timestamptz`، لكن ليست إلزامية

    **ملاحظة غير شائعة:** بعض اللغات/الأطر ترسل دقة نانوثانية، لكن PostgreSQL يخزن الطوابع الزمنية بدقة ميكروثانية.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="أنواع Postgres"
  title="تحديد الأنواع غير الصالحة"
  options={[
    {text: 'lseg'},
    {text: 'bytea'},
    {text: 'tsquery'},
    {text: 'tsvector'},
    {text: 'tsrank', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    أيّ من هذه ليس ❌ نوع PostgreSQL صالح؟

    (جدًّا، هذه في الغالب أنواع حقيقية.)
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL يحتوي على عدة أنواع هندسية وأنواع بحث نصي مدمجة، لكن `tsrank` ليس أحدها.

    الأنواع الهندسية والبحث النصي الصحيحة تشمل:
    - `lseg` (قطعة خط)
    - `bytea` (بيانات ثنائية)
    - `tsquery` (استعلام بحث نصي)
    - `tsvector` (وثيقة بحث نصي)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="القيود"
  title="توقيت فحص القيد"
  options={[
    {text: 'فوريًا للصفوف الجديدة أو المعدلة', isAnswer: true},
    {text: 'عند إتمام المعاملة'},
    {text: 'في الاستعلام التالي'},
    {text: 'أبدًا - يتم فحص القيود فقط عند INSERT'},
  ]}
>
  <slot name="question">
  <div className="question">
    متى يتم فحص قيد الدرجة هذا؟
    ```sql
        ALTER TABLE students 
        ADD CONSTRAINT valid_grade 
        CHECK (
          (grade >= 0 AND grade <= 100) OR 
          grade IS NULL
        ) NOT VALID;
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `NOT VALID` constraints:
    - يتم فحصها فورًا للإدخالات والتحديثات الجديدة
    - لا تتحقق من الصفوف الموجودة
    - يمكن التحقق من الصفوف الموجودة لاحقًا باستخدام `VALIDATE CONSTRAINT`
    - مفيدة للجداول الكبيرة

    بدون `NOT VALID`:
    - يتم فحص القيد فورًا
    - يتم التحقق من جميع الصفوف الموجودة
    - قد تكون بطيئة على الجداول الكبيرة
  </div>
  </slot>
</Challenge>

</QuizUI>

أحسنت! لقد غصت في عدة جوانب من PostgreSQL! 🐘

آمل أن تكون قد تعلمت شيئًا جديدًا، أو على الأقل حصلت على نتيجة لتتباهى بها! 🏆

<p class="inset">تحقق من [الجزء 2](/quiz-postgres-sql-mastery-pt2/) لمزيد من المتعة مع Postgres! 🚀</p>

هل تريد المزيد من الإثارة في حياتك؟ تفقد مجموعة [الاختبارات](/challenges/) للحصول على متعة لا نهائية*!
````
