# MongoDB to Convex Migration Plan

## Overview

Migrate the Payload CMS database from MongoDB (via `@payloadcms/db-mongodb`) to Convex (via `payload-convex-adapter`).

**Duration Estimate:** 2-4 hours
**Risk Level:** Medium (requires data migration + config changes)

---

## Phase 1: Preparation

### 1.1 Install Dependencies

```bash
# Install Convex and the adapter
bun add convex payload-convex-adapter

# Remove MongoDB adapter
bun remove @payloadcms/db-mongodb
```

### 1.2 Set Up Convex

```bash
# Initialize Convex in the project (creates convex/ directory)
npx convex init

# Or if already initialized, run dev
npx convex dev
```

### 1.3 Environment Variables

Update `.env.example` and create `.env.local`:

```env
# Replace DATABASE_URI with Convex URL
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Keep these
PAYLOAD_SECRET=YOUR_PAYLOAD_SECRET
NEXT_PUBLIC_SITE_URL=http://local.corp.awfixer.me:3000
```

---

## Phase 2: Configuration Changes

### 2.1 Update Payload Config

**File:** `src/payload.config.ts`

```ts
// Remove
import { mongooseAdapter } from '@payloadcms/db-mongodb'

// Add
import { convexAdapter } from 'payload-convex-adapter'
import type { PayloadConvexConfig } from 'payload-convex-adapter'

// Replace db config
const convexConfig: PayloadConvexConfig = {
  convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL!,
}

export default buildConfig({
  // ... rest of config
  db: convexAdapter(convexConfig),
})
```

### 2.2 Remove MongoDB Import

Ensure no remaining references to `@payloadcms/db-mongodb` in:
- `src/payload.config.ts`
- `src/migrations/*.ts` (may need migration changes)

### 2.3 Handle Media/Uploads

Convex has built-in storage. Two options:

**Option A (Recommended):** Use Convex's built-in file storage
- The adapter automatically handles uploads to Convex storage

**Option B:** Keep local uploads via `@payloadcms/plugin-cloud-storage`
- Continue using local/file storage for media
- Update Media collection to use cloud storage adapter

---

## Phase 3: Data Migration

### 3.1 Export MongoDB Data

Create a script to export all collections:

```ts
// scripts/exportMongoDB.ts
// Connect to MongoDB and export all collection data to JSON
```

Run:
```bash
payload run scripts/exportMongoDB.ts
```

### 3.2 Import to Convex

Create scripts to import each collection into Convex:

```ts
// scripts/importConvex.ts
// Connect to Convex and import exported JSON data
```

### 3.3 Media Files

Export media files from local storage/cloud and upload to Convex storage.

---

## Phase 4: Verification

### 4.1 Test Locally

```bash
# Start Convex dev server
npx convex dev

# Run Payload/Next.js
bun dev
```

### 4.2 Verify

- [ ] Admin panel loads and is functional
- [ ] All collections accessible
- [ ] CRUD operations work
- [ ] Media uploads work
- [ ] Search/filter operations work
- [ ] Forms submit correctly
- [ ] API endpoints work

---

## Phase 5: Production Deployment

### 5.1 Convex Deployment

```bash
# Deploy to Convex cloud
npx convex deploy
```

### 5.2 Environment Updates

Update production environment variables:
- Set `NEXT_PUBLIC_CONVEX_URL` to production Convex URL

### 5.3 Deploy

Deploy the Next.js app (Vercel or other):

```bash
# Build and deploy
bun build
```

---

## Rollback Plan

If issues occur:

1. **Keep MongoDB accessible** until full verification
2. Revert `payload.config.ts` to use `mongooseAdapter`
3. Point `DATABASE_URI` back to MongoDB
4. Data in Convex remains but becomes stale

---

## Files to Modify

| File | Change |
|------|--------|
| `src/payload.config.ts` | Replace adapter |
| `.env.example` | Update env vars |
| `.env.local` | Add Convex URL |
| `package.json` | Dependency changes |
| `src/migrations/*.ts` | May need updates (check imports) |

---

## Dependencies Changed

| Remove | Add |
|--------|-----|
| @payloadcms/db-mongodb | convex |
| | payload-convex-adapter |

---

## Notes

- **payload-convex-adapter** (v1.0.3) is a community package by Odele Technologies
- Convex provides built-in authentication, real-time subscriptions, and file storage
- The adapter is compatible with Payload 3.73.0+
- Your project uses Payload 3.72.0 — may need to upgrade