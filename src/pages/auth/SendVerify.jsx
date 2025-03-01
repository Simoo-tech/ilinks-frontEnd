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
          <p>One Last Step!</p>
        </div>
        <span className="md:text-2xl sm:text-lg sm:text-center">
          We need to verify your email
        </span>
        <span className="sm:text-lg sm:text-center md:text-xl text-center">
          Your email addresse is
          <span className="underline ml-1">{email}</span>
        </span>
        <p className="sm:text-base sm:text-center lg:text-lg text-gray-500">
          please verify your email, to continue press verify email
        </p>
        <button
          className="bg-primaryColor text-white py-2 px-6 text-lg rounded-md"
          onClick={handleClick}
        >
          {btn ? (
            <span className="flex gap-1 items-center justify-center">
              Sending <LoadingBtn size={20} />
            </span>
          ) : (
            <span>Verify Email</span>
          )}
        </button>
      </div>
    </section>
  );
}
