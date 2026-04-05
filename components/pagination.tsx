import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  query?: string;
  category?: string;
};

function buildPageHref(page: number, query?: string, category?: string) {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }

  if (query) {
    params.set("query", query);
  }

  if (category) {
    params.set("category", category);
  }

  const search = params.toString();
  return search ? `/products?${search}` : "/products";
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right);
}

export function Pagination({
  currentPage,
  totalPages,
  query,
  category,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] bg-[var(--surface)] p-4 shadow-[0_24px_60px_-38px_rgba(30,36,48,0.24)]"
    >
      <Link
        href={buildPageHref(Math.max(1, currentPage - 1), query, category)}
        aria-disabled={currentPage === 1}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          currentPage === 1
            ? "pointer-events-none bg-[var(--surface-2)] text-[var(--muted-foreground)]"
            : "bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90"
        }`}
      >
        Previous
      </Link>
      <div className="flex flex-wrap items-center gap-2">
        {pages.map((page) => (
          <Link
            key={page}
            href={buildPageHref(page, query, category)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              page === currentPage
                ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                : "bg-[var(--surface-2)] text-[var(--foreground)] hover:opacity-80"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>
      <Link
        href={buildPageHref(Math.min(totalPages, currentPage + 1), query, category)}
        aria-disabled={currentPage === totalPages}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          currentPage === totalPages
            ? "pointer-events-none bg-[var(--surface-2)] text-[var(--muted-foreground)]"
            : "bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
