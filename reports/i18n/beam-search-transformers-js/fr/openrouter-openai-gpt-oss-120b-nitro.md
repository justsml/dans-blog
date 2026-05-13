# Translation Candidate
- Slug: beam-search-transformers-js
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-04-16--beam-search-transformers-js/fr/index.mdx
- Validation: passed
- Runtime seconds: 20.99
- Input tokens: 12395
- Output tokens: 3490
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001112
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Implémentation de la recherche en faisceau dans Transformers.js
subTitle: >-
  Mille lignes, des mois d’attente et une plongée au cœur de la génération de
  texte.
date: '2026-04-16'
modified: '2026-04-16'
tags:
  - ai
  - transformers
  - javascript
  - open-source
  - nlp
  - beam-search
  - machine-learning
category: AI
subCategory: Open Source
draft: true
hidden: true
publish: false
popularity: 0.7
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
> CW : Ce post contient du jargon technique. Donc, si vous entendez parler de `softmax` ou de `log probs` et que vous avez immédiatement envie de dire à `Max` d’arrêter avec ses `probs`, passez peut‑être votre tour.

---

## Le problème : `num_beams` était un mensonge

Au cœur de la boucle de génération de `transformers.js`, un commentaire était présent depuis longtemps :

```js
// TODO: Support beam search
```

Et juste en dessous, une instruction `break` qui sortait silencieusement de la boucle après le premier token. Chaque configuration de modèle livrée avec `num_beams > 1` — T5, BART, Whisper — se retrouvait en décodage glouton sans le savoir. Aucun avertissement. Aucun erreur. Juste… une sortie incorrecte.

Je suis tombé dessus en testant un pipeline de résumé et en me demandant pourquoi mes sorties étaient si dégradées comparées à la référence Python. J’ai remonté jusqu’à `modeling_utils.js`, j’ai vu le TODO, et j’ai commis l’erreur de penser « à quel point cela peut être difficile ».

La réponse est : assez difficile, mais de façon intéressante.

---

## Ce qu’est réellement la recherche en faisceau

Qui n’a jamais

Le décodage glouton choisit le token à la probabilité la plus élevée à chaque étape. Simple, rapide, souvent sous‑optimal — le premier mot qui sort de votre bouche n’est pas toujours le meilleur départ pour une phrase.

La recherche en faisceau, quant à elle, maintient simultanément `num_beams` séquences candidates, en les développant à chaque pas avec l’ensemble complet du vocabulaire, puis en ne conservant que les `num_beams` meilleures selon la probabilité logarithmique cumulative. C’est une recherche en largeur bornée à travers l’espace des tokens.

Le résultat sont des séquences globalement meilleures, au prix d’un coût de calcul multiplié par `num_beams`.

Trois variantes existent :

- **Recherche en faisceau standard** — déterministe, prend les candidats argmax, séquence globale optimale  
- **Recherche en faisceau diversifiée** — divise les faisceaux en groupes, pénalise les tokens déjà choisis par les groupes précédents afin que vos candidats de sortie ne répètent pas tous la même chose  
- **Échantillonnage en faisceau** — stochastique, applique top‑k + softmax + échantillonnage aléatoire à l’intérieur du cadre du faisceau  

Les trois sont maintenant présentes dans la PR.

---

## La décision d’architecture qui m’a réellement posé problème


Le code existant contenait une classe `BeamSearchSampler`. Elle semblait pertinente. Mais il y avait un piège subtil : elle ne renvoyait que les `num_beams` meilleurs tokens par faisceau. Cela paraît correct jusqu’à ce que l’on réalise que ce n’est pas suffisant pour un vrai beam search.

Un beam search correct doit examiner **tous les `num_beams × vocab_size` candidats par élément du batch** afin de trouver les meilleures continuations globales. On ne peut pas se contenter de regarder les quelques meilleurs tokens de chaque faisceau isolément — il faut les classer conjointement sur l’ensemble des faisceaux.

J’ai donc contourné complètement le sampler existant. J’ai calculé le `log_softmax` directement sur les logits traités, ajouté les scores cumulatifs des faisceaux, puis effectué un tri à deux niveaux sur l’espace de candidats combiné. Des mathématiques plus propres, une sémantique correcte.

La classe `BeamSearchSampler` est toujours là, intacte, toujours utile pour ce qu’elle faisait à l’origine. C’est l’un de ces cas où la voie de réutilisation « obvie » vous mène dans la mauvaise direction.

---

## Le bug le plus irritant : réordonnancement du cache KV

Lorsque la recherche en faisceau élimine des séquences, elle ne se contente pas de tronquer des jetons — elle *réordonne* les faisceaux qui survivent. Le faisceau 3 peut produire la meilleure continuation et être cloné ; les faisceaux 0 et 2 peuvent être abandonnés.  

Le problème vient du cache clé‑valeur du mécanisme d’attention du transformeur, qui est indexé le long de la dimension batch par faisceau. Si vous réordonnez les séquences de sortie sans réordonner le cache, l’état devient incohérent : le modèle se réfère à un passé erroné.  

La correction se trouve dans `_reorder_cache()` — une méthode qui applique `index_select` sur chaque tenseur clé‑valeur passé afin de les ré‑indexer selon le nouvel ordre des faisceaux, puis libère les tenseurs obsolètes.  

Sur CPU, c’est direct : découper les tableaux typés par ligne. Sur les tenseurs GPU, c’est plus pénible — il faut télécharger les données de façon asynchrone (`ort_tensor.getData(true)`), les réordonner, puis les re‑téléverser. J’ai ajouté à `tensor.js` à la fois `index_select` (synchrone, CPU) et `index_select_async` pour couvrir les deux chemins.  

Les modèles encodeur‑décodeur (T5, BART) possèdent *deux* caches : encodeur et décodeur. Les PKV de l’encodeur ne changent pas pendant le décodage, ils traversent donc le pipeline inchangés. Seuls les PKV du décodeur nécessitent un réordonnancement. Confondre ces deux cas produit des sorties très mauvaises, de façon subtile — le type d’erreur qui semble presque correct jusqu’à comparaison avec une référence.

## Recherche de faisceaux diversifiée : la partie amusante

La recherche de faisceaux diversifiée ajoute une `diversity_penalty` qui décourage les groupes de faisceaux ultérieurs de choisir des tokens déjà sélectionnés par les groupes précédents. L’intuition est : si tous vos faisceaux convergent vers la même sortie, vous n’avez pas vraiment exploré l’espace des hypothèses.

Du point de vue implémentation, les groupes doivent être traités *séquentiellement* à chaque étape de décodage, pas en parallèle, car chaque groupe doit voir ce que les groupes précédents ont choisi avant de calculer ses propres scores.

La structure que j’ai finalement retenue :

```
for each step:
  token_counts = {}
  for each group in groups:
    extract this group's beams and logits
    for each token selected by previous groups:
      logits[token] -= diversity_penalty * token_counts[token]
    score candidates, select top 2×group_size
    group_scorer.process(...)
    record newly selected tokens into token_counts
```

La dépendance séquentielle ici est réelle. Si vous la parallélisez, vous perdez la garantie de diversité. J’ai été brièvement tenté d’essayer de la batcher quand même, et cela aurait été une erreur.

## La file d’attente prioritaire `BeamHypotheses`

Lorsqu’un faisceau rencontre le token EOS avant `max_length`, il est « terminé » — mais on ne peut pas simplement l’abandonner ou le renvoyer immédiatement. On l’ajoute à une file d’attente prioritaire bornée nommée `BeamHypotheses`.

La file conserve jusqu’à `num_beams` séquences complètes par élément du batch, évaluées selon :

```
score = sum_logprobs / (length ^ length_penalty)
```

`length_penalty > 1.0` favorise les sorties plus longues ; `< 1.0` favorise les plus courtes. Le drapeau `early_stopping` détermine si le faisceau est considéré comme terminé dès que la file est pleine (`true`), jamais avant `max_length` (`"never"`), ou lorsqu’aucun faisceau restant ne pourrait éventuellement dépasser l’hypothèse terminée la plus mauvaise (`false`).

Le cas `false` est le plus intéressant — il faut suivre si un faisceau actif peut encore battre l’hypothèse la plus mauvaise actuelle compte tenu du score maximal restant possible. C’est une optimisation d’élagage qui empêche d’atteindre `max_length` alors que de bonnes hypothèses sont déjà disponibles.

Ce code se trouve dans `beam_search.js`, nouveau fichier, environ 240 lignes au total. Il exporte également `BeamSearchScorer`, qui gère les instances `BeamHypotheses` sur l’ensemble du batch et implémente `finalize()`.

---

## Tests par rapport à la référence Python

Chaque détail d’implémentation non trivial possède un équivalent Python dans la bibliothèque `transformers` de HuggingFace. Je m’y suis largement appuyé.

Le jeu de tests que j’ai ajouté couvre :

- Recherche en faisceau standard sur un encodeur‑décodeur (T5) et sur un modèle décodant uniquement (type LLaMA)
- Recherche en faisceau diversifiée avec `num_beam_groups=2, diversity_penalty=0.5`
- Échantillonnage en faisceau avec `do_sample=true, top_k=10`
- `num_return_sequences > 1` — vérification que la forme de sortie est `[N, seq_len]`
- Lancers d’erreurs corrects pour les combinaisons incompatibles : CFG + recherche en faisceau, streaming + recherche en faisceau, `num_return_sequences > num_beams`

Les tests de « lancers d’erreurs corrects » sont sous‑estimés. Ils documentent les limitations intentionnelles et empêchent qu’un utilisateur obtienne silencieusement de mauvais résultats en essayant de combiner des fonctionnalités qui ne le peuvent pas. (Je le sais parce que j’ai essayé de combiner CFG et recherche en faisceau pendant le développement. Les mathématiques ne tiennent pas. Ça lève maintenant.)

---

## Ce qui manque encore

Quelques éléments que j’ai explicitement laissé de côté, marqués avec `throws` :

- **Échantillonnage diversifié en faisceau** (`num_beam_groups > 1` + `do_sample`) : les formules deviennent réellement complexes ici. La recherche en faisceau diversifié standard s’exécute séquentiellement par groupe ; y ajouter de l’échantillonnage nécessite de réfléchir soigneusement à la façon d’appliquer la pénalité de diversité en mode stochastique. C’est faisable, simplement pas implémenté.
- **Streaming + recherche en faisceau** : le streaming délivre les tokens au fur et à mesure qu’ils sont générés. La recherche en faisceau, par définition, ne sait pas quelle séquence est la meilleure avant plusieurs pas en avant. Ces deux approches sont fondamentalement en tension. On pourrait diffuser le meilleur faisceau jusqu’ici, mais cela constitue une fonctionnalité différente avec ses propres questions de conception.

---

## La partie dont personne ne parle : latence en open source
---

Le code fonctionne. Les tests passent. La suite de tests existante est propre. Elle est en attente de revue depuis des mois.

C’est simplement le mode de fonctionnement des projets open source majeurs et très populaires. L’équipe Hugging Face publie rapidement, le backlog d’incidents est gigantesque, et une PR d’environ 1 000 lignes qui touche la boucle de génération principale représente un engagement de revue non négligeable. Ils ont été réactifs dans les commentaires et réellement investis lorsqu’ils ont examiné le code. Je ne me plains pas — je documente.

Si vous contribuez à un projet OSS de grande envergure et que vous attendez une fusion rapide : ajustez vos attentes. Quelques mois, c’est la norme pour quelque chose de cette ampleur. Le code continue de fonctionner sur votre fork pendant tout ce temps.

---

## Ce que j’en ai réellement retiré

Quelques éléments que je n’avais pas auparavant :

1. **Un modèle mental réel du beam search** — pas la version de manuel, mais celle qui gère les cas limites. Comment les caches KV se cassent. Pourquoi le tri à deux niveaux compte. Ce que `length_penalty` modifie réellement dans les scores.

2. **Une meilleure appréciation des calculs sur typed arrays en JS** — implémenter `index_select` sur des typed arrays CPU est bas‑niveau d’une façon que l’on touche rarement dans le code web. Ça fonctionne, mais ce n’est pas ce pour quoi JavaScript a été conçu et on le ressent.

3. **Un respect renouvelé pour l’implémentation de référence en Python.** La bibliothèque HuggingFace `transformers` est volumineuse et parfois difficile, mais la logique du beam search est bien commentée et les décisions de conception sont clairement intentionnelles. La lire a été le moyen le plus rapide de comprendre ce que je devais réellement construire.

4. **Un correctif en production** — même s’il n’est pas encore fusionné, il existe, il fonctionne, et les gens peuvent l’utiliser depuis la branche PR. C’est suffisant.

Le commentaire TODO qui a déclenché tout ça a disparu de mon fork. C’est satisfaisant d’une façon calme et nerd.

Si vous faites du seq2seq en JavaScript et que vous voulez un beam search correct dès aujourd’hui, [le PR est public](https://github.com/huggingface/transformers.js/pull/1539).

¹ Oui, je sais que `num_beams=1` n’est rien d’autre qu’une recherche gloutonne. Le cas dégénéré est bien défini.

² Les modèles uniquement encodeurs (BERT, etc.) ne génèrent aucun jeton, donc rien de tout cela ne s’applique à eux. Ils ne sont que des vibes.
````
