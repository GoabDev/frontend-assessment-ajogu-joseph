import type { Metadata } from "next";
import Link from "next/link";

import { Pagination } from "@/components/pagination";
import { ProductGrid } from "@/components/product-grid";
import { SearchFilters } from "@/components/search-filters";
import { getCategories, getPageSize, getProducts } from "@/lib/api";
import { clampPage, formatLabel } from "@/lib/utils";

type ProductsPageProps = {
  searchParams: Promise<{
    page?: string;
    query?: string;
    category?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse a server-rendered product catalog with search, category filters, pagination, and optimized product detail pages.",
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = clampPage(resolvedSearchParams.page);
  const query = resolvedSearchParams.query?.trim() ?? "";
  const category = resolvedSearchParams.category?.trim() ?? "";
  const limit = getPageSize();

  const [categories, productResponse] = await Promise.all([
    getCategories(),
    getProducts({
      page,
      query,
      category,
      limit,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(productResponse.total / productResponse.limit));
  const currentCategory = categories.find((item) => item.slug === category);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-12 lg:px-10">
      <section className="overflow-hidden rounded-[2.5rem] bg-[#223a5c] px-6 py-10 text-white shadow-[0_30px_80px_-48px_rgba(34,58,92,0.65)] lg:px-10">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm font-semibold tracking-[0.28em] text-[#ffd39d] uppercase">
            Product Explorer
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            A compact catalog that shows routing, data design, SEO, and performance discipline.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Search, category filtering, and pagination are reflected in the URL so the route stays shareable, crawlable, and easy to reason about.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-white">
            <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2">
              Server-rendered data
            </span>
            <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2">
              Route metadata
            </span>
            <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2">
              Optimized images
            </span>
          </div>
        </div>
      </section>

      <SearchFilters
        categories={categories}
        initialQuery={query}
        initialCategory={category}
      />

      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.22em] text-[var(--muted-foreground)] uppercase">
            Result summary
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
            {productResponse.total} products found
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
            Page {page} of {totalPages}
            {currentCategory ? ` in ${formatLabel(currentCategory.slug)}` : ""}
            {query ? ` matching "${query}"` : ""}
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex rounded-full bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-[0_16px_34px_-24px_rgba(30,36,48,0.5)] transition hover:-translate-y-0.5"
        >
          Clear filters
        </Link>
      </section>

      {productResponse.products.length > 0 ? (
        <>
          <ProductGrid products={productResponse.products} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            query={query}
            category={category}
          />
        </>
      ) : (
        <section className="rounded-[2rem] border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
          <p className="text-sm font-semibold tracking-[0.22em] text-[var(--muted-foreground)] uppercase">
            No matches
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
            Try a broader search or switch categories.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[var(--muted-foreground)]">
            This state is intentional too. Empty results still keep the current URL, which makes the route behavior explicit and testable.
          </p>
        </section>
      )}
    </main>
  );
}
