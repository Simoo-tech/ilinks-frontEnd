import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export const LoadingBtn = ({ size }) => {
  return (
    <ThreeCircles
      height={size}
      width="100%"
      color="white"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor="#001021"
      innerCircleColor="#ec5b53"
      middleCircleColor="#a33327"
    />
  );
};
