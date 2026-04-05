import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

const highlights = [
  {
    label: "Browse products",
    value: "200+ items",
    description: "Server-rendered catalog with pagination and clean card layout.",
  },
  {
    label: "Search and filter",
    value: "Shareable URLs",
    description: "Search terms and category state stay reflected in the route.",
  },
  {
    label: "Detail pages",
    value: "SEO-ready",
    description: "Dynamic metadata, breadcrumbs, loading states, and fallbacks.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-6 py-12 lg:px-10 lg:py-16">
      <section className="grid gap-10 rounded-[2.75rem] bg-[var(--surface)] px-6 py-10 shadow-[0_30px_80px_-48px_rgba(30,36,48,0.28)] lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-14">
        <div className="space-y-6">
          <p className="text-sm font-semibold tracking-[0.3em] text-[var(--accent)] uppercase">
            Product Explorer
          </p>
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-none tracking-tight text-[var(--foreground)] sm:text-6xl">
            Discover products through a fast, searchable storefront.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--muted-foreground)] sm:text-lg">
            Browse a server-rendered catalog, refine results with URL-driven filters,
            and open detail pages built for metadata, performance, and clean routing.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Shop catalog
            </Link>
            <a
              href="https://dummyjson.com/docs/products"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[var(--background)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] shadow-[0_14px_30px_-24px_rgba(30,36,48,0.35)] transition hover:-translate-y-0.5"
            >
              API reference
            </a>
          </div>
        </div>
        <div className="rounded-[2.25rem] bg-[var(--background)] p-6">
          <p className="text-sm font-semibold tracking-[0.22em] text-[var(--muted-foreground)] uppercase">
            At a glance
          </p>
          <div className="mt-6 grid gap-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] bg-[var(--surface)] px-5 py-5 shadow-[0_18px_40px_-32px_rgba(30,36,48,0.2)]"
              >
                <p className="text-sm font-medium text-[var(--muted-foreground)]">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[2rem] bg-[var(--surface)] px-6 py-6 shadow-[0_20px_45px_-34px_rgba(30,36,48,0.2)]">
          <p className="text-sm font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
            Server-first
          </p>
          <p className="mt-3 text-base leading-7 text-[var(--muted-foreground)]">
            Listing and detail views fetch data at the route level so the first render stays meaningful.
          </p>
        </div>
        <div className="rounded-[2rem] bg-[var(--surface)] px-6 py-6 shadow-[0_20px_45px_-34px_rgba(30,36,48,0.2)]">
          <p className="text-sm font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
            Shareable state
          </p>
          <p className="mt-3 text-base leading-7 text-[var(--muted-foreground)]">
            Search, filters, and pagination stay reflected in the URL for easier sharing and testing.
          </p>
        </div>
        <div className="rounded-[2rem] bg-[var(--surface)] px-6 py-6 shadow-[0_20px_45px_-34px_rgba(30,36,48,0.2)]">
          <p className="text-sm font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
            Production details
          </p>
          <p className="mt-3 text-base leading-7 text-[var(--muted-foreground)]">
            Loading states, error handling, metadata, image fallbacks, and reusable components are all included.
          </p>
        </div>
      </section>
    </main>
  );
}
