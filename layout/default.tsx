import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='max-w-screen-2xl mx-auto overflow-hidden'>
        <Header />
        {children}
        {pathname !== '/' && <Footer />}
      </div>
    </QueryClientProvider>
  );
};

export default Layout;
