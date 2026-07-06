# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: he
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/he/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 127.08
- Input tokens: 11924
- Output tokens: 12013
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.005033
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug dont-fear-the-model-router --locale he --skip-global (code 1)
## Raw Output

````mdx
---
title: ''
subTitle: נווט בביטחון אל המודל הטוב ביותר
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
הגרסה הראשונה של [Don't Marry Your Model](/llm-routing-mastra-ai) טענה את הטענה הקלה: תפסיקו לשלוח כל משימה לאותו מודל רק כי הוא ניצח בתחרות האחרונה.

תשתמשו במודל זול לעבודה זולה. תשתמשו במודל חזק יותר כשהעבודה באמת קשה. שמרו על שכבת הניתוב גמישה מספיק כדי שתוכלו להחליף ספקים בלי להפוך את הקוד שלכם למקדש.

זה היה נכון.

זה גם היה לא שלם.

כי ברגע שמוסיפים נתב, יש התנהגות מערכת חדשה שצריך לבדוק. השאלה כבר לא "איזה מודל הכי טוב?" השאלה היא "האם המערכת בחרה במסלול הנכון, השתמשה בכלים הנכונים, שמרה את הראיות הנכונות ועצרה בזמן הנכון?"

אם לא מודדים את זה, נתב המודלים שלכם הוא פשוט וייב עם טבלת ניתוב.

<p class="inset">
הנתב הוא לא התשובה. הנתב הוא השערה לגבי איך המערכת שלכם צריכה להתנהג.
</p>

Mastra נותנת לנו משטחים שימושיים להפיכת ההשערה הזו למשהו שניתן לבדיקה: [scorers](https://mastra.ai/docs/evals/overview), [`runEvals`](https://mastra.ai/reference/evals/run-evals), [datasets](https://mastra.ai/docs/evals/datasets/overview), ו-[experiments](https://mastra.ai/docs/evals/datasets/running-experiments). שמות ה-API נשמעים כמו תשתית הערכה, וזה אכן מה שהם, אבל הערך האמיתי פשוט יותר:

הם הופכים את התנהגות הסוכן לנראית מספיק כדי להתווכח עליה.

## מה אנחנו בודקים?

לנתב המודלים מהפוסט הקודם יש שלושה מסלולים מומחים ברורים:

| מסלול | מה צריך ללכת לשם | מה יהיה מסלול גרוע |
|---|---|---|
| `code` | מימוש, ריפקטורינג, דיבוג, סקירת קוד | סיכום של הקשר ארוך, סיווג פשוט |
| `long-context` | מסמכים מבולגנים, תמלילים, סינתזת מדיניות, קבצים רבים | עיצוב מכני קצר |
| `general` | סיווג, עיצוב, שאלות-תשובות פשוטות, חילוץ משעמם | קוד קשה או ניתוח מבוסס ראיות |

הטבלה הזו היא התחלה, אבל היא לא הערכה.

הערכה צריכה דוגמאות וצופים:

| רכיב | תפקיד |
|---|---|
| פריט בסט נתונים | "הנה בקשה מייצגת." |
| אמת בסיס | "הנה המסלול או ההתנהגות שציפינו להם." |
| צופה | "הנה איך אנחנו מחליטים אם הפלט עבר." |
| ניסוי | "הנה הריצה שאנחנו יכולים להשוות מול ריצות עתידיות." |

המהלך החשוב הוא לבדוק התנהגות, לא רק איכות פרוזה.

מודל יכול לכתוב תשובה יפה אחרי שבחר במומחה הלא נכון. סוכן אבטחה יכול להפיק דוח סביר בלי לשמר ראיות. סוכן תמיכה יכול להישמע אמפתי תוך דילוג על בדיקת מדיניות ההחזרים. הפסקה היא החלק הנראה. המסלול הוא המקום שבו הבאגים חיים.

עבור נתב, אני בדרך כלל מתחיל עם ארבעה צירים:

| ציר | שאלה | דוגמה למנקד |
|---|---|---|---|
| איכות | האם בחר במסלול הנכון והפיק תוצאה שימושית? | דיוק המסלול, שלמות התשובה, נאמנות |
| עלות | האם נמנע משימוש במודלים יקרים למשימות שגרתיות? | מחלקת עלות המסלול הנבחר, תקציב טוקנים |
| מהירות | האם הסתיים בתוך תקציב השהיה של המוצר? | מנקד זמן ריצה או פסק זמן |
| אחר | האם ציית לאילוצי בטיחות, פרטיות ותצפיתנות? | רשימת כלים מותרת, שימור ראיות, התנהגות סירוב |

העמודה האחרונה חשובה. "אחר" הוא המקום שבו חיות צלקות הייצור.

## הפוך את החלטת הנתב לניתנת לניקוד

אם הנתב מייצר רק תשובה סופית, קשה לדעת למה התנהג כפי שהתנהג. עדיין אפשר לנקד את הפלט, אבל מנחשים לגבי ההחלטה.

להערכות, תן לשלב הניתוב חוזה מובנה קטן:

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

מערכת הייצור לא חייבת להציג את ה-JSON הזה למשתמשים. זה יכול להיות שלב פנימי, מסירה של זרימת עבודה, או ספאן מעקב. המנקד רק צריך משטח כלשהו.

הנה סוכן Mastra קטן בכוונה שבוחר מסלול:

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

כן, זה קצת מלאכותי. טוב. הערכות מתגמלות תפרים משעממים.

כשהחלטת הנתב מפורשת, אפשר לבדוק את המסלול לפני שבודקים את המומחה במורד הזרם. ככה מגלים אם הבעיה היא הנתב, המודל שנבחר, ההנחיה, משטח הכלי, או מנקד התשובה הסופית.

## כתוב מנקד שתופס את הכישלון השגרתי

[`createScorer`](https://mastra.ai/reference/evals/create-scorer) של Mastra יכול להשתמש בפונקציות JavaScript, בהנחיות שופט LLM, או בשניהם. התחל עם פונקציות בכל פעם שהכישלון הוא דטרמיניסטי. הן זולות יותר, מהירות יותר, ופחות מסתוריות.

לדיוק המסלול, אין צורך במודל שופט. צריך לנתח JSON ולהשוות שדה אחד.

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

המנקד הזה לא זוהר. זו הנקודה.

אם הנתב לא יכול לייצר באופן עקבי JSON תקין ולבחור את המומחה הברור על ערכת בדיקות קטנה, אין סיבה לסמוך עליו בתעבורת ייצור. לא צריך מודל-פילוסוף להערכת אונטולוגיה. צריך את המקבילה של גלאי עשן עם סוללה בתוכו.

## הרץ קודם את לולאת ההערכה הקטנה

[`runEvals`](https://mastra.ai/reference/evals/run-evals) של Mastra היא הלולאה המהירה. תן לה יעד, מקרי בדיקה, מנקדים, ומגבלת מקביליות. היא מריצה את היעד מול הנתונים ומחזירה ציונים מצטברים.

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

זו הלולאה שאתה מריץ תוך שינוי ההנחיה, הוספת מסלול חדש, או ניסיון במודל נתב זול יותר.

זה לא מספיק למערכת בוגרת, אבל זה מספיק כדי למנוע את הרגרסיה הכי מביכה: "שינינו את הנחיית הנתב והיא התחילה לשלוח משימות סיווג למודל הקוד הפרימיום."

עלות, מהירות, איכות ועוד — כולם מופיעים כאן:

- עלות: מודל הנתב יכול להישאר זול כל עוד הדיוק נשמר.
- מהירות: ההערכה יכולה לאכוף טיימאאוטים או לתעד חביון בהרנס.
- איכות: דיוק הניתוב ואיכות התשובה הסופית הם ציונים נפרדים.
- אחר: תקינות JSON, כלים מותרים, אבטחה ויכולת מעקב מקבלים בדיקות משלהם.

אל תגלגל את כל זה לציון "איכות" אחד. ממוצעים הם המקום שבו כשלונות שימושיים הולכים לפרוש.

## הוספת שופט LLM רק במקום שבו הוא מרוויח את מקומו

חלק מהתנהגות הנתב היא סובייקטיבית. בקשה יכולה להיות דו־משמעית לגיטימית:

```text
קרא את הלוגים האלה ותגיד לי למה הפריסה נכשלה.
```

האם זה `code` כי דיבוג? `long-context` כי לוגים? `general` כי סיכום? המסלול הנכון תלוי במשטח הכלים ובהבטחת המוצר שלך.

כאן שופט LLM יכול לעזור, אבל רק עם רובריקה הדוקה. ציוני Mastra יכולים לערבב שלבי פונקציה ושלבי אובייקט-הנחיה. השתמש בפונקציות למבנה, ואז השתמש בשופט עבור החלק שבאמת צריך שיפוט.

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

הציון הזה עולה כסף כי הוא קורא למודל שופט. זה בסדר כשהשיפוט שווה את זה.

אל תשתמש בו כדי לבדוק אם JSON מתפרס.

## קדם מקרים טובים למערך נתונים

מערכי הערכה מקודדים בקשיחות הם בסדר בהתחלה. בסופו של דבר, הדוגמאות שלך הופכות לנכסי מוצר. כרטיס הלקוח שנכשל, שיחת התמיכה המוזרה, ניסיון ההזרקה, הבקשה שהייתה מנותבת נכון עד יום חמישי שעבר.

זה שייך למערך נתונים.

מערכי נתונים של Mastra הם אוספים מנוהלים בגרסאות של מקרי בדיקה. כל מוטציה יוצרת גרסה חדשה, מה שאומר שאתה יכול להריץ מחדש ניסוי מול קבוצת המקרים המדויקת שהתקיימה כשקיבלת החלטת מודל.

קודם כל הגדר אחסון, כי מערכי נתונים זקוקים להתמדה:

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

לאחר מכן צור מערך נתונים והוסף מקרים:

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

ברגע שיש לך מערך נתונים, אתה יכול להפסיק להתייחס למקרי הערכה כאל נתוני סקריפט חד־פעמיים. עכשיו יש להם מזהים, גרסאות, היסטוריה ותוצאות ניסויים.

זה הרגע שבו הערכות מתחילות להרגיש פחות כמו "קובצי בדיקה להנחיות" ויותר כמו זיכרון מוצר.

## הרץ ניסויים מול הנתב

ברגע שמערך הנתונים קיים, השתמש ב-[`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) כדי להריץ אותו מול סוכן, זרימת עבודה או ניקוד רשומים.

```typescript
// src/mastra/evals/run-router-experiment.ts
import { mastra } from "../index";

const dataset = await mastra.datasets.get({ id: process.env.ROUTER_DATASET_ID! });

const summary = await dataset.startExperiment({
  name: "router-gpt-5-mini-baseline",
  description: "הרצת נתב בסיסית לפני הוספת נתב אבטחה.",
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

במקום "נראה שהנתב החדש טוב יותר", אפשר לומר:

- הנתב הישן קיבל ציון `0.94` בדיוק ניתוב.
- הנתב החדש קיבל ציון `0.98` כולל.
- הוא שיפר ניתוב בהקשר ארוך.
- הוא החמיר שני מקרי סקירת קוד.
- הוא הפחית העברות למודלים פרימיום ב-18%.
- הוא הוסיף 300ms של חביון נתב.

זו שיחה הנדסית. יש פשרות. אתה יכול להחליט אם הפשרה שווה את זה.

## דרג התנהגות חיה, אבל אל תבלבל בינה לבין אמת בסיס

Mastra יכולה גם לצרף ניקודים ישירות לסוכנים ולשלבי זרימת עבודה. ניקודים חיים רצים באופן אסינכרוני ושומרים תוצאות ניקוד במסד הנתונים המוגדר שלך, עם בקרות דגימה כדי שלא תדרג כל תגובת ייצור אלא אם כן תתכוון לכך.

זה שימושי, אבל זו משימה אחרת.

```typescript
import { Agent } from "@mastra/core/agent";
import { validRouterJsonScorer } from "../scorers/route-accuracy";

export const routerDecisionAgent = new Agent({
  id: "router-decision-agent",
  instructions: "בחר את המסלול המומחה הטוב ביותר...",
  model: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
  scorers: {
    validRouterJson: {
      scorer: validRouterJsonScorer,
      sampling: { type: "ratio", rate: 1 },
    },
  },
});
```

ניקוד חי יכול לומר לך שהנתב עדיין פולט החלטות תקפות. הוא יכול לתפוס פלט פגום, תוכן פוגעני, קריאות לכלים אסורות, סמני ראיות חסרים או ביטחון נמוך מחשיד.

הוא בדרך כלל לא יכול לומר לך את דיוק הניתוב, כי תעבורת ייצור לא מגיעה עם אמת בסיס צמודה אליה.

ההבחנה הזו חשובה. ניקוד חי הוא ניטור. ניסויים במערך נתונים הם בדיקות מבוקרות. אתה רוצה את שניהם, אבל הם עונים על שאלות שונות.

## מה למדוד אחרי דיוק ניתוב

דיוק ניתוב הוא השלב הראשון. הוא אומר לך אם הבקשה הגיעה למומחה הצפוי. הוא לא אומר לך אם המומחה עשה עבודה טובה.

אחרי שהנתב עובר את הבסיס, דרג את המערכת בשכבות:

| שכבה | מה לדרג | למה זה חשוב |
|---|---|---|
| החלטת נתב | המסלול שנבחר, ביטחון, סיבה | תופס סיווג שגוי וכללי הסלמה גרועים |
| מסלול | רצף הכלים או הסוכנים הצפוי | תופס התנהגות "תשובה נכונה, דרך שגויה" |
| פלט מומחה | נכונות, נאמנות, תועלת | תופס עבודה באיכות נמוכה אחרי ניתוב נכון |
| עלות וחביון | בחירת מודל, אסימונים, זמן ריצה | תופס ניצחונות יקרים או איטיים |
| בטיחות ותחום | כלים מותרים, גבולות סירוב, ראיות | תופס כשלים בסיכון מוצר |

הממשק `runEvals` של Mastra תומך בתצורות ניקוד ברמת סוכן, ברמת זרימת עבודה, ברמת שלב וברמת מסלול. זה אומר שאתה לא צריך להעמיד פנים שהתשובה הסופית היא הארטיפקט היחיד.

עבור זרימת עבודה, הצורה יכולה להיראות כך:

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

דרג את ההחלטה. דרג את המסלול. דרג את התשובה.

אם אתה מדרג רק את התשובה, המודל עלול לעבור במקרה.

## הנתב אמור להפוך למשעמם יותר עם הזמן

הפרומפט הראשון של הניתוב הוא בדרך כלל פסקה של שיקולי דעת. זה בסדר לאב-טיפוס.

ככל שאתה לומד מהערכות (evals), חלקים מהנתב צריכים להיות פחות קסומים:

- מקרי לקסיקליים ברורים יכולים להפוך לכללים דטרמיניסטיים.
- משימות מסוכנות יכולות לדרוש אישור מפורש או ענף בזרימת עבודה.
- משימות מעורפלות יכולות לשאול שאלת הבהרה במקום לנחש.
- מסלולים יקרים יכולים לדרוש ביטחון גבוה יותר או אות נוסף.
- מקרי כשל ידועים יכולים להפוך לפריטים במערך נתונים.

המטרה היא לא להפוך את הנתב ל"חכם" יותר לנצח. המטרה היא להפוך את המערכת לקלה יותר להבנה.

לפעמים זה אומר מודל טוב יותר. לפעמים זה אומר פרומפט הדוק יותר. לפעמים זה אומר שלב בזרימת עבודה, מעריך (scorer), מכסה קשיחה, או משפט `if` משעמם שחוסך לך ארבע ספרות בחודש.

זו כל הנקודה של מדידת התנהגות. אתה מפסיק להתווכח מטעם טעם ומתחיל להתווכח על סמך ראיות.

## רשימת בדיקה מעשית להתחלה

אם אתה בונה נתב של Mastra היום, הייתי מתחיל כאן:

1. הפוך את החלטת הניתוב למובנית, גם אם משתמשים לעולם לא רואים אותה.
2. כתוב מעריכים דטרמיניסטיים עבור JSON תקין, מסלול צפוי, ומסלולים אסורים.
3. השתמש ב-`runEvals` עם 10–20 מקרים לפני שינוי פרומפטים או מודלים של הנתב.
4. קדם כשלים אמיתיים למערך נתונים מנוהל גרסאות.
5. הרץ ניסויים במערך נתונים עבור שינויים משמעותיים בפרומפט, מודל, מסלול או זרימת עבודה.
6. הוסף מעריכים חיים לקביעות ייצור זולות.
7. השווה ניסויים לפי מסלול, לא רק לפי ציון ממוצע.

הממוצע חשוב פחות מאשכול הכשלים.

אם כל רגרסיה היא בסינתזת מדיניות עם הקשר ארוך, אין לך "נתב גרוע יותר". יש לך בעיית גבול מסלול. אם כל מקרה כושל משתמש בכלי ספציפי, יש לך בעיית חוזה כלי. אם כל מודל זול נכשל באותם שני מקרים מעורפלים, ייתכן שתצטרך היגיון הסלמה במקום ברירת מחדל יקרה יותר.

כאן הערכות (evals) הופכות לשימושיות. לא כטקס. לא כדשבורד שגורם לכולם להרגיש מבוגרים זמנית.

כדרך למצוא את צורת המערכת.

## משאבים

- [סקירה של מעריכי Mastra](https://mastra.ai/docs/evals/overview)
- [התייחסות ל-`createScorer` של Mastra](https://mastra.ai/reference/evals/create-scorer)
- [התייחסות ל-`runEvals` של Mastra](https://mastra.ai/reference/evals/run-evals)
- [סקירה של מערכי נתונים של Mastra](https://mastra.ai/docs/evals/datasets/overview)
- [ניסויים במערכי נתונים של Mastra](https://mastra.ai/docs/evals/datasets/running-experiments)
- [אל תתחתן עם המודל שלך](../llm-routing-mastra-ai)
- [הלחם ברעות עם הערכות!](../llm-evals-are-broken)
````
