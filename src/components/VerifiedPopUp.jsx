import React, { useContext, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { SendCode } from "../lib/AuthReq";
import { BtnsActions } from "./BtnsActions";
import { UserD1 } from "../context";

export default function VerifiedPopUp({ setUserVerified }) {
  const navigate = useNavigate();
  const { userData } = useContext(UserD1);
  const [btn, setBtn] = useState("NeedAction");
  const BtnAction = () => {
    SendCode({ navigate, setUserVerified, setBtn, userData });
  };
  const { username, email } = userData;

  return (
    <div className="bg-black/80 z-50 flex w-full h-full absolute justify-center items-center">
      <IoCloseCircleOutline
        size={30}
        color="red"
        className="absolute top-5 right-10 cursor-pointer "
        onClick={() => setUserVerified(false)}
      />
      <div
        id="message"
        className=" p-10 border-t-4 border-color3 rounded-2xl bg-color2 flex flex-col items-center justify-center gap-10
        sm:h-full sm:w-11/12 
        md:h-[350px] md:w-[550px]"
      >
        <h3 className="text-4xl font-semibold text-center">
          Verify your email
        </h3>
        <p className="text-center text-lg">
          Hi {username}, Please verify your email address by clicking the link
          sent to <b>{email}</b>
        </p>
        <BtnsActions
          BtnAction={BtnAction}
          btn={btn}
          btnStyle="w-full py-3 bg-color3 text-lg text-white"
          ActionText="send verify link"
        />
      </div>
    </div>
  );
}
