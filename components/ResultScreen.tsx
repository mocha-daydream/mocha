
import React, { useEffect, useState, useMemo } from 'react';
import { RESULTS } from '../constants.ts';
import { SpiritType } from '../types.ts';
import { generatePersonalizedResult, PersonalizedContent } from '../services/geminiService.ts';

interface Props {
  type: SpiritType;
  choices: string[];
  onRestart: () => void;
}

const TYPE_COLORS: Record<SpiritType, string> = {
  light: 'from-amber-200 via-yellow-400 to-orange-300',
  fire: 'from-orange-400 via-red-500 to-rose-600',
  grass: 'from-emerald-300 via-green-500 to-teal-600',
  wind: 'from-sky-200 via-blue-400 to-indigo-300'
};

const ResultScreen: React.FC<Props> = ({ type, choices, onRestart }) => {
  const [aiContent, setAiContent] = useState<PersonalizedContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  
  const data = RESULTS[type];
  
  const strategies = useMemo(() => {
    const idx = type === 'grass' ? '0' : type === 'fire' ? '1' : type === 'wind' ? '2' : '3';
    const origin = window.location.origin;
    const path = window.location.pathname.split('/').slice(0, -1).join('/');
    const basePath = `${origin}${path === '/' ? '' : path}`;

    return [
      `${idx}.jpg`,
      `input_file_${idx}.png`,
      `input_file_${idx}.jpg`,
      `${basePath}/${idx}.jpg`,
      `${basePath}/input_file_${idx}.png`,
      `${origin}/${idx}.jpg`,
      `./${idx}.jpg`
    ];
  }, [type]);

  const [strategyIndex, setStrategyIndex] = useState(0);
  const currentUrl = strategies[strategyIndex];

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

  const handleImageError = () => {
    setDebugLogs(prev => [...prev, `FAIL: ${currentUrl}`]);
    if (strategyIndex < strategies.length - 1) {
      setStrategyIndex(prev => prev + 1);
    } else {
      setImgError(true);
    }
  };

  return (
    <div className="flex flex-col items-center animate-fade-in max-w-2xl mx-auto pb-16 px-4 pt-0">
      
      <div className="w-full bg-[#fefdfa] text-emerald-900 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden relative border-[12px] border-emerald-950 mt-4">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

        <div className="p-8 md:p-12 space-y-8 leading-loose relative z-10">
          
          <div className="text-center">
            <p className="text-xs tracking-[0.6em] text-emerald-800/50 mb-6 font-black uppercase gold-text flex items-center justify-center gap-3">
              ★ Journey Accomplished ★
            </p>
            
            <div className="relative inline-block mb-8">
              {/* 背景流光效果 */}
              <div className={`absolute -inset-10 bg-gradient-to-br ${TYPE_COLORS[type]} rounded-full blur-3xl opacity-20 animate-pulse`}></div>
              
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-[3rem] border-4 border-white shadow-2xl bg-emerald-50 flex items-center justify-center group">
                {!imgError ? (
                  <img 
                    src={currentUrl} 
                    alt={data.title}
                    className={`w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onError={handleImageError}
                    onLoad={() => setImgLoaded(true)}
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${TYPE_COLORS[type]} flex flex-col items-center justify-center p-8 text-center animate-fade-in`}>
                    <div className="text-9xl mb-4 animate-bounce filter drop-shadow-2xl opacity-90">{data.icon}</div>
                    <div className="space-y-1">
                      <p className="text-white font-black text-2xl tracking-[0.2em] drop-shadow-md">{data.title}</p>
                      <p className="text-white/60 text-[10px] font-bold tracking-tighter uppercase opacity-80">Spirit Embodiment</p>
                    </div>
                  </div>
                )}
                
                {!imgLoaded && !imgError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-50/80 backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-[10px] text-emerald-800 font-bold tracking-widest animate-pulse">喚醒精靈中...</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-black tracking-widest text-emerald-950 flex items-center justify-center gap-4">
                <span className="text-3xl opacity-20">❁</span> {data.title} <span className="text-3xl opacity-20">❁</span>
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] mx-auto rounded-full shadow-lg"></div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4 bg-white p-8 rounded-[2.5rem] shadow-inner border border-emerald-50">
              <div className="flex items-center gap-3 text-emerald-900/30 mb-2">
                <span className="text-xl">🌱</span>
                <h3 className="font-black text-[10px] tracking-[0.3em] uppercase">生長狀態</h3>
              </div>
              <p className="text-xl text-emerald-800 font-bold leading-relaxed">{data.journeyState}</p>
            </div>
            
            <div className="space-y-4 bg-white p-8 rounded-[2.5rem] shadow-inner border border-emerald-50">
              <div className="flex items-center gap-3 text-emerald-900/30 mb-2">
                <span className="text-xl">✨</span>
                <h3 className="font-black text-[10px] tracking-[0.3em] uppercase">精靈特質</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.traits.map((trait, idx) => (
                  <span key={idx} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-black border border-emerald-100">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-emerald-950/5 p-10 rounded-[3.5rem] border-2 border-dashed border-emerald-900/10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl rotate-12">❁</div>
            <h3 className="text-center font-black text-emerald-900/20 tracking-[0.5em] uppercase text-xs">★ 守護者的引導 ★</h3>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="w-10 h-10 border-4 border-[#bf953f] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-emerald-800/40 font-black text-[10px] tracking-[0.3em] uppercase">聆聽森林的迴響...</p>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in text-center">
                <p className="text-2xl text-emerald-900 font-medium leading-relaxed italic px-2">「{aiContent?.feedback}」</p>
                <div className="h-px w-16 bg-[#bf953f]/30 mx-auto"></div>
                <p className="text-lg text-emerald-800/70 font-black tracking-widest leading-loose">{aiContent?.blessing}</p>
              </div>
            )}
          </div>

          {/* New Year Action Area */}
          <div className="bg-emerald-950 text-emerald-50 p-8 rounded-[3rem] space-y-6 text-center">
            <h3 className="text-xl font-bold">新的一年，新的開始</h3>
            <p className="opacity-80">你的精靈之旅暫告一段落，但成長永不止息。</p>
            <button 
              onClick={onRestart}
              className="px-12 py-4 bg-white text-emerald-950 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl active:scale-95 border-b-4 border-[#bf953f]"
            >
              重新開始旅程
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
