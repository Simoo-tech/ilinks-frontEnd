import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiImagesSquareLight } from "react-icons/pi";
import { FaTrash, FaEye } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { Next_Prev_Btns } from "../../components/Tools/Next_Prev_Btns";
import { useAuth } from "../../context/AuthContext";
import CropImg from "../../components/Tools/CropImg";
import { UpdateIlinkData } from "../../lib/UserIlinkDataReq";
import { BsArrowLeft } from "react-icons/bs";
import PreviewData from "./PreviewData";
import Layout from "../../Layout";

export default function PortfolioSection() {
  // animation
  const [animation, setAnimation] = useState(true);
  const [uploadArea, setUploadArea] = useState(null);
  const [userData, setUserData] = useAuth();

  useEffect(() => {
    setAnimation(false);
    if (userData?.IlinkData?.portfolio?.length === 0) {
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
    <Layout title={"Ilinks | projects data"}>
      <PreviewData>
        <section
          id="portfolio_form"
          className={`${
            animation ? "opacity-0" : "opacity-100"
          } max-h-full h-full flex flex-col items-center sm:px-2 md:px-5 shadow-xl duration-300 
          ease-in-out relative overflow-y-scroll`}
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
            requestUrl={`portfolio-imgs/${userData.IlinkData._id}`}
          />
        )}
      </PreviewData>
    </Layout>
  );
}

const Form = ({ setUploadArea, userData, setUserData }) => {
  const [btn, setBtn] = useState("NeedAction");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { portfolio } = userData?.IlinkData;

  // handle add portfolio
  const AddPortfolio = () => {
    setError(null);
    if (portfolio) {
      setUserData({
        ...userData,
        IlinkData: {
          ...userData.IlinkData,
          portfolio: [
            ...portfolio,
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
    } else {
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
  };
  // handle change
  const HandleChange = (e, i) => {
    setError(null);
    const { name, value } = e.target;
    const onChange = [...portfolio];
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
    const onDelete = [...portfolio];
    onDelete.splice(i, 1);
    setUserData({
      ...userData,
      IlinkData: { ...userData.IlinkData, portfolio: onDelete },
    });
    setBtn("NeedAction");
  };

  // validation
  const ProValidation = portfolio?.map((por, i) => {
    const imgValid = por.imgurl;
    return imgValid;
  });
  const Validation = (type) => {
    if (
      userData?.IlinkData?.portfolio?.length >= 1 &&
      ProValidation.includes(null)
    ) {
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
      UpdateIlinkData({
        userData,
        setBtn,
        navigate,
        path: "ilink-share",
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        Validation("submit");
      }}
      className="flex flex-col place-content-between w-full lg:max-h-full h-full "
    >
      <div
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 items-center col-span-full 
      sm:my-3 md:p-3 w-full"
      >
        {portfolio?.map((pro, i) => (
          <div
            id="portfolio-details"
            key={pro._id ? pro._id : i}
            className="gap-1 p-4 border-[1px] rounded-xl overflow-hidden relative border-black bg-primaryColor w-full col-span-1"
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
              className="col-span-full justify-between w-full flex items-center relative border-b-2 pb-4 "
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
                <div className="flex gap-2 items-center">
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
                  <Link to={pro.imgurl} target="_blank">
                    <FaEye
                      color="blue"
                      size={30}
                      className="bg-white rounded-lg p-1"
                    />
                  </Link>
                </div>
              )}
              {/* delete project btn */}
              {portfolio.length > 1 && (
                <button
                  id="delete-portfolio-btn"
                  onClick={() => handleDeletePortfolio(i)}
                  type="button"
                  className="rounded-lg p-[4px] bg-red-500 "
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
                    <option value="UI UX design">UI UX design </option>
                    <option value="facebook design">facebook design</option>
                    <option value="other design">other </option>
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
                </label>
                <textarea
                  maxLength={100}
                  value={pro.prodesc}
                  onChange={(e) => HandleChange(e, i)}
                  type="text"
                  name="prodesc"
                  placeholder="example is the first..."
                  className="rounded-lg py-2 px-3 outline-none focus-visible:border-black border-2"
                />
              </div>
            </div>
          </div>
        ))}
        {/* add project button */}
        <button
          type="button"
          onClick={() => Validation("add")}
          className={`${
            portfolio?.length >= 6 ? "hidden" : "flex"
          } flex flex-col justify-center items-center self-center border-2 border-black gap-1 rounded-xl
          w-[150px] h-[100px] p-2 hover:bg-primaryColor hover:text-white duration-200`}
        >
          <p className="lg:text-lg capitalize font-medium"> Add Project</p>
          <FiPlus size={30} />
        </button>
      </div>
      <Next_Prev_Btns
        prev={`/${userData.username}/skills-data-page`}
        displayName="save & Create"
        btn={btn}
      />
    </form>
  );
};
