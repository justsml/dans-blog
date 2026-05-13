import { describe, expect, test } from "bun:test";
import {
  ACTIVE_LOCALES,
  DEFAULT_LOCALE,
  FUTURE_LOCALES,
  getBaseSlugFromRouteSlug,
  getLocaleFromRouteSlug,
  getLocalizedPagePath,
  getLocalizedPostPath,
  getLocalizedPostSlug,
  getPageAlternates,
  getPageLanguageOptions,
  getUnlocalizedPagePath,
  isActiveLocale,
  isLocale,
  normalizeRoutePath,
} from "./i18n";
import { getSlugFromId, parsePostId } from "./pathHelpers";

describe("i18n post routing helpers", () => {
  test("keeps English posts unprefixed", () => {
    const parsed = parsePostId("2026-05-02--postgres-text-search-guide/index");

    expect(parsed.locale).toBe(DEFAULT_LOCALE);
    expect(parsed.baseSlug).toBe("postgres-text-search-guide");
    expect(parsed.routeSlug).toBe("postgres-text-search-guide");
    expect(parsed.isTranslation).toBe(false);
    expect(getSlugFromId("2026-05-02--postgres-text-search-guide/index")).toBe(
      "postgres-text-search-guide",
    );
  });

  test("maps nested locale files to locale-prefixed routes", () => {
    const parsed = parsePostId("2026-05-02--postgres-text-search-guide/es/index");

    expect(parsed.locale).toBe("es");
    expect(parsed.baseSlug).toBe("postgres-text-search-guide");
    expect(parsed.routeSlug).toBe("es/postgres-text-search-guide");
    expect(parsed.isTranslation).toBe(true);
    expect(getSlugFromId("2026-05-02--postgres-text-search-guide/es/index")).toBe(
      "es/postgres-text-search-guide",
    );
  });

  test("builds normalized localized paths", () => {
    expect(getLocalizedPostPath("postgres-text-search-guide")).toBe(
      "/postgres-text-search-guide/",
    );
    expect(getLocalizedPostPath("postgres-text-search-guide", "ja")).toBe(
      "/ja/postgres-text-search-guide/",
    );
    expect(getLocalizedPostPath("postgres-text-search-guide", "ru")).toBe(
      "/ru/postgres-text-search-guide/",
    );
    expect(getLocalizedPostPath("postgres-text-search-guide", "de")).toBe(
      "/de/postgres-text-search-guide/",
    );
  });

  test("builds localized non-post page paths", () => {
    expect(getLocalizedPagePath("/")).toBe("/");
    expect(getLocalizedPagePath("/", "es")).toBe("/es/");
    expect(getLocalizedPagePath("/about/")).toBe("/about/");
    expect(getLocalizedPagePath("/about/", "es")).toBe("/es/about/");
    expect(getLocalizedPagePath("contact", "ja")).toBe("/ja/contact/");
  });

  test("derives localized language options from prefixed page paths", () => {
    expect(getUnlocalizedPagePath("/es/category/code/")).toBe("/category/code/");

    const options = getPageLanguageOptions("/es/category/code/", "es", [
      DEFAULT_LOCALE,
      "es",
      "ja",
    ]);

    expect(options).toEqual([
      {
        locale: "en",
        label: "English",
        href: "/category/code/",
        isCurrent: false,
        isTranslated: true,
      },
      {
        locale: "es",
        label: "Español",
        href: "/es/category/code/",
        isCurrent: true,
        isTranslated: true,
      },
      {
        locale: "ja",
        label: "日本語",
        href: "/ja/category/code/",
        isCurrent: false,
        isTranslated: true,
      },
    ]);
  });

  test("does not double-prefix page alternates", () => {
    expect(getPageAlternates("/fr/contact/", [DEFAULT_LOCALE, "fr"])).toEqual([
      { locale: "en", href: "/contact/" },
      { locale: "fr", href: "/fr/contact/" },
    ]);
  });

  test("normalizes route paths without duplicating slashes", () => {
    expect(normalizeRoutePath("postgres-text-search-guide")).toBe(
      "/postgres-text-search-guide/",
    );
    expect(normalizeRoutePath("/postgres-text-search-guide/")).toBe(
      "/postgres-text-search-guide/",
    );
    expect(normalizeRoutePath("///ja/postgres-text-search-guide///")).toBe(
      "/ja/postgres-text-search-guide/",
    );
    expect(normalizeRoutePath("///")).toBe("/");
  });

  test("keeps active translation slugs prefixed and English slugs unprefixed", () => {
    expect(getLocalizedPostSlug("postgres-text-search-guide", DEFAULT_LOCALE)).toBe(
      "postgres-text-search-guide",
    );

    for (const locale of ACTIVE_LOCALES) {
      expect(getLocalizedPostSlug("postgres-text-search-guide", locale)).toBe(
        `${locale}/postgres-text-search-guide`,
      );
      expect(getLocalizedPostPath("postgres-text-search-guide", locale)).toBe(
        `/${locale}/postgres-text-search-guide/`,
      );
    }
  });

  test("distinguishes supported future locales from active rollout locales", () => {
    expect(FUTURE_LOCALES).toContain("zh");
    expect(isLocale("zh")).toBe(true);
    expect(isActiveLocale("zh")).toBe(false);
    expect(isLocale("pt")).toBe(false);
    expect(isActiveLocale("pt")).toBe(false);
  });

  test("parses future locale routes but does not treat unsupported prefixes as locales", () => {
    expect(getLocaleFromRouteSlug("zh/postgres-text-search-guide")).toBe("zh");
    expect(getBaseSlugFromRouteSlug("zh/postgres-text-search-guide")).toBe(
      "postgres-text-search-guide",
    );

    expect(getLocaleFromRouteSlug("pt/postgres-text-search-guide")).toBe("en");
    expect(getBaseSlugFromRouteSlug("pt/postgres-text-search-guide")).toBe(
      "pt/postgres-text-search-guide",
    );
  });

  test("extracts locale and base slug from route slugs", () => {
    expect(getLocaleFromRouteSlug("hi/postgres-text-search-guide")).toBe("hi");
    expect(getLocaleFromRouteSlug("fr/postgres-text-search-guide")).toBe("fr");
    expect(getLocaleFromRouteSlug("postgres-text-search-guide")).toBe("en");
    expect(getBaseSlugFromRouteSlug("hi/postgres-text-search-guide")).toBe(
      "postgres-text-search-guide",
    );
    expect(getBaseSlugFromRouteSlug("it/postgres-text-search-guide")).toBe(
      "postgres-text-search-guide",
    );
    expect(getBaseSlugFromRouteSlug("postgres-text-search-guide")).toBe(
      "postgres-text-search-guide",
    );
  });
});
