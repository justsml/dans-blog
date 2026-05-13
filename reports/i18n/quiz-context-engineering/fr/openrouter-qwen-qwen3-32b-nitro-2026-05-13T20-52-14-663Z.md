# Translation Candidate
- Slug: quiz-context-engineering
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-09--quiz-context-engineering/fr/index.mdx
- Validation: deferred
- Runtime seconds: 52.89
- Input tokens: 14521
- Output tokens: 19455
- Thinking tokens: unknown
- Cached input tokens: 5632
- Cache write tokens: 0
- Estimated cost: $0.005831
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Quiz : 14 questions sur l''ingénierie du contexte'
subTitle: >-
  L'ingénierie des prompts, c'est ce que vous faites. L'ingénierie du contexte,
  c'est ce que vous déployez.
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

<p class="inset">L'ingénierie des prompts obtient les slogans. L'ingénierie du contexte obtient la sonnette de page. À quel point maîtrisez-vous la partie d'un système d'IA qui fonctionne vraiment en production ?</p>

Ce quiz couvre les fenêtres de contexte, les budgets de jetons, le recyclage d'information, la structure des prompts et les modes de défaillance qui transforment des démos propres en produits déroutants. Il commence doucement. Il ne s'arrête pas là.

Apportez des preuves.

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Fondamentaux"
  title="Les bases de la fenêtre de contexte"
  options={[
    {text: 'Le nombre maximum de requêtes par minute'},
    {text: 'La limite combinée des tokens pour l\'entrée et la sortie', isAnswer: true},
    {text: 'Le nombre de messages dans une conversation'},
    {text: 'La mémoire disponible entre les sessions'},
  ]}
>
  <slot name="question">
  <div className="question">
    À quoi fait référence la « fenêtre de contexte » dans un modèle de langage à très grande échelle (LLM) ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La fenêtre de contexte est le nombre total de tokens qu'un modèle peut traiter en une seule fois — **la somme des tokens d'entrée et de sortie**. Une fenêtre de contexte de 128K signifie que votre prompt + les documents récupérés + l'historique de la conversation + la réponse du modèle doivent tous tenir dans 128 000 tokens.

    Elle n'a rien à voir avec les sessions, la mémoire ou les limites de débit. Quand vous atteignez cette limite, le modèle tronque, génère une erreur, ou — pire encore — supprime silencieusement des tokens que vous ne vous attendiez pas à perdre.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Bases"
  title="Estimation des jetons"
  options={[
    {text: 'Environ 50 jetons'},
    {text: 'Environ 130 jetons', isAnswer: true},
    {text: 'Environ 300 jetons'},
    {text: 'Environ 1 000 jetons'},
  ]}
>
  <slot name="question">
  <div className="question">
    Environ combien de jetons utilise un paragraphe de 100 mots en anglais avec un tokenizeur moderne courant ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La règle empirique est d'environ **~1,3 jeton par mot** pour un texte anglais typique. Un paragraphe de 100 mots ≈ 130 jetons.

    Cela varie considérablement selon le type de contenu :
    - Code : ~1,5 à 2 jetons/mot (caractères spéciaux, espaces)
    - Documents techniques avec beaucoup d'identifiants : peut être plus élevé
    - Mots anglais communs : souvent 1 jeton chacun
    - Mots rares, noms propres, textes non anglais : souvent 2 à 4 jetons chacun

    La bibliothèque `tiktoken` vous donne des comptes exacts. Mesurez toujours avant de supposer.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Bases"
  title="Rôle du prompt système"
  options={[
    {text: 'Il est traité en premier et a un poids plus élevé que les messages de l\'utilisateur', isAnswer: true},
    {text: 'Il est identique à un message utilisateur mais affiché différemment'},
    {text: 'Il n\'est utilisé que pour les appels API, pas pour les interfaces de chat'},
    {text: 'Il persiste à travers les sessions en tant que mémoire à long terme'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est l'effet pratique de l'utilisation du rôle `system` par rapport au rôle `user` dans le tableau de messages ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le rôle `system` est traité comme des instructions prioritaires. Les modèles sont entraînés pour lui accorder plus de poids que les messages de l'utilisateur — c'est la frontière architecturale entre "ce que le développeur a dit" et "ce que l'utilisateur a dit".

    Ce n'est pas magique. Cela ne garantit pas que le modèle ignore les instructions contradictoires de l'utilisateur (voir : prompt injection). Mais cela augmente significativement la tendance du modèle à suivre vos instructions, surtout sur les modèles avec un fort suivi d'instructions.

    En pratique : placez votre personnalité, vos règles et contraintes comportementales dans `system`. Placez le contexte récupéré et les données utilisateur dans `user`. Ne jamais mettre d'entrée contrôlée par l'utilisateur dans `system`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Récupération"
  title="Perdu au milieu"
  options={[
    {text: 'Les modèles performent de manière égale, peu importe l\'emplacement du contexte'},
    {text: 'Les modèles performent le mieux lorsque le contexte est à la fin'},
    {text: 'Les modèles performent le mieux lorsque le contexte est au début et à la fin, le pire au milieu', isAnswer: true},
    {text: 'Les modèles performent le mieux lorsque le contexte est au milieu de l\'invite'},
  ]}
>
  <slot name="question">
  <div className="question">
    Les recherches sur le problème "Perdu au milieu" montrent que les LLM tendent à :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'article [Perdu au milieu (Liu et al., 2023)](https://arxiv.org/abs/2307.03172) a démontré que les LLM ont systématiquement du mal avec les informations placées au milieu de longs contextes. Les performances sont significativement meilleures lorsque les informations pertinentes apparaissent au **début ou à la fin** de la fenêtre de contexte.

    Implication pratique : lors de l'insertion de fragments récupérés dans un prompt RAG, n'ajoutez pas simplement les éléments par ordre de pertinence. Placez votre résultat le plus pertinent en premier, le second le plus pertinent en dernier, et remplissez le milieu avec des éléments moins pertinents. Contre-intuitif, mais mesurablement meilleur.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Récupération"
  title="Stratégie de découpage"
  options={[
    {text: 'Utilisez la plus grande taille de segment que permet votre fenêtre de contexte'},
    {text: 'Utilisez toujours 512 jetons — c\'est une bonne valeur par défaut'},
    {text: 'Utilisez des segments superposés dont la taille correspond à la structure de votre contenu', isAnswer: true},
    {text: 'La taille des segments n\'a pas d\'importance'},
  ]}
>
  <slot name="question">
  <div className="question">
    Lorsque vous découpez des documents pour RAG, quel est le principe le plus important ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il n'existe pas de taille de segment universellement correcte — cela dépend de votre contenu. Les principes importants sont :

    1. **Correspondre à la structure de votre contenu.** Les pages FAQ s'adaptent bien au niveau Q+A. Les documents juridiques s'adaptent bien au niveau des clauses. Le code s'adapte bien au niveau des fonctions.
    2. **Utiliser la superposition.** Un segment de 512 jetons avec 64 jetons de superposition de chaque côté permet de récupérer les réponses qui traversent une limite.
    3. **Mesurer.** Créez un ensemble d'évaluation et testez plusieurs tailles de segments. La taille des segments est plus critique que le modèle d'embedding.

    "512 jetons" est un point de départ raisonnable, pas une loi.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Récupération"
  title="Recherche hybride"
  options={[
    {text: 'Exécuter la même requête deux fois pour la redondance'},
    {text: 'Utiliser deux modèles d\'embedding différents sur le même corpus'},
    {text: 'Combiner la recherche vectorielle avec la recherche par mots-clés pour une meilleure récupération', isAnswer: true},
    {text: 'Rechercher simultanément dans plusieurs bases de données vectorielles'},
  ]}
>
  <slot name="question">
  <div className="question">
    Dans les systèmes RAG, la 'recherche hybride' désigne :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La recherche hybride combine **recherche vectorielle** (similarité sémantique via les embeddings) et **recherche par mots-clés** (BM25 / recherche plein texte) car elles échouent de manière complémentaire :

    - La recherche vectorielle a du mal avec les termes exacts : noms de produits, codes d'erreur, numéros de modèle, identifiants techniques
    - La recherche par mots-clés a du mal avec les reformulations : "comment annuler" vs. "terminer l'abonnement"

    Les résultats des deux sont fusionnés via **Reciprocal Rank Fusion (RRF)** — un algorithme de classement qui combine les positions de listes classées multiples sans nécessiter de scores normalisés.

    Disponible en Postgres avec `pgvector` + `tsvector`. Vous n'avez peut-être pas besoin d'un service de recherche séparé.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Gestion des jetons"
  title="Budget de contexte"
  options={[
    {text: 'Utiliser 95 % ou plus de la fenêtre de contexte pour maximiser l\'information'},
    {text: 'Réserver un espace significatif pour la sortie plutôt que de remplir toute la fenêtre', isAnswer: true},
    {text: 'Le budget de contexte n\'a d\'importance que pour les modèles inférieurs à 32K jetons'},
    {text: 'Le modèle tronque automatiquement lorsqu\'on dépasse la fenêtre'},
  ]}
>
  <slot name="question">
  <div className="question">
    Lors de la création d'un prompt RAG avec un contexte récupéré, une bonne règle d'or concernant le budget de contexte est :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La fenêtre de contexte est partagée entre **l'entrée et la sortie**. Si vous utilisez 90 % pour l'entrée, le modèle n'a plus que 10 % de la fenêtre pour générer une réponse — ce qui entraîne souvent des sorties tronquées ou dégradées.

    Une heuristique raisonnable : déterminez d'abord la taille de sortie attendue, puis gardez votre entrée bien en dessous du budget restant. Pour de nombreuses tâches RAG, cela signifie utiliser au maximum **60 à 70 % de la fenêtre de contexte totale en entrée** (prompt système + historique + contexte récupéré). Laissez le reste pour la génération et une marge de sécurité.

    En outre, les modèles fonctionnent moins bien aux extrémités de leur fenêtre de contexte — la compréhension et le suivi des instructions se dégradent à mesure que le contexte se remplit. Fonctionner à 95 % est technique possible. Ce n'est pas la même expérience qu'en fonctionnant à 50 %.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Gestion des jetons"
  title="Gestion de l'historique des conversations"
  options={[
    {text: 'Toujours envoyer l\'historique complet de la conversation'},
    {text: 'Résumer les anciens messages lorsque l\'historique dépasse le budget de jetons', isAnswer: true},
    {text: 'Supprimer les anciens messages — le modèle a une mémoire persistante'},
    {text: 'Stocker l\'historique dans une base de données vectorielle et récupérer les échanges pertinents'},
  ]}
>
  <slot name="question">
  <div className="question">
    Dans une application de chat à plusieurs échanges, quelle est la bonne stratégie lorsque l'historique des conversations devient long ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les LLM n'ont pas de mémoire persistante. Chaque appel d'API est sans état — vous envoyez le contexte complet, vous obtenez une réponse. La "mémoire" d'une conversation est entièrement l'historique de messages que vous incluez dans chaque requête.

    Lorsque cet historique dépasse votre budget, les options sont :
    1. **Résumer** : Compresser les anciens échanges en une synthèse continue, conserver les récents verbatim
    2. **Fenêtre glissante** : Conserver les N derniers échanges, supprimer les plus anciens
    3. **Récupération sélective** : Embedder les échanges de conversation et en récupérer les pertinents par requête (complexe mais puissant)

    La simple troncature — supprimer les anciens messages pour s'adapter — est la pire option car elle retire silencieusement du contexte dont le modèle pourrait avoir besoin.

    La récupération d'historique dans une base de données vectorielle est théoriquement séduisante mais souvent surdimensionnée pour la plupart des applications de chat. Le résumé est la solution pragmatique par défaut.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Structure des prompts"
  title="Exemples few-shot"
  options={[
    {text: 'Plus d\'exemples donnent toujours de meilleurs résultats'},
    {text: '3 à 5 exemples de haute qualité et diversifiés dans le prompt', isAnswer: true},
    {text: 'Les exemples few-shot ne servent qu\'aux tâches de classification'},
    {text: 'Les exemples devraient être placés après la requête de l\'utilisateur, pas avant'},
  ]}
>
  <slot name="question">
  <div className="question">
    Pour la plupart des cas d'utilisation en production, la stratégie optimale d'exemples few-shot est :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les exemples few-shot améliorent considérablement la cohérence et la conformité du format de la sortie. Le point optimal pour la plupart des tâches est **3 à 5 exemples de haute qualité et diversifiés**.

    Pourquoi pas plus ? Chaque exemple coûte des tokens. Au-delà de 5 à 10 exemples, le bénéfice marginal diminue alors que le coût en tokens continue d'augmenter. Plus d'exemples augmentent également le risque que le modèle s'adapte excessivement aux exemples plutôt qu'à comprendre le motif sous-jacent.

    Pourquoi la diversité compte : si tous vos exemples sont du même type d'entrée, le modèle ne généralisera pas bien aux cas limites. Incluez des exemples qui couvrent vos variations les plus importantes.

    Placement : les exemples doivent être placés *avant* la requête de l'utilisateur, en tant que partie du prompt système ou comme tours de conversation préremplis — pas après.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Structure des prompts"
  title="Balises XML pour la structure"
  options={[
    {text: 'Les balises XML ne sont valides que dans les modèles d\'Anthropic'},
    {text: 'Les balises XML aident les modèles à distinguer les instructions des données et à améliorer la précision de l\'analyse', isAnswer: true},
    {text: 'Les balises XML ralentissent la tokenisation et devraient être évitées'},
    {text: 'Les balises XML sont équivalentes aux en-têtes markdown'},
  ]}
>
  <slot name="question">
  <div className="question">
    Pourquoi de nombreux prompts de production utilisent-ils des balises au style XML comme `<document>`, `<contexte>`, `<instructions>`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les balises au style XML fournissent des **limites structurelles explicites** que les modèles sont entraînés à reconnaître et à respecter. Elles font deux choses :

    1. **Séparation** : Elles signalent au modèle où se terminent les instructions et où commencent les données — essentiel pour le RAG et pour réduire le risque d'injection de prompt provenant des documents récupérés.
    2. **Analyse** : Quand vous demandez au modèle de répondre en XML (ex. : `<answer>...</answer>`), les balises vous offrent des points d'extraction propres sans astuce regex.

    Ce n'est pas XML en tant que langage de balisage. C'est XML en tant que convention de délimitation que les modèles ont apprise. Cela fonctionne parce que le modèle a vu ce schéma de manière intensive pendant l'entraînement, pas parce qu'il valide des schémas.

    Cela fonctionne sur la plupart des modèles affinés sur les instructions avec suffisamment de régularité pour être utile — c'est une convention des données d'entraînement, pas une fonction du vendeur ou une garantie de sécurité.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Avancé"
  title="Température et déterminisme"
  options={[
    {text: 'temperature=0 produit toujours des sorties identiques pour la même entrée'},
    {text: 'temperature=0 rend les sorties plus déterministes, mais pas garanties identiques', isAnswer: true},
    {text: 'temperature=0 désactive le modèle\'},
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
    `temperature=0` fait en sorte que le modèle sélectionne le jeton de probabilité la plus élevée à chaque étape (décodage glouton), ce qui produit des sorties **plus cohérentes** — mais pas garanties identiques.

    Sources de variation à temperature=0 :
    - **Non-déterminisme en virgule flottante** dans les calculs GPU, surtout entre différentes configurations matériels ou tailles de lots
    - **Changements d'infrastructure côté serveur** (mises à jour du modèle, infrastructure de service)
    - **Longues sorties** accumulent de petites variations

    Pour les suites de tests et les évaluations nécessitant une stricte détermination, `temperature=0` est le bon choix — mais n'écrivez pas d'assertions dépendant de sorties identiques bit à bit. Assurez-vous sur la structure, le contenu clé et le comportement, et non sur les chaînes exactes.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Avancé"
  title="Mise en cache des invites"
  options={[
    {text: 'La mise en cache stocke les réponses et les réutilise pour des requêtes identiques'},
    {text: 'La mise en cache stocke les paires KV compilées pour les préfixes d\'invite statiques, réduisant le coût en tokens d\'entrée', isAnswer: true},
    {text: 'La mise en cache n\'est disponible qu\'avec les modèles OpenAI'},
    {text: 'La mise en cache est automatique et ne nécessite aucune configuration du développeur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est-ce que la "mise en cache des invites" dans le contexte des API de modèles LLM (Anthropic, OpenAI) ?
    <p className="text-sm">Dernière vérification : 8 mai 2026. Les contrôles et tarifs de mise en cache des fournisseurs évoluent rapidement.</p>
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La mise en cache des invites réutilise l'état de **cache KV / préfixe d'invite** calculé pour les préfixes d'invite statiques lorsque votre fournisseur le supporte. Pour les requêtes ultérieures avec le même préfixe, le modèle peut sauter le retraitement de ces tokens — ce qui réduit la latence et peut drastiquement réduire le coût.

    Ce n'est pas la mise en cache des réponses. Le modèle génère toujours une réponse fraîche à chaque fois. Vous évitez simplement de re-tokeniser et de recalculer l'attention pour la partie de l'invite qui ne change pas.

    Meilleure utilisation pour : les prompts système volumineux, les documents statiques, les définitions d'outils, les exemples few-shot — tout ce qui est identique à travers plusieurs requêtes. Le préfixe mis en cache doit être au *début* de votre invite.

    Ce n'est pas la même chose que : la déduplication sémantique, la mémorisation des réponses, ou la mise en cache au niveau de l'application.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Avancé"
  title="Ancre vs. Hallucination"
  options={[
    {text: 'Indiquer au modèle \'ne pas halluciner\' dans le prompt système'},
    {text: 'Utiliser une température plus élevée pour générer des réponses plus confiantes'},
    {text: 'Fournir les documents sources récupérés et indiquer au modèle de les citer', isAnswer: true},
    {text: 'Utiliser un modèle plus grand — les hallucinations n\'ont lieu que dans les modèles plus petits'},
  ]}
>
  <slot name="question">
  <div className="question">
    La technique la plus efficace pour réduire les hallucinations dans un système d'IA de production est :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Indiquer à un modèle de ne pas halluciner n'empêche pas les hallucinations — le modèle n'a pas de signal introspectif fiable pour 'je fais des inventions'. Cela signifie simplement que le modèle vous dira avec confiance qu'il ne fait pas d'inventions tout en en faisant.

    Ce qui fonctionne vraiment : **l'ancre**. Fournissez au modèle les informations dont il a besoin pour répondre correctement, et restreignez-le à ces informations :
    ```
        Answer only using the provided documents.
        If the answer isn't in the documents, say: "I don't have enough information to answer that."
    ```
    Validez ensuite la sortie : vérifiez que les affirmations dans la réponse apparaissent dans le contexte récupéré. C'est le test d'ancre par citation — voir la discussion sur l'évaluation RAG pour l'implémentation.

    Les modèles plus grands hallucinent moins en moyenne, mais tous les modèles hallucinent. L'ancre est la stratégie d'atténuation, pas la taille du modèle.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Expert"
  title="Ingénierie du contexte vs. Affinage du modèle"
  options={[
    {text: 'L\'affinage est toujours meilleur — l\'ingénierie du contexte est un contournement'},
    {text: 'L\'ingénierie du contexte est gratuite ; l\'affinage est coûteux ; utilisez toujours l\'ingénierie du contexte'},
    {text: 'L\'ingénierie du contexte modifie le comportement par requête ; l\'affinage modifie les poids du modèle de manière permanente', isAnswer: true},
    {text: 'Ce sont des noms différents pour la même technique'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est la distinction clé entre l'ingénierie du contexte et l'affinage, et quand l'affinage est-il vraiment pertinent ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **L'ingénierie du contexte** façonne le comportement du modèle via le prompt — instructions système, exemples few-shot, contexte récupéré. C'est temporaire, réversible et ne nécessite aucune formation.

    **L'affinage** met à jour les poids du modèle sur vos données. Les changements sont permanents (pour ce point de contrôle) et s'appliquent à chaque inférence.

    L'affinage est vraiment meilleur lorsque :
    - Vous avez besoin d'un style/format cohérent que le modèle ne peut suivre de manière fiable avec des instructions seules
    - Votre tâche exige un comportement répétable sur des motifs spécifiques à un domaine que le prompting et la récupération ne résolvent pas
    - Vous devez réduire la longueur des prompts — le comportement affiné n'a pas besoin d'être expliqué à chaque requête
    - Vous exécutez de nombreuses requêtes où les exemples few-shot consomment de nombreux tokens

    L'affinage est superflu lorsque :
    - Vos instructions tiennent dans un prompt système
    - Vous avez besoin de faits récents ou propriétaires récupérables à la volée
    - Les exigences changent fréquemment (vous devriez ré-affiner)
    - Vous n'avez pas épuisé l'ingénierie du contexte avant

    L'ordre correct : maîtrisez l'ingénierie du contexte d'abord. Affinez uniquement quand c'est prouvé insuffisant.
  </div>
  </slot>
</Challenge>

</QuizUI>

Comment vous en êtes-vous sortis ?  

- **13–14** : Vous construisez des systèmes d'IA en production, pas seulement des démos. Rare.  
- **9–12** : Pratiquant solide. Vous maîtrisez les outils, mais les contours restent flous.  
- **5–8** : Vous avez beaucoup utilisé les LLM, mais n'avez pas approfondi la gestion du contexte. Lisez sur le stockage en cache des invites et la recherche hybride — cela changera votre façon de penser les coûts.  
- **0–4** : Bonne nouvelle : tout ce quiz est apprenable et immédiatement applicable. La question sur le « perdu au milieu » seule vaut la peine d'être comprise avant votre prochaine déploiement RAG.  

L'ingénierie du contexte est la discipline d'être intentionnel sur l'information que vous placez dans la fenêtre, où vous la placez et comment vous la structurez. Le modèle est la partie la moins contrôlable de votre système. Tout ce qui l'entoure dépend de vous.
````
