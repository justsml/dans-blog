# Translation Candidate
- Slug: quiz-regex-or-wreckage
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-15--quiz-regex-or-wreckage/fr/index.mdx
- Validation: passed
- Runtime seconds: 82.64
- Input tokens: 15987
- Output tokens: 11615
- Thinking tokens: unknown
- Cached input tokens: 4256
- Cache write tokens: 0
- Estimated cost: $0.002714
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz : Maîtrise des expressions régulières'
subTitle: Dominez les expressions régulières sauvages.
label: RegEx
social_image: ../desktop-social.webp
category: Quiz
subCategory: RegEx
date: '2024-11-15'
modified: '2024-11-16'
tags:
  - quiz
  - regex
  - javascript
  - intermediate
  - patterns
cover_full_width: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-wide.webp
cover_mobile: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-square-200.webp
cover_icon: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-square-200.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<p class="inset">Prêt à vous battre avec des expressions régulières ? 🤼‍♂️</p>

Testez vos connaissances en RegEx avec des questions portant sur les motifs de base, les quantificateurs, les groupes et ces assertions look‑around compliquées. Des correspondances de chaînes simples à la validation de motifs complexes – pouvez‑vous identifier la bonne expression régulière ?

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Échauffement"
  title="Correspondance sensible à la casse"
  options={[
    {text: '["Cat"]'},
    {text: '["cat", "CAT", "Cat"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est-ce qui correspond ?
    ```js
    'cat CAT Cat'.match(/cat/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ce modèle utilise `g`, mais pas `i` :
    - `g` trouve toutes les correspondances
    - Sans `i`, la recherche est sensible à la casse

    Sans le drapeau `i`, seule la chaîne en minuscules "cat" correspond.

    C’est particulièrement utile lorsqu’on traite des entrées utilisateur ou du HTML où la casse peut varier.

    [En savoir plus sur les drapeaux RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Échauffement"
  title="Correspondance de caractères simples"
  options={[
    {text: '["cat", "hat"]', isAnswer: true},
    {text: '["cat", "hat", "what"]'},
    {text: '["cat"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que renverra ce code ?
    ```js
    const words = ['cat', 'hat', 'what', 'bat'];
    words.filter(word => word.match(/^[ch]at/))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le motif `/^[ch]at/` correspond aux chaînes qui :
    - Commencent (`^`) par 'c' ou 'h' (c’est ce que signifie `[ch]` – une classe de caractères qui correspond à un seul caractère)
    - Suivies littéralement de 'at'

    Ainsi, seules "cat" et "hat" correspondent à ce motif. La méthode `filter()` ne conserve que les éléments correspondants.

    [En savoir plus sur les classes de caractères sur MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Correspondance de base"
  title="Gourmand vs non-gourmand"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Que cela va-t-il correspondre ?
    ```js
    '<div>Hello</div><div>World</div>'.match(/<div>.*?<\/div>/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le motif `/<div>.*?<\/div>/g` utilise une correspondance non‑gourmande avec `*?`, ce qui signifie :
    - Correspondre à `<div>`
    - Correspondre à n’importe quel caractère (`.*`) mais le moins possible (`?`)
    - Jusqu’à trouver `</div>`
    - Le drapeau `g` fait qu’il trouve toutes les occurrences

    Sans le `?`, le `.*` gourmand correspondrait à tout, du premier `<div>` au dernier `</div>`, produisant une seule grande correspondance. Avec le `?`, il correspond à chaque paire séparément.

    [En savoir plus sur la correspondance gourmande vs paresseuse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Pièges courants"
  title="Le métacaractère point"
  options={[
    {text: '["hello\nworld"]'},
    {text: '["hello", "world"]', isAnswer: true},
    {text: '["hello\n", "world"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que renverra-t-il ?
    ```js
    'hello\nworld'.match(/\w+/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le motif `\w+` correspond à un ou plusieurs caractères alphanumériques. Même s'il y a un saut de ligne dans la chaîne, `\w` correspond à :
    - Lettres (a‑z, A‑Z)
    - Chiffres (0‑9)
    - Souligné (_)

    Ainsi, le saut de ligne agit comme une frontière de mot, et nous obtenons deux correspondances. Si nous avions utilisé `.*`, il ne correspondrait pas au saut de ligne par défaut (il faudrait le drapeau `s` pour cela).

    [En savoir plus sur les métacaractères](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes#types)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Look-ahead"
  title="Look-ahead positif"
  options={[
    {text: '["$100", "€50"]'},
    {text: '["100", "50"]'},
    {text: '["$", "€"]'},
    {text: '[]'},
    {text: 'null', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Que va-t-il correspondre ?
    ```js
    '$100 and €50'.match(/\d+(?=[\$€])/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ce motif ne correspondra à rien parce que le look‑ahead est inversé ! Si vous voulez des chiffres précédés de `$` ou `€`, utilisez un look‑behind : `/(?<=[\$€])\d+/g`.

    Les look‑aheads vérifient ce qui vient *après* la position courante. Le motif tel qu’il est écrit recherche :
    - Un ou plusieurs chiffres (`\d+`)
    - Suivis de (`(?=…)`) soit $ soit € (`[\$€]`)

    Comme il n’y a aucun nombre suivi d’un symbole monétaire (ils sont précédés), aucune correspondance n’est trouvée.

    [En savoir plus sur les assertions look‑ahead](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Correspondance de base"
  title="Délimitations de mots"
  options={[
    {text: '["cat", "cats"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '["cats"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est-ce qui correspondra ?
    ```js
    'cat cats category'.match(/\bcat\b/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La `\b` représente une bordure de mot, qui correspond à :
    - Entre un caractère de mot et un caractère non‑mot
    - Au début ou à la fin de la chaîne s'il y a un caractère de mot

    Ainsi `/\bcat\b/` ne correspond à "cat" que lorsqu'il forme un mot complet, pas lorsqu'il fait partie d'un autre mot.
    - ✅ "cat" (entouré d'espaces)
    - ❌ "cats" (pas de bordure après "cat")
    - ❌ "category" (pas de bordure après "cat")

    [En savoir plus sur les bordures de mots](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions#other_assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Pièges courants"
  title="Le drapeau global"
  options={[
    {text: 'null'},
    {text: '["a"]'},
    {text: '["a", "a", "a"]', isAnswer: true},
    {text: '["b", "n", "n"]'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le résultat ?
    ```js
    'banana'.match(/a/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le drapeau `g` (global) modifie le comportement de `match()` :
    - Sans `g` : renvoie la première correspondance avec les groupes de capture
    - Avec `g` : renvoie un tableau de toutes les chaînes correspondantes

    Dans ce cas, il trouve toutes les occurrences de "a" dans "banana".

    Note : si vous avez besoin à la fois de toutes les correspondances ET des groupes de capture, utilisez `matchAll()` ou la méthode `exec()` dans une boucle.

    [En savoir plus sur le drapeau global](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Regard arrière"
  title="Regard arrière négatif"
  options={[
    {text: '["123"]'},
    {text: '["123", "456"]'},
    {text: '["23", "456"]', isAnswer: true},
    {text: '["456"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est-ce qui correspond à ce motif ?
    ```js
    'abc123 def456'.match(/(?<!abc)\d+/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le regard arrière négatif `(?<!abc)` garantit que les chiffres ne sont pas précédés de "abc" :
    - ❌ "123" (précédé de "abc")
    - ✅ "23" (précédé de "abc1")
    - ✅ "456" (précédé de "def")

    JavaScript prend en charge les assertions de regard arrière dans les moteurs modernes. Cet exemple utilise un regard arrière de longueur fixe : `abc` fait toujours trois caractères. Le regard arrière de longueur variable est l’aspect plus délicat propre à chaque moteur.

    Remarque : la prise en charge du regard arrière est relativement récente en JavaScript. Consultez la [compatibilité des navigateurs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#browser_compatibility) si vous devez supporter d'anciens navigateurs.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Correspondance de base"
  title="Groupes capturants"
  options={[
    {text: '["2029-12-31"]'},
    {text: '["2029", "12", "31"]', isAnswer: true},
    {text: '["20", "29", "12", "31"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que renverra-t-il ?
    ```js
    '2029-12-31'.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le motif utilise trois groupes capturants :
    1. `(\d{4})` capture l'année
    2. `(\d{2})` capture le mois
    3. `(\d{2})` capture le jour

    `match()` sans le drapeau `g` renvoie :
    - Index 0 : correspondance complète
    - Index 1+ : groupes capturants

    `slice(1)` est une astuce courante pour ne récupérer que les groupes capturants.

    [En savoir plus sur les groupes et la capture](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Look-ahead"
  title="Look-ahead négatif"
  options={[
    {text: '["password123"]'},
    {text: '["abc123"]'},
    {text: '["123aBc"]'},
    {text: '["12"]', isAnswer: true},
    {text: '["abc"]'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel sera le résultat de cela ?
    ```js
    "123aBc".match(/^\d+(?![a-z])/ig)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le look‑ahead négatif `(?![a-z])` garantit qu'il n'y a pas de lettres minuscules après les chiffres. Comme la partie "3aBc" contient une lettre minuscule après les chiffres, cette portion ne correspond pas. Ainsi, seule la séquence de départ "12" correspond.

    [En savoir plus sur le look‑ahead négatif](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Look-behind"
  title="Division avec look-behind"
  options={[
    {text: '["a,", "b,", "c"]', isAnswer: true},
    {text: '["a,b,c"]'},
    {text: '["a", ",", "b", ",", "c"]'},
    {text: '["a,b,c", ""]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est‑ce qui est renvoyé ?
    ```js
    'a,b,c'.split(/(?<=,)/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le motif `/(?<=,)/` est un look-behind qui correspond après une virgule :
    - `a,` (après la virgule)
    - `b,` (après la virgule)
    - `c` (pas de virgule après)

    Le look-behind ne consomme pas la virgule, ainsi la virgule reste attachée au segment précédent dans le résultat du split.

    C’est pratique quand on veut diviser une chaîne en se basant sur ce qui la précède **sans perdre le(s) caractère(s) de séparation**.

    [En savoir plus sur les assertions look-behind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Pièges courants"
  title="Échapper les caractères spéciaux"
  options={[
    {text: '["$100"]'},
    {text: '["100"]'},
    {text: '[]'},
    {text: 'null', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est-ce qui correspond ?
    ```js
    '$100'.match(/$\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les caractères spéciaux doivent être échappés avec `\` pour correspondre littéralement :
    - `$` est un caractère spécial (fin de chaîne)
    - Pour faire correspondre un signe dollar littéral, échappez‑le : `\$`

    Caractères courants nécessitant un échappement :
    ```js
    . * + ? ^ $ [ ] \ ( ) { } |
    ```
    Sans échappement, de nombreux caractères spéciaux ont des significations regex qui ne sont peut‑être pas ce que vous attendez.

    [En savoir plus sur l'échappement des caractères spéciaux](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Regard arrière"
  title="Regard arrière positif"
  options={[
    {text: '["$100"]'},
    {text: '["100"]', isAnswer: true},
    {text: '["$"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est‑ce qui est correspond ?
    ```js
    '$100'.match(/(?<=\$)\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le regard arrière positif `(?<=\$)` garantit que les chiffres sont précédés d'un signe dollar :
    - `(?<=\$)`: regard arrière pour le signe dollar
    - `\d+`: correspond à un ou plusieurs chiffres

    Les assertions de regard arrière ne consomment pas de caractères ; elles ne font que vérifier ce qui se trouve avant.
    Cela est utile lorsqu'on veut faire correspondre quelque chose en fonction de ce qui le précède sans inclure cette partie.

    [En savoir plus sur les assertions de regard arrière](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Correspondance de base"
  title="Quantificateurs paresseux vs gourmands"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est‑ce qui est capturé ?
    ```js
    '<b>bold</b>'.match(/<b>(.*?)<\/b>/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le motif utilise la correspondance paresseuse avec `*?` :
    - `<b>` : correspond à la balise d’ouverture
    - `(.*?)` : capture n’importe quels caractères (paresseux)
    - `</b>` : correspond à la balise de fermeture

    Le `?` après `*` rend la correspondance paresseuse, en capturant le moins de caractères possible.
    Sans `?`, ce serait gourmand et capturerait le plus possible.

    `slice(1)` renvoie uniquement le groupe capturé.

    [En savoir plus sur la correspondance gourmande vs paresseuse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Correspondance de base"
  title="Drapeau Unicode"
  options={[
    {text: '["🙂"]'},
    {text: '["😀", "🙂"]', isAnswer: true},
    {text: 'null'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est-ce qui correspond ?
    ```js
    '😀 🙂'.match(/\p{Emoji}/gu)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le drapeau `u` active :
    - les échappements de propriétés Unicode (`\p{...}`)
    - la gestion correcte des paires de substitution

    Sans `u`, les emojis et autres caractères Unicode pourraient ne pas correspondre correctement.
    Le motif `\p{Emoji}` correspond aux caractères possédant la propriété Unicode `Emoji`. Dans cette chaîne, cela signifie les deux pictogrammes emoji.

    Remarque : les échappements de propriétés Unicode nécessitent le drapeau `u`.

    [En savoir plus sur le mode Unicode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Regarde-dans-l'enfer"
  title="Validation de mot de passe"
  options={[
    {text: '"sassword123"'},
    {text: '"Sass123!"', isAnswer: true},
    {text: '"SASSWORD123"'},
    {text: '"Sass word123"'},
  ]}
>
  <slot name="question">
  <div className="question">
    Désolé d'avance ! 😈<br />
    Quel mot de passe correspond à ce modèle ?
    ```js
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ne rédigez jamais rien de ce genre en production ! 😅

    Ce modèle utilise plusieurs assertions positives look‑ahead pour imposer :
    - Au moins une lettre majuscule : `(?=.*[A-Z])`
    - Au moins une lettre minuscule : `(?=.*[a-z])`
    - Au moins un chiffre : `(?=.*\d)`
    - Au moins un caractère spécial : `(?=.*[!@#$%^&*])`
    - Longueur minimale de 8 : `.{8,}`

    Les look‑ahead sont parfaits pour la validation de mots de passe car ils permettent de vérifier plusieurs critères sans consommer de caractères.

    [En savoir plus sur les modèles de validation de mot de passe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

</QuizUI>

<h2>Comment ças'est passé ? 🧐</h2>

Les expressions régulières peuvent être une bête à dompter, mais elles sont incroyablement puissantes une fois que vous avez compris le principe (et toutes les nouvelles syntaxes). Continuez à pratiquer, et vous deviendrez un maître du RegEx en un rien de temps ! 🧙‍♂️

<p class="inset">Vous cherchez une pause après tout ce RegEx ?<br />Pftt, rappelez‑vous : pause *après* les compétences ! <br /><br />Allez à [ma salle](../challenges/) pour enchaîner d'autres défis ! 💪</p>
````
