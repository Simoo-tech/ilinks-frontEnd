import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ShareContent, { ShareBtn } from "./Share";
import { Logo } from "../../components/Tools/Logo";
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
import { ProfilePic } from "../../components/ProfilePic";
import Avatar from "react-avatar";
import { FetchUserShow } from "../../lib/Fetch&Check_Data";
import Layout from "../../components/Layout";

export default function UserIlinks() {
  const [userData, setUserData] = useAuth();
  const { username } = useParams();
  const userCookies = cookie.load("UD_1");
  const [loading, setLoading] = useState(true);
  // fetch data
  useEffect(() => {
    if (username) {
      FetchUserShow({ username, setUserData, setLoading });
    }
  }, []);

  // share button
  const [shareBtn, setShareBtn] = useState(false);
  const { fname, lname, jobtitle, about, IlinkData } = userData;

  // skills map show
  const Skills = IlinkData?.skills?.map((skill, i) => {
    return skill.skillname && skill.skillperc ? (
      <div
        key={i}
        id="skill"
        className="flex flex-wrap justify-between items-center text-sm gap-2 w-full"
      >
        <p className={`uppercase ${username && "text-lg"} `}>
          {skill.skillname}
        </p>
        <span className={`font-light ${username && "text-lg"} `}>
          {skill.skillperc}%
        </span>
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
      className={`card relative overflow-hidden group bg-primaryColor shadow-xl text-white ${
        username ? "sm:w-full md:w-80 lg:w-96" : "w-full"
      } `}
    >
      <figure className="relative before:absolute before:w-full before:h-full before:bg-black before:opacity-20">
        <img src={por.imgurl} alt="project-img" loading="lazy" />
        <div
          className={`${
            username ? "text-base px-4 py-3" : "text-sm px-2 py-2 "
          }  text-white capitalize bg-color3 absolute top-0 left-0 rounded-b-lg`}
        >
          {por.protype}
        </div>
      </figure>
      <div className={`card-body ${!username && "p-4"}`}>
        <h2
          className={` ${
            username ? "text-base" : "text-sm "
          }card-title flex justify-between capitalize`}
        >
          title: {por.protitle}
        </h2>
        <p className={`capitalize ${!username && "text-sm"}`}>
          description: {por.prodesc}
        </p>
        <p className={`${!username && "text-sm"}`}>
          For ( Company ) : {por.cleintname}
        </p>
        {por.prourl && (
          <div className="card-actions justify-center">
            <button className="btn btn-md">View project</button>
          </div>
        )}
      </div>
    </div>
  ));

  return (
    <Layout title={username && `Ilinks | @${username}`}>
      {loading && username ? ( // skeleton loading
        <div className="flex flex-col h-full items-center justify-center bg-white ">
          <div className="container overflow-y-scroll max-w-full py-5 px-5 h-full flex flex-col items-center gap-7 ">
            <div className="flex gap-4 items-center">
              <div className="skeleton w-44 h-44 rounded-full shrink-0" />
            </div>
            <div className="flex flex-col gap-6 w-full items-center">
              <div className="skeleton h-4 flex w-4/12" />
              <div className="skeleton h-4 flex w-6/12" />
              {/* social links */}
              <div className="flex gap-4 ">
                <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
              </div>
            </div>
            {/*skills */}
            <h3
              className="w-fit text-center border-b-2 b-2 border-black text-black
          uppercase font-semibold col-span-full text-3xl"
            >
              skills
            </h3>
            <div className=" w-full flex justify-center gap-5 flex-wrap">
              <div className="flex flex-col gap-4 w-72">
                <div className="skeleton h-32 w-full" />
                <div className="skeleton h-4 w-28" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
              </div>
              <div className="flex flex-col gap-4 w-72">
                <div className="skeleton h-32 w-full" />
                <div className="skeleton h-4 w-28" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
              </div>
              <div className="flex flex-col gap-4 w-72">
                <div className="skeleton h-32 w-full" />
                <div className="skeleton h-4 w-28" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
              </div>
            </div>
            {/* projects */}
            <h3
              className="w-fit text-center border-b-2 b-2 border-black text-black
            uppercase font-semibold col-span-full text-3xl"
            >
              portfolio
            </h3>
            <div className=" w-full flex justify-center gap-5 flex-wrap">
              <div className="flex flex-col gap-4 w-72">
                <div className="skeleton h-32 w-full" />
                <div className="skeleton h-4 w-28" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
              </div>
              <div className="flex flex-col gap-4 w-72">
                <div className="skeleton h-32 w-full" />
                <div className="skeleton h-4 w-28" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
              </div>
              <div className="flex flex-col gap-4 w-72">
                <div className="skeleton h-32 w-full" />
                <div className="skeleton h-4 w-28" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
              </div>
            </div>
          </div>
          {/* Copy right */}
          <div
            className={`py-3 px-5 w-full h-fit flex items-center justify-center ${
              userCookies && username && "justify-between"
            } bg-primaryColor text-white`}
          >
            <div
              id="logo"
              className="flex justify-center items-center flex-col"
            >
              <Logo
                align="self-center"
                textSize={"sm:text-sm lg:text-2xl"}
                imgSize="80"
              />
              {!userCookies && username && (
                <p className="uppercase font-medium text-xs">
                  Ilinks Watermark
                </p>
              )}
            </div>
            {/* Edit ilink */}
            {userCookies && username && (
              <Link
                to={`/${username}/profile-data-page`}
                className="flex items-center gap-2 border-2 border-white p-1 px-3 uppercase 
              font-medium cursor-pointer rounded-lg sm:text-sm  "
              >
                edit
                <FaEdit />
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div
          id="user-ilink"
          className={`relative bg-white text-black flex flex-col items-center justify-between overflow-y-scroll 
      gap-2 w-full h-full`}
        >
          {/* share content and bottom */}
          {username && (
            <>
              <ShareContent
                shareBtn={shareBtn}
                setShareBtn={setShareBtn}
                close={true}
                userData={userData}
                opacity={50}
              />
              <ShareBtn shareBtn={shareBtn} setShareBtn={setShareBtn} />
            </>
          )}
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
              {username ? (
                <div
                  id="avatar_holder"
                  className="p-1 bg-primaryColor rounded-full"
                >
                  <Avatar
                    src={userData.avatar}
                    round
                    size="150"
                    className="bg-primaryColor "
                  />
                </div>
              ) : (
                <ProfilePic userData={userData} />
              )}
              <div
                id="user-info"
                className="flex flex-col items-center text-black max-w-full text-center gap-1"
              >
                <p
                  id="name"
                  className={`capitalize max-w-full truncate font-medium ${
                    username ? "text-2xl" : "text-lg "
                  }`}
                >
                  {fname} {lname}
                </p>
                <p
                  id="job-title"
                  className={`capitalize max-w-full truncate ${
                    username ? "text-xl" : "text-base"
                  }`}
                >
                  {jobtitle}
                </p>
                <p
                  id="about"
                  className={`text-pretty max-w-full break-normal ${
                    username ? "text-base" : "text-sm "
                  }`}
                >
                  {about}
                </p>
              </div>
            </div>
            {/* user social media links  */}
            <div id="social-links">
              <ul
                id="links"
                className="flex gap-3 justify-center items-center "
              >
                {IlinkData?.socialMediaLinks?.facebookUrl &&
                  IlinkData?.socialMediaLinks.facebookUrl !== "" && (
                    <li>
                      <Link
                        className="text-blue-700 hover:scale-125 duration-200"
                        target="_blank"
                        to={IlinkData.socialMediaLinks.facebookUrl}
                      >
                        <BsFacebook size={!username ? 23: 28} />
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
                        <BsGithub size={!username ? 23: 28} />
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
                        <BsInstagram size={!username ? 23: 28} />
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
                        <BsTiktok size={!username ? 23: 28} />
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
                        <BsYoutube size={!username ? 23: 28} />
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
                        <FaTwitter size={!username ? 23: 28} />
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
                        <BsLinkedin size={!username ? 23: 28} />
                      </Link>
                    </li>
                  )}
                {username && userCookies && (
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
                className={`w-full gap-6 justify-items-center place-content-center grid 
              sm:grid-cols-1 md:grid-cols-2  ${
                !username ? "lg:grid-cols-1" : " lg:grid-cols-3"
              }`}
              >
                <h3
                  className={`w-full border-b-2 pb-2 border-black flex justify-between items-center
            uppercase font-semibold col-span-full  ${
              username ? "sm:text-lg  md:text-xl lg:text-2xl" : "text-lg "
            }`}
                >
                  My Skills
                  {userCookies && username && (
                    <Link
                      title="add more skills"
                      to={`/${username}/skills-data-page`}
                      className="text-lg flex items-center gap-5 border-2 py-1 px-2  border-primaryColor text-primaryColor
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
                className={`w-full gap-10 justify-items-center place-content-center content-center grid 
                sm:grid-cols-1 md:grid-cols-2  ${
                  !username ? "lg:grid-cols-1" : " lg:grid-cols-3"
                }`}
              >
                <h3
                  className={`w-full border-b-2 pb-2 border-black flex justify-between items-center
                  uppercase font-semibold col-span-full 
                ${username ? "sm:text-lg  md:text-xl lg:text-2xl" : "text-lg"}`}
                >
                  portfolio
                  {userCookies && username && (
                    <Link
                      title="add more projects"
                      to={`/${username}/portfolio-data-page`}
                      className="text-lg flex items-center gap-5 border-2 py-1 px-2  border-primaryColor text-primaryColor
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
          <div
            className={`py-3 px-5 w-full h-fit flex items-center justify-center bg-primaryColor text-white`}
          >
            <div
              id="logo"
              className="flex justify-center items-center flex-col"
            >
              <Logo
                align="self-center"
                textSize={"sm:text-lg lg:text-2xl"}
                imgSize="90"
              />
              {!userCookies && username && (
                <p className="uppercase font-medium text-xs">
                  Ilinks Watermark
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
