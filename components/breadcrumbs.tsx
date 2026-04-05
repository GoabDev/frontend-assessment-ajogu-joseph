import Link from "next/link";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted-foreground)]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span>/</span> : null}
            {item.href ? (
              <Link href={item.href} className="transition hover:text-[var(--foreground)]">
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--foreground)]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
