
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  sellerId: number;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProductCategory {
  ELECTRONICS = 'electronics',
  CLOTHING = 'clothing',
  FOOD = 'food',
  HOME = 'home',
  SPORTS = 'sports',
  OTHER = 'other',
}

