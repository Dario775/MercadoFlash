export interface Shop {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string; // Remains as the primary thumbnail
  images: string[]; // For the product detail gallery
  description: string; // For the product detail page
  category: string;
  shop: Shop;
}

export interface CartItem extends Product {
  quantity: number;
}
