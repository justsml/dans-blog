# Translation Candidate
- Slug: quiz-postgres-sql-mastery-pt1
- Locale: ar
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/ar/index.mdx
- Validation: deferred
- Runtime seconds: 157.25
- Input tokens: 14487
- Output tokens: 19970
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.007844
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
social_image: ../mobile.webp
title: 'اختبار: Postgres المتقدم: الجزء 1'
subTitle: هل تجعلك SQL تصرخ؟
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

> **الجزء 1 من 2.** [انتقل إلى الجزء 2](../quiz-postgres-sql-mastery-pt2/)

<p class="inset">PostgreSQL 🐘 هي بلا شك قاعدة البيانات المفضلة لدي! أتعلم دائمًا حيلًا ومزالق جديدة، لذا قررت جمعها في اختبار جديد!</p>

يغطي هذا الاختبار مزيجًا من ميزات PostgreSQL المألوفة والأقل شهرة، بالإضافة إلى المزالق: من التجميعات المضمنة إلى تحويل الأنواع والقيود وغيرها.

حظًا موفقًا! 🍀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="تمهيد: الدوال"
  title="الدوال التجميعية المدمجة"
  options={[
    {text: 'MIN'},
    {text: 'MAX'},
    {text: 'AVG'},
    {text: 'MEDIAN', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    أي من التالي ليس دالة تجميعية مدمجة في PostgreSQL؟
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
    الدوال التجميعية المدمجة الشائعة:
    - `MIN`, `MAX`, `COUNT`
    - `AVG`, `SUM`
    - `ARRAY_AGG`, `STRING_AGG`
    - دوال إحصائية متنوعة
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="إحماء: تحويل الأنواع"
  title="تنوعات صيغة التحويل"
  options={[
    {text: '\'95\'::INTEGER'},
    {text: 'INTEGER \'95\''},
    {text: 'CAST(\'95\', INTEGER)', isAnswer: true},
    {text: 'CAST(\'95\' AS INTEGER)'},
  ]}
>
  <slot name="question">
  <div className="question">
    أي من تحويلات الأنواع التالية **غير صالحة** ❌؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    تدعم PostgreSQL ثلاث صيغ للتحويل:

    1. SQL القياسي (ANSI): `CAST(expression AS type)`.
    2. PostgreSQL: `expression::type`.
    3. دالة النوع: `type 'literal'`.

    جميعها متكافئة وظيفيًا، لكن:
    - `CAST()` هو الأكثر قابلية للنقل.
    - `::` خاص بـ PostgreSQL لكنه شائع الاستخدام.
    - الصيغة الوسطية `type 'literal'` أقل شيوعًا لكنها لا تزال صالحة.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="القيود"
  title="قيود UNIQUE و NULL"
  options={[
    {text: 'لا يُسمح بأي قيم NULL'},
    {text: 'يُسمح بقيمة NULL واحدة'},
    {text: 'يُسمح بعدة قيم NULL', isAnswer: true},
    {text: 'يعتمد على إصدار PostgreSQL'},
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
  title="حساب التواريخ"
  options={[
    {text: '2024-11-27'},
    {text: '2024-11-27 00:00:00'},
    {text: '2024-11-28'},
    {text: '2024-11-28 00:00:00', isAnswer: true},
    {text: 'خطأ: وقت غير صالح'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا يُرجع هذا؟
    ```sql
        SELECT '2024-11-27'::date + interval '24 hours';
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    الفترات الزمنية (Intervals) أداة قوية لتبسيط عمليات نطاق التاريخ!

    حساب التواريخ في PostgreSQL:
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
    {text: 'كلاهما يشغلان 8 بايت، لكنهما يمثلان دلالات زمنية مختلفة', isAnswer: true},
    {text: 'هم\'},
    {text: 'timestamptz يحافظ على أي منطقة زمنية مدخلة'},
    {text: 'timestamptz يخزن اسم المنطقة الزمنية الأصلية أو الإزاحة'},
    {text: 'timestamptz يخزن قيمة 2 بايت للمنطقة الزمنية'},
    {text: 'timestamptz هو الخلف لـ timestamp'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هي **أدق** عبارة حول `timestamptz` و `timestamp`؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    كلاهما يشغلان 8 بايت، لكنهما لا يخزنان نفس النوع من القيمة.

    إذن ما الفرق؟ الفرق في تحليل الإدخال.

    **`timestamptz`**
    - يطبيع الإدخال إلى نقطة زمنية مطلقة.
    - يأخذ في الاعتبار إعداد `TimeZone` للخادم/الاتصال عند تحليل الإدخال بدون إزاحة صريحة وعند عرض المخرجات.

    **`timestamp`**
    - يخزن تاريخًا ووقتًا بدون تحويل المنطقة الزمنية.
    - لا يحافظ على معلومات المنطقة الزمنية ولا يطبعها.


    **`timestamp`**

    - يخزن التاريخ والوقت بدون معلومات المنطقة الزمنية.
    - مفيد لتخزين التواريخ الموحدة بشكل صريح، سواء في UTC أو منطقة زمنية محددة.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="أنواع PostgreSQL"
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
    أي من هذه الأنواع ليس ❌ نوعًا صالحًا في PostgreSQL؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    تمتلك PostgreSQL مجموعة غنية من أنواع البيانات، لكن `STRING(100)` ليس واحدًا منها.

    أنواع السلاسل النصية الصحيحة تشمل:
    - `VARCHAR(100)` (سلسلة متغيرة الطول)
    - `CHAR(100)` (سلسلة ثابتة الطول)
    - `TEXT` (طول غير محدود)
    - `CHARACTER VARYING(100)` (مثل `VARCHAR(100)`)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="أنواع PostgreSQL"
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
    أي من هذه الأنواع ليس ❌ نوعًا صالحًا في PostgreSQL؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    قد يبدو مألوفًا لأن `decimal128` هو نوع في العديد من الأماكن (بما في ذلك Mongo و Java.) لكنه ليس نوعًا صالحًا في PostgreSQL، بينما `decimal` هو النوع الصحيح.

    الأنواع الرقمية الصحيحة تشمل:
    - `int` (عدد صحيح 4 بايت)
    - `bigint` (عدد صحيح 8 بايت)
    - `real` (فاصلة عائمة 4 بايت)
    - `double precision` (فاصلة عائمة 8 بايت)
    - `bigserial` (عدد صحيح متزايد تلقائيًا 8 بايت)
    - `smallserial` (عدد صحيح متزايد تلقائيًا 2 بايت)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="أنواع PostgreSQL"
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
    أي من هذه الأنواع ليس ❌ نوعًا صالحًا في PostgreSQL؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    هل جعلك هذا محبطًا، بل _غاضبًا_؟ أنت لست وحدك! على حد قول أحد المساهمين المجهولين في "core"، "what the hell, Dan?! I crashed on the type questions! Thats violent sir! Not sharing my score, hah." 😈 على الرحب والسعة.

    مجموعة PostgreSQL الغنية من أنواع الشبكات لا تتضمن `ipv4`. في كل مرة أحاول استخدامه دون البحث، أخطئ فيه. ربما `macaddr8` يجعلني أشعر أنه _لا بد_ أن هناك أنواع `ipv4` و `ipv6`. لا، `inet` يغطي كليهما. أيضًا، `cidr` يغطي أقنعة الشبكة لكليهما.

    أنواع الشبكات الصالحة تشمل:
    - `cidr` (عنوان شبكة IPv4/IPv6)
    - `inet` (عنوان مضيف IPv4/IPv6)
    - `macaddr` (عنوان MAC)
    - `macaddr8` (عنوان MAC EUI-64)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="أنواع PostgreSQL"
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
    أي من هذه الأنواع ليس ❌ نوعًا صالحًا في PostgreSQL؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    تمتلك PostgreSQL مجموعة غنية من الأنواع المتخصصة، لكن `currency` ليس واحدًا منها!

    الأنواع الصالحة تشمل:
    - `xml` (بيانات XML)
    - `uuid` (UUID)
    - `money` (مبلغ العملة)
    - `interval` (فاصل زمني)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="أنواع PostgreSQL"
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
    أي من هذه الأنواع ليس ❌ نوعًا صالحًا في PostgreSQL؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    تحتوي PostgreSQL على مجموعة غنية من الأنواع المتخصصة، لكن `triangle` ليس واحدًا منها.

    أعتقد أن الإصدارات القادمة من [GEOS](https://libgeos.org/) ستتضمن دعم `Triangle` وفقًا لمعايير OGC/WKT، مما يعني أنه يجب أن يُدرج في Postgis في النهاية. (ببساطة، قد تكون هذه الإجابة خاطئة في المستقبل.)

    الأنواع المتخصصة الصحيحة تشمل:
    - `box` (مربع مستطيل)
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
  group="العمليات الحسابية على الأعداد الصحيحة"
  title="تجاوز العدد الصحيح"
  options={[
    {text: '4294967296'},
    {text: 'خطأ: العدد الصحيح خارج النطاق', isAnswer: true},
    {text: '0'},
    {text: '2147483647'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا يحدث عند حساب إجمالي أرقام الطلاب المحتملة؟
    ```sql
        SELECT 256 * 256 * 256 * 256;
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    نوع `integer` في PostgreSQL هو عدد صحيح موقّع 32 بت، يتراوح من `-2,147,483,648` إلى `2,147,483,647`.

    العملية الحسابية `256^4` = `4,294,967,296` تتجاوز هذا النطاق.

    للتعامل مع الأعداد الأكبر:
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
    ما هو أصغر نص حرفي `timestamp` يتجاوز أقصى دقة `time` في Postgres؟
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
    الطوابع الزمنية في PostgreSQL لها دقة ميكروثانية (6 منازل عشرية).

    - الحد الأقصى: `.123456` (6 أرقام)
    - يتم تقريب أو اقتطاع النانوثانية (9 أرقام) إلى الدقة المدعومة
    - يتم قبول إزاحات المنطقة الزمنية لـ `timestamptz`، ولكنها غير مطلوبة

    **مأزق غير شائع:** بعض اللغات/الأطر ترسل دقة نانوثانية، لكن PostgreSQL يخزن الطوابع الزمنية بدقة ميكروثانية.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="أنواع PostgreSQL"
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
    أي من هذه الأنواع ليس ❌ نوعًا صالحًا في PostgreSQL؟

    (بجدية، هذه كلها أنواع حقيقية - في الغالب.)
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    يحتوي PostgreSQL على عدة أنواع هندسية وأنواع بحث نصي مدمجة، لكن `tsrank` ليس واحدًا منها.

    الأنواع الهندسية وأنواع البحث النصي الصحيحة تشمل:
    - `lseg` (قطعة خطية)
    - `bytea` (بيانات ثنائية)
    - `tsquery` (استعلام بحث نصي)
    - `tsvector` (مستند بحث نصي)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="القيود"
  title="توقيت التحقق من القيد"
  options={[
    {text: 'فورًا للصفوف الجديدة أو المعدلة', isAnswer: true},
    {text: 'عند تنفيذ المعاملة (commit)'},
    {text: 'في الاستعلام التالي'},
    {text: 'أبدًا - يتم التحقق من القيود فقط عند INSERT'},
  ]}
>
  <slot name="question">
  <div className="question">
    متى يتم التحقق من قيد grade؟
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
    القيود `NOT VALID`:
    - يتم التحقق منها فورًا للإضافات والتحديثات الجديدة
    - لا تتحقق من الصفوف الموجودة
    - يمكن التحقق من الصفوف الموجودة لاحقًا باستخدام `VALIDATE CONSTRAINT`
    - مفيدة للجداول الكبيرة

    بدون `NOT VALID`:
    - يتم التحقق من القيد فورًا
    - يتم التحقق من جميع الصفوف الموجودة
    - قد يكون بطيئًا على الجداول الكبيرة
  </div>
  </slot>
</Challenge>

</QuizUI>

أحسنت! لقد تعمقت في عدة مجالات من PostgreSQL! 🐘

أتمنى أن تكون قد تعلمت شيئًا جديدًا، أو على الأقل حصلت على درجة تتفاخر بها! 🏆

<p class="inset">اطّلع على [الجزء الثاني](../quiz-postgres-sql-mastery-pt2/) لمزيد من متعة Postgres! 🚀</p>

هل تريد المزيد من الإثارة في الحياة؟ اطّلع على [مجموعة الاختبارات الخاصة بي](../challenges/) لمتعة لا نهائية*! 🎉
````
