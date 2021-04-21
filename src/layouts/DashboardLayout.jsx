import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import { NAV_LINKS } from "../constants";
import { useAuth } from "../contexts/auth/AuthContext";
import { getActiveNavLink } from "../helpers";
import Button from "../components/Button";

function DashboardLayout({ children }) {
  const { signOut } = useAuth();
  const { pathname } = useLocation();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMenu = () => {
    setShowMobileMenu((showMobileMenu) => !showMobileMenu);
  };

  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  return (
    <div className="lg:flex w-screen min-h-screen h-full bg-gray-100">
      <aside
        id="desktop-menu"
        className="hidden lg:flex bg-white px-4 2xl:px-12 py-20 flex-col items-center justify-between"
      >
        <div className="space-y-20 flex flex-col items-center">
          <Logo />
          <NavBar links={getActiveNavLink(NAV_LINKS, pathname)} />
        </div>
        <div className="text-primary cursor-pointer" onClick={signOut}>
          Sign Out
        </div>
      </aside>
      {showMobileMenu && (
        <div
          id="mobile-menu lg:hidden"
          className="fixed bg-white z-10 w-screen h-screen flex-col items-center p-20 justify-center text-center space-y-20"
        >
          <NavBar links={getActiveNavLink(NAV_LINKS, pathname)} />
          <div className="text-primary cursor-pointer" onClick={signOut}>
            Sign Out
          </div>
        </div>
      )}
      <div className="lg:hidden z-20 fixed w-full px-5 py-2 bg-white flex items-center justify-between">
        <Logo />
        <div>
          <Button
            value="Menu"
            variant="secondary"
            icon="menu"
            action={handleMenu}
          />
        </div>
      </div>
      <section className="bg-gray-100 w-full px-5 lg:px-20 py-10 pt-24 lg:pt-10 flex items-start justify-start">
        {children}
      </section>
    </div>
  );
}

export default DashboardLayout;
