# Translation Candidate
- Slug: quiz-master-modern-html5
- Locale: fr
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-01--quiz-master-modern-html5/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 440.97
- Input tokens: 11050
- Output tokens: 12323
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.004945
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug quiz-master-modern-html5 --locale fr --skip-global (code 1)
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz : Le HTML a-t-il encore sa place sur votre CV ?'
subTitle: Fais tes preuves
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
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## Alors, tu penses maîtriser HTML5 ?

Après tout, tu sais distinguer un `<div>` d'un `<span>`, non ? Mais connais-tu vraiment les éléments sémantiques avancés de HTML5 ?

> Note : Si tu ne réussis pas ce test, tu es légalement obligé de retirer `HTML Skills` de ton CV.

### C'est parti !

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Échauffement"
  title="Rôle de `<ul>`"
  options={[
    {text: 'Liste non ordonnée', isAnswer: true},
    {text: 'Liste unique'},
    {text: 'Liste universelle'},
    {text: 'Liste utilisateur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le rôle principal de l'élément `<ul>` en HTML ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    La balise `<ul>` crée une liste non ordonnée, dont les éléments sont généralement marqués par des puces.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="HTML sémantique avancé"
  title="Utilisation de `<dd>`"
  options={[
    {text: 'Définition de description'},
    {text: 'Terme de description'},
    {text: 'Affichage de données'},
    {text: 'Détails de description', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Que représente l'élément `<dd>` en HTML ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    L'[élément `<dd>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) définit une description, une définition ou une valeur dans une liste de description, utilisé dans les balises `<dl>` pour faire la paire avec `<dt>` (_Terme de description_).

    Ceci est utile pour afficher des données clé-valeur. Les informations de profil, les paramètres et les statistiques en sont des exemples courants.
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
  title="Utilisation de `<figure>/<figcaption>`"
  options={[
    {text: 'Pour les images avec des informations de copyright à afficher'},
    {text: 'Décrire des images, des graphiques, etc.', isAnswer: true},
    {text: 'Pour annoter des tableaux, des calculs, etc.'},
    {text: 'Utilisé pour légender des vidéos'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quand faut-il utiliser les éléments `<figure>` et `<figcaption>` ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    La balise [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) est généralement utilisée pour encapsuler du contenu (média) autonome, comme une image ou un graphique, accompagnée de [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) pour fournir une légende.

    Cela est utile pour les images, les diagrammes, les extraits de code, etc.
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
  group="HTML Sémantique Avancé"
  title="Utilisation de `<article>`"
  options={[
    {text: 'Pour le contenu, les barres latérales et les informations de copyright'},
    {text: 'Une section de contenu autonome', isAnswer: true},
    {text: 'Partie d\'un <newsletter>'},
    {text: 'Définit un article de presse'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le but de l'élément `<article>` en HTML ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    L'[élément `<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) est utilisé pour définir un contenu autonome qui peut être distribué ou réutilisé indépendamment.

    Il est souvent utilisé pour les articles de blog, les articles de presse, les messages de forum ou les commentaires d'utilisateurs.

    Vous pouvez utiliser plusieurs articles sur une page (pour les pages à défilement infini, par exemple). Ou vous pouvez les imbriquer les uns dans les autres pour créer une hiérarchie de « contenu autonome ».
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
  title="Utilisation de `<fieldset>/<legend>`"
  options={[
    {text: 'Regrouper des éléments de formulaire sous un titre', isAnswer: true},
    {text: 'Définir des instructions pour les champs du formulaire'},
    {text: 'Pas une utilisation valide de <legend>'},
    {text: 'Définit une section extensible'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le but des éléments `<fieldset>` et `<legend>` dans un formulaire ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) est utilisé pour regrouper des contrôles de formulaire connexes, et `<legend>` fournit un titre/étiquette pour le groupe, améliorant l'accessibilité.

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
  title="But de l'élément `<meter>`"
  options={[
    {text: 'Une barre de progression en unités métriques'},
    {text: 'Représenter une valeur numérique dans une plage', isAnswer: true},
    {text: 'Convertit une distance en mètres'},
    {text: 'Balise spécialisée liée à la performance'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le but de l'élément `<meter>` ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    L'élément [`<meter>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) est utilisé pour représenter une mesure scalaire (unique) dans une plage définie, comme la température, l'utilisation du disque ou un décompte de votes.

    Il peut sembler similaire à une barre [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress), cependant les barres de progression **COMMENCENT TOUJOURS** à zéro. Par conséquent, les éléments `<progress>` affichent un `percent of completion`, tandis qu'un `<meter>` affiche n'importe quelle valeur dans une plage définissable.
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
  title="Utilisation de `<source>`"
  options={[
    {text: 'Utilisé pour définir une source de données'},
    {text: 'Déclarer le(s) format(s) de fichier média disponible(s)', isAnswer: true},
    {text: 'Citer des sources en utilisant le format APA ou MLA'},
    {text: 'Définir un bloc de code source'},
  ]}
>
  <slot name="question">
  <div className="question">
    Pourquoi l'élément `<source>` est-il utilisé ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    L'[`<source>` élément est utilisé pour spécifier les formats de médias disponibles](https://developer.mozilla.org/en-us/docs/web/html/element/source).

    Utilisé spécifiquement avec les éléments [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video), [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) et [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture), permettant au navigateur de choisir le format le plus approprié.
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
  title="Utilisation de `<hgroup>`"
  options={[
    {text: 'Élément obsolète, plus utilisé'},
    {text: 'Pour regrouper des titres ensemble'},
    {text: 'Définir une table des matières'},
    {text: 'Regrouper un titre avec son sous-titre', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Comment utiliser l'élément `<hgroup>` ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    L'élément [`<hgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup) regroupe un titre avec du contenu secondaire connexe, généralement un ou plusieurs éléments `<p>`.

    Cela peut être utile lorsqu'un titre a un sous-titre, un slogan ou un titre alternatif qui ne doit pas devenir un autre titre dans le plan du document.
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
  title="Utilisation de `<menu>`"
  options={[
    {text: 'Pour définir une liste ordonnée'},
    {text: 'Pour lister des commandes ou des contrôles de barre d\'outils', isAnswer: true},
    {text: 'Pour représenter une barre de navigation'},
    {text: 'Pour définir un groupe de boutons'},
  ]}
>
  <slot name="question">
  <div className="question">
    À quoi sert l'élément `<menu>` en HTML ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Le [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) représente une liste de commandes ou de contrôles interactifs.

    Si votre liste est constituée de liens de navigation, utilisez `<nav>` avec une `<ul>`. Utilisez `<menu>` pour des contrôles de type barre d'outils ou des listes de commandes.
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
  title="Rôle de `<details>/<summary>`"
  options={[
    {text: 'Contenu pliable natif', isAnswer: true},
    {text: 'Infobulles natives'},
    {text: 'Ajouter du contexte à <section>'},
    {text: 'Pour afficher des données structurées'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel rôle jouent `<details>` et `<summary>` en HTML ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) permet un contenu pliable, et [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) spécifie un titre visible pour le contenu.

    Ceci est utile pour les FAQ, les sections pliables, ou tout contenu pouvant être basculé.
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
  title="Objectif de `<dialog>`"
  options={[
    {text: 'Format pour scénaristes'},
    {text: 'Déclarer une modale ou une popup', isAnswer: true},
    {text: 'Déclarer une discussion de type ChatGPT'},
    {text: 'Obsolète au profit de `<wizard>`'},
  ]}
>
  <slot name="question">
  <div className="question">
    Pourquoi devriez-vous utiliser un élément `<dialog>` ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    L'élément [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) est utilisé pour les pop-ups ou les modales, et fournit un balisage sémantique, du CSS étendu et une API native pour ces interactions.

    Utilisez JavaScript pour l'ouvrir avec `.showModal()` pour les dialogues modaux ou `.show()` pour les dialogues non modaux, et le fermer avec `.close()` ou une soumission de formulaire utilisant `method="dialog"`.
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
  group="HTML Sémantique Avancé"
  title="Usage de `<time>`"
  options={[
    {text: 'Pour représenter une date et une heure', isAnswer: true},
    {text: 'Pour définir un horodatage'},
    {text: 'Pour formater uniquement les dates'},
    {text: 'Pour rendre les entrées de date déplaçables'},
  ]}
>
  <slot name="question">
  <div className="question">
    Comment l'élément `<time>` est-il utilisé en HTML ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    L'élément `<time>` est utilisé pour les dates, les heures ou les durées. Il peut contenir du texte lisible par l'humain et un attribut `datetime` lisible par la machine. HTML n'a pas d'élément `<date>`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="HTML sémantique avancé"
  title="But des attributs ARIA"
  options={[
    {text: 'Aides pour les appareils tactiles'},
    {text: 'Améliorer l\'accessibilité', isAnswer: true},
    {text: 'Contrôler les sons et la lecture'},
    {text: 'Pour n\'utiliser que <div>\'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le but des attributs ARIA ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Les attributs ARIA (Accessible Rich Internet Applications) améliorent l'accessibilité web en fournissant un contexte supplémentaire pour les lecteurs d'écran et autres technologies d'assistance.

    Il existe des rôles, des états et des propriétés qui peuvent être utilisés pour décrire des éléments.
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
    {text: 'Pour décrire l\'objectif d\'un élément', isAnswer: true},
    {text: 'Restreindre l\'accès aux éléments'},
    {text: 'Uniquement pour les Web Components'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est l'utilisation de l'attribut `role` en HTML ?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    L'attribut `role` décrit

    l'objectif d'un élément aux technologies d'assistance, contribuant à améliorer l'accessibilité.
  </div>
  </slot>
</Challenge>

</QuizUI>

Alors, comment ça s'est passé ? Envie d'utiliser plus d'éléments HTML sémantiques dans votre prochain projet ? 🚀

Ou, résigné à `<div>` et `<span>` pour la vie ? 😅

Dites-moi dans les commentaires ci-dessous ! 👇
````
