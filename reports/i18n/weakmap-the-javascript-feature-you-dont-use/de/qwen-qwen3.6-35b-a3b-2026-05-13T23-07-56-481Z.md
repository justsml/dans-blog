# Translation Candidate
- Slug: weakmap-the-javascript-feature-you-dont-use
- Locale: de
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2025-12-29--weakmap-the-javascript-feature-you-dont-use/de/index.mdx
- Validation: deferred
- Runtime seconds: 71.68
- Input tokens: 4186
- Output tokens: 15439
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.016067
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Speicherlecks mit WeakMap vermeiden
subTitle: Schwachen Code mit schwachen Referenzen beheben!
date: '2025-12-29'
modified: '2026-01-12'
tags:
  - javascript
  - memory
  - garbage-collection
  - performance
  - patterns
category: Code
subCategory: Best Practices
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Sie kennen das Gefühl, wenn man eine Codezeile ändert und sieht, wie der Speicherverbrauch um 50 % einbricht? Ich hatte diesen Moment, als ich im Performance Monitor von Chrome DevTools zusah, wie eine Dashboard-App von stündlich verbluteten 100 MB auf einen stabilen Lauf den ganzen Nachmittag umstellte.

Die Änderung auf eine Zeile: `new Map()` wurde zu `new WeakMap()`.

Mehr nicht. Gleiche API-Oberfläche, gleiches Nutzungsmuster, völlig anderes Verhalten unter der Haube. Doch um zu verstehen, warum das funktioniert, muss man begreifen, worüber sich die meisten JavaScript-Entwickler nie Gedanken machen: Was passiert, wenn niemand mehr auf Ihre Daten schaut?

## Wenn Referenzen zu Anker werden

Eine reguläre Map in JavaScript behandelt ihre Schlüssel wie kostbare Fracht. Sobald Sie etwas hineingesteckt haben, hält die Map mit eiserner Faust daran fest. Der Garbage Collector sieht diese Beziehung und denkt: „Offenbar brauchen sie dieses Objekt noch, besser nicht anfassen.“

Dieser Schutzinstinkt wird zum Problem, wenn Sie Metadaten zu temporären Objekten speichern. DOM-Knoten, die entfernt werden. Benutzersitzungen, die ablaufen. Komponenteninstanzen, die unmounten. Die Map weiß nicht, dass diese Objekte ihren Dienst getan haben. Sie weiß nur, dass sie eine Referenz hält, und hält sie daher am Leben.

```javascript
const cache = new Map();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// The element is gone from the DOM, but cache is keeping it in memory
```

Der Garbage Collector kann `element` nicht bereinigen, weil `cache` noch darauf verweist. Das nennt man eine „starke Referenz“. In langlaufenden Single-Page-Apps wird daraus ein Leak, der den Browser am Ende zum Absturz bringt.

## WeakMap ändert die Regeln

Eine WeakMap funktioniert anders. Sie behandelt ihre Schlüssel als temporäre Bürger statt als Dauergäste. Wenn Sie etwas in einer WeakMap speichern, sagen Sie im Grunde: „Ich möchte diese Daten mit diesem Objekt verknüpfen, aber ich will nicht der Grund dafür sein, dass es am Leben bleibt.“

Wenn die einzige Referenz, die ein Objekt im Speicher hält, eine WeakMap ist, darf der Garbage Collector es freigeben. Verschwindet das Objekt, verschwindet der WeakMap-Eintrag mit ihm. Kein manuelles Aufräumen nötig.

```javascript
const cache = new WeakMap();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// The element gets Garbage Collected
// The cache entry vanishes automatically
```

Ich habe einen Benchmark durchgeführt, bei dem 100.000 DOM-Knoten erzeugt, deren Metadaten gespeichert und anschließend alle entfernt wurden. Mit einer `Map` hielt der Browser 150–200 MB im Speicher. Mit einer `WeakMap` sank der Verbrauch auf 70–80 MB. Derselbe Code, gleiche Funktionalität, halbierter Speicherbedarf.

## Was Sie aufgeben

WeakMap bringt Einschränkungen mit, die sich zunächst wie Limitierungen anfühlen, bis man erkennt, dass genau diese der Grund für die Funktionsweise sind.

**Sie können eine WeakMap nicht durchlaufen.** Kein `forEach`, kein `keys()`, kein `values()`. Das ergibt Sinn, wenn man darüber nachdenkt: Der Garbage Collector könnte einen Eintrag mitten in Ihrer Schleife löschen. Wollen Sie sich wirklich damit herumschlagen?

Sie können die Größe nicht abfragen. Keine `.size`-Eigenschaft, kein `.length`. Auch hier ist es ein bewegliches Ziel. Der Wert könnte sich zwischen Ihrer Abfrage und der Antwort bereits geändert haben.

**Keys müssen Objekte sein.** Keine Strings, keine Zahlen, keine Primitives. Das ist grundlegend für die Funktionsweise schwacher Referenzen: Primitive Werte besitzen keine Identität, die sich unabhängig von ihrem Wert verfolgen ließe.

Das sind keine Bugs. Das ist das Design. WeakMap wurde für eine einzige Aufgabe entwickelt: Metadaten an Objekte anzuhängen, ohne diese vom Aufräumen abzuhalten. Wenn Sie Iteration, primitive Keys oder eine Eintragsanzahl benötigen, lösen Sie wahrscheinlich ein anderes Problem und sollten eine reguläre Map verwenden.

## Wo das tatsächlich hilft

Das „Private Data“-Muster war der ursprüngliche Anwendungsfall von WeakMap, lange bevor JavaScript `#private`-Felder kannte. Bibliotheken legten eine WeakMap außerhalb der Klasse an und nutzten sie, um Daten zu speichern, die nicht auf der Instanz zugänglich sein sollten.

```javascript
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, { name });
  }

  getName() {
    return privateData.get(this).name;
  }
}
```

Wird eine User-Instanz vom Garbage Collector erfasst, verschwinden die privaten Daten mit ihr. Kein Aufräumcode nötig.

Memoization ist ein weiterer natürlicher Anwendungsfall, insbesondere beim Zwischenspeichern von Ergebnissen basierend auf Objekt-Inputs statt primitiven Werten. Wenn eine rechenintensive Berechnung ein Konfigurationsobjekt als Eingabe erwartet, stellt ein WeakMap sicher, dass der Cache nicht länger lebt als die Konfigurationen.

```javascript
const cache = new WeakMap();

function expensiveCalc(obj) {
  if (cache.has(obj)) return cache.get(obj);
  
  const result = heavyMath(obj);
  cache.set(obj, result);
  return result;
}
```

Der Cache lebt nur so lange wie die zwischengespeicherten Objekte. Sobald `obj` nirgendwo anders referenziert wird, verschwinden sowohl das zwischengespeicherte Ergebnis als auch der Cache-Eintrag gemeinsam.

## Wann du dazu greifst

Memory Leaks in modernen Web-Apps resultieren meist aus verwaisten Referenzen auf Objekte, die eigentlich bereinigt werden müssten. Bei langlaufenden Anwendungen, einem den ganzen Tag offenen Dashboard, einer stundenlang laufenden Chat-App oder einem sich nie neu ladenden Admin-Panel, musst du dir überlegen, was mit alten Daten passiert.

WeakMap ist besonders nützlich, wenn du Daten mit DOM-Knoten, Komponenten-Instanzen oder beliebigen Objekten verknüpfst, deren Lebensdauer du nicht kontrollierst. Wenn du etwas basierend auf einer Referenz speicherst und diese Referenz verschwinden könnte, macht WeakMap das Aufräumen deutlich einfacher.

Ein reguläres Map ist weiterhin die richtige Wahl, wenn du einen echten Cache mit Eviktionsrichtlinien baust, wenn du über Einträge iterieren musst, wenn du primitive Schlüssel verwendest oder wenn die Daten selbst im Vordergrund stehen und nicht ihre Verknüpfung mit einem Objekt.

Das Praktische an `WeakMap` ist, dass der Bedarf meist offensichtlich ist. Wenn du Aufräumcode schreibst, um Map-Einträge bei Zerstörung von Objekten zu entfernen, ist das ein Warnsignal. Wenn du befürchtest, dass der Speicher unbegrenzt wächst, weil unklar ist, wann Einträge gelöscht werden müssen, ist das ein weiteres Indiz.

Manchmal ist das beste Feature genau jenes, das ohne zusätzlichen Aufwand einfach funktioniert.

## Ressourcen

- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [MDN: Speicherverwaltung](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)
- [V8 Blog: Schwache Referenzen und Finalizer](https://v8.dev/features/weak-references)
- [JavaScript.info: WeakMap und WeakSet](https://javascript.info/weakmap-weakset)
````
