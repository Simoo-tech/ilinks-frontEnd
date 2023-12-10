import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../component/Header";

export const Authpage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
