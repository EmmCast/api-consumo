import axios from 'axios';

export const translateTexts = async (texts) => {
  // Garantiza que 'texts' se maneje siempre como una lista/array
  const textList = Array.isArray(texts) ? texts : [texts];

  try {
    // Procesa y traduce cada texto en paralelo
    const translationPromises = textList.map(async (text) => {
      if (!text || text.trim() === '') return text;

      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: text,
          langpair: 'en|es'
        }
      });

      return response.data.responseData.translatedText;
    });

    // Espera a que todas las traducciones se completen
    return await Promise.all(translationPromises);
  } catch (error) {
    console.error('Error al traducir el texto:', error);
    // Si la API falla por red, retorna los textos originales sin romper la app
    return textList;
  }
};