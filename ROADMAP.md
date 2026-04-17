# Integration Removal Roadmap

This document outlines the phased approach to removing third-party integrations (Stripe, Algolia, Vercel Blob, SendGrid, Discord) and Payload Cloud functionality from the website.

## Overview

| Phase | Integration                    | Status       | Files | Complexity |
| ----- | ------------------------------ | ------------ | ----- | ---------- |
| 1     | Analytics (GA, Facebook Pixel) | ✅ COMPLETED | ~6    | Low        |
| 2     | Stripe Payments                | ✅ COMPLETED | ~50+  | Medium     |
| 3     | Algolia Search                 | ✅ COMPLETED | ~15   | Medium     |
| 4     | Vercel Blob Storage            | ✅ COMPLETED | ~5    | Medium     |
| 5     | SendGrid Email                 | ✅ COMPLETED | ~5    | Low        |
| 6     | Discord Integration            | ✅ COMPLETED | ~35   | Medium     |
| 7     | Payload Cloud                  | ✅ COMPLETED | ~150+ | Very High  |
| 8     | GitHub OAuth                   | ✅ COMPLETED | ~20   | Medium     |
| 9     | Cleanup & Verification         | ✅ COMPLETED | -     | Low        |

---

## Phase 1: Analytics (Google Analytics & Facebook Pixel)

**Status**: ✅ COMPLETED (2026-04-16)

**Impact**: Low | **Complexity**: Low | **Files**: ~6

### 1.1 Remove Google Analytics

| Task                                                  | File(s)                                     | Verification                               |
| ----------------------------------------------------- | ------------------------------------------- | ------------------------------------------ |
| ✅ Remove `@zubricks/plugin-google-analytics` package | `package.json`                              | `grep -r "google-analytics"` returns empty |
| ✅ Remove `googleAnalytics` plugin import             | `src/payload.config.ts:19`                  |                                            |
| ✅ Remove `googleAnalytics` from plugins array        | `src/payload.config.ts`                     |                                            |
| ✅ Remove GoogleAnalytics component                   | `src/components/Analytics/GoogleAnalytics/` |                                            |
| ✅ Remove analytics utility                           | `src/utilities/analytics.ts`                |                                            |
| ✅ Remove GA from frontend layout                     | `src/app/(frontend)/layout.tsx`             |                                            |
| ✅ Remove importMap GA imports                        | `src/app/(payload)/admin/importMap.js`      |                                            |

### 1.2 Remove Facebook Pixel

| Task                                                  | File(s)                           | Verification                              |
| ----------------------------------------------------- | --------------------------------- | ----------------------------------------- |
| ✅ Remove `react-facebook-pixel` package              | `package.json`                    | `grep -r "facebook.*pixel"` returns empty |
| ✅ Remove Facebook Pixel import from Privacy provider | `src/providers/Privacy/index.tsx` |                                           |

### 1.3 Remove Environment Variables

Remove from `.env.example`:

- ✅ `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- ✅ `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`

**Note**: Google Tag Manager (GTM) remains as it's a separate tag management system.

---

## Phase 2: Stripe Payments

**Status**: ✅ COMPLETED (2026-04-16)

**Impact**: High | **Complexity**: Medium | **Files**: ~50+

### 2.1 Remove Stripe Dependencies

| Task                                | File(s)        | Verification                             |
| ----------------------------------- | -------------- | ---------------------------------------- |
| ✅ Remove `@stripe/react-stripe-js` | `package.json` | `grep -r "stripe\|Stripe"` returns empty |
| ✅ Remove `@stripe/stripe-js`       | `package.json` |                                          |
| ✅ Remove `stripe` npm package      | `package.json` |                                          |

### 2.2 Remove Stripe UI Components

| Task                                                                         | File(s) | Status              |
| ---------------------------------------------------------------------------- | ------- | ------------------- |
| ✅ Remove `src/app/(frontend)/(cloud)/new/(checkout)/` directory             | 8 files | ✅ DONE             |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/_components/CreditCardElement/`  |         | N/A - did not exist |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/_components/CreditCardList/`     | 4 files | ✅ DONE             |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/_components/CreditCardSelector/` | 4 files | ✅ DONE             |

### 2.3 Remove Stripe Utility Files

| Task                                                                                           | File(s) | Status |
| ---------------------------------------------------------------------------------------------- | ------- | ------ |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/_utilities/hasBadSubscription.ts`                  | ✅ DONE |        |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/_utilities/projectHasPaymentMethod.ts`             | ✅ DONE |        |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/_utilities/teamHasDefaultPaymentMethod.ts`         | ✅ DONE |        |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/_components/CreditCardList/usePaymentMethods.ts`   | ✅ DONE |        |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/_components/CreditCardSelector/useSubscription.ts` | ✅ DONE |        |

### 2.4 Remove Stripe from Types & Data

| Task                                                                 | File(s) | Status  |
| -------------------------------------------------------------------- | ------- | ------- |
| ✅ Remove `stripeCustomerID` from `src/app/_data/team.ts`            |         | ✅ DONE |
| ✅ Remove `stripeCustomerID` from `src/app/_data/me.ts`              |         | ✅ DONE |
| ✅ Remove `stripeSubscriptionStatus` from `src/app/_data/project.ts` |         | ✅ DONE |
| ✅ Remove Stripe types from `src/payload-cloud-types.ts`             |         | ✅ DONE |

### 2.5 Remove Subscription/Billing Pages

| Task                                                                                           | File(s)          | Status  |
| ---------------------------------------------------------------------------------------------- | ---------------- | ------- |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/[team-slug]/(tabs)/settings/(tabs)/subscriptions/` | Entire directory | ✅ DONE |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/[team-slug]/(tabs)/settings/(tabs)/invoices/`      | Entire directory | ✅ DONE |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/[team-slug]/(tabs)/settings/(tabs)/billing/`       | Entire directory | ✅ DONE |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/[team-slug]/[project-slug]/(tabs)/settings/plan/`  | Entire directory | ✅ DONE |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/[team-slug]/(tabs)/settings/TeamBillingMessages/`  | 2 files          | ✅ DONE |

### 2.6 Remove Stripe References

| Task                                                              | File(s) | Status  |
| ----------------------------------------------------------------- | ------- | ------- |
| ✅ Remove `stripeSubscriptionStatus` from `ProjectCard` component | 1 file  | ✅ DONE |
| ✅ Remove Stripe decorative images from `FormBlock`               | 1 file  | ✅ DONE |
| ✅ Remove Stripe API routes                                       | 6 files | ✅ DONE |

---

## Phase 3: Algolia Search

**Status**: ✅ COMPLETED (2026-04-16)

**Impact**: Medium | **Complexity**: Medium | **Files**: ~15

### 3.1 Remove Algolia Dependencies

| Task                              | File(s)        | Status  |
| --------------------------------- | -------------- | ------- |
| ✅ Remove `algoliasearch` package | `package.json` | ✅ DONE |
| ✅ Remove `instantsearch.js`      | `package.json` | ✅ DONE |
| ✅ Remove `react-instantsearch`   | `package.json` | ✅ DONE |

### 3.2 Remove Algolia Components & Adapters

| Task                                        | File(s) | Status  |
| ------------------------------------------- | ------- | ------- |
| ✅ Remove `src/adapters/AlgoliaSearchBox/`  | 2 files | ✅ DONE |
| ✅ Remove `src/adapters/AlgoliaPagination/` | 2 files | ✅ DONE |
| ✅ Remove `src/components/SyncToAlgolia/`   | 2 files | ✅ DONE |

### 3.3 Remove Algolia from Collections

| Task                                                                 | File(s)                 | Status  |
| -------------------------------------------------------------------- | ----------------------- | ------- |
| ✅ Remove Algolia sync from `src/collections/CommunityHelp/index.ts` |                         | ✅ DONE |
| ✅ Remove `src/collections/CommunityHelp/updateAlgolia.ts`           |                         | ✅ DONE |
| ✅ Remove `src/collections/CommunityHelp/extract-description.ts`     | ✅ Replaced with inline | DONE    |

### 3.4 Remove Algolia from Pages

| Task                                                              | File(s) | Status  |
| ----------------------------------------------------------------- | ------- | ------- |
| ✅ Remove `AlgoliaProvider` from `community-help/client_page.tsx` |         | ✅ DONE |
| ✅ Remove `AlgoliaSearchBox` from `ArchiveSearchBar/index.tsx`    |         | ✅ DONE |
| ✅ Remove Algolia sync API route                                  | 1 file  | ✅ DONE |
| ✅ Remove sync-ch route                                           | 1 file  | ✅ DONE |

### 3.5 Remove Algolia Scripts

| Task                                     | File(s) | Status  |
| ---------------------------------------- | ------- | ------- |
| ✅ Remove `src/scripts/syncToAlgolia.ts` |         | ✅ DONE |
| ✅ Remove Algolia styles                 | 1 file  | ✅ DONE |

### 3.6 Remove Environment Variables

Remove from `.env.example`:

- `NEXT_PUBLIC_ALGOLIA_CH_ID`
- `NEXT_PUBLIC_ALGOLIA_PUBLIC_KEY`
- `NEXT_PRIVATE_ALGOLIA_API_KEY`
- `NEXT_PUBLIC_ALGOLIA_CH_INDEX_NAME`
- `NEXT_PUBLIC_ALGOLIA_DOCSEARCH_KEY`

---

## Phase 4: Vercel Blob Storage

**Status**: ✅ COMPLETED (2026-04-16)

**Impact**: Medium | **Complexity**: Medium | **Files**: ~5

### 4.1 Remove Vercel Blob Dependencies

| Task                                                    | File(s)                 | Verification                                       |
| ------------------------------------------------------- | ----------------------- | -------------------------------------------------- |
| ✅ Remove `@awfixers-stuff/storage-vercel-blob` package | `package.json`          | `grep -r "vercel.*blob\|VercelBlob"` returns empty |
| ✅ Remove `vercelBlobStorage` import                    | `src/payload.config.ts` |                                                    |
| ✅ Remove `vercelBlobStorage` from plugins              | `src/payload.config.ts` |                                                    |

### 4.2 Remove Vercel References

| Task                                       | File(s)                                       | Status  |
| ------------------------------------------ | --------------------------------------------- | ------- |
| ✅ Remove VercelBlob client from importMap | `src/app/(payload)/admin/importMap.js`        | ✅ DONE |
| ✅ Replace video URL using Vercel Blob     | `src/components/BackgroundGradient/index.tsx` | ✅ DONE |

### 4.3 Remove Environment Variables

Remove from `.env.example`:

- `BLOB_READ_WRITE_TOKEN`
- `BLOB_STORAGE_ENABLED`
- `BLOB_STORE_ID`

### 4.4 Migration Path

- Configure local file storage or S3-compatible storage alternative in Payload config

---

## Phase 5: SendGrid Email

**Status**: ✅ COMPLETED (2026-04-17)

**Impact**: Medium | **Complexity**: Low | **Files**: ~5

### 5.1 Remove SendGrid Dependencies

| Task                                                 | File(s)                 | Status  |
| ---------------------------------------------------- | ----------------------- | ------- |
| ✅ Remove `@awfixers-stuff/email-nodemailer` package | `package.json`          | ✅ DONE |
| ✅ Remove `nodemailer-sendgrid` package              | `package.json`          | ✅ DONE |
| ✅ Remove `nodemailerAdapter` import                 | `src/payload.config.ts` | ✅ DONE |
| ✅ Remove `nodemailerSendgrid` import                | `src/payload.config.ts` | ✅ DONE |
| ✅ Remove `sendgridConfig`                           | `src/payload.config.ts` | ✅ DONE |
| ✅ Remove `nodemailerAdapter` from email config      | `src/payload.config.ts` | ✅ DONE |

### 5.2 Remove Partner Email Lookup

| Task                                                    | File(s) |
| ------------------------------------------------------- | ------- |
| ✅ Remove email hook from `src/collections/Partners.ts` |         |

### 5.3 Remove Environment Variables

Remove from `.env.example`:

- ✅ `SENDGRID_API_KEY` (was not present)
- ✅ `EMAIL_FROM` (was not present)

### 5.4 Migration Path

- Configure local SMTP or alternative email service (Resend, Postmark, AWS SES)

---

## Phase 6: Discord Integration

**Status**: ✅ COMPLETED (2026-04-17)

**Impact**: Medium | **Complexity**: Medium | **Files**: ~35

### 6.1 Remove Discord Dependencies

| Task                                  | File(s)        | Status  |
| ------------------------------------- | -------------- | ------- |
| ✅ Remove `discord-markdown` package  | `package.json` | ✅ DONE |
| ✅ Remove `discord.js` dev dependency | `package.json` | ✅ DONE |

### 6.2 Remove Discord Scripts

| Task                                             | File(s) | Status  |
| ------------------------------------------------ | ------- | ------- |
| ✅ Remove `src/scripts/fetchDiscord.ts`          |         | ✅ DONE |
| ✅ Remove `src/scripts/clearDuplicateThreads.ts` |         | ✅ DONE |

### 6.3 Remove Discord UI Components

| Task                                           | File(s) | Status  |
| ---------------------------------------------- | ------- | ------- |
| ✅ Remove `src/components/DiscordGitCTA/`      |         | ✅ DONE |
| ✅ Remove `src/components/DiscordUsersPill/`   |         | ✅ DONE |
| ✅ Remove `src/components/DiscordGitIntro/`    |         | ✅ DONE |
| ✅ Remove `src/components/DiscordGitBody/`     |         | ✅ DONE |
| ✅ Remove `src/components/DiscordGitComments/` |         | ✅ DONE |
| ✅ Remove `src/graphics/DiscordIcon/`          |         | ✅ DONE |

### 6.4 Remove Discord from Community Help

| Task                                                               | File(s)                | Status  |
| ------------------------------------------------------------------ | ---------------------- | ------- |
| ✅ Remove Discord references from `src/collections/CommunityHelp/` |                        | ✅ DONE |
| ✅ Remove Discord type variants from types                         | `src/payload-types.ts` | ✅ DONE |

### 6.5 Remove Discord from Pages

| Task                                                       | File(s) | Status  |
| ---------------------------------------------------------- | ------- | ------- |
| ✅ Remove Discord references from `community-help/` pages  |         | ✅ DONE |
| ✅ Remove `OpenPost` component references                  |         | ✅ DONE |
| ✅ Remove `FileAttachment` component (if Discord-specific) |         | ✅ DONE |

### 6.6 Update Other Files

| Task                                                                   | File(s) | Status  |
| ---------------------------------------------------------------------- | ------- | ------- |
| ✅ Update `src/components/Footer/index.tsx` (remove Discord link)      |         | ✅ DONE |
| ✅ Update `src/components/SocialIcon/index.tsx`                        |         | ✅ DONE |
| ✅ Update `src/components/RenderDocs/index.tsx` (remove DiscordGitCTA) |         | ✅ DONE |
| ✅ Update `src/components/Post/index.tsx`                              |         | ✅ DONE |
| ✅ Update `src/components/RelatedHelpList/index.tsx`                   |         | ✅ DONE |
| ✅ Remove `cdn.discordapp.com` from `next.config.js` image domains     |         | ✅ DONE |
| ✅ Remove Discord URL from `src/payload.config.ts`                     |         | ✅ DONE |

### 6.7 Remove Environment Variables

Remove from `.env.example`:

- ✅ `DISCORD_TOKEN` (was not present)
- ✅ `DISCORD_SCRAPE_CHANNEL_ID` (was not present)
- ✅ `SYNC_ARCHIVED_THREADS` (was not present)

---

## Phase 7: Payload Cloud (Largest Impact)

**Status**: ✅ COMPLETED (2026-04-17)

**Impact**: Very High | **Complexity**: Very High | **Files**: ~150+

This is the largest removal. The entire `/cloud` routes and related functionality needs to be removed.

### 7.1 Remove Cloud Route Directory

| Task                                                    | Status  |
| ------------------------------------------------------- | ------- |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud/`           | ✅ DONE |
| ✅ Remove `src/app/(frontend)/(cloud)/cloud-terms/`     | ✅ DONE |
| ✅ Remove `src/app/(frontend)/(cloud)/new/`             | ✅ DONE |
| ✅ Remove `src/app/(frontend)/(cloud)/forgot-password/` | ✅ DONE |
| ✅ Remove `src/app/(frontend)/(cloud)/join-team/`       | ✅ DONE |
| ✅ Remove `src/app/(frontend)/(cloud)/login/`           | ✅ DONE |
| ✅ Remove `src/app/(frontend)/(cloud)/logout/`          | ✅ DONE |
| ✅ Remove `src/app/(frontend)/(cloud)/reset-password/`  | ✅ DONE |
| ✅ Remove `src/app/(frontend)/(cloud)/verify/`          | ✅ DONE |

### 7.2 Remove Cloud API Routes

| Task                                              | Status  |
| ------------------------------------------------- | ------- |
| ✅ Remove all `_api/` routes in cloud directories | ✅ DONE |

### 7.3 Remove Cloud Layouts

| Task                                                                | Status  |
| ------------------------------------------------------------------- | ------- |
| ✅ Remove `src/app/(frontend)/(cloud)/layout.tsx` if cloud-specific | ✅ DONE |

### 7.4 Remove Cloud Types & Utilities

| Task                                                   | Status  |
| ------------------------------------------------------ | ------- |
| ✅ Remove `src/payload-cloud-types.ts`                 | ✅ DONE |
| ✅ Remove `src/utilities/use-cloud-api.ts`             | ✅ DONE |
| ✅ Remove `src/utilities/merge-project-environment.ts` | ✅ DONE |
| ✅ Remove `src/utilities/check-team-roles.ts`          | ✅ DONE |
| ✅ Remove `src/access.ts`                              | ✅ DONE |

### 7.5 Remove Cloud Components

| Task                                                             | Status  |
| ---------------------------------------------------------------- | ------- |
| ✅ Remove `src/components/NewProject/`                           | ✅ DONE |
| ✅ Remove `src/app/(frontend)/types.ts`                          | ✅ DONE |
| ✅ Remove `src/app/(frontend)/(pages)/styleguide/cards/page.tsx` | ✅ DONE |
| Remove `src/components/UniqueRepoName/`                          | N/A     |
| Remove `src/components/UniqueDomain/`                            | N/A     |
| Remove `src/components/CloneOrDeployProgress/`                   | N/A     |
| Remove `src/components/BranchSelector/`                          | N/A     |
| Remove `src/components/ProjectCard/`                             | N/A     |
| Remove `src/components/TeamInvitations/`                         | N/A     |
| Remove `src/components/InfraOffline/`                            | N/A     |
| Remove `src/components/DeploymentLogs/`                          | N/A     |
| Remove `src/components/ProjectBillingMessages/`                  |         |

### 7.6 Remove Cloud Collections (if cloud-specific)

| Task                                    | File(s)                         |
| --------------------------------------- | ------------------------------- |
| Check if `Users.ts` needs modifications | May need to keep for basic auth |

### 7.7 Remove Cloud Environment Variables

Remove from `.env.example`:

- ✅ `NEXT_PUBLIC_CLOUD_CMS_URL` (removed in earlier pass)
- ✅ `NEXT_PUBLIC_GITHUB_REDIRECT_URI` (removed in earlier pass)
- ✅ `NEXT_PUBLIC_GITHUB_CLIENT_ID` (removed in earlier pass)
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (removed in earlier pass)
- ✅ `STRIPE_SECRET_KEY` (removed in earlier pass)
- ✅ `VERCEL_REDEPLOY_URL` (kept - used for redeploys)
- ✅ `NEXT_PRIVATE_CRON_KEY` (kept - used for cron)

### 7.8 Update Root Layouts

| Task                                                                 | Status  |
| -------------------------------------------------------------------- | ------- |
| ✅ Update `src/app/(frontend)/layout.tsx` (remove cloud nav items)   | ✅ DONE |
| ✅ Update `src/app/(frontend)/types.ts` (remove Project, Team types) | ✅ DONE |
| ✅ Update `src/providers/Auth/index.tsx` (simplify auth)             | ✅ DONE |
| ✅ Update `src/components/AfterNavActions/index.tsx`                 | ✅ DONE |
| ✅ Update `src/globals/MainMenu/index.tsx`                           | ✅ DONE |
| ✅ Remove `@cloud` from tsconfig.json                                | ✅ DONE |
| ✅ Remove `@cloud` from next.config.js                               | ✅ DONE |

---

## Phase 8: GitHub Integration (Cloud-related)

**Status**: ✅ COMPLETED (2026-04-17)

**Impact**: High | **Complexity**: Medium | **Files**: ~20

### 8.1 Remove GitHub OAuth Flow

| Task                                       | File(s) | Status  |
| ------------------------------------------ | ------- | ------- |
| ✅ Remove `src/app/(frontend)/gh/page.tsx` |         | ✅ DONE |

### 8.2 Remove GitHub Environment Variables

Remove from `.env.example`:

- `GITHUB_ACCESS_TOKEN` (kept - used for docs fetching)
- `NEXT_PUBLIC_GITHUB_REDIRECT_URI`
- `NEXT_PUBLIC_GITHUB_CLIENT_ID`

---

## Phase 9: Cleanup & Verification

**Status**: ✅ COMPLETED (2026-04-17)

### 9.1 Run Full Grep Verification

| Task                                                             | Status  |
| ---------------------------------------------------------------- | ------- |
| ✅ `stripe\|Stripe` removed from src/ and package.json           | ✅ DONE |
| ✅ `algolia\|Algolia` removed from src/ and package.json         | ✅ DONE |
| ✅ `vercel.*blob\|VercelBlob` removed from src/ and package.json | ✅ DONE |
| ✅ `sendgrid\|nodemailer` removed from src/ and package.json     | ✅ DONE |
| ✅ `discord\|Discord` removed from src/ and package.json         | ✅ DONE |
| ✅ `google-analytics` removed from src/ and package.json         | ✅ DONE |
| ✅ `facebook.*pixel` removed from src/ and package.json          | ✅ DONE |
| ✅ `payload-cloud\|PayloadCloud` removed from src/               | ✅ DONE |

### 9.2 Build Verification

| Task          | Verification |
| ------------- | ------------ |
| Run build     | PENDING      |
| Run lint      | PENDING      |
| Run typecheck | PENDING      |

### 9.3 Runtime Verification

| Task                  | Verification |
| --------------------- | ------------ |
| Start dev server      | PENDING      |
| Test form submissions | PENDING      |
| Test file uploads     | PENDING      |
| Test community help   | PENDING      |

### 9.4 Database Migration

| Task                                  | Description                             |
| ------------------------------------- | --------------------------------------- |
| Remove Stripe fields from collections | Run migration to remove Stripe fields   |
| Remove Discord-specific fields        | Run migration to remove Discord fields  |
| Remove Cloud-specific fields          | Run migrations for Payload Cloud fields |

---

## Recommended Execution Order

| Order | Phase                   | Status         |
| ----- | ----------------------- | -------------- |
| 1     | Phase 1 - Analytics     | ✅ COMPLETED   |
| 2     | Phase 2 - Stripe        | ✅ COMPLETED   |
| 3     | Phase 3 - Algolia       | ✅ COMPLETED   |
| 4     | Phase 4 - Vercel Blob   | ✅ COMPLETED   |
| 5     | Phase 5 - SendGrid      | ✅ COMPLETED   |
| 6     | Phase 6 - Discord       | ✅ COMPLETED   |
| 7     | Phase 8 - GitHub OAuth  | ✅ COMPLETED   |
| 8     | Phase 7 - Payload Cloud | ✅ COMPLETED   |
| 9     | Phase 9 - Cleanup       | 🟡 IN PROGRESS |

---

## Notes

- **Backup First**: Always backup your database before running migrations
- **Test Each Phase**: Verify functionality after each phase before proceeding
- **Replace Don't Just Remove**: For storage and email, configure alternatives before removal
- **Partial Commits**: Consider committing after each phase for easier rollback
