import React, { useEffect, useState, useContext } from "react";
import {
  BsFacebook,
  BsInstagram,
  BsWhatsapp,
  BsYoutube,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Next_Prev_Btns } from "../../components/Tools/Next_Prev_Btns";
import { useAuth } from "../../context/AuthContext";
import { UpdateIlinkData } from "../../lib/UserIlinkDataReq";
import { Form, Formik } from "formik";
import PreviewData from "./PreviewData";
import Layout from "../../Layout";

export default function SocialLinks() {
  // animation
  const [animation, setAnimation] = useState(true);
  useEffect(() => {
    setAnimation(false);
  }, []);

  return (
    <Layout title={"Ilinks | social data"}>
      <PreviewData>
        <section
          className={`${
            animation ? "opacity-0" : "opacity-100"
          }  h-full flex flex-col items-center pt-5 px-5 shadow-xl duration-300 ease-in-out justify-between 
    sm:overflow-y-scroll 
    lg:overflow-hidden`}
        >
          <div className="w-full border-colorDark2 border-b-2 border-zinc-300">
            <h1 className="sm:text-2xl lg:text-3xl font-semibold uppercase">
              روابط التواصل الاجتماعي
            </h1>
            <h2 className="text-base capitalize font-light">
              أضف بعض روابط وسائل التواصل الاجتماعي
            </h2>
          </div>
          <FormComp />
        </section>
      </PreviewData>
    </Layout>
  );
}

const FormComp = () => {
  const [btn, setBtn] = useState("NeedAction");
  const [userData, setUserData] = useAuth();
  const socialLinks = userData?.IlinkData?.socialMediaLinks;
  // handle change function
  const HandleChange = (e) => {
    setUserData({
      ...userData,
      IlinkData: {
        ...userData.IlinkData,
        socialMediaLinks: { ...socialLinks, [e.target.name]: e.target.value },
      },
    });
  };
  const links = socialLinks;
  // input style and handle to show
  const Inputs = [
    {
      name: "facebookUrl",
      labelName: "Facebook",
      icon: <BsFacebook className="text-blue-700 rounded-full" size={30} />,
      val: links?.facebookUrl,
      type: "url",
    },
    {
      name: "githubUrl",
      labelName: "Github",
      icon: <BsGithub className=" text-white rounded-full " size={30} />,
      val: links?.githubUrl,
      type: "url",
    },
    {
      name: "twitterUrl",
      labelName: "Twitter",
      icon: <FaTwitter className="text-blue-500" size={30} />,
      val: links?.twitterUrl,
      type: "url",
    },
    {
      name: "instagramUrl",
      labelName: "Instagram",
      icon: <BsInstagram className="text-red-600 " size={30} />,
      val: links?.instagramUrl,
      type: "url",
    },
    {
      name: "tiktokUrl",
      labelName: "Tiktok",
      icon: <FaTiktok size={30} />,
      val: links?.tiktokUrl,
      type: "url",
    },
    {
      name: "whatsappUrl",
      labelName: "Whatsapp",
      icon: <BsWhatsapp className=" text-green-500" size={30} />,
      val: links?.whatsappUrl,
      type: "text",
    },
    {
      name: "youtubeUrl",
      labelName: "Youtube",
      icon: <BsYoutube className=" text-red-600" size={30} />,
      val: links?.youtubeUrl,
      type: "url",
    },
    {
      name: "linkedinUrl",
      labelName: "Linkedin",
      icon: <BsLinkedin className="text-blue-700" size={30} />,
      val: links?.linkedinUrl,
      type: "url",
    },
  ];
  /////////////////////////////////

  const navigate = useNavigate();
  return (
    <Formik>
      {() => (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            UpdateIlinkData({
              userData,
              setBtn,
              navigate,
              path: "/" + userData.username + "/skills-data-page",
            });
          }}
          className="flex flex-col w-full justify-between h-full lg:mt-5 mb-3"
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 justify-between px-3 my-8">
            {Inputs.map((input, i) => (
              <div
                key={i}
                id={input.name}
                className=" flex gap-2 flex-col h-fit rounded-lg  "
              >
                <label htmlFor={input.name} className="font-medium">
                  {input.labelName}
                </label>
                <div className="link-icon flex items-center gap-2 ">
                  {input.icon}
                  <input
                    onChange={(e) => HandleChange(e)}
                    type={input.type}
                    name={input.name}
                    value={socialLinks ? input.val : ""}
                    placeholder={
                      input.type === "url"
                        ? `https://example/${input.name.toLowerCase()}.com/`
                        : "+201112134123"
                    }
                    className="outline-none p-2 w-full rounded-md shadow-md "
                  />
                </div>
              </div>
            ))}
          </div>
          <Next_Prev_Btns
            prev={`/${userData.username}/profile-data-page`}
            btn={btn}
          />
        </Form>
      )}
    </Formik>
  );
};
