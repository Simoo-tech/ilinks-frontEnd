import React, { useContext } from "react";
import phoneShape from "../../assets/phoneShape.png";
import { Link, Outlet } from "react-router-dom";
import Phone from "./PhoneDataShow";
import { UserD1 } from "../../context";

export default function PhonePreview() {
  const { userData } = useContext(UserD1);
  const { IlinkData } = userData;
  return (
    <section className="phone-content relative container max-w-full flex items-center justify-between bg-zinc-200 section-h ">
      <div id="sections" className="sm:w-full sm:py-4 md:p-4 lg:w-9/12 h-full">
        <Outlet />
      </div>
      <div
        id="phone-preview"
        className="h-fit w-fit flex-col items-center justify-center relative sm:hidden lg:flex"
      >
        <div id="phone" className="relative z-10">
          <img src={phoneShape} alt="Vecteezy.com" width={290} className=" " />
          <Phone />
        </div>
        {IlinkData?.portfolio?.length > 1 && IlinkData?.skills?.length ? (
          <Link
            to={`/userIlinks/${userData.username}`}
            className="border-2 border-black py-2 px-6 font-medium uppercase duration-300 rounded-lg
            hover:bg-primaryColor hover:text-white "
          >
            preview
          </Link>
        ) : null}
      </div>
    </section>
  );
}
