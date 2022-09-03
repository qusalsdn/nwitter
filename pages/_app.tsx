import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayOut from "../components/Layout";
import { useState } from "react";
import { authService } from "../src/fBase";

interface user {
  userObj: any;
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <LayOut>
        <Component {...pageProps} />
      </LayOut>
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default MyApp;
