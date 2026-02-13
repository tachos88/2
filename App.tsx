
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

const Navbar: React.FC<{ user: User | null }> = ({ user }) => {
  const location = useLocation();
  const isApp = location.pathname.startsWith('/app');
  
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-stone-800 tracking-tight italic">FLO<span className="text-teal-600 not-italic">8</span></Link>
        
        <div className="hidden md:flex items-center gap-8">
          {!isApp ? (
            <>
              <Link to="/" className="text-stone-600 hover:text-stone-900 transition-colors">Home</Link>
              <Link to="/prijzen" className="text-stone-600 hover:text-stone-900 transition-colors">Prijzen</Link>
              <Link to="/contact" className="text-stone-600 hover:text-stone-900 transition-colors">Contact</Link>
            </>
          ) : (
            <>
              <Link to="/app" className={`font-medium transition-colors ${location.pathname === '/app' ? 'text-teal-600' : 'text-stone-600 hover:text-stone-900'}`}>Dashboard</Link>
              <Link to="/app/chat" className={`font-medium transition-colors ${location.pathname === '/app/chat' ? 'text-teal-600' : 'text-stone-600 hover:text-stone-900'}`}>Coach</Link>
              <Link to="/app/kennis" className={`font-medium transition-colors ${location.pathname === '/app/kennis' ? 'text-teal-600' : 'text-stone-600 hover:text-stone-900'}`}>Kennis</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/app" className="bg-stone-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-700">Mijn FLO8</Link>
          ) : (
            <Link to="/app/login" className="text-stone-600 hover:text-stone-900 font-medium">Inloggen</Link>
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
        <div className="min-h-screen flex flex-col bg-stone-50">
          <Navbar user={user} />
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
