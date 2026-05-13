# Translation Candidate
- Slug: you-may-not-need-axios
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-11-15--you-may-not-need-axios/hi/index.mdx
- Validation: deferred
- Runtime seconds: 45.61
- Input tokens: 14219
- Output tokens: 12208
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.004067
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: Fetch API बचाव के लिए!
date: '2018-11-14'
modified: '2024-08-21'
tags:
  - programming
  - patterns
  - examples
  - nodejs
  - javascript
  - promises
  - axios
  - fetch
category: Guides
subCategory: fetch
cover: ../brock-dupont-575648-unsplash.webp
cover_mobile: ../w300_brock-dupont-575648-unsplash.webp
cover_icon: ../icon_brock-dupont-575648-unsplash.webp
---
import Gist from '../../../../../components/Gist/index.astro'

## आपको शायद Axios की आवश्यकता न हो

<p class="breakout call-to-action">यह **Axios पर हमला नहीं है** [Axios](https://www.npmjs.com/package/axios)। <br />

इसके बजाय, यह **`fetch` API के लिए वकालत है जो अब बहुत क्षमता वाला बन गया है।** 🦄</p>

### सारांश

यह लेख "लुप्त" `fetch` कोड टुकड़े और सामान्य उपयोग के मामले का संग्रह है जो मुझे आसानी से पाने में असमर्थ रहे।

- [सारांश](#सारांश)  
- [सुविधा तुलना](#सुविधा-तुलना)  
- [फेच रेसिपी](#फेच-रेसिपी)  
  - [एक URL से JSON प्राप्त करें](#एक-url-से-json-प्राप्त-करें)  
  - [कस्टम हेडर](#कस्टम-हेडर)  
  - [HTTP त्रुटि हेंडलिंग](#http-त्रुटि-हेंडलिंग)  
  - [CORS उदाहरण](#cors-उदाहरण)  
  - [JSON पोस्ट करें](#json-पोस्ट-करें)  
  - [एक HTML `<form>` पोस्ट करें](#एक-html-फॉर्म-पोस्ट-करें)  
  - [फॉर्म एन्कोडेड डेटा](#फॉर्म-एन्कोडेड-डेटा)  
  - [एक फ़ाइल अपलोड करें](#एक-फ़ाइल-अपलोड-करें)  
  - [कई फ़ाइलों को अपलोड करें](#कई-फ़ाइलों-को-अपलोड-करें)  
  - [टाइमआउट](#टाइमआउट)  
  - [डाउनलोड प्रगति हेल्पर](#डाउनलोड-प्रगति-हेल्पर)  
  - [पुनरावृत्ति पुनर्प्रयास हेल्पर](#पुनरावृत्ति-पुनर्प्रयास-हेल्पर)  
  - [HTTP रीडायरेक्ट हैंडल करें](#http-रीडायरेक्ट-हैंडल-करें)  
  - [एक फेच अनुरोध रद्द करें](#एक-फेच-अनुरोध-रद्द-करें) ✨नया✨  
- [संगतता](#संगतता)  

> आपका उपयोग केस सूचीबद्ध नहीं है? [मुझे बताएं ✉️](../contact/)  

<br />  

### सुविधा तुलना  

|                                                 | fetch    | axios    | request |  
|-------------------------------------------------|:--------:|:--------:|:-------:|  
| अनुरोध और प्रतिक्रिया अवरुद्ध करें                  |✅        |✅         |✅       |  
| अनुरोध और प्रतिक्रिया डेटा परिवर्तित करें             |✅        |✅         |✅       |  
| अनुरोध रद्द करें                                 |✅        |✅         |❌       |  
| JSON डेटा के लिए स्वचालित परिवर्तन              |मैनुअल हेल्पर |✅         |✅       |  
| XSRF से बचाव के लिए क्लाइंट-साइड समर्थन |✅        |✅         |✅       |  
| प्रगति                                        |✅        |✅         |✅       |  
| स्ट्रीमिंग                                       |✅        |✅         |✅       |  
| रीडायरेक्ट                                       |✅        |✅         |✅       |  

<br /><br />

इस आर्टिकल के शुरूआती दिनों में (2018 के अंत में, 2024 में अपडेट किया गया) मैंने मान लिया था कि मैं अंत में मिश्रित चेकबॉक्स के साथ एक तालिका पर पहुंचूंगा। बेशक, यहां ऐसे विशेष _उपयोग के मामले_ होंगे जो [`axios`](https://www.npmjs.com/package/axios), [`request`](https://www.npmjs.com/package/request), [`r2`](https://www.npmjs.com/package/r2), [`superagent`](https://www.npmjs.com/package/superagent), [`got`](https://www.npmjs.com/package/got) आदि के उपयोग को उचित बनाते हैं।  

अच्छा खबर यह है कि **मैंने तीसरे पक्ष की एचटीटीपी लाइब्रेरियों की आवश्यकता का अतिरिक्त अनुमान लगाया है।**  

हालांकि `fetch` का उपयोग कई वर्षों से कर रहा हूं (शामिल हैं गैर-सामान्य कार्य: फाइल अपलोड और त्रुटि/पुनः प्रयास समर्थन) मैंने अभी भी `fetch` की क्षमताओं और सीमाओं के बारे में गलत धारणाएं रखी हुई हैं।  

मूल `fetch` ऑटोमैटिक रूप से जेएसओएन प्रतिक्रियाओं को पाचित नहीं करता है या जेएसओएन अनुरोध शरीर को स्ट्रिंगीफाई नहीं करता है। आप वापस आते समय `response.json()` पर कॉल करते हैं और बाहर जाते समय `JSON.stringify()` का उपयोग करते हैं। एक्सियोस अभी भी इस एर्गोनॉमिक्स के मामले में जीत जाता है; `fetch` का तर्क यह है कि एक छोटे से हेल्पर के साथ अक्सर इस अंतर को भरा जा सकता है।  

अच्छा, चलिए देखते हैं कि `fetch` क्या कर सकता है...  

## फेच रेसिपीज़

### एक यूआरएल से जेएसओएन प्राप्त करें  

<Gist path='justsml/de941bd61cc86e30beedbb8a3a646f81'></Gist>  

### कस्टम हेडर्स  

<Gist path='justsml/fca7cd72ec1ebc07d994eac13a665ddf' />  

### एचटीटीपी त्रुटि संभाल  

<Gist path='justsml/81919a72897ebc503c6b34a556a9bde2' />

### सीओआरएस उदाहरण  

सीओआरएस मुख्य रूप से सर्वर पर जाँचा जाता है - इसलिए यह सुनिश्चित करें कि आपका सर्वर-साइड निर्माण सही है।  

`credentials` विकल्प नियंत्रित करता है कि क्या आपके कुकीज़ स्वचालित रूप से शामिल होते हैं।  

<Gist path='justsml/3ddd9ed8705f48cdf45d313d1e57aa2a' />  

### जेएसओएन पोस्ट करना  

<Gist path='justsml/13915347d6c8413c73f4bd7240c68e51' />

### एक HTML `<form>` पोस्ट करना  

<Gist path='justsml/ef2e356bec0ef7c6e528d84a5f75ba7e' />  

### फॉर्म एन्कोडेड डेटा  

एक `application/x-www-form-urlencoded` के साथ Content-Type के साथ डेटा पोस्ट करने के लिए हम `URLSearchParams` का उपयोग करेंगे जैसे कि एक क्वेरी स्ट्रिंग को एन्कोड करेंगे।  

उदाहरण के लिए, `new URLSearchParams({a: 1, b: 2})` द्वारा `a=1&b=2` प्राप्त होता है।  

<Gist path='justsml/716c4534ef4afb22f65d4fc4367c7136' />

### एक फ़ाइल अपलोड करना  

<Gist path='justsml/301f22aa37df565ba3051bd5f95b4df1' />  

### कई फ़ाइलें अपलोड करना  

एक फ़ाइल अपलोड एलिमेंट को `multiple` एट्रिब्यूट के साथ सेट करें:  

<Gist path='justsml/37836357041d8ca4d1b32e12638cb0ba' />  

फिर कुछ ऐसा उपयोग करें:

### समय सीमा  

यहां एक सामान्य प्रमिस समय सीमा दी गई है, जो "भाग्यात्मक अनुप्रयोग" पैटर्न का उपयोग करती है। यह किसी भी प्रमिस इंटरफ़ेस के साथ काम करेगा। दिए गए प्रमिस श्रृंखला में बहुत काम न करें, यह चलता रहेगा - और कोई भी विफलताएं लंबे समय तक स्मृति रिसाव का कारण बन सकती हैं।  

<Gist path='justsml/f93b2ef6457b3e52eb995831b67cab85' />  

और एक अधिक जटिल उदाहरण, जिसमें ट्रैकिंग फ़्लैग `__timeout` शामिल है ताकि आप **किसी भी महंगे कार्य को अवरुद्ध कर सकें।**  

<Gist path='justsml/5e492db8997a4f7e22e61b7486cbf273' />

### डाउनलोड प्रगति सहायक  

अपलोड प्रगति अन्य ब्राउज़रों में चलती बग के कारण बराबर काम नहीं करती।  

"प्रगति हैंडलर" [नीचे दिखाई गई तकनीक](#source-progress-helper) `fetch` कॉल को क्लॉजर में लपेटने से बचती है। 👍  

`progressHelper` निम्नलिखित इंटरफ़ेस के साथ है (नीचे स्रोत उपलब्ध है)  

<Gist path='justsml/db5ccc55ffb93c75e04e014d1f553cfb' />  

एक उपयोग का उदाहरण देखें:

<Gist path='justsml/9bec219590ff50688972c1caff67c14b' />  

एक पुनः उपयोगी छवि डाउनलोडर `getBlob()` की तरह दिख सकता है:  

<Gist path='justsml/bef2dd7e630eb7642beb3e2be29489b2' />  

बता दें कि `Blob` एक बाइनरी बड़ा ऑब्जेक्ट (Binary Large Object) है।  

नीचे दिए गए 2 उपयोग पैटर्न में से एक का चयन करना महत्वपूर्ण है (वे कार्यात्मक रूप से समतुल्य हैं):  

<Gist path='justsml/6ad9e37a96ad1f3a75ca509038510a5b' />

मेरी पसंद `विकल्प #1` है। हालांकि, आपकी स्कोप डिज़ाइन आपको `विकल्प #2` का उपयोग करने के लिए मजबूर कर सकती है।  

अंत में, यहाँ इस नुस्खा का अंतिम भाग है, हमारा `progressHelper` है:  

##### स्रोत: प्रगति सहायक  

<Gist path='justsml/a8ffd810fc7e5a5295dfc898302ddbfc' />  

_क्रेडिट:_ एंथम क्रिस के लिए विशेष धन्यवाद और उनके [विस्मयकर Progress+Fetch PoC जो यहाँ दिखाया गया है](https://github.com/AnthumChris/fetch-progress-indicators)  

### पुनरावृत्ति पुनरपेक्षा सहायक

### HTTP रीडायरेक्ट का संचालन  

<Gist path='justsml/3dd0a799ada8da7cd15943ff254266de' />  

### एक fetch अनुरोध रद्द करना  

<Gist path='justsml/7f257ac3de3c7792db8485588c54e938' />  

### संगतता

2022 तक, `fetch` API [सभी आधुनिक ब्राउज़रों](https://caniuse.com/#feat=fetch) और नवीनतम NodeJS v18+ के अपडेट में व्यापक रूप से समर्थित है।  

अगर आपको IE का समर्थन करना है तो `github/fetch` पैकेज (GitHub के शानदार टीम द्वारा रखरखाव किया गया) के साथ [fetch को पॉलीफिल करें](https://github.com/github/fetch#browser-support)। आप [IE8](https://github.com/camsong/fetch-ie8) तक पहुंच सकते हैं - _आपके अनुभव भिन्न हो सकते हैं_।  

पुराने NodeJS संस्करणों में `fetch` API का लाभ लेने के लिए [`node-fetch`](https://www.npmjs.com/package/node-fetch) पैकेज का उपयोग करें:  

```sh
npm install node-fetch
```  

_पॉलीफिल+node-fetch के बाद: 99.99% संगत ✅_  

> अगर आपके पास अन्य _उपयोग केस_ हैं जिन्हें देखना चाहते हैं तो कृपया [मुझे ट्वीट करें](https://x.com/justsml)। ❤️
````
