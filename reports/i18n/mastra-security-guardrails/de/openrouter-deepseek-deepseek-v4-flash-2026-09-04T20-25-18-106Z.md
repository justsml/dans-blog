# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: de
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/de/index.mdx
- Validation: deferred
- Runtime seconds: 62.01
- Input tokens: 4534
- Output tokens: 7355
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002554
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: KI in der Produktion ist erschreckend (und wie man das behebt)
subTitle: Wenn Ihr Agent keine Schutz
modified: '2026-09-04'
tags:
  - ai
  - security
  - mastra
  - guardrails
  - privacy
  - pii
category: AI
subCategory: Security
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Niemand hat vor, ein unsicheres KI-System zu bauen. Du schreibst Anweisungen, testest Randfälle, fügst ein paar Validierungsregeln hinzu. Dann findet jemand heraus, dass man den Bot dazu bringen kann, sich als Pirat auszugeben und Benutzerdaten preiszugeben. Oder eine Kreditkartennummer taucht in den Logs auf. Oder das Modell empfiehlt selbstbewusst ein Konkurrenzprodukt.

Die Kluft zwischen „funktioniert in der Demo“ und „sicher in der Produktion“ ist größer, als die meisten Teams erwarten.

Ein Teil des Problems ist, dass rohe LLMs keine Meinungen darüber haben, was sie tun oder lassen sollten. Sie sind Vorhersagemaschinen, die versuchen, jedes Muster fortzusetzen, das du gestartet hast. Gib ihnen einen Prompt, der wie „System-Override-Modus“ aussieht, und sie spielen fröhlich mit. Das ist kein Fehler im Modell; es ist einfach die Funktionsweise von Sprachmodellen.

Die meisten Frameworks reichen dir das Modell und wünschen viel Glück. Mastra geht anders vor: Es geht davon aus, dass du irgendwann Schutzmaßnahmen brauchst, und baut sie daher von Anfang an in die Agentenarchitektur ein.

---

## Prozessoren als Sicherheitsschichten

Der Kernmechanismus ist einfach. Bevor dein Prompt das Modell erreicht, durchläuft er eine Kette von Eingabeprozessoren. Nachdem das Modell geantwortet hat, kommen die Ausgabeprozessoren zum Zug. Jeder Prozessor kann den Inhalt in dieser Phase inspizieren, modifizieren oder blockieren.

Stell sie dir als Middleware für KI-Interaktionen vor. Du stapelst die, die du brauchst, konfigurierst ihr Verhalten, und sie werden automatisch bei jeder Anfrage ausgeführt.

### 1. Piraten abwehren (Prompt Injection)

Prompt-Injection-Angriffe sind kreativ geworden. Leute verwenden unsichtbare Unicode-Zeichen, schreiben Anweisungen in Base64 oder überzeugen das Modell, dass es sich im „Debug-Modus“ befindet, in dem die normalen Regeln nicht gelten. Die Techniken entwickeln sich ständig weiter.

Mastra enthält Prozessoren, die gängige Muster abfangen:

```typescript
// src/mastra/agents/secure-agent.ts
import { Agent } from '@mastra/core/agent';
import { PromptInjectionDetector, UnicodeNormalizer } from '@mastra/core/processors';

const GUARDRAIL_MODEL = 'openrouter/openai/gpt-oss-safeguard-20b';

export const secureAgent = new Agent({
  id: 'fortress-assistant',
  name: 'fortress-assistant',
  instructions: 'You are a secure assistant.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    // 1. Scrub invisible characters
    new UnicodeNormalizer({
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Detect the attempt
    new PromptInjectionDetector({
      model: GUARDRAIL_MODEL,
      threshold: 0.8,
      strategy: 'block', // Hard stop
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
      lastMessageOnly: true,
    }),
  ],
});
```

Der [`UnicodeNormalizer`](https://mastra.ai/reference/processors/unicode-normalizer) entfernt Steuerzeichen und reduziert Leerzeichen. Der [`PromptInjectionDetector`](https://mastra.ai/reference/processors/prompt-injection-detector) analysiert die bereinigte Eingabe auf Muster, die darauf hindeuten, dass jemand versucht, deine Anweisungen zu überschreiben.

Du konfigurierst, wie aggressiv die Erkennung sein soll (der `threshold`-Parameter) und was passieren soll, wenn sie auslöst (`block`, `warn`, `filter` oder `rewrite`).

### 2. Umgang mit PII

Kreditkartennummern in Logs, Sozialversicherungsnummern in Vektordatenbanken, E-Mail-Adressen, die länger als nötig gespeichert werden. Das sind die Arten von Problemen, die zu regulatorischen Problemen werden. Die Herausforderung ist, dass Benutzer nicht immer merken, dass sie sensible Daten in ein Chat-Fenster einfügen.

Der [`PIIDetector`](https://mastra.ai/reference/processors/pii-detector) sucht nach gängigen Mustern, bevor sie dein Modell erreichen oder in den Speicher geschrieben werden:

```typescript
import { Agent } from '@mastra/core/agent';
import { BatchPartsProcessor, PIIDetector } from '@mastra/core/processors';

export const privateAgent = new Agent({
  id: 'privacy-first-assistant',
  name: 'privacy-first-assistant',
  instructions: 'You are a helpful assistant that never stores personal information.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    new PIIDetector({
      model: GUARDRAIL_MODEL,
      detectionTypes: ['email', 'phone', 'credit-card', 'ssn'],
      threshold: 0.6,
      strategy: 'redact',
      redactionMethod: 'mask',
      instructions: 'Detect and mask personally identifiable information',
      lastMessageOnly: true,
    }),
  ],
  outputProcessors: [
    new BatchPartsProcessor({ batchSize: 10 }),
    new PIIDetector({
      model: GUARDRAIL_MODEL,
      strategy: 'redact',
      redactionMethod: 'mask',
    }),
  ],
});
```

Du kannst wählen, ob du redigieren, hashen, entfernen, durch typisierte Platzhalter ersetzen oder komplett blockieren möchtest. `PIIDetector` ist ein hybrider Prozessor: Platziere ihn in `inputProcessors`, `outputProcessors` oder beides, je nachdem wo das Risiko liegt. Bei gestreamtem Output solltest du Chunks vor dem Ausführen schwererer Klassifikatoren bündeln, damit du nicht für eine separate LLM-Prüfung bei jedem winzigen Token-Tropfen zahlst.

### 3. Inhaltsmoderation

### 3. Inhaltsmoderation

Modelle, die mit Internetdaten trainiert wurden, haben einiges gesehen. Ohne Filterung können sie gelegentlich Antworten produzieren, die deiner PR-Abteilung den Schweiß auf die Stirn treiben. Der [`ModerationProcessor`](https://mastra.ai/reference/processors/moderation-processor) fängt Inhalte ab, die gegen deine Richtlinien verstoßen:

```typescript
import { Agent } from '@mastra/core/agent';
import { BatchPartsProcessor, ModerationProcessor } from '@mastra/core/processors';

export const moderatedAgent = new Agent({
  id: 'safe-assistant',
  name: 'safe-assistant',
  instructions: 'You are a helpful assistant for a community platform.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    new ModerationProcessor({
      model: GUARDRAIL_MODEL,
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,
      strategy: 'block',
      instructions: 'Detect harmful content that violates community guidelines',
      lastMessageOnly: true,
    }),
  ],
  outputProcessors: [
    new BatchPartsProcessor({ batchSize: 10 }),
    new ModerationProcessor({
      model: GUARDRAIL_MODEL,
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      strategy: 'filter',
      chunkWindow: 1,
    }),
  ],
});
```

Das Interessante ist, dass du definierst, welche Kategorien für deinen Anwendungsfall relevant sind. Ein Tool für kreatives Schreiben erlaubt möglicherweise ausdrucksstärkere Inhalte als ein Kundendienstbot. Schwellwert und Strategie geben dir die Kontrolle darüber, wie streng die Filterung sein soll.

---

## Wenn es auslöst

Wenn ein Prozessor die `block`-Strategie verwendet, bricht Mastra die Generierung ab und macht das Ereignis als Tripwire-Metadaten zugänglich. Bei `generate()` prüfst du das Ergebnisobjekt:

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked by ${result.tripwire.processorId}`);
  console.log(`Reason: ${result.tripwire.reason}`);
  // "Blocked! Reason: Prompt injection detected."
  return 'Request blocked by policy.';
}
```

Bei Streaming-Aufrufen horchst du auf `tripwire`-Chunks in `fullStream`. Dieses Muster ermöglicht dir, Sicherheitsereignisse so zu behandeln, wie es für deine Anwendung sinnvoll ist. Du kannst sie zur Analyse protokollieren, eine generische Fehlermeldung zurückgeben oder einen risikoarmen Fall von `block` auf `warn` umstellen, während du die Schwellwerte justierst. Die Werte `processorId` und `reason` verraten dir, welcher Prozessor den Inhalt markiert hat – hilfreich beim Debuggen von Fehlalarmen.

---

## Was das nicht löst

Prozessoren fangen viel ab, aber sie sind keine Zauberei. Ein entschlossener Angreifer mit genug Zeit wird vermutlich einen Prompt finden, der durchschlüpft. Modelle halluzinieren gelegentlich auf eine Weise, die Prozessoren nicht vorhersagen können. Und es gibt immer einen Trade-Off zwischen Sicherheit und Flexibilität: Je strenger deine Regeln, desto wahrscheinlicher blockierst du legitime Anwendungsfälle.

Der Wert liegt nicht in perfektem Schutz. Es geht darum, eine systematische Methode zu haben, um die üblichen Probleme zu handhaben, die im Produktivbetrieb mit Sicherheit auftauchen. Du kannst die Empfindlichkeit anpassen, während du lernst, was deine Nutzer tatsächlich tun. Du kannst benutzerdefinierte Prozessoren für domänenspezifische Risiken hinzufügen. Und du kannst Verletzungs-Callbacks, Logs, Traces und App-weite Audit-Aufzeichnungen um denselben Kontrollpunkt herum aufziehen.

Die meisten Sicherheitsprobleme in produktiven KI-Systemen sind keine ausgeklügelten Angriffe. Es sind Leute, die Daten kopieren und einfügen, die sie nicht sollten, oder die durch Versuch und Irrtum entdecken, dass der Bot Dinge tut, die du nicht beabsichtigt hast. Prozessoren werden nicht jedes mögliche Problem stoppen, aber sie machen die offensichtlichen deutlich schwieriger.

### Resources

- [Mastra Guardrails Documentation](https://mastra.ai/docs/agents/guardrails)
- [Mastra Processors Documentation](https://mastra.ai/docs/agents/processors)
- [Mastra Agent Approval](https://mastra.ai/docs/agents/agent-approval)
- [Mastra GitHub Repository](https://github.com/mastra-ai/mastra)

## Read the Series

1. [LLM Routing](../llm-routing-mastra-ai)
2. **Security & Guardrails** (Dieser Beitrag)
3. [MCP & Tool Integrations](../mastra-mcp-tool-integrations)
4. [Workflows & Memory](../mastra-workflows-memory)
````
