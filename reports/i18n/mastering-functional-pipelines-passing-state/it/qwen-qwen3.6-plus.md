# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: it
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.09
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug mastering-functional-pipelines-passing-state --locale it --model qwen/qwen3.6-plus --chunk 6p --run-id 2026-05-13T19-05-13-381Z-80623 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Maestro delle pipeline: Trasferimento dello stato'
subTitle: 'Ciao Closure, mio vecchio amico.'
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
## Maestro delle Pipeline: Passaggio dello Stato

Ti è mai capitato di avere difficoltà a passare lo stato attraverso pipeline funzionali?

L'organizzazione (o la sua mancanza) del tuo codice influisce direttamente sulla facilità con cui lo stato viene passato.

In questo articolo esploreremo una tecnica efficace per passare lo stato attraverso una pipeline. Lungo il percorso miglioreremo l'organizzazione e la leggibilità del nostro codice.

Il seguente frammento "reale" sarà il nostro focus per questo articolo: una funzione di checkout, che accetta un `userId` e un array di `products`. Restituisce una catena di Promise che esegue 4 funzioni in sequenza.

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

Un attimo, questo codice è in realtà piuttosto decente, per quanto riguarda le pipeline in JS!

Soffre di alcuni problemi sottili che possono combinarsi in problemi più sostanziali.

Un problema è che stiamo passando ripetutamente `userId` a ogni funzione (logicamente correlata). Ora combina questo con un altro problema che è facilmente trascurato dagli sviluppatori e anche da TypeScript: invertire gli argomenti numerici crea facilmente un bug silenzioso. (Vedi `applyTaxes` e `purchaseProducts`. _Era `userId` o `amount` il primo parametro?_)

Prima di decidere come migliorare questo codice, identifichiamo alcuni pro e contro.

### Pro e Contro

#### Pro

- Buon uso di una closure! Passare `userId` e `products` una volta!
- Nomenclatura coerente degli argomenti.
- Composizione relativamente efficace e succinta di 4 funzioni chiave per il checkout.
- Controllo del flusso di errori “gratuito”. (Gli errori risalgono da qualsiasi funzione annidata, rifiutando la Promise restituita da `checkout()`.)

#### Contro

- Passare ripetutamente `userId` è noioso.
- Le funzioni non sono a parametro singolo (unarie). _Questo influisce sulla componibilità. Vedi [esempio finale](#checkout-with-further-improvements) per il perché?_
- Spesso non è ovvio cosa restituisca ogni funzione. (Il risultato dell'invio email, o quella variabile `result`? O altro?)
- Non è chiaro come aggiungere funzionalità (es. se dovessimo caricare sconti/crediti/punti cliente, ecc.)
- A volte i nomi di parametri “temporanei” (come in ogni `.then(param => {})`) aggiungono contesto. Tuttavia, col tempo, diventano probabilmente ricettacolo di cruft nei nomi.

### Soluzione, Parte 1: Crea un modulo!

Questa tecnica consiste nell'organizzare funzioni correlate in un unico modulo (es. `CartHelpers`). Non richiede un pattern specifico. Esplora [factory functions](#carthelpers-factory), [Classi](#carthelpers-class), Closure, Mixin, ecc. Trova ciò che ha senso per il tuo progetto e team.

#### CartHelpers Factory

Esempio di un modulo `CartHelpers`, dove `userId` viene passato una volta sola e tutti i metodi sono a singolo argomento.

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

Se le classi sono il tuo forte, è facile adattarle:

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
  - DRY: `CartHelpers` astrae l'argomento `userId` ripetuto.
  - Ogni metodo accetta **_solo_** gli argomenti necessari. Leggere `cart.applyTaxes(subTotal)` diventa del tutto prevedibile.
- Le funzioni a singolo argomento in `CartHelpers` sono più leggibili e con uno scopo più chiaro.

Raggruppando funzioni correlate, si crea l'opportunità di ridurre la superficie esposta (es. `checkout()`, metodi 'pubblici' di `CartHelpers`).

> Meno superficie === meno carico cognitivo, testabilità e manutenibilità migliori.
> _Progetta sistemi con intenzione e focus. ✨_

#### Utilizzo di Checkout e CartHelpers

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

> Si può migliorare ulteriormente? Sì! Non dobbiamo ripetere affatto gli argomenti!

Quando gli argomenti di una funzione sono forniti dall'output di funzioni precedenti, puoi semplificare ulteriormente il codice.

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 Le funzioni si impilano come Lego e si leggono come "Parole Umane!" 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**Se sembra innaturale combinare parametri in un singolo argomento (oggetto),** considera di suddividere le funzioni **OPPURE** combinarle in moduli con uno scopo più appropriato.

#### Da dove iniziare?

Trova funzioni correlate e raggruppale insieme. (es. `CartHelpers`.)

Parte della sfida nell'individuare possibili moduli logici è identificare il codice correlato già in partenza.

##### Cosa rende le funzioni correlate?

Un trucco efficace: trova ripetizioni nei parametri delle funzioni. Chiediti: c'è una relazione in gioco? O una responsabilità sottostante?

- ✅ Funzioni con argomenti ripetuti e comuni. (es. Se 4 metodi accettano `userRewards`, probabilmente hai bisogno di un modulo `Rewards` o altro.)
- ✅ Funzioni i cui argomenti sono forniti direttamente dall'output di funzioni precedenti. (Sequenze di passaggi. es. `Extract`, `Transform`, `Load`.)
- ❌ Qualsiasi cosa vagamente correlata all'area funzionale, "acquisto prodotto"?
- ❌ Funzioni con prefissi o suffissi comuni nei nomi?
- ❌ Funzioni che richiedono oggetti grandi come argomenti, nonostante utilizzino solo pochi valori all'interno di quegli oggetti. (es. `applyTaxes({ user, business, rewards, kitchenSink })` vs `applyTaxes({ subTotal })`)

Sebbene non esista un'unica “risposta giusta” per progettare moduli, è utile identificare 2-3 opzioni di organizzazione: tracciare uno schema, scrivere codice “fantasy”, chiedersi “suscita gioia?”

<aside>
📌 Spesso ci vogliono alcuni tentativi di organizzazione dei moduli prima che il tuo Modello di Dominio si stabilizzi. Non tormentarti per renderlo perfetto.
</aside>

> Potresti pensare che `cart.sendReceipt()` non appartenga ai metodi legati ai pagamenti. Forse `customerNotifications.sendReceipt()` è una collocazione migliore per la messaggistica ai clienti. Se `CartHelper` è abbastanza importante, potrebbe agire come un **_controller_** che chiama internamente tutti i **_servizi_** necessari, come `customerNotifications`.

#### Come capire se stai aiutando?

Se la leggibilità non ne risente mentre elimini argomenti ad-hoc, **CONGRATULAZIONI!!!** Probabilmente hai costruito un modulo con un ambito chiaro e durevole!

- Rimuovere argomenti intermedi ha il potere di far emergere 'strati'.
- Dovrebbe essere _difficile_ buttare codice ad-hoc nel posto sbagliato!

Allora, sorge spontanea la domanda: dove aggiungiamo funzionalità?

Per esperienza, ci sono 2 strategie principali da valutare quando si aggiunge funzionalità:

1.  Estendere/rifattorizzare il metodo esistente. (Quando il nuovo codice è sufficientemente vicino a quello esistente.)
2.  Creare una nuova (5ª) funzione nel punto desiderato della catena. (Supponendo che il nuovo codice non sia correlato alle funzioni esistenti.)

In definitiva, questo semplifica la decisione su dove collocare le nuove funzionalità. (Ad esempio, `cart.applyDiscounts()`, `cart.applyTaxes()`, `rewards.getBalance()`.)

### Conclusione

Passare lo stato attraverso una pipeline complessa può essere insidioso. Tuttavia, con un po' di pratica nel refactoring, ti ritroverai a scrivere codice più leggibile, con un carico cognitivo minore.

Domande? Commenti? Preoccupazioni? Sentiti libero di contattarmi su [@justsml](https://x.com/justsml) o via [email](mailto:dan@danlevy.net).

#### Resta sintonizzato per la prossima parte della serie

Esploreremo l'esternalizzazione dello stato e l'estensione delle funzionalità nel nostro modulo!

#### Letture correlate

- [Lotte simili esistono nel mondo dei componenti React.](https://kyleshevlin.com/quit-your-yapping)
````
