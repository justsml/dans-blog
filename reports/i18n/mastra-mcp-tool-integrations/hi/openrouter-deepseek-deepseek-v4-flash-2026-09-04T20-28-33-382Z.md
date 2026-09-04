# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: hi
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/hi/index.mdx
- Validation: deferred
- Runtime seconds: 70.23
- Input tokens: 6038
- Output tokens: 8532
- Thinking tokens: unknown
- Cached input tokens: 2816
- Cache write tokens: 0
- Estimated cost: $0.002848
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: आपका AI एजेंट इसके बिना बेकार है
subTitle: क्यों MCP कृत्रिम बुद्धिमत्ता का USB-C है।
modified: '2026-09-04'
tags:
  - ai
  - mcp
  - tools
  - integrations
  - mastra
  - salesforce
  - apis
category: AI
subCategory: Integration
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
आपने एक AI एजेंट बनाया है। हो सकता है कि वह अच्छा भी हो। प्रॉम्प्ट टाइट हैं, मॉडल तेज़ है, और रिस्पॉन्स नेचुरल लगते हैं।

लेकिन फिर कोई उससे Salesforce में कस्टमर रिकॉर्ड चेक करने को कहता है। या नवीनतम Jira टिकट्स खींचने को। या आपके इंटरनल डॉक्यूमेंटेशन को सर्च करने को।

और आपका खूबसूरत एजेंट बस... कर नहीं पाता।

यही इंटीग्रेशन प्रॉब्लम है जिससे हर AI प्लेटफ़ॉर्म को रूबरू होना पड़ता है। आपके एजेंट को हाथ चाहिए। उसे आपके असली बिज़नेस सिस्टम में झांकने के लिए आँखें चाहिए। इनके बिना, आप सिर्फ एक महँगा चैटबॉट चला रहे हैं।

पारंपरिक हल? हर उस सर्विस के लिए अलग से API रैपर लिखना जिसे आप कनेक्ट करना चाहते हैं। उनके डॉक्स पढ़ो, उनका ऑथ हैंडल करो, उनकी रेट लिमिट्स से निपटो, प्रार्थना करो कि अगले महीने उनके एंडपॉइंट न बदलें। फिर अगली सर्विस के लिए दोबारा करो। और उसके बाद अगली।

Model Context Protocol इस समीकरण को पूरी तरह बदल देता है।

---

## MCP वास्तव में क्या हल करता है

USB-C से पहले के USB के बारे में सोचें। आपके पास Mini-USB, Micro-USB, Apple के प्रोपराइटरी कनेक्टर, और एक दराज भर केबल थे जो सिर्फ खास डिवाइसों के साथ काम करते थे। USB-C ने सिर्फ एक नया कनेक्टर नहीं जोड़ा—इसने एक मानक स्थापित किया जिसका मतलब था कि कोई भी केबल किसी भी डिवाइस के साथ काम कर सकती है।

MCP AI टूल इंटीग्रेशन के लिए वही काम कर रहा है।

अपने एजेंट को Salesforce, HubSpot, GitHub, या किसी अन्य सर्विस से जोड़ने के लिए कस्टम कोड लिखने के बजाय, आप एक बार प्रोटोकॉल लागू करते हैं (या प्री-बिल्ट सर्वर डाउनलोड करते हैं), और कोई भी MCP-संगत एजेंट तुरंत उससे बात कर सकता है।

प्रोटोकॉल कम्युनिकेशन लेयर को संभालता है। आप बस यह परिभाषित करते हैं कि आपके टूल क्या करते हैं और उन्हें किस डेटा की ज़रूरत है।

---

## एकाधिक इंटीग्रेशन सेट करना

Mastra में [`MCPClient`](https://mastra.ai/docs/mcp/overview) के माध्यम से देशी MCP सपोर्ट है। आप लोकल टूल (चाइल्ड प्रोसेस के रूप में चलने वाले) और रिमोट सर्विस (अपने इंफ्रास्ट्रक्चर पर चलने वाले) दोनों को कनेक्ट कर सकते हैं।

यहाँ मैप्स, मौसम और लोकल Wikipedia सर्च को जोड़ने वाला एक प्रतिनिधि सेटअप है:

```typescript
// src/mastra/mcp/index.ts
import { MCPClient } from '@mastra/mcp';

export const mcpClient = new MCPClient({
  id: 'navigation-mcp',
  servers: {
    // Local tool (Stdio)
    wikipedia: {
      command: 'npx',
      args: ['-y', 'wikipedia-mcp'],
    },
    // Maps & Navigation (Remote/HTTP)
    googleMaps: {
      url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
      requestInit: {
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_MAPS_API_KEY}`,
        },
      },
    },
    // Weather Service Integration
    weather: {
      url: new URL(process.env.WEATHER_MCP_URL!),
      requestInit: {
        headers: {
          'X-API-Key': process.env.WEATHER_API_KEY!,
        },
      },
    },
  },
});
```

क्लाइंट कनेक्शन लाइफ़साइकल मैनेज करता है, लोकल टूल के लिए प्रोसेस स्पॉनिंग हैंडल करता है, और रिमोट सर्वर के लिए HTTP कनेक्शन बनाए रखता है। आप सीधे सॉकेट या stdio को हाथ नहीं लगाते।

---

## टूल को एजेंट से जोड़ना

एक बार जब आप अपने MCP क्लाइंट को कॉन्फ़िगर कर लेते हैं, तो उन टूल को एजेंट को देना सीधा-सादा है:

```typescript
// src/mastra/agents/navigation-agent.ts
import { Agent } from '@mastra/core/agent';
import { mcpClient } from '../mcp';

export const navigationDirectionsAgent = new Agent({
  id: 'navigation-directions-agent',
  name: 'Navigation & Directions Assistant',
  instructions: `You are a helpful navigation assistant that provides route planning and travel advice.
    - Always confirm the start and destination locations
    - Use Google Maps tools to find optimal routes
    - Check weather conditions along the route
    - Provide estimated travel times and suggest alternatives if weather is poor
    - Include relevant details like traffic, road conditions, and points of interest
    - Keep responses clear and actionable`,
  model: 'openai/gpt-5.5',
  tools: await mcpClient.listTools(), // <--- This is the magic line
});
```

जब कोई उपयोगकर्ता पूछता है: *"सैन फ्रांसिस्को से लेक ताहो तक का सबसे अच्छा रास्ता क्या है, और क्या मुझे मौसम के बारे में चिंतित होना चाहिए?"*

एजेंट उपलब्ध टूल परिभाषाओं को पढ़ता है, पहचानता है कि उसके पास Google Maps रूटिंग और मौसम पूर्वानुमान टूल तक पहुँच है, उन्हें सही पैरामीटर के साथ निष्पादित करता है, और सर्वोत्तम रूट के साथ-साथ रास्ते में वर्तमान मौसम की स्थितियों के साथ उत्तर देता है।

आपने Google Maps API का एक भी कोड या मौसम सेवा एकीकरण नहीं लिखा।

---

## प्रति-उपयोगकर्ता प्रमाणीकरण

यहाँ एक सुरक्षा गलती करना आसान है: क्रेडेंशियल्स को हार्डकोड करना।

यदि आप एक Google Maps API कुंजी को अपने पर्यावरण चर में रखते हैं और काम खत्म कर देते हैं, तो हर उपयोगकर्ता एक ही कोटा और दर सीमाएँ साझा करता है। इससे भी महत्वपूर्ण बात, यदि आप ऐसी सेवाओं का उपयोग कर रहे हैं जो उपयोगकर्ता की प्राथमिकताएँ (जैसे सहेजे गए स्थान या पसंदीदा मार्ग) संग्रहीत करती हैं, तो सभी को एक ही डेटा दिखाई देगा। यह डेमो के लिए ठीक काम करता है। प्रोडक्शन में यह एक दायित्व है।

Mastra इसे इस तरह से समर्थित करता है कि आप उपयोगकर्ता-विशिष्ट क्रेडेंशियल्स के साथ MCP क्लाइंट को गतिशील रूप से बना सकते हैं और अनुरोध समय पर उनके टूलसेट पास कर सकते हैं। आप अभी भी सामान्य SaaS प्लंबिंग के मालिक हैं: टोकन को सुरक्षित रूप से संग्रहीत करना, उन्हें रिफ्रेश करना, और यह तय करना कि कौन से उपयोगकर्ता कौन सी सेवाएं कनेक्ट कर सकते हैं।

```typescript
async function handleUserRequest(userPrompt: string, userCredentials: UserCreds) {
  // Create a client for THIS specific user
  const userMcp = new MCPClient({
    id: `maps-${userCredentials.userId}`,
    servers: {
      googleMaps: {
        url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
        requestInit: {
          headers: {
            // User's specific API key or token
            Authorization: `Bearer ${userCredentials.mapsApiKey}`,
            'X-User-ID': userCredentials.userId,
          },
        },
      },
    },
  });

  try {
    const agent = mastra.getAgent('navigationDirectionsAgent');
    
    // Inject tools at runtime
    const response = await agent.generate(userPrompt, {
      toolsets: await userMcp.listToolsets(),
    });

    return response;
  } finally {
    await userMcp.disconnect();
  }
}
```

प्रत्येक उपयोगकर्ता को अपने स्वयं के API कोटा और प्राथमिकताओं के साथ अपना पृथक टूलसेट मिलता है। उपयोगकर्ता A के सहेजे गए स्थान निजी रहते हैं, उपयोगकर्ता B का मार्ग इतिहास अलग होता है। वास्तविकता में मल्टी-टेनेंट SaaS एजेंट इसी प्रकार काम करते हैं।

---

## कम्पोजिट टूल बनाना

कभी-कभी आपको कई MCP टूल को एक ही ऑपरेशन में संयोजित करने की आवश्यकता होती है। हो सकता है कि आप एक ऐसा मार्ग बनाना चाहें जो रास्ते में रीयल-टाइम ट्रैफ़िक और मौसम स्थितियों दोनों को ध्यान में रखे।

आप MCP टूल को कस्टम टूल परिभाषाओं में लपेट सकते हैं:

```typescript
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

type DirectionsResult = {
  waypoints: Array<{ latitude: number; longitude: number }>;
  [key: string]: unknown;
};

type ForecastResult = {
  alerts?: unknown[];
  severe?: boolean;
};

export const smartRouteTool = createTool({
  id: 'smart-route-planner',
  description: 'Plans optimal route considering traffic and weather conditions',
  inputSchema: z.object({
    origin: z.string(),
    destination: z.string(),
  }),
  outputSchema: z.object({
    route: z.record(z.string(), z.unknown()),
    weatherAlerts: z.array(z.unknown()),
    recommendation: z.string(),
  }),
  execute: async ({ origin, destination }, executionContext) => {
    const tools = await mcpClient.listTools();

    // 1. Get base route from Google Maps
    const routeData = await tools.googleMaps_getDirections.execute(
      { origin, destination },
      executionContext,
    ) as DirectionsResult;

    // 2. Check weather along the route
    const weatherData = await tools.weather_getForecast.execute(
      { coordinates: routeData.waypoints },
      executionContext,
    ) as ForecastResult;

    // 3. Return enhanced route with weather warnings
    return {
      route: routeData,
      weatherAlerts: weatherData.alerts ?? [],
      recommendation: weatherData.severe
        ? 'Consider delaying trip'
        : 'Safe to travel',
    };
  },
});
```

वर्तमान Mastra टूल पहले सत्यापित इनपुट और दूसरा निष्पादन संदर्भ प्राप्त करते हैं। उस संदर्भ को खोजे गए MCP टूल में पास करने से अनुरोध-स्कोप्ड स्थिति, ट्रेसिंग और रद्दीकरण संरक्षित रहता है। ऊपर दिए गए नाम और परिणाम प्रकार उदाहरण अनुबंध हैं; उन नामों और स्कीमा का उपयोग करें जो आप वास्तव में कनेक्ट होने वाले MCP सर्वर द्वारा विज्ञापित किए गए हैं।

यह आपको इस बात पर बारीक नियंत्रण देता है कि टूल कैसे परस्पर क्रिया करते हैं, जबकि भारी उठाने के लिए MCP प्रोटोकॉल का लाभ उठाते हैं।

---

## अनुमोदन उपकरण सीमा पर है

MCP उपकरणों को जोड़ना आसान बनाता है। इसका मतलब यह नहीं कि हर उपकरण बिना किसी रुकावट के चले।

Mastra का `MCPClient` सर्वर स्तर पर अनुमोदन की आवश्यकता कर सकता है, या तो उस सर्वर पर हर उपकरण के लिए या प्रत्येक कॉल पर गतिशील रूप से:

```typescript
export const githubMcp = new MCPClient({
  id: 'github-mcp',
  servers: {
    github: {
      url: new URL(process.env.GITHUB_MCP_URL!),
      requireToolApproval: ({ toolName, annotations }) => {
        if (annotations?.readOnlyHint) return false;
        if (toolName.includes('delete_')) return true;
        return annotations?.destructiveHint ?? true;
      },
    },
  },
});
```

इस अनुमोदन को अभी भी एप्लिकेशन नीति के रूप में माना जाना चाहिए, न कि कोई जादुई मंत्र। MCP उपकरण एनोटेशन विश्वसनीय सर्वरों से उपयोगी संकेत हैं; वे अपने आप में कोई सुरक्षा सीमा नहीं हैं। तृतीय-पक्ष सर्वरों के लिए, डिफ़ॉल्ट को उबाऊ रखें और एजेंट द्वारा किसी भी महत्वपूर्ण चीज़ में बदलाव करने से पहले पूछें।

---

## यह कहाँ ले जाता है

हर उस सेवा के लिए कस्टम API क्लाइंट लिखना जिनसे आपके AI एजेंट को बात करनी है, कभी भी टिकाऊ नहीं था। यह बुरी तरह स्केल करता है, अक्सर टूटता है, और आपके प्लेटफ़ॉर्म को विशिष्ट कार्यान्वयनों से बाँध देता है।

MCP हर एकीकरण चुनौती का समाधान नहीं करता—प्रमाणीकरण अभी भी जटिल है, दर सीमा (rate limiting) अभी भी मायने रखती है, और हर सेवा के पास अभी MCP सर्वर नहीं है। लेकिन यह एक नींव स्थापित करता है जो एजेंट प्लेटफ़ॉर्म बनाने को काफ़ी कम कष्टदायक बनाता है।

यदि आप एक AI सिस्टम डिज़ाइन कर रहे हैं जिसे बाहरी सेवाओं से संपर्क करना है, तो MCP को समझना संभवतः आपके समय के लायक है।

### संसाधन

- [Mastra MCP दस्तावेज़ीकरण](https://mastra.ai/docs/mcp/overview)
- [MCP रजिस्ट्री](https://registry.modelcontextprotocol.io)
- [Klavis AI (एंटरप्राइज़ MCP)](https://klavis.ai)
- [Mastra GitHub भंडार](https://github.com/mastra-ai/mastra)

## श्रृंखला पढ़ें

1. [LLM रूटिंग](/llm-routing-mastra-ai)
2. [सुरक्षा और गार्डरेल्स](/mastra-security-guardrails)
3. **MCP और उपकरण एकीकरण** (यह पोस्ट)
4. [कार्यप्रवाह और मेमोरी](/mastra-workflows-memory)
````
