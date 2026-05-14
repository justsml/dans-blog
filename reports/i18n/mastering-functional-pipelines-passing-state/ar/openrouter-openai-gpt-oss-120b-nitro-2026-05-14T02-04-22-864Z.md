# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/ar/index.mdx
- Validation: deferred
- Runtime seconds: 7.53
- Input tokens: 7625
- Output tokens: 2546
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.000756
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'خبير الأنابيب: تمرير الحالة'
subTitle: مرحبًا يا Closure، يا صديقي القديم.
date: '2023-08-09'
modified: '2024-07-30'
tags:
  - typescript
  - closure
  - stateful
  - scoping
  - hoisting
  - functional
  - pipeline
category: Guides
subCategory: JavaScript
cover: ../sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_mobile: ../w300_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_icon: ../icon_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
---
## سيد الأنابيب: تمرير الحالة

هل واجهت صعوبات في تمرير الحالة باستخدام الأنابيب الوظيفية؟

تنظيم (أو عدم تنظيم) الكود الخاص بك يؤثر مباشرة على سهولة تمرير الحالة بين الأجزاء.

في هذه المقالة سنستكشف تقنية فعّالة لتمرير الحالة عبر الأنابيب. وعلى طول الطريق سنحسن تنظيم الكود وقابليته للقراءة.

المقتطف "الواقعي" التالي سيكون محور تركيزنا في هذه المقالة: دالة إتمام الشراء، التي تقبل `userId` ومصفوفة من `products`. تُعيد سلسلة من الوعود (`Promise`) التي تنفّذ أربع دوال بالتتابع.

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

انتظر لحظة، هذا الكود في الواقع جيد إلى حد ما بالنسبة للأنابيب في جافاسكريبت!

لكن له بعض المشكلات الدقيقة التي قد تتجمع لتصبح مشاكل أكبر.

إحدى المشكلات هي أننا نعيد تمرير `userId` مرارًا وتكرارًا إلى كل دالة (ذات صلة منطقية). الآن اجمع ذلك مع مشكلة أخرى يسهل أن يغفل عنها المطوّرون وTypeScript أيضًا: تبديل المعاملات الرقمية قد يخلق خطأ صامت. (انظر `applyTaxes` و `purchaseProducts`. _هل كان `userId` أم `amount` هو الأول؟_)

قبل أن نقرر كيف نحسّن هذا الكود، دعونا نحدد بعض الإيجابيات والسلبيات.

### الإيجابيات والسلبيات

#### الإيجابيات

- استخدام جيد للإغلاق! تمرير `userId` و `products` مرة واحدة فقط!
- تسمية معاملات متسقة.
- تركيبة فعّالة ومختصرة نسبيًا لأربع دوال رئيسية في عملية الدفع.
- تحكم “مجاني” في تدفق الأخطاء. (الأخطاء ترتفع من أي دالة متداخلة، وتُرفض على الـ Promise الذي تُعيده `checkout()`.)

#### العيوب

- تمرير `userId` مرارًا وتكرارًا أمر ممل.
- الدوال ليست ذات معامل واحد (أو أحادية). _هذا يؤثر على القابلية للتركيب. انظر [المثال النهائي](#checkout-with-further-improvements) لمعرفة السبب؟_
- قد يكون غير واضح ما الذي تُعيده كل دالة. (هل هي نتيجة إرسال البريد الإلكتروني، أم المتغيّر `result`؟ أم ماذا؟)
- غير واضح كيف يمكن إضافة وظائف (مثلاً إذا احتجنا لتحميل خصم/رصيد/نقاط العميل، إلخ).
- أحيانًا تُضيف أسماء المعاملات “المؤقتة” (كما في كل `.then(param => {})`) سياقًا. ومع مرور الوقت، من المحتمل أن تتحول إلى فوضى تسمية.

### الحل، الجزء الأول: إنشاء وحدة!

هذه التقنية تدور حول تنظيم الدوال ذات الصلة في وحدة واحدة (مثل `CartHelpers`). لا تفرض نمطًا محددًا. استكشف [دوال المصنع](#carthelpers-factory)، [الفئات](#carthelpers-class)، الإغلاقات، الخلطات، إلخ. ابحث عما يناسب مشروعك وفريقك.

#### مصنع CartHelpers

مثال على وحدة `CartHelpers`، حيث يُمرَّر `userId` مرة واحدة، وتكون جميع الطرق ذات معامل واحد.

```tsx
const CartHelpers = (userId: number) => {
  return {
    getProductsSubtotal: products => getProductsSubtotal(userId, products),
    applyTaxes: subTotal => applyTaxes(userId, subTotal),
    purchaseProducts: total => purchaseProducts(userId, total),
    sendReceipt: invoice => sendReceipt(userId, invoice)
  };
};
```

#### فئة CartHelpers

إذا كانت الفئات تفضيلك، فمن السهل تكييفها:

```tsx
class CartHelpers {
  constructor(userId) {
    this.userId = userId;
  }
  getProductsSubtotal = products => getProductsSubtotal(this.userId, products);
  applyTaxes = subTotal => applyTaxes(this.userId, subTotal);
  purchaseProducts = total => purchaseProducts(this.userId, total);
  sendReceipt = invoice => sendReceipt(this.userId, invoice);
}
```

بعض الفوائد الفورية:

- القضاء على تمرير المتغيّر المتكرر.
  - DRY: `CartHelpers` يزيل الحاجة لتكرار الوسيط `userId`.
  - كل طريقة تستقبل **فقط** الوسائط الضرورية. ما يجعل `cart.applyTaxes(subTotal)` سهل القراءة ولا يثير أي مفاجأة.
- الدوال ذات الوسيط الواحد داخل `CartHelpers` تكون أكثر وضوحًا، مع هدف واضح.

من خلال تجميع الدوال ذات الصلة، نخلق فرصة لتقليل السطح الظاهر (مثل `checkout()`، والطرق العامة في `CartHelpers`).

> مساحة سطح أصغر === عبء إدراكي أقل، واختبار وصيانة أفضل.  
> _صمم الأنظمة بنيةً وهدفًا. ✨_

#### استخدام Checkout و CartHelpers

لنرى كيف يبدو الآن دالة `checkout()`:

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  return Promise.resolve(products)
    .then(products => cart.getProductsSubtotal(products))
    .then(subTotal => cart.applyTaxes(subTotal))
    .then(total => cart.purchaseProducts(total))
    .then(result => cart.sendReceipt(result));
};
```

##### Checkout مع تحسينات إضافية

> هل يمكن تحسينه أكثر؟ نعم! لا نحتاج إلى تكرار الوسائط مطلقًا!

عندما تُعطى وسائط الدوال من ناتج الدوال السابقة، يمكنك تبسيط الشيفرة أكثر.

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 الدوال تتراكم كقطع ليغو وتُقرأ كـ "كلمات بشرية" عادية! 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**إذا شعرت أن دمج المعاملات في كائن واحد غير طبيعي،** فكر في تقسيم دوالك **أو** دمجها في وحدات ذات نطاق أكثر ملاءمة.

#### من أين تبدأ؟

ابحث عن الدوال المرتبطة، واجمعها معًا. (مثال: `CartHelpers`.)

جزء من التحدي عند البحث عن وحدات منطقية محتملة هو تحديد الكود المرتبط في المقام الأول.

##### ما الذي يجعل الدوال مرتبطة؟

حيلة بسيطة: ابحث عن التكرار في معلمات الدوال. اسأل نفسك هل هناك علاقة قائمة؟ أم مسؤولية أساسية؟

- ✅ دوال لديها معلمات مشتركة متكررة. (مثال: إذا كانت 4 طرق تقبل `userRewards`، فغالبًا ما تحتاج إلى وحدة `Rewards` أو وحدة أخرى.)
- ✅ دوال تُعطى معلماتها مباشرةً من ناتج الدوال السابقة. (سلاسل من الخطوات. مثال: `Extract`، `Transform`، `Load`.)
- ❌ أي شيء مرتبط بشكل غامض بمنطقة الميزة، “شراء المنتج”؟
- ❌ دوال تحمل بادئات أو لاحقات اسمية مشتركة؟
- ❌ دوال تتطلب كائنات كبيرة كمعلمات، رغم أنها تستخدم قيمًا قليلة فقط من داخل تلك الكائنات. (مثال: `applyTaxes({ user, business, rewards, kitchenSink })` مقابل `applyTaxes({ subTotal })`)

على الرغم من عدم وجود “إجابة صحيحة” واحدة لتصميم الوحدات، فإن تحديد 2‑3 خيارات للتنظيم يساعد — ارسم مخططًا، اكتب شفرة “خيالية”، اسأل “هل يثير هذا الفرح؟”

<aside>
📌 غالبًا ما تحتاج إلى عدة محاولات لتنظيم الوحدات قبل أن يتضح نموذج المجال الخاص بك. لا تُقَصِّر نفسك في السعي للكمال.
</aside>

> قد تشعر أن `cart.sendReceipt()` لا ينتمي إلى طرق الدفع. ربما يكون `customerNotifications.sendReceipt()` موطنًا أفضل لرسائل العملاء. إذا كان `CartHelper` ذو أهمية كافية، فقد يعمل كـ **_متحكم_** داخليًا يستدعي جميع **_الخدمات_** اللازمة، مثل `customerNotifications`.

#### كيف تعرف ما إذا كنت تُحدث تحسينًا؟

إذا لم تتأثر قابلية القراءة أثناء حذف الوسائط العشوائية، **مبروك!!!** من المحتمل أنك بنيت وحدة ذات نطاق واضح ودائم!

- إزالة الوسائط الوسيطة تميل إلى إجبار ظهور “طبقات”.
- يجب أن يكون من الصعب إلقاء الكود العشوائي في المكان الخطأ!

إذن، يطرح السؤال: أين نضيف الوظيفة؟

في تجربتي هناك استراتيجيتان رئيسيتان لتقييمهما عند إضافة وظيفة جديدة:

1.  توسيع/إعادة هيكلة الطريقة الحالية. (عندما يكون الكود الجديد قريبًا بما يكفي من الكود الموجود.)
2.  إنشاء دالة (خامسة) جديدة في الموضع المطلوب داخل السلسلة. (على افتراض أن الكود الجديد غير مرتبط بالوظائف الحالية.)

في النهاية، هذا يسهل اتخاذ قرار مكان وضع الوظيفة الجديدة. (مثال: `cart.applyDiscounts()`، `cart.applyTaxes()`، `rewards.getBalance()`.)

### الخلاصة

تمرير الحالة عبر خط أنابيب معقد قد يكون صعبًا. ومع ذلك، مع قليل من ممارسة إعادة الهيكلة، ستجد نفسك تكتب كودًا أكثر قابلية للقراءة، مع عبء إدراكي أقل.

أسئلة؟ تعليقات؟ مخاوف؟ لا تتردد في التواصل مع [@justsml](https://x.com/justsml) أو عبر [البريد الإلكتروني](mailto:dan@danlevy.net).

#### ترقب الجزء التالي في السلسلة

سنستكشف استخراج الحالة إلى الخارج، وتوسيع الوظائف في وحدتنا!

#### قراءة ذات صلة

- [توجد صعوبات مشابهة في عالم React القائم على المكوّنات.](https://kyleshevlin.com/quit-your-yapping)
````
