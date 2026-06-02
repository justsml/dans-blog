import {
  ACTIVE_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  getBaseSlugFromRouteSlug,
  getLocalizedPostPath,
  getLocalizedPostSlug,
  sortLanguageOptions,
  type LanguageOption,
  type Locale,
} from "./i18n";

export type PostRouteLookup = (routeSlug: string) => boolean;

export type PostAlternate = {
  locale: Locale;
  href: string;
};

export function normalizePostBaseSlug(slug: string) {
  return getBaseSlugFromRouteSlug(slug);
}

export function hasPostForLocale(
  baseSlug: string,
  locale: Locale,
  hasRouteSlug: PostRouteLookup,
) {
  return hasRouteSlug(getLocalizedPostSlug(normalizePostBaseSlug(baseSlug), locale));
}

export function hasPostTranslation(
  baseSlug: string,
  locale: Locale,
  hasRouteSlug: PostRouteLookup,
) {
  return locale !== DEFAULT_LOCALE && hasPostForLocale(baseSlug, locale, hasRouteSlug);
}

export function getLocalizedPostHref(
  baseSlug: string,
  locale: Locale,
  hasRouteSlug: PostRouteLookup,
) {
  const normalizedBaseSlug = normalizePostBaseSlug(baseSlug);
  const targetLocale =
    locale === DEFAULT_LOCALE || hasPostForLocale(normalizedBaseSlug, locale, hasRouteSlug)
      ? locale
      : DEFAULT_LOCALE;

  return getLocalizedPostPath(normalizedBaseSlug, targetLocale);
}

export function getPostAlternates(
  baseSlug: string,
  hasRouteSlug: PostRouteLookup,
): PostAlternate[] {
  const normalizedBaseSlug = normalizePostBaseSlug(baseSlug);

  return [DEFAULT_LOCALE, ...ACTIVE_LOCALES]
    .filter((locale) => hasPostForLocale(normalizedBaseSlug, locale, hasRouteSlug))
    .map((locale) => ({
      locale,
      href: getLocalizedPostPath(normalizedBaseSlug, locale),
    }));
}

export function getPostLanguageOptions(
  baseSlug: string,
  currentLocale: Locale,
  hasRouteSlug: PostRouteLookup,
): LanguageOption[] {
  const normalizedBaseSlug = normalizePostBaseSlug(baseSlug);

  return sortLanguageOptions(
    [DEFAULT_LOCALE, ...ACTIVE_LOCALES].map((locale) => {
      const isTranslated = locale === DEFAULT_LOCALE
        ? true
        : hasPostTranslation(normalizedBaseSlug, locale, hasRouteSlug);

      return {
        locale,
        label: LOCALE_LABELS[locale],
        href: isTranslated
          ? getLocalizedPostPath(normalizedBaseSlug, locale)
          : getLocalizedPostPath(normalizedBaseSlug, DEFAULT_LOCALE),
        isCurrent: locale === currentLocale,
        isTranslated,
      };
    }),
  );
}
