# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: it
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/it/index.mdx
- Validation: deferred
- Runtime seconds: 55.05
- Input tokens: 5929
- Output tokens: 6154
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.002272
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Il tuo agente AI è inutile senza questo
subTitle: Perché MCP è l'USB-C dell'Intelligenza Artificiale.
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
Hai costruito un agente AI. Forse è anche un buon agente. I prompt sono ben scritti, il modello è veloce e le risposte sembrano naturali.

Ma poi qualcuno gli chiede di controllare Salesforce per un record cliente. O di recuperare gli ultimi ticket Jira. O di cercare nella tua documentazione interna.

E il tuo bellissimo agente semplicemente... non può.

Questo è il problema di integrazione che ogni piattaforma AI prima o poi incontra. Il tuo agente ha bisogno di mani. Ha bisogno di occhi per osservare i tuoi sistemi aziendali reali. Senza di essi, stai solo eseguendo un costoso chatbot.

La soluzione tradizionale? Scrivere un wrapper API personalizzato per ogni singolo servizio che vuoi collegare. Leggere la loro documentazione, gestire la loro autenticazione, affrontare i loro limiti di velocità, sperare che non cambino i loro endpoint il mese prossimo. Poi rifarlo per il servizio successivo. E per il prossimo.

Il Model Context Protocol cambia completamente questo paradigma.

---

## Cosa risolve effettivamente MCP

Pensa all'USB prima dell'USB-C. Avevi Mini-USB, Micro-USB, connettori Apple proprietari e un cassetto pieno di cavi che funzionavano solo con dispositivi specifici. L'USB-C non ha solo aggiunto un nuovo connettore: ha stabilito uno standard per cui qualsiasi cavo poteva funzionare con qualsiasi dispositivo. L'MCP sta facendo la stessa cosa per le integrazioni degli strumenti AI.

Invece di scrivere codice personalizzato per collegare il tuo agente a Salesforce, HubSpot, GitHub o qualsiasi altro servizio, implementi il protocollo una volta (o scarichi un server pre-costruito), e qualsiasi agente compatibile con MCP può parlargli immediatamente.

Il protocollo gestisce il livello di comunicazione. Tu definisci solo cosa fanno i tuoi strumenti e quali dati servono.

---

## Configurare più integrazioni

Mastra ha supporto nativo per MCP tramite il suo [`MCPClient`](https://mastra.ai/docs/mcp/overview). Puoi collegare sia strumenti locali (eseguiti come processi figli) che servizi remoti (in esecuzione sulla propria infrastruttura).

Ecco una configurazione rappresentativa che collega mappe, meteo e ricerca Wikipedia locale:

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

Il client gestisce il ciclo di vita della connessione, gestisce la creazione di processi per gli strumenti locali e mantiene le connessioni HTTP per i server remoti. Non tocchi direttamente socket o stdio.

## Collegare strumenti agli agenti

Una volta configurato il client MCP, fornire quegli strumenti a un agente è immediato:

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

Quando un utente chiede: *"Qual è il percorso migliore da San Francisco a Lake Tahoe, e devo preoccuparmi del meteo?"*

L'agente legge le definizioni degli strumenti disponibili, capisce di avere accesso agli strumenti di Google Maps per il routing e alle previsioni meteo, li esegue con i parametri corretti e risponde con un percorso ottimale più le condizioni meteo attuali lungo il tragitto.

Non hai scritto una singola riga di codice dell'API di Google Maps o di integrazione del servizio meteo.

---

## Autenticazione per utente

C'è un errore di sicurezza facile da commettere: hardcodare le credenziali.

Se metti una chiave API di Google Maps nelle variabili d'ambiente e la consideri fatta, ogni utente condivide la stessa quota e gli stessi rate limit. Ancora più importante, se usi servizi che memorizzano preferenze utente (come luoghi salvati o percorsi preferiti), tutti vedrebbero gli stessi dati. Questo va bene per demo. In produzione è un problema.

Mastra supporta questa esigenza permettendoti di creare client MCP dinamicamente con credenziali specifiche per utente e passare i loro set di strumenti al momento della richiesta. Gestisci comunque la consueta infrastruttura SaaS: memorizzare token in modo sicuro, rinnovarli e decidere quali utenti possono collegare quali servizi.

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

Ogni utente ha il proprio set di strumenti isolato, con le proprie quote API e preferenze. I luoghi salvati dell'Utente A restano privati, la cronologia dei percorsi dell'Utente B è separata. Ecco come funzionano gli agent SaaS multi-tenant in pratica.

---

## Creazione di strumenti compositi

A volte è necessario combinare più strumenti MCP in un'unica operazione. Magari vuoi pianificare un percorso che tenga conto sia del traffico in tempo reale sia delle condizioni meteo lungo il tragitto.

Puoi avvolgere gli strumenti MCP in definizioni di strumenti personalizzate:

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

Gli strumenti Mastra attuali ricevono prima l'input validato e poi il contesto di esecuzione. Passare quel contesto agli strumenti MCP scoperti preserva lo stato specifico della richiesta, la tracciabilità e la cancellazione. I nomi e i tipi di risultato qui sopra sono contratti di esempio; usa i nomi e gli schemi pubblicizzati dai server MCP a cui ti connetti realmente.

Questo ti dà un controllo granulare su come esattamente gli strumenti interagiscono, sfruttando comunque il protocollo MCP per il lavoro pesante.

## L'Approvazione Appartiene al Confine dello Strumento

MCP rende più facile collegare strumenti. Questo non significa che ogni strumento debba funzionare senza attrito.

`MCPClient` di Mastra può richiedere approvazione a livello di server, sia per ogni strumento su quel server che dinamicamente per chiamata:

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

Quell'approvazione dovrebbe comunque essere trattata come una policy applicativa, non come un incantesimo magico. Le annotazioni degli strumenti MCP sono utili suggerimenti provenienti da server fidati; non costituiscono da sole un confine di sicurezza. Per server di terze parti, imposta il comportamento predefinito come noioso e chiedi conferma prima che l'agente muti qualsiasi cosa di importante.

---

## Dove Questo Conduce

Scrivere client API personalizzati per ogni servizio con cui il tuo agente AI deve parlare non è mai stato sostenibile. Scala male, si rompe spesso e vincola la tua piattaforma a implementazioni specifiche.

MCP non risolve ogni sfida d'integrazione——l'autenticazione rimane complessa, la limitazione della frequenza conta ancora, e non tutti i servizi hanno ancora un server MCP. Ma stabilisce una base che rende la costruzione di piattaforme per agenti significativamente meno dolorosa.

Se stai architettando un sistema AI che deve interagire con servizi esterni, vale probabilmente la pena di dedicare del tempo a capire MCP.

### Risorse

- [Documentazione MCP di Mastra](https://mastra.ai/docs/mcp/overview)
- [Registro MCP](https://registry.modelcontextprotocol.io)
- [Klavis AI (MCP Enterprise)](https://klavis.ai)
- [Repository GitHub di Mastra](https://github.com/mastra-ai/mastra)

## Leggi la Serie

1. [Routing LLM](/llm-routing-mastra-ai)
2. [Sicurezza e Guardrail](/mastra-security-guardrails)
3. **MCP e Integrazioni Strumentali** (Questo Articolo)
4. [Flussi di Lavoro e Memoria](/mastra-workflows-memory)
````
