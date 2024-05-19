import { useEffect, useState } from "react";
import { JobSearchData } from "../lib/Fetch&Check_Data";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Layout from "../components/Layout";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTiktok,
  BsYoutube,
} from "react-icons/bs";
import { FaPlus, FaTwitter } from "react-icons/fa";
import { LuFileX } from "react-icons/lu";
import Avatar from "react-avatar";
import { BiSearch } from "react-icons/bi";

const allJobs = await JobSearchData();

export default function JobFilter() {
  const [jobs, setJobs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({ name: "" });

  useEffect(() => {
    setJobs(allJobs.usersjobs);
  }, []);

  // show jobs list
  const FilterdJobs = jobs
    ?.filter((item) => item?.jobtitle?.includes(searchParams.get("name")))
    .map((item, i) => {
      return (
        <li
          key={i}
          className="py-2 px-4 rounded-lg bg-neutral-700 group text-white border-2 
          duration-200 flex flex-col justify-between items-center gap-10
        hover:bg-white hover:text-black hover:border-black col-span-1"
        >
          {/* text name and avatar */}
          <div
            id="user-info"
            className="flex justify-center items-center gap-3"
          >
            <img
              src={item.avatar}
              value={item.username}
              className="bg-slate-300 rounded-full"
              width={90}
              height={90}
            />
            <div id="text-user-info">
              <p className="text-lg capitalize">{item.username}</p>
              <p className="capitalize bg-black text-sm text-white p-1 rounded-lg">
                {item.jobtitle}
              </p>
            </div>
          </div>
          {/* social links */}
          <ul
            id="user-social-links"
            className="flex gap-3 justify-center items-center "
          >
            {item.IlinkData?.socialMediaLinks?.facebookUrl &&
              item.IlinkData?.socialMediaLinks.facebookUrl !== "" && (
                <li>
                  <Link
                    className="text-blue-700 hover:scale-125 duration-200"
                    target="_blank"
                    to={item.IlinkData.socialMediaLinks.facebookUrl}
                  >
                    <BsFacebook size={23} />
                  </Link>
                </li>
              )}
            {item.IlinkData?.socialMediaLinks?.githubUrl &&
              item.IlinkData?.socialMediaLinks.githubUrl !== "" && (
                <li>
                  <Link
                    target="_blank"
                    className="hover:scale-125 duration-200"
                    to={item.IlinkData.socialMediaLinks.githubUrl}
                  >
                    <BsGithub size={23} />
                  </Link>
                </li>
              )}
            {item.IlinkData?.socialMediaLinks?.instagramUrl &&
              item.IlinkData?.socialMediaLinks.instagramUrl !== "" && (
                <li>
                  <Link
                    className="text-red-600 hover:scale-125 duration-200"
                    target="_blank"
                    to={item.IlinkData.socialMediaLinks.instagramUrl}
                  >
                    <BsInstagram size={23} />
                  </Link>
                </li>
              )}
            {item.IlinkData?.socialMediaLinks?.tiktokUrl &&
              item.IlinkData?.socialMediaLinks.tiktokUrl !== "" && (
                <li>
                  <Link
                    target="_blank"
                    className="hover:scale-125 duration-200"
                    to={item.IlinkData.socialMediaLinks.tiktokUrl}
                  >
                    <BsTiktok size={23} />
                  </Link>
                </li>
              )}
            {item.IlinkData?.socialMediaLinks?.youtubeUrl &&
              item.IlinkData?.socialMediaLinks.youtubeUrl !== "" && (
                <li>
                  <Link
                    className="text-red-600 hover:scale-125 duration-200"
                    target="_blank"
                    to={item.IlinkData.socialMediaLinks.youtubeUrl}
                  >
                    <BsYoutube size={23} />
                  </Link>
                </li>
              )}
            {item.IlinkData?.socialMediaLinks?.twitterUrl &&
              item.IlinkData?.socialMediaLinks.twitterUrl !== "" && (
                <li>
                  <Link
                    className="text-blue-500 hover:scale-125 duration-200"
                    target="_blank"
                    to={item.IlinkData.socialMediaLinks.twitterUrl}
                  >
                    <FaTwitter size={23} />
                  </Link>
                </li>
              )}
            {item.IlinkData?.socialMediaLinks?.linkedinUrl &&
              item.IlinkData?.socialMediaLinks.linkedinUrl !== "" && (
                <li>
                  <Link
                    className="text-blue-700 hover:scale-125 duration-200"
                    target="_blank"
                    to={item.IlinkData.socialMediaLinks.linkedinUrl}
                  >
                    <BsLinkedin size={23} />
                  </Link>
                </li>
              )}
          </ul>
          {/* skills and porftilio */}
          <div className="flex flex-col gap-3 items-center">
            <p id="user-projects" className="text-lg capitalize font-semibold">
              projects : {item.IlinkData.portfolio.length}
            </p>
            <p id="user-projects" className="text-lg capitalize font-semibold">
              Skills: {item.IlinkData.skills.length}
            </p>
          </div>
          <Link
            to={`/userIlinks/${item.username}`}
            className="py-2 px-6 bg-primaryColor text-white rounded-lg capitalize"
          >
            see more
          </Link>
        </li>
      );
    });

  return (
    <Layout title={"ilinks | job search"}>
      <div
        id="job-filter"
        className="flex flex-col gap-4 container items-center max-w-full section-h py-5 w-full overflow-y-hidden"
      >
        {/* search label */}
        <label
          id="input-search"
          htmlFor="job"
          className="relative flex gap-3 w-full"
        >
          <input
            value={searchParams && searchParams.get("name")}
            type="text"
            name="search-job"
            id="search-job"
            className=" bg-zinc-400 w-full outline-none p-3 placeholder:text-white rounded-lg "
            placeholder="Search for a job name "
            onChange={(e) => {
              setSearchParams({ name: e.target.value });
            }}
          />
          <BiSearch className="absolute right-3 top-3" size={28} />
        </label>
        {/* users cards */}
        {FilterdJobs.length >= 1 ? (
          <ul
            id="filterd-jobs"
            className="bg-white text-primaryColor grid rounded-xl w-full p-5 gap-5 overflow-y-scroll
          sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {FilterdJobs}
          </ul>
        ) : (
          <p
            className="text-center w-full text-xl flex-col items-center font-medium bg-white h-full justify-center
          flex text-primaryColor rounded-xl gap-2"
          >
            <LuFileX size={40} />
            No jobs found by this name
          </p>
        )}
      </div>
    </Layout>
  );
}
