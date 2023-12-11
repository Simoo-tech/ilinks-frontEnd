import React, { useState } from "react";
import axios from "axios";
import bgImage from "../../assets/path12.webp";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { ErrorMes } from "./errorMes";
import { useCookies } from "react-cookie";
import { LoadingBtn } from "../../component/LoadingBtn";
import "../../App.css";
export default function Login() {
  const [cookie, setCookie] = useCookies(["access_token"]);
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  // error message
  const [error, setError] = useState(``);
  const navigate = useNavigate();
  return cookie.access_token ? (
    navigate("/Ilinks")
  ) : (
    <div className={`login flex justify-center items-center `}>
      <div
        className="form-container bg-colorDark2 h-[90%] justify-between relative
        flex flex-col rounded-md text-white
        sm:w-10/12 sm:py-2 sm:items-center sm:gap-3
        lg:w-5/6 lg:items-start 
      "
      >
        <div className="back-to-home w-fit text-base flex flex-row items-center ml-5 self-start">
          <Link
            to="/"
            className=" flex items-center gap-2 hover:bg-colorDark1 hover:text-white
            ease-in-out duration-200 py-2 rounded-full px-3
            sm:text-base lg:text-lg"
          >
            <BiArrowBack />
            <span className="capitalize">home page</span>
          </Link>
        </div>
        <div
          className="from-image flex items-center justify-evenly sm:w-10/12 lg:w-full
        flex-row "
        >
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
            className=" align-middle items-center justify-center 
            sm:hidden 
            lg:w-4/12 lg:flex "
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

    await axios
      .post("https://ilinks-api.onrender.com/auth/login", {
        ...userLogin,
      })
      .then((res) => {
        setLoading(false);
        window.localStorage.setItem("userID", res.data.userID);
        window.localStorage.setItem("formDataId", res.data.formData);
        navigate("/");
        window.location.reload();
        setCookie("access_token", res.data.token, { path: "/" });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  };
  return (
    <form
      onSubmit={HandleSubmit}
      className=" shadow-2xl items-center gap-2 rounded-xl h-full flex flex-col justify-evenly
      bg-colorDark1 border-2 border-colorDark1
      sm:w-full
      lg:w-4/12"
    >
      <div className="create-account flex flex-col items-center gap-2 ">
        <h3 className="text-center sm:text-xl lg:text-3xl pt-3 font-semibold capitalize">
          Login to your account
        </h3>
        <p className="flex flex-row gap-1 capitalize sm:text-sm lg:text-base">
          Don't have account ?
          <Link
            to="/auth/register"
            className="underline text-mainColor2 capitalize "
          >
            sign up
          </Link>
        </p>
      </div>
      <ErrorMes error={error} />
      <div className="w-full flex flex-col items-center gap-5">
        <div
          className="form-group-email flex items-center flex-row w-10/12 gap-1 
        border-b-2 border-mainColor2 h-3/6 bg-colorDark2 py-2 px-3 rounded-lg"
        >
          <AiOutlineMail className="text-colorDark3" />
          <input
            required
            type="email"
            name="email"
            placeholder="enter Your Email"
            className="outline-none p-1 w-full bg-colorDark2"
            autoComplete="off"
            value={userLogin.email}
            onChange={HandleChange}
          />
        </div>
        <div
          className="form-group-password flex items-center flex-row w-10/12 gap-1 
        border-b-2 border-mainColor2 h-3/6 bg-colorDark2 py-2 px-3 rounded-lg"
        >
          <AiFillLock className="text-colorDark3" />
          <input
            required
            type="password"
            name="password"
            placeholder="Type Your password"
            className="outline-none p-1 w-full bg-colorDark2 "
            autoComplete="off"
            value={userLogin.password}
            onChange={HandleChange}
          />
        </div>
      </div>
      <button
        disabled={loading ? true : false}
        type="submit"
        className={`py-2 px-4 border-2 w-[150px] justify-center flex border-mainColor2 transition-all 
        duration-300 ease-in-out hover:bg-mainColor1 group rounded-xl ${
          loading ? "cursor-not-allowed" : "cursor-pointer"
        } `}
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
