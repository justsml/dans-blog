# Translation Candidate
- Slug: quiz-context-engineering
- Locale: fr
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2026-05-09--quiz-context-engineering/fr/index.mdx
- Validation: deferred
- Runtime seconds: 308.43
- Input tokens: 15408
- Output tokens: 56762
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000000
- Pricing source: unknown
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Quiz : 14 questions d''ingénierie du contexte'
subTitle: >-
  L'ingénierie de prompts, c'est ce que vous faites. L'ingénierie de contexte,
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">L'ingénierie des prompts attire les slogans. L'ingénierie du contexte déclenche le pager. À quel point maîtrisez-vous la partie d'un système IA qui finit réellement en production ?</p>

Ce quiz couvre les fenêtres de contexte, les budgets de tokens, le retrieval, la structure des prompts et les modes de défaillance qui transforment des démos impeccables en produits incompréhensibles. Il commence en douceur. Il ne s'y arrête pas.

Amenez vos preuves.
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Fondamentaux"
  title="Les bases de la fenêtre de contexte"
  options={[
    {text: 'Le nombre maximum de requêtes par minute'},
    {text: 'La limite combinée de tokens pour l\'entrée et la sortie', isAnswer: true},
    {text: 'Le nombre de messages dans une conversation'},
    {text: 'La mémoire disponible entre les sessions'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que désigne la « fenêtre de contexte » dans un LLM ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La fenêtre de contexte correspond au nombre total de tokens qu'un modèle peut traiter en un seul appel — **entrée + sortie combinées**. Une fenêtre de contexte de 128K signifie que votre prompt, les documents récupérés, l'historique de conversation et la réponse du modèle doivent tous tenir dans 128 000 tokens.

    Cela n'a strictement rien à voir avec les sessions, la mémoire ou les limites de débit. Lorsque vous atteignez cette limite, le modèle tronque, renvoie une erreur, ou — pire — supprime silencieusement des tokens que vous ne soupçonniez pas.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Fondamentaux"
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
    À peu près combien de tokens occupe un paragraphe anglais de 100 mots avec un tokenizer moderne standard ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La règle empirique est d'**environ 1,3 token par mot** pour un texte anglais standard. Un paragraphe de 100 mots ≈ 130 tokens.

    Ce ratio varie considérablement selon le type de contenu :
    - Code : ~1,5 à 2 tokens/mot (caractères spéciaux, espaces)
    - Docs techniques avec beaucoup d'identifiants : peut être plus élevé
    - Mots anglais courants : souvent 1 token chacun
    - Mots rares, noms propres, texte non-anglais : souvent 2 à 4 tokens chacun

    La bibliothèque `tiktoken` vous donne des comptes exacts. Mesurez toujours avant de supposer.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Fondamentaux"
  title="Rôle du prompt système"
  options={[
    {text: 'Il est traité en premier et a plus de poids que les messages utilisateur', isAnswer: true},
    {text: 'Il est identique à un message utilisateur mais affiché différemment'},
    {text: 'Il est uniquement utilisé pour les appels API, pas pour les interfaces de chat'},
    {text: 'Il persiste entre les sessions en tant que mémoire à long terme'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est l'impact réel d'utiliser le rôle `system` plutôt que `user` dans le tableau `messages` ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le rôle `system` est traité comme des instructions à priorité élevée. Les modèles sont entraînés à lui accorder plus de poids qu'aux messages utilisateur — il marque la frontière architecturale entre « ce que le développeur a défini » et « ce que l'utilisateur saisit ».

    Ce n'est pas de la magie. Cela ne garantit pas que le modèle ignorera les instructions utilisateur contradictoires (voir : injection de prompt). Mais cela augmente significativement la probabilité qu'il suive vos consignes, surtout sur les modèles conçus pour bien respecter les instructions.

    En pratique : placez votre persona, vos règles et vos contraintes comportementales dans `system`. Placez le contexte récupéré et les données utilisateur dans `user`. Ne mettez jamais d'entrée contrôlée par l'utilisateur dans `system`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Récupération"
  title="Perdu au milieu"
  options={[
    {text: 'Les modèles obtiennent des résultats identiques, quel que soit l\'emplacement du contexte'},
    {text: 'Les modèles obtiennent les meilleurs résultats avec le contexte à la toute fin'},
    {text: 'Les modèles obtiennent les meilleurs résultats avec le contexte au début et à la fin, et les pires au milieu', isAnswer: true},
    {text: 'Les modèles obtiennent les meilleurs résultats avec le contexte au milieu de l\'invite'},
  ]}
>
  <slot name="question">
  <div className="question">
    Les recherches sur le problème du « Perdu au milieu » montrent que les LLM ont tendance à :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'article [Lost in the Middle (Liu et al., 2023)](https://arxiv.org/abs/2307.03172) a démontré que les LLM peinent systématiquement avec les informations placées au milieu de contextes longs. Les performances sont nettement supérieures lorsque les informations pertinentes apparaissent au **début ou à la fin** de la fenêtre de contexte.

    Implication pratique : lorsque vous insérez des chunks récupérés dans une invite RAG, ne vous contentez pas de les ajouter dans l'ordre de pertinence. Placez votre résultat le mieux classé en premier, le deuxième en dernier, et remplissez le milieu avec les résultats moins pertinents. Contre-intuitif, mais mesurablement plus efficace.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Récupération"
  title="Stratégie de découpage"
  options={[
    {text: 'Utilisez la taille de chunk la plus grande que votre fenêtre contextuelle permet'},
    {text: 'Toujours utiliser 512 tokens — c\'est une loi'},
    {text: 'Utilisez des chunks qui se chevauchent, avec une taille adaptée à la structure de votre contenu', isAnswer: true},
    {text: 'La taille des chunks n\'a pas d\'importance'},
  ]}
>
  <slot name="question">
  <div className="question">
    Lors du découpage de documents pour le RAG, quel est le principe le plus important ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il n'existe pas de taille de chunk universellement correcte — cela dépend de votre contenu. Les principes importants sont :

    1. **Adaptez-vous à la structure de votre contenu.** Les pages FAQ se découpent bien au niveau question/réponse. Les documents juridiques au niveau des articles. Le code au niveau des fonctions.
    2. **Utilisez des chevauchements.** Un chunk de 512 tokens avec 64 tokens de chevauchement de chaque côté garantit que les réponses franchissant une limite soient tout de même récupérées.
    3. **Mesurez.** Créez un jeu d'évaluation et testez plusieurs tailles de chunk. La taille du chunk a plus d'impact que le modèle d'embedding.

    Les « 512 tokens » constituent un point de départ raisonnable, pas une loi.
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
    {text: 'Combiner la recherche vectorielle et la recherche par mots-clés pour une meilleure récupération', isAnswer: true},
    {text: 'Rechercher simultanément dans plusieurs bases de données vectorielles'},
  ]}
>
  <slot name="question">
  <div className="question">
    Dans les systèmes RAG, la « recherche hybride » désigne :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La recherche hybride combine **la recherche vectorielle** (similarité sémantique via des embeddings) et **la recherche par mots-clés** (BM25 / recherche plein texte) car elles échouent de manière complémentaire :

    - La recherche vectorielle peine avec les termes exacts : noms de produits, codes d'erreur, numéros de modèle, identifiants techniques
    - La recherche par mots-clés peine avec les paraphrases : « comment annuler » vs. « résilier l'abonnement »

    Les résultats des deux sont fusionnés à l'aide de **Reciprocal Rank Fusion (RRF)** — un algorithme de classement qui combine les positions de plusieurs listes triées sans nécessiter de scores normalisés.

    Les deux sont disponibles dans Postgres avec `pgvector` + `tsvector`. Vous n'avez peut-être pas besoin d'un service de recherche séparé.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Gestion des tokens"
  title="Budget de contexte"
  options={[
    {text: 'Utiliser 95 %+ de la fenêtre de contexte pour maximiser l\'information'},
    {text: 'Réserver une marge de manœuvre significative pour la sortie au lieu de remplir toute la fenêtre', isAnswer: true},
    {text: 'Le budget de contexte ne concerne que les modèles de moins de 32 K tokens'},
    {text: 'Le modèle tronque automatiquement lorsque la fenêtre est dépassée'},
  ]}
>
  <slot name="question">
  <div className="question">
    Pour concevoir un prompt RAG avec du contexte récupéré, voici la règle d'or pour gérer le budget de contexte :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La fenêtre de contexte est partagée entre **l'entrée et la sortie**. Si vous utilisez 90 % pour l'entrée, il ne reste au modèle que 10 % de la fenêtre pour générer une réponse — ce qui entraîne souvent des sorties tronquées ou dégradées.

    Une heuristique raisonnable : définissez d'abord la taille attendue de votre sortie, puis gardez votre entrée bien en dessous du budget restant. Pour de nombreuses tâches RAG, cela signifie n'utiliser que **60 à 70 % de la fenêtre de contexte totale pour l'entrée** (prompt système + historique + contexte récupéré). Laissez le reste pour la génération et une marge de sécurité.

    De plus, les modèles performent moins bien près des limites de leur fenêtre de contexte — la compréhension et le respect des instructions se dégradent à mesure que le contexte se remplit. Fonctionner à 95 % est techniquement possible. Mais ce n'est pas la même expérience que de tourner à 50 %.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Gestion des tokens"
  title="Gestion de l'historique de conversation"
  options={[
    {text: 'Toujours envoyer l\'intégralité de l\'historique de conversation'},
    {text: 'Résumer les anciens messages lorsque l\'historique dépasse un budget de tokens', isAnswer: true},
    {text: 'Supprimer les anciens messages — le modèle possède une mémoire persistante'},
    {text: 'Stocker l\'historique dans une base de données vectorielle et récupérer les tours pertinents'},
  ]}
>
  <slot name="question">
  <div className="question">
    Dans une application de chat multi-tours, quelle est la bonne stratégie lorsque l'historique de conversation devient trop long ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les LLMs n'ont pas de mémoire persistante. Chaque appel API est sans état : vous envoyez le contexte complet et vous recevez une réponse. La « mémoire » d'une conversation repose entièrement sur l'historique des messages que vous incluez dans chaque requête.

    Lorsque cet historique dépasse votre budget, voici les options :
    1. **Résumer** : Compressez les tours anciens dans un résumé en cours, gardez les tours récents tels quels
    2. **Fenêtre glissante** : Conservez les N derniers tours, supprimez les plus anciens
    3. **Récupération sélective** : Embeddez les tours de conversation et récupérez ceux qui sont pertinents pour chaque requête (complexe mais puissant)

    La simple troncature — couper les anciens messages pour faire de la place — est la pire option, car elle supprime silencieusement du contexte dont le modèle pourrait avoir besoin.

    La récupération via une base de données vectorielle pour l'historique de conversation est théoriquement séduisante, mais généralement excessive pour la plupart des applications de chat. La résumption reste la solution pragmatique par défaut.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Structure du Prompt"
  title="Exemples Few-Shot"
  options={[
    {text: 'Plus d\'exemples produisent toujours de meilleurs résultats'},
    {text: '3 à 5 exemples de haute qualité et diversifiés dans le prompt', isAnswer: true},
    {text: 'Les exemples few-shot ne servent que pour les tâches de classification'},
    {text: 'Les exemples doivent être placés après la requête utilisateur, et non avant'},
  ]}
>
  <slot name="question">
  <div className="question">
    Pour la plupart des cas d'utilisation en production, la stratégie optimale d'exemples few-shot consiste à :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les exemples few-shot améliorent considérablement la cohérence des sorties et le respect du format. La fourchette idéale pour la plupart des tâches se situe entre **3 et 5 exemples de haute qualité et diversifiés**.

    Pourquoi pas plus ? Chaque exemple consomme des tokens. Au-delà de 5 à 10 exemples, le bénéfice marginal diminue tandis que le coût en tokens continue d'augmenter. Ajouter plus d'exemples accroît également le risque que le modèle surajuste ces exemples au lieu de comprendre le motif sous-jacent.

    Pourquoi la diversité est cruciale : si tous vos exemples correspondent au même type d'entrée, le modèle généralisera mal aux cas limites. Incluez des exemples couvrant vos variations les plus importantes.

    Emplacement : les exemples se placent *avant* la requête utilisateur, dans le prompt système ou sous forme de tours de conversation pré-remplis — et non après.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Structure du prompt"
  title="Balises XML pour la structure"
  options={[
    {text: 'Les balises XML ne sont valides que sur les modèles Anthropic'},
    {text: 'Les balises XML aident le modèle à distinguer les instructions des données et améliorent la précision du parsing', isAnswer: true},
    {text: 'Les balises XML ralentissent la tokenisation et doivent être évitées'},
    {text: 'Les balises XML sont équivalentes aux en-têtes Markdown'},
  ]}
>
  <slot name="question">
  <div className="question">
    Pourquoi les prompts de production utilisent-ils massivement des balises XML comme `<document>`, `<context>` ou `<instructions>` ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les balises de type XML offrent des **frontières structurelles explicites** que les modèles sont entraînés à reconnaître et respecter. Elles remplissent deux rôles :

    1. **Séparation** : Elles indiquent au modèle où les instructions se terminent et où les données commencent — crucial pour le RAG et pour réduire les risques d'injection de prompt provenant des documents récupérés.
    2. **Analyse facilitée** : Lorsque vous demandez au modèle de répondre en XML (par ex. `<answer>...</answer>`), les balises vous offrent des points d'extraction propres, sans avoir à recourir à des hacks regex.

    Il ne s'agit pas d'XML en tant que langage de balisage. C'est une convention de délimitation sur laquelle les modèles ont été entraînés. Ça marche parce que le modèle a massivement croisé ce pattern durant son entraînement, et non parce qu'il valide des schémas.

    Fonctionne sur la plupart des modèles fine-tunés, assez souvent pour être utile : c'est une convention issue des données d'entraînement, pas une fonctionnalité éditeur ou une garantie de sécurité.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Avancé"
  title="Température et déterminisme"
  options={[
    {text: 'temperature=0 produit toujours des sorties identiques pour une même entrée'},
    {text: 'temperature=0 rend les sorties plus déterministes mais ne garantit pas qu\'elles soient identiques', isAnswer: true},
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
    `temperature=0` pousse le modèle à sélectionner le token de probabilité la plus élevée à chaque étape (décodage glouton), ce qui génère des sorties **plus cohérentes** — mais pas nécessairement identiques.

    Sources de variation avec `temperature=0` :
    - **Non-déterminisme des nombres à virgule flottante** dans les calculs GPU, surtout selon le matériel ou la taille des batchs
    - **Modifications de l'infrastructure côté serveur** (mises à jour du modèle, infrastructure de serving)
    - **Les sorties longues** accumulent de petites variations

    Pour les suites de tests et les évaluations nécessitant un déterminisme strict, `temperature=0` est le bon choix — évitez simplement d'écrire des assertions qui dépendent d'une correspondance caractère pour caractère. Testez la structure, le contenu essentiel et le comportement, pas les chaînes exactes.
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
    {text: 'La mise en cache stocke les paires KV compilées pour les préfixes de prompt statiques, réduisant le coût en tokens d\'entrée', isAnswer: true},
    {text: 'La mise en cache n\'est disponible que sur les modèles OpenAI'},
    {text: 'La mise en cache est automatique et ne nécessite aucune configuration de la part du développeur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est-ce que la "mise en cache des prompts" dans le contexte des API de LLM (Anthropic, OpenAI) ?
    <p className="text-sm">Dernière vérification : 8 mai 2026. Les contrôles de cache et les tarifs des fournisseurs évoluent rapidement.</p>
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La mise en cache des prompts réutilise le **cache KV / état du préfixe de prompt** déjà calculé pour les préfixes statiques, lorsque votre fournisseur le prend en charge. Lors des requêtes suivantes avec le même préfixe, le modèle peut ignorer le retraitement de ces tokens — ce qui réduit la latence et peut diminuer drastiquement le coût.

    Il ne s'agit pas d'une mise en cache des réponses. Le modèle génère toujours une réponse fraîche à chaque fois. Vous évitez simplement de retokeniser et de recalculer l'attention pour la partie du prompt qui ne change pas.

    À utiliser de préférence pour : les prompts système volumineux, les documents statiques, les définitions d'outils, les exemples few-shot — tout ce qui est identique d'une requête à l'autre. Le préfixe mis en cache doit obligatoirement se trouver au *début* de votre prompt.

    À ne pas confondre avec : la déduplication sémantique, la mémorisation des réponses ou la mise en cache au niveau de l'application.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Avancé"
  title="Ancrage vs. Hallucination"
  options={[
    {text: 'Indiquer au modèle de « ne pas halluciner » dans le prompt système'},
    {text: 'Augmenter la température pour obtenir des réponses plus assurées'},
    {text: 'Fournir les documents sources récupérés et demander au modèle de les citer', isAnswer: true},
    {text: 'Utiliser un modèle plus grand — l\'hallucination ne concerne que les petits modèles'},
  ]}
>
  <slot name="question">
  <div className="question">
    La technique la plus efficace pour réduire les hallucinations dans un système d'IA en production est :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Demander à un modèle de ne pas halluciner ne change rien — il ne possède pas de signal introspectif fiable pour détecter « je l'invente ». Résultat : il vous assurera avec la plus grande conviction qu'il ne triche, tout en inventant des faits.

    La solution qui fonctionne : **l'ancrage**. Donnez au modèle les informations nécessaires pour répondre, et contraignez-le strictement à ces sources :
    ```
        Answer only using the provided documents.
        If the answer isn't in the documents, say: "I don't have enough information to answer that."
    ```
    Validez ensuite la sortie : vérifiez que chaque affirmation de la réponse est bien étayée par le contexte récupéré. C'est le contrôle d'ancrage par citation — consultez la section dédiée à l'évaluation RAG pour les détails d'implémentation.

    Les grands modèles hallucinent moins en moyenne, mais aucun n'en est exempt. L'ancrage est la stratégie d'atténuation, pas la taille du modèle.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Expert"
  title="Ingénierie du contexte vs. Fine-tuning"
  options={[
    {text: 'Le fine-tuning est toujours meilleur — l\'ingénierie du contexte n\'est qu\'une solution de contournement'},
    {text: 'L\'ingénierie du contexte est gratuite ; le fine-tuning est coûteux ; utilisez toujours l\'ingénierie du contexte'},
    {text: 'L\'ingénierie du contexte modifie le comportement par requête ; le fine-tuning modifie définitivement les poids du modèle', isAnswer: true},
    {text: 'Il s\'agit de deux noms différents pour la même technique'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est la différence fondamentale entre l'ingénierie du contexte et le fine-tuning, et dans quels cas ce dernier est-il vraiment justifié ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **L'ingénierie du contexte** façonne le comportement du modèle via le prompt — instructions système, exemples few-shot, contexte récupéré. C'est spécifique à chaque requête, réversible et ne nécessite aucun entraînement.

    **Le fine-tuning** met à jour les poids du modèle sur vos données. Les modifications sont permanentes (pour ce checkpoint) et s'appliquent à chaque inférence.

    Le fine-tuning est vraiment supérieur quand :
    - Vous avez besoin d'un style/format cohérent que le modèle ne peut pas suivre de manière fiable avec de simples instructions
    - Votre tâche exige un comportement reproductible sur des motifs propres à un domaine que le prompting et la récupération ne résolvent pas
    - Vous devez réduire la longueur du prompt — le comportement appris ne doit pas être réexpliqué à chaque requête
    - Vous traitez un grand volume de requêtes où des exemples few-shot constants consomment un nombre significatif de tokens

    Le fine-tuning est excessif quand :
    - Vos instructions tiennent dans un prompt système
    - Vous avez surtout besoin de faits récents ou propriétaires récupérables à la demande
    - Les exigences changent souvent (vous devriez alors re-fine-tuner)
    - Vous n'avez pas d'abord épuisé les possibilités de l'ingénierie du contexte

    La bonne démarche : maîtrisez d'abord l'ingénierie du contexte. Passez au fine-tuning uniquement quand c'est prouvé insuffisant.
  </div>
  </slot>
</Challenge>

</QuizUI>

Comment s'est passé le quiz ?

- **13–14** : Vous construisez des systèmes d'IA en production, pas de simples démos. Rare.
- **9–12** : Praticien confirmé. Vous maîtrisez les outils ; les limites restent encore floues.
- **5–8** : Vous avez beaucoup utilisé des LLM, mais vous n'avez pas creusé la gestion du contexte. Approfondissez vos connaissances sur le cache de prompts et la recherche hybride — cela changera votre approche des coûts.
- **0–4** : Bonne nouvelle : tout ce quiz est apprenable et directement applicable. La seule question sur le phénomène « lost in the middle » vaut le coup d'être maîtrisée avant votre prochain déploiement RAG.

L'ingénierie du contexte est la discipline qui consiste à choisir délibérément les informations intégrées à la fenêtre, leur positionnement et leur structuration. Le modèle est la composante la moins maîtrisable de votre système. Tout ce qui l'entoure est sous votre contrôle.
````
