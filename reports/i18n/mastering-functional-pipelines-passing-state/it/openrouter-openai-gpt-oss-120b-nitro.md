# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/it/index.mdx
- Validation: deferred
- Runtime seconds: 7.83
- Input tokens: 9501
- Output tokens: 2684
- Thinking tokens: unknown
- Cached input tokens: 4352
- Cache write tokens: 0
- Estimated cost: $0.000854
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Maestro dei pipeline: passare lostato'
subTitle: 'Ciao Closure, vecchio amico.'
date: '2023-08-09'
modified: '2024-07-30'
tags:
  - typescript
  - closure
  - stateful
  - scoping
  - hoisting
  - functional
  - pipeline
category: Guides
subCategory: JavaScript
cover: ../sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_mobile: ../w300_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_icon: ../icon_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
---
## Master of Pipelines: Passing State

Hai incontrato difficoltà nel passare lo stato usando le Functional Pipelines?

L'organizzazione (o la sua assenza) del tuo codice influisce direttamente sulla facilità con cui lo stato viene propagato.

In questo articolo esploreremo una tecnica efficace per trasmettere lo stato attraverso una pipeline. Lungo il percorso miglioreremo l'organizzazione e la leggibilità del nostro codice.

Il seguente snippet “reale” sarà il nostro caso di studio: una funzione di checkout, che accetta un `userId` e un array di `products`. Restituisce una catena di Promise che esegue 4 funzioni in sequenza.

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

Aspetta un attimo, questo codice è in realtà abbastanza decente, per quanto riguarda le pipeline in JS!

Presenta alcuni problemi sottili che, combinati, possono trasformarsi in difficoltà più consistenti.

Un problema è che continuiamo a passare `userId` a ciascuna funzione (logicamente correlata).  
A questo si aggiunge un altro inconveniente, facilmente trascurato sia dagli sviluppatori sia da TypeScript: invertire gli argomenti numerici può generare un bug silenzioso. (Vedi `applyTaxes` e `purchaseProducts`. _Era `userId` o `amount` il primo parametro?_)

Prima di decidere come migliorare questo codice, identifichiamo alcuni pro e contro.

### Pro e Contro

#### Pro

- Buon uso di una chiusura! `userId` e `products` vengono passati una sola volta!
- Nomenclatura degli argomenti coerente.
- Composizione relativamente efficace e concisa di 4 funzioni chiave per il checkout.
- Controllo degli errori “gratuito”. (Gli errori risalgono da qualsiasi funzione annidata, rifiutando la Promise restituita da `checkout()`.)

#### Contro

- Passare ripetutamente `userId` è tedioso.
- Le funzioni non sono a singolo parametro (cioè unary). _Questo influisce sulla composabilità. Vedi [esempio finale](#checkout-with-further-improvements) per capire il perché._
- Può non essere chiaro cosa restituisca ogni funzione. (È il risultato dell’invio dell’email, o la variabile `result`? O altro?)
- Non è immediato capire come aggiungere funzionalità (ad es. se servisse caricare sconto/credito/punti del cliente, ecc.).
- Talvolta i nomi dei parametri “temporanei” (come in ogni `.then(param => {})`) forniscono contesto. Tuttavia, col tempo tendono a trasformarsi in confusione di denominazioni.

### Soluzione, Parte 1: Creare un modulo!

Questa tecnica consiste nell’organizzare le funzioni correlate in un unico modulo (ad es. `CartHelpers`). Non impone un pattern specifico. Esplora le [funzioni factory](#carthelpers-factory), le [Classi](#carthelpers-class), le chiusure, i mixin, ecc. Trova ciò che ha senso per il tuo progetto e il tuo team.

#### CartHelpers Factory

Esempio di un modulo `CartHelpers`, in cui `userId` viene passato una sola volta e tutti i metodi accettano un unico argomento.

```tsx
const CartHelpers = (userId: number) => {
  return {
    getProductsSubtotal: products => getProductsSubtotal(userId, products),
    applyTaxes: subTotal => applyTaxes(userId, subTotal),
    purchaseProducts: total => purchaseProducts(userId, total),
    sendReceipt: invoice => sendReceipt(userId, invoice)
  };
};
```

#### Classe CartHelpers

Se le classi sono il tuo stile, è facile adattarle:

```tsx
class CartHelpers {
  constructor(userId) {
    this.userId = userId;
  }
  getProductsSubtotal = products => getProductsSubtotal(this.userId, products);
  applyTaxes = subTotal => applyTaxes(this.userId, subTotal);
  purchaseProducts = total => purchaseProducts(this.userId, total);
  sendReceipt = invoice => sendReceipt(this.userId, invoice);
}
```

Alcuni vantaggi immediati:

- Elimina il passaggio ripetitivo di variabili.
  - DRY: `CartHelpers` astrae l’argomento ripetuto `userId`.
  - Ogni metodo accetta **_solo_** gli argomenti necessari. Rendere `cart.applyTaxes(subTotal)` completamente prevedibile da leggere.
- Le funzioni a singolo argomento in `CartHelpers` sono più leggibili, con uno scopo più chiaro.

Raggruppando le funzioni correlate, creiamo l’opportunità di ridurre la superficie esposta (ad es. `checkout()`, metodi “pubblici” di `CartHelpers`).

> Meno superficie === minore carico cognitivo, test più semplici e migliore manutenibilità.  
> _Progetta sistemi con intenzione e focus. ✨_

#### Checkout & CartHelpers Usage

Vediamo come appare ora la funzione `checkout()`:

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  return Promise.resolve(products)
    .then(products => cart.getProductsSubtotal(products))
    .then(subTotal => cart.applyTaxes(subTotal))
    .then(total => cart.purchaseProducts(total))
    .then(result => cart.sendReceipt(result));
};
```

##### Checkout con ulteriori miglioramenti

> Può essere migliorato ulteriormente? Sì! Non dobbiamo ripetere gli argomenti affatto!

Quando gli argomenti di una funzione sono forniti dall'output delle funzioni precedenti, è possibile semplificare il codice ancora di più.

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 Functions stack like Lego & read like normal "Human Words!" 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**Se ti sembra innaturale combinare i parametri in un unico argomento (oggetto),** considera di suddividere le tue funzioni **O** di raggrupparle in moduli con un ambito più appropriato.

#### Da dove cominciare?

Individua le funzioni correlate e raggruppale insieme (ad es. `CartHelpers`).

Una parte della difficoltà nel trovare possibili moduli logici è identificare il codice correlato in primo luogo.

##### Cosa rende le funzioni correlate?

Un trucco utile: cerca ripetizioni nei parametri delle funzioni. C’è una relazione in gioco? O una responsabilità sottostante?

- ✅ Funzioni con argomenti ripetuti e comuni. (ad es. se 4 metodi accettano `userRewards`, è probabile che ti serva un modulo `Rewards` o simile.)
- ✅ Funzioni i cui argomenti sono forniti direttamente dall’output di funzioni precedenti. (Sequenze di passaggi, ad es. `Extract`, `Transform`, `Load`.)
- ❌ Qualsiasi cosa vagamente collegata all’area della funzionalità, “acquisto prodotto?”
- ❌ Funzioni con prefisso o suffisso di nome comune?
- ❌ Funzioni che richiedono oggetti di grandi dimensioni come argomenti, nonostante ne usino solo pochi valori al loro interno. (ad es. `applyTaxes({ user, business, rewards, kitchenSink })` vs `applyTaxes({ subTotal })`)

Mentrenon esiste una “risposta unica” per la progettazione dei moduli, è utile individuare 2‑3 opzioni di organizzazione — tracciare uno schema, scrivere codice “fantasy”, chiedersi “fa gioia?”

<aside>
📌 Spesso ci vogliono diversi tentativi di organizzazione dei moduli prima che il tuo Domain Model si definisca. Non agonizzare per renderlo perfetto.
</aside>

> Potresti sentire che `cart.sendReceipt()` non appartiene ai metodi legati al pagamento. Forse `customerNotifications.sendReceipt()` è una destinazione migliore per i messaggi al cliente. Se `CartHelper` è sufficientemente importante, può fungere da **_controller_** interno chiamando tutti i **_services_** necessari, come `customerNotifications`.

#### Come capire se stai facendo la cosa giusta?

Se la leggibilità non ne risente mentre elimini argomenti ad‑hoc, **CONGRATULAZIONI!!!** Hai probabilmente costruito un modulo con un ambito chiaro e durevole!

- Rimuovere gli argomenti intermedi tende a far emergere “strati” naturali.
- Dovrebbe essere difficile scaricare codice ad‑hoc nel posto sbagliato!

Quindi, la domanda è: dove aggiungiamo la funzionalità?

Nella mia esperienza ci sono 2 strategie principali da valutare quando si aggiunge funzionalità:

1.  Estendere/rifattorizzare il metodo esistente. (Quando il nuovo codice è sufficientemente vicino a quello esistente.)
2.  Creare una nuova (quinta) funzione nel punto desiderato della catena. (Assumendo che il nuovo codice non sia correlato alle funzioni esistenti.)

In definitiva, questo rende più semplice decidere a quale livello appartiene la nuova funzionalità. (ad es. `cart.applyDiscounts()`, `cart.applyTaxes()`, `rewards.getBalance()`.)

### Conclusione

Passare lo stato attraverso una pipeline complessa può essere insidioso. Tuttavia, con un po' di pratica nella rifattorizzazione, ti troverai a scrivere codice più leggibile, con un carico cognitivo ridotto.

Domande? Commenti? Dubbi? Sentiti libero di contattare [@justsml](https://x.com/justsml) o via [email](mailto:dan@danlevy.net).

#### Resta in attesa della prossima parte della serie

Esamineremo l’esternalizzazione dello stato e l’estensione delle funzionalità nel nostro modulo!

#### Letture correlate

- [Problemi simili esistono nel mondo React basato sui componenti.](https://kyleshevlin.com/quit-your-yapping)
````
