# Translation Candidate
- Slug: higher-order-programming
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-10-05--higher-order-programming/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 1.61
- Input tokens: 2071
- Output tokens: 704
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.000207
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug higher-order-programming --locale de
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Programmierung höherer Ordnung
subTitle: Erkundung von Pipeline‑Techniken mit Arrays und Sets
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
## Explorationvon Array‑ und Mengen‑basierten Pipeline‑Techniken

### Ein Anti‑Pattern?

Dies ist eine Untersuchung der Vorteile, die entstehen, wenn Sie **alles als Array codieren**. (Unter Verwendung von Jedi‑Konzepte aus SmallTalk)

Hier ein paar Leitprinzipien:

1.  Alle Eingaben sind array‑ähnlich. Selbst ein Array mit 1.
2.  Höher‑stufige Funktionen sollten im Allgemeinen **Arrays akzeptieren UND zurückgeben**. (Ausgenommen Callback‑Methoden für Schleifen: map/reduce/each/filter)
3.  99 von 100 Entwicklern leiden unter dem, was ich `akutes Schema‑Surplusage`‑Syndrom nenne.
4.  Vorsicht vor aufgeblähten `class‑backed models` – mit all den vorhersehbaren Fallstricken: fragiler `instance state` mit unzähligen Hebeln und Knöpfen zum Herumspielen, DB‑Transaktionen, SQL‑Locks, async/mutexing (das immer beim ersten Mal funktioniert), idiomatischen `property getter/setters`, und Ihr Einsatz von `public/private/final/etc` ist doch solide, oder?

5.  Also lassen Sie mich ein gängiges Problem nehmen und _shoehorn_ ~~~add~~~ einige mengen‑basierte Überlegungen einbauen.
6.  Eine hypothetische Blog‑Seite hat viele Articles und noch mehr Posts (Comments).
7.  Wir fügen eine `delete`‑Methode (unten) hinzu – mit Unterstützung sowohl für einzelne als auch für Arrays.

```javapackage net.danlevy.why.java___why.you.got.all.the.dots____it.must.be.all.the.factories;

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

> Entschuldigen Sie, wenn mein Java ein wenig rostig ist.
````
