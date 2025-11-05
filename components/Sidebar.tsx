
import React from 'react';
import type { Category } from '../types';

interface SidebarProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortByChange,
}) => {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Categorías</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked={selectedCategories.includes(category.name)}
                onChange={() => onCategoryChange(category.name)}
              />
              <span className="ml-3 text-gray-600">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Rango de Precios</h3>
        <div className="flex flex-col space-y-4">
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      {/* Sort By */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Ordenar Por</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="relevance">Relevancia</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="rating-desc">Mejor Calificados</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
