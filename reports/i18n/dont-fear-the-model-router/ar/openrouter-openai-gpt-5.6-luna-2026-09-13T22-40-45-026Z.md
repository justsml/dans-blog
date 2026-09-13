# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: ar
- Model: openrouter/openai/gpt-5.6-luna
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/ar/index.mdx
- Validation: deferred
- Runtime seconds: 48.19
- Input tokens: 11338
- Output tokens: 5968
- Thinking tokens: unknown
- Cached input tokens: 4336
- Cache write tokens: 6987
- Estimated cost: $0.008649
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: لا تخشَ مُوجّه النماذج
subTitle: وجّه الطلب إلى أفضل نموذج بثقة.
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
كان مقال [لا تتزوج نموذجك](/llm-routing-mastra-ai) يقدّم الحجة السهلة: توقّف عن إرسال كل مهمة إلى النموذج نفسه لمجرد أنه فاز في آخر مقارنة.

استخدم نموذجًا رخيصًا للأعمال الرخيصة. واستخدم نموذجًا أقوى عندما تكون المهمة صعبة فعلًا. وأبقِ طبقة التوجيه مرنة بما يكفي كي لا يؤدي تبديل المزوّدين إلى تحويل قاعدة شيفرتك إلى مزار.

كان ذلك صحيحًا.

لكنه كان ناقصًا أيضًا.

بمجرد أن تضيف موجّهًا، يصبح لديك سلوك جديد في النظام يحتاج إلى الاختبار. لم يعد السؤال «أي نموذج هو الأفضل؟»، بل أصبح «هل اختار النظام المسار الصحيح، واستخدم الأدوات الصحيحة، وحافظ على الأدلة الصحيحة، وتوقّف في الوقت المناسب؟»

إذا لم تقس ذلك، فموجّه النماذج لديك ليس سوى انطباعات موصولة بجدول توزيع.

<p class="inset">
الموجّه ليس الإجابة. الموجّه فرضية حول الطريقة التي ينبغي أن يتصرّف بها نظامك.
</p>

توفّر Mastra الواجهات اللازمة لتحويل هذه الفرضية إلى شيء قابل للاختبار: [المقيّمات](https://mastra.ai/docs/evals/overview)، و[`runEvals`](https://mastra.ai/reference/evals/run-evals)، و[مجموعات البيانات](https://mastra.ai/docs/evals/datasets/overview)، و[التجارب](https://mastra.ai/docs/evals/datasets/running-experiments). تبدو الأسماء كأنها بنية تحتية للتقييم، وهي كذلك فعلًا. لكن القيمة الحقيقية أبسط من ذلك: فهي تجعل سلوك الوكيل مرئيًا بما يكفي لمناقشته والاعتراض عليه.

## ما الذي نختبره؟

يضم الموجّه من المقال السابق ثلاثة مسارات متخصصة:

| المسار | ما الذي ينبغي توجيهه إليه | ما الذي يجعل التوجيه سيئًا |
|---|---|---|
| `code` | التنفيذ، وإعادة الهيكلة، وتصحيح الأخطاء، ومراجعة الشيفرة | تلخيص السياق الطويل، والتصنيف البسيط |
| `long-context` | المستندات الفوضوية، والنصوص المفرّغة، وتركيب السياسات، والملفات الكثيرة | التنسيق الميكانيكي القصير |
| `general` | التصنيف، والتنسيق، والأسئلة والأجوبة البسيطة، والاستخراج الرتيب | الشيفرة الصعبة أو التحليل الذي يعتمد بكثافة على الأدلة |

هذا الجدول بداية. لكنه ليس تقييمًا.

يحتاج التقييم إلى أمثلة ومقيّمات:

| العنصر | المهمة |
|---|---|
| عنصر مجموعة البيانات | «هذا طلب نموذجي.» |
| الحقيقة المرجعية | «هذا هو المسار أو السلوك الذي توقعناه.» |
| المقيّم | «هذه هي الطريقة التي نقرر بها ما إذا كان الناتج قد اجتاز الاختبار.» |
| التجربة | «هذا هو التشغيل الذي يمكننا مقارنته بالتشغيلات المستقبلية.» |

الخطوة المهمة هي اختبار السلوك، لا جودة النص وحدها.

قد يكتب نموذج إجابة ممتازة بعد اختيار المتخصص الخطأ. وقد ينتج وكيل أمني تقريرًا مقنعًا من دون الحفاظ على الأدلة. وقد يبدو وكيل الدعم متعاطفًا بينما يتجاوز التحقق من سياسة ردّ الأموال. الفقرة هي الجزء المرئي. أما مسار التنفيذ فهو المكان الذي تختبئ فيه الأخطاء.

بالنسبة إلى الموجّه، أبدأ بأربعة محاور:

| المحور | السؤال | مثال على المقيّم |
|---|---|---|
| الجودة | هل اختار المسار الصحيح وأنتج نتيجة مفيدة؟ | دقة المسار، واكتمال الإجابة، والوفاء للمصدر |
| التكلفة | هل تجنّب استخدام النماذج المميزة في الأعمال الرتيبة؟ | فئة تكلفة المسار المحدد، وميزانية الرموز |
| السرعة | هل أنهى المهمة ضمن ميزانية زمن الاستجابة للمنتج؟ | مقيّم زمن التشغيل أو انتهاء المهلة |
| أخرى | هل التزم بقيود السلامة والخصوصية وقابلية الرصد؟ | قائمة السماح بالأدوات، والحفاظ على الأدلة، وسلوك الرفض |

هذا الصف الأخير مهم. فقرة «أخرى» هي المكان الذي يعيش فيه أثر ندوب الإنتاج.

## اجعل قرار الموجّه قابلاً للتقييم

إذا كان الموجّه لا ينتج سوى إجابة نهائية، فأنت تخمّن بشأن القرار. يمكنك تقييم الناتج، لكنك لن تعرف ما إذا كان المسار صحيحًا.

لذلك امنح خطوة التوجيه عقدًا صغيرًا ومنظمًا:

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

لا يحتاج المستخدمون إلى رؤية JSON هذا مطلقًا. يمكن أن يكون خطوة داخلية، أو تسليمًا بين مراحل سير العمل، أو مقطعًا في التتبّع. كل ما يحتاجه المقيّم هو الوصول إليه.

إليك وكيل Mastra صغيرًا ومقصودًا أن يكون محدودًا، لا يفعل شيئًا سوى اختيار مسار:

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

نعم، هذا مصطنع قليلًا. جيد. التقييمات تكافئ الحدود المملة.

عندما يصبح القرار صريحًا، يمكنك اختبار المسار قبل تشغيل المتخصص التابع له. عندها لا تعود إخفاقات الموجّه تختبئ خلف إخفاقات النموذج المحدد، أو موجهه، أو أدواته، أو مقيّم الإجابة النهائية.

## اكتب مقيّمًا يلتقط الإخفاق الممل

تقبل [`createScorer`](https://mastra.ai/reference/evals/create-scorer) في Mastra دوال JavaScript عادية، أو مطالبات لحَكَم قائم على نموذج لغوي، أو كليهما. ابدأ بالدوال كلما كان الإخفاق حتميًا. فهي أرخص وأسرع وأقل غموضًا.

لا تحتاج دقة المسار إلى نموذج حَكَم. تحتاج إلى تحليل JSON ومقارنة حقل واحد.

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

هذا المقيّم ليس مبهرًا. وهذه هي الفكرة.

إذا كان الموجّه لا يستطيع باستمرار إنتاج JSON صالح واختيار المتخصص الواضح على مجموعة اختبار صغيرة، فلا يوجد سبب للثقة به مع حركة مرور الإنتاج. لا تحتاج إلى نموذج فيلسوف يقيّم أنطولوجيا. تحتاج إلى كاشف دخان بداخله بطارية.

## شغّل حلقة التقييم الصغيرة أولًا

[`runEvals`](https://mastra.ai/reference/evals/run-evals) هي الحلقة السريعة. أعطها هدفًا، وحالات اختبار، ومقيّمات، وحدًا للتوازي. وهي تشغّل الهدف على البيانات وتعيد الدرجات المجمّعة.

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

هذه هي الحلقة التي تشغّلها أثناء تعديل المطالبة، أو إضافة مسار، أو تجربة نموذج موجّه أرخص.

لكنها لا تكفي لنظام ناضج. وهي تكفي لمنع أكثر التراجعات إحراجًا: «عدّلنا مطالبة الموجّه، فبدأ يرسل مهام التصنيف إلى نموذج البرمجة المميز».

أبقِ المحاور منفصلة. دقة المسار وجودة الإجابة النهائية درجتان مختلفتان. صلاحية JSON، والأدوات المسموح بها، وقابلية التتبّع تحصل على فحوصها الخاصة. لا تدمجها في رقم واحد اسمه «الجودة». فالمتوسطات هي المكان الذي تذهب إليه الإخفاقات المفيدة كي تتقاعد.

## أضف مُحكِّمًا من نموذج لغوي فقط حيث يستحق الأمر

بعض قرارات التوجيه ملتبسة فعلًا:

```text
Read these logs and tell me why the deploy failed.
```

هل هذا مسار `code` لأنه تصحيح للأخطاء؟ أم `long-context` بسبب السجلات؟ أم `general` لأن المستخدم طلب ملخصًا؟ يعتمد المسار الصحيح على الأدوات المتاحة وما يعد به منتجك.

هنا يفيد مُحكِّم من نموذج لغوي، لكن فقط مع معيار تقييم محكم. يمكن لمقيّمي Mastra الجمع بين خطوات الدوال وخطوات كائنات المطالبات. استخدم الدوال للبنية، ثم استخدم المُحكِّم للجزء الذي يتطلب حكمًا فعلًا.

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

يكلف هذا المقيّم مالًا لأنه يستدعي نموذجًا للحُكم. لا مشكلة في ذلك عندما يكون الحكم يستحق التكلفة.

لا تستخدمه للتحقق من إمكانية تحليل JSON.

## حوّل الحالات الجيدة إلى مجموعة بيانات

تصلح مصفوفات التقييم المرمّزة مباشرة في البداية. لكن أمثلتك تتحول مع الوقت إلى أصول للمنتج: تذكرة العميل التي فشلت، ومحادثة الدعم الغريبة، ومحاولة حقن المطالبة، والطلب الذي ظل يُوجَّه بشكل صحيح حتى الخميس الماضي.

هذه الحالات مكانها مجموعة بيانات.

مجموعات بيانات Mastra هي مجموعات مُصدرة من حالات الاختبار. كل تعديل ينشئ إصدارًا جديدًا، وبذلك يمكنك إعادة تشغيل تجربة على مجموعة الحالات نفسها تمامًا التي كانت موجودة عندما اتخذت قرارًا بشأن النموذج.

تحتاج مجموعات البيانات إلى تخزين مستمر، لذا اضبط التخزين أولًا:

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

ثم أنشئ مجموعة البيانات وأضف الحالات:

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

بعد امتلاك مجموعة بيانات، تتوقف حالات التقييم عن كونها بيانات مؤقتة في نص برمجي. يصبح لها معرّفات وإصدارات وسجل تاريخي ونتائج تجارب.

عندها تتوقف التقييمات عن الشعور بأنها «ملفات اختبار للمطالبات»، وتبدأ في التصرف كذاكرة للمنتج.

## شغّل تجارب على الموجّه

بعد إعداد مجموعة البيانات، تشغّل [`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) المجموعة على وكيل أو سير عمل أو مقيّم مسجّل.

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

الآن تتغير المحادثة.

فبدلًا من قول «يبدو أن الموجّه الجديد أفضل»، يمكنك أن تقول:

- سجّل الموجّه القديم `0.94` في دقة اختيار المسار.
- سجّل الموجّه الجديد `0.98`.
- حسّن توجيه الطلبات ذات السياق الطويل.
- تراجع في حالتين من مراجعة الشيفرة.
- خفّض عمليات التحويل إلى النماذج المتميزة بنسبة 18%.
- أضاف 300 مللي ثانية إلى زمن استجابة الموجّه.

هذه محادثة هندسية. توجد مقايضات واضحة، ويمكنك أن تقرر ما إذا كانت المقايضة تستحق ذلك.

## قيّم السلوك الفعلي، لكن لا تخلطه بالحقيقة المرجعية

يمكن لـ Mastra أيضًا إسناد أدوات تسجيل النتائج مباشرةً إلى الوكلاء وخطوات سير العمل. تعمل أدوات التسجيل الفعلية بشكل غير متزامن، وتخزّن النتائج في قاعدة البيانات التي ضبطتها، وتدعم أخذ العينات، حتى لا تقيّم كل استجابة في الإنتاج إلا إذا كان ذلك مقصودًا.

مفيد. لكنه يؤدي مهمة مختلفة.

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

يخبرك التسجيل الفعلي بأن الموجّه لا يزال يصدر قرارات صالحة. فهو يلتقط المخرجات المشوّهة، والمحتوى السام، واستدعاءات الأدوات المحظورة، وغياب علامات الأدلة، وانخفاض الثقة بشكل يثير الشبهة.

لكنه عادةً لا يستطيع إخبارك بدقة اختيار المسار، لأن حركة الإنتاج لا تصل ومعها الحقيقة المرجعية مثبتة عليها.

التسجيل الفعلي هو مراقبة. وتجارب مجموعات البيانات هي اختبارات مضبوطة. أنت تحتاج إلى كليهما. فهما يجيبان عن سؤالين مختلفين.

## ما الذي ينبغي قياسه بعد دقة اختيار المسار

دقة اختيار المسار هي الدرجة الأولى. فهي تخبرك بأن الطلب وصل إلى الاختصاصي المتوقع، ولا تقول شيئًا عن جودة العمل الذي أنجزه ذلك الاختصاصي.

بعد أن يتجاوز الموجّه الأساسيات، قيّم النظام على طبقات:

| الطبقة | ما الذي ينبغي تقييمه | سبب الأهمية |
|---|---|---|
| قرار الموجّه | المسار المحدد، والثقة، والسبب | يلتقط سوء التصنيف وقواعد التصعيد السيئة |
| المسار التنفيذي | تسلسل الأدوات أو الوكلاء المتوقع | يلتقط سلوك «إجابة صحيحة، لكن عبر مسار خاطئ» |
| مخرجات الاختصاصي | الصحة، والأمانة، والفائدة | يلتقط العمل منخفض الجودة بعد التوجيه الصحيح |
| التكلفة وزمن الاستجابة | اختيار النموذج، وعدد الرموز، وزمن التنفيذ | يلتقط الانتصارات المكلفة أو البطيئة |
| الأمان والنطاق | الأدوات المسموح بها، وحدود الرفض، والأدلة | يلتقط حالات فشل تنطوي على مخاطر على المنتج |

يدعم `runEvals` إعدادات أدوات التقييم على مستوى الوكيل، وسير العمل، والخطوة، والمسار التنفيذي، لذلك لا يتعين عليك التظاهر بأن الإجابة النهائية هي الأثر الوحيد المهم.

بالنسبة إلى سير العمل، يبدو الهيكل كالتالي:

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

هذا هو النموذج الذهني الذي أريده للوكلاء في الإنتاج:

قيّم القرار. قيّم المسار. قيّم الإجابة.

إذا قيّمت الإجابة وحدها، فقد ينجح النموذج بالمصادفة.

## ينبغي أن يصبح الموجّه أكثر مللًا بمرور الوقت

عادةً ما يكون موجّه المسارات في نسخته الأولى فقرةً من قرارات تقديرية. لا بأس بذلك في نموذج أولي.

ومع ما تعلّمك إياه التقييمات، ينبغي أن تصبح أجزاء من الموجّه أقل سحرية:

- تتحول الحالات المعجمية الواضحة إلى قواعد حتمية.
- تتطلب المهام عالية المخاطر موافقةً صريحة أو فرعًا في سير العمل.
- تطرح المهام الملتبسة سؤالًا توضيحيًا بدلًا من التخمين.
- تتطلب المسارات المكلفة ثقةً أعلى أو إشارةً ثانية.
- تتحول حالات الفشل المعروفة إلى عناصر في مجموعة البيانات.

الهدف ليس جعل الموجّه «أذكى» إلى الأبد. الهدف هو جعل النظام أسهل في الفهم والتحليل.

أحيانًا يعني ذلك نموذجًا أفضل. وأحيانًا مطالبةً أكثر إحكامًا. وأحيانًا خطوةً في سير العمل، أو أداة تقييم، أو حدًا صارمًا، أو عبارة `if` مملة توفّر عليك آلاف الدولارات شهريًا.

هذه هي الفكرة كلها من قياس السلوك. تتوقف عن الجدال انطلاقًا من الذوق، وتبدأ بالجدال انطلاقًا من الأدلة.

## قائمة بداية عملية

إذا كنت تبني موجّه Mastra اليوم، فابدأ من هنا:

1. اجعل قرار التوجيه منظمًا، حتى إن لم يره المستخدمون أبدًا.
2. اكتب أدوات تقييم حتمية للتحقق من JSON صالح، والمسار المتوقع، والمسارات المحظورة.
3. استخدم `runEvals` مع 10 إلى 20 حالة قبل تغيير مطالبات الموجّه أو نماذجه.
4. حوّل حالات الفشل الحقيقية إلى مجموعة بيانات مُدارة بالإصدارات.
5. شغّل تجارب مجموعات البيانات عند إجراء تغييرات مؤثرة في المطالبة أو النموذج أو المسار أو سير العمل.
6. أضف أدوات تقييم مباشرة للتحقق من الثوابت الرخيصة في الإنتاج.
7. قارن التجارب حسب المسار، لا حسب متوسط الدرجة فقط.

المتوسط أقل أهمية من عنقود الفشل.

إذا كانت كل حالات التراجع تحدث في تركيب سياسات ذات سياق طويل، فليس لديك «موجّه أسوأ». لديك مشكلة في حدود المسار. وإذا كانت كل الحالات الفاشلة تستخدم أداةً بعينها، فلديك مشكلة في عقد الأداة. وإذا كان كل نموذج رخيص يفشل في الحالتين الملتبستين نفسيهما، فأنت تحتاج إلى منطق تصعيد، لا إلى نموذج افتراضي أغلى.

هنا تصبح التقييمات مفيدة. فهي ليست طقسًا شكليًا، ولا لوحة معلومات تجعل الجميع يشعرون مؤقتًا بأنهم صاروا راشدين. إنها توضّح أي جزء من النظام يفشل، حتى تصلح ذلك الجزء بدلًا من إصلاح النظام بأكمله.

## الموارد

- [نظرة عامة على أدوات تقييم Mastra](https://mastra.ai/docs/evals/overview)
- [مرجع `createScorer` في Mastra](https://mastra.ai/reference/evals/create-scorer)
- [مرجع `runEvals` في Mastra](https://mastra.ai/reference/evals/run-evals)
- [نظرة عامة على مجموعات بيانات Mastra](https://mastra.ai/docs/evals/datasets/overview)
- [تجارب مجموعات بيانات Mastra](https://mastra.ai/docs/evals/datasets/running-experiments)
- [لا تتزوج نموذجك](/llm-routing-mastra-ai)
- [حارب الشرور بالتقييمات!](/llm-evals-are-broken)
````
