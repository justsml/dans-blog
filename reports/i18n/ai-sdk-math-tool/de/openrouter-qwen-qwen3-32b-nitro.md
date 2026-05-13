# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 15.10
- Input tokens: 5726
- Output tokens: 6203
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001947
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug ai-sdk-math-tool --locale de
## Raw Output

````mdx
---
title: ''
subTitle: Sie sind schlecht darin. So beheben Sie es
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
import { generateText, stepCountIs, tool } from 'ai';
import { ComputeEngine } from '@cortex-js/compute-engine';
import { z } from 'zod';


Weißt du, was an Sprachmodellen seltsam ist? Sie können Quantenmechanik erklären, Gedichte schreiben und deinen TypeScript-Code debuggen... aber frag sie, 18472 mit 9347 zu multiplizieren, und es besteht eine gute Chance, dass sie dir mit voller Überzeugung etwas liefern, das um Tausende danebenliegt.  

Das hat mich früher verwirrt, bis mir klar wurde, was wir ihnen eigentlich abverlangen. Wir bitten eine Mustererkennungsmaschine, eine Rechenmaschine zu sein. Das ist, als würde man eine Turnerin bitten, ihre Kontobewegungen auszugleichen, weil sie den Begriff „Ausgleich“ versteht.  

Die Sache ist die: LLMs rechnen nichts. Wenn du GPT oder Claude fragst, was 2 + 2 ergibt, addieren sie nicht. Sie prognostizieren, dass „4“ der Token ist, der am wahrscheinlichsten nach „2 + 2 =“ kommt. Die meiste Zeit funktioniert das gut, weil diese Muster in ihren Trainingsdaten vorkommen. Aber sobald du komplexere Rechnungen oder mehrschrittige Berechnungen durchführst oder Zahlen betrachtest, die selten in den Trainingsdaten vorkamen, wirfst du im Grunde Würfel.  

Kürzlich stieß ich direkt auf dieses Problem, als ich Code überprüfte, der ein Top-Modell dafür nutzte, Hypothekenzahlungen zu berechnen. Das Modell antwortete mit voller Sicherheit. Es lag aber um 400 $/Monat daneben. Das ist eine Fehlerart, die wirklich ins Gewicht fällt.  

Selbst wenn sich Modelle in Sachen Reasoning verbessern (angeblich zeigt GPT-5 Fortschritte), handelt es sich immer noch um eine sophistizierte Mustererkennung und nicht um symbolische Berechnung. Für kreative Arbeit und natürliche Sprachaufgaben ist diese probabilistische Natur genau das, was sie magisch macht. Für Mathematik? Nicht so sehr.  

## Was löst das Problem tatsächlich?

Die Antwort besteht nicht darin, auf klügere Modelle zu warten. Sie besteht darin, dem Modell das richtige Werkzeug für die Aufgabe zu geben.  

Stellen Sie sich vor, wie Sie dieses Problem lösen würden, wenn Sie ein nicht-AI-System bauen würden. Sie würden keine benutzerdefinierte Mathematik-Logik schreiben, sondern auf eine Bibliothek zurückgreifen. Das gleiche Prinzip gilt hier, außer dass wir das LLM jetzt lehren, wann und wie es diese Bibliothek nutzen soll.  

Das Tool-Calling in modernen AI-SDKs ermöglicht es uns, dem Modell strukturierte Funktionen anzubieten, die es aufrufen kann. Anstatt das LLM dazu zu zwingen, vorzutäuschen, dass es Mathematik versteht, geben wir ihm etwas, das es tatsächlich kann: einen symbolischen Mathematik-Interpreter.  

Ich verwende dafür die [AI SDK v5 und v6](https://ai-sdk.vercel.ai/), gepaart mit dem CortexJS Compute Engine. Das SDK übernimmt Orchestrierung und Tool-Weiterleitung, während CortexJS alles von der einfachsten Arithmetik bis hin zur Infinitesimalrechnung abdeckt. Es ist eine überraschend saubere Trennung der Verantwortlichkeiten.  

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## Aufbau des Mathematik-Tools  

Die Implementierung ist überraschenderweise einfacher, als Sie erwarten. Was wir bauen, ist eine Brücke zwischen der natürlichen Sprachverarbeitung des LLMs und der tatsächlichen mathematischen Berechnung.

Einige Punkte, die hier erwähnenswert sind:  

Die Beschreibung leistet schwere Arbeit. Diese "MUST verwendet werden"-Formulierung mag aggressiv wirken, aber aus meiner Erfahrung ist es entscheidend, dem Modell explizit mitzuteilen, wann ein Tool genutzt werden muss. Das ist der Unterschied zwischen gelegentlichem Funktionieren und zuverlässigem Einsatz. Betrachten Sie dies als Prompt-Engineering auf Tool-Ebene.  

Die Batch-Verarbeitung über ein `expressions`-Array ist wichtiger, als Sie denken. Jeder Modellaufruf hat Latenz. Wenn Sie ein Gleichungssystem lösen oder mehrschrittige Mathematik durchführen, führt die Einzelverarbeitung zu einem schlechten Benutzererlebnis. Batch-Verarbeitung bedeutet eine Rundreise, um zehn Probleme zu lösen.  

Die Verwendung einer symbolischen Engine anstelle von `eval()` (bitte nicht `eval()` nutzen) gibt uns echtes mathematisches Verständnis. Die Engine analysiert den Intent, verarbeitet LaTeX-Formatierung und kann mit Ableitungen und Integralen umgehen. Wir führen nicht nur Berechnungen durch, wir praktizieren Mathematik.  

Die Fehlerbehandlung ist pro Ausdruck begrenzt. Wenn eine Berechnung fehlschlägt, geben wir diese Fehler zurück, führen aber den Rest weiter aus. Dies ermöglicht es dem Modell, zu erkennen, was funktioniert hat und was nicht, wodurch es sich im nächsten Schritt potenziell selbst korrigiert.  

## In die Praxis umsetzen

Lassen Sie uns etwas anwerfen, das typischerweise dazu führt, dass ein rohes Modell halluziniert:

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

Das Modell erkennt die mathematischen Anforderungen, identifiziert den Bedarf an Präzision, ruft das Tool auf, erhält das genaue Ergebnis und erklärt es anschließend in natürlicher Sprache. Jede Komponente übernimmt dabei ihre spezifische Stärke.

## Über die Grundrechenarten hinaus

Da wir einen symbolischen Motor verwenden, kann dieser Ansatz Dinge bewältigen, mit denen einfache Taschenrechner-Tools nicht umgehen können.

Algebraische Gleichungen lösen? „Löse diese Gleichungen: 3x + 7 = 22 und 2y - 5 = 13“ funktioniert problemlos.

Analysis benötigt? „Finde die Ableitung von x^3 + 2x^2 und bewerte sie bei x = 2“ ist lediglich eine weitere Tool-Aufruf.

Die LaTeX-Unterstützung ist besonders nützlich, wenn Sie Bildungs-Apps entwickeln. Der Motor versteht LaTeX-Eingaben von Grund auf und kann Ergebnisse im Format zurückgeben, das für die Darstellung geeignet ist. Keine zusätzliche Parsing erforderlich.

## Das größere Bild

Ich denke, dieses Muster ist über Mathematik hinaus relevant. Was wir tun, ist letztlich, die Grenzen von LLMs anzuerkennen, während wir ihre Stärken nutzen. Sie sind erstaunlich darin, Absichten zu verstehen, natürliche Sprache zu verarbeiten und Workflows zu orchestrieren. Sie sind aber keine Taschenrechner, keine Datenbanken oder Dateisysteme.

Jedes Mal, wenn wir versuchen, einem LLM etwas Deterministisches zu machen, kämpfen wir gegen seine Natur an. Doch wenn wir diese natürliche Sprachverarbeitung mit spezialisierten Tools kombinieren, die die deterministischen Teile übernehmen? Genau dann wird es interessant.

Das Mathematik-Tool ist nur ein Beispiel. Das gleiche Prinzip gilt für Datumsmanipulation, Finanzberechnungen, Bildverarbeitung, Datenbankabfragen… überall, wo Präzision wichtiger ist als Kreativität. Lassen Sie das Modell verstehen, was der Benutzer möchte, und übertragen Sie die eigentliche Arbeit an etwas, das dafür gebaut wurde.

Es ist eine Veränderung in der Art und Weise, wie wir mit KI bauen. Nicht „Kann das Modell das tun?“, sondern „Kann das Modell dies orchestrieren?“ Ein kleiner Unterschied in der Formulierung, aber ein großer Unterschied in der Zuverlässigkeit.

## Ressourcen

- [Dokumentation des Vercel AI SDK](https://sdk.vercel.ai/docs)
- [CortexJS Compute Engine](https://cortexjs.io/compute-engine/)
- [Handbuch für Tool-Aufrufe](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [Beispiel-Repository für das AI SDK](https://github.com/vercel/ai/tree/main/examples)
````
