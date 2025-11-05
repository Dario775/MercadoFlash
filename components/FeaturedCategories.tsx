import React from 'react';
import { LaptopIcon, ShirtIcon, HomeIcon, SparklesIcon, BookOpenIcon } from './icons';

const categories = [
  { name: 'Electrónica', icon: LaptopIcon },
  { name: 'Ropa', icon: ShirtIcon },
  { name: 'Hogar', icon: HomeIcon },
  { name: 'Belleza', icon: SparklesIcon },
  { name: 'Libros', icon: BookOpenIcon },
];

const FeaturedCategories: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Categorías Destacadas</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <a
            key={category.name}
            href="#"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg hover:bg-primary hover:text-white text-gray-700 transition-all duration-300 group"
          >
            <category.icon className="w-10 h-10 mb-3 text-primary group-hover:text-white" />
            <span className="font-semibold text-center">{category.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
