# Product Explorer

A small `Content Explorer` built for the Checkit frontend assessment using `Next.js 16 App Router`, `TypeScript`, and `Tailwind CSS`.

The application uses the `DummyJSON` products API because it is stable, free, paginated, and supports both search and category filtering without authentication. That made it a good fit for focusing on App Router architecture, URL state, server-side data fetching, and performance-aware UI decisions.

## Links

- Repository: `https://github.com/GoabDev/frontend-assessment-ajogu-joseph`
- Live URL: `https://frontend-assessment-ajogu-joseph.vercel.app`

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

## Architecture

- `app/` contains the route tree, route metadata, and route-level loading/error states.
- `components/` contains reusable UI primitives such as cards, filters, pagination, breadcrumbs, and the shared product image fallback component.
- `lib/` contains API access and utility helpers so UI components never call `fetch()` directly.
- `types/` contains shared data contracts reused across the application.
- The listing and detail routes stay server-first. Only the search/filter controls are client-side because they own URL interaction.

## Feature Decisions

- `Pagination` was chosen instead of infinite scroll because it is easier to reason about, easier to test, better for shareable URLs, and more appropriate for a compact assessment project.
- `DummyJSON` product categories are used as the additional filter because they are available directly from the API and keep the filtering behavior meaningful.
- Search is `URL-driven` and debounced for `400ms`, which keeps state shareable while avoiding a route push on every keystroke.

## Performance Optimizations

- `next/image`
  All product images use a shared `ProductImage` wrapper with explicit dimensions and a graceful fallback SVG when a remote image fails.
- `next/font`
  Fonts are loaded through `next/font/google` in the root layout to avoid manual font loading and reduce layout instability.
- `fetch` cache settings
  API requests use `revalidate: 900` in [`lib/api.ts`](./lib/api.ts) because the data is public and read-only, so caching improves repeat performance without making the catalog feel stale.
- `Server-rendered routes`
  The listing and detail pages fetch on the server, which improves first paint and avoids shipping unnecessary client-side data logic.

## Testing

The project includes two meaningful component tests with `Vitest` and `React Testing Library`:

- [`components/search-filters.test.tsx`](./components/search-filters.test.tsx)
  Verifies debounced search URL updates and immediate category filter updates.
- [`components/pagination.test.tsx`](./components/pagination.test.tsx)
  Verifies pagination links preserve the active query and filter state.

## Trade-offs And Limitations

- Native `fetch` was used instead of TanStack Query because the main routes are server-rendered and read-only. In this case, App Router primitives kept the data flow simpler and easier to justify.
- The listing route uses on-demand server rendering rather than static generation because search params and category filters drive the view state.
- The project is deployed on `Vercel` rather than `Cloudflare Workers`. Vercel was chosen for speed of setup and reliable deployment for the assessment time window, while still preserving the core Next.js architecture under review.
- No optional bonus task was implemented in order to keep the core requirements polished and complete.

## What I Would Do With 2 More Hours

I would add one more component test around image fallback behavior or the detail-page breadcrumb flow, then run and document a Lighthouse plus accessibility audit against the live deployment. If time remained after that, I would prepare a Cloudflare Workers deployment path with OpenNext so the project could be evaluated against the preferred hosting environment as well.
