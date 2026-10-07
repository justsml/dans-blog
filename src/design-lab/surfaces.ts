export const surfaces = [
  { id: "cotton", name: "Cotton stock", home: "A softly flecked, uncoated paper. Warm paper grain and a visible, softly mottled fiber texture.", article: "Fine paper tooth, with the larger fibers removed from the reading area." },
  { id: "mist", name: "Morning mist", home: "Warm cloud banks at the edges; an open, luminous center.", article: "The clouds recede into the outer margins, leaving a quiet page." },
  { id: "mineral", name: "Mineral wash", home: "Clay, limestone, and a trace of sage, like pigment settling into plaster.", article: "A faint mineral stain around the edges of the paper." },
  { id: "press", name: "Sunday edition", home: "Soft ink grain and the ghost of a printed page, without actual text.", article: "Dry, fine newsprint grain; the ink impressions fall away." },
  { id: "light", name: "Window light", home: "Diffuse botanical shadows in amber afternoon light, with a very slow shift.", article: "Still afternoon light in the margins. No movement while reading." },
] as const;

export type Surface = (typeof surfaces)[number]["id"];
