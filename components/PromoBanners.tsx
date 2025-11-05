import React from 'react';

const PromoBanners: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Banner 1 */}
      <a href="#" className="relative rounded-lg overflow-hidden group block h-64">
        <img src="https://picsum.photos/id/237/600/400" alt="Promoción 1" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-colors"></div>
        <div className="relative h-full flex flex-col justify-end p-8 text-white">
          <h3 className="text-2xl font-bold">Colección Tecnológica</h3>
          <p className="mt-2 text-sm font-medium bg-white text-gray-800 rounded-full self-start px-4 py-1">
            Explorar
          </p>
        </div>
      </a>
      
      {/* Banner 2 */}
      <a href="#" className="relative rounded-lg overflow-hidden group block h-64">
        <img src="https://picsum.photos/id/433/600/400" alt="Promoción 2" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-colors"></div>
        <div className="relative h-full flex flex-col justify-end p-8 text-white">
          <h3 className="text-2xl font-bold">Últimas Tendencias</h3>
          <p className="mt-2 text-sm font-medium bg-white text-gray-800 rounded-full self-start px-4 py-1">
            Descubrir
          </p>
        </div>
      </a>
    </div>
  );
};

export default PromoBanners;