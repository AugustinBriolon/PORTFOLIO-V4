import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TypeProject } from "@/data/types";

const Layout = ({
  projects,
  playgrounds,
  children,
}: {
  projects: TypeProject[];
  playgrounds: TypeProject[];
  children: ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <>
      <div className="max-w-screen-3xl mx-auto overflow-hidden">
        <Header playgrounds={playgrounds} projects={projects} />
        {children}
        {pathname !== "/" && <Footer />}
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default Layout;
