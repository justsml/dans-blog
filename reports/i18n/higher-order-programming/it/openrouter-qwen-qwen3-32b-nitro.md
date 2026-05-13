# Translation Candidate
- Slug: higher-order-programming
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-10-05--higher-order-programming/it/index.mdx
- Validation: passed
- Runtime seconds: 4.74
- Input tokens: 1901
- Output tokens: 1742
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000570
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Programmazione ad Ordine Superiore
subTitle: ''
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
## Esplorazione di tecniche di pipeline basate su array e insiemi

### Un anti-pattern?

Questa è un'esplorazione dei vantaggi che si ottengono quando si **scrive tutto come un array**. (Utilizzando concetti Jedi da SmallTalk)

Ecco alcuni principi guida:

1. Tutti gli input sono simili a array. Anche se l'array ha un solo elemento.
1. Le funzioni di alto livello dovrebbero generalmente accettare E restituire array. (Eccezioni per i metodi callback per i cicli: map/reduce/each/filter)
1. Il 99 su 100 del codice scritto dagli sviluppatori soffre di ciò che chiamo sindrome di `acute schema surplusage`.
1. Fate attenzione ai modelli basati su classi ingombranti - con tutti i tratti prevedibili: stato dell'istanza fragile con tanti levettoni da rompere, transazioni DB, lock SQL, sincronizzazione asincrona/mutex (che funzionano sempre al primo colpo), utilizzo di getter/setter proprietà idiomatici, e il vostro uso di `public/private/final/etc` è impeccabile, giusto?

1. Quindi permettetemi di prendere un problema comune e _forzarci_ ~~~aggiungere~~~ alcuni ragionamenti basati su insiemi.
1. Un sito blog ipotetico ha molti Articoli, e ha ancora di più i Post (Commenti).
1. Aggiungiamo un metodo `delete` (sotto) - ma con supporto per entrambi il singolare e gli array.

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

  // `Post.delete` può essere chiamato con un singolo Post o un array di Post[]
  public static int delete(Post post) {
    List<Post> posts = new List<Post>(post);
    return delete(posts)
  }

  public static int delete(List<Post> posts) {
    return posts.map(Dao.remove);
  }
}
```

> Scusate se il mio Java è un po' arrugginito.
````
