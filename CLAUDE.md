# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- convex-ai-start -->
This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.
<!-- convex-ai-end -->

## Commands

```bash
# Development
bun run dev          # Start Next.js dev server
bun run build        # Deploy Convex + build Next.js (runs postbuild sitemap gen)
bun run build:skipDocs  # Build without Convex deploy
bun run start        # Start production server
bun run lint         # Run ESLint
bun run prettier:fix # Format all files
bun run analyze      # Bundle analysis (ANALYZE=true)
bun run caddy        # Run Caddy reverse proxy (local HTTPS)

# Convex
bunx convex dev      # Run Convex dev server alongside Next.js
bunx convex deploy   # Deploy Convex functions
```

Use **Bun** (v1.3.11) as the package manager and runtime — never npm or yarn.

## Architecture

This is a **Next.js 15 App Router** corporate website with:

- **Payload CMS** (`src/payload.config.ts`) — headless CMS using `payload-convex-adapter` instead of a traditional database. Payload schema/types are in `src/payload-types.ts`.
- **Convex** (`convex/`) — backend database and functions. The `payload-convex-config.ts` wires them together with prefix `corp_website`. Schema lives in `convex/schema.ts`.
- **Clerk** — auth provider. Middleware (`src/middleware.ts`) uses `clerkMiddleware` with route-based access control defined in `src/access/routes.ts`.

### Route structure

- `src/app/(frontend)/` — public-facing site
  - `(pages)/` — slug-based pages: docs, posts, case-studies, partners, community-help, etc.
  - `[...slug]/` — catch-all for CMS-managed pages
- `src/app/(payload)/` — Payload CMS admin UI (`/admin`) and API routes
- `src/app/api/` — Next.js API routes
- `src/app/sign-in|sign-up/` — Clerk auth pages

### Key aliases (webpack + turbopack)

| Alias | Path |
|---|---|
| `@scss` | `src/css/` |
| `@components` | `src/components.js` |
| `@blocks` | `src/blocks/` |
| `@forms` | `src/forms/` |
| `@providers` | `src/providers/` |
| `@icons` | `src/icons/` |
| `@utilities` | `src/utilities/` |
| `@types` | `payload-types.ts` |
| `@graphics` | `src/graphics/` |

### Content model

Payload collections: Pages, Posts, Docs, CaseStudies, Partners, CommunityHelp, Media, ReusableContent, Users, Categories, and partner filter collections (Budgets, Industries, Regions, Specialties).

Globals: MainMenu, Footer, TopBar, GetStarted, PartnerProgram.

Rich text uses Lexical editor (`@payloadcms/richtext-lexical`) with custom features (Label, LargeBody) and many block types.

### Observability & deployment

- **Sentry** (`sentry.server.config.ts`, `sentry.edge.config.ts`) — error tracking; org `awfixerholdings`, project `corpsite`
- **PostHog** — analytics, proxied through `/ingest/` rewrites
- **Vercel Blob** — media storage (`@payloadcms/storage-vercel-blob`)
- **Vercel** — deployment target; config in `vercel.json`; Caddyfile for local HTTPS
- `NEXT_PUBLIC_IS_LIVE` env var controls robots indexing and localhost image domains

### Access control

Route access is defined in `src/access/routes.ts` using pattern types: `public`, `authenticated`, `org`, `orgPrefix`, `orgs`. Add new protected routes there; the middleware enforces them automatically. `/admin` requires membership in `ADMIN_ORG_ID` org.
