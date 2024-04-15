import React, { useState } from "react";
import {
  BsFillEmojiHeartEyesFill,
  BsEmojiNeutralFill,
  BsEmojiFrownFill,
} from "react-icons/bs";
import { LoadingBtn } from "../../components/LoadingBtn";
import { user_data } from "../../App";

export default function Rate() {
  const [rate, setRate] = useState({});
  const [showRate, setShowRate] = useState(true);

  // handle submit
  const [loading, setLoading] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
  };

  // handle update
  const FormID = window.localStorage.getItem("formID");
  const HandleUpdata = async () => {};

  return (
    <div className="rate flex justify-center items-center">
      <div className="p-5 bg-colorDark2 w-10/12 sm:4/6 lg:h-5/6 flex flex-col justify-center sm:gap-5 lg:gap-10 gap items-center">
        {showRate ? (
          <>
            <p className="sm:text-xl lg:text-4xl text-white font-bold">
              Are you happy with our service?
            </p>
            <div className="emojis flex sm:gap-10 lg:gap-20 justify-center items-center">
              <button
                onClick={() => {
                  setRate({ bad: true });
                  setShowRate(false);
                }}
                className="emoji flex flex-col items-center gap-3 group"
              >
                <BsEmojiFrownFill
                  className="text-white group-hover:text-red-500
                sm:text-4xl lg:text-8xl"
                />
                <span className="text-xl text-white text capitalize font-semibold">
                  meh
                </span>
              </button>
              <button
                onClick={() => {
                  setRate({ middle: true });
                  setShowRate(false);
                }}
                className="emoji flex flex-col items-center gap-3 group"
              >
                <BsEmojiNeutralFill
                  className="text-white group-hover:text-orange-600
                sm:text-4xl lg:text-8xl"
                />
                <span className="text-xl text-white text capitalize font-semibold">
                  umm
                </span>
              </button>
              <button
                onClick={() => {
                  setRate({ good: true });
                  setShowRate(false);
                }}
                className="emoji flex flex-col items-center gap-3 group"
              >
                <BsFillEmojiHeartEyesFill
                  className="text-white group-hover:text-green-600
                sm:text-4xl lg:text-8xl"
                />
                <span className="text-xl text-white text capitalize font-semibold">
                  yey!
                </span>
              </button>
            </div>
          </>
        ) : (
          <p className="sm:text-xl lg:text-4xl text-white font-bold capitalize">
            Thanks for rating us
          </p>
        )}
        <button
          disabled={loading ? true : false}
          onClick={FormID ? HandleUpdata : HandleSubmit}
          className={`border-2 sm:w-9/12 lg:w-[300px] justify-center flex border-mainColor2 transition-all 
        duration-300 ease-in-out hover:bg-mainColor1 group rounded-xl mt-16 py-3 px-4 ${
          loading ? "cursor-not-allowed" : "cursor-pointer"
        } `}
        >
          {loading ? (
            <LoadingBtn size={"35"} />
          ) : (
            <span className="sm:xl lg:text-2xl  text-white  rounded-lg capitalize font-semibold">
              {FormID ? "update data" : "Generate my ilinks"}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
