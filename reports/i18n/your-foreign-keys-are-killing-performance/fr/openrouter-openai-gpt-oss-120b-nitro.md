# Translation Candidate
- Slug: your-foreign-keys-are-killing-performance
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--your-foreign-keys-are-killing-performance/fr/index.mdx
- Validation: passed
- Runtime seconds: 5.20
- Input tokens: 10719
- Output tokens: 3437
- Thinking tokens: unknown
- Cached input tokens: 5632
- Cache write tokens: 0
- Estimated cost: $0.001037
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Clés étrangères : arrêtez de vous demander si elles sont rapides'
subTitle: Demandez ce que vous optimisez réellement.
date: '2025-12-29'
modified: '2026-01-10'
tags:
  - postgres
  - postgresql
  - databases
  - performance
  - foreign-keys
  - constraints
  - indexing
category: Code
subCategory: Databases
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
L’optimisation de base de données la plus coûteuse que j’aie jamais vue a commencé par la suppression de toutes les clés étrangères.

Pas parce qu’on avait mesuré un goulot d’étranglement. Pas parce que les écritures étaient réellement lentes. Mais parce qu’on avait lu quelque part que « les clés étrangères ne scalent pas ». Six mois plus tard, ils se retrouvent avec 2 milliards d’enregistrements orphelins, un système de facturation qui facture des utilisateurs supprimés, et des analyses décalées de 40 %.

Quand ils ont essayé de ré‑instaurer les contraintes ? La base de données s’est arrêtée net en essayant de valider des données déjà corrompues.

Il existe une idée répandue dans le développement web selon laquelle les clés étrangères sont intrinsèquement lentes, qu’elles sont des « roues d’entraînement » que l’on enlève une fois qu’on passe aux systèmes « réels ». Mais cela passe à côté du véritable rôle d’une contrainte. Vous ne choisissez pas entre rapide et lent. Vous choisissez entre différents modes d’échec.

Voyez cela ainsi : le verre de sécurité, les ceintures de sécurité et les airbags ajoutent du poids à votre voiture. Ils ralentissent effectivement le véhicule et réduisent son efficacité énergétique. Mais vous ne les arracheriez pas pour optimiser votre temps de 0‑60, parce que vous optimisez autre chose.

La question n’est pas de savoir si les clés étrangères vous ralentissent. Bien sûr qu’elles le font. La question est ce que vous obtenez en retour, et si vous en avez réellement besoin.

## Ceque vous échangez réellement  

Prenons un exemple concret. Vous construisez un système de suivi météo avec des tables pour les stations météo, les appareils capteurs, les relevés de capteurs et les États américains.  

Vous liez tout avec des clés étrangères ? Réfléchissons à ce qui change réellement et aux conséquences :  

Les États américains ne changent probablement pas. Le Wyoming ne sera pas renommé de sitôt. Vous n’avez pas besoin d’une clé étrangère pour valider les codes d’État à chaque insertion quand vous savez que les données de référence sont statiques. C’est une surcharge inutile.  

Les stations météo sont ajoutées, déplacées et déclassées. Mais voici la question : voulez‑vous que les relevés historiques « perdent » leur station si quelqu’un supprime accidentellement l’enregistrement d’une station ? Peut‑être souhaitez‑vous que ces données restent intactes même si la station disparaît. Cela signifie que vous traitez les relevés comme un instantané historique plutôt que comme une référence vivante, ce qui change la pertinence même d’une clé étrangère.  

Les relevés de capteurs sont insérés des milliers de fois par minute. Chaque vérification de clé étrangère implique une recherche. Chaque recherche crée de la contention sur vos tables. Si une validation lente fait que votre file d’insertion s’engorge et que vous perdez des données en temps réel, c’est un type de perte de données différent de celui d’un enregistrement orphelin.

Vous voyez où cela mène. Le choix ne porte pas sur performance versus exactitude en tant que concepts abstraits. Il s’agit de quel type d’échec vous êtes prêt à tolérer compte tenu de vos contraintes réelles et de leurs conséquences effectives.

Si des références erronées entraînent des données de facturation corrompues ou des violations réglementaires, vous voudrez probablement que les clés étrangères vous protègent, même au prix d’un impact sur les performances. Si une validation lente vous fait perdre à jamais les données de capteurs en temps réel parce que votre file d’attente déborde, alors la validation est peut‑être le mauvais compromis.

## Quand la vitesse d’écriture compte réellement

Vous avez donc décidé que la vitesse d’écriture maximale est indispensable. Votre file d’attente s’accumule, les transactions expirent, et les vérifications de clés étrangères posent réellement problème, comme vous l’avez mesuré (et non pas seulement théorisé).

Vous avez plusieurs options. Vous pouvez modifier le niveau d’isolation de vos transactions de `SERIALIZABLE` à `READ COMMITTED`, ce qui est plus rapide mais sacrifie certaines garanties de cohérence. Vous pouvez regrouper vos validations, en insérant 1000 lignes par transaction au lieu d’une à la fois afin d’amortir le coût des FK. Ou vous pouvez dénormaliser vers une structure de journal en mode append‑only où vous ne cherchez même pas à valider les références.

Cette troisième option n’est pas de la triche, au fait. C’est simplement une conception différente :

```sql
CREATE TABLE sensor_log (
  id BIGSERIAL PRIMARY KEY,
  recorded_at TIMESTAMPTZ NOT NULL,
  data JSONB NOT NULL  -- { station_id, sensor_id, temp, humidity, ... }
);

CREATE INDEX ON sensor_log USING GIN (data);
CREATE INDEX ON sensor_log (recorded_at);
```

Pas de jointures. Pas de vérifications de clé étrangère. Simplement un ajout de données et des requêtes par intervalle de temps ou par index GIN sur le blob JSONB. Est‑ce une « bonne pratique » ? Probablement pas dans le sens où les manuels de bases de données l’enseignent. Est‑ce que ça tient la charge quand on insère 50 000 lignes par minute sur un Raspberry Pi ? Absolument.

Le problème apparaît quand on considère la « bonne pratique » comme une obligation morale plutôt que comme un modèle qui fonctionne bien dans les scénarios courants mais qui peut ne pas convenir à votre cas.

## Le piège de la normalisation

Les cours de bases de données adorent enseigner la normalisation. Éviter la duplication à tout prix. Troisième forme normale ou rien.

Du coup, on se retrouve avec quelque chose du type : `Orders` → `OrderItems` → `Products` → `Variants` → `Colors` → `Sizes`

Six jointures juste pour répondre à la question « Ai‑je commandé la chemise rouge ou la bleue l’an dernier ? » Et que dire si vous devez inclure le nom du produit ? Cela ajoute trois jointures supplémentaires dans la hiérarchie du catalogue.

Mais attendez. La justification habituelle est « Et si la marque change la façon dont elle nomme Bleu ? ». Si cela se produit, voulez‑vous vraiment que les commandes historiques changent rétroactivement de couleur ? Bien sûr que non. Au moment où quelqu’un a passé la commande, il a acheté un « T‑Shirt Bleu, Taille M » tel qu’il existait à cet instant, pas une référence abstraite à une entrée du catalogue qui pourrait être mise à jour plus tard.

Cela mérite d’être souligné parce que c’est subtil. Certaines données sont fondamentalement un instantané, pas une référence. Quand vous traitez des instantanés comme s’ils étaient des références vivantes, vous vous retrouvez avec cette prolifération absurde de jointures pour reconstruire quelque chose qui aurait dû être dénormalisé dès l’écriture.

Stockez `{"color": "blue", "size": "M"}` directement sur la commande. C’est fini.

### Reconnaître les données instantanées

Comment savoir quand quelque chose doit être un instantané ? Demandez‑vous s’il s’agit d’un enregistrement à un point dans le temps :

- Les commandes capturent les détails du produit tels qu’ils existaient au moment de l’achat.  
- Les journaux d’audit enregistrent l’état de l’utilisateur lorsqu’il a effectué une action.  
- Les tables d’historique conservent l’état d’un enregistrement avant une mise à jour.  
- Les flux d’événements capturent ce qui s’est passé, quand, avec quelles données.

Si la réponse est « oui, il s’agit d’enregistrer un instant », arrêtez de le normaliser. Commencez à le figer.

### Blobs opaques

Il existe une autre catégorie au‑delà des instantanés : des données que vous ne requêtez jamais. Vous les stockez simplement et les récupérez en bloc.

Les configurations de modèles LLM comme `{"model": "gpt-4", "temperature": 0.7, "max_tokens": 2000}` ne sont pas destinées à être interrogées par température. Vous récupérez toute la configuration par ID de requête quand vous en avez besoin. Les charges utiles JWT après décodage, les journaux de requêtes/réponses API pour le débogage, les objets de préférences utilisateur avec les réglages de thème et les drapeaux de notification. Tout cela constitue des blobs opaques. Vous n’avez pas besoin de normalisation. Vous n’avez pas besoin de clés étrangères. Empilez‑les dans JSONB et passez à autre chose.

Le jointure de 6 tables pour déterminer la couleur de la chemise commandée ? Ce n’est pas une normalisation correcte. C’est une confusion entre le stockage d’une référence et celui d’une valeur.

*(Attention toutefois : cela peut se retourner contre vous de façon spectaculaire si vous devez plus tard interroger ces données. Voir [The JSONB Seduction](../the-jsonb-seduction) pour les cas où cette approche engendre son propre cauchemar.)*

## L’échelle est contextuelle

Vous entendrez dire « les clés étrangères ne s’adaptent pas ». Mais l’échelle dépend entièrement de votre matériel et de votre architecture.

Un Raspberry Pi qui journalise 10 000 relevés de capteurs par minute sur une micro‑SD ? C’est réellement une haute échelle pour ce matériel. AWS Aurora avec IOPS provisionnées traitant des milliards de lignes ? Vous pouvez appliquer des clés étrangères sans même transpirer.

La contrainte réelle ne porte pas sur le nombre de lignes ou le volume d’écritures. C’est le **sharding**.

Lorsque votre table `Users` réside sur le serveur A et que votre table `Orders` réside sur le serveur B, les clés étrangères ne peuvent tout simplement pas fonctionner. La base de données n’a aucun mécanisme pour appliquer une contrainte au‑delà des frontières réseau. À ce stade, vous exécutez déjà des jobs en arrière‑plan pour repérer les orphelins et mettre en place des modèles de cohérence éventuelle.

Cela se produit dans les SaaS multi‑locataires où chaque locataire obtient sa propre base de données isolée pour des raisons de conformité, ou dans les déploiements IoT où 50 000 appareils en périphérie exécutent chacun SQLite localement. Une fois arrivé à ce point, les clés étrangères sont hors de question (au sens littéral), quelles que soient les considérations de performance.

Mais tant que vous n’avez pas atteint cette limite architecturale, évitez d’optimiser prématurément pour les problèmes de Netflix alors que vous construisez un outil interne utilisé par 10 personnes.

## À quoi cela ressemble réellement en pratique

Au lieu de vous demander « devrais‑je utiliser des clés étrangères ? », posez-vous ces trois questions :

- Que se passe‑t‑il si cette référence est erronée ? S’agit‑il d’un risque de poursuite judiciaire, d’une facturation corrompue, d’une violation réglementaire ? Ou bien est‑ce simplement une jointure manquante qui renvoie null dans votre tableau de bord analytique ?
- Que se passe‑t‑il si la validation est lente ? Perdez‑vous des données en temps réel irremplaçables ? Ou vos requêtes se contentent‑elles de prendre 50 millisecondes de plus ?
- Ces données sont‑elles un instantané ou une référence ? Enregistrez‑vous l’état d’un élément à un moment donné, ou pointez‑vous vers la valeur actuelle autoritaire ?

À partir de là, les schémas se dégagent assez naturellement :

Les transactions financières, les sessions d’authentification, tout ce où la corruption des données entraîne une responsabilité juridique veut généralement des clés étrangères, même si cela impose un surcoût de performance.

Les journaux à haut débit, les séries temporelles en mode append‑only, tout ce où vous écrivez un million d’événements par minute n’a généralement pas besoin d’une surcharge de validation à chaque écriture.

Les instantanés historiques comme les commandes et les journaux d’audit, les données que vous récupérez toujours comme un blob complet (par exemple les préférences utilisateur), les schémas que vous ne contrôlez pas comme les charges utiles de webhook provenant d’API externes… ces cas fonctionnent souvent mieux dénormalisés.

Mais remarquez que j’ai utilisé « probablement » et « souvent ». Le contexte compte, et votre contexte diffère du mien.

## Conclusion finale

Les clés étrangères ne posent pas de problème de performance. Elles représentent un compromis entre la vitesse d’écriture et l’intégrité des données, et la pertinence de ce compromis dépend entièrement de vos goulets d’étranglement spécifiques et de leurs conséquences.

Le vrai problème, c’est quand on supprime les clés étrangères parce qu’on a lu quelque chose sur « l’échelle du web » sans réellement mesurer s’il y a réellement un problème de performance en écriture ou sans considérer ce que l’on abandonne. On finit par copier‑coller l’architecture de Netflix sur un projet greenfield qui ne traite que 100 transactions par jour.

Peut‑être que le coût en performance vaut le coup pour votre cas d’usage. Peut‑être que ce n’est pas le cas. Mais décidez-en au moins en fonction de ce que vous optimisez réellement, et non de ce que vous pensez devoir optimiser.

Qu’est‑ce que vous cherchez à optimiser ?

## Ressources

- [Documentation des contraintes de clé étrangère PostgreSQL](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK)
- [Conseils de performance PostgreSQL](https://www.postgresql.org/docs/current/performance-tips.html)
- [Use The Index, Luke ! – Clés étrangères](https://use-the-index-luke.com/sql/clustering/data-clustering)
- [Normalisation vs dénormalisation des bases de données](https://www.postgresql.org/docs/current/tutorial-concepts.html)
````
