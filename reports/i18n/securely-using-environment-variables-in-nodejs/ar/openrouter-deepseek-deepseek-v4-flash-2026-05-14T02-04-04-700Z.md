# Translation Candidate
- Slug: securely-using-environment-variables-in-nodejs
- Locale: ar
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/ar/index.mdx
- Validation: deferred
- Runtime seconds: 25.72
- Input tokens: 3659
- Output tokens: 3749
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001509
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: استخدام متغيرات البيئة في NodeJS
subTitle: استخدام `dotenv`
date: '2018-11-13'
modified: '2020-07-30'
tags:
  - dotenv
  - api-keys
  - secrets
  - tokens
  - security
  - nodejs
category: Code
subCategory: howto
cover: ../john-salvino-417565-unsplash.webp
cover_mobile: ../w300_john-salvino-417565-unsplash.webp
cover_icon: ../icon_john-salvino-417565-unsplash.webp
---
## التعامل الآمن مع الأسرار ورموز API

### مقال ذو صلة: [احمِ رموزك](../protect-your-tokens/)

دعنا نلخص بسرعة الفرق بين `السر` و`غير السر`.

* 🔒 `المفاتيح السرية` يجب أن تستخدم خادمًا مخصصًا (مثل Node/Express/Heroku) لإخفاء (توكيل) الطلبات إلى خدمات API تابعة لجهات خارجية.
* 🌍 `المفاتيح غير السرية` تصف المفاتيح التي يمكن إرسالها إلى المتصفح.

<br />

---------------------------------------------

> سنركز في هذه المقالة على التعامل مع 🔒 `المفاتيح السرية` باستخدام **متغيرات البيئة**.

[أمثلة الكود مرفقة أدناه.](#️-code-example)

#### نظرة عامة

لـ **الوصول الآمن إلى الأسرار في كود NodeJS الخاص بك:**

1. استبدل المفاتيح المكتوبة بشكل ثابت بمتغيرات البيئة. مثلًا: `process.env.API_SECRET`
2. استخدم مكتبة مثل [`dotenv`](https://github.com/motdotla/dotenv) مع ملف `.env`. أضف الأسرار التي كانت مكتوبة بشكل ثابت سابقًا إلى ملف `.env`.
3. تأكد من وجود سطر `.env` في ملف `.gitignore` الخاص بك!

> **لا** تنشئ ملف `.env` على الخوادم المنشورة. استخدم أداة إدارة متغيرات البيئة التي توفرها خدمة الاستضافة (مثل [Heroku](https://devcenter.heroku.com/articles/config-vars)، Netlify، AWS EC2): مثلًا **لوحة التحكم أو سطر الأوامر.**

### مثال كود

سنقوم بتعريف عدد من الملفات.

1. `.env`
2. `./db/connection.js`
3. `./api/users.js`

<!-- Example config object which uses `process.env.PG*`

```js
// ./db/config.js
module.exports = {
  postgres: {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5234,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'password',
    database: process.env.PGDATABASE || 'postgres',
  }
};
```

The `db/config.js` file is just an example of how your secrets should be stored for re-use in your code.
-->

أولًا، قم بتثبيت حزمة [`dotenv`](https://www.npmjs.com/package/dotenv).

```bash
npm install dotenv
```

بعد ذلك، أنشئ ملف `.env` في جذر مشروعك.

```
# .env
PGDATABASE="postgres"
PGHOST="localhost"
PGPORT=5234
PGUSER="postgres"
PGPASSWORD="password"
```

❌ **لا تقم أبدًا** بإيداع ملف `.env`.

❌ تجنب إنشاء ملف `.env` على الخوادم.

راجع وثائق مزود الاستضافة الخاص بك لإعداد _متغيرات البيئة_.

لتتأكد بسهولة من وجود سطر `.env` في ملف `.gitignore` الخاص بك.

```bash
# Automatically update .gitignore
# Run in terminal:
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# note: no output will print
```

يوفر الملف `./db/connection.js` نسخة مشتركة من `pg.Pool`. سيتم استخدامها للاستعلام عن قاعدة البيانات.

```js
// ./db/connection.js
require('dotenv').config(); // ✅ Load .env file
const pg = require('pg');
const {PGUSER, PGHOST, PGPORT} = process.env;

if (process.env.NODE_ENV === 'development')
  console.log(`Connecting to ${PGUSER} @ ${PGHOST}:${PGHOST}`);
// ^^ only for showing debug connection vars

// pg automatically uses PG* env variables
module.exports = new pg.Pool();
```

يحتوي المجلد `./api` على واجهات لجداولك/عروضك.

إليك مثال `./api/users.js` لجدول `users`.

```js
// ./api/users.js
const db = require('../db/connection.js');

module.exports = {
  findUsername: function(username) {
    return db.query('SELECT * FROM users WHERE username=$1', username);
  }
};
```

- لا تقم أبدًا بإيداع أسرار `.env` في git!
- لا تشارك ملفات `.env` مع الفريق. *

\* يجب على كل حاسوب محمول أو مكتبي جديد للتطوير **توليد مفاتيح وصول ورموز جديدة.**
إذا لم يكن ذلك ممكنًا، فكن حذرًا جدًا عند مشاركة ملف `.env` (في الحالات التي قد تلغي فيها الخدمة جميع المفاتيح القديمة، أو كان لديك رمز وصول محدود لواجهة برمجة تطبيقات مدفوعة.)

#### ⚠️ مهم: إذا لزم الأمر، استخدم دائمًا خدمة مراسلة آمنة (يفضل مع دعم الرسائل منتهية الصلاحية.)

حظًا موفقًا وأخبرني إذا كان لديك أي أسئلة! 🎉
````
