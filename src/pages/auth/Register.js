import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/context";
import bgImage from "../../assets/authImg.webp";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineUser, AiOutlineMail, AiFillLock } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { ErrorMes } from "./errorMes";
import { useCookies } from "react-cookie";
import { LoadingBtn } from "../../component/LoadingBtn";
export default function Register() {
  const [cookie, setCookie] = useCookies(["access_token"]);

  // context
  const { userData, setUserData } = useContext(AuthContext);

  return cookie.access_token && userData.verifed ? (
    window.location.assign("/Ilinks")
  ) : (
    <div
      className={`register flex justify-center sm:h-screen lg:h-[90.9vh] items-center `}
    >
      <div className="white-container bg-white h-[95%] sm:w-11/12 lg:w-4/6 flex flex-col sm:py-5 justify-between relative items-center rounded-md">
        <div className="back-to-home w-full text-base flex flex-row items-center ml-6">
          <Link
            to="/"
            className=" flex items-center gap-2 hover:bg-colorGreen hover:text-white bg-white ease-in-out duration-200  p-1 rounded-full px-2"
          >
            <BiArrowBack />
            <span className="capitalize">home page</span>
          </Link>
        </div>
        <div className="flex items-center justify-evenly lg:flex-row h-full sm:flex-col-reverse">
          {/* form */}
          <Form setUserData={setUserData} setCookie={setCookie} />
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
    await axios
      .post("http://localhost:8000/auth/register", {
        username,
        email,
        password,
        passwordcon,
      })
      .then((res) => {
        setLoading(true);
        const userID = res.data.userId;
        window.location.assign(`/Ilinks/auth/verifyemail/${userID}`);
        setUserData(res.data);
        setCookie("access_token", res.data.token, { path: "/" });
        window.localStorage.setItem("userID", res.data.userId);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setUser({ ...user, passwordcon: "", password: "" });
      })
      .finally(() => setLoading(false));
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
      className="sm:w-full shadow-xl rounded-xl lg:w-5/12 h-full flex flex-col justify-evenly items-center gap-2 "
    >
      <div className="login-account flex flex-col items-center gap-2">
        <h3 className="text-center sm:text-2xl lg:text-3xl pt-3 font-semibold capitalize">
          create an account
        </h3>
        <p className="flex flex-row gap-1 capitalize text-base">
          already have account ?
          <Link to="/auth/login" className="underline text-blue-500 capitalize">
            login
          </Link>
        </p>
      </div>
      <div className="w-full flex flex-col items-center gap-3">
        <ErrorMes error={error} />
        <div className="form-group-username flex items-center w-10/12 gap-1 border-b-2">
          <AiOutlineUser className="text-gray-500" />
          <input
            required
            minLength={3}
            maxLength={15}
            type="text"
            name="username"
            placeholder="Your name"
            className="p-1 outline-none w-full"
            autoComplete="off"
            value={user.username}
            onChange={HandleChange}
          />
        </div>
        <div className="form-group-email flex items-center flex-row w-10/12 gap-1 border-b-2">
          <AiOutlineMail className="text-colorDark3" />
          <input
            required
            type="email"
            name="email"
            placeholder="Your Email"
            className="outline-none p-1 w-full"
            autoComplete="off"
            value={user.email}
            onChange={HandleChange}
          />
        </div>
        <div className="form-group-password flex flex-col items-start w-10/12 gap-1 relative  ">
          <div className="w-full flex items-center border-b-2">
            <AiFillLock className="text-colorDark3" />
            <input
              required
              minLength={8}
              maxLength={16}
              type="password"
              name="password"
              placeholder="password"
              className="outline-none p-1 w-full"
              value={user.password}
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
        <div className="form-group-passwordcon flex items-center flex-row w-10/12 gap-1 border-b-2">
          <AiFillLock className="text-colorDark3 " />
          <input
            required
            minLength={8}
            maxLength={16}
            type="password"
            name="passwordcon"
            placeholder="confirm password"
            className="outline-none p-1 w-full"
            value={user.passwordcon}
            onChange={HandleChange}
          />
        </div>
      </div>
      <button
        type="submit"
        className="py-2 px-4 border-2 w-[150px] justify-center flex border-mainColor2 transition-all 
        duration-300 ease-in-out hover:bg-mainColor1 group rounded-xl "
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
