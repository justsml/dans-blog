# Translation Candidate
- Slug: higher-order-programming
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2015-10-05--higher-order-programming/zh/index.mdx
- Validation: deferred
- Runtime seconds: 5.10
- Input tokens: 1140
- Output tokens: 551
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002223
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 高阶编程
subTitle: 探索基于数组与集合的 Pipeline 处理技巧
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
## 探索基于数组与集合的流水线技术

### 一种反模式？

本文旨在探讨**将一切数据都视为数组进行编码**所带来的优势。（灵感源自 SmallTalk 的核心理念）

以下是一些指导原则：

1.  所有输入都是类数组的。哪怕只是长度为 1 的数组。
1.  高阶函数通常应当既接收数组也返回数组。（用于循环的回调方法除外：如 map/reduce/each/filter）
1.  99% 的开发者都患有一种我称之为“急性模式冗余（acute schema surplusage）”的综合征。
1.  警惕臃肿的“基于类的模型（class-backed models）”——它们带有所有预料之中的陷阱：脆弱的“实例状态”以及多到数不清的操纵杆和旋钮、数据库事务、SQL 锁、异步/互斥锁（当然，这些总能一次性跑通）、惯用的“属性 getter/setter”，还有你对 `public/private/final` 等修饰符的使用也绝对没问题，对吧？

1.  现在，让我拿一个常见问题来“强行”插入一些基于集合的思考。
1.  假设一个博客网站有很多文章（Articles），以及更多的帖子/评论（Posts）。
1.  我们来添加一个 `delete` 方法（如下）——但要同时支持单个对象或数组。

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

  // Post.delete 可以通过单个 Post 或 Post[] 数组调用
  public static int delete(Post post) {
    List<Post> posts = new List<Post>(post);
    return delete(posts)
  }

  public static int delete(List<Post> posts) {
    return posts.map(Dao.remove);
  }
}
```

> 如果我的 Java 写得有点生疏，还请见谅。
````
