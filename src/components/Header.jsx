import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { BiLogOut } from "react-icons/bi";
import { LiaLinkSolid } from "react-icons/lia";
import { BsFillPersonFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { SignOut } from "../Functions/SignOutFunction";
import { useCookies } from "react-cookie";
import { Logo } from "./Logo";
import { UserD1 } from "../context";

export const Header = ({ changemenu, setChangemenu }) => {
  const { userData } = useContext(UserD1);
  const { _id, avatar } = userData;
  return (
    <header
      id="navbar"
      className="sticky top-0 h-16 z-20 flex items-center justify-center container max-w-full bg-primaryColor"
    >
      <nav className=" flex flex-row justify-between items-center py-2  w-full">
        <Logo />
        {/* user menu */}
        <div className="sm:w-8/12 lg:w-6/12 flex flex-row gap-2 justify-end items-center">
          {_id ? (
            <div className=" flex items-center flex-row gap-3 mr-2">
              <Avatar
                className="avatar bg-white cursor-pointer "
                size="35px"
                src={avatar}
                round
                onClick={() => setChangemenu(!changemenu)}
              />
            </div>
          ) : (
            <div className=" text-right align-middle mr-2">
              <h4 className="text-white sm:text-xs lg:text-base font-bold text-left uppercase">
                create your
                <span className="ml-1 text-mainColor1 font-extrabold ">
                  ilink !
                </span>
              </h4>
              <div className="flex flex-row justify-start gap-2">
                <Link
                  to="/auth/sign-in"
                  className="text-white text-sm uppercase font-semibold"
                >
                  login
                </Link>
                <span className="text-white font-semibold text-sm">/</span>
                <Link
                  to="/auth/sign-up"
                  className="text-white text-sm uppercase font-semibold"
                >
                  register
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export const Menu = ({ changemenu, setChangemenu }) => {
  const { userData } = useContext(UserD1);
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["user_I1", "ExpTime"]);
  const { avatar, username, jobtitle, IlinkData } = userData;

  function checkIlinkData() {
    if (IlinkData.portfolio.length > 1 && IlinkData.skills.length) {
      setChangemenu(false);
      navigate(`userIlinks/${username}`);
    }
  }
  return (
    <menu
      className={`menu flex-col items-end absolute top-0 h-screen
    w-full duration-300 z-50 ${
      changemenu && true
        ? " opacity-[100%] flex right-0 "
        : "opacity-0 hidden -right-[100px] "
    }
    before:absolute before:h-full before:top-0 before:w-full before:right-0 before:bg-black before:opacity-30 `}
    >
      <div className=" flex flex-col bg-colorBorderDark sm:w-full h-full lg:w-[300px] relative p-4">
        <IoClose
          size={25}
          className="absolute right-3 top-3 bg-red-500 text-white rounded-full p-1 cursor-pointer"
          onClick={() => setChangemenu(!changemenu)}
        />
        {/* name user */}
        <div className="w-full mb-7 flex sm:justify-center lg:justify-start items-center gap-3">
          <Avatar src={avatar} round size="50" className="avatar  bg-white " />
          <div className="name flex flex-col items-start">
            <p className="text-white sm:text-base lg:text-lg text-center  capitalize ">
              {username}
            </p>
            <p className="text-gray-400 sm:text-sm lg:text-base text-center capitalize ">
              {jobtitle}
            </p>
          </div>
        </div>
        {/* user ilink */}
        <div className="flex flex-col w-full">
          <button
            onClick={() => {
              setChangemenu(false);
              navigate(`${userData.username}/ilink-preview/profile`);
            }}
            className="flex sm:justify-center lg:justify-start border-b-[1px] items-center gap-2 text-white text-base capitalize text-center py-2 font-semibold"
          >
            <BsFillPersonFill />
            profile
          </button>
          <button
            onClick={checkIlinkData}
            className="flex border-b-[1px] items-center gap-2 text-white text-base capitalize text-center py-2 font-semibold 
            sm:justify-center lg:justify-start "
          >
            <LiaLinkSolid />
            my ilink
          </button>
        </div>
        {/* sign out */}
        <button
          className={`text-base flex sm:justify-center lg:justify-start w-full items-center gap-2 py-2 text-white capitalize rounded-xl`}
          onClick={() => {
            setChangemenu(false);
            SignOut({ path: "/auth/sign-in", setCookies });
          }}
        >
          <BiLogOut />
          logout
        </button>
      </div>
    </menu>
  );
};
