# Translation Candidate
- Slug: upgrade-from-gatsby-to-astro
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 23.93
- Input tokens: 9348
- Output tokens: 8926
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.002890
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug upgrade-from-gatsby-to-astro --locale fr
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: 'Astro, Tailwind, MDX, Pagefind, et plus encore !'
date: '2024-08-21'
modified: '2024-08-23'
category: Guides
tags:
  - astro
  - tailwind
  - mdx
  - pagefind
  - gatsby
cover: ../galaxy-contribution-mode.webp
cover_full_width: ../galaxy-contribution-banner.webp
cover_mobile: ../w300_galaxy-contribution-mode.webp
cover_icon: ../icon_galaxy-contribution-mode.webp
---
Récemment, j'ai entrepris un projet pour mettre à jour mon site Gatsby v1 âgé de plus de 8 ans.  
Cet article de blog partagera les leçons que j'ai apprises pendant ce processus ainsi que les technologies intéressantes que j'ai explorées.  

## Table des matières  

- [Exigences du projet](#exigences-du-projet)  
- [Choix de ma pile technologique](#choix-de-ma-pile-technologique)  
- [Astro : Courbe d'apprentissage et fonctionnalités clés](#astro-courbe-dapprentissage-et-fonctionnalités-clés)  
- [CSS moderne : Wow](#css-moderne-wow)  
- [Recherche : Pagefind](#recherche-pagefind)  
- [Commentaires : Utterances](#commentaires-utterances)  
- [Tailwind : Regrets](#tailwind-regrets)  
- [Conclusion](#conclusion)  

## Exigences du projet  

Avant de me lancer dans la mise à jour, j'ai établi un ensemble d'exigences :

Étant donné que mon blog reçoit un nombre très variable de vues quotidiennes, j'ai estimé qu'un site statique pré-généré offrirait les performances souhaitées sans complexité supplémentaire.

De plus, je devais conserver le contenu et les fonctionnalités existantes de ce site, notamment :

- Mise en évidence du code
- Commentaires
- Recherche sur le site
- Composants React existants : Quiz UI, intégrations Gist
- Formulaire de contact
- Images adaptatives
- Temps de chargement inférieur à 1 seconde
- Compatibilité navigateurs : 2018+
- Déploiements automatisés et basés sur les demandes de tirage (PR)

## Choix de ma pile technologique adéquate

Au fil des années, j'ai travaillé avec de nombreux outils de génération de sites statiques, allant de Jekyll, Hugo, Slate à Gatsby. J'ai également utilisé de nombreux frameworks front-end : Ember, Knockout, Angular, Vue et bien sûr React.

J'ai donc précisément trop d'options, que j'ai fini par réduire à **Remix**, **Next.js** et **Astro**,

Je pourrais écrire une série entière de billets de blog sur mon processus d'évaluation, mais je vais en faire un résumé ici :

<p class="breakout">J'ai choisi [Astro](https://astro.build) grâce à la rapidité avec laquelle j'ai pu _faire des choses significatives_.</p>

Leur conception d'API est rafraîchissante dans sa simplicité. C'est [un excellent équilibre entre flexibilité et bonnes pratiques de conception.](https://docs.astro.build/en/concepts/why-astro/)

C'était rassurant qu'Astro ne présente aucun biais évident envers le cloud ou une agenda de framework.

Astro n'était pas la seule technologie que j'ai utilisée, voici une liste complète de la stack :

- [Astro](https://astro.build) : Générateur de site statique moderne.
- [ShadcnUI](https://ui.shadcn.com) : Ensemble de composants réutilisables.
- [Tailwind CSS](https://tailwindcss.com) : Framework CSS orienté utilitaires.
- [MDX](https://mdxjs.com) : Contenu markdown + composants en ligne.
- [Pagefind](https://pagefind.app) : Bibliothèque de recherche rapide, statique et hors ligne. Pas besoin d'Algolia !
- [Utterances](https://utteranc.es) : Système de commentaires basé sur les problèmes GitHub.
- [Netlify](https://www.netlify.com) : Déploiements automatisés, formulaire de contact avec captcha.

## Astro : Courbe d'apprentissage et fonctionnalités clés

<p class="breakout quote">Astro est rapidement devenu la pierre angulaire de ma mise à jour.</p>

Voici quelques fonctionnalités que j'ai particulièrement appréciées :

- `.astro` files : À première vue, les composants Astro peuvent ressembler aux composants JSX de React, mais ils sont très différents et poursuivent des objectifs distincts. (Voir le tableau de comparaison ci-dessous.)
- Motorisé par ses propres [outils de construction en Golang](https://github.com/withastro/compiler) et Vite : ça fonctionne sans accroc. Gère automatiquement ESM/CJS, TypeScript, regroupement de code, styles, images, etc.
- [Aucune préférence pour un framework](https://docs.astro.build/en/guides/framework-components/#official-ui-framework-integrations) ou [pour le cloud.](https://docs.astro.build/en/guides/deploy/) (*Tousse* Next.js, OpenNext)
- [Statique vs hybride](https://docs.astro.build/en/basics/rendering-modes/) : Astro offre la [flexibilité de cibler la plupart des plateformes cloud](https://docs.astro.build/en/guides/deploy/) : AWS, GCP, Firebase, Netlify, Vercel, Cloudflare Pages, Azure, Fly.io, et bien d'autres.
- Collections de contenu : L'API [`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection) simplifie le travail avec des fichiers de contenu en tant que source de données.
- Routage basé sur les fichiers : Le système de routage d'Astro, combiné à `getStaticPaths`, rend la génération de pages très facile.
- SEO : [Astro ne se met pas en travers de votre chemin](https://github.com/justsml/dans-blog/blob/010c5cb58bb327adb8c8fff608594daa612ad9d5/src/components/BaseHead.astro#L43-L63), et n'ajoute qu'un minimum de ~~détritus~~ balisage (`astro-island`) lorsque c'est nécessaire.

Certaines choses m'ont surpris, comme le stylage autour du balisage injecté par Astro, ou l'effet de `display:contents`.

<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>

### Comparaison des composants `.astro` et des composants côté client

Les composants Astro sont essentiellement des modèles HTML avec un schéma puissant de composants et de propriétés. Ils peuvent récupérer des données lors de la construction, accéder à des ressources backend et cacher certaines informations sensibles.

La meilleure façon de comprendre les composants `.astro` d'Astro est de les comparer et de les contraster avec les composants côté client. (React, Vue, Svelte, etc.)

<section className="scroll-x">
| Qu'avez-vous besoin de faire ?                                                            | Composant `.astro`    | Composant côté client    |
| ------------------------------------------------------------------------------------------ | --------------------- | ------------------------- |
| Générer du HTML avec un modèle et un schéma de composants puissants                        | ✅ | ❌ |
| Récupérer des données lors de la construction                                              | ✅ | ❌ |
| Accéder à des ressources backend (directement)                                             | ✅ | ❌ |
| Cacher des informations sensibles (tokens d'accès, clés API, etc.)                         | ✅ | ❌ |
| Réduire le JavaScript côté client                                                        | ✅ | ❌ |
| Utiliser des composants côté client (React, Vue, Svelte, etc.)                            | ✅ | ✅ |
| Ajouter de l'interactivité et des écouteurs d'événements (`onClick()`, `onChange()`, etc.) | ❌ | ✅ |
| Utiliser l'état et les effets de cycle de vie (`useState()`, `useReducer()`, etc.)         | ❌ | ✅ |
| Utiliser des APIs uniquement côté navigateur                                              | ❌ | ✅ |
| Utiliser des hooks personnalisés dépendant de l'état, des effets ou des APIs côté navigateur | ❌ | ✅ |
</section>

## CSS moderne : Wow

Revenant sur le développement frontend, j'étais ébloui par les avancées des CSS natifs :

- **Variables CSS** : Disponibles depuis un certain temps, et assez stables à travers les navigateurs depuis 202\*.
- **Imbriquage** : Enfin standardisé, sans la syntaxe gênante d'antan. C'est désormais similaire à Less ou SCSS.
- **Sélecteurs nouveaux** : [`:is()`, `:where()` et `:has()`](https://www.youtube.com/watch?v=3ncFpP8GP4g) offrent une ciblage plus précis des éléments.
- **Unités modernes** comme `ch`, `vw`, et des fonctions comme `clamp()` donnent un meilleur contrôle sur les mises en page et la typographie.
- **Espacement naturel** avec les attributs `-inline` et `-block`. Définir le padding ou la marge sur l'axe horizontal ou vertical. Au lieu de `margin: 0 1rem 0 1rem` → `margin-inline: 1rem`.
- **Mises en page avancées** : Reprendre en main CSS Grid. Wow, il y a un sacré paquet de trucs là-dedans. Cela peut être intimidant avec les innombrables façons de l'utiliser. Rappelons qu'on peut s'en sortir avec 1 ou 2 méthodes. Découvrez ces excellents ressources qui m'ont aidé à faire des tours de force avec la grille : [Vidéo de Kevin Powell : Apprenez CSS Grid facilement](https://www.youtube.com/watch?v=rg7Fvvl3taU), [Responsive sans requêtes média](https://ardilamorin.com/responsive-no-media-queries/), [Dix mises en page modernes en une seule ligne de CSS](https://web.dev/articles/one-line-layouts).

## Recherche : Pagefind

Implémenter une **recherche sur le site** sans services tiers ni hébergement de base de données semblait un défi amusant. Après tout, ce n'est pas comme si j'avais 10 000 articles à indexer (encore).

En naviguant dans [les intégrations communautaires d'Astro](https://astro.build/integrations/?search=find), j'ai découvert un outil fantastique dont j'aurais aimé connaître l'existence plus tôt : [Pagefind](https://pagefind.app/).

<p class="breakout quote">Peu d'outils résolvent un problème aussi bien que Pagefind résout la recherche locale sur un site.</p>

La simplicité d'implémentation de Pagefind est un réel plaisir. Il s'intègre avec TOUT contenu d'un site statique, et vous pouvez choisir d'utiliser une interface par défaut, ou bien créer une personnalisation totale si vous le souhaitez.

Il résolvait parfaitement tout ce que je recherchais. L'intégration n'a pris que quelques minutes, et la majeure partie du travail consistait à ajouter un tag `<div id="search"></div>` et un peu de style !

## Commentaires : Utterances

Malheureusement, j'ai dû dire adieu à Disqus et aux commentaires que j'avais accumulés sur de nombreuses années.

Je voulais un meilleur contrôle et une meilleure visibilité sur les scripts tiers sur mon site.

De plus, il devait être simple et maintenable.

Cela m'a conduit à choisir le fantastique service [Utterances](https://utteranc.es/). Son système de commentaires basé sur GitHub correspond bien à mon public. De plus, il est facile à configurer et gratuit.

## Tailwind : Des regrets

Il n'y a qu'une seule technologie dont je regrette de plus en plus l'utilisation : Tailwind.

Au fil du temps, je sens la différence de coût entre l'écriture et l'entretien. Tailwind est très rapide à écrire, mais une fois que c'est suffisamment complexe, il peut devenir fastidieux à lire et à étendre.

## Conclusion

Mettre à niveau mon ancien site Gatsby v1 vers une pile moderne centrée sur Astro a été une expérience amusante. 10/10, je le recommanderais.

Si vous envisagez de mettre à niveau un ancien site ou de construire un nouveau site statique (ou hybride), je recommande vivement d'examiner Astro. La courbe d'apprentissage peut être abrupte à certains moments, mais les avantages en termes de performance, d'expérience développeur et de rendu résilient de votre projet face à l'avenir sont largement justifiés par l'effort.
````
