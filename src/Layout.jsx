import React, { useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { Message } from "./components/Message.jsx";
import { Helmet } from "react-helmet-async";
import { useAuth } from "./context/AuthContext.jsx";

export default function Layout({
  children,
  keyword,
  title,
  description,
  author,
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
      {children?.props?.id === "user-ilink" ? (
        children
      ) : (
        <div id="Layout" className="relative">
          {userData?._id && (
            <>
              <Message setToast={setToast} />
            </>
          )}
          <Navbar setToast={setToast} />
          {children}
          {/* not verified alert */}
          {Toast && (
            <div className="toast toast-bottom toast-end">
              <div className="alert alert-error text-white">
                <span>Please verified your account </span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
