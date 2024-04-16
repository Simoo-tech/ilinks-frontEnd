import React, { useContext, useState } from "react";
import Avatar from "react-avatar";
import { Logo } from "../../components/Logo";
// import icons
import {
  BsFacebook,
  BsInstagram,
  BsWhatsapp,
  BsYoutube,
  BsGithub,
  BsLinkedin,
  BsTiktok,
} from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa6";
import { UserD1 } from "../../context";

export default function Phone() {
  const { userData } = useContext(UserD1);
  const { avatar, fname, lname, jobtitle, about, IlinkData } = userData;
  const [details, setDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // skills map show
  const Skills = IlinkData?.skills?.map((skill, i) => {
    return skill.skillname && skill.skillperc ? (
      <div
        key={i}
        id="skill"
        className="flex flex-wrap justify-between items-center text-sm gap-1 w-full"
      >
        <p className="uppercase">{skill.skillname}</p>
        <span className="font-light">{skill.skillperc}%</span>
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
  const Portfolios = IlinkData?.portfolio?.map(
    (por, i) =>
      por.imgurl && (
        <div key={i} id="img-holder" className="relative overflow-hidden group">
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
      )
  );

  return (
    <div
      id="ilink-data-preview"
      className="absolute top-[18px] left-[21px] z-10 flex items-center justify-start flex-col w-[86%] h-[93.7%] rounded-[30px] 
       bg-[#eee] "
    >
      {/* Copy right */}
      <div
        className="w-full  flex flex-col items-center bg-primaryColor py-2
     text-white capitalize "
      >
        <Logo align="self-center" textSize="base" imgSize="15" />
        <p className="text-xs font-semibold">watermark</p>
      </div>
      {/* project details show */}
      {showDetails && (
        <div
          id="details"
          className="absolute z-50 w-full h-full bg-black/50 flex justify-center items-center rounded-[30px] "
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
            className="bg-white sm:w-11/12 h-fit p-2 flex flex-col gap-2"
          >
            <h4 className="text-sm capitalize bg-gray-200 p-1 w-full text-center  break-all">
              Title : {details.protitle}
            </h4>
            <p className="text-xs capitalize  break-all">
              For ( Cleint name ) : {details.cleintname}
            </p>
            <p className="text-xs capitalize ">Type : {details.protype}</p>
            <p className="text-xs capitalize break-all w-full">
              description : {details.prodesc}
            </p>
            <img src={details.imgurl} alt="img-show" />
            {details.prourl && (
              <Link
                to={details.prourl}
                className="text-sm rounded-lg text-white bg-color1 py-1 px-3 capitalize flex self-center items-center gap-2"
              >
                view project
                <FaEye />
              </Link>
            )}
          </div>
        </div>
      )}
      {/* container */}
      <div
        id="container"
        className=" w-full overflow-y-scroll rounded-[30px] pt-3 px-3"
      >
        {/* user name and avtar */}
        <div
          id="top-user-avatar-name"
          className="text-white conatiner w-full max-w-full relative flex items-center flex-col gap-4 "
        >
          <Avatar round size="80px" src={avatar} />
          <div
            id="user-info"
            className="flex flex-col items-center text-black max-w-full text-center gap-1"
          >
            <p id="name" className="capitalize max-w-full truncate font-medium">
              {fname} {lname}
            </p>
            <p
              id="job-title"
              className="text-sm capitalize max-w-full truncate "
            >
              {jobtitle}
            </p>
            <p id="about" className="text-xs ">
              {about}
            </p>
          </div>
        </div>
        {/* user social media links  */}
        <div id="social-links">
          <ul id="links" className="flex gap-2 my-5  ">
            {IlinkData?.socialMediaLinks?.facebookUrl &&
              IlinkData?.socialMediaLinks.facebookUrl !== "" && (
                <li>
                  <Link
                    className="text-blue-700"
                    target="_blank"
                    to={IlinkData.socialMediaLinks.facebookUrl}
                  >
                    <BsFacebook size={19} />
                  </Link>
                </li>
              )}
            {IlinkData?.socialMediaLinks?.githubUrl &&
              IlinkData?.socialMediaLinks.githubUrl !== "" && (
                <li>
                  <Link
                    target="_blank"
                    to={IlinkData.socialMediaLinks.githubUrl}
                  >
                    <BsGithub size={19} />
                  </Link>
                </li>
              )}
            {IlinkData?.socialMediaLinks?.instagramUrl &&
              IlinkData?.socialMediaLinks.instagramUrl !== "" && (
                <li>
                  <Link
                    className="text-red-600"
                    target="_blank"
                    to={IlinkData.socialMediaLinks.instagramUrl}
                  >
                    <BsInstagram size={19} />
                  </Link>
                </li>
              )}
            {IlinkData?.socialMediaLinks?.tiktokUrl &&
              IlinkData?.socialMediaLinks.tiktokUrl !== "" && (
                <li>
                  <Link
                    target="_blank"
                    to={IlinkData.socialMediaLinks.tiktokUrl}
                  >
                    <BsTiktok size={19} />
                  </Link>
                </li>
              )}
            {IlinkData?.socialMediaLinks?.whatsappUrl &&
              IlinkData?.socialMediaLinks.whatsappUrl !== "" && (
                <li>
                  <Link
                    className="text-green-500"
                    target="_blank"
                    to={`https://wa.me/${IlinkData.socialMediaLinks?.whatsappUrl}`}
                  >
                    <BsWhatsapp size={19} />
                  </Link>
                </li>
              )}
            {IlinkData?.socialMediaLinks?.youtubeUrl &&
              IlinkData?.socialMediaLinks.youtubeUrl !== "" && (
                <li>
                  <Link
                    className="text-red-600"
                    target="_blank"
                    to={IlinkData.socialMediaLinks.youtubeUrl}
                  >
                    <BsYoutube size={19} />
                  </Link>
                </li>
              )}
            {IlinkData?.socialMediaLinks?.twitterUrl &&
              IlinkData?.socialMediaLinks.twitterUrl !== "" && (
                <li>
                  <Link
                    className="text-blue-500"
                    target="_blank"
                    to={IlinkData.socialMediaLinks.twitterUrl}
                  >
                    <FaTwitter size={19} />
                  </Link>
                </li>
              )}
            {IlinkData?.socialMediaLinks?.linkedinUrl &&
              IlinkData?.socialMediaLinks.linkedinUrl !== "" && (
                <li>
                  <Link
                    className="text-blue-700"
                    target="_blank"
                    to={IlinkData.socialMediaLinks.linkedinUrl}
                  >
                    <BsLinkedin size={19} />
                  </Link>
                </li>
              )}
          </ul>
        </div>
        {/* user skills */}
        {IlinkData?.skills.length > 1 && (
          <div
            id="skills"
            className="w-full flex flex-col gap-4 items-center mb-5"
          >
            <h3 className="text-lg w-fit text-center border-b-2 pb-2 border-black uppercase font-semibold">
              My Skills
            </h3>
            {Skills}
          </div>
        )}
        {/* user portfolio */}
        {IlinkData?.portfolio.length > 1 && (
          <div
            id="portfolio"
            className="w-full flex flex-col gap-4 items-center mb-5"
          >
            <h3 className="text-lg w-fit text-center border-b-2 pb-2 border-black uppercase font-semibold">
              portfolio
            </h3>
            {Portfolios}
          </div>
        )}
      </div>
    </div>
  );
}
