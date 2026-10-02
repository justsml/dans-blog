export const designs = [
  { id: "warm-editorial", name: "Warm editorial", note: "A quiet journal in ivory, ink, and terracotta." },
  { id: "dark-studio", name: "Dark studio", note: "Graphite, mint, and a compact reading list." },
  { id: "bold-type", name: "Bold type", note: "Big type, cobalt, and an asymmetric editorial grid." },
  { id: "modular-magazine", name: "Modular magazine", note: "A soft, image-led grid with room for open source." },
] as const;

export type Design = (typeof designs)[number]["id"];
