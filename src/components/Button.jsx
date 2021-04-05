import React from "react";

function Button({
  value,
  type,
  action,
  loading = false,
  fullWidth,
  variant = "primary",
}) {
  let variantClass = "";

  switch (variant) {
    default:
    case "primary":
      variantClass = "bg-primary text-white";
      break;
    case "secondary":
      variantClass = "bg-white text-primary border border-primary";
      break;
  }

  return (
    <button
      type={type}
      className={`${variantClass} ${fullWidth && "w-full"} p-3`}
      onClick={action}
    >
      {loading ? "Loading.." : value}
    </button>
  );
}

export default Button;
