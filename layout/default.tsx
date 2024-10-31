import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/Header';

const Layout = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='max-w-screen-2xl mx-auto'>
        <Header />
        {children}
      </div>
    </QueryClientProvider>
  );
};

export default Layout;
