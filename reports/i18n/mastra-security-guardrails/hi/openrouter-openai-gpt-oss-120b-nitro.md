# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/hi/index.mdx
- Validation: deferred
- Runtime seconds: 6.45
- Input tokens: 6886
- Output tokens: 2588
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000734
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'उत्पादन AI: डरावना सच और समाधान'
subTitle: 'यदि आपके एजेंट में सुरक्षा उपाय नहीं हैं, तो वह उत्पादन के लिए तैयार नहीं है।'
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
कोई भी जानबूझकर असुरक्षित AI सिस्टम बनाने की कोशिश नहीं करता। आप निर्देश लिखते हैं, किनारे के मामलों की जाँच करते हैं, कुछ वैधता नियम जोड़ते हैं। फिर कोई पता लगाता है कि वह आपके बॉट को समुद्री डाकू की तरह भूमिका निभाने और उपयोगकर्ता डेटा उजागर करने के लिए धोखा दे सकता है। या कोई क्रेडिट कार्ड नंबर आपके लॉग में आ जाता है। या मॉडल आत्मविश्वास से प्रतिस्पर्धी का उत्पाद सुझा देता है।

“डेमो में काम करता है” और “उत्पादन में सुरक्षित है” के बीच का अंतर अधिकांश टीमों की अपेक्षा से अधिक बड़ा होता है।

समस्या का एक हिस्सा यह है कि कच्चे LLM को यह नहीं पता होता कि उन्हें क्या करना चाहिए या नहीं। वे भविष्यवाणी मशीनें हैं जो आपके द्वारा शुरू किए गए पैटर्न को जारी रखने की कोशिश करती हैं। यदि आप उन्हें “सिस्टम ओवरराइड मोड” जैसा प्रॉम्प्ट देते हैं, तो वे खुशी‑खुशी साथ निभाएंगे। यह मॉडल में बग नहीं है; यह भाषा मॉडल का सामान्य व्यवहार है।

ज्यादातर फ्रेमवर्क आपको मॉडल देते हैं और “शुभकामनाएँ” कहते हैं। Mastra एक अलग दृष्टिकोण अपनाता है: यह मान लेता है कि आपको अंततः गार्डरेल्स की आवश्यकता होगी, इसलिए वह उन्हें एजेंट आर्किटेक्चर में शुरू से ही सम्मिलित कर देता है।

---

## प्रोसेसर को सुरक्षा परतों के रूप में
---

कोर तंत्र सीधा है। आपका प्रॉम्प्ट मॉडल तक पहुँचने से पहले इनपुट प्रोसेसरों की श्रृंखला से गुजरता है। मॉडल ने जवाब देने के बाद आउटपुट प्रोसेसर अपनी बारी लेते हैं। प्रत्येक प्रोसेसर उस चरण में सामग्री को निरीक्षण, संशोधित या ब्लॉक कर सकता है।

इन्हें AI इंटरैक्शन के लिए मिडलवेयर समझें। आप जिनकी जरूरत है उन्हें स्टैक करते हैं, उनका व्यवहार कॉन्फ़िगर करते हैं, और वे हर अनुरोध पर स्वचालित रूप से चलते हैं।

### 1. समुद्री डाकुओं को रोकना (प्रॉम्प्ट इंजेक्शन)

प्रॉम्प्ट इंजेक्शन हमले अब काफी रचनात्मक हो गए हैं। लोग अदृश्य यूनिकोड कैरेक्टर, बेस64 में निर्देश लिखते हैं, या मॉडल को “डिबग मोड” में होने का भरोसा दिलाते हैं जहाँ सामान्य नियम लागू नहीं होते। ये तकनीकें लगातार विकसित होती रहती हैं।

Mastra ऐसे सामान्य पैटर्न को पकड़ने वाले प्रोसेसर शामिल करता है:

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
    // 1. Scrub invisible characters
    new UnicodeNormalizer({
      id: 'unicode-normalizer',
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Detect the attempt
    new PromptInjectionDetector({
      id: 'prompt-injection-detector',
      model: openai('gpt-5-nano'), // Cheap, fast
      threshold: 0.8,
      strategy: 'block', // Hard stop
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
    }),
  ],
});
```

[`UnicodeNormalizer`](https://mastra.ai/docs/processors) नियंत्रण अक्षरों को हटाता है और व्हाइटस्पेस को संकुचित करता है। [`PromptInjectionDetector`](https://mastra.ai/docs/processors) साफ किए गए इनपुट का विश्लेषण करता है ताकि उन पैटर्न का पता चल सके जो संकेत देते हैं कि कोई आपके निर्देशों को ओवरराइड करने की कोशिश कर रहा है।

आप यह निर्धारित कर सकते हैं कि पहचान कितनी आक्रामक होनी चाहिए (`threshold` पैरामीटर) और जब यह ट्रिप हो तो क्या करना है (ब्लॉक, लॉग, या केवल फ़्लैग करना)।

### 2. PII को संभालना

लॉग में क्रेडिट कार्ड नंबर, वेक्टर डेटाबेस में सोशल सिक्योरिटी नंबर, अनावश्यक रूप से संग्रहीत ई‑मेल पते। ये वही समस्याएँ हैं जो नियामक जटिलताओं में बदल जाती हैं। चुनौती यह है कि उपयोगकर्ता अक्सर नहीं समझते कि वे संवेदनशील डेटा को चैट विंडो में पेस्ट कर रहे हैं।

[`PIIDetector`](https://mastra.ai/docs/processors) आपके मॉडल तक पहुँचने या स्टोरेज में लिखे जाने से पहले सामान्य पैटर्न को स्कैन करता है:

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

आप रीडैक्ट ( `[REDACTED]` से बदलना), हैश, या पूरी तरह ब्लॉक करना चुन सकते हैं। प्रोसेसर इनपुट और आउटपुट दोनों पर चलता है, इसलिए यदि मॉडल किसी प्रतिक्रिया में संवेदनशील डेटा उत्पन्न भी करता है तो भी आप सुरक्षित रहते हैं।

### 3. कंटेंट मॉडरेशन

इंटरनेट डेटा पर प्रशिक्षित मॉडल ने कुछ चीज़ें देखी हैं। बिना फ़िल्टरिंग के, वे कभी‑कभी ऐसे उत्तर उत्पन्न कर सकते हैं जो आपके पीआर टीम को बेचैन कर दें। [`ModerationProcessor`](https://mastra.ai/docs/processors) उन सामग्री को पकड़ता है जो आपके दिशानिर्देशों का उल्लंघन करती है:

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
      model: openai('gpt-5-nano'),  // तेज़, सस्ता मॉडल वर्गीकरण के लिए
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,  // यदि विश्वास > 70% हो तो ब्लॉक करें
      strategy: 'block',  // अनुरोध को तुरंत रोकें
      instructions: 'Detect harmful content that violates community guidelines',
    }),
  ],
});
```

दिलचस्प बात यह है कि आप तय करते हैं कि आपके उपयोग‑केस के लिए कौन‑सी श्रेणियाँ मायने रखती हैं। एक रचनात्मक लेखन टूल अधिक अभिव्यक्तिपूर्ण सामग्री की अनुमति दे सकता है, जबकि ग्राहक सेवा बॉट को कड़ी निगरानी चाहिए। थ्रेशहोल्ड और रणनीति आपको यह नियंत्रित करने देती हैं कि फ़िल्टरिंग कितनी सख़्त होनी चाहिए।

---

## जब चीज़ें ट्रिप करती हैं

प्रोसेसर कोई त्रुटि नहीं फेंकते जब वे समस्या का पता लगाते हैं। इसके बजाय, वे परिणाम ऑब्जेक्ट पर एक फ़्लैग सेट करते हैं:

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked! Reason: ${result.tripwireReason}`);
  // "Blocked! Reason: Prompt injection detected."
  return "Nice try, script kiddie.";
}
```

यह पैटर्न आपको सुरक्षा घटनाओं को अपने एप्लिकेशन के अनुसार संभालने देता है। आप उन्हें विश्लेषण के लिए लॉग कर सकते हैं, एक सामान्य त्रुटि संदेश लौटा सकते हैं, या विशेष संदर्भों में कुछ उल्लंघनों की अनुमति दे सकते हैं। `tripwireReason` फ़ील्ड बताती है कि किस प्रोसेसर ने सामग्री को फ़्लैग किया, जिससे फ़ॉल्स पॉज़िटिव को डिबग करना या थ्रेशहोल्ड को ट्यून करना आसान हो जाता है।

---

## यह क्या नहीं हल करता

प्रोसेसर बहुत कुछ पकड़ लेते हैं, लेकिन वे जादू नहीं हैं। पर्याप्त समय वाला दृढ़ प्रतिपक्षी संभवतः ऐसा प्रॉम्प्ट खोज लेगा जो छूट जाए। मॉडल कभी‑कभी ऐसे भ्रम उत्पन्न करते हैं जिन्हें प्रोसेसर भविष्यवाणी नहीं कर सकते। और हमेशा सुरक्षा बनाम लचीलापन का समझौता रहता है: नियम जितने सख्त होंगे, वैध उपयोग मामलों को ब्लॉक करने की संभावना उतनी ही बढ़ेगी।

यह मूल्य पूर्ण सुरक्षा नहीं है। यह एक व्यवस्थित तरीका है जिससे उत्पादन में निश्चित रूप से आने वाले सामान्य मुद्दों को संभाला जा सके। आप उपयोगकर्ताओं के वास्तविक व्यवहार को समझते हुए संवेदनशीलता को ट्यून कर सकते हैं। आप डोमेन‑विशिष्ट जोखिमों के लिए कस्टम प्रोसेसर जोड़ सकते हैं। और आपके पास ऑडिट ट्रेल्स होते हैं जो दिखाते हैं कि क्या ब्लॉक हुआ और क्यों।

उत्पादन AI में अधिकांश सुरक्षा समस्याएँ जटिल हमले नहीं होते। वे लोग होते हैं जो ऐसी डेटा कॉपी‑पेस्ट करते हैं जो उन्हें नहीं करनी चाहिए, या ट्रायल‑एंड‑एरर से पता लगाते हैं कि बॉट वह करेगा जो आपने इरादा नहीं किया था। प्रोसेसर हर संभावित समस्या को रोक नहीं पाएंगे, लेकिन वे स्पष्ट समस्याओं को काफी कठिन बना देते हैं।

### संसाधन

- [Mastra Guardrails Documentation](https://mastra.ai/docs/agents/guardrails)
- [Security Best Practices](https://mastra.ai/docs/security)
- [Mastra GitHub Repository](https://github.com/mastra-ai/mastra)

## श्रृंखला पढ़ें

1. [LLM Routing](../llm-routing-mastra-ai)
2. **Security & Guardrails** (यह पोस्ट)
3. [MCP & Tool Integrations](../mastra-mcp-tool-integrations)
4. [Workflows & Memory](../mastra-workflows-memory)
````
