# FulCastle Holdings, Inc. — Corporate Website

The corporate website for FulCastle Holdings, Inc., the parent company behind a portfolio of independent ventures.

## Design direction

**Premium hybrid:** premium, authoritative, and technology-forward without looking like a generic holding-company template or an AI-startup landing page.

- Graphite: `#101722`
- Warm ivory: `#F6F3ED`
- Muted gold: `#C6AE7A`
- Slate supporting tones
- Custom geometric brand mark and refined wordmark
- Editorial display typography paired with a modern sans-serif
- Restrained motion, responsive layouts, accessibility, and clear corporate information

Corporate copy must remain factual. Do not invent company history, addresses, performance metrics, awards, subsidiaries, or other claims.

## Technology and cost policy

Preferred stack: Next.js, TypeScript, Tailwind CSS, and free/open-source components where useful. GitHub provides source control; Cloudflare manages DNS; deployment uses the existing Vercel Pro account.

Use free, commercially usable assets and dependencies. Do not introduce paid templates, premium components, stock subscriptions, new paid services, or recurring costs without explicit approval. Check the current license and service-plan terms before adoption.

Keep the initial site static-first. Add a backend, CMS, database, or other service only when a concrete requirement justifies it.

## Development workflow

- `master` is the initial baseline branch.
- `develop` is the active integration branch.
- Feature branches and all page PRs target `develop`.
- Each page is tracked by its own GitHub issue and delivered in its own PR.
- Shared foundation work is tracked separately and must be reviewable.
- Do not commit directly to `develop` for feature work.
- Do not merge a PR without explicit maintainer approval.
- See [AGENTS.md](./AGENTS.md) for the complete agent operating contract.

## Planned pages

1. Shared foundation and site shell
2. Home
3. About
4. Ventures
5. Contact
6. Privacy Policy
7. Terms of Use

Implementation order may change when repository evidence or dependencies justify it; track changes through issues.

## Local development

Once the application scaffold and package scripts are established, this section will document the verified install, development, lint, type-check, test, and build commands. Do not document commands as available until they exist and have been checked.
