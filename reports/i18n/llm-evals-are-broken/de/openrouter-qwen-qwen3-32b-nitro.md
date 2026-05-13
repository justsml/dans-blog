# Translation Candidate
- Slug: llm-evals-are-broken
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-06--llm-evals-are-broken/de/index.mdx
- Validation: passed
- Runtime seconds: 25.91
- Input tokens: 10898
- Output tokens: 11114
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.003539
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: Benchmarks messen nur Benchmarks. Ihr System braucht eigene Maßstäbe.
date: '2026-05-01'
modified: '2026-05-06'
tags:
  - ai
  - llm
  - evals
  - testing
  - production
  - quality
  - observability
category: AI
subCategory: Engineering
popularity: 0.85
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Jedes neue Modell präsentiert sich in einem Tuxedo aus Benchmarks.  

MMLU: 92,4 %. HumanEval: 87,2 %. LLeMU: 88,7 %. MATH: 73,6 %. AGI: 127 %!  

Doch für 99 % der Unternehmen, die Prozesse und Produkte mit KI entwickeln, **hat das alles keine Bedeutung.**  

Was zählt? Wie verlaufen **Ihre** Workloads? Werden sie besser oder schlechter? Die einzige sinnvolle Methode, das zu erfahren, besteht darin, Evals (Tests für LLMs) zu schreiben, die die spezifischen Aufgaben, Daten und Fehlermodi Ihres Systems widerspiegeln.  

<blockquote class="breakout">  
  <p>Die Benchmarks lügen nicht. Sie beantworten nur eine andere Frage.</p>  
</blockquote>

## Was 'vibes-basierte Bewertung' tatsächlich kostet

Der Standardansatz: Ein Modell-Update bereitstellen, die Beschwerkanfragen beobachten, zurückrollen, wenn das Team laut wird.

Das verpasst fast alles Wichtige:

**Sie fangen nur laute Fehler.** Nutzer, die eine fälschlicherweise falsche Antwort erhalten und es nicht bemerken? Stumm. Nutzer, die eine schlechtere Antwort erhalten und das Feature verlassen? Stumm. Support-Tickets und Fehlerquoten erfassen nur einen Bruchteil der Qualitätsregressionen.

**Sie können Regressionen von Verbesserungen nicht unterscheiden.** Wenn das neue Modell bei Aufgabe A besser ist und bei Aufgabe B schlechter, sehen Beschwerden über B identisch aus wie allgemeine Rückmeldungen, dass die KI schlechter geworden ist. Sie wissen nicht, was zu beheben ist.

**Sie nutzen Ihre Nutzer als Testinfrastruktur.** Dazu haben sie nicht zugestimmt.

## Der Bewertungsspektrum (und wo die meisten Teams danebenliegen)

Bewertungsmethoden liegen auf einem Spektrum zwischen „schnell, aber unzuverlässig“ und „teuer, aber valide“.

<figure class="breakout">

![Ein Spektrum-Diagramm, das Deterministische Prüfungen, LLM-als-Bewerter und menschliche Bewertung im Hinblick auf Geschwindigkeit, Kosten und Gültigkeit vergleicht.](../eval-spectrum.svg)

<figcaption>Verwenden Sie die günstigste Bewertungsmethode, die den Fehler ehrlich erkennen kann.</figcaption>
</figure>

**LLM-als-Bewerter** ist der aktuelle Favorit: Ein leistungsstarkes Modell beurteilt die Ausgaben eines anderen Modells. Schnell, skalierbar, günstig. Das Problem: Es integriert die Vorurteile des Bewertungsmodells, kann manipuliert werden und erzeugt eine zirkuläre Abhängigkeit. Wenn Sie GPT-5 verwenden, um die Ausgaben von GPT-5 zu bewerten, messen Sie etwas wie „wie sehr stimmt GPT-5 mit GPT-5 überein“. Das ist nicht nichts, aber nicht das, was Sie denken.

**Menschliche Bewertung** ist der Goldstandard, den jeder zu umgehen versucht. Menschen zu bewerten ist teuer, langsam, ungleichmäßig zwischen Bewertern und nervig in der Planung. Aber es ist das Einzige, das validiert, ob Ihr System für echte Menschen nützlich ist.

**Aufgabenbasierte automatisierte Prüfungen** sind der Bereich, in den die meisten Teams mehr Zeit investieren sollten. Sie sind nicht glamourös, aber schnell, deterministisch und direkt an das gebunden, was in Ihrem System zählt.  

---

## Was tatsächlich funktioniert  

### 1. Definieren Sie Fehlschläge vor der Bereitstellung  

Bevor Sie ein Modell oder eine Prompte ändern, notieren Sie sich konkret, wie ein schlechter Ausgang aussieht.  

Nicht „die Ausgabe sollte genau sein“. Das ist kein Test. Eher so:

- Strukturierte JSON-Ausgabe darf keine Fehler aufweisen bei der Analyse  
- Alle Zitierungen in der Antwort müssen wörtlich im abgerufenen Kontext enthalten sein  
- Antworten dürfen keine Namen von Wettbewerbsprodukten erwähnen  
- SQL-Abfragen müssen syntaktisch korrekt sein und nur Tabellen referenzieren, die in der Schemaexistenz vorliegen  
- Sentiment-Klassifizierungen dürfen sich nicht mehr als 3 % der Zeit auf dem bestehenden Testset von positiv zu negativ ändern  

Diese können programmatisch überprüft werden. Kein Judge-Modell erforderlich.  

**Eval-Harness: Deterministische Checks**  

```typescript
type EvalResult = { passed: boolean; reason?: string };

const evals: Record<string, (output: string, context: EvalContext) => EvalResult> = {
  // JSON muss analysierbar sein
  validJson: (output) => {
    try {
      JSON.parse(output);
      return { passed: true };
    } catch (e) {
      return { passed: false, reason: `Ungültiges JSON: ${e.message}` };
    }
  },

  // Keine halluzinierten Zitierungen – jede Aussage muss im Kontext enthalten sein
  groundedCitations: (output, { retrievedChunks }) => {
    const claims = extractCitations(output);
    const ungrounded = claims.filter(
      (claim) => !retrievedChunks.some((chunk) => chunk.includes(claim))
    );
    return ungrounded.length === 0
      ? { passed: true }
      : { passed: false, reason: `Nicht abgeleitete Aussagen: ${ungrounded.join(', ')}` };
  },

  // Längencheck für Antwort – Abbruch oder unkontrollierte Generierung erkennen
  reasonableLength: (output) => {
    const words = output.split(/\s+/).length;
    return words >= 10 && words <= 2000
      ? { passed: true }
      : { passed: false, reason: `Wortanzahl ${words} außerhalb des zulässigen Bereichs` };
  },
};
```

### 2. Erstellen Sie eine Goldmenge aus Ihren schlechtesten Tagen  

Ihr bestes Evaluationsdatensatz ist der peinliche Teil: Die Ausgaben, die jemanden veranlassten, ein Ticket zu erstellen, eine Halluzination zu screenshoten oder die Funktion stillschweigend nicht mehr zu nutzen.  

Jedes Mal, wenn ein Benutzer eine schlechte Ausgabe meldet, eine Halluzination markiert oder Sie eine Fehlfunktion manuell bemerken, fügen Sie dies Ihrer Goldmenge hinzu: den Eingabewert, den Kontext und das korrekte Verhalten. Halten Sie 50–100 Fälle bereit und führen Sie diese bei jedem Modellwechsel aus.

Dies fühlt sich zunächst manuell an. Nach sechs Monaten verfügen Sie über einen Testumfang, den kein öffentliches Benchmark ausnutzen kann, da jeder Fall aus Ihrer eigenen Fehlergeschichte stammt.

<figure class="breakout">

![Ein Workflow-Diagramm, das zeigt, wie schlechte Produktionsvorfälle zu Goldfällen werden, dann CI-Eval-Läufe, dann geblockte Regressionen oder genehmigte Releases.](../golden-set-lifecycle.svg)

<figcaption>Ein Goldmenge wandelt peinliche Vorfälle in eine Regressionssuite um.</figcaption>
</figure>

**Goldfall-Struktur**

```typescript
interface GoldenCase {
  id: string;
  input: string;
  context: Record<string, unknown>;
  expectedBehavior: {
    mustContain?: string[];
    mustNotContain?: string[];
    structureCheck?: (output: string) => boolean;
    minSimilarityToReference?: number; // Kosinus-Ähnlichkeit zu einer Referenzantwort
  };
  sourceIncident?: string; // Link zurück zum Fehlerbericht oder Ticket
}
```

### 3. Regressionstests, nicht nur Akzeptanztests

Die meisten Teams führen Evaluierungen nur durch, wenn sie eine Modelländerung in Betracht ziehen. Das ist Akzeptanztesten: „Ist diese neue Sache gut genug?“

Sie benötigen auch Regressionstests: „Hat dies etwas gebrochen, das zuvor funktionierte?“

Führen Sie Ihren Goldensatz bei jeder Prompt-Änderung aus, nicht nur bei Modelländerungen. Ein Prompt, der bisher gut funktioniert hat, kann stumm an Qualität verlieren, wenn Sie ein neues Tool hinzufügen, eine RAG-Abfragestrategie ändern oder Ihr Kontextvorlagen-Template aktualisieren. Ohne Baseline wissen Sie es nicht. Tools wie [Langfuse](https://langfuse.com/) fügen Bewertungsscores zu Produktionsverfolgungen hinzu, sodass Regressionen in Dashboards erscheinen, nicht nur in Fehlerberichten.

<details>
<summary>Eval Harness: Vergleich von Baseline und Kandidat</summary>

```typescript
async function compareModelVersions(
  goldenCases: GoldenCase[],
  baselinePipeline: Pipeline,
  candidatePipeline: Pipeline
) {
  const results = await Promise.all(
    goldenCases.map(async (tc) => {
      const [baseline, candidate] = await Promise.all([
        baselinePipeline.run(tc.input, tc.context),
        candidatePipeline.run(tc.input, tc.context),
      ]);

      return {
        id: tc.id,
        baselinePassed: runEvals(baseline, tc.expectedBehavior),
        candidatePassed: runEvals(candidate, tc.expectedBehavior),
        regression: /* baseline passed */ && /* candidate failed */,
        improvement: /* baseline failed */ && /* candidate passed */,
      };
    })
  );

  const regressions = results.filter((r) => r.regression);
  const improvements = results.filter((r) => r.improvement);

  console.log(`Regressionen: ${regressions.length} / ${goldenCases.length}`);
  console.log(`Verbesserungen: ${improvements.length} / ${goldenCases.length}`);

  if (regressions.length > 0) {
    console.error('Blockierende Regressionen gefunden:');
    regressions.forEach((r) => console.error(` - ${r.id}`));
  }

  return { regressions, improvements };
}
```

</details>

Wenn ein Kandidat bei bekannten Fehlern zurückfällt, wird die Diskussion über Upgrades erfreulich konkret: Welche Fälle verbesserten sich, welche brachen zusammen und ob der Kompromiss lohnenswert ist.

### 4. LLM-as-Judge für genau einen Zweck nutzen

LLM-as-Judge ist nützlich für offene Outputs, bei denen es keine deterministische richtige Antwort gibt: „Ist diese Antwort hilfreich?“, „Erhält die Zusammenfassung die Schlüsselpunkte?“, „Passt diese Erklärung für Einsteiger?“.

Verwenden Sie es dort. Verwenden Sie es nicht für deterministische Antworten. Wenn Sie es dennoch verwenden, machen Sie das Bewertungsraster explizit:

**Eval-Harness: rubrikbasiertes Urteilen**

```typescript
async function judgeHelpfulness(
  userQuery: string,
  modelResponse: string
): Promise<{ score: number; reasoning: string }> {
  const judgePrompt = `
You are evaluating a customer support response.

User question: ${userQuery}
Response: ${modelResponse}

Rate the response on a scale of 1-5:
5 = Directly answers the question with accurate, actionable information
4 = Answers the question but could be more specific or actionable
3 = Partially addresses the question; key information is missing
2 = Tangentially related but doesn't answer the question
1 = Off-topic, factually wrong, or harmful

Respond with JSON: {"score": <number>, "reasoning": "<one sentence>"}
`;

  const result = await judgeModel.generate(judgePrompt);
  return JSON.parse(result);
}
```

Ein explizites Bewertungsraster reduziert die Variabilität der Bewertung, liefert interpretierbare Ausgaben und erleichtert die Prüfung, wenn das Urteilsmodell falsch liegt. Bibliotheken wie [Autoevals](https://github.com/braintrustdata/autoevals) und [Braintrust](https://www.braintrust.dev/) liefern vorgefertigte Bewertungsraster für gängige Aufgaben – es lohnt sich, diese zu übernehmen, anstelle sie von Grund auf selbst zu entwickeln.

---

## Tools, die man kennen sollte

Sie müssen nicht alles von Grund auf bauen. Mehrere Tools haben Fortschritte bei der Evaluations-Infrastruktur erzielt:

**[Braintrust](https://www.braintrust.dev/)** – Umfassende Eval-Plattform mit Experiment-Tracking, Datensatzverwaltung und Bewertungsfunktionen. Organisiert Eval-Runs nach Prompt, Modell und Deployment, sodass Sie Qualitätsunterschiede im Zeitverlauf analysieren können, nicht nur zwischen Releases. Passt gut zu deren Open-Source-Bibliothek **[Autoevals](https://github.com/braintrustdata/autoevals)**, die vorgefertigte, durch das Modell bewertete Bewertungsfunktionen für gängige Aufgaben (faktische Genauigkeit, Nützlichkeit, Toxizität, semantische Ähnlichkeit) bereitstellt.

**[Langfuse](https://langfuse.com/)** — Open-Source-LLM-Beobachtung, die zwischen Ihrer Anwendung und Ihren Modellen liegt. Verfolgt jeden Aufruf, ordnet Bewertungsergebnisse (von Menschen oder automatisiert) einzelnen Spans zu und zeigt Qualitätsentwicklungen über Produktivverkehr auf. Gute Wahl, wenn Sie Beobachtbarkeit und Bewertungen in einem Tool wünschen, statt in einem separaten Bewertungsharness.

**[Evalite](https://www.evalite.dev/)** — TypeScript-native Bewertungsrahmenwerk von Matt Pocock. Einfach in der Anwendung: Definieren Sie eine Aufgabe, definieren Sie einen Bewertungsmechanismus, führen Sie es in Ihrem bestehenden Testsetup aus. Zielgruppe: Teams, die Bewertungen haben möchten, die wie Einheiten-Tests fühlen, statt wie ein separates ML-Experiment-Plattform.

**[promptfoo](https://www.promptfoo.dev/)** — CLI-first Bewertungsläufer mit Fokus auf Prompt-Vergleich und Roten-Team-Tests. Einfach über YAML konfigurierbar, integriert sich mit den meisten Modellanbietern und bietet eingebaute Unterstützung für die Erkennung von Prompt-Injektionen und anderen feindlichen Eingaben.

**[deepeval](https://docs.confident-ai.com/)** — Python-Bewertungsrahmenwerk mit umfangreicher Bibliothek eingebauter Metriken (G-Eval, RAG-Treue, Antwortrelevanz, Halluzinationsdetektion). Nützlich für RAG-Pipelines, bei denen Sie spezifische Bewertungen für Retrieval-Qualität wünschen, nicht nur für Generationsqualität.

Das richtige Tool hängt von Ihrem Stack und Ihrem Ausgangspunkt ab. Wichtiger als die Wahl des Frameworks ist die Disziplin, Bewertungen überhaupt durchzuführen – konsequent, bei jedem bedeutenden Änderung.

## Der unbequeme Teil  

Die meisten Teams überspringen diesen Schritt, weil er früh eine lästige Frage stellt: Wie würde „gut“ hier aussehen?  

Das ist für ein neues AI-Funktion wirklich schwer zu beantworten. Es ist jedoch unerlässlich, wenn Sie Zuverlässigkeit schätzen. Teams, die vertrauenswürdige AI einsetzen, tun das Gleiche, was sie für jeden kritischen Codepfad tun würden: Erwartetes Verhalten definieren, es testen und diese Tests kontinuierlich ausführen.  

Die Benchmarks lügen nicht. Sie beantworten nur eine andere Frage. Stoppen Sie, sie als Produktroadmaps zu lesen, und beginnen Sie Tests zu schreiben, die Ihr System abbilden.  

Ihre Nutzer werden es früher bemerken als Ihre Dashboards. Bauen Sie zuerst das Testumfeld auf.
````
