import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Logo } from "../../components/Tools/Logo";
import { MdMarkEmailUnread } from "react-icons/md";
import { SendCode } from "../../lib/EmailVerification";
import { LoadingBtn } from "../../components/Tools/LoadingBtn";

export default function SendVerify() {
  const [userData] = useAuth();
  const { code, email, verifed } = userData;
  const navigate = useNavigate();
  const [btn, setBtn] = useState(false);

  const handleClick = () => {
    SendCode({ userData, navigate, setBtn });
  };
  return verifed ? (
    <Navigate to={"/"} />
  ) : (
    <section
      id="verify-email"
      className="flex flex-col h-full items-center w-full container max-w-full py-3 gap-10 bg-primaryColor"
    >
      <Logo align="self-start" />
      <div
        className="white-container bg-white h-5/6 flex flex-col text-black justify-center gap-10 relative items-center self-center rounded-md 
      sm:py-5 sm:w-full sm:px-5 
      md:py-2 md:p-10 
      lg:w-4/6 lg:px-20 "
      >
        <div className="sm:text-xl lg:text-4xl font-bold capitalize flex items-center gap-1">
          <MdMarkEmailUnread />
          <p>خطوة أخيرة!</p>
        </div>
        <span className="md:text-2xl sm:text-lg sm:text-center">
          نحتاج إلى التحقق من بريدك الإلكتروني
        </span>
        <span className="sm:text-lg sm:text-center md:text-xl text-center">
          عنوان بريدك الإلكتروني هو:
          <span className="underline mx-1">{email}</span>
        </span>
        <p className="sm:text-base sm:text-center lg:text-lg text-gray-500">
          يرجى التحقق من بريدك الإلكتروني، لمتابعة العملية اضغط على زر "التحقق
          من البريد الإلكتروني"
        </p>
        <button
          className="bg-primaryColor text-white py-2 px-6 text-lg rounded-md"
          onClick={handleClick}
        >
          {btn ? (
            <span className="flex gap-1 items-center justify-center">
              جاري الارسال <LoadingBtn size={20} />
            </span>
          ) : (
            <span>تحقق من البريد الإلكتروني</span>
          )}
        </button>
      </div>
    </section>
  );
}
