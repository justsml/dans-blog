# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: hi
- Model: openrouter/openai/gpt-5.6-luna
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/hi/index.mdx
- Validation: deferred
- Runtime seconds: 21.17
- Input tokens: 4331
- Output tokens: 2414
- Thinking tokens: unknown
- Cached input tokens: 1055
- Cache write tokens: 3270
- Estimated cost: $0.003573
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: प्रोडक्शन AI डरावना है (और इसे कैसे ठीक करें)
subTitle: >-
  अगर आपके एजेंट में सुरक्षा-नियंत्रण नहीं हैं, तो वह प्रोडक्शन के लिए तैयार
  नहीं है।
modified: '2026-09-04'
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
कोई भी असुरक्षित AI सिस्टम बनाने के इरादे से शुरुआत नहीं करता। आप निर्देश लिखते हैं, edge cases का परीक्षण करते हैं, कुछ validation rules जोड़ते हैं। फिर किसी को पता चलता है कि वह आपके bot को समुद्री डाकू की भूमिका निभाने और user data उजागर करने के लिए उकसा सकता है। या कोई credit card number आपके logs में पहुंच जाता है। या model पूरे आत्मविश्वास से किसी competitor के product की सिफारिश कर देता है।

“डेमो में काम करता है” और “production में सुरक्षित है” के बीच का अंतर अधिकांश teams की अपेक्षा से कहीं बड़ा होता है।

समस्या का एक हिस्सा यह है कि raw LLMs की अपनी कोई राय नहीं होती कि उन्हें क्या करना चाहिए या क्या नहीं करना चाहिए। वे prediction machines हैं, जो आपके शुरू किए हुए pattern को आगे बढ़ाने की कोशिश करती हैं। उन्हें ऐसा prompt दीजिए जो “system override mode” जैसा दिखता हो, और वे खुशी-खुशी उसी खेल में शामिल हो जाएंगी। यह model का bug नहीं है; language models इसी तरह काम करते हैं।

अधिकांश frameworks आपको model सौंपकर शुभकामनाएं दे देते हैं। Mastra अलग रास्ता अपनाता है: वह मानकर चलता है कि आखिरकार आपको guardrails की जरूरत पड़ेगी, इसलिए उन्हें शुरुआत से ही agent architecture में शामिल करता है।

---

## Processors: सुरक्षा की परतें

मुख्य mechanism सीधा है। आपके prompt के model तक पहुंचने से पहले वह input processors की एक chain से गुजरता है। Model के response देने के बाद output processors की बारी आती है। प्रत्येक processor उस stage पर content का निरीक्षण, संशोधन या उसे block कर सकता है।

इन्हें AI interactions के लिए middleware समझिए। आपको जिन processors की जरूरत हो, उन्हें stack करें, उनका behavior configure करें, और वे हर request पर अपने-आप चलेंगे।

### 1. समुद्री डाकुओं को रोकना (Prompt Injection)

Prompt injection attacks अब काफी रचनात्मक हो गए हैं। लोग invisible Unicode characters का इस्तेमाल करते हैं, instructions को base64 में लिखते हैं, या model को यकीन दिलाते हैं कि वह “debug mode” में है, जहां सामान्य rules लागू नहीं होते। Techniques लगातार विकसित होती रहती हैं।

Mastra में ऐसे processors शामिल हैं जो आम patterns को पकड़ लेते हैं:

```typescript
// src/mastra/agents/secure-agent.ts
import { Agent } from '@mastra/core/agent';
import { PromptInjectionDetector, UnicodeNormalizer } from '@mastra/core/processors';

const GUARDRAIL_MODEL = 'openrouter/openai/gpt-oss-safeguard-20b';

export const secureAgent = new Agent({
  id: 'fortress-assistant',
  name: 'fortress-assistant',
  instructions: 'You are a secure assistant.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    // 1. Scrub invisible characters
    new UnicodeNormalizer({
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Detect the attempt
    new PromptInjectionDetector({
      model: GUARDRAIL_MODEL,
      threshold: 0.8,
      strategy: 'block', // Hard stop
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
      lastMessageOnly: true,
    }),
  ],
});
```

[`UnicodeNormalizer`](https://mastra.ai/reference/processors/unicode-normalizer) control characters को हटा देता है और whitespace को collapse करता है। [`PromptInjectionDetector`](https://mastra.ai/reference/processors/prompt-injection-detector) साफ किए गए input का विश्लेषण करके ऐसे patterns खोजता है जो संकेत दें कि कोई आपके instructions को override करने की कोशिश कर रहा है।

आप configure कर सकते हैं कि detection कितना aggressive होना चाहिए (`threshold` parameter) और trigger होने पर क्या होना चाहिए (`block`, `warn`, `filter`, या `rewrite`)।

### 2. PII को संभालना

Logs में credit card numbers, vector databases में Social Security numbers, जरूरत से ज्यादा समय तक stored email addresses। ये वे समस्याएं हैं जो आगे चलकर regulatory issues बन जाती हैं। चुनौती यह है कि users को हमेशा पता नहीं होता कि वे chat window में sensitive data paste कर रहे हैं।

[`PIIDetector`](https://mastra.ai/reference/processors/pii-detector) आपके model तक पहुंचने या storage में लिखे जाने से पहले common patterns को scan करता है:

```typescript
import { Agent } from '@mastra/core/agent';
import { BatchPartsProcessor, PIIDetector } from '@mastra/core/processors';

export const privateAgent = new Agent({
  id: 'privacy-first-assistant',
  name: 'privacy-first-assistant',
  instructions: 'You are a helpful assistant that never stores personal information.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    new PIIDetector({
      model: GUARDRAIL_MODEL,
      detectionTypes: ['email', 'phone', 'credit-card', 'ssn'],
      threshold: 0.6,
      strategy: 'redact',
      redactionMethod: 'mask',
      instructions: 'Detect and mask personally identifiable information',
      lastMessageOnly: true,
    }),
  ],
  outputProcessors: [
    new BatchPartsProcessor({ batchSize: 10 }),
    new PIIDetector({
      model: GUARDRAIL_MODEL,
      strategy: 'redact',
      redactionMethod: 'mask',
    }),
  ],
});
```

आप चुन सकते हैं कि data को redact करना है, hash करना है, हटाना है, typed placeholders से बदलना है, या पूरी तरह block करना है। `PIIDetector` एक hybrid processor है: जोखिम जहां मौजूद हो, उसके आधार पर इसे `inputProcessors`, `outputProcessors`, या दोनों में रखें। Streamed output के लिए भारी classifiers चलाने से पहले chunks को batch करें, ताकि हर छोटे token drip पर अलग LLM check का खर्च न उठाना पड़े।

### 3. Content Moderation

इंटरनेट डेटा पर प्रशिक्षित मॉडलों ने बहुत कुछ देखा है। फ़िल्टरिंग के बिना, वे कभी-कभी ऐसे जवाब दे सकते हैं जिनसे आपकी PR टीम परेशान हो जाए। [`ModerationProcessor`](https://mastra.ai/reference/processors/moderation-processor) उन कंटेंट को पकड़ता है जो आपकी गाइडलाइंस का उल्लंघन करते हैं:

```typescript
import { Agent } from '@mastra/core/agent';
import { BatchPartsProcessor, ModerationProcessor } from '@mastra/core/processors';

export const moderatedAgent = new Agent({
  id: 'safe-assistant',
  name: 'safe-assistant',
  instructions: 'You are a helpful assistant for a community platform.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    new ModerationProcessor({
      model: GUARDRAIL_MODEL,
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,
      strategy: 'block',
      instructions: 'Detect harmful content that violates community guidelines',
      lastMessageOnly: true,
    }),
  ],
  outputProcessors: [
    new BatchPartsProcessor({ batchSize: 10 }),
    new ModerationProcessor({
      model: GUARDRAIL_MODEL,
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      strategy: 'filter',
      chunkWindow: 1,
    }),
  ],
});
```

दिलचस्प बात यह है कि आप तय करते हैं कि आपके उपयोग-केस के लिए कौन-सी categories मायने रखती हैं। किसी creative writing tool में customer service bot की तुलना में अधिक अभिव्यंजक कंटेंट की अनुमति हो सकती है। `threshold` और `strategy` आपको यह नियंत्रित करने देते हैं कि फ़िल्टरिंग कितनी सख्त होनी चाहिए।

---

## जब चीज़ें ट्रिप हों

जब कोई processor `block` strategy का उपयोग करता है, तो Mastra generation को रोक देता है और इस घटना को tripwire metadata के रूप में उपलब्ध कराता है। `generate()` के साथ result object देखें:

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked by ${result.tripwire.processorId}`);
  console.log(`Reason: ${result.tripwire.reason}`);
  // "Blocked! Reason: Prompt injection detected."
  return 'Request blocked by policy.';
}
```

Streaming calls के लिए `fullStream` पर आने वाले `tripwire` chunks सुनें। इस pattern से आप security events को अपने application के लिए उपयुक्त तरीके से handle कर सकते हैं। आप उन्हें analysis के लिए log कर सकते हैं, generic error message लौटा सकते हैं, या thresholds tune करते समय किसी low-risk case को `block` से `warn` में बदल सकते हैं। `processorId` और `reason` बताते हैं कि किस processor ने content को flag किया, जो false positives debug करते समय मददगार होता है।

---

## यह किन समस्याओं को हल नहीं करता

Processors बहुत कुछ पकड़ लेते हैं, लेकिन वे जादू नहीं हैं। पर्याप्त समय वाला कोई दृढ़ हमलावर शायद ऐसा prompt खोज ले जो इनके बीच से निकल जाए। Models कभी-कभी ऐसे तरीकों से hallucinate करते हैं जिनका processors अनुमान नहीं लगा सकते। और security तथा flexibility के बीच हमेशा tradeoff रहता है: आपके rules जितने सख्त होंगे, legitimate use cases के block होने की संभावना उतनी ही बढ़ेगी।

मूल्य perfect protection में नहीं है। मूल्य इस बात में है कि production में निश्चित रूप से आने वाली आम समस्याओं को handle करने का आपके पास एक systematic तरीका हो। अपने users के वास्तविक व्यवहार को समझने के साथ आप sensitivity tune कर सकते हैं। Domain-specific risks के लिए custom processors जोड़ सकते हैं। और उसी control point के आसपास violation callbacks, logs, traces और app-level audit records जोड़ सकते हैं।

Production AI में अधिकांश security problems sophisticated attacks नहीं होते। वे ऐसे लोग होते हैं जो ऐसा data copy-paste कर देते हैं जिसे उन्हें नहीं करना चाहिए था, या trial and error से खोज लेते हैं कि bot आपकी मंशा से अलग काम कर सकता है। Processors हर संभावित समस्या को नहीं रोकेंगे, लेकिन वे obvious समस्याओं को काफी कठिन बना देते हैं।

### संसाधन

- [Mastra Guardrails Documentation](https://mastra.ai/docs/agents/guardrails)
- [Mastra Processors Documentation](https://mastra.ai/docs/agents/processors)
- [Mastra Agent Approval](https://mastra.ai/docs/agents/agent-approval)
- [Mastra GitHub Repository](https://github.com/mastra-ai/mastra)

## सीरीज़ पढ़ें

1. [LLM Routing](/llm-routing-mastra-ai)
2. **Security & Guardrails** (यह पोस्ट)
3. [MCP & Tool Integrations](/mastra-mcp-tool-integrations)
4. [Workflows & Memory](/mastra-workflows-memory)
````
