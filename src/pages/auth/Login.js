import React, { useState } from "react";
import axios from "axios";
import bgImage from "../../assets/authImg.webp";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { ErrorMes } from "./errorMes";
import { useCookies } from "react-cookie";
import { LoadingBtn } from "../../component/LoadingBtn";

export default function Login() {
  const [cookie, setCookie] = useCookies(["access_token"]);
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  // error message
  const [error, setError] = useState(``);

  return cookie.access_token ? (
    window.location.assign("/Ilinks")
  ) : (
    <div
      className={`login flex justify-center sm:h-screen lg:h-[90.9vh] items-center `}
    >
      <div
        className="white-container bg-white h-[95%] sm:w-11/12 lg:w-4/6 flex flex-col sm:py-5
      justify-between relative items-center rounded-md"
      >
        <div className="back-to-home w-full text-base flex flex-row items-center ml-6">
          <Link
            to="/"
            className=" flex items-center gap-2 hover:bg-colorGreen hover:text-white bg-white ease-in-out duration-200  p-1 rounded-full px-2"
          >
            <BiArrowBack />
            <span className="capitalize">home page</span>
          </Link>
        </div>
        <div className="flex items-center justify-evenly lg:flex-row-reverse h-full sm:flex-col-reverse">
          {/* form */}
          <Form
            userLogin={userLogin}
            setUserLogin={setUserLogin}
            error={error}
            setError={setError}
            setCookie={setCookie}
          />
          {/* background image */}
          <img
            src={bgImage}
            alt=""
            className="sm:w-4/6 md:w-3/6 lg:w-6/12 flex align-middle items-center justify-center h-max"
          />
        </div>
      </div>
    </div>
  );
}

// Form
const Form = ({ userLogin, setUserLogin, error, setError, setCookie }) => {
  const [loading, setLoading] = useState(false);
  // handle change
  const HandleChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    setError("");
  };
  // handle submit
  const navigate = useNavigate();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post("https://ilinks-api.onrender.com/auth/login", {
          ...userLogin,
        })
        .then((res) => {
          setLoading(false);
          window.localStorage.setItem("userID", res.data.userID);
          window.localStorage.setItem("formDataId", res.data.formData);
          document.location.href = "/";
          setCookie("access_token", res.data.token, { path: "/" });
        });
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };
  return (
    <form
      onSubmit={HandleSubmit}
      className="sm:w-full shadow-xl rounded-xl lg:w-5/12 h-full flex flex-col justify-evenly items-center gap-2"
    >
      <div className="create-account flex flex-col items-center gap-2">
        <h3 className="text-center sm:text-2xl lg:text-3xl pt-3 font-semibold capitalize">
          Login to your account
        </h3>
        <p className="flex flex-row gap-1 capitalize text-base">
          Don't have account ?
          <Link
            to="/auth/register"
            className="underline text-blue-500 capitalize"
          >
            sign up
          </Link>
        </p>
      </div>
      <div className="w-full flex  flex-col items-center gap-3">
        <ErrorMes error={error} />
        <div className="form-group-email flex items-center flex-row w-10/12 gap-1 border-b-2">
          <AiOutlineMail className="text-colorDark3" />
          <input
            required
            type="email"
            name="email"
            placeholder="enter Your Email"
            className="outline-none p-1 w-full"
            autoComplete="off"
            value={userLogin.email}
            onChange={HandleChange}
          />
        </div>
        <div className="form-group-password flex items-center flex-row w-10/12 gap-1 border-b-2">
          <AiFillLock className="text-colorDark3" />
          <input
            required
            type="password"
            name="password"
            placeholder="Type Your password"
            className="outline-none p-1 w-full"
            autoComplete="off"
            value={userLogin.password}
            onChange={HandleChange}
          />
        </div>
      </div>
      <button
        type="submit"
        className="py-2 px-4 border-2 w-[150px] justify-center flex border-mainColor2 transition-all 
        duration-300 ease-in-out hover:bg-mainColor2 group rounded-xl "
      >
        {loading ? (
          <LoadingBtn />
        ) : (
          <span className="text-xl text-mainColor2 duration-300 group-hover:text-white capitalize font-semibold">
            submit
          </span>
        )}
      </button>
    </form>
  );
};
