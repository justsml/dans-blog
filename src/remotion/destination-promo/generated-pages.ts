export type DestinationPage = {
  slug: string;
  url: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  width: number;
  height: number;
  scrollTarget: number;
};

export const destinationPages = [
  {
    slug: "home",
    url: "/",
    title: "DanLevy.net",
    subtitle: "Sharp technical writing for AI, code, search, security, and the operational weirdness in between.",
    category: "Home",
    image: "remotion/destination-promo/home.png",
    width: 1440,
    height: 3600,
    scrollTarget: 662,
  },
  {
    slug: "llm-connection-strings",
    url: "/llm-connection-strings/",
    title: "It's Time for llm:// Connection Strings",
    subtitle: "Simplify Model & Provider Config with `llm://` URLs",
    category: "AI",
    image: "remotion/destination-promo/llm-connection-strings.png",
    width: 1440,
    height: 3600,
    scrollTarget: 838,
  },
  {
    slug: "into-the-breach",
    url: "/into-the-breach/",
    title: "Into the Breach",
    subtitle: "Reduce local-dev risk with containers, canaries, and boring limits",
    category: "Security",
    image: "remotion/destination-promo/into-the-breach.png",
    width: 1440,
    height: 3600,
    scrollTarget: 788,
  },
  {
    slug: "llm-evals-are-broken",
    url: "/llm-evals-are-broken/",
    title: "Fight Evils with Evals!",
    subtitle: "Benchmarks measure benchmarks. Your system needs its own measures.",
    category: "AI",
    image: "remotion/destination-promo/llm-evals-are-broken.png",
    width: 1440,
    height: 3600,
    scrollTarget: 1042,
  },
  {
    slug: "postgres-text-search-guide",
    url: "/postgres-text-search-guide/",
    title: "Postgres Text Searching Guide 2026",
    subtitle: "The search tools already in your database, and when each one earns its keep.",
    category: "Code",
    image: "remotion/destination-promo/postgres-text-search-guide.png",
    width: 1440,
    height: 3600,
    scrollTarget: 1729,
  },
  {
    slug: "semantic-vector-search-landscape",
    url: "/semantic-vector-search-landscape/",
    title: "Semantic Vector Search and Other Topics to Win Friends and Lovers",
    subtitle: "The full search landscape: exact, fuzzy, semantic, hybrid — and when to layer all of them.",
    category: "Code",
    image: "remotion/destination-promo/semantic-vector-search-landscape.png",
    width: 1440,
    height: 3600,
    scrollTarget: 2200,
  },
] satisfies DestinationPage[];
