import assert from "node:assert/strict";
import test from "node:test";
import { defaultLocale, isLocale, localizePath, messages } from "../lib/i18n.ts";

test("English remains the default locale", () => {
  assert.equal(defaultLocale, "en");
});

test("only supported locales are accepted", () => {
  assert.equal(isLocale("en"), true);
  assert.equal(isLocale("es"), true);
  assert.equal(isLocale("fr"), false);
  assert.equal(isLocale(undefined), false);
});

test("locale paths preserve the current route", () => {
  assert.equal(localizePath("/", "es"), "/es");
  assert.equal(localizePath("/about", "es"), "/es/about");
  assert.equal(localizePath("/es/about", "en"), "/about");
  assert.equal(localizePath("/es", "en"), "/");
  assert.equal(localizePath("/contact", "en"), "/contact");
});

test("English and Spanish shared UI catalogs expose the same keys", () => {
  function flatten(value, prefix = "") {
    if (typeof value !== "object" || value === null) return [prefix];
    return Object.entries(value).flatMap(([key, child]) =>
      flatten(child, prefix ? `${prefix}.${key}` : key),
    );
  }

  assert.deepEqual(
    flatten(messages.en).sort(),
    flatten(messages.es).sort(),
  );
});
