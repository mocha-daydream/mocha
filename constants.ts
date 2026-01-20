
import { Question, ResultData, SpiritType } from './types.ts';

/**
 * 根據使用者最新上傳的圖片進行對應
 * 移除 ./ 前綴，直接使用檔名以提高載入成功率
 */
export const SPIRIT_ASSETS = {
  grass: 'input_file_0.jpg', // 綠色森精靈
  fire: 'input_file_1.jpg',  // 紅色火精靈
  wind: 'input_file_2.jpg',  // 藍色風精靈
  light: 'input_file_3.jpg'  // 黃色光精靈
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "新的一年開始了，你從世界樹的根部醒來，第一眼看到的是？",
    options: [
      { label: "溫暖而明亮的金色晨曦", type: "light" },
      { label: "像小火苗般跳動的朝霞", type: "fire" },
      { label: "掛著露珠、翠綠欲滴的新葉", type: "grass" },
      { label: "帶著花香、輕輕拂過的微風", type: "wind" }
    ],
    creature: {
      name: "露珠精靈",
      message: "早安，新芽精靈！這是一個充滿希望的起點。",
      icon: "💧"
    }
  },
  {
    id: 2,
    text: "你決定走出樹根，你打算如何展開這場冒險？",
    options: [
      { label: "追隨陽光的指引，往最高處爬去", type: "light" },
      { label: "哪裡有熱鬧的聲音，就往哪裡跑", type: "fire" },
      { label: "靜靜觀察四周，與身旁的植物打招呼", type: "grass" },
      { label: "張開透明的翅膀，隨風飄蕩", type: "wind" }
    ]
  },
  {
    id: 3,
    text: "途中，你遇到了一條清澈的小溪，溪水在低聲耳語，你聽到了什麼？",
    options: [
      { label: "「勇敢地綻放你的光芒吧！」", type: "light" },
      { label: "「燃燒你的熱情，去溫暖世界！」", type: "fire" },
      { label: "「慢慢長大，根基要紮得深厚。」", type: "grass" },
      { label: "「自由自在地飛翔，別被束縛。」", type: "wind" }
    ],
    creature: {
      name: "溪流守護者",
      message: "溪水的聲音，只有心靈純淨的精靈才能聽懂。",
      icon: "🐟"
    }
  },
  {
    id: 4,
    text: "在森林深處，你發現了一顆發光的願望種子，你會怎麼對待它？",
    options: [
      { label: "將它舉向高空，讓陽光親吻它", type: "light" },
      { label: "用熱情的雙手緊緊握住它，給它力量", type: "fire" },
      { label: "把它輕輕埋入肥沃的土裡，悉心呵護", type: "grass" },
      { label: "讓它乘著微風，去尋找屬於它的土地", type: "wind" }
    ]
  },
  {
    id: 5,
    text: "成長之旅即將告一段落，你希望在新的一年裡，自己成為怎樣的人？",
    options: [
      { label: "成為指引他人、帶來希望的光", type: "light" },
      { label: "成為充滿動力、熱愛生活的火", type: "fire" },
      { label: "成為堅韌不拔、溫柔守護的綠意", type: "grass" },
      { label: "成為無拘無束、探索未知的風", type: "wind" }
    ],
    creature: {
      name: "智慧老樹",
      message: "新芽啊，你的未來就在你的選擇之中。",
      icon: "🌳"
    }
  }
];

export const RESULTS: Record<SpiritType, ResultData> = {
  light: {
    title: "光芽精靈",
    icon: "✨",
    imageUrl: SPIRIT_ASSETS.light,
    journeyState: "在晨曦中沐浴，吸收著無窮的希望與溫暖。",
    traits: ["開朗樂觀", "極具遠見", "充滿正能量"],
    advancementStyle: "像光一樣前進，不畏艱難，始終相信美好的未來。"
  },
  fire: {
    title: "鍛芽精靈",
    icon: "🔥",
    imageUrl: SPIRIT_ASSETS.fire,
    journeyState: "在躍動的火焰中成長，每一刻都充滿熱忱與活力。",
    traits: ["勇敢無畏", "熱情奔放", "行動力十足"],
    advancementStyle: "用熱情驅動夢夢想，不論身處何方，都能點燃希望的火苗。"
  },
  grass: {
    title: "森芽精靈",
    icon: "🍃",
    imageUrl: SPIRIT_ASSETS.grass,
    journeyState: "在靜謐的泥土中紮根，感受大地的脈動與生命力。",
    traits: ["穩重踏實", "溫柔耐心", "極具韌性"],
    advancementStyle: "在安靜中慢慢積蓄力量，最終綻放出最美麗的翠綠。"
  },
  wind: {
    title: "風芽精靈",
    icon: "🎐",
    imageUrl: SPIRIT_ASSETS.wind,
    journeyState: "在輕靈的微風中飛翔，探索森林的每一個角落。",
    traits: ["自由自在", "靈活多變", "富有創意"],
    advancementStyle: "不拘泥於形式，在自由中尋找自我，帶領大家發現未知的世界。"
  }
};
