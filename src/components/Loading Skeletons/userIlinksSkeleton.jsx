import React from "react";
import { Logo } from "../../components/Tools/Logo";

export const UserIlinksSkeleton = () => {
  return (
    <div
      id="user-ilink"
      className="flex flex-col h-full items-center justify-center bg-white "
    >
      <div className="container overflow-y-scroll max-w-full py-5 px-5 h-full flex flex-col items-center gap-7 ">
        <div className="flex gap-4 items-center">
          <div className="skeleton w-44 h-44 rounded-full shrink-0" />
        </div>
        <div className="flex flex-col gap-6 w-full items-center">
          <div className="skeleton h-4 flex w-4/12" />
          <div className="skeleton h-4 flex w-6/12" />
          {/* social links */}
          <div className="flex gap-4 ">
            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
          </div>
        </div>
        {/*skills */}
        <h3
          className="w-fit text-center border-b-2 b-2 border-black text-black
  uppercase font-semibold col-span-full text-3xl"
        >
          skills
        </h3>
        <div className=" w-full flex justify-center gap-5 flex-wrap">
          <div className="flex flex-col gap-4 w-72">
            <div className="skeleton h-32 w-full" />
            <div className="skeleton h-4 w-28" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
          </div>
          <div className="flex flex-col gap-4 w-72">
            <div className="skeleton h-32 w-full" />
            <div className="skeleton h-4 w-28" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
          </div>
          <div className="flex flex-col gap-4 w-72">
            <div className="skeleton h-32 w-full" />
            <div className="skeleton h-4 w-28" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
          </div>
        </div>
        {/* projects */}
        <h3
          className="w-fit text-center border-b-2 b-2 border-black text-black
    uppercase font-semibold col-span-full text-3xl"
        >
          portfolio
        </h3>
        <div className=" w-full flex justify-center gap-5 flex-wrap">
          <div className="flex flex-col gap-4 w-72">
            <div className="skeleton h-32 w-full" />
            <div className="skeleton h-4 w-28" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
          </div>
          <div className="flex flex-col gap-4 w-72">
            <div className="skeleton h-32 w-full" />
            <div className="skeleton h-4 w-28" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
          </div>
          <div className="flex flex-col gap-4 w-72">
            <div className="skeleton h-32 w-full" />
            <div className="skeleton h-4 w-28" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
          </div>
        </div>
      </div>
      {/* Copy right */}
      <div
        className="py-3 px-5 w-full h-fit flex items-center justify-center
    bg-primaryColor text-white"
      >
        <div id="logo" className="flex justify-center items-center flex-col">
          <Logo
            align="self-center"
            textSize={"sm:text-sm lg:text-2xl"}
            imgSize="80"
          />
          <p className="uppercase font-medium text-xs">Ilinks Watermark</p>
        </div>
      </div>
    </div>
  );
};
