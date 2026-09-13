# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: he
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/he/index.mdx
- Validation: deferred
- Runtime seconds: 127.16
- Input tokens: 11815
- Output tokens: 15511
- Thinking tokens: unknown
- Cached input tokens: 4096
- Cache write tokens: 0
- Estimated cost: $0.001819
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: אל תפחד מנתב המודל
subTitle: נווט בביטחון אל המודל הטוב ביותר.
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
[אל תתחתן עם המודל שלך](/llm-routing-mastra-ai) הציגה את הטיעון הקל: תפסיקו לשלוח כל משימה לאותו מודל רק כי הוא ניצח בתחרות הקודמת.

תשתמשו במודל זול לעבודה זולה. תשתמשו במודל חזק יותר היכן שהעבודה באמת קשה. שמרו על שכבת הניתוב רופפת מספיק כדי שהחלפת ספקים לא תהפוך את בסיס הקוד שלכם למקדש.

זה היה נכון.

אבל גם לא שלם.

ברגע שאתם מוסיפים ראאוטר (router), יש לכם התנהגות מערכת חדשה שצריך לבדוק. השאלה מפסיקה להיות "איזה מודל הכי טוב?" והופכת ל"האם המערכת בחרה במסלול הנכון, השתמשה בכלים הנכונים, שמרה את הראיות הנכונות ועצרה בזמן הנכון?"

אם לא מודדים את זה, הראוטר שלכם הוא וייבים עם טבלת שיגור.

<p class="inset">
הראוטר אינו התשובה. הראוטר הוא השערה לגבי איך המערכת שלכם צריכה להתנהג.
</p>

ל-Mastra יש את המשטחים להפוך את ההשערה הזו למשהו שניתן לבדיקה: [scorers](https://mastra.ai/docs/evals/overview), [`runEvals`](https://mastra.ai/reference/evals/run-evals), [datasets](https://mastra.ai/docs/evals/datasets/overview), ו-[experiments](https://mastra.ai/docs/evals/datasets/running-experiments). השמות נשמעים כמו תשתית הערכה, והם אכן כאלה. הערך האמיתי פשוט יותר: הם הופכים התנהגות סוכן לנראית מספיק כדי להתווכח עליה.

## מה אנחנו בודקים?

לראוטר מהפוסט הקודם יש שלושה מסלולים מומחים:

| מסלול | מה צריך ללכת לשם | מה יהיה מסלול גרוע |
|---|---|---|
| `code` | מימוש, רפקטורינג, דיבאגינג, סקירת קוד | סיכום בהקשר ארוך, סיווג פשוט |
| `long-context` | מסמכים מבולגנים, תמלילים, סינתזת מדיניות, הרבה קבצים | עיצוב מכני קצר |
| `general` | סיווג, עיצוב, שאלות-תשובות פשוטות, חילוץ משעמם | קוד קשה או ניתוח מבוסס ראיות |

הטבלה הזו היא התחלה. היא לא הערכה (eval).

הערכה צריכה דוגמאות ומבחנים (scorers):

| חלק | תפקיד |
|---|---|
| פריט מערך נתונים | "הנה בקשה מייצוגת." |
| אמת קרקע | "הנה המסלול או ההתנהגות שציפינו להם." |
| מבחן (scorer) | "הנה איך אנו מחליטים האם הפלט עבר." |
| ניסוי | "הנה הריצה שאפשר להשוות אליה בריצות עתידיות." |

המהלך החשוב הוא לבדוק התנהגות, לא רק איכות פרוזה.

מודל יכול לכתוב תשובה יפה אחרי שבחר במומחה הלא נכון. סוכן אבטחה יכול להפיק דו"ח סביר בלי לשמור ראיות. סוכן תמיכה יכול להישמע אמפתי תוך דילוג על בדיקת מדיניות ההחזרים. הפסקה היא החלק הנראה לעין. המסלול (trajectory) הוא המקום שבו הבאגס חיים.

עבור ראאוטר, אני מתחיל עם ארבעה צירים:

| ציר | שאלה | דוגמה למבחן |
|---|---|
| איכות | האם בחר במסלול הנכון והפיק תוצאה שימושית? | דיוק במסלול, שלמות תשובה, נאמנות |
| עלות | האם נמנע ממודלים פרימיום לעבודה משעממת? | מחלקת עלות המסלול שנבחר, תקציב אסימונים |
| מהירות | האם סיים במסגרת תקציב החביון של המוצר? | מבחן זמן ריצה או timeout |
| אחר | האם ציית לאילוצי בטיחות, פרטיות וניטור? | רשימת כלים מותרת, שימור ראיות, התנהגות סירוב |

השורה האחרונה הזו חשובה. "אחר" הוא המקום שבו חיות צלקות הייצור.

## הפכו את החלטת הנתב לניתנת לציון

אם הנתב מייצר רק תשובה סופית, אתם מנחשים לגבי ההחלטה. אפשר לתת ציון לפלט, אבל לא ניתן לדעת האם המסלול היה נכון.

אז תנו לשלב הניתוב חוזה מובנה קטן:

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

משתמשים לעולם לא צריכים לראות את ה-JSON הזה. זה יכול להיות שלב פנימי, העברת זרימת עבודה, או span עקיבה. המבקיע צריך רק גישה אליו.

הנה סוכן Mastra קטן במכוון שעושה רק בחירת מסלול:

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

כן, זה קצת מלאכותי. טוב. הערכות (evals) מתגמלות תפרים משעממים.

כשההחלטה מפורשת, אפשר לבדוק את המסלול לפני שהמומחה במורד הזרם רץ. כשלי נתב מפסיקי להתחבά מאחורי כשלים במודל הנבחR, בהנחיR, בכליR, אR מבקיע התשובה הסופית.

## כתבו מבקיע שתופס את הכשל המשעמעם

ה-[`createScorer`](https://mastra.ai/ereence/evals/crate-scorer) של Mastra מקבל פונקציות JavaScript פשוטות, prompts של שופט LLM, או שניהם. התחילו עם פונקציות בכל פעם שהכשל דטרמיניסטי. הן זולות יותר, מהירות יותר, ופחות מסתוריות.

דיוק המסלול לא צריך מודל שיפוט. הוא צריך לפרסר JSON ולהשוות שדה אחד.

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
      decision.route ?? "" ,
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
  .generateScore(({ run }) =>图{
    const expected = run.groundTrut as RouteGrundTruth;
    const decision = parseDecision(run.output);
    return decision.route === expected.route ? 1 : 0;
  })
 .generateReason(({ run, score }) =>{
    const expected = run.groundTruth as RounteGrundTruth;
    const decision = parseDecision(run.output);

    return score === 1
      ? `Selected expected route: ${expected.route}.`
      : `Expected ${expected.route}, got ${decision.route ?? "nothing"}.`;
  });
```

המבקיע הזה לא נוצץ. זו הנקודה.

אם הנתב לא יכול לייצר בעקביות JSON תקין ולבחור במומחה הברור על מערך בדיקה זעיר, אין סיבה לסמוך עליו בתעבורת ייצור. אתם לא צריכים אונטולוגיה של דירוג מודל-פילוסוף. אתם צריכים גלאי עשן עם סוללה בתוכו.

## הריצו קודם את לולאת ההערכה הקטנה

ה-[`runEvals`](https://mastra.ai/reference/evals/run-evals) הוא הלולאה המהירה. תנו לו מטרה, מקרי בדיקה, מבקיעים, ומגבלת מקביליות. הוא מריץ את המטרה מול הנתונים ומחזיר ציונים מצטברים.

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

זו הלולאה שאתם מריצים בזמן שינוי ההנחיה, הוספת מסלול, או ניסיון של מודל נתב זול יותר.

זה לא מספיק למערכת בוגרת. זה מספיק כדי למנוע את הרגרסיה המביישת ביותר: "שינינו את הנחיית הנתב והיא התחילה לשלוח משימות סיווג למודל הקוד הפרימיום."

שמרו על הצירים נפרדים. דיוק המסלול ואיכות התשובה הסופית הם ציונים שונים. תוקף JSON, כלים מותרים, ויכולת מעקב מקבלים בדיקות משלהם. אל תגלגלו אותם למספר 'איכות' אחד. ממוצעים הם המקום שבו כשלים שימושיים הולכים לפרוש.

## הוסף שופט LLM רק היכן שהוא מצדיק את מקומו

ני טוב מסוים הוא לגיטימית מעורפל:

```text
Read these logs and tell me why the deploy failed.
```

האם זה `code` בגלל שזו באג אגל? `long-context` בגלל הלוגים? `general` בגלל שהמשתמ ביקשס סיכום? הנתיב הנכון תלוי בכלים הזמינים ובמה שהמוצר שלך מבטיח.

כן שופט LLM יכול לאזר, אבל ר ב עם קריטריון מדויק. ניקודי Mastra יכולים לעררל שלבי פונקייה ושלבי אובייט-הנחיה. השתמש בפונקיות עבור מבנ, ולאחר מיכן שופט עבור החלק ש ממש צריך שיפוט.

```typescript
// src/mastra/scorers/route-reasonableness.ts
imort { createScorer } from "@mastra/core/evals";
imort { z } from "zod";

export const routeReasonablenessScorer = createScorer({
  id: "route-reasonbleness",
  descrition: "Judge whether the route explation matches the request.",
  tye: "aget",
  judge: {
    model: process.env.JUDGE_MODEL ?? "openai/gpt-5-mini",
    instructions: "You are a strict evaluator for model-rouing decisions.",
  },
})
  .analyze({
    descrition: "Evaluate the router's decision rationale.",
    oututSema: z.object({
      score: z.number().min(0).max(1),
      rational: z.string(),
    }),
    createPromt: ({ run }) => `
User request:
${JSON.stringify(run.input)}

Router outut:
${JSON.stringify(run.outut)}

Score from 0 to 1.

1.0 = route is clealy appropriate and the reason cits the right task signals
0.5 = route is defensible but underspecified or ambiguous
0.0 = route is wrong, unsorted, or the reason is unrelated

Retun JSON with { "score": number, "rational": string }.
`,
  })
  .generateScore(({ results }) => results.analyzeSteResult.score)
  .generateReason(({ results }) => results.analyzeSteResult.rational);
```

הניקוד הזה עולה כסף כי הוא קורא למודל שופ. זה בסדר כשהשיפוט שוה את זה.

אל תשמש בו כדי לבדוק א ם JSON מתפרס.

## קדם מקרים טובים למערך נתונים

מערכי הערכה מוקשי-קוד בסדר בהתחלה. בשלב מסוים הדוגמאות שלך הופכים לנכסי מוצר: הטיקט הלקוח שנכשל, השיחת תמיכה המוזרה, ניסיון ההזרק להנחיה, הבקשה שנוסבה נכון עד חמישי שעבר.

אלה שייכים למערך נתונים.

מערכי הנתונים של Mastra הם אוספים מתויגים של מקרי בדיקה. כל מוטציה יוצת גרסה חדשה, אז אתה יכול להריץ מחדש ניסוי ני ה בדיוק מול מערך המקרים שהיה קיים כשקיבלת החלטת מוד.

מערכי נתונים זקוים להתמיד, אז הגדר אחסון קודם:

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

לאחר מכן צר את מערך הנתונים והוסף מקרים:

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

ברגע שיש לך מערך נתונים, מקרי הערכה מפסיקים להיות נתוני סקריפט שניתן לזרוק. יש להם מזהים, גרסאות, היסטוריה ותוצאות ניסוי.

זה כאשר הערכות מפסיקות להרגיש כמו 'קבצי בדיקה להנחיות' ומתחילות להרגיש כמו זיכרון מוצר.

## הרץ ניסויים מול הנתב

עם מערך הנתונים במקום, [`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) מריץ אותו מול סוכן רשום, זרימת עבודה או ניקוד.

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

במקום "הנתב החדש נראה טוב יותר", אתה יכול לומר:

- הנתב הישן השיג ציון `0.94` בדיוק ניתוב.
- הנתב החדש השיג `0.98`.
- הוא שיפר ניתוב בהקשר ארוך.
- הוא החמיר שני מקרים של סקירת קוד.
- הוא הפחית העברות למודל פרימיום ב-18%.
- הוא הוסיף 300ms של עיכוב נתב.

זו שיחה הנדסית. יש פשרות על השולחן, ואתה יכול להחליט אם ההחלפה שווה את זה.

## ניקוד התנהגות בזמן אמת, אך אל תבלבל אותו עם אמת היסוד

Mastra יכולה גם לצרף ניקוד ישירות לסוכנים ולשלבי זרימת עבודה. ניקוד בזמן אמת רץ באופן אסינכרוני, מאחסן תוצאות במסד הנתונים המוגדר שלך, ותומך בדגימה כך שלא תנקד כל תגובת ייצור אלא אם כן התכוונת.

שימושי. גם עבודה אחרת.

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

ניקוד בזמן אמת אומר לך שהנתב עדיין פולט החלטות תקפות. הוא תופס פלט פגום, תוכן רעיל, קריאות לכלים אסורות, סימני ראיות חסרים, וביטחון נמוך באופן חשוד.

בדרך כלל הוא לא יכול לומר לך דיוק ניתוב, כי תעבורת ייצור לא מגיעה עם אמת יסוד מחוברת אליה.

ניקוד בזמן אמת הוא ניטור. ניסויי מערך נתונים הם בדיקות מבוקרות. אתה רוצה את שניהם. הם עונים על שאלות שונות.

## מה למדוד לאחר דיוק ניתוב

דיוק ניתוב הוא השלב הראשון. הוא אומר לך שהבקשה הגיעה למומחה המצופה. הוא לא אומר דבר על האם המומחה עשה עבודה טובה.

ברגע שהנתב עובר את היסודות, נקוד את המערכת בשכבות:

| שכבה | מה לנקד | למה זה חשוב |
|---|---|---|
| החלטת נתב | נתב נבחר, ביטחון, סיבה | תופס סיווג שגוי וכללי הסלמה גרועים |
| מסלול | רצף כלים או סוכנים צפוי | תופס התנהגות של "תשובה נכונה, נתיב שגוי" |
| פלט מומחה | נכונות, נאמנות, שימושיות | תופס עבודה באיכות נמוכה לאחר ניתוב נכון |
| עלות ועיכוב | בחירת מודל, אסימונים, זמן ריצה | תופס ניצחונות יקרים או איטיים |
| בטיחות והיקף | כלים מותרים, גבולות סירוב, ראיות | תופס כשלים בסיכון מוצר |

`runEvals` תומך בתצורות ניקוד ברמת סוכן, רמת זרימת עבודה, רמת שלב ורמת מסלול, כך שאתה לא צריך להעמיד פנים שהתשובה הסופית היא הארטיפקט היחיד.

עבור זרימת עבודה, הצורה נראית כך:

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

זה המודל המנטלי שאני רוצה עבור סוכנים בייצור:

נקוד את ההחלטה. נקוד את הנתיב. נקוד את התשובה.

אם אתה מנקד רק את התשובה, המודל יכול לעבור בטעות.

## הנתב אמור להפוך למשעמם יותר עם הזמן

## הנתב אמור להפוך למשעמם יותר עם הזמן

(הכותרת הזו כבר תורגמה בחלק הקו דם, אבל כדי לשמור על רצפיות, נכלול או תה כאן. הקטע מתחיל מ:)

ההנחיה הראשונה לנתב היא בדרך כלל פיסקה של שיקולי דעת. זה בסדר לאבטיפוס.

כשהאוואלים מלמדים אותך דברים, חלקים מהנתב צריכים להפוך לפחות קסומים:

- מקרים לקסיקליים ברורים הופכים לכללים דטרמיניסטיים.
- משימות מסוכנות דורשות אישור מפורש או ענף בזרימת עבודה.
- משימות מעורפלות שואלות שאלת הבהרה במקום לנחש.
- 
נתיבים יקרים דורשים ביטחון גבוה יותר או אות שני.
- מקרי כשל ידועים הופכים לפריטים בסט נתנים.

המטרה היא לא להפוך את הנתב ל"חכם" יותר לתמיד. המטרה היא להפוך את המערכת לקלה יותר להבנה.

לפעמים זה אומר מודל טוב יותר. לפעמים הנחיה הדוקה יותר. לפעמים שלב בזרימת עבודה, סקורר, גבול קשה, או הצהרת `if` משעממת שחסכה לך אלפי דולר בחודש.

זו בדיוק הנקודה של למדוד התנהגות. אתה מפסיק להתווכח על סמך טעם ומתתחיל להתוכח על סמך ראיוח.

## רשימח התחל התחלתי

אם את/ה בונה נתב של Mastra היום, תתחיל/תתחילי מיכאן:

1. הפכ את החללת הנתב למובנה, אפילו משתמישים לעול לא רואים אוחה.
2. כתוב/י סקוררים דטרמינטיים ל-JSON תקמ, נתב מצופה, ונתיבים אסוריים.
3. השת&מש/י ב-`runEvals` עם 10 עד 20 מקרים לפני שינוי הנחיות נתב או מודלים.
4. קדם/י כשלים א&מיתים לסט נתנים ממ+ורס (versioned dataset).
5. הר&/י נסויים על סט נתנים תמ+ורסים לש&נוי ממושכ<!--/--/--םת&/--> iyun, מוד&, א& /////./
6. הוס&/י סקוררים &ממ\יים (live scorers) לאי--->>--ו-ו-ב-ב-צ-צ-ה-ה-יו-ו-ת &מפע...י---&..ות//-ק--ק-י-י--י..ות.
7. ה&ו--ו-ש/י תותחנ--י/-----י-י--י--ת-ת-ח-ח-ש-ש---ו//.ו-בח-ח-חו-ו-ת-ת -י//.oto

הממורע--ע//-//--//--//ח--ח--ש--ש---ש--ש--------חש--------.
````
