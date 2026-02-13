
import React from 'react';
import { Link } from 'react-router-dom';
import { MarketingChat } from '../../components/features/marketing';

const MarketingHome: React.FC = () => {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-teal-900">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 lg:pt-32 lg:pb-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/5 text-white text-sm font-semibold mb-8">
              <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              Geen gedoe — gewoon starten
            </span>
            <h1 className="font-hero text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
              Herontdek je rust.{' '}
              <span className="block">In 8 weken.</span>
            </h1>
            <p className="text-lg lg:text-xl text-stone-300 max-w-lg leading-relaxed mb-10">
              Een persoonlijke reis naar meer energie en minder stress. FLO8 combineert mindfulness,
              voeding en coaching in één krachtige ervaring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                to="/prijzen"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:opacity-95 transition-all shadow-lg shadow-cyan-500/25"
              >
                Bekijk pakketten
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              <Link to="/app/login" className="text-stone-400 hover:text-white text-sm font-medium transition-colors">
                Al een account?
              </Link>
            </div>
          </div>

          {/* Right column – featured card */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-2xl">
                  🧘
                </div>
                <div>
                  <h2 className="font-hero text-xl lg:text-2xl font-bold text-white">Ontmoet je coach</h2>
                  <p className="text-stone-400 text-sm">Persoonlijk & AI</p>
                </div>
              </div>
              <p className="text-stone-400 text-sm lg:text-base mb-6 leading-relaxed">
                Je vaste begeleider voor rust en energie. Persoonlijke sessies en een AI-assistent die
                meedenkt over voeding, beweging en mindset.
              </p>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-stone-900/50">
                <MarketingChat variant="dark" />
              </div>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
              >
                Bekijk hoe het werkt
                <span className="text-lg">▷</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 text-center">
            <p className="font-hero text-3xl lg:text-4xl font-bold text-white">150+</p>
            <p className="text-stone-400 text-sm font-medium mt-1">DEELNEMERS DEZE MAAND</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 text-center">
            <p className="font-hero text-3xl lg:text-4xl font-bold text-white">8</p>
            <p className="text-stone-400 text-sm font-medium mt-1">WEKEN PROGRAMMA</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 text-center">
            <p className="font-hero text-3xl lg:text-4xl font-bold text-white">24/7</p>
            <p className="text-stone-400 text-sm font-medium mt-1">AI-COACH BESCHIKBAAR</p>
          </div>
        </div>
      </section>

      {/* Capabilities – compact dark section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-hero text-2xl lg:text-4xl font-bold text-white text-center mb-4">
            Jouw complete coach, in je broekzak
          </h2>
          <p className="text-stone-400 text-center max-w-2xl mx-auto mb-16">
            Ontdek hoe FLO8 technologie combineert met menselijke expertise.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-white mb-2">Dagelijkse focuskaarten</h3>
              <p className="text-stone-400 text-sm leading-relaxed">Eén duidelijke actie per dag voor slaap, voeding of beweging.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl mb-4">🥗</div>
              <h3 className="text-lg font-bold text-white mb-2">Voedingsplan op maat</h3>
              <p className="text-stone-400 text-sm leading-relaxed">Recepten die lekker zijn en je energie stabiel houden.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl mb-4">🧘</div>
              <h3 className="text-lg font-bold text-white mb-2">Zachte beweging</h3>
              <p className="text-stone-400 text-sm leading-relaxed">Oefeningen voor elk niveau, focus op herstel en kracht.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching + CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-hero text-3xl lg:text-5xl font-bold text-white mb-6">
            Klaar voor de eerste stap?
          </h2>
          <p className="text-stone-400 text-lg mb-10 max-w-xl mx-auto">
            Word onderdeel van FLO8 en kies voor een leven met meer flow.
          </p>
          <Link
            to="/prijzen"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:opacity-95 transition-all shadow-lg shadow-purple-500/25"
          >
            Bekijk onze programma&apos;s
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MarketingHome;
