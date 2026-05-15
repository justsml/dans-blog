# Translation Candidate
- Slug: llm-evals-are-broken
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-06--llm-evals-are-broken/ar/index.mdx
- Validation: deferred
- Runtime seconds: 5.73
- Input tokens: 7917
- Output tokens: 3520
- Thinking tokens: unknown
- Cached input tokens: 2816
- Cache write tokens: 0
- Estimated cost: $0.000942
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: حارب الشر باستخدام التقييمات!
subTitle: المقاييس تقيس المقاييس. نظامك يحتاج إلى مقاييسه الخاصة.
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
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
كل نموذج جديد يأتي مرتديًا بدلة رسمية من المعايير.

MMLU: 92.4٪. HumanEval: 87.2٪. LLeMU: 88.7٪. MATH: 73.6٪. AGI: 127٪!

ومع ذلك، بالنسبة لـ 99٪ من الشركات التي تبني عمليات ومنتجات باستخدام الذكاء الاصطناعي، **لا شيء من ذلك يهم.**

ما الذي يهم؟ كيف تؤدي أحمال عملك؟ هل تتحسن أم تسوء؟ الطريقة المنطقية الوحيدة لمعرفة ذلك هي كتابة تقييمات (اختبارات للـ LLM) تعكس المهام المحددة والبيانات وأنماط الفشل في نظامك.

<blockquote class="breakout">
  <p>المعايير لا تكذب. إنها تجيب على سؤال شخص آخر.</p>
</blockquote>

---

## ما "التقييم القائم على الأجواء" يكلفه فعليًا

النهج التقليدي: نشر تغيير في النموذج، مراقبة قنوات الشكاوى، التراجع إذا ارتفعت الضوضاء.

هذا يتغاضى عن معظم ما هو مثير للاهتمام:

**أنت تلتقط فقط الفشل الصاخب.** المستخدمون الذين يحصلون على إجابة خاطئة بثقة ولا يدركون ذلك؟ صامتون. المستخدمون الذين يحصلون على إجابة أسوأ ويتخلون عن الميزة؟ صامتون. تذاكر الدعم ومعدلات الأخطاء تلتقط فقط جزءًا من تراجع الجودة.

**لا يمكنك التمييز بين التراجعات والتحسينات.** إذا كان النموذج الجديد أفضل في المهمة أ وأسوأ في المهمة ب، فإن الشكاوى بشأن ب تبدو مماثلة لتغذية "الذكاء الاصطناعي أصبح أسوأ". لا تعرف ما الذي يجب إصلاحه.

**أنت تستخدم مستخدميك كالبنية التحتية للاختبار.** لم يوقعوا على ذلك.

---

## طيف التقييم (وأين تخطئ معظم الفرق)

تقنيات التقييم تتوزع على طيف من "سريعة لكن هشة" إلى "مكلفة لكن صالحة."

<figure class="breakout">

![مخطط طيف يقارن الفحوصات الحتمية، LLM‑as‑judge، والتقييم البشري من حيث السرعة، التكلفة، والصلاحية.](../eval-spectrum.svg)

<figcaption>استخدم أرخص طريقة تقييم يمكنها صراحةً اكتشاف الفشل.</figcaption>
</figure>

**LLM‑as‑judge** هو المفضل حاليًا: اطلب من نموذج قوي تقييم مخرجات نموذج آخر. سريع، قابل للتوسع، رخيص. المشكلة: يدمج تحيزات نموذج التقييم، يمكن التلاعب به، ويخلق اعتمادًا دائريًا. إذا استخدمت GPT‑5 لتقييم مخرجات GPT‑5، فأنت تقيس شيئًا مثل "كم يتفق GPT‑5 مع GPT‑5". هذا ليس لا شيء، لكنه ليس ما تعتقد.

**التقييم البشري** هو المعيار الذهبي الذي يحاول الجميع تجنبه. الحصول على بشر لتقييم المخرجات مكلف، بطيء، غير متسق بين المقيمين، ومزعج في الجدولة. لكنه الوحيد الذي يتحقق مما إذا كان نظامك مفيدًا للبشر الحقيقيين.

**التحقق الآلي المتخصص بالمهمة** هو ما يجب على معظم الفرق أن تستثمر فيه المزيد من الوقت. ليست مهمة جذابة، لكنها سريعة، حتمية، ومربوطة بما يهم نظامك.

---

## ما ينجح فعليًا

### 1. تعريف الفشل قبل النشر

قبل تعديل نموذج أو موجه، اكتب ما يبدو عليه الفشل. بشكل محدد.

ليس "يجب أن يكون الإخراج دقيقًا". هذا ليس اختبارًا. بل مثل:

- يجب أن يُ解析 إخراج JSON منظم دون أخطاء
- يجب أن تظهر جميع الاستشهادات في الرد حرفيًا في السياق المسترجع
- يجب ألا تذكر الردود أسماء منتجات المنافسين
- يجب أن تكون استعلامات SQL صالحة نحويًا وتشير فقط إلى الجداول الموجودة في المخطط
- يجب ألا يتحول تصنيف المشاعر من إيجابي إلى سلبي بأكثر من 3 % من الوقت على مجموعة الاختبار الحالية

يمكنك التحقق من هذه برمجيًا. لا حاجة لنموذج قاضي.

**حاوية التقييم: فحوصات حتمية**

```typescript
type EvalResult = { passed: boolean; reason?: string };

const evals: Record<string, (output: string, context: EvalContext) => EvalResult> = {
  // JSON must parse
  validJson: (output) => {
    try {
      JSON.parse(output);
      return { passed: true };
    } catch (e) {
      return { passed: false, reason: `Invalid JSON: ${e.message}` };
    }
  },

  // No hallucinated citations — every claim must appear in context
  groundedCitations: (output, { retrievedChunks }) => {
    const claims = extractCitations(output);
    const ungrounded = claims.filter(
      (claim) => !retrievedChunks.some((chunk) => chunk.includes(claim))
    );
    return ungrounded.length === 0
      ? { passed: true }
      : { passed: false, reason: `Ungrounded claims: ${ungrounded.join(', ')}` };
  },

  // Response length sanity check — catch truncation or runaway generation
  reasonableLength: (output) => {
    const words = output.split(/\s+/).length;
    return words >= 10 && words <= 2000
      ? { passed: true }
      : { passed: false, reason: `Word count ${words} out of bounds` };
  },
};
```

### 2. بناء مجموعة ذهبية من أسوأ أيامك

أفضل بيانات التقييم لديك هي الأشياء المحرجة: المخرجات التي جعلت أحدهم يفتح تذكرة، يلتقط لقطة شاشة لتخيلات غير واقعية، أو يتوقف بهدوء عن استخدام الميزة.

في كل مرة يبلغ فيها مستخدم عن إخراج سيء، أو يضع علامة على تخيل، أو تلاحظ فشلًا يدويًا، أضفه إلى مجموعتك الذهبية: الإدخال، السياق، والسلوك الصحيح. احفظ 50‑100 حالة وشغّلها على كل تغيير في النموذج.

يبدو هذا يدويًا في البداية. بعد ستة أشهر، ستحصل على مجموعة اختبارات لا يمكن لأي معيار عام أن يتلاعب بها، لأن كل حالة جاءت من تاريخ فشلك الخاص.

<figure class="breakout">

![مخطط تدفق يوضح كيف تتحول الحوادث الإنتاجية السيئة إلى حالات ذهبية، ثم تُجرى تقييمات CI، ثم تُحجب الانحدارات أو تُعتمد الإصدارات.](../golden-set-lifecycle.svg)

<figcaption>المجموعة الذهبية تحوّل الأشياء المحرجة إلى مجموعة انحدار.</figcaption>
</figure>

**شكل الحالة الذهبية**

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

### 3. اختبار الانحدار، ليس اختبار القبول فقط

معظم الفرق تُجري التقييمات فقط عند النظر في تغيير نموذج. هذا اختبار قبول: "هل هذا الجديد جيد بما فيه الكفاية؟"

أنت بحاجة أيضًا إلى اختبار الانحدار: "هل كسر هذا شيئًا كان يعمل مسبقًا؟"

قم بتشغيل مجموعة “الذهب” الخاصة بك على كل تغيير في المطالبة، وليس فقط على تغييرات النموذج. قد يتدهور طلب كان يعمل بشكل جيد بصمت عندما تضيف أداة جديدة، أو تغير استراتيجية استرجاع RAG، أو تُحدّث قالب السياق. لن تعرف ذلك دون وجود خط أساس. أدوات مثل [Langfuse](https://langfuse.com/) تُرفق درجات التقييم إلى تتبعات الإنتاج بحيث تظهر الانحدارات في لوحات التحكم، وليس فقط في تقارير الحوادث.

<details>
<summary>إطار التقييم: مقارنة الخط الأساسي بالمرشح</summary>

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

إذا تراجع مرشح على الأخطاء المعروفة، تصبح محادثة الترقية محددة بشكل رائع: ما الحالات التي تحسّنت، وما الحالات التي انكسرت، وما إذا كان التبادل يستحق العناء.

### 4. استخدم LLM‑as‑Judge لشيء واحد فقط

LLM‑as‑judge مفيد للمخرجات المفتوحة حيث لا توجد إجابة صحيحة حتمية: “هل هذا الرد مفيد؟”، “هل يلخص هذا النص النقاط الرئيسية؟”، “هل هذا الشرح صحيح للمبتدئ؟”

استخدمه هناك. لا تستخدمه للإجابات الحتمية. عندما تستخدمه، اجعل معيار التقييم صريحًا:

**إطار التقييم: حكم قائم على المعيار**

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

معيار صريح يقلل من تباين المقيم، يمنحك مخرجات قابلة للتفسير، ويسهّل تدقيق الأخطاء عندما يكون الحكم غير صحيح. مكتبات مثل [Autoevals](https://github.com/braintrustdata/autoevals) و[Braintrust](https://www.braintrust.dev/) توفر معايير مسبقة البناء للمهام الشائعة — جديرة بالاستعارة قبل كتابة معيارك من الصفر.

---

## أدوات تستحق المعرفة

ليس عليك بناء كل هذا من الصفر. عدة أدوات حققت تقدمًا جادًا في مشكلة بنية التقييم:

**[Braintrust](https://www.braintrust.dev/)** — منصة تقييم كاملة مع تتبع التجارب، إدارة مجموعات البيانات، ووظائف التقييم. تُنظم تشغيلات التقييم حسب المطالبة، النموذج، والنشر بحيث يمكنك مقارنة الجودة بمرور الوقت، وليس فقط عبر الإصدارات. تتكامل جيدًا مع مكتبتهم المفتوحة المصدر **[Autoevals](https://github.com/braintrustdata/autoevals)** التي توفر وظائف تقييم مُدرجة مسبقًا للمهام الشائعة (دقة الحقائق، الفائدة، السمية، التشابه الدلالي).

**[Langfuse](https://langfuse.com/)** — مراقبة LLM مفتوحة المصدر تجلس بين تطبيقك ونماذجك. تتبع كل استدعاء، تُرفق درجات التقييم (بشرية أو آلية) إلى كل جزء، وتظهر اتجاهات الجودة عبر حركة المرور الإنتاجية. خيار جيد إذا أردت المراقبة والتقييم في أداة واحدة بدلاً من إطار تقييم منفصل.

**[Evalite](https://www.evalite.dev/)** — إطار تقييم أصلي لـ TypeScript من تأليف مات بوك. بسيط: عرّف مهمة، عرّف مُقَيِّمًا، شغّله في إعداد الاختبار الحالي. يستهدف الفرق التي تريد تقييمًا يشبه اختبارات الوحدة بدلاً من منصة تجارب ML منفصلة.

**[promptfoo](https://www.promptfoo.dev/)** — أداة تشغيل تقييم سطر أوامر تركّز على مقارنة المطالبات واختبار الاختراق. سهلة التكوين عبر YAML، تتكامل مع معظم مزودي النماذج، وتدعم اكتشاف حقن المطالبات وغيرها من المدخلات العدائية.

**[deepeval](https://docs.confident-ai.com/)** — إطار تقييم Python مع مكتبة كبيرة من المقاييس المدمجة (G‑Eval، وفاء RAG، صلة الإجابة، كشف الهلوسة). مفيد لأنابيب RAG حيث تريد تقييمًا محددًا لجودة الاسترجاع، وليس فقط جودة التوليد.

الأداة المناسبة تعتمد على البنية التقنية التي تستخدمها ومكان انطلاقتك. ما يهم أكثر من اختيار الإطار هو الانضباط في تشغيل التقييمات على الإطلاق — باستمرار، على كل تغيير مهم.

## الجزءالمزعج

معظم الفرق تتجاوز هذا لأن السؤال يثير الانزعاج في البداية: كيف يبدو “الجيد” هنا؟

هذا صعب حقًا بالنسبة لميزة AI جديدة. لكنه غير قابل للتفاوض إذا كنت تهتم بالموثوقية. الفرق التي تُطلق AI موثوق تقوم بنفس ما كانت تفعله لأي مسار شفرة حاسم: تعريف السلوك المتوقع، اختباره، وتشغيل تلك الاختبارات باستمرار.

المقاييس لا تكذب. إنها تجيب على سؤال شخص آخر. توقف عن قراءتها كخرائط طريق للمنتج وابدأ بكتابة اختبارات تتطابق مع نظامك.

سيدرك مستخدموك ذلك قبل أن تلاحظ ذلك لوحات التحكم الخاصة بك. ابنِ مجموعة الاختبارات أولاً.
````
