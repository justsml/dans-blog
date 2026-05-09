import { describe, expect, test } from "bun:test";
import {
  DEFAULT_LOCALE,
  getBaseSlugFromRouteSlug,
  getLocaleFromRouteSlug,
  getLocalizedPostPath,
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
