import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/utils/store";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import createEmotionCache from "@/utils/createEmotionCache";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.scss";
import React from "react";
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: MyAppProps): JSX.Element {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Provider store={store}>
          <NextNProgress
            color="black"
            height={5}
            options={{ showSpinner: false }}
          />
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Component {...pageProps} />
            <ToastContainer />
          </ThemeProvider>
        </Provider>
      </SessionProvider>
    </CacheProvider>
  );
}
