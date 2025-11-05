import React from 'react';
import type { Product } from '../types';
import { StarIcon } from './icons';

interface ProductCardProps {
  product: Product;
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductSelect, onAddToCart }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg flex flex-col cursor-pointer"
      onClick={() => onProductSelect(product)}
      onKeyPress={(e) => e.key === 'Enter' && onProductSelect(product)}
      role="button"
      tabIndex={0}
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
          {product.shop.name}
        </div>
        {product.originalPrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                OFERTA
            </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="text-md font-semibold text-gray-800 truncate group-hover:text-primary flex-grow">
          {product.name}
        </h3>
        
        <div className="flex items-center mt-2">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">({product.reviewCount} opiniones)</span>
        </div>

        <div className="flex items-baseline justify-between mt-4">
          <div>
            <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Evita que el clic se propague al div principal
              onAddToCart(product, 1);
            }}
            className="px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-full hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;