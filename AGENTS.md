# FulCastle Site — Agent Operating Manual

> **Authority:** This file is the repository-wide operating contract for AI agents and contributors. Follow the user's explicit instructions and the repository's current verified state; do not substitute assumptions for evidence.

## 1. Project and instruction hierarchy

1. This root `AGENTS.md` defines durable engineering, scope, security, verification, and collaboration rules.
2. The root `README.md` defines the project purpose, stack, and developer workflow.
3. Page-specific GitHub issues define scope and acceptance criteria for individual implementations.
4. If nested instructions are introduced later, they may add local detail but must not contradict this contract.
5. Keep the site static-first and lean. Do not add a backend, CMS, database, or third-party service without a concrete requirement and explicit approval when it creates material cost, security, or architecture impact.

## 2. Branch and issue/PR discipline

1. `master` is the initial baseline branch. `develop` is the active integration branch.
2. Feature branches and page PRs target `develop`. Do not implement feature work directly on `master` or `develop`.
3. Track work in GitHub issues before implementation. Each page is its own issue and its own PR. Track shared foundation work separately.
4. PR descriptions must state the user story, purpose, scope, non-goals, verification performed, and related issue references. Use closing keywords when the PR fully resolves the issue.
5. Keep commits logically atomic: group inseparable implementation, styles, tests, and documentation together. Do not create one commit per file or collapse unrelated changes into a single commit.
6. Never merge a PR, push directly to protected/integration branches, or stage/commit local changes without the user's explicit authorization for that action.
7. Before declaring a PR review-ready or merging it, inspect the complete diff and the full commit history relative to the target branch. Verify that commits are logically atomic and that related implementation, styles, tests, and documentation are grouped into cohesive commits; unrelated changes must remain separate. Identify commits that are fragmented, overly broad, duplicated, or otherwise poorly grouped, and reorganize the branch history where appropriate before merge. Do not merge until commit atomicity and grouping have been reviewed; report any remaining concerns and missing issue traceability.

## 3. Investigation, authorization, and scope control

1. Inspect repository files, current branch state, package scripts, and relevant instructions before editing. Never assume the repository is empty or that a framework, command, route, or dependency exists.
2. For architectural, security, deployment, DNS, authentication, data-processing, or other cross-cutting changes, investigate first and present findings before implementation authorization.
3. Keep each issue/PR's scope fixed. Discovery may identify unrelated defects but does not authorize fixing them. Report out-of-scope findings separately.
4. Preserve established behavior unless a change is explicitly required. Do not bundle unrelated refactors or cosmetic cleanup.
5. Stop and report when repository evidence contradicts the plan, a requirement is ambiguous in a consequential way, or required credentials/access are unavailable.
6. Do not create speculative abstractions or extra files. Add files only when they are needed for the authorized implementation or project maintenance.

## 4. Design and content contract

1. The visual direction is **premium hybrid**: premium, authoritative, and technology-forward.
2. Core palette: graphite `#101722`, warm ivory `#F6F3ED`, muted gold `#C6AE7A`, and restrained slate tones. Define shared design tokens rather than scattering values.
3. Use a distinctive geometric brand mark, refined wordmark, editorial display typography, and clean sans-serif body typography. Avoid generic AI/crypto visuals, stock castle/globe marks, gratuitous gradients, and excessive motion.
4. Maintain consistency across navigation, footer, typography, spacing, buttons, cards, forms, and responsive states.
5. All corporate claims must be grounded in verified information. Never invent addresses, phone numbers, company history, metrics, awards, subsidiaries, legal jurisdiction, or service capabilities.
6. Present FulCastle Holdings, Inc. accurately as the parent/holding company. Do not imply every venture is an operating service of the parent.
7. Use assets and dependencies with licenses suitable for commercial use. Do not introduce paid templates, premium assets, subscriptions, or additional paid services without explicit approval.

## 5. Frontend quality, accessibility, and SEO

1. Use semantic HTML and the repository's established framework and patterns. Prefer server rendering/static generation when suitable; add client-side JavaScript only when interaction requires it.
2. Make every page responsive across mobile, tablet, and desktop. Verify narrow layouts, overflow, navigation, and interactive states.
3. Accessibility is a requirement: keyboard navigation, visible focus, meaningful accessible names, semantic heading order, sufficient contrast, form labels/errors, and reduced-motion support.
4. Respect React Rules of Hooks if React is used. Use strict TypeScript and concrete types; do not use `any` or unsafe casts to bypass type errors.
5. Provide unique, accurate page titles and descriptions, appropriate canonical/social metadata, crawlable links, and sitemap/robots configuration when appropriate to the actual routes.
6. Optimize images, fonts, layout stability, rendering, and client JavaScript. Avoid adding dependencies when platform APIs or existing utilities suffice.
7. Do not commit secrets, credentials, private keys, or environment-specific values. Validate and safely handle user-controlled input. Avoid unnecessary collection of personal data.
8. Do not claim a build, test, accessibility audit, security scan, deployment, or runtime behavior passed unless it was actually run and verified.

## 6. Verification workflow

1. Inspect available scripts and project configuration before choosing commands.
2. For a page PR, run the narrowest relevant checks first, then applicable lint/type-check/test/build checks that are available and proportionate.
3. Review browser behavior when a browser/runtime is available: page rendering, responsive states, navigation, console errors, and failed network requests.
4. If a check cannot run, state the exact blocker and classify the result as unverified or blocked; do not treat it as a pass.
5. Review the final diff against the issue's scope and acceptance criteria. Verify no secrets, accidental lockfile churn, unrelated edits, or unlicensed assets were introduced.
6. Keep local checks targeted; use CI for the authoritative repository-wide checks. Do not weaken tests or quality gates merely to obtain a green result.
7. When changes alter developer setup, architecture, deployment, or documented workflows, update the README in the same task.

## 7. Evidence and reporting

Classify important conclusions as:
- **VERIFIED:** proven by a successful test, build, runtime observation, or authoritative platform result.
- **OBSERVED:** directly seen in source, configuration, or repository state but not behaviorally tested.
- **INFERRED:** a reasoned conclusion that still needs confirmation.
- **UNVERIFIED:** not yet confirmed.
- **BLOCKED:** required access, credentials, or an external prerequisite is missing.

Implementation reports must include:
- Planned and actual changes.
- Relevant issue, branch, PR, and commit references.
- Checks run and their actual results.
- Investigated but intentionally unchanged items.
- Remaining blockers and follow-up issues.

## 8. Deployment and third-party services

1. Use the existing Vercel Pro account and Cloudflare DNS configuration where appropriate; do not assume a project is linked, a domain is verified, or a deployment is healthy without checking.
2. Confirm plan eligibility, current terms, and limits before relying on a service feature. No additional paid products or recurring costs without approval.
3. Never expose secrets in code, issue bodies, PRs, logs, or client-side environment variables. Use the platform's environment-variable facilities for secrets.
4. Domain/DNS, Meta verification, production deployment, and other account-level changes require investigation and careful verification; do not make destructive DNS or deployment changes speculatively.
5. A website or DNS record can support business verification but cannot guarantee a third party's approval.

## 9. Stop conditions

Stop and report rather than proceeding when:
- The requested scope is materially ambiguous.
- Repository or runtime evidence contradicts the plan.
- An implementation would require unapproved paid services or material architecture expansion.
- A required acceptance check fails and the cause has not been diagnosed.
- A PR is ready for review/merge; wait for the user's explicit merge approval.
