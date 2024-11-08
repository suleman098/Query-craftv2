import React from "react";
import Loader from "./Loader";
const Button = ({
  type = "button",
  onClick,
  isLoading,
  children,
  disabled,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={isLoading || disabled}
    className={`w-full p-2 rounded btn btn-outline btn-success text-white ${
      isLoading ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {isLoading ? <Loader size="small" /> : children}
  </button>
);

export default Button;
