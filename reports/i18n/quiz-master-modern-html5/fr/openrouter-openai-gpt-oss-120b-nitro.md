# Translation Candidate
- Slug: quiz-master-modern-html5
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-01--quiz-master-modern-html5/fr/index.mdx
- Validation: passed
- Runtime seconds: 22.36
- Input tokens: 13152
- Output tokens: 6752
- Thinking tokens: unknown
- Cached input tokens: 5056
- Cache write tokens: 0
- Estimated cost: $0.001728
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz : le HTML a-t-il encore sa place sur votre CV ?'
subTitle: Prouve‑toi !
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
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Alors, vous pensez maîtriser le HTML5 ?

Après tout, vous savez faire la différence entre un `<div>` et un `<span>`, non ? Mais à quel point connaissez‑vous les éléments sémantiques plus avancés de HTML5 ?

> Note : Si vous n’arrivez pas à réussir ce test, vous êtes obligé de retirer « HTML Skills » de votre CV.

### C’est parti !

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
    Quel est le rôle principal de l'élément `<ul>` en HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La balise `<ul>` crée une liste non ordonnée, les éléments sont généralement indiqués par des puces.
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
    Que représente l'élément `<dd>` en HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'[élément `<dd>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) définit une description, une définition ou une valeur dans une liste de description, utilisé à l'intérieur des balises `<dl>` pour s'associer avec `<dt>` (_Description Term_).

    Ceci est utile lorsqu'on affiche des données clé‑valeur. Les informations de profil, les paramètres et les statistiques sont des exemples courants.
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
    Quand faut‑il utiliser les éléments `<figure>` et `<figcaption>` ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La balise [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) est généralement utilisée pour envelopper du contenu (média) autonome, comme une image ou un graphique, avec [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) pour fournir une légende.

    Ceci est utile pour les images, diagrammes, extraits de code, et plus encore.
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
    Quel est le but de l'élément `<article>` en HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le [`<article>` élément](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) est utilisé pour définir un contenu autonome qui peut être distribué ou réutilisé de façon indépendante.

    Il est souvent employé pour des billets de blog, des articles de presse, des messages de forum ou des commentaires d'utilisateur.

    Vous pouvez placer plusieurs `<article>` sur une même page (par exemple pour des pages à défilement infini). Vous pouvez également les imbriquer les uns dans les autres afin de créer une hiérarchie de « contenu autonome ».
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
    Quel est le but des éléments `<fieldset>` et `<legend>` dans un formulaire ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) est utilisé pour regrouper des contrôles de formulaire liés, et `<legend>` fournit un titre/étiquette pour le groupe, améliorant l'accessibilité.

    Ceci est utile pour regrouper des éléments de formulaire connexes, comme une section pour l'adresse de livraison ou les détails de paiement.
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
    Quel est le but de l'élément `<meter>` ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'élément [`<meter>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) est utilisé pour représenter une mesure scalaire (unique) dans une plage définie, comme la température, l'utilisation du disque ou le nombre de votes.

    Il peut sembler similaire à une barre [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress), cependant les barres de progression **TOUJOURS** commencent à zéro. Ainsi les éléments `<progress>` affichent un `pourcentage d'achèvement`, tandis qu'un `<meter>` montre n'importe quelle valeur dans une plage définissable.
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
    Pourquoi utilise‑t‑on l’élément `<source>` ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L’[`<source>` élément est utilisé pour spécifier les formats média disponibles](https://developer.mozilla.org/en-us/docs/web/html/element/source).

    Utilisé spécifiquement avec [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video), [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) et [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture), permettant au navigateur de choisir le format le plus approprié.
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
    Comment devez‑vous utiliser l’élément `<hgroup>` ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L’élément [`<hgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup) regroupe un titre avec du contenu secondaire lié, généralement un ou plusieurs éléments `<p>`.

    Il peut être utile lorsqu’un titre possède un sous‑titre, un slogan ou un titre alternatif qui ne doit pas devenir un autre titre dans le plan du document.
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
    À quoi sert l'élément `<menu>` en HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'[`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) représente une liste de commandes ou de contrôles interactifs.

    Si votre liste contient des liens de navigation, utilisez `<nav>` avec un `<ul>`. Utilisez `<menu>` pour des contrôles de type barre d'outils ou des listes de commandes.
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
  group="HTML sémantique avancé"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Quel rôle jouent `<details>` et `<summary>` dans HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) permet du contenu pliable, et [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) spécifie un titre visible pour le contenu.

    Ceci est utile pour les FAQ, les sections pliables, ou tout contenu qui peut être basculé.
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
    Pourquoi devriez‑vous utiliser un élément `<dialog>` ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L’élément `<dialog>` est utilisé pour les pop‑ups ou les modaux, et fournit un balisage sémantique, un CSS étendu et une API native pour ces interactions.

    Utilisez JavaScript pour l’ouvrir avec `.showModal()` pour les dialogues modaux ou `.show()` pour les dialogues non modaux, et fermez‑le avec `.close()` ou une soumission de formulaire en utilisant `method="dialog"`.
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
    Comment utilise‑t‑on l’élément `<time>` en HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L’élément `<time>` est utilisé pour les dates, les heures ou les durées. Il peut contenir du texte lisible par l’homme et un attribut `datetime` lisible par la machine. HTML n’a pas d’élément `<date>`.
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
    Quel est le but des attributs ARIA ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les attributs ARIA (Accessible Rich Internet Applications) améliorent l'accessibilité du Web en fournissant un contexte supplémentaire aux lecteurs d'écran et autres technologies d'assistance.

    Il existe des rôles, des états et des propriétés qui peuvent être utilisés pour décrire les éléments.
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
    {text: 'Pour décrire le but de l\'élément', isAnswer: true},
    {text: 'Restreindre l\'accès aux éléments'},
    {text: 'Uniquement pour les Web Components'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est l'usage de l'attribut `role` en HTML ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'attribut `role` décrit

    le but d'un élément aux technologies d'assistance, aidant à améliorer l'accessibilité.
  </div>
  </slot>
</Challenge>

</QuizUI>

Alors, comment ça s’est passé ? Vous avez hâte d’utiliser davantage d’éléments HTML sémantiques dans votre prochain projet ? 🚀

Ou bien vous êtes résigné à rester fidèle à `<div>` et `<span>` pour toujours ? 😅

Dites‑moi tout dans les commentaires ci‑dessous ! 👇
````
