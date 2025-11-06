import React from 'react';

interface FooterProps {
  onVendorPanelClick: () => void;
  onHowToSellClick: () => void;
  onAboutUsClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onVendorPanelClick, onHowToSellClick, onAboutUsClick }) => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">MercadoPlaza</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button onClick={onAboutUsClick} className="text-left hover:text-white">
                  Sobre Nosotros
                </button>
              </li>
              <li><a href="#" className="hover:text-white">Empleo</a></li>
              <li><a href="#" className="hover:text-white">Prensa</a></li>
            </ul>
          </div>
          
          {/* For Buyers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Para Compradores</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Cómo Comprar</a></li>
              <li><a href="#" className="hover:text-white">Seguir Pedido</a></li>
              <li><a href="#" className="hover:text-white">Devoluciones</a></li>
              <li><a href="#" className="hover:text-white">Protección al Comprador</a></li>
            </ul>
          </div>

          {/* For Sellers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Para Vendedores</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button onClick={onHowToSellClick} className="text-left hover:text-white">
                  Cómo Vender
                </button>
              </li>
              <li>
                <button onClick={onVendorPanelClick} className="text-left hover:text-white">
                  Panel de Vendedor
                </button>
              </li>
              <li><a href="#" className="hover:text-white">Precios</a></li>
              <li><a href="#" className="hover:text-white">Políticas de Vendedor</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Contáctanos</a></li>
              <li><a href="#" className="hover:text-white">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-white">Centro de Ayuda</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} MercadoPlaza, Inc. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Términos de Servicio</a>
            <a href="#" className="hover:text-white">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;