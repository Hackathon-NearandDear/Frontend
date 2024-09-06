import { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import FooterBar from "./FooterBar";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="h-screen bg-orange-50 flex justify-center">
      <Head>
        <title>{title} | Near and Dear</title>
        <meta name="description" content="AI Chat Application" />
        <meta
          http-equiv="Cross-Origin-Opener-Policy"
          content="same-origin-allow-popups"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full max-w-[800px] flex flex-col h-screen">
        <Header title={title} />

        <main className="flex-grow overflow-y-auto px-4">{children}</main>
        <FooterBar />
      </div>
    </div>
  );
};

export default Layout;
