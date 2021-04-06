import { RiDashboard3Line, RiUser3Line } from "react-icons/ri";
import { IoMdFitness } from "react-icons/io";
import { GiStrong } from "react-icons/gi";

/*--------------------------
  Icon properties
 --------------------------- */
export const iconProps = {
  size: "20",
};

/*--------------------------
  Navbar links
 --------------------------- */
export const navLinks = [
  {
    label: "Dashboard",
    to: "/",
    icon: <RiDashboard3Line {...iconProps} />,
  },
  {
    label: "Workout",
    to: "/workout",
    icon: <GiStrong {...iconProps} />,
  },
  {
    label: "Exercises",
    to: "/exercises",
    icon: <IoMdFitness {...iconProps} />,
  },
  {
    label: "Profile",
    to: "/profile",
    icon: <RiUser3Line {...iconProps} />,
  },
];
