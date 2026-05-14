# Translation Candidate
- Slug: protect-your-tokens
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-27--protect-your-tokens/ar/index.mdx
- Validation: deferred
- Runtime seconds: 6.89
- Input tokens: 4963
- Output tokens: 2131
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000577
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: حماية الرموز ومفاتيح API والأسرار
subTitle: عام؟ خاص؟ ماذا؟
date: '2018-10-27'
modified: '2024-07-30'
tags:
  - tokens
  - api-keys
  - secrets
  - security
  - nodejs
  - json-web-tokens
category: Guides
subCategory: security
cover: ../dayne-topkin-78982-unsplash.webp
cover_mobile: ../w300_dayne-topkin-78982-unsplash.webp
cover_icon: ../icon_dayne-topkin-78982-unsplash.webp
---
## متى يجب حماية الرموز الخاصة بك؟

<!--  For the purpose of this article we'll treat the following terms as related: . **They are not interchangable** despite most documentation and [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key) answers using them as such. -->

<!-- (Google Maps Credentials, AWS S3 Keys, Geocoding Service, etc.)  -->

> تأمين مفاتيح API والرموز **مهم للغاية**!

خطأ واحد يمكن أن يؤدي إلى فقدان السيطرة على الخادم والبيانات أمام القراصنة!

لا ينبغي أن يكون من الصعب تحديد ما إذا كان أي رمز معين يجب إخفاؤه - حتى استنادًا إلى الوثائق الرسمية!

غالبًا ما يزداد الأمر تعقيدًا بسبب خليط المصطلحات المرتبطة التي ستصادفها: _tokens_، _keys_، _credentials_، _secrets_، _private_، و _public_.

لنُعيد صياغة ذلك إلى `سرّي` و `غير سرّي`.

* 🔒 [`Secret keys`](#-secret-keys) يجب أن تُحفظ مخفية. عمومًا لا ينبغي أن تغادر خادمك الخاص (أو الخدمة - مثل heroku، netlify أو travis-ci) أبدًا.
* 🌍 [`Non-secret keys`](#-non-secret-keys) تصف سلاسل يمكن مشاركتها بحرية وإدراجها في طلبات المتصفح.

## 🔒 `Secret keys`

**‼️ مهم:** يجب تجاهل `Secret keys` من قبل Git _و_ إزالتها من جميع كود المتصفح. [_كيف تستخدم dotenv_](#-how-to-handle-secrets-safely)

<br />

_كيف تعرف متى تتعامل مع `Secret key`؟_

<br />

**👍 قاعدة تقريبية:** الخوادم التي تُعيد `CORS errors` تفتقر إلى دعم المتصفح. هذا يشير بقوة إلى أنك **MUST** توجّه الخدمة عبر وكيل، معاملةً إياها كأنها `secret`.

**👍 قاعدة تقريبية:** الخدمات المكلفة يجب (تقريبًا) دائمًا أن تُوجّه عبر وكيل أو تُخفى.

**👍 قاعدة تقريبية:** إذا قمت بعملية كتابة (**رفع ملف، إدراج صف في قاعدة البيانات**)، قد تكون تتعامل مع `secret keys`.

<br />

**_حالات الاستخدام والميزات:_** `Secret` keys

- التفويض طويل الأمد (بيانات الاعتماد، رموز الوصول، JSON Web Tokens)
- التفويض قصير الأمد (OAuth tokens، مخزن الجلسات)
- الوصول إلى الخدمات المدفوعة/المكلفة (للتوثيق، الجيولوجيا، تخزين الملفات، إلخ)
- الجزء الخاص من زوج عام/خاص (RECAPTCHA، Stripe، Auth0)
- بيانات اعتماد الخدمة (Email/SMTP، LDAP/Directory Services)
- تشفير البيانات والتحقق من سلامتها

### قائمة التحقق: التعامل الآمن مع الأسرار

#### نظرة سريعة

أكمل الخطوات التالية **لإزالة الأسرار من الشيفرة الخاصة بك:**

- [ ] استبدل المفاتيح المضمنة صراحةً بمتغيّرات بيئية. مثال: `process.env.API_SECRET`
- [ ] استخدم مكتبة مثل [`dotenv`](https://github.com/motdotla/dotenv#dotenv) مع ملف `.env`. أضف الأسرار التي كنت تكتبها صراحةً إلى ملف `.env`.
- [ ] أضف سطر `.env` إلى ملف `.gitignore` الخاص بك!

> **DON'T** إنشاء ملف `.env` على الخوادم المنشورة. استخدم أداة إدارة المتغيّرات البيئية التي توفرها خدمات الاستضافة (مثل [Heroku](https://devcenter.heroku.com/articles/config-vars)، Netlify، AWS EC2): مثال **لوحة التحكم أو سطر الأوامر**.

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">مقال ذو صلة: <a href="../securely-using-environment-variables-in-nodejs/">استخدام dotenv بأمان في NodeJS</a></h2></blockquote>

-----------------------------------

## 🌍 `Non-secret keys`

**👍 قاعدة تقريبية:** كلما اضطر المفتاح أن يُرسل إلى المتصفح في الكود أو مضمّنًا (مثلاً عبر وسم `<script src="https://my-api/?apiKey=123-abc-456">`)، **فإنه بالتأكيد `non-secret`**. مثال شائع هو Google Maps.

<br />

**_حالات الاستخدام والميزات:_** مفاتيح `Non-secret`

- وصول قصير الأمد (معرفات جلسات المستخدم، JSON Web Tokens)
- تقييد وصول API حسب التطبيق/المطور (للمصادقة، الجيوكودينغ، إلخ)
- الجزء العام من زوج عام/خاص (RECAPTCHA، Stripe، Auth0)
- معرفات التحليل

#### ✅ معالجة الـ Non-secrets:

> **من الآمن كتابة مفاتيح الـ non-secret (العامة) مباشرةً في الكود!**

اجعل الصيانة على المدى الطويل أسهل باستخدام ملف `config.js` مشترك لتطبيقك.

**مثال:**

```js
// config.js
module.exports = {
  googleMapsKey: '123-abc'
};
```

```js
// load-map.js
const config = require('./config.js');
const key = config.googleMapsKey;
const src = `//maps.googleapis.com/maps/api/js?key=${key}`;
// ...
```

-----------------------------------

**ملاحظة:** هناك حالات استخدام أخرى للمتغيرات البيئية. بعض ما لم أتناوله: CI/CD/الاختبار، أعلام الميزات، وتكوين وقت التشغيل لبيئات خاصة!
````
