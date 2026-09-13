# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: ru
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/ru/index.mdx
- Validation: deferred
- Runtime seconds: 117.83
- Input tokens: 11788
- Output tokens: 14406
- Thinking tokens: unknown
- Cached input tokens: 4096
- Cache write tokens: 0
- Estimated cost: $0.001718
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Не бойтесь маршрутизатора моделей
subTitle: Уверенная маршрутизация к лучшей модели.
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
[Не женитесь на своей модели](../llm-routing-mastra-ai) — это был простой аргумент: перестаньте отправлять каждую задачу одной и той же модели только потому, что она выиграла последний бейк-офф.

Используйте дешёвую модель для дешёвой работы. Используйте более сильную модель там, где работа действительно сложная. Держите уровень маршрутизации достаточно свободным, чтобы смена провайдера не превращала вашу кодовую базу в алтарь.

Это было правильно.

Но и неполно.

Как только вы добавляете маршрутизатор, у вас появляется новое поведение системы, которое нужно тестировать. Вопрос перестаёт быть «какая модель лучше?» и становится «выбрала ли система правильный маршрут, использовала ли правильные инструменты, сохранила ли нужные улики и остановилась ли в нужный момент?»

Если вы это не измеряете, то ваш маршрутизатор моделей — это просто чуйка с таблицей маршрутизации.

<p class="inset">
Маршрутизатор — это не ответ. Маршрутизатор — это гипотеза о том, как должна вести себя ваша система.
</p>

У Mastra есть инструменты, чтобы превратить эту гипотезу в нечто тестируемое: [scorers](https://mastra.ai/docs/evals/overview), [`runEvals`](https://mastra.ai/reference/evals/run-evals), [datasets](https://mastra.ai/docs/evals/datasets/overview) и [experiments](https://mastra.ai/docs/evals/datasets/running-experiments). Названия звучат как инфраструктура для оценки — и это так. Но настоящая ценность проще: они делают поведение агента достаточно видимым, чтобы с ним можно было спорить.

## Что мы тестируем?

Маршрутизатор из предыдущей статьи имеет три специализированных маршрута:

| Маршрут | Что должно туда направляться | Что было бы плохим маршрутом |
|---|---|---|
| `code` | реализация, рефаулинг, отладка, ревью кода | суммаризация длинных контекстов, простая классификация |
| `long-context` | беспорядочные документы, стенограммы, синтез политик, много файлов | короткое механическое форматирование |
| `general` | классификация, форматирование, простые вопросы-ответы, скучная экстракция | сложный код или анализ, требующий доказательств |

Эта таблица — начало. Это не eval.

Для eval нужны примеры и оценщики:

| Элемент | Роль |
|---|---|
| Элемент набора данных | «Вот репрезентативный запрос». |
| Эталон | «Вот ожидаемый маршрут или поведение». |
| Оценщик | «Вот как мы решаем, прошёл ли вывод проверку». |
| Эксперимент | «Вот прогон, с которым мы будем сравнивать будущие прогоны». |

Главный шаг — тестировать поведение, а не только качетсво прозы.

Модель может написать красивый ответ, выбрав неправильный специализированный маршрут. Агент безопасности может выдать правдоподобный отчёт, не сохранив улики. Агент поддержки может звучать эмпатично, пропустив проверку политики возвратов. Параграф — это видимая часть. Траектория — вот где прячутся ошибки.

Для маршрутизатора я начинаю с четырёх осей:

| Ось | Вопрос | Пример оценщика |
|---|---|---|
| Качество | Выбрал ли он правильный маршрут и дал ли полезный результат? | точность маршрута, полнота ответа, верность фактам |
| Стоимость | Избежал ли он премиальных моделей для скучной работы? | класс стоимости выбранного маршрута, бюджет токенов |
| Скорость | Уложился ли он в тайминг-бюджет продукта? | оценщик времени выполнения или таймаута |
| Прочее | Соблюдены ли ограничения безопасности, приватности и наблюдаемости? | белый список инструментов, сохранение улик, поведение отказа |

Последняя строка важна. «Прочее» — это то место, где живут производственные шрамы.

## Сделайте решение маршрутизатора оцениваемым

Если маршрутизатор выдает только окончательный ответ, вы гадаете о решении. Можно оценить вывод, но нельзя сказать, был ли маршрут правильным.

Поэтому дайте шагу маршрутизации небольшой структурированный контракт:

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

Пользователям никогда не нужно видеть этот JSON. Он может быть внутренним шагом, передачей управления рабочему процессу или span трассировки. Оценщику нужен только доступ к нему.

Вот намеренно маленький агент Mastra, который делает только одно — выбирает маршрут:

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

Да, это немного искусственно. Хорошо. Оценки любят скучные стыки.

Когда решение становится явным, вы можете протестировать маршрут до того, как запустится нижестоящий специалист. Отказы маршрутизатора перестают прятаться за отказами выбранной модели, ее промпта, ее инструментов или оценщика финального ответа.

## Напишите оценщик, который ловит скучную ошибку

Mastra [`createScorer`](https://mastra.ai/reference/evals/create-scorer) принимает обычные JavaScript-функции, промпты LLM-судьи или и то, и другое. Начинайте с функций всякий раз, когда отказ детерминирован. Они дешевле, быстрее и менее загадочны.

Точность маршрута не требует модели-судьи. Нужно распарсить JSON и сравнить одно поле.

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

Этот оценщик не гламурен. В этом и суть.

Если маршрутизатор не может стабильно выдавать валидный JSON и выбирать очевидного специалиста на крошечном тестовом наборе, нет причин доверять ему боевой трафик. Вам не нужна модель-философ, оценивающая онтологию. Вам нужен дымовой извещатель с батарейкой внутри.

## Сначала запустите маленький цикл оценки

[`runEvals`](https://mastra.ai/reference/evals/run-evals) — это быстрый цикл. Дайте ему цель, тестовые примеры, оценщики и ограничение параллелизма. Он запускает цель на данных и возвращает агрегированные оценки.

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

Это тот цикл, который вы запускаете, меняя промпт, добавляя маршрут или пробуя более дешевую модель маршрутизатора.

Для зрелой системы этого недостаточно. Но этого достаточно, чтобы предотвратить самую позорную регрессию: «мы поменяли промпт маршрутизатора, и он начал отправлять задачи классификации на премиальную кодовую модель».

Держите оси раздельно. Точность маршрута и качество финального ответа — это разные оценки. Валидность JSON, разрешенные инструменты и трассируемость получают свои собственные проверки. Не сворачивайте всё в одно число «качества». Средние — это место, где полезные сбои уходят на покой.

## Добавляйте LLM-судью только там, где это оправдано

Некоторые маршрутные решения действительно неоднозначны:

```text
Read these logs and tell me why the deploy failed.
```

Это `code`, потому что это отладка? `long-context` из-за логов? `general`, потому что пользователь попросил сводку? Правильный маршрут зависит от доступных инструментов и того, что обещает ваш продукт.

Вот здесь помогает LLM-судья, но только с чёткой рубрикой. Скоринги Mastra могут смешивать шаги функций и шаги объектов-промптов. Используйте функции для структуры, затем судью для той части, которая действительно нуждается в суждении.

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

Этот скоринг стоит денег, потому что он вызывает модель-судью. Это нормально, когда суждение того стоит.

Не используйте его для проверки, парсится ли JSON.

## Продвигайте хорошие случаи в набор данных

Жестко закодированные массивы eval'ов хороши в начале. Со временем ваши примеры становятся активами продукта: неудавшийся тикет клиента, странный разговор в поддержке, попытка инъекции промпта, запрос, который маршрутизировался правильно до прошлого четверга.

Они относятся к набору данных.

Наборы данных Mastra — это версионированные коллекции тестовых случаев. Каждая мутация создает новую версию, поэтому вы можете перезапустить эксперимент против того же набора случаев, который существовал, когда вы приняли решение о модели.

Наборы данных требуют постоянства, поэтому сначала настройте хранилище:

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

Затем создайте набор данных и добавьте случаи:

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

Как только у вас есть набор данных, eval-случаи перестают быть одноразовыми данными скриптов. Они имеют ID, версии, историю и результаты экспериментов.

Вот тогда eval'ы перестают восприниматься как «тестовые файлы для промптов» и начинают ощущаться как память продукта.

## Запускайте эксперименты против маршрутизатора

После того как набор данных создан, [`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) запускает его против зарегистрированного агента, workflow или скоринга.

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

Теперь разговор меняется.

Вместо «новый маршрутизатор кажется лучше» вы можете сказать:

- Старый маршрутизатор показал `0.94` по точности маршрутизации.
- Новый маршрутизатор показал `0.98`.
- Он улучшил маршрутизацию длинных контекстов.
- Он ухудшил два случая code‑review.
- Он сократил число переключений на премиум‑модель на 18%.
- Он добавил 300 мс задержки маршрутизатора.

Это инженерный разговор. На столе лежат компромиссы, и вы можете решить, стоит ли на них идти.

## Оценивайте живое поведение, но не путайте его с истиной

Mastra также позволяет прикреплять скорреры непосредственно к агентам и шагам воркфлоу. Живые скорреры выполняются асинхронно, сохраняют результаты в настроенной базе данных и поддерживают семплирование — чтобы не оценивать каждый ответ продакшена, если только вы этого не хотите.

Полезно. И это другая задача.

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

Живая оценка говорит вам, что маршрутизатор всё ещё выдаёт корректные решения. Она ловит некорректный вывод, токсичный контент, запрещённые вызовы инструментов, пропущенные маркеры обоснования и подозрительно низкую уверенность.

Но она обычно не может оценить точность маршрутизации, потому что продакшен‑трафик не приходит с приклеенной к нему истиной.

Живая оценка — это мониторинг. Эксперименты с датасетами — это контролируемые тесты. Нужны и те, и другие. Они отвечают на разные вопросы.

## Что измерять после точности маршрутизации

Точность маршрутизации — первая ступень. Она говорит, что запрос попал к нужному специалисту. Она ничего не говорит о том, хорошо ли сработал специалист.

Как только маршрутизатор проходит базу, оценивайте систему по слоям:

| Уровень | Что оценивать | Почему это важно |
|---|---|---|
| Решение маршрутизатора | выбранный маршрут, уверенность, причина | Ловит неверную классификацию и плохие правила эскалации |
| Траектория | ожидаемая последовательность инструментов или агентов | Ловит поведение «правильный ответ, неверный путь» |
| Вывод специалиста | корректность, верность фактам, полезность | Ловит низкое качество после правильной маршрутизации |
| Стоимость и задержка | выбор модели, токены, время выполнения | Ловит дорогие или медленные выигрыши |
| Безопасность и границы | разрешённые инструменты, границы отказов, обоснования | Ловит сбои, создающие продуктовый риск |

`runEvals` поддерживает конфигурации скорреров для уровня агента, воркфлоу, шага и траектории — так что не нужно делать вид, что единственный артефакт — это финальный ответ.

Для воркфлоу это выглядит так:

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

Вот ментальная модель для агентов в продакшене, которую я хочу донести:

Оценивай решение. Оценивай путь. Оценивай ответ.

Если оценивать только ответ, модель может пройти случайно.

## Маршрутизатор должен со временем становиться скучнее

Первый промпт маршрутизатора обычно состоит из параграфа оценочных суждений. Для прототипа нормально.

По мере того, как эвалы вас чему-то учат, части маршрутизатора должны становиться менее магическими:

- Чёткие лексические случаи превращаются в детерминированные правила.
- Рискованные задачи требуют явного одобрения или отдельной ветки воркфлоу.
- Неоднозначные задачи задают уточняющий вопрос вместо того, чтобы гадать.
- Дорогие маршруты требуют более высокой уверенности или дополнительного сигнала.
- Известные сценарии отказов становятся элементами датасета.

Цель не в том, чтобы делать маршрутизатор «умнее» бесконечно. Цель — сделать систему проще для анализа.

Иногда это означает лучшую модель. Иногда более точный промпт. Иногда шаг воркфлоу, скор, жёсткий лимит или скучный `if`, который экономит вам четырехзначную сумму в месяц.

В этом и заключается весь смысл измерения поведения. Вы перестаёте спорить на основе вкусовщины и начинаете спорить на основе фактов.

## Практический стартовый чеклист

Если вы сегодня строите маршрутизатор на Mastra, начните с этого:

1. Сделайте решение о маршрутизации структурированным, даже если пользователи его никогда не видят.
2. Напишите детерминированные скоры для валидного JSON, ожидаемого маршрута и запрещённых маршрутов.
3. Используйте `runEvals` с 10–20 кейсами перед тем, как менять промпты или модели маршрутизатора.
4. Превращайте реальные сбои в версионированный датасет.
5. Запускайте экспеименты с датасетом для значимых изменений промпта, модели, маршрута или воркфлоу.
6. Добавляйте живые скоры для дешёвых продакшен-инвариатов.
7. Сравнивайте экспеименты по маршрутам, а не только по среднему скору.

Среднее значение менее важно, чем кластер сбоев.

Если каждая регрессия — в синтезе политик с длинным контекстом, у вас не «худший маршрутизатор». У вас проблема границы маршрута. Если каждый сбой использует один конкретный инструмент, у вас проблема контракта инструмента. Если каждая дешёвая модель падает на одних и тех же двух неоднозначных случаях, вам нужна логика эскалации, а не более дорогой дефолт.

Вот где эвалы становятся полезными. Они не церемония и не дашборд, который заставляет всех временно чувствовать себя взрослыми. Они показывают, какая часть системы отказывает, чтобы вы могли исправить именно эту часть, а не всё целиком.

## Ресурсы

- [Обзор скоров Mastra](hтtps://мастра.ай/docs/евалс/овервью)
- [Справка по `креатеСкор` в Mastra](hтtps://мастра.ай/reференсе/евалс/креате-скор)
- [Справка по `рунЕвалс` в Mastra](https://mastra.ai/reference/evals/run-evals)
- [Обзор датасетов Mastra](https://mastra.ai/docs/evals/datasets/overview)
- [Эксперименты с датасетами Mastra](https://mastra.ai/docs/evals/datasets/running-experiments)
- [Don't Marry Your Model](../llm-routing-mastra-ai)
- [Fight Evils with Evals!](../llm-evals-are-broken)
````
