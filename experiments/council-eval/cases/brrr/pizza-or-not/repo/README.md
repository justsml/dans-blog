# Pizza or Not

The Bureau of Pizza Determination: upload one photo, get an official ruling on whether
it contains a pizza, plus a deadpan verdict people screenshot and share.

```bash
bun install
ANTHROPIC_API_KEY=... bun start
curl --data-binary @samples/phone-photo.jpg localhost:3000/inspect
```

## How it works

`src/inspector.ts` runs two steps per photo: the Inspector **examines** the photo
and writes notes, then **rules** using the notes and the photo. The handbook in
`prompts/pizza.md` is the system prompt for both steps. `src/ruling.ts` parses the
JSON ruling.

`POST /bulk` takes a list of image URLs. Partner sites use it to run their whole
upload backlog overnight; nobody waits on it.

## Traffic

- About 50,000 photos a day. Roughly 60% arrive through `/bulk`.
- Most uploads come straight off phones: typically 4032×3024 JPEGs, 2–5 MB.
- The same viral photos get submitted over and over. On a typical day about a third of
  uploads are byte-identical to an earlier one.
- `logs/usage-sample.jsonl` has the token usage of a sample of recent requests.

## The bill

Last month's API invoice was about $320,000. Finance has asked us, politely and
then less politely, to do something about it. The verdicts have to stay as good as they
are: they are the product.
