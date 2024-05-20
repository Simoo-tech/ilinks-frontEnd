import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import cookie from "react-cookies";
import { Fetch_Check_Data } from "./lib/Fetch&Check_Data.js";
import { useAuth } from "./context/AuthContext.jsx";
import { Loading } from "./components/loading.jsx";

// lazy import pages
const Home = lazy(() => import("./pages/Home.jsx"));
const JobFilter = lazy(() => import("./pages/JobFilter.jsx"));
// auth components
const ForgetPass = lazy(() => import("./pages/auth/ForgetPass.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const ResetPass = lazy(() => import("./pages/auth/ResetPass.jsx"));
const Register = lazy(() => import("./pages/auth/Register.jsx"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail.jsx"));
//////////// other  /////////
const PageNotFound = lazy(() => import("./components/PageNotFound.jsx"));
//  ilink form component
const UserIlinks = lazy(() => import("./pages/UserIlink/UserIlinks.jsx"));
const Profile = lazy(() =>
  import("./pages/Ilink Data form/ProfileSection.jsx")
);
const SocialLinks = lazy(() =>
  import("./pages/Ilink Data form/socialLinksSection.jsx")
);
const ShareIlink = lazy(() => import("./pages/ShareIlink.jsx"));
const SkillsSection = lazy(() =>
  import("./pages/Ilink Data form/SkillsSection.jsx")
);
const PortfolioSection = lazy(() =>
  import("./pages/Ilink Data form/PortfolioSection.jsx")
);

////////
const resData = await Fetch_Check_Data();

export default function App() {
  const [userData, setUserData] = useAuth();
  if (cookie.load("UD_1")) {
    useEffect(() => {
      setUserData({ ...userData, ...resData });
    }, []);
  }
  // start session time

  return (
    <main
      id="App"
      data-theme="light"
      className=" relative sm:overflow-y-scroll lg:overflow-y-hidden"
    >
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* not found page */}
          <Route path="*" element={<PageNotFound />} />
          <Route path={"/jobs"} element={<JobFilter />} />
          {/* user Ilink form and phone preview */}
          <Route
            path={`${userData?.username}/profile-data-page`}
            element={<Profile />}
          />
          <Route
            path={`${userData?.username}/socialLinks-data-page`}
            element={<SocialLinks />}
          />
          <Route
            path={`${userData?.username}/skills-data-page`}
            element={<SkillsSection />}
          />
          <Route
            path={`${userData?.username}/portfolio-data-page`}
            element={<PortfolioSection />}
          />
          <Route
            path={`${userData?.username}/ilink-share`}
            element={<ShareIlink />}
          />
          {/* auth pages */}
          <Route path="auth/sign-in" element={<Login />} />
          <Route path="auth/sign-up" element={<Register />} />
          <Route path="auth/forgetpassword" element={<ForgetPass />} />
          <Route
            path={`auth/reset-password/${cookie.load("reset_token")}`}
            element={<ResetPass />}
          />
          <Route
            path={`auth/verify-email/${userData?._id}`}
            element={<VerifyEmail />}
          />
          {/* user ilinks */}
          <Route
            path={"userIlinks/:username" || `userIlinks/${userData?.username}`}
            element={<UserIlinks />}
          />
        </Routes>
      </Suspense>
    </main>
  );
}
