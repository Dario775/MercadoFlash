import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductSelect, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-700">No se encontraron productos</h2>
        <p className="text-gray-500 mt-2">Intenta ajustar tus filtros o término de búsqueda.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onProductSelect={onProductSelect}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;