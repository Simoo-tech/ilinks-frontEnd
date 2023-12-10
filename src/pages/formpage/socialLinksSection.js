import React, { useContext, useEffect, useState } from "react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsTelegram,
  BsWhatsapp,
  BsYoutube,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";
import { FormDataContext } from "../../context/context";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import "../../App.css";

function SocialLinks() {
  const [socialLinks, setSocialLinks] = useState({});
  // add more links
  const [morelinks, setMoreLinks] = useState([]);
  // context
  const { formData, setFormData } = useContext(FormDataContext);

  // animation
  const [pageAnimation, setPageAnimation] = useState();
  useEffect(() => {
    setPageAnimation(true);
    if (formData.morelinks) {
      setSocialLinks(formData);
      setMoreLinks(formData.morelinks);
    }
  }, []);

  return (
    <section
      className={`social-links flex flex-col justify-between items-center w-full overflow-scroll duration-500 ease-in-out
      sm:w-full md:w-full lg:w-full ${
        pageAnimation ? "absolute right-0" : "absolute -right-[1000px] "
      } `}
    >
      <div className="container flex flex-col justify-between items-center h-full">
        <div
          className={`w-full border-colorDark2 border-b-2 text-white py-3 flex
          justify-between `}
        >
          <div className="text">
            <p className={`text-3xl font-semibold uppercase`}>Social Links</p>
            <p className="text-base capitalize">Add some social media links</p>
          </div>
          <div className="icons">
            <p className="text-3xl font-semibold uppercase">
              you can get icon from here
            </p>
            <Link
              to="https://icon-sets.iconify.design/"
              target="_blank"
              className="text-lg capitalize text-blue-600 underline"
            >
              click here
            </Link>
          </div>
        </div>
        <FormSocialLinks
          setFormData={setFormData}
          formData={formData}
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
          morelinks={morelinks}
          setMoreLinks={setMoreLinks}
        />
      </div>
    </section>
  );
}

export default SocialLinks;

const FormSocialLinks = ({
  setFormData,
  formData,
  socialLinks,
  setSocialLinks,
  morelinks,
  setMoreLinks,
}) => {
  const navigate = useNavigate();

  // handle add btn click
  const AddMore = () => {
    setMoreLinks([...morelinks, { iconlink: "", linkurl: "", linkval: "" }]);
  };
  // handle remove btn click
  const DeleteMore = (i) => {
    const onDelete = [...morelinks];
    onDelete.splice(i, 1);
    setMoreLinks(onDelete);
  };
  // handle change more links
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeval = [...morelinks];
    onchangeval[i][name] = value;
    setMoreLinks(onchangeval);
  };
  // handle change
  const HandleChange = (e) => {
    setSocialLinks({ ...formData, [e.target.name]: e.target.value });
  };
  // handle submit
  const HandleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      morelinks,
      ...socialLinks,
    });
    // await axios
    //   .post(`http://localhost:8000/formdata/createData`, {
    //     ...formData,
    //     userID: userID,
    //   })
    //   .then((res) => {
    //     window.localStorage.setItem("formDataID", res.data._id);
    //   });
    // await axios
    //   .put(`http://localhost:8000/formdata`, { formID, userID })
    //   .then((res) => {
    //     console.log(res.data);
    //     navigate("/formpage/portfolio");
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <form
      onSubmit={HandleSubmit}
      className={`flex flex-col w-full my-3 sm:gap-5 justify-between sm:h-fit lg:h-screen shadow-2xl
      bg-colorDark1 text-white`}
    >
      <div className="flex items-start justify-start">
        <div
          className="flex flex-wrap items-start gap-4 w-fit
      sm:justify-center sm:h-full 
      md:justify-between 
      lg:justify-start
      "
        >
          <div
            className="facebook flex gap-3 py-2 px-3 flex-col h-fit bg-colorDark2 rounded-lg        
        sm:w-full
        md:w-5/12"
          >
            <label htmlFor="facebook" className="text-lg">
              Facebook
            </label>
            <div className="link-icon flex items-center gap-2 ">
              <BsFacebook className="text-2xl text-blue-700 rounded-full" />
              <input
                type="url"
                name="facebookUrl"
                value={formData.facebookUrl}
                onChange={HandleChange}
                placeholder="https://fb.com/elonmusk"
                style={{ width: "100%" }}
                className={`border-2 outline-none pl-2 py-1 bg-colorDark1 text-white
              border-colorDark2 focus-visible:border-white rounded-lg `}
              />
            </div>
          </div>
          <div
            className="github flex gap-3 py-2 px-3 flex-col h-fit bg-colorDark2 rounded-lg        
        sm:w-full
        md:w-5/12"
          >
            <label htmlFor="github" className="text-lg">
              Github
            </label>
            <div className="link-icon flex items-center gap-2">
              <BsGithub className="text-2xl text-white rounded-full " />
              <input
                type="url"
                name="gitGithubUrlhub"
                onChange={HandleChange}
                value={socialLinks.GithubUrl}
                placeholder="https://github.com/elonmusk"
                style={{ width: "100%" }}
                className={`border-2 outline-none pl-2 py-1 bg-colorDark1 text-white
              border-colorDark2 focus-visible:border-white rounded-lg `}
              />
            </div>
          </div>
          <div
            className="twitter flex gap-3 py-2 px-3 flex-col h-fit bg-colorDark2 rounded-lg        
        sm:w-full
        md:w-5/12"
          >
            <label htmlFor="twitter" className="text-lg">
              Twitter
            </label>
            <div className="link-icon flex items-center gap-2">
              <BsTwitter className="text-2xl text-cyan-600" />
              <input
                type="url"
                name="TwitterUrl"
                value={socialLinks.TwitterUrl}
                onChange={HandleChange}
                placeholder="https://twitter.com/elonmusk"
                style={{ width: "100%" }}
                className={`border-2 outline-none pl-2 py-1 bg-colorDark1 text-white
              border-colorDark2 focus-visible:border-white rounded-lg `}
              />
            </div>
          </div>
          <div
            className="instagram flex gap-3 py-2 px-3 flex-col h-fit bg-colorDark2 rounded-lg        
        sm:w-full
        md:w-5/12"
          >
            <label htmlFor="instagram" className="text-lg">
              Instagram
            </label>
            <div className="link-icon flex items-center gap-2">
              <BsInstagram className="text-2xl text-red-600 " />
              <input
                type="url"
                name="InstagramUrl"
                value={socialLinks.InstagramUrl}
                onChange={HandleChange}
                placeholder="https://instagram.com/elonmusk"
                style={{ width: "100%" }}
                className={`border-2 outline-none pl-2 py-1 bg-colorDark1 text-white
              border-colorDark2 focus-visible:border-white rounded-lg `}
              />
            </div>
          </div>
          <div
            className="telegram flex gap-3 py-2 px-3 flex-col h-fit bg-colorDark2 rounded-lg        
        sm:w-full
        md:w-5/12"
          >
            <label htmlFor="telegram" className="text-lg">
              Telegram
            </label>
            <div className="link-icon flex items-center gap-2">
              <BsTelegram className="text-2xl text-blue-500" />
              <input
                type="url"
                name="TelegramUrl"
                value={socialLinks.TelegramUrl}
                onChange={HandleChange}
                placeholder="https://t.me/elonmusk"
                style={{ width: "100%" }}
                className={`border-2 outline-none pl-2 py-1 bg-colorDark1 text-white
              border-colorDark2 focus-visible:border-white rounded-lg `}
              />
            </div>
          </div>
          <div
            className="whatsapp flex gap-3 py-2 px-3 flex-col h-fit bg-colorDark2 rounded-lg        
        sm:w-full
        md:w-5/12"
          >
            <label htmlFor="whatsapp" className="text-lg">
              Whatsapp
            </label>
            <div className="link-icon flex items-center gap-2">
              <BsWhatsapp className="text-2xl text-green-500" />
              <input
                type="tel"
                name="WhatsappUrl"
                value={socialLinks.WhatsappUrl}
                onChange={HandleChange}
                placeholder="+20121554812"
                style={{ width: "100%" }}
                className={`border-2 outline-none pl-2 py-1 bg-colorDark1 text-white
              border-colorDark2 focus-visible:border-white rounded-lg `}
              />
            </div>
          </div>
          <div
            className="youtube flex gap-3 py-2 px-3 flex-col h-fit bg-colorDark2 rounded-lg        
        sm:w-full
        md:w-5/12"
          >
            <label htmlFor="youtube" className="text-lg">
              Youtube{" "}
            </label>
            <div className="link-icon flex items-center gap-2">
              <BsYoutube className="text-2xl text-red-600" />
              <input
                type="url"
                name="YoutubeUrl"
                value={socialLinks.YoutubeUrl}
                onChange={HandleChange}
                placeholder="https://youtube.com/elonmusk"
                style={{ width: "100%" }}
                className={`border-2 outline-none pl-2 py-1 bg-colorDark1 text-white
              border-colorDark2 focus-visible:border-white rounded-lg `}
              />
            </div>
          </div>
          <div
            className="linkedin flex gap-3 py-2 px-3 flex-col h-fit bg-colorDark2 rounded-lg        
        sm:w-full
        md:w-5/12"
          >
            <label htmlFor="linkedin" className="text-lg">
              Linkedin
            </label>
            <div className="link-icon flex items-center gap-2 w-full">
              <BsLinkedin className="text-2xl text-blue-700" />
              <input
                type="url"
                name="LinkedinUrl"
                value={socialLinks.LinkedinUrl}
                onChange={HandleChange}
                placeholder="https://linkedin.com/elonmusk"
                style={{ width: "100%" }}
                className={`border-2 outline-none pl-2 py-1 bg-colorDark1 text-white
              border-colorDark2 focus-visible:border-white rounded-lg `}
              />
            </div>
          </div>
        </div>
        <div
          className={` more-links flex-wrap flex w-7/12  ${
            morelinks.length === 0
              ? "items-center justify-center "
              : "justify-start items-start"
          }`}
        >
          {morelinks.map((link, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-between gap-2 relative
              bg-colorDark2 py-2 px-3 rounded-lg
              sm:my-3 sm:mr-0
              md:w-5/12
              lg:mr-4 lg:w-full
              "
            >
              <div className="iconlink w-6/12 flex flex-col gap-2 ">
                <label htmlFor="iconlink" className="text-lg">
                  link icon
                </label>
                <input
                  value={link.iconLink}
                  onChange={(e) => handleChange(e, i)}
                  style={{ width: "100%" }}
                  type="text"
                  name="iconlink"
                  className={`border-2 outline-none pl-2 py-1 
              bg-colorDark1 text-white border-colorDark1 focus-visible:border-white `}
                />
              </div>
              <div className="linkval w-5/12 flex flex-col gap-2 ">
                <label htmlFor="linkval" className="text-lg">
                  link value
                </label>
                <input
                  value={link.linkval}
                  onChange={(e) => handleChange(e, i)}
                  style={{ width: "100%" }}
                  type="text"
                  name="linkval"
                  className={`border-2 outline-none pl-2 py-1 
                bg-colorDark1 text-white border-colorDark1 focus-visible:border-white `}
                />
              </div>
              <div className="linkurl w-full flex flex-col gap-2">
                <label htmlFor="linkurl" className="text-lg">
                  link url
                </label>
                <input
                  value={link.linkurl}
                  onChange={(e) => handleChange(e, i)}
                  style={{ width: "100%" }}
                  type="url"
                  name="linkurl"
                  className={`border-2 outline-none pl-2 py-1 
              bg-colorDark1 text-white border-colorDark1 focus-visible:border-white `}
                  required
                />
              </div>
              <button
                onClick={(e) => DeleteMore(i)}
                type="button"
                className="bg-red-500 rounded-full p-[4px] 
                -top-2 absolute -right-2"
              >
                <IoClose size={10} color="white" />
              </button>
            </div>
          ))}
          {/* add more links btn */}
          <div
            className={`morelinks sm:w-5/12 lg:w-full h-fit flex-col items-center 
        ${morelinks.length >= 3 ? "hidden" : "flex"}`}
          >
            <p className="mb-1 text-lg capitalize">add link</p>
            <button
              onClick={AddMore}
              type="button"
              className="border-colorDark2 border-4 p-2 rounded-lg w-11/12 flex justify-center
          hover:bg-colorDark2 "
            >
              <FiPlus size={22} />
            </button>
          </div>
        </div>
      </div>
      <div className="btn border-gray-400 border-t-2 pt-5 flex gap-5 justify-center">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className={`sm:text-lg lg:text-xl px-5 py-2 rounded-2xl capitalize font-semibold
          flex items-center flex-row-reverse gap-2 group text-white hover:bg-transparent
          bg-colorDark2 w-fit `}
        >
          back
          <GoArrowLeft className="text-xl" />
        </button>
        <button
          type="submit"
          className={`sm:text-lg lg:text-xl px-5 py-2  rounded-2xl capitalize font-semibold
          flex items-center gap-2 group text-white hover:bg-transparent bg-colorDark2 w-fit `}
        >
          Next
          <GoArrowRight className="text-xl" />
        </button>
      </div>
    </form>
  );
};
