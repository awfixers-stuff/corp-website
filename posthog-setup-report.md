<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the corp website. PostHog is initialized via `instrumentation-client.ts` (Next.js 15.3+ pattern) with a reverse proxy through `/ingest` to reduce ad-blocker interference. Users are identified via Clerk's auth provider, linking PostHog sessions to known user IDs. Ten events were planned; eight were instrumented across six files.

| Event Name | Description | File |
|---|---|---|
| `form_submitted` | User successfully submitted a CMS-managed contact/inquiry form | `src/components/CMSForm/index.tsx` |
| `newsletter_subscribed` | User submitted the newsletter signup form | `src/components/NewsletterSignUp/index.tsx` |
| `cli_command_copied` | User copied the `npx create-payload-app` CLI command to clipboard | `src/components/CopyToClipboard/index.tsx` |
| `partner_filter_applied` | User applied a filter in the partner directory (with `filter_group`, `filter_value`, `filter_checked` properties) | `src/components/PartnerDirectory/index.tsx` |
| `partner_filter_reset` | User cleared all filters in the partner directory | `src/components/PartnerDirectory/index.tsx` |
| `mobile_menu_opened` | User opened the mobile navigation menu | `src/components/Header/MobileNav/index.tsx` |
| `mobile_menu_closed` | User closed the mobile navigation menu | `src/components/Header/MobileNav/index.tsx` |
| `github_link_clicked` | User clicked the GitHub link in the desktop nav header | `src/components/Header/DesktopNav/index.tsx` |

**User identification:** `posthog.identify()` is called in `src/providers/Auth/index.tsx` when a Clerk user loads, passing their userId, email, firstName, and lastName.

**Other files modified:**
- `instrumentation-client.ts` — created: PostHog client-side init with proxy, exception capture, and debug mode
- `next.config.js` — added `/ingest` reverse proxy rewrites and `skipTrailingSlashRedirect: true`
- `.env.local` — `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` set

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://us.posthog.com/project/295558/dashboard/1482067
- **CLI command copies over time:** https://us.posthog.com/project/295558/insights/4Tl7j6kQ
- **Newsletter subscriptions over time:** https://us.posthog.com/project/295558/insights/ilCdl3Dd
- **Conversion funnel: CLI copy → Newsletter → Form:** https://us.posthog.com/project/295558/insights/gJopiHyG
- **GitHub link clicks over time:** https://us.posthog.com/project/295558/insights/TNhOlPRq
- **Partner directory filter engagement:** https://us.posthog.com/project/295558/insights/TkYIM8dL

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
