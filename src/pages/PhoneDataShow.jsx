import React, { lazy } from "react";

const UserIlink = lazy(() => import("./UserIlink/UserIlinks"));

export default function Phone() {
  return (
    <div id="ilink-data-preview" className="mockup-phone">
      <div className="camera w-[280px] "></div>
      <div className="display w-[280px]  relative">
        <div className="artboard artboard-demo phone-1  max-w-full ">
          <UserIlink />
        </div>
      </div>
    </div>
  );
}
