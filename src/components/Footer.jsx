import React from "react";
import { Logo } from "./Tools/Logo";

export default function Footer() {
  return (
    <div
      className={`py-2 text-md w-full flex items-center justify-center bg-primaryColor text-white`}
    >
      <div className="flex justify-center items-center gap-1 capitalize text-sm">
        <span>Copyrights@2025</span>
        <p className="">Ilinks all rights reserved</p>
      </div>
    </div>
  );
}
