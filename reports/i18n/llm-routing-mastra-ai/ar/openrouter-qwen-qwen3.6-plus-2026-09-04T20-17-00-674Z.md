# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: ar
- Model: openrouter/qwen/qwen3.6-plus
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/ar/index.mdx
- Validation: deferred
- Runtime seconds: 150.51
- Input tokens: 3709
- Output tokens: 8730
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 3697
- Estimated cost: $0.018229
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: ''
modified: '2026-09-04'
tags:
  - ai
  - llm
  - typescript
  - mastra
  - agent-orchestration
category: AI
subCategory: Engineering
social_image: ../mobile-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
تختار معظم فرق الهندسة نموذج لغة واحد وتلتزم به. مزود واحد، نموذج واحد، لكل المهام. الأمر أشبه بتوظيف شخص واحد ليقوم بالبرمجة، وكتابة المحتوى، وإعداد الضرائب لمجرد أنه أبلَى بلاءً حسنًا في المقابلة الأولى.

في أي لحظة زمنية، يتفوق نموذج في البرمجة، وآخر في التعامل مع السياقات الطويلة والفوضوية، وثالث يكون حصان العمل الأرخص لمهام التصنيف. تتغير الأسماء، لكن طبيعة المشكلة لا تتغير. التعامل مع نموذج واحد وكأنه يتفوق في كل شيء يعني إما أنك تدفع مبالغ زائدة للمهام البسيطة، أو تحصل على نتائج دون المستوى للمهام المتخصصة.

شاهدت فريقًا يحرق آلاف الدولارات لتشغيل تحليل المشاعر عبر نموذج يكلف 30 دولارًا لكل مليون توكن، بينما كان نموذجٌ بسعر 0.50 دولار سيؤدي المهمة على نفس القدر من الكفاءة. تنسيق JSON بسيط، ومهام تصنيف أساسية، كلها تمر عبر المزود المميز لديهم. الشيء الوحيد الذي كان يسخن هو فاتورة AWS الخاصة بهم.

هناك طريقة أفضل، وهي ليست معقدة بشكل خاص.

## التفويض بدلاً من الولاء

ماذا لو أمكنك توجيه الطلبات إلى النموذج الأنسب فعليًا لتلك المهمة المحددة؟ استخدم نموذجك القوي والمكلف للمهام الصعبة، لكن أنزل مهام التحليل والتنسيق البسيطة إلى شيء أرخص. احصل على مزايا تعدد المزودين دون الحاجة إلى تدويرهم يدويًا داخل قاعدة الكود الخاصة بك.

تتيح لك Mastra بناء هذا النوع من الأنظمة بدقة. تقوم بإعداد وكلاء متخصصين لأنواع مختلفة من العمل، ثم تنشئ وكيلًا مشرفًا يحدد أي متخصص يجب أن يتعامل مع كل طلب. تستخدم معرفات النماذج أدناه تنسيق السلسلة النصية الحالي `provider/model` الخاص بـ Mastra؛ وهي أمثلة وليست قائمة ترتيب. استبدلها بالنماذج الحالية التي تتصدر تقييماتك وتتناسب مع ميزانيتك.

فكر في الأمر على هذا النحو: لديك ثلاثة متخصصين في فريقك.

```typescript
// ./src/mastra/index.ts
import { Mastra } from '@mastra/core/mastra';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export const claudeAgent = new Agent({
  id: 'claude-agent',
  description: 'Handles implementation, refactoring, and code review tasks.',
  instructions: 'You are an expert engineer. Write bugs? You are fired.',
  model: process.env.CODE_MODEL ?? 'anthropic/claude-sonnet-4-6',
});

export const geminiAgent = new Agent({
  id: 'gemini-agent',
  description: 'Handles long-context synthesis and messy document analysis.',
  instructions: 'You are a creative writer. Be weird.',
  model: process.env.LONG_CONTEXT_MODEL ?? 'google/gemini-2.5-pro',
});

export const gptAgent = new Agent({
  id: 'gpt-agent',
  description: 'Handles routine classification, formatting, and general Q&A.',
  instructions: 'You are a helpful assistant. Be boring.',
  model: process.env.GENERAL_MODEL ?? 'openai/gpt-5-mini',
});
```

لكل واحد منهم وظيفة، وحقل `description` جزء من سطح التوجيه. يجب أن يكون وكيل البرمجة الخاص بك هو النموذج الذي يجتاز تقييمات البرمجة الخاصة بمستودعك. يجب أن يكون وكيل السياق الطويل هو الذي يصمد أمام مستنداتك الفعلية دون أن يحول منتصفها إلى حساء. يجب أن يكون الوكيل العام رخيصًا، وموثوقًا، ومملًا بأفضل طريقة ممكنة.

هنا يصبح الأمر مثيرًا للاهتمام. تضيف مشرفًا خفيف الوزن يعمل كوكيل ذكي:

```typescript
export const supervisorAgent = new Agent({
  id: 'supervisor-agent',
  name: 'The Boss',
  instructions: `You route work to the right specialist.
  Delegate coding work to claude-agent.
  Delegate long-context document work to gemini-agent.
  Delegate routine classification and formatting to gpt-agent.
  Do not do specialist work yourself unless delegation is unnecessary.`,
  model: process.env.ROUTER_MODEL ?? 'openai/gpt-5-mini',
  agents: {
    claudeAgent,
    geminiAgent,
    gptAgent,
  },
  memory: new Memory({
    storage: new LibSQLStore({ id: 'router-memory', url: 'file:mastra.db' }),
  }),
});

export const mastra = new Mastra({
  agents: { supervisorAgent, claudeAgent, geminiAgent, gptAgent },
});
```

يمكن للمشرف نفسه العمل على نموذج خفيف الوزن لأنه يقرر في الغالب أين يرسل حركة المرور. أنت لا تدفع أسعارًا مميزة لتكتشف أي نموذج مميز آخر ستستخدمه. قس هذا أيضًا؛ طبقة التوجيه السيئة تحول المدخرات بصمت إلى توجيهات خاطئة.

عندما يطلب شخص ما تنفيذ خوارزمية فرز الفقاعات، يتعرف الموجه على أنها عمل برمجي ويسلمها إلى متخصص البرمجة لديك. موجه كتابة إبداعية؟ يذهب إلى النموذج الذي اخترته للنبرة والمدى. سؤال واقعي عن أحداث تاريخية؟ وجهه إلى الوكيل العام، ويُفضل أن يكون مع استرجاع عندما تكون الحداثة أو الاستشهاد بالمصادر مهمة.

## الفوائد العملية

**كفاءة التكلفة أهم مما تعتقد.** يكلف نموذج توجيه صغير يتخذ قرارات التفويض جزءًا بسيطًا من تشغيل كل طلب عبر مزودك الأغلى. بمرور الوقت، خاصة عند التوسع، يتراكم هذا ليصبح أموالًا حقيقية. أنت تدفع فقط مقابل الذكاء الثقيل عندما تحتاجه فعليًا.

**تتحسن الجودة عندما تطابق النماذج مع المهام.** يتغير الفائز حسب الشهر، والمهمة، وهيكل الموجه. لهذا السبب يجب أن تعتمد طبقة التوجيه على تقييماتك، وليس على أي نموذج كان يتصدر تويتر في الأسبوع الذي كتبت فيه التكامل.

**تصبح المرونة ممكنة، وليست تلقائية.** لا يعيد المشرف أعلاه محاولة مزود فاشل عبر وكيل آخر، ويعتمد على OpenAI لقرار التوجيه نفسه. إذا كان الفشل التلقائي للمزود مهمًا، فأضف سياسة إعادة محاولة/بديل صريحة في كود التطبيق، وأبقِ الموجه البديل على مزود مختلف، واختبر مسار الفشل. مجموعة من الوكلاء ليست قاطع دائرة لمجرد أن النماذج تحمل شعارات مختلفة.

لا يتعلق الأمر بأن تكون ذكيًا لمجرد ذلك. يتعلق الأمر ببناء أنظمة منطقية ماليًا وتقنيًا. لن تستخدم نفس المطرقة لكل مهمة إنشائية، وربما لا يجب أن تستخدم نفس نموذج اللغة لكل مهمة ذكاء اصطناعي أيضًا.

جمال هذا النهج هو أن كود تطبيقك لا يحتاج إلى متاهة من التفرعات الشرطية. لا تزال تستدعي وكيلًا واحدًا. تعقيد قرار أي نموذج يُستخدم لأي مهمة يعيش في مكان واحد، مُهيأ مرة واحدة، بدلاً من أن يكون مبعثرًا في جميع أنحاء قاعدة الكود الخاصة بك في مجموعة من المنطق الشرطي.

### الموارد

- [توثيق Mastra.ai](https://mastra.ai/docs)
- [مستودع Mastra على GitHub](https://github.com/mastra-ai/mastra)

## اقرأ السلسلة

1. **توجيه نماذج اللغة (LLM Routing)** (هذا المنشور)
2. [الأمان والضوابط الأمنية](/mastra-security-guardrails)
3. [تكاملات MCP والأدوات](/mastra-mcp-tool-integrations)
4. [سير العمل والذاكرة](/mastra-workflows-memory)
````
