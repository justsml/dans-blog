# Translation Candidate
- Slug: naming-things-real-good
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2016-06-01--naming-things-real-good/de/index.mdx
- Validation: passed
- Runtime seconds: 11.07
- Input tokens: 3980
- Output tokens: 4887
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001491
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: 'Namensgebung: Objektorientierte Grundlagen'
date: '2016-06-01'
modified: '2024-08-10'
category: Guides
subCategory: programming
tags:
  - programming
  - patterns
  - naming
  - source-code
  - organization
cover: ../rawpixel-652639-unsplash.webp
cover_mobile: ../w300_rawpixel-652639-unsplash.webp
cover_icon: ../icon_rawpixel-652639-unsplash.webp
---
## Namensgebung: Grundlagen der objektorientierten Modellierung

Betrachten wir das Objekt-/Klassendesign anhand eines Beispiels...

### Die Situation

Haben Sie jemals ein `Datenmodell` (in Code, SQL oder Excel-Tabellen) entworfen?  
Erkennen Sie das Folgende wieder?

```
*** Gegenmuster - nicht kopieren ***
* User
  - id
  - avatarUrl
  - name
  - email
  - password

* Agent
  - id
  - primaryPhoto
  - name
  - email
  - agentEmail
  - agentPhoneMain
  - agentEmailPrimary
  - agentPhonePrimary
  - agentAddressFull
  - agentCompanyName
  - agentCompanyAddress
  - *userEmail* - 'Pointer' auf User-Tabelle ^^^
```

### Wo ist das Problem?

Technisch gesehen gibt es keinen Fehler, lediglich Daten, die eine Neuorganisation benötigen.

Klingt das vertraut?

1. Jede Änderung an deiner App wird Stunden mühsamer Debugging erfordern.  
1. Jede Anforderungsänderung führt zu:  

![schema refactor][schema_refactor]  

Warum ist es so schlecht, einen Feldnamen `agentEmailPrimary` zu wählen?  

Zunächst einmal erstellst du **nicht** etwas Gänzlich Neues. Übermäßige Spezifität hat einige Fallstricke:  

1. Ein "verankerter" Name wie `agentEmailPrimary` bedeutet, dass deine Views und abhängigen Code-Teile **0% wiederverwendbar** sind und sich lästige, sich wiederholende Fehler ergeben, wie:

- Daten synchronisieren sich nicht zwischen Tabellen (nicht offensichtlich, ob `user.email` in `agent.agentEmail` propagiert werden muss oder umgekehrt – ganz zu schweigen von der Komplexität, dies manuell zu implementieren ...)
- Validierungsregeln/Logik sind wahrscheinlich dupliziert und inkonsistent.
- Je weiter du fortfährst, desto mehr wird dein Projekt einem wackeligen Jenga-Turm ähneln.
- Zuverlässigkeit bröckelt mit jedem neuen Datei, da eine extrem hohe Aufmerksamkeit auf Details erforderlich ist, selbst für triviale Änderungen

1.  `agentEmailPrimary` könnte mehrere Dinge bedeuten. Vermeide Unklarheit mit **kürzeren Namen**.

- Achte auf überflüssige Wörter. `Primary`? Das führt nur zu weiteren Fragen: Gibt es eine Secondary? Ist das die Primary für ihre nächsten Angehörigen?

Hör auf, Dan, was sollte stattdessen daraus werden?

### Eine Lösung

```
// Konsolidierter Schema:

User
  - id
  - role: ['agent', 'lead', 'admin']
  - name
  - phone
  - address
  - email
  - password
  - company
    - name
    - address
```

Ich habe die `Agent`-Tabelle entfernt, da sie keine Felder enthielt, die einzigartig für Agenten waren. Und das `User.company`-Objekt (mit `.name`, `.address`) entstand erst, als die Benennung sauber war.

Einige Leitprinzipien:

1.  Entfernen Sie unnötige Tabellen. Brauchen Sie wirklich eine `statuses`-Tabelle? Wären nicht ein `status::VARCHAR(8)`-Feld in der `User`-Tabelle ausreichend? Es ist in Ordnung, die zusätzlichen Bytes pro Zeile zu verwenden.
2.  Versuchen Sie, verwandte Tabellen zusammenzuführen. **Daten**
3.  Löschen Sie redundante Datensammlungen (z. B. entfernen Sie die `ActivityLogs`-Tabelle, wenn diese durch eine Analytics-Lösung ersetzt wurde.)
4.  Versuchen Sie, **alle Feldnamen** auf ein **einziges Wort/Substantiv/Pro-Substantiv** zu beschränken. Es ist in Ordnung, sich auf den Kontext der Tabelle zu verlassen. (z. B. `PersonalAccount.email` vs. `BusinessAccount.email` – der Kontext wird durch den Tabellennamen bereitgestellt.)
5.  Es gibt **kein solches Ding** wie `Agent.agentEmail` oder `Agent.agentPhonePrimary`. Punkt. Sagen Sie es mit mir: „Es ist `email` & `phone`.“
6.  Durch die Verwendung von hochspezifischen Namen gießen Sie eine spezifische Ebene von `code-reusability` und `dauerhaftigkeit` in Stein, also spezifisch NULL %.
7.  Sie tun sich keinen Gefallen mit Schrott wie `User.profileSummaryEmail`. 💞

**Empfohlene Lektüre:**

1. [Vielleicht Normalisierung nicht normal ist](https://blog.codinghorror.com/maybe-normalizing-isnt-normal/)
1.  [Die Trade-offs zwischen Datenbanknormalisierung und Denormalisierung](https://dev.to/er_dward/the-trade-offs-between-database-normalization-and-denormalization-4kdo)
2.  [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)
3.  [https://en.wikipedia.org/wiki/Database_normalization](https://en.wikipedia.org/wiki/Database_normalization)

[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif
````
