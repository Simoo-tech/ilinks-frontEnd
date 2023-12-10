import React from "react";
import { MdError } from "react-icons/md";

export const ErrorMes = ({ error }) => {
  return (
    <div className="error-message">
      <span
        className={`${
          error ? "block" : "hidden"
        }  text-base font-semibold capitalize text-red-400 rounded-2xl flex items-center gap-1 border-solid border-2 border-red-400 py-1 px-3 `}
      >
        <MdError /> {error}
      </span>
    </div>
  );
};
