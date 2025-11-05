import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      <img 
        src="https://picsum.photos/id/1015/1200/400" 
        alt="Promotional banner" 
        className="w-full h-56 sm:h-72 object-cover opacity-50"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
          Temporada de Ofertas
        </h1>
        <p className="mt-4 text-lg text-gray-200 max-w-2xl">
          Descubre descuentos increíbles en todas las categorías. ¡No te lo pierdas!
        </p>
        <button className="mt-8 px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-secondary transition-colors shadow-lg">
          Ver Ofertas
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
