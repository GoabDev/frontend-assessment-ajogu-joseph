export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
  tags?: string[];
  sku?: string;
  availabilityStatus?: string;
  shippingInformation?: string;
  warrantyInformation?: string;
  returnPolicy?: string;
};

export type ProductListResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductCategory = {
  slug: string;
  name: string;
};

export type ProductsQuery = {
  page?: number;
  query?: string;
  category?: string;
  limit?: number;
};
