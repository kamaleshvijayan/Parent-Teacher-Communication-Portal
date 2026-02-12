import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './navigation';

export function Root() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && <Navigation />}
      <Outlet />
    </div>
  );
}
