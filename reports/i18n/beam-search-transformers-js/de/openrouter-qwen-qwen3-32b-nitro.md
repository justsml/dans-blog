# Translation Candidate
- Slug: beam-search-transformers-js
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-04-16--beam-search-transformers-js/de/index.mdx
- Validation: passed
- Runtime seconds: 34.11
- Input tokens: 11527
- Output tokens: 10893
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.003536
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Implementierung von Beam Search in Transformers.js
subTitle: ''
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
> CW: Dieser Beitrag enthält technischen Jargon. Also, wenn Sie bei Erwähnung von `softmax` oder `log probs` sofort versucht sind, `Max` zu sagen, er solle aufhören mit seinen `probs`, dann überspringen Sie diesen Beitrag vielleicht.

---

## Das Problem: `num_beams` war ein Schwindel

Tief in der Generierungsschleife von `transformers.js` gab es eine lange bestehende Kommentarzeile:

```js
// TODO: Support beam search
```

Direkt darunter befand sich eine `break`-Anweisung, die die Schleife nach dem ersten Token stumm verließ. Jede Modellkonfiguration, die mit `num_beams > 1` ausgeliefert wurde – T5, BART, Whisper – erhielt stattdessen stumm die greedy Decodierung. Keine Warnung. Kein Fehler. Nur... falsche Ausgabe.

Ich stieß auf dieses Problem, während ich einen Zusammenfassungspipeline testete und mich fragte, warum meine Ergebnisse so degradiert waren im Vergleich zum Python-Referenzmodell. Ich verfolgte den Fehler bis zu `modeling_utils.js`, sah das TODO und machte den Fehler, zu denken: „Wie schwer kann das schon sein?“

Die Antwort: ziemlich schwer, aber in interessanter Weise.

## Was Beam Search tatsächlich ist

Wer hat nicht 

Die Greedy-Decodierung wählt bei jedem Schritt das Token mit der höchsten Wahrscheinlichkeit aus. Einfach, schnell, häufig suboptimal – das erste Wort, das einem einfällt, ist nicht immer der beste Start für einen Satz.

Beam Search hält stattdessen `num_beams` Kandidaten-sequenzen gleichzeitig am Laufen, erweitert jede durch das gesamte Vokabular bei jedem Schritt und schneidet dann auf die Top-`num_beams` zurück, basierend auf der kumulativen Log-Wahrscheinlichkeit. Es ist wie eine begrenzte Breitensuche durch den Token-Raum.

Das Ergebnis sind global besser abgestimmte Sequenzen, mit einem Kostenfaktor von `num_beams`× der Rechenleistung.

Drei Varianten existieren:

- **Standard-Beam Search** – deterministisch, wählt argmax-Kandidaten aus, beste Gesamtfolge  
- **Diverse Beam Search** – teilt Strahlen in Gruppen auf, bestraft Token, die bereits von früheren Gruppen ausgewählt wurden, damit Ihre Ausgabekandidaten nicht alle dasselbe aussagen  
- **Beam Sampling** – stochastisch, wendet top-k + softmax + Zufallsauswahl innerhalb des Beam-Frameworks an  

Alle drei sind nun im PR enthalten.

---

## Die Architekturentscheidung, mit der ich tatsächlich zu kämpfen hatte

Die bestehende Codebasis hatte eine `BeamSearchSampler`-Klasse. Sie schien relevant. Doch es gab eine subtile Falle: Sie gab nur die oberen `num_beams` Token pro Strahl zurück. Das klingt zunächst richtig, bis man erkennt, dass dies für echten Beam Search nicht ausreicht.  

Echter Beam Search muss **alle `num_beams × vocab_size` Kandidaten pro Batch-Element** betrachten, um die global besten Fortsetzungen zu finden. Man kann nicht einfach die oberen Token jedes Strahls isoliert betrachten – man muss sie **über alle Strahlen gemeinsam** rangieren.  

Daher habe ich den bestehenden Sampler komplett umgangen. Ich berechnete `log_softmax` direkt auf den verarbeiteten Logits, fügte kumulierte Strahlwerte hinzu und durchführte eine zweistufige Sortierung im kombinierten Kandidatenraum. Klarere Mathematik, korrekte Semantik.  

Die `BeamSearchSampler`-Klasse existiert nach wie vor, unverändert, und bleibt nützlich für das, wofür sie ursprünglich gedacht war. Dies ist einer dieser Fälle, in denen der „offensichtliche“ Wiederverwendungspfad in die falsche Richtung führt.  

---  

## Der ärgerlichste Bug: KV-Cache-Umordnung

Wenn die Beamensuche Sequenzen zurücktreibt, kürzt sie nicht nur Tokens – sie *ordnet um*, welche Beams überleben. Beam 3 könnte die beste Fortsetzung liefern und geklont werden; Beams 0 und 2 könnten verworfen werden.  

Das Problem liegt darin, dass der Schlüssel-Wert-Cache der Aufmerksamkeitsmechanik des Transformers entlang der Batch-Dimension nach Beam indiziert ist. Wenn Sie die Ausgabesequenzen umordnen, ohne den Cache umzustellen, entsteht ein ungerechter Zustand. Das Modell beachtet die falsche Vergangenheit.  

Die Lösung ist `_reorder_cache()` – eine Methode, die `index_select` auf jedem vergangenen Schlüssel-Wert-Tensor aufruft, um sie entsprechend der neuen Beam-Ordnung neu zu indizieren, und anschließend die veralteten Tensoren entsorgt.  

Für die CPU ist das geradlinig: typisierte Arrays nach Zeilen schneiden. Für GPU-Tensoren wird es ärgerlicher – Sie müssen die Daten asynchron herunterladen (`ort_tensor.getData(true)`), umordnen und erneut hochladen. Ich habe sowohl `index_select` (synchron, CPU) als auch `index_select_async` zu `tensor.js` hinzugefügt, um beide Pfade abzudecken.  

Encoder-Decoder-Modelle (T5, BART) haben *zwei* Caches: Encoder und Decoder. Encoder-PKVs ändern sich während der Decodierung nicht und durchlaufen unverändert. Nur Decoder-PKVs benötigen eine Umordnung. Falsch verstandene Unterschiede erzeugen subtil falsche Ausgaben – die Art von Fehlern, die fast richtig aussehen, bis man sie mit einer Referenz vergleicht.

## Diverse Beam Search: Die spannende Variante

Diverse Beam Search fügt eine `diversity_penalty` hinzu, die späteren Beam-Gruppen davon abhält, Token auszuwählen, die bereits von früheren Gruppen ausgewählt wurden. Die Intuition: Wenn alle deine Beams auf dieselbe Ausgabe konvergieren, hast du den Hypothesenraum nicht wirklich erforscht.

Implementierungstechnisch müssen Gruppen *sequenziell* innerhalb jedes Decodierungsschritts verarbeitet werden, nicht parallel, weil jede Gruppe sehen muss, was frühere Gruppen ausgewählt haben, bevor sie ihre eigenen Scores berechnet.

Die Struktur, die ich am Ende verwendet habe:

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

Die sequenzielle Abhängigkeit hier ist real. Wenn du es parallelisierst, verlierst du die Diversitätsgarantie. Ich war kurz geneigt, dies trotzdem zu batchen, und das wäre ein Fehler gewesen.

## Die `BeamHypotheses` Prioritätswarteschlange

Wenn ein Beam vor `max_length` das EOS-Token erreicht, gilt er als „abgeschlossen“ – man kann ihn aber nicht einfach verworfen oder unmittelbar zurückgegeben werden. Stattdessen wird er in eine begrenzte Prioritätswarteschlange namens `BeamHypotheses` eingefügt.

Die Warteschlange speichert bis zu `num_beams` abgeschlossene Sequenzen pro Batch-Element, bewertet nach folgender Formel:  
```
score = sum_logprobs / (length ^ length_penalty)
```

Ein `length_penalty > 1.0` belohnt längere Ausgaben; `< 1.0` belohnt kürzere. Der `early_stopping`-Flag steuert, ob der Beam als abgeschlossen gilt, sobald die Warteschlange voll ist (`true`), nie bis `max_length` (`"never"`) oder abgeschlossen wird, sobald keine aktive Beam mehr den schlechtesten abgeschlossenen Hypothese übertrumpfen könnte (`false`).

Der Fall `false` ist besonders interessant – hier muss nachverfolgt werden, ob irgendeine aktive Beam noch den aktuellen schlechtesten Hypothese übertrumpfen könnte, basierend auf dem maximal möglichen verbleibenden Score. Es handelt sich um eine Optimierung zur Reduzierung der Suche, die verhindert, bis `max_length` durchzulaufen, wenn bereits gute Hypothesen vorliegen.

Dieser Code befindet sich in `beam_search.js`, neues Datei, ca. 240 Zeilen insgesamt. Es exportiert auch `BeamSearchScorer`, der die `BeamHypotheses`-Instanzen im Batch verwaltet und `finalize()` handhabt.

## Testen gegen die Python-Referenz

Jeder nicht-triviale Implementierungsdetail hier hat einen Python-Counterpart in der HuggingFace-Bibliothek `transformers`. Ich habe mich stark darauf gestützt.

Das Test-Suite, die ich hinzugefügt habe, umfasst:

- Standard-Beam-Search für Encoder-Decoder (T5) und Decoder-only (LLaMA-ähnlich)
- Diverse Beam-Search mit `num_beam_groups=2, diversity_penalty=0.5`
- Beam-Sampling mit `do_sample=true, top_k=10`
- `num_return_sequences > 1` — Überprüfung, dass die Ausgabegröße `[N, seq_len]` ist
- Korrekte Fehlerausgaben für inkompatible Kombinationen: CFG + Beam-Search, Streaming + Beam-Search, `num_return_sequences > num_beams`

Die Tests für korrekte Fehlerausgaben werden unterschätzt. Sie dokumentieren die bewussten Einschränkungen und verhindern, dass jemand versehentlich falsche Ausgaben erhält, wenn er Features kombiniert, die nicht kombinierbar sind. (Ich kenne das Problem, weil ich während der Entwicklung versucht habe, CFG und Beam-Search zu kombinieren. Die Mathematik passt nicht. Es wirft jetzt einen Fehler.)

## Was fehlt noch

Einige Dinge, die ich explizit ausgelassen habe, gekennzeichnet mit `throws`:

- **Diverser Beam-Sampling** (`num_beam_groups > 1` + `do_sample`): Die Mathematik wird hier wirklich komplex. Der Standard-Beam-Suche ist sequenziell über Gruppen verteilt; das Hinzufügen von Sampling dazu erfordert sorgfältige Überlegungen, wie die Diversitätsstrafe im stochastischen Modus angewendet wird. Es ist machbar, wurde aber nicht umgesetzt.
- **Streaming + Beam-Suche**: Streaming gibt Token frei, sobald sie generiert werden. Beam-Suche kennt definitionsgemäß nicht die beste Sequenz, bis mehrere Schritte abgeschlossen sind. Diese Konzepte stehen grundlegend im Konflikt. Man könnte den besten Beam bis dato streamen, aber das ist eine andere Funktionalität mit eigenen Designfragen.

---

## Der Teil, über den niemand spricht: Open-Source-Latenz

Der Code funktioniert. Die Tests bestehen. Das bestehende Testframework ist sauber. Der Pull Request lag nun schon seit Monaten in der Code-Review-Queue.  

Das ist einfach so, wenn man in großen, beliebten Open-Source-Projekten arbeitet. Das Hugging Face-Team entwickelt schnell, die Issue-Queue ist riesig, und ein ~1000-Zeilen-Funktions-PR, der die zentrale Generierungsschleife berührt, ist eine nicht-triviale Code-Review-Verpflichtung. Sie haben auf Kommentare reagiert und sich aktiv darum gekümmert, als sie es betrachtet haben. Ich beschwere mich nicht – ich dokumentiere.  

Wenn Sie an einem großen OSS-Projekt mitarbeiten und eine schnelle Merging-Entscheidung erwarten: Passen Sie Ihre Erwartungen an. Einige Monate sind normal für etwas dieser Größe. Der Code funktioniert die ganze Zeit in Ihrem Fork weiterhin.  

---  

## Was ich tatsächlich daraus mitgenommen habe  

Ein paar Dinge, die ich vorher nicht hatte:

1. **Ein realistisches Mentalszenario für Beam Search** – nicht die Lehrbuchversion, sondern die mit Randfällen. Wie KV-Caches zerstört werden. Warum die zweistufige Sortierung wichtig ist. Was die `length_penalty` tatsächlich mit den Scores macht.  

2. **Mehr Anerkennung für die Mathematik mit typisierten Arrays in JS** – die Implementierung von `index_select` auf CPU-typisierten Arrays ist auf eine Weise low-level, die man in Web-Code selten berührt. Es ist in Ordnung, aber es ist nicht das, wofür JavaScript ursprünglich gedacht war, und man spürt das.  

3. **Erneute Achtung für die Python-Referenzimplementierung.** Die HuggingFace `transformers`-Bibliothek ist groß und manchmal verworren, aber die Beam Search-Logik ist gut kommentiert und die Designentscheidungen sind klar beabsichtigt. Das Lesen davon war der schnellste Weg, um zu verstehen, was ich tatsächlich bauen sollte.  

4. **Ein Patch in der realen Welt** – selbst wenn er noch nicht merged wurde, existiert er, funktioniert er und Menschen können ihn vom PR-Zweig aus nutzen. Das ist ausreichend.  

Der TODO-Kommentar, der dies alles begonnen hat, ist aus meinem Fork verschwunden. Das ist auf eine stille, nerdige Weise befriedigend.  

Wenn Sie an seq2seq-Arbeiten in JavaScript tätigen und heute eine ordentliche Beam Search benötigen, [ist der PR öffentlich](https://github.com/huggingface/transformers.js/pull/1539).

¹ Ja, ich weiß, dass `num_beams=1` einfach der Greedy-Suche entspricht. Der entartete Fall ist gut definiert.  
² Encoder-only-Modelle (BERT usw.) generieren überhaupt keine Token, also gilt all das hier nicht für sie. Sie sind einfach nur Stimmung.
````
