# Translation Candidate
- Slug: higher-order-programming
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-10-05--higher-order-programming/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 0.94
- Input tokens: 2056
- Output tokens: 686
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000204
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug higher-order-programming --locale fr
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Programmation d'ordre supérieur
subTitle: Explorer les techniques de pipeline basées sur les tableaux et les ensembles
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
## Explorer les techniques de pipeline basées sur les tableaux et les ensembles

### Un anti‑pattern ?

Il s’agit d’examiner les avantages obtenus lorsque vous **codez tout comme un tableau**. (En empruntant les concepts Jedi de SmallTalk)

Voici quelques principes directeurs :

1.  Toutes les entrées sont de type tableau‑like. Même s’il ne s’agit que d’un tableau de taille 1.  
2.  Les fonctions de haut niveau doivent généralement accepter **ET** renvoyer des tableaux. (À l’exception des méthodes de rappel pour les boucles : map/reduce/each/filter)  
3.  99 développeurs sur 100 écrivent du code qui souffre de ce que j’appelle le syndrome `acute schema surplusage`.  
4.  Méfiez‑vous des `class-backed models` gonflés – avec tous les pièges prévisibles : état d’`instance` fragile avec tant de leviers et de boutons à manipuler, transactions DB, verrous SQL, asynchronisme/mutex (qui fonctionnent toujours du premier coup), utilisation idiomatique des `property getter/setters`, et votre utilisation de `public/private/final/etc` est solide, n’est‑ce pas ?

5.  Alors, prenons un problème commun et _shoehorn_ ~~~add~~~ quelques réflexions basées sur les ensembles.  
6.  Un site de blog hypothétique possède de nombreux Articles, et encore plus de Posts (Commentaires).  
7.  Ajoutons une méthode `delete` (ci‑dessous) – mais avec prise en charge à la fois du singulier **OU** des tableaux.

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

> Pardonnez‑moi si mon Java est un peu rouillé.
````
