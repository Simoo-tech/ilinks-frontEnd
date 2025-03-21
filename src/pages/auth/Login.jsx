import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { ErrorMes } from "../../components/Tools/errorMes";
import { Helmet } from "react-helmet-async";
import { LoginSubmit } from "../../lib/AuthReq";
import { Logo } from "../../components/Tools/Logo";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { BtnsActions } from "../../components/Tools/BtnsActions";
import { useAuth } from "../../context/AuthContext";
import cookies from "react-cookies";

export default function Login() {
  return (
    <>
      <title>Ilinks | Login</title>
      <meta name="description" content="Ilinks login page" />
      <meta
        name="keywords"
        content="ilinks,create your portfolio, porfolio ,share your social media,facebook,twitter,instagram"
      />
      <section
        id="login-page"
        className="flex justify-between items-center w-full h-full bg-primaryColor
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
            جديد هنا؟
          </h3>
          <p className="sm:text-sm md:text-lg text-center font-light">
            قم بالتسجيل واحصل على رابطك الشخصي (iLink) الذي سيمنحك فرصة للحصول
            على وظيفة.
          </p>
          <Link
            to="/auth/sign-up"
            className=" capitalize bg-primaryColor py-2 px-6 duration-200 ease-in-out hover:bg-transparent rounded-2xl 
            sm:text-sm md:text-lg"
          >
            التسجيل
          </Link>
        </aside>
      </section>
    </>
  );
}

// Form
const FormContainer = () => {
  const [userData, setUserData] = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(null);
  const [btn, setBtn] = useState("NeedAction");
  const userLoged = cookies.load("UD_1");

  // inputs validation
  const InputValidation = Yup.object().shape({
    email: Yup.string()
      .required("البريد الالكتروني مطلوب")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "ادخل بريد الالكتروني صحيح"
      ),
    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .min(8)
      .max(16)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d[\]{};:=<>_+^#$@!%*?&]{8,30}$/,
        "كلمة المرور يجب ان تحتوي علي حروف كبيرة وصغيرة وارقام ولا تقل عن 8 احرف"
      ),
  });

  return userLoged ? (
    <Navigate to={"/"} />
  ) : (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={InputValidation}
      onSubmit={(values) => {
        LoginSubmit({ values, setError, setBtn, setUserData, userData });
      }}
    >
      {({ errors, touched, values }) => (
        <Form
          autoComplete="off"
          className="items-center rounded-xl flex flex-col gap-10 h-full justify-between 
          text-black container max-w-full border-colorDark1 pt-3   
          sm:w-full 
          md:w-8/12 
          lg:w-9/12 "
        >
          <Logo align="self-start" />
          <div className="flex flex-col gap-16 items-center w-full h-full justify-center">
            <h3 className="text-center sm:text-3xl md:text-4xl lg:text-5xl pt-3 font-semibold w-fit text-white">
              تسجيل الدخول إلى حسابك
            </h3>
            <div
              id="inputs-container"
              className="sm:w-11/12 md:w-8/12 xl:w-7/12 flex flex-col items-center gap-5 h-fit"
            >
              <ErrorMes error={error} text={error} color="red-500" size="lg" />
              <div
                id="input-group-email"
                className="flex flex-col w-full gap-2"
              >
                <div
                  id="input"
                  className="flex items-center flex-row w-full  gap-1
        border-b-4 border-color3 bg-color2 py-2 px-3 rounded-lg"
                >
                  <AiOutlineMail className="text-primaryColor" />
                  <Field
                    required
                    value={values.email}
                    autoFocus
                    name="email"
                    placeholder=" البريد الالكتروني"
                    className="outline-none p-1 w-full"
                  />
                </div>
                {errors.email && touched.email ? (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                ) : null}
              </div>
              <div
                id="form-group-password "
                className="flex flex-col gap-2 w-full"
              >
                <div
                  className="flex items-center w-full gap-1 
                    border-b-4 border-color3 bg-color2 py-2 px-3 rounded-lg"
                >
                  <AiFillLock className="text-primaryColor" />
                  <Field
                    required
                    value={values.password}
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="كلمة المرور"
                    className="outline-none p-1 w-full "
                  />
                  {showPass ? (
                    <FaRegEyeSlash
                      onClick={() => setShowPass(!showPass)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <FaRegEye
                      onClick={() => setShowPass(!showPass)}
                      className="cursor-pointer"
                    />
                  )}
                </div>
                {errors.password && touched.password ? (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                ) : null}
              </div>
              <Link
                to={"/auth/forgetpassword"}
                className="text-gray-400 text-start self-start sm:text-sm lg:text-base"
              >
                نسيت كلمة المرور؟
              </Link>
              <BtnsActions
                btn={btn}
                btnStyle="border-2 justify-center flex items-center border-color3 py-2 px-6
                duration-300 ease-in-out hover:bg-color3 hover:text-white group rounded-2xl mt-5 text-color3 text-lg gap-2"
                ActionText="تسجيل الدخول"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
