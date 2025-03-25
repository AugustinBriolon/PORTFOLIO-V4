import PageTransition from "@/components/PageTransitions";
import { TypeProject } from "@/data/types";
import Layout from "@/layout/default";
import SmoothScrolling from "@/layout/lenis";
import { fetchProjects } from "@/services/projects.sevices";
import "@/styles/globals.css";
import { AppProvider } from "@/utils/contexts";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";

interface CustomAppProps extends AppProps {
  globalProps: {
    projects: TypeProject[];
  };
}

function App({ Component, pageProps, globalProps }: CustomAppProps) {
  const pathname = usePathname();

  return (
    <>
      {pathname?.includes("studio") ? (
        <Component {...pageProps} />
      ) : (
        <AppProvider>
          <Layout projects={globalProps.projects}>
            <SmoothScrolling>
              <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
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
