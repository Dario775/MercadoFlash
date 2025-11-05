import React from 'react';
import type { User, Order } from '../types';
import { ChevronLeftIcon } from './icons';

interface UserPanelProps {
  user: User;
  orders: Order[];
  onGoBack: () => void;
}

const getStatusBadgeClass = (status: Order['status']) => {
  switch (status) {
    case 'Entregado':
      return 'bg-green-100 text-green-800';
    case 'En Camino':
      return 'bg-blue-100 text-blue-800';
    case 'Procesando':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const UserPanel: React.FC<UserPanelProps> = ({ user, orders, onGoBack }) => {
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm animate-fade-in">
       <button 
        onClick={onGoBack} 
        className="flex items-center text-sm text-primary hover:underline mb-6 font-medium"
      >
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        Volver a la tienda
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mi Cuenta</h1>
        <p className="mt-1 text-gray-600">Hola, {user.name}. Aquí puedes ver tu perfil y tu historial de pedidos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Mi Perfil</h2>
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="font-semibold">Nombre:</p>
                <p>{user.name}</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="font-semibold">Dirección de envío:</p>
                <p>{user.address.street}, {user.address.city}, {user.address.zipCode}</p>
              </div>
              <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-full hover:bg-blue-50 transition-colors">
                Editar Perfil
              </button>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Historial de Pedidos</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">Aún no has realizado ningún pedido.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                    <div>
                      <p className="font-semibold text-gray-800">Pedido #{order.id}</p>
                      <p className="text-sm text-gray-500">Realizado el: {new Date(order.date).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div>
                       <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 w-full text-right sm:w-auto">${order.total.toFixed(2)}</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold mb-2">Artículos:</h4>
                    <ul className="space-y-3">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex items-center gap-4">
                          <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md flex-shrink-0"/>
                          <div className="flex-grow">
                            <p className="text-sm font-medium text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
