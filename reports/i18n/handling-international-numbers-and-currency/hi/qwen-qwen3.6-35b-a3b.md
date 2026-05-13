# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: hi
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/hi/index.mdx
- Validation: deferred
- Runtime seconds: 124.46
- Input tokens: 6853
- Output tokens: 27067
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000000
- Pricing source: unknown
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: अंतर्राष्ट्रीय संख्याओं और मुद्राओं को समझना
subTitle: स्थानीय मुद्रा समझिए!
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
- [महत्वपूर्ण अवधारणाएँ](#critical-concepts)
  - [संख्याएँ स्थानीय हैं 🏘️](#numbers-are-local-️)
  - [मुद्रा वैश्विक है 🌎](#currency-is-global-️)
  - [जब स्थानीयकरण मायने रखता है](#when-locale-matters)
- [एक समाधान](#a-solution)
- [अगले कदम](#next-steps)

## पैसे: स्थानीयकरण (L10n) और अंतर्राष्ट्रीयकरण (i18n)

ये केवल स्क्रैबल जैसे खेल में हावी होने के लिए नहीं हैं; _स्थानीयकरण_ और _अंतर्राष्ट्रीयकरण_ उस प्रक्रिया को दर्शाते हैं जिसके द्वारा किसी उत्पाद को **दूसरे देश में घर जैसा अनुभव कराया जाता है।**

<p class="breakout quote">मुद्रा को गलत स्थानीय प्रारूप में दिखाना एक स्पष्ट संकेत है: आपने कोई प्रयास नहीं किया है।<br/>यदि आप कीमत को प्रारूपित नहीं कर सकते, तो शिपिंग कैसे संभालेंगे?</p>

अंतर्राष्ट्रीयकरण एक व्यापक विषय है, जिसमें पाठ अनुवाद से लेकर तिथि प्रारूपण तक सब कुछ शामिल है। इस लेख में हम एक विशिष्ट उप-विषय पर केंद्रित रहेंगे: **संख्याओं और मुद्रा का प्रारूपण।**

आइए यूरोज़ोन के तीन देशों, संयुक्त राज्य अमेरिका और भारत में प्रारूपण के अंतर को देखें:

- `€1,234,567.89` आयरलैंड 🇮🇪
- `1.234.567,89 €` जर्मनी 🇩🇪
- `1 234 567,89 €` फ्रांस 🇫🇷
- `$1,234,567.89` संयुक्त राज्य अमेरिका 🇺🇸
- `₹12,34,567.89` भारत 🇮🇳

अराजकता! है ना? प्रतीक, अंतराल और विराम चिह्न इधर-उधर बिखरे पड़े हैं! यह हैरानी की बात है कि यूरोपीय संघ कभी-कभी किसी बात पर सहमत भी हो पाता है! 😅

## महत्वपूर्ण अवधारणाएँ

समाधानों में उतरने से पहले, "संख्याएँ स्थानीय होती हैं" से हमारा क्या तात्पर्य है?

### संख्याएँ स्थानीय होती हैं 🏘️

प्रत्येक लोकल ([ISO 3166 मानक के अनुसार देश](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)) संख्याओं के प्रारूपण के लिए नियम परिभाषित करता है।

संख्या प्रारूपण नियमों में शामिल हैं:

- दशमलव चिह्न: अल्पविराम, बिंदु।
- हज़ारों के पृथकक: अल्पविराम, बिंदु, खाली जगह।
- मुद्रा प्रतीक की स्थिति और अंतराल।

### मुद्रा वैश्विक होती है 🌎

एक `currency` किसी विशिष्ट धन इकाई को संदर्भित करती है। (सूची के लिए [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)) देखें।)

- एक प्रतीक निर्धारित करती है: `$`, `€`, `£`, `¥`। (अक्सर पुनः उपयोग किया जाता है।)
- हमेशा एक 3-अक्षर का कोड होता है: `USD`, `EUR`, `GBP`, `JPY`।
- सिद्धांततः, इसे किसी भी "देश" में उपयोग/विनिमय किया जा सकता है।
- मुद्राओं के बीच रूपांतरण के लिए विनिमय दर डेटा की आवश्यकता होती है।
- इसका मान लोकल के आधार पर नहीं बदलता।

### जब लोकल मायने रखता है

अधिकांश ई-कॉमर्स/भुगतान REST APIs `price` + `currencyCode` पर काम करती हैं। लोकल्स (locales) का उपयोग क्यों नहीं किया जाता?

लोकल्स आमतौर पर OS/डिवाइस स्तर पर सेट होते हैं, और ब्राउज़र उन्हें `navigator.language` के माध्यम से उपलब्ध कराते हैं। चूंकि आपके प्रत्येक उपयोगकर्ता का लोकल अलग हो सकता है, इसलिए संख्याओं और मुद्रा को क्लाइंट-साइड पर फॉर्मेट करना ही व्यावहारिक है।

## समाधान

अच्छी खबर है। आधुनिक प्रोग्रामिंग भाषाओं में इसके लिए बिल्ट-इन सपोर्ट मौजूद है। JavaScript में [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) क्लास और `Intl.NumberFormat` उपलब्ध हैं!

आइए कोड देखते हैं:

```javascript
const number = 1_234_567.89;

/**
 * Format a number in local currency.
 * @param {number} amount - The amount to format.
 * @param {string} currency - The 3-letter currency code.
 * @param {string} [locale] - The users locale string.
 */
const formatMoney = (amount, currency, locale = navigator.language) =>
  new Intl.NumberFormat(locale, { currency, style: 'currency' })
    .format(amount);

console.log('🇩🇪 ' + formatMoney(number, 'EUR', 'de-DE'));
console.log('🇮🇪 ' + formatMoney(number, 'EUR', 'ga-IE'));
console.log('🇫🇷 ' + formatMoney(number, 'EUR', 'fr-FR'));
```

यदि आपको कर की गणना, छूट लागू करना, या मुद्रा रूपांतरण जैसे उन्नत ऑपरेशन करने हैं, तो [dinero.js](https://v2.dinerojs.com/) जैसी लाइब्रेरी का उपयोग करना बेहतर रहेगा।

## अगले चरण

आपकी विशिष्ट आवश्यकताओं के आधार पर, आप निम्नलिखित संबंधित विषयों पर विस्तार से पढ़ सकते हैं:

- उपयोगकर्ता लोकेल (locale) के लिए बेस्ट प्रैक्टिस। डिटेक्शन और ओवरराइड की सुविधा। (जैसे देश का ड्रॉपडाउन।)
- पूर्ण पूर्णांक (whole integers) के रूप में डेटा स्टोर करना (डॉलर के बजाय सेंट्स में स्टोर करें।)
- मुद्रा गणना (Money math)। (उदाहरण: `20% off` कूपन लागू करना, `subTotal + taxes` की गणना करना आदि।)
- लाइव एक्सचेंज रेट्स। (खुदरा खरीदारी, विदेशी मुद्रा/मुद्रा विनिमय के लिए।)

<p class="breakout quote">यदि आप इन विषयों पर भविष्य में कोई आर्टिकल देखना चाहेंगे, तो बताएं!</p>

{/* ## सिफारिशें

कुछ लाइब्रेरी इन कार्यों में मदद कर सकती हैं:

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) मुद्रा गणना, विनिमय दर, प्रारूपण और पार्सिंग का समर्थन करता है!

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) मेरी पसंदीदा Rust लाइब्रेरी है।

**Go**

- [currency](https://github.com/bojanz/currency) मेरी वर्तमान Golang पसंद है।
 */}
````
