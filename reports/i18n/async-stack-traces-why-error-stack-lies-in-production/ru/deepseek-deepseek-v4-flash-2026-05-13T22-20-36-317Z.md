# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: ru
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/ru/index.mdx
- Validation: deferred
- Runtime seconds: 30.25
- Input tokens: 3295
- Output tokens: 2845
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001205
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Асинхронные стектрейсы: Почему `Error.stack` вам лжет'
subTitle: Очередь микрозадач съела мою домашку (и мой контекст отладки).
date: '2025-12-29'
modified: '2025-12-30'
tags:
  - javascript
  - async
  - debugging
  - node.js
  - v8
  - performance
category: Code
subCategory: Best Practices
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
2 часа ночи. Сигнал PagerDuty завывает.

Вы открываете логи и видите это:

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

Вот и всё. Ни имени функции. Ни номера строки. Ни пути к файлу. Просто «processTicksAndRejections».

Добро пожаловать в асинхронный JavaScript, где стек вызовов выдуман, а номера строк не имеют значения.

---

## Почему стек вызовов ломается

В синхронном коде стек вызовов — это прекрасная генеалогия. A вызвал B, B вызвал C. Когда C падает, вы видите, как вы туда попали.

В асинхронном коде (`async/await`) каждое ключевое слово `await` — это точка приостановки.

Когда вы используете `await`, ваша функция срывается со стека. Она помещается в криогенную камеру под названием «Очередь микрозадач». Стек теперь пуст (или занят чем-то другим).

Когда Promise разрешается, ваша функция размораживается и выбрасывается обратно в стек. Но история потеряна.

Движок понятия не имеет, кто вызвал `await` 500 миллисекунд назад. Он просто знает, что у него есть задача для выполнения.

---

## Попытки V8 исправить это

Node.js пытается помочь. У нас есть:

1.  `Error.captureStackTrace()`: Захватывает стек *в момент создания*. Бесполезно, если ошибка выбрасывается позже.
2.  `--async-stack-traces`: Флаг, заставляющий Node.js хранить «теневой стек» цепочек промисов.
    *   Цена: замедляет ваше приложение на 30%.
    *   Результат: помогает, но быстро становится шумным.

---

## Настоящее решение: AsyncLocalStorage

Если вы хотите выжить в продакшене, перестаньте смотреть на стектрейсы. Смотрите на причинность.

Нам нужно прикрепить контекст (ID пользователя, ID запроса) к «потоку» выполнения, даже когда он прыгает между Стеком и Очередью микрозадач.

У Node.js есть встроенный инструмент для этого: `AsyncLocalStorage`.

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. Wrap the request
context.run({ requestId: '123' }, () => {
  // 2. Call deep async code
  await processOrder();
});

// 3. Deep inside processOrder:
async function processOrder() {
  await db.query();
  
  // Magic! We can still see the requestId
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Failed to process order`);
}
```

Неважно, сколько `await` произошло между ними. Контекст выживает.

---

## Плейбук для продакшена

1.  Перестаньте доверять `err.stack`. Он неполон по своей конструкции.
2.  Используйте структурированное логирование. Прикрепляйте `requestId` к каждой строке лога с помощью `AsyncLocalStorage`.
3.  Трассируйте, а не стектрейсьте. Используйте OpenTelemetry. Он визуализирует причинно-следственную цепочку между сервисами — то, что вам на самом деле нужно.

Ваш код асинхронен. Ваш контекст отладки — не должен.
````
