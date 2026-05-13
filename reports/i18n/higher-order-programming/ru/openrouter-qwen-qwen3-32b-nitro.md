# Translation Candidate
- Slug: higher-order-programming
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-10-05--higher-order-programming/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 4.06
- Input tokens: 1943
- Output tokens: 1666
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000555
- Pricing source: local-openrouter-estimate
- Note: Command failed: git commit -m i18n candidate(ru): higher-order-programming via openrouter/qwen/qwen3-32b:nitro
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Программирование высшего порядка
subTitle: Исследование методов конвейеров на основе массивов и множеств
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
## Исследование методов обработки данных на основе массивов и множеств

### Антипаттерн?

Это исследование преимуществ, которые получаете вы, когда **кодируете всё как массив.** (Используя понятия из SmallTalk)

Вот основные принципы:

1. Все входные данные являются массивоподобными. Даже если это массив из одного элемента.
1. Высокоуровневые функции в общем случае должны принимать И возвращать массивы. (Исключение — методы-обратные вызовы для циклов: map/reduce/each/filter)
1. 99 из 100 разработчиков сталкиваются с синдромом, который я называю `острый избыток схемы`.
1. Остерегайтесь раздутых `моделей на основе классов` — с их предсказуемыми последствиями: хрупкое `состояние экземпляра` с множеством рычагов и регуляторов, которые легко сломать, транзакции БД, блокировки SQL, асинхронность/mutex (которые всегда работают с первого раза), использование идиоматических `геттеров/сеттеров`, и ваше применение `public/private/final/и т.д.` — вы же всё делаете правильно, верно?

1. Давайте возьмём типичную задачу и _притесним_ ~~~add~~~ добавим некоторые размышления на основе множеств.
1. Гипотетический блог имеет множество статей и ещё больше постов (комментариев).
1. Добавим метод `delete` (ниже) — с поддержкой как одиночных, так и массивных операций.

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

  // Метод `Post.delete` может вызываться с отдельным объектом Post или массивом Post[]
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
