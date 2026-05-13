# Translation Candidate
- Slug: honest-priorities
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-23--honest-priorities/fr/index.mdx
- Validation: passed
- Runtime seconds: 16.63
- Input tokens: 7272
- Output tokens: 1857
- Thinking tokens: unknown
- Cached input tokens: 1792
- Cache write tokens: 0
- Estimated cost: $0.000618
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Le piège de la priorité
subTitle: Le choix multiple est‑il le meilleurchoix ?
category: Thoughts
subCategory: Agile
date: '2024-10-23'
modified: '2024-10-24'
tags:
  - agile
  - leadership
  - priority
  - backlog
  - jira
cover: ../new-priority-city.webp
cover_full_width: ../new-priority-city.webp
cover_mobile: ../new-priority-city-w300.webp
cover_icon: ../new-priority-city-w200.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@mroz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Filip
  Mroz</a> on <a
  href="https://unsplash.com/photos/photo-of-tram-beside-waiting-station-during-nighttime-023T4jyCRqA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
---
## Le piège du menu déroulant `Priority`

<aside className="breakout">
💡 À mesure qu’une organisation grandit, son backlog gonfle inévitablement. Au bout du compte, la taille de la liste *exige* une priorisation.
</aside>

## Une histoire de startup

Invariablement, vos administrateurs Jira proposeront une solution : voilà un champ déroulant `Priority` ! (Astuce pro pour les devs d’entreprise : il peut s’appeler `Priority2` ou `P-level`.)

Curieusement, 100 % des entreprises se limitent à `P1, P2, P3, P4` ou `Low, Med, High, and Critical` — apparemment il n’existe pas d’autres options.

Une liste codée en dur de quatre choix ? D’accord. Testons cela pendant quelques semaines…

### 2 jours plus tard

Dans un revirement *choquant pour personne*, l’organisation a découvert un ticket avec une priorité supérieure, obligeant à un petit bricolage : ajouter `P0`, ou `Critical Max+` !

### 3 jours de plus

*Notre intrépide patron a eu des réunions et des découvertes passionnantes à la conférence !*

Il a fini par dénicher une priorité encore plus haute que `P0` !

Depuis, l’équipe travaille d’arrache‑pied à déterminer comment nommer cette nouvelle priorité.

Peut‑être `-1` ? Non, non. C’est trop confus (`P-1` vs. `P1`). D’accord, que diriez‑vous de `P0.5`, non ?

<p className="breakout">Dans un moment « inspiré », l’équipe a inventé une priorité supérieure : le double zéro !<br />Désormais appelée la priorité `P00`.</p>

{/* *Enfin, nous pouvons classer proprement tout le monde dans notre menu déroulant Priorités ! (…rire diabolique…)* */}

### Avant la crue

Avant que quiconque ne s’en rende compte, votre équipe se retrouve submergée de tickets `P00` !

<b>Comment éviter ce jeu stupide de théâtre d’ingénierie ?</b>

## Et si la priorité n’était pas un choix multiple ?

Comment mieux représenter un concept humain en perpétuel changement et fluide comme la `Priority` ?

- Dans le monde réel, les priorités bougent constamment et évoluent en fonction de nouvelles informations, de changements de marché et des objectifs organisationnels.  
- Il existe souvent une interaction complexe entre l’urgence, l’importance, la disponibilité des ressources et l’analyse coût/risque qu’un simple menu déroulant ne peut saisir, surtout sur le long terme. (Dégradation des tickets.)  
- Différents acteurs peuvent avoir des avis contradictoires sur ce qui constitue une haute priorité, rendant une approche « taille unique » inadaptée.

## Et après ?

Plusieurs approches alternatives méritent d’être étudiées, du moindre au plus coûteux :

- Pour offrir plus de marge de manœuvre, choisissez une valeur de départ « neutre », par exemple 100 ou 1 000. Vous pourrez toujours augmenter ou diminuer le nombre.  
    - Ou partez de zéro, où les nombres plus élevés indiquent une priorité plus forte.  
- Mettez en place un système de priorisation multidimensionnel qui prend en compte des facteurs tels que la valeur métier, l’urgence et l’effort requis. (Créez un score `composite` pour faciliter le tri et le filtrage.)  
- Adoptez une méthode de priorisation dynamique, comme la [technique MoSCoW](https://en.wikipedia.org/wiki/MoSCoW_method) (Must have, Should have, Could have, Won’t have), permettant une réévaluation régulière. (Voir aussi le [Modèle Kano](https://en.wikipedia.org/wiki/Kano_model).)

## Résumé

On accorde beaucoup d’importance à la Priorité alors même qu’elle se dégrade rapidement. Les tickets `CRITICAL` d’hier ne seront probablement pas les tickets `CRITICAL` du trimestre prochain.

Avec le temps, les tickets à haute priorité deviennent récalcitrants au nettoyage et à la maintenance. Après tout, qui veut baisser la `Priority` d’un élément déjà déclaré ***essentiel*** ? Sans parler de supprimer ces tickets soi‑disant inutiles… (Ouf ! Imaginez le backlog !)

J’ai constaté que de nombreuses entreprises confondent `Severity` et `Priority`. `Severity` décrit l’***urgence*** (ou la sensibilité au temps).

`Priority ≠ Severity`. Il peut être judicieux de définir 3 à 5 niveaux de sévérité (souvent utilisés pour respecter les accords de niveau de service).

Les niveaux d’urgence aident à communiquer un `impact client nul` à une `panne partielle/compltète du service`.

## Un mot d’avertissement

Déployer un champ **Priority** sans borne nécessite un peu de planification et de discipline !

Si vous avez déjà fait du développement front‑end, vous avez sans doute vécu une guerre de `z-index`.

En pratique, le `z-index` permet aux designers d’attribuer *n’importe quel* entier positif pour garantir que leurs widgets s’affichent « au‑dessus » du contenu avec un `z-index` inférieur.

Même une mise à jour mineure d’un composant peut introduire un changement de `z-index` sur son `<Dialog />` – le rendant soudainement invisible. Ces situations peuvent rapidement devenir désordonnées lorsque nos composants tiers, le travail de nouvelles fonctionnalités et les contributions d’autres équipes tentent de s’out‑`z-index` les uns les autres.

Le `z-index` était autrefois limité à environ 32 000. Cependant, j’ai récemment vu un extrait avec un milliard `z-index: 1000000000` !

L’inflation doit frapper durement le `z-index`.

## Discussion

- Est‑ce une expérience de pensée valable ?
- L’idée d’une priorité qui ne cesse de croître est‑elle effrayante ? Induisante d’anxiété ?
- Est‑ce inévitable que cette approche dépasse finalement les limites d’un entier 64 bits ?
- D’autres champs (au‑delà de `Severity` ou `Urgency`) peuvent‑ils enrichir la discussion ?
- Quelle part de responsabilité revient à Jira ? Ou au contraire, quel crédit lui attribuer ?

Nous pourrions crier sur Internet : « Qui va nettoyer tous ces tickets `P00` ? »

Ou bien, vous pouvez être ***sérieux*** à propos de votre backlog.

- Acceptez que 90 % de vos 1 000 tickets ne seront jamais réalisés. C’est correct.
- Archivez les tickets qui n’ont pas été touchés depuis des mois. Toute priorité/urgence initiale n’est plus pertinente. De toute façon, les tickets archivés sont souvent récupérables.
- Quand un ticket refait surface, c’est acceptable ; il a simplement vu sa priorité augmenter.
- Anecdotiquement, je n’ai constaté aucun dommage à supprimer les tickets anciens et incomplets.
- Empiler indéfiniment un backlog‑comme‑une‑base‑de‑données fait perdre l’opportunité de concentrer votre équipe et votre organisation sur ce qui compte réellement (les choses qui nous attendent). Les backlogs, par nature, regardent en arrière.
- Un backlog profond finit par ressembler à une salle de trophées Bizzaro, célébrant le bazar que vous n’expédierez jamais.
````
