# Translation Candidate
- Slug: one-weird-trick-to-speed-up-feature-teams
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/ar/index.mdx
- Validation: deferred
- Runtime seconds: 7.15
- Input tokens: 6720
- Output tokens: 2473
- Thinking tokens: unknown
- Cached input tokens: 2816
- Cache write tokens: 0
- Estimated cost: $0.000707
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: حيلة غريبة لتسريع فرق الميزات!
subTitle: المهندسون الرئيسيون يكرهون ذلك!
date: '2024-09-29'
modified: '2024-09-30'
tags:
  - agile
  - teams
category: Engineering
social_image: ../desktop-social.webp
cover_full_width: ../wide_danny-howe-98KlbUsOO_w-unsplash.webp
cover_mobile: ../danny-howe-98KlbUsOO_w-unsplash__w200.webp
cover_icon: ../danny-howe-98KlbUsOO_w-unsplash__w200.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@dannyhowe?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Danny
  Howe</a> on <a
  href="https://unsplash.com/photos/red-and-white-neon-light-signage-98KlbUsOO_w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
---
{/* Add html5 toggle element */}

<details>
<summary>جدول المحتويات</summary>

- [التفكير بالمفاتيح](#thinking-in-keys)
  - [التصميم بالمفاتيح](#designing-with-keys)
  - [المفاتيح كرسوم بيانية وأشجار؟](#kvs-as-graphs--trees)
  - [متى نستخدم نمط المفاتيح KV](#when-to-use-kv-patterns)
  - [متى نتجنب نمط المفاتيح KV](#when-to-avoid-kv-patterns)
  - [متى تحتاج إلى أكثر من KV](#when-you-need-more-than-kv)
- [الخطوات التالية](#next-steps)
  - [خدمة الحقائق - مشروع مرجعي](#fact-service---reference-project)
- [الخاتمة](#conclusion)
  - [قراءات إضافية](#further-reading)

</details>

عند تصميم نظام أو ميزة جديدة، من السهل الانغماس في تفاصيل تصميم المخطط. في هذه المقالة سأشارككم خدعة بسيطة أثبتت فائدتها طوال مسيرتي المهنية.

<section class="breakout">
  _جرب_ أبسط وسيلة لتخزين البيانات عند تصميم نظام أو ميزة جديدة.
</section>

في كثير من الأحيان أرى الفرق تتجه إلى SQL أو MongoDB كخيار وحيد لتخزين البيانات. بالتأكيد لا أحد يُطرد لاختيار SQL. لكن ماذا لو أخبرتك أن هناك طريقة أبسط، أسرع، وأرخص للبدء؟

قد يكون مخزن القيم المفتاحية KV هو كل ما تحتاجه. شيء مثل Redis أو S3.

ليس دائمًا الاختيار الصحيح، لكن ربما **أكثر مما تتصور**.

طبقة تخزين بسيطة يمكن أن تسرّع التطوير *المبكر* إلى حد ما من خلال إعادة استخدام كود طبقة البيانات وتجنب التكاليف المرتبطة بتقلبات تصميم المخطط والهجرات. سيتسبب التقلب في حدوث تغييرات على أي حال؛ دع الكود يتعامل معها لأطول فترة ممكنة. من الأفضل تجنّب التعامل مع التغييرات في مكانين.

من المحتمل أن تكون مكاسب الأداء ملحوظة لأن عمليات البحث عن `key` مُحسّنة للغاية، ويمكن للكتابات الاستفادة من التحديثات المجمعة.

{/* Avoid KV patterns if you need JOINs or to query by properties in your dataset. Or in cases where you have an unbounded/infinitely growing datasets. (`Logs`, `Signups`, etc.) */}

## التفكير بالمفاتيح

قد يبدو غريبًا أن تبدأ التصميم بنمط المفتاح‑القيمة، خاصة إذا كنت معتادًا على تصميم الأنظمة باستخدام هياكل كائنات أو مخططات الكيانات والعلاقات وتطبيقها مباشرةً في SQL.

من المحتمل أنك ***استخدمت*** أنماط المفتاح‑القيمة من قبل! فهي موجودة في كل مكان، من ملفات الإعدادات وعناوين URL إلى تخزين الكائنات بنمط S3! كلما تعاملت مع بيانات عبر قيمة `ID` فريدة، تخيل ماذا؟ نمط مفتاح‑قيمة آخر! (مع أنه ليس بالضرورة مخزن KV.)

### التصميم بالمفاتيح

يمكن تمثيل كل البيانات تقريبًا باستخدام أنماط KV. (في الواقع، العديد من قواعد البيانات عالية المستوى تبني على أنماط KV منخفضة المستوى.) لنلقِ نظرة على بعض الأمثلة:

```markdown
user/123          {id: 123, ...}
user/123/block    ['user/456', 'user/789']
user/123/groups   ['admin', 'staff']
user/420/friends  ['user/456', 'user/789']

group/admin       {user: '*:rw'}
group/default     {user: '*:r'}

product/42/discount/<UUID>	{percentOff: '10%'}
product/42/discount/<UUID>	{percentOff: '20%', minTotal: 100.0}
```

ربما لاحظت أن الـ`ID` غالبًا ما يكون مفتاحًا بحد ذاته! هذا نمط شائع في مخازن KV. المفتاح عادةً ما يكون مركبًا من نوع الكيان والمعرف الفريد. (مثل `user/123`، `user:456`)

### هل يمكن اعتبار KV كرسوم بيانية وأشجار؟

من المفيد أحيانًا تمثيل هياكل بيانات معقدة مثل الرسوم البيانية أو الأشجار باستخدام أنماط KV. (مرة أخرى، عناوين URL في REST مثال ممتاز على ذلك.)

تسلسل الهرمية للمفاتيح (`user/420` → `user/420/friends`) يشفّر بطبيعة الحال علاقة رسمية بين الـ`user` و`friends` الخاصة به.

هذه طريقة سريعة ورخيصة لتسلسل هياكل البيانات الرسومية. خصوصًا إذا لم تكن بحاجة إلى تعقيد قاعدة بيانات رسومية مثل Neo4j.

<figure>
![Graph of user/123](.././KVsCanBeGraphs.webp)
<figcaption>رسم بياني للمستخدم/123</figcaption>
</figure>

### متى تستخدم أنماط KV

- عندما تحتاج إلى نطاق واسع هائل. (مليارات أو حتى تريليونات من أزواج KV.)
- عندما تصل إلى البيانات أساسًا عبر مفتاح فريد.
- عندما تحتاج إلى هياكل بيانات بسيطة.
- عندما تكون لديك بيانات ذات هيكل هرمي أو رسم بياني أو شجري.

### متى يجب تجنّب أنماط KV

لا تخزن أشياء مثل تعليقات المدونة في زوج KV _**واحد**_. على سبيل المثال، `post/666 -> {comments: [...too many...]}`. بدلاً من ذلك قد تستخدم `post/666/comments/1`، أو `post/666/comments/<UUID>`، إلخ. أو تلجأ إلى جدول SQL.

- عندما تحتاج إلى البحث في مجموعة البيانات حسب خصائص (ليس المفتاح أو المعرف).
- عندما تحتاج إلى ربط (JOIN) البيانات عبر كيانات متعددة.
- عندما تحتاج إلى فرض قيود أو علاقات معقدة.

### عندما تحتاج إلى أكثر من KV

مع تطور متطلبات المشروع طبيعيًا، قد تحتاج إلى القيام بأكثر مما يدعمه مخزن KV الخاص بك. في هذه المرحلة ستحتاج إلى النظر في الترحيل إلى مخزن بيانات أكثر تعقيدًا.

{/* الخبر السار هو أنه يمكنك غالبًا البدء بنمط KV وتطويره إلى نظام أكثر تعقيدًا حسب الحاجة. S3 يقدم ميزات تتجاوز التخزين البسيط، من Athena للبحث في الملفات، Glacier، وسياسات الانتهاء؛ هناك الكثير مما يمكنك فعله به. كذلك، أضاف Redis العديد من الميزات عالية المستوى (مثل Pub/Sub، الجغرافية المكانية، Streams، وSorted Sets) التي يمكن أن تساعدك على تلبية بعض المتطلبات. */}

الخبر السار هو أن ترحيل مخزن KV واحد إلى SQL أسهل نسبيًا من ترحيل مخطط SQL معقد إلى مخزن KV. (مع جداول متعددة، فهارس، قيود، إلخ.) لقد قمت بذلك مرات عديدة باستخدام سكريبت من 50 سطرًا.

تجريبيًا، لاحظت أن جودة تصاميم SQL تكون أعلى إذا بدأت بنمط KV أولًا. فهذا يجبرك على التفكير في البيانات بطريقة مختلفة، وفهم _بالضبط_ ما تحتاجه فعلاً من SQL.

## الخطوات التالية

أفضل طريقة للتعلم هي التجربة العملية! إذا كنت مهتمًا باستكشاف هذا النمط أكثر، أنصحك **ببناء الأشياء** باستخدام Redis أو DynamoDB أو S3.  
جميعها مخازن KV ممتازة مع مقايضات مختلفة.

### خدمة Fact - مشروع مرجعي

اطلع على مشروع المصدر المفتوح ["Fact Service"، مشروع مرجعي على GitHub](https://github.com/justsml/fact-service).

إنه واجهة برمجة تطبيقات RESTful مستقلة تُنفّذ خدمة بيانات KV.

يحتوي على العديد من [محولات البيانات](https://github.com/justsml/fact-service/tree/main/lib/providers).  
بما في ذلك PostgreSQL وRedis وDynamoDB وFirestore وCassandra! (مع [أوامر Docker](https://github.com/justsml/fact-service/tree/main/lib/providers) لتبدأ بسرعة.)

خدمة Fact مُصممة لتكون مشروعًا تمهيديًا وتعليميًا؛ قم بعمل fork لها وابنِ خدمة بيانات KV الخاصة بك!

## الخلاصة

آمل أن يكون هذا المقال قد أفادك! إذا كان لديك أي أسئلة أو ملاحظات، لا تتردد في التعليق أو الإشارة إليّ بـ `@` على [Twitter](https://x.com/justsml).

### الشكر

- [نمذجة بيانات الشجرة الهرمية في PostgreSQL](https://leonardqmarcq.com/posts/modeling-hierarchical-tree-data)
- [ما يجب فعله وما لا يجب فعله عند تخزين الأشجار الكبيرة في PostgreSQL](https://leonardqmarcq.com/posts/dos-and-donts-of-modeling-hierarchical-trees-in-postgres)

### قراءة إضافية

- [خدمة Fact](https://github.com/justsml/fact-service)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [S3](https://aws.amazon.com/s3/)
- [Cassandra](https://cassandra.apache.org/)
- [Firestore](https://firebase.google.com/docs/firestore)
````
