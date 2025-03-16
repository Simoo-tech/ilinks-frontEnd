import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { MdMarkEmailUnread } from "react-icons/md";
import { ErrorMes } from "../../components/Tools/errorMes";
import { VerifyCodeSubmit } from "../../lib/EmailVerification";
import { BtnsActions } from "../../components/Tools/BtnsActions";
import { Logo } from "../../components/Tools/Logo";
import { useAuth } from "../../context/AuthContext";

export default function VerifyEmail() {
  const [userData] = useAuth();
  const { code, email, verifed } = userData;

  // btn state and error
  const [btn, setBtn] = useState("NoAction");
  const [error, setError] = useState({ active: false, text: null });

  const [codeVal, setCodeVal] = useState({});
  const OtpBox = useRef([]);

  const correctCode = String(code) === Object.values(codeVal).join("");
  const CodeLength = String(code).split("");

  function HandleChange(e, i) {
    if (OtpBox.current[i].value !== "") {
      setCodeVal({ ...codeVal, [e.target.name]: e.target.value });
    }
    setBtn("NeedAction");
    setError({ active: false, text: null });
  }
  function InputFocus(e, i) {
    if (e.key === "ArrowLeft") {
      if (i > 0) {
        OtpBox.current[i - 1].focus();
      }
    } else if (
      e.key === "Tab" ||
      e.key === "ArrowRight" ||
      e.key !== "Backspace"
    ) {
      if (i !== CodeLength.length - 1 && OtpBox.current[i].value !== "") {
        OtpBox.current[i + 1].focus();
      } else if (i !== CodeLength.length) {
        OtpBox.current[i].focus();
      }
    }
  }
  const Inputs = CodeLength?.map((input, i) => {
    return (
      <input
        autoFocus={i === 0}
        className={` border-2 p-3 text-center text-2xl sm:w-[40px] md:w-[60px] sm:h-[40px] md:h-[60px] rounded-lg 
        ${error.text !== null && "border-green-600"}  
        ${error.active ? "border-red-600" : null} 
        ${error.text === null && "border-black"}`}
        maxLength={1}
        value={code.i}
        onChange={(e) => HandleChange(e, i)}
        name={i}
        key={i}
        onKeyUp={(e) => InputFocus(e, i)}
        ref={(reference) => (OtpBox.current[i] = reference)}
      />
    );
  });

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
        <div className="title flex flex-col items-center gap-8">
          <ErrorMes
            error={error.active}
            text={error.text}
            color="red-500"
            icon={20}
          />
          <div className="sm:text-xl lg:text-4xl font-bold capitalize flex items-center gap-1">
            <MdMarkEmailUnread />
            <p>خطوة أخيرة!</p>
          </div>
          <span className="md:text-2xl sm:text-lg sm:text-center">
            نحتاج إلى التحقق من بريدك الإلكتروني
          </span>
          <span className="sm:text-lg sm:text-center md:text-xl text-center">
            عنوان بريدك الإلكتروني هو:
            <span className="underline ml-1">{email}</span>
          </span>
          <p className="sm:text-base sm:text-center lg:text-lg text-gray-500">
            لقد أرسلنا إلى بريدك الإلكتروني رمز تحقق مكونًا من 6 أرقام، يرجى
            إدخالها لإكمال عملية التحقق من بريدك الإلكتروني.
          </p>
        </div>
        <form
          className="flex flex-col gap-8 items-center"
          dir="ltr"
          onSubmit={(e) => {
            e.preventDefault();
            VerifyCodeSubmit({
              btn,
              setError,
              correctCode,
              setBtn,
              userData,
            });
          }}
        >
          <div id="inputs" className="grid grid-cols-6 sm:gap-3 md:gap-10">
            {Inputs}
          </div>
          <BtnsActions
            btn={btn}
            btnStyle="bg-primaryColor sm:text-sm md:text-lg py-2 w-5/12 
            font-medium rounded-lg text-white capitalize"
            ActionText="نحقق"
            DoneText="تم التحقق"
          />
        </form>
      </div>
    </section>
  );
}
