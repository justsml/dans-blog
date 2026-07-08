# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/hi/index.mdx
- Validation: deferred
- Runtime seconds: 1.54
- Input tokens: 3202
- Output tokens: 1039
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000312
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'असिंक्रोनस स्टैक ट्रेस: क्यों `Error.stack` आपको धोखा देता है'
subTitle: माइक्रोटास्क कतार ने मेरा होमवर्क (और मेरा डिबगिंग कॉन्टेक्स्ट) खा लिया।
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
It is 2 AM. The PagerDuty alarm is blaring.

You open the logs and see this:

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

That's it. No function name. No line number. No file path. Just "processTicksAndRejections".

Welcome to async JavaScript, where the stack traces are made up and the line numbers don't matter.

---

## स्टैक ट्रेस क्यों टूटते हैं

सिंक्रोनस कोड में, कॉल स्टैक एक सुंदर वंशावली है। A ने B को कॉल किया, B ने C को कॉल किया। जब C क्रैश होता है, तो आप ठीक‑ठीक देख सकते हैं कि आप वहाँ कैसे पहुँचे।

असिंक्रोनस कोड (`async/await`) में, हर `await` कीवर्ड एक निलंबन बिंदु होता है।

जब आप `await` करते हैं, आपका फ़ंक्शन स्टैक से हट जाता है। इसे माइक्रोटास्क क्यू नामक एक क्रायोजेनिक फ्रीज़र में रख दिया जाता है। स्टैक अब खाली (या कुछ और कर रहा) हो जाता है।

जब प्रॉमिस रिज़ॉल्व हो जाता है, आपका फ़ंक्शन फिर से थॉन्ड आउट होकर स्टैक पर वापस धकेला जाता है। लेकिन इतिहास गायब हो चुका होता है।

इंजन को नहीं पता होता कि 500 मिलीसेकंड पहले `await` किसने किया था। उसे सिर्फ़ पता होता है कि चलाने के लिए एक टास्क है।

---

## V8 की इसे ठीक करने की कोशिशें

Node.js मदद करने की कोशिश करता है। हमारे पास हैं:

1.  `Error.captureStackTrace()`: स्टैक को *बनाने के समय* कैप्चर करता है। अगर बाद में एरर थ्रो किया जाए तो बेकार।
2.  `--async-stack-traces`: एक फ़्लैग जो Node.js को प्रॉमिस चेन की “शैडो स्टैक” रखने को कहता है।
    *   लागत: यह आपके ऐप को लगभग 30 % धीमा कर देता है।
    *   परिणाम: यह मदद करता है, लेकिन जल्दी ही शोर पैदा करता है।

---

## वास्तविक समाधान: AsyncLocalStorage

अगर आप प्रोडक्शन में टिके रहना चाहते हैं, तो स्टैक ट्रेस देखना बंद करें। कारण‑परकता (causality) देखें।

हमें “थ्रेड” — एक्ज़ीक्यूशन के प्रवाह — में संदर्भ (उपयोगकर्ता ID, अनुरोध ID) को जोड़ना होगा, भले ही वह स्टैक और माइक्रोटास्क क्यू के बीच कूदता रहे।

Node.js में इसके लिए एक बिल्ट‑इन टूल है: `AsyncLocalStorage`।

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. Wrap the request
context.run({ requestId: '123' }, () => {
  // 2. Call deep async code
  await processOrder();
});

// 3. Deep inside processOrder:
async function processOrder() {
  await db.query();
  
  // Magic! We can still see the requestId
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Failed to process order`);
}
```

बीच में कितने भी `await` हों, इसका असर नहीं पड़ता। संदर्भ जीवित रहता है।

## प्रोडक्शन प्लेबुक

1.  `err.stack` पर भरोसा करना बंद करें। यह डिज़ाइन हीन अधूरा है।  
2.  स्ट्रक्चर्ड लॉगिंग अपनाएँ। `AsyncLocalStorage` के ज़रिए हर लॉग लाइन में `requestId` जोड़ें।  
3.  स्टैक नहीं, ट्रेस का उपयोग करें। OpenTelemetry का उपयोग करें। यह सेवाओं के बीच कारणात्मक श्रृंखला को विज़ुअलाइज़ करता है, जो वास्तव में आपकी ज़रूरत है।

आपका कोड असिंक्रोनस है। आपका डिबगिंग संदर्भ भी ऐसा ही होना चाहिए।
````
