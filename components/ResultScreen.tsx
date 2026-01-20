
import React, { useEffect, useState, useMemo } from 'react';
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
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  
  const data = RESULTS[type];
  
  // 建立絕對路徑與相對路徑的混合策略
  const strategies = useMemo(() => {
    const idx = type === 'grass' ? '0' : type === 'fire' ? '1' : type === 'wind' ? '2' : '3';
    const origin = window.location.origin;
    const path = window.location.pathname.split('/').slice(0, -1).join('/');
    const basePath = `${origin}${path}`;

    return [
      `${idx}.jpg`,
      `./${idx}.jpg`,
      `${basePath}/${idx}.jpg`,
      `input_file_${idx}.png`,
      `input_file_${idx}.jpg`,
      `./input_file_${idx}.png`,
      `${origin}/input_file_${idx}.png`,
      `${basePath}/input_file_${idx}.png`,
      `assets/${idx}.jpg`,
      `src/${idx}.jpg`
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
              <div className="absolute -inset-5 bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#aa771c] rounded-[3.5rem] blur-sm opacity-20"></div>
              
              <div className="relative w-56 h-56 md:w-72 md:h-72 overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl bg-emerald-50 flex items-center justify-center">
                {!imgError ? (
                  <img 
                    src={currentUrl} 
                    alt={data.title}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onError={handleImageError}
                    onLoad={() => setImgLoaded(true)}
                  />
                ) : (
                  <div className="text-center p-6 bg-emerald-50 w-full h-full flex flex-col items-center justify-center">
                    <span className="text-7xl mb-4">{data.icon}</span>
                    <p className="text-xs text-emerald-800/40 uppercase font-black tracking-widest">Image Unavailable</p>
                    <button 
                      onClick={() => { setStrategyIndex(0); setImgError(false); setDebugLogs([]); }}
                      className="mt-4 text-[10px] underline text-emerald-800/50 hover:text-emerald-800"
                    >
                      重新掃描路徑
                    </button>
                  </div>
                )}
                
                {!imgLoaded && !imgError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-emerald-50/50">
                    <div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-black tracking-widest text-emerald-950 flex items-center justify-center gap-4">
                <span className="text-3xl opacity-30">❁</span> {data.title} <span className="text-3xl opacity-30">❁</span>
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] mx-auto rounded-full shadow-lg"></div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6 bg-white p-8 rounded-[2rem] shadow-inner border border-emerald-100">
              <div className="flex items-center gap-3 text-emerald-900 mb-2">
                <span className="text-xl">🌱</span>
                <h3 className="font-black text-lg tracking-widest uppercase opacity-40">生長狀態</h3>
              </div>
              <p className="text-xl text-emerald-800 font-medium leading-relaxed">{data.journeyState}</p>
            </div>
            
            <div className="space-y-6 bg-white p-8 rounded-[2rem] shadow-inner border border-emerald-100">
              <div className="flex items-center gap-3 text-emerald-900 mb-2">
                <span className="text-xl">✨</span>
                <h3 className="font-black text-lg tracking-widest uppercase opacity-40">精靈特質</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {data.traits.map((trait, idx) => (
                  <span key={idx} className="px-5 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-emerald-950/5 p-10 rounded-[3rem] border-2 border-dashed border-emerald-900/10 space-y-6">
            <h3 className="text-center font-black text-emerald-900/40 tracking-[0.4em] uppercase text-sm">★ 守護者的引導 ★</h3>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="w-12 h-12 border-4 border-[#bf953f] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-emerald-800/60 font-medium animate-pulse tracking-widest">正在聽取森林的回應...</p>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in text-center">
                <p className="text-2xl text-emerald-900 font-medium leading-relaxed italic">「{aiContent?.feedback}」</p>
                <div className="h-px w-20 bg-[#bf953f]/30 mx-auto"></div>
                <p className="text-lg text-emerald-800/70 font-bold tracking-widest leading-loose">{aiContent?.blessing}</p>
              </div>
            )}
          </div>

          <div className="bg-emerald-900 text-white p-8 rounded-[2.5rem] space-y-4">
            <div className="flex items-center gap-3 opacity-40 mb-2">
              <span className="text-lg">🧭</span>
              <h3 className="font-black text-xs tracking-[0.3em] uppercase">前行之道</h3>
            </div>
            <p className="text-lg font-medium leading-relaxed">{data.advancementStyle}</p>
          </div>
        </div>
      </div>

      <button 
        onClick={onRestart}
        className="mt-16 px-16 py-6 bg-white text-emerald-950 rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl active:scale-95 border-b-4 border-[#bf953f] flex items-center gap-4 group"
      >
        <span className="text-[#bf953f] transition-transform group-hover:-rotate-45">↺</span> 重新踏上旅程
      </button>

      {imgError && (
        <div className="mt-8 p-6 bg-black/90 text-[10px] font-mono text-emerald-400 rounded-2xl w-full border border-emerald-500/30">
          <p className="text-[#bf953f] mb-3 font-bold border-b border-[#bf953f]/30 pb-1">DIAGNOSTIC CONSOLE:</p>
          <div className="space-y-1">
            {debugLogs.map((log, i) => <div key={i} className="opacity-70">{log}</div>)}
          </div>
          <div className="mt-4 text-white p-2 bg-emerald-900/50 rounded">
            嘗試的路徑皆無法載入。請確認您的檔案 0.jpg 到 3.jpg 是否確實位於 index.html 同級目錄。
          </div>
        </div>
      )}

      <div className="mt-12 text-emerald-100/30 text-xs tracking-widest uppercase font-black text-center">
        ★ New Year Spiritual Journey 2025 ★
      </div>
    </div>
  );
};

export default ResultScreen;
