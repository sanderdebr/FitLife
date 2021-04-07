import React from "react";
import { ImPause, ImPlay2 } from "react-icons/im";
import { iconProps } from "../constants";
import { RiDashboard3Line, RiUser3Line } from "react-icons/ri";
import { IoMdFitness } from "react-icons/io";
import {
  AiOutlineLoading3Quarters,
  AiOutlineCheckCircle,
} from "react-icons/ai";

const icons = {
  loading: AiOutlineLoading3Quarters,
  check: AiOutlineCheckCircle,
  play: ImPlay2,
  pause: ImPause,
  dashboard: RiDashboard3Line,
  fitness: IoMdFitness,
  user: RiUser3Line,
};

function Icon({ type }) {
  const IconComponent = icons[type];

  return (
    <IconComponent
      className={type === "loading" && "animate-spin"}
      {...iconProps}
    />
  );
}

export default Icon;
