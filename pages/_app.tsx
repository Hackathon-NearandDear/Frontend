import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";

type PageComponentProps = {
  title: string;
};

function MyApp({ Component, pageProps }: AppProps) {
  const PageComponent = Component as React.ComponentType<PageComponentProps>;
  return (
    <Layout
      title={pageProps.title || "Near and Dear"}
    >
      <PageComponent {...pageProps} />
    </Layout>
  );
}

export default MyApp;
