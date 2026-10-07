import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileCtaBar from './MobileCtaBar';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}