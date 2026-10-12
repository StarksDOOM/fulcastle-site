import assert from "node:assert/strict";
import test from "node:test";
import { findUnlocalizedJsxCopy } from "../scripts/check-i18n.mjs";
import { defaultLocale, isLocale, localizePath, messages } from "../lib/i18n.ts";

test("English remains the default locale", () => assert.equal(defaultLocale, "en"));
test("only supported locales are accepted", () => {
  assert.equal(isLocale("en"), true); assert.equal(isLocale("es"), true);
  assert.equal(isLocale("fr"), false); assert.equal(isLocale(undefined), false);
});
test("locale paths preserve the current route", () => {
  assert.equal(localizePath("/", "es"), "/es"); assert.equal(localizePath("/about", "es"), "/es/about");
  assert.equal(localizePath("/es/about", "en"), "/about"); assert.equal(localizePath("/es", "en"), "/");
  assert.equal(localizePath("/contact", "en"), "/contact");
});
test("English and Spanish shared UI catalogs expose the same keys", () => {
  function flatten(value, prefix = "") {
    if (typeof value !== "object" || value === null) return [prefix];
    return Object.entries(value).flatMap(([key, child]) => flatten(child, prefix ? `${prefix}.${key}` : key));
  }
  assert.deepEqual(flatten(messages.en).sort(), flatten(messages.es).sort());
});
test("localized public routes keep a single shared page structure", async () => {
  const fs = await import("node:fs/promises");
  for (const path of ["../app/page.tsx", "../app/about/page.tsx", "../app/ventures/page.tsx", "../app/privacy-policy/page.tsx", "../app/terms-of-use/page.tsx"]) {
    const source = await fs.readFile(new URL(path, import.meta.url), "utf8");
    assert.doesNotMatch(source, /SpanishPage|spanish-public-pages/); assert.match(source, /locale === "es"/);
  }
});
test("audit rejects hardcoded visible JSX copy", () => {
  const findings = findUnlocalizedJsxCopy("<main><p>English-only text slipped in</p></main>");
  assert.equal(findings.length, 1); assert.match(findings[0], /hardcoded visible JSX text/);
});
test("audit rejects hardcoded accessibility and image text", () => {
  const findings = findUnlocalizedJsxCopy('<img alt="A beautiful picture" /><button aria-label="Open menu" />');
  assert.equal(findings.length, 2);
  assert.ok(findings.some(f => f.includes('alt="A beautiful picture"')));
  assert.ok(findings.some(f => f.includes('aria-label="Open menu"')));
});

test("audit permits known venture names and people names while catching ordinary copy", () => {
  const findings = findUnlocalizedJsxCopy("<main><h2>Vantage</h2><h2>Civora</h2><h2>Sweet Nothings</h2><h2>PropTech Real Estate</h2><h2>Gamaliel Fulgencio</h2><h2>Roman Castillo</h2><p>Untranslated description</p></main>");
  assert.equal(findings.length, 1);
  assert.match(findings[0], /Untranslated description/);
});

test("audit ignores decorative text and whitespace", () => {
  assert.deepEqual(findUnlocalizedJsxCopy('<div aria-hidden="true"><span>Decorative copy</span></div><p> </p>'), []);
});
