# Translation Candidate
- Slug: higher-order-programming
- Locale: ru
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2015-10-05--higher-order-programming/ru/index.mdx
- Validation: deferred
- Runtime seconds: 26.65
- Input tokens: 1211
- Output tokens: 5872
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.006054
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Программирование высшего порядка
subTitle: Изучение методов конвейерной обработки на основе массивов и множеств
date: '2015-09-22'
modified: '2024-07-30'
category: Code
subCategory: programming
tags:
  - programming
  - patterns
  - models
  - source-code
  - organization
cover: ../susan-holt-simpson-799094-unsplash.webp
cover_mobile: ../w300_susan-holt-simpson-799094-unsplash.webp
cover_icon: ../icon_susan-holt-simpson-799094-unsplash.webp
---
## Исследование конвейерных техник на основе массивов и множеств

### Антипаттерн?

Это исследование преимуществ, которые появляются, когда вы **пишете всё как массив.** (Используя джедайские концепции из SmallTalk)

Вот несколько руководящих принципов:

1.  Все входные данные имеют массивоподобную структуру. Даже если это массив из одного элемента.
1.  Функции высшего порядка должны, как правило, принимать И возвращать массивы. (За исключением методов обратного вызова для циклов: map/reduce/each/filter)
1.  В 99 из 100 случаев код разработчиков страдает от того, что я называю синдромом `острой избыточности схемы`.
1.  Остерегайтесь раздутых `моделей на базе классов` — со всеми предсказуемыми атрибутами: хрупкое `состояние экземпляра` с кучей рычагов и переключателей, которые можно дергать, транзакции БД, sql-блокировки, асинхронность/мьютексы (которые всегда работают с первого раза), использование идиоматических `геттеров/сеттеров свойств`, и ваше применение `public/private/final/etc` кажется надёжным, верно?

1.  Итак, давайте возьмём распространённую задачу и _впихнём_ ~~~add~~~ некоторые размышления на тему множеств.
1.  Гипотетический Блог имеет множество Статей, и ещё больше Записей (Комментариев).
1.  Добавим метод `delete` (ниже) — но с поддержкой как одиночного элемента, так и массива.

```java
package net.danlevy.why.java___why.you.got.all.the.dots____it.must.be.all.the.factories;

public class Post {
  public String   title;
  public Date     created;
  public String   message;

  public Post(String title, String message) {
    this.title    = title;
    this.message  = message;
    this.created  = new Date();
  }

  public Date isArchived() {
    return this.created < new Date(2015, 0, 1);
  }

  // Post.delete` can be called w/ a singular Post or an array of Post[]
  public static int delete(Post post) {
    List<Post> posts = new List<Post>(post);
    return delete(posts)
  }

  public static int delete(List<Post> posts) {
    return posts.map(Dao.remove);
  }
}
```

> Простите, если мой Java немного ржавый.
````
