import React, { useRef } from "react";
import { Phone } from "../component/PhoneView";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Header from "../component/Header";
import "../App.css";

const Home = () => {
  const [cookies] = useCookies(["access_token"]);
  const textAnimtaion = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
    textAnimtaion.current.classList.remove("opacity-0", "-top-[400px]");
    textAnimtaion.current.classList.add("opactiy-100", "top-0");
  }, []);
  return (
    <>
      <Header />
      <section className={`Home overflow-scroll relative bg-colorLight3 my-2`}>
        <div
          className="landing container flex flex-wrap sm:gap-5 sm:justify-center lg:justify-between
        items-center w-full flex-reverse sm:h-fit lg:h-screen mb-10"
        >
          <div
            className={`text-container relative flex flex-col gap-8 sm:items-center lg:items-start -top-[400px] opacity-0 duration-700 ease-linear md:w-full lg:w-8/12 justify-center`}
            ref={textAnimtaion}
          >
            <div>
              <h1
                className={`"text-white" w-full text-white
            sm:text-2xl sm:text-center sm:flex-col flex lg:flex-row md:text-2xl
            xl:text-5xl uppercase lg:text-start font-bold mt-14`}
              >
                Start building your
              </h1>
              <span
                className="text-mainColor2 ml-2 w-full  xl:text-5xl uppercase lg:text-start font-extrabold
              sm:text-2xl sm:text-center sm:flex-col flex lg:flex-row md:text-2xl"
              >
                Ilinks now!
              </span>
            </div>
            <p
              className={`text-gray-300 leading-7 
              sm:text-center sm:text-sm md:text-lg xl:text-lg md:text-justify sm:w-full lg:w-10/12`}
            >
              create your Ilinks now, which allows you to share all your links
              Facebook, Instagram, TikTok and share your portfolio, share your
              awesome work, we're helping you to find your best opportunity
            </p>
            <Link
              to={cookies.access_token ? `/formpage/profile` : "/auth/login"}
              className={` font-bold sm:text-base md:text-xl py-2 px-4 rounded-xl capitalize w-fit 
              ease-in-out duration-200 text-mainColor2 border-2 border-mainColor2 hover:text-white hover:bg-mainColor2 `}
            >
              create your Ilink now
            </Link>
          </div>
          <Phone />
        </div>
        <div
          className={`how-to-use container relative justify-start items-center w-full h-full
          flex gap-7 z-10 flex-col `}
        >
          <p className="text-mainColor2 text-3xl capitalize font-bold border-b-4 py-2 border-mainColor2">
            how to use
          </p>
          <div
            className="box bg-black 
          sm:w-full sm:h-4/6 
          lg:w-7/12 lg:h-4/6 relative "
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/rokGy0huYEA"
              title="Google — Year in Search 2020"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
