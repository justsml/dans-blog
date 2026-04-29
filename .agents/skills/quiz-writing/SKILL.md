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
| `subCategory` | string | Topic area | `JavaScript`, `CSS`, `Rust`, `PostgreSQL`, `Bash` |
| `date` | date | Post date (YYYY-MM-DD) | `2025-11-03` |
| `tags` | array | Include `quiz` + topic + difficulty levels | `[quiz, javascript, error-handling, intermediate, advanced]` |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `modified` | date | Last modified date |
| `unlisted` | boolean | Hide from lists but accessible via URL |
| `draft` | boolean | Hide from build entirely |
| `redirects` | array | Old URLs to redirect here |
| `social_image` | string | Legacy field, prefer cover_* fields |
| `related` | array | Related post slugs |
| `popularity` | number | 0-1 score for sorting |

### Cover Image Fields (Required)

Three cover images are required, all WebP format:

```yaml
cover_full_width: [filename]-wide.webp
cover_mobile: [filename]-square-200.webp
cover_icon: [filename]-square-200.webp
```

**Naming convention**: Use Unsplash photo credit base name when applicable:
- `christopher-burns-8KfCR12oeUM-unsplash-wide.webp`
- `christopher-burns-8KfCR12oeUM-unsplash-square.webp`

Or thematic names:
- `psychedelic-shell-wide.webp` / `psychedelic-shell-square-200.webp`
- `elephant-synthwave-gym-wide.webp` / `elephant-synthwave-gym-square-200.webp`
- `boxes-of-nesting-dolls-wide.webp` / `boxes-of-nesting-dolls-square.webp`

**Cover credit** (optional, for Unsplash photos):
```yaml
cover_credit: Photo by <a href="https://unsplash.com/@photographer">Name</a> on <a href="https://unsplash.com/photos/...">Unsplash</a>
```

## Challenge Component Structure

### Props

```tsx
<Challenge
  client:load          // Required: React hydration directive
  index={0}            // Required: Zero-based question number
  group="Warmup"       // Required: Category grouping for this question
  title="Question Title" // Required: Short descriptive title
  options={[           // Required: Array of option objects
    { text: 'Option A' },
    { text: 'Option B', isAnswer: true },
    { text: 'Option C', hint: "Optional hint text" },
  ]}
  difficulty={2}       // Optional: 1-5 difficulty scale (Rust quizzes use this)
  objectives={[        // Optional: Learning objectives (Rust quizzes use this)
    "Understand concept X",
    "Identify pattern Y",
  ]}
>
```

### Slots

Every Challenge has two required slots:

#### Question Slot

```mdx
<slot name="question">
<div className="question">
  [Question text - can include code blocks with language hint]
</div>
</slot>
```

#### Explanation Slot

```mdx
<slot name="explanation">
<div className="explanation">
  [Detailed explanation with code examples, bullet points, links]
</div>
</slot>
```

#### Hint Slot (Optional)

Hints are NOT in a separate slot. They are attached to individual options:

```js
options={[
  { text: 'Wrong answer', hint: "Think about X..." },
  { text: 'Correct answer', isAnswer: true },
]}
```

**Hint behavior**: When user selects a wrong option that has a `hint`, the hint appears as a tooltip. Hints are shown after the first wrong attempt (IGNORE_HINTS = 1 in Challenge.tsx).

## Writing Style & Tone

### Voice

- **Conversational but expert**: Write like a knowledgeable developer chatting with peers
- **Playful but not silly**: Use humor, wordplay, and personality without being unprofessional
- **Direct and concise**: Get to the point, but add flavor
- **Use first person occasionally**: "I'm always learning...", "My favorite...", "Did you catch..."

### Tone Examples

**Good**:
> "Did this make you frustrated, even _angry_? You're not alone! To quote an unnamed core [related tool] contributor, 'what the hell, Dan?! I crashed on the third questions! Thats violent sir!' 😈 You're welcome."

**Good**:
> "I know. It's wild how quickly escaping makes strings tough to parse. Imagine escaping other languages in Bash strings — with all those quotes, apostrophes and `$` symbols to f*ck you up. 🫠"

**Good**:
> "Are your exceptions truly exceptional?"

**Good**:
> "(Borrow) check yo self before you wreck yo self! 🦀"

### Emoji Usage

Use emojis sparingly but effectively:
- 🐘 for PostgreSQL
- 🦀 for Rust
- 💥 for errors/explosions
- 🚨 for errors/warnings
- 🤖 for bots/automation
- ✨ for features/highlights
- 🍀 for luck
- 🏆 for achievements
- 🤔 for thinking/questioning
- 🤯 for mind-blowing
- 🕵️‍♂️ for detective/investigation
- 😈 for tricky/diabolical questions
- 🫠 for frustration/melting
- 💪 for strength/challenges

### Punctuation & Formatting

- Use **bold** for emphasis on key terms
- Use _italics_ for asides, commentary, or subtle emphasis
- Use `backticks` for code references inline
- Use ❌ and ✅ for invalid/valid indicators
- Use `**NOT**` or `**INVALID**` with ❌ for "spot the wrong one" questions

## Question Types & Patterns

### 1. "What's the Output?" (Most Common)

Show code, ask what it produces:

```mdx
<slot name="question">
<div className="question">
  What will this code print?
  ```js
  const person = { name: 'Dan' };
  const { name, age } = person;
  console.log(`Name: ${name}, Age: ${age}`);
  ```
</div>
</slot>
```

**Options**: Actual output values, common misconceptions, error messages

### 2. "Spot the Invalid" (Type/Feature Questions)

List several items, one is fake/invalid:

```mdx
<slot name="question">
<div className="question">
  Which of these is <em class="highlight">NOT</em> a valid PostgreSQL type?
</div>
</slot>
```

**Options**: All real except one plausible-sounding fake

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

### 4. "What Happens When..." (Behavior Questions)

Describe a scenario, ask about runtime/compile behavior:

```mdx
<slot name="question">
<div className="question">
  What happens when calculating total possible student IDs?
  ```sql
  SELECT 256 * 256 * 256 * 256;
  ```
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

- **4-6 options** is typical
- **Type identification questions**: 5-8 options (list many real items + 1 fake)
- **Output questions**: 4-5 options (correct + plausible wrong answers)

### Option Structure

```js
// Simple
{ text: 'Option text' }

// Correct answer
{ text: 'Option text', isAnswer: true }

// With hint for wrong answer
{ text: 'Option text', hint: "Think about X..." }
```

### Crafting Wrong Answers

Wrong answers should be:
1. **Plausible misconceptions**: What a developer might actually think
2. **Common mistakes**: Real errors people make
3. **Edge cases**: Technically possible but unlikely
4. **Opposite of correct**: For conceptual questions

**Examples of good wrong answers**:
- For `JSON.stringify(new Error('Oops'))`: `'{"message":"Oops","name":"Error"}'` (what you'd expect but isn't true)
- For Bash variable: `"$name=Dan"` (common mistake with `$`)
- For CSS invalid selector: `c {}` (looks valid but `<c>` isn't an HTML element)

### Answer Distribution

- **Exactly ONE** `isAnswer: true` per question (unless intentionally multi-answer like TypeScript quiz #8)
- Spread correct answers across different positions (don't always make it option C)

## Hint Writing Guidelines

### When to Use Hints

- Attach hints to **wrong answers only** (not the correct one)
- Hints should **guide without giving away** the answer
- Use hints for **tricky questions** where learners need a nudge

### Hint Style

**Good hints**:
- "Think about enumerable properties on Error objects."
- "Consider how console.log handles objects vs JSON serialization."
- "Remember the prototype chain in JavaScript inheritance."
- "Different contexts have different Error constructors."

**Hint characteristics**:
- 1-2 sentences max
- Points to the concept, not the answer
- Uses "Think about...", "Consider...", "Remember..." patterns
- Can reference specific technical concepts

### Hint Placement

```js
options={[
  { text: '{"message":"Oops","name":"Error"}' },
  { text: '{}', isAnswer: true },
  { text: '{"error":"Oops"}' },
  { text: 'null', hint: "JSON.stringify doesn't return null for objects" },
]}
```

## Explanation Writing Guidelines

### Structure

1. **Direct answer first**: State the correct answer immediately
2. **Explain why**: Break down the reasoning
3. **Show alternatives**: "Here's how to fix this..." or "Common patterns include..."
4. **Provide context**: When/why this matters in real code
5. **Link to resources**: MDN, official docs, etc. (optional)

### Example Explanation (JavaScript)

```mdx
<slot name="explanation">
<div className="explanation">
  Error objects have non-enumerable properties (`message`, `name`, `stack`), so `JSON.stringify()` returns `{}`. This is a common gotcha when sending errors in API responses. Use `JSON.stringify(error, Object.getOwnPropertyNames(error))` or create a plain object instead.
</div>
</slot>
```

### Example Explanation (Rust - Detailed)

```mdx
<slot name="explanation">
<div className="explanation">
  This code fails to compile because of Rust's ownership rules. When we assign `philosopher` to `greeting`, the ownership of the String is moved to `greeting`. After this move, `philosopher` is no longer valid to use.

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

### Explanation Length

- **Simple questions**: 2-4 sentences
- **Complex questions**: Multiple paragraphs with code examples
- **Rust/advanced topics**: Extensive with multiple solutions, best practices, common patterns

### Code in Explanations

- Always use fenced code blocks with language hint
- Show **correct code** and explain why it works
- Show **common fixes** for error-based questions
- Use comments to explain key lines

### Links in Explanations

Include links to authoritative resources:

```markdown
[Learn more about RegExp flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags)
```

Common link targets:
- MDN Web Docs (JavaScript, CSS, HTML)
- Official language docs (Rust Book, PostgreSQL docs)
- BashFAQ, Greg's Redirection FAQ
- Relevant blog posts on the same site

## Group Naming Conventions

Groups organize questions into thematic sections. Use these patterns:

### Progression Pattern

```
"Warmup" → "Basic [Topic]" → "[Topic]" → "Advanced [Topic]" → "[Topic] Gotchas"
```

### Examples from Existing Quizzes

**JavaScript Error Quiz**:
- "Serialization Surprises"
- "Type Checking Tricks"
- "Throwing Non-Errors"
- "Custom Errors"
- "Error Cause"
- "Stack Traces"
- "Message Templates"
- "API Gotchas"
- "Async Errors"
- "Error Properties"
- "Error Boundaries"

**PostgreSQL Quiz**:
- "Warmup: Functions"
- "Warmup: Type Casting"
- "Constraints"
- "Date/Time"
- "Timestamps"
- "Postgres Types"
- "Integer Arithmetic"
- "Constraints"

**Regex Quiz**:
- "Warmup"
- "Basic Matching"
- "Common Gotchas"
- "Look-ahead"
- "Look-behind"
- "Look-into-hell" (for the hardest question 😈)

**Bash Quiz**:
- "Warmup"
- "Warmup: Escaping"
- "Warmup: Expansion"
- "Variables"
- "Replacing Substrings"
- "String Length"
- "Conditionals"
- "Functions"
- "Composition"
- "Arithmetic"
- "Loops"
- "Gotchas"

### Group Naming Rules

1. **Start with "Warmup"** for easy introductory questions (2-3 questions)
2. **Use topic names** for thematic groupings
3. **Add prefixes** like "Warmup:", "Advanced:", "Common:" for clarity
4. **Be creative** with names that fit the topic ("Serialization Surprises", "Look-into-hell")
5. **Keep groups to 2-5 questions** each

## Difficulty Progression

### Standard Progression

1. **Warmup (1-3 questions)**: Easy, foundational concepts
2. **Basic/Intermediate**: Core concepts with some gotchas
3. **Advanced**: Tricky edge cases, deep knowledge
4. **Expert/Gotchas**: Rare behaviors, "gotcha" questions

### Difficulty Indicators

- **Warmup**: No hints needed, straightforward
- **Basic**: May have one tricky option
- **Intermediate**: Requires understanding of nuances
- **Advanced**: Edge cases, cross-environment behavior
- **Expert**: Rarely-used features, implementation details

### Rust-Specific Difficulty

Rust quizzes use explicit `difficulty={1-5}` and `objectives`:

```mdx
<Challenge
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

## Code Formatting Rules

### Code Block Language Hints

Always specify the language:

````mdx
```js
const x = 42;
```

```sql
SELECT * FROM users;
```

```rust
fn main() {
    println!("Hello");
}
```

```bash
echo "Hello World"
```

```html
<div class="container"></div>
```

```ts
const x: number = 42;
```

```plaintext
Output here
```
````

### Code Width

- **Keep code lines under ~50-60 characters** when possible (especially for Rust quizzes)
- This ensures readability across devices
- Break long lines at natural points

### Inline Code

Use backticks for:
- Variable names: `err.name`
- Function calls: `JSON.stringify()`
- Operators: `??`, `?.`, `||=`
- Values: `undefined`, `null`, `true`

## Intro Section Patterns

### Standard Intro

```mdx
<p class="inset">Ready to test your [topic] skills? [emoji]</p>

This quiz covers [scope description]: from [basic concept] to [advanced concept].

Good luck! 🍀
```

### Bullet Point Intro

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

## Section Breaks Between Groups

Use markdown headers or paragraphs to break up long quizzes:

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

## Closing Section Patterns

### Standard Closing

```mdx
## How did you do? 🧐

[Topic] can be a beast to tame, but they're incredibly powerful once you get the hang of them. Keep practicing!

Looking for more? Check out my [Quiz Collection](/challenges/) for additional brain teasers!
```

### Playful Closing

```mdx
<p className="inset">Did my Bash Quiz leave you in shambles?</p>

Let me know in the comments below!

### Further Reading

Brush up on your skills:
- [Resource 1](url)
- [Resource 2](url)
```

### Rust-Style Closing

```mdx
Thanks for taking the quiz! If you enjoyed testing your Rust knowledge, check out my other [programming challenges](/challenges/)! 🧠

**Want to level up your Rust skills?** Here are some recommended resources:

- [Rust Book - Chapter 4: Ownership](url)
- [Rust By Example](url)
```

## Verification Steps

After writing a quiz, verify:

### 1. Frontmatter Validation

- [ ] `title` starts with "Quiz: "
- [ ] `category` is exactly `Quiz`
- [ ] `subCategory` matches the topic
- [ ] `tags` includes `quiz` + topic + difficulty levels
- [ ] All three cover image fields present
- [ ] Cover images are WebP format
- [ ] Date format is YYYY-MM-DD

### 2. Challenge Structure

- [ ] Every Challenge has `client:load` directive
- [ ] `index` values are sequential starting from 0
- [ ] Every Challenge has exactly ONE `isAnswer: true` option
- [ ] Every Challenge has both `question` and `explanation` slots
- [ ] `group` and `title` props are present on every Challenge
- [ ] All slots use proper `<slot name="...">` syntax

### 3. Content Quality

- [ ] Questions test real knowledge, not trivia
- [ ] Wrong answers are plausible misconceptions
- [ ] Explanations explain WHY, not just WHAT
- [ ] Code examples are correct and runnable
- [ ] Explanations include fixes/solutions for error questions
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

# Validate quiz structure
bun run fix-quizzes

# Build to verify no errors
bun run build
```

### 6. Generate Screenshots (for social images)

```bash
bun run screenshots
```

## Common Gotchas to Avoid

### DON'T

- ❌ Use `getCollection("posts")` directly — use `PostCollections` from `@/shared/postsCache`
- ❌ Manually edit `public/_redirects` — use frontmatter `redirects` array
- ❌ Put multiple `isAnswer: true` in one question (unless intentional)
- ❌ Write explanations that just repeat the question
- ❌ Make wrong answers obviously wrong
- ❌ Use emojis excessively (1-3 per section max)
- ❌ Forget the `client:load` directive on Challenges
- ❌ Skip the warmup questions
- ❌ Write code that doesn't actually work as described

### DO

- ✅ Start with warmup questions (2-3 easy ones)
- ✅ Group related questions together
- ✅ Include real-world context in explanations
- ✅ Show multiple solutions when applicable
- ✅ Link to authoritative resources
- ✅ Use personality and humor appropriately
- ✅ Test code examples before including them
- ✅ Run `bun run fix-quizzes` before committing

## File Structure

```
src/content/posts/YYYY-MM-DD--quiz-[topic-slug]/
├── index.mdx                    # Quiz content
├── [cover]-wide.webp            # Full width cover image
├── [cover]-square-200.webp      # Mobile cover (200px)
└── [cover]-square-300px.webp    # Icon cover (300px, optional)
```

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

### Hint System

Hints are attached to individual wrong answers and shown after the first incorrect attempt:

```js
options={[
  { text: 'Wrong A', hint: "Think about X..." },
  { text: 'Wrong B', hint: "Consider Y..." },
  { text: 'Correct', isAnswer: true },
]}
```

### Multiple Correct Answers (Rare)

Some questions intentionally have multiple correct answers:

```js
options={[
  { text: 'TypeScript error', isAnswer: true },
  { text: 'null', isAnswer: true },  // Both are valid answers
  { text: 'undefined' },
]}
```

Use this sparingly and explain in the explanation why there are two answers.

### Objectives & Difficulty (Rust Pattern)

For advanced/technical quizzes:

```mdx
<Challenge
  index={0}
  difficulty={2}
  objectives={[
    "Understand concept X",
    "Identify pattern Y",
    "Apply solution Z"
  ]}
>
```

### Standards Compliance (Optional)

For language-specific quizzes, you can reference standards:

```mdx
<Challenge
  standards={["ES2022", "ECMA-262"]}
>
```

## Question Count Guidelines

- **Minimum**: 10 questions
- **Typical**: 12-16 questions
- **Maximum**: ~20 questions (beyond this, consider splitting into parts)

For very long quizzes, split into Part 1, Part 2, etc. with cross-links:

```mdx
> **Part 1 of 2.** [Go to Part 2](/quiz-postgres-sql-mastery-pt2/)
```

## Tag Guidelines

Always include these tag categories:

1. **Quiz identifier**: `quiz`
2. **Topic**: `javascript`, `rust`, `css`, `postgresql`, `bash`, `regex`
3. **Sub-topic** (optional): `error-handling`, `memory-management`, `destructuring`
4. **Difficulty levels**: `intro`, `beginner`, `intermediate`, `advanced`, `expert`

Example:
```yaml
tags: [quiz, javascript, error-handling, intermediate, advanced]
```
