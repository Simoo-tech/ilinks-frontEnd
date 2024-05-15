import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

export const AlertBox = ({
  message,
  HandleDeleteProImg,
  setDeleteImg,
  deleteImg,
}) => {
  return (
    deleteImg !== null && (
      <div className="fixed top-0 left-0 bg-black/40 z-50 flex justify-center items-center w-full h-full">
        <div className="container w-fit h-fit p-10 bg-white rounded-2xl flex flex-col justify-center gap-10 items-center">
          <h1 className="text-3xl uppercase font-semibold flex items-center text-red-400 gap-2">
            Alert <FiAlertTriangle />
          </h1>
          <h2 className="text-xl ">{message}</h2>
          <div id="btns" className="flex gap-5 justify-center w-full">
            <button
              onClick={() => setDeleteImg(null)}
              type="button"
              className="w-5/12 capitalize p-3 bg-blue-500 text-white text-lg rounded-xl"
            >
              cancel
            </button>
            <button
              onClick={() => HandleDeleteProImg(deleteImg)}
              type="button"
              className="w-5/12 capitalize p-3 bg-red-500 text-white text-lg rounded-xl"
            >
              delete
            </button>
          </div>
        </div>
      </div>
    )
  );
};
