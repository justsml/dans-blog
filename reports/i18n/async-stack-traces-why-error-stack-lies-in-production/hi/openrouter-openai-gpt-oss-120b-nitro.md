# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 2.50
- Input tokens: 4753
- Output tokens: 1086
- Thinking tokens: unknown
- Cached input tokens: 2432
- Cache write tokens: 0
- Estimated cost: $0.000381
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/hi/index.mdx reports/i18n/async-stack-traces-why-error-stack-lies-in-production/hi
## Raw Output

````mdx
---
title: 'ऐसिंक्रोनस स्टैक ट्रेस: क्यों `Error.stack` आपको धोखा देता है'
subTitle: माइक्रोटास्क कतार ने मेरा होमवर्क (और डिबगिंग कॉन्टेक्स्ट) खा लिया।
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
यह 2 बजे रात है। PagerDuty अलार्म तेज़ी से बज रहा है।

आप लॉग खोलते हैं और यह देखते हैं:

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

बस इतना ही। कोई फ़ंक्शन नाम नहीं। कोई लाइन नंबर नहीं। कोई फ़ाइल पथ नहीं। सिर्फ "processTicksAndRejections"।

स्वागत है async JavaScript में, जहाँ स्टैक ट्रेस बनावटी होते हैं और लाइन नंबर का कोई मतलब नहीं रहता।

---

## क्यों स्टैक ट्रेस टूटते हैं
---

सिंक्रोनस कोड में, कॉल स्टैक एक सुंदर वंशावली की तरह होता है। फ़ंक्शन A ने B को कॉल किया, B ने C को कॉल किया। जब C क्रैश करता है, तो आप बिल्कुल देख सकते हैं कि आप वहाँ कैसे पहुँचे।

असिंक्रोनस कोड (`async/await`) में, हर `await` कीवर्ड एक निलंबन बिंदु होता है।

जब आप `await` करते हैं, आपका फ़ंक्शन स्टैक से अलग हो जाता है। इसे माइक्रोटास्क क्यू नामक एक क्रायोजेनिक फ्रीज़र में रख दिया जाता है। स्टैक अब खाली (या कुछ और कर रहा) हो जाता है।

जब प्रॉमिस रिज़ॉल्व हो जाता है, आपका फ़ंक्शन फिर से पिघलाया जाता है और स्टैक पर वापस रख दिया जाता है। लेकिन इतिहास गायब हो चुका होता है।

इंजन को यह पता नहीं होता कि 500 मिलीसेकंड पहले किसने `await` किया था। उसे सिर्फ यह पता होता है कि चलाने के लिए एक टास्क है।

## V8 के सुधार के प्रयास

Node.js मदद करने की कोशिश करता है। हमारे पास है:

1. `Error.captureStackTrace()`: स्टैक को *निर्माण के समय* कैप्चर करता है। अगर एरर बाद में थ्रो किया जाए तो बेकार है।
2. `--async-stack-traces`: एक फ़्लैग जो Node.js को प्रॉमिस चेन की “शैडो स्टैक” रखवाता है।  
   * लागत: यह आपके एप्लिकेशन को लगभग 30 % धीमा कर देता है।  
   * परिणाम: यह मदद करता है, लेकिन जल्दी ही शोर पैदा करता है।

---

## वास्तविक समाधान: AsyncLocalStorage

अगर आप प्रोडक्शन में टिके रहना चाहते हैं, तो स्टैक ट्रेस देखना बंद करें। कारण‑संबंध (causality) पर ध्यान दें।

हमें कंटेक्स्ट (उपयोगकर्ता आईडी, अनुरोध आईडी) को निष्पादन “थ्रेड” से जोड़ना होगा, भले ही वह स्टैक और माइक्रोटास्क क्यू के बीच कूदता रहे।

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

चाहे बीच में कितनी भी `await` हों, कंटेक्स्ट बना रहता है।

---

## प्रोडक्शन प्लेबुक

1.  `err.stack` पर भरोसा करना बंद करें। यह डिज़ाइन से ही अधूरा है।  
2.  स्ट्रक्चर्ड लॉगिंग अपनाएँ। हर लॉग लाइन में `AsyncLocalStorage` से `requestId` जोड़ें।  
3.  स्टैक नहीं, ट्रेस करें। OpenTelemetry का उपयोग करें। यह सर्विसेज़ के बीच कारण‑शृंखला को विज़ुअलाइज़ करता है, जो वास्तव में आपकी जरूरत है।

आपका कोड async है। आपका डिबगिंगकॉन्टेक्स्ट नहीं होना चाहिए।
````
