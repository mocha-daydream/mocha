
import React, { useEffect, useState } from 'react';
import { RESULTS } from '../constants.ts';
import { SpiritType } from '../types.ts';
import { generatePersonalizedResult, PersonalizedContent } from '../services/geminiService.ts';

interface Props {
  type: SpiritType;
  choices: string[];
  onRestart: () => void;
}

const ResultScreen: React.FC<Props> = ({ type, choices, onRestart }) => {
  const [aiContent, setAiContent] = useState<PersonalizedContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const data = RESULTS[type];

  useEffect(() => {
    let isMounted = true;
    const fetchAIResult = async () => {
      setLoading(true);
      try {
        const content = await generatePersonalizedResult(type, choices);
        if (isMounted) setAiContent(content);
      } catch (err) {
        if (isMounted) {
          setAiContent({
            feedback: "你在森林中緩緩而行，那份獨特的寧靜是土地給予你最好的新年禮物。",
            blessing: "願你的心中始終有一片溫柔的森林，陪著你慢慢生長。"
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchAIResult();
    return () => { isMounted = false; };
  }, [type, choices]);

  return (
    <div className="flex flex-col items-center animate-fade-in max-w-2xl mx-auto pb-16 px-4 pt-0">
      
      {/* 主要結果卡片 */}
      <div className="w-full bg-[#fefdfa] text-emerald-900 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden relative border-[12px] border-emerald-950 mt-4">
        
        {/* 背景材質 */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

        <div className="p-8 md:p-12 space-y-8 leading-loose relative z-10">
          
          <div className="text-center">
            {/* 頂部文字直接開始，已移除所有圓弧裝飾線 */}
            <p className="text-xs tracking-[0.6em] text-emerald-800/50 mb-6 font-black uppercase gold-text flex items-center justify-center gap-3">
              ★ Journey Accomplished ★
            </p>
            
            <div className="relative inline-block mb-8">
              {/* 精靈肖像古典外框 */}
              <div className="absolute -inset-5 bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#aa771c] rounded-[3.5rem] blur-sm opacity-20"></div>
              
              <div className="relative w-56 h-56 md:w-72 md:h-72 overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl bg-emerald-50 flex items-center justify-center">
                {!imgError ? (
                  <img 
                    src={data.imageUrl} 
                    alt={data.title}
                    className="w-full h-full object-cover transition-opacity duration-1000"
                    onError={() => setImgError(true)}
                    onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                    style={{ opacity: 0 }}
                  />
                ) : (
                  <div className="text-center p-6">
                    <span className="text-5xl mb-3 block">{data.icon}</span>
                    <p className="text-[10px] text-emerald-800/40 font-bold uppercase tracking-widest">森林霧氣太濃<br/>看不清精靈的身影</p>
                  </div>
                )}
              </div>

              {/* 裝飾圖案 */}
              <div className="absolute -top-4 -left-4 text-[#bf953f] text-3xl animate-pulse">❁</div>
              <div className="absolute -bottom-4 -right-4 bg-white px-6 py-3 rounded-[1.2rem] shadow-xl border border-[#bf953f]/20 -rotate-3 flex items-center gap-2">
                <span className="text-3xl">{data.icon}</span>
                <span className="text-xs gold-text">★</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tighter gold-text">《{data.title}》</h1>
          </div>

          {/* 森林低語 (自動生成的文字設為靠左對齊) */}
          <section className="relative px-4">
            <div className="text-[#bf953f] opacity-20 text-xl mb-4 text-center">❁ ☆ ★</div>
            <div className="text-xl md:text-2xl text-emerald-900 font-bold leading-relaxed italic min-h-[4rem] text-left">
              {loading ? (
                <span className="animate-pulse opacity-20">正在轉譯森林的氣息...</span>
              ) : (
                `「${aiContent?.feedback}」`
              )}
            </div>
          </section>

          {/* 特質與狀態 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            <section className="space-y-2 p-4 bg-emerald-900/[0.02] rounded-2xl border border-emerald-900/5">
              <h3 className="text-[10px] font-black tracking-[0.2em] text-emerald-800/40 uppercase border-l-2 border-[#bf953f] pl-2">目前的生長狀態 ❁</h3>
              <p className="text-base text-emerald-900/80 font-bold leading-relaxed">{data.journeyState}</p>
            </section>

            <section className="space-y-2 p-4 bg-emerald-900/[0.02] rounded-2xl border border-emerald-900/5">
              <h3 className="text-[10px] font-black tracking-[0.2em] text-emerald-800/40 uppercase border-l-2 border-[#bf953f] pl-2">內在靈魂特質 ★</h3>
              <div className="flex flex-wrap gap-2">
                {data.traits.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-white border border-[#bf953f]/20 rounded-md text-[10px] font-black text-emerald-800 shadow-sm">#{t}</span>
                ))}
              </div>
            </section>
          </div>

          {/* 新年指引 (自動生成的文字設為靠左對齊) */}
          <section className="p-8 bg-emerald-900/[0.03] rounded-[2rem] border-2 border-dashed border-[#bf953f]/30 relative mx-2">
            <div className="absolute -top-3 left-8 px-4 bg-[#fefdfa] text-[#bf953f] text-[9px] font-black tracking-widest uppercase">
              ☆ New Year Guidance ☆
            </div>
            <p className="text-lg md:text-xl text-emerald-800 leading-relaxed font-bold text-left">
               ❁ {data.advancementStyle}
            </p>
          </section>

          {/* 祝福結語 */}
          <div className="pt-6 text-center space-y-4">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#bf953f]/20 to-transparent mx-auto"></div>
            <p className="text-2xl md:text-3xl font-black gold-text px-4 leading-tight">
               ★ {loading ? "..." : aiContent?.blessing} ★
            </p>
            <div className="flex flex-col items-center gap-1 opacity-40">
               <p className="text-[9px] text-emerald-800 tracking-[0.4em] font-black uppercase">Blessed by World Tree ❁</p>
               <span className="text-xs">☆</span>
            </div>
          </div>
        </div>
      </div>

      {/* 按鈕 */}
      <button 
        onClick={onRestart}
        className="mt-12 group relative px-14 py-4 overflow-hidden rounded-full transition-all active:scale-95 shadow-xl"
      >
        <div className="absolute inset-0 bg-emerald-900 group-hover:bg-emerald-800 transition-all"></div>
        <div className="absolute inset-0 animate-shimmer opacity-20"></div>
        <span className="relative text-sm tracking-[0.4em] font-black uppercase text-[#fcf6ba] flex items-center gap-3">
          <span>❁</span> 重啟森林之旅 <span>☆</span>
        </span>
      </button>

      <p className="mt-6 text-[9px] text-white/10 tracking-[0.8em] font-bold uppercase">★ Happy New Year 2025 ★</p>
    </div>
  );
};

export default ResultScreen;
