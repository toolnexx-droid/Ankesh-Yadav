import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingMessage = async (topic: string, tone: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Write a short, engaging WhatsApp marketing message about "${topic}". The tone should be ${tone}. Include relevant emojis. Keep it under 500 characters. Do not include a subject line, just the message body.`;
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Could not generate message.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating message. Please check your API key.";
  }
};

export const analyzeSpamScore = async (message: string): Promise<{ score: number; advice: string }> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Analyze the following WhatsApp message for spam likelihood. Return a JSON object with a "score" (0-100, where 100 is high spam risk) and "advice" (short string on how to improve it). Message: "${message}"`;
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            advice: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return { score: 0, advice: "No response from AI." };

    const json = JSON.parse(text);
    return {
      score: json.score ?? 0,
      advice: json.advice ?? "No advice available."
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { score: 0, advice: "Error analyzing message." };
  }
};