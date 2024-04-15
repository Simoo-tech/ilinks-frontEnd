import React from "react";
import phoneShape from "../../assets/phoneShape.png";
import { Outlet } from "react-router-dom";
import Phone from "./PhoneDataShow";

export default function PhonePreview() {
  return (
    <section className="phone-content relative container max-w-full flex items-center justify-between bg-zinc-200 section-h ">
      <div id="sections" className="sm:w-full sm:py-4 md:p-4 lg:w-9/12 h-full">
        <Outlet />
      </div>
      <div
        id="phone-preview"
        className="h-fit w-fit items-center justify-center relative sm:hidden lg:flex"
      >
        <img
          src={phoneShape}
          alt="Vecteezy.com"
          width={290}
          className="relative z-10 "
        />
        <Phone />
      </div>
    </section>
  );
}
