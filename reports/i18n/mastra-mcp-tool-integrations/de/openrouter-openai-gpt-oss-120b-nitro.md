# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/de/index.mdx
- Validation: passed
- Runtime seconds: 10.17
- Input tokens: 8075
- Output tokens: 2535
- Thinking tokens: unknown
- Cached input tokens: 2688
- Cache write tokens: 0
- Estimated cost: $0.000771
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Ihr KI‑Agent ist ohne das nutzlos
subTitle: Warum MCP das USB‑C der Künstlichen Intelligenz ist.
date: '2026-01-04'
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
Sie haben einen KI‑Agenten gebaut. Vielleicht ist er sogar gut. Die Prompts sind präzise, das Modell ist schnell und die Antworten wirken natürlich.

Doch dann soll er in Salesforce nach einem Kundendatensatz suchen. Oder die neuesten Jira‑Tickets abrufen. Oder die interne Dokumentation durchforsten.

Und Ihr schöner Agent kann das einfach nicht.

Das ist das Integrationsproblem, das jede KI‑Plattform irgendwann trifft. Ihr Agent braucht Hände. Er braucht Augen, die in Ihre tatsächlichen Geschäftssysteme sehen. Ohne diese ist er nur ein teurer Chatbot.

Die herkömmliche Lösung? Für jeden einzelnen Service, den Sie anbinden wollen, einen eigenen API‑Wrapper schreiben. Die Dokumentation lesen, die Authentifizierung handhaben, die Rate‑Limits berücksichtigen und hoffen, dass die Endpunkte nicht nächsten Monat umziehen. Und das dann für den nächsten Service wiederholen. Und den nächsten.

Das Model Context Protocol ändert diese Rechnung grundlegend.

---

## Was MCP tatsächlich löst

Denken Sie an USB vor USB‑C. Es gab Mini‑USB, Micro‑USB, proprietäre Apple‑Stecker und eine Schublade voller Kabel, die nur mit bestimmten Geräten funktionierten. USB‑C hat nicht nur einen neuen Stecker eingeführt – es hat einen Standard etabliert, der bewirkt, dass jedes Kabel mit jedem Gerät kompatibel ist.

MCP macht dasselbe für AI‑Tool‑Integrationen.

Anstatt für jede Verbindung Ihres Agents zu Salesforce, HubSpot, GitHub oder einem anderen Service eigenen Code zu schreiben, implementieren Sie das Protokoll einmal (oder laden einen vorgefertigten Server herunter), und jeder MCP‑kompatible Agent kann sofort damit kommunizieren.

Das Protokoll übernimmt die Kommunikationsebene. Sie definieren lediglich, was Ihre Werkzeuge tun und welche Daten sie benötigen.

---

## Einrichtung mehrerer Integrationen

Mastra bietet native MCP‑Unterstützung über seinen [`MCPClient`](https://mastra.ai/docs/mcp/overview). Sie können sowohl lokale Werkzeuge (die als Kindprozesse laufen) als auch entfernte Dienste (die auf eigener Infrastruktur betrieben werden) anbinden.

Hier ein realistisches Produktions‑Setup, das Google Maps für Routenplanung, einen Wetterdienst und die lokale Wikipedia‑Suche verbindet:

```typescript
// src/mastra/mcp/index.ts
import { MCPClient } from '@mastra/mcp';

export const mcpClient = new MCPClient({
  servers: {
    // Lokales Werkzeug (Stdio)
    wikipedia: {
      command: 'npx',
      args: ['-y', 'wikipedia-mcp'],
    },
    // Karten & Navigation (Remote/HTTP)
    googleMaps: {
      url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
      requestInit: {
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_MAPS_API_KEY}`,
        },
      },
    },
    // Wetter‑Dienst‑Integration
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

Der Client verwaltet den Verbindungs‑Lebenszyklus, übernimmt das Starten von Prozessen für lokale Werkzeuge und hält HTTP‑Verbindungen zu entfernten Servern aufrecht. Sie müssen keine Sockets oder StdIO direkt anrühren.

## Tools an Agenten anbinden

Sobald Ihr MCP‑Client konfiguriert ist, ist das Bereitstellen dieser Werkzeuge für einen Agenten unkompliziert:

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

Wenn ein Nutzer fragt: *„Wie ist die beste Route von San Francisco nach Lake Tahoe und muss ich wegen des Wetters besorgt sein?“*  

liest der Agent die verfügbaren Werkzeugdefinitionen, erkennt, dass er Zugriff auf die Google‑Maps‑Routing‑ und Wettervorhersage‑Tools hat, führt sie mit den richtigen Parametern aus und liefert eine optimale Route samt aktueller Wetterbedingungen entlang des Weges.

Sie haben keinen einzigen Zeile Google‑Maps‑API‑Code oder Wetter‑Service‑Integration geschrieben.

## Per-User Authentication

Ein häufiger Sicherheitsfehler ist das Hard‑Coden von Zugangsdaten.

Wenn Sie einen einzigen Google‑Maps‑API‑Key in Ihren Umgebungsvariablen hinterlegen und damit fertig sind, teilen alle Nutzer dieselbe Quote und dieselben Rate‑Limits. Noch gravierender: Nutzen Sie Dienste, die Benutzereinstellungen speichern (z. B. gespeicherte Orte oder Lieblingsrouten), sieht jeder dieselben Daten. Das mag für Demos funktionieren, ist aber in der Produktion ein Risiko.

Mastra löst das, indem es Ihnen ermöglicht, MCP‑Clients dynamisch mit benutzerspezifischen Anmeldeinformationen zu erzeugen:

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

Jeder Nutzer erhält sein eigenes, isoliertes Werkzeugset mit eigenen API‑Quoten und Präferenzen. Die gespeicherten Orte von Nutzer A bleiben privat, die Routenhistorie von Nutzer B ist getrennt. So funktionieren Multi‑Tenant‑SaaS‑Agenten in der Praxis.

## Composite‑Werkzeuge bauen

Manchmal muss man mehrere MCP‑Werkzeuge zu einer einzigen Operation kombinieren. Vielleicht möchten Sie eine Route planen, die sowohl den Echtzeit‑Verkehr als auch die Wetterbedingungen entlang des Weges berücksichtigt.

Sie können MCP‑Werkzeuge in benutzerdefinierte Werkzeugdefinitionen einwickeln:

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

Damit erhalten Sie feinkörnige Kontrolle darüber, wie die Werkzeuge exakt zusammenarbeiten, während Sie weiterhin das MCP‑Protokoll für das schwere Heben nutzen.

---

## Wohin das führt


Das Schreiben individueller API‑Clients für jeden Dienst, mit dem Ihr KI‑Agent kommunizieren muss, war nie nachhaltig. Es skaliert schlecht, führt häufig zu Ausfällen und bindet Ihre Plattform an konkrete Implementierungen.

MCP löst nicht jede Integrations‑Herausforderung – Authentifizierung bleibt komplex, Rate‑Limiting ist nach wie vor relevant, und nicht jeder Dienst verfügt bereits über einen MCP‑Server. Dennoch schafft es eine Basis, die den Aufbau von Agenten‑Plattformen deutlich weniger schmerzhaft macht.

Wenn Sie ein KI‑System entwerfen, das mit externen Diensten interagieren muss, lohnt sich ein Verständnis von MCP wahrscheinlich.

### Ressourcen

- [Mastra MCP Documentation](https://mastra.ai/docs/mcp/overview)
- [MCP Registry](https://registry.modelcontextprotocol.io)
- [Klavis AI (Enterprise MCP)](https://klavis.ai)
- [Mastra GitHub Repository](https://github.com/mastra-ai/mastra)

## Die Serie lesen

1. [LLM Routing](../llm-routing-mastra-ai)  
2. [Sicherheit & Leitplanken](../mastra-security-guardrails)  
3. **MCP & Tool-Integrationen** (Dieser Beitrag)  
4. [Workflows & Speicher](../mastra-workflows-memory)
````
