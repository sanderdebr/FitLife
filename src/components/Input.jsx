import React from "react";

function Input({ name, type, label, value, handleChange }) {
  return (
    <div className="flex flex-col space-y-3">
      <label htmlFor={name}>{label}</label>
      <input
        className="border border-gray p-3"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default Input;
