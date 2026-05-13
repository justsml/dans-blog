# Translation Candidate
- Slug: higher-order-programming
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-10-05--higher-order-programming/it/index.mdx
- Validation: deferred
- Runtime seconds: 0.52
- Input tokens: 1275
- Output tokens: 593
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000156
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Programmazione di ordine superiore
subTitle: Esplorare tecniche di pipeline basate su array e set
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

Questa è un’esplorazione dei vantaggi ottenuti quando **si codifica tutto come un array**. (Usando concetti Jedi da SmallTalk)

Ecco alcuni principi guida:

1.  Tutto l’input è simile a un array. Anche se è un array di 1.
1.  Le funzioni di livello superiore dovrebbero generalmente accettare E restituire array. (Eccezione per i metodi di callback dei cicli: map/reduce/each/filter)
1.  99 sviluppatori su 100 scrivono codice affetto da quello che chiamo sindrome di `acute schema surplusage`.
1.  Attenti ai `class-backed models` gonfiati – con tutti i classici problemi prevedibili: stato di `instance` fragile con così tante leve e manopole da gestire, transazioni DB, lock SQL, sincronizzazione asincrona/mutex (che funziona sempre al primo tentativo), uso idiomatico di `property getter/setters`, e il vostro utilizzo di `public/private/final/etc` è solido, giusto?

1.  Quindi lasciate che prenda un problema comune e lo _shoehorn_ ~~~add~~~ con qualche riflessione basata su set.
1.  Un ipotetico Blog Site ha molti Articoli, e ha ancora più Post (Commenti).
1.  Aggiungiamo un metodo `delete` (sotto) – ma con supporto sia per singoli elementi che per array.

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

> Perdona se il mio Java è un po' arrugginito.
````
