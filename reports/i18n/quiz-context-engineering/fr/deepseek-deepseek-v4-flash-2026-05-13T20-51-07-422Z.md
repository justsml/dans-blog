# Translation Candidate
- Slug: quiz-context-engineering
- Locale: fr
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-05-09--quiz-context-engineering/fr/index.mdx
- Validation: deferred
- Runtime seconds: 135.45
- Input tokens: 14365
- Output tokens: 20520
- Thinking tokens: unknown
- Cached input tokens: 1152
- Cache write tokens: 0
- Estimated cost: $0.007599
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Quiz : 14 questions d''ingénierie de contexte'
subTitle: >-
  L'ingénierie des prompts, c'est ce que vous faites. L'ingénierie du contexte,
  c'est ce que vous livrez.
date: '2026-05-09'
modified: '2026-05-09'
tags:
  - quiz
  - ai
  - llm
  - context-engineering
  - prompts
  - rag
  - tokens
  - advanced
category: Quiz
subCategory: AI
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.85
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">L'ingénierie de prompt obtient les slogans. L'ingénierie de contexte obtient le pager. Connaissez-vous bien la partie d'un système d'IA qui est réellement livrée ?</p>

Ce quiz couvre les fenêtres de contexte, les budgets de tokens, le retrieval, la structure des prompts, et les modes de défaillance qui transforment des démos propres en produits confus. Il commence en douceur. Il n'y reste pas.

Apportez les preuves.

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Fondamentaux"
  title="Les bases de la fenêtre de contexte"
  options={[
    {text: 'Le nombre maximum de requêtes par minute'},
    {text: 'La limite combinée de jetons pour l\'entrée et la sortie', isAnswer: true},
    {text: 'Le nombre de messages dans une conversation'},
    {text: 'La mémoire disponible entre les sessions'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que désigne la "fenêtre de contexte" dans un LLM ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La fenêtre de contexte est le nombre total de jetons qu'un modèle peut traiter en un seul appel — **entrée + sortie combinées**. Une fenêtre de contexte de 128K signifie que votre prompt + les documents récupérés + l'historique de la conversation + la réponse du modèle doivent tous tenir dans 128 000 jetons.

    Cela n'a rien à voir avec les sessions, la mémoire ou les limites de débit. Lorsque vous atteignez la limite, le modèle soit tronque, génère une erreur, ou — pire — supprime silencieusement des jetons que vous n'attendiez pas.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Fondations"
  title="Estimation des tokens"
  options={[
    {text: 'Environ 50 tokens'},
    {text: 'Environ 130 tokens', isAnswer: true},
    {text: 'Environ 300 tokens'},
    {text: 'Environ 1 000 tokens'},
  ]}
>
  <slot name="question">
  <div className="question">
    Combien de tokens utilise approximativement un paragraphe anglais de 100 mots avec un tokenizer moderne courant ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La règle empirique est d'**environ 1,3 token par mot** pour un texte anglais typique. Un paragraphe de 100 mots ≈ 130 tokens.

    Cela varie considérablement selon le type de contenu :
    - Code : ~1,5–2 tokens/mot (caractères spéciaux, espaces)
    - Documentation technique avec beaucoup d'identifiants : peut être plus élevé
    - Mots anglais courants : souvent 1 token chacun
    - Mots rares, noms, texte non anglais : souvent 2–4 tokens chacun

    La bibliothèque `tiktoken` vous donne des comptes exacts. Mesurez toujours avant de supposer.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Fondamentaux"
  title="Rôle du Prompt Système"
  options={[
    {text: 'Il est traité en premier et a un poids plus élevé que les messages utilisateur', isAnswer: true},
    {text: 'Il est identique à un message utilisateur mais affiché différemment'},
    {text: 'Il est uniquement utilisé pour les appels API, pas pour les interfaces de chat'},
    {text: 'Il persiste entre les sessions comme mémoire à long terme'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est l'effet pratique d'utiliser le rôle `system` par rapport au rôle `user` dans le tableau de messages ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le rôle `system` est traité comme des instructions prioritaires. Les modèles sont entraînés à lui accorder plus de poids qu'aux messages utilisateur — c'est la frontière architecturale entre « ce que le développeur a dit » et « ce que l'utilisateur a dit ».

    Ce n'est pas magique. Cela ne garantit pas que le modèle ignore les instructions utilisateur contradictoires (voir : injection de prompt). Mais cela augmente significativement la tendance du modèle à suivre vos instructions, en particulier sur les modèles ayant une forte capacité de suivi d'instructions.

    En pratique : mettez votre personnalité, vos règles et vos contraintes comportementales dans `system`. Mettez le contexte récupéré et les données utilisateur dans `user`. Ne mettez jamais d'entrée contrôlée par l'utilisateur dans `system`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Récupération"
  title="Perdu au Milieu"
  options={[
    {text: 'Les modèles fonctionnent aussi bien, peu importe où le contexte est placé'},
    {text: 'Les modèles fonctionnent mieux avec le contexte tout à la fin'},
    {text: 'Les modèles fonctionnent mieux avec le contexte au début et à la fin, et moins bien au milieu', isAnswer: true},
    {text: 'Les modèles fonctionnent mieux avec le contexte au milieu du prompt'},
  ]}
>
  <slot name="question">
  <div className="question">
    Les recherches sur le problème « Perdu au Milieu » montrent que les LLM ont tendance à :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'article [« Perdu au Milieu » (Liu et al., 2023)](https://arxiv.org/abs/2307.03172) a démontré que les LLM ont systématiquement du mal avec les informations placées au milieu de longs contextes. Les performances sont nettement meilleures lorsque les informations pertinentes apparaissent au **début ou à la fin** de la fenêtre de contexte.

    Implication pratique : lors de l'insertion de morceaux récupérés dans un prompt RAG, ne les ajoutez pas simplement dans l'ordre de pertinence. Placez votre résultat le mieux classé en premier, le deuxième mieux classé en dernier, et remplissez le milieu avec du matériel moins bien classé. Contre-intuitif, mais mesurablement meilleur.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Récupération"
  title="Stratégie de découpage"
  options={[
    {text: 'Utilisez la plus grande taille de chunk que votre fenêtre de contexte permet'},
    {text: 'Utilisez toujours 512 tokens — c\'est'},
    {text: 'Utilisez des chunks qui se chevauchent, dimensionnés pour correspondre à la structure de votre contenu', isAnswer: true},
    {text: 'La taille du chunk n\'a pas d\'importance'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le principe le plus important lors du découpage de documents pour le RAG ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il n'y a pas de taille de chunk universellement correcte — cela dépend de votre contenu. Les principes importants sont :

    1. **Adaptez-vous à la structure de votre contenu.** Les pages FAQ se découpent bien au niveau Q+R. Les documents juridiques se découpent bien au niveau des clauses. Le code se découpe bien au niveau des fonctions.
    2. **Utilisez le chevauchement.** Un chunk de 512 tokens avec 64 tokens de chevauchement de chaque côté permet de récupérer les réponses qui chevauchent une limite.
    3. **Mesurez.** Construisez un ensemble d'évaluation et testez plusieurs tailles de chunk. La taille du chunk importe plus que le modèle d'embedding.

    « 512 tokens » est un point de départ raisonnable, pas une loi.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Récupération"
  title="Recherche hybride"
  options={[
    {text: 'Exécuter la même requête deux fois pour redondance'},
    {text: 'Utiliser deux modèles d\'embedding différents sur le même corpus'},
    {text: 'Combiner la recherche vectorielle avec la recherche par mots-clés pour une meilleure récupération', isAnswer: true},
    {text: 'Rechercher simultanément dans plusieurs bases de données vectorielles'},
  ]}
>
  <slot name="question">
  <div className="question">
    Dans les systèmes RAG, la « recherche hybride » fait référence à :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La recherche hybride combine la **recherche vectorielle** (similarité sémantique via les embeddings) et la **recherche par mots-clés** (BM25 / recherche plein texte) car elles échouent de manière complémentaire :

    - La recherche vectorielle peine avec les termes exacts : noms de produits, codes d'erreur, numéros de modèle, identifiants techniques
    - La recherche par mots-clés peine avec la paraphrase : « comment annuler » vs. « résilier l'abonnement »

    Les résultats des deux sont fusionnés à l'aide du **Reciprocal Rank Fusion (RRF)** — un algorithme de classement qui combine les positions de plusieurs listes classées sans nécessiter de scores normalisés.

    Les deux sont disponibles dans Postgres avec `pgvector` + `tsvector`. Vous n'avez peut-être pas besoin d'un service de recherche séparé.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Gestion des jetons"
  title="Budget de contexte"
  options={[
    {text: 'Utiliser 95% ou plus de la fenêtre de contexte pour maximiser les informations'},
    {text: 'Réserver une marge significative pour la sortie plutôt que de remplir toute la fenêtre', isAnswer: true},
    {text: 'Le budget de contexte n\'a d\'importance que pour les modèles de moins de 32K jetons'},
    {text: 'Le modèle tronque automatiquement lorsque la fenêtre est dépassée'},
  ]}
>
  <slot name="question">
  <div className="question">
    Lors de la construction d'un prompt RAG avec un contexte récupéré, une bonne règle empirique pour le budget de contexte est :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La fenêtre de contexte est partagée entre **l'entrée et la sortie**. Si vous utilisez 90% pour l'entrée, le modèle n'a plus que 10% de la fenêtre pour générer une réponse — ce qui entraîne souvent des sorties tronquées ou dégradées.

    Une heuristique raisonnable : décidez d'abord de la taille de sortie attendue, puis maintenez votre entrée confortablement en dessous du budget restant. Pour de nombreuses tâches RAG, cela signifie utiliser au maximum **60–70% de la fenêtre de contexte totale pour l'entrée** (prompt système + historique + contexte récupéré). Laissez le reste pour la génération et une marge de sécurité.

    De plus, les modèles performent moins bien près des bords de leur fenêtre de contexte — la compréhension et le suivi des instructions se dégradent à mesure que le contexte se remplit. Fonctionner à 95% est techniquement possible. Ce n'est pas la même expérience que de fonctionner à 50%.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Gestion des tokens"
  title="Gestion de l'historique des conversations"
  options={[
    {text: 'Toujours envoyer l\'historique complet de la conversation'},
    {text: 'Résumer les anciens messages lorsque l\'historique dépasse un budget de tokens', isAnswer: true},
    {text: 'Supprimer les anciens messages — le modèle a une mémoire persistante'},
    {text: 'Stocker l\'historique dans une base vectorielle et récupérer les tours pertinents'},
  ]}
>
  <slot name="question">
  <div className="question">
    Dans une application de chat multi-tours, quelle est la stratégie correcte lorsque l'historique de la conversation devient long ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les LLM n'ont pas de mémoire persistante. Chaque appel API est sans état — vous envoyez le contexte complet, vous obtenez une réponse. La "mémoire" d'une conversation est entièrement l'historique des messages que vous incluez dans chaque requête.

    Lorsque cet historique dépasse votre budget, les options sont :
    1. **Résumer** : Compresser les tours plus anciens en un résumé courant, garder les tours récents textuellement
    2. **Fenêtre glissante** : Garder les N derniers tours, abandonner les plus anciens
    3. **Récupération sélective** : Encoder les tours de conversation et récupérer ceux pertinents par requête (complexe mais puissant)

    La troncature simple — couper les anciens messages pour s'adapter — est la pire option car elle supprime silencieusement le contexte dont le modèle pourrait avoir besoin.

    La récupération de l'historique des conversations via une base vectorielle est théoriquement attrayante mais généralement excessive pour la plupart des applications de chat. Le résumé est le choix pragmatique par défaut.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Structure du Prompt"
  title="Exemples Few-Shot"
  options={[
    {text: 'Plus d\'exemples donnent toujours de meilleurs résultats'},
    {text: '3 à 5 exemples de haute qualité et diversifiés dans le prompt', isAnswer: true},
    {text: 'Les exemples few-shot n\'aident que pour les tâches de classification'},
    {text: 'Les exemples doivent être placés après la requête utilisateur, pas avant'},
  ]}
>
  <slot name="question">
  <div className="question">
    Pour la plupart des cas d'usage en production, la stratégie optimale pour les exemples few-shot est :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les exemples few-shot améliorent considérablement la cohérence des sorties et le respect du format. Le point idéal pour la plupart des tâches est de **3 à 5 exemples de haute qualité et diversifiés**.

    Pourquoi pas plus ? Chaque exemple coûte des tokens. Au-delà de 5 à 10 exemples, le bénéfice marginal diminue tandis que le coût en tokens continue d'augmenter. Plus d'exemples augmentent aussi le risque que le modèle se surajuste aux exemples plutôt que de comprendre le motif sous-jacent.

    Pourquoi la diversité est importante : si tous vos exemples sont du même type d'entrée, le modèle ne généralisera pas bien aux cas limites. Incluez des exemples qui couvrent vos variations les plus importantes.

    Placement : les exemples vont *avant* la requête utilisateur, dans le prompt système ou en tant que tours de conversation préremplis — pas après.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Structure du prompt"
  title="Balises XML pour la structure"
  options={[
    {text: 'Les balises XML ne sont valides que dans les modèles Anthropic'},
    {text: 'Les balises XML aident les modèles à distinguer les instructions des données et améliorent la précision du parsing', isAnswer: true},
    {text: 'Les balises XML ralentissent la tokenisation et devraient être évitées'},
    {text: 'Les balises XML sont équivalentes aux en-têtes Markdown'},
  ]}
>
  <slot name="question">
  <div className="question">
    Pourquoi de nombreux prompts de production utilisent-ils des balises de style XML comme `<document>`, `<context>`, `<instructions>` ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les balises de style XML fournissent des **limites structurelles explicites** que les modèles sont entraînés à reconnaître et à respecter. Elles font deux choses :

    1. **Séparation** : Elles signalent au modèle où les instructions se terminent et où les données commencent — crucial pour le RAG et pour réduire le risque d'injection de prompt à partir de documents récupérés.
    2. **Parsabilité** : Lorsque vous demandez au modèle de répondre en XML (par exemple, `<answer>...</answer>`), les balises offrent des points d'extraction propres sans bidouilles de regex.

    Ce n'est pas du XML en tant que langage de balisage. C'est du XML en tant que convention de délimiteur sur laquelle les modèles sont entraînés. Cela fonctionne parce que le modèle a vu ce modèle de manière extensive lors de l'entraînement, pas parce qu'il valide des schémas.

    Cela fonctionne sur la plupart des modèles ajustés par instructions assez souvent pour être utile — c'est une convention de données d'entraînement, pas une fonctionnalité de fournisseur ni une garantie de sécurité.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Avancé"
  title="Température et Déterminisme"
  options={[
    {text: 'temperature=0 produit toujours des sorties identiques pour la même entrée'},
    {text: 'temperature=0 rend les sorties plus déterministes mais pas garanties identiques', isAnswer: true},
    {text: 'temperature=0 désactive le modèle'},
    {text: 'temperature n\'affecte que la longueur de la réponse'},
  ]}
>
  <slot name="question">
  <div className="question">
    Définir `temperature=0` dans votre appel LLM signifie :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `temperature=0` fait que le modèle choisit le token de plus haute probabilité à chaque étape (décodage glouton), ce qui produit des sorties **plus cohérentes** — mais pas garanties identiques.

    Sources de variation à temperature=0 :
    - **Non-déterminisme en virgule flottante** dans les calculs GPU, surtout sur différents matériels ou tailles de lots
    - **Changements d'infrastructure côté serveur** (mises à jour du modèle, infrastructure de service)
    - **Sorties longues** accumulent de petites variations

    Pour les suites de tests et évaluations qui nécessitent un déterminisme strict, `temperature=0` est le bon choix — mais n'écrivez pas d'assertions qui dépendent de sorties identiques octet par octet. Affirmez sur la structure, le contenu clé et le comportement, pas sur des chaînes exactes.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Avancé"
  title="Mise en cache des prompts"
  options={[
    {text: 'La mise en cache stocke les réponses et les rejoue pour des requêtes identiques'},
    {text: 'La mise en cache stocke les paires KV compilées pour les préfixes de prompt statiques, réduisant le coût des tokens d\'entrée', isAnswer: true},
    {text: 'La mise en cache n\'est disponible que dans les modèles OpenAI'},
    {text: 'La mise en cache est automatique et ne nécessite aucune configuration du développeur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est-ce que la « mise en cache des prompts » dans le contexte des API LLM (Anthropic, OpenAI) ?
    <p className="text-sm">Dernière vérification : 8 mai 2026. Les contrôles de cache et les tarifs des fournisseurs changent rapidement.</p>
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La mise en cache des prompts réutilise l'**état du cache KV / préfixe de prompt** calculé pour les préfixes de prompt statiques lorsque votre fournisseur le prend en charge. Sur les requêtes suivantes avec le même préfixe, le modèle peut éviter de retraiter ces tokens — ce qui réduit la latence et peut réduire considérablement les coûts.

    Il ne s'agit pas d'une mise en cache des réponses. Le modèle génère toujours une nouvelle réponse à chaque fois. Vous évitez simplement de retokeniser et de recalculer l'attention pour la partie du prompt qui ne change pas.

    Meilleur usage pour : les grands prompts système, les documents statiques, les définitions d'outils, les exemples few-shot — tout ce qui est identique sur plusieurs requêtes. Le préfixe mis en cache doit être au *début* de votre prompt.

    Pas la même chose que : la déduplication sémantique, la mémorisation des réponses, ou la mise en cache au niveau de l'application.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Avancé"
  title="Ancrage vs Hallucination"
  options={[
    {text: 'Dire au modèle « ne pas halluciner » dans le prompt système'},
    {text: 'Utiliser une température plus élevée pour générer des réponses plus confiantes'},
    {text: 'Fournir des documents sources récupérés et demander au modèle de les citer', isAnswer: true},
    {text: 'Utiliser un modèle plus grand — l\'hallucination ne se produit que dans les petits modèles'},
  ]}
>
  <slot name="question">
  <div className="question">
    La technique la plus efficace pour réduire l'hallucination dans un système d'IA en production est :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Dire à un modèle de ne pas halluciner n'arrête pas l'hallucination — le modèle n'a pas de signal introspectif fiable pour « je suis en train d'inventer ça ». Cela signifie simplement que le modèle vous dira avec confiance qu'il n'invente rien tout en inventant.

    Ce qui fonctionne vraiment : **l'ancrage**. Donnez au modèle les informations dont il a besoin pour répondre correctement, et contraignez-le à ces informations :
    ```
        Answer only using the provided documents.
        If the answer isn't in the documents, say: "I don't have enough information to answer that."
    ```
    Ensuite, validez la sortie : vérifiez que les affirmations de la réponse apparaissent dans le contexte récupéré. C'est le contrôle d'ancrage par citation — voir la discussion sur l'évaluation RAG pour l'implémentation.

    Les grands modèles hallucinent moins en moyenne, mais tous les modèles hallucinent. L'ancrage est la stratégie d'atténuation, pas la taille du modèle.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Expert"
  title="Ingénierie de contexte vs. Fine-tuning"
  options={[
    {text: 'Le fine-tuning est toujours meilleur — l\'ingénierie de contexte est un pis-aller'},
    {text: 'L\'ingénierie de contexte est gratuite ; le fine-tuning est coûteux ; utilisez toujours l\'ingénierie de contexte'},
    {text: 'L\'ingénierie de contexte modifie le comportement par requête ; le fine-tuning modifie les poids du modèle de façon permanente', isAnswer: true},
    {text: 'Ce sont des noms différents pour la même technique'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est la distinction clé entre l'ingénierie de contexte et le fine-tuning, et quand le fine-tuning a-t-il vraiment du sens ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **L'ingénierie de contexte** façonne le comportement du modèle via le prompt — instructions système, exemples few-shot, contexte récupéré. C'est par requête, réversible et ne nécessite pas d'entraînement.

    **Le fine-tuning** met à jour les poids du modèle sur vos données. Les changements sont permanents (pour ce checkpoint) et s'appliquent à chaque inférence.

    Le fine-tuning est vraiment meilleur quand :
    - Vous avez besoin d'un style/format cohérent que le modèle ne peut pas suivre de manière fiable à partir des seules instructions
    - Votre tâche nécessite un comportement reproductible sur des motifs spécifiques au domaine que le prompting et la récupération ne résolvent pas
    - Vous devez réduire la longueur du prompt — le comportement fine-tuné n'a pas besoin d'être expliqué à chaque requête
    - Vous exécutez de nombreuses requêtes où des exemples few-shot cohérents consomment des tokens significatifs

    Le fine-tuning est excessif quand :
    - Vos instructions tiennent dans un prompt système
    - Vous avez principalement besoin de faits actuels ou propriétaires qui peuvent être récupérés au moment de la requête
    - Les exigences changent fréquemment (vous devriez re-fine-tuner)
    - Vous n'avez pas d'abord épuisé l'ingénierie de contexte

    Le bon ordre : maîtrisez d'abord l'ingénierie de contexte. Fine-tunez quand ce n'est manifestement pas suffisant.
  </div>
  </slot>
</Challenge>

</QuizUI>

Comment ça s'est passé ?

- **13–14** : Vous construisez des systèmes d'IA en production, pas juste des démos. Rare.
- **9–12** : Praticien solide. Vous maîtrisez les outils ; les contours restent flous.
- **5–8** : Vous avez beaucoup utilisé les LLM mais sans creuser la gestion du contexte. Lisez sur le *prompt caching* et la recherche hybride — ça changera votre vision des coûts.
- **0–4** : Bonne nouvelle : tout dans ce quiz est apprenable et immédiatement utile. La question « *lost in the middle* » vaut à elle seule la peine d'être comprise avant votre prochain déploiement RAG.

L'ingénierie de contexte, c'est la discipline qui consiste à être intentionnel sur les informations que vous mettez dans la fenêtre, où vous les placez et comment vous les structurez. Le modèle est la partie la moins contrôlable de votre système. Tout ce qui l'entoure est à vous.
````
