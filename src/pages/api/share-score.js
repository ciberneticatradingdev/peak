import { writeFile } from 'node:fs/promises';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

export const POST = async ({ request }) => {
  try {
    const { imageData } = await request.json();
    
    // Remover el prefijo de data URL
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Crear un nombre único para el archivo
    const fileName = `score-${Date.now()}.png`;
    const publicPath = join(process.cwd(), 'public', 'share');
    const filePath = join(publicPath, fileName);
    
    // Asegurarse de que el directorio existe
    try {
      await mkdir(publicPath, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
    }
    
    // Guardar la imagen
    await writeFile(filePath, buffer);
    
    // Usar URL de desarrollo para pruebas
    const isDevelopment = process.env.NODE_ENV === 'development';
    const baseUrl = isDevelopment ? 'http://localhost:4321' : 'https://officialcokememe.fun';
    
    // Devolver la URL pública
    return new Response(
      JSON.stringify({
        url: `${baseUrl}/share/${fileName}`
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('Error saving image:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to save image',
        details: error.message 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}
