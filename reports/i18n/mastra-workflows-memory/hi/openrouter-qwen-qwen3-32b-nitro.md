# Translation Candidate
- Slug: mastra-workflows-memory
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-05--mastra-workflows-memory/hi/index.mdx
- Validation: deferred
- Runtime seconds: 28.61
- Input tokens: 9581
- Output tokens: 12349
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.003730
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: अनिर्धारित मॉडलों के लिए निर्धारक पैटर्न
date: '2026-01-05'
modified: '2026-01-08'
tags:
  - ai
  - workflows
  - memory
  - mastra
  - agent-networks
  - orchestration
category: AI
subCategory: Architecture
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
LLMs के पास एक अजीब गुण है: वे तकनीकी तर्क को समझने में शानदार होते हैं लेकिन निर्देशों के क्रम को पालन करने में बुरे। GPT-4 को एक अस्पष्ट समस्या दें और वे संभावनाओं पर विचार करेंगे। एक सटीक चरणों का क्रम दें, और वे चरण 3 को छोड़ देते हैं क्योंकि चरण 5 "अधिक प्रासंगिक लगता है"।  

यह मॉडल में बग नहीं है। यह संभाव्यता प्रणालियों की मूल विशेषता है जो निर्धारणात्मक समस्याओं को हल करने की कोशिश कर रही हैं।  

मैंने टीमों को इस असंगति से जूझते हुए देखा है। वे ग्राहक वापसी के लिए एक एजेंट बनाते हैं, उन्हें दर्जनों उपकरण देते हैं और एक व्यवसायिक प्रक्रिया को नियमित रूप से निष्पादित करने की उम्मीद करते हैं। कभी-कभी यह पूरी तरह से काम करता है। कभी-कभी वे अनुमोदनों के बारे में कल्पना करते हैं जो कभी नहीं हुए। कभी-कभी वे एक ही जानकारी के लिए तीन बार पूछते रहते हैं।  

हल बेहतर प्रॉम्प्ट्स नहीं है। यह जानना है कि कब LLM से 'सोचने' के बजाय 'मना करने' को कहना शुरू कर दें।  

---

## जब निर्धारणात्मक रचनात्मक को हराता है

एक समर्थन टिकट की प्रक्रिया के दौरान क्या होता है, इसके बारे में सोचें। वास्तविक दुनिया के व्यवसायिक तर्क कुछ इस तरह दिखते हैं:

1. डेटाबेस से टिकट के विवरण प्राप्त करें  
2. उपयोगकर्ता की रिफंड के लिए पात्रता की जाँच करें (नीति नियम)  
3. लेनदेन की पुष्टि करें और यह भी जाँचें कि क्या इसे पहले से रिफंड कर दिया गया है  
4. रिफंड राशि की गणना करें  
5. भुगतान उलटा करें  
6. टिकट स्थिति अपडेट करें  
7. पुष्टि ईमेल भेजें  

आप इसे एक टूल-कॉलिंग अभ्यास के रूप में LLM को सौंप सकते हैं। मेरे अनुभव में, यह समस्या की ओर बढ़ रहा है। मॉडल चरण 2 और 3 को 'लगभग एक ही चीज हैं' मान सकता है और एक को छोड़ दे सकता है। या यह उपयोगकर्ता के निराशाजनक दिखने पर योग्यता की जाँच करने से पहले ही रिफंड प्रक्रिया शुरू कर सकता है।  

वर्कफ्लो ठीक इस तरह के परिदृश्य के लिए बनाए गए हैं। वे उत्साहजनक नहीं हैं, लेकिन यही उद्देश्य है।  

### एक मौसम गतिविधि नियोजक बनाना  

यहाँ एक व्यावहारिक उदाहरण है जो पैटर्न दिखाता है। हमें कठोर, तथ्यात्मक मौसम डेटा और रचनात्मक गतिविधि सुझावों की आवश्यकता है। मौसम डेटा प्राप्त करना कभी रचनात्मक नहीं होना चाहिए, लेकिन सुझाव रचनात्मक होने चाहिए।

```typescript
// src/mastra/workflows/activity-planner.ts
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// चरण 1: मौसम डेटा प्राप्त करें (निर्धारक)
const fetchWeather = createStep({
  id: 'fetch-weather',
  description: 'एक दिए गए शहर के लिए मौसम का पूर्वानुमान प्राप्त करता है',
  inputSchema: z.object({
    city: z.string(),
  }),
  outputSchema: z.object({
    location: z.string(),
    temperature: z.number(),
    conditions: z.string(),
    precipitationChance: z.number(),
  }),
  execute: async ({ inputData }) => {
    // ... (प्राप्त करने की लॉजिक) ...
    const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code&daily=precipitation_probability_mean`).then(r => r.json());
    
    return {
      location: inputData.city,
      temperature: weather.current.temperature_2m,
      conditions: getWeatherCondition(weather.current.weather_code),
      precipitationChance: weather.daily.precipitation_probability_mean[0],
    };
  },
});

// चरण 2: एजेंट गतिविधियों का सुझाव देता है (रचनात्मक)
const activityPlanner = new Agent({
  id: 'activity-planner-agent',
  name: 'Activity Planner',
  instructions: `आप एक स्थानीय गतिविधियों के विशेषज्ञ हैं। मौसम की स्थिति के आधार पर 3-5 उपयुक्त गतिविधियों का सुझाव दें।
    - वर्षा (50% से अधिक वर्षा की संभावना) के लिए आंतरिक गतिविधियों का प्राथमिकता दें
    - अत्यधिक तापमान के लिए जलवायु-उपयुक्त विकल्पों पर विचार करें
    - हमेशा एक खतरनाक और एक आरामदायक विकल्प शामिल करें`,
  model: openai('gpt-5'),
});

const planActivities = createStep({
  id: 'plan-activities',
  description: 'मौसम के आधार पर गतिविधियों का सुझाव देने के लिए एआई का उपयोग करता है',
  inputSchema: z.object({
    location: z.string(),
    temperature: z.number(),
    conditions: z.string(),
    precipitationChance: z.number(),
  }),
  outputSchema: z.object({
    activities: z.string(),
  }),
  execute: async ({ inputData }) => {
    const prompt = `शहर में मौसम: ${inputData.location}: ${inputData.temperature}°C...`;
    const response = await activityPlanner.generate(prompt);
    return { activities: response.text };
  },
});

// पाइपलाइन
export const activityPlannerWorkflow = createWorkflow({
  id: 'activity-planner',
  inputSchema: z.object({ city: z.string() }),
  outputSchema: z.object({ activities: z.string() }),
})
  .then(fetchWeather)
  .then(planActivities);

activityPlannerWorkflow.commit();
```

LLM कभी भी मौसम API को नहीं छूता है। यह भूमि-सत्य डेटा के रूप में इनपुट प्राप्त करता है, फिर वास्तव में जिस चीज में अच्छा है उसका उपयोग करता है: संदर्भात्मक सुझाव देना। यदि आप इसे उलट देते हैं और एजेंट को मौसम डेटा प्राप्त करने की अनुमति देते हैं, तो आपको अंततः वास्तविक वर्षा के दौरान सूर्यमुखी पूर्वानुमान प्राप्त होगा।

**कब कार्यप्रवाहों को ध्यान में रखें:**
- आपके पास कुछ ज्ञात क्रम के चरण हैं जो क्रम में होने चाहिए
- प्रत्येक चरण में अवलोकनीयता की आवश्यकता है (लॉग, मीट्रिक्स, समय)
- अस्थिर बाहरी API के लिए पुनर्प्रयास तर्क की आवश्यकता है
- व्यावसायिक नियमों को "अनुमानित" नहीं किया जा सकता है - वे बिल्कुल अनुसरण किए जाने चाहिए

---

## कोई नहीं बात करता कॉन्टेक्स्ट विंडो समस्या के बारे में

यहां एक पैटर्न है जिसे मैं बार-बार देखता हूं। कोई चैटबॉट बनाता है। यह परीक्षण के दौरान अच्छा काम करता है। फिर उत्पादन में, उपयोगकर्ता लंबी बातचीत करते हैं और अचानक बॉट खो जाता है।

विकासक लॉग देखता है और यह समझता है कि वे प्रत्येक अनुरोध के साथ पूरी बातचीत इतिहास भेज रहे हैं। सभी 47 संदेश। वे टोकन और कॉन्टेक्स्ट स्पेस को अप्रासंगिक जानकारी के लिए खर्च कर रहे हैं।

बदतर यह है कि शोधकर्ता एक घटना को "मध्य में खो जाना" कहते हैं, जहां मॉडल की प्रदर्शन क्षमता घट जाती है जब महत्वपूर्ण जानकारी लंबे संदर्भ में छिपी होती है। मॉडल वास्तव में पूरे जंगल को देख नहीं पाता।

पूरी बातचीत का इतिहास भेजना सुरक्षित लगता है। आप मॉडल को "सभी जानकारी" दे रहे हैं। लेकिन आप वास्तव में मॉडल के लिए जो महत्वपूर्ण है उस पर ध्यान केंद्रित करने को कठिन बना रहे हैं।

### कार्य याददाश्त बनाम दीर्घकालिक भंडारण

मास्ट्रा की याददाश्त प्रणाली आपको दोनों के साथ देती है। कार्य याददाश्त नए संदेशों को संदर्भ खिड़की में रखती है। सेमांटिक रिकॉल ऐतिहासिक संदेशों की तलाश करता है जब वर्तमान प्रश्न से संबंधित लगता है।

```typescript
// src/mastra/agents/memory-agent.ts
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export const memoryAgent = new Agent({
  id: 'memory-agent',
  name: 'Memory Agent',
  instructions: 'You are a helpful assistant with perfect recall of our conversations.',
  model: openai('gpt-5'),
  memory: new Memory({
    storage: new LibSQLStore({
      id: 'memory-agent-store',
      url: 'file:../mastra.db',
    }),
    options: {
      lastMessages: 20,  // Keep last 20 messages in context
      semanticRecall: {
        enabled: true,  // Use embeddings to find old stuff
        topK: 5,
        threshold: 0.7,
      },
    },
  }),
});
```

यहां वास्तविकता में ऐसा कैसे होता है। एक उपयोगकर्ता पूछता है: "मार्च में आपने जिस इतालवी रेस्तरां की सिफारिश की थी वह कौन-सा था?"

सेमांटिक रिकॉल के बिना, एजेंट अंतिम 20 संदेश देखता है। रेस्तरां की सिफारिश 506 में से 487वीं थी। यह गायब है। एजेंट कहता है: "मुझे वह जानकारी नहीं है।"

सेमांटिक रिकॉल के साथ:  
1. प्रश्न को एम्बेड किया जाता है: `[0.234, -0.567, 0.891, ...]`  
2. एम्बेडिंग को ऐतिहासिक संदेशों की तुलना के लिए ले जाया जाता है  
3. संदेश 487 ("मैंने Trattoria Bella की सिफारिश की - उनका कार्बोनारा अद्भुत है") के साथ 0.89 समानता स्कोर होता है  
4. वह संदेश वर्तमान संदर्भ में डाल दिया जाता है  
5. एजेंट प्रतिक्रिया देता है: "मैंने Trattoria Bella की सिफारिश की। उनका कार्बोनारा मेरा ध्यान आकर्षित कर रहा था।"  

एजेंट केवल संदर्भ विंडो के एक छोटे भाग का उपयोग करते हुए भी पूर्ण स्मृति के साथ प्रतिक्रिया देता प्रतीत होता है। यह सिर्फ धूर्त इंजीनियरिंग नहीं है - जब बातचीत कुछ दर्जन संदेशों से आगे बढ़ जाती है तो यह कार्यात्मक रूप से आवश्यक हो जाता है।  

---  

## एजेंट नेटवर्क्स के माध्यम से समन्वय  

कभी-कभी आपको संरचना और लचीलापन दोनों की आवश्यकता होती है। शुद्ध वर्कफ़्लो बहुत कठोर होते हैं। शुद्ध एजेंट बहुत अनुमानपूर्ण होते हैं।  

एजेंट नेटवर्क्स आपको एक समन्वयक प्रदान करते हैं जो कार्य के आधार पर विशेषज्ञ एजेंट या वर्कफ़्लो को निर्धारित करता है। इसे AI क्षमताओं के लिए एक स्मार्ट लोड बैलेंसर के रूप में सोचें।

```typescript
export const coordinatorAgent = new Agent({
  id: 'coordinator-agent',
  name: 'Research Coordinator',
  instructions: `You are a network of researchers and writers.
    - Use researchAgent for gathering facts
    - Use writingAgent for producing final content
    - Use weatherTool for current weather data
    - Use activityPlannerWorkflow for location-based planning
    
    Always produce comprehensive, well-structured responses.`,
  model: openai('gpt-5'),
  
  // Available primitives
  agents: { researchAgent, writingAgent },
  workflows: { activityPlannerWorkflow },
  tools: { weatherTool },
  
  // Network requires memory
  memory: new Memory({
    storage: new LibSQLStore({ id: 'network-store', url: 'file:../network.db' }),
  }),
});
```

जब आप इस नेटवर्क को क्वेरी करते हैं, तो समन्वयक अनुरोध का विश्लेषण करता है और उपयुक्त रूप से निर्देशित करता है:
- "I need facts about X" triggers the research agent
- "Plan a weekend in Seattle" runs the activity planner workflow
- "Write a report on Y" engages the writing agent

यह पैटर्न एक एकल मेगा-एजेंट में सबकुछ भरने की तुलना में बेहतर पैमाने पर फैलता है। विशिष्ट एजेंट एकल विशेषता विकसित करते हैं। समन्वयक निर्देशन करता है। प्रत्येक भाग अपने काम में निपुण होता है।

---

## एक साथ जोड़ना

वास्तविक उत्पादन AI प्रणालियों को प्रोम्प्ट्स के साथ-साथ आर्किटेक्चर की आवश्यकता होती है। आप वितरित प्रणालियाँ बना रहे हैं जिसमें कुछ नोड LLM होते हैं।

वर्कफ़्लो आपको आवश्यकता पड़ने पर ठीक से कार्य करने की गारंटी देते हैं। मेमोरी आपको टोकन बजट खाली किए बिना संदर्भ प्रदान करती है। एजेंट नेटवर्क आपको सरल भागों से जटिलता बनाने की अनुमति देते हैं।

इसमें से कोई भी चीज आकर्षक नहीं है। लेकिन उत्पादन में पर्याप्त "पूर्ण रूप से स्वायत्त एजेंटों" के विफल होने के बाद मुझे उत्साहजनक अनिश्चितता की तुलना में सामान्य विश्वसनीयता का महत्व बुझ पड़ा है।  

आपके अनुभव भिन्न हो सकते हैं, लेकिन मेरे अनुभव में, वे प्रणालियाँ जो वास्तव में तैयार होती हैं और चलती रहती हैं, वे हैं जो LLM को एक बड़ी आर्किटेक्चर में घटक के रूप में देखती हैं, न कि सब कुछ हल करने वाले चमत्कारी बॉक्स के रूप में।  

### संसाधन  

- [Mastra Workflows Documentation](https://mastra.ai/docs/workflows/overview)  
- [Mastra Memory Documentation](https://mastra.ai/docs/memory/overview)  
- [Full Demo Code](https://github.com/justsml/mastra-examples)  

## श्रृंखला पढ़ें  

1. [LLM Routing](/llm-routing-mastra-ai)  
2. [Security & Guardrails](/mastra-security-guardrails)  
3. [MCP & Tool Integrations](/mastra-mcp-tool-integrations)  
4. **Workflows & Memory** (इस पोस्ट)
````
