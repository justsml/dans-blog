# Translation Candidate
- Slug: love-computer-languages
- Locale: ar
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-06-12--love-computer-languages/ar/index.mdx
- Validation: deferred
- Runtime seconds: 68.90
- Input tokens: 5980
- Output tokens: 8204
- Thinking tokens: unknown
- Cached input tokens: 1152
- Cache write tokens: 0
- Estimated cost: $0.002976
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: حب (لغات الحاسوب)
date: '2015-06-12'
modified: '2017-02-28'
category: Code
subCategory: languages
draft: true
hidden: true
publish: true
tags:
  - programming
  - languages
  - lua
  - haskell
  - scala
  - rust
  - smalltalk
  - go
  - javascript
  - python
cover: ../rawpixel-602144-unsplash.webp
cover_mobile: ../w300_rawpixel-602144-unsplash.webp
cover_icon: ../icon_rawpixel-602144-unsplash.webp
---
import Gist from '../../../../components/Gist/index.astro'

## ملاحظات حول لغات البرمجة

#### لست متأكدًا من أن ملاحظاتي المتنوعة قد طُرحت من قبل، لكن إليك قائمتي بأكثر اللغات إثارة للاهتمام:

### JavaScript

حبي الحقيقي الوحيد، متعدد الاستخدامات وموجود في كل مكان - البطل القوي المذهل متعدد المهارات!
إنها اللغة الأكثر نشاطًا وشعبية على GitHub.com لسنوات متتالية.

أكره الاعتراف بذلك، لكن لسنوات كنت أحمقًا وأبدي ازدراءً وسخريةً لما هو الآن **لغتي المفضلة**.

**ES6** زاد من ~~إدماني~~ حبي. بينما سيظل ES5 النقي في مكانة خاصة في قلبي، في كل مرة أستخدم فيها بعض **ES6**، أشعر بتلك اللدغة المشعة...

كانت هناك أربعة عوامل دفعتني إلى **معسكر ES6**:

1.  إنها ممتعة. بجدية. هناك مكاسب ملموسة في الجمال والوضوح والإنتاجية.

- ادعاءات ذاتية، تقول؟ دعني أريك القليل من ES6:
- `let expired = users.filter(u => Date.now() > u.trialDate)`
- الآن ليس عليك التظاهر بأنك تعرف كيفية استخدام `Object.create` أو `Object.defineProperty`
- انظر الأمثلة أدناه

1.  اعتبارًا من يوليو 2015، أصبحت ES6 معيارًا رسميًا منتهيًا الآن!
1.  الدعم فعال بنسبة 100%*! ... حسنًا، هناك حاجة إلى BabelJS لتعديل الكود الخاص بك ليكون متوافقًا مع ES5. تاريخيًا، كان يتم الاستهجان بالمترجمات JS. ومع ذلك، في الآونة الأخيرة (2014-2015) تغيرت الأمور حيث أصبح BabelJS مُمكّنًا/محركًا رئيسيًا لتقدم اللغة. تستخدمه العديد من الشركات بما في ذلك Microsoft وFacebook في بعض أكبر المواقع حول العالم.
1.  [أحدث إصدارات Node](https://nodejs.org/en/blog/release/v4.0.0/) تتضمن نفس محرك V8 JS الموجود في Chrome v45، وهو v4.5

#### أمثلة

> سأريكم ما جعلني أخيرًا _أبدأ_ في شرب ذلك الكوول إيد بنكهة ES6.

في تجربتي الأخيرة، تساعدك ES6 على كتابة الكود بشكل أسرع. مباشر إلى النقطة. لأن الكود أكثر إيجازًا، يلزم قدر أقل بشكل ملحوظ من الجهد العقلي لتصفح وفهم الكود القديم (أو كود زميل).

رأيت بانتظام توفيرًا في KLOC يتراوح تقريبًا بين 20-50%. هذا مثل قص كيت موس!

**_صورة مفقودة:_ EcmaScript 5 vs ES 2016 - عرض: الفئات، التفكيك، الانسيابية**
{/* ](../images/screenshots/Diff-ES6-vs-ES5-Head-to-Head.png) */}

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  expired() {
    return this.users.filter(u => Date.now() > u.trialDate);
  }
}
```

- لا مزيد من الكود الممل لـ 'استخراج' و 'فحص' الحقول الممررة إلى دالة. انتقل إلى مثال `add()`:

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  add({ name, email, password }) {
    // Store pwd hash, We only need to define 1 explicit `var/let` - the other vars are 'defined' with the `{fields}` wizardry above ^^^
    let hash = getSha256(password);
    return http
      .post("/users", {
        name: name,
        email: email,
        passwordHash: hash
      })
      .then(usr => this.users.push(usr)); // append user upon service response
  }
}
```

<Gist path='justsml/aaddc9852c1624d61cf3'></Gist>

<p>&#160;</p>

#### القفز على ES6 قد يبدو وكأنه الانتقال من:

<div class="anigif top">
  <img alt='هاه؟' title="هاه؟" src="https://res.cloudinary.com/ddd/image/upload/v1441143891/wtf__tumblr_inline_n7ygqh6Y0C1svcdm1_igeqey.gif" />
</div>
<h3>إلى</h3>
<div class="anigif">
  <img alt='ماذا؟' title="ماذا بحق الجحيم؟!؟!" src="https://res.cloudinary.com/ddd/image/upload/v1443133148/cat-wtf-trap.gif" />
</div>
<h3>إلى</h3>
<div class="anigif end">
  <img alt='#فوز' title='#فوز' src="https://res.cloudinary.com/ddd/image/upload/v1443133141/full-throttle.gif" />
</div>

استمر في غربلة الأشياء الجديدة. اطّلع على قوالب السلاسل النصية، الربط التلقائي لـ `this`، الوراثة الأكثر منطقية...

##### [Node.JS](http://nodejs.org/)

### Rust

##### [الموقع الرسمي](http://www.rust-lang.org/)

- **المزايا**

- تخيل لو كانت هناك لغة بنفس سرعة C وبنفس قوة Python/C++، ولكن دون التعقيدات/المزالق التي عادةً ما تقع فيها حتى أكثر المطورين مهارة.
  - في الواقع، أعتقد أن Rust معقدة تقريبًا بقدر مواصفات ES6.
  - تتضمن الكثير من الإضافات:
    1.  بشكل أساسي، Rust تُترجم من صياغة شبه ديناميكية إلى **كود C خالص**!
    1.  بما في ذلك **جميع أفضل الممارسات** في C التي من المحتمل أن تخطئ فيها، أنا ~~في النهاية~~ دائمًا ما أخطئ.
    - تحصل تلقائيًا على:
    - إدارة ذاكرة تلقائية (لا حاجة لمجمع قمامة بطيء!)
    - ملكية/قفل كائنات محددة النطاق بشكل مثالي (تقليل التبادل وتبديل السياق)
    - أعمار الكائنات (مطبقة تلقائيًا\*، ومشفرة تلقائيًا كما لو كنت تعرف كل حالة حافة)
    - تمنع تقريبًا جميع أخطاء وقت التشغيل (بجدية، مسارات الكود تصبح واضحة: لا يمكنك تجاهل مسار كود)
  - أوه نعم، تضيف قابلية تمدد حقيقية للغة مع ميزة 'ماكرو' معقولة.
    - هل تحتاج إلى Comprehensions؟ [نمط سكالا؟ تم](https://gist.github.com/hanny24/5749688)، و[مثل بايثون؟ تم](https://gist.github.com/JeffBelgum/5e762761cd63c796e803).
    1.  جميل جدًا لدرجة لا تصدق؟ لا، بل يصبح أفضل:
    - مؤشرات الحافة المتطورة (إحصائيات github.com) تكشف أن Rust تنافسية للغاية أو حتى تتفوق على Go (لغة Google الجديدة نسبيًا)
      - حوالي 4K نجوم أكثر من Go (حاليًا حوالي 12,200)
      - عدد مساهمين إجمالي أكبر (ضعف! - 1,071 مقابل 479 لـ Go)
      - عدد نسخ أكبر (3 أضعاف! - 2,343 مقابل 765)
      - عدد المشكلات المفتوحة، يخسر بفارق ضئيل (2,000 مقابل 1,730 لـ Go)
      - طلبات السحب (Rust 70+ مقابل 1 لـ Go)
    - كان عليّ التحقق من الأرقام ثلاث مرات أيضًا.
  - المكتبات الأخرى مستقرة جدًا بفضل بنى Rust وقواعدها.
  - نموذج خيوط قابل للاستخدام من قبل البشر العاديين

- **المساوئ**
  - **أطر الويب** اللائقة جديدة نسبيًا، غير مختبرة، وعادةً غير موثقة (على الرغم من أنها **تصبح** مثيرة للإعجاب - اعتبارًا من مارس 2015).
  - الكثير من التغييرات الجذرية المبكرة قبل الإصدار 1.0

### Python

- **المزايا**
  - مجموعة شاملة بشكل هائل من الخوارزميات مطبقة بالفعل في Python (انظر: scilearnkit, numpy, matplotlib, pil/pillow, إلخ.)
  - ممتعة جدًا في الكتابة! Comprehensions و Decomposition ميزات رائعة تجعل اللغات الأخرى تبدو منتفخة!
  - المصفوفات، 'التسلسلات'، الصفوف إلخ. بسيطة نسبيًا

```python
## كود وهمي: يحدد لونًا وإحداثيات بكسل -
def pixel(x, y, r, g, b): return dict(x=x, y=y, r=r, g=g, b=b)
## إنشاء كائن بكسل جديد وتطبيقه على مجموعة من المتغيرات
x, y, r, g, b = pixel(10, 20, 255, 255, 255)
## الآن يمكننا استدعاء pixel
```

- **العيوب**
  - بشكل مزعج، Python 2.x و 3.x غير متوافقين. الانشقاق الكبير لا يزال مستمرًا، بعد كل هذه السنوات.
  - بعض المكتبات الأساسية لا يفهمها بعض المطورين بالضرورة (مثل numpy)

### Haskell

- **المزايا**
  - مجزٍ جدًا عندما تحفظ أخيرًا ما يكفي من الصياغة لإنشاء أنماط تعبيرية قائمة على comprehensions
  - ستتعلم أنماطًا ذهنية مذهلة - غالبًا ما تكون قابلة للتطبيق إلى حد ما في لغات أخرى.
- **العيوب**
  - قد يكون من الصعب التعود على الصياغة والأنماط.

<div class="anigif end">
  <img alt='حلقة لا نهائية' src="https://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif" />
</div>

### SmallTalk-80

- **المزايا**
  - مترجمات بسيطة بشكل لا يصدق (خاصة الأصلية)
  - موارد رائعة: [Smalltalk MVC Translated to JavaScript](http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript)
- **العيوب**
  - من المحتمل ألا تستخدم هذه اللغة أبدًا لأي شيء. لا مشاريع. ومع ذلك، سيكون لها تأثير أكبر على أسلوبك في البرمجة، أسرع من اللغات الوظيفية الأخرى... كان يجب أن يكون هذا في قائمة المزايا)

#### _قيد التطوير (مُحدّث ديسمبر 2015)_
````
