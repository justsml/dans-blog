---
title:  "Higher Order Programming"
date: 2015-09-22
modified: 2024-07-30
category: Code
subCategory: programming
tags: [programming, patterns, models, source code, organization]
cover: susan-holt-simpson-799094-unsplash.jpg
cover_mobile: w300_susan-holt-simpson-799094-unsplash.jpg
cover_tablet: w600_susan-holt-simpson-799094-unsplash.jpg
cover_desktop: w900_susan-holt-simpson-799094-unsplash.jpg
cover_icon: icon_susan-holt-simpson-799094-unsplash.jpg
---

## Exploring Array- and Set-based Pipeline Techniques

### An Anti-Pattern?

This is an exploration of advantages gained when you **code everything as an array.** (Using Jedi concepts from SmallTalk)

Here's some guiding principles:

1.  All input is array-like. Even if an array of 1.
1.  Higher level functions should generally accept AND return arrays. (Except for callback methods for loops: map/reduce/each/filter)
1.  99 out of 100 devs code suffers from what I call `acute schema surplusage` syndrome.
1.  Beware bloated `class-backed models` - with all the predictable trappings: fragile `instance state` w/ so many levers and knobs to mess with, DB transactions, sql locks, async/mutexing (that always works first time), using idiomatic `property getter/setters`, and your `public/private/final/etc` usage is solid, right?

1.  So let me take a common problem and _shoehorn_ ~~~add~~~ some set-based musings.
1.  A hypothetical Blog Site has lots of Articles, and has even more Posts (Comments).
1.  Let's add a `delete` method (below) - but with support for both singular OR arrays.

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

> Forgive me if my Java is a little rusty.

<!-- ![schema refactor][schema_refactor] -->

[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif
[not_a_fan]: https://res.cloudinary.com/ddd/image/upload/timeout-expired.gif
[teamwork]: https://res.cloudinary.com/ddd/image/upload/teamwork__tumblr_n2df80cPZa1s373hwo1_400_ghv4xn.gif
[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
[new_feature]: https://res.cloudinary.com/ddd/image/upload/simba-toss-error.gif
[drinking]: https://res.cloudinary.com/ddd/image/upload/v1442175801/system-maint-anon.gif
[cat_outfit]: https://res.cloudinary.com/ddd/image/upload/v1441143858/cat-bee-fail.gif
[cat_loops]: https://res.cloudinary.com/ddd/image/upload/v1441143869/cat-loops.gif
[cat_bowl]: https://res.cloudinary.com/ddd/image/upload/v1441143883/kitten_bowl.gif
[cat_wtf]: https://res.cloudinary.com/ddd/image/upload/v1441143878/cat-wtf.gif
[endless_loop]: https://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif
