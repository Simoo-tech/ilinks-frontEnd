import React, { useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { Message } from "./components/Message.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Footer from "./components/Footer.jsx";
import { Helmet } from "react-helmet-async";
export default function Layout({
  children,
  keyword,
  title,
  description,
  author,
  navbar,
}) {
  // context values
  const [userData] = useAuth();
  const [Toast, setToast] = useState(false);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <meta name="keywords" content={description} />
      </Helmet>

      <div
        id="Layout"
        className="relative flex flex-col justify-between items-center h-dvh"
      >
        <>
          {userData?._id && <Message setToast={setToast} />}
          {!navbar && <Navbar setToast={setToast} />}
          {children}
          <Footer />
        </>
      </div>
    </>
  );
}
