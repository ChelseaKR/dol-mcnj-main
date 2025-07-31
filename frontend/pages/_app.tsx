import React from "react";
import type { AppProps } from "next/app";

// Styles
import "@newjersey/njwds/dist/css/styles.css";
import "../styles/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;