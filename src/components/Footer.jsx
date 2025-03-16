import React from "react";

export default function Footer() {
  return (
    <div
      className={`py-3 text-md w-full flex items-center justify-center bg-primaryColor text-white`}
    >
      <div className="flex justify-center items-center gap-1 capitalize text-xs">
        <span>حقوق النشر © 2025</span>
        <p className="">iLinks جميع الحقوق محفوظة.</p>
      </div>
    </div>
  );
}
