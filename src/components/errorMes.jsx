import React from "react";
import { MdError } from "react-icons/md";

export const ErrorMes = ({ error, text, size, color, icon }) => {
  return (
    <div
      className={`${
        error ? "flex" : "hidden"
      } error-message justify-center w-fit rounded-xl py-1 sm:px-2 md:px-6`}
    >
      <span
        className={`font-semibold text-${color} sm:text-sm lg:text-base gap-2 rounded-2xl flex items-center `}
      >
        <MdError size={icon} /> {text}
      </span>
    </div>
  );
};
