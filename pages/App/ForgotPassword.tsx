import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-stone-900 px-6 py-12">
      <div className="w-full max-w-[400px] bg-stone-800/90 rounded-2xl border border-stone-700 shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Wachtwoord vergeten?</h1>
        <p className="text-stone-400 text-sm mb-6">
          Vul je e-mailadres in. Als dit bij ons bekend is, sturen we je een link om je wachtwoord opnieuw in te stellen.
        </p>

        {sent ? (
          <div className="space-y-4">
            <div className="p-4 bg-teal-900/40 border border-teal-700 rounded-xl text-teal-200 text-sm">
              <strong>E-mail verzonden.</strong> Controleer je inbox (en je spambak). Klik op de link in de e-mail om een nieuw wachtwoord te kiezen.
            </div>
            <Link
              to="/app/login"
              className="block w-full text-center bg-stone-700 text-white py-3 rounded-xl font-medium hover:bg-stone-600 transition-colors"
            >
              Terug naar inloggen
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="forgot-email" className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                E-mailadres
              </label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl bg-stone-700/80 border border-stone-600 text-white placeholder:text-stone-500 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none"
                placeholder="jouw@voorbeeld.nl"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 text-stone-900 py-3.5 rounded-xl font-bold hover:bg-teal-400 disabled:opacity-60 transition-all"
            >
              {loading ? 'Versturen...' : 'Verstuur link'}
            </button>
            <Link
              to="/app/login"
              className="block text-center text-stone-400 hover:text-white text-sm mt-4"
            >
              ← Terug naar inloggen
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
