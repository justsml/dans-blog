# Translation Candidate
- Slug: quiz-css-core-fundamentals
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-08--quiz-css-core-fundamentals/fr/index.mdx
- Validation: deferred
- Runtime seconds: 97.07
- Input tokens: 11367
- Output tokens: 10658
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003467
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz : Connaissez-vous les fondamentaux de CSS ? (2025)'
subTitle: Êtes-vous front-end ?
label: CSS Fundamentals
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
date: '2024-11-08'
modified: '2024-11-10'
tags:
  - quiz
  - intro
  - css
  - styles
  - beginner
  - intermediate
cover_full_width: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-wide.webp
cover_mobile: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
cover_icon: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Quiz : Connaissez-vous le CSS ?

* CSS moderne ? 🤔  
* **Le CSS mérite-t-il d’être sur _votre_ CV ???** 🚀  
* Choix multiples. 🤖 ... _Ça peut être si difficile que ça, hein ?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Échauffement : Polices"
  title="Unité CSS invalide pour la taille de police"
  options={[
    {text: '10cx', isAnswer: true},
    {text: '10mm'},
    {text: '10pt'},
    {text: '10px'},
    {text: '10vmin'},
  ]}
>
  <slot name="question">
  <div className="question">
    Sélectionnez l'<em class="highlight">UNIQUEMENT INVALIDE</em> ❌ `font-size`:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `10cx` est incorrect car `cx` n'est pas une unité CSS réelle. (Du moins au moment de la rédaction.)

    Les unités populaires incluent les familières `px`, `rem`, `em`.

    Les unités plus récentes sont utiles pour les mises en page dynamiques et adaptatives.

    - `ch` - largeur du caractère `0`
    - `vmin` - minimum de la viewport
    - `vmax` - maximum de la viewport
    - `vh` - hauteur de la viewport
    - `vw` - largeur de la viewport

    Il existe aussi plusieurs unités qui ont toujours existé mais sont rarement utilisées, comme `cm` pour les centimètres, `mm`, `in` pour les pouces, `pt` pour les points
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Échauffement : Couleurs"
  title="Codes hexadécimaux"
  options={[
    {text: '#A'},
    {text: '#AB'},
    {text: '#ABCD', isAnswer: true},
    {text: '#ABCDE'},
  ]}
>
  <slot name="question">
  <div className="question">
    Pouvez-vous repérer le <em class="highlight">UN</em> code hexadécimal valide 👍 ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les codes hexadécimaux servent à représenter des couleurs en CSS. Ils commencent par un `#` et doivent contenir 3, 4, 6 ou 8 chiffres hexadécimaux.

    Le code à 3 caractères est une abréviation du code à 6 caractères, où chaque caractère est répété. Le code à 4 caractères inclut un canal alpha pour la transparence.

    Par exemple `#ABC` est équivalent à `#AABBCC`, et `#ABCD` correspond à `#AABBCCDD`. Pour en savoir plus sur les valeurs hexadécimales, consultez mon [quiz sur les nombres en JavaScript.](/quiz-can-you-count-to-bigint/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Échauffement : Unités"
  title="Oops, toutes les unités !"
  options={[
    {text: 'em'},
    {text: 'rem'},
    {text: 'cm'},
    {text: 'mm'},
    {text: 'in'},
    {text: 'pt'},
    {text: 'pc'},
    {text: 'px'},
    {text: 'ex'},
    {text: 'ch'},
    {text: 'vmin'},
    {text: 'vmax'},
    {text: 'vh'},
    {text: 'rel', isAnswer: true, hint: 'Pas une unité CSS valide !'},
    {text: 'vw'},
  ]}
>
  <slot name="question">
  <div className="question">
    Laquelle de ces unités n'est <em class="highlight">pas</em> une unité CSS valide ❌ ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les nouvelles unités comme `ch`, `vmin`, `vmax`, `vh`, `vw` sont très utiles pour les mises en page dynamiques/réactives.

    Il existe aussi plusieurs unités obsolètes ou peu utilisées, comme `cm` pour les centimètres, `mm`, `in` pour les pouces, `pt` pour les points, `pc`, `cap` pour la taille des lettres majuscules, et `ex` qui correspond à la hauteur de la lettre `x`.

    Les unités populaires incluent `px` pour les pixels, `em` relatif à la taille de police de l'élément, et `rem` qui fait référence à la taille de police de l'élément racine (le nom est un clin d'œil à la chanson R.E.M. des années 90, mais ce n'est pas réellement lié à la musique).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Sélecteur : Fondamentaux"
  title="Correspondance des sélecteurs à des éléments HTML"
  options={[
    {text: '#Home', hint: 'Attention à la casse : CSS est sensible à la casse.'},
    {text: 'a [id=\'home\']', hint: 'Espace non valide : implique un élément enfant.'},
    {text: 'a:contains(home)', hint: 'Pseudo-classe non standard : CSS ne supporte pas `:contains()`.'},
    {text: 'a#home[name=\'home\']', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel sélecteur correspond le mieux au HTML suivant ?
    ```html
          <a id="home" name="home" href="/home">Home</a>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La bonne réponse est `a#home[name='home']`, qui correspond aux attributs `id` et `name`. CSS est sensible à la casse, donc `#Home` échouerait. L'espace dans `a [id='home']` implique un élément enfant, ce qui n'est pas applicable ici.

    La pseudo-classe `:contains()` n'est pas standard en CSS, mais existe dans certains frameworks JS.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Sélecteur : Fondamentaux"
  title="Sélecteur d'attribut pour un bouton"
  options={[
    {text: 'button:link', hint: 'Correspond aux liens non visités avec href'},
    {text: 'button::click', hint: 'Pseudo-élément invalide en CSS'},
    {text: 'button:focus', hint: 'Correspond aux éléments en focus'},
    {text: 'button[onclick]', isAnswer: true, hint: 'Sélectionne les boutons avec attribut onclick'},
    {text: 'button[on-click]', hint: 'Syntaxe incorrecte pour les attributs'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel sélecteur correspond au bouton HTML suivant ?
    ```html
          <button onclick="openModal()">Contact</button>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La bonne réponse est `button[onclick]`, qui cible l'existence de l'attribut `onclick`.

    Notez que `:link` ne s'applique qu'aux liens non visités avec `href`, `::click` n'est pas un pseudo-élément valide, et `:focus` ne cible que les éléments en focus.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Sélecteur : Bases"
  title="Sélecteur CSS invalide"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Laquelle de ces sélecteurs est invalide ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le sélecteur `c > > d {}` est invalide car le combinateur d'enfant est répété sans sélecteur entre les deux caractères `>`.

    Les autres sélecteurs sont valides. Un sélecteur de type comme `c {}` est syntaxiquement valide en CSS même si `c` n'est pas un élément HTML standard.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Sélecteur : Bases"
  title="Sélectionner le dernier lien"
  options={[
    {text: 'a :nth-child(3)'},
    {text: 'a:last-item'},
    {text: 'nav:last-of-type(a)'},
    {text: 'nav:nth-child(3)'},
    {text: 'a:last-child', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel sélecteur correspond au dernier lien dans le HTML suivant ?
    ```html
          <nav>
            <a name="home" href="/home">Home</a>
            <a name="login" href="/login">Login</a>
            <a name="help" href="/help">Help</a>
          </nav>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le sélecteur correct est `a:last-child`, qui correspond au dernier `<a>` lorsqu'il est également le dernier enfant de son parent. `nav:nth-child(3)` correspondrait à un élément `<nav>` qui est le troisième enfant de son propre parent.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Sélecteur : Spécificité"
  title="Priorité des sélecteurs"
  options={[
    {text: 'main article section blockquote a'},
    {text: 'blockquote a'},
    {text: 'a#quote', isAnswer: true},
    {text: 'a.quote'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel sélecteur prévaudra ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le sélecteur `a#quote` prévaut en raison de l'ID, qui a une spécificité plus élevée que les sélecteurs basés sur les balises ou les classes.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Mise en page : Centrage"
  title="Centrer le texte dans un élément bloc"
  options={[
    {text: 'align: center;'},
    {text: 'margin: 0 auto;'},
    {text: 'align-content: center;'},
    {text: 'text-align: center;', isAnswer: true},
    {text: 'text-content: center;'},
  ]}
>
  <slot name="question">
  <div className="question">
    Comment pouvez-vous centrer « shit » dans une boîte ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En utilisant `text-align: center;` est la méthode correcte pour centrer le texte dans un élément bloc. Les propriétés `align` sont utilisées pour les mises en page Flexbox, et `margin: 0 auto;` permet de centrer horizontalement les éléments bloc.

    La propriété `align-content` est utilisée pour les mises en page Grid, et `text-content` n'est pas une propriété CSS valide.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Mise en page : Centrage"
  title="Centrer un élément bloc verticalement"
  options={[
    {text: 'align-items: center;'},
    {text: 'justify-content: center;'},
    {text: 'align-content: center;', isAnswer: true},
    {text: 'margin: auto;'},
    {text: 'margin: 0 auto;'},
  ]}
>
  <slot name="question">
  <div className="question">
    Comment centrer le contenu verticalement à l'intérieur d'un conteneur bloc dans une mise en page fluide moderne ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Utiliser `align-content` est la méthode moderne pour centrer le contenu d'un conteneur bloc verticalement dans une mise en page fluide.

    Les propriétés `align-items` et `justify-content` sont utilisées pour les mises en page flexbox et grid, mais pas pour la mise en page fluide.

    Les deux `margin: 0 auto;` et `margin: auto;` centrent un élément bloc horizontalement, mais pas verticalement.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Mise en page : Unités"
  title="Calcul de la taille en pixels des tailles de police imbriquées"
  options={[
    {text: '!40px'},
    {text: '5px', isAnswer: true},
    {text: '20px'},
    {text: '25px'},
    {text: '40px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est la taille en pixels du texte du lien `<a>` dans le HTML suivant ?
    ```html
          <body style="font-size: 40px !important;">
            <nav style="font-size: 50%;">
              <a style="font-size: 25%;">HOME</a>
            </nav>
          </body>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La taille `font-size` pour `<a>` se calcule comme suit : 40px (corps) * 50% (nav) = 20px, puis 20px * 25% = 5px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Unités : REM"
  title="Calculer la taille en pixels avec les unités REM"
  options={[
    {text: '10px'},
    {text: '12px', isAnswer: true},
    {text: '14px'},
    {text: '20px'},
    {text: '24px'},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle sera la taille en pixels de `1.2rem` pour le lien "HOME" dans le HTML suivant ?
    ```html
          <html style="font-size: 10px;">
            <body style="font-size: 20px;">
              <a style="font-size: 1.2rem;">HOME</a>
            </body>
          </html>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `1.2rem` correspond à 12px car les unités `rem` font référence à la taille de police de la racine ou de l'élément `<html>`, définie ici à 10px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Unités : EM"
  title="Calcul de la taille en pixels avec les EM"
  options={[
    {text: '10px'},
    {text: '12px'},
    {text: '14px'},
    {text: '20px'},
    {text: '24px', isAnswer: true},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Comme dans la question précédente, quelle sera la taille en pixels de `1.2em` pour le lien "HOME" dans le HTML suivant ?
    ```html
          <html style="font-size: 10px;">
            <body style="font-size: 20px;">
              <a style="font-size: 1.2em;">HOME</a>
            </body>
          </html>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `1.2em` correspond à 24px car les unités em font référence à la taille de police héritée, fixée ici à 20px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Sélecteur : Spécificité"
  title="Sélecteurs à Spécificité Nulle"
  options={[
    {text: ':where(.card) .title', isAnswer: true},
    {text: '.card .title'},
    {text: ':is(.card) .title'},
    {text: '#card .title'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel sélecteur a la spécificité la plus faible ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `:where(.card) .title` a la spécificité la plus faible. Le pseudo-sélecteur `:where()` et tout ce qu'il contient contribue `0-0-0`, donc seul `.title` compte. `:is(.card) .title` conserve la spécificité de `.card`, `.card .title` contient deux classes, et `#card .title` inclut un ID.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
