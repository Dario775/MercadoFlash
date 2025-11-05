// Un servicio simulado para emular las subidas a Cloudinary.
// En una aplicación real, usarías el SDK de Cloudinary o una llamada directa a la API.
// IMPORTANTE: Para que esto funcione con una cuenta real de Cloudinary, debes:
// 1. Crear un "Upload Preset" sin firmar en tu configuración de Cloudinary.
// 2. Establecer las siguientes variables de entorno:
//    - process.env.CLOUDINARY_CLOUD_NAME
//    - process.env.CLOUDINARY_UPLOAD_PRESET

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

export const uploadImage = async (file: File): Promise<string> => {
  // Si las credenciales no están configuradas, devuelve una URL de imagen de prueba.
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    console.warn("Credenciales de Cloudinary no configuradas. Usando servicio de imágenes de prueba.");
    // Simular un retraso
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Devolver una imagen de marcador de posición aleatoria
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/id/${randomId}/600/600`;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('La subida de la imagen falló');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error al subir a Cloudinary:', error);
    // Recurso a una imagen de prueba en caso de fallo
    return `https://picsum.photos/id/1/600/600`;
  }
};
