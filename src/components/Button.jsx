import React from "react";

function Button({ variant = "primary", value, type, action, loading }) {
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
      className={`${variantClass} p-3 w-full`}
      onClick={action}
    >
      {loading ? "Loading.." : value}
    </button>
  );
}

export default Button;
