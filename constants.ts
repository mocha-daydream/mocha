
import { Question, ResultData, SpiritType } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "星角鹿站在晨曦森林的入口前，眼中閃爍著溫柔的光。牠看著你，似乎在等待你的第一步。",
    creature: {
      name: "星角鹿",
      icon: "🦌✨",
      message: "「小精靈，這扇門通向森林深處。別擔心，每一種步調都有它生長的方式。」"
    },
    options: [
      { label: "輕聲問牠這裡通往哪裡", type: 'light' },
      { label: "對牠點點頭，不等回答直接走進門", type: 'fire' },
      { label: "繞著木門觀察，想看清楚森林的結構", type: 'grass' },
      { label: "發現側邊有一條開滿花的小路，試著從那裡繞過去", type: 'wind' }
    ]
  },
  {
    id: 2,
    text: "來到溪流邊，唯一的石橋在水氣中顯得有些搖晃，水聲清脆動聽。",
    options: [
      { label: "先試探性地踩幾下，確認穩固後慢慢踏穩每一步", type: 'light' },
      { label: "深吸一口氣，看準距離一口氣跑過橋面", type: 'fire' },
      { label: "覺得有些累了，坐在岸邊平石上休息一會再決定", type: 'grass' },
      { label: "覺得橋太固定，嘗試踏著水中突出的石頭繞行而過", type: 'wind' }
    ]
  },
  {
    id: 3,
    text: "霧羽貓頭鷹停在古老的老樹杈上，羽毛像雲朵一樣蓬鬆，牠輕輕轉過頭看著你。",
    creature: {
      name: "霧羽貓頭鷹",
      icon: "🦉🌫️",
      message: "「清晨是森林的呼吸。當一切剛開始，你現在最想握在手裡的是什麼？」"
    },
    options: [
      { label: "我需要一個更清晰的方向", type: 'light' },
      { label: "我需要一股推動我出發的動力", type: 'fire' },
      { label: "我需要一個能讓我安心停留的角落", type: 'grass' },
      { label: "我需要一個不受限、可以隨意飛行的空間", type: 'wind' }
    ]
  },
  {
    id: 4,
    text: "走進一片螢光花原，花朵隨著你的腳步微微亮起，像是在歡迎你的到來。",
    options: [
      { label: "試圖找出花朵亮起的規律，在腦中記下路線", type: 'light' },
      { label: "興奮地跟著前方最亮的那一朵花奔跑", type: 'fire' },
      { label: "安靜地坐在花群中央，閉上眼感受微光", type: 'grass' },
      { label: "在花原裡隨意走動，看看會不會遇到有趣的種子", type: 'wind' }
    ]
  },
  {
    id: 5,
    text: "清澈的湖畔邊，湖鏡獨角獸正在低頭飲水。牠抬起頭，湖面映照出你此刻的倒影。",
    creature: {
      name: "湖鏡獨角獸",
      icon: "🦄💎",
      message: "「湖水只會映照出你現在的樣子，那是你生長過程中的一格畫面。」"
    },
    options: [
      { label: "湊近湖邊，試圖看清倒影中細微的表情", type: 'light' },
      { label: "用手觸碰湖面，想感受水的溫度", type: 'fire' },
      { label: "遠遠地靜靜觀看，不打擾這份平靜", type: 'grass' },
      { label: "朝湖心投下一顆小石子，看漣漪擴散的樣子", type: 'wind' }
    ]
  },
  {
    id: 6,
    text: "在森林深處發現一座老石碑，上面刻著關於「前進方式」的簡單句子。",
    options: [
      { label: "「思考與觀察，會讓種子找到對的泥土」", type: 'light' },
      { label: "「實踐與嘗試，會讓枝葉找到陽光」", type: 'fire' },
      { label: "「平穩與耐心，會讓根部扎得更深」", type: 'grass' },
      { label: "「探索與彈性，會讓森林更有驚喜」", type: 'wind' }
    ]
  },
  {
    id: 7,
    text: "風尾狐從灌木叢中鑽出，尾巴像一團輕柔的雲朵。牠向你揮揮手，示意你同行。",
    creature: {
      name: "風尾狐",
      icon: "🦊🍃",
      message: "「森林的路每天都在變。要不要跟我一起走一段？不用看地圖也沒關係。」"
    },
    options: [
      { label: "先問清楚大概會經過哪裡，並記下回來的路", type: 'light' },
      { label: "二話不說，立刻加快速度跟上牠", type: 'fire' },
      { label: "調整自己的步伐，跟在牠後方保持距離", type: 'grass' },
      { label: "隨意地跟著，一路上邊走邊看旁邊的風景", type: 'wind' }
    ]
  },
  {
    id: 8,
    text: "新年第一天的夜晚，你在火堆旁坐下。火光跳躍，這是一段屬於你自己的時間。",
    options: [
      { label: "在心裡悄悄整理今天發生的事", type: 'light' },
      { label: "認真思考明天想完成的小目標", type: 'fire' },
      { label: "不再想任何事，讓身體徹底放鬆休息", type: 'grass' },
      { label: "仰望星空，讓思緒隨意飛走", type: 'wind' }
    ]
  },
  {
    id: 9,
    text: "你來到了世界樹前。樹幹發出溫潤的微光，彷彿在低聲吟唱。",
    options: [
      { label: "站在樹下，觀察光芒流動的樣子", type: 'light' },
      { label: "伸手觸碰粗糙而溫暖的樹皮", type: 'fire' },
      { label: "在樹根旁靜坐，呼吸樹木的香氣", type: 'grass' },
      { label: "繞著樹幹走一圈，看看樹後的世界", type: 'wind' }
    ]
  },
  {
    id: 10,
    text: "出口的光路就在前方。這是一個段落的結束，也是生長的繼續。",
    options: [
      { label: "深吸一口氣，保持穩定節奏走在道路中央", type: 'light' },
      { label: "面帶微笑，朝著前方快速奔跑過去", type: 'fire' },
      { label: "回頭看了看森林，才慢慢踏入光芒", type: 'grass' },
      { label: "踏出森林時，換一個有趣的姿勢向前行", type: 'wind' }
    ]
  }
];

export const RESULTS: Record<SpiritType, ResultData> = {
  light: {
    title: "光芽精靈",
    icon: "🌱✨",
    imageUrl: "./images/spirit_light.png",
    journeyState: "在此刻的起點，你展現出清晰且具備觀察力的狀態。比起盲目奔走，你更傾向於先理出思緒，在森林中尋找最適合自己的光影位置。",
    traits: ["溫柔的觀察力", "對節奏的細膩感受", "從生活中建立連結"],
    advancementStyle: "在新年裡，建議保持「觀察與思考」的習慣。在行動前先給自己一段沉澱的時間，會讓你走得更踏實。"
  },
  fire: {
    title: "火芽精靈",
    icon: "🌱🔥",
    imageUrl: "./images/spirit_fire.png",
    journeyState: "你體內醞釀著一股生機勃勃的行動力。你是一個喜歡親手觸碰世界的精靈，比起單純的計畫，你更相信實踐後留在掌心的真實溫度。",
    traits: ["直率的嘗試心", "對環境的適應力", "帶動周圍的生命力"],
    advancementStyle: "不需要擔心走錯路，因為你的成長點就在於那些「邁出的第一步」。請繼續保持你的好奇心與熱情。"
  },
  grass: {
    title: "草芽精靈",
    icon: "🌱🌿",
    imageUrl: "./images/spirit_grass.png",
    journeyState: "你擁有最深厚的穩定力量。你像森林中的大地一樣，重視根基的扎實與內心的安寧，不容易被外界的喧囂打亂自己的頻率。",
    traits: ["內在的耐受力", "持之以恆的平穩", "為他人提供安心感"],
    advancementStyle: "適合找到一個讓自己感到安心的規律。在新年裡，當你找對了頻率，你將會長成最溫潤穩固的存在。"
  },
  wind: {
    title: "風芽精靈",
    icon: "🌱🍃",
    imageUrl: "./images/spirit_wind.png",
    journeyState: "你是這座森林裡不受束縛的自在微風。你對新奇的事物充滿好奇，喜歡在偶然中發現意想不到的小驚喜，不拘泥於單一的計畫。",
    traits: ["靈活的視角切換", "對未知的開放心態", "隨遇而安的豁達"],
    advancementStyle: "保持你的靈活性。今年嘗試多去接觸不同的事物，當你不再執著於固定的終點，整個世界都會是你的生長樂園。"
  }
};
