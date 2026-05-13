# Translation Candidate
- Slug: deathmatch-git-rebase-vs-merge
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/ru/index.mdx
- Validation: passed
- Runtime seconds: 3.63
- Input tokens: 8410
- Output tokens: 2274
- Thinking tokens: unknown
- Cached input tokens: 3456
- Cache write tokens: 0
- Estimated cost: $0.000737
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Схватка: Git Rebase vs. Merge'
subTitle: Вечный вопрос…
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

Should I Rebase? Or Squash Merge?

- Is it a personal preference?
  - _Answer: Not when one or more teams are involved! **Either choice will impact usability** of the other!_

### Почему эта тема вызывает религиозный фанатизм?

Некоторые инженеры используют знание git (и терминала) как показатель своего относительного уровня навыков. Любая практика, тесно связанная с нашей идентичностью/эго, может быть невозможна для объективного анализа, не говоря уже о её изменении.

Другие факторы, вероятно, включают знакомство и выживаемый отбор, которые могут ещё сильнее мутировать нашу собственную оценку и предположения.

<!-- Misplaced belief in the inherent virtue of certain OSS projects' processes. (The Linux Kernel uses rebasing, and if you don't, **_ArE yOu EvEn A rEaL eNgInEeR?!_**) -->

### Ключевой вопрос: Какова цель git‑коммита?

1.  Вы делаете коммиты часто и рано? С менталитетом «контрольной точки» или резервной копии?
    - Где всё фиксируется, даже неудачные попытки и эксперименты? (например, `git commit -am "Updated deps" && git push`, повторять регулярно)
    - Возможно, сообщения коммитов для вас менее важны, чем сам код?
2.  Или ваши коммиты — тщательно отобранные, вылепленные произведения искусства?
    - Может, каждый коммит — автономная, атомарная единица работы? (например, `git add package.json && git commit -m "Updated deps"`)
    - Или вам просто невыносимы «беспорядочные» журналы коммитов?
    - Часто ли ваши PR‑ревью включают просмотр коммит за коммитом?

| 💡 Какие ещё ментальные модели определяют ваш взгляд на коммиты? Дайте знать @justsml!

Вы рассматриваете git так, чтобы **приносить максимальную ценность** вам, вашей команде и организации?

<!-- What makes sense for an Open Source project like Postgres, or the Linux Kernel, may not be the best choice for you or your team. -->

Given that there are very different mindsets around commit strategy, it's no wonder there's so much confusion about the "right" way to use git.

### Scenario: Create a revised release tag

Let us compare the process of creating a tag release excluding some recent commits on `main`.

![Git Tag Releasing from main with 2 feature branches](../git-branching-with-main-simplified.svg)

### The Rebase Way

Mental model: "I want to create an alternate version of an existing history. (e.g. I made an oopsie 16 merges ago, and may need fine-grained control to correct it. Also, might get stuck in a seemingly endless cycle of conflict & `--continue`.)"

1.  Получить последние изменения: `git checkout main` && `git pull`
2.  Создать новую ветку: `git checkout -b release/hot-newness-and-stuff`
3.  Запустить интерактивный ребейз и указать git‑ref, откуда откатываться. `git rebase -i HEAD~6` (Примечание: `HEAD~6` — это сокращение git‑ref для «6 коммитов назад»)
4.  Удалить нужные коммиты, заменив их префикс на `drop`. Сохранить и закрыть редактор.
5.  Разрешить конфликты слияния, `git add .` && `git rebase --continue` (НЕ выполнять `git commit`).
6.  Повторять предыдущий шаг, пока не закончится.
7.  Тегировать/отправлять по текущему процессу. Пример `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

#### Плюсы

- 🔌 Абсолютная гибкость. Можно менять историю.
  <!-- - 🎭 Practice your Engineering Theater skills. -->

#### Минусы

- 😰 Абсолютная гибкость. Можно менять историю. (Да, и плюс, и минус…)
- 🔂 Можно попасть в, казалось бы, бесконечный цикл конфликтов и `—-continue`. (Иногда даже с `git rerere`)
- 🙀 Нарушает ключевые возможности совместной работы: теряются/становятся сиротами комментарии PR. Невежливо.
- 🖇️ Постоянные ссылки могут стать менее надёжными.

### Способ (Squash) Merge

Ментальная модель: «Мне нужен кастомный релиз, начиная с определённой точки и включающий любые нужные ветки».

1.  Получить последние изменения: `git checkout main` && `git pull`
2.  Создать новую ветку: `git checkout -b release/hot-newness-and-stuff`
3.  Слить нужные ветки и/или коммиты: `git merge --no-ff feature/hot-newness bug/fix-123` (по возможности используйте флаг `--no-ff`.)
4.  Исправить любые конфликты слияния (если они возникнут.)
5.  Тегировать/отправить, используя текущий процесс. Пример `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

#### Плюсы

- 💪 Меньше процессов, меньше конфликтов в целом, и используется уже знакомый набор команд git.
- 🚀 Позволяет мыслить на более высоком уровне PR/ветки, игнорируя гранулярность отдельных коммитов (если только это не требуется.)
- 🦺 Неразрушительно. Можно вернуться назад и/или создать новые ветки в любой момент.
- 🎥 Сохраняет существующие коммиты и сообщения целиком, что уменьшает «шум» blame.

#### Минусы

- 🔏 Сложнее изменить сообщения коммитов.
- 🤐 Сложнее скрыть свою работу.

### Заключение

В конечном счёте, **проще процесс с меньшим риском должен победить**.

<!-- **Squash merge** is the clear winner here. It's **simpler** and **less error-prone**. It also **leaves the existing commit history intact**. This is a **huge win** for **collaboration** and **code review**. -->

<!-- Include a diagram of a rebase flow with 2 feature branches -->

Хотя у _Rebasers_ действительно есть способы решить (или обойти) свои проблемы, **факт остаётся: в конце концов вам понадобится чёрный пояс по git‑фу.** (например, даже скромный `git push` может обернуться дополнительной сложностью: был ли это `git push --force` или `git push --force-with-lease`? Зачем вообще с этим разбираться?)

Есть ещё одна причина, почему **rebasing** для создания пересмотренной истории **всегда будет в невыгодном положении** по сравнению с **`git merge …`**. `git merge` позволяет CLI `git` применять продвинутые алгоритмы для избежания конфликтов, анализируя HEAD каждой ветки.

Это может работать умнее, потому что каждый merge учитывает только последнее состояниекаждой нужной ветки, тогда как **rebasing вынужден переигрывать (или отбрасывать) историю коммитов в заданной последовательности**. Это **ограничивает возможность `git` оптимизировать** слияние, поскольку он **сравнивает только 2 коммита** за раз.

В итоге **rebasing заставит вас время от времени вновь сталкиваться с устаревшими коммитами и конфликтами**, даже если вы знаете, что они уже удалены или решены.

### Итоги

- 💃 Ответ: **SQUASH MERGE** ваши PR‑ы в `main`.
  - История вашей ветки сохранится при необходимости, а `main` останется относительно «чистым».
- _🔤 Всегда коммить!_
  - В более чем 95 % корпоративных проектов предпочтительнее «резервный» подход, а не «скульптурный». Со временем смысл ваших сообщений коммитов будет стираться гораздо быстрее, чем логика кода и тесты, которые сохранят свою значимость.

- Вы можете использовать специальный разделитель `--` с `git checkout`, чтобы оставаться в текущей ветке и копировать указанные файлы:
- `git checkout feature/half-a-feature **--** <путь к папке или файлу>`
- Сначала убедитесь, что все изменения, которые нужно сохранить, закоммичены, иначе команда перезапишет локальные изменения.
````
