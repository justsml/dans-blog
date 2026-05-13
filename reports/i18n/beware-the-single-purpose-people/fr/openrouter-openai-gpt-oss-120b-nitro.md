# Translation Candidate
- Slug: beware-the-single-purpose-people
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-04-03--beware-the-single-purpose-people/fr/index.mdx
- Validation: passed
- Runtime seconds: 4.39
- Input tokens: 7510
- Output tokens: 2907
- Thinking tokens: unknown
- Cached input tokens: 2816
- Cache write tokens: 0
- Estimated cost: $0.000816
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
language: English
title: Attention aux spécialistes à usage unique
subTitle: Tellement pur que ça faitmal
category: Code
subCategory: Best Practices
date: '2025-04-14'
modified: '2025-04-15'
tags:
  - software-development
  - code-organization
  - maintainability
  - testing
  - dogma
  - pragmatism
social_image: ../desktop-social.webp
cover_full_width: ../endless-little-boxes.webp
cover_mobile: ../endless-little-boxes-square-200.webp
cover_icon: ../endless-little-boxes-square-200.webp
---
Le `SingleResponsibility Principle` est l’une de ces idées qui paraît tellement sensée qu’elle peut passer inaperçue à votre jugement.

Faire une chose. Bien le faire. Garder les modules ciblés. Donner une raison au code de changer. Bon conseil.

Puis quelqu’un transforme ce conseil en règle stricte et commence à déclarer que toute fonction de plus de cinq lignes est une mauvaise odeur de code.

<p class="inset">Le problème n’est pas le SRP. Le problème, c’est de traiter « petit » comme un substitut à « cohésif ».</p>

À ce moment‑là, vous avez rencontré les « Single‑Purpose People » : des développeurs qui ne se trompent pas sur la modularité, exactement, mais qui ont confondu des limites utiles avec une fragmentation maximale.

<figure class="inset-right">
  <figcaption>Violence dans l’architecture logicielle</figcaption>
![Components, components everywhere](../software-patterns__the-dismembered-architecture.webp "Components, components everywhere")
</figure>

## I. L’idée utile sous‑jacente

> Ajouter une seule case à cocher dans un formulaire ne devrait idéalement affecter qu’un seul fichier. Pas 8 fichiers répartis sur 5 répertoires… Je vous regarde, React/Redux.

Lorsque le SRP est appliqué avec discernement, il est bénéfique. Les unités de code centrées sur une tâche conceptuelle unique sont plus faciles à comprendre. Les tests peuvent cibler le comportement à une frontière raisonnable. Des modules clairs facilitent la modification d’une partie du système sans entraîner le reste de l’application dans la même pièce.

Même les exemples classiques d’Unix sont plus pragmatiques que le slogan ne le laisse croire. `ls` liste les fichiers, oui, mais il orchestre aussi des appels comme `opendir`, `readdir`, `closedir` et `stat`. L’unité utile n’est pas l’opération la plus petite possible. L’unité utile est la plus petite chose cohérente qui résout la tâche.

<p class="inset">La philosophie Unix originale portait sur la *composition* et la *simplicité*, **pas sur la réduction de tout** à une fonction ou un fichier unique.</p>

Cette distinction compte. « Une responsabilité » n’est pas la même chose que « une ligne de comportement ».

## II. Sur‑abstraction : quand la simplicité bascule dans le chaos

> Notre architecte affirme que toute fonction de plus de 5 lignes est un « code smell ». Notre base de code sent maintenant légèrement le désespoir sans repère.

Le mode d’échec est facile à repérer une fois qu’il a déjà rendu votre semaine pire.

La base de code possède plus de fichiers, mais moins de forme. Chaque helper a son helper. Chaque concept a été découpé dans des dossiers nommés d’après des rôles techniques plutôt que selon le sens produit. Ajouter une case à cocher nécessite de toucher un composant, un hook, un sélecteur, une action, un reducer, une constante, un fixture de test et une exportation « barrel » qui n’existe que pour que les chemins d’importation ne paraissent pas coupables.

<figure class="inset-left">
  <figcaption>Aucune issue pour ce modèle de travail infini</figcaption>
![Components, components everywhere](../software-patterns__the-mc-escher-stack.webp "Le motif MC Escher")
</figure>

Qu’est‑ce que toute cette pureté a apporté ?

-   **Éclats de système de fichiers :** Les répertoires source se transforment en paysages cauchemardesques de innombrables petits fichiers, contenant souvent une unique fonction, tristement solitaire. La navigation devient un exercice de spéléologie.  
-   **Enchevêtrements de dépendances :** Un réseau d’imports et d’exports si dense que tracer l’exécution nécessite un grand tableau blanc et plus de patience que la fonctionnalité ne le mérite. Des fichiers importés une seule fois restent là, faisant semblant d’être réutilisables.  
-   **Trahison des tests :** Les tests deviennent fragiles, des sentinelles hyper‑spécifiques qui gardent des détails d’implémentation minuscules. Modifier la signature d’une fonction ? Regardez des dizaines de tests s’effondrer comme de la poterie ancienne. La suite de tests passe d’un filet de sécurité à un champ de mines.  
-   **Vélocité disparue :** De simples changements se métastasent en sagas de modifications multi‑fichiers. L’onboarding de nouveaux développeurs implique des semaines à leur remettre cartes et boussoles juste pour trouver où le composant `UserProfile` *vit réellement* cette semaine. Le progrès avance à la vitesse d’un glissement géologique sous le poids écrasant de cette « organisation ».

J’ai contemplé l’abîme de bases de code où une fonctionnalité simple de 100 lignes était vivisée en plus de 15 fichiers, chacun un « pur » petit ange contenant peut‑être une ou deux fonctions. Le rayon d’explosion cognitif de devoir retenir ce désordre dans sa tête annulait totalement tout gain théorique de la séparation. Ce n’était pas plus simple ; c’était juste dispersé.

## III. Le coût de la perfection : impact sur les développeurs

> Nous passons plus de temps à débattre de la structure des fichiers et des conventions de nommage qu’à livrer réellement des fonctionnalités. Est‑ce cela l’Agile ?

<figure class="inset-left">
  <figcaption>Tellement désordonné que ça frôle l’art</figcaption>
![Tellement désordonné que ça frôle l’art](../software-patterns__the-rube-goldberg-architecture.webp "Le motif Rube Goldberg")
</figure>

Cette fragmentation pathologique n’est pas seulement un problème esthétique. Elle modifie la façon dont les développeurs consacrent leur attention :

**Le Drain de Productivité :** Oubliez la dette technique ; il s’agit d’une dette organisationnelle accumulée par une obsession du nesting de répertoires. Chaque petite modification devient une fouille archéologique à travers des couches d’abstraction. Le temps disparaît dans le trou noir du `cd ..` et du `grep`.

**La Taxe de Test :** Au lieu d’apporter de la confiance, la suite de tests devient une source de friction. Des heures s’évaporent à réparer des tests cassés par des refactorings triviaux, des tests trop étroitement couplés aux détails microscopiques qu’ils étaient censés vérifier.

**La Charge Cognitive :** Il existe une limite stricte au nombre de fragments d’information qu’un cerveau humain peut gérer simultanément. Obliger les développeurs à reconstituer le flux du programme à partir d’une douzaine de fichiers dispersés entrave activement la compréhension et rend les changements en toute confiance plus difficiles.

## IV. Adopter le Pragmatism : Une Alternative Pratique

> J’ai suggéré de mettre deux fonctions liées dans le même fichier. La salle a réagi comme si j’avais proposé de supprimer le staging.  
> — Un lecteur puriste en convalescence

La sortie de secours n’est pas d’abandonner le SRP. La réponse consiste à l’appliquer au niveau de signification approprié.

Voici àquoi cela ressemble concrètement :

-   **Se concentrer sur la cohésion, pas sur les atomes :** regroupez les éléments qui *évoluent ensemble* et qui *appartiennent conceptuellement* au même groupe. Un module peut gérer plusieurs aspects liés de l’authentification utilisateur. C’est acceptable. C’est probablement *meilleur* que six fichiers séparés contenant chacun une fonction relative à l’état de connexion.
-   **Garder les proches ensemble :** ne séparez pas le code lié à moins qu’un bénéfice évident et tangible ne justifie la rupture – comme une réutilisabilité réelle *en pratique*, et non un scénario hypothétique qui n’arrivera jamais. La proximité facilite la compréhension.
-   **Laisser la réalité guider :** organisez-vous en fonction des fonctionnalités et des flux de travail réels de votre application, pas d’un idéal abstrait de pureté fonctionnelle³. Cette structure rend‑elle plus facile ou plus difficile la compréhension et la modification de `Feature X` ?
-   **Penser aux humains :** souvenez‑vous du développeur débordé. Quelle organisation minimise le jonglage mental nécessaire pour travailler sur le code ? Optimisez pour la compréhension humaine.
-   **Tester ce qui compte :** écrivez des tests qui valident le comportement à une frontière sensée, pas des tests collés intimement au câblage interne de chaque petite fonction. Visez la confiance, pas seulement le théâtre du pourcentage de couverture.

<p class="inset">L’objectif n’est pas la perfection théorique digne d’une thèse de doctorat ; il s’agit de créer du code que vos collègues (et votre futur vous) peuvent parcourir, comprendre et modifier sans avoir envie de mettre le bâtiment le feu.</p>

Parfois cela signifie qu’un fichier fait 200 lignes au lieu de 50. Parfois une fonction récupère des données *et* les transforme légèrement. Parfois une classe possède deux responsabilités si étroitement couplées qu’elles doivent rester ensemble. Si cela rend le système globalement plus facile à manipuler, c’est probablement le bon choix.

Restez implacablement focalisé sur les questions pratiques :
- Quelqu’un de nouveau peut‑il s’y retrouver ?
- Pouvons‑nous modifier `X` sans casser le `Y` sans rapport ?
- Ce test indique‑t‑il réellement si la fonctionnalité fonctionne ?
- Livrons‑nous de la valeur, ou nous contentons‑nous de réarranger des dossiers ?

## V. Conclusion : Favoriser un code cohésif et maintenable

Le principe de responsabilité unique est un outil utile. Ce n’est pas une injonction de pulvériser votre base de code en poussière atomique. Comme tout outil, sa valeur dépend du jugement de la personne qui l’utilise.

Donc, quand vous tombez sur les « Single‑Purpose People », prêts à déclarer la guerre à toute fonction osant dépasser trois lignes, prenez une respiration. Souvenez‑vous de la case à cocher des 12 fichiers.

Notre mission n’est pas de concevoir des fonctions théoriquement immaculées, des flocons de neige. Notre mission est de construire un logiciel qui fonctionne, qui résout des problèmes, et qui ne punit pas la prochaine personne qui devra le toucher.

Restez pragmatique. Concentrez‑vous sur les résultats. Ne laissez pas la quête de la pureté parfaite devenir l’ennemi d’un code maintenable. Votre santé mentale, et la vélocité de votre équipe, en dépendent.

¹ L’ironie réside dans le fait que parvenir à un véritable « single purpose » aux niveaux les plus bas nécessite une complexité immense cachée juste sous la surface.  

² Nous parlons ici de pureté conceptuelle : l’idée qu’une fonction ne doit faire qu’une seule chose logiquement. Ne confondez pas cela avec le concept de « pure function » de la programmation fonctionnelle, qui implique l’absence d’effets de bord, une notion différente, bien que parfois liée.
````
