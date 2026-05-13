# Translation Candidate
- Slug: love-computer-languages
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-12--love-computer-languages/de/index.mdx
- Validation: passed
- Runtime seconds: 9.04
- Input tokens: 8347
- Output tokens: 2626
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000798
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Liebe (Computer‑)Sprachen
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

## Notizen zu Programmiersprachen

#### Ich bin mir sicher, dass meine sonstigen Beobachtungen schon einmal gemacht wurden, aber hier ist meine Liste der interessantesten Sprachen:

### JavaScript

Meine eine wahre Liebe, superschlau und allgegenwärtig – der Allrounder, erstaunlich kraftvolle Champion!  
Sie ist seit _Jahren_ die #1 am aktivsten/populärsten Sprache auf GitHub.com.

Ich hasse es zuzugeben, aber jahrelang habe ich törichterweise nichts als Verachtung und Spott für das empfunden, was jetzt **meine Lieblingssprache** ist.

**ES6** hat meine ~~~Sucht~~~ Liebe nur noch verstärkt. Während reines ES5 immer einen besonderen Platz in meinem Herzen behalten wird, fühle ich jedes Mal, wenn ich etwas **ES6** benutze, diesen radioaktiven Spinnenbiss…

Es gab vier Gründe, die mich ins **ES6‑Camp** getrieben haben:

1.  Es macht Spaß. Im Ernst. Es gibt greifbare Gewinne in Ästhetik, Klarheit und Produktivität.

- Subjektive Behauptungen, sagst du? Lass mich ein bisschen ES6 zeigen:
- `let expired = users.filter(u => Date.now() > u.trialDate)`
- Jetzt musst du nicht mehr so tun, als wüsstest du, wie man `Object.create` oder `Object.defineProperty` verwendet
- Siehe Beispiele unten

1.  Seit Juli 2015 ist ES6 ein offiziell finalisierter Standard!
1.  Der Support ist praktisch 100 %* ! … Okay, BabelJS wird benötigt, um deinen Code zu patchen, damit er ES5‑kompatibel ist. Historisch wurden JS‑Transpiler skeptisch betrachtet. In den letzten Jahren (2014‑15) hat sich das jedoch geändert, da BabelJS zum Schlüssel‑Enabler und Treiber für die Weiterentwicklung der Sprache geworden ist. Zahlreiche Unternehmen, darunter Microsoft und Facebook, setzen es auf einigen der größten Websites ein.
1.  [Neueste Versionen von Node](https://nodejs.org/en/blog/release/v4.0.0/) enthalten dieselbe V8‑JS‑Engine wie Chrome v45, es ist v4.5

#### Beispiele

> Ich zeige dir, was mich endlich dazu gebracht hat, den ES6‑gewürzten Kool‑Aid zu trinken.

Nach meiner jüngsten Erfahrung lässt ES6 dich Code schneller schreiben. Punkt.
Da der Code kompakter ist, braucht man merklich weniger Hirnschmalz, um den alten Code (oder den eines Teamkollegen) zu durchforsten und zu verstehen.

Ich habe regelmäßig KLOC‑Einsparungen von etwa 20‑50 % beobachtet. Das ist wie ein Kate‑Moss‑Schnitt!

**_FEHLENDES BILD:_ EcmaScript 5 vs ES 2016 – Demo: Klassen, Destructuring, Slick**  
{/* ](/../images/screenshots/Diff-ES6-vs-ES5-Head-to-Head.png) */}

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

- Kein mühsames „Extrahieren“ und „Prüfen“ von Feldern mehr, die an eine Funktion übergeben werden. Direkt zum Beispiel `add()`:

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  add({ name, email, password }) {
    // Passwort‑Hash speichern, wir benötigen nur eine explizite `var/let` – die anderen Variablen werden durch das `{fields}`‑Zauberwerk oben ^^^ definiert
    let hash = getSha256(password);
    return http
      .post("/users", {
        name: name,
        email: email,
        passwordHash: hash
      })
      .then(usr => this.users.push(usr)); // Benutzer nach Service‑Antwort anhängen
  }
}
```

<Gist path='justsml/aaddc9852c1624d61cf3'></Gist>

<p>&#160;</p>

#### Auf ES6 umzusteigen kann sich anfühlen, als würde man von:

<div class="anigif top">
  <img alt='huh' title="Huh?" src="https://res.cloudinary.com/ddd/image/upload/v1441143891/wtf__tumblr_inline_n7ygqh6Y0C1svcdm1_igeqey.gif" />
</div>
<h3>Zu</h3>
<div class="anigif">
  <img alt='wtf' title="WTF?!?!" src="https://res.cloudinary.com/ddd/image/upload/v1443133148/cat-wtf-trap.gif" />
</div>
<h3>Zu</h3>
<div class="anigif end">
  <img alt='#winning' title='#winning' src="https://res.cloudinary.com/ddd/image/upload/v1443133141/full-throttle.gif" />
</div>

Einfach weiter durch das neue Zeug wühlen. Schaut euch String‑Templates, automatisches `this`‑Binding, vernünftigere Vererbung … an.

##### [Node.JS](http://nodejs.org/)

### Rust

##### [Official Site](http://www.rust-lang.org/)

- **Pros**

- Stell dir vor, es gäbe eine Sprache, die so schnell wie C und so mächtig wie Python/C++ ist, aber ohne die Komplexität/Fehlerfallen, in die selbst die erfahrensten Entwickler tappen.
  - Tatsächlich schätze ich, dass Rust etwa genauso komplex ist wie die ES6‑Spezifikation.
  - Sie enthält eine Menge Extras:
    1.  Im Grunde transpiliert Rust von einer halb‑dynamischen Syntax zu **purem C‑Code**!
    1.  Und zwar **alle bewährten Praktiken** in C, die du wahrscheinlich verpfuschen würdest – ich ~~schließlich~~ immer tue.
    - Automatisch bekommst du:
    - Automatisches Speicher‑Management (kein langsamer Garbage Collector nötig!)
    - Perfekt abgegrenzte Objekt‑Besitz‑/Lock‑Regeln (Mutexting & Context‑Switching minimiert)
    - Objekt‑Lebenszeiten (automatisch implementiert\*, und auto‑kodiert, als wüsstest du jede Randbedingung)
    - Verhindert praktisch alle Laufzeit‑Fehler (ernsthaft, deine Code‑Pfade werden explizit: du kannst keinen Pfad übersehen)
  - Ach ja, es liefert echte Sprache‑Erweiterbarkeit über ein sinnvolles **Macro**‑Feature.
    - Brauchst du Comprehensions? [Scala‑Style? Erledigt](https://gist.github.com/hanny24/5749688) und [wie Python? Erledigt](https://gist.github.com/JeffBelgum/5e762761cd63c796e803).
    1.  Zu gut, um wahr zu sein? Nein, es wird noch besser:
    - Bleeding‑Edge‑Indikatoren (GitHub‑Statistiken) zeigen, dass Rust stark mit Go (Googles neuer Trend‑Sprache) konkurriert oder sogar übertrifft
      - Ca. 4 000 Stars mehr als Go (derzeit rund 12 200)
      - Mehr Gesamtkontributoren (2×! – 1 071 vs. Go 479)
      - Mehr Forks (3×! – 2 343 vs. 765)
      - Anzahl offener Issues, verliert nur knapp (2 000 vs. 1 730 bei Go)
      - Pull‑Requests (Rust 70+ vs. Go 1)
    - Ich musste die Zahlen selbst dreifach prüfen.
  - Andere Bibliotheken sind dank der Konstrukte & Regeln von Rust sehr stabil.
  - Thread‑Modell, das auch für Normalsterbliche nutzbar ist

- **Cons**
  - Anständige **Web‑Frameworks** sind relativ neu, ungetestet und meist undokumentiert (obwohl sie **sehr** beeindruckend werden – Stand März 2015).
  - Viele frühe Pre‑1.0‑Breaking‑Changes

### Python

- **Pros**
  - Eine überwältigend vollständige Auswahl an Algorithmen ist bereits in Python implementiert (siehe: scilearnkit, numpy, matplotlib, pil/pillow usw.)
  - Sehr spaßig zu schreiben! Comprehensions und Decomposition sind großartige Features und lassen andere Sprachen überladen wirken!
  - Arrays, „Sequences“, Tupel usw. sind relativ einfach

```python
## dummy code: defines a color + pixel-coord -
def pixel(x, y, r, g, b): return dict(x=x, y=y, r=r, g=g, b=b)
## Create a new pixel object and apply to set of vars
x, y, r, g, b = pixel(10, 20, 255, 255, 255)
## Now we can call pixel
```

- **Cons**
  - Ärgerlich ist, dass Python 2.x und 3.x inkompatibel sind. Das große Schisma hält sich noch immer, selbst nach all den Jahren.
  - Einige zentrale Bibliotheken werden von manchen Entwicklern nicht ausreichend verstanden (numpy)

### Haskell

- **Pros**
  - Sehr befriedigend, wenn man endlich genug Syntax auswendig kennt, um ausdrucksstarke Muster mit Comprehensions zu basteln
  - Man lernt verblüffende Code‑Muster, die oft auch in anderen Sprachen anwendbar sind.
- **Cons**
  - Syntax und Muster können gewöhnungsbedürftig sein.

<div class="anigif end">
  <img alt='endless loop' src="https://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif" />
</div>

### SmallTalk-80

- **Pros**
  - Unglaublich einfache Compiler (insbesondere das Original)
  - Gute Ressourcen: [Smalltalk MVC Translated to JavaScript](http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript)
- **Cons**
  - Man wird diese Sprache wahrscheinlich nie für ein Projekt einsetzen. Null Einsätze. Sie wird jedoch deinen Programmierstil stärker beeinflussen als andere funktionale Sprachen… Das sollte eigentlich in die Pros‑Liste gehören.

#### _Work-in-progress (aktualisiert Dez. 2015)_
````
