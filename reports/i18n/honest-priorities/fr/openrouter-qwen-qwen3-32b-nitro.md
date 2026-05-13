# Translation Candidate
- Slug: honest-priorities
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-10-23--honest-priorities/fr/index.mdx
- Validation: passed
- Runtime seconds: 16.27
- Input tokens: 7060
- Output tokens: 5998
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.002004
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: Le QCM est-il le meilleur choix ?
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
💡 À mesure qu'une organisation grandit, elle connaîtra inévitablement une surcharge de tâches croissante. Finalement, la taille de la liste *exigera* une priorisation.  
</aside>  

## Une histoire de start-up  

Sans échec, vos administrateurs Jira proposeront une solution : voici le champ de menu déroulant `Priority` ! (Astuce pour développeurs d'entreprises : il pourrait s'appeler `Priority2` ou `P-level`.)  

Curieusement, 100 % des entreprises choisissent entre `P1, P2, P3, P4` ou `Low, Med, High, and Critical` — apparemment, il n'existe pas d'autres options.  

Une liste de quatre options codée en dur ? D'accord. Essayons cela pendant quelques semaines...

### 2 Jours Plus Tard  

Dans un tournant *choquant pour personne*, l'organisation a découvert un ticket avec une nouvelle priorité plus élevée, nécessitant une astuce mineure : ajouter `P0`, ou `Critical Max+` !  

### 3 Jours de Plus  

*Notre courageux patron a eu quelques réunions passionnantes et découvertes lors du congrès !*  

Quelque part, ils ont découvert une priorité encore plus élevée que `P0` !  

Depuis, l'équipe est la tête dans les livres, recherchant comment étiqueter cette nouvelle Priorité.

Peut-être `-1` ? Non, non. C'est trop confus (`P-1` vs. `P1`). D'accord, et `P0.5` alors, non ?  

<p className="breakout">Dans un moment d'« inspiration », l'équipe a inventé une priorité supérieure : le double zéro !<br />Maintenant connue sous le nom de priorité `P00`.</p>  

{/* *Finally, we can neatly label everything in the world into our Priorities dropdown! (…evil laugh…)* */}  

### Avant l'Inondation  

Avant que tout le monde ne s'en rende compte, votre équipe se noie littéralement dans les tickets `P00` !  

<b>Comment éviter ce jeu absurde du Théâtre de l'Ingénierie ?</b>

## Et si la Priorité n'était pas un choix multiple ?

Comment pourrions-nous mieux représenter un concept humain en constante évolution comme la `Priorité` ?

- Dans le monde réel, les priorités évoluent constamment et changent en fonction de nouvelles informations, des variations du marché et des objectifs organisationnels.
- Il existe souvent une interaction complexe entre l'urgence, l'importance, la disponibilité des ressources et l'analyse coût/risque qu'un simple menu déroulant ne peut capturer, surtout à long terme. (Ticket rot.)
- Différentes parties prenantes peuvent avoir des visions contradictoires sur ce qui constitue une priorité élevée, rendant une approche unique inadaptée.

## Et maintenant ?

Plusieurs approches alternatives méritent d'être explorées, classées du plus simple au plus complexe :

- Pour offrir plus de marge de manœuvre, choisissez une valeur de départ "neutre", par exemple 100 ou 1 000. Vous pouvez toujours augmenter ou diminuer ce chiffre.
    - Ou restez à zéro en départ, où les nombres plus élevés correspondent à une priorité plus élevée.
- Implémentez un système de priorisation multidimensionnel qui prend en compte des facteurs comme la valeur métier, l'urgence et l'effort requis. (Créez un score `composite` pour simplifier le tri et le filtrage.)
- Adoptez une méthode de priorisation dynamique, comme la [technique MoSCoW](https://en.wikipedia.org/wiki/MoSCoW_method) (Must have, Should have, Could have, Won't have), permettant une réévaluation régulière. (Voir également le [Modèle Kano](https://en.wikipedia.org/wiki/Kano_model).)

## Résumé

Beaucoup d'importance est accordée à la Priorité, malgré son taux rapide de dégradation. Les tickets `CRITICAL` d'hier ne seront probablement pas les tickets `CRITICAL` du prochain trimestre.

Au fil du temps, les anciens tickets à haute priorité deviennent résistants à la nettoyage et à l'entretien. Après tout, qui voudrait réduire la `Priority` de quelque chose déclaré ***essentiel*** ? Sans même parler de supprimer ces tickets désormais irrelevants… (Oh mon Dieu ! Pensez au backlog !)

J'ai vu plusieurs entreprises confondre `Severity` & `Priority`. La `Severity` décrit l'***urgence*** (ou la sensibilité au temps).

`Priority ≠ Severity`. Il peut être pertinent de définir 3 à 5 niveaux de sévérité (souvent utilisés pour maintenir les Accords de Niveau de Service).

Les niveaux d'urgence aident à communiquer du `zero impact client` à une `interruption partielle/complète du service`.

## Un mot de prudence  

Déployer un champ de priorité non borné nécessite un peu de planification et de discipline !  

Si vous connaissez le développement front-end, vous avez peut-être vécu une guerre de `z-index`.  

En substance, le `z-index` permet aux designers de définir *n'importe quel* entier positif pour s'assurer que leurs widgets s'affichent « au-dessus » du contenu à `z-index` inférieur.  

Même une mise à jour mineure d'un composant pouvait introduire un changement dans le `z-index` de leur `<Dialog />` - le rendant soudainement invisible. Ces situations pouvaient devenir chaotiques lorsque nos composants tiers, travaux fonctionnels et autres contributions d'équipe essayaient de se surpasser en `z-index` les uns les autres.  

Le `z-index` était autrefois limité à ~32 000. Cependant, j'ai récemment vu un extrait avec un milliard de `z-index: 1000000000` !

L'inflation doit vraiment toucher le `z-index` de plein fouet.

## Discutons

- Est-ce une expérience de pensée pertinente ?
- L'idée d'une Priorité en constante augmentation est-elle terrifiante ? Anxiogène ?
- Est-il inévitable que cette approche dépasse un jour les limites des entiers 64 bits ?
- D'autres champs (au-delà de `Severity` ou `Urgency`) peuvent-ils enrichir cette discussion ?
- Combien de responsabilité (ou de crédit) mérite Jira ?

On pourrait hurler dans l'Internet : « Qui va nettoyer tous ces tickets `P00` ? »

Ou, vous pouvez devenir ***réel*** face à votre backlog.

- Acceptez que 90 % de vos 1 000 tickets ne seront jamais traités. C’est normal.
- Archivez les tickets inactifs depuis des mois. Leur priorité/urgence initiale n’a plus de sens. De toute façon, les problèmes archivés peuvent souvent être récupérés.
- Quand un problème revient, c’est cool ; il vient juste d’augmenter sa priorité.
- Anecdotiquement, j’ai constaté aucun préjudice en supprimant les tickets plus anciens et incomplets.
- Ajouter indéfiniment à un backlog en tant que base de données manque l’opportunité de concentrer votre équipe et votre organisation sur ce qui compte vraiment. (Les choses qui nous attendent. Alors que les backlogs regardent naturellement vers le passé.)
- Un backlog profond ressemble finalement à une Salle des Trophées Bizzaro, célébrant les conneries que vous ne déployerez jamais.
````
