import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail, AiFillLock } from "react-icons/ai";
import { ErrorMes } from "../../components/Tools/errorMes";
import { RegisterSubmit } from "../../lib/AuthReq";
import { Helmet } from "react-helmet-async";
import { Logo } from "../../components/Tools/Logo";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import * as Yup from "yup";
import { Field, Formik, Form } from "formik";
import { BtnsActions } from "../../components/Tools/BtnsActions";
import cookies from "react-cookies";

export default function Register() {
  return (
    <>
      <Helmet>
        <title>Ilinks | Regsiter</title>
        <meta name="description" content="Ilinks login page" />
        <meta
          name="keywords"
          content="ilinks,create your portfolio, porfolio ,share your social media,facebook,twitter,instagram"
        />
      </Helmet>
      <section
        id="register-page"
        className="flex justify-between items-center w-full h-full
        sm:flex-col 
        md:flex-row "
      >
        <FormContainer />
        <aside
          className="sm:w-full md:w-4/12 lg:w-3/12 flex flex-col justify-center items-center gap-10 px-5 text-white
    bg-gradient-to-tl from-primaryColor to-color3 shadow-md 
    sm: sm:h-fit sm:gap-4 sm:mt-10 sm:py-6 
    md:h-full md:mt-0 md:gap-8"
        >
          <h3
            className=" font-medium
          sm:text-2xl 
           md:text-3xl 
           lg:text-4xl"
          >
            Welcome Back!
          </h3>
          <p className="sm:text-sm md:text-lg text-center font-light">
            If you have an account Sign in and be connected with us
          </p>
          <Link
            to="/auth/sign-in"
            className=" capitalize bg-primaryColor py-2 px-6 duration-200 ease-in-out hover:bg-transparent rounded-2xl 
            sm:text-sm md:text-lg"
          >
            Sign in
          </Link>
        </aside>
      </section>
    </>
  );
}

const FormContainer = () => {
  const userLoged = cookies.load("UD_1");
  const [btn, setBtn] = useState("NeedAction");
  const navigate = useNavigate();
  // error message
  const [error, setError] = useState(null);
  //  show password button
  const [showPass, setShowPass] = useState(false);
  // inputs validation
  const InputValidation = Yup.object({
    username: Yup.string()
      .required("Username field is required")
      .min(3, "Username must be 3 char at least")
      .max(15, "Username max length is 15 char")
      .matches(
        /^[a-zA-Z0-9\_-]{3,15}$/,
        "min lenght 3 and max 15 characters without spaces"
      ),
    email: Yup.string()
      .required("Email field is required")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email not valid"
      ),
    password: Yup.string()
      .required("Password field is required")
      .min(8, "password must be at least 8 char")
      .max(30, "password max length is 30")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d[\]{};:=<>_+^#$@!%*?&]{8,30}$/,
        "Must contain at least 8 Characters, 1 Uppercase, 1 Lowercase, and 1 Number"
      ),
    passwordcon: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  return userLoged ? (
    <Navigate to={"/"} />
  ) : (
    <>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordcon: "",
        }}
        validationSchema={InputValidation}
        onSubmit={(values) => {
          RegisterSubmit({
            setBtn,
            setError,
            values,
            navigate,
          });
        }}
      >
        {({ errors, touched, values }) => (
          <Form
            autoComplete="off"
            className="items-center rounded-xl flex flex-col gap-10 h-full justify-between container max-w-full text-black pt-3  
            sm:w-full 
            md:w-8/12 
            lg:w-9/12 "
          >
            <Logo align="self-start" />
            <div className="flex flex-col gap-16 items-center w-full h-full justify-center">
              <h3 className="text-center sm:text-3xl md:text-4xl lg:text-5xl pt-3 font-semibold w-fit text-white">
                Create Account
              </h3>
              <div
                id="inputs-container"
                className="sm:w-11/12 md:w-8/12 xl:w-7/12 flex flex-col items-center gap-5 h-fit"
              >
                <ErrorMes error={error} text={error} color="red-500" />
                <div id="input-group-username" className="flex w-full flex-col">
                  <div
                    id="input"
                    className="flex items-center flex-row w-full gap-1 
          border-b-4 border-color3 bg-color2 py-2 px-3 rounded-lg"
                  >
                    <AiOutlineUser className="text-primaryColor" />
                    <Field
                      autoFocus
                      required
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="outline-none p-1 w-full bg-colorDark2"
                      value={values.username}
                    />
                  </div>
                  {errors.username && touched.username ? (
                    <span className="text-red-500 text-sm">
                      {errors.username}
                    </span>
                  ) : null}
                </div>
                <div id="input-group-email" className="flex w-full flex-col">
                  <div
                    className="flex items-center flex-row w-full gap-1 
          border-b-4 border-color3 bg-color2 py-2 px-3 rounded-lg"
                  >
                    <AiOutlineMail className="text-primaryColor" />
                    <Field
                      required
                      type="email"
                      name="email"
                      placeholder=" Email"
                      className="outline-none p-1 w-full bg-colorDark2"
                      value={values.email}
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <span className="text-red-500 text-sm">{errors.email}</span>
                  ) : null}
                </div>
                <div id="input-group-password" className="flex w-full flex-col">
                  <div
                    className=" flex items-center flex-row w-full gap-1 
          border-b-4 border-color3 bg-color2 py-2 px-3 rounded-lg "
                  >
                    <AiFillLock className="text-primaryColor" />
                    <Field
                      type={showPass ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="outline-none p-1 w-full bg-colorDark2"
                      value={values.password}
                      autoComplete="on"
                      required
                    />
                  </div>
                  {errors.password && touched.password ? (
                    <span className="text-red-500 text-sm">
                      {errors.password}
                    </span>
                  ) : null}
                </div>
                <div
                  id="input-group-password-confirmation"
                  className="flex w-full flex-col"
                >
                  <div
                    className="flex items-center flex-row w-full gap-1 
          border-b-4 border-color3 bg-color2 py-2 px-3 rounded-lg"
                  >
                    <AiFillLock className="text-primaryColor" />
                    <Field
                      type={showPass ? "text" : "password"}
                      name="passwordcon"
                      placeholder="Confirm Password"
                      className="outline-none p-1 w-full bg-colorDark2"
                      value={values.passwordcon}
                      autoComplete="on"
                      required
                    />
                  </div>
                  {errors.passwordcon && touched.passwordcon ? (
                    <span className="text-red-500 text-sm">
                      {errors.passwordcon}
                    </span>
                  ) : null}
                </div>
                {/* buttons */}
                <div
                  id="buttons"
                  className="btns flex items-center justify-between flex-wrap gap-2 w-full mt-5"
                >
                  <button
                    id="seepass"
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="capitalize w-fit text-white flex items-center gap-2"
                  >
                    {showPass ? <FaRegCheckCircle /> : <FaRegCircle />}
                    show password
                  </button>
                  <BtnsActions
                    btn={btn}
                    btnStyle="border-2 justify-center flex items-center border-color3 py-2 px-6
                duration-300 ease-in-out hover:bg-color3 hover:text-white group rounded-2xl mt-5 text-color3 text-lg gap-2"
                    ActionText="Sign Up"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
