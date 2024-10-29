import Layout from '@/layout/default';
import SmoothScrolling from '@/layout/lenis';
import '@/styles/globals.css';
import { AppProvider } from '@/utils/contexts';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  return (
    <>
      {pathname?.includes('studio') ? (
        <Component {...pageProps} />
      ) : (
        <AppProvider>
          <Layout>
            <SmoothScrolling>
              <Component {...pageProps} />
            </SmoothScrolling>
          </Layout>
        </AppProvider>
      )}
    </>
  );
}
