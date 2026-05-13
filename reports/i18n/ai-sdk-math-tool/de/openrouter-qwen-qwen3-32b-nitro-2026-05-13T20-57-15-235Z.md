# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/de/index.mdx
- Validation: deferred
- Runtime seconds: 11.68
- Input tokens: 5162
- Output tokens: 5158
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001651
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Hören Sie auf, LLMs Mathe rechnen zu lassen'
subTitle: Sie sind darin schlecht. So beheben Sie es.
date: '2026-01-06'
modified: '2026-01-07'
tags:
  - ai
  - ai-sdk
  - typescript
  - math
  - tools
  - patterns
category: AI
subCategory: Engineering
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Was an Sprachmodellen seltsam ist? Sie können Quantenmechanik erklären, Gedichte schreiben und Ihren TypeScript-Code debuggen... aber fragen Sie sie, 18472 mit 9347 zu multiplizieren, und es besteht eine gute Chance, dass sie Ihnen mit großer Sicherheit etwas zurückgeben, das um Tausende falsch liegt.  

Das hat mich früher verwirrt, bis mir klar wurde, was wir tatsächlich von ihnen verlangen. Wir bitten eine Mustererkennungsmaschine, eine Rechenmaschine zu sein. Das ist, als würde man einen Turner auffordern, Ihr Kassenbuch auszugleichen, weil sie das Konzept von „Ausgewogenheit“ verstehen.  

Die Sache ist die: LLMs rechnen nichts. Wenn Sie GPT oder Claude fragen, was 2 + 2 ergibt, addieren sie nicht. Sie prognostizieren, dass „4“ der Token ist, der am wahrscheinlichsten nach „2 + 2 =“ kommt. Die meiste Zeit funktioniert das gut, weil diese Muster in ihren Trainingsdaten existieren. Doch sobald Sie zu mehrschrittigen Berechnungen oder Zahlen wechseln, die im Training nicht häufig vorkamen, wirft das im Grunde einen Münzwurf.  

Ich bin kürzlich direkt auf dieses Problem gestoßen, als ich Code überprüfte, der ein erstklassiges Modell verwendet hat, um Hypothekenzahlungen zu berechnen. Das Modell antwortete mit voller Sicherheit. Es lag aber um 400 US-Dollar pro Monat daneben. Das ist die Art Fehler, die zählt.  

Selbst wenn Modelle besser im Schließen von Schlussfolgerungen werden (GPT-5 soll Verbesserungen zeigen), führen sie immer noch fortgeschrittene Mustererkennung durch, nicht symbolische Berechnung. Für kreative Arbeit und natürliche Sprachaufgaben ist diese wahrscheinlichkeitstechnische Natur genau das, was sie magisch macht. Für Mathematik? Nicht so sehr.  

## Was löst das tatsächlich?  

Die Antwort besteht nicht darin, auf schlauere Modelle zu warten. Sie müssen dem Modell das richtige Werkzeug für die Aufgabe geben.  

Denken Sie darüber nach, wie Sie dieses Problem lösen würden, wenn Sie ein nicht-AI-System bauen würden. Sie würden keine benutzerdefinierte Math-Logik schreiben, sondern eine Bibliothek heranziehen. Das gleiche Prinzip gilt hier, außer dass wir jetzt dem LLM beibringen, wann und wie es diese Bibliothek nutzen soll.  

Tool-Calls in modernen AI-SDKs ermöglichen es uns, dem Modell strukturierte Funktionen an die Hand zu geben, die es aufrufen kann. Statt dem LLM beizubringen, dass es Mathematik kann, geben wir ihm etwas, das es tatsächlich kann: einen symbolischen Mathematikmotor.  

Ich verwende [AI SDK v5 und v6](../ai-sdk.vercel.ai/) dazu, gepaart mit CortexJS Compute Engine. Das SDK übernimmt Orchestrierung und Tool-Weiterleitung, während CortexJS alles von grundlegender Arithmetik bis hin zur Analysis abdeckt. Es ist eine überraschend saubere Trennung der Verantwortlichkeiten.

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## Aufbau des Mathematik-Tools

Die Umsetzung ist direkter, als Sie erwarten. Was wir bauen, ist eine Brücke zwischen dem natürlichen Sprachverständnis des LLM und der tatsächlichen mathematischen Berechnung.

```typescript
import { generateText, stepCountIs, tool } from 'ai';
import { ComputeEngine } from '@cortex-js/compute-engine';
import { z } from 'zod';

// Initialisiere den Motor einmal
const ce = new ComputeEngine();

const mathTool = tool({
  description: 'Bewerte mathematische Ausdrücke und löse Gleichungen mit garantiierter Genauigkeit. MÜSSEN für alle mathematischen Operationen verwendet werden, um Korrektheit zu prüfen – versuche keine Kopfrechnung. Unterstützt Arithmetik, Algebra, Analysis und komplexe Operationen. Kann mehrere Ausdrücke gleichzeitig verarbeiten.',
  parameters: z.object({
    expressions: z.array(z.string()).describe(
      'Array von mathematischen Ausdrücken in LaTeX oder Klartextnotation, z. B. ["2 + 2", "\\frac{x^2 + 1}{x - 1}", "\\int x^2 dx"]'
    ),
  }),
  execute: async ({ expressions }) => {
    // Verarbeite alle Ausdrücke parallel (oder detaillierte Batch)
    return expressions.map(expression => {
      try {
        const result = ce.parse(expression).evaluate();
        return {
          expression,
          result: result.toString(),
          latex: result.latex,
        };
      } catch (error) {
        return { 
          expression,
          error: (error as Error).message 
        };
      }
    });
  },
});
```

Einige Punkte, die erwähnenswert sind:

Die Beschreibung übernimmt die schwere Arbeit. Diese "MÜSSEN verwendet werden"-Formulierung mag aggressiv wirken, aber aus meiner Erfahrung ist es entscheidend, dem Modell explizit mitzuteilen, wann ein Tool genutzt werden soll – der Unterschied zwischen gelegentlichem und zuverlässigem Funktionieren. Betrachten Sie dies als Prompt-Engineering auf Tool-Ebene.

Die Batch-Verarbeitung über ein `expressions`-Array ist wichtiger, als Sie denken. Jeder Modellaufruf hat Latenz. Wenn Sie ein Gleichungssystem lösen oder mehrstufige Mathematik durchführen, führt die Einzelverarbeitung zu einem schlechten Benutzererlebnis. Batch-Verarbeitung bedeutet einen Roundtrip, um zehn Probleme zu lösen.

Die Verwendung eines symbolischen Motors anstelle von `eval()` (bitte nicht `eval()` nutzen) gibt uns ein echtes mathematisches Verständnis. Der Motor analysiert die Absicht, verarbeitet LaTeX-Formatierung und kann mit Ableitungen und Integralen arbeiten. Wir führen nicht nur Berechnungen durch, sondern Mathematik.

Die Fehlerbehandlung ist pro Ausdruck begrenzt. Wenn eine Berechnung fehlschlägt, geben wir diesen Fehler zurück, fahren aber mit dem Rest fort. Dies ermöglicht dem Modell, zu sehen, was funktioniert hat und was nicht, wodurch es sich im nächsten Schritt möglicherweise selbst korrigiert.

## Praxisbeispiel

Wir werfen etwas an ihn, was ein rohes Modell typischerweise falsch interpretieren würde:

```typescript
import { anthropic } from '@ai-sdk/anthropic';

const { text } = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  prompt: 'Berechne 18472 × 9347, teile durch 127 und ziehe anschließend die Quadratwurzel des Ergebnisses.',
  tools: { mathTool },
  stopWhen: stepCountIs(5), // Erlaube bis zu fünf Modell/Tool-Schritte
});

console.log(text);
```

Das Modell erkennt die Mathematik, erkennt, dass Präzision erforderlich ist, ruft das Tool auf, erhält das genaue Ergebnis und erklärt es anschließend in natürlicher Sprache. Jeder Komponente wird das tun, was sie am besten kann.

## Jenseits der Grundrechenarten

Da wir eine symbolische Engine verwenden, bewältigt dieser Ansatz Dinge, mit denen einfache Rechenwerkzeuge nicht umgehen können.

Gleichungen lösen? „Lösen Sie diese Gleichungen: 3x + 7 = 22 und 2y - 5 = 13“ funktioniert problemlos.

Analysis benötigt? „Finden Sie die Ableitung von x^3 + 2x^2 und bewerten Sie sie an der Stelle x = 2“ ist nur ein weiterer Tool-Aufruf.

Die LaTeX-Unterstützung ist besonders nützlich, wenn Sie Bildungs-Apps entwickeln. Die Engine versteht LaTeX-Eingaben von Grund auf und kann Ergebnisse formatiert für die Darstellung zurückgeben. Keine zusätzliche Parsing erforderlich.

## Der größere Kontext

Ich denke, dieses Muster ist über Mathematik hinaus relevant. Was wir wirklich tun, ist die Grenzen der LLMs anzuerkennen, während wir ihre Stärken nutzen. Sie sind erstaunlich darin, Absichten zu verstehen, natürliche Sprache zu verarbeiten und Workflows zu orchestrieren. Sie sind keine Taschenrechner, keine Datenbanken oder Dateisysteme.

Jedes Mal, wenn wir versuchen, einem LLM etwas Deterministisches abzuverlangen, arbeiten wir gegen ihre Natur. Doch wenn wir diese natürliche Sprachverarbeitung mit spezialisierten Tools kombinieren, die die deterministischen Aufgaben übernehmen? Dann wird es interessant.

Das Mathematik-Tool ist nur ein Beispiel. Das gleiche Prinzip gilt für Datumsmanipulation, Finanzberechnungen, Bildverarbeitung, Datenbankabfragen… überall dort, wo Präzision wichtiger ist als Kreativität. Lassen Sie das Modell verstehen, was der Benutzer will, und übertragen Sie die eigentliche Arbeit an etwas, das dafür gebaut wurde.

Es ist eine Verschiebung in der Art und Weise, wie wir mit KI bauen. Nicht „Kann das Modell das tun?“, sondern „Kann das Modell dies orchestrieren?“ Kleinster Unterschied in der Formulierung, große Differenz in der Zuverlässigkeit.

## Ressourcen

- [Vercel AI SDK Dokumentation](https://sdk.vercel.ai/docs)
- [CortexJS Compute Engine](https://cortexjs.io/compute-engine/)
- [Tool Calling Anleitung](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [AI SDK Beispiele-Repository](https://github.com/vercel/ai/tree/main/examples)
````
