
import React, { useEffect, useState } from 'react';
import { AppError } from '../../services/errorService';

export const Toast: React.FC = () => {
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const handleError = (e: any) => {
      setError(e.detail);
      setTimeout(() => setError(null), 5000);
    };

    window.addEventListener('app-error', handleError);
    return () => window.removeEventListener('app-error', handleError);
  }, []);

  if (!error) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
      <div className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-sm">
        <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="font-bold text-sm">Foutmelding</p>
          <p className="text-sm opacity-90">{error.userMessage}</p>
        </div>
        <button onClick={() => setError(null)} className="ml-2 hover:opacity-70">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
