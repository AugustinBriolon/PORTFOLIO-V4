import { usePathname } from 'next/navigation';
import type { AppProps } from 'next/app';
import Layout from '@/layout/default';
import SmoothScrolling from '@/layout/lenis';
import { AppProvider } from '@/utils/contexts';
import '@/styles/globals.css';
import { LayoutGroup } from 'framer-motion';

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
              <LayoutGroup>
                <Component {...pageProps} />
              </LayoutGroup>
            </SmoothScrolling>
          </Layout>
        </AppProvider>
      )}
    </>
  );
}
