# Translation Candidate
- Slug: postgres-fts-vs-pgvector
- Locale: fr
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-05-08--postgres-fts-vs-pgvector/fr/index.mdx
- Validation: deferred
- Runtime seconds: 130.37
- Input tokens: 15661
- Output tokens: 19640
- Thinking tokens: unknown
- Cached input tokens: 1920
- Cache write tokens: 0
- Estimated cost: $0.007428
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Recherche Postgres : FTS, trigrammes et pgvector'
subTitle: Vous avez déjà les outils. Choisissez celui qui correspond à la requête.
date: '2026-05-08'
modified: '2026-05-08'
tags:
  - postgres
  - postgresql
  - pgvector
  - full-text-search
  - vector-search
  - trigrams
  - pg_trgm
  - databases
  - ai
  - search
category: Code
subCategory: Databases
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Les équipes qui ajoutent des fonctionnalités IA se tournent souvent d'abord vers une base de données vectorielle dédiée.

Pinecone, Weaviate, Qdrant, Chroma. Nouveau service, nouvelle dépendance, nouveau pool de connexions, nouvelle facture, et maintenant deux sources de vérité à tenir à jour.

Pendant ce temps, ils ont déjà PostgreSQL. PostgreSQL a déjà `pgvector`. Il dispose aussi d'une excellente recherche plein texte intégrée depuis 2008.

Les bases vectorielles dédiées justifient leur existence à grande échelle et sous un volume de requêtes élevé. Mais la plupart des applications adoptent le deuxième système de recherche avant même d'avoir vraiment sollicité le premier. C'est ainsi qu'un futur problème de passage à l'échelle se transforme en bogue de synchronisation aujourd'hui.

Alors : quand utiliser FTS, quand utiliser pgvector, et quand utiliser les deux ?

---

## Ce Que Chacun Fait Réellement

La recherche plein texte (`tsvector` / index `GIN`) est lexicale. Elle tokenise le texte en lexèmes, les radicalise et fait correspondre les requêtes à l'index. « Courir » et « cours » se réduisent au même lexème. Idem pour « chien » et « chiens ». La fonction de classement (`ts_rank`) récompense les documents où les termes de la requête apparaissent souvent ou en évidence.

pgvector est sémantique. Il stocke un vecteur dense — une liste de nombres — représentant le *sens* d'un fragment tel que compris par un modèle de plongement. La recherche de similarité trouve les vecteurs proches dans cet espace de grande dimension. « Chien » et « canin » se retrouvent proches. « Courir » en tant que sport et « exécuter » en tant que processus ne le sont peut-être pas.

La différence pratique : la recherche plein texte répond à « quels documents contiennent ces mots ? » La recherche vectorielle répond à « quels documents signifient à peu près telle chose ? »

![Une carte des outils de recherche montrant pg_trgm pour les chaînes courtes floues, la recherche plein texte pour les requêtes exactes en prose, pgvector pour la correspondance sémantique, et la recherche hybride pour les longs contenus nécessitant à la fois des signaux exacts et sémantiques.](../search-tool-map.svg)

_La première scission n'est pas « recherche ancienne vs recherche IA ». C'est la forme du texte et le type de réponse qui serait correct._

---

## Quand la recherche plein texte gagne

**Vous cherchez des termes qui comptent exactement.** SKU de produits, codes d'erreur, numéros de modèle, noms d'utilisateur, références de clauses juridiques. `SKU-AX-44192` n'est sémantiquement similaire à rien. Soit ça correspond, soit ça ne correspond pas. La recherche vectorielle peut renvoyer avec confiance `SKU-AX-44193`. Ce n'est pas ce que vous voulez.

**Vos requêtes sont basées sur des mots-clés.** Les utilisateurs tapent dans une barre de recherche, filtrent par tag, ou recherchent des articles de blog par mot-clé. La recherche plein texte a été conçue pour cette forme d'intention.

**Vous avez besoin de résultats classés sans infrastructure GPU ou d'embedding.** Les index FTS sont rapides, déterministes et ne nécessitent aucun appel API externe. Ajoutez une colonne `tsvector`, construisez un index GIN, et vous avez terminé.

**Vous faites du filtrage booléen en parallèle de la recherche.** `WHERE to_tsvector(body) @@ to_tsquery('postgres') AND category = 'tutorial' AND published_at > NOW() - INTERVAL '6 months'` — cela se compose naturellement avec votre logique de requête existante.

```sql
-- Create the index
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- Query
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

La colonne `GENERATED ALWAYS AS` maintient l'index mis à jour automatiquement. Le `setweight` donne aux correspondances de titre un rang plus élevé que celles du corps. C'est toute la configuration.

## Quand les trigrammes gagnent (pg_trgm)

Il existe un troisième outil Postgres souvent oublié : `pg_trgm`. Ce n'est ni la recherche plein texte ni la recherche vectorielle. C'est la correspondance floue de chaînes, et il couvre ce terrain vague que les deux autres outils gèrent mal.

**Le cas d'usage : noms, adresses, identifiants et chaînes courtes avec fautes de frappe.**

La recherche plein texte tokenise le texte en lexèmes et les racinise. Cela fonctionne pour la prose, mais c'est inadapté pour :
- Noms de personnes ("Dan Levy" → racinisé en "dan levi", "leiv", selon la configuration linguistique)
- Noms d'entreprises, adresses, titres de produits où l'orthographe exacte compte
- Requêtes avec fautes de frappe — "Micheal Jordan", "Amaon", "javascipt"
- Autocomplétion / recherche par préfixe
- Correspondance partielle de chaîne ("son" correspondant à "Johnson", "Anderson")

pgvector est également un mauvais choix ici. Vous pouvez plonger "Micheal Jordan" et trouver le vecteur le plus proche, mais l'espace de plongement organise les noms par sens, pas par orthographe. Le plus proche voisin pourrait être "légende du basket" ou "Michael B. Jordan", pas l'enregistrement utilisateur avec la faute de frappe.

`pg_trgm` découpe les chaînes en tranches de 3 caractères qui se chevauchent et mesure combien de trigrammes deux chaînes partagent. "Dan" -> `" da"`, `"dan"`, `"an "`. "Micheal" et "Michael" partagent la plupart de leurs trigrammes, donc la similarité est élevée.

```sql
-- Enable the extension (usually already available)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- GIN index on names column — enables fast trigram similarity search
CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- Fuzzy name search: finds "Micheal Jordan" when searching "Michael Jordan"
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- % operator = similarity threshold (default 0.3)
ORDER BY score DESC
LIMIT 10;

-- Or use ILIKE with trigram index support for contains matching
SELECT id, name
FROM users
WHERE name ILIKE '%johnson%'   -- GIN index makes this fast
LIMIT 10;
```

L'opérateur `%` utilise `pg_trgm.similarity_threshold` (par défaut 0.3, plage 0-1). Des valeurs plus élevées exigent des correspondances plus proches. Pour la recherche de noms, 0.3-0.4 est généralement correct : assez permissif pour attraper les fautes de frappe, assez strict pour éviter le bruit.

**Les trigrammes aident aussi pour la recherche par préfixe et l'autocomplétion, surtout quand l'autocomplétion nécessite une tolérance aux fautes de frappe ou une correspondance partielle :**

```sql
-- Autocomplete: prefix matching. For pure left-anchored prefixes,
-- compare trigram GIN against a B-tree pattern index on your data.
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- More control: word_similarity for partial matches within longer strings
-- (useful when searching "Johnson" within "Andrew Johnson III")
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name          -- <% operator = word_similarity threshold
ORDER BY score DESC
LIMIT 10;
```

**Quand utiliser `pg_trgm` plutôt que la recherche plein texte :**

| Scénario | Utilisation |
|---|---|
| Recherche de noms de personnes/entreprises avec fautes de frappe | `pg_trgm` |
| Autocomplétion / recherche par préfixe | `pg_trgm` (ou recherche plein texte avec requêtes de préfixe) |
| Recherche de chaînes courtes, codes, identifiants | `pg_trgm` |
| Recherche d'articles en prose, documentation | Recherche plein texte |
| Recherche de messages de log par mots-clés | Recherche plein texte |
| Recherche de noms multilingue | `pg_trgm` (il est indépendant de la langue) |

`pg_trgm` se compose aussi avec la recherche plein texte. Utilisez les trigrammes comme pré-filtre flou et classez avec `ts_rank`, ou combinez la similarité trigramme avec un score vectoriel.

---

## Quand pgvector gagne

**Vous construisez un RAG.** Le RAG repose sur la recherche sémantique : trouver des *fragments* de documents dont le sens est le plus proche de la question de l'utilisateur, même lorsque les mots diffèrent. La recherche vectorielle est conçue pour cela. La recherche plein texte manquera les paraphrases, synonymes et correspondances conceptuelles.

**Les utilisateurs décrivent ce qu'ils veulent, pas ce qu'il faut chercher.** « Quelque chose de léger pour une soirée d'été » n'a pas de mots-clés évidents sur le vin. « Articles sur le développement de la confiance en soi en tant que nouveau manager » nécessite une compréhension sémantique que la recherche plein texte ne peut pas fournir.

**Vous trouvez des éléments similaires.** Produits apparentés, tickets de support similaires, rapports de bugs en double. « Trouve-moi des problèmes similaires à celui-ci » est une opération vectorielle. Vous plongez le nouveau problème et trouvez ses voisins les plus proches.

**Contenu multilingue.** Les plongements vectoriels entraînés sur des données multilingues peuvent faire correspondre des textes dans différentes langues. La recherche plein texte nécessite des configurations spécifiques à chaque langue et gère mal les requêtes inter-langues.

```sql
-- Configuration
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);
CREATE INDEX documents_embedding_idx
  ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Requête : recherche sémantique
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

Remarque : `ivfflat` est approximatif — il est rapide mais sacrifie un peu de rappel pour la vitesse. Pour des jeux de données plus petits (moins d'environ 1 million de lignes), `hnsw` est souvent meilleur :

```sql
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);
```

---

## Quand vous avez besoin des deux

La documentation technique est là où la simple séparation échoue. Les utilisateurs recherchent « comment configurer les timeouts », mais aussi des noms de fonctions comme `withRetry()` et des codes d'erreur comme `ECONNRESET`.

La recherche vectorielle gère les requêtes conceptuelles. La FTS gère les termes exacts. Aucune des deux ne gère bien les deux seules.

La solution est la recherche hybride : exécuter les deux et fusionner les résultats.

**Reciprocal Rank Fusion (RRF)** est l'algorithme standard ici. Il ne nécessite pas de normaliser les scores de deux systèmes ; il combine les positions de classement.

```sql
-- Hybrid search with Reciprocal Rank Fusion
WITH fts_results AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, query) DESC) AS rank
  FROM documents, to_tsquery('english', $1) query
  WHERE search_vector @@ query
  LIMIT 50
),
vector_results AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(f.id, v.id) AS id,
    COALESCE(1.0 / (60 + f.rank), 0) + COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM fts_results f
  FULL OUTER JOIN vector_results v ON f.id = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

Le `60` au dénominateur est la constante RRF — des valeurs plus élevées réduisent l'influence des différences de classement, des valeurs plus faibles les amplifient. La valeur par défaut de 60 fonctionne bien dans la plupart des cas.

Cela exécute deux recherches en une seule requête, fusionne les classements et récompense les résultats où les signaux de mots-clés et sémantiques concordent.

![Un pipeline de recherche hybride où une requête se ramifie en recherche plein texte et pgvector, chacun produit des résultats classés, et Reciprocal Rank Fusion combine les deux listes.](../hybrid-rrf-pipeline.svg)

_RRF est précieux car il évite de faire comme si `ts_rank` et la distance cosinus étaient des scores bruts comparables. Il demande seulement : « à quelle hauteur ce résultat est-il apparu dans chaque liste ? »_

---

## L'arbre de décision pratique

Lors du choix d'une stratégie de recherche, commencez par la **forme de l'entrée**, puis demandez-vous **quel type de requête l'utilisateur effectue**. « Chaîne courte avec variation orthographique » n'est pas le même problème que « long texte où les termes exacts comptent », et les deux diffèrent de « question sur des fragments de document ».

![Un arbre de décision qui choisit pg_trgm, la recherche plein texte, pgvector, la recherche hybride ou une base vectorielle dédiée en fonction de la forme du texte et de la manière dont les utilisateurs le recherchent.](../search-decision-tree.svg)

Le même arbre en mots :

- **Noms, adresses, titres, autocomplétion ou chaînes courtes sujettes aux fautes de frappe** → `pg_trgm`
- **Mots connus, codes d'erreur, SKU, noms de fonctions, tags, catégories, filtres** → FTS
- **Questions, paraphrases, recommandations, articles similaires, correspondance multilingue, fragments RAG** → pgvector
- **Contenu technique où les utilisateurs ont besoin à la fois de symboles exacts et de réponses conceptuelles** → Hybride avec RRF
- **Clés primaires, identifiants exacts, filtres de permissions, plages de dates, listes triées** → index SQL normaux
- **Volume vectoriel énorme, très forte concurrence d'accès, ou objectifs de latence que Postgres ne peut pas atteindre dans vos benchmarks** → évaluer des bases vectorielles dédiées

### FTS vs. Sémantique : La version courte

La question « dois-je utiliser FTS ou la recherche vectorielle ? » se résume généralement à ceci : **savez-vous quels mots apparaîtront dans les documents pertinents ?**

Si oui – les utilisateurs recherchent des termes connus, des catégories, des noms de fonctions, des codes produits – FTS est plus rapide, moins cher et plus prévisible. Il vous indique pourquoi un résultat a correspondu.

Si non – les utilisateurs décrivent un concept, posent une question ou recherchent dans une langue différente – la recherche vectorielle est l'outil approprié. Elle fait correspondre le sens, pas les mots.

Le cas délicat du milieu, ce sont les requêtes en langage naturel sur du contenu technique. Quelqu'un qui cherche « comment gérer les coupures de connexion » pourrait avoir besoin d'un article intitulé « implémenter une logique de réessai pour les pannes réseau » – aucun mot en commun, mais une forte pertinence sémantique. C'est là que la recherche vectorielle montre sa valeur.

L'autre cas délicat concerne **les noms et les noms propres**. Ni FTS ni la recherche vectorielle ne sont excellents pour cela :
- FTS manquera « Micheal » en cherchant « Michael » – jetons différents
- La recherche vectorielle manquera complètement le nom s'il n'apparaît pas fréquemment dans les données d'entraînement
- `pg_trgm` gère cela correctement : similarité orthographique, ni sémantique ni lexicale

En pratique, la plupart des boîtes de recherche à contenu dense ont besoin de FTS pour la rapidité et les mots-clés, et peuvent nécessiter une approche hybride ou `pg_trgm` selon que les utilisateurs recherchent des noms. Une véritable fonctionnalité de recherche sémantique implique généralement pgvector. RAG signifie toujours pgvector.

## Si vous avez besoin d'un magasin de vecteurs dédié

Certains systèmes dépassent réellement pgvector. Quand cela arrive, le marché est bruyant. Voici ce qui compte parmi les options principales.

### La matrice des fonctionnalités

Quelques colonnes nécessitent d'être détaillées avant que le tableau ait un sens.

**Recherche hybride** signifie que la recherche par mots-clés BM25 et la similarité vectorielle sont exécutées dans une seule requête, fusionnées via la Fusion de rang réciproque. « withRetry timeout » peut correspondre exactement au nom de la fonction *et* aux documents traitant de « logique de réessai pour les échecs réseau » sur le plan sémantique. Sans hybride, vous choisissez un mode de recherche ou fusionnez vous-même deux requêtes. La mention « Manuel (RRF via SQL) » de pgvector correspond [à l'approche présentée plus haut](#when-you-need-both) : ça fonctionne, mais vous l'écrivez vous-même.

**Vecteurs creux** vont plus loin que BM25. Un vecteur creux SPLADE a environ 30 000 dimensions (une par terme du vocabulaire), ~98 % de zéros. Les positions non nulles indiquent quels termes comptent et à quel point. Une requête pour « dogs » pondère aussi « canine » et « pet » : la précision lexicale de BM25 plus l'expansion de termes à l'intérieur d'un index vectoriel. Si cette colonne est fausse, vous avez besoin d'une couche FTS externe pour les requêtes de termes exacts.

```python
# SPLADE: ~30 000 dims au total, ~60 non nulles — seules les positions pertinentes du vocabulaire s'activent
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / similaire à SQL** concerne vraiment le filtrage. La recherche vectorielle sans filtrage est une démo, pas une application : vous avez toujours besoin du périmètre locataire, des plages de dates, des permissions et des catégories. Le SQL complet (pgvector) exprime cela à côté de vos jointures existantes. Les bases de données dédiées utilisent des objets de filtre JSON (Qdrant, Pinecone), un DSL de requête (Elasticsearch, Milvus) ou GraphQL (Weaviate). Elles fonctionnent ; le SQL devient plus attractif à mesure que la logique de filtrage s'emmêle.

```sql
-- pgvector : la similarité vectorielle n'est qu'une expression de plus dans WHERE
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2 AND category = ANY($3::text[]) AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1 LIMIT 10;
```

```python
# Qdrant : filtre équivalent sous forme d'objet Python — fonctionnel, plus de cérémonie
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

**Multimodal natif** ne signifie pas « peut stocker des embeddings d'images » ; toutes les bases de données stockent des tableaux de flottants. Cela signifie que la base de données embarque des modèles d'embedding pour le contenu non textuel, donc vous lui fournissez une URL d'image brute et elle gère la vectorisation. La plupart des bases de données ici sont agnostiques en matière d'embedding, donc vous possédez ce pipeline. Marqo et Weaviate (via les modules CLIP/ImageBind) bouclent la boucle.

```python
# Marqo: POST raw images, query with text — no external embedding step needed
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Returns shoe-001 despite zero keyword overlap — CLIP handles the cross-modal match
```

**Index sur disque** est une question de coût. Un HNSW résident en RAM peut nécessiter plusieurs Go de RAM par million de vecteurs en 1536 dimensions, une fois les vecteurs bruts, la surcharge du graphe et les métadonnées comptabilisés. Les alternatives natives sur disque (Milvus DiskANN, Elasticsearch DiskBBQ, le format Lance de LanceDB, le niveau de stockage objet de Turbopuffer) échangent souvent une certaine latence de requête contre une infrastructure moins coûteuse. Pour les charges de travail RAG où la latence du modèle domine déjà, cela vaut souvent la peine d'être benchmarké. Redis VSS est la contrainte dure : RAM uniquement, pas de chemin disque.

**Dimensions maximales** est une migration de demain cachée dans le choix d'aujourd'hui. `text-embedding-3-large` utilise 3072 dimensions, Jina v3 peut émettre des embeddings plus grands, et les modèles de recherche continuent de pousser plus haut. Certains services managés publient des limites de dimensions dures ; d'autres documentent des limites élevées ou aucune limite pratique pour les modèles d'embedding typiques. Vérifiez la documentation actuelle avant de vous engager. Choisissez quelque chose avec de la marge ; migrer un index vectoriel parce que vous avez atteint un plafond de dimensions est un sprint misérable.

_Dernière vérification effectuée sur les docs publics des projets et les pages produits le 8 mai 2026. Considérez cette matrice comme un instantané : les limites des services managés, les prix, les fonctionnalités de recherche hybride et les options d'index disque évoluent rapidement._

| Base de données | Déploiement | Licence | Recherche hybride | Vecteurs creux | SQL / similaire SQL | Multimodal | Index disque | Dimensions max | Point fort |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Auto-hébergé / managé (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manuel (RRF via SQL) | ❌ | ✅ SQL complet | ❌ | ✅ HNSW sur disque | 16 000 stockage ; 2 000 indexé `vector` | Déjà sur Postgres ; volumes de vecteurs modérés |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Auto-hébergé / Cloud | Apache 2.0 | ✅ BM25 natif | ✅ Support mature | ❌ (REST/gRPC) | ❌ | ✅ | 65 535 | Requêtes filtrées à grande échelle ; métadonnées complexes |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Auto-hébergé / Cloud | BSD 3 | ✅ BM25 natif + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ via modules | ✅ | 65 535 | Modèles d'accès GraphQL ; vectorisation intégrée |
| **[Pinecone](https://www.pinecone.io/)** | Cloud uniquement | Propriétaire | ✅ (ajouté en 2024) | ✅ | ❌ | ❌ | ✅ (serverless) | 20 000 | Simplicité managée ; pas d'équipe ops |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Auto-hébergé / Cloud (Zilliz) | Apache 2.0 | ✅ Natif | ✅ | ✅ Similaire SQL (Milvus Query Language) | ✅ | ✅ DiskANN | 32 768 | Échelle milliard ; entreprise sur site |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embarqué / auto-hébergé | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65 535 | Développement local et prototypage uniquement |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embarqué / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL via DataFusion | ✅ Natif | ✅ (format Lance) | Illimité | Edge / serverless ; lakehouse multimodal |
| **[Orama](https://github.com/oramasearch/orama)** | Embarqué / Cloud | Apache 2.0 | ✅ Texte intégral + vecteur | ❌ | ❌ | ❌ | ❌ | Variable | Applications JS/edge ; recherche site/app légère |
| **[Turbopuffer](https://turbopuffer.com/)** | Cloud uniquement (serverless) | Propriétaire | ✅ BM25 + vecteur | ❌ | ❌ | ❌ | ✅ (stockage objet) | 16 000 | SaaS multi-locataire ; millions d'espaces de noms |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Auto-hébergé / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER creux | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4 096 | Déjà sur la stack Elastic ; recherche hybride entreprise |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Auto-hébergé / AWS managé | Apache 2.0 | ✅ RRF + Recherche neuronale | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16 000 | Natif AWS ; alternative open-source à Elastic |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Auto-hébergé / Cloud | Apache 2.0 | ✅ Natif | ✅ Tenseurs / classement lexical | ✅ YQL | ✅ Tenseurs | ✅ | Effectivement illimité | Systèmes de recherche + classement + recommandation |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Auto-hébergé / Cloud | Apache 2.0 | Manuel | ❌ | ✅ SQL complet | ❌ | ✅ Colonne + HNSW | Variable | Analytique/logs avec recherche vectorielle à côté de l'OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / auto-hébergé | SSPL | ✅ Intégré | ❌ | ✅ MQL + agrégation | ❌ | ✅ HNSW | 8 192 | Déjà sur MongoDB ; document + vecteur en un |
| **[Redis (VSS)](https://github.com/redis/redis)** | Auto-hébergé / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ RAM uniquement | 32 768 | Latence ultra-faible ; recherche vectorielle en couche cache |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / auto-hébergé | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Focus natif | ✅ | Variable | Multimodal de bout en bout : image + texte + vidéo |

### Lire la matrice

Quelques éléments ne rentrent pas proprement dans un tableau :

**Vecteurs creux** sont comment obtenir un matching de mots-clés de qualité BM25 dans un index vectoriel, sans moteur de texte intégral séparé. Qdrant et Elasticsearch ont des implémentations particulièrement matures ici. Weaviate les supporte via BM25F. Si la recherche hybride est critique et que vous ne pouvez pas faire tourner deux systèmes, cherchez le support des vecteurs creux.

**Index sur disque** sont un levier de coût, pas un détail d'implémentation. Les index HNSW résidents en RAM sont rapides mais peuvent devenir coûteux à mesure que le nombre de vecteurs, la dimension, les métadonnées et la surcharge du graphe augmentent. Les alternatives sur disque (Milvus DiskANN, Elasticsearch DiskBBQ, stockage objet Turbopuffer, format Lance de LanceDB) échangent une certaine latence de requête contre un coût d'infrastructure plus bas. Pour les grands index RAG, ce compromis vaut souvent la peine d'être testé.

**La multi-location de Turbopuffer** est construite autour de très grands nombres d'espaces de noms. Son positionnement public et ses témoignages clients mettent en avant des charges de travail comme le corpus volumineux et riche en espaces de noms de Notion. Si chaque utilisateur ou organisation a besoin d'une recherche vectorielle isolée, cette architecture peut changer l'économie, mais il faut toujours benchmarker votre propre forme de locataire.

**Le mode embarqué de LanceDB** est ce qui se rapproche le plus de « SQLite pour la recherche vectorielle. » Il s'exécute in-process, ne nécessite pas de serveur et fonctionne dans Lambda, Cloudflare Workers et les environnements edge. Le format colonnaire Lance rend l'opération embarquée pratique à une échelle réelle.

**Orama est une infrastructure d'expérience de recherche, pas un entrepôt.** Il est excellent lorsque vous voulez un minuscule moteur de recherche full-text/vectoriel/hybride dans une application JavaScript, en edge, ou comme couche de recherche gérée pour site/application. Ce n'est pas l'outil que je choisirais pour la récupération de milliards de vecteurs, l'analyse lourde ou les jointures filtrées complexes.

**Vespa est ce que vous utilisez lorsque la récupération n'est que la moitié du produit.** Il combine la récupération lexicale, la recherche des plus proches voisins, les tenseurs, les expressions de classement, le regroupement et le service en ligne. Cette puissance est réelle, mais la complexité opérationnelle et de modélisation l'est aussi. Il convient davantage aux équipes de recherche/recommandation qu'à « ajouter une recherche sémantique à mon application CRUD ».

**ClickHouse a sa place dans la conversation lorsque la recherche est liée à l'analyse.** Si votre source de vérité est constituée d'événements, de logs, de traces, de métriques ou de grandes tables de faits, ClickHouse peut conserver la distance vectorielle, le filtrage, l'agrégation et désormais une indexation full-text sérieuse dans un seul moteur SQL. Ce n'est pas une base de données vectorielle dédiée, mais pour la récupération analytique, cela peut être la réponse ennuyeuse de la meilleure façon.

**Chroma est le plus fort pour le développement/test et les déploiements de petites applications.** Si vous visez de très grands corpus, la haute disponibilité, une opération intensive en disque ou une recherche hybride de premier ordre, évaluez un magasin orienté production avant de promouvoir le prototype en infrastructure.

### La décision simplifiée

Si vous avez vraiment dépassé pgvector – généralement parce que les benchmarks montrent que le nombre de vecteurs, le filtrage, le taux d'écriture ou la latence en haute concurrence dépassent les limites de votre Postgres – choisissez par contrainte :

- **Produit SaaS avec isolation par locataire** → Turbopuffer
- **Besoin de performances de niveau Rust + filtrage de métadonnées complexe** → Qdrant
- **Déjà sur la pile Elastic/ELK** → Elasticsearch avec DiskBBQ
- **Entreprise AWS qui veut de l'open-source** → OpenSearch
- **Plateforme de recherche/recommandation avec des besoins de classement sérieux** → Vespa
- **Analyse, observabilité ou recherche de logs/événements** → ClickHouse
- **À l'échelle du milliard sur site / auto-hébergé** → Milvus
- **Edge / serverless / multimodal** → LanceDB
- **Petite application JS, site de documentation ou UX de recherche native edge** → Orama
- **Zéro opération, ça marche, le coût est secondaire** → Pinecone
- **Multimodal d'abord (images, vidéo, audio)** → Marqo
- **Déjà sur MongoDB** → Atlas Vector Search
- **Déjà sur Postgres, besoin de plus de marge** → Supabase Vector ou Neon (tous deux pgvector gérés, avec de meilleurs outils)

---

## Une chose à ne pas faire

N'utilisez pas la recherche vectorielle comme recherche de texte floue pour des choses qui ont des réponses correctes.

"Trouve-moi l'utilisateur avec l'email `dan@example.com`" n'est pas un problème de recherche vectorielle. Il en va de même pour "Trouve-moi la commande avec l'ID `ORD-12345`". Embedder `ORD-12345` et faire une similarité cosinus sur votre table de commandes renverra *quelque chose*, mais cela peut être erroné. Ce sont des problèmes de correspondance exacte. Utilisez votre clé primaire ou un index classique.

La recherche vectorielle renvoie l'élément le *plus similaire* de votre jeu de données, même quand rien n'est pertinent. Elle ne sait pas qu'il n'y a pas de bonne réponse. C'est acceptable pour des documents connexes. C'est catastrophique pour la recherche d'enregistrements spécifiques, où une quasi-correspondance erronée est pire qu'un résultat vide.

Sachez à quoi sert chaque outil. La plupart sont déjà dans votre installation Postgres. Utilisez-les là où ils conviennent.
````
