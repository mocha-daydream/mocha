
import React from 'react';

interface Props {
  onStart: () => void;
}

const HomeScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center animate-fade-in space-y-12">
      <div className="space-y-6">
        <p className="text-emerald-300 tracking-[0.4em] text-sm uppercase font-semibold">
          New Year Growth Journey
        </p>
        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            新芽小精靈
          </h1>
          <h2 className="text-2xl md:text-3xl font-light tracking-widest text-emerald-100 opacity-90">
            晨曦森林之旅
          </h2>
        </div>
        
        <div className="max-w-xl mx-auto p-10 bg-white/5 rounded-[40px] backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="text-lg leading-[1.6] text-emerald-50 text-left font-light tracking-wide space-y-0.5">
            <p>新年的晨光灑落，</p>
            <p>世界樹低聲吟唱，</p>
            <p>願望種子輕輕落下……</p>
            <p className="pt-3">你，一隻新芽小精靈，</p>
            <p>從柔軟的樹根中醒來。</p>
            <p className="pt-3">翅膀輕輕顫動，</p>
            <p>手中握著微溫的願望種子。</p>
            <p className="pt-3">這個新年，</p>
            <p>你的成長之旅，</p>
            <p>即將展開。</p>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/50 to-teal-500/50 rounded-full blur-xl opacity-25 group-hover:opacity-75 transition duration-1000"></div>
        <button 
          onClick={onStart}
          className="relative px-20 py-5 bg-white text-emerald-900 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-2xl active:scale-95 border-b-4 border-emerald-200"
        >
          踏上旅程
        </button>
      </div>

      <div className="flex flex-col items-center space-y-2 opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/50"></div>
        <p className="text-xs tracking-widest">在森林中遇見此刻的自己</p>
      </div>
    </div>
  );
};

export default HomeScreen;
