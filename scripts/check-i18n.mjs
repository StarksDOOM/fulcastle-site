import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { locales, messages } from "../lib/i18n.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function flattenKeys(value, prefix = "") {
  if (typeof value !== "object" || value === null) return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    flattenKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

const expectedLocales = ["en", "es"];
if (JSON.stringify([...locales].sort()) !== JSON.stringify(expectedLocales)) {
  errors.push(`Supported locales must be exactly: ${expectedLocales.join(", ")}`);
}

const enKeys = flattenKeys(messages.en).sort();
const esKeys = flattenKeys(messages.es).sort();
for (const key of enKeys.filter((key) => !esKeys.includes(key))) {
  errors.push(`Missing Spanish translation key: ${key}`);
}
for (const key of esKeys.filter((key) => !enKeys.includes(key))) {
  errors.push(`Missing English translation key: ${key}`);
}

const publicPages = [
  { path: "app/page.tsx", name: "Home" },
  { path: "app/about/page.tsx", name: "About" },
  { path: "app/ventures/page.tsx", name: "Ventures" },
  { path: "app/contact/page.tsx", name: "Contact" },
  { path: "app/privacy-policy/page.tsx", name: "Privacy Policy" },
  { path: "app/terms-of-use/page.tsx", name: "Terms of Use" },
];
const scannedSources = [
  ...publicPages.map((page) => page.path),
  "app/components/site-header.tsx",
  "app/components/site-footer.tsx",
  "app/contact/contact-form.tsx",
];

const brandOrNonCopy = new Set([
  "FulCastle", "Holdings, Inc.", "FulCastle Holdings, Inc.", "Rodar", "Vantage",
  "Civora", "Sweet Nothings", "PropTech Real Estate", "Gamaliel Fulgencio",
  "Roman Castillo", "EN", "ES", "↗", "/", "©",
]);

function isCopyCandidate(value) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length < 2 || text.length > 500) return false;
  if (!/[A-Za-zÀ-ÿ]/.test(text)) return false;
  if (brandOrNonCopy.has(text)) return false;
  if (/^(?:https?:\/\/|mailto:|tel:|[A-Z0-9_./:-]+)$/.test(text)) return false;
  if (/^(?:FulCastle|Holdings, Inc\.)$/.test(text)) return false;
  return true;
}

for (const page of publicPages) {
  const absolutePath = path.join(root, page.path);
  if (!fs.existsSync(absolutePath)) {
    errors.push(`Missing public route source: ${page.path}`);
    continue;
  }

  const source = fs.readFileSync(absolutePath, "utf8");
  const readsLocale =
    source.includes("x-site-locale") ||
    source.includes("messages[locale]") ||
    source.includes('locale === "es"') ||
    source.includes("locale === 'es'");
  if (!readsLocale) {
    errors.push(`${page.name}: page content does not read or branch on the active locale (${page.path})`);
  }

  const hasLocalizedMetadata =
    source.includes("generateMetadata") ||
    (source.includes("metadata") && readsLocale && /title\s*:\s*(?:isSpanish|locale|copy\.)/.test(source));
  if (!hasLocalizedMetadata) {
    errors.push(`${page.name}: page metadata is not generated from the active locale (${page.path})`);
  }
}

const hardcoded = [];
for (const relativePath of scannedSources) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) continue;
  const source = fs.readFileSync(absolutePath, "utf8");

  // Catch literal text nodes between JSX tags, including multiline copy. Expressions
  // such as {messages[locale].contact.submit} are skipped by design.
  const jsxText = />\s*([^<{][^<{}]*?[A-Za-zÀ-ÿ][^<{}]*?)\s*</gs;
  for (const match of source.matchAll(jsxText)) {
    const value = match[1].replace(/\s+/g, " ").trim();
    if (isCopyCandidate(value)) {
      const before = source.slice(0, match.index);
      const line = before.split("\n").length;
      hardcoded.push(`${relativePath}:${line}: raw JSX text: "${value}"`);
    }
  }

  // Catch common user-facing JSX attributes and copy fields embedded in page data.
  const props = /\b(?:alt|aria-label|placeholder|title|label|description|helperText|errorMessage|focus|category|tagline|paragraphs)\s*=\s*"([^"]+)"|\b(?:alt|aria-label|placeholder|title|label|description|focus|category|tagline)\s*:\s*"([^"]+)"/g;
  for (const match of source.matchAll(props)) {
    const value = match[1] ?? match[2];
    if (isCopyCandidate(value)) {
      const before = source.slice(0, match.index);
      const line = before.split("\n").length;
      hardcoded.push(`${relativePath}:${line}: hardcoded user-facing string: "${value}"`);
    }
  }
}

if (hardcoded.length) {
  errors.push(`Found ${hardcoded.length} hardcoded user-facing string(s) in public-page sources. Move copy into locale-specific messages or use locale-aware content.`);
}

if (errors.length) {
  console.error("❌ [i18n-check] Translation audit failed:");
  for (const error of errors) console.error(`  - ${error}`);
  if (hardcoded.length) {
    for (const finding of hardcoded.slice(0, 100)) console.error(`  - ${finding}`);
    if (hardcoded.length > 100) console.error(`  - … and ${hardcoded.length - 100} additional finding(s)`);
  }
  process.exit(1);
}

console.log(`✅ [i18n-check] ${locales.length} locales have matching keys; all ${publicPages.length} public pages are locale-aware; no hardcoded user-facing copy was found in audited sources.`);
