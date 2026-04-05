"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import type { ProductCategory } from "@/types/product";

type SearchFiltersProps = {
  categories: ProductCategory[];
  initialQuery: string;
  initialCategory: string;
};

function createQueryString(
  searchParams: URLSearchParams,
  entries: Record<string, string>,
) {
  const params = new URLSearchParams(searchParams);

  for (const [key, value] of Object.entries(entries)) {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  }

  params.delete("page");
  return params.toString();
}

export function SearchFilters({
  categories,
  initialQuery,
  initialCategory,
}: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const hasMounted = useRef(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const nextQuery = query.trim();

    if (nextQuery === initialQuery) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const params = createQueryString(new URLSearchParams(searchParams), {
        query: nextQuery,
        category: initialCategory,
      });
      const href = params ? `${pathname}?${params}` : pathname;

      startTransition(() => {
        router.push(href);
      });
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [initialCategory, initialQuery, pathname, query, router, searchParams, startTransition]);

  function navigate(nextValues: Record<string, string>) {
    const params = createQueryString(new URLSearchParams(searchParams), nextValues);
    const href = params ? `${pathname}?${params}` : pathname;

    startTransition(() => {
      router.push(href);
    });
  }

  return (
    <section className="rounded-[2rem] bg-[var(--surface)] p-5 shadow-[0_24px_60px_-38px_rgba(30,36,48,0.24)]">
      <form
        className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end"
        onSubmit={(event) => {
          event.preventDefault();
          navigate({ query: query.trim(), category: initialCategory });
        }}
      >
        <label className="flex-1">
          <span className="mb-2 block text-sm font-medium text-[var(--foreground)]">
            Search products
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try fragrance, furniture, phone..."
            className="min-w-0 w-full rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
          />
        </label>
        <label className="lg:w-72">
          <span className="mb-2 block text-sm font-medium text-[var(--foreground)]">
            Category
          </span>
          <select
            value={initialCategory}
            onChange={(event) =>
              navigate({
                query,
                category: event.target.value,
              })
            }
            className="w-full rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <div className="mt-3 min-h-6 text-sm text-[var(--muted-foreground)]">
        {isPending
          ? "Updating results..."
          : "Search updates automatically after 400ms, and filters stay synced to the URL."}
      </div>
    </section>
  );
}
