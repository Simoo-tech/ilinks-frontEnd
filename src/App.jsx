import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import cookie from "react-cookies";
import { Loading } from "./components/loading.jsx";
import SendVerify from "./pages/auth/SendVerify.jsx";
import AboutUs from "./pages/AboutUs.jsx";

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
const SkillsSection = lazy(() =>
  import("./pages/Ilink Data form/SkillsSection.jsx")
);
const PortfolioSection = lazy(() =>
  import("./pages/Ilink Data form/PortfolioSection.jsx")
);
////////

export default function App() {
  return (
    <main
      id="App"
      className=" relative sm:overflow-y-scroll lg:overflow-y-hidden"
    >
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<Loading />} />
          {/* not found page */}
          <Route path="*" element={<PageNotFound />} />
          <Route path={"/jobs"} element={<JobFilter />} />
          <Route path={"/about-us"} element={<AboutUs />} />
          {/* user Ilink form and phone preview */}
          <Route path={`:id/profile-data-page`} element={<Profile />} />
          <Route path={`:id/socialLinks-data-page`} element={<SocialLinks />} />
          <Route path={`:id/skills-data-page`} element={<SkillsSection />} />
          <Route
            path={`:id/portfolio-data-page`}
            element={<PortfolioSection />}
          />
          {/* auth pages */}
          <Route path="auth/sign-in" element={<Login />} />
          <Route path="auth/sign-up" element={<Register />} />
          <Route path="auth/forgetpassword" element={<ForgetPass />} />
          <Route
            path={`auth/reset-password/${cookie.load("reset_token")}`}
            element={<ResetPass />}
          />
          <Route path={`auth/send-verify`} element={<SendVerify />} />
          <Route path={`auth/verify-email/:id`} element={<VerifyEmail />} />
          {/* user ilinks */}
          <Route path="userIlinks/:username" element={<UserIlinks />} />
        </Routes>
      </Suspense>
    </main>
  );
}
