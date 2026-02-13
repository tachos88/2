
import React, { useEffect, useState } from 'react';
import { User, DailyCard } from '../../types';
import { ContentRepository } from '../../repositories/ContentRepository';
import { OnboardingWizard } from '../../components/features/onboarding';
import { UserRepository } from '../../repositories/UserRepository';
import { Link } from 'react-router-dom';

const Dashboard: React.FC<{ user: User }> = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [cards, setCards] = useState<DailyCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user.onboardingComplete) {
      fetchContent();
    }
  }, [user.onboardingComplete]);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    const res = await ContentRepository.getDailyCards();
    if (res.success) setCards(res.data);
    else setError('Kon content niet laden.');
    setLoading(false);
  };

  const handleOnboardingComplete = async (updates: Partial<User>) => {
    const res = await UserRepository.updateProfile(user.id, updates);
    if (res.success) {
      setUser({ ...user, ...updates });
    }
  };

  if (!user.onboardingComplete) {
    return (
      <div className="p-6 bg-stone-100 min-h-screen">
        <OnboardingWizard user={user} onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pb-32">
      <div className="bg-white border-b border-stone-200 pt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Hallo, {user.name.split(' ')[0]}</h1>
            <p className="text-stone-500">Vandaag is een mooie dag voor verandering.</p>
          </div>
          <div className="text-right">
            <span className="text-4xl">🔥</span>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-tighter">Streak: {user.streak} dagen</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* Quick Actions */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/app/chat" className="bg-teal-50 p-6 rounded-3xl border border-teal-100 flex flex-col items-center gap-3 hover:bg-teal-100 transition-colors">
              <span className="text-3xl">💬</span>
              <span className="font-bold text-teal-800">Coach</span>
            </Link>
            <Link to="/app/recepten" className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex flex-col items-center gap-3 hover:bg-orange-100 transition-colors">
              <span className="text-3xl">🥗</span>
              <span className="font-bold text-orange-800">Recepten</span>
            </Link>
            <Link to="/app/oefeningen" className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex flex-col items-center gap-3 hover:bg-blue-100 transition-colors">
              <span className="text-3xl">🧘</span>
              <span className="font-bold text-blue-800">Oefeningen</span>
            </Link>
            <Link to="/app/kennis" className="bg-purple-50 p-6 rounded-3xl border border-purple-100 flex flex-col items-center gap-3 hover:bg-purple-100 transition-colors">
              <span className="text-3xl">📖</span>
              <span className="font-bold text-purple-800">Kennis</span>
            </Link>
          </div>
        </section>

        {/* Daily Card */}
        <section>
          <h2 className="text-xl font-bold mb-6">Focus van Vandaag</h2>
          <div className="grid md:grid-cols-1 gap-6">
            {loading ? (
              <div className="h-64 bg-stone-200 animate-pulse rounded-3xl"></div>
            ) : (
              cards.slice(0, 1).map(card => (
                <div key={card.id} className="bg-white p-10 rounded-3xl border border-stone-200 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 -mr-10 -mt-10 rounded-full"></div>
                  <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full mb-6 uppercase tracking-widest">{card.category}</span>
                  <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                  <p className="text-stone-600 text-lg mb-10 leading-relaxed max-w-2xl">{card.body}</p>
                  
                  <Link to={`/app/card/${card.id}`} className="bg-stone-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-stone-700 inline-block">
                    Bekijk Kaart
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
