import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import cookie from "react-cookies";
import { useAuth } from "./context/AuthContext.jsx";
import { Loading } from "./components/loading.jsx";
import { useQuery } from "react-query";
import axios from "axios";
import { SignOut } from "./lib/SignOutFunction.js";

const serverPath = import.meta.env.VITE_SOME_SERVER_API;

// lazy import pages
const Home = lazy(() => import("./pages/Home.jsx"));
const JobFilter = lazy(() => import("./pages/JobFilter.jsx"));
const ForgetPass = lazy(() => import("./pages/auth/ForgetPass.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const ResetPass = lazy(() => import("./pages/auth/ResetPass.jsx"));
const Register = lazy(() => import("./pages/auth/Register.jsx"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail.jsx"));
const PageNotFound = lazy(() => import("./components/PageNotFound.jsx"));
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

export default function App() {
  const User_Data_cookies = cookie.load("UD_1");

  const [userData, setUserData] = useAuth();

  if (User_Data_cookies) {
    const { isLoading, error } = useQuery(
      "fetchData",
      () => {
        return axios.get(`${serverPath}user/${User_Data_cookies}`);
      },
      {
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60 * 24,
        onSuccess: (res) => setUserData(res.data.user),
      }
    );

    if (isLoading) {
      return <Loading />;
    }
    if (error) {
      SignOut({ path: "/auth/sign-in" });
    }
  }

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
          <Route path={`:id/profile-data-page`} element={<Profile />} />
          <Route path={`:id/socialLinks-data-page`} element={<SocialLinks />} />
          <Route path={`:id/skills-data-page`} element={<SkillsSection />} />
          <Route
            path={`:id/portfolio-data-page`}
            element={<PortfolioSection />}
          />
          <Route path={`:username/ilink-share`} element={<ShareIlink />} />
          {/* auth pages */}
          <Route path="auth/sign-in" element={<Login />} />
          <Route path="auth/sign-up" element={<Register />} />
          <Route path="auth/forgetpassword" element={<ForgetPass />} />
          <Route
            path={`auth/reset-password/${cookie.load("reset_token")}`}
            element={<ResetPass />}
          />
          <Route path={`auth/verify-email/:id`} element={<VerifyEmail />} />
          {/* user ilinks */}
          <Route path="userIlinks/:username" element={<UserIlinks />} />
        </Routes>
      </Suspense>
    </main>
  );
}
