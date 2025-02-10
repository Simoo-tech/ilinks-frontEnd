import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ShareContent, { ShareBtn } from "./Share";
import {
  BsFacebook,
  BsInstagram,
  BsYoutube,
  BsGithub,
  BsLinkedin,
  BsTiktok,
} from "react-icons/bs";
import { FaTwitter } from "react-icons/fa6";
import { FaEdit, FaPlus } from "react-icons/fa";
import cookie from "react-cookies";
import { useAuth } from "../../context/AuthContext";
import Layout from "../../Layout";
import { useQuery } from "react-query";
import axios from "axios";
import { UserIlinksSkeleton } from "../../components/Loading Skeletons/userIlinksSkeleton";
import PageNotFound from "../../components/PageNotFound";
import Footer from "../../components/Footer";

const serverPath = import.meta.env.VITE_SOME_SERVER_API;

export default function UserIlinks() {
  const [userData] = useAuth();
  const [userShow, setUserShow] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const { username } = useParams();
  const userCookies = cookie.load("UD_1");
  // share button
  const [shareBtn, setShareBtn] = useState(false);

  // fetch data
  const { isLoading, error } = useQuery(
    "fetchUserIlink",
    () => {
      return axios.get(`${serverPath}userIlink/${username}`);
    },
    {
      retry: false,
      onSuccess: (res) => setUserShow(res.data.userIlink),
      onError: (error) => setErrorMsg(error.response.data.message),
    }
  );

  const { fname, lname, jobtitle, about, IlinkData, avatar, status } = userShow;

  // skills map show
  const Skills = IlinkData?.skills?.map((skill, i) => {
    return skill.skillname && skill.skillperc ? (
      <div
        key={i}
        id="skill"
        className="flex flex-wrap justify-between items-center text-sm gap-2 w-full"
      >
        <p className={`uppercase text-lg`}>{skill.skillname}</p>
        <span className={`font-light text-lg `}>{skill.skillperc}%</span>
        <div className="w-full h-2 bg-[#ddd] relative rounded-xl ">
          <div
            className="absolute top-0 left-0 bg-colorBorderDark w-full h-full rounded-xl 
            max-w-full duration-200"
            style={{ width: `${skill.skillperc}%` }}
          />
        </div>
      </div>
    ) : null;
  });
  // portfolio map show
  const Portfolios = IlinkData?.portfolio?.map((por, i) => (
    <div
      key={i}
      className="card relative overflow-hidden group border-2  shadow-xl "
    >
      <figure
        className="relative before:absolute before:w-full before:h-full
      before:bg-black before:opacity-20"
      >
        <img
          src={por.imgurl}
          alt="project-img"
          loading="lazy"
          className="w-full max-h-64"
        />
      </figure>
      <div className="card-body capitalize text-md py-3 px-6 flex flex-col ">
        <p className="flex justify-between">title: {por.protitle}</p>
        <p className="">description: {por.prodesc}</p>
        <p className="">For ( Company ) : {por.cleintname}</p>
        <p className="">project type : {por.protype}</p>
      </div>
      {por.prourl && (
        <div className="justify-center my-4 w-full px-10  ">
          <Link to={por.prourl} className="btn btn-md w-full">
            View project
          </Link>
        </div>
      )}
    </div>
  ));

  // skeleton loading
  if (isLoading) {
    return <UserIlinksSkeleton />;
  }
  // skeleton loading
  if (error) {
    return <PageNotFound msg={errorMsg} />;
  }

  return (
    <Layout title={username && `Ilinks | @${username}`}>
      <div
        id="user-ilink"
        className={`relative bg-white text-black flex flex-col items-center justify-between overflow-y-scroll 
      gap-2 w-full h-full`}
      >
        {/* share content and bottom */}
        <>
          <ShareContent
            shareBtn={shareBtn}
            setShareBtn={setShareBtn}
            close={true}
            userShow={userShow}
            userData={userData}
            opacity={50}
          />
          <ShareBtn
            shareBtn={shareBtn}
            setShareBtn={setShareBtn}
            userShow={userShow}
          />
        </>
        {/* container */}
        <div
          id="container"
          className={`w-full h-fit max-w-full flex flex-col gap-10 ${
            !username ? "py-8 sm:px-4" : "py-5 sm:px-4 md:px-12 lg:px-20 "
          }`}
        >
          {/* user name and avtar */}
          <div
            id="top-user-avatar-name"
            className="text-white w-full relative flex items-center flex-col gap-4  "
          >
            <div id="avatar_holder" className="rounded-full relative">
              <span
                class={`${status === "free" && "bg-green-500 -right-4"} ${
                  status === "part-time" && "bg-orange-500 -right-8"
                } ${
                  status === "full-time" && "bg-red-500 -right-8"
                }  -top-2 uppercase px-3 py-1 text-base rounded-2xl absolute w-fit truncate border-none`}
              >
                {status}
              </span>
              <img
                src={avatar}
                width="180"
                height="180"
                className="bg-primaryColor rounded-full "
              />
            </div>
            <div
              id="user-info"
              className="flex flex-col items-center text-black max-w-full text-center gap-1"
            >
              <p
                id="name"
                className="capitalize max-w-full truncate font-medium text-2xl"
              >
                {fname} {lname}
              </p>
              <p
                id="job-title"
                className="capitalize max-w-full truncate text-xl"
              >
                {jobtitle}
              </p>
              <p
                id="about"
                className="text-pretty max-w-full break-normal text-base"
              >
                {about}
              </p>
            </div>
          </div>
          {/* user social media links  */}
          <div id="social-links">
            <ul id="links" className="flex gap-3 justify-center items-center ">
              {IlinkData?.socialMediaLinks?.facebookUrl &&
                IlinkData?.socialMediaLinks.facebookUrl !== "" && (
                  <li>
                    <Link
                      className="text-blue-700 hover:scale-125 duration-200"
                      target="_blank"
                      to={IlinkData.socialMediaLinks.facebookUrl}
                    >
                      <BsFacebook size={!username ? 23 : 28} />
                    </Link>
                  </li>
                )}
              {IlinkData?.socialMediaLinks?.githubUrl &&
                IlinkData?.socialMediaLinks.githubUrl !== "" && (
                  <li>
                    <Link
                      target="_blank"
                      className="hover:scale-125 duration-200"
                      to={IlinkData.socialMediaLinks.githubUrl}
                    >
                      <BsGithub size={!username ? 23 : 28} />
                    </Link>
                  </li>
                )}
              {IlinkData?.socialMediaLinks?.instagramUrl &&
                IlinkData?.socialMediaLinks.instagramUrl !== "" && (
                  <li>
                    <Link
                      className="text-red-600 hover:scale-125 duration-200"
                      target="_blank"
                      to={IlinkData.socialMediaLinks.instagramUrl}
                    >
                      <BsInstagram size={!username ? 23 : 28} />
                    </Link>
                  </li>
                )}
              {IlinkData?.socialMediaLinks?.tiktokUrl &&
                IlinkData?.socialMediaLinks.tiktokUrl !== "" && (
                  <li>
                    <Link
                      target="_blank"
                      className="hover:scale-125 duration-200"
                      to={IlinkData.socialMediaLinks.tiktokUrl}
                    >
                      <BsTiktok size={!username ? 23 : 28} />
                    </Link>
                  </li>
                )}
              {IlinkData?.socialMediaLinks?.youtubeUrl &&
                IlinkData?.socialMediaLinks.youtubeUrl !== "" && (
                  <li>
                    <Link
                      className="text-red-600 hover:scale-125 duration-200"
                      target="_blank"
                      to={IlinkData.socialMediaLinks.youtubeUrl}
                    >
                      <BsYoutube size={!username ? 23 : 28} />
                    </Link>
                  </li>
                )}
              {IlinkData?.socialMediaLinks?.twitterUrl &&
                IlinkData?.socialMediaLinks.twitterUrl !== "" && (
                  <li>
                    <Link
                      className="text-blue-500 hover:scale-125 duration-200"
                      target="_blank"
                      to={IlinkData.socialMediaLinks.twitterUrl}
                    >
                      <FaTwitter size={!username ? 23 : 28} />
                    </Link>
                  </li>
                )}
              {IlinkData?.socialMediaLinks?.linkedinUrl &&
                IlinkData?.socialMediaLinks.linkedinUrl !== "" && (
                  <li>
                    <Link
                      className="text-blue-700 hover:scale-125 duration-200"
                      target="_blank"
                      to={IlinkData.socialMediaLinks.linkedinUrl}
                    >
                      <BsLinkedin size={!username ? 23 : 28} />
                    </Link>
                  </li>
                )}
              {userCookies && (
                <li
                  className="border-2 rounded-xl p-2 cursor-pointer border-black hover:scale-125 duration-200"
                  title="add more social links"
                >
                  <Link to={`/${username}/socialLinks-data-page`}>
                    <FaPlus size={17} />
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {/* user skills */}
          {IlinkData?.skills && (
            <div
              id="skills"
              className="w-full gap-6 justify-items-center place-content-center grid 
              sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              <h3
                className="w-full border-b-2 pb-2 border-black flex justify-between items-center
            uppercase font-semibold col-span-full sm:text-lg  md:text-xl lg:text-2xl"
              >
                My Skills
                {userCookies && (
                  <Link
                    title="add more skills"
                    to={`/${username}/skills-data-page`}
                    className="text-lg flex items-center gap-5 border-2 py-1 px-2 border-primaryColor text-primaryColor
                      hover:bg-primaryColor hover:text-white duration-200
                      sm:text-sm md:text-base lg:text-lg "
                  >
                    edit skill <FaEdit size={17} />
                  </Link>
                )}
              </h3>
              {Skills}
            </div>
          )}
          {/* user portfolio */}
          {IlinkData?.portfolio && (
            <div
              id="portfolio"
              className="w-full gap-10 grid 
                sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "
            >
              <h3
                className="w-full border-b-2 pb-2 border-black flex justify-between items-center
                  uppercase font-semibold col-span-full  
                  sm:text-lg md:text-xl lg:text-2xl"
              >
                portfolio
                {userCookies && (
                  <Link
                    title="add more projects"
                    to={`/${username}/portfolio-data-page`}
                    className="text-lg flex items-center gap-5 border-2 py-1 px-2 border-primaryColor text-primaryColor
                    hover:bg-primaryColor hover:text-white duration-200
                    sm:text-sm md:text-base lg:text-lg "
                  >
                    edit portfolio <FaEdit size={17} />
                  </Link>
                )}
              </h3>
              {Portfolios}
            </div>
          )}
        </div>
        {/* Copy right */}
        <Footer />
      </div>
    </Layout>
  );
}
