
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getShoppingAdvice = async (query: string, availableProducts: string[]) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      User Query: ${query}
      Available Products in Store: ${availableProducts.join(', ')}
      
      Act as a helpful Kirana store assistant. If the user asks for a recipe or general grocery help, suggest which items from our store they should buy. Be friendly and concise.
    `,
    config: {
      temperature: 0.7,
    }
  });
  return response.text;
};

export const identifyProductFromImage = async (base64Image: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: "Identify this grocery product. Return only the name of the product in 1-3 words." }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          productName: { type: Type.STRING }
        }
      }
    }
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return data.productName;
  } catch (e) {
    return "Unknown Product";
  }
};
