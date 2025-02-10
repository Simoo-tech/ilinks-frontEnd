import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { FaRegEdit, FaUserAlt, FaUserEdit } from "react-icons/fa";

import { SignOut } from "../lib/SignOutFunction";
import { Logo } from "./Tools/Logo";
import { useAuth } from "../context/AuthContext";
import cookies from "react-cookies";

export const Navbar = ({ setToast }) => {
  const userCookies = cookies.load("UD_1");

  return (
    <header
      id="navbar"
      className="sticky top-0 h-16 z-20 flex items-center justify-center container max-w-full bg-primaryColor"
    >
      <nav className=" flex flex-row justify-between items-center py-2 w-full">
        <Logo />
        {/* user menu */}
        <div className="sm:w-8/12 lg:w-6/12 flex flex-row gap-2 justify-end items-center">
          {userCookies ? (
            <Menu setToast={setToast} />
          ) : (
            <div className=" text-right align-middle mr-2">
              <h4 className="text-white font-bold text-left uppercase">
                create your
                <span className="ml-1 text-mainColor1 font-extrabold ">
                  ilink !
                </span>
              </h4>
              <div className="flex flex-row justify-start gap-2">
                <Link
                  to="/auth/sign-in"
                  className="text-white uppercase font-semibold"
                >
                  login
                </Link>
                <span className="text-white font-semibold ">/</span>
                <Link
                  to="/auth/sign-up"
                  className="text-white uppercase font-semibold"
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

const Menu = () => {
  const [userData] = useAuth();
  const { avatar, username, verifed } = userData;

  const Links = [
    {
      url: verifed ? "/userIlinks/" + username : "/",
      name: "Profile",
      icon: <FaUserAlt size={14} />,
    },
    {
      url: verifed ? "/" + username + "/profile-data-page" : "/",
      name: "Edit Data",
      icon: <FaRegEdit size={15} />,
    },
  ];

  return (
    <div className="dropdown dropdown-end ">
      <div
        tabIndex={1}
        role="button"
        className="btn btn-ghost btn-circle avatar "
      >
        <div className="w-11 rounded-full bg-white">
          <img alt="avatar" src={avatar} />
        </div>
      </div>
      <ul
        tabIndex={10}
        id="menu"
        className=" menu-sm dropdown-content mt-3 px-2 py-3 shadow rounded-box w-44 
        bg-zinc-600 text-white"
      >
        <div className="flex flex-col gap-1">
          {Links.map((link, i) => (
            <li
              key={i}
              className="border-b-[1px] border-white hover:bg-zinc-800 duration-300 py-1 rounded-lg"
            >
              <Link className="flex justify-between items-center" to={link.url}>
                {link.name} {link.icon}
              </Link>
            </li>
          ))}
          <li className="hover:bg-zinc-800 duration-300 ">
            <button
              type="button"
              className="flex justify-between items-center w-full"
              onClick={() => SignOut({ path: "/auth/sign-in" })}
            >
              Logout <BiLogOut size={15} />
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
};
