import React from "react";

export default function Button({ children, onClick, className, ...rest }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${className || "bg-blue-600 text-white"}`}
      {...rest}
    >
      {children}
    </button>
  );
}
