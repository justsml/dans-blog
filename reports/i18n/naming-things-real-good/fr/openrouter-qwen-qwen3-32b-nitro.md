# Translation Candidate
- Slug: naming-things-real-good
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2016-06-01--naming-things-real-good/fr/index.mdx
- Validation: passed
- Runtime seconds: 8.96
- Input tokens: 4006
- Output tokens: 4012
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001283
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Bonne nomenclature
subTitle: ''
date: '2016-06-01'
modified: '2024-08-10'
category: Guides
subCategory: programming
tags:
  - programming
  - patterns
  - naming
  - source-code
  - organization
cover: ../rawpixel-652639-unsplash.webp
cover_mobile: ../w300_rawpixel-652639-unsplash.webp
cover_icon: ../icon_rawpixel-652639-unsplash.webp
---
## Nommer les choses : Bases orientées objet

Examinons la conception d'objets/classes par l'exemple...

### La Situation

Avez-vous déjà conçu un modèle de données (en code, en SQL, ou dans des feuilles Excel) ?  
Reconnaîtsez-vous ce qui suit ?

```
*** anti-modèle - ne pas copier-coller ***
* User
  - id
  - avatarUrl
  - name
  - email
  - password

* Agent
  - id
  - primaryPhoto
  - name
  - email
  - agentEmail
  - agentPhoneMain
  - agentEmailPrimary
  - agentPhonePrimary
  - agentAddressFull
  - agentCompanyName
  - agentCompanyAddress
  - *userEmail* - Pointeur vers la table User ^^^
```

### Où est le problème ?

Techniquement, il n'y a pas de bug, juste des données nécessitant une réorganisation.

**Est-ce que ce qui suit vous semble familier ?**

1.  Tout changement dans votre application nécessitera des heures de débogage ardu.  
1.  Tout changement de spécifications entraînera :  

![schema refactor][schema_refactor]  

Pourquoi nommer un champ `agentEmailPrimary` est-il si mauvais ?  

Pour commencer, vous ne créez pas quelque chose d'entièrement nouveau dans l'univers. L'excès de spécificité comporte des pièges :  

1.  Être "verrouillé" dans un nom très spécifique signifie que `agentEmailPrimary` rend probablement vos vues et code associés **0 % réutilisables**, et introduit des bugs récurrents comme :

- Les données ne sont pas synchronisées entre les tables (il n'est pas évident si `user.email` doit être propagé vers `agent.agentEmail` ou vice-versa — sans parler de la complexité de l'implémenter manuellement où et comment appliquer cette « logique » ...)
- Les règles de validation/logique sont probablement dupliquées et incohérentes.
- De plus en plus, votre projet ressemblera à une tour branlante de Jenga.
- La fragilité s'accumule avec chaque nouveau fichier, car une attention extrêmement minutieuse est requise même pour des modifications triviales.

1. `agentEmailPrimary` pourrait signifier plusieurs choses. Évitez l'ambiguïté avec **des noms plus courts**.

- Faites attention aux mots superflus. `Principal` ? Cela soulève davantage de questions : Existe-t-il un `Secondaire` ? Est-ce pour leur `Proche de parenté` principal ?

Assez de discours, Dan, à quoi devrait-il ressembler ?

### Une Solution

```
// Schéma consolidé :

User
  - id
  - role: ['agent', 'lead', 'admin']
  - name
  - phone
  - address
  - email
  - password
  - company
    - name
    - address
```

J'ai supprimé le tableau `Agent`, car il ne contenait pas de champs uniques aux Agents. Et l'objet `User.company` (avec `.name`, `.address`) est apparu une fois que le nommage a été nettoyé.

Quelques principes directeurs :

1. Éliminez les tables inutiles. Avez-vous vraiment besoin d'un tableau `statuses` ? Pourquoi ne pas ajouter un champ `status::VARCHAR(8)` sur le tableau `User` ? C'est acceptable, utilisez les octets supplémentaires par ligne.
2. Essayez de fusionner les tables liées. **Données**
3. Supprimez les données de collecte redondantes (par exemple, supprimez le tableau `ActivityLogs` s'il est remplacé par une solution d'Analytique.)
4. Essayez de garder **tous les noms de champs** à **un seul mot/nom/pronom**. C'est acceptable de s'appuyer sur le contexte fourni par le nom du tableau. (Exemple : `PersonalAccount.email` vs `BusinessAccount.email` - le contexte est fourni par le nom du tableau.)
5. Il n'existe **pas** de chose telle que `Agent.agentEmail` ou `Agent.agentPhonePrimary`. Point. Répétez après moi : « c'est `email` & `phone` ».
6. En utilisant des noms très spécifiques, vous figez en pierre un niveau particulier de `code-reusability` et `durability`, soit spécifiquement **0 %**.
7. Vous ne vous faites aucun cadeau avec des noms comme `User.profileSummaryEmail`. 💞

**Lecture recommandée :**

1. [Peut-être que la normalisation n'est pas normale](https://blog.codinghorror.com/maybe-normalizing-isnt-normal/)
1. [Les compromis entre normalisation et dénormalisation des bases de données](https://dev.to/er_dward/the-trade-offs-between-database-normalization-and-denormalization-4kdo)
2. [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)
3. [https://en.wikipedia.org/wiki/Database_normalization](https://en.wikipedia.org/wiki/Database_normalization)

[schema_refactor]: ../schema_refactor/schema_refactor.gif
````
