# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 7.82
- Input tokens: 6356
- Output tokens: 1893
- Thinking tokens: unknown
- Cached input tokens: 1920
- Cache write tokens: 0
- Estimated cost: $0.000589
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-08-29--handling-international-numbers-and-currency/hi/index.mdx reports/i18n/handling-international-numbers-and-currency/hi
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: अंतर्राष्ट्रीय संख्याएँ और मुद्रा को समझना
subTitle: स्थानीय मुद्रा समझाया गया!
draft: false
date: '2024-08-28'
modified: '2024-09-03'
tags:
  - engineering
  - internationalization
  - localization
  - currency
  - numbers
category: HowTo
subCategory: Internationalization
cover_full_width: ../currency-banner-wide.webp
cover_mobile: ../currency-banner-pic__w200.webp
cover_icon: ../currency-banner-pic__w200.webp
---
- [पैसे: स्थानीयकरण (L10n) और अंतर्राष्ट्रीयकरण (i18n)](#money-localization-l10n-and-internationalization-i18n)
- [मुख्य अवधारणाएँ](#critical-concepts)
  - [संख्याएँ स्थानीय हैं 🏘️](#numbers-are-local-️)
  - [मुद्रा वैश्विक है 🌎](#currency-is-global-️)
  - [जब स्थानीयकरण मायने रखता है](#when-locale-matters)
- [एक समाधान](#a-solution)
- [आगे के कदम](#next-steps)

## पैसे: स्थानीयकरण (L10n) और अंतर्राष्ट्रीयकरण (i18n)

ये सिर्फ स्क्रैबल खेल को जीतने के लिए नहीं हैं, *स्थानीयकरण* और *अंतर्राष्ट्रीयकरण* उस प्रक्रिया को कहते हैं जिससे एक उत्पाद **किसी अलग देश में घर जैसा महसूस हो**।

<p class="breakout quote">गलत स्थानीय फ़ॉर्मेट में मुद्रा दिखाना स्पष्ट संकेत है: आपने कोई प्रयास नहीं किया।<br/>अगर आप कीमत को फ़ॉर्मेट नहीं कर सकते, तो शिपिंग को कैसे संभालेंगे?</p>

अंतर्राष्ट्रीयकरण एक बड़ा विषय है, जिसमें टेक्स्ट अनुवाद से लेकर तिथि फ़ॉर्मेटिंग तक सब कुछ शामिल है। इस पोस्ट में हम एक विशेष उपविषय पर ध्यान देंगे, **संख्याओं और मुद्रा का फ़ॉर्मेटिंग**।

आइए 3 यूरोज़ोन देशों, USA और भारत के बीच फ़ॉर्मेटिंग की तुलना करें:

- `€1,234,567.89` Ireland 🇮🇪  
- `1.234.567,89 €` Germany 🇩🇪  
- `1 234 567,89 €` France 🇫🇷  
- `$1,234,567.89` USA 🇺🇸  
- `₹12,34,567.89` India 🇮🇳  

अराजकता! है ना? यहाँ प्रतीक, स्पेस और विराम चिह्न सब जगह बिखरे हुए हैं! यह देखना दिलचस्प है कि EU में कोई भी चीज़ पर सहमति बनाना कितना कठिन है! 😅  

## Critical Concepts  

समाधानों में कूदने से पहले, “Numbers are Local” से हमारा क्या मतलब है?  

### Numbers are Local 🏘️  

हर लोकेल ([Country per ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)) संख्या को फ़ॉर्मेट करने के नियम निर्धारित करता है।

संख्या फ़ॉर्मेटिंग नियमों में शामिल हैं:

- दशमलव: कॉमा, बिंदु।
- हजारों विभाजक: कॉमा, बिंदु, स्पेस।
- मुद्रा प्रतीक की स्थिति और स्पेसिंग।

### Currency is Global 🌎

`currency` एक विशिष्ट धन इकाई को दर्शाता है। (सूची के लिए देखें [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one))।)

- एक प्रतीक निर्दिष्ट करता है: `$`, `€`, `£`, `¥`। (अक्सर पुनः उपयोग किया जाता है।)
- हमेशा एक 3‑अक्षरीय कोड होता है: `USD`, `EUR`, `GBP`, `JPY`।
- सिद्धांत रूप में इसे “किसी भी” देश में उपयोग/विनिमय किया जा सकता है।
- मुद्राओं के बीच रूपांतरण के लिए विनिमय दर डेटा की आवश्यकता होती है।
- मूल्य locale के आधार पर नहीं बदलता।

### When Locale Matters

अधिकांश e‑commerce/भुगतान REST API में `price` + `currencyCode` ही उपयोग किया जाता है। लोकेल क्यों नहीं?

लोकेल आम तौर पर OS/डिवाइस स्तर पर सेट होते हैं, और ब्राउज़र इसे `navigator.language` के माध्यम से उपलब्ध कराते हैं। चूँकि आपके प्रत्येक उपयोगकर्ता की लोकेल अलग‑अलग हो सकती है, इसलिए संख्याओं और मुद्रा को क्लाइंट‑साइड पर फ़ॉर्मेट करना ही समझदारी है।

## एक समाधान

ठीक है, अच्छी खबर! आधुनिक प्रोग्रामिंग भाषाओं में इसके लिए बिल्ट‑इन सपोर्ट है। JavaScript में हमारे पास [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) क्लास और `Intl.NumberFormat` है!

आइए कुछ कोड देखें:

```javascript
const number = 1_234_567.89;

/**
 * स्थानीय मुद्रा में संख्या को फ़ॉर्मेट करें।
 * @param {number} amount - फ़ॉर्मेट करने वाली राशि।
 * @param {string} currency - 3‑अक्षरीय मुद्रा कोड।
 * @param {string} [locale] - उपयोगकर्ता की लोकेल स्ट्रिंग।
 */
const formatMoney = (amount, currency, locale = navigator.language) =>
  new Intl.NumberFormat(locale, { currency, style: 'currency' })
    .format(amount);

console.log('🇩🇪 ' + formatMoney(number, 'EUR', 'de-DE'));
console.log('🇮🇪 ' + formatMoney(number, 'EUR', 'ga-IE'));
console.log('🇫🇷 ' + formatMoney(number, 'EUR', 'fr-FR'));
```

यदि आपको टैक्स की गणना, डिस्काउंट लागू करना, या मुद्राओं के बीच रूपांतरण जैसी अधिक जटिल चीज़ें करनी हों, तो आपको [dinero.js](https://v2.dinerojs.com/) जैसी लाइब्रेरी का उपयोग करना चाहिए।

## अगले कदम

आपकी विशिष्ट आवश्यकताओं के आधार पर, आप संबंधित अवधारणाओं को देखना चाहेंगे:

- उपयोगकर्ता लोकेल के साथ सर्वोत्तम प्रथाएँ। पहचानें + ओवरराइड की अनुमति दें (जैसे — एक देश ड्रॉप‑डाउन)।
- पूर्णांक को स्थायी रूप से संग्रहीत करें (डॉलर नहीं, सेंट संग्रहीत करें)।
- मनी गणित (जैसे — `20% off` कूपन लागू करना, `subTotal + taxes` की गणना आदि)।
- रीयल‑टाइम विनिमय दरें (रिटेल खरीद के लिए, फॉरेक्स/मुद्रा एक्सचेंज)।

<p class="breakout quote">इन विषयों पर भविष्य में लेख चाहिए तो बताइए!</p>

{/* ## सिफ़ारिशें

इन कार्यों में मदद करने के लिए कुछ लाइब्रेरीज़ उपलब्ध हैं: */}

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) पैसा गणित, विनिमय दरें, फ़ॉर्मेटिंग और पार्सिंग को सपोर्ट करता है!

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) मेरा पसंदीदा Rust लाइब्रेरी है।

**Go**

- [currency](https://github.com/bojanz/currency) मेरा वर्तमान Golang विकल्प है।
````
