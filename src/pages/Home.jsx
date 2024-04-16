import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../App.css";
import { Helmet } from "react-helmet-async";
import phoneShape from "../assets/phoneShape.png";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { UserD1 } from "../context";
import { JobSearchData } from "../Functions/Fetch&Check_Data";

export default function Home({ setUserVerified }) {
  const { userData } = useContext(UserD1);
  const { verifed, _id } = userData;
  const navigate = useNavigate();
  const [jobs, setJobs] = useState();
  const [jobsFilter, setJobsFilter] = useState(jobs);
  const [searchJob, setSearchJob] = useState("");

  useEffect(() => {
    JobSearchData({ setJobs });
  }, []);

  // filter jobs
  useEffect(() => {
    const res = jobs?.filter((item) => {
      if (item?.jobtitle.toLowerCase().includes(searchJob)) {
        return item?.jobtitle.toLowerCase().includes(searchJob);
      } else {
        return false;
      }
    });
    setJobsFilter(res);
  }, [searchJob]);

  // show jobs list
  const JobsList = jobsFilter?.map((item) => {
    return (
      <li key={item._id}>
        <Link
          target="_blank"
          to={`/userIlinks/${item.username}`}
          className="flex items-center justify-between"
        >
          <img
            loading="lazy"
            src={item.avatar}
            alt="user-job-img"
            className="min-w-[30px] h-[30px] rounded-full "
          />
          <p className="capitalize text-sm font-medium text-center w-4/12">
            {item.username}
          </p>
          <p className="capitalize text-sm font-medium text-center w-4/12">
            {item.jobtitle}
          </p>
        </Link>
      </li>
    );
  });

  console.log(jobsFilter);
  return (
    <>
      <Helmet>
        <title>Ilinks</title>
        <meta name="description" content="Ilinks home page" />
        <meta
          name="keywords"
          content="ilinks,create your portfolio, porfolio ,share your social media,facebook,twitter,instagram"
        />
      </Helmet>
      <section
        id="landing"
        className="container max-w-full flex items-center w-full flex-reverse sm:h-fit  
        sm:flex-col sm:gap-5 sm:justify-center 
        lg:flex-row lg:justify-between "
      >
        {/* text & input */}
        <div
          id="left-containers"
          className={` relative flex flex-col gap-5 duration-700 ease-linear section-h        
            sm:w-full sm:items-center sm:text-center ${
              jobsFilter ? "sm:justify-start" : "sm:justify-center"
            } sm:pt-10
            lg:w-6/12 lg:items-start lg:text-start lg:justify-center`}
        >
          <div>
            <h1
              className="w-full text-white flex font-bold
            sm:text-2xl sm:text-center sm:flex-col
            md:text-2xl
            lg:flex-row lg:text-start
            xl:text-5xl uppercase "
            >
              Start building your
            </h1>
            <span
              className="text-color3 w-full xl:text-5xl uppercase lg:text-start font-extrabold
              sm:text-2xl sm:text-center sm:flex-col flex lg:flex-row md:text-2xl"
            >
              Ilinks now!
            </span>
          </div>
          <p
            className="text-gray-300 leading-7 
              sm:w-full sm:text-center sm:text-sm
              md:text-center md:text-lg
              lg:w-10/12 lg:text-justify xl:text-lg"
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
                if (!verifed && _id) {
                  setUserVerified(true);
                } else if (verifed && _id) {
                  navigate(`${userData.username}/ilink-preview/profile`);
                } else {
                  navigate("/auth/sign-in");
                }
              }}
              className="font-bold py-2 px-4 rounded-xl capitalize sm:col-span-full md:col-span-4
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
              className="flex flex-col items-center justify-center gap-2 sm:col-span-full md:col-span-7 relative"
            >
              <label className="bg-zinc-400 flex gap-2 justify-start items-center w-full rounded-xl p-3 text-white">
                <HiMagnifyingGlass size={20} />
                <input
                  onChange={(e) => {
                    setSearchJob(e.target.value);
                  }}
                  value={searchJob}
                  type="text"
                  name="search-job"
                  id="search-job"
                  className=" bg-zinc-400 w-10/12 outline-none placeholder:text-white"
                  placeholder="Enter a job name "
                />
              </label>
              {jobsFilter && (
                <div
                  id="jobs-list"
                  className="w-full bg-white sm:h-[180px] lg:h-[150px] overflow-y-scroll text-black absolute top-[50px] left-0 "
                >
                  {jobsFilter?.length >= 1 ? (
                    <>
                      <div className="grid grid-cols-12 justify-items-center mb-2 bg-zinc-500 text-white ">
                        <p className="border-r-2 text-center w-full capitalize col-span-3">
                          avatar
                        </p>
                        <p className="border-r-2 text-center w-full capitalize col-span-5">
                          user name
                        </p>
                        <p className=" text-center w-full capitalize col-span-4">
                          job title
                        </p>
                      </div>
                      <ul className="flex flex-col gap-2 px-4">{JobsList}</ul>
                    </>
                  ) : (
                    <p className="flex justify-center items-center capitalize h-full">
                      no jobs found match this name
                    </p>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
        {/* phone  */}
        <div
          id="phoneShape"
          className="relative justify-center items-center section-h
          sm:hidden
          lg:w-6/12 lg:flex"
        >
          <div
            className="shape absolute md:w-[90%] md:h-[90%] right-[50%] top-[50%] translate-x-[50%] 
      -translate-y-[50%] bg-color1 shadow-xl"
          />
          <div className="phone-content w-fit h-fit relative ">
            <img
              src={phoneShape}
              alt="Vecteezy.com"
              width={250}
              className="relative h-full "
            />
          </div>
        </div>
      </section>
    </>
  );
}
