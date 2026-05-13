export const DEFAULT_LOCALE = "en" as const;

export const ACTIVE_LOCALES = ["es", "hi", "ja", "ru", "de", "fr", "it"] as const;
export const FUTURE_LOCALES = ["zh"] as const;
export const SUPPORTED_LOCALES = [
  DEFAULT_LOCALE,
  ...ACTIVE_LOCALES,
  ...FUTURE_LOCALES,
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type ActiveLocale = (typeof ACTIVE_LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  hi: "हिन्दी",
  ja: "日本語",
  ru: "Русский",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  zh: "中文",
};

export const LOCALE_DISCLOSURE: Record<ActiveLocale, string> = {
  es: "Traducido con IA y revisado por precisión técnica.",
  hi: "AI से अनुवादित और तकनीकी सटीकता के लिए समीक्षा की गई।",
  ja: "AIで翻訳し、技術的な正確性を確認済みです。",
  ru: "Переведено с помощью ИИ и проверено на техническую точность.",
  de: "Mit KI übersetzt und auf technische Genauigkeit geprüft.",
  fr: "Traduit par IA et vérifié pour l’exactitude technique.",
  it: "Tradotto con IA e verificato per accuratezza tecnica.",
};

export function isLocale(value: string | undefined): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function isActiveLocale(value: string | undefined): value is ActiveLocale {
  return ACTIVE_LOCALES.includes(value as ActiveLocale);
}

export function stripLeadingSlash(path: string) {
  return path.replace(/^\/+/, "");
}

export function stripTrailingSlash(path: string) {
  return path.replace(/\/+$/, "");
}

export function normalizeRoutePath(path: string) {
  const stripped = stripTrailingSlash(stripLeadingSlash(path));
  return stripped ? `/${stripped}/` : "/";
}

export function getLocalizedPostSlug(baseSlug: string, locale: Locale = DEFAULT_LOCALE) {
  return locale === DEFAULT_LOCALE ? baseSlug : `${locale}/${baseSlug}`;
}

export function getLocalizedPostPath(baseSlug: string, locale: Locale = DEFAULT_LOCALE) {
  return normalizeRoutePath(getLocalizedPostSlug(baseSlug, locale));
}

export function getLocalizedPagePath(path: string, locale: Locale = DEFAULT_LOCALE) {
  const normalizedPath = normalizeRoutePath(path);
  if (locale === DEFAULT_LOCALE) return normalizedPath;
  if (normalizedPath === "/") return `/${locale}/`;
  return normalizeRoutePath(`${locale}/${stripLeadingSlash(normalizedPath)}`);
}

export function getPageAlternates(path: string, locales: readonly Locale[] = [
  DEFAULT_LOCALE,
  ...ACTIVE_LOCALES,
]) {
  return locales.map((locale) => ({
    locale,
    href: getLocalizedPagePath(path, locale),
  }));
}

export function getLocaleFromRouteSlug(slug: string): Locale {
  const [firstSegment] = stripLeadingSlash(slug).split("/");
  return isLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
}

export function getBaseSlugFromRouteSlug(slug: string) {
  const segments = stripLeadingSlash(slug).split("/").filter(Boolean);
  return isLocale(segments[0]) ? segments.slice(1).join("/") : segments.join("/");
}

export function getHtmlLang(locale: Locale) {
  return locale;
}
