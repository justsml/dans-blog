# Translation Candidate
- Slug: love-computer-languages
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-12--love-computer-languages/ar/index.mdx
- Validation: deferred
- Runtime seconds: 7.96
- Input tokens: 6159
- Output tokens: 2558
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000701
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

#### أنا متأكد أن ملاحظاتي المتنوعة قد قُدمت من قبل، لكن إليكم قائمتي بأكثر اللغات إثارة للاهتمام:

### جافاسكريبت

حبي الحقيقي الوحيد، متعدد الاستخدامات بامتياز وواسع الانتشار – البطل الشامل والقوي بشكل مذهل!
إنه اللغة رقم 1 من حيث النشاط/الشعبية على GitHub.com لسنوات متتالية.

أكره أن أعترف بذلك، لكن لسنوات كنت أحتقر وأستهزئ بما هو الآن، **لغتي المفضلة**.

**ES6** زاد فقط من ~~~إدماني~~~ حبي. بينما سيظل ES5 النقي يحتل مكانة خاصة في قلبي، في كل مرة أستخدم فيها بعض **ES6** أشعر كأن لدغة عنكبوت مشع...

كان هناك أربعة عوامل دفعتني إلى **معسكر ES6**:

1.  إنه ممتع. بجد. هناك مكاسب ملموسة في الجمال، الوضوح والإنتاجية.

- ادعاءات ذاتية، تقول؟ دعني أريك بعضًا من ES6:
- `let expired = users.filter(u => Date.now() > u.trialDate)`
- الآن لا تحتاج إلى التظاهر بأنك تعرف كيفية استخدام `Object.create` أو `Object.defineProperty`
- انظر الأمثلة أدناه

1.  اعتبارًا من يوليو 2015، أصبح ES6 معيارًا نهائيًا رسميًا الآن!  
1.  الدعم فعليًا 100٪\*! … حسناً، تحتاج BabelJS لتصحيح شفرتك لتصبح متوافقة مع ES5. تاريخيًا كان يُنظر إلى محولات JS باحتقار. لكن في الفترة الأخيرة (2014‑15) تغير الأمر حيث أصبح BabelJS محركًا رئيسيًا لتقدم اللغة. تستخدمه شركات كثيرة بما فيها Microsoft و Facebook على بعض أكبر المواقع.  
1.  [أحدث إصدارات Node](https://nodejs.org/en/blog/release/v4.0.0/) تتضمن نفس محرك V8 المستخدم في Chrome v45، وهو الإصدار v4.5  

#### أمثلة

> سأريكم ما الذي جعلني أخيرًا أبدأ في شرب “KoolAid” بنكهة ES6.

في تجربتي الأخيرة، يساعدك ES6 على كتابة الكود أسرع. إلى الحد المطلوب.  
نظرًا لأن الكود أصبح أكثر اختصارًا، تحتاج طاقة دماغية أقل بكثير لتصفية وفهم الكود القديم (أو كود زملائك).

أرى بانتظام توفيرًا في عدد الأسطر يراوح بين 20‑50٪. هذا كأنك تقصّ كيت موس!

**_الصورة المفقودة:_ EcmaScript 5 vs ES 2016 - Demo: Classes, Destructuring, Slick**  
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

- لا مزيد من الكود الممل لـ “استخراج” و “فحص” الحقول التي تُمرَّر إلى دالة. انتقل إلى مثال `add()`:

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  add({ name, email, password }) {
    // خزن تجزئة كلمة المرور، نحتاج فقط لتعريف متغير واحد صريح `var/let` – المتغيرات الأخرى “مُعرَّفة” بسحر `{fields}` أعلاه ^^^
    let hash = getSha256(password);
    return http
      .post("/users", {
        name: name,
        email: email,
        passwordHash: hash
      })
      .then(usr => this.users.push(usr)); // أضف المستخدم عند استجابة الخدمة
  }
}
```  

<Gist path='justsml/aaddc9852c1624d61cf3'></Gist>  

<p>&#160;</p>  

#### القفز إلى ES6 قد يشعر كأنه الانتقال من:

<div class="anigif top">
  <img alt='huh' title="Huh?" src="https://res.cloudinary.com/ddd/image/upload/v1441143891/wtf__tumblr_inline_n7ygqh6Y0C1svcdm1_igeqey.gif" />
</div>
<h3>إلى</h3>
<div class="anigif">
  <img alt='wtf' title="WTF?!?!" src="https://res.cloudinary.com/ddd/image/upload/v1443133148/cat-wtf-trap.gif" />
</div>
<h3>إلى</h3>
<div class="anigif end">
  <img alt='#winning' title='#winning' src="https://res.cloudinary.com/ddd/image/upload/v1443133141/full-throttle.gif" />
</div>

استمر في استكشاف الأشياء الجديدة. ألقِ نظرة على قوالب السلاسل، ربط `this` تلقائيًا، وراثة أكثر منطقية...

##### [Node.JS](http://nodejs.org/)

### Rust

##### [الموقع الرسمي](http://www.rust-lang.org/)

- **الإيجابيات**

- تخيّل لغة سريعة كـ C وقوية كـ Python/C++، لكن دون التعقيدات/المخاطر التي تُوقع حتى أكثر المطورين خبرة.
  - في الواقع أظن أن Rust معقد تقريبًا مثل مواصفات ES6.
  - تحتوي على الكثير من الإضافات:
    1.  أساسًا Rust يترجم من بنية شبه ديناميكية إلى **كود C نقي**!
    1.  بما يشمل \***\*كل أفضل الممارسات\*\*** في C التي قد تُخطئ فيها، وأنا ~~في النهاية~~ دائمًا ما أفعل.
    - تلقائيًا تحصل على:
    - إدارة ذاكرة تلقائية (لا حاجة لجمع نفايات بطيء!)
    - ملكية/قفل كائنات محددة بدقة (تقليل الـ mutex وتبديل السياق)
    - أعمار الكائنات (مُنفذة تلقائيًا\*، ومُرمّزة كأنك تعرف كل الحالات الطرفية)
    - منع تقريبًا كل أخطاء وقت التشغيل (حقًا، مسارات الكود تصبح صريحة: لا يمكنك تجاهل مسار كود)
  - وأيضًا يضيف قابلية توسيع حقيقية للغة عبر ميزة 'macro' المعقولة.
    - تحتاج إلى Comprehensions؟ [نمط Scala؟ تم](https://gist.github.com/hanny24/5749688)، و[مثل Python؟ تم](https://gist.github.com/JeffBelgum/5e762761cd63c796e803).
    1.  يبدو جيدًا لدرجة لا تصدق؟ لا، الأمر يتحسن:
    - مؤشرات الحدّ الحاد (إحصائيات github.com) تُظهر أن Rust تنافسي جدًا بل ويتفوق على Go (لغة جوجل الحديثة)
      - حوالي 4 آلاف نجمة أكثر من Go (حوالي 12,200 الآن)
      - مساهمون إجمالًا أكثر (2×! - 1,071 مقابل 479 لـ Go)
      - عدد الفروع (3×! - 2,343 مقابل 765)
      - عدد القضايا المفتوحة، يتخلف بفارق بسيط (2,000 مقابل 1,730 لـ Go)
      - طلبات السحب (Rust 70+ مقابل 1 لـ Go)
    - تأكدت من الأرقام ثلاث مرات.
  - المكتبات الأخرى مستقرة جدًا بفضل البُنى والقواعد في Rust.
  - نموذج الخيوط قابل للاستخدام من قبل المطورين العاديين

- **السلبيات**
  - أطر الويب **المقبولة** لا تزال حديثة نسبيًا، غير مُختبرة، وغالبًا غير موثقة (مع ذلك هي **تتحسن** بشكل ملحوظ – اعتبارًا من مارس 2015).
  - الكثير من التغييرات الجذرية قبل الإصدار 1.0

### Python

- **الإيجابيات**
  - مجموعة هائلة من الخوارزميات متوفرة بالفعل في Python (انظر: scilearnkit, numpy, matplotlib, pil/pillow, إلخ)
  - كتابة ممتعة جدًا! الـ Comprehensions والتحليل التفكيكي ميزات رائعة تجعل اللغات الأخرى تبدو مُبالغًا فيها!
  - المصفوفات، 'Sequences'، Tuples وغيرها بسيطة نسبيًا

```python
## dummy code: defines a color + pixel-coord -
def pixel(x, y, r, g, b): return dict(x=x, y=y, r=r, g=g, b=b)
## Create a new pixel object and apply to set of vars
x, y, r, g, b = pixel(10, 20, 255, 255, 255)
## Now we can call pixel
```

- **السلبيات**
  - من المزعج أن Python 2.x و 3.x غير متوافقين. لا يزال الانقسام العظيم مستمرًا، بعد سنوات عديدة.
  - بعض المكتبات الأساسية غير مفهومة بالضرورة من قبل بعض المطورين (numpy)

### Haskell

- **الإيجابيات**
  - مكافأة كبيرة عندما تحفظ ما يكفي من الصياغة لتستطيع إنشاء أنماط تعبيرية تعتمد على الـ comprehensions
  - ستتعلم أنماط كود تحير العقل — غالبًا ما تكون قابلة للتطبيق جزئيًا على لغات أخرى.
- **السلبيات**
  - الصياغة والأنماط قد تكون صعبة التعود عليها.

<div class="anigif end">
  <img alt='endless loop' src="https://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif" />
</div>

### SmallTalk-80

- **الإيجابيات**
  - مترجمات بسيطة للغاية (الأصلية خصوصًا)
  - موارد رائعة: [Smalltalk MVC Translated to JavaScript](http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript)
- **السلبيات**
  - من المحتمل ألا تستخدم هذه اللغة لأي شيء. لا مشاريع. ومع ذلك ستؤثر على أسلوبك في الترميز أسرع من اللغات الوظيفية الأخرى... يجب أن تكون هذه في قائمة الإيجابيات)

#### _قيد العمل (محدّث ديسمبر 2015)_
````
