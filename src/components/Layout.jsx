import React from "react";
import { Navbar } from "./Navbar.jsx";
import { Message } from "./Message.jsx";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AuthContext.jsx";

export default function Layout({
  children,
  keyword,
  title,
  description,
  author,
}) {
  // context values
  const [userData] = useAuth();
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
          {userData._id && (
            <>
              <Message />
            </>
          )}
          <Navbar />
          {children}
        </div>
      )}
    </>
  );
}
