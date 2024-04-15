import React, { useContext, useEffect, useState } from "react";
import { UserD1 } from "../../context";
import { UpdateProfileSubmit } from "../../Functions/UserProfileData";
import { Form, Field, Formik } from "formik";
import { BtnsActions } from "../../components/BtnsActions";
import { useNavigate } from "react-router-dom";
import { ProfilePic } from "../../components/ProfilePic";
//  yup
import * as Yup from "yup";
// formik

export default function Profile() {
  const { userData, setUserData } = useContext(UserD1);
  const [btn, setBtn] = useState("NoAction");
  const [animation, setAnimation] = useState(true);
  const navigate = useNavigate();
  const { age, jobtitle, country, state, fname, lname, about } = userData;

  useEffect(() => {
    setAnimation(false);
    if (age && jobtitle && country && state && fname && lname) {
      setBtn("NeedAction");
    }
  }, []);

  // inputs validation
  const InputValidation = Yup.object().shape({
    fname: Yup.string()
      .required("first name field is required")
      .min(3, "at leasrt 3 characters"),
    lname: Yup.string()
      .required("last name field is required")
      .min(3, "at leasrt 3 characters"),
    age: Yup.date().required("Age field is required"),
    jobtitle: Yup.string().required("Job title field is required"),
    country: Yup.string().required("Country field is required"),
    state: Yup.string().required("this field is required"),
  });

  return (
    <section
      className={`${
        animation ? "opacity-0" : "opacity-100"
      }  h-full flex flex-col justify-between items-center pt-5 px-5 shadow-xl duration-300 ease-in-out 
      sm:overflow-y-scroll 
      xl:overflow-hidden xl:justify-between`}
    >
      <div
        id="section-title"
        className="w-full border-colorDark2 border-b-2 border-zinc-300"
      >
        <h1 className="sm:text-2xl lg:text-3xl font-semibold uppercase">
          Profile
        </h1>
        <h2 className="text-base capitalize font-light">
          some public information about you
        </h2>
      </div>
      <div className="account-details w-full ">
        <Formik
          initialValues={{
            age: age ? new Date(age).toISOString().split("T")[0] : "",
            jobtitle: jobtitle ? jobtitle : "",
            country: country ? country : "",
            state: state ? state : "",
            fname: fname ? fname : "",
            lname: lname ? lname : "",
            about: about ? about : "",
          }}
          validationSchema={InputValidation}
          onSubmit={(values) => {
            UpdateProfileSubmit({
              setUserData,
              values,
              setBtn,
              userData,
              setAnimation,
              navigate,
            });
          }}
        >
          {({ errors, touched, values }) => (
            <Form
              onChange={(e) => {
                setBtn("NeedAction");
                setUserData({ ...userData, [e.target.name]: e.target.value });
              }}
              autoComplete="off"
              className="w-full justify-center grid grid-cols-1 gap-8 "
            >
              <div
                id="top"
                className="flex items-center gap-10 flex-wrap mt-5 
                sm:justify-center sm:mb-14 
                lg:mb-0 lg:justify-between"
              >
                <ProfilePic userData={userData} />
                <div
                  id="form-group-about "
                  className="flex flex-col gap-2 sm:w-full lg:w-6/12 h-full"
                >
                  <label htmlFor="about" className="capitalize ">
                    about
                  </label>
                  <Field
                    as="textarea"
                    name="about"
                    value={values.about}
                    className="border-2 outline-none p-2 shadow-md max-h-[128px] h-full
                rounded-lg sm:text-sm lg:text-base"
                  />
                </div>
              </div>
              <div
                id="middle"
                className=" grid sm:grid-cols-1 lg:grid-cols-2 gap-2 justify-center items-center"
              >
                <div id="first-name" className="flex flex-col gap-2 ">
                  <label htmlFor="firstname" className="capitalize ">
                    first name
                  </label>
                  <Field
                    type="text"
                    name="fname"
                    className="border-2 outline-none p-2 shadow-md
                rounded-lg sm:text-sm lg:text-base"
                    value={values.fname}
                  />
                  {errors.fname && touched.fname ? (
                    <span className="text-red-500 text-sm">{errors.fname}</span>
                  ) : null}
                </div>
                <div id="last-name" className="flex  flex-col gap-2 ">
                  <label htmlFor="lname" className="capitalize ">
                    last name
                  </label>
                  <Field
                    type="text"
                    name="lname"
                    className="border-2 outline-none p-2 shadow-md
                rounded-lg sm:text-sm lg:text-base"
                    value={values.lname}
                  />
                  {errors.lname && touched.lname ? (
                    <span className="text-red-500 text-sm">{errors.lname}</span>
                  ) : null}
                </div>
                <div id="age" className="  flex flex-col gap-2 ">
                  <label htmlFor="age" className="capitalize ">
                    your age
                  </label>
                  <Field
                    type="date"
                    name="age"
                    className="border-2 outline-none p-2 shadow-md
                  rounded-lg sm:text-sm lg:text-base"
                    value={values.age}
                  />
                  {errors.age && touched.age ? (
                    <span className="text-red-500 text-sm">{errors.age}</span>
                  ) : null}
                </div>
                <div id="jobtitle" className=" flex flex-col  gap-2 ">
                  <label htmlFor="jobtitle" className="capitalize ">
                    Job Title
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
                    <span className="text-red-500 text-sm">
                      {errors.jobtitle}
                    </span>
                  ) : null}
                </div>
                <div id="country" className="flex flex-col gap-2  ">
                  <label htmlFor="country" className="capitalize ">
                    country
                  </label>
                  <Field
                    placeholder="egypt"
                    type="text"
                    name="country"
                    className="border-2 outline-none p-2 shadow-md
                    rounded-lg sm:text-sm lg:text-base"
                    value={values.country}
                  />
                  {errors.country && touched.country ? (
                    <span className="text-red-500 text-sm">
                      {errors.country}
                    </span>
                  ) : null}
                </div>
                <div id="state" className="flex flex-col gap-2 ">
                  <label htmlFor="state" className="capitalize ">
                    state
                  </label>
                  <Field
                    placeholder="cairo"
                    type="text"
                    name="state"
                    className="border-2 outline-none p-2 shadow-md
                    rounded-lg sm:text-sm lg:text-base"
                    value={values.state}
                  />
                  {errors.state && touched.state ? (
                    <span className="text-red-500 text-sm">{errors.state}</span>
                  ) : null}
                </div>
              </div>

              {/* buttons type */}
              <BtnsActions
                btn={btn}
                btnStyle="text-primaryColor py-2 px-3 mb-4 capitalize rounded-2xl capitalize font-semibold drop-shadow-lg shadow-lg
              flex items-center gap-2 group hover:bg-transparent bg-colorDark2 w-fit hover:bg-white duration-300 "
                ActionText="next"
              />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
