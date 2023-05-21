import React from "react";
import MenuUserDropDown from "./MenuUserDropDown";
import CardScreen from "./CardScreen";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="md:fixed z-50 w-full bg-white">
      <nav className="top-0 left-0 right-0 flex h-20 justify-between items-center px-4 shadow-sm">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold brandHana">Hana</a>
        </Link>
        <div className="flex justify-center items-center">
          <CardScreen />
          {status === "loading" ? (
            <>loading...</>
          ) : session?.user ? (
            <MenuUserDropDown title={String(session?.user.name)} />
          ) : (
            <Link href="/user/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
