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
        console.error("Fetch Error:", err);
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
              <div className={`relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-[2.5rem] border-4 border-white shadow-xl flex items-center justify-center bg-white ${glowColors[type]}`}>
                <img 
                  src={data.imageUrl} 
                  alt={data.title}
                  className="w-full h-full object-cover transition-opacity duration-700"
                  onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                  style={{ opacity: 0 }}
                />
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
            <div className="text-xl italic text-emerald-800 font-medium leading-relaxed pl-4 border-l-2 border-emerald-200 min-h-[3rem]">
              {loading ? (
                <span className="animate-pulse opacity-50">森林正在為你書寫祝福...</span>
              ) : (
                aiContent?.feedback
              )}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-emerald-800/40 uppercase">生長狀態</h3>
              <p className="text-lg text-emerald-900/80 font-light">{data.journeyState}</p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-emerald-800/40 uppercase">靈魂特質</h3>
              <div className="flex flex-wrap gap-2">
                {data.traits.map(t => (
                  <span key={t} className="px-3 py-1 bg-emerald-900/5 rounded-full text-sm font-medium">#{t}</span>
                ))}
              </div>
            </section>
          </div>

          <section className="p-8 bg-emerald-900/5 rounded-3xl border border-emerald-900/5">
            <h3 className="text-xs font-bold tracking-widest text-emerald-800/40 uppercase mb-4">成長指引</h3>
            <p className="text-lg text-emerald-800">{data.advancementStyle}</p>
          </section>

          <div className="pt-8 text-center">
            <p className="text-2xl font-bold text-emerald-900 mb-2">「 {loading ? "..." : aiContent?.blessing} 」</p>
            <p className="text-xs text-emerald-800/40 tracking-widest">— 給你的新年祝福 —</p>
          </div>
        </div>
      </div>

      <button 
        onClick={onRestart}
        className="mt-12 px-12 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all text-sm tracking-widest font-bold uppercase"
      >
        重新開始旅程
      </button>
    </div>
  );
};

export default ResultScreen;