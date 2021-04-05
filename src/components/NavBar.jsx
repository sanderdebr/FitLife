import React from "react";
import { Link } from "react-router-dom";

function NavBar({ links }) {
  return (
    <nav>
      <ul className="flex flex-col space-y-4">
        {links.map(({ to, label, active }) => (
          <Link to={to}>
            <li
              className={`${
                active
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-primary hover:text-white"
              } font-regular px-12 py-3 font-normal rounded-xl transition-all w-full`}
            >
              {label}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
