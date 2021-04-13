import React from "react";
import { useLocation } from "react-router";
import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import { NAV_LINKS } from "../constants";
import { useAuth } from "../contexts/auth/AuthContext";
import { getActiveNavLink } from "../helpers";

function DashboardLayout({ children }) {
  const { signOut } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className="flex w-screen min-h-screen h-full">
      <aside className="bg-white p-12 space-y-20 flex flex-col items-center">
        <Logo />
        <NavBar links={getActiveNavLink(NAV_LINKS, pathname)} />
        <div onClick={signOut}>Sign Out</div>
      </aside>
      <section className="bg-gray-100 w-full p-20">{children}</section>
    </div>
  );
}

export default DashboardLayout;
