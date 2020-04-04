import React from "react";

function Button({ children, onClick = () => {} }) {
  return (
    <span className="inline-flex rounded-md shadow-sm w-full">
      <button
        onClick={onClick}
        type="submit"
        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
      >
        {children}
      </button>
    </span>
  );
}

export default Button;
