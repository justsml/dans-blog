# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 13.19
- Input tokens: 5327
- Output tokens: 5575
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001764
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/hi/index.mdx reports/i18n/async-stack-traces-why-error-stack-lies-in-production/hi
## Raw Output

````mdx
---
title: 'असिंक्रोनस स्टैक ट्रेस: क्यों `Error.stack` आपको'
subTitle: ''
date: '2025-12-29'
modified: '2025-12-30'
tags:
  - javascript
  - async
  - debugging
  - node.js
  - v8
  - performance
category: Code
subCategory: Best Practices
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
2 बजे है। पेजरड्यूटी अलार्म बज रहा है।  

आप लॉग खोलते हैं और यह देखते हैं:  

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```  

यहीं तक है। कोई फ़ंक्शन नाम नहीं। कोई लाइन नंबर नहीं। कोई फ़ाइल पथ नहीं। सिर्फ़ "processTicksAndRejections"।  

एसिंक्रोनस जावास्क्रिप्ट में आपका स्वागत है, जहां स्टैक ट्रेस बनाई गई होती हैं और लाइन नंबर महत्वहीन होते हैं।  

---  

## स्टैक ट्रेस क्यों टूट जाते हैं  
---

सिंक्रोनस कोड में, कॉल स्टैक एक सुंदर जीनोलॉजी होती है। A ने B को कॉल किया, B ने C को कॉल किया। जब C क्रैश हो जाता है, तो आपको पता होता है कि आपके पहुंचे का सही तरीका क्या था।

एसिंक्रोनस कोड (`async/await`) में, प्रत्येक `await` कीवर्ड एक निलंबन बिंदु होता है।

जब आप `await` करते हैं, तो आपका फ़ंक्शन स्टैक से अलग हो जाता है। इसे माइक्रोटास्क क्यू नामक एक क्रायोजेनिक फ्रीजर में डाल दिया जाता है। अब स्टैक खाली हो जाता है (या कुछ अन्य कार्य कर रहा होता है)।

जब प्रमिस हल हो जाता है, तो आपका फ़ंक्शन तैयार कर लिया जाता है और फिर से स्टैक पर डाल दिया जाता है। लेकिन इतिहास खो गया होता है।

इंजन को एक भी विचार नहीं होता कि 500 मिलीसेकंड पहले कौन `await` को कॉल कर रहा था। यह जानता है कि उसे एक टास्क चलाना है।

## V8 के इसके सुधार के प्रयास

Node.js आपकी मदद करने की कोशिश करता है। हमारे पास है:

1. `Error.captureStackTrace()`: स्टैक को *निर्माण के समय* पकड़ता है। यदि त्रुटि बाद में फेंकी जाती है तो अप्रभावी होता है।
2. `--async-stack-traces`: एक फ्लैग जो Node.js को प्रमिस चेन का "छाया स्टैक" बनाए रखने के लिए बनाता है।
    * लागत: आपके एप्लिकेशन को 30% धीमा कर देता है।
    * परिणाम: यह मदद करता है, लेकिन जल्दी से शोरगुल बन जाता है।

---

## वास्तविक समाधान: AsyncLocalStorage

यदि आप उत्पादन में जीवित रहना चाहते हैं, तो स्टैक ट्रेस देखना बंद कर दें। कार्यकारणता पर ध्यान दें।

हमें संदर्भ (यूजर ID, रिक्वेस्ट ID) को "थ्रेड" से जोड़ने की आवश्यकता है, यहां तक कि यह स्टैक और माइक्रोटास्क क्यू के बीच लंबकर भी हो।

Node.js में इसके लिए एक बिल्ट-इन उपकरण है: `AsyncLocalStorage`।

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. रिक्वेस्ट को लपेटें
context.run({ requestId: '123' }, () => {
  // 2. गहरी असिंक्रोनस कोड को कॉल करें
  await processOrder();
});

// 3. processOrder के अंदर:
async function processOrder() {
  await db.query();
  
  // जादू! हम अभी भी requestId देख सकते हैं
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Failed to process order`);
}
```

बीच में कितने भी `await` हों, वह अंतर्निहित रूप से महत्वहीन हैं। संदर्भ जीवित रहता है।

---

## उत्पादन खेल का नियम

1. `err.stack` पर भरोसा न करें। यह डिज़ाइन के अनुसार अपूर्ण है।
2. संरचित लॉगिंग का उपयोग करें। `AsyncLocalStorage` का उपयोग करके प्रत्येक लॉग लाइन में `requestId` जोड़ें।
3. ट्रेस करें, स्टैक न करें। OpenTelemetry का उपयोग करें। यह सेवाओं के माध्यम से कार्यकारण श्रृंखला का चित्रण करता है, जो वास्तव में आपकी चिंता का कारण है।

आपका कोड असिंक्रोनस है। आपकी डीबगिंग संदर्भ असिंक्रोनस नहीं होना चाहिए।
````
