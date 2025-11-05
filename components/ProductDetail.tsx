import React, { useState, useRef } from 'react';
import type { Product } from '../types';
import { 
  StarIcon, ChevronLeftIcon, PlusIcon, MinusIcon, HeartIcon, 
  TruckIcon, VisaIcon, MastercardIcon, PaypalIcon
} from './icons';

interface ProductDetailProps {
  product: Product;
  onGoBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onGoBack, onAddToCart }) => {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  const [postalCode, setPostalCode] = useState('');
  const [shippingInfo, setShippingInfo] = useState<{cost: number; date: string} | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => {
      const newQuantity = prev + amount;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageContainerRef.current) {
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  const handleCalculateShipping = () => {
    if (!postalCode) return;
    setIsCalculatingShipping(true);
    setShippingInfo(null);
    // Simular llamada a API
    setTimeout(() => {
      const cost = Math.random() * 15 + 5; // Costo aleatorio entre 5 y 20
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 5);
      setShippingInfo({
        cost: parseFloat(cost.toFixed(2)),
        date: deliveryDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
      });
      setIsCalculatingShipping(false);
    }, 1500);
  };
  
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const total = (product.price * quantity).toFixed(2);

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm animate-fade-in">
      <button 
        onClick={onGoBack} 
        className="flex items-center text-sm text-primary hover:underline mb-6 font-medium"
      >
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        Volver a productos
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-3 justify-center">
                {product.images.map((img, index) => (
                  <button 
                    key={index} 
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 ${activeImage === img ? 'border-primary' : 'border-gray-200'}`}
                    onClick={() => {
                      setActiveImage(img);
                      setIsZoomed(false);
                    }}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
            </div>
            <div className="flex-1">
              <div 
                ref={imageContainerRef}
                className={`w-full aspect-square rounded-lg overflow-hidden border relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onMouseMove={handleMouseMove}
                onClick={() => setIsZoomed(!isZoomed)}
                role="button"
                aria-label={isZoomed ? "Alejar imagen" : "Acercar imagen"}
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && setIsZoomed(!isZoomed)}
              >
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-300 ease-out"
                  style={{
                    transform: isZoomed ? 'scale(2)' : 'scale(1)',
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }}
                />
              </div>
            </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <span className="inline-block bg-blue-100 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase">
              {product.category}
            </span>
            {discountPercent > 0 && (
                <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {discountPercent}% OFF
                </span>
            )}
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-3">{product.name}</h1>
          <p className="text-sm text-gray-600 mt-2">
            Vendido por <a href="#" className="text-primary font-semibold hover:underline">{product.shop.name}</a>
          </p>

          <div className="flex items-center mt-4 space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviewCount} opiniones)</span>
          </div>
          
          <div className="my-6">
            <span className="text-3xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through ml-3">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          
          {/* Actions */}
          <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-full p-1">
                <button onClick={() => handleQuantityChange(-1)} className="p-2 text-gray-600 hover:text-primary rounded-full hover:bg-gray-100 transition-colors">
                  <MinusIcon className="w-5 h-5" />
                </button>
                <span className="w-10 text-center text-lg font-semibold text-gray-800">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="p-2 text-gray-600 hover:text-primary rounded-full hover:bg-gray-100 transition-colors">
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">Total</span>
                <p className="text-2xl font-bold text-gray-900">${total}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
                <button 
                  onClick={() => onAddToCart(product, quantity)}
                  className="flex-1 px-8 py-3.5 text-base font-medium text-white bg-primary rounded-full hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-sm"
                >
                    Añadir al Carrito
                </button>
                <button className="p-3 text-gray-500 border border-gray-300 rounded-full hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition-colors">
                    <HeartIcon className="w-6 h-6"/>
                    <span className="sr-only">Añadir a la Lista de Deseos</span>
                </button>
            </div>
             <button className="w-full mt-3 px-8 py-3.5 text-base font-medium text-primary bg-blue-50 border-2 border-primary rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                Comprar Ahora
            </button>
          </div>

          {/* Shipping & Payment Info */}
          <div className="mt-8 border-t pt-6 space-y-6">
            {/* Shipping */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                  <TruckIcon className="w-6 h-6 text-gray-500" />
                  <h3 className="text-md font-semibold text-gray-800">Información de envío</h3>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Código Postal"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                />
                <button 
                  onClick={handleCalculateShipping}
                  disabled={isCalculatingShipping || !postalCode}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculatingShipping ? '...' : 'Calcular'}
                </button>
              </div>
              {shippingInfo && (
                <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                  <p>Costo de envío: <span className="font-semibold">${shippingInfo.cost}</span></p>
                  <p>Fecha estimada de entrega: <span className="font-semibold">{shippingInfo.date}</span></p>
                </div>
              )}
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2">Métodos de pago aceptados</h3>
              <div className="flex items-center gap-3">
                <VisaIcon className="h-6 w-auto" />
                <MastercardIcon className="h-6 w-auto" />
                <PaypalIcon className="h-6 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;