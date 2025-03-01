import React, { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import "../App.css";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Layout from "../Layout";
import { useAuth } from "../context/AuthContext";
import cookies from "react-cookies";

const userCookies = cookies.load("UD_1");

export default function Home() {
  const [userData] = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({ name: "" });

  if (userCookies) {
    if (userData.verifed) {
      return <Navigate to={`/userIlinks/${userData.username}`} />;
    } else {
      return <Navigate to={`/auth/send-verify`} />;
    }
  }

  return (
    <Layout
      title={"Ilinks"}
      description={"ilinks home page"}
      keyword={["build portfolio page"]}
    >
      <section
        id="landing"
        className="container max-w-full flex items-center w-full flex-reverse 
        sm:flex-col sm:gap-5 sm:justify-center 
        lg:flex-row lg:justify-between "
      >
        <div
          className="flex flex-col gap-2 items-start 
          lg:w-6/12"
        >
          <h1
            className="font-semibold
            sm:text-2xl
            xl:text-3xl uppercase "
          >
            Start building your
            <span
              className="text-color3 uppercase font-bold ml-1
            sm:text-2xl lg:text-3xl"
            >
              Ilinks now!
            </span>
          </h1>
          <p
            className="text-colorBlue2 leading-7 text-start
              sm:text-sm
              md:text-md
              xl:text-lg"
          >
            Create your Ilinks now, which allows you to share all your links
            Facebook, Instagram, TikTok and share your portfolio, share your
            awesome work, we're helping you to find your best opportunity
          </p>
        </div>
        {/* home job search form  */}
        <div
          id="job-search-form"
          className="gap-3 flex flex-col-reverse justify-between items-center text-color3
          sm:w-full
          lg:w-4/12"
        >
          {/* build btn */}
          <Link
            to={`/auth/sign-in`}
            id="job-search-btn"
            className="font-medium py-2 px-4 rounded-xl capitalize w-full text-lg text-center
            ease-in-out duration-200 text-color3 border border-color3 hover:text-white hover:bg-color3 "
          >
            build your Ilink
          </Link>
          {/* or text  */}
          <p className="text-lg text-center sm:col-span-full md:col-span-1 ">
            OR
          </p>
          {/* form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/jobs?name=${searchParams.get("name")}`);
            }}
            id="input-search"
            className="flex flex-col items-center justify-center gap-2 relative rounded-lg border-color3 border p-2 w-full "
          >
            <input
              type="text"
              name="name"
              className="outline-none w-full text-colorBlue2 bg-transparent "
              placeholder="Enter a job name"
              onChange={(e) => {
                setSearchParams({ name: e.target.value });
              }}
            />
            <button
              type="submit"
              className="bg-color3/80 text-color2 h-full rounded-r-lg w-[50px] px-3 right-0 absolute duration-200
                  hover:bg-color3 cursor-pointer"
            >
              <HiMagnifyingGlass />
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
