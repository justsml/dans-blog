# Translation Candidate
- Slug: quiz-context-engineering
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-09--quiz-context-engineering/de/index.mdx
- Validation: deferred
- Runtime seconds: 108.39
- Input tokens: 13559
- Output tokens: 18666
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.005565
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Quiz: 14 Kontext-Engineering-Fragen'
subTitle: >-
  Prompt-Engineering ist das, was du machst. Context-Engineering ist das, was du
  deployst.
date: '2026-05-09'
modified: '2026-05-09'
tags:
  - quiz
  - ai
  - llm
  - context-engineering
  - prompts
  - rag
  - tokens
  - advanced
category: Quiz
subCategory: AI
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.85
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<p class="inset">Prompt-Engineering bekommt die Slogans. Context-Engineering bekommt den Pager. Wie gut kennt ihr euch mit dem Teil eines KI-Systems aus, der tatsächlich in der Praxis eingesetzt wird?</p>

Dieser Test behandelt Kontextfenster, Token-Budgets, Abruf, Prompt-Struktur und die Ausfallmodi, die saubere Demos in verwirrende Produkte verwandeln. Er beginnt sanft. Er bleibt nicht dabei.

Bringt eure Belege mit.

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Grundlagen"
  title="Grundlagen des Kontextfensters"
  options={[
    {text: 'Die maximale Anzahl von Anfragen pro Minute'},
    {text: 'Die kombinierte Tokenbegrenzung für Eingabe und Ausgabe', isAnswer: true},
    {text: 'Die Anzahl der Nachrichten in einem Gespräch'},
    {text: 'Der Speicher zwischen Sitzungen'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was bezeichnet „Kontextfenster“ bei einem LLM?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das Kontextfenster ist die Gesamtzahl der Token, die ein Modell in einem einzelnen Aufruf verarbeiten kann – **Eingabe + Ausgabe kombiniert**. Ein Kontextfenster von 128 K bedeutet, dass Ihr Prompt + abgerufene Dokumente + Gesprächsgeschichte + die Antwort des Modells alle in 128.000 Token passen müssen.

    Es hat nichts mit Sitzungen, Speicher oder Ratenbegrenzungen zu tun. Wenn Sie die Grenze erreichen, kürzt das Modell entweder, gibt einen Fehler aus oder – schlimmer – löscht Token, die Sie nicht erwartet haben.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Grundlagen"
  title="Token-Schätzung"
  options={[
    {text: 'Etwa 50 Token'},
    {text: 'Etwa 130 Token', isAnswer: true},
    {text: 'Etwa 300 Token'},
    {text: 'Etwa 1.000 Token'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie viele Token verwendet ein englischer Absatz mit 100 Wörtern ungefähr mit einem gängigen modernen Tokenizer?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Faustregel lautet **~1,3 Token pro Wort** für typischen englischen Text. Ein 100-Wörter-Absatz ≈ 130 Token.

    Die Abweichung hängt vom Inhaltstyp ab:
    - Code: ~1,5–2 Token/Wort (Sonderzeichen, Leerzeichen)
    - Technische Dokumente mit vielen Identifiern: können höher sein
    - Gängige englische Wörter: oft 1 Token pro Wort
    - Seltene Wörter, Namen, Nicht-Englisch: oft 2–4 Token

    Die Bibliothek `tiktoken` liefert exakte Zahlen. Messe immer genau statt zu vermuten.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Grundlagen"
  title="Rolle des System-Prompts"
  options={[
    {text: 'Es wird zuerst verarbeitet und hat ein höheres Gewicht als Benutzer-Nachrichten', isAnswer: true},
    {text: 'Es ist identisch mit einer Benutzer-Nachricht, wird aber anders dargestellt'},
    {text: 'Es wird nur für API-Aufrufe verwendet, nicht für Chat-Oberflächen'},
    {text: 'Es bleibt über Sitzungen hinweg als langfristiges Gedächtnis bestehen'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist der praktische Effekt des Verwendens der Rolle `system` im Vergleich zur Rolle `user` im Nachrichten-Array?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Rolle `system` wird als höher priorisierte Anweisung verarbeitet. Modelle sind trainiert, mehr Gewicht darauf zu legen als auf Benutzer-Nachrichten – es ist die architektonische Grenze zwischen „was der Entwickler gesagt hat“ und „was der Benutzer gesagt hat".

    Es ist nicht magisch. Es garantiert nicht, dass das Modell konträre Benutzer-Anweisungen ignoriert (siehe: Prompt-Injection). Aber es steigert signifikant die Neigung des Modells, Ihre Anweisungen zu befolgen, besonders bei Modellen mit starker Befehlsfolge.

    Praktisch: Setzen Sie Ihre Persönlichkeit, Regeln und Verhaltensbeschränkungen in `system`. Setzen Sie abgerufene Kontexte und Benutzerdaten in `user`. Setzen Sie niemals Benutzer-kontrollierte Eingaben in `system`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Abruf"
  title="Verloren in der Mitte"
  options={[
    {text: 'Modelle leisten sich gleich gut, unabhängig davon, wo der Kontext platziert ist'},
    {text: 'Modelle leisten sich am besten, wenn der Kontext am Ende steht'},
    {text: 'Modelle leisten sich am besten, wenn der Kontext am Anfang und Ende steht, und am schlechtesten in der Mitte', isAnswer: true},
    {text: 'Modelle leisten sich am besten, wenn der Kontext in der Mitte des Prompts steht'},
  ]}
>
  <slot name="question">
  <div className="question">
    Forschung zum Problem 'Verloren in der Mitte' zeigt, dass LLMs tendenziell:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [Paper 'Verloren in der Mitte' (Liu et al., 2023)](https://arxiv.org/abs/2307.03172) zeigte, dass LLMs zuverlässig mit Informationen in der Mitte langer Kontexte Probleme haben. Die Leistung ist deutlich höher, wenn relevante Informationen am **Anfang oder Ende** des Kontextfensters stehen.

    Praktische Implikation: Beim Einfügen von abgerufenen Chunk-Blöcken in einen RAG-Prompt sollten Sie diese nicht einfach nach Relevanz anordnen. Setzen Sie das bestbewertete Ergebnis zuerst, das zweitbeste zuletzt und füllen Sie die Mitte mit weniger relevanten Inhalten. Gegenintuitiv, aber messbar besser.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Retrieval"
  title="Chunking-Strategie"
  options={[
    {text: 'Verwenden Sie die größtmögliche Chunk-Größe, die Ihr Kontextfenster zulässt'},
    {text: 'Immer 512 Token verwenden — es'},
    {text: 'Verwenden Sie überlappende Chunks, die in der Größe zu Ihrer Inhaltsstruktur passen', isAnswer: true, hint: 'Richtig: Überlappung und Anpassung an die Inhaltsstruktur sind entscheidend'},
    {text: 'Chunk-Größe hängt nicht von der Modellgröße ab'},
  ]}
>
  <slot name="question">
  <div className="question">
    Bei der Aufteilung von Dokumenten für RAG, welches ist das wichtigste Prinzip?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Es gibt keine universelle korrekte Chunk-Größe – sie hängt von Ihrem Inhalt ab. Die wichtigsten Prinzipien sind:

    1. **Passen Sie sich der Inhaltsstruktur an.** FAQ-Seiten eignen sich gut für Chunks auf Ebene von Frage+Antwort. Rechtstexte auf Klausurebene, Code auf FunktionsEbene.
    2. **Verwenden Sie Überlappung.** Ein 512-Token-Chunk mit 64 Token Überlappung auf jeder Seite bedeutet, dass Antworten, die eine Grenze überspannen, dennoch abgerufen werden.
    3. **Messen Sie.** Erstellen Sie eine Evaluierungsdatenmenge und testen Sie mehrere Chunk-Größen. Die Chunk-Größe ist wichtiger als das Embedding-Modell.

    „512 Token“ ist ein vernünftiger Ausgangspunkt, kein Gesetz.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Retrieval"
  title="Hybride Suche"
  options={[
    {text: 'Das gleiche Abfrage zweimal ausführen, um Redundanz zu gewährleisten'},
    {text: 'Zwei verschiedene Embedding-Modelle auf dem gleichen Korpus verwenden'},
    {text: 'Vektor-Suche mit Schlüsselwort-Suche kombinieren, um bessere Retrieval-Ergebnisse zu erzielen', isAnswer: true},
    {text: 'Gleichzeitige Suche in mehreren Vektor-Datenbanken'},
  ]}
>
  <slot name="question">
  <div className="question">
    In RAG-Systemen bezieht sich 'hybride Suche' auf:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Hybride Suche kombiniert **Vektor-Suche** (semantische Ähnlichkeit über Embeddings) und **Schlüsselwort-Suche** (BM25 / Volltextsuche), da sie sich in komplementären Fehlern verhalten:

    - Vektor-Suche hat Schwierigkeiten mit exakten Begriffen: Produktbezeichnungen, Fehlercodes, Modellnummern, technische Identifikatoren
    - Schlüsselwort-Suche hat Schwierigkeiten mit Paraphrasen: 'how do I cancel' vs. 'terminate subscription'

    Die Ergebnisse beider Methoden werden mithilfe von **Reciprocal Rank Fusion (RRF)** kombiniert – ein Rangieralgorithmus, der Positionen aus mehreren sortierten Listen zusammenführt, ohne normalisierte Scores zu benötigen.

    Beide sind in Postgres mit `pgvector` + `tsvector` verfügbar. Ein separater Suchdienst ist möglicherweise nicht erforderlich.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Tokenverwaltung"
  title="Kontextbudget"
  options={[
    {text: 'Verwenden Sie 95 %+ des Kontextfensters, um maximale Informationen zu nutzen', hint: 'Das Modell benötigt Platz für die Ausgabe – 95 % Eingabe führen oft zu abgeschnittenen Antworten.'},
    {text: 'Bewahren Sie ausreichend Platz für die Ausgabe auf, anstatt das gesamte Fenster zu füllen', isAnswer: true, hint: 'Weiser Ansatz: Schätzen Sie die Ausgabegröße zuerst, dann passen Sie die Eingabe an.'},
    {text: 'Das Kontextbudget ist nur für Modelle unter 32K Token relevant', hint: 'Das Kontextbudget ist für alle Modelle wichtig, unabhängig von der Größe.'},
    {text: 'Das Modell kürzt automatisch, wenn das Fenster überschritten wird', hint: 'Manche Modelle tun das, aber es ist nicht zuverlässig – planen Sie lieber voraus.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Beim Erstellen eines RAG-Prompts mit abgerufenem Kontext ist eine gute Faustregel für das Kontextbudget:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das Kontextfenster wird zwischen **Eingabe und Ausgabe** geteilt. Wenn Sie 90 % für die Eingabe nutzen, bleibt dem Modell nur noch 10 % des Fensters für die Antwort – was oft zu abgeschnittenen oder eingeschränkten Ausgaben führt.

    Eine vernünftige Faustregel: Schätzen Sie zuerst die erwartete Ausgabegröße und halten Sie die Eingabe deutlich unter dem verbleibenden Budget. Für viele RAG-Aufgaben bedeutet das, maximal **60–70 % des gesamten Kontextfensters für die Eingabe** (Systemprompt + Verlauf + abgerufener Kontext) zu nutzen. Der Rest bleibt für die Generierung und Puffer.

    Zusätzlich leisten sich Modelle schlechter, je näher sie am Ende des Kontextfensters sind – Verständnis und Anweisungsbefolgung verschlechtern sich, je voller der Kontext wird. Laufen bei 95 % ist technisch möglich. Es ist nicht das gleiche Erlebnis wie bei 50 %.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Token-Management"
  title="Verwaltung der Konversationshistorie"
  options={[
    {text: 'Immer die komplette Konversationshistorie senden'},
    {text: 'Alte Nachrichten zusammenfassen, wenn die Historie das Token-Budget überschreitet', isAnswer: true},
    {text: 'Alte Nachrichten löschen – das Modell hat persistente Erinnerung'},
    {text: 'Historie in einer Vektor-Datenbank speichern und relevante Abschnitte abrufen'},
  ]}
>
  <slot name="question">
  <div className="question">
    In einer Chat-Anwendung mit mehreren Interaktionen: Welte Strategie ist korrekt, wenn die Konversationshistorie sehr lang wird?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    LLMs haben keine persistente Erinnerung. Jeder API-Aufruf ist stateless – Sie senden den vollständigen Kontext und erhalten eine Antwort. Die "Erinnerung" eines Gesprächs besteht ausschließlich aus der Nachrichtenhistorie, die Sie in jeder Anfrage einbeziehen.

    Wenn diese Historie das Budget überschreitet, gibt es folgende Optionen:
    1. **Zusammenfassen**: Ältere Interaktionen in eine laufende Zusammenfassung komprimieren, aktuelle verbatim beibehalten
    2. **Gleitendes Fenster**: Letzte N Interaktionen beibehalten, frühere löschen
    3. **Selektiver Abruf**: Konversationsabschnitte embedden und pro Anfrage relevante abrufen (komplex, aber mächtig)

    Die einfache Kürzung – alte Nachrichten einfach wegschneiden – ist die schlechteste Option, da sie stille Kontextverluste verursacht, die das Modell benötigen könnte.

    Der selektive Abruf von Konversationshistorie über eine Vektor-Datenbank ist theoretisch ansprechend, ist aber für die meisten Chat-Anwendungen übertrieben. Zusammenfassung ist die pragmatische Standardlösung.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Prompt-Struktur"
  title="Wenig-Shot-Beispiele"
  options={[
    {text: 'Mehr Beispiele führen immer zu besseren Ergebnissen'},
    {text: '3–5 hochwertige, diverse Beispiele im Prompt', isAnswer: true},
    {text: 'Wenig-Shot-Beispiele helfen nur bei Klassifizierungsaufgaben'},
    {text: 'Beispiele sollten nach der Benutzeranfrage kommen, nicht davor'},
  ]}
>
  <slot name="question">
  <div className="question">
    Für die meisten Produktionsanwendungsfälle ist die optimale Strategie für Wenig-Shot-Beispiele:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Wenig-Shot-Beispiele verbessern die Ausgabekonsistenz und Einhaltung des Formats erheblich. Der ideale Punkt für die meisten Aufgaben ist **3–5 hochwertige, diverse Beispiele**.

    Warum nicht mehr? Jedes Beispiel kostet Tokens. Ab 5–10 Beispielen sinkt der Gewinn, während die Tokenkosten weiter steigen. Mehr Beispiele erhöhen auch das Risiko, dass das Modell sich an die Beispiele anpasst, anstatt das zugrunde liegende Muster zu verstehen.

    Warum Diversität wichtig ist: Wenn alle Beispiele denselben Eingabetyp haben, verallgemeinert das Modell schlecht auf Randfälle. Beispiele sollten die wichtigsten Variationen abdecken.

    Platzierung: Beispiele kommen *vor* der Benutzeranfrage, als Teil des Systemprompts oder als vorgefüllte Konversationsschritte – nicht danach.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Prompt-Struktur"
  title="XML-Tags für Struktur"
  options={[
    {text: 'XML-Tags sind nur in Anthropic-Modellen gültig'},
    {text: 'XML-Tags helfen Modellen, Anweisungen von Daten zu unterscheiden und die Genauigkeit des Parsings zu verbessern', isAnswer: true},
    {text: 'XML-Tags verlangsamen die Tokenisierung und sollten vermieden werden'},
    {text: 'XML-Tags sind äquivalent zu Markdown-Überschriften'},
  ]}
>
  <slot name="question">
  <div className="question">
    Warum verwenden viele Produktionsprompts XML-stil-Tags wie `<document>`, `<context>`, `<instructions>`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    XML-stil-Tags liefern **explizite strukturelle Grenzen**, die Modelle trainiert sind, zu erkennen und zu respektieren. Sie tun zwei Dinge:

    1. **Trennung**: Sie signalisieren dem Modell, wo die Anweisungen enden und die Daten beginnen – kritisch für RAG und zur Reduzierung des Prompt-Injections-Risikos aus abgerufenen Dokumenten.
    2. **Parsebarkeit**: Wenn Sie das Modell bitten, auf XML zu antworten (z. B. `<answer>...</answer>`), geben die Tags saubere Extraktionspunkte ohne Regex-Hacks.

    Das ist nicht XML als Markup-Sprache. Es ist XML als Trennzeichen-Konvention, auf die Modelle trainiert sind. Es funktioniert, weil das Modell dieses Muster in der Ausbildung häufig gesehen hat, nicht weil es Schemas validiert.

    Funktioniert bei den meisten instruction-tuned-Modellen oft genug, um nützlich zu sein – es ist eine trainingsdatenbasierte Konvention, keine Herstellerfunktion oder Sicherheitsgarantie.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Fortgeschritten"
  title="Temperatur und Determinismus"
  options={[
    {text: 'temperature=0 erzeugt immer identische Ausgaben für denselben Eingabewert'},
    {text: 'temperature=0 macht Ausgaben deterministischer, garantiert aber keine exakte Identität', isAnswer: true},
    {text: 'temperature=0 deaktiviert das Modell\'},
    {text: 'temperature beeinflusst nur die Länge der Antwort'},
  ]}
>
  <slot name="question">
  <div className="question">
    Das Festlegen von `temperature=0` in Ihrem LLM-Aufruf bedeutet:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `temperature=0` bewirkt, dass das Modell bei jedem Schritt das Token mit der höchsten Wahrscheinlichkeit auswählt (greedy decoding), was **konsistenteren** Ausgaben führt – garantiert aber keine exakte Identität.

    Quellen für Abweichungen bei temperature=0:
    - **Nicht-Determinismus bei Fließkommarechnung** auf GPUs, besonders bei unterschiedlicher Hardware oder Batch-Größen
    - **Infrastrukturänderungen auf Serverseite** (Modellaktualisierungen, Servierinfrastruktur)
    - **Lange Ausgaben** akkumulieren kleine Abweichungen

    Für Testumgebungen und Evaluierungen, die strenge Determinismus erfordern, ist `temperature=0` die richtige Wahl – schreiben Sie aber keine Assertions, die auf bytegenaue Identität prüfen. Prüfen Sie Struktur, Schlüsselinhalte und Verhalten, nicht exakte Zeichenketten.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Fortgeschritten"
  title="Prompt Caching"
  options={[
    {text: 'Caching speichert Antworten und spielt sie für identische Anfragen wieder'},
    {text: 'Caching speichert compilierte KV-Paare für statische Prompt-Präfixe, wodurch die Kosten für Eingabetoken reduziert werden', isAnswer: true},
    {text: 'Caching ist nur bei OpenAI-Modellen verfügbar'},
    {text: 'Caching ist automatisch und erfordert keine Konfiguration durch den Entwickler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist "Prompt Caching" im Kontext von LLM-APIs (Anthropic, OpenAI)?
    <p className="text-sm">Letzte Überprüfung: 8. Mai 2026. Anbieter-Cache-Steuerung und Preise ändern sich schnell.</p>
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Prompt Caching wiederverwendet den berechneten **KV-Cache / Prompt-Präfix-Zustand** für statische Prompt-Präfixe, wenn dies der Anbieter unterstützt. Bei nachfolgenden Anfragen mit dem gleichen Präfix kann das Modell die erneute Verarbeitung dieser Tokens überspringen – was die Latenz reduziert und die Kosten erheblich senken kann.

    Dies ist nicht Response-Caching. Das Modell generiert weiterhin jede Antwort frisch. Du vermeidest nur die erneute Tokenisierung und Berechnung der Aufmerksamkeit für den Teil des Prompts, der sich nicht ändert.

    Am besten eignet sich dies für: große Systemprompts, statische Dokumente, Tool-Definitionen, few-shot-Beispiele – alles, was bei vielen Anfragen gleich bleibt. Der zwischengespeicherte Präfix muss am *Anfang* deines Prompts stehen.

    Nicht zu verwechseln mit: semantischer Deduplizierung, Response-Memoisierung oder Caching auf der Anwendungsebene.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Fortgeschritten"
  title="Ankerung vs. Halluzination"
  options={[
    {text: 'Sagen Sie dem Modell \'halluzinieren Sie nicht\' im Systemprompt'},
    {text: 'Verwenden Sie eine höhere Temperatur, um konfidentere Antworten zu generieren'},
    {text: 'Stellen Sie abgerufene Queldokumente bereit und weisen Sie das Modell an, sie zu zitieren', isAnswer: true},
    {text: 'Verwenden Sie ein größeres Modell — Halluzinationen treten nur in kleineren Modellen auf'},
  ]}
>
  <slot name="question">
  <div className="question">
    Die wirksamste Technik, um Halluzinationen in einem Produktions-AI-System zu reduzieren, ist:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Dem Modell beizubringen, nicht zu halluzinieren, verhindert nicht die Halluzination – das Modell hat keine verlässliche introspektive Signalisierung für 'Ich erfinde das gerade'. Es bedeutet nur, dass das Modell sich selbst überzeugend vorgaukelt, es mache nichts erfunden, während es genau das tut.

    Was tatsächlich funktioniert: **Ankerung**. Geben Sie dem Modell die Informationen, die es benötigt, um korrekt zu antworten, und beschränken Sie es auf diese Informationen:
    ```
        Answer only using the provided documents.
        If the answer isn't in the documents, say: "I don't have enough information to answer that."
    ```
    Validieren Sie anschließend die Ausgabe: Stellen Sie sicher, dass Behauptungen in der Antwort im abgerufenen Kontext erscheinen. Dies ist die zitierbasierte Ankerungsprüfung – siehe Diskussion zu RAG-Evaluation für die Implementierung.

    Größere Modelle halluzinieren im Durchschnitt weniger, aber alle Modelle halluzinieren. Ankerung ist die Abmilderungsstrategie, nicht die Modellgröße.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Experte"
  title="Kontext-Engineering vs. Feinabstimmung"
  options={[
    {text: 'Feinabstimmung ist immer besser — Kontext-Engineering ist ein Workaround', hint: 'Das ist ein verbreiteter Irrtum — die Kosten/Nutzen-Abwägung hängt vom Use Case ab'},
    {text: 'Kontext-Engineering ist kostenlos; Feinabstimmung ist teuer; immer Kontext-Engineering verwenden', hint: 'Übersehen Sie die permanente Änderung von Modellgewichten bei Feinabstimmung'},
    {text: 'Kontext-Engineering ändert das Verhalten pro Anfrage; Feinabstimmung ändert die Modellgewichte dauerhaft', isAnswer: true, hint: 'Richtig! Das ist der entscheidende Unterschied zwischen den beiden Techniken'},
    {text: 'Sie sind verschiedene Namen für dieselbe Technik', hint: 'Nein — das sind grundlegend verschiedene Ansätze'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welcher ist der entscheidende Unterschied zwischen Kontext-Engineering und Feinabstimmung, und wann ist Feinabstimmung tatsächlich sinnvoll?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **Kontext-Engineering** formt das Modellverhalten durch den Prompt — Systemanweisungen, wenige Beispiele, abgerufene Kontexte. Es ist pro Anfrage, umkehrbar und erfordert keine Ausbildung.

    **Feinabstimmung** aktualisiert die Modellgewichte anhand Ihrer Daten. Änderungen sind dauerhaft (für diesen Checkpoint) und gelten für jede Inferenz.

    Feinabstimmung ist tatsächlich besser, wenn:
    - Sie einen konsistenten Stil/Format benötigen, den das Modell allein aus Anweisungen nicht zuverlässig einhalten kann
    - Ihre Aufgabe wiederholbare Verhaltensweisen auf domänenspezifischen Mustern erfordert, die Prompting und Retrieval nicht lösen
    - Sie die Prompt-Länge reduzieren müssen — feinabgestimmtes Verhalten muss nicht jedes Mal erklärt werden
    - Sie viele Anfragen haben, bei denen konsistente wenige Beispiele erhebliche Tokens fressen

    Feinabstimmung ist übertrieben, wenn:
    - Ihre Anweisungen in einen Systemprompt passen
    - Sie hauptsächlich aktuelle oder proprietäre Fakten benötigen, die bei Bedarf abgerufen werden können
    - Anforderungen sich häufig ändern (Sie müssten erneut feinabstimmen)
    - Sie Kontext-Engineering nicht ausgeschöpft haben

    Die richtige Reihenfolge: Erst Kontext-Engineering optimieren. Feinabstimmen, wenn nachweislich nicht ausreichend.
  </div>
  </slot>
</Challenge>

</QuizUI>

Wie haben Sie abgeschnitten?

- **13–14**: Sie bauen Produktions-AI-Systeme, nicht nur Demonstrationsversionen. Selten.
- **9–12**: Guter Praktiker. Sie kennen die Tools; die Ränder sind noch unscharf.
- **5–8**: Sie haben LLMs intensiv genutzt, aber nicht tief über Kontextmanagement nachgedacht. Informieren Sie sich über Prompt-Caching und hybrides Suchen – sie verändern, wie Sie Kosten betrachten.
- **0–4**: Gute Nachricht: Alles in diesem Quiz ist lernbar und direkt anwendbar. Die Frage zu „verloren in der Mitte“ allein lohnt sich zu verstehen, bevor Sie Ihre nächste RAG-Bereitstellung starten.

Kontext-Engineering ist die Disziplin, bewusst zu entscheiden, welche Informationen in das Fenster kommen, wo Sie sie platzieren und wie Sie sie strukturieren. Das Modell ist der am wenigsten kontrollierbare Teil Ihres Systems. Alles drumherum gehört Ihnen.
````
