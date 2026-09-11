# Translation Candidate
- Slug: how-to-hire-an-ai-engineer-without-getting-burned
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-09-09--how-to-hire-an-ai-engineer-without-getting-burned/fr/index.mdx
- Validation: deferred
- Runtime seconds: 4.91
- Input tokens: 9615
- Output tokens: 4359
- Thinking tokens: unknown
- Cached input tokens: 3456
- Cache write tokens: 0
- Estimated cost: $0.001160
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Comment embaucher un ingénieur IA sans se faire brûler
subTitle: Engagez pour le jugement qui revient.
modified: '2026-09-11'
tags:
  - ai
  - hiring
  - leadership
  - engineering-management
  - evals
  - production
  - security
  - agents
category: Leadership
subCategory: Hiring
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
cover_alt: >-
  Miniature de pont en acier soutenant trois poids orange, avec une sonde de
  mesure sous la travée.
related:
  - llm-evals-are-broken
  - dont-fear-the-model-router
  - evidence-is-the-product
---
Le démonstration fonctionne. Le CV est impressionnant. Tout le monde quitte l’entretien enthousiaste.

Puis quelqu’un demande ce qui se passe si le système émet le même remboursement deux fois.

Le silence est une réponse coûteuse.

Recruter en IA est difficile parce que la partie visible du travail se termine tôt. Une fenêtre de chat qui répond en paragraphes fluides semble terminée. Rien ne indique si le système respecte les permissions, survive à un timeout, ou coûte plus par ticket que l’humain qu’il était censé aider.

Vous n’avez pas besoin de gagner un débat sur les têtes d’attention. Vous avez besoin de suffisamment de preuves pour décider qui pourra prendre ces décisions à votre place.

<blockquote class="breakout">
  <p>Recrutez sur le jugement derrière la démo. Rendez ce jugement observable avant de faire l’offre.</p>
</blockquote>

Voici le processus que j’appliquerais pour un ingénieur qui déploie de l’IA dans un produit : rédiger le résultat attendu, ouvrir un morceau de travail réel, payer une courte session de travail, et noter ce que vous avez réellement vu. Les rôles de recherche et d’infrastructure nécessitent des exercices différents. Commencez par le poste.

---

## Rédiger le poste avant d’acheter le CV

« Nous avons besoin d’un ingénieur IA » est aussi utile que « nous avons besoin de quelqu’un qui gère bien l’argent. » Comptable ? Directeur financier ? La personne qui dit au fondateur d’arrêter d’acheter des domaines ?

Choisissez le problème que vous voulez que la personne prenne en charge.

| Le travail dont vous avez besoin | Preuves à rechercher |
| --- | --- |
| Recherche ou développement de modèle | Expériences, références, choix de données, et un compte‑rendu honnête de ce qui n’a pas fonctionné |
| Ingénierie d’application IA | Un flux de travail utile, intégrations, évaluations, et gestion des échecs |
| Infrastructure IA | Déploiement, capacité, supervision, contrôle des coûts, et récupération sous charge |
| Évaluation et qualité | Cas de test représentatifs, scores défendables, et diagnostic des régressions |
| Ingénierie produit IA | Recherche utilisateur, conception du flux, adoption, et preuve que la fonctionnalité a amélioré le travail |

Une même personne peut couvrir plusieurs lignes. Attendre la même profondeur sur les cinq points transforme une description de poste en une liste de souhaits avec un salaire attaché.

Rédigez le résultat des 90 premiers jours avant d’ouvrir les entretiens. Par exemple :

> Vérifier si un assistant de rédaction de support réduit le temps de traitement sans augmenter les erreurs de politique. Fournir un pilote mesuré, un chemin de révision humaine, et une recommandation pour étendre, réviser ou arrêter.

Cela donne au candidat quelque chose contre quoi pousser, ce qui est l’objectif. Un bon candidat demandera comment le temps de traitement est mesuré, qui possède la politique, et si quelqu’un a vérifié la qualité des réponses humaines actuelles. Un candidat faible dira que cela semble excitant.

Si personne dans votre équipe ne peut juger les preuves techniques, faites appel à un praticien externe pour l’évaluation — et demandez‑lui s’il espère vous vendre l’implémentation par la suite. Sinon, le candidat finit par servir de référence technique à lui‑même, ce qui crée un conflit d’intérêts et une posture moins solide.

## Demandez‑leur d’ouvrir le capot

Un employeur célèbre vous indique où quelqu’un a travaillé. Une démo montre qu’une chose a fonctionné une fois, sur un ordinateur portable, de bonne humeur. Aucun des deux ne vous dit ce que cette personne peut réellement prendre en charge dans votre équipe.

Demandez‑lui de parler d’un projet du début à la fin :

**« Partez d’un projet que vous avez réellement livré. Qu’avez‑vous possédé, qu’est‑ce qui a cassé, et qu’est‑ce qui a changé grâce aux preuves ? »**

Puis suivez une décision tout au long du processus. Quelle a été la première approche ? Qu’ont‑ils mesuré ? Quelle alternative ont‑ils rejetée, et pourquoi ? Qu’a apporté un coéquipier ? Que feraient‑ils différemment aujourd’hui ?

Demandez un artefact : une trace nettoyée d’une exécution échouée, un rapport d’évaluation, un document de conception, un test, une courte revue de code. Une trace n’est rien d’autre que l’enregistrement de ce que le système a fait en chemin vers sa réponse — chaque appel d’outil, chaque nouvelle tentative, chaque suppression silencieuse. C’est la différence entre lire l’essai et voir le travail.

<p class="inset">
Un candidat qui refuse de remettre les données client d’un ancien employeur réussit le test, il ne le rate pas.
</p>

Prenez plutôt un exemple reconstruit, ou utilisez l’exercice partagé ci‑dessous. « Montrez‑moi les preuves » ne doit jamais devenir « apportez‑nous les secrets de quelqu’un d’autre ».

Pour un recrutement en début de carrière, les preuves sont plus petites et c’est acceptable. Ajustez l’étendue attendue et le niveau de supervision au rôle. Vous testez la compréhension et la prise de responsabilité, pas l’accès à des logos célèbres.

## Cinq questions qui méritent le temps d’entretien

Ce sont des amorces d’enquête, pas du trivia. Si mémoriser la réponse suffit pour réussir, la question ne sert à rien.

### 1. « Comment sauriez‑vous si cet agent s’est amélioré ? »

Écoutez la définition du succès dans le vocabulaire du poste : tickets résolus correctement, brouillons qu’un agent envoie réellement, escalades qui n’auraient pas dû se produire. Puis demandez quels échecs un score moyen masquerait, et contre quoi ils compareraient la nouvelle version.

Une bonne réponse rend la mesure inspectable. Demandez‑leur d’esquisser trois cas de test sur le moment et de préciser qui décide si chacun a réussi. Si un modèle note les réponses, demandez comment ils vérifient le correcteur. **« Il a obtenu 94 % » n’est pas une mesure si la même exécution donne 82 % mardi.**[/auto-tune-your-llm-judge]

Le [guide d’évaluation des agents d’Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) souligne la distinction qui doit figurer dans votre entretien : l’enregistrement de ce qu’un agent a fait n’est pas identique au résultat. Un agent qui rapporte « J’ai émis le remboursement » n’est qu’une phrase, pas un remboursement.

### 2. « L’outil a expiré après avoir soumis un remboursement. Et maintenant ? »

« Réessayer » est le mauvais réflexe. L’argent a peut‑être déjà disparu.

Écoutez la vérification du statut de la transaction avant d’agir, l’utilisation d’une clé d’idempotence afin que la seconde tentative se combine à la première, et un chemin d’escalade lorsque l’état est réellement inconnu. Demandez qui voit l’échec et comment le travail reprend ensuite. Le vocabulaire importe moins que la capacité de leur conception à facturer un client deux fois pour une même erreur.

### 3. « Que peut lire, modifier et dépenser ce système ? »

Demandez la frontière : quels enregistrements le système peut‑il lire, quelles actions il peut entreprendre, où une approbation humaine est requise, et quoi empêche une boucle de tourner toute la nuit sur votre carte de crédit.

Puis demandez où cette frontière est appliquée. Un simple rappel au modèle d’être prudent n’est qu’un pare‑feu constitué de texte de politique — l’intention est là, l’application ne l’est pas. Faites‑leur dessiner la frontière et proposer un test qui tente de la franchir.

Incluez l’exposition des données pendant que vous y êtes : ce qui quitte le fournisseur du modèle, ce qui est écrit dans les journaux, et qui peut lire ces journaux. « Nous journalisons tout » est une conversation de conformité qui ne demande qu’à éclater.

### 4. « Quelle partie construiriez‑vous sans LLM ? »

Un ingénieur compétent peut retirer l’IA d’une partie de sa propre proposition. Les règles d’éligibilité, les calculs arithmétiques et les vérifications d’autorisations ont des implémentations ennuyeuses qui ne hallucinent jamais. L’interprétation de ce qu’un client frustré voulait dire, si.

Demandez ce que le modèle vous apporte dans ce flux de travail précis et quelles preuves justifieraient la surface de défaillance supplémentaire. Si chaque boîte du diagramme nécessite un agent, demandez un diagramme plus petit.

### 5. « Parlez‑moi d’une approche que vous avez abandonnée ? »

Écoutez l’observation qui a changé leur avis. Les utilisateurs voulaient de la recherche, pas du chat. Le modèle plus cher a réduit le coût total de traitement. La fonctionnalité ne valait pas d’être déployée et ils l’ont reconnu.

Un résultat négatif sincère l’emporte sur une histoire de succès polie, car une histoire de succès révèle rarement une règle de décision. Demandez ce qu’ils ont cessé de faire, et combien de temps cela leur a pris.

## Payer pour une petite session de travail

Utilisez un exercice limité et rémunéré sur des données synthétiques. Envoyez le brief et les critères d’évaluation à l’avance — vous recrutez pour le jugement, pas pour la capacité à être pris au dépourvu. Laissez les candidats utiliser les outils qu’ils utiliseraient sur le poste, IA incluse, puis demandez‑leur d’expliquer et de vérifier ce qui a été produit.

Une session illustrative de 90 minutes pour un ingénieur d’application :

> Vous héritez d’un assistant de support qui rédige des réponses et propose des remboursements. Voici douze tickets synthétiques, un court document de politique, et quatre exécutions enregistrées. Une réponse cite une politique que nous avons retirée en mars. Une demande de remboursement dépasse le délai. Un ticket demande les informations d’un autre client. Recommandez si nous devons étendre le pilote, et montrez‑moi une petite amélioration ou un test.

Quinze minutes pour clarifier l’objectif, quarante‑cinq pour creuser, trente pour expliquer la recommandation. Fournissez‑leur un environnement préparé afin que l’exercice ne devienne pas secrètement un test de `npm install`. Prenez en compte les besoins d’accès, et maintenez des conditions équivalentes pour tous les candidats.

Vous observez quelles questions ils posent, quelles preuves ils ouvrent, et quel risque ils abordent en premier. Remarquent‑ils que douze tickets ne permettent pas d’établir la fiabilité ? Peuvent‑ils livrer une correction ciblée sans prétendre que le système est désormais parfait ? Peuvent‑ils dire ce qui devrait se passer la semaine prochaine ?

Le candidat qui ajoute un test qui échoue pour le remboursement en double vous aura peut‑être davantage renseigné que celui qui a livré une belle interface de chat.

Utilisez les mêmes questions de base et les mêmes critères d’évaluation pour chaque personne du poste — c’est la structure fondamentale derrière les [directives d’entretien structuré](https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/) du Bureau de la gestion du personnel des États‑Unis, et cela existe pour que votre panel compare les candidats plutôt que leurs « vibes ». Gardez l’exercice proche du vrai travail. La frontière entre un échantillon de travail et du conseil gratuit est plus fine que la plupart des responsables du recrutement le pensent, et les candidats peuvent la percevoir depuis l’autre bout de la salle.

## La fiche d’évaluation du recrutement

Copiez ceci dans le document d’entretien. Convenez du niveau requis pour chaque dimension **avant** de rencontrer qui que ce soit, car la barre monte dès que vous appréciez quelqu’un. Chaque intervieweur note de façon indépendante avant le debrief et joint une observation concrète à chaque note.

Utilisez **1 = non supporté ou fondamentalement erroné**, **2 = fonctionnel avec une guidance substantielle**, **3 = solide dans le périmètre du rôle**, **4 = jugement solide plus vérification démontrée**. Utilisez **N/O = non observé** lorsque l’entretien n’a jamais produit de preuve. N/O représente une lacune à combler, pas un zéro à moyenner.

| Dimension | Preuve qui mérite un 3 | Score / preuve observée |
| --- | --- | --- |
| Jugement technique | Choisit une conception proportionnée et explique une alternative rejetée | ___ / ___ |
| Jugement produit | Définit un résultat utilisateur, une base de référence, et une raison d’arrêter | ___ / ___ |
| Évaluation | Propose des cas représentatifs et vérifie les résultats, pas seulement des réponses fluides | ___ / ___ |
| Discipline de production | Gère les échecs partiels, la récupération, la surveillance, le coût et la latence | ___ / ___ |
| Sécurité | Identifie les données sensibles et explique les limites d’accès et de dépense applicables | ___ / ___ |
| Communication | Exprime clairement l’incertitude et explique les conséquences à un décideur | ___ / ___ |
| Responsabilité | Distingue son travail de celui de l’équipe et suit les échecs jusqu’à leur résolution | ___ / ___ |

Il s’agit d’un outil d’aide à la décision, pas d’un prédicteur validé de la performance au poste. Calibrez‑le à votre rôle et confrontez‑le à ce qui se passe réellement après l’arrivée des personnes — sinon vous affinez un juge que vous n’avez jamais noté.

Pour quelqu’un qui sera seul responsable de la production, je veux des preuves solides dans chaque dimension essentielle. Un total élevé ne doit jamais masquer une faiblesse non résolue au niveau des permissions ou de la récupération ; ce sont les deux qui vous factureront plus tard. Pour un ingénieur en développement, notez le soutien dont il aura besoin et le nom de la personne qui le fournira.

Clôturez le debrief avec trois phrases : **Qu’est‑ce que cette personne peut posséder ? Quel soutien lui faut‑il ? Qu’est‑ce qui reste incertain ?** Un panel qui ne peut pas répondre à ces questions est sur le point d’avoir une conversation de quarante minutes sur la présence exécutive.

## Les signaux d’alarme méritent une question supplémentaire

Soyez vigilant lorsqu’un candidat ne peut pas séparer sa contribution de celle de l’équipe, traite chaque projet passé comme un succès ininterrompu, ou répond aux questions de mesure avec des adjectifs. « Très précis » nécessite un dénominateur.

Autres signaux d’alarme : des agents apparaissent dans la conception avant que le problème ne soit compris ; le coût d’exploitation n’a pas de plafond ; la récupération d’échec appartient à une autre équipe ; la sécurité vit entièrement dans le prompt.

Interrogez une fois avec un scénario concret avant de tirer des conclusions. Un terme inconnu n’est pas un concept manquant, et de nombreux ingénieurs solides ont appris les idées sous d’autres noms. Accordez du crédit lorsqu’une personne corrige sa propre erreur en plein réponse. Refuser de mettre à jour après avoir vu des preuves contradictoires est le geste disqualifiant — demander un moment de réflexion silencieux ne l’est pas.

## Déjà inquiet du recrutement ? Auditez le travail d’abord

Un projet IA en difficulté ne prouve pas que vous avez embauché le mauvais ingénieur. Le mandat a pu être impossible, les données inutilisables, ou la direction avoir promis une autonomie totale lors d’une keynote avant que quiconque ne mesure la qualité.

Avant de commander une réécriture, conservez le code, la configuration, les résultats d’évaluation et les journaux pertinents sous des contrôles d’accès appropriés. Puis identifiez quels comptes, services et clés API l’entreprise contrôle réellement — c’est souvent là que les équipes découvrent que toute la chaîne s’exécute sur le compte de facturation personnel d’une seule personne.

Obtenez une lecture indépendante de quelques flux de travail représentatifs. Qu’est‑ce qui fonctionne ? Qu’est‑ce qui échoue ? Quelles affirmations se reproduisent ? Restreignez les actions à risque pendant que le comportement incertain est investigué, et classez le travail en à conserver, à réparer ou à remplacer.

Demandez un court plan de récupération avec des tests d’acceptation, des propriétaires nommés et une date de décision. « Nous avons besoin d’un nouveau cadre » est une proposition à examiner, pas un diagnostic.

## Autorisez le nouvel embauché à décevoir la feuille de route

Rien de tout cela ne fonctionne si votre entreprise punit le jugement qu’elle vient de passer six semaines à sélectionner.

L’ingénieur qui dit « l’approbation humaine reste à cette étape » ou « le pilote ne justifie pas encore l’expansion » a besoin d’un leader capable de l’entendre devant les autres. Embauchez sur la base de preuves, puis enterrez les constats inconfortables, et vous avez construit une machine coûteuse pour produire les réponses que vous vouliez déjà.

Alors, pour le prochain poste en IA : rédigez le résultat attendu, utilisez la fiche d’évaluation et observez le candidat se plonger dans quelque chose d’imparfait.

Vous cherchez la personne capable de vous démontrer que le système est prêt — et qui vous dira, à haute voix, le jour où il ne l’est pas.
````
