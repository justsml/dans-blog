# Translation Candidate
- Slug: beam-search-transformers-js
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-04-16--beam-search-transformers-js/de/index.mdx
- Validation: deferred
- Runtime seconds: 12.89
- Input tokens: 12888
- Output tokens: 3330
- Thinking tokens: unknown
- Cached input tokens: 3072
- Cache write tokens: 0
- Estimated cost: $0.001102
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Beam Search in Transformers.js implementieren
subTitle: >-
  Tausend Zeilen, monatelanges Warten und ein tiefer Einblick in das Innenleben
  der Textgenerierung
date: '2026-04-16'
modified: '2026-04-16'
tags:
  - ai
  - transformers
  - javascript
  - open-source
  - nlp
  - beam-search
  - machine-learning
category: AI
subCategory: Open Source
draft: true
hidden: true
publish: false
popularity: 0.7
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
> CW: Dieser Beitrag enthält Fachjargon. Wenn Sie also von `softmax` oder `log probs` hören und sofort Max sagen wollen, er solle mit seinen `probs` aufhören, überspringen Sie diesen Artikel lieber.

---

## Das Problem: `num_beams` war eine Lüge

Tief in der Generierungsschleife von `transformers.js` stand ein Kommentar, der schon lange dort hing:

```js
// TODO: Support beam search
```

Und direkt darunter ein `break`‑Statement, das die Schleife nach dem ersten Token stillschweigend beendete. Jedes Modell‑Config, das mit `num_beams > 1` ausgeliefert wurde – T5, BART, Whisper – führte stillschweigend Greedy‑Decoding aus. Keine Warnung. Kein Fehler. Einfach… falsche Ausgabe.

Das bemerkte ich beim Testen einer Summarisation‑Pipeline und fragte mich, warum meine Ergebnisse im Vergleich zur Python‑Referenz so stark degradiert waren. Ich verfolgte das Problem zurück zu `modeling_utils.js`, sah das TODO und machte den Fehler zu denken: „Wie schwer kann das sein?“

Die Antwort lautet: ziemlich schwer, aber auf interessante Weise.

Greedy‑Decodierung wählt bei jedem Schritt das Token mit der höchsten Wahrscheinlichkeit. Einfach, schnell, häufig suboptimal – das erste Wort, das aus deinem Mund kommt, ist nicht immer der beste Anfang für einen Satz.

Beam‑Search hingegen hält gleichzeitig `num_beams` Kandidaten­sequenzen am Leben, erweitert jede um das gesamte Vokabular bei jedem Schritt und schneidet dann auf die besten `num_beams` nach kumulativer Log‑Wahrscheinlichkeit zurück. Das ist wie eine begrenzte Breadth‑First‑Suche durch den Token‑Raum.

Das Ergebnis sind global bessere Sequenzen, zum Preis von `num_beams`‑facher Rechenleistung.

Drei Varianten existieren:

- **Standard Beam Search** – deterministisch, nimmt Argmax‑Kandidaten, liefert die beste Gesamtreihenfolge
- **Diverse Beam Search** – teilt die Beams in Gruppen, bestraft Tokens, die bereits von früheren Gruppen gewählt wurden, damit deine Ausgabe‑Kandidaten nicht alle dasselbe sagen
- **Beam Sampling** – stochastisch, wendet Top‑k + Softmax + Zufalls‑Sampling innerhalb des Beam‑Frameworks an

Alle drei sind jetzt im PR enthalten.

---

## Die architektonische Entscheidung, mit der ich wirklich gerungen habe

Der vorhandene Code‑Base enthielt eine Klasse `BeamSearchSampler`. Sie sah relevant aus. Aber es gab eine subtile Falle: Sie gab nur die obersten `num_beams` Tokens pro Beam zurück. Das klingt korrekt, bis man erkennt, dass das für echte Beam‑Search nicht ausreicht.

Echte Beam‑Search muss **alle `num_beams × vocab_size` Kandidaten pro Batch‑Element** berücksichtigen, um die global besten Fortsetzungen zu finden. Man kann nicht einfach die Top‑Tokens jedes Beams isoliert betrachten – man muss über alle Beams hinweg ranken.

So habe ich den bestehenden Sampler komplett umgangen. Ich habe `log_softmax` direkt auf den verarbeiteten Logits berechnet, kumulative Beam‑Scores hinzugefügt und einen zweistufigen Sortier‑Durchlauf über den kombinierten Kandidatenraum durchgeführt. Sauberere Mathematik, korrekte Semantik.

Die Klasse `BeamSearchSampler` ist weiterhin vorhanden, unverändert, nach wie vor nützlich für das, was sie ursprünglich erledigen sollte. Das ist einer jener Fälle, bei denen der „offensichtliche“ Wiederverwendungs‑Pfad einen in die falsche Richtung führt.

---

## Der ärgerlichste Bug: KV‑Cache‑Reordering

Wenn die Beam‑Search Sequenzen beschneidet, wird nicht nur das Token‑Array gekürzt – die überlebenden Beams werden *umgeordnet*. Beam 3 könnte die beste Fortsetzung erzeugen und wird dupliziert; Beams 0 und 2 könnten verworfen werden.

Das Problem ist, dass der Schlüssel‑Wert‑Cache des Transformator‑Aufmerksamkeits‑Mechanismus entlang der Batch‑Dimension nach Beam indiziert ist. Wenn man die Ausgabesequenzen umordnet, ohne den Cache mitzunehmen, entsteht ein Zustand‑Mismatch. Das Modell greift auf die falsche Historie zu.

Die Lösung ist `_reorder_cache()` – eine Methode, die `index_select` auf jedem vergangenen Schlüssel‑Wert‑Tensor aufruft, um sie gemäß der neuen Beam‑Reihenfolge neu zu indexieren, und anschließend die veralteten Tensoren freigibt.

Für die CPU ist das unkompliziert: Zeilenweise Typed‑Arrays schneiden. Für GPU‑Tensoren wird es nerviger – man muss die Daten asynchron herunterladen (`ort_tensor.getData(true)`), umordnen und wieder hochladen. Ich habe sowohl `index_select` (synchron, CPU) als auch `index_select_async` zu `tensor.js` hinzugefügt, um beide Pfade abzudecken.

Encoder‑Decoder‑Modelle (T5, BART) besitzen *zwei* Caches: Encoder‑ und Decoder‑Cache. Encoder‑PKVs ändern sich während der Decodierung nicht, sie werden unverändert weitergereicht. Nur Decoder‑PKVs müssen umgeordnet werden. Diese Unterscheidung falsch zu handhaben führt zu sehr schlechten Ausgaben, subtil – die Art von Fehler, die fast korrekt aussieht, bis man sie mit einer Referenz vergleicht.

## Diverse Beam Search: Der spaßige Teil

Diverse Beam Search fügt eine `diversity_penalty` hinzu, die verhindert, dass spätere Beam‑Gruppen Tokens auswählen, die bereits von früheren Gruppen gewählt wurden. Die Intuition lautet: Wenn alle Beams zum selben Output konvergieren, habt ihr den Hypothesenraum nicht wirklich erkundet.

Aus Implementierungssicht müssen die Gruppen *sequenziell* innerhalb jedes Decodierungsschritts verarbeitet werden, nicht parallel, weil jede Gruppe sehen muss, was die vorherigen Gruppen ausgewählt haben, bevor sie ihre eigenen Scores berechnet.

Die Struktur, zu der ich gekommen bin:

```
for each step:
  token_counts = {}
  for each group in groups:
    extract this group's beams and logits
    for each token selected by previous groups:
      logits[token] -= diversity_penalty * token_counts[token]
    score candidates, select top 2×group_size
    group_scorer.process(...)
    record newly selected tokens into token_counts
```

Die sequentielle Abhängigkeit hier ist real. Wenn man das parallelisiert, verliert man die Diversitätsgarantie. Ich war kurz versucht, das trotzdem zu batchen, und das wäre ein Fehler gewesen.

---

## Die `BeamHypotheses` Prioritätswarteschlange

Wenn ein Beam das EOS‑Token vor `max_length` erreicht, ist es „fertig“ — man kann es aber nicht einfach verwerfen oder sofort zurückgeben. Man fügt es einer begrenzten Prioritätswarteschlange namens `BeamHypotheses` hinzu.

Die Warteschlange hält bis zu `num_beams` abgeschlossene Sequenzen pro Batch‑Element, bewertet nach:

```
score = sum_logprobs / (length ^ length_penalty)
```

`length_penalty > 1.0` begünstigt längere Ausgaben; `< 1.0` begünstigt kürzere. Das Flag `early_stopping` steuert, ob der Beam als erledigt gilt, sobald die Warteschlange voll ist (`true`), niemals bis `max_length` (`"never"`), oder dann, wenn kein verbleibender Beam die schlechteste abgeschlossene Hypothese noch übertreffen könnte (`false`).

Der `false`‑Fall ist der interessante — er erfordert, zu verfolgen, ob irgendein noch aktive Beam die aktuelle schlechteste Hypothese noch übertreffen könnte, basierend auf dem maximal möglichen Rest‑Score. Das ist eine Beschneidungs‑Optimierung, die verhindert, dass bis `max_length` weitergelaufen wird, wenn bereits gute Hypothesen vorliegen.

Das befindet sich in `beam_search.js`, neue Datei, ca. 240 Zeilen insgesamt. Außerdem wird `BeamSearchScorer` exportiert, das die `BeamHypotheses`‑Instanzen über das Batch hinweg verwaltet und `finalize()` behandelt.

---

## Testen gegenüber der Python‑Referenz

Jedes nicht triviale Implementierungsdetail hat ein Gegenstück in HuggingFaces `transformers`‑Bibliothek. Darauf habe ich stark gebaut.

Die von mir hinzugefügte Test‑Suite deckt ab:

- Standard‑Beam‑Search für Encoder‑Decoder (T5) und Decoder‑Only (LLaMA‑artig)
- Diverse Beam Search mit `num_beam_groups=2, diversity_penalty=0.5`
- Beam‑Sampling mit `do_sample=true, top_k=10`
- `num_return_sequences > 1` — Verifikation, dass die Ausgabeform `[N, seq_len]` hat
- Korrekte Fehlermeldungen für inkompatible Kombinationen: CFG + Beam Search, Streaming + Beam Search, `num_return_sequences > num_beams`

Die Tests für „korrekte Fehlermeldungen“ werden oft unterschätzt. Sie dokumentieren die beabsichtigten Einschränkungen und verhindern, dass jemand stillschweigend falsche Ergebnisse erhält, wenn er versucht, Features zu kombinieren, die nicht zusammenpassen. (Ich weiß das, weil ich versucht habe, CFG und Beam Search während der Entwicklung zu kombinieren. Die Mathematik funktioniert nicht. Jetzt wird eine Ausnahme geworfen.)

---

## Was noch fehlt

EinigePunkte, die ich bewusst ausgelassen habe und mit `throws` markiert sind:

- **Diverse Beam Sampling** (`num_beam_groups > 1` + `do_sample`): Die Mathematik wird hier tatsächlich komplex. Das Standard‑Diverse‑Beam‑Search läuft sequenziell über die Gruppen; Sampling hinzuzufügen erfordert sorgfältiges Überlegen, wie die Diversitätsstrafe im stochastischen Modus angewendet wird. Es ist machbar, wurde aber noch nicht umgesetzt.
- **Streaming + Beam Search**: Beim Streaming werden Tokens ausgegeben, sobald sie generiert werden. Beam Search kennt per Definition erst nach mehreren Schritten, welche Sequenz am besten ist. Diese beiden Konzepte stehen grundlegend im Widerspruch. Man könnte den bislang besten Beam streamen, aber das ist ein separates Feature mit eigenen Design‑Fragen.

---

## Der Teil, über den niemand spricht: Open‑Source‑Latenz

Der Code funktioniert. Die Tests bestehen. Der vorhandene Test‑Suite ist sauber. Er liegt seit Monaten im Review.

So läuft das bei großen, populären Open‑Source‑Projekten eben. Das Hugging‑Face‑Team liefert schnell, die Issue‑Queue ist riesig, und ein Feature‑PR von etwa 1 000 Zeilen, das die Kern‑Generierungsschleife berührt, stellt ein nicht triviales Review‑Commitment dar. Sie haben in den Kommentaren reagiert und sich wirklich engagiert, wenn sie sich das anschauen. Ich beschwere mich nicht – ich dokumentiere lediglich.

Wenn du zu einem großen OSS‑Projekt beiträgst und einen schnellen Merge erwartest: Passe deine Erwartungen an. Ein paar Monate sind bei dieser Größe normal. Der Code funktioniert die ganze Zeit über in deinem Fork weiter.

---

## Was ich tatsächlich daraus gewonnen habe

Einige Dinge, die ich vorher nicht hatte:

1. **Ein wirkliches mentales Modell von Beam Search** — nicht die Lehrbuch‑Version, sondern die mit Randfällen. Wie KV‑Caches brechen. Warum die zweistufige Sortierung wichtig ist. Was `length_penalty` tatsächlich mit den Scores macht.

2. **Mehr Wertschätzung für Typed‑Array‑Mathematik in JS** — die Implementierung von `index_select` auf CPU‑Typed‑Arrays ist low‑level in einer Weise, die man im Web‑Code selten berührt. Es funktioniert, aber es ist nicht das, wofür JavaScript gedacht war, und das spürt man.

3. **Erneuter Respekt für die Python‑Referenzimplementierung.** Die HuggingFace‑Bibliothek `transformers` ist groß und manchmal etwas knifflig, aber die Beam‑Search‑Logik ist gut kommentiert und die Design‑Entscheidungen sind eindeutig beabsichtigt. Sie zu lesen war der schnellste Weg, zu verstehen, was ich eigentlich bauen sollte.

4. **Ein Patch in freier Wildbahn** — selbst wenn er noch nicht gemergt ist, existiert er, funktioniert und kann von der PR‑Branch verwendet werden. Das reicht.

Der TODO‑Kommentar, der das Ganze ausgelöst hat, ist aus meinem Fork verschwunden. Das ist auf eine stille, nerdige Art befriedigend.

Wenn du in JavaScript an Seq2Seq‑Arbeiten dran bist und heute ein korrektes Beam Search willst, [der PR ist öffentlich](https://github.com/huggingface/transformers.js/pull/1539).

---

¹ Ja, ich weiß, `num_beams=1` ist einfach Greedy Search. Der degenerierte Fall ist klar definiert.

² Encoder‑only‑Modelle (BERT usw.) erzeugen überhaupt keine Tokens, daher gilt das hier nicht für sie. Sie sind einfach nur Vibes.
````
