import React from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

function NavBar({ links }) {
  return (
    <nav>
      <ul className="flex flex-col space-y-4">
        {links.map(({ to, label, icon, isActive }) => (
          <Link to={to} key={label}>
            <li
              className={`${
                isActive
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-gray-100 hover:text-primary"
              } font-regular px-12 py-3 font-normal rounded-full transition-all w-full flex items-center justify-center lg:justify-start space-x-4`}
            >
              {icon && <Icon type={icon} />}
              <div>{label}</div>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
