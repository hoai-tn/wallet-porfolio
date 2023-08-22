"use client"
import React from "react";

interface IButton {
  color: string;
  rounded: string;
  width?: string;
  hoverBg: string;
  handleClick?: () => void;
  children: JSX.Element;
  className?: string;
}
const Button = ({
  className = "",
  color,
  hoverBg,
  rounded,
  width,
  handleClick,
  children,
}: IButton) => {
  return (
    <button
      onClick={handleClick}
      className={`bg-${color} px-4 py-2 rounded-${rounded} hover:bg-[${hoverBg}] ${className}`}
      style={{ width, background: color }}
    >
      {children}
    </button>
  );
};

export default Button;
