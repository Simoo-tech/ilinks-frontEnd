import React from "react";

export default function IlinkDataPreview({ children }) {
  return (
    <div
      className="phone-content relative container max-w-full flex items-center justify-between
    bg-zinc-200 section-h "
    >
      <div id="sections" className="w-full h-[95%] text-black">
        {children}
      </div>
    </div>
  );
}
