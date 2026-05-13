# Translation Candidate
- Slug: deathmatch-git-rebase-vs-merge
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 18.60
- Input tokens: 8360
- Output tokens: 8083
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.002609
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/it/index.mdx reports/i18n/deathmatch-git-rebase-vs-merge/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Scontro a morte:'
subTitle: Una domanda eterna...
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
## Scontro mortale: Git Rebase vs. (Squash) Merge!

Devo usare Rebase? O Squash Merge?

- È una preferenza personale?
  - _Risposta: No, quando è coinvolta una o più squadre! **Qualsiasi scelta impatterà sulla usabilità dell'altra!**_

### Perché questo argomento suscita un fervore religioso?

Alcuni ingegneri usano la conoscenza di git (& il terminale) come segnale del loro livello di abilità relativo. E qualsiasi pratica legata alla nostra identità/ego può essere impossibile da analizzare in modo imparziale, figurarsi cambiarla.

Altri fattori probabilmente includono Familiarità & Bias di Survivorship che possono ulteriormente appannare la nostra valutazione e le assunzioni.

<!-- Falsa convinzione del valore intrinseco dei processi di determinati progetti OSS. (Il Kernel Linux utilizza il rebase, e se non lo fai, **_Sei Anche Tu Un Vero Ingegnere?!_**) -->

### Domanda chiave: Qual è lo scopo di un commit Git?

1. Fai commit frequenti e anticipati? Usando un approccio di "punti di controllo" o backup?
   - Dove ogni azione viene registrata, anche gli esperimenti falliti? (es. `git commit -am "Updated deps" && git push`, ripetere regolarmente)
   - Forse i messaggi di commit sono meno importanti del codice per te?
1. Oppure i tuoi commit sono un'opera curata con attenzione, quasi un'opera d'arte?
   - Forse ogni commit rappresenta un'unità autonomo, atomica di lavoro? (es. `git add package.json && git commit -m "Updated deps"`)
   - O semplicemente non tolleri cronologie di commit "disordinate".
   - Le tue recensioni di PR coinvolgono spesso l'analisi commit per commit?

| 💡 Quali altri modelli mentali definiscono il tuo modo di vedere i commit? Fammelo sapere @justsml!

Stai utilizzando Git nel modo che fornisce il maggior valore a te, alla tua squadra e all'organizzazione?

<!-- Ciò che funziona per un progetto Open Source come Postgres o il Kernel Linux potrebbe non essere la scelta migliore per te o la tua squadra. -->

Dato che esistono mentalità molto diverse riguardo alla strategia dei commit, non è sorprendente che esista tanta confusione sul "modo corretto" di utilizzare Git.

### Scenario: Creare un tag di rilascio rivisto

Confrontiamo il processo per creare un tag di rilascio escludendo alcuni commit recenti su `main`.

![Git Tag Releasing from main with 2 feature branches](../git-branching-with-main-simplified.svg)

### Il modo Rebase

Modello mentale: "Voglio creare una versione alternativa di una storia esistente. (e.g. Ho commesso un errore 16 merges fa, e potrei aver bisogno di un controllo fine-grained per correggerlo. Inoltre, potrei rimanere bloccato in un ciclo sembra senza fine di conflitti & `--continue`.)"

1.  Ottieni l'ultimo: `git checkout main` && `git pull`
2.  Crea nuovo ramo: `git checkout -b release/hot-newness-and-stuff`
3.  Avvia il rebase interattivo & includi il riferimento git per dove vuoi tornare indietro nel tempo. `git rebase -i HEAD~6` (Nota: `HEAD~6` è l'abbreviazione di `6 commit fa`)
4.  Elimina i commit desiderati cambiando il loro prefisso in `drop`. Salva e chiudi l'editor.
5.  Risolvi i conflitti di merge, `git add .` && `git rebase --continue` (NON usare `git commit`).
6.  Ripeti il passo precedente fino al completamento.
7.  Etichetta/pubblica seguendo il processo corrente. Esempio `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

#### Pro

- 🔌 Potere assoluto. Puoi modificare la cronologia.
  <!-- - 🎭 Pratica le tue abilità di Engineering Theater. -->

#### Contro

- 😰 Potere assoluto. Puoi modificare la cronologia. (Ok, un Pro e un Con...)
- 🔂 Puoi finire in un ciclo sembra senza fine di conflitti & `--continue`. (A volte anche con `git rerere`)
- 🙀 Rompe funzionalità chiave di collaborazione: commenti sui PR persi/orfani. Sgarbato.
- 🖇️ I collegamenti permanenti possono non essere così permanenti.

### Il modo (Squash) Merge

Modello mentale: "Voglio un rilascio personalizzato, partendo da un punto specifico e includendo qualsiasi branch desiderato."

1.  Aggiorna: `git checkout main` && `git pull`
2.  Crea un nuovo branch: `git checkout -b release/hot-newness-and-stuff`
3.  Fonde i branch o commit desiderati: `git merge --no-ff feature/hot-newness bug/fix-123` (usa il flag `--no-ff` quando possibile.)
4.  Risolvi eventuali conflitti di merge (se si verificano.)
5.  Etichetta/pubblica seguendo il processo corrente. Esempio `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

#### Pro

- 💪 Processo più semplice, meno conflitti complessivi, utilizza conoscenze già esistenti sui comandi git.
- 🚀 Ti permette di pensare a un livello più alto di PR/branch, ignorando la granularità dei commit (a meno che non necessario.)
- 🦺 Non distruttivo. Puoi tornare indietro e/o creare nuovi branch in qualsiasi momento.
- 🎥 Mantiene i commit esistenti e i loro messaggi, riducendo il rumore da 'blame'.

#### Contro

- 🔐 Più difficile modificare i messaggi dei commit.
- 🤐 Più difficile nascondere il tuo lavoro.

### Conclusione

Alla fine del giorno, **un processo più semplice con meno rischi dovrebbe vincere.**

<!-- **Squash merge** è il vincitore evidente qui. È **più semplice** e **meno propenso agli errori**. Lascia anche **intatto lo storico dei commit esistenti**. Questo è un **grande vantaggio** per **collaborazione** e **revisione del codice**. -->

<!-- Include a diagram of a rebase flow with 2 feature branches -->

Anche se i _Rebasers_ hanno davvero modi per risolvere (o evitare) i loro problemi, il fatto rimane: **alla fine avrai bisogno di una cintura nera in git fu.** (Ad esempio, anche un umile `git push` può affrontare complessità aggiuntive: era `git push --force` o `git push --force-with-lease`? Perché preoccuparsene affatto?)

C'è un altro motivo per cui **il rebase** per creare una storia rivista **sarà sempre in svantaggio** rispetto a **`git merge ...`.** Un `git merge` permette al CLI di `git` di applicare algoritmi avanzati per evitare conflitti analizzando la HEAD di ogni branch.

Questo può essere più efficiente perché ogni merge considera solo lo stato più recente di ogni branch desiderato, mentre **il rebase deve riprodurre (o eliminare) la cronologia dei commit nell'ordine specificato**. Questo **limita la capacità di `git` di ottimizzare** il merge, poiché **confronta solo due commit alla volta**.

In definitiva, **il rebase ti costringerà occasionalmente a rivedere commit e conflitti obsoleti** – anche se sai che sono stati rimossi o risolti da tempo.

### Riepilogo

- 💃 Risposta: **SQUASH MERGE** le tue PR su `main`.
  - La cronologia del tuo branch sarà comunque disponibile se necessario, e `main` rimarrà relativamente "pulita".
- _🔤 Committa Sempre!_
  - In >95% dei progetti aziendali, l'approccio di "backup" è preferibile a quello di "arte scolpita". Nel tempo, il significato dei tuoi messaggi di commit si offuscherà più velocemente rispetto alla logica e ai test del codice, che invece manterranno la loro rilevanza.

<!--

#### Bonus: Consiglio per le Release

Hai mai avuto bisogno solo di un file o di poche cartelle da un branch? Senza la cronologia dei commit?

- È possibile utilizzare il separatore speciale "--" con `git checkout` per rimanere nel branch corrente mentre si copiano i file specificati:  
- `git checkout feature/half-a-feature **--** <percorso di una cartella o file>`  
- Assicurati di aver committato eventuali modifiche che desideri conservare prima, poiché questo sovrascriverà eventuali modifiche locali.
````
