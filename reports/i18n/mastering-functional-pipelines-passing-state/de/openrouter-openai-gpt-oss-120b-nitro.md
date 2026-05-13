# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/de/index.mdx
- Validation: passed
- Runtime seconds: 5.73
- Input tokens: 9492
- Output tokens: 2551
- Thinking tokens: unknown
- Cached input tokens: 5120
- Cache write tokens: 0
- Estimated cost: $0.000829
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Meister der Pipelines: Zustandsübergabe'
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
## Master of Pipelines: Passing State

Sind Sie schon auf Probleme gestoßen, wenn Sie Zustand über funktionale Pipelines weitergeben?

Die Struktur (oder das Fehlen einer Struktur) Ihres Codes beeinflusst unmittelbar, wie leicht sich Zustand weiterleiten lässt.

In diesem Artikel untersuchen wir eine effektive Methode, Zustand durch eine Pipeline zu transportieren. Dabei verbessern wir gleichzeitig die Organisation und Lesbarkeit unseres Codes.

Das folgende „echte“ Beispiel steht im Mittelpunkt: Eine Checkout‑Funktion, die eine `userId` und ein Array von `products` entgegennimmt. Sie liefert eine Promise‑Kette zurück, die vier Funktionen nacheinander ausführt.

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

Moment, dieser Code ist eigentlich ziemlich solide – zumindest was Pipelines in JS angeht!

Es gibt ein paar subtile Probleme, die sich zu wesentlicheren Schwierigkeiten summieren können.

Ein Problem ist, dass wir `userId` immer wieder an jede (logisch zusammengehörige) Funktion weiterreichen. Kombiniert man das mit einem weiteren leicht zu übersehenden Fehler – sowohl für Entwickler als auch für TypeScript – entsteht ein stilles Bug, wenn die numerischen Argumente vertauscht werden. (Siehe `applyTaxes` und `purchaseProducts`. _War zuerst `userId` oder `amount`?_)

Bevor wir entscheiden, wie wir diesen Code verbessern, sollten wir die Vor‑ und Nachteile abwägen.

### Vor‑ und Nachteile

#### Vorteile

- Gute Nutzung einer Closure! `userId` & `products` werden nur einmal übergeben!
- Konsistente Benennung der Argumente.
- Relativ effektive und kompakte Zusammensetzung von vier Schlüssel‑Funktionen für den Checkout.
- „Kostenlose“ Fehlerfluss‑Steuerung. (Fehler steigen aus beliebigen verschachtelten Funktionen auf und führen zum Reject des von `checkout()` zurückgegebenen Promise.)

#### Nachteile- Das wiederholte Weiterreichen von `userId` ist mühsam.
- Funktionen sind nicht einstellig (also nicht unary). _Das beeinträchtigt die Komposierbarkeit. Siehe das [letzte Beispiel](#checkout-with-further-improvements) für den Grund._
- Es kann unklar sein, was jede Funktion zurückgibt. (Ist es das Ergebnis des E‑Mail‑Versands, oder die Variable `result`? Oder etwas anderes?)
- Nicht ersichtlich, wie man Funktionalität hinzufügt (z. B. wenn wir Kundendiscount/Guthaben/Punkte/etc. laden müssten).
- Manchmal geben „temporäre“ Parameter‑Namen (wie in jedem `.then(param => {})`) Kontext. Bei längerem Gebrauch werden sie jedoch häufig zu Naming‑Müll.

### Lösung, Teil 1: Ein Modul erstellen!

Diese Technik besteht darin, zusammengehörige Funktionen in ein einzelnes Modul zu packen (z. B. `CartHelpers`). Sie verlangt kein festes Muster. Untersuchen Sie [Factory‑Funktionen](#carthelpers-factory), [Klassen](#carthelpers-class), Closures, Mixins usw. und wählen Sie, was für Ihr Projekt und Ihr Team sinnvoll ist.

#### CartHelpers Factory

Beispiel für ein `CartHelpers`‑Modul, bei dem `userId` einmal übergeben wird und alle Methoden einstellig sind.

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

#### CartHelpers Klasse

Wenn Klassen Ihr Ding sind, lässt sich das leicht anpassen:

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

Einige sofortige Vorteile:

- Wiederholtes Weitergeben von Variablen eliminieren.
  - DRY: `CartHelpers` kapselt das wiederholte Argument `userId` ab.
  - Jede Methode akzeptiert **_nur_** die wirklich benötigten Parameter. Dadurch wird `cart.applyTaxes(subTotal)` völlig vorhersehbar.
- Einstellige Funktionen in `CartHelpers` sind lesbarer und haben einen klareren Zweck.

Durch das Gruppieren verwandter Funktionen schaffen wir die Möglichkeit, die nach außen sichtbare Oberfläche zu reduzieren (z. B. `checkout()`, öffentliche Methoden von `CartHelpers`).

> Weniger Oberfläche === weniger kognitive Belastung, bessere Tests & Wartbarkeit.  
> _Design‑Systeme mit Absicht und Fokus. ✨_

#### Checkout & CartHelpers Nutzung

Schauen wir uns an, wie die `checkout()`‑Funktion jetzt aussieht:

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

> Kann man das noch weiter verbessern? Ja! Wir müssen die Argumente gar nicht mehr wiederholen!

Wenn die Argumente einer Funktion aus dem Ergebnis vorheriger Funktionen stammen, lässt sich der Code noch weiter vereinfachen.

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 Funktionen stapeln sich wie Lego & lesen sich wie normale "Menschliche Worte!" 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**Falls es sich ungewohnt anfühlt, Parameter zu einem einzigen (Objekt‑)Argument zu kombinieren,** überlegen Sie, Ihre Funktionen **ENTWEDER** zu zerlegen **ODER** sie in sinnvoller abgegrenzte Module zu packen.

#### Woanfangen?

Suchen Sie verwandte Funktionen und bündeln Sie sie. (z. B. `CartHelpers`.)

Ein Teil der Herausforderung beim Erkennen möglicher logischer Module besteht darin, zunächst den zusammengehörigen Code zu identifizieren.

##### Was macht Funktionen zu „verwandt“?

Ein einfacher Trick: Wiederholungen in Funktionsparametern finden. Gibt es eine Beziehung? Oder eine zugrunde liegende Verantwortung?

- ✅ Funktionen mit wiederholten, gemeinsamen Argumenten. (z. B. Wenn 4 Methoden `userRewards` akzeptieren, benötigen Sie wahrscheinlich ein `Rewards`‑ oder ein anderes Modul.)
- ✅ Funktionen, deren Argumente direkt aus dem Ergebnis vorheriger Funktionen stammen. (Sequenzen von Schritten, z. B. `Extract`, `Transform`, `Load`.)
- ❌ Alles, was vage zum Funktionsbereich passt, „Produktkauf?“
- ❌ Funktionen, die einen gemeinsamen Präfix‑ oder Suffix‑Namen besitzen?
- ❌ Funktionen, die große Objekte als Argumente benötigen, obwohl nur wenige Werte daraus verwendet werden. (z. B. `applyTaxes({ user, business, rewards, kitchenSink })` vs `applyTaxes({ subTotal })`)

Während es keine einzige „richtige“ Antwort für das Design von Modulen gibt, hilft es, 2‑3 Organisations‑Optionen zu identifizieren – eine Skizze zu zeichnen, „Fantasy“-Code zu schreiben, zu fragen: „Bringt das Freude?“

<aside>
📌 Es braucht meist ein paar Anläufe, bis die Modul‑Organisation Ihr Domain‑Modell klar herauskristallisiert. Nicht verzweifeln, wenn es nicht sofort perfekt ist.
</aside>

> Vielleicht haben Sie das Gefühl, dass `cart.sendReceipt()` nicht zu den zahlungsbezogenen Methoden passt. Vielleicht ist `customerNotifications.sendReceipt()` ein besserer Platz für Kunden‑Nachrichten. Wenn `CartHelper` hoch genug an Bedeutung ist, kann er intern als **_Controller_** fungieren und alle notwendigen **_Services_** aufrufen, etwa `customerNotifications`.

#### Wie erkennen Sie, ob Sie auf dem richtigen Weg sind?

Wenn die Lesbarkeit nicht leidet, während Sie ad‑hoc‑Argumente entfernen, **GLÜCKWUNSCH!!!** Sie haben wahrscheinlich ein Modul mit einem klaren und beständigen Umfang gebaut!

- Das Entfernen von Zwischenschritten zwingt oft „Schichten“ zum Vorschein.
- Es _sollte_ schwerfallen, ad‑hoc‑Code an die falsche Stelle zu werfen!

Also stellt sich die Frage, wo wir neue Funktionalität einbauen.

Aus meiner Erfahrung gibt es zwei Hauptstrategien, die man beim Hinzufügen von Funktionalität abwägen sollte:

1. Bestehende Methode erweitern/umstrukturieren. (Wenn der neue Code eng genug am bestehenden Code liegt.)  
2. Eine neue (fünfte) Funktion an der gewünschten Stelle in der Kette erstellen. (Wenn der neue Code von den vorhandenen Funktionen unabhängig ist.)

Damit lässt sich leichter bestimmen, wo die neue Funktionalität hingehört (z. B. `cart.applyDiscounts()`, `cart.applyTaxes()`, `rewards.getBalance()`).

### Fazit

Den Zustand durch eine komplexe Pipeline zu schleusen, ist fehleranfällig. Mit ein wenig Refactoring‑Übung jedoch schreibt man lesbareren Code und reduziert die kognitive Belastung.

Fragen? Kommentare? Bedenken? Melden Sie sich gern bei [@justsml](https://x.com/justsml) oder per [E‑Mail](mailto:dan@danlevy.net).

#### Bleiben Sie dran für den nächsten Teil der Serie

Wir werden das Auslagern von Zustand untersuchen und die Funktionalität in unserem Modul erweitern!

#### Weiterführende Lektüre

- [Ähnliche Probleme gibt es in der komponenten‑getriebenen React‑Welt.](https://kyleshevlin.com/quit-your-yapping)
````
