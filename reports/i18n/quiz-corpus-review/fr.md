# French quiz translation review

Reviewed every question, choice, hint and explanation in all 19 French quizzes against the current English source: **267 questions and 1,231 choices**. Edited final French MDX, preserving lazy hydration and actual code/output tokens. No external AI judge was used.

## Findings and repairs

| Quiz | Questions | Changes |
| --- | ---: | --- |
| quiz-master-modern-html5 | 14 | HTML dd/figure option overlap removed; original sample image path restored; translated labels and prose. |
| quiz-in-the-aws-cloud | 26 | S3 abbreviation preserves English expansion with French gloss; UpdateItem question scoped; On-Demand cost guarantee removed; truncated Streams hint restored; read capacity options translated; S3 consistency limited to object operations; all26 difficulty/objective fields restored. |
| quiz-js-interfaces-symbols-and-enumerables | 7 | Literal true/false/undefined choices restored; gender and accessor wording corrected; missing hints slots restored. |
| quiz-can-you-count-to-bigint | 13 | Literal booleans restored; comparison-table prose translated; omitted introduction restored; corrected binary/octal prefix table propagated. |
| js-quiz-14-date-time-questions-test-your-knowledge | 14 | Date() callable semantics, NaN/TypeError, DST caveat corrected; timezone assumptions repeated; represented-date prompts clarified; exact output strings restored. |
| quiz-destructuring-delights | 12 | Translated console outputs restored to actual literals; parameter defaults distinguished from property defaults; missing TypeScript heading and closing prose restored; corrected Q4 explanation propagated. |
| quiz-data-structures-algorithms | 20 | Cached-length/DFS/Dijkstra questions made unique; algorithms, operations and traversal order choices translated; strict-comparison stability condition propagated; all20 hints restored. |
| quiz-advanced-js-error-mastery | 14 | All14 omitted hints translated; quoted original error restored; trace-versus-live-stack wording clarified; cross-realm and spoofing caveats preserved. |
| quiz-do-you-know-esnext | 11 | allSettled literal status/output restored; operator terminology consistent; all11 missing hints translated. |
| quiz-nodejs-files-streams-buffers-oh-my | 15 | allocUnsafe security misinformation removed; whole-file buffering claim corrected; HELLO WORLD restored; null exception in object mode; broken collection link fixed; backpressure consistently rétropression. |
| javascript-promises-quiz | 9 | catch recovery and fulfillment corrected; later then not required; hint labels translated; original output strings retained. |
| quiz-sql-query-fundamentals | 11 | Correlated query defined semantically rather than execution guarantee; UNIQUE index recommendation removed; planner tradeoffs retained. |
| quiz-postgres-sql-mastery-pt2 | 12 | RETURNING extension framing aligned; array/JSON standards nuance; partial-index implication and eligibility caveats. |
| quiz-modern-css-2025 | 11 | width CSS literals restored; root-font premise explicit; max accepts one or more expressions; native nesting terminology consistent. |
| quiz-css-core-fundamentals | 14 | Horizontal text centering scoped; invalid align property claim removed; invalid-unit grammar corrected. |
| quiz-regex-or-wreckage | 16 | Lookahead input position and case-insensitive backtracking clarified; capture-group and word-boundary terminology aligned; malformed French headings/questions repaired. |
| quiz-bash-in-the-shell | 16 | Literal stdout choices restored; single-quote escaping boundary corrected; do keyword explanation repaired; omitted substitution/redirection prose and links restored. |
| quiz-is-your-memory-rusty | 18 | Literal names retained; untranslated Box/Rc/Weak hints/options translated; lifetime mismatch hint corrected; Mutex and iterator caveats; all18 difficulty/objective fields restored. |
| quiz-postgres-sql-mastery-pt1 | 14 | They quote corruption fixed; duplicate timestamp explanation removed; precision question clarified; typed literal terminology; missing heading, section introduction, and navigation links restored. |

## Terminology decisions

- **Promesse**, **rejet**, **valeur par défaut** follow the existing French introduction at [intro-to-promises](../../../src/content/posts/2018-08-01--intro-to-promises/fr/index.mdx). Preserve Promise API names and status strings such as fulfilled; distinguish fulfillment from adoption of another promise.
- **Jointure**, **contrainte**, **index**, **clé étrangère** match [the foreign-key article](../../../src/content/posts/2025-12-29--your-foreign-keys-are-killing-performance/fr/index.mdx). Use **cohérence à terme**, instead of the misleading literal “éventuellement cohérente,” when describing eventual consistency.
- **Motif**, **correspondance**, **groupes de capture** match [the regex extraction article](../../../src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/fr/index.mdx), which also retains lookahead/lookbehind English terms. French anticipation/rétrospection is accompanied by the established English term where useful.
- **Trace de pile** describes a recorded stack trace; **pile d’appels** describes the live call stack, consistent with [the async-stack article](../../../src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/fr/index.mdx).
- Within Node, **rétropression** replaces the inconsistent “pression arrière.” Within Rust, **propriété**, **emprunt**, **durée de vie**, **mutabilité intérieure**, **référence faible**, **interblocage** remain consistent. Exact type names and literals are retained. These are editorial choices grounded in the corpus, not a claim of universal French-language consensus.

## Verification and limits

- French corpus regression: **19 tests passed, 0 failed, 1,621 assertions**. It checks every question index, every option count, one correct answer, source answer position parity, nonempty options, and distinct options.
- Source/translation SHA-256 values and all 267 answer records are in [fr-evidence.json](fr-evidence.json).
- Root task owns Playwright coverage, source corrections, and full build validation. The language review does not claim browser execution or live SQL/AWS checks.
- All 19 French translations pass the current translation-integrity checks with zero diagnostics; see [fr-integrity.txt](fr-integrity.txt). The shared validator now distinguishes translatable prose from executable tokens.

## Complete answer ledger

Answer positions are one-based. Exact selected labels are shown, including untranslated executable output.

### quiz-master-modern-html5

Source SHA-256: `9320d673f59fafb3da0b9c01736b3b54a103301210b176a3e5c5c78e771b7b74`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 1 | Liste non ordonnée |
| 2 | 4 | Une description, une définition ou une valeur associée à un terme dans une liste de description |
| 3 | 2 | Regrouper un contenu autonome avec sa légende |
| 4 | 2 | Une section de contenu autonome |
| 5 | 1 | Regrouper des éléments de formulaire sous un titre |
| 6 | 2 | Représenter une valeur numérique dans une plage |
| 7 | 2 | Déclarer le(s) format(s) de fichier média disponible(s) |
| 8 | 4 | Regrouper un titre avec son sous-titre |
| 9 | 2 | Pour lister des commandes ou des contrôles de barre d'outils |
| 10 | 1 | Contenu repliable natif |
| 11 | 2 | Déclarer une modale ou une popup |
| 12 | 1 | Pour représenter une date et une heure |
| 13 | 2 | Améliorer l'accessibilité |
| 14 | 2 | Pour décrire l'objectif d'un élément |

### quiz-in-the-aws-cloud

Source SHA-256: `8f073f151596d04141eec7cd5a1517d350fc7a7ebb7a42725eac544d8cb8dba9`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 3 | Simple Storage Service (service de stockage simple) |
| 2 | 1 | Stocker des propriétés arbitraires |
| 3 | 4 | UpdateItem |
| 4 | 2 | OpenSearch |
| 5 | 3 | Fournit un basculement automatique |
| 6 | 1 | API Gateway |
| 7 | 4 | Utiliser le principe du moindre privilège |
| 8 | 2 | Redimensionne automatiquement la capacité de calcul |
| 9 | 3 | 100 |
| 10 | 1 | 1 |
| 11 | 4 | La capacité à la demande évite de provisionner la capacité pour un trafic sporadique et imprévisible |
| 12 | 2 | Utiliser des préfixes logiques ; la randomisation n’est pas nécessaire |
| 13 | 3 | Sauvegardes automatisées avec restauration à un instant donné |
| 14 | 1 | Redis prend en charge plus de structures de données et d'opérations |
| 15 | 4 | Permet d'interroger des attributs non primaires |
| 16 | 2 | Transférer automatiquement les objets entre les classes de stockage |
| 17 | 3 | Prend en charge jusqu'à 15 répliques de lecture |
| 18 | 1 | Chiffrer les données au repos et en transit |
| 19 | 4 | Capturer les changements au niveau des éléments pour des architectures événementielles |
| 20 | 2 | Utilisez le téléchargement multipart pour les gros fichiers |
| 21 | 3 | Mélanger les classes de stockage selon les modèles d'accès |
| 22 | 1 | 100 lectures par seconde |
| 23 | 4 | Promotion automatique basée sur le niveau de priorité de basculement |
| 24 | 2 | Cohérence forte en lecture après écriture pour les écritures, suppressions et listes d’objets |
| 25 | 3 | Suppression en arrière-plan avec un timing au meilleur effort |
| 26 | 1 | La vitesse de mise à l'échelle dépend de la capacité actuelle et configurée |

### quiz-js-interfaces-symbols-and-enumerables

Source SHA-256: `c31ed61019199a9690cb1c1f02182365a0ddb2c7c99eb9ad49da340c96dd83f9`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 3 | Accéder directement à la valeur |
| 2 | 1 | Utiliser un Symbol |
| 3 | 4 | Oui, elle sera listée |
| 4 | 2 | false |
| 5 | 3 | false |
| 6 | 1 | Non, elle ne sera pas listée |
| 7 | 4 | Object.getOwnPropertySymbols() |

### quiz-can-you-count-to-bigint

Source SHA-256: `f7af3ca5f8ef55272d24882cc3612f0492277f3ce73ad21ddc7a952a7f4d6a8e`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 1 | 123456 |
| 2 | 1 | 123 |
| 3 | 2 | false |
| 4 | 1 | Infinity |
| 5 | 5 | "5.00" |
| 6 | 1 | true |
| 7 | 3 | false |
| 8 | 1 | true |
| 9 | 1 | 255 |
| 10 | 1 | [24, NaN, NaN] |
| 11 | 1 | [24, NaN, 34] |
| 12 | 4 | NaN 0 |
| 13 | 5 | 1112745 |

### js-quiz-14-date-time-questions-test-your-knowledge

Source SHA-256: `989751b2ad3098d09729710992be6df598d713b5e494fbb8a539c85cf39cc780`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 2 | Feb 01 2020 |
| 2 | 1 | Jan 01 2020 |
| 3 | 4 | Date actuelle |
| 4 | 1 | 1969 |
| 5 | 1 | 2019 2020 |
| 6 | 2 | date.toLocaleFormat('en-US') |
| 7 | 3 | TypeError |
| 8 | 3 | Millisecondes depuis le 1er janvier 1970 GMT |
| 9 | 2 | 420 |
| 10 | 1 | Jan 01 2020 |
| 11 | 2 | Feb 01 2020 |
| 12 | 2 | Jan 01 2021 |
| 13 | 4 | Feb 01 2021 |
| 14 | 4 | Dec 01 2019 |

### quiz-destructuring-delights

Source SHA-256: `0aa930822ea8a6b38914c30bcdb73e22de3e8910a0f92e5f0f6ab8c090fabd4d`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 4 | Name: Dan Levy, Age: undefined |
| 2 | 3 | Name: Dan Levy, Age: undefined |
| 3 | 5 | Erreur |
| 4 | 5 | Erreur |
| 5 | 3 | Hi Dan from Unknown |
| 6 | 6 | Erreur |
| 7 | 6 | N/A, N/A, Joburg |
| 8 | 6 | null, N/A |
| 9 | 5 | TypeScript Error |
| 10 | 5 | Denver |
| 11 | 3 | Erreur : les propriétés 'birth' et 'age' sont manquantes |
| 12 | 5 | Erreur |

### quiz-data-structures-algorithms

Source SHA-256: `bbe16f991f17d61caaf6a3d510caa7d4dd771d1113bbbdd157319831abc66dd7`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 3 | Piles |
| 2 | 1 | O(1) |
| 3 | 4 | O(n) |
| 4 | 2 | O(log n) |
| 5 | 3 | O(n log n) |
| 6 | 1 | File d'attente |
| 7 | 4 | Recherche en profondeur |
| 8 | 2 | O(n log n) |
| 9 | 3 | O(1) |
| 10 | 1 | Empiler, dépiler, consulter le sommet |
| 11 | 4 | Algorithme de Dijkstra |
| 12 | 2 | Arbre AVL et arbre rouge-noir |
| 13 | 3 | Cas de base |
| 14 | 1 | Enfiler et Défiler |
| 15 | 4 | Le graphe doit être orienté et acyclique |
| 16 | 2 | O(2^n) |
| 17 | 3 | Tas |
| 18 | 1 | Infixe, préfixe, postfixe |
| 19 | 4 | La racine est le plus petit élément et la hauteur est O(log n) |
| 20 | 2 | Stable |

### quiz-advanced-js-error-mastery

Source SHA-256: `e00c048b44ae6dec4bee8aedf31356a8c002564399f9e3525175ace3b2fe3bbb`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 2 | {} |
| 2 | 2 | `console.log` affiche plus d'informations |
| 3 | 1 | true, true, true |
| 4 | 3 | Peut être faux entre contextes d’exécution |
| 5 | 2 | false, "string" |
| 6 | 2 | "CustomError" |
| 7 | 2 | "Error" |
| 8 | 1 | "Original error" |
| 9 | 1 | Retire createError de la trace de pile |
| 10 | 2 | "Value undefined is invalid" |
| 11 | 2 | Envoie {"error":{}} |
| 12 | 2 | Toute valeur peut être un rejet |
| 13 | 2 | Peut ne pas exister dans tous les environnements |
| 14 | 2 | false, false |

### quiz-do-you-know-esnext

Source SHA-256: `63cd3ddef63907f8281b7060db5b8004bf7bac2067f84fcdf01ca8bd8b18c3fb`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 4 | 100 |
| 2 | 1 | false |
| 3 | 1 | undefined |
| 4 | 3 | 84n |
| 5 | 4 | object |
| 6 | 1 | fulfilled: success |
| 7 | 2 | Itérateur de correspondances |
| 8 | 1 | URL du module actuel |
| 9 | 2 | 10 |
| 10 | 2 | 10 |
| 11 | 2 | { data: 'important' } |

### quiz-nodejs-files-streams-buffers-oh-my

Source SHA-256: `77b0246b9c8275d11d3ca3108732512ae203d0d5f45f379aeb5166c248928930`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 1 | Crée un Buffer de taille 5 rempli de zéros |
| 2 | 1 | A |
| 3 | 2 | Affiche "Done" puis le contenu du fichier |
| 4 | 1 | Renvoie un Buffer |
| 5 | 1 | 'data', 'end', 'error', 'close' |
| 6 | 2 | Copie le fichier par blocs sans mettre le fichier entier en mémoire tampon |
| 7 | 1 | Crée des répertoires imbriqués si nécessaire |
| 8 | 2 | HELLO WORLD |
| 9 | 2 | Pas garanti ; peut se déclencher plusieurs fois |
| 10 | 2 | false |
| 11 | 1 | Empêche le débordement de mémoire |
| 12 | 3 | Crée un lien symbolique |
| 13 | 3 | Les deux modes |
| 14 | 1 | Un nombre |
| 15 | 5 | 10 |

### javascript-promises-quiz

Source SHA-256: `ead6cb486ce9cef02d253b30715e77820dde44c9a310546a0532e7164078dd5a`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 2 | afficher le message deux fois |
| 2 | 3 | promesse rejetée non gérée |
| 3 | 1 | afficher l’erreur et `undefined` |
| 4 | 1 | afficher le message d'erreur une fois |
| 5 | 4 | rien ne s'affiche |
| 6 | 3 | affiche "SUCCESS!" |
| 7 | 3 | afficher "SUCCESS!" et "SUCCESS!" |
| 8 | 4 | affiche `undefined` |
| 9 | 3 | afficher "The fails!" |

### quiz-sql-query-fundamentals

Source SHA-256: `4788ec9e33c53b4fb819c0e7e472f3a737b497b83add5049de127d7dcc4b32ad`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 2 | SELECT * FROM users WHERE name = 'John'; |
| 2 | 2 | Compte uniquement les valeurs non NULL d'une colonne |
| 3 | 2 | Renvoie toutes les lignes de la table de gauche, plus les lignes correspondantes de la droite |
| 4 | 3 | Renvoie les lignes qui satisfont la condition de jointure dans les deux tables |
| 5 | 4 | Une sous-requête qui référence des colonnes de la requête externe |
| 6 | 4 | Définir un ensemble de résultats temporaire à utiliser dans une instruction SQL plus grande |
| 7 | 1 | Vérifie si une valeur est NULL |
| 8 | 4 | Renvoie les lignes correspondant aux valeurs d'une liste spécifiée |
| 9 | 3 | Renvoie le premier argument non NULL |
| 10 | 4 | Regroupe les lignes selon la ou les colonnes spécifiées |
| 11 | 5 | Renvoie toutes les lignes des deux tables, avec des NULL pour les lignes non correspondantes |

### quiz-postgres-sql-mastery-pt2

Source SHA-256: `442e06417de424ae712b9a4016865482fd1050ef479a9719f3c28d4709b2d808`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 1 | JOIN ALL |
| 2 | 5 | id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY |
| 3 | 4 | RETURNING |
| 4 | 2 | Annule toutes les instructions (Rollback) |
| 5 | 1 | ON a.id = b.id |
| 6 | 1 | CREATE INDEX ON students(grade_level, last_name); |
| 7 | 2 | Les guillemets doubles sont obligatoires |
| 8 | 2 | "first.name" |
| 9 | 8 | WHERE RANDOM() >= 0.9 |
| 10 | 3 | Indexe uniquement les étudiants actifs |
| 11 | 4 | 1 |
| 12 | 3 | Modifie les données et émet un plan |

### quiz-modern-css-2025

Source SHA-256: `7254e27e26db35a72ca971a9fce8ae96d3cba30163bc6958ec3118e52e39704b`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 3 | background-color: var(--main-color); |
| 2 | 2 | width: 200px; |
| 3 | 5 | width: 96px; |
| 4 | 3 | La première colonne sera entre 100 px et 200 px |
| 5 | 4 | #6b8e23 |
| 6 | 3 | Échelle linéaire entre 200 px et 500 px |
| 7 | 3 | Oui |
| 8 | 4 | Parfait. Aucun commentaire. |
| 9 | 2 | background-color: white |
| 10 | 2 | En utilisant JavaScript |
| 11 | 3 | Largeur : 110px |

### quiz-css-core-fundamentals

Source SHA-256: `ee5866dcab74b29fcaf99765c78fd8c474d51fbd357ed07af1c02059c59d81c7`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 1 | 10cx |
| 2 | 3 | #ABCD |
| 3 | 14 | rel |
| 4 | 4 | a#home[name='home'] |
| 5 | 4 | button[onclick] |
| 6 | 3 | c > > d {} |
| 7 | 5 | a:last-child |
| 8 | 3 | a#quote |
| 9 | 4 | text-align: center; |
| 10 | 3 | align-content: center; |
| 11 | 2 | 5px |
| 12 | 2 | 12px |
| 13 | 5 | 24px |
| 14 | 1 | :where(.card) .title |

### quiz-regex-or-wreckage

Source SHA-256: `10ac88ad77540507d3992e3b6500e5cc1e13152dd22a82a20d0adce4ac8b4a25`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 3 | ["cat"] |
| 2 | 1 | ["cat", "hat"] |
| 3 | 4 | ["<div>Hello</div>", "<div>World</div>"] |
| 4 | 2 | ["hello", "world"] |
| 5 | 5 | null |
| 6 | 2 | ["cat"] |
| 7 | 3 | ["a", "a", "a"] |
| 8 | 3 | ["23", "456"] |
| 9 | 2 | ["2029", "12", "31"] |
| 10 | 4 | ["12"] |
| 11 | 1 | ["a,", "b,", "c"] |
| 12 | 4 | null |
| 13 | 2 | ["100"] |
| 14 | 2 | ["bold"] |
| 15 | 2 | ["😀", "🙂"] |
| 16 | 2 | "Sass123!" |

### quiz-bash-in-the-shell

Source SHA-256: `ea4b4440293b28444b461e783c6f33db1a9d797e64fa8a5987034d8dada9f631`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 2 | name=Dan |
| 2 | 3 | echo 'It'\''s 🔨 Time!' |
| 3 | 2 | cat cbt |
| 4 | 4 | Cost: 00 |
| 5 | 3 | Bark meow |
| 6 | 3 | ${#username} |
| 7 | 2 | Affiche « File does not exist » après un diagnostic de test |
| 8 | 2 | Affiche « Different cats » après une erreur de syntaxe de test |
| 9 | 1 | Hi |
| 10 | 3 | \| |
| 11 | 4 | echo $(( 2 + 2 )) |
| 12 | 6 | echo '10 * 0.5' \| bc |
| 13 | 3 | good cat |
| 14 | 2 | each |
| 15 | 4 | $(ls -l) |
| 16 | 3 | 2>&1 |

### quiz-is-your-memory-rusty

Source SHA-256: `e31e6449bc819ea5691b0d41998b3052afe28378c4dbe0bab4551abe753c2f9c`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 5 | Erreur de compilation : valeur empruntée après déplacement |
| 2 | 3 | Erreur de compilation |
| 3 | 2 | Erreur : impossible d'emprunter `wisdom` comme mutable plus d'une fois |
| 4 | 1 | Compile avec succès |
| 5 | 3 | Erreur de compilation |
| 6 | 3 | Reference count: 3 |
| 7 | 2 | Erreur : spécificateur de durée de vie manquant |
| 8 | 2 | Erreur : spécificateur de durée de vie manquant |
| 9 | 2 | Panique à l'exécution : RefCell déjà emprunté |
| 10 | 1 | Affiche : 42, 43 |
| 11 | 1 | Rc est utilisé pour les environnements à un seul thread |
| 12 | 4 | RefCell n’est pas Sync ; RwLock permet un partage synchronisé |
| 13 | 5 | Interblocage ou panique |
| 14 | 2 | Affiche : None |
| 15 | 1 | La ressource est libérée après la portée |
| 16 | 2 | Copie profonde créée |
| 17 | 3 | 32 octets |
| 18 | 2 | L’itérateur peut être aussi efficace qu’une boucle manuelle |

### quiz-postgres-sql-mastery-pt1

Source SHA-256: `8cb97e01f93954cd744f660f427ef83528e228aef5df6c5bdeae527f140c09b6`

| Question | Correct position | Correct answer |
| ---: | ---: | --- |
| 1 | 4 | MEDIAN |
| 2 | 3 | CAST('95', INTEGER) |
| 3 | 3 | Plusieurs NULL autorisés |
| 4 | 4 | 2024-11-28 00:00:00 |
| 5 | 1 | Ils occupent tous les deux 8 octets, mais représentent des sémantiques d'horodatage différentes |
| 6 | 4 | STRING(100) |
| 7 | 6 | decimal128 |
| 8 | 3 | ipv4 |
| 9 | 4 | currency |
| 10 | 6 | triangle |
| 11 | 2 | Error: integer out of range |
| 12 | 4 | 2024-01-08 13:30:00.1234567 |
| 13 | 5 | tsrank |
| 14 | 1 | Immédiatement pour les nouvelles lignes ou les lignes modifiées |
