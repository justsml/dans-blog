# Translation Candidate
- Slug: the-8-byte-timestamp-that-destroyed-our-database
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--the-8-byte-timestamp-that-destroyed-our-database/fr/index.mdx
- Validation: passed
- Runtime seconds: 22.64
- Input tokens: 9632
- Output tokens: 9399
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.003026
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Votre horodatage est un mensonge
subTitle: >-
  Ce qu'un billet de train m'a appris sur le stockage des données temporelles
  dans les
date: '2025-12-29'
modified: '2026-01-12'
tags:
  - postgres
  - postgresql
  - databases
  - timestamps
  - timezones
  - microservices
  - debugging
category: Code
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Je comprenais pourquoi les types de timestamp dans Postgres sont si confuseurs quand j’ai réservé un train de New York à Chicago. Le billet indiquait :

- Départ : 8:00 AM EST  
- Arrivée : 7:30 PM CST  
- Durée : 11 heures 30 minutes  

Trois manières différentes de parler du temps, toutes sur le même billet. Et chacune doit être stockée différemment dans une base de données.

## La question que personne ne se pose d'abord

À la fois `TIMESTAMP` et `TIMESTAMPTZ` dans Postgres occupent exactement 8 octets avec la même précision au microseconde. Alors pourquoi avoir deux types du tout ?

Parce que « quelle heure est-il ? » dépend entièrement de ce que vous essayez de dire à quelqu'un.

Quand je monte dans ce train à New York, j'ai besoin de savoir qu'il part à 8 heures du matin, heure de l'Est. C'est le chiffre affiché sur l'horloge de la gare que je dois correspondre. Quand mon amie me récupère à Chicago, elle doit savoir que j'arrive à 19h30 heure centrale – c'est le chiffre affiché sur *sa* horloge. Et si je veux savoir si j'aurai le temps de lire mon livre, j'ai besoin de savoir que le voyage dure 11 heures et demie.

Même train. Même voyage. Trois représentations complètement différentes du temps.

## Ce que fait vraiment TIMESTAMPTZ

Voici le subtil point avec `TIMESTAMPTZ` – et ce n'est pas ce que la plupart des gens pensent. Il ne stocke pas le fuseau horaire. Le nom est trompeur.

Ce qu'il fait, c'est convertir l'heure que vous lui fournissez en UTC avant de la stocker, puis la convertir à nouveau dans le fuseau horaire de votre session lors de la lecture. La partie "TZ" ne concerne pas le stockage, c'est une **prise en charge de la conversion**.

Prenons l'exemple de ce départ de train. Quelqu'un à Tokyo interroge votre base de données et voit le départ en heure du Japon (JST). Quelqu'un à Londres le voit en GMT. Tout le monde observe le même moment absolu, simplement exprimé dans son fuseau horaire configuré. C'est idéal pour enregistrer des événements : « à quel moment ce paiement a-t-il été traité ? » ou « à quel moment cette requête API a-t-elle eu lieu ? »

Mais que dire de ce billet de train ? Vous ne souhaitez pas que l'heure de départ change simplement parce que quelqu'un interroge la base de données depuis un autre fuseau horaire. Le train part à 8:00 AM Est, point final. Ce n'est pas un moment absolu—c'est une promesse sur ce que l'horloge de Grand Central affichera.

## Stocker ce que vous voulez vraiment dire

Pour ce voyage en train, vous devez stocker des éléments différents selon les besoins :

- Les moments absolus (`departs_at` et `arrives_at` en tant que `TIMESTAMPTZ`)
- Le contexte d'affichage (`origin_timezone` et `destination_timezone` en tant que texte)
- La durée (un `INTERVAL` entre les deux moments)

Votre application peut alors reproduire ce que montre le billet de train : afficher « Départs 8:00 AM EST » en convertissant le moment absolu vers le fuseau horaire d'origine, afficher « Arrivée 7:30 PM CST » en convertissant vers le fuseau horaire de destination, et afficher « Durée : 11h 30m » directement à partir de l'intervalle.

La personne qui réserve le billet depuis Tokyo voit les mêmes heures locales à chaque gare. C'est ce qu'elle a besoin de savoir.

## Pourquoi votre application de suivi de vol s'est trompée  

Avez-vous déjà remarqué comment certaines applications de suivi de vol affichent votre fuseau horaire pendant le vol ? Par exemple, vous survolez l'Atlantique et l'application affiche « Heure actuelle : 16h32 GMT ». Qui s'en soucie ? Vous n'êtes pas à Greenwich, vous êtes à 38 000 pieds au-dessus de l'océan.  

Ce que vous aimeriez vraiment voir :  
- Temps écoulé depuis le décollage  
- Temps restant jusqu'à la destination  
- Quelle heure il sera *là-bas* quand vous atterrirez  

Aucun de ces éléments ne nécessite de conversion de fuseau horaire. Les deux premiers sont des **intervalles** — des durées, pas des moments. Le dernier est une conversion de fuseau horaire, mais vers un lieu spécifique, pas vers « votre fuseau horaire actuel ».  

Voyez-vous ? Deux calculs d'intervalles (`NOW() - actual_departure` et `estimated_arrival - NOW()`), une conversion de fuseau horaire vers un lieu spécifique (`AT TIME ZONE destination_timezone`). Votre fuseau horaire actuel n'entre pas en jeu.  

## Quand l'heure affichée sur le cadran est vraiment ce dont vous avez besoin

Les hôtels ne s'intéressent pas aux moments absolus. Ils s'intéressent à l'affichage horaire local à leur emplacement.

« Enregistrement après 15 heures » ne signifie pas « enregistrement 15 heures après minuit UTC ». Cela signifie « chaque fois que l'horloge de notre réception affiche 15 heures, vous pouvez enregistrer ». Si vos serveurs sont en Virginie mais que l'hôtel est à Paris, vous souhaitez quand même que cette règle s'active à 15 heures *heure de Paris*.

Le type `TIME` (sans date ni fuseau horaire) représente exactement cela : « une lecture sur une horloge ». Associez-le à un champ texte pour le fuseau horaire (« Europe/Paris »), et vous pourrez appliquer des règles horaires locales indépendamment de l'emplacement de vos serveurs. Mais vous aurez aussi besoin de colonnes `TIMESTAMPTZ` pour enregistrer les moments réels d'enregistrement des clients — ce sont des moments absolus que votre backend doit suivre.

## Le problème du calendrier

J'ai un rappel récurrent à 9 heures du matin : « Réviser les priorités quotidiennes ». Je veux ce rappel à 9 heures du matin *où que je sois*. Si je voyage, il devrait toujours se déclencher à 9 heures locales.

Mais j'ai aussi un événement calendrier : « Réunion d'équipe à 10 heures EST ». Mon collègue à Berlin doit voir « 16 heures CET » pour le même événement. Même réunion, affichage horaire différent, car celle-ci est un moment absolu auquel nous participons tous.

Deux types d'événements différents, deux stratégies de stockage différentes. La réunion utilise `TIMESTAMPTZ`. Le rappel utilise `TIME` plus mon fuseau horaire actuel. Évitez d'essayer de les forcer dans le même champ.

## Ce qui casse en production

Même avec les bons types, la précision peut vous jouer des tours. Postgres stocke les microsecondes : `10:00:00.123456`. L'objet `Date` de JavaScript utilise les millisecondes : `10:00:00.123`.

Cette requête pourrait mystérieusement ne retourner aucune ligne :

```sql
SELECT * FROM orders WHERE created_at = '2026-01-15 10:00:00.123';
```

La base de données contient `10:00:00.123456` et votre code transmet `10:00:00.123`. Selon la manière dont votre pilote le gère, ces valeurs ne correspondront peut-être pas.

N'utilisez pas l'égalité stricte pour les horodatages. Utilisez des requêtes de plage, ou mieux encore, n'effectuez pas de recherche en fonction de l'horodatage de création. Utilisez une contrainte unique ou une clé d'idempotence.

## Règles pratiques

**Privilégiez TIMESTAMPTZ.** En cas de doute, utilisez `TIMESTAMPTZ`. Il gère automatiquement les déploiements multi-régions, l'heure d'été et les changements futurs de fuseau horaire. Il occupe la même taille de stockage que `TIMESTAMP`, donc aucun pénalisation.

**Stockez le contexte séparément.** Si vous devez afficher « Départ à 8h00 HNE » en plus du moment réel, stockez à la fois le `TIMESTAMPTZ` et le `origin_timezone` en colonnes séparées. N'essayez pas d'encoder tout dans un seul champ.

**Pensez en termes d'intervalles.** Beaucoup de besoins liés au temps concernent en réalité des durées, pas des instants. « Depuis combien de temps est-ce en attente ? » « Quand expirera-t-il ? » Utilisez des opérations `INTERVAL`, pas des conversions de fuseaux horaires.

**Exécutez tout en UTC.** Vos serveurs doivent être configurés en UTC. Vos sessions de base de données doivent par défaut utiliser UTC. Ne convertissez vers l'heure locale qu'au moment de l'affichage, et uniquement lorsque vous savez quel fuseau horaire est pertinent.

**Exigez des informations de fuseau horaire des clients.** Si un client envoie `2026-01-15T10:00:00` sans décalage, rejetez-le. Exigez le format ISO-8601 avec soit `Z` soit un décalage explicite comme `-05:00`. N'essayez pas de deviner.

## Imposer de bonnes valeurs par défaut

Si `TIMESTAMPTZ` est votre valeur par défaut (et devrait l'être), envisagez de l'imposer au niveau de la base de données. Un déclencheur qui rejette les colonnes `TIMESTAMP WITHOUT TIME ZONE` paraît extrême, mais détecter le problème "oublie de rajouter TZ" lors de la création du schéma est préférable à déboguer six mois plus tard quand quelqu'un ajoute une nouvelle table et oublie.

## Ce que j'ai appris avec ce billet de train

Le temps dans les bases de données n'est pas difficile à cause de la complexité des timestamps. C'est difficile parce qu'on stocke souvent plusieurs préoccupations dans un seul champ, ou qu'on ne réfléchit pas à ce qu'on tente vraiment d'afficher aux utilisateurs.

Ce billet de train avait raison : l'heure de départ dans le fuseau horaire d'origine, l'heure d'arrivée dans le fuseau horaire de destination, et la durée comme chose séparée. Trois informations distinctes, chacune ayant sa propre pertinence.

Votre base de données peut faire de même. Stockez les moments absolus en tant que `TIMESTAMPTZ`. Stockez le contexte d'affichage (fuseaux horaires, emplacements) dans des colonnes séparées. Utilisez les types `INTERVAL` pour les durées. Permettez à Postgres d'effectuer les conversions quand vous en avez besoin, mais soyez explicites sur le fuseau horaire pertinent pour chaque usage.

La plupart du temps, cela signifie utiliser `TIMESTAMPTZ` et UTC partout, avec les conversions de fuseau horaire uniquement au moment de l'affichage. Mais lorsque vous avez besoin d'heures d'horloge ou d'horaires récurrents, les types `TIMESTAMP` ou `TIME` existent précisément pour cela.

La clé est de savoir quelle question vous essayez de répondre : « Quand cela s'est-il produit ? » contre « À quelle heure dois-je être là ? » contre « Combien de temps cela prendra-t-il ? ». Ce sont toutes des questions différentes concernant le temps, et elles nécessitent souvent des stratégies de stockage différentes.

Pensez à ce que vos utilisateurs doivent voir. Ensuite, stockez les données qui leur permettront de visualiser exactement cela.

## Ressources

- [Documentation des types de date/heure PostgreSQL](https://www.postgresql.org/docs/current/datatype-datetime.html)
- [Meilleures pratiques pour les horodatages PostgreSQL](https://wiki.postgresql.org/wiki/Don%27t_Do_This#Date.2FTime_storage)
- [Format de date et d'heure ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
- [Base de données des fuseaux horaires (IANA)](https://www.iana.org/time-zones)
- [Gestion des horodatages dans les systèmes distribués](https://www.postgresql.org/docs/current/functions-datetime.html)
````
