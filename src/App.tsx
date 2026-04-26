import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { supabase } from './lib/supabase';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChildHome from './pages/ChildHome';
import ChildSettings from './pages/ChildSettings';
import RoutineDetail from './pages/RoutineDetail';
import ParentSettings from './pages/ParentSettings';
import Statistics from './pages/Statistics';
import Points from './pages/Points';
import BottomNav from './components/BottomNav';
import ResetPassword from './pages/ResetPassword';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();
  const hideBottomNav = ['/', '/signup', '/reset-password', '/privacy', '/terms'].includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/home" element={<ProtectedRoute><ChildHome /></ProtectedRoute>} />
        <Route path="/routine/:type" element={<ProtectedRoute><RoutineDetail /></ProtectedRoute>} />
        <Route path="/points" element={<ProtectedRoute><Points /></ProtectedRoute>} />
        <Route path="/stats" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><ParentSettings /></ProtectedRoute>} />
        <Route path="/child-settings" element={<ProtectedRoute><ChildSettings /></ProtectedRoute>} />
        <Route path="/parent-settings" element={<Navigate to="/settings" replace />} />
        <Route path="/statistics" element={<Navigate to="/stats" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideBottomNav && <BottomNav />}
    </>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    // localStorage에서 초기 세션 즉시 확인
    supabase.auth.getSession().then(({ data }) => {
      setSessionActive(!!data.session);
      setChecking(false);
    });

    // 토큰 갱신·로그아웃 등 인증 상태 변화 실시간 반영
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionActive(!!session);
      setChecking(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (checking) return null;
  if (!sessionActive) return <Navigate to="/" replace state={{ from: location.pathname }} />;
  return children;
}

export default App;
