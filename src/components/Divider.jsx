import React from "react";

function Divider({ text }) {
  return (
    <div className="flex items-center justify-between">
      <div className="mx-14 h-px flex-grow bg-gray"></div>
      <div className="text-gray">{text}</div>
      <div className="mx-14 h-px flex-grow bg-gray"></div>
    </div>
  );
}

export default Divider;
