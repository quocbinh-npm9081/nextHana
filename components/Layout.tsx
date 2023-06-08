import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import Router from "next/router";
import LoadScreen from "@/components/LoadScreen";

interface IProps {
  title: string | undefined;
  children?: React.ReactNode;
}

export default function Layout({ title, children }: IProps) {
  const { asPath } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setIsLoading(true);
    });
    Router.events.on("routeChangeComplete", (url) => {
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", (url) => {
      setIsLoading(false);
    });
  }, [Router]);

  return (
    <>
      <Head>
        <title>{title ? title + "- Hana" : "Hana store"}</title>
        <meta name="description" content="Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <Header />
        <main
          className={
            asPath === "/user/login" ||
            asPath === "/user/login?redirect=/user/shipping"
              ? ""
              : "md:mt-28 container m-auto mt-4 px-4"
          }
        >
          {isLoading ? <LoadScreen /> : <>{children}</>}
        </main>
        {isLoading ? "" : <Footer />}
      </div>
    </>
  );
}
