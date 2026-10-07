export const designs = [
  { id: "warm-editorial", name: "Warm editorial", note: "A quiet journal in ivory, ink, and terracotta." },
  { id: "warm-journal", name: "Lead story", note: "A compact introduction and a generous lead story." },
  { id: "warm-library", name: "Reading room", note: "A text-first index with restrained photographic details." },
  { id: "warm-dispatch", name: "Side notes", note: "A photographic magazine with an open-source side rail." },
  { id: "warm-paper", name: "Paper atelier", note: "Sculptural paper cut-outs, architectural shapes, and a restrained editorial palette." },
  { id: "dark-studio", name: "Dark studio", note: "Graphite, mint, and a compact reading list." },
  { id: "bold-type", name: "Bold type", note: "Big type, cobalt, and an asymmetric editorial grid." },
  { id: "modular-magazine", name: "Modular magazine", note: "A soft, image-led grid with room for open source." },
] as const;

export type Design = (typeof designs)[number]["id"];
export const isWarmDesign = (design: Design) => design.startsWith("warm-");
export const warmDesigns = designs.filter(({ id }) => isWarmDesign(id));
export const previewPostHref = (design: Design, slug: string) => `/designs/${design}/${slug}/`;
