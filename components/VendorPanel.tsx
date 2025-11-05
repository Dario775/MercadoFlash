import React, { useMemo } from 'react';
import type { ShopDetails, Product, Order } from '../types';
import { ChevronLeftIcon, CurrencyDollarIcon, ArchiveBoxIcon, ClipboardDocumentListIcon, PencilIcon, TrashIcon } from './icons';

interface VendorPanelProps {
  shop: ShopDetails;
  products: Product[];
  orders: Order[];
  onGoBack: () => void;
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

const VendorPanel: React.FC<VendorPanelProps> = ({ shop, products, orders, onGoBack, onAddProduct, onEditProduct, onDeleteProduct }) => {
  const shopOrders = useMemo(() => {
    const productIds = new Set(products.map(p => p.id));
    return orders
      .map(order => {
        const itemsFromShop = order.items.filter(item => productIds.has(item.id));
        if (itemsFromShop.length === 0) {
          return null;
        }
        const shopTotal = itemsFromShop.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return {
          ...order,
          items: itemsFromShop,
          shopTotal,
        };
      })
      .filter((order): order is NonNullable<typeof order> => order !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [orders, products]);

  const stats = useMemo(() => {
    const totalRevenue = shopOrders.reduce((sum, order) => sum + order.shopTotal, 0);
    const totalProductsSold = shopOrders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
    return {
      revenue: totalRevenue,
      productsSold: totalProductsSold,
      orderCount: shopOrders.length,
    };
  }, [shopOrders]);

  const handleDelete = (productId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      onDeleteProduct(productId);
    }
  }

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm animate-fade-in">
      <button 
        onClick={onGoBack} 
        className="flex items-center text-sm text-primary hover:underline mb-6 font-medium"
      >
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        Volver a la tienda
      </button>
      
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8 pb-8 border-b">
        <img src={shop.logoUrl} alt={`${shop.name} logo`} className="w-24 h-24 rounded-full border-4 border-gray-100" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{shop.name}</h1>
          <p className="mt-1 text-gray-600">{shop.description}</p>
          <p className="mt-2 text-sm text-gray-500">Miembro desde: {new Date(shop.memberSince).toLocaleDateString('es-ES')}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard icon={CurrencyDollarIcon} title="Ingresos Totales" value={`$${stats.revenue.toFixed(2)}`} />
        <StatCard icon={ArchiveBoxIcon} title="Productos Vendidos" value={stats.productsSold.toString()} />
        <StatCard icon={ClipboardDocumentListIcon} title="Pedidos Totales" value={stats.orderCount.toString()} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* My Products */}
        <div className="xl:col-span-2">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Mis Productos</h2>
                <button onClick={onAddProduct} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-secondary transition-colors">
                    Añadir Producto
                </button>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg border">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Producto</th>
                            <th scope="col" className="px-6 py-3">Precio</th>
                            <th scope="col" className="px-6 py-3">Stock</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Acciones</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-3">
                                    <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
                                    {product.name}
                                </th>
                                <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                                <td className="px-6 py-4">{product.stock}</td>
                                <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                    <button onClick={() => onEditProduct(product)} className="p-2 text-gray-500 hover:text-primary"><PencilIcon className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(product.id!)} className="p-2 text-gray-500 hover:text-red-600"><TrashIcon className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Recent Orders */}
        <div className="xl:col-span-1">
             <h2 className="text-xl font-semibold text-gray-800 mb-4">Pedidos Recientes</h2>
             <div className="space-y-4">
                {shopOrders.slice(0, 5).map(order => (
                    <div key={order.id} className="bg-gray-50 border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-gray-800">Pedido #{order.id}</p>
                                <p className="text-xs text-gray-500">{order.customerName || 'Cliente anónimo'}</p>
                            </div>
                            <p className="font-bold text-gray-900">${order.shopTotal.toFixed(2)}</p>
                        </div>
                        <ul className="mt-2 border-t pt-2 space-y-2">
                           {order.items.map(item => (
                               <li key={item.id} className="flex items-center gap-2 text-xs">
                                   <img src={item.imageUrl} alt={item.name} className="w-8 h-8 rounded" />
                                   <p className="flex-grow text-gray-700">{item.name} <span className="text-gray-500">(x{item.quantity})</span></p>
                               </li>
                           ))}
                        </ul>
                    </div>
                ))}
             </div>
        </div>
      </div>
    </div>
  );
};


const StatCard: React.FC<{icon: React.FC<React.SVGProps<SVGSVGElement>>, title: string, value: string}> = ({ icon: Icon, title, value }) => (
    <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-full">
            <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);


export default VendorPanel;