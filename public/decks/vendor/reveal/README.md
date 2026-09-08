# Deck runtime

Vendored Reveal.js 5.2.0 runtime (`reveal.js`, `reveal.css`, and the `notes.js` speaker-view plugin), with its MIT license in `REVEAL-LICENSE`.

Copied byte-for-byte on 8 September 2026 from the repository's existing vendor files. This directory belongs to the hand-authored decks and has no dependency on the retired generated-deck wrappers or their asset directory. No package installation or version change was made.

Deck design, route selection, fragments, and speaker notes stay in each deck's HTML. The runtime does not generate talk content. To update it, replace this matched set together and check navigation, fragments, and speaker view.
