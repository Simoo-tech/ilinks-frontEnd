import React from "react";

import { ThreeCircles } from "react-loader-spinner";
export const Loading = () => {
  return (
    <div className="bg-colorDark2 w-full h-screen flex justify-center items-center">
      <ThreeCircles
        height="100"
        width="100"
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
