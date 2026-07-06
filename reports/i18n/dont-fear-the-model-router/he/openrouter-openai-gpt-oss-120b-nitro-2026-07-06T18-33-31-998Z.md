# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/he/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 6.82
- Input tokens: 12019
- Output tokens: 6673
- Thinking tokens: unknown
- Cached input tokens: 3456
- Cache write tokens: 0
- Estimated cost: $0.001670
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug dont-fear-the-model-router --locale he --skip-global (code 1)
## Raw Output

````mdx
---
title: אל תפחדו מנתב המודלים
subTitle: הפנהלמודל הטוב ביותר בביטחון
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
הגרסה הראשונה של [Don't Marry Your Model](/llm-routing-mastra-ai) הציגה את הטיעון הפשוט: להפסיק לשלוח כל משימה לאותו מודל רק בגלל שהוא ניצח בתחרות האחרונה.

השתמש במודל זול לעבודה זולה. השתמש במודל חזק יותר כאשר העבודה באמת קשה. שמור על שכבת הניתוב גמישה מספיק כדי שתוכל להחליף ספקים מבלי להפוך את בסיס הקוד שלך למקדש.

זה היה נכון.

זה גם היה חלקי.

כי ברגע שאתה מוסיף ניתוב, יש לך התנהגות מערכת חדשה לבדיקה. השאלה כבר לא "איזה מודל הוא הטוב ביותר?" אלא "האם המערכת בחרה בנתיב הנכון, השתמשה בכלים הנכונים, שמרה על הראיות המתאימות, ועצרה בזמן הנכון?"

אם אינך מודד זאת, ניתוב המודל שלך הוא רק תחושה עם טבלת הפצה.

<p class="inset">
הנתב אינו הפתרון. הנתב הוא היפותזה לגבי איך המערכת שלך צריכה להתנהג.
</p>

Mastra מספקת לנו משטחים שימושיים להפיכת ההיפותזה הזו למשהו שניתן לבדיקה: [scorers](https://mastra.ai/docs/evals/overview), [`runEvals`](https://mastra.ai/reference/evals/run-evals), [datasets](https://mastra.ai/docs/evals/datasets/overview) ו-[experiments](https://mastra.ai/docs/evals/datasets/running-experiments). שמות ה‑API נשמעים כמו תשתית הערכה, וזה בדיוק מה שהם, אך הערך האמיתי הוא פשוט יותר:

הם הופכים את התנהגות הסוכן לגלוייה מספיק כדי שנוכל להתווכח עליה.

## מה אנחנו בודקים?

נתב המודל מהפוסט הקודם כולל שלושה נתיבים מומחים ברורים:

| נתיב | מה צריך ללכת לשם | מה יהיה נתיב גרוע |
|---|---|---|
| `code` | יישום, ריפקטורינג, דיבוג, ביקורת קוד | סיכום קונטקסט ארוך, סיווג פשוט |
| `long-context` | מסמכים מבולגנים, תמלילים, סינתזת מדיניות, קבצים מרובים | פורמטינג מכני קצר |
| `general` | סיווג, פורמטינג, שאלות ותשובות פשוטות, חילוץ משעמם | קוד קשה או ניתוח כבד בראיות |

הטבלה הזו היא התחלה, אך היא איננה הערכה.

הערכת ערכה דורשת דוגמאות ו‑scorers:

| פריט | תפקיד |
|---|---|
| פריט dataset | "הנה בקשה מייצגת." |
| אמת קרקע | "הנה הנתיב או ההתנהגות שציפינו להם." |
| Scorer | "הנה איך אנחנו מחליטים אם הפלט עבר." |
| ניסוי | "הנה הריצה שנוכל להשוות אליה בריצות עתידיות." |

המהלך החשוב הוא לבדוק התנהגות, לא רק איכות הטקסט.

מודל יכול לכתוב תשובה יפה אחרי שבחר במומחה הלא נכון. סוכן אבטחה יכול לייצר דוח משכנע בלי לשמור על ראיות. סוכן תמיכה יכול להישמע אמפתי תוך דילוג על בדיקת מדיניות ההחזר. הפסקה היא החלק הגלוי. המסלול הוא המקום שבו הבאגים מתרחשים.

לנתב, בדרך כלל אני מתחיל עם ארבעה צירים:

| ציר | שאלה | מדד דוגמה |
|---|---|---|
| איכות | האם נבחר המסלול הנכון והתקבל תוצאה שימושית? | דיוק המסלול, שלמות התשובה, נאמנות |
| עלות | האם נמנע משימוש במודלים פרימיום עבור עבודה משעממת? | מחלקת עלות של המסלול שנבחר, תקציב טוקנים |
| מהירות | האם הסתיים בתוך תקציב השהייה של המוצר? | מדד זמן ריצה או פקיעת זמן |
| אחר | האם נשמרו מגבלות בטיחות, פרטיות ונראות? | רשימת כלים מורשים, שמירת ראיות, התנהגות סירוב |

העמודה האחרונה חשובה. “אחר” הוא המקום שבו נצבר צלקת הייצור.

## הפיכת החלטת הנתב לנמדדת

אם הנתב מחזיר רק תשובה סופית, קשה להבין למה הוא פעל כך. אפשר עדיין למדוד את הפלט, אך מדובר בניחוש לגבי ההחלטה.

להערכת מודלים, תנו שלב הניתוב חוזה מובנה קטן:

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

מערכת הייצור אינה צריכה להציג JSON זה למשתמשים. הוא יכול להיות שלב פנימי, העברת זרימה, או סימן עקבות. המדד צריך רק משטח.

הנה סוכן Mastra קטן במכוון שבוחר מסלול:

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

כן, זה קצת מלאכותי. טוב. הערכות מעודדות חיבורים משעממים.

כאשר החלטת הנתב מפורשת, אפשר לבדוק את המסלול לפני שמבצעים את הבדיקה על המומחה המורד. כך מתגלה האם הבעיה היא בנתב, במודל שנבחר, בפרומפט, במשטח הכלי, או במדד התשובה הסופית.

## כתיבת מדד שתופס את הכשל המשעמם

`createScorer` של Mastra (<https://mastra.ai/reference/evals/create-scorer>) יכול להשתמש בפונקציות JavaScript, בפרומפטים של שופטי LLM, או בשניהם. התחילו בפונקציות כאשר הכשל דטרמיניסטי. הן זולות יותר, מהירות יותר ופחות מסתוריות.

לדיוק המסלול, איננו זקוקים למודל שופט. צריך רק לנתח JSON ולהשוות שדה אחד.

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

המדד הזה אינו נוצץ. זה הכוונה.

אם הנתב לא מצליח באופן עקבי להפיק JSON תקף ולבחור במומחה הברור על סט מבחן קטן, אין סיבה לסמוך עליו בתעבורת ייצור. אין צורך באונטולוגיה של מודל פילוסופי. צריך רק את המקביל לאזעקת עשן עם סוללה בתוכה.

## הרצת לולאת הערכה קטנה תחילה

`runEvals` של Mastra (<https://mastra.ai/reference/evals/run-evals>) היא הלולאה המהירה. ספקו יעד, מקרי מבחן, מדדים, והגבלת קונקורנטיות. היא מריצה את היעד על הנתונים ומחזירה צבירות מדדים.

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

זו הלולאה שמופעלת כאשר משנים את הפרומפט, מוסיפים מסלול חדש, או מנסים מודל נתב זול יותר.

זה לא מספיק למערכת מבוגרת, אך זה מספיק כדי למנוע את הרגרסיה המביכה ביותר: “שינינו את פרומפט הנתב והוא התחיל לשלוח משימות סיווג למודל הקוד הפרימיום”.

עלות, מהירות, איכות, ושאר כולם מופיעים כאן:

- עלות: מודל הנתב יכול להישאר זול אם הדיוק נשמר.
- מהירות: ההערכה יכולה לאכוף מגבלות זמן או לתעד השהייה במארז.
- איכות: דיוק המסלול ואיכות התשובה הסופית הם מדדים נפרדים.
- אחר: תקפות ה‑JSON, כלים מורשים, בטיחות, ועקביות נרשמים בבדיקות משלהם.

אל תאגד את כל זה לציון “איכות” אחד. ממוצעים הם המקום שבו כשלונות מועילים מתפנים.

## הוסף שופט LLM רק כשזה מצדיק את עצמו

חלק מהתנהגות של הנתב היא סובייקטיבית. בקשה יכולה להיות אמיתית בלתי‑חד משמעית:

```text
Read these logs and tell me why the deploy failed.
```

האם זה `code` בגלל ניפוי באגים? `long-context` בגלל הלוגים? `general` בגלל סיכום? המסלול הנכון תלוי במשטח הכלים ובהבטחה של המוצר שלך.

כאן שופט LLM יכול לעזור, אך רק עם רובריק מדויק. מסקני Mastra יכולים לשלב שלבי פונקציה ושלבי פרומפט‑אובייקט. השתמש בפונקציות למבנה, ואז השתמש בשופט לחלק שדורש באמת שיפוט.

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

הסקור הזה עולה כסף מכיוון שהוא קורא למודל שופט. זה מקובל כאשר השיפוט שווה את העלות.

אל תשתמש בו כדי לבדוק אם ה‑JSON מתפרש.

## קדם מקרים טובים לתוך סט נתונים

מערכי הערכה קבועים בקוד הם מקובלים בתחילת הדרך. עם הזמן הדוגמאות שלך הופכות לנכסי מוצר. כרטיס הלקוח שנכשל, השיחה המוזרה בתמיכה, ניסיון הזרקת פרומפט, הבקשה שהייתה מת routed נכון לפני יום חמישי האחרון.

זה שייך לסט נתונים.

סטי נתונים של Mastra הם אוספים מוּגְרָסִים של מקרי מבחן. כל שינוי יוצר גרסה חדשה, מה שמאפשר להריץ ניסוי מחדש על אותו סט מקרים שהיה קיים ברגע שהחלטת על מודל.

ראשית, הגדר אחסון, מכיוון שסטי נתונים דורשים קביעות:

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

לאחר מכן צור סט נתונים והוסף מקרים:

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

ברגע שיש לך סט נתונים, אפשר להפסיק להתייחס למקרי הערכה כנתונים זמניים של סקריפט. הם מקבלים מזהים, גרסאות, היסטוריה ותוצאות ניסויים.

זהו הרגע שבו הערכות מתחילות להרגיש פחות כמו “קבצי מבחן לפרומפטים” ויותר כמו זיכרון מוצר.

## הרץ ניסויים נגד הנתב


לאחר שהקבוצה נתונים קיימת, השתמש ב‑[`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) כדי להריץ אותה נגד סוכן, זרימת עבודה או מעריך רשום.

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

עכשיו השיחה משתנה.

במקום “הנתב החדש נראה טוב יותר”, אפשר לומר:

- הנתב הישן קיבל `0.94` בדיוק נתיב.
- הנתב החדש קיבל `0.98` בסך הכל.
- הוא שיפר ניתוב קונטקסט ארוך.
- הוא חזר במקרים של סקירת קוד.
- הוא הפחית העברות למודלים פרימיום ב‑18%.
- הוא הוסיף 300 ms של השהיית נתב.

זו שיחה הנדסית. יש כאן פשרות. אתה יכול להחליט אם הפשרה שווה את המאמץ.

## מדוד התנהגות חיה, אך אל תבלבל אותה עם אמת קרקע

Mastra יכולה גם לצרף מעריכים ישירות לסוכנים ולשלבי זרימת עבודה. מעריכים חיים פועלים אסינכרונית ושומרים תוצאות מדד בבסיס הנתונים המוגדר שלך, עם שליטה בדגימה כך שלא תמדד כל תגובה בייצור אלא אם כן אתה מתכוון לכך.

זה שימושי, אך מדובר בתפקיד שונה.

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

מדידת חיה יכולה להראות שהנתב עדיין מפיק החלטות תקינות. היא יכולה לתפוס פלט פגום, תוכן רעיל, קריאות כלי אסורות, חסרים סמני ראיות, או רמת ביטחון חשודה.

בדרך כלל היא לא יכולה לקבוע את דיוק הנתיב, מכיוון שתעבורת הייצור אינה מגיעה עם אמת קרקע מצורפת.

ההבחנה הזאת חשובה. מדידת חיה היא ניטור. ניסויי קבוצה הם מבחנים מבוקרים. אתה רוצה את שניהם, אך הם עונים על שאלות שונות.

## מה למדוד אחרי דיוק הנתיב

דיוק הנתיב הוא הקומה הראשונה. הוא אומר האם הבקשה נשלחה למומחה הצפוי. הוא לא אומר האם המומחה ביצע עבודה טובה.

לאחר שהנתב עבר את הבסיס, מדוד את המערכת בשכבות:

| שכבה | מה למדוד | למה זה חשוב |
|---|---|---|
| החלטת נתב | נתיב נבחר, רמת ביטחון, סיבה | תופס סיווג שגוי וכללי הסללה רעים |
| מסלול | רצף כלי או סוכן צפוי | תופס התנהגות “תשובה נכונה, דרך שגויה” |
| פלט מומחה | נכונות, נאמנות, שימושיות | תופס עבודה באיכות נמוכה אחרי ניתוב נכון |
| עלות והשיהוי | בחירת מודל, טוקנים, זמן ריצה | תופס ניצחונות יקרים או איטיים |
| בטיחות והיקף | כלים מורשים, גבולות סירוב, ראיות | תופס כשלונות סיכון מוצר |

API `runEvals` של Mastra תומך בתצורות מעריך ברמת סוכן, זרימת עבודה, שלב, ומסלול. משמעות הדבר שאתה לא צריך להציג את התשובה הסופית כפריט היחיד.

לזרימת עבודה, המבנה יכול להיראות כך:

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

זה המודל המנטלי שאני רוצה לסוכנים בייצור:

העריכו את ההחלטה. העריכו את המסלול. העריכו את התשובה.

אם תעריכו רק את התשובה, המודל יכול לעבור בטעות.

## המנתב צריך להפוך לשגרתי יותר עם הזמן

הפרומפט הראשון של הניתוב הוא בדרך כלל פסקה של קריאות שיפוט. זה בסדר עבור אבטיפוס.

כאשר אתם לומדים מההערכות, חלקים מהמנתב צריכים לאבד את הקסם שלהם:

- מקרים לקסיקליים ברורים יכולים להפוך לכללים דטרמיניסטיים.  
- משימות מסוכנות יכולות לדרוש אישור מפורש או ענף בתהליך העבודה.  
- משימות דו‑משמעותיות יכולות לשאול שאלה מבהירה במקום לנחש.  
- מסלולים יקרים יכולים לדרוש רמת ביטחון גבוהה יותר או אות שני.  
- מקרים של כשל ידועים יכולים להפוך לפריטים במאגר הנתונים.

המטרה איננה להפוך את המנתב ל„חכם“ לנצח. המטרה היא להפוך את המערכת לקלה יותר להבנה.

לפעמים זה אומר מודל טוב יותר. לפעמים זה אומר פרומפט מדויק יותר. לפעמים זה אומר שלב בתהליך העבודה, סקור, מגבלה קשיחה, או תנאי `if` משעמם שחוסך לכם ארבע ספרות בחודש.

זהו כל הרעיון של מדידת ההתנהגות. אתם מפסיקים להתווכח על טעם ומתחילים להתווכח על ראיות.

## רשימת בדיקה מעשית להתחלה

אם אתם בונים מנתב Mastra היום, הייתי מתחיל כאן:

1. הפכו את החלטת הניתוב למבנה, אפילו אם המשתמשים לעולם לא רואים זאת.  
2. כתבו סקוררים דטרמיניסטיים עבור JSON תקין, מסלול צפוי, ומסלולים אסורים.  
3. השתמשו ב‑`runEvals` עם 10‑20 מקרים לפני שינוי פרומפטים של המנתב או מודלים.  
4. קידמו כשלונות אמיתיים למאגר נתונים בעל גרסאות.  
5. הריצו ניסויי מאגר נתונים עבור שינויי פרומפט, מודל, מסלול או תהליך עבודה משמעותיים.  
6. הוסיפו סקוררים בזמן אמת עבור אינבריאנטים יקרים בייצור.  
7. השוו ניסויים לפי מסלול, ולא רק לפי ממוצע הציון.

הממוצע חשוב פחות מהקלאסטר של הכשלים.

אם כל הרגרסיה מתרחשת בסינתזת מדיניות של הקשר ארוך, אין לכם „מנתב גרוע יותר“. יש לכם בעיית גבול מסלול. אם כל מקרה נכשל משתמש בכלי ספציפי, יש לכם בעיית חוזה כלי. אם כל מודל זול נכשל באותן שתי משימות דו‑משמעותיות, ייתכן שתצטרכו לוגיקת הסלמה במקום ברירת מחדל יקרה יותר.

זה המקום שבו הערכות הופכות לשימושיות. לא כטקס. לא כמסך שמקנה לכל אחד תחושה זמנית של בגרות.

כדרך למצוא את הצורה של המערכת.

## משאבים

- [סקירת סקוררים של Mastra](https://mastra.ai/docs/evals/overview)  
- [התייחסות ל‑`createScorer` של Mastra](https://mastra.ai/reference/evals/create-scorer)  
- [התייחסות ל‑`runEvals` של Mastra](https://mastra.ai/reference/evals/run-evals)  
- [סקירת מאגרי הנתונים של Mastra](https://mastra.ai/docs/evals/datasets/overview)  
- [ניסויי מאגרי נתונים של Mastra](https://mastra.ai/docs/evals/datasets/running-experiments)  
- [אל תתחתנו את המודל שלכם](/llm-routing-mastra-ai)  
- [הילחמו ברשעים עם הערכות!](/llm-evals-are-broken)
````
