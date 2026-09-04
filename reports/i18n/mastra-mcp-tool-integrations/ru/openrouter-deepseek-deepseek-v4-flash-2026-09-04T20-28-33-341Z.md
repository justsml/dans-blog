# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: ru
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/ru/index.mdx
- Validation: deferred
- Runtime seconds: 54.48
- Input tokens: 6023
- Output tokens: 6235
- Thinking tokens: unknown
- Cached input tokens: 2816
- Cache write tokens: 0
- Estimated cost: $0.002203
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Без этого ваш ИИ-агент бесполезен
subTitle: Почему MCP — это USB-C для искусственного интеллекта.
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
Вы построили AI-агента. Возможно, даже хорошего. Промпты продуманы, модель быстрая, ответы звучат естественно.

Но тут кто-то просит его проверить записи в Salesforce, или вытащить последние тикеты из Jira, или поискать во внутренней документации.

И ваш прекрасный агент просто… не может.

Это проблема интеграции, с которой рано или поздно сталкивается любая AI-платформа. Агенту нужны руки. Ему нужны глаза, чтобы видеть ваши реальные бизнес-системы. Без них вы просто запускаете дорогой чат-бот.

Традиционное решение? Написать собственный API-обёртку для каждого сервиса, к которому хотите подключиться. Изучать их документацию, обрабатывать их аутентификацию, разбираться с их ограничениями по скорости, молиться, чтобы они не поменяли эндпоинты в следующем месяце. Потом повторить для следующего сервиса. И ещё для одного.

Model Context Protocol полностью меняет эту логику.

---

## Что на самом деле решает MCP

Вспомните USB до появления USB-C. Были Mini-USB, Micro-USB, проприетарные коннекторы Apple и ящик, полный кабелей, которые работали только с определёнными устройствами. USB-C не просто добавил новый разъём — он установил стандарт, благодаря которому любой кабель подходит к любому устройству.

MCP делает то же самое для интеграций инструментов AI.

Вместо того чтобы писать собственный код для подключения вашего агента к Salesforce, HubSpot, GitHub или любому другому сервису, вы реализуете протокол один раз (или скачиваете готовый сервер), и любой MCP-совместимый агент может общаться с ним сразу.

Протокол берёт на себя коммуникационный уровень. Вы просто определяете, что делают ваши инструменты и какие данные им нужны.

---

## Настройка нескольких интеграций

У Mastra есть встроенная поддержка MCP через [`MCPClient`](https://mastra.ai/docs/mcp/overview). Вы можете подключать как локальные инструменты (запускающиеся как дочерние процессы), так и удалённые сервисы (работающие на собственной инфраструктуре).

Вот пример типичной настройки, подключающей карты, погоду и локальный поиск по Wikipedia:

```typescript
// src/mastra/mcp/index.ts
import { MCPClient } from '@mastra/mcp';

export const mcpClient = new MCPClient({
  id: 'navigation-mcp',
  servers: {
    // Локальный инструмент (Stdio)
    wikipedia: {
      command: 'npx',
      args: ['-y', 'wikipedia-mcp'],
    },
    // Карты и навигация (Remote/HTTP)
    googleMaps: {
      url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
      requestInit: {
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_MAPS_API_KEY}`,
        },
      },
    },
    // Интеграция с сервисом погоды
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

Клиент управляет жизненным циклом подключения, обрабатывает запуск процессов для локальных инструментов и поддерживает HTTP-соединения для удалённых серверов. Вам не нужно работать с сокетами или stdio напрямую.

## Подключение инструментов к агентам

Когда ваш MCP-клиент настроен, передать эти инструменты агенту несложно:

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

Когда пользователь спрашивает: *«Какой лучший маршрут из Сан-Франциско до озера Тахо и стоит ли беспокоиться о погоде?»*

Агент читает доступные описания инструментов, понимает, что у него есть инструменты для построения маршрутов через Google Maps и прогноза погоды, выполняет их с правильными параметрами и выдаёт ответ с оптимальным маршрутом и текущими погодными условиями вдоль пути.

Вы не написали ни строчки кода для Google Maps API или интеграции с погодным сервисом.

---

## Аутентификация для каждого пользователя

Здесь легко допустить ошибку безопасности: зашить учётные данные в код.

Если вы положите один ключ Google Maps API в переменные окружения и на этом закончите, все пользователи будут делить одну квоту и одни лимиты. Что ещё важнее, если вы используете сервисы, хранящие пользовательские настройки (например, сохранённые адреса или избранные маршруты), все будут видеть одни и те же данные. Для демо это нормально. В продакшене — проблема.

Mastra решает это тем, что позволяет создавать MCP-клиенты динамически, с учётными данными конкретного пользователя, и передавать их наборы инструментов во время запроса. Вся обычная SaaS-инфраструктура остаётся за вами: безопасное хранение токенов, их обновление и решение, каким пользователям подключать какие сервисы.

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

Каждый пользователь получает свой изолированный набор инструментов с собственными квотами и настройками. Сохранённые адреса пользователя А остаются приватными, история маршрутов пользователя Б — изолированной. Так на практике работают мультитенантные SaaS-агенты.

---

## Создание составных инструментов

Иногда нужно объединить несколько MCP-инструментов в одну операцию. Например, вы хотите спланировать маршрут, учитывающий одновременно трафик в реальном времени и погодные условия вдоль пути.

Вы можете обернуть MCP-инструменты в собственные определения инструментов:

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

Текущие инструменты Mastra сначала получают валидированный ввод, а затем контекст выполнения. Передача этого контекста в обнаруженные MCP-инструменты сохраняет состояние в рамках запроса, трассировку и возможность отмены. Имена и типы результатов выше — примеры контрактов; используйте те имена и схемы, которые объявлены на серверах MCP, к которым вы подключаетесь.

Это даёт вам тонкий контроль над тем, как именно инструменты взаимодействуют друг с другом, при этом тяжёлую работу по-прежнему выполняет протокол MCP.

---

## Утверждение на границе инструмента

MCP упрощает подключение инструментов. Но это не значит, что каждый инструмент должен работать без трения.

`MCPClient` от Mastra может требовать утверждения на уровне сервера: либо для всех инструментов этого сервера, либо динамически для каждого вызова:

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

Такое утверждение по-прежнему следует рассматривать как политику приложения, а не как волшебство. Аннотации инструментов MCP — это полезные подсказки от доверенных серверов, но сами по себе они не являются границей безопасности. Для сторонних серверов сделайте поведение по умолчанию скучным и запрашивайте разрешение, прежде чем агент изменит что-то важное.

---

## К чему это ведёт

Написание индивидуальных API-клиентов для каждого сервиса, с которым должен общаться ваш AI-агент, никогда не было устойчивым решением. Это плохо масштабируется, часто ломается и привязывает вашу платформу к конкретным реализациям.

MCP не решает всех проблем интеграции — аутентификация по-прежнему сложна, ограничение частоты запросов всё ещё важно, и не для каждого сервиса ещё есть MCP-сервер. Но он закладывает основу, которая делает создание платформ для агентов значительно менее болезненным.

Если вы проектируете AI-систему, которой нужно взаимодействовать с внешними сервисами, разобраться в MCP, вероятно, стоит вашего времени.

### Ресурсы

- [Документация Mastra MCP](https://mastra.ai/docs/mcp/overview)
- [Реестр MCP](https://registry.modelcontextprotocol.io)
- [Klavis AI (корпоративный MCP)](https://klavis.ai)
- [Репозиторий Mastra на GitHub](https://github.com/mastra-ai/mastra)

## Читайте серию

1. [Маршрутизация LLM](../llm-routing-mastra-ai)
2. [Безопасность и защитные барьеры](../mastra-security-guardrails)
3. **MCP и интеграции инструментов** (этот пост)
4. [Рабочие процессы и память](../mastra-workflows-memory)
````
