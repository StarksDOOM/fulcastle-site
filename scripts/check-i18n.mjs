import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";
import { locales, messages } from "../lib/i18n.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = [
  ["Home", "app/page.tsx"], ["About", "app/about/page.tsx"],
  ["Ventures", "app/ventures/page.tsx"], ["Contact", "app/contact/page.tsx"],
  ["Privacy Policy", "app/privacy-policy/page.tsx"], ["Terms of Use", "app/terms-of-use/page.tsx"],
];
const sharedUi = ["app/components/site-header.tsx", "app/components/site-footer.tsx", "app/contact/contact-form.tsx"];
const invariantText = new Set(["FulCastle", "Holdings, Inc.", "FulCastle Holdings, Inc.", "Rodar", "Vantage", "Civora", "Sweet Nothings", "PropTech Real Estate", "Gamaliel Fulgencio", "Roman Castillo", "EN", "ES"]);
const userFacingAttributes = new Set(["alt", "aria-label", "placeholder", "title"]);

function flattenKeys(value, prefix = "") {
  if (typeof value !== "object" || value === null) return [prefix];
  return Object.entries(value).flatMap(([key, child]) => flattenKeys(child, prefix ? `${prefix}.${key}` : key));
}
function isDecorative(node) {
  for (let current = node.parent; current; current = current.parent) {
    if (!ts.isJsxElement(current) && !ts.isJsxSelfClosingElement(current)) continue;
    const attrs = current.openingElement?.attributes ?? current.attributes;
    const hidden = attrs.properties.find(a => ts.isJsxAttribute(a) && a.name.getText() === "aria-hidden");
    if (hidden?.initializer && ((ts.isStringLiteral(hidden.initializer) && hidden.initializer.text === "true") || (ts.isJsxExpression(hidden.initializer) && hidden.initializer.expression?.kind === ts.SyntaxKind.TrueKeyword))) return true;
  }
  return false;
}
export function findUnlocalizedJsxCopy(source, fileName = "page.tsx") {
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const findings = [];
  function visit(node) {
    if (ts.isJsxText(node) && node.text.trim() && !isDecorative(node)) {
      const text = node.text.replace(/\s+/g, " ").trim();
      if (!invariantText.has(text) && /[A-Za-zÀ-ÿ0-9]/.test(text)) {
        const p = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        findings.push(`line ${p.line + 1}: hardcoded visible JSX text "${text}" — use locale-aware copy or a translation key`);
      }
    }
    if (ts.isJsxAttribute(node) && userFacingAttributes.has(node.name.getText())) {
      const value = node.initializer;
      if (value && ts.isStringLiteral(value) && value.text.trim()) {
        const p = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        findings.push(`line ${p.line + 1}: hardcoded ${node.name.getText()}="${value.text}" — localize user-facing attributes`);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  return findings;
}
function runAudit() {
  const errors = [];
  if (JSON.stringify([...locales].sort()) !== JSON.stringify(["en", "es"])) errors.push("Supported locales must be exactly en and es.");
  const en = flattenKeys(messages.en).sort(), es = flattenKeys(messages.es).sort();
  for (const key of en.filter(k => !es.includes(k))) errors.push(`Missing Spanish translation key: ${key}`);
  for (const key of es.filter(k => !en.includes(k))) errors.push(`Missing English translation key: ${key}`);
  for (const [name, relative] of pages) {
    const file = path.join(root, relative);
    if (!fs.existsSync(file)) { errors.push(`${name}: missing route source ${relative}`); continue; }
    const source = fs.readFileSync(file, "utf8");
    if (!source.includes("generateMetadata")) errors.push(`${name}: locale-aware metadata generation missing`);
    if (!source.includes("alternates: { canonical:") || !source.includes("languages:")) errors.push(`${name}: canonical or hreflang metadata missing`);
    if (relative !== "app/contact/page.tsx" && !source.includes('locale === "es"')) errors.push(`${name}: Spanish content branch missing`);
    for (const finding of findUnlocalizedJsxCopy(source, relative)) errors.push(`${name} (${relative}): ${finding}`);
  }
  for (const relative of sharedUi) {
    const file = path.join(root, relative);
    if (!fs.existsSync(file)) { errors.push(`Shared localized UI missing: ${relative}`); continue; }
    for (const finding of findUnlocalizedJsxCopy(fs.readFileSync(file, "utf8"), relative)) errors.push(`${relative}: ${finding}`);
  }
  if (errors.length) {
    console.error("❌ [i18n-check] Translation audit failed:");
    for (const error of errors) console.error("  - " + error);
    process.exitCode = 1;
    return;
  }
  console.log(`✅ [i18n-check] Catalog parity, locale-aware metadata, and hardcoded visible JSX copy checks passed for all ${pages.length} public pages and shared localized UI.`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) runAudit();
