# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/de/index.mdx
- Validation: passed
- Runtime seconds: 24.98
- Input tokens: 8828
- Output tokens: 9173
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002908
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: 'Hallo Closure, mein alter Freund.'
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
## Meister der Pipelines: Zustand übergeben

Haben Sie Herausforderungen beim Übergeben von Zustand mittels Funktionalen Pipelines erlebt?

Die Organisation (oder das Fehlen derselben) Ihres Codes beeinflusst direkt, wie einfach der Zustand übergeben wird.

In diesem Artikel werden wir eine effektive Technik zum Übergeben von Zustand durch eine Pipeline untersuchen. Dabei verbessern wir gleichzeitig die Organisation und Lesbarkeit unseres Codes.

Der folgende „echte“ Codeausschnitt steht im Fokus dieses Artikels: Eine Checkout-Funktion, die einen `userId` und ein Array von `products` akzeptiert. Sie gibt eine Promise-Kette zurück, die vier Funktionen nacheinander ausführt.

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

Warten Sie, dieser Code ist eigentlich ziemlich gut, soweit Pipelines in JS angehen!

Es leidet unter ein paar subtilen Problemen, die sich zu erheblichen Problemen entwickeln können.

Ein Problem ist, dass wir `userId` wiederholt an jede (logisch zusammenhängende) Funktion weitergeben.  
Kombinieren Sie das mit einem weiteren Problem, das Entwicklern und auch TypeScript leicht entgeht: Das Vertauschen der numerischen Argumente erzeugt leicht einen stillen Fehler. (Sehen Sie sich `applyTaxes` und `purchaseProducts` an. _War es `userId` oder `amount`, der zuerst kommt?_)

Bevor wir entscheiden, wie wir diesen Code verbessern können, identifizieren wir einige Vor- und Nachteile.

### Vor- und Nachteile

#### Vorteile

- Gute Nutzung eines Closures! `userId` und `products` werden nur einmal übergeben!  
- Konsistente Argumentnamen.  
- Relativ effektive und prägnante Zusammensetzung von 4 Schlüsselfunktionen für die Abrechnung.  
- „Kostenloser“ Fehlerfluss. (Fehler blubbern von jeder geschachtelten Funktion nach oben, was den Promise ablehnt, der von `checkout()` zurückgegeben wird.)

#### Nachteile

- Wiederholtes Übergeben von `userId` ist zeitaufwendig.  
- Funktionen sind nicht einstellig (auch bekannt als unär). _Dies beeinträchtigt die Zusammensetzbarkeit. Siehe [Abschließendes Beispiel](#checkout-with-further-improvements), um zu verstehen warum?_  
- Nicht offensichtlich, was jede Funktion zurückgibt. (Ist es das Ergebnis der E-Mail-Versendung, oder jene `result`-Variable? Oder?)  
- Nicht eindeutig, wie Funktionalität hinzugefügt werden kann (z. B. Angenommen, wir benötigten die Laden von Kundenrabatt/Kredit/Punkten usw.).  
- Manchmal „temporäre“ Parameternamen (wie in jedem `.then(param => {})`) fügen Kontext hinzu. Allerdings neigen sie im Laufe der Zeit dazu, zu Namensmüll zu werden.

### Lösung, Teil 1: Ein Modul erstellen!

Dieses Verfahren beinhaltet das Zusammenfassen verwandter Funktionen in ein einziges Modul (z. B. `CartHelpers`). Es verlangt kein spezifisches Muster. Untersuchen Sie [Factory-Funktionen](#carthelpers-factory), [Klassen](#carthelpers-class), Closures, Mixins usw. Finden Sie heraus, was für Ihr Projekt und Ihr Team Sinn macht.

#### CartHelpers Factory

Beispiel eines `CartHelpers`-Moduls, in dem `userId` nur einmal übergeben wird und alle Methoden ein einziges Argument erfordern.

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

#### CartHelpers-Klasse

Wenn Klassen Ihr Ding sind, ist es einfach, sie anzupassen:

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

Einige unmittelbare Vorteile:

- Wiederholte Variable übergeben zu müssen, wird eliminiert.
  - DRY: `CartHelpers` beseitigt das wiederholte Argument `userId`.
  - Jede Methode akzeptiert **_nur_** die erforderlichen Argumente. Dadurch ist `cart.applyTaxes(subTotal)` vollkommen logisch zu lesen.
- Einzelargument-Funktionen in `CartHelpers` sind lesbarer und haben einen klaren Zweck.

Durch das Zusammenfassen verwandter Funktionen schaffen wir die Möglichkeit, die exponierte Oberfläche zu reduzieren (z. B. `checkout()`, öffentliche Methoden von `CartHelpers`.)

> Weniger Oberfläche === weniger kognitive Belastung, bessere Testbarkeit & Wartbarkeit.
> _Entwerfen Sie Systeme mit Absicht und Fokus. ✨_

#### Checkout und CartHelpers-Nutzung

Schauen wir uns an, wie die `checkout()`-Funktion jetzt aussieht:

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

##### Checkout mit weiteren Verbesserungen

> Kann es noch weiter verbessert werden? Ja! Wir müssen Argumente gar nicht wiederholen!

Wenn die Argumente einer Funktion vom Ausgang vorheriger Funktionen bereitgestellt werden, kann der Code noch einfacher gestaltet werden.

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 Funktionen stapeln sich wie Lego-Steine & lesen sich wie normale "Menschenwörter!" 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**Wenn es ungewöhnlich anmutet, Parameter in einzelne (Objekt-)Argumente zu kombinieren,** überlegen Sie, Ihre Funktionen zu trennen **ODER** sie in besser abgegrenzte Module zu gruppieren.

#### Wo fange ich an?

Finden Sie verwandte Funktionen und gruppieren Sie sie zusammen. (z. B. `CartHelpers`.)

Ein Teil der Herausforderung beim Finden möglicher logischer Module besteht darin, verwandten Code überhaupt zu identifizieren.

##### Was macht Funktionen verwandt?

Ein netter Trick: Finden Sie Wiederholungen in Funktionsparametern. Stellen Sie sich die Frage, ob ein Zusammenhang besteht? Oder eine zugrunde liegende Verantwortung?

- ✅ Funktionen mit wiederholt vorkommenden, gemeinsamen Argumenten. (z. B. Wenn 4 Methoden `userRewards` akzeptieren, besteht wahrscheinlich Bedarf an einem `Rewards`- oder anderen Modul.)
- ✅ Funktionen, deren Argumente direkt vom Output vorheriger Funktionen bereitgestellt werden. (Schritte in einer Abfolge. z. B. `Extrahieren`, `Transformieren`, `Laden`.)
- ❌ Etwas Vag Gesprochenes zum Funktionsbereich, „Produktkauf?“
- ❌ Funktionen mit gemeinsamen Präfixen oder Suffixen in der Benennung?
- ❌ Funktionen, die große Objekte als Argumente erfordern, obwohl nur wenige Werte aus diesen Objekten verwendet werden. (z. B. `applyTaxes({ user, business, rewards, kitchenSink })` vs. `applyTaxes({ subTotal })`)

Es gibt keine einzige „richtige“ Antwort auf das Entwerfen von Modulen, doch es hilft, 2-3 Optionen für die Organisation zu identifizieren – zeichnen Sie einen Entwurf, schreiben Sie „Fantasie-Code“, fragen Sie: „Bringt es Freude?“  

<aside>  
📌 Häufig braucht es mehrere Versuche, bis sich Ihr **Domänenmodell** klar herausbildet. Verzweifeln Sie nicht, perfekt zu sein.  
</aside>  

> Sie könnten sich fragen, ob `cart.sendReceipt()` zu den zahlungsbezogenen Methoden gehört. Vielleicht ist `customerNotifications.sendReceipt()` eine bessere Zuordnung für Kundenmitteilungen. Falls `CartHelper` ausreichend wichtig ist, kann er als **_Controller_** agieren, der interne **_Services_** aufruft, z. B. `customerNotifications`.  

#### Wie erkennen Sie, dass Sie helfen?  

Wenn sich die Lesbarkeit nicht verschlechtert, während Sie ad-hoc-Argumente eliminieren, **HERZLICHEN GLÜCKWUNSCH!!!** Sie haben wahrscheinlich ein Modul mit klarer, haltbarer Umfangsgrenze erstellt!  

- Das Entfernen von Zwischenargumenten zwingt oft dazu, „Schichten“ zu erkennen.  
- Es _sollte_ schwierig sein, ad-hoc-Code an der falschen Stelle hinzuzufügen!

Also stellt sich die Frage: Wo fügen wir Funktionalität hinzu?  

In meiner Erfahrung gibt es zwei primäre Strategien, die man beurteilen sollte, wenn man Funktionalität hinzufügt:  

1. Bestehende Methode erweitern/umbauen. (Wenn neuer Code nahe genug an bestehendem Code ist.)  
2. Eine neue (5.) Funktion am gewünschten Ort in der Kette erstellen. (Unter der Annahme, dass neuer Code nicht mit bestehenden Funktionen zusammenhängt.)  

Letztendlich macht dies es einfacher zu entscheiden, wo neue Funktionalität hingehört. (z. B. `cart.applyDiscounts()`, `cart.applyTaxes()`, `rewards.getBalance()`.)  

### Fazit  

Das Weitergeben von Zustand durch eine komplexe Pipeline kann knifflig sein. Mit etwas Refaktorisierungs-Übung werden Sie sich selbst dabei ertappen, wie Sie lesbaren Code mit geringerer kognitiver Belastung schreiben.

Fragen? Kommentare? Bedenken? Fühlen Sie sich frei, sich [@justsml](https://x.com/justsml) oder [E-Mail](mailto:dan@danlevy.net) zu wenden.  

#### Bleiben Sie auf dem Laufenden – der nächste Teil der Serie folgt  

Wir werden die Externalisierung von Zustand und die Erweiterung der Funktionalität in unserem Modul untersuchen!  

#### Weitere Lektüre  

- [Ähnliche Herausforderungen gibt es in der Component-driven React Welt.](https://kyleshevlin.com/quit-your-yapping)
````
