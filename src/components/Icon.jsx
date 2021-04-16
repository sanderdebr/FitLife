import React from "react";
import { ImPause, ImPlay2 } from "react-icons/im";
import { ICON_PROPS } from "../constants";
import { RiDashboard3Line, RiUser3Line } from "react-icons/ri";
import { IoMdFitness, IoIosRemoveCircleOutline } from "react-icons/io";
import {
  AiOutlineLoading3Quarters,
  AiOutlineCheckCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const icons = {
  loading: AiOutlineLoading3Quarters,
  check: AiOutlineCheckCircle,
  play: ImPlay2,
  pause: ImPause,
  dashboard: RiDashboard3Line,
  fitness: IoMdFitness,
  user: RiUser3Line,
  remove: IoIosRemoveCircleOutline,
  plus: AiOutlinePlusCircle,
  menu: HiOutlineMenuAlt3,
};

function Icon({ type }) {
  const IconComponent = icons[type];

  return (
    <IconComponent
      className={type === "loading" && "animate-spin"}
      {...ICON_PROPS}
    />
  );
}

export default Icon;
