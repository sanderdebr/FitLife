import React from "react";

function Input({
  name,
  type,
  placeholder,
  label,
  value,
  center,
  handleChange,
}) {
  return (
    <div className="flex flex-col space-y-3">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className={`${
          center && "text-center"
        } border border-gray p-3 appearance-none`}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default Input;
