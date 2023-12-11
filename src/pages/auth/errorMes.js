import React from "react";
import { MdError } from "react-icons/md";

export const ErrorMes = ({ error }) => {
  return (
    <div className="error-message flex justify-center">
      <span
        className={`${
          error ? "visible" : "invisible"
        }  lg:text-sm font-semibold capitalize text-white bg-red-500 rounded-2xl flex items-center
        gap-2 border-solid py-1 px-3 w-fit max-w-xs
        sm:text-xs 
      
        `}
      >
        <MdError size={"25"} /> {error}
      </span>
    </div>
  );
};
