
import React, { useState } from 'react';
import { AppState, SpiritType } from './types.ts';
import HomeScreen from './components/HomeScreen.tsx';
import QuizScreen from './components/QuizScreen.tsx';
import ResultScreen from './components/ResultScreen.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>('HOME');
  const [spiritResult, setSpiritResult] = useState<SpiritType | null>(null);
  const [choices, setChoices] = useState<string[]>([]);

  const startJourney = () => {
    setChoices([]);
    setSpiritResult(null);
    setView('QUIZ');
  };

  const completeQuiz = (result: SpiritType, userChoices: string[]) => {
    setSpiritResult(result);
    setChoices(userChoices);
    setView('RESULT');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700 text-white selection:bg-emerald-300 selection:text-emerald-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {view === 'HOME' && <HomeScreen onStart={startJourney} />}
        {view === 'QUIZ' && <QuizScreen onComplete={completeQuiz} />}
        {view === 'RESULT' && spiritResult && (
          <ResultScreen 
            type={spiritResult} 
            choices={choices} 
            onRestart={() => setView('HOME')} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
