# JA Translation Judge

Selected candidate: `96ccb81545eae49616344b042c77aaf08c6ccdf2`

## Decision

I chose the Kimi candidate as the base because it had the best balance of technical fidelity, readable Japanese, and preserved MDX structure. It kept the code examples intact, translated the prose without drifting into awkward literalism, and avoided the larger terminology problems present in the other candidates.

I then lightly polished the selected text for consistency and directness, keeping Dan's blunt tone while tightening a few phrases that sounded too formal or too machine-translated.

## Why the others lost

- `9edf09426d8334dde91e6ae07dbf9794849bbb7f` had several natural-sounding passages, but it left too many English fragments in place and softened a few technical claims.
- `da9df04d6b80a81fb9a47c1cc6c4941115be16c0` was the weakest on MDX preservation and terminology consistency. It also introduced clear translation noise, including malformed phrasing in the USB-C analogy section.
- `61ec25db5bf86941ed7b0df024975e40c39d9d14` was readable, but it over-literalized several passages and used unnatural wording like `箱庭`, which does not fit the article's point or voice.
- `914852cba7c4d33426cffcd3b7c73ee82af54eb4` was the most direct, but it had the roughest phrasing overall and the least stable Japanese style.

## Notes

- MDX frontmatter and fenced code blocks were preserved.
- I kept the existing English identifiers and API names in code samples.
- I kept the article direct and pragmatic rather than overly polite or essay-like.
