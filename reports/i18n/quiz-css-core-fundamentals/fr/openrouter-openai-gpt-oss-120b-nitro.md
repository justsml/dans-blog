# Translation Candidate
- Slug: quiz-css-core-fundamentals
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-08--quiz-css-core-fundamentals/fr/index.mdx
- Validation: passed
- Runtime seconds: 26.88
- Input tokens: 12328
- Output tokens: 7368
- Thinking tokens: unknown
- Cached input tokens: 3200
- Cache write tokens: 0
- Estimated cost: $0.001807
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz : Connaissez‑vous les bases du CSS ? (2025)'
subTitle: Êtes‑vous assez front‑end ?
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


## Quiz : Connaissez‑vous le CSS ?

* CSS moderne ? 🤔  
* **Le CSS mérite‑t‑il une place sur *votre* CV ???** 🚀  
* Choix multiples. 🤖 … _À quel point cela peut‑il être difficile, hein ?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Échauffement : Polices"
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
    Sélectionnez le <em class="highlight">UN INVALIDE</em> ❌ `font-size` :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `10cx` est incorrect car `cx` n'est pas une unité CSS réelle. (Du moins au moment de la rédaction.)

    Les unités populaires incluent les familières `px`, `rem`, `em`.

    Les unités plus récentes sont utiles pour des mises en page dynamiques et réactives.

    - `ch` - largeur du caractère `0`
    - `vmin` - minimum du viewport
    - `vmax` - maximum du viewport
    - `vh` - hauteur du viewport
    - `vw` - largeur du viewport

    Il existe également plusieurs unités qui existent depuis toujours mais sont rarement utilisées, comme `cm` pour les centimètres, `mm`, `in` pour les pouces, `pt` pour les points
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Échauffement : Couleurs"
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
    Pouvez‑vous repérer le <em class="highlight">UNIQUE</em> code hex valide 👍 ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les codes hexadécimaux peuvent être utilisés pour représenter des couleurs en CSS. Ils sont précédés d’un `#` et doivent contenir 3, 4, 6 ou 8 chiffres hexadécimaux.

    Le code hex de 3 caractères est une forme courte du code de 6 caractères, chaque caractère étant répété. Le code de 4 caractères inclut un canal alpha pour la transparence.

    Par exemple `#ABC` équivaut à `#AABBCC`, et `#ABCD` équivaut à `#AABBCCDD`. Pour en savoir plus sur la gestion des valeurs hex, consultez mon [quiz sur les nombres JavaScript.](/quiz-can-you-count-to-bigint/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Échauffement : Unités"
  title="Oups, toutes les unités !"
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
    {text: 'rel', isAnswer: true},
    {text: 'vw'},
  ]}
>
  <slot name="question">
  <div className="question">
    Lequel de ces unités <em class="highlight">N'EST PAS</em> une unité CSS valide ❌ ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les nouvelles unités comme `ch`, `vmin`, `vmax`, `vh`, `vw` sont très utiles pour les mises en page dynamiques/réactives.

    Il existe aussi plusieurs unités qui existent depuis toujours mais sont rarement utilisées, comme `cm` pour les centimètres, `mm`, `in` pour les pouces, `pt` pour les points, `pc`, `cap` pour la taille des lettres capitales, et `ex` qui correspond à la hauteur de la lettre `x`.

    Les unités populaires incluent le familier `px` pour les pixels, `em` relatif à la taille de police de l'élément, et `rem` qui est secrètement un hommage au groupe oublié des années 90 R.E.M. (bon, pas vraiment, c’est juste une unité `em` relative qui référence l’élément racine).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Sélecteur : Fondamentaux"
  title="Faire correspondre les sélecteurs aux éléments HTML"
  options={[
    {text: '#Home'},
    {text: 'a [id=\'home\']'},
    {text: 'a:contains(home)'},
    {text: 'a#home[name=\'home\']', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel sélecteur correspond le mieux au HTML suivant ?
    ```html
    <a id="home" name="home" href="/home">Home</a>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La bonne réponse est `a#home[name='home']`, qui correspond à la fois aux attributs `id` et `name`. Les sélecteurs CSS sont sensibles à la casse, donc `#Home` ne fonctionnerait pas, et les espaces impliquent des éléments enfants, ce qui ne s'applique pas ici.

    Le sélecteur `:contains()` n'est pas un sélecteur CSS standard, mais il est disponible dans certaines bibliothèques JS.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Sélecteur : Fondamentaux"
  title="Sélecteur d'attribut pour un bouton"
  options={[
    {text: 'button:link'},
    {text: 'button::click'},
    {text: 'button:focus'},
    {text: 'button[onclick]', isAnswer: true},
    {text: 'button[on-click]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel sélecteur correspond au bouton HTML suivant ?
    ```html
    <button onclick="openModal()">Contact</button>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La bonne réponse est `button[onclick]`, qui cible la présence de l'attribut `onclick`.

    Notez que `:link` ne cible que les liens `href` non visités, `::click` n'est pas un pseudo‑élément valide, et `:focus` ne cible que l'élément ayant le focus.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Sélecteur : Fondamentaux"
  title="Sélecteur CSS invalide"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Lequel de ces sélecteurs est invalide ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le sélecteur `c > > d {}` est invalide car le combinateur enfant est répété sans sélecteur entre les deux caractères `>`.

    Les autres sélecteurs sont valides. Un sélecteur de type comme `c {}` est syntaxiquement du CSS valide même si `c` n’est pas un élément HTML standard.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Sélecteur : Fondamentaux"
  title="Sélection du dernier lien"
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
    Quel sélecteur correspond au dernier lien dans le HTML suivant ?
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
  group="Sélecteur : Spécificité"
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
    Quel sélecteur aura la priorité ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le sélecteur `a#quote` a la priorité car l’ID possède une spécificité plus élevée que les sélecteurs basés sur les balises ou les classes.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Mises en page : centrage"
  title="Centrer du texte dans un élément bloc"
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
    Comment centrer "shit" dans une boîte ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Utiliser `text-align: center;` est la bonne façon de centrer du texte dans un élément bloc. Les propriétés `align` sont utilisées pour les mises en page flexbox, et `margin: 0 auto;` sert à centrer horizontalement les éléments bloc.

    La propriété `align-content` est utilisée pour les mises en page grid, et `text-content` n’est pas une propriété CSS valide.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Mises en page : centrage"
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
    Comment centrer le contenu verticalement à l'intérieur d'un conteneur bloc en utilisant la mise en page de flux moderne ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Utiliser `align-content` est la méthode moderne pour centrer verticalement le contenu d'un conteneur bloc en mise en page de flux.

    Les propriétés `align-items` et `justify-content` sont utilisées pour les mises en page flexbox et grid, mais pas pour le flux.

    `margin: 0 auto;` et `margin: auto;` centrent un élément bloc horizontalement, mais pas verticalement.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Mises en page : unités"
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
    Quelle est la taille en pixels du texte du lien `<a>` dans le HTML suivant ?
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
    La `font-size` de `<a>` se calcule à 5 px : 40 px (body) × 50 % (nav) = 20 px, puis 20 px × 25 % = 5 px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Unités : REM"
  title="Calcul de la taille en pixels avec les REM"
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
    Quelle sera la taille en pixels de `1.2rem` pour le lien "HOME" dans le HTML suivant ?
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
    `1.2rem` correspond à 12 px car les unités `rem` se réfèrent à la taille de police racine ou de `<html>`, définie ici à 10 px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Unités : EM"
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
    Comme dans la question précédente, quelle sera la taille en pixels de `1.2em` pour le lien "HOME" dans le HTML suivant ?
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
    `1.2em` correspond à 24 px car les unités `em` se réfèrent à la taille de police héritée, fixée ici à 20 px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Sélecteur : Spécificité"
  title="Sélecteurs à spécificité nulle"
  options={[
    {text: ':where(.card) .title', isAnswer: true},
    {text: '.card .title'},
    {text: ':is(.card) .title'},
    {text: '#card .title'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel sélecteur a la spécificité la plus basse ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `:where(.card) .title` a la spécificité la plus basse. La pseudo‑classe `:where()` et tout ce qu’elle contient contribue `0-0-0`, donc seul `.title` compte. `:is(.card) .title` conserve la spécificité de `.card`, `.card .title` possède deux classes, et `#card .title` inclut un ID.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
