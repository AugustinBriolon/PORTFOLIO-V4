import PageTransition from "@/components/PageTransitions";
import { TypeProject } from "@/data/types";
import Layout from "@/layout/default";
import SmoothScrolling from "@/layout/lenis";
import { fetchPlaygrounds } from "@/services/playgrounds.sevices";
import { fetchProjects } from "@/services/projects.sevices";
import "@/styles/globals.css";
import { AppProvider } from "@/utils/contexts";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";

interface CustomAppProps extends AppProps {
  globalProps: {
    projects: TypeProject[];
    playgrounds: TypeProject[];
  };
}

function App({ Component, pageProps, globalProps }: CustomAppProps) {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/studio" ? (
        <Component {...pageProps} />
      ) : (
        <AppProvider>
          <Layout playgrounds={globalProps.playgrounds} projects={globalProps.projects}>
            <SmoothScrolling>
              <PageTransition key={pathname}>
                <Component {...pageProps} />
              </PageTransition>
            </SmoothScrolling>
          </Layout>
        </AppProvider>
      )}
    </>
  );
}

App.getInitialProps = async () => {
  const projects = await fetchProjects();
  const playgrounds = await fetchPlaygrounds();

  return {
    globalProps: {
      projects,
      playgrounds,
    },
  };
};

export default App;
