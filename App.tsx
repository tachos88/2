
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { ErrorBoundary, Toast } from './components/ui';
import { User } from './types';
import { UserRepository } from './repositories/UserRepository';

// Pages
import Landing from './pages/Landing';
import PricingPage from './pages/Marketing/Pricing';
import ContactPage from './pages/Marketing/Contact';
import AppLayout from './pages/App/AppLayout';
import AppDashboard from './pages/App/Dashboard';
import AppLogin from './pages/App/Login';
import ChatPage from './pages/App/Chat';
import DailyCardDetail from './pages/App/DailyCardDetail';
import KnowledgeList from './pages/App/Knowledge';
import RecipeList from './pages/App/Recipes';
import ExerciseList from './pages/App/Exercises';
import Settings from './pages/App/Settings';
import ForgotPassword from './pages/App/ForgotPassword';
import ChangePassword from './pages/App/ChangePassword';

const Navbar: React.FC<{ user: User | null; onLogout: () => void }> = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isApp = location.pathname.startsWith('/app');
  const isMarketing = !isApp;
  const navLink = (to: string, label: string) => {
    const active = location.pathname === to;
    return (
      <Link to={to} className={`font-medium transition-colors ${active ? 'text-teal-600 dark:text-teal-400' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'}`}>
        {label}
      </Link>
    );
  };

  const handleLogout = () => {
    onLogout();
    navigate(isApp ? '/app/login' : '/');
  };

  return (
    <nav className={`sticky top-0 z-40 ${isMarketing ? 'bg-indigo-950/80 backdrop-blur-md' : 'bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-700'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className={`text-2xl font-bold tracking-tight italic ${isMarketing ? 'text-white' : 'text-stone-800 dark:text-stone-100'}`}
        >
          FLO<span className={isMarketing ? 'text-cyan-400 not-italic' : 'text-teal-600 dark:text-teal-400 not-italic'}>8</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {!isApp ? (
            <>
              <Link to="/" className={isMarketing ? 'text-white/90 hover:text-white transition-colors' : 'text-stone-600 hover:text-stone-900 transition-colors'}>Home</Link>
              <Link to="/prijzen" className={isMarketing ? 'text-white/90 hover:text-white transition-colors' : 'text-stone-600 hover:text-stone-900 transition-colors'}>Prijzen</Link>
              <Link to="/contact" className={isMarketing ? 'text-white/90 hover:text-white transition-colors' : 'text-stone-600 hover:text-stone-900 transition-colors'}>Contact</Link>
            </>
          ) : (
            <>
              {navLink('/app', 'Dashboard')}
              {navLink('/app/chat', 'Coach')}
              {navLink('/app/recepten', 'Recepten')}
              {navLink('/app/oefeningen', 'Oefeningen')}
              {navLink('/app/kennis', 'Kennis')}
              {navLink('/app/instellingen', 'Instellingen')}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/app"
                className={isMarketing ? 'bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/20 border border-white/20' : 'bg-stone-800 dark:bg-stone-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-700 dark:hover:bg-stone-600'}
              >
                Mijn FLO8
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className={isMarketing ? 'text-white/70 hover:text-white text-sm font-medium' : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 text-sm font-medium'}
              >
                Uitloggen
              </button>
            </>
          ) : (
            <>
              <Link
                to="/app/login"
                className={isMarketing ? 'text-white/90 hover:text-white text-sm font-medium' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 text-sm font-medium'}
              >
                Log in
              </Link>
              <Link
                to="/prijzen"
                className={isMarketing ? 'inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-95 shadow-lg shadow-purple-500/25' : 'bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700'}
              >
                Start gratis
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const ProtectedRoute: React.FC<{ user: User | null, children: React.ReactNode }> = ({ user, children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/app/login');
  }, [user, navigate]);
  return user ? <>{children}</> : null;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await UserRepository.getCurrentUser();
      if (res.success) setUser(res.data);
      setLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const theme = user?.theme ?? 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [user?.theme]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100">
          <Navbar user={user} onLogout={() => setUser(null)} />
          <main className="flex-grow">
            <Routes>
              {/* Landing at / */}
              <Route path="/" element={<Landing />} />
              <Route path="/prijzen" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* App at /app */}
              <Route path="/app" element={<AppLayout />}>
                <Route index element={
                  <ProtectedRoute user={user}>
                    <AppDashboard user={user!} />
                  </ProtectedRoute>
                } />
                <Route path="login" element={<AppLogin onLogin={setUser} />} />
                <Route path="chat" element={
                  <ProtectedRoute user={user}>
                    <ChatPage />
                  </ProtectedRoute>
                } />
                <Route path="kennis" element={
                  <ProtectedRoute user={user}>
                    <KnowledgeList />
                  </ProtectedRoute>
                } />
                <Route path="recepten" element={
                  <ProtectedRoute user={user}>
                    <RecipeList />
                  </ProtectedRoute>
                } />
                <Route path="oefeningen" element={
                  <ProtectedRoute user={user}>
                    <ExerciseList />
                  </ProtectedRoute>
                } />
                <Route path="card/:id" element={
                  <ProtectedRoute user={user}>
                    <DailyCardDetail user={user!} />
                  </ProtectedRoute>
                } />
                <Route path="instellingen" element={
                  <ProtectedRoute user={user}>
                    <Settings user={user!} onUserUpdate={setUser} />
                  </ProtectedRoute>
                } />
                <Route path="wachtwoord-wijzigen" element={
                  <ProtectedRoute user={user}>
                    <ChangePassword />
                  </ProtectedRoute>
                } />
                <Route path="wachtwoord-vergeten" element={<ForgotPassword />} />
                <Route path="*" element={
                  <ProtectedRoute user={user}>
                    <div className="p-20 text-center">Coming Soon</div>
                  </ProtectedRoute>
                } />
              </Route>
            </Routes>
          </main>
          <Toast />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
