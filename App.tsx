
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import { mockProducts, mockCategories } from './data/mockData';
import type { Product } from './types';
import { FilterIcon } from './components/icons';

const App: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    result = result.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [searchTerm, selectedCategories, priceRange, sortBy, products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className={`lg:w-1/4 lg:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
             <div className="p-6 bg-white rounded-lg shadow-sm">
                <Sidebar
                    categories={mockCategories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    sortBy={sortBy}
                    onSortByChange={setSortBy}
                />
            </div>
          </aside>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Productos ({filteredProducts.length})</h1>
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden p-2 rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                    aria-label="Mostrar filtros"
                >
                    <FilterIcon className="w-5 h-5" />
                    <span className="sr-only">Mostrar/Ocultar Filtros</span>
                </button>
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
