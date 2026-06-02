import { describe, expect, test } from "bun:test";
import { DEFAULT_LOCALE, type Locale } from "./i18n";
import {
  getLocalizedPostHref,
  getPostAlternates,
  getPostLanguageOptions,
  hasPostForLocale,
  hasPostTranslation,
  normalizePostBaseSlug,
} from "./postLocalization";

const routeSlugs = new Set([
  "deep-module",
  "es/deep-module",
  "fr/deep-module",
  "ja/other-post",
]);
const hasRouteSlug = (slug: string) => routeSlugs.has(slug);

describe("post localization helpers", () => {
  test("normalizes route slugs to their base post slug", () => {
    expect(normalizePostBaseSlug("deep-module")).toBe("deep-module");
    expect(normalizePostBaseSlug("es/deep-module")).toBe("deep-module");
  });

  test("checks post availability by locale", () => {
    expect(hasPostForLocale("deep-module", DEFAULT_LOCALE, hasRouteSlug)).toBe(true);
    expect(hasPostForLocale("deep-module", "es", hasRouteSlug)).toBe(true);
    expect(hasPostForLocale("deep-module", "ja", hasRouteSlug)).toBe(false);
  });

  test("treats only non-default localized posts as translations", () => {
    expect(hasPostTranslation("deep-module", DEFAULT_LOCALE, hasRouteSlug)).toBe(false);
    expect(hasPostTranslation("deep-module", "fr", hasRouteSlug)).toBe(true);
    expect(hasPostTranslation("deep-module", "ru", hasRouteSlug)).toBe(false);
  });

  test("falls localized hrefs back to English when a translation is missing", () => {
    expect(getLocalizedPostHref("deep-module", DEFAULT_LOCALE, hasRouteSlug)).toBe(
      "/deep-module/",
    );
    expect(getLocalizedPostHref("deep-module", "es", hasRouteSlug)).toBe(
      "/es/deep-module/",
    );
    expect(getLocalizedPostHref("deep-module", "ja", hasRouteSlug)).toBe(
      "/deep-module/",
    );
  });

  test("builds alternates only for posts with actual localized routes", () => {
    expect(getPostAlternates("deep-module", hasRouteSlug)).toEqual([
      { locale: "en", href: "/deep-module/" },
      { locale: "es", href: "/es/deep-module/" },
      { locale: "fr", href: "/fr/deep-module/" },
    ]);
  });

  test("builds language options with current locale first and missing translations disabled", () => {
    const options = getPostLanguageOptions("deep-module", "ja", hasRouteSlug);
    const byLocale = Object.fromEntries(
      options.map((option) => [option.locale, option]),
    ) as Record<Locale, (typeof options)[number]>;

    expect(options[0]).toMatchObject({
      locale: "ja",
      href: "/deep-module/",
      isCurrent: true,
      isTranslated: false,
    });
    expect(byLocale.en).toMatchObject({
      href: "/deep-module/",
      isTranslated: true,
    });
    expect(byLocale.es).toMatchObject({
      href: "/es/deep-module/",
      isTranslated: true,
    });
    expect(byLocale.ru).toMatchObject({
      href: "/deep-module/",
      isTranslated: false,
    });
  });
});
