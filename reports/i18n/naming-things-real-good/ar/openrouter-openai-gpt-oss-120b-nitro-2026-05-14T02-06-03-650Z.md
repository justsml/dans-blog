# Translation Candidate
- Slug: naming-things-real-good
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2016-06-01--naming-things-real-good/ar/index.mdx
- Validation: deferred
- Runtime seconds: 3.99
- Input tokens: 4009
- Output tokens: 1242
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000380
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: تسمية الأشياء بشكل جيد
subTitle: 'تسمية الأشياء: أساسيات البرمجة الكائنية'
date: '2016-06-01'
modified: '2024-08-10'
category: Guides
subCategory: programming
tags:
  - programming
  - patterns
  - naming
  - source-code
  - organization
cover: ../rawpixel-652639-unsplash.webp
cover_mobile: ../w300_rawpixel-652639-unsplash.webp
cover_icon: ../icon_rawpixel-652639-unsplash.webp
---
## تسمية الأشياء: أساسيات البرمجة الكائنية

دعنا ننظر إلى تصميم الكائن/الفئة من خلال مثال...

### الموقف

هل صممت يومًا **نموذج بيانات** (في الشيفرة، SQL، أو جداول إكسل)؟
هل يبدو ما يلي مألوفًا؟

```
*** anti-pattern - don't copy-paste ***
* User
  - id
  - avatarUrl
  - name
  - email
  - password

* Agent
  - id
  - primaryPhoto
  - name
  - email
  - agentEmail
  - agentPhoneMain
  - agentEmailPrimary
  - agentPhonePrimary
  - agentAddressFull
  - agentCompanyName
  - agentCompanyAddress
  - *userEmail* - 'Pointer' to User table ^^^
```

### أين الخطأ؟

حسنًا، تقنيًا لا يوجد خطأ، فقط بيانات تحتاج إلى إعادة تنظيم.

**هل يبدو ما يلي مألوفًا؟**

1. أي تعديل في تطبيقك سيتطلب ساعات من تصحيح الأخطاء الشاق.
1. أي متطلبات متغيرة ستؤدي إلى:

![schema refactor][../schema_refactor]

لماذا تسمية حقل `agentEmailPrimary` سيئة جدًا؟

للبدء، أنت **ليس** بصدد إنشاء شيء جديد كليًا في الكون. الإفراط في التحديد يحمل بعض الفخاخ:

1.  **الـ"قفل"** على اسم محدد للغاية يعني أن `agentEmailPrimary` سيجعل العروض (views) والكود المرتبط **0 % قابل لإعادة الاستخدام**، وسيظهر أخطاء متكررة ومزعجة مثل:

- عدم تزامن البيانات بين الجداول (ليس واضحًا ما إذا كان يجب أن ينتقل `user.email` إلى `agent.agentEmail` أو العكس – ولا نذكر تعقيد تنفيذ "المنطق" يدويًا...)
- قواعد/منطق التحقق من الصحة ربما تكون مكررة وغير متسقة.
- سيصبح مشروعك تدريجيًا مثل برج جينجا غير مستقر.
- تتراكم الهشاشة مع كل ملف جديد، حيث يتطلب حتى أصغر التغييرات انتباهًا فائقًا للتفاصيل.

2.  `agentEmailPrimary` قد يعني أشياء مختلفة. تجنّب الغموض باستخدام **أسماء أقصر**.

- احذر من الإطناب السخيف. `Primary`؟ يثير المزيد من الأسئلة: هل هناك `Secondary`؟ أم أنه للـ Primary Next‑of‑kin؟

كفى كلامًا يا دان، كيف يجب أن يبدو بدلاً من ذلك؟

### حل

```
// Consolidated Schema:

User
  - id
  - role: ['agent', 'lead', 'admin']
  - name
  - phone
  - address
  - email
  - password
  - company
    - name
    - address
```

قمت بإزالة جدول `Agent`، لأنه لم يحتوي على حقول فريدة للوكيل. وظهر كائن `User.company` (بـ `.name` و `.address`) بمجرد تنظيف الأسماء.

بعض المبادئ الإرشادية:

1.  احذف الجداول غير الضرورية. هل تحتاج حقًا إلى جدول `statuses`؟ بينما يمكنك إضافة حقل `status::VARCHAR(8)` إلى جدول `User`؟ لا بأس، استخدم البايتات الإضافية لكل صف.
2.  حاول دمج الجداول المرتبطة. **البيانات**
3.  احذف جمع البيانات المتكرر (مثلاً احذف جدول `ActivityLogs` إذا تم استبداله بحل تحليلي).
4.  احرص على أن تكون **جميع أسماء الحقول** **كلمة واحدة/اسم/ضمير**. لا بأس بالاعتماد على سياق الجدول. (مثال: `PersonalAccount.email` مقابل `BusinessAccount.email` – السياق يُستمد من اسم الجدول.)
5.  لا وجود لشيء مثل `Agent.agentEmail` أو `Agent.agentPhonePrimary`. نقطة. قولها معي: "إنه `email` و `phone`."
6.  باستخدام أسماء محددة للغاية، تحجز مستوى محدد من `code-reusability` و`durability`، وهو، بصراحة، **ZERO %**.
7.  أنت لا تقدم لنفسك أي فائدة بأشياء مثل `User.profileSummaryEmail`. 💞

**القراءات الموصى بها تشمل:**

1. [ربما التطبيع ليس طبيعياً](https://blog.codinghorror.com/maybe-normalizing-isnt-normal/)
1.  [المقايضات بين تطبيع قاعدة البيانات وإلغاء التطبيع](https://dev.to/er_dward/the-trade-offs-between-database-normalization-and-denormalization-4kdo)
2.  [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)
3.  [https://en.wikipedia.org/wiki/Database_normalization](https://en.wikipedia.org/wiki/Database_normalization)

[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif
````
