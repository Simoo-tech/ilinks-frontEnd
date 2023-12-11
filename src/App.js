import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import axios from "axios";
import "./App.css";
// import context
import { CookiesProvider } from "react-cookie";
import cookie from "react-cookies";
import {
  MessageContext,
  AuthContext,
  FormDataContext,
  MenuContext,
} from "./context/context";
// import components
import { PageNotFound } from "./component/PageNotFound";
import { NotVerifedPage } from "./component/NotVerifedPage";
// import pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import { Authpage } from "./pages/auth/Authpage";
import FormPage from "./pages/formpage/formPage";

// import section
import Register from "./pages/auth/Register";
import Profile from "./pages/formpage/ProfileSection";
import { UserProfile } from "./pages/userProfile/UserProfile";
import { VerifyEmail } from "./pages/auth/VerifyEmail";
import SocialLinks from "./pages/formpage/socialLinksSection";
import SkillsSection from "./pages/formpage/SkillsSection";

// import user's theme
import { Loading } from "./component/loading";
// icons
import { BiLogOut } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { LiaLinkSolid } from "react-icons/lia";

function App() {
  //////////////////// context  /////////////////
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({
    active: false,
    type: "",
    value: "",
  });
  const [loading, setLoading] = useState(false);
  const [changemenu, setChangemenu] = useState(false);
  // context values
  const UserDataValue = { userData, setUserData };
  const ShowMessage = { message, setMessage };
  const FormDataValue = { formData, setFormData };
  const MenuValue = { changemenu, setChangemenu };
  console.log(loading);
  return (
    <Router>
      <CookiesProvider>
        <AuthContext.Provider value={UserDataValue}>
          <FormDataContext.Provider value={FormDataValue}>
            <MenuContext.Provider value={MenuValue}>
              <MessageContext.Provider value={ShowMessage}>
                {loading ? (
                  <Loading />
                ) : (
                  <div
                    className={`App bg-colorDark1 duration-700 ease-in-out overflow-hidden relative h-full `}
                  >
                    <Menu />
                    <FetchUserData
                      setUserData={setUserData}
                      setLoading={setLoading}
                      setFormData={setFormData}
                      formData={formData}
                    />
                    <Message />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      {/* not found page */}
                      <Route path="*" element={<PageNotFound />} />
                      {/* form page */}
                      <Route
                        path="formpage"
                        element={
                          userData.verifed ? <FormPage /> : <NotVerifedPage />
                        }
                      >
                        <Route path="profile" element={<Profile />} />
                        <Route path="skills" element={<SkillsSection />} />
                        <Route path="socialLinks" element={<SocialLinks />} />
                      </Route>
                      {/* auth pages */}
                      <Route path="auth" element={<Authpage />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route
                          path={`verifyemail/:id`}
                          element={<VerifyEmail />}
                        />
                      </Route>
                      {/* user profile */}
                      <Route path="userprofile/:id" element={<UserProfile />} />
                    </Routes>
                  </div>
                )}
              </MessageContext.Provider>
            </MenuContext.Provider>
          </FormDataContext.Provider>
        </AuthContext.Provider>
      </CookiesProvider>
    </Router>
  );
}
export default App;

function FetchUserData({ setUserData, setLoading, setFormData, formData }) {
  const userID = window.localStorage.getItem("userID");
  const FormID = window.localStorage.getItem("formDataID");

  useEffect(() => {
    const FetchUser = async () => {
      if (userID) {
        setLoading(true);
        await axios
          .get(`https://ilinks-api.onrender.com/user/${userID}`)
          .then((res) => {
            setUserData(res.data);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => setLoading(false));
      }
      if (FormID !== "undefined" && FormID) {
        await axios
          .get(`https://ilinks-api.onrender.com/formdata/${FormID}`)
          .then((res) => {
            setFormData(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };

    FetchUser();
  }, []);
}

const Message = () => {
  // message style

  const { message } = useContext(MessageContext);
  return (
    <div
      className={`${
        message.active ? " opacity-[1] top-[10px]" : " opacity-[0] -top-[100px]"
      }
        ${message.type === "success" ? "bg-[#80cd7b]" : "bg-red-400"}
      z-30 text-lg capitalize text-white  py-2 px-4 rounded-xl duration-700 ease-in-out absolute left-[50%] translate-x-[-50%] `}
    >
      {message.value}
    </div>
  );
};

const Menu = () => {
  const { changemenu, setChangemenu } = useContext(MenuContext);
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const SignOut = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("formDataId");
    navigate("/auth/login");
    cookie.remove("access_token", { path: "/" });
    setChangemenu(false);
  };
  return (
    <div
      className={`menu flex flex-col items-end border-y-4 border-l-4 border-colorDark1 absolute top-[70px]
    w-full duration-300 z-30  ${
      changemenu && true
        ? " opacity-[100%] visible right-0 before:w-full"
        : "opacity-0 invisible -right-[100px] before:w-0"
    }
    before:absolute before:h-full before:top-0 before:right-0 before:bg-black before:opacity-60 before:duration-300 `}
    >
      <div className=" flex flex-col items-center bg-colorDark2 sm:w-full h-full lg:w-[300px] z-10 p-4">
        {/* name user */}
        <div className=" pb-4 border-b-[1px] w-full">
          <p className="text-white sm:text-base lg:text-xl text-center  capitalize ">
            {userData.username}
          </p>
          <p className="text-gray-400 sm:text-base lg:text-lg text-center capitalize ">
            {userData.jobTitle}
          </p>
        </div>
        <div className="flex flex-col w-full justify-center ">
          <button
            onClick={() => {
              setChangemenu(false);
              navigate(`/userprofile/${userData._id}`);
            }}
            className="flex justify-center border-b-[1px] items-center gap-2 text-white text-lg capitalize text-center py-3 font-semibold"
          >
            <BsFillPersonFill />
            my profile
          </button>
          <button
            onClick={() => {
              setChangemenu(false);
              navigate(`/userprofile/${userData._id}`);
            }}
            className="flex justify-center border-b-[1px] items-center gap-2 text-white text-lg capitalize text-center py-3 font-semibold"
          >
            <LiaLinkSolid />
            my ilink
          </button>
          <button
            onClick={() => {
              setChangemenu(false);
              navigate(`/userprofile/${userData._id}`);
            }}
            className="flex justify-center border-b-[1px] items-center gap-2 text-white text-lg capitalize text-center py-3 font-semibold"
          >
            <IoIosSettings />
            Settings
          </button>
        </div>
        <button
          className={`text-lg flex justify-center w-full items-center gap-2 py-3 text-white capitalize rounded-xl`}
          onClick={SignOut}
        >
          <BiLogOut />
          logout
        </button>
      </div>
    </div>
  );
};
