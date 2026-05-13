# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/hi/index.mdx
- Validation: deferred
- Runtime seconds: 25.43
- Input tokens: 7423
- Output tokens: 12492
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.003592
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: प्रोडक्शन एआई भयानक है (और इसे कैसे ठीक करें)
subTitle: ''
date: '2026-01-03'
modified: '2026-01-08'
tags:
  - ai
  - security
  - mastra
  - guardrails
  - privacy
  - pii
category: AI
subCategory: Security
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
कोई भी असुरक्षित एआई प्रणाली बनाने की नीयत से शुरू नहीं करता है। आप निर्देश लिखते हैं, आप किनारे के मामलों की जांच करते हैं, आप कुछ सत्यापन नियम जोड़ते हैं। फिर कोई आपके बॉट को जहाज चलाने में धोखा दे सकता है और उपयोगकर्ता डेटा का खुलासा कर सकता है। या एक क्रेडिट कार्ड संख्या आपके लॉग में समाप्त हो जाती है। या मॉडल आत्मविश्वास से प्रतिस्पर्धा के उत्पाद की अनुशंसा करता है।

“डेमो में काम करता है” और “उत्पादन में सुरक्षित है” के बीच का अंतर अधिकांश टीमों की अपेक्षा से अधिक व्यापक होता है।

समस्या का एक हिस्सा यह है कि कच्चे एलएलएम में इस बारे में कोई राय नहीं होती कि वे क्या करना चाहिए या नहीं करना चाहिए। वे अनुमान मशीनें हैं जो आपके द्वारा शुरू किए गए पैटर्न को जारी रखने की कोशिश करती हैं। उन्हें एक प्रारंभ दें जो 'सिस्टम ओवरराइड मोड' की तरह दिखता है, और वे खुशी-खुशी खेलते रहेंगे। यह मॉडल में बग नहीं है; यह बस भाषा मॉडल के काम करने का तरीका है।

अधिकांश फ्रेमवर्क आपको मॉडल हाथों में देते हैं और आपके भाग्य की कामना करते हैं। मास्ट्रा एक अलग दृष्टिकोण अपनाता है: यह धारणा रखता है कि आपको अंततः सुरक्षा रेलों की आवश्यकता होगी, इसलिए यह उन्हें एजेंट आर्किटेक्चर में शुरुआत से बना देता है।

## प्रोसेसर सुरक्षा परतें के रूप में

मुख्य तंत्र सीधा है। आपके प्रोम्प्ट के मॉडल तक पहुंचने से पहले, यह इनपुट प्रोसेसरों की एक श्रृंखला से गुजरता है। मॉडल के प्रतिक्रिया देने के बाद, आउटपुट प्रोसेसरों का अपना मौका आता है। प्रत्येक प्रोसेसर उस चरण में सामग्री का निरीक्षण, संशोधन, या ब्लॉक कर सकता है।

इन्हें एआई इंटरैक्शन के लिए मिडलवेयर के रूप में सोचें। आप आवश्यक प्रोसेसरों को स्टैक करते हैं, उनके व्यवहार को निर्दिष्ट करते हैं, और वे प्रत्येक अनुरोध पर स्वचालित रूप से चलते हैं।

### 1. जासूसों को रोकना (प्रोम्प्ट इंजेक्शन)

प्रोम्प्ट इंजेक्शन हमले अब अधिक जटिल हो गए हैं। लोग अदृश्य यूनिकोड वर्णों का उपयोग करते हैं, निर्देशों को बेस64 में लिखते हैं, या मॉडल को बताते हैं कि वे "डीबग मोड" में हैं, जहां सामान्य नियम लागू नहीं होते। इन तकनीकों का विकास जारी रहता है।

मास्ट्रा में प्रोसेसर हैं जो सामान्य पैटर्न को पकड़ते हैं:

```typescript
// src/mastra/agents/secure-agent.ts
import { Agent } from '@mastra/core/agent';
import { PromptInjectionDetector, UnicodeNormalizer } from '@mastra/core/processors';
import { openai } from '@ai-sdk/openai';

export const secureAgent = new Agent({
  id: 'fortress-assistant',
  name: 'fortress-assistant',
  instructions: 'You are a secure assistant.',
  model: openai('gpt-5'),
  inputProcessors: [
    // 1. अदृश्य वर्णों को हटाएं
    new UnicodeNormalizer({
      id: 'unicode-normalizer',
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. प्रयास का पता लगाएं
    new PromptInjectionDetector({
      id: 'prompt-injection-detector',
      model: openai('gpt-5-nano'), // सस्ता, तेज़
      threshold: 0.8,
      strategy: 'block', // मजबूत रूकावट
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
    }),
  ],
});
```

[`UnicodeNormalizer`](https://mastra.ai/docs/processors) कंट्रोल वर्णों को हटाता है और व्हाइटस्पेस को संकुचित करता है। [`PromptInjectionDetector`](https://mastra.ai/docs/processors) साफ़ इनपुट में ऐसे पैटर्न का विश्लेषण करता है जो आपके निर्देशों को ओवरराइड करने का प्रयास कर रहे हों।

आप यह निर्धारित करते हैं कि आपको कितना सख्त पता लगाना है (पैरामीटर `threshold`) और जब यह ट्रिप हो जाए तो क्या होना चाहिए (ब्लॉक, लॉग, या केवल फ्लैग करें)।

### 2. PII का संचालन

लॉग में क्रेडिट कार्ड नंबर, वेक्टर डेटाबेस में सोशल सिक्योरिटी नंबर, आवश्यकता से अधिक समय तक संग्रहित ईमेल पते। ये ठीक वे मुद्दे हैं जो नियामक समस्याओं में बदल जाते हैं। चुनौती यह है कि उपयोगकर्ता हमेशा इस बात को नहीं समझते कि वे एक चैट विंडो में संवेदनशील डेटा पेस्ट कर रहे हैं।

[`PIIDetector`](https://mastra.ai/docs/processors) अपने मॉडल या संग्रहण में लिखे जाने से पहले सामान्य पैटर्न की जांच करता है:

```typescript
import { PIIDetector } from '@mastra/core/processors';

export const privateAgent = new Agent({
  id: 'privacy-first-assistant',
  name: 'privacy-first-assistant',
  instructions: 'You are a helpful assistant that never stores personal information.',
  model: openai('gpt-5'),
  inputProcessors: [
    new PIIDetector({
      id: 'pii-detector',
      model: openai('gpt-5-nano'),
      detectionTypes: ['email', 'phone', 'credit-card', 'ssn'],
      threshold: 0.6,
      strategy: 'redact',
      redactionMethod: 'mask',  // Replace with [REDACTED]
      instructions: 'Detect and mask personally identifiable information',
    }),
  ],
});
```

आप यह चुन सकते हैं कि मास्क करें (को [REDACTED] से बदलें), हैश करें, या पूरी तरह ब्लॉक कर दें। प्रोसेसर इनपुट और आउटपुट दोनों पर चलता है, इसलिए आपके मॉडल के किसी भी तरह से संवेदनशील डेटा जनरेट करने पर भी आपकी रक्षा होगी।

### 3. सामग्री मॉडरेशन

इंटरनेट डेटा पर प्रशिक्षित मॉडल्स कुछ चीजें देख चुके हैं। फिल्टरिंग के बिना, वे कभी-कभी ऐसे प्रतिक्रिया दे सकते हैं जो आपकी पब्लिक रिलेशन टीम के लिए चिंता का कारण बन सकते हैं। [`ModerationProcessor`](https://mastra.ai/docs/processors) आपके मार्गदर्शक नियमों के उल्लंघन करने वाली सामग्री को पकड़ता है:

```typescript
import { ModerationProcessor } from '@mastra/core/processors';

export const moderatedAgent = new Agent({
  id: 'safe-assistant',
  name: 'safe-assistant',
  instructions: 'You are a helpful assistant for a community platform.',
  model: openai('gpt-5'),
  inputProcessors: [
    new ModerationProcessor({
      id: 'moderation-processor',
      model: openai('gpt-5-nano'),  // Fast, cheap model for classification
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,  // Block if confidence > 70%
      strategy: 'block',  // Stop the request immediately
      instructions: 'Detect harmful content that violates community guidelines',
    }),
  ],
});
```

चूंकि आपके उपयोग के मामले के लिए कौन सी श्रेणियाँ महत्वपूर्ण हैं, उसकी परिभाषा आपके द्वारा की जाती है। एक कलात्मक लेखन उपकरण ग्राहक सेवा बॉट की तुलना में अधिक व्यक्तित्वपूर्ण सामग्रि की अनुमति दे सकता है। सीमा और रणनीति आपको फ़िल्टरिंग की गंभीरता के बारे में नियंत्रण प्रदान करते हैं।

---

## जब चीजें ट्रिप हो जाती हैं

प्रोसेसर्स जब कोई मुद्दा पाते हैं तो त्रुटि नहीं फेंकते हैं। बजाये इसके, वे परिणाम वस्तु पर एक फ़्लैग सेट करते हैं:

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked! Reason: ${result.tripwireReason}`);
  // "Blocked! Reason: Prompt injection detected."
  return "Nice try, script kiddie.";
}
```

यह पैटर्न आपके एप्लिकेशन के लिए आपको सुरक्षा घटनाओं के निपटान का कोई भी तरीका अपनाने की अनुमति देता है। आप विश्लेषण के लिए उन्हें लॉग कर सकते हैं, एक सामान्य त्रुटि संदेश वापस कर सकते हैं, या यहां तक कि कुछ उल्लंघनों को विशिष्ट संदर्भों में अनुमति दे सकते हैं। `tripwireReason` क्षेत्र आपको बताता है कि कौन-सा प्रोसेसर सामग्रि को फ्लैग कर रहा है, जो आपके द्वारा असत्य सकारात्मक परिणामों के डीबगिंग या अपनी सीमाओं को समायोजित करते समय सहायता प्रदान करता है।

---

## यह क्या नहीं हल करता है

प्रोसेसर बहुत कुछ पकड़ते हैं, लेकिन वे चमत्कारिक नहीं हैं। पर्याप्त समय वाले एक निर्धारित हमलावर शायद एक प्रॉम्प्ट ढूंढ सकता है जो बीच से निकल जाए। मॉडल कभी-कभी ऐसे भ्रमित होते हैं जिन्हें प्रोसेसर भविष्यवाणी नहीं कर सकते। और सुरक्षा और लचीलापन के बीच हमेशा एक तुलना रहती है: आपके नियम जितने सख्त होंगे, वैध उपयोग के मामले ब्लॉक होने की संभावना उतनी अधिक होगी।

मूल्य पूर्ण सुरक्षा नहीं है। यह उत्पादन में अवश्य आने वाली सामान्य समस्याओं को व्यवस्थित तरीके से संभालने का तरीका है। आप उस बात को सीखते हुए संवेदनशीलता को समायोजित कर सकते हैं कि आपके उपयोगकर्ता वास्तव में क्या करते हैं। आप डोमेन-विशिष्ट जोखिमों के लिए आवश्यक प्रोसेसर जोड़ सकते हैं। और आपके पास ब्लॉक किए गए डेटा और उनके कारणों के लेखाजोखा होता है।

उत्पादन में AI की अधिकांश सुरक्षा समस्याएं जटिल हमले नहीं होती हैं। वे लोग होते हैं जो डेटा की प्रतिलिपि बनाकर-चिपकाकर उन्हें बरकरार रखते हैं, या प्रयोग और त्रुटि के माध्यम से यह खोज लेते हैं कि बॉट ऐसी चीजें करेगा जिन्हें आप अपने इरादा से नहीं करना चाहते हैं। प्रोसेसर हर संभव समस्या को रोक नहीं सकते, लेकिन वे सामान्य समस्याओं को बहुत कठिन बना देते हैं।

### संसाधन
---

- [मास्ट्रा गार्डरेल्स दस्तावेज़](https://mastra.ai/docs/agents/guardrails)
- [सुरक्षा के सर्वोत्तम प्रथाएँ](https://mastra.ai/docs/security)
- [मास्ट्रा गिटहब रिपॉजिटरी](https://github.com/mastra-ai/mastra)

## श्रृंखला को पढ़ें

1. [एलएलएम रूटिंग](../llm-routing-mastra-ai)
2. **सुरक्षा और गार्डरेल्स** (यह पोस्ट)
3. [एमसीपी और टूल एकीकरण](../mastra-mcp-tool-integrations)
4. [वर्कफ्लो और मेमोरी](../mastra-workflows-memory)
````
