import React from "react";
import { ImPause, ImPlay2 } from "react-icons/im";
import { iconProps } from "../constants";

function Button({
  value,
  type,
  action,
  loading = false,
  fullWidth,
  variant = "primary",
  icon,
}) {
  console.log(icon);

  let variantClass;

  switch (variant) {
    default:
    case "primary":
      variantClass = "bg-primary text-white";
      break;
    case "secondary":
      variantClass = "bg-secondary text-white";
      break;
    case "frame":
      variantClass = "bg-white text-primary border border-primary";
      break;
  }

  let iconComponent;

  switch (icon) {
    case "play":
      iconComponent = <ImPlay2 {...iconProps} />;
      break;
    case "pause":
      iconComponent = <ImPause {...iconProps} />;
      break;
    default:
      break;
  }

  return (
    <button
      type={type}
      className={`${variantClass} ${
        fullWidth && "w-full"
      } p-3 flex items-center justify-between whitespace-nowrap space-x-2`}
      onClick={action && action}
    >
      {value && <div>{loading ? "Loading.." : value}</div>}
      {icon && iconComponent}
    </button>
  );
}

export default Button;
