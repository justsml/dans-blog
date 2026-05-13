# Translation Candidate
- Slug: naming-things-real-good
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2016-06-01--naming-things-real-good/de/index.mdx
- Validation: passed
- Runtime seconds: 1.83
- Input tokens: 4196
- Output tokens: 1388
- Thinking tokens: unknown
- Cached input tokens: 1408
- Cache write tokens: 0
- Estimated cost: $0.000413
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Gute Benennung
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
## Naming stuff: Object Oriented Basics

Schauen wir uns das Objekt‑/Klassen‑Design anhand eines Beispiels an…

### Die Situation

Haben Sie schon einmal ein `data model` (im Code, SQL oder Excel‑Tabellen) entworfen?
Sieht das Folgende vertraut aus?

```
*** anti-pattern - don't copy-paste ***
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
  - *userEmail* - 'Pointer' to User table ^^^
```

### Wo liegt der Fehler?

Technisch gibt es keinen Fehler, nur Daten, die neu organisiert werden müssen.

**Kommt Ihnen das bekannt vor?**

1.  Jede Änderung an Ihrer Anwendung erfordert stundenlanges, mühsames Debuggen.  
2.  Änderungen der Anforderungen führen zu:

![schema refactor][schema_refactor]

Warum ist es _so_ problematisch, ein Feld `agentEmailPrimary` zu nennen?

Zunächst einmal erschaffen Sie **nicht** etwas völlig Neues im Universum. Über‑Spezifität birgt einige Fallen:

1.  „Festgelegt“ auf einen hochspezifischen Namen bedeutet, dass `agentEmailPrimary` Ihre Views und den zugehörigen Code **zu 0 % wiederverwendbar** macht und lästige, wiederkehrende Bugs erzeugt wie:

- Daten synchronisieren nicht zwischen Tabellen (es ist nicht klar, ob `user.email` nach `agent.agentEmail` propagiert werden muss oder umgekehrt – ganz zu schweigen von der Komplexität, diese „Logik“ manuell zu implementieren …)
- Validierungsregeln/-logik werden wahrscheinlich dupliziert und inkonsistent.
- Ihr Projekt wird zunehmend einer wackeligen Jenga‑Turm‑Struktur ähneln.
- Die Fragilität steigt mit jeder neuen Datei, da selbst für triviale Änderungen ein extrem hohes Maß an Detailgenauigkeit erforderlich ist.

1.  `agentEmailPrimary` könnte verschiedene Bedeutungen haben. Vermeiden Sie Mehrdeutigkeiten mit **kürzeren Namen**.

- Achten Sie auf unnötige Wortfülle. `Primary`? Das wirft nur mehr Fragen auf: Gibt es ein Secondary? Ist es für den Primary‑Next‑of‑kin?

Genug Worte, Dan, wie sollte es stattdessen aussehen?

### Eine Lösung

```
// Consolidated Schema:

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

Ich habe die `Agent`‑Tabelle entfernt, weil sie keine Felder enthielt, die ausschließlich für Agents eindeutig waren. Und das Objekt `User.company` (mit `.name`, `.address`) entstand, sobald die Benennung aufgeräumt war.

Einige Leitprinzipien:

1.  Unnötige Tabellen entfernen. Brauchen Sie wirklich eine `statuses`‑Tabelle? Wenn Sie stattdessen ein `status::VARCHAR(8)`‑Feld in die `User`‑Tabelle einfügen können? Es ist in Ordnung, die zusätzlichen Bytes pro Zeile zu akzeptieren.
2.  Verwandte Tabellen zusammenführen. **Daten**
3.  Redundante Datensammlungen löschen (z. B. die `ActivityLogs`‑Tabelle entfernen, wenn sie durch eine Analytics‑Lösung ersetzt wird.)
4.  Alle Feldnamen auf ein **einzelnes Wort/Nomen/Pronomen** beschränken. Es ist zulässig, sich auf den Kontext der Tabelle zu verlassen. (z. B. `PersonalAccount.email` vs. `BusinessAccount.email` – der Kontext wird durch den Tabellennamen geliefert.)
5.  Es gibt **keine** `Agent.agentEmail` oder `Agent.agentPhonePrimary`. Punkt. Sagen Sie mit mir: „Es heißt `email` & `phone`.“
6.  Wenn Sie hochspezifische Namen verwenden, verankern Sie ein festes Niveau von `code-reusability` und `durability` – und zwar konkret **0 %**.
7.  Sie tun sich selbst keinen Gefallen mit Unsinn wie `User.profileSummaryEmail`. 💞

**Empfohlene Lektüre:**

1. [Maybe Normalizing Isn't Normal](https://blog.codinghorror.com/maybe-normalizing-isnt-normal/)
2.  [The Trade-offs Between Database Normalization and Denormalization](https://dev.to/er_dward/the-trade-offs-between-database-normalization-and-denormalization-4kdo)
3.  [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)
4.  [https://en.wikipedia.org/wiki/Database_normalization](https://en.wikipedia.org/wiki/Database_normalization)

[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif
````
