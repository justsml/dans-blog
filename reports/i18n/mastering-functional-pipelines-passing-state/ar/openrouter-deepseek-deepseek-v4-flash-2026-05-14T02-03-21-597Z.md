# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: ar
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/ar/index.mdx
- Validation: deferred
- Runtime seconds: 49.28
- Input tokens: 7308
- Output tokens: 8860
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.003293
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'خبير خطوط الأنابيب: تمرير الحالة'
subTitle: أهلاً بالإغلاق، صديقي القديم.
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
## سيد خطوط الأنابيب: تمرير الحالة

هل واجهت تحديات في تمرير الحالة باستخدام خطوط الأنابيب الوظيفية؟

تنظيم الكود (أو عدمه) يؤثر بشكل مباشر على سهولة تمرير الحالة.

في هذه المقالة، سنستكشف تقنية فعالة لتمرير الحالة عبر خط أنابيب. وعلى طول الطريق، سنحسن تنظيم الكود وقراءته.

المقتطف "الحقيقي" التالي سيكون محور هذه المقالة: دالة `checkout`، التي تقبل `userId` ومصفوفة من `products`. تُرجع سلسلة Promise تنفذ 4 دوال بالتسلسل.

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

مهلاً لحظة، هذا الكود في الواقع جيد جدًا، بقدر ما يتعلق الأمر بخطوط الأنابيب في JS!

لكنه يعاني من بعض المشكلات الدقيقة التي قد تتحد لتشكل مشكلات أكبر.

إحدى المشكلات هي أننا نمرر `userId` مرارًا وتكرارًا لكل دالة (مرتبطة منطقيًا).

والآن اجمع ذلك مع مشكلة أخرى يسهل تفويتها من قبل المطورين و TypeScript أيضًا: قلب الوسائط الرقمية يخلق بسهولة خطأ صامتًا. (انظر `applyTaxes` و `purchaseProducts`. _هل كان `userId` أم `amount` هو الذي يأتي أولاً؟_)

قبل أن نقرر كيفية تحسين هذا الكود، دعنا نحدد بعض الإيجابيات/السلبيات.

### الإيجابيات والسلبيات

#### الإيجابيات

- استخدام جيد للإغلاق! تمرير `userId` و `products` مرة واحدة!
- تسمية متسقة للوسائط.
- تركيب فعال وموجز نسبيًا لأربع دوال رئيسية لعملية الدفع.
- التحكم في تدفق الأخطاء "مجانًا". (تتصاعد الأخطاء من أي دوال متداخلة، مما يؤدي إلى رفض الـ Promise الذي تعيده `checkout()`.)

#### السلبيات

- تمرير `userId` مرارًا وتكرارًا أمر ممل.
- الدوال ليست أحادية المعامل (أي unary). _هذا يؤثر على قابلية التركيب. انظر [المثال النهائي](#checkout-with-further-improvements) لمعرفة السبب؟_
- قد لا يكون واضحًا ما تعيده كل دالة. (هل هي نتيجة إرسال البريد الإلكتروني، أم المتغير `result`؟ أم ماذا؟)
- ليس واضحًا كيفية إضافة وظائف (مثلًا، لنفترض أننا بحاجة لتحميل خصم/رصيد/نقاط العميل إلخ.)
- أحيانًا تضيف أسماء المعاملات "المؤقتة" (مثل في كل `.then(param => {})`) سياقًا. لكن مع مرور الوقت، من المحتمل أن تصبح موطنًا للترميز غير النظيف.

### الحل، الجزء 1: إنشاء وحدة!

تتعلق هذه التقنية بتنظيم الدوال ذات الصلة في وحدة واحدة (مثل `CartHelpers`). لا تتطلب نمطًا محددًا. استكشف [دوال المصنع](#carthelpers-factory)، [الفئات](#carthelpers-class)، الإغلاقات، Mixins، إلخ. ابحث عن ما يناسب مشروعك وفريقك.

#### CartHelpers مصنع

مثال لوحدة `CartHelpers`، حيث يتم تمرير `userId` مرة واحدة، وجميع الدوال أحادية المعامل.

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

#### CartHelpers فئة

إذا كانت الفئات هي ما تفضله، فمن السهل تكييفها:

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

بعض الفوائد المباشرة:

- التخلص من تمرير المتغيرات المتكررة.
  - مبدأ DRY: `CartHelpers` يُجرّد الوسيط المتكرر `userId`.
  - كل دالة تقبل **_فقط_** الوسائط الضرورية. مما يجعل قراءة `cart.applyTaxes(subTotal)` غير مفاجئة تمامًا.
- الدوال ذات الوسيط الواحد في `CartHelpers` أكثر قابلية للقراءة، وهدفها أوضح.

من خلال تجميع الدوال ذات الصلة، نخلق فرصة لتقليل المساحة السطحية المكشوفة (مثل دوال `checkout()` و `CartHelpers` العامة).

> مساحة سطحية أقل === حمل معرفي أقل، واختبار وصيانة أفضل.
> _صمم الأنظمة بقصد وتركيز. ✨_

#### استخدام Checkout و CartHelpers

لنرى كيف تبدو دالة `checkout()` الآن:

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

> هل يمكن تحسينها أكثر؟ نعم! لا نحتاج إلى تكرار الوسائط على الإطلاق!

عندما يتم توفير وسائط دالة من مخرجات الدوال السابقة، يمكنك تبسيط الكود أكثر.

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 Functions stack like Lego & read like normal "Human Words!" 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**إذا شعرت أن دمج المعاملات في وسيط واحد (كائن) غير طبيعي،** فكر في تقسيم دوالك **أو** دمجها في وحدات ذات نطاق أكثر ملاءمة.

#### من أين نبدأ؟

ابحث عن الدوال ذات الصلة، واجمعها معًا. (مثل `CartHelpers`.)

جزء من التحدي عند إيجاد الوحدات المنطقية المحتملة هو تحديد الكود ذي الصلة في المقام الأول.

##### ما الذي يجعل الدوال ذات صلة؟

خدعة أنيقة: ابحث عن التكرار في معاملات الدوال. اسأل: هل هناك علاقة قائمة؟ أم مسؤولية كامنة؟

- ✅ دوال ذات وسائط متكررة ومشتركة. (مثلًا، إذا قبلت 4 دوال `userRewards`، فمن المحتمل أنك تحتاج إلى وحدة `Rewards` أو غيرها.)
- ✅ دوال تُزود وسائطها مباشرة من مخرجات دوال سابقة. (تسلسلات خطوات. مثل `Extract`، `Transform`، `Load`.)
- ❌ أي شيء مرتبط بشكل غامض بمجال الميزة، "شراء المنتج؟"
- ❌ دوال تحمل بادئة أو لاحقة تسمية مشتركة؟
- ❌ دوال تتطلب كائنات كبيرة كوسائط، رغم استخدامها لقيم قليلة فقط من داخل تلك الكائنات. (مثل `applyTaxes({ user, business, rewards, kitchenSink })` مقابل `applyTaxes({ subTotal })`)

بينما لا توجد "إجابة صحيحة" واحدة لتصميم الوحدات، من المفيد تحديد 2-3 خيارات للتنظيم - ارسم مخططًا، اكتب كودًا "تخيليًا"، واسأل "هل يثير البهجة؟"

<aside>
📌 غالبًا ما يتطلب الأمر عدة محاولات في تنظيم الوحدات قبل أن يتشكل نموذج المجال الخاص بك. لا تقلق بشأن الوصول إلى الكمال.
</aside>

> قد تشعر أن `cart.sendReceipt()` لا ينتمي إلى دوال الدفع. ربما `customerNotifications.sendReceipt()` هو مكان أفضل لرسائل العملاء. إذا كانت `CartHelper` ذات أهمية كافية، فقد تعمل كـ **_متحكم_** يستدعي داخليًا جميع **_الخدمات_** اللازمة، مثل `customerNotifications`.

#### كيف تعرف أنك تساعد؟

إذا لم تتأثر قابلية القراءة عند التخلص من الوسائط المؤقتة، **تهانينا!!!** فمن المحتمل أنك بنيت وحدة ذات نطاق واضح ومتين!

- إزالة الوسائط المتوسطة تجبر 'الطبقات' على الظهور.
- ينبغي أن يكون من الصعب إلقاء كود مؤقت في المكان الخطأ!

إذن، هذا يطرح السؤال: أين نضيف الوظائف؟

في تجربتي، هناك استراتيجيتان رئيسيتان لتقييم إضافة الوظائف:

1. تمديد/إعادة هيكلة الطريقة الحالية. (عندما يكون الكود الجديد قريبًا بدرجة كافية من الكود الحالي.)
2. إنشاء دالة جديدة (خامسة) في المكان المطلوب في السلسلة. (بافتراض أن الكود الجديد غير مرتبط بالدوال الحالية.)

في النهاية، هذا يسهل تحديد مكان الوظائف الجديدة. (مثل `cart.applyDiscounts()`، `cart.applyTaxes()`، `rewards.getBalance()`.)

### الخاتمة

قد يكون تمرير الحالة عبر خط أنابيب معقد أمرًا صعبًا. ومع ذلك، مع القليل من ممارسة إعادة الهيكلة، ستجد نفسك تكتب كودًا أكثر قابلية للقراءة، مع عبء معرفي أقل.

أسئلة؟ تعليقات؟ مخاوف؟ لا تتردد في التواصل [@justsml](https://x.com/justsml) أو [البريد الإلكتروني](mailto:dan@danlevy.net).

#### ترقبوا الجزء التالي من السلسلة

سوف نستكشف كيفية إخراج الحالة إلى الخارج، وتوسيع الوظائف في الوحدة الخاصة بنا!

#### قراءات ذات صلة

- [صراعات مماثلة موجودة في عالم React القائم على المكونات.](https://kyleshevlin.com/quit-your-yapping)
````
