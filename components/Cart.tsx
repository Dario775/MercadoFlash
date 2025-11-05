import React from 'react';
import type { CartItem } from '../types';
import { XIcon, PlusIcon, MinusIcon, TrashIcon } from './icons';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Cart Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Tu Carrito</h2>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800">
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          {cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col justify-center items-center text-center p-5">
              <p className="text-lg text-gray-600">Tu carrito está vacío.</p>
              <button onClick={onClose} className="mt-4 px-6 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-secondary">
                Seguir Comprando
              </button>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-5">
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="flex gap-4">
                    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-200 rounded-full">
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1.5 text-gray-500 hover:text-primary">
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-gray-800">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1.5 text-gray-500 hover:text-primary">
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <button onClick={() => onRemoveItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-600">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800">Subtotal</span>
                <span className="text-xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <button className="w-full py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-secondary shadow-sm">
                Finalizar Compra
              </button>
               <button onClick={onClose} className="w-full mt-2 py-3 text-sm font-medium text-primary hover:text-secondary">
                o Seguir Comprando
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
