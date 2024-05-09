import React, { lazy, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { Menu } from "./components/Navbar.jsx";
import { Message } from "./components/Message.jsx";
import { UserD1 } from "./context.js";

const VerifiedPopUp = lazy(() => import("./components/VerifiedPopUp.jsx"));

export default function Layout({
  userVerified,
  setUserVerified,
  message,
  setMessage,
}) {
  const [changemenu, setChangemenu] = useState(false);
  const { userData } = useContext(UserD1);

  return (
    <div className="relative">
      {userVerified && <VerifiedPopUp setUserVerified={setUserVerified} />}
      {userData._id && (
        <>
          <Menu changemenu={changemenu} setChangemenu={setChangemenu} />
          <Message
            message={message}
            setMessage={setMessage}
            setUserVerified={setUserVerified}
          />
        </>
      )}
      <Navbar changemenu={changemenu} setChangemenu={setChangemenu} />
      <Outlet />
    </div>
  );
}
