import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiImagesSquareLight } from "react-icons/pi";
import { FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { Next_Prev_Btns } from "../../components/Next_Prev_Btns";
import { UserD1 } from "../../context";
import CropImg from "../../components/CropImg";
import { UpdateIlinkData } from "../../lib/UserIlinkDataReq";
import { BsArrowLeft } from "react-icons/bs";

export default function PortfolioSection() {
  // animation
  const [animation, setAnimation] = useState(true);
  const [uploadArea, setUploadArea] = useState(null);
  const { userData, setUserData } = useContext(UserD1);

  useEffect(() => {
    setAnimation(false);
    if (userData?.IlinkData?.portfolio.length === 0) {
      setUserData({
        ...userData,
        IlinkData: {
          ...userData.IlinkData,
          portfolio: [
            {
              imgurl: null,
              protitle: "",
              protype: "",
              cleintname: "",
              prourl: "",
              prodesc: "",
            },
          ],
        },
      });
    }
  }, []);

  return (
    <>
      <section
        id="portfolio_form"
        className={`${
          animation ? "opacity-0" : "opacity-100"
        }  h-full flex flex-col items-center sm:px-2 md:px-5 shadow-xl duration-300 ease-in-out relative overflow-y-scroll`}
      >
        <div className="w-full border-colorDark2 border-b-2 border-zinc-300">
          <h1 className="sm:text-2xl lg:text-3xl font-semibold uppercase">
            portfolio
          </h1>
          <h2 className="text-base capitalize font-light">
            Showcasing some of my best work
          </h2>
        </div>
        <Form
          setUploadArea={setUploadArea}
          userData={userData}
          setUserData={setUserData}
        />
      </section>
      {uploadArea !== null && (
        <CropImg
          shape="rectangle"
          setUploadArea={setUploadArea}
          uploadArea={uploadArea}
          requestUrl={`portfolioImg/${userData.IlinkData._id}`}
        />
      )}
    </>
  );
}

const Form = ({ setUploadArea, userData, setUserData }) => {
  const [btn, setBtn] = useState("NeedAction");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { portfolio } = userData.IlinkData;

  // handle add portfolio
  const AddPortfolio = () => {
    setError(null);
    setUserData({
      ...userData,
      IlinkData: {
        ...userData.IlinkData,
        portfolio: [
          ...userData.IlinkData.portfolio,
          {
            imgurl: null,
            protitle: "",
            protype: "",
            cleintname: "",
            prourl: "",
            prodesc: "",
          },
        ],
      },
    });
  };
  // handle change
  const HandleChange = (e, i) => {
    setError(null);
    const { name, value } = e.target;
    const onChange = [...userData.IlinkData.portfolio];
    onChange[i][name] = value;
    setUserData({
      ...userData,
      IlinkData: { ...userData.IlinkData, portfolio: onChange },
    });
    setBtn("NeedAction");
  };
  // handle delete portfolio
  const handleDeletePortfolio = (i) => {
    setError(null);
    const onDelete = [...userData.IlinkData.portfolio];
    onDelete.splice(i, 1);
    setUserData({
      ...userData,
      IlinkData: { ...userData.IlinkData, portfolio: onDelete },
    });
    setBtn("NeedAction");
  };

  // validation
  const ProValidation = userData.IlinkData.portfolio.map((por, i) => {
    const imgValid = por.imgurl;
    return imgValid;
  });
  const Validation = (type) => {
    if (ProValidation.includes(null)) {
      const num = ProValidation.indexOf(null);
      setError({
        message: "choose an image",
        num: num,
        element: "imgurl",
      });
      setBtn("NoAction");
      return;
    }
    if (type === "add" && error === null) {
      setError(null);
      AddPortfolio();
    }
    if (type === "submit") {
      UpdateIlinkData({ userData, setBtn, navigate, path: "shareIlink" });
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        Validation("submit");
      }}
      className="grid grid-cols-12 h-fit items-center justify-center w-full "
    >
      <div
        className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 items-center col-span-full
      sm:my-3 md:p-3 w-full "
      >
        {portfolio?.map((pro, i) => (
          <div
            id="portfolio-details"
            key={pro._id ? pro._id : i}
            style={{
              background: `url("${pro?.imgurl}") no-repeat center black`,
              backgroundSize: "contain",
            }}
            className={`${
              !pro.imgurl ? "before:bg-primaryColor" : "before:bg-black/60"
            } 
            grid gap-1 p-4 border-[1px] rounded-xl overflow-hidden relative border-black 
            grid-cols-3 grid-flow-row grid-rows-1 before:absolute before:w-full before:h-full `}
          >
            {/* error validation */}
            <span
              className={`text-red-500 absolute top-4 rounded-lg capitalize
              bg-white py-1 px-4 flex items-center gap-2 
              duration-500 ease-in-out  ${
                error?.num === i
                  ? "left-44 opacity-100"
                  : " -right-[80px] opacity-0 "
              }`}
            >
              <BsArrowLeft />
              {error?.message}
            </span>
            <div
              id="project-top"
              className="col-span-full justify-between flex items-center relative border-b-2 pb-4 "
            >
              {/* top section show project image */}
              {!pro.imgurl ? (
                // upload project image
                <button
                  type="button"
                  onClick={() => {
                    setUploadArea(i);
                    setError(null);
                    setBtn("NeedAction");
                  }}
                  id="choose-image"
                  className={`flex items-center justify-center gap-1 cursor-pointer py-1 
                  rounded-md bg-neutral-400 px-2 capitalize
                  ${
                    error?.num === i && error?.element === "imgurl"
                      ? "text-red-400 border-red-400"
                      : "text-white border-white"
                  }`}
                >
                  Choose image
                  <PiImagesSquareLight size={21} className="white" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setUploadArea(i);
                    setError(null);
                    setBtn("NeedAction");
                  }}
                  id="choose-image"
                  className={`flex items-center justify-center gap-1 cursor-pointer py-1 capitalize
              rounded-md bg-neutral-400 px-2 
              ${
                error?.num === i && error?.element === "imgurl"
                  ? "text-red-400 border-red-400"
                  : "text-white border-white"
              }`}
                >
                  <span> change image</span>
                  <PiImagesSquareLight size={22} className="white" />
                </button>
              )}
              {/* delete project btn */}
              {userData.IlinkData.portfolio.length > 1 && (
                <button
                  id="delete-portfolio-btn"
                  onClick={() => handleDeletePortfolio(i)}
                  type="button"
                  className="rounded-lg p-[4px] bg-red-500 z-20"
                >
                  <FaTrash size={17} color="white" />
                </button>
              )}
            </div>
            {/* text input */}
            <div className="text flex flex-col gap-2 h-fit justify-center col-span-3 relative mt-4">
              <div
                id="top-container-inputs"
                className="grid sm:grid-cols-1 md:grid-cols-2 gap-3"
              >
                <div id="project-title" className="flex flex-col gap-1">
                  <label
                    htmlFor="protitle"
                    className="capitalize relative flex gap-1 text-white"
                  >
                    project title
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={pro.protitle}
                    required
                    maxLength={22}
                    onChange={(e) => HandleChange(e, i)}
                    type="text"
                    name="protitle"
                    placeholder="example..."
                    className={`rounded-lg py-2 px-3 outline-none focus-visible:border-black border-2 
                      ${
                        error?.num === i &&
                        error?.element === pro.protitle &&
                        "border-red-500"
                      }`}
                  />
                </div>
                <div id="project-type" className="flex flex-col gap-1">
                  <label
                    htmlFor="protype"
                    className="capitalize relative flex gap-1 text-white"
                  >
                    project type
                    <span className="text-red-600">*</span>
                  </label>
                  <select
                    required
                    value={pro.protype}
                    onChange={(e) => {
                      HandleChange(e, i);
                    }}
                    className={`rounded-lg py-2 px-3 outline-none focus-visible:border-black border-2
                      ${
                        error?.num === i &&
                        error?.element === pro.protype &&
                        "border-red-500"
                      }`}
                    name="protype"
                    placeholder={"Choose your option..."}
                  >
                    <option value="website">website</option>
                    <option value="logo design">logo design</option>
                    <option value="UI UX design ">UI UX design </option>
                  </select>
                </div>
              </div>
              <div id="client-name" className=" flex flex-col gap-1">
                <label
                  htmlFor="cleintname"
                  className="capitalize relative flex gap-1 text-white"
                >
                  company or cleint name
                  <span className="text-red-600">*</span>
                </label>
                <input
                  value={pro.cleintname}
                  required
                  maxLength={22}
                  onChange={(e) => HandleChange(e, i)}
                  type="text"
                  name="cleintname"
                  placeholder="example..."
                  className={`rounded-lg py-2 px-3 outline-none focus-visible:border-black border-2
                    ${
                      error?.num === i &&
                      error?.element === pro.cleintname &&
                      "border-red-500"
                    }`}
                />
              </div>
              <div id="project-url" className="flex flex-col gap-2">
                <label
                  htmlFor="prourl"
                  className="capitalize relative flex gap-1 text-white"
                >
                  project url
                </label>
                <input
                  value={pro.prourl}
                  onChange={(e) => HandleChange(e, i)}
                  type="text"
                  name="prourl"
                  placeholder="https://www.example.com"
                  className="rounded-lg py-2 px-3 outline-none
                  focus-visible:border-black border-2"
                />
              </div>
              <div id="project-descripion" className=" flex-col flex gap-2">
                <label
                  htmlFor="prodesc"
                  className="capitalize relative flex gap-1 text-white"
                >
                  project description
                  <span className="text-red-600">*</span>
                </label>
                <textarea
                  maxLength={100}
                  value={pro.prodesc}
                  required
                  onChange={(e) => HandleChange(e, i)}
                  type="text"
                  name="prodesc"
                  placeholder="example is the first..."
                  className={`rounded-lg py-2 px-3 outline-none focus-visible:border-black border-2
                    ${
                      error?.num === i &&
                      error?.element === pro.prodesc &&
                      "border-red-500"
                    }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* add project button */}
      <div
        id="add-project"
        className="col-span-full flex justify-center flex-col items-center my-3"
      >
        <p className="mb-1 text-lg uppercase w-fit font-semibold ">
          add project
        </p>
        <button
          type="button"
          onClick={() => Validation("add")}
          className="flex flex-col justify-center items-center self-center h-fit border-2 border-black gap-1 rounded-xl w-6/12 "
        >
          <FiPlus size={50} className="py-3 w-full" />
        </button>
      </div>
      <Next_Prev_Btns
        prev={`/${userData.username}/ilink-preview/skills`}
        displayName="finish"
        btn={btn}
      />
    </form>
  );
};
