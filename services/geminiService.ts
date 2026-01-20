
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

  // 根據指示，API Key 必須直接從 process.env.API_KEY 獲取
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("API Key is not defined in process.env.API_KEY, using fallback content.");
    return fallbackContent;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const promptText = `
      你是一位溫柔的森林守護者。有一位「${spiritName}」剛剛完成了新年成長之旅。
      他在旅途中做出的選擇包含：${choices.join('、')}。
      
      請根據這些選擇撰寫：
      1. 【feedback】：針對這位精靈目前的生長樣態給予療癒且精準的鼓勵（30-45字）。
      2. 【blessing】：一段充滿森林氣息的溫暖新年祝福結語（20-30字）。
      
      規則：
      - 語氣必須療癒、溫柔。
      - 禁用詞：能量、人格、測驗、靈性、命運、預言、類型、覺醒、覺知。
      - 格式：請務必回傳純粹的 JSON 格式。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            feedback: { type: Type.STRING },
            blessing: { type: Type.STRING }
          },
          required: ["feedback", "blessing"]
        }
      }
    });
    
    const text = response.text;
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
