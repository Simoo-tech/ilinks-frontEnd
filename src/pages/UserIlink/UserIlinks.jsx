import React, { lazy, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Loading } from "../../components/loading";
import { Fetch_Check_Data } from "../../Functions/Fetch&Check_Data";
import { Link, useParams } from "react-router-dom";
import ShareContent, { ShareBtn } from "./Share";
import Avatar from "react-avatar";
import { Logo } from "../../components/Logo";
import {
  BsFacebook,
  BsInstagram,
  BsWhatsapp,
  BsYoutube,
  BsGithub,
  BsLinkedin,
  BsTiktok,
} from "react-icons/bs";
import { FaTwitter } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaEye } from "react-icons/fa";

export default function UserIlinks() {
  const { username } = useParams();
  const [userViewData, setUserViewData] = useState({ IlinkData: {} });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Fetch_Check_Data({
      setUserViewData,
      username,
      setLoading,
    });
  }, []);
  const [ScrollToSec, setScrollToSec] = useState();
  const [details, setDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const { avatar, fname, lname, jobtitle, about, IlinkData } = userViewData;
  // share button
  const [shareBtn, setShareBtn] = useState(false);

  console.log(userViewData);
  // skills map show
  const Skills = IlinkData?.skills?.map((skill, i) => {
    return skill.skillname && skill.skillperc ? (
      <div
        key={i}
        id="skill"
        className="flex flex-wrap justify-between items-center text-sm gap-1 w-full"
      >
        <p className="uppercase text-lg">{skill.skillname}</p>
        <span className="font-light text-lg">{skill.skillperc}%</span>
        <div className="w-full h-2 bg-[#ddd] relative rounded-xl ">
          <div
            className="absolute top-0 left-0 bg-colorBorderDark w-full h-full rounded-xl max-w-full duration-200"
            style={{ width: `${skill.skillperc}%` }}
          />
        </div>
      </div>
    ) : null;
  });
  // portfolio map show
  const Portfolios = IlinkData?.portfolio?.map((por, i) => (
    <div key={i} id="img-holder" className="relative overflow-hidden group ">
      {por.imgurl && <img src={por.imgurl} alt="portfolio-img" />}
      <div
        className="content absolute -bottom-[100px] group-hover:bottom-0 duration-300 left-0 w-full 
flex justify-center items-end pb-5 text-white shadow-xl bg-gradient-to-t from-black to-transparent h-4/6 "
      >
        <button
          type="button"
          onClick={() => {
            setShowDetails(true);
            setDetails(por);
          }}
          className="capitalize bg-mainColor1 py-1 px-3 rounded-xl"
        >
          see details
        </button>
      </div>
    </div>
  ));

  return loading ? (
    <Loading />
  ) : (
    <>
      {/* page Helmet */}
      <Helmet>
        <title>Ilinks | @{username}</title>
        <meta name="description" content={`${username} Ilinks user profile`} />
        <meta
          name="keywords"
          content="ilinks,create your portfolio, porfolio ,share your social media,facebook,twitter,instagram"
        />
      </Helmet>
      <div
        id="user-ilink"
        className="relative bg-white
      flex flex-col items-center h-screen overflow-y-scroll py-4"
        onScroll={(e) => setScrollToSec(e.target.scrollTop)}
      >
        {/* share content and bottom */}
        <ShareContent
          shareBtn={shareBtn}
          setShareBtn={setShareBtn}
          close={true}
          userViewData={userViewData}
        />
        <ShareBtn
          shareBtn={shareBtn}
          setShareBtn={setShareBtn}
          userViewData={userViewData}
        />

        {/* container */}
        <div
          id="container"
          className=" w-full overflow-y-scroll container max-w-full flex flex-col gap-8"
        >
          {/* project details show */}
          {showDetails && (
            <div
              id="details"
              className="absolute top-0 left-0 z-50 w-full h-full bg-black/50 flex justify-center items-center  "
            >
              <IoMdClose
                className="absolute right-4 top-4 p-1 bg-white rounded-full"
                size={25}
                color="red"
                onClick={() => {
                  setDetails(null);
                  setShowDetails(false);
                }}
              />
              <div
                id="details-content"
                className="bg-white w-fit h-fit p-2 flex flex-col gap-2"
              >
                <h4 className=" text-xl capitalize bg-gray-200 p-1 w-full text-center break-all font-bold">
                  Title : {details.protitle}
                </h4>
                <p className=" text-lg capitalize  break-all">
                  For ( Cleint name ) :
                  <span className="font-semibold ml-2">
                    {details.cleintname}
                  </span>
                </p>
                <p className=" capitalize ">
                  Type :
                  <span className="font-semibold ml-2">{details.protype}</span>
                </p>
                <p className=" capitalize break-all w-full">
                  description :
                  <span className="font-semibold ml-2">{details.prodesc}</span>
                </p>
                <img src={details.imgurl} alt="img-show" width={800} />
                {details.prourl && (
                  <Link
                    target="_blank"
                    to={details.prourl}
                    className="  rounded-lg text-white bg-color1 py-1 px-3 capitalize flex self-center items-center gap-2"
                  >
                    view project
                    <FaEye />
                  </Link>
                )}
              </div>
            </div>
          )}
          {/* user name and avtar */}
          <div
            id="top-user-avatar-name"
            className="text-white conatiner w-full max-w-full relative flex items-center flex-col gap-4 "
          >
            <Avatar round size="150px" src={avatar} />
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
                className="capitalize max-w-full truncate text-lg"
              >
                {jobtitle}
              </p>
              <p id="about" className="">
                {about}
              </p>
            </div>
          </div>
          {/* user social media links  */}
          <div id="social-links">
            <ul id="links" className="flex gap-4 my-5 justify-center ">
              {IlinkData?.socialMediaLinks?.facebookUrl &&
                IlinkData?.socialMediaLinks.facebookUrl !== "" && (
                  <li>
                    <Link
                      className="text-blue-700 hover:scale-125 duration-200"
                      target="_blank"
                      to={IlinkData.socialMediaLinks.facebookUrl}
                    >
                      <BsFacebook size={25} />
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
                      <BsGithub size={25} />
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
                      <BsInstagram size={25} />
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
                      <BsTiktok size={25} />
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
                      <BsYoutube size={25} />
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
                      <FaTwitter size={25} />
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
                      <BsLinkedin size={25} />
                    </Link>
                  </li>
                )}
            </ul>
          </div>
          {/* user skills */}
          {IlinkData?.skills && (
            <div
              id="skills"
              className="w-full gap-4 justify-items-center content-center grid 
              sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "
            >
              <h3 className="text-2xl w-fit text-center border-b-2 pb-2 border-black uppercase font-semibold col-span-full">
                My Skills
              </h3>
              {Skills}
            </div>
          )}
          {/* user portfolio */}
          {IlinkData.portfolio && (
            <div
              id="portfolio"
              className="w-full gap-4 justify-items-center content-center grid 
              sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "
            >
              <h3 className="text-2xl w-fit text-center border-b-2 pb-2 border-black uppercase font-semibold col-span-full">
                portfolio
              </h3>
              {Portfolios}
            </div>
          )}
        </div>
        {/* Copy right */}
        <div
          className="py-1 px-6 absolute bottom-0 h-fit flex flex-col items-center justify-center bg-primaryColor
       text-white capitalize opacity-50 z-10 
       sm:w-full sm:text-sm
       lg:top-0 lg:left-0 lg:w-fit "
        >
          <Logo
            align="self-center"
            textSize={"sm:text-sm lg:text-2xl"}
            imgSize="1rem"
          />
          <p className=" font-semibold">watermark</p>
        </div>
      </div>
    </>
  );
}
