---
title:  "AngularJS Tricks"
subTitle: AngularJS CAN BE Fun!
date: 2015-02-26
modified: 2016-02-01
category: Code
subCategory: angularjs
tags: [angularjs, development, performance, programming]
cover: sharon-mccutcheon-522851-unsplash.jpg
cover_mobile: w300_sharon-mccutcheon-522851-unsplash.jpg
cover_tablet: w600_sharon-mccutcheon-522851-unsplash.jpg
cover_desktop: w900_sharon-mccutcheon-522851-unsplash.jpg
cover_icon: icon_sharon-mccutcheon-522851-unsplash.jpg

---

## AngularJS CAN BE Fun!

> For: AngularJS v1.x

1.  AngularJS Developers quickly discover that their med-large apps are buckling under the weight of scattered `$watch's` and the often bloated crutch known as `$scope`.
2.  Keep your `$scope` free of excess UI state, try limit the size & depth of your overall hierarchy.

### 2-way data binding: 2-way Sword

2-way binding alone makes coming from other frameworks like Backbone, well, **frickin amazeballs**.

The problem is: many sites **chronically overuse** Angular's design patterns.
This leads to directive sprawl and a `$scope/rootScope` which easily has 1000's of instances, and can cling to huge objects preventing any hope of effective garbage collection.

You know where this is going: an exhausted browser! Forever doomed to work at a **frantic pace** executing endless and redundant UI/DOM re-compiles.

### Stop OVER-Angular.JSification

> “If your only tool is a hammer, then every problem looks like a nail.”
>
> - old adage

Does your app have a problem with directives?

```jade
current-user-status-label
  div(ng-if='loggedIn')
    view-user-surplusage(ng-if='!editMode')
      .head: contact-details(user='user')
      .tool: contact-buttons(loggedIn='loggedIn')
      a.edit-icon(ng-click='editMode = true')
    edit-user-surplusage(ng-if='editMode')
      .head: avatar-edit(user='user')
      .body: edit-contact-details(user='user')
      a.save-icon(ng-click='editMode = false')
```

Let's design a flexible user-widget which helps:

1.  Versatile componentization w/ DRY Angular code
1.  Understandable directives, with minimal directive size/depth (mind your ng-repeats)
1.  Simple Service Layer
1.  Little actual coding to implement - just HTML/View Code

```jade
// jade
user-widget
  div(ng-if='loggedIn')
    div.edit(ng-if='editMode')
      h4.email-icon: input(type='email', ng-model='user.email')
      h4.phone-icon: input(type='email', ng-model='user.phone')
      a.save-icon(ng-click='editMode = false')
    div.show(ng-if='!editMode')
      h1.users-icon {{ user.name  }}
      h4.email-icon {{ user.email }}
      h4.phone-icon {{ user.phone }}
      a.edit-icon(ng-click='editMode = true')
  div(ng-if='!loggedIn')
    h5: i Welcome User
    a.btn(href='/login') Login
```

## Solutions

### Angular Tips

1.  Use 1-way binding ( e.g. `{ :: title }` )
1.  Limit recursive nesting of directives
1.  And if you must nest directives, _NEVER_ do so inside an `ng-repeat` - Performance will start to mirror something like `O(n^2)^3` ;)
    I. Use native JS/DOM code in a factory pattern to create basic DOM/UI fragments, examples: Modal msg box, status bar. Call UI factories from either directives or controllers.
1.  _Bonus:_ Understand cost and triggers of [browser render lifecycle](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=en): animation, composite rendering, reflows

### Use Browserify to Organize Project

Not specifically for Angular per-se, but essential for simple dependency resolution.

[Browserify](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) makes JS projects managable with virtually no added code overhead (ok, a few 100 chars).

[Just read this section](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) of the [Browserify Handbook](https://github.com/substack/browserify-handbook/).

## Alternatives

### [ReactJS](https://facebook.github.io/react/) from Facebook

If you have tons of small reusable UI components - ReactJS might be a better choice:

- If your project...?:
  - Has a different philosophy to UI/DOM implementation than Angular
  - Already has some kind of 'framework' - You can **use ReactJS alongside** AngularJS, Ember, Backbone. (Avoid if possible though).
  - Handles frequent data model changes in it's own code, you'll benefit by avoiding the ADHD-nature of digest/loop pattern in Angular

### [Polymer Project](http://www.Polymer-Project.org/) from Google

### Pure-er JS Approach

- By the way, here's where I try create framework agnostic code (+1 testability, +1 reuse)
  1.  Use plain javascript class to load data (AJAX/JSONP/Embedded in page, et al.)
  1.  Use mustache templating to create HTML strings (or DOM directly)
  1.  Cache rendered content in localStorage if you can
  1.  (Optional) Now add an event listener to re-render the content. I have standardized on the event name `refresh.<class-name>`
