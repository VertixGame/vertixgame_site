import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Lazy loading para melhor performance
const LandingPageWithRouter = lazy(() => import('./components/LandingPageWithRouter'));
const LoginFormWithRouter = lazy(() => import('./components/LoginFormWithRouter'));

// Loading component otimizado
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-vertix-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Carregando...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LandingPageWithRouter />} />
            <Route path="/login" element={<LoginFormWithRouter />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;