# Translation Candidate
- Slug: higher-order-programming
- Locale: it
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2015-10-05--higher-order-programming/it/index.mdx
- Validation: deferred
- Runtime seconds: 21.39
- Input tokens: 1216
- Output tokens: 4791
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004973
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Programmazione di ordine superiore
subTitle: Esplorazione di tecniche di pipeline basate su array e set
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
## Esplorare le tecniche di pipeline basate su array e insiemi

### Un anti-pattern?

Questa è un'esplorazione dei vantaggi ottenuti quando si **codifica tutto come un array.** (Utilizzando concetti Jedi da Smalltalk)

Ecco alcuni principi guida:

1.  Tutto l'input è array-like. Anche se si tratta di un array di 1.
1.  Le funzioni di livello superiore dovrebbero generalmente accettare E restituire array. (Ad eccezione dei metodi callback per i loop: map/reduce/each/filter)
1.  Il codice del 99% degli sviluppatori soffre di quella che chiamo la sindrome dell'`acute schema surplusage`.
1.  Diffidate dei `class-backed models` gonfiati - con tutti i consueti annessi: `instance state` fragile con un sacco di leve e manopole da smanettare, transazioni DB, lock SQL, async/mutexing (che funzionano sempre al primo colpo), l'uso idiomatico di `property getter/setters` e il vostro utilizzo di `public/private/final/etc` è a posto, vero?

1.  Quindi prendiamo un problema comune e ci _infiliamo_ ~~~aggiungiamo~~~ alcune riflessioni basate sugli insiemi.
1.  Un ipotetico Blog Site contiene molti Articles e ancora più Posts (Comments).
1.  Aggiungiamo un metodo `delete` (qui sotto) - ma con supporto sia per un singolo elemento che per array.

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

> Perdonatemi se il mio Java è un po' arrugginito.
````
