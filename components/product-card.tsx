import Link from "next/link";

import { ProductImage } from "@/components/product-image";
import { formatCurrency, formatLabel } from "@/lib/utils";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const salePrice = Math.round(
    product.price * (1 - product.discountPercentage / 100),
  );

  return (
    <article className="group overflow-hidden rounded-[2rem] bg-[var(--surface)] shadow-[0_24px_60px_-34px_rgba(30,36,48,0.28)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_-34px_rgba(30,36,48,0.36)]">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)]">
          <ProductImage
            src={product.thumbnail}
            alt={product.title}
            width={640}
            height={480}
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 rounded-full bg-[var(--foreground)] px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[var(--background)] uppercase">
            {formatLabel(product.category)}
          </div>
        </div>
        <div className="space-y-4 p-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.22em] text-[var(--muted-foreground)] uppercase">
              {product.brand ?? "Independent brand"}
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
              {product.title}
            </h2>
            <p className="line-clamp-2 text-sm leading-6 text-[var(--muted-foreground)]">
              {product.description}
            </p>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                {formatCurrency(salePrice)}
              </p>
              <p className="text-sm text-[var(--muted-foreground)] line-through">
                {formatCurrency(product.price)}
              </p>
            </div>
            <div className="rounded-full bg-[var(--accent-soft)] px-3 py-2 text-sm font-medium text-[var(--foreground)]">
              {product.rating.toFixed(1)} / 5
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
