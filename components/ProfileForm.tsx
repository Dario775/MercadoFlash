import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import { XIcon } from './icons';

interface ProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  currentUser: User;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ isOpen, onClose, onSave, currentUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    zipCode: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        street: currentUser.address.street,
        city: currentUser.address.city,
        zipCode: currentUser.address.zipCode,
      });
    }
  }, [currentUser, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: User = {
      ...currentUser,
      name: formData.name,
      email: formData.email,
      address: {
        street: formData.street,
        city: formData.city,
        zipCode: formData.zipCode,
      },
    };
    onSave(updatedUser);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Editar Perfil</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form id="profile-form" onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
          </div>

          <div className="border-t pt-4">
             <h3 className="text-lg font-medium text-gray-900">Dirección de Envío</h3>
             <div className="mt-4 space-y-4">
                <div>
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">Calle y Número</label>
                    <input type="text" name="street" id="street" value={formData.street} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
                        <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Código Postal</label>
                        <input type="text" name="zipCode" id="zipCode" value={formData.zipCode} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                </div>
             </div>
          </div>
        </form>

        <div className="flex justify-end items-center p-5 border-t bg-gray-50">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Cancelar
          </button>
          <button type="submit" form="profile-form" className="ml-3 px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
