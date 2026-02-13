
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from '../../types';

interface Props {
  onLogin: (user: User) => void;
}

const AppLogin: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await UserRepository.login(email);
    
    // Fix: Using an explicit if-else check on the discriminant 'success' to ensure TypeScript 
    // correctly narrows the Result union. In some environments, early returns with '!res.success' 
    // can fail to narrow the union members correctly for subsequent property access.
    if (res.success === true) {
      onLogin(res.data);
      navigate('/app');
      setLoading(false);
    } else {
      // After checking res.success === true, the compiler correctly narrows res to { success: false; error: Error }
      setError(res.error.message || 'Inloggen mislukt.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-stone-100 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-stone-200">
        <h1 className="text-3xl font-bold text-center mb-2">Welkom bij FLO8</h1>
        <p className="text-stone-500 text-center mb-10">Log in op je persoonlijke dashboard.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-100 border border-red-200 text-red-800 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">E-mailadres</label>
            <input
              type="email"
              className="w-full p-4 rounded-xl border border-stone-200 focus:ring-2 focus:ring-teal-500 transition-all outline-none"
              placeholder="naam@voorbeeld.nl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Wachtwoord</label>
            <input
              type="password"
              className="w-full p-4 rounded-xl border border-stone-200 focus:ring-2 focus:ring-teal-500 transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold hover:bg-teal-700 transition-all disabled:opacity-50 shadow-lg shadow-teal-600/20"
          >
            {loading ? 'Laden...' : 'Inloggen'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-stone-100 text-center">
          <p className="text-stone-500 text-sm">Nog geen account? <Link to="/prijzen" className="text-teal-600 font-bold">Bekijk programma's</Link></p>
        </div>
      </div>
    </div>
  );
};

export default AppLogin;
