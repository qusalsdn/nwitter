import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppRouter from "../components/Router";

function MyApp({ Component, pageProps }: AppProps) {
  return <AppRouter />;
}

export default MyApp;
