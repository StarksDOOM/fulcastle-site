import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { locales, messages } from "../lib/i18n.ts";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
function flattenKeys(value, prefix = "") { if (typeof value !== "object" || value === null) return [prefix]; return Object.entries(value).flatMap(([key, child]) => flattenKeys(child, prefix ? `${prefix}.${key}` : key)); }
if (JSON.stringify([...locales].sort()) !== JSON.stringify(["en", "es"])) errors.push("Supported locales must be exactly en and es.");
const en = flattenKeys(messages.en).sort(), es = flattenKeys(messages.es).sort();
for (const key of en.filter(k => !es.includes(k))) errors.push(`Missing Spanish translation key: ${key}`);
for (const key of es.filter(k => !en.includes(k))) errors.push(`Missing English translation key: ${key}`);
const pages = [["Home","app/page.tsx"],["About","app/about/page.tsx"],["Ventures","app/ventures/page.tsx"],["Contact","app/contact/page.tsx"],["Privacy Policy","app/privacy-policy/page.tsx"],["Terms of Use","app/terms-of-use/page.tsx"]];
for (const [name, relative] of pages) { const file = path.join(root, relative); if (!fs.existsSync(file)) { errors.push(`${name}: missing route source ${relative}`); continue; } const src = fs.readFileSync(file,"utf8"); if (!src.includes("generateMetadata")) errors.push(`${name}: locale-aware metadata generation missing`); if (!src.includes("alternates: { canonical:") || !src.includes("languages:")) errors.push(`${name}: canonical or hreflang metadata missing`); if (relative !== "app/contact/page.tsx" && !src.includes('locale === "es"')) errors.push(`${name}: Spanish content branch missing`); }
const spanishPages = ["app/components/spanish-public-pages.tsx"];
for (const relative of spanishPages) if (!fs.existsSync(path.join(root,relative))) errors.push(`Spanish page components missing: ${relative}`);
if (errors.length) { console.error("❌ [i18n-check] Translation audit failed:"); for (const e of errors) console.error("  - "+e); process.exit(1); }
console.log(`✅ [i18n-check] English/Spanish catalog parity, translated page components, and locale-aware metadata verified for all ${pages.length} public pages.`);
