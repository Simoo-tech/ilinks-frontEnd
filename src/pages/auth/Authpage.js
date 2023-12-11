import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../component/Header";
import "../../App.css";
export const Authpage = () => {
  return (
    <div className="auth h-full">
      <Header />
      <Outlet />
    </div>
  );
};
