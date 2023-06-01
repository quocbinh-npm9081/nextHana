import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
interface IProps {
  title: string | undefined;
  children?: React.ReactNode;
}

export default function Layout({ title, children }: IProps) {
  const { asPath } = useRouter();

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
          {children}
        </main>

        {/* <footer className="justify-center items-center flex h-10 shadow-inner">
          Footer
        </footer> */}
        <Footer />
      </div>
    </>
  );
}
