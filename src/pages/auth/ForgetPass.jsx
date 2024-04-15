import React, { useState } from "react";
import { MdErrorOutline, MdMarkEmailUnread } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { SendResetLink } from "../../Functions/AuthReq";
import { Logo } from "../../components/Logo";
import { Helmet } from "react-helmet-async";
import { BtnsActions } from "../../components/BtnsActions";

export default function ForgetPass() {
  const [email, setEmail] = useState();
  const [msg, setMsg] = useState();
  const [send, setSend] = useState(true);
  const [btn, setBtn] = useState("NoAction");

  return (
    <>
      <Helmet>
        <title>Ilinks | Reset Password</title>
        <meta name="description" content="Ilinks login page" />
        <meta name="keywords" content="ilinks,reset password" />
      </Helmet>
      <section
        id="forget-password"
        className="h-full flex w-full items-center justify-center bg-gradient-to-tl from-primaryColor to-color3 "
      >
        <div
          className="container max-w-full backdrop-blur-xl bg-primaryColor/80 sm:10/12 lg:w-4/12 h-5/6 flex justify-center py-5
      items-center rounded-lg flex-col"
        >
          <Logo />
          {send ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                SendResetLink({
                  email,
                  setSend,
                  setMsg,
                  setBtn,
                  btn,
                });
              }}
              className="flex justify-center gap-10 items-center h-full py-9 flex-col w-full"
            >
              <div id="text" className="flex flex-col gap-2 items-center">
                <MdErrorOutline size={100} className="text-color3" />
                <p className="text-white capitalize text-2xl">
                  forgot password
                </p>
                <p className="text-gray-400 sm:text-sm lg:text-base text-center">
                  Enter your email and we'll send you a link to reset your
                  password
                </p>
              </div>
              <div id="input" className="w-full flex flex-col gap-2">
                <div
                  id="input"
                  className="flex items-center bg-color2 p-2 w-full rounded-lg group "
                >
                  <AiOutlineMail size={25} />
                  <input
                    autoFocus
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setMsg(false);
                      setBtn("NeedAction");
                    }}
                    type="email"
                    className="bg-transparent w-full outline-none px-2"
                  />
                </div>
                {msg && (
                  <span
                    id="message"
                    className={`${
                      msg ? "block" : "hidden"
                    } error-msg text-red-500 text-left w-full`}
                  >
                    {msg}
                  </span>
                )}
              </div>
              <div className="btns w-full flex flex-col items-center gap-4">
                <BtnsActions
                  btn={btn}
                  btnStyle=" text-color3 bg-white py-2 px-6 rounded-lg text-lg capitalize w-full "
                  ActionText="reset password"
                  DoneText="link sent"
                />

                <Link to={-1} className="flex items-center gap-1 text-white">
                  <IoIosArrowBack />
                  <span>Back to login</span>
                </Link>
              </div>
            </form>
          ) : (
            <div className="flex justify-center gap-10 items-center h-full py-9 flex-col w-full text-white ">
              <p className="sm:text-xl lg:text-4xl font-bold capitalize flex items-center justify-center gap-2">
                <MdMarkEmailUnread />
                check your email!
              </p>
              <p className="text-white sm:text-lg lg:text-xl text-center">
                We send to your email a link to reset your password
              </p>
              <Link
                to={-1}
                className="flex items-center sm:text-base lg:text-lg gap-1"
              >
                <IoIosArrowBack />
                Back to login page
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}