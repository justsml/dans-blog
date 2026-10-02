# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: fr
- Model: openrouter/deepseek/deepseek-v4.1-flash
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 89.98
- Input tokens: 12277
- Output tokens: 35503
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.026811
- Pricing source: openrouter-2026-10-02
- Note: Command failed: bun run i18n:validate --slug semantic-vector-search-landscape --locale fr --skip-global (code 1)
## Raw Output

````mdx
---
title: >-
  Recherche vectorielle sémantique et autres sujets pour se faire des amis et
  des amoureux
subTitle: >-
  Le paysage complet de la recherche : exacte, floue, sémantique, hybride — et
  quand toutes les superposer.
modified: '2026-10-02'
tags:
  - postgres
  - postgresql
  - pgvector
  - vector-search
  - semantic-search
  - hybrid-search
  - rag
  - ai
  - databases
  - search
  - embeddings
category: Code
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
sourceHash: 16001f2ff247
---


**RRF (Reciprocal Rank Fusion)** — Un algorithme pour fusionner des listes de résultats classés issues de plusieurs systèmes de recherche. Utilise uniquement la position au classement — aucune normalisation des scores n'est nécessaire. Un résultat bien classé à la fois dans les listes FTS et vectorielles obtient un score combiné plus élevé que celui qui ne domine qu'une seule liste.

---

## Comment les embeddings trouvent du contenu associé

Les embeddings vectoriels convertissent du texte (ou des images, de l'audio, etc.) en une liste de nombres — un point dans un espace de grande dimension. Un modèle d'embedding est entraîné pour que du texte sémantiquement proche se retrouve à proximité dans cet espace. « Dog » et « canine » finissent proches. « Running a marathon » et « running a Python script » finissent éloignés malgré un mot en commun.

La recherche de similarité dans cet espace trouve les documents dont le *sens* est le plus proche du sens de la requête, indépendamment de tout chevauchement exact de mots.

Cela signifie :
- « Comment configurer les délais d'attente des requêtes ? » peut correspondre à un article intitulé « Définir les limites de connexion et les politiques de nouvelle tentative » — aucun mot-clé en commun, forte pertinence conceptuelle
- « Quelque chose de léger pour une soirée d'été » peut correspondre à une recommandation de vin sans qu'aucun mot-clé n'apparaisse dans la description du produit
- Une requête en anglais peut correspondre à des documents pertinents en français, espagnol ou japonais si le modèle d'embedding a été entraîné de façon multilingue

La recherche lexicale (`tsvector`, `pg_trgm`) ne peut rien faire de tout cela. Elle opère sur des mots et des caractères, pas sur le sens. Les outils ne sont pas interchangeables — ils résolvent des problèmes différents.

---

## Quand pgvector gagne

**Construire du RAG.** La génération augmentée par récupération récupère les morceaux de documents dont le sens est le plus proche de la question de l'utilisateur, puis les transmet à un modèle de langage comme contexte. Cette étape de récupération est une opération vectorielle. FTS manquera les paraphrases, les synonymes et les correspondances conceptuelles qu'un morceau pertinent peut exprimer différemment. L'avantage de pgvector par rapport à un magasin vectoriel autonome : il s'exécute dans votre instance Postgres existante — aucun service séparé à déployer, exploiter ou dans lequel synchroniser des données.

**Les utilisateurs décrivent ce qu'ils veulent, pas ce qu'ils doivent rechercher.** « Articles sur le développement de la confiance en tant que nouveau manager » ne contient aucun mot-clé qui apparaît de manière fiable dans les publications pertinentes. « Un framework léger pour gérer les effets de bord » n'utilise peut-être pas ces mots exacts dans la documentation. La recherche vectorielle correspond à l'intention, pas à l'orthographe.

**Trouver des éléments similaires.** Produits associés, tickets de support similaires, rapports de bug en double, articles susceptibles de vous intéresser. « Trouver des problèmes similaires à celui-ci » est une recherche des plus proches voisins — calculez l'embedding de l'élément, trouvez ses voisins géométriques. Une mise en garde importante : la recherche vectorielle renvoie toujours des résultats, même quand rien n'est réellement similaire. Pour les cas d'usage de déduplication et de recommandation, filtrez par un seuil de similarité minimal (par ex. similarité cosinus ≥ 0,80) afin d'éviter de faire remonter des correspondances peu fiables comme si elles étaient pertinentes.

**Déduplication sémantique.** Avant d'indexer du contenu pour le RAG ou la recherche, vous devez souvent identifier les quasi-doublons dans le corpus — articles révisés plusieurs fois, tickets de support déposés deux fois, entrées de base de connaissances qui se recoupent fortement. Calculez les embeddings des documents et filtrez par seuil de similarité cosinus pour signaler ou fusionner les quasi-doublons avant qu'ils ne polluent votre index. Cela évite que la récupération renvoie plusieurs morceaux quasi identiques et dilue la fenêtre de contexte.

**Recherche multilingue.** Les modèles d'embedding multilingues projettent du contenu sémantiquement équivalent entre les langues dans des vecteurs proches. Une requête en espagnol pour « perder peso » peut correspondre à un article en anglais sur « sustainable weight loss habits » — aucun token en commun, même sens sous-jacent. FTS nécessite une configuration de dictionnaire par langue et gère mal les requêtes inter-langues. `pg_trgm` est indépendant de la langue mais orthographique, pas sémantique.

### Configurer pgvector

De l'installation de l'extension à la requête de similarité, la configuration tient en quelques instructions SQL :

```sql
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- HNSW is usually the first index to try for moderate-size datasets
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);

-- Semantic search query
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

`<=>` est la distance cosinus. `1 - cosine_distance` donne la similarité cosinus (1,0 = identique, 0,0 = orthogonal). Pour `ivfflat` (l'alternative plus ancienne, plus rapide à construire), utilisez `lists = sqrt(row_count)` comme point de départ.

### Quand la recherche vectorielle renvoie la mauvaise réponse

- Correspondance exacte de tokens — références produit (SKU), codes d'erreur, noms de fonctions. `ORD-12345` n'est sémantiquement similaire à rien. Une recherche basée sur les embeddings peut renvoyer `ORD-12344` ou rien de pertinent. Utilisez FTS ou un index B-tree.
- Noms et noms propres. L'espace d'embeddings organise par sens, pas par orthographe. « Micheal Jordan » l'enregistrement utilisateur ne se retrouve pas nécessairement près de « Michael Jordan » dans l'espace vectoriel.
- Chaînes courtes où la similarité au niveau des caractères importe plus que le sens. `pg_trgm` gère cela.
- Requêtes où le terme exact doit apparaître. BM25 et FTS sont plus fiables pour la correspondance de termes connus.

---

## Combiner mots-clés et vecteurs pour des requêtes mixtes

La documentation technique est l'exemple le plus clair où aucun des deux outils ne suffit seul.

Les utilisateurs qui recherchent « comment configurer les timeouts » ont besoin d'une correspondance conceptuelle : un article intitulé « Définir des politiques de retry et des limites de connexion » n'a aucun mot-clé en commun mais est exactement ce qu'il leur faut.

Ces mêmes utilisateurs recherchent aussi `withRetry()`, `ECONNRESET`, et `ERR_SOCKET_TIMEOUT`. Ces chaînes exactes doivent apparaître — la correspondance sémantique peut ne pas les trouver de manière fiable, et un faux positif (conceptuellement similaire mais pas la bonne API) est activement trompeur.

La recherche vectorielle gère les requêtes conceptuelles. FTS gère les termes exacts. Aucun des deux ne gère bien les deux seul.

La solution est la recherche hybride : exécutez les deux et fusionnez les résultats.

### Fusionner les résultats classés avec RRF

**Reciprocal Rank Fusion (RRF)** est l'algorithme standard pour combiner des listes classées provenant de différents systèmes de recherche. Il ne nécessite pas de normaliser les scores entre systèmes — il utilise uniquement les positions de classement. Un résultat qui apparaît haut dans *les deux* listes obtient un score combiné plus fort que celui qui ne domine qu'une seule liste.

```sql
WITH fts_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, query) DESC) AS rank
  FROM documents, to_tsquery('english', $1) query
  WHERE search_vector @@ query
  LIMIT 50
),
vector_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(f.id, v.id) AS id,
    COALESCE(1.0 / (60 + f.rank), 0) +
    COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM fts_results f
  FULL OUTER JOIN vector_results v ON f.id = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

Le `60` au dénominateur est la constante RRF. Des valeurs plus élevées atténuent les différences de position de classement ; des valeurs plus faibles les amplifient. La valeur par défaut de 60 fonctionne bien pour la plupart des types de contenu.

RRF évite le problème plus difficile de la normalisation de `ts_rank` (un score de fréquence logarithmique) par rapport à la distance cosinus (une mesure géométrique). Ils ne sont pas comparables. RRF demande seulement : « à quelle hauteur ce résultat est-il apparu dans chaque liste ? »

### Ajouter des trigrammes pour les fautes de frappe et les noms

Pour une recherche destinée aux utilisateurs sur du contenu mixte — où les utilisateurs peuvent rechercher un nom de personne, un concept ou un terme exact dans la même session — la fusion à trois voies gère tous ces cas :

```sql
WITH trgm_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY similarity(title, $1) DESC) AS rank
  FROM documents
  WHERE title % $1
  LIMIT 50
),
fts_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, to_tsquery('english', $1)) DESC) AS rank
  FROM documents
  WHERE search_vector @@ to_tsquery('english', $1)
  LIMIT 50
),
vector_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(t.id, f.id, v.id) AS id,
    COALESCE(1.0 / (60 + t.rank), 0) +
    COALESCE(1.0 / (60 + f.rank), 0) +
    COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM trgm_results t
  FULL OUTER JOIN fts_results f ON t.id = f.id
  FULL OUTER JOIN vector_results v ON COALESCE(t.id, f.id) = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

Cela gère : les correspondances floues de noms (trigrammes), les correspondances exactes de mots-clés (FTS) et les requêtes conceptuelles (vecteur). Une seule boîte de recherche peut servir les trois intentions utilisateur.

---

## Faire correspondre chaque surface de recherche à ses types de requêtes

Les applications réelles ont rarement une seule surface de recherche. Elles en ont plusieurs, chacune avec un besoin différent :

| Surface | Ce que les utilisateurs recherchent | Couches recommandées |
|---|---|---|
| Recherche dans les blogs / la documentation | Mots-clés + concepts | FTS + pgvector (RRF) |
| Recherche de noms d'utilisateurs/clients | Noms avec fautes de frappe | `pg_trgm` |
| Recherche de produits | Noms, descriptions, « similaire à » | `pg_trgm` + FTS + pgvector |
| Déduplication des tickets de support | « Problèmes similaires à celui-ci » | pgvector uniquement |
| Recherche interne de SKU/commandes | Identifiants exacts | Index B-tree |
| RAG sur une grande base de connaissances | Questions en langage naturel | pgvector (documents découpés) |
| E-commerce « vous aimerez peut-être aussi » | Similarité comportementale + sémantique | pgvector |
| Autocomplétion | Préfixe, tolérant aux fautes d'orthographe | `pg_trgm` |

Ce ne sont pas des hypothèses. La plupart des applications riches en contenu ont besoin d'au moins deux surfaces de recherche distinctes avec des formes de requêtes différentes. La tentation est de choisir une approche et de l'utiliser partout — généralement la recherche vectorielle aujourd'hui, car c'est le choix à la mode. Cela conduit à des embeddings coûteux pour des problèmes où un index trigramme aurait été plus rapide, moins cher et plus correct.

### Ajouter une couche de recherche lorsqu'un type de requête échoue

Ajoutez une couche lorsqu'un mode de défaillance apparaît que la couche actuelle ne peut pas corriger :

- Les utilisateurs se plaignent que les fautes de frappe ne correspondent pas → ajouter `pg_trgm`
- Les utilisateurs recherchent par concept et manquent des résultats pertinents → ajouter pgvector
- Les utilisateurs recherchent des symboles ou codes exacts et obtiennent des résultats conceptuels à la place → ajouter FTS ou vérifier si vous ne vous reposez pas trop sur la recherche vectorielle
- La latence devient un problème → évaluer le pré-filtrage, les index approximatifs ou un stockage dédié

---

## Quand dépasser pgvector

pgvector gère une grande partie de la recherche applicative avant que vous n'ayez besoin d'une autre base de données. Le seuil approximatif dépend du nombre de vecteurs, des paramètres d'index, du taux d'écriture, des filtres, du matériel et de la concurrence, donc considérez toute règle « moins de 10M de vecteurs » comme une hypothèse de départ à benchmarker, pas comme une limite produit. Lorsque vous le dépassez véritablement — concurrence très élevée, exigences de latence p99 très faibles, milliards de vecteurs ou besoins sérieux d'isolation multi-tenant — le paysage des bases de données vectorielles dédiées est vaste et mérite d'être compris.

### Comment lire la comparaison

**La recherche hybride** signifie que la recherche par mots-clés BM25 et la similarité vectorielle s'exécutent dans une seule requête, fusionnées via RRF. Sans cela, vous choisissez soit un seul mode de recherche, soit vous fusionnez vous-même deux requêtes.

**Les vecteurs creux** vont plus loin que BM25. Un vecteur creux SPLADE a ~30 000 dimensions (une par terme de vocabulaire), ~98 % de zéros. Les positions non nulles vous indiquent quels termes comptent et dans quelle mesure. Une requête pour « chiens » pondère aussi « canin » et « animal de compagnie » — précision de niveau BM25 plus expansion de termes à l'intérieur d'un index vectoriel. Si cette colonne est fausse, vous avez besoin d'une couche FTS séparée pour les requêtes par terme exact.

```python
# SPLADE: ~30,000 dims, ~60 non-zero — only relevant vocabulary positions fire
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / de type SQL** concerne vraiment le filtrage. La recherche vectorielle sans filtrage est une démo. Vous avez toujours besoin de portée locataire, de plages de dates, de permissions et de filtres de catégorie. Le SQL complet (pgvector, LanceDB) exprime cela à côté de vos jointures existantes. Les bases de données spécialisées utilisent des objets de filtre JSON (Qdrant, Pinecone), un DSL de requête (Elasticsearch, Milvus) ou GraphQL (Weaviate). Elles fonctionnent ; SQL devient plus attrayant à mesure que la logique de filtrage se complexifie.

```sql
-- pgvector: vector similarity is just another expression
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2
  AND category = ANY($3::text[])
  AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1
LIMIT 10;
```

```python
# Qdrant: equivalent filter as a Python object — same result, more ceremony
results = client.query_points(
    collection_name="documents", query=query_embedding,
    query_filter=models.Filter(must=[
        models.FieldCondition(key="tenant_id", match=models.MatchValue(value=tenant_id)),
        models.FieldCondition(key="category",  match=models.MatchAny(any=categories)),
        models.FieldCondition(key="created_at", range=models.DatetimeRange(gte=cutoff)),
    ]),
    limit=10,
)
```

**Multimodal natif** signifie que la base de données fournit des modèles d'embedding pour le contenu non textuel. Vous lui donnez une URL d'image brute ; elle gère la vectorisation. La plupart des bases de données sont agnostiques en matière d'embedding — vous possédez le pipeline d'embedding. Marqo et Weaviate (via les modules CLIP/ImageBind) ferment cette boucle.

```python
# Marqo: POST raw images, query with text — no external embedding step
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Returns shoe-001 despite zero keyword overlap — CLIP handles the cross-modal match
```

**Index sur disque** est un levier de coût. Les index HNSW résidant en RAM peuvent nécessiter plusieurs Go de RAM par million de vecteurs de 1536 dimensions une fois les vecteurs bruts, la surcharge du graphe et les métadonnées comptés. Les alternatives natives sur disque (Milvus DiskANN, Elasticsearch DiskBBQ, le format Lance de LanceDB, le niveau de stockage objet de Turbopuffer) échangent souvent une certaine latence de requête contre un coût d'infrastructure plus faible. Pour les charges de travail RAG où la latence du modèle domine déjà, ce compromis vaut souvent la peine d'être benchmarké.

**Dimensions maximales** est une migration cachée dans votre architecture. `text-embedding-3-large` utilise 3072 dimensions, Jina v3 peut émettre des embeddings plus grands, et les modèles de recherche continuent de repousser les limites. Certains services managés publient des plafonds de dimensions stricts ; d'autres documentent des plafonds élevés ou aucun plafond pratique pour les modèles d'embedding typiques. Vérifiez la documentation actuelle avant de vous engager. Choisissez quelque chose avec de la marge ; migrer un index vectoriel parce que vous avez atteint un plafond de dimensions est un sprint douloureux.

### Compromis opérationnels que le tableau ne peut pas montrer

**Le multi-tenant de Turbopuffer** est construit autour de nombres très élevés d'espaces de noms. Son positionnement public et ses témoignages clients mettent l'accent sur des charges de travail comme le corpus massif et riche en espaces de noms de Notion. Si chaque utilisateur ou organisation a besoin d'une recherche vectorielle isolée, cette architecture peut changer l'économie, mais benchmarkez toujours votre propre forme de locataire.

**Le mode embarqué de LanceDB** est ce qui se rapproche le plus de « SQLite pour la recherche vectorielle ». Il s'exécute en processus, ne nécessite aucun serveur et fonctionne dans Lambda, Cloudflare Workers et les environnements edge. Le format colonnaire Lance rend l'opération embarquée pratique à une échelle réelle.

**Chroma est au meilleur de sa forme pour le développement/test et les petits déploiements d'applications.** Si vous visez de très grands corpus, la HA, une exploitation intensive du disque ou une recherche hybride de premier ordre, évaluez un stockage orienté production avant de promouvoir le prototype en infrastructure.

**Vespa est ce vers quoi vous vous tournez lorsque la récupération ne constitue que la moitié du produit.** Il combine récupération lexicale, recherche des plus proches voisins, tenseurs, expressions de classement, regroupement et service en ligne. Cette puissance est réelle, mais la complexité opérationnelle et de modélisation l'est aussi. Il convient davantage aux équipes de recherche/recommandation qu'à un « ajouter de la recherche sémantique à mon application CRUD ».

**ClickHouse a sa place dans la conversation lorsque la recherche est rattachée à l'analytique.** Si votre source de vérité est constituée d'événements, de logs, de traces ou de métriques, ClickHouse conserve la distance vectorielle, le filtrage, l'agrégation et une indexation plein texte sérieuse dans un seul moteur SQL. Pas une base de données vectorielle spécialisée, mais souvent la réponse ennuyeuse et juste pour la récupération analytique.

**Les vecteurs creux sont le moyen d'obtenir une correspondance de mots-clés de qualité BM25 à l'intérieur d'un index vectoriel** — sans exécuter un moteur plein texte séparé. Qdrant et Elasticsearch ont des implémentations particulièrement matures ici. Si la recherche hybride est critique et qu'une architecture à deux systèmes est rédhibitoire, le support des vecteurs creux est ce qu'il faut rechercher.

### Choisir un stockage en fonction de la charge de travail

- **Produit SaaS avec isolation par locataire** → Turbopuffer
- **Filtrage complexe de métadonnées à l'échelle** → Qdrant
- **Déjà sur une stack Elastic/ELK** → Elasticsearch avec DiskBBQ
- **Entreprise AWS qui veut de l'open-source** → OpenSearch
- **Plateforme de recherche/recommandation avec de sérieux besoins de classement** → Vespa
- **Analytique, observabilité, recherche de logs/événements** → ClickHouse
- **À l'échelle du milliard en on-prem / auto-hébergé** → Milvus
- **Edge / serverless / multimodal** → LanceDB
- **Petite application JS, site de documentation ou UX de recherche native en edge** → Orama
- **Zéro ops, le coût est secondaire** → Pinecone
- **Multimodal en premier (images, vidéo, audio)** → Marqo
- **Déjà sur MongoDB** → Atlas Vector Search
- **Déjà sur Postgres, besoin de plus de marge** → Supabase Vector ou Neon (tous deux pgvector managés, avec un meilleur outillage)

---

## N'incorporez pas d'ID et n'attendez pas de correspondances exactes

N'utilisez pas la recherche vectorielle comme une recherche textuelle floue pour des choses qui ont des réponses correctes.

« Trouve-moi l'utilisateur avec l'e-mail `dan@example.com` » n'est pas un problème de recherche vectorielle. « Trouve la commande avec l'ID `ORD-12345` » non plus. Incorporer `ORD-12345` et rechercher par similarité cosinus renverra *quelque chose* — mais ce peut être faux. Un identifiant a une réponse correcte. Une correspondance approximative sur un identifiant est un bug.

La recherche vectorielle renvoie l'élément *le plus similaire* de votre jeu de données, même quand rien n'est réellement pertinent. Elle ne sait pas quand aucune bonne réponse n'existe. C'est acceptable pour des documents connexes. C'est un problème sérieux pour la recherche d'enregistrement exact, où une réponse fausse mais assurée est pire qu'un résultat vide.

L'inverse s'applique aussi : n'utilisez pas FTS pour des requêtes où l'utilisateur décrit un concept. « articles sur la prise de décisions difficiles dans l'incertitude » ne contient aucun mot-clé fiable. FTS renverra soit du bruit, soit rien. Utilisez le bon outil pour la forme de la requête.

---

## Construisez la recherche autour de la forme de la requête

La plupart des systèmes de recherche en production ont besoin de plus d'une couche :

- **`pg_trgm`** pour les noms, les fautes de frappe, l'autocomplétion
- **FTS / `pg_search`** pour la recherche en prose par mots-clés
- **pgvector** pour les requêtes sémantiques et conceptuelles
- **Fusion RRF** pour les surfaces où les utilisateurs mélangent les types de requêtes
- **Index classiques** pour les identifiants exacts, les filtres et les listes triées

Ce ne sont pas des outils concurrents. Ils sont complémentaires. Un système de recherche bien conçu choisit la bonne couche pour chaque forme de requête — et lorsque les formes de requête se chevauchent, il exécute plusieurs couches et fusionne les résultats.

Les équipes qui livrent de bonnes fonctionnalités de recherche comprennent toute la stack. Celles qui ne le font pas se tournent vers une base de données vectorielle, incorporent tout, et se demandent pourquoi les recherches exactes renvoient parfois le mauvais enregistrement.
````
