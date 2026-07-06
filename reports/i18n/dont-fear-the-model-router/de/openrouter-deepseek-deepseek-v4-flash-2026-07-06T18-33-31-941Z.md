# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: de
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 129.48
- Input tokens: 11610
- Output tokens: 13501
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.005265
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug dont-fear-the-model-router --locale de --skip-global (code 1)
## Raw Output

````mdx
---
title: Keine Angst vor dem Model-Router
subTitle: Sicher zum besten Modell navigieren.
modified: '2026-07-03'
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
---
Die erste Version von [Don't Marry Your Model](../llm-routing-mastra-ai) brachte das einfache Argument: Hören Sie auf, jede Aufgabe an dasselbe Modell zu senden, nur weil es den letzten Vergleich gewonnen hat.

Verwenden Sie ein günstiges Modell für einfache Arbeiten. Verwenden Sie ein stärkeres Modell, wo die Arbeit wirklich schwer ist. Halten Sie die Routing-Schicht flexibel genug, dass Sie Anbieter wechseln können, ohne Ihre Codebasis in einen Schrein zu verwandeln.

Das war richtig.

Es war auch unvollständig.

Denn sobald Sie einen Router hinzufügen, haben Sie ein neues Systemverhalten, das getestet werden muss. Die Frage ist nicht mehr „Welches Modell ist am besten?“. Die Frage ist: „Hat das System die richtige Route gewählt, die richtigen Werkzeuge verwendet, die richtigen Beweise aufbewahrt und zur richtigen Zeit aufgehört?“

Wenn Sie das nicht messen, ist Ihr Modell-Router nur Vibes mit einer Verteiltabelle.

<p class="inset">
Der Router ist nicht die Antwort. Der Router ist eine Hypothese darüber, wie sich Ihr System verhalten sollte.
</p>

Mastra bietet uns nützliche Oberflächen, um diese Hypothese in etwas Testbares zu verwandeln: [scorers](https://mastra.ai/docs/evals/overview), [`runEvals`](https://mastra.ai/reference/evals/run-evals), [datasets](https://mastra.ai/docs/evals/datasets/overview) und [experiments](https://mastra.ai/docs/evals/datasets/running-experiments). Die API-Namen klingen nach Evaluierungsinfrastruktur, was sie auch sind, aber der wahre Wert ist einfacher:

Sie machen das Agentenverhalten sichtbar genug, um darüber zu diskutieren.

## Was testen wir genau?

Der Modell-Router aus dem früheren Beitrag hat drei offensichtliche Spezialrouten:

| Route | Was dorthin sollte | Was eine schlechte Route wäre |
|---|---|---|
| `code` | Implementierung, Refactoring, Debugging, Code-Review | Langtext-Zusammenfassung, einfache Klassifizierung |
| `long-context` | Unordentliche Dokumente, Transkripte, Richtliniensynthese, viele Dateien | Kurze mechanische Formatierung |
| `general` | Klassifizierung, Formatierung, einfache Fragen & Antworten, langweilige Extraktion | Harter Code oder evidenzlastige Analyse |

Diese Tabelle ist ein Anfang, aber sie ist kein Eval. Ein Eval braucht Beispiele und Scorers:

| Stück | Aufgabe |
|---|---|
| Datensatzelement | „Hier ist eine repräsentative Anfrage.“ |
| Grundwahrheit | „Hier ist die Route oder das Verhalten, das wir erwartet haben.“ |
| Scorer | „Hier ist, wie wir entscheiden, ob die Ausgabe bestanden hat.“ |
| Experiment | „Hier ist der Durchlauf, den wir mit zukünftigen Durchläufen vergleichen können.“ |

Der wichtige Schritt ist, das Verhalten zu testen, nicht nur die Textqualität.

Ein Modell kann eine schöne Antwort schreiben, nachdem es die falsche Spezialroute gewählt hat. Ein Sicherheitsagent kann einen plausiblen Bericht erstellen, ohne Beweise aufzubewahren. Ein Support-Agent kann einfühlsam klingen, während er die Rückerstattungsrichtlinie überspringt. Der Absatz ist der sichtbare Teil. Die Trajektorie ist, wo die Fehler lauern.

Für einen Router beginne ich normalerweise mit vier Achsen:

| Achse | Frage | Beispiel-Scorer |
|---|---|---|
| Qualität | Hat es die richtige Route gewählt und ein nützliches Ergebnis geliefert? | Routengenauigkeit, Vollständigkeit der Antwort, Korrektheit |
| Kosten | Hat es Premium-Modelle für langweilige Aufgaben vermieden? | Kostenklasse der gewählten Route, Token-Budget |
| Geschwindigkeit | War es innerhalb des Latenz-Budgets des Produkts fertig? | Laufzeit- oder Timeout-Scorer |
| Sonstiges | Hat es Sicherheits-, Datenschutz- und Beobachtbarkeitsanforderungen eingehalten? | Tool-Whitelist, Beweissicherung, Verweigerungsverhalten |

Die letzte Spalte ist wichtig. „Sonstiges“ ist der Ort, an dem die Narben der Produktion leben.

## Router-Entscheidung bewertbar machen

Wenn der Router nur eine finale Antwort produziert, ist schwer nachvollziehbar, warum er sich so verhalten hat. Man kann zwar die Ausgabe bewerten, aber man rät nur über die Entscheidung.

Für Evaluierungen gib dem Schritt der Routenwahl einen kleinen strukturierten Vertrag:

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

Das Produktionssystem muss dieses JSON nicht den Nutzern zeigen. Es kann ein interner Schritt, eine Workflow-Übergabe oder ein Trace-Span sein. Der Scorer braucht nur eine Oberfläche.

Hier ist ein bewusst kleiner Mastra-Agent, der eine Route wählt:

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

Wenn die Router-Entscheidung explizit ist, kannst du die Route testen, bevor du den nachgelagerten Spezialisten testest. So findest du heraus, ob das Problem der Router, das ausgewählte Modell, das Prompt, die Tool-Oberfläche oder der finale Antwort-Scorer ist.

## Einen Scorer schreiben, der den langweiligen Fehler erfasst

Mastras [`createScorer`](https://mastra.ai/reference/evals/create-scorer) kann JavaScript-Funktionen, LLM-Judge-Prompts oder beides nutzen. Beginne mit Funktionen, wann immer der Fehler deterministisch ist. Sie sind günstiger, schneller und weniger rätselhaft.

Für die Routengenauigkeit brauchen wir kein Judge-Modell. Wir müssen JSON parsen und ein Feld vergleichen.

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

Wenn der Router nicht konsistent gültiges JSON produzieren und auf einem winzigen Testsatz den offensichtlichen Spezialisten wählen kann, gibt es keinen Grund, ihm im Produktionstraffic zu vertrauen. Du brauchst kein Philosophen-Modell, das eine Ontologie bewertet. Du brauchst das Äquivalent eines Rauchmelders mit einer funktionierenden Batterie.

## Zuerst die kleine Evaluierungsschleife ausführen

Mastras [`runEvals`](https://mastra.ai/reference/evals/run-evals) ist die schnelle Schleife. Gib ihm ein Ziel, Testfälle, Scorer und ein Concurrency-Limit. Es führt das Ziel gegen die Daten aus und gibt aggregierte Scores zurück.

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

Das ist die Schleife, die du ausführst, während du das Prompt änderst, eine neue Route hinzufügst oder ein günstigeres Router-Modell ausprobierst.

Es reicht nicht für ein ausgereiftes System, aber es reicht, um die peinlichste Regression zu verhindern: „Wir haben das Router-Prompt geändert und es fing an, Klassifikationsaufgaben an das Premium-Code-Modell zu senden.“

Kosten, Geschwindigkeit, Qualität und anderes tauchen hier auf:

- Kosten: Das Router-Modell kann günstig bleiben, wenn die Genauigkeit hält.
- Geschwindigkeit: Das Eval kann Timeouts erzwingen oder Latenz im Harness protokollieren.
- Qualität: Routengenauigkeit und finale Antwortqualität sind separate Scores.
- Anderes: JSON-Gültigkeit, erlaubte Tools, Sicherheit und Nachvollziehbarkeit erhalten eigene Prüfungen.

All das nicht in einen einzelnen „Qualitäts“-Score packen. Mittelwerte sind der Ort, an dem nützliche Fehler in Rente gehen.

## Füge einen LLM-Richter nur dort hinzu, wo er sich lohnt

Manches Router-Verhalten ist subjektiv. Eine Anfrage kann legitimerweise mehrdeutig sein:

```text
Lies diese Logs und sag mir, warum der Deploy fehlgeschlagen ist.
```

Ist das `code`, weil Debugging? `long-context`, weil Logs? `general`, weil Zusammenfassung? Die richtige Route hängt von der Tooloberfläche und deinem Produktversprechen ab.

Hier kann ein LLM-Richter helfen, aber nur mit einem strengen Rubrik. Mastra-Scorer können Funktionsschritte und Prompt-Objekt-Schritte mischen. Verwende Funktionen für die Struktur, dann einen Richter für den Teil, der tatsächlich Beurteilung braucht.

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

Dieser Scorer kostet Geld, weil er ein Richter-Modell aufruft. Das ist in Ordnung, wenn sich das Urteil lohnt.

Verwende ihn nicht, um zu prüfen, ob JSON parsed.

## Hebe gute Fälle in ein Dataset hervor

Hartcodierte Eval-Arrays sind am Anfang in Ordnung. Irgendwann werden deine Beispiele zu Produkt-Assets. Das gescheiterte Kunden-Ticket, die seltsame Support-Konversation, der Prompt-Injection-Versuch, die Anfrage, die vor letztem Donnerstag noch korrekt geroutet wurde.

Das gehört in ein Dataset.

Mastra-Datasets sind versionierte Sammlungen von Testfällen. Jede Mutation erzeugt eine neue Version, was bedeutet, dass du ein Experiment gegen genau die Fallmenge wiederholen kannst, die existierte, als du eine Modellentscheidung getroffen hast.

Zuerst den Speicher konfigurieren, denn Datasets brauchen Persistenz:

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

Dann ein Dataset erstellen und Fälle hinzufügen:

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

In dem Moment, in dem du ein Dataset hast, kannst du aufhören, Eval-Fälle als Wegwerf-Skriptdaten zu behandeln. Sie haben jetzt IDs, Versionen, Historie und Experimentergebnisse.

Das ist der Punkt, an dem Evals sich weniger nach „Testdateien für Prompts“ anfühlen und mehr nach Produktgedächtnis.

## Führe Experimente gegen den Router aus

Sobald das Dataset existiert, verwende [`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment), um es gegen einen registrierten Agenten, Workflow oder Scorer auszuführen.

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

Jetzt ändert sich die Diskussion.

Statt „der neue Router wirkt besser“ kannst du sagen:

- Der alte Router erreichte `0,94` bei der Routengenauigkeit.
- Der neue Router erreichte insgesamt `0,98`.
- Er verbesserte das Routing bei langen Kontexten.
- Er verschlechterte zwei Code-Review-Fälle.
- Die Übergaben an Premium-Modelle reduzierten sich um 18 %.
- Die Router-Latenz stieg um 300 ms.

Das ist eine technische Diskussion. Es gibt Abwägungen. Du kannst entscheiden, ob der Tausch lohnt.

## Live-Verhalten bewerten, aber nicht mit Ground Truth verwechseln

Mastra kann Scorer auch direkt an Agenten und Workflow-Schritte anhängen. Live-Scorer laufen asynchron und speichern die Ergebnisse in deiner konfigurierten Datenbank, mit Sampling-Kontrollen, sodass du nicht jede Produktionsantwort bewerten musst – es sei denn, du willst es.

Das ist nützlich, aber eine andere Aufgabe.

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

Live-Scoring kann dir sagen, dass der Router noch gültige Entscheidungen ausgibt. Es kann fehlerhafte Ausgaben, toxische Inhalte, verbotene Tool-Aufrufe, fehlende Evidenz-Marker oder verdächtig niedrige Konfidenz erkennen.

Meistens kann es dir nicht die Routengenauigkeit sagen, denn Produktionstraffic kommt nicht mit einer Ground-Truth-Kennzeichnung daher.

Dieser Unterschied ist wichtig. Live-Scoring ist Monitoring. Dataset-Experimente sind kontrollierte Tests. Du willst beides, aber sie beantworten unterschiedliche Fragen.

## Was nach der Routengenauigkeit messen

Die Routengenauigkeit ist die erste Stufe. Sie sagt dir, ob die Anfrage an den erwarteten Spezialisten ging. Sie sagt dir nicht, ob der Spezialist gute Arbeit geleistet hat.

Nachdem der Router die Grundlagen besteht, bewerte das System in Schichten:

| Schicht | Was bewertet wird | Warum es wichtig ist |
|---|---|---|
| Router-Entscheidung | gewählter Pfad, Konfidenz, Begründung | Erkennt Fehlklassifikationen und schlechte Eskalationsregeln |
| Trajektorie | erwartete Tool- oder Agenten-Sequenz | Erkennt Verhalten „richtige Antwort, falscher Weg“ |
| Spezialistenausgabe | Korrektheit, Faktentreue, Nützlichkeit | Erkennt schlechte Qualität nach korrektem Routing |
| Kosten und Latenz | Modellwahl, Tokens, Laufzeit | Erkennt teure oder langsame Erfolge |
| Sicherheit und Umfang | erlaubte Tools, Ablehnungsgrenzen, Evidenz | Erkennt produktbezogene Risiken |

Die `runEvals`-API von Mastra unterstützt Konfigurationen für Scorer auf Agenten-, Workflow-, Schritt- und Trajektorienebene. Du musst also nicht so tun, als sei die endgültige Antwort das einzige Artefakt.

Für einen Workflow könnte die Struktur so aussehen:

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

Das ist das mentale Modell, das ich für Agenten in der Produktion haben möchte:
---

Bewerte die Entscheidung. Bewerte den Pfad. Bewerte die Antwort.

Wenn du nur die Antwort bewertest, kann das Modell durch Zufall bestehen.

## Der Router sollte mit der Zeit langweiliger werden

Der erste Routing-Prompt ist meist ein Absatz voller Ermessensentscheidungen. Das ist für einen Prototypen in Ordnung.

Während du aus den Evals lernst, sollten Teile des Routers weniger magisch werden:

- Klare lexikalische Fälle können zu deterministischen Regeln werden.
- Riskante Aufgaben können explizite Freigabe oder einen Workflow-Zweig erfordern.
- Mehrdeutige Aufgaben können eine Rückfrage stellen, statt zu raten.
- Teure Routen können höheres Vertrauen oder ein zweites Signal verlangen.
- Bekannte Fehlerfälle können zu Dataset-Elementen werden.

Das Ziel ist nicht, den Router auf ewig „schlauer“ zu machen. Das Ziel ist, das System leichter nachvollziehbar zu machen.

Manchmal bedeutet das ein besseres Modell. Manchmal einen engeren Prompt. Manchmal einen Workflow-Schritt, einen Scorer, eine harte Obergrenze oder ein langweiliges `if`, das dir jeden Monat vierstellige Beträge spart.

Das ist der ganze Sinn des Messens von Verhalten. Du hörst auf, über Geschmack zu streiten, und argumentierst stattdessen mit Evidenz.

## Eine praktische Einstiegs-Checkliste

Wenn du heute einen Mastra-Router baust, würde ich hier anfangen:

1. Mach die Routing-Entscheidung strukturiert, auch wenn Nutzer sie nie sehen.
2. Schreibe deterministische Scorers für gültiges JSON, erwartete Route und verbotene Routen.
3. Nutze `runEvals` mit 10–20 Fällen, bevor du Router-Prompts oder -Modelle änderst.
4. Fördere echte Fehler in ein versioniertes Dataset.
5. Führe Dataset-Experimente für sinnvolle Prompt-, Modell-, Routen- oder Workflow-Änderungen durch.
6. Füge Live-Scorers für günstige Produktionsinvarianten hinzu.
7. Vergleiche Experimente nach Route, nicht nur nach Durchschnitts-Score.

Der Durchschnitt ist weniger wichtig als das Ausfall-Cluster.

Wenn jede Regression bei der langkontextigen Policy-Synthese liegt, hast du kein „schlechteren Router“. Du hast ein Routengrenzen-Problem. Wenn jeder Fehlerfall ein bestimmtes Tool verwendet, hast du ein Tool-Vertrags-Problem. Wenn jedes günstige Modell an denselben zwei mehrdeutigen Fällen scheitert, brauchst du vielleicht eine Eskalationslogik statt einer teureren Standardeinstellung.

Hier werden Evals nützlich. Nicht als Zeremonie. Nicht als Dashboard, das alle kurz erwachsen fühlen lässt.

Sondern als Weg, die Form des Systems zu finden.

## Ressourcen

- [Mastra Scorers Übersicht](https://mastra.ai/docs/evals/overview)
- [Mastra `createScorer`-Referenz](https://mastra.ai/reference/evals/create-scorer)
- [Mastra `runEvals`-Referenz](https://mastra.ai/reference/evals/run-evals)
- [Mastra Datasets Übersicht](https://mastra.ai/docs/evals/datasets/overview)
- [Mastra Dataset-Experimente](https://mastra.ai/docs/evals/datasets/running-experiments)
- [Heirate nicht dein Modell](../llm-routing-mastra-ai)
- [Bekämpfe Böses mit Evals!](../llm-evals-are-broken)
````
