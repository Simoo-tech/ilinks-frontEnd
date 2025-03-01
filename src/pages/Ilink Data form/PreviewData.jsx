import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import cookies from "react-cookies";

const userCookies = cookies.load("UD_1");

export default function IlinkDataPreview({ children }) {
  const [userData] = useAuth();
  if (!userCookies) {
    return <Navigate to="/auth/sign-in" />;
  }
  
  return userData.verifed ? (
    <div
      className="relative container max-w-full py-3
 section-h "
    >
      {children}
    </div>
  ) : (
    <Navigate to="/auth/send-verify" />
  );
}
