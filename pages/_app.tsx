import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayOut from "../components/Layout";

interface user {
  userObj: any;
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <LayOut>
        <Component {...pageProps} />
      </LayOut>
    </>
  );
}

export default MyApp;
