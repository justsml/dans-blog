# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/ru/index.mdx
- Validation: deferred
- Runtime seconds: 39.09
- Input tokens: 4576
- Output tokens: 3100
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001110
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Асинхронные стек-трейсы: почему `Error.stack` обманывает вас'
subTitle: Микротаск-очередь поглотила мои домашние задания (и контекст отладки).
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
2 часа ночи. Сигнализация PagerDuty оглушает вас.

Вы открываете логи и видите следующее:

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

Вот и всё. Нет имени функции. Нет номера строки. Нет пути к файлу. Только "processTicksAndRejections".

Добро пожаловать в асинхронный JavaScript, где трассировки стека вымышлены, а номера строк не имеют значения.

---

## Почему ломаются трассировки стека

В синхронном коде стек вызовов — это красивая генеалогия. A вызвал B, B вызвал C. Когда C падает, вы видите, как вы оказались там.

В асинхронном коде (`async/await`) каждое ключевое слово `await` — это точка приостановки.

Когда вы `await`, ваша функция вырвана со стека. Ее поместили в криогенный холодильник под названием Microtask Queue. Стек теперь пуст (или делает что-то другое).

Когда Promise разрешится, ваша функция разморозится и бросится обратно на стек. Но история утеряна.

Двигатель не знает, кто вызвал `await` 500 миллисекунд назад. Ему известно только, что есть задача для выполнения.

## Попытки V8 решить проблему

Node.js пытается помочь. У нас есть:

1. `Error.captureStackTrace()`: Захватывает стек *на момент создания*. бесполезен, если ошибка выбрасывается позже.
2. `--async-stack-traces`: Флаг, заставляющий Node.js вести "теневой стек" для цепочек промисов.
   * Стоимость: замедляет приложение на 30%.
   * Результат: помогает, но быстро становится шумным.

---

## Реальное решение: AsyncLocalStorage

Если вы хотите выжить в production, перестаньте смотреть на стек-трейсы. Следите за причинно-следственными связями.

---

## Реальное решение: AsyncLocalStorage

Нам нужно привязать контекст (ID пользователя, ID запроса) к "потоку" исполнения, даже если он переходит между Stack и Microtask Queue.

Node.js предоставляет встроенное средство для этого: `AsyncLocalStorage`.

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. Оберните запрос
context.run({ requestId: '123' }, () => {
  // 2. Вызовите глубокий асинхронный код
  await processOrder();
});

// 3. Глубоко внутри processOrder:
async function processOrder() {
  await db.query();
  
  // Магия! Мы всё ещё видим requestId
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Не удалось обработать заказ`);
}
```

Не важно, сколько `await` происходит посередине. Контекст выживает.

---

## Производственная тактика

1.  Перестаньте доверять `err.stack`. Он по определению неполон.
2.  Используйте структурированное логирование. Прикрепляйте `requestId` к каждой строке лога через `AsyncLocalStorage`.
3.  Следите, а не анализируйте стек. Используйте OpenTelemetry. Он визуализирует причинно-следственную цепочку между сервисами — именно это вам нужно.

Ваш код асинхронный. Ваш контекст отладки не должен быть асинхронным.
````
