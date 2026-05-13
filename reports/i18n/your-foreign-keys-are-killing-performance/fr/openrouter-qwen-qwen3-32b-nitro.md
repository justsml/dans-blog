# Translation Candidate
- Slug: your-foreign-keys-are-killing-performance
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--your-foreign-keys-are-killing-performance/fr/index.mdx
- Validation: passed
- Runtime seconds: 24.16
- Input tokens: 10462
- Output tokens: 10296
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.003308
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: ''
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
La plus coûteuse optimisation de base de données que j'aie jamais vue a commencé par la suppression de toutes les clés étrangères (FK).  

Pas parce qu'on avait mesuré un goulot d'étranglement. Pas parce que les écritures étaient effectivement lentes. Parce qu'on avait lu quelque part que « les clés étrangères ne s'échelonnent pas ». Six mois plus tard, ils avaient 2 milliards d'enregistrements orphelins, un système de facturation qui facturait des utilisateurs supprimés, et des analyses biaisées de 40 %.  

Quand ils ont essayé de réintroduire les contraintes ? La base s'est bloquée en tentant de valider des données déjà corrompues.  

Il y a cette idée répandue en développement web que les clés étrangères sont intrinsèquement lentes, qu'elles sont des roues d'apprentissage que vous retirez une fois que vous passez à des systèmes « réels ». Mais cela ignore complètement l'objectif d'une contrainte. Vous ne choisissez pas entre rapide et lent. Vous choisissez entre différents modes de défaillance.  

Pensez-y comme ça : le verre de sécurité, les ceintures de sécurité et les airbags ajoutent du poids à votre voiture. Ils ralentissent effectivement votre véhicule et réduisent l'efficacité énergétique. Mais vous ne les retirez pas pour optimiser votre accélération 0-60, car vous optimisez pour autre chose entièrement.  

La question n'est pas de savoir si les clés étrangères vous ralentissent. Bien sûr qu'elles le font. La question est ce que vous obtenez en retour, et si vous en avez vraiment besoin.

## Ce que vous échangez réellement  

Prenons un exemple concret. Vous développez un système de surveillance météorologique avec des tables pour les stations météorologiques, les dispositifs de capteurs, les lectures de capteurs et les États des États-Unis.  

Doit-on relier toutes ces tables via des clés étrangères ? Réfléchissons à ce qui change réellement et aux conséquences :  

Les États-Unis ne changent probablement pas. Wyoming ne sera pas renommé prochainement. Vous n'avez pas besoin d'une clé étrangère pour valider les codes d'état à chaque insertion si vous savez que les données de référence sont statiques. Cela représente un surcoût inutile.  

Les stations météorologiques sont ajoutées, déplacées et désactivées. Mais voici une question : voulez-vous que les lectures historiques "perdent" leur station si quelqu'un supprime accidentellement le record de la station ? Peut-être préférez-vous que ces données restent intactes même si la station n'existe plus. Cela signifie que vous traitez les lectures comme un instantané historique plutôt qu'une référence en temps réel, ce qui modifie la pertinence même d'une clé étrangère.  

Les lectures de capteurs sont insérées des milliers de fois par minute. Chaque vérification de clé étrangère implique une recherche. Chaque recherche génère une contention sur vos tables. Si la validation lente fait s'accumuler votre file d'insertion et que vous perdez des données en temps réel, il s'agit d'une perte de données de type différent de celle d'un enregistrement orphelin.

Vous pouvez voir où cela mène. Le choix n'est pas entre performance et correction en tant que concepts abstraits. Il s'agit de déterminer quelle défaillance spécifique vous êtes plus enclin à tolérer compte tenu de vos contraintes réelles et de vos conséquences concrètes.  

Si des références erronées signifient des données de facturation corrompues ou des violations réglementaires, vous souhaiterez probablement que des clés étrangères protègent vos données, peu importe le coût en performance. Si une validation lente entraîne une perte définitive de données de capteur en temps réel à cause d'une file d'attente débordante, alors peut-être que la validation n'est pas le bon compromis.  

## Quand les écritures rapides sont vraiment importantes  

Vous avez donc décidé que vous avez besoin de vitesse d'écriture maximale. Votre file d'attente s'accumule, les transactions expirant, et les vérifications de clé étrangère provoquent effectivement des problèmes que vous avez mesurés (et non seulement théorisés).  

Vous avez quelques options. Vous pouvez modifier votre niveau d'isolation de transaction de `SERIALIZABLE` vers `READ COMMITTED`, ce qui est plus rapide mais sacrifie certaines garanties de cohérence. Vous pouvez regrouper vos validations, en insérant 1000 lignes par transaction au lieu d'une à la fois pour répartir le surcoût des clés étrangères. Ou vous pouvez dénormaliser en une structure de journalisation append-only où vous n'essayez même plus de valider les références.  

Sachez que cette troisième option n'est pas une astuce, c'est juste une conception différente :

```sql
CREATE TABLE sensor_log (
  id BIGSERIAL PRIMARY KEY,
  recorded_at TIMESTAMPTZ NOT NULL,
  data JSONB NOT NULL  -- { station_id, sensor_id, temp, humidity, ... }
);

CREATE INDEX ON sensor_log USING GIN (data);
CREATE INDEX ON sensor_log (recorded_at);
```

Aucune jointure. Aucune vérification de clé étrangère. Juste ajouter des données et interroger par plage de temps ou index GIN sur le blob JSONB. Est-ce la « meilleure pratique » ? Probablement pas dans le sens des manuels de bases de données. Fonctionne-t-il lorsqu'on insère 50 000 lignes par minute sur un Raspberry Pi ? Absolument.

Le décalage survient quand les gens traitent la « meilleure pratique » comme une exigence morale plutôt qu'un modèle efficace dans des scénarios courants mais qui peut ne pas convenir au vôtre.

## Le piège de la normalisation

Les cours de bases de données aiment enseigner la normalisation. Éviter la duplication à tout prix. Forme normale troisième ou rien.

Vous aboutissez alors à quelque chose comme : `Orders` → `OrderItems` → `Products` → `Variants` → `Colors` → `Sizes`

Six jointures de tables juste pour répondre à « Ai-je commandé le t-shirt rouge ou le bleu l'année dernière ? » Et que dire si vous devez inclure le nom du produit, car il se trouve trois jointures plus loin dans la hiérarchie du catalogue ?

Mais attendez. La justification est généralement : « Et si la marque change la manière dont elle étiquette le bleu ? » Si cela arrive, voulez-vous vraiment que les commandes historiques modifient rétrospectivement leur couleur ? Bien sûr que non. Lorsque quelqu'un a passé cette commande, il a acheté un « T-shirt bleu, taille M » tel qu'il existait à ce moment précis, pas comme une référence abstraite à une entrée de catalogue qui pourrait être mise à jour ultérieurement.

Cela mérite d'être approfondi car c'est subtil. Certaines données sont fondamentalement des instantanés, pas des références. Lorsque vous traitez des données de type instantané comme s'il s'agissait d'une référence dynamique, vous aboutissez à une prolifération absurde de jointures pour reconstruire quelque chose qui aurait dû être dénormalisé dès l'écriture.

Stockez `{"color": "blue", "size": "M"}` directement dans la commande. C'est terminé.

### Reconnaître les données de type instantané

Comment savoir quand une donnée doit être un instantané ? Posez-vous la question : s'agit-il d'un enregistrement à un moment précis ?

Les commandes capturent les détails du produit tels qu'ils existaient au moment de l'achat. Les journaux d'audit enregistrent l'état de l'utilisateur lorsqu'il a effectué une action. Les tables d'historique conservent l'état d'un enregistrement avant une mise à jour. Les flux d'événements captent ce qui s'est produit, quand et avec quels données.

Si la réponse est « oui, c'est enregistrer un moment dans le temps », arrêtez de la normaliser. Commencez à en faire des captures instantanées.

### Objets opaques

Il existe une autre catégorie au-delà des captures instantanées : les données que vous ne consultez jamais. Vous les stockez et les récupérez intégralement.

Les configurations de modèles LLM comme `{"model": "gpt-4", "temperature": 0.7, "max_tokens": 2000}` ne sont pas des données que vous consultez par température. Vous récupérez toute la configuration par l'ID de la demande quand vous en avez besoin. Les charges utiles JWT après décodage, les journaux de requêtes/réponses API pour le débogage, les objets de préférences utilisateur avec les paramètres d'apparence et les indicateurs de notification. Toutes ces données sont des objets opaques. Vous n'avez pas besoin de normalisation. Vous n'avez pas besoin de clés étrangères. Enfoncez-les dans JSONB et continuez votre vie.

La jointure de 6 tables pour savoir quelle couleur de chemise a été commandée ? Ce n'est pas une normalisation appropriée. C'est une confusion sur le fait de stocker une référence ou une valeur.

(Attention toutefois : cela peut se retourner contre vous de manière spectaculaire si vous avez besoin de consulter ces données plus tard. Voir [La séduction du JSONB](../the-jsonb-seduction) pour comprendre quand cette approche crée son propre enfer.)

## L'échelle dépend du contexte

Vous entendrez des gens dire « Les clés étrangères ne s'échelonnent pas ». Mais l'échelle dépend entièrement de votre matériel et de votre architecture.

Un Raspberry Pi enregistrant 10 000 lectures de capteurs par minute sur une carte microSD ? C'est effectivement une échelle élevée pour ce matériel. AWS Aurora avec des IOPS provisionnés gérant des milliards de lignes ? Vous pouvez utiliser des clés étrangères sans même transpirer.

La limite réelle n'a rien à voir avec le nombre de lignes ou le volume d'écritures. C'est le sharding.

Quand votre table `Users` se trouve sur le serveur A et votre table `Orders` sur le serveur B, les clés étrangères ne peuvent pas fonctionner physiquement. La base de données n'a aucun mécanisme pour appliquer une contrainte à travers les frontières réseau. À ce stade, vous exécutez déjà des tâches en arrière-plan pour trouver les orphelins et implémentez des modèles de cohérence éventuelle.

Cela se produit dans les SaaS multilocataires où chaque client dispose de sa propre base de données isolée pour conformité, ou dans les déploiements IoT où vous avez 50 000 appareils de bord chacun exécutant SQLite localement. Une fois que vous en êtes là, les clés étrangères sont carrément hors sujet (au sens littéral), indépendamment des considérations sur les performances.

Mais tant que vous n'atteignez pas cette limite architecturale, évitez d'optimiser prématurément les problèmes de Netflix lorsque vous développez un outil interne pour 10 utilisateurs.  

## À quoi cela ressemble-t-il en pratique  

Au lieu de vous demander « devrais-je utiliser des clés étrangères ? », posez-vous plutôt ces trois questions :  

Quel est l'impact si cette référence est incorrecte ? S'agit-il d'un procès, d'une facturation corrompue, d'une violation réglementaire ? Ou est-ce simplement une jointure manquante qui retourne null dans votre tableau de bord analytique ?  

Quel est l'impact si la validation est lente ? Perdez-vous des données en temps réel irremplaçables ? Ou vos requêtes prennent-elles simplement 50 millisecondes supplémentaires ?  

Cette donnée est-elle un instantané ou une référence ? Enregistrez-vous l'apparence d'une chose à un moment précis, ou pointez-vous vers la valeur actuelle autoritative ?

À partir de là, les modèles apparaissent assez naturellement :  

Les transactions financières, les sessions d'authentification, tout ce qui implique une responsabilité légale en cas de corruption des données devraient probablement utiliser des clés étrangères (FK), quels que soient les surcoûts liés aux performances.  

Les journaux à fort volume, les séries temporelles en écriture append-only, tout ce qui implique l'écriture d'un million d'événements par minute n'a probablement pas besoin de validation à chaque écriture.  

Les instantanés historiques comme les commandes et les journaux d'audit, les données toujours récupérées sous forme de bloc complet comme les préférences utilisateur, les schémas que vous ne contrôlez pas comme les payloads de webhooks provenant d'APIs externes… ces cas fonctionnent souvent mieux dénormalisés.  

Mais notez que j'ai utilisé « probablement » et « souvent ». Car le contexte est primordial, et votre contexte est différent du mien.  

## Réflexions finales

Les clés étrangères ne sont pas un problème de performance. Il s'agit d'un compromis entre la vitesse d'écriture et l'intégrité des données, et si ce compromis est pertinent dépend entièrement de vos goulets d'étranglement spécifiques et des conséquences associées à votre cas d'usage.

Le vrai problème survient lorsque les gens suppriment les clés étrangères en se basant sur des informations lues sur le "web scale" sans avoir réellement mesuré s'ils avaient effectivement un problème de performance d'écriture ou sans considérer ce qu'ils sacrifient. Vous aboutissez à imiter aveuglément l'architecture de Netflix sur un projet à partir de zéro qui traite 100 transactions par jour.

Peut-être que le coût en performance vaut la peine d'être payé pour votre cas d'usage. Peut-être que non. Mais au moins, prenez cette décision en fonction de ce que vous optimisez réellement, et non de ce que vous croyez devriez optimiser.

Pourquoi optimisez-vous ?

## Ressources

- [Documentation des contraintes de clé étrangère PostgreSQL](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK)
- [Conseils de performance PostgreSQL](https://www.postgresql.org/docs/current/performance-tips.html)
- [Use The Index, Luke! - Clés étrangères](https://use-the-index-luke.com/sql/clustering/data-clustering)
- [Normalisation vs dénormalisation d'une base de données](https://www.postgresql.org/docs/current/tutorial-concepts.html)
````
