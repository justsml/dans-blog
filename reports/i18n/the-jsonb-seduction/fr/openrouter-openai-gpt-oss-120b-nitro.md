# Translation Candidate
- Slug: the-jsonb-seduction
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--the-jsonb-seduction/fr/index.mdx
- Validation: passed
- Runtime seconds: 3.81
- Input tokens: 10758
- Output tokens: 3032
- Thinking tokens: unknown
- Cached input tokens: 6144
- Cache write tokens: 0
- Estimated cost: $0.000965
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'JSONB : la pire façon de gâcher votre base de données'
subTitle: >-
  JSONB est puissant et pratique, mais il est très facile de l’abuser en
  laissant un blob remplacer votre véritable schéma.
date: '2025-12-29'
modified: '2025-12-30'
tags:
  - postgres
  - postgresql
  - databases
  - jsonb
  - json
  - schema-design
  - technical-debt
category: Code
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
PostgreSQL a ajouté JSONB pour vous permettre de stocker des données semi‑structurées sans définir de schémas rigides à l’avance. L’idée était sensée : parfois on ne sait réellement pas à quoi ressembleront les données, ou elles évoluent trop rapidement pour que des colonnes classiques aient du sens.

Cela importe parce que JSONB n’est pas une erreur. Dans de nombreux systèmes, c’est la représentation la plus propre du problème. Si vous stockez des charges utiles de webhooks tiers, des corps d’événements versionnés, des drapeaux de fonctionnalités ou des objets de configuration LLM où chaque fournisseur et chaque modèle expose un jeu d’options légèrement différent et en constante évolution, forcer tout cela dans des colonnes de première classe peut être plus gênant qu’utile.

Le problème, c’est que JSONB est aussi le moyen le plus simple de reporter les décisions de schéma sans admettre que vous les reportez. Quelque part entre l’intention et l’implémentation, il est devenu l’équivalent base de données de « je nettoierai ma chambre plus tard ». Cette solution temporaire que vous avez adoptée il y a six mois ? Elle est toujours là, et maintenant la production en dépend.

Je constate toujours le même schéma. Une équipe ajoute une colonne JSONB parce qu’elle n’est pas sûre des exigences. Elle se promet de la normaliser une fois les choses stabilisées. Trois ans plus tard, cette colonne contient quarante versions différentes de ce qui devait être un profil utilisateur, interrogées par quinze services qui font chacun des hypothèses différentes sur ce qu’il y a à l’intérieur.

La dette technique n’est pas le JSONB lui‑même. C’est l’écart entre ce que vous vous êtes dit que vous construisiez et ce que vous avez réellement construit : un système non documenté de schéma‑on‑read.

## Ce qui se passe habituellement

Vous ajoutez une fonctionnalité et vous n’êtes pas sûr que les utilisateurs aient besoin d’un `twitter_handle`, d’un `bluesky_handle` ou d’autre chose. Au lieu de réfléchir au schéma, vous faites cela :

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  profile JSONB
);
```

Ça fonctionne. Vous livrez la fonctionnalité, vous passez à la suivante, puis à la suivante. La colonne JSONB grossit discrètement en arrière‑plan.

C’est le point de bifurcation. Si `profile` reste un blob opaque récupéré par `user.id`, vous êtes probablement dans les clous. Si elle commence à devenir l’endroit principal où résident les données métier, les compromis changent rapidement.

Le produit demande : *« Combien d’utilisateurs sont à New York ? »*

Vous écrivez :

```sql
SELECT count(*) FROM users WHERE profile->>'location' = 'New York';
```

Postgres effectue un scan complet de la table. Chaque ligne.

Ainsi, vous ajoutez un index GIN. Peut‑être que cela reste acceptable. Parfois c’est le cas. Mais vous payez maintenant en complexité réelle et en espace de stockage parce qu’un champ qui se comporte comme une donnée relationnelle de première classe n’a jamais été promu en colonne de première classe.

### Année 1 : Dérive du schéma

Vous avez trois versions de données dans la même colonne.

*   Ligne 1 : `{"city": "NYC"}`
*   Ligne 1000 : `{"location": "NYC"}`
*   Ligne 5000 : `{"address": {"city": "New York"}}`

Votre code applicatif ressemble maintenant à ceci :

```javascript
const city = user.location || user.city || user.address?.city || "Unknown";
```

Vous n’avez pas supprimé le schéma. Vous avez simplement déplacé les validations et les contrôles de cohérence de la base de données vers du code applicatif dispersé.

---

## Quand l’utiliser réellement

JSONB a des cas d’usage valides. Bien des fois, c’est tout à fait acceptable, et parfois c’est même le meilleur choix disponible.

La distinction cruciale n’est pas « structuré = bon, JSON = mauvais ». C’est plus proche de :

- Les données sont‑elles majoritairement récupérées en bloc via une clé primaire stable ?
- Les clés varient‑elles de façon significative selon les fournisseurs, les versions, les locataires ou le temps ?
- Interrogez‑vous quelques champs connus, ou inventez‑vous de nouvelles requêtes de chemin à chaque sprint ?
- L’application gère‑t‑elle intentionnellement le versionnage et la validation, ou se contente‑t‑elle de faire du bricolage ?

### Cas d’usage légitimes de JSONB

1.  **Charges de webhook** : Vous recevez des données de Stripe, Slack ou GitHub. Vous n’avez aucun contrôle sur le schéma. Vous ne les interrogez peut‑être jamais. Vous avez juste besoin de les stocker pour le débogage ou la relecture. **Parfait pour JSONB.**

2.  **Journalisation et flux d’événements** : Journaux d’application, traces d’audit, contextes d’erreur. Ce sont des écritures intensives, rarement interrogées par champs spécifiques, et souvent analysées en masse ou exportées vers des plateformes analytiques. **JSONB convient ici.**

3.  **Préférences et paramètres utilisateur** : Objets de paramètres contenant plus de 100 booléens, la plupart à false, et vous récupérez toujours le blob complet par identifiant d’utilisateur. Vous n’exécutez pas `WHERE preferences->>'theme' = 'dark'`. **JSONB fonctionne.**

4.  **Configuration de fournisseur / modèle LLM** : C’est l’un des exemples modernes les plus clairs. OpenAI, Anthropic, Gemini, les modèles locaux à poids ouvert et les passerelles spécifiques aux fournisseurs exposent tous des paramètres qui se chevauchent mais diffèrent. Même au sein d’un même fournisseur, les capacités du modèle et les noms d’options évoluent. Un blob de configuration JSONB est souvent beaucoup plus honnête que de prétendre que `temperature`, `top_p`, `reasoning_effort`, `json_schema`, `tool_choice` et une vingtaine d’autres réglages doivent tous être des colonnes universelles. **JSONB est souvent l’abstraction correcte ici.**

5.  **Mise en cache des réponses d’API** : Vous mettez en cache des réponses d’API entières. La base de données n’est qu’un Redis plus rapide. Vous récupérez par clé de cache, jamais par propriétés imbriquées. **JSONB est approprié.**

6.  **Event Sourcing** : Vous stockez des charges d’événements immuables. Vos requêtes sont toujours « donnez‑moi tous les événements pour l’agrégat X » triées par date. Vous n’exécutez jamais de clauses `WHERE` sur les propriétés des événements. **JSONB convient.**

7.  **Surfaces d’extensibilité** : intégrations, paramètres de plugins, surcharges par locataire, métadonnées de marketplace, capacités du fournisseur, ou champs « extras » où vous savez d’avance que la forme variera selon le sous‑type. **JSONB peut être le contrat adéquat, pas un compromis.**

Règle pratique : si l’application récupère le document via une clé connue et sait comment le valider/versions, JSONB peut être excellent. Si le métier continue de poser des questions relationnelles sur des clés imbriquées, ces champs essaient de devenir des colonnes.

## Le meilleur schéma est souvent hybride

De nombreux systèmes matures aboutissent ici :

```sql
CREATE TABLE llm_requests (
  id UUID PRIMARY KEY,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  config JSONB NOT NULL
);
```

C’est généralement préférable à l’une ou l’autre extrémité.

- `provider`, `model`, `status` et `created_at` sont des colonnes de première classe parce que vous les filtrerez, les joindrez, les agrégerez et les indexerez.
- `config` reste en JSONB puisque la surface d’options exacte dépend du modèle, du fournisseur, et est susceptible d’évoluer.

Ce n’est pas « échec de normalisation ». C’est tracer la limite au bon endroit.

### À grande échelle : versionnage d’objets > normalisation

C’est là que ça devient intéressant. À très grande échelle, la « solution correcte » n’est pas la normalisation — c’est le versionnage d’objets.

Si vous avez des milliards de lignes et une évolution fréquente du schéma, la migration des colonnes devient coûteuse. Des entreprises comme Stripe, GitHub et Netflix ne normalisent pas tout. À la place :

```sql
CREATE TABLE entities (
  id UUID PRIMARY KEY,
  version INT NOT NULL,
  data JSONB NOT NULL
);
```

Votre application sait comment lire `version: 1`, `version: 2`, `version: 3`. Aucun migration de base de données pour les nouveaux champs. Le code gère la compatibilité descendante.

Il s’agit d’une décision architecturale, pas de paresse. Elle échange la complexité de la base de données contre la complexité de l’application. Parfois, c’est exactement le bon compromis, surtout quand le document est naturellement versionné et que l’application en est l’interprète canonique.

Le mode d’échec n’est pas « utiliser JSONB ». Le mode d’échec, c’est d’utiliser JSONB sans versionnage, validation, règles de promotion, ni frontière claire entre les données du document et les données relationnelles.

## Les questions qui comptent réellement

Avant d’ajouter une colonne JSONB, demandez‑vous :

1.  Allons‑nous interroger des champs imbriqués dans `WHERE`, `JOIN`, `GROUP BY` ou `ORDER BY` de façon régulière ?
2.  Contrôlons‑nous ce schéma, ou est‑il défini à l’extérieur et volatile ?
3.  La forme est‑elle intentionnellement hétérogène d’un enregistrement à l’autre ?
4.  Avons‑nous une validation et un versionnage au niveau de l’application ?
5.  Quels champs sont susceptibles de devenir des dimensions opérationnelles plus tard ?

Si la réponse à la question #1 est « oui, constamment », c’est un signal fort en faveur de colonnes classiques.

Si les réponses aux questions #2 et #3 sont « oui », JSONB fait probablement réellement le travail pour vous.

---
## Échapper au piège

Si vous êtes déjà dans ce trou, arrêtez de creuser.

1.  Audit : exécutez `jsonb_object_keys` et examinez la dérive réelle de la forme, pas la forme que vous supposez.
2.  Promotion : identifiez les champs que vous filtrez, joignez, triez ou rapportez le plus souvent. Faites‑en de vraies colonnes.
3.  Validation : ajoutez une validation côté application ou au niveau de la base de données pour tout ce qui reste dans le JSONB.
4.  Versionnage : si le blob représente de vraies données métier, versionnez‑le explicitement.
5.  Élagage : supprimez les clés dupliquées du blob une fois les colonnes promues établies.

Ne vous dites pas que chaque blob doit être normalisé. Ne vous dites pas non plus qu’un blob avec une sémantique métier permanente est « temporaire ».

JSONB est excellent quand le document a réellement la forme d’un document. C’est dangereux quand il s’agit d’un schéma relationnel qui porte une fausse moustache.

## Ressources

- [Documentation JSONB de PostgreSQL](https://www.postgresql.org/docs/current/datatype-json.html)
- [Stratégies d’indexation JSONB](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING)
- [Quand utiliser JSONB vs colonnes relationnelles](https://www.citusdata.com/blog/2016/07/14/choosing-nosql-hstore-json-jsonb/)
- [Bonnes pratiques de conception de schéma PostgreSQL](https://www.postgresql.org/docs/current/ddl.html)
````
