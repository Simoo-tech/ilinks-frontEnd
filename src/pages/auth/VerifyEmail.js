import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/context";
import { MdMarkEmailUnread } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import { ErrorMes } from "./errorMes";
import axios from "axios";

export const VerifyEmail = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [codeVal, setCodeVal] = useState();
  const [error, setError] = useState(false);

  // check user id
  const { id } = useParams();
  const userId = userData._id;
  const idChecker = userId === id;
  // handle submit
  const navigate = useNavigate();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (Number(userData.code) === Number(codeVal)) {
      const { username, email } = userData;
      await axios
        .put(`https://ilinks-api.onrender.com/user/${userData._id}`, {
          username,
          email,
          verifed: true,
        })
        .then((res) => {
          setUserData({ ...userData, verifed: res.data.verifed });
          navigate("/");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      setError("invalid code");
    }
  };

  return idChecker ? (
    <div
      className={`login flex justify-center sm:h-screen lg:h-[90.9vh] items-center bg-colorDark2
    `}
    >
      <div className="white-container bg-white h-[70%] sm:w-11/12 lg:w-3/6 flex flex-col sm:py-5 justify-between relative items-center rounded-md">
        {userData.verifed ? (
          <div className="flex flex-col justify-center h-full items-center gap-5">
            <div className="flex items-center">
              <MdMarkEmailUnread size={30} />
              <p className="text-3xl font-bold capitalize">
                your email is verified
              </p>
            </div>
            <p className="text-xl text-gray-500">
              your email is verified you can make your portfolio now
            </p>
            <button
              onClick={() => window.location.assign(`/Ilinks/formpage/profile`)}
              className="bg-blue-600 text-2xl capitalize py-2 px-4 rounded-lg text-white w-6/12"
            >
              create my portfolio
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-evenly flex-col h-full">
            <div className="title flex flex-col items-center gap-2">
              <div className="error-msg">
                <ErrorMes error={error} />
              </div>
              <div className="flex items-center">
                <MdMarkEmailUnread size={30} />
                <p className="text-3xl font-bold capitalize">
                  check your email!
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-500">
              Please enter the 6-digit verification to complete register
            </p>
            <div className="form-group flex flex-col w-full">
              <label htmlFor="code" className="text-lg">
                Verification code
              </label>
              <input
                type="text"
                maxLength={6}
                className={`${
                  error ? "border-red-500" : "border-blue-500"
                } border-2 py-2 px-3 rounded-lg outline-none`}
                onChange={(e) => {
                  setCodeVal(e.target.value);
                  setError(null);
                }}
                value={codeVal}
              />
            </div>
            <button
              onClick={HandleSubmit}
              className="bg-blue-600 text-xl py-2 px-4 rounded-lg text-white w-full"
            >
              Verify code
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div
      className={`login flex justify-center sm:h-screen lg:h-[90.9vh] items-center bg-colorDark2`}
    >
      <div className="white-container bg-white h-[70%] sm:w-11/12 lg:w-3/6 flex sm:py-5 justify-center relative items-center rounded-md">
        <h1 className="text-4xl font-semibold text-center capitalize">
          your not allowed
        </h1>
      </div>
    </div>
  );
};
