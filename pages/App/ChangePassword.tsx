import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirmPassword) {
      setError('Het nieuwe wachtwoord en de bevestiging komen niet overeen.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Kies een wachtwoord van minimaal 8 tekens.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <div className="mb-8">
        <Link to="/app/instellingen" className="text-teal-600 dark:text-teal-400 text-sm font-medium hover:underline mb-4 inline-block">
          ← Terug naar Instellingen
        </Link>
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Wachtwoord wijzigen</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">Kies een nieuw wachtwoord voor je account.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6 shadow-sm space-y-5">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-sm">
            {error}
          </div>
        )}
        {saved && (
          <div className="p-3 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 rounded-xl text-sm">
            Wachtwoord is bijgewerkt. Je kunt nu opnieuw inloggen met je nieuwe wachtwoord.
          </div>
        )}

        <div>
          <label htmlFor="current-pw" className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
            Huidige wachtwoord
          </label>
          <div className="relative">
            <input
              id="current-pw"
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 pr-20 rounded-xl bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-teal-500/50 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowCurrent((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 text-xs"
            >
              {showCurrent ? 'Verbergen' : 'Tonen'}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="new-pw" className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
            Nieuw wachtwoord
          </label>
          <div className="relative">
            <input
              id="new-pw"
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full px-4 py-3 pr-20 rounded-xl bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-teal-500/50 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowNew((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 text-xs"
            >
              {showNew ? 'Verbergen' : 'Tonen'}
            </button>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Minimaal 8 tekens.</p>
        </div>

        <div>
          <label htmlFor="confirm-pw" className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
            Nieuw wachtwoord bevestigen
          </label>
          <input
            id="confirm-pw"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-teal-500/50 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3.5 rounded-xl font-bold hover:bg-teal-500 disabled:opacity-60 transition-all"
        >
          {loading ? 'Bezig...' : 'Wachtwoord wijzigen'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
