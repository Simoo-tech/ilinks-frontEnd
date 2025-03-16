import React from "react";
import { LoadingBtn } from "./LoadingBtn";
import { FaCheck } from "react-icons/fa";
import { BsArrowBarRight } from "react-icons/bs";

export const BtnsActions = ({
  btn,
  btnStyle,
  ActionText,
  DoneText,
  BtnAction,
}) => {
  return (
    <>
      {btn === "NoAction" || btn === "NeedAction" ? (
        <button
          type={btn === "NeedAction" ? "submit" : "button"}
          onClick={BtnAction && BtnAction}
          disabled={!btn && true}
          className={`${btnStyle} flex items-center justify-center gap-2 ${
            btn === "NoAction" && "opacity-60 cursor-not-allowed"
          } `}
        >
          {ActionText === "حفظ" && <BsArrowBarRight />}
          {ActionText === "تسجيل الدخول" || ActionText === "تسجيل" ? (
            <BsArrowBarRight />
          ) : null}
          {ActionText}
        </button>
      ) : null}
      {btn === "Loading" ? (
        <span
          disabled={true}
          className={`cursor-progress ${btnStyle} flex items-center justify-center gap-2 `}
        >
          جاري الحفظ
          <span className="loading loading-spinner loading-sm" />
        </span>
      ) : null}
      {btn === "Done" ? (
        <button
          disabled={true}
          className={`flex items-center justify-center ${btnStyle} gap-3 cursor-pointer `}
        >
          تم الحفظ
          <FaCheck color="green" />
        </button>
      ) : null}
    </>
  );
};
