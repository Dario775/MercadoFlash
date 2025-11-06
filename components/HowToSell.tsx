import React from 'react';
// FIX: Import missing ClipboardDocumentListIcon icon.
import { ChevronLeftIcon, StorefrontIcon, PackageIcon, BanknotesIcon, UsersIcon, WrenchScrewdriverIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon, ClipboardDocumentListIcon } from './icons';

interface HowToSellProps {
  onGoBack: () => void;
  onStartSelling: () => void;
}

const HowToSell: React.FC<HowToSellProps> = ({ onGoBack, onStartSelling }) => {
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm animate-fade-in">
      <button 
        onClick={onGoBack} 
        className="flex items-center text-sm text-primary hover:underline mb-8 font-medium"
      >
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        Volver a la tienda
      </button>

      <header className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800">Vende en MercadoPlaza</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Únete a nuestra comunidad de vendedores y haz crecer tu negocio llegando a miles de clientes.</p>
      </header>

      {/* How it works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Cómo funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StepCard 
            icon={StorefrontIcon}
            title="1. Crea tu tienda"
            description="Regístrate gratis y personaliza el escaparate de tu tienda en minutos."
          />
          <StepCard 
            icon={PackageIcon}
            title="2. Sube tus productos"
            description="Utiliza nuestro panel de vendedor para añadir tus productos con fotos y descripciones detalladas."
          />
          <StepCard 
            icon={ClipboardDocumentListIcon}
            title="3. Gestiona los pedidos"
            description="Recibe notificaciones de nuevas ventas y gestiona tus pedidos y envíos fácilmente."
          />
           <StepCard 
            icon={BanknotesIcon}
            title="4. Recibe tus pagos"
            description="Ofrecemos un sistema de pagos seguro y transferencias directas a tu cuenta bancaria."
          />
        </div>
      </section>

      {/* Why sell with us */}
      <section className="bg-gray-50 p-10 rounded-lg mb-16">
         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">¿Por qué vender con nosotros?</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <BenefitCard 
                icon={UsersIcon}
                title="Gran Audiencia"
                description="Accede a una base de clientes activa y en constante crecimiento."
            />
             <BenefitCard 
                icon={WrenchScrewdriverIcon}
                title="Herramientas Sencillas"
                description="Un panel de control intuitivo para gestionar tu inventario, ventas y estadísticas."
            />
             <BenefitCard 
                icon={ShieldCheckIcon}
                title="Pagos Seguros"
                description="Procesamos todos los pagos de forma segura para tu tranquilidad y la de tus clientes."
            />
         </div>
      </section>
      
      {/* CTA */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">¿Listo para empezar?</h2>
        <p className="mt-3 text-gray-600">Es gratis y fácil empezar a vender hoy mismo.</p>
        <button 
            onClick={onStartSelling}
            className="mt-8 px-10 py-4 text-lg font-semibold text-white bg-primary rounded-full hover:bg-secondary transition-colors shadow-lg"
        >
            ¡Empieza a Vender Ahora!
        </button>
      </section>
    </div>
  );
};

const StepCard: React.FC<{icon: React.FC<any>, title: string, description: string}> = ({icon: Icon, title, description}) => (
    <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-center h-16 w-16 bg-blue-100 rounded-full mx-auto mb-4">
            <Icon className="w-8 h-8 text-primary"/>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);

const BenefitCard: React.FC<{icon: React.FC<any>, title: string, description: string}> = ({icon: Icon, title, description}) => (
    <div className="p-4">
        <Icon className="w-12 h-12 text-primary mx-auto mb-4"/>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default HowToSell;