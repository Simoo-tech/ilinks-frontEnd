import { useState } from "react";
import { IoMdCloseCircle, IoMdNotifications } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SendCode } from "../lib/EmailVerification";
import { LoadingBtn } from "./Tools/LoadingBtn";

export const Message = ({ setToast }) => {
  const [userData] = useAuth();
  const { verifed } = userData;
  const navigate = useNavigate();
  const [message, setMessage] = useState(
    !verifed
      ? {
          active: true,
          title: "verify email",
          body: "please verify your email, to continue press verify email",
          unRead: true,
        }
      : {
          title: "",
          active: false,
          body: "",
          unRead: false,
        }
  );
  const { title, active, body, unRead } = message;
  const [btn, setBtn] = useState(false);
  // message style

  const handleClick = () => {
    SendCode({ userData, navigate, setMessage, setBtn });
  };
  return (
    <div
      className={`${
        active ? "right-3" : " -right-[240px] "
      } fixed top-20 w-[240px] h-[200px] shadow-xl z-50 flex items-center justify-center duration-700 ease-in-out`}
    >
      <div className=" capitalize w-full h-full relative flex ">
        {/* left bottom */}
        {!active && (
          <button
            onClick={() => {
              setMessage({ ...message, active: true });
            }}
            id="left"
            className="absolute flex justify-between items-center py-2 px-2 bg-color3 -rotate-90 w-[170px] 
            h-fit top-[82px] -left-[102px] rounded-t-xl"
          >
            <h1 className="text-center text-sm text-white flex items-center gap-2">
              الرسائل
            </h1>
            {unRead ? (
              <MdNotificationsActive color="white" />
            ) : (
              <IoMdNotifications color="white" />
            )}
          </button>
        )}
        {/* message body */}
        <div
          id="middle "
          className="flex justify-center items-center flex-col h-full bg-white w-full py-4 
          text-black px-3 relative"
        >
          <IoMdCloseCircle
            size={23}
            color="red"
            className="absolute top-2 right-2"
            onClick={() => {
              if (verifed) {
                setMessage({ ...message, active: false });
              }
            }}
          />
          {title === "verify email" && (
            <div className="flex flex-col justify-evenly gap-2 items-center h-full">
              <h2 className="font-semibold">{title}</h2>
              <p className="text-base text-center">{body}</p>
              <button
                className="bg-primaryColor text-white py-1 w-full text-base"
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
          )}
          {title === "" && <p>لا يوجد رسائل</p>}
        </div>
      </div>
    </div>
  );
};
