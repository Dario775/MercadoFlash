import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import Cart from './components/Cart';
import HeroBanner from './components/HeroBanner';
import FeaturedCategories from './components/FeaturedCategories';
import UserPanel from './components/UserPanel';
import VendorPanel from './components/VendorPanel'; 
import ProductForm from './components/ProductForm';
import ProfileForm from './components/ProfileForm'; // Importar el nuevo componente
import { mockProducts, mockCategories, mockUser, mockOrders, mockShopDetails } from './data/mockData';
import type { Product, CartItem, User, Order, ShopDetails } from './types';
import { FilterIcon } from './components/icons';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [user, setUser] = useState<User>(mockUser); // Hacer que el estado del usuario sea actualizable
  const [orders] = useState<Order[]>(mockOrders);
  const [shop] = useState<ShopDetails>(mockShopDetails);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isVendorPanelOpen, setIsVendorPanelOpen] = useState(false);
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // Nuevo estado para el modal de perfil


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
  
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsUserPanelOpen(false);
    setIsVendorPanelOpen(false);
    window.scrollTo(0, 0);
  };

  const handleGoBack = () => {
    setSelectedProduct(null);
  };

  const handleGoBackFromPanel = () => {
    setIsUserPanelOpen(false);
    setIsVendorPanelOpen(false);
  };

  const handleToggleUserPanel = () => {
    setIsUserPanelOpen(prev => !prev);
    setSelectedProduct(null);
    setIsVendorPanelOpen(false);
  };

  const handleToggleVendorPanel = () => {
    setIsVendorPanelOpen(prev => !prev);
    setSelectedProduct(null);
    setIsUserPanelOpen(false);
  };

  const handleAddToCart = (productToAdd: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...productToAdd, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const handleOpenProductModal = (product: Product | null) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };
  
  const handleSaveProduct = (productData: Product) => {
    const finalProductData = {
      ...productData,
      imageUrl: productData.images[0] || '',
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...finalProductData } : p));
    } else {
      const newProduct: Product = {
        ...finalProductData,
        id: `prod-${Date.now()}`,
        shop: { id: shop.id, name: shop.name },
        rating: 0,
        reviewCount: 0,
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    handleCloseProductModal();
  };
  
  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };
  
  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };
  
  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleSaveProfile = (updatedUser: User) => {
    setUser(updatedUser);
    handleCloseProfileModal();
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const renderContent = () => {
    if (selectedProduct) {
      return (
        <ProductDetail 
          product={selectedProduct} 
          onGoBack={handleGoBack} 
          onAddToCart={handleAddToCart}
        />
      );
    }
    
    if (isUserPanelOpen) {
      return (
        <UserPanel 
          user={user}
          orders={orders}
          onGoBack={handleGoBackFromPanel}
          onEditProfile={handleOpenProfileModal} // Pasar la función
        />
      );
    }
    
    if (isVendorPanelOpen) {
      return (
        <VendorPanel
          shop={shop}
          products={products.filter(p => p.shop.id === shop.id)}
          orders={orders}
          onGoBack={handleGoBackFromPanel}
          onAddProduct={() => handleOpenProductModal(null)}
          onEditProduct={(product) => handleOpenProductModal(product)}
          onDeleteProduct={handleDeleteProduct}
        />
      );
    }
    
    return (
      <>
        <div className="space-y-12">
          <HeroBanner />
          <FeaturedCategories />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-12">
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

            <div className="w-full lg:w-3/4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Explora Nuestros Productos</h1>
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden p-2 rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                        aria-label="Mostrar filtros"
                    >
                        <FilterIcon className="w-5 h-5" />
                        <span className="sr-only">Mostrar/Ocultar Filtros</span>
                    </button>
                </div>
                <ProductGrid 
                  products={filteredProducts} 
                  onProductSelect={handleProductSelect}
                  onAddToCart={handleAddToCart}
                />
            </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        onUserPanelClick={handleToggleUserPanel}
      />
      
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />
      
      {isProductModalOpen && (
        <ProductForm
          isOpen={isProductModalOpen}
          onClose={handleCloseProductModal}
          onSave={handleSaveProduct}
          productToEdit={editingProduct}
          categories={mockCategories}
        />
      )}
      
      {isProfileModalOpen && (
        <ProfileForm
          isOpen={isProfileModalOpen}
          onClose={handleCloseProfileModal}
          onSave={handleSaveProfile}
          currentUser={user}
        />
      )}


      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      
      <Footer onVendorPanelClick={handleToggleVendorPanel} />
    </div>
  );
};

export default App;