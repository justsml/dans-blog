# Translation Candidate
- Slug: llm-evals-are-broken
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-06--llm-evals-are-broken/de/index.mdx
- Validation: passed
- Runtime seconds: 18.55
- Input tokens: 10939
- Output tokens: 3672
- Thinking tokens: unknown
- Cached input tokens: 2176
- Cache write tokens: 0
- Estimated cost: $0.001088
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Bekämpfedas Böse mit Evals!
subTitle: Benchmarks messen Benchmarks. Ihr System braucht eigene Messungen.
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
Jedes neue Modell erscheint im Smoking der Benchmarks.

MMLU: 92,4 %. HumanEval: 87,2 %. LLeMU: 88,7 %. MATH: 73,6 %. AGI: 127 %!

Doch für 99 % der Unternehmen, die Prozesse & Produkte mit KI bauen, **ist das alles irrelevant.**

Was zählt? Wie schlägt sich IHR Workload? Wird es besser oder schlechter? Der einzige vernünftige Weg, das herauszufinden, besteht darin, Evals (Tests für LLMs) zu schreiben, die die konkreten Aufgaben, Daten und Fehlermodi Ihres Systems abbilden.

<blockquote class="breakout">
  <p>Die Benchmarks lügen nicht. Sie beantworten die Frage eines anderen.</p>
</blockquote>

## Was „Vibes‑Based Evaluation“ tatsächlich kostet

Der Standard‑Ansatz: ein Modell‑Update ausrollen, die Beschwerde‑Kanäle beobachten und zurückrollen, wenn es laut wird.

Damit verpasst du fast alles, was wirklich zählt:

**Du fängst nur laute Fehler ab.** Nutzer, die eine zuversichtlich falsche Antwort erhalten und das nicht merken? Schweigen. Nutzer, die eine schlechtere Antwort bekommen und das Feature aufgeben? Schweigen. Support‑Tickets und Fehlerraten erfassen nur einen Bruchteil der Qualitäts‑Regressionen.

**Du kannst Regressionen nicht von Verbesserungen unterscheiden.** Wenn das neue Modell bei Aufgabe A besser und bei Aufgabe B schlechter ist, sehen Beschwerden über B exakt gleich aus wie das generische „die KI ist schlechter geworden“-Feedback. Du weißt nicht, was zu beheben ist.

**Du nutzt deine Nutzer als Test‑Infrastruktur.** Dafür haben sie sich nicht angemeldet.

---

## Das Eval‑Spektrum (und wo die meisten Teams scheitern)

Evaluierungsansätze liegen auf einem Spektrum von „schnell aber wackelig“ bis „aufwändig aber valide“.

<figure class="breakout">

![Ein Spektrum‑Diagramm, das deterministische Checks, LLM‑als‑Richter und menschliche Evaluation nach Geschwindigkeit, Kosten und Validität vergleicht.](../eval-spectrum.svg)

<figcaption>Verwende die günstigste Evaluierungsmethode, die den Fehler ehrlich erkennen kann.</figcaption>
</figure>

**LLM‑als‑Richter** ist derzeit das Lieblings‑Tool: Man lässt ein leistungsstarkes Modell die Ausgaben eines anderen Modells bewerten. Schnell, skalierbar, billig. Das Problem: Es übernimmt die Vorurteile des Bewertungs‑Modells, kann manipuliert werden und erzeugt eine zirkuläre Abhängigkeit. Wenn du GPT‑5 nutzt, um die Ausgaben von GPT‑5 zu bewerten, misst du so etwas wie „wie sehr stimmt GPT‑5 mit sich selbst überein“. Das ist nicht wertlos, aber es ist nicht das, was du erwartest.

**Menschliche Evaluation** ist der Goldstandard, den jeder zu überspringen versucht. Menschen zur Bewertung von Ausgaben einzusetzen ist teuer, langsam, inkonsistent zwischen den Bewertern und mühsam zu planen. Aber sie ist das einzige Mittel, das bestätigt, ob dein System für echte Menschen nützlich ist.

**Aufgaben‑spezifische automatisierte Prüfungen** sind dort, wo die meisten Teams mehr Zeit investieren sollten. Sie sind nicht glamourös, aber sie sind schnell, deterministisch und an das gebunden, was in Ihrem System wirklich zählt.

---

## Was tatsächlich funktioniert

### 1. Definieren Sie das Versagen, bevor Sie ausliefern

Bevor Sie ein Modell oder Prompt ändern, notieren Sie, wie ein schlechtes Ergebnis aussieht. Konkret.

Nicht „die Ausgabe sollte korrekt sein.“ Das ist kein Test. Mehr in etwa so:

- Strukturierter JSON‑Ausgabe muss fehlerfrei parse‑bar sein  
- Alle Zitate in der Antwort müssen exakt im abgerufenen Kontext vorkommen  
- Antworten dürfen keine Namen von Konkurrenzprodukten erwähnen  
- SQL‑Abfragen müssen syntaktisch korrekt sein und dürfen nur Tabellen referenzieren, die im Schema existieren  
- Die Sentiment‑Klassifizierung darf auf dem bestehenden Test‑Set nicht öfter als 3 % von positiv zu negativ wechseln  

Sie können diese Punkte programmgesteuert prüfen. Ein Bewertungs‑Modell ist nicht nötig.

**Eval‑Framework: deterministische Prüfungen**

```typescript
type EvalResult = { passed: boolean; reason?: string };

const evals: Record<string, (output: string, context: EvalContext) => EvalResult> = {
  // JSON muss parse‑bar sein
  validJson: (output) => {
    try {
      JSON.parse(output);
      return { passed: true };
    } catch (e) {
      return { passed: false, reason: `Invalid JSON: ${e.message}` };
    }
  },

  // Keine halluzinierten Zitate — jede Behauptung muss im Kontext vorkommen
  groundedCitations: (output, { retrievedChunks }) => {
    const claims = extractCitations(output);
    const ungrounded = claims.filter(
      (claim) => !retrievedChunks.some((chunk) => chunk.includes(claim))
    );
    return ungrounded.length === 0
      ? { passed: true }
      : { passed: false, reason: `Ungrounded claims: ${ungrounded.join(', ')}` };
  },

  // Plausibilitäts‑Check der Antwortlänge — fängt Abschneiden oder unkontrollierte Generierung ab
  reasonableLength: (output) => {
    const words = output.split(/\s+/).length;
    return words >= 10 && words <= 2000
      ? { passed: true }
      : { passed: false, reason: `Word count ${words} out of bounds` };
  },
};
```

### 2. Erstellen Sie ein Golden‑Set aus Ihren schlimmsten Tagen

Ihre besten Evaluierungsdaten sind die peinlichen Fälle: Ausgaben, die jemanden dazu gebracht haben, ein Ticket zu öffnen, einen Halluzinations‑Screenshot zu machen oder das Feature stillschweigend nicht mehr zu nutzen.

Jedes Mal, wenn ein Nutzer eine fehlerhafte Ausgabe meldet, eine Halluzination markiert oder Sie manuell einen Ausfall bemerken, fügen Sie das zum Golden‑Set hinzu: Eingabe, Kontext und das korrekte Verhalten. Halten Sie 50‑100 Fälle bereit und führen Sie sie bei jeder Modelländerung aus.

Das wirkt zunächst manuell. Nach sechs Monaten besitzen Sie jedoch eine Testsuite, die kein öffentlicher Benchmark manipulieren kann, weil jeder Fall aus Ihrer eigenen Fehlhistorie stammt.

<figure class="breakout">

![Ein Workflow‑Diagramm, das zeigt, wie fehlerhafte Produktionsvorfälle zu Golden‑Cases werden, dann CI‑Eval‑Durchläufe, dann blockierte Regressionen oder freigegebene Releases.](../golden-set-lifecycle.svg)

<figcaption>Ein Golden‑Set verwandelt die peinlichen Fälle in eine Regression‑Suite.</figcaption>
</figure>

**Form eines Golden‑Cases**

```typescript
interface GoldenCase {
  id: string;
  input: string;
  context: Record<string, unknown>;
  expectedBehavior: {
    mustContain?: string[];
    mustNotContain?: string[];
    structureCheck?: (output: string) => boolean;
    minSimilarityToReference?: number; // cosine similarity to a reference answer
  };
  sourceIncident?: string; // link back to the bug report or ticket
}
```

### 3. Regressionstests, nicht nur Akzeptanztests

Die meisten Teams führen Evals nur dann aus, wenn ein Modellwechsel in Betracht gezogen wird. Das ist Akzeptanztest: „Ist das neue Ding gut genug?“

Sie benötigen außerdem Regressionstests: „Hat das etwas kaputt gemacht, das vorher funktionierte?“

Führen Sie Ihr Golden‑Set bei jeder Prompt‑Änderung aus, nicht nur bei Modellwechseln. Ein Prompt, der bislang einwandfrei funktionierte, kann stillschweigend schlechter werden, wenn Sie ein neues Tool hinzufügen, die RAG‑Abrufstrategie ändern oder Ihre Kontextvorlage aktualisieren. Ohne eine Basislinie wissen Sie das nicht. Werkzeuge wie [Langfuse](https://langfuse.com/) hängen Evaluations‑Scores an Produktions‑Traces, sodass Regressionen in Dashboards erscheinen und nicht nur in Incident‑Reports.

<details>
<summary>Eval‑Harness: Vergleich von Basis‑ vs. Kandidaten‑Version</summary>

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

  console.log(`Regressions: ${regressions.length} / ${goldenCases.length}`);
  console.log(`Improvements: ${improvements.length} / ${goldenCases.length}`);

  if (regressions.length > 0) {
    console.error('Blocking regressions found:');
    regressions.forEach((r) => console.error(` - ${r.id}`));
  }

  return { regressions, improvements };
}
```

</details>

Wenn ein Kandidat bei bekannten Fehlfällen regressiert, wird das Upgrade‑Gespräch wunderbar konkret: welche Fälle haben sich verbessert, welche sind gescheitert und ob sich der Trade‑off lohnt.

### 4. LLM‑als‑Richter nur für genau eine Sache verwenden

LLM‑als‑Richter ist nützlich für offene Ausgaben, bei denen es keine deterministische richtige Antwort gibt: „Ist diese Antwort hilfreich?“, „Bewahrt diese Zusammenfassung die wichtigsten Punkte?“, „Ist diese Erklärung für einen Anfänger korrekt?“

Setzen Sie es dort ein. Verwenden Sie es nicht für deterministische Antworten. Wenn Sie es einsetzen, machen Sie die Bewertungs‑Rubrik explizit:

**Eval‑Harness: rubrikbasierter Richter**

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

Eine explizite Rubrik reduziert die Varianz der Bewertung, liefert interpretierbare Ergebnisse und erleichtert das Auditieren, wenn der Richter falsche Entscheidungen trifft. Bibliotheken wie [Autoevals](https://github.com/braintrustdata/autoevals) und [Braintrust](https://www.braintrust.dev/) stellen vorgefertigte Rubriken für gängige Aufgaben bereit — ein guter Diebstahl, bevor Sie Ihre eigene von Grund auf schreiben.

---

## Werkzeuge, die man kennen sollte

Sie müssen nicht alles selbst entwickeln. Mehrere Tools haben beim Problem der Evaluations‑Infrastruktur bereits ernsthafte Fortschritte erzielt:

**[Braintrust](https://www.braintrust.dev/)** — Vollständige Evaluationsplattform mit Experiment‑Tracking, Datensatz‑Verwaltung und Scoring‑Funktionen. Organisiert Evaluationsläufe nach Prompt, Modell und Deployment, sodass Sie Qualitätsunterschiede über die Zeit hinweg und nicht nur zwischen Releases vergleichen können. Passt gut zu ihrer Open‑Source‑Bibliothek **[Autoevals](https://github.com/braintrustdata/autoevals)**, die vorgefertigte, modell‑basierte Scoring‑Funktionen für gängige Aufgaben (faktische Genauigkeit, Hilfreich­keit, Toxizität, semantische Ähnlichkeit) bereitstellt.

**[Langfuse](https://langfuse.com/)** — Open‑Source‑LLM‑Observability, die zwischen Ihrer Anwendung und Ihren Modellen sitzt. Sie protokolliert jeden Aufruf, hängt Evaluations‑Scores (menschlich oder automatisiert) an einzelne Spans an und stellt Qualitäts‑Trends im Produktions‑Traffic dar. Gute Wahl, wenn Sie Beobachtbarkeit und Evaluierungen im selben Tool statt in einem separaten Eval‑Harness wollen.

**[Evalite](https://www.evalite.dev/)** — TypeScript‑native Evaluations‑Framework von Matt Pocock. Minimaler Overhead: Definieren Sie eine Aufgabe, definieren Sie einen Scorer und führen Sie es in Ihrem bestehenden Test‑Setup aus. Zielgruppe sind Teams, die Evaluierungen wie Unit‑Tests erleben möchten, statt einer separaten ML‑Experiment‑Plattform.

**[promptfoo](https://www.promptfoo.dev/)** — CLI‑first Eval‑Runner, der sich auf Prompt‑Vergleiche und Red‑Team‑Testing konzentriert. Einfach per YAML zu konfigurieren, integriert sich in die meisten Modell‑Provider und bietet integrierte Unterstützung zur Erkennung von Prompt‑Injection und anderen adversarialen Eingaben.

**[deepeval](https://docs.confident-ai.com/)** — Python‑Eval‑Framework mit einer umfangreichen Bibliothek eingebauter Metriken (G‑Eval, RAG‑Faithfulness, Answer‑Relevancy, Halluzinations‑Erkennung). Nützlich für RAG‑Pipelines, bei denen Sie eine spezifische Bewertung der Retrieval‑Qualität benötigen, nicht nur der Generierungs‑Qualität.

Das passende Werkzeug hängt von Ihrem Stack und Ihrem Ausgangspunkt ab. Entscheidend ist weniger die Wahl des Frameworks, sondern die Disziplin, Evaluierungen überhaupt durchzuführen — konsequent, bei jeder signifikanten Änderung.

## Der unbequeme Teil

Die meisten Teams überspringen das, weil es gleich zu Beginn eine nervige Frage stellt: Wie würde hier „gut“ aussehen?

Das ist für ein neues KI‑Feature wirklich schwer zu beantworten. Gleichzeitig ist es unverzichtbar, wenn Ihnen Zuverlässigkeit wichtig ist. Teams, die vertrauenswürdige KI ausliefern, verfahren genauso wie bei jedem kritischen Code‑Pfad: Sie definieren das erwartete Verhalten, testen es und führen diese Tests kontinuierlich aus.

Die Benchmarks lügen nicht. Sie beantworten die Frage eines anderen. Hören Sie auf, sie als Produkt‑Roadmaps zu interpretieren, und schreiben Sie Tests, die zu Ihrem System passen.

Ihre Nutzer werden es bemerken, bevor es Ihre Dashboards tun. Erstellen Sie zuerst die Testsuite.
````
