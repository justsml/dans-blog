# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/ar/index.mdx
- Validation: deferred
- Runtime seconds: 6.48
- Input tokens: 5374
- Output tokens: 2259
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.000616
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: وكيل الذكاء الاصطناعي الخاص بك لا فائدة منه بدون هذا
subTitle: لماذا MCP هو USB-C للذكاء الاصطناعي
modified: '2026-01-08'
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
لقد بنيت وكيلًا ذكائيًا. ربما يكون جيدًا بالفعل. الأوامر مضغوطة، النموذج سريع، والاستجابات تبدو طبيعية.

لكن ثم يطلب أحدهم منه التحقق من سجل عميل في Salesforce. أو سحب أحدث تذاكر Jira. أو البحث في وثائقك الداخلية.

ويظل وكيلك الجميل... غير قادر على ذلك.

هذه هي مشكلة التكامل التي تصطدم بها كل منصة ذكاء اصطناعي في النهاية. يحتاج وكيلك إلى أيدي. يحتاج إلى عيون داخل أنظمة عملك الفعلية. بدونها، أنت فقط تدير دردشة مكلفة.

الحل التقليدي؟ كتابة غلاف API مخصص لكل خدمة تريد ربطها. قراءة وثائقها، معالجة المصادقة، التعامل مع حدود المعدل، والدعاء ألا تغير نقاط النهاية الشهر القادم. ثم تكرار ذلك للخدمة التالية. ثم التالية.

بروتوكول سياق النموذج (Model Context Protocol) يغيّر هذه المعادلة تمامًا.

## ما يحله MCP فعليًا

فكّر في USB قبل USB‑C. كان لديك Mini‑USB، Micro‑USB، موصلات Apple المملوكة، وصندوق مليء بالكابلات التي تعمل فقط مع أجهزة معينة. USB‑C لم يضيف مجرد موصل جديد—بل وضع معيارًا يعني أن أي كابل يمكن أن يعمل مع أي جهاز.

MCP يفعل الشيء نفسه لتكامل أدوات الذكاء الاصطناعي.

بدلاً من كتابة شفرة مخصصة لربط وكيلك بـ Salesforce أو HubSpot أو GitHub أو أي خدمة أخرى، تنفّذ البروتوكول مرة واحدة (أو تُحمّل خادمًا جاهزًا)، ويمكن لأي وكيل متوافق مع MCP التحدث معه فورًا.

البروتوكول يتعامل مع طبقة التواصل. أنت فقط تُعرّف ما تفعله أدواتك وما البيانات التي تحتاجها.

## إعداد تكاملات متعددة

Mastra تدعم MCP أصلاً عبر [`MCPClient`](https://mastra.ai/docs/mcp/overview). يمكنك ربط الأدوات المحلية (تعمل كعمليات فرعية) والخدمات البعيدة (تعمل على بنية تحتية خاصة بها).

إليك إعدادًا واقعيًا للإنتاج يربط Google Maps للتوجيه، خدمة طقس، وبحث Wikipedia محلي:

```typescript
// src/mastra/mcp/index.ts
import { MCPClient } from '@mastra/mcp';

export const mcpClient = new MCPClient({
  servers: {
    // أداة محلية (Stdio)
    wikipedia: {
      command: 'npx',
      args: ['-y', 'wikipedia-mcp'],
    },
    // الخرائط والملاحة (Remote/HTTP)
    googleMaps: {
      url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
      requestInit: {
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_MAPS_API_KEY}`,
        },
      },
    },
    // تكامل خدمة الطقس
    weather: {
      url: new URL('https://mcp.weatherapi.dev/v1'),
      requestInit: {
        headers: {
          'X-API-Key': process.env.WEATHER_API_KEY!,
        },
      },
    },
  },
});
```

العميل يدير دورة حياة الاتصال، يتعامل مع إنشاء العمليات للأدوات المحلية، ويحافظ على اتصالات HTTP للخوادم البعيدة. لا تحتاج إلى لمس المقابس أو stdio مباشرة.

## ربط الأدوات بالوكيل

بعد تكوين عميل MCP، إتاحة هذه الأدوات للوكيل أمر بسيط:

```typescript
// src/mastra/agents/navigation-agent.ts
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
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
  model: openai('gpt-5'),
  tools: await mcpClient.getTools(), // <--- This is the magic line
});
```

عند سؤال المستخدم: *"ما هو أفضل مسار من سان فرانسيسكو إلى بحيرة تاهو، وهل يجب أن أقلق بشأن الطقس؟"*

يقرأ الوكيل تعريفات الأدوات المتاحة، يدرك أنه يملك إمكانية الوصول إلى أدوات توجيه Google Maps وتوقعات الطقس، ينفذها بالمعلمات الصحيحة، ويجيب بمسار أمثل مع ظروف الطقس الحالية على طول الطريق.

لم تكتب سطرًا واحدًا من كود Google Maps API أو تكامل خدمة الطقس.

---

## المصادقة لكل مستخدم

هناك خطأ أمني شائع: ترميز الاعتمادات صراحةً.

إذا وضعت مفتاح Google Maps API واحدًا في متغيرات البيئة واكتفيت بذلك، سيتشارك جميع المستخدمين نفس الحصة وحدود السرعة. والأهم، إذا كنت تستخدم خدمات تخزن تفضيلات المستخدم (مثل المواقع المحفوظة أو الطرق المفضلة)، سيُظهر الجميع نفس البيانات. هذا قد يكون مقبولًا للعرض التجريبي، لكنه خطر في بيئة الإنتاج.

يتعامل Mastra مع هذا عبر السماح بإنشاء عملاء MCP ديناميكيًا باستخدام اعتمادات مخصصة لكل مستخدم:

```typescript
async function handleUserRequest(userPrompt: string, userCredentials: UserCreds) {
  // Create a client for THIS specific user
  const userMcp = new MCPClient({
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

  const agent = mastra.getAgent('navigationDirectionsAgent');
  
  // Inject tools at runtime
  const response = await agent.generate(userPrompt, {
    toolsets: await userMcp.getToolsets(),
  });

  return response;
}
```

كل مستخدم يحصل على مجموعة أدوات معزولة بحصتها و تفضيلاتها الخاصة. تبقى المواقع المحفوظة للمستخدم A خاصة، وتاريخ الطرق للمستخدم B منفصل. هكذا تعمل الوكلاء SaaS متعددة المستأجرين في الواقع.

---

## بناء أدوات مركبة

أحيانًا تحتاج إلى دمج عدة أدوات MCP في عملية واحدة. ربما تريد تخطيط مسار يأخذ في الاعتبار كل من حركة المرور الفورية وظروف الطقس على طول الطريق.

يمكنك تغليف أدوات MCP في تعريفات أدوات مخصصة:

```typescript
export const smartRouteTool = createTool({
  id: 'smart-route-planner',
  description: 'Plans optimal route considering traffic and weather conditions',
  execute: async ({ context, mastra }) => {
    // Get the raw tools
    const tools = await mcpClient.getTools();
    
    // 1. Get base route from Google Maps
    const routeData = await tools.googleMaps_getDirections.execute({ 
      context: { 
        origin: context.origin,
        destination: context.destination 
      } 
    });
    
    // 2. Check weather along the route
    const weatherData = await tools.weather_getForecast.execute({
      context: { coordinates: routeData.waypoints }
    });
    
    // 3. Return enhanced route with weather warnings
    return { 
      ...routeData, 
      weatherAlerts: weatherData.alerts,
      recommendation: weatherData.severe ? 'Consider delaying trip' : 'Safe to travel'
    };
  },
});
```

يمنحك هذا تحكمًا دقيقًا في كيفية تفاعل الأدوات معًا مع الاستمرار في الاستفادة من بروتوكول MCP للجهد الأكبر.

---

## ما يترتب على ذلك


كتابة عملاء API مخصصين لكل خدمة يحتاج وكيل الذكاء الاصطناعي الخاص بك للتواصل معها لم يكن يومًا حلًا مستدامًا. فهو يتوسع بشكل سيء، يتعطل كثيرًا، ويربط منصتك بتنفيذات محددة.

لا يحل MCP كل تحديات التكامل — لا يزال المصادقة معقدًا، وتظل حدود المعدل مهمة، وليس كل خدمة تمتلك خادم MCP بعد. لكنه يؤسس لقاعدة تجعل بناء منصات الوكلاء أقل ألمًا بشكل ملحوظ.

إذا كنت تصمم نظامًا ذكياً يحتاج إلى التفاعل مع خدمات خارجية، فإن فهم MCP ربما يستحق وقتك.

### الموارد

- [توثيق Mastra MCP](https://mastra.ai/docs/mcp/overview)
- [سجل MCP](https://registry.modelcontextprotocol.io)
- [Klavis AI (Enterprise MCP)](https://klavis.ai)
- [مستودع Mastra على GitHub](https://github.com/mastra-ai/mastra)

## قراءة السلسلة

1. [توجيه LLM](../llm-routing-mastra-ai)
2. [الأمان والقيود الوقائية](../mastra-security-guardrails)
3. **MCP وتكامل الأدوات** (هذه المشاركة)
4. [سير العمل والذاكرة](../mastra-workflows-memory)
````
