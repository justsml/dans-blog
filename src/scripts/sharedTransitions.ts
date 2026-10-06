// Shared-element names are assigned per navigation, never baked into markup: a post can be listed
// twice on one page (grid + footer), and a duplicate view-transition-name aborts the whole transition.
type Parts = { title?: HTMLElement | null; media?: HTMLElement | null };
type Navigation = Event & {
  from: URL;
  to: URL;
  navigationType: "push" | "replace" | "traverse";
  sourceElement?: Element;
  newDocument: Document;
  loader: () => Promise<void>;
};

const LINKS = "a.article-card, a.footer-article-card";
const TITLE = ".post-title, .footer-article-card__title";
const MEDIA = ".article-card__media, .footer-article-card__media";
const MARK = "data-shared-vt";

const pathOf = (href: string, base: string) => new URL(href, base).pathname.replace(/\/+$/, "") || "/";

const linkParts = (link?: Element | null): Parts => ({
  title: link?.querySelector<HTMLElement>(TITLE),
  media: link?.querySelector<HTMLElement>(MEDIA),
});

const articleParts = (doc: Document): Parts => {
  const main = doc.querySelector("main.article");
  return { title: main?.querySelector<HTMLElement>(":scope > h1.p-name"), media: main?.querySelector<HTMLElement>(".u-photo") };
};

const findLink = (doc: Document, target: string, base: string) =>
  [...doc.querySelectorAll<HTMLAnchorElement>(LINKS)].find((link) => pathOf(link.getAttribute("href") ?? "", base) === target);

function nameParts({ title, media }: Parts) {
  for (const [element, kind] of [[title, "title"], [media, "media"]] as const) {
    if (!element) continue;
    element.style.setProperty("view-transition-name", `shared-${kind}`);
    element.style.setProperty("view-transition-class", `article-${kind}`);
    element.setAttribute(MARK, "");
  }
}

function clearNames(doc: Document) {
  for (const element of doc.querySelectorAll<HTMLElement>(`[${MARK}]`)) {
    element.style.removeProperty("view-transition-name");
    element.style.removeProperty("view-transition-class");
    element.removeAttribute(MARK);
  }
}

const inView = (element?: HTMLElement | null) => {
  const rect = element?.getBoundingClientRect();
  return !!rect && rect.bottom > 0 && rect.top < innerHeight;
};

// What the incoming page should pair with, decided before the old snapshot is taken.
let pending: { pair: "article" | "card"; target: string; traverse: boolean } | undefined;

document.addEventListener("astro:before-preparation", (event) => {
  const navigation = event as Navigation;
  const load = navigation.loader;
  navigation.loader = async () => {
    await load();
    clearNames(document);
    pending = undefined;
    const from = pathOf(navigation.from.href, location.href);
    const to = pathOf(navigation.to.href, location.href);
    const traverse = navigation.navigationType === "traverse";
    const source = navigation.sourceElement?.closest(LINKS);
    if (source && navigation.newDocument.querySelector("main.article")) {
      // Card or footer tile → its article.
      nameParts(linkParts(source));
      pending = { pair: "article", target: to, traverse };
    } else if (document.querySelector("main.article") && findLink(navigation.newDocument, from, navigation.to.href)) {
      // Article → any page listing it (home, archive, another article's footer).
      nameParts(articleParts(document));
      pending = { pair: "card", target: from, traverse };
    }
  };
});

// Inside the transition's update callback, after scroll restoration, so positions are final.
document.addEventListener("astro:after-swap", () => {
  const next = pending;
  pending = undefined;
  if (!next) return;
  if (next.pair === "article") {
    nameParts(articleParts(document));
    return;
  }
  const card = linkParts(findLink(document, next.target, location.href));
  // Back restores scroll to the card; a fresh visit opens at the top, where an off-screen card would fly away.
  if (next.traverse || inView(card.title ?? card.media)) nameParts(card);
});
