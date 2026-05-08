import {
  DEFAULT_LOCALE,
  getLocalizedPostSlug,
  isLocale,
  type Locale,
} from "./i18n.ts";

export const fixSlugPrefix = (slug: string) => slug.replace(/^[\d-]+--/, "");

export type ParsedPostId = {
  baseDir: string;
  baseSlug: string;
  locale: Locale;
  routeSlug: string;
  isTranslation: boolean;
};

export const parsePostId = (id: string): ParsedPostId => {
  const withoutIndex = id.replace(/\/index$/, "");
  const parts = withoutIndex.split("/").filter(Boolean);
  const lastPart = parts[parts.length - 1];
  const isTranslation = isLocale(lastPart) && lastPart !== DEFAULT_LOCALE;
  const locale = isTranslation ? lastPart : DEFAULT_LOCALE;
  const baseDir = isTranslation ? parts.slice(0, -1).join("/") : parts.join("/");
  const baseSlug = fixSlugPrefix(baseDir);

  return {
    baseDir,
    baseSlug,
    locale,
    routeSlug: getLocalizedPostSlug(baseSlug, locale),
    isTranslation,
  };
};

export const getSlugFromId = (id: string) => parsePostId(id).routeSlug;

export const slugify = (str?: string) => {
  return `${str ?? ""}`
    .toLowerCase()
    .replace(/ +/g, "-")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-");
};
