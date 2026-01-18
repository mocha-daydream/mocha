
import { GoogleGenAI, Type } from "@google/genai";
import { SpiritType } from "../types.ts";

export interface PersonalizedContent {
  feedback: string;
  blessing: string;
}

export const generatePersonalizedResult = async (spiritType: SpiritType, choices: string[]): Promise<PersonalizedContent> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    你是一位溫柔的森林守護者。有一位「新芽小精靈旅人」剛剛完成了他在晨曦森林中的一次新年成長之旅。
    他的生長狀態目前傾向於「${spiritType}」。
    他在旅途中做的選擇包含：${choices.join('、')}。
    
    請為他撰寫：
    1. 【森林的低語】：一句非常溫柔、具有陪伴感且描述他此時生長樣態的話（約 30-45 字）。
    2. 【森林祝福】：一句溫暖的陪伴式結語（約 20-30 字）。
    
    規則：
    - 語氣必須像童話繪本、療癒、平實且溫柔。
    - 絕對不能出現「能量、人格、測驗、靈性、命運、預言、類型、覺醒、覺知」等詞彙。
    - 不要給他貼標籤，而是描述他「此刻展現出的樣子」。
    - 聚焦在「新年的生長」與「溫柔的陪伴」。
    - 使用繁體中文（台灣）。
    
    請直接以 JSON 格式回傳。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
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
    
    const result = JSON.parse(response.text || "{}");
    return {
      feedback: result.feedback || "你在森林中緩緩而行，那份獨特的寧靜是土地給予你最好的新年禮物。",
      blessing: result.blessing || "願你的心中始終有一片溫柔的森林，陪著你慢慢生長。"
    };
  } catch (error) {
    console.error("AI Content Generation Error:", error);
    return {
      feedback: "你在森林中緩緩而行，那份獨特的寧靜是土地給予你最好的新年禮物。",
      blessing: "願你的心中始終有一片溫柔的森林，陪著你慢慢生長。"
    };
  }
};
