import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { FaRegEdit, FaUserAlt, FaUserEdit } from "react-icons/fa";
import { SignOut } from "../lib/SignOutFunction";
import { Logo } from "./Tools/Logo";
import { useAuth } from "../context/AuthContext";
import cookies from "react-cookies";
import { CiSearch } from "react-icons/ci";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";

export const Navbar = ({ setToast }) => {
  const [userData] = useAuth();
  const [toggle, setToggle] = useState(false);
  const userCookies = cookies.load("UD_1");
  const { username } = userData;
  const Links = [
    {
      url: "/" + username + "/profile-data-page",
      name: "profile data",
    },
    {
      url: "/" + username + "/socialLinks-data-page",
      name: "social media",
    },
    {
      url: "/" + username + "/skills-data-page",
      name: "skills",
    },
    {
      url: "/" + username + "/portfolio-data-page",
      name: "projects",
    },
    {
      url: "/userIlinks/" + username,
      name: "Profile",
    },
  ];

  return (
    <header
      id="navbar"
      className="sticky top-0 h-16 z-20 flex items-center justify-center container max-w-full bg-primaryColor"
    >
      <nav className=" flex justify-between items-center py-2 w-full">
        <div id="logo" className="">
          <Logo />
        </div>
        <HiOutlineBars3BottomRight
          onClick={() => setToggle(!toggle)}
          color="white"
          size={30}
          className="lg:hidden"
        />
        <ul
          className={`justify-between items-center
        ${toggle ? "sm:flex" : "sm:hidden"}
        sm:flex-col sm:bg-primaryColor sm:w-11/12 sm:absolute sm:top-[70px] sm:left-4 sm:z-60 sm:py-5 sm:gap-5
         sm:px-4 sm:rounded-lg sm:shadow-lg sm:transition-all sm:duration-300
        ${
          userCookies ? "lg:w-[68%]" : "lg:w-[57%]"
        } lg:flex lg:flex-row lg:relative lg:top-0 lg:bg-transparent lg:shadow-none`}
        >
          <menu
            className="text-white flex capitalize items-center
          sm:flex-col sm:w-full sm:gap-2
          lg:flex-row lg:w-fit lg:gap-8"
          >
            {userCookies ? (
              Links.map((link, i) => (
                <li
                  key={i}
                  className="relative text-nowrap w-full text-center 
                  border-b hover:border-zinc-300 hover:duration-300 
                  sm:border-zinc-200 sm:pb-3
                  lg:text-md lg:border-transparent lg:pb-1"
                >
                  <Link to={link.url}>{link.name}</Link>
                </li>
              ))
            ) : (
              <>
                <li
                  className="relative text-nowrap w-full text-center 
                      border-b hover:border-zinc-300 hover:duration-300 
                      sm:border-zinc-200 sm:pb-3
                      lg:text-md lg:border-transparent lg:pb-1"
                >
                  <Link to="/">home</Link>
                </li>
                <li
                  className="relative text-nowrap w-full text-center 
                      border-b hover:border-zinc-300 hover:duration-300 
                      sm:border-zinc-200 sm:pb-3
                      lg:text-md lg:border-transparent lg:pb-1"
                >
                  <Link to="/about-us">about us</Link>
                </li>
              </>
            )}
          </menu>
          {/* btns */}
          <div
            className="flex  justify-end items-center font-normal capitalize
            sm:!px-4  sm:gap-5
              md:!px-5  
              lg:!px-6 lg:gap-2 "
          >
            <Link
              to="/jobs"
              className="text-white py-3 px-5 rounded-lg border-none bg-color3 flex items-center
              justify-center gap-2
              hover:bg-slate-800 duration-200"
            >
              job search <CiSearch className="sm:text-lg" />
            </Link>
            {userCookies ? (
              <div
                className="flex items-center gap-2
              sm:flex-col
          lg:flex-row"
              >
                <button
                  type="button"
                  className="text-white py-3 px-5 rounded-lg  border-none bg-color3 flex 
              justify-center gap-2
                hover:bg-slate-800 duration-200"
                  onClick={() => SignOut({ path: "/auth/sign-in" })}
                >
                  Logout <BiLogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/auth/sign-in"
                className="text-white py-3 px-5 rounded-lg border-none bg-color3 flex 
              justify-center gap-2
                hover:bg-slate-800 duration-200"
              >
                login
              </Link>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};
