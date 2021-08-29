export interface ILineItem {
  name: string;
  productType: string;
  price: number;
  image: string;
  id: number;
  variant: string;
}

export type ILineSelectedItem = ILineItem & { count: number };

export interface DiscountProgressConfig {
  [total: number]: number;
}

export interface ProductsApiResponseItem {
  id: number;
  title: string;
  product_type: string;
  variants: Array<{ price: string; title: string }>;
  image: { src: string };
}
