
import { GoogleGenAI, Type } from "@google/genai";
import { SpiritType } from "../types.ts";

export interface PersonalizedContent {
  feedback: string;
  blessing: string;
}

const SPIRIT_NAME_MAP: Record<SpiritType, string> = {
  light: "光芽精靈",
  fire: "火芽精靈",
  grass: "草芽精靈",
  wind: "風芽精靈"
};

export const generatePersonalizedResult = async (spiritType: SpiritType, choices: string[]): Promise<PersonalizedContent> => {
  const spiritName = SPIRIT_NAME_MAP[spiritType];
  
  const fallbackContent: PersonalizedContent = {
    feedback: "你在森林中緩緩而行，那份獨特的寧靜是土地給予你最好的新年禮物。",
    blessing: "願你的心中始終有一片溫柔的森林，陪著你慢慢生長。"
  };

  // API Key must be obtained exclusively from process.env.API_KEY
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("API Key is not defined in process.env.API_KEY, using fallback content.");
    return fallbackContent;
  }

  try {
    // Create instance right before making the call to ensure latest API key usage
    const ai = new GoogleGenAI({ apiKey });
    
    // Using systemInstruction and responseSchema for structured JSON output
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `這是一位名為「${spiritName}」的新年成長之旅記錄。他的選擇包含：${choices.join('、')}。`,
      config: {
        systemInstruction: "你是一位溫柔的森林守護者。請根據精靈的選擇撰寫：1. feedback（針對生長樣態給予療癒且精準的鼓勵，30-45字）。2. blessing（充滿森林氣息的溫暖新年祝福，20-30字）。語氣必須療癒、溫柔。禁用詞：能量、人格、測驗、靈性、命運、預言、類型、覺醒、覺知。",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            feedback: { 
              type: Type.STRING,
              description: "針對生長樣態的療癒鼓勵"
            },
            blessing: { 
              type: Type.STRING,
              description: "森林氣息的新年祝福"
            }
          },
          propertyOrdering: ["feedback", "blessing"]
        }
      }
    });
    
    const text = response.text?.trim() || "";
    if (!text) throw new Error("Empty AI response");
    
    const result = JSON.parse(text);
    return {
      feedback: result.feedback || fallbackContent.feedback,
      blessing: result.blessing || fallbackContent.blessing
    };
  } catch (error) {
    console.error("AI Content Generation Error:", error);
    return fallbackContent;
  }
};
