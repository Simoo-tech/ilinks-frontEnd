import React, { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import { Loading } from "./components/loading.jsx";
import cookie from "react-cookies";
import { SessionTime } from "./Functions/SessionTime.js";
import { Fetch_Check_Data } from "./Functions/Fetch&Check_Data.js";
import { UserD1 } from "./context.js";

// lazy import pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Layout = lazy(() => import("./Layout.jsx"));
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
const ShareIlink = lazy(() => import("./pages/Ilink Data form/ShareIlink.jsx"));
const SkillsSection = lazy(() =>
  import("./pages/Ilink Data form/SkillsSection.jsx")
);
const PortfolioSection = lazy(() =>
  import("./pages/Ilink Data form/PortfolioSection.jsx")
);
const IlinkDataPreview = lazy(() =>
  import("./pages/Ilink Data form/IlinkData&PhonePreview.jsx")
);
////////

export default function App() {
  const [loading, setLoading] = useState(false);
  const [userVerified, setUserVerified] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    active: false,
    body: "",
    unRead: false,
  });
  // context values
  const [userData, setUserData] = useState({});
  const UserDataVal = { userData, setUserData };

  useEffect(() => {
    Fetch_Check_Data({
      setMessage,
      setUserData,
      userData,
      setLoading,
    });
    // start session time
    SessionTime();
  }, []);

  return (
    <HelmetProvider>
      <Suspense fallback={<Loading />}>
        <UserD1.Provider value={UserDataVal}>
          {loading ? (
            <Loading />
          ) : (
            <main
              id="App"
              className="bg-primaryColor relative sm:overflow-y-scroll lg:overflow-y-hidden"
            >
              <Routes>
                <Route
                  element={
                    <Layout
                      message={message}
                      setMessage={setMessage}
                      userVerified={userVerified}
                      setUserVerified={setUserVerified}
                    />
                  }
                >
                  <Route
                    path="/"
                    element={
                      <Home
                        setUserVerified={setUserVerified}
                        userVerified={userVerified}
                      />
                    }
                  />
                  {/* not found page */}
                  <Route path="*" element={<PageNotFound />} />
                  {/* user Ilink form and phone preview */}
                  <Route
                    path={`${userData.username}/ilink-preview`}
                    element={<IlinkDataPreview />}
                  >
                    <Route path="profile" element={<Profile />} />
                    <Route path="socialLinks" element={<SocialLinks />} />
                    <Route path="skills" element={<SkillsSection />} />
                    <Route path="portfolio" element={<PortfolioSection />} />
                  </Route>
                  <Route
                    path={`${userData.username}/shareIlink`}
                    element={<ShareIlink />}
                  />
                </Route>
                {/* auth pages */}
                <Route path="auth/sign-in" element={<Login />} />
                <Route path="auth/sign-up" element={<Register />} />
                <Route path="auth/forgetpassword" element={<ForgetPass />} />
                <Route
                  path={`auth/reset-password/${cookie.load("reset_token")}`}
                  element={<ResetPass setLoading={setLoading} />}
                />
                <Route
                  path={`auth/verify-email/${userData._id}`}
                  element={<VerifyEmail />}
                />
                {/* user ilinks */}
                <Route path={`userIlinks/:username`} element={<UserIlinks />} />
              </Routes>
            </main>
          )}
        </UserD1.Provider>
      </Suspense>
    </HelmetProvider>
  );
}
