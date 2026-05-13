# Translation Candidate
- Slug: higher-order-programming
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-10-05--higher-order-programming/de/index.mdx
- Validation: passed
- Runtime seconds: 4.62
- Input tokens: 1908
- Output tokens: 1824
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000590
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Höhere Ordnung Programmierung
subTitle: Untersuchung von Array- und Set-basierten Pipeline-Techniken
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
## Untersuchung von array- und mengenbasierten Pipeline-Techniken

### Ein Anti-Muster?

Dies ist eine Untersuchung der Vorteile, die entstehen, wenn Sie **alles als Array programmieren**. (Mit Jedi-Konzepten aus SmallTalk)

Hier sind einige Leitlinien:

1. Alle Eingaben sind array-ähnlich. Selbst wenn es sich um ein Array mit nur einem Element handelt.
1. Höhere Funktionen sollten generell Arrays akzeptieren **und** zurückgeben. (Ausgenommen Callback-Methoden für Schleifen: map/reduce/each/filter)
1. 99 von 100 Entwicklern leiden unter dem, was ich `akutes Schema-Überfluss-Syndrom` nenne.
1. Vorsicht vor aufgeblähten `klassenbasierten Modellen` – mit all den vorhersehbaren Begleiterscheinungen: fragilen `Instanzzuständen` mit so vielen Hebeln und Drehknöpfen, die man versehentlich verstellen kann, Datenbanktransaktionen, SQL-Sperren, asynchroner/mutexierter Programmierung (die immer beim ersten Mal funktioniert), Verwendung idiomatischer `Property-Getter/Setter` und Ihre Anwendung von `public/private/final/etc` ist doch sicherlich sinnvoll, oder?

1. Lassen Sie mich ein gängiges Problem nehmen und ~~~hinzufügen~~~ ein wenig mengenbasierte Überlegungen einfügen.
1. Eine hypothetische Blog-Website hat viele Artikel und noch mehr Beiträge (Kommentare).
1. Fügen wir eine `delete`-Methode hinzu (siehe unten) – mit Unterstützung für Einzelobjekte **oder** Arrays.

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

  // Post.delete` kann mit einem einzelnen Post oder einem Array von Post[] aufgerufen werden
  public static int delete(Post post) {
    List<Post> posts = new List<Post>(post);
    return delete(posts)
  }

  public static int delete(List<Post> posts) {
    return posts.map(Dao.remove);
  }
}
```

> Verzeihen Sie mir, wenn meine Java-Kenntnisse etwas rostig sind.
````
