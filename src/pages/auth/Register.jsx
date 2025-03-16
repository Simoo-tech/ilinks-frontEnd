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
            مرحبًا بعودتك!
          </h3>
          <p className="sm:text-sm md:text-lg text-center font-light">
            إذا كان لديك حساب، قم بتسجيل الدخول وابقَ على اتصال معنا.
          </p>
          <Link
            to="/auth/sign-in"
            className=" capitalize bg-primaryColor py-2 px-6 duration-200 ease-in-out hover:bg-transparent rounded-2xl 
            sm:text-sm md:text-lg"
          >
            تسجيل الدخول
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
      .required("حقل اسم المستخدم مطلوب")
      .min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل")
      .max(15, "اسم المستخدم يجب أن يكون 15 حرفًا كحد أقصى")
      .matches(
        /^[a-zA-Z0-9\_-]{3,15}$/,
        "يجب أن يحتوي اسم المستخدم على أحرف وأرقام فقط"
      ),
    email: Yup.string()
      .required("حقل البريد الإلكتروني مطلوب")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "البريد الإلكتروني غير صالح"
      ),
    password: Yup.string()
      .required("حقل كلمة المرور مطلوب")
      .min(8, "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل")
      .max(30, "كلمة المرور يجب أن تكون 30 حرفًا كحد أقصى")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d[\]{};:=<>_+^#$@!%*?&]{8,30}$/,
        "يجب أن تحتوي كلمة المرور على حروف كبيرة وصغيرة وأرقام ولا تقل عن 8 احرف"
      ),
    passwordcon: Yup.string().oneOf(
      [Yup.ref("password")],
      "كلمة المرور غير متطابقة"
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
            className="items-center flex flex-col gap-10 h-full justify-between container max-w-full text-black pt-3 bg-primaryColor 
            sm:w-full 
            md:w-8/12 
            lg:w-9/12 "
          >
            <Logo align="self-start" />
            <div className="flex flex-col gap-16 items-center w-full h-full justify-center">
              <h3 className="text-center sm:text-3xl md:text-4xl lg:text-5xl pt-3 font-semibold w-fit text-white">
                إنشاء حساب
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
                      placeholder="اسم المستخدم"
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
                      placeholder="البريد الإلكتروني"
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
                      placeholder="كلمة المرور"
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
                      placeholder="تأكيد كلمة المرور"
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
                    إظهار كلمة المرور
                  </button>
                  <BtnsActions
                    btn={btn}
                    btnStyle="border-2 justify-center flex items-center border-color3 py-2 px-6
                duration-300 ease-in-out hover:bg-color3 hover:text-white group rounded-2xl mt-5 text-color3 text-lg gap-2"
                    ActionText="تسجيل"
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
