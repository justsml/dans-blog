# Translation Candidate
- Slug: higher-order-programming
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-10-05--higher-order-programming/ru/index.mdx
- Validation: passed
- Runtime seconds: 0.96
- Input tokens: 2128
- Output tokens: 662
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000202
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Программирование высшего порядка
subTitle: Техники конвейеровна основе массивов и множеств
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
##Исследование техник конвейеров на основе массивов и множеств

### Антипаттерн?

Это исследование преимуществ, получаемых, когда вы **пишете всё как массив**. (С использованием концепций Джедаев из SmallTalk)

Ниже несколько руководящих принципов:

1.  Все входные данные имеют массивоподобную форму. Даже если это массив из 1 элемента.  
2.  Функции более высокого уровня обычно должны принимать **И** возвращать массивы. (За исключением методов‑обратных вызовов для циклов: `map`/`reduce`/`each`/`filter`)  
3.  99 из 100 разработчиков пишут код, страдающий от того, что я называю синдромом `acute schema surplusage`.  
4.  Остерегайтесь раздутых `class-backed models` — со всеми предсказуемыми подводными камнями: хрупкое `instance state` с множеством рычагов и переключателей, транзакции БД, блокировки SQL, асинхронность/мьютексы (которые всегда работают с первого раза), использование идиоматических `property getter/setters`, и ваш `public/private/final/etc` выглядит безупречно, верно?

5.  Позвольте мне взять типичную задачу и _shoehorn_ ~~~add~~~ некоторые размышления на основе множеств.  
6.  Гипотетический блог‑сайт содержит множество статей и ещё больше постов (комментариев).  
7.  Добавим метод `delete` (см. ниже) — но с поддержкой как одиночных объектов, так и массивов.

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

> Простите, если мой Java немного заржавел.
````
