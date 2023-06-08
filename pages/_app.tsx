import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/utils/store";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.scss";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  console.log("session:", session);
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Provider store={store}>
        <NextNProgress
          color="black"
          height={5}
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </SessionProvider>
  );
}
