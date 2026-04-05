import { cache } from "react";

import type {
  Product,
  ProductCategory,
  ProductListResponse,
  ProductsQuery,
} from "@/types/product";

const API_BASE_URL = "https://dummyjson.com";
const DEFAULT_PAGE_SIZE = 20;

type DummyJsonCategoriesResponse =
  | string[]
  | Array<{
      slug?: string;
      name?: string;
      url?: string;
    }>;

function normalizeSearchValue(value?: string) {
  return value?.trim() ?? "";
}

function buildProductListUrl({
  page = 1,
  query,
  category,
  limit = DEFAULT_PAGE_SIZE,
}: ProductsQuery) {
  const normalizedPage = Number.isFinite(page) ? Math.max(1, page) : 1;
  const normalizedLimit = Number.isFinite(limit) ? Math.max(1, limit) : DEFAULT_PAGE_SIZE;
  const normalizedQuery = normalizeSearchValue(query);
  const normalizedCategory = normalizeSearchValue(category);
  const skip = (normalizedPage - 1) * normalizedLimit;

  if (normalizedQuery) {
    const params = new URLSearchParams({
      q: normalizedQuery,
      limit: String(normalizedLimit),
      skip: String(skip),
    });

    return `${API_BASE_URL}/products/search?${params.toString()}`;
  }

  if (normalizedCategory) {
    const params = new URLSearchParams({
      limit: String(normalizedLimit),
      skip: String(skip),
    });

    return `${API_BASE_URL}/products/category/${encodeURIComponent(
      normalizedCategory,
    )}?${params.toString()}`;
  }

  const params = new URLSearchParams({
    limit: String(normalizedLimit),
    skip: String(skip),
  });

  return `${API_BASE_URL}/products?${params.toString()}`;
}

async function request<T>(path: string) {
  const response = await fetch(path, {
    next: {
      revalidate: 900,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getProducts(query: ProductsQuery = {}) {
  const page = Number.isFinite(query.page) ? Math.max(1, query.page ?? 1) : 1;
  const limit = Number.isFinite(query.limit) ? Math.max(1, query.limit ?? DEFAULT_PAGE_SIZE) : DEFAULT_PAGE_SIZE;

  return request<ProductListResponse>(buildProductListUrl({ ...query, page, limit }));
}

export const getProductById = cache(async (id: number) => {
  return request<Product>(`${API_BASE_URL}/products/${id}`);
});

export const getCategories = cache(async () => {
  const categories = await request<DummyJsonCategoriesResponse>(
    `${API_BASE_URL}/products/categories`,
  );

  return categories
    .map((category) => {
      if (typeof category === "string") {
        return {
          slug: category,
          name: category.replace(/-/g, " "),
        };
      }

      const fallbackSlug = category.url?.split("/").at(-1) ?? "";
      const slug = category.slug ?? fallbackSlug;
      const name = category.name ?? slug.replace(/-/g, " ");

      return { slug, name };
    })
    .filter((category): category is ProductCategory => Boolean(category.slug))
    .sort((left, right) => left.name.localeCompare(right.name));
});

export function getPageSize() {
  return DEFAULT_PAGE_SIZE;
}
