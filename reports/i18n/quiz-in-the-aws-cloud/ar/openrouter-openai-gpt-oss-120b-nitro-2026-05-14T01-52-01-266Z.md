# Translation Candidate
- Slug: quiz-in-the-aws-cloud
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-12-28--quiz-in-the-aws-cloud/ar/index.mdx
- Validation: deferred
- Runtime seconds: 67.11
- Input tokens: 27759
- Output tokens: 23527
- Thinking tokens: unknown
- Cached input tokens: 7296
- Cache write tokens: 0
- Estimated cost: $0.006126
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'اختبار: تخزين AWS: أكثر من 20 سؤال!'
subTitle: هل يمكنك اجتياز متاهة السحابة؟
label: AWS Storage
category: Quiz
subCategory: Cloud
date: '2024-12-28'
modified: '2024-12-29'
tags:
  - quiz
  - aws
  - cloud
  - storage
  - databases
  - s3
  - dynamodb
  - rds
  - elasticache
social_image: ../mobile.webp
cover_full_width: ../aws-cloud--city-focus-wide.webp
cover_mobile: ../aws-cloud--city-focus-square.webp
cover_icon: ../aws-cloud--city-focus-square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">هل أنت مستعد للسحابة؟! 🤡</p>

اغمر نفسك في خدمات تخزين AWS! سيختبر هذا الاختبار معرفتك بـ S3 و DynamoDB و Aurora و RDS و ElastiCache وغير ذلك. من أفضل الممارسات إلى الفخاخ الماكرة، سنستكشف مشهد تخزين السحابة.

استعد لإثبات خبرتك السحابية! 🚀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="تمهيد"
  title="مسابقة S3"
  difficulty={1}
  objectives={[
    "استرجاع معنى اسم خدمة AWS S3",
    "تحديد خدمات التخزين الأساسية في AWS",
  ]}
  options={[
    {text: 'تخزين الخادم v3'},
    {text: 'التخزين كخدمة'},
    {text: 'خدمة التخزين البسيطة', isAnswer: true},
    {text: 'خدمة التخزين الجريئة'},
    {text: 'متجر بسيط متزامن'},
  ]}
>
  <slot name="question">
  <div className="question">
    <p className="text-sm">آخر تحقق: 8 مايو 2026. حدود وأسعار AWS تتغير بسرعة.</p>
    ما معنى اسم `S3`؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    S3 تعني **Simple Storage Service**. إنها خدمة تخزين كائنات قابلة للتوسع مصممة لتخزين البيانات على نطاق واسع.

    AWS S3 يقدم فئات تخزين متعددة:
    - Standard: للبيانات التي تُ accessed بشكل متكرر
    - Infrequent Access (IA): تكلفة أقل للوصول غير المتكرر
    - Glacier: تخزين أرشيفي طويل الأمد منخفض التكلفة

    كل فئة تقدم تسعيرًا وخصائص وصول مختلفة، مما يسمح بتحسين التكلفة بناءً على أنماط استخدام البيانات.

    [تعرف على المزيد حول فئات تخزين S3](https://aws.amazon.com/s3/storage-classes/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="بدون مخطط"
  title="DynamoDB"
  difficulty={2}
  objectives={[
    "تعريف خصائص قاعدة البيانات بدون مخطط",
    "شرح نموذج البيانات المرن في DynamoDB",
  ]}
  options={[
    {text: 'تخزين خصائص عشوائية', isAnswer: true},
    {text: 'مفاتيح تقسيم ديناميكية'},
    {text: 'الأعمدة غير مُعرفة النوع'},
    {text: 'مخطط JSON يُدار تلقائيًا'},
    {text: 'يعتمد على RDS لدعم المخطط'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا يعني عندما يُوصف DynamoDB بأنه "بدون مخطط"؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    يُعتبر DynamoDB "بدون مخطط" لأنه يسمح لك بتخزين خصائص عشوائية في العناصر دون مخطط مسبق.

    [أفضل ممارسات DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="بدون مخطط"
  title="DynamoDB"
  difficulty={4}
  objectives={[
    "قارن قدرات عمليات الدفعة في DynamoDB",
    "حسّن عمليات التحديث في DynamoDB",
    "قيّم اعتبارات التوسع للتحديثات",
  ]}
  options={[
    {text: 'PutItem', hint: 'ينشئ عنصرًا جديدًا، أو يستبدل عنصرًا قديمًا بعنصر جديد.'},
    {text: 'BatchUpdateItem', hint: 'غير موجود.'},
    {text: 'BatchWriteItem', hint: 'يضيف (يدرج) أو يحذف عناصر متعددة في استدعاء واحد.'},
    {text: 'UpdateItem', isAnswer: true},
    {text: 'BatchUpsertItem', hint: 'في DynamoDB؟'},
    {text: 'TransactWriteItems', hint: 'يجمع عمليات متعددة من PutItem وUpdateItem وDeleteItem وConditionCheck في استدعاء واحد.'},
  ]}
>
  <slot name="question">
  <div className="question">
    أي واجهة برمجة تطبيقات DynamoDB تُحدّث الخصائص في عنصر موجود واحد؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    المفتاح هنا هو <b>التحديثات</b>، وليس الإدخالات أو عمليات PUT. إذا كنت تقوم بالإدخالات، يمكنك استخدام `BatchWriteItem` أو `TransactWriteItems`.

    بينما يمكن لـ `BatchWriteItem` التعامل مع عمليات متعددة، فهو مقيد بـ PUTs وDELETES. `TransactWriteItems` أكثر قوة، لكنه أشبه بالمطرقة الكبيرة للتحديثات البسيطة.
    للتحديثات البسيطة، `UpdateItem` هو الخيار الأفضل. يسمح لك بـ UPDATE، أو تعديل خاصية أو أكثر في عنصر موجود.

    عملية `UpdateItem` تعدل عنصرًا واحدًا لكل طلب. للتعبئات الكبيرة أو التحديثات الضخمة، عادةً ما تنسق العديد من استدعاءات `UpdateItem` أو تستخدم سير عمل أكبر مثل تنفيذ دفعات PartiQL، Step Functions، Glue، EMR، أو عملية عامل مخصصة.

    عملية `UpdateItem`:
    - تُحدّث خصائص عنصر موجود.
    - تُضيف خصائص جديدة إلى عنصر موجود.
    - تُزيل الخصائص من العنصر.
    - تُجري التحديث بشرط وجود العنصر أو استيفائه لشروط معينة.

    [DynamoDB UpdateItem](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="قدرات الاستعلام"
  title="ميزات البحث المتقدمة"
  difficulty={3}
  objectives={[
    "فهم قدرات الاستعلام المتقدمة عبر خدمات AWS",
    "مقارنة ميزات البحث بالنص الكامل",
  ]}
  options={[
    {text: 'ElastiCache', hint: 'في المقام الأول ذاكرة تخزين مؤقت في الذاكرة؛ إصدارات Valkey الأحدث تشمل ميزات البحث.'},
    {text: 'OpenSearch', isAnswer: true},
    {text: 'Neptune', hint: 'قاعدة بيانات رسومية مع قدرات استعلام متقدمة'},
    {text: 'Redshift', hint: 'استعلامات تحليلية معقدة'},
    {text: 'DocumentDB', hint: 'استعلامات متوافقة مع MongoDB'},
  ]}
>
  <slot name="question">
  <div className="question">
    أي خدمة AWS هنا مُصممة خصيصًا للبحث بالنص الكامل وتحليلات البحث؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    OpenSearch هو خدمة AWS المدارة للبحث وتحليل السجلات وأعباء عمل البحث بالنص الكامل.

    المشتتات هي خدمات مفيدة، لكنها ليست محرك البحث المصمم خصيصًا في هذه القائمة:
    - ElastiCache: في الأساس ذاكرة تخزين مؤقت في الذاكرة. الإصدار الحالي من ElastiCache لـ Valkey يتضمن أوامر بحث للبيانات المفهرسة في الذاكرة، لذا لم يعد من الدقة وصف الخدمة بأكملها بأنها لا تحتوي على بحث مدمج.
    - Neptune: قاعدة بيانات رسومية؛ يمكنها التكامل مع OpenSearch للبحث بالنص الكامل.
    - Redshift: مستودع بيانات لتحليلات SQL.
    - DocumentDB: قاعدة بيانات مستندات مع بحث نصي متوافق مع MongoDB في الإصدارات المدعومة.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="RDS"
  title="نشر متعدد المناطق"
  difficulty={2}
  objectives={[
    "تحديد الغرض الأساسي من عمليات النشر متعدد المناطق",
    "التمييز بين التوافر العالي وتوسيع القراءة",
  ]}
  options={[
    {text: 'يقلل تكاليف التخزين'},
    {text: 'يحل مشكلة خروج البيانات'},
    {text: 'يوفر الفشل التلقائي', isAnswer: true},
    {text: 'يزيد من أداء القراءة'},
    {text: 'يحسن حركة المرور الموزعة جغرافياً'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هي الفائدة **الرئيسية** لنشر RDS متعدد المناطق؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    مناطق التوفر (AZs) هي مراكز بيانات متميزة **داخل المنطقة.** يوفر نشر RDS متعدد المناطق الفشل التلقائي إلى نسخة احتياطية في *منطقة قريبة*.

    نشر متعدد المناطق:
    - يوفر الفشل التلقائي
    - يزيد من توافر قاعدة البيانات
    - ينشئ نسخة احتياطية متزامنة
    - يقلل من وقت التوقف أثناء فشل البنية التحتية

    لا تخلط بين نشر متعدد المناطق ونسخ القراءة، التي تُستخدم لتوسيع عمليات القراءة.

    {/* [RDS Multi-AZ Details](https://aws.amazon.com/rds/features/multi-az/) */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="WebSockets"
  title="سحر WebSocket"
  difficulty={3}
  objectives={[
    "مقارنة دعم WebSocket عبر خدمات AWS",
    "تحديد القيود المعمارية في خدمات AWS",
    "تقييم خيارات تنفيذ WebSocket",
  ]}
  options={[
    {text: 'API Gateway', isAnswer: true},
    {text: 'EKS', hint: 'يمكن لـ EKS تشغيل خدمات WebSocket طويلة الأمد الخاصة بك.'},
    {text: 'Lightsail', hint: 'يمكن لنسخ Lightsail تشغيل خادم WebSocket الخاص بك.'},
    {text: 'AppSync', hint: 'يقدم AppSync اشتراكات GraphQL في الوقت الحقيقي المدارة عبر WebSockets، وليس مقابس خام عشوائية.'},
    {text: 'EC2', hint: 'يمكن لـ EC2 تشغيل عملية خادم WebSocket طويلة الأمد الخاصة بك.'},
  ]}
>
  <slot name="question">
  <div className="question">
    👋 آمل أنك تستمتع حتى الآن!

    حان الوقت لسؤال صعب...

    أي خدمة من AWS توفر واجهات برمجة تطبيقات WebSocket مُدارة حيث تمتلك AWS اتصال العميل وتوجيه الرسائل إلى التكاملات؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    يدعم API Gateway واجهات WebSocket ثنائية الاتجاه، لكن التنفيذ يُدار بواسطة API Gateway بدلاً من أن يكون مقبسًا مباشرًا إلى عملية الخادم الخاصة بك.
    يحتفظ API Gateway باتصال العميل ويُوجه الرسائل إلى Lambda أو نقاط النهاية HTTP أو تكاملات أخرى. يمكن إرسال الرسائل مرة أخرى إلى العملاء المتصلين عبر API Gateway Management API.

    الخدمات الأخرى أكثر صداقةً مع WebSocket:
    - Lightsail: مثالية لإعدادات WebSocket البسيطة 👌
    - AppSync: يستخدم WebSockets للاشتراكات المدارة في GraphQL
    - EC2: خيارك الكلاسيكي "افعل ما تريد" لـ WebSockets
    - EKS: رائع لتشغيل مجموعات WebSocket قابلة للتوسع

    نصيحة احترافية: إذا كنت بحاجة إلى قوة WebSocket الخام، التزم بخدمات الحوسبة!
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="أمان S3"
  title="سياسة دلو S3"
  difficulty={2}
  objectives={[
    "تطبيق أفضل ممارسات الأمان على S3",
    "تنفيذ مبدأ أقل صلاحية",
  ]}
  options={[
    {text: 'اجعل الدلاء الجديدة عامة', hint: 'أقل صلاحية أولاً.'},
    {text: 'نقل S3 إلى الموقع المحلي للتحكم الكامل في قوائم التحكم بالوصول'},
    {text: 'نقل البيانات إلى سلسلة كتل خاصة', hint: 'تمزح، أليس كذلك؟'},
    {text: 'استخدام مبدأ أقل صلاحية', isAnswer: true},
    {text: 'استخدام أحرف البدل في السياسات لضمان الوصول الضروري', hint: '😯 لا!'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو النهج الموصى به لأذونات دلاء S3؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    في جميع الأنظمة تقريبًا، تبني تصميم "أقل صلاحية" هو طريقة أساسية لتقوية النظام وضمان استدامته. محاولة تأمين نظام موجود صعبة كنقل مبنى مكتبي كامل إلى أساس جديد.

    دلاء S3 ليست استثناء. لتطبيق مبدأ أقل صلاحية، ابدأ بدون أذونات وامنح فقط الوصول الضروري. استخدم أدوار وسياسات IAM للتحكم في الوصول وراجع أذونات الدلو بانتظام.

    أفضل ممارسات الأمان:
    - تطبيق مبدأ أقل صلاحية
    - البدء بدون أذونات
    - منح الوصول الضروري فقط
    - استخدام أدوار وسياسات IAM
    - مراجعة أذونات الدلو بانتظام

    تجنّب الإعدادات المفرطة التي قد تكشف بيانات حساسة.

    [أفضل ممارسات أمان S3](https://aws.amazon.com/s3/security/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Aurora"
  title="Aurora Serverless"
  difficulty={2}
  objectives={[
    "تحديد الميزات الرئيسية لـ Aurora Serverless",
    "التمييز بين قواعد البيانات الخالية من الخوادم والمخصصة",
  ]}
  options={[
    {text: 'دائمًا أرخص من النسخة المخصصة'},
    {text: 'يقوم تلقائيًا بتوسيع سعة الحوسبة', isAnswer: true},
    {text: 'يوفر تخزينًا غير محدود'},
    {text: 'يقضي على إدارة قاعدة البيانات'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هي الميزة الأساسية في Aurora Serverless؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Aurora Serverless:
    - يقوم تلقائيًا بتوسيع سعة الحوسبة
    - يضبط الموارد بناءً على عبء العمل
    - مثالي لأعباء العمل غير المتوقعة
    - ادفع فقط مقابل الموارد المستخدمة

    مثالي للتطبيقات ذات أنماط حركة مرور متغيرة.

    [نظرة عامة على Aurora Serverless](https://aws.amazon.com/rds/aurora/serverless/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="المجموعات، الجزء 1!"
  title="حدود BatchGetItem"
  difficulty={2}
  objectives={[
    "تذكر حدود DynamoDB BatchGetItem",
    "قارن BatchGetItem بعمليات التجميع الأخرى",
  ]}
  options={[
    {text: '1', hint: '... أصر على التجميع.'},
    {text: '25', hint: 'هذا هو الحد لـ `BatchWriteItem`.'},
    {text: '100', isAnswer: true},
    {text: '75', hint: 'قريب، لكن هناك رقم دائري.'},
    {text: '50', hint: 'أعلى قليلاً لـ `BatchGetItem`.'},
    {text: '200', hint: 'عالي قليلاً...'},
    {text: 'Unlimited', hint: 'هناك حد ثابت لـ `BatchGetItem`.'},
  ]}
>
  <slot name="question">
  <div className="question">
    سؤال آخر عن تجميع DynamoDB!<br />
    ما هو الحد الأقصى لعدد العناصر التي يمكنك استرجاعها باستخدام طلب `BatchGetItem` واحد في DynamoDB؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    يسمح SDK الخاص بـ DynamoDB باسترجاع ما يصل إلى **100** عنصر في طلب `BatchGetItem` واحد. هذا أعلى من الحد لـ `BatchWriteItem`، وهو 25 عنصر.
    بالإضافة إلى ذلك، هناك حدود لحجم الحمولة الإجمالي، حجم المستند، ومعدل الطلب.

    فهم هذه الحدود أمر حاسم لتحسين أداء تطبيقك وضمان عمليات بيانات فعّالة.

    **ملاحظة:** من الممكن تجاوز بعض هذه الحدود - إذا استطعت إقناع مدير حساب AWS الخاص بك. 😎
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="الدفعات، الجزء 2!"
  title="عمليات الدفعة"
  difficulty={4}
  objectives={[
    "فهم حدود عمليات الدفعة في DynamoDB",
    "التمييز بين العمليات الفردية والدفعية",
  ]}
  options={[
    {text: '1', isAnswer: true},
    {text: '10'},
    {text: '25', hint: 'تخمين جيد...'},
    {text: '50'},
    {text: '100', hint: 'تفكر في حد GetItem؟'},
    {text: '100 when streaming'},
    {text: 'None of the above', hint: 'هذا أمر معقد قليلاً...'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو الحد الأقصى لعدد المستندات التي يمكن لـ DynamoDB `UPDATE`ها في دفعة واحدة؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    عملاء DynamoDB هم في الأساس جميع الأغلفة لواجهة HTTP API الخاصة به. عملية `BatchWriteItem` يمكنها `PUT` أو `DELETE` حتى **25** مستندًا لكل طلب HTTP، لكنها لا تستطيع `UPDATE` عدة مستندات.

    بينما يمكن لـ DynamoDB `INSERT` حتى **25** مستندًا لكل طلب HTTP، يمكنها `UPDATE` مستندًا واحدًا فقط لكل طلب باستخدام عملية `UpdateItem`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="DynamoDB"
  title="السعة المخصصة مقابل السعة حسب الطلب"
  difficulty={3}
  objectives={[
    "مقارنة أوضاع سعة DynamoDB",
    "اختيار وضع السعة المناسب بناءً على عبء العمل",
    "تقييم تبعات التكلفة لاختيارات السعة",
  ]}
  options={[
    {text: 'المخصصة دائمًا أفضل'},
    {text: 'السعة حسب الطلب لا حدود لها'},
    {text: 'هما يعملان بشكل متماثل'},
    {text: 'السعة حسب الطلب أرخص للأحمال غير المتوقعة', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    متى يجب عليك استخدام سعة DynamoDB حسب الطلب؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    السعة حسب الطلب هي الأفضل لـ:
    - أحمال غير متوقعة
    - حركة مرور متقطعة
    - تطبيقات ذات أنماط وصول غير معروفة
    - تجنب الإفراط في التخصيص

    السعة المخصصة أفضل لـ:
    - أحمال متوقعة ومتسقة
    - مزيد من التحكم في الأداء
    - توفير محتمل في التكلفة

    [أوضاع سعة DynamoDB](https://aws.amazon.com/dynamodb/pricing/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="أداء S3"
  title="تحسين أداء S3"
  difficulty={3}
  objectives={[
    "تحسين أداء S3 لمعدلات طلب عالية",
    "تطبيق أفضل ممارسات تسمية مفاتيح S3",
    "تصميم لتوزيع أقسام S3",
  ]}
  options={[
    {text: 'استخدم بادئات عشوائية/هاش'},
    {text: 'استخدم بادئات منطقية؛ لا يلزم العشوائية', isAnswer: true},
    {text: 'استخدم دائمًا أكبر الكائنات'},
    {text: 'قلل عدد الكائنات'},
  ]}
>
  <slot name="question">
  <div className="question">
    كيف تحسن أداء S3 لمعدلات طلب عالية؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    نصائح أداء S3:
    - S3 الحديثة توسّع تلقائيًا معدلات الطلب حسب كل بادئة
    - لا تحتاج إلى بادئات عشوائية/هاش للأداء
    - استخدم أسماء مفاتيح منطقية تتوافق مع أنماط الوصول الخاصة بك
    - راقب استجابات 503 Slow Down إذا دفعت معدلات طلب مرتفعة جدًا

    التوجيه القديم كان يوصي عشوائية البادئات لتجنب الأقسام الساخنة، لكن AWS لم تعد توصي بذلك كمتطلب أداء افتراضي.

    [إرشادات أداء S3](https://aws.amazon.com/s3/performance/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="نسخ احتياطي لـ RDS"
  title="استراتيجية النسخ الاحتياطي لـ RDS"
  difficulty={2}
  objectives={[
    "تحديد أفضل الممارسات لاستراتيجيات النسخ الاحتياطي لـ RDS",
    "فهم قدرات الاستعادة لحظة معينة",
  ]}
  options={[
    {text: 'لقطات يدوية فقط'},
    {text: 'لا حاجة للنسخ الاحتياطي'},
    {text: 'نسخ احتياطي تلقائي مع استعادة لحظة معينة', isAnswer: true},
    {text: 'نسخ احتياطي كامل أسبوعيًا'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو النهج الموصى به للنسخ الاحتياطي لـ RDS؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    أفضل ممارسات النسخ الاحتياطي:
    - تمكين النسخ الاحتياطي التلقائي
    - استخدام الاستعادة لحظة معينة
    - الاحتفاظ بالنسخ الاحتياطية وفقًا لاحتياجات الامتثال
    - اختبار عملية الاستعادة بانتظام
    - النظر في النسخ الاحتياطي عبر المناطق

    توفر النسخ الاحتياطية التلقائية:
    - حماية مستمرة للبيانات
    - خيارات استعادة مرنة

    [أفضل ممارسات النسخ الاحتياطي لـ RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="ElastiCache"
  title="Redis مقابل Memcached"
  difficulty={2}
  objectives={[
    "قارن قدرات Redis و Memcached",
    "ميز بين ميزات محرك التخزين المؤقت",
  ]}
  options={[
    {text: 'Redis يدعم المزيد من هياكل البيانات والعمليات', isAnswer: true},
    {text: 'متطابق في جميع الجوانب'},
    {text: 'التوافق على مستوى API'},
    {text: 'Memcached دائمًا أسرع'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو الاختلاف الرئيسي بين `Redis` و `Memcached` في `ElastiCache`؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    مزايا Redis:
    - يدعم هياكل بيانات معقدة
    - خيارات الاستمرارية
    - عمليات متقدمة
    - رسائل Pub/Sub

    Memcached:
    - مخزن بسيط من نوع مفتاح‑قيمة
    - تخزين مؤقت بحت
    - أداء عالي لحالات الاستخدام البسيطة

    [Redis مقابل Memcached](https://aws.amazon.com/elasticache/redis-vs-memcached/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="فهارس DynamoDB"
  title="الفهرس الثانوي العالمي"
  difficulty={3}
  objectives={[
    "فهم هدف الفهرس الثانوي العالمي",
    "تقييم أنماط الوصول في DynamoDB",
    "تصميم استراتيجيات استعلام فعّالة",
  ]}
  options={[
    {text: 'مطابق للمفتاح الأساسي'},
    {text: 'بدون تكلفة إضافية'},
    {text: 'يقلل من أداء الكتابة'},
    {text: 'يسمح بالاستعلام على سمات غير أساسية', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو هدف الفهرس الثانوي العالمي في DynamoDB؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    الفهرس الثانوي العالمي (GSI):
    - يسمح بالاستعلام على سمات غير المفتاح الأساسي
    - ينشئ أنماط وصول بديلة
    - يزيد من مرونة الاستعلام
    - يأتي بتكلفة إضافية لسعة الكتابة

    مفيد لمتطلبات الاستعلام المعقدة التي تتجاوز المفتاح الأساسي.

    [فهارس DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="دورة حياة S3"
  title="إدارة دورة حياة S3"
  difficulty={2}
  objectives={[
    "فهم قدرات إدارة دورة حياة S3",
    "تطبيق استراتيجيات تحسين التكلفة لـ S3",
  ]}
  options={[
    {text: 'نقل الكائنات يدويًا'},
    {text: 'الانتقال التلقائي للكائنات بين فئات التخزين', isAnswer: true},
    {text: 'عدم حذف الكائنات القديمة أبدًا'},
    {text: 'تخزين كل شيء في فئة Standard'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا تمكّن إدارة دورة حياة S3؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    إدارة دورة الحياة:
    - الانتقال التلقائي للكائنات بين فئات التخزين
    - نقل البيانات غير المتكررة إلى تخزين أرخص
    - تحديد قواعد لانتهاء صلاحية الكائنات
    - تحسين تكاليف التخزين
    - تقليل عبء الإدارة اليدوية

    [قواعد دورة حياة S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="توسيع Aurora"
  title="توسيع عمليات القراءة باستخدام Amazon Aurora"
  difficulty={2}
  objectives={[
    "تذكر حدود نسخ القراءة في Aurora",
    "فهم قدرات Aurora في توسيع القراءة",
  ]}
  options={[
    {text: 'محدود بنسخة قراءة واحدة فقط', hint: 'فكّر في ميزات قابلية التوسع في Aurora.'},
    {text: 'لا يمكن توسيع القراءة', hint: 'هل يتوافق ذلك مع قدرات Aurora؟'},
    {text: 'يدعم ما يصل إلى 15 نسخة قراءة', isAnswer: true},
    {text: 'نسخ قراءة غير محدودة', hint: 'هناك حد عملي يجب مراعاته.'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو الحد الأقصى لعدد نسخ القراءة التي يدعمها Amazon Aurora؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    يدعم Amazon Aurora **ما يصل إلى 15 نسخة قراءة**، مما يتيح لك توسيع عمليات القراءة بشكل كبير. تستفيد هذه النسخ من:

    - **التكرار شبه الفوري** عبر النسخ
    - **أدنى تأثير على الأداء** على المثيل الأساسي
    - **توزيع فعال** لأحمال القراءة

    يتيح هذا الإعداد توسيعًا أفقيًا للتطبيقات ذات الطلب العالي على القراءة.

    [تعرف على المزيد حول نسخ Aurora للقراءة](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replicas.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="أمان RDS"
  title="تشفير RDS"
  difficulty={2}
  objectives={[
    "تحديد قدرات تشفير RDS",
    "فهم آليات حماية البيانات في RDS",
  ]}
  options={[
    {text: 'تشفير البيانات في حالة السكون وعند النقل', isAnswer: true},
    {text: 'التشفير اختياري'},
    {text: 'لا يتوفر تشفير'},
    {text: 'تشفير أعمدة محددة فقط'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هي قدرات التشفير التي يوفرها RDS؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    ميزات تشفير RDS:
    - تشفير البيانات في حالة السكون باستخدام KMS
    - تشفير البيانات أثناء النقل باستخدام SSL/TLS
    - تمكين التشفير أثناء إنشاء قاعدة البيانات
    - حماية المعلومات الحساسة
    - الامتثال للمعايير الأمنية

    [خيارات تشفير RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/encryption-options.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="دينامو دي بي ستريمز"
  title="غرض DynamoDB Streams"
  difficulty={3}
  objectives={[
    "فهم حالات استخدام DynamoDB Streams",
    "تصميم معمارية مدفوعة بالأحداث باستخدام DynamoDB",
    "تقييم أنماط معالجة البيانات القائمة على الستريمز",
  ]}
  options={[
    {text: 'تخزين نسخ إضافية من البيانات'},
    {text: 'ائتمانات DynamoDB للبائعين الأخضر', hint: 'حقًا؟'},
    {text: 'زيادة أداء الكتابة', hint: 'الستريمز هي '},
    {text: 'التقاط تغييرات على مستوى العنصر للمعمارية المدفوعة بالأحداث', isAnswer: true},
    {text: 'بديل للفهارس الثانوية العالمية', hint: 'هل تخمن؟'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو الاستخدام الأساسي لـ DynamoDB Streams؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    DynamoDB Streams:
    - التقاط تغييرات على مستوى العنصر
    - تمكين المعمارية المدفوعة بالأحداث
    - تشغيل وظائف Lambda
    - دعم النسخ عبر المناطق
    - توفير حركة بيانات شبه لحظية

    [نظرة عامة على DynamoDB Streams](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="نقل S3"
  title="نقل ملفات كبيرة"
  difficulty={2}
  objectives={[
    "تحديد أفضل الممارسات لتحميل الملفات الكبيرة",
    "فهم فوائد التحميل المتعدد الأجزاء",
  ]}
  options={[
    {text: 'دائمًا استخدم طلب PUT واحد'},
    {text: 'استخدم التحميل المتعدد الأجزاء للملفات الكبيرة', isAnswer: true},
    {text: 'ضغط قبل الرفع'},
    {text: 'قسّم يدويًا قبل الرفع'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هي الطريقة المثلى لرفع ملفات كبيرة إلى S3؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    فوائد التحميل المتعدد الأجزاء:
    - التعامل مع الملفات الكبيرة بكفاءة
    - استئناف التحميلات المتقطعة
    - رفع أجزاء الملف بشكل متوازي
    - يوصى به للملفات > 100 ميغابايت
    - تحسين موثوقية الشبكة

    [تحميل متعدد الأجزاء لـ S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={20}
  group="تحسين التكلفة"
  title="تحليل تكلفة التخزين"
  difficulty={4}
  objectives={[
    "قارن تكاليف التخزين عبر خدمات AWS",
    "قيم تبعات التكلفة لاختيارات التخزين",
    "طبق استراتيجيات تحسين التكلفة",
  ]}
  options={[
    {text: 'S3 Standard لجميع البيانات'},
    {text: 'استخدم دائمًا التخزين الأرخص'},
    {text: 'اخلط فئات التخزين بناءً على أنماط الوصول', isAnswer: true},
    {text: 'خزن كل شيء في Glacier'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو النهج الأكثر فعالية من حيث التكلفة لتخزين 1PB من البيانات مع وصول 20% يوميًا، و30% شهريًا، و50% سنويًا؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    استراتيجية التخزين المثلى:
    - 20% في S3 Standard للوصول اليومي
    - 30% في S3 Standard-IA للوصول الشهري
    - 50% في Glacier للوصول السنوي

    يحقق هذا النهج تحسينًا في التكلفة مع الحفاظ على أنماط الوصول المناسبة.

    اعتبارات التكلفة:
    - تسعير التخزين لكل جيجابايت
    - تكاليف الاسترجاع
    - أنماط الوصول
    - تكاليف الانتقال
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={21}
  group="تناسق DynamoDB"
  title="نماذج التناسق"
  difficulty={4}
  objectives={[
    "فهم نماذج التناسق في DynamoDB",
    "تقييم المقايضات بين مستويات التناسق",
    "تطبيق نماذج التناسق على سيناريوهات العالم الحقيقي",
  ]}
  options={[
    {text: '100 قراءة في الثانية', isAnswer: true},
    {text: '50 قراءة في الثانية'},
    {text: '200 قراءة في الثانية'},
    {text: 'عدد غير محدود من القراءات في الثانية'},
  ]}
>
  <slot name="question">
  <div className="question">
    جدول DynamoDB لديه سعة قراءة مخصصة قدرها 100 وحدة قراءة (RCU). كم عدد عمليات القراءة المتسقة بقوة لعناصر بحجم 4KB يمكن إجراؤها في الثانية؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    فهم نماذج التناسق في DynamoDB أمر حاسم:

    - 1 وحدة قراءة (RCU) = قراءة متسقة بقوة واحدة/ثانية للعناصر حتى 4KB
    - 1 وحدة قراءة (RCU) = قراءتين متسقتين نهائيًا/ثانية للعناصر حتى 4KB

    لذلك:
    - 100 وحدة قراءة = 100 قراءة متسقة بقوة بحجم 4KB/ثانية
    - 100 وحدة قراءة = 200 قراءة متسقة نهائيًا بحجم 4KB/ثانية

    اختر نماذج التناسق بناءً على:
    - متطلبات التطبيق
    - اعتبارات التكلفة
    - احتياجات الأداء
    - متطلبات حداثة البيانات
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={22}
  group="التوافر العالي في Aurora"
  title="آلية الفشل التلقائي في Aurora"
  difficulty={3}
  objectives={[
    "فهم عملية الفشل في Aurora",
    "تحديد تكوينات التوافر العالي",
    "تطبيق أفضل ممارسات التعافي من الكوارث",
  ]}
  options={[
    {text: 'يتطلب تدخلًا يدويًا'},
    {text: 'يتطلب إعادة تكوين التطبيق'},
    {text: 'دائمًا ينتقل إلى النسخة الاحتياطية الأقدم'},
    {text: 'ترقية تلقائية بناءً على مستوى أولوية الفشل', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    في مجموعة Aurora تحتوي على عدة نسخ قراءة، ماذا يحدث أثناء الفشل التلقائي عندما تفشل النسخة الأساسية؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    عملية الفشل في Aurora:
    1. تكتشف فشل النسخة الأساسية
    2. تختار نسخة Aurora احتياطية بناءً أساسًا على مستوى أولوية الفشل
    3. تستخدم خصائص النسخة كمعايير كسر التعادل عندما تتطابق الأولويات
    4. تقوم بتحديث نقطة النهاية للمجموعة تلقائيًا

    أفضل الممارسات:
    - حافظ على عدة نسخ احتياطية عبر مناطق التوفر (AZs)
    - اضبط مستويات الترقية عمدًا
    - استخدم نقطة النهاية للمجموعة في التطبيقات
    - اختبر سيناريوهات الفشل بانتظام
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={23}
  group="تناسق S3"
  title="التناسق القوي في S3"
  difficulty={3}
  objectives={[
    "فهم نموذج تناسق S3",
    "تحديد ضمانات عمليات S3",
    "تطبيق معرفة التناسق على تصميم التطبيقات",
  ]}
  options={[
    {text: 'فقط للكائنات الجديدة'},
    {text: 'تناسق قوي لجميع العمليات', isAnswer: true},
    {text: 'تناسق نهائي للتحديثات'},
    {text: 'يعتمد على المنطقة'},
  ]}
>
  <slot name="question">
  <div className="question">
    اعتبارًا من أواخر 2020، ما هو نموذج التناسق الذي توفره S3 لجميع العمليات؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    نموذج تناسق S3:
    - تناسق قوي للقراءة بعد الكتابة لجميع العمليات
    - ينطبق على عمليات PUT و DELETE
    - لا حاجة لحلول بديلة كانت تُستَخدم سابقًا
    - بدون تكلفة إضافية

    الأثر:
    - تبسيط منطق التطبيق
    - لا حاجة لفحوصات التناسق
    - قراءات فورية موثوقة بعد الكتابة
    - تحسين موثوقية التطبيق
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={24}
  group="ميزات DynamoDB"
  title="الوقت للعيش (TTL)"
  difficulty={3}
  objectives={[
    "فهم ميزة TTL في DynamoDB",
    "تطبيق TTL لإدارة دورة حياة البيانات",
    "تصميم استراتيجيات فعّالة لانتهاء صلاحية البيانات",
  ]}
  options={[
    {text: 'يحذف العناصر فور انتهاء صلاحيتها'},
    {text: 'يتطلب تشغيل حذف يدوي'},
    {text: 'حذف خلفي بأفضل جهد للجدولة', isAnswer: true},
    {text: 'ينتهي صلاحية العناصر لكنه يبقيها مخزنة'},
  ]}
>
  <slot name="question">
  <div className="question">
    كيف يتعامل ميزة TTL في DynamoDB مع حذف العناصر؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    خصائص TTL في DynamoDB:
    - عملية خلفية تراقب سمة TTL
    - يتم حذف العناصر المنتهية على جدول زمني بأفضل جهد، عادةً خلال بضعة أيام
    - لا تكلفة إضافية للـ TTL
    - تظهر العناصر المحذوفة في الـ streams

    حالات الاستخدام:
    - إدارة الجلسات
    - انتهاء صلاحية السجلات
    - تنظيف البيانات المؤقتة
    - الامتثال التنظيمي
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={25}
  group="أوراورا سيرفرلس"
  title="سلوك التحجيم"
  difficulty={4}
  objectives={[
    "فهم تحجيم أوراورا سيرفرلس",
    "تحديد محفزات التحجيم",
    "تحسين التكلفة لأعباء العمل المتغيرة",
  ]}
  options={[
    {text: 'سرعة التحجيم تعتمد على السعة الحالية والمكوَّنة', isAnswer: true},
    {text: 'يتحجم فورًا عند الطلب'},
    {text: 'يتحجم فقط في فترات محددة مسبقًا'},
    {text: 'تحجيم يدوي فقط'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو الاعتبار الرئيسي عند الاعتماد على أوراورا سيرفرلس للتعامل مع الارتفاع المفاجئ في حركة المرور؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    تحجيم أوراورا سيرفرلس:
    - أوراورا سيرفرلس v2 يضاعف السعة بزيادات دقيقة من ACU
    - سرعة التحجيم تعتمد على السعة الحالية وإعدادات الحد الأدنى/الأقصى لـ ACU
    - الإصدارات المدعومة يمكنها الإيقاف التلقائي عند 0 ACU عندما يتم تكوينها
    - الفوترة بالثانية بناءً على ACU

    أفضل الممارسات:
    - ضبط الحد الأدنى للسعة عاليًا بما يكفي للتعامل مع الارتفاع المفاجئ في الأحمال الحرجة
    - مراقبة أحداث التحجيم
    - مراعاة إدارة الاتصالات
  </div>
  </slot>
</Challenge>

</QuizUI>

واو، تلك المغامرة غاصت فيالتفاصيل! 🚀☁️  
آمل أن تكون قد استمتعت بالرحلة، وربما تعلمت شيئًا أو اثنين عن خدمات تخزين AWS.

تحقق من المزيد في [تحديات دان](../challenges/)! 🧠  

قانونيًا: هذا الاختبار للأغراض التعليمية فقط. جميع العلامات التجارية وحقوق النشر مملوكة لأصحابها المعنيين، خاصة الكبار.
````
