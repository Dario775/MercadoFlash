import React from 'react';
import { ChevronLeftIcon, UsersIcon, ShieldCheckIcon, SparklesIcon } from './icons';

interface AboutUsProps {
  onGoBack: () => void;
}

const teamMembers = [
  { name: 'Ana García', role: 'CEO y Fundadora', imageUrl: 'https://picsum.photos/id/237/200/200' },
  { name: 'Carlos Martínez', role: 'Director de Tecnología (CTO)', imageUrl: 'https://picsum.photos/id/1005/200/200' },
  { name: 'Sofía López', role: 'Directora de Operaciones (COO)', imageUrl: 'https://picsum.photos/id/1027/200/200' },
];

const AboutUs: React.FC<AboutUsProps> = ({ onGoBack }) => {
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm animate-fade-in">
      <button 
        onClick={onGoBack} 
        className="flex items-center text-sm text-primary hover:underline mb-8 font-medium"
      >
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        Volver a la tienda
      </button>

      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800">Sobre MercadoPlaza</h1>
          <p className="mt-4 text-lg text-gray-600">Conectando vendedores apasionados con compradores inteligentes.</p>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Nuestra Misión</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            En MercadoPlaza, nuestra misión es democratizar el comercio electrónico, ofreciendo una plataforma robusta, fácil de usar y accesible para que emprendedores y pequeñas empresas puedan prosperar. Creemos en el poder de la comunidad para crear un ecosistema de compra y venta más justo, transparente y humano.
          </p>
        </section>

        <section className="bg-gray-50 p-8 rounded-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={UsersIcon}
              title="Comunidad"
              description="Fomentamos un espacio de colaboración y apoyo mutuo entre compradores y vendedores."
            />
            <ValueCard 
              icon={ShieldCheckIcon}
              title="Confianza"
              description="La seguridad y la transparencia son los pilares de cada transacción en nuestra plataforma."
            />
            <ValueCard 
              icon={SparklesIcon}
              title="Innovación"
              description="Buscamos constantemente nuevas formas de mejorar la experiencia de compra y venta para todos."
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Conoce al Equipo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <div key={member.name} className="text-center">
                <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-md"/>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="text-center border-t pt-10">
            <h2 className="text-2xl font-bold text-gray-800">¿Listo para unirte?</h2>
            <p className="mt-3 text-gray-600">Explora miles de productos únicos o empieza a vender hoy mismo.</p>
            <button 
                onClick={onGoBack}
                className="mt-6 px-8 py-3 text-base font-semibold text-white bg-primary rounded-full hover:bg-secondary transition-colors shadow-md"
            >
                Explorar Productos
            </button>
      </section>
      </div>
    </div>
  );
};

const ValueCard: React.FC<{icon: React.FC<any>, title: string, description: string}> = ({icon: Icon, title, description}) => (
    <div className="text-center p-4">
        <div className="flex items-center justify-center h-16 w-16 bg-blue-100 rounded-full mx-auto mb-4">
            <Icon className="w-8 h-8 text-primary"/>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default AboutUs;