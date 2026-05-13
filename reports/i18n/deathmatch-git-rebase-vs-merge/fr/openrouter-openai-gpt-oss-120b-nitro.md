# Translation Candidate
- Slug: deathmatch-git-rebase-vs-merge
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/fr/index.mdx
- Validation: passed
- Runtime seconds: 11.15
- Input tokens: 8642
- Output tokens: 2460
- Thinking tokens: unknown
- Cached input tokens: 1792
- Cache write tokens: 0
- Estimated cost: $0.000780
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Deathmatch : rebase Git vs merge'
subTitle: Une question intemporelle…
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
## Deathmatch : Git Rebase vs. (Squash) Merge !

Dois‑je faire un rebase ? Ou un squash‑merge ?

- Est‑ce une préférence personnelle ?
  - _Réponse : Pas quand une ou plusieurs équipes sont concernées ! **Chaque choix affecte l’utilisabilité** de l’autre !_

### Pourquoi ce sujet suscite‑t‑il une ferveur religieuse ?

Certains ingénieurs utilisent leur connaissance de git (et du terminal) comme un signal de leur niveau de compétence relatif. Et toute pratique liée à notre identité/ego devient impossible à analyser de façon impartiale, sans parler du changement.

D’autres facteurs, comme la familiarité et le biais de survivant, viennent souvent compliquer notre propre évaluation et nos hypothèses.

<!-- Croyance déplacée dans la vertu inhérente des processus de certains projets OSS. (Le noyau Linux utilise le rebase, et si vous ne le faites pas, **_ÊtEs‑Tu Même Un VéRaiS eNgInIeUr ?!_**) -->

### Question clé : Quel est le but d’un commit git ?

1.  Commitez‑vous tôt et souvent ? En adoptant une mentalité de « point de contrôle » ou de sauvegarde ?
    - Où tout est enregistré, même les faux départs et les expérimentations ? (par ex. `git commit -am "Updated deps" && git push`, répéter régulièrement)
    - Peut‑être les messages de commit sont moins importants que le code pour vous ?
2.  Ou bien vos commits sont‑ils une œuvre d’art soigneusement sélectionnée et sculptée ?
    - Peut‑être chaque commit est une unité de travail autonome et atomique ? (par ex. `git add package.json && git commit -m "Updated deps"`)
    - Ou bien vous ne supportez tout simplement pas les journaux de commit « désordonnés » ?
    - Vos revues de PR impliquent‑elles souvent une analyse commit par commit ?

| 💡 Quels autres modèles mentaux définissent votre vision des commits ? Faites‑le moi savoir @justsml !

Pensez‑vous à git d’une manière qui **apporte le plus de valeur** à vous, votre équipe et votre organisation ?

<!-- Ce qui a du sens pour un projet Open Source comme PostgreSQL ou le noyau Linux n’est pas forcément le meilleur choix pour vous ou votre équipe. -->

Étant donné la grande diversité de mentalités autour de la stratégie de commit, il n’est pas surprenant qu’il y ait tant de confusion quant à la « bonne » façon d’utiliser git.

### Scénario : Créer un tag de version révisé

Comparons le processus de création d’un tag de version en excluant certains commits récents de `main`.

![Git Tag Releasing from main with 2 feature branches](../git-branching-with-main-simplified.svg)

### La méthode Rebase

Modèle mental : « Je veux créer une version alternative d’un historique existant. (par ex. j’ai fait une boulette il y a 16 merges, et j’ai besoin d’un contrôle fin pour la corriger. De plus, je risque de me retrouver dans un cycle apparemment sans fin de conflits et de `--continue`). »

1.  Récupérez la dernière version : `git checkout main` && `git pull`
2.  Créez une nouvelle branche : `git checkout -b release/hot-newness-and-stuff`
3.  Lancez un rebase interactif en indiquant la référence git du point où remonter. `git rebase -i HEAD~6` (Note : `HEAD~6` est le raccourci git pour « il y a 6 commits »)
4.  Supprimez le(s) commit(s) souhaité(s) en changeant leur préfixe en `drop`. Enregistrez et fermez l’éditeur.
5.  Résolvez les conflits de fusion, `git add .` && `git rebase --continue` (NE PAS faire `git commit`).
6.  Répétez l’étape précédente jusqu’à la fin.
7.  Taggez/poussez en suivant le processus habituel. Exemple `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

#### Avantages

- 🔌 Pouvoir absolu. Vous pouvez réécrire l’historique.
  <!-- - 🎭 Practice your Engineering Theater skills. -->

#### Inconvénients

- 😰 Pouvoir absolu. Vous pouvez réécrire l’historique. (Oui, un pour et un contre…)
- 🔂 Vous pouvez vous retrouver dans un cycle apparemment sans fin de conflits et de `—-continue`. (Parfois même avec `git rerere`)
- 🙀 Rompt des fonctionnalités clés de collaboration : commentaires de PR perdus ou orphelins. Grossier.
- 🖇️ Les permaliens peuvent ne plus être aussi permanents.

### La méthode (Squash) Merge

Modèle mental : « Je veux un livrable personnalisé, à partir d’un point donné, en incluant les branche(s) souhaitées. »

1.  Récupérer la dernière version : `git checkout main` && `git pull`
2.  Créer une nouvelle branche : `git checkout -b release/hot-newness-and-stuff`
3.  Fusionner les branches et/ou commits désirés : `git merge --no-ff feature/hot-newness bug/fix-123` (utilisez le drapeau `--no-ff` quand c’est possible.)
4.  Résoudre les conflits de fusion éventuels.
5.  Taguer/pousser selon le processus habituel. Exemple `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

#### Avantages

- 💪 Moins de processus, moins de conflits au global, et utilisation des connaissances Git déjà acquises.  
- 🚀 Vous permet de raisonner au niveau PR/branche, en ignorant la granularité des commits (sauf si nécessaire).  
- 🦺 Non destructif. Vous pouvez revenir en arrière et/ou créer de nouvelles branches à tout moment.  
- 🎥 Conserve les commits et messages existants dans leur intégralité, ce qui réduit le bruit de « blâme ».

#### Inconvénients

- 🔏 Plus difficile de modifier les messages de commit.  
- 🤐 Plus difficile de masquer votre travail.

### Conclusion

En fin de compte, **un processus plus simple avec moins de risque doit l'emporter.**

<!-- **Squash merge** est le gagnant évident ici. C’est **plus simple** et **moins sujet aux erreurs**. Cela **préserve l’historique des commits existants**. C’est un **avantage majeur** pour la **collaboration** et la **revue de code**. -->

<!-- Inclure un diagramme d’un flux de rebase avec 2 branches de fonctionnalité -->

Même si les _Rebasers_ disposent de méthodes pour résoudre (ou éviter) leurs problèmes, **le fait demeure : vous finirez par devoir obtenir une ceinture noire en git fu.** (par ex. même un simple `git push` peut devenir plus complexe : était‑ce `git push --force` ou `git push --force-with-lease` ? Pourquoi s’en occuper du tout ?)

Il y a une autre raison pour laquelle **rebaser** pour créer un historique révisé **sera toujours désavantagé** par rapport à **`git merge …`**. Un `git merge` permet à l’interface `git` d’appliquer des algorithmes avancés afin d’éviter les conflits en analysant le HEAD de chaque branche.

Cela peut être plus intelligent parce que chaque fusion ne se préoccupe que de l’état le plus récent de chaque branche ciblée, alors que **le rebasage doit rejouer (ou supprimer) l’historique des commits dans l’ordre** indiqué. Cela **limite la capacité de `git` à optimiser** la fusion puisqu’il **ne compare que 2 commits** à la fois.

En fin de compte, **le rebasage vous fera parfois revivre des commits et des conflits obsolètes** – même si vous savez qu’ils ont depuis été supprimés ou résolus.

### Résumé

- 💃 Réponse : **SQUASH MERGE** vos PRs sur `main`.
  - L’historique de votre branche restera disponible si besoin, et `main` restera relativement « propre ».
- _🔤 Commitez toujours !_
  - Dans plus de 95 % des projets d’entreprise, l’« esprit de sauvegarde » l’emporte sur l’« esprit d’art sculpté ». Avec le temps, la signification de vos messages de commit s’estompera bien plus rapidement que le code dont la logique et les tests conserveront leur pertinence.

- Vous pouvez utiliser le séparateur spécial « -- » avec `git checkout` pour rester sur la branche actuelle tout en copiant les fichiers spécifiés :
- `git checkout feature/half-a-feature **--** <folder or file path>`
- Assurez‑vous d’avoir commité toutes les modifications que vous souhaitez conserver au préalable, car cela écrasera toute modification locale.
-->
````
