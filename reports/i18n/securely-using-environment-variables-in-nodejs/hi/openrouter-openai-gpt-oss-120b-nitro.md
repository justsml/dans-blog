# Translation Candidate
- Slug: securely-using-environment-variables-in-nodejs
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 2.08
- Input tokens: 4955
- Output tokens: 1434
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000451
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/hi/index.mdx reports/i18n/securely-using-environment-variables-in-nodejs/hi
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: NodeJS में पर्यावरण वेरिएबल्स का उपयोग
subTitle: dotenv का उपयोग
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
## Secrets & API Tokens को सुरक्षित रूप से संभालना

### संबंधित लेख: [अपने टोकन की रक्षा करें](../protect-your-tokens/)

आइए जल्दी से `secret` और `non-secret` के बीच का अंतर याद करें।

* 🔒 `Secret keys` को 3rd‑party API सेवाओं के लिए अनुरोधों को छुपाने (प्रॉक्सी) हेतु एक कस्टम सर्वर (जैसे Node/Express/Heroku) का उपयोग करना अनिवार्य है।
* 🌍 `Non-secret keys` वे कुंजियाँ हैं जिन्हें ब्राउज़र तक भेजा जा सकता है।

> हम इस लेख में 🔒 `Secret keys` को **पर्यावरण वेरिएबल्स** के माध्यम से संभालने पर ध्यान देंगे।

[कोड उदाहरण नीचे शामिल हैं।](#️-code-example)

#### Overview

अपने NodeJS कोड में **सुरक्षित रूप से सीक्रेट्स तक पहुँचने** के लिए:

1. हार्ड‑कोडेड कुंजियों को पर्यावरण वेरिएबल्स से बदलें। उदाहरण : `process.env.API_SECRET`
1. एक लाइब्रेरी जैसे [`dotenv`](https://github.com/motdotla/dotenv) का उपयोग करें और `.env` फ़ाइल बनाएं। पहले हार्ड‑कोडेड सीक्रेट्स को इस `.env` फ़ाइल में डालें।
1. अपनी `.gitignore` फ़ाइल में `.env` लाइन मौजूद है, यह सुनिश्चित करें!

> **DON'T** डिप्लॉय किए गए सर्वरों पर `.env` फ़ाइल बनाएं। अपने होस्टिंग सेवा (जैसे [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2) द्वारा प्रदान किए गए पर्यावरण वेरिएबल प्रबंधन टूल का उपयोग करें: उदाहरण — **डैशबोर्ड या कमांड लाइन**.

### Code Example

हम कुछ फ़ाइलें परिभाषित करेंगे।

1. `.env`
1. `./db/connection.js`
1. `./api/users.js`

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

सबसे पहले, [`dotenv`](https://www.npmjs.com/package/dotenv) पैकेज को इंस्टॉल करें।

```bash
npm install dotenv
```

अगला, अपने प्रोजेक्ट की रूट में एक `.env` फ़ाइल बनाएँ।

```
# .env
PGDATABASE="postgres"
PGHOST="localhost"
PGPORT=5234
PGUSER="postgres"
PGPASSWORD="password"
```

❌ **कभी भी** `.env` फ़ाइल को कमिट न करें।

❌ सर्वरों पर `.env` बनाने से बचें।

पर्यावरण वेरिएबल सेट करने के लिए अपने होस्टिंग प्रोवाइडर के दस्तावेज़ देखें।

यह सुनिश्चित करने के लिए कि आपकी `.gitignore` में `.env` लाइन मौजूद है, नीचे दिया गया कमांड चलाएँ।

```bash
# Automatically update .gitignore
# Run in terminal:
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# note: no output will print
```

`./db/connection.js` एक साझा `pg.Pool` इंस्टेंस प्रदान करता है। इसे डेटाबेस क्वेरी करने के लिए उपयोग किया जाएगा।

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

`./api` फ़ोल्डर आपके टेबल/व्यूज़ के इंटरफ़ेस रखता है।

यहाँ `users` टेबल के लिए एक उदाहरण `./api/users.js` दिया गया है।

```js
// ./api/users.js
const db = require('../db/connection.js');

module.exports = {
  findUsername: function(username) {
    return db.query('SELECT * FROM users WHERE username=$1', username);
  }
};
```

-  अपने `.env` सीक्रेट्स को कभी भी git में कमिट न करें!
-  टीम में `.env` फ़ाइलें साझा न करें। *

\* हर नई डेवलपमेंट लैपटॉप या डेस्कटॉप **नए एक्सेस कीज़ और टोकन जेनरेट** करना चाहिए। यदि यह संभव नहीं है, तो अपने `.env` को साझा करते समय अत्यधिक सावधानी बरतें (जब कोई सेवा पुराने कीज़ को अमान्य कर देती है, या आपके पास सीमित एक्सेस टोकन वाला पेड API हो)।

#### ⚠️ महत्वपूर्ण: यदि आवश्यक हो, तो हमेशा एक सुरक्षित मैसेजिंग सेवा का उपयोग करें (ज्यादा से ज्यादा समाप्ति‑समय वाले संदेश समर्थन के साथ)।

शुभकामनाएँ और यदि कोई प्रश्न हों तो बताइए! 🎉
````
