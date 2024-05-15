import React, { lazy } from "react";

const Phone = lazy(() => import("../PhoneDataShow"));

export default function IlinkDataPreview({ children }) {
  return (
    <div
      className="phone-content relative container max-w-full flex items-center justify-between
    bg-zinc-200 section-h "
    >
      <div
        id="sections"
        className="sm:w-full sm:py-4 md:p-6 lg:w-9/12 h-full text-black"
      >
        {children}
      </div>
      <div
        id="phone-preview"
        className="h-fit w-fit flex-col items-center justify-center relative sm:hidden lg:flex"
      >
        <Phone />
      </div>
    </div>
  );
}
