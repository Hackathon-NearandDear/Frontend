import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/globals.css";

type PageComponentProps = {
  title: string;
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const PageComponent = Component as React.ComponentType<PageComponentProps>;

  // Check if the current route is the landing page
  const isLandingPage = router.pathname === "/";

  if (isLandingPage) {
    return <PageComponent {...pageProps} />;
  }

  return (
    <Layout title={pageProps.title || "Near and Dear"}>
      <PageComponent {...pageProps} />
    </Layout>
  );
}

export default MyApp;
