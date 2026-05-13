# Translation Candidate
- Slug: lancedb-wasm-browser-client
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-04-16--lancedb-wasm-browser-client/fr/index.mdx
- Validation: passed
- Runtime seconds: 10.15
- Input tokens: 9054
- Output tokens: 2725
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.000844
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Recherche vectorielle sans serveur
subTitle: 'Créer un client de recherche vectorielle avec Rust, WASM et TypeScript'
date: '2026-04-16'
modified: '2026-04-16'
tags:
  - rust
  - wasm
  - lancedb
  - vector-search
  - open-source
  - webassembly
  - typescript
  - ai
category: AI
subCategory: Open Source
draft: false
hidden: true
publish: false
popularity: 0.75
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
## Le problème : vous ne pouvez pas rechercher dans une table Lance depuis un navigateur

LanceDB est une base de données vectorielle exceptionnelle. Elle est bien plus simple et moins coûteuse que les bases de données traditionnelles. Vous pouvez publier des tables contenant des colonnes vectorielles, des colonnes de recherche plein texte (FTS), héberger les fichiers sur S3 ou un CDN, et interroger les données directement depuis S3 à partir d’un serveur Node.js. Aucun démon n’est requis.

Ce que vous *ne pouviez pas* faire — avant ce PR — était d’ouvrir cette table directement depuis un navigateur et d’exécuter une recherche. Il fallait un serveur intermédiaire : un Lambda, un conteneur, *quelque chose* capable d’exécuter du Rust, du Node.js/WASM ou du Python.

L’objectif était ambitieux, mais centré sur un résultat concret : **des index vectoriels hébergés en HTTP, en lecture‑seule, directement interrogeables**.

---

## L’architecture

Il y a trois couches dans l’implémentation :

### 1. Artéfacts de publication Rust (`web_publish.rs`)

Avant qu’un navigateur puisse interroger une table Lance, il doit savoir ce qui est sûr à rechercher. Le format interne de Lance comporte des fonctionnalités qui ne sont pas compatibles avec le navigateur — fichiers delta, bases externes, types d’index que le runtime WASM ne peut pas exécuter. Au lieu de laisser le navigateur découvrir cela au moment de la recherche (ce qui serait problématique), l’étape de publication génère des fichiers side‑car explicites :

- `_web.json` — déclare le schéma et quelles colonnes sont interrogeables depuis le navigateur (colonnes vectorielles avec types de distance pris en charge, colonnes FTS)
- `_snapshot.json` — une vue ponctuelle du jeu de données que le client navigateur peut consommer sans comprendre le protocole complet d’évolution du jeu de données
- `_latest.manifest` / `_latest.version` — pointeurs stables que le navigateur interroge pour détecter l’obsolescence

Le drapeau `isComplete` dans le snapshot agit comme soupape de sécurité. Si le jeu de données dépend de bases externes ou de fichiers de données que le chemin navigateur ne peut pas lire en toute sécurité, `isComplete=false` et le navigateur le rejette immédiatement avec une erreur claire plutôt que de produire des résultats subtilement erronés.

C’est la partie dont je suis le plus satisfait d’avoir implémentée en Rust plutôt qu’en JavaScript. Le jugement sur ce qui est sûr pour le navigateur réside là où les métadonnées de la table existent réellement.

### 2. Crate Rust `lancedb-wasm`

Il s’agit du runtime WebAssembly : un magasin d’objets basé sur `fetch`, un moteur de recherche côté navigateur, et un évaluateur d’expressions pour les prédicats de filtrage.

Le magasin d’objets `fetch` (`fetch_object_store.rs`) implémente le trait `ObjectStore` de Lance sur des requêtes HTTP de type range. Les lectures internes de Lance sont déjà structurées comme des récupérations de plages d’octets, ce qui se traduit proprement en en‑têtes `Range: bytes=N-M`. C’est la partie la plus satisfaisante du projet — l’architecture existante était presque faite pour cela, il ne me restait qu’à la raccorder.

Le moteur côté navigateur (`browser.rs`) gère la recherche : voisin le plus proche vectoriel, texte intégral, et hybride (vector + FTS avec fusion RRF). Les expressions de filtre (`browser_expr.rs`) évaluent les prédicats de filtre de Lance côté client en Rust pur, compilé en WASM.

Le rejet de fonctionnalités est strict et délibéré. Distance `hamming` ? Rejetée immédiatement avec un message clair — pas de résultat silencieusement erroné, pas de panique d’exécution. `fastSearch` sur un instantané incomplet ? Rejeté. Dispositions de chemin de base non prises en charge ? Rejetées. L’objectif était de « fail closed » : si le chemin navigateur ne peut pas respecter le contrat, il le signale.

### 3. Package TypeScript `@lancedb/lancedb-web`

L’interface publique est volontairement restreinte :

```typescript
import { searchTable } from "@lancedb/lancedb-web";

const results = await searchTable("https://my-cdn.example.com/my-table", "semantic search query", {
  select: ["title", "url", "score"],
  limit: 10,
});
```

En interne, `searchTable()` privilégie un chemin d’exécution soutenu par un Worker afin que la recherche ne bloque pas le thread principal. Le module WASM s’exécute dans le Worker ; les résultats remontent via un protocole typé (`worker_protocol.ts`). Un export optionnel `./transformers` enveloppe `@xenova/transformers` pour générer les embeddings de requête côté client — vous pouvez ainsi passer du texte brut à des résultats de recherche vectorielle sans jamais quitter le navigateur.

## Les parties difficiles

### Les lectures segmentées (ranged reads) sur HTTP ne sont pas gratuites

Les modèles de lecture de Lance supposent un magasin d’objets capable de gérer efficacement de nombreuses petites requêtes segmentées. S3 et GCS sont conçus pour cela. Les navigateurs… le sont généralement aussi, mais `fetch` avec les en‑têtes `Range` présente quelques particularités que les abstractions du magasin d’objets Rust existant n’ont pas à gérer.

Le problème principal, c’est que les navigateurs tamponnent parfois ou relancent agressivement les requêtes, et vous ne pouvez pas contrôler le regroupement des connexions TCP comme vous le pouvez dans un processus natif. Pour de gros index vectoriels, cela a son importance. L’implémentation actuelle est correcte ; la question de savoir si elle est suffisamment rapide pour un usage en production sur de grandes tables se résoudra lors de la revue.

### La question de la génération du side‑car

Le PR soulève explicitement ce point pour les mainteneurs, car il existe un vrai compromis de conception : les fichiers side‑car du navigateur (`_web.json`, `_snapshot.json`) doivent-ils être émis *automatiquement* à chaque validation de table, ou faut‑il recourir à un appel explicite `publish()` ?

L’automatique est plus ergonomique — vous obtenez le support navigateur « gratuitement ». Mais cela implique que chaque écriture locale entraîne un léger surcoût, et cela lie le contrat du navigateur au chemin de validation principal d’une manière qui pourrait compliquer de futures modifications de l’un ou l’autre.

Le publish explicite est plus correct du point de vue du contrat — vous indiquez « cette version est prête pour le navigateur » — mais il est facile d’oublier cet appel, ce qui signifie que des tables qui *devraient* être interrogeables depuis le navigateur restent silencieusement inaccessibles.

Je penche pour l’automatique, en consignant les échecs de side‑car comme un avertissement plutôt qu’en bloquant la validation. Mais je reste réellement incertain et j’ai signalé ce point dans le PR.

### Qu’est‑ce qui compte comme « browser‑safe » ?

Le drapeau `isComplete` et la logique de filtrage des colonnes dans `web_publish.rs` codifient un jugement sur ce que le navigateur peut gérer. Ce jugement doit rester synchronisé avec les capacités réelles du runtime WASM. Si quelqu’un ajoute un nouveau type d’index à Lance que le navigateur ne peut pas exécuter, le code de publication doit savoir l’exclure — sinon vous annoncerez une capacité que le navigateur ne pourra pas honorer au moment de la recherche.

La solution correcte ici serait probablement un registre de capacités partagé entre le chemin de publication et le runtime, afin qu’ils ne dérivent pas. Je l’ai implémenté pour l’instant comme des constantes parallèles, ce qui est rapide mais fragile. C’est probablement l’aspect que je souhaiterais améliorer ensuite.

## Le dilemme du wrapper Transformers

L’export `./transformers` est une fonctionnalité de confort : il prend une requête texte, la fait passer à travers un modèle d’embedding local via `@xenova/transformers`, puis transmet le vecteur résultant au moteur de recherche LanceDB. Recherche sémantique sans serveur depuis une page HTML statique.

C’est aussi l’élément dont je suis le moins sûr qu’il appartienne à cette PR. Il est réellement utile et déjà implémenté, mais il constitue une dépendance et une surface d’API distincte de la question centrale de la recherche dans le navigateur. Les mainteneurs pourraient légitimement vouloir d’abord livrer l’API de base `searchTable()` puis itérer séparément sur les embeddings.

Je leur ai demandé. On verra.

---

## Ce que je ferais différemment

**Définir le périmètre plus tôt.** La PR compte 14 500 lignes. C’est beaucoup à examiner en une fois. J’aurais pu livrer d’abord le format d’artifact de publication, puis le runtime WASM, puis le paquet TypeScript. Trois PR plus petites auraient été plus faciles à fusionner. Je ne l’ai pas fait parce que je voulais valider l’ensemble du scénario de bout en bout avant de proposer les différents morceaux — ce qui était logique pour la confiance, mais cela alourdit fortement la charge de révision.

**Écrire d’abord le registre de capacités.** Le risque de dérive entre `web_publish.rs` et `browser.rs` est réel. Commencer par un type de capacité partagé que les deux côtés utilisent aurait été plus propre que des listes de constantes parallèles qu’il faut se rappeler de garder synchronisées.

**Nommer les choses moins subtilement.** `_web.json` est un nom correct pour un format interne. Il devient un nom porteur dès que quelqu’un le met en cache ou construit des outils autour. J’aurais dû passer plus de temps sur la dénomination avant de soumettre — c’est l’un de ces éléments beaucoup moins coûteux à changer avant que d’autres ne dépendent de lui.

---

## Le point plus large

Ce qui a rendu ce projet viable, c’est que l’architecture interne de Lance était déjà bien structurée pour les lectures segmentées. L’abstraction du magasin d’objets est propre. Le format des métadonnées est explicite. Le concept de snapshot m’a fourni un endroit naturel pour exprimer « c’est une vue compatible navigateur de ce jeu de données ».

Des limites d’abstraction solides ne facilitent pas seulement la compréhension du code interne — elles permettent à quelqu’un comme moi d’arriver de l’extérieur du projet et d’y brancher un nouvel environnement d’exécution sans toucher au cœur. C’est une vraie vertu de conception, et cela a fait que les 14 000 lignes ressemblaient plus à un remplissage de forme qu’à une lutte contre la base de code.

Le PR est [ici](https://github.com/lancedb/lancedb/pull/3247) si vous voulez voir les détails. Toujours en attente de revue. Les mainteneurs ont été accueillants et je reste prudemment optimiste.
````
