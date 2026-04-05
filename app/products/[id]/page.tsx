import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductImage } from "@/components/product-image";
import { getProductById } from "@/lib/api";
import { formatCurrency, formatLabel } from "@/lib/utils";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

async function getProductFromParams(params: Promise<{ id: string }>) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId < 1) {
    notFound();
  }

  try {
    return await getProductById(numericId);
  } catch {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const product = await getProductFromParams(params);

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.thumbnail,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = await getProductFromParams(params);
  const salePrice = Math.round(
    product.price * (1 - product.discountPercentage / 100),
  );

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-12 lg:px-10">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/products", label: "Products" },
          { label: product.title },
        ]}
      />
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-[var(--surface-2)] shadow-[0_24px_60px_-36px_rgba(30,36,48,0.28)]">
          <div className="relative aspect-square">
            <ProductImage
              src={product.images[0] ?? product.thumbnail}
              alt={product.title}
              width={1200}
              height={1200}
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-6 rounded-[2.25rem] bg-[var(--surface)] p-7 shadow-[0_24px_60px_-36px_rgba(30,36,48,0.24)]">
          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-[0.22em] text-[var(--muted-foreground)] uppercase">
              {product.brand ?? "Product"} / {formatLabel(product.category)}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)]">
              {product.title}
            </h1>
            <p className="text-base leading-7 text-[var(--muted-foreground)]">
              {product.description}
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <p className="text-4xl font-semibold tracking-tight text-[var(--foreground)]">
              {formatCurrency(salePrice)}
            </p>
            <p className="text-lg text-[var(--muted-foreground)] line-through">
              {formatCurrency(product.price)}
            </p>
            <span className="rounded-full bg-[var(--success-soft)] px-3 py-2 text-sm font-medium text-[var(--success-foreground)]">
              Save {Math.round(product.discountPercentage)}%
            </span>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-[var(--background)] p-4">
              <dt className="text-sm text-[var(--muted-foreground)]">Rating</dt>
              <dd className="mt-1 text-xl font-semibold text-[var(--foreground)]">
                {product.rating.toFixed(1)} / 5
              </dd>
            </div>
            <div className="rounded-[1.5rem] bg-[var(--background)] p-4">
              <dt className="text-sm text-[var(--muted-foreground)]">Stock</dt>
              <dd className="mt-1 text-xl font-semibold text-[var(--foreground)]">
                {product.stock} units
              </dd>
            </div>
            <div className="rounded-[1.5rem] bg-[var(--background)] p-4">
              <dt className="text-sm text-[var(--muted-foreground)]">Availability</dt>
              <dd className="mt-1 text-base font-medium text-[var(--foreground)]">
                {product.availabilityStatus ?? "In stock"}
              </dd>
            </div>
            <div className="rounded-[1.5rem] bg-[var(--background)] p-4">
              <dt className="text-sm text-[var(--muted-foreground)]">SKU</dt>
              <dd className="mt-1 text-base font-medium text-[var(--foreground)]">
                {product.sku ?? "Not provided"}
              </dd>
            </div>
          </dl>
          <div className="grid gap-3 rounded-[1.75rem] bg-[var(--accent-soft)] p-5">
            <p className="text-sm font-semibold tracking-[0.2em] text-[var(--foreground)] uppercase">
              Purchase signals
            </p>
            <p className="text-sm leading-6 text-[var(--foreground)]">
              {product.shippingInformation ??
                "Standard shipping information is unavailable for this item."}
            </p>
            <p className="text-sm leading-6 text-[var(--foreground)]">
              {product.warrantyInformation ??
                "Warranty details are not listed for this product."}
            </p>
            <p className="text-sm leading-6 text-[var(--foreground)]">
              {product.returnPolicy ??
                "Returns policy is not available for this product."}
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[var(--accent-foreground)] transition hover:opacity-90"
          >
            Back to products
          </Link>
        </div>
      </section>
    </main>
  );
}
