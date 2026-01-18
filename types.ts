
export type SpiritType = 'light' | 'fire' | 'grass' | 'wind';

export interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    type: SpiritType;
  }[];
  creature?: {
    name: string;
    message: string;
    icon: string;
  };
}

export interface ResultData {
  title: string;
  icon: string;
  imageUrl: string; // 新增圖片路徑
  journeyState: string;
  traits: string[];
  advancementStyle: string;
}

export type AppState = 'HOME' | 'QUIZ' | 'RESULT';
