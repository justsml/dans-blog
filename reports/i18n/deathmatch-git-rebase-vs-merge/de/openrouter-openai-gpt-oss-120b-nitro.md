# Translation Candidate
- Slug: deathmatch-git-rebase-vs-merge
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/de/index.mdx
- Validation: passed
- Runtime seconds: 8.58
- Input tokens: 8650
- Output tokens: 2359
- Thinking tokens: unknown
- Cached input tokens: 3200
- Cache write tokens: 0
- Estimated cost: $0.000762
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Deathmatch: Git Rebase vs. Merge'
subTitle: Eine zeitlose Frage…
date: '2023-08-27'
modified: '2024-07-28'
tags:
  - engineering
  - git
  - rebase
  - merge
category: Thoughts
subCategory: Git
cover: ../casper-johansson-GBHnQXbY2Ts-unsplash-cropped.webp
cover_mobile: ../w300_casper-johansson-GBHnQXbY2Ts-unsplash-cropped.webp
cover_icon: ../icon_casper-johansson-GBHnQXbY2Ts-unsplash-cropped.webp
---
## Deathmatch: Git Rebase vs. (Squash) Merge!

Soll ich Rebase benutzen? Oder Squash‑Merge?

- Ist das eine persönliche Vorliebe?
  - _Antwort: Nicht, wenn ein oder mehrere Teams beteiligt sind! **Beide Entscheidungen beeinflussen die Usability** des jeweils anderen!_

### Warum löst dieses Thema religiösen Eifer aus?

Einige Ingenieure nutzen ihr Wissen über Git (& das Terminal) als Signal für ihr relatives Skill‑Level. Und jede Praxis, die mit unserer Identität/Ego verknüpft ist, lässt sich kaum noch objektiv analysieren, geschweige denn ändern.

Weitere Faktoren sind wahrscheinlich Vertrautheit und Survivorship‑Bias, die unsere eigene Bewertung und Annahmen zusätzlich verwässern.

<!-- Misplaced belief in theinherent virtue of certain OSS projects' processes. (The Linux Kernel uses rebasing, and if you don't, **_ArE yOu EvEn A rEaL eNgInEeR?!_**) -->

### Schlüssel‑Frage: Was ist der Zweck eines Git‑Commits?

1.  Committest du früh und häufig? Mit einer „Checkpoint‑“ oder Backup‑Mentalität?
    - Wo alles festgehalten wird, sogar Fehlstarts und Experimente? (z. B. `git commit -am "Updated deps" && git push`, regelmäßig wiederholen)
    - Vielleicht sind dir Commit‑Nachrichten weniger wichtig als der Code selbst?
2.  Oder sind deine Commits ein sorgfältig kuratiertes, skulpturales Kunstwerk?
    - Vielleicht ist jeder Commit eine eigenständige, atomare Arbeitseinheit? (z. B. `git add package.json && git commit -m "Updated deps"`)
    - Oder du kannst „unordentliche“ Commit‑Logs einfach nicht ertragen?
    - Gehen deine PR‑Reviews häufig commit‑für‑commit durch?

| 💡 Welche anderen mentalen Modelle bestimmen, wie du Commits siehst? Lass es mich wissen @justsml!

Betrachtest du Git auf eine Weise, die **den größten Nutzen** für dich, dein Team und deine Organisation liefert?

<!-- What makes sense for an Open Source project like Postgres, or the Linux Kernel, may not be the best choice for you or your team. -->

Given that there are very different mindsets around commit strategy, it's no wonder there's so much confusion about the "right" way to use git.

### Szenario: Ein überarbeitetes Release‑Tag erstellen

Vergleichen wir den Prozess, ein Tag‑Release zu erzeugen, bei dem einige aktuelle Commits auf `main` ausgelassen werden.

![Git Tag Releasing from main with 2 feature branches](../git-branching-with-main-simplified.svg)

### Der Rebase‑Weg

Mentales Modell: „Ich will eine alternative Version einer bestehenden Historie erzeugen. (z. B. ich habe vor 16 Merges einen Fehler gemacht und brauche feinkörnige Kontrolle, um ihn zu korrigieren. Außerdem kann man leicht in einer scheinbar endlosen Schleife aus Konflikten & `--continue` stecken.)“

1.  Aktuell holen: `git checkout main` && `git pull`  
2.  Neuen Branch anlegen: `git checkout -b release/hot-newness-and-stuff`  
3.  Interaktiven Rebase starten und den Git‑Ref angeben, zu dem Sie zurückgehen wollen. `git rebase -i HEAD~6` (Hinweis: `HEAD~6` ist die Kurzschreibweise für „6 Commits zurück“)  
4.  Gewünschte Commits entfernen, indem Sie deren Präfix zu `drop` ändern. Editor speichern und schließen.  
5.  Merge‑Konflikte beheben, `git add .` && `git rebase --continue` (NICHT `git commit` ausführen).  
6.  Vorherigen Schritt wiederholen, bis alles fertig ist.  
7.  Taggen/pushen nach dem üblichen Verfahren. Beispiel `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

#### Pros

- 🔌 Absolute Kontrolle. Sie können die Historie ändern.  
  <!-- - 🎭 Üben Sie Ihre Engineering‑Theater‑Fähigkeiten. -->

#### Cons

- 😰 Absolute Kontrolle. Sie können die Historie ändern. (Ok, ein Pro & Con…)  
- 🔂 Sie können in einer scheinbar endlosen Schleife aus Konflikten & `—-continue` stecken. (Manchmal sogar mit `git rerere`)  
- 🙀 Zerstört zentrale Kollaborations‑Features: verlorene/verwaiste PR‑Kommentare. Unhöflich.  
- 🖇️ Permalinks können weniger dauerhaft werden.

### Der (Squash‑)Merge‑Weg

Mentalmodell: „Ich möchte ein individuelles Release, beginnend an einem bestimmten Punkt, und dabei beliebige gewünschte Branch(es) einbeziehen.“

1.  Aktuell holen: `git checkout main` && `git pull`
2.  Neuen Branch anlegen: `git checkout -b release/hot-newness-and-stuff`
3.  Gewünschte Branches und/oder Commits mergen: `git merge --no-ff feature/hot-newness bug/fix-123` (nach Möglichkeit den `--no-ff`‑Schalter verwenden.)
4.  Merge‑Konflikte beheben (falls welche auftreten.)
5.  Taggen/pushen nach dem üblichen Prozess. Beispiel `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

#### Vorteile

- 💪 Weniger Prozess, insgesamt weniger Konflikte und nutzt vorhandenes Git‑Wissen.
- 🚀 Ermöglicht das Denken auf einer höheren PR/Branch‑Ebene, ohne sich um Commit‑Granularität zu kümmern (außer wenn nötig).
- 🦺 Nicht destruktiv. Man kann jederzeit zurückgehen und/oder neue Branches erstellen.
- 🎥 Bewahrt bestehende Commits & Messages als Ganzes, was zu weniger „Blame“-Rauschen führt.

#### Nachteile

- 🔏 Änderungen an Commit‑Messages sind schwieriger.
- 🤐 Arbeit zu verbergen ist schwieriger.

### Fazit

Letztendlich sollte ein einfacherer Prozess mit geringerem Risiko die Oberhand gewinnen.

<!-- **Squash merge** is the clear winner here. It's **simpler** and **less error-prone**. It also **leaves the existing commit history intact**. This is a **huge win** for **collaboration** and **code review**. -->

<!-- Include a diagram of a rebase flow with 2 feature branches -->

Obwohl _Rebaser_ tatsächlich Wege haben, ihre Probleme zu lösen (oder zu umgehen), bleibt die **Tatsache:** Sie werden irgendwann einen Schwarzgurt in Git‑Fu benötigen. (z. B. kann selbst ein einfacher `git push` zusätzliche Komplexität mit sich bringen: war es `git push --force` oder `git push --force-with-lease`? Warum sich überhaupt damit auseinandersetzen?)

Ein weiterer Grund, warum **Rebasing**, um eine überarbeitete Historie zu erzeugen, **immer im Nachteil** gegenüber **`git merge ...`** steht: Ein `git merge` lässt das `git`‑CLI fortgeschrittene Algorithmen anwenden, um Konflikte zu vermeiden, indem es die HEADs beider Branches analysiert.

Das kann schlauer sein, weil jeder Merge nur den aktuellen Zustand jedes gewünschten Branches berücksichtigt, während **Rebasing die Commit‑Historie in der angegebenen Reihenfolge neu abspielen (oder verwerfen) muss**. Das **schränkt die Optimierungs‑Möglichkeiten von `git` beim Merge ein**, da **immer nur 2 Commits** gleichzeitig verglichen werden.

Letztlich bedeutet **Rebasing**, dass man gelegentlich wieder auf irrelevante alte Commits und Konflikte stößt – selbst wenn man weiß, dass diese bereits entfernt oder gelöst wurden.

### Zusammenfassung

- 💃 Antwort: **SQUASH MERGE** deine PRs auf `main`.
  - Die Branch‑Historie bleibt bei Bedarf erhalten, und `main` bleibt relativ „sauber“.
- _🔤 Always Be Committing!_
  - In >95 % der Unternehmensprojekte ist die „Backup‑Mentalität“ der „skulptierten Kunst‑Mentalität“ vorzuziehen. Mit der Zeit verblassen die Bedeutungen deiner Commit‑Nachrichten deutlich schneller, als der Code selbst – seine Logik und Tests behalten ihre Relevanz.

- Sie können den speziellen „--“-Separator mit `git checkout` verwenden, um im aktuellen Branch zu bleiben und die angegebenen Dateien zu kopieren:
- `git checkout feature/half-a-feature **--** <folder or file path>`
- Stellen Sie sicher, dass Sie alle Änderungen, die Sie behalten wollen, vorher committen, da dies lokale Änderungen überschreibt.
-->
````
