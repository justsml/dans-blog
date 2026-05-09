# Judgement

Selected candidate: `d9ff52e40c2af5cbb4bad146f40a98db55cf228c` (`openrouter/google/gemini-3.1-flash-lite-preview`)

## Decision

Ho scelto il candidato Gemini 3.1 Flash Lite perché è quello che meglio bilancia accuratezza tecnica, naturalezza dell'italiano e fedeltà alla struttura MDX. Mantiene il frontmatter completo, conserva i link, le immagini e i blocchi di codice, e traduce il contenuto con la minore quantità di frizione possibile.

## Why the others lost

`059b17717d71d15024a3b5308cf5eb7dd3d486c5` è la traduzione meno convincente: diversi passaggi suonano più letterali che naturali, e la terminologia tecnica è meno stabile. In punti chiave la prosa è più rigida e meno leggibile.

`c006d611646586a8bdfc82a47368f18200800c08` è più vicino come tono, ma introduce un problema serio di preservazione MDX e frontmatter. Il file mostrato dal commit è sostanzialmente incompleto rispetto alla struttura dell'articolo originale, quindi non è una base affidabile.

## Light polish applied

Ho mantenuto il candidato vincente come base e ho applicato solo una rifinitura leggera:

- Ho preservato tutta la struttura MDX e il frontmatter completo.
- Ho normalizzato qualche scelta lessicale per renderla più fluida in italiano senza alterare il significato.
- Ho lasciato intatti URL, componenti, blocchi di codice e riferimenti tecnici.

## Notes

- Technical accuracy: good
- Natural language quality: good
- Dan-style directness: good
- MDX preservation: best of the three
