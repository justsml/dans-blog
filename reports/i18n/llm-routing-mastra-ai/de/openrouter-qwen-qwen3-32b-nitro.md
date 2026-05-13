# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/de/index.mdx
- Validation: passed
- Runtime seconds: 11.97
- Input tokens: 4408
- Output tokens: 4519
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001437
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: ''
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
Die meisten Engineering-Teams wählen einen Sprachmodell und bleiben dabei. Ein Anbieter, ein Modell, alle Aufgaben. Es ist, als würde man eine Person anstellen, die sowohl Ihren Code schreibt, als auch Ihre Texte verfasst und Ihre Steuererklärung macht, nur weil sie im ersten Vorstellungsgespräch gut war.  

Zu jedem Zeitpunkt ist ein Modell besser in Code, ein anderes in langen, chaotischen Kontexten, und ein weiteres das billigste, langweilige Arbeitspferd für Klassifizierungsaufgaben. Die Namen ändern sich. Die Form des Problems nicht. Die Annahme, ein Modell sei in allem hervorragend, bedeutet, dass Sie entweder für einfache Aufgaben überzahlen oder bei spezialisierten Aufgaben minderwertige Ergebnisse akzeptieren.  

Ich habe gesehen, wie ein Team Tausende Dollar verheizt hat, indem es Sentiment-Analysen über ein Modell durchführte, das 30 Dollar pro Million Tokens kostet, obwohl ein Modell für 0,50 Dollar die Arbeit genauso gut erledigt hätte. Einfache JSON-Formatierung, grundlegende Klassifizierungsaufgaben – alles lief über ihren Premium-Anbieter. Das Einzige, das sich erhitzt hat, war ihre AWS-Rechnung.  

Es gibt eine bessere Methode, und sie ist nicht besonders kompliziert.  

## Delegation statt Devotion  

Was, wenn Sie Anfragen an das Modell weiterleiten könnten, das tatsächlich am besten für diese spezifische Aufgabe geeignet ist? Nutzen Sie Ihr teures Leistungsmodell für die schwierigen Aufgaben, aber lassen Sie einfache Parsing- und Formatierungsaufgaben an etwas Billigerem abwälzen. Nutzen Sie die Vorteile mehrerer Anbieter, ohne sie manuell in Ihrem Code-Stack jonglieren zu müssen.

Mastra ermöglicht es Ihnen, genau dieses System aufzubauen. Sie richten Spezialisten-Agenten für verschiedene Arten von Aufgaben ein und erstellen anschließend einen Router-Agenten, der entscheidet, welcher Spezialist welche Anfrage bearbeiten soll. Die unten genannten Modell-IDs sind Beispiele und keine Rangliste. Ersetzen Sie sie durch die aktuellen Modelle, die Ihre Evaluierungen gewinnen und zu Ihrem Budget passen.  

Stellen Sie es sich so vor: Sie haben drei Spezialisten in Ihrem Team.  

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

Jeder hat seine Aufgabe. Ihr Codierungs-Agent sollte das Modell sein, das Ihre repo-spezifischen Codierungs-Eval gewinnt. Ihr Langkontext-Agent sollte derjenige sein, der Ihre echten Dokumente ohne Verformung überlebt. Ihr allgemeiner Agent sollte günstig, zuverlässig und in der besten Weise langweilig sein.  

Hier wird es spannend. Sie fügen einen Router hinzu, der als intelligenter Proxy fungiert:  

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

Der Router selbst läuft auf einem leichtgewichtigen Modell, da er lediglich Entscheidungen darüber trifft, wohin der Traffic geleitet wird. Sie zahlen nicht Premium-Kosten dafür, herauszufinden, welches andere Premium-Modell eingesetzt werden soll. Messen Sie dies ebenfalls: Ein schlechter Router verwandelt stillschweigend Einsparungen in Fehlwege.  

Wenn jemand nach einer Implementierung des Bubblesort-Algorithmus fragt, erkennt der Router dies als Codieraufgabe und übergibt sie an Ihren Code-Spezialisten. Ein kreatives Schreibprompt? Das geht an das Modell, das Sie für Stimme und Reichweite ausgewählt haben. Eine faktenbasierte Frage zu historischen Ereignissen? Leiten Sie sie an den allgemeinen Agenten weiter, idealerweise mit Retrieval, wenn Aktualität oder Zitierfähigkeit wichtig sind.

## Praktische Vorteile

**Kostenersparnis ist wichtiger, als Sie denken.** Ein kleiner Router-Modell, der Entscheidungen zur Delegation trifft, kostet einen Bruchteil des Aufwands, alle Anfragen über Ihren teuersten Anbieter laufen zu lassen. Im Laufe der Zeit, besonders in großem Maßstab, summiert sich dies zu echtem Geld. Sie zahlen nur für die leistungsstarken Intelligenzressourcen, wenn Sie sie tatsächlich benötigen.

**Die Qualität verbessert sich, wenn Sie Modelle an Aufgaben anpassen.** Der beste Modell variiert je nach Monat, Aufgabenart und Prompt-Struktur. Deshalb sollte die Router-Schicht von Ihren Evaluierungen abhängen, nicht von dem Modell, das zufällig in der Woche, in der Sie die Integration geschrieben haben, in sozialen Medien dominiert hat.

**Resilienz wird ein Nebenprodukt.** Wenn OpenAI einen seiner periodischen Ausfälle hat (und das passiert), kann Ihr Router den Datenverkehr an andere Anbieter weiterleiten. Sie müssen nicht aufgeschmissen sein, bis eine bestimmte API wieder online ist.

Es geht nicht darum, clever zu sein, nur um clever zu sein. Es geht darum, Systeme zu bauen, die sowohl finanziell als auch technisch Sinn machen. Sie würden nicht den gleichen Hammer für jede Baumaßnahme verwenden, und Sie sollten vermutlich auch nicht das gleiche Sprachmodell für jede KI-Aufgabe verwenden.

Die Stärke dieses Ansatzes ist, dass sich Ihr Anwendungscode nicht ändert. Sie rufen weiterhin nur Ihren Router-Agenten auf. Die Komplexität der Entscheidung, welches Modell für welche Aufgabe verwendet wird, ist an einem Ort konzentriert und einmalig konfiguriert, anstatt in Ihrer Codebasis überall in bedingte Logik verstreut zu sein.

### Ressourcen

- [Dokumentation von Mastra.ai](https://mastra.ai/docs)
- [GitHub-Repository von Mastra](https://github.com/mastra-ai/mastra)

## Lesen Sie die Serie

1. **LLM-Routing** (Dieser Beitrag)
2. [Sicherheit & Schutzvorrichtungen](../mastra-security-guardrails)
3. [MCP & Tool-Integrationen](../mastra-mcp-tool-integrations)
4. [Workflows & Gedächtnis](../mastra-workflows-memory)
````
