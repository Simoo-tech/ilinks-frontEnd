import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/context";
import bgImage from "../../assets/path12.webp";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineUser, AiOutlineMail, AiFillLock } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { ErrorMes } from "./errorMes";
import { useCookies } from "react-cookie";
import { LoadingBtn } from "../../component/LoadingBtn";
export default function Register() {
  const [cookie, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  // context
  const { userData, setUserData } = useContext(AuthContext);

  return cookie.access_token && userData.verifed ? (
    navigate("/")
  ) : (
    <div className={`register flex justify-center items-center  `}>
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
        flex-row-reverse "
        >
          {/* form */}
          <Form setUserData={setUserData} setCookie={setCookie} />
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

const Form = ({ setUserData, setCookie }) => {
  const [loading, setLoading] = useState(false);

  //////// data from user /////////////
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordcon: "",
  });
  // error message
  const [error, setError] = useState(``);

  // handle submit function

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, passwordcon } = user;
    setLoading(true);
    await axios
      .post("https://ilinks-api.onrender.com/auth/register", {
        username,
        email,
        password,
        passwordcon,
      })
      .then((res) => {
        setLoading(false);
        const userID = res.data.userId;
        setCookie("access_token", res.data.token, { path: "/" });
        window.localStorage.setItem("userID", res.data.userId);
        setUserData(res.data);
        window.location.assign(`/auth/verifyemail/${userID}`);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
        setUser({ ...user, passwordcon: "", password: "" });
      });
  };

  //  input info
  const [passInputInfo, setPassInfoInput] = useState(false);

  // handle change
  const HandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  return (
    <form
      onSubmit={HandleSubmit}
      className=" shadow-2xl items-center gap-2 rounded-xl h-full flex flex-col justify-evenly
      bg-colorDark1 border-2 border-colorDark1
      sm:w-full
      lg:w-4/12"
    >
      <div className="login-account flex flex-col items-center gap-2">
        <h3 className="text-center sm:text-xl lg:text-3xl pt-3 font-semibold capitalize">
          create an account
        </h3>
        <p className="flex flex-row gap-1 capitalize sm:text-sm lg:text-base">
          already have account ?
          <Link
            to="/auth/login"
            className="underline text-mainColor2 capitalize"
          >
            login
          </Link>
        </p>
      </div>
      <ErrorMes error={error} />
      <div className="w-full flex flex-col items-center gap-5">
        <div
          className="form-group-username flex items-center flex-row w-10/12 gap-1 
        border-b-2 border-mainColor2 h-3/6 bg-colorDark2 py-2 px-3 rounded-lg"
        >
          <AiOutlineUser className="text-white" />
          <input
            required
            minLength={3}
            maxLength={15}
            type="text"
            name="username"
            placeholder="Your name"
            className="outline-none p-1 w-full bg-colorDark2"
            autoComplete="off"
            value={user.username}
            onChange={HandleChange}
          />
        </div>
        <div
          className="flex items-center flex-row w-10/12 gap-1 
        border-b-2 border-mainColor2 h-3/6 bg-colorDark2 py-2 px-3 rounded-lg"
        >
          <AiOutlineMail className="text-white" />
          <input
            required
            type="email"
            name="email"
            placeholder="Your Email"
            className="outline-none p-1 w-full bg-colorDark2"
            autoComplete="off"
            value={user.email}
            onChange={HandleChange}
          />
        </div>
        <div
          className="flex items-center flex-col w-10/12 gap-2 
        border-b-2 border-mainColor2 h-3/6 bg-colorDark2 py-2 px-3 rounded-lg"
        >
          <div className="w-full flex items-center">
            <AiFillLock className="text-white" />
            <input
              required
              minLength={8}
              maxLength={16}
              type="password"
              name="password"
              placeholder="password"
              className="outline-none p-1 w-full bg-colorDark2"
              value={user.password}
              autoComplete="off"
              onChange={HandleChange}
              onFocus={() => setPassInfoInput(true)}
              onBlur={() => setPassInfoInput(false)}
            />
          </div>
          <InputInfo
            info="password must be at least 8 char 1 uppercase, 1 number, 1 lower"
            userpass={user.password}
            passInputInfo={passInputInfo}
          />
        </div>
        <div
          className="flex items-center flex-row w-10/12 gap-1 
        border-b-2 border-mainColor2 h-3/6 bg-colorDark2 py-2 px-3 rounded-lg"
        >
          <AiFillLock className="text-white " />
          <input
            required
            minLength={8}
            maxLength={16}
            type="password"
            name="passwordcon"
            placeholder="confirm password"
            className="outline-none p-1 w-full bg-colorDark2"
            value={user.passwordcon}
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
            register
          </span>
        )}
      </button>
    </form>
  );
};

const InputInfo = ({ info, userpass, passInputInfo }) => {
  return (
    <span
      className={`-left-10 text-[12px] w-full gap-1 py-1 ${
        !passInputInfo || userpass.length >= 8 ? "hidden" : "flex"
      } `}
    >
      <IoMdInformationCircleOutline className="text-blue-600 text-lg " />
      {info}
    </span>
  );
};
