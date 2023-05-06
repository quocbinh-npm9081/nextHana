import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import CardScreen from "./CardScreen";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

interface IProps {
  title: string | undefined;
  children?: React.ReactNode;
}

export default function Layout({ title, children }: IProps) {
  const { asPath } = useRouter();
  const { data: session, status } = useSession();
  console.log("status: ", status);
  console.log("data: ", session);

  return (
    <>
      <Head>
        <title>{title ? title + "- Hana" : "Hana store"}</title>
        <meta name="description" content="Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header className="md:fixed z-50 w-full bg-white">
          <nav className="top-0 left-0 right-0 flex h-20 justify-between items-center px-4 shadow-sm">
            <Link href="/" legacyBehavior>
              <a className="text-2xl font-bold brandHana">Hana</a>
            </Link>
            <div className="flex items-center">
              <CardScreen />
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                session?.user.name
              ) : (
                <Link href="/user/login">Login</Link>
              )}
            </div>
          </nav>
        </header>
        <main
          className={
            asPath !== "/user/login"
              ? "md:mt-28 container m-auto mt-4 px-4"
              : ""
          }
        >
          {children}
        </main>
        {asPath == "/user/login" ? (
          ""
        ) : (
          <footer className="justify-center items-center flex h-10 shadow-inner">
            Footer
          </footer>
        )}
      </div>
    </>
  );
}
