
import React from 'react';

interface Props {
  onStart: () => void;
}

const OrnamentRow = () => (
  <div className="flex items-center gap-3 text-[#fcf6ba] opacity-60 text-lg">
    <span>☆</span> <span>❁</span> <span>★</span> <span>❁</span> <span>☆</span>
  </div>
);

const HomeScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center animate-fade-in space-y-10 py-10">
      
      <div className="space-y-4">
        <OrnamentRow />
        <p className="gold-text tracking-[0.8em] text-sm uppercase font-black">
          New Year Growth Journey
        </p>
        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter gold-text">
            新芽小精靈
          </h1>
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.4em] text-emerald-100/70">
            晨曦森林之旅
          </h2>
        </div>
      </div>
      
      <div className="max-w-xl mx-auto p-12 bg-white/5 rounded-[60px] backdrop-blur-md border border-[#bf953f]/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden group">
        <div className="absolute inset-0 animate-shimmer opacity-20"></div>
        
        {/* 四角裝飾 */}
        <div className="absolute top-6 left-6 text-[#bf953f] opacity-40 text-xl">❁</div>
        <div className="absolute top-6 right-6 text-[#bf953f] opacity-40 text-xl">❁</div>
        <div className="absolute bottom-6 left-6 text-[#bf953f] opacity-40 text-xl">❁</div>
        <div className="absolute bottom-6 right-6 text-[#bf953f] opacity-40 text-xl">❁</div>

        <div className="text-xl leading-[2.2] text-emerald-50 text-left font-medium tracking-widest space-y-1 relative z-10 px-4">
          <p>新年的晨光灑落，</p>
          <p>世界樹低聲吟唱，</p>
          <p>願望種子輕輕落下……</p>
          <p className="pt-4">你，一隻新芽小精靈，</p>
          <p>從柔軟的樹根中醒來。</p>
          <p className="pt-4">翅膀輕輕顫動，</p>
          <p>手中握著微溫的願望種子。</p>
          <p className="pt-4 font-bold text-[#fcf6ba]">★ 這個新年，你的成長之旅，</p>
          <p className="tracking-[0.2em] font-bold text-[#fcf6ba]">即將展開 ❁</p>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-[#bf953f] to-[#aa771c] rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
        <button 
          onClick={onStart}
          className="relative px-20 py-6 bg-white text-emerald-950 rounded-full font-black text-2xl hover:scale-105 transition-all shadow-2xl active:scale-95 border-b-4 border-[#bf953f] flex items-center gap-4"
        >
          <span className="text-xl">☆</span> 踏上旅程 <span className="text-xl">❁</span>
        </button>
      </div>

      <div className="flex flex-col items-center space-y-3 opacity-40">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#bf953f] to-transparent"></div>
        <p className="text-xs tracking-[0.8em] font-bold text-[#bf953f]">★ 在森林中遇見此刻的自己 ★</p>
      </div>
    </div>
  );
};

export default HomeScreen;
