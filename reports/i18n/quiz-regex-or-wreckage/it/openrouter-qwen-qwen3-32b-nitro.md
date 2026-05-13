# Translation Candidate
- Slug: quiz-regex-or-wreckage
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-15--quiz-regex-or-wreckage/it/index.mdx
- Validation: deferred
- Runtime seconds: 192.09
- Input tokens: 14738
- Output tokens: 15668
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004939
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Padronanza delle Espressioni Regolari'
subTitle: Riesci a domare alcuni RegEx selvaggi?
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

<p class="inset">Pronto a scontrarti con alcune Espressioni Regolari? 🤼‍♂️</p>

Metti alla prova le tue conoscenze sulle Espressioni Regolari con domande che coprono pattern di base, quantificatori, gruppi e quelle complicate asserzioni look-around. Dallo semplice abbinamento di stringhe alla complessa validazione di pattern - riesci a individuare la regex corretta?

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Scaldausi"
  title="Corrispondenza sensibile al maiuscolo/minuscolo"
  options={[
    {text: '["Cat"]'},
    {text: '["cat", "CAT", "Cat"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa corrisponde?
    ```js
        'cat CAT Cat'.match(/cat/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Questo modello utilizza `g`, ma non `i`:
    - `g` trova tutte le corrispondenze
    - Senza `i`, la corrispondenza è sensibile al maiuscolo/minuscolo

    Senza la bandiera `i`, solo la versione minuscola "cat" corrisponde.

    Questo è particolarmente utile quando si gestiscono input utente o HTML dove il maiuscolo/minuscolo potrebbe variare.

    [Scopri di più sulle bandiere di RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Riscaldamento"
  title="Corrispondenza di caratteri semplice"
  options={[
    {text: '["cat", "hat"]', isAnswer: true},
    {text: '["cat", "hat", "what"]'},
    {text: '["cat"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa restituirà questo codice?
    ```js
        const words = ['cat', 'hat', 'what', 'bat'];
        words.filter(word => word.match(/^[ch]at/))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il pattern `/^[ch]at/` corrisponde a stringhe che:
    - Iniziano (`^`) con 'c' o 'h' (questo è il significato di `[ch]` - una classe di caratteri che matcha un singolo carattere)
    - Seguiti letteralmente da 'at'

    Pertanto, solo "cat" e "hat" corrispondono a questo pattern. Il metodo `filter()` mantiene solo gli elementi corrispondenti.

    [Scopri di più sulle classi di caratteri su MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Corrispondenza di Base"
  title="Goloso vs Non Goloso"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    A cosa corrisponderà questo?
    ```js
        '<div>Hello</div><div>World</div>'.match(/<div>.*?<\/div>/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il pattern `/<div>.*?<\/div>/g` utilizza la corrispondenza non golosa con `*?` che significa:
    - Corrispondi a `<div>`
    - Corrispondi a qualsiasi carattere (`.*`) ma nel modo meno possibile (`?`)
    - Fino a trovare `</div>`
    - Il flag `g` fa sì che corrisponda a tutte le occorrenze

    Senza il `?`, il goloso `.*` corrisponderebbe a tutto da `<div>` iniziale a `</div>` finale, producendo un'unica corrispondenza. Con `?`, invece, corrisponde a ciascuna coppia separatamente.

    [Scopri di più su goloso vs non goloso](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Errori comuni"
  title="Il metacarattere punto"
  options={[
    {text: '["hello\nworld"]'},
    {text: '["hello", "world"]', isAnswer: true},
    {text: '["hello\n", "world"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa restituirà questo?
    ```js
        'hello\nworld'.match(/\w+/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il pattern `\w+` cerca uno o più caratteri alfanumerici. Anche se c'è un newline nella stringa, `\w` corrisponde a:
    - Lettere (a-z, A-Z)
    - Numeri (0-9)
    - Sottolineatura (_)

    Quindi il newline agisce come un confine di parola, ottenendo due corrispondenze. Se avessimo usato `.*`, non avrebbe corrisposto al newline di default (sarebbe servito il flag `s`).

    [Scopri di più sui metacaratteri](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes#types)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Look-ahead"
  title="Look-ahead positivo"
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
    Cosa corrisponderà questo?
    ```js
        '$100 and €50'.match(/\d+(?=[\$€])/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Questo modello non corrisponderà a niente perché il look-ahead è invertito! Se vuoi numeri preceduti da `$` o `€`, usa un look-behind: `/(?<=[\$€])\d+/g`.

    I look-ahead controllano ciò che viene *dopo* la posizione corrente. Il modello scritto cerca:
    - Uno o più numeri (`\d+`)
    - Seguiti da (`(?=...)`) `$` o `€` (`[\$€]`)

    Poiché non ci sono numeri seguiti da simboli di valuta (sono preceduti da loro), non otteniamo corrispondenze.

    [Scopri di più sugli asserti di look-ahead](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Corrispondenza di base"
  title="Confini delle parole"
  options={[
    {text: '["cat", "cats"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '["cats"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa verrà corrisposto?
    ```js
        'cat cats category'.match(/\bcat\b/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'`\b` rappresenta un confine di parola, che corrisponde:
    - Tra un carattere di parola e un non-carattere di parola
    - All'inizio/fine della stringa se c'è un carattere di parola

    Quindi `/\bcat\b/` corrisponde a "cat" solo quando è una parola completa, non parte di un'altra parola.
    - ✅ "cat" (circondato da spazi)
    - ❌ "cats" (nessun confine dopo "cat")
    - ❌ "category" (nessun confine dopo "cat")

    [Scopri di più sui confini di parola](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions#other_assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Errori comuni"
  title="La bandiera globale"
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
    Qual è l'output?
    ```js
        'banana'.match(/a/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La bandiera `g` (globale) modifica il comportamento di `match()`:
    - Senza `g`: Restituisce il primo match con i gruppi di acquisizione
    - Con `g`: Restituisce un array di tutte le stringhe corrispondenti

    In questo caso, trova tutte le occorrenze di "a" in "banana".

    Nota: Se hai bisogno sia di tutti i match che dei gruppi di acquisizione, usa `matchAll()` o il metodo `exec()` in un ciclo.

    [Scopri di più sulla bandiera globale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Look-behind"
  title="Look-behind negativo"
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
    Quali corrispondono a questa espressione?
    ```js
        'abc123 def456'.match(/(?<!abc)\d+/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'assertione di look-behind negativo `(?<!abc)` garantisce che le cifre non siano precedute da "abc":
    - ❌ "123" (precede "abc")
    - ✅ "23" (precede "abc1")
    - ✅ "456" (precede "def")

    JavaScript supporta le asserzioni di look-behind in motori moderni. Questo esempio usa un look-behind di lunghezza fissa: `abc` è sempre di tre caratteri. Il look-behind di lunghezza variabile è un caso più complesso e dipendente dal motore.

    Nota: Il supporto al look-behind è relativamente recente in JavaScript. Controlla la [compatibilità tra i browser](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#browser_compatibility) se devi supportare browser datati.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Corrispondenza di base"
  title="Gruppi di cattura"
  options={[
    {text: '["2029-12-31"]'},
    {text: '["2029", "12", "31"]', isAnswer: true, hint: 'I gruppi catturano anno, mese e giorno separatamente'},
    {text: '["20", "29", "12", "31"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa restituirà questo?
    ```js
        '2029-12-31'.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il pattern utilizza tre gruppi di cattura:
    1. `(\d{4})` cattura l'anno
    2. `(\d{2})` cattura il mese
    3. `(\d{2})` cattura il giorno

    `match()` senza la bandiera `g` restituisce:
    - Indice 0: Corrispondenza completa
    - Indice 1+: Gruppi di cattura

    `slice(1)` è un trucco comune per ottenere solo i gruppi di cattura.

    [Scopri di più sui gruppi e le catture](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Look-ahead"
  title="Look-ahead negativo"
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
    Qual sarà il risultato di questo?
    ```js
        "123aBc".match(/^\d+(?![a-z])/ig)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'asserzione di look-ahead negativo `(?![a-z])` garantisce che non ci siano lettere minuscole dopo le cifre. Poiché la parte "3aBc" contiene una lettera minuscola dopo le cifre, questa non corrisponde. Pertanto, solo l'inizio "12" corrisponde.

    [Scopri di più sul look-ahead negativo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Look-behind"
  title="Divisione con look-behind"
  options={[
    {text: '["a,", "b,", "c"]', isAnswer: true},
    {text: '["a,b,c"]'},
    {text: '["a", ",", "b", ",", "c"]'},
    {text: '["a,b,c", ""]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa viene restituito?
    ```js
        'a,b,c'.split(/(?<=,)/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il pattern `/(?<=,)/` è un look-behind che corrisponde al testo dopo la virgola:
    - `a,` (dopo la virgola)
    - `b,` (dopo la virgola)
    - `c` (nessuna virgola dopo)

    Il look-behind non consuma la virgola, quindi la virgola rimane attaccata al segmento precedente nel risultato della divisione.

    Questo è utile quando si vuole dividere una stringa in base a ciò che precede **senza perdere il carattere (i) di divisione.**

    [Scopri di più sugli assert di look-behind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Errori comuni"
  title="Escape dei caratteri speciali"
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
    Cosa corrisponde?
    ```js
        '$100'.match(/$\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    I caratteri speciali devono essere escapati con `\` per essere corrisposti letteralmente:
    - `$` è un carattere speciale (fine della stringa)
    - Per corrispondere un dollaro letterale, escapalo: `\$`

    Caratteri comuni che richiedono escape:
    ```js
        . * + ? ^ $ [ ] \ ( ) { } |
    ```
    Senza escape, molti caratteri speciali hanno significati nel regex che potrebbero non essere quelli desiderati.

    [Scopri di più sull'escape dei caratteri speciali](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Look-behind"
  title="Look-behind positivo"
  options={[
    {text: '["$100"]'},
    {text: '["100"]', isAnswer: true},
    {text: '["$"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa viene corrisposto?
    ```js
        '$100'.match(/(?<=\$)\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'asserzione di look-behind positivo `(?<=\$)` assicura che le cifre siano precedute da un segno di dollaro:
    - `(?<=\$)`: Look-behind per il segno di dollaro
    - `\d+`: Corrispondi una o più cifre

    Le asserzioni di look-behind non consumano caratteri; verificano soltanto ciò che precede.
    Questo è utile quando desideri corrispondere qualcosa in base a ciò che lo precede senza includere la parte precedente.

    [Scopri di più sulle asserzioni di look-behind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Corrispondenza di base"
  title="Quantificatori pigri vs golosi"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa viene corrisposto?
    ```js
        '<b>bold</b>'.match(/<b>(.*?)<\/b>/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il pattern utilizza la corrispondenza pigra con `*?`:
    - `<b>`: Corrispondi l'etichetta di apertura
    - `(.*?)`: Cattura qualsiasi carattere (pigro)
    - `</b>`: Corrispondi l'etichetta di chiusura

    L'`?` dopo `*` lo rende pigro, corrispondendo il minor numero possibile di caratteri.
    Senza `?`, sarebbe goloso e corrisponderebbe il più possibile.

    `slice(1)` restituisce solo il gruppo catturato.

    [Scopri di più sul matching goloso vs pigro](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Corrispondenza di base"
  title="Bandiera Unicode"
  options={[
    {text: '["🙂"]'},
    {text: '["😀", "🙂"]', isAnswer: true},
    {text: 'null'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa corrisponde?
    ```js
        '😀 🙂'.match(/\p{Emoji}/gu)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La bandiera `u` abilita:
    - Escape delle proprietà Unicode (`\p{...}`)
    - Gestione corretta delle coppie surrogato

    Senza `u`, emoji e altri caratteri Unicode potrebbero non corrispondere correttamente.
    Il pattern `\p{Emoji}` corrisponde ai caratteri con la proprietà Unicode `Emoji`. In questa stringa, significa i due emoji.

    Nota: le escape delle proprietà Unicode richiedono la bandiera `u`.

    [Scopri di più su Unicode mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Look-into-hell"
  title="Convalida della password"
  options={[
    {text: '"sassword123"'},
    {text: '"Sass123!"', isAnswer: true},
    {text: '"SASSWORD123"'},
    {text: '"Sass word123"'},
  ]}
>
  <slot name="question">
  <div className="question">
    Scusate in anticipo! 😈<br />
    Quale password corrisponde a questa espressione?
    ```js
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Non usate niente del genere in produzione! 😅

    Questo pattern utilizza diversi lookahead positivi per verificare:
    - Almeno una lettera maiuscola: `(?=.*[A-Z])`
    - Almeno una lettera minuscola: `(?=.*[a-z])`
    - Almeno un numero: `(?=.*\d)`
    - Almeno un carattere speciale: `(?=.*[!@#$%^&*])`
    - Lunghezza minima di 8: `.{8,}`

    I lookahead sono perfetti per la convalida delle password perché possono verificare criteri multipli senza consumare caratteri.

    [Scopri di più sulle espressioni per la convalida delle password](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

</QuizUI>

<h2>Come ti sei trovato? 🧐</h2>

Le espressioni regolari possono essere un mostro da domare, ma sono incredibilmente potenti una volta che ci prendi la mano (e tutti i nuovi elementi di sintassi). Continua ad esercitarti e diventerai un maestro delle RegEx in un batter d'occhio! 🧙‍♂️

<p class="inset">Cerchi una pausa dopo tutta questa RegEx?<br />Pf, ricorda: pausa *dopo* le competenze! <br /><br />Vai al [mio gym](/challenges/) per sconfiggere altre sfide! 💪</p>
````
