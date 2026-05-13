# Translation Candidate
- Slug: love-computer-languages
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-12--love-computer-languages/it/index.mdx
- Validation: passed
- Runtime seconds: 20.16
- Input tokens: 7626
- Output tokens: 7462
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.002401
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Amare i Linguaggi (di Programmazione)
date: '2015-06-12'
modified: '2017-02-28'
category: Code
subCategory: languages
draft: true
hidden: true
publish: true
tags:
  - programming
  - languages
  - lua
  - haskell
  - scala
  - rust
  - smalltalk
  - go
  - javascript
  - python
cover: ../rawpixel-602144-unsplash.webp
cover_mobile: ../w300_rawpixel-602144-unsplash.webp
cover_icon: ../icon_rawpixel-602144-unsplash.webp
---
import Gist from '../../../../../components/Gist/index.astro'

## Note sulle linguaggi di programmazione

#### Sono certo che le mie Osservazioni Varie siano state fatte prima, ma ecco la mia lista dei linguaggi più interessanti:

### JavaScript

Il mio Unico Vero Amore, straordinariamente versatile e onnipresente - il campione tuttofare, incredibilmente potente!
È il #1 Linguaggio Più Attivo/Popolare su GitHub.com da anni.

Odio ammetterlo, ma per anni ho avuto solo disprezzo e derisione per ciò che ora è **la mia lingua preferita**.

**ES6** ha solo aumentato il mio ~~~dipendenza~~~ amore. Mentre l'ES5 puro avrà sempre un posto speciale nel mio cuore, ogni volta che uso **ES6**, sento quella morsicata radioattiva...

C'erano 4 fattori che mi hanno spinto nel **campo dell'ES6**:

1.  È divertente. Sul serio. Ci sono guadagni tangibili in bellezza, chiarezza e produttività.

- Affermazioni soggettive, dici? Fammene mostrare un po' di ES6:
- `let expired = users.filter(u => Date.now() > u.trialDate)`
- Ora non devi più fingere di sapere come usare `Object.create` o `Object.defineProperty`
- Vedi esempi qui sotto

1.  A partire da luglio 2015, ES6 è ora uno standard ufficialmente definitivo!
1.  Supporto Effettivamente al 100%\*! ... Ok, è necessario BabelJS per correggere il tuo codice in modo che sia compatibile con l'ES5. Storicamente i transpiler JS sono stati guardati con sospetto. Tuttavia, negli ultimi anni (2014-15) le cose sono cambiate poiché BabelJS è diventato un motore chiave per lo sviluppo linguistico. Tante aziende, tra cui Microsoft e Facebook, lo usano su alcuni dei siti più grandi del mondo.
1.  [Ultime versioni di Node](https://nodejs.org/en/blog/release/v4.0.0/) includono lo stesso motore V8 JS di Chrome v45, la versione 4.5

#### Esempi

> Ti mostrerò cosa mi ha finalmente fatto _iniziare_ a bere questa KoolAid al sapore di ES6.

Nella mia recente esperienza, ES6 ti permette di scrivere codice più velocemente. Fino al punto che, grazie alla sintassi più concisa, si richiede meno potenza cerebrale per scansionare e comprendere il tuo vecchio codice (o quello di un teammate).

Ho visto regolarmente risparmi di circa il 20-50% in termini di KLOC. Che è come essere snelliti alla moda alla Kate Moss!

**_IMMAGINE MANCANTE:_ EcmaScript 5 vs ES 2016 - Demo: Classes, Destructuring, Slick**  
{/* ](../images/screenshots/Diff-ES6-vs-ES5-Head-to-Head.png) */}

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  expired() {
    return this.users.filter(u => Date.now() > u.trialDate);
  }
}
```

- Nessun bisogno di codice noioso per 'estrarre' e 'verificare' i campi passati a una funzione. Vai dritto all'esempio `add()`:

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  add({ name, email, password }) {
    // Memorizza l'hash della password, definiamo esplicitamente solo 1 `var/let` - le altre variabili sono 'definite' con la magia dei `{campi}` sopra ^^^
    let hash = getSha256(password);
    return http
      .post("/users", {
        name: name,
        email: email,
        passwordHash: hash
      })
      .then(usr => this.users.push(usr)); // aggiungi l'utente alla risposta del servizio
  }
}
```

<Gist path='justsml/aaddc9852c1624d61cf3'></Gist>

Passare all'ES6 può sembrare passare da:

<div class="anigif top">
  <img alt='Boh?' title="Boh?" src="https://res.cloudinary.com/ddd/image/upload/v1441143891/wtf__tumblr_inline_n7ygqh6Y0C1svcdm1_igeqey.gif" />
</div>
<h3>A</h3>
<div class="anigif">
  <img alt='Che diavolo?!?!" title="Che diavolo?!?!" src="https://res.cloudinary.com/ddd/image/upload/v1443133148/cat-wtf-trap.gif" />
</div>
<h3>A</h3>
<div class="anigif end">
  <img alt='#vincente' title='#vincente' src="https://res.cloudinary.com/ddd/image/upload/v1443133141/full-throttle.gif" />
</div>

Continua a esaminare le nuove funzionalità. Esplora i modelli di stringa, il binding automatico di `this`, un'ereditarietà più sensata...

##### [Node.JS](http://nodejs.org/)

### Rust

##### [Sito Ufficiale](http://www.rust-lang.org/)

- **Pro**

- Immagina un linguaggio che sia veloce come C e potente come Python/C++, ma senza la complessità/sacche di insidie che trappolano persino gli sviluppatori più esperti.
  - Scommetto che Rust è circa altrettanto complesso dello spec ES6.
  - Include un sacco di funzionalità extra:
    1. Rust transpila da sintassi semi-dinamica in **codice C puro**!
    1. Includendo ***tutte le pratiche migliori*** in C che probabilmente sbaglieresti, io ~~eventualmente~~ sempre.
    - Automaticamente ottieni:
    - Gestione automatica della memoria (nessun bisogno di un garbage collector lento!)
    - Proprietà/lock degli oggetti perfettamente scoping (minimizzati mutexing & switching contesto)
    - Durata degli oggetti (implementati automaticamente\*, e codificati come se conoscessi ogni caso limite)
    - Previene quasi tutti gli errori di esecuzione (seriamente, i tuoi percorsi di codice diventano espliciti: non puoi mai trascurare un percorso)
  - Oh sì, include estendibilità linguistica reale con una funzionalità sensata di 'macro'.
    - Hai bisogno di Comprehensions? [Stile Scala? Fatto](https://gist.github.com/hanny24/5749688), e [Come Python? Fatto](https://gist.github.com/JeffBelgum/5e762761cd63c796e803).
    1. Troppo bello per essere vero? No, diventa migliore:
    - Gli indicatori di ultima generazione (github.com stats) rivelano che Rust è altamente competitivo o addirittura supera Go (il nuovo linguaggio caldo di Google)
      - Più di 4K stelle in più rispetto a Go (attualmente circa 12.200)
      - Più contributori totali (2x! - 1.071 vs. 479 di Go)
      - Più fork (3x! - 2.343 vs. 765)
      - Numero di Open Issues, perde di poco (2.000 vs 1.730 da Go)
      - Richieste di pull (Rust 70+ vs. 1 di Go)
    - Anche io ho dovuto controllare i numeri più volte.
  - Altre librerie sono molto stabili grazie alle costruzioni & regole di Rust.
  - Modello di threading utilizzabile da mortali comuni

- **Contro**
  - Buoni **framework web** sono relativamente nuovi, non testati e di solito non documentati (sebbene siano **migliorati** molto - fino a marzo 2015).
  - Molti cambiamenti pre-1.0 rompenti all'inizio

### Python

- **Pro**
  - Un'ampia selezione di algoritmi è già implementata in Python (vedi: scikit-learn, numpy, matplotlib, pil/pillow, ecc.)
  - Molto divertente da scrivere! Le comprehensions e la decomposizione sono ottime funzionalità che fanno sembrare gli altri linguaggi semplicemente appesantiti!
  - Array, 'Sequenze', Tuple, ecc. sono relativamente semplici

```python
## dummy code: defines a color + pixel-coord -
def pixel(x, y, r, g, b): return dict(x=x, y=y, r=r, g=g, b=b)
## Create a new pixel object and apply to set of vars
x, y, r, g, b = pixel(10, 20, 255, 255, 255)
## Now we can call pixel
```

- **Cons**
  - Annoyingly, Python 2.x and 3.x are incompatible. La Grande Scisma continua, anni dopo.
  - Alcune librerie essenziali non sono necessariamente comprese da alcuni sviluppatori (numpy)

### Haskell

- **Pros**
  - Molto soddisfacente quando finalmente memorizzi abbastanza sintassi per creare rapidamente modelli espressivi basati su comprensioni
  - Imparerai schemi di codice che ti faranno girare la testa - spesso applicabili anche ad altri linguaggi.
- **Cons**
  - La sintassi e i pattern possono essere difficili da abituarsi.

<div class="anigif end">
  <img alt='loop infinito' src="https://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif" />
</div>

### SmallTalk-80

- **Pros**
  - Compilatori incredibilmente semplici (originale in particolare)
  - Risorse ottime: [Smalltalk MVC Tradotto in JavaScript](http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript)
- **Cons**
  - Probabilmente non userai mai questo linguaggio per niente. Zero progetti. Tuttavia avrà un impatto maggiore sul tuo stile di programmazione, più velocemente di altri linguaggi funzionali... Questo dovrebbe essere nella lista dei vantaggi)

#### _Lavoro in corso (aggiornato Dicembre 2015)_
````
