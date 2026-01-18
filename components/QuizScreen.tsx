
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants';
import { SpiritType } from '../types';

interface Props {
  onComplete: (result: SpiritType, choices: string[]) => void;
}

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
      // Calculate final result
      const counts: Record<SpiritType, number> = { light: 0, fire: 0, grass: 0, wind: 0 };
      newAnswers.forEach(ans => counts[ans]++);
      
      let maxType: SpiritType = 'light';
      let maxCount = -1;
      
      // Order: light, fire, grass, wind
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
    <div className="max-w-2xl mx-auto min-h-[75vh] flex flex-col justify-center animate-fade-in relative px-4">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <span className="text-xs text-emerald-300 font-medium tracking-widest">旅途進度 {currentIndex + 1} / {QUESTIONS.length}</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-400 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(52,211,153,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Creature Notice Overlay */}
      {showCreature && q.creature && (
        <div className="mb-8 p-6 bg-emerald-800/40 backdrop-blur-md rounded-3xl border border-emerald-400/30 animate-fade-in shadow-inner">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">{q.creature.icon}</span>
            <div>
              <h4 className="text-emerald-300 font-bold text-sm tracking-widest">{q.creature.name} 打了聲招呼</h4>
              <p className="text-xs text-emerald-200/60">森林的引導者</p>
            </div>
          </div>
          <p className="text-emerald-50 italic leading-relaxed text-sm">
            {q.creature.message}
          </p>
        </div>
      )}

      {/* Question Card */}
      <div className={`space-y-10 transition-all duration-500 ${showCreature ? 'mt-0' : 'mt-4'}`}>
        <h2 className="text-2xl md:text-3xl font-medium leading-relaxed text-center text-emerald-50">
          {q.text}
        </h2>

        <div className="grid gap-4">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(opt.type, opt.label)}
              className="group relative text-left p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/5 hover:bg-white/20 hover:border-emerald-400/30 transition-all duration-300 active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 to-emerald-400/0 group-hover:from-emerald-400/5 transition-all"></div>
              <span className="block text-lg font-light text-emerald-50 group-hover:translate-x-1 transition-transform">
                {opt.label}
              </span>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                🌱
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
