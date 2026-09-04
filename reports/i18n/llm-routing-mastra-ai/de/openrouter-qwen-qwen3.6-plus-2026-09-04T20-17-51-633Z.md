# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: de
- Model: openrouter/qwen/qwen3.6-plus
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/de/index.mdx
- Validation: deferred
- Runtime seconds: 145.31
- Input tokens: 3676
- Output tokens: 8441
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 3664
- Estimated cost: $0.017655
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: ''
modified: '2026-09-04'
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
Die meisten Engineering-Teams entscheiden sich für ein Sprachmodell und bleiben dabei. Ein Provider, ein Modell, alle Aufgaben. Das ist, als würde man eine einzige Person für Coding, Copywriting und Steuererklärung einstellen, nur weil sie im ersten Vorstellungsgespräch gut abgeschnitten hat.

Zu jedem Zeitpunkt ist ein Modell besser im Coden, ein anderes verarbeitet lange, unstrukturierte Kontexte besser, und ein drittes ist das günstigste, langweilige Arbeitstier für Klassifizierungsaufgaben. Die Namen ändern sich. Die Form des Problems bleibt gleich. Ein einzelnes Modell so zu behandeln, als sei es für alles gleich gut geeignet, bedeutet entweder, dass du für einfache Aufgaben zu viel zahlst oder bei spezialisierten Tasks unterdurchschnittliche Ergebnisse bekommst.

Ich habe miterlebt, wie ein Team tausende Dollar verbrannte, weil es Sentiment-Analysen über ein Modell laufen ließ, das 30 $ pro Million Tokens kostete – dabei hätte ein 0,50-$-Modell den Job genauso gut erledigt. Einfaches JSON-Formatting, grundlegende Klassifizierungsaufgaben, alles über ihren Premium-Provider. Das Einzige, was dabei heiß lief, war ihre AWS-Rechnung.

Es gibt einen besseren Weg, und der ist nicht besonders kompliziert.

## Delegation statt blinder Treue

Was wäre, wenn du Requests gezielt an das Modell routen könntest, das für die jeweilige Aufgabe tatsächlich am besten geeignet ist? Nutze dein teures Schwergewicht für die harten Brocken, aber delegiere simples Parsing und Formatting an günstigere Alternativen. So erhältst du die Vorteile mehrerer Provider, ohne sie manuell in deiner Codebase jonglieren zu müssen.

Mastra ermöglicht genau den Aufbau solcher Systeme. Du richtest spezialisierte Agenten für verschiedene Arbeitsarten ein und erstellst dann einen Supervisor-Agenten, der entscheidet, welcher Spezialist welchen Request bearbeiten soll. Die unten stehenden Model-IDs verwenden Mastras aktuelles `provider/model`-String-Format; sie sind Beispiele, kein Leaderboard. Tausche sie gegen die aktuellen Modelle aus, die in deinen Evals gewinnen und in dein Budget passen.

Stell es dir so vor: Du hast drei Spezialisten in deinem Team.

```typescript
// ./src/mastra/index.ts
import { Mastra } from '@mastra/core/mastra';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export const claudeAgent = new Agent({
  id: 'claude-agent',
  description: 'Handles implementation, refactoring, and code review tasks.',
  instructions: 'You are an expert engineer. Write bugs? You are fired.',
  model: process.env.CODE_MODEL ?? 'anthropic/claude-sonnet-4-6',
});

export const geminiAgent = new Agent({
  id: 'gemini-agent',
  description: 'Handles long-context synthesis and messy document analysis.',
  instructions: 'You are a creative writer. Be weird.',
  model: process.env.LONG_CONTEXT_MODEL ?? 'google/gemini-2.5-pro',
});

export const gptAgent = new Agent({
  id: 'gpt-agent',
  description: 'Handles routine classification, formatting, and general Q&A.',
  instructions: 'You are a helpful assistant. Be boring.',
  model: process.env.GENERAL_MODEL ?? 'openai/gpt-5-mini',
});
```

Jeder hat eine feste Aufgabe, und das `description`-Feld ist Teil der Routing-Entscheidungsgrundlage. Dein Code-Agent sollte das Modell sein, das deine repo-spezifischen Coding-Evals besteht. Dein Long-Context-Agent sollte derjenige sein, der deine echten Dokumente verarbeitet, ohne den mittleren Teil in Brei zu verwandeln. Dein Generalist sollte günstig, zuverlässig und im besten Sinne langweilig sein.

Hier wird es interessant. Du fügst einen leichtgewichtigen Supervisor hinzu, der als intelligenter Proxy agiert:

```typescript
export const supervisorAgent = new Agent({
  id: 'supervisor-agent',
  name: 'The Boss',
  instructions: `You route work to the right specialist.
  Delegate coding work to claude-agent.
  Delegate long-context document work to gemini-agent.
  Delegate routine classification and formatting to gpt-agent.
  Do not do specialist work yourself unless delegation is unnecessary.`,
  model: process.env.ROUTER_MODEL ?? 'openai/gpt-5-mini',
  agents: {
    claudeAgent,
    geminiAgent,
    gptAgent,
  },
  memory: new Memory({
    storage: new LibSQLStore({ id: 'router-memory', url: 'file:mastra.db' }),
  }),
});

export const mastra = new Mastra({
  agents: { supervisorAgent, claudeAgent, geminiAgent, gptAgent },
});
```

Der Supervisor selbst kann auf einem leichtgewichtigen Modell laufen, da er hauptsächlich entscheidet, wohin der Traffic geleitet wird. Du zahlst keine Premium-Preise, um herauszufinden, welches andere Premium-Modell du nutzen sollst. Miss das auch; ein schlechter Routing-Layer verwandelt Einsparungen leise in Fehlroutings.

Wenn jemand nach einer Bubble-Sort-Implementierung fragt, erkennt der Router das als Coding-Aufgabe und reicht sie an deinen Code-Spezialisten weiter. Ein Prompt für kreatives Schreiben? Das geht an das Modell, das du für Stimme und Bandbreite ausgewählt hast. Eine faktische Frage zu historischen Ereignissen? Route sie an den Generalisten, idealerweise mit Retrieval, wenn Aktualität oder Quellenangaben relevant sind.

## Die praktischen Vorteile

**Kosteneffizienz ist wichtiger, als du denkst.** Ein kleines Routing-Modell, das Delegationsentscheidungen trifft, kostet nur einen Bruchteil davon, jeden einzelnen Request durch deinen teuersten Provider zu jagen. Über die Zeit, besonders im Scale, summiert sich das zu echtem Geld. Du zahlst nur für die leistungsstarke Intelligenz, wenn du sie wirklich brauchst.

**Die Qualität steigt, wenn du Modelle auf Aufgaben abstimmst.** Der Gewinner wechselt je nach Monat, Aufgabe und Prompt-Struktur. Deshalb sollte der Routing-Layer von deinen Evals abhängen, nicht davon, welches Modell auf Twitter gerade die Nase vorn hatte, als du die Integration geschrieben hast.

**Resilienz wird möglich, nicht automatisch.** Der obige Supervisor wiederholt einen fehlgeschlagenen Provider-Call nicht über einen anderen Agenten und hängt für die Routing-Entscheidung selbst von OpenAI ab. Wenn Provider-Failover wichtig ist, füge eine explizite Retry-/Fallback-Policy im Anwendungscode hinzu, halte den Fallback-Router auf einem anderen Provider und teste den Fehlerpfad. Eine Ansammlung von Agenten ist kein Circuit Breaker, nur weil die Modelle unterschiedliche Logos tragen.

Es geht nicht darum, um der Cleverness willen clever zu sein. Es geht darum, Systeme zu bauen, die sowohl finanziell als auch technisch Sinn machen. Du würdest auch nicht denselben Hammer für jede Bauaufgabe verwenden, und du solltest wahrscheinlich auch nicht dasselbe Sprachmodell für jede AI-Aufgabe nutzen.

Der Vorteil dieses Ansatzes ist, dass dein Anwendungscode kein Verzweigungs-Labyrinth benötigt. Du rufst weiterhin nur einen Agenten auf. Die Komplexität der Entscheidung, welches Modell für welche Aufgabe genutzt wird, liegt an einer Stelle, einmal konfiguriert, statt in deiner gesamten Codebase in einer Unmenge an Conditional Logic verstreut zu sein.

### Ressourcen

- [Mastra.ai-Dokumentation](https://mastra.ai/docs)
- [Mastra-GitHub-Repository](https://github.com/mastra-ai/mastra)

## Die Serie lesen

1. **LLM-Routing** (Dieser Beitrag)
2. [Sicherheit & Guardrails](/mastra-security-guardrails)
3. [MCP & Tool-Integrationen](/mastra-mcp-tool-integrations)
4. [Workflows & Memory](/mastra-workflows-memory)
````
