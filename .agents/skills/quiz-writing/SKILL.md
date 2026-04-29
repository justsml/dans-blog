---
name: quiz-writing
description: Write engaging, educational quiz posts for DanLevy.net
---
# Quiz Writing Skill

Write engaging, educational quiz posts for DanLevy.net — an Astro 5 static blog with interactive React quiz components.

## Quick Reference

```mdx
---
title: "Quiz: [Topic] Mastery"
subTitle: "[Catchy tagline with wordplay]"
label: "[Short label]"
category: Quiz
subCategory: [Topic]
date: YYYY-MM-DD
modified: YYYY-MM-DD
tags: [quiz, topic, difficulty-levels...]
cover_full_width: [unsplash]-wide.webp
cover_mobile: [unsplash]-square-200.webp
cover_icon: [unsplash]-square-200.webp
---
import Challenge from '../../../components/QuizUI/Challenge';
import QuizUI from '../../../components/QuizUI/QuizUI';

<p class="inset">[Hook paragraph with emoji]</p>

[Intro paragraph describing quiz scope]

<QuizUI>

<Challenge
  client:load
  index={0}
  group="Warmup"
  title="Question Title"
  options={[
    { text: 'Option A' },
    { text: 'Option B', isAnswer: true },
    { text: 'Option C' },
    { text: 'Option D' },
  ]}
>
  <slot name="question">
  <div className="question">
    [Question text with code block]
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    [Detailed explanation with code examples]
  </div>
  </slot>
</Challenge>

</QuizUI>

[Closing section with personality]
```

## Frontmatter Schema

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Must start with "Quiz: " | `"Quiz: JavaScript Error Mastery"` |
| `subTitle` | string | Catchy tagline, often wordplay or question | `"Are your exceptions truly exceptional?"` |
| `label` | string | Short label for UI badges | `"Errors"`, `"RegEx"`, `"CSS Fundamentals"` |
| `category` | string | Always `"Quiz"` | `Quiz` |
| `subCategory` | string | Topic area | `JavaScript`, `CSS`, `Rust`, `PostgreSQL`, `Bash`, `Cloud` |
| `date` | string | Post date (YYYY-MM-DD) | `2025-11-03` |
| `tags` | array | Include `quiz` + topic + difficulty levels | `[quiz, javascript, error-handling, intermediate, advanced]` |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `modified` | string | Last modified date |
| `unlisted` | boolean | Hide from lists but accessible via URL |
| `draft` | boolean | Hide from build entirely |
| `redirects` | array | Old URLs to redirect here |
| `social_image` | string | Path to social sharing image |
| `related` | array | Related post slugs |
| `popularity` | number | 0-1 score for sorting |

### Cover Image Fields

At least one cover image is needed. Most quizzes use three variants:

```yaml
cover_full_width: [filename]-wide.webp
cover_mobile: [filename]-square-200.webp
cover_icon: [filename]-square-200.webp
```

Some older quizzes also include a `cover` field (square format).

**Naming conventions**:
- Unsplash photos: `photographer-name-XXXX-unsplash-wide.webp`, `photographer-name-XXXX-unsplash-square.webp`
- Thematic/illustrated: `psychedelic-shell-wide.webp`, `elephant-synthwave-gym-square-200.webp`
- Social: `desktop-social.webp`, `mobile.webp` (some quizzes use these in `social_image`)

**Cover credit** (optional, for Unsplash photos):
```yaml
cover_credit: Photo by <a href="https://unsplash.com/@photographer">Name</a> on <a href="https://unsplash.com/photos/...">Unsplash</a>
```

## Challenge Component Structure

### Props

```tsx
<Challenge
  client:load          // Required: Astro React hydration directive
  index={0}            // Required: Zero-based question number
  group="Warmup"       // Required: Category grouping for this question
  title="Question Title" // Required: Short descriptive title
  options={[           // Required: Array of Option objects
    { text: 'Option A' },
    { text: 'Option B', isAnswer: true },
    { text: 'Option C', hint: "Optional hint text" },
  ]}
  difficulty={2}       // Optional: 1-5 numeric scale (used in Rust & AWS quizzes)
  objectives={[        // Optional: Learning objectives (used in Rust & AWS quizzes)
    "Understand concept X",
    "Identify pattern Y",
  ]}
>
```

**Note on `client:load`**: The vast majority of quizzes use `client:load`. Only the oldest quiz (JavaScript Promises, 2019) uses `client:only="react"` on some Challenges. Always use `client:load` for new quizzes.

### Option Type

The `Option` type (from `src/components/QuizUI/types.ts`):

```ts
type Option = { text: string; isAnswer: boolean; hint?: string };
```

- `text` (required): The displayed option text
- `isAnswer` (required): Exactly one option must have `isAnswer: true`
- `hint` (optional): Per-option hint shown when user selects that wrong answer

### Slots

Every Challenge has **two required slots** and **one optional slot**:

#### Question Slot (required)

```mdx
<slot name="question">
<div className="question">
  What does `JSON.stringify(error)` return?
  ```js
  const error = new Error('Oops');
  console.log(JSON.stringify(error));
  ```
</div>
</slot>
```

#### Explanation Slot (required)

```mdx
<slot name="explanation">
<div className="explanation">
  Error objects have non-enumerable properties (`message`, `name`, `stack`), so
  `JSON.stringify()` returns `{}`. Use `JSON.stringify(error, Object.getOwnPropertyNames(error))`
  or create a plain object instead.
</div>
</slot>
```

#### Hints Slot (optional — two styles)

There are **two hint styles** used across quizzes. Pick one per question, don't mix both.

**Style A: Per-option hints** (used in Rust & AWS quizzes). Hints are attached to individual wrong-answer options:

```js
options={[
  { text: 'Wrong A', hint: "Think about what happens after a move" },
  { text: 'Wrong B', hint: "Once moved, can we still use it?" },
  { text: 'Correct answer', isAnswer: true },
  { text: 'Wrong C', hint: "Rust catches these at compile time" },
]}
```

**Style B: Hints slot** (used in older JS quizzes, 2024 era). An empty or content-filled `<slot name="hints">` block:

```mdx
<slot name='hints'>
<div className="hint">
  Think about enumerable properties on Error objects.
</div>
</slot>
```

Or an empty hints slot (just the tags with no content):

```mdx
<slot name='hints'>
</slot>
```

**Prefer Style A (per-option hints) for new quizzes.** Style A is more engaging because hints are specific to the wrong answer the user selected, not generic. Style B with an empty slot just means "no hint for this question."

## Writing Style & Tone

### Voice

- **Conversational but expert**: Write like a knowledgeable developer chatting with peers
- **Playful but not silly**: Use humor, wordplay, and personality without being unprofessional
- **Direct and concise**: Get to the point, but add flavor
- **Use first person occasionally**: "I'm always learning...", "My favorite...", "Did you catch..."

### Tone Examples

**Good** (PostgreSQL quiz — playful insider tone):
> Did this make you frustrated, even _angry_? You're not alone! To quote an unnamed "core" database contributor, "what the hell, Dan?! I crashed on the type questions! Thats violent sir!" 😈 You're welcome.

**Good** (Bash quiz — irreverent but educational):
> I know. It's wild how quickly escaping makes strings tough to parse. Imagine escaping other languages in Bash strings — with all those quotes, apostrophes and `$` symbols to f*ck you up. 🫠

**Good** (Short subtitle wordplay):
> "Are your exceptions truly exceptional?"
> "(Borrow) check yo self before you wreck yo self! 🦀"
> "Can you navigate the cloud labyrinth?"

### Emoji Usage

Use emojis sparingly but effectively. Prefer 1-3 per section, not per question:

| Emoji | Usage |
|-------|-------|
| 🐘 | PostgreSQL |
| 🦀 | Rust |
| 💥 | Errors / explosions |
| 🚨 | Errors / warnings |
| 🤖 | Bots / automation / "these aren't your typical questions" |
| ✨ | Features / "no signup required" |
| 🍀 | Luck / "good luck" |
| 🏆 | Achievements / scoring |
| 🤔 | Thinking / questioning |
| 🤯 | Mind-blowing |
| 🕵️‍♂️ | Detective / "identify the invalid one" |
| 😈 | Tricky / diabolical questions |
| 🫠 | Frustration / melting |
| 💪 | Strength / challenges |
| 🔥 | Hot takes |
| ⬇️ | "Jump in below" |

### Punctuation & Formatting

- Use **bold** for emphasis on key terms or highlights
- Use _italics_ for asides, commentary, or subtle emphasis
- Use `backticks` for code references inline
- Use ❌ and ✅ for invalid/valid indicators in "spot the invalid" questions
- Use <em class="highlight"> for emphasized text in question bodies

## Question Types & Patterns

### 1. "What's the Output?" (Most Common)

Show code, ask what it produces:

```mdx
<slot name="question">
<div className="question">
  What does `JSON.stringify(error)` return?
  ```js
  const error = new Error('Oops');
  console.log(JSON.stringify(error));
  ```
</div>
</slot>
```

**Options**: Actual output values, common misconceptions, error messages.

### 2. "Spot the Invalid" (Type/Feature Identification)

List several items, one is fake/invalid. Often uses <em class="highlight">:

```mdx
<slot name="question">
<div className="question">
  Which of these is <em class="highlight">NOT</em> ❌ a valid PostgreSQL type?

  (Seriously, these are (mostly) real types.)
</div>
</slot>
```

**Options**: 5-7 real items + 1 plausible-sounding fake. These questions typically have more options (5-8).

### 3. "Which Syntax is Correct?"

Show variations of syntax, ask which works:

```mdx
<slot name="question">
<div className="question">
  How are variables defined in Bash?
</div>
</slot>
```

**Options**: Correct syntax + common mistakes (spaces, wrong operators, etc.)

### 4. "What Happens When..." (Behavior Prediction)

Describe a scenario, ask about runtime/compile behavior:

```mdx
<slot name="question">
<div className="question">
  What happens with multiple mutable references?
  ```rust
  fn main() {
      let mut wisdom = String::from("He who laughs at");
      let ref1 = &mut wisdom;
      let ref2 = &mut wisdom;
      ref1.push_str(" himself never runs");
      ref2.push_str(" out of things to laugh at.");
  }
  ```
  Think about Rust's rules for mutable references.
</div>
</slot>
```

### 5. "Conceptual Knowledge" (Theory Questions)

Ask about concepts, best practices, or when to use something:

```mdx
<slot name="question">
<div className="question">
  When should you use Rc (Reference Counting) in Rust?
</div>
</slot>
```

## Option Design Patterns

### Number of Options

- **4-6 options** is typical for "what's the output" and conceptual questions
- **5-8 options** for "spot the invalid" / type identification questions
- **4-5 options** for output prediction questions

### Option Structure

```js
// Simple — most quizzes
{ text: 'Option text' }

// Correct answer
{ text: 'Option text', isAnswer: true }

// With per-option hint (Rust/AWS style)
{ text: 'Wrong answer', hint: "Think about X..." }

// Multiple correct (RARE, only when intentional)
{ text: 'TypeScript error', isAnswer: true }
{ text: 'null', isAnswer: true }
```

### Crafting Wrong Answers

Wrong answers should be:
1. **Plausible misconceptions**: What a developer might actually think
2. **Common mistakes**: Real errors people make (e.g., `name = Dan` with spaces in Bash)
3. **Close-but-wrong**: Values that differ from correct by one character or concept
4. **Opposite of correct**: For conceptual questions

**Examples of good wrong answers**:
- For `JSON.stringify(new Error('Oops'))`: `'{"message":"Oops","name":"Error"}'` — what you'd expect but isn't true
- For Bash variable: `"$name=Dan"` — common mistake of using `$` prefix
- For CSS invalid selector: `c {}` — looks valid but `<c>` isn't an HTML element
- For PostgreSQL types: `ipv4` — so intuitive it must exist, but doesn't; `inet` covers both IPv4 and IPv6

### Answer Distribution

- **Exactly ONE** `isAnswer: true` per question (unless intentionally multi-answer — see below)
- Spread correct answers across different positions (don't always make it option B or C)
- Don't make "Error" or "undefined" always the correct answer

### Multiple Correct Answers (RARE)

Only use when there are genuinely two valid answers. Explain why in the explanation:

```js
options={[
  { text: 'TypeScript error', isAnswer: true },
  { text: "'null'", isAnswer: true },
  { text: 'undefined' },
]}
```

This was used in the Destructuring quiz for a TypeScript question where ignoring type errors gives different runtime behavior. **Use sparingly** — most questions should have exactly one correct answer.

## Hint Writing Guidelines

### Per-Option Hints (Preferred Style)

Attached to wrong-answer options. Shown as tooltips when user clicks that wrong answer after the first wrong attempt (IGNORE_HINTS = 1).

```js
options={[
  { text: 'Wrong A', hint: "Think about what happens to 'philosopher' after it's moved" },
  { text: 'Compilation Error', isAnswer: true },
  { text: 'Runtime Error', hint: "Rust catches these issues at compile time" },
  { text: 'null', hint: "Rust doesn't have null values" },
]}
```

**Hint writing principles**:
- 1-2 sentences max
- Point to the concept, not the answer
- Use patterns: "Think about...", "Consider...", "Remember..."
- Can reference specific technical terms ("enumerable properties", "prototype chain")
- Witty/humorous hints are acceptable and encouraged (AWS quiz: `{ text: "DynamoDB credits for Green Vendors", hint: "Really?" }`)

### Hints Slot (Legacy Style)

Used in older JavaScript quizzes (2024 era). Can be empty or contain a single hint div:

```mdx
<!-- Empty hints slot (no hint for this question) -->
<slot name='hints'>
</slot>

<!-- With hint content -->
<slot name='hints'>
<div className="hint">
  Think about enumerable properties on Error objects.
</div>
</slot>
```

## Explanation Writing Guidelines

### Structure

1. **Direct answer first**: State the correct answer immediately
2. **Explain why**: Break down the reasoning
3. **Show alternatives**: "Here's how to fix this..." or "Common patterns include..."
4. **Provide context**: When/why this matters in real code
5. **Link to resources**: MDN, official docs, etc. (optional but common)

### Explanation Styles by Depth

**Short** (2-4 sentences, for straightforward questions):
```mdx
<slot name="explanation">
<div className="explanation">
  The `age` property does not exist on `person`, so `age` will be `undefined`.
  Definitely not `Infinity` 😅

  This results in:
  ```plaintext
  Name: Dan Levy, Age: undefined
  ```
</div>
</slot>
```

**Medium** (1-2 paragraphs, for intermediate questions):
```mdx
<slot name="explanation">
<div className="explanation">
  Error objects have non-enumerable properties (`message`, `name`, `stack`), so
  `JSON.stringify()` returns `{}`. This is a common gotcha when sending errors
  in API responses. Use `JSON.stringify(error, Object.getOwnPropertyNames(error))`
  or create a plain object instead.
</div>
</slot>
```

**Long** (multiple paragraphs + code examples, for advanced/Rust topics):
```mdx
<slot name="explanation">
<div className="explanation">
  This code fails to compile because of Rust's ownership rules. When we assign
  `philosopher` to `greeting`, the ownership of the String is moved to `greeting`.
  After this move, `philosopher` is no longer valid to use.

  Here are three ways to fix this:

  1. Clone the string (creates a new copy):
  ```rust
  let greeting = philosopher.clone();
  ```

  2. Use a reference (borrows the value):
  ```rust
  let greeting = &philosopher;
  ```

  3. Use a string slice (borrows part of the string):
  ```rust
  let greeting = &philosopher[..];
  ```

  Each solution has different use cases and performance implications.
</div>
</slot>
```

### Explanation Content Rules

- Always use fenced code blocks with language hint (````js`, ````sql`, ````rust`, ````bash`, ````html`, ````plaintext`)
- Show **correct code** and explain why it works
- Show **common fixes** for error-based questions
- Use bullet lists for enumerating options/features
- Include MDN or official doc links for web platform topics
- Personality is welcome (see PostgreSQL quiz: "Did this make you frustrated, even _angry_?")

### Links in Explanations

```markdown
[Learn more about RegExp flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags)
```

Common link targets:
- MDN Web Docs (JavaScript, CSS, HTML)
- Official language docs (Rust Book, PostgreSQL docs)
- BashFAQ, Greg's Redirection FAQ
- Relevant blog posts on the same site

## Group Naming Conventions

Groups organize questions into thematic sections displayed in the quiz UI.

### Progression Pattern

```
"Warmup" → "Basic [Topic]" → "[Topic]" → "Advanced [Topic]" → "[Topic] Gotchas"
```

### Examples from Existing Quizzes

**JavaScript Error Quiz** — descriptive/thematic names:
- "Serialization Surprises", "Type Checking Tricks", "Throwing Non-Errors", "Custom Errors", "Error Cause", "Stack Traces", "Message Templates", "API Gotchas", "Async Errors", "Error Properties", "Error Boundaries"

**PostgreSQL Quiz** — topic + prefix pattern:
- "Warmup: Functions", "Warmup: Type Casting", "Constraints", "Date/Time", "Timestamps", "Postgres Types", "Integer Arithmetic"

**Regex Quiz** — skill-level progression with humor:
- "Warmup" → "Basic Matching" → "Common Gotchas" → "Look-ahead" → "Look-behind" → "Look-into-hell" 😈

**Bash Quiz** — concise topic names:
- "Warmup", "Warmup: Escaping", "Warmup: Expansion", "Variables", "Replacing Substrings", "String Length", "Conditionals", "Functions", "Composition", "Arithmetic", "Loops", "Gotchas"

**Rust Quiz** — conceptual groupings:
- "Ownership", "Borrowing", "Lifetime Elision", "Smart Pointers", "Reference Counting", "Lifetimes", "RefCells", "Mutability", "Memory Patterns", "Design Patterns", "Best Practices", "Advanced Patterns"

### Group Naming Rules

1. **Start with "Warmup"** for 1-3 easy introductory questions
2. **Use topic names** for thematic groupings (2-5 questions per group)
3. **Add prefixes** like "Warmup:", "Advanced:", "Common:" for clarity
4. **Be creative** — names that fit the topic make it memorable ("Serialization Surprises", "Look-into-hell")
5. **Don't repeat group names** within a quiz (each group should have a unique name)

## Difficulty Progression

### Standard Progression

1. **Warmup (1-3 questions)**: Easy, foundational concepts — build confidence
2. **Basic/Intermediate**: Core concepts with some gotchas
3. **Advanced**: Tricky edge cases, cross-environment behavior
4. **Expert/Gotchas**: Rare behaviors, "gotcha" questions, mind-benders

### Numeric Difficulty Scale (Rust & AWS Quizzes)

Used with the `difficulty` prop on a 1-5 scale:

| Level | Meaning | Example |
|-------|---------|---------|
| 1 | Warmup/Trivia | "What does S3 stand for?" |
| 2 | Basic | "Basic variable declaration in Bash" |
| 3 | Intermediate | "Mutable borrowing rules" |
| 4 | Advanced | "Lifetime annotations on structs" |
| 5 | Expert | "Zero-cost abstractions / memory layout" |

### Difficulty + Objectives Pattern

Used in Rust and AWS quizzes for pedagogical structure:

```mdx
<Challenge
  client:load
  index={0}
  group="Ownership"
  title="Basic Move Semantics"
  difficulty={2}
  objectives={[
    "Explain Rust's ownership rules and move semantics",
    "Identify compilation errors related to moved values",
    "Apply solutions to fix move-related compilation errors"
  ]}
>
```

**When to use difficulty + objectives**: Add them when the quiz covers a structured learning progression (Rust, AWS, databases). Skip for casual knowledge quizzes (regex, CSS, destructuring).

## Code Formatting Rules

### Code Block Language Hints

Always specify the language:

````mdx
```js       // JavaScript
```ts       // TypeScript
```sql      // SQL / PostgreSQL
```rust     // Rust
```bash     // Shell / Bash
```html     // HTML
```css      // CSS
```json     // JSON
```plaintext // Plain output / no syntax
````

### Code Width

- **Keep code lines under ~50-60 characters** when possible (especially for Rust quizzes, which note this explicitly)
- This ensures readability across mobile devices
- Break long lines at natural points (after operators, at function args)

### Inline Code

Use backticks for:
- Variable names: `err.name`
- Function calls: `JSON.stringify()`
- Operators: `??`, `?.`, `||=`
- Values: `undefined`, `null`, `true`
- CSS properties: `font-size`, `align-content`
- SQL types: `VARCHAR(100)`, `timestamptz`

## Intro Section Patterns

### Standard Intro

```mdx
<p class="inset">Ready to test your [topic] skills? [emoji]</p>

This quiz covers [scope description]: from [basic concept] to [advanced concept].

Good luck! 🍀
```

### Bullet Point Intro (Very Common)

```mdx
### Think you know [topic] inside and out?

* **Test your expertise!** 💥
* No login or signup required. ✨
* Multiple choice. 🤖 ... _These ain't your typical questions!_
```

### Playful Intro

```mdx
<p class="inset">Or is it your <em>Symphony of Destruction?</em></p>

This quiz will test your knowledge of [topic]: from "basic" [concept] to [advanced concept].

Jump right in to the warmup — prove your skills! 👇
```

### Multi-Part Quiz Intro

```mdx
> **Part 1 of 2.** [Go to Part 2](/quiz-postgres-sql-mastery-pt2/)

<p class="inset">PostgreSQL 🐘 Is easily my favorite Database!</p>

This quiz covers a mix of familiar and lesser-known features...
```

### With Context Intro (AWS/Rust style)

```mdx
<p class="inset">Ready to test your Rust memory management skills? 🦀</p>

This quiz will challenge your understanding of Rust's ownership system, borrowing rules, lifetimes, and smart pointers.

**Note:** The questions are formatted in ~50-column width to ensure readability across all devices.

Whether you're a seasoned Rustacean or just getting started, this quiz will help reinforce your knowledge. **Let's dive in!** 🦀
```

## Section Breaks Between Groups

Use markdown headers or styled paragraphs to break up long quizzes:

```mdx
# Dizzying Types

I'm sure you've used _so many_ types in PostgreSQL, right?

The next few questions are about Postgres' v17 native types. 🤯

For each question, identify the **one invalid type**. 🕵️‍♂️

<p class="inset">Onward!</p>
```

```mdx
# TypeScript Ahead
```

Section breaks serve as transitions — add context about what's coming next.

## Closing Section Patterns

### Standard Closing

```mdx
## Master the Art of Error Handling

From serialization gotchas to cross-context instanceof failures, these advanced concepts separate junior developers from ~seasoned~ damaged professionals.

Ready for more challenges? Check out our [complete quiz collection](/challenges/) for additional brain teasers on JavaScript, algorithms, and more!
```

### Playful Closing

```mdx
<p className="inset">Did my Bash Quiz leave you in shambles?</p>

Let me know in the comments below!

### Further Reading

Brush up on your skills:
- [Bash Guide](https://www.gnu.org/software/bash/manual/bash.html)
- [BashFAQ](http://mywiki.wooledge.org/BashFAQ)
- [ShellCheck](https://www.shellcheck.net/)
```

### Multi-Part Closing

```mdx
Well done! You went deep on several areas of PostgreSQL! 🐘

I hope you learned something new, or at least got a score to gloat about! 🏆

<p class="inset">Check out [Part 2](/quiz-postgres-sql-mastery-pt2/) for more Postgres fun! 🚀</p>

Want more thrills in life? Check out my [Quiz Collection](/challenges/) for endless* fun!
```

### Rust-Style Closing (with resources)

```mdx
Thanks for taking the quiz! If you enjoyed testing your Rust knowledge, check out my other [programming challenges](/challenges/)! 🧠

**Want to level up your Rust skills?** Here are some recommended resources:

- [Rust Book - Chapter 4: Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html)
- [Rust By Example - Memory Management](https://doc.rust-lang.org/rust-by-example/scope.html)
```

All closings should include a link to `/challenges/` (the quiz collection page).

## Verification Steps

After writing a quiz, verify:

### 1. Frontmatter Validation

- [ ] `title` starts with "Quiz: "
- [ ] `category` is exactly `Quiz`
- [ ] `subCategory` matches the topic
- [ ] `tags` includes `quiz` + topic keywords + difficulty levels
- [ ] Cover images are present and WebP format
- [ ] Date format is YYYY-MM-DD

### 2. Challenge Structure

- [ ] Every Challenge has `client:load` directive (NOT `client:only`)
- [ ] `index` values are sequential starting from 0
- [ ] Every Challenge has exactly ONE `isAnswer: true` option (unless intentionally multi-answer)
- [ ] Every Challenge has both `question` and `explanation` slots
- [ ] `group` and `title` props are present on every Challenge
- [ ] All slots use proper `<slot name="...">` syntax
- [ ] `className` (not `class`) is used in JSX/MDX

### 3. Content Quality

- [ ] Questions test real knowledge, not trivia
- [ ] Wrong answers are plausible misconceptions
- [ ] Explanations explain WHY, not just WHAT
- [ ] Code examples are correct and runnable
- [ ] Explanations include fixes/solutions for error-based questions
- [ ] Hints guide without giving away answers
- [ ] Difficulty progresses from warmup to advanced

### 4. Formatting

- [ ] Code blocks have language hints
- [ ] Code lines are reasonably short (<60 chars where possible)
- [ ] Inline code uses backticks
- [ ] Consistent option formatting (quotes, indentation)
- [ ] No trailing whitespace or empty lines in slots

### 5. Run Validation Tools

```bash
# Type check
bun run check

# Validate quiz structure (checks question numbering)
bun run fix-quizzes

# Build to verify no errors
bun run build

# Generate quiz question screenshots for social images
bun run screenshots
```

### 6. Generate Social Images

```bash
bun run screenshots
```

## Common Gotchas

### DON'T

- ❌ Use `getCollection("posts")` directly — use `PostCollections` from `@/shared/postsCache`
- ❌ Manually edit `public/_redirects` — use frontmatter `redirects` array
- ❌ Put multiple `isAnswer: true` in one question (unless intentional and explained)
- ❌ Write explanations that just repeat the question
- ❌ Make wrong answers obviously wrong
- ❌ Use emojis excessively (1-3 per section max)
- ❌ Forget the `client:load` directive on Challenges
- ❌ Skip the warmup questions
- ❌ Write code that doesn't actually work as described
- ❌ Use `class` in JSX — use `className` instead
- ❌ Use `client:only="react"` (legacy, use `client:load`)

### DO

- ✅ Start with warmup questions (1-3 easy ones)
- ✅ Group related questions together with meaningful group names
- ✅ Include real-world context in explanations
- ✅ Show multiple solutions when applicable (especially for Rust)
- ✅ Link to authoritative resources
- ✅ Use personality and humor appropriately
- ✅ Test code examples before including them
- ✅ Run `bun run fix-quizzes` before committing
- ✅ Use `className` not `class` in JSX/MDX
- ✅ Link to `/challenges/` in closing sections

## File Structure

```
src/content/posts/YYYY-MM-DD--quiz-[topic-slug]/
├── index.mdx                    # Quiz content
├── [cover]-wide.webp            # Full width cover image
├── [cover]-square-200.webp      # Mobile cover (200px)
└── [cover]-square-300px.webp    # Icon cover (300px, optional)
```

Some quizzes also include:
- `desktop-social.webp` — social sharing image
- `mobile.webp` — mobile social sharing image
- `annotated-code/` — subdirectory with annotated code images

## Directory Naming

Use the pattern: `YYYY-MM-DD--quiz-[descriptive-slug]`

Examples:
- `2025-11-04--quiz-advanced-js-error-mastery`
- `2024-11-27--quiz-postgres-sql-mastery-pt1`
- `2024-11-15--quiz-regex-or-wreckage`
- `2024-12-28--quiz-is-your-memory-rusty`
- `2024-11-20--quiz-bash-in-the-shell`

## Import Paths

The import paths are relative to the post's location:

```mdx
import Challenge from '../../../components/QuizUI/Challenge';
import QuizUI from '../../../components/QuizUI/QuizUI';
```

These paths assume posts are in `src/content/posts/YYYY-MM-DD--slug/` (3 levels deep from src).

## Advanced Challenge Features

### Per-Option Hints (Preferred)

Hints attached to individual wrong answers, shown after the first incorrect attempt:

```js
options={[
  { text: 'Wrong A', hint: "Think about what happens after a move" },
  { text: 'Compilation Error', isAnswer: true },
  { text: 'Runtime Error', hint: "Rust catches these at compile time" },
]}
```

**Hint behavior**: After 1 wrong attempt (IGNORE_HINTS = 1), subsequent wrong selections that have hints will show the hint as a tooltip. This means the first wrong answer never shows its hint — only the second+ wrong answers do.

### Difficulty + Objectives (Rust & AWS Pattern)

For structured learning quizzes, add `difficulty` and `objectives`:

```mdx
<Challenge
  client:load
  index={0}
  group="Ownership"
  title="Basic Move Semantics"
  difficulty={2}
  objectives={[
    "Explain Rust's ownership rules and move semantics",
    "Identify compilation errors related to moved values",
    "Apply solutions to fix move-related compilation errors"
  ]}
>
```

**When to use**: Add these for quizzes that teach a structured curriculum (Rust, AWS, databases). Skip for casual knowledge quizzes (regex, CSS, destructuring).

### Multiple Correct Answers (RARE)

Some questions intentionally have multiple correct answers:

```js
options={[
  { text: 'TypeScript error', isAnswer: true },
  { text: 'null', isAnswer: true },  // Runtime behavior differs from TS expectation
  { text: 'undefined' },
]}
```

**When to use**: Only when there are genuinely two valid answers (e.g., TypeScript says one thing, runtime says another). Always explain in the explanation why there are two correct answers.

## Question Count Guidelines

- **Minimum**: 9 questions (oldest quiz has 9, most have 10-16)
- **Typical**: 12-16 questions
- **Maximum**: ~18 questions (Rust quiz has 18, AWS has 20+)
- **Beyond ~18-20**: Split into Part 1, Part 2, etc. with cross-links

For multi-part quizzes, link between parts:

```mdx
> **Part 1 of 2.** [Go to Part 2](/quiz-postgres-sql-mastery-pt2/)
```

## Tag Guidelines

Always include these tag categories:

1. **Quiz identifier**: `quiz`
2. **Topic**: `javascript`, `rust`, `css`, `postgresql`, `bash`, `regex`, `aws`, `cloud`
3. **Sub-topic** (optional): `error-handling`, `memory-management`, `destructuring`, `s3`, `dynamodb`
4. **Difficulty levels**: `intro`, `beginner`, `intermediate`, `advanced`, `expert`

Examples:
```yaml
tags: [quiz, javascript, error-handling, intermediate, advanced]
tags: [quiz, javascript, intro, esnext, features, intermediate]
tags: [quiz, rust, memory-management, ownership, borrowing, lifetimes, intermediate, advanced]
tags: [quiz, aws, cloud, storage, databases, s3, dynamodb, rds, elasticache]
tags: [quiz, bash, scripting, shell, linux, beginner, intermediate, advanced]
```

## Content Schema (Zod)

The frontmatter is validated against this Zod schema (from `src/content.config.ts`):

```ts
z.object({
  title: z.string(),
  subTitle: z.string().optional().default(""),
  label: z.string().optional(),
  social_image: image().optional(),
  commentsKeyOverride: z.string().optional(),
  publish: z.boolean().optional().default(true),
  draft: z.boolean().optional(),
  unlisted: z.coerce.boolean().optional(),
  hidden: z.coerce.boolean().optional(),
  date: z.coerce.string().optional(),
  modified: z.coerce.string().optional(),
  minReleaseDate: z.coerce.date().optional(),
  cover: image().optional(),
  cover_full_width: image().optional(),
  cover_mobile: image().optional(),
  cover_icon: image().optional(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  tags: z.array(z.string()).optional(),
  popularity: z.number().min(0).max(1.0).optional(),
  related: z.array(z.string()).optional(),
  redirects: z.array(z.string()).optional(),
})
```

Key observations:
- `title` is the only truly required field (everything else has defaults or is optional)
- But for quizzes, you should always include: `title`, `category: Quiz`, `subCategory`, `date`, `tags`, and cover images
- `subTitle` defaults to `""` — set it to something catchy