import React, { useContext } from "react";
import { AuthContext, MenuContext } from "../context/context";

import { FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { useCookies } from "react-cookie";
function Header() {
  const { userData } = useContext(AuthContext);
  const [cookies] = useCookies(["access_token"]);
  // set menu funtion
  const { changemenu, setChangemenu } = useContext(MenuContext);

  return (
    <section
      className={`sticky top-0 h-16 z-40 flex items-center justify-center `}
    >
      <div className="container flex flex-row justify-between items-center py-2 ">
        <div className={` flex flex-col text-white w-3/12 lg:w-6/12 `}>
          <Link
            to="/"
            className="sm:text-lg lg:text-2xl uppercase font-bold cursor-pointer flex  items-center"
          >
            <FaLink
              className="rotate-[-45deg] text-mainColor1 "
              size={"20px"}
            />
            Links
          </Link>
        </div>
        {/* user menu */}
        <div className="sm:w-8/12 lg:w-6/12 flex flex-row gap-2 justify-end items-center">
          {cookies.access_token ? (
            <div className=" flex items-center flex-row gap-3 mr-2">
              <Avatar
                className="avatar relative bg-white cursor-pointer "
                size="35px"
                src={userData.avatar}
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
                  to="/auth/login"
                  className="text-white text-sm uppercase font-semibold"
                >
                  login
                </Link>
                <span className="text-white font-semibold text-sm">/</span>
                <Link
                  to="/auth/register"
                  className="text-white text-sm uppercase font-semibold"
                >
                  register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Header;
