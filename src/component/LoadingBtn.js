import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export const LoadingBtn = () => {
  return (
    <ThreeCircles
      height="30"
      width="30"
      color="white"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor="#C70039"
      middleCircleColor="#fc8452"
    />
  );
};
