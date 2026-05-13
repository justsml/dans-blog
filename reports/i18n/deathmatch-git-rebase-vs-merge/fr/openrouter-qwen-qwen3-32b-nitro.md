# Translation Candidate
- Slug: deathmatch-git-rebase-vs-merge
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/fr/index.mdx
- Validation: passed
- Runtime seconds: 19.86
- Input tokens: 7446
- Output tokens: 7231
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002331
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Affrontement : Git Rebase contre Merge'
subTitle: Une question éternelle...
date: '2023-08-27'
modified: '2024-07-28'
tags:
  - engineering
  - git
  - rebase
  - merge
category: Thoughts
subCategory: Git
cover: ../casper-johansson-GBHnQXbY2Ts-unsplash-cropped.webp
cover_mobile: ../w300_casper-johansson-GBHnQXbY2Ts-unsplash-cropped.webp
cover_icon: ../icon_casper-johansson-GBHnQXbY2Ts-unsplash-cropped.webp
---
## Deathmatch : Git Rebase vs (Squash) Merge !  

Dois-je utiliser Rebase ? Ou Squash Merge ?  

- Est-ce une préférence personnelle ?  
  - _Réponse : Pas quand une ou plusieurs équipes sont impliquées ! **Chacun de ces choix aura un impact sur l'utilisabilité de l'autre !**_  

### Pourquoi ce sujet suscite-t-il une telle passion ?  

Certains ingénieurs utilisent leurs connaissances en git (& le terminal) comme un indicateur de leur niveau de compétence relatif. Et toute pratique liée à notre identité/égo peut être impossible à analyser impartialement, sans parler de les changer.  

D'autres facteurs incluent probablement la Familiarité & le biais de survie, qui peuvent encore embrouiller notre propre évaluation & hypothèses.

<!-- Croyance mal placée dans la vertu intrinsèque des processus de certains projets OSS. (Le noyau Linux utilise le rebase, et si tu ne le fais pas, **_Es-tu mÊme un vRaI eNgInEur?!_**) -->

### Question clé : Quel est l'objectif d'un commit Git ?

1.  Faites-vous des commits tôt et souvent ? Avec une mentalité de "checkpoint" ou de sauvegarde ?
    - Où chaque action est enregistrée, même les erreurs et les expériences ? (ex. `git commit -am "Updated deps" && git push`, répété régulièrement)
    - Les messages de commit sont-ils moins importants que le code pour vous ?
1.  Ou vos commits sont-ils une œuvre soigneusement conçue, taillée dans le marbre ?
    - Chaque commit est-il une unité atomique et autonome de travail ? (ex. `git add package.json && git commit -m "Updated deps"`)
    - Ou encore, supportez-vous difficilement les historiques de commits "sales" ?
    - Revoyez-vous souvent les commits un par un lors des reviews de PR ?

| 💡 Quels autres modèles mentaux définissent votre vision des commits ? Dites-le-moi @justsml !

Pensez-vous à Git d'une manière qui **apporte la plus grande valeur** à vous, votre équipe et votre organisation ?

<!-- Ce qui fonctionne pour un projet Open Source comme Postgres, ou le noyau Linux, n'est peut-être pas le meilleur choix pour vous ou votre équipe. -->

Étant donné qu'il existe des mentalités très différentes concernant la stratégie de commit, il n'est pas surprenant qu'il y ait tant de confusion quant à la « bonne » façon d'utiliser Git.

### Scénario : Créer un tag de version révisé

Comparons le processus de création d'un tag de version excluant certains commits récents sur `main`.

![Git Tag Releasing depuis main avec 2 branches de fonctionnalités](../git-branching-with-main-simplified.svg)

### La méthode Rebase

Modèle mental : « Je veux créer une version alternative d'une histoire existante. (e.g. J'ai fait une erreur 16 merges plus tôt, et pourrais avoir besoin d'un contrôle granulaire pour la corriger. Risque d'être coincé dans un cycle apparemment infini de conflits & `--continue`.) »

1.  Récupérer la dernière version : `git checkout main` && `git pull`  
2.  Créer une nouvelle branche : `git checkout -b release/hot-newness-and-stuff`  
3.  Démarrer un rebase interactif et inclure la référence git pour le point où vous souhaitez remonter dans l'historique. `git rebase -i HEAD~6` (Remarque : `HEAD~6` est l'abréviation de `6 commits plus tôt`)  
4.  Supprimer les commits souhaités en modifiant leur préfixe en `drop`. Enregistrer et fermer l'éditeur.  
5.  Résoudre les conflits, `git add .` && `git rebase --continue` (Ne pas utiliser `git commit`).  
6.  Répéter l'étape précédente jusqu'à la fin.  
7.  Étiqueter/push avec le processus actuel. Exemple : `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`  

#### Avantages  

- 🔌 Pouvoir absolu. Vous pouvez modifier l'historique.  
  <!-- - 🎭 Pratiquez vos compétences en Engineering Theater. -->  

#### Inconvénients  

- 😰 Pouvoir absolu. Vous pouvez modifier l'historique. (Ok, un Avantage et un Inconvénient...)  
- 🔂 Vous pouvez finir dans un cycle apparemment infini de conflits & `--continue`. (Parfois même avec `git rerere`)  
- 🙀 Rend inutilisables des fonctionnalités clés de collaboration : commentaires de PR perdus/orphelins. Impoli.  
- 🖇️ Les liens permanents peuvent ne plus l'être.  

### La méthode (Squash) Merge

Modèle mental : « Je veux une version personnalisée, commençant à un point donné, et incluant toute(s) la(s) branche(s) souhaitée(s). »

1.  Récupérer les dernières modifications : `git checkout main` && `git pull`
2.  Créer une nouvelle branche : `git checkout -b release/hot-newness-and-stuff`
3.  Fusionner les branches/commits souhaités : `git merge --no-ff feature/hot-newness bug/fix-123` (utiliser l'indicateur `--no-ff` lorsque c'est possible.)
4.  Résoudre tout conflit de fusion (s'il survient).
5.  Étiqueter/push avec le processus actuel. Exemple : `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

#### Avantages

- 💪 Moins de processus, moins de conflits globalement, et utilise les connaissances existantes sur les commandes git.
- 🚀 Permet de penser au niveau des PR/branches, en ignorant la granularité des commits (sauf nécessité.)
- 🦺 Non destructif. Vous pouvez revenir en arrière et/ou créer de nouvelles branches à tout moment.
- 🎥 Conserve les commits et messages existants tels quels, ce qui réduit le bruit dans l'historique.

#### Inconvénients

- 🔏 Plus difficile de modifier les messages de commit.
- 🤐 Plus difficile de cacher votre travail.

### Conclusion

À la fin, **un processus plus simple avec moins de risques devrait l’emporter.**

<!-- La **fusion avec compression** est clairement la gagnante ici. C’est **plus simple** et **moins propice aux erreurs**. Elle **préserve également l’historique des commits existants**. C’est un **énorme avantage** pour la **collaboration** et la **revue de code**. -->

<!-- Inclure un diagramme d’un flux de rebase avec 2 branches de fonctionnalité -->

Bien que les _Rebasers_ aient effectivement des moyens de résoudre (ou d’éviter) leurs problèmes, **le fait reste : vous devrez finalement maîtriser le git**. (Par exemple, même un modeste `git push` peut rencontrer une complexité supplémentaire : s’agissait-il de `git push --force` ou de `git push --force-with-lease` ? Pourquoi s’encombrer de cela ?)

Il y a une autre raison pour laquelle **le rebase** pour créer un historique révisé **sera toujours en désavantage** par rapport à **`git merge ...`**. Un `git merge` permet à l’interface CLI de `git` d’appliquer des algorithmes avancés pour éviter les conflits en analysant chaque HEAD de branche.

Cela peut être plus intelligent car chaque fusion ne prend en compte que l'état le plus récent de chaque branche souhaitée. En revanche, **le rebase doit rejouer (ou supprimer) l'historique des commits dans l'ordre** spécifié. Cela **limite la capacité de `git` à optimiser** la fusion puisqu'il **n'compare que 2 commits à la fois**.

Au final, **le rebase signifie que vous rencontrerez parfois des anciens commits et conflits irrelevants** – même si vous savez qu'ils ont été supprimés ou résolus depuis.

### Résumé

- 💃 Réponse : **FUSEZ AVEC ÉCRASEMENT (SQUASH MERGE)** vos PR sur `main`.
  - L'historique de votre branche sera disponible si nécessaire, et `main` restera relativement "propre".
- _🔤 Commitez Toujours !_
  - Dans >95 % des projets d'entreprise, la "mentalité de sauvegarde" est préférable à la "mentalité d'art sculpté". Avec le temps, la signification de vos messages de commit s'estompera plus rapidement que la logique et les tests du code, qui conserveront leur importance.

<!--

- Vous pouvez utiliser le séparateur spécial "--" avec `git checkout` pour rester sur la branche actuelle tout en copiant les fichiers spécifiés :  
- `git checkout feature/half-a-feature **--** <folder or file path>`  
- Assurez-vous d'avoir committé toutes les modifications que vous souhaitez conserver avant d'exécuter cette commande, car cela écrasera toutes les modifications locales.
````
