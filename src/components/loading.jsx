import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import { FaLink } from "react-icons/fa";

export const Loading = () => {
  return (
    <div className="bg-primaryColor w-full h-screen flex justify-center items-center flex-col gap-10">
      <span className="flex text-4xl text-white uppercase font-bold items-center">
        <FaLink className="rotate-[-45deg] text-mainColor1 " size={"28px"} />
        Links
      </span>
      <ThreeCircles
        height="80"
        width="80"
        color="white"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor="#C70039"
        middleCircleColor="#fc8452"
      />
    </div>
  );
};
