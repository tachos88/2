import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from '../../types';

interface Props {
  onLogin: (user: User) => void;
}

const AppLogin: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await UserRepository.login(email, password);

    if (res.success === true) {
      onLogin(res.data);
      navigate('/app');
    } else {
      setError(res.error.message || 'Inloggen mislukt.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-stone-900">
      {/* Left: coaching promo */}
      <div className="flex-1 flex flex-col justify-center px-8 py-16 lg:py-24 lg:pl-16 lg:pr-12">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight max-w-xl">
          Sluit je aan bij duizenden die met{' '}
          <span className="text-teal-400">FLO8</span> werken aan een gezondere leefstijl.
        </h1>
        <ul className="mt-10 space-y-4 max-w-lg">
          {[
            'Persoonlijke dagelijkse focuskaarten voor slaap, voeding en beweging',
            'AI-coach die meedenkt en je op maat begeleidt',
            'Recepten en oefeningen die passen bij jouw niveau en doelen',
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3 text-stone-300">
              <span className="text-teal-400 mt-0.5 shrink-0" aria-hidden>✓</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: login card */}
      <div className="flex-shrink-0 w-full lg:w-[440px] flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[380px] bg-stone-800/90 rounded-2xl border border-stone-700 shadow-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-xl font-bold text-white mb-6">Inloggen</h2>

            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-stone-600 text-stone-400 text-sm font-medium cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Inloggen met Google (binnenkort)
            </button>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-stone-600" />
              <span className="text-stone-500 text-sm font-medium">OF</span>
              <div className="flex-1 h-px bg-stone-600" />
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-900/40 border border-red-800 text-red-200 rounded-xl text-sm" role="alert">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="login-email" className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  E-mailadres <span className="text-red-400">(verplicht)</span>
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl bg-stone-700/80 border border-stone-600 text-white placeholder:text-stone-500 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-all"
                  placeholder="jouw@voorbeeld.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Wachtwoord
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-20 rounded-xl bg-stone-700/80 border border-stone-600 text-white placeholder:text-stone-500 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-300 text-xs font-medium"
                  >
                    {showPassword ? 'Verbergen' : 'Tonen'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-stone-400 cursor-pointer">
                  <input type="checkbox" className="rounded border-stone-600 bg-stone-700 text-teal-500 focus:ring-teal-500" />
                  Onthoud mij
                </label>
                <Link to="/app/wachtwoord-vergeten" className="text-teal-400 hover:text-teal-300 font-medium">
                  Wachtwoord vergeten?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 text-stone-900 py-3.5 rounded-xl font-bold hover:bg-teal-400 active:scale-[0.99] transition-all disabled:opacity-60 disabled:pointer-events-none"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-stone-900/30 border-t-stone-900 rounded-full animate-spin" />
                    Bezig met inloggen...
                  </span>
                ) : (
                  'Inloggen'
                )}
              </button>
            </form>

            <p className="mt-6 text-stone-400 text-sm text-center">
              Door in te loggen ga je akkoord met onze{' '}
              <Link to="/contact" className="text-teal-400 hover:underline">Algemene Voorwaarden</Link> en{' '}
              <Link to="/contact" className="text-teal-400 hover:underline">Privacy</Link>.
            </p>

            <p className="mt-4 pt-4 border-t border-stone-700 text-stone-400 text-sm text-center">
              Nog geen FLO8-account?{' '}
              <Link to="/prijzen" className="text-teal-400 font-semibold hover:underline">
                Bekijk programma's
              </Link>
            </p>
          </div>

          <div className="px-6 py-3 bg-stone-800 border-t border-stone-700 text-center">
            <p className="text-xs text-stone-500">
              Demo: <code className="text-stone-400">test@flo8.nl</code> / <code className="text-stone-400">wachtwoord123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLogin;
