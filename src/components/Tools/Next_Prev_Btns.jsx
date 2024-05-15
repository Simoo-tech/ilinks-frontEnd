import React from "react";
import { useNavigate } from "react-router-dom";
import { BtnsActions } from "./BtnsActions";
import { BsArrowBarLeft } from "react-icons/bs";

export const Next_Prev_Btns = ({ prev, btn, displayName }) => {
  const navigate = useNavigate();
  return (
    <div
      id="btns"
      className="border-zinc-300 border-t-2 flex gap-5 py-4 justify-center col-span-full w-full "
    >
      <button
        onClick={() => navigate(prev)}
        type="button"
        className="text-white py-2 px-3  rounded-lg capitalize font-semibold 
        flex items-center gap-1 group hover:bg-zinc-500 bg-zinc-400 shadow-lg
        w-fit duration-300 drop-shadow-lg"
      >
        <BsArrowBarLeft />
        back
      </button>
      <BtnsActions
        btn={btn}
        btnStyle="text-white py-2 px-3 capitalize rounded-lg font-semibold 
        flex items-center gap-1 group hover:bg-zinc-500 bg-zinc-400 shadow-lg
        w-fit duration-300 drop-shadow-lg "
        ActionText={displayName ? displayName : "next"}
      />
    </div>
  );
};
