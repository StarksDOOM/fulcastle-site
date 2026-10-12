import assert from "node:assert/strict";
import test from "node:test";
import { findUnlocalizedJsxCopy } from "../scripts/check-i18n.mjs";
import { defaultLocale, isLocale, localizePath, messages } from "../lib/i18n.ts";
import { isSpanishSpeakingCountry } from "../proxy.ts";

test("English remains the fallback locale", () => assert.equal(defaultLocale, "en"));
test("Spanish-speaking country detection uses country codes", () => {
  for (const country of ["DO", "ES", "MX", "AR", "CO", "PR"]) {
    assert.equal(isSpanishSpeakingCountry(country), true, country);
  }
  for (const country of ["US", "CA", "FR", null, undefined]) {
    assert.equal(isSpanishSpeakingCountry(country), false, String(country));
  }
});
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

test("audit detects hardcoded copy in rendered JSX expressions", () => {
  const findings = findUnlocalizedJsxCopy('<main><p>{isReady && "English-only copy"}</p><p>{condition ? "First hardcoded option" : "Second hardcoded option"}</p></main>');
  assert.equal(findings.length, 3, findings.join("\\n"));
  assert.ok(findings.some(f => f.includes("English-only copy")));
  assert.ok(findings.some(f => f.includes("First hardcoded option")));
  assert.ok(findings.some(f => f.includes("Second hardcoded option")));
});

test("audit permits complete locale-guarded text pairs and locale-selected content", () => {
  const source = '<main><p>{locale === "es" ? "Texto en español" : "English text"}</p><p>{locale === "es" ? spanishCopy : englishCopy}</p><img alt={locale === "es" ? "Imagen arquitectónica" : "Architectural image"} /></main>';
  assert.deepEqual(findUnlocalizedJsxCopy(source), []);
});

test("audit catches a hardcoded expression inside a user-facing attribute", () => {
  const findings = findUnlocalizedJsxCopy('<button aria-label={isOpen ? "Close menu" : "Open menu"} />');
  assert.equal(findings.length, 2, findings.join("\\n"));
});
