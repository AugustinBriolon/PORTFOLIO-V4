import { usePathname } from 'next/navigation';
import type { AppProps } from 'next/app';
import Layout from '@/layout/default';
import SmoothScrolling from '@/layout/lenis';
import { AppProvider } from '@/utils/contexts';
import '@/styles/globals.css';
import PageTransition from '@/components/PageTransitions';
import { AnimatePresence } from 'framer-motion';
import { fetchProjects } from '@/services/projects.sevices';
import { TypeProject } from '@/data/types';

interface CustomAppProps extends AppProps {
  globalProps: {
    projects: TypeProject[];
  };
}

function App({ Component, pageProps, globalProps }: CustomAppProps) {
  const pathname = usePathname();

  return (
    <>
      {pathname?.includes('studio') ? (
        <Component {...pageProps} />
      ) : (
        <AppProvider>
          <Layout projects={globalProps.projects}>
            <SmoothScrolling>
              <AnimatePresence
                mode='wait'
                onExitComplete={() => window.scrollTo(0, 0)}
              >
                <PageTransition key={pathname}>
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

App.getInitialProps = async () => {
  const projects = await fetchProjects();

  return {
    globalProps: {
      projects,
    },
  };
};

export default App;
