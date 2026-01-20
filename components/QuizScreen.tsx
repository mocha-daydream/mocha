
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants.ts';
import { SpiritType } from '../types.ts';

interface Props {
  onComplete: (result: SpiritType, choices: string[]) => void;
}

const CornerOrnate = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute w-12 h-12 text-[#bf953f] opacity-40 ${className}`} viewBox="0 0 100 100" fill="none">
    <path d="M10,90 Q10,10 90,10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M25,90 Q25,25 90,25" stroke="currentColor" strokeWidth="1" fill="none" />
    <circle cx="90" cy="10" r="3" fill="currentColor" />
  </svg>
);

const QuizScreen: React.FC<Props> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<SpiritType[]>([]);
  const [choiceTexts, setChoiceTexts] = useState<string[]>([]);
  const [showCreature, setShowCreature] = useState(false);

  const q = QUESTIONS[currentIndex];

  useEffect(() => {
    if (q.creature) {
      setShowCreature(true);
    } else {
      setShowCreature(false);
    }
  }, [currentIndex, q.creature]);

  const handleSelect = (type: SpiritType, label: string) => {
    const newAnswers = [...answers, type];
    const newChoiceTexts = [...choiceTexts, label];

    if (currentIndex < QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setChoiceTexts(newChoiceTexts);
      setCurrentIndex(currentIndex + 1);
    } else {
      const counts: Record<SpiritType, number> = { light: 0, fire: 0, grass: 0, wind: 0 };
      newAnswers.forEach(ans => counts[ans]++);
      
      let maxType: SpiritType = 'light';
      let maxCount = -1;
      
      (['light', 'fire', 'grass', 'wind'] as SpiritType[]).forEach(t => {
        if (counts[t] > maxCount) {
          maxCount = counts[t];
          maxType = t;
        }
      });
      
      onComplete(maxType, newChoiceTexts);
    }
  };

  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto min-h-[80vh] flex flex-col justify-center animate-fade-in relative px-4">
      
      {/* 進度條古典化 */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4 px-2">
          <span className="text-xs text-[#bf953f] font-black tracking-[0.4em] uppercase">旅途進度 ☆ {currentIndex + 1} / {QUESTIONS.length}</span>
          <span className="text-sm text-[#fcf6ba] opacity-50">❁</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
          <div 
            className="h-full bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] transition-all duration-700 ease-out shadow-[0_0_15px_rgba(191,149,63,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-[#bf953f]/20 rounded-[40px] p-10 md:p-14 relative shadow-2xl">
        <CornerOrnate className="top-4 left-4" />
        <CornerOrnate className="top-4 right-4 rotate-90" />
        <CornerOrnate className="bottom-4 left-4 -rotate-90" />
        <CornerOrnate className="bottom-4 right-4 rotate-180" />

        {showCreature && q.creature && (
          <div className="mb-8 p-6 bg-emerald-900/40 rounded-3xl border border-[#bf953f]/10 animate-fade-in shadow-inner relative">
            <div className="absolute -top-3 left-8 px-4 bg-emerald-950 text-[#bf953f] text-[10px] font-black tracking-widest uppercase border border-[#bf953f]/30 rounded-full">
              ★ Guardian Whisper
            </div>
            <div className="flex items-center gap-5 mb-4 mt-2">
              <span className="text-4xl filter drop-shadow-md">{q.creature.icon}</span>
              <div>
                <h4 className="text-[#fcf6ba] font-bold text-base tracking-widest">{q.creature.name}</h4>
                <p className="text-[10px] text-emerald-200/50 tracking-widest uppercase">森林的引導者 ❁</p>
              </div>
            </div>
            <p className="text-emerald-50 italic leading-relaxed text-base font-medium">
              「{q.creature.message}」
            </p>
          </div>
        )}

        <div className="space-y-10 transition-all duration-500">
          <h2 className="text-2xl md:text-3xl font-bold leading-relaxed text-center text-emerald-50 tracking-wide px-4">
            {q.text}
          </h2>

          <div className="grid gap-5">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt.type, opt.label)}
                className="group relative text-left p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:border-[#bf953f]/50 hover:bg-[#bf953f]/10 transition-all duration-300 active:scale-[0.98] overflow-hidden"
              >
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xl font-medium text-emerald-50 group-hover:text-[#fcf6ba] transition-colors">
                    <span className="opacity-0 group-hover:opacity-40 mr-2">❁</span> {opt.label}
                  </span>
                  <span className="text-2xl opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                    ✧
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
