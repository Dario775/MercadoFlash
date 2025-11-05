import React, { useState, useEffect, useCallback } from 'react';
import type { Product, Category } from '../types';
import { XIcon, CloudArrowUpIcon, TrashIcon } from './icons';
import { uploadImage } from '../services/cloudinary';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  productToEdit: Product | null;
  categories: Category[];
}

const MAX_IMAGES = 5;

const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose, onSave, productToEdit, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0]?.name || '',
    price: '',
    originalPrice: '',
    stock: '',
    description: '',
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        category: productToEdit.category,
        price: String(productToEdit.price),
        originalPrice: String(productToEdit.originalPrice || ''),
        stock: String(productToEdit.stock),
        description: productToEdit.description,
      });
      setExistingImageUrls(productToEdit.images || []);
    } else {
      setFormData({
        name: '',
        category: categories[0]?.name || '',
        price: '',
        originalPrice: '',
        stock: '',
        description: '',
      });
      setExistingImageUrls([]);
    }
    setImageFiles([]);
    setIsUploading(false);
  }, [productToEdit, isOpen, categories]);

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const filesToAdd = Array.from(files);
      const totalImages = imageFiles.length + existingImageUrls.length + filesToAdd.length;
      if (totalImages > MAX_IMAGES) {
        alert(`Puedes subir un máximo de ${MAX_IMAGES} imágenes.`);
        return;
      }
      setImageFiles(prev => [...prev, ...filesToAdd]);
    }
  };

  const removeNewImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImageUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleDragEvents = (e: React.DragEvent<HTMLLabelElement>, isEntering: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEntering);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    handleDragEvents(e, false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const uploadPromises = imageFiles.map(file => uploadImage(file));
      const newImageUrls = await Promise.all(uploadPromises);
      
      const allImageUrls = [...existingImageUrls, ...newImageUrls];

      const productData: Product = {
        id: productToEdit?.id,
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price) || 0,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        stock: parseInt(formData.stock) || 0,
        description: formData.description,
        images: allImageUrls,
        imageUrl: allImageUrls[0] || '',
        rating: productToEdit?.rating || 0,
        reviewCount: productToEdit?.reviewCount || 0,
        shop: productToEdit?.shop || { id: '', name: ''},
      };

      onSave(productData);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("Hubo un error al subir las imágenes. Por favor, inténtalo de nuevo.");
    } finally {
      setIsUploading(false);
    }
  };
  
  const totalImageCount = imageFiles.length + existingImageUrls.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {productToEdit ? 'Editar Producto' : 'Añadir Nuevo Producto'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form id="product-form" onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-4">
          {/* Image Uploader */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes (hasta {MAX_IMAGES})</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {existingImageUrls.map((url, index) => (
                <div key={`existing-${index}`} className="relative group">
                  <img src={url} alt={`Imagen existente ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                  <button type="button" onClick={() => removeExistingImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TrashIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {imageFiles.map((file, index) => (
                <div key={`new-${index}`} className="relative group">
                  <img src={URL.createObjectURL(file)} alt={`Nueva imagen ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                  <button type="button" onClick={() => removeNewImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TrashIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {totalImageCount < MAX_IMAGES && (
                 <label 
                   htmlFor="file-upload" 
                   className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer transition-colors ${isDragging ? 'border-primary bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
                   onDragEnter={(e) => handleDragEvents(e, true)}
                   onDragLeave={(e) => handleDragEvents(e, false)}
                   onDragOver={(e) => e.preventDefault()}
                   onDrop={handleDrop}
                 >
                    <CloudArrowUpIcon className="w-8 h-8 text-gray-400" />
                    <span className="text-xs text-gray-500">Subir</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={(e) => handleFileChange(e.target.files)} />
                </label>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
              <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
              </select>
            </div>
             <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
              <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} required min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
          </div>
          
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
              <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
             <div>
              <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">Precio Original (Opcional)</label>
              <input type="number" name="originalPrice" id="originalPrice" value={formData.originalPrice} onChange={handleChange} min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
          </div>
        </form>

        <div className="flex justify-end items-center p-5 border-t bg-gray-50">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Cancelar
          </button>
          <button type="submit" form="product-form" disabled={isUploading} className="ml-3 px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed">
            {isUploading ? 'Guardando...' : 'Guardar Producto'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;