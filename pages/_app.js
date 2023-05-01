// pages/_app.js
import { Fragment } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { GOOGLE_GA_ID } from "../config";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

import "../static/css/styles.css";
import "../node_modules/nprogress/nprogress.css";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      {publicRuntimeConfig.PRODUCTION && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_GA_ID}`}
          />

          <Script id="ga-analytics">{`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', '${GOOGLE_GA_ID}')`}</Script>
        </>
      )}

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
