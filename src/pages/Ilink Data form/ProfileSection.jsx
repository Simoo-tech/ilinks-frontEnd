import React, { useContext, useEffect, useState } from "react";
import { UpdateProfileSubmit } from "../../lib/UserProfileData";
import { Form, Field, Formik } from "formik";
import { BtnsActions } from "../../components/Tools/BtnsActions";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import PreviewData from "./PreviewData";
import { useAuth } from "../../context/AuthContext";

//  yup
import * as Yup from "yup";
import Layout from "../../Layout";
import { ProfilePic } from "../../components/ProfilePic";
// formik

export default function Profile() {
  const [userData, setUserData] = useAuth();
  const [btn, setBtn] = useState("NeedAction");
  const [animation, setAnimation] = useState(true);
  const navigate = useNavigate();
  const { age, jobtitle, country, status, fname, lname, about } = userData;

  useEffect(() => {
    setAnimation(false);
    if (age && jobtitle && country && status && fname && lname) {
      setBtn("NeedAction");
    }
  }, []);

  // inputs validation
  const InputValidation = Yup.object().shape({
    fname: Yup.string()
      .required("الاسم الاول مطلوب")
      .min(3, "على الاقل 3 احرف"),
    lname: Yup.string()
      .required("الاسم الاخير مطلوب")
      .min(3, "على الاقل 3 احرف"),
    about: Yup.string().required("الوصف مطلوب").min(10, "على الاقل 10 احرف"),
    age: Yup.date(),
    jobtitle: Yup.string().required("الوظيفة مطلوبة"),
    country: Yup.string(),
    status: Yup.string().oneOf(["free", "part-time", "full-time"]),
  });

  return (
    <Layout
      title={"Ilinks | profile data"}
      description={"profile data "}
      keyword={["ilinks", "about you and your job ", "build portfolio page"]}
    >
      <PreviewData>
        <section
          id="profile-data"
          className={`${
            animation ? "opacity-0" : "opacity-100"
          }  h-full flex flex-col justify-between items-center pt-5 px-5 shadow-xl duration-300 ease-in-out overflow-y-scroll`}
        >
          <div
            id="section-title"
            className="w-full border-colorDark2 border-b-2 border-zinc-300 text-black"
          >
            <h1 className="sm:text-2xl lg:text-3xl font-semibold uppercase">
              الملف الشخصي
            </h1>
            <h2 className="text-base capitalize font-light">
              بعض المعلومات العامة عنك
            </h2>
          </div>
          <div className="account-details w-full flex flex-col justify-center mt-10 mb-3 gap-10 ">
            <ProfilePic />
            <Formik
              initialValues={{
                age: age ? new Date(age).toISOString().split("T")[0] : "",
                jobtitle: jobtitle ? jobtitle : "",
                country: country ? country : "",
                status: status ? status : "free",
                fname: fname ? fname : "",
                lname: lname ? lname : "",
                about: about ? about : "",
              }}
              validationSchema={InputValidation}
              onSubmit={(values) => {
                UpdateProfileSubmit({
                  values,
                  setBtn,
                  userData,
                  setUserData,
                  setAnimation,
                  navigate,
                });
              }}
            >
              {({ errors, touched, values }) => (
                <Form
                  onChange={(e) => {
                    setBtn("NeedAction");
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  autoComplete="off"
                  className="w-full justify-center grid grid-cols-1 
                  sm:grid-cols-1 lg:grid-cols-2 gap-4 items-center"
                >
                  <div id="first-name" className="flex flex-col gap-2 relative">
                    <label htmlFor="firstname" className="capitalize ">
                      الاسم الاول
                    </label>
                    <Field
                      type="text"
                      name="fname"
                      className="border-2 outline-none p-2 shadow-md
                        rounded-lg sm:text-sm lg:text-base"
                      value={values.fname}
                    />
                    {errors.fname && touched.fname ? (
                      <span className="text-red-500 text-sm absolute top-1 left-3 flex items-center gap-1">
                        {errors.fname} <MdError />
                      </span>
                    ) : null}
                  </div>
                  <div id="last-name" className="flex  flex-col gap-2 relative">
                    <label htmlFor="lname" className="capitalize ">
                      الاسم الاخير
                    </label>
                    <Field
                      type="text"
                      name="lname"
                      className="border-2 outline-none p-2 shadow-md
                        rounded-lg sm:text-sm lg:text-base"
                      value={values.lname}
                    />
                    {errors.lname && touched.lname ? (
                      <span className="text-red-500 text-sm absolute top-1 left-3 flex items-center gap-1">
                        {errors.lname} <MdError />
                      </span>
                    ) : null}
                  </div>
                  <div id="age" className="  flex flex-col gap-2 relative">
                    <label htmlFor="age" className="capitalize ">
                      تاريخ الميلاد
                    </label>
                    <Field
                      type="date"
                      name="age"
                      className="border-2 outline-none p-2 shadow-md
                        rounded-lg sm:text-sm lg:text-base"
                      value={values.age}
                    />
                    {errors.age && touched.age ? (
                      <span className="text-red-500 text-sm absolute top-1 left-3 flex items-center gap-1">
                        {errors.age}
                        <MdError />
                      </span>
                    ) : null}
                  </div>
                  <div id="jobtitle" className=" flex flex-col gap-2 relative">
                    <label htmlFor="jobtitle" className="capitalize ">
                      اسم الوظيفة
                    </label>
                    <Field
                      placeholder="Ex: Front End Developer"
                      type="text"
                      name="jobtitle"
                      className="border-2 outline-none p-2 shadow-md
                        rounded-lg sm:text-sm lg:text-base"
                      value={values.jobtitle}
                    />
                    {errors.jobtitle && touched.jobtitle ? (
                      <span className="text-red-500 text-sm absolute top-1 left-3 flex items-center gap-1">
                        {errors.jobtitle} <MdError />
                      </span>
                    ) : null}
                  </div>
                  <div id="country" className="flex flex-col gap-2 relative ">
                    <label htmlFor="country" className="capitalize ">
                      الدولة
                    </label>
                    <Field
                      type="text"
                      name="country"
                      className="border-2 outline-none p-2 shadow-md
                        rounded-lg sm:text-sm lg:text-base"
                      value={values.country}
                    />
                    {errors.country && touched.country ? (
                      <span className="text-red-500 text-sm absolute top-1 left-3 flex items-center gap-1">
                        {errors.country}
                        <MdError />
                      </span>
                    ) : null}
                  </div>
                  <div id="job_status" className="flex flex-col gap-2 relative">
                    <label htmlFor="job_status" className="capitalize ">
                      حالة الوظيفة
                    </label>
                    <Field
                      as="select"
                      type="text"
                      name="status"
                      className="border-2 outline-none p-2 shadow-md
                        rounded-lg sm:text-sm lg:text-base capitalize"
                      value={values.status}
                    >
                      <option value="free">free</option>
                      <option value="part-time">part time</option>
                      <option value="full-time">full time</option>
                    </Field>
                    {errors.status && touched.status ? (
                      <span className="text-red-500 text-sm absolute top-1 left-3 flex items-center gap-1">
                        {errors.status} <MdError />
                      </span>
                    ) : null}
                  </div>
                  <div
                    id="form-group-about "
                    className="flex flex-col gap-2 sm:w-full h-full relative col-span-full"
                  >
                    <label htmlFor="about" className="capitalize ">
                      عنك
                    </label>
                    <Field
                      as="textarea"
                      name="about"
                      rows={5}
                      value={values.about}
                      className="border-2 outline-none p-2 shadow-md h-full
                        rounded-lg sm:text-sm lg:text-base"
                    />
                    {errors.about && touched.about ? (
                      <span className="text-red-500 text-sm absolute top-1 left-3 flex items-center gap-1">
                        {errors.about}
                        <MdError />{" "}
                      </span>
                    ) : null}
                  </div>
                  {/* buttons type */}
                  <BtnsActions
                    btn={btn}
                    btnStyle="text-white py-2 px-3 mb-4 capitalize rounded-lg font-semibold 
                    flex items-center gap-2 group hover:bg-zinc-500 bg-zinc-400 shadow-lg
                    w-fit duration-300 drop-shadow-lg "
                    ActionText="حفظ"
                  />
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </PreviewData>
    </Layout>
  );
}
