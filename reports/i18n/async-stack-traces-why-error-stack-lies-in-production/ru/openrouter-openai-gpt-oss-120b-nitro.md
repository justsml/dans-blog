# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 2.31
- Input tokens: 4669
- Output tokens: 939
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000351
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/ru/index.mdx reports/i18n/async-stack-traces-why-error-stack-lies-in-production/ru
## Raw Output

````mdx
---
title: 'Асинхронные трассировки стека: почему `Error.stack` вводит в заблуждение'
subTitle: Очередь микрозадач съела моё домашнее задание (и контекст отладки).
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
Это 2 утра. Сигнал тревоги PagerDuty ревёт.

Вы открываете логи и видите следующее:

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

Больше ничего. Нет имени функции. Нет номера строки. Нет пути к файлу. Только «processTicksAndRejections».

Добро пожаловать в асинхронный JavaScript, где трассировки стека вымышленные, а номера строк не имеют значения.

---

## Почему трассировки стека ломаются

В синхронном коде Call Stack представляет собой красивую генеалогию: A вызвал B, B вызвал C. Когда C падает, вы видите точно, как к этому пришли.

В асинхронном коде (`async/await`) каждый оператор `await` является точкой приостановки.

Когда вы `await`, ваша функция отрывается от стека. Она помещается в криогенный морозильник, называемый Microtask Queue. Стек становится пустым (или занят чем‑то другим).

Когда Promise разрешается, функция размораживается и возвращается в стек. Но история исчезает.

Движок не имеет представления, кто вызывал `await` 500 миллисекунд назад. Он просто знает, что у него есть задача для выполнения.

## Попытки V8 решить проблему

Node.js пытается помочь. У нас есть:

1.  `Error.captureStackTrace()`: Захватывает стек *в момент создания*. Бесполезно, если ошибка будет выброшена позже.
2.  `--async-stack-traces`: Флаг, заставляющий Node.js вести «теневой стек» цепочек промисов.  
    *   Стоимость: Замедляет приложение примерно на 30 %.  
    *   Результат: Помогает, но быстро становится шумным.

---

## Реальное решение: AsyncLocalStorage

Если хотите выжить в продакшене, перестаньте смотреть на стек‑трейсы. Смотрите на причинно‑следственные связи.

Нам нужно привязывать контекст (User ID, Request ID) к «потоку» выполнения, даже когда он перескакивает между стеком и очередью микрозадач.

Node.js предоставляет встроенный инструмент для этого: `AsyncLocalStorage`.

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. Обернуть запрос
context.run({ requestId: '123' }, () => {
  // 2. Вызвать глубокий асинхронный код
  await processOrder();
});

// 3. Глубоко внутри processOrder:
async function processOrder() {
  await db.query();
  
  // Магия! Мы всё ещё видим requestId
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Failed to process order`);
}
```

Не важно, сколько `await` произойдёт между ними — контекст сохраняется.

---

## План действий для продакшена

1. Перестаньте полагаться на `err.stack`. Он неполный по задумке.
2. Используйте структурированное логирование. Прикрепляйте `requestId` к каждой строке лога через `AsyncLocalStorage`.
3. Трейсите, а не стек. Применяйте OpenTelemetry. Он визуализирует причинно‑следственную цепочку между сервисами, что действительно имеет значение.

Ваш код асинхронный. Ваш контекст отладки не должен быть.
````
