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
const invariantText = new Set(["FulCastle", "Holdings, Inc.", "FulCastle Holdings, Inc.", "Rodar", "Vantage", "Civora", "Sweet Nothings", "PropTech Real Estate", "Gamaliel Fulgencio", "Roman Castillo", "EN", "ES", "Error 404"]);
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
function unwrapExpression(node) {
  while (node && (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node))) node = node.expression;
  return node;
}
function isSpanishLocaleGuard(node) {
  node = unwrapExpression(node);
  if (!node || !ts.isBinaryExpression(node)) return false;
  const comparison = node.operatorToken.kind;
  if (comparison !== ts.SyntaxKind.EqualsEqualsEqualsToken && comparison !== ts.SyntaxKind.EqualsEqualsToken) return false;
  const left = node.left.getText();
  const right = node.right.getText();
  return (left === 'locale' && (right === '"es"' || right === "'es'")) ||
    (right === 'locale' && (left === '"es"' || left === "'es'"));
}
function isStringCopyExpression(node) {
  node = unwrapExpression(node);
  return Boolean(node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateExpression(node)));
}
function isLocalizedStringPair(whenTrue, whenFalse) {
  return isStringCopyExpression(whenTrue) && isStringCopyExpression(whenFalse);
}
function hasRenderedValue(node) {
  node = unwrapExpression(node);
  if (!node || node.kind === ts.SyntaxKind.NullKeyword || node.kind === ts.SyntaxKind.UndefinedKeyword || node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isIdentifier(node) || ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) return true;
  if (ts.isConditionalExpression(node)) return hasRenderedValue(node.whenTrue) || hasRenderedValue(node.whenFalse);
  return true;
}
export function findUnlocalizedJsxCopy(source, fileName = "page.tsx") {
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const findings = [];
  const seen = new Set();
  function report(node, kind, text) {
    const key = `${node.getStart(sf)}:${kind}`;
    if (seen.has(key)) return;
    seen.add(key);
    const p = sf.getLineAndCharacterOfPosition(node.getStart(sf));
    findings.push(`line ${p.line + 1}: hardcoded ${kind} "${text}" — use locale-aware copy or a translation key`);
  }
  function inspectRenderedExpression(node, context = "visible JSX expression") {
    node = unwrapExpression(node);
    if (!node) return;
    if (ts.isConditionalExpression(node)) {
      const localizedPair =
        isSpanishLocaleGuard(node.condition) &&
        hasRenderedValue(node.whenTrue) &&
        hasRenderedValue(node.whenFalse) &&
        (isLocalizedStringPair(node.whenTrue, node.whenFalse) ||
          (!isStringCopyExpression(node.whenTrue) && !isStringCopyExpression(node.whenFalse)));
      if (localizedPair) return;
      inspectRenderedExpression(node.whenTrue, context);
      inspectRenderedExpression(node.whenFalse, context);
      return;
    }
    if (ts.isBinaryExpression(node)) {
      if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken || node.operatorToken.kind === ts.SyntaxKind.BarBarToken || node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) {
        inspectRenderedExpression(node.right, context);
        if (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) inspectRenderedExpression(node.left, context);
      }
      return;
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const text = node.text.trim();
      if (text && !invariantText.has(text) && /[A-Za-zÀ-ÿ0-9]/.test(text)) report(node, context, text);
      return;
    }
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isIdentifier(node) || ts.isCallExpression(node) || ts.isPropertyAccessExpression(node) || ts.isNumericLiteral(node)) return;
    if (ts.isTemplateExpression(node)) {
      const text = node.head.text.trim();
      if (text && /[A-Za-zÀ-ÿ]/.test(text)) report(node, context, node.getText(sf));
      return;
    }
  }
  function visit(node) {
    if (ts.isJsxText(node) && node.text.trim() && !isDecorative(node)) {
      const text = node.text.replace(/\\s+/g, " ").trim();
      if (!invariantText.has(text) && /[A-Za-zÀ-ÿ0-9]/.test(text)) report(node, "visible JSX text", text);
    }
    if (ts.isJsxAttribute(node) && userFacingAttributes.has(node.name.getText())) {
      const value = node.initializer;
      if (value && ts.isStringLiteral(value) && value.text.trim()) {
        report(node, `${node.name.getText()} attribute`, `${node.name.getText()}="${value.text}"`);
      } else if (value && ts.isJsxExpression(value) && value.expression) {
        inspectRenderedExpression(value.expression, `${node.name.getText()} attribute copy`);
      }
    }
    if (ts.isJsxExpression(node) && node.expression && node.parent && (ts.isJsxElement(node.parent) || ts.isJsxFragment(node.parent))) {
      inspectRenderedExpression(node.expression);
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
    if (!source.includes('alternates: {') || !source.includes('languages:')) errors.push(`${name}: canonical or hreflang metadata missing`);
    if (relative !== "app/contact/page.tsx" && !source.includes('locale === "es"')) errors.push(`${name}: Spanish content branch missing`);
    for (const finding of findUnlocalizedJsxCopy(source, relative)) errors.push(`${name} (${relative}): ${finding}`);
  }
  for (const relative of sharedUi) {
    const file = path.join(root, relative);
    if (!fs.existsSync(file)) { errors.push(`Shared localized UI missing: ${relative}`); continue; }
    for (const finding of findUnlocalizedJsxCopy(fs.readFileSync(file, "utf8"), relative)) errors.push(`${relative}: ${finding}`);
  }
  const notFoundPath = path.join(root, "app/not-found.tsx");
  if (!fs.existsSync(notFoundPath)) errors.push("Not Found: missing route source app/not-found.tsx");
  else {
    const source = fs.readFileSync(notFoundPath, "utf8");
    if (!source.includes("generateMetadata")) errors.push("Not Found: locale-aware metadata generation missing");
    if (!source.includes('const title = isSpanish ?') || !/const description = isSpanish\s*\?/.test(source) || !/locale:\s*isSpanish\s*\?\s*"es_ES"\s*:\s*"en_US"/.test(source)) errors.push("Not Found: title, description, and Open Graph locale must follow the active locale.");
    for (const finding of findUnlocalizedJsxCopy(source, "app/not-found.tsx")) errors.push(`Not Found (app/not-found.tsx): ${finding}`);
  }
  if (errors.length) {
    console.error("❌ [i18n-check] Translation audit failed:");
    for (const error of errors) console.error("  - " + error);
    process.exitCode = 1;
    return;
  }
  console.log(`✅ [i18n-check] Catalog parity, locale-aware metadata, and hardcoded visible JSX copy checks passed for all ${pages.length} public pages, the not-found page, and shared localized UI.`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) runAudit();
