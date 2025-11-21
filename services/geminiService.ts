import { GoogleGenAI } from "@google/genai";
import { GeminiCaptionRequest } from '../types';

// In a real app, this would be process.env.API_KEY
// Since we cannot ask for key in UI, we assume it is available in environment
const API_KEY = process.env.API_KEY || ''; 

// Mock response generator for the UI demo if no key is present or for fallback
const mockGenerateCaption = async (tone: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  const mocks: Record<string, string> = {
    romantic: "In the whispers of the wind, love found its eternal home. ✨ #ForeverYours #NextImage",
    cinematic: "Shadows and light dancing in a symphony of emotion. A moment frozen in time. 🎬",
    fun: "Caught in the act of being awesome! Can we rewind this moment? 😄 #PartyVibes",
    professional: "Excellence in every frame. Elevating your visual identity. 📸"
  };
  return mocks[tone] || mocks['professional'];
};

export const generateAICaption = async (request: GeminiCaptionRequest): Promise<string> => {
  if (!API_KEY) {
    console.warn("Gemini API Key missing, using mock service.");
    return mockGenerateCaption(request.tone);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const prompt = `
      You are a professional social media manager for a high-end photography studio named 'Next Image Lipu Photography'.
      Generate a short, engaging Instagram caption for a photo with the following context: "${request.imageContext}".
      The tone should be: ${request.tone}.
      Include relevant hashtags.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate caption.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return mockGenerateCaption(request.tone);
  }
};