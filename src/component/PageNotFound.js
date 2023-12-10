import React, { useContext } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ModeContext } from "../context/context";
import Header from "../component/Header";
export const PageNotFound = () => {
  const { mode } = useContext(ModeContext);
  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
        <AiFillQuestionCircle size={150} className={`text-white `} />
        <p className={`text-white text-4xl font-bold `}>Page Not Found</p>
        <div
          className={`${
            mode === "dark" ? "text-gray-400" : ""
          } flex flex-col items-center `}
        >
          <p className="text-xl text-white">
            Oops! We couldn't find the page that you're looking for.
          </p>
          <p className="text-xl text-white">
            Please check the address and try again.
          </p>
        </div>
        <p className="text-lg text-gray-500">Error Code: 404</p>
        <Link to="/" className="underline text-blue-500 text-lg">
          go to home page
        </Link>
      </div>
    </>
  );
};
