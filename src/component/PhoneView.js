import React, { useState } from "react";
import ava from "../assets/ava1.webp";
import { Link } from "react-router-dom";
import img1 from "../assets/ava.webp";
import proImg1 from "../assets/temp4.webp";
import proImg2 from "../assets/temp2.webp";
import { Icon } from "@iconify/react";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTelegram,
  BsTwitter,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import { FaBars, FaTiktok } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const Phone = () => {
  const [phonePage, setPhonePage] = useState(1);
  const [menu, setMenu] = useState(false);

  return (
    <div
      className="phone rounded-2xl border-[1px] mb-4 border-colorDark2 shadow-2xl
      relative flex flex-col bg-colorDark2 overflow-hidden 
      before:w-[90px] before:h-[15px] before:absolute before:left-[50%] before:translate-x-[-50%]
    before:bg-black before:top-0 before:rounded-b-2xl before:z-20
      sm:w-9/12 sm:h-[500px] sm:justify-center sm:mx-auto sm:items-center 
      md:w-4/12 md:h-[500px] md:justify-center md:mx-auto lg:items-end
      lg:w-[270px] lg:h-[540px] lg:justify-end  "
    >
      <nav
        className="header header pt-5 pb-2 flex border-b-2 border-black px-3
      w-full justify-between rounded-t-2xl relative bg-mainColor2"
      >
        <button
          onClick={() => {
            setPhonePage(1);
          }}
          className="logo"
        >
          <p className="text-white capitalize ">geroge_11</p>
        </button>
        <FaBars color="white" onClick={() => setMenu(!menu)} />
        <div
          className={`menu absolute w-full -bottom-[109px] left-0 bg-colorDark2 flex-col duration-150 h-fit 
          border-b-2 border-black
          ${menu ? "flex  " : "hidden"}`}
        >
          <button
            onClick={() => {
              setPhonePage(1);
              setMenu(false);
            }}
            className="text-white text-sm capitalize py-2 "
          >
            home
          </button>
          <button
            onClick={() => {
              setPhonePage(2);
              setMenu(false);
            }}
            className="text-white text-sm capitalize py-2 "
          >
            about
          </button>
          <button
            onClick={() => {
              setPhonePage(3);
              setMenu(false);
            }}
            className="text-white text-sm capitalize py-2 "
          >
            portfolio
          </button>
        </div>
      </nav>
      {/* home section */}
      {phonePage === 1 && (
        <section className="home w-full h-full pt-2 px-3 overflow-scroll">
          <div className="info flex gap-2 flex-col justify-start items-center w-full ">
            <img src={ava} alt="" className="rounded-full w-[60px]" />
            <div className="name flex flex-col items-center text-white">
              <p className="font-semibold text-xs capitalize">gorge monib</p>
              <p className="text-xs capitalize ">i'm mern stack developer</p>
            </div>
            <div className="social flex w-full gap-3 justify-center rounded-b-lg py-1 ">
              <BsFacebook className="text-blue-600 text-base  hover:scale-125" />
              <BsGithub className="text-base hover:scale-125 text-white" />
              <BsInstagram className="text-pink-700 text-base hover:scale-125" />
              <FaTiktok className=" hover:scale-125 text-base text-white" />
              <BsTwitter className="text-blue-600 text-lg hover:scale-125" />
              <BsTelegram className="text-blue-600 text-lg hover:scale-125" />
              <BsYoutube className="text-red-500 text-lg hover:scale-125" />
              <BsLinkedin className="text-blue-700 text-lg hover:scale-125" />
            </div>
            <div className="contact border-y-[1px] w-full flex text-white ">
              <Link
                target="_blank"
                to={`https://wa.me/`}
                className="flex border-r-[1px] items-center justify-center gap-2 w-6/12 p-1"
              >
                <BsWhatsapp className="text-green-400 text-xs " />
                <span className="text-sm capitalize ">message</span>
              </Link>
              <Link
                to="mailto:ilinksportfolio11@gmail.com"
                className="flex items-center justify-center gap-2 w-6/12 p-1"
              >
                <MdEmail className=" text-sm text-red-600" />
                <span className="text-xs  capitalize">contact</span>
              </Link>
            </div>
          </div>
          <div className="another-links w-full flex flex-col items-center justify-start mt-4 gap-3 h-fit ">
            <p className=" font-semibold capitalize  text-mainColor1 border-mainColor1 border-b-2">
              more links
            </p>
            <Link
              className="link flex items-center w-full p-2 gap-2 border-gray-300 border-2
              rounded-lg"
              to={"http://www.google.com"}
              target="_blank"
            >
              <Icon icon="fluent-mdl2:website" color="white" />
              <p className="capitalize text-sm text-white">my website</p>
            </Link>
            <Link
              className="link flex items-center w-full p-2 gap-2 border-gray-300 border-2
              rounded-lg"
              to={"http://www.google.com"}
              target="_blank"
            >
              <Icon icon="fluent-mdl2:website" color="white" />
              <p className="capitalize text-sm text-white">my website</p>
            </Link>
            <Link
              className="link flex items-center w-full p-2 gap-2 border-gray-300 border-2
              rounded-lg"
              to={"http://www.google.com"}
              target="_blank"
            >
              <Icon icon="fluent-mdl2:website" color="white" />
              <p className="capitalize text-sm text-white">my website</p>
            </Link>
            <Link
              className="link flex items-center w-full p-2 gap-2 border-gray-300 border-2
              rounded-lg"
              to={"http://www.google.com"}
              target="_blank"
            >
              <Icon icon="fluent-mdl2:website" color="white" />
              <p className="capitalize text-sm text-white">my website</p>
            </Link>
          </div>
        </section>
      )}
      {/* about section */}
      {phonePage === 2 && (
        <section
          className="about w-full flex flex-col justify-between items-center py-2 mb-4 h-full
        overflow-scroll bg-colorDark2 px-3"
        >
          <div className="text w-full flex flex-col justify-between items-center gap-1">
            <p className="capitalize text-xs text-white">Get to know me </p>
            <h1 className="font-semibold capitalize mb-3 text-mainColor1 border-mainColor1 border-b-2">
              about me
            </h1>
          </div>
          <div className="about-section flex flex-col gap-2 items-center">
            <img src={img1} alt="" className="rounded-xl " />
            <p className="text-xs text-gray-300 text-start">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              earum voluptatem voluptate alias sequi, delectus nesciunt harum
              commodi tempora deserunt,
            </p>
            <div className="flex flex-wrap justify-between gap-2 w-full">
              <div className="flex gap-1 text-white w-full">
                <p className="text-xs capitalize font-semibold">Name:</p>
                <span className="text-xs">Gorge Monib</span>
              </div>
              <div className="flex gap-1 text-white w-full">
                <p className="text-xs capitalize font-semibold">email:</p>
                <Link
                  to="mailto:ilinksportfolio11@gmail.com"
                  className="text-xs"
                >
                  ilinksportfolio11@gmail.com
                </Link>
              </div>
              <div className="flex gap-1 text-white w-3/12">
                <p className="text-xs capitalize font-semibold">age:</p>
                <span className="text-xs">20</span>
              </div>
              <div className="flex gap-1 text-white w-7/12">
                <p className="text-xs capitalize font-semibold">from:</p>
                <span className="text-xs">Liverpool, UK</span>
              </div>
            </div>
          </div>
          <div className="skills w-full flex flex-col items-center justify-start mt-4">
            <p className=" font-semibold capitalize mb-3 text-mainColor1 border-mainColor1 border-b-2">
              skills
            </p>
            <div className="skill w-full mb-4">
              <p
                percent="85%"
                className="text-white capitalize text-sm relative flex flex-col
              before:content-[attr(percent)] before:absolute before:right-0 before:text-sm"
              >
                html
                <span
                  className="relative h-1 bg-gray-400 w-full -bottom-2
                before:absolute before:w-[85%] before:h-1 before:bg-white
                "
                ></span>
              </p>
            </div>
            <div className="skill w-full mb-4">
              <p
                percent="55%"
                className="text-white capitalize text-sm relative flex flex-col
              before:content-[attr(percent)] before:absolute before:right-0 before:text-sm"
              >
                node js
                <span
                  className="relative h-1 bg-gray-400 w-full -bottom-2
                before:absolute before:w-[55%] before:h-1 before:bg-white
                "
                ></span>
              </p>
            </div>
            <div className="skill w-full mb-4">
              <p
                percent="75%"
                className="text-white capitalize text-sm relative flex flex-col
              before:content-[attr(percent)] before:absolute before:right-0 before:text-sm"
              >
                reactjs
                <span
                  className="relative h-1 bg-gray-400 w-full -bottom-2
                before:absolute before:w-[75%] before:h-1 before:bg-white
                "
                ></span>
              </p>
            </div>
          </div>
        </section>
      )}
      {/* portfolio section */}
      {phonePage === 3 && (
        <section
          className="about w-full flex flex-col items-center py-2 mb-4 h-full
        overflow-scroll bg-colorDark2 px-3"
        >
          <div className="text w-full flex flex-col justify-between items-center gap-1">
            <p className="capitalize text-xs text-white">
              Showcasing some of my best work
            </p>
            <h1 className="font-semibold capitalize mb-3 text-mainColor1 border-mainColor1 border-b-2">
              portfolio
            </h1>
          </div>
          <div
            className="box mt-2 text-white flex flex-col items-center 
          bg-black shadow-xl border-[1px] border-colorDark2 rounded-lg gap-3"
          >
            <img src={proImg1} alt="portfolio img " className="rounded-t-lg" />
            <div className="text p-2 flex flex-col gap-2 rounded-b-lg">
              <p className="capitalize text-center bg-mainColor2">gbathink</p>
              <p className="text-sm text-center ">
                website made by reactjs, responsive
              </p>
            </div>
            <Link to="/" className="mb-2 py-1 px-5 rounded-xl bg-colorDark2">
              visit
            </Link>
          </div>
          <div
            className="box mt-2 text-white flex flex-col items-center 
          bg-black shadow-xl border-[1px] border-colorDark2 rounded-lg gap-3"
          >
            <img src={proImg2} alt="portfolio img " className="rounded-t-lg" />
            <div className="text p-2 flex flex-col gap-2 rounded-b-lg">
              <p className="capitalize text-center bg-mainColor2">
                logo for company
              </p>
              <p className="text-sm text-center">
                logo for company desgined with illustrator
              </p>
            </div>
            <Link to={""} className="mb-2 py-1 px-5 rounded-xl bg-colorDark2">
              visit
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};
