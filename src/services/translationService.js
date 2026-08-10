import axios from 'axios';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const translateTexts = async (texts) => {

  const textList = Array.isArray(texts)
    ? texts
    : [texts];

  const translations = [];

  for (const text of textList) {

    if (!text || text.trim() === '') {
      translations.push(text);
      continue;
    }

    try {

      const response = await axios.get(
        'https://api.mymemory.translated.net/get',
        {
          params: {
            q: text,
            langpair: 'en|es'
          }
        }
      );

      translations.push(
        response.data.responseData.translatedText
      );

      await sleep(800);

    } catch (error) {

      console.error(
        'Error traduciendo:',
        text,
        error
      );

      translations.push(text);

      if (error.response?.status === 429) {
        await sleep(3000);
      }
    }
  }

  return translations;
};