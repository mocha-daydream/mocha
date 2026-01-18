
import { GoogleGenAI, Type } from "@google/genai";
import { SpiritType } from "../types.ts";

export interface PersonalizedContent {
  feedback: string;
  blessing: string;
}

/**
 * 安全地獲取 API Key，防止 process 未定義導致腳本崩潰
 */
const getApiKey = () => {
  try {
    return process.env.API_KEY || "";
  } catch (e) {
    return "";
  }
};

export const generatePersonalizedResult = async (spiritType: SpiritType, choices: string[]): Promise<PersonalizedContent> => {
  const apiKey = getApiKey();
  
  // 預設內容（作為備援）
  const fallbackContent: PersonalizedContent = {
    feedback: "你在森林中緩緩而行，那份獨特的寧靜是土地給予你最好的新年禮物。",
    blessing: "願你的心中始終有一片溫柔的森林，陪著你慢慢生長。"
  };

  if (!apiKey) {
    console.warn("API Key is missing. Using fallback content.");
    return fallbackContent;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      你是一位溫柔的森林守護者。有一位「新芽小精靈旅人」剛剛完成了新年成長之旅。
      生長狀態：「${spiritType}」。
      旅途選擇：${choices.join('、')}。
      
      請撰寫：
      1. 【feedback】：描述他生長樣態的話（30-45字）。
      2. 【blessing】：溫暖的結語（20-30字）。
      
      規則：
      - 語氣必須療癒、溫柔。
      - 禁用詞：能量、人格、測驗、靈性、命運、預言、類型、覺醒、覺知。
      - 格式：JSON。
    `;

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
