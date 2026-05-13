# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/ru/index.mdx
- Validation: deferred
- Runtime seconds: 5.68
- Input tokens: 9519
- Output tokens: 2491
- Thinking tokens: unknown
- Cached input tokens: 4352
- Cache write tokens: 0
- Estimated cost: $0.000820
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Мастер конвейеров: передача состояния'
subTitle: 'Привет, замыкание, мой старый друг.'
date: '2023-08-09'
modified: '2024-07-30'
tags:
  - typescript
  - closure
  - stateful
  - scoping
  - hoisting
  - functional
  - pipeline
category: Guides
subCategory: JavaScript
cover: ../sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_mobile: ../w300_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_icon: ../icon_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
---
## Мастер конвейеров: передача состояния

Вы сталкивались с проблемами передачи состояния при использовании функциональных конвейеров?

Организация (или её отсутствие) вашего кода напрямую влияет на то, насколько легко передавать состояние между частями.

В этой статье мы рассмотрим эффективную технику передачи состояния через конвейер. По пути улучшится структура и читаемость кода.

В качестве примера будем использовать «реальный» фрагмент: функция оформления покупки, принимающая `userId` и массив `products`. Она возвращает цепочку промисов, последовательно вызывающую четыре функции.

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

Подождите секунду, этот код на самом деле довольно приличен, если говорить о конвейерах в JS!

Это приводит к нескольким тонким проблемам, которые могут объединиться в более серьёзные.

Одна из них — мы постоянно передаём `userId` каждому (логически связанному) вызову. Сочетайте это с ещё одной ошибкой, которую легко упустить и разработчикам, и TypeScript: перестановка числовых аргументов легко приводит к тихому багу. (Смотрите `applyTaxes` и `purchaseProducts`. _Что должно идти первым — `userId` или `amount`?_)

Прежде чем решать, как улучшить код, оценим плюсы и минусы.

### Плюсы и минусы

#### Плюсы

- Хорошее использование замыкания! `userId` и `products` передаются один раз!
- Последовательное именование аргументов.
- Относительно эффективная и лаконичная композиция четырёх ключевых функций для оформления заказа.
- «Бесплатный» контроль ошибок. (Ошибки всплывают из любой вложенной функции, отклоняя Promise, возвращаемый `checkout()`.)

#### Недостатки

- Постоянно передавать `userId` вокруг утомительно.  
- Функции не являются одноаргументными (униарными). _Это ухудшает композицию. См. [финальный пример](#checkout-with-further-improvements) — почему?_  
- Не всегда очевидно, что именно возвращает каждая функция. (Это результат отправки email или переменная `result`? Или что‑то ещё?)  
- Не ясно, как добавить новую функциональность (например, загрузить скидку/кредит/баллы клиента и т.п.).  
- Иногда «временные» имена параметров (как в каждом `.then(param => {})`) добавляют контекст. Однако со временем они, как правило, превращаются в назойливый мусор.

### Решение, часть 1: Сделать модуль!

Эта техника заключается в организации связанных функций в один модуль (например, `CartHelpers`). Она не требует конкретного шаблона. Изучите [фабричные функции](#carthelpers-factory), [классы](#carthelpers-class), замыкания, миксины и т.д. Выберите то, что имеет смысл для вашего проекта и команды.

#### Фабрика CartHelpers

Пример модуля `CartHelpers`, где `userId` передаётся один раз, а все методы принимают единственный аргумент.

```tsx
const CartHelpers = (userId: number) => {
  return {
    getProductsSubtotal: products => getProductsSubtotal(userId, products),
    applyTaxes: subTotal => applyTaxes(userId, subTotal),
    purchaseProducts: total => purchaseProducts(userId, total),
    sendReceipt: invoice => sendReceipt(userId, invoice)
  };
};
```

#### Класс CartHelpers

Если вам ближе классы, адаптировать всё просто:

```tsx
class CartHelpers {
  constructor(userId) {
    this.userId = userId;
  }
  getProductsSubtotal = products => getProductsSubtotal(this.userId, products);
  applyTaxes = subTotal => applyTaxes(this.userId, subTotal);
  purchaseProducts = total => purchaseProducts(this.userId, total);
  sendReceipt = invoice => sendReceipt(this.userId, invoice);
}
```

Немедленные выгоды:

- Убираем повторяющуюся передачу переменных.
  - DRY: `CartHelpers` инкапсулирует повторяющийся аргумент `userId`.
  - Каждый метод принимает **только** необходимые параметры. Вызов `cart.applyTaxes(subTotal)` читается без сюрпризов.
- Функции с единственным аргументом в `CartHelpers` легче воспринимаются, их назначение яснее.

Группируя связанные функции, мы получаем возможность сократить публичный интерфейс (например, `checkout()`, публичные методы `CartHelpers`).

> Меньше публичных точек входа — меньше когнитивной нагрузки, лучше тестируемость и поддерживаемость.  
> _Проектируйте системы с намерением и фокусом. ✨_

#### Checkout & CartHelpers Usage

Посмотрим, как теперь выглядит функция `checkout()`:

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  return Promise.resolve(products)
    .then(products => cart.getProductsSubtotal(products))
    .then(subTotal => cart.applyTaxes(subTotal))
    .then(total => cart.purchaseProducts(total))
    .then(result => cart.sendReceipt(result));
};
```

##### Checkout с дальнейшими улучшениями

> Можно ли улучшить ещё? Да! Нам не нужно повторять аргументы вовсе!

Когда аргументы функции поступают из результата предыдущих функций, код можно упростить ещё больше.

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 Функции складываются как Lego и читаются как обычные «Человеческие слова!» 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**Если кажется неестественным объединять параметры в один (объектный) аргумент,** рассмотрите разбивку функций **ИЛИ** их объединение в более адекватно сфокусированные модули.

#### Счего начать?

Найдите связанные функции и сгруппируйте их вместе (например, `CartHelpers`).

Часть сложности при поиске потенциальных логических модулей — это сначала определить, какой код действительно связан.

##### Что делает функции связанными?

Один полезный приём: ищите повторения в параметрах функций. Есть ли какая‑то связь? Или общая ответственность?

- ✅ Функции с повторяющимися, общими аргументами. (Например, если 4 метода принимают `userRewards`, скорее всего нужен модуль `Rewards` или аналогичный.)
- ✅ Функции, чьи аргументы напрямую получаются из вывода предыдущих функций. (Последовательные шаги, например `Extract`, `Transform`, `Load`.)
- ❌ Что‑то смутно связанное с областью функции, «покупка продукта?»
- ❌ Функции, названия которых имеют общий префикс или суффикс?
- ❌ Функции, требующие больших объектов в качестве аргументов, хотя используют лишь несколько значений из этих объектов. (Например, `applyTaxes({ user, business, rewards, kitchenSink })` против `applyTaxes({ subTotal })`)

While there is no single “right answer” to designing modules, it helps to identify 2‑3 options for organization – draw an outline, write “fantasy” code, ask “does it spark joy?”

<aside>
📌 It often takes a few attempts at module organization before your Domain Model shakes out. Don’t agonize getting it perfect.
</aside>

> You might feel `cart.sendReceipt()` doesn’t belong with payment‑related methods. Perhaps `customerNotifications.sendReceipt()` is a better home for customer messaging. If `CartHelper` is high‑enough in importance, it may act as a **_controller_** internally calling all necessary **_services_**, like `customerNotifications`.

#### Как понять, что вы делаете правильно?

Если читаемость не страдает, когда вы убираете ad‑hoc аргументы, **CONGRATULATIONS!!!** Скорее всего, вы создали модуль с чёткой и надёжной областью ответственности!

- Удаление промежуточных аргументов заставляет «слои» появляться естественно.  
- Должно быть трудно бросать ad‑hoc код в неправильное место!

Итак, возникает вопрос: где добавить новую функциональность?

По моему опыту, при добавлении функций стоит рассмотреть две основных стратегии:

1.  Расширить/рефакторить существующий метод. (Когда новый код достаточно близок к уже существующему.)
2.  Создать новую (пятую) функцию в нужном месте цепочки. (Если новый код не связан с текущими функциями.)

В итоге это упрощает выбор места для новой функциональности. (например, `cart.applyDiscounts()`, `cart.applyTaxes()`, `rewards.getBalance()`.)

### Заключение

Передача состояния через сложный конвейер может быть проблематичной. Однако при небольших рефакторинговых практиках вы начнёте писать более читаемый код с меньшей когнитивной нагрузкой.

Вопросы? Комментарии? Беспокойства? Пишите напрямую [@justsml](https://x.com/justsml) или пишите на [email](mailto:dan@danlevy.net).

#### Ожидайте следующую часть серии

Мы рассмотрим вынос состояния наружу и расширение функциональности нашего модуля!

#### Сопутствующая литература

- [Подобные проблемы встречаются в мире компонент‑ориентированного React.](https://kyleshevlin.com/quit-your-yapping)
````
