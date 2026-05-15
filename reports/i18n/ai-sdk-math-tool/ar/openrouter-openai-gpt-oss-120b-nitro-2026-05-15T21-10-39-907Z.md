# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/ar/index.mdx
- Validation: deferred
- Runtime seconds: 4.86
- Input tokens: 3968
- Output tokens: 1976
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.000510
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: توقف عن طلب الرياضيات من نماذجاللغة
subTitle: هم سيئون في ذلك. إليكم طريقة إصلاحه.
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
أنت تعرف ما الغريب في نماذج اللغة؟ يمكنها شرح ميكانيكا الكم، كتابة شعر، وتصحيح أخطاء TypeScript الخاصة بك... لكن إذا طلبت منها ضرب 18472 في 9347 فهناك احتمال كبير أن تعطيك إجابة واثقة لكنها خاطئة بألاف.

كان هذا يحيرني حتى أدركت ما نطلبه منها فعليًا. نحن نطلب من محرك مطابقة الأنماط أن يكون حاسبة. هذا يشبه طلب من لاعب جمباز أن يوازن دفتر حساباتك لأنه يفهم مفهوم "التوازن".

المسألة هي أن نماذج اللغة الكبيرة لا تحسب شيئًا. عندما تسأل GPT أو Claude ما هو ناتج 2 + 2، فإنهما لا يجريان عملية جمع. إنهما يتوقعان أن تكون "4" هي الرمز الأكثر احتمالًا للظهور بعد "2 + 2 =". في معظم الأحيان، ينجح هذا لأن هذه الأنماط موجودة في بيانات التدريب. لكن إذا دفعت الأمر إلى ما وراء الحسابات البسيطة إلى عمليات حسابية متعددة الخطوات أو أي أرقام لم تكن شائعة في التدريب، فأنت في الأساس ترمي النرد.

صادفت هذا مباشرةً مؤخرًا أثناء مراجعتي لكود يستخدم نموذجًا من الدرجة الأولى لحساب دفعات الرهن العقاري. أجاب النموذج بثقة تامة. وكان خطأً بمقدار 400 دولار/شهر. هذا هو النوع من الأخطاء الذي يهم.

حتى مع تحسن النماذج في الاستدلال (يُقال إن GPT‑5 يظهر تحسينات)، ما زالت تقوم بمطابقة أنماط متقدمة، وليس بحساب رمزي. بالنسبة للأعمال الإبداعية ومهام اللغة الطبيعية، هذه الطبيعة الاحتمالية هي ما يجعلها سحرية. بالنسبة للرياضيات؟ ليس كثيرًا.

## ما هو الحل الفعلي؟

الإجابة ليست انتظار نماذج أذكى. بل إعطاء النموذج الأداة المناسبة للمهمة.

فكر في كيفية حل هذه المشكلة إذا كنت تبني نظامًا غير معتمد على الذكاء الاصطناعي. لن تكتب منطقًا رياضيًا مخصصًا، بل ستستعين بمكتبة. نفس المبدأ ينطبق هنا، إلا أننا الآن نعلم نموذج اللغة الكبيرة متى وكيف يستخدم تلك المكتبة.

استدعاء الأدوات في SDKs الذكاء الاصطناعي الحديثة يتيح لنا تقديم وظائف منظمة يمكن للنموذج استدعاؤها. بدلاً من إجبار النموذج على التظاهر بأنه يعرف الرياضيات، نمنحه ما يقوم بذلك فعليًا: محرك رياضيات رمزي.

أنا أستخدم [AI SDK v5 و v6](https://ai-sdk.vercel.ai/) لهذا الغرض، مقترنًا بـ CortexJS Compute Engine. يتولى SDK تنسيق العملية وتوجيه الأدوات، بينما يتعامل CortexJS مع أي شيء من الحساب الأساسي حتى حساب التفاضل والتكامل. إنه فصل واضح ومفاجئ للمهام.

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## بناء أداة الرياضيات

التنفيذ أبسط مما قد تتوقع. ما نبنيه هو جسر بين فهم النموذج للغة الطبيعية والحساب الرياضي الفعلي.

```typescript
import { generateText, stepCountIs, tool } from 'ai';
import { ComputeEngine } from '@cortex-js/compute-engine';
import { z } from 'zod';

// Initialize the engine once
const ce = new ComputeEngine();

const mathTool = tool({
  description: 'Evaluate mathematical expressions and solve equations with guaranteed accuracy. MUST be used for all mathematical operations to verify correctness - do not attempt mental math. Supports arithmetic, algebra, calculus, and complex operations. Can process multiple expressions at once.',
  parameters: z.object({
    expressions: z.array(z.string()).describe(
      'Array of mathematical expressions in LaTeX or plain notation, e.g. ["2 + 2", "\\frac{x^2 + 1}{x - 1}", "\\int x^2 dx"]'
    ),
  }),
  execute: async ({ expressions }) => {
    // Process all expressions in parallel (or detailed batch)
    return expressions.map(expression => {
      try {
        const result = ce.parse(expression).evaluate();
        return {
          expression,
          result: result.toString(),
          latex: result.latex,
        };
      } catch (error) {
        return { 
          expression,
          error: (error as Error).message 
        };
      }
    });
  },
});
```

بعض النقاط التي تستحق الذكر:

الوصف يقوم بالعمل الثقيل. قد يبدو أن العبارة "MUST be used" عدوانية، لكن في تجربتي، كونك صريحًا مع النموذج حول متى يستخدم الأداة هو الفارق بين عملها أحيانًا وعملها بثقة.

معالجة الدفعات عبر مصفوفة `expressions` أهم مما قد تتصور. كل استدعاء للنموذج يضيف زمن استجابة. إذا كنت تحل نظامًا من المعادلات أو تقوم بحسابات متعددة الخطوات، فإن معالجة كل واحدة على حدة يخلق تجربة مستخدم سيئة. التجميع يعني رحلة واحدة لحل عشر مسائل.

استخدام محرك رمزي بدلاً من `eval()` (رجاءً لا تستخدم `eval()`) يمنحنا فهماً رياضيًا حقيقيًا. المحرك يفسر النية، يتعامل مع تنسيق LaTeX، ويمكنه العمل مع المشتقات والتكاملات. نحن لا نجري مجرد حسابات، بل نمارس الرياضيات.

معالجة الأخطاء محصورة لكل تعبير. إذا فشل حساب واحد، نعيد الخطأ لكن نستمر مع البقية. هذا يسمح للنموذج برؤية ما نجح وما فشل، وربما تصحيح نفسه في الخطوة التالية.

## وضعها قيد التنفيذ

لنلقِ شيئًا عليه عادةً ما يجعل النموذج الخام يهلوس:

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

النموذج يرى العملية الرياضية، يدرك أنه يحتاج إلى دقة، يستدعي الأداة، يحصل على النتيجة الدقيقة، ثم يشرحها بلغة طبيعية. كل مكوّن يقوم بما يجيده.

## ما وراء الحسابات الأساسية

نظرًا لاستخدامنا محركًا رمزيًا، يتعامل هذا النهج مع ما لا تستطيع أدوات الآلة الحاسبة البسيطة الوصول إليه.

هل تريد حل معادلات جبرية؟ `"Solve these equations: 3x + 7 = 22 and 2y - 5 = 13"` يعمل بدون مشاكل.

هل تحتاج إلى حسابات تفاضلية؟ `"Find the derivative of x^3 + 2x^2 and evaluate it at x = 2"` هو مجرد استدعاء أداة آخر.

دعم LaTeX مفيد بشكل خاص إذا كنت تبني تطبيقات تعليمية. المحرك يفهم إدخال LaTeX بطبيعته ويمكنه إرجاع النتائج بصيغة جاهزة للعرض. لا حاجة إلى تحليل إضافي.

## الصورة الأكبر

أعتقد أن هذا النمط له أهمية تتجاوز مجرد الرياضيات. ما نفعله فعليًا هو الاعتراف بحدود نماذج اللغة الكبيرة مع الاستفادة من نقاط قوتها. فهي ممتازة في فهم النية، وتحليل اللغة الطبيعية، وتنسيق سير العمل. لكنها ليست آلات حاسبة أو قواعد بيانات أو أنظمة ملفات.

في كل مرة نحاول فيها جعل نموذج اللغة يقوم بشيء حتمي، نتصارع طبيعته. لكن عندما نجمع بين فهم اللغة الطبيعية وأدوات متخصصة تتولى الأجزاء الحتمية؟ هنا تصبح الأمور مثيرة.

أداة الرياضيات مجرد مثال واحد. نفس المبدأ ينطبق على معالجة التواريخ، الحسابات المالية، معالجة الصور، استعلامات قواعد البيانات… أي مكان تكون فيه الدقة أهم من الإبداع. دع النموذج يفهم ما يريده المستخدم، ثم سلّمه العمل الفعلي إلى ما صُمم لهذا الغرض.

إنها تحول في طريقة تفكيرنا حول بناء الأنظمة بالذكاء الاصطناعي. ليس “هل يستطيع النموذج فعل هذا؟” بل “هل يستطيع النموذج تنسيق هذا؟” فرق بسيط في الصياغة، لكنه فرق كبير في الاعتمادية.

## موارد

- [توثيق Vercel AI SDK](https://sdk.vercel.ai/docs)
- [CortexJS Compute Engine](https://cortexjs.io/compute-engine/)
- [دليل استدعاء الأدوات](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [مستودع أمثلة AI SDK](https://github.com/vercel/ai/tree/main/examples)
````
