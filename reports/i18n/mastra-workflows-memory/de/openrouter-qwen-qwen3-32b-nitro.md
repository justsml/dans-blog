# Translation Candidate
- Slug: mastra-workflows-memory
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-05--mastra-workflows-memory/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 21.91
- Input tokens: 8031
- Output tokens: 9985
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.003039
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug mastra-workflows-memory --locale de
## Raw Output

````mdx
---
title: 'Vermeiden Sie unzuverlässige Agenten: Verwenden Sie Workflows & Speicher'
subTitle: Deterministische Muster für nichtdeterministische Modelle.
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
LLMs haben dieses merkwürdige Merkmal: Sie sind hervorragend darin, Nuancen zu verstehen, aber schlecht darin, Rezepte zu befolgen. Gibt man GPT-4 ein vage formuliertes Problem, durchdenkt es mögliche Lösungsansätze. Gibt man ihm eine präzise Sequenz von Schritten, überspringt es möglicherweise Schritt 3, weil Schritt 5 „relevanter erschien“.  

Dies ist kein Fehler im Modell. Es ist eine grundlegende Eigenschaft wahrscheinlichkeitbasierten Systemen, die deterministische Probleme lösen sollen.  

Ich habe gesehen, wie Teams unter diesem Missverhältnis kämpfen. Sie bauen ein Agenten-System, um Kundenerstattungen zu verarbeiten, versehen es mit einer Dutzend Tools und erwarten, dass es Geschäftsprozesse zuverlässig ausführt. Manchmal funktioniert es perfekt. Manchmal erzeugt es Genehmigungen, die nie stattfanden. Manchmal steckt es fest und fragt nach derselben Information drei Mal.  

Die Lösung sind keine besseren Prompts. Es geht darum, zu wissen, wann man aufhören muss, das LLM denken zu lassen, und stattdessen zu befehlen, Befehle auszuführen.  

## Wenn Determinismus Kreativität übertrifft

Denken Sie daran, was passiert, wenn Sie einen Support-Ticket verarbeiten müssen. Reale Geschäftslogik sieht ungefähr so aus:

1. Rufen Sie die Ticketdetails aus der Datenbank ab  
2. Prüfen Sie, ob der Benutzer berechtigt ist, eine Rückerstattung zu erhalten (Richtlinienregeln)  
3. Verifizieren Sie, dass die Transaktion existiert und noch nicht erstattet wurde  
4. Berechnen Sie den Rückerstattungsbetrag  
5. Verarbeiten Sie die Zahlungsrückstellung  
6. Aktualisieren Sie den Ticketstatus  
7. Senden Sie eine Bestätigungs-E-Mail  

Sie könnten dies einem LLM als Tool-Aufruf-Übung überlassen. Aus meiner Erfahrung ist das aber ein Fehler. Das Modell könnte entscheiden, dass Schritt 2 und 3 "im Grunde dasselbe" sind und eine davon überspringen. Oder es verarbeitet die Rückerstattung, bevor die Berechtigung geprüft wird, weil der Benutzer sauer schien.  

Workflows existieren genau für solche Szenarien. Sie sind nicht spannend, aber das ist der Punkt.  

### Aufbau eines Wetter-Aktivitätsplaners  

Hier ist ein praktisches Beispiel, das das Muster zeigt. Wir benötigen harte, faktische Wetterdaten gepaart mit kreativen Aktivitätsvorschlägen. Der Wetterabruf sollte niemals kreativ sein, aber die Vorschläge sollten es sein.

```typescript
// src/mastra/workflows/activity-planner.ts
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Schritt 1: Wetterdaten abrufen (Deterministisch)
const fetchWeather = createStep({
  id: 'fetch-weather',
  description: 'Ruft die Wettervorhersage für eine gegebene Stadt ab',
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
    // ... (Abruflogik) ...
    const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code&daily=precipitation_probability_mean`).then(r => r.json());
    
    return {
      location: inputData.city,
      temperature: weather.current.temperature_2m,
      conditions: getWeatherCondition(weather.current.weather_code),
      precipitationChance: weather.daily.precipitation_probability_mean[0],
    };
  },
});

// Schritt 2: Agent schlägt Aktivitäten vor (Kreativ)
const activityPlanner = new Agent({
  id: 'activity-planner-agent',
  name: 'Activity Planner',
  instructions: `Sie sind ein Experte für lokale Aktivitäten. Basierend auf Wetterbedingungen schlagen Sie 3-5 geeignete Aktivitäten vor.
    - Bei Regen (>50% Niederschlagswahrscheinlichkeit) Priorisierung von Innenaktivitäten
    - Bei extremen Temperaturen Berücksichtigung von klimatisch angepassten Optionen
    - Immer eine abenteuerliche und eine entspannende Option einbeziehen`,
  model: openai('gpt-5'),
});

const planActivities = createStep({
  id: 'plan-activities',
  description: 'Verwendet KI, um Aktivitäten basierend auf Wetterbedingungen zu vorschlagen',
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
    const prompt = `Wetter in ${inputData.location}: ${inputData.temperature}°C...`;
    const response = await activityPlanner.generate(prompt);
    return { activities: response.text };
  },
});

// Die Pipeline
export const activityPlannerWorkflow = createWorkflow({
  id: 'activity-planner',
  inputSchema: z.object({ city: z.string() }),
  outputSchema: z.object({ activities: z.string() }),
})
  .then(fetchWeather)
  .then(planActivities);

activityPlannerWorkflow.commit();
```

Das LLM berührt niemals die Wetter-API. Es erhält echte Daten als Eingabe und macht das, wofür es tatsächlich geeignet ist: Kontextuelle Vorschläge abzugeben. Wenn Sie diese Logik umdrehen und den Agenten die Wetterdaten abrufen lässt, erhalten Sie am Ende irgendwann eine sonnige Prognose, obwohl es tatsächlich regnet.

**Wann Workflows in Betracht gezogen werden sollten:**
- Sie haben eine bekannte Abfolge von Schritten, die in einer bestimmten Reihenfolge ausgeführt werden müssen
- Sie benötigen Beobachtbarkeit auf jeder Stufe (Protokolle, Metriken, Zeitmessung)
- Sie benötigen Wiederholungslogik für unzuverlässige externe APIs
- Geschäftsregeln dürfen nicht "interpretiert" werden – sie müssen exakt befolgt werden

---

## Das Kontextfenster-Problem, über das niemand spricht

Es gibt ein Muster, das ich immer wieder sehe. Jemand baut einen Chatbot. In den Tests funktioniert er hervorragend. Im Produktivbetrieb haben die Nutzer jedoch längere Konversationen, und plötzlich verliert der Bot den Überblick.

Der Entwickler schaut in die Logs und stellt fest, dass er mit jedem Anfragen die gesamte Konversationshistorie sendet. Alle 47 Nachrichten. Er verschwendet Token und Kontextraum für Informationen, die zum größten Teil irrelevant sind.
```

Schlimmer noch, gibt es ein Phänomen, das Forscher „verloren in der Mitte“ nennen, bei dem Modelle schlechter abschneiden, wenn relevante Informationen in einem langen Kontext vergraben sind. Das Modell sieht buchstäblich den Wald vor lauter Bäumen nicht.  

Das Senden der gesamten Konversationshistorie fühlt sich sicher an. Sie geben dem Modell „alle Informationen“. Doch Sie erschweren damit tatsächlich dem Modell, sich auf das Wesentliche zu konzentrieren.  

### Arbeitsgedächtnis vs. Langzeitgedächtnis  

Das Mastra-Gedächtnissystem bietet beides. Das Arbeitsgedächtnis hält aktuelle Nachrichten im Kontextfenster. Das semantische Gedächtnis durchsucht historische Nachrichten, wenn die aktuelle Anfrage relevanzverdächtig erscheint.  

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

So sieht das in der Praxis aus. Ein Nutzer fragt: „Welches italienische Restaurant hast du letzte Woche empfohlen?“  

Ohne semantisches Gedächtnis sieht der Agent die letzten 20 Nachrichten. Die Restaurantempfehlung war Nachricht 487 von 506. Sie ist weg. Der Agent antwortet: „Ich habe diese Information nicht.“

Mit semantischem Gedächtnis:  
1. Die Anfrage wird eingebettet: `[0.234, -0.567, 0.891, ...]`  
2. Die Einbettung wird mit historischen Nachrichten verglichen  
3. Nachricht 487 („Ich würde Trattoria Bella empfehlen – ihre Carbonara ist unglaublich“) erreicht eine Ähnlichkeit von 0.89  
4. Diese Nachricht wird in den aktuellen Kontext eingefügt  
5. Der Agent antwortet: „Ich habe Trattoria Bella empfohlen. Ihre Carbonara hat meine Aufmerksamkeit erregt.“  

Der Agent scheint eine perfekte Erinnerung zu haben, während er nur einen Bruchteil des Kontextfensters nutzt. Das ist nicht nur cleveres Engineering – es ist funktionell notwendig, sobald Gespräche einige Dutzend Nachrichten überschreiten.  

---

## Koordination durch Agentennetze  

Manchmal braucht man sowohl Struktur als auch Flexibilität. Reine Workflows sind zu starr. Reine Agenten sind zu unvorhersehbar.  

Agentennetze bieten dir einen Koordinator, der entscheidet, welcher spezialisierte Agent oder Workflow basierend auf der Aufgabe aktiviert wird. Denke daran als intelligenten Lastenausgleichs-Controller für AI-Fähigkeiten.

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

Wenn Sie diese Netzwerkabfrage ausführen, analysiert der Koordinator die Anfrage und leitet sie entsprechend weiter:  
- „I need facts about X“ löst den Forschungsagenten aus  
- „Plan a weekend in Seattle“ führt den Aktivitätsplaner-Workflow aus  
- „Write a report on Y“ aktiviert den Schreibagenten  

Dieses Muster skaliert besser als das Versuchen, alles in einen einzigen Mega-Agenten zu packen. Spezialisierung ermöglicht fokussierte Expertise. Der Koordinator koordiniert die Weiterleitung. Jeder Teil macht das, wofür er am besten geeignet ist.  

---

## Zusammenfassung  

Reale Produktions-AI-Systeme benötigen Architektur, nicht nur Prompts. Sie bauen verteilte Systeme auf, bei denen einige Knoten zufällig LLMs sind.  

Workflows geben Ihnen Sicherheit, wenn Dinge exakt in der richtigen Reihenfolge ablaufen müssen. Memory bietet Kontext ohne Ihr Token-Budget zu verschlingen. Agentennetze erlauben es, Komplexität aus einfacheren Komponenten zusammenzusetzen.

Keiner dieser Ansätze ist glamourös. Doch nachdem ich genug „vollständig autonome Agenten“ in der Produktion scheitern sah, schätze ich langweilige Zuverlässigkeit mehr als aufregende Unvorhersehbarkeit.  

Das kann variieren, aber aus meiner Erfahrung sind die Systeme, die tatsächlich ausgeliefert und laufen bleiben, jene, die LLMs als Komponenten in einer größeren Architektur betrachten und nicht als Zauberkästen, die alles lösen.  

### Ressourcen  

- [Mastra Workflows Dokumentation](https://mastra.ai/docs/workflows/overview)  
- [Mastra Memory Dokumentation](https://mastra.ai/docs/memory/overview)  
- [Vollständigen Demo-Code](https://github.com/justsml/mastra-examples)  

## Lesen Sie die Serie  

1. [LLM-Routing](../llm-routing-mastra-ai)  
2. [Sicherheit & Schutzmaßnahmen](../mastra-security-guardrails)  
3. [MCP & Tool-Integrationen](../mastra-mcp-tool-integrations)  
4. **Workflows & Memory** (Dieser Beitrag)
````
