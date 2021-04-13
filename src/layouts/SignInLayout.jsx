import React from "react";
import Logo from "../components/Logo";

function SignInLayout({ children }) {
  return (
    <div className="lg:flex w-screen h-screen">
      <section className="lg:w-2/4 lg:p-12 lg:p-6 p-20 bg-gray-100 bg-signin-image bg-cover bg-center">
        <Logo />
      </section>
      <section className="lg:w-2/4 flex items-center justify-center">
        {children}
      </section>
    </div>
  );
}

export default SignInLayout;
