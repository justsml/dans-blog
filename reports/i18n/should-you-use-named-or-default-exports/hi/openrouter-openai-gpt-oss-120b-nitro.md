# Translation Candidate
- Slug: should-you-use-named-or-default-exports
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-18--should-you-use-named-or-default-exports/hi/index.mdx
- Validation: passed
- Runtime seconds: 1.91
- Input tokens: 4391
- Output tokens: 1746
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000486
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'ESM निर्यात: नामित बनाम डिफ़ॉल्ट?'
subTitle: 'नाम रखें,या न रखें?'
date: '2023-08-10'
modified: '2024-08-01'
tags:
  - typescript
  - javascript
  - modules
category: Guides
subCategory: JavaScript
cover: ../austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_mobile: ../w300_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_icon: ../icon_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
---
## क्या आपको JavaScript में `named` या `default` एक्सपोर्ट्स का उपयोग करना चाहिए?

इस विषय पर बहुत सारे तीखे लेख मौजूद हैं।

बहुतेर लोग `default export` को “भयानक” मानते हैं। अन्य लोग मानते हैं कि `default` को प्राथमिकता मिलनी चाहिए (जैसे AirBnb स्टाइल गाइड)।

वे अक्सर **पूरी तरह अस्थायी** चीज़ों को दोष देते हैं: IDE ऑटो‑इम्पोर्ट बग, किसी विशेष बंडलर की ट्री‑शेकिंग क्षमता, या इम्पोर्ट का नाम रखने पर टाइपो की संभावना।

क्या हमने शुरू में ही `export` करने का मकसद ही भूल गए हैं?

**कोड एक संचार है। ✨**

> हम `import` करने वालों को यह संकेत भेज रहे हैं कि _किस तरह से किसी चीज़ का उपयोग करें_।

### तो, हम क्या कह रहे हैं?

व्यापक रूप से देखें तो, आधुनिक जावास्क्रिप्ट में चीज़ें एक्सपोर्ट करने के दो तरीके हैं:

- एक `export default` दृढ़ता से घोषणा करता है “यह **_सबसे महत्वपूर्ण एक चीज़_** है।” साथ ही, “सभी नामित एक्सपोर्ट केवल सहायक भूमिका निभाते हैं।”  
- एक `named export` कहता है “यह **_एक चीज़_** है!” और साथ ही कुछ सवाल उठाता है, “क्या वहाँ और भी दोस्त हैं?” आगे पूछता है, “क्या उन्हें आमंत्रित किया गया है या वे अनिवार्य हैं?”

बिल्कुल, आप दोनों को मिलाकर उपयोग कर सकते हैं, या अपने कोडबेस के विभिन्न हिस्सों के लिए अलग‑अलग दृष्टिकोण अपना सकते हैं। [लेख के अंत में और उदाहरण देखें।](#summary)

### कमजोर तर्क, दोस्त?

चलोउन सामान्य “अस्थायी समस्याओं” पर नज़र डालते हैं जिनका सामना लोग अक्सर करते हैं।

- तर्क #1: नेम्ड एक्सपोर्ट्स नाम की स्थिरता सुनिश्चित करते हैं। [source](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - नहीं, ऐसा नहीं है। शायद आपको एक लिंट नियम चाहिए?
  - (मैं आपको यह बताने से नहीं बच सकता, लेकिन तब तक इंतज़ार करें जब तक आप सीख नहीं लेते कि वेरिएबल्स क्या कर सकते हैं!)

```tsx
// आप दोनों का उपयोग करके उपनाम दे सकते हैं!
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- तर्क #2: `import * as soManyKnives from './kinves.js'` का उपयोग करके नेम्ड एक्सपोर्ट्स को मिलाएँ। (लिंक नहीं, लेखक ने वापस ले लिया।)
  - बढ़िया फीचर। मुद्दा यही नहीं।
  - अब बताइए, मैं आपका उपकरण फिर से कैसे पकड़ूँ? कोई लेखक इरादा नहीं दिख रहा।

- तर्क #3: नेम्ड एक्सपोर्ट्स में IDE इम्पोर्ट या रीनेमिंग सपोर्ट बेहतर है। [source](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

- गलत (और भी)। अपने टूल्स को कॉन्फ़िगर/अपडेट करें।
  - सपोर्ट 3+ साल से [VS Code](https://github.com/microsoft/vscode/pull/94480), IntelliJ आदि में मौजूद है।
  - फिर भी, `default exports` के साथ कुछ “बेस्ट प्रैक्टिसेज़” हैं जो बेहतर IDE और रीफ़ैक्टर अनुभव देती हैं।
  - ✅ `export default function UserService() {}` – हमेशा नेम्ड फ़ंक्शन को प्राथमिकता दें।
  - ❌ `export default function() { }` – अनाम फ़ंक्शन फ़ाइलनाम से स्वचालित रूप से बंधे नहीं होते। अगर आप इसे नाम नहीं देते, तो कंप्यूटर को बदलने के लिए कहना मुश्किल हो जाता है।
  - **नोट:** ऐतिहासिक कारणों से आप `export default` को `const` अभिव्यक्ति के साथ नहीं मिला सकते।

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ Not Supported ❌ ^
    // Cannot export default const ....
    // ==========================

    // हालांकि, एक बार घोषित होने के बाद आप एक const वैरिएबल को डिफ़ॉल्ट के रूप में एक्सपोर्ट कर सकते हैं।
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ Valid

    // पूर्णता के लिए:
    export default class anyoneStillUseThese {}
    // ^ ✅ Also valid to export a class as default
    ```

<section className="scroll-x">
## सारांश

वास्तव में कई संयोजन हैं जिनसे हम चीज़ों को एक्सपोर्ट कर सकते हैं, प्रत्येक अलग कहानी बताता है:

| Default (Exports) | Named (Exports) | Private Fns | Pattern                                                   | Meaning                                                       |
| ----------------- | --------------- | ----------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| ✅                | ❌              | ❌          | एक डिफ़ॉल्ट एक्सपोर्ट।                                     | “एक फ़ंक्शन के साथ एकल उद्देश्य प्रस्तुत कर रहे हैं!”          |
| ❌                | ✅              | ❌          | एक नेम्ड एक्सपोर्ट।                                       | “कृपया मेरा नाम बदलें नहीं।”                                   |
| ✅                | ✅              | ✅          | डिफ़ॉल्ट एक्सपोर्ट + कई ‘प्राइवेट’ अनएक्सपोर्टेड फ़ंक्शन | “यहाँ कुछ संबंधित लॉजिक है। साथ ही, क्लास‑जैसा व्यवहार भी अपेक्षित है।” |
| ❌                | ❌              | ✅          | कई नेम्ड एक्सपोर्ट्स, सामान्य फ़ाइलनाम।                  | “ढीले तौर पर संबंधित चीज़ों का एक बकस, कोई पदानुक्रम नहीं।” |
| ✅                | ✅              | ❌          | एकल नेम्ड एक्सपोर्ट भी डिफ़ॉल्ट के रूप में एक्सपोर्ट किया गया। | “आप मुझे इम्पोर्ट करने में गलती नहीं कर सकते।”                |
</section>

**सोचने के लिए बात:** जब फ़ाइलनाम किसी एक्सपोर्ट से मेल खाता है या नहीं, तो हम क्या कह रहे हैं? (उदाहरण के तौर पर, कई फ़ंक्शन वाले `utils.js`.)

### निष्कर्ष

अगर कोड संचार है, तो कृपया `export` को पूरी ताकत से करें। 💞
````
