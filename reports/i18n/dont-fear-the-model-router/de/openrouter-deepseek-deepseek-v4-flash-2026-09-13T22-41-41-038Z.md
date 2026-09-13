# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: de
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/de/index.mdx
- Validation: deferred
- Runtime seconds: 115.97
- Input tokens: 11820
- Output tokens: 14059
- Thinking tokens: unknown
- Cached input tokens: 4864
- Cache write tokens: 0
- Estimated cost: $0.001657
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Fürchte den Model Router nicht
subTitle: Der sichere Weg zum besten Modell.
modified: '2026-09-04'
tags:
  - ai
  - llm
  - agents
  - mastra
  - evals
  - model-routing
  - testing
  - observability
  - production
category: AI
subCategory: AI Infrastructure
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
related:
  - llm-routing-mastra-ai
  - llm-evals-are-broken
  - mastra-workflows-memory
sourceHash: 9599850328a0
---
Heirate dein Modell nicht](/llm-routing-mastra-ai) vertrat die einfache These: Hör auf, jede Aufgabe an dasselbe Modell zu schicken, nur weil es den letzten Vergleich gewonnen hat.

Verwende ein billiges Modell für billige Arbeit. Setze ein stärkeres Modell ein, wo die Arbeit wirklich schwer ist. Halte die Routing-Schicht locker genug, dass ein Wechsel der Anbieter deine Codebasis nicht zu einem Schrein macht.

Das war richtig.

Es war auch unvollständig.

In dem Moment, in dem du einen Router hinzufügst, hast du ein neues Systemverhalten zu testen. Die Frage ist nicht mehr „Welches Modell ist am besten?“ sondern „Hat das System die richtige Route gewählt, die richtigen Werkzeuge verwendet, die richtigen Belege aufbewahrt und zur richtigen Zeit aufgehört?“

Wenn du das nicht misst, ist dein Modell-Router nichts als Bauchgefühl mit einer Verteiltabelle.

<p class="inset">
Der Router ist nicht die Antwort. Der Router ist eine Hypothese darüber, wie dein System sich verhalten sollte.
</p>

Mastra bietet die Oberflächen, um diese Hypothese testbar zu machen: [Scorers](https://mastra.ai/docs/evals/overview), [`runEvals`](https://mastra.ai/reference/evals/run-evals), [Datensätze](https://mastra.ai/docs/evals/datasets/overview) und [Experimente](https://mastra.ai/docs/evals/datasets/running-experiments). Die Namen klingen nach Evaluierungsinfrastruktur – und das sind sie auch. Der eigentliche Wert ist einfacher: Sie machen das Verhalten des Agenten sichtbar genug, um darüber zu diskutieren.

## Was testen wir?

Der Router aus dem früheren Artikel hat drei spezialisierte Routen:

| Rout | Was dahin soll | Was eine schlechte Rout wäre |
|---|---|
| `code` | Implementierung, Refactoring, Debugging, Code-Review | Zusammenfassung langer Kontexte, einfache Klasifizierung |
| `long-context` | unaufgeräumte Dokumente, Transkripte, Richtlinien-Synthese, viele Daeien | kurze mechanische Formatieung |
| `'general` | Klasifizierung, Formatieung, einfache Q&A, langweilige Extrakion | harter Code oder beleglastige Analysen |

Diese Tabelle ist ein Anfang. Sie ist kein Eval.

Ein Eval braucht Beispiele und Scorer:

| Teil | Aufgabe |
|---|---|
| Datensatz-Item | „Hier ist eine repräsentative Anfrage.“ |
| Grundwahrheit | „Hier ist die erwartete Rout oder das erwartete Verhalten.“ |
| Scorer | „Hier ist, wie wir entscheiden, ob die Ausgabe bestanden hat.“ |
| Experiment | „Hier ist der Durchlauf, den wir mit zukünftigen Durchläufen vergleichen können.“ |

Der wichige Schritt ist, Verhalten zu testen, nich nur die Qualität der Prosa.

Ein Modell kann eine schöne Antwort schreiben, nachdem es die falsche Spezialisierung gewählt hat. Ein Sicherheitsagent kann einen plausiblen Bericht liefern, ohne Beleg aufzubewahren. Ein Support-Agent kann einfühlend kligen, währnd er die Rückersttungsprüfung überspringt. Der Absatz is der sichtbare Teil. Dielinie ist, wo die Fehler stecken.

Für einen Router beginne ich mit vier Achsen:

| Achse | Frage | Beispiell-Scorer |
|---|---|---|
| Qualität | Hat es die richtige Rout gewählt und ein nützliches Ergbnis geliefert? | Routengenauigkeit, Antwort-Vollständigkeit, Treue (Faithfulness) |
| Kosten | Hat es Prämium-Modelle für langweilige Arbeit vermieden? | Kosklasse der gewählten Rout, Token-Budget |
| Geschwindigkeit | War es innerhlab des Latenzbudgets des Produkts fertig? | Laufzeit- oder Timeout-Scorer |
| Sonstiges | Hat es Sicherheits-, Privatsphäre- und Beobachtbarkeitseinschränkungen eingehalten? | Werkzeug-Whitelist, Belegaufbewahrung, Verweigerungshalten |

Die letzte Zeile ist wichtig. „Sonstiges“ ist der Ort, an dem die Produktionsnarben leben.

## Die Router-Entscheidung bewertbar machen

Wenn der Router nur eine endgültige Antwort produziert, rätst du über die Entscheidung. Du kannst die Ausgabe bewerten, aber du kannst nicht sagen, ob die Route richtig war.

Gib dem Routing-Schritt also einen kleinen strukturierten Vertrag:

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

Benutzer müssen dieses JSON nie sehen. Es kann ein interner Schritt, eine Workflow-Übergabe oder ein Trace-Span sein. Der Scorer braucht nur Zugriff darauf.

Hier ist ein bewusst kleiner Mastra-Agent, der nichts anderes tut, als eine Route zu wählen:

```typescript
// src/mastra/agents/router-decision-agent.ts
import { Agent } from "@mastra/core/agent";

export const routerDecisionAgent = new Agent({
  id: "router-decision-agent",
  name: "Router Decision Agent",
  instructions: `Choose the best specialist route for the user request.

Return ONLY JSON:
{
  "route": "code" | "long-context" | "general",
  "confidence": number,
  "reason": string
}

Routing rules:
- code: implementation, refactoring, debugging, code review, APIs, tests
- long-context: large documents, transcripts, policy synthesis, many files
- general: classification, formatting, extraction, simple Q&A

Do not answer the user request. Only choose the route.`,
  model: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
});
```

Ja, das ist ein bisschen künstlich. Gut. Evals belohnen langweilige Nahtstellen.

Mit der expliziten Entscheidung kannst du die Route testen, bevor der nachgelagerte Spezialist läuft. Router-Fehler hören auf, sich hinter Fehlern im ausgewählten Modell, seinem Prompt, seinen Tools oder dem Scorer für die endgültige Antwort zu verstecken.

## Einen Scorer schreiben, der den langweiligen Fehler abfängt

Mastras [`createScorer`](https://mastra.ai/reference/evals/create-scorer) akzeptiert einfache JavaScript-Funktionen, LLM-Richter-Prompts oder beides. Fang mit Funktionen an, wann immer der Fehler deterministisch ist. Sie sind billiger, schneller und weniger undurchsichtig.

Routengenauigkeit braucht kein Richtermodel. Sie muss JSON parsen und ein Feld vergleichen.

```typescript
// src/mastra/scorers/route-accuracy.ts
import { createScorer } from "@mastra/core/evals";

type Route = "code" | "long-context" | "general";
type RouteGroundTruth = {
  route: Route;
  mustMention?: string[];
};

function textFromAgentOutput(output: Array<{ content?: unknown }>) {
  const content = output[0]?.content;
  return typeof content === "string" ? content : JSON.stringify(content ?? "");
}

function parseDecision(output: Array<{ content?: unknown }>) {
  try {
    return JSON.parse(textFromAgentOutput(output)) as {
      route?: string;
      confidence?: number;
      reason?: string;
    };
  } catch {
    return {};
  }
}

export const validRouterJsonScorer = createScorer({
  id: "valid-router-json",
  description: "Checks that the router emits a valid decision object.",
  type: "agent",
})
  .generateScore(({ run }) => {
    const decision = parseDecision(run.output);
    const validRoute = ["code", "long-context", "general"].includes(
      decision.route ?? "",
    );
    const validConfidence =
      typeof decision.confidence === "number" &&
      decision.confidence >= 0 &&
      decision.confidence <= 1;

    return validRoute && validConfidence && decision.reason ? 1 : 0;
  })
  .generateReason(({ score }) =>
    score === 1 ? "Valid router decision." : "Router output was not valid JSON.",
  );

export const routeAccuracyScorer = createScorer({
  id: "route-accuracy",
  description: "Checks whether the selected route matches ground truth.",
  type: "agent",
})
  .generateScore(({ run }) => {
    const expected = run.groundTruth as RouteGroundTruth;
    const decision = parseDecision(run.output);
    return decision.route === expected.route ? 1 : 0;
  })
  .generateReason(({ run, score }) => {
    const expected = run.groundTruth as RouteGroundTruth;
    const decision = parseDecision(run.output);

    return score === 1
      ? `Selected expected route: ${expected.route}.`
      : `Expected ${expected.route}, got ${decision.route ?? "nothing"}.`;
  });
```

Dieser Scorer ist nicht glamourös. Das ist der Punkt.

Wenn der Router nicht konsistent gültiges JSON produzieren und auf einem winzigen Testsatz den offensichtlichen Spezialisten auswählen kann, gibt es keinen Grund, ihm Produktionsverkehr anzuvertrauen. Du brauchst kein Philosophen-Modell, das Ontologien bewertet. Du brauchst einen Rauchmelder mit einer eingelegten Batterie.

## Zuerst die kleine Auswertungsschleife ausführen

[`runEvals`](https://mastra.ai/reference/evals/run-evals) ist die schnelle Schleife. Gib ihr ein Ziel, Testfälle, Scorer und ein Concurrency-Limit. Sie führt das Ziel mit den Daten aus und gibt aggregierte Bewertungen zurück.

```typescript
// src/mastra/evals/router.eval.ts
import { runEvals } from "@mastra/core/evals";
import { routerDecisionAgent } from "../agents/router-decision-agent";
import {
  routeAccuracyScorer,
  validRouterJsonScorer,
} from "../scorers/route-accuracy";

const routingCases = [
  {
    input: "Refactor this React component to remove duplicated state.",
    groundTruth: { route: "code" },
  },
  {
    input: "Summarize these 14 interview transcripts and find recurring objections.",
    groundTruth: { route: "long-context" },
  },
  {
    input: "Classify this ticket as billing, technical, account, or other.",
    groundTruth: { route: "general" },
  },
  {
    input: "Debug a failing Playwright test that only breaks in CI.",
    groundTruth: { route: "code" },
  },
  {
    input: "Extract the renewal date and contract value from this short paragraph.",
    groundTruth: { route: "general" },
  },
];

const result = await runEvals({
  target: routerDecisionAgent,
  data: routingCases,
  scorers: [validRouterJsonScorer, routeAccuracyScorer],
  targetOptions: {
    modelSettings: { temperature: 0 },
  },
  concurrency: 3,
});

console.log(result.scores);
console.log(result.summary.totalItems);

if (result.scores["valid-router-json"] < 1) {
  throw new Error("Router emitted invalid decision JSON.");
}

if (result.scores["route-accuracy"] < 0.9) {
  throw new Error("Router route accuracy fell below 90%.");
}
```

Das ist die Schleife, die du ausführst, während du den Prompt änderst, eine Route hinzufügst oder ein billigeres Router-Modell ausprobierst.

Es reicht nicht für ein ausgereiftes System. Es reicht aus, um die peinlichste Regression zu verhindern: „Wir haben den Router-Prompt geändert und er fing an, Klassifizierungsaufgaben an das Premium-Code-Modell zu senden.“

Halte die Achsen getrennt. Routengenauigkeit und Qualität der endgültigen Antwort sind unterschiedliche Bewertungen. JSON-Gültigkeit, erlaubte Tools und Nachvollziehbarkeit bekommen ihre eigenen Prüfungen. Fasse sie nicht in einer „Qualitätszahl“ zusammen. Durchschnitte sind der Ort, an dem nützliche Fehler in den Ruhestand gehen.

## Fügen Sie einen LLM-Richter nur dort hinzu, wo er sich lohnt

Manches Routing ist berechtigt mehrdeutig:

```text
Read these logs and tell me why the deploy failed.
```

Liegt das an `code`, weil es Debugging ist? `long-context` wegen der Logs? `general`, weil der Benutzer eine Zusammenfassung wollte? Die richtige Route hängt von den verfügbaren Werkzeugen ab und davon, was Ihr Produkt verspricht.

Hier hilft ein LLM-Richter, aber nur mit einem strengen Bewertungsschema. Mastra-Scorer können Funktionsschritte und Prompt-Objekt-Schritte kombinieren. Verwenden Sie Funktionen für die Struktur und dann einen Richter für den Teil, der tatsächlich Beurteilung erfordert.

```typescript
// src/mastra/scorers/route-reasonableness.ts
import { createScorer } from "@mastra/core/evals";
import { z } from "zod";

export const routeReasonablenessScorer = createScorer({
  id: "route-reasonableness",
  description: "Judges whether the route explanation matches the request.",
  type: "agent",
  judge: {
    model: process.env.JUDGE_MODEL ?? "openai/gpt-5-mini",
    instructions: "You are a strict evaluator for model-routing decisions.",
  },
})
  .analyze({
    description: "Evaluate the router's decision rationale.",
    outputSchema: z.object({
      score: z.number().min(0).max(1),
      rationale: z.string(),
    }),
    createPrompt: ({ run }) => `
User request:
${JSON.stringify(run.input)}

Router output:
${JSON.stringify(run.output)}

Score from 0 to 1.

1.0 = route is clearly appropriate and the reason cites the right task signals
0.5 = route is defensible but underspecified or ambiguous
0.0 = route is wrong, unsupported, or the reason is unrelated

Return JSON with { "score": number, "rationale": string }.
`,
  })
  .generateScore(({ results }) => results.analyzeStepResult.score)
  .generateReason(({ results }) => results.analyzeStepResult.rationale);
```

Dieser Scorer kostet Geld, weil er ein Richter-Modell aufruft. Das ist in Ordnung, wenn sich die Beurteilung lohnt.

Verwenden Sie ihn nicht, um zu prüfen, ob JSON geparst wird.

## Überführen Sie gute Fälle in einen Datensatz

Hart codierte Eval-Arrays sind am Anfang in Ordnung. Mit der Zeit werden Ihre Beispiele zu Produktasssets: das fehlgeschlagene KundenTicket, die seltsame Support-Konversation, der Prompt-Injection-Versuch, die Anfrage, die bis letten Donnerstag korrekt geroutet wurde.

Diese gehören in einen Datensatz.

Mastra-Datensätze sind versionierte Sammlungen von Testfällen. Jede Änderung erzeugt eine neue Version, sodass Sie ein Experiment gegen genau den Fallsatz erneut ausführen können, der existierte, als Sie eine Modellentscheidung getroffen haben.

Datensätze benötigen Persistenz, konfigurieren Sie also zuest den Speicher:

```typescript
// src/mastra/index.ts
import { Mastra } from "@mastra/core";
import { LibSQLStore } from "@mastra/libsql";
import { routerDecisionAgent } from "./agents/router-decision-agent";
import {
  routeAccuracyScorer,
  validRouterJsonScorer,
} from "./scorers/route-accuracy";

export const mastra = new Mastra({
  storage: new LibSQLStore({
    id: "router-evals",
    url: "file:./mastra.db",
  }),
  agents: {
    routerDecisionAgent,
  },
  scorers: {
    validRouterJson: validRouterJsonScorer,
    routeAccuracy: routeAccuracyScorer,
  },
});
```

Erstellen Sie dann den Datensatz und fügen Sie Fälle hinzu:

```typescript
// src/mastra/evals/create-router-dataset.ts
import { z } from "zod";
import { mastra } from "../index";

const dataset = await mastra.datasets.create({
  name: "router-decisions-v1",
  description: "Representative model-router decisions for CI and experiments.",
  inputSchema: z.string(),
  groundTruthSchema: z.object({
    route: z.enum(["code", "long-context", "general"]),
    source: z.string().optional(),
  }),
});

await dataset.addItems({
  items: [
    {
      input: "Refactor this React component to remove duplicated state.",
      groundTruth: { route: "code", source: "synthetic:happy-path" },
    },
    {
      input: "Summarize these 14 interview transcripts and find recurring objections.",
      groundTruth: { route: "long-context", source: "synthetic:happy-path" },
    },
    {
      input: "Classify this ticket as billing, technical, account, or other.",
      groundTruth: { route: "general", source: "synthetic:happy-path" },
    },
  ],
});
```

Sobald Sie einen Datensatz haben, sind Eval-Fälle keine Weegwerf-Skriptdaten mehr. Sie haben IDs, Versionen, Verlauf und Exprimentergebnisse.

Dann fühlen sich Evals nicht mehr wie "Testdateien für Prompts" an, sondern wie Produktgedächtnis.

## Führen Sie Experimente gegen den Router aus

Mit dem vorhandenen Datensatz fühlt [`datenset.startExpriment()`](https://mastra.ai/reference/datasets/startExpriment) ihn gegen einen registrierten Agenten, Workflow oder Scorer aus.

```typescript
// src/mastra/evals/run-router-experiment.ts
import { mastra } from "../index";

const dataset = await mastra.datasets.get({ id: process.env.ROUTER_DATASET_ID! });

const summary = await dataset.startExperiment({
  name: "router-gpt-5-mini-baseline",
  description: "Baseline router decision run before adding security route.",
  targetType: "agent",
  targetId: "router-decision-agent",
  scorers: ["validRouterJson", "routeAccuracy"],
  metadata: {
    routerModel: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
    promptVersion: "router-2026-07-03",
  },
  maxConcurrency: 5,
  itemTimeout: 30_000,
  maxRetries: 1,
});

console.log(`${summary.succeededCount}/${summary.totalItems} items succeeded`);

for (const item of summary.results) {
  const scores = Object.fromEntries(
    item.scores.map((score) => [score.scorerId, score.score]),
  );

  console.log(item.itemId, item.output, scores);
}
```

Jetzt ändert sich das Gespräch.

Statt „der neue Router scheint besser“ können Sie sagen:

- Der alte Router erreichte eine Routengenauigkeit von `0.94`.
- Der neue Router erreichte `0.98`.
- Er verbesserte das Routing bei langen Kontexten.
- Er verschlechterte sich in zwei Code-Review-Fällen.
- Er reduzierte die Übergaben an Premium-Modelle um 18%.
- Er fügte 300 ms Router-Latenz hinzu.

Das ist eine technische Diskussion. Die Kompromisse liegen auf dem Tisch, und Sie können entscheiden, ob der Tausch es wert ist.

## Bewerten Sie das Live-Verhalten, aber verwechseln Sie es nicht mit der Ground Truth

Mastra kann auch Scorer direkt an Agents und Workflow-Schritte anhängen. Live-Scorer laufen asynchron, speichern Ergebnisse in Ihrer konfigurierten Datenbank und unterstützen Sampling, sodass Sie nicht jede Produktionsantwort bewerten, es sei denn, Sie wollen das.

Nützlich. Und eine andere Aufgabe.

```typescript
import { Agent } from "@mastra/core/agent";
import { validRouterJsonScorer } from "../scorers/route-accuracy";

export const routerDecisionAgent = new Agent({
  id: "router-decision-agent",
  instructions: "Choose the best specialist route...",
  model: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
  scorers: {
    validRouterJson: {
      scorer: validRouterJsonScorer,
      sampling: { type: "ratio", rate: 1 },
    },
  },
});
```

Live-Bewertung sagt Ihnen, dass der Router weiterhin gültige Entscheidungen trifft. Sie erfasst fehlerhafte Ausgaben, toxische Inhalte, verbotene Tool-Aufrufe, fehlende Belegmarker und auffällig niedrige Konfidenz.

Sie kann Ihnen in der Regel keine Routengenauigkeit mitteilen, da der Produktionstraffic nicht mit einer Ground Truth versehen ankommt.

Live-Bewertung ist Monitoring. Datensatz-Experimente sind kontrollierte Tests. Sie brauchen beides. Sie beantworten verschiedene Fragen.

## Was man nach der Routengenauigkeit messen sollte

Routengenauigkeit ist die erste Stufe. Sie sagt Ihnen, dass die Anfrage den erwarteten Spezialisten erreicht hat. Sie sagt nichts darüber aus, ob der Spezialist gute Arbeit geleistet hat.

Sobald der Router die Grundlagen besteht, bewerten Sie das System in Schichten:

| Schicht | Was bewertet wird | Warum es wichtig ist |
|---|---|---|
| Router-Entscheidung | ausgewählte Route, Konfidenz, Grund | Erfasst Fehlklassifikationen und schlechte Eskalationsregeln |
| Trajektorie | erwartete Tool- oder Agenten-Sequenz | Erfasst „richtige Antwort, falscher Weg“-Verhalten |
| Spezialisten-Ausgabe | Korrektheit, Treue, Nützlichkeit | Erfasst minderwertige Arbeit nach korrektem Routing |
| Kosten und Latenz | Modellwahl, Tokens, Laufzeit | Erfasst teure oder langsame Erfolge |
| Sicherheit und Umfang | erlaubte Tools, Verweigerungsgrenzen, Belege | Erfasst produktriskante Fehler |

`runEvals` unterstützt Scorer-Konfigurationen auf Agenten-, Workflow-, Schritt- und Trajektorienebene, sodass Sie nicht so tun müssen, als sei die endgültige Antwort das einzige Artefakt.

Für einen Workflow sieht das so aus:

```typescript
const result = await runEvals({
  target: supportWorkflow,
  data: supportCases,
  scorers: {
    workflow: [finalAnswerQualityScorer],
    steps: {
      "route-request": [routeAccuracyScorer],
      "check-policy": [policyGroundingScorer],
    },
    trajectory: [expectedPathScorer],
  },
});
```

Das ist das mentale Modell, das ich für Agents in der Produktion haben möchte:

Bewerten Sie die Entscheidung. Bewerten Sie den Pfad. Bewerten Sie die Antwort.

Wenn Sie nur die Antwort bewerten, kann das Modell zufällig bestehen.

## Der Router sollte mit der Zeit langweiliger werden

## Der Router sollte mit der Zeit langweiliger werden

Der erste Routing-Prompt ist meist ein Absatz voller Ermessensentscheidungen. Für einen Prototypen in Ordnung.

Während die Evals einem Dinge beibringen, sollten Teile des Routers weniger magisch werden:

- Klare lexikalische Fälle werden zu deterministischen Regeln.
- Riskante Aufgaben erfordern explizite Freigabe oder einen Workflow-Zweig.
- Mehrdeutige Aufgaben stellen eine Rückfrage, anstatt zu raten.
- Teure Routen erfordern höheres Vertrauen oder ein zweites Signal.
- Bekannte Fehlerfälle werden zu Dataset-Elementen.

Das Ziel ist nicht, den Router für immer „schlauer" zu machen. Das Ziel ist, das System leichter nachvollziehbar zu machen.

Manchmal bedeutet das ein besseres Modell. Manchmal einen engeren Prompt. Manchmal einen Workflow-Schritt, einen Scorer, eine feste Obergrenze oder ein langweiliges `if`-Statement, das einem vierstellige Beträge im Monat spart.

Das ist der ganze Sinn von gemessenem Verhalten: Man hört auf, aus dem Bauch heraus zu argumentieren, und beginnt, mit Belegen zu argumentieren.

## Eine praktische Start-Checkliste

Wenn du heute einen Mastra-Router baust, fang hier an:

1. Mach die Routing-Entscheidung strukturiert, auch wenn die Nutzer sie nie sehen.
2. Schreibe deterministische Scorer für gültiges JSON, die erwartete Route und verbotene Routen.
3. Verwende `runEvals` mit 10 bis 20 Fällen, bevor du Routing-Prompts oder Modelle änderst.
4. Führe echte Fehler in ein versioniertes Dataset über.
5. Führe Dataset-Experimente für sinnvolle Prompt-, Modell-, Routen- oder Workflow-Änderungen durch.
6. Füge Live-Scorer für günstige Produktionsinvarianten hinzu.
7. Vergleiche Experimente nach Route, nicht nur nach durchschnittlicher Punktzahl.

Der Durchschnitt zählt weniger als der Fehlercluster.

Wenn jede Regression in der langkontextigen Policy-Synthese auftritt, hast du kein „schlechteren Router". Du hast ein Routen-Grenzproblem. Wenn jeder Fehlerfall ein bestimmtes Tool verwendet, hast du ein Tool-Vertragsproblem. Wenn jedes günstige Modell bei denselben beiden mehrdeutigen Fällen versagt, brauchst du Eskalationslogik, keine teurere Standardeinstellung.

Hier werden Evals nützlich. Sie sind keine Zeremonie oder ein Dashboard, das jedem kurz ein erwachsenes Gefühl gibt. Sie zeigen dir, welcher Teil des Systems versagt, damit du genau diesen Teil reparieren kannst – nicht das Ganze.

## Ressourcen

- [Mastra Scorer Übersicht](https://mastra.ai/docs/evals/overview)
- [Mastra `createScorer` Referenz](https://mastra.ai/referenz/evals/create-scorer)
- [Mastra `runEvals` Referenz](https://mastra.ai/reference/evals/run-evals)
- [Mastra Datasets Übersicht](https://mastra.ai/docs/evals/datasets/overview)
- [Mastra Datatset Expermiments](https://mastra.ai/docs/evals/datasets/running-experiments)
- [Heirate dein Moedell nicht](../llm-routing-mastra-ai)
- [Bekämpfe Übel mit Evals!](../llm-evals-are-broken)
````
