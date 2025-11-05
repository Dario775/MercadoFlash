export interface Shop {
  id: string;
  name: string;
}

export interface ShopDetails extends Shop {
    description: string;
    logoUrl: string;
    memberSince: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id?: string;
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
  stock: number; // Added stock property
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Entregado' | 'En Camino' | 'Procesando';
  total: number;
  items: OrderItem[];
  customerName?: string; // Optional customer name for vendor panel
}

export interface User {
  id:string;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
}