# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/hi/index.mdx
- Validation: deferred
- Runtime seconds: 7.79
- Input tokens: 4570
- Output tokens: 1950
- Thinking tokens: unknown
- Cached input tokens: 1152
- Cache write tokens: 0
- Estimated cost: $0.000529
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: मॉडल से शादी न करें
subTitle: 'LLM रूटिंग, अभी बहुत चर्चित'
date: '2026-01-02'
modified: '2026-01-08'
tags:
  - ai
  - llm
  - typescript
  - mastra
  - agent-orchestration
category: AI
subCategory: Engineering
social_image: ../mobile-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
अधिकांश इंजीनियरिंग टीमें एक भाषा मॉडल चुनती हैं और उसी के साथ ही रहती हैं। एक प्रदाता, एक मॉडल, सभी कार्य। यह उसी तरह है जैसे आप एक व्यक्ति को कोडिंग, कॉपीराइटिंग और टैक्स सभी करने के लिए नियुक्त कर लेते हैं, सिर्फ इसलिए क्योंकि वह पहले इंटरव्यू में अच्छा लगा।

किसी भी समय, एक मॉडल कोड में बेहतर है, दूसरा लंबी और गंदगी भरी संदर्भ में बेहतर है, और तीसरा सबसे सस्ता, साधारण कार्यों जैसे वर्गीकरण के लिए उपयुक्त है। मॉडल के नाम बदलते रहते हैं, लेकिन समस्या की प्रकृति नहीं बदलती। यदि आप मान लेते हैं कि एक मॉडल सब कुछ कर सकता है, तो आप या तो साधारण कार्यों के लिए अधिक भुगतान कर रहे होते हैं या विशेष कार्यों में अपर्याप्त परिणाम प्राप्त कर रहे होते हैं।

मैंने एक टीम को देखा जिसने सेंटिमेंट एनालिसिस को $30‑प्रति‑मिलियन‑टोकन मॉडल के माध्यम से चलाते हुए हजारों डॉलर खर्च कर दिए, जबकि $0.50 मॉडल वही काम उतनी ही अच्छी तरह कर सकता था। सरल JSON फ़ॉर्मेटिंग, बुनियादी वर्गीकरण कार्य, सभी उनके प्रीमियम प्रदाता के माध्यम से हो रहे थे। एकमात्र चीज़ जो गर्म हो रही थी, वह उनका AWS बिल था।

एक बेहतर तरीका है, और यह विशेष रूप से जटिल नहीं है।

## समर्पण के बजाय प्रतिनिधि

क्या होगा अगर आप अनुरोधों को उस मॉडल की ओर निर्देशित कर सकें जो वास्तव में उस विशिष्ट कार्य के लिए सबसे उपयुक्त हो? कठिन कार्यों के लिए अपने महंगे पावरहाउस का उपयोग करें, लेकिन सरल पार्सिंग और फ़ॉर्मेटिंग को सस्ते विकल्प पर ले जाएँ। कई प्रदाताओं के लाभ प्राप्त करें बिना कोडबेस में उन्हें मैन्युअल रूप से संभालने की ज़रूरत के।

Mastra आपको बिल्कुल इसी तरह की प्रणाली बनाने देता है। आप विभिन्न प्रकार के कार्यों के लिए विशेषज्ञ एजेंट सेट करते हैं, फिर एक राउटर एजेंट बनाते हैं जो तय करता है कि प्रत्येक अनुरोध को कौन‑सा विशेषज्ञ संभालना चाहिए। नीचे दिखाए गए मॉडल आईडी केवल उदाहरण हैं, कोई लीडरबोर्ड नहीं। इन्हें उन वर्तमान मॉडलों से बदलें जो आपके मूल्यांकन में जीतते हैं और आपके बजट में फिट होते हैं।

इसे इस तरह सोचें: आपकी टीम में तीन विशेषज्ञ हैं।

```typescript
// ./src/mastra/index.ts
import { Mastra } from '@mastra/core';
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

export const claudeAgent = new Agent({
  id: 'claude-agent',
  instructions: 'You are an expert engineer. Write bugs? You are fired.',
  model: anthropic(process.env.CODE_MODEL ?? 'claude-sonnet-4-5'),
});

export const geminiAgent = new Agent({
  id: 'gemini-agent',
  instructions: 'You are a creative writer. Be weird.',
  model: google(process.env.LONG_CONTEXT_MODEL ?? 'gemini-3-pro-preview'),
});

export const gptAgent = new Agent({
  id: 'gpt-agent',
  instructions: 'You are a helpful assistant. Be boring.',
  model: openai(process.env.GENERAL_MODEL ?? 'gpt-5.2'),
});
```

हर एक की एक भूमिका है। आपका कोड एजेंट वह मॉडल होना चाहिए जो आपके रेपो‑विशिष्ट कोड मूल्यांकन पास करता हो। आपका लॉन्ग‑कॉन्टेक्स्ट एजेंट वह होना चाहिए जो आपके वास्तविक दस्तावेज़ों को बिना मध्य भाग को गड़बड़ किए संभाल सके। आपका जनरल एजेंट सस्ता, भरोसेमंद और सबसे अच्छे तरीके से बोरिंग होना चाहिए।

अब बात दिलचस्प हो जाती है। आप एक राउटर जोड़ते हैं जो एक बुद्धिमान प्रॉक्सी की तरह काम करता है:

```typescript
export const routerAgent = new Agent({
  id: 'router-agent',
  name: 'The Boss',
  instructions: `You are an intelligent router.
  - Coding -> Claude
  - Poetry -> Gemini
  - Facts -> GPT

  Do not do the work yourself. Delegate.`,
  model: openai(process.env.ROUTER_MODEL ?? 'gpt-5-mini'), // Use a cheap model for routing!
  agents: {
    claudeAgent,
    geminiAgent,
    gptAgent,
  },
});

export const mastra = new Mastra({
  agents: { routerAgent, claudeAgent, geminiAgent, gptAgent },
});
```

राउटर स्वयं हल्के वजन के मॉडल पर चलता है क्योंकि यह सिर्फ यह तय कर रहा है कि ट्रैफ़िक कहाँ भेजना है। आप प्रीमियम मॉडल को चुनने के लिए प्रीमियम दरें नहीं दे रहे हैं। इसे भी मापें; एक ख़राब राउटर चुपचाप बचत को गलत रूटिंग में बदल देता है।

जब कोई बबल सॉर्ट इम्प्लीमेंटेशन माँगता है, तो राउटर इसे कोड कार्य के रूप में पहचानता है और आपके कोड विशेषज्ञ को सौंप देता है। रचनात्मक लेखन प्रॉम्प्ट? वह मॉडल को जाता है जिसे आपने आवाज़ और रेंज के लिए चुना है। ऐतिहासिक घटनाओं के बारे में तथ्यात्मक प्रश्न? इसे जनरल एजेंट को रूट करें, आदर्श रूप से रिट्रीवल के साथ जब ताज़गी या उद्धरण महत्वपूर्ण हो।

## The Practical Benefits

**Cost efficiency matters more than you think.** एक छोटा रूटिंग मॉडल जो डेलीगेशन निर्णय लेता है, वह आपके सबसे महंगे प्रोवाइडर के माध्यम से हर अनुरोध चलाने की लागत का एक अंश ही लेता है। समय के साथ, विशेषकर बड़े पैमाने पर, यह वास्तविक पैसे में बदल जाता है। आप केवल तब भारी‑ड्यूटी इंटेलिजेंस के लिए भुगतान करते हैं जब आपको वास्तव में उसकी जरूरत होती है।

**Quality improves when you match models to tasks.** विजेता मॉडल महीने, टास्क और प्रॉम्प्ट के आकार के अनुसार बदलता रहता है। इसलिए रूटिंग लेयर को आपके इवैल्युएशन पर निर्भर होना चाहिए, न कि उस मॉडल पर जो उस हफ़्ते ट्विटर पर ट्रेंड कर रहा था जब आपने इंटीग्रेशन लिखा था।

**Resilience becomes a side benefit.** जब OpenAI में उसकी कोई पीरियॉडिक आउटेज आती है (और आती ही रहती है), आपका राउटर ट्रैफ़िक को अन्य प्रोवाइडर्स की ओर रीडायरेक्ट कर सकता है। आप एक विशिष्ट API के वापस आने का इंतज़ार करते‑हुए पानी में डूबे नहीं रहेंगे।

यह किसी दिखावे के लिए चतुर होने की बात नहीं है। यह वित्तीय और तकनीकी दोनों दृष्टिकोण से समझदार सिस्टम बनाने की बात है। आप हर निर्माण कार्य के लिए वही हथौड़ा नहीं इस्तेमाल करेंगे, और आपको हर AI कार्य के लिए वही भाषा मॉडल नहीं इस्तेमाल करना चाहिए।

इस दृष्टिकोण की खूबी यह है कि आपका एप्लिकेशन कोड नहीं बदलता। आप अभी भी बस अपने राउटर एजेंट को कॉल करते हैं। कौन सा मॉडल किस टास्क के लिए उपयोग करना है, इसका निर्णय एक ही जगह पर रहता है, एक बार कॉन्फ़िगर किया जाता है, बजाय इसके कि आपका कोडबेस कई कंडीशनल लॉजिक में बिखरा हो।

### संसाधन

- [Mastra.ai दस्तावेज़ीकरण](https://mastra.ai/docs)
- [Mastra GitHub रिपॉजिटरी](https://github.com/mastra-ai/mastra)

## श्रृंखला पढ़ें

1. **LLM रूटिंग** (यह पोस्ट)
2. [सुरक्षा एवं गार्डरेल्स](../mastra-security-guardrails)
3. [MCP एवं टूल इंटीग्रेशन](../mastra-mcp-tool-integrations)
4. [वर्कफ़्लो एवं मेमोरी](../mastra-workflows-memory)
````
