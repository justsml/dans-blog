# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: de
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/de/index.mdx
- Validation: deferred
- Runtime seconds: 36.37
- Input tokens: 5017
- Output tokens: 5784
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002322
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Stellt LLMs keine Matheaufgaben
subTitle: Sie sind schlecht darin. So beheben Sie es.
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
Du weißt schon, was seltsam an Sprachmodellen ist? Sie können Quantenmechanik erklären, Gedichte schreiben und deinen TypeScript-Code debuggen … aber bitte sie, 18472 mit 9347 zu multiplizieren, und mit anständiger Wahrscheinlichkeit liefern sie dir selbstbewusst etwas, das um Tausende daneben liegt.

Das hat mich früher verwirrt, bis ich verstanden habe, was wir eigentlich von ihnen verlangen. Wir bitten eine Mustererkennungsmaschine, ein Taschenrechner zu sein. Das ist, als ob man einen Turner bittet, das Scheckbuch auszugleichen, weil er das Konzept von „Gleichgewicht“ versteht.

Die Sache ist: LLMs rechnen nichts. Wenn du GPT oder Claude fragst, was 2 + 2 ergibt, addieren sie nicht. Sie sagen voraus, dass „4“ das Token ist, das am wahrscheinlichsten nach „2 + 2 =“ kommt. Meistens funktioniert das prima, weil diese Muster in ihren Trainingsdaten existieren. Aber gehst du über einfache Arithmetik hinaus zu mehrstufigen Berechnungen oder irgendetwas mit Zahlen, die im Training nicht häufig vorkamen, würfelst du im Grunde.

Das ist mir kürzlich direkt aufgefallen, als ich Code überprüft habe, der ein Spitzenmodell zur Berechnung von Hypothekenzahlungen verwendete. Das Modell antwortete mit absoluter Sicherheit. Es lag auch um 400 $/Monat daneben. Das ist die Art von Fehler, die zählt.

Selbst wenn Modelle besser im logischen Denken werden (GPT-5 soll Verbesserungen zeigen), betreiben sie immer noch ausgefeilte Mustererkennung, keine symbolische Berechnung. Für kreative Arbeit und natürliche Sprachaufgaben ist diese probabilistische Natur genau das, was sie magisch macht. Für Mathematik? Eher nicht.

## Was löst das tatsächlich?

Die Antwort ist nicht, auf intelligentere Modelle zu warten. Es geht darum, dem Modell das richtige Werkzeug für die Aufgabe zu geben.

Überlege, wie du dieses Problem lösen würdest, wenn du ein nicht-KI-System bauen würdest. Du würdest keine eigene Mathematiklogik schreiben, sondern eine Bibliothek verwenden. Gleiches Prinzip gilt hier, nur dass wir dem LLM beibringen, wann und wie es diese Bibliothek nutzen soll.

Tool Calling in modernen AI SDKs erlaubt es uns, dem Modell strukturierte Funktionen zu übergeben, die es aufrufen kann. Statt das LLM zu zwingen, so zu tun, als könne es Mathematik, geben wir ihm etwas, das es tatsächlich kann: eine symbolische Mathematik-Engine.

Ich verwende dafür [AI SDK v5 und v6](https://ai-sdk.vercel.ai/), gepaart mit CortexJS Compute Engine. Das SDK übernimmt Orchestrierung und Tool-Routing, während CortexJS alles von einfacher Arithmetik bis hin zur Analysis handhabt. Das ist eine überraschend saubere Trennung der Zuständigkeiten.

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## Das Mathematik-Werkzeug bauen

Die Implementierung ist unkomplizierter, als man erwarten würde. Wir bauen eine Brücke zwischen dem natürlichen Sprachverständnis des LLM und der tatsächlichen mathematischen Berechnung.

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

Einige Dinge sind hier erwähnenswert:

Die Beschreibung leistet Schwerstarbeit. Die Formulierung „MUSS verwendet werden“ mag aggressiv wirken, aber meiner Erfahrung nach macht die explizite Angabe, wann ein Tool zu verwenden ist, den Unterschied zwischen gelegentlichem und zuverlässigem Funktionieren. Betrachten Sie es als Prompt Engineering auf Werkzeugebene.

Die Batch-Verarbeitung über ein `expressions`-Array ist wichtiger, als man denkt. Jeder Modellaufruf hat eine Latenz. Wenn Sie ein Gleichungssystem lösen oder mehrstufige Mathematik betreiben, führt die individuelle Verarbeitung zu einer schlechten Benutzererfahrung. Batching bedeutet einen einzigen Roundtrip, um zehn Probleme zu lösen.

Die Verwendung einer symbolischen Engine anstelle von bloßem `eval()` (bitte verwenden Sie kein `eval()`) verschafft uns echtes mathematisches Verständnis. Die Engine analysiert die Absicht, verarbeitet LaTeX-Formatierung und kann mit Ableitungen und Integralen umgehen. Wir führen nicht nur Berechnungen durch, wir betreiben Mathematik.

Die Fehlerbehandlung ist pro Ausdruck begrenzt. Wenn eine Berechnung fehlschlägt, geben wir diesen Fehler zurück, fahren aber mit den restlichen fort. So kann das Modell sehen, was funktioniert hat und was nicht, und sich im nächsten Schritt möglicherweise selbst korrigieren.

## In der Praxis anwenden

Werfen wir etwas darauf, das ein reines Modell normalerweise zum Halluzinieren bringen würde:

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

Das Modell erkennt die Mathematik, versteht, dass Präzision nötig ist, ruft das Tool auf, erhält das genaue Ergebnis und erklärt es dann in natürlicher Sprache. Jede Komponente tut, was sie am besten kann.

## Jenseits der Grundrechenarten

Da wir eine symbolische Engine verwenden, bewältigt dieser Ansatz Dinge, die einfache Taschenrechner-Tools nicht anfassen können.

Algebraische Gleichungen lösen? „Löse diese Gleichungen: 3x + 7 = 22 und 2y – 5 = 13“ funktioniert einwandfrei.

Brauchst du Analysis? „Finde die Ableitung von x^3 + 2x^2 und werte sie an x = 2 aus“ ist nur ein weiterer Tool-Aufruf.

Die LaTeX-Unterstützung ist besonders nützlich, wenn du Bildungs-Apps entwickelst. Die Engine versteht LaTeX-Eingaben von Haus aus und kann Ergebnisse formatierungsfertig zurückgeben. Kein zusätzliches Parsen erforderlich.

## Das große Ganze

Ich denke, dieses Muster geht über die reine Mathematik hinaus. Was wir wirklich tun, ist, die Grenzen von LLMs anzuerkennen und gleichzeitig ihre Stärken zu nutzen. Sie sind unglaublich darin, Absichten zu verstehen, natürliche Sprache zu parsen und Arbeitsabläufe zu orchestrieren. Sie sind keine Taschenrechner, Datenbanken oder Dateisysteme.

Jedes Mal, wenn wir versuchen, ein LLM etwas Deterministisches tun zu lassen, kämpfen wir gegen seine Natur. Aber wenn wir dieses Verständnis natürlicher Sprache mit spezialisierten Tools kombinieren, die die deterministischen Teile übernehmen? Dann wird es interessant.

Das Mathematik-Tool ist nur ein Beispiel. Das gleiche Prinzip gilt für Datumsmanipulation, Finanzberechnungen, Bildverarbeitung, Datenbankabfragen … überall dort, wo Präzision wichtiger ist als Kreativität. Lass das Modell verstehen, was der Benutzer will, und übergib dann die eigentliche Arbeit an etwas, das für diese Aufgabe gebaut wurde.

Es ist ein Wandel in der Art, wie wir über das Bauen mit KI denken. Nicht „Kann das Modell das?“ sondern „Kann das Modell das orchestrieren?“ Kleiner Unterschied in der Formulierung, großer Unterschied in der Zuverlässigkeit.

## Ressourcen

- [Vercel AI SDK Dokumentation](https://sdk.vercel.ai/docs)
- [CortexJS Compute Engine](https://cortexjs.io/compute-engine/)
- [Tool-Calling-Leitfaden](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [AI SDK Beispiele Repository](https://github.com/vercel/ai/tree/main/examples)
````
