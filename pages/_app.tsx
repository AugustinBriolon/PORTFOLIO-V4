import { usePathname } from 'next/navigation';
import type { AppProps } from 'next/app';
import Layout from '@/layout/default';
import SmoothScrolling from '@/layout/lenis';
import { AppProvider } from '@/utils/contexts';
import '@/styles/globals.css';
import PageTransition from '@/components/PageTransitions';
import { AnimatePresence } from 'framer-motion';

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
              <AnimatePresence
                mode='wait'
                onExitComplete={() => window.scrollTo(0, 0)}
              >
                <PageTransition>
                  <Component {...pageProps} />
                </PageTransition>
              </AnimatePresence>
            </SmoothScrolling>
          </Layout>
        </AppProvider>
      )}
    </>
  );
}
