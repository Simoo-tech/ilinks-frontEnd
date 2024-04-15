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
        className="px-5 py-2 rounded-2xl capitalize font-semibold drop-shadow-lg shadow-lg
flex items-center flex-row-reverse gap-2 group hover:bg-transparent
bg-colorDark2 w-fit hover:bg-white duration-300"
      >
        back
        <BsArrowBarLeft />
      </button>
      <BtnsActions
        btn={btn}
        btnStyle="px-5 py-2 rounded-2xl capitalize font-semibold drop-shadow-lg shadow-lg
                flex items-center gap-2 group hover:bg-transparent bg-colorDark2 w-fit hover:bg-white duration-300 "
        ActionText={displayName ? displayName : "next"}
      />
    </div>
  );
};
