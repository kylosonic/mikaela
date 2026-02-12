import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRomanticPoem = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Write a short, whimsical, and sweet 4-line poem for a girl named Mikaela who just agreed to be my valentine and go on a date with me. Mention that life is meaningful. Do NOT use the phrase 'I love you'. Keep it under 50 words. Emojis are okay.",
      config: {
        maxOutputTokens: 100,
        temperature: 0.8,
      }
    });
    
    return response.text || "Roses are red, violets are blue, Mikaela, I'm so happy I'm going out with you! 💖";
  } catch (error) {
    console.error("Failed to generate poem:", error);
    return "Mikaela, you make every day brighter just by being in it. ✨";
  }
};