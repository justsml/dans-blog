# Translation Candidate
- Slug: quiz-master-modern-html5
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-01--quiz-master-modern-html5/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 37.79
- Input tokens: 11247
- Output tokens: 11019
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.003544
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug quiz-master-modern-html5 --locale fr
## Raw Output

````mdx
---
unlisted: false
title: ''
subTitle: Montre ce que tu vaux !
label: Semantic HTML5
social_image: ../desktop-social.webp
category: Quiz
subCategory: HTML
date: '2024-10-31'
modified: '2024-11-06'
tags:
  - quiz
  - web
  - quiz
  - semantic
  - html5
  - web
  - beginner
  - intermediate
cover_full_width: ../jakob-owens-FBih1nqPi0w-unsplash-wide.webp
cover_mobile: ../jakob-owens-FBih1nqPi0w-unsplash-square.webp
cover_icon: ../jakob-owens-FBih1nqPi0w-unsplash-square.webp
---
```mdx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Alors, vous croyez maîtriser HTML5 ?

Vous savez distinguer `<div>` de `<span>`, c'est bien. Mais à quel point connaissez-vous les éléments sémantiques avancés d'HTML5 ?

> Note : Si vous ne réussissez pas ce test, vous êtes légalement tenu de retirer « Compétences HTML » de votre CV.

### Commencez !
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Échauffement"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le rôle principal de l'élément `<ul>` en HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'élément `<ul>` permet de créer une liste non ordonnée, dont les éléments sont généralement marqués par des puces.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="HTML sémantique avancé"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le rôle de l'élément `<dd>` en HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'[élément `<dd>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) définit une description, une définition ou une valeur dans une liste de descriptions, utilisé à l'intérieur des balises `<dl>` pour s'associer à `<dt>` (_Terme de description_).

    C'est utile pour afficher des données clé-valeur. Les informations de profil, les paramètres et les statistiques en sont des exemples courants.
    ```html
    <dl>
    <dt>JS</dt>
    <dd>Client-side</dd>
    <dd>Server-side</dd>

    <dt>HTML</dt>
    <dd>Client-side</dd>
    </dl>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="HTML sémantique avancé"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Quand devrait-on utiliser les éléments `<figure>` et `<figcaption>` ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'[élément `<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) est généralement utilisé pour envelopper un contenu (média) auto-contenu, comme une image ou un graphique, accompagné de [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) pour fournir une légende.

    C'est utile pour les images, les diagrammes, les extraits de code, etc.
    ```html
    <figure>
    <img src="image.jpg" alt="Description of image">
    <figcaption>Image caption</figcaption>
    </figure>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="HTML sémantique avancé"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est l'objectif de l'élément `<article>` en HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'[élément `<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) est utilisé pour définir un contenu autonome pouvant être distribué ou réutilisé indépendamment.

    Il est souvent utilisé pour les articles de blog, les articles de presse, les messages de forum ou les commentaires utilisateurs.

    Vous pouvez utiliser plusieurs articles sur une page (par exemple, pour des pages avec défilement infini). Ou, vous pouvez les imbriquer les uns dans les autres pour créer une hiérarchie de contenu "autonome".
    ```html
    <article>
    <h2>Article Title</h2>
    <p>Article content...</p>
    <article class="discussion">
    <h3>Comment by User</h3>
    <p>Comment content...</p>
    </article>
    </article>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="HTML sémantique avancé"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est l'objectif des éléments `<fieldset>` et `<legend>` dans un formulaire ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'élément [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) sert à regrouper des contrôles de formulaire liés, et `<legend>` fournit un titre/étiquette pour ce groupe, améliorant l'accessibilité.

    Cela est utile pour regrouper des éléments de formulaire liés, comme une section pour l'adresse de livraison ou les détails de paiement.
    ```html
    <fieldset>
    <legend>Shipping Address</legend>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    ...
    </fieldset>
    <fieldset>
    <legend>Payment Details</legend>
    <label for="card">Card Number:</label>
    <input type="text" id="card" name="card">
    ...
    </fieldset>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="HTML sémantique avancé"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est l'objectif de l'élément `<meter>` ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'élément [`<meter>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) est utilisé pour représenter une mesure scalaire (unique) dans une plage définie, comme la température, l'utilisation du disque ou un décompte de votes.

    Il peut sembler similaire à un [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress), cependant les barres de progression **TJOURS** commencent à zéro. Ainsi, les éléments `<progress>` affichent un `pourcentage d'avancement`, tandis qu'un `<meter>` affiche une valeur quelconque dans une plage définissable.
    ```html
    <meter min="-60" max="130" value="75" /> 75°F
    <meter min="0" max="100" value="75" /> 75%
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="HTML sémantique"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Pourquoi l'élément `<source>` est-il utilisé ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'élément [`<source>` est utilisé pour spécifier les formats multimédias disponibles](https://developer.mozilla.org/en-us/docs/web/html/element/source).

    Spécifiquement utilisé avec les éléments [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video), [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio), et [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture), permettant au navigateur de choisir le format le plus adapté.
    ```html
    <video controls>
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
    </video>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="HTML sémantique avancé"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Comment devriez-vous utiliser l'élément `<hgroup>` ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'élément [`<hgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup) regroupe un en-tête avec du contenu secondaire lié, généralement un ou plusieurs éléments `<p>`.

    Il peut être utile lorsque l'en-tête a un sous-titre, une devise ou un titre alternatif qui ne devrait pas devenir un autre en-tête dans la structure du document.
    ```html
    <article>
    <hgroup>
    <h1>Frankenstein</h1>
    <p>Or: The Modern Prometheus</p>
    </hgroup>
    <section>
    <h2>Chapter 1</h2>
    <p>...</p>
    </section>
    </article>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="HTML sémantique avancé"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    À quoi sert l'élément `<menu>` en HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'élément [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) représente une liste de commandes ou de contrôles interactifs.

    Si votre liste est composée de liens de navigation, utilisez `<nav>` avec un `<ul>`. Utilisez `<menu>` pour des contrôles ressemblant à une barre d'outils ou des listes de commandes.
    ```html
    <menu>
    <li><button type="button">Copy</button></li>
    <li><button type="button">Paste</button></li>
    </menu>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="HTML Sémantique Avancé"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Quel rôle jouent `<details>` et `<summary>` dans HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) permet d'afficher du contenu rétractable, et [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) définit un titre visible pour ce contenu.

    Cela est utile pour les FAQ, les sections pliables ou tout contenu pouvant être basculé.
    ```html
    <details>
    <summary>Click to expand 🤯</summary>
    <p>Hidden content! 💥</p>
    </details>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="HTML sémantique avancé"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Pourquoi devriez-vous utiliser un élément `<dialog>` ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'élément [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) est utilisé pour les pop-ups ou modaux, et fournit un balisage sémantique, des styles CSS étendus et une API native pour ces interactions.

    Utilisez JavaScript pour l'ouvrir avec `.showModal()` pour les dialogues modaux ou `.show()` pour les dialogues non modaux, et fermez-le avec `.close()` ou une soumission de formulaire utilisant `method="dialog"`.
    ```html
    <dialog>
    <h2>Modal Title</h2>
    <p>Modal content...</p>
    <button>Close</button>
    </dialog>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="HTML sémantique avancé"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Comment l'élément `<time>` est-il utilisé en HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'élément `<time>` est utilisé pour les dates, les heures ou les durées. Il peut inclure un contenu lisible par l'homme et un attribut `datetime` lisible par la machine. HTML n'a pas d'élément `<date>`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="HTML sémantique avancé"
  title="Objectif des attributs ARIA"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est l'objectif des attributs ARIA ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ARIA (Accessible Rich Internet Applications) sont des attributs qui améliorent l'accessibilité web en fournissant un contexte supplémentaire pour les lecteurs d'écran et autres technologies d'assistance.

    Il existe des rôles, des états et des propriétés pouvant être utilisés pour décrire des éléments.
    ```html
    <button aria-label="Close" aria-expanded="true">X</button>
    <main aria-live="polite">...</main>
    <dialog
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="dialog_label"
    aria-describedby="dialog_desc"
    ></dialog>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="HTML sémantique avancé"
  title="Utilisation de l'attribut `role`"
  options={[
    {text: 'Pour définir le comportement d\'un composant'},
    {text: 'Pour décrire le rôle d\'un élément', isAnswer: true},
    {text: 'Restreindre l\'accès aux éléments'},
    {text: 'Uniquement pour les Web Components'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est l'utilité de l'attribut `role` en HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'attribut `role` décrit
  </div>
  </slot>
</Challenge>

</QuizUI>

Alors, comment vous en êtes-vous sortis ? Ravi d'utiliser plus d'éléments sémantiques HTML dans votre prochain projet ? 🚀  
Ou, résigné à utiliser `<div>` et `<span>` pour la vie ? 😅  
Faites-moi savoir en commentaire ci-dessous ! 👇
````
