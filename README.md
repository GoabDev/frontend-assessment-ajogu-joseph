# Product Explorer

A small `Content Explorer` built for the Checkit frontend assessment using `Next.js 16 App Router`, `TypeScript`, and `Tailwind CSS`.

The app uses the `DummyJSON` products API because it is stable, free, paginated, and exposes search plus category filtering without authentication. That kept the project focused on App Router architecture, URL state, and performance rather than API credential management.

## Live URL

Deployment is not configured yet in this local workspace. Before submission, add:

- `Repository URL:` `<your-public-github-url>`
- `Live URL:` `<your-vercel-or-cloudflare-url>`

## Setup

Run the project in under five commands:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run test
npm run build
```

## Architecture Decisions

- `app/` holds the route tree, route metadata, and route-level loading/error states.
- `components/` contains reusable UI primitives such as cards, filters, pagination, breadcrumbs, and the shared product image fallback.
- `lib/` contains API access and formatting utilities so components never call `fetch()` directly.
- `types/` contains shared data contracts reused across the app.
- The listing and detail routes stay server-first. Only the search/filter UI is client-side because it owns URL interaction.

## Feature Decisions

- `Pagination` was chosen instead of infinite scroll.
  Pagination is easier to reason about, easier to test, better for shareable URLs, and fits a small assessment better than scroll state management.
- `DummyJSON` product categories are used as the extra filter.
  This keeps the filter meaningful while using the API as intended.
- Search is `URL-driven` and debounced for `400ms`.
  That satisfies the shareable-state requirement while avoiding a push on every keystroke.

## Performance Optimizations Applied

- `next/image`
  All product images use a shared `ProductImage` wrapper with explicit width/height plus a graceful fallback SVG.
- `next/font`
  Fonts are loaded through `next/font/google` in the root layout to avoid manual font loading and reduce layout instability.
- `fetch` cache settings
  API requests use `revalidate: 900` in [`lib/api.ts`](./lib/api.ts) because product data is public and not user-specific, so caching improves repeat performance without making the data feel stale.
- `Server-rendered routes`
  Listing and detail pages fetch on the server, which improves first paint and avoids shipping unnecessary client data logic.

## Testing

Two meaningful component tests are included with `Vitest` and `React Testing Library`:

- [`components/search-filters.test.tsx`](./components/search-filters.test.tsx)
  Verifies debounced search URL updates and immediate category filter updates.
- [`components/pagination.test.tsx`](./components/pagination.test.tsx)
  Verifies pagination links preserve the active query/filter state.

## Trade-offs And Known Limitations

- The app uses native `fetch` instead of TanStack Query because the core routes are server-rendered and read-only. For this assessment, that keeps the data flow simpler and more aligned with App Router primitives.
- The listing route uses on-demand server rendering rather than static generation because the UI is driven by search params and category filters.
- The app is not yet deployed in this workspace, so Cloudflare-specific caching headers and final Lighthouse measurements are still outstanding.
- No optional bonus task is implemented yet.

## What I Would Do With More Time

- Deploy with OpenNext on Cloudflare Workers and document cache behavior end-to-end.
- Run Lighthouse and axe audits, then tighten any LCP, CLS, or accessibility gaps that show up in real measurements.
- Add one more test around image fallback or the detail page breadcrumb path.

## Bonus Tasks Attempted

None yet.

## Submission Notes

Before submission, make sure to:

- rename the repository to `frontend-assessment-[your-name]`
- add the final public GitHub URL and deployment URL above
- include a short 2-3 sentence note on what you would tackle next
