# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/de/index.mdx
- Validation: passed
- Runtime seconds: 8.44
- Input tokens: 6955
- Output tokens: 2132
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.000655
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Hör auf, LLMs Mathe machen zu lassen'
subTitle: Sie sind schlecht darin. So beheben Sie das.
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
Wissen Sie, was an Sprachmodellen seltsam ist? Sie können Quantenmechanik erklären, Gedichte schreiben und Ihren TypeScript‑Code debuggen … aber wenn Sie sie bitten, 18472 mal 9347 zu multiplizieren, besteht eine beträchtliche Chance, dass sie Ihnen selbstbewusst eine Antwort geben, die um Tausende daneben liegt.

Das hat mich früher verwirrt, bis ich begriff, was wir ihnen eigentlich abverlangen. Wir verlangen von einer Mustererkennungs‑Engine, dass sie ein Taschenrechner wird. Das ist, als würde man einen Turner bitten, Ihr Kassenbuch zu führen, weil er das Konzept von „Balance“ versteht.

Der Punkt ist: LLMs führen keinerlei Berechnungen durch. Wenn Sie GPT oder Claude fragen, was 2 + 2 ergibt, addieren sie nicht. Sie sagen lediglich voraus, dass „4“ das wahrscheinlichste Token nach „2 + 2 =“ ist. Meistens funktioniert das, weil solche Muster in den Trainingsdaten vorkommen. Gehen Sie jedoch über einfache Arithmetik hinaus, zu mehrstufigen Berechnungen oder zu Zahlen, die im Training selten waren, und Sie würfeln im Grunde.

Ich bin kürzlich selbst darauf gestoßen, als ich Code überprüfte, der ein Top‑Modell zur Berechnung von Hypothekenraten einsetzte. Das Modell antwortete mit voller Zuversicht – und lag dabei um 400 $/Monat` daneben. Genau solche Fehler sind relevant.

Selbst wenn Modelle beim „Reasoning“ besser werden (GPT‑5 soll Verbesserungen zeigen), bleiben sie bei komplexen Mustern, nicht bei symbolischer Berechnung. Für kreative und natürliche Sprachaufgaben ist diese probabilistische Natur das, was sie magisch macht. Für Mathematik? Nicht so sehr.

## Was das tatsächlich löst?

Die Antwort wartet nicht auf intelligentere Modelle. Sie besteht darin, dem Modell das richtige Werkzeug für die Aufgabe zu geben.

Denken Sie darüber nach, wie Sie dieses Problem lösen würden, wenn Sie ein nicht‑KI‑System bauen würden. Sie würden keine eigene Mathematik‑Logik schreiben, sondern eine Bibliothek verwenden. Dasselbe Prinzip gilt hier, nur dass wir dem LLM jetzt beibringen, wann und wie es diese Bibliothek nutzt.

Tool‑Calling in modernen AI‑SDKs ermöglicht es uns, dem Modell strukturierte Funktionen zur Verfügung zu stellen, die es aufrufen kann. Anstatt das LLM zu zwingen, so zu tun, als kenne es Mathematik, geben wir ihm etwas, das das tatsächlich tut: eine symbolische Mathematik‑Engine.

Ich habe dafür [AI SDK v5 und v6](https://ai-sdk.vercel.ai/) verwendet, zusammen mit dem CortexJS Compute Engine. Das SDK übernimmt Orchestrierung und Tool‑Routing, während CortexJS alles von einfacher Arithmetik bis hin zur Analysis erledigt. Die Trennung der Verantwortlichkeiten ist überraschend sauber.

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## Bau des Math‑Tools

Die Implementierung ist einfacher, als man erwarten könnte. Was wir bauen, ist eine Brücke zwischen dem natürlichen Sprachverständnis des LLM und echter mathematischer Berechnung.

```typescript
import { generateText, stepCountIs, tool } from 'ai';
import { ComputeEngine } from '@cortex-js/compute-engine';
import { z } from 'zod';

// Initialize the engine once
const ce = new ComputeEngine();

const mathTool = tool({
  description: 'Evaluate mathematical expressions and solve equations with guaranteed accuracy. MUST be used for all mathematical operations to verify correctness - do not attempt mental math. Supports arithmetic, algebra, calculus, and complex operations. Can process multiple expressions at once.',
  parameters: z.object({
    expressions: z.array(z.string()).describe(
      'Array of mathematical expressions in LaTeX or plain notation, e.g. ["2 + 2", "\\frac{x^2 + 1}{x - 1}", "\\int x^2 dx"]'
    ),
  }),
  execute: async ({ expressions }) => {
    // Process all expressions in parallel (or detailed batch)
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

Einige Punkte, die hier beachtet werden sollten:

Die Beschreibung trägt die Hauptlast. Die Formulierung „MUSS verwendet werden“ wirkt zwar streng, aber aus Erfahrung ist eine klare Anweisung an das Modell, wann ein Tool zu nutzen ist, der Unterschied zwischen gelegentlichem Funktionieren und zuverlässigem Arbeiten. Man kann das als Prompt‑Engineering auf Tool‑Ebene bezeichnen.

Das Batch‑Processing über das `expressions`‑Array ist wichtiger, als man zunächst annimmt. Jeder Modellaufruf kostet Latenz. Wenn man ein Gleichungssystem löst oder mehrstufige Mathematik ausführt, erzeugt das sequentielle Verarbeiten eine miserable Nutzererfahrung. Batching bedeutet einen Round‑Trip, um zehn Aufgaben zu lösen.

Der Einsatz einer symbolischen Engine statt eines simplen `eval()` (bitte kein `eval()` verwenden) liefert echtes mathematisches Verständnis. Die Engine parst die Intention, verarbeitet LaTeX‑Notation und kann mit Ableitungen sowie Integralen arbeiten. Wir führen nicht nur Berechnungen aus, wir führen Mathematik aus.

Die Fehlerbehandlung ist pro Ausdruck abgegrenzt. Scheitert eine Berechnung, wird nur dieser Fehler zurückgegeben, während die übrigen weiter verarbeitet werden. So sieht das Modell, welche Teile funktioniert haben und welche nicht, und kann im nächsten Schritt potenziell selbst korrigieren.

## In die Praxis umsetzen

Lassen Sie uns etwas hineinwerfen, das ein reines Modell typischerweise halluzinieren lässt:

```typescript
import { anthropic } from '@ai-sdk/anthropic';

const { text } = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  prompt: 'Calculate 18472 × 9347, divide by 127, then take the square root of the result.',
  tools: { mathTool },
  stopWhen: stepCountIs(5), // Allow up to five model/tool steps
});

console.log(text);
```

Das Modell erkennt die Mathematik, stellt fest, dass Präzision nötig ist, ruft das Tool auf, erhält das exakte Ergebnis und erklärt es anschließend in natürlicher Sprache. Jeder Baustein tut das, wofür er am besten geeignet ist.

## Über reine Arithmetik hinaus

Da wir eine symbolische Engine einsetzen, bewältigt dieser Ansatz Aufgaben, die einfache Taschenrechner‑Tools nicht anfassen können.

Algebraische Gleichungen lösen? „Solve these equations: 3x + 7 = 22 and 2y - 5 = 13“ funktioniert einwandfrei.

Analysis benötigen? „Find the derivative of x^3 + 2x^2 and evaluate it at x = 2“ ist nur ein weiterer Tool‑Aufruf.

Die LaTeX‑Unterstützung ist besonders praktisch, wenn Sie Bildungs‑Apps bauen. Die Engine versteht LaTeX‑Eingaben nativ und kann Ergebnisse im für die Darstellung geeigneten Format zurückgeben. Kein zusätzliches Parsen nötig.

## Das größere Bild

Ich halte dieses Muster für relevanter als nur Mathematik. Was wir wirklich tun, ist die Grenzen von LLMs anerkennen und gleichzeitig ihre Stärken nutzen. Sie sind hervorragend darin, Absichten zu verstehen, natürliche Sprache zu verarbeiten und Workflows zu orchestrieren. Sie sind jedoch keine Taschenrechner, Datenbanken oder Dateisysteme.

Jedes Mal, wenn wir versuchen, ein LLM zu zwingen, etwas Deterministisches zu leisten, kämpfen wir gegen seine Natur. Kombinieren wir jedoch dieses Sprachverständnis mit spezialisierten Werkzeugen, die die deterministischen Teile übernehmen, dann wird es interessant.

Das Mathematik‑Tool ist nur ein Beispiel. Das gleiche Prinzip gilt für Datumsmanipulation, finanzielle Berechnungen, Bildverarbeitung, Datenbankabfragen … überall dort, wo Präzision wichtiger ist als Kreativität. Lassen Sie das Modell verstehen, was der Nutzer will, und übergeben Sie die eigentliche Arbeit an etwas, das für diese Aufgabe gebaut wurde.

Es ist ein Wandel in der Art, wie wir mit KI bauen. Nicht „kann das Modell das?“ sondern „kann das Modell das orchestrieren?“ – ein kleiner Unterschied in der Formulierung, aber ein signifikanter Unterschied in der Zuverlässigkeit.

## Ressourcen

- [Vercel AI SDK Dokumentation](https://sdk.vercel.ai/docs)
- [CortexJS Compute Engine](https://cortexjs.io/compute-engine/)
- [Leitfaden für Tool‑Aufrufe](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [AI SDK Beispiel‑Repository](https://github.com/vercel/ai/tree/main/examples)
````
