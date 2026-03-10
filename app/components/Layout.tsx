import { Outlet, useLocation } from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={`flex flex-col bg-[#f5f5f5] ${isHome ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <Header />
      <main className={`flex flex-col ${isHome ? 'flex-1 overflow-hidden' : 'flex-1'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
