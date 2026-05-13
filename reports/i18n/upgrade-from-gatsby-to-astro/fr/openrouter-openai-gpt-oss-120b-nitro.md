# Translation Candidate
- Slug: upgrade-from-gatsby-to-astro
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 10.19
- Input tokens: 10164
- Output tokens: 3060
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000947
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug upgrade-from-gatsby-to-astro --locale fr
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Leçons tirées de la mise à jour de mon blog
subTitle: 'Astro, Tailwind, MDX, Pagefind, et plus !'
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
Récemment, je me suis lancé dans la mise à niveau de mon site Gatsby v1 vieux de plus de 8 ans.

Cet article partage quelques leçons tirées de ce processus ainsi que les technologies amusantes que j’ai testées.

## Table des matières

- [Exigences du projet](#project-requirements)
- [Choix de la pile technologique adaptée](#choosing-my-right-technology-stack)
- [Astro : courbe d’apprentissage et fonctionnalités clés](#astro-learning-curve-and-key-features)
- [CSS moderne : Wow](#modern-css-wow)
- [Recherche : Pagefind](#search-pagefind)
- [Commentaires : Utterances](#comments-utterances)
- [Tailwind : regrets](#tailwind-regrets)
- [Conclusion](#conclusion)

## Exigences du projet

Avant de plonger dans la mise à niveau, j’ai défini un ensemble d’exigences :

Comme mon blog reçoit un nombre de vues quotidien très variable, j’ai estimé qu’un site statiquement pré‑généré offrirait les performances souhaitées sans ajouter de complexité supplémentaire.

J’avais également besoin de conserver le contenu et les fonctionnalités existants du site, à savoir :

- Mise en évidence du code
- Commentaires
- Recherche sur le site
- Composants React préexistants : interface de quiz, intégrations Gist
- Formulaire de contact
- Images réactives
- Temps de chargement inférieur à une seconde
- Compatibilité navigateur : 2018 et plus
- Déploiements automatisés + basés sur des PR

## Choisir la pile technologique adaptée

Au fil des années, j’ai travaillé avec de nombreux outils de sites statiques, de Jekyll, Hugo, Slate à Gatsby, ainsi qu’avec une foule de frameworks front‑end : Ember, Knockout, Angular, Vue et bien sûr React.

J’ai donc littéralement trop d’options, que j’ai finalement réduites à **Remix**, **Next.js** et **Astro**.

Je pourrais écrire une série complète d’articles sur mon processus d’évaluation, mais je le résume ici :

<p class="breakout">J’ai choisi [Astro](https://astro.build) parce que je pouvais _faire des choses concrètes_ très rapidement.</p>

Son design d’API est rafraîchissant de simplicité. C’est un [excellent compromis entre flexibilité et bonnes opinions de conception.](https://docs.astro.build/en/concepts/why-astro/)

Il était rassurant de constater qu’Astro ne montre aucun biais évident vers le cloud ou une agenda de framework.

Astro n’était pas la seule technologie que j’ai utilisée, voici le récapitulatif complet de la pile :

- [Astro](https://astro.build) : Un générateur de sites statiques moderne.  
- [ShadcnUI](https://ui.shadcn.com) : Une collection de composants réutilisables.  
- [Tailwind CSS](https://tailwindcss.com) : Un framework CSS « utility‑first ».  
- [MDX](https://mdxjs.com) : Contenu Markdown + composants en ligne.  
- [Pagefind](https://pagefind.app) : Bibliothèque de recherche rapide, statique et hors‑ligne. Pas besoin d’Algolia !  
- [Utterances](https://utteranc.es) : Système de commentaires basé sur les issues GitHub.  
- [Netlify](https://www.netlify.com) : Déploiements automatisés, formulaire de contact avec captcha.

## Astro : Courbe d’apprentissage et fonctionnalités clés

<p class="breakout quote">Astro est rapidement devenu la pierre angulaire de ma mise à niveau.</p>

Voici quelques fonctionnalités que j’ai trouvées particulièrement utiles :

- Fichiers `.astro `: à première vue, les composants Astro peuvent ressembler à des composants React JSX, mais ils sont très différents et répondent à un autre ensemble d’objectifs. (Voir le tableau comparatif ci‑dessous.)
- Propulsé par ses propres outils de construction Golang ([build tools](https://github.com/withastro/compiler)) et Vite : ça fonctionne simplement. Gère de façon transparente ESM/CJS, TypeScript, empaquetage du code, styles, images, etc.
- Aucun **bias** de framework ([no framework bias](https://docs.astro.build/en/guides/framework-components/#official-ui-framework-integrations)) ni de cloud ([no cloud bias](https://docs.astro.build/en/guides/deploy/)) (*tousse* Next.js, OpenNext)
- Rendu **statique** vs. **hybride** ([static vs. hybrid](https://docs.astro.build/en/basics/rendering-modes/)) : Astro offre la flexibilité de cibler la plupart des plateformes cloud ([AWS, GCP, Firebase, Netlify, Vercel, Cloudflare Pages, Azure, Fly.io, etc.](https://docs.astro.build/en/guides/deploy/)).
- Collections de contenu : l’API [`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection) simplifie le travail avec les fichiers de contenu comme source de données.
- Routage basé sur le système de fichiers : le routage file‑based d’Astro, combiné avec `getStaticPaths`, rend la génération de pages très simple.
- SEO : [Astro ne se met pas en travers de votre chemin](https://github.com/justsml/dans-blog/blob/010c5cb58bb327adb8c8fff608594daa612ad9d5/src/components/BaseHead.astro#L43-L63) et n’émet qu’une quantité minimale de ~~débris~~ boilerplate (`astro‑island`) lorsque c’est nécessaire.

Certaines choses ont été un peu surprenantes, comme le style autour du balisage injecté par Astro et l’effet de `display:contents`.

```tsx


<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>

### Comparaison des composants `.astro` vs. composants client

Les composants Astro sont essentiellement des modèles HTML avec un puissant système de composants & props. Ils peuvent récupérer des données au moment de la construction, accéder à des ressources backend, et garder certaines informations sensibles cachées.

La meilleure façon de saisir les composants `.astro` est de les comparer aux composants côté client (React, Vue, Svelte, etc.).

<section className="scroll-x">
| Que faut‑il faire ?                                                                | Composant `.astro` | Composant client |
| ---------------------------------------------------------------------------------- | ------------------- | ----------------- |
| Générer du HTML avec un modèle+composant puissant                                   | ✅ | ❌ |
| Récupérer des données au moment de la construction                                   | ✅ | ❌ |
| Accéder directement aux ressources backend                                          | ✅ | ❌ |
| Garder les informations sensibles cachées (tokens d’accès, clés API, etc.)          | ✅ | ❌ |
| Réduire le JavaScript côté client                                                    | ✅ | ❌ |
| Utiliser des composants client (React, Vue, Svelte, etc.)                           | ✅ | ✅ |
| Ajouter de l’interactivité et des écouteurs d’événements (`onClick()`, `onChange()`, etc.) | ❌ | ✅ |
| Utiliser l’état et les effets de cycle de vie (`useState()`, `useReducer()`, `useEffect()`, etc.) | ❌ | ✅ |
| Utiliser des API réservées au navigateur                                            | ❌ | ✅ |
| Utiliser des hooks personnalisés dépendant de l’état, des effets ou d’API navigateur | ❌ | ✅ |
</section>

## CSS moderne : Wow

Revenons au développement frontend, j’ai été impressionné par les avancées du CSS natif :

- Variables CSS : disponibles depuis un moment et assez stables sur les navigateurs depuis 202\*.
- Nesting : enfin dans la spécification, et sans la syntaxe maladroite des premières implémentations. C’est maintenant comparable à Less ou SCSS.
- Nouveaux sélecteurs : [`:is()`, `:where()` et `:has()`](https://www.youtube.com/watch?v=3ncFpP8GP4g) offrent un ciblage plus précis des éléments.
- Unités modernes comme `ch`, `vw` et fonctions telles que `clamp()` donnent un meilleur contrôle des mises en page et de la typographie.
- Gérer les espacements de façon plus naturelle avec les propriétés `-inline` et `-block`. On peut définir le padding ou la marge sur l’axe horizontal ou vertical. Au lieu de `margin: 0 1rem 0 1rem` → `margin-inline: 1rem`.
- Layouts avancés : réapprendre le CSS Grid. Wow, il y a un sacré paquet de choses là-dedans. Ça peut être intimidant avec une infinité apparente de façons de l’utiliser. Gardez à l’esprit que vous pouvez vous contenter de maîtriser une ou deux approches. Voici d’excellentes ressources qui m’ont aidé à faire des astuces avec le grid : [vidéo de Kevin Powell : Learn CSS Grid the easy way](https://www.youtube.com/watch?v=rg7Fvvl3taU), [Responsive w/o media queries](https://ardilamorin.com/responsive-no-media-queries/), [Ten modern layouts in one line of CSS](https://web.dev/articles/one-line-layouts).

## Recherche : Pagefind

Mettre en place une **recherche sur le site** sans services tiers ni hébergement de base de données semblait un défi amusant. Après tout, ce n’est pas comme si j’avais déjà 10 000 articles à indexer (pour l’instant).

En parcourant les [intégrations communautaires d’Astro](https://astro.build/integrations/?search=find) je suis tombé sur un outil fantastique que j’aurais aimé connaître plus tôt : [Pagefind](https://pagefind.app/).

<p class="breakout quote">Peu d’outils résolvent un problème aussi bien que Pagefind résout la recherche locale sur un site.</p>

La simplicité d’implémentation de Pagefind est un vrai plaisir. Il peut s’intégrer à **n’importe quel** contenu de site statique, et vous pouvez choisir d’utiliser l’interface par défaut ou de créer une UI entièrement personnalisée si vous le souhaitez.

Il a résolu proprement tout ce que je recherchais. L’intégration n’a pris que quelques minutes, le principal travail consistant à ajouter une balise `<div id="search"></div>` et un peu de style !

## Comments : Utterances

Malheureusement, j’ai dû dire adieu à Disqus et aux commentaires que j’avais accumulés pendant des années.

Je voulais un meilleur contrôle et une meilleure visibilité sur les scripts tiers présents sur mon site.

De plus, il faut que ce soit simple et maintenable.

Cela m’a conduit à choisir le service fantastique [Utterances](https://utteranc.es/). Son système de commentaires basé sur les issues GitHub correspond bien à mon audience. De plus, il est facile à configurer et gratuit.

## Tailwind : regrets

Il n’y a qu’un seul élément technologique que je commence à regretter d’avoir utilisé : Tailwind.

Avec le temps, je ressens la différence de coût entre l’écriture et la maintenance. Tailwind permet d’écrire très rapidement, mais dès qu’il devient suffisamment complexe, il peut devenir fastidieux à lire et à étendre.

## Conclusion

Passer mon ancien site Gatsby v1 à une pile moderne centrée sur Astro a été une expérience agréable. 10/10, je le recommande.

Si vous envisagez de mettre à niveau un site ancien ou de créer un nouveau site statique (ou hybride), je recommande vivement d’examiner Astro. La courbe d’apprentissage peut parfois être raide, mais les gains en performance, en expérience développeur et en pérennité du projet valent largement l’effort.
````
