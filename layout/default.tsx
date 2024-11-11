import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <div className='max-w-screen-2xl mx-auto overflow-hidden'>
        <Header />
        {children}
        {pathname !== '/' && <Footer />}
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default Layout;
