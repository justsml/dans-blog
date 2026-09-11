# Translation Candidate
- Slug: how-to-hire-an-ai-engineer-without-getting-burned
- Locale: fr
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-09-09--how-to-hire-an-ai-engineer-without-getting-burned/fr/index.mdx
- Validation: deferred
- Runtime seconds: 105.04
- Input tokens: 9409
- Output tokens: 13296
- Thinking tokens: unknown
- Cached input tokens: 4096
- Cache write tokens: 0
- Estimated cost: $0.004478
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Comment embaucher un ingénieur IA sans se brûler
subTitle: ''
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
  Un pont miniature en acier soutenant trois poids oranges, avec une sonde de
  mesure sous sa travée.
related:
  - llm-evals-are-broken
  - dont-fear-the-model-router
  - evidence-is-the-product
---
La démo fonctionne. Le CV est impressionnant. Tout le monde sort de l’entretien excité.

Puis quelqu’un demande ce qui se passe si le système émet deux fois le même remboursement.

Le silence coûte cher.

Recruter dans l’IA est difficile parce que la partie visible du travail se termine vite. Une fenêtre de chat qui répond en paragraphes fluides semble finie. Rien ne vous indique si le système respecte les permissions, survit à un timeout, ou coûte plus cher par ticket que l’humain qu’il était censé assister.

Vous n’avez pas besoin de gagner un débat sur les têtes d’attention. Vous avez besoin d’assez d’éléments pour décider qui aura la propriété de ces décisions en votre nom.

<blockquote class="breakout">
  <p>Embauchez pour le jugement derrière la démo. Rendez ce jugement observable avant de faire l’offre.</p>
</blockquote>

Voici le processus que je suivrais pour un ingénieur qui livre de l’IA dans un produit : définir le résultat, ouvrir un vrai morceau de travail, payer pour une courte session de travail, et noter ce que vous avez réellement vu. Les rôles en recherche et infrastructure nécessitent des exercices différents. Commencez par le poste.

---

## Écrivez le poste avant d’acheter le CV

« Nous avons besoin d’un ingénieur IA » est à peu près aussi utile que « nous avons besoin de quelqu’un de bon avec l’argent ». Comptable ? Directeur financier ? La personne qui dit au fondateur d’arrêter d’acheter des domaines ?

Choisissez le problème que vous embauchez quelqu’un pour posséder.

| Le travail dont vous avez besoin | Éléments à observer |
| --- | --- |
| Recherche ou développement de modèles | Expériences, références, choix de données et un compte rendu honnête de ce qui n’a pas fonctionné |
| Ingénierie d’application IA | Un workflow utile, des intégrations, l’évaluation et la gestion des échecs |
| Infrastructure IA | Déploiement, capacité, monitoring, contrôle des coûts et reprise après charge |
| Évaluation et qualité | Cas de test représentatifs, score défendable et diagnostic des régressions |
| Ingénierie produit IA | Recherche utilisateur, conception du workflow, adoption et preuve que la fonctionnalité a amélioré le travail |

Une personne peut couvrir plusieurs lignes. S’attendre à une profondeur égale dans les cinq, c’est transformer une description de poste en liste de souhaits avec un salaire attaché.

Écrivez le résultat des 90 premiers jours avant d’ouvrir les entretiens. Par exemple :

> Établissez si un assistant de rédaction de support réduit le temps de traitement sans augmenter les erreurs de politique. Livrez un pilote mesuré, un parcours de relecture humaine et une recommandation pour étendre, réviser ou arrêter.

Cela donne au candidat quelque chose sur quoi réagir, ce qui est le but. Un bon candidat demandera comment le temps de traitement est mesuré, qui possède la politique, et si quelqu’un a vérifié la qualité des réponses humaines actuelles. Un mauvais dira que ça a l’air excitant.

Si personne dans votre équipe ne peut juger les preuves techniques, faites appel à un praticien externe pour l’évaluation — et demandez-lui s’il espère vous vendre l’implémentation ensuite. Sinon, le candidat finit par servir sa propre référence technique, ce qui est un conflit d’intérêts avec une meilleure posture.

## Demandez-leur d’ouvrir le capot

Demandez-leur d’ouvrir le capot

Un employeur célèbre vous dit où quelqu’un a travaillé. Une démo vous dit que quelque chose a fonctionné une fois, sur un PC portable, de bonne humeur. Ni l’un ni l’autre ne vous dit ce que cette personne peut prendre en charge dans votre équipe.

Demandez-leur un projet qu’ils peuvent décrire de bout en bout :

**« Racontez-moi quelque chose que vous avez personnellement mis en production. De quoi étiez-vous responsable, qu’est-ce qui a cassé, et qu’est-ce qui a changé grâce aux preuves ? »**

Puis suivez une décision sur tout son arc. Quelle était la première approche ? Qu’ont-ils mesuré ? Quelle alternative ont-ils rejetée, et pourquoi ? Qu’a apporté un collègue ? Que feraient-ils différemment aujourd’hui ?

Demandez un artefact : une trace anonymisée d’un échec, un rapport d’évaluation, un document de conception, un test, une courte revue de code. Une trace, c’est simplement l’enregistrement de ce que le système a fait en chemin vers sa réponse — chaque appel d’outil, chaque tentative, chaque aval silencieux. C’est la différence entre lire l’essai et voir le travail.

<p class="inset">
Un candidat qui refuse de remettre les données clients de son ancien employeur réussit le test, il ne le rate pas.
</p>

Prenez plutôt un exemple reconstruit, ou utilisez l’exercice partagé ci-dessous. « Montrez-moi les preuves » ne doit jamais devenir « rapportez-nous les secrets d’un autre. »

Pour un recrutement en début de carrière, les preuves sont plus modestes, et c’est normal. Adaptez l’ampleur attendue et la supervision au poste. Vous testez la compréhension et la responsabilité, pas l’accès à des logos prestigieux.

## Cinq questions qui valent le temps d’entretien

Ce sont des pistes d’investigation, pas des questions pièges. Si mémoriser la réponse suffit pour réussir, la question ne sert à rien.

### 1. « Comment sauriez-vous si cet agent s’est amélioré ? »

Écoutez une réussite définie dans le langage du métier : tickets résolus correctement, brouillons que l’agent envoie réellement, escalades qui n’auraient pas dû avoir lieu. Demandez ensuite quels échecs une note moyenne cacherait, et avec quoi ils compareraient la nouvelle version.

Une bonne réponse rend la mesure inspectable. Demandez-leur d’esquisser trois cas de test sur le moment et de désigner qui décide si chacun est passé. Si un modèle note les réponses, demandez comment ils vérifient le correcteur. [« Il a obtenu 94 % » n’est pas une mesure si la même exécution obtient 82 % le mardi.](/reglez-automatiquement-votre-juge-llm)

Le [guide d’Anthropic sur les évaluations d’agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) dresse la distinction qui doit apparaître dans votre entretien : l’enregistrement de ce qu’un agent a fait n’est pas la même chose que le résultat. Un agent qui rapporte « J’ai émis le remboursement » est une phrase, pas un remboursement.

### 2. « L’outil a expiré après avoir soumis un remboursement. Et maintenant ? »

« Réessayer » est le mauvais réflexe. L’argent a peut-être déjà disparu.

Écoutez les vérifications de l’état de la transaction avant d’agir, une clé d’idempotence pour que la seconde tentative tombe sur la première, et un chemin d’escalade quand l’état est vraiment inconnu. Demandez qui voit l’échec et comment le travail reprend ensuite. Le vocabulaire importe moins que le fait que leur conception puisse facturer un client deux fois pour une seule erreur.

### 3. « Que ce système peut-il lire, modifier et dépenser ? »

Demandez la frontière : quels enregistrements il peut lire, quelles actions il peut entreprendre, où un humain doit approuver, et ce qui empêche une boucle de tourner toute la nuit sur votre carte de crédit.

Demandez ensuite où cette frontière est appliquée. Une invite disant au modèle d'être prudent est un pare-feu fait de texte de politique — l'intention est là, l'application ne l'est pas. Faites-leur dessiner la frontière et proposer un test qui tente de la franchir.

Incluez l'exposition des données pendant que vous y êtes : ce qui quitte le système pour le fournisseur de modèle, ce qui est écrit dans les journaux, et qui peut lire ces journaux. « Nous enregistrons tout » est une conversation de conformité qui n'attend qu'à arriver.

### 4. « Quelle partie construiriez-vous sans LLM ? »

Un ingénieur compétent peut retirer l'IA d'une partie de sa propre proposition. Les règles d'éligibilité, l'arithmétique et les vérifications de permissions ont des implémentations ennuyeuses qui n'hallucinent jamais. Interpréter ce qu'un client frustré voulait dire, non.

Demandez ce que le modèle vous apporte dans ce flux de travail spécifique et quelles preuves justifieraient la surface d'échec supplémentaire. Si chaque boîte du diagramme a besoin d'un agent, demandez un diagramme plus petit.

### 5. « Parlez-moi d'une approche que vous avez abandonnée. »

Écoutez l'observation qui a changé leur avis. Les utilisateurs voulaient la recherche, pas le chat. Le modèle plus cher a réduit le coût total de traitement. La fonctionnalité ne valait pas la peine d'être livrée et ils l'ont dit.

Un résultat négatif franc bat une histoire de succès polie, car une histoire de succès révèle rarement une règle de décision. Demandez ce qu'ils ont arrêté de faire, et combien de temps il leur a fallu pour arrêter.

## Payer pour une petite session de travail

Utilisez un exercice limité et rémunéré sur des données synthétiques. Envoyez le brief et les critères de notation à l'avance — vous embauchez pour le jugement, pas pour la capacité à être pris au dépourvu. Laissez les gens utiliser les outils qu'ils utiliseraient dans le travail, y compris l'IA, puis demandez-leur d'expliquer et de vérifier ce qui en sort.

Une session illustrative de 90 minutes pour un ingénieur d'application :

> Vous héritez d'un assistant de support qui rédige des réponses et propose des remboursements. Voici douze tickets synthétiques, un court document de politique, et quatre exécutions enregistrées. Une réponse cite une politique que nous avons retirée en mars. Une demande de remboursement expire. Un ticket demande les informations d'un autre client. Recommandez si nous devons étendre le pilote, et montrez-moi une petite amélioration ou un test.

Quinze minutes pour clarifier l'objectif, quarante-cinq pour creuser, trente pour expliquer la recommandation. Donnez-leur un environnement préparé pour que l'exercice ne soit pas secrètement un test de `npm install`. Adaptez les besoins d'accès et maintenez des conditions équivalentes entre les candidats.

Vous observez quelles questions ils posent, quelles preuves ils ouvrent, et quel risque ils saisissent en premier. Remarquent-ils que douze tickets ne peuvent pas établir la fiabilité ? Peuvent-ils livrer un correctif étroit sans prétendre que le système est maintenant bon ? Peuvent-ils dire ce qui devrait se passer la semaine prochaine ?

Le candidat qui ajoute un test échouant pour le remboursement en double vous en dit peut-être plus que celui qui a livré une belle interface de chat.

Utilisez les mêmes questions de base et les mêmes critères de notation pour tout le monde dans le rôle — c'est la structure de base derrière le [guide d'entretien structuré](https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/) du Bureau de gestion du personnel des États-Unis, et elle existe pour que votre panel compare les candidats au lieu des impressions. Gardez l'exercice proche du vrai travail. La ligne entre un échantillon de travail et du conseil gratuit est plus mince que la plupart des responsables du recrutement ne le pensent, et les candidats peuvent la voir de l'autre côté de la pièce.

## La grille d'évaluation du recrutement

Copiez ceci dans le document d’entretien. Mettez-vous d’accord sur le niveau requis pour chaque dimension **avant** de rencontrer quiconque, car la barre bouge une fois que vous aimez quelqu’un. Chaque intervieweur note indépendamment avant le débriefing et associe une observation concrète à chaque note.

Utilisez **1 = non étayé ou structurellement défaillant**, **2 = fonctionnel avec un encadrement important**, **3 = solide dans le cadre du rôle**, **4 = jugement solide avec vérification démontrée**. Utilisez **N/O = non observé** lorsque l’entretien n’a jamais produit de preuve. N/O est un écart à combler, pas un zéro à moyenner.

| Dimension | Preuve qui mérite un 3 | Score / preuve observée |
| --- | --- | --- |
| Jugement technique | Choisit une conception proportionnée et explique une alternative rejetée | ___ / ___ |
| Jugement produit | Définit un résultat utilisateur, une référence et une raison d’arrêter | ___ / ___ |
| Évaluation | Propose des cas représentatifs et vérifie les résultats, pas seulement des réponses fluides | ___ / ___ |
| Discipline de production | Gère les échecs partiels, la récupération, la supervision, le coût et la latence | ___ / ___ |
| Sécurité | Identifie les données sensibles et explique les limites d’accès et de dépenses exécutoires | ___ / ___ |
| Communication | Exprime clairement l’incertitude et explique la conséquence à un décideur | ___ / ___ |
| Appropriation | Sépare leur travail de celui de l’équipe et suit les échecs jusqu’à leur résolution | ___ / ___ |

C’est une aide à la décision, pas un prédicteur validé de la performance professionnelle. Calibrez-la pour votre rôle et vérifiez-la par rapport à ce qui se passe réellement après l’arrivée des personnes — sinon vous ajustez un juge que vous n’avez jamais noté.

Pour quelqu’un qui possédera la production seul, je veux des preuves solides dans chaque dimension essentielle. Un total fort ne devrait jamais masquer une faiblesse non résolue dans les permissions ou la récupération ; ce sont les deux qui vous facturent plus tard. Pour un ingénieur en développement, notez le soutien dont il aura besoin et le nom de la personne qui le fournit.

Concluez le débriefing par trois phrases : **Que peut posséder cette personne ? De quel soutien aura-t-elle besoin ? De quoi ne sommes-nous pas encore sûrs ?** Un panel qui ne peut pas répondre à ces questions est sur le point d’avoir une conversation de quarante minutes sur la présence exécutive.

## Les drapeaux rouges méritent une question supplémentaire

Soyez prudent quand un candidat ne peut pas séparer sa contribution de celle de l’équipe, traite chaque projet passé comme un succès sans faille, ou répond aux questions de mesure par des adjectifs. « Très précis » a besoin d’un dénominateur.

Autres signaux : des agents apparaissent dans la conception avant que le problème ne soit compris ; le coût d’exploitation n’a pas de plafond ; la récupération après échec appartient à une autre équipe ; la sécurité réside entièrement dans le prompt.

Sondez une fois avec un scénario concret avant de conclure quoi que ce soit. Un terme inconnu n’est pas un concept manquant, et beaucoup d’ingénieurs solides ont appris les idées sous des noms différents. Accordez du crédit quand quelqu’un repère sa propre erreur en cours de réponse. Refuser de réviser son jugement après avoir vu des preuves contradictoires est l’acte disqualifiant — avoir besoin d’un moment de réflexion ne l’est pas.

## Déjà inquiet du recrutement ? Auditez d’abord le travail

Un projet d’IA en difficulté ne prouve pas que vous avez embauché le mauvais ingénieur. Le brief a peut-être été impossible, les données inutilisables, ou la direction a peut-être promis une autonomie totale lors d’un keynote avant que quiconque mesure la qualité.

Avant de commander une réécriture, conservez le code, la configuration, les résultats d’évaluation et les journaux pertinents sous des contrôles d’accès appropriés. Ensuite, établissez quels comptes, services et clés API l’entreprise contrôle réellement — c’est là que les équipes découvrent que tout le pipeline tourne sur le compte de facturation personnel d’une seule personne.

Obtenez une lecture indépendante de quelques workflows représentatifs. Qu’est-ce qui fonctionne ? Qu’est-ce qui échoue ? Quelles affirmations se reproduisent ? Restreignez les actions risquées pendant que le comportement incertain est en investigation, et triez le travail en conserver, réparer et remplacer.

Demandez un court plan de récupération avec des tests d’acceptation, des propriétaires désignés et une date de décision. « Nous avons besoin d’un nouveau framework » est une proposition à examiner, pas un diagnostic.

## Donnez à l’embauché la permission de décevoir la feuille de route

Rien de tout cela ne fonctionne si votre entreprise punit le jugement qu’elle vient de passer six semaines à sélectionner.

L’ingénieur qui dit « l’approbation humaine reste sur cette étape » ou « le pilote ne justifie pas encore l’extension » a besoin d’un leader qui peut l’entendre devant d’autres personnes. Recrutez sur des preuves puis enterrez les résultats dérangeants, et vous aurez construit une machine coûteuse pour produire les réponses que vous vouliez déjà.

Donc pour le prochain poste IA : rédigez le résultat, utilisez la grille d’évaluation, et regardez le candidat creuser dans quelque chose d’imparfait.

Vous voulez la personne qui peut vous montrer pourquoi le système est prêt — et qui vous le dira, à voix haute, le jour où il ne l’est pas.
````
