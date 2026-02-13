
import React from 'react';
import { Link } from 'react-router-dom';
import { MarketingChat } from '../../components/features/marketing';

const MarketingHome: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-stone-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 lg:pt-40 lg:pb-32 bg-stone-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold mb-6">Start jouw transformatie</span>
            <h1 className="text-5xl lg:text-7xl font-bold text-stone-900 leading-[1.1] mb-8">
              Herontdek je rust. <br />
              <span className="text-teal-600">In 8 weken.</span>
            </h1>
            <p className="text-xl text-stone-600 mb-10 max-w-lg leading-relaxed">
              Een persoonlijke reis naar meer energie en minder stress. FLO8 combineert mindfulness, 
              voeding en coaching in één krachtige ervaring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/prijzen" className="bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-teal-700 transition-all text-center shadow-lg shadow-teal-600/20">
                Bekijk Pakketten
              </Link>
              <Link to="/contact" className="bg-white border border-stone-200 text-stone-800 px-8 py-4 rounded-xl text-lg font-bold hover:border-stone-400 transition-all text-center">
                Gratis Adviesgesprek
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-8 border-t border-stone-200">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                ))}
              </div>
              <p className="text-sm text-stone-500 font-medium">Al <strong>150+ mensen</strong> gingen je voor deze maand.</p>
            </div>
          </div>
          
          <div className="relative">
            <MarketingChat />
            <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </section>

      {/* App Capabilities Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 italic">Jouw complete coach, in je broekzak.</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">Ontdek hoe FLO8 technologie combineert met menselijke expertise.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="group">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Dagelijkse Focuskaarten</h3>
              <p className="text-stone-600 leading-relaxed">Geen overweldigende lijsten, maar één simpele actie per dag die je helpt groeien op het gebied van slaap, voeding of beweging.</p>
            </div>

            <div className="group">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🥗</div>
              <h3 className="text-2xl font-bold mb-4">Voedingsplan op Maat</h3>
              <p className="text-stone-600 leading-relaxed">Toegang tot een uitgebreide bibliotheek met snelle, gezonde recepten die echt lekker zijn en je energielevel stabiel houden.</p>
            </div>

            <div className="group">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🧘</div>
              <h3 className="text-2xl font-bold mb-4">Zachte Beweging</h3>
              <p className="text-stone-600 leading-relaxed">Oefeningen voor elk niveau, inclusief speciale opties voor mensen met beperkte mobiliteit. Focus op herstel en kracht.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Focus Section */}
      <section className="py-24 px-6 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 italic">Menselijk contact maakt het verschil.</h2>
            <p className="text-xl text-stone-400 mb-8 leading-relaxed">
              Bij FLO8 geloven we niet alleen in apps, maar in echte connectie. Daarom bevat elk pakket persoonlijke 1-op-1 sessies met onze experts.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex-shrink-0 flex items-center justify-center text-xs">✓</div>
                <div>
                  <h4 className="font-bold text-lg">1-op-1 Video Coaching</h4>
                  <p className="text-stone-400">Boek direct een sessie van 30 of 60 minuten met jouw vaste coach.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex-shrink-0 flex items-center justify-center text-xs">✓</div>
                <div>
                  <h4 className="font-bold text-lg">24/7 AI Lifestyle Expert</h4>
                  <p className="text-stone-400">Exclusief in het 8-weken plan: een intelligente assistent die al je vragen direct beantwoordt, op elk moment.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-stone-800 p-8 rounded-3xl border border-stone-700 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <img className="w-16 h-16 rounded-full border-2 border-teal-500" src="https://i.pravatar.cc/100?u=coach" alt="Coach" />
              <div>
                <p className="font-bold text-xl">Coach Sarah</p>
                <p className="text-teal-400">Leefstijl & Mindfulness Expert</p>
              </div>
            </div>
            <p className="italic text-stone-300 mb-8">
              "In onze 1-op-1 sessies kijken we dieper naar jouw patronen. Waarom lukt het soms niet? Samen bouwen we een fundament dat wél blijft staan."
            </p>
            <Link to="/contact" className="block text-center bg-white text-stone-900 py-4 rounded-xl font-bold hover:bg-stone-200 transition-all">
              Praat met een coach
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl lg:text-6xl font-bold mb-8">Klaar voor de eerste stap?</h2>
        <p className="text-xl text-stone-600 mb-12 max-w-xl mx-auto">Word onderdeel van FLO8 en kies voor een leven met meer flow.</p>
        <Link to="/prijzen" className="inline-block bg-teal-600 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/30">
          Bekijk onze programma's
        </Link>
      </section>
    </div>
  );
};

export default MarketingHome;
