import React from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex flex-col gap-4 w-full section-h justify-center items-center">
      <AiFillQuestionCircle
        className={`text-white sm:text-[100px] lg:text-[150px]`}
      />
      <p className={`text-white sm:text-3xl lg:text-4xl font-bold `}>
        Page Not Found
      </p>
      <div className={`text-gray-400 flex-col items-center `}>
        <p className="sm:text-lg text-center lg:text-xl text-white">
          Oops! We couldn't find the page that you're looking for.
        </p>
        <p className="sm:text-lg text-center lg:text-xl text-white">
          Please check the address and try again.
        </p>
      </div>
      <p className="text-lg text-gray-500">Error Code: 404</p>
      <Link to="/" className="underline text-blue-500 text-lg">
        go to home page
      </Link>
    </div>
  );
}