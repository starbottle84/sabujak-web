import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import ChildHome from './pages/ChildHome';
import RoutineDetail from './pages/RoutineDetail';
import ParentSettings from './pages/ParentSettings';
import Statistics from './pages/Statistics';
import Points from './pages/Points';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();
  const hideBottomNav = location.pathname === '/';

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ChildHome />} />
        <Route path="/routine/:type" element={<RoutineDetail />} />
        <Route path="/points" element={<Points />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/settings" element={<ParentSettings />} />
        <Route path="/parent-settings" element={<Navigate to="/settings" replace />} />
        <Route path="/statistics" element={<Navigate to="/stats" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideBottomNav && <BottomNav />}
    </>
  );
}

export default App;
