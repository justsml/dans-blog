# Translation Candidate
- Slug: quiz-css-core-fundamentals
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-08--quiz-css-core-fundamentals/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 33.61
- Input tokens: 11287
- Output tokens: 11867
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003751
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug quiz-css-core-fundamentals --locale fr
## Raw Output

````mdx
---
unlisted: false
title: ''
subTitle: Es-tu assez front-end ?
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
```jsx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Quiz : Connaissez-vous le CSS ?

* CSS moderne ? 🤔  
* **Le CSS mérite-t-il d’être sur _votre_ CV ???** 🚀  
* Choix multiples. 🤖 ... _Ça peut être difficile, hein ?_
```

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
    `10cx` est incorrect car `cx` n'est pas une unité CSS réelle. (Au moins pour le moment.)

    Les unités populaires incluent les familières `px`, `rem`, `em`.

    Les unités plus récentes sont utiles pour les maquettes dynamiques et réactives.

    - `ch` - largeur du caractère `0`
    - `vmin` - viewport minimum
    - `vmax` - viewport maximum
    - `vh` - hauteur du viewport
    - `vw` - largeur du viewport

    Il existe aussi plusieurs unités toujours présentes mais rarement utilisées, comme `cm` pour les centimètres, `mm`, `in` pour les pouces, `pt` pour les points
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
    Les codes hexadécimaux peuvent être utilisés pour représenter des couleurs en CSS. Ils sont préfixés par un `#` et doivent contenir 3, 4, 6 ou 8 chiffres hexadécimaux.

    Le code hexadécimal à 3 caractères est une abréviation du code à 6 caractères, où chaque caractère est répété. Le code à 4 caractères inclut un canal alpha pour la transparence.

    Par exemple, `#ABC` est identique à `#AABBCC`, et `#ABCD` est identique à `#AABBCCDD`. Pour en savoir plus sur la manipulation des valeurs hexadécimales, consultez [mon quiz sur les nombres JavaScript.](/quiz-can-you-count-to-bigint/)
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
    {text: 'rel', isAnswer: true},
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
    Des unités modernes comme `ch`, `vmin`, `vmax`, `vh`, `vw` sont très utiles pour les maquettes dynamiques/réactives.

    Il existe aussi des unités plus anciennes mais peu utilisées, comme `cm` pour les centimètres, `mm`, `in` pour les pouces, `pt` pour les points, `pc`, `cap` pour la taille des majuscules, et `ex` qui correspond à la hauteur de la lettre `x`.

    Les unités populaires incluent `px` pour les pixels, `em` relatif à la taille de police de l'élément, et `rem` qui est secrètement un hommage au groupe oublié des années 90 R.E.M. (non, vraiment pas, c'est juste une unité `em` relative liée à l'élément racine).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Sélecteur : Fondamentaux"
  title="Correspondance des sélecteurs avec les éléments HTML"
  options={[
    {text: '#Home'},
    {text: 'a [id=\'home\']'},
    {text: 'a:contains(home)'},
    {text: 'a#home[name=\'home\']', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel sélecteur correspond le mieux à l'HTML suivant ?
    ```html
    <a id="home" name="home" href="/home">Home</a>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La bonne réponse est `a#home[name='home']`, qui correspond aux attributs `id` et `name`. Les sélecteurs CSS sont sensibles à la casse, donc `#Home` ne fonctionnerait pas, et les espaces impliquent des éléments enfants, ce qui n'est pas applicable ici.

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
    Quel sélecteur correspond au bouton HTML suivant ?
    ```html
    <button onclick="openModal()">Contact</button>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La bonne réponse est `button[onclick]`, qui cible l'existence de l'attribut `onclick`.

    Notez que `:link` ne cible que les liens `href` non visités, `::click` n'est pas un pseudo-élément valide, et `:focus` cible uniquement l'élément mis en surbrillance.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Sélecteur : Fondamentaux"
  title="Sélecteur CSS invalide"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Lequel de ces sélecteurs est invalide ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le sélecteur `c > > d {}` est invalide car le combinateur enfant est répété sans sélecteur entre les deux caractères `>`.

    Les autres sélecteurs sont valides. Un sélecteur de type comme `c {}` est syntaxiquement valide en CSS même si `c` n'est pas un élément HTML standard.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Sélecteur : Fondamentaux"
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
    Le sélecteur correct est `a:last-child`, qui correspond au dernier `<a>` lorsqu'il est également le dernier enfant de son parent. Le sélecteur `nav:nth-child(3)` correspondrait à un élément `<nav>` qui est le troisième enfant de son propre parent.
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
    Le sélecteur `a#quote` prévaudra en raison de l'ID, qui a une spécificité plus élevée que les sélecteurs basés sur les balises ou les classes.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Mise en page : Centrage"
  title="Centrer le texte dans un élément de bloc"
  options={[
    {text: 'align: center;'},
    {text: 'margin: 0 auto;'},
    {text: 'align-content: center;'},
    {text: 'text-align: center;', isAnswer: true, hint: 'Propriété CSS correcte pour centrer le texte dans un élément de bloc.'},
    {text: 'text-content: center;'},
  ]}
>
  <slot name="question">
  <div className="question">
    Comment centrer le 'merdier' dans une boîte ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Utiliser `text-align: center;` est la bonne méthode pour centrer le texte dans un élément de bloc. Les propriétés `align` sont dédiées aux mises en page flexbox, et `margin: 0 auto;` permet de centrer horizontalement un élément de bloc.

    La propriété `align-content` est réservée aux mises en page grid, et `text-content` n'est pas une propriété CSS valide.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Mise en page : Centrage"
  title="Centrer un élément de bloc verticalement"
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
    Comment centrer le contenu verticalement à l'intérieur d'un conteneur de bloc dans une mise en page flow moderne ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'utilisation de `align-content` est la méthode moderne pour centrer le contenu d'un conteneur de bloc verticalement dans une mise en page flow.

    Les propriétés `align-items` et `justify-content` sont utilisées pour les mises en page flexbox et grid, mais pas pour le flow.

    Les deux `margin: 0 auto;` et `margin: auto;` centrent un élément de bloc horizontalement, mais pas verticalement.
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
    La taille de police `font-size` pour `<a>` se calcule comme suit : 40px (corps) * 50% (nav) = 20px, puis 20px * 25% = 5px.
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
    `1.2rem` correspond à 12px car les unités `rem` font référence à la taille de police racine ou `<html>`, définie ici à 10px.
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
    `1.2em` correspond à 24px car les unités `em` font référence à la taille de police héritée, fixée ici à 20px.
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
    `:where(.card) .title` a la spécificité la plus faible. La pseudo-classe `:where()` et tout ce qu'elle contient contribue à `0-0-0`, donc seul `.title` compte. `:is(.card) .title` conserve la spécificité de `.card`, `.card .title` comporte deux classes, et `#card .title` inclut un ID.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
