import React, { useContext, useEffect, useState } from "react";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { PiImagesSquareLight } from "react-icons/pi";
import { FormDataContext } from "../../context/context";
import { GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { DeleteMessage } from "../../component/DeleteMsg";
import "../../App.css";

const uploader = Uploader({
  apiKey: "free",
});

const options = {
  multi: false,
  editor: {
    images: {
      crop: false,
    },
  },
  mimeTypes: ["image/jpeg"],
  maxFileSizeBytes: 1000000,
};
export default function Profile() {
  const [profile, setProfile] = useState({});

  // context
  const { formData, setFormData } = useContext(FormDataContext);

  // animation
  const [pageAnimation, setPageAnimation] = useState();
  useEffect(() => {
    setPageAnimation(true);
    setProfile(formData);
  }, [formData]);

  // show message delete item
  const [showMsg, setShowMsg] = useState(false);

  // remove photo
  const HandleRemoveImg = (e) => {
    e.preventDefault();
    setFormData({ ...formData, image: "" });
    setShowMsg(false);
  };

  return (
    <section
      className={`profile flex flex-col justify-between items-center w-full sm:overflow-scroll duration-500 ease-in-out
      sm:w-full md:w-full lg:w-full absolute ${
        pageAnimation ? " right-0" : " -right-[1000px] "
      } `}
    >
      <DeleteMessage
        HandleRemoveImg={HandleRemoveImg}
        showMsg={showMsg}
        setShowMsg={setShowMsg}
        message="  are you sure you want to delete the image"
      />
      <div className="container flex flex-col justify-between items-center h-full ">
        <div className={`w-full border-colorDark2 text-white border-b-2 py-3 `}>
          <p className="sm:text-2xl lg:text-3xl font-semibold uppercase">
            Profile
          </p>
          <p className="sm:text-sm lg:text-base capitalize">
            some public information about you
          </p>
        </div>
        <From
          setFormData={setFormData}
          formData={formData}
          setShowMsg={setShowMsg}
          profile={profile}
          setProfile={setProfile}
        />
      </div>
    </section>
  );
}
// form inputs
const From = ({ profile, setProfile, setFormData, formData, setShowMsg }) => {
  const navigate = useNavigate();

  // handle submit
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setFormData(profile);
    navigate("/formpage/skills");
  };
  // handle change
  const HandleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={HandleSubmit}
      className={`flex flex-col w-full my-3 py-3 px-3 justify-between shadow-2xl ease-linear bg-colorDark1 text-white
      sm:h-full lg:h-screen sm:gap-5  
    `}
    >
      <div className="flex sm:flex-col lg:flex-row sm:pb-3 justify-between h-full ">
        <div className="form-group-about flex flex-col sm:w-full lg:w-7/12 h-3/6">
          <label htmlFor="about" className="mb-1 text-lg capitalize">
            About You
          </label>
          <textarea
            required
            name="about"
            id="about-you"
            value={profile.about}
            onChange={HandleChange}
            placeholder="e.x. I'm Front-End Developer"
            className={`border-2 outline-none pl-2 py-2 h-full bg-colorDark2
            text-white border-colorDark2 focus-visible:border-white
          `}
          ></textarea>
        </div>
        <div className="photo input-info relative sm:w-full h-3/6 lg:w-4/12 flex flex-col items-center">
          <label
            htmlFor="image"
            className="text-left text-lg sm:w-full lg:w-full mb-2 "
          >
            Image
          </label>
          {/* show photo  */}
          {profile.image ? (
            <div
              className={`"flex flex-col w-full group items-center justify-between border-2  h-full border-colorDark2 `}
            >
              <div className="h-full flex py-3 px-2 w-full">
                <div
                  className={`img-upload w-full flex rounded-lg bg-colorDark2
                  h-fit justify-between py-1 px-2`}
                >
                  <p className="w-6/12 truncate">{profile.imgname}</p>
                  <div className="flex items-center gap-3 w-6/12 justify-end">
                    <Link
                      to={profile.image}
                      target="_blank"
                      className="text-white w-fit rounded-lg bg-blue-600 p-1 mt-1"
                    >
                      <FaEye />
                    </Link>
                    <button
                      name="delete"
                      type="button"
                      className="text-white w-fit rounded-lg bg-red-600 p-1 mt-1 group block "
                      onClick={() => setShowMsg(true)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // function button  add photo
            <div
              className={`border-colorDark2 bg-colorDark2 border-2 flex flex-col w-full justify-center 
              gap-3 align-middle items-center h-full py-4`}
            >
              <PiImagesSquareLight className="sm:text-4xl md:text-6xl " />
              <UploadButton
                width="600px"
                height="375px"
                uploader={uploader}
                options={options}
                onComplete={(files) => {
                  setProfile({
                    ...profile,
                    image: files.map((x) => x.fileUrl).join("\n"),
                    imgname: files[0].originalFile.originalFileName,
                  });
                }}
              >
                {({ onClick }) => (
                  <button
                    className={`bg-colorBottonsDark text-black
                    py-1 px-2 rounded-lg sm:text-sm lg:text-base`}
                    onClick={onClick}
                  >
                    Upload a file...
                  </button>
                )}
              </UploadButton>
            </div>
          )}
        </div>
      </div>
      <div className="btn border-gray-400 border-t-2 pt-5">
        <button
          type="submit"
          className={`sm:text-lg lg:text-xl px-5 py-2 mx-auto rounded-2xl capitalize font-semibold
          flex items-center gap-2 group  text-white hover:bg-transparent bg-colorDark2 `}
        >
          Next
          <GoArrowRight className="text-xl" />
        </button>
      </div>
    </form>
  );
};
