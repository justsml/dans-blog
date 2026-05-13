# Translation Candidate
- Slug: higher-order-programming
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-10-05--higher-order-programming/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 0.78
- Input tokens: 2076
- Output tokens: 691
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000205
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2015-10-05--higher-order-programming/it/index.mdx reports/i18n/higher-order-programming/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Programmazione diordine superiore
subTitle: Esplorare le tecniche di pipeline basate su array e set
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
## Esplorare le Tecniche di Pipeline Basate su Array e Set

### Un Anti‑Pattern?

Questa è un’esplorazione dei vantaggi ottenuti quando **si codifica tutto come un array**. (Usando i concetti Jedi di SmallTalk)

Ecco alcuni principi guida:

1.  Tutto l’input è simile a un array. Anche se è un array di 1.
2.  Le funzioni di livello superiore dovrebbero generalmente accettare E restituire array. (Eccezione per i metodi di callback dei loop: map/reduce/each/filter)
3.  99 sviluppatori su 100 scrivono codice affetto da quello che chiamo la sindrome del `acute schema surplusage`.
4.  Attenzione ai `class-backed models` gonfiati — con tutti i loro tratti prevedibili: stato di `instance` fragile con così tante leve e manopole da manipolare, transazioni DB, lock SQL, async/mutexing (che funziona sempre al primo tentativo), uso idiomatico di `property getter/setters`, e il tuo utilizzo di `public/private/final/etc` è solido, giusto?

5.  Quindi lasciate che prenda un problema comune e lo _shoehorn_ ~~~add~~~ con qualche riflessione basata su set.
6.  Un ipotetico sito di blog ha molti Articoli e ne ha ancora di più Post (Commenti).
7.  Aggiungiamo un metodo `delete` (sotto) — ma con supporto sia per singoli elementi che per array.

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

> Scusatemi se il mio Java è un po' arrugginito.
````
