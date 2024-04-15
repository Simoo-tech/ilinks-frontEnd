import React, { useContext } from "react";
import { AuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";

export const NotVerifedPage = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="verify flex justify-center items-center  h-full w-full">
      <div
        className={`bg-colorDark2 border-colorDark1 container flex flex-col
        shadow-xl h-3/6 w-4/12 justify-evenly items-center p-4 border-[1px] rounded-lg
    `}
      >
        <h1 className={`text-white text-4xl font-bold capitalize`}>Ilinks</h1>
        <p className={`dark text-2xl capitalize text-gray-500`}>
          verify your email first
        </p>
        <button
          onClick={() => navigate(`/auth/verifyemail/${userData._id}`)}
          className="bg-mainColor2 text-2xl capitalize py-2 px-4 rounded-lg text-white w-6/12"
        >
          verify
        </button>
      </div>
    </div>
  );
};
