
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

  const glowColors: Record<SpiritType, string> = {
    light: 'shadow-yellow-200/50',
    fire: 'shadow-orange-300/50',
    grass: 'shadow-emerald-300/50',
    wind: 'shadow-blue-200/50'
  };

  useEffect(() => {
    let isMounted = true;
    const fetchAIResult = async () => {
      setLoading(true);
      try {
        const content = await generatePersonalizedResult(type, choices);
        if (isMounted) {
          setAiContent(content);
        }
      } catch (err) {
        console.error("ResultScreen fetch error:", err);
        if (isMounted) {
          setAiContent({
            feedback: "你在森林中緩緩而行，那份獨特的寧靜是土地給予你最好的新年禮物。",
            blessing: "願你的心中始終有一片溫柔的森林，陪著你慢慢生長。"
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchAIResult();
    return () => { isMounted = false; };
  }, [type, choices]);

  return (
    <div className="flex flex-col items-center animate-fade-in max-w-2xl mx-auto pb-24 px-4">
      
      <div className="w-full bg-[#fdfaf1] text-emerald-900 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden relative border-y-8 border-emerald-900">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        
        <div className="p-10 md:p-14 space-y-10 leading-loose relative z-10">
          
          <div className="text-center border-b border-emerald-900/10 pb-10">
            <p className="text-sm tracking-[0.4em] text-emerald-800/60 mb-6 font-bold uppercase">🌱 旅途回饋 Result</p>
            
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-2 bg-white rounded-[2rem] blur-sm opacity-50"></div>
              <div className={`relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-[2.5rem] border-4 border-white shadow-xl flex items-center justify-center bg-emerald-50/30 ${glowColors[type]}`}>
                {!imgError ? (
                  <img 
                    src={data.imageUrl} 
                    alt={data.title}
                    className="w-full h-full object-cover transition-opacity duration-700"
                    onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                    onError={() => setImgError(true)}
                    style={{ opacity: 0 }}
                  />
                ) : (
                  <div className="text-center p-8">
                    <span className="text-6xl mb-4 block opacity-50">🌱</span>
                    <p className="text-xs text-emerald-800/40 italic">精靈正在林間穿梭...<br/>(請確認 GitHub images 資料夾路徑)</p>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-2xl shadow-lg border border-emerald-900/5 rotate-12">
                <span className="text-3xl">{data.icon}</span>
              </div>
            </div>

            <h1 className="text-5xl font-bold text-emerald-900 tracking-tighter mt-4">《{data.title}》</h1>
          </div>

          <section>
            <h3 className="text-sm font-bold tracking-widest text-emerald-800/40 mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-emerald-800/20"></span>
              【森林的低語】
            </h3>
            <p className="text-xl italic text-emerald-800 font-medium leading-relaxed pl-4 border-l-2 border-emerald-200 min-h-[3rem]">
              {loading ? "正在聆聽森林的回音..." : `「${aiContent?.feedback}」`}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold tracking-widest text-emerald-800/40 mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-emerald-800/20"></span>
              【你此刻的旅途樣貌】
            </h3>
            <p className="text-base text-emerald-900/90 leading-relaxed font-light">
              {data.journeyState}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold tracking-widest text-emerald-800/40 mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-emerald-800/20"></span>
              【正在萌芽的小美好】
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.traits.map((trait, i) => (
                <li key={i} className="flex items-center gap-3 bg-emerald-900/5 px-4 py-2 rounded-full text-sm font-medium">
                  <span className="text-emerald-600">・</span>
                  {trait}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-bold tracking-widest text-emerald-800/40 mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-emerald-800/20"></span>
              【適合你的前進步調】
            </h3>
            <div className="p-6 rounded-2xl bg-emerald-100/50 border border-emerald-900/5 text-emerald-900 leading-relaxed italic text-base">
              {data.advancementStyle}
            </div>
          </section>

          <section className="pt-10 border-t border-emerald-900/10 text-center">
            <h3 className="text-sm font-bold tracking-widest text-emerald-800/40 mb-4 flex items-center justify-center gap-3">
               【新年祝福】
            </h3>
            <p className="text-xl font-bold text-emerald-800 tracking-wide min-h-[1.5rem]">
              {loading ? "森林正在準備祝福..." : aiContent?.blessing}
            </p>
          </section>
        </div>
      </div>

      <div className="mt-16 flex flex-col sm:flex-row gap-6 w-full px-4">
        <button 
          onClick={onRestart}
          className="flex-1 py-4 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition backdrop-blur-md border border-white/20 active:scale-95"
        >
          重新出發
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="flex-1 py-4 rounded-full bg-emerald-400 text-emerald-950 font-bold hover:bg-emerald-300 transition shadow-lg shadow-emerald-400/20 active:scale-95"
        >
          結束旅程
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
