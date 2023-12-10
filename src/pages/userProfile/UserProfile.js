import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import Header from "../../component/Header";
import axios from "axios";
import {
  AuthContext,
  MessageContext,
  ModeContext,
} from "../../context/context";
import cookie from "react-cookies";
import { DeleteAccountMessage } from "../../component/DeleteMsg";
import { PageNotFound } from "../../component/PageNotFound";
import "../../App.css";
import Avatar from "react-avatar";
const uploader = Uploader({
  apiKey: "free",
});
const options = {
  multi: false,
  editor: {
    images: {
      crop: true,
    },
  },
  mimeTypes: ["image/jpeg"],
  maxFileSizeBytes: 1000000,
};

export const UserProfile = () => {
  const { id } = useParams();
  // context
  const { userData, setUserData } = useContext(AuthContext);
  const { mode } = useContext(ModeContext);
  const { message, setMessage } = useContext(MessageContext);

  // check user id
  const userId = userData._id;
  const idChecker = userId === id;
  console.log(userData);
  // remover avatar
  const HandleRemAva = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      avatar: "https://static.thenounproject.com/png/4035892-200.png",
    });
    setBtn(false);
  };
  // handle update submit
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, lname, fname, avatar, state, country, age } =
      userData;
    await axios
      .put(
        `http://localhost:8000/user/${userId}`,
        {
          username,
          email,
          lname,
          fname,
          avatar,
          state,
          country,
          age,
        },
        { headers: { accept: "*/*", "Content-type": "application/json" } }
      )
      .then((res) => {
        setMessage({
          ...message,
          active: true,
          type: "success",
          value: `${res.data.message}`,
        });
        setTimeout(() => setMessage(false), 2000);
      })
      .catch((err) => {
        setMessage({
          ...message,
          active: true,
          type: "error",
          value: `${err.response.data.message.message}`,
        });
        setTimeout(() => setMessage(false), 3000);
      });
  };
  // handle delete account
  const [showMsg, setShowMsg] = useState(false);
  const formDataId = window.localStorage.getItem("formDataId");
  const DeleteAccount = async (e) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:8000/user/${userId}`)
      .then(async (res) => {
        window.location.assign("/Ilinks/auth/login");
        cookie.remove("access_token", { path: "/" });
        window.localStorage.removeItem("userID");
        await axios
          .delete(`http://localhost:8000/formdata/${formDataId}`)
          .then(window.localStorage.removeItem("formDataId"))
          .catch((err) => {
            setMessage({
              ...message,
              active: true,
              type: "error",
              value: `${err.response.data.message.message}`,
            });
            setTimeout(() => setMessage(false), 3000);
          });
      })
      .catch((err) => {
        setMessage({
          ...message,
          active: true,
          type: "error",
          value: `${err.response.data.message.message}`,
        });
        setTimeout(() => setMessage(false), 3000);
      });
  };
  // handle change
  const [btn, setBtn] = useState(false);
  const HandleChange = (e) => {
    setBtn(true);
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return idChecker ? (
    <>
      <Header />
      <div className="profile flex p-4 relative overflow-scroll items-center">
        <DeleteAccountMessage
          DeleteAccount={DeleteAccount}
          showMsg={showMsg}
          setShowMsg={setShowMsg}
          message="  Once you delete your account, there's no getting it back.
          Make sure you want to do this."
        />
        <div className="container h-full items-start flex sm:flex-col lg:flex-row gap-7">
          <div className="flex flex-col gap-7  h-fit sm:w-full lg:w-4/12 sm:order-2 lg:order-1">
            {/* profile picture */}
            <div className={`profile-picture w-full shadow-lg`}>
              <p className={`text-lg capitalize p-3 bg-mainColor2 text-white`}>
                profile picture
              </p>
              <div className="flex items-center flex-col py-6 gap-5 bg-colorDark2">
                <Avatar
                  src={userData.avatar}
                  alt="avatar"
                  size="155px"
                  round
                  className="sm:w-[150px] "
                />
                <p className="text-[#707780]">JPG or PNG no larger than 5 MB</p>
                <div className="btns flex gap-3">
                  <UploadButton
                    uploader={uploader}
                    options={options}
                    onComplete={(files) => {
                      setUserData({
                        ...userData,
                        avatar: files.map((x) => x.fileUrl).join("\n"),
                      });
                      setBtn(true);
                    }}
                  >
                    {({ onClick }) => (
                      <button
                        onClick={onClick}
                        className="capitalize bg-[#377dff] text-white py-1 px-2 rounded-md text-lg"
                      >
                        change avatar
                      </button>
                    )}
                  </UploadButton>
                  <button
                    onClick={HandleRemAva}
                    className="capitalize bg-red-600 text-white py-1 px-2 rounded-md text-lg"
                  >
                    remove avatar
                  </button>
                </div>
              </div>
            </div>
            {/* delete account */}
            <div className={`"delete-account w-full shadow-lg`}>
              <p
                className={`text-lg capitalize p-3 bg-mainColor2 text-white  `}
              >
                delete account
              </p>
              <div className="flex justify-center items-center  py-11 flex-3 bg-colorDark2">
                <button
                  onClick={() => setShowMsg(true)}
                  className="capitalize bg-red-600 text-white py-2 px-3 rounded-md text-lg"
                >
                  delete my account
                </button>
              </div>
            </div>
          </div>
          {/* account details */}
          <div
            className={`account-details sm:w-full lg:w-8/12 shadow-lg h-fit lg:order-2 `}
          >
            <p className={`text-lg capitalize p-3 bg-mainColor2 text-white`}>
              Account Details
            </p>
            <div className="flex items-center py-4 gap-5 bg-colorDark2">
              <UpdateUser
                updateUser={UpdateUser}
                setUserData={setUserData}
                userData={userData}
                HandleSubmit={HandleSubmit}
                HandleChange={HandleChange}
                btn={btn}
                mode={mode}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <PageNotFound />
  );
};

// update user from
const UpdateUser = ({ userData, HandleSubmit, btn, HandleChange }) => {
  return (
    <form
      onSubmit={HandleSubmit}
      className="flex flex-col w-full items-start h-fit "
    >
      <div className="container flex flex-col w-11/12 gap-4 flex-wrap justify-between">
        <div className="form-group-username flex flex-col w-full ">
          <label
            htmlFor="username"
            className="text-lg capitalize text-[#838991] mb-1"
          >
            username
          </label>
          <input
            minLength={3}
            maxLength={15}
            placeholder="username"
            type="text"
            name="username"
            className={` p-2 border-2 rounded-md outline-none 
            bg-colorDark1 text-white border-colorDark1 focus-visible:border-white `}
            value={userData.username}
            onChange={HandleChange}
          />
        </div>
        <div className="form-group-email flex flex-col w-full">
          <label htmlFor="email" className="text-lg capitalize text-[#838991] ">
            email
          </label>
          <input
            maxLength={30}
            placeholder="name@example.com"
            type="email"
            readOnly
            name="email"
            className={` p-2 border-2 rounded-md outline-none 
            bg-colorDark1 text-white border-colorDark1 focus-visible:border-white `}
            value={userData.email}
          />
        </div>
        <div className="form-group-fname flex flex-col w-full">
          <label
            htmlFor="firstname"
            className="text-lg capitalize text-[#838991] "
          >
            first name
          </label>
          <input
            maxLength={30}
            placeholder="first name"
            type="text"
            name="fname"
            className={` p-2 border-2 rounded-md outline-none 
            bg-colorDark1 text-white border-colorDark1 focus-visible:border-white `}
            value={userData.fname}
            onChange={HandleChange}
          />
        </div>
        <div className="form-group-lname flex flex-col w-full">
          <label htmlFor="lname" className="text-lg capitalize text-[#838991] ">
            last name
          </label>
          <input
            maxLength={30}
            placeholder="last name"
            type="text"
            name="lname"
            className={` p-2 border-2 rounded-md outline-none 
            bg-colorDark1 text-white border-colorDark1 focus-visible:border-white `}
            value={userData.lname}
            onChange={HandleChange}
          />
        </div>
        <div className="form-group flex flex-row-reverse justify-between w-full flex-wrap">
          <div className="form-group-age sm:w-full lg:w-4/12 flex flex-col">
            <label htmlFor="age" className="text-lg capitalize text-[#838991] ">
              age
            </label>
            <input
              maxLength={30}
              placeholder="your age"
              type="number"
              min={0}
              name="age"
              className={` p-2 border-2 rounded-md outline-none 
            bg-colorDark1 text-white border-colorDark1 focus-visible:border-white `}
              value={userData.age}
              onChange={HandleChange}
              required={false}
            />
          </div>
          <div className="form-group-country sm:w-full flex-wrap lg:w-8/12 flex gap-2">
            <div className="flex flex-col sm:w-full lg:w-5/12">
              <label
                htmlFor="country"
                className="text-lg capitalize text-[#838991] "
              >
                country
              </label>
              <input
                maxLength={30}
                placeholder="egypt"
                type="text"
                name="country"
                className={` p-2 border-2 rounded-md outline-none 
            bg-colorDark1 text-white border-colorDark1 focus-visible:border-white `}
                value={userData.country}
                onChange={HandleChange}
                required={false}
              />
            </div>
            <div className="flex flex-col sm:w-full lg:w-5/12">
              <label
                htmlFor="state"
                className="text-lg capitalize text-[#838991] "
              >
                state
              </label>
              <input
                maxLength={30}
                placeholder="cairo"
                type="text"
                name="state"
                className={` p-2 border-2 rounded-md outline-none 
            bg-colorDark1 text-white border-colorDark1 focus-visible:border-white `}
                value={userData.state}
                onChange={HandleChange}
                required={false}
              />
            </div>
          </div>
        </div>
        <button
          disabled={!btn && true}
          type="submit"
          className={`text-lg bg-colorDark1 
          ${
            btn ? "opacity-100" : "opacity-50"
          } text-white py-2 px-3 rounded-lg capitalize w-fit `}
        >
          save changes
        </button>
      </div>
    </form>
  );
};
