import React, { lazy, useEffect, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { ResetPasswordSubmit, checkToken } from "../../lib/AuthReq";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa6";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import cookie from "react-cookies";
import { Logo } from "../../components/Tools/Logo";
import { BtnsActions } from "../../components/Tools/BtnsActions";

const PageNotFound = lazy(() => import("../../components/PageNotFound"));

export default function ResetPass() {
  const token = cookie.load("reset_token");
  const [btn, setBtn] = useState("NoAction");

  const [showPass, setShowPass] = useState(false);

  // inputs validation
  const InputValidation = Yup.object().shape({
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

  return token ? (
    <section className="flex items-center w-full py-3 container h-full max-w-full flex-col gap-12">
      <Logo />
      <Formik
        initialValues={{
          password: "",
          passwordcon: "",
        }}
        onSubmit={(values) => {
          ResetPasswordSubmit({ values });
        }}
        validationSchema={InputValidation}
      >
        {({ errors, touched, values }) => (
          <Form
            onChange={() => setBtn("NeedAction")}
            className="sm:w-10/12 lg:w-5/12 h-5/6 bg-mainColor1 rounded-lg flex flex-col items-center justify-center gap-5
        text-white container max-w-full"
          >
            <h3 className="text-4xl capitalize mb-7 font-semibold">
              Reset your password
            </h3>
            <div id="input-group" className="flex w-full gap-2 flex-col">
              <div
                className="flex items-center flex-row w-full gap-1 
        border-b-2 bg-primaryColor p-3 rounded-lg "
              >
                <AiFillLock className="text-white" />
                <Field
                  required
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="outline-none p-1 w-full bg-transparent "
                  value={values.password}
                />
              </div>
              {errors.password && touched.password ? (
                <span className="text-red-500 p-2 text-sm bg-white">
                  {errors.password}
                </span>
              ) : null}
            </div>
            <div id="input-group" className="flex w-full gap-2 flex-col ">
              <div
                className="flex items-center flex-row w-full gap-1 
        border-b-2 bg-primaryColor p-3 rounded-lg "
              >
                <AiFillLock className="text-white " />
                <Field
                  required
                  type={showPass ? "text" : "password"}
                  name="passwordcon"
                  placeholder="confirm password"
                  className="outline-none p-1 w-full bg-transparent"
                  value={values.passwordcon}
                />
              </div>
              {errors.passwordcon && touched.passwordcon ? (
                <span className="text-red-500 p-2 text-sm bg-white">
                  {errors.passwordcon}
                </span>
              ) : null}
            </div>
            <button
              id="seepass"
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="capitalize w-fit self-start text-white flex items-center gap-2"
            >
              {showPass ? <FaRegCheckCircle /> : <FaRegCircle />}
              show password
            </button>
            <BtnsActions
              btn={btn}
              btnStyle="py-2 px-6 text-xl capitalize bg-color2 text-color3 rounded-md mt-7"
              ActionText="next"
            />
          </Form>
        )}
      </Formik>
    </section>
  ) : (
    <PageNotFound />
  );
}
