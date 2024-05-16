import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [userData] = useAuth();
  const { verifed, _id } = userData;
  const navigate = useNavigate();
  const [Toast, setToast] = useState(false);

  return (
    <Layout
      title={"Ilinks"}
      description={"ilinks home page"}
      keyword={["new", "aSQasd", "build portfolio page"]}
    >
      <section
        id="landing"
        className="container max-w-full flex items-center w-full flex-reverse sm:h-fit  
        sm:flex-col sm:gap-5 sm:justify-center 
        lg:flex-row lg:justify-center "
      >
        {/* not verified alert */}
        {Toast && (
          <div className="toast toast-bottom toast-end">
            <div className="alert alert-error text-white">
              <span>Please verified your account </span>
            </div>
          </div>
        )}
        {/* text & input */}
        <div
          id="left-containers"
          className={` relative flex flex-col gap-5 duration-700 ease-linear section-h        
            sm:w-full sm:items-center sm:text-center sm:justify-center sm:pt-10
            lg:w-8/12 lg:items-center lg:justify-center lg:pt-0`}
        >
          <div>
            <h1
              className="w-full text-white flex font-bold flex-col gap-2
            sm:text-2xl text-center 
            md:text-2xl
            xl:text-5xl uppercase "
            >
              Start building your
            </h1>
            <span
              className="text-color3 w-full  uppercase font-extrabold
              text-2xl xl:text-5xl"
            >
              Ilinks now!
            </span>
          </div>
          <p
            className="text-gray-300 leading-7 text-center
              sm:w-full sm:text-sm
              md:text-lg
              lg:w-10/12 xl:text-lg"
          >
            Create your Ilinks now, which allows you to share all your links
            Facebook, Instagram, TikTok and share your portfolio, share your
            awesome work, we're helping you to find your best opportunity
          </p>
          {/* home job search form  */}
          <form
            id="job-search-form"
            className="grid gap-5 sm:grid-cols-1 md:grid-cols-12 w-full justify-between items-center text-white"
          >
            {/* build btn */}
            <button
              type="button"
              id="job-search-btn"
              onClick={() => {
                if (verifed && _id) {
                  navigate(`${userData.username}/profile-data-page`);
                } else if (!verifed && _id) {
                  setToast(true);
                  setTimeout(() => setToast(false), 4000);
                } else {
                  navigate("/auth/sign-in");
                }
              }}
              className="font-bold py-2 px-4 rounded-xl capitalize sm:col-span-full md:col-span-4 text-lg
            ease-in-out duration-200 text-color3 border-2 border-color3 hover:text-white hover:bg-color3 "
            >
              build your Ilink
            </button>
            {/* or text  */}
            <p className="text-lg text-center sm:col-span-full md:col-span-1 ">
              OR
            </p>
            {/* form */}
            <div
              id="input-search"
              className="flex flex-col items-center justify-center gap-2 relative rounded-lg  
              sm:col-span-full md:col-span-7 "
            >
              <input
                type="text"
                name="search-job"
                id="search-job"
                className=" bg-zinc-400 w-full outline-none p-3 placeholder:text-white rounded-lg "
                placeholder="Enter a job name "
              />
              <HiMagnifyingGlass
                className="bg-zinc-500  h-full rounded-r-lg w-[50px] px-3 right-0 absolute duration-200
                  hover:bg-zinc-400 cursor-pointer"
                onClick={() => {
                  navigate(`/jobs`);
                }}
              />
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
