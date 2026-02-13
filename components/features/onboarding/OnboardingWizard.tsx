
import React, { useState } from 'react';
import { User, UserBaseline } from '../../../types';

interface Props {
  user: User;
  onComplete: (updates: Partial<User>) => void;
}

export const OnboardingWizard: React.FC<Props> = ({ user, onComplete }) => {
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState<string[]>([]);
  const [baseline, setBaseline] = useState<UserBaseline>({ sleep: 5, stress: 5, movement: 5, nutrition: 5, energy: 5 });
  const [mobility, setMobility] = useState(false);

  const availableGoals = ['Afvallen', 'Meer energie', 'Beter slapen', 'Minder stress', 'Fitter worden'];

  const toggleGoal = (goal: string) => {
    setGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete({ goals, baseline, mobilityLimited: mobility, onboardingComplete: true });
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden mt-10 border border-stone-200 transition-all duration-500">
      {/* Animated Progress Bar */}
      <div className="h-2 bg-stone-100 w-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-teal-500 to-teal-600 h-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(20,184,166,0.4)]" 
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>
      
      <div key={step} className="p-10 animate-[fadeIn_0.5s_ease-out]">
        <div className="mb-8">
          <p className="text-teal-600 font-bold text-xs uppercase tracking-widest mb-1">Stap {step} van 3</p>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Wat zijn je doelen?</h2>
              <p className="text-stone-500">Selecteer alles wat voor jou belangrijk is.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {availableGoals.map(goal => {
                const isSelected = goals.includes(goal);
                return (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`group p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-center justify-between ${
                      isSelected 
                        ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-md transform scale-[1.02]' 
                        : 'bg-white border-stone-100 text-stone-500 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <span className={`text-lg font-bold transition-colors ${isSelected ? 'text-teal-900' : 'text-stone-700'}`}>
                      {goal}
                    </span>
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isSelected ? 'bg-teal-600 border-teal-600 text-white rotate-0' : 'border-stone-200 rotate-90 opacity-0 group-hover:opacity-100'
                    }`}>
                      <svg className={`w-4 h-4 transition-transform ${isSelected ? 'scale-100' : 'scale-50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Huidige status</h2>
              <p className="text-stone-500">Geef aan hoe je je op dit moment voelt op een schaal van 1-10.</p>
            </div>
            <div className="space-y-8">
              {Object.keys(baseline).map(key => (
                <div key={key} className="group">
                  <div className="flex justify-between items-end mb-3">
                    <label className="capitalize font-bold text-stone-800 text-lg">{key === 'movement' ? 'Beweging' : key === 'nutrition' ? 'Voeding' : key === 'energy' ? 'Energie' : key === 'sleep' ? 'Slaap' : 'Stress'}</label>
                    <div className="bg-teal-100 text-teal-700 px-3 py-1 rounded-lg font-black text-sm">
                      {baseline[key as keyof UserBaseline]}/10
                    </div>
                  </div>
                  <input
                    type="range" min="1" max="10"
                    value={baseline[key as keyof UserBaseline]}
                    onChange={(e) => setBaseline({ ...baseline, [key]: parseInt(e.target.value) })}
                    className="w-full h-2.5 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-500 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Persoonlijke instellingen</h2>
              <p className="text-stone-500">Bijna klaar! We passen het programma aan op jouw situatie.</p>
            </div>
            <div 
              onClick={() => setMobility(!mobility)}
              className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 flex items-start gap-5 ${
                mobility ? 'bg-teal-50 border-teal-600 shadow-md' : 'bg-white border-stone-100 hover:border-stone-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-all ${
                mobility ? 'bg-teal-600 text-white' : 'bg-stone-100 text-stone-400'
              }`}>
                ♿
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <p className={`font-bold text-lg ${mobility ? 'text-teal-900' : 'text-stone-800'}`}>Beperkte mobiliteit</p>
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    mobility ? 'bg-teal-600 border-teal-600 text-white' : 'border-stone-200'
                  }`}>
                    {mobility && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed">Pas mijn oefeningen en dagkaarten aan op mijn fysieke mogelijkheden.</p>
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex gap-3 italic text-sm text-orange-800">
              <span>💡</span>
              <p>Wist je dat 40% van onze deelnemers aangeeft na de eerste week al meer rust te ervaren?</p>
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-between pt-8 border-t border-stone-50">
          <button
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-stone-400 hover:text-stone-600 transition-colors ${step === 1 ? 'invisible' : ''}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            Vorige
          </button>
          <button
            onClick={handleNext}
            className="group relative bg-stone-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-stone-800 transition-all hover:shadow-xl active:scale-95 flex items-center gap-2"
          >
            <span>{step === 3 ? 'Start Programma' : 'Volgende'}</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
