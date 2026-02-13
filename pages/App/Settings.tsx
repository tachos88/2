import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { UserRepository } from '../../repositories/UserRepository';
import { Link } from 'react-router-dom';

interface Props {
  user: User;
  onUserUpdate: (user: User) => void;
}

const Settings: React.FC<Props> = ({ user, onUserUpdate }) => {
  const [name, setName] = useState(user.name);
  const [notificationTime, setNotificationTime] = useState(user.notificationTime);
  const [theme, setTheme] = useState<User['theme']>(user.theme);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user.name);
    setNotificationTime(user.notificationTime);
    setTheme(user.theme);
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    const res = await UserRepository.updateProfile(user.id, {
      name,
      notificationTime,
      theme,
    });
    if (res.success) {
      onUserUpdate({ ...user, name, notificationTime, theme });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Instellingen</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">Beheer je profiel en voorkeuren.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <section className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-4">Profiel</h2>
          <div>
            <label htmlFor="settings-name" className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
              Naam
            </label>
            <input
              id="settings-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none"
              placeholder="Je naam"
            />
          </div>
        </section>

        <section className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-4">Notificaties</h2>
          <div>
            <label htmlFor="settings-time" className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
              Herinnering voor dagelijkse focus
            </label>
            <input
              id="settings-time"
              type="time"
              value={notificationTime}
              onChange={(e) => setNotificationTime(e.target.value)}
              className="w-full max-w-[160px] px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none"
            />
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
              Je ontvangt een herinnering op dit tijdstip (binnenkort actief).
            </p>
          </div>
        </section>

        <section className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-4">Weergave</h2>
          <div className="flex gap-4">
            <label className="flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50 dark:has-[:checked]:bg-teal-900/20 border-stone-200 dark:border-stone-600">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={() => setTheme('light')}
                className="sr-only"
              />
              <span className="text-2xl">☀️</span>
              <div>
                <span className="font-medium text-stone-800 dark:text-stone-200 block">Licht</span>
                <span className="text-xs text-stone-500 dark:text-stone-400">Standaard weergave</span>
              </div>
            </label>
            <label className="flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50 dark:has-[:checked]:bg-teal-900/20 border-stone-200 dark:border-stone-600">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={() => setTheme('dark')}
                className="sr-only"
              />
              <span className="text-2xl">🌙</span>
              <div>
                <span className="font-medium text-stone-800 dark:text-stone-200 block">Donker</span>
                <span className="text-xs text-stone-500 dark:text-stone-400">Rustig voor de ogen</span>
              </div>
            </label>
          </div>
        </section>

        <section className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-4">Account</h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm mb-4">
            Ingelogd als <strong className="text-stone-800 dark:text-stone-200">{user.email}</strong>
          </p>
          <Link
            to="/app/wachtwoord-wijzigen"
            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium text-sm hover:underline"
          >
            Wachtwoord wijzigen
            <span className="text-stone-400">→</span>
          </Link>
        </section>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-teal-500 disabled:opacity-60 transition-all"
          >
            {loading ? 'Opslaan...' : 'Opslaan'}
          </button>
          {saved && (
            <span className="text-teal-600 dark:text-teal-400 text-sm font-medium">Instellingen opgeslagen.</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Settings;
